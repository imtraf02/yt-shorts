# Quy trình Chuẩn Sản xuất Video YouTube Shorts (Remotion)

> **Tài liệu hướng dẫn & quy chuẩn bắt buộc** dành cho việc tạo mới các video dạng dọc (9:16) chuẩn YouTube Shorts / TikTok / Reels bằng Remotion.

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
1. **Tuyệt đối KHÔNG chèn nút Like, Đăng ký kênh (Subscribe)** hay bất kỳ CTA kêu gọi tương tác nào vào video.
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
   - Preload toàn bộ ảnh trong `<div style={{ display: "none" }}>` để tránh rớt khung hình khi render.

---

## 3. Quy trình Sản xuất Từng bước (Step-by-Step Workflow)

### Bước 1: Chuẩn bị Audio & Tính Frame
1. Copy file audio TTS vào `public/audio/<ten-video>.wav`.
2. Kiểm tra độ dài và sample rate:
   ```bash
   node -e "
   const fs = require('fs');
   const buf = fs.readFileSync('public/audio/<ten-video>.wav');
   const byteRate = buf.readUInt32LE(28);
   const dataSize = buf.length - 44;
   const sec = dataSize / byteRate;
   console.log('Duration:', sec.toFixed(2), 's | Frames @ 30fps:', Math.ceil(sec * 30));
   "
   ```
3. Tổng số frame thường làm tròn thêm ~20-30 frame (~0.7s - 1s) ở cuối để video kết thúc êm, không bị giật cụt.

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
2. **Lưu ý tên riêng nước ngoài**: Nếu Whisper tách từ (VD: `ái` + `xác` -> `Isaac`), thực hiện gộp (merge) lại để số lượng token khớp chính xác 1-1 với kịch bản gốc.
3. Chia 12 phân cảnh tương ứng với 12 ảnh trong `public/images/<ten-video>/`.
4. Sinh file `src/data/<ten-video>Subtitles.ts`.

### Bước 4: Tạo Components cho Video
Tạo 3 component tương ứng:
- `src/components/<TenVideo>HUD.tsx`: Chứa badge auto-width ở góc trên.
- `src/components/<TenVideo>Scene.tsx`: Chứa chuyển động ảnh Ken Burns, lớp phủ gradient, và badge sự kiện ở `bottom: 530px`, font size `24px`.
- `src/components/<TenVideo>Captions.tsx`: Phụ đề động kinetic với active pill bắt mắt và highlight keywords.

### Bước 5: Lắp ráp Composition & Đăng ký
1. Tạo `src/<TenVideo>Short.tsx`:
   - Gồm 12 thẻ `<Sequence>` với `durationInFrames` và `from` được tính chính xác từ timestamps của Whisper.
   - Thêm `<Audio src={staticFile("audio/<ten-video>.wav")} />`.
   - Thêm `<ProgressBar color="..." height={8} />`.
   - Thêm `<Captions phrases={...} bottom={290} />`.
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
- [ ] Không có nút Like/Đăng ký.

### Bước 7: Render Video Hoàn Chỉnh
```bash
npx.cmd remotion render <TenVideo>Short out/<ten-video>.mp4 --concurrency=4
```

### Bước 8: Dọn dẹp Thư mục `out/` (Housekeeping)
Sau khi video render xong, **bắt buộc xóa sạch toàn bộ các file ảnh preview/test PNG**:
```powershell
Remove-Item -Path "out\*.png" -Force
```
Chỉ để lại các file `.mp4` thành phẩm trong thư mục `out/`.

---

## 4. Bảng Tra cứu Màu sắc & Phong cách Thiết kế Đã Áp dụng

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
