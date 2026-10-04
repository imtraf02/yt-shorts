"""Isolate reference conditioning and codec reconstruction using cached FP32 weights."""
import json
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
os.environ["HF_HOME"] = str(ROOT / "VieNeu-TTS/.cache/huggingface")
os.environ["HF_HUB_OFFLINE"] = "1"
os.environ["HF_HUB_DISABLE_IMPLICIT_TOKEN"] = "1"
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

import numpy as np
import soundfile as sf
import soxr
from scipy.signal import resample_poly
from tts_audio import create_vieneu_tts, write_verified_wav

OUT = ROOT / "out/tts-live-test-2026-10-04/reference-codec"
OUT.mkdir(parents=True, exist_ok=True)
report = {"humanFeedback": "User reports the gain-only FP32 S002 still has the same distortion.", "outputs": []}

def save(name, waveform, source):
    waveform = np.asarray(waveform, dtype=np.float32).reshape(-1)
    peak = float(np.max(np.abs(resample_poly(waveform, 4, 1))))
    gain = min(1.0, 10 ** (-3 / 20) / max(peak, 1e-12))
    path = OUT / (name + ".wav")
    qa = write_verified_wav(path, np.concatenate((waveform * gain, np.zeros(19200, dtype=np.float32))))
    report["outputs"].append({"name": name, "file": str(path), "source": source,
                               "originalTruePeak": peak, "originalOutOfRangeSamples": int(np.count_nonzero(np.abs(waveform) >= 1)),
                               "gain": gain, "qa": qa})
    (OUT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Saved", name, flush=True)

tts, engine = create_vieneu_tts(require_cuda=False, max_batch_size=1)
report["engine"] = engine
try:
    text = "Sương sớm phủ trên cánh đồng, gió nhẹ thổi qua hàng tre xanh."
    for enabled in [True, False]:
        np.random.seed(20261004)
        wav = tts.infer(text, voice="Trúc Ly", use_ref_codes=enabled, temperature=0.8, batch_size=1)
        save("reference-enabled" if enabled else "reference-disabled", wav,
             {"text": text, "voice": "Trúc Ly", "useReferenceCodes": enabled, "seed": 20261004})
    import vieneu
    sample_path = Path(vieneu.__file__).parent / "assets/samples/Ly (nữ miền Bắc).wav"
    original, sr = sf.read(sample_path, dtype="float32")
    if original.ndim > 1:
        original = original.mean(axis=1)
    resampled = soxr.resample(original, sr, 48000).astype(np.float32) if sr != 48000 else original
    save("bundled-ly-original", resampled, {"file": str(sample_path), "originalSampleRate": sr})
    codes = tts.engine._encode_ref_wav(original, sr)
    reconstructed = tts.engine._decode_codes(codes)
    save("bundled-ly-codec-reconstructed", reconstructed,
         {"codec": "MOSS-Audio-Tokenizer-Nano-ONNX", "frames": len(codes), "lastCodebook0": int(codes[-1,0]),
          "note": "Codec reconstruction of the bundled Ly recording; no TTS token generation in this comparison."})
finally:
    tts.close()
print("Reference/codec diagnostic complete", flush=True)
