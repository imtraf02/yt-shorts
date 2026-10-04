"""Attenuation-only speech RMS matching for listening comparisons."""
import json
import math
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import numpy as np
import soundfile as sf
from tts_audio import write_verified_wav

OUT = ROOT / "out/tts-live-test-2026-10-04"
TARGET = OUT / "level-matched"
TARGET.mkdir(parents=True, exist_ok=True)
results = {"method": "Speech RMS matching by gain reduction only; no denoise, filtering or timing changes.", "pairs": []}
for label, names in [("first-run", ["fp32", "int8"]), ("repeat", ["repeat-fp32", "repeat-int8"])]:
    pair = []
    for name in names:
        item = next(x for x in json.loads((OUT / name / "comparison.json").read_text(encoding="utf-8")) if x["id"] == "S002")
        audio, rate = sf.read(item["gainOnlyFile"], dtype="float32")
        speech_samples = round(item["original"]["seconds"] * rate)
        rms = float(np.sqrt(np.mean(audio[:speech_samples].astype(np.float64)**2)))
        pair.append((name, audio, rate, rms, item))
    target_rms = min(x[3] for x in pair)
    record = {"label": label, "targetSpeechRmsDbfs": 20 * math.log10(target_rms), "samples": []}
    for name, audio, rate, rms, item in pair:
        gain = min(1.0, target_rms / rms)
        path = TARGET / f"{label}-{name}.wav"
        qa = write_verified_wav(path, audio * np.float32(gain))
        record["samples"].append({"mode": name, "source": item["gainOnlyFile"], "file": str(path),
                                  "speechRmsBeforeDbfs": 20 * math.log10(rms), "gainDb": 20 * math.log10(gain), "qa": qa})
    results["pairs"].append(record)
(TARGET / "report.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"pairs": [{"label": p["label"], "targetRmsDbfs": p["targetSpeechRmsDbfs"],
                             "gains": {s["mode"]: s["gainDb"] for s in p["samples"]}} for p in results["pairs"]]}, ensure_ascii=False))
