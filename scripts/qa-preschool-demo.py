"""Decode the finished demo and measure audio without modifying the MP4."""
import json
import io
import math
import subprocess
from pathlib import Path
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

ROOT = Path(__file__).resolve().parent.parent
SLUG = "preschool-animals-whiteboard-demo"
video = ROOT / "out" / SLUG / f"{SLUG}-guess-3s.mp4"
ffmpeg = ROOT / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"
decoded = subprocess.run([str(ffmpeg), "-v", "error", "-i", str(video), "-vn", "-ar", "48000", "-ac", "2", "-c:a", "pcm_s24le", "-f", "wav", "-"],
                         check=True, capture_output=True).stdout
samples, sample_rate = sf.read(io.BytesIO(decoded), dtype="float32", always_2d=True)
assert sample_rate == 48000
assert np.isfinite(samples).all()
peak = float(np.max(np.abs(samples)))
true_peak = float(np.max(np.abs(resample_poly(samples, 4, 1, axis=0))))
db = lambda value: round(20 * math.log10(max(value, 1e-12)), 3)
timeline = json.loads((ROOT / "src" / "data" / SLUG / "timeline.json").read_text(encoding="utf-8"))
sentences = []
for item in timeline["sentences"]:
    start = int(item["start"] / 30 * 48000)
    end = start + int(item["speechMs"] / 1000 * 48000)
    rms = float(np.sqrt(np.mean(samples[start:end].astype(np.float64) ** 2)))
    sentences.append({"id": item["id"], "speechRmsDbfs": db(rms)})
last = timeline["sentences"][-1]
ticks = []
isolated_ticks = []
for cue in timeline["sfx"]:
    if "-tick-" not in cue["id"]:
        continue
    start = int(cue["from"] / 30 * 48000)
    end = start + int(0.24 * 48000)
    window = samples[start:end].astype(np.float64)
    # RMS includes voice during drawing; isolated quiz ticks are the audibility gate.
    ticks.append({"id": cue["id"], "rmsDbfs": db(float(np.sqrt(np.mean(window ** 2)))),
                  "peakDbfs": db(float(np.max(np.abs(window))))})
    if "-draw-tick-" not in cue["id"]:
        # Quiz speech has ended. Compare each tick to its own music-only gap,
        # so active narration cannot disguise a missing countdown sound.
        baseline = samples[start + int(0.35 * 48000):start + int(0.65 * 48000)].astype(np.float64)
        baseline_rms = db(float(np.sqrt(np.mean(baseline ** 2))))
        isolated_ticks.append({"id": cue["id"], "tickRmsDbfs": ticks[-1]["rmsDbfs"],
                               "musicGapRmsDbfs": baseline_rms,
                               "aboveMusicDb": round(ticks[-1]["rmsDbfs"] - baseline_rms, 3)})
assert ticks and all(t["rmsDbfs"] > -32 for t in ticks), "Countdown missing or too quiet in MP4"
assert isolated_ticks and all(t["aboveMusicDb"] > 12 for t in isolated_ticks), "Quiz tick buried under music"
tail_start = int((last["start"] / 30 + last["speechMs"] / 1000 + 0.2) * 48000)
tail = samples[tail_start:]
report = {"decodedSampleRate": 48000, "decodedChannels": 2, "decodedSeconds": round(len(samples) / 48000, 6),
          "samplePeakDbfs": db(peak), "estimated4xTruePeakDbfs": db(true_peak),
          "clippedDecodedSamples": int(np.count_nonzero(np.abs(samples) >= 1)),
          "tailAfterLastSpeechRmsDbfs": db(float(np.sqrt(np.mean(tail.astype(np.float64) ** 2)))),
          "sentences": sentences,
          "countdownTicks": ticks, "quietestTickRmsDbfs": min(t["rmsDbfs"] for t in ticks),
          "isolatedQuizTicks": isolated_ticks, "minimumQuizTickAboveMusicDb": min(t["aboveMusicDb"] for t in isolated_ticks),
          "limitation": "Waveform checks are not subjective listening; human playback review remains required before publishing."}
assert peak < 1 and true_peak < 1, "Clipping risk"
assert all(item["speechRmsDbfs"] > -40 for item in sentences), "Unexpected quiet speech"
target = ROOT / "productions" / SLUG / "audio_qa.json"
target.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({k: v for k, v in report.items() if k not in ("sentences", "countdownTicks", "isolatedQuizTicks")}, ensure_ascii=False))
