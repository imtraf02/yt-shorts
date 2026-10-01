"""Original, gentle synthesized SFX for Preschool only; no external sound libraries."""
from pathlib import Path
import json
import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parent.parent
SLUG = "preschool-animals-whiteboard-demo"
RATE = 48000
target = ROOT / "public" / "audio" / SLUG / "sfx"
target.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(731)


def save(name, audio):
    # Slow attack / fade at both edges prevents clicks; playback volumes stay gentle.
    edge = min(int(RATE * 0.012), len(audio) // 3)
    audio[:edge] *= np.linspace(0, 1, edge)
    audio[-edge:] *= np.linspace(1, 0, edge)
    audio *= 0.6 / max(float(np.max(np.abs(audio))), 1e-9)
    sf.write(target / f"{name}.wav", audio, RATE, subtype="PCM_24")
    decoded, rate = sf.read(target / f"{name}.wav")
    assert rate == RATE and np.max(np.abs(decoded)) < 1
    return {"name": name, "seconds": len(audio) / RATE, "samplePeak": float(np.max(np.abs(decoded)))}


reports = []
t = np.arange(int(RATE * 0.24)) / RATE
tick = np.sin(2 * np.pi * 880 * t) * np.exp(-18 * t) + 0.22 * np.sin(2 * np.pi * 1320 * t) * np.exp(-24 * t)
reports.append(save("tick", tick))
t = np.arange(int(RATE * 0.6)) / RATE
reveal = np.sin(2 * np.pi * (480 * t + 240 * t * t)) * np.exp(-7 * t)
reports.append(save("reveal", reveal))
t = np.arange(int(RATE * 0.8)) / RATE
correct = np.zeros_like(t)
for delay, frequency, gain in [(0, 523.25, 1), (0.10, 659.25, 0.65), (0.20, 783.99, 0.5)]:
    local = np.maximum(0, t - delay)
    envelope = (t >= delay) * (1 - np.exp(-local * 120)) * np.exp(-local * 7)
    correct += gain * np.sin(2 * np.pi * frequency * local) * envelope
reports.append(save("correct", correct))
t = np.arange(int(RATE * 8)) / RATE
noise = rng.normal(size=len(t))
smooth = np.convolve(noise, np.ones(10) / 10, mode="same")
grain = noise - smooth
pulse = 0.22 + 0.78 * np.sin(2 * np.pi * 3.2 * t) ** 4
draw = grain * pulse
reports.append(save("draw", draw))
(target / "source.json").write_text(json.dumps({"source": "Original deterministic synthesis; no third-party recordings",
  "use": "Preschool only; drawing, color reveal, seconds countdown, correct-answer chime", "effects": reports}, indent=2) + "\n", encoding="utf-8")
print(json.dumps(reports))
