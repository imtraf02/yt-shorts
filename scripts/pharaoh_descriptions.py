# -*- coding: utf-8 -*-
"""
Tạo danh sách 123 mô tả tiếng Việt chi tiết cho 123 ảnh minh họa
phim tài liệu: 'TẠI SAO PHARAOH NGỪNG XÂY KIM TỰ THÁP? BÍ MẬT ĐỀN KARNAK VÀ THUNG LŨNG CÁC VỊ VUA'
"""
import sys
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


PHARAOH_DESCRIPTIONS = [
    # PHẦN 1: MỞ BÀI (1 - 8)
    "Đại kim tự tháp Giza sừng sững giữa cồn cát vàng rực rỡ buổi hoàng hôn",
    "Hẻm núi Thung lũng các vị Vua câm lặng và hiểm trở giữa sa mạc Thebes",
    "Quần thể đền Karnak tráng lệ với hàng cột đá khổng lồ đón ánh ráng chiều",
    "Đối lập lịch sử: Lối vào hầm mộ ẩn giấu bên bờ Tây và đại đền thờ tráng lệ bên bờ Đông",
    "Biểu tượng chuyển giao: Kim tự tháp vàng biến hóa thành ổ khóa bí mật",
    "Dòng sông Nile huyền thoại uốn lượn qua sa mạc nuôi dưỡng nền văn minh cổ đại",
    "Bóng dáng uy nghi của pharaoh đội vương miện Nemes trước công trình cổ đại",
    "Cận cảnh những ký tự chữ tượng hình khắc sâu trên vách đá sa thạch nghìn năm",

    # PHẦN 2: THỜI ĐẠI HOÀNG KIM CỦA KIM TỰ THÁP (9 - 18)
    "Toàn cảnh đại công trường xây dựng kim tự tháp bậc thang Saqqara đầu tiên",
    "Kiến trúc sư Imhotep áo vải lanh trắng chăm chú nghiên cứu bản vẽ thiết kế trên đá",
    "Kim tự tháp bậc thang Saqqara vươn mình từng tầng bậc kiêu hãnh giữa trời xanh",
    "Hàng ngàn nhân công kéo khối đá vôi khổng lồ trên xe trượt gỗ qua bãi cát",
    "Kỹ thuật xây dựng đỉnh cao: Lắp ghép các khối đá nhẵn bóng cho chóp kim tự tháp",
    "Bộ ba đại kim tự tháp Giza hoàn mỹ rực sáng với lớp vỏ đá vôi trắng tinh khiết",
    "Pharaoh dang tay hướng về mặt trời trên đỉnh kim tự tháp đang hoàn thiện",
    "Đoàn xe bò và phu đá vận chuyển vật liệu đá từ mỏ xa về đại công trường",
    "Mỏ đá sa thạch nhộn nhịp: Thợ đục dùng nêm gỗ và đục đồng tách từng phiến đá",
    "Luồng sáng mặt trời chiếu rọi từ thiên đàng xuống đỉnh chóp mạ vàng Benben",

    # PHẦN 3: VẤN ĐỀ LỚN NHẤT: NHỮNG KẺ TRỘM MỘ (19 - 28)
    "Những kẻ trộm mộ cầm đuốc lẻn qua đường hầm kim tự tháp trong màn đêm u tối",
    "Cận cảnh khối đá niêm phong khổng lồ bị đục phá thô bạo bởi đạo tặc",
    "Căn phòng tang lễ hoàng gia trống rỗng, nắp quách đá vỡ tan và kho báu biến mất",
    "Cái bẫy lộ thiên: Kim tự tháp sừng sững trở thành tấm biển chỉ đường cho kẻ cướp",
    "Bản đồ mặt cắt kim tự tháp cho thấy mạng lưới hầm lừa và cạm bẫy bị vô hiệu hóa",
    "Kẻ trộm bí mật nấu chảy vàng ròng cướp từ lăng mộ thành từng thỏi thô",
    "Lính canh hoàng gia cầm giáo đứng trước lối vào lăng mộ nhưng bất lực bảo vệ",
    "Một pharaoh đau xót trầm ngâm nhìn về kim tự tháp của tiền nhân bị cướp bóc",
    "Hầm mộ kim tự tháp hoang tàn phủ đầy bụi cát sau nhiều thế kỷ bị xâm phạm",
    "Biểu tượng cân công lý Ma'at bị nghiêng: Lời nguyền trộm mộ và nỗi lo bất tử",

    # PHẦN 4: BÀI TOÁN KINH TẾ (29 - 34)
    "Quan thị thần trình bản cuộn ghi chép chi phí khổng lồ khiến pharaoh trầm tư",
    "Nông dân Ai Cập kiệt sức vì sưu thuế và nghĩa vụ lao dịch kéo dài triền miên",
    "Kho bạc hoàng gia với những hòm vàng vơi cạn dần sau các đợt đại công trình",
    "Kim tự tháp nhỏ bé và xuống cấp của các triều đại sau do cạn kiệt ngân khố",
    "Mô hình so sánh kích thước suy giảm rõ rệt của kim tự tháp qua các thời kỳ",
    "Biểu đồ cuộn giấy papyrus minh họa chi phí tăng vọt và nguồn thu ngân khố kiệt quệ",

    # PHẦN 5: Ý TƯỞNG ĐỘT PHÁ: TÁCH RIÊNG MỘ VÀ ĐỀN THỜ (35 - 41)
    "Pharaoh Thutmose I họp bàn kín cùng kiến trúc sư Ineni trong cung điện Thebes",
    "Kiến trúc sư Ineni giám sát bí mật việc khoét sâu hầm mộ vào vách đá sa mạc",
    "Bản vẽ phân tách: Nơi an nghỉ giấu kín trong lòng núi, đền tưởng niệm đặt nơi lộ thiên",
    "Lối vào hầm mộ vách đá được ngụy trang hoàn hảo thành sỏi đá tự nhiên",
    "Đền thờ tưởng niệm Hatshepsut uy nghiêm tựa lưng vào vách núi dựng đứng",
    "Mô hình phối cảnh 3D minh họa khoảng cách bờ Tây - bờ Đông sông Nile",
    "Ineni ghi lại lời thề danh dự: 'Ta một mình giám sát đào mộ, không ai thấy, không ai nghe'",

    # PHẦN 6: THUNG LŨNG CÁC VỊ VUA: GIẤU MÌNH TRONG LÒNG NÚI (42 - 55)
    "Đỉnh núi tự nhiên hình kim tự tháp al-Qurn che chở cho Thung lũng các vị Vua",
    "Lối vào hẹp tự nhiên dẫn vào thung lũng đá vôi khô cằn và hiểm trở",
    "Mặt cắt hầm mộ hoàng gia đâm sâu hàng trăm mét vào lòng núi đá sa thạch",
    "Nghệ nhân dùng đục đồng và búa gỗ tỉ mỉ đục khoét từng đường hầm trong bóng tối",
    "Ánh đuốc bập bùng soi rọi những bức bích họa rực rỡ sắc màu trong căn phòng mộ",
    "Bích họa trần mộ mô tả bầu trời sao đêm và hành trình thần Mặt Trời vượt cõi âm",
    "Các vị thần Anubis và Osiris dẫn đường cho linh hồn pharaoh bước vào cõi vĩnh hằng",
    "Quan tài đá granit nguyên khối chạm khắc hoa văn tinh xảo trong gian phòng sâu nhất",
    "Kỹ thuật ngụy trang tài tình: Cửa mộ được lấp đầy đá dăm tiệp màu vách núi",
    "Hệ thống bẫy hố sâu thẳng đứng ngăn chặn kẻ đột nhập bước tiếp vào gian trong",
    "Cửa đá giả và ngõ cụt đánh lừa phương hướng của bất kỳ kẻ xâm nhập trái phép",
    "Sơ đồ 3D các lăng mộ đan xen ngầm bên dưới thung lũng Thebes",
    "Vệ binh Medjay tuần tra trên đỉnh các rặng núi bao quanh thung lũng thiêng",
    "Thung lũng các vị Vua tĩnh mịch dưới bầu trời đêm ngàn sao rực sáng",

    # PHẦN 7: LÀNG DEIR EL-MEDINA (56 - 62)
    "Toàn cảnh ngôi làng biệt lập Deir el-Medina của các nghệ nhân hoàng gia",
    "Cuộc sống thường nhật yên bình của gia đình người thợ đá bên trong tường làng",
    "Nghệ nhân phác thảo bản vẽ trên mảnh gốm vỡ ostracon dưới ánh đèn dầu",
    "Người thợ kiểm tra cẩn thận ngọn đuốc thấm muối giúp giảm khói trong hầm mộ",
    "Đoàn lính gác hộ tống nhóm thợ vượt qua đèo núi đá đến công trường thung lũng",
    "Người quản đốc chấm công và ghi chép nhật ký lao động trên mảnh đá vôi",
    "Ngôi làng tĩnh lặng về đêm dưới sự canh phòng cẩn mật của quân đội hoàng gia",

    # PHẦN 8: CÁC VỤ TRỘM MỘ VÀ PHIÊN TÒA (63 - 71)
    "Kẻ trộm mộ cổ đại lẻn qua hố đào bí mật tiếp cận căn phòng lăng mộ",
    "Vụ bắt giữ quả tang nhóm đạo tặc đang mang đồ trang sức hoàng gia ra khỏi vách núi",
    "Phiên tòa xét xử nghiêm ngặt dưới quyền quan Vizier tại kinh đô Thebes",
    "Cuộn giấy cói Mayer ghi lại chi tiết lời khai và danh sách tài sản bị đánh cắp",
    "Kẻ trộm bị tra tấn bằng roi gậy để khai ra đồng phạm và đầu nậu tiêu thụ",
    "Mối liên kết ngầm giữa đạo tặc và một số quan chức đền thờ tha hóa",
    "Bản án nghiêm khắc: Kẻ chủ mưu bị xử phạt nặng trước sự chứng kiến của dân chúng",
    "Các giáo sĩ kiểm tra lại ấn niêm phong trên cửa các ngôi mộ bị xâm phạm",
    "Sự suy tàn của vương triều cuối thời Tân Vương quốc và làn sóng trộm mộ bùng phát",

    # PHẦN 9: TRƯỜNG HỢP NGOẠI LỆ: NGÔI MỘ TUTANKHAMUN (72 - 81)
    "Pharaoh trẻ tuổi Tutankhamun đăng quang mang biểu tượng quyền uy tối thượng",
    "Đoàn tùy tùng vội vã đưa thi hài Tutankhamun vào ngôi mộ nhỏ chưa hoàn thiện",
    "Đất đá từ công trường lăng mộ Ramses VI đổ xuống vô tình chôn vùi cửa mộ Tutankhamun",
    "Nhà khảo cổ học Howard Carter và cộng sự tìm thấy bậc đá đầu tiên năm 1922",
    "Howard Carter ghé mắt qua khe cửa và thốt lên: 'Tôi thấy những điều kỳ diệu!'",
    "Căn phòng tiền sảnh ngổn ngang cỗ xe vàng, ngai vàng và rương báu 3.000 năm",
    "Cận cảnh chiếc mặt nạ vàng ròng huyền thoại của pharaoh Tutankhamun",
    "Cỗ quan tài bằng vàng nguyên khối lấp lánh nguyên vẹn không tì vết",
    "Số phận đối nghịch: Vị vua đoản mệnh trở nên nổi tiếng nhất nhờ ngôi mộ nguyên vẹn",
    "Ánh sáng hiện đại rọi vào quá khứ, giải mã bí ẩn bảo tồn của thung lũng",

    # PHẦN 10: SỰ PHÔ TRƯƠNG CỦA ĐỀN KARNAK (82 - 89)
    "Toàn cảnh đại quần thể đền Karnak tráng lệ nhìn từ trên cao bên bờ Đông sông Nile",
    "Cổng Pylon đồ sộ đầu tiên với những cột cờ phấp phới đón chào khách hành hương",
    "Đại sảnh Hypostyle hùng vĩ với rừng cột đá sa thạch cao vút tận trời mây",
    "Ánh nắng ban mai xuyên qua các khe sáng trên trần sảnh tạo nên luồng hào quang",
    "Cận cảnh bức chạm nổi pharaoh dâng lễ vật lên đấng tối cao Amun-Re",
    "Hồ nước thiêng trong vắt bên trong đền Karnak dùng cho nghi lễ thanh tẩy của tư tế",
    "Cột tháp Obelisk đá hoa cương đỏ của Nữ hoàng Hatshepsut đâm thẳng lên trời",
    "Đại lễ Opet thiêng liêng: Thuyền thần rước tượng Amun diễu hành giữa tiếng reo hò",

    # PHẦN 11: QUY MÔ KHỔNG LỒ CỦA MỘT THÀNH PHỐ ĐỀN THỜ (90 - 100)
    "Mỗi triều đại pharaoh tiếp nối lại xây thêm cổng, tường và cột đá vào Karnak",
    "Hàng ngàn phu phen và nghệ nhân chung tay dựng cột đá sa thạch khổng lồ",
    "Thợ điêu khắc đứng trên giàn giáo chạm trổ chữ tượng hình và danh hiệu pharaoh",
    "Hồ nước thiêng lấp lánh phản chiếu bóng các đền thờ và tượng thần uy nghiêm",
    "Tượng thần bọ hung Khepri bằng đá granit khổng lồ bên bờ hồ linh thiêng",
    "Bức tường đá ghi lại bản hòa ước quốc tế đầu tiên trong lịch sử giữa Ramses II và Hittite",
    "Bản đồ phối cảnh phân khu phức hợp: Khu vực Amun, Mut và Montu",
    "Hàng trăm tư tế áo trắng thanh tịnh tiến hành nghi lễ ban mai trong đền",
    "Cận cảnh hoa văn rực rỡ sơn khoáng chất trên đầu cột hoa sen và hoa cói",
    "Đại lộ nhân sư đầu cừu uy nghi dẫn lối từ bờ sông vào thẳng cổng đền",
    "Cổng đền Pylon đồ sộ rực sáng trong ánh lửa đuốc nghi lễ lúc chập tối",

    # PHẦN 12: NGUỒN TIỀN CHO KARNAK: THUẾ VÀ CHIẾN LỢI PHẨM (101 - 108)
    "Pharaoh cưỡi chiến xa dẫn đầu đoàn quân khải hoàn mang theo vô số chiến lợi phẩm",
    "Binh lính dỡ rương vàng bạc, châu báu và cống phẩm ngoại quốc vào kho đền Karnak",
    "Quan chép sử ghi chép thuế ngũ cốc và sản vật của nông dân dọc thung lũng sông Nile",
    "Chiến trận ác liệt với chiến xa dũng mãnh bảo vệ cương thổ và của cải đế chế",
    "Vòng tuần hoàn kinh tế: Chiến tranh mang về của cải, của cải dâng cúng xây đền",
    "Pharaoh quỳ gối dâng chiến lợi phẩm tạ ơn thần Amun-Re ban cho thắng trận",
    "Bức chạm khắc phù điêu tái hiện chiến dịch quân sự lẫy lừng của pharaoh",
    "Kho lương thực đền thờ chứa đầy ngũ cốc, dầu ô liu và của cải dồi dào",

    # PHẦN 13: QUYỀN LỰC TƯ TẾ VÀ CUỘC KHỦNG HOẢNG TÔN GIÁO (109 - 117)
    "Giới đại tư tế Amun quyền lực trong áo choàng da báo và trang sức vàng lộng lẫy",
    "Thế đối đầu ngấm ngầm giữa quyền uy pharaoh và thế lực tư tế ngày càng bành trướng",
    "Đất đai và điền trang bạt ngàn thuộc quyền sở hữu riêng của đền thờ Karnak",
    "Pharaoh dị giáo Akhenaten quay lưng với Karnak, quyết định cải cách tôn giáo",
    "Công trường xây dựng thủ đô mới Amarna với đền thờ thần Mặt Trời Aten lộ thiên",
    "Đĩa mặt trời Aten tỏa muôn vàn tia sáng mang bàn tay ban phước lành",
    "Công trường Karnak bị đình trệ, giàn giáo bỏ hoang dưới triều đại Akhenaten",
    "Biểu tượng hai vương miện hoàng gia và tôn giáo đối đầu trong tranh giành quyền lực",
    "Người dân và nghệ nhân phục hồi lại truyền thống Amun tại Karnak sau thời Akhenaten",

    # PHẦN 14: HAI CÔNG TRÌNH, MỘT CÂU CHUYỆN (118 - 123)
    "Sợi chỉ vàng kết nối: Một bên là hầm mộ ẩn giấu, một bên là đền thờ vươn cao",
    "Chiếc cân lịch sử cân bằng giữa nơi an nghỉ vĩnh hằng và nơi phô trương quyền lực",
    "Bình minh trên sông Nile: Bờ Tây tĩnh lặng của cõi chết và bờ Đông rực rỡ của sự sống",
    "Du khách hiện đại bước đi trong tôn kính giữa rừng cột đá ngàn năm tuổi",
    "Toàn cảnh vùng đất Thebes huyền thoại nối liền quá khứ rực rỡ và hiện tại",
    "Tia nắng đầu ngày chiếu sáng những dòng chữ tượng hình lưu giữ bí mật ngàn năm"
]

print(f"Tổng số mô tả ảnh: {len(PHARAOH_DESCRIPTIONS)}")
