# Bộ hiệu ứng chữ phụ đề

9 kiểu chuyển động dùng chung một bộ timestamps theo từ, với ba bảng màu `gold`, `cyan`, `emerald`. Component mới `KineticCaptions` độc lập; phụ đề của những video cũ không bị thay đổi.

## Các kiểu có sẵn

| `effect` | Hiển thị | Gợi ý |
| --- | --- | --- |
| `pop` | Pill và từ đang đọc phóng nhẹ rồi ổn định | Kiểu mặc định cho explainer |
| `bounce` | Từ nảy lên một nhịp | Câu vui, khám phá |
| `slide-up` | Từ trượt lên khi bắt đầu đọc | Storytelling nhẹ |
| `fade` | Từ đang nói sáng dần | Documentary tiết chế |
| `karaoke` | Ánh sáng quét bên trong pill theo thời lượng từ | Giải thích, trình bày |
| `typewriter` | Hiện dần từng từ đúng timestamp, giữ chỗ từ chưa đọc | Hook hoặc câu ngắn |
| `underline` | Gạch chân chạy trong pill theo tiến độ từ | Số liệu, ý quan trọng |
| `spotlight` | Từ đang đọc nổi bật, từ còn lại giảm sáng | Câu cần tập trung |
| `tilt` | Từ nghiêng nhẹ rồi ổn định như đóng dấu | Nhấn một kết luận |

Từ thường màu trắng viền đen 10 px; từ khóa vàng/cyan; từ đang đọc có pill gradient phát sáng và chữ tối. Padding và font weight không đổi khi active để tránh nhảy dòng. Từ chuyển động bằng scale/translate, không thay kích thước layout. `typewriter` hiện theo **từ**, không giả lập timestamp từng chữ cái.

## Xem trong Studio

Folder **Caption-Effects** có `CaptionsGallery`, `CaptionsPreviewWide`, `CaptionsPreviewShort`. Hai bản preview riêng cho phép chọn effect, theme và bật/tắt panel nền. Demo là dữ liệu thời gian minh họa trong `src/data/caption-effects-demo.json`, không có giọng đọc và không được dùng làm alignment của video thật.

## Dữ liệu đầu vào

Dùng `Caption[]` từ `@remotion/captions` và lưu dưới dạng JSON, mỗi phần tử là một từ/token đã alignment:

```json
[
  {"text":"Thời","startMs":100,"endMs":400,"timestampMs":null,"confidence":null},
  {"text":" gian","startMs":400,"endMs":750,"timestampMs":null,"confidence":null,"pageBreakAfter":true}
]
```

Giữ dấu tiếng Việt và khoảng trắng đầu các từ. Timestamps phải hữu hạn, không âm, end > start, theo thứ tự và không chồng nhau. Nếu Whisper trả token chưa khớp từ hoặc có overlap, căn lại trước; component báo lỗi để tránh âm thầm làm sai timing. `pageBreakAfter` chốt trang. Mặc định tối đa 7 từ/44 ký tự mỗi trang; khoảng nghỉ lớn hơn 600 ms tách trang. Một token dài vẫn được giữ nguyên dữ liệu và có thể xuống dòng theo CSS. Khoảng nghỉ ngoài trang không hiện phụ đề.

## Sử dụng với dữ liệu JSON

```tsx
import captions from './data/ten-video/captions.json';
import {KineticCaptions} from './components/caption-effects';

<KineticCaptions
  captions={captions}
  effect="karaoke"
  theme="cyan"
  keywords={['thời', 'gian', 'Trái', 'Đất']}
  panel={false}
/>
```

Đường dẫn ví dụ tính từ `src/`. Không render đồng thời `KineticCaptions` và component captions cũ ở cùng khu vực. Giữ captions ngoài `SceneTransition` và phía trên các lớp hiệu ứng không khí/chuyển cảnh. Giữ Trà Xanh và disclaimer không che chữ.

## Tương thích dữ liệu hiện có

Các video cũ dùng `phrases[].words[]` với trường `word`. Có adapter giữ nguyên timing:

```tsx
import {useMemo} from 'react';
import {fromLegacyPhrases, KineticCaptions} from './components/caption-effects';

const captions = useMemo(() => fromLegacyPhrases(phrases), [phrases]);

<KineticCaptions captions={captions} localFrame={chapterLocalFrame} effect="fade" />
```

Adapter giữ ngắt trang giữa các phrase, nhưng không nhập dòng dịch `textEn`; tiếp tục dùng component phụ đề song ngữ hiện có khi cần. Nếu dữ liệu đã dùng thời gian toàn video thì dùng frame toàn video; nếu timestamps cục bộ theo chương, đặt captions trong Sequence chương hoặc truyền `localFrame`. Không bù offset chương hai lần.

## Tùy chỉnh

| Prop | Mặc định | Ghi chú |
| --- | --- | --- |
| `effect` | `pop` | Chọn một trong 9 kiểu |
| `theme` | `gold` | Gold, cyan, emerald |
| `keywords` | Mảng rỗng | Từng từ; không phân biệt hoa/thường và dấu câu, giữ phân biệt dấu tiếng Việt |
| `keywordColor` | `#FACC15` | Có thể chọn `#38BDF8` |
| `fontSize` | 48 ngang / 64 dọc | Chỉnh sau khi xem frame thực tế |
| `bottom` | 44 ngang / 290 dọc | Theo vùng an toàn của project |
| `maxWidth` | 1380 ngang / 980 dọc | Đồng thời giới hạn trong bề rộng khung |
| `maxWords` | 7 | Số từ tối đa một trang |
| `maxCharacters` | 44 | Ngắt trang theo độ dài, không sửa nội dung |
| `offsetMs` | 0 | Dương = trễ hơn audio, âm = sớm hơn |
| `localFrame` | Frame hiện tại | Dùng với timestamps của chương |
| `panel` | false | Bật nền tối khi hình quá phức tạp |
| `strokeWidth` | 10 | Chỉ giảm cho gallery/demo thu nhỏ |
| `zIndex` | 20 | Trên atmosphere/chuyển cảnh |

Ưu tiên một kiểu xuyên suốt video, chỉ đổi ở hook hoặc đoạn nhấn có chủ ý. Chọn hiệu ứng theo nhịp đọc; từ quá ngắn có thể chưa chạy hết chuyển động trước khi tới từ sau, nhưng highlight luôn theo timestamp. Không kéo dài highlight để animation lấn sang từ khác.

Kiểm tra logic: `node --test scripts/caption-effects.test.mjs`. Kiểm tra cuối vẫn cần nghe audio thật và xem các câu dài, số, tên riêng cùng lúc có Trà Xanh/CTA. Thư viện này không sinh TTS hoặc tự căn lời đọc.
