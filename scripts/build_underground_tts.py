# -*- coding: utf-8 -*-
"""
Script sinh audio thuyết minh chất lượng cao bằng VieNeu-TTS v3 Turbo (GPU RTX 3060).
Dự án: 'Cuộc Sống Bí Mật Dưới Lòng Đất: Mạng Lưới Nấm Kết Nối Cả Khu Rừng'
Giọng đọc mặc định: Trúc Ly (theo quy định bắt buộc AGENTS.md).
Cơ chế: Sinh voice từng đoạn (paragraph) có ngắt nghỉ tự nhiên (450ms) giữa các đoạn.
Xuất ra public/audio/underground_part1.wav .. underground_part8.wav.
"""

import os
import sys
import time
import json
import argparse
import numpy as np
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--section", type=str, default="all", help="part1..part8 or 'all'")
    parser.add_argument("--force", action="store_true", help="Bắt buộc sinh lại nếu file đã tồn tại")
    args = parser.parse_args()

    meta_path = Path("src/data/underground_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}. Hãy chạy prepare_underground_assets.py trước.")
        return

    chapters = json.loads(meta_path.read_text(encoding="utf-8"))

    from vieneu import Vieneu
    print("🚀 Khởi tạo VieNeu-TTS v3-Turbo (GPU RTX 3060, Giọng: Trúc Ly)...")
    tts = Vieneu()

    out_dir = Path("public/audio")
    out_dir.mkdir(parents=True, exist_ok=True)

    sr = 48000
    start_silence = np.zeros(int(sr * 0.20), dtype=np.float32)      # 200ms mở đầu
    paragraph_pause = np.zeros(int(sr * 0.45), dtype=np.float32)    # 450ms ngắt đoạn tự nhiên
    end_silence = np.zeros(int(sr * 0.35), dtype=np.float32)        # 350ms kết thúc phần

    total_t0 = time.time()
    generated_count = 0

    for ch in chapters:
        sec_id = ch["id"]
        if args.section != "all" and args.section != sec_id:
            continue

        target_wav = out_dir / f"underground_{sec_id}.wav"
        if target_wav.exists() and not args.force:
            print(f"⏩ Đã tồn tại {target_wav}, bỏ qua.")
            continue

        print(f"\n==================================================")
        print(f"🎙️ Đang sinh audio cho [{sec_id}] - {ch['title']}")
        print(f"📝 Số đoạn: {len(ch['paragraphs'])} đoạn | Tổng từ: {ch['word_count']} từ")

        t0 = time.time()
        audio_chunks = [start_silence]

        for p_idx, para in enumerate(ch["paragraphs"]):
            para_text = para.strip()
            if not para_text:
                continue

            p_audio = tts.infer(para_text, voice="Trúc Ly")
            audio_chunks.append(p_audio)

            # Thêm ngắt nghỉ giữa các đoạn
            if p_idx < len(ch["paragraphs"]) - 1:
                audio_chunks.append(paragraph_pause)

        audio_chunks.append(end_silence)
        full_audio = np.concatenate(audio_chunks)
        t_gen = time.time() - t0

        tts.save(full_audio, str(target_wav))

        dur_s = len(full_audio) / sr
        rtf = t_gen / dur_s if dur_s > 0 else 0
        print(f"✅ Đã lưu: {target_wav}")
        print(f"⏱️ Thời lượng audio: {dur_s:.2f}s ({dur_s/60:.2f} phút) | Thời gian sinh: {t_gen:.2f}s (RTF: {rtf:.3f})")
        generated_count += 1

    total_time = time.time() - total_t0
    print(f"\n==================================================")
    print(f"🎉 Hoàn thành sinh TTS cho {generated_count} chương trong {total_time:.2f}s!")

if __name__ == "__main__":
    main()
