import html
import json
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out/tts-live-test-2026-10-04"
summary = {"voice": "Trúc Ly", "model": "v3 Turbo", "backend": "ONNX/CPU", "modes": []}
rows = []
for precision in ["fp32", "int8"]:
    data = json.loads((OUT / precision / "comparison.json").read_text(encoding="utf-8"))
    environment = json.loads((OUT / precision / "environment.json").read_text(encoding="utf-8"))
    entries = []
    for item in data:
        baseline, sr = sf.read(item["gainOnlyFile"])
        processed, sr2 = sf.read(item["processedFile"])
        assert sr == sr2 == 48000 and baseline.shape == processed.shape
        residual = processed - baseline
        relative_difference = 10 * np.log10(max(float(np.mean(residual**2)), 1e-30) / max(float(np.mean(baseline**2)), 1e-30))
        entries.append({"id": item["id"], "originalSamplePeakDbfs": item["original"]["samplePeakDbfs"],
                        "originalClippedSamples": item["original"]["samplesOutsidePcmRange"],
                        "processedTruePeakDbfs": item["processed"]["estimatedTruePeakDbfs"],
                        "processingDifferenceRelativeDb": float(relative_difference)})
        rows.append(f'<tr><td><strong>{precision.upper()} · {item["id"]}</strong><p>{html.escape(item["text"])}</p></td>'
                    f'<td><audio controls preload="none" src="{precision}/{item["id"]}-gain-only.wav"></audio></td>'
                    f'<td><audio controls preload="none" src="{precision}/{item["id"]}.wav"></audio></td></tr>')
    summary["modes"].append({"precision": precision, "environment": environment, "measurements": entries})

reference_report_path = OUT / "reference-codec/report.json"
reference_html = ""
if reference_report_path.exists():
    reference_report = json.loads(reference_report_path.read_text(encoding="utf-8"))
    summary["referenceAndCodecTest"] = reference_report
    summary["humanFeedback"] = reference_report["humanFeedback"]
    reference_html = '''<h2>Tách mã tham chiếu và codec</h2>
<p>Bạn đã xác nhận mẫu FP32 và cả hai bản có/bỏ mã tham chiếu đều rè tương tự. Cặp sau đưa cùng bản thu Ly đi kèm SDK qua codec, không sinh lời mới.</p>
<table><thead><tr><th>Phép thử</th><th>Bản A</th><th>Bản B</th></tr></thead><tbody>
<tr><td>Trúc Ly, cùng câu đọc</td><td>Có mã tham chiếu<br><audio controls src="reference-codec/reference-enabled.wav"></audio></td><td>Bỏ mã tham chiếu<br><audio controls src="reference-codec/reference-disabled.wav"></audio></td></tr>
<tr><td>Bản thu Ly đi kèm SDK</td><td>Bản thu gốc, đổi sample rate<br><audio controls src="reference-codec/bundled-ly-original.wav"></audio></td><td>Sau mã hoá và giải mã MOSS<br><audio controls src="reference-codec/bundled-ly-codec-reconstructed.wav"></audio></td></tr>
</tbody></table>'''

summary["modelRevisions"] = {}
matched_html = ""
matched_report = OUT / "level-matched/report.json"
if matched_report.exists():
    summary["levelMatchedComparisons"] = json.loads(matched_report.read_text(encoding="utf-8"))
    summary["repeatedSamples"] = {
        name: {
            "environment": json.loads((OUT / name / "environment.json").read_text(encoding="utf-8")),
            "comparisons": json.loads((OUT / name / "comparison.json").read_text(encoding="utf-8")),
        } for name in ["repeat-fp32", "repeat-int8"]
    }
    matched_html = '''<h2>So sánh đã cân âm lượng</h2><p>Bạn nghe INT8 đỡ rè hơn chút. Ở cặp S002 đầu tiên, INT8 nhỏ hơn khoảng 1,45 dB. Hai cặp dưới đã cân RMS lời đọc bằng cách giảm gain; không lọc hay khử nhiễu.</p>
<table><thead><tr><th>Lần sinh</th><th>FP32</th><th>INT8</th></tr></thead><tbody>
<tr><td>Cặp S002 đầu tiên</td><td><audio controls src="level-matched/first-run-fp32.wav"></audio></td><td><audio controls src="level-matched/first-run-int8.wav"></audio></td></tr>
<tr><td>Sinh lại cùng câu, seed 20261005</td><td><audio controls src="level-matched/repeat-repeat-fp32.wav"></audio></td><td><audio controls src="level-matched/repeat-repeat-int8.wav"></audio></td></tr>
</tbody></table>'''
for directory in (ROOT / "VieNeu-TTS/.cache/huggingface/hub").glob("models--*"):
    revision_file = directory / "refs/main"
    if revision_file.exists():
        summary["modelRevisions"][directory.name] = revision_file.read_text().strip()
summary["limitations"] = ["No direct listening assessment by the assistant; user comparison is required to confirm audible distortion.",
                          "No CUDA test performed on this machine.",
                          "No evidence of clipping in these six newly synthesized waveforms; this does not exclude codec artifacts."]
(OUT / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

document = '''<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kiểm tra giọng Trúc Ly · VieNeu v3 Turbo</title>
<style>body{font:16px/1.6 system-ui;background:#10151d;color:#edf2f7;max-width:1150px;margin:40px auto;padding:0 20px}h1{font-size:28px}p{color:#b8c7d8}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:18px;border-bottom:1px solid #344154;vertical-align:top}th{color:#7ee3be}td:first-child{width:42%}audio{width:260px;max-width:100%}strong{color:#edf2f7}.note{padding:16px;border:1px solid #344154;border-radius:10px}@media(max-width:800px){table,thead,tbody,tr,td{display:block}thead{display:none}td:first-child{width:auto}audio{width:100%}}</style>
<h1>Trúc Ly · VieNeu v3 Turbo</h1>
<p>Sinh trực tiếp trên máy này bằng ONNX/CPU · VieNeu 3.8.3 · WAV 48 kHz, mono, 24-bit.</p>
<p class="note">Các waveform mới đã đo không có mẫu vượt ngưỡng PCM. Kết quả đo không thay thế kiểm tra bằng tai. Hai bản trong mỗi hàng trước/sau lọc dùng cùng một lần sinh giọng; giữa FP32 và INT8, nhịp đọc có thể khác.</p>
<p>Nghe luân phiên hai bản ở mức âm lượng vừa phải. Bản chỉ chỉnh âm lượng giữ tiếng gốc của model; bản qua lọc thêm lọc 45 Hz–16 kHz và làm êm đầu/cuối câu.</p>
MATCHED
REFERENCE
<h2>FP32 và INT8: trước và sau bộ lọc</h2>
<table><thead><tr><th>Cấu hình và câu đọc</th><th>Chỉ chỉnh âm lượng</th><th>Qua bộ lọc dự án</th></tr></thead><tbody>ROWS</tbody></table>
<p><a style="color:#7ee3be" href="summary.json">Xem số đo và phiên bản đã kiểm tra</a></p>
<script>document.addEventListener('play',e=>{if(e.target.tagName==='AUDIO')document.querySelectorAll('audio').forEach(a=>{if(a!==e.target)a.pause()})},true)</script>
</html>'''.replace("ROWS", "".join(rows)).replace("REFERENCE", reference_html).replace("MATCHED", matched_html)
(OUT / "index.html").write_text(document, encoding="utf-8")

report = ["# Kết quả sinh và kiểm tra VieNeu v3 Turbo", "", "Giọng Trúc Ly · ONNX/CPU · VieNeu 3.8.3 · ngày 04/10/2026.", "",
          "Đã sinh 3 câu bằng FP32 và cùng 3 câu bằng INT8. Mỗi câu có một bản chỉ giảm gain nếu cần và một bản qua pipeline chuẩn. Tổng cộng 12 WAV 48 kHz mono PCM 24-bit; không thay đổi audio của video hiện có.", "",
          "Không phát hiện clipping trong 6 waveform gốc. Chưa xác nhận chất lượng cảm nhận bằng tai; không thử CUDA trên máy này.", "",
          "| Cấu hình | Câu | Peak gốc (dBFS) | True peak sau xử lý (dBFS) | Mẫu clipping gốc |", "|---|---|---:|---:|---:|"]
for mode in summary["modes"]:
    for x in mode["measurements"]:
        report.append(f'| {mode["precision"].upper()} | {x["id"]} | {x["originalSamplePeakDbfs"]:.2f} | {x["processedTruePeakDbfs"]:.2f} | {x["originalClippedSamples"]} |')
report += ["", "Nếu bản FP32 chỉ chỉnh gain vẫn rè, bộ lọc hậu kỳ không phải điều kiện cần để tạo tiếng rè đó. Nếu chỉ bản INT8 rè, ưu tiên dùng FP32 và kiểm tra khả năng CPU. Nếu WAV nghe sạch nhưng preview bị rè, kiểm tra đường phát/streaming. Đây là cách diễn giải phép thử, chưa phải kết luận về mẫu người dùng nghe trước đây.", "",
           "Đã sửa scripts/tts_audio.py để --allow-cpu chạy bằng ONNX FP32 không cần import PyTorch; mặc định vẫn yêu cầu CUDA. Bộ 6 kiểm thử hồi quy đã pass.", "",
           "ONNX ban đầu không nạp được vì thiếu MSVCP140.dll/MSVCP140_1.dll. Môi trường thử dùng bản DLL có sẵn trong Codex runtime, đặt và nạp riêng dưới VieNeu-TTS/.cache/vc-runtime; không cài vào hệ thống.", "",
           "Nghe so sánh trong index.html; số đo đầy đủ và revision model trong summary.json."]
if reference_report_path.exists():
    report += ["", "Người dùng đã xác nhận bản chỉ chỉnh gain FP32 S002 vẫn rè giống trước. Vì vậy INT8 và bộ lọc hậu kỳ không phải điều kiện cần để gây hiện tượng này. Chưa loại trừ codec, conditioning giọng, model hoặc hệ thống phát.", "",
               "Đã sinh thêm hai mẫu Trúc Ly cùng câu, cùng seed, có/bỏ mã tham chiếu (speaker embedding vẫn giữ). Người dùng xác nhận cả hai vẫn rè tương tự; việc bỏ mã tham chiếu không cải thiện mẫu này. Đã tạo thêm bản thu Ly có sẵn trong SDK ở 48 kHz và bản tái dựng qua MOSS ONNX, không dùng TTS token generation. Nhóm thử ban đầu và tham chiếu/codec gồm 16 WAV; các mẫu phụ chỉ giảm gain nếu cần để chống clipping, không khử nhiễu."]
if matched_report.exists():
    report += ["", "Người dùng nhận xét INT8 đỡ rè hơn chút. Mẫu S002 INT8 đầu tiên có RMS lời đọc thấp hơn FP32 khoảng 1,45 dB. Đã sinh thêm cặp cùng câu với seed 20261005 và cân RMS của từng cặp bằng giảm gain, không boost/khử nhiễu. Chưa có đánh giá bằng tai cho các cặp đã cân mức; chưa kết luận INT8 luôn tốt hơn. Tổng số WAV hiện tại: " + str(len(list(OUT.rglob('*.wav')))) + "."]
(OUT / "report.md").write_text("\n".join(report), encoding="utf-8")
print(json.dumps({"files": len(list(OUT.rglob('*.wav'))), "modes": [{"precision": x["precision"], "measurements": x["measurements"]} for x in summary["modes"]]}, ensure_ascii=False))
