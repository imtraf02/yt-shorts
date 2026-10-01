# Tách nền ảnh động vật Preschool — hoàn toàn cục bộ

## Quy tắc bắt buộc

- Dùng ảnh người dùng đã cung cấp. Không gọi Imagegen, Firefly, API sinh ảnh, diffusion, inpainting hoặc model gen ảnh để tách nền/vẽ lại.
- Pipeline hiện tại chỉ dùng Python + Pillow + NumPy + SciPy đã có trong môi trường VieNeu-TTS. Không tải model, không cần mạng hay GPU, không phát sinh phí dịch vụ.
- Giữ JPG nguồn; chỉ tạo PNG RGBA ở thư mục `cutouts/`. Không làm trắng nền rồi gọi đó là ảnh trong suốt. Không thay đổi dáng, nét, màu hoặc đặc điểm của loài vật.
- Chỉ xử lý tài nguyên người dùng có quyền sử dụng. Dấu ở góc nằm ngoài con vật bị loại cùng nền; không xóa dấu bản quyền của bên thứ ba để tái sử dụng trái phép. Nếu dấu đè lên con vật, xin ảnh sạch hoặc dựng mask thủ công từ nguồn hợp lệ; không gen lại vùng đó.

## Phạm vi của script có sẵn

`scripts/extract-preschool-cutouts.py` được hiệu chỉnh riêng cho12 tranh hoạt hình1376×768: nền kem sáng, chủ thể chính ở giữa, viền tối gần kín, dấu góc dưới phải nằm ngoài chủ thể. Đây **không phải** bộ tách nền tổng quát cho ảnh chụp, nền phức tạp hoặc mọi kích thước.

Ảnh nguồn: `public/images/preschool-animals-whiteboard-demo/<animal>.jpg`.

Đầu ra: `public/images/preschool-animals-whiteboard-demo/cutouts/<animal>.png` và `extraction.json`.

12 ID: cat, dog, rabbit, duck, cow, pig, goat, hen, elephant, giraffe, tortoise, goldfish.

## Thuật toán không dùng model

1. Đọc RGB gốc, tìm viền tối bằng `max(R,G,B)<185`; bỏ mảnh rất nhỏ dưới15pixel.
2. Nối khe hở nhỏ bằng binary closing3iterations; lấp vùng được viền bao kín, chọn thành phần chủ thể lớn nhất. Shadow, nền và dấu góc rời chủ thể không thuộc mask.
3. Ước lượng nền theo từng hàng từ160cột ở hai mép, giúp xử lý nền kem có gradient. Không xóa mọi pixel sáng: cách đó sẽ làm mất lông trắng, mắt, ngà, bụng và chân.
4. Với mèo, giữ ria trắng nằm sát thân bằng mask phụ. Điều kiện/y-coordinate này được hiệu chỉnh cho chính ảnh mèo hiện tại, không sao chép sang ảnh khác một cách mù quáng.
5. Khôi phục alpha anti-alias ở vòng2pixel quanh viền bằng màu nền/màu viền gần nhất; chỉ hiệu chỉnh RGB tại pixel bán trong suốt để giảm quầng kem. RGB toàn vùng opaque phải giống nguồn từng byte.
6. Ghi PNG RGBA. Kiểm tra file đọc lại được, alpha vùng nền/dấu góc bằng0, bounding box không chiếm toàn ảnh, RGB opaque không đổi; ghi báo cáo cho từng loài.

## Lệnh chạy từ thư mục repository

```powershell
& '.\VieNeu-TTS\.venv\Scripts\python.exe' scripts/extract-preschool-cutouts.py
# Sau khi mở xem và duyệt PNG, tạo nét SVG từ asset trong suốt:
& '.\VieNeu-TTS\.venv\Scripts\python.exe' scripts/build-preschool-strokes.py
```

Không chạy lại tách nền chỉ vì sửa kịch bản, timing hay layout. Nếu PNG và hash nguồn vẫn đúng thì tái sử dụng. Script ghi lại chính các PNG cutout của mẫu, không đụng JPG hoặc video đã xuất; lưu phiên bản PNG cũ trước khi thử tham số khác.

## QA trước khi đưa vào video

- Mở từng PNG trên nền sáng **và** nền tối/checkerboard, xem thêm ở kích thước thực và lúc thu nhỏ trong composition.
- Kiểm tra đủ tai/sừng, chân/ngón, vòi, ria, đuôi, vây/mai; khoảng trống giữa chân/đuôi phải trong suốt. Không còn oval bóng đất, khung nền kem hay dấu góc.
- Không viền sáng đậm/quầng màu, cạnh răng cưa rõ, lỗ alpha trong thân hoặc phần bị cắt. PNG trắng có thể bị mất bộ phận dù bounding box/alpha check vẫn pass: bắt buộc kiểm tra bằng mắt.
- Đối chiếu `extraction.json`: có đủ12asset, kích thước/bounds hợp lý và `opaquePixelsUnchanged`. Assert góc `y>=620,x>=1150` chỉ phù hợp bộ nguồn hiện tại; không dùng tọa độ này cho ảnh kích thước khác.
- Trong Remotion dùng PNG bằng `staticFile`, định kích thước theo bounding box alpha, giữ tỷ lệ; không dùng JPEG nguồn để lộ nền trở lại.

Nếu mask không đạt: dừng việc nhập asset đó, chỉnh threshold/closing/ROI hoặc mask thủ công cục bộ; không tự chuyển sang model gen ảnh. Ảnh có viền hở, dấu đè lên chủ thể hay nền gần màu con vật cần mask riêng; không hứa script tự xử lý mọi ảnh.

## Bảo toàn và dọn tạm

Copy ảnh từ tmp sang public, so SHA256 và mở kiểm tra trước. Sau đó chỉ xóa đúng file tạm đã xác minh thuộc video; không dọn cả tmp. Giữ JPG gốc, PNG cuối, script và báo cáo. Sau render/QA chỉ xóa preview PNG của đúng production, không xóa asset công khai hoặc MP4 cũ.

## Nhịp whiteboard hiện tại

Vẽ nét chậm → giữ hình nét hoàn chỉnh và đếm **3–2–1 trong90frames ở30fps** → mới hiện tên/ảnh màu → chỉ đặc điểm → ôn theo nhóm4. Không bật đếm khi bút còn vẽ; không đọc tên sớm, không ảnh màu trước đáp án. Confetti dùng component code trong thư viện effects, không cần ảnh gen.
