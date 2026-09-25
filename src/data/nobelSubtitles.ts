// Auto-generated Subtitles and Scene Configuration for Alfred Nobel Short
// 20 Scenes matching 20 images and Victorian Gold / Archival narrative beats

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
}

export const NOBEL_TOTAL_FRAMES = 2650;
export const NOBEL_FPS = 30;
export const NOBEL_AUDIO_PATH = "audio/alfred-nobel.wav";

export const NOBEL_SCENES: SceneMeta[] = [
  {
    "id": 1,
    "image": "01-alfred-nobel-scene.png",
    "badge": "⚜️ DI SẢN DANH GIÁ NHẤT THẾ GIỚI",
    "hud": "DI SẢN & GIẢI NOBEL BẤT TỬ",
    "startFrame": 0,
    "endFrame": 128,
    "durationInFrames": 128
  },
  {
    "id": 2,
    "image": "02-alfred-nobel-scene.png",
    "badge": "⚡ CÚ SỐC KỲ LẠ TRONG LỊCH SỬ",
    "hud": "ĐỌC BẢN CÁO PHÓ KHI CÒN SỐNG",
    "startFrame": 128,
    "endFrame": 357,
    "durationInFrames": 229
  },
  {
    "id": 3,
    "image": "03-alfred-nobel-scene.png",
    "badge": "📰 NHẦM LẪN NĂM 1888 TẠI PHÁP",
    "hud": "TỜ BÁO ĐĂNG NHẦM CÁO PHÓ",
    "startFrame": 357,
    "endFrame": 600,
    "durationInFrames": 243
  },
  {
    "id": 4,
    "image": "04-alfred-nobel-scene.png",
    "badge": "💀 'NGƯỜI BUÔN CÁI CHẾT ĐÃ CHẾT'",
    "hud": "TIÊU ĐỀ BÁO RÙNG RỢN",
    "startFrame": 600,
    "endFrame": 686,
    "durationInFrames": 86
  },
  {
    "id": 5,
    "image": "05-alfred-nobel-scene.png",
    "badge": "💣 PHÁT MINH THUỐC NỔ DYNAMITE",
    "hud": "VŨ KHÍ HỦY DIỆT MỚI",
    "startFrame": 686,
    "endFrame": 769,
    "durationInFrames": 83
  },
  {
    "id": 6,
    "image": "06-alfred-nobel-scene.png",
    "badge": "💥 NỖI KINH HOÀNG KHẮP CHIẾN TRƯỜNG",
    "hud": "HÀNG NGÀN NẠN NHÂN TỬ NẠN",
    "startFrame": 769,
    "endFrame": 863,
    "durationInFrames": 94
  },
  {
    "id": 7,
    "image": "07-alfred-nobel-scene.png",
    "badge": "💔 SỐC NẶNG TRƯỚC SỰ THẬT ĐAU LÒNG",
    "hud": "KẺ BUÔN BÁN SỰ HỦY DIỆT",
    "startFrame": 863,
    "endFrame": 1033,
    "durationInFrames": 170
  },
  {
    "id": 8,
    "image": "08-alfred-nobel-scene.png",
    "badge": "💡 QUYẾT ĐỊNH THAY ĐỔI CUỘC ĐỜI",
    "hud": "THAY ĐỔI CÁCH ĐỜI NHÌN NHẬN",
    "startFrame": 1033,
    "endFrame": 1159,
    "durationInFrames": 126
  },
  {
    "id": 9,
    "image": "09-alfred-nobel-scene.png",
    "badge": "📜 NỖI SỢ SINH RA GIẢI NOBEL",
    "hud": "BẢN DI CHÚC LỊCH SỬ 1895",
    "startFrame": 1159,
    "endFrame": 1236,
    "durationInFrames": 77
  },
  {
    "id": 10,
    "image": "10-alfred-nobel-scene.png",
    "badge": "💰 NGHỊCH LÝ CỦA KHỐI TÀI SẢN",
    "hud": "GIÀU CÓ TỪ VŨ KHÍ HÀNG LOẠT",
    "startFrame": 1236,
    "endFrame": 1417,
    "durationInFrames": 181
  },
  {
    "id": 11,
    "image": "11-alfred-nobel-scene.png",
    "badge": "🕊️ HÓA GIẢI BẰNG HÒA BÌNH THẾ GIỚI",
    "hud": "DÙNG TIỀN TÔN VINH HÒA BÌNH",
    "startFrame": 1417,
    "endFrame": 1510,
    "durationInFrames": 93
  },
  {
    "id": 12,
    "image": "12-alfred-nobel-scene.png",
    "badge": "⚖️ ĐỒNG TIỀN TÀI TRỢ TỪ THUỐC NỔ",
    "hud": "NOBEL HÒA BÌNH TỪ TIỀN BÁN VŨ KHÍ",
    "startFrame": 1510,
    "endFrame": 1621,
    "durationInFrames": 111
  },
  {
    "id": 13,
    "image": "13-alfred-nobel-scene.png",
    "badge": "🕯️ ĐỜI TƯ CÔ ĐỘC SUỐT MỘT ĐỜI",
    "hud": "KHÔNG GIA ĐÌNH, KHÔNG CON CÁI",
    "startFrame": 1621,
    "endFrame": 1746,
    "durationInFrames": 125
  },
  {
    "id": 14,
    "image": "14-alfred-nobel-scene.png",
    "badge": "🔬 ĐÊM DÀI TRONG PHÒNG THÍ NGHIỆM",
    "hud": "LẶNG LẼ BÊN NHỮNG PHÁT MINH",
    "startFrame": 1746,
    "endFrame": 1843,
    "durationInFrames": 97
  },
  {
    "id": 15,
    "image": "15-alfred-nobel-scene.png",
    "badge": "✉️ LỜI THÚ NHẬN BI QUAN NHẤT",
    "hud": "TỰ NHẬN LÀ NGƯỜI BI QUAN NHẤT",
    "startFrame": 1843,
    "endFrame": 1961,
    "durationInFrames": 118
  },
  {
    "id": 16,
    "image": "16-alfred-nobel-scene.png",
    "badge": "👑 GIA TÀI KHỔNG LỒ & BÍ MẬT LẠ",
    "hud": "VẪN CẢM THẤY TRỐNG RỖNG",
    "startFrame": 1961,
    "endFrame": 2065,
    "durationInFrames": 104
  },
  {
    "id": 17,
    "image": "17-alfred-nobel-scene.png",
    "badge": "📐 BÍ ẨN KHÔNG CÓ GIẢI TOÁN HỌC",
    "hud": "6 LĨNH VỰC LOẠI TRỪ TOÁN HỌC",
    "startFrame": 2065,
    "endFrame": 2166,
    "durationInFrames": 101
  },
  {
    "id": 18,
    "image": "18-alfred-nobel-scene.png",
    "badge": "⚔️ MÂU THUẪN VỚI NHÀ TOÁN HỌC",
    "hud": "GIẢ THUYẾT MỐI THÙ CÁ NHÂN",
    "startFrame": 2166,
    "endFrame": 2409,
    "durationInFrames": 243
  },
  {
    "id": 19,
    "image": "19-alfred-nobel-scene.png",
    "badge": "🔥 CHUỘC LẠI TÊN TUỔI BẰNG GIA TÀI",
    "hud": "DÙNG CẢ GIA TÀI ĐỂ ĐỔI LẠI DI SẢN",
    "startFrame": 2409,
    "endFrame": 2570,
    "durationInFrames": 161
  },
  {
    "id": 20,
    "image": "20-alfred-nobel-scene.png",
    "badge": "🏆 HUYỀN THOẠI ALFRED NOBEL",
    "hud": "NGƯỜI ĐÀN ÔNG THAY ĐỔI DI SẢN",
    "startFrame": 2570,
    "endFrame": 2650,
    "durationInFrames": 80
  }
];

export const NOBEL_PHRASES: PhraseCaption[] = [
  {
    "id": 1,
    "sceneId": 1,
    "text": "Alfred Nobel để lại",
    "startMs": 60,
    "endMs": 920,
    "words": [
      {
        "word": "Alfred",
        "startMs": 60,
        "endMs": 260,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 260,
        "endMs": 480,
        "isKeyword": true
      },
      {
        "word": "để",
        "startMs": 480,
        "endMs": 700,
        "isKeyword": false
      },
      {
        "word": "lại",
        "startMs": 700,
        "endMs": 920,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 2,
    "sceneId": 1,
    "text": "di sản là giải",
    "startMs": 920,
    "endMs": 1590,
    "words": [
      {
        "word": "di",
        "startMs": 920,
        "endMs": 1000,
        "isKeyword": true
      },
      {
        "word": "sản",
        "startMs": 1000,
        "endMs": 1210,
        "isKeyword": true
      },
      {
        "word": "là",
        "startMs": 1210,
        "endMs": 1340,
        "isKeyword": false
      },
      {
        "word": "giải",
        "startMs": 1340,
        "endMs": 1590,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 3,
    "sceneId": 1,
    "text": "thưởng danh giá nhất",
    "startMs": 1590,
    "endMs": 2610,
    "words": [
      {
        "word": "thưởng",
        "startMs": 1590,
        "endMs": 1980,
        "isKeyword": true
      },
      {
        "word": "danh",
        "startMs": 1980,
        "endMs": 2190,
        "isKeyword": true
      },
      {
        "word": "giá",
        "startMs": 2190,
        "endMs": 2350,
        "isKeyword": true
      },
      {
        "word": "nhất",
        "startMs": 2350,
        "endMs": 2610,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 4,
    "sceneId": 1,
    "text": "thế giới — giải Nobel.",
    "startMs": 2610,
    "endMs": 4280,
    "words": [
      {
        "word": "thế",
        "startMs": 2610,
        "endMs": 2830,
        "isKeyword": true
      },
      {
        "word": "giới",
        "startMs": 2830,
        "endMs": 3350,
        "isKeyword": true
      },
      {
        "word": "—",
        "startMs": 3350,
        "endMs": 3500,
        "isKeyword": false
      },
      {
        "word": "giải",
        "startMs": 3350,
        "endMs": 3760,
        "isKeyword": true
      },
      {
        "word": "Nobel.",
        "startMs": 3760,
        "endMs": 4280,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 5,
    "sceneId": 2,
    "text": "Nhưng lý do ông",
    "startMs": 4280,
    "endMs": 4980,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 4280,
        "endMs": 4560,
        "isKeyword": false
      },
      {
        "word": "lý",
        "startMs": 4560,
        "endMs": 4700,
        "isKeyword": false
      },
      {
        "word": "do",
        "startMs": 4700,
        "endMs": 4790,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 4790,
        "endMs": 4980,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 6,
    "sceneId": 2,
    "text": "lập ra giải thưởng",
    "startMs": 4980,
    "endMs": 6020,
    "words": [
      {
        "word": "lập",
        "startMs": 4980,
        "endMs": 5220,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 5220,
        "endMs": 5310,
        "isKeyword": false
      },
      {
        "word": "giải",
        "startMs": 5310,
        "endMs": 5590,
        "isKeyword": true
      },
      {
        "word": "thưởng",
        "startMs": 5590,
        "endMs": 6020,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 7,
    "sceneId": 2,
    "text": "đó lại bắt nguồn",
    "startMs": 6020,
    "endMs": 6920,
    "words": [
      {
        "word": "đó",
        "startMs": 6020,
        "endMs": 6450,
        "isKeyword": false
      },
      {
        "word": "lại",
        "startMs": 6450,
        "endMs": 6500,
        "isKeyword": true
      },
      {
        "word": "bắt",
        "startMs": 6500,
        "endMs": 6690,
        "isKeyword": false
      },
      {
        "word": "nguồn",
        "startMs": 6690,
        "endMs": 6920,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 8,
    "sceneId": 2,
    "text": "từ một trong những",
    "startMs": 6920,
    "endMs": 7690,
    "words": [
      {
        "word": "từ",
        "startMs": 6920,
        "endMs": 7070,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 7070,
        "endMs": 7300,
        "isKeyword": false
      },
      {
        "word": "trong",
        "startMs": 7300,
        "endMs": 7430,
        "isKeyword": false
      },
      {
        "word": "những",
        "startMs": 7430,
        "endMs": 7690,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 9,
    "sceneId": 2,
    "text": "cú sốc kỳ lạ",
    "startMs": 7690,
    "endMs": 8210,
    "words": [
      {
        "word": "cú",
        "startMs": 7690,
        "endMs": 7790,
        "isKeyword": true
      },
      {
        "word": "sốc",
        "startMs": 7790,
        "endMs": 7990,
        "isKeyword": true
      },
      {
        "word": "kỳ",
        "startMs": 7990,
        "endMs": 8100,
        "isKeyword": true
      },
      {
        "word": "lạ",
        "startMs": 8100,
        "endMs": 8210,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 10,
    "sceneId": 2,
    "text": "nhất lịch sử: ông",
    "startMs": 8210,
    "endMs": 9380,
    "words": [
      {
        "word": "nhất",
        "startMs": 8210,
        "endMs": 8460,
        "isKeyword": true
      },
      {
        "word": "lịch",
        "startMs": 8460,
        "endMs": 8640,
        "isKeyword": true
      },
      {
        "word": "sử:",
        "startMs": 8640,
        "endMs": 9040,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 9040,
        "endMs": 9380,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 11,
    "sceneId": 2,
    "text": "từng đọc cáo phó",
    "startMs": 9380,
    "endMs": 10190,
    "words": [
      {
        "word": "từng",
        "startMs": 9380,
        "endMs": 9490,
        "isKeyword": false
      },
      {
        "word": "đọc",
        "startMs": 9490,
        "endMs": 9760,
        "isKeyword": false
      },
      {
        "word": "cáo",
        "startMs": 9760,
        "endMs": 9950,
        "isKeyword": true
      },
      {
        "word": "phó",
        "startMs": 9950,
        "endMs": 10190,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 12,
    "sceneId": 2,
    "text": "của chính mình khi vẫn còn sống.",
    "startMs": 10190,
    "endMs": 11910,
    "words": [
      {
        "word": "của",
        "startMs": 10190,
        "endMs": 10400,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 10400,
        "endMs": 10630,
        "isKeyword": true
      },
      {
        "word": "mình",
        "startMs": 10630,
        "endMs": 10950,
        "isKeyword": true
      },
      {
        "word": "khi",
        "startMs": 10950,
        "endMs": 11000,
        "isKeyword": false
      },
      {
        "word": "vẫn",
        "startMs": 11000,
        "endMs": 11230,
        "isKeyword": false
      },
      {
        "word": "còn",
        "startMs": 11230,
        "endMs": 11410,
        "isKeyword": false
      },
      {
        "word": "sống.",
        "startMs": 11410,
        "endMs": 11910,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 13,
    "sceneId": 3,
    "text": "Chuyện là năm 1888,",
    "startMs": 11910,
    "endMs": 13800,
    "words": [
      {
        "word": "Chuyện",
        "startMs": 11910,
        "endMs": 12450,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 12450,
        "endMs": 12650,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 12650,
        "endMs": 12920,
        "isKeyword": false
      },
      {
        "word": "1888,",
        "startMs": 12920,
        "endMs": 13800,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 14,
    "sceneId": 3,
    "text": "khi anh trai Alfred",
    "startMs": 13800,
    "endMs": 14710,
    "words": [
      {
        "word": "khi",
        "startMs": 13800,
        "endMs": 14040,
        "isKeyword": false
      },
      {
        "word": "anh",
        "startMs": 14040,
        "endMs": 14150,
        "isKeyword": true
      },
      {
        "word": "trai",
        "startMs": 14150,
        "endMs": 14360,
        "isKeyword": true
      },
      {
        "word": "Alfred",
        "startMs": 14360,
        "endMs": 14710,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 15,
    "sceneId": 3,
    "text": "qua đời, một tờ",
    "startMs": 14710,
    "endMs": 15790,
    "words": [
      {
        "word": "qua",
        "startMs": 14710,
        "endMs": 14880,
        "isKeyword": true
      },
      {
        "word": "đời,",
        "startMs": 14880,
        "endMs": 15580,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 15580,
        "endMs": 15610,
        "isKeyword": false
      },
      {
        "word": "tờ",
        "startMs": 15610,
        "endMs": 15790,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 16,
    "sceneId": 3,
    "text": "báo Pháp nhầm lẫn",
    "startMs": 15790,
    "endMs": 16870,
    "words": [
      {
        "word": "báo",
        "startMs": 15790,
        "endMs": 15970,
        "isKeyword": false
      },
      {
        "word": "Pháp",
        "startMs": 15970,
        "endMs": 16290,
        "isKeyword": true
      },
      {
        "word": "nhầm",
        "startMs": 16290,
        "endMs": 16470,
        "isKeyword": true
      },
      {
        "word": "lẫn",
        "startMs": 16470,
        "endMs": 16870,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 17,
    "sceneId": 3,
    "text": "và đăng nhầm cáo",
    "startMs": 16870,
    "endMs": 17700,
    "words": [
      {
        "word": "và",
        "startMs": 16870,
        "endMs": 16920,
        "isKeyword": false
      },
      {
        "word": "đăng",
        "startMs": 16920,
        "endMs": 17180,
        "isKeyword": false
      },
      {
        "word": "nhầm",
        "startMs": 17180,
        "endMs": 17570,
        "isKeyword": true
      },
      {
        "word": "cáo",
        "startMs": 17570,
        "endMs": 17700,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 18,
    "sceneId": 3,
    "text": "phó của Alfred Nobel thay vì anh trai ông.",
    "startMs": 17700,
    "endMs": 20000,
    "words": [
      {
        "word": "phó",
        "startMs": 17700,
        "endMs": 17900,
        "isKeyword": true
      },
      {
        "word": "của",
        "startMs": 17900,
        "endMs": 18160,
        "isKeyword": false
      },
      {
        "word": "Alfred",
        "startMs": 18160,
        "endMs": 18480,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 18480,
        "endMs": 18800,
        "isKeyword": true
      },
      {
        "word": "thay",
        "startMs": 18800,
        "endMs": 19030,
        "isKeyword": true
      },
      {
        "word": "vì",
        "startMs": 19030,
        "endMs": 19210,
        "isKeyword": false
      },
      {
        "word": "anh",
        "startMs": 19210,
        "endMs": 19390,
        "isKeyword": true
      },
      {
        "word": "trai",
        "startMs": 19390,
        "endMs": 19620,
        "isKeyword": true
      },
      {
        "word": "ông.",
        "startMs": 19620,
        "endMs": 20000,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 19,
    "sceneId": 4,
    "text": "Tiêu đề bài báo",
    "startMs": 20000,
    "endMs": 20890,
    "words": [
      {
        "word": "Tiêu",
        "startMs": 20000,
        "endMs": 20230,
        "isKeyword": false
      },
      {
        "word": "đề",
        "startMs": 20230,
        "endMs": 20460,
        "isKeyword": false
      },
      {
        "word": "bài",
        "startMs": 20460,
        "endMs": 20640,
        "isKeyword": false
      },
      {
        "word": "báo",
        "startMs": 20640,
        "endMs": 20890,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 20,
    "sceneId": 4,
    "text": "còn tệ hơn: 'Người",
    "startMs": 20890,
    "endMs": 21870,
    "words": [
      {
        "word": "còn",
        "startMs": 20890,
        "endMs": 21050,
        "isKeyword": false
      },
      {
        "word": "tệ",
        "startMs": 21050,
        "endMs": 21190,
        "isKeyword": false
      },
      {
        "word": "hơn:",
        "startMs": 21190,
        "endMs": 21600,
        "isKeyword": false
      },
      {
        "word": "'Người",
        "startMs": 21600,
        "endMs": 21870,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 21,
    "sceneId": 4,
    "text": "buôn cái chết đã chết' —",
    "startMs": 21870,
    "endMs": 23030,
    "words": [
      {
        "word": "buôn",
        "startMs": 21870,
        "endMs": 22080,
        "isKeyword": true
      },
      {
        "word": "cái",
        "startMs": 22080,
        "endMs": 22230,
        "isKeyword": true
      },
      {
        "word": "chết",
        "startMs": 22230,
        "endMs": 22440,
        "isKeyword": true
      },
      {
        "word": "đã",
        "startMs": 22440,
        "endMs": 22600,
        "isKeyword": false
      },
      {
        "word": "chết'",
        "startMs": 22600,
        "endMs": 22880,
        "isKeyword": true
      },
      {
        "word": "—",
        "startMs": 22880,
        "endMs": 23030,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 22,
    "sceneId": 5,
    "text": "ám chỉ việc ông",
    "startMs": 22880,
    "endMs": 23690,
    "words": [
      {
        "word": "ám",
        "startMs": 22880,
        "endMs": 23030,
        "isKeyword": false
      },
      {
        "word": "chỉ",
        "startMs": 23030,
        "endMs": 23240,
        "isKeyword": false
      },
      {
        "word": "việc",
        "startMs": 23240,
        "endMs": 23550,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 23550,
        "endMs": 23690,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 23,
    "sceneId": 5,
    "text": "là người phát minh",
    "startMs": 23690,
    "endMs": 24620,
    "words": [
      {
        "word": "là",
        "startMs": 23690,
        "endMs": 23820,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 23820,
        "endMs": 24180,
        "isKeyword": true
      },
      {
        "word": "phát",
        "startMs": 24180,
        "endMs": 24400,
        "isKeyword": true
      },
      {
        "word": "minh",
        "startMs": 24400,
        "endMs": 24620,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 24,
    "sceneId": 5,
    "text": "ra thuốc nổ dynamite,",
    "startMs": 24620,
    "endMs": 25640,
    "words": [
      {
        "word": "ra",
        "startMs": 24620,
        "endMs": 24670,
        "isKeyword": false
      },
      {
        "word": "thuốc",
        "startMs": 24670,
        "endMs": 24980,
        "isKeyword": true
      },
      {
        "word": "nổ",
        "startMs": 24980,
        "endMs": 25150,
        "isKeyword": true
      },
      {
        "word": "dynamite,",
        "startMs": 25150,
        "endMs": 25640,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 25,
    "sceneId": 6,
    "text": "thứ đã giết chết",
    "startMs": 25640,
    "endMs": 26440,
    "words": [
      {
        "word": "thứ",
        "startMs": 25640,
        "endMs": 25910,
        "isKeyword": false
      },
      {
        "word": "đã",
        "startMs": 25910,
        "endMs": 25960,
        "isKeyword": false
      },
      {
        "word": "giết",
        "startMs": 25960,
        "endMs": 26200,
        "isKeyword": true
      },
      {
        "word": "chết",
        "startMs": 26200,
        "endMs": 26440,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 26,
    "sceneId": 6,
    "text": "hàng ngàn người trong",
    "startMs": 26440,
    "endMs": 27360,
    "words": [
      {
        "word": "hàng",
        "startMs": 26440,
        "endMs": 26650,
        "isKeyword": true
      },
      {
        "word": "ngàn",
        "startMs": 26650,
        "endMs": 26840,
        "isKeyword": true
      },
      {
        "word": "người",
        "startMs": 26840,
        "endMs": 27160,
        "isKeyword": true
      },
      {
        "word": "trong",
        "startMs": 27160,
        "endMs": 27360,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 27,
    "sceneId": 6,
    "text": "chiến tranh và khai thác mỏ.",
    "startMs": 27360,
    "endMs": 28760,
    "words": [
      {
        "word": "chiến",
        "startMs": 27360,
        "endMs": 27640,
        "isKeyword": true
      },
      {
        "word": "tranh",
        "startMs": 27640,
        "endMs": 27840,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 27840,
        "endMs": 27960,
        "isKeyword": false
      },
      {
        "word": "khai",
        "startMs": 27960,
        "endMs": 28120,
        "isKeyword": true
      },
      {
        "word": "thác",
        "startMs": 28120,
        "endMs": 28380,
        "isKeyword": true
      },
      {
        "word": "mỏ.",
        "startMs": 28380,
        "endMs": 28760,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 28,
    "sceneId": 7,
    "text": "Đọc chính cáo phó",
    "startMs": 28760,
    "endMs": 29470,
    "words": [
      {
        "word": "Đọc",
        "startMs": 28760,
        "endMs": 29000,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 29000,
        "endMs": 29160,
        "isKeyword": true
      },
      {
        "word": "cáo",
        "startMs": 29160,
        "endMs": 29280,
        "isKeyword": true
      },
      {
        "word": "phó",
        "startMs": 29280,
        "endMs": 29470,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 29,
    "sceneId": 7,
    "text": "của mình, Nobel sốc",
    "startMs": 29470,
    "endMs": 30510,
    "words": [
      {
        "word": "của",
        "startMs": 29470,
        "endMs": 29640,
        "isKeyword": false
      },
      {
        "word": "mình,",
        "startMs": 29640,
        "endMs": 30040,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 30040,
        "endMs": 30280,
        "isKeyword": true
      },
      {
        "word": "sốc",
        "startMs": 30280,
        "endMs": 30510,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 30,
    "sceneId": 7,
    "text": "nặng khi nhận ra",
    "startMs": 30510,
    "endMs": 31290,
    "words": [
      {
        "word": "nặng",
        "startMs": 30510,
        "endMs": 30860,
        "isKeyword": true
      },
      {
        "word": "khi",
        "startMs": 30860,
        "endMs": 30960,
        "isKeyword": false
      },
      {
        "word": "nhận",
        "startMs": 30960,
        "endMs": 31210,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 31210,
        "endMs": 31290,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 31,
    "sceneId": 7,
    "text": "thế giới sẽ nhớ",
    "startMs": 31290,
    "endMs": 32300,
    "words": [
      {
        "word": "thế",
        "startMs": 31290,
        "endMs": 31530,
        "isKeyword": true
      },
      {
        "word": "giới",
        "startMs": 31530,
        "endMs": 32030,
        "isKeyword": true
      },
      {
        "word": "sẽ",
        "startMs": 32030,
        "endMs": 32130,
        "isKeyword": false
      },
      {
        "word": "nhớ",
        "startMs": 32130,
        "endMs": 32300,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 32,
    "sceneId": 7,
    "text": "đến ông chỉ như",
    "startMs": 32300,
    "endMs": 32960,
    "words": [
      {
        "word": "đến",
        "startMs": 32300,
        "endMs": 32520,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 32520,
        "endMs": 32650,
        "isKeyword": false
      },
      {
        "word": "chỉ",
        "startMs": 32650,
        "endMs": 32820,
        "isKeyword": false
      },
      {
        "word": "như",
        "startMs": 32820,
        "endMs": 32960,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 33,
    "sceneId": 7,
    "text": "một kẻ buôn bán công cụ hủy diệt.",
    "startMs": 32960,
    "endMs": 34440,
    "words": [
      {
        "word": "một",
        "startMs": 32960,
        "endMs": 33130,
        "isKeyword": false
      },
      {
        "word": "kẻ",
        "startMs": 33130,
        "endMs": 33260,
        "isKeyword": false
      },
      {
        "word": "buôn",
        "startMs": 33260,
        "endMs": 33430,
        "isKeyword": true
      },
      {
        "word": "bán",
        "startMs": 33430,
        "endMs": 33560,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 33560,
        "endMs": 33730,
        "isKeyword": true
      },
      {
        "word": "cụ",
        "startMs": 33730,
        "endMs": 33860,
        "isKeyword": true
      },
      {
        "word": "hủy",
        "startMs": 33860,
        "endMs": 33990,
        "isKeyword": true
      },
      {
        "word": "diệt.",
        "startMs": 34060,
        "endMs": 34440,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 34,
    "sceneId": 8,
    "text": "Ông quyết định phải",
    "startMs": 34440,
    "endMs": 35300,
    "words": [
      {
        "word": "Ông",
        "startMs": 34440,
        "endMs": 34600,
        "isKeyword": false
      },
      {
        "word": "quyết",
        "startMs": 34600,
        "endMs": 34820,
        "isKeyword": false
      },
      {
        "word": "định",
        "startMs": 34820,
        "endMs": 35120,
        "isKeyword": false
      },
      {
        "word": "phải",
        "startMs": 35120,
        "endMs": 35300,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 35,
    "sceneId": 8,
    "text": "làm gì đó để",
    "startMs": 35300,
    "endMs": 35910,
    "words": [
      {
        "word": "làm",
        "startMs": 35300,
        "endMs": 35440,
        "isKeyword": false
      },
      {
        "word": "gì",
        "startMs": 35440,
        "endMs": 35550,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 35550,
        "endMs": 35690,
        "isKeyword": false
      },
      {
        "word": "để",
        "startMs": 35690,
        "endMs": 35910,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 36,
    "sceneId": 8,
    "text": "thay đổi cách người",
    "startMs": 35910,
    "endMs": 36690,
    "words": [
      {
        "word": "thay",
        "startMs": 35910,
        "endMs": 36010,
        "isKeyword": true
      },
      {
        "word": "đổi",
        "startMs": 36010,
        "endMs": 36250,
        "isKeyword": true
      },
      {
        "word": "cách",
        "startMs": 36250,
        "endMs": 36400,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 36400,
        "endMs": 36690,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 37,
    "sceneId": 8,
    "text": "đời nhìn nhận về",
    "startMs": 36690,
    "endMs": 37430,
    "words": [
      {
        "word": "đời",
        "startMs": 36690,
        "endMs": 36900,
        "isKeyword": true
      },
      {
        "word": "nhìn",
        "startMs": 36900,
        "endMs": 37080,
        "isKeyword": false
      },
      {
        "word": "nhận",
        "startMs": 37080,
        "endMs": 37290,
        "isKeyword": false
      },
      {
        "word": "về",
        "startMs": 37290,
        "endMs": 37430,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 38,
    "sceneId": 8,
    "text": "mình sau khi thực sự qua đời —",
    "startMs": 37430,
    "endMs": 38790,
    "words": [
      {
        "word": "mình",
        "startMs": 37430,
        "endMs": 37610,
        "isKeyword": true
      },
      {
        "word": "sau",
        "startMs": 37610,
        "endMs": 37740,
        "isKeyword": false
      },
      {
        "word": "khi",
        "startMs": 37740,
        "endMs": 37830,
        "isKeyword": false
      },
      {
        "word": "thực",
        "startMs": 37830,
        "endMs": 38050,
        "isKeyword": false
      },
      {
        "word": "sự",
        "startMs": 38050,
        "endMs": 38190,
        "isKeyword": false
      },
      {
        "word": "qua",
        "startMs": 38190,
        "endMs": 38300,
        "isKeyword": true
      },
      {
        "word": "đời",
        "startMs": 38300,
        "endMs": 38640,
        "isKeyword": true
      },
      {
        "word": "—",
        "startMs": 38640,
        "endMs": 38790,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 39,
    "sceneId": 9,
    "text": "và giải Nobel",
    "startMs": 38640,
    "endMs": 39300,
    "words": [
      {
        "word": "và",
        "startMs": 38640,
        "endMs": 38870,
        "isKeyword": false
      },
      {
        "word": "giải",
        "startMs": 38870,
        "endMs": 39060,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 39060,
        "endMs": 39300,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 40,
    "sceneId": 9,
    "text": "ra đời từ",
    "startMs": 39300,
    "endMs": 39860,
    "words": [
      {
        "word": "ra",
        "startMs": 39300,
        "endMs": 39390,
        "isKeyword": false
      },
      {
        "word": "đời",
        "startMs": 39390,
        "endMs": 39670,
        "isKeyword": true
      },
      {
        "word": "từ",
        "startMs": 39670,
        "endMs": 39860,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 41,
    "sceneId": 9,
    "text": "chính nỗi sợ hãi đó.",
    "startMs": 39860,
    "endMs": 41200,
    "words": [
      {
        "word": "chính",
        "startMs": 39860,
        "endMs": 40150,
        "isKeyword": true
      },
      {
        "word": "nỗi",
        "startMs": 40150,
        "endMs": 40380,
        "isKeyword": false
      },
      {
        "word": "sợ",
        "startMs": 40380,
        "endMs": 40560,
        "isKeyword": true
      },
      {
        "word": "hãi",
        "startMs": 40560,
        "endMs": 40730,
        "isKeyword": true
      },
      {
        "word": "đó.",
        "startMs": 40730,
        "endMs": 41200,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 42,
    "sceneId": 10,
    "text": "Nhưng đây mới là",
    "startMs": 41200,
    "endMs": 41910,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 41200,
        "endMs": 41420,
        "isKeyword": false
      },
      {
        "word": "đây",
        "startMs": 41420,
        "endMs": 41610,
        "isKeyword": false
      },
      {
        "word": "mới",
        "startMs": 41610,
        "endMs": 41800,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 41800,
        "endMs": 41910,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 43,
    "sceneId": 10,
    "text": "chi tiết trớ trêu",
    "startMs": 41910,
    "endMs": 42750,
    "words": [
      {
        "word": "chi",
        "startMs": 41910,
        "endMs": 42050,
        "isKeyword": false
      },
      {
        "word": "tiết",
        "startMs": 42050,
        "endMs": 42310,
        "isKeyword": false
      },
      {
        "word": "trớ",
        "startMs": 42310,
        "endMs": 42540,
        "isKeyword": true
      },
      {
        "word": "trêu",
        "startMs": 42540,
        "endMs": 42750,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 44,
    "sceneId": 10,
    "text": "nhất: Nobel giàu có",
    "startMs": 42750,
    "endMs": 43930,
    "words": [
      {
        "word": "nhất:",
        "startMs": 42750,
        "endMs": 43320,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 43320,
        "endMs": 43440,
        "isKeyword": true
      },
      {
        "word": "giàu",
        "startMs": 43440,
        "endMs": 43720,
        "isKeyword": true
      },
      {
        "word": "có",
        "startMs": 43720,
        "endMs": 43930,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 45,
    "sceneId": 10,
    "text": "nhờ phát minh ra",
    "startMs": 43930,
    "endMs": 44860,
    "words": [
      {
        "word": "nhờ",
        "startMs": 43930,
        "endMs": 44260,
        "isKeyword": false
      },
      {
        "word": "phát",
        "startMs": 44260,
        "endMs": 44530,
        "isKeyword": true
      },
      {
        "word": "minh",
        "startMs": 44530,
        "endMs": 44750,
        "isKeyword": true
      },
      {
        "word": "ra",
        "startMs": 44750,
        "endMs": 44860,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 46,
    "sceneId": 10,
    "text": "dynamite, thứ vũ khí giết người hàng loạt,",
    "startMs": 44860,
    "endMs": 47220,
    "words": [
      {
        "word": "dynamite,",
        "startMs": 44860,
        "endMs": 45360,
        "isKeyword": true
      },
      {
        "word": "thứ",
        "startMs": 45360,
        "endMs": 45610,
        "isKeyword": false
      },
      {
        "word": "vũ",
        "startMs": 45610,
        "endMs": 45690,
        "isKeyword": true
      },
      {
        "word": "khí",
        "startMs": 45690,
        "endMs": 45850,
        "isKeyword": true
      },
      {
        "word": "giết",
        "startMs": 45850,
        "endMs": 46100,
        "isKeyword": true
      },
      {
        "word": "người",
        "startMs": 46100,
        "endMs": 46440,
        "isKeyword": true
      },
      {
        "word": "hàng",
        "startMs": 46440,
        "endMs": 46650,
        "isKeyword": true
      },
      {
        "word": "loạt,",
        "startMs": 46650,
        "endMs": 47220,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 47,
    "sceneId": 11,
    "text": "rồi dùng chính số",
    "startMs": 47220,
    "endMs": 47770,
    "words": [
      {
        "word": "rồi",
        "startMs": 47220,
        "endMs": 47250,
        "isKeyword": false
      },
      {
        "word": "dùng",
        "startMs": 47250,
        "endMs": 47400,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 47400,
        "endMs": 47620,
        "isKeyword": true
      },
      {
        "word": "số",
        "startMs": 47620,
        "endMs": 47770,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 48,
    "sceneId": 11,
    "text": "tiền đó để lập",
    "startMs": 47770,
    "endMs": 48570,
    "words": [
      {
        "word": "tiền",
        "startMs": 47770,
        "endMs": 47990,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 47990,
        "endMs": 48140,
        "isKeyword": false
      },
      {
        "word": "để",
        "startMs": 48140,
        "endMs": 48320,
        "isKeyword": false
      },
      {
        "word": "lập",
        "startMs": 48320,
        "endMs": 48570,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 49,
    "sceneId": 11,
    "text": "ra giải thưởng tôn",
    "startMs": 48570,
    "endMs": 49260,
    "words": [
      {
        "word": "ra",
        "startMs": 48570,
        "endMs": 48580,
        "isKeyword": false
      },
      {
        "word": "giải",
        "startMs": 48580,
        "endMs": 48790,
        "isKeyword": true
      },
      {
        "word": "thưởng",
        "startMs": 48790,
        "endMs": 49120,
        "isKeyword": true
      },
      {
        "word": "tôn",
        "startMs": 49120,
        "endMs": 49260,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 50,
    "sceneId": 11,
    "text": "vinh hòa bình thế giới.",
    "startMs": 49260,
    "endMs": 50320,
    "words": [
      {
        "word": "vinh",
        "startMs": 49260,
        "endMs": 49400,
        "isKeyword": true
      },
      {
        "word": "hòa",
        "startMs": 49400,
        "endMs": 49500,
        "isKeyword": true
      },
      {
        "word": "bình",
        "startMs": 49500,
        "endMs": 49680,
        "isKeyword": true
      },
      {
        "word": "thế",
        "startMs": 49680,
        "endMs": 49860,
        "isKeyword": true
      },
      {
        "word": "giới.",
        "startMs": 49860,
        "endMs": 50320,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 51,
    "sceneId": 12,
    "text": "Nói cách khác,",
    "startMs": 50320,
    "endMs": 51020,
    "words": [
      {
        "word": "Nói",
        "startMs": 50320,
        "endMs": 50500,
        "isKeyword": false
      },
      {
        "word": "cách",
        "startMs": 50500,
        "endMs": 50710,
        "isKeyword": false
      },
      {
        "word": "khác,",
        "startMs": 50710,
        "endMs": 51020,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 52,
    "sceneId": 12,
    "text": "giải Nobel Hòa",
    "startMs": 51020,
    "endMs": 51640,
    "words": [
      {
        "word": "giải",
        "startMs": 51020,
        "endMs": 51360,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 51360,
        "endMs": 51510,
        "isKeyword": true
      },
      {
        "word": "Hòa",
        "startMs": 51510,
        "endMs": 51640,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 53,
    "sceneId": 12,
    "text": "Bình được tài",
    "startMs": 51640,
    "endMs": 52390,
    "words": [
      {
        "word": "Bình",
        "startMs": 51640,
        "endMs": 51860,
        "isKeyword": true
      },
      {
        "word": "được",
        "startMs": 51860,
        "endMs": 52220,
        "isKeyword": false
      },
      {
        "word": "tài",
        "startMs": 52220,
        "endMs": 52390,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 54,
    "sceneId": 12,
    "text": "trợ bởi tiền bán thuốc nổ.",
    "startMs": 52390,
    "endMs": 54040,
    "words": [
      {
        "word": "trợ",
        "startMs": 52390,
        "endMs": 52610,
        "isKeyword": true
      },
      {
        "word": "bởi",
        "startMs": 52610,
        "endMs": 52910,
        "isKeyword": false
      },
      {
        "word": "tiền",
        "startMs": 52910,
        "endMs": 53130,
        "isKeyword": false
      },
      {
        "word": "bán",
        "startMs": 53130,
        "endMs": 53260,
        "isKeyword": false
      },
      {
        "word": "thuốc",
        "startMs": 53260,
        "endMs": 53570,
        "isKeyword": true
      },
      {
        "word": "nổ.",
        "startMs": 53570,
        "endMs": 54040,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 55,
    "sceneId": 13,
    "text": "Về đời tư, Nobel",
    "startMs": 54040,
    "endMs": 54850,
    "words": [
      {
        "word": "Về",
        "startMs": 54040,
        "endMs": 54170,
        "isKeyword": false
      },
      {
        "word": "đời",
        "startMs": 54170,
        "endMs": 54420,
        "isKeyword": true
      },
      {
        "word": "tư,",
        "startMs": 54420,
        "endMs": 54840,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 54840,
        "endMs": 54850,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 56,
    "sceneId": 13,
    "text": "sống gần như cô",
    "startMs": 54850,
    "endMs": 55610,
    "words": [
      {
        "word": "sống",
        "startMs": 54850,
        "endMs": 55100,
        "isKeyword": true
      },
      {
        "word": "gần",
        "startMs": 55100,
        "endMs": 55310,
        "isKeyword": false
      },
      {
        "word": "như",
        "startMs": 55310,
        "endMs": 55480,
        "isKeyword": false
      },
      {
        "word": "cô",
        "startMs": 55480,
        "endMs": 55610,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 57,
    "sceneId": 13,
    "text": "độc suốt đời, không",
    "startMs": 55610,
    "endMs": 56870,
    "words": [
      {
        "word": "độc",
        "startMs": 55610,
        "endMs": 55870,
        "isKeyword": true
      },
      {
        "word": "suốt",
        "startMs": 55870,
        "endMs": 56160,
        "isKeyword": false
      },
      {
        "word": "đời,",
        "startMs": 56160,
        "endMs": 56600,
        "isKeyword": true
      },
      {
        "word": "không",
        "startMs": 56600,
        "endMs": 56870,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 58,
    "sceneId": 13,
    "text": "kết hôn, không con cái,",
    "startMs": 56870,
    "endMs": 58200,
    "words": [
      {
        "word": "kết",
        "startMs": 56870,
        "endMs": 57060,
        "isKeyword": true
      },
      {
        "word": "hôn,",
        "startMs": 57060,
        "endMs": 57480,
        "isKeyword": true
      },
      {
        "word": "không",
        "startMs": 57480,
        "endMs": 57740,
        "isKeyword": false
      },
      {
        "word": "con",
        "startMs": 57740,
        "endMs": 57930,
        "isKeyword": true
      },
      {
        "word": "cái,",
        "startMs": 57930,
        "endMs": 58200,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 59,
    "sceneId": 14,
    "text": "và dành phần lớn",
    "startMs": 58200,
    "endMs": 58890,
    "words": [
      {
        "word": "và",
        "startMs": 58200,
        "endMs": 58310,
        "isKeyword": false
      },
      {
        "word": "dành",
        "startMs": 58310,
        "endMs": 58490,
        "isKeyword": false
      },
      {
        "word": "phần",
        "startMs": 58490,
        "endMs": 58710,
        "isKeyword": false
      },
      {
        "word": "lớn",
        "startMs": 58710,
        "endMs": 58890,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 60,
    "sceneId": 14,
    "text": "thời gian trong phòng",
    "startMs": 58890,
    "endMs": 59720,
    "words": [
      {
        "word": "thời",
        "startMs": 58890,
        "endMs": 59140,
        "isKeyword": false
      },
      {
        "word": "gian",
        "startMs": 59140,
        "endMs": 59260,
        "isKeyword": false
      },
      {
        "word": "trong",
        "startMs": 59260,
        "endMs": 59450,
        "isKeyword": false
      },
      {
        "word": "phòng",
        "startMs": 59450,
        "endMs": 59720,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 61,
    "sceneId": 14,
    "text": "thí nghiệm hơn là",
    "startMs": 59720,
    "endMs": 60360,
    "words": [
      {
        "word": "thí",
        "startMs": 59720,
        "endMs": 59810,
        "isKeyword": true
      },
      {
        "word": "nghiệm",
        "startMs": 59810,
        "endMs": 60250,
        "isKeyword": true
      },
      {
        "word": "hơn",
        "startMs": 60250,
        "endMs": 60300,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 60300,
        "endMs": 60360,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 62,
    "sceneId": 14,
    "text": "giao tiếp xã hội.",
    "startMs": 60360,
    "endMs": 61440,
    "words": [
      {
        "word": "giao",
        "startMs": 60360,
        "endMs": 60500,
        "isKeyword": false
      },
      {
        "word": "tiếp",
        "startMs": 60500,
        "endMs": 60740,
        "isKeyword": false
      },
      {
        "word": "xã",
        "startMs": 60740,
        "endMs": 60830,
        "isKeyword": false
      },
      {
        "word": "hội.",
        "startMs": 60830,
        "endMs": 61440,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 63,
    "sceneId": 15,
    "text": "Ông từng viết trong",
    "startMs": 61440,
    "endMs": 62120,
    "words": [
      {
        "word": "Ông",
        "startMs": 61440,
        "endMs": 61480,
        "isKeyword": false
      },
      {
        "word": "từng",
        "startMs": 61480,
        "endMs": 61680,
        "isKeyword": false
      },
      {
        "word": "viết",
        "startMs": 61680,
        "endMs": 62000,
        "isKeyword": false
      },
      {
        "word": "trong",
        "startMs": 62000,
        "endMs": 62120,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 64,
    "sceneId": 15,
    "text": "một bức thư rằng",
    "startMs": 62120,
    "endMs": 62960,
    "words": [
      {
        "word": "một",
        "startMs": 62120,
        "endMs": 62320,
        "isKeyword": false
      },
      {
        "word": "bức",
        "startMs": 62320,
        "endMs": 62520,
        "isKeyword": true
      },
      {
        "word": "thư",
        "startMs": 62520,
        "endMs": 62680,
        "isKeyword": true
      },
      {
        "word": "rằng",
        "startMs": 62680,
        "endMs": 62960,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 65,
    "sceneId": 15,
    "text": "bản thân cảm thấy",
    "startMs": 62960,
    "endMs": 63740,
    "words": [
      {
        "word": "bản",
        "startMs": 62960,
        "endMs": 63140,
        "isKeyword": false
      },
      {
        "word": "thân",
        "startMs": 63140,
        "endMs": 63320,
        "isKeyword": false
      },
      {
        "word": "cảm",
        "startMs": 63320,
        "endMs": 63540,
        "isKeyword": false
      },
      {
        "word": "thấy",
        "startMs": 63540,
        "endMs": 63740,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 66,
    "sceneId": 15,
    "text": "mình là 'người bi",
    "startMs": 63740,
    "endMs": 64450,
    "words": [
      {
        "word": "mình",
        "startMs": 63740,
        "endMs": 63930,
        "isKeyword": true
      },
      {
        "word": "là",
        "startMs": 63930,
        "endMs": 64040,
        "isKeyword": false
      },
      {
        "word": "'người",
        "startMs": 64040,
        "endMs": 64350,
        "isKeyword": true
      },
      {
        "word": "bi",
        "startMs": 64350,
        "endMs": 64450,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 67,
    "sceneId": 15,
    "text": "quan nhất thế giới',",
    "startMs": 64450,
    "endMs": 65380,
    "words": [
      {
        "word": "quan",
        "startMs": 64450,
        "endMs": 64610,
        "isKeyword": true
      },
      {
        "word": "nhất",
        "startMs": 64610,
        "endMs": 64830,
        "isKeyword": true
      },
      {
        "word": "thế",
        "startMs": 64830,
        "endMs": 65020,
        "isKeyword": true
      },
      {
        "word": "giới',",
        "startMs": 65020,
        "endMs": 65380,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 68,
    "sceneId": 16,
    "text": "dù sở hữu",
    "startMs": 65380,
    "endMs": 66090,
    "words": [
      {
        "word": "dù",
        "startMs": 65380,
        "endMs": 65590,
        "isKeyword": false
      },
      {
        "word": "sở",
        "startMs": 65590,
        "endMs": 65830,
        "isKeyword": false
      },
      {
        "word": "hữu",
        "startMs": 65830,
        "endMs": 66090,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 69,
    "sceneId": 16,
    "text": "khối tài sản",
    "startMs": 66090,
    "endMs": 66930,
    "words": [
      {
        "word": "khối",
        "startMs": 66090,
        "endMs": 66390,
        "isKeyword": false
      },
      {
        "word": "tài",
        "startMs": 66390,
        "endMs": 66640,
        "isKeyword": true
      },
      {
        "word": "sản",
        "startMs": 66640,
        "endMs": 66930,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 70,
    "sceneId": 16,
    "text": "khổng lồ. Và",
    "startMs": 66930,
    "endMs": 67630,
    "words": [
      {
        "word": "khổng",
        "startMs": 66930,
        "endMs": 67190,
        "isKeyword": true
      },
      {
        "word": "lồ.",
        "startMs": 67190,
        "endMs": 67620,
        "isKeyword": true
      },
      {
        "word": "Và",
        "startMs": 67620,
        "endMs": 67630,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 71,
    "sceneId": 16,
    "text": "một sự thật thú vị khác:",
    "startMs": 67630,
    "endMs": 68840,
    "words": [
      {
        "word": "một",
        "startMs": 67630,
        "endMs": 67810,
        "isKeyword": false
      },
      {
        "word": "sự",
        "startMs": 67810,
        "endMs": 67960,
        "isKeyword": false
      },
      {
        "word": "thật",
        "startMs": 67960,
        "endMs": 68180,
        "isKeyword": false
      },
      {
        "word": "thú",
        "startMs": 68180,
        "endMs": 68320,
        "isKeyword": false
      },
      {
        "word": "vị",
        "startMs": 68320,
        "endMs": 68480,
        "isKeyword": false
      },
      {
        "word": "khác:",
        "startMs": 68480,
        "endMs": 68840,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 72,
    "sceneId": 17,
    "text": "giải Nobel không",
    "startMs": 68840,
    "endMs": 69550,
    "words": [
      {
        "word": "giải",
        "startMs": 68840,
        "endMs": 69090,
        "isKeyword": true
      },
      {
        "word": "Nobel",
        "startMs": 69090,
        "endMs": 69300,
        "isKeyword": true
      },
      {
        "word": "không",
        "startMs": 69300,
        "endMs": 69550,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 73,
    "sceneId": 17,
    "text": "có hạng mục",
    "startMs": 69550,
    "endMs": 70120,
    "words": [
      {
        "word": "có",
        "startMs": 69550,
        "endMs": 69710,
        "isKeyword": true
      },
      {
        "word": "hạng",
        "startMs": 69710,
        "endMs": 69910,
        "isKeyword": false
      },
      {
        "word": "mục",
        "startMs": 69910,
        "endMs": 70120,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 74,
    "sceneId": 17,
    "text": "Toán học, dù",
    "startMs": 70120,
    "endMs": 70730,
    "words": [
      {
        "word": "Toán",
        "startMs": 70120,
        "endMs": 70320,
        "isKeyword": true
      },
      {
        "word": "học,",
        "startMs": 70320,
        "endMs": 70610,
        "isKeyword": true
      },
      {
        "word": "dù",
        "startMs": 70610,
        "endMs": 70730,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 75,
    "sceneId": 17,
    "text": "có đến 6 lĩnh vực khác.",
    "startMs": 70730,
    "endMs": 72210,
    "words": [
      {
        "word": "có",
        "startMs": 70730,
        "endMs": 70900,
        "isKeyword": true
      },
      {
        "word": "đến",
        "startMs": 70900,
        "endMs": 71130,
        "isKeyword": false
      },
      {
        "word": "6",
        "startMs": 71130,
        "endMs": 71260,
        "isKeyword": true
      },
      {
        "word": "lĩnh",
        "startMs": 71260,
        "endMs": 71460,
        "isKeyword": true
      },
      {
        "word": "vực",
        "startMs": 71460,
        "endMs": 71670,
        "isKeyword": true
      },
      {
        "word": "khác.",
        "startMs": 71670,
        "endMs": 72210,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 76,
    "sceneId": 18,
    "text": "Có nhiều giả thuyết",
    "startMs": 72210,
    "endMs": 73020,
    "words": [
      {
        "word": "Có",
        "startMs": 72210,
        "endMs": 72270,
        "isKeyword": true
      },
      {
        "word": "nhiều",
        "startMs": 72270,
        "endMs": 72520,
        "isKeyword": false
      },
      {
        "word": "giả",
        "startMs": 72520,
        "endMs": 72730,
        "isKeyword": false
      },
      {
        "word": "thuyết",
        "startMs": 72730,
        "endMs": 73020,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 77,
    "sceneId": 18,
    "text": "về lý do, một",
    "startMs": 73020,
    "endMs": 73840,
    "words": [
      {
        "word": "về",
        "startMs": 73020,
        "endMs": 73190,
        "isKeyword": false
      },
      {
        "word": "lý",
        "startMs": 73190,
        "endMs": 73310,
        "isKeyword": false
      },
      {
        "word": "do,",
        "startMs": 73310,
        "endMs": 73630,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 73630,
        "endMs": 73840,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 78,
    "sceneId": 18,
    "text": "trong số đó —",
    "startMs": 73840,
    "endMs": 74750,
    "words": [
      {
        "word": "trong",
        "startMs": 73840,
        "endMs": 74120,
        "isKeyword": false
      },
      {
        "word": "số",
        "startMs": 74120,
        "endMs": 74340,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 74340,
        "endMs": 74600,
        "isKeyword": false
      },
      {
        "word": "—",
        "startMs": 74600,
        "endMs": 74750,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 79,
    "sceneId": 18,
    "text": "dù chưa được xác",
    "startMs": 74600,
    "endMs": 75460,
    "words": [
      {
        "word": "dù",
        "startMs": 74600,
        "endMs": 74850,
        "isKeyword": false
      },
      {
        "word": "chưa",
        "startMs": 74850,
        "endMs": 74930,
        "isKeyword": false
      },
      {
        "word": "được",
        "startMs": 74930,
        "endMs": 75260,
        "isKeyword": false
      },
      {
        "word": "xác",
        "startMs": 75260,
        "endMs": 75460,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 80,
    "sceneId": 18,
    "text": "nhận chắc chắn —",
    "startMs": 75460,
    "endMs": 76410,
    "words": [
      {
        "word": "nhận",
        "startMs": 75460,
        "endMs": 75700,
        "isKeyword": false
      },
      {
        "word": "chắc",
        "startMs": 75700,
        "endMs": 75940,
        "isKeyword": false
      },
      {
        "word": "chắn",
        "startMs": 75940,
        "endMs": 76260,
        "isKeyword": false
      },
      {
        "word": "—",
        "startMs": 76260,
        "endMs": 76410,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 81,
    "sceneId": 18,
    "text": "cho rằng Nobel từng",
    "startMs": 76260,
    "endMs": 77080,
    "words": [
      {
        "word": "cho",
        "startMs": 76260,
        "endMs": 76490,
        "isKeyword": false
      },
      {
        "word": "rằng",
        "startMs": 76490,
        "endMs": 76630,
        "isKeyword": false
      },
      {
        "word": "Nobel",
        "startMs": 76630,
        "endMs": 76840,
        "isKeyword": true
      },
      {
        "word": "từng",
        "startMs": 76840,
        "endMs": 77080,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 82,
    "sceneId": 18,
    "text": "có mâu thuẫn cá",
    "startMs": 77080,
    "endMs": 77760,
    "words": [
      {
        "word": "có",
        "startMs": 77080,
        "endMs": 77200,
        "isKeyword": true
      },
      {
        "word": "mâu",
        "startMs": 77200,
        "endMs": 77360,
        "isKeyword": true
      },
      {
        "word": "thuẫn",
        "startMs": 77360,
        "endMs": 77640,
        "isKeyword": true
      },
      {
        "word": "cá",
        "startMs": 77640,
        "endMs": 77760,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 83,
    "sceneId": 18,
    "text": "nhân với một nhà toán học nổi tiếng thời đó.",
    "startMs": 77760,
    "endMs": 80310,
    "words": [
      {
        "word": "nhân",
        "startMs": 77760,
        "endMs": 77970,
        "isKeyword": false
      },
      {
        "word": "với",
        "startMs": 77970,
        "endMs": 78180,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 78180,
        "endMs": 78430,
        "isKeyword": false
      },
      {
        "word": "nhà",
        "startMs": 78430,
        "endMs": 78550,
        "isKeyword": false
      },
      {
        "word": "toán",
        "startMs": 78550,
        "endMs": 78750,
        "isKeyword": true
      },
      {
        "word": "học",
        "startMs": 78750,
        "endMs": 78960,
        "isKeyword": true
      },
      {
        "word": "nổi",
        "startMs": 78960,
        "endMs": 79220,
        "isKeyword": false
      },
      {
        "word": "tiếng",
        "startMs": 79220,
        "endMs": 79450,
        "isKeyword": false
      },
      {
        "word": "thời",
        "startMs": 79450,
        "endMs": 79700,
        "isKeyword": false
      },
      {
        "word": "đó.",
        "startMs": 79700,
        "endMs": 80310,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 84,
    "sceneId": 19,
    "text": "Người đàn ông phát minh",
    "startMs": 80310,
    "endMs": 81160,
    "words": [
      {
        "word": "Người",
        "startMs": 80310,
        "endMs": 80440,
        "isKeyword": true
      },
      {
        "word": "đàn",
        "startMs": 80440,
        "endMs": 80640,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 80640,
        "endMs": 80820,
        "isKeyword": false
      },
      {
        "word": "phát",
        "startMs": 80820,
        "endMs": 81000,
        "isKeyword": true
      },
      {
        "word": "minh",
        "startMs": 81000,
        "endMs": 81160,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 85,
    "sceneId": 19,
    "text": "ra thuốc nổ, đọc cáo",
    "startMs": 81160,
    "endMs": 82330,
    "words": [
      {
        "word": "ra",
        "startMs": 81160,
        "endMs": 81240,
        "isKeyword": false
      },
      {
        "word": "thuốc",
        "startMs": 81240,
        "endMs": 81440,
        "isKeyword": true
      },
      {
        "word": "nổ,",
        "startMs": 81440,
        "endMs": 81880,
        "isKeyword": true
      },
      {
        "word": "đọc",
        "startMs": 81880,
        "endMs": 82140,
        "isKeyword": false
      },
      {
        "word": "cáo",
        "startMs": 82140,
        "endMs": 82330,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 86,
    "sceneId": 19,
    "text": "phó của chính mình, rồi",
    "startMs": 82330,
    "endMs": 83480,
    "words": [
      {
        "word": "phó",
        "startMs": 82330,
        "endMs": 82450,
        "isKeyword": true
      },
      {
        "word": "của",
        "startMs": 82450,
        "endMs": 82690,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 82690,
        "endMs": 82950,
        "isKeyword": true
      },
      {
        "word": "mình,",
        "startMs": 82950,
        "endMs": 83270,
        "isKeyword": true
      },
      {
        "word": "rồi",
        "startMs": 83270,
        "endMs": 83480,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 87,
    "sceneId": 19,
    "text": "dùng cả gia tài để",
    "startMs": 83480,
    "endMs": 84420,
    "words": [
      {
        "word": "dùng",
        "startMs": 83480,
        "endMs": 83660,
        "isKeyword": false
      },
      {
        "word": "cả",
        "startMs": 83660,
        "endMs": 83840,
        "isKeyword": false
      },
      {
        "word": "gia",
        "startMs": 83840,
        "endMs": 84010,
        "isKeyword": false
      },
      {
        "word": "tài",
        "startMs": 84010,
        "endMs": 84190,
        "isKeyword": true
      },
      {
        "word": "để",
        "startMs": 84190,
        "endMs": 84420,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 88,
    "sceneId": 19,
    "text": "chuộc lại tên tuổi —",
    "startMs": 84420,
    "endMs": 85810,
    "words": [
      {
        "word": "chuộc",
        "startMs": 84420,
        "endMs": 84710,
        "isKeyword": true
      },
      {
        "word": "lại",
        "startMs": 84710,
        "endMs": 84920,
        "isKeyword": true
      },
      {
        "word": "tên",
        "startMs": 84920,
        "endMs": 85090,
        "isKeyword": true
      },
      {
        "word": "tuổi",
        "startMs": 85090,
        "endMs": 85660,
        "isKeyword": true
      },
      {
        "word": "—",
        "startMs": 85660,
        "endMs": 85810,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 89,
    "sceneId": 20,
    "text": "đó chính là Alfred Nobel.",
    "startMs": 85660,
    "endMs": 87320,
    "words": [
      {
        "word": "đó",
        "startMs": 85660,
        "endMs": 85830,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 85830,
        "endMs": 86270,
        "isKeyword": true
      },
      {
        "word": "là",
        "startMs": 86270,
        "endMs": 86470,
        "isKeyword": false
      },
      {
        "word": "Alfred",
        "startMs": 86470,
        "endMs": 86790,
        "isKeyword": true
      },
      {
        "word": "Nobel.",
        "startMs": 86790,
        "endMs": 87320,
        "isKeyword": true
      }
    ]
  }
];
