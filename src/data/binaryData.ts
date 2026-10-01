// Dữ liệu 10 chương phim tài liệu 'Vì Sao Máy Tính Chỉ Hiểu Số 0 Và 1?'
export interface BinaryChapter {
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

export const TOTAL_BINARY_FRAMES = 18321;

export const BINARY_CHAPTERS: BinaryChapter[] = [
  {
    "id": "part1",
    "chapterNumber": 1,
    "partLabel": "MỞ ĐẦU",
    "historicalEra": "NGHỊCH LÝ 0 VÀ 1",
    "title": "Bên Trong Chiếc Máy Tính",
    "subtitle": "Vì sao vạn vật số trên màn hình đều chỉ bắt đầu từ hai con số?",
    "audioSrc": "audio/binary_part1.wav",
    "durationInFrames": 825,
    "startFrame": 0,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/001.png",
      "images/vi-sao-may-tinh-0-va-1/002.png",
      "images/vi-sao-may-tinh-0-va-1/003.png",
      "images/vi-sao-may-tinh-0-va-1/004.png"
    ],
    "imageDescriptions": [
      "Thác nước số nhị phân 0 và 1 phát sáng đổ xuống màn hình máy tính",
      "Các chữ số 2 và 10 tan vỡ thành cát bụi, chỉ còn lại số 0 và 1 phát sáng kiên định",
      "Một công tắc bật tắt đơn giản bên cạnh muôn vàn biểu tượng hình ảnh, âm nhạc và dữ liệu",
      "Chiếc công tắc đèn tường phát sáng cùng dấu vết lịch sử của bàn tính và bánh răng"
    ],
    "imageStartFrames": [
      0,
      245,
      355,
      589
    ]
  },
  {
    "id": "part2",
    "chapterNumber": 2,
    "partLabel": "PHẦN 1",
    "historicalEra": "TIỀN ĐỀ LỊCH SỬ",
    "title": "Trước Cả Điện, Giấc Mơ Nhị Phân",
    "subtitle": "Từ quẻ Kinh Dịch, Leibniz đến khung cửi dệt vải Jacquard và Ada Lovelace",
    "audioSrc": "audio/binary_part2.wav",
    "durationInFrames": 4536,
    "startFrame": 825,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/005.png",
      "images/vi-sao-may-tinh-0-va-1/006.png",
      "images/vi-sao-may-tinh-0-va-1/007.png",
      "images/vi-sao-may-tinh-0-va-1/008.png",
      "images/vi-sao-may-tinh-0-va-1/009.png",
      "images/vi-sao-may-tinh-0-va-1/010.png",
      "images/vi-sao-may-tinh-0-va-1/011.png",
      "images/vi-sao-may-tinh-0-va-1/012.png",
      "images/vi-sao-may-tinh-0-va-1/013.png",
      "images/vi-sao-may-tinh-0-va-1/014.png",
      "images/vi-sao-may-tinh-0-va-1/015.png",
      "images/vi-sao-may-tinh-0-va-1/016.png",
      "images/vi-sao-may-tinh-0-va-1/017.png",
      "images/vi-sao-may-tinh-0-va-1/018.png",
      "images/vi-sao-may-tinh-0-va-1/019.png",
      "images/vi-sao-may-tinh-0-va-1/020.png",
      "images/vi-sao-may-tinh-0-va-1/021.png",
      "images/vi-sao-may-tinh-0-va-1/022.png",
      "images/vi-sao-may-tinh-0-va-1/023.png"
    ],
    "imageDescriptions": [
      "Đôi bàn tay đếm mười ngón bên đống lửa ấm áp cùng chiếc bàn tính cổ",
      "Chiếc bàn tính cổ với những hạt gỗ trượt trên thanh que dưới bàn tay người thợ",
      "Sáu vạch liền và đứt của quẻ Kinh Dịch cổ đại xếp chồng lên nhau huyền bí",
      "Quẻ Kinh Dịch cổ đại chuyển hóa tinh tế thành chiếc công tắc nhị phân hiện đại",
      "Nhà toán học Gottfried Leibniz bên bàn làm việc dưới ánh nến cùng những dãy ký hiệu nhị phân",
      "Trang bản thảo năm 1703 của Leibniz mô tả phép tính nhị phân đặt cạnh cây bút lông",
      "Cuộc gặp gỡ tư tưởng xuyên lục địa giữa quẻ Kinh Dịch phương Đông và nhị phân Leibniz",
      "Leibniz mỉm cười gấp cuốn sổ ghi chép, khép lại trò chơi trí tuệ đẹp đẽ của thời đại",
      "Cỗ máy tính cơ học bằng đồng thau tinh xảo với các mặt số xoay mười nấc",
      "Nhà toán học Blaise Pascal quay tay quay trên cỗ máy tính bánh răng cổ",
      "Bánh răng cỗ máy Pascal bị kẹt và bốc khói nhẹ khiến nhà phát minh bối rối",
      "Khung cửi dệt vải lớn bằng gỗ trong xưởng dệt thời kỳ đầu công nghiệp",
      "Tấm bìa đục lỗ được đưa vào khung cửi Jacquard điều khiển từng sợi chỉ",
      "Tấm vải dệt tuyệt đẹp hiện ra với hoa văn điều khiển bởi các lỗ đục có hoặc không",
      "Nhà phát minh Charles Babbage bên cỗ máy tính cơ học khổng lồ đầy tham vọng",
      "Nữ học giả Ada Lovelace bên bàn viết với các ghi chép thuật toán đầu tiên trong lịch sử",
      "Căn phòng phân loại dữ liệu dân số bằng máy đọc thẻ đục lỗ của Herman Hollerith",
      "Bức tranh kết nối quẻ bói, bản thảo, thẻ đục lỗ và bánh răng xuyên qua dòng thời gian",
      "Dòng chảy lịch sử hội tụ vào chiếc công tắc đèn hiện đại"
    ],
    "imageStartFrames": [
      0,
      151,
      388,
      638,
      889,
      1097,
      1346,
      1639,
      1814,
      1954,
      2207,
      2374,
      2468,
      2662,
      2950,
      3239,
      3593,
      4036,
      4349
    ]
  },
  {
    "id": "part3",
    "chapterNumber": 3,
    "partLabel": "PHẦN 2",
    "historicalEra": "VẬT LÝ DÒNG ĐIỆN",
    "title": "Điện Chỉ Biết Bật Và Tắt",
    "subtitle": "Vì sao hai trạng thái đáng tin cậy hơn mười trạng thái chen chúc?",
    "audioSrc": "audio/binary_part3.wav",
    "durationInFrames": 1481,
    "startFrame": 5361,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/024.png",
      "images/vi-sao-may-tinh-0-va-1/025.png",
      "images/vi-sao-may-tinh-0-va-1/026.png",
      "images/vi-sao-may-tinh-0-va-1/027.png",
      "images/vi-sao-may-tinh-0-va-1/028.png",
      "images/vi-sao-may-tinh-0-va-1/029.png",
      "images/vi-sao-may-tinh-0-va-1/030.png",
      "images/vi-sao-may-tinh-0-va-1/031.png"
    ],
    "imageDescriptions": [
      "Bóng đèn chia đôi: một nửa bừng sáng rực rỡ, một nửa tối đen tĩnh lặng",
      "Dòng điện chạy qua dây dẫn khép kín và bị chặn lại khi mạch hở",
      "Biểu tượng mạch điện gật đầu tán thành trước chiếc công tắc bật tắt rõ ràng",
      "Mặt đồng hồ với mười vạch điện áp chen chúc sát nhau dưới kính lúp lo lắng",
      "Mười mức điện áp dao động méo mó và nhòe lẫn vào nhau gây lỗi tín hiệu",
      "Mặt đồng hồ chỉ với hai mức điện áp rộng thênh thang, cách biệt an toàn tuyệt đối",
      "Đường tín hiệu nhị phân vững vàng vượt qua đám mây nhiễu điện mà không hề sai lệch",
      "Hai thanh tín hiệu 0 và 1 đứng vững chãi kiên cố như hai cột mốc không thể lay chuyển"
    ],
    "imageStartFrames": [
      0,
      210,
      375,
      470,
      738,
      948,
      1113,
      1233
    ]
  },
  {
    "id": "part4",
    "chapterNumber": 4,
    "partLabel": "PHẦN 3",
    "historicalEra": "TOÁN HỌC THẾ KỶ 19",
    "title": "George Boole & Logic Đúng Sai",
    "subtitle": "Biến suy luận thành phép toán đại số với VÀ, HOẶC, KHÔNG",
    "audioSrc": "audio/binary_part4.wav",
    "durationInFrames": 1420,
    "startFrame": 6842,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/032.png",
      "images/vi-sao-may-tinh-0-va-1/033.png",
      "images/vi-sao-may-tinh-0-va-1/034.png",
      "images/vi-sao-may-tinh-0-va-1/035.png",
      "images/vi-sao-may-tinh-0-va-1/036.png",
      "images/vi-sao-may-tinh-0-va-1/037.png",
      "images/vi-sao-may-tinh-0-va-1/038.png"
    ],
    "imageDescriptions": [
      "Chân dung nhà toán học George Boole trầm tư bên bảng đen giữa thế kỷ 19",
      "Boole viết lên bảng các phương trình logic biến đúng sai thành phép toán",
      "Ba khối hình đại diện cho ba phép toán logic cơ bản: VÀ, HOẶC, KHÔNG",
      "Khối logic VÀ chỉ sáng khi cả hai điều kiện cùng kích hoạt",
      "Khối logic HOẶC sáng rực rỡ khi chỉ cần một trong hai điều kiện được đáp ứng",
      "Boole mỉm cười nhẹ bên cuốn sách toán học thuần túy của mình",
      "Cuốn sách toán của Boole nằm yên trên giá sách như một hạt giống chờ ngày nảy mầm"
    ],
    "imageStartFrames": [
      0,
      281,
      426,
      629,
      802,
      994,
      1204
    ]
  },
  {
    "id": "part5",
    "chapterNumber": 5,
    "partLabel": "PHẦN 4",
    "historicalEra": "NĂM 1937",
    "title": "Claude Shannon Nối Logic Với Dây Điện",
    "subtitle": "Luận văn thạc sĩ thế kỷ biến công tắc thành cỗ máy biết suy luận",
    "audioSrc": "audio/binary_part5.wav",
    "durationInFrames": 1240,
    "startFrame": 8262,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/039.png",
      "images/vi-sao-may-tinh-0-va-1/040.png",
      "images/vi-sao-may-tinh-0-va-1/041.png",
      "images/vi-sao-may-tinh-0-va-1/042.png",
      "images/vi-sao-may-tinh-0-va-1/043.png",
      "images/vi-sao-may-tinh-0-va-1/044.png",
      "images/vi-sao-may-tinh-0-va-1/045.png"
    ],
    "imageDescriptions": [
      "Chàng sinh viên Claude Shannon 21 tuổi miệt mài bên sơ đồ mạch điện tại MIT",
      "Shannon phát hiện mạch điện công tắc hoạt động chuẩn xác theo logic đúng sai của Boole",
      "Hai công tắc nối tiếp nhau cùng bật sáng đèn: minh họa hoàn hảo cho phép VÀ",
      "Hai công tắc nối song song chỉ cần một cái bật là sáng đèn: minh họa phép HOẶC",
      "Bản luận văn thạc sĩ năm 1937 của Shannon phát sáng như ngọn hải đăng công nghệ",
      "Bàn tay kỹ sư lắp ráp các công tắc kim loại tạo thành mạch logic biết suy luận",
      "Sơ đồ nối liền từ logic trừu tượng thành mạng lưới dây điện và công tắc thực tế"
    ],
    "imageStartFrames": [
      0,
      193,
      380,
      526,
      665,
      819,
      994
    ]
  },
  {
    "id": "part6",
    "chapterNumber": 6,
    "partLabel": "PHẦN 5",
    "historicalEra": "KỶ NGUYÊN BÁN DẪN",
    "title": "Từ Rơle Kêu Lách Cách Đến Transistor",
    "subtitle": "Sự cố con bướm đêm, phòng thí nghiệm Bell 1947 và định luật Moore",
    "audioSrc": "audio/binary_part6.wav",
    "durationInFrames": 2615,
    "startFrame": 9502,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/046.png",
      "images/vi-sao-may-tinh-0-va-1/047.png",
      "images/vi-sao-may-tinh-0-va-1/048.png",
      "images/vi-sao-may-tinh-0-va-1/049.png",
      "images/vi-sao-may-tinh-0-va-1/050.png",
      "images/vi-sao-may-tinh-0-va-1/051.png",
      "images/vi-sao-may-tinh-0-va-1/052.png",
      "images/vi-sao-may-tinh-0-va-1/053.png",
      "images/vi-sao-may-tinh-0-va-1/054.png",
      "images/vi-sao-may-tinh-0-va-1/055.png",
      "images/vi-sao-may-tinh-0-va-1/056.png",
      "images/vi-sao-may-tinh-0-va-1/057.png"
    ],
    "imageDescriptions": [
      "Chiếc rơle điện cơ đầu tiên kêu lách cách với thanh kim loại đóng mở",
      "Kỹ sư máy tính soi đèn pin tìm thấy con bướm đêm kẹt giữa hai tiếp điểm rơle",
      "Con bướm đêm được dán cẩn thận vào sổ nhật ký máy tính cạnh dòng ghi chú 'bug'",
      "Căn phòng khổng lồ ngập tràn hàng nghìn bóng đèn chân không tỏa nhiệt nóng rực",
      "Một bóng đèn chân không bị cháy làm cả hệ thống máy tính khổng lồ ngừng hoạt động",
      "Ba nhà khoa học tại Bell Labs 1947 ngắm nhìn chiếc transistor đầu tiên vừa chế tạo",
      "Chiếc transistor nhỏ xíu đóng mở dòng điện êm ru mà không tỏa nhiệt",
      "Bàn tay đặt transistor nhỏ xíu cạnh chiếc bóng đèn chân không to lớn cồng kềnh",
      "Miếng silicon nhỏ xíu chứa hàng nghìn transistor li ti phát sáng dưới kính hiển vi",
      "Kỹ sư Gordon Moore bên bảng đồ thị biểu diễn định luật số lượng transistor tăng gấp đôi",
      "Đường cong định luật Moore vươn thẳng đứng qua nhiều thập kỷ phát triển chip",
      "Bàn tay cầm chiếc điện thoại thông minh hiện đại chứa hàng tỷ transistor trong túi áo"
    ],
    "imageStartFrames": [
      0,
      187,
      450,
      732,
      900,
      1049,
      1226,
      1474,
      1677,
      1959,
      2242,
      2422
    ]
  },
  {
    "id": "part7",
    "chapterNumber": 7,
    "partLabel": "PHẦN 6",
    "historicalEra": "MÃ HÓA KỸ THUẬT SỐ",
    "title": "Xây Dựng Thế Giới Số Từ 0 Và 1",
    "subtitle": "Bit, byte, bảng mã ASCII, Unicode, điểm ảnh pixel và âm thanh số",
    "audioSrc": "audio/binary_part7.wav",
    "durationInFrames": 3410,
    "startFrame": 12117,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/058.png",
      "images/vi-sao-may-tinh-0-va-1/059.png",
      "images/vi-sao-may-tinh-0-va-1/060.png",
      "images/vi-sao-may-tinh-0-va-1/061.png",
      "images/vi-sao-may-tinh-0-va-1/062.png",
      "images/vi-sao-may-tinh-0-va-1/063.png",
      "images/vi-sao-may-tinh-0-va-1/064.png",
      "images/vi-sao-may-tinh-0-va-1/065.png",
      "images/vi-sao-may-tinh-0-va-1/066.png",
      "images/vi-sao-may-tinh-0-va-1/067.png",
      "images/vi-sao-may-tinh-0-va-1/068.png",
      "images/vi-sao-may-tinh-0-va-1/069.png",
      "images/vi-sao-may-tinh-0-va-1/070.png",
      "images/vi-sao-may-tinh-0-va-1/071.png",
      "images/vi-sao-may-tinh-0-va-1/072.png"
    ],
    "imageDescriptions": [
      "Một hàng tám công tắc nhỏ bật tắt đại diện cho một byte dữ liệu",
      "Tám bit nhị phân nhảy múa biến đổi từ số 0 đến số 255",
      "Bảng mã ASCII quy ước từng chữ cái tiếng Anh thành một dãy số nhị phân riêng",
      "Chữ cái A phát sáng rực rỡ cùng chuỗi mã nhị phân 01000001",
      "Hai màn hình máy tính khác nhau cùng hiển thị chung một chữ cái nhờ bảng mã thống nhất",
      "Bảng mã Unicode mở rộng rực rỡ chứa tiếng Việt, chữ tượng hình và biểu tượng cảm xúc",
      "Nhóm pixel trên màn hình phóng to để lộ ma trận màu sắc cấu thành từ các byte",
      "Một bức ảnh phong cảnh tuyệt đẹp hình thành từ hàng triệu điểm ảnh nhị phân",
      "Sóng âm thanh analog uốn lượn được lấy mẫu và chuyển hóa thành dãy số nhị phân",
      "Bản nhạc số mượt mà phát ra từ những con số 0 và 1 được giải mã",
      "Cuộn phim video số chuyển động mượt mà từ hàng nghìn khung hình nhị phân nối tiếp",
      "Một hạt bụi vũ trụ bay xẹt qua chip làm đổi trạng thái của một bit nhị phân",
      "Bit chẵn lẻ kiểm tra như người lính gác phát hiện ngay bit dữ liệu bị lỗi",
      "Dữ liệu tải xuống nguyên vẹn hoàn hảo qua hàng nghìn cây số cáp quang biển",
      "Thế giới số sống động trên màn hình là bản giao hưởng của hàng tỷ công tắc nhỏ"
    ],
    "imageStartFrames": [
      0,
      103,
      401,
      563,
      821,
      1116,
      1337,
      1587,
      1860,
      2070,
      2271,
      2478,
      2685,
      2985,
      3201
    ]
  },
  {
    "id": "part8",
    "chapterNumber": 8,
    "partLabel": "PHẦN 7",
    "historicalEra": "VI KIẾN TRÚC CPU",
    "title": "Từ Công Tắc Đến Phép Tính",
    "subtitle": "Mạch cộng nhị phân và cách hàng tỷ phép tính đơn giản tạo nên trí tuệ máy",
    "audioSrc": "audio/binary_part8.wav",
    "durationInFrames": 1189,
    "startFrame": 15527,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/073.png",
      "images/vi-sao-may-tinh-0-va-1/074.png",
      "images/vi-sao-may-tinh-0-va-1/075.png",
      "images/vi-sao-may-tinh-0-va-1/076.png",
      "images/vi-sao-may-tinh-0-va-1/077.png"
    ],
    "imageDescriptions": [
      "Sơ đồ mạch cộng nhị phân nhỏ khéo léo tạo ra bit tổng và bit nhớ",
      "Bàn tay làm phép cộng tay có nhớ tương đồng với cơ chế của mạch bán cộng",
      "Mạng lưới hàng nghìn mạch cộng vi mô phối hợp nhịp nhàng bên trong bộ vi xử lý CPU",
      "Bộ vi xử lý hiện đại tính toán hàng tỷ phép toán logic trong một chớp mắt",
      "Mọi trò chơi 3D và ứng dụng phức tạp đều chẻ nhỏ thành các phép VÀ, HOẶC, KHÔNG"
    ],
    "imageStartFrames": [
      0,
      171,
      435,
      618,
      914
    ]
  },
  {
    "id": "part9",
    "chapterNumber": 9,
    "partLabel": "PHẦN 8",
    "historicalEra": "TƯƠNG LAI LƯỢNG TỬ",
    "title": "Liệu Có Mãi Mãi Chỉ 0 Và 1?",
    "subtitle": "Máy tính lượng tử qubit và ranh giới vật lý của công nghệ nhị phân",
    "audioSrc": "audio/binary_part9.wav",
    "durationInFrames": 981,
    "startFrame": 16716,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/078.png",
      "images/vi-sao-may-tinh-0-va-1/079.png",
      "images/vi-sao-may-tinh-0-va-1/080.png",
      "images/vi-sao-may-tinh-0-va-1/081.png"
    ],
    "imageDescriptions": [
      "Nhà khoa học bên cỗ máy tính lượng tử hình đèn chùm vàng trong phòng thí nghiệm",
      "Hạt qubit lượng tử lơ lửng trong trạng thái chồng chập mờ ảo giữa cả 0 và 1",
      "Sự đối lập thú vị giữa công tắc nhị phân dứt khoát và qubit lượng tử bí ẩn",
      "Trái Đất kỹ thuật số vẫn vận hành bền bỉ trên nền tảng nhị phân vững chắc"
    ],
    "imageStartFrames": [
      0,
      148,
      442,
      670
    ]
  },
  {
    "id": "part10",
    "chapterNumber": 10,
    "partLabel": "KẾT",
    "historicalEra": "LỜI KẾT",
    "title": "Hành Trình Của Hai Con Số",
    "subtitle": "Lặp lại một việc cực kỳ đơn giản hàng tỷ lần mỗi giây",
    "audioSrc": "audio/binary_part10.wav",
    "durationInFrames": 624,
    "startFrame": 17697,
    "images": [
      "images/vi-sao-may-tinh-0-va-1/082.png",
      "images/vi-sao-may-tinh-0-va-1/083.png",
      "images/vi-sao-may-tinh-0-va-1/084.png"
    ],
    "imageDescriptions": [
      "Hành trình kỳ vĩ kết nối từ quẻ bói cổ, Leibniz, Shannon đến con chip hiện đại",
      "Biểu tượng số 0 và 1 lặp lại hàng tỷ lần mỗi giây với độ chính xác tuyệt đối",
      "Màn hình máy tính mỉm cười chào tạm biệt khán giả trong ánh sáng số lung linh"
    ],
    "imageStartFrames": [
      0,
      383,
      547
    ]
  }
];
