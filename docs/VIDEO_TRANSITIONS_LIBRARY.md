# Bộ chuyển cảnh tái sử dụng

30 chuyển cảnh giữa hai hình, chia thành 6 nhóm; thêm 8 lớp phủ dùng trên điểm cắt có sẵn. Chuyển động theo frame, không dùng timer/CSS animation và không thêm dependencies. Hỗ trợ 1920×1080, 1080×1920 và khung Sequence tùy ý. Không kèm âm thanh.

## Danh mục 30 Chuyển Cảnh (6 Nhóm)

| `kind` | Hiệu ứng | Nhóm | Frames mặc định @30fps |
| --- | --- | --- | --- |
| `dissolve` | Hòa tan hai cảnh | Documentary | 24 |
| `fade-color` | Mờ qua màu chọn: đen, trắng, xanh... | Documentary | 24 |
| `film-roll` | Cuộn phim điện ảnh từ dưới lên | Documentary | 22 |
| `tv-snap` | Tắt màn hình TV CRT cổ điển rồi bung ra | Documentary | 20 |
| `burn` | Cháy phim điện ảnh loang sáng rực | Documentary | 22 |
| `wipe` | Gạt khung theo 4 hướng | Editorial | 18 |
| `slide` | Cảnh mới trượt phủ lên cảnh cũ | Editorial | 20 |
| `push` | Cảnh mới đẩy cảnh cũ ra ngoài | Editorial | 20 |
| `diagonal` | Cắt chéo mở từ trái sang phải | Editorial | 20 |
| `aperture` | Khẩu máy ảnh 6 cạnh xoay mở | Editorial | 24 |
| `blinds` | Mười dải mành ngang | Graphic | 24 |
| `stripes` | Mành dọc mở từ trái sang phải | Graphic | 22 |
| `door` | Cửa mở đôi từ tâm ra hai biên | Graphic | 22 |
| `clock` | Quét vòng đồng hồ | Graphic | 30 |
| `checkerboard` | Ma trận ô cờ mosaic đan xen | Graphic | 24 |
| `iris` | Mở vòng tròn từ tâm | Organic | 28 |
| `blur` | Hòa tan kèm nhòe mềm | Organic | 28 |
| `diamond` | Mở hình thoi / kim cương từ tâm | Organic | 26 |
| `heart` | Mở hình trái tim yêu thương từ tâm | Organic | 28 |
| `star` | Mở ngôi sao 5 cánh tỏa sáng từ tâm | Organic | 28 |
| `zoom` | Zoom nhẹ nối hai cảnh | Cinematic | 24 |
| `light-leak` | Chuyển qua một vệt sáng ấm | Cinematic | 26 |
| `flash` | Chớp sáng trắng chói lòa | Cinematic | 16 |
| `cross-zoom` | Xuyên không phóng lao qua 2 bối cảnh | Cinematic | 22 |
| `whip` | Lia máy thần tốc kèm motion blur | Cinematic | 16 |
| `spin` | Xoay nhẹ kết hợp zoom đổi cảnh | Dynamic | 22 |
| `glitch` | Nhiễu số, giật lát cắt kỹ thuật số | Dynamic | 18 |
| `flip` | Lật thẻ 3D theo trục Y | Dynamic | 22 |
| `cube` | Khối lập phương 3D xoay góc nhìn | Dynamic | 24 |
| `shake` | Rung chấn địa chấn va đập mạnh | Dynamic | 18 |

**Đa dạng hóa chuyển cảnh**: Tuyệt đối không lặp lại đơn điệu 1–2 kiểu chuyển cảnh suốt video. **Khuyến khích và có thể dùng tất cả 30 kiểu chuyển cảnh trong cùng 1 video** để tạo nhịp phim sinh động, đa dạng và bắt mắt. Documentary linh hoạt kết hợp dissolve cho cùng chủ đề; film-roll/tv-snap/burn cho hoài niệm và truyền hình; wipe/slide/push/diagonal/aperture cho bản đồ, dữ liệu, timeline so sánh; blinds/stripes/door/checkerboard cho mở góc nhìn và thông tin ẩn; clock cho tiến trình lịch sử; thiên nhiên/cảm xúc dùng blur/iris/diamond/heart/star; zoom/light-leak/flash/cross-zoom/whip đẩy cao trào điện ảnh; spin/glitch/flip/cube/shake cho nhịp điệu dồn dập, hiệu ứng 3D và YouTube Shorts trẻ trung. Có thể giữ hard cut khi nhịp kể cần ngắt dứt khoát.

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

8 overlay có sẵn:

| `kind` | Diễn biến |
| --- | --- |
| `fade-color` | Mờ qua màu rồi trở lại, có thể chọn đen hoặc trắng |
| `light-leak` | Vệt sáng ấm phủ qua điểm cắt |
| `curtain` | Màn màu từ tâm mở rộng che khung rồi thu lại |
| `flash` | Chớp sáng trắng bùng nổ rồi tan biến trên điểm cắt |
| `whip` | Vệt lướt nhanh ngang khung hình che điểm cắt |
| `tv-snap` | Vệt sáng co ngang màn hình TV rồi bung mở |
| `burn` | Vệt sáng cam cháy phim loang qua điểm cắt |
| `shake` | Rung lắc va đập nhẹ che giấu điểm cắt |

Đặt overlay dưới phụ đề, nhân vật, CTA và disclaimer. Đừng dùng đồng thời overlay và SceneTransition cùng một điểm nếu không chủ ý phối hai hiệu ứng. Những component chuyển cảnh riêng của các video cũ vẫn được giữ nguyên.

## Kiểm tra

`node --test scripts/effects-model.test.mjs` kiểm tra tính ổn định theo frame, endpoint và lớp phủ tại điểm cắt. Chạy TypeScript/lint cho code thay đổi; xem thêm frame đầu/giữa/cuối ở 16:9 và 9:16. Gallery dùng hình vector nội bộ và disclaimer; không cần footage hay tài nguyên ảnh ngoài.
