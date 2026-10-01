# Bộ chuyển cảnh tái sử dụng

12 chuyển cảnh giữa hai hình, chia thành 4 nhóm; thêm 3 lớp phủ dùng trên điểm cắt có sẵn. Chuyển động theo frame, không dùng timer/CSS animation và không thêm dependencies. Hỗ trợ 1920×1080, 1080×1920 và khung Sequence tùy ý. Không kèm âm thanh.

## Danh mục

| `kind` | Hiệu ứng | Nhóm | Frames mặc định @30fps |
| --- | --- | --- | --- |
| `dissolve` | Hòa tan hai cảnh | Documentary | 24 |
| `fade-color` | Mờ qua màu chọn: đen, trắng, xanh... | Documentary | 24 |
| `wipe` | Gạt khung theo 4 hướng | Editorial | 18 |
| `slide` | Cảnh mới trượt phủ lên cảnh cũ | Editorial | 20 |
| `push` | Cảnh mới đẩy cảnh cũ ra ngoài | Editorial | 20 |
| `diagonal` | Cắt chéo mở từ trái sang phải | Editorial | 20 |
| `blinds` | Mười dải mành ngang | Editorial | 24 |
| `clock` | Quét vòng đồng hồ | Editorial | 30 |
| `iris` | Mở vòng tròn từ tâm | Organic | 28 |
| `blur` | Hòa tan kèm nhòe mềm | Organic | 28 |
| `zoom` | Zoom nhẹ nối hai cảnh | Cinematic | 24 |
| `light-leak` | Chuyển qua một vệt sáng ấm | Cinematic | 26 |

Chọn 2–3 kiểu chủ đạo cho một video. Documentary thường dùng dissolve cho cùng chủ đề, wipe cho bản đồ/timeline và fade-color để sang chương; thiên nhiên có thể dùng blur/iris cùng lá hoặc sương. Zoom/light-leak phù hợp đoạn nhấn. Có thể giữ hard cut khi nhịp lời kể cần nhanh.

## Xem thử

Trong folder **Transitions** của Remotion Studio:

- `TransitionsGallery`: bảng 12 kiểu, tự chuyển ngày ↔ đêm để dễ so sánh.
- `TransitionPreviewWide`: xem riêng một kiểu trên khung ngang.
- `TransitionPreviewShort`: xem riêng trên khung dọc.

Props: chọn `kind`, `durationInFrames`, `direction` và `color`. Bản demo giữ cảnh khoảng một giây trước/sau chuyển để quan sát; vòng lặp demo không được chép vào timeline sản xuất.

## Hai cách sử dụng

### Chuyển thật giữa hai lớp hình

```tsx
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {SceneTransition} from './components/transitions';

<AbsoluteFill>
  <SceneTransition
    kind="push"
    direction="left"
    from={138}
    durationInFrames={24}
    outgoing={<Img src={staticFile('images/ten-video/001.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
    incoming={<Img src={staticFile('images/ten-video/002.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
  />
  {/* Audio, captions, HUD, Trà Xanh và disclaimer đặt ngoài SceneTransition. */}
</AbsoluteFill>
```

Trong ví dụ, frame 0–138 chỉ có cảnh cũ; từ 138 tới 161 chuyển hình; từ 161 trở đi chỉ có cảnh mới. Duration tính cả hai endpoint; duration=1 là hard cut. `from` tính theo frame của Sequence chứa component, không nhất thiết là frame toàn video.

`SceneTransition` chỉ phối hình, không tự ghép chuỗi nhiều cảnh, đổi tổng thời lượng hoặc trừ thời gian chồng cảnh. Nếu đặt trong Sequence riêng, tự đặt thời lượng Sequence bao phủ đủ phần hình cần dùng. Hai nội dung nhận frame của vùng chứa, không tự reset frame nội bộ của cảnh incoming. Khi scene có animation riêng, dùng offset/Sequence thích hợp. Chỉ truyền phần hình vào incoming/outgoing: để audio bên ngoài để tránh phát hai voiceover trong thời gian chuyển.

Hướng `left/right/up/down` là hướng **cảnh mới di chuyển tới**: `left` nghĩa là cảnh mới đi từ phải sang trái. Hướng chỉ ảnh hưởng `wipe`, `slide`, `push`. `color` là màu nền trung gian cho fade-color và tông đầu dải sáng của light-leak; các kiểu khác thường che kín màu nền khi cảnh đầu vào kín khung.

### Che điểm cắt trên timeline đã căn audio

```tsx
import {TransitionOverlay} from './components/transitions';

<TransitionOverlay
  boundaries={[300, 720, 1050]}
  kind="fade-color"
  color="#081B19"
  halfWindow={10}
  zIndex={6}
/>
```

Component không chứa cảnh; đặt trên lớp hình đang cắt cảnh tại các boundaries. Nó phủ kín đúng frame cắt rồi mở ra. `halfWindow=10` tạo cửa sổ 21 frame từ boundary−10 tới boundary+10; độ phủ bằng 0 ở hai đầu. Timestamps cảnh/giọng đọc/phụ đề và tổng duration giữ nguyên. Khi cửa sổ chồng nhau, chọn boundary gần nhất, không cộng độ sáng nhiều lớp.

3 overlay có sẵn:

| `kind` | Diễn biến |
| --- | --- |
| `fade-color` | Mờ qua màu rồi trở lại, có thể chọn đen hoặc trắng |
| `light-leak` | Vệt sáng ấm phủ qua điểm cắt |
| `curtain` | Màn màu từ tâm mở rộng che khung rồi thu lại |

Đặt overlay dưới phụ đề, nhân vật, CTA và disclaimer. Đừng dùng đồng thời overlay và SceneTransition cùng một điểm nếu không chủ ý phối hai hiệu ứng. Những component chuyển cảnh riêng của các video cũ vẫn được giữ nguyên.

## Kiểm tra

`node --test scripts/effects-model.test.mjs` kiểm tra tính ổn định theo frame, endpoint và lớp phủ tại điểm cắt. Chạy TypeScript/lint cho code thay đổi; xem thêm frame đầu/giữa/cuối ở 16:9 và 9:16. Gallery dùng hình vector nội bộ và disclaimer; không cần footage hay tài nguyên ảnh ngoài.
