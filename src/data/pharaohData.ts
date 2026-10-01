// Dữ liệu 14 chương phim tài liệu 'Tại sao Pharaoh ngừng xây Kim tự tháp? Bí mật đền Karnak và Thung lũng các vị Vua'
export interface PharaohChapter {
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

export const PHARAOH_CHAPTERS: PharaohChapter[] = [
  {
    "id": "part1",
    "chapterNumber": 1,
    "partLabel": "PHẦN 1",
    "historicalEra": "2600 TCN - 1000 TCN · TỔNG QUAN",
    "title": "Mở Đầu: Nghịch Lý Sa Mạc Ai Cập",
    "subtitle": "Bí ẩn giữa kim tự tháp bị bỏ rơi và đại đền Karnak tráng lệ",
    "audioSrc": "audio/pharaoh_part1.wav",
    "durationInFrames": 2065,
    "startFrame": 0,
    "images": [
      "images/pharaoh-pyramids/001.png",
      "images/pharaoh-pyramids/002.png",
      "images/pharaoh-pyramids/003.png",
      "images/pharaoh-pyramids/004.png",
      "images/pharaoh-pyramids/005.png",
      "images/pharaoh-pyramids/006.png",
      "images/pharaoh-pyramids/007.png",
      "images/pharaoh-pyramids/008.png"
    ],
    "imageDescriptions": [
      "Đại kim tự tháp Giza sừng sững giữa cồn cát vàng rực rỡ buổi hoàng hôn",
      "Hẻm núi Thung lũng các vị Vua câm lặng và hiểm trở giữa sa mạc Thebes",
      "Quần thể đền Karnak tráng lệ với hàng cột đá khổng lồ đón ánh ráng chiều",
      "Đối lập lịch sử: Lối vào hầm mộ ẩn giấu bên bờ Tây và đại đền thờ tráng lệ bên bờ Đông",
      "Biểu tượng chuyển giao: Kim tự tháp vàng biến hóa thành ổ khóa bí mật",
      "Dòng sông Nile huyền thoại uốn lượn qua sa mạc nuôi dưỡng nền văn minh cổ đại",
      "Bóng dáng uy nghi của pharaoh đội vương miện Nemes trước công trình cổ đại",
      "Cận cảnh những ký tự chữ tượng hình khắc sâu trên vách đá sa thạch nghìn năm"
    ],
    "imageStartFrames": [
      0,
      242,
      719,
      824,
      1629,
      1734,
      1839,
      1944
    ]
  },
  {
    "id": "part2",
    "chapterNumber": 2,
    "partLabel": "PHẦN 2",
    "historicalEra": "CỔ VƯƠNG QUỐC · THẾ KỶ 27 - 25 TCN",
    "title": "Thời Đại Hoàng Kim Của Kim Tự Tháp",
    "subtitle": "Từ kiến trúc sư Imhotep đến đại kỳ quan Giza vươn tới thần linh",
    "audioSrc": "audio/pharaoh_part2.wav",
    "durationInFrames": 2600,
    "startFrame": 2065,
    "images": [
      "images/pharaoh-pyramids/009.png",
      "images/pharaoh-pyramids/010.png",
      "images/pharaoh-pyramids/011.png",
      "images/pharaoh-pyramids/012.png",
      "images/pharaoh-pyramids/013.png",
      "images/pharaoh-pyramids/014.png",
      "images/pharaoh-pyramids/015.png",
      "images/pharaoh-pyramids/016.png",
      "images/pharaoh-pyramids/017.png",
      "images/pharaoh-pyramids/018.png"
    ],
    "imageDescriptions": [
      "Toàn cảnh đại công trường xây dựng kim tự tháp bậc thang Saqqara đầu tiên",
      "Kiến trúc sư Imhotep áo vải lanh trắng chăm chú nghiên cứu bản vẽ thiết kế trên đá",
      "Kim tự tháp bậc thang Saqqara vươn mình từng tầng bậc kiêu hãnh giữa trời xanh",
      "Hàng ngàn nhân công kéo khối đá vôi khổng lồ trên xe trượt gỗ qua bãi cát",
      "Kỹ thuật xây dựng đỉnh cao: Lắp ghép các khối đá nhẵn bóng cho chóp kim tự tháp",
      "Bộ ba đại kim tự tháp Giza hoàn mỹ rực sáng với lớp vỏ đá vôi trắng tinh khiết",
      "Pharaoh dang tay hướng về mặt trời trên đỉnh kim tự tháp đang hoàn thiện",
      "Đoàn xe bò và phu đá vận chuyển vật liệu đá từ mỏ xa về đại công trường",
      "Mỏ đá sa thạch nhộn nhịp: Thợ đục dùng nêm gỗ và đục đồng tách từng phiến đá",
      "Luồng sáng mặt trời chiếu rọi từ thiên đàng xuống đỉnh chóp mạ vàng Benben"
    ],
    "imageStartFrames": [
      0,
      260,
      515,
      780,
      1040,
      1302,
      1563,
      1820,
      2142,
      2340
    ]
  },
  {
    "id": "part3",
    "chapterNumber": 3,
    "partLabel": "PHẦN 3",
    "historicalEra": "TRUNG VƯƠNG QUỐC · THẾ KỶ 22 - 18 TCN",
    "title": "Vấn Đề Lớn Nhất: Những Kẻ Trộm Mộ",
    "subtitle": "Khi biểu tượng bất tử trở thành mục tiêu béo bở của đạo tặc",
    "audioSrc": "audio/pharaoh_part3.wav",
    "durationInFrames": 2519,
    "startFrame": 4665,
    "images": [
      "images/pharaoh-pyramids/019.png",
      "images/pharaoh-pyramids/020.png",
      "images/pharaoh-pyramids/021.png",
      "images/pharaoh-pyramids/022.png",
      "images/pharaoh-pyramids/023.png",
      "images/pharaoh-pyramids/024.png",
      "images/pharaoh-pyramids/025.png",
      "images/pharaoh-pyramids/026.png",
      "images/pharaoh-pyramids/027.png",
      "images/pharaoh-pyramids/028.png"
    ],
    "imageDescriptions": [
      "Những kẻ trộm mộ cầm đuốc lẻn qua đường hầm kim tự tháp trong màn đêm u tối",
      "Cận cảnh khối đá niêm phong khổng lồ bị đục phá thô bạo bởi đạo tặc",
      "Căn phòng tang lễ hoàng gia trống rỗng, nắp quách đá vỡ tan và kho báu biến mất",
      "Cái bẫy lộ thiên: Kim tự tháp sừng sững trở thành tấm biển chỉ đường cho kẻ cướp",
      "Bản đồ mặt cắt kim tự tháp cho thấy mạng lưới hầm lừa và cạm bẫy bị vô hiệu hóa",
      "Kẻ trộm bí mật nấu chảy vàng ròng cướp từ lăng mộ thành từng thỏi thô",
      "Lính canh hoàng gia cầm giáo đứng trước lối vào lăng mộ nhưng bất lực bảo vệ",
      "Một pharaoh đau xót trầm ngâm nhìn về kim tự tháp của tiền nhân bị cướp bóc",
      "Hầm mộ kim tự tháp hoang tàn phủ đầy bụi cát sau nhiều thế kỷ bị xâm phạm",
      "Biểu tượng cân công lý Ma'at bị nghiêng: Lời nguyền trộm mộ và nỗi lo bất tử"
    ],
    "imageStartFrames": [
      0,
      155,
      504,
      756,
      1008,
      1260,
      1511,
      1763,
      2015,
      2267
    ]
  },
  {
    "id": "part4",
    "chapterNumber": 4,
    "partLabel": "PHẦN 4",
    "historicalEra": "CUỐI CỔ VƯƠNG QUỐC · KHỦNG HOẢNG KINH TẾ",
    "title": "Bài Toán Kinh Tế & Khủng Hoảng Ngân Sách",
    "subtitle": "Gánh nặng xây dựng hàng chục năm vắt kiệt nguồn lực quốc gia",
    "audioSrc": "audio/pharaoh_part4.wav",
    "durationInFrames": 1254,
    "startFrame": 7184,
    "images": [
      "images/pharaoh-pyramids/029.png",
      "images/pharaoh-pyramids/030.png",
      "images/pharaoh-pyramids/031.png",
      "images/pharaoh-pyramids/032.png",
      "images/pharaoh-pyramids/033.png",
      "images/pharaoh-pyramids/034.png"
    ],
    "imageDescriptions": [
      "Quan thị thần trình bản cuộn ghi chép chi phí khổng lồ khiến pharaoh trầm tư",
      "Nông dân Ai Cập kiệt sức vì sưu thuế và nghĩa vụ lao dịch kéo dài triền miên",
      "Kho bạc hoàng gia với những hòm vàng vơi cạn dần sau các đợt đại công trình",
      "Kim tự tháp nhỏ bé và xuống cấp của các triều đại sau do cạn kiệt ngân khố",
      "Mô hình so sánh kích thước suy giảm rõ rệt của kim tự tháp qua các thời kỳ",
      "Biểu đồ cuộn giấy papyrus minh họa chi phí tăng vọt và nguồn thu ngân khố kiệt quệ"
    ],
    "imageStartFrames": [
      0,
      209,
      418,
      627,
      836,
      1045
    ]
  },
  {
    "id": "part5",
    "chapterNumber": 5,
    "partLabel": "PHẦN 5",
    "historicalEra": "TÂN VƯƠNG QUỐC · THỜI VUA THUTMOSE I",
    "title": "Ý Tưởng Đột Phá: Tách Biệt Mộ Và Đền Thờ",
    "subtitle": "Pharaoh Thutmose I và quyết định táo bạo thay đổi truyền thống ngàn năm",
    "audioSrc": "audio/pharaoh_part5.wav",
    "durationInFrames": 2300,
    "startFrame": 8438,
    "images": [
      "images/pharaoh-pyramids/035.png",
      "images/pharaoh-pyramids/036.png",
      "images/pharaoh-pyramids/037.png",
      "images/pharaoh-pyramids/038.png",
      "images/pharaoh-pyramids/039.png",
      "images/pharaoh-pyramids/040.png",
      "images/pharaoh-pyramids/041.png"
    ],
    "imageDescriptions": [
      "Pharaoh Thutmose I họp bàn kín cùng kiến trúc sư Ineni trong cung điện Thebes",
      "Kiến trúc sư Ineni giám sát bí mật việc khoét sâu hầm mộ vào vách đá sa mạc",
      "Bản vẽ phân tách: Nơi an nghỉ giấu kín trong lòng núi, đền tưởng niệm đặt nơi lộ thiên",
      "Lối vào hầm mộ vách đá được ngụy trang hoàn hảo thành sỏi đá tự nhiên",
      "Đền thờ tưởng niệm Hatshepsut uy nghiêm tựa lưng vào vách núi dựng đứng",
      "Mô hình phối cảnh 3D minh họa khoảng cách bờ Tây - bờ Đông sông Nile",
      "Ineni ghi lại lời thề danh dự: 'Ta một mình giám sát đào mộ, không ai thấy, không ai nghe'"
    ],
    "imageStartFrames": [
      0,
      161,
      657,
      986,
      1314,
      1643,
      1971
    ]
  },
  {
    "id": "part6",
    "chapterNumber": 6,
    "partLabel": "PHẦN 6",
    "historicalEra": "TÂN VƯƠNG QUỐC · THẾ KỶ 16 - 11 TCN",
    "title": "Thung Lũng Các Vị Vua: Giấu Mình Trong Lòng Núi",
    "subtitle": "Những hầm mộ khoét sâu vào vách đá câm lặng bên bờ tây sông Nile",
    "audioSrc": "audio/pharaoh_part6.wav",
    "durationInFrames": 3254,
    "startFrame": 10738,
    "images": [
      "images/pharaoh-pyramids/042.png",
      "images/pharaoh-pyramids/043.png",
      "images/pharaoh-pyramids/044.png",
      "images/pharaoh-pyramids/045.png",
      "images/pharaoh-pyramids/046.png",
      "images/pharaoh-pyramids/047.png",
      "images/pharaoh-pyramids/048.png",
      "images/pharaoh-pyramids/049.png",
      "images/pharaoh-pyramids/050.png",
      "images/pharaoh-pyramids/051.png",
      "images/pharaoh-pyramids/052.png",
      "images/pharaoh-pyramids/053.png",
      "images/pharaoh-pyramids/054.png",
      "images/pharaoh-pyramids/055.png"
    ],
    "imageDescriptions": [
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
      "Thung lũng các vị Vua tĩnh mịch dưới bầu trời đêm ngàn sao rực sáng"
    ],
    "imageStartFrames": [
      0,
      232,
      1729,
      1834,
      1939,
      2044,
      2149,
      2254,
      2359,
      2464,
      2569,
      2674,
      2789,
      3022
    ]
  },
  {
    "id": "part7",
    "chapterNumber": 7,
    "partLabel": "PHẦN 7",
    "historicalEra": "LÀNG THỢ DEIR EL-MEDINA · TÂN VƯƠNG QUỐC",
    "title": "Những Người Thợ Bí Mật Ở Deir El-Medina",
    "subtitle": "Ngôi làng biệt lập của những nghệ nhân nắm giữ bí mật hoàng gia",
    "audioSrc": "audio/pharaoh_part7.wav",
    "durationInFrames": 1282,
    "startFrame": 13992,
    "images": [
      "images/pharaoh-pyramids/056.png",
      "images/pharaoh-pyramids/057.png",
      "images/pharaoh-pyramids/058.png",
      "images/pharaoh-pyramids/059.png",
      "images/pharaoh-pyramids/060.png",
      "images/pharaoh-pyramids/061.png",
      "images/pharaoh-pyramids/062.png"
    ],
    "imageDescriptions": [
      "Toàn cảnh ngôi làng biệt lập Deir el-Medina của các nghệ nhân hoàng gia",
      "Cuộc sống thường nhật yên bình của gia đình người thợ đá bên trong tường làng",
      "Nghệ nhân phác thảo bản vẽ trên mảnh gốm vỡ ostracon dưới ánh đèn dầu",
      "Người thợ kiểm tra cẩn thận ngọn đuốc thấm muối giúp giảm khói trong hầm mộ",
      "Đoàn lính gác hộ tống nhóm thợ vượt qua đèo núi đá đến công trường thung lũng",
      "Người quản đốc chấm công và ghi chép nhật ký lao động trên mảnh đá vôi",
      "Ngôi làng tĩnh lặng về đêm dưới sự canh phòng cẩn mật của quân đội hoàng gia"
    ],
    "imageStartFrames": [
      0,
      183,
      712,
      817,
      922,
      1027,
      1132
    ]
  },
  {
    "id": "part8",
    "chapterNumber": 8,
    "partLabel": "PHẦN 8",
    "historicalEra": "THỜI RAMSES IX · KHOẢNG NĂM 1110 TCN",
    "title": "Những Phiên Tòa Xét Xử Trộm Mộ Thời Cổ Đại",
    "subtitle": "Lời khai trên giấy cói Mayer và mạng lưới tham nhũng thế kỷ 12 TCN",
    "audioSrc": "audio/pharaoh_part8.wav",
    "durationInFrames": 2573,
    "startFrame": 15274,
    "images": [
      "images/pharaoh-pyramids/063.png",
      "images/pharaoh-pyramids/064.png",
      "images/pharaoh-pyramids/065.png",
      "images/pharaoh-pyramids/066.png",
      "images/pharaoh-pyramids/067.png",
      "images/pharaoh-pyramids/068.png",
      "images/pharaoh-pyramids/069.png",
      "images/pharaoh-pyramids/070.png",
      "images/pharaoh-pyramids/071.png"
    ],
    "imageDescriptions": [
      "Kẻ trộm mộ cổ đại lẻn qua hố đào bí mật tiếp cận căn phòng lăng mộ",
      "Vụ bắt giữ quả tang nhóm đạo tặc đang mang đồ trang sức hoàng gia ra khỏi vách núi",
      "Phiên tòa xét xử nghiêm ngặt dưới quyền quan Vizier tại kinh đô Thebes",
      "Cuộn giấy cói Mayer ghi lại chi tiết lời khai và danh sách tài sản bị đánh cắp",
      "Kẻ trộm bị tra tấn bằng roi gậy để khai ra đồng phạm và đầu nậu tiêu thụ",
      "Mối liên kết ngầm giữa đạo tặc và một số quan chức đền thờ tha hóa",
      "Bản án nghiêm khắc: Kẻ chủ mưu bị xử phạt nặng trước sự chứng kiến của dân chúng",
      "Các giáo sĩ kiểm tra lại ấn niêm phong trên cửa các ngôi mộ bị xâm phạm",
      "Sự suy tàn của vương triều cuối thời Tân Vương quốc và làn sóng trộm mộ bùng phát"
    ],
    "imageStartFrames": [
      0,
      286,
      572,
      858,
      1144,
      1429,
      1715,
      2001,
      2287
    ]
  },
  {
    "id": "part9",
    "chapterNumber": 9,
    "partLabel": "PHẦN 9",
    "historicalEra": "1323 TCN - 1922 SCN · KHẢO CỔ HỌC",
    "title": "Trường Hợp Ngoại Lệ: Lăng Mộ Tutankhamun",
    "subtitle": "Ngôi mộ bị lãng quên dưới đống đất đá bảo toàn kho báu 3.000 năm",
    "audioSrc": "audio/pharaoh_part9.wav",
    "durationInFrames": 2632,
    "startFrame": 17847,
    "images": [
      "images/pharaoh-pyramids/072.png",
      "images/pharaoh-pyramids/073.png",
      "images/pharaoh-pyramids/074.png",
      "images/pharaoh-pyramids/075.png",
      "images/pharaoh-pyramids/076.png",
      "images/pharaoh-pyramids/077.png",
      "images/pharaoh-pyramids/078.png",
      "images/pharaoh-pyramids/079.png",
      "images/pharaoh-pyramids/080.png",
      "images/pharaoh-pyramids/081.png"
    ],
    "imageDescriptions": [
      "Pharaoh trẻ tuổi Tutankhamun đăng quang mang biểu tượng quyền uy tối thượng",
      "Đoàn tùy tùng vội vã đưa thi hài Tutankhamun vào ngôi mộ nhỏ chưa hoàn thiện",
      "Đất đá từ công trường lăng mộ Ramses VI đổ xuống vô tình chôn vùi cửa mộ Tutankhamun",
      "Nhà khảo cổ học Howard Carter và cộng sự tìm thấy bậc đá đầu tiên năm 1922",
      "Howard Carter ghé mắt qua khe cửa và thốt lên: 'Tôi thấy những điều kỳ diệu!'",
      "Căn phòng tiền sảnh ngổn ngang cỗ xe vàng, ngai vàng và rương báu 3.000 năm",
      "Cận cảnh chiếc mặt nạ vàng ròng huyền thoại của pharaoh Tutankhamun",
      "Cỗ quan tài bằng vàng nguyên khối lấp lánh nguyên vẹn không tì vết",
      "Số phận đối nghịch: Vị vua đoản mệnh trở nên nổi tiếng nhất nhờ ngôi mộ nguyên vẹn",
      "Ánh sáng hiện đại rọi vào quá khứ, giải mã bí ẩn bảo tồn của thung lũng"
    ],
    "imageStartFrames": [
      0,
      159,
      526,
      790,
      1053,
      1316,
      1746,
      1893,
      2106,
      2369
    ]
  },
  {
    "id": "part10",
    "chapterNumber": 10,
    "partLabel": "PHẦN 10",
    "historicalEra": "BỜ ĐÔNG SÔNG NILE · THẾ KỶ 16 - 11 TCN",
    "title": "Sự Phô Trương Của Đền Karnak",
    "subtitle": "Bản trường ca bằng đá tôn vinh thần Amun-Re bên bờ đông trù phú",
    "audioSrc": "audio/pharaoh_part10.wav",
    "durationInFrames": 1939,
    "startFrame": 20479,
    "images": [
      "images/pharaoh-pyramids/082.png",
      "images/pharaoh-pyramids/083.png",
      "images/pharaoh-pyramids/084.png",
      "images/pharaoh-pyramids/085.png",
      "images/pharaoh-pyramids/086.png",
      "images/pharaoh-pyramids/087.png",
      "images/pharaoh-pyramids/088.png",
      "images/pharaoh-pyramids/089.png"
    ],
    "imageDescriptions": [
      "Toàn cảnh đại quần thể đền Karnak tráng lệ nhìn từ trên cao bên bờ Đông sông Nile",
      "Cổng Pylon đồ sộ đầu tiên với những cột cờ phấp phới đón chào khách hành hương",
      "Đại sảnh Hypostyle hùng vĩ với rừng cột đá sa thạch cao vút tận trời mây",
      "Ánh nắng ban mai xuyên qua các khe sáng trên trần sảnh tạo nên luồng hào quang",
      "Cận cảnh bức chạm nổi pharaoh dâng lễ vật lên đấng tối cao Amun-Re",
      "Hồ nước thiêng trong vắt bên trong đền Karnak dùng cho nghi lễ thanh tẩy của tư tế",
      "Cột tháp Obelisk đá hoa cương đỏ của Nữ hoàng Hatshepsut đâm thẳng lên trời",
      "Đại lễ Opet thiêng liêng: Thuyền thần rước tượng Amun diễu hành giữa tiếng reo hò"
    ],
    "imageStartFrames": [
      0,
      122,
      291,
      1327,
      1432,
      1537,
      1642,
      1747
    ]
  },
  {
    "id": "part11",
    "chapterNumber": 11,
    "partLabel": "PHẦN 11",
    "historicalEra": "ĐẠI SẢNH HYPOSTYLE · THỜI RAMSES II",
    "title": "Quy Mô Khổng Lồ Của Thành Phố Thần Linh",
    "subtitle": "Đại sảnh Hypostyle với 134 cột đá khổng lồ thách thức thời gian",
    "audioSrc": "audio/pharaoh_part11.wav",
    "durationInFrames": 2858,
    "startFrame": 22418,
    "images": [
      "images/pharaoh-pyramids/090.png",
      "images/pharaoh-pyramids/091.png",
      "images/pharaoh-pyramids/092.png",
      "images/pharaoh-pyramids/093.png",
      "images/pharaoh-pyramids/094.png",
      "images/pharaoh-pyramids/095.png",
      "images/pharaoh-pyramids/096.png",
      "images/pharaoh-pyramids/097.png",
      "images/pharaoh-pyramids/098.png",
      "images/pharaoh-pyramids/099.png",
      "images/pharaoh-pyramids/100.png"
    ],
    "imageDescriptions": [
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
      "Cổng đền Pylon đồ sộ rực sáng trong ánh lửa đuốc nghi lễ lúc chập tối"
    ],
    "imageStartFrames": [
      0,
      260,
      1160,
      1265,
      1370,
      1495,
      1600,
      1819,
      2079,
      2338,
      2598
    ]
  },
  {
    "id": "part12",
    "chapterNumber": 12,
    "partLabel": "PHẦN 12",
    "historicalEra": "ĐẾ CHẾ TÂN VƯƠNG QUỐC · THỊNH VƯỢNG TỐI ĐA",
    "title": "Nguồn Lực Cho Karnak: Thuế & Chiến Lợi Phẩm",
    "subtitle": "Dòng chảy của cải từ các cuộc viễn chinh nuôi dưỡng thánh địa",
    "audioSrc": "audio/pharaoh_part12.wav",
    "durationInFrames": 1943,
    "startFrame": 25276,
    "images": [
      "images/pharaoh-pyramids/101.png",
      "images/pharaoh-pyramids/102.png",
      "images/pharaoh-pyramids/103.png",
      "images/pharaoh-pyramids/104.png",
      "images/pharaoh-pyramids/105.png",
      "images/pharaoh-pyramids/106.png",
      "images/pharaoh-pyramids/107.png",
      "images/pharaoh-pyramids/108.png"
    ],
    "imageDescriptions": [
      "Pharaoh cưỡi chiến xa dẫn đầu đoàn quân khải hoàn mang theo vô số chiến lợi phẩm",
      "Binh lính dỡ rương vàng bạc, châu báu và cống phẩm ngoại quốc vào kho đền Karnak",
      "Quan chép sử ghi chép thuế ngũ cốc và sản vật của nông dân dọc thung lũng sông Nile",
      "Chiến trận ác liệt với chiến xa dũng mãnh bảo vệ cương thổ và của cải đế chế",
      "Vòng tuần hoàn kinh tế: Chiến tranh mang về của cải, của cải dâng cúng xây đền",
      "Pharaoh quỳ gối dâng chiến lợi phẩm tạ ơn thần Amun-Re ban cho thắng trận",
      "Bức chạm khắc phù điêu tái hiện chiến dịch quân sự lẫy lừng của pharaoh",
      "Kho lương thực đền thờ chứa đầy ngũ cốc, dầu ô liu và của cải dồi dào"
    ],
    "imageStartFrames": [
      0,
      159,
      807,
      912,
      1017,
      1214,
      1457,
      1700
    ]
  },
  {
    "id": "part13",
    "chapterNumber": 13,
    "partLabel": "PHẦN 13",
    "historicalEra": "THỜI VUA AKHENATEN · KHOẢNG 1350 TCN",
    "title": "Quyền Lực Tư Tế & Cuộc Khủng Hoảng Tôn Giáo",
    "subtitle": "Khi giới tư tế Amun đe dọa vương quyền và cuộc cải cách Akhenaten",
    "audioSrc": "audio/pharaoh_part13.wav",
    "durationInFrames": 2110,
    "startFrame": 27219,
    "images": [
      "images/pharaoh-pyramids/109.png",
      "images/pharaoh-pyramids/110.png",
      "images/pharaoh-pyramids/111.png",
      "images/pharaoh-pyramids/112.png",
      "images/pharaoh-pyramids/113.png",
      "images/pharaoh-pyramids/114.png",
      "images/pharaoh-pyramids/115.png",
      "images/pharaoh-pyramids/116.png",
      "images/pharaoh-pyramids/117.png"
    ],
    "imageDescriptions": [
      "Giới đại tư tế Amun quyền lực trong áo choàng da báo và trang sức vàng lộng lẫy",
      "Thế đối đầu ngấm ngầm giữa quyền uy pharaoh và thế lực tư tế ngày càng bành trướng",
      "Đất đai và điền trang bạt ngàn thuộc quyền sở hữu riêng của đền thờ Karnak",
      "Pharaoh dị giáo Akhenaten quay lưng với Karnak, quyết định cải cách tôn giáo",
      "Công trường xây dựng thủ đô mới Amarna với đền thờ thần Mặt Trời Aten lộ thiên",
      "Đĩa mặt trời Aten tỏa muôn vàn tia sáng mang bàn tay ban phước lành",
      "Công trường Karnak bị đình trệ, giàn giáo bỏ hoang dưới triều đại Akhenaten",
      "Biểu tượng hai vương miện hoàng gia và tôn giáo đối đầu trong tranh giành quyền lực",
      "Người dân và nghệ nhân phục hồi lại truyền thống Amun tại Karnak sau thời Akhenaten"
    ],
    "imageStartFrames": [
      0,
      716,
      821,
      926,
      1031,
      1690,
      1795,
      1900,
      2005
    ]
  },
  {
    "id": "part14",
    "chapterNumber": 14,
    "partLabel": "PHẦN 14",
    "historicalEra": "KẾT LUẬN & DI SẢN LỊCH SỬ",
    "title": "Hai Công Trình, Một Câu Chuyện",
    "subtitle": "Bài học lịch sử về cái chết thầm lặng và quyền lực trường tồn",
    "audioSrc": "audio/pharaoh_part14.wav",
    "durationInFrames": 2318,
    "startFrame": 29329,
    "images": [
      "images/pharaoh-pyramids/118.png",
      "images/pharaoh-pyramids/119.png",
      "images/pharaoh-pyramids/120.png",
      "images/pharaoh-pyramids/121.png",
      "images/pharaoh-pyramids/122.png",
      "images/pharaoh-pyramids/123.png"
    ],
    "imageDescriptions": [
      "Sợi chỉ vàng kết nối: Một bên là hầm mộ ẩn giấu, một bên là đền thờ vươn cao",
      "Chiếc cân lịch sử cân bằng giữa nơi an nghỉ vĩnh hằng và nơi phô trương quyền lực",
      "Bình minh trên sông Nile: Bờ Tây tĩnh lặng của cõi chết và bờ Đông rực rỡ của sự sống",
      "Du khách hiện đại bước đi trong tôn kính giữa rừng cột đá ngàn năm tuổi",
      "Toàn cảnh vùng đất Thebes huyền thoại nối liền quá khứ rực rỡ và hiện tại",
      "Tia nắng đầu ngày chiếu sáng những dòng chữ tượng hình lưu giữ bí mật ngàn năm"
    ],
    "imageStartFrames": [
      0,
      765,
      870,
      1159,
      1545,
      1932
    ]
  }
];

export const TOTAL_PHARAOH_FRAMES = PHARAOH_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
