import wave
import numpy as np
import json
from pathlib import Path

raw = json.loads(Path("src/data/facebook_who_pays_captions_raw_part1.json").read_text(encoding="utf-8"))
with wave.open("public/audio/facebook_who_pays_part1.wav", "rb") as wf:
    sr = wf.getframerate()
    data = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16)

print(f"{'Token':<15} | {'Whisper startMs':<16} | {'Whisper endMs':<14} | {'RMS in window':<14}")
print("-" * 65)

for tok in raw[:12]:
    text = tok["text"].strip()
    s_ms = tok["startMs"]
    e_ms = tok["endMs"]
    s_samp = int(s_ms * sr / 1000)
    e_samp = int(e_ms * sr / 1000)
    chunk = data[s_samp:e_samp]
    rms = np.sqrt(np.mean(chunk.astype(float)**2)) if len(chunk) > 0 else 0
    print(f"{text:<15} | {s_ms:<16} | {e_ms:<14} | {rms:<14.1f}")
