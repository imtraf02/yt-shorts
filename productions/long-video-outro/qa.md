# QA — avatar thật, tên kênh và nền chuyển động

- Cấu hình mặc định: channelName “Lam Lam & Trà Xanh”, avatarSrc branding/long-video-outro/avatar.png, tagline giữ nguyên. Avatar do người dùng cung cấp được copy nguyên vẹn, SHA-256 nguồn và đích cùng 7b10a3fdab2c2fe93ebf4c16dc27c7dfaa1e6dd540937f30f10476243a989851.
- TypeScript toàn project và ESLint LongVideoOutro.tsx đạt. Asset staging copy/hash-check 13 ảnh: 12 PNG của hai bộ cúi chào và một avatar PNG.
- Chỉ import/dùng tra-xanh-cui-cam-on-v2 và lam-lam-cui-cam-on-v1. Không dùng animation vẫy/thả tim/xoay/nói chuyện. Timing frame PNG giữ nguyên animation.json của bộ GIF tương ứng, loop theo frame để render nhất quán.
- Lam Lam left 40/bottom 20; Trà Xanh right 40/bottom 20; height 180. Avatar box 284px, x=960; tên, tagline và dòng cảm ơn cùng căn giữa. Giữ 5 giây, không ô video gợi ý, không disclaimer riêng trong outro, không audio.
- Nền: blue/green aurora glow trôi và đổi scale, bốn ribbons uốn theo sin, hai orbit elip quay, cánh hoa và đom đóm dùng thư viện sẵn có. safeBottom=200; vùng giữa có scrim tối, content zIndex 10 để tránh nền làm giảm độ rõ của chữ. Không CinematicOverlay hoặc âm thanh hiệu ứng.
- Xem still frame 60: avatar đúng cặp đôi, không mất mặt, chữ tiếng Việt/ampersand đúng; nền nhiều chuyển động và chữ rõ. Xem frame trích từ MP4 tại 1s và 4.966667s: halo/ribbons/hạt/orbits đổi vị trí, hai nhân vật dùng cúi chào, tên giữ đầy đủ đến cuối.
- ffprobe MP4 cuối: H.264, 1920×1080, 30/1 fps, 150 frames, 5.000000s, 2,661,700 bytes, không audio stream. Giải mã toàn bộ bằng FFmpeg -c:v rawvideo -f null - đạt exit 0. Poster.jpg trích MP4 cuối tại 2s.
- Bản 5 giây trước đổi avatar/nền giữ ở long-video-outro-v3.mp4 và qa-v3.md. Sau QA xóa đúng ba PNG preview: avatar-60.png, avatar-early.png, avatar-final.png. Giữ avatar trong public, source/config, hồ sơ, poster và MP4.
