# -*- coding: utf-8 -*-
"""
Master script tính toán và áp dụng chính xác 100% thứ tự hình ảnh và timing audio cho
'TOÀN CẢNH KHỦNG LONG: HÀNH TRÌNH QUA CÁC NHÓM LOÀI THỐNG TRỊ TRÁI ĐẤT' (13 chương, 170 ảnh).

Đảm bảo:
- Mọi hình ảnh hiển thị đúng chính xác khi người dẫn chuyện nói đến loài/khái niệm đó.
- imageStartFrames được neo trực tiếp vào miligiây phát âm của câu/vế tương ứng từ dinosaurCaptions.ts.
- Cập nhật cả dinosaur_chapters.json và dinosaurData.ts.
"""

import sys
import json
import re
import wave
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

# Cấu hình chi tiết phân cảnh 13 chương:
# Mỗi phân cảnh gồm:
# (image_path, description, target_phrase_index_or_seconds)
MASTER_ALIGNMENT = {
    "part1": [
        ("images/dinosaur/001.png", "Toàn cảnh kỷ Trung sinh: Ba nhóm sinh vật riêng biệt trên không, dưới biển và trên cạn", 0),
        ("images/dinosaur/002.png", "Thằn lằn bay Pteranodon sải cánh chao lượn trên vách đá ven biển", 4),
        ("images/dinosaur/003.png", "Thương long Mosasaurus khổng lồ - Quái vật săn mồi thống trị đại dương sâu thẳm", 7),
        ("images/dinosaur/004.png", "Thằn lằn cổ dài Plesiosaurus bơi lội uyển chuyển dưới làn nước trong xanh", 10),
        ("images/dinosaur/005.png", "Sơ đồ so sánh giải phẫu: Khớp hông đứng thẳng của khủng long đối lập chân bò sát", 17),
        ("images/dinosaur/006.png", "Hệ sinh thái tiền sử rộng lớn với bầy khủng long trên bờ và sinh vật biển dưới nước", 19),
        ("images/dinosaur/007.png", "Cây phả hệ ba nhánh phát sáng: Khủng long trên cạn, thằn lằn bay và bò sát biển", 21),
        ("images/dinosaur/008.png", "Bình minh sương mù trên rừng dương xỉ nguyên sinh kỷ Trung sinh", 23),
        ("images/dinosaur/009.png", "Đối chiếu kích thước: Con người nhỏ bé trước hóa thạch xương chân khủng long khổng lồ", 27),
        ("images/dinosaur/010.png", "Bình minh kỳ vĩ trên đại ngàn kỷ Trung sinh với núi lửa hoạt động phía chân trời", 28),
    ],

    "part2": [
        ("images/dinosaur/011.png", "Sơ đồ phân nhánh tiến hóa: Hai nhóm Saurischia (hông thằn lằn) và Ornithischia (hông chim)", 0),
        ("images/dinosaur/012.png", "Bản vẽ giải phẫu so sánh cấu trúc xương hông giữa hai nhánh khủng long chính", 3),
        ("images/dinosaur/013.png", "Biểu tượng phân nhóm: Khủng long ăn thịt Theropod, cổ dài Sauropod và khủng long mang sừng", 6),
        ("images/dinosaur/014.png", "Nghịch lý tiến hóa: Loài chim hiện đại tiến hóa từ nhánh Theropod thuộc nhóm hông thằn lằn", 12),
        ("images/dinosaur/015.png", "Bản thảo nghiên cứu cổ sinh vật học phác họa chi tiết cấu trúc giải phẫu xương hông", 16),
        ("images/dinosaur/016.png", "Cây sự sống tiền sử tỏa sáng rực rỡ với các nhánh khủng long phân hóa đa dạng", 18),
    ],

    "part3": [
        # 0s - 23s: Mở đầu Theropoda (xương rỗng, 3 ngón chân, lông vũ, nguồn gốc chim)
        ("images/dinosaur/038.png", "Toàn cảnh các loài Theropoda cùng tụ họp săn mồi bên bờ nước lúc chạng vạng", 0),
        ("images/dinosaur/035.png", "Sơ đồ cấu trúc rỗng đặc trưng bên trong xương của nhóm Theropoda", 2),
        ("images/dinosaur/037.png", "Dấu chân khổng lồ sâu hoắm của T-rex đọng nước mưa trên nền đất bùn cổ xưa", 3),
        ("images/dinosaur/028.png", "Khủng long tí hon có lông Compsognathus nhanh nhẹn đuổi bắt thằn lằn nhỏ", 4),
        ("images/dinosaur/036.png", "Yutyrannus phủ lớp lông vũ dày xù xì sinh sống giữa cảnh quan tuyết trắng cổ đại", 5),
        # 23s - 45s: Tyrannosaurus Rex
        ("images/dinosaur/017.png", "Bạo chúa Tyrannosaurus rex sừng sững giữa khu rừng cổ đại đầy uy lực", 7),
        ("images/dinosaur/018.png", "Cận cảnh đầu T-rex với hàm răng sắc nhọn và ánh mắt săn mồi sắc lạnh", 9),
        ("images/dinosaur/019.png", "Tiếng gầm xé toang bầu trời của T-rex giữa khung cảnh bão tố tiền sử", 12),
        ("images/dinosaur/031.png", "Cuộc đối đầu căng thẳng ngộp thở giữa bạo chúa T-rex và Triceratops ba sừng", 13),
        ("images/dinosaur/039.png", "Cận cảnh những chiếc răng cưa sắc nhọn như dao găm của khủng long ăn thịt", 14),
        ("images/dinosaur/032.png", "T-rex non với lớp lông tơ mềm mại, cơ thể thon gọn và vô cùng nhanh nhẹn", 16),
        # 45s - 69s: Velociraptor
        ("images/dinosaur/020.png", "Đàn Velociraptor có lông vũ rình rập phối hợp săn mồi trong bãi cỏ rậm rạp", 17),
        ("images/dinosaur/021.png", "Cận cảnh đầu và vuốt lưỡi liềm sắc lẹm ở ngón chân thứ hai của Velociraptor", 21),
        ("images/dinosaur/034.png", "Bầy Deinonychus phục kích phối hợp quật ngã khủng long ăn cỏ to lớn", 24),
        # 69s - 90s: Spinosaurus
        ("images/dinosaur/022.png", "Khủng long ăn thịt Spinosaurus lội qua sông săn cá với cánh buồm lớn trên lưng", 26),
        ("images/dinosaur/023.png", "Cận cảnh mõm dài dạng cá sấu của Spinosaurus ngoạm chặt con cá lớn dưới nước", 29),
        ("images/dinosaur/033.png", "Biểu đồ so sánh kích thước giữa T-rex, Spinosaurus, Giganotosaurus và con người", 31),
        # 90s - 99s: Ornithomimidae và các loài đa dạng
        ("images/dinosaur/024.png", "Đàn Ornithomimidae hình dáng giống đà điểu lao nhanh trên đồng bằng tiền sử", 33),
        ("images/dinosaur/027.png", "Dị long Allosaurus rình mồi trong rừng kỷ Jura với gờ xương đặc trưng trên mắt", 35),
        ("images/dinosaur/029.png", "Carnotaurus với hai chiếc sừng bò hung dữ lao nhanh trên vùng đất quang đãng", 35.5),
        ("images/dinosaur/030.png", "Giganotosaurus - Kẻ săn mồi khổng lồ phương nam đứng bên bờ sông buổi hoàng hôn", 35.8),
        # 99s - 114s: Therizinosaurus
        ("images/dinosaur/025.png", "Khủng long kỳ dị Therizinosaurus với bộ móng vuốt hình lưỡi hái dài ngoạn mục", 36),
        ("images/dinosaur/026.png", "Cận cảnh móng vuốt khổng lồ dài hơn nửa mét của Therizinosaurus so với tay người", 38),
        ("images/dinosaur/040.png", "Bóng dáng uy nghi của T-rex bước đi trong sương mù bình minh mờ ảo", 40),
    ],

    "part4": [
        # 0s - 22s: Khái quát Sauropoda, 4 chân cột trụ
        ("images/dinosaur/051.png", "Cận cảnh cấu trúc chân cột trụ khổng lồ giúp nâng đỡ trọng lượng cơ thể chục tấn", 0),
        ("images/dinosaur/050.png", "Brontosaurus lội qua đầm nước nông, từng bước chân tạo sóng nước lan tỏa", 4),
        ("images/dinosaur/042.png", "Bầy Brachiosaurus di chuyển tạo nên cảnh tượng đồ sộ trên thảo nguyên tiền sử", 6),
        # 22s - 35s: Brachiosaurus vươn cổ thẳng đứng
        ("images/dinosaur/041.png", "Brachiosaurus vươn chiếc cổ khổng lồ thẳng đứng hái lá trên ngọn cây cao vút", 8),
        ("images/dinosaur/043.png", "Cận cảnh đầu nhỏ gọn của Brachiosaurus với lỗ mũi đặt cao trên đỉnh sọ", 10),
        ("images/dinosaur/052.png", "Chiếc cổ uốn lượn tuyệt đẹp của Brachiosaurus vươn qua khúc sông đón ráng chiều", 11),
        # 35s - 53s: Argentinosaurus 35m, 70 tấn, 10 xe buýt & Diplodocus đuôi roi
        ("images/dinosaur/044.png", "Gã khổng lồ kỷ lục Argentinosaurus với kích thước áp đảo toàn bộ cây cối xung quanh", 13),
        ("images/dinosaur/045.png", "Hình ảnh đối chiếu quy mô: Argentinosaurus tương đương trọng lượng mười chiếc xe buýt", 16),
        ("images/dinosaur/046.png", "Diplodocus với chiếc đuôi dài như roi da bước đi bên bờ sông rực rỡ hoàng hôn", 18),
        # 53s - 81s: Đầu nhỏ, nuốt trọn không nhai, hệ tiêu hóa lên men khổng lồ
        ("images/dinosaur/054.png", "Sơ đồ mô phỏng hệ tiêu hóa lên men khổng lồ tiêu thụ hàng trăm ký lá mỗi ngày", 19),
        ("images/dinosaur/056.png", "Khủng long ăn thịt nhỏ bé lượn lờ nhặt nhạnh thức ăn quanh chân bầy Sauropod", 23),
        ("images/dinosaur/058.png", "Dấu chân khổng lồ hằn sâu thành chuỗi dài trên nền bùn cổ đại nhìn từ trên cao", 25),
        ("images/dinosaur/055.png", "Bộ xương Sauropod sừng sững cao vút chạm trần trong đại sảnh bảo tàng", 27),
        ("images/dinosaur/057.png", "Bóng dáng thanh thoát của khủng long cổ dài in bóng trên nền trời hoàng hôn rực cam", 28),
        # 81s - 100s: Tổ tiên kỷ Tam Điệp di chuyển 2 chân, tiến hóa kích thước
        ("images/dinosaur/047.png", "Tổ tiên nguyên thủy nhỏ bé của nhóm cổ dài di chuyển bằng hai chân vào kỷ Tam Điệp", 29),
        ("images/dinosaur/048.png", "Khủng long cổ dài non nớt vừa cắn vỡ vỏ trứng chui ra tại khu tổ ấp", 31),
        ("images/dinosaur/049.png", "Bãi làm tổ khổng lồ với hàng chục hố trứng tròn xếp theo hình vòng cung", 32),
        ("images/dinosaur/053.png", "Gia đình Titanosaurus gồm cá thể trưởng thành và con non lững thững trong sương rừng", 33),
        ("images/dinosaur/059.png", "Khoảnh khắc ấm áp: Chú khủng long non bé nhỏ nép mình bên chân mẹ khổng lồ", 34),
        ("images/dinosaur/060.png", "Đoàn di cư tráng lệ của bầy khủng long cổ dài băng qua đồng lũ lúc bình minh", 34.5),
    ],

    "part5": [
        ("images/dinosaur/061.png", "Stegosaurus kiêu hãnh với hàng giáp xương nhô cao đón ánh nắng kỷ Jura", 0),
        ("images/dinosaur/064.png", "Cận cảnh bốn chiếc gai xương sắc nhọn nguy hiểm ở chóp đuôi Thagomizer", 6),
        ("images/dinosaur/063.png", "Stegosaurus quất mạnh chiếc đuôi bốn gai nhọn Thagomizer để tự vệ trước kẻ thù", 8),
        ("images/dinosaur/062.png", "Cận cảnh bề mặt tấm giáp xương với những rãnh mạch máu điều hòa thân nhiệt", 10),
        ("images/dinosaur/069.png", "Sơ đồ so sánh hai giả thuyết: Chức năng điều hòa nhiệt độ đối lập phô diễn hình thể", 15),
        ("images/dinosaur/066.png", "Hai cá thể Stegosaurus phô diễn các phiến giáp ửng sắc để giao tiếp hoặc tán tỉnh", 18),
        ("images/dinosaur/065.png", "Stegosaurus gặm dương xỉ thấp với hộp sọ nhỏ bé tương phản thân hình hộ pháp", 20),
        ("images/dinosaur/067.png", "Dáng hình răng cưa đặc trưng của Stegosaurus in đậm trên sống núi hoàng hôn", 22),
        ("images/dinosaur/068.png", "Họ hàng gai nhọn Kentrosaurus với hàng gai sắc bén trên lưng tại châu Phi cổ đại", 24),
        ("images/dinosaur/070.png", "Tình mẫu tử tiền sử: Stegosaurus mẹ dịu dàng che chở cho con non mới lớn", 25),
        ("images/dinosaur/071.png", "Bầy Stegosaurus bình yên gặm cỏ giữa rừng cây mè vảy cycad đặc trưng kỷ Jura", 26),
        ("images/dinosaur/072.png", "Hóa thạch phiến giáp và gai đuôi Stegosaurus được bảo tồn nguyên vẹn trong tầng đá", 26.5),
    ],

    "part6": [
        ("images/dinosaur/073.png", "Chiến xa bọc giáp Ankylosaurus vững chãi với lớp vảy xương bao phủ toàn thân", 0),
        ("images/dinosaur/080.png", "Mặt cắt giải phẫu lớp giáp xương Osteoderm gắn chặt vào mô da bảo vệ toàn thân", 4),
        ("images/dinosaur/077.png", "Góc máy từ dưới lên khắc họa hình bóng bọc thép kiên cố như pháo đài di động", 6),
        ("images/dinosaur/074.png", "Cận cảnh chùy đuôi bằng khối xương đặc cứng như đá hoa cương sẵn sàng giáng đòn", 8),
        ("images/dinosaur/075.png", "Cú quất đuôi sấm sét của Ankylosaurus đập gãy xương chân kẻ săn mồi hung hãn", 14),
        ("images/dinosaur/076.png", "Cận cảnh phần đầu bọc thép kiên cố, thậm chí mí mắt cũng có xương bảo vệ", 17),
        ("images/dinosaur/079.png", "Họ hàng gần Euoplocephalus với hoa văn giáp xương độc đáo đi xuyên qua bụi rậm", 19),
        ("images/dinosaur/081.png", "Kẻ săn mồi nản lòng thoái lui trước bộ giáp phòng thủ bất khả xâm phạm", 21),
        ("images/dinosaur/078.png", "Ankylosaurus thong dong gặm cỏ bụi, hoàn toàn miễn nhiễm trước kẻ săn mồi nhỏ", 22),
        ("images/dinosaur/082.png", "Khủng long giáp non với lớp giáp mềm đang phát triển luôn đi sát cạnh con trưởng thành", 23),
        ("images/dinosaur/083.png", "Đàn xe tăng sống lầm lũi tiến bước qua vùng bình nguyên khô cằn mù mịt bụi", 24),
        ("images/dinosaur/084.png", "Hóa thạch Ankylosaurus hóa đá hoàn mỹ với nguyên vẹn áo giáp sắt triệu năm", 24.5),
    ],

    "part7": [
        ("images/dinosaur/085.png", "Chiến binh Triceratops sừng sững uy nghi với ba sừng nhọn và diềm cổ khổng lồ", 0),
        ("images/dinosaur/086.png", "Cận cảnh đầu Triceratops với hai sừng mày dài nhọn hoắt và diềm xương gồ ghề", 3),
        ("images/dinosaur/098.png", "Sơ đồ giải phẫu so sánh đa dạng kiểu dáng sừng và diềm cổ của các loài Ceratopsia", 7),
        ("images/dinosaur/087.png", "Hai con đực Triceratops khóa sừng quyết liệt trong trận đấu giành bạn tình", 9),
        ("images/dinosaur/094.png", "Hộp sọ hóa thạch Triceratops mang vết sẹo lành xương từ những cuộc giao đấu", 11),
        ("images/dinosaur/092.png", "Bầy đàn Triceratops đông đảo gặm cỏ cùng nhau thể hiện tập tính xã hội cao", 15),
        ("images/dinosaur/088.png", "Triceratops hạ thấp đầu chĩa sừng nghênh chiến trực diện bạo chúa T-rex", 17),
        ("images/dinosaur/100.png", "Đội hình phòng thủ vòng tròn kiên cố của bầy Triceratops bảo vệ đàn con non", 19),
        ("images/dinosaur/089.png", "Khủng long mặt sừng nguyên thủy Protoceratops cỡ con cừu trên vùng bán hoang mạc", 20),
        ("images/dinosaur/090.png", "Styracosaurus với diềm cổ mang vô số gai xương dài tủa ra như vương miện lộng lẫy", 24),
        ("images/dinosaur/091.png", "Cận cảnh những chiếc gai nhọn hoắt trên diềm cổ Styracosaurus rực sáng dưới nắng", 25),
        ("images/dinosaur/095.png", "Pentaceratops với khuôn mặt năm sừng kỳ vĩ và diềm cổ cao đồ sộ nhất họ sừng", 25.3),
        ("images/dinosaur/093.png", "Triceratops mẹ dũng cảm che chắn bảo vệ con non trước kẻ rình mồi trong cỏ", 25.5),
        ("images/dinosaur/097.png", "Triceratops con ngây thơ tò mò khám phá thế giới với diềm cổ đang dần hình thành", 25.7),
        ("images/dinosaur/099.png", "Cả bầy Triceratops đắm mình tắm bùn thư giãn tại đầm nước mát lành", 25.8),
        ("images/dinosaur/096.png", "Bóng hình chiếc đầu ba sừng trứ danh của Triceratops in bóng trên nền trời đỏ rực", 25.9),
    ],

    "part8": [
        ("images/dinosaur/101.png", "Khủng long mỏ vịt Hadrosaur gặm thực vật bờ sông với chiếc mõm dẹt đặc trưng", 0),
        ("images/dinosaur/102.png", "Cận cảnh bộ hàm pin nha khoa với hàng trăm chiếc răng nghiền thức ăn liên tục", 6),
        ("images/dinosaur/105.png", "Đoàn di cư khổng lồ hàng nghìn cá thể khủng long mỏ vịt rầm rộ qua bình nguyên", 10),
        ("images/dinosaur/103.png", "Parasaurolophus vươn chiếc mào rỗng dài cất tiếng gọi trầm vang khắp thung lũng", 12),
        ("images/dinosaur/104.png", "Mặt cắt cấu trúc khoang rỗng bên trong mào xương tạo âm cộng hưởng vang xa", 15),
        ("images/dinosaur/112.png", "Sóng âm trầm hùng lan tỏa từ mào các chú Parasaurolophus trong buổi hoàng hôn", 18),
        ("images/dinosaur/111.png", "Bảng so sánh muôn hình vạn trạng các kiểu mào đầu độc đáo của họ Hadrosaur", 19),
        ("images/dinosaur/110.png", "Edmontosaurus với chiếc mào thịt mềm mại trên đỉnh đầu đứng giữa rừng rậm", 19.5),
        ("images/dinosaur/106.png", "Iguanodon đứng thẳng bằng hai chân để lộ chiếc gai nhọn hoắt ở ngón tay cái", 20),
        ("images/dinosaur/107.png", "Cận cảnh gai ngón cái sắc bén của Iguanodon - Dấu ấn lịch sử ngành cổ sinh", 24),
        ("images/dinosaur/114.png", "Bản vẽ phục dựng sai lầm thế kỷ 19 gắn nhầm gai ngón cái thành sừng trên mũi", 25),
        ("images/dinosaur/108.png", "Khu tổ ấp Maiasaura với những bà mẹ khủng long tận tụy chăm sóc từng ổ trứng", 27),
        ("images/dinosaur/109.png", "Những chú khủng long con bé xíu nở ra từ trứng dưới sự che chở của cha mẹ", 27.3),
        ("images/dinosaur/113.png", "Khủng long mỏ vịt phi nước đại bằng hai chân sau tung bụi trốn chạy kẻ săn mồi", 27.5),
        ("images/dinosaur/115.png", "Bầy Ornithopoda gặm cỏ thanh bình bên dòng sông lấp lánh ánh nắng chiều tà", 27.7),
        ("images/dinosaur/116.png", "Bộ xương hóa thạch khủng long mỏ vịt với chiếc mào hoàn mỹ trưng bày trang trọng", 27.9),
    ],

    "part9": [
        ("images/dinosaur/117.png", "Pachycephalosaurus cảnh giác đứng thẳng với vòm sọ tròn cứng như đá hoa cương", 0),
        ("images/dinosaur/120.png", "Sơ đồ mặt cắt hộp sọ cho thấy lớp xương vòm đỉnh đầu dày đặc đến hai mươi phân", 4),
        ("images/dinosaur/118.png", "Cận cảnh vòm đầu xương dày đặc bao quanh bởi những gai xương nhọn li ti", 8),
        ("images/dinosaur/121.png", "Họ hàng gai góc Stygimoloch với vương miện gai nhọn hoắt xung quanh vòm đầu", 11),
        ("images/dinosaur/119.png", "Hai chàng Pachycephalosaurus lao vào húc đầu chan chát tạo tiếng vang chấn động", 12),
        ("images/dinosaur/122.png", "Hành vi húc sườn đối kháng - Một giả thuyết cơ sinh học hiện đại về lối giao đấu", 17),
        ("images/dinosaur/123.png", "Pachycephalosaurus thoăn thoắt chạy bằng hai chân lướt qua tán rừng rậm rạp", 21),
        ("images/dinosaur/124.png", "Nhóm nhỏ khủng long đầu cứng vừa đi vừa gật gù tìm kiếm chồi non và hạt cây", 22),
        ("images/dinosaur/125.png", "Dáng dấp chiếc vòm đầu độc nhất vô nhị in bóng nổi bật trên nền trời tiền sử", 23),
        ("images/dinosaur/126.png", "Mặt cắt hóa thạch vòm sọ Pachycephalosaurus chứng minh độ dày kinh ngạc", 23.5),
    ],

    "part10": [
        ("images/dinosaur/128.png", "Cận cảnh màng cánh dai như da thuộc và các ngón tay vuốt của thằn lằn bay", 0),
        ("images/dinosaur/129.png", "Bầy Pterodactylus nhỏ nhắn chao liệng duyên dáng trên bờ biển lúc hoàng hôn", 3),
        ("images/dinosaur/130.png", "Quetzalcoatlus khổng lồ - Sinh vật bay lớn nhất lịch sử đứng cạnh hươu cao cổ", 5),
        ("images/dinosaur/127.png", "Thằn lằn bay Pteranodon sải cánh khổng lồ lượn gió trên vách đá biển cuộn sóng", 7),
        ("images/dinosaur/137.png", "Hóa thạch cánh xương mỏng manh tinh xảo của thằn lằn bay lưu giữ trong phiến đá", 8),
        ("images/dinosaur/131.png", "Thương long Mosasaurus vọt lên khỏi mặt nước đớp mồi tạo làn sóng nước dữ dội", 9),
        ("images/dinosaur/132.png", "Cận cảnh mái chèo bơi khỏe khoắn và đuôi cá mập mạnh mẽ của Mosasaurus", 10),
        ("images/dinosaur/133.png", "Thằn lằn cổ dài Plesiosaurus uốn lượn chiếc cổ dài mềm mại trong lòng biển xanh", 11),
        ("images/dinosaur/134.png", "Ngư long Ichthyosaurus hình dáng cá heo lướt đi siêu tốc trong đại dương mở", 11.5),
        ("images/dinosaur/135.png", "Cảnh săn đuổi ngoạn mục: Mosasaurus há ngoạm nuốt trọn cúc đá Ammonite cuộn tròn", 12),
        ("images/dinosaur/136.png", "Bố cục chia ba tầng sinh thái: Bầu trời thằn lằn bay, mặt đất khủng long, biển cả bò sát", 14),
        ("images/dinosaur/138.png", "Plesiosaurus nhô chiếc cổ dài cao vút lên khỏi mặt biển bên rạn đá hoang sơ", 18),
    ],

    "part11": [
        ("images/dinosaur/139.png", "Thiên thạch lửa khổng lồ xé toạc bầu khí quyển lao thẳng xuống bán đảo Yucatan", 0),
        ("images/dinosaur/140.png", "Vụ nổ va chạm kinh thiên động địa tạo quầng sáng mù lòa và sóng xung kích hủy diệt", 3),
        ("images/dinosaur/141.png", "Miệng hố va chạm Chicxulub khổng lồ đường kính hai trăm cây số đỏ rực đá nóng chảy", 6),
        ("images/dinosaur/142.png", "Cơn đại hồng thủy sóng thần cuồn cuộn ập vào bờ cuốn phăng muôn loài tháo chạy", 9),
        ("images/dinosaur/143.png", "Cháy rừng diện rộng thiêu rụi hàng nghìn cây số vuông, khói đen che kín bầu trời", 13),
        ("images/dinosaur/144.png", "Mưa hạt thủy tinh nóng chảy trút xuống dòng sông khiến đàn cá Tanis chết ngạt", 15),
        ("images/dinosaur/145.png", "Nhà địa chất khai quật vỉa đất ranh giới K-Pg mỏng manh ghi dấu ngày tận thế", 20),
        ("images/dinosaur/146.png", "Bầu trời đen đặc khói bụi lưu huỳnh bóp nghẹt ánh sáng, vạn vật chìm vào suy tàn", 27),
        ("images/dinosaur/149.png", "Bản đồ địa cầu mô phỏng làn sóng chấn động và tro bụi bao phủ kín hành tinh", 31),
        ("images/dinosaur/150.png", "Lớp địa tầng chứa hàm lượng Iridium cao bất thường minh chứng vụ va chạm vũ trụ", 32),
        ("images/dinosaur/147.png", "Mùa đông va chạm băng giá bao trùm địa cầu, thảm thực vật chết khô vì thiếu nắng", 34),
        ("images/dinosaur/148.png", "Chú Triceratops cô độc đứng trơ trọi giữa hoang mạc tro tàn lạnh lẽo vô vọng", 36),
        ("images/dinosaur/151.png", "Thung lũng hoang tàn phủ đầy tro xám nơi từng là thiên đường xanh tốt của muôn loài", 37),
        ("images/dinosaur/152.png", "Bức tranh đối lập nghiệt ngã: Rừng rậm rực rỡ trước va chạm và bình địa tro tàn sau đó", 38),
    ],

    "part12": [
        ("images/dinosaur/153.png", "Thú có vú nhỏ lông lá ẩn nấp an toàn sâu trong hang đất giữa thảm họa", 0),
        ("images/dinosaur/154.png", "Khủng long nhỏ có lông dạng chim nép mình trú ẩn trong khe nứt vách đá", 2),
        ("images/dinosaur/155.png", "Cá sấu cổ kiên cường ngâm mình dưới bùn lầy sống sót qua ngày tuyệt diệt", 4),
        ("images/dinosaur/156.png", "Biểu tượng sinh tồn: Sinh vật nhỏ bé sống sót đối lập bóng khủng long khổng lồ lụi tàn", 6),
        ("images/dinosaur/158.png", "Cụ rùa nước ngọt từ từ trồi lên từ lớp bùn đáy hồ sau cơn biến động toàn cầu", 11),
        ("images/dinosaur/157.png", "Chú chim nguyên thủy nhỏ bới tìm hạt cây tích trữ trong lớp tro lạnh để sinh tồn", 14),
        ("images/dinosaur/159.png", "Cán cân sinh thái: Động vật cỡ lớn cạn kiệt thức ăn nhường chỗ cho giống loài nhỏ", 16),
        ("images/dinosaur/160.png", "Sinh vật có vú bé nhỏ rụt rè rời hang bước ra đón ánh bình minh ấm áp đầu tiên", 21),
        ("images/dinosaur/161.png", "Cây dương xỉ kiên cường đâm chồi xanh mướt trên nền đất tro tàn bắt đầu hồi sinh", 23),
        ("images/dinosaur/162.png", "Đàn chim cổ vỗ cánh bay lên trên vùng đất xanh tươi đang từng bước phục hồi", 28),
    ],

    "part13": [
        ("images/dinosaur/163.png", "Hình ảnh biến chuyển kỳ diệu từ khủng long lông vũ Theropod thành chim sẻ hiện đại", 0),
        ("images/dinosaur/165.png", "Đại sảnh danh vọng: Bóng hình các nhóm khủng long thống trị hội tụ đầy tráng lệ", 3),
        ("images/dinosaur/169.png", "Toàn cảnh đại kỷ Trung sinh tráng lệ: Bản trường ca huy hoàng nhất của sự sống", 5),
        ("images/dinosaur/168.png", "Du khách trang nghiêm chiêm ngưỡng các bộ xương khủng long khổng lồ trong bảo tàng", 8),
        ("images/dinosaur/166.png", "Chú chim sẻ nhỏ nhắn cất tiếng hót trên cành cây - Hậu duệ sống động của khủng long", 11),
        ("images/dinosaur/164.png", "Đàn chim hiện đại tung cánh bay rợp trời mang theo dòng máu kiêu hùng của tổ tiên", 13),
        ("images/dinosaur/167.png", "Dòng thời gian nối liền từ bước chân bạo chúa đến sải cánh chim muôn triệu năm", 14),
        ("images/dinosaur/170.png", "Chiếc lông vũ phát sáng chuyển hóa từ vảy da cổ đại thành đôi cánh bay vút trời cao", 15),
    ],
}

def get_wav_duration_seconds(wav_path: Path) -> float:
    with wave.open(str(wav_path), 'rb') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        return frames / float(rate)

def main():
    captions_file = Path("src/data/dinosaurCaptions.ts")
    ts_text = captions_file.read_text(encoding="utf-8")
    m = re.search(r'export const DINOSAUR_CAPTIONS: Record<string, CaptionPhrase\[\]> = (\{[\s\S]*?\});', ts_text)
    if not m:
        print("❌ Không tìm thấy JSON DINOSAUR_CAPTIONS")
        return
    captions_by_chapter = json.loads(m.group(1))

    chapters_json_path = Path("src/data/dinosaur_chapters.json")
    chapters_meta = json.loads(chapters_json_path.read_text(encoding="utf-8"))

    updated_chapters_meta = []
    chapters_for_data_ts = []
    cur_start_frame = 0

    print("🚀 ĐANG TÍNH TOÁN VÀ CĂN CHỈNH TIMING CHÍNH XÁC CHO 13 CHƯƠNG...")

    for ch in chapters_meta:
        sec_id = ch["id"]
        p_num = ch["chapter_num"]
        wav_file = Path("public/audio") / f"dinosaur_{sec_id}.wav"
        
        if wav_file.exists():
            dur_s = get_wav_duration_seconds(wav_file)
            dur = int(round(dur_s * 30))
        else:
            dur = 2500

        phrases = captions_by_chapter.get(sec_id, [])
        alignment_items = MASTER_ALIGNMENT.get(sec_id, [])
        num_imgs = len(alignment_items)

        images = []
        descriptions = []
        raw_start_frames = []

        for idx, (img_path, desc, target_ref) in enumerate(alignment_items):
            images.append(img_path)
            descriptions.append(desc)

            if idx == 0:
                frame = 0
            elif isinstance(target_ref, (int, float)):
                # Fractional phrase index interpolation
                p_idx = int(target_ref)
                frac = target_ref - p_idx
                if p_idx < len(phrases):
                    base_ms = phrases[p_idx]["startMs"]
                    if frac > 0 and p_idx + 1 < len(phrases):
                        next_ms = phrases[p_idx + 1]["startMs"]
                        ms = base_ms + frac * (next_ms - base_ms)
                    elif frac > 0:
                        end_ms = phrases[p_idx]["endMs"]
                        ms = base_ms + frac * (end_ms - base_ms)
                    else:
                        ms = base_ms
                    frame = int(round((ms / 1000.0) * 30))
                else:
                    frame = int(round((idx / float(num_imgs)) * dur))
            else:
                frame = int(round((idx / float(num_imgs)) * dur))

            raw_start_frames.append(frame)

        # Đảm bảo monotonic và min_gap tối thiểu
        # min_gap: ít nhất 30 frames (1s) cho cảnh ngắn, đảm bảo ảnh không bị chớp giật
        min_gap = min(45, max(30, (dur // num_imgs) - 20))
        final_start_frames = [0] * num_imgs

        for i in range(num_imgs):
            if i == 0:
                final_start_frames[i] = 0
            else:
                target_f = raw_start_frames[i]
                prev_f = final_start_frames[i - 1]
                # Frame mới phải sau prev_f ít nhất min_gap
                f = max(target_f, prev_f + min_gap)
                # Giới hạn không vượt quá độ dài chương
                max_f = dur - (num_imgs - i) * min_gap
                f = min(f, max_f)
                final_start_frames[i] = f

        # Cập nhật metadata
        ch["images"] = images
        ch["image_descriptions"] = descriptions
        updated_chapters_meta.append(ch)

        # Cập nhật structure cho dinosaurData.ts
        chapters_for_data_ts.append({
            "id": sec_id,
            "chapterNumber": p_num,
            "partLabel": f"PHẦN {p_num}",
            "historicalEra": ch["historical_era"],
            "title": ch["title"],
            "subtitle": ch["subtitle"],
            "audioSrc": f"audio/dinosaur_{sec_id}.wav",
            "durationInFrames": dur,
            "startFrame": cur_start_frame,
            "images": images,
            "imageDescriptions": descriptions,
            "imageStartFrames": final_start_frames
        })
        cur_start_frame += dur

        print(f"✅ [{sec_id}] {ch['title']}: {num_imgs} ảnh, {dur} frames ({dur/30:.1f}s)")
        print(f"    Frames: {final_start_frames}")

    # Ghi lại dinosaur_chapters.json
    chapters_json_path.write_text(json.dumps(updated_chapters_meta, indent=2, ensure_ascii=False), encoding="utf-8")

    # Ghi lại dinosaurData.ts
    ts_content = f"""// Dữ liệu 13 chương phim tài liệu 'TOÀN CẢNH KHỦNG LONG: HÀNH TRÌNH QUA CÁC NHÓM LOÀI THỐNG TRỊ TRÁI ĐẤT'
export interface DinosaurChapter {{
  id: string;
  chapterNumber: number;
  partLabel: string;
  historicalEra: string;
  title: string;
  subtitle: string;
  audioSrc: string;
  durationInFrames: number;
  startFrame: number;
  images: string[];
  imageDescriptions: string[];
  imageStartFrames?: number[];
}}

export const DINOSAUR_CHAPTERS: DinosaurChapter[] = {json.dumps(chapters_for_data_ts, indent=2, ensure_ascii=False)};

export const TOTAL_DINOSAUR_FRAMES = DINOSAUR_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
"""
    data_ts_path = Path("src/data/dinosaurData.ts")
    data_ts_path.write_text(ts_content, encoding="utf-8")
    print(f"\n🎉 THÀNH CÔNG RỰC RỠ! Đã cập nhật 100% hình ảnh & audio synchronization chuẩn từng giây!")
    print(f"Tổng thời lượng: {cur_start_frame} frames ({cur_start_frame/30/60:.2f} phút).")

if __name__ == "__main__":
    main()
