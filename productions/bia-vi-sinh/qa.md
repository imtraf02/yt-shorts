# QA và trạng thái thật

## Hồ sơ

Kịch bản chia 16 chương, mỗi chương 10 câu; 160 scene ID và 160 prompt riêng. Mỗi sentenceId xuất hiện một lần, narration.txt khớp script và text trong storyboard. Timestamp null vì chưa sinh audio.

## Ảnh

I001: đã xem ảnh trả về bởi imagegen tích hợp. Ly bia, bọt, bong bóng và kính hiển vi phù hợp hook; không chữ/logo; vùng dưới và góc phải đủ yên. Nguồn 1672×941, gần 16:9 theo làm tròn, chưa upscale. Lưu public/images/bia-vi-sinh/001.png.

Các ảnh còn lại: trạng thái chi tiết trong storyboard.json và generation_log.jsonl, không tính prompt là ảnh hoàn thành.

## Ngoài phạm vi

Chưa TTS, chưa timestamp, chưa phụ đề, chưa nhạc, chưa composition, chưa render. Không chạy hoặc xác nhận QA các hạng mục này.

## Kiểm tra cuối trong phạm vi production + ảnh

- 160/160 ảnh chính đã xem trực quan và đánh dấu verified riêng trong storyboard; 16 chương, mỗi chương 10 cảnh.
- PNG hợp lệ, tỷ lệ 16:9 trong sai số làm tròn; kích thước gốc: 1672×941, 1672×940. Không gọi ảnh gốc là Full HD.
- ID, prompt, sentence ID và SHA-256 ảnh không trùng; narration.txt khớp chính xác từng text của storyboard.
- Biến thể không dùng: 015-v1-rejected.png, 017-v1-rejected.png, 021-v1-rejected.png, 033-v1-rejected.png, 071-v1-rejected.png, 133-v1-rejected.png, 135-v1-rejected.png, 137-v1-rejected.png, 151-v1-rejected.png. Các bản sửa được kiểm tra lại trước khi chọn ảnh chính.
- Hình hạt/phân tử và biểu đồ khái niệm không phải cấu trúc hóa học hay dữ liệu định lượng. Các ảnh lịch sử là tái dựng minh họa.
- Không có bản đồ Việt Nam; không phải thực hiện QA địa danh/bản đồ. Chữ/nhãn chính xác cần thêm bằng đồ họa khi dựng.
- Gallery liên kết trực tiếp 160 file chính; validation.json lưu kích thước, dung lượng và hash.
- Các checkpoint chỉ xác nhận hồ sơ và ảnh trong phạm vi yêu cầu, không xác nhận video/âm thanh đã sản xuất.
