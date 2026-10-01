# Agent Guidelines for YouTube Shorts Project (Remotion + VieNeu-TTS)

> **MANDATORY RULES FOR ALL AI AGENTS WORKING IN THIS REPOSITORY**  
> (Antigravity, Claude, Cursor, Windsurf, Copilot, Codex, etc.)

---

## 0. Quy trình mặc định khi có yêu cầu video mới

- Đọc [docs/VIDEO_PRODUCTION_WORKFLOW.md](docs/VIDEO_PRODUCTION_WORKFLOW.md) trước khi bắt đầu. Đây là quy trình điều phối chung cho Shorts và video ngang; các quy tắc giọng đọc, bố cục, nhân vật và bản quyền bên dưới vẫn áp dụng.
- Yêu cầu “tạo video” bao gồm kịch bản → tài nguyên → TTS → phụ đề → dựng → kiểm tra → MP4. Nếu người dùng chỉ yêu cầu kịch bản/ảnh, dừng đúng phạm vi đó.
- Kế thừa thông số người dùng đã chốt; không hỏi lại các lựa chọn đã có. Khi không có thông số khác, dùng hướng gần nhất: documentary explainer ngang 16:9, Vox-style anime 2D; nếu yêu cầu Shorts thì dùng 9:16. Thông báo giả định ngắn gọn trước khi làm.
- Mỗi video có hồ sơ `productions/<slug>/manifest.json`, kịch bản và storyboard liên kết bằng ID cảnh. Dùng `node scripts/video-job.mjs init <slug> --format long` (hoặc `short`) để khởi tạo; `status <slug>` để kiểm tra tiến độ khi tiếp tục.
- **Quy chuẩn sinh âm thanh (TTS)**: **BẮT BUỘC sinh voiceover theo TỪNG CÂU / TỪNG CẢNH (Sentence-by-Sentence)** bằng `scripts/generate_tts_sentences.py`. Tuyệt đối KHÔNG sinh gộp cả đoạn văn hoặc cả chương dài, nhằm đảm bảo thời lượng hình ảnh và câu thoại khớp chính xác 100%, không bị lệch trôi timing (drift), dễ sửa lẻ và tự động tính `durationInFrames` cho Remotion.
- Tự kiểm tra chất lượng mẫu trước khi tạo hàng loạt; tiếp tục các bước đã được yêu cầu mà không chờ duyệt lại từng chặng. Khi dịch vụ bị chặn, lưu lý do/thời điểm có thể thử lại và làm tiếp phần độc lập trong phạm vi yêu cầu.
- Không mặc định 12 hay 128 ảnh cho mọi video. Tôn trọng số ảnh đã được yêu cầu; nếu chưa có, lập shot list theo nội dung và thời lượng lời đọc.
- Chỉ tái sử dụng kết quả khi đầu vào và tài nguyên còn khớp checkpoint. Ghi tiến độ sau mỗi asset; không đợi hoàn thành cả lô mới lưu.
- Hiệu ứng không khí: tái sử dụng `src/components/effects/` theo [docs/VIDEO_EFFECTS_LIBRARY.md](docs/VIDEO_EFFECTS_LIBRARY.md). Chọn 1–2 lớp phù hợp bối cảnh, giữ dưới phụ đề/CTA và giảm mật độ khi có nhiều chữ; không tự thêm âm thanh.
- Hiệu ứng điện ảnh bổ sung: `CinematicOverlay` trong cùng thư viện; xem [docs/CINEMATIC_EFFECTS_LIBRARY.md](docs/CINEMATIC_EFFECTS_LIBRARY.md) cho bokeh, hắt sáng, hạt/xước phim, CRT, tối viền, vệt tốc độ và vòng sóng.
- Chuyển cảnh: dùng `src/components/transitions/` theo [docs/VIDEO_TRANSITIONS_LIBRARY.md](docs/VIDEO_TRANSITIONS_LIBRARY.md). Chọn 2–3 kiểu nhất quán mỗi video; giữ audio/captions ngoài lớp chuyển hình. Với timeline đã căn lời đọc, có thể dùng `TransitionOverlay` tại boundaries để giữ nguyên timing.
- Hiệu ứng phụ đề: dùng `src/components/caption-effects/` theo [docs/CAPTION_EFFECTS_LIBRARY.md](docs/CAPTION_EFFECTS_LIBRARY.md) khi muốn đổi kiểu chữ động. Nhận JSON timestamps thật; giữ quy chuẩn pill active/viền chữ, vị trí theo tỷ lệ và không làm đổi timing để kéo dài animation.
- Không hứa tự tiếp tục sau khi kết thúc chat nếu chưa có cơ chế theo dõi được người dùng yêu cầu. Không tự chuyển sang dịch vụ/API tính phí khi gặp quota.

---

## 🎙️ 1. Text-to-Speech (TTS) Default Voice & Sentence Alignment Rule

- **Default Voice**: **`Trúc Ly`** (Female · Northern Vietnamese · Natural & expressive style).
- **TTS Engine**: **VieNeu-TTS** v3-Turbo (`VieNeu-TTS\.venv\Scripts\python.exe`).
- **Hardware Acceleration**: NVIDIA GeForce RTX 3060 (CUDA, PyTorch `2.8.0+cu128`).
- **Audio Output**: **WAV 48,000 Hz mono PCM 24-bit**. Không dùng MP3 cho voiceover.
- **Rule 1 (Voice)**: Whenever creating voiceovers or generating new video audio without explicit instructions for a different voice from the user, **ALWAYS use `Trúc Ly`**.
- **Rule 2 (Sentence-by-Sentence Generation - BẮT BUỘC)**:
  - **TẤT CẢ VIDEO** (Shorts & Video dài) **PHẢI SINH AUDIO THEO TỪNG CÂU / PHÂN CẢNH** tương ứng với từng ảnh minh họa.
  - **KHÔNG ĐƯỢC sinh gộp cả đoạn/chương** thành một file âm thanh dài rồi cố gắng cắt hay dò tìm thời điểm chuyển ảnh.
  - Sử dụng script chuẩn: [`scripts/generate_tts_sentences.py`](scripts/generate_tts_sentences.py).
  - Script tự động:
    1. Sinh từng file **WAV 48 kHz PCM 24-bit** (`S001.wav`, `S002.wav`,...). Không nén lossy sang MP3 để che artefact.
    2. Bắt buộc xác minh backend CUDA/PyTorch, xử lý DC offset, lọc rumble/dải siêu cao, true-peak headroom `-3 dBFS`, fade biên 10 ms và kiểm tra lại file sau khi ghi để tránh clipping/click/rè do pipeline.
    3. Chèn khoảng lặng ngắt nhịp tự nhiên vào đuôi mỗi file.
    4. Đo độ dài giọng nói + thời gian nghỉ ngắt nhịp và xuất `sentences_manifest.json` để import trực tiếp vào Remotion.
- **Rule 3 (Khoảng ngắt nhịp giữa mỗi câu - BẮT BUỘC)**:
  - Giữa mỗi câu thoại **BẮT BUỘC PHẢI CÓ KHOẢNG NGẮT NHỊP (PAUSE)**:
    - Mặc định chuẩn: **`0.4 giây`** (~12 frames ở 30 fps).
    - Video tài liệu / lịch sử / suy ngẫm trầm lắng: **`0.5s – 0.6s`** (~15–18 frames).
    - Shorts tiết tấu nhanh: **`0.25s – 0.35s`** (~8–10 frames).
  - **Tác dụng**: Giúp giọng đọc tự nhiên, tránh bị dính chữ hay nói dồn dập, tạo không gian âm thanh êm ái cho hiệu ứng chuyển cảnh (transitions) và giúp người xem kịp nhìn ảnh và đọc phụ đề.
- **CLI Command chuẩn**:
  ```powershell
  $env:PYTHONIOENCODING="utf-8"
  # Mặc định ngắt nhịp 0.4s (12 frames):
  & ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/<slug>/storyboard.json" -o "public/audio/<slug>" --pause 0.4 --batch-size 16
  # Hoặc tùy chỉnh nhịp ngắt (ví dụ 0.5s):
  & ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/<slug>/narration.txt" -o "public/audio/<slug>" --pause 0.5 --batch-size 16
  ```
- *(Chỉ dùng `scripts\generate_tts.py` cho các trường hợp test thử 1 câu đơn lẻ)*.
- Full details: See [`docs/TTS_GUIDE.md`](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/docs/TTS_GUIDE.md).

---

## 🎵 2. Nhạc nền AI, giới hạn volume và nhiều track

- **BẮT BUỘC đọc [docs/BACKGROUND_MUSIC_GUIDE.md](docs/BACKGROUND_MUSIC_GUIDE.md)** trước khi chọn/mix nhạc.
- **Kho nhạc mới**: Người dùng đã thêm 11 WAV do AI tạo trực tiếp tại `public/music/`. Ưu tiên kho này cho video mới có nhạc, dùng đúng đường dẫn thật, không bắt buộc di chuyển vào `approved/`. Không gán cảnh báo MP3 cũ cho WAV mới. Nghe thử trước khi chọn mood; ghi nguồn/quyền dùng vào `productions/<slug>/music_sources.md`, xác minh điều khoản xuất bản trước khi đăng. Không khẳng định nhạc AI chắc chắn tránh Content ID.
- **TRẦN CỨNG: BGM `volume <= 0.5`** ở mọi frame, kể cả intro/outro, fade và ducking. Khi crossfade nhiều track, **tổng gain cuối của các track BGM đang phát cũng không vượt `0.5`**; không lách bằng master gain hoặc boost nguồn. Voiceover giữ `1.0`; nhạc khởi đầu `0.08`, lời dày `0.04–0.06`, điều chỉnh theo nghe/đo. `0.5` là mức tối đa, không phải mặc định.
- **VIDEO DÀI DÙNG NHIỀU TRACK** theo chương/cảm xúc, không loop một bài cho toàn video theo thói quen. Lập `music_cues.json` (file, chapter/scene IDs, from/duration/trim, gain, fade/loop), gợi ý 3–6 track cho 10–13 phút nhưng không ép số lượng. Crossfade khoảng 1–3 giây, chỉ overlap tại chuyển nhạc, không đổi bài mỗi câu/ảnh và không đổi timing TTS/phụ đề.
- Bật `settings.backgroundMusic: true` và liên kết cue sheet trong production mới có nhạc; script init vẫn mặc định `false`, manifest không tự triển khai mix. Render/nghe clip lời dày, từng cặp chuyển nhạc, loop và CTA; đo mix không clipping, lưu QA trước render dài.
- **Kho MP3 cũ** từng ở `mp3/` / `public/music/legacy-content-id/` vẫn bị cảnh báo Content ID, không tự dùng nếu xuất hiện lại, kể cả đổi tên/copy. Quy tắc cấm đi theo file cũ; không tự khôi phục chúng. Nếu chưa có quyền dùng phù hợp, chỉ voiceover cho bản xuất bản và báo rõ.
- Không sửa âm thanh video hiện có nếu chưa được yêu cầu. Prompt bổ sung nhạc: [docs/BACKGROUND_MUSIC_PROMPTS.md](docs/BACKGROUND_MUSIC_PROMPTS.md).

---

## 📐 3. Visual Layout & UI Rules (STRICT)

1. **NO Fullscreen / Center Like / Subscribe Overlays**:
   - NEVER add `<SubscribeOverlay />` or center CTA banners/stamps.
   - For CTA (Like & Subscribe), **ALWAYS** use the character speech bubble (`MocAnSpeechBubble` or `<ContinuousMocAn showCta={true} />`), which pops up periodically above the character without obscuring the screen.
2. **Top Header**:
   - Auto-width pill badge ONLY (`width: fit-content`), e.g., `[ ● TÊN CHỦ ĐỀ ]`.
   - NEVER use full-width 1000px banners or `FILE #...` spanning across the screen.
   - Position: `top: 96, left: 36`.
3. **Top Progress Bar**:
   - `ProgressBar.tsx` anchored at `top: 0`, `height: 8px`.
4. **Contextual Scene Badge**:
   - Height: `bottom: 530px` (MUST stay above subtitles).
   - Typography: `fontSize: 24px`, bold (`fontWeight: 800`), uppercase.
5. **Kinetic Subtitles (Whisper AI word-by-word)**:
   - Position: `bottom: 290px`, centered, `maxWidth: 980px` (Shorts) hoặc `bottom: 44px`, `maxWidth: 1380px` (Long-form 16:9).
   - Frame background: Khung kính mờ bán trong suốt (`rgba(3, 7, 18, 0.52)` kết hợp `backdropFilter: "blur(14px)"`, viền sáng nhẹ `rgba(255, 255, 255, 0.10)`).
   - Dynamic Auto-shrink: Tự động tính toán độ dài câu thoại để thu nhỏ font chữ linh hoạt (26px -> 23px -> 20.5px -> 18px), giúp câu dài không bị tràn khung hay che khuất khung hình chính.
   - Active Word: Glowing gradient pill, dark text (`#040816` hoặc `#140A02`).
   - Keywords: Bright yellow (`#FACC15`) or cyan (`#38BDF8`).
   - Normal words: White with thick black stroke (`WebkitTextStroke: "6px #020617"` hoặc `"10px #000000"`, `paintOrder: "stroke fill"`).
6. **Immediate TMP Cleanup**:
   - As soon as images/audio are copied from `tmp/<slug>/` to `public/` and verified, immediately remove only the exact temporary files belonging to this video. Resolve absolute paths within the workspace before deleting. Never clear shared `tmp/` or another task's files.
7. **Clean up after render**:
   - After successful render and QA, delete only this video's preview PNG files under `out/<slug>/preview/`, using verified absolute paths. Preserve other videos' outputs.
8. **Bắt Buộc Có Disclaimer Minh Họa AI (Mandatory Disclaimer)**:
   - **QUY TẮC BẮT BUỘC CHO TẤT CẢ AGENT**: Mọi video (cả YouTube Shorts 9:16 lẫn Video Ngang 16:9) sử dụng tranh ảnh/nhân vật minh họa (đặc biệt do AI tạo) **BẮT BUỘC PHẢI CÓ** text chú thích:
     `* Hình ảnh chỉ mang tính chất minh họa`
   - **Component**: Luôn sử dụng `<LeninDisclaimer text="* Hình ảnh chỉ mang tính chất minh họa" />` (hoặc alias `<AiDisclaimer />` từ `src/components/LeninDisclaimer.tsx`).
   - **Vị trí & Style**:
     - *Video Ngang 16:9*: Góc dưới trái (`bottom: 24, left: 40`), `fontSize: 13`, chữ nghiêng `fontStyle: "italic"`, màu trắng mờ `rgba(226, 232, 240, 0.65)` có bóng đen bảo vệ chữ. Vị trí này hoàn toàn thông thoáng, tránh xung đột với Scene Badges/HUD ở góc trên phải và Trà Xanh ở góc dưới phải.
     - *Video Dọc Shorts 9:16*: Vị trí an toàn góc trên hoặc góc dưới (`top: 110, right: 36` hoặc `bottom: 240`), không che phụ đề và tránh bị che bởi UI YouTube/TikTok.

---

## 👧 4. Character (Trà Xanh) & Speech Bubble CTA Rules (STRICT)

- **Default Character**: **`Trà Xanh`** (Chibi cô bé tóc trắng hoa lá tông xanh lục, tách nền trong suốt tại `public/characters/`).
- **Character Sizing & Placement**:
  - Size chuẩn: **`height = 180`** (nhỏ gọn, tinh tế, vừa vặn không che phụ đề hay khung hình chính).
  - Vị trí: Góc dưới phải (`side="right"`, `bottom: 20`, `right: 40`).
- **17 Trạng thái biểu cảm phong phú**:
  1. `suy-ngam`: Chạm tay lên cằm, suy ngẫm
  2. `khoanh-tay`: Khoanh tay, tự tin / hoài nghi
  3. `rung-rung`: Rưng rưng, nắm tay trước ngực
  4. `giat-minh`: Giật mình, tay khép trước người
  5. `e-the`: E thẹn, nghiêng đầu
  6. `khan-khoan`: Khẩn khoản, chắp tay cầu xin
  7. `lo-lang`: Lo lắng, hai tay khép trước người
  8. `vay-chao`: Vẫy tay chào, nụ cười thân thiện
  9. `thuyet-minh`: Mở lòng bàn tay, đang thuyết minh
  10. `an-mung`: Giơ hai tay, vui mừng ăn mừng
  11. `nay-y-tuong`: Giơ ngón trỏ, nảy ra ý tưởng
  12. `lang-nghe`: Đưa tay lên tai, chăm chú lắng nghe
  13. `cam-on`: Cúi đầu cảm ơn, hai tay khép trước người
  14. `ngoi-xep-bang-suy-ngam`: Ngồi xếp bằng, chạm tay lên cằm suy ngẫm
  15. `ngoi-nghieng-vay-chao`: Ngồi nghiêng, vẫy tay chào
  16. `ngoi-om-goi`: Ngồi ôm gối, buồn và mong manh
  17. `ngoi-quy-hao-huc`: Ngồi quỳ kiểu seiza, nắm tay háo hức
- **Bong bóng thoại kêu gọi Like & Subscribe (Speech Bubble CTA)**:
  - Khi muốn kêu gọi Like & Đăng ký kênh, **CHỈ DÙNG BONG BÓNG THOẠI** phát ra từ đỉnh đầu Trà Xanh (`<ContinuousTraXanh showCta={true} ctaMoments={...} />` hoặc `<ContinuousMocAn />`).
  - Màu sắc chủ đạo: **XANH LÁ** (Glassmorphic dark emerald green, viền ngọc lục bảo phát sáng `rgba(52, 211, 153, 0.65)`, nút Đăng ký xanh ngọc nổi bật).
  - Hiệu ứng: Spring pop-in, nhấp nhô lơ lửng, nút Thích & Đăng ký rung nhẹ, hiển thị lâu hơn (~8 giây, 240 frames) để người xem kịp đọc và bấm.
  - Tần suất: "Lâu lâu hiện lên" (khoảng 2.5 - 3.5 phút một lần hoặc 4-5 lần trong một video dài).

---

## 📚 5. Reference Documentation

- [docs/TTS_GUIDE.md](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/docs/TTS_GUIDE.md) - TTS Architecture & Python environment.
- [docs/SHORTS_PRODUCTION_GUIDE.md](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/docs/SHORTS_PRODUCTION_GUIDE.md) - Full step-by-step production pipeline.
- [preview_tts.html](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/preview_tts.html) - Audio preview player for voice samples.
