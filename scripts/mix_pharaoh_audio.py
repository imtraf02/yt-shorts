"""
Hòa âm (audio mixing) cho phim tài liệu Pharaoh:
- Thuyết minh Trúc Ly 48kHz Hi-Fi (volume 1.0)
- BGM playlist chuyển tiếp mượt mà, fade-in/out 45 frames
- Cho phép tùy chỉnh âm lượng BGM (mặc định: 0.12)
- Ghép vào video hoàn chỉnh out/pharaoh-pyramids.mp4 bằng ffmpeg stream copy (nhanh chóng, chất lượng gốc)
"""

import os
import json
import argparse
import subprocess
import torch
import torchaudio
import torchaudio.transforms as T

SAMPLE_RATE = 48000
FPS = 30
TOTAL_FRAMES = 31231

BGM_TRACKS = [
    {"src": "public/audio/bgm/bgm1_desert.mp3", "durationInFrames": 3997},
    {"src": "public/audio/bgm/bgm2_ancient_rite.mp3", "durationInFrames": 3396},
    {"src": "public/audio/bgm/bgm3_novus.mp3", "durationInFrames": 4885},
    {"src": "public/audio/bgm/bgm4_travelers.mp3", "durationInFrames": 3693},
    {"src": "public/audio/bgm/bgm5_story.mp3", "durationInFrames": 4406},
]

# Danh sách 14 chương với startFrame
CHAPTERS = [
    {"audio": "public/audio/pharaoh_part1.wav", "startFrame": 0, "duration": 2048},
    {"audio": "public/audio/pharaoh_part2.wav", "startFrame": 2048, "duration": 2244},
    {"audio": "public/audio/pharaoh_part3.wav", "startFrame": 4292, "duration": 2133},
    {"audio": "public/audio/pharaoh_part4.wav", "startFrame": 6425, "duration": 1948},
    {"audio": "public/audio/pharaoh_part5.wav", "startFrame": 8373, "duration": 2045},
    {"audio": "public/audio/pharaoh_part6.wav", "startFrame": 10418, "duration": 2275},
    {"audio": "public/audio/pharaoh_part7.wav", "startFrame": 12693, "duration": 2428},
    {"audio": "public/audio/pharaoh_part8.wav", "startFrame": 15121, "duration": 2368},
    {"audio": "public/audio/pharaoh_part9.wav", "startFrame": 17489, "duration": 2139},
    {"audio": "public/audio/pharaoh_part10.wav", "startFrame": 19628, "duration": 2517},
    {"audio": "public/audio/pharaoh_part11.wav", "startFrame": 22145, "duration": 2378},
    {"audio": "public/audio/pharaoh_part12.wav", "startFrame": 24523, "duration": 2280},
    {"audio": "public/audio/pharaoh_part13.wav", "startFrame": 26803, "duration": 2137},
    {"audio": "public/audio/pharaoh_part14.wav", "startFrame": 28940, "duration": 2291},
]

def load_audio_as_stereo_48k(path: str) -> torch.Tensor:
    waveform, sr = torchaudio.load(path)
    if sr != SAMPLE_RATE:
        resampler = T.Resample(sr, SAMPLE_RATE)
        waveform = resampler(waveform)
    if waveform.shape[0] == 1:
        waveform = waveform.repeat(2, 1)
    elif waveform.shape[0] > 2:
        waveform = waveform[:2]
    return waveform

def build_mixed_audio(bgm_volume: float = 0.12) -> torch.Tensor:
    total_samples = int(round(TOTAL_FRAMES * SAMPLE_RATE / FPS))
    master = torch.zeros((2, total_samples), dtype=torch.float32)

    print(f"🎵 Tổng số samples: {total_samples} (~{total_samples/SAMPLE_RATE:.2f}s, {TOTAL_FRAMES} frames)")
    print(f"🎙️ Đang nạp và ghép 14 phần thuyết minh (volume 1.0)...")

    # 1. Nạp và đặt 14 track thuyết minh
    for i, ch in enumerate(CHAPTERS):
        start_samp = int(round(ch["startFrame"] * SAMPLE_RATE / FPS))
        if os.path.exists(ch["audio"]):
            wav = load_audio_as_stereo_48k(ch["audio"])
            end_samp = min(start_samp + wav.shape[1], total_samples)
            actual_len = end_samp - start_samp
            master[:, start_samp:end_samp] += wav[:, :actual_len]
        else:
            print(f"⚠️ Cảnh báo: không tìm thấy {ch['audio']}")

    print(f"🎶 Đang tạo danh sách BGM lặp với âm lượng {bgm_volume:.3f}...")

    # 2. Tạo playlist BGM
    current_frame = 0
    track_idx = 0
    fade_frames = 45
    fade_samples = int(round(fade_frames * SAMPLE_RATE / FPS))

    while current_frame < TOTAL_FRAMES:
        track_info = BGM_TRACKS[track_idx % len(BGM_TRACKS)]
        dur_frames = min(track_info["durationInFrames"], TOTAL_FRAMES - current_frame)

        track_wav = load_audio_as_stereo_48k(track_info["src"])
        desired_samples = int(round(dur_frames * SAMPLE_RATE / FPS))
        track_samples = min(desired_samples, track_wav.shape[1])
        track_wav = track_wav[:, :track_samples]

        # Apply fade in
        actual_fade_in = min(fade_samples, track_samples // 2)
        if actual_fade_in > 0:
            fade_in_curve = torch.linspace(0, 1, actual_fade_in)
            track_wav[:, :actual_fade_in] *= fade_in_curve

        # Apply fade out
        actual_fade_out = min(fade_samples, track_samples // 2)
        if actual_fade_out > 0:
            fade_out_curve = torch.linspace(1, 0, actual_fade_out)
            track_wav[:, -actual_fade_out:] *= fade_out_curve

        # Multiply volume
        track_wav *= bgm_volume

        # Add to master
        start_samp = int(round(current_frame * SAMPLE_RATE / FPS))
        max_possible_len = min(track_samples, track_wav.shape[1])
        end_samp = min(start_samp + max_possible_len, total_samples)
        actual_len = end_samp - start_samp
        master[:, start_samp:end_samp] += track_wav[:, :actual_len]

        current_frame += track_info["durationInFrames"]
        track_idx += 1

    # Clamping để tránh clipping
    master = torch.clamp(master, -1.0, 1.0)
    print("✅ Đã hoàn tất hòa âm master audio.")
    return master

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--bgm-volume", type=float, default=0.12, help="Âm lượng nhạc nền BGM (0.0 đến 1.0)")
    parser.add_argument("--apply-to-video", action="store_true", help="Ghép thẳng vào video out/pharaoh-pyramids.mp4")
    args = parser.parse_args()

    out_audio_path = "out/pharaoh_master_audio.wav"
    os.makedirs("out", exist_ok=True)

    print(f"🚀 Bắt đầu hòa âm audio Pharaoh Documentary với BGM Volume = {args.bgm_volume}...")
    master = build_mixed_audio(args.bgm_volume)

    print(f"💾 Lưu file audio vào {out_audio_path}...")
    torchaudio.save(out_audio_path, master, SAMPLE_RATE)
    size_mb = os.path.getsize(out_audio_path) / (1024 * 1024)
    print(f"✅ Đã lưu: {out_audio_path} ({size_mb:.1f} MB)")

    if args.apply_to_video:
        video_src = "out/pharaoh-pyramids.mp4"
        video_temp = "out/pharaoh-pyramids-new.mp4"
        if not os.path.exists(video_src):
            print(f"❌ Không tìm thấy video nguồn {video_src}")
            return

        print(f"🎬 Ghép audio mới vào video hoàn chỉnh: {video_src}...")
        cmd = [
            "ffmpeg", "-y",
            "-i", video_src,
            "-i", out_audio_path,
            "-c:v", "copy",
            "-c:a", "aac",
            "-b:a", "320k",
            "-map", "0:v:0",
            "-map", "1:a:0",
            video_temp
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if res.returncode == 0:
            if os.path.exists(video_src):
                os.remove(video_src)
            os.rename(video_temp, video_src)
            new_size_mb = os.path.getsize(video_src) / (1024 * 1024)
            print(f"🎉 HOÀN THÀNH CẬP NHẬT VIDEO! File: {video_src} ({new_size_mb:.1f} MB)")
            # Xóa file wav trung gian để giữ thư mục sạch sẽ
            if os.path.exists(out_audio_path):
                os.remove(out_audio_path)
                print(f"🧹 Đã xóa file wav tạm {out_audio_path}")
        else:
            print(f"❌ Lỗi ffmpeg: {res.stderr}")

if __name__ == "__main__":
    main()
