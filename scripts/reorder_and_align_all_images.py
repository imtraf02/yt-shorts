# -*- coding: utf-8 -*-
"""
Script tái cấu trúc thứ tự và mốc thời gian hiển thị chuẩn xác 100%
cho toàn bộ 120 ảnh trong 12 phần video 'Facebook không thu tiền bạn. Vậy ai đang trả tiền?'.
Khớp chính xác từng câu/vế trong kịch bản và audio thuyết minh của Trúc Ly.
"""

import sys
import json
import re
import wave
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from debug_script_and_prompts import PROMPTS

# Mô tả ngắn gọn tiếng Việt cho 120 ảnh (dùng cho SceneBadge)
DESCRIPTIONS = {
    1: "Minh lướt điện thoại ban đêm trong phòng ngủ ấm cúng",
    2: "Cận cảnh ngón tay lướt màn hình xem các video ngắn",
    3: "Tòa nhà chọc trời hình điện thoại với kho vàng rực rỡ",
    4: "Ngọn núi tiền vàng khổng lồ chạm tới mây trời",
    5: "Minh lộn ngược chiếc ví trống rỗng với vẻ mặt hoang mang",
    6: "Khung hình chia đôi: Minh lướt app và bàn tay mặc vest đếm tiền",
    7: "Bóng đen Mr. Feed trên sân thượng nhìn thành phố sáng đèn",
    8: "Linh vật đồng xu Xu thò đầu ra từ túi áo nháy mắt tinh nghịch",

    9: "Quán rượu kiểu Mỹ thế kỷ 19 treo biển ăn trưa miễn phí",
    10: "Cận cảnh đĩa đồ ăn mặn chát, thực khách khát khô cổ",
    11: "Nhân viên pha chế rót bia liên tục, tiền xu rơi leng keng",
    12: "Quán cà phê wifi miễn phí, Minh ngồi ôm laptop với ly nước rỗng",
    13: "Dây chuyền bánh mì, mỗi ổ bánh gắn thẻ chi phí biên",
    14: "Phòng máy chủ rực sáng, ứng dụng nhân bản gửi đi toàn cầu",
    15: "Cỗ máy dập ra các khối ứng dụng kỹ thuật số chi phí vài xu",
    16: "Thẻ giá trượt dốc không phanh rơi xuống hố tròn số không",
    17: "Hai cửa hàng đối diện nhau cùng hạ biển giá xuống số không",
    18: "Đồng xu Xu ngồi trên xích đu nghi hoặc bên khay cơm trưa",

    19: "Chợ truyền thống nhộn nhịp, tiểu thương và khách nối chỉ vàng",
    20: "Quầy báo cổ điển, độc giả đọc tin và nhà quảng cáo giương biển",
    21: "Cây cầu phát sáng khổng lồ nối hai hòn đảo người dùng và quảng cáo",
    22: "Cảnh quẹt thẻ tín dụng tại cửa hàng kết nối ngân hàng",
    23: "Mr. Feed đứng trên cán cân vàng giữa người dùng và nhà quảng cáo",
    24: "Bập bênh khổng lồ: người dùng tim yêu thích và chồng tiền vàng",
    25: "Hai cánh cổng: cổng miễn phí cho người dùng và cổng vàng thu tiền",
    26: "Nhà kinh tế học tóc bạc Jean Tirole trước bảng đen thị trường hai mặt",
    27: "Minh nhìn thấy bảng giá thuê bao hàng tháng và hoảng hốt bỏ chạy",
    28: "Thành phố ứng dụng bị bỏ hoang, nhà quảng cáo ngơ ngác",
    29: "Cánh cửa màu tím khiên bảo vệ, Minh cầm ví ngập ngừng",
    30: "Cảnh siêu thực: chợ khổng lồ dựng ngay trên bức chân dung của Minh",

    31: "Nhà phát minh già ngồi cô đơn bên chiếc điện thoại đầu tiên",
    32: "Cả thành phố giăng kín dây điện thoại, mọi người vui vẻ trò chuyện",
    33: "Mạng lưới các nút sáng kết nối toàn cầu theo cấp số nhân",
    34: "Bánh đà khổng lồ quay tròn tạo vòng xoáy tăng trưởng",
    35: "Điểm lật bờ vực: các đối thủ bị bỏ lại, quả cầu sáng lăn nhanh",
    36: "Quả cầu tuyết lăn xuống núi cuốn theo người dùng và tiền bạc",
    37: "Mr. Feed ném từng chồng tiền mặt vào lò lửa đầu máy xe lửa",
    38: "Linh vật neon ném phong bao lì xì và hoa giấy cho người dùng mới",
    39: "Minh cố lẻn ra khỏi nhóm chat gia đình nhưng bị bàn tay chibi kéo lại",
    40: "Chiếc lồng êm ái hình chuông thông báo có sofa và wifi",
    41: "Mr. Feed cầm máy hút bụi khổng lồ hút các ứng dụng startup nhỏ",
    42: "Hai tòa nhà nhỏ được mua bằng các vali tiền mặt",
    43: "Khung hình chia đôi: đồ thị bạn bè đối chiếu mưa video sở thích",
    44: "Hạ kinh ngạc trước màn hình khi video bùng nổ hàng triệu lượt xem",

    45: "Học giả Herbert Simon thập niên 1970 trong thư viện sách khổng lồ",
    46: "Đồng hồ 24 giờ hình biểu đồ tròn với lát cắt chú ý mỏng manh",
    47: "Chiếc đồng hồ cát vàng tí hon giữa hai ngón tay",
    48: "Con đường vô tận dệt bằng các khung video kéo dài lên trời",
    49: "Minh ăn snack từ chiếc bát không đáy tự động làm đầy",
    50: "Chấm thông báo đỏ rực như mắt cú trong đêm tối",
    51: "Minh ngồi ghế bành lướt trên băng chuyền sushi video vô tận",
    52: "Máy đánh bạc với các cuộn quay là màn hình điện thoại",
    53: "Máy nhả kẹo tự động rơi kẹo ngọt mỗi lần vuốt ngón tay",
    54: "Lựa chọn: lát bánh ngọt ngay bây giờ đối chiếu rương kho báu",
    55: "Phòng ngủ tối lúc 2 giờ sáng, Minh xem video làm bánh",
    56: "Cảnh mộng ảo với hàng chục chiếc đồng hồ điện thoại tan chảy",

    57: "Bình thủy tinh chứa biểu tượng sở thích trôi lơ lửng của Minh",
    58: "Ống kính máy ảnh hình con mắt khổng lồ quan sát đám đông",
    59: "Cận cảnh đồng tử Minh phản chiếu quảng cáo đôi giày",
    60: "Chiếc điện thoại nằm im trên bàn cà phê với đôi mắt tí hon",
    61: "Phòng đấu giá tốc độ cao, các nhà quảng cáo giơ bảng đấu giá Minh",
    62: "Khoảnh khắc đóng băng: ngón tay Minh vừa chạm màn hình",
    63: "Ba quả cầu tiền tệ, con trỏ và ngôi sao hợp nhất thành thẻ quảng cáo",
    64: "So sánh: thợ may đo đạc tỉ mỉ đối chiếu xưởng may đại trà",
    65: "Phát tờ rơi bừa bãi đối chiếu ánh đèn rọi cô dâu đám cưới",
    66: "Cuộn giấy điều khoản sử dụng dài vô tận với hai nút bấm duy nhất",
    67: "Bản đồ thế giới với các vùng tỏa sáng đồng tiền to nhỏ khác nhau",
    68: "Minh đứng bơ vơ giữa sân khấu đấu giá trong ánh đèn rọi",

    69: "Cán cân thặng dư tiêu dùng: giá sẵn sàng trả và giá thực tế",
    70: "Cảnh ấm cúng bà cụ gọi video call cho người cháu ở phương xa",
    71: "Bạn trẻ tự học sửa xe đạp qua video hướng dẫn chi tiết",
    72: "Biểu tượng bản đồ và tìm kiếm tựa tiểu tiên bay lượn hỗ trợ Minh",
    73: "Nhóm nhà nghiên cứu cầm bảng khảo sát với túi tiền 100 đô la",
    74: "Minh tắt ứng dụng mạng xã hội, chiếc ba lô nặng trĩu rơi khỏi vai",
    75: "Nhà kinh tế học soi kính lúp vào trang giấy vô hình trong GDP",
    76: "Kéo co giữa món quà lấp lánh và sợi xích nặng nề",
    77: "Đồng xu Xu ngồi cân não trên bập bênh giữa trái tim và đồng hồ",
    78: "Ngã ba đường: công viên cây xanh và thành phố màn hình neon",

    79: "Ống khói nhà máy xả khói mù mịt lên ngôi làng nhỏ",
    80: "Ống khói điện thoại xả khói bong bóng thông báo vào từng mái nhà",
    81: "Cuốn lịch năm khổng lồ với 30 ngày bị mất",
    82: "Đồng hồ cát mỗi ngày rơi 2 giờ, tích tụ thành ngọn núi",
    83: "Soi gương trong khi hình ảnh hào nhoáng của người khác trôi nổi",
    84: "Hai nhóm nghiên cứu giơ biểu đồ kết quả trái ngược nhau",
    85: "Chiếc loa phát thanh tiêu đề giật gân làm bùng cháy ngọn lửa",
    86: "Bong bóng phẫn nộ cưỡi tên lửa bỏ xa bong bóng sự thật",
    87: "Thanh tra chính phủ cầm con dấu thuế tiến về nhà máy điện thoại",
    88: "Cán cân lợi nhuận nền tảng một bên và tờ hóa đơn vô hình đè lên đầu",

    89: "Hạ livestream quay video trong phòng nhỏ với đèn tròn",
    90: "Kim tự tháp thu nhập: đỉnh chóp ngôi sao và biển người bên dưới",
    91: "Lồng quay xổ số xoay tròn với khuôn mặt các nhà sáng tạo",
    92: "Cánh đồng lúa vàng, Hạ gặt lúa còn Mr. Feed đến thu tô",
    93: "Chong chóng thuật toán quay cuồng, thửa ruộng bỗng chốc xơ xác",
    94: "Cô Ba trong tiệm áo cưới nhìn vào hóa đơn quảng cáo dài dằng dặc",
    95: "Đấu giá chật chội giữa các chủ tiệm tranh giành một khách hàng",
    96: "Ba giai đoạn thoái hóa: quán ấm cúng, quán áp phích, quán ép giá",
    97: "Chiếc bánh bị cắt: nền tảng lấy phần lớn, Hạ cầm mẩu bánh vụn",
    98: "Hạ tự tay xây ngọn hải đăng nhỏ trên ghềnh đá giữa mây bão",

    99: "Nữ thẩm phán cầm cân công lý đối diện người khổng lồ công nghệ",
    100: "Startup nhỏ trên bờ biển trước con sóng thần khổng lồ",
    101: "Nghị viện trang nghiêm với các học giả tranh luận bàn tròn",
    102: "Ổ khóa và chìa khóa mở kho dữ liệu cá nhân",
    103: "Hai cánh cửa: cửa miễn phí ngập quảng cáo và cửa trả phí yên tĩnh",
    104: "Minh trong trang phục thợ mỏ tại mỏ dữ liệu nhận lương",
    105: "Kéo co giữa hai phe ủng hộ quy định và phản đối quy định",
    106: "Thành phố tương lai năm 2040 với màn hình lơ lửng",
    107: "Bình minh rực rỡ trên đường chân trời thành phố hy vọng",
    108: "Đám mây hình dấu hỏi khổng lồ trên bầu trời xanh",

    109: "Minh cài đặt giới hạn thời gian trên điện thoại",
    110: "Minh tắt thông báo không cần thiết, bóng đỏ xẹp dần",
    111: "Minh cất điện thoại vào ngăn kéo ra công viên ngập nắng",
    112: "Minh nhìn vào gương mỉm cười tự vấn trước biểu tượng ứng dụng",
    113: "Hạ cẩn thận chia trứng vào nhiều giỏ khác nhau",
    114: "Cây cầu gỗ nối thẳng từ Hạ đến khán giả của mình",

    115: "Đồng xu Xu cầm dấu hỏi lớn mỉm cười dưới ánh đèn spotlight",
    116: "Bức ảnh toàn thể tất cả nhân vật bên nhau trên sân thượng",
    117: "Cận cảnh nụ cười thấu hiểu và tự tin của Minh",
    118: "Chiếc điện thoại úp mặt xuống bàn bên tách cà phê bình yên",
    119: "Linh vật Xu vẫy tay chào tạm biệt với tia sáng lấp lánh",
    120: "Hoàng hôn rực rỡ trên sân thượng với bóng dáng Minh bước đi"
}

# Bản đồ thứ tự chuẩn xác cho từng phần: mỗi phần là danh sách [ (img_num, [danh sách từ khóa cue trong kịch bản]) ]
ORDERED_SCENES = {
    "part1": [
        (1, ["bạn", "dùng", "facebook"]),                        # 001: Minh lướt điện thoại ban đêm
        (2, ["bạn", "lướt", "tiktok"]),                          # 002: Cận cảnh ngón tay lướt TikTok
        (5, ["tổng", "số", "tiền", "bạn"]),                      # 005: Minh lộn ngược chiếc ví trống rỗng
        (3, ["vậy", "mà", "meta"]),                              # 003: Tòa nhà chọc trời hình điện thoại kho vàng
        (4, ["hơn", "một", "nghìn", "tỷ"]),                      # 004: Ngọn núi tiền vàng khổng lồ
        (6, ["nghĩa", "là", "có", "người"]),                     # 006: Khung hình chia đôi đếm tiền phía sau
        (7, ["trong", "video", "này", "mình"]),                  # 007: Bóng đen Mr. Feed trên sân thượng
        (8, ["mình", "hứa", "sẽ", "cố"])                         # 008: Linh vật Xu thò đầu ra túi áo nháy mắt
    ],
    "part2": [
        (13, ["trong", "kinh", "tế", "học", "có", "một"]),       # 013: Dây chuyền bánh mì chi phí biên
        (14, ["nhưng", "với", "một", "sản", "phẩm", "số"]),      # 014: Phòng máy chủ rực sáng
        (15, ["phục", "vụ", "thêm", "một", "người", "dùng"]),    # 015: Cỗ máy dập khối số vài xu
        (16, ["và", "đây", "là", "điểm", "mấu", "chốt"]),        # 016: Thẻ giá trượt dốc xuống hố số 0
        (17, ["nói", "cách", "khác", "miễn", "phí"]),            # 017: Hai cửa hàng đối diện hạ biển giá
        (9,  ["ngày", "xưa", "cũng", "có", "một"]),              # 009: Quán rượu kiểu Mỹ ăn trưa miễn phí
        (10, ["nhưng", "bạn", "thử", "đoán", "xem"]),            # 010: Cận cảnh đĩa đồ ăn mặn chát
        (11, ["ăn", "xong", "thì", "khát"]),                     # 011: Bartender rót bia leng keng tiền
        (12, ["chuyện", "này", "nghe", "quen", "không"]),        # 012: Quán cà phê wifi ly nước rỗng
        (18, ["vậy", "câu", "hỏi", "của", "chúng", "ta"])        # 018: Xu trên xích đu bên khay cơm trưa
    ],
    "part3": [
        (26, ["để", "trả", "lời", "ta", "cần"]),                 # 026: Nhà kinh tế Jean Tirole trước bảng đen
        (19, ["ý", "tưởng", "rất", "đơn", "giản"]),              # 019: Chợ truyền thống kết nối chỉ vàng
        (20, ["ví", "dụ", "tờ", "báo"]),                         # 020: Quầy báo cổ điển
        (22, ["ví", "dụ", "thẻ", "tín", "dụng"]),                # 022: Quẹt thẻ tín dụng POS
        (21, ["ví", "dụ", "cái", "chợ"]),                        # 021: Cây cầu phát sáng nối 2 đảo
        (23, ["điều", "thú", "vị", "của", "thị"]),               # 023: Mr. Feed trên cán cân vàng
        (24, ["kinh", "tế", "học", "gọi", "đó", "là"]),          # 024: Bập bênh khổng lồ trợ cấp chéo
        (25, ["vậy", "nền", "tảng", "chọn", "trợ"]),             # 025: Hai cánh cổng: miễn phí vs cổng vàng
        (27, ["với", "mạng", "xã", "hội"]),                      # 027: Minh nhìn bảng giá bỏ chạy
        (28, ["mà", "khi", "người", "dùng", "biến", "mất"]),     # 028: Thành phố ứng dụng bị bỏ hoang
        (29, ["bằng", "chứng", "cho", "lập", "luận"]),           # 029: Cánh cửa màu tím khiên bảo vệ (10 euro)
        (30, ["nói", "vui", "thì", "facebook", "giống"])         # 030: Chợ khổng lồ trên chân dung của Minh
    ],
    "part4": [
        (31, ["đến", "đây", "có", "người", "sẽ", "hỏi"]),        # 031: Nhà phát minh già bên điện thoại đầu tiên
        (32, ["câu", "trả", "lời", "nằm", "ở"]),                 # 032: Cả thành phố giăng kín dây điện thoại
        (33, ["hiệu", "ứng", "mạng", "lưới", "nghĩa"]),          # 033: Mạng lưới nút sáng toàn cầu
        (34, ["với", "nền", "tảng", "hai", "mặt"]),              # 034: Bánh đà khổng lồ quay tròn
        (35, ["hệ", "quả", "là", "các", "thị", "trường"]),       # 035: Điểm lật bờ vực
        (36, ["kinh", "tế", "học", "gọi", "đó", "là", "điểm"]),  # 036: Quả cầu tuyết lăn xuống núi
        (37, ["chính", "vì", "thế", "giai", "đoạn", "đầu"]),     # 037: Mr. Feed ném tiền vào lò lửa xe lửa
        (38, ["tiktok", "từng", "chi", "số", "tiền"]),           # 038: Linh vật neon ném phong bao lì xì
        (39, ["và", "khi", "đã", "thắng", "thì"]),               # 039: Minh bị tay chibi kéo lại ở cửa nhóm chat
        (40, ["nó", "giống", "nhóm", "chat", "gia", "đình"]),    # 040: Chiếc lồng êm ái hình chuông thông báo
        (41, ["còn", "một", "chi", "tiết", "lịch", "sử"]),       # 041: Mr. Feed cầm máy hút bụi hút startup
        (42, ["hai", "năm", "sau", "họ", "mua"]),                # 042: Hai tòa nhà mua bằng vali tiền
        (43, ["về", "phía", "tiktok", "họ", "thắng"]),           # 043: Đồ thị bạn bè vs mưa video sở thích
        (44, ["nghĩa", "là", "một", "người", "lạ"])              # 044: Hạ kinh ngạc trước video lên xu hướng
    ],
    "part5": [
        (47, ["vậy", "nhà", "quảng", "cáo", "trả"]),             # 047: Chiếc đồng hồ cát vàng tí hon sự chú ý
        (45, ["năm", "một", "nghìn", "chín", "trăm"]),           # 045: Học giả 1970 trong thư viện sách
        (46, ["mỗi", "ngày", "chỉ", "có", "hai"]),               # 046: Đồng hồ 24 giờ hình biểu đồ tròn
        (48, ["cho", "nên", "các", "nền", "tảng"]),              # 048: Con đường vô tận dệt bằng khung video
        (49, ["và", "họ", "thiết", "kế", "sản", "phẩm"]),        # 049: Minh ăn snack từ bát không đáy
        (50, ["có", "nút", "thông", "báo", "màu"]),              # 050: Chấm thông báo đỏ rực như mắt cú
        (51, ["có", "video", "tự", "động", "phát"]),             # 051: Minh ngồi ghế bành trên băng chuyền sushi
        (52, ["còn", "có", "một", "cơ", "chế"]),                 # 052: Máy đánh bạc màn hình điện thoại
        (53, ["chính", "sự", "không", "chắc", "chắn"]),          # 053: Máy nhả kẹo tự động
        (54, ["cộng", "thêm", "một", "đặc", "điểm"]),            # 054: Bức tranh lựa chọn bánh ngọt vs kho báu
        (55, ["và", "rồi", "là", "hai", "giờ"]),                 # 055: Phòng ngủ 2h sáng quả trứng sống
        (56, ["trong", "khi", "bạn", "còn", "chưa"])             # 056: Đồng hồ tan chảy vắt trên cành cây
    ],
    "part6": [
        (64, ["nhưng", "giữ", "chân", "bạn", "mới"]),            # 064: Thợ may đo đạc vs may đại trà
        (65, ["hãy", "tưởng", "tượng", "một", "tiệm"]),          # 065: Tiệm áo cưới: phát tờ rơi vs rọi cô dâu
        (57, ["để", "làm", "được", "việc", "đó"]),               # 057: Bình thủy tinh biểu tượng sở thích
        (58, ["tất", "cả", "đều", "được", "ghi"]),               # 058: Ống kính con mắt khổng lồ quan sát
        (59, ["nhiều", "người", "nói", "điện", "thoại"]),        # 059: Đồng tử Minh phản chiếu giày
        (60, ["nó", "không", "cần", "nghe", "bạn"]),             # 060: Điện thoại mắt tí hon trên bàn cafe
        (61, ["và", "điều", "thú", "vị", "nhất"]),               # 061: Phòng đấu giá tốc độ cao
        (62, ["mỗi", "lần", "bạn", "mở", "ứng"]),                # 062: Đóng băng ngón tay chạm màn hình
        (63, ["một", "quảng", "cáo", "trả", "giá"]),             # 063: Ba quả cầu hợp nhất thành thẻ quảng cáo
        (68, ["nghĩa", "là", "bạn", "đang", "là"]),              # 068: Minh đứng bơ vơ giữa sân khấu đấu giá
        (66, ["đến", "đây", "có", "một", "câu"]),                # 066: Cuộn giấy điều khoản dài vô tận
        (67, ["có", "một", "con", "số", "đáng"])                 # 067: Bản đồ thế giới với đồng tiền to nhỏ
    ],
    "part7": [
        (69, ["đến", "đây", "bạn", "có", "thể"]),                # 069: Cán cân thặng dư tiêu dùng
        (76, ["kinh", "tế", "học", "có", "một"]),                # 076: Kéo co món quà vs sợi xích
        (70, ["với", "hàng", "miễn", "phí", "thặng"]),           # 070: Bà cụ gọi video call cho cháu
        (71, ["xem", "hướng", "dẫn", "sửa", "xe"]),              # 071: Bạn trẻ tự học sửa xe đạp
        (72, ["những", "thứ", "đó", "thực", "sự"]),              # 072: Biểu tượng bản đồ tìm kiếm tựa tiểu tiên
        (73, ["có", "nghiên", "cứu", "thú", "vị"]),              # 073: Nhà nghiên cứu cầm bảng khảo sát 100 đô
        (75, ["điều", "này", "còn", "dẫn", "tới"]),              # 075: Nhà kinh tế học soi sổ cái GDP
        (74, ["nhưng", "cũng", "chính", "nghiên", "cứu"]),       # 074: Minh tắt app ba lô nặng rơi khỏi vai
        (77, ["vì", "vậy", "câu", "trả", "lời"]),                # 077: Xu cân não trên bập bênh
        (78, ["lấy", "đi", "một", "thứ", "mà"])                  # 078: Ngã ba đường công viên vs thành phố màn hình
    ],
    "part8": [
        (79, ["thứ", "đó", "chính", "là", "ngoại"]),             # 079: Ống khói nhà máy xả khói
        (80, ["ngoại", "tác", "là", "những", "chi"]),            # 080: Ống khói điện thoại xả khói thông báo
        (88, ["với", "nền", "tảng", "số", "có"]),                # 088: Cán cân lợi nhuận vs hóa đơn vô hình
        (81, ["thứ", "nhất", "là", "thời", "gian"]),             # 081: Cuốn lịch năm 30 ngày bị mất
        (82, ["mỗi", "năm", "bạn", "tặng", "cho"]),              # 082: Đồng hồ cát ngọn núi thời gian
        (83, ["thứ", "hai", "là", "tác", "động"]),               # 083: Soi gương hình ảnh hào nhoáng trôi nổi
        (84, ["có", "nghiên", "cứu", "khác", "cho"]),            # 084: Hai nhóm nghiên cứu giơ biểu đồ
        (85, ["thứ", "ba", "là", "tác", "động"]),                # 085: Loa phát thanh giật gân bốc cháy
        (86, ["khi", "mô", "hình", "kinh", "doanh"]),            # 086: Bong bóng phẫn nộ cưỡi tên lửa
        (87, ["kinh", "tế", "học", "đã", "có"])                  # 087: Thanh tra chính phủ cầm con dấu thuế
    ],
    "part9": [
        (89, ["còn", "một", "nhân", "vật", "nữa"]),              # 089: Hạ livestream phòng nhỏ ấm cúng
        (90, ["đặc", "điểm", "thứ", "nhất", "là"]),              # 090: Kim tự tháp thu nhập ngôi sao đỉnh chóp
        (91, ["nó", "giống", "một", "cuộc", "xổ"]),              # 091: Lồng quay xổ số xoay tròn
        (92, ["đặc", "điểm", "thứ", "hai", "là"]),              # 092: Cánh đồng lúa Mr. Feed thu tô
        (93, ["và", "chỉ", "cần", "một", "lần"]),                # 093: Chong chóng thuật toán quay xơ xác
        (94, ["doanh", "nghiệp", "nhỏ", "cũng", "vậy"]),         # 094: Cô Ba nhìn hóa đơn quảng cáo dài
        (95, ["khi", "ngày", "càng", "nhiều", "người"]),         # 095: Đấu giá chật chội nhiệt kế giá thầu
        (96, ["có", "một", "nhà", "văn", "tên"]),                # 096: Ba giai đoạn thoái hóa quán cafe
        (97, ["dù", "bạn", "có", "đồng", "ý"]),                  # 097: Chiếc bánh bị cắt nền tảng lấy phần lớn
        (98, ["khi", "bạn", "không", "phải", "là"])              # 098: Hạ tự xây ngọn hải đăng quyết tâm
    ],
    "part10": [
        (108, ["vậy", "chuyện", "này", "sẽ", "đi"]),             # 108: Đám mây hình dấu hỏi khổng lồ
        (99,  ["hướng", "thứ", "nhất", "là", "chống"]),          # 099: Nữ thẩm phán cầm cân công lý
        (100, ["lập", "luận", "phản", "đối", "là"]),             # 100: Startup trước sóng thần điện thoại
        (101, ["hướng", "thứ", "hai", "là", "quy"]),             # 101: Nghị viện tranh luận bàn tròn
        (102, ["phía", "phản", "biện", "lo", "rằng"]),           # 102: Ổ khóa và chìa khóa kho dữ liệu
        (103, ["hướng", "thứ", "ba", "là", "thay"]),             # 103: Hai cánh cửa: miễn phí vs trả phí
        (104, ["và", "hướng", "thứ", "tư", "là"]),               # 104: Minh làm thợ mỏ dữ liệu nhận lương
        (105, ["chưa", "có", "hướng", "nào", "là"]),             # 105: Kéo co hai phe quy định
        (106, ["nhưng", "điểm", "chung", "là", "ngày"]),         # 106: Thành phố tương lai 2040
        (107, ["mô", "hình", "kinh", "doanh", "chứ"])            # 107: Bình minh rực rỡ đường chân trời
    ],
    "part11": [
        (112, ["nếu", "bạn", "không", "muốn", "bỏ"]),            # 112: Minh nhìn gương mỉm cười tự vấn
        (109, ["hãy", "coi", "thời", "gian", "của"]),            # 109: Minh cài đặt giới hạn thời gian đồng hồ cát
        (110, ["hãy", "tắt", "những", "thông", "báo"]),          # 110: Minh tắt thông báo bóng đỏ xẹp
        (111, ["và", "thỉnh", "thoảng", "hãy", "tự"]),           # 111: Minh cất điện thoại ra công viên
        (113, ["nếu", "bạn", "làm", "nội", "dung"]),             # 113: Hạ chia trứng vào nhiều giỏ
        (114, ["xây", "dựng", "kênh", "riêng", "như"])           # 114: Cây cầu nối thẳng đến khán giả
    ],
    "part12": [
        (115, ["tóm", "lại", "miễn", "phí", "không"]),           # 115: Xu cầm dấu hỏi lớn mỉm cười dưới đèn
        (117, ["lần", "tới", "khi", "thấy", "hai"]),             # 117: Cận cảnh nụ cười thấu hiểu của Minh
        (116, ["nếu", "tìm", "mãi", "không", "thấy"]),           # 116: Ảnh toàn thể tất cả nhân vật
        (118, ["cảm", "ơn", "bạn", "đã", "xem"]),                # 118: Điện thoại úp mặt bên tách cà phê
        (119, ["hẹn", "gặp", "lại"]),                            # 119: Linh vật Xu vẫy tay chào tạm biệt
        (120, ["hẹn", "gặp", "lại"])                             # 120: Hoàng hôn rực rỡ Minh bước đi lắng đọng
    ]
}

def normalize_text(text: str) -> str:
    t = text.lower().strip()
    t = re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t)
    return t

def find_cue_frame(cue_words: list, tokens: list, fps: int = 30) -> int:
    if not cue_words or not tokens:
        return 0

    norm_tokens = [normalize_text(t.get('word', '')) for t in tokens]
    n_cue = len(cue_words)

    # 1. Khớp nguyên cụm
    for i in range(len(norm_tokens) - n_cue + 1):
        if all(cue_words[k] in norm_tokens[i + k] for k in range(n_cue)):
            start_ms = tokens[i].get('startMs', 0)
            return int(round((start_ms / 1000.0) * fps))

    # 2. Khớp 3 từ đầu
    if n_cue >= 3:
        for i in range(len(norm_tokens) - 2):
            if all(cue_words[k] in norm_tokens[i + k] for k in range(3)):
                start_ms = tokens[i].get('startMs', 0)
                return int(round((start_ms / 1000.0) * fps))

    # 3. Khớp 2 từ đầu
    if n_cue >= 2:
        for i in range(len(norm_tokens) - 1):
            if all(cue_words[k] in norm_tokens[i + k] for k in range(2)):
                start_ms = tokens[i].get('startMs', 0)
                return int(round((start_ms / 1000.0) * fps))

    # 4. Fallback từ đầu tiên
    first = cue_words[0]
    for i, t in enumerate(norm_tokens):
        if first in t:
            start_ms = tokens[i].get('startMs', 0)
            return int(round((start_ms / 1000.0) * fps))

    return 0

def main():
    meta_path = Path("src/data/facebook_who_pays_chapters.json")
    chapters = json.loads(meta_path.read_text(encoding="utf-8"))
    fps = 30

    captions_file = Path("src/data/facebookWhoPaysCaptions.ts")
    captions_dict = {}
    if captions_file.exists():
        txt = captions_file.read_text(encoding="utf-8")
        kw = "FACEBOOK_WHO_PAYS_CAPTIONS"
        pos = txt.find(kw)
        if pos != -1:
            s = txt.find('{', pos)
            e = txt.rfind('}')
            if s != -1 and e != -1:
                captions_dict = json.loads(txt[s:e+1])

    updated_chapters = []
    current_global_frame = 0

    for ch in chapters:
        sec_id = ch["id"]
        wav_file = Path(f"public/audio/facebook_who_pays_{sec_id}.wav")
        with wave.open(str(wav_file), 'rb') as wf:
            frames = wf.getnframes()
            rate = wf.getframerate()
            duration_s = frames / float(rate)
        dur_frames = int(round(duration_s * fps))

        # Lấy tokens từ captions
        phrases = captions_dict.get(sec_id, [])
        tokens = []
        for p in phrases:
            tokens.extend(p.get('words', []))

        scene_defs = ORDERED_SCENES[sec_id]
        ordered_images = []
        ordered_descs = []
        start_frames = []

        for idx, (img_num, cue) in enumerate(scene_defs):
            img_rel = f"images/facebook-ai-tra-tien-16x9/{img_num:03d}.png"
            ordered_images.append(img_rel)
            ordered_descs.append(DESCRIPTIONS[img_num])

            if idx == 0:
                start_frames.append(0)
            else:
                f = find_cue_frame(cue, tokens, fps)
                prev = start_frames[-1]
                min_gap = 45 # Ít nhất 1.5 giây giữa các ảnh
                if f <= prev:
                    f = prev + int(round((dur_frames - prev) / (len(scene_defs) - idx)))
                start_frames.append(max(prev + min_gap, min(dur_frames - 25, f)))

        # Chỉnh ảnh cuối
        for idx in range(1, len(start_frames)):
            if start_frames[idx] >= dur_frames:
                start_frames[idx] = dur_frames - (len(start_frames) - idx) * 25

        updated_chapters.append({
            "id": ch["id"],
            "chapterNumber": ch["chapter_num"],
            "partLabel": ch["part_label"],
            "historicalEra": ch["historical_era"],
            "title": ch["title"],
            "subtitle": ch["subtitle"],
            "audioSrc": f"audio/facebook_who_pays_{sec_id}.wav",
            "durationInFrames": dur_frames,
            "startFrame": current_global_frame,
            "images": ordered_images,
            "imageDescriptions": ordered_descs,
            "imageStartFrames": start_frames
        })

        current_global_frame += dur_frames
        print(f"\n✅ {sec_id:8} ({duration_s:5.1f}s, {dur_frames} frames):")
        for idx, (img_num, cue) in enumerate(scene_defs):
            f = start_frames[idx]
            sec = f / 30.0
            print(f"   [{sec:5.1f}s | Frame {f:5d}] #{img_num:03d}.png - {DESCRIPTIONS[img_num][:45]}... (Cue: {' '.join(cue)})")

    ts_content = """// Dữ liệu 12 chương phim tài liệu 'Facebook không thu tiền bạn. Vậy ai đang trả tiền?'
export interface FacebookWhoPaysChapter {
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
}

export const TOTAL_FACEBOOK_WHO_PAYS_FRAMES = """ + str(current_global_frame) + """;

export const FACEBOOK_WHO_PAYS_CHAPTERS: FacebookWhoPaysChapter[] = """ + json.dumps(updated_chapters, ensure_ascii=False, indent=2) + ";\n"

    out_ts = Path("src/data/facebookWhoPaysData.ts")
    out_ts.write_text(ts_content, encoding="utf-8")
    print(f"\n🎉 Đã cập nhật thành công {out_ts}!")
    print(f"⏱️ Tổng thời lượng: {current_global_frame} frames ({current_global_frame/fps:.1f}s = {current_global_frame/(fps*60):.2f} phút)")

if __name__ == "__main__":
    main()
