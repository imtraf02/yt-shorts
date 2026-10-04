# BIA: Bên trong một ly bia có gì?

Bộ production đã hoàn thành trong phạm vi **phân tích, kịch bản, storyboard và 160 ảnh minh họa**. Video ngang 16:9, hướng anime 2D tài liệu giải thích.

- [Xem toàn bộ 160 ảnh theo chương](gallery.html) — mở bằng trình duyệt; có tìm kiếm lời dẫn/ID và mở ảnh gốc.
- [Kịch bản](script.md): 16 chương, 160 câu gắn ID S001–S160.
- [Phân tích concept](analysis.md) và [brief](brief.md).
- [Storyboard](storyboard.json): I001–I160 liên kết câu, chương, ảnh, prompt, nguồn và QA.
- [Prompt thực tế](prompts.md), [định hướng mỹ thuật](art_direction.md), [kế hoạch tài nguyên](asset_plan.json).
- [Nguồn](sources.md) và [nguồn bổ sung](sources-supplement.md), có ghi giới hạn truy cập.
- [QA](qa.md), [kết quả kiểm tra file và SHA-256](validation.json), [manifest](manifest.json).

Ảnh dùng chính nằm ở `public/images/bia-vi-sinh/001.png` đến `160.png`, kích thước gốc khoảng 1672×940/941, tỷ lệ 16:9 theo làm tròn; chưa upscale thành 1920×1080. Thời lượng dự kiến 11,8–13,4 phút chỉ là ước tính văn bản.

Chưa sinh TTS, chưa phụ đề/timestamp, chưa chọn nhạc, chưa dựng hoặc render MP4 theo yêu cầu. Khi dựng sau này cần giữ disclaimer minh họa AI, sử dụng Trà Xanh đúng layout và sinh giọng Trúc Ly theo từng câu.

Không chạy lại `build-production.mjs` để tránh ghi đè prompt, nguồn và QA đã được sửa sau sinh ảnh.
