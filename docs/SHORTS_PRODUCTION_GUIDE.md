# Quy trình Chuẩn Sản xuất Video YouTube Shorts (Remotion)

> **Tài liệu hướng dẫn & quy chuẩn bắt buộc** dành cho việc tạo mới các video dạng dọc (9:16) chuẩn YouTube Shorts / TikTok / Reels bằng Remotion.

> Khi bắt đầu video mới, đọc [VIDEO_PRODUCTION_WORKFLOW.md](VIDEO_PRODUCTION_WORKFLOW.md) để chốt brief, kiểm chứng kịch bản, lưu tiến độ và xử lý việc tiếp tục khi bị ngắt. Tài liệu này bổ sung thông số riêng cho Shorts; không áp dụng kích thước dọc cho video 16:9.

---

## 1. Thông số Kỹ thuật Chuẩn (Video Specs)
- **Độ phân giải**: `1080 x 1920 px` (Vertical 9:16).
- **Tốc độ khung hình**: `30 FPS`.
- **Độ dài**: 60s – 100s (thường từ 1800 đến 3000 frames).
- **Audio Voiceover**: Định dạng WAV (chuyển sang 16kHz mono PCM để Whisper AI nhận diện).
- **Render Engine**: Remotion CLI (`--concurrency=4`).

---

## 2. Các Quy tắc Bắt buộc về Layout & Giao diện (UI Rules)

### ❌ KHÔNG ĐƯỢC CÓ:
1. **KHÔNG chèn CTA toàn màn hình hoặc ở giữa khung hình**. Khi cần Like/Đăng ký, chỉ dùng bong bóng thoại của Trà Xanh theo `AGENTS.md`.
2. **KHÔNG dùng thanh ngang full-width (1000px) ở Header**:
   - Không để text `FILE #...` hay `CHỦ ĐỀ: ...` chiếm full chiều ngang che khuất bối cảnh nhân vật.

###  BẮT BUỘC PHẢI CÓ:
1. **Header Badge**:
   - Chỉ dùng **1 chiếc badge dạng viên thuốc auto-width** (`width: fit-content`), bo góc tròn `borderRadius: 24`, padding `8px 20px`.
   - Vị trí: `top: 96, left: 36`.
   - Nội dung: Tên chủ đề ngắn gọn in hoa (VD: `● ĐIỆN XOAY CHIỀU`, `● ĐỘC THÂN TRỌN ĐỜI`, `● THUYẾT TƯƠNG ĐỐI`), có đèn neon phát sáng phía trước.
2. **Thanh Tiến trình (Progress Bar)**:
   - Nằm sát mép trên cùng (`top: 0`), chiều cao `8px`, màu accent đồng bộ với chủ đề video (`ProgressBar.tsx`).
3. **Badge Sự kiện Phân cảnh (Contextual Scene Badge)**:
   - **Cao độ bắt buộc**: `bottom: 530px` (đã nâng cao để không bao giờ bị phụ đề che lấp).
   - **Kích thước chữ bắt buộc**: `fontSize: 24px`, in hoa (`textTransform: "uppercase"`), `fontWeight: 800`.
   - Khung kính mờ Glassmorphism: `backgroundColor: "rgba(10, 8, 22, 0.88)"`, `backdropFilter: "blur(18px)"`, `border: "1.5px solid ..."`, `borderRadius: 30`, padding `"10px 22px"`.
   - Đèn chỉ báo hình tròn nhỏ `11x11px` có viền phát sáng `boxShadow: 0 0 10px ...`.
4. **Phụ đề Động (Kinetic Word-by-Word Subtitles)**:
   - **Cao độ**: `bottom: 290px`, căn giữa màn hình, giới hạn chiều rộng `maxWidth: 980px`.
   - **Từ đang nói (Active Word)**:
     - Nằm trong viên thuốc nổi bật (Pill) với gradient rực rỡ (VD: Vàng hổ phách Liquid Gold, Xanh điện Plasma Cyan, hoặc Tím vũ trụ Cosmic Violet).
     - Chữ màu tối (`#040816` hoặc `#140A02`) trên nền sáng để tương phản tối đa.
     - Viền bóng phát sáng mạnh mẽ (`boxShadow: 0 0 25px ..., 0 0 10px ...`).
     - Hiệu ứng nhảy chữ (Punch animation) phóng to nhẹ `scale: 1.15 - 1.25`.
   - **Từ khóa quan trọng (Keywords)**: Chữ màu vàng chanh (`#FACC15`) hoặc xanh cyan (`#38BDF8`).
   - **Từ thường**: Chữ trắng `#FFFFFF` có viền đen dày `WebkitTextStroke: "10px #000000"`, `paintOrder: "stroke fill"` để rõ ràng trên mọi hình nền.
5. **Hiệu ứng Camera (Ken Burns)**:
   - Luôn áp dụng zoom hoặc pan nhẹ (`zoom-in`, `zoom-out`, `drift-up`, `drift-down`, `drift-left`, `drift-right`) để khung hình chuyển động mượt mà.
   - Dùng component ảnh của Remotion và kiểm tra asset load đúng; không mặc định tải đồng thời toàn bộ ảnh của video dài trong một div ẩn vì có thể tăng bộ nhớ không cần thiết.
6. **Cảnh Báo Bản Quyền BGM (STRICT COPYRIGHT WARNING)**:
   - ⚠️ **KHO NHẠC CŨ BỊ CONTENT ID**: Các MP3 cũ từng ở `mp3/` / `public/music/legacy-content-id/` nếu xuất hiện lại vẫn KHÔNG được tự sử dụng để xuất bản.
   - Ưu tiên 11 WAV AI người dùng thêm tại `public/music/`; không gán cảnh báo kho cũ cho WAV mới. Ghi nguồn và kiểm tra quyền dùng trước xuất bản. Volume BGM tối đa `0.5`, kể cả tổng gain overlap; xem [BACKGROUND_MUSIC_GUIDE.md](BACKGROUND_MUSIC_GUIDE.md).
7. **Disclaimer Minh Họa Bắt Buộc (Mandatory AI / Illustration Disclaimer)**:
   - **QUY TẮC BẮT BUỘC**: Mọi video có sử dụng hình ảnh minh họa (đặc biệt là tranh ảnh/nhân vật do AI tạo) **BẮT BUỘC PHẢI CÓ** dòng chữ chú thích:
     `* Hình ảnh chỉ mang tính chất minh họa`
   - **Component**: Sử dụng component `<LeninDisclaimer text="* Hình ảnh chỉ mang tính chất minh họa" />` (hoặc alias `<AiDisclaimer />` từ `src/components/LeninDisclaimer.tsx`).
   - **Vị trí**: Đặt ở góc dưới màn hình (`bottom: 50` hoặc `bottom: 240, right: 40` đối với Shorts 9:16, hoặc `bottom: 24, right: 40` đối với Video Ngang 16:9), đảm bảo chữ mờ tinh tế, không che lấp phụ đề hay các nút điều hướng.



---

## 3. Quy trình Sản xuất Từng bước (Step-by-Step Workflow)

### Bước 0: Tạo Audio Thuyết minh TTS (BẮT BUỘC GIỌNG MẶC ĐỊNH: TRÚC LY)
> Xem chi tiết tại [docs/TTS_GUIDE.md](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/docs/TTS_GUIDE.md).
1. Sử dụng **VieNeu-TTS v3 Turbo** chạy trên GPU RTX 3060. Giọng đọc mặc định bắt buộc là **`Trúc Ly`** (Nữ Bắc tự nhiên).
2. **Quy chuẩn sinh audio theo từng câu (Sentence-by-Sentence)**:
   Để khớp 100% từng câu thoại với từng bức ảnh minh họa của Shorts:
   ```powershell
   $env:PYTHONIOENCODING="utf-8"
   & ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/<ten-video>/storyboard.json" -o "public/audio/<ten-video>"
   ```
   Script tự động tạo các file `S001.wav`, `S002.wav`,... kèm file `sentences_manifest.json` ghi nhận số frames chuẩn 30fps cho từng cảnh.
3. *(Chỉ với video đơn giản 1 shot duy nhất)*, có thể sinh 1 file gộp:
   ```powershell
   & ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts.py --text "Nội dung kịch bản..." --out "public/audio/<ten-video>.wav"
   ```

### Bước 1: Chuẩn bị Audio & Tính Frame
1. File audio TTS đã nằm tại `public/audio/<ten-video>/` và toàn bộ ảnh vào `public/images/<ten-video>/`.
2. **DỌN TMP CỦA VIDEO NÀY NGAY SAU KHI XÁC MINH COPY**: Dùng `tmp/<ten-video>/`, kiểm tra file đích trong `public/` đọc được rồi chỉ xóa những file tạm của video này bằng đường dẫn tuyệt đối đã xác minh. Không xóa toàn bộ `tmp/` chung.
3. Dùng trực tiếp `durationInFrames` từ `sentences_manifest.json` cho từng `<Sequence>` cảnh trong Remotion. Thêm ~15–30 frame (~0,5–1 giây) ở cuối để video kết thúc êm.

### Bước 1.5: Thiết lập Nhạc Nền (LƯU Ý BẢN QUYỀN)
1. Đọc [BACKGROUND_MUSIC_GUIDE.md](BACKGROUND_MUSIC_GUIDE.md); ưu tiên các WAV AI hiện có tại `public/music/`, ghi nguồn/quyền dùng trước xuất bản. MP3 cũ bị cảnh báo vẫn không tự dùng nếu xuất hiện lại.
2. Dùng `Audio` từ `@remotion/media`, đường dẫn thật như `staticFile("music/How It Works.wav")`; giữ BGM trên timeline riêng và không đổi timing TTS/phụ đề.
3. Voiceover `1.0`, nhạc khởi đầu `0.08`, lời dày `0.04–0.06`; mức cuối tùy nghe thử nhưng **không bao giờ vượt `0.5`, kể cả tổng gain khi crossfade**. `0.5` là trần, không phải mặc định. Fade/ducking mượt, không tăng nhạc ở mỗi pause ngắn.
4. Shorts có thể dùng một track phù hợp. Video dài phải lập cue sheet nhiều track theo chương/cảm xúc, crossfade 1–3 giây, không đổi bài mỗi câu/ảnh. Lưu from/duration/trim/gain/fade/loop ở `music_cues.json`, liên kết manifest mới có nhạc.
5. Render clip lời + nhạc + CTA và từng cặp chuyển bài để nghe/đo loop/clipping; ghi gain/quyền dùng/QA trước render dài. Chỉ áp dụng cho video mới hoặc video được yêu cầu chỉnh nhạc; giữ nguyên video cũ.

### Bước 2: Chuyển đổi Audio 16kHz & Chạy Whisper AI
1. Dùng ffmpeg nội bộ của Remotion để tạo file 16kHz mono:
   ```bash
   npx.cmd remotion ffmpeg -y -i public/audio/<ten-video>.wav -ar 16000 -ac 1 -c:a pcm_s16le temp_16k_<ten-video>.wav
   ```
2. Chạy script Whisper:
   ```javascript
   // scripts/transcribe_<ten-video>.mjs
   import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";
   import path from "path";
   import fs from "fs";

   const whisperPath = path.join(process.cwd(), "whisper.cpp");
   const inputPath = path.join(process.cwd(), "temp_16k_<ten-video>.wav");

   const whisperCppOutput = await transcribe({
     inputPath,
     model: "base",
     tokenLevelTimestamps: true,
     whisperPath,
     whisperCppVersion: "1.6.0",
     language: "vi",
     splitOnWord: true,
   });

   const { captions } = toCaptions({ whisperCppOutput });
   fs.writeFileSync("whisper_<ten-video>_captions.json", JSON.stringify(captions, null, 2));
   ```
3. Thực thi: `node scripts/transcribe_<ten-video>.mjs`.

### Bước 3: So khớp 100% Từ vựng với Kịch bản (Alignment)
1. Viết script so sánh token của Whisper với từng từ trong văn bản kịch bản gốc (`scripts/align_<ten-video>.py`).
2. **Lưu ý tên riêng nước ngoài**: Sửa chữ theo lời đọc, gộp/tách token khi cần và nghe lại timing. Không ép số token Whisper khớp 1-1 bằng cách chia đều thời gian.
3. Chia cảnh theo storyboard và timestamp của câu/ý; số ảnh theo yêu cầu thực tế, không mặc định 12 ảnh.
4. Sinh file `src/data/<ten-video>Subtitles.ts`.

### Bước 4: Tạo Components cho Video
Ưu tiên tái sử dụng component phù hợp đã có và thay data/theme. Chỉ tạo component riêng khi bố cục hoặc hiệu ứng thực sự cần khác:
- `src/components/<TenVideo>HUD.tsx`: Chứa badge auto-width ở góc trên (`top: 96, left: 36`).
- `src/components/<TenVideo>Scene.tsx`: Chứa chuyển động ảnh Ken Burns, lớp phủ gradient, và badge sự kiện ở `bottom: 530px`, font size `24px`.
- `src/components/<TenVideo>Captions.tsx`: Phụ đề động kinetic với active pill bắt mắt (`bottom: 290px`) và highlight keywords.
- `src/components/<TenVideo>BackgroundMusic.tsx`: (Tùy chọn nếu có nhạc miễn phí bản quyền).

### Bước 5: Lắp ráp Composition & Đăng ký
1. Tạo `src/<TenVideo>Short.tsx`:
   - Gồm các thẻ `<Sequence>` tương ứng với các scene với `durationInFrames` và `from` được tính chính xác từ timestamps của Whisper.
   - Thêm giọng đọc: `<Audio src={staticFile("audio/<ten-video>.wav")} />`.
   - Thêm `<ProgressBar color="..." height={8} />`.
   - Thêm `<Captions phrases={...} bottom={290} />`.
   - Thêm text chú thích minh họa bắt buộc: `<LeninDisclaimer text="* Hình ảnh chỉ mang tính chất minh họa" />`.
2. Đăng ký trong `src/Root.tsx`:
   ```tsx
   <Composition
     id="<TenVideo>Short"
     component={<TenVideo>Short}
     width={1080}
     height={1920}
     fps={30}
     durationInFrames={<TotalFrames>}
   />
   ```
3. Thêm lệnh render vào `package.json`:
   ```json
   "render:<ten-video>": "remotion render <TenVideo>Short out/<ten-video>.mp4"
   ```

### Bước 6: Kiểm tra Bằng Frame Tĩnh (Still Check)
Trước khi render cả video, luôn chụp 1–2 frame đại diện để kiểm tra layout:
```bash
npx.cmd remotion still <TenVideo>Short out/preview_f60.png --frame=60
npx.cmd remotion still <TenVideo>Short out/preview_f1200.png --frame=1200
```
Kiểm tra bằng mắt:
- [ ] Header chỉ có duy nhất 1 badge auto-width (không có `FILE #...` hay `CHỦ ĐỀ: ...`).
- [ ] Badge phân cảnh ở `bottom: 530px`, chữ to `24px`, không đè vào phụ đề.
- [ ] Phụ đề ở `bottom: 290px`, từ active sáng rõ.
- [ ] Bắt buộc có dòng chữ "* Hình ảnh chỉ mang tính chất minh họa" ở góc dưới.
- [ ] CTA (nếu có) chỉ nằm trong bong bóng thoại của Trà Xanh, không che phụ đề.


### Bước 7: Render Video Hoàn Chỉnh
```bash
npx.cmd remotion render <TenVideo>Short out/<ten-video>.mp4 --concurrency=4
```

### Bước 8: Dọn dẹp Thư mục `out/` (Housekeeping)
Sau khi video render xong và bản cuối đã kiểm tra, xóa các file preview/test PNG của **video này** trong `out/<ten-video>/preview/`, bằng đường dẫn tuyệt đối đã xác minh. Giữ MP4 thành phẩm và báo cáo QA. Không xóa preview/output của video khác.

---

| **Video** | **Theme / Bối cảnh Visual** | **Accent Color Chính** | **Subtitle Glow & Active Gradient** |
|---|---|---|---|
| **Steve Jobs (Apple & NeXT & Pixar)** | Cupertino Minimalist / Apple Keynote & Dynamic Island | Apple Blue (`#0071E3`) & Titanium White (`#F5F5F7`) | Pure Titanium Spotlight (`#FFFFFF` -> `#E5E5EA`) & Keynote Gold (`#FFD60A`) |
| **Bitcoin (Satoshi Nakamoto)** | Cyberpunk Cryptography / Digital Gold & Genesis Block | Bitcoin Gold (`#F59E0B`) & Cyber Cyan (`#06B6D4`) | Gold-Cyan Gradient (`#F59E0B` -> `#F97316` -> `#06B6D4`) & Gold (`#FBBF24`) |
| **Elon Musk (Tesla & SpaceX)** | Aerospace Cyberpunk / Falcon Flame & Tesla Tech | SpaceX Orange (`#F97316`) & Electric Cyan (`#06B6D4`) | Mars Flame Pill (`#EF4444` -> `#F97316` -> `#06B6D4`) & Electric Cyan (`#38BDF8`) |
| **Linus Torvalds (Linux & Git)** | Terminal Matrix / Hacker Open Source & Tux | Terminal Emerald (`#10B981`) & Electric Cyan (`#06B6D4`) | Terminal Pill (`#10B981` -> `#06B6D4` -> `#F59E0B`) & Sky Cyan (`#38BDF8`) |
| **Figma (Dylan Field)** | Silicon Valley Tech / Figma Cyber Gradient | Figma Purple (`#A259FF`) & Figma Blue (`#1ABCFE`) | Figma Gradient (`#1ABCFE` -> `#A259FF` -> `#F24E1E`) & Sky Cyan (`#38BDF8`) |
| **Vlad Dracula** | Gothic Wallachia / Order of the Dragon & Blood Noir | Blood Crimson (`#DC2626`, `#EF4444`) & Dragon Gold (`#F59E0B`) | Vibrant Cyan (`#38BDF8`) & Dragon Gold (`#FDE047`) |
| **Napoleon Bonaparte** | French Empire / Imperial Gold & Editorial Satire | Imperial Gold (`#F59E0B`, `#FDE047`) & French Navy (`#1E3A8A`) | Vibrant Sky Cyan (`#38BDF8`) & Imperial Red (`#DC2626`) |
| **Thành Cát Tư Hãn** | Eternal Blue Sky (Tengri) / Nomadic Steppe Empire | Steppe Azure (`#0284C7`) & Golden Horde Gold (`#F59E0B`) | Tengri Sky Cyan (`#38BDF8`) & Amber Gold (`#FBBF24`) |
| **Tần Thủy Hoàng** | Imperial Qin Dynasty / Dragon Throne & Liquid Mercury | Dragon Throne Gold (`#F59E0B`, `#FDE047`) & Mercury Silver | Vibrant Sky Cyan (`#38BDF8`) & Terracotta Coral (`#FB7185`) |
| **Caligula** | Imperial Rome / Roman Hubris & Marble | Imperial Crimson (`#DC2626`) & Laurel Gold (`#F59E0B`) | Sky Cyan (`#38BDF8`) |
| **Chaplin** | Golden Age Hollywood / Vintage Cinema Spotlight | Radiant Cinema Gold (`#F59E0B`, `#FDE047`) | Cinema Cyan (`#38BDF8`) |
| **Darwin** | Victorian Naturalist / Botanical Expedition | Jungle Emerald (`#10B981`, `#059669`) | Antique Gold (`#FBBF24`) |
| **Einstein** | Cosmic Relativity / Blackboard Physics | Cosmic Violet (`#8B5CF6`, `#A855F7`) | Stellar Gold (`#FBBF24`) |
| **Tesla** | High-Voltage Plasma / Cyberpunk Noir | Electric Cyan (`#00F0FF`, `#3B82F6`) | Electric Yellow (`#FACC15`) |
| **Newton** | Secret Historical Archives / Antique Gold | Liquid Gold (`#F59E0B`, `#FBBF24`) | Cyan (`#38BDF8`) |
| **Zeigarnik** | Psychological Traps / Deep Hologram | Electric Cyan & Indigo (`#06B6D4`, `#8B5CF6`) | Lemon Yellow (`#FACC15`) |
| **Fake Busy** | Psychological Case Study / Emerald Matrix | Matrix Emerald (`#10B981`) | Warm Amber (`#F59E0B`) |
| **Cortisol** | Clinical Bio-Hacking / Crimson Alert | Crimson Red (`#F43F5E`) | Cyber Cyan (`#06B6D4`) |
