// Dữ liệu 8 chương phim tài liệu 'ĐẾ CHẾ MAYA SỤP ĐỔ: BÍ ẨN LỚN NHẤT CỦA NGÀNH KHẢO CỔ HỌC'
export interface MayaChapter {
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

export const MAYA_CHAPTERS: MayaChapter[] = [
  {
    "id": "part1",
    "chapterNumber": 1,
    "partLabel": "PHẦN 1",
    "historicalEra": "NĂM 1839 · KHÁM PHÁ BAN ĐẦU",
    "title": "Bí Ẩn Giữa Rừng Già",
    "subtitle": "Phát hiện chấn động năm 1839 và sự biến mất không dấu vết",
    "audioSrc": "audio/maya_part1.wav",
    "durationInFrames": 2741,
    "startFrame": 0,
    "images": [
      "images/maya-collapse/01-explorers-discover-root-covered-ruin.png",
      "images/maya-collapse/02-jungle-reclaims-stone-pyramid.png",
      "images/maya-collapse/03-mossy-hieroglyphic-stela-closeup.png",
      "images/maya-collapse/04-temples-above-jungle-canopy.png",
      "images/maya-collapse/05-thriving-city-to-abandoned-ruins.png",
      "images/maya-collapse/06-abandoned-stone-plaza.png",
      "images/maya-collapse/07-maya-glyph-mystery-symbol.png",
      "images/maya-collapse/08-competing-collapse-theories.png",
      "images/maya-collapse/09-sunset-pyramid-over-jungle.png"
    ],
    "imageDescriptions": [
      "Năm 1839: Hai nhà thám hiểm Stephens và Catherwood len lỏi rừng rậm phát hiện phế tích",
      "Đại kim tự tháp đá khổng lồ bị nuốt chửng bởi rễ cây rừng già suốt hàng trăm năm",
      "Cận cảnh tấm bia đá Stela rêu phong phủ kín với những nét chạm khắc tượng hình cổ xưa",
      "Góc nhìn flycam toàn cảnh tán rừng nhiệt đới bạt ngàn để lộ đỉnh tháp cổ nhô cao",
      "Tương phản lịch sử: Thành phố Maya phồn hoa rực rỡ và phế tích hoang tàn ngập tràn cây cối",
      "Đại quảng trường đá thinh lặng vắng bóng người, cỏ dại mọc xuyên qua từng khe đá nứt",
      "Biểu tượng dấu hỏi phát sáng tạo từ chữ tượng hình Maya lơ lửng trên nền tàn tích bí ẩn",
      "Hơn tám mươi giả thuyết khoa học đối nghịch xoay quanh sự biến mất đột ngột của Maya",
      "Hoàng hôn buông xuống trên kim tự tháp bậc thang giữa đại ngàn Trung Mỹ huyền bí"
    ],
    "imageStartFrames": [
      0,
      361,
      609,
      750,
      1218,
      1523,
      1827,
      2132,
      2275
    ]
  },
  {
    "id": "part2",
    "chapterNumber": 2,
    "partLabel": "PHẦN 2",
    "historicalEra": "THẾ KỶ 3 - 9 SCN · THỜI KỲ CỔ ĐIỂN",
    "title": "Thời Kỳ Hoàng Kim: Những Đô Thị Giữa Rừng",
    "subtitle": "Kỷ nguyên Cổ điển, đại đô thị Tikal và đỉnh cao thiên văn học",
    "audioSrc": "audio/maya_part2.wav",
    "durationInFrames": 3437,
    "startFrame": 2741,
    "images": [
      "images/maya-collapse/10-bustling-city-plaza.png",
      "images/maya-collapse/11-grand-city-skyline-sunset.png",
      "images/maya-collapse/12-king-overlooks-city.png",
      "images/maya-collapse/13-maya-metropolis-aerial.png",
      "images/maya-collapse/14-workers-build-pyramid.png",
      "images/maya-collapse/15-astronomer-studies-night-sky.png",
      "images/maya-collapse/16-scribe-paints-hieroglyphs.png",
      "images/maya-collapse/17-ceremonial-ball-game.png",
      "images/maya-collapse/18-rival-kings-border-meeting.png",
      "images/maya-collapse/19-raised-fields-and-canals.png",
      "images/maya-collapse/20-royal-palace-courtyard.png",
      "images/maya-collapse/21-pyramid-completion-ceremony.png",
      "images/maya-collapse/22-market-cacao-textiles-obsidian.png",
      "images/maya-collapse/23-city-states-trade-network-map.png"
    ],
    "imageDescriptions": [
      "Đại quảng trường đô thị Maya nhộn nhịp: Hàng trăm thương nhân trao đổi hàng hóa tấp nập",
      "Đường chân trời kỳ vĩ của đại đô thị Maya trong ánh ráng chiều rực rỡ thời hoàng kim",
      "Vua Maya đội mũ lông vũ lộng lẫy và chuỗi ngọc bích uy nghi quan sát vương quốc",
      "Đại đô thị Maya trải rộng ngút tầm mắt với hàng nghìn công trình đá giữa rừng rậm",
      "Hàng trăm nhân công miệt mài kéo những khối đá vôi khổng lồ dựng xây kim tự tháp",
      "Nhà thiên văn học Maya chăm chú quan sát bầu trời đêm và tính toán chu kỳ tinh tú",
      "Học giả ghi chép cẩn trọng vẽ từng ký tự tượng hình tinh xảo lên giấy vỏ cây thiêng",
      "Sân bóng nghi lễ cổ đại: Các đấu thủ tranh tài nảy lửa trong trò chơi bóng cao su linh thiêng",
      "Cuộc gặp gỡ thận trọng giữa hai vị vua Maya tại biên giới rừng sâu đầy căng thẳng ngoại giao",
      "Hệ thống nông nghiệp bậc thang và kênh dẫn nước tinh vi nuôi dưỡng triệu thần dân",
      "Sân cung điện hoàng gia nguy nga: Giới quý tộc mang xiêm y lộng lẫy hội tụ đàm đạo",
      "Nghi lễ hoàn thành đại kim tự tháp: Các giáo sĩ đứng trên đỉnh tháp thực hiện tế lễ",
      "Khu chợ trung tâm sầm uất: Giao thương hạt cacao, đá obsidian và vải dệt thủ công",
      "Bản đồ mô phỏng mạng lưới hơn bốn mươi thành bang kết nối bởi các tuyến đường thương mại"
    ],
    "imageStartFrames": [
      0,
      161,
      512,
      625,
      940,
      1378,
      1483,
      1718,
      1945,
      2155,
      2455,
      2700,
      2946,
      3192
    ]
  },
  {
    "id": "part3",
    "chapterNumber": 3,
    "partLabel": "PHẦN 3",
    "historicalEra": "THẾ KỶ 8 - 9 SCN · RẠN NỨT BAN ĐẦU",
    "title": "Những Triệu Chứng Suy Tàn Đầu Tiên",
    "subtitle": "Bia đá Stela ngừng dựng và những cuộc chiến tranh hủy diệt",
    "audioSrc": "audio/maya_part3.wav",
    "durationInFrames": 3155,
    "startFrame": 6178,
    "images": [
      "images/maya-collapse/24-stela-carvers-workshop-declines.png",
      "images/maya-collapse/25-abandoned-stelae-plaza.png",
      "images/maya-collapse/26-declining-stela-monuments.png",
      "images/maya-collapse/27-worried-king-and-advisors.png",
      "images/maya-collapse/28-maya-warriors-jungle-battle.png",
      "images/maya-collapse/29-raid-aftermath-burning-village.png",
      "images/maya-collapse/30-captured-warriors-procession.png",
      "images/maya-collapse/31-neglected-city-plaza.png",
      "images/maya-collapse/32-family-leaves-city.png",
      "images/maya-collapse/33-migration-from-abandoned-city.png"
    ],
    "imageDescriptions": [
      "Xưởng đục bia đá Stela thưa thớt thợ điêu khắc, dấu hiệu suy giảm nguồn lực đầu tiên",
      "Hàng bia đá Stela trên quảng trường: Những tấm bia mới dang dở bị bỏ rơi không hoàn thiện",
      "Biểu đồ cột đá Stela giảm đột ngột từ năm 800 và biến mất hoàn toàn vào năm 900",
      "Nội các hoàng gia u ám: Vị vua Maya lo âu trước những vết rạn nứt trên tường cung điện",
      "Chiến trận khốc liệt giữa các chiến binh Maya với giáo mác và vũ khí đá obsidian",
      "Ngọn lửa thiêu rụi mái tranh của ngôi làng Maya, khói bốc nghi ngút sau cuộc cướp phá",
      "Đoàn tù binh bị bắt dẫn giải trước vị vua đối địch, chiến tranh mang tính hủy diệt",
      "Quảng trường thành phố dần hoang phế, thưa thớt người qua lại và cỏ dại phủ đầy",
      "Gia đình thường dân Maya gùi hành lý trên lưng, ngoái nhìn thành phố trước khi rời đi",
      "Dòng người lũ lượt di tản rời bỏ các thành phố đất thấp phía nam đi vào rừng sâu"
    ],
    "imageStartFrames": [
      0,
      359,
      848,
      953,
      1262,
      1578,
      2513,
      2618,
      2723,
      2840
    ]
  },
  {
    "id": "part4",
    "chapterNumber": 4,
    "partLabel": "PHẦN 4",
    "historicalEra": "THẾ KỶ 9 SCN · BIẾN ĐỔI KHÍ HẬU CỔ ĐẠI",
    "title": "Giả Thuyết Đầu Tiên: Hạn Hán Khốc Liệt",
    "subtitle": "Bằng chứng từ thạch nhũ, lõi trầm tích và nghịch lý nguồn nước",
    "audioSrc": "audio/maya_part4.wav",
    "durationInFrames": 2879,
    "startFrame": 9333,
    "images": [
      "images/maya-collapse/34-parched-land-and-dead-crops.png",
      "images/maya-collapse/35-scientists-study-sediment-core.png",
      "images/maya-collapse/36-cave-stalagmites-research.png",
      "images/maya-collapse/37-dry-lakebed-dead-tree.png",
      "images/maya-collapse/38-rainfall-decline-data-visual.png",
      "images/maya-collapse/39-turquoise-cenote-water-source.png",
      "images/maya-collapse/40-water-carriers-empty-reservoir.png",
      "images/maya-collapse/41-dry-stone-reservoir.png",
      "images/maya-collapse/42-withered-corn-fields.png",
      "images/maya-collapse/43-farmer-holds-dry-soil.png",
      "images/maya-collapse/44-blazing-sun-over-drought.png"
    ],
    "imageDescriptions": [
      "Vùng đất nứt nẻ khô cằn trải dài tới tận chân trời, hoa màu chết khô dưới hạn hán",
      "Các nhà khoa học phân tích mẫu lõi trầm tích lấy từ đáy hồ để giải mã khí hậu cổ đại",
      "Nhà nghiên cứu thám hiểm hang động đá vôi khảo sát các cột thạch nhũ nghìn năm tuổi",
      "Đáy hồ cạn trơ đáy bùn nứt nẻ với thân cây khô khẳng khiu giữa không gian cằn cỗi",
      "Biểu đồ lượng mưa sụt giảm nghiêm trọng nhất trong hàng nghìn năm lịch sử khí hậu",
      "Hố sụt tự nhiên Cenote với làn nước màu ngọc bích giữa vách đá vôi kỳ vĩ",
      "Người dân mót từng gáo nước trong bể chứa đá gần cạn kiệt giữa cơn khát gay gắt",
      "Hồ chứa nước nhân tạo khổng lồ khô nứt đáy chỉ còn vũng nước tù đọng bùn lầy",
      "Cánh đồng ngô héo rũ trên sườn đồi, cây lá vàng úa dưới ánh nắng mặt trời thiêu đốt",
      "Người nông dân Maya quỳ gối tuyệt vọng nâng nắm đất khô cằn vụn vỡ trên tay",
      "Mặt trời chói chang gay gắt tỏa hơi nóng hừng hực bóp nghẹt sự sống toàn khu vực"
    ],
    "imageStartFrames": [
      0,
      461,
      728,
      922,
      1047,
      1309,
      1570,
      1817,
      2094,
      2617,
      2722
    ]
  },
  {
    "id": "part5",
    "chapterNumber": 5,
    "partLabel": "PHẦN 5",
    "historicalEra": "THẾ KỶ 8 - 9 SCN · KHỦNG HOẢNG MÔI TRƯỜNG",
    "title": "Giả Thuyết Thứ Hai: Nạn Phá Rừng & Vòng Xoáy Sinh Thái",
    "subtitle": "Nung vôi trát đền đài, xói mòn đất và vòng phản hồi tiêu cực",
    "audioSrc": "audio/maya_part5.wav",
    "durationInFrames": 3897,
    "startFrame": 12212,
    "images": [
      "images/maya-collapse/45-workers-cut-jungle-trees.png",
      "images/maya-collapse/46-limestone-kiln-burns-wood.png",
      "images/maya-collapse/47-jungle-clearing-before-after.png",
      "images/maya-collapse/48-deforestation-feedback-loop.png",
      "images/maya-collapse/49-farmland-encroaches-on-city.png",
      "images/maya-collapse/50-erosion-on-deforested-hillside.png",
      "images/maya-collapse/51-thinning-temple-roof-beams.png",
      "images/maya-collapse/52-lone-tree-cleared-field.png",
      "images/maya-collapse/53-workers-carry-timber.png"
    ],
    "imageDescriptions": [
      "Công nhân dùng rìu đá đẵn hạ cây cổ thụ ở bìa rừng nhiệt đới để mở rộng canh tác",
      "Lò nung vôi khổng lồ ngốn hàng tấn củi rừng, khói đen cuồn cuộn bốc lên bầu trời",
      "Bố cục đối lập: Một bên là rừng già rậm rạp xanh tươi, một bên là đồi trọc trơ trọi gốc cây",
      "Vòng phản hồi tiêu cực: Chặt phá rừng dẫn đến khô hạn, khô hạn buộc phải phá rừng thêm",
      "Toàn cảnh các mảng đất canh tác loang lổ gặm nhấm dần những cánh rừng nhiệt đới",
      "Mưa lớn xói mòn lớp đất màu mỡ trên sườn đồi trơ trọi sau khi mất đi thảm rừng bảo vệ",
      "Thanh xà gỗ Sapodilla đỡ mái đền nhỏ hẹp rõ rệt, bằng chứng cạn kiệt gỗ quý lâu năm",
      "Một cây đại thụ trơ trọi đơn độc giữa cánh đồng quang đãng sau nạn phá rừng triệt để",
      "Công nhân còng lưng khiêng những súc gỗ ngày càng còi cọc qua cánh rừng xơ xác"
    ],
    "imageStartFrames": [
      0,
      377,
      566,
      851,
      1732,
      2165,
      2598,
      3031,
      3464
    ]
  },
  {
    "id": "part6",
    "chapterNumber": 6,
    "partLabel": "PHẦN 6",
    "historicalEra": "THẾ KỶ 8 - 9 SCN · NỘI CHIẾN & KHỦNG HOẢNG",
    "title": "Giả Thuyết Thứ Ba: Chiến Tranh & Tan Rã Chính Trị",
    "subtitle": "Sự sụp đổ của vương quyền thần thánh và huyết mạch thương mại",
    "audioSrc": "audio/maya_part6.wav",
    "durationInFrames": 3392,
    "startFrame": 16109,
    "images": [
      "images/maya-collapse/54-king-performs-rain-ritual.png",
      "images/maya-collapse/55-skeptical-commoners-watch.png",
      "images/maya-collapse/56-armies-clash-jungle-battlefield.png",
      "images/maya-collapse/57-conquerors-burn-temple.png",
      "images/maya-collapse/58-disrupted-trade-caravan.png",
      "images/maya-collapse/59-fragmenting-city-states-map.png",
      "images/maya-collapse/60-south-empty-north-thriving.png",
      "images/maya-collapse/61-thriving-chichen-itza-city.png",
      "images/maya-collapse/62-abandoned-royal-throne-room.png",
      "images/maya-collapse/63-crumbling-stone-crown.png",
      "images/maya-collapse/64-overgrown-ceremonial-plaza.png"
    ],
    "imageDescriptions": [
      "Vua Maya quỳ trên đỉnh đền thực hiện nghi lễ cầu mưa trong nỗi tuyệt vọng và khẩn thiết",
      "Đám đông thần dân đứng từ xa nhìn nghi lễ tế thần với ánh mắt hoài nghi và bất mãn",
      "Hai đội quân Maya giao tranh đẫm máu trong rừng rậm để giành giật nguồn nước hiếm hoi",
      "Đội quân viễn chinh phóng hỏa thiêu rụi ngôi đền cổ của đối phương trong biển lửa",
      "Đoàn thương buôn hoảng loạn bỏ chạy khi bị các toán cướp tấn công trên đường mòn",
      "Bản đồ các thành bang Maya bị phân mảnh tan rã và thu hẹp lãnh thổ nghiêm trọng",
      "Sự tương phản: Thành phố phía nam hoang tàn u tối đối lập phía bắc Chichen Itza rực sáng",
      "Kinh thành Chichen Itza ở phía bắc bán đảo Yucatan vẫn nhộn nhịp thương mại phồn vinh",
      "Ngai vàng phủ da báo đốm bỏ trống trong cung điện hoang tàn, bụi phủ mờ dấu tích",
      "Vương miện đá của vương quyền thần thánh rạn nứt và sụp đổ thành từng mảnh vụn",
      "Quảng trường nghi lễ tráng lệ một thời nay ngập tràn cỏ hoang với vài bóng người cô độc"
    ],
    "imageStartFrames": [
      0,
      361,
      1019,
      1124,
      1233,
      1542,
      1850,
      2723,
      2828,
      2933,
      3222
    ]
  },
  {
    "id": "part7",
    "chapterNumber": 7,
    "partLabel": "PHẦN 7",
    "historicalEra": "THỜI KỲ HẬU CỔ ĐIỂN ĐẾN ĐƯƠNG ĐẠI",
    "title": "Sự Sụp Đổ Hay Là Một Sự Chuyển Dịch?",
    "subtitle": "Chichen Itza, Nojpetén 1697 và hàng triệu hậu duệ ngày nay",
    "audioSrc": "audio/maya_part7.wav",
    "durationInFrames": 3082,
    "startFrame": 19501,
    "images": [
      "images/maya-collapse/65-thriving-chichen-itza-pyramid.png",
      "images/maya-collapse/66-coastal-maya-trading-port.png",
      "images/maya-collapse/67-north-survives-south-fades-map.png",
      "images/maya-collapse/68-nojpeten-lake-island-city.png",
      "images/maya-collapse/69-spanish-ships-near-lake-city.png",
      "images/maya-collapse/70-maya-woman-weaving-loom.png",
      "images/maya-collapse/71-modern-maya-village-market.png",
      "images/maya-collapse/72-golden-thread-past-to-present.png",
      "images/maya-collapse/73-grandmother-teaches-weaving.png",
      "images/maya-collapse/74-modern-ceremony-at-ruins.png"
    ],
    "imageDescriptions": [
      "Kim tự tháp El Castillo tại Chichen Itza với hình tượng thần Rắn Lông Vũ sừng sững",
      "Thương cảng ven biển Maya tấp nập thuyền bè giao thương hàng hải qua vịnh Mexico",
      "Bản đồ dịch chuyển văn minh: Vùng phía bắc Yucatan bừng sáng khi phía nam thoái trào",
      "Thành bang đảo Nojpetén kiên cố giữa hồ Petén Itzá, pháo đài độc lập cuối cùng của Maya",
      "Chiến thuyền Tây Ban Nha tiến vào bờ biển năm 1697 khép lại kỷ nguyên độc lập cổ đại",
      "Phụ nữ Maya đương đại mặc áo huipil truyền thống cần mẫn dệt vải bên khung cửi cổ truyền",
      "Khu chợ sắc màu rực rỡ của cộng đồng người Maya bản địa vùng Trung Mỹ ngày nay",
      "Sợi chỉ vàng biểu tượng xuyên suốt thời gian nối liền quá khứ cổ đại với hiện tại",
      "Người bà Maya hiền hậu truyền dạy cho cháu nhỏ từng hoa văn dệt vải gia truyền",
      "Hậu duệ người Maya trang nghiêm thực hiện nghi lễ truyền thống trước thềm tàn tích cổ xưa"
    ],
    "imageStartFrames": [
      0,
      264,
      924,
      1029,
      1517,
      1622,
      1849,
      2157,
      2466,
      2774
    ]
  },
  {
    "id": "part8",
    "chapterNumber": 8,
    "partLabel": "PHẦN 8",
    "historicalEra": "KẾT LUẬN & BÀI HỌC THỜI ĐẠI",
    "title": "Những Bài Học Khoa Học Hiện Đại",
    "subtitle": "Sự cộng hưởng đa yếu tố và hồi chuông cảnh tỉnh cho thế giới",
    "audioSrc": "audio/maya_part8.wav",
    "durationInFrames": 2917,
    "startFrame": 22583,
    "images": [
      "images/maya-collapse/75-collapse-factors-converge.png",
      "images/maya-collapse/76-scientist-connects-data-and-ruins.png",
      "images/maya-collapse/77-ancient-modern-deforestation-parallel.png",
      "images/maya-collapse/78-visitor-before-ruined-pyramid.png",
      "images/maya-collapse/79-roots-reclaim-temple-wall.png",
      "images/maya-collapse/80-birds-rise-from-pyramid-dawn.png",
      "images/maya-collapse/81-temples-across-endless-canopy.png",
      "images/maya-collapse/82-sunrise-on-hieroglyphs.png"
    ],
    "imageDescriptions": [
      "Mô hình ba vòng tròn giao nhau: Hạn hán, phá rừng và chiến tranh cộng hưởng sụp đổ",
      "Nhà khoa học khí hậu hiện đại đối chiếu dữ liệu khảo cổ học bên thềm phế tích Maya",
      "Hình ảnh đối sánh song song: Nạn tàn phá thiên nhiên cổ xưa và khủng hoảng sinh thái ngày nay",
      "Khách tham quan lặng lẽ đứng trước kim tự tháp đổ nát dưới ánh hoàng hôn tráng lệ",
      "Những rễ cây đại thụ ôm trọn vách đá chạm khắc, thiên nhiên và di sản nhân loại hòa quyện",
      "Đàn chim tung cánh bay vút lên từ đỉnh kim tự tháp giữa làn sương sớm bình minh",
      "Tầm nhìn flycam ngút ngàn rừng xanh Trung Mỹ ôm ấp những đỉnh tháp nghìn năm tuổi",
      "Ánh bình minh đầu ngày rọi chiếu lên những nét chữ tượng hình cổ kính trường tồn"
    ],
    "imageStartFrames": [
      0,
      416,
      1214,
      1477,
      1582,
      1823,
      2628,
      2733
    ]
  }
];

export const TOTAL_MAYA_FRAMES = MAYA_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
