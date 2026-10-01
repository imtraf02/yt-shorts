# -*- coding: utf-8 -*-
"""
Script chuẩn bị dữ liệu cho video phân tích kinh tế học số:
'Facebook không thu tiền bạn. Vậy ai đang trả tiền? (Bản phân tích sâu)'
Bao gồm 12 phần, 120 hình ảnh 16x9 và mô tả phân cảnh tiếng Việt.
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

# 120 mô tả hình ảnh tiếng Việt tương ứng 120 prompts ảnh
IMAGE_DESCRIPTIONS = {
    # MỞ ĐẦU (1..8)
    1: "Minh lướt điện thoại ban đêm trong phòng ngủ ấm cúng, ánh sáng xanh hắt lên mặt",
    2: "Cận cảnh ngón tay lướt màn hình điện thoại với hàng loạt video ngắn đầy màu sắc",
    3: "Tòa nhà chọc trời khổng lồ hình chiếc điện thoại với kho vàng rực rỡ trên đỉnh",
    4: "Ngọn núi tiền vàng khổng lồ chạm tới mây trời lúc hoàng hôn",
    5: "Minh lộn ngược chiếc ví trống rỗng với vẻ mặt hoang mang hài hước",
    6: "Khung hình chia đôi: Minh lướt điện thoại và bàn tay mặc vest đếm tiền từ phía sau",
    7: "Bóng đen Mr. Feed đứng trên sân thượng nhìn xuống thành phố sáng đèn",
    8: "Linh vật đồng xu Xu thò đầu ra từ túi áo hoodie của Minh và nháy mắt tinh nghịch",

    # PHẦN 1 — VÌ SAO MỌI THỨ TRÊN MẠNG ĐỀU VỀ GIÁ KHÔNG (9..18)
    9: "Quán rượu kiểu Mỹ thế kỷ 19, biển vẽ đĩa thức ăn miễn phí, khách đông đúc",
    10: "Cận cảnh đĩa đồ ăn mặn chát, thực khách khát khô cổ cầm chiếc cốc rỗng",
    11: "Nhân viên pha chế rót bia liên tục, tiền xu rơi leng keng vào máy tính tiền",
    12: "Quán cà phê hiện đại, Minh ngồi ôm laptop với ly nước rỗng, chủ quán nhìn chằm chằm",
    13: "Dây chuyền sản xuất bánh mì, mỗi ổ bánh gắn thẻ giá chi phí nguyên liệu",
    14: "Phòng máy chủ rực sáng, ứng dụng nhân bản thành hàng ngàn bản sao gửi đi toàn cầu",
    15: "Cỗ máy khổng lồ dập ra các khối ứng dụng kỹ thuật số với chi phí vài xu",
    16: "Thẻ giá trượt dốc không phanh rơi xuống hố tròn số không rực sáng",
    17: "Hai cửa hàng đối diện nhau trên phố cùng hạ biển giá xuống số 0 trong căng thẳng",
    18: "Đồng xu Xu ngồi trên xích đu nhìn đầy nghi hoặc bên cạnh khay cơm trưa miễn phí",

    # PHẦN 2 — CÁI CHỢ CÓ HAI MẶT (19..30)
    19: "Chợ truyền thống Việt Nam nhộn nhịp, tiểu thương và người mua kết nối bằng chỉ vàng",
    20: "Quầy báo cổ điển, độc giả mua báo giá rẻ và nhà quảng cáo giương biển",
    21: "Cây cầu phát sáng khổng lồ nối hai hòn đảo: đảo người dùng và đảo biển quảng cáo",
    22: "Cảnh quẹt thẻ tín dụng tại cửa hàng, luồng sáng kết nối máy POS với ngân hàng",
    23: "Mr. Feed đứng trên cán cân vàng giữa đám đông người dùng và nhóm mặc vest cầm tiền",
    24: "Bập bênh khổng lồ: một bên nâng đám đông người dùng, một bên là chồng tiền vàng",
    25: "Hai cánh cổng: cổng miễn phí cho người dùng và cổng vàng thu vé cho nhà quảng cáo",
    26: "Nhà kinh tế học tóc bạc trước bảng đen vẽ mô hình thị trường hai mặt kết nối",
    27: "Minh nhìn thấy bảng giá thuê bao hàng tháng và hoảng hốt bỏ chạy cùng dòng người",
    28: "Thành phố ứng dụng bị bỏ hoang: phố xá trống vắng, nhà quảng cáo ngơ ngác",
    29: "Cánh cửa màu tím có biểu tượng khiên bảo vệ, Minh cầm ví ngập ngừng",
    30: "Cảnh siêu thực: chợ khổng lồ dựng các gian hàng ngay trên bức chân dung của Minh",

    # PHẦN 3 — VÌ SAO KẺ ĐẾN TRƯỚC THƯỜNG THẮNG LỚN (31..44)
    31: "Nhà phát minh già ngồi cô đơn bên chiếc điện thoại đầu tiên trên thế giới",
    32: "Cả thành phố giăng kín dây điện thoại, mọi người vui vẻ trò chuyện khắp nơi",
    33: "Mạng lưới các nút sáng kết nối mọi người trên toàn cầu theo cấp số nhân rực rỡ",
    34: "Bánh đà khổng lồ gồm người dùng, đồng xu và điện thoại quay tròn tạo lực xoáy",
    35: "Điểm lật bờ vực: các đối thủ bị bỏ lại, quả cầu sáng khổng lồ lăn nhanh về phía trước",
    36: "Quả cầu tuyết lăn xuống núi cuốn theo người dùng, nhà cửa và tiền bạc càng lăn càng lớn",
    37: "Mr. Feed xúc từng chồng tiền mặt ném vào lò lửa đốt đầu máy xe lửa đang lao vun vút",
    38: "Linh vật neon ném phong bao lì xì và hoa giấy vào đám đông người dùng mới",
    39: "Minh cố lẻn ra ngoài qua cửa nhóm chat gia đình nhưng bị bàn tay chibi kéo lại",
    40: "Chiếc lồng êm ái hình chuông thông báo có sofa và wifi, cửa mở nhưng không ai ra",
    41: "Mr. Feed cầm máy hút bụi khổng lồ hút các ứng dụng khởi nghiệp nhỏ vào khay",
    42: "Hai tòa nhà nhỏ hình máy ảnh và bong bóng trò chuyện được mua bằng vali tiền mặt",
    43: "Khung hình chia đôi: đồ thị bạn bè kết nối đối chiếu với cơn mưa video sở thích rơi xuống",
    44: "Hạ kinh ngạc trước màn hình khi pháo hoa nổ tung chúc mừng video lên xu hướng",

    # PHẦN 4 — THỨ HỌ THẬT SỰ BÁN (45..56)
    45: "Học giả thập niên 1970 trong thư viện sách, núi tài liệu vùi lấp nhân vật bóng đèn chú ý",
    46: "Đồng hồ 24 giờ hình biểu đồ tròn với các phần công việc và lát cắt chú ý mỏng manh",
    47: "Chiếc đồng hồ cát vàng tí hon giữa hai ngón tay, đám đông tí hon cố vớt từng hạt cát",
    48: "Con đường vô tận dệt bằng các khung video kéo dài lên tận trời xanh, Minh bước đi nhỏ bé",
    49: "Minh ăn snack từ chiếc bát không đáy, mỗi miếng ăn lại tự động đầy lên",
    50: "Chấm thông báo đỏ rực sáng như mắt cú trong đêm tối, Minh thẫn thờ nhìn màn hình",
    51: "Minh ngồi ghế bành lướt trên băng chuyền sushi chở đầy các khung hình video vô tận",
    52: "Máy đánh bạc với các cuộn quay là màn hình điện thoại, Minh giật cần gạt lấp lánh",
    53: "Máy nhả kẹo tự động rơi kẹo ngọt mỗi lần vuốt ngón tay, Minh ngập trong đống vỏ kẹo",
    54: "Bức tranh lựa chọn: lát bánh ngọt 'ngay bây giờ' đối chiếu với rương kho báu tương lai",
    55: "Phòng ngủ tối lúc 2 giờ sáng, Minh mải xem video làm bánh bên quả trứng sống nguội ngắt",
    56: "Cảnh mộng ảo với hàng chục chiếc đồng hồ hình điện thoại tan chảy vắt vẻo trên cành cây",

    # PHẦN 5 — HỌ BIẾT BẠN HƠN CẢ BẠN (57..68)
    57: "Bình thủy tinh khổng lồ chứa biểu tượng sở thích của Minh, Minh nhìn qua kính lúp",
    58: "Ống kính máy ảnh hình con mắt khổng lồ quan sát đám đông, mỗi người hiện bong bóng sở thích",
    59: "Cận cảnh đồng tử Minh phản chiếu quảng cáo đôi giày, Mr. Feed soi kính lúp ghi nhận",
    60: "Chiếc điện thoại nằm im trên bàn cà phê với đôi mắt tí hon tò mò quan sát cuộc trò chuyện",
    61: "Phòng đấu giá tốc độ cao, Ms. Ads và các nhà quảng cáo giơ bảng đấu giá hình bóng Minh",
    62: "Khoảnh khắc đóng băng: ngón tay Minh vừa chạm màn hình, hàng chục bàn tay đấu giá xuất hiện",
    63: "Ba quả cầu tiền tệ, con trỏ và ngôi sao hợp nhất thành thẻ quảng cáo trúng đích",
    64: "So sánh: thợ may đo đạc tỉ mỉ từng khách hàng đối chiếu xưởng may hàng loạt đại trà",
    65: "Cảnh phát tờ rơi bừa bãi đối chiếu với ánh đèn rọi chuẩn xác vào cô dâu tương lai",
    66: "Cuộn giấy điều khoản sử dụng dài vô tận trải dài chân trời với hai nút bấm duy nhất",
    67: "Bản đồ thế giới với các vùng tỏa sáng đồng tiền to nhỏ khác nhau, Minh nhìn đồng tiền của mình",
    68: "Minh đứng bơ vơ giữa sân khấu đấu giá trong ánh đèn rọi, xung quanh biển bảng giơ kín",

    # PHẦN 6 — VẬY RỐT CUỘC, AI ĐƯỢC LỢI? (69..78)
    69: "Cán cân thặng dư tiêu dùng: giá sẵn sàng trả cao hơn nhiều so với giá thực tế 0 đồng",
    70: "Cảnh ấm cúng bà cụ gọi video call cho người cháu ở phương xa bên tách trà chiều",
    71: "Bạn trẻ tự học sửa xe đạp qua video hướng dẫn chi tiết trên điện thoại trong xưởng nhỏ",
    72: "Biểu tượng bản đồ và tìm kiếm tựa tiểu tiên bay lượn hỗ trợ Minh lái xe trên phố",
    73: "Nhóm nhà nghiên cứu cầm bảng khảo sát với túi tiền 100 đô la lơ lửng hỏi người dùng",
    74: "Minh tắt ứng dụng mạng xã hội, chiếc ba lô nặng trĩu rơi khỏi vai, ánh nắng rực rỡ",
    75: "Nhà kinh tế học soi kính lúp vào sổ cái GDP có trang giấy trắng vô hình của tiện ích số",
    76: "Kéo co giữa một đầu là món quà lấp lánh và đầu kia là sợi xích nặng nề, Minh ở giữa",
    77: "Đồng xu Xu ngồi cân não trên bập bênh giữa trái tim hạnh phúc và đồng hồ thời gian",
    78: "Ngã ba đường: một lối rẽ vào công viên cây xanh, một lối vào thành phố màn hình neon",

    # PHẦN 7 — HÓA ĐƠN KHÔNG AI GỬI (79..88)
    79: "Ống khói nhà máy xả khói mù mịt lên ngôi làng nhỏ, ông chủ ngồi đếm lợi nhuận bên trong",
    80: "Cùng bố cục đó nhưng ống khói biến thành điện thoại xả khói thông báo vào từng mái nhà",
    81: "Cuốn lịch năm khổng lồ với 30 ô ngày bị gạch chéo mờ mịt, Minh bàng hoàng nhìn tháng đời mất đi",
    82: "Đồng hồ cát mỗi ngày rơi 2 giờ cát, tích tụ sau một năm thành cả ngọn núi thời gian",
    83: "Một người nhìn vào gương trong khi hình ảnh hào nhoáng của người khác trôi nổi xung quanh",
    84: "Hai nhóm nghiên cứu giơ biểu đồ kết quả trái ngược nhau với cái nhún vai của nhà khoa học",
    85: "Chiếc loa phát thanh tiêu đề giật gân làm bùng cháy ngọn lửa hoang mang, ngọn nến sự thật bị ngó lơ",
    86: "Bong bóng phẫn nộ cưỡi tên lửa lao vun vút bỏ xa bong bóng sự thật đang lững thững đi bộ",
    87: "Thanh tra chính phủ cầm con dấu thuế lớn tiến về phía nhà máy ống khói điện thoại",
    88: "Cán cân hiển thị lợi nhuận cho nền tảng một bên và tờ hóa đơn vô hình đè lên đầu người dùng",

    # PHẦN 8 — NGƯỜI THUÊ ĐẤT TRỒNG LÚA (89..98)
    89: "Hạ livestream quay video trong phòng nhỏ ấm cúng với đèn tròn và điện thoại trên chân đế",
    90: "Kim tự tháp thu nhập: đỉnh chóp nhỏ có ngôi sao đội vương miện, bên dưới là biển người nhỏ bé",
    91: "Lồng quay xổ số xoay tròn với khuôn mặt các nhà sáng tạo nội dung, Hạ chắp tay cầu may",
    92: "Cánh đồng lúa vàng óng, Hạ đội nón lá gặt lúa còn Mr. Feed trong bộ vest đến thu bao lúa",
    93: "Chong chóng gió thuật toán quay cuồng dữ dội, thửa ruộng của Hạ bỗng chốc xơ xác bụi mờ",
    94: "Cô Ba trong tiệm áo cưới nhìn vào hóa đơn chi phí quảng cáo dài dằng dặc với tiếng thở dài",
    95: "Đấu giá chật chội giữa các chủ tiệm tranh giành một khách hàng, nhiệt kế giá thầu tăng vọt",
    96: "Ba giai đoạn thoái hóa: quán cà phê ấm cúng, quán ngập áp phích, rồi quán chật ních ép giá",
    97: "Chiếc bánh bị cắt: nền tảng lấy phần lớn nhất, Hạ cầm mẩu bánh vụn mỉm cười cay đắng",
    98: "Hạ tự tay xây ngọn hải đăng nhỏ trên ghềnh đá, phía sau là mây bão nhưng ánh mắt quyết tâm",

    # PHẦN 9 — TƯƠNG LAI SẼ RA SAO? (99..108)
    99: "Nữ thẩm phán cầm cán cân công lý đối diện với người khổng lồ công nghệ trong phòng xử án",
    100: "Các startup nhỏ trên bờ biển trước con sóng thần khổng lồ hình điện thoại, hải đăng le lói",
    101: "Nghị viện trang nghiêm với các học giả tranh luận quanh bàn tròn, ổ khóa dữ liệu lơ lửng",
    102: "Ổ khóa và chìa khóa mở kho dữ liệu cá nhân, Minh tự hào nhận chìa khóa nắm quyền kiểm soát",
    103: "Hai cánh cửa: cửa miễn phí ngập quảng cáo và cửa trả phí yên tĩnh, Minh suy nghĩ kỹ càng",
    104: "Minh trong trang phục thợ mỏ tại mỏ dữ liệu cầm cuốc điện thoại, nhận phong bì lợi nhuận",
    105: "Kéo co giữa hai phe ủng hộ quy định và phản đối quy định, trạng thái cân bằng thận trọng",
    106: "Thành phố tương lai năm 2040 với màn hình lơ lửng và con người thong dong dạo bước",
    107: "Bình minh rực rỡ trên đường chân trời thành phố, ánh sáng dịu dàng và hy vọng",
    108: "Đám mây hình dấu hỏi khổng lồ trên bầu trời xanh, Minh ngước nhìn lên suy ngẫm",

    # PHẦN 10 — VẬY BẠN NÊN LÀM GÌ? (109..114)
    109: "Minh cài đặt giới hạn thời gian trên điện thoại, đồng hồ cát nhỏ hiển thị, phòng ngập nắng",
    110: "Minh tắt thông báo không cần thiết, những quả bóng đỏ xẹp dần như tàn pháo hoa tắt ngấm",
    111: "Minh cất điện thoại vào ngăn kéo và bước ra công viên ngập nắng cùng bạn bè rạng rỡ",
    112: "Minh nhìn vào gương mỉm cười tự vấn trước biểu tượng ứng dụng và dấu hỏi tự nhận thức",
    113: "Hạ cẩn thận chia trứng vào nhiều giỏ khác nhau: website riêng, email, cộng đồng",
    114: "Cây cầu gỗ nối thẳng từ Hạ đến khán giả của cô mà không cần nền tảng trung gian",

    # KẾT (115..120)
    115: "Đồng xu Xu cầm dấu hỏi lớn mỉm cười trước ống kính dưới ánh đèn spotlight duy nhất",
    116: "Bức ảnh toàn thể: Minh, Hạ, Cô Ba, Ms. Ads, Mr. Feed và Xu đứng bên nhau trên sân thượng",
    117: "Cận cảnh nụ cười thấu hiểu và tự tin của Minh trong ánh sáng ấm áp",
    118: "Chiếc điện thoại úp mặt xuống bàn bên cạnh tách cà phê nghi ngút khói và cửa sổ bình yên",
    119: "Linh vật Xu vẫy tay chào tạm biệt với những tia sáng lấp lánh xung quanh",
    120: "Hoàng hôn rực rỡ trên sân thượng với bóng dáng Minh thong thả bước đi, cái kết lắng đọng"
}

# 12 phần kịch bản chi tiết
PARTS = [
    {
        "id": "part1",
        "chapter_num": 1,
        "part_label": "MỞ ĐẦU",
        "historical_era": "NGHỊCH LÝ MIỄN PHÍ",
        "title": "Bữa Trưa Miễn Phí Đắt Nhất Hành Tinh",
        "subtitle": "Vì sao hai ứng dụng không tốn một xu lại sinh ra những đế chế nghìn tỷ đô la?",
        "img_start": 1,
        "img_end": 8,
        "paragraphs": [
            "Bạn dùng Facebook mỗi ngày. Bạn lướt TikTok mỗi tối. Tổng số tiền bạn đã trả cho hai ứng dụng này là: không đồng nào.",
            "Vậy mà Meta, công ty mẹ của Facebook, là một trong những công ty giá trị nhất hành tinh, hơn một nghìn tỷ đô la. Còn ByteDance, công ty đứng sau TikTok, cũng nằm trong nhóm những công ty khởi nghiệp giá trị nhất lịch sử. Không công ty nào sống được bằng lời cảm ơn của người dùng.",
            "Nghĩa là có người đang trả tiền. Chỉ có điều, người đó không phải bạn. Hoặc ít nhất, không phải bằng tiền.",
            "Trong video này, mình sẽ đi sâu hơn một chút. Không chỉ trả lời câu hỏi \"ai trả tiền\", mà còn trả lời những câu hỏi khó hơn: vì sao \"miễn phí\" gần như là kết cục tất yếu của kinh tế học số, vì sao các nền tảng này thắng lớn đến vậy, bạn thật sự được gì và mất gì, và ai là người thiệt thòi thầm lặng nhất.",
            "Mình hứa sẽ cố gắng không làm bạn tụt tâm trạng, dù sự thật hơi... nhột."
        ]
    },
    {
        "id": "part2",
        "chapter_num": 2,
        "part_label": "PHẦN 1",
        "historical_era": "KINH TẾ HỌC SỐ",
        "title": "Vì Sao Mọi Thứ Trên Mạng Đều Về Giá Không",
        "subtitle": "Chi phí biên bằng không và câu chuyện kinh điển về món ăn mặn trong quán rượu",
        "img_start": 9,
        "img_end": 18,
        "paragraphs": [
            "Trước khi nói về Facebook, ta cần hiểu một điều căn bản: vì sao giá của các sản phẩm số cứ trượt dần về không.",
            "Trong kinh tế học có một khái niệm gọi là chi phí biên. Hiểu đơn giản, đó là chi phí để sản xuất thêm một đơn vị. Nếu bạn làm bánh mì, mỗi ổ bánh thêm cần thêm bột, thêm điện, thêm công. Chi phí biên là khác không, và vì thế bạn phải bán có giá.",
            "Nhưng với một sản phẩm số thì khác. Khi Facebook đã xây xong hệ thống, việc phục vụ thêm một người dùng nữa gần như chỉ tốn vài xu tiền máy chủ. Chi phí biên gần bằng không.",
            "Và đây là điểm mấu chốt. Khi nhiều công ty cạnh tranh nhau, giá có xu hướng bị kéo xuống sát chi phí biên. Ai bán cao hơn thì khách sang bên kia. Kéo xuống mãi thì chạm đáy, và đáy đó là con số không.",
            "Nói cách khác, \"miễn phí\" không phải là lòng tốt của các ông chủ công nghệ. Nó là hệ quả của cạnh tranh và của một cấu trúc chi phí rất đặc biệt. Bạn có thể hình dung như vậy: chi phí để xây dựng thì cực lớn, chi phí để phục vụ thêm một người thì cực nhỏ. Cho nên thứ duy nhất còn lại để cạnh tranh là số lượng người dùng.",
            "Ngày xưa cũng có một chuyện tương tự. Nhiều quán rượu ở Mỹ treo biển: \"Ăn trưa miễn phí\". Khách kéo đến đông nghịt. Nhưng bạn thử đoán xem món ăn miễn phí đó có vị gì? Mặn. Rất mặn. Ăn xong thì khát, khát thì gọi bia. Và bia thì không miễn phí.",
            "Chuyện này nghe quen không? Giống như quán cà phê có wifi miễn phí. Bạn vào ngồi bốn tiếng, gọi đúng một ly, rồi tự hỏi vì sao chủ quán nhìn mình bằng ánh mắt đó.",
            "Vậy câu hỏi của chúng ta là: nếu Facebook là bữa trưa miễn phí, thì \"ly bia\" của họ là gì?"
        ]
    },
    {
        "id": "part3",
        "chapter_num": 3,
        "part_label": "PHẦN 2",
        "historical_era": "THỊ TRƯỜNG HAI MẶT",
        "title": "Cái Chợ Có Hai Mặt",
        "subtitle": "Nghệ thuật trợ cấp chéo và con số mười euro định giá quyền riêng tư",
        "img_start": 19,
        "img_end": 30,
        "paragraphs": [
            "Để trả lời, ta cần một công cụ phân tích gọi là thị trường hai mặt. Khái niệm này được phát triển bài bản bởi Jean Tirole, người sau đó đoạt giải Nobel Kinh tế năm hai nghìn không trăm mười bốn, cùng với các đồng nghiệp.",
            "Ý tưởng rất đơn giản. Có những nơi mà một bên trung gian đứng giữa hai nhóm người cần nhau. Ví dụ tờ báo: độc giả muốn đọc tin, nhà quảng cáo muốn độc giả nhìn thấy sản phẩm. Ví dụ thẻ tín dụng: người mua muốn quẹt thẻ, người bán muốn nhận tiền. Ví dụ cái chợ: người mua và người bán cần gặp nhau.",
            "Điều thú vị của thị trường hai mặt là cấu trúc giá không cần công bằng cho từng bên. Nền tảng có thể bán dưới giá vốn, thậm chí cho không một bên, miễn là bên còn lại trả đủ để bù lại. Kinh tế học gọi đó là trợ cấp chéo.",
            "Vậy nền tảng chọn trợ cấp cho bên nào? Câu trả lời là: bên nào nhạy cảm với giá hơn, và bên nào kéo theo giá trị cho bên còn lại.",
            "Với mạng xã hội, người dùng cực kỳ nhạy cảm với giá. Chỉ cần thu mười nghìn đồng mỗi tháng, phần lớn sẽ bỏ đi. Mà khi người dùng biến mất, nhà quảng cáo cũng chẳng còn lý do ở lại. Vậy nên nền tảng làm điều hợp lý nhất: cho người dùng vào cửa miễn phí, thu tiền phía nhà quảng cáo.",
            "Bằng chứng cho lập luận này rất thú vị. Năm hai nghìn không trăm hai mươi ba, Meta bắt đầu cho người dùng ở châu Âu một lựa chọn: trả khoảng mười euro mỗi tháng để dùng Facebook và Instagram không có quảng cáo dựa trên dữ liệu cá nhân. Nói cách khác, chính công ty đã tự định giá cho việc bạn không bị theo dõi. Và con số đó, đối với hầu hết chúng ta, không hề nhỏ. Đây là một trong những lần hiếm hoi bạn được nhìn thấy \"ly bia\" có bảng giá.",
            "Nói vui thì Facebook giống một cái chợ khổng lồ. Và trong cái chợ đó, bạn không phải người đi mua sắm. Bạn là cái chợ."
        ]
    },
    {
        "id": "part4",
        "chapter_num": 4,
        "part_label": "PHẦN 3",
        "historical_era": "QUY LUẬT KẺ THẮNG",
        "title": "Vì Sao Kẻ Đến Trước Thường Thắng Lớn",
        "subtitle": "Hiệu ứng mạng lưới, chi phí rời bỏ và chiến lược thâu tóm đối thủ",
        "img_start": 31,
        "img_end": 44,
        "paragraphs": [
            "Đến đây có người sẽ hỏi: nếu mô hình này hay như vậy, sao không có hàng trăm mạng xã hội ngang ngửa Facebook? Sao chỉ có vài cái tên thống trị?",
            "Câu trả lời nằm ở một khái niệm gọi là hiệu ứng mạng lưới.",
            "Hiệu ứng mạng lưới nghĩa là một sản phẩm càng có nhiều người dùng thì càng có giá trị đối với mỗi người dùng. Cái điện thoại đầu tiên trên thế giới vô dụng, vì bạn gọi cho ai? Đến khi cả thành phố có điện thoại, thì không có nó mới là chuyện lạ.",
            "Với nền tảng hai mặt, hiệu ứng này còn mạnh hơn, vì nó chạy qua lại giữa hai phía. Nhiều người dùng thì nhà quảng cáo kéo đến. Nhiều nhà quảng cáo thì nền tảng có tiền đầu tư, làm sản phẩm tốt hơn, kéo thêm người dùng. Vòng xoáy đó cứ thế quay.",
            "Hệ quả là các thị trường như thế có xu hướng \"kẻ thắng ăn hầu hết\". Ai vượt qua một ngưỡng nhất định sẽ tăng tốc rất nhanh, còn ai chưa qua ngưỡng thì chết dần. Kinh tế học gọi đó là điểm lật.",
            "Chính vì thế, giai đoạn đầu các nền tảng sẵn sàng đốt tiền. Lỗ hàng năm trời cũng không sao, miễn là giành được người dùng trước đối thủ. TikTok từng chi số tiền rất lớn cho quảng bá và thưởng cho người mới, chỉ để vượt qua ngưỡng đó.",
            "Và khi đã thắng thì có thêm một vũ khí thầm lặng: chi phí rời bỏ. Bạn có bao giờ muốn xóa Facebook, rồi nhớ ra nhóm gia đình, nhóm lớp, nhóm mua bán đồ cũ đều nằm trong đó không? Nó giống nhóm chat gia đình vậy. Bạn có thể rời đi, nhưng sẽ bị hỏi thăm trong ba năm liền.",
            "Còn một chi tiết lịch sử rất đáng nhớ. Năm hai nghìn không trăm mười hai, Facebook mua Instagram với giá khoảng một tỷ đô la, khi công ty đó chỉ có mười mấy nhân viên. Hai năm sau, họ mua WhatsApp với giá khoảng mười chín tỷ đô la. Lúc đó nhiều người cho rằng họ trả quá đắt. Nhưng nhìn từ góc độ kinh tế học mạng lưới, đó là cách rẻ nhất để loại bỏ những đối thủ có thể trở thành mối đe dọa. Bạn không cần thắng đối thủ, bạn chỉ cần mua họ.",
            "Về phía TikTok, họ thắng bằng một cách khác. Facebook xây dựa trên đồ thị bạn bè: bạn thấy gì phụ thuộc vào bạn quen ai. TikTok xây dựa trên đồ thị sở thích: bạn thấy gì phụ thuộc vào bạn xem gì. Nghĩa là một người lạ đăng video hay vẫn có thể lên hàng triệu lượt xem. Điều đó tạo ra nguồn nội dung dồi dào với chi phí rất thấp, và giúp họ vượt qua ngưỡng nhanh hơn nhiều so với các đàn anh."
        ]
    },
    {
        "id": "part5",
        "chapter_num": 5,
        "part_label": "PHẦN 4",
        "historical_era": "KINH TẾ HỌC CHÚ Ý",
        "title": "Thứ Họ Thật Sự Bán",
        "subtitle": "Herbert Simon, bát snack không đáy và cơ chế máy đánh bạc trong túi bạn",
        "img_start": 45,
        "img_end": 56,
        "paragraphs": [
            "Vậy nhà quảng cáo trả tiền để mua cái gì? Câu trả lời là: sự chú ý của bạn.",
            "Năm một nghìn chín trăm bảy mươi mốt, nhà kinh tế Herbert Simon, người sau này đoạt giải Nobel, đã viết một câu mà bây giờ đọc lại thấy như tiên tri. Đại ý là: sự giàu có về thông tin tạo ra sự nghèo nàn về chú ý. Thông tin càng nhiều thì thứ khan hiếm không còn là thông tin nữa, mà là khả năng để ý đến nó.",
            "Mỗi ngày chỉ có hai mươi bốn giờ. Trừ giờ ngủ, giờ làm, giờ ăn, phần còn lại rất ít. Trong kinh tế học, cái gì khan hiếm thì có giá. Và sự chú ý của con người là một trong những thứ khan hiếm nhất hiện nay.",
            "Cho nên các nền tảng cạnh tranh nhau không phải bằng giá, mà bằng việc giữ chân bạn lâu nhất có thể. Mỗi phút bạn ở lại là một phút quảng cáo được hiển thị. Mỗi phút bạn thoát ra là tiền chảy đi.",
            "Và họ thiết kế sản phẩm đúng theo logic đó. Bạn có để ý không? Không có trang cuối cùng. Bạn cuộn hoài cuộn mãi, không bao giờ tới đáy. Nó giống một bát snack không đáy. Có nút thông báo màu đỏ, vì màu đỏ khiến não bạn tưởng có chuyện gấp. Có video tự động phát tiếp, để bạn không phải quyết định gì cả.",
            "Còn có một cơ chế tinh vi hơn. Mỗi lần bạn vuốt, có thể bạn gặp một video cực hay, có thể bạn gặp một video chán. Bạn không biết trước. Các nhà nghiên cứu hành vi thường so sánh cơ chế phần thưởng bất định này với máy đánh bạc: chính sự không chắc chắn khiến ta muốn thử thêm lần nữa.",
            "Cộng thêm một đặc điểm của tâm lý con người, mà kinh tế học hành vi gọi là thiên lệch hiện tại. Ta có xu hướng ưu tiên niềm vui ngay bây giờ hơn lợi ích lớn hơn ở tương lai. Xem thêm một video thì sướng ngay lập tức, còn ngủ đủ giấc thì phải chờ đến sáng mai mới thấy. Kết quả là ta thua trong cuộc đấu này đến mức đáng thương.",
            "Và rồi là hai giờ sáng. Bạn đang xem một người xa lạ làm bánh, trong khi bạn còn chưa chắc biết luộc trứng."
        ]
    },
    {
        "id": "part6",
        "chapter_num": 6,
        "part_label": "PHẦN 5",
        "historical_era": "THAO TÚNG DỮ LIỆU",
        "title": "Họ Biết Bạn Hơn Cả Bạn",
        "subtitle": "Phiên đấu giá một phần nghìn giây và nghịch lý quyền riêng tư",
        "img_start": 57,
        "img_end": 68,
        "paragraphs": [
            "Nhưng giữ chân bạn mới chỉ là một nửa. Nửa còn lại là làm cho quảng cáo trúng đích.",
            "Nhà quảng cáo trả giá cao hơn rất nhiều cho việc đưa đúng thông điệp đến đúng người. Hãy tưởng tượng một tiệm áo cưới. Phát tờ rơi ngoài đường thì tờ rơi đến tay cả cậu bé mười lăm tuổi lẫn bà cụ tám mươi. Còn quảng cáo trên nền tảng số thì có thể chỉ hiện ra trước mắt những người đang tìm hiểu về đám cưới. Tiết kiệm hơn, hiệu quả hơn. Vì thế nền tảng bán được giá cao hơn.",
            "Để làm được việc đó, họ cần dữ liệu. Bạn xem video nào, xem bao lâu, dừng ở đâu, xem lại lần thứ hai không. Tất cả đều được ghi nhận, và đều là tín hiệu.",
            "Nhiều người nói: \"Điện thoại nghe lén mình, vừa nói về đôi giày là thấy quảng cáo giày.\" Thực ra nhiều khả năng họ không cần nghe lén. Bạn chỉ cần dừng lại ba giây ở một quảng cáo giày, hệ thống đã hiểu bạn quan tâm gì. Nó không cần nghe bạn nói. Nó chỉ cần quan sát bạn... im lặng.",
            "Và điều thú vị nhất là cách bán. Mỗi lần bạn mở ứng dụng, trong chưa đầy một giây, các nhà quảng cáo đã đấu giá với nhau để giành một chỗ trên màn hình của bạn. Nhưng cuộc đấu giá này không đơn giản là ai trả cao nhất thì thắng. Hệ thống còn cân nhắc xem khả năng bạn sẽ bấm vào là bao nhiêu, và quảng cáo đó có làm bạn khó chịu hay không. Một quảng cáo trả giá thấp hơn nhưng bạn rất muốn xem vẫn có thể thắng một quảng cáo trả giá cao nhưng bạn chán ngấy.",
            "Nghĩa là bạn đang là món hàng trong một phiên đấu giá mà chính bạn không được mời tham dự. Và không chỉ vậy, phản ứng của bạn còn là dữ liệu để phiên đấu giá lần sau chính xác hơn.",
            "Đến đây có một câu hỏi rất kinh tế học: nếu dữ liệu của bạn có giá trị như vậy, sao bạn lại cho không?",
            "Có ba lý do. Thứ nhất là bất đối xứng thông tin: bạn không biết dữ liệu của mình đáng giá bao nhiêu, còn nền tảng thì biết rất rõ. Thứ hai là bạn không thể đàm phán: điều khoản dài mấy chục trang, chỉ có nút \"đồng ý\" hoặc \"rời đi\". Thứ ba là cái mà các nhà nghiên cứu gọi là nghịch lý quyền riêng tư: hầu hết chúng ta nói rằng mình rất quan tâm đến quyền riêng tư, nhưng khi được hỏi giữa tiện lợi và riêng tư thì hành động lại chọn tiện lợi.",
            "Có một con số đáng suy ngẫm. Doanh thu trung bình mà Meta kiếm được từ mỗi người dùng ở Mỹ và Canada cao gấp nhiều lần so với người dùng ở khu vực châu Á. Lý do không phải vì người ở đó \"thông minh hơn\" hay \"dại hơn\". Đơn giản là nhà quảng cáo ở nơi thu nhập cao sẵn sàng trả nhiều hơn để tiếp cận bạn. Nói cách khác, giá của sự chú ý phụ thuộc vào túi tiền của người bị nhắm tới. Bạn ở đâu, bạn đáng giá chừng nấy."
        ]
    },
    {
        "id": "part7",
        "chapter_num": 7,
        "part_label": "PHẦN 6",
        "historical_era": "THẶNG DƯ TIÊU DÙNG",
        "title": "Vậy Rốt Cuộc, Ai Được Lợi?",
        "subtitle": "Thí nghiệm một trăm đô la và khoảng trống vô hình trong thước đo GDP",
        "img_start": 69,
        "img_end": 78,
        "paragraphs": [
            "Đến đây bạn có thể nghĩ: vậy là bị lợi dụng hoàn toàn rồi. Nhưng công bằng mà nói, câu chuyện phức tạp hơn thế.",
            "Kinh tế học có một khái niệm gọi là thặng dư người tiêu dùng. Nó là khoảng chênh lệch giữa số tiền bạn sẵn sàng trả và số tiền bạn thực sự trả. Nếu bạn sẵn sàng trả một trăm nghìn cho một thứ mà chỉ phải trả năm mươi nghìn, thì thặng dư của bạn là năm mươi nghìn.",
            "Với hàng miễn phí, thặng dư có thể rất lớn, vì bạn trả không đồng nào cho thứ bạn cho là có giá trị. Bản đồ, tìm kiếm, liên lạc với người thân ở xa, xem hướng dẫn sửa xe miễn phí: những thứ đó thực sự cải thiện cuộc sống.",
            "Có nghiên cứu thú vị về chuyện này. Một nhóm nhà kinh tế học ở Mỹ đã hỏi người dùng Facebook: phải trả bạn bao nhiêu tiền để bạn tắt tài khoản trong bốn tuần? Số tiền trung bình họ đưa ra vào khoảng một trăm đô la. Tức là với nhiều người, Facebook đáng giá hơn rất nhiều so với con số không mà họ trả.",
            "Điều này còn dẫn tới một điểm lạ trong thống kê. GDP, thước đo mà quốc gia nào cũng dùng, chỉ đếm những thứ có giao dịch bằng tiền. Một dịch vụ miễn phí mà cả tỷ người dùng mỗi ngày gần như không xuất hiện trong GDP. Các nhà kinh tế vẫn đang tranh luận cách đo giá trị của những thứ này cho công bằng.",
            "Nhưng cũng chính nghiên cứu đó cho thấy một mặt còn lại. Những người tạm ngưng dùng Facebook cho biết họ có xu hướng thấy dễ chịu hơn một chút, đồng thời ít theo dõi tin tức hơn. Nghĩa là thứ có giá trị lớn với ta không hẳn là thứ tốt cho ta. Đôi khi ta chỉ đang trả giá cao cho một thói quen.",
            "Vì vậy câu trả lời trung thực là: cả hai đều đúng. Nền tảng tạo ra giá trị thật, nhưng cũng lấy đi một thứ mà bạn không nhìn thấy trên hóa đơn."
        ]
    },
    {
        "id": "part8",
        "chapter_num": 8,
        "part_label": "PHẦN 7",
        "historical_era": "CHI PHÍ XÃ HỘI",
        "title": "Hóa Đơn Không Ai Gửi",
        "subtitle": "Ngoại tác tiêu cực: bảy trăm ba mươi giờ mỗi năm và bẫy phẫn nộ thuật toán",
        "img_start": 79,
        "img_end": 88,
        "paragraphs": [
            "Thứ đó chính là ngoại tác.",
            "Ngoại tác là những chi phí mà người khác gánh thay, nhưng không nằm trên hóa đơn. Ví dụ kinh điển là nhà máy xả khói. Nhà máy thu lợi nhuận, còn cả khu dân cư hít khói. Nếu nhà máy không phải trả cho khói đó, họ sẽ xả nhiều hơn mức xã hội mong muốn.",
            "Với nền tảng số, có ít nhất ba loại chi phí như vậy.",
            "Thứ nhất là thời gian và sự tập trung. Giả sử bạn dùng mạng xã hội hai giờ mỗi ngày. Nghe không nhiều đúng không? Nhưng nhân lên, hai giờ mỗi ngày, ba trăm sáu mươi lăm ngày, là bảy trăm ba mươi giờ mỗi năm. Tức là hơn ba mươi ngày. Mỗi năm, bạn tặng cho nền tảng trọn một tháng cuộc đời. Không lương, không thưởng, chỉ có vài trăm cái thông báo.",
            "Thứ hai là tác động lên tâm lý và xã hội. Ở đây mình muốn nói thật thà: bằng chứng khoa học còn tranh luận. Có nghiên cứu cho thấy dùng nhiều mạng xã hội liên quan đến lo âu và so sánh bản thân, đặc biệt ở người trẻ. Có nghiên cứu khác cho thấy tác động nhỏ hơn nhiều so với lời đồn. Điều chắc chắn hơn là thiết kế gây nghiện được tối ưu vì lợi nhuận, không phải vì sức khỏe của bạn.",
            "Thứ ba là tác động lên thông tin. Nội dung gây tức giận, gây sốc thường được chia sẻ nhiều hơn, mà chia sẻ nhiều nghĩa là ở lại lâu, ở lại lâu nghĩa là nhiều quảng cáo. Khi mô hình kinh doanh thưởng cho sự chú ý, thì thứ thu hút chú ý nhất sẽ thắng, dù nó đúng hay sai.",
            "Kinh tế học đã có cách nghĩ về chuyện này từ lâu. Với ô nhiễm, người ta đánh thuế lên người gây ô nhiễm để họ tính cả chi phí đó vào giá. Câu hỏi hiện nay là: có nên làm điều tương tự với nền tảng số hay không, và làm thế nào? Đó là một trong những cuộc tranh luận chính sách nóng nhất thế giới."
        ]
    },
    {
        "id": "part9",
        "chapter_num": 9,
        "part_label": "PHẦN 8",
        "historical_era": "QUYỀN LỰC ĐƠN PHƯƠNG",
        "title": "Người Thuê Đất Trồng Lúa",
        "subtitle": "Thị trường siêu sao, bão táp thuật toán và chu kỳ xuống cấp enshittification",
        "img_start": 89,
        "img_end": 98,
        "paragraphs": [
            "Còn một nhân vật nữa cần nhắc tới: người sáng tạo nội dung, và các doanh nghiệp nhỏ sống bằng nền tảng.",
            "Nền tảng cần nội dung để giữ chân người xem, nhưng họ không tự làm. Họ nhờ hàng triệu người sáng tạo làm giúp, rồi chia lại một phần doanh thu, qua quảng cáo, qua livestream bán hàng, qua các quỹ thưởng. Ở Việt Nam, bán hàng qua livestream và các cửa hàng trên TikTok đang phát triển rất nhanh, và nhiều người thực sự kiếm được thu nhập tốt.",
            "Nhưng có hai đặc điểm kinh tế học đáng chú ý.",
            "Đặc điểm thứ nhất là thị trường kiểu siêu sao. Thu nhập của người sáng tạo phân bố cực kỳ lệch: một nhóm nhỏ kiếm rất nhiều, phần đông kiếm rất ít. Nó giống một cuộc xổ số hơn là một nghề ổn định. Các nhà kinh tế đã mô tả hiện tượng này từ trước cả thời mạng xã hội, ở ngành ca hát và thể thao, và nền tảng số chỉ khuếch đại nó.",
            "Đặc điểm thứ hai là quyền lực đơn phương. Nền tảng tự quyết định thuật toán, tự quyết định chia bao nhiêu, và có thể thay đổi luật chơi bất cứ lúc nào. Nói vui thì nền tảng là chủ đất, còn người sáng tạo là người thuê đất trồng lúa. Trời nắng hay mưa, chủ đất vẫn thu tiền thuê. Và chỉ cần một lần cập nhật thuật toán, mảnh ruộng của bạn có thể vắng như chùa Bà Đanh.",
            "Doanh nghiệp nhỏ cũng vậy. Nhiều cửa hàng dựa hoàn toàn vào quảng cáo trên Facebook để tìm khách. Khi ngày càng nhiều người chen chân vào đấu giá cùng một nhóm khách hàng, giá quảng cáo tăng lên, và phần lợi nhuận bị bào mòn dần. Người chủ shop nhìn vào bảng chi phí quảng cáo mỗi tháng, rồi thở dài.",
            "Có một nhà văn tên Cory Doctorow đặt tên cho chu kỳ này là \"enshittification\", tạm dịch là \"xuống cấp hóa\". Ông mô tả ba giai đoạn. Lúc đầu, nền tảng đối xử rất tốt với người dùng để thu hút họ. Sau đó, họ bắt đầu bóp người dùng để phục vụ nhà quảng cáo và người bán. Cuối cùng, họ bóp cả nhà quảng cáo và người bán để đưa tiền về cho cổ đông. Kết quả là một sản phẩm ngày càng nhiều quảng cáo, ngày càng khó dùng, nhưng bạn vẫn ở lại vì... cả nhóm chat gia đình đang ở đó.",
            "Dù bạn có đồng ý hoàn toàn với cách nói này hay không, nó chỉ ra một điều thật: khi bạn không phải là người trả tiền, bạn không phải là người mà công ty phải chiều nhất."
        ]
    },
    {
        "id": "part10",
        "chapter_num": 10,
        "part_label": "PHẦN 9",
        "historical_era": "KỊCH BẢN TƯƠNG LAI",
        "title": "Tương Lai Sẽ Ra Sao?",
        "subtitle": "Bốn hướng giải pháp: chống độc quyền, luật dữ liệu, trả phí và chia cổ phần",
        "img_start": 99,
        "img_end": 108,
        "paragraphs": [
            "Vậy chuyện này sẽ đi về đâu? Hiện có vài hướng mà các nhà kinh tế, luật gia và chính phủ đang cân nhắc.",
            "Hướng thứ nhất là chống độc quyền. Các nhà quản lý ở nhiều nước đang xem xét việc các công ty lớn thâu tóm đối thủ nhỏ, như câu chuyện Instagram và WhatsApp, có làm hại cạnh tranh hay không. Lập luận ủng hộ là các nền tảng thống trị sẽ cản đường đổi mới. Lập luận phản đối là các thương vụ đó giúp sản phẩm phát triển nhanh hơn, và người dùng vẫn được dùng miễn phí. Ai đúng ai sai vẫn đang được tranh cãi.",
            "Hướng thứ hai là quy định về dữ liệu và minh bạch. Châu Âu đi đầu với các luật về bảo vệ dữ liệu cá nhân và trách nhiệm của nền tảng. Ý tưởng là buộc công ty phải cho bạn quyền kiểm soát nhiều hơn đối với dữ liệu của mình, và minh bạch hơn về cách thuật toán hoạt động. Phía phản biện lo rằng quy định nặng nề sẽ làm tăng chi phí, chỉ các công ty khổng lồ mới đủ sức tuân thủ, còn công ty nhỏ bị bóp nghẹt.",
            "Hướng thứ ba là thay đổi mô hình kinh doanh. Nếu bạn trả tiền trực tiếp, lợi ích của nền tảng sẽ gần với lợi ích của bạn hơn. Đó là lý do gói đăng ký không quảng cáo ngày càng phổ biến. Nhưng như đã nói, phần đông người dùng vẫn chọn miễn phí, vì con số không luôn có sức hút kỳ lạ.",
            "Và hướng thứ tư là một ý tưởng khá táo bạo: coi dữ liệu là một dạng lao động, để người dùng được chia phần khi dữ liệu của họ tạo ra lợi nhuận. Ý tưởng nghe hấp dẫn, nhưng việc định giá và thực thi rất khó, nên hiện vẫn chủ yếu nằm trên giấy.",
            "Chưa có hướng nào là câu trả lời hoàn hảo. Nhưng điểm chung là ngày càng nhiều người nhận ra \"miễn phí\" là một mô hình kinh doanh, chứ không phải một món quà."
        ]
    },
    {
        "id": "part11",
        "chapter_num": 11,
        "part_label": "PHẦN 10",
        "historical_era": "HÀNH ĐỘNG CỦA BẠN",
        "title": "Vậy Bạn Nên Làm Gì?",
        "subtitle": "Đặt ngân sách thời gian, tắt thông báo thừa và đa dạng hóa nguồn tài sản",
        "img_start": 109,
        "img_end": 114,
        "paragraphs": [
            "Nếu bạn không muốn bỏ hết mạng xã hội, cũng không sao. Chỉ cần một vài thay đổi nhỏ.",
            "Hãy coi thời gian của mình là một loại tiền, và đặt ngân sách cho nó. Nhiều điện thoại có sẵn tính năng giới hạn thời gian dùng ứng dụng. Hãy tắt những thông báo không cần thiết, vì thông báo là cánh tay dài nhất của nền tảng để kéo bạn quay lại. Và thỉnh thoảng hãy tự hỏi: mình đang mở app vì cần một thứ gì đó, hay vì tay mình tự động mở?",
            "Nếu bạn làm nội dung hay kinh doanh trên nền tảng, đừng đặt hết trứng vào một giỏ. Xây dựng kênh riêng như danh sách email, trang web, hay cộng đồng của mình, để nếu thuật toán đổi chiều, bạn vẫn còn khách hàng của chính mình."
        ]
    },
    {
        "id": "part12",
        "chapter_num": 12,
        "part_label": "LỜI KẾT",
        "historical_era": "THÔNG ĐIỆP ĐỌNG LẠI",
        "title": "Ai Đang Trả Tiền?",
        "subtitle": "Miễn phí không có nghĩa là không mất gì: bạn trả bằng thời gian, sự chú ý và dữ liệu",
        "img_start": 115,
        "img_end": 120,
        "paragraphs": [
            "Tóm lại: miễn phí không có nghĩa là không mất gì. Nó chỉ có nghĩa là bạn trả bằng thứ khác, thời gian, sự chú ý và dữ liệu.",
            "Lần tới khi thấy hai chữ \"miễn phí\", hãy hỏi đúng một câu: ai đang trả tiền? Nếu tìm mãi không thấy ai, thì có lẽ đó là bạn.",
            "Cảm ơn bạn đã xem. Hẹn gặp lại."
        ]
    }
]

def main():
    chapters = []
    for p in PARTS:
        img_list = []
        desc_list = []
        for i in range(p["img_start"], p["img_end"] + 1):
            img_rel = f"images/facebook-ai-tra-tien-16x9/{i:03d}.png"
            img_list.append(img_rel)
            desc_list.append(IMAGE_DESCRIPTIONS.get(i, f"Hình ảnh minh họa #{i:03d}"))

        full_text = "\n\n".join(p["paragraphs"])
        chapters.append({
            "id": p["id"],
            "chapter_num": p["chapter_num"],
            "part_label": p["part_label"],
            "historical_era": p["historical_era"],
            "title": p["title"],
            "subtitle": p["subtitle"],
            "word_count": len(full_text.split()),
            "paragraphs": p["paragraphs"],
            "text": full_text,
            "images": img_list,
            "image_descriptions": desc_list,
            "img_count": len(img_list)
        })

    out_file = Path("src/data/facebook_who_pays_chapters.json")
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(chapters, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã ghi nhận {len(chapters)} phần vào {out_file}")
    total_imgs = sum(c['img_count'] for c in chapters)
    total_words = sum(c['word_count'] for c in chapters)
    print(f"📊 Tổng số ảnh: {total_imgs} | Tổng số từ: {total_words}")

if __name__ == "__main__":
    main()
