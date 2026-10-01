# Quy trình sản xuất video mới

Áp dụng khi người dùng yêu cầu video trong repository này. `AGENTS.md` quy định giọng đọc, nhạc nền, nhân vật và bố cục. Tài liệu này điều phối công việc; hướng dẫn Shorts cũ chỉ bổ sung chi tiết cho 9:16. Chỉ làm đến sản phẩm người dùng yêu cầu: “kịch bản và ảnh” không tự mở rộng thành TTS hoặc render.

## 1. Chốt brief từ thông tin đã có

Đọc yêu cầu và tài liệu đính kèm đầy đủ, kiểm tra tài nguyên đã có. Ghi vào `productions/<slug>/brief.md`: chủ đề, người xem, luận điểm chính, phạm vi sản phẩm, format, thời lượng mục tiêu, phong cách, số ảnh nếu đã chốt, điều cần tránh. Nêu giả định trong một cập nhật ngắn rồi làm tiếp; chỉ hỏi khi thiếu quyết định thực sự ảnh hưởng nội dung hoặc phạm vi.

Mặc định khi không có chỉ dẫn khác: tiếng Việt, Trúc Ly, WAV 48 kHz, 30 fps, Trà Xanh 180 px; video mới có nhạc ưu tiên kho WAV AI người dùng đã thêm tại `public/music/`, kiểm tra quyền dùng trước xuất bản. Hướng hình ảnh gần nhất của người dùng là Vox-style anime 2D ngang 16:9 (1920×1080); yêu cầu Shorts dùng 1080×1920. Documentary chưa có thời lượng thì lấy 10–13 phút làm mục tiêu ban đầu, Shorts 60–100 giây; đo audio để xác nhận thực tế. Đừng coi những con số này là hạn mức nền tảng.

Bắt buộc theo [BACKGROUND_MUSIC_GUIDE.md](BACKGROUND_MUSIC_GUIDE.md): voiceover `1.0`, nhạc khởi đầu `0.08` (lời dày `0.04–0.06`), **trần BGM `0.5` kể cả tổng gain khi overlap**. Video dài dùng nhiều track theo chương/cảm xúc, ghi `music_cues.json` và `music_sources.md`, crossfade 1–3 giây, giữ timing TTS/phụ đề. Bật nhạc trong manifest production mới có nhạc, QA clip lời dày/từng cặp chuyển nhạc/loop/CTA trước render dài. Nếu quyền dùng chưa phù hợp cho xuất bản, dùng chỉ voiceover và báo rõ. Các MP3 cũ ở `mp3/` / `public/music/legacy-content-id/` nếu xuất hiện lại vẫn không được tự dùng; không gán cảnh báo đó cho WAV AI mới. Prompt bổ sung: [BACKGROUND_MUSIC_PROMPTS.md](BACKGROUND_MUSIC_PROMPTS.md). Không tự áp dụng vào video hiện có.

Khởi tạo một lần, không ghi đè hồ sơ có sẵn:

```powershell
node scripts/video-job.mjs init ten-video --format long
node scripts/video-job.mjs status ten-video
```

Hồ sơ gồm manifest và các file do agent tạo theo từng bước:

| File | Vai trò |
| --- | --- |
| `productions/<slug>/brief.md` | Yêu cầu và giả định đã chốt |
| `script.md` | Kịch bản chia chương/câu, ID ổn định |
| `narration.txt` | Chỉ lời đọc, không prompt, markdown hay citation |
| `sources.md` | Claim → nguồn → ngày kiểm tra → mức chắc chắn |
| `storyboard.json` | Cảnh, câu thoại, asset, prompt đầy đủ, trạng thái |
| `manifest.json` | Thông số, đầu vào/đầu ra và checkpoint từng bước |
| `music_cues.json` | Timeline nhiều track, gain không vượt 0.5, trim/fade/loop và chapter/scene IDs |
| `music_sources.md` | Nguồn nhạc AI, căn cứ người dùng cho phép và trạng thái xác minh quyền xuất bản |
| `qa.md` | Bằng chứng kiểm tra hình, âm thanh, phụ đề và video |

Tài nguyên: `public/images/<slug>/`, `public/audio/<slug>/`; dữ liệu dựng: `src/data/<slug>/`; bản cuối: `out/<slug>/<slug>.mp4`. Script cũ đang hoạt động vẫn được giữ; không di chuyển video cũ để ép vào quy ước mới.

## 2. Kiểm tra môi trường và dịch vụ sớm

Lệnh `status` kiểm tra sự hiện diện của Node/Remotion, Python TTS và Whisper đã cấu hình; đây chỉ là kiểm tra file, chưa xác nhận CUDA, model hay dịch vụ hoạt động. Khi bắt đầu sản xuất thực tế, kiểm tra backend/model cục bộ và dung lượng đĩa nếu cần; không tải hay nâng cấp dependencies vô cớ.

Không có phép đọc quota tạo ảnh đáng tin cậy trong quy trình này. Sau khi có prompt, thử bằng **một ảnh thật thuộc bộ cần giao**. Nếu trả `usage_limit_reached`, lưu nguyên loại lỗi, thời gian reset do dịch vụ trả về và múi giờ Asia/Saigon vào `manifest.blockers`; không bịa số lượt ảnh còn lại. Không lặp lại toàn bộ lô. Lỗi quota khác với lỗi tạm thời: với lỗi tạm thời chỉ retry có giới hạn, và ghi lại kết quả.

Khi ảnh bị chặn, vẫn hoàn thiện kịch bản, nguồn, toàn bộ prompt và storyboard; nếu đang làm video hoàn chỉnh, tiếp tục TTS/phụ đề và phần dựng không phụ thuộc ảnh. Preview có placeholder phải được đánh dấu rõ và không được tính là ảnh hoàn thành hay bản xuất cuối. Chỉ chuyển sang API/provider khác khi đã có chỉ dẫn cho phép. Không tự đặt lịch hay giữ lời hứa sẽ tự chạy lại trong tương lai.

## 3. Kịch bản trước, lời đọc là chuẩn nội dung

Viết hook cụ thể → câu hỏi chính → các chương tăng dần thông tin → câu trả lời kết. Mỗi câu có ID (`S001`), mỗi chương có ID (`C01`). Phân biệt dữ kiện, diễn giải và ẩn dụ. Kiểm chứng số liệu, niên đại và thông tin dễ thay đổi bằng nguồn gốc/nguồn chính thức; lưu URL thật thay cho token citation từ bản nháp. Không tự nhận “đã kiểm chứng toàn bộ” khi mới kiểm tra vài claim.

Đọc thử câu dài, tên nước ngoài và số; lưu cách phát âm trong ghi chú. `narration.txt` phải khớp bản kịch bản đã sửa. Ước lượng thời lượng trước, nhưng chỉ xác nhận sau khi đo WAV. Nếu quá dài/ngắn, chỉnh nội dung hoặc nhịp đọc có chủ đích; không kéo giãn từng ảnh để bù một kịch bản quá ngắn.

## 4. Storyboard và kế hoạch asset

Một cảnh phục vụ một ý rõ ràng. Nếu người dùng yêu cầu 128 ảnh thì giữ đủ 128 ảnh riêng; nếu chưa chốt, số cảnh dựa trên lượng thông tin và nhịp kể. Mốc 4–6 giây/cảnh chỉ là ước lượng; hai góc nhìn có thể dùng cùng một asset nếu phù hợp và không trái số ảnh đã yêu cầu. Chữ, số liệu, biểu đồ chính xác và timeline dựng bằng code; tranh minh họa tạo bằng công cụ ảnh.

Schema tối thiểu cho mỗi phần tử trong `storyboard.json`:

```json
{
  "id": "I001",
  "chapterId": "C01",
  "sentenceIds": ["S001"],
  "kind": "generated-image",
  "file": "public/images/ten-video/001.png",
  "prompt": "Prompt đầy đủ: chủ thể, bối cảnh, phong cách, bố cục, tỷ lệ, điều tránh...",
  "overlayText": [],
  "timing": {"startMs": null, "endMs": null},
  "status": "pending",
  "qa": null
}
```

`kind`: `generated-image`, `existing-image` hoặc `code-graphic`. `status`: `pending`, `generated`, `verified`, `blocked`, `needs-revision`. Các timestamp ban đầu là null; điền từ audio và alignment. Code graphic không được tính vào số ảnh bitmap đã hứa.

Chốt style chung: bảng màu, nét vẽ, ánh sáng, mức chi tiết, bối cảnh lịch sử, đặc điểm nhân vật tái xuất hiện và khoảng trống cho overlay. Prompt không chứa chữ bắt buộc phải đọc chính xác; dựng các nhãn đó sau. Khung 16:9 phải được xác nhận bằng kích thước ảnh, không chỉ bằng prompt.

## 5. Tạo tài nguyên, lưu và kiểm tra từng phần

Tạo ảnh đầu tiên để kiểm tra bố cục; chọn thêm một cảnh nhân vật và một cảnh nhiều thông tin nếu bộ có các dạng này. Agent tự xem ảnh và sửa lỗi, rồi tiếp tục toàn bộ bộ ảnh, không mặc định dừng xin duyệt mẫu. Dùng ảnh đạt làm tham chiếu nếu công cụ hỗ trợ để giữ phong cách. Một lệnh cho một asset riêng; không dùng contact sheet thay cho ảnh giao cuối.

Mỗi ảnh tạo xong: kiểm tra → sao chép vào project → cập nhật storyboard với đường dẫn, prompt, nguồn và kết quả QA. Nhóm kiểm tra 8–16 ảnh để phát hiện sớm sai phong cách, không coi đây là cam kết số lệnh đồng thời được dịch vụ hỗ trợ. Nếu ảnh sai tỷ lệ, thiếu chủ thể, lỗi giải phẫu hoặc sai bối cảnh, sửa đúng ảnh đó. Ảnh cũ được giữ dưới tên phiên bản khi sửa. Chỉ báo đủ N/N khi N file đã tồn tại, đọc được và đã kiểm tra.

Với TTS, **BẮT BUỘC sinh voiceover theo TỪNG CÂU / TỪNG CẢNH (Sentence-by-Sentence)** bằng script chuẩn `scripts/generate_tts_sentences.py`. Tuyệt đối không gom cả đoạn văn hay cả chương vào một file WAV lớn. Việc sinh theo từng câu đảm bảo:
- Mỗi câu thoại tương ứng chính xác 1:1 với một hình ảnh minh họa (`001.png` ↔ `S001.wav`).
- Tự động chèn khoảng ngắt nhịp (pause) tự nhiên vào đuôi mỗi câu (`--pause 0.4s` ~ 12 frames), đo độ dài và tính sẵn `durationInFrames` chuẩn 30fps vào `sentences_manifest.json`. Khoảng ngắt nhịp giúp giọng đọc tự nhiên, người xem kịp quan sát ảnh, đồng thời tạo vùng đệm êm ái cho chuyển cảnh (transitions) mà không sợ bị đè hay cắt cụt tiếng.
- Khi cần chỉnh sửa kịch bản hay đổi ảnh của 1 cảnh, chỉ cần sinh lại đúng câu đó thay vì render lại toàn bộ âm thanh của video.

```powershell
$env:PYTHONIOENCODING="utf-8"
# Sinh từ storyboard.json (Mặc định khoảng ngắt nhịp 0.4s ~ 12 frames):
& ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/ten-video/storyboard.json" -o "public/audio/ten-video" --pause 0.4 --batch-size 16

# Hoặc sinh từ file narration.txt (mỗi dòng một câu, ngắt nhịp 0.5s cho tài liệu trầm lắng):
& ".\VieNeu-TTS\.venv\Scripts\python.exe" scripts\generate_tts_sentences.py -i "productions/ten-video/narration.txt" -o "public/audio/ten-video" --pause 0.5 --batch-size 16
```

Script mặc định buộc VieNeu v3 Turbo chạy `backend=pytorch`, `device=cuda`, dùng `infer_batch()` và dừng nếu CUDA không hoạt động; chỉ dùng `--allow-cpu` khi chủ động chấp nhận fallback. Mỗi file là WAV 48 kHz mono PCM 24-bit, có true-peak headroom -3 dBFS và QA đọc lại file. Kiểm tra `sentences_manifest.json` cùng `tts_run.json`, độ dài từng câu, im lặng bất thường, tiếng bị cắt/lặp; khai báo danh sách WAV hoặc thư mục audio trong manifest sản xuất.

## 6. Phụ đề và dựng theo lời nói

Nhờ sinh TTS theo từng câu, việc dựng hình và căn nhịp (timing) trong Remotion trở nên cực kỳ chính xác:
- Mỗi phân cảnh dùng một `<Sequence durationInFrames={item.durationInFrames}>` lấy từ `sentences_manifest.json`. Không còn hiện tượng lệch trôi thời gian (drift) giữa hình ảnh và âm thanh khi video dài.
- Đối với phụ đề: Chạy Whisper hoặc áp dụng trực tiếp text câu thoại từ kịch bản vào từng phân cảnh với hiệu ứng Kinetic Captions (`src/components/caption-effects/`). Timestamps luôn tăng dần và khép kín trong phạm vi của từng cảnh.
- Thời lượng tổng composition bằng tổng `durationInFrames` của tất cả các câu cộng lại (có thể thêm 10–20 frame đệm kết ở cuối video).

Tái sử dụng component dùng chung hiện có: `DocumentaryKenBurns`, `DocumentaryCaptions`, `ContinuousTraXanh` trong `TraXanhCharacter.tsx`, `LeninDisclaimer`. Xem props thật trước khi dùng. Không sao chép cả bộ component/script cho mỗi chủ đề nếu chỉ thay data và theme. Bản dựng cũ là tham khảo, vẫn phải đối chiếu `AGENTS.md`.

Hiệu ứng lá, tuyết, mưa, cánh hoa, bụi sáng và các lớp không khí khác có sẵn tại `src/components/effects/`; xem [VIDEO_EFFECTS_LIBRARY.md](VIDEO_EFFECTS_LIBRARY.md). Chọn hiệu ứng theo bối cảnh, lưu preset/seed trong dữ liệu cảnh và khai báo các file nguồn hiệu ứng vào checkpoint composition nếu dùng.

Chuyển cảnh có sẵn tại `src/components/transitions/`; xem [VIDEO_TRANSITIONS_LIBRARY.md](VIDEO_TRANSITIONS_LIBRARY.md). `SceneTransition` phối hai lớp hình, `TransitionOverlay` che điểm cắt sẵn có mà không đổi timeline. Giữ audio và captions bên ngoài; ghi loại, hướng và duration vào dữ liệu dựng.

Để đổi chuyển động chữ, dùng `KineticCaptions` trong `src/components/caption-effects/`, xem [CAPTION_EFFECTS_LIBRARY.md](CAPTION_EFFECTS_LIBRARY.md). Thư viện nhận JSON `Caption[]` hoặc adapter từ phrases cũ, giữ timestamp thật. Chọn một kiểu chủ đạo cho video và kiểm tra các câu dài ở cả tỷ lệ khung lẫn vùng có CTA.

Nhân vật Trà Xanh 180 px góc dưới phải; CTA chỉ bằng bong bóng thoại, với video dài xuất hiện khoảng 2,5–3,5 phút/lần, mỗi lần khoảng 8 giây. Header dạng pill, progress 8 px ở đỉnh. Subtitles: Shorts bottom 290/maxWidth 980; ngang bottom 44/maxWidth 1380. Disclaimer luôn có đúng câu `* Hình ảnh chỉ mang tính chất minh họa`, vị trí theo AGENTS. Kiểm tra thực tế việc chồng lấn nhân vật, CTA và disclaimer.

## 7. Kiểm tra trước khi render dài

Kiểm tra đường dẫn toàn bộ asset, số cảnh, audio và timestamp. Chạy typecheck/lint phù hợp phần thay đổi; nếu lỗi có sẵn ở video khác, báo rõ và xác minh riêng composition đang làm. Không sửa các video không liên quan chỉ để làm sạch toàn repo.

Render still ở hook, đầu mỗi chương, cảnh nhiều chữ, lúc CTA hiện và đoạn cuối. Mở ảnh kiểm tra bằng mắt. Render đoạn ngắn có chuyển cảnh và phụ đề để nghe/nhìn đồng bộ. Ghi frame/timecode, kết quả, lỗi đã sửa vào `qa.md`; file tồn tại không có nghĩa đã QA.

Sau khi QA đạt, render composition đúng ID với concurrency khởi đầu 4; chỉ tăng sau khi đo thấy có lợi. Không mặc định concurrency 12 từ một video cũ. Kiểm tra MP4 mở được, đúng tỷ lệ/fps, có audio và duration hợp lý; xem/nghe mở đầu, các chuyển chương và kết. Chỉ báo hoàn thành khi bản cuối đã kiểm tra.

## 8. Checkpoint và tiếp tục khi bị ngắt

`scripts/video-job.mjs` là công cụ theo dõi local, **không tự sinh ảnh/TTS, chạy render, hoặc thay thế QA**. Agent chỉnh `inputs`/`outputs` trong manifest thành danh sách file thật, thêm mọi file phụ thuộc (theme, prompt reference, source component dùng chung) trước khi checkpoint. Với ảnh, `images.outputs` phải liệt kê đủ bitmap được giao. Với render, liệt kê nguồn dựng/component/data thay đổi ngoài chuỗi phụ thuộc nếu có.

```powershell
node scripts/video-job.mjs checkpoint ten-video script --note "Đã đối chiếu script với narration và nguồn; xem sources.md"
node scripts/video-job.mjs status ten-video
```

Checkpoint lưu SHA-256 từng đầu vào/đầu ra đã khai báo. `status` phát hiện file thiếu, file đổi và bước phụ thuộc bị cũ; không tự đánh dấu xong chỉ vì có file. Kiểm tra thủ công vẫn cần cho những file không được khai báo và nội dung. Cấu hình `format`, `fps`, `voice`, `style` đổi sẽ làm checkpoint cũ cần xem lại. Bước ảnh và audio độc lập; captions chỉ cần audio; composition cần storyboard, ảnh, audio, captions.

Không sửa storyboard chỉ để đánh dấu một stage đã xong sau khi đã checkpoint chính file đó: hãy hoàn thiện scene status/timing trước, rồi checkpoint lại storyboard và các stage bị ảnh hưởng sau khi xác minh. Đây là kiểm tra bảo thủ; ảnh không đổi không cần gen lại chỉ vì hồ sơ đổi. Khi từng chương/ảnh đã đạt thì tiếp tục từ mục còn thiếu; checkpoint cả stage chỉ khi stage hoàn chỉnh.

Ghi blockers dạng `{ "stage": "images", "reason": "usage_limit_reached", "retryAfter": "ISO timestamp do dịch vụ trả về", "observedAt": "ISO timestamp" }`. Báo phần đã xong, số asset thật, phần thiếu, lý do và bước tiếp theo. Không mô tả prompt là ảnh đã tạo.

Sau khi xác nhận copy vào `public/` thành công, dọn ngay file tạm thuộc video này; sau QA bản cuối, xóa preview PNG của video này. Xác minh đường dẫn trước khi xóa, không dùng wildcard xóa toàn bộ `tmp/` hoặc `out/` chung. Giữ kịch bản, nguồn, prompt, storyboard, audio, asset, manifest và QA để sửa phiên bản sau.
