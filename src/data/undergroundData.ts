// Dữ liệu 8 chương phim tài liệu 'Cuộc Sống Bí Mật Dưới Lòng Đất: Mạng Lưới Nấm'
export interface UndergroundChapter {
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

export const TOTAL_UNDERGROUND_FRAMES = 14351;

export const UNDERGROUND_CHAPTERS: UndergroundChapter[] = [
  {
    "id": "part1",
    "chapterNumber": 1,
    "partLabel": "MỞ ĐẦU",
    "historicalEra": "HỆ SINH THÁI NGẦM",
    "title": "Mạng Lưới Dưới Chân Bạn",
    "subtitle": "Mạng lưới liên lạc phức tạp hơn internet nằm sâu dưới lớp đất rừng",
    "audioSrc": "audio/underground_part1.wav",
    "durationInFrames": 1583,
    "startFrame": 0,
    "images": [
      "images/mang-luoi-nam/001.png",
      "images/mang-luoi-nam/002.png",
      "images/mang-luoi-nam/003.png",
      "images/mang-luoi-nam/004.png",
      "images/mang-luoi-nam/005.png",
      "images/mang-luoi-nam/006.png",
      "images/mang-luoi-nam/007.png"
    ],
    "imageDescriptions": [
      "Khu rừng già nguyên sinh tĩnh lặng trong làn sương sớm mai",
      "Mạng lưới liên lạc phát sáng kỳ diệu ẩn sâu dưới rễ cây",
      "Thế giới đông đúc dưới lòng đất với sinh vật và sợi nấm chen chúc",
      "Một thìa đất rừng chứa đựng lượng sinh vật nhiều hơn cả nhân loại",
      "Tán rừng nhìn từ trên cao biến hóa thành sơ đồ mạng lưới gỗ",
      "Cây nấm nhỏ bé trồi lên từ thảm rêu ẩm ướt hé lộ bí mật",
      "Cây phả hệ sự sống: Nấm nằm tách biệt và gần với động vật"
    ],
    "imageStartFrames": [
      0,
      244,
      476,
      741,
      898,
      1088,
      1295
    ]
  },
  {
    "id": "part2",
    "chapterNumber": 2,
    "partLabel": "PHẦN 1",
    "historicalEra": "NẤM HỌC ĐỘC LẬP",
    "title": "Cây Nấm Chỉ Là Phần Nổi",
    "subtitle": "Mạng lưới sợi nấm khổng lồ và cái bắt tay lịch sử 400 triệu năm",
    "audioSrc": "audio/underground_part2.wav",
    "durationInFrames": 2028,
    "startFrame": 1583,
    "images": [
      "images/mang-luoi-nam/008.png",
      "images/mang-luoi-nam/009.png",
      "images/mang-luoi-nam/010.png",
      "images/mang-luoi-nam/011.png",
      "images/mang-luoi-nam/012.png",
      "images/mang-luoi-nam/013.png",
      "images/mang-luoi-nam/014.png",
      "images/mang-luoi-nam/015.png",
      "images/mang-luoi-nam/016.png"
    ],
    "imageDescriptions": [
      "Cây nấm trên mặt đất chỉ là phần quả nổi của tảng băng chìm",
      "Mạng lưới sợi nấm khổng lồ lan tỏa ngút ngàn trong lòng đất tối",
      "Một mét khối đất rừng chứa hàng chục cây số sợi nấm đan xen",
      "Nấm không phải thực vật: Không có diệp lục để tự quang hợp",
      "Sơ đồ di truyền: Nấm có quan hệ gần gũi với động vật hơn cây xanh",
      "Nhà thực vật học Albert Frank bên kính hiển vi quang học năm 1885",
      "Người nông dân khoe giỏ nấm cục quý hiếm cạnh vườn cây sai quả",
      "Sợi nấm quấn quanh khúc gỗ mục hút dưỡng chất nuôi cơ thể",
      "Sợi nấm tìm kiếm và bắt tay cộng sinh cùng đầu rễ cây rừng"
    ],
    "imageStartFrames": [
      0,
      287,
      488,
      704,
      841,
      1055,
      1386,
      1640,
      1858
    ]
  },
  {
    "id": "part3",
    "chapterNumber": 3,
    "partLabel": "PHẦN 2",
    "historicalEra": "CỘNG SINH RỄ CÂY",
    "title": "Một Cuộc Trao Đổi Dưới Lòng Đất",
    "subtitle": "Cây trả đường, nấm trả nước và khoáng chất nuôi sống khu rừng",
    "audioSrc": "audio/underground_part3.wav",
    "durationInFrames": 1059,
    "startFrame": 3611,
    "images": [
      "images/mang-luoi-nam/017.png",
      "images/mang-luoi-nam/018.png",
      "images/mang-luoi-nam/019.png",
      "images/mang-luoi-nam/020.png",
      "images/mang-luoi-nam/021.png"
    ],
    "imageDescriptions": [
      "Chín phần mười loài cây trên cạn gắn bó cộng sinh cùng nấm rễ",
      "Lá cây đón ánh nắng mặt trời quang hợp tạo ra dòng đường ngọt",
      "Sợi nấm luồn lách vào khe đất li ti hút nước và khoáng chất phốt pho",
      "Dòng trao đổi hai chiều công bằng: Cây gửi đường, nấm trả nước và khoáng",
      "Thực vật cổ đại bước chân lên cạn nhờ cuộc bắt tay cùng nấm 400 triệu năm trước"
    ],
    "imageStartFrames": [
      0,
      195,
      364,
      600,
      853
    ]
  },
  {
    "id": "part4",
    "chapterNumber": 4,
    "partLabel": "PHẦN 3",
    "historicalEra": "WOOD WIDE WEB",
    "title": "Khi Mạng Lưới Nối Liền Cả Khu Rừng",
    "subtitle": "Internet của rừng già: Cây mẹ truyền chất dinh dưỡng và phát tín hiệu cảnh báo",
    "audioSrc": "audio/underground_part4.wav",
    "durationInFrames": 2770,
    "startFrame": 4670,
    "images": [
      "images/mang-luoi-nam/022.png",
      "images/mang-luoi-nam/023.png",
      "images/mang-luoi-nam/024.png",
      "images/mang-luoi-nam/025.png",
      "images/mang-luoi-nam/026.png",
      "images/mang-luoi-nam/027.png",
      "images/mang-luoi-nam/028.png",
      "images/mang-luoi-nam/029.png",
      "images/mang-luoi-nam/030.png",
      "images/mang-luoi-nam/031.png",
      "images/mang-luoi-nam/032.png",
      "images/mang-luoi-nam/033.png",
      "images/mang-luoi-nam/034.png"
    ],
    "imageDescriptions": [
      "Mạng lưới sợi nấm nối liền rễ của muôn vàn cây cối thành mạng lưới chung",
      "Sơ đồ 'mạng lưới gỗ' kết nối toàn bộ khu rừng như internet sống",
      "Giáo sư Suzanne Simard lội rừng thu thập mẫu đất nghiên cứu nấm",
      "Thí nghiệm đánh dấu đồng vị carbon theo dõi dòng dinh dưỡng dưới lòng đất",
      "Máy đo phát hiện nguyên tử carbon di chuyển từ cây bạch dương sang linh sam",
      "Cây con nhỏ bé dưới bóng râm nhận đường tiếp sức từ mạng lưới nấm",
      "Cây mẹ cổ thụ xòe tán rộng làm trạm trung chuyển nuôi dưỡng đàn con",
      "Cây mẹ gửi tín hiệu cảnh báo và dinh dưỡng cho cây non quanh vùng",
      "Đàn rệp tấn công lá cây khiến cây phát tín hiệu cầu cứu hóa học",
      "Tín hiệu xung điện và hóa học lan truyền thần tốc qua sợi nấm",
      "Cây bên cạnh nhận tín hiệu lập tức kích hoạt chất phòng vệ xua đuổi sâu",
      "Khu rừng như một thực thể sống thống nhất giao tiếp và bảo bọc nhau",
      "Bản đồ mô hình mạng lưới gỗ: Tranh luận khoa học về mức độ chia sẻ tự nguyện"
    ],
    "imageStartFrames": [
      0,
      206,
      371,
      595,
      844,
      1058,
      1226,
      1458,
      1682,
      1926,
      2083,
      2308,
      2574
    ]
  },
  {
    "id": "part5",
    "chapterNumber": 5,
    "partLabel": "PHẦN 4",
    "historicalEra": "MẶT TỐI MẠNG LƯỚI",
    "title": "Mạng Lưới Cũng Có Thể Mang Tin Xấu",
    "subtitle": "Những kẻ nghe lén, cướp đường và phát tán độc tố hóa học",
    "audioSrc": "audio/underground_part5.wav",
    "durationInFrames": 2727,
    "startFrame": 7440,
    "images": [
      "images/mang-luoi-nam/035.png",
      "images/mang-luoi-nam/036.png",
      "images/mang-luoi-nam/037.png",
      "images/mang-luoi-nam/038.png",
      "images/mang-luoi-nam/039.png",
      "images/mang-luoi-nam/040.png",
      "images/mang-luoi-nam/041.png",
      "images/mang-luoi-nam/042.png",
      "images/mang-luoi-nam/043.png",
      "images/mang-luoi-nam/044.png",
      "images/mang-luoi-nam/045.png",
      "images/mang-luoi-nam/046.png"
    ],
    "imageDescriptions": [
      "Mạng lưới nấm không phải xứ sở thần tiên: Cạnh tranh và toan tính khốc liệt",
      "Sợi nấm đóng vai trò nhà môi giới lấy hoa hồng từ mọi giao dịch",
      "Nấm chặn đường dinh dưỡng của cây nếu không được trả đủ đường",
      "Loài cây củ đen tiết chất độc qua sợi nấm triệt hạ các cây đối thủ",
      "Cây láng giềng héo rũ vì chất độc lan truyền ngầm dưới đất",
      "Cây hoa ống khói ma trắng muốt không lá, sống ký sinh hút trộm đường",
      "Hoa ống khói ma cắm vòi hút cạn dưỡng chất từ sợi nấm ngầm",
      "Bào tử nấm gây bệnh di chuyển âm thầm theo đường cao tốc sợi nấm",
      "Một cây nhiễm bệnh khiến cả cụm cây xung quanh bị lây lan nhanh chóng",
      "Mạng lưới hai mặt: Vừa kết nối sẻ chia, vừa là công cụ cạnh tranh sinh tồn",
      "Hai góc nhìn đối lập: Rừng như cơ thể thống nhất hay chiến trường toan tính",
      "Tự nhiên phức tạp và kỳ diệu hơn bất kỳ câu chuyện cổ tích nào"
    ],
    "imageStartFrames": [
      0,
      145,
      473,
      660,
      810,
      1059,
      1473,
      1635,
      1845,
      2020,
      2271,
      2487
    ]
  },
  {
    "id": "part6",
    "chapterNumber": 6,
    "partLabel": "PHẦN 5",
    "historicalEra": "QUÁI VẬT OREGON",
    "title": "Sinh Vật Lớn Nhất Từng Được Biết Đến",
    "subtitle": "Cá thể nấm Armillaria khổng lồ 9 cây số vuông nặng hàng trăm tấn",
    "audioSrc": "audio/underground_part6.wav",
    "durationInFrames": 1406,
    "startFrame": 10167,
    "images": [
      "images/mang-luoi-nam/047.png",
      "images/mang-luoi-nam/048.png",
      "images/mang-luoi-nam/049.png",
      "images/mang-luoi-nam/050.png",
      "images/mang-luoi-nam/051.png",
      "images/mang-luoi-nam/052.png"
    ],
    "imageDescriptions": [
      "Quái vật nấm Armillaria khổng lồ ẩn mình dưới rừng quốc gia Oregon",
      "Khu rừng ngút ngàn rộng 9 cây số vuông thực chất chỉ là MỘT cá thể nấm",
      "Mạng lưới sợi nấm lan tỏa dưới đất nặng hàng trăm tấn, sống hơn 2.000 năm",
      "Cá thể nấm cổ xưa nảy mầm từ thời kỳ đế chế La Mã còn thịnh vượng",
      "Cụm nấm màu mật ong trồi lên mặt đất vào mùa thu hé lộ quái vật ngầm",
      "Cú sốc nhận thức: Sinh vật lớn nhất Trái Đất không phải cá voi xanh mà là nấm"
    ],
    "imageStartFrames": [
      0,
      192,
      388,
      722,
      917,
      1163
    ]
  },
  {
    "id": "part7",
    "chapterNumber": 7,
    "partLabel": "PHẦN 6",
    "historicalEra": "BẢO VỆ HÀNH TINH",
    "title": "Vì Sao Điều Này Quan Trọng Với Chúng Ta",
    "subtitle": "Kho dự trữ carbon khổng lồ và tương lai phục hồi đất đai toàn cầu",
    "audioSrc": "audio/underground_part7.wav",
    "durationInFrames": 1066,
    "startFrame": 11573,
    "images": [
      "images/mang-luoi-nam/053.png",
      "images/mang-luoi-nam/054.png",
      "images/mang-luoi-nam/055.png",
      "images/mang-luoi-nam/056.png",
      "images/mang-luoi-nam/057.png"
    ],
    "imageDescriptions": [
      "Mạng lưới nấm lưu giữ hàng tỷ tấn carbon dưới đất, bảo vệ khí hậu Trái Đất",
      "Nấm khóa chặt khí thải nhà kính trong đất rừng lâu hơn nhiều lần thân cây",
      "Máy ủi xới tung đất làm đứt gãy mạng lưới nấm, giải phóng khí carbon",
      "Khu rừng cằn cỗi mất đi sức đề kháng khi mạng lưới ngầm bị phá hủy",
      "Tương lai nông nghiệp tái sinh: Phục hồi mạng lưới nấm để chữa lành đất đai"
    ],
    "imageStartFrames": [
      0,
      148,
      398,
      623,
      808
    ]
  },
  {
    "id": "part8",
    "chapterNumber": 8,
    "partLabel": "LỜI KẾT",
    "historicalEra": "BÀI HỌC THIÊN NHIÊN",
    "title": "Thế Giới Dưới Chân Chúng Ta",
    "subtitle": "Vẻ đẹp của sự tĩnh lặng và mạng lưới kết nối kỳ diệu của sự sống",
    "audioSrc": "audio/underground_part8.wav",
    "durationInFrames": 1712,
    "startFrame": 12639,
    "images": [
      "images/mang-luoi-nam/058.png",
      "images/mang-luoi-nam/059.png",
      "images/mang-luoi-nam/060.png",
      "images/mang-luoi-nam/061.png",
      "images/mang-luoi-nam/062.png",
      "images/mang-luoi-nam/063.png"
    ],
    "imageDescriptions": [
      "Dừng chân ngắm nhìn thảm lá khô tĩnh lặng dưới tán rừng chiều",
      "Lắng nghe nhịp đập thì thầm của hàng triệu kết nối dưới chân",
      "Khung hình nghệ thuật: Thế giới bí mật dưới lòng đất phát sáng kỳ ảo",
      "Cây cối và nấm nương tựa nhau tạo nên bức tranh hài hòa của tự nhiên",
      "Con người chiêm nghiệm sự gắn kết giữa muôn loài trên hành tinh xanh",
      "Khép lại hành trình: Lời tri ân gửi tới mạng lưới sự sống diệu kỳ"
    ],
    "imageStartFrames": [
      0,
      313,
      694,
      1088,
      1418,
      1632
    ]
  }
];
