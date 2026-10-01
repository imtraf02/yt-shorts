#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Sinh một câu thử bằng VieNeu v3 Turbo trên CUDA, WAV 48 kHz PCM 24-bit."""

import sys
import time
import argparse
from pathlib import Path

from tts_audio import SAMPLE_RATE, WAV_SUBTYPE, create_vieneu_tts, process_tts_audio, write_verified_wav

# Thiết lập encoding UTF-8 cho Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

def generate_voiceover(
    text: str,
    output_path: str,
    voice: str = "Trúc Ly",
    require_cuda: bool = True,
):
    """
    Sinh audio voiceover từ text bằng VieNeu-TTS.
    Mặc định: voice="Trúc Ly"
    """
    out_file = Path(output_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)
    
    if out_file.suffix.lower() != ".wav":
        raise ValueError("Pipeline TTS chỉ xuất WAV; hãy dùng đường dẫn có đuôi .wav.")

    print("🚀 Khởi tạo VieNeu-TTS v3 Turbo (CUDA/PyTorch bắt buộc)...")
    tts, engine = create_vieneu_tts(require_cuda=require_cuda, max_batch_size=1)
    
    print(f"🎙️ Đang sinh âm thanh với giọng: [{voice}]...")
    print(f"📝 Kịch bản: \"{text[:120]}...\" (Tổng {len(text.split())} từ)")
    
    t0 = time.time()
    try:
        audio = tts.infer(text, voice=voice)
        t_gen = time.time() - t0
        audio, quality = process_tts_audio(audio)
        file_qa = write_verified_wav(out_file, audio)
    finally:
        close = getattr(tts, "close", None)
        if callable(close):
            close()

    duration_s = len(audio) / SAMPLE_RATE
    rtf = t_gen / duration_s if duration_s > 0 else 0
    
    print(f"✅ Đã lưu voiceover tại: {out_file}")
    print(f"⚡ Backend: {engine['backend']} · device={engine['device']} · GPU={engine['gpu']}")
    print(
        f"📊 WAV {SAMPLE_RATE} Hz {WAV_SUBTYPE} · {duration_s:.2f}s · "
        f"true peak {quality['outputTruePeakDbfs']:.2f} dBFS · "
        f"clipping={quality['clippedSamples']} · RTF {rtf:.3f}"
    )
    print(f"🔎 Đọc lại file: {file_qa['frames']} samples · {file_qa['fileBytes']} bytes")
    return str(out_file), duration_s

def main():
    parser = argparse.ArgumentParser(description="Tạo audio TTS tiếng Việt cho Shorts bằng VieNeu-TTS.")
    parser.add_argument("--text", type=str, help="Văn bản trực tiếp cần đọc")
    parser.add_argument("--file", type=str, help="Đường dẫn file text chứa kịch bản")
    parser.add_argument("--out", type=str, default="public/audio/voiceover.wav", help="Đường dẫn file wav xuất ra")
    parser.add_argument("--voice", type=str, default="Trúc Ly", help="Tên giọng đọc (Mặc định: 'Trúc Ly')")
    parser.add_argument("--allow-cpu", action="store_true", help="Cho phép fallback ONNX/CPU có chủ đích")
    
    args = parser.parse_args()
    
    if args.file:
        text = Path(args.file).read_text(encoding="utf-8").strip()
    elif args.text:
        text = args.text.strip()
    else:
        # Text demo mặc định
        text = "Xin chào các bạn! Tôi là Trúc Ly, giọng đọc mặc định của kênh. Hãy bắt đầu hành trình khám phá những điều thú vị ngay sau đây!"
    
    generate_voiceover(text, args.out, voice=args.voice, require_cuda=not args.allow_cpu)

if __name__ == "__main__":
    main()
