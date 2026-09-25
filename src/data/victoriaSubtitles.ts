// Auto-generated Subtitles and Scene Configuration for Queen Victoria Short
// The Victorian Era & 40 Years of Mourning (1819 - 1901)
// 8 Chronological Scenes matching 8 artwork assets and spoken Vietnamese narration

export interface WordTiming {
  word: string;
  startMs: number;
  endMs: number;
  isKeyword?: boolean;
}

export interface PhraseCaption {
  id: number;
  sceneId: number;
  text: string;
  startMs: number;
  endMs: number;
  words: WordTiming[];
}

export interface SceneMeta {
  id: number;
  image: string;
  badge: string;
  hud: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  objectPosition?: string;
}

export const VICTORIA_TOTAL_FRAMES = 1880;
export const VICTORIA_FPS = 30;
export const VICTORIA_AUDIO_PATH = "audio/queen-victoria.wav";

export const VICTORIA_SCENES: SceneMeta[] = [
  {
    "id": 1,
    "image": "01-victoria-scene.png",
    "badge": "🖤 40 NĂM MẶC ĐỒ TANG BÍ ẨN",
    "hud": "QUEEN VICTORIA • 1819-1901",
    "startFrame": 0,
    "endFrame": 198,
    "durationInFrames": 198,
    "objectPosition": "62% center"
  },
  {
    "id": 2,
    "image": "02-victoria-scene.png",
    "badge": "👑 LÊN NGÔI VUA NĂM 18 TUỔI",
    "hud": "63 NĂM TRỊ VÌ ĐẾ CHẾ ANH",
    "startFrame": 198,
    "endFrame": 431,
    "durationInFrames": 233,
    "objectPosition": "center center"
  },
  {
    "id": 3,
    "image": "03-victoria-scene.png",
    "badge": "💍 NỮ HOÀNG QUỲ GỐI CẦU HÔN",
    "hud": "TÌNH YÊU ĐỊNH MỆNH VỚI ALBERT",
    "startFrame": 431,
    "endFrame": 703,
    "durationInFrames": 272,
    "objectPosition": "center center"
  },
  {
    "id": 4,
    "image": "04-victoria-scene.png",
    "badge": "👨‍👩‍👧‍👦 GIA ĐÌNH HOÀNG GIA & 9 NGƯỜI CON",
    "hud": "20 NĂM ĐỒNG HÀNH VỮNG CHẮC",
    "startFrame": 703,
    "endFrame": 890,
    "durationInFrames": 187,
    "objectPosition": "center center"
  },
  {
    "id": 5,
    "image": "05-victoria-scene.png",
    "badge": "🕯️ 1861: HOÀNG THÂN ALBERT QUA ĐỜI",
    "hud": "BI KỊCH TUỔI 42 VÌ THƯƠNG HÀN",
    "startFrame": 890,
    "endFrame": 1103,
    "durationInFrames": 213,
    "objectPosition": "center center"
  },
  {
    "id": 6,
    "image": "06-victoria-scene.png",
    "badge": "💔 MỖI SÁNG CHUẨN BỊ ĐỒ CHO NGƯỜI QUÁ CỐ",
    "hud": "NỖI ĐAU KHẮC KHOẢI 40 NĂM",
    "startFrame": 1103,
    "endFrame": 1355,
    "durationInFrames": 252,
    "objectPosition": "center center"
  },
  {
    "id": 7,
    "image": "07-victoria-scene.png",
    "badge": "⚙️ THỜI KỲ HOÀNG KIM & CÔNG NGHIỆP",
    "hud": "ĐẾ QUỐC TRẢI DÀI KHẮP NĂM CHÂU",
    "startFrame": 1355,
    "endFrame": 1591,
    "durationInFrames": 236,
    "objectPosition": "center center"
  },
  {
    "id": 8,
    "image": "08-victoria-scene.png",
    "badge": "🌹 TRÁI TIM CHỈ THUỘC VỀ MỘT NGƯỜI",
    "hud": "HUYỀN THOẠI NỮ HOÀNG VICTORIA",
    "startFrame": 1591,
    "endFrame": 1880,
    "durationInFrames": 289,
    "objectPosition": "center center"
  }
];

export const VICTORIA_PHRASES: PhraseCaption[] = [
  {
    "id": 1,
    "sceneId": 1,
    "text": "Người phụ nữ quyền lực nhất thế giới thế kỷ 19",
    "startMs": 0,
    "endMs": 2400,
    "words": [
      {
        "word": "Người",
        "startMs": 0,
        "endMs": 333
      },
      {
        "word": "phụ",
        "startMs": 333,
        "endMs": 533
      },
      {
        "word": "nữ",
        "startMs": 533,
        "endMs": 666
      },
      {
        "word": "quyền",
        "startMs": 666,
        "endMs": 999,
        "isKeyword": true
      },
      {
        "word": "lực",
        "startMs": 999,
        "endMs": 1199,
        "isKeyword": true
      },
      {
        "word": "nhất",
        "startMs": 1199,
        "endMs": 1466
      },
      {
        "word": "thế",
        "startMs": 1466,
        "endMs": 1666,
        "isKeyword": true
      },
      {
        "word": "giới",
        "startMs": 1666,
        "endMs": 1933
      },
      {
        "word": "thế",
        "startMs": 1933,
        "endMs": 2133,
        "isKeyword": true
      },
      {
        "word": "kỷ",
        "startMs": 2133,
        "endMs": 2266,
        "isKeyword": true
      },
      {
        "word": "19",
        "startMs": 2266,
        "endMs": 2400,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 2,
    "sceneId": 1,
    "text": "đã mặc đồ đen suốt 40 năm.",
    "startMs": 2400,
    "endMs": 3920,
    "words": [
      {
        "word": "đã",
        "startMs": 2400,
        "endMs": 2552
      },
      {
        "word": "mặc",
        "startMs": 2552,
        "endMs": 2780
      },
      {
        "word": "đồ",
        "startMs": 2780,
        "endMs": 2932
      },
      {
        "word": "đen",
        "startMs": 2932,
        "endMs": 3160,
        "isKeyword": true
      },
      {
        "word": "suốt",
        "startMs": 3160,
        "endMs": 3464
      },
      {
        "word": "40",
        "startMs": 3464,
        "endMs": 3616,
        "isKeyword": true
      },
      {
        "word": "năm.",
        "startMs": 3616,
        "endMs": 3920,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 3,
    "sceneId": 1,
    "text": "Vì một lý do khiến cả nước Anh phải rơi nước mắt.",
    "startMs": 3920,
    "endMs": 6600,
    "words": [
      {
        "word": "Vì",
        "startMs": 3920,
        "endMs": 4061,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 4061,
        "endMs": 4273
      },
      {
        "word": "lý",
        "startMs": 4273,
        "endMs": 4414,
        "isKeyword": true
      },
      {
        "word": "do",
        "startMs": 4414,
        "endMs": 4555
      },
      {
        "word": "khiến",
        "startMs": 4555,
        "endMs": 4908
      },
      {
        "word": "cả",
        "startMs": 4908,
        "endMs": 5049
      },
      {
        "word": "nước",
        "startMs": 5049,
        "endMs": 5331,
        "isKeyword": true
      },
      {
        "word": "Anh",
        "startMs": 5331,
        "endMs": 5543,
        "isKeyword": true
      },
      {
        "word": "phải",
        "startMs": 5543,
        "endMs": 5825
      },
      {
        "word": "rơi",
        "startMs": 5825,
        "endMs": 6037,
        "isKeyword": true
      },
      {
        "word": "nước",
        "startMs": 6037,
        "endMs": 6319,
        "isKeyword": true
      },
      {
        "word": "mắt.",
        "startMs": 6319,
        "endMs": 6600,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 4,
    "sceneId": 2,
    "text": "Victoria lên ngôi khi mới 18 tuổi.",
    "startMs": 6600,
    "endMs": 9000,
    "words": [
      {
        "word": "Victoria",
        "startMs": 6600,
        "endMs": 7286,
        "isKeyword": true
      },
      {
        "word": "lên",
        "startMs": 7286,
        "endMs": 7543
      },
      {
        "word": "ngôi",
        "startMs": 7543,
        "endMs": 7886
      },
      {
        "word": "khi",
        "startMs": 7886,
        "endMs": 8143
      },
      {
        "word": "mới",
        "startMs": 8143,
        "endMs": 8400
      },
      {
        "word": "18",
        "startMs": 8400,
        "endMs": 8571,
        "isKeyword": true
      },
      {
        "word": "tuổi.",
        "startMs": 8571,
        "endMs": 9000,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 5,
    "sceneId": 2,
    "text": "Bà trị vì nước Anh suốt 63 năm,",
    "startMs": 9000,
    "endMs": 11600,
    "words": [
      {
        "word": "Bà",
        "startMs": 9000,
        "endMs": 9217
      },
      {
        "word": "trị",
        "startMs": 9217,
        "endMs": 9542,
        "isKeyword": true
      },
      {
        "word": "vì",
        "startMs": 9542,
        "endMs": 9759,
        "isKeyword": true
      },
      {
        "word": "nước",
        "startMs": 9759,
        "endMs": 10192,
        "isKeyword": true
      },
      {
        "word": "Anh",
        "startMs": 10192,
        "endMs": 10517,
        "isKeyword": true
      },
      {
        "word": "suốt",
        "startMs": 10517,
        "endMs": 10950
      },
      {
        "word": "63",
        "startMs": 10950,
        "endMs": 11167,
        "isKeyword": true
      },
      {
        "word": "năm,",
        "startMs": 11167,
        "endMs": 11600,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 6,
    "sceneId": 2,
    "text": "một kỷ lục mà phải hơn một thế kỷ sau mới có người phá được.",
    "startMs": 11600,
    "endMs": 14360,
    "words": [
      {
        "word": "một",
        "startMs": 11600,
        "endMs": 11780
      },
      {
        "word": "kỷ",
        "startMs": 11780,
        "endMs": 11900,
        "isKeyword": true
      },
      {
        "word": "lục",
        "startMs": 11900,
        "endMs": 12080,
        "isKeyword": true
      },
      {
        "word": "mà",
        "startMs": 12080,
        "endMs": 12200
      },
      {
        "word": "phải",
        "startMs": 12200,
        "endMs": 12440
      },
      {
        "word": "hơn",
        "startMs": 12440,
        "endMs": 12620
      },
      {
        "word": "một",
        "startMs": 12620,
        "endMs": 12800
      },
      {
        "word": "thế",
        "startMs": 12800,
        "endMs": 12980,
        "isKeyword": true
      },
      {
        "word": "kỷ",
        "startMs": 12980,
        "endMs": 13100,
        "isKeyword": true
      },
      {
        "word": "sau",
        "startMs": 13100,
        "endMs": 13280
      },
      {
        "word": "mới",
        "startMs": 13280,
        "endMs": 13460
      },
      {
        "word": "có",
        "startMs": 13460,
        "endMs": 13580
      },
      {
        "word": "người",
        "startMs": 13580,
        "endMs": 13880
      },
      {
        "word": "phá",
        "startMs": 13880,
        "endMs": 14060
      },
      {
        "word": "được.",
        "startMs": 14060,
        "endMs": 14360
      }
    ]
  },
  {
    "id": 7,
    "sceneId": 3,
    "text": "Nhưng điều đặc biệt nhất không phải là ngai vàng,",
    "startMs": 14360,
    "endMs": 16640,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 14360,
        "endMs": 14645
      },
      {
        "word": "điều",
        "startMs": 14645,
        "endMs": 14873
      },
      {
        "word": "đặc",
        "startMs": 14873,
        "endMs": 15044
      },
      {
        "word": "biệt",
        "startMs": 15044,
        "endMs": 15272
      },
      {
        "word": "nhất",
        "startMs": 15272,
        "endMs": 15500
      },
      {
        "word": "không",
        "startMs": 15500,
        "endMs": 15785
      },
      {
        "word": "phải",
        "startMs": 15785,
        "endMs": 16013
      },
      {
        "word": "là",
        "startMs": 16013,
        "endMs": 16127
      },
      {
        "word": "ngai",
        "startMs": 16127,
        "endMs": 16355,
        "isKeyword": true
      },
      {
        "word": "vàng,",
        "startMs": 16355,
        "endMs": 16640,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 8,
    "sceneId": 3,
    "text": "mà là người đàn ông tên Albert.",
    "startMs": 16640,
    "endMs": 18960,
    "words": [
      {
        "word": "mà",
        "startMs": 16640,
        "endMs": 16826
      },
      {
        "word": "là",
        "startMs": 16826,
        "endMs": 17012
      },
      {
        "word": "người",
        "startMs": 17012,
        "endMs": 17476
      },
      {
        "word": "đàn",
        "startMs": 17476,
        "endMs": 17754
      },
      {
        "word": "ông",
        "startMs": 17754,
        "endMs": 18032
      },
      {
        "word": "tên",
        "startMs": 18032,
        "endMs": 18310
      },
      {
        "word": "Albert.",
        "startMs": 18310,
        "endMs": 18960,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 9,
    "sceneId": 3,
    "text": "Theo luật, đàn ông không được cầu hôn nữ hoàng,",
    "startMs": 18960,
    "endMs": 20760,
    "words": [
      {
        "word": "Theo",
        "startMs": 18960,
        "endMs": 19149
      },
      {
        "word": "luật,",
        "startMs": 19149,
        "endMs": 19386
      },
      {
        "word": "đàn",
        "startMs": 19386,
        "endMs": 19528
      },
      {
        "word": "ông",
        "startMs": 19528,
        "endMs": 19670
      },
      {
        "word": "không",
        "startMs": 19670,
        "endMs": 19907
      },
      {
        "word": "được",
        "startMs": 19907,
        "endMs": 20096
      },
      {
        "word": "cầu",
        "startMs": 20096,
        "endMs": 20238,
        "isKeyword": true
      },
      {
        "word": "hôn",
        "startMs": 20238,
        "endMs": 20380,
        "isKeyword": true
      },
      {
        "word": "nữ",
        "startMs": 20380,
        "endMs": 20475
      },
      {
        "word": "hoàng,",
        "startMs": 20475,
        "endMs": 20760,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 10,
    "sceneId": 3,
    "text": "nên chính Victoria đã quỳ xuống cầu hôn Albert.",
    "startMs": 20760,
    "endMs": 23440,
    "words": [
      {
        "word": "nên",
        "startMs": 20760,
        "endMs": 20966
      },
      {
        "word": "chính",
        "startMs": 20966,
        "endMs": 21310
      },
      {
        "word": "Victoria",
        "startMs": 21310,
        "endMs": 21860,
        "isKeyword": true
      },
      {
        "word": "đã",
        "startMs": 21860,
        "endMs": 21997
      },
      {
        "word": "quỳ",
        "startMs": 21997,
        "endMs": 22203,
        "isKeyword": true
      },
      {
        "word": "xuống",
        "startMs": 22203,
        "endMs": 22547,
        "isKeyword": true
      },
      {
        "word": "cầu",
        "startMs": 22547,
        "endMs": 22753,
        "isKeyword": true
      },
      {
        "word": "hôn",
        "startMs": 22753,
        "endMs": 22959,
        "isKeyword": true
      },
      {
        "word": "Albert.",
        "startMs": 22959,
        "endMs": 23440,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 11,
    "sceneId": 4,
    "text": "Họ có với nhau 9 người con,",
    "startMs": 23440,
    "endMs": 25240,
    "words": [
      {
        "word": "Họ",
        "startMs": 23440,
        "endMs": 23611
      },
      {
        "word": "có",
        "startMs": 23611,
        "endMs": 23782
      },
      {
        "word": "với",
        "startMs": 23782,
        "endMs": 24039
      },
      {
        "word": "nhau",
        "startMs": 24039,
        "endMs": 24382
      },
      {
        "word": "9",
        "startMs": 24382,
        "endMs": 24468,
        "isKeyword": true
      },
      {
        "word": "người",
        "startMs": 24468,
        "endMs": 24897
      },
      {
        "word": "con,",
        "startMs": 24897,
        "endMs": 25240,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 12,
    "sceneId": 4,
    "text": "và suốt hai mươi năm, Albert là người bà tin tưởng nhất",
    "startMs": 25240,
    "endMs": 27800,
    "words": [
      {
        "word": "và",
        "startMs": 25240,
        "endMs": 25356
      },
      {
        "word": "suốt",
        "startMs": 25356,
        "endMs": 25589
      },
      {
        "word": "hai",
        "startMs": 25589,
        "endMs": 25764,
        "isKeyword": true
      },
      {
        "word": "mươi",
        "startMs": 25764,
        "endMs": 25997,
        "isKeyword": true
      },
      {
        "word": "năm,",
        "startMs": 25997,
        "endMs": 26230,
        "isKeyword": true
      },
      {
        "word": "Albert",
        "startMs": 26230,
        "endMs": 26579,
        "isKeyword": true
      },
      {
        "word": "là",
        "startMs": 26579,
        "endMs": 26695
      },
      {
        "word": "người",
        "startMs": 26695,
        "endMs": 26986
      },
      {
        "word": "bà",
        "startMs": 26986,
        "endMs": 27102
      },
      {
        "word": "tin",
        "startMs": 27102,
        "endMs": 27277,
        "isKeyword": true
      },
      {
        "word": "tưởng",
        "startMs": 27277,
        "endMs": 27568,
        "isKeyword": true
      },
      {
        "word": "nhất",
        "startMs": 27568,
        "endMs": 27800
      }
    ]
  },
  {
    "id": 13,
    "sceneId": 4,
    "text": "trong mọi quyết định của cả đế chế.",
    "startMs": 27800,
    "endMs": 29680,
    "words": [
      {
        "word": "trong",
        "startMs": 27800,
        "endMs": 28136
      },
      {
        "word": "mọi",
        "startMs": 28136,
        "endMs": 28337
      },
      {
        "word": "quyết",
        "startMs": 28337,
        "endMs": 28673
      },
      {
        "word": "định",
        "startMs": 28673,
        "endMs": 28942
      },
      {
        "word": "của",
        "startMs": 28942,
        "endMs": 29143
      },
      {
        "word": "cả",
        "startMs": 29143,
        "endMs": 29277
      },
      {
        "word": "đế",
        "startMs": 29277,
        "endMs": 29411,
        "isKeyword": true
      },
      {
        "word": "chế.",
        "startMs": 29411,
        "endMs": 29680,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 14,
    "sceneId": 5,
    "text": "Cho đến năm 1861, Albert qua đời vì thương hàn, ở tuổi 42.",
    "startMs": 29680,
    "endMs": 34680,
    "words": [
      {
        "word": "Cho",
        "startMs": 29680,
        "endMs": 30006
      },
      {
        "word": "đến",
        "startMs": 30006,
        "endMs": 30332
      },
      {
        "word": "năm",
        "startMs": 30332,
        "endMs": 30658,
        "isKeyword": true
      },
      {
        "word": "1861,",
        "startMs": 30658,
        "endMs": 31201,
        "isKeyword": true
      },
      {
        "word": "Albert",
        "startMs": 31201,
        "endMs": 31853,
        "isKeyword": true
      },
      {
        "word": "qua",
        "startMs": 31853,
        "endMs": 32179,
        "isKeyword": true
      },
      {
        "word": "đời",
        "startMs": 32179,
        "endMs": 32505,
        "isKeyword": true
      },
      {
        "word": "vì",
        "startMs": 32505,
        "endMs": 32722,
        "isKeyword": true
      },
      {
        "word": "thương",
        "startMs": 32722,
        "endMs": 33374,
        "isKeyword": true
      },
      {
        "word": "hàn,",
        "startMs": 33374,
        "endMs": 33809,
        "isKeyword": true
      },
      {
        "word": "ở",
        "startMs": 33809,
        "endMs": 33918
      },
      {
        "word": "tuổi",
        "startMs": 33918,
        "endMs": 34353,
        "isKeyword": true
      },
      {
        "word": "42.",
        "startMs": 34353,
        "endMs": 34680,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 15,
    "sceneId": 5,
    "text": "Và Victoria không bao giờ hồi phục.",
    "startMs": 34680,
    "endMs": 36750,
    "words": [
      {
        "word": "Và",
        "startMs": 34680,
        "endMs": 34823
      },
      {
        "word": "Victoria",
        "startMs": 34823,
        "endMs": 35394,
        "isKeyword": true
      },
      {
        "word": "không",
        "startMs": 35394,
        "endMs": 35751
      },
      {
        "word": "bao",
        "startMs": 35751,
        "endMs": 35965
      },
      {
        "word": "giờ",
        "startMs": 35965,
        "endMs": 36179
      },
      {
        "word": "hồi",
        "startMs": 36179,
        "endMs": 36393,
        "isKeyword": true
      },
      {
        "word": "phục.",
        "startMs": 36393,
        "endMs": 36750,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 16,
    "sceneId": 6,
    "text": "Bà mặc đồ tang suốt gần 40 năm còn lại của cuộc đời.",
    "startMs": 36750,
    "endMs": 39320,
    "words": [
      {
        "word": "Bà",
        "startMs": 36750,
        "endMs": 36879
      },
      {
        "word": "mặc",
        "startMs": 36879,
        "endMs": 37072
      },
      {
        "word": "đồ",
        "startMs": 37072,
        "endMs": 37201
      },
      {
        "word": "tang",
        "startMs": 37201,
        "endMs": 37458,
        "isKeyword": true
      },
      {
        "word": "suốt",
        "startMs": 37458,
        "endMs": 37715
      },
      {
        "word": "gần",
        "startMs": 37715,
        "endMs": 37908
      },
      {
        "word": "40",
        "startMs": 37908,
        "endMs": 38037,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 38037,
        "endMs": 38230,
        "isKeyword": true
      },
      {
        "word": "còn",
        "startMs": 38230,
        "endMs": 38423
      },
      {
        "word": "lại",
        "startMs": 38423,
        "endMs": 38616
      },
      {
        "word": "của",
        "startMs": 38616,
        "endMs": 38809
      },
      {
        "word": "cuộc",
        "startMs": 38809,
        "endMs": 39066
      },
      {
        "word": "đời.",
        "startMs": 39066,
        "endMs": 39320,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 17,
    "sceneId": 6,
    "text": "Mỗi sáng, bà vẫn ra lệnh chuẩn bị quần áo,",
    "startMs": 39320,
    "endMs": 41920,
    "words": [
      {
        "word": "Mỗi",
        "startMs": 39320,
        "endMs": 39556
      },
      {
        "word": "sáng,",
        "startMs": 39556,
        "endMs": 39950,
        "isKeyword": true
      },
      {
        "word": "bà",
        "startMs": 39950,
        "endMs": 40108
      },
      {
        "word": "vẫn",
        "startMs": 40108,
        "endMs": 40344
      },
      {
        "word": "ra",
        "startMs": 40344,
        "endMs": 40502,
        "isKeyword": true
      },
      {
        "word": "lệnh",
        "startMs": 40502,
        "endMs": 40817,
        "isKeyword": true
      },
      {
        "word": "chuẩn",
        "startMs": 40817,
        "endMs": 41211
      },
      {
        "word": "bị",
        "startMs": 41211,
        "endMs": 41369
      },
      {
        "word": "quần",
        "startMs": 41369,
        "endMs": 41684,
        "isKeyword": true
      },
      {
        "word": "áo,",
        "startMs": 41684,
        "endMs": 41920,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 18,
    "sceneId": 6,
    "text": "nước nóng cạo râu cho Albert, như thể ông chưa từng rời đi.",
    "startMs": 41920,
    "endMs": 45160,
    "words": [
      {
        "word": "nước",
        "startMs": 41920,
        "endMs": 42196,
        "isKeyword": true
      },
      {
        "word": "nóng",
        "startMs": 42196,
        "endMs": 42472,
        "isKeyword": true
      },
      {
        "word": "cạo",
        "startMs": 42472,
        "endMs": 42679,
        "isKeyword": true
      },
      {
        "word": "râu",
        "startMs": 42679,
        "endMs": 42886,
        "isKeyword": true
      },
      {
        "word": "cho",
        "startMs": 42886,
        "endMs": 43093
      },
      {
        "word": "Albert,",
        "startMs": 43093,
        "endMs": 43576,
        "isKeyword": true
      },
      {
        "word": "như",
        "startMs": 43576,
        "endMs": 43783
      },
      {
        "word": "thể",
        "startMs": 43783,
        "endMs": 43990
      },
      {
        "word": "ông",
        "startMs": 43990,
        "endMs": 44197
      },
      {
        "word": "chưa",
        "startMs": 44197,
        "endMs": 44473
      },
      {
        "word": "từng",
        "startMs": 44473,
        "endMs": 44749
      },
      {
        "word": "rời",
        "startMs": 44749,
        "endMs": 44956
      },
      {
        "word": "đi.",
        "startMs": 44956,
        "endMs": 45160
      }
    ]
  },
  {
    "id": 19,
    "sceneId": 7,
    "text": "Nhưng nghịch lý là, chính trong nỗi đau đó,",
    "startMs": 45160,
    "endMs": 47440,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 45160,
        "endMs": 45486
      },
      {
        "word": "nghịch",
        "startMs": 45486,
        "endMs": 45877,
        "isKeyword": true
      },
      {
        "word": "lý",
        "startMs": 45877,
        "endMs": 46007,
        "isKeyword": true
      },
      {
        "word": "là,",
        "startMs": 46007,
        "endMs": 46202
      },
      {
        "word": "chính",
        "startMs": 46202,
        "endMs": 46528
      },
      {
        "word": "trong",
        "startMs": 46528,
        "endMs": 46854
      },
      {
        "word": "nỗi",
        "startMs": 46854,
        "endMs": 47049,
        "isKeyword": true
      },
      {
        "word": "đau",
        "startMs": 47049,
        "endMs": 47244,
        "isKeyword": true
      },
      {
        "word": "đó,",
        "startMs": 47244,
        "endMs": 47440
      }
    ]
  },
  {
    "id": 20,
    "sceneId": 7,
    "text": "nước Anh lại bước vào thời kỳ hoàng kim nhất lịch sử.",
    "startMs": 47440,
    "endMs": 49960,
    "words": [
      {
        "word": "nước",
        "startMs": 47440,
        "endMs": 47680,
        "isKeyword": true
      },
      {
        "word": "Anh",
        "startMs": 47680,
        "endMs": 47860,
        "isKeyword": true
      },
      {
        "word": "lại",
        "startMs": 47860,
        "endMs": 48040
      },
      {
        "word": "bước",
        "startMs": 48040,
        "endMs": 48280
      },
      {
        "word": "vào",
        "startMs": 48280,
        "endMs": 48460
      },
      {
        "word": "thời",
        "startMs": 48460,
        "endMs": 48700
      },
      {
        "word": "kỳ",
        "startMs": 48700,
        "endMs": 48820
      },
      {
        "word": "hoàng",
        "startMs": 48820,
        "endMs": 49120,
        "isKeyword": true
      },
      {
        "word": "kim",
        "startMs": 49120,
        "endMs": 49300,
        "isKeyword": true
      },
      {
        "word": "nhất",
        "startMs": 49300,
        "endMs": 49540
      },
      {
        "word": "lịch",
        "startMs": 49540,
        "endMs": 49780
      },
      {
        "word": "sử.",
        "startMs": 49780,
        "endMs": 49960
      }
    ]
  },
  {
    "id": 21,
    "sceneId": 7,
    "text": "Cách mạng công nghiệp bùng nổ,",
    "startMs": 49960,
    "endMs": 51600,
    "words": [
      {
        "word": "Cách",
        "startMs": 49960,
        "endMs": 50222,
        "isKeyword": true
      },
      {
        "word": "mạng",
        "startMs": 50222,
        "endMs": 50484,
        "isKeyword": true
      },
      {
        "word": "công",
        "startMs": 50484,
        "endMs": 50746,
        "isKeyword": true
      },
      {
        "word": "nghiệp",
        "startMs": 50746,
        "endMs": 51140,
        "isKeyword": true
      },
      {
        "word": "bùng",
        "startMs": 51140,
        "endMs": 51402,
        "isKeyword": true
      },
      {
        "word": "nổ,",
        "startMs": 51402,
        "endMs": 51600,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 22,
    "sceneId": 7,
    "text": "đế quốc Anh trải dài khắp năm châu.",
    "startMs": 51600,
    "endMs": 53040,
    "words": [
      {
        "word": "đế",
        "startMs": 51600,
        "endMs": 51703,
        "isKeyword": true
      },
      {
        "word": "quốc",
        "startMs": 51703,
        "endMs": 51909
      },
      {
        "word": "Anh",
        "startMs": 51909,
        "endMs": 52063,
        "isKeyword": true
      },
      {
        "word": "trải",
        "startMs": 52063,
        "endMs": 52269
      },
      {
        "word": "dài",
        "startMs": 52269,
        "endMs": 52423
      },
      {
        "word": "khắp",
        "startMs": 52423,
        "endMs": 52629
      },
      {
        "word": "năm",
        "startMs": 52629,
        "endMs": 52783,
        "isKeyword": true
      },
      {
        "word": "châu.",
        "startMs": 52783,
        "endMs": 53040,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 23,
    "sceneId": 8,
    "text": "Một nữ hoàng cai trị một phần tư thế giới,",
    "startMs": 53040,
    "endMs": 55080,
    "words": [
      {
        "word": "Một",
        "startMs": 53040,
        "endMs": 53225
      },
      {
        "word": "nữ",
        "startMs": 53225,
        "endMs": 53349
      },
      {
        "word": "hoàng",
        "startMs": 53349,
        "endMs": 53658,
        "isKeyword": true
      },
      {
        "word": "cai",
        "startMs": 53658,
        "endMs": 53843,
        "isKeyword": true
      },
      {
        "word": "trị",
        "startMs": 53843,
        "endMs": 54028,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 54028,
        "endMs": 54213
      },
      {
        "word": "phần",
        "startMs": 54213,
        "endMs": 54460,
        "isKeyword": true
      },
      {
        "word": "tư",
        "startMs": 54460,
        "endMs": 54584,
        "isKeyword": true
      },
      {
        "word": "thế",
        "startMs": 54584,
        "endMs": 54769,
        "isKeyword": true
      },
      {
        "word": "giới,",
        "startMs": 54769,
        "endMs": 55080
      }
    ]
  },
  {
    "id": 24,
    "sceneId": 8,
    "text": "nhưng trái tim bà cả đời chỉ thuộc về một người.",
    "startMs": 55080,
    "endMs": 57600,
    "words": [
      {
        "word": "nhưng",
        "startMs": 55080,
        "endMs": 55412
      },
      {
        "word": "trái",
        "startMs": 55412,
        "endMs": 55677,
        "isKeyword": true
      },
      {
        "word": "tim",
        "startMs": 55677,
        "endMs": 55876,
        "isKeyword": true
      },
      {
        "word": "bà",
        "startMs": 55876,
        "endMs": 56009
      },
      {
        "word": "cả",
        "startMs": 56009,
        "endMs": 56142
      },
      {
        "word": "đời",
        "startMs": 56142,
        "endMs": 56341,
        "isKeyword": true
      },
      {
        "word": "chỉ",
        "startMs": 56341,
        "endMs": 56540
      },
      {
        "word": "thuộc",
        "startMs": 56540,
        "endMs": 56872
      },
      {
        "word": "về",
        "startMs": 56872,
        "endMs": 57005
      },
      {
        "word": "một",
        "startMs": 57005,
        "endMs": 57204
      },
      {
        "word": "người.",
        "startMs": 57204,
        "endMs": 57600
      }
    ]
  },
  {
    "id": 25,
    "sceneId": 8,
    "text": "Đó là Victoria.",
    "startMs": 57600,
    "endMs": 59000,
    "words": [
      {
        "word": "Đó",
        "startMs": 57600,
        "endMs": 57815
      },
      {
        "word": "là",
        "startMs": 57815,
        "endMs": 58030
      },
      {
        "word": "Victoria.",
        "startMs": 58030,
        "endMs": 59000,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 26,
    "sceneId": 8,
    "text": "Theo dõi để nghe thêm những câu chuyện lịch sử ít ai biết.",
    "startMs": 59000,
    "endMs": 61656,
    "words": [
      {
        "word": "Theo",
        "startMs": 59000,
        "endMs": 59231
      },
      {
        "word": "dõi",
        "startMs": 59231,
        "endMs": 59404
      },
      {
        "word": "để",
        "startMs": 59404,
        "endMs": 59519
      },
      {
        "word": "nghe",
        "startMs": 59519,
        "endMs": 59750
      },
      {
        "word": "thêm",
        "startMs": 59750,
        "endMs": 59981
      },
      {
        "word": "những",
        "startMs": 59981,
        "endMs": 60270
      },
      {
        "word": "câu",
        "startMs": 60270,
        "endMs": 60443
      },
      {
        "word": "chuyện",
        "startMs": 60443,
        "endMs": 60789
      },
      {
        "word": "lịch",
        "startMs": 60789,
        "endMs": 61020
      },
      {
        "word": "sử",
        "startMs": 61020,
        "endMs": 61135
      },
      {
        "word": "ít",
        "startMs": 61135,
        "endMs": 61250
      },
      {
        "word": "ai",
        "startMs": 61250,
        "endMs": 61365
      },
      {
        "word": "biết.",
        "startMs": 61365,
        "endMs": 61656
      }
    ]
  }
];
