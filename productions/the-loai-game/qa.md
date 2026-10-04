# QA hồ sơ và ảnh

Chưa xác nhận toàn bộ ảnh. Mỗi ảnh phải có ghi chú trực quan riêng trong storyboard. Không dùng tồn tại file thay cho QA. Kiểm tra ID, phủ đủ 340 câu, 11 chương, prompt khác nhau, PNG/hash/khung ảnh và gallery ở bước chốt. Timestamps để null vì chưa có âm thanh.

## Kiểm tra bộ ảnh hiện có

306/340 ảnh chính đã kiểm tra trực quan; kiểm tra PNG, tỷ lệ 16:9, hash không trùng và mapping 340 câu đạt. Còn I307–I340 do imagegen báo HTTP 429 usage_limit_reached. Chưa xác nhận bộ 340 ảnh hoàn thành. Xem validation-partial.json và resume.md.

## Kết quả cuối

340/340 PNG chính được kiểm tra trực quan riêng và đánh dấu verified. 340 câu, 11 chương, mapping một câu/một ảnh khớp. ID, prompt và SHA-256 không trùng; narration khớp; nguồn liên kết hợp lệ. Gallery có 340 đường dẫn tồn tại và JavaScript kiểm tra cú pháp đạt. Kích thước gốc: 1672×941, 1672×940; chưa upscale. 1 biến thể bị loại, không dùng trong gallery.

Mio và cơ chế được kiểm tra theo ghi chú từng ảnh; không khẳng định tất cả tên game/ranh giới đã xác minh riêng. Địa hình hư cấu, không bản đồ Việt Nam. Tranh không phải screenshot thật. QA này không xác nhận audio/captions/composition/render.
