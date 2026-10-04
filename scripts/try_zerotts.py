"""Standalone ZeroTTS sentence trial; keeps production VieNeu audio untouched."""
from __future__ import annotations

import argparse
from datetime import date
from html import escape
import importlib.metadata as metadata
import json
import math
import os
from pathlib import Path
import platform
import subprocess
import time

ROOT = Path(__file__).resolve().parents[1]
os.environ.setdefault("HF_HOME", str(ROOT / "ZeroTTS/.cache/huggingface"))
os.environ.setdefault("HF_HUB_DISABLE_IMPLICIT_TOKEN", "1")
os.environ.setdefault("ZEROTTS_VOICES_HOME", str(ROOT / "ZeroTTS/.cache/voices"))

import numpy as np
import soundfile as sf
from scipy.signal import resample_poly
from tts_audio import process_tts_audio, write_verified_wav
from zerotts import ZeroTTS

SENTENCES = [
    {"id": "S001", "text": "Xin chào, đây là mẫu kiểm tra giọng Mai Chi được tạo trực tiếp trên máy này."},
    {"id": "S002", "text": "Sương sớm phủ trên cánh đồng, gió nhẹ thổi qua hàng tre xanh."},
    {"id": "S003", "text": "Ngay lúc này, ở Việt Nam có thể đang là buổi tối, ở châu Âu là buổi chiều, còn ở Mỹ là buổi sáng, nhưng tất cả những chiếc đồng hồ ấy vẫn có thể mô tả chính xác cùng một khoảnh khắc."},
]


def measures(audio):
    x = np.asarray(audio, dtype=np.float64).reshape(-1)
    if not x.size or not np.all(np.isfinite(x)):
        raise ValueError("Empty or non-finite waveform")
    true_peak = float(np.max(np.abs(resample_poly(x, 4, 1))))
    return {
        "seconds": x.size / 48000,
        "samplePeakDbfs": 20 * math.log10(max(float(np.max(np.abs(x))), 1e-12)),
        "estimatedTruePeakDbfs": 20 * math.log10(max(true_peak, 1e-12)),
        "rmsDbfs": 20 * math.log10(max(float(np.sqrt(np.mean(x * x))), 1e-12)),
        "samplesOutsidePcmRange": int(np.count_nonzero(np.abs(x) >= 1)),
        "dcOffset": float(np.mean(x)),
    }


def preview(out, report):
    voice_name = report.get("voiceDisplayName", report["voice"])
    cards = []
    for row in report["sentences"]:
        players = []
        for label, filename in [
            (f"ZeroTTS {voice_name} — chỉ giảm gain, không lọc", row["gainOnlyFile"]),
            (f"ZeroTTS {voice_name} — xử lý WAV chuẩn", row["processedFile"]),
        ]:
            players.append(f'<p>{escape(label)}</p><audio controls preload="none" src="{escape(filename)}"></audio>')
        if row.get("comparison"):
            for sample in row["comparison"]:
                players.append(f'<p>{escape(sample["label"])}</p><audio controls preload="none" src="{escape(sample["file"])}"></audio>')
        cards.append(f'<section><h2>{row["id"]}</h2><p>{escape(row["text"])}</p>' + "".join(players) + '</section>')
    html = '''<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Thử ZeroTTS trên máy này</title><style>body{background:#101827;color:#eef2ff;font:16px system-ui;max-width:920px;margin:40px auto;padding:0 20px}section{background:#1c2940;padding:24px;border-radius:16px;margin:24px 0}audio{width:100%}p{line-height:1.6}a{color:#93c5fd}</style>
<h1>ZeroTTS · CPU ONNX</h1><p>WAV 48 kHz mono PCM 24-bit. Mỗi câu có 0,4 giây nghỉ. Hai bản “cân RMS” chỉ giảm âm lượng để tránh thiên lệch do độ lớn; ZeroTTS và VieNeu dùng hai giọng khác nhau.</p>
<p>Bản chỉ giảm gain giữ nguyên phổ âm để kiểm tra tiếng rè; bản xử lý dùng lọc 45 Hz–16 kHz, bỏ DC và fade biên 10 ms. Đo không clipping không xác nhận hết artefact nghe được.</p>'''
    if (out / "voices/index.html").is_file():
        html += '<section><h2>Thử tất cả 8 giọng</h2><p><a href="voices/">Mai Chi, Bảo Trang, Kim Oanh, Hà My, Gia Huy, Hữu Đức, Quang Minh, Tiến Đạt →</a></p></section>'
    html += "".join(cards)
    if (out / "baotrang/S001-gain-only.wav").is_file():
        html += '<section><h2>Giọng Bảo Trang</h2><p>Sương sớm phủ trên cánh đồng, gió nhẹ thổi qua hàng tre xanh.</p><audio controls preload="none" src="baotrang/S001-gain-only.wav"></audio><p><a href="baotrang/">Xem bản xử lý và số đo Bảo Trang</a></p></section>'
    html += '<p><a href="report.json">Số đo và phiên bản</a></p><script>document.querySelectorAll("audio").forEach(a=>a.addEventListener("play",()=>document.querySelectorAll("audio").forEach(b=>{if(a!==b)b.pause()})))</script></html>'
    (out / "index.html").write_text(html, encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--voice", default="maichi")
    parser.add_argument("--text", help="One custom sentence instead of the three trial sentences")
    parser.add_argument("--output", type=Path, default=ROOT / f"out/zerotts-test-{date.today()}")
    parser.add_argument("--seed", type=int, default=20261004)
    parser.add_argument("--revision", help="Hugging Face model commit to reproduce a run")
    parser.add_argument("--offline", action="store_true")
    args = parser.parse_args()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    print("Loading ZeroTTS model (first run downloads weights)...", flush=True)
    started = time.perf_counter()
    tts = ZeroTTS.from_pretrained(revision=args.revision, local_files_only=args.offline,
                                  providers=["CPUExecutionProvider"], intra_op_num_threads=4)
    if tts.sample_rate != 48000:
        raise ValueError(f"Unexpected sample rate: {tts.sample_rate}")
    if args.voice not in tts.list_voices():
        raise ValueError(f"Unknown voice; available: {tts.list_voices()}")
    source_revision = subprocess.check_output(["git", "-C", str(ROOT / "ZeroTTS"), "rev-parse", "HEAD"], text=True).strip()
    report = {
        "engine": "ZeroTTS", "sourceCommit": source_revision,
        "modelDirectory": str(tts.model_dir), "modelRevision": tts.model_dir.name,
        "voice": args.voice, "voiceDisplayName": tts.load_voice(args.voice).display_name,
        "availableVoices": tts.list_voices(), "providers": tts.prefix_step_sess.get_providers(),
        "python": platform.python_version(),
        "packages": {name: metadata.version(name) for name in ["zerotts", "onnxruntime", "numpy", "scipy", "soundfile", "tokenizers", "huggingface-hub"]},
        "modelLoadSecondsIncludingDownload": time.perf_counter() - started,
        "seed": args.seed, "parameters": {"cfg_scale": 1.0, "audio_temperature": 0.8, "audio_topk": 25, "audio_topp": 0.95, "audio_repetition_penalty": 1.2, "eoa_extra_frames": 1},
        "pauseSeconds": 0.4, "sentences": [],
    }
    inputs = [{"id": "S001", "text": args.text}] if args.text else [dict(s) for s in SENTENCES]
    if not args.text:
        inputs[0]["text"] = inputs[0]["text"].replace("Mai Chi", report["voiceDisplayName"])
    print(f"Model loaded; voices: {tts.list_voices()}", flush=True)
    for i, sentence in enumerate(inputs):
        np.random.seed(args.seed + i)
        tick = time.perf_counter()
        raw = tts.synthesize(sentence["text"], voice=args.voice, **report["parameters"]).reshape(-1)
        elapsed = time.perf_counter() - tick
        raw_metrics = measures(raw)
        peak = 10 ** (raw_metrics["estimatedTruePeakDbfs"] / 20)
        gain = min(1.0, 10 ** (-3 / 20) / max(peak, 1e-12))
        gap = np.zeros(19200, dtype=np.float32)
        gain_only = np.concatenate((raw * np.float32(gain), gap))
        processed, processing = process_tts_audio(raw)
        processed = np.concatenate((processed, gap))
        baseline_name = sentence["id"] + "-gain-only.wav"
        processed_name = sentence["id"] + ".wav"
        row = {**sentence, "original": raw_metrics, "generationSeconds": elapsed,
               "realTimeFactor": elapsed / raw_metrics["seconds"], "baselineGainDb": 20 * math.log10(gain),
               "gainOnlyFile": baseline_name, "processedFile": processed_name, "processing": processing,
               "gainOnlyQa": write_verified_wav(out / baseline_name, gain_only),
               "processedQa": write_verified_wav(out / processed_name, processed)}
        old_root = ROOT / "out/tts-live-test-2026-10-04/int8"
        old_report = old_root / "comparison.json"
        if not args.text and sentence["id"] != "S001" and old_report.exists():
            prior = next((s for s in json.loads(old_report.read_text(encoding="utf-8")) if s["id"] == sentence["id"] and s["text"] == sentence["text"]), None)
            if prior:
                previous, rate = sf.read(prior["gainOnlyFile"], dtype="float32")
                if rate != 48000:
                    raise ValueError("Comparison sample rate mismatch")
                sources = [(f'ZeroTTS {report["voiceDisplayName"]} — cân RMS', "zerotts", gain_only, raw.size),
                           ("VieNeu INT8 Trúc Ly — cân RMS", "vieneu-int8", previous, round(prior["original"]["seconds"] * rate))]
                rms = [float(np.sqrt(np.mean(x[:n].astype(np.float64) ** 2))) for _, _, x, n in sources]
                target = min(rms)
                row["comparison"] = []
                for (label, key, x, n), level in zip(sources, rms):
                    attenuation = min(1.0, target / max(level, 1e-12))
                    filename = f'{sentence["id"]}-{key}-matched.wav'
                    row["comparison"].append({"label": label, "file": filename, "gainDb": 20 * math.log10(attenuation),
                                              "targetSpeechRmsDbfs": 20 * math.log10(target),
                                              "qa": write_verified_wav(out / filename, x * np.float32(attenuation))})
        report["sentences"].append(row)
        (out / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        preview(out, report)
        print(f'{sentence["id"]}: {raw_metrics["seconds"]:.2f}s speech, {elapsed:.2f}s generation, RTF={row["realTimeFactor"]:.2f}, WAV verified', flush=True)
    print(f"Preview: {out / 'index.html'}", flush=True)


if __name__ == "__main__":
    main()
