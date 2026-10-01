# Template video dài 16:9

Khi sản xuất video mới, theo [VIDEO_PRODUCTION_WORKFLOW.md](VIDEO_PRODUCTION_WORKFLOW.md) để chốt kịch bản, tạo ảnh ngang, căn cảnh theo audio, kiểm tra và lưu tiến độ. Template bên dưới dùng ảnh dọc minh họa khả năng tái sử dụng; video được yêu cầu ảnh 16:9 vẫn phải tạo đủ ảnh 16:9. Duration chia đều trong template chỉ là bản nháp, phải thay bằng timing audio thực khi xuất bản.

Composition `LongForm16x9` là template ngang 1920×1080, 30fps, mặc định 12 phút. Nó có phần mở đầu 15 giây, các chương tự chia đều thời lượng ở giữa và outro 15 giây.

Mở Remotion Studio rồi chọn **Templates / LongForm16x9**. Trong bảng Props, có thể thay đổi trực tiếp:

- `channel`, `episode`, `title`, `subtitle` và `callToAction`
- `accent` để đổi màu nhấn
- `sections`: thêm/xóa chương, cùng `label`, `title`, `summary` và mảng `images`

Mỗi chương nhận một hoặc nhiều đường dẫn ảnh tương đối trong `public/`, ví dụ `images/silkroad/01-ancient-route.png`. Template dùng chính ảnh chân dung 9:16 làm hình chính ở cột phải và làm nền phóng to, mờ nhẹ cho toàn khung 16:9. Vì thế ảnh của Shorts được giữ đúng chủ thể, không cần crop ngang hoặc tạo lại asset.

Mẫu hiện dùng 9 ảnh đã có của video Silk Road. Khi làm video mới, đặt ảnh vào `public/images/<chu-de>/` và thay các giá trị trong `images` bằng đường dẫn tương đối tương ứng. Thêm nhiều ảnh vào một chương để chúng lần lượt xuất hiện trong thời lượng chương đó.

Để xem trước:

```powershell
npm run dev
```

Để render, chọn composition `LongForm16x9` trong Studio hoặc chạy:

```powershell
npx remotion render LongForm16x9 out/long-form-16x9.mp4
```
