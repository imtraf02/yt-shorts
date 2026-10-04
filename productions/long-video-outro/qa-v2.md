# QA — outro nhận diện kênh với hai nhân vật

- TypeScript toàn project đạt; ESLint src/Root.tsx, src/LongVideoOutro.tsx và CharacterFrameAnimation.tsx đạt.
- Tám bộ hoạt ảnh sẵn có: Trà Xanh cúi cảm ơn v2, xoay v3, nhảy, ngồi vẫy; Lam Lam nói chuyện, kể chuyện, thả tim, cúi cảm ơn. Tổng 58 PNG nguồn, giữ nguyên asset gốc. Đã xem contact sheet 40 frame Lam Lam/xoay cộng 18 frame đã kiểm tra ở phiên bản trước; alpha hiển thị đúng trên nền xanh.
- Kiểm tra still frame 90 (nhận diện kênh/chủ đề) và 240 (end screen/CTA). Nét vẽ avatar, tên kênh, tagline, topic cards và bố cục đều rõ. CTA nằm trên Trà Xanh; hai nhân vật cùng hiện ở góc dưới phải; không che ô video.
- Kiểm tra thay thông tin bằng brand-qa-props.json: avatar thật từ public/characters/lam-lam-thuyet-minh.png và tên “KHÁM PHÁ CÙNG TRÀ XANH VÀ LAM LAM”. Still frame 240 đạt: avatar crop tròn đúng, tên dài tự thu font, không tràn vùng hình. Không lưu các giá trị thử vào brand.json mặc định.
- Video cuối được trích/xem tại frames 30, 150, 360, 520, 599: tên đang bật từng chữ; cụm avatar thu gọn; viền video đang vẽ; vẫy chào/kể chuyện; cả hai cúi đầu cảm ơn. Quỹ đạo icon và vòng avatar thay đổi theo frame. Không dùng CSS animation/transition để điều khiển timeline.
- ffprobe: H.264, 1920×1080, 30/1 fps, 600 frames, 20.000000s, 3,031,849 bytes. Không có audio stream, giữ bản không lời/không nhạc đã giao trước.
- FFmpeg giải mã toàn bộ MP4 với -c:v rawvideo -f null -: exit 0, không lỗi decode. Poster.jpg được trích từ MP4 cuối tại 8s.
- Trà Xanh box 180×180, right 40/bottom 20; Lam Lam box 180×180, right 258/bottom 20. CTA một lần 6–14s, màu emerald, enableClickSound=false. Header fit-content, top 96/left 36; progress top 0/height 8. Disclaimer đúng câu, bottom 24/left 40, luôn hiển thị.
- Hoạt ảnh nhận diện: avatar pop/vẽ vòng/quay; chữ spring từng ký tự; tagline reveal; topic cards pop; nhận diện thu gọn; hai card trượt vào/vẽ viền/hắt sáng; icon orbit; CTA spring và tương tác mini; tám bộ hoạt ảnh nhân vật. Đây là một end screen liên tục, không có cắt cảnh nền; dust → fireflies → sunrays nhẹ. Không dùng CinematicOverlay.
- Avatar/name/tagline thay qua src/data/long-video-outro/brand.json hoặc schema Props trong Studio. Cần render lại sau khi thay. Các ô video chưa chứa link tương tác; gắn video thực tế khi đăng hoặc biên tập.
- VieNeu-TTS theo cấu hình chưa có Python; không sinh voiceover, không có captions lời nói hoặc timestamps giả. narration.txt là lời tùy chọn chưa tích hợp.
- Render font Montserrat cần quyền mạng; render sau escalation đạt. Không cài/nâng cấp dependency.
- Giữ MP4 phiên bản một nhân vật dưới long-video-outro-v1.mp4 và QA cũ qa-v1.md. Đã mở MP4 mới trong Codex (queued). Sau QA xóa đúng chín PNG preview thuộc lần sửa này; giữ poster, source, config, MP4 và hồ sơ.
