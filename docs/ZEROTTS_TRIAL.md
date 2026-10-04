# Thử ZeroTTS trên máy này

ZeroTTS được cài từ [GitHub chính thức](https://github.com/zeroweight-ai/ZeroTTS) trong checkout `ZeroTTS/`, với Python riêng tại `ZeroTTS/.venv/`. Model nằm trong `ZeroTTS/.cache/huggingface/`. Các thư mục này được bỏ qua bởi Git của dự án video.

Runtime hiện dùng CPU ONNX, không cần Docker hoặc PyTorch. Giọng thử mặc định là Mai Chi (`maichi`), nữ, nhẹ nhàng, kể chuyện. Các giọng khác: `baotrang`, `kimoanh`, `hamy`, `giahuy`, `huuduc`, `quangminh`, `tiendat`. SDK công khai chỉ nạp các voice pack có sẵn, chưa có encoder để clone Trúc Ly từ WAV.

Chạy từ thư mục gốc dự án trong PowerShell:

```powershell
$env:PYTHONIOENCODING = 'utf-8'
& '.\ZeroTTS\.venv\Scripts\python.exe' -X utf8 scripts/try_zerotts.py --offline
```

Đọc một câu khác hoặc chọn giọng khác (dùng thư mục output riêng để giữ mẫu trước):

```powershell
& '.\ZeroTTS\.venv\Scripts\python.exe' -X utf8 scripts/try_zerotts.py --offline --voice baotrang --text 'Sương sớm phủ trên cánh đồng, gió nhẹ thổi qua hàng tre xanh.' --output out/zerotts-baotrang
```

Script sinh từng câu riêng, xuất WAV 48 kHz mono PCM 24-bit và thêm 0,4 giây nghỉ. Mỗi câu có bản chỉ giảm gain đến tối đa -3 dBFS true peak, cùng bản xử lý DC, lọc 45 Hz–16 kHz và fade biên 10 ms. File được đọc lại để xác minh định dạng và clipping. Đây là công cụ thử engine, chưa thay backend mặc định cho sản xuất video.

`report.json` ghi phiên bản thư viện, commit mã nguồn, revision model, tham số sinh, seed, thời gian và số đo waveform. Model upstream mặc định theo nhánh `main`; dùng `--revision <modelRevision trong report.json>` khi cần tái lập model đã thử.

Nếu các mẫu VieNeu trước còn tồn tại, hai câu S002/S003 sẽ có thêm cặp so sánh với VieNeu INT8. Chỉ giảm âm lượng của bản lớn hơn để khớp RMS phần lời; không lọc thêm hay thay đổi thời gian. Hai engine dùng hai giọng khác nhau, nên đây là so sánh nghe tiếng rè, không phải thử nghiệm kiểm soát cùng một người nói. Đo không clipping không chứng minh đã hết artefact nghe được.

Mở `index.html` trong thư mục output hoặc chạy trình phát qua HTTP:

```powershell
& '.\ZeroTTS\.venv\Scripts\python.exe' -m http.server 8767 --bind 127.0.0.1 --directory out/zerotts-test-2026-10-04
```

Sau đó mở <http://127.0.0.1:8767/>.

Để nghe cùng một câu với toàn bộ tám giọng, mở <http://127.0.0.1:8767/voices/>. Tạo hoặc tiếp tục bộ mẫu này bằng:

```powershell
& '.\ZeroTTS\.venv\Scripts\python.exe' -X utf8 scripts/try_zerotts_voices.py
```

Script chỉ dùng model đã cache, nạp model một lần cho các giọng cần sinh thêm, và lưu checkpoint sau từng giọng. Mẫu Mai Chi/Bảo Trang đã có được tái sử dụng khi câu, model và tham số còn khớp; thông tin nguồn và seed lưu trong `voices/report.json`.

Trên Windows cần `-X utf8` vì SDK đọc metadata tiếng Việt theo encoding mặc định. Nếu bỏ tùy chọn này, một số giọng có thể lỗi `UnicodeDecodeError` hoặc hiện tên sai dấu.

Các DLL Visual C++ được nạp riêng từ `ZeroTTS/.cache/vc-runtime/` bằng `sitecustomize.py`; không sửa runtime hệ thống Windows. Danh sách package cài đặt nằm ở `ZeroTTS/requirements-installed.txt`.
