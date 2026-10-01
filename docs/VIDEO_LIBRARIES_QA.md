# Kiểm tra thư viện video — 29/09/2026

Phạm vi: 12 lớp không khí, 12 chuyển cảnh giữa hai lớp hình + 3 overlay che điểm cắt, 9 kiểu phụ đề + 3 bảng màu. Không thay đổi composition hoặc tài nguyên của video đã có; chỉ thêm các folder xem thử vào Root.

## Kiểm tra code

- `npx.cmd tsc --noEmit --pretty false`: đạt cho toàn project tại thời điểm kiểm tra.
- ESLint: đạt cho ba thư viện component mới và các composition gallery/preview tương ứng.
- `node --test scripts/effects-model.test.mjs`: 5/5 đạt; chuyển động xác định theo seed/thời gian, số hạt có giới hạn, endpoint và độ phủ overlay đúng.
- `node --test scripts/caption-effects.test.mjs`: 4/4 đạt; giữ timestamps gốc, phân trang và khoảng nghỉ, adapter dữ liệu cũ, chuyển động chữ xác định theo thời gian.

## Kiểm tra bằng frame render thật

| Composition | Frame | Kết quả |
| --- | --- | --- |
| EffectsGallery | 75 | Thấy đủ 12 hiệu ứng, label và disclaimer rõ |
| EffectsPreviewShort | 80 | Tuyết hiển thị trong 9:16; phần dưới mờ dần theo safeBottom |
| TransitionsGallery | 45 | Cả 12 kiểu hiển thị tại giữa chuyển cảnh; chỉnh zoom để incoming luôn phủ kín khung |
| TransitionPreviewShort | 44 | Iris đúng tỷ lệ khung dọc, vùng mở không méo |
| CaptionsGallery | 46 | Cả 9 kiểu, active word/pill, từ khóa và các kiểu ẩn/giảm sáng hoạt động |
| CaptionsPreviewShort | 40 | Câu xuống hai dòng, pill cyan, vùng phụ đề/disclaimer riêng biệt |
| CaptionsPreviewWide | 135 | Karaoke và vị trí phụ đề/disclaimer trong 16:9 rõ |

Preview PNG tạm đã được dọn sau kiểm tra. Xem lại chuyển động bằng các gallery trong Studio; các composition giữ lại để render frame bất kỳ khi cần. Demo phụ đề dùng JSON timestamp minh họa, không có audio; QA đồng bộ voiceover thật phải thực hiện khi ghép vào video cụ thể. Chưa benchmark render MP4 dài hoặc mọi tổ hợp prop; không coi các kiểm tra trên là chứng nhận mọi tổ hợp.

Lưu ý môi trường: Remotion CLI cần quyền chạy ngoài sandbox này để đọc config và khởi chạy Chrome. Các lệnh render still đã được duyệt và chạy thành công. Gallery chỉ dùng hình code; khi render kiểm tra có thể truyền một thư mục public rỗng để không sao chép toàn bộ kho media của project.
