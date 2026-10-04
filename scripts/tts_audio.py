#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Tiện ích dùng chung cho pipeline VieNeu-TTS WAV 48 kHz."""

from __future__ import annotations

import math
from pathlib import Path
from typing import Any

import numpy as np
import soundfile as sf
from scipy.signal import butter, resample_poly, sosfiltfilt


SAMPLE_RATE = 48_000
WAV_SUBTYPE = "PCM_24"


def create_vieneu_tts(*, require_cuda: bool = True, max_batch_size: int = 16):
    """Khởi tạo v3 Turbo và xác minh backend thực tế trước khi sinh audio."""
    try:
        import torch
    except ImportError:
        torch = None
    from vieneu import Vieneu

    cuda_available = torch is not None and torch.cuda.is_available()
    if require_cuda and not cuda_available:
        raise RuntimeError(
            "Không tìm thấy CUDA. Pipeline mặc định yêu cầu NVIDIA GPU; "
            "kiểm tra driver, PyTorch CUDA hoặc dùng --allow-cpu có chủ đích."
        )

    kwargs: dict[str, Any] = {"mode": "v3turbo", "max_batch_size": max_batch_size}
    if require_cuda:
        # Không dựa vào auto-detect: buộc đúng engine được tài liệu VieNeu khuyến nghị.
        kwargs.update(device="cuda", backend="pytorch")
    else:
        # CPU diagnostics must also work with VieNeu's torch-free minimal install.
        kwargs.update(device="cpu", backend="onnx", precision="fp32")

    tts = Vieneu(**kwargs)
    backend = str(getattr(tts, "backend", "unknown"))
    device_object = getattr(getattr(tts, "engine", None), "device", "unknown")
    engine_device = str(getattr(device_object, "type", device_object))
    sample_rate = int(getattr(tts, "sample_rate", 0))

    if require_cuda and (backend != "pytorch" or "cuda" not in engine_device.lower()):
        close = getattr(tts, "close", None)
        if callable(close):
            close()
        raise RuntimeError(
            f"VieNeu không chạy trên CUDA như yêu cầu (backend={backend}, device={engine_device})."
        )
    if sample_rate != SAMPLE_RATE:
        close = getattr(tts, "close", None)
        if callable(close):
            close()
        raise RuntimeError(
            f"VieNeu trả sample rate {sample_rate} Hz; pipeline yêu cầu {SAMPLE_RATE} Hz."
        )

    gpu_name = torch.cuda.get_device_name(0) if cuda_available else None
    return tts, {
        "backend": backend,
        "device": engine_device,
        "gpu": gpu_name,
        "sampleRate": sample_rate,
    }


def _apply_speech_band_filter(
    audio: np.ndarray,
    sample_rate: int,
    highpass_hz: float,
    lowpass_hz: float,
) -> np.ndarray:
    """Lọc rumble và dải siêu cao dễ làm lộ artefact, không dùng codec lossy."""
    nyquist = sample_rate / 2
    if highpass_hz > 0 and lowpass_hz > 0:
        if not 0 < highpass_hz < lowpass_hz < nyquist:
            raise ValueError("Cần 0 < highpass_hz < lowpass_hz < Nyquist.")
        sos = butter(4, [highpass_hz, lowpass_hz], btype="bandpass", fs=sample_rate, output="sos")
    elif highpass_hz > 0:
        if highpass_hz >= nyquist:
            raise ValueError("highpass_hz phải nhỏ hơn Nyquist.")
        sos = butter(4, highpass_hz, btype="highpass", fs=sample_rate, output="sos")
    elif lowpass_hz > 0:
        if lowpass_hz >= nyquist:
            raise ValueError("lowpass_hz phải nhỏ hơn Nyquist.")
        sos = butter(4, lowpass_hz, btype="lowpass", fs=sample_rate, output="sos")
    else:
        return audio

    # filtfilt không làm lệch pha; câu cực ngắn thì giữ nguyên thay vì gây lỗi pad.
    if audio.size <= 64:
        return audio
    return sosfiltfilt(sos, audio).astype(np.float32, copy=False)


def process_tts_audio(
    audio: np.ndarray,
    *,
    sample_rate: int = SAMPLE_RATE,
    target_peak_dbfs: float = -3.0,
    highpass_hz: float = 45.0,
    lowpass_hz: float = 16_000.0,
    fade_ms: float = 10.0,
) -> tuple[np.ndarray, dict[str, float | int]]:
    """Làm sạch waveform và chừa true-peak headroom trước khi ghi PCM."""
    if sample_rate != SAMPLE_RATE:
        raise ValueError(f"Pipeline yêu cầu {SAMPLE_RATE} Hz, nhận {sample_rate} Hz.")
    if target_peak_dbfs >= 0:
        raise ValueError("target_peak_dbfs phải âm để luôn còn headroom chống clipping.")
    if fade_ms < 0:
        raise ValueError("fade_ms phải >= 0.")

    samples = np.asarray(audio, dtype=np.float32).squeeze()
    if samples.ndim != 1 or samples.size == 0:
        raise ValueError("VieNeu trả waveform rỗng hoặc không phải mono.")
    if not np.all(np.isfinite(samples)):
        raise ValueError("Waveform chứa NaN/Inf.")

    input_sample_peak = float(np.max(np.abs(samples)))
    input_dc_offset = float(np.mean(samples))

    # DC offset làm giảm headroom và có thể gây click ở biên.
    samples = samples - np.float32(input_dc_offset)
    samples = _apply_speech_band_filter(samples, sample_rate, highpass_hz, lowpass_hz)

    fade_samples = min(int(round(fade_ms * sample_rate / 1000)), samples.size // 2)
    if fade_samples > 0:
        fade_in = np.linspace(0.0, 1.0, fade_samples, dtype=np.float32)
        fade_out = np.linspace(1.0, 0.0, fade_samples, dtype=np.float32)
        samples[:fade_samples] *= fade_in
        samples[-fade_samples:] *= fade_out

    target_linear = float(10 ** (target_peak_dbfs / 20))
    # Đo true peak xấp xỉ bằng oversampling 4x để tránh méo inter-sample khi mix/render.
    true_peak_before = float(np.max(np.abs(resample_poly(samples, 4, 1))))
    gain = 1.0
    if true_peak_before > target_linear and true_peak_before > 0:
        gain = target_linear / true_peak_before
        samples *= np.float32(gain)

    samples = np.clip(samples, -1.0, 1.0).astype(np.float32, copy=False)
    sample_peak = float(np.max(np.abs(samples)))
    true_peak = float(np.max(np.abs(resample_poly(samples, 4, 1))))
    clipped_samples = int(np.count_nonzero(np.abs(samples) >= 1.0))

    return samples, {
        "inputSamplePeak": input_sample_peak,
        "inputDcOffset": input_dc_offset,
        "appliedGainDb": float(20 * math.log10(gain)) if gain > 0 else float("-inf"),
        "outputSamplePeak": sample_peak,
        "outputTruePeak": true_peak,
        "outputTruePeakDbfs": float(20 * math.log10(max(true_peak, 1e-12))),
        "clippedSamples": clipped_samples,
    }


def write_verified_wav(path: Path, audio: np.ndarray, sample_rate: int = SAMPLE_RATE) -> dict[str, Any]:
    """Ghi WAV PCM 24-bit mono rồi đọc lại để phát hiện file sai/hỏng ngay."""
    path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(path), audio, sample_rate, format="WAV", subtype=WAV_SUBTYPE)

    info = sf.info(str(path))
    decoded, decoded_sr = sf.read(str(path), dtype="float32", always_2d=True)
    if decoded_sr != SAMPLE_RATE or info.channels != 1 or info.subtype != WAV_SUBTYPE:
        raise RuntimeError(
            f"WAV không đúng chuẩn sau khi ghi: {decoded_sr} Hz, "
            f"{info.channels} kênh, {info.subtype}."
        )
    decoded_peak = float(np.max(np.abs(decoded))) if decoded.size else 0.0
    if not np.all(np.isfinite(decoded)) or decoded_peak >= 1.0:
        raise RuntimeError(f"WAV lỗi hoặc clipping sau khi ghi: peak={decoded_peak:.6f}.")

    return {
        "sampleRate": decoded_sr,
        "channels": info.channels,
        "subtype": info.subtype,
        "frames": int(info.frames),
        "durationSeconds": float(info.duration),
        "decodedSamplePeak": decoded_peak,
        "fileBytes": path.stat().st_size,
    }
