# Brief — Bia và thế giới vi sinh

Yêu cầu: phân tích concept đính kèm, viết production và tạo nhiều ảnh, tối đa 200 ảnh. Người dùng làm rõ: chưa cần tạo video, chỉ production và ảnh. Không tạo TTS, subtitle, composition hay MP4 trong lần này.

Tên chính: **BIA: Bên trong một ly bia có gì?**

Tên phụ: **Vì sao nước, hạt và men lại tạo thành bia?**

Người xem: người trưởng thành tò mò khoa học, không yêu cầu kiến thức nấu bia. Tiếng Việt, giọng văn tò mò và rõ ràng. Không quảng cáo nhãn bia, không cổ vũ uống nhiều, không đưa lời khuyên uống để chữa bệnh.

Luận điểm: bia là kết quả của việc con người chuẩn bị và điều khiển môi trường cho vi sinh vật; khám phá hóa học của bia cần đi cùng hiểu biết về ethanol trong cơ thể.

Mặc định hình: ngang 16:9, hướng dựng tương lai 1920×1080, 30 fps, anime 2D dạng explainer. 16 chương, 160 câu và 160 ảnh riêng, một câu tương ứng một ảnh. 200 là giới hạn, không phải số bắt buộc. 40 vị trí dự phòng cho nhu cầu bổ sung thật, không kéo dài bằng ảnh lặp.

Thời lượng là ước lượng theo số đơn vị lời đọc và nhịp nghỉ; xem asset_plan.json. Chưa đo audio. Nếu sau này dựng: Trúc Ly, sentence-by-sentence bằng generate_tts_sentences.py, WAV 48 kHz mono PCM 24-bit, pause 0.5s. Không chạy các bước ấy trong phạm vi hiện tại.

Trà Xanh dùng asset có sẵn ở hậu kỳ, cao 180 px góc dưới phải; thay tên Mio trong concept. CTA chỉ bong bóng thoại, không banner giữa màn hình. Disclaimer bắt buộc nếu dựng: `* Hình ảnh chỉ mang tính chất minh họa`.

Nhạc chưa chọn và chưa nghe vì chưa dựng video. backgroundMusic=false hiện tại chỉ phản ánh chưa chọn/mix; không là quyết định cấm nhạc về sau. Nếu dựng có nhạc, đọc BACKGROUND_MUSIC_GUIDE.md, dùng nhiều track, trần tổng gain 0.5.
