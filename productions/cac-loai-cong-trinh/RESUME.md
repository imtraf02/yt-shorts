# Điểm tiếp tục — tài liệu và ảnh

Cập nhật: 2026-10-03T18:42:42.739Z

- Hồ sơ, kịch bản 12 chương và storyboard 360 cảnh đã viết.
- 211/360 ảnh đã kiểm tra trực quan; 0 ảnh chưa tạo; 0 ảnh cần sửa; 149 ảnh đã sinh chưa kiểm tra.
- Theo yêu cầu mới của người dùng: từ I212 bỏ kiểm tra và sửa ảnh, sinh nhanh các ảnh còn thiếu; giữ trạng thái generated.
- Điểm xử lý tiếp theo: không còn ảnh chưa tạo. Trạng thái từng cảnh trong storyboard.json là nguồn chính.
- Blocker hiện tại: [].
- Hạn mức cũ chặn I099 đã được giải quyết sau reset; không dùng lại thời điểm reset cũ cho lỗi mới.
- Phạm vi chỉ tài liệu và ảnh. Chưa tạo âm thanh, nhạc, phụ đề, composition hay video. Không có lịch tự tiếp tục.

## Quy trình tiếp tục

1. Đọc manifest.json, storyboard.json và generation_log.jsonl; chạy node scripts/video-job.mjs status cac-loai-cong-trinh nếu cần.
2. Dùng công cụ imagegen tích hợp, mỗi cảnh một ảnh riêng. Không chạy lại build-production.mjs, không thay bộ ảnh bằng contact sheet và không tự chuyển API trả phí.
3. Kế thừa Mio tóc bob teal, kính tròn, áo vàng, đồng hồ bỏ túi và mũ bảo hộ tại công trường. Dùng prompt hiện tại trong storyboard.json.
4. Không kiểm tra trực quan hoặc sửa ảnh mới theo yêu cầu người dùng; tiếp tục các cảnh pending. Đây là minh họa khái niệm, không phải bản vẽ đã kiểm định.
5. Copy ảnh và ghi ngay bằng record-image.mjs; chỉ review verified sau khi xem ảnh. Giữ nguồn gốc ở thư mục công cụ. Giữ bản loại dưới tên riêng, không tính vào 360 ảnh chính.
6. Refresh bằng refresh-production.mjs và update-resume.mjs. Checkpoint images khi đủ 360 file chính; ghi rõ 211 đã review và 149 bỏ review theo yêu cầu, không đổi trạng thái generated thành verified. Checkpoint storyboard lại khi đầu vào thay đổi.

## Lưu vết và giới hạn

storyboard.json và prompts.md lưu prompt hiện tại. generation_log.jsonl lưu nguồn và ghi chú QA. Các revision-prompt*.txt, revision-prompts*.json và refinements*.json lưu chỉ dẫn bổ sung ở các lượt đã ghi; một số lần sửa trước đó chỉ có ghi chú QA, không có bản sao đầy đủ prompt.

PNG chủ yếu 1672×941, một số 1672×940; chưa upscale 1920×1080. Thời lượng 30,3–36,5 phút chỉ là ước lượng, chưa đo audio. Nguồn kỹ thuật mới đối chiếu một phần; xem sources.md, không coi tất cả 360 câu đã được fact-check độc lập.
