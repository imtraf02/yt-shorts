# Sử dụng nhạc nền AI: volume tối đa 0.5 và nhiều track

Quy chuẩn người dùng chốt ngày 2026-09-30: ưu tiên kho nhạc AI trong `public/music/`, **BGM volume tối đa `0.5`**, video dài dùng nhiều track theo chương/cảm xúc. Chỉ áp dụng cho video mới hoặc video được yêu cầu chỉnh nhạc; không sửa video hiện có. TTS vẫn sinh theo từng câu, giữ timing lời đọc/phụ đề.

## 1. Thư viện hiện có

Đã kiểm tra sự hiện diện của 11 WAV tại `public/music/`:

| File | Đường dẫn dùng với staticFile() |
| --- | --- |
| Cozy Nook.wav | `music/Cozy Nook.wav` |
| Daydrift.wav | `music/Daydrift.wav` |
| How It Works.wav | `music/How It Works.wav` |
| Lazy Afternoon.wav | `music/Lazy Afternoon.wav` |
| Simple Logic.wav | `music/Simple Logic.wav` |
| Simply Put.wav | `music/Simply Put.wav` |
| Small Discoveries.wav | `music/Small Discoveries.wav` |
| Sunday Drift.wav | `music/Sunday Drift.wav` |
| Sunlit Porch.wav | `music/Sunlit Porch.wav` |
| Warm Breeze.wav | `music/Warm Breeze.wav` |
| Window Seat.wav | `music/Window Seat.wav` |

Người dùng xác nhận đây là nhạc AI và yêu cầu sử dụng kho mới trong quy trình. Không gán cảnh báo Content ID của MP3 cũ cho WAV mới. Danh sách trên xác nhận file tồn tại, **chưa phải kết quả nghe, đo loudness, phân loại cảm xúc hoặc xác minh giấy phép**. Không suy BPM, mood, duration hoặc chất lượng chỉ từ tên file.

Giữ nguyên tên/vị trí, không bắt buộc chuyển vào `approved/` mới dùng trong bản dựng thử. Ghi nguồn/model, ngày tạo nếu biết, căn cứ người dùng cho phép và trạng thái quyền dùng vào `productions/<slug>/music_sources.md`; điều chưa biết ghi rõ chưa xác minh. Trước xuất bản, kiểm tra điều khoản thương mại/YouTube của model/gói tạo nhạc áp dụng, lưu bằng chứng và attribution nếu cần. Không mặc định nhạc AI bảo đảm tránh Content ID.

MP3 cũ từng ở `mp3/` rồi `public/music/legacy-content-id/` vẫn không được tự dùng nếu xuất hiện lại, kể cả đổi tên/copy. Khi kiểm tra ngày 2026-09-30, thư mục legacy không còn trong kho hiện tại; không tự khôi phục. Giữ nguyên tài nguyên video cũ ở đường dẫn khác. TTS ở `public/audio/<slug>/`, SFX ở `public/audio/ui/`, không nhầm với BGM.

## 2. Trần volume 0.5, không phải mặc định

Giữ voiceover `volume={1.0}`. Mỗi track nhạc và mọi keyframe/callback, fade, ducking, intro/outro phải thỏa **`0 <= volume <= 0.5`**. `0.5` là mức tối đa được phép, không phải mức cần dùng cho mọi bài.

| Tình huống | Mức khởi đầu để nghe thử |
| --- | --- |
| Dưới lời đọc | `0.08` |
| Lời dày hoặc nhạc lấn lời | `0.04–0.06` |
| Nhạc thưa, nhẹ dưới lời | `0.06–0.15`, tùy nguồn |
| Intro/outro/chuyển chương không lời | `0.15–0.30` |
| Đoạn không lời cần nổi bật hơn | Tăng sau QA, nhưng **không vượt `0.5`** |

Đây là preset dự án, không phải tiêu chuẩn loudness. Nguồn nhỏ có thể cần gain ngoài khoảng khởi đầu sau nghe/đo, nhưng tuyệt đối không vượt `0.5`; lưu lý do/mức cuối trong QA. Nếu lời khó nghe, hạ nhạc trước. `1.0` giữ nguyên mức nguồn giọng đọc; gain không biểu thị tỷ lệ độ to cảm nhận giữa hai file.

**Khi overlap, tổng gain cuối của mọi track BGM đang phát cũng không vượt `0.5` tại mỗi frame.** Không phát hai bài cùng `0.5`, không nhân thêm master gain hoặc boost nguồn để né trần. VO/SFX không nằm trong tổng gain BGM nhưng vẫn phải kiểm tra clipping bản mix đầy đủ.

Crossfade tuyến tính giữa hai track: với tiến độ `p` từ 0 đến 1, gain A = `gainA * (1 - p)`, gain B = `gainB * p`. Nếu hai mức đích đều không vượt `0.5`, tổng không vượt trần; ví dụ hai track cùng mức `0.2` có tổng luôn `0.2`. Nếu dùng đường cong khác/nhiều lớp, kiểm tra và giới hạn tổng gain sau mọi envelope; giới hạn từng track riêng lẻ chưa đủ.

## 3. Video dài dùng nhiều nhạc nền

Không loop một bài từ đầu đến cuối theo thói quen. Lập **music cue sheet** theo hook, chương và phần kết; chọn nhiều track khác nhau sau khi nghe, dựa trên diễn biến nội dung. Với documentary 10–13 phút có thể bắt đầu kế hoạch với 3–6 track; đây là gợi ý, không phải quota. Không cần dùng hết thư viện.

- Mỗi chương/khối cảm xúc chọn nhạc phù hợp; cùng bài có thể chạy qua nhiều cảnh. Không đổi bài mỗi câu hoặc mỗi ảnh.
- Giữ màu âm thanh nhất quán; đổi bài ở chuyển chương, luận điểm hoặc cảm xúc có chủ đích. Không chọn ngẫu nhiên/alphabetical, không suy mood từ tên file.
- Đo duration nguồn thật, chọn điểm vào/ra theo nhịp/hòa âm. Đoạn dài hơn nguồn thì loop phần thích hợp sau kiểm tra; không mặc định cả file đều loop tốt.
- Crossfade khoảng 1–3 giây (khởi đầu 2 giây), chỉnh theo nhịp/nội dung. Hai bài chỉ chồng nhau trong cửa sổ chuyển; không phát tất cả bài cùng lúc.
- Ghi file, chapter/scene IDs, from/duration/trim, gain, fade, loop và lý do chọn cue. Có thể tái dùng một bài ở kết để tạo liên kết nếu phù hợp.
- Không đổi tốc độ TTS, duration cảnh hoặc timestamp phụ đề để vừa bài nhạc. Cắt/loop nhạc theo timeline lời đọc đã chốt.
- Có thể để khoảng không nhạc có chủ đích; ngoài đó tránh khoảng hở do sai timing, đuôi nhạc bị cắt hoặc đổi loudness đột ngột.

## 4. Quy trình bắt buộc cho AI dựng video

1. Đọc `AGENTS.md`, tài liệu này và [VIDEO_PRODUCTION_WORKFLOW.md](VIDEO_PRODUCTION_WORKFLOW.md). Video mới có nhạc ưu tiên 11 WAV hiện có, không gen lại trước khi chọn từ kho. Tôn trọng yêu cầu không nhạc nếu có; nếu quyền dùng chưa phù hợp cho xuất bản, làm bản chỉ VO và báo rõ.
2. Nghe shortlist và kiểm tra duration, sample rate, số kênh, clipping, vocal/humming không mong muốn, độ dày, tiếng chói, điểm loop. Chỉ khi cần bổ sung mới dùng [36 prompt nhạc nền](BACKGROUND_MUSIC_PROMPTS.md). Không ghi đã nghe khi chỉ đọc metadata.
3. Lập `productions/<slug>/music_cues.json` và `music_sources.md`. Video dài có nhiều cue/track theo mục 3; không chọn một bài mặc định toàn video.
4. Dựng BGM trên timeline riêng ngoài Sequence chuyển hình; có thể dùng Sequence audio riêng để đặt cue. Giữ timing VO/phụ đề theo `sentences_manifest.json`. Bật `settings.backgroundMusic: true` và liên kết cue sheet trong production mới có nhạc; không thay toàn bộ manifest.
5. Bắt đầu VO `1.0`, BGM `0.08`; chọn gain từng track sau nghe vì nguồn khác loudness. Fade đầu khoảng 1–1.5 giây, fade cuối 1.5–2 giây; rút fade khi clip ngắn. Mọi gain và tổng BGM overlap phải không vượt `0.5`.
6. Ducking mượt: có thể hạ về `0.04–0.06` khi lời dày, chỉ tăng ở đoạn không lời đủ dài (khoảng 1 giây trở lên). Không tăng nhạc ở mỗi pause TTS 0.25–0.6 giây. Hạ trước lời khoảng 0.15–0.25 giây, tăng lại trong 0.4–0.8 giây khi đủ chỗ; trở về mức dưới lời trước câu tiếp theo.
7. Căn crossfade từng cặp cue, kiểm tra tổng gain sau fade/ducking, loop và khoảng hở. Automation theo timeline video, không reset mỗi vòng loop. Căn frame cục bộ audio với frame toàn composition, tránh lệch khi Sequence bắt đầu muộn.
8. Render clip VO+BGM+CTA/SFX: đoạn lời dày, **mỗi cặp chuyển bài khác nhau**, một loop nếu dùng và đoạn click. Nghe tai nghe/loa điện thoại: lời rõ, không pumping/nhảy loudness, đuôi không bị cắt, click không giật mình. Still không chứng minh audio đạt.
9. Đo mix render, kể cả sau encode AAC: không clipping; mục tiêu true peak bản cuối không vượt `-1 dBTP`. Trần gain `0.5` không bảo đảm mix an toàn; nếu không đạt thì giảm gain/chỉnh mix và kiểm tra lại.
10. Lưu track, gain cuối, timecode chuyển bài/fade/loop và kết quả nghe/đo vào manifest/`qa.md`, khai báo inputs checkpoint rồi render dài. Nghe lại hook, chuyển chương, CTA, kết trong MP4 cuối. Không tự chỉnh video cũ.

## 5. Cue sheet và manifest có thể tái lập

Ví dụ video 10 phút ở 30 fps dùng 4 track, crossfade tuyến tính 2 giây. Đây **không phải lựa chọn mood đã nghe thử** hoặc cấu hình để copy vào mọi video. Duration cue là thời lượng trên timeline, không phải nguồn; `loopAsNeeded` phải được triển khai sau đo/chọn phần nguồn phù hợp. Cửa sổ overlap `[4500, 4560)`, `[9000, 9060)`, `[13500, 13560)` giữ nguyên timeline 18.000 frames.

```json
{
  "fps": 30,
  "durationInFrames": 18000,
  "voiceoverGain": 1.0,
  "maxMusicGain": 0.5,
  "maxCombinedMusicGain": 0.5,
  "crossfadeCurve": "linear",
  "cues": [
    {
      "id": "M01", "chapterId": "C01", "src": "music/Small Discoveries.wav",
      "fromFrame": 0, "durationInFrames": 4560, "trimBeforeFrames": 0,
      "loopAsNeeded": true, "baseGain": 0.08, "duckGain": 0.05, "noSpeechGain": 0.2,
      "fadeInFrames": 36, "fadeOutFrames": 60
    },
    {
      "id": "M02", "chapterId": "C02", "src": "music/How It Works.wav",
      "fromFrame": 4500, "durationInFrames": 4560, "trimBeforeFrames": 0,
      "loopAsNeeded": true, "baseGain": 0.08, "duckGain": 0.05, "noSpeechGain": 0.2,
      "fadeInFrames": 60, "fadeOutFrames": 60
    },
    {
      "id": "M03", "chapterId": "C03", "src": "music/Simple Logic.wav",
      "fromFrame": 9000, "durationInFrames": 4560, "trimBeforeFrames": 0,
      "loopAsNeeded": true, "baseGain": 0.08, "duckGain": 0.05, "noSpeechGain": 0.2,
      "fadeInFrames": 60, "fadeOutFrames": 60
    },
    {
      "id": "M04", "chapterId": "C04", "src": "music/Warm Breeze.wav",
      "fromFrame": 13500, "durationInFrames": 4500, "trimBeforeFrames": 0,
      "loopAsNeeded": true, "baseGain": 0.08, "duckGain": 0.05, "noSpeechGain": 0.2,
      "fadeInFrames": 60, "fadeOutFrames": 54
    }
  ]
}
```

Các key cue sheet là quy ước dữ liệu dự án, không phải props để truyền nguyên khối vào Audio. Agent phải ánh xạ/triển khai mix. Thêm cấu hình sau vào `settings` hiện có, thay `<slug>` bằng tên production thật:

```json
{
  "backgroundMusic": true,
  "music": {
    "cueSheet": "productions/<slug>/music_cues.json",
    "sources": "productions/<slug>/music_sources.md",
    "voiceoverGain": 1.0,
    "maxMusicGain": 0.5,
    "maxCombinedMusicGain": 0.5
  }
}
```

Lệnh `video-job init` hiện vẫn tạo `backgroundMusic: false`; agent bật trong production mới có nhạc sau chọn track/ghi cue sheet. Manifest chỉ lưu kế hoạch, **không tự thêm nhạc, crossfade hoặc ducking**. Không đổi script init hoặc manifest video cũ chỉ để cập nhật docs.

Khai báo tất cả file nhạc thật sự dùng, cue sheet, nguồn quyền dùng, source component và automation làm inputs checkpoint composition/render. Kiểm tra cue có file tồn tại, gain hữu hạn trong `0–0.5`, duration/trim/fade hợp lệ, không vượt cuối video, overlap chỉ ở cửa sổ dự kiến và tổng gain BGM không vượt `0.5` tại mọi frame.

Khi triển khai Remotion, dùng Audio từ `@remotion/media`, asset qua `staticFile()` theo bảng đường dẫn thật. Callback volume media-relative không mặc định là frame toàn composition. Hướng dẫn API: [audio skill chính thức của Remotion](https://github.com/remotion-dev/remotion/blob/main/packages/skills/skills/remotion-markup/audio.md). Các mức mix và trần `0.5` ở đây là quy chuẩn riêng của dự án.
