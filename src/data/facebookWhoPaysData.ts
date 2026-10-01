// Dữ liệu 12 chương phim tài liệu 'Facebook không thu tiền bạn. Vậy ai đang trả tiền?'
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

export const TOTAL_FACEBOOK_WHO_PAYS_FRAMES = 28095;

export const FACEBOOK_WHO_PAYS_CHAPTERS: FacebookWhoPaysChapter[] = [
  {
    "id": "part1",
    "chapterNumber": 1,
    "partLabel": "MỞ ĐẦU",
    "historicalEra": "NGHỊCH LÝ MIỄN PHÍ",
    "title": "Bữa Trưa Miễn Phí Đắt Nhất Hành Tinh",
    "subtitle": "Vì sao hai ứng dụng không tốn một xu lại sinh ra những đế chế nghìn tỷ đô la?",
    "audioSrc": "audio/facebook_who_pays_part1.wav",
    "durationInFrames": 1386,
    "startFrame": 0,
    "images": [
      "images/facebook-ai-tra-tien-16x9/001.png",
      "images/facebook-ai-tra-tien-16x9/002.png",
      "images/facebook-ai-tra-tien-16x9/005.png",
      "images/facebook-ai-tra-tien-16x9/003.png",
      "images/facebook-ai-tra-tien-16x9/004.png",
      "images/facebook-ai-tra-tien-16x9/006.png",
      "images/facebook-ai-tra-tien-16x9/007.png",
      "images/facebook-ai-tra-tien-16x9/008.png"
    ],
    "imageDescriptions": [
      "Minh lướt điện thoại ban đêm trong phòng ngủ ấm cúng",
      "Cận cảnh ngón tay lướt màn hình xem các video ngắn",
      "Minh lộn ngược chiếc ví trống rỗng với vẻ mặt hoang mang",
      "Tòa nhà chọc trời hình điện thoại với kho vàng rực rỡ",
      "Ngọn núi tiền vàng khổng lồ chạm tới mây trời",
      "Khung hình chia đôi: Minh lướt app và bàn tay mặc vest đếm tiền",
      "Bóng đen Mr. Feed trên sân thượng nhìn thành phố sáng đèn",
      "Linh vật đồng xu Xu thò đầu ra từ túi áo nháy mắt tinh nghịch"
    ],
    "imageStartFrames": [
      0,
      52,
      97,
      191,
      328,
      617,
      785,
      1256
    ]
  },
  {
    "id": "part2",
    "chapterNumber": 2,
    "partLabel": "PHẦN 1",
    "historicalEra": "KINH TẾ HỌC SỐ",
    "title": "Vì Sao Mọi Thứ Trên Mạng Đều Về Giá Không",
    "subtitle": "Chi phí biên bằng không và câu chuyện kinh điển về món ăn mặn trong quán rượu",
    "audioSrc": "audio/facebook_who_pays_part2.wav",
    "durationInFrames": 2410,
    "startFrame": 1386,
    "images": [
      "images/facebook-ai-tra-tien-16x9/013.png",
      "images/facebook-ai-tra-tien-16x9/014.png",
      "images/facebook-ai-tra-tien-16x9/015.png",
      "images/facebook-ai-tra-tien-16x9/016.png",
      "images/facebook-ai-tra-tien-16x9/017.png",
      "images/facebook-ai-tra-tien-16x9/009.png",
      "images/facebook-ai-tra-tien-16x9/010.png",
      "images/facebook-ai-tra-tien-16x9/011.png",
      "images/facebook-ai-tra-tien-16x9/012.png",
      "images/facebook-ai-tra-tien-16x9/018.png"
    ],
    "imageDescriptions": [
      "Dây chuyền bánh mì, mỗi ổ bánh gắn thẻ chi phí biên",
      "Phòng máy chủ rực sáng, ứng dụng nhân bản gửi đi toàn cầu",
      "Cỗ máy dập ra các khối ứng dụng kỹ thuật số chi phí vài xu",
      "Thẻ giá trượt dốc không phanh rơi xuống hố tròn số không",
      "Hai cửa hàng đối diện nhau cùng hạ biển giá xuống số không",
      "Quán rượu kiểu Mỹ thế kỷ 19 treo biển ăn trưa miễn phí",
      "Cận cảnh đĩa đồ ăn mặn chát, thực khách khát khô cổ",
      "Nhân viên pha chế rót bia liên tục, tiền xu rơi leng keng",
      "Quán cà phê wifi miễn phí, Minh ngồi ôm laptop với ly nước rỗng",
      "Đồng xu Xu ngồi trên xích đu nghi hoặc bên khay cơm trưa"
    ],
    "imageStartFrames": [
      0,
      570,
      673,
      841,
      1140,
      1622,
      1792,
      1884,
      1980,
      2254
    ]
  },
  {
    "id": "part3",
    "chapterNumber": 3,
    "partLabel": "PHẦN 2",
    "historicalEra": "THỊ TRƯỜNG HAI MẶT",
    "title": "Cái Chợ Có Hai Mặt",
    "subtitle": "Nghệ thuật trợ cấp chéo và con số mười euro định giá quyền riêng tư",
    "audioSrc": "audio/facebook_who_pays_part3.wav",
    "durationInFrames": 2579,
    "startFrame": 3796,
    "images": [
      "images/facebook-ai-tra-tien-16x9/026.png",
      "images/facebook-ai-tra-tien-16x9/019.png",
      "images/facebook-ai-tra-tien-16x9/020.png",
      "images/facebook-ai-tra-tien-16x9/022.png",
      "images/facebook-ai-tra-tien-16x9/021.png",
      "images/facebook-ai-tra-tien-16x9/023.png",
      "images/facebook-ai-tra-tien-16x9/024.png",
      "images/facebook-ai-tra-tien-16x9/025.png",
      "images/facebook-ai-tra-tien-16x9/027.png",
      "images/facebook-ai-tra-tien-16x9/028.png",
      "images/facebook-ai-tra-tien-16x9/029.png",
      "images/facebook-ai-tra-tien-16x9/030.png"
    ],
    "imageDescriptions": [
      "Nhà kinh tế học tóc bạc Jean Tirole trước bảng đen thị trường hai mặt",
      "Chợ truyền thống nhộn nhịp, tiểu thương và khách nối chỉ vàng",
      "Quầy báo cổ điển, độc giả đọc tin và nhà quảng cáo giương biển",
      "Cảnh quẹt thẻ tín dụng tại cửa hàng kết nối ngân hàng",
      "Cây cầu phát sáng khổng lồ nối hai hòn đảo người dùng và quảng cáo",
      "Mr. Feed đứng trên cán cân vàng giữa người dùng và nhà quảng cáo",
      "Bập bênh khổng lồ: người dùng tim yêu thích và chồng tiền vàng",
      "Hai cánh cổng: cổng miễn phí cho người dùng và cổng vàng thu tiền",
      "Minh nhìn thấy bảng giá thuê bao hàng tháng và hoảng hốt bỏ chạy",
      "Thành phố ứng dụng bị bỏ hoang, nhà quảng cáo ngơ ngác",
      "Cánh cửa màu tím khiên bảo vệ, Minh cầm ví ngập ngừng",
      "Cảnh siêu thực: chợ khổng lồ dựng ngay trên bức chân dung của Minh"
    ],
    "imageStartFrames": [
      0,
      315,
      444,
      564,
      675,
      765,
      1039,
      1095,
      1305,
      1487,
      1725,
      2385
    ]
  },
  {
    "id": "part4",
    "chapterNumber": 4,
    "partLabel": "PHẦN 3",
    "historicalEra": "QUY LUẬT KẺ THẮNG",
    "title": "Vì Sao Kẻ Đến Trước Thường Thắng Lớn",
    "subtitle": "Hiệu ứng mạng lưới, chi phí rời bỏ và chiến lược thâu tóm đối thủ",
    "audioSrc": "audio/facebook_who_pays_part4.wav",
    "durationInFrames": 3397,
    "startFrame": 6375,
    "images": [
      "images/facebook-ai-tra-tien-16x9/031.png",
      "images/facebook-ai-tra-tien-16x9/032.png",
      "images/facebook-ai-tra-tien-16x9/033.png",
      "images/facebook-ai-tra-tien-16x9/034.png",
      "images/facebook-ai-tra-tien-16x9/035.png",
      "images/facebook-ai-tra-tien-16x9/036.png",
      "images/facebook-ai-tra-tien-16x9/037.png",
      "images/facebook-ai-tra-tien-16x9/038.png",
      "images/facebook-ai-tra-tien-16x9/039.png",
      "images/facebook-ai-tra-tien-16x9/040.png",
      "images/facebook-ai-tra-tien-16x9/041.png",
      "images/facebook-ai-tra-tien-16x9/042.png",
      "images/facebook-ai-tra-tien-16x9/043.png",
      "images/facebook-ai-tra-tien-16x9/044.png"
    ],
    "imageDescriptions": [
      "Nhà phát minh già ngồi cô đơn bên chiếc điện thoại đầu tiên",
      "Cả thành phố giăng kín dây điện thoại, mọi người vui vẻ trò chuyện",
      "Mạng lưới các nút sáng kết nối toàn cầu theo cấp số nhân",
      "Bánh đà khổng lồ quay tròn tạo vòng xoáy tăng trưởng",
      "Điểm lật bờ vực: các đối thủ bị bỏ lại, quả cầu sáng lăn nhanh",
      "Quả cầu tuyết lăn xuống núi cuốn theo người dùng và tiền bạc",
      "Mr. Feed ném từng chồng tiền mặt vào lò lửa đầu máy xe lửa",
      "Linh vật neon ném phong bao lì xì và hoa giấy cho người dùng mới",
      "Minh cố lẻn ra khỏi nhóm chat gia đình nhưng bị bàn tay chibi kéo lại",
      "Chiếc lồng êm ái hình chuông thông báo có sofa và wifi",
      "Mr. Feed cầm máy hút bụi khổng lồ hút các ứng dụng startup nhỏ",
      "Hai tòa nhà nhỏ được mua bằng các vali tiền mặt",
      "Khung hình chia đôi: đồ thị bạn bè đối chiếu mưa video sở thích",
      "Hạ kinh ngạc trước màn hình khi video bùng nổ hàng triệu lượt xem"
    ],
    "imageStartFrames": [
      0,
      226,
      323,
      691,
      1061,
      1287,
      1348,
      1541,
      1687,
      1961,
      2385,
      2439,
      2785,
      3106
    ]
  },
  {
    "id": "part5",
    "chapterNumber": 5,
    "partLabel": "PHẦN 4",
    "historicalEra": "KINH TẾ HỌC CHÚ Ý",
    "title": "Thứ Họ Thật Sự Bán",
    "subtitle": "Herbert Simon, bát snack không đáy và cơ chế máy đánh bạc trong túi bạn",
    "audioSrc": "audio/facebook_who_pays_part5.wav",
    "durationInFrames": 2755,
    "startFrame": 9772,
    "images": [
      "images/facebook-ai-tra-tien-16x9/047.png",
      "images/facebook-ai-tra-tien-16x9/045.png",
      "images/facebook-ai-tra-tien-16x9/046.png",
      "images/facebook-ai-tra-tien-16x9/048.png",
      "images/facebook-ai-tra-tien-16x9/049.png",
      "images/facebook-ai-tra-tien-16x9/050.png",
      "images/facebook-ai-tra-tien-16x9/051.png",
      "images/facebook-ai-tra-tien-16x9/052.png",
      "images/facebook-ai-tra-tien-16x9/053.png",
      "images/facebook-ai-tra-tien-16x9/054.png",
      "images/facebook-ai-tra-tien-16x9/055.png",
      "images/facebook-ai-tra-tien-16x9/056.png"
    ],
    "imageDescriptions": [
      "Chiếc đồng hồ cát vàng tí hon giữa hai ngón tay",
      "Học giả Herbert Simon thập niên 1970 trong thư viện sách khổng lồ",
      "Đồng hồ 24 giờ hình biểu đồ tròn với lát cắt chú ý mỏng manh",
      "Con đường vô tận dệt bằng các khung video kéo dài lên trời",
      "Minh ăn snack từ chiếc bát không đáy tự động làm đầy",
      "Chấm thông báo đỏ rực như mắt cú trong đêm tối",
      "Minh ngồi ghế bành lướt trên băng chuyền sushi video vô tận",
      "Máy đánh bạc với các cuộn quay là màn hình điện thoại",
      "Máy nhả kẹo tự động rơi kẹo ngọt mỗi lần vuốt ngón tay",
      "Lựa chọn: lát bánh ngọt ngay bây giờ đối chiếu rương kho báu",
      "Phòng ngủ tối lúc 2 giờ sáng, Minh xem video làm bánh",
      "Cảnh mộng ảo với hàng chục chiếc đồng hồ điện thoại tan chảy"
    ],
    "imageStartFrames": [
      0,
      131,
      600,
      916,
      1211,
      1465,
      1567,
      1669,
      2017,
      2102,
      2590,
      2692
    ]
  },
  {
    "id": "part6",
    "chapterNumber": 6,
    "partLabel": "PHẦN 5",
    "historicalEra": "THAO TÚNG DỮ LIỆU",
    "title": "Họ Biết Bạn Hơn Cả Bạn",
    "subtitle": "Phiên đấu giá một phần nghìn giây và nghịch lý quyền riêng tư",
    "audioSrc": "audio/facebook_who_pays_part6.wav",
    "durationInFrames": 3720,
    "startFrame": 12527,
    "images": [
      "images/facebook-ai-tra-tien-16x9/064.png",
      "images/facebook-ai-tra-tien-16x9/065.png",
      "images/facebook-ai-tra-tien-16x9/057.png",
      "images/facebook-ai-tra-tien-16x9/058.png",
      "images/facebook-ai-tra-tien-16x9/059.png",
      "images/facebook-ai-tra-tien-16x9/060.png",
      "images/facebook-ai-tra-tien-16x9/061.png",
      "images/facebook-ai-tra-tien-16x9/062.png",
      "images/facebook-ai-tra-tien-16x9/063.png",
      "images/facebook-ai-tra-tien-16x9/068.png",
      "images/facebook-ai-tra-tien-16x9/066.png",
      "images/facebook-ai-tra-tien-16x9/067.png"
    ],
    "imageDescriptions": [
      "So sánh: thợ may đo đạc tỉ mỉ đối chiếu xưởng may đại trà",
      "Phát tờ rơi bừa bãi đối chiếu ánh đèn rọi cô dâu đám cưới",
      "Bình thủy tinh chứa biểu tượng sở thích trôi lơ lửng của Minh",
      "Ống kính máy ảnh hình con mắt khổng lồ quan sát đám đông",
      "Cận cảnh đồng tử Minh phản chiếu quảng cáo đôi giày",
      "Chiếc điện thoại nằm im trên bàn cà phê với đôi mắt tí hon",
      "Phòng đấu giá tốc độ cao, các nhà quảng cáo giơ bảng đấu giá Minh",
      "Khoảnh khắc đóng băng: ngón tay Minh vừa chạm màn hình",
      "Ba quả cầu tiền tệ, con trỏ và ngôi sao hợp nhất thành thẻ quảng cáo",
      "Minh đứng bơ vơ giữa sân khấu đấu giá trong ánh đèn rọi",
      "Cuộn giấy điều khoản sử dụng dài vô tận với hai nút bấm duy nhất",
      "Bản đồ thế giới với các vùng tỏa sáng đồng tiền to nhỏ khác nhau"
    ],
    "imageStartFrames": [
      0,
      236,
      656,
      845,
      911,
      1226,
      1335,
      1404,
      1833,
      1999,
      2270,
      3091
    ]
  },
  {
    "id": "part7",
    "chapterNumber": 7,
    "partLabel": "PHẦN 6",
    "historicalEra": "THẶNG DƯ TIÊU DÙNG",
    "title": "Vậy Rốt Cuộc, Ai Được Lợi?",
    "subtitle": "Thí nghiệm một trăm đô la và khoảng trống vô hình trong thước đo GDP",
    "audioSrc": "audio/facebook_who_pays_part7.wav",
    "durationInFrames": 2450,
    "startFrame": 16247,
    "images": [
      "images/facebook-ai-tra-tien-16x9/069.png",
      "images/facebook-ai-tra-tien-16x9/076.png",
      "images/facebook-ai-tra-tien-16x9/070.png",
      "images/facebook-ai-tra-tien-16x9/071.png",
      "images/facebook-ai-tra-tien-16x9/072.png",
      "images/facebook-ai-tra-tien-16x9/073.png",
      "images/facebook-ai-tra-tien-16x9/075.png",
      "images/facebook-ai-tra-tien-16x9/074.png",
      "images/facebook-ai-tra-tien-16x9/077.png",
      "images/facebook-ai-tra-tien-16x9/078.png"
    ],
    "imageDescriptions": [
      "Cán cân thặng dư tiêu dùng: giá sẵn sàng trả và giá thực tế",
      "Kéo co giữa món quà lấp lánh và sợi xích nặng nề",
      "Cảnh ấm cúng bà cụ gọi video call cho người cháu ở phương xa",
      "Bạn trẻ tự học sửa xe đạp qua video hướng dẫn chi tiết",
      "Biểu tượng bản đồ và tìm kiếm tựa tiểu tiên bay lượn hỗ trợ Minh",
      "Nhóm nhà nghiên cứu cầm bảng khảo sát với túi tiền 100 đô la",
      "Nhà kinh tế học soi kính lúp vào trang giấy vô hình trong GDP",
      "Minh tắt ứng dụng mạng xã hội, chiếc ba lô nặng trĩu rơi khỏi vai",
      "Đồng xu Xu ngồi cân não trên bập bênh giữa trái tim và đồng hồ",
      "Ngã ba đường: công viên cây xanh và thành phố màn hình neon"
    ],
    "imageStartFrames": [
      0,
      169,
      545,
      787,
      832,
      909,
      1346,
      1799,
      2230,
      2366
    ]
  },
  {
    "id": "part8",
    "chapterNumber": 8,
    "partLabel": "PHẦN 7",
    "historicalEra": "CHI PHÍ XÃ HỘI",
    "title": "Hóa Đơn Không Ai Gửi",
    "subtitle": "Ngoại tác tiêu cực: bảy trăm ba mươi giờ mỗi năm và bẫy phẫn nộ thuật toán",
    "audioSrc": "audio/facebook_who_pays_part8.wav",
    "durationInFrames": 2452,
    "startFrame": 18697,
    "images": [
      "images/facebook-ai-tra-tien-16x9/079.png",
      "images/facebook-ai-tra-tien-16x9/080.png",
      "images/facebook-ai-tra-tien-16x9/088.png",
      "images/facebook-ai-tra-tien-16x9/081.png",
      "images/facebook-ai-tra-tien-16x9/082.png",
      "images/facebook-ai-tra-tien-16x9/083.png",
      "images/facebook-ai-tra-tien-16x9/084.png",
      "images/facebook-ai-tra-tien-16x9/085.png",
      "images/facebook-ai-tra-tien-16x9/086.png",
      "images/facebook-ai-tra-tien-16x9/087.png"
    ],
    "imageDescriptions": [
      "Ống khói nhà máy xả khói mù mịt lên ngôi làng nhỏ",
      "Ống khói điện thoại xả khói bong bóng thông báo vào từng mái nhà",
      "Cán cân lợi nhuận nền tảng một bên và tờ hóa đơn vô hình đè lên đầu",
      "Cuốn lịch năm khổng lồ với 30 ngày bị mất",
      "Đồng hồ cát mỗi ngày rơi 2 giờ, tích tụ thành ngọn núi",
      "Soi gương trong khi hình ảnh hào nhoáng của người khác trôi nổi",
      "Hai nhóm nghiên cứu giơ biểu đồ kết quả trái ngược nhau",
      "Chiếc loa phát thanh tiêu đề giật gân làm bùng cháy ngọn lửa",
      "Bong bóng phẫn nộ cưỡi tên lửa bỏ xa bong bóng sự thật",
      "Thanh tra chính phủ cầm con dấu thuế tiến về nhà máy điện thoại"
    ],
    "imageStartFrames": [
      0,
      52,
      441,
      533,
      881,
      1048,
      1370,
      1606,
      1850,
      2015
    ]
  },
  {
    "id": "part9",
    "chapterNumber": 9,
    "partLabel": "PHẦN 8",
    "historicalEra": "QUYỀN LỰC ĐƠN PHƯƠNG",
    "title": "Người Thuê Đất Trồng Lúa",
    "subtitle": "Thị trường siêu sao, bão táp thuật toán và chu kỳ xuống cấp enshittification",
    "audioSrc": "audio/facebook_who_pays_part9.wav",
    "durationInFrames": 3173,
    "startFrame": 21149,
    "images": [
      "images/facebook-ai-tra-tien-16x9/089.png",
      "images/facebook-ai-tra-tien-16x9/090.png",
      "images/facebook-ai-tra-tien-16x9/091.png",
      "images/facebook-ai-tra-tien-16x9/092.png",
      "images/facebook-ai-tra-tien-16x9/093.png",
      "images/facebook-ai-tra-tien-16x9/094.png",
      "images/facebook-ai-tra-tien-16x9/095.png",
      "images/facebook-ai-tra-tien-16x9/096.png",
      "images/facebook-ai-tra-tien-16x9/097.png",
      "images/facebook-ai-tra-tien-16x9/098.png"
    ],
    "imageDescriptions": [
      "Hạ livestream quay video trong phòng nhỏ với đèn tròn",
      "Kim tự tháp thu nhập: đỉnh chóp ngôi sao và biển người bên dưới",
      "Lồng quay xổ số xoay tròn với khuôn mặt các nhà sáng tạo",
      "Cánh đồng lúa vàng, Hạ gặt lúa còn Mr. Feed đến thu tô",
      "Chong chóng thuật toán quay cuồng, thửa ruộng bỗng chốc xơ xác",
      "Cô Ba trong tiệm áo cưới nhìn vào hóa đơn quảng cáo dài dằng dặc",
      "Đấu giá chật chội giữa các chủ tiệm tranh giành một khách hàng",
      "Ba giai đoạn thoái hóa: quán ấm cúng, quán áp phích, quán ép giá",
      "Chiếc bánh bị cắt: nền tảng lấy phần lớn, Hạ cầm mẩu bánh vụn",
      "Hạ tự tay xây ngọn hải đăng nhỏ trên ghềnh đá giữa mây bão"
    ],
    "imageStartFrames": [
      0,
      736,
      949,
      1218,
      1631,
      1770,
      1915,
      2190,
      2917,
      3040
    ]
  },
  {
    "id": "part10",
    "chapterNumber": 10,
    "partLabel": "PHẦN 9",
    "historicalEra": "KỊCH BẢN TƯƠNG LAI",
    "title": "Tương Lai Sẽ Ra Sao?",
    "subtitle": "Bốn hướng giải pháp: chống độc quyền, luật dữ liệu, trả phí và chia cổ phần",
    "audioSrc": "audio/facebook_who_pays_part10.wav",
    "durationInFrames": 2351,
    "startFrame": 24322,
    "images": [
      "images/facebook-ai-tra-tien-16x9/108.png",
      "images/facebook-ai-tra-tien-16x9/099.png",
      "images/facebook-ai-tra-tien-16x9/100.png",
      "images/facebook-ai-tra-tien-16x9/101.png",
      "images/facebook-ai-tra-tien-16x9/102.png",
      "images/facebook-ai-tra-tien-16x9/103.png",
      "images/facebook-ai-tra-tien-16x9/104.png",
      "images/facebook-ai-tra-tien-16x9/105.png",
      "images/facebook-ai-tra-tien-16x9/106.png",
      "images/facebook-ai-tra-tien-16x9/107.png"
    ],
    "imageDescriptions": [
      "Đám mây hình dấu hỏi khổng lồ trên bầu trời xanh",
      "Nữ thẩm phán cầm cân công lý đối diện người khổng lồ công nghệ",
      "Startup nhỏ trên bờ biển trước con sóng thần khổng lồ",
      "Nghị viện trang nghiêm với các học giả tranh luận bàn tròn",
      "Ổ khóa và chìa khóa mở kho dữ liệu cá nhân",
      "Hai cánh cửa: cửa miễn phí ngập quảng cáo và cửa trả phí yên tĩnh",
      "Minh trong trang phục thợ mỏ tại mỏ dữ liệu nhận lương",
      "Kéo co giữa hai phe ủng hộ quy định và phản đối quy định",
      "Thành phố tương lai năm 2040 với màn hình lơ lửng",
      "Bình minh rực rỡ trên đường chân trời thành phố hy vọng"
    ],
    "imageStartFrames": [
      0,
      156,
      521,
      738,
      1132,
      1342,
      1771,
      2123,
      2185,
      2275
    ]
  },
  {
    "id": "part11",
    "chapterNumber": 11,
    "partLabel": "PHẦN 10",
    "historicalEra": "HÀNH ĐỘNG CỦA BẠN",
    "title": "Vậy Bạn Nên Làm Gì?",
    "subtitle": "Đặt ngân sách thời gian, tắt thông báo thừa và đa dạng hóa nguồn tài sản",
    "audioSrc": "audio/facebook_who_pays_part11.wav",
    "durationInFrames": 958,
    "startFrame": 26673,
    "images": [
      "images/facebook-ai-tra-tien-16x9/112.png",
      "images/facebook-ai-tra-tien-16x9/109.png",
      "images/facebook-ai-tra-tien-16x9/110.png",
      "images/facebook-ai-tra-tien-16x9/111.png",
      "images/facebook-ai-tra-tien-16x9/113.png",
      "images/facebook-ai-tra-tien-16x9/114.png"
    ],
    "imageDescriptions": [
      "Minh nhìn vào gương mỉm cười tự vấn trước biểu tượng ứng dụng",
      "Minh cài đặt giới hạn thời gian trên điện thoại",
      "Minh tắt thông báo không cần thiết, bóng đỏ xẹp dần",
      "Minh cất điện thoại vào ngăn kéo ra công viên ngập nắng",
      "Hạ cẩn thận chia trứng vào nhiều giỏ khác nhau",
      "Cây cầu gỗ nối thẳng từ Hạ đến khán giả của mình"
    ],
    "imageStartFrames": [
      0,
      138,
      325,
      476,
      629,
      755
    ]
  },
  {
    "id": "part12",
    "chapterNumber": 12,
    "partLabel": "LỜI KẾT",
    "historicalEra": "THÔNG ĐIỆP ĐỌNG LẠI",
    "title": "Ai Đang Trả Tiền?",
    "subtitle": "Miễn phí không có nghĩa là không mất gì: bạn trả bằng thời gian, sự chú ý và dữ liệu",
    "audioSrc": "audio/facebook_who_pays_part12.wav",
    "durationInFrames": 464,
    "startFrame": 27631,
    "images": [
      "images/facebook-ai-tra-tien-16x9/115.png",
      "images/facebook-ai-tra-tien-16x9/117.png",
      "images/facebook-ai-tra-tien-16x9/116.png",
      "images/facebook-ai-tra-tien-16x9/118.png",
      "images/facebook-ai-tra-tien-16x9/119.png",
      "images/facebook-ai-tra-tien-16x9/120.png"
    ],
    "imageDescriptions": [
      "Đồng xu Xu cầm dấu hỏi lớn mỉm cười dưới ánh đèn spotlight",
      "Cận cảnh nụ cười thấu hiểu và tự tin của Minh",
      "Bức ảnh toàn thể tất cả nhân vật bên nhau trên sân thượng",
      "Chiếc điện thoại úp mặt xuống bàn bên tách cà phê bình yên",
      "Linh vật Xu vẫy tay chào tạm biệt với tia sáng lấp lánh",
      "Hoàng hôn rực rỡ trên sân thượng với bóng dáng Minh bước đi"
    ],
    "imageStartFrames": [
      0,
      193,
      318,
      385,
      430,
      439
    ]
  }
];
