# Hướng dẫn Chuẩn Hệ thống Text-to-Speech (VieNeu-TTS)

> **Dành cho tất cả các AI Agents & Lập trình viên**: Quy chuẩn tạo âm thanh thuyết minh (voiceover) cho video YouTube Shorts và Video dài (Remotion) trong repository này.

Tài liệu này được đối chiếu với [VieNeu SDK Overview](https://docs.vieneu.io/docs/sdk/overview/), [Install & backends](https://docs.vieneu.io/docs/sdk/standard-mode/) và [GPU batching](https://docs.vieneu.io/docs/sdk/fast-mode/). Nếu API thay đổi, tài liệu/README chính thức của VieNeu được ưu tiên.

---

## 1. Giọng Đọc Mặc Định Của Dự Án (Default Voice Rule)

> [!IMPORTANT]
> **QUY TẮC BẮT BUỘC 1**: Mọi video sản xuất trong dự án này nếu không có yêu cầu đặc biệt khác từ người dùng **BẮT BUỘC PHẢI DÙNG GIỌNG ĐỌC MẶC ĐỊNH**:
>
> 🌟 **`Trúc Ly`** (Nữ · Miền Bắc · Phong cách tự nhiên, truyền cảm)
>
> Mô hình VieNeu-TTS và các script trong workspace đã được cấu hình mặc định sẵn là **`Trúc Ly`**.

### Các giọng thay thế (chỉ dùng khi có yêu cầu cụ thể từ User):
- `Thiện Minh`: Nam · Bắc · Phong cách kể chuyện, huyền bí, tài liệu.
- `Mai Anh`: Nữ · Bắc · Phong cách tin tức, thời sự, sôi nổi.
- `Thùy Dung`: Nữ · Nam Bộ · Phong cách tự nhiên, truyền cảm.
- `Hải Đăng`: Nam · Bắc · Tự nhiên.

---

## 2. Thông số Kỹ thuật & Môi trường Chạy

- **Mô hình**: `pnnbao-ump/VieNeu-TTS-v3-Turbo` (kèm codec 48kHz).
- **Môi trường Python ảo**: `VieNeu-TTS\.venv\` (Python 3.12.14, PyTorch `2.8.0+cu128`).
- **Phần cứng**: Chạy tăng tốc trên GPU **NVIDIA GeForce RTX 3060** (CUDA).
- **Chất lượng & Định dạng Audio**: **WAV 48,000 Hz mono PCM 24-bit**. Voiceover không xuất MP3.
- **Backend**: VieNeu v3 Turbo, buộc `backend="pytorch"`, `device="cuda"`; script dừng nếu CUDA không hoạt động thay vì âm thầm chạy CPU.
- **Tăng tốc**: dùng `infer_batch()`; mặc định batch 16 câu trên RTX 3060. Có thể điều chỉnh theo VRAM bằng `--batch-size`.
- **Lưu ý từ tài liệu VieNeu**: v3 Turbo là model 48 kHz; `style` đã deprecated và không còn tác dụng. Chất giọng đọc phụ thuộc preset/reference voice.

---

## 3. Quy Tắc Bắt Buộc: Sinh Âm Thanh Theo Từng Câu (Sentence-by-Sentence)

> [!IMPORTANT]
> **QUY TẮC BẮT BUỘC 2**: **TẤT CẢ VIDEO PHẢI SINH AUDIO THEO TỪNG CÂU / TỪNG CẢNH (Sentence-by-Sentence / Shot-by-Shot)**.
>
> ❌ **TUYỆT ĐỐI KHÔNG**: Gom cả đoạn văn dài hoặc cả chương vào 1 file audio duy nhất rồi cố gắng cắt gọt hoặc đoán mốc thời gian chuyển cảnh bằng Whisper.

### Tại sao bắt buộc sinh theo từng câu?
1. **Khớp chính xác 100% hình ảnh với câu thoại**: Mỗi bức ảnh minh họa (`001.png`) đi kèm chính xác với câu thuyết minh tương ứng (`S001.wav`). Hoàn toàn triệt tiêu hiện tượng lệch trôi thời gian (timing drift) giữa audio và hình ảnh.
2. **Khắc phục triệt để lỗi căn nhịp (Pacing)**: Khi sinh từng câu, thời lượng hiển thị của mỗi cảnh được xác định trực tiếp từ thời lượng phát âm thanh của câu đó:
   $$\text{durationInFrames} = \text{speechFrames} + \text{pauseFrames}$$
3. **Chỉnh sửa cục bộ siêu tốc (Iterative Editing)**: Nếu kịch bản cần sửa 1 câu hoặc đổi 1 bức ảnh, Agent chỉ cần chạy lại TTS cho câu đó trong ~1 giây, không phải render lại toàn bộ âm thanh của cả video.

---

## 4. Quy Chuẩn Khoảng Ngắt Nhịp Giữa Mỗi Câu (Pause & Breathing Space)

> [!IMPORTANT]
> **QUY TẮC BẮT BUỘC 3**: Giữa mỗi câu thoại **BẮT BUỘC PHẢI CÓ KHOẢNG NGẮT NHỊP (PAUSE INTERVAL)**.
> Tuyệt đối không để câu sau phát ngay sát sạt câu trước khiến lời đọc bị dồn dập, mất tự nhiên và làm người xem mệt tai.

### 4.1. Vai trò của khoảng ngắt nhịp:
- **Tạo nhịp thở tự nhiên**: Giúp người nghe kịp lắng lại và tiếp nhận thông tin vừa nghe trước khi chuyển sang ý niệm mới.
- **Không gian êm ái cho Chuyển Cảnh (Transitions)**: Khi chuyển cảnh giữa 2 bức ảnh (mất ~10–15 frames), khoảng lặng đảm bảo không có tiếng nói bị nuốt chữ hay cắt cụt trong lúc hình ảnh đang mờ dần/dịch chuyển.
- **Không gian cho Phụ đề (Captions)**: Người xem có đủ thời gian đọc hết chữ cuối câu trước khi dòng chữ mới xuất hiện.

### 4.2. Độ dài khoảng ngắt nhịp khuyến nghị:
- **Video Thuyết minh / Tài liệu / Lịch sử 16:9**: **`0.4s – 0.6s`** (~12 – 18 frames ở 30 fps) — *(Mặc định tối ưu: `0.4s`)*.
- **YouTube Shorts 9:16 (tiết tấu nhanh)**: **`0.25s – 0.35s`** (~8 – 10 frames ở 30 fps).
- **Hết một chương / chuyển đoạn lớn**: **`0.8s – 1.0s`** (~24 – 30 frames ở 30 fps).

---

## 5. Hướng Dẫn Sử Dụng Script Tiện Ích Chuẩn (`scripts/generate_tts_sentences.py`)

Script chuẩn nằm tại [`scripts/generate_tts_sentences.py`](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/scripts/generate_tts_sentences.py). Script nạp model một lần trên CUDA, dùng `infer_batch()` theo lô, chèn silence ngắt nhịp, QA từng WAV và xuất metadata Remotion. Mỗi lần chạy còn tạo `tts_run.json` để ghi backend/device/GPU và thông số xử lý thực tế.

### 5.1. Lệnh Thực Thi Cơ Bản

```powershell
$env:PYTHONIOENCODING="utf-8"

# Cách 1: Nạp từ storyboard.json (Mặc định khoảng ngắt nhịp 0.4s)
& ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/<slug>/storyboard.json" -o "public/audio/<slug>" --batch-size 16

# Cách 2: Tùy chỉnh khoảng ngắt nhịp (ví dụ 0.5s cho tài liệu lắng đọng)
& ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/<slug>/narration.txt" -o "public/audio/<slug>" --pause 0.5 --batch-size 16

# Cách 3: Shorts tiết tấu nhanh (ngắt nhịp 0.25s)
& ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/<slug>/narration.txt" -o "public/audio/<slug>" --pause 0.25 --batch-size 16
```

### 5.2. Các Tham Số CLI Tùy Chọn

| Tham số | Viết tắt | Ý nghĩa | Mặc định |
| --- | --- | --- | --- |
| `--input` | `-i` | Đường dẫn file JSON storyboard hoặc TXT kịch bản | *(Bắt buộc)* |
| `--outdir` | `-o` | Thư mục lưu các file audio và manifest | *(Bắt buộc)* |
| `--voice` | `-v` | Giọng đọc (VieNeu-TTS) | `"Trúc Ly"` |
| `--format` | `-f` | Chỉ chấp nhận `wav`; giữ để tương thích với lệnh cũ có `--format wav` | `"wav"` |
| `--fps` | | Tốc độ khung hình video Remotion | `30` |
| `--pause` | `-p`, `--pause-seconds` | Thời gian ngắt nhịp nghỉ giữa mỗi câu (giây) | `0.4` (12 frames) |
| `--batch-size` | | Số câu đưa vào mỗi batch CUDA | `16` |
| `--true-peak-dbfs` | | Trần true peak sau oversampling 4× | `-3.0` |
| `--highpass-hz` | | Cắt rumble/DC rất thấp | `45` |
| `--lowpass-hz` | | Giảm dải siêu cao dễ lộ artefact vocoder | `16000` |
| `--fade-ms` | | Fade-in/out ở biên để tránh click/pop | `10` |
| `--no-audio-silence` | | Không chèn silence vật lý vào audio (chỉ tính vào frame) | `False` (mặc định có chèn) |
| `--manifest` | `-m` | Đường dẫn file JSON metadata xuất ra | `<outdir>/sentences_manifest.json` |
| `--allow-cpu` | | Cho phép ONNX/CPU có chủ đích; không dùng trong pipeline GPU bình thường | `False` |

---

## 6. Chuỗi xử lý WAV chống méo/rè

MP3 là codec lossy, không phải bộ khử nhiễu; mã hóa MP3 có thể che một phần dải cao nhưng cũng tạo artefact mới. Pipeline giữ waveform WAV và xử lý nguyên nhân kỹ thuật có thể đo được:

1. Xác minh VieNeu thực sự chạy v3 Turbo trên CUDA/PyTorch và trả waveform 48 kHz.
2. Loại DC offset; high-pass 45 Hz để bỏ rumble và low-pass 16 kHz bậc 4, zero-phase để giảm dải siêu cao dễ lộ artefact mà không lệch pha lời nói.
3. Fade-in/out 10 ms để tránh click ở biên câu.
4. Đo true peak bằng oversampling 4× và chỉ giảm gain khi vượt `-3 dBFS`; không tự nâng câu nhỏ vì có thể khuếch đại noise.
5. Ghi WAV mono PCM 24-bit rồi đọc lại, xác minh sample rate, số kênh, subtype, số sample, NaN/Inf và clipping.

Các bước này ngăn rè do clipping, inter-sample peak, DC và dải siêu cao trong pipeline. Chúng không thể bảo đảm sửa mọi artefact do chính lần suy luận của model; nếu một câu vẫn lỗi, sinh lại riêng câu đó và nghe QA.

## 7. Cấu Trúc Dữ Liệu Đầu Vào & Đầu Ra

### 7.1. Định dạng đầu vào (`storyboard.json` hoặc `narration.txt`)

#### Dạng JSON `storyboard.json`:
```json
[
  {
    "id": "S001",
    "text": "Dưới lòng đất sâu hàng trăm mét, có một thế giới kỳ lạ đang tồn tại.",
    "file": "public/images/underground/001.png"
  },
  {
    "id": "S002",
    "text": "Những rễ cây không hề cô độc, chúng liên tục trò chuyện với nhau.",
    "file": "public/images/underground/002.png"
  }
]
```

#### Dạng TXT `narration.txt` (Mỗi dòng 1 câu):
```text
Dưới lòng đất sâu hàng trăm mét, có một thế giới kỳ lạ đang tồn tại.
Những rễ cây không hề cô độc, chúng liên tục trò chuyện với nhau.
Mạng lưới nấm khổng lồ hoạt động giống hệt như một mạng internet sinh học.
```

### 7.2. Định dạng đầu ra (`sentences_manifest.json`)
Script tự động sinh các file âm thanh `S001.wav`, `S002.wav`,... (đã bao gồm khoảng lặng ngắt nhịp ở đuôi) và tạo file manifest với cấu trúc chuẩn:

```json
[
  {
    "id": "S001",
    "text": "Dưới lòng đất sâu hàng trăm mét, có một thế giới kỳ lạ đang tồn tại.",
    "image": "images/underground/001.png",
    "audioSrc": "audio/underground/S001.wav",
    "speechDurationMs": 3850,
    "pauseDurationMs": 400,
    "durationMs": 4250,
    "speechFrames": 116,
    "pauseFrames": 12,
    "durationInFrames": 128,
    "audioDurationSeconds": 4.25,
    "rawSpeechSeconds": 3.85,
    "audioFormat": "wav",
    "sampleRate": 48000,
    "wavSubtype": "PCM_24",
    "quality": {
      "outputTruePeakDbfs": -3.0,
      "clippedSamples": 0
    }
  }
]
```

---

## 8. Cách Sử Dụng Trong Remotion Composition (TypeScript)

Với `sentences_manifest.json`, việc dựng timeline trong Remotion trở nên cực kỳ tinh gọn, không còn phải lo lắng căn chỉnh thủ công:

```tsx
import { Sequence, Audio, Img, staticFile } from "remotion";
import manifest from "../../../public/audio/underground/sentences_manifest.json";

export const UndergroundVideo: React.FC = () => {
  // Tính tổng thời lượng composition tự động
  let accumulatedFrames = 0;

  return (
    <div style={{ flex: 1, backgroundColor: "#000" }}>
      {manifest.map((item, index) => {
        const fromFrame = accumulatedFrames;
        accumulatedFrames += item.durationInFrames;

        return (
          <Sequence
            key={item.id}
            from={fromFrame}
            durationInFrames={item.durationInFrames}
            name={`Scene_${item.id}`}
          >
            {/* 1. Ảnh minh họa tương ứng */}
            <Img
              src={staticFile(item.image)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* 2. Audio giọng đọc tương ứng */}
            <Audio src={staticFile(item.audioSrc)} />
          </Sequence>
        );
      })}
    </div>
  );
};
```

---

## 9. Sinh Nhanh Cho Đoạn Test / Single-line (`scripts/generate_tts.py`)

Đối với trường hợp chỉ muốn test một câu văn bản ngắn trên dòng lệnh hoặc sinh file kiểm tra mẫu, có thể dùng script đơn giản:

```powershell
$env:PYTHONIOENCODING="utf-8"
& ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts.py --text "Kiểm tra âm thanh giọng Trúc Ly." --out "public/audio/test_voice.wav"
```

---

## 10. Nghe Thử & Kiểm Tra Mẫu
Để nghe thử mẫu các giọng đọc trên trình duyệt:
- Mở file: [preview_tts.html](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/preview_tts.html)
