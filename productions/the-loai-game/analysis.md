# Phân tích và biên tập

Luận điểm mạnh nhất là phân loại bằng vòng lặp hành động và phần thưởng, sau đó cho thấy nhiều trục chồng lên nhau. Bản gốc có 340 câu, 11 chương, bao quát các họ phổ biến; tiêu đề “tất cả” dễ tạo kỳ vọng về danh sách đầy đủ, nên tên production đổi thành “GAME: Vì sao thể loại ngày càng khó phân loại?”.

## Những điểm đã chỉnh

- Giữ S001–S340 và trật tự 11 chương. Bỏ công thức “là nhánh nơi người chơi chủ yếu” và rút các câu ví dụ khỏi kết luận lặp “cảm giác rất riêng”. Bản gốc giữ nguyên trong concept-original.md; từng thay đổi có trong edits.json.
- Arcade vừa có nghĩa bối cảnh máy/phiên chơi vừa có nghĩa phong cách; không phải gốc duy nhất của lịch sử game. Cây là ẩn dụ quan hệ, không khẳng định tiến hóa tuyến tính hoặc game phức tạp tốt hơn.
- Strategy vẫn có thao tác nhanh; 4X có thể theo lượt hoặc thời gian thực; MOBA không bắt buộc mọi game có ba đường. Góc nhìn FPS/TPS được tách khỏi họ cơ chế shooter.
- JRPG/WRPG là nhãn truyền thống rộng, không đóng khung quốc tịch hoặc toàn bộ thiết kế. Tactical RPG xuất hiện hai chương được ghi rõ là giao điểm, không tính hai thể loại hoàn toàn khác nhau.
- MMORPG có nhiều khu vực/instance; không khẳng định hàng nghìn người đồng thời trên cùng một màn hình. Soulslike không chỉ là “khó”; roguelite không đồng nghĩa dễ.
- Berlin Interpretation có ảnh hưởng nhưng không có thẩm quyền chuẩn hóa toàn bộ thị trường. Nhãn Hades do nhà phát triển dùng cũng thể hiện ranh giới mềm.
- Open world/sandbox: cấu trúc và tự do. Live service: vận hành. Mobile: nền tảng. Gacha: cơ chế thu thập/kiếm tiền. Cozy: cảm giác. Indie: cách tổ chức/phát triển, không thể loại lối chơi. Chương 9 viết lại cho các nhóm này không bị gọi đồng loạt là nhánh cơ chế.
- Marathon chỉ dùng như ví dụ extraction, không nói thời điểm ra mắt; FAQ chính thức có thông tin trạng thái cần đối chiếu lại.

## Kế hoạch ảnh đã chốt

Người dùng đã bỏ giới hạn 200 ảnh. Dùng **340 ảnh chính**, một câu/một ảnh, ID I001–I340. Bản nháp ghép 173 cảnh trước khi nhận điều chỉnh chưa sinh ảnh và đã được thay hoàn toàn. Các biến thể QA bị loại lưu riêng, không tính vào 340 ảnh giao.

Mỗi thể loại thường có ba nhịp: lối chơi → đặc điểm → ví dụ. Để tránh ba ảnh gần như giống nhau, ảnh định nghĩa dùng chủ thể và hành động, ảnh đặc điểm dùng vòng lặp/quan hệ, ảnh ví dụ dùng các thế giới hư cấu cùng cơ chế. Tên game xuất hiện trong lời dẫn và nhãn dự kiến; tranh không được mô tả như screenshot thật. Khi cần chính xác về HUD, số liệu hoặc game cụ thể, khâu dựng sau phải bổ sung đồ họa/tài nguyên đã kiểm chứng.

## Nhịp và thời lượng

Bản sửa khoảng 6.443 đơn vị cách trắng. Giả định 220–270 đơn vị/phút và nghỉ 0,5 giây giữa 340 câu cho khoảng **26,7–32,1 phút**; đây chỉ là ước lượng, không xác nhận 38–45 phút trong bản gửi. Chưa tạo audio, timestamp để null. Khi làm audio, sinh từng câu từ narration.txt hoặc sentences.json, không gộp cả chương.

## Phát âm dự kiến

RPG: đọc từng chữ R–P–G hoặc “nhập vai” tùy nhịp; RTS: “chiến thuật thời gian thực”; FPS: “bắn súng góc nhìn thứ nhất”; MOBA: “mô-ba”; 4X: “bốn ích”; roguelike/roguelite phân biệt đuôi like/lite. Tên game giữ tên chính thức, cần nghe mẫu nếu có bước TTS; chưa khẳng định bộ máy đã đọc đúng.

## Phạm vi và giới hạn

Không tạo TTS, nhạc, phụ đề, composition, MP4 hoặc xuất bản. Mô tả ranh giới là diễn giải hữu ích, không tuyên bố đã xác minh toàn bộ 340 câu. Nguồn, trạng thái đọc và giới hạn ghi ở sources.md. Không dùng nguồn thứ cấp để suy ra chi tiết kỹ thuật mới.
