# Bé làm quen với các bạn động vật

Yêu cầu: video mẫu từ ảnh người dùng trong tmp, cho kênh whiteboard giáo dục mầm non riêng.

Thông số hiện tại: 1920×1080,30fps, Trúc Ly,49 câu riêng, playbackRate0.9,7660frames/255.33s. Dùng đủ12 ảnh người dùng theo yêu cầu cập nhật. Tông mint/kem, tên thống nhất “Bạn…”, nói với bé bằng “bé”, “chúng mình”.

Sản phẩm: MP4 local và nguồn sửa được; không tự đăng lên YouTube, không sửa video Long/Shorts. Toàn bộ12 JPG nguồn bảo toàn trong public sau so hash và dọn đúng file tmp thuộc video.

## Yêu cầu cập nhật 2026-10-01 (ưu tiên hơn giả định cũ)

- Chỉ Preschool: bỏ character và dòng `Hình ảnh chỉ mang tính chất minh họa`; không thay component dùng chung hoặc composition Long/Shorts.
- Trước khi dùng: tách nền cục bộ theo `docs/PRESCHOOL_BACKGROUND_REMOVAL.md`, không model gen ảnh/inpainting. PNG alpha chỉ còn con vật; giữ JPG nguồn đối chiếu. Các PNG hiện có đã đạt QA, không xử lý lại khi chỉ đổi layout.
- Intro chỉ bóng đen và dấu hỏi, không tên/ảnh màu; outro luân phiên3 nhóm4 bạn để ôn đủ12 loài.
- Vẽ chậm: 180 frames (Rùa210), nét hoàn tất rồi mới đếm 90 frames. Không giọng đọc trong khoảng đếm. Sau đó mới đọc tên, hiện ảnh màu và đặc điểm. Căn mọi câu và SRT từ độ dài WAV thật.
- Chia12 bạn thành3 nhóm4; câu hỏi sau mỗi nhóm. Số đếm176px, ba tiếng tick gain0.50; BGM hạ0.008 khi đếm,0.035 đoạn khác và fade đầu/cuối. Không tiếng kêu giả.
- Layout tranh trái/thẻ phải; thanh ba bước; tên dài xuống dòng. Giấy kim tuyến ngắn trong vùng tranh khi mở đáp án, không che chữ. Quiz nói “Đáp án là…” vì video không nhận biết câu trả lời của bé.
- Bản mới là file riêng `preschool-animals-whiteboard-demo-guess-3s.mp4`; không ghi đè các bản thử trước.
