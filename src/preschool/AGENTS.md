# Phạm vi Preschool

Yêu cầu người dùng 2026-10-01 áp dụng riêng Preschool, không hồi tố Long/Shorts:

- Không character/mascot, CTA hoặc dòng “Hình ảnh chỉ mang tính chất minh họa” trong composition Preschool. Không sửa/xóa component dùng chung để đạt việc này.
- Đọc docs/PRESCHOOL_BACKGROUND_REMOVAL.md trước xử lý ảnh. Tách nền bằng xử lý cục bộ, không model gen ảnh/API/inpainting. PNG alpha chỉ con vật, kiểm tra chân/tai/ria và biên; giữ ảnh nguồn.
- Intro là bóng bí mật/dấu hỏi, chưa tiết lộ ảnh màu hay tên tất cả loài.
- Yêu cầu mới ưu tiên: vẽ chậm hoàn tất trước, rồi giữ hình nét và đếm3–2–1 đúng90frames/30fps; sau đó mới hiện tên/ảnh màu. Không đếm khi bút còn vẽ, không VO hé tên trong90frames. Chỉ số lớn, không text “giây để bé đoán/đếm”.
- TTS từng câu Trúc Ly và nhạc gain tối đa0.5 vẫn theo quy tắc chung. Đổi thời lượng hình thì cập nhật timeline/SRT từ WAV thật.
- Tên trên hình và TTS thống nhất “Bạn Mèo”, “Bạn Chó”…; không đổi qua “con”. Bản mẫu có đủ 12 loài từ ảnh người dùng, chia nhóm 4 và ôn tập luân phiên.
- Tick đếm phải có trong MP4: gain0.50 trong3giây đoán, hạ BGM0.008, fade gain tránh click. SFX nhẹ, không tiếng kêu giả. Confetti ngắn ở vùng tranh khi mở đáp án, không che tên/đặc điểm; không giả định video ghi sẵn biết bé đã trả lời đúng.
