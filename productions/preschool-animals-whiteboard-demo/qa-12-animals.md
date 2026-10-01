# QA Preschool — bản12 loài, 2026-10-01

## Kiểm tra nguồn và đoạn thử

- TypeScript: npx tsc --noEmit pass.
- 12 JPG người dùng xem từng ảnh, copy so SHA256, giữ gốc trong public. 12 PNG alpha được mở xem: không nền/shadow/watermark, giữ chân/tai/ria/mai/vây. extraction.json xác nhận RGB opaque không đổi.
- 48 câu thống nhất “bạn…”, ba nhóm4 và ba quiz. Trúc Ly sinh lại từng câu bằng CUDA/PyTorch RTX3060, WAV48000Hz mono PCM24; nghỉ0.55s; tất cả clippedSamples0. Model cache offline, không chuyển dịch vụ tính phí.
- 7069frames ở30fps =235.6333s; voice playbackRate0.9. SRT48 câu dùng speechDuration thực, không timestamps từ giả, không phủ khoảng chờ bằng phụ đề thoại.
- 84 tick riêng, không trùng hoặc chồng frame. Tick880Hz/0.24s gain0.35 khi vẽ,0.50 khi đoán; BGM0.008 lúc đếm với ramp12frames,0.035 đoạn khác. Loop music extend giữ fade theo toàn video, cap0.5.
- Mở15 stills: intro75 chỉ bóng/dấu hỏi; vẽ280 có số lớn; mèo450; tám loài mới2520/2950/3380/3820/4610/5050/5480/5930; quiz6240; ôn6500/6680/6880. Chữ có dấu, không cắt; tên dài xuống dòng; mỗi bài một hình chính, quiz hai lựa chọn; ôn đủ3 nhóm.
- Hai đoạn120frames quiz được mã hóa. Benchmark4workers16.91s nhanh hơn8workers17.81s trong lượt đo này; render đầy đủ dùng4. MP4 thử có tick, peak−10.44dBFS; RMS toàn clip−29.97dBFS; scan2fps không mất ảnh.
- ASR Whisper base dùng như kiểm tra phụ trên12 câu gọi tên: có “bạn” xuyên suốt nhưng nhiều lỗi tên/dấu (“hương cao cụ”, “gà vàng”…). Không dùng ASR này thay kịch bản/SRT hoặc khẳng định phát âm chuẩn.
- Chỉ Preschool không mascot/CTA/disclaimer theo yêu cầu. Không sửa sharedcomponents hoặc nội dung Long/Shorts. MP4 mới xuất tên12-animals, không ghi đè bản cũ đang mở.

## Bản MP4 đầy đủ

- MP4 H.2641920×1080,30fps,AAC48000Hz stereo,7069 video frames; container235.690667s (AAC padding),20,192,715bytes. Giải mã toàn bộ video exit0.
- Audio giải mã từ MP4: sample peak−2.932dBFS, estimated4×truepeak−2.895dBFS, clippedSamples0.48 cửa sổ lời có tín hiệu;84 tick đạt RMS>−32dBFS, tick nhỏ nhất−26.241dBFS. Tick quiz vượt nhạc ít nhất30.526dB. Chi tiết audio_qa.json.
- Visual scan lấy đúng source frame mỗi15frames (2fps):7069frames giải mã,472samples,433panel checks, không panel trống; min126darkpixels. Chi tiết visual_qa.json.
- Bộ quét ban đầu dùng output-r2 tạo CFR duplicates/drop làm lệch timestamp và báo nhầm136s/205.5s là panel trống. Đã mở trực tiếp frame136/205.5s và hai frame lân cận mỗi điểm, thấy đủ hình. Sửa quét giữ source-index thay vì index/2; lượt quét chính xác pass, không sửa video để che cảnh lỗi.
- Mở khung mã hóa3/9/100/169/212/229s và136/205.5s: intro chưa lộ màu, vẽ có số lớn, tên/đặc điểm thân thiện, đáp án dài đầy đủ và đúng bạn, ôn nhóm cuối đủ4 bạn. Still đáp án6360 cũng pass.

## Giới hạn

Không hỗ trợ nghe audio input trong phiên này; không tuyên bố đã nghe bằng tai hoặc phát âm/cảm xúc hoàn hảo. Người dùng cần nghe bản mới trước xuất bản. ASR và waveform không thay thế nghe chủ quan.

Chưa có điều khoản thương mại model ảnh/nhạc; đây là mẫu local, chưa đăng YouTube. Quy trình Remotion dùng frame-based animation, giữ audio ngoài chuyển cảnh và kiểm tra cả still lẫn MP4 mã hóa.

Sau QA thành công dọn đúng PNG preview/bản sao staging đã đối chiếu với public và clip kiểm tra của mẫu. Giữ MP4/SRT cuối, JPG/PNG/WAV nguồn, script, transcript ASR và báo cáo. Video thử cũ giữ nguyên, không phải bản hoàn thiện12 loài.
