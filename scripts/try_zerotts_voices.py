"""Generate a sentence for every bundled ZeroTTS voice, with resumable checkpoints."""
from __future__ import annotations

import argparse
from html import escape
import json
import math
from pathlib import Path
import shutil
import time

from try_zerotts import ROOT, ZeroTTS, measures, np, process_tts_audio, sf, write_verified_wav

TEXT = "Sương sớm phủ trên cánh đồng, gió nhẹ thổi qua hàng tre xanh."
VOICES = [
    ("maichi", "Mai Chi", "Nữ · nhẹ nhàng, kể chuyện"),
    ("baotrang", "Bảo Trang", "Nữ · tin tức, rõ ràng"),
    ("kimoanh", "Kim Oanh", "Nữ · ấm áp, truyền cảm"),
    ("hamy", "Hà My", "Nữ · giọng cao, biểu cảm"),
    ("giahuy", "Gia Huy", "Nam · trầm ấm, tâm tình"),
    ("huuduc", "Hữu Đức", "Nam · trầm, điềm đạm"),
    ("quangminh", "Quang Minh", "Nam · tin tức, dứt khoát"),
    ("tiendat", "Tiến Đạt", "Nam · sôi nổi, bình luận"),
]
PARAMETERS = {"cfg_scale": 1.0, "audio_temperature": 0.8, "audio_topk": 25,
              "audio_topp": 0.95, "audio_repetition_penalty": 1.2, "eoa_extra_frames": 1}
REVISION = "c2bfbd67dc648cac455077333f7cf5c18a2e3bb4"


def save_checkpoint(out, report):
    (out / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    cards = []
    for row in report["voices"]:
        cards.append(f'''<section><h2>{escape(row['name'])}</h2><p class="muted">{escape(row['description'])}</p>
<p>{escape(report['text'])}</p><p>Chỉ giảm gain, chưa lọc</p><audio controls preload="none" src="{escape(row['gainOnlyFile'])}"></audio>
<details><summary>Bản xử lý WAV chuẩn</summary><audio controls preload="none" src="{escape(row['processedFile'])}"></audio></details></section>''')
    html = '''<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Tất cả giọng ZeroTTS</title><style>body{background:#101827;color:#eef2ff;font:16px system-ui;max-width:1100px;margin:36px auto;padding:0 20px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}section{background:#1c2940;padding:22px;border-radius:16px}audio{width:100%}p{line-height:1.6}.muted{color:#b7c5dc}a{color:#93c5fd}summary{cursor:pointer;margin:18px 0}</style>
<h1>Tất cả giọng ZeroTTS</h1><p>Cùng một câu để so sánh chất giọng và tiếng rè. WAV 48 kHz mono PCM 24-bit, nghỉ 0,4 giây cuối câu. Âm lượng tự nhiên của từng giọng được giữ, chỉ giảm gain khi cần chừa headroom.</p>'''
    html += f'<p>Đã sẵn sàng {len(report["voices"])}/{len(VOICES)} giọng. <a href="../">Các mẫu so sánh VieNeu</a></p><main>'
    html += "".join(cards) + '</main><p><a href="report.json">Số đo và thông số</a></p><script>document.querySelectorAll("audio").forEach(a=>a.addEventListener("play",()=>document.querySelectorAll("audio").forEach(b=>{if(a!==b)b.pause()})))</script></html>'
    (out / "index.html").write_text(html, encoding="utf-8")


def valid_file(path):
    info = sf.info(path)
    audio, rate = sf.read(path, dtype="float32")
    return rate == 48000 and info.channels == 1 and info.subtype == "PCM_24" and audio.size > 0 and bool(np.all(np.isfinite(audio))) and float(np.max(np.abs(audio))) < 1


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "out/zerotts-test-2026-10-04/voices")
    args = parser.parse_args()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    previous = json.loads((out / "report.json").read_text(encoding="utf-8")) if (out / "report.json").exists() else {}
    report = {"engine": "ZeroTTS", "modelRevision": REVISION, "text": TEXT,
              "parameters": PARAMETERS, "providers": ["CPUExecutionProvider"], "pauseSeconds": 0.4, "voices": []}
    tts = None
    for voice_id, name, description in VOICES:
        record = None
        if previous.get("modelRevision") == REVISION and previous.get("text") == TEXT and previous.get("parameters") == PARAMETERS:
            record = next((r for r in previous.get("voices", []) if r["id"] == voice_id), None)
            if record and not all(valid_file(out / record[k]) for k in ("gainOnlyFile", "processedFile")):
                record = None
        # Reuse the two existing samples only when inputs, model and settings match.
        sources = {"maichi": (out.parent / "report.json", "S002"),
                   "baotrang": (out.parent / "baotrang/report.json", "S001")}
        if record is None and voice_id in sources and sources[voice_id][0].exists():
            source, sentence_id = sources[voice_id]
            old = json.loads(source.read_text(encoding="utf-8"))
            row = next((r for r in old.get("sentences", []) if r["id"] == sentence_id and r["text"] == TEXT), None)
            if old.get("voice") == voice_id and old.get("modelRevision") == REVISION and old.get("parameters") == PARAMETERS and row:
                if all(valid_file(source.parent / row[k]) for k in ("gainOnlyFile", "processedFile")):
                    record = {"id": voice_id, "name": name, "description": description, "reusedFrom": str(source),
                              "seed": old["seed"] + old["sentences"].index(row), "original": row["original"],
                              "generationSeconds": row["generationSeconds"], "processing": row["processing"]}
                    for key, suffix in [("gainOnlyFile", "-gain-only.wav"), ("processedFile", ".wav")]:
                        record[key] = voice_id + suffix
                        shutil.copyfile(source.parent / row[key], out / record[key])
        if record is None:
            if tts is None:
                print("Loading cached ZeroTTS model on CPU...", flush=True)
                tts = ZeroTTS.from_pretrained(revision=REVISION, local_files_only=True,
                                              providers=["CPUExecutionProvider"], intra_op_num_threads=4)
                if tts.sample_rate != 48000:
                    raise ValueError("Unexpected sample rate")
            np.random.seed(20261004)
            start = time.perf_counter()
            raw = tts.synthesize(TEXT, voice=voice_id, **PARAMETERS).reshape(-1)
            elapsed = time.perf_counter() - start
            metrics = measures(raw)
            gain = min(1.0, 10 ** ((-3 - metrics["estimatedTruePeakDbfs"]) / 20))
            gap = np.zeros(19200, dtype=np.float32)
            processed, processing = process_tts_audio(raw)
            record = {"id": voice_id, "name": name, "description": description, "seed": 20261004,
                      "original": metrics, "generationSeconds": elapsed, "realTimeFactor": elapsed / metrics["seconds"],
                      "baselineGainDb": 20 * math.log10(gain), "processing": processing,
                      "gainOnlyFile": voice_id + "-gain-only.wav", "processedFile": voice_id + ".wav"}
            record["gainOnlyQa"] = write_verified_wav(out / record["gainOnlyFile"], np.concatenate((raw * np.float32(gain), gap)))
            record["processedQa"] = write_verified_wav(out / record["processedFile"], np.concatenate((processed, gap)))
        report["voices"].append(record)
        save_checkpoint(out, report)
        print(f'{name}: {record["original"]["seconds"]:.2f}s speech, WAV ready ({len(report["voices"])}/{len(VOICES)})', flush=True)
    print(f"Preview: {out / 'index.html'}", flush=True)


if __name__ == "__main__":
    main()
