"""Read-only PCM WAV audit; does not infer perceptual quality from peak checks."""
import json
import math
import wave
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out" / "tts-diagnostics-2026-10-04"


def read_pcm(path):
    with wave.open(str(path), "rb") as wav:
        rate, channels, width = wav.getframerate(), wav.getnchannels(), wav.getsampwidth()
        raw = wav.readframes(wav.getnframes())
    if width == 3:
        b = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 3).astype(np.int32)
        integers = b[:, 0] | (b[:, 1] << 8) | (b[:, 2] << 16)
        integers = (integers ^ 0x800000) - 0x800000
    else:
        raise ValueError(f"Unsupported sample width: {width}")
    return integers.reshape(-1, channels), rate, width, raw


def audit(path):
    integers, rate, width, _ = read_pcm(path)
    x = integers.astype(np.float64) / 8388608
    peak = float(np.max(np.abs(x)))
    mono = x.mean(axis=1)
    n = len(mono) // 4096 * 4096
    blocks = mono[:n].reshape(-1, 4096)
    energy = np.abs(np.fft.rfft(blocks * np.hanning(4096))) ** 2
    frequencies = np.fft.rfftfreq(4096, 1 / rate)
    total = float(energy.sum())
    return {
        "file": str(path.relative_to(ROOT)),
        "sampleRate": rate,
        "channels": x.shape[1],
        "bits": width * 8,
        "durationSeconds": len(x) / rate,
        "samplePeakDbfs": 20 * math.log10(max(peak, 1e-12)),
        "railSamples": int(np.count_nonzero((integers == -8388608) | (integers == 8388607))),
        "dcOffset": float(mono.mean()),
        "firstSample": float(mono[0]),
        "lastSample": float(mono[-1]),
        "maxAdjacentStep": float(np.max(np.abs(np.diff(mono)))),
        "energyAbove16kPercent": 100 * float(energy[:, frequencies > 16000].sum()) / max(total, 1e-30),
    }


report = {"limitations": [
    "Objective PCM checks only; no listening test or fresh synthesis performed.",
    "Clipping absence does not rule out model/codec artifacts or clipping before saving.",
    "Current workspace VieNeu-TTS directory is empty; configured .venv is absent.",
], "groups": []}
for slug in ["world-time-documentary", "preschool-animals-whiteboard-demo"]:
    directory = ROOT / "public" / "audio" / slug
    manifest = json.loads((directory / "sentences_manifest.json").read_text(encoding="utf-8"))
    files = [audit(directory / (item["id"] + ".wav")) for item in manifest]
    raw_peaks = [item["quality"]["inputSamplePeak"] for item in manifest]
    group = {
        "slug": slug, "fileCount": len(files),
        "railSamples": sum(f["railSamples"] for f in files),
        "samplePeakDbfsRange": [min(f["samplePeakDbfs"] for f in files), max(f["samplePeakDbfs"] for f in files)],
        "metadataInputPeakMax": max(raw_peaks),
        "metadataInputPeakOverFullScaleCount": sum(p >= 1 for p in raw_peaks),
        "formatMismatchCount": sum((f["sampleRate"], f["channels"], f["bits"]) != (48000, 1, 24) for f in files),
        "maxBoundaryMagnitude": max(max(abs(f["firstSample"]), abs(f["lastSample"])) for f in files),
        "files": files,
    }
    report["groups"].append(group)
    print(json.dumps({k: v for k, v in group.items() if k != "files"}, ensure_ascii=False))

parts = {"part1": (1, 9), "part2": (9, 17), "part3": (17, 25), "part4": (25, 33),
         "part5": (33, 41), "part6": (41, 49), "part7": (49, 57), "part8": (57, 61),
         "part9": (61, 63), "part10": (63, 65)}
report["chapterConcatenation"] = []
for part, (start, end) in parts.items():
    path = ROOT / "public" / "audio" / f"world_time_{part}.wav"
    combined = read_pcm(path)[3]
    expected = b"".join(read_pcm(ROOT / "public" / "audio" / "world-time-documentary" / f"S{i:03d}.wav")[3]
                        for i in range(start, end))
    report["chapterConcatenation"].append({"file": path.name, "pcmByteIdenticalToSentences": combined == expected})
print("Chapter PCM identical:", all(p["pcmByteIdenticalToSentences"] for p in report["chapterConcatenation"]))
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "audit.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print("Saved", OUT / "audit.json")
