# QA — outro 5 giây căn giữa

- Yêu cầu mới đã áp dụng: tối đa 5 giây; bỏ hai ô/nhãn video gợi ý; bỏ disclaimer chỉ trong outro; Lam Lam dưới trái, Trà Xanh dưới phải; avatar/tên/tagline căn giữa. Không thay đổi component disclaimer hoặc các video khác.
- TypeScript toàn project và ESLint src/LongVideoOutro.tsx đạt.
- Bốn bộ hoạt ảnh có sẵn, 26 PNG đã được kiểm tra trong các lần dựng trước: Lam Lam thả tim/cúi cảm ơn; Trà Xanh ngồi vẫy/cúi cảm ơn. Không sửa hoặc tạo thêm ảnh nhân vật.
- Still frame 60: avatar và mọi dòng chữ nằm trên trục x=960; bố cục gọn, chữ rõ. Lam Lam box 180px left 40/bottom 20; Trà Xanh box 180px right 40/bottom 20.
- Still frame 90 dùng brand-qa-props.json: avatar thật crop tròn, tên kênh dài tự thu font/căn giữa, tagline không tràn. Giá trị thử không được lưu vào brand.json mặc định.
- Xem frame trích từ MP4 cuối ở 0.5s, 3.833333s, 4.966667s: chữ đang reveal; hai nhân vật cúi đầu; cả hai đứng lại trước cuối clip. Nhận diện giữ ổn định ở giữa đến frame cuối, không fade chữ sớm.
- Animation frame-driven: avatar spring/nhấc lên, viền tự vẽ, hai halo lan ra rồi tan, ký tự stagger spring, tagline fade/lift, underline reveal, vòng/dots quay nhẹ; nhân vật vẫy/thả tim 0–2.4s rồi cùng cúi cảm ơn 2.4–5s. Không dùng CSS animation/transition, cinematic hoặc lớp môi trường gây rối.
- ffprobe: H.264, 1920×1080, 30/1 fps, 150 frames, 5.000000s, 646,814 bytes, không audio stream. Toàn bộ MP4 decode bằng FFmpeg -c:v rawvideo -f null - đạt exit 0.
- Poster.jpg trích từ MP4 mới tại 2s. Font Montserrat render sau escalation đạt; không cài/nâng cấp dependency.
- Không ô gợi ý, header, progress, thẻ chủ đề, CTA bong bóng hoặc disclaimer trong composition này. Nguồn LongVideoOutro.tsx không còn import các component đó.
- Avatar/name/tagline tiếp tục thay qua src/data/long-video-outro/brand.json hoặc Props Studio; cần render lại sau khi sửa. Không lời/không nhạc kế thừa bản trước; narration tùy chọn chưa tích hợp, không giả lập timestamps.
- Bản 20 giây hai nhân vật và QA cũ giữ dưới long-video-outro-v2.mp4 / qa-v2.md. Sau QA xóa đúng năm PNG preview của lần sửa này; giữ poster.jpg, MP4, source, config và hồ sơ.
