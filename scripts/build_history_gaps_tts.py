# -*- coding: utf-8 -*-
"""
Script sinh audio thuyết minh chuẩn giọng Trúc Ly (VieNeu-TTS v3-Turbo)
cho phim tài liệu 'NHỮNG KHOẢNG TRỐNG LỊCH SỬ: KHI CẢ MỘT NỀN VĂN MINH BIẾN MẤT KHỎI TRANG SỬ' (7 phần)
"""

import os
import sys
import time
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import numpy as np

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--section", type=str, default="all", help="part1..part7 or 'all'")
    parser.add_argument("--force", action="store_true", help="Bắt buộc sinh lại nếu file đã tồn tại")
    args = parser.parse_args()

    meta_path = Path("src/data/history_gaps_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}. Hãy chạy prepare_history_gaps_assets.py trước.")
        return

    chapters = json.loads(meta_path.read_text(encoding="utf-8"))

    # Khởi tạo VieNeu-TTS (mặc định giọng Trúc Ly theo user rule MANDATORY)
    from vieneu import Vieneu
    print("🚀 Khởi tạo VieNeu-TTS (mode='v3turbo', GPU RTX 3060, giọng: Trúc Ly)...")
    tts = Vieneu()

    out_dir = Path("public/audio")
    out_dir.mkdir(parents=True, exist_ok=True)

    sr = 48000
    start_silence = np.zeros(int(sr * 0.20), dtype=np.float32)
    paragraph_pause = np.zeros(int(sr * 0.45), dtype=np.float32)
    end_silence = np.zeros(int(sr * 0.35), dtype=np.float32)

    total_t0 = time.time()
    generated_count = 0

    for ch in chapters:
        sec_id = ch["id"]
        if args.section != "all" and args.section != sec_id:
            continue

        target_wav = out_dir / f"history_gaps_{sec_id}.wav"
        if target_wav.exists() and not args.force:
            print(f"⏩ Đã tồn tại {target_wav}, bỏ qua.")
            continue

        paragraphs = [p.strip() for p in ch["text"].split("\n") if p.strip()]
        print(f"\n==================================================")
        print(f"🎙️ Đang sinh audio cho [{sec_id}] - {ch['title']}")
        print(f"📝 Số đoạn: {len(paragraphs)} đoạn | Tổng từ: {ch['word_count']} từ")
        t0 = time.time()
        audio_chunks = [start_silence]
        for p_idx, para in enumerate(paragraphs):
            p_audio = tts.infer(para, voice="Trúc Ly")
            audio_chunks.append(p_audio)
            if p_idx < len(paragraphs) - 1:
                audio_chunks.append(paragraph_pause)
        audio_chunks.append(end_silence)
        full_audio = np.concatenate(audio_chunks)

        t_gen = time.time() - t0
        tts.save(full_audio, str(target_wav))

        dur_s = len(full_audio) / sr
        rtf = t_gen / dur_s if dur_s > 0 else 0
        print(f"✅ Đã lưu: {target_wav}")
        print(f"📊 Thời lượng: {dur_s:.1f}s ({dur_s/60:.2f} phút) | Thời gian sinh: {t_gen:.1f}s | RTF: {rtf:.3f}x")
        generated_count += 1

    total_time = time.time() - total_t0
    print(f"\n🎉 Hoàn thành sinh {generated_count} file audio trong {total_time:.1f}s!")

if __name__ == "__main__":
    main()
