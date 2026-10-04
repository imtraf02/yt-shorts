# QA outro

- TypeScript: `npx tsc --noEmit` đạt. ESLint cho `LongVideoOutro.tsx` và `CharacterFrameAnimation.tsx` đạt.
- Xem contact sheet toàn bộ 18 PNG nguồn của ba bộ hoạt ảnh: giữ đúng Trà Xanh, alpha hiển thị tốt trên nền xanh; có tư thế cúi đầu, nhảy và vẫy tay khác nhau. Không sửa asset gốc.
- Xem still CTA ở frame 180 (6s) và frame trích từ MP4 ở 14s, 19.9s: chữ tiếng Việt đúng, headline không tràn; hai ô gợi ý không bị CTA che; bong bóng nằm trên nhân vật; disclaimer góc dưới trái luôn đọc được. Nhân vật box 180×180, right 40/bottom 20; pill top 96/left 36; progress top 0/height 8.
- MP4 cuối: ffprobe xác nhận H.264, 1920×1080, 30 fps, 600 frames, 20.000000s, 1,848,849 bytes; không có audio stream vì đây là bản không lời/không nhạc.
- Giải mã toàn bộ 600 frames bằng FFmpeg với `-c:v rawvideo -f null -`: exit 0, không báo lỗi decode.
- CTA chỉ có một lần từ 4–12s, enableClickSound=false. Hai ô video chỉ là vị trí dành sẵn; cần gắn link/video thật khi đăng hoặc biên tập.
- Đây là end screen liên tục, không đổi cảnh nền/không cắt nội dung. Atmosphere nhẹ đổi dust → fireflies → sunrays theo ba beat; không dùng CinematicOverlay. Hoạt ảnh nhân vật dùng đúng durationMs từ animation.json, khóa theo frame để render/tua nhất quán.
- VieNeu-TTS hiện là thư mục trống; Python theo cấu hình không tồn tại. Kịch bản lời kết được giữ lại, chưa sinh WAV và chưa có captions timestamps; không suy diễn có voiceover.
- Render cần quyền mạng để tải font Montserrat từ fonts.gstatic.com; render sau escalation đạt. Không tải/cài/nâng cấp dependency khác.
- Remotion Studio chạy tại http://localhost:3110/LongVideoOutro; mở preview trong Codex đã được queued.
- Sau QA: xóa chính xác 4 PNG preview thuộc outro; giữ poster.jpg, MP4, source, storyboard và hồ sơ.
