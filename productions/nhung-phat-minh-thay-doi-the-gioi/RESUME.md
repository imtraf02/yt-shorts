# Điểm tiếp tục — phát minh

Cập nhật 2026-10-04T13:25:05.090Z. 335/360 ảnh lưu; 25 chưa tạo. Cảnh tiếp theo: I336.

Chỉ tài liệu và ảnh. Bộ gốc tại concept-original.md; 24 chương, 360 câu/cảnh, lời dẫn đã biên tập trong script.md/narration.txt. Không chạy lại build-production.mjs vì sẽ ghi đè tiến độ.

Dùng imagegen tích hợp, mỗi cảnh một ảnh. Kế thừa yêu cầu sinh nhanh: lô 4, không xem/sửa ảnh. Copy ngay bằng node productions/nhung-phat-minh-thay-doi-the-gioi/record-image.mjs Ixxx 'đường dẫn nguồn thật'. Trạng thái generated, không verified. Ghi sau từng file; giữ nguồn công cụ, không dùng contact sheet thay ảnh.

Chạy sync-production.mjs sau mỗi lô 16 hoặc khi dừng, validate-production.mjs khi kết thúc. Checkpoint script/storyboard/images sau khi toàn bộ file liên quan ổn định; checkpoint images ghi rõ đủ file, không review trực quan.

Blocker: [{"stage":"images","type":"usage_limit_reached","httpStatus":429,"reason":"Built-in image generation quota reached; 335 images saved, 25 remain. First pending I336.","observedAt":"2026-10-04T13:23:08.196Z","retryAfter":"2026-10-05T09:27:12.000Z","retryAfterLocal":"2026-10-05 16:27:12 Asia/Ho_Chi_Minh","failedSceneIds":["I336"],"errors":[{"id":"I336","error":"image generation failed: http 429 Too Many Requests: Some(\"{\\\"error\\\":{\\\"type\\\":\\\"usage_limit_reached\\\",\\\"message\\\":\\\"The usage limit has been reached\\\",\\\"plan_type\\\":\\\"plus\\\",\\\"resets_at\\\":1791192432,\\\"eligible_promo\\\":null,\\\"limit_window_minutes\\\":null,\\\"resets_in_seconds\\\":72245}}\")","observedAt":"2026-10-04T13:23:08.196Z"}]}]. Khi quota lỗi: lưu loại lỗi và thời điểm reset thật từ dịch vụ, dừng gen mới, hoàn thiện hồ sơ. Không tự chuyển API trả phí hoặc đặt lịch. Không dùng blocker/reset của bộ công trình cũ.

Không có lịch tự tiếp tục. Chưa tạo TTS/nhạc/phụ đề/composition/MP4. Nguồn mới kiểm chứng một phần, xem sources.md.
