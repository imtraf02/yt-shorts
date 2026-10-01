# -*- coding: utf-8 -*-
"""
Script chuẩn bị dữ liệu cho phim tài liệu:
'NHỮNG KHOẢNG TRỐNG LỊCH SỬ: KHI CẢ MỘT NỀN VĂN MINH BIẾN MẤT KHỎI TRANG SỬ'
Bao gồm 7 phần, 179 hình ảnh 16x9 và mô tả phân cảnh tiếng Việt.
"""

import sys
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# 179 mô tả hình ảnh tiếng Việt tương ứng 179 prompts ảnh
IMAGE_DESCRIPTIONS = {
    # PHẦN 1 — MỞ BÀI (1..12)
    1: "Bức tranh ghép bản đồ thế giới cổ xưa bị khuyết nhiều mảnh ghép rực sáng",
    2: "Trang sách giáo khoa lịch sử bị xé rách ở giữa hé lộ khoảng trống bí ẩn",
    3: "Con đường thời gian trải dài từ các tầng địa tầng chìm dần vào làn sương mờ",
    4: "Hố khai quật khảo cổ với lớp trầm tích rực sáng – ẩn số chứng cứ chưa tìm thấy",
    5: "Nhà khảo cổ tỉ mỉ quét cát trên mảnh gốm vỡ dưới ánh đèn ấm áp",
    6: "Giá sách tài liệu cổ xưa với nhiều ô trống bụi bặm – những trang sử thất truyền",
    7: "Bốn cánh cổng thời gian mở ra bốn nền văn minh cổ đại huyền bí",
    8: "Bản đồ thế giới với bốn điểm sáng kết nối xuyên suốt bốn nghìn năm lịch sử",
    9: "Cận cảnh con dấu đất sét cổ với những ký tự bí ẩn chưa từng được giải mã",
    10: "Toàn cảnh phế tích cổ đại tráng lệ dần hiện ra trong làn sương sớm tinh khôi",
    11: "Bàn tay vươn ra ghép mảnh đá còn thiếu vào bức tranh khảm lịch sử vĩ đại",
    12: "Kính lúp soi rọi vào vùng đất trắng chưa hoàn chỉnh trên tấm bản đồ cổ",

    # PHẦN 2 — KHOẢNG TRỐNG THỨ NHẤT: SỤP ĐỔ THỜI ĐẠI ĐỒ ĐỒNG (13..50)
    13: "Hải cảng Địa Trung Hải phồn thịnh Thời Đồ Đồng với thuyền bè tấp nập giao thương",
    14: "Những thỏi đồng và thiếc hình da bò chất đống trên sàn tàu buôn cổ đại",
    15: "Cung đình pharaoh Ai Cập nguy nga tiếp đón sứ đoàn ngoại giao từ khắp nơi",
    16: "Pháo đài hoàng gia Hittite kiên cố với tường thành đá và cổng sư tử uy nghiêm",
    17: "Hoàng thành Mycenae trên đồi cao với tường đá khổng lồ và chiến binh mũ nanh lợn rừng",
    18: "Thư lại Babylon cẩn trọng khắc thư từ ngoại giao lên phiến đất sét tươi",
    19: "Mạng lưới tuyến đường thương mại kết nối khắp Địa Trung Hải thời Đồ Đồng",
    20: "Cảng biển Canaan nhộn nhịp thương buôn, bình gốm và cánh buồm rực rỡ hoàng hôn",
    21: "Đoàn rước hôn lễ hoàng gia xuyên biên giới – chính sách ngoại giao bằng hôn nhân",
    22: "Kho lưu trữ Mycenae với hàng nghìn phiến đất sét ghi chép dầu ăn, len và đồng",
    23: "Mạng lưới thương mại trên bản đồ chập chờn rồi tắt dần từng mắt xích huyết mạch",
    24: "Đất đai nứt nẻ khô hạn dưới ánh mặt trời thiêu đốt – khởi đầu đại hạn hán",
    25: "Mẫu lõi trầm tích phòng thí nghiệm hé lộ dải đất khô hạn kỷ lục thời Đồ Đồng",
    26: "Nông dân ngóng nhìn trời cao khô khốc bên những kho thóc cạn kiệt",
    27: "Động đất dữ dội làm rạn nứt thành trì cổ đại, gạch đá sụp đổ tan tành",
    28: "Các đợt dư chấn liên hoàn quét qua bản đồ làm nứt vỡ hàng loạt kinh thành",
    29: "Nạn đói tràn ngập đường phố cổ đại, đám đông tụ tập trước cổng cung điện xin ăn",
    30: "Kho dự trữ hoàng gia chỉ còn lại những vò rỗng phủ đầy bụi bặm",
    31: "Đoàn người di cư và tị nạn bồng bế nhau đi bộ dọc theo đường bờ biển",
    32: "Những chiến thuyền gỗ vượt sóng biển động – làn sóng người tị nạn và cướp phá",
    33: "Binh sĩ Ai Cập canh gác cửa sông Nile căng thẳng ngóng chờ hạm đội lạ cập bờ",
    34: "Trận thủy chiến khốc liệt tại châu thổ sông Nile được khắc trên phù điêu cổ",
    35: "Pharaoh trên chiến xa dẫn đầu đội quân đẩy lùi các nhóm xâm lấn từ biển khơi",
    36: "Chiến binh đội mũ lông chim và mang khiên tròn tràn lên bờ cát cùng gia quyến",
    37: "Một thành bang Levant rực cháy trong đêm tối, khói lửa bao trùm cả bến cảng",
    38: "Cung điện Mycenae sụp đổ trong ngọn lửa đỏ rực thiêu rụi trần nhà tráng lệ",
    39: "Tàn tích hoang tàn của thủ đô Hittite trên cao nguyên đá lộng gió sau sụp đổ",
    40: "Lò nung đất sét bị bỏ quên giữa chừng – phiến đất sét chưa bao giờ được lấy ra",
    41: "Những tấm đất sét dang dở vương vãi trên nền cung điện cùng chiếc bút khắc rơi lại",
    42: "Hiệu ứng domino lịch sử: các đô thành cổ lần lượt sụp đổ liên hoàn khắp bản đồ",
    43: "Kho bạc pharaoh kiệt quệ sau những trận chiến giữ nước hao người tốn của",
    44: "Đồi Mycenae hoang vắng, đàn dê gặm cỏ giữa những cột đá đổ nát – Thời kỳ Đen tối",
    45: "Người hát rong kể chuyện sử thi bên đống lửa thay thế cho những ghi chép bằng chữ viết",
    46: "Phòng thí nghiệm phân tích ADN cổ đại xác nhận dấu vết di cư từ vùng Aegean",
    47: "Đô thị Philistine ven biển Canaan với phong cách gốm sứ mới đặc trưng",
    48: "Cán cân biểu tượng: hạn hán, động đất và chiến tranh cùng bẻ gãy nhịp cầu xã hội",
    49: "Bộ bánh răng thương mại cổ đại bị kẹt cứng làm đình trệ toàn bộ guồng máy xã hội",
    50: "Toàn cảnh Địa Trung Hải hoang vắng sau cú sụp đổ đồng loạt thời Đồ Đồng",

    # PHẦN 3 — KHOẢNG TRỐNG THỨ HAI: CHỮ INDUS CHƯA AI ĐỌC ĐƯỢC (51..86)
    51: "Toàn cảnh Mohenjo-daro nhìn từ trên cao: quy hoạch bàn cờ trật tự bên dòng Indus",
    52: "Đường phố Harappa với nhà xây gạch nung đồng đều và hệ thống cống ngầm thông minh",
    53: "Cận cảnh cống thoát nước ngầm có nắp đậy bằng đá – đỉnh cao kỹ nghệ 4.000 năm trước",
    54: "Đại Bể tắm Mohenjo-daro xây bằng gạch kín nước – trung tâm nghi lễ tẩy trần cổ xưa",
    55: "Chợ Harappa sầm uất với các quả cân đá lập phương chuẩn xác cân đo hàng hóa",
    56: "Nghệ nhân mài giũa những hạt đá mã não cam rực rỡ trong xưởng thủ công mỹ nghệ",
    57: "Cận cảnh con dấu đá xà phòng khắc hình thần thú kỳ lân và dãy ký tự bí ẩn",
    58: "Bàn tay ấn con dấu chạm khắc vào đất sét tươi để đóng dấu niêm phong thương mại",
    59: "Thuyền buồm chở đầy hàng thủ công xuôi dòng sông Indus hướng ra biển lớn",
    60: "Bến cảng xây gạch kiên cố tại Lothal – trung tâm đóng tàu và bốc dỡ hàng hải",
    61: "Bản đồ tuyến hải trình kết nối nền văn minh Indus với các vương quốc Lưỡng Hà",
    62: "Thương nhân Lưỡng Hà và thương nhân Indus gặp gỡ trao đổi vật phẩm quý hiếm",
    63: "Hàng trăm con dấu Indus với các hình thú và chuỗi ký tự được trưng bày khoa học",
    64: "Cận cảnh hình khắc trâu rừng, voi và hổ dũng mãnh trên từng con dấu đá",
    65: "Dòng chữ khắc dài nhất từng được tìm thấy gồm hơn ba mươi ký hiệu Indus",
    66: "Những ký hiệu trên con dấu trôi lơ lửng như những mảnh ghép chưa tìm ra quy luật",
    67: "Bàn làm việc của nhà ngôn ngữ học ngổn ngang bảng thống kê ký tự thâu đêm",
    68: "Phiến đá Rosetta bên cạnh chiếc bệ trống – khoảng trống thiếu chìa khóa giải mã Indus",
    69: "So sánh văn bản tượng hình dài của Ai Cập với chuỗi ký tự vỏn vẹn năm ký hiệu Indus",
    70: "Giáo sư phân tích tần suất xuất hiện ký tự trên bảng số liệu tìm kiếm ngữ hệ gốc",
    71: "Màn hình máy tính số hóa và phân tích thuật toán giải mã các con dấu cổ",
    72: "Bàn làm việc giải mã bằng máy điện toán thời Chiến tranh Lạnh bất lực trước chữ Indus",
    73: "Các học giả tranh luận nảy lửa liệu chữ Indus là chữ viết ngôn ngữ hay phù hiệu thương hiệu",
    74: "Hàng ngàn mảnh gốm có vết khắc ký hiệu được số hóa và phân loại tại phòng thí nghiệm",
    75: "Giải thưởng một triệu USD công bố cho bất kỳ ai giải mã thành công văn tự Indus",
    76: "Sông Ghaggar-Hakra xưa kia dạt dào phù sa và lòng sông khô cằn trơ đáy ngày nay",
    77: "Dòng sông Indus đổi hướng dòng chảy khiến các đô thị cổ trơ trọi giữa hoang mạc",
    78: "Các gia đình nông dân dần dọn đồ đạc rời khỏi thành phố tìm nguồn nước mới",
    79: "Phố gạch nung một thời tấp nập nay cát bụi phủ mờ, cửa nhà khép kín hoang tàn",
    80: "Làng mạc nông thôn nhỏ hơn hình thành khi cư dân Indus phân tán khắp nơi",
    81: "Biểu tượng đôi môi khép chặt ghép từ những con dấu – tiếng nói đã im lặng nghìn năm",
    82: "Đường phố phế tích lúc hoàng hôn buông bóng dài – âm vang một thời đại biến mất",
    83: "Mảnh bình gốm có nét vẽ ký hiệu Indus hé lộ dưới nhát cọ của nhà khảo cổ",
    84: "Mô hình xe bò đồ chơi bằng đất nung có bánh lăn – dấu ấn tuổi thơ thời Harappa",
    85: "Chân dung người phụ nữ Indus đeo chuỗi hạt đá mã não tinh xảo",
    86: "Toàn cảnh phế tích Mohenjo-daro dưới trời xanh lộng gió – đài tưởng niệm im lìm",

    # PHẦN 4 — KHOẢNG TRỐNG THỨ BA: CAHOKIA (87..115)
    87: "Toàn cảnh thành phố Cahokia rực rỡ với gò đất trung tâm vĩ đại bên bờ sông lớn",
    88: "Đại gò đất Monks Mound bậc thang khổng lồ với ngôi đền gỗ trên đỉnh lúc bình minh",
    89: "Đại quảng trường Cahokia chật kín người tham gia nghi lễ với cờ phướn rực rỡ",
    90: "Hàng ngàn dân phu vác giỏ đất đắp gò – kỳ tích kiến tạo cảnh quan đất nung",
    91: "Trò chơi Chunkey sôi động: lăn đĩa đá tròn và ném lao chuẩn xác giữa tiếng reo hò",
    92: "Vòng tròn cọc gỗ Woodhenge quan sát thiên văn và xác định chu kỳ mùa màng theo Mặt Trời",
    93: "Thuyền độc mộc chở đầy vỏ sò, khoáng sản và đồng cập bến sông giao thương",
    94: "Chợ phiên Cahokia mở ra những tấm đồng gõ mỏng và đá lửa từ vùng Ngũ Đại Hồ",
    95: "Cảnh sinh hoạt gia đình Mississippian: nặn bình gốm và giã ngô chuẩn bị bữa ăn",
    96: "Cánh đồng ngô bạt ngàn trải dài quanh thành phố – trụ cột lương thực của Cahokia",
    97: "Thủ lĩnh Cahokia khoác áo lông chim rực rỡ đứng trên đỉnh gò đất cử hành nghi lễ",
    98: "Tường thành lũy bằng gỗ bao quanh khu trung tâm bảo vệ giới cai trị",
    99: "Bản đồ phối cảnh các cụm gò đất đắp đối xứng quanh những quảng trường rộng lớn",
    100: "Mặt cắt địa tầng gò đất hiển thị các lớp đất màu sắc khác nhau do người xưa chọn lọc",
    101: "Khói lam chiều bốc lên từ hàng trăm nếp nhà tranh – cuộc sống thanh bình thời thịnh vượng",
    102: "Quảng trường Cahokia một thế kỷ sau thưa vắng người, cỏ dại bắt đầu mọc lan",
    103: "Nước lũ sông ngập tràn bình nguyên, nhấn chìm những cánh đồng ngô trọng yếu",
    104: "Những vạt rừng rậm quanh thành phố bị đốn trơ gốc để lấy gỗ đốt và làm cọc thành",
    105: "Cuộc tranh luận căng thẳng giữa các thủ lĩnh trên đỉnh gò khi biến cố liên tục ập đến",
    106: "Cảnh bệnh dịch và khó khăn lan rộng trong khu dân cư đông đúc thiếu vệ sinh",
    107: "Các gia đình gồng gánh hành lý lặng lẽ rời bỏ đô thị tỏa về các vùng đất mới",
    108: "Quảng trường trung tâm trơ trọi cỏ lác mọc dại, đền gỗ sụp đổ dưới bầu trời xám",
    109: "Gò đất phủ đầy cỏ cây xanh mướt nhiều thế kỷ sau bên nhát cày của người nông dân",
    110: "Đoàn khảo cổ hiện đại lập hố đào khai quật và sàng lọc đất tìm mảnh gốm Cahokia",
    111: "Những mảnh gốm Mississippian in hoa văn dây thừng và màu khoáng được minh họa",
    112: "Du khách hiện đại bước lên các bậc thang gỗ trên gò đất Monks Mound lúc rạng đông",
    113: "Hình tượng đàn chim bay tỏa ra bốn phương – cư dân Cahokia hòa vào các bộ tộc bản địa",
    114: "Trưởng lão bản địa ngồi bên gò đất kể chuyện truyền thống ký ức sống động của tổ tiên",
    115: "So sánh quy mô khổng lồ của Cahokia với các kinh đô châu Âu cùng thời kỳ trung cổ",

    # PHẦN 5 — KHOẢNG TRỐNG THỨ TƯ: PHÙ NAM, ÓC EO VÀ CHAMPA (116..155)
    116: "Đô thị cảng cổ Đồng bằng sông Cửu Long với mạng lưới kênh đào chằng chịt và nhà sàn ven sông",
    117: "Hệ thống kênh đào thẳng tắp cắt qua đồng bằng phù sa màu mỡ – đỉnh cao thủy lợi cổ",
    118: "Cảng Óc Eo nhộn nhịp đón tàu buôn La Mã, Ba Tư, Ấn Độ và Trung Hoa cập bến",
    119: "Đồng tiền vàng hoàng đế La Mã và chuỗi ngọc mã não Ấn Độ phát hiện tại di chỉ Óc Eo",
    120: "Vua Phù Nam ngự trên ngai gỗ chạm trổ tiếp kiến các sứ giả ngoại quốc phương xa",
    121: "Sứ giả Trung Hoa triều Tấn vượt sóng cập bến sông vào thăm hoàng cung Phù Nam",
    122: "Thư lại khắc chữ Phạn Sanskrit lên bia đá hòa quyện phong cách tạo hình bản địa",
    123: "Tượng thần Vishnu đội mũ trụ tám cạnh bằng sa thạch uy nghiêm giữa khuôn viên đền đài",
    124: "Xưởng kim hoàn Phù Nam rèn đúc nhẫn vàng chạm hình thần bò Nandin tinh xảo",
    125: "Chợ nổi ven kênh: cư dân địa phương trao đổi lúa gạo, cá tôm và trái cây nhiệt đới",
    126: "Thuyền buồm thân gỗ vượt cửa biển Cửu Long căng gió hướng ra đại dương bao la",
    127: "Bản đồ hải trình Óc Eo nối liền Con đường Tơ lụa Hàng hải Á - Âu",
    128: "Bản đồ cổ Hy Lạp Ptolemy ghi dấu thương cảng viễn đông huyền thoại Cattigara",
    129: "Đồng lúa miền Tây xanh ngút ngàn chân trời – nguồn lương thực trù phú nuôi sống vương quốc",
    130: "Cơn bão nhiệt đới gió mùa quét qua vùng châu thổ, mưa trút xuống các tuyến kênh rạch",
    131: "Tàn tích nền móng gạch Phù Nam phủ đầy cỏ dại và phù sa sau nhiều thế kỷ lãng quên",
    132: "Cánh đồng lúa bạt ngàn bao phủ lên dấu vết các con kênh đào cổ dưới lòng đất",
    133: "Máy bay thám sát Pháp bay trên bầu trời An Giang phát hiện dấu vết kênh cổ năm 1942",
    134: "Bức không ảnh lịch sử chụp từ trên cao hé lộ những đường nét kỷ hà của kinh thành cổ",
    135: "Nhà khảo cổ Louis Malleret đội mũ cối ghi chép bên bờ hố đào khai quật Óc Eo năm 1942",
    136: "Công nhân nâng những khối gạch cổ và cọc gỗ đền đài từ lớp bùn ngập nước phù sa",
    137: "Tủ trưng bày bảo tàng: tiền La Mã, nhẫn vàng, tượng gốm Óc Eo lấp lánh ánh đèn",
    138: "Cận cảnh chiếc nhẫn vàng chạm hình khắc tí hon tìm thấy trong tầng đất di chỉ Óc Eo",
    139: "Các nhà khảo cổ Việt Nam đo đạc và chỉnh lý hiện vật tại khu di tích Óc Eo - Ba Thê",
    140: "Ngọn núi Ba Thê sừng sững bên cánh đồng phù sa nơi cố đô Phù Nam từng ngự trị",
    141: "Phù điêu đá chạm khắc hình thuyền biển và sinh vật đại dương cổ vùng Đông Nam Á",
    142: "Tháp Chàm gạch đỏ trầm mặc trên triền đồi đón những tia nắng bình minh rực rỡ",
    143: "Cận cảnh kỹ thuật miết gạch không lộ mạch vữa và hoa văn chạm khắc sa thạch tinh vi",
    144: "Đoàn voi trận và chiến binh Champa rực rỡ cờ lọng tiến về phía thánh địa ven biển",
    145: "Thủy thủ Champa chuẩn bị tàu vượt biển chất đầy trầm hương và gia vị quý hiếm",
    146: "Thư lại Chăm khắc ghi văn tự trên những thẻ lá buông mỏng manh dưới bóng râm",
    147: "Những trang sách lá buông mục nát phai mờ nét mực dưới mưa gió khí hậu ẩm ướt nhiệt đới",
    148: "Tấm bia đá Champa rêu phong đứng vững qua thăng trầm thời gian lưu giữ danh sách vua hiến cúng",
    149: "Học giả tỉ mỉ dập bản rập văn bia Chăm trong rừng sâu để dịch nghĩa từng dòng chữ Phạn",
    150: "Bản đồ liên bang Champa với các tiểu quốc duyên hải độc lập trải dọc miền Trung",
    151: "Vũ nữ Chăm uyển chuyển múa điệu Apsara truyền thống trước ngôi tháp cổ linh thiêng",
    152: "Người phụ nữ Chăm ngày nay dệt thổ cẩm bên khung cửi giữ gìn di sản nghìn năm",
    153: "Hai em bé người Việt và người Chăm vui bước trên con đường làng rực bóng tháp cổ",
    154: "Dải lụa đa sắc đan bện vào nhau tượng trưng cho dòng chảy đa nguyên của lịch sử Việt Nam",
    155: "Hoàng hôn buông trên sông nước Cửu Long – trầm tích quá khứ lặng lẽ ngàn năm",

    # PHẦN 6 — VÌ SAO NHỮNG KHOẢNG TRỐNG NÀY TỒN TẠI? (156..171)
    156: "Thư lại gục đầu ngủ quên bên phiến đất sét khi cung điện phía sau chìm trong biển lửa",
    157: "Thư viện cổ bốc cháy trong đêm tối, những cuộn giấy bay lên thành ngàn đốm than hồng",
    158: "Chiếc ổ khóa cổ và chiếc chìa khóa đặt cạnh nhau nhưng chưa có cách tra vào đúng khớp",
    159: "Trang giấy khắc ký hiệu bí ẩn nằm cạnh cuốn sổ ghi chép trắng tinh của nhà giải mã",
    160: "Mặt cắt địa tầng: chữ viết trên đất sét khô ráo trường tồn, còn giấy lá ẩm mục biến mất",
    161: "Hai giá để cổ vật: một bên là phiến đá nguyên vẹn, một bên chỉ còn tro bụi lá buông mục nát",
    162: "Khu rừng nhiệt đới ẩm ướt rêu phong nuốt trọn những cuốn sách cổ bằng chất liệu lá",
    163: "Hang động sa mạc khô cằn bảo tồn nguyên vẹn những cuộn giấy cói hàng ngàn năm tuổi",
    164: "Kính lúp rọi vào bản đồ: những vùng khí hậu khô rực sáng tư liệu, vùng nhiệt đới tối đen",
    165: "Hình tượng tảng băng trôi: phần nổi là sử sách ghi chép, phần chìm khổng lồ là đời sống con người",
    166: "Gia đình thời tiền sử quây quần bên bếp lửa ấm áp – những mảnh đời không lưu lại trang sử",
    167: "Bóng dáng đứa trẻ cổ đại vui đùa giữa phế tích – hiện diện thầm lặng của quá khứ vô danh",
    168: "Bức tranh khảm hội tụ: thỏi đồng Địa Trung Hải, con dấu Indus, gò đất Cahokia, gạch tháp Champa",
    169: "Bốn ngọn đèn bão thắp sáng bốn góc tối trên tấm bản đồ thế giới cổ xưa",
    170: "Chiếc bay và chổi lông khảo cổ nằm gối đầu trên tầng đất mới lúc rạng đông",
    171: "Kính hiển vi, bản đồ và tài liệu nghiên cứu mới đặt bên khung cửa sổ ngập tràn nắng sớm",

    # PHẦN 7 — KẾT (172..179)
    172: "Bình minh vàng rực rỡ chiếu rọi những bức tường thành phế tích cổ đại đầy hy vọng",
    173: "Nhà khảo cổ đứng trên đồi cao đón bình minh nhìn xuống công trường khai quật ngày mới",
    174: "Phòng xét nghiệm ADN cổ đại phát ánh sáng xanh giải mã tông tích các dân tộc thất truyền",
    175: "Nhà ngôn ngữ học ngắm nhìn bức tường dán kín ảnh con dấu Indus đón ánh sáng ban mai",
    176: "Cận cảnh mũi cọ lông tỉ mỉ gạt từng hạt cát hé lộ nét hoa văn gốm cổ nghìn năm",
    177: "Bức tranh ghép bằng đá khổng lồ đang được nhiều bàn tay kiên nhẫn gắn từng mảnh ghép hoàn thiện",
    178: "Cuốn sách cổ với những trang giấy trắng tinh dần hiện lên những dòng chữ vàng phát sáng",
    179: "Bốn biểu tượng vĩ đại đặt cạnh nhau trên thảo nguyên lúc bình minh: tháp gạch, gò đất, con dấu và thỏi đồng"
}

# 7 phần kịch bản hoàn chỉnh
PARTS = [
    {
        "id": "part1",
        "chapter_num": 1,
        "title": "Lịch Sử Không Phải Một Cuốn Sách Liền Mạch",
        "subtitle": "Bức tranh ghép khuyết mảnh và bốn khoảng trống lớn của nhân loại",
        "historical_era": "TỔNG QUAN · BỐN NGHÌN NĂM LỊCH SỬ",
        "img_start": 1,
        "img_end": 12,
        "text": """Khi học lịch sử ở trường, chúng ta thường có cảm giác nó là một câu chuyện liền mạch: triều đại này nối tiếp triều đại kia, đế chế này thay thế đế chế nọ, mọi thứ đều có ngày tháng, tên tuổi, và nguyên nhân rõ ràng.

Nhưng sự thật thì khác. Lịch sử mà chúng ta biết giống như một bức tranh ghép bị mất rất nhiều mảnh. Có những khoảng thời gian dài hàng thế kỷ mà gần như không có tài liệu nào sống sót. Có những nền văn minh từng xây thành phố có hệ thống cống ngầm mà người châu Âu phải một nghìn năm sau mới làm được, nhưng chúng ta không biết họ nói thứ tiếng gì, thờ vị thần nào, hay vì sao họ ra đi. Có những vương quốc từng buôn bán với cả đế chế La Mã, rồi bị chôn vùi đến mức sau này chính người dân địa phương cũng không còn nhớ đến tên nó.

Trong video này, chúng ta sẽ đi qua bốn khoảng trống như vậy, ở bốn châu lục, trải dài suốt gần bốn nghìn năm.

Khoảng trống thứ nhất là một cú sụp đổ đồng loạt của cả thế giới Địa Trung Hải cách đây hơn ba nghìn năm, khi hàng loạt cường quốc cùng biến mất trong vòng vài thập kỷ, và chữ viết mất tích ở nhiều nơi trong cả trăm năm.

Khoảng trống thứ hai là một nền văn minh ở Nam Á sở hữu hàng nghìn con dấu khắc chữ, nhưng cho đến hôm nay, không ai đọc được dù chỉ một dòng.

Khoảng trống thứ ba là một thành phố khổng lồ giữa lòng nước Mỹ, đông dân hơn nhiều thủ đô châu Âu cùng thời, rồi bị bỏ hoang mà không có bất kỳ văn bản nào giải thích.

Và khoảng trống thứ tư, gần gũi với chúng ta nhất: một vương quốc thương mại từng nằm ngay tại vùng Đồng bằng sông Cửu Long ngày nay, mà cả thế giới hầu như quên mất cho đến khi các nhà khảo cổ Pháp nhìn ra dấu vết của nó qua ảnh chụp từ trên không, và bắt đầu khai quật vào năm 1942.

Điểm chung của cả bốn câu chuyện này là gì? Không phải là "bí ẩn siêu nhiên" hay "công nghệ thất truyền" như nhiều video giật tít vẫn kể. Đó là những câu hỏi rất thật, rất khoa học, mà các nhà khảo cổ đang tìm cách trả lời bằng từng mảnh gốm, từng lớp trầm tích, từng mẫu ADN.

Chúng ta bắt đầu thôi."""
    },
    {
        "id": "part2",
        "chapter_num": 2,
        "title": "Năm 1177 TCN: Khi Thế Giới Sụp Đổ Đồng Loạt",
        "subtitle": "Sự tan rã của Thời đại Đồ Đồng muộn và bí ẩn 'Dân Biển'",
        "historical_era": "NĂM 1200 - 1150 TCN · ĐỊA TRUNG HẢI",
        "img_start": 13,
        "img_end": 50,
        "text": """Hãy tưởng tượng thế giới vào khoảng năm 1250 trước Công nguyên. Đây là thời đại mà các nhà sử học gọi là Thời đại Đồ Đồng muộn, và nó giống một thế giới toàn cầu hóa thu nhỏ.

Ai Cập của các pharaoh giàu có bên sông Nile. Đế quốc Hittite hùng mạnh ở Anatolia, tức là Thổ Nhĩ Kỳ ngày nay. Các cung điện Mycenae ở Hy Lạp với kho tàng vàng bạc. Các thành phố cảng giàu có ở vùng Levant. Babylon ở Lưỡng Hà. Tất cả đều nối với nhau bằng một mạng lưới thương mại chằng chịt: thiếc từ xa, đồng từ đảo Cyprus, đồ xa xỉ đi khắp Địa Trung Hải. Họ gửi thư ngoại giao cho nhau, gả con gái cho nhau, buôn bán với nhau.

Rồi chỉ trong khoảng từ năm 1200 đến năm 1150 trước Công nguyên, gần như tất cả đều sụp đổ.

Các cung điện Mycenae ở Hy Lạp, gồm Mycenae, Tiryns, Pylos, bị đốt phá hoặc bỏ hoang. Đế quốc Hittite biến mất hoàn toàn. Nhiều thành phố cảng ở Cyprus, Syria, và Palestine bị thiêu rụi. Ai Cập sống sót, nhưng chỉ vừa đủ, và đã bị bòn rút kiệt quệ, đến mức các nhà sử học coi đây là khởi đầu của sự suy tàn dài hạn của nó.

Điều đặc biệt đáng sợ ở đây không chỉ là chiến tranh, mà là chữ viết biến mất. Nhiều hệ thống chữ viết cung đình đã lụi tàn cùng những cung điện đã sử dụng chúng. Ở Hy Lạp, người ta không còn dùng chữ viết trong hàng trăm năm, và giai đoạn này được gọi là Thời kỳ Đen tối của Hy Lạp. Đây thường được coi là "thời kỳ đen tối" đầu tiên trong lịch sử thế giới.

Có một chi tiết khảo cổ đặc biệt ám ảnh. Tại một số nơi, các nhà khảo cổ tìm thấy những phiến đất sét đang được đặt trong lò để nung nhưng chưa bao giờ được lấy ra, bằng chứng của một xã hội bị cắt ngang giữa chừng công việc hằng ngày.

Vậy chuyện gì đã xảy ra?

Nhân vật bị nghi ngờ đầu tiên là một nhóm bí ẩn mà các tài liệu Ai Cập gọi là "Dân biển", hay Sea Peoples. Đây là những nhóm đến từ biển hoặc từ các hòn đảo, tấn công vào Ai Cập, và được Pharaoh Ramesses Ba ghi lại trong các bản khắc trên đền thờ. Ramesses Ba đã đánh bại họ, nhưng theo nhiều nhà sử học, cuộc chiến ấy làm cạn kho bạc của Ai Cập.

Nhưng có một sự thật đáng chú ý: thuật ngữ "Sea Peoples" không hề có trong các văn bản cổ. Nó do một nhà Ai Cập học người Pháp là Gaston Maspero đặt ra vào năm 1881. Các nguồn Ai Cập chỉ mô tả họ là những người "đến từ biển" hoặc "từ các hòn đảo", và cung cấp rất ít thông tin để xác định họ là ai.

Các nhà khảo cổ hiện nay nghiêng về việc họ không phải một đội quân thống nhất, mà là một tập hợp các nhóm hỗn hợp, nói nhiều thứ tiếng khác nhau, gồm cả những người có thể nói tiếng Hy Lạp sơ khai và các ngôn ngữ Anatolia như Luwian. Có bằng chứng cho thấy họ mang theo cả phụ nữ và trẻ em, nghĩa là họ vừa là kẻ cướp phá, vừa có thể là những người tị nạn.

Có một mảnh ghép khoa học rất đáng chú ý: một nghiên cứu năm 2019 đăng trên tạp chí Nature Human Behaviour đã phân tích ADN từ những ngôi mộ Philistine sớm nhất ở Ashkelon, Israel. Kết quả cho thấy bằng chứng bộ gen mạnh về tổ tiên từ miền nam châu Âu ở những cá nhân đầu tiên, tức là bằng chứng sinh học trực tiếp về một cuộc di cư từ vùng Aegean tới.

Nhưng Dân biển không thể là toàn bộ câu chuyện. Nhiều học giả chỉ ra rằng họ không giải thích được sự sụp đổ của Hy Lạp Mycenae, và thậm chí nhóm Dân biển có thể có cả người Hy Lạp trong đó. Nhiều nhà nghiên cứu cho rằng họ là một triệu chứng, hơn là nguyên nhân.

Vậy còn nguyên nhân thật sự? Khoa học hiện đại đưa ra một bức tranh nhiều lớp. Các mẫu lõi trầm tích lấy từ biển Aegean và biển Galilee cho thấy đây là giai đoạn khô hạn nhất trong toàn bộ Thời đại Đồ Đồng, với nhiệt độ tăng và lượng mưa giảm. Ai Cập và Babylon còn chịu đựng được vì có sông Nile và sông Tigris, còn những vùng phụ thuộc vào nước mưa thì chịu đòn nặng nhất. Cộng thêm là bằng chứng về nhiều trận động đất liên tiếp trong khu vực.

Và ở đây có một điểm rất thú vị mà các nhà sử học nhấn mạnh: chính sự kết nối là điểm yếu. Thế giới Đồ Đồng phụ thuộc vào thiếc và đồng đi qua những khoảng cách rất xa. Khi một mắt xích đứt, nó kéo theo cả chuỗi. Một hệ thống quá phức tạp và quá liên kết, khi bị đánh từ nhiều phía cùng lúc, có thể sụp đổ như quân domino.

Đây gọi là "sụp đổ dây chuyền", và nó không giống bất kỳ lý do đơn lẻ nào như một vụ xâm lược hay một trận động đất. Nó là sự cộng hưởng của hạn hán, đói kém, động đất, di cư, chiến tranh, và đứt gãy thương mại.

Và khoảng trống lịch sử thực sự nằm ở đây: sau cú sụp đổ, chữ viết ở nhiều nơi biến mất, các bản ghi chép không còn, và chúng ta phải dựa hoàn toàn vào những gì khảo cổ học đào lên được, những lớp tro, những mảnh gốm đổi kiểu, những cung điện bỏ hoang, để lắp ráp lại điều gì đã xảy ra. Nhiều nhóm Dân biển khác, ngoài Philistine, đơn giản là tan biến vào hậu-sụp-đổ mà không để lại tên.

Một lưu ý về tính khách quan: có những học giả như David Rohl đề xuất niên đại học thay thế, cho rằng cú sụp đổ này không xảy ra như cách hiểu chính thống. Đây là quan điểm thiểu số và còn tranh cãi, và đa số giới nghiên cứu vẫn chấp nhận mốc thời gian quanh năm 1200 trước Công nguyên."""
    },
    {
        "id": "part3",
        "chapter_num": 3,
        "title": "Những Dòng Chữ Không Ai Đọc Được",
        "subtitle": "Đỉnh cao đô thị Harappa và bí ẩn ngàn năm của văn tự Indus",
        "historical_era": "2600 - 1900 TCN · THUNG LŨNG INDUS",
        "img_start": 51,
        "img_end": 86,
        "text": """Chuyển từ Địa Trung Hải sang Nam Á, chúng ta gặp một khoảng trống kiểu khác: không phải thiếu chứng cứ vật chất, mà là chứng cứ ở đó rành rành, nhưng không ai giải mã được.

Khoảng hơn năm nghìn ba trăm năm trước, một nền văn minh xuất hiện dọc theo lưu vực sông Indus, ở khu vực thuộc Pakistan và tây bắc Ấn Độ ngày nay. Các nhà sử học gọi đó là nền văn minh Thung lũng Indus, hay văn minh Harappa. Giai đoạn cực thịnh của nó kéo dài khoảng từ năm 2600 đến năm 1900 trước Công nguyên, cùng thời với Ai Cập cổ và Lưỡng Hà.

Nếu chỉ nhìn vào khảo cổ học đô thị, đây là một trong những nền văn minh ấn tượng nhất thời cổ đại. Các thành phố như Harappa và Mohenjo-daro, mà tên gọi Mohenjo-daro có nghĩa là "Gò của người chết", được quy hoạch theo dạng lưới, với hệ thống thoát nước tinh vi. Các nhà nghiên cứu mô tả những thành phố này sophisticated đến mức phải hơn một nghìn năm sau mới có công trình tương tự ở nơi khác.

Nhưng có một điều lạ lùng: người ta không tìm thấy dấu vết rõ ràng của những cung điện vua chúa hoành tráng hay những ngôi mộ khổng lồ như ở Ai Cập. Các nhà khảo cổ vẫn còn tranh luận về cấu trúc quyền lực của xã hội này. Một công trình nổi tiếng là "Đại Bể tắm" ở Mohenjo-daro, gợi ý về vai trò của nghi lễ, nhưng chức năng chính xác của nó vẫn còn là câu hỏi.

Và rồi có chữ viết.

Người Indus để lại hơn bốn nghìn con dấu và các vật khắc ký hiệu, gồm khoảng bốn trăm đến sáu trăm ký hiệu khác nhau. Chúng được khắc trên các con dấu nhỏ bằng đá, trên đồ gốm, và các vật khác. Đây là hệ thống chữ viết sớm nhất của tiểu lục địa Ấn Độ.

Và cho đến nay, hơn một thế kỷ nghiên cứu, không ai giải mã được nó.

Tại sao lại khó đến vậy? Các nhà nghiên cứu chỉ ra một loạt vấn đề chồng lên nhau.

Thứ nhất, các văn bản cực kỳ ngắn. Độ dài trung bình chỉ khoảng năm ký hiệu. Văn bản dài nhất từng được tìm thấy chỉ có 34 ký hiệu. So với phiến đá Rosetta, thứ đã giúp giải mã chữ tượng hình Ai Cập nhờ chứa cùng một văn bản bằng ba thứ chữ, chúng ta không có gì tương tự.

Thứ hai, không có văn bản song ngữ. Không có một "Rosetta Stone của Indus" nào, tức là không có văn bản nào đặt chữ Indus cạnh một thứ chữ đã biết để đối chiếu.

Thứ ba, chúng ta không biết họ nói ngôn ngữ nào. Một số học giả, như giáo sư Asko Parpola của Đại học Helsinki, người đã nghiên cứu chữ này từ năm 1968, cho rằng nó biểu diễn một ngôn ngữ thuộc ngữ hệ Dravidian. Nhưng nhiều học giả khác lại nghi ngờ điều còn căn bản hơn: liệu đây có phải một hệ thống chữ viết ghi lại ngôn ngữ nói hay không, hay chỉ là một hệ thống ký hiệu và biểu tượng, giống như huy hiệu hay nhãn hàng.

Thứ tư, truyền thống dường như bị đứt đoạn khi nền văn minh suy tàn. Chữ Brahmi, hệ thống chữ viết sớm nhất tiếp sau ở Ấn Độ, thay đổi rất nhiều và không cung cấp cầu nối rõ ràng.

Người ta đã thử nhiều cách. Có nhóm nghiên cứu dùng mật mã học kiểu Thế chiến hai, coi mỗi ký hiệu như một mật mã. Họ tiến được một chút, nhưng cuối cùng thất bại vì chữ Indus quá phức tạp. Gần đây, một số nghiên cứu số hóa hàng nghìn mảnh gốm có dấu khắc từ nhiều địa điểm để đối chiếu với các mẫu Indus. Chính quyền bang Tamil Nadu ở Ấn Độ thậm chí công bố giải thưởng một triệu đô la cho bất kỳ ai, học giả hay người nghiệp dư, giải mã được nó. Nhưng cho đến nay, vẫn chưa ai thành công.

Còn sự suy tàn của nền văn minh này thì sao? Khoảng năm 1900 trước Công nguyên, nền văn minh Harappa chín muồi bắt đầu suy tàn. Các nhà nghiên cứu cho rằng đây là kết quả của biến đổi khí hậu, suy thoái môi trường, và đặc biệt là việc hệ thống sông Ghaggar-Hakra, vốn nuôi sống nhiều khu định cư, dần cạn nước. Một số nơi, như Chanhu-daro, có thể bị bỏ hoang vì dòng sông Indus đổi hướng.

Điều đáng chú ý là đây không phải một cú sụp đổ đột ngột như nhiều người tưởng. Từ khoảng năm 1900 đến 1300 trước Công nguyên là một giai đoạn suy giảm dần, các thành phố lớn bị bỏ, dân cư chuyển về các cộng đồng nhỏ hơn ở nông thôn. Người Indus không "biến mất", họ dần dần phân tán.

Nhưng điều mà chúng ta mất, và có lẽ sẽ mất mãi nếu không có đột phá, là tiếng nói của họ. Chúng ta biết họ buôn bán, biết họ xây dựng, biết họ khắc hàng nghìn con dấu với hình các con vật và những ký hiệu bí ẩn. Nhưng chúng ta không biết họ tự gọi mình là gì, không biết họ kể những câu chuyện nào, cũng không biết họ nghĩ gì khi rời bỏ những thành phố của mình."""
    },
    {
        "id": "part4",
        "chapter_num": 4,
        "title": "Cahokia: Đô Thị Lớn Nhất Bắc Mỹ",
        "subtitle": "Kinh thành gò đất bí ẩn và cuộc di cư không lời giải thích",
        "historical_era": "1050 - 1400 SCN · BẮC MỸ",
        "img_start": 87,
        "img_end": 115,
        "text": """Chúng ta chuyển sang một châu lục khác, và một thời đại muộn hơn rất nhiều, để thấy rằng khoảng trống lịch sử không chỉ thuộc về thời cổ đại xa xôi.

Khoảng năm 1050 sau Công nguyên, tại khu vực nay thuộc bang Illinois của Mỹ, nền văn hóa Mississippi xây dựng một trung tâm đô thị mà ngày nay chúng ta gọi là Cahokia. Cái tên "Cahokia" thực ra không phải do người xây dựng đặt ra, mà lấy từ một bộ tộc bản địa sống ở vùng đó nhiều thế kỷ sau.

Ở thời kỳ đỉnh cao, đây là một trung tâm đô thị lớn nhất phía bắc Mexico. Ở trung tâm là một quảng trường khổng lồ rộng khoảng năm mươi mẫu Anh, nơi cư dân tụ tập cho các nghi lễ, trò chơi, và các thông báo quan trọng, bao quanh bởi hàng trăm gò đất nhân tạo. Cahokia có một mạng lưới thương mại rộng lớn, mang hàng hóa từ tận vùng Ngũ Đại Hồ và vịnh Mexico.

Đây không phải câu chuyện về "người săn bắt hái lượm nguyên thủy" như nhiều người vẫn tưởng về Bắc Mỹ thời tiền Colombo. Đây là một xã hội nông nghiệp có tổ chức đô thị, có nghi lễ tôn giáo phức tạp, có các công trình đất đắp đồ sộ.

Nhưng đến khoảng năm 1400 sau Công nguyên, trung tâm đô thị này đã bị bỏ hoang hoàn toàn.

Và đây chính là khoảng trống: người Mississippi không có chữ viết mà chúng ta biết. Không có biên niên sử, không có bản khắc giải thích. Chúng ta không có bất kỳ văn bản nào nói vì sao họ ra đi. Cahokia chỉ để lại những gò đất, những mảnh gốm, những dấu vết trong đất, và những câu hỏi.

Các nhà khảo cổ đưa ra nhiều giả thuyết. Có những đề xuất về biến đổi khí hậu và lũ lụt, về việc khai thác quá mức tài nguyên, đặc biệt là gỗ, về xung đột xã hội, và về việc hệ thống quyền lực trung ương mất uy tín. Một số giả thuyết còn gợi ý rằng bệnh tật và khủng hoảng lương thực có thể đã đóng vai trò. Tuy nhiên, cần nói rõ: đây vẫn là các giả thuyết, và chưa có sự đồng thuận hoàn toàn về nguyên nhân chính xác.

Điều đáng nhớ nhất về Cahokia có lẽ là một sự đối lập: một thành phố mà quy mô vượt xa rất nhiều thị trấn châu Âu cùng thời, nhưng lại gần như không có trong sách giáo khoa của phần lớn thế giới. Nó nhắc chúng ta rằng lịch sử được ghi lại phụ thuộc rất nhiều vào việc ai để lại chữ viết, chứ không đơn thuần vào việc ai xây dựng điều gì đáng kinh ngạc."""
    },
    {
        "id": "part5",
        "chapter_num": 5,
        "title": "Phù Nam và Óc Eo: Vương Quốc Chôn Vùi Giữa Cửu Long",
        "subtitle": "Cửa ngõ hàng hải nối liền Địa Trung Hải - Trung Hoa và di sản Champa",
        "historical_era": "THẾ KỶ 1 - 7 SCN · NAM BỘ & CHAMPA",
        "img_start": 116,
        "img_end": 155,
        "text": """Và bây giờ, chúng ta về nhà.

Nếu bạn đang ở Việt Nam, có một khoảng trống lịch sử nằm ngay dưới chân bạn, ở vùng đất mà chúng ta ngày nay gọi là An Giang, thuộc Đồng bằng sông Cửu Long.

Từ khoảng thế kỷ thứ nhất đến thế kỷ thứ bảy sau Công nguyên, khu vực này là trung tâm của một vương quốc mà các sử gia Trung Hoa gọi là Phù Nam. Phù Nam thường được coi là vương quốc đầu tiên được biết đến ở Đông Nam Á. Nguồn gốc của nó, theo một truyền thuyết được sử liệu Trung Hoa ghi lại, là một người ngoại quốc tên Hỗn Điền đã lập nên vương quốc này vào khoảng thế kỷ thứ nhất.

Thành phố cảng trung tâm của nó, hiện được biết đến qua di chỉ khảo cổ Óc Eo, là một trung tâm thương mại sầm uất. Nằm trong một mạng lưới kênh đào chằng chịt, Óc Eo kết nối với cảng biển và với khu vực Angkor Borei qua hệ thống kênh, gợi ý rằng những địa điểm này cùng nhau tạo thành trung tâm của Phù Nam.

Và những gì được đào lên ở đây thực sự đáng kinh ngạc. Tại Óc Eo, các nhà khảo cổ tìm thấy hàng hóa từ La Mã, Ba Tư, Ấn Độ, và Hy Lạp, bao gồm cả những đồng tiền bạc mang hình ảnh các hoàng đế La Mã. Có ý kiến cho rằng Óc Eo có thể chính là hải cảng mà người Hy Lạp và La Mã gọi là "Cattigara". Điều này cho thấy một vùng đất ở miền nam Việt Nam ngày nay từng nằm trên tuyến đường thương mại hàng hải nối thế giới từ Địa Trung Hải đến Trung Hoa.

Các phát hiện cho thấy cư dân Phù Nam có dùng chữ Phạn, tức tiếng Sanskrit, một dấu hiệu của ảnh hưởng văn hóa Ấn Độ. Và các nghiên cứu khảo cổ gần đây cho thấy văn hóa Óc Eo có nguồn gốc bản địa, với một cộng đồng nói các ngôn ngữ thuộc nhóm Malayo-Polynesian, chứ không đơn thuần là "một thuộc địa của Ấn Độ" như quan niệm cũ.

Vậy tại sao lại nói đây là một khoảng trống lịch sử?

Bởi vì trong nhiều thế kỷ sau sự suy tàn của Phù Nam vào khoảng thế kỷ thứ sáu đến thứ bảy, tàn tích Óc Eo nằm im lìm, bị lãng quên. Chỉ có những ghi chép rời rạc từ sử liệu Trung Hoa cho chúng ta biết vương quốc này từng tồn tại.

Rồi đến năm 1942, các nhà khảo cổ người Pháp, dẫn đầu là Louis Malleret, phát hiện ra di chỉ này nhờ sử dụng ảnh chụp từ trên không, những bức ảnh hàng không cho thấy dấu vết của các kênh đào cổ chằng chịt dưới lòng đất. Cuộc khai quật bắt đầu từ ngày 10 tháng 2 năm 1942. Và chính nhờ Malleret mà hiểu biết về vương quốc Phù Nam trở nên đầy đủ hơn.

Sau năm 1975, việc nghiên cứu Phù Nam tại Việt Nam được hồi sinh, chủ yếu trong giới khảo cổ, với những bằng chứng mới cho phép tái dựng đời sống của cư dân vương quốc này. Từ năm 2017 đến 2020, một dự án khai quật quy mô lớn đã được thực hiện tại khu Óc Eo - Ba Thê và khu vực Nền Chùa lân cận. Khu phức hợp Óc Eo - Ba Thê được coi là trung tâm chính trị và kinh tế của văn hóa Óc Eo, rộng hơn 450 hecta.

Và dù đã có hơn bảy mươi lăm năm nghiên cứu kể từ khi phát hiện ban đầu, Óc Eo vẫn còn nhiều bí ẩn. Vương quốc này đã sụp đổ vào khoảng thế kỷ thứ bảy, nhưng bằng chứng khảo cổ cho thấy nhiều truyền thống văn hóa của nó vẫn được các cộng đồng phía nam sau này bảo tồn và phát triển.

Và cạnh Phù Nam, còn một khoảng trống khác dành cho chúng ta: vương quốc Chăm Pa.

Champa tồn tại khoảng một nghìn năm, từ khoảng năm 500 đến năm 1700, dọc theo bờ biển miền trung và nam Việt Nam ngày nay. Nó là một nền văn minh hàng hải với các tháp gạch đỏ Chăm còn sót lại đến giờ. Champa mất độc lập vào tay Đại Việt, với mốc thường được nhắc là năm 1471.

Nhưng có một chi tiết rất đáng suy ngẫm: người Chăm viết trên lá, và những tài liệu này không chống chọi nổi khí hậu nóng ẩm của bờ biển Việt Nam. Ngày nay, nguồn thông tin quý giá nhất về Champa chủ yếu đến từ các bia đá khắc chữ, và chính những tấm bia này cũng đang bị bỏ mặc và hư hại. Rất nhiều nghệ thuật Chăm cổ điển đã mất đi vì thời gian, vì những kẻ cướp phá, và vì các cuộc chinh phạt. Chúng ta biết điều này qua chính các bia đá, nơi các vua Chăm liệt kê những món quà quý giá họ từng dâng cho các đền thờ, những món quà mà nay không còn nữa.

Và điều này khiến chúng ta phải đặt lại câu hỏi về cách chúng ta kể lịch sử. Champa thường từng được xem như một vương quốc thống nhất, nhưng các học giả sau này cho rằng có thể nên coi nó là một liên bang gồm các tiểu quốc độc lập, hoặc là thống nhất ở một số giai đoạn và chia rẽ ở giai đoạn khác. Người Chăm ngày nay vẫn là một cộng đồng sống động ở Việt Nam. Hiểu về Champa và Phù Nam giúp chúng ta thách thức ý tưởng cho rằng lịch sử Việt Nam là một câu chuyện đơn tuyến."""
    },
    {
        "id": "part6",
        "chapter_num": 6,
        "title": "Vì Sao Những Khoảng Trống Này Tồn Tại?",
        "subtitle": "Ba quy luật mất mát và thiên kiến của bằng chứng còn sống sót",
        "historical_era": "PHÂN TÍCH TRIẾT LÝ LỊCH SỬ",
        "img_start": 156,
        "img_end": 171,
        "text": """Bây giờ hãy lùi lại và nhìn cả bốn câu chuyện cùng lúc. Có phải chúng chỉ là bốn chuyện ngẫu nhiên không liên quan? Hay có một quy luật nào đó?

Nếu nhìn kỹ, chúng ta thấy ít nhất ba lý do khiến lịch sử có những khoảng trống.

Lý do thứ nhất là chữ viết mất đi cùng với người viết. Trong Sụp đổ Thời đại Đồ Đồng, chữ viết cung đình biến mất cùng các cung điện. Khi hệ thống chính trị bị phá vỡ, những chuyên gia biết chữ, những kho lưu trữ, và cả động lực để viết cũng mất theo. Một khoảng trống lịch sử thường bắt đầu chính xác từ khoảnh khắc mà những người có khả năng ghi lại chuyện xảy ra cũng bị cuốn vào biến cố.

Lý do thứ hai là chữ viết còn đó nhưng chìa khóa để đọc nó thì mất. Đó là trường hợp Indus. Chúng ta có dữ liệu, nhưng không có cách để giải mã. Đôi khi một khoảng trống không phải vì thiếu thông tin, mà vì thiếu cây cầu bắc từ ngôn ngữ của họ sang ngôn ngữ của chúng ta.

Lý do thứ ba là vật liệu ghi chép quá mong manh, hoặc xã hội đó không ghi chép theo cách chúng ta nhận ra. Cahokia không để lại văn bản nào mà chúng ta biết. Người Chăm viết trên lá, và những chiếc lá ấy đã mục nát trong khí hậu nhiệt đới. Đây là điều mà các nhà sử học hay gọi là "thiên kiến của bằng chứng còn sống sót": chúng ta hiểu rất rõ những nền văn minh viết trên đất sét nung, đá, hoặc giấy cói trong khí hậu khô, và hiểu rất ít về những nền văn minh viết trên vật liệu dễ hỏng.

Và có một bài học sâu hơn ẩn dưới cả ba lý do trên: khoảng trống trong lịch sử của chúng ta không phản ánh khoảng trống trong sự tồn tại của con người. Chúng phản ánh khoảng trống trong bằng chứng còn sót lại.

Người Indus đã sống, đã yêu, đã buôn bán, đã có những cuộc tranh luận mà chúng ta không thể nghe. Người Cahokia đã có những nghi lễ và những câu chuyện mà không ai còn nhớ. Người Phù Nam đã đi thuyền đến Ấn Độ, đã trao đổi hàng hóa với La Mã, và giờ chúng ta chỉ biết tên họ qua sử liệu của một nước láng giềng. Việc chúng ta không biết chuyện gì xảy ra không có nghĩa là không có chuyện gì xảy ra."""
    },
    {
        "id": "part7",
        "chapter_num": 7,
        "title": "Lời Kết: Những Trang Sách Chưa Viết Xong",
        "subtitle": "Lịch sử là một bãi khai quật bất tận và hành trình tìm lại ký ức",
        "historical_era": "KẾT LUẬN & THÔNG ĐIỆP",
        "img_start": 172,
        "img_end": 179,
        "text": """Lịch sử mà chúng ta học ở trường thường giống một đại lộ thẳng tắp. Nhưng nếu bạn bước ra khỏi con đường chính, bạn sẽ thấy nó giống một bãi khai quật hơn: đầy những lớp đất chồng lên nhau, những mảnh gốm chưa ghép được, những dòng chữ chưa ai đọc.

Hôm nay, một nhà khảo cổ vẫn đang cẩn thận phủi lớp đất khỏi một mảnh gốm ở An Giang. Một nhà ngôn ngữ vẫn đang so sánh các ký hiệu trên con dấu Indus với những mẫu chữ khắc trên đồ gốm cách đó hàng nghìn cây số. Một nhà di truyền học vẫn đang trích xuất ADN từ những ngôi mộ ba nghìn năm tuổi để lần theo dấu chân của những người đã tan vào lịch sử mà không để lại tên.

Những khoảng trống lịch sử ấy không phải là những hố đen vĩnh viễn. Chúng là những trang sách chưa được viết xong, và mỗi năm, từng dòng một, chúng đang được điền dần.

Cảm ơn bạn đã xem đến đây."""
    }
]

def main():
    chapters = []
    for p in PARTS:
        img_list = []
        desc_list = []
        for i in range(p["img_start"], p["img_end"] + 1):
            img_rel = f"images/lich-su-khoang-trong-16x9/{i:03d}.png"
            img_list.append(img_rel)
            desc_list.append(IMAGE_DESCRIPTIONS.get(i, f"Hình ảnh tư liệu lịch sử #{i}"))

        chapters.append({
            "id": p["id"],
            "chapter_num": p["chapter_num"],
            "title": p["title"],
            "subtitle": p["subtitle"],
            "historical_era": p["historical_era"],
            "word_count": len(p["text"].split()),
            "text": p["text"],
            "images": img_list,
            "image_descriptions": desc_list,
            "img_count": len(img_list)
        })

    out_file = Path("src/data/history_gaps_chapters.json")
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(chapters, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã ghi nhận {len(chapters)} phần vào {out_file}")
    total_imgs = sum(c['img_count'] for c in chapters)
    total_words = sum(c['word_count'] for c in chapters)
    print(f"📊 Tổng số ảnh: {total_imgs} | Tổng số từ: {total_words}")

if __name__ == "__main__":
    main()
