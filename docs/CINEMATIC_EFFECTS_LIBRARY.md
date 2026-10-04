# Hiệu ứng điện ảnh — bộ mở rộng

8 lớp phủ mới trong `src/components/effects/CinematicOverlay.tsx`, bổ sung cho 12 hiệu ứng không khí hiện có. Không cần footage, ảnh AI hoặc dependencies mới. Tất cả không có âm thanh, dựa vào frame/seed, thích ứng khung ngang/dọc.

| `kind` | Hiệu ứng | Gợi ý |
| --- | --- | --- |
| `bokeh` | Vòng sáng ngoài vùng nét trôi chậm | Cảm xúc, cảnh đẹp |
| `light-leak` | Ánh sáng ấm hắt từ mép | Hồi tưởng, ánh hoàng hôn |
| `film-grain` | Nhiễu hạt đơn sắc, cập nhật 12 lần/giây ở speed=1 | Chất phim tư liệu |
| `film-scratches` | Những vết xước dọc xuất hiện mềm | Lịch sử, tài liệu cổ |
| `scanlines` | Đường quét CRT và dải sáng di chuyển | Công nghệ, màn hình |
| `vignette` | Tối viền mềm với nhịp thay đổi chậm | Tập trung vào chủ thể |
| `speed-lines` | Các nét tỏa từ tâm ra ngoài | Nhấn hành động kiểu anime |
| `ripples` | Vòng sóng elip lan tỏa | Tín hiệu, nguyên nhân–kết quả |

## Xem thử

Folder **Cinematic-Effects** trong Studio gồm `CinematicGallery`, `CinematicPreviewWide`, `CinematicPreviewShort`. Trong hai bản preview riêng, chỉnh kind, intensity, speed, seed hoặc bật transparent để chỉ xem lớp phủ.

## Ghép vào cảnh

```tsx
import {CinematicOverlay} from './components/effects';

// Bên trên hình nền, dưới phụ đề/Trà Xanh/disclaimer.
<CinematicOverlay kind="film-grain" intensity={0.2} seed="chapter-01" />
<CinematicOverlay kind="vignette" intensity={0.4} safeBottom={180} />
```

## ⚠️ Quy tắc sử dụng nghiêm ngặt (STRICT)

- **HẠN CHẾ DÙNG, TUYỆT ĐỐI KHÔNG DÙNG LUNG TUNG**: CinematicEffects là hiệu ứng thị giác mạnh. Không được lạm dụng bừa bãi hay áp dụng đại trà cho mọi phân cảnh, tránh làm rác hình và che lấp chi tiết tranh minh họa.
- **CHỈ DÙNG KHI THẬT SỰ HỢP PHÂN CẢNH**:
  - `film-grain`, `film-scratches`: **Chỉ dùng** cho tư liệu lịch sử, tài liệu cổ, hồi tưởng quá khứ hoài niệm, phân đoạn ảnh đen trắng/sepia.
  - `scanlines`: **Chỉ dùng** cho phân cảnh màn hình máy tính, thiết bị điện tử, hacker, radar quân sự, TV CRT cổ.
  - `speed-lines`: **Chỉ dùng** cho khoảnh khắc cực kỳ kịch tính, hành động tốc độ, cao trào đột ngột kiểu anime; hết cao trào phải tắt ngay.
  - `ripples`: **Chỉ dùng** khi mô tả tín hiệu sóng lan tỏa, hiệu ứng dây chuyền, sóng xung kích, radar trên mặt nước.
  - `vignette`: **Chỉ dùng** khi cần tập trung ánh nhìn vào tâm điểm nhân vật trong tình huống căng thẳng, bí ẩn hoặc nội tâm sâu lắng.
  - `bokeh`, `light-leak`: **Chỉ dùng** cho cảnh hoàng hôn, bình minh rực rỡ, nghệ thuật thơ mộng hoặc điểm sáng hy vọng.
- **Cường độ**: Giữ `intensity` nhẹ nhàng trong khoảng 0.15–0.35 để bảo toàn độ sắc nét của tranh minh họa gốc.

Đường dẫn ví dụ tính từ `src/`. Lớp phủ không tự gắn disclaimer; composition chứa minh họa vẫn dùng `LeninDisclaimer` theo quy chuẩn. Khi phối nhiều lớp, chọn 1–2 hiệu ứng nhẹ phù hợp bối cảnh. Bộ này không sửa hình học hay timing của scene và không áp filter lên chữ.

| Prop | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `intensity` | 0,45 | Độ đậm toàn lớp 0–1; 0 tắt |
| `speed` | 1 | Tốc độ 0–5; 0 giữ nguyên frame hiệu ứng |
| `color` | Theo preset | Màu CSS; grain luôn đơn sắc, đường CRT nền luôn đen |
| `seed` | cinematic-v1 | Bố trí bokeh, xước, vệt tốc độ và nhiễu hạt |
| `safeBottom` | 0 | Vùng trong suốt dưới cùng, đơn vị px, có fade phía trên |
| `zIndex` | 5 | Đặt dưới captions/CTA |
| `timeOffsetSeconds` | 0 | Bù thời gian khi đặt trong Sequence |

Bokeh, xước, hạt phim và vệt tốc độ dùng seed; các preset khác có chuyển động cố định theo thời gian. `light-leak` ở đây là ánh sáng nền liên tục, khác với chuyển cảnh cùng tên trong `src/components/transitions/`. `ripples` chỉ vẽ vòng sóng, không làm méo ảnh phía dưới. Grain dùng SVG turbulence: bắt đầu intensity 0,15–0,3 khi dựng thật; chi phí render phụ thuộc độ phân giải.

Kiểm tra model: `node --test scripts/cinematic-effects.test.mjs`. Không cam kết nối đoạn demo thành vòng lặp không có điểm cắt. Các gallery cũ vẫn được giữ nguyên.
