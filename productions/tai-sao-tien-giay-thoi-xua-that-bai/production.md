# Production — Tại sao tiền giấy thời xưa thất bại?

Phạm vi đang thực hiện: hồ sơ và 260 ảnh minh họa. Không sản xuất audio/video.

## Trạng thái bàn giao

Hồ sơ production, kịch bản, storyboard và prompt: đủ 260 cảnh / 13 chương. Ảnh đã sinh và kiểm tra: **180/260**; còn 80 cảnh. Cập nhật lúc 20:26:54 4/10/26 (giờ Việt Nam).

ImageGen bị chặn tại I181: ImageGen usage_limit_reached (HTTP 429). Dịch vụ báo đặt lại hạn mức lúc 16:27:13 5/10/26 (giờ Việt Nam). Xem manifest.json và image_generation_error.json. Không tự lên lịch chạy tiếp.

Bản sửa được chọn: I038: 038-v2.png; I059: 059-v2.png; I071: 071-v2.png; I103: 103-v2.png; I104: 104-v2.png; I108: 108-v2.png; I111: 111-v2.png; I143: 143-v2.png; I168: 168-v2.png; I172: 172-v2.png; I173: 173-v2.png. Bản đầu giữ trong lịch sử QA và không được gallery dùng.

Ảnh native xấp xỉ 16:9; kích thước thật lưu theo từng cảnh trong storyboard. 1920×1080 chỉ là thông số dự kiến cho lần dựng sau. Không tạo audio, phụ đề, composition hoặc video. Xem gallery.html để duyệt 180 ảnh đã chọn.

## Cấu trúc

| Chương | Nội dung | ID cảnh | Số ảnh |
|---|---|---|---|
| C01 (chương 0) | Một mảnh giấy có thể mua cả một con bò? | I001–I016 | 16 |
| C02 (chương 1) | Tiền giấy thật sự dựa vào thứ gì? | I017–I034 | 18 |
| C03 (chương 2) | Giao Tử nhà Tống: tiền giấy sinh ra vì tiền kim loại quá nặng | I035–I058 | 24 |
| C04 (chương 3) | Vì sao nhà Tống có lúc làm tiền giấy rất thành công? | I059–I078 | 20 |
| C05 (chương 4) | Huizi Nam Tống: chiến tranh bắt đầu bẻ gãy kỷ luật phát hành | I079–I102 | 24 |
| C06 (chương 5) | Nhà Nguyên: thí nghiệm tiền pháp định quy mô đế chế | I103–I130 | 28 |
| C07 (chương 6) | Đại Minh Bảo Sao: khi một đồng tiền đẹp chết vì thiết kế thể chế | I131–I166 | 36 |
| C08 (chương 7) | Tiền giả và chất lượng giấy thực sự quan trọng đến đâu? | I167–I186 | 20 |
| C09 (chương 8) | Vì sao bạc thắng? | I187–I206 | 20 |
| C10 (chương 9) | Continental Dollar: khi tiền giả trở thành vũ khí chiến tranh | I207–I224 | 18 |
| C11 (chương 10) | Assignat Pháp: lịch sử lặp lại ở một lục địa khác | I225–I242 | 18 |
| C12 (chương 11) | Công thức chung của một vụ sụp đổ tiền giấy | I243–I252 | 10 |
| C13 (chương 12) | Vì sao tiền giấy hiện đại không nhất thiết đi vào con đường đó? | I253–I260 | 8 |

## Hồ sơ bàn giao

- source.md: bản nguồn bất biến để so đầu vào.
- script.md / narration.txt / sentences.json: 260 câu với ID, chỉ dữ liệu văn bản.
- storyboard.json: 260 cảnh liên kết câu, prompt đầy đủ, file đích, thời gian null, trạng thái và QA.
- image_prompts.md / prompts.jsonl: bộ prompt đã mở rộng motif và bối cảnh thời kỳ.
- visual_bible.md: quy chuẩn phong cách và nhân vật.
- sources.md: nguồn thực, claim mapping và giới hạn kiểm chứng.
- manifest.json / qa.md: tiến độ và bằng chứng từng asset.

## Chỉ dẫn cho lần dựng sau (chưa thực hiện)

Giữ ảnh AI không chữ. Thêm nhãn năm, tỷ lệ và biểu đồ chính xác bằng đồ họa dựng sau. Bắt buộc LeninDisclaimer/AiDisclaimer với đúng câu `* Hình ảnh chỉ mang tính chất minh họa`, bottom 24, left 40, cỡ 13, italic, trắng mờ. Trà Xanh cao 180, dưới phải; CTA chỉ bong bóng thoại. Kinetic captions ngang bottom 44/maxWidth 1380. Không giả lập timestamps. Khi có yêu cầu audio mới, sinh từng câu bằng generate_tts_sentences.py rồi mới tính thời lượng. Chuyển cảnh đa dạng theo nội dung (dissolve, wipe, slide, push, iris, clock, diagonal, blur, film-roll, fade-color); giữ timeline câu nếu dùng TransitionOverlay. Hiệu ứng môi trường chọn theo bối cảnh, cinematic overlay dùng nhẹ và có lý do. Không triển khai các bước đó ở lượt này.
