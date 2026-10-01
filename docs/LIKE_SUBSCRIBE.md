# Thả tim và đăng ký kênh

Mở composition `LikeSubscribe` trong Remotion Studio để xem mẫu 4 giây với nền trong suốt. Có thể đổi nội dung nút, màu và vị trí trong bảng Props. Nút mặc định ghi “ĐĂNG KÝ”, không có dòng tên kênh.

Chèn vào composition video, sau lớp hình ảnh:

```tsx
import { LikeSubscribe } from "./components/LikeSubscribe";

<LikeSubscribe
  from={60 * 30}
  durationInFrames={4 * 30}
  accentColor="#F59E0B"
  bottom={530}
/>
```

Ví dụ trên bắt đầu ở giây 60 trong video 30 fps. Dùng fps của video khi tính thời gian, và chừa đủ 4 giây trước khi video kết thúc. `from` tính từ Sequence chứa component nếu có. Thời lượng tối thiểu là 3 giây.

Hiệu ứng: xuất hiện → con trỏ thả tim và tim bay lên → nút đổi thành “ĐÃ ĐĂNG KÝ” → chuông rung → biến mất. Đây là hoạt ảnh minh họa trong video, không phải nút tương tác thực tế.

Mặc định đặt cách đáy 530 px, phía trên phụ đề của dự án; có thể tăng `bottom` nếu trùng nhãn cảnh. Component tự thu nhỏ theo chiều rộng video. Dùng `subscribeText` và `subscribedText` để thay chữ trên nút.

Component chỉ xuất hiện khi được chèn vào video. Các video hiện có không tự thêm lời kêu gọi đăng ký.

Giao diện liquid glass với nền bán trong suốt, blur nhẹ 6 px và phản chiếu chuyển động. Chữ trắng đậm, nút kem và viền sáng giúp dễ đọc; hiệu ứng blur chỉ áp dụng cho hình phía sau. Các màu tùy chỉnh gồm `backgroundColor`, `accentColor`, `secondaryColor`, `highlightColor`, `textColor`, `activeTextColor`. Truyền bảng màu bằng `{...theme}`. SilkRoad dùng bảng màu dịu `silkroadCtaTheme` trong `src/data/silkroadTheme.ts`. `thanksText` mặc định là “THANKS FOR WATCHING”; truyền chuỗi rỗng để ẩn hoặc thay bằng lời cảm ơn riêng. SilkRoadShort đã chèn mẫu ở 4 giây gần cuối, cách đáy 650 px.
