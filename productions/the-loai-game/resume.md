# Trạng thái hiện tại: hoàn thành

340/340 ảnh chính I001–I340 đã tạo và kiểm tra. Không còn cảnh pending hoặc blocker ảnh. Xem validation.json và gallery.html. Chưa tạo audio hoặc video.

## Lịch sử mốc bị chặn (đã giải quyết)

Đã tạo và kiểm tra 306/340 ảnh chính: I001–I306. Còn I307–I340, giữ nguyên prompt và liên kết S307–S340. Một biến thể 176-v1-rejected.png đã bị loại; 176.png là ảnh thay thế đã kiểm tra.

Dịch vụ imagegen trả HTTP 429 usage_limit_reached ở I307–I312. Mốc reset dịch vụ trả về: 2026-10-03T09:18:52Z, tương ứng **16:18:52 ngày 03/10/2026 giờ Việt Nam**. Đây là thời điểm có thể thử lại, không bảo đảm dịch vụ sẽ sẵn sàng. Chưa đặt lịch tự tiếp tục.

Khi tiếp tục, chỉ lấy cảnh status=pending trong storyboard.json; không tạo lại 306 ảnh đã kiểm tra. Mỗi yêu cầu mang ID trước khi gửi; kết quả về bất kỳ thứ tự nào vẫn lưu theo ID, ví dụ I307 → public/images/the-loai-game/307.png → S307. Gửi song song tối đa 12 yêu cầu, lưu mỗi kết quả ngay khi có; thao tác ghi manifest/storyboard phải nối tiếp để tránh ghi đè. Kiểm tra trực quan từng ảnh và lưu ghi chú sau khi lô sinh ảnh kết thúc.

Gallery cho phép tìm ID, câu thoại và lọc chương/trạng thái. Số thứ tự nằm trong tên file và metadata, không yêu cầu AI vẽ số vào ảnh. Cách này không làm giảm độ chi tiết do ghép nhiều cảnh rồi cắt.

Sau khi đủ 340 ảnh verified, chạy finalize-production.mjs (không --progress) và checkpoint lại script/storyboard/images. Trước đó chỉ dùng --progress. Không chạy lại build-production.mjs hay expand-to-340.mjs.

Phạm vi vẫn chỉ tài liệu production và ảnh. Chưa tạo TTS, nhạc, phụ đề, video hoặc MP4.
