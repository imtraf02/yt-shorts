# Outro nhận diện kênh 5 giây

Composition `LongVideoOutro`: 1920×1080, 30 fps, 150 frames, đúng 5 giây, không lời/không nhạc. Dùng avatar người dùng gửi, tên “Lam Lam & Trà Xanh”, avatar/tên/tagline căn giữa. Lam Lam dưới trái và Trà Xanh dưới phải chỉ sử dụng hoạt ảnh cúi chào. Nền xanh lam–xanh lá có aurora glow trôi, dải sáng uốn lượn, orbit elip, cánh hoa và đom đóm. Giữ vùng giữa tối hơn để chữ rõ. Avatar pop/vẽ viền/halo, tên stagger spring và tagline fade.

Avatar gốc được copy nguyên vẹn vào `public/branding/long-video-outro/avatar.png`; SHA-256 khớp file người dùng gửi. Không chỉnh nội dung ảnh. Bản 5 giây trước đổi avatar/nền được giữ tại `out/long-video-outro/long-video-outro-v3.mp4`.

Đã bỏ hai ô gợi ý và dòng minh họa riêng ở outro theo yêu cầu người dùng. Không sửa quy chuẩn/disclaimer trong video khác.

## Đổi avatar và tên kênh

Sửa `src/data/long-video-outro/brand.json`, ví dụ:

```json
{"channelName":"Tên kênh của bạn","avatarSrc":"branding/avatar.png","tagline":"Câu giới thiệu của bạn"}
```

Ảnh nằm tại `public/branding/avatar.png`; `avatarSrc` trống dùng logo mẫu. Avatar crop tròn, tên dài tự giảm font. Ba trường cũng chỉnh được qua Props của `LongVideoOutro` trong Studio. Phải xuất lại MP4 sau khi đổi cấu hình.

## Xuất lại

```powershell
node productions/long-video-outro/prepare.mjs
node productions/long-video-outro/stage-assets.mjs
node node_modules/@remotion/cli/remotion-cli.js render src/index.ts LongVideoOutro out/long-video-outro/long-video-outro.mp4 --concurrency=4 --public-dir=out/long-video-outro/render-public
```

Font Montserrat cần quyền mạng khi render. Script staging chỉ copy/hash-check các ảnh cần dùng. Bản 20 giây hai nhân vật được giữ tại `out/long-video-outro/long-video-outro-v2.mp4`; bản một nhân vật tại `long-video-outro-v1.mp4`. Bản cuối hiện tại luôn là `long-video-outro.mp4`.
