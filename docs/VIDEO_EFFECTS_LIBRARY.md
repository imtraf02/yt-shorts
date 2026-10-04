# Thư viện hiệu ứng video

Bộ mở rộng: [CINEMATIC_EFFECTS_LIBRARY.md](CINEMATIC_EFFECTS_LIBRARY.md) bổ sung 8 hiệu ứng bokeh, hắt sáng, hạt/xước phim, CRT, tối viền, vệt tốc độ và vòng sóng. Tổng hai bộ có 20 hiệu ứng lớp phủ.

12 lớp phủ được vẽ bằng SVG/CSS trong project, không cần ảnh AI, footage bên ngoài, gói cài thêm hay âm thanh. Chuyển động dựa trên frame và seed cố định, có thể tua trực tiếp trong Remotion và render các frame không theo thứ tự. Dùng được cho 16:9 và 9:16, tự lấy kích thước composition/Sequence.

Bộ chuyển cảnh nằm riêng tại [VIDEO_TRANSITIONS_LIBRARY.md](VIDEO_TRANSITIONS_LIBRARY.md): 12 kiểu phối hình và 3 overlay che điểm cắt.

## Danh mục

| `kind` | Component | Dùng cho |
| --- | --- | --- |
| `leaves` | `FallingLeaves` | Lá mùa thu, thiên nhiên, hoài niệm |
| `snow` | `FallingSnow` | Tuyết với nhiều lớp kích thước |
| `rain` | `Rain` | Mưa nghiêng theo hướng gió |
| `petals` | `FallingPetals` | Cánh hoa xuân, cảm xúc nhẹ |
| `dust` | `GoldenDust` | Bụi ánh sáng, bảo tàng, lịch sử |
| `embers` | `RisingEmbers` | Tàn lửa bay lên, công nghiệp, kịch tính |
| `fireflies` | `Fireflies` | Đom đóm nhấp nháy chậm, rừng đêm |
| `bubbles` | `Bubbles` | Bong bóng nổi, biển và khoa học |
| `confetti` | `Confetti` | Giấy kim tuyến xoay, thành tựu |
| `stars` | `TwinklingStars` | Sao lấp lánh, không gian |
| `fog` | `DriftingFog` | Sương mềm trôi ngang |
| `sunrays` | `SunRays` | Những dải nắng chuyển góc nhẹ |

Đây là hiệu ứng trang trí theo phong cách 2D, không mô phỏng vật lý thời tiết. Chuyển động chạy liên tục trong timeline; không cam kết đoạn 12 giây tự nối thành vòng lặp không có điểm cắt.

## Xem và chỉnh

Trong Remotion Studio, mở folder **Effects**:

- `EffectsGallery`: bảng xem đồng thời cả 12 hiệu ứng.
- `EffectsPreviewWide`: xem riêng một hiệu ứng ở 1920×1080.
- `EffectsPreviewShort`: xem riêng ở 1080×1920.

Hai composition xem riêng có bảng Props để chọn `kind`, mật độ, tốc độ, gió, kích thước, opacity, seed và vùng trống phía dưới. `transparent=true` bỏ nền/chữ demo và chỉ giữ lớp phủ. MP4 thường không giữ alpha; khi cần footage trong suốt, dùng quy trình export alpha của Remotion hoặc ghép trực tiếp component vào video. Component lớp phủ không mang disclaimer; composition video sử dụng nó vẫn phải có `LeninDisclaimer` theo `AGENTS.md`.

## Ghép vào video

```tsx
import {FallingLeaves, DriftingFog} from './components/effects';

// Bên trong AbsoluteFill của cảnh, phía trên background và phía dưới captions/HUD.
<FallingLeaves density={0.7} opacity={0.45} wind={28} safeBottom={180} />
<DriftingFog density={0.6} opacity={0.3} seed="forest-chapter-02" />
```

Hoặc chọn bằng dữ liệu cảnh:

```tsx
import {Atmosphere} from './components/effects';

<Atmosphere
  kind="petals"
  colors={['#FFE0EB', '#FFC5D9', '#FFF5F8']}
  density={0.8}
  speed={0.7}
  size={1.2}
  opacity={0.5}
  seed="chapter-03"
  safeBottom={180}
/>
```

Đường dẫn import ở trên tính từ `src/`; trong component khác, điều chỉnh đường dẫn tương đối.

## Tham số và hiệu năng

| Prop | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `density` | 1 | Hệ số số hạt 0–3; 0 tắt, tối đa 300 hạt/lớp |
| `speed` | 1 | Hệ số thời gian 0–8; 0 đứng yên |
| `wind` | 18 | Gió ngang px/giây ở cạnh ngắn 1080; âm sang trái |
| `size` | 1 | Kích thước tương đối 0,1–5 |
| `opacity` | 0,65 | Độ đậm 0–1 của toàn lớp |
| `colors` | Theo preset | Danh sách màu CSS tùy chọn; mảng rỗng dùng preset |
| `seed` | `atmosphere-v1` | Giữ ổn định bố trí giữa preview và render |
| `safeBottom` | 0 | Số px phía dưới trong suốt, có dải fade phía trên |
| `zIndex` | 4 | Đặt thấp hơn phụ đề, Trà Xanh, CTA và disclaimer |
| `timeOffsetSeconds` | 0 | Bù thời gian khi dùng Sequence; muốn liên tục thì truyền frame bắt đầu / fps |

`wind` tác động lên hạt và sương; sao/tia nắng không dùng gió. `size` tác động kích thước hạt, mảng sương hoặc bề rộng tia. Mặc định layer hoàn toàn trong suốt ngoài hiệu ứng và không bắt sự kiện chuột. **Đa dạng hóa hiệu ứng**: Luôn thay đổi hiệu ứng linh hoạt theo bối cảnh cụ thể của từng cảnh trong video (mùa thu dùng lá bay, mùa đông tuyết rơi, mưa gió dùng Rain, mùa xuân dùng FallingPetals, bảo tàng/lịch sử dùng GoldenDust, chiến tranh/nhiệt huyết dùng RisingEmbers, đêm huyền bí dùng Fireflies, biển/khoa học dùng Bubbles, lễ hội/thành tựu dùng Confetti, vũ trụ dùng TwinklingStars, bình minh dùng SunRays...), không dùng cố định lặp lại 1–2 hiệu ứng xuyên suốt cả video gây nhàm chán. Mỗi cảnh chỉ nên dùng 1–2 lớp nhẹ; với cảnh nhiều chữ, giảm density/opacity và đặt safeBottom phù hợp. Lựa chọn hiệu ứng dựa trên bối cảnh, không bắt buộc cảnh nào cũng có hiệu ứng.

Kiểm tra chuyển động thuần bằng `node --test scripts/effects-model.test.mjs`. Sau thay đổi hình dáng hoặc cách dựng, xem lại Gallery và Preview ở cả hai tỷ lệ.
