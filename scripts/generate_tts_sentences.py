#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Sinh VieNeu-TTS v3 Turbo theo từng câu, CUDA bắt buộc, WAV 48 kHz."""

from __future__ import annotations

import argparse
import json
import math
import re
import sys
import time
from pathlib import Path
from typing import Any

import numpy as np

from tts_audio import SAMPLE_RATE, WAV_SUBTYPE, create_vieneu_tts, process_tts_audio, write_verified_wav


if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


def load_items(input_file: str, output_dir: str) -> list[dict[str, Any]]:
    in_path = Path(input_file)
    out_name = Path(output_dir).name
    if not in_path.is_file():
        raise FileNotFoundError(f"Không tìm thấy input: {in_path}")

    items: list[dict[str, Any]] = []
    if in_path.suffix.lower() == ".json":
        data = json.loads(in_path.read_text(encoding="utf-8-sig"))
        if isinstance(data, dict):
            data = data.get("scenes") or data.get("items") or data.get("sentences")
        if not isinstance(data, list):
            raise ValueError("JSON phải là mảng hoặc object có scenes/items/sentences là mảng.")
        for idx, entry in enumerate(data):
            if isinstance(entry, str):
                item = {"id": f"S{idx + 1:03d}", "text": entry, "image": f"images/{out_name}/{idx + 1:03d}.png"}
            elif isinstance(entry, dict):
                item = {
                    "id": str(entry.get("id") or f"S{idx + 1:03d}"),
                    "text": str(entry.get("text") or entry.get("sentence") or entry.get("prompt_text") or ""),
                    "image": entry.get("file") or entry.get("image") or "",
                    "description": entry.get("description", ""),
                }
            else:
                raise ValueError(f"Phần tử JSON thứ {idx + 1} không hợp lệ.")
            items.append(item)
    else:
        raw_lines = [line.strip() for line in in_path.read_text(encoding="utf-8-sig").splitlines() if line.strip()]
        valid_lines = [l for l in raw_lines if not l.startswith("#") and not l.startswith("Mỗi dòng là")]
        items = []
        for idx, line in enumerate(valid_lines):
            if "\t" in line:
                parts = line.split("\t", 1)
                item_id = parts[0].strip()
                item_text = parts[1].strip()
            else:
                item_id = f"S{idx + 1:03d}"
                item_text = line
            items.append({"id": item_id, "text": item_text, "image": f"images/{out_name}/{idx + 1:03d}.png"})

    if not items:
        raise ValueError(f"Không tìm thấy câu nào trong: {input_file}")

    seen_ids: set[str] = set()
    for item in items:
        item["id"] = item["id"].strip()
        item["text"] = item["text"].strip()
        if not item["id"] or not item["text"]:
            raise ValueError("Mỗi câu phải có id và text không rỗng.")
        if item["id"] in seen_ids:
            raise ValueError(f"ID câu bị trùng: {item['id']}")
        seen_ids.add(item["id"])
    return items


def safe_wav_name(sentence_id: str) -> str:
    safe = re.sub(r"[^0-9A-Za-z._-]+", "_", sentence_id).strip("._")
    if not safe:
        raise ValueError(f"ID không thể dùng làm tên file: {sentence_id!r}")
    return f"{safe}.wav"


def generate_sentence_batch(
    input_file: str,
    output_dir: str,
    voice: str = "Trúc Ly",
    fps: int = 30,
    pause_seconds: float = 0.4,
    target_peak_dbfs: float = -3.0,
    highpass_hz: float = 45.0,
    lowpass_hz: float = 16_000.0,
    fade_ms: float = 10.0,
    pad_audio_silence: bool = True,
    metadata_out: str | None = None,
    batch_size: int = 16,
    require_cuda: bool = True,
) -> list[dict[str, Any]]:
    if fps <= 0 or pause_seconds < 0 or batch_size <= 0:
        raise ValueError("fps và batch_size phải > 0; pause_seconds phải >= 0.")
    if target_peak_dbfs >= 0 or fade_ms < 0:
        raise ValueError("target_peak_dbfs phải âm và fade_ms phải >= 0.")

    items = load_items(input_file, output_dir)
    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    pause_samples = int(round(pause_seconds * SAMPLE_RATE))

    print("=" * 68)
    print(f"🎬 VieNeu-TTS từng câu: {out_dir.name} · {len(items)} câu")
    print(f"🎙️ {voice} · WAV {SAMPLE_RATE} Hz mono {WAV_SUBTYPE} · {fps} FPS")
    print(f"🧹 HPF {highpass_hz:g} Hz · LPF {lowpass_hz:g} Hz · true peak {target_peak_dbfs:g} dBFS")
    print(f"⏸️ Ngắt câu {pause_seconds:.3f}s · GPU batch {batch_size}")
    print("=" * 68)

    init_started = time.perf_counter()
    tts, engine = create_vieneu_tts(require_cuda=require_cuda, max_batch_size=batch_size)
    print(
        f"⚡ VieNeu sẵn sàng sau {time.perf_counter() - init_started:.2f}s · "
        f"backend={engine['backend']} · device={engine['device']} · GPU={engine['gpu']}"
    )

    results: list[dict[str, Any]] = []
    speech_samples_total = 0
    generation_started = time.perf_counter()

    try:
        for start in range(0, len(items), batch_size):
            batch = items[start : start + batch_size]
            texts = [item["text"] for item in batch]
            batch_started = time.perf_counter()
            audios = tts.infer_batch(texts, voice=voice, batch_size=batch_size)
            if len(audios) != len(batch):
                raise RuntimeError(f"VieNeu trả {len(audios)} waveform cho batch {len(batch)} câu.")

            for offset, (item, raw_audio) in enumerate(zip(batch, audios), start=1):
                index = start + offset
                processed, quality = process_tts_audio(
                    raw_audio,
                    sample_rate=SAMPLE_RATE,
                    target_peak_dbfs=target_peak_dbfs,
                    highpass_hz=highpass_hz,
                    lowpass_hz=lowpass_hz,
                    fade_ms=fade_ms,
                )
                speech_samples = int(processed.size)
                speech_samples_total += speech_samples
                if pad_audio_silence and pause_samples:
                    audio_to_save = np.concatenate((processed, np.zeros(pause_samples, dtype=np.float32)))
                else:
                    audio_to_save = processed

                filename = safe_wav_name(item["id"])
                output_path = out_dir / filename
                file_qa = write_verified_wav(output_path, audio_to_save, SAMPLE_RATE)
                expected_total_samples = speech_samples + (pause_samples if pad_audio_silence else 0)
                if file_qa["frames"] != expected_total_samples:
                    raise RuntimeError(f"Số mẫu WAV sai ở {output_path}: {file_qa['frames']} != {expected_total_samples}")

                speech_seconds = speech_samples / SAMPLE_RATE
                timeline_samples = speech_samples + pause_samples
                duration_in_frames = math.ceil(timeline_samples * fps / SAMPLE_RATE)
                speech_frames = math.ceil(speech_samples * fps / SAMPLE_RATE)
                pause_frames = duration_in_frames - speech_frames
                audio_src = f"audio/{out_dir.name}/{filename}".replace("\\", "/")

                results.append(
                    {
                        "id": item["id"],
                        "text": item["text"],
                        "image": item.get("image", ""),
                        "description": item.get("description", ""),
                        "audioSrc": audio_src,
                        "speechDurationMs": round(speech_seconds * 1000),
                        "pauseDurationMs": round(pause_seconds * 1000),
                        "durationMs": round(timeline_samples * 1000 / SAMPLE_RATE),
                        "speechFrames": speech_frames,
                        "pauseFrames": pause_frames,
                        "durationInFrames": duration_in_frames,
                        "audioDurationSeconds": round(file_qa["durationSeconds"], 6),
                        "rawSpeechSeconds": round(speech_seconds, 6),
                        "audioFormat": "wav",
                        "sampleRate": SAMPLE_RATE,
                        "wavSubtype": WAV_SUBTYPE,
                        "quality": {**quality, **file_qa},
                    }
                )
                print(
                    f"[{index}/{len(items)}] {filename} · lời {speech_seconds:.2f}s · "
                    f"true peak {quality['outputTruePeakDbfs']:.2f} dBFS · clipping=0"
                )
            print(f"   ↳ Batch {start // batch_size + 1} xong trong {time.perf_counter() - batch_started:.2f}s")
    finally:
        close = getattr(tts, "close", None)
        if callable(close):
            close()

    elapsed = time.perf_counter() - generation_started
    speech_seconds_total = speech_samples_total / SAMPLE_RATE
    average_rtf = elapsed / speech_seconds_total if speech_seconds_total else 0.0

    manifest_file = Path(metadata_out) if metadata_out else out_dir / "sentences_manifest.json"
    manifest_file.parent.mkdir(parents=True, exist_ok=True)
    manifest_file.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")

    run_report = {
        "engine": engine,
        "voice": voice,
        "format": "wav",
        "sampleRate": SAMPLE_RATE,
        "channels": 1,
        "wavSubtype": WAV_SUBTYPE,
        "batchSize": batch_size,
        "sentenceCount": len(results),
        "pauseSeconds": pause_seconds,
        "processing": {
            "highpassHz": highpass_hz,
            "lowpassHz": lowpass_hz,
            "targetTruePeakDbfs": target_peak_dbfs,
            "fadeMs": fade_ms,
        },
        "speechDurationSeconds": round(speech_seconds_total, 6),
        "generationSeconds": round(elapsed, 3),
        "rtf": round(average_rtf, 4),
        "manifest": str(manifest_file).replace("\\", "/"),
    }
    report_path = out_dir / "tts_run.json"
    report_path.write_text(json.dumps(run_report, ensure_ascii=False, indent=2), encoding="utf-8")

    print("=" * 68)
    print(f"✅ Hoàn tất {len(results)} WAV · RTF {average_rtf:.3f} · manifest: {manifest_file}")
    print(f"📋 Báo cáo backend/chất lượng: {report_path}")
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description="Sinh VieNeu-TTS theo từng câu bằng GPU, chỉ xuất WAV 48 kHz.")
    parser.add_argument("--input", "-i", required=True, help="Storyboard JSON hoặc TXT, mỗi dòng một câu")
    parser.add_argument("--outdir", "-o", required=True, help="Thư mục public/audio/<slug>")
    parser.add_argument("--voice", "-v", default="Trúc Ly", help="Giọng preset VieNeu")
    parser.add_argument("--format", "-f", choices=["wav"], default="wav", help="Chỉ hỗ trợ WAV")
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--pause", "-p", "--pause-seconds", type=float, default=0.4)
    parser.add_argument("--batch-size", type=int, default=16, help="Số câu mỗi batch CUDA")
    parser.add_argument("--true-peak-dbfs", type=float, default=-3.0)
    parser.add_argument("--highpass-hz", type=float, default=45.0)
    parser.add_argument("--lowpass-hz", type=float, default=16_000.0)
    parser.add_argument("--fade-ms", type=float, default=10.0)
    parser.add_argument("--no-audio-silence", action="store_true")
    parser.add_argument("--manifest", "-m", default=None)
    parser.add_argument(
        "--allow-cpu",
        action="store_true",
        help="Cho phép ONNX/CPU khi không có CUDA; mặc định sẽ dừng để tránh fallback ngoài ý muốn",
    )
    args = parser.parse_args()

    generate_sentence_batch(
        input_file=args.input,
        output_dir=args.outdir,
        voice=args.voice,
        fps=args.fps,
        pause_seconds=args.pause,
        target_peak_dbfs=args.true_peak_dbfs,
        highpass_hz=args.highpass_hz,
        lowpass_hz=args.lowpass_hz,
        fade_ms=args.fade_ms,
        pad_audio_silence=not args.no_audio_silence,
        metadata_out=args.manifest,
        batch_size=args.batch_size,
        require_cuda=not args.allow_cpu,
    )


if __name__ == "__main__":
    main()
