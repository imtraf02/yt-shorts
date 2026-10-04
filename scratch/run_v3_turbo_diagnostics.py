"""Generate sentence-aligned Truc Ly A/B samples without changing production WAVs."""
from __future__ import annotations

import argparse
import ctypes
import importlib.metadata as metadata
import json
import math
import os
from pathlib import Path
import platform
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
OUT = ROOT / "out" / "tts-live-test-2026-10-04"
os.environ.setdefault("HF_HOME", str(ROOT / "VieNeu-TTS" / ".cache" / "huggingface"))
os.environ.setdefault("HF_HUB_DISABLE_IMPLICIT_TOKEN", "1")

import numpy as np
import soundfile as sf
from scipy.signal import resample_poly
import generate_tts_sentences as sentence_pipeline
from tts_audio import process_tts_audio, write_verified_wav


def metrics(x, rate=48000):
    x = np.asarray(x, dtype=np.float64).reshape(-1)
    peak = float(np.max(np.abs(x)))
    tp = float(np.max(np.abs(resample_poly(x, 4, 1))))
    n = x.size // 4096 * 4096
    spectrum = np.abs(np.fft.rfft(x[:n].reshape(-1, 4096) * np.hanning(4096))) ** 2
    frequencies = np.fft.rfftfreq(4096, 1 / rate)
    return {
        "seconds": x.size / rate,
        "samplePeakDbfs": 20 * math.log10(max(peak, 1e-12)),
        "estimatedTruePeakDbfs": 20 * math.log10(max(tp, 1e-12)),
        "samplesOutsidePcmRange": int(np.count_nonzero(np.abs(x) >= 1)),
        "rmsDbfs": 20 * math.log10(max(float(np.sqrt(np.mean(x*x))), 1e-12)),
        "dcOffset": float(np.mean(x)),
        "maxAdjacentStep": float(np.max(np.abs(np.diff(x)))),
        "energyAbove16kPercent": 100 * float(spectrum[:, frequencies > 16000].sum()) / max(float(spectrum.sum()), 1e-30),
    }


def run(precision, seed=20261004, label=None, only_sentence=None):
    OUT.mkdir(parents=True, exist_ok=True)
    inputs = [
        {"id": "S001", "text": "Xin chào, đây là mẫu kiểm tra giọng Trúc Ly được tạo trực tiếp trên máy này."},
        {"id": "S002", "text": "Sương sớm phủ trên cánh đồng, gió nhẹ thổi qua hàng tre xanh."},
        {"id": "S003", "text": "Ngay lúc này, ở Việt Nam có thể đang là buổi tối, ở châu Âu là buổi chiều, còn ở Mỹ là buổi sáng, nhưng tất cả những chiếc đồng hồ ấy vẫn có thể mô tả chính xác cùng một khoảnh khắc."},
    ]
    if only_sentence:
        inputs = [item for item in inputs if item["id"] == only_sentence]
        if not inputs:
            raise ValueError("Unknown sentence ID")
    input_path = OUT / (f"{label}-sentences.json" if label else "sentences.json")
    input_path.write_text(json.dumps(inputs, ensure_ascii=False, indent=2), encoding="utf-8")
    mode_dir = OUT / (label or precision)
    mode_dir.mkdir(parents=True, exist_ok=True)
    comparisons = []
    index = 0

    def capture(raw, **kwargs):
        nonlocal index
        item = inputs[index]
        index += 1
        raw = np.asarray(raw, dtype=np.float32).reshape(-1)
        original_metrics = metrics(raw)
        # Baseline: gain reduction only, without spectral filtering or denoising.
        true_peak = float(np.max(np.abs(resample_poly(raw, 4, 1))))
        gain = min(1.0, 10 ** (-3 / 20) / max(true_peak, 1e-12))
        baseline = np.concatenate((raw * gain, np.zeros(19200, dtype=np.float32)))
        baseline_path = mode_dir / (item["id"] + "-gain-only.wav")
        write_verified_wav(baseline_path, baseline)
        processed, quality = process_tts_audio(raw, **kwargs)
        comparisons.append({
            **item, "original": original_metrics, "baselineGainDb": 20 * math.log10(gain),
            "gainOnlyFile": str(baseline_path), "processedFile": str(mode_dir / (item["id"] + ".wav")),
            "processed": metrics(processed), "processing": quality,
        })
        # Checkpoint after each sentence, even if later inference fails.
        (mode_dir / "comparison.json").write_text(json.dumps(comparisons, ensure_ascii=False, indent=2), encoding="utf-8")
        return processed, quality

    original_factory = sentence_pipeline.create_vieneu_tts
    if precision == "int8":
        def factory(**kwargs):
            from vieneu import Vieneu
            tts = Vieneu(mode="v3turbo", backend="onnx", device="cpu", precision="int8", max_batch_size=1)
            return tts, {"backend": tts.backend, "device": str(getattr(tts.engine.device, "type", tts.engine.device)), "gpu": None, "sampleRate": tts.sample_rate, "precision": precision}
        sentence_pipeline.create_vieneu_tts = factory
    sentence_pipeline.process_tts_audio = capture
    np.random.seed(seed)
    started = time.perf_counter()
    try:
        result = sentence_pipeline.generate_sentence_batch(str(input_path), str(mode_dir), batch_size=1, require_cuda=False)
    finally:
        sentence_pipeline.create_vieneu_tts = original_factory
        sentence_pipeline.process_tts_audio = process_tts_audio
    environment = {
        "python": sys.version, "processor": platform.processor(), "precision": precision,
        "packages": {name: metadata.version(name) for name in ["vieneu", "onnxruntime", "numpy", "soundfile", "scipy", "sea-g2p", "huggingface-hub"]},
        "generationSeconds": time.perf_counter() - started,
        "voice": "Trúc Ly", "seed": seed,
        "limitations": ["Objective measurements cannot prove absence of audible codec artifacts.",
                        "Same seed across different backends does not guarantee identical sampled tokens.",
                        "Gain-only and processed files use the identical source waveform for each sentence."],
    }
    try:
        ctypes.WinDLL("nvcuda.dll")
        environment["cudaDriverPresent"] = True
    except OSError:
        environment["cudaDriverPresent"] = False
    (mode_dir / "environment.json").write_text(json.dumps(environment, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"precision": precision, "samples": len(result), "generationSeconds": environment["generationSeconds"], "originalClipping": sum(x["original"]["samplesOutsidePcmRange"] for x in comparisons)}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--precision", choices=["fp32", "int8"], default="fp32")
    parser.add_argument("--seed", type=int, default=20261004)
    parser.add_argument("--label")
    parser.add_argument("--only-sentence", choices=["S001", "S002", "S003"])
    args = parser.parse_args()
    run(args.precision, args.seed, args.label, args.only_sentence)
