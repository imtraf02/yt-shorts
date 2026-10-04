import json
import math
import tempfile
import types
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
import soundfile as sf

from generate_tts_sentences import load_items, safe_wav_name
from tts_audio import SAMPLE_RATE, WAV_SUBTYPE, create_vieneu_tts, process_tts_audio, write_verified_wav


class TtsAudioTests(unittest.TestCase):
    def test_explicit_cpu_mode_works_without_pytorch(self):
        calls = []
        engine = types.SimpleNamespace(device="cpu")
        def factory(**kwargs):
            calls.append(kwargs)
            return types.SimpleNamespace(backend="onnx", engine=engine, sample_rate=48_000)
        with patch.dict("sys.modules", {"torch": None, "vieneu": types.SimpleNamespace(Vieneu=factory)}):
            _, report = create_vieneu_tts(require_cuda=False, max_batch_size=1)
        self.assertEqual(calls[0]["backend"], "onnx")
        self.assertEqual(calls[0]["device"], "cpu")
        self.assertEqual(calls[0]["precision"], "fp32")
        self.assertIsNone(report["gpu"])

    def test_default_mode_still_requires_cuda_without_pytorch(self):
        with patch.dict("sys.modules", {"torch": None, "vieneu": types.SimpleNamespace(Vieneu=None)}):
            with self.assertRaisesRegex(RuntimeError, "Không tìm thấy CUDA"):
                create_vieneu_tts()

    def test_processing_removes_dc_and_keeps_true_peak_headroom(self):
        seconds = 0.25
        t = np.arange(int(SAMPLE_RATE * seconds), dtype=np.float32) / SAMPLE_RATE
        # Tín hiệu cố ý vượt full scale, có DC và năng lượng siêu cao.
        source = 1.3 * np.sin(2 * math.pi * 1_000 * t) + 0.2
        source += 0.15 * np.sin(2 * math.pi * 21_000 * t)

        processed, qa = process_tts_audio(source)

        self.assertEqual(processed.dtype, np.float32)
        self.assertLessEqual(qa["outputTruePeakDbfs"], -2.99)
        self.assertEqual(qa["clippedSamples"], 0)
        self.assertLess(abs(float(np.mean(processed))), 0.01)
        self.assertAlmostEqual(float(processed[0]), 0.0, places=5)
        self.assertAlmostEqual(float(processed[-1]), 0.0, places=5)

    def test_wav_is_verified_as_48khz_mono_pcm24(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "test.wav"
            audio = np.zeros(SAMPLE_RATE // 10, dtype=np.float32)
            qa = write_verified_wav(path, audio)
            info = sf.info(str(path))

            self.assertEqual(qa["sampleRate"], SAMPLE_RATE)
            self.assertEqual(info.channels, 1)
            self.assertEqual(info.subtype, WAV_SUBTYPE)
            self.assertEqual(info.frames, audio.size)

    def test_processing_rejects_non_negative_true_peak_target(self):
        with self.assertRaises(ValueError):
            process_tts_audio(np.zeros(1_000, dtype=np.float32), target_peak_dbfs=0)

    def test_storyboard_object_and_safe_wav_name(self):
        with tempfile.TemporaryDirectory() as tmp:
            storyboard = Path(tmp) / "storyboard.json"
            storyboard.write_text(
                json.dumps({"scenes": [{"id": "S 001", "text": "Xin chào.", "file": "images/1.png"}]}),
                encoding="utf-8",
            )
            items = load_items(str(storyboard), str(Path(tmp) / "audio"))

            self.assertEqual(items[0]["text"], "Xin chào.")
            self.assertEqual(safe_wav_name(items[0]["id"]), "S_001.wav")


if __name__ == "__main__":
    unittest.main()
