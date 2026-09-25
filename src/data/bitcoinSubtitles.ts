// Auto-generated Subtitles and Scene Configuration for Bitcoin Short
// 22 Scenes matching 22 images and narration beats (Scene 21 & 22 paired from sentence 21)

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

export const BITCOIN_TOTAL_FRAMES = 4140;
export const BITCOIN_FPS = 30;
export const BITCOIN_AUDIO_PATH = "audio/bitcoin.wav";

export const BITCOIN_SCENES: SceneMeta[] = [
  {
    "id": 1,
    "image": "01-bitcoin-scene.png",
    "badge": "🪙 TIỀN SỐ ĐẦU TIÊN THẾ GIỚI",
    "hud": "BITCOIN & ĐỊNH GIÁ NGHÌN TỶ",
    "startFrame": 0,
    "endFrame": 230,
    "durationInFrames": 230
  },
  {
    "id": 2,
    "image": "02-bitcoin-scene.png",
    "badge": "👤 BÍ ẨN SATOSHI NAKAMOTO",
    "hud": "DANH TÍNH CHƯA TỪNG LỘ DIỆN",
    "startFrame": 230,
    "endFrame": 350,
    "durationInFrames": 120
  },
  {
    "id": 3,
    "image": "03-bitcoin-scene.png",
    "badge": "💥 KHỦNG HOẢNG TÀI CHÍNH 2008",
    "hud": "NGÂN HÀNG SỤP ĐỔ HÀNG LOẠT",
    "startFrame": 350,
    "endFrame": 582,
    "durationInFrames": 232
  },
  {
    "id": 4,
    "image": "04-bitcoin-scene.png",
    "badge": "📄 BẢN MÔ TẢ 9 TRANG LỊCH SỬ",
    "hud": "31/10/2008: WHITEPAPER",
    "startFrame": 582,
    "endFrame": 877,
    "durationInFrames": 295
  },
  {
    "id": 5,
    "image": "05-bitcoin-scene.png",
    "badge": "🔗 CÔNG NGHỆ BLOCKCHAIN",
    "hud": "SỔ CÁI PHI TẬP TRUNG",
    "startFrame": 877,
    "endFrame": 1112,
    "durationInFrames": 235
  },
  {
    "id": 6,
    "image": "06-bitcoin-scene.png",
    "badge": "⛏️ KHỐI KHỞI NGUYÊN (GENESIS BLOCK)",
    "hud": "03/01/2009: KHỞI NGUYÊN RA ĐỜI",
    "startFrame": 1112,
    "endFrame": 1272,
    "durationInFrames": 160
  },
  {
    "id": 7,
    "image": "07-bitcoin-scene.png",
    "badge": "📰 DÒNG TÍT BÁO THE TIMES",
    "hud": "LỜI NHẮN GỬI CỦA SATOSHI",
    "startFrame": 1272,
    "endFrame": 1531,
    "durationInFrames": 259
  },
  {
    "id": 8,
    "image": "08-bitcoin-scene.png",
    "badge": "⚡ GIAO DỊCH ĐẦU TIÊN CỦA BITCOIN",
    "hud": "GỬI TẶNG HAL FINNEY",
    "startFrame": 1531,
    "endFrame": 1678,
    "durationInFrames": 147
  },
  {
    "id": 9,
    "image": "09-bitcoin-scene.png",
    "badge": "🍕 10.000 BITCOIN MUA 2 PIZZA",
    "hud": "22/05/2010: GIAO DỊCH ĐẦU TIÊN",
    "startFrame": 1678,
    "endFrame": 1957,
    "durationInFrames": 279
  },
  {
    "id": 10,
    "image": "10-bitcoin-scene.png",
    "badge": "💸 BỮA ĂN ĐẮT NHẤT LỊCH SỬ",
    "hud": "TRỊ GIÁ HÀNG NGHÌN TỶ ĐỒNG",
    "startFrame": 1957,
    "endFrame": 2128,
    "durationInFrames": 171
  },
  {
    "id": 11,
    "image": "11-bitcoin-scene.png",
    "badge": "🎉 NGÀY PIZZA BITCOIN",
    "hud": "BITCOIN PIZZA DAY",
    "startFrame": 2128,
    "endFrame": 2215,
    "durationInFrames": 87
  },
  {
    "id": 12,
    "image": "12-bitcoin-scene.png",
    "badge": "🚪 SATOSHI BIẾN MẤT NĂM 2011",
    "hud": "TIN NHẮN CUỐI CÙNG",
    "startFrame": 2215,
    "endFrame": 2402,
    "durationInFrames": 187
  },
  {
    "id": 13,
    "image": "13-bitcoin-scene.png",
    "badge": "🔒 1 TRIỆU BITCOIN BẤT ĐỘNG",
    "hud": "KHO BÁU CHƯA TỪNG DI CHUYỂN",
    "startFrame": 2402,
    "endFrame": 2521,
    "durationInFrames": 119
  },
  {
    "id": 14,
    "image": "14-bitcoin-scene.png",
    "badge": "🕵️ MANH MỐI BÍ ẨN VỀ SATOSHI",
    "hud": "CHƯA TỪNG ĐƯỢC GIẢI MÃ",
    "startFrame": 2521,
    "endFrame": 2654,
    "durationInFrames": 133
  },
  {
    "id": 15,
    "image": "15-bitcoin-scene.png",
    "badge": "🔢 GIỚI HẠN 21 TRIỆU & HALVING",
    "hud": "GIẢM NỬA MỖI 4 NĂM",
    "startFrame": 2654,
    "endFrame": 2833,
    "durationInFrames": 179
  },
  {
    "id": 16,
    "image": "16-bitcoin-scene.png",
    "badge": "📈 CƠN SỐT VƯỢT $20.000",
    "hud": "TĂNG TRƯỞNG KỶ LỤC",
    "startFrame": 2833,
    "endFrame": 3062,
    "durationInFrames": 229
  },
  {
    "id": 17,
    "image": "17-bitcoin-scene.png",
    "badge": "📉 THẢM HỌA SÀN MT. GOX 2014",
    "hud": "HÀNG TRĂM NGHÌN COIN BIẾN MẤT",
    "startFrame": 3062,
    "endFrame": 3325,
    "durationInFrames": 263
  },
  {
    "id": 18,
    "image": "18-bitcoin-scene.png",
    "badge": "🔥 HỒI SINH TỪ TRO TÀN",
    "hud": "HÀNG TRĂM LẦN BỊ TUYÊN BỐ 'CHẾT'",
    "startFrame": 3325,
    "endFrame": 3474,
    "durationInFrames": 149
  },
  {
    "id": 19,
    "image": "19-bitcoin-scene.png",
    "badge": "🇸🇻 EL SALVADOR CÔNG NHẬN HỢP PHÁP",
    "hud": "ĐẠT MỐC $69.000 NĂM 2021",
    "startFrame": 3474,
    "endFrame": 3703,
    "durationInFrames": 229
  },
  {
    "id": 20,
    "image": "20-bitcoin-scene.png",
    "badge": "🏛️ ETF BITCOIN CHÍNH THỨC ĐƯỢC DUYỆT",
    "hud": "THÁNG 01/2024: VÀO PHỐ WALL",
    "startFrame": 3703,
    "endFrame": 3895,
    "durationInFrames": 192
  },
  {
    "id": 21,
    "image": "21-bitcoin-scene.png",
    "badge": "⚖️ VÀNG KỸ THUẬT SỐ HAY BONG BÓNG?",
    "hud": "TRANH CÃI KHÔNG HỒI KẾT",
    "startFrame": 3895,
    "endFrame": 4046,
    "durationInFrames": 151
  },
  {
    "id": 22,
    "image": "22-bitcoin-scene.png",
    "badge": "⚡ TIÊU THỤ ĐIỆN & TƯƠNG LAI",
    "hud": "KỶ NGUYÊN MỚI CỦA TIỀN TỆ",
    "startFrame": 4046,
    "endFrame": 4140,
    "durationInFrames": 94
  }
];

export const BITCOIN_PHRASES: PhraseCaption[] = [
  {
    "id": 1,
    "sceneId": 1,
    "text": "Bitcoin là loại tiền số",
    "startMs": 30,
    "endMs": 960,
    "words": [
      {
        "word": "Bitcoin",
        "startMs": 30,
        "endMs": 130,
        "isKeyword": true
      },
      {
        "word": "là",
        "startMs": 300,
        "endMs": 400,
        "isKeyword": false
      },
      {
        "word": "loại",
        "startMs": 400,
        "endMs": 610,
        "isKeyword": false
      },
      {
        "word": "tiền",
        "startMs": 610,
        "endMs": 820,
        "isKeyword": true
      },
      {
        "word": "số",
        "startMs": 820,
        "endMs": 960,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 2,
    "sceneId": 1,
    "text": "đầu tiên trên thế giới,",
    "startMs": 960,
    "endMs": 2320,
    "words": [
      {
        "word": "đầu",
        "startMs": 960,
        "endMs": 1170,
        "isKeyword": true
      },
      {
        "word": "tiên",
        "startMs": 1170,
        "endMs": 1340,
        "isKeyword": true
      },
      {
        "word": "trên",
        "startMs": 1340,
        "endMs": 1520,
        "isKeyword": false
      },
      {
        "word": "thế",
        "startMs": 1520,
        "endMs": 1700,
        "isKeyword": false
      },
      {
        "word": "giới,",
        "startMs": 1700,
        "endMs": 2320,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 3,
    "sceneId": 1,
    "text": "không do ngân hàng nào",
    "startMs": 2320,
    "endMs": 3210,
    "words": [
      {
        "word": "không",
        "startMs": 2320,
        "endMs": 2420,
        "isKeyword": false
      },
      {
        "word": "do",
        "startMs": 2420,
        "endMs": 2520,
        "isKeyword": false
      },
      {
        "word": "ngân",
        "startMs": 2520,
        "endMs": 2740,
        "isKeyword": true
      },
      {
        "word": "hàng",
        "startMs": 2740,
        "endMs": 2970,
        "isKeyword": true
      },
      {
        "word": "nào",
        "startMs": 2970,
        "endMs": 3210,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 4,
    "sceneId": 1,
    "text": "phát hành, không chính phủ",
    "startMs": 3210,
    "endMs": 4430,
    "words": [
      {
        "word": "phát",
        "startMs": 3210,
        "endMs": 3380,
        "isKeyword": false
      },
      {
        "word": "hành,",
        "startMs": 3380,
        "endMs": 3850,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 3850,
        "endMs": 3950,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 3950,
        "endMs": 4220,
        "isKeyword": true
      },
      {
        "word": "phủ",
        "startMs": 4220,
        "endMs": 4430,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 5,
    "sceneId": 1,
    "text": "nào kiểm soát, nhưng đã",
    "startMs": 4430,
    "endMs": 5580,
    "words": [
      {
        "word": "nào",
        "startMs": 4430,
        "endMs": 4620,
        "isKeyword": false
      },
      {
        "word": "kiểm",
        "startMs": 4620,
        "endMs": 4980,
        "isKeyword": false
      },
      {
        "word": "soát,",
        "startMs": 4980,
        "endMs": 5160,
        "isKeyword": false
      },
      {
        "word": "nhưng",
        "startMs": 5160,
        "endMs": 5410,
        "isKeyword": false
      },
      {
        "word": "đã",
        "startMs": 5410,
        "endMs": 5580,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 6,
    "sceneId": 1,
    "text": "có lúc được định giá",
    "startMs": 5580,
    "endMs": 6650,
    "words": [
      {
        "word": "có",
        "startMs": 5580,
        "endMs": 5700,
        "isKeyword": false
      },
      {
        "word": "lúc",
        "startMs": 5700,
        "endMs": 5860,
        "isKeyword": false
      },
      {
        "word": "được",
        "startMs": 5860,
        "endMs": 6240,
        "isKeyword": false
      },
      {
        "word": "định",
        "startMs": 6240,
        "endMs": 6490,
        "isKeyword": true
      },
      {
        "word": "giá",
        "startMs": 6490,
        "endMs": 6650,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 7,
    "sceneId": 1,
    "text": "hàng nghìn tỷ đô la.",
    "startMs": 6650,
    "endMs": 7670,
    "words": [
      {
        "word": "hàng",
        "startMs": 6650,
        "endMs": 6870,
        "isKeyword": true
      },
      {
        "word": "nghìn",
        "startMs": 6870,
        "endMs": 7100,
        "isKeyword": true
      },
      {
        "word": "tỷ",
        "startMs": 7100,
        "endMs": 7260,
        "isKeyword": true
      },
      {
        "word": "đô",
        "startMs": 7260,
        "endMs": 7540,
        "isKeyword": true
      },
      {
        "word": "la.",
        "startMs": 7540,
        "endMs": 7670,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 8,
    "sceneId": 2,
    "text": "Nhưng ít ai biết rằng",
    "startMs": 7670,
    "endMs": 8850,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 7670,
        "endMs": 7920,
        "isKeyword": false
      },
      {
        "word": "ít",
        "startMs": 7920,
        "endMs": 8070,
        "isKeyword": false
      },
      {
        "word": "ai",
        "startMs": 8070,
        "endMs": 8130,
        "isKeyword": false
      },
      {
        "word": "biết",
        "startMs": 8130,
        "endMs": 8410,
        "isKeyword": false
      },
      {
        "word": "rằng",
        "startMs": 8410,
        "endMs": 8850,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 9,
    "sceneId": 2,
    "text": "người tạo ra nó đến",
    "startMs": 8850,
    "endMs": 9940,
    "words": [
      {
        "word": "người",
        "startMs": 8850,
        "endMs": 9130,
        "isKeyword": false
      },
      {
        "word": "tạo",
        "startMs": 9130,
        "endMs": 9380,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 9380,
        "endMs": 9480,
        "isKeyword": false
      },
      {
        "word": "nó",
        "startMs": 9480,
        "endMs": 9630,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 9630,
        "endMs": 9940,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 10,
    "sceneId": 2,
    "text": "nay vẫn chưa ai biết là ai.",
    "startMs": 9940,
    "endMs": 11680,
    "words": [
      {
        "word": "nay",
        "startMs": 9940,
        "endMs": 10260,
        "isKeyword": false
      },
      {
        "word": "vẫn",
        "startMs": 10260,
        "endMs": 10480,
        "isKeyword": false
      },
      {
        "word": "chưa",
        "startMs": 10480,
        "endMs": 10780,
        "isKeyword": false
      },
      {
        "word": "ai",
        "startMs": 10780,
        "endMs": 10910,
        "isKeyword": false
      },
      {
        "word": "biết",
        "startMs": 10910,
        "endMs": 11510,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 11510,
        "endMs": 11510,
        "isKeyword": false
      },
      {
        "word": "ai.",
        "startMs": 11510,
        "endMs": 11680,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 11,
    "sceneId": 3,
    "text": "Năm 2008, cả thế giới",
    "startMs": 11680,
    "endMs": 14140,
    "words": [
      {
        "word": "Năm",
        "startMs": 11680,
        "endMs": 12060,
        "isKeyword": true
      },
      {
        "word": "2008,",
        "startMs": 12060,
        "endMs": 13520,
        "isKeyword": true
      },
      {
        "word": "cả",
        "startMs": 13520,
        "endMs": 13810,
        "isKeyword": false
      },
      {
        "word": "thế",
        "startMs": 13810,
        "endMs": 13890,
        "isKeyword": false
      },
      {
        "word": "giới",
        "startMs": 13890,
        "endMs": 14140,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 12,
    "sceneId": 3,
    "text": "rơi vào khủng hoảng tài",
    "startMs": 14140,
    "endMs": 15260,
    "words": [
      {
        "word": "rơi",
        "startMs": 14140,
        "endMs": 14430,
        "isKeyword": false
      },
      {
        "word": "vào",
        "startMs": 14430,
        "endMs": 14600,
        "isKeyword": false
      },
      {
        "word": "khủng",
        "startMs": 14600,
        "endMs": 14850,
        "isKeyword": true
      },
      {
        "word": "hoảng",
        "startMs": 14850,
        "endMs": 15100,
        "isKeyword": true
      },
      {
        "word": "tài",
        "startMs": 15100,
        "endMs": 15260,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 13,
    "sceneId": 3,
    "text": "chính, ngân hàng sụp đổ",
    "startMs": 15260,
    "endMs": 16930,
    "words": [
      {
        "word": "chính,",
        "startMs": 15260,
        "endMs": 15820,
        "isKeyword": true
      },
      {
        "word": "ngân",
        "startMs": 15820,
        "endMs": 15980,
        "isKeyword": true
      },
      {
        "word": "hàng",
        "startMs": 15980,
        "endMs": 16250,
        "isKeyword": true
      },
      {
        "word": "sụp",
        "startMs": 16250,
        "endMs": 16460,
        "isKeyword": true
      },
      {
        "word": "đổ",
        "startMs": 16460,
        "endMs": 16930,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 14,
    "sceneId": 3,
    "text": "và chính phủ phải đem",
    "startMs": 16930,
    "endMs": 18160,
    "words": [
      {
        "word": "và",
        "startMs": 16930,
        "endMs": 16970,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 16970,
        "endMs": 17390,
        "isKeyword": true
      },
      {
        "word": "phủ",
        "startMs": 17390,
        "endMs": 17950,
        "isKeyword": true
      },
      {
        "word": "phải",
        "startMs": 17950,
        "endMs": 18000,
        "isKeyword": false
      },
      {
        "word": "đem",
        "startMs": 18000,
        "endMs": 18160,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 15,
    "sceneId": 3,
    "text": "tiền thuế đi cứu họ.",
    "startMs": 18160,
    "endMs": 19400,
    "words": [
      {
        "word": "tiền",
        "startMs": 18160,
        "endMs": 18440,
        "isKeyword": true
      },
      {
        "word": "thuế",
        "startMs": 18440,
        "endMs": 18640,
        "isKeyword": false
      },
      {
        "word": "đi",
        "startMs": 18640,
        "endMs": 18820,
        "isKeyword": false
      },
      {
        "word": "cứu",
        "startMs": 18820,
        "endMs": 19000,
        "isKeyword": true
      },
      {
        "word": "họ.",
        "startMs": 19000,
        "endMs": 19400,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 16,
    "sceneId": 4,
    "text": "Ngày 31 tháng 10 năm",
    "startMs": 19400,
    "endMs": 20210,
    "words": [
      {
        "word": "Ngày",
        "startMs": 19400,
        "endMs": 19610,
        "isKeyword": false
      },
      {
        "word": "31",
        "startMs": 19610,
        "endMs": 19760,
        "isKeyword": true
      },
      {
        "word": "tháng",
        "startMs": 19760,
        "endMs": 19910,
        "isKeyword": false
      },
      {
        "word": "10",
        "startMs": 19910,
        "endMs": 20060,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 20060,
        "endMs": 20210,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 17,
    "sceneId": 4,
    "text": "2008, một người dùng bút",
    "startMs": 19610,
    "endMs": 22770,
    "words": [
      {
        "word": "2008,",
        "startMs": 19610,
        "endMs": 21840,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 21840,
        "endMs": 22050,
        "isKeyword": true
      },
      {
        "word": "người",
        "startMs": 22050,
        "endMs": 22390,
        "isKeyword": false
      },
      {
        "word": "dùng",
        "startMs": 22390,
        "endMs": 22600,
        "isKeyword": false
      },
      {
        "word": "bút",
        "startMs": 22600,
        "endMs": 22770,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 18,
    "sceneId": 4,
    "text": "danh Satoshi Nakamoto gửi lên",
    "startMs": 22770,
    "endMs": 24340,
    "words": [
      {
        "word": "danh",
        "startMs": 22770,
        "endMs": 23000,
        "isKeyword": false
      },
      {
        "word": "Satoshi",
        "startMs": 23000,
        "endMs": 23280,
        "isKeyword": true
      },
      {
        "word": "Nakamoto",
        "startMs": 23280,
        "endMs": 23620,
        "isKeyword": true
      },
      {
        "word": "gửi",
        "startMs": 23620,
        "endMs": 23960,
        "isKeyword": false
      },
      {
        "word": "lên",
        "startMs": 23960,
        "endMs": 24340,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 19,
    "sceneId": 4,
    "text": "một danh sách thư mật",
    "startMs": 24340,
    "endMs": 25130,
    "words": [
      {
        "word": "một",
        "startMs": 24340,
        "endMs": 24340,
        "isKeyword": true
      },
      {
        "word": "danh",
        "startMs": 24340,
        "endMs": 24550,
        "isKeyword": false
      },
      {
        "word": "sách",
        "startMs": 24550,
        "endMs": 24780,
        "isKeyword": false
      },
      {
        "word": "thư",
        "startMs": 24780,
        "endMs": 24920,
        "isKeyword": false
      },
      {
        "word": "mật",
        "startMs": 24920,
        "endMs": 25130,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 20,
    "sceneId": 4,
    "text": "mã học bản mô tả",
    "startMs": 25130,
    "endMs": 26090,
    "words": [
      {
        "word": "mã",
        "startMs": 25130,
        "endMs": 25400,
        "isKeyword": true
      },
      {
        "word": "học",
        "startMs": 25400,
        "endMs": 25590,
        "isKeyword": false
      },
      {
        "word": "bản",
        "startMs": 25590,
        "endMs": 25800,
        "isKeyword": false
      },
      {
        "word": "mô",
        "startMs": 25800,
        "endMs": 25960,
        "isKeyword": false
      },
      {
        "word": "tả",
        "startMs": 25960,
        "endMs": 26090,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 21,
    "sceneId": 4,
    "text": "dài chín trang về một",
    "startMs": 26090,
    "endMs": 27350,
    "words": [
      {
        "word": "dài",
        "startMs": 26090,
        "endMs": 26350,
        "isKeyword": false
      },
      {
        "word": "chín",
        "startMs": 26350,
        "endMs": 26640,
        "isKeyword": true
      },
      {
        "word": "trang",
        "startMs": 26640,
        "endMs": 26930,
        "isKeyword": true
      },
      {
        "word": "về",
        "startMs": 26930,
        "endMs": 27090,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 27090,
        "endMs": 27350,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 22,
    "sceneId": 4,
    "text": "hệ thống tiền điện tử ngang hàng.",
    "startMs": 27350,
    "endMs": 29240,
    "words": [
      {
        "word": "hệ",
        "startMs": 27350,
        "endMs": 27480,
        "isKeyword": false
      },
      {
        "word": "thống",
        "startMs": 27480,
        "endMs": 27850,
        "isKeyword": false
      },
      {
        "word": "tiền",
        "startMs": 27850,
        "endMs": 28060,
        "isKeyword": true
      },
      {
        "word": "điện",
        "startMs": 28060,
        "endMs": 28310,
        "isKeyword": true
      },
      {
        "word": "tử",
        "startMs": 28310,
        "endMs": 28480,
        "isKeyword": false
      },
      {
        "word": "ngang",
        "startMs": 28480,
        "endMs": 28690,
        "isKeyword": false
      },
      {
        "word": "hàng.",
        "startMs": 28690,
        "endMs": 29240,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 23,
    "sceneId": 5,
    "text": "Ý tưởng cốt lõi là",
    "startMs": 29240,
    "endMs": 30140,
    "words": [
      {
        "word": "Ý",
        "startMs": 29240,
        "endMs": 29300,
        "isKeyword": false
      },
      {
        "word": "tưởng",
        "startMs": 29300,
        "endMs": 29620,
        "isKeyword": false
      },
      {
        "word": "cốt",
        "startMs": 29620,
        "endMs": 29820,
        "isKeyword": false
      },
      {
        "word": "lõi",
        "startMs": 29820,
        "endMs": 30110,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 30110,
        "endMs": 30140,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 24,
    "sceneId": 5,
    "text": "mọi giao dịch được ghi",
    "startMs": 30140,
    "endMs": 31140,
    "words": [
      {
        "word": "mọi",
        "startMs": 30140,
        "endMs": 30340,
        "isKeyword": false
      },
      {
        "word": "giao",
        "startMs": 30340,
        "endMs": 30460,
        "isKeyword": false
      },
      {
        "word": "dịch",
        "startMs": 30460,
        "endMs": 30800,
        "isKeyword": false
      },
      {
        "word": "được",
        "startMs": 30800,
        "endMs": 31020,
        "isKeyword": false
      },
      {
        "word": "ghi",
        "startMs": 31020,
        "endMs": 31140,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 25,
    "sceneId": 5,
    "text": "vào một sổ cái công",
    "startMs": 31140,
    "endMs": 32050,
    "words": [
      {
        "word": "vào",
        "startMs": 31140,
        "endMs": 31300,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 31300,
        "endMs": 31500,
        "isKeyword": true
      },
      {
        "word": "sổ",
        "startMs": 31500,
        "endMs": 31660,
        "isKeyword": false
      },
      {
        "word": "cái",
        "startMs": 31660,
        "endMs": 31820,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 31820,
        "endMs": 32050,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 26,
    "sceneId": 5,
    "text": "khai chung, gọi là blockchain,",
    "startMs": 32050,
    "endMs": 33460,
    "words": [
      {
        "word": "khai",
        "startMs": 32050,
        "endMs": 32180,
        "isKeyword": true
      },
      {
        "word": "chung,",
        "startMs": 32180,
        "endMs": 32480,
        "isKeyword": false
      },
      {
        "word": "gọi",
        "startMs": 32480,
        "endMs": 32690,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 32690,
        "endMs": 32810,
        "isKeyword": false
      },
      {
        "word": "blockchain,",
        "startMs": 32810,
        "endMs": 33460,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 27,
    "sceneId": 5,
    "text": "do hàng nghìn máy tính",
    "startMs": 33460,
    "endMs": 34320,
    "words": [
      {
        "word": "do",
        "startMs": 33460,
        "endMs": 33570,
        "isKeyword": false
      },
      {
        "word": "hàng",
        "startMs": 33570,
        "endMs": 33710,
        "isKeyword": true
      },
      {
        "word": "nghìn",
        "startMs": 33710,
        "endMs": 33950,
        "isKeyword": true
      },
      {
        "word": "máy",
        "startMs": 33950,
        "endMs": 34110,
        "isKeyword": true
      },
      {
        "word": "tính",
        "startMs": 34110,
        "endMs": 34320,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 28,
    "sceneId": 5,
    "text": "cùng giữ, nên không cần",
    "startMs": 34320,
    "endMs": 35640,
    "words": [
      {
        "word": "cùng",
        "startMs": 34320,
        "endMs": 34530,
        "isKeyword": false
      },
      {
        "word": "giữ,",
        "startMs": 34530,
        "endMs": 35050,
        "isKeyword": false
      },
      {
        "word": "nên",
        "startMs": 35050,
        "endMs": 35110,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 35110,
        "endMs": 35370,
        "isKeyword": false
      },
      {
        "word": "cần",
        "startMs": 35370,
        "endMs": 35640,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 29,
    "sceneId": 5,
    "text": "ngân hàng làm trung gian.",
    "startMs": 35640,
    "endMs": 37080,
    "words": [
      {
        "word": "ngân",
        "startMs": 35640,
        "endMs": 35900,
        "isKeyword": true
      },
      {
        "word": "hàng",
        "startMs": 35900,
        "endMs": 36170,
        "isKeyword": true
      },
      {
        "word": "làm",
        "startMs": 36170,
        "endMs": 36380,
        "isKeyword": false
      },
      {
        "word": "trung",
        "startMs": 36380,
        "endMs": 36560,
        "isKeyword": true
      },
      {
        "word": "gian.",
        "startMs": 36560,
        "endMs": 37080,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 30,
    "sceneId": 6,
    "text": "Ngày 3 tháng 1 năm",
    "startMs": 37080,
    "endMs": 37950,
    "words": [
      {
        "word": "Ngày",
        "startMs": 37080,
        "endMs": 37350,
        "isKeyword": false
      },
      {
        "word": "3",
        "startMs": 37350,
        "endMs": 37500,
        "isKeyword": true
      },
      {
        "word": "tháng",
        "startMs": 37500,
        "endMs": 37650,
        "isKeyword": false
      },
      {
        "word": "1",
        "startMs": 37650,
        "endMs": 37800,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 37800,
        "endMs": 37950,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 31,
    "sceneId": 6,
    "text": "2009, Satoshi khai thác khối",
    "startMs": 37350,
    "endMs": 39970,
    "words": [
      {
        "word": "2009,",
        "startMs": 37350,
        "endMs": 38650,
        "isKeyword": true
      },
      {
        "word": "Satoshi",
        "startMs": 38650,
        "endMs": 39020,
        "isKeyword": true
      },
      {
        "word": "khai",
        "startMs": 39020,
        "endMs": 39350,
        "isKeyword": true
      },
      {
        "word": "thác",
        "startMs": 39350,
        "endMs": 39570,
        "isKeyword": true
      },
      {
        "word": "khối",
        "startMs": 39570,
        "endMs": 39970,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 32,
    "sceneId": 6,
    "text": "đầu tiên, gọi là khối khởi nguyên.",
    "startMs": 39970,
    "endMs": 42320,
    "words": [
      {
        "word": "đầu",
        "startMs": 39970,
        "endMs": 40290,
        "isKeyword": true
      },
      {
        "word": "tiên,",
        "startMs": 40290,
        "endMs": 40500,
        "isKeyword": true
      },
      {
        "word": "gọi",
        "startMs": 40500,
        "endMs": 40770,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 40770,
        "endMs": 40950,
        "isKeyword": false
      },
      {
        "word": "khối",
        "startMs": 40950,
        "endMs": 41310,
        "isKeyword": false
      },
      {
        "word": "khởi",
        "startMs": 41310,
        "endMs": 41580,
        "isKeyword": true
      },
      {
        "word": "nguyên.",
        "startMs": 41580,
        "endMs": 42320,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 33,
    "sceneId": 7,
    "text": "Trong khối ấy, ông ghim",
    "startMs": 42410,
    "endMs": 43250,
    "words": [
      {
        "word": "Trong",
        "startMs": 42410,
        "endMs": 42540,
        "isKeyword": false
      },
      {
        "word": "khối",
        "startMs": 42540,
        "endMs": 42900,
        "isKeyword": false
      },
      {
        "word": "ấy,",
        "startMs": 42900,
        "endMs": 43050,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 42900,
        "endMs": 43160,
        "isKeyword": false
      },
      {
        "word": "ghim",
        "startMs": 43160,
        "endMs": 43250,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 34,
    "sceneId": 7,
    "text": "kèm dòng tít báo The",
    "startMs": 43250,
    "endMs": 44310,
    "words": [
      {
        "word": "kèm",
        "startMs": 43250,
        "endMs": 43380,
        "isKeyword": false
      },
      {
        "word": "dòng",
        "startMs": 43380,
        "endMs": 43690,
        "isKeyword": false
      },
      {
        "word": "tít",
        "startMs": 43690,
        "endMs": 43980,
        "isKeyword": false
      },
      {
        "word": "báo",
        "startMs": 43980,
        "endMs": 44150,
        "isKeyword": false
      },
      {
        "word": "The",
        "startMs": 44150,
        "endMs": 44310,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 35,
    "sceneId": 7,
    "text": "Times về việc chính phủ",
    "startMs": 44310,
    "endMs": 45560,
    "words": [
      {
        "word": "Times",
        "startMs": 44310,
        "endMs": 44580,
        "isKeyword": true
      },
      {
        "word": "về",
        "startMs": 44580,
        "endMs": 44760,
        "isKeyword": false
      },
      {
        "word": "việc",
        "startMs": 44760,
        "endMs": 45060,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 45060,
        "endMs": 45360,
        "isKeyword": true
      },
      {
        "word": "phủ",
        "startMs": 45360,
        "endMs": 45560,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 36,
    "sceneId": 7,
    "text": "Anh sắp cứu trợ ngân",
    "startMs": 45560,
    "endMs": 46570,
    "words": [
      {
        "word": "Anh",
        "startMs": 45560,
        "endMs": 45650,
        "isKeyword": false
      },
      {
        "word": "sắp",
        "startMs": 45650,
        "endMs": 45860,
        "isKeyword": false
      },
      {
        "word": "cứu",
        "startMs": 45860,
        "endMs": 46130,
        "isKeyword": true
      },
      {
        "word": "trợ",
        "startMs": 46130,
        "endMs": 46390,
        "isKeyword": false
      },
      {
        "word": "ngân",
        "startMs": 46390,
        "endMs": 46570,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 37,
    "sceneId": 7,
    "text": "hàng lần hai, mà nhiều",
    "startMs": 46570,
    "endMs": 47900,
    "words": [
      {
        "word": "hàng",
        "startMs": 46570,
        "endMs": 46790,
        "isKeyword": true
      },
      {
        "word": "lần",
        "startMs": 46790,
        "endMs": 47010,
        "isKeyword": false
      },
      {
        "word": "hai,",
        "startMs": 47010,
        "endMs": 47430,
        "isKeyword": true
      },
      {
        "word": "mà",
        "startMs": 47430,
        "endMs": 47640,
        "isKeyword": false
      },
      {
        "word": "nhiều",
        "startMs": 47640,
        "endMs": 47900,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 38,
    "sceneId": 7,
    "text": "người cho rằng đó là",
    "startMs": 47900,
    "endMs": 49120,
    "words": [
      {
        "word": "người",
        "startMs": 47900,
        "endMs": 48280,
        "isKeyword": false
      },
      {
        "word": "cho",
        "startMs": 48280,
        "endMs": 48410,
        "isKeyword": false
      },
      {
        "word": "rằng",
        "startMs": 48410,
        "endMs": 48790,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 48790,
        "endMs": 48980,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 48980,
        "endMs": 49120,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 39,
    "sceneId": 7,
    "text": "lời nhắn về lý do Bitcoin ra đời.",
    "startMs": 49120,
    "endMs": 51020,
    "words": [
      {
        "word": "lời",
        "startMs": 49120,
        "endMs": 49350,
        "isKeyword": false
      },
      {
        "word": "nhắn",
        "startMs": 49350,
        "endMs": 49630,
        "isKeyword": false
      },
      {
        "word": "về",
        "startMs": 49630,
        "endMs": 49820,
        "isKeyword": false
      },
      {
        "word": "lý",
        "startMs": 49820,
        "endMs": 49950,
        "isKeyword": false
      },
      {
        "word": "do",
        "startMs": 49950,
        "endMs": 50040,
        "isKeyword": false
      },
      {
        "word": "Bitcoin",
        "startMs": 50220,
        "endMs": 50350,
        "isKeyword": true
      },
      {
        "word": "ra",
        "startMs": 50350,
        "endMs": 50490,
        "isKeyword": false
      },
      {
        "word": "đời.",
        "startMs": 50490,
        "endMs": 51020,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 40,
    "sceneId": 8,
    "text": "Giao dịch đầu tiên được",
    "startMs": 51020,
    "endMs": 52260,
    "words": [
      {
        "word": "Giao",
        "startMs": 51020,
        "endMs": 51150,
        "isKeyword": false
      },
      {
        "word": "dịch",
        "startMs": 51150,
        "endMs": 51430,
        "isKeyword": false
      },
      {
        "word": "đầu",
        "startMs": 51430,
        "endMs": 51680,
        "isKeyword": true
      },
      {
        "word": "tiên",
        "startMs": 51680,
        "endMs": 51900,
        "isKeyword": true
      },
      {
        "word": "được",
        "startMs": 51900,
        "endMs": 52260,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 41,
    "sceneId": 8,
    "text": "gửi cho Hal Finney, một",
    "startMs": 52260,
    "endMs": 53300,
    "words": [
      {
        "word": "gửi",
        "startMs": 52260,
        "endMs": 52560,
        "isKeyword": false
      },
      {
        "word": "cho",
        "startMs": 52560,
        "endMs": 52600,
        "isKeyword": false
      },
      {
        "word": "Hal",
        "startMs": 52600,
        "endMs": 52770,
        "isKeyword": true
      },
      {
        "word": "Finney,",
        "startMs": 52770,
        "endMs": 53150,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 53150,
        "endMs": 53300,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 42,
    "sceneId": 8,
    "text": "lập trình viên mật mã",
    "startMs": 53300,
    "endMs": 54610,
    "words": [
      {
        "word": "lập",
        "startMs": 53300,
        "endMs": 53520,
        "isKeyword": false
      },
      {
        "word": "trình",
        "startMs": 53520,
        "endMs": 53790,
        "isKeyword": false
      },
      {
        "word": "viên",
        "startMs": 53790,
        "endMs": 54010,
        "isKeyword": false
      },
      {
        "word": "mật",
        "startMs": 54010,
        "endMs": 54230,
        "isKeyword": true
      },
      {
        "word": "mã",
        "startMs": 54230,
        "endMs": 54610,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 43,
    "sceneId": 8,
    "text": "học, chỉ ít ngày sau đó.",
    "startMs": 54610,
    "endMs": 55920,
    "words": [
      {
        "word": "học,",
        "startMs": 54610,
        "endMs": 54710,
        "isKeyword": false
      },
      {
        "word": "chỉ",
        "startMs": 54710,
        "endMs": 54930,
        "isKeyword": false
      },
      {
        "word": "ít",
        "startMs": 54930,
        "endMs": 55060,
        "isKeyword": false
      },
      {
        "word": "ngày",
        "startMs": 55060,
        "endMs": 55280,
        "isKeyword": false
      },
      {
        "word": "sau",
        "startMs": 55280,
        "endMs": 55410,
        "isKeyword": false
      },
      {
        "word": "đó.",
        "startMs": 55410,
        "endMs": 55920,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 44,
    "sceneId": 9,
    "text": "Suốt nhiều tháng, Bitcoin gần như",
    "startMs": 55920,
    "endMs": 57780,
    "words": [
      {
        "word": "Suốt",
        "startMs": 55920,
        "endMs": 56240,
        "isKeyword": false
      },
      {
        "word": "nhiều",
        "startMs": 56240,
        "endMs": 56580,
        "isKeyword": false
      },
      {
        "word": "tháng,",
        "startMs": 56580,
        "endMs": 57020,
        "isKeyword": false
      },
      {
        "word": "Bitcoin",
        "startMs": 57240,
        "endMs": 57330,
        "isKeyword": true
      },
      {
        "word": "gần",
        "startMs": 57330,
        "endMs": 57580,
        "isKeyword": false
      },
      {
        "word": "như",
        "startMs": 57580,
        "endMs": 57780,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 45,
    "sceneId": 9,
    "text": "không có giá trị, cho đến",
    "startMs": 57780,
    "endMs": 59150,
    "words": [
      {
        "word": "không",
        "startMs": 57780,
        "endMs": 58090,
        "isKeyword": false
      },
      {
        "word": "có",
        "startMs": 58090,
        "endMs": 58240,
        "isKeyword": false
      },
      {
        "word": "giá",
        "startMs": 58240,
        "endMs": 58540,
        "isKeyword": true
      },
      {
        "word": "trị,",
        "startMs": 58540,
        "endMs": 58690,
        "isKeyword": false
      },
      {
        "word": "cho",
        "startMs": 58690,
        "endMs": 58840,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 58840,
        "endMs": 59150,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 46,
    "sceneId": 9,
    "text": "ngày 22 tháng 5 năm 2010,",
    "startMs": 59150,
    "endMs": 60890,
    "words": [
      {
        "word": "ngày",
        "startMs": 59150,
        "endMs": 59410,
        "isKeyword": false
      },
      {
        "word": "22",
        "startMs": 59410,
        "endMs": 59560,
        "isKeyword": true
      },
      {
        "word": "tháng",
        "startMs": 59560,
        "endMs": 59710,
        "isKeyword": false
      },
      {
        "word": "5",
        "startMs": 59410,
        "endMs": 60590,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 60590,
        "endMs": 60740,
        "isKeyword": true
      },
      {
        "word": "2010,",
        "startMs": 60740,
        "endMs": 60890,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 47,
    "sceneId": 9,
    "text": "khi lập trình viên Laszlo Hanyecz",
    "startMs": 60590,
    "endMs": 62090,
    "words": [
      {
        "word": "khi",
        "startMs": 60590,
        "endMs": 60740,
        "isKeyword": false
      },
      {
        "word": "lập",
        "startMs": 60740,
        "endMs": 61040,
        "isKeyword": false
      },
      {
        "word": "trình",
        "startMs": 61040,
        "endMs": 61290,
        "isKeyword": false
      },
      {
        "word": "viên",
        "startMs": 61290,
        "endMs": 61540,
        "isKeyword": false
      },
      {
        "word": "Laszlo",
        "startMs": 61540,
        "endMs": 61840,
        "isKeyword": true
      },
      {
        "word": "Hanyecz",
        "startMs": 61840,
        "endMs": 62090,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 48,
    "sceneId": 9,
    "text": "trả 10.000 bitcoin để mua hai chiếc pizza.",
    "startMs": 62090,
    "endMs": 65240,
    "words": [
      {
        "word": "trả",
        "startMs": 62090,
        "endMs": 62380,
        "isKeyword": false
      },
      {
        "word": "10.000",
        "startMs": 62380,
        "endMs": 63320,
        "isKeyword": false
      },
      {
        "word": "bitcoin",
        "startMs": 63470,
        "endMs": 63780,
        "isKeyword": true
      },
      {
        "word": "để",
        "startMs": 63780,
        "endMs": 63880,
        "isKeyword": false
      },
      {
        "word": "mua",
        "startMs": 63880,
        "endMs": 64030,
        "isKeyword": false
      },
      {
        "word": "hai",
        "startMs": 64180,
        "endMs": 64480,
        "isKeyword": true
      },
      {
        "word": "chiếc",
        "startMs": 64480,
        "endMs": 64630,
        "isKeyword": false
      },
      {
        "word": "pizza.",
        "startMs": 64630,
        "endMs": 65240,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 49,
    "sceneId": 10,
    "text": "Với giá Bitcoin những năm sau",
    "startMs": 65240,
    "endMs": 66580,
    "words": [
      {
        "word": "Với",
        "startMs": 65240,
        "endMs": 65470,
        "isKeyword": false
      },
      {
        "word": "giá",
        "startMs": 65470,
        "endMs": 65640,
        "isKeyword": true
      },
      {
        "word": "Bitcoin",
        "startMs": 65810,
        "endMs": 65990,
        "isKeyword": true
      },
      {
        "word": "những",
        "startMs": 65990,
        "endMs": 66260,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 66260,
        "endMs": 66450,
        "isKeyword": true
      },
      {
        "word": "sau",
        "startMs": 66450,
        "endMs": 66580,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 50,
    "sceneId": 10,
    "text": "đó, hai chiếc pizza ấy có",
    "startMs": 66580,
    "endMs": 67850,
    "words": [
      {
        "word": "đó,",
        "startMs": 66580,
        "endMs": 66990,
        "isKeyword": false
      },
      {
        "word": "hai",
        "startMs": 66990,
        "endMs": 67260,
        "isKeyword": true
      },
      {
        "word": "chiếc",
        "startMs": 67260,
        "endMs": 67390,
        "isKeyword": false
      },
      {
        "word": "pizza",
        "startMs": 67390,
        "endMs": 67530,
        "isKeyword": true
      },
      {
        "word": "ấy",
        "startMs": 67530,
        "endMs": 67710,
        "isKeyword": false
      },
      {
        "word": "có",
        "startMs": 67710,
        "endMs": 67850,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 51,
    "sceneId": 10,
    "text": "lúc trị giá hàng trăm triệu,",
    "startMs": 67850,
    "endMs": 69440,
    "words": [
      {
        "word": "lúc",
        "startMs": 67850,
        "endMs": 68090,
        "isKeyword": false
      },
      {
        "word": "trị",
        "startMs": 68090,
        "endMs": 68240,
        "isKeyword": false
      },
      {
        "word": "giá",
        "startMs": 68240,
        "endMs": 68420,
        "isKeyword": true
      },
      {
        "word": "hàng",
        "startMs": 68420,
        "endMs": 68650,
        "isKeyword": true
      },
      {
        "word": "trăm",
        "startMs": 68650,
        "endMs": 68880,
        "isKeyword": false
      },
      {
        "word": "triệu,",
        "startMs": 68880,
        "endMs": 69440,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 52,
    "sceneId": 10,
    "text": "thậm chí hàng tỷ đô la.",
    "startMs": 69440,
    "endMs": 70840,
    "words": [
      {
        "word": "thậm",
        "startMs": 69440,
        "endMs": 69770,
        "isKeyword": false
      },
      {
        "word": "chí",
        "startMs": 69770,
        "endMs": 69950,
        "isKeyword": false
      },
      {
        "word": "hàng",
        "startMs": 69950,
        "endMs": 70210,
        "isKeyword": true
      },
      {
        "word": "tỷ",
        "startMs": 70210,
        "endMs": 70410,
        "isKeyword": true
      },
      {
        "word": "đô",
        "startMs": 70410,
        "endMs": 70730,
        "isKeyword": true
      },
      {
        "word": "la.",
        "startMs": 70730,
        "endMs": 70840,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 53,
    "sceneId": 11,
    "text": "Ngày ấy về sau",
    "startMs": 70920,
    "endMs": 71550,
    "words": [
      {
        "word": "Ngày",
        "startMs": 70920,
        "endMs": 71060,
        "isKeyword": false
      },
      {
        "word": "ấy",
        "startMs": 71060,
        "endMs": 71240,
        "isKeyword": false
      },
      {
        "word": "về",
        "startMs": 71240,
        "endMs": 71450,
        "isKeyword": false
      },
      {
        "word": "sau",
        "startMs": 71450,
        "endMs": 71550,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 54,
    "sceneId": 11,
    "text": "được cộng đồng gọi",
    "startMs": 71550,
    "endMs": 72700,
    "words": [
      {
        "word": "được",
        "startMs": 71550,
        "endMs": 71910,
        "isKeyword": false
      },
      {
        "word": "cộng",
        "startMs": 71910,
        "endMs": 72170,
        "isKeyword": false
      },
      {
        "word": "đồng",
        "startMs": 72170,
        "endMs": 72480,
        "isKeyword": false
      },
      {
        "word": "gọi",
        "startMs": 72480,
        "endMs": 72700,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 55,
    "sceneId": 11,
    "text": "là Ngày Pizza Bitcoin.",
    "startMs": 72700,
    "endMs": 73840,
    "words": [
      {
        "word": "là",
        "startMs": 72700,
        "endMs": 72830,
        "isKeyword": false
      },
      {
        "word": "Ngày",
        "startMs": 72830,
        "endMs": 73090,
        "isKeyword": false
      },
      {
        "word": "Pizza",
        "startMs": 73350,
        "endMs": 73480,
        "isKeyword": true
      },
      {
        "word": "Bitcoin.",
        "startMs": 73480,
        "endMs": 73840,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 56,
    "sceneId": 12,
    "text": "Năm 2011, Satoshi gửi những",
    "startMs": 73840,
    "endMs": 75720,
    "words": [
      {
        "word": "Năm",
        "startMs": 73840,
        "endMs": 74040,
        "isKeyword": true
      },
      {
        "word": "2011,",
        "startMs": 74040,
        "endMs": 74760,
        "isKeyword": true
      },
      {
        "word": "Satoshi",
        "startMs": 74760,
        "endMs": 75160,
        "isKeyword": true
      },
      {
        "word": "gửi",
        "startMs": 75160,
        "endMs": 75360,
        "isKeyword": false
      },
      {
        "word": "những",
        "startMs": 75360,
        "endMs": 75720,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 57,
    "sceneId": 12,
    "text": "tin nhắn cuối cùng, nói",
    "startMs": 75720,
    "endMs": 77120,
    "words": [
      {
        "word": "tin",
        "startMs": 75720,
        "endMs": 75870,
        "isKeyword": false
      },
      {
        "word": "nhắn",
        "startMs": 75870,
        "endMs": 76170,
        "isKeyword": false
      },
      {
        "word": "cuối",
        "startMs": 76170,
        "endMs": 76470,
        "isKeyword": false
      },
      {
        "word": "cùng,",
        "startMs": 76470,
        "endMs": 77080,
        "isKeyword": false
      },
      {
        "word": "nói",
        "startMs": 77080,
        "endMs": 77120,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 58,
    "sceneId": 12,
    "text": "rằng mình đã chuyển sang",
    "startMs": 77120,
    "endMs": 78140,
    "words": [
      {
        "word": "rằng",
        "startMs": 77120,
        "endMs": 77310,
        "isKeyword": false
      },
      {
        "word": "mình",
        "startMs": 77310,
        "endMs": 77500,
        "isKeyword": false
      },
      {
        "word": "đã",
        "startMs": 77500,
        "endMs": 77670,
        "isKeyword": false
      },
      {
        "word": "chuyển",
        "startMs": 77670,
        "endMs": 78000,
        "isKeyword": false
      },
      {
        "word": "sang",
        "startMs": 78000,
        "endMs": 78140,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 59,
    "sceneId": 12,
    "text": "việc khác, rồi biến mất hoàn toàn.",
    "startMs": 78140,
    "endMs": 80070,
    "words": [
      {
        "word": "việc",
        "startMs": 78140,
        "endMs": 78370,
        "isKeyword": false
      },
      {
        "word": "khác,",
        "startMs": 78370,
        "endMs": 78880,
        "isKeyword": false
      },
      {
        "word": "rồi",
        "startMs": 78880,
        "endMs": 78920,
        "isKeyword": false
      },
      {
        "word": "biến",
        "startMs": 78920,
        "endMs": 79200,
        "isKeyword": true
      },
      {
        "word": "mất",
        "startMs": 79200,
        "endMs": 79430,
        "isKeyword": true
      },
      {
        "word": "hoàn",
        "startMs": 79430,
        "endMs": 79660,
        "isKeyword": false
      },
      {
        "word": "toàn.",
        "startMs": 79660,
        "endMs": 80070,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 60,
    "sceneId": 13,
    "text": "Người ta ước tính ông",
    "startMs": 80070,
    "endMs": 81030,
    "words": [
      {
        "word": "Người",
        "startMs": 80070,
        "endMs": 80310,
        "isKeyword": false
      },
      {
        "word": "ta",
        "startMs": 80310,
        "endMs": 80390,
        "isKeyword": false
      },
      {
        "word": "ước",
        "startMs": 80390,
        "endMs": 80650,
        "isKeyword": false
      },
      {
        "word": "tính",
        "startMs": 80650,
        "endMs": 80860,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 80860,
        "endMs": 81030,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 61,
    "sceneId": 13,
    "text": "nắm khoảng một triệu bitcoin",
    "startMs": 81030,
    "endMs": 82400,
    "words": [
      {
        "word": "nắm",
        "startMs": 81030,
        "endMs": 81240,
        "isKeyword": false
      },
      {
        "word": "khoảng",
        "startMs": 81240,
        "endMs": 81590,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 81590,
        "endMs": 81810,
        "isKeyword": true
      },
      {
        "word": "triệu",
        "startMs": 82110,
        "endMs": 82320,
        "isKeyword": true
      },
      {
        "word": "bitcoin",
        "startMs": 82320,
        "endMs": 82400,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 62,
    "sceneId": 13,
    "text": "và chưa từng động tới chúng.",
    "startMs": 82400,
    "endMs": 84040,
    "words": [
      {
        "word": "và",
        "startMs": 82400,
        "endMs": 82530,
        "isKeyword": false
      },
      {
        "word": "chưa",
        "startMs": 82530,
        "endMs": 82750,
        "isKeyword": false
      },
      {
        "word": "từng",
        "startMs": 82750,
        "endMs": 83060,
        "isKeyword": false
      },
      {
        "word": "động",
        "startMs": 83060,
        "endMs": 83310,
        "isKeyword": false
      },
      {
        "word": "tới",
        "startMs": 83310,
        "endMs": 83480,
        "isKeyword": false
      },
      {
        "word": "chúng.",
        "startMs": 83480,
        "endMs": 84040,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 63,
    "sceneId": 14,
    "text": "Nhiều người từng bị nghi",
    "startMs": 84040,
    "endMs": 85270,
    "words": [
      {
        "word": "Nhiều",
        "startMs": 84040,
        "endMs": 84330,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 84330,
        "endMs": 84680,
        "isKeyword": false
      },
      {
        "word": "từng",
        "startMs": 84680,
        "endMs": 84930,
        "isKeyword": false
      },
      {
        "word": "bị",
        "startMs": 84930,
        "endMs": 85100,
        "isKeyword": false
      },
      {
        "word": "nghi",
        "startMs": 85100,
        "endMs": 85270,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 64,
    "sceneId": 14,
    "text": "là Satoshi, nhưng đến nay",
    "startMs": 85270,
    "endMs": 86430,
    "words": [
      {
        "word": "là",
        "startMs": 85270,
        "endMs": 85400,
        "isKeyword": false
      },
      {
        "word": "Satoshi,",
        "startMs": 85400,
        "endMs": 85780,
        "isKeyword": true
      },
      {
        "word": "nhưng",
        "startMs": 85780,
        "endMs": 86300,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 86300,
        "endMs": 86380,
        "isKeyword": false
      },
      {
        "word": "nay",
        "startMs": 86380,
        "endMs": 86430,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 65,
    "sceneId": 14,
    "text": "chưa ai được chứng minh chắc chắn.",
    "startMs": 86430,
    "endMs": 88480,
    "words": [
      {
        "word": "chưa",
        "startMs": 86430,
        "endMs": 86650,
        "isKeyword": false
      },
      {
        "word": "ai",
        "startMs": 86650,
        "endMs": 86730,
        "isKeyword": false
      },
      {
        "word": "được",
        "startMs": 86730,
        "endMs": 87080,
        "isKeyword": false
      },
      {
        "word": "chứng",
        "startMs": 87080,
        "endMs": 87410,
        "isKeyword": true
      },
      {
        "word": "minh",
        "startMs": 87410,
        "endMs": 87550,
        "isKeyword": false
      },
      {
        "word": "chắc",
        "startMs": 87550,
        "endMs": 87800,
        "isKeyword": false
      },
      {
        "word": "chắn.",
        "startMs": 87800,
        "endMs": 88480,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 66,
    "sceneId": 15,
    "text": "Điều đặc biệt là chỉ",
    "startMs": 88480,
    "endMs": 89540,
    "words": [
      {
        "word": "Điều",
        "startMs": 88480,
        "endMs": 88650,
        "isKeyword": false
      },
      {
        "word": "đặc",
        "startMs": 88650,
        "endMs": 88950,
        "isKeyword": false
      },
      {
        "word": "biệt",
        "startMs": 88950,
        "endMs": 89230,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 89230,
        "endMs": 89350,
        "isKeyword": false
      },
      {
        "word": "chỉ",
        "startMs": 89350,
        "endMs": 89540,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 67,
    "sceneId": 15,
    "text": "có tối đa 21 triệu",
    "startMs": 89540,
    "endMs": 90680,
    "words": [
      {
        "word": "có",
        "startMs": 89540,
        "endMs": 89670,
        "isKeyword": false
      },
      {
        "word": "tối",
        "startMs": 89670,
        "endMs": 89850,
        "isKeyword": false
      },
      {
        "word": "đa",
        "startMs": 89850,
        "endMs": 89980,
        "isKeyword": false
      },
      {
        "word": "21",
        "startMs": 89980,
        "endMs": 90250,
        "isKeyword": true
      },
      {
        "word": "triệu",
        "startMs": 90560,
        "endMs": 90680,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 68,
    "sceneId": 15,
    "text": "bitcoin, và cứ khoảng bốn",
    "startMs": 90680,
    "endMs": 92240,
    "words": [
      {
        "word": "bitcoin,",
        "startMs": 90680,
        "endMs": 91070,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 91070,
        "endMs": 91100,
        "isKeyword": false
      },
      {
        "word": "cứ",
        "startMs": 91100,
        "endMs": 91340,
        "isKeyword": false
      },
      {
        "word": "khoảng",
        "startMs": 91340,
        "endMs": 91810,
        "isKeyword": false
      },
      {
        "word": "bốn",
        "startMs": 91810,
        "endMs": 92240,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 69,
    "sceneId": 15,
    "text": "năm, phần thưởng khai thác",
    "startMs": 92240,
    "endMs": 93200,
    "words": [
      {
        "word": "năm,",
        "startMs": 92240,
        "endMs": 92320,
        "isKeyword": true
      },
      {
        "word": "phần",
        "startMs": 92320,
        "endMs": 92530,
        "isKeyword": false
      },
      {
        "word": "thưởng",
        "startMs": 92530,
        "endMs": 92870,
        "isKeyword": false
      },
      {
        "word": "khai",
        "startMs": 92870,
        "endMs": 93060,
        "isKeyword": true
      },
      {
        "word": "thác",
        "startMs": 93060,
        "endMs": 93200,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 70,
    "sceneId": 15,
    "text": "lại giảm đi một nửa.",
    "startMs": 93200,
    "endMs": 94340,
    "words": [
      {
        "word": "lại",
        "startMs": 93200,
        "endMs": 93380,
        "isKeyword": false
      },
      {
        "word": "giảm",
        "startMs": 93380,
        "endMs": 93590,
        "isKeyword": false
      },
      {
        "word": "đi",
        "startMs": 93590,
        "endMs": 93700,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 93700,
        "endMs": 93920,
        "isKeyword": true
      },
      {
        "word": "nửa.",
        "startMs": 93920,
        "endMs": 94340,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 71,
    "sceneId": 16,
    "text": "Nhờ sự khan hiếm ấy,",
    "startMs": 94440,
    "endMs": 95630,
    "words": [
      {
        "word": "Nhờ",
        "startMs": 94440,
        "endMs": 94590,
        "isKeyword": false
      },
      {
        "word": "sự",
        "startMs": 94590,
        "endMs": 94810,
        "isKeyword": false
      },
      {
        "word": "khan",
        "startMs": 94810,
        "endMs": 95040,
        "isKeyword": false
      },
      {
        "word": "hiếm",
        "startMs": 95040,
        "endMs": 95290,
        "isKeyword": false
      },
      {
        "word": "ấy,",
        "startMs": 95290,
        "endMs": 95630,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 72,
    "sceneId": 16,
    "text": "giá bắt đầu tăng: năm",
    "startMs": 95630,
    "endMs": 96900,
    "words": [
      {
        "word": "giá",
        "startMs": 95630,
        "endMs": 95790,
        "isKeyword": true
      },
      {
        "word": "bắt",
        "startMs": 95790,
        "endMs": 96040,
        "isKeyword": false
      },
      {
        "word": "đầu",
        "startMs": 96040,
        "endMs": 96350,
        "isKeyword": true
      },
      {
        "word": "tăng:",
        "startMs": 96350,
        "endMs": 96700,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 96700,
        "endMs": 96900,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 73,
    "sceneId": 16,
    "text": "2013 vượt 1.000 đô la,",
    "startMs": 96900,
    "endMs": 98960,
    "words": [
      {
        "word": "2013",
        "startMs": 96900,
        "endMs": 97520,
        "isKeyword": true
      },
      {
        "word": "vượt",
        "startMs": 97520,
        "endMs": 97870,
        "isKeyword": false
      },
      {
        "word": "1.000",
        "startMs": 97870,
        "endMs": 98730,
        "isKeyword": false
      },
      {
        "word": "đô",
        "startMs": 98730,
        "endMs": 98930,
        "isKeyword": true
      },
      {
        "word": "la,",
        "startMs": 98930,
        "endMs": 98960,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 74,
    "sceneId": 16,
    "text": "và năm 2017 chạm gần 20.000 đô la.",
    "startMs": 98960,
    "endMs": 102080,
    "words": [
      {
        "word": "và",
        "startMs": 98960,
        "endMs": 99080,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 99080,
        "endMs": 99280,
        "isKeyword": true
      },
      {
        "word": "2017",
        "startMs": 99280,
        "endMs": 99900,
        "isKeyword": true
      },
      {
        "word": "chạm",
        "startMs": 99900,
        "endMs": 100250,
        "isKeyword": false
      },
      {
        "word": "gần",
        "startMs": 100250,
        "endMs": 100450,
        "isKeyword": false
      },
      {
        "word": "20.000",
        "startMs": 100450,
        "endMs": 101370,
        "isKeyword": false
      },
      {
        "word": "đô",
        "startMs": 101370,
        "endMs": 101570,
        "isKeyword": true
      },
      {
        "word": "la.",
        "startMs": 101570,
        "endMs": 102080,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 75,
    "sceneId": 17,
    "text": "Nhưng hành trình ấy đầy",
    "startMs": 102080,
    "endMs": 103300,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 102080,
        "endMs": 102250,
        "isKeyword": false
      },
      {
        "word": "hành",
        "startMs": 102250,
        "endMs": 102500,
        "isKeyword": false
      },
      {
        "word": "trình",
        "startMs": 102500,
        "endMs": 102800,
        "isKeyword": false
      },
      {
        "word": "ấy",
        "startMs": 102800,
        "endMs": 103000,
        "isKeyword": false
      },
      {
        "word": "đầy",
        "startMs": 103000,
        "endMs": 103300,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 76,
    "sceneId": 17,
    "text": "sóng gió: năm 2014, sàn",
    "startMs": 103300,
    "endMs": 105220,
    "words": [
      {
        "word": "sóng",
        "startMs": 103300,
        "endMs": 103630,
        "isKeyword": false
      },
      {
        "word": "gió:",
        "startMs": 103630,
        "endMs": 103910,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 103910,
        "endMs": 104110,
        "isKeyword": true
      },
      {
        "word": "2014,",
        "startMs": 104110,
        "endMs": 104920,
        "isKeyword": false
      },
      {
        "word": "sàn",
        "startMs": 104920,
        "endMs": 105220,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 77,
    "sceneId": 17,
    "text": "Mt. Gox, từng xử lý",
    "startMs": 105220,
    "endMs": 106480,
    "words": [
      {
        "word": "Mt.",
        "startMs": 105220,
        "endMs": 105520,
        "isKeyword": false
      },
      {
        "word": "Gox,",
        "startMs": 105520,
        "endMs": 105700,
        "isKeyword": true
      },
      {
        "word": "từng",
        "startMs": 105700,
        "endMs": 106050,
        "isKeyword": false
      },
      {
        "word": "xử",
        "startMs": 106050,
        "endMs": 106300,
        "isKeyword": false
      },
      {
        "word": "lý",
        "startMs": 106300,
        "endMs": 106480,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 78,
    "sceneId": 17,
    "text": "phần lớn giao dịch Bitcoin,",
    "startMs": 106480,
    "endMs": 108300,
    "words": [
      {
        "word": "phần",
        "startMs": 106480,
        "endMs": 106840,
        "isKeyword": false
      },
      {
        "word": "lớn",
        "startMs": 106840,
        "endMs": 107140,
        "isKeyword": false
      },
      {
        "word": "giao",
        "startMs": 107140,
        "endMs": 107380,
        "isKeyword": false
      },
      {
        "word": "dịch",
        "startMs": 107380,
        "endMs": 107740,
        "isKeyword": false
      },
      {
        "word": "Bitcoin,",
        "startMs": 108100,
        "endMs": 108300,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 79,
    "sceneId": 17,
    "text": "sụp đổ, và hàng trăm nghìn bitcoin biến mất.",
    "startMs": 108300,
    "endMs": 110840,
    "words": [
      {
        "word": "sụp",
        "startMs": 108300,
        "endMs": 108700,
        "isKeyword": true
      },
      {
        "word": "đổ,",
        "startMs": 108700,
        "endMs": 109000,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 109000,
        "endMs": 109010,
        "isKeyword": false
      },
      {
        "word": "hàng",
        "startMs": 109010,
        "endMs": 109250,
        "isKeyword": true
      },
      {
        "word": "trăm",
        "startMs": 109250,
        "endMs": 109500,
        "isKeyword": false
      },
      {
        "word": "nghìn",
        "startMs": 109750,
        "endMs": 109950,
        "isKeyword": true
      },
      {
        "word": "bitcoin",
        "startMs": 109950,
        "endMs": 110100,
        "isKeyword": true
      },
      {
        "word": "biến",
        "startMs": 110100,
        "endMs": 110450,
        "isKeyword": true
      },
      {
        "word": "mất.",
        "startMs": 110450,
        "endMs": 110840,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 80,
    "sceneId": 18,
    "text": "Giá nhiều lần mất",
    "startMs": 110840,
    "endMs": 111960,
    "words": [
      {
        "word": "Giá",
        "startMs": 110840,
        "endMs": 111190,
        "isKeyword": true
      },
      {
        "word": "nhiều",
        "startMs": 111190,
        "endMs": 111400,
        "isKeyword": false
      },
      {
        "word": "lần",
        "startMs": 111400,
        "endMs": 111640,
        "isKeyword": false
      },
      {
        "word": "mất",
        "startMs": 111640,
        "endMs": 111960,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 81,
    "sceneId": 18,
    "text": "phần lớn giá trị,",
    "startMs": 111960,
    "endMs": 112950,
    "words": [
      {
        "word": "phần",
        "startMs": 111960,
        "endMs": 112200,
        "isKeyword": false
      },
      {
        "word": "lớn",
        "startMs": 112200,
        "endMs": 112440,
        "isKeyword": false
      },
      {
        "word": "giá",
        "startMs": 112440,
        "endMs": 112650,
        "isKeyword": true
      },
      {
        "word": "trị,",
        "startMs": 112650,
        "endMs": 112950,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 82,
    "sceneId": 18,
    "text": "và Bitcoin cũng nhiều",
    "startMs": 112950,
    "endMs": 114010,
    "words": [
      {
        "word": "và",
        "startMs": 112950,
        "endMs": 113050,
        "isKeyword": false
      },
      {
        "word": "Bitcoin",
        "startMs": 113350,
        "endMs": 113400,
        "isKeyword": true
      },
      {
        "word": "cũng",
        "startMs": 113400,
        "endMs": 113730,
        "isKeyword": false
      },
      {
        "word": "nhiều",
        "startMs": 113730,
        "endMs": 114010,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 83,
    "sceneId": 18,
    "text": "lần bị tuyên bố là đã chết.",
    "startMs": 114010,
    "endMs": 115810,
    "words": [
      {
        "word": "lần",
        "startMs": 114010,
        "endMs": 114260,
        "isKeyword": false
      },
      {
        "word": "bị",
        "startMs": 114260,
        "endMs": 114460,
        "isKeyword": false
      },
      {
        "word": "tuyên",
        "startMs": 114460,
        "endMs": 114760,
        "isKeyword": false
      },
      {
        "word": "bố",
        "startMs": 114760,
        "endMs": 114960,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 114960,
        "endMs": 115110,
        "isKeyword": false
      },
      {
        "word": "đã",
        "startMs": 115110,
        "endMs": 115490,
        "isKeyword": false
      },
      {
        "word": "chết.",
        "startMs": 115490,
        "endMs": 115810,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 84,
    "sceneId": 19,
    "text": "Năm 2021, El Salvador trở",
    "startMs": 115810,
    "endMs": 117620,
    "words": [
      {
        "word": "Năm",
        "startMs": 115810,
        "endMs": 116010,
        "isKeyword": true
      },
      {
        "word": "2021,",
        "startMs": 116010,
        "endMs": 116860,
        "isKeyword": true
      },
      {
        "word": "El",
        "startMs": 116860,
        "endMs": 117110,
        "isKeyword": false
      },
      {
        "word": "Salvador",
        "startMs": 117110,
        "endMs": 117400,
        "isKeyword": true
      },
      {
        "word": "trở",
        "startMs": 117400,
        "endMs": 117620,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 85,
    "sceneId": 19,
    "text": "thành quốc gia đầu tiên",
    "startMs": 117620,
    "endMs": 118780,
    "words": [
      {
        "word": "thành",
        "startMs": 117620,
        "endMs": 117890,
        "isKeyword": false
      },
      {
        "word": "quốc",
        "startMs": 117890,
        "endMs": 118160,
        "isKeyword": false
      },
      {
        "word": "gia",
        "startMs": 118160,
        "endMs": 118290,
        "isKeyword": false
      },
      {
        "word": "đầu",
        "startMs": 118290,
        "endMs": 118560,
        "isKeyword": true
      },
      {
        "word": "tiên",
        "startMs": 118560,
        "endMs": 118780,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 86,
    "sceneId": 19,
    "text": "công nhận Bitcoin là tiền",
    "startMs": 118780,
    "endMs": 119980,
    "words": [
      {
        "word": "công",
        "startMs": 118780,
        "endMs": 119010,
        "isKeyword": false
      },
      {
        "word": "nhận",
        "startMs": 119010,
        "endMs": 119280,
        "isKeyword": false
      },
      {
        "word": "Bitcoin",
        "startMs": 119450,
        "endMs": 119580,
        "isKeyword": true
      },
      {
        "word": "là",
        "startMs": 119580,
        "endMs": 119710,
        "isKeyword": false
      },
      {
        "word": "tiền",
        "startMs": 119710,
        "endMs": 119980,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 87,
    "sceneId": 19,
    "text": "tệ hợp pháp, và giá",
    "startMs": 119980,
    "endMs": 121080,
    "words": [
      {
        "word": "tệ",
        "startMs": 119980,
        "endMs": 120150,
        "isKeyword": false
      },
      {
        "word": "hợp",
        "startMs": 120150,
        "endMs": 120360,
        "isKeyword": true
      },
      {
        "word": "pháp,",
        "startMs": 120360,
        "endMs": 120840,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 120840,
        "endMs": 120890,
        "isKeyword": false
      },
      {
        "word": "giá",
        "startMs": 120890,
        "endMs": 121080,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 88,
    "sceneId": 19,
    "text": "khi đó chạm khoảng 69.000 đô la.",
    "startMs": 121080,
    "endMs": 123340,
    "words": [
      {
        "word": "khi",
        "startMs": 121080,
        "endMs": 121310,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 121310,
        "endMs": 121430,
        "isKeyword": false
      },
      {
        "word": "chạm",
        "startMs": 121430,
        "endMs": 121710,
        "isKeyword": false
      },
      {
        "word": "khoảng",
        "startMs": 121710,
        "endMs": 122100,
        "isKeyword": false
      },
      {
        "word": "69.000",
        "startMs": 122100,
        "endMs": 122970,
        "isKeyword": false
      },
      {
        "word": "đô",
        "startMs": 122970,
        "endMs": 123310,
        "isKeyword": true
      },
      {
        "word": "la.",
        "startMs": 123310,
        "endMs": 123340,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 89,
    "sceneId": 20,
    "text": "Tháng 1 năm 2024, Mỹ",
    "startMs": 123430,
    "endMs": 124970,
    "words": [
      {
        "word": "Tháng",
        "startMs": 123430,
        "endMs": 123650,
        "isKeyword": false
      },
      {
        "word": "1",
        "startMs": 123650,
        "endMs": 123860,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 123860,
        "endMs": 124020,
        "isKeyword": true
      },
      {
        "word": "2024,",
        "startMs": 124020,
        "endMs": 124760,
        "isKeyword": true
      },
      {
        "word": "Mỹ",
        "startMs": 124760,
        "endMs": 124970,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 90,
    "sceneId": 20,
    "text": "chấp thuận các quỹ ETF",
    "startMs": 124970,
    "endMs": 126220,
    "words": [
      {
        "word": "chấp",
        "startMs": 124970,
        "endMs": 125240,
        "isKeyword": false
      },
      {
        "word": "thuận",
        "startMs": 125240,
        "endMs": 125670,
        "isKeyword": false
      },
      {
        "word": "các",
        "startMs": 125670,
        "endMs": 125860,
        "isKeyword": false
      },
      {
        "word": "quỹ",
        "startMs": 125860,
        "endMs": 126060,
        "isKeyword": false
      },
      {
        "word": "ETF",
        "startMs": 126060,
        "endMs": 126220,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 91,
    "sceneId": 20,
    "text": "Bitcoin giao ngay, đưa nó",
    "startMs": 126430,
    "endMs": 127350,
    "words": [
      {
        "word": "Bitcoin",
        "startMs": 126430,
        "endMs": 126630,
        "isKeyword": true
      },
      {
        "word": "giao",
        "startMs": 126630,
        "endMs": 126730,
        "isKeyword": false
      },
      {
        "word": "ngay,",
        "startMs": 126730,
        "endMs": 126930,
        "isKeyword": false
      },
      {
        "word": "đưa",
        "startMs": 126930,
        "endMs": 127190,
        "isKeyword": false
      },
      {
        "word": "nó",
        "startMs": 127190,
        "endMs": 127350,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 92,
    "sceneId": 20,
    "text": "vào các sàn chứng khoán truyền thống.",
    "startMs": 127350,
    "endMs": 129840,
    "words": [
      {
        "word": "vào",
        "startMs": 127350,
        "endMs": 127560,
        "isKeyword": false
      },
      {
        "word": "các",
        "startMs": 127560,
        "endMs": 127770,
        "isKeyword": false
      },
      {
        "word": "sàn",
        "startMs": 127770,
        "endMs": 128020,
        "isKeyword": false
      },
      {
        "word": "chứng",
        "startMs": 128020,
        "endMs": 128390,
        "isKeyword": true
      },
      {
        "word": "khoán",
        "startMs": 128390,
        "endMs": 128710,
        "isKeyword": true
      },
      {
        "word": "truyền",
        "startMs": 128710,
        "endMs": 129130,
        "isKeyword": false
      },
      {
        "word": "thống.",
        "startMs": 129130,
        "endMs": 129840,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 93,
    "sceneId": 21,
    "text": "Dù vậy, Bitcoin vẫn gây",
    "startMs": 129840,
    "endMs": 131030,
    "words": [
      {
        "word": "Dù",
        "startMs": 129840,
        "endMs": 130120,
        "isKeyword": false
      },
      {
        "word": "vậy,",
        "startMs": 130120,
        "endMs": 130300,
        "isKeyword": false
      },
      {
        "word": "Bitcoin",
        "startMs": 130480,
        "endMs": 130770,
        "isKeyword": true
      },
      {
        "word": "vẫn",
        "startMs": 130770,
        "endMs": 130890,
        "isKeyword": false
      },
      {
        "word": "gây",
        "startMs": 130890,
        "endMs": 131030,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 94,
    "sceneId": 21,
    "text": "tranh cãi: người coi nó",
    "startMs": 131030,
    "endMs": 132170,
    "words": [
      {
        "word": "tranh",
        "startMs": 131030,
        "endMs": 131260,
        "isKeyword": false
      },
      {
        "word": "cãi:",
        "startMs": 131260,
        "endMs": 131520,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 131520,
        "endMs": 131990,
        "isKeyword": false
      },
      {
        "word": "coi",
        "startMs": 131990,
        "endMs": 132070,
        "isKeyword": false
      },
      {
        "word": "nó",
        "startMs": 132070,
        "endMs": 132170,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 95,
    "sceneId": 21,
    "text": "là vàng số, người gọi",
    "startMs": 132170,
    "endMs": 133410,
    "words": [
      {
        "word": "là",
        "startMs": 132170,
        "endMs": 132310,
        "isKeyword": false
      },
      {
        "word": "vàng",
        "startMs": 132310,
        "endMs": 132490,
        "isKeyword": true
      },
      {
        "word": "số,",
        "startMs": 132490,
        "endMs": 132770,
        "isKeyword": true
      },
      {
        "word": "người",
        "startMs": 132770,
        "endMs": 133190,
        "isKeyword": false
      },
      {
        "word": "gọi",
        "startMs": 133190,
        "endMs": 133410,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 96,
    "sceneId": 21,
    "text": "nó là bong bóng đầu cơ,",
    "startMs": 133410,
    "endMs": 134850,
    "words": [
      {
        "word": "nó",
        "startMs": 133410,
        "endMs": 133520,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 133520,
        "endMs": 133680,
        "isKeyword": false
      },
      {
        "word": "bong",
        "startMs": 133680,
        "endMs": 133880,
        "isKeyword": true
      },
      {
        "word": "bóng",
        "startMs": 133880,
        "endMs": 134100,
        "isKeyword": true
      },
      {
        "word": "đầu",
        "startMs": 134100,
        "endMs": 134380,
        "isKeyword": true
      },
      {
        "word": "cơ,",
        "startMs": 134380,
        "endMs": 134850,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 97,
    "sceneId": 22,
    "text": "và việc khai thác cũng",
    "startMs": 134850,
    "endMs": 135580,
    "words": [
      {
        "word": "và",
        "startMs": 134850,
        "endMs": 134950,
        "isKeyword": false
      },
      {
        "word": "việc",
        "startMs": 134950,
        "endMs": 135070,
        "isKeyword": false
      },
      {
        "word": "khai",
        "startMs": 135070,
        "endMs": 135200,
        "isKeyword": true
      },
      {
        "word": "thác",
        "startMs": 135200,
        "endMs": 135410,
        "isKeyword": true
      },
      {
        "word": "cũng",
        "startMs": 135410,
        "endMs": 135580,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 98,
    "sceneId": 22,
    "text": "tiêu tốn rất nhiều điện.",
    "startMs": 135580,
    "endMs": 136840,
    "words": [
      {
        "word": "tiêu",
        "startMs": 135580,
        "endMs": 135770,
        "isKeyword": false
      },
      {
        "word": "tốn",
        "startMs": 135770,
        "endMs": 135940,
        "isKeyword": false
      },
      {
        "word": "rất",
        "startMs": 135940,
        "endMs": 136130,
        "isKeyword": false
      },
      {
        "word": "nhiều",
        "startMs": 136130,
        "endMs": 136390,
        "isKeyword": false
      },
      {
        "word": "điện.",
        "startMs": 136390,
        "endMs": 136840,
        "isKeyword": true
      }
    ]
  }
];
