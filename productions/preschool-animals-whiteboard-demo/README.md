# Video mẫu: Bé làm quen với động vật

- Composition mới: `PreschoolAnimalsWhiteboardDemo`, mục Preschool trong Remotion Studio.
- Bản mới: `preschool-animals-whiteboard-demo-guess-3s.mp4` và SRT cùng tên, 1920×1080, 30fps, 7660 frames (255.33 giây). Bảo toàn các MP4 phiên bản trước.
- PNG alpha chỉ con vật tại `public/images/preschool-animals-whiteboard-demo/cutouts/`, đã tách nền/ground shadow/watermark cục bộ theo xác nhận của người dùng sau khi imagegen hết quota. Giữ JPG nguồn; RGB vùng con vật opaque được đối chiếu không đổi, có `extraction.json`.
- Đủ12 bạn: Mèo, Chó, Thỏ, Vịt, Bò, Lợn, Dê, Gà mái, Voi, Hươu cao cổ, Rùa, Cá vàng. Intro chỉ bóng bí mật/dấu hỏi; outro lần lượt hiện3 nhóm4 bạn để ôn đủ12 loài. Lời đọc/tên nhất quán “Bạn…”, không đổi sang “con”.
- Vẽ nét SVG trong 6 giây (Rùa 7 giây) → dừng bút → đếm đúng 3 giây → đọc tên và hiện PNG màu → quan sát hai đặc điểm. Không đếm trong lúc vẽ, không nói lộ đáp án trong khoảng chờ.
- Đếm chỉ số 176px: 3–2–1, mỗi số 30 frames. Ba tiếng tick gain0.50; BGM hạ0.008 để tiếng đếm rõ. SFX bút/hiện màu/tick/chime tự tổng hợp, không âm bên thứ ba hoặc tiếng kêu giả. Kiểm tra tick trên MP4 mã hóa, không chỉ file nguồn.
- Layout mint/kem: bảng vẽ bên trái, thẻ đoán/đáp án bên phải, chỉ báo ba bước ở dưới. Tên dài xuống dòng có chủ ý; không che tranh hoặc cắt chữ.
- Giấy kim tuyến màu pastel khoảng 2.4 giây khi mở đáp án, chỉ trong vùng tranh/ô đáp án đúng. Video phát sẵn không nhận biết câu trả lời của bé: quiz nói “Đáp án là…”, không khẳng định bé đã trả lời đúng.
- Chỉ Preschool bỏ character và disclaimer theo yêu cầu; không sửa component dùng chung hoặc video Long/Shorts.
- Trúc Ly,49 WAV sinh lại riêng từng câu bằng CUDA; playbackRate0.9. Khoảng nghỉ gốc0.55 giây và holdFrames quan sát/trả lời. Lời mở đầu giải thích rõ: vẽ xong bé có ba giây để đoán.
- Nhạc AI người dùng: Cozy Nook, gain0.035, hạ0.008 lúc đếm với ramp12frames; loop với volumeCurve extend, fade đầu/cuối video. Không dùng MP3 cũ, không tiếng kêu giả hoặc CTA. BGM luôn dưới cap0.5.
- Tên/đặc điểm được dựng trong video. Phụ đề đầy đủ là SRT theo câu, không phải timestamps từ-ngữ giả.
- SRT tính theo độ dài lời thật từ từng WAV, đã hiệu chỉnh tốc độ 0.9 và khoảng chờ, không cộng dồn thời lượng ước lượng.

## Chỉnh sửa và xuất lại

1. Nguồn kịch bản/tên nhóm/quiz là `scripts/prepare-preschool-animals.mjs`; chạy để đồng bộ storyboard/script/narration/animals.json. Đổi nội dung câu thì sinh lại WAV bằng `scripts/generate_tts_sentences.py`; không dùng giọng cũ nếu chữ đổi. Sau đó rebuild timeline. Không chạy prepare khi chỉ sửa timing vì nó khởi tạo lại storyboard.
2. Khi thay ảnh, đọc [hướng dẫn tách nền cục bộ](../../docs/PRESCHOOL_BACKGROUND_REMOVAL.md). Không dùng model gen ảnh hoặc inpainting. Tách nền bằng `scripts/extract-preschool-cutouts.py`, kiểm tra PNG, rồi `scripts/build-preschool-strokes.py`. Script tách dành riêng12 tranh viền kín/nền kem này, không phải bộ tách ảnh tổng quát. Chỉ sửa kịch bản/layout thì tái dùng PNG đã duyệt, không tách lại. SFX tạo lại bằng `scripts/generate-preschool-sfx.py`.
3. Chạy `node scripts/build-preschool-demo.mjs` sau thay timeline/holdFrames; script tạo lại JSON/SRT và thông số manifest, không tạo audio.
4. Chạy `node --test scripts/preschool-timeline.test.mjs` và `npx tsc --noEmit`, render still kiểm tra, rồi `npx remotion render src/index.ts PreschoolAnimalsWhiteboardDemo out/preschool-animals-whiteboard-demo/preschool-animals-whiteboard-demo-guess-3s.mp4 --concurrency=4`. Copy SRT cùng tên cạnh MP4. Kiểm tra bản mã hóa bằng `scripts/qa-preschool-demo.py` và `scripts/qa-preschool-frames.py`. Khi bundle với public-dir tạm, phải copy lại toàn bộ PNG/WAV/SFX mới, không tái dùng staged audio cũ. Tránh ghi đè MP4 đang mở vì Windows có thể khóa file; xuất tên phiên bản mới.
5. Xem/nghe MP4 trước xuất bản. Đây là bản mẫu local: quyền xuất bản của model ảnh/nhạc chưa được xác minh và không tự đăng lên kênh.

Toàn bộ12 JPG đã chuyển vào public/images/preschool-animals-whiteboard-demo, so hash và dọn đúng12 file tmp nguồn; ảnh gốc vẫn bảo toàn. Mọi composition/video Long/Shorts giữ nguyên.
