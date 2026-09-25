// Auto-generated Subtitles and Scene Configuration for World Cup 2002 Short
// Satirical Football Documentary Style
// 12 Scenes matching 12 illustrations and aligned narrative beats

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

export const WORLDCUP_TOTAL_FRAMES = 3530;
export const WORLDCUP_FPS = 30;
export const WORLDCUP_AUDIO_PATH = "audio/world-cup-2002.wav";

export const WORLDCUP_SCENES: SceneMeta[] = [
  {
    "id": 1,
    "image": "01-korea-2002-miracle-hook.png",
    "badge": "⚽ 'PHÉP MÀU' WORLD CUP 2002",
    "hud": "WORLD CUP 2002 • CONTROVERSY",
    "startFrame": 0,
    "endFrame": 280,
    "durationInFrames": 280
  },
  {
    "id": 2,
    "image": "02-host-nation-spotlight.png",
    "badge": "🎪 WORLD CUP DÀNH RIÊNG CHO CHỦ NHÀ",
    "hud": "SUẤT BÁN KẾT ĐẶC CÁCH",
    "startFrame": 280,
    "endFrame": 691,
    "durationInFrames": 411
  },
  {
    "id": 3,
    "image": "03-italy-match-controversial-red-card.png",
    "badge": "🟥 THẺ ĐỎ OAN NGHIỆT CHO TOTTI",
    "hud": "TRẬN CHIẾN Ý - HÀN QUỐC",
    "startFrame": 691,
    "endFrame": 1035,
    "durationInFrames": 344
  },
  {
    "id": 4,
    "image": "04-replay-and-golden-goal.png",
    "badge": "⚡ BÀN THẮNG VÀNG & NỖI UẤT ỨC Ý",
    "hud": "BÀN THẮNG VÀNG TRANH CÃI",
    "startFrame": 1035,
    "endFrame": 1552,
    "durationInFrames": 517
  },
  {
    "id": 5,
    "image": "05-spain-disallowed-goal-debate.png",
    "badge": "🚫 2 BÀN THẮNG BỊ TỪ CHỐI KHÓ HIỂU",
    "hud": "TÂY BAN NHA BỊ XỬ ÉP",
    "startFrame": 1552,
    "endFrame": 1889,
    "durationInFrames": 337
  },
  {
    "id": 6,
    "image": "07-twelve-vs-eleven-satire.png",
    "badge": "👥 ĐỘI BÓNG 12 NGƯỜI TRÊN SÂN",
    "hud": "11 CẦU THỦ + 1 TRỌNG TÀI",
    "startFrame": 1889,
    "endFrame": 2049,
    "durationInFrames": 160
  },
  {
    "id": 7,
    "image": "06-penalty-shootout-reactions.png",
    "badge": "🥅 PHẠT ĐỀN NƯỚC MẮT TÂY BAN NHA",
    "hud": "LUÂN LƯU 11M ĐỊNH MỆNH",
    "startFrame": 2049,
    "endFrame": 2224,
    "durationInFrames": 175
  },
  {
    "id": 8,
    "image": "08-germany-semifinal-reality-check.png",
    "badge": "🇩🇪 BÁN KẾT: ĐỨC DẬP TẮT ẢO TƯỞNG",
    "hud": "KẾT QUẢ THUA 0-1 TRƯỚC ĐỨC",
    "startFrame": 2224,
    "endFrame": 2438,
    "durationInFrames": 214
  },
  {
    "id": 9,
    "image": "09-fourth-place-celebration.png",
    "badge": "🎆 ĂN MỪNG NHƯ VÔ ĐỊCH VŨ TRỤ",
    "hud": "KỲ TÍCH HẠNG TƯ THẾ GIỚI",
    "startFrame": 2438,
    "endFrame": 2582,
    "durationInFrames": 144
  },
  {
    "id": 10,
    "image": "10-refereeing-debate-after-tournament.png",
    "badge": "🎤 'TRỌNG TÀI ĐÃ LÀM RẤT TỐT'",
    "hud": "PHÁT NGÔN BẤT HỦ CỦA FIFA",
    "startFrame": 2582,
    "endFrame": 2937,
    "durationInFrames": 355
  },
  {
    "id": 11,
    "image": "11-fans-divided-legacy.png",
    "badge": "🤷 CHỈ CẦN TRỌNG TÀI THÍCH BẠN",
    "hud": "CÔNG THỨC VÀO BÁN KẾT",
    "startFrame": 2937,
    "endFrame": 3224,
    "durationInFrames": 287
  },
  {
    "id": 12,
    "image": "12-fairness-is-relative-ending.png",
    "badge": "⚖️ CÔNG BẰNG LÀ KHÁI NIỆM TƯƠNG ĐỐI",
    "hud": "BÀI HỌC VỀ SỰ CÔNG BẰNG",
    "startFrame": 3224,
    "endFrame": 3530,
    "durationInFrames": 306
  }
];

export const WORLDCUP_PHRASES: PhraseCaption[] = [
  {
    "id": 1,
    "sceneId": 1,
    "text": "World Cup 2002 của",
    "startMs": 50,
    "endMs": 1400,
    "words": [
      {
        "word": "World",
        "startMs": 50,
        "endMs": 260,
        "isKeyword": true
      },
      {
        "word": "Cup",
        "startMs": 260,
        "endMs": 470,
        "isKeyword": true
      },
      {
        "word": "2002",
        "startMs": 470,
        "endMs": 1130,
        "isKeyword": true
      },
      {
        "word": "của",
        "startMs": 1130,
        "endMs": 1400,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 2,
    "sceneId": 1,
    "text": "Hàn Quốc… cái “phép",
    "startMs": 1400,
    "endMs": 2610,
    "words": [
      {
        "word": "Hàn",
        "startMs": 1400,
        "endMs": 1610,
        "isKeyword": true
      },
      {
        "word": "Quốc…",
        "startMs": 1610,
        "endMs": 2180,
        "isKeyword": true
      },
      {
        "word": "cái",
        "startMs": 2180,
        "endMs": 2420,
        "isKeyword": false
      },
      {
        "word": "“phép",
        "startMs": 2420,
        "endMs": 2610,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 3,
    "sceneId": 1,
    "text": "màu” bóng đá châu",
    "startMs": 2610,
    "endMs": 3510,
    "words": [
      {
        "word": "màu”",
        "startMs": 2610,
        "endMs": 2810,
        "isKeyword": true
      },
      {
        "word": "bóng",
        "startMs": 2810,
        "endMs": 3060,
        "isKeyword": true
      },
      {
        "word": "đá",
        "startMs": 3060,
        "endMs": 3260,
        "isKeyword": true
      },
      {
        "word": "châu",
        "startMs": 3260,
        "endMs": 3510,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 4,
    "sceneId": 1,
    "text": "Á mà đến giờ",
    "startMs": 3510,
    "endMs": 4030,
    "words": [
      {
        "word": "Á",
        "startMs": 3510,
        "endMs": 3660,
        "isKeyword": false
      },
      {
        "word": "mà",
        "startMs": 3660,
        "endMs": 3720,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 3720,
        "endMs": 3890,
        "isKeyword": false
      },
      {
        "word": "giờ",
        "startMs": 3890,
        "endMs": 4030,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 5,
    "sceneId": 1,
    "text": "vẫn khiến người ta",
    "startMs": 4030,
    "endMs": 4660,
    "words": [
      {
        "word": "vẫn",
        "startMs": 4030,
        "endMs": 4170,
        "isKeyword": false
      },
      {
        "word": "khiến",
        "startMs": 4170,
        "endMs": 4360,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 4360,
        "endMs": 4590,
        "isKeyword": false
      },
      {
        "word": "ta",
        "startMs": 4590,
        "endMs": 4660,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 6,
    "sceneId": 1,
    "text": "phải cười ra nước",
    "startMs": 4660,
    "endMs": 5500,
    "words": [
      {
        "word": "phải",
        "startMs": 4660,
        "endMs": 4830,
        "isKeyword": false
      },
      {
        "word": "cười",
        "startMs": 4830,
        "endMs": 5080,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 5080,
        "endMs": 5170,
        "isKeyword": false
      },
      {
        "word": "nước",
        "startMs": 5170,
        "endMs": 5500,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 7,
    "sceneId": 1,
    "text": "mắt. Mời quý vị",
    "startMs": 5500,
    "endMs": 6210,
    "words": [
      {
        "word": "mắt.",
        "startMs": 5500,
        "endMs": 5760,
        "isKeyword": false
      },
      {
        "word": "Mời",
        "startMs": 5760,
        "endMs": 5930,
        "isKeyword": false
      },
      {
        "word": "quý",
        "startMs": 5930,
        "endMs": 6090,
        "isKeyword": false
      },
      {
        "word": "vị",
        "startMs": 6090,
        "endMs": 6210,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 8,
    "sceneId": 1,
    "text": "cùng tôi ôn lại",
    "startMs": 6210,
    "endMs": 6810,
    "words": [
      {
        "word": "cùng",
        "startMs": 6210,
        "endMs": 6390,
        "isKeyword": false
      },
      {
        "word": "tôi",
        "startMs": 6390,
        "endMs": 6530,
        "isKeyword": false
      },
      {
        "word": "ôn",
        "startMs": 6530,
        "endMs": 6630,
        "isKeyword": false
      },
      {
        "word": "lại",
        "startMs": 6630,
        "endMs": 6810,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 9,
    "sceneId": 1,
    "text": "hành trình “công bằng",
    "startMs": 6810,
    "endMs": 7580,
    "words": [
      {
        "word": "hành",
        "startMs": 6810,
        "endMs": 6980,
        "isKeyword": false
      },
      {
        "word": "trình",
        "startMs": 6980,
        "endMs": 7190,
        "isKeyword": false
      },
      {
        "word": "“công",
        "startMs": 7190,
        "endMs": 7370,
        "isKeyword": true
      },
      {
        "word": "bằng",
        "startMs": 7370,
        "endMs": 7580,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 10,
    "sceneId": 1,
    "text": "tuyệt đối” của đội",
    "startMs": 7580,
    "endMs": 8420,
    "words": [
      {
        "word": "tuyệt",
        "startMs": 7580,
        "endMs": 7860,
        "isKeyword": true
      },
      {
        "word": "đối”",
        "startMs": 7860,
        "endMs": 8030,
        "isKeyword": true
      },
      {
        "word": "của",
        "startMs": 8030,
        "endMs": 8210,
        "isKeyword": false
      },
      {
        "word": "đội",
        "startMs": 8210,
        "endMs": 8420,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 11,
    "sceneId": 1,
    "text": "chủ nhà năm ấy nhé.",
    "startMs": 8420,
    "endMs": 9340,
    "words": [
      {
        "word": "chủ",
        "startMs": 8420,
        "endMs": 8590,
        "isKeyword": true
      },
      {
        "word": "nhà",
        "startMs": 8590,
        "endMs": 8730,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 8730,
        "endMs": 8870,
        "isKeyword": false
      },
      {
        "word": "ấy",
        "startMs": 8870,
        "endMs": 9010,
        "isKeyword": false
      },
      {
        "word": "nhé.",
        "startMs": 9010,
        "endMs": 9340,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 12,
    "sceneId": 2,
    "text": "Trước hết, xin chúc",
    "startMs": 9340,
    "endMs": 10300,
    "words": [
      {
        "word": "Trước",
        "startMs": 9340,
        "endMs": 9570,
        "isKeyword": false
      },
      {
        "word": "hết,",
        "startMs": 9570,
        "endMs": 9890,
        "isKeyword": false
      },
      {
        "word": "xin",
        "startMs": 9890,
        "endMs": 10160,
        "isKeyword": false
      },
      {
        "word": "chúc",
        "startMs": 10160,
        "endMs": 10300,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 13,
    "sceneId": 2,
    "text": "mừng Hàn Quốc đã",
    "startMs": 10300,
    "endMs": 11230,
    "words": [
      {
        "word": "mừng",
        "startMs": 10300,
        "endMs": 10570,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 10570,
        "endMs": 10740,
        "isKeyword": true
      },
      {
        "word": "Quốc",
        "startMs": 10740,
        "endMs": 11220,
        "isKeyword": true
      },
      {
        "word": "đã",
        "startMs": 11220,
        "endMs": 11230,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 14,
    "sceneId": 2,
    "text": "biến World Cup thành…",
    "startMs": 11230,
    "endMs": 12480,
    "words": [
      {
        "word": "biến",
        "startMs": 11230,
        "endMs": 11490,
        "isKeyword": false
      },
      {
        "word": "World",
        "startMs": 11490,
        "endMs": 11750,
        "isKeyword": true
      },
      {
        "word": "Cup",
        "startMs": 11750,
        "endMs": 11940,
        "isKeyword": true
      },
      {
        "word": "thành…",
        "startMs": 11940,
        "endMs": 12480,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 15,
    "sceneId": 2,
    "text": "World Cup dành riêng",
    "startMs": 12480,
    "endMs": 13600,
    "words": [
      {
        "word": "World",
        "startMs": 12480,
        "endMs": 12740,
        "isKeyword": true
      },
      {
        "word": "Cup",
        "startMs": 12740,
        "endMs": 13050,
        "isKeyword": true
      },
      {
        "word": "dành",
        "startMs": 13050,
        "endMs": 13270,
        "isKeyword": false
      },
      {
        "word": "riêng",
        "startMs": 13270,
        "endMs": 13600,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 16,
    "sceneId": 2,
    "text": "cho mình. Ý tôi",
    "startMs": 13600,
    "endMs": 14470,
    "words": [
      {
        "word": "cho",
        "startMs": 13600,
        "endMs": 13730,
        "isKeyword": false
      },
      {
        "word": "mình.",
        "startMs": 13730,
        "endMs": 14160,
        "isKeyword": false
      },
      {
        "word": "Ý",
        "startMs": 14160,
        "endMs": 14410,
        "isKeyword": true
      },
      {
        "word": "tôi",
        "startMs": 14410,
        "endMs": 14470,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 17,
    "sceneId": 2,
    "text": "là, FIFA lúc đó",
    "startMs": 14470,
    "endMs": 15460,
    "words": [
      {
        "word": "là,",
        "startMs": 14470,
        "endMs": 14730,
        "isKeyword": false
      },
      {
        "word": "FIFA",
        "startMs": 14730,
        "endMs": 14920,
        "isKeyword": true
      },
      {
        "word": "lúc",
        "startMs": 14920,
        "endMs": 15130,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 15130,
        "endMs": 15460,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 18,
    "sceneId": 2,
    "text": "chắc nghĩ: “Ủa, đã",
    "startMs": 15460,
    "endMs": 16520,
    "words": [
      {
        "word": "chắc",
        "startMs": 15460,
        "endMs": 15670,
        "isKeyword": false
      },
      {
        "word": "nghĩ:",
        "startMs": 15670,
        "endMs": 16040,
        "isKeyword": false
      },
      {
        "word": "“Ủa,",
        "startMs": 16040,
        "endMs": 16350,
        "isKeyword": false
      },
      {
        "word": "đã",
        "startMs": 16350,
        "endMs": 16520,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 19,
    "sceneId": 2,
    "text": "cho họ làm chủ",
    "startMs": 16520,
    "endMs": 17420,
    "words": [
      {
        "word": "cho",
        "startMs": 16520,
        "endMs": 16880,
        "isKeyword": false
      },
      {
        "word": "họ",
        "startMs": 16880,
        "endMs": 16890,
        "isKeyword": false
      },
      {
        "word": "làm",
        "startMs": 16890,
        "endMs": 17100,
        "isKeyword": false
      },
      {
        "word": "chủ",
        "startMs": 17100,
        "endMs": 17420,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 20,
    "sceneId": 2,
    "text": "nhà rồi thì phải",
    "startMs": 17420,
    "endMs": 18370,
    "words": [
      {
        "word": "nhà",
        "startMs": 17420,
        "endMs": 17580,
        "isKeyword": true
      },
      {
        "word": "rồi",
        "startMs": 17580,
        "endMs": 17850,
        "isKeyword": false
      },
      {
        "word": "thì",
        "startMs": 17850,
        "endMs": 18070,
        "isKeyword": false
      },
      {
        "word": "phải",
        "startMs": 18070,
        "endMs": 18370,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 21,
    "sceneId": 2,
    "text": "cho họ đá bán",
    "startMs": 18370,
    "endMs": 19190,
    "words": [
      {
        "word": "cho",
        "startMs": 18370,
        "endMs": 18530,
        "isKeyword": false
      },
      {
        "word": "họ",
        "startMs": 18530,
        "endMs": 18780,
        "isKeyword": false
      },
      {
        "word": "đá",
        "startMs": 18780,
        "endMs": 18950,
        "isKeyword": true
      },
      {
        "word": "bán",
        "startMs": 18950,
        "endMs": 19190,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 22,
    "sceneId": 2,
    "text": "kết chứ, không thì",
    "startMs": 19190,
    "endMs": 20710,
    "words": [
      {
        "word": "kết",
        "startMs": 19190,
        "endMs": 19420,
        "isKeyword": true
      },
      {
        "word": "chứ,",
        "startMs": 19420,
        "endMs": 20240,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 20240,
        "endMs": 20520,
        "isKeyword": false
      },
      {
        "word": "thì",
        "startMs": 20520,
        "endMs": 20710,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 23,
    "sceneId": 2,
    "text": "dân Hàn buồn lắm,",
    "startMs": 20710,
    "endMs": 21650,
    "words": [
      {
        "word": "dân",
        "startMs": 20710,
        "endMs": 20890,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 20890,
        "endMs": 21070,
        "isKeyword": true
      },
      {
        "word": "buồn",
        "startMs": 21070,
        "endMs": 21350,
        "isKeyword": false
      },
      {
        "word": "lắm,",
        "startMs": 21350,
        "endMs": 21650,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 24,
    "sceneId": 2,
    "text": "bán vé không chạy đâu.”",
    "startMs": 21650,
    "endMs": 23030,
    "words": [
      {
        "word": "bán",
        "startMs": 21650,
        "endMs": 21850,
        "isKeyword": true
      },
      {
        "word": "vé",
        "startMs": 21850,
        "endMs": 22030,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 22030,
        "endMs": 22380,
        "isKeyword": false
      },
      {
        "word": "chạy",
        "startMs": 22380,
        "endMs": 22580,
        "isKeyword": false
      },
      {
        "word": "đâu.”",
        "startMs": 22580,
        "endMs": 23030,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 25,
    "sceneId": 3,
    "text": "Trận với Ý. Ý",
    "startMs": 23030,
    "endMs": 24260,
    "words": [
      {
        "word": "Trận",
        "startMs": 23030,
        "endMs": 23440,
        "isKeyword": false
      },
      {
        "word": "với",
        "startMs": 23440,
        "endMs": 23780,
        "isKeyword": false
      },
      {
        "word": "Ý.",
        "startMs": 23780,
        "endMs": 24040,
        "isKeyword": true
      },
      {
        "word": "Ý",
        "startMs": 24040,
        "endMs": 24260,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 26,
    "sceneId": 3,
    "text": "đá hay, Hàn đá…",
    "startMs": 24260,
    "endMs": 25430,
    "words": [
      {
        "word": "đá",
        "startMs": 24260,
        "endMs": 24440,
        "isKeyword": true
      },
      {
        "word": "hay,",
        "startMs": 24440,
        "endMs": 24770,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 24770,
        "endMs": 25070,
        "isKeyword": true
      },
      {
        "word": "đá…",
        "startMs": 25070,
        "endMs": 25430,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 27,
    "sceneId": 3,
    "text": "được trọng tài. Totti",
    "startMs": 25430,
    "endMs": 27240,
    "words": [
      {
        "word": "được",
        "startMs": 25430,
        "endMs": 25980,
        "isKeyword": false
      },
      {
        "word": "trọng",
        "startMs": 26380,
        "endMs": 26920,
        "isKeyword": true
      },
      {
        "word": "tài.",
        "startMs": 26920,
        "endMs": 27220,
        "isKeyword": true
      },
      {
        "word": "Totti",
        "startMs": 27220,
        "endMs": 27240,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 28,
    "sceneId": 3,
    "text": "vừa chạm bóng đã",
    "startMs": 27240,
    "endMs": 28070,
    "words": [
      {
        "word": "vừa",
        "startMs": 27240,
        "endMs": 27440,
        "isKeyword": false
      },
      {
        "word": "chạm",
        "startMs": 27440,
        "endMs": 27700,
        "isKeyword": false
      },
      {
        "word": "bóng",
        "startMs": 27700,
        "endMs": 27900,
        "isKeyword": true
      },
      {
        "word": "đã",
        "startMs": 27900,
        "endMs": 28070,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 29,
    "sceneId": 3,
    "text": "bị thẻ đỏ vì",
    "startMs": 28070,
    "endMs": 28810,
    "words": [
      {
        "word": "bị",
        "startMs": 28070,
        "endMs": 28240,
        "isKeyword": false
      },
      {
        "word": "thẻ",
        "startMs": 28240,
        "endMs": 28460,
        "isKeyword": true
      },
      {
        "word": "đỏ",
        "startMs": 28460,
        "endMs": 28680,
        "isKeyword": true
      },
      {
        "word": "vì",
        "startMs": 28680,
        "endMs": 28810,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 30,
    "sceneId": 3,
    "text": "“giả vờ ngã”, trong",
    "startMs": 28810,
    "endMs": 29920,
    "words": [
      {
        "word": "“giả",
        "startMs": 28810,
        "endMs": 29030,
        "isKeyword": false
      },
      {
        "word": "vờ",
        "startMs": 29030,
        "endMs": 29240,
        "isKeyword": false
      },
      {
        "word": "ngã”,",
        "startMs": 29240,
        "endMs": 29650,
        "isKeyword": false
      },
      {
        "word": "trong",
        "startMs": 29650,
        "endMs": 29920,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 31,
    "sceneId": 3,
    "text": "khi cầu thủ Hàn",
    "startMs": 29920,
    "endMs": 30590,
    "words": [
      {
        "word": "khi",
        "startMs": 29920,
        "endMs": 30000,
        "isKeyword": false
      },
      {
        "word": "cầu",
        "startMs": 30000,
        "endMs": 30270,
        "isKeyword": false
      },
      {
        "word": "thủ",
        "startMs": 30270,
        "endMs": 30420,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 30420,
        "endMs": 30590,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 32,
    "sceneId": 3,
    "text": "Quốc ngã như đang",
    "startMs": 30590,
    "endMs": 31400,
    "words": [
      {
        "word": "Quốc",
        "startMs": 30590,
        "endMs": 30930,
        "isKeyword": true
      },
      {
        "word": "ngã",
        "startMs": 30930,
        "endMs": 31090,
        "isKeyword": false
      },
      {
        "word": "như",
        "startMs": 31090,
        "endMs": 31180,
        "isKeyword": false
      },
      {
        "word": "đang",
        "startMs": 31180,
        "endMs": 31400,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 33,
    "sceneId": 3,
    "text": "đóng phim hành động",
    "startMs": 31400,
    "endMs": 32350,
    "words": [
      {
        "word": "đóng",
        "startMs": 31400,
        "endMs": 31650,
        "isKeyword": false
      },
      {
        "word": "phim",
        "startMs": 31650,
        "endMs": 31840,
        "isKeyword": false
      },
      {
        "word": "hành",
        "startMs": 31840,
        "endMs": 32020,
        "isKeyword": false
      },
      {
        "word": "động",
        "startMs": 32020,
        "endMs": 32350,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 34,
    "sceneId": 3,
    "text": "Hollywood thì trọng tài",
    "startMs": 32350,
    "endMs": 33430,
    "words": [
      {
        "word": "Hollywood",
        "startMs": 32350,
        "endMs": 32840,
        "isKeyword": true
      },
      {
        "word": "thì",
        "startMs": 32840,
        "endMs": 33100,
        "isKeyword": false
      },
      {
        "word": "trọng",
        "startMs": 33100,
        "endMs": 33290,
        "isKeyword": true
      },
      {
        "word": "tài",
        "startMs": 33290,
        "endMs": 33430,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 35,
    "sceneId": 3,
    "text": "quay đi uống nước.",
    "startMs": 33430,
    "endMs": 34500,
    "words": [
      {
        "word": "quay",
        "startMs": 33430,
        "endMs": 33610,
        "isKeyword": false
      },
      {
        "word": "đi",
        "startMs": 33610,
        "endMs": 33750,
        "isKeyword": false
      },
      {
        "word": "uống",
        "startMs": 33750,
        "endMs": 33970,
        "isKeyword": false
      },
      {
        "word": "nước.",
        "startMs": 33970,
        "endMs": 34500,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 36,
    "sceneId": 4,
    "text": "Rồi đến phút vàng,",
    "startMs": 34500,
    "endMs": 35570,
    "words": [
      {
        "word": "Rồi",
        "startMs": 34500,
        "endMs": 34810,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 34810,
        "endMs": 35020,
        "isKeyword": false
      },
      {
        "word": "phút",
        "startMs": 35020,
        "endMs": 35250,
        "isKeyword": false
      },
      {
        "word": "vàng,",
        "startMs": 35250,
        "endMs": 35570,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 37,
    "sceneId": 4,
    "text": "Ahn Jung-hwan đánh đầu",
    "startMs": 35900,
    "endMs": 36840,
    "words": [
      {
        "word": "Ahn",
        "startMs": 35900,
        "endMs": 36080,
        "isKeyword": true
      },
      {
        "word": "Jung-hwan",
        "startMs": 36080,
        "endMs": 36270,
        "isKeyword": true
      },
      {
        "word": "đánh",
        "startMs": 36270,
        "endMs": 36550,
        "isKeyword": false
      },
      {
        "word": "đầu",
        "startMs": 36550,
        "endMs": 36840,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 38,
    "sceneId": 4,
    "text": "ghi bàn… ừ thì",
    "startMs": 36840,
    "endMs": 37600,
    "words": [
      {
        "word": "ghi",
        "startMs": 36840,
        "endMs": 36970,
        "isKeyword": false
      },
      {
        "word": "bàn…",
        "startMs": 36970,
        "endMs": 37320,
        "isKeyword": false
      },
      {
        "word": "ừ",
        "startMs": 37320,
        "endMs": 37490,
        "isKeyword": false
      },
      {
        "word": "thì",
        "startMs": 37490,
        "endMs": 37600,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 39,
    "sceneId": 4,
    "text": "đẹp, nhưng cái đường",
    "startMs": 37600,
    "endMs": 38610,
    "words": [
      {
        "word": "đẹp,",
        "startMs": 37600,
        "endMs": 37880,
        "isKeyword": false
      },
      {
        "word": "nhưng",
        "startMs": 37880,
        "endMs": 38100,
        "isKeyword": false
      },
      {
        "word": "cái",
        "startMs": 38100,
        "endMs": 38330,
        "isKeyword": false
      },
      {
        "word": "đường",
        "startMs": 38330,
        "endMs": 38610,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 40,
    "sceneId": 4,
    "text": "chuyền trước đó thì",
    "startMs": 38610,
    "endMs": 39440,
    "words": [
      {
        "word": "chuyền",
        "startMs": 38610,
        "endMs": 38900,
        "isKeyword": false
      },
      {
        "word": "trước",
        "startMs": 38900,
        "endMs": 39110,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 39110,
        "endMs": 39260,
        "isKeyword": false
      },
      {
        "word": "thì",
        "startMs": 39260,
        "endMs": 39440,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 41,
    "sceneId": 4,
    "text": "“hơi hơi” việt vị",
    "startMs": 39440,
    "endMs": 40100,
    "words": [
      {
        "word": "“hơi",
        "startMs": 39440,
        "endMs": 39550,
        "isKeyword": false
      },
      {
        "word": "hơi”",
        "startMs": 39550,
        "endMs": 39690,
        "isKeyword": false
      },
      {
        "word": "việt",
        "startMs": 39690,
        "endMs": 39890,
        "isKeyword": true
      },
      {
        "word": "vị",
        "startMs": 39890,
        "endMs": 40100,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 42,
    "sceneId": 4,
    "text": "một tí. Nhưng không",
    "startMs": 40100,
    "endMs": 41280,
    "words": [
      {
        "word": "một",
        "startMs": 40100,
        "endMs": 40250,
        "isKeyword": false
      },
      {
        "word": "tí.",
        "startMs": 40250,
        "endMs": 40680,
        "isKeyword": false
      },
      {
        "word": "Nhưng",
        "startMs": 40680,
        "endMs": 40980,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 40980,
        "endMs": 41280,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 43,
    "sceneId": 4,
    "text": "sao, trọng tài mắt",
    "startMs": 41280,
    "endMs": 42230,
    "words": [
      {
        "word": "sao,",
        "startMs": 41280,
        "endMs": 41520,
        "isKeyword": false
      },
      {
        "word": "trọng",
        "startMs": 41520,
        "endMs": 41870,
        "isKeyword": true
      },
      {
        "word": "tài",
        "startMs": 41870,
        "endMs": 41980,
        "isKeyword": true
      },
      {
        "word": "mắt",
        "startMs": 41980,
        "endMs": 42230,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 44,
    "sceneId": 4,
    "text": "tinh lắm, ông ấy",
    "startMs": 42230,
    "endMs": 43180,
    "words": [
      {
        "word": "tinh",
        "startMs": 42230,
        "endMs": 42430,
        "isKeyword": false
      },
      {
        "word": "lắm,",
        "startMs": 42430,
        "endMs": 42930,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 42930,
        "endMs": 42980,
        "isKeyword": false
      },
      {
        "word": "ấy",
        "startMs": 42980,
        "endMs": 43180,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 45,
    "sceneId": 4,
    "text": "nhìn rõ là… không",
    "startMs": 43180,
    "endMs": 44320,
    "words": [
      {
        "word": "nhìn",
        "startMs": 43180,
        "endMs": 43460,
        "isKeyword": false
      },
      {
        "word": "rõ",
        "startMs": 43460,
        "endMs": 43580,
        "isKeyword": false
      },
      {
        "word": "là…",
        "startMs": 43580,
        "endMs": 44230,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 44230,
        "endMs": 44320,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 46,
    "sceneId": 4,
    "text": "việt vị. Kết quả:",
    "startMs": 44320,
    "endMs": 45700,
    "words": [
      {
        "word": "việt",
        "startMs": 44320,
        "endMs": 44640,
        "isKeyword": true
      },
      {
        "word": "vị.",
        "startMs": 44640,
        "endMs": 45080,
        "isKeyword": true
      },
      {
        "word": "Kết",
        "startMs": 45080,
        "endMs": 45340,
        "isKeyword": true
      },
      {
        "word": "quả:",
        "startMs": 45340,
        "endMs": 45700,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 47,
    "sceneId": 4,
    "text": "Ý về nước sớm,",
    "startMs": 45700,
    "endMs": 46750,
    "words": [
      {
        "word": "Ý",
        "startMs": 45700,
        "endMs": 45800,
        "isKeyword": true
      },
      {
        "word": "về",
        "startMs": 45800,
        "endMs": 46100,
        "isKeyword": false
      },
      {
        "word": "nước",
        "startMs": 46100,
        "endMs": 46390,
        "isKeyword": false
      },
      {
        "word": "sớm,",
        "startMs": 46390,
        "endMs": 46750,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 48,
    "sceneId": 4,
    "text": "Totti ôm mặt khóc,",
    "startMs": 47030,
    "endMs": 48370,
    "words": [
      {
        "word": "Totti",
        "startMs": 47030,
        "endMs": 47210,
        "isKeyword": true
      },
      {
        "word": "ôm",
        "startMs": 47210,
        "endMs": 47470,
        "isKeyword": false
      },
      {
        "word": "mặt",
        "startMs": 47470,
        "endMs": 47780,
        "isKeyword": false
      },
      {
        "word": "khóc,",
        "startMs": 47780,
        "endMs": 48370,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 49,
    "sceneId": 4,
    "text": "còn Hàn Quốc thì",
    "startMs": 48370,
    "endMs": 49040,
    "words": [
      {
        "word": "còn",
        "startMs": 48370,
        "endMs": 48390,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 48390,
        "endMs": 48570,
        "isKeyword": true
      },
      {
        "word": "Quốc",
        "startMs": 48570,
        "endMs": 48940,
        "isKeyword": true
      },
      {
        "word": "thì",
        "startMs": 48940,
        "endMs": 49040,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 50,
    "sceneId": 4,
    "text": "ôm cúp… à không,",
    "startMs": 49040,
    "endMs": 50120,
    "words": [
      {
        "word": "ôm",
        "startMs": 49040,
        "endMs": 49230,
        "isKeyword": false
      },
      {
        "word": "cúp…",
        "startMs": 49230,
        "endMs": 49600,
        "isKeyword": false
      },
      {
        "word": "à",
        "startMs": 49600,
        "endMs": 49700,
        "isKeyword": false
      },
      {
        "word": "không,",
        "startMs": 49700,
        "endMs": 50120,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 51,
    "sceneId": 4,
    "text": "ôm chiếc vé",
    "startMs": 50120,
    "endMs": 50800,
    "words": [
      {
        "word": "ôm",
        "startMs": 50120,
        "endMs": 50400,
        "isKeyword": false
      },
      {
        "word": "chiếc",
        "startMs": 50400,
        "endMs": 50600,
        "isKeyword": false
      },
      {
        "word": "vé",
        "startMs": 50600,
        "endMs": 50800,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 52,
    "sceneId": 4,
    "text": "vào tứ kết.",
    "startMs": 50800,
    "endMs": 51720,
    "words": [
      {
        "word": "vào",
        "startMs": 50800,
        "endMs": 51000,
        "isKeyword": false
      },
      {
        "word": "tứ",
        "startMs": 51000,
        "endMs": 51200,
        "isKeyword": true
      },
      {
        "word": "kết.",
        "startMs": 51200,
        "endMs": 51720,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 53,
    "sceneId": 5,
    "text": "Sang đến Tây Ban",
    "startMs": 51720,
    "endMs": 52400,
    "words": [
      {
        "word": "Sang",
        "startMs": 51720,
        "endMs": 51750,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 51750,
        "endMs": 52050,
        "isKeyword": false
      },
      {
        "word": "Tây",
        "startMs": 52050,
        "endMs": 52250,
        "isKeyword": true
      },
      {
        "word": "Ban",
        "startMs": 52250,
        "endMs": 52400,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 54,
    "sceneId": 5,
    "text": "Nha. Hai bàn thắng",
    "startMs": 52400,
    "endMs": 54280,
    "words": [
      {
        "word": "Nha.",
        "startMs": 52400,
        "endMs": 52800,
        "isKeyword": true
      },
      {
        "word": "Hai",
        "startMs": 52800,
        "endMs": 53200,
        "isKeyword": false
      },
      {
        "word": "bàn",
        "startMs": 53200,
        "endMs": 53630,
        "isKeyword": false
      },
      {
        "word": "thắng",
        "startMs": 53630,
        "endMs": 54280,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 55,
    "sceneId": 5,
    "text": "của Tây Ban Nha",
    "startMs": 54280,
    "endMs": 55680,
    "words": [
      {
        "word": "của",
        "startMs": 54280,
        "endMs": 54750,
        "isKeyword": false
      },
      {
        "word": "Tây",
        "startMs": 54750,
        "endMs": 55120,
        "isKeyword": true
      },
      {
        "word": "Ban",
        "startMs": 55120,
        "endMs": 55400,
        "isKeyword": true
      },
      {
        "word": "Nha",
        "startMs": 55400,
        "endMs": 55680,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 56,
    "sceneId": 5,
    "text": "bị hủy vì… “việt",
    "startMs": 55680,
    "endMs": 57140,
    "words": [
      {
        "word": "bị",
        "startMs": 55680,
        "endMs": 56040,
        "isKeyword": false
      },
      {
        "word": "hủy",
        "startMs": 56040,
        "endMs": 56340,
        "isKeyword": false
      },
      {
        "word": "vì…",
        "startMs": 56340,
        "endMs": 56970,
        "isKeyword": false
      },
      {
        "word": "“việt",
        "startMs": 56970,
        "endMs": 57140,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 57,
    "sceneId": 5,
    "text": "vị”. Việt vị kiểu",
    "startMs": 57140,
    "endMs": 58080,
    "words": [
      {
        "word": "vị”.",
        "startMs": 57140,
        "endMs": 57410,
        "isKeyword": true
      },
      {
        "word": "Việt",
        "startMs": 57410,
        "endMs": 57660,
        "isKeyword": true
      },
      {
        "word": "vị",
        "startMs": 57660,
        "endMs": 57830,
        "isKeyword": true
      },
      {
        "word": "kiểu",
        "startMs": 57830,
        "endMs": 58080,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 58,
    "sceneId": 5,
    "text": "gì mà camera chậm",
    "startMs": 58080,
    "endMs": 58850,
    "words": [
      {
        "word": "gì",
        "startMs": 58080,
        "endMs": 58210,
        "isKeyword": false
      },
      {
        "word": "mà",
        "startMs": 58210,
        "endMs": 58340,
        "isKeyword": false
      },
      {
        "word": "camera",
        "startMs": 58340,
        "endMs": 58600,
        "isKeyword": false
      },
      {
        "word": "chậm",
        "startMs": 58600,
        "endMs": 58850,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 59,
    "sceneId": 5,
    "text": "lại vẫn không thấy,",
    "startMs": 58850,
    "endMs": 59960,
    "words": [
      {
        "word": "lại",
        "startMs": 58850,
        "endMs": 59070,
        "isKeyword": false
      },
      {
        "word": "vẫn",
        "startMs": 59070,
        "endMs": 59290,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 59290,
        "endMs": 59550,
        "isKeyword": false
      },
      {
        "word": "thấy,",
        "startMs": 59550,
        "endMs": 59960,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 60,
    "sceneId": 5,
    "text": "nhưng trọng tài Ecuador",
    "startMs": 59960,
    "endMs": 61280,
    "words": [
      {
        "word": "nhưng",
        "startMs": 59960,
        "endMs": 60320,
        "isKeyword": false
      },
      {
        "word": "trọng",
        "startMs": 60320,
        "endMs": 60680,
        "isKeyword": true
      },
      {
        "word": "tài",
        "startMs": 60680,
        "endMs": 60870,
        "isKeyword": true
      },
      {
        "word": "Ecuador",
        "startMs": 60870,
        "endMs": 61280,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 61,
    "sceneId": 5,
    "text": "thì thấy rõ",
    "startMs": 61280,
    "endMs": 62010,
    "words": [
      {
        "word": "thì",
        "startMs": 61280,
        "endMs": 61620,
        "isKeyword": false
      },
      {
        "word": "thấy",
        "startMs": 61620,
        "endMs": 61880,
        "isKeyword": false
      },
      {
        "word": "rõ",
        "startMs": 61880,
        "endMs": 62010,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 62,
    "sceneId": 5,
    "text": "như ban ngày.",
    "startMs": 62010,
    "endMs": 62960,
    "words": [
      {
        "word": "như",
        "startMs": 62010,
        "endMs": 62240,
        "isKeyword": false
      },
      {
        "word": "ban",
        "startMs": 62240,
        "endMs": 62420,
        "isKeyword": true
      },
      {
        "word": "ngày.",
        "startMs": 62420,
        "endMs": 62960,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 63,
    "sceneId": 6,
    "text": "Người Tây Ban Nha",
    "startMs": 62960,
    "endMs": 63750,
    "words": [
      {
        "word": "Người",
        "startMs": 62960,
        "endMs": 63330,
        "isKeyword": false
      },
      {
        "word": "Tây",
        "startMs": 63330,
        "endMs": 63490,
        "isKeyword": true
      },
      {
        "word": "Ban",
        "startMs": 63490,
        "endMs": 63630,
        "isKeyword": true
      },
      {
        "word": "Nha",
        "startMs": 63630,
        "endMs": 63750,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 64,
    "sceneId": 6,
    "text": "lúc đó chắc nghĩ",
    "startMs": 63750,
    "endMs": 64590,
    "words": [
      {
        "word": "lúc",
        "startMs": 63750,
        "endMs": 63920,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 63920,
        "endMs": 64100,
        "isKeyword": false
      },
      {
        "word": "chắc",
        "startMs": 64100,
        "endMs": 64370,
        "isKeyword": false
      },
      {
        "word": "nghĩ",
        "startMs": 64370,
        "endMs": 64590,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 65,
    "sceneId": 6,
    "text": "mình đang đá với",
    "startMs": 64590,
    "endMs": 65400,
    "words": [
      {
        "word": "mình",
        "startMs": 64590,
        "endMs": 64810,
        "isKeyword": false
      },
      {
        "word": "đang",
        "startMs": 64810,
        "endMs": 65080,
        "isKeyword": false
      },
      {
        "word": "đá",
        "startMs": 65080,
        "endMs": 65220,
        "isKeyword": true
      },
      {
        "word": "với",
        "startMs": 65220,
        "endMs": 65400,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 66,
    "sceneId": 6,
    "text": "đội bóng 12 người:",
    "startMs": 65400,
    "endMs": 66400,
    "words": [
      {
        "word": "đội",
        "startMs": 65400,
        "endMs": 65610,
        "isKeyword": false
      },
      {
        "word": "bóng",
        "startMs": 65610,
        "endMs": 65780,
        "isKeyword": true
      },
      {
        "word": "12",
        "startMs": 65780,
        "endMs": 66000,
        "isKeyword": true
      },
      {
        "word": "người:",
        "startMs": 66000,
        "endMs": 66400,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 67,
    "sceneId": 6,
    "text": "11 cầu thủ Hàn +",
    "startMs": 66400,
    "endMs": 67550,
    "words": [
      {
        "word": "11",
        "startMs": 66400,
        "endMs": 66690,
        "isKeyword": true
      },
      {
        "word": "cầu",
        "startMs": 66690,
        "endMs": 66930,
        "isKeyword": false
      },
      {
        "word": "thủ",
        "startMs": 66930,
        "endMs": 67150,
        "isKeyword": false
      },
      {
        "word": "Hàn +",
        "startMs": 67150,
        "endMs": 67550,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 68,
    "sceneId": 6,
    "text": "1 trọng tài.",
    "startMs": 67550,
    "endMs": 68310,
    "words": [
      {
        "word": "1",
        "startMs": 67550,
        "endMs": 67790,
        "isKeyword": false
      },
      {
        "word": "trọng",
        "startMs": 67790,
        "endMs": 68060,
        "isKeyword": true
      },
      {
        "word": "tài.",
        "startMs": 68060,
        "endMs": 68310,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 69,
    "sceneId": 7,
    "text": "Phạt đền, Hàn Quốc",
    "startMs": 68310,
    "endMs": 69370,
    "words": [
      {
        "word": "Phạt",
        "startMs": 68310,
        "endMs": 68530,
        "isKeyword": true
      },
      {
        "word": "đền,",
        "startMs": 68530,
        "endMs": 68900,
        "isKeyword": true
      },
      {
        "word": "Hàn",
        "startMs": 68900,
        "endMs": 69170,
        "isKeyword": true
      },
      {
        "word": "Quốc",
        "startMs": 69170,
        "endMs": 69370,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 70,
    "sceneId": 7,
    "text": "thắng, Tây Ban Nha",
    "startMs": 69370,
    "endMs": 70470,
    "words": [
      {
        "word": "thắng,",
        "startMs": 69370,
        "endMs": 69960,
        "isKeyword": false
      },
      {
        "word": "Tây",
        "startMs": 69960,
        "endMs": 70160,
        "isKeyword": true
      },
      {
        "word": "Ban",
        "startMs": 70160,
        "endMs": 70320,
        "isKeyword": true
      },
      {
        "word": "Nha",
        "startMs": 70320,
        "endMs": 70470,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 71,
    "sceneId": 7,
    "text": "về nước với tâm",
    "startMs": 70470,
    "endMs": 71510,
    "words": [
      {
        "word": "về",
        "startMs": 70470,
        "endMs": 70680,
        "isKeyword": false
      },
      {
        "word": "nước",
        "startMs": 70680,
        "endMs": 71200,
        "isKeyword": false
      },
      {
        "word": "với",
        "startMs": 71200,
        "endMs": 71310,
        "isKeyword": false
      },
      {
        "word": "tâm",
        "startMs": 71310,
        "endMs": 71510,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 72,
    "sceneId": 7,
    "text": "trạng “lần sau tôi",
    "startMs": 71510,
    "endMs": 72550,
    "words": [
      {
        "word": "trạng",
        "startMs": 71510,
        "endMs": 71860,
        "isKeyword": false
      },
      {
        "word": "“lần",
        "startMs": 71860,
        "endMs": 72120,
        "isKeyword": false
      },
      {
        "word": "sau",
        "startMs": 72120,
        "endMs": 72360,
        "isKeyword": false
      },
      {
        "word": "tôi",
        "startMs": 72360,
        "endMs": 72550,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 73,
    "sceneId": 7,
    "text": "không đá World Cup",
    "startMs": 72550,
    "endMs": 73520,
    "words": [
      {
        "word": "không",
        "startMs": 72550,
        "endMs": 72810,
        "isKeyword": false
      },
      {
        "word": "đá",
        "startMs": 72810,
        "endMs": 72990,
        "isKeyword": true
      },
      {
        "word": "World",
        "startMs": 72990,
        "endMs": 73200,
        "isKeyword": true
      },
      {
        "word": "Cup",
        "startMs": 73200,
        "endMs": 73520,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 74,
    "sceneId": 7,
    "text": "ở châu Á nữa”.",
    "startMs": 73520,
    "endMs": 74150,
    "words": [
      {
        "word": "ở",
        "startMs": 73520,
        "endMs": 73540,
        "isKeyword": false
      },
      {
        "word": "châu",
        "startMs": 73540,
        "endMs": 73760,
        "isKeyword": false
      },
      {
        "word": "Á",
        "startMs": 73760,
        "endMs": 73850,
        "isKeyword": false
      },
      {
        "word": "nữa”.",
        "startMs": 73850,
        "endMs": 74150,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 75,
    "sceneId": 8,
    "text": "Rồi bán kết gặp",
    "startMs": 74150,
    "endMs": 75030,
    "words": [
      {
        "word": "Rồi",
        "startMs": 74150,
        "endMs": 74370,
        "isKeyword": false
      },
      {
        "word": "bán",
        "startMs": 74370,
        "endMs": 74600,
        "isKeyword": true
      },
      {
        "word": "kết",
        "startMs": 74600,
        "endMs": 74820,
        "isKeyword": true
      },
      {
        "word": "gặp",
        "startMs": 74820,
        "endMs": 75030,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 76,
    "sceneId": 8,
    "text": "Đức. Lúc này trọng",
    "startMs": 75030,
    "endMs": 76320,
    "words": [
      {
        "word": "Đức.",
        "startMs": 75030,
        "endMs": 75600,
        "isKeyword": true
      },
      {
        "word": "Lúc",
        "startMs": 75600,
        "endMs": 75830,
        "isKeyword": false
      },
      {
        "word": "này",
        "startMs": 75830,
        "endMs": 76010,
        "isKeyword": false
      },
      {
        "word": "trọng",
        "startMs": 76010,
        "endMs": 76320,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 77,
    "sceneId": 8,
    "text": "tài chắc nghĩ “thôi,",
    "startMs": 76320,
    "endMs": 77590,
    "words": [
      {
        "word": "tài",
        "startMs": 76320,
        "endMs": 76510,
        "isKeyword": true
      },
      {
        "word": "chắc",
        "startMs": 76510,
        "endMs": 76790,
        "isKeyword": false
      },
      {
        "word": "nghĩ",
        "startMs": 76790,
        "endMs": 77050,
        "isKeyword": false
      },
      {
        "word": "“thôi,",
        "startMs": 77050,
        "endMs": 77590,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 78,
    "sceneId": 8,
    "text": "cho chúng nó đá",
    "startMs": 77590,
    "endMs": 78240,
    "words": [
      {
        "word": "cho",
        "startMs": 77590,
        "endMs": 77630,
        "isKeyword": false
      },
      {
        "word": "chúng",
        "startMs": 77630,
        "endMs": 77890,
        "isKeyword": false
      },
      {
        "word": "nó",
        "startMs": 77890,
        "endMs": 78040,
        "isKeyword": false
      },
      {
        "word": "đá",
        "startMs": 78040,
        "endMs": 78240,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 79,
    "sceneId": 8,
    "text": "thật đi, kẻo lộ",
    "startMs": 78240,
    "endMs": 79290,
    "words": [
      {
        "word": "thật",
        "startMs": 78240,
        "endMs": 78690,
        "isKeyword": false
      },
      {
        "word": "đi,",
        "startMs": 78690,
        "endMs": 78870,
        "isKeyword": false
      },
      {
        "word": "kẻo",
        "startMs": 78870,
        "endMs": 79080,
        "isKeyword": false
      },
      {
        "word": "lộ",
        "startMs": 79080,
        "endMs": 79290,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 80,
    "sceneId": 8,
    "text": "quá”. Kết quả thua 0-1.",
    "startMs": 79290,
    "endMs": 81270,
    "words": [
      {
        "word": "quá”.",
        "startMs": 79290,
        "endMs": 79800,
        "isKeyword": false
      },
      {
        "word": "Kết",
        "startMs": 79800,
        "endMs": 80060,
        "isKeyword": true
      },
      {
        "word": "quả",
        "startMs": 80060,
        "endMs": 80270,
        "isKeyword": false
      },
      {
        "word": "thua",
        "startMs": 80600,
        "endMs": 80890,
        "isKeyword": false
      },
      {
        "word": "0-1.",
        "startMs": 80890,
        "endMs": 81270,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 81,
    "sceneId": 9,
    "text": "Nhưng không sao, Hàn",
    "startMs": 81270,
    "endMs": 82390,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 81270,
        "endMs": 81550,
        "isKeyword": false
      },
      {
        "word": "không",
        "startMs": 81550,
        "endMs": 81840,
        "isKeyword": false
      },
      {
        "word": "sao,",
        "startMs": 81840,
        "endMs": 82120,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 82120,
        "endMs": 82390,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 82,
    "sceneId": 9,
    "text": "Quốc vẫn về hạng",
    "startMs": 82390,
    "endMs": 83220,
    "words": [
      {
        "word": "Quốc",
        "startMs": 82390,
        "endMs": 82570,
        "isKeyword": true
      },
      {
        "word": "vẫn",
        "startMs": 82570,
        "endMs": 82790,
        "isKeyword": false
      },
      {
        "word": "về",
        "startMs": 82790,
        "endMs": 82980,
        "isKeyword": false
      },
      {
        "word": "hạng",
        "startMs": 82980,
        "endMs": 83220,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 83,
    "sceneId": 9,
    "text": "tư, cả nước ăn",
    "startMs": 83220,
    "endMs": 84150,
    "words": [
      {
        "word": "tư,",
        "startMs": 83220,
        "endMs": 83620,
        "isKeyword": true
      },
      {
        "word": "cả",
        "startMs": 83620,
        "endMs": 83790,
        "isKeyword": false
      },
      {
        "word": "nước",
        "startMs": 83790,
        "endMs": 83960,
        "isKeyword": false
      },
      {
        "word": "ăn",
        "startMs": 83960,
        "endMs": 84150,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 84,
    "sceneId": 9,
    "text": "mừng như vừa vô",
    "startMs": 84150,
    "endMs": 84960,
    "words": [
      {
        "word": "mừng",
        "startMs": 84150,
        "endMs": 84390,
        "isKeyword": false
      },
      {
        "word": "như",
        "startMs": 84390,
        "endMs": 84630,
        "isKeyword": false
      },
      {
        "word": "vừa",
        "startMs": 84630,
        "endMs": 84820,
        "isKeyword": false
      },
      {
        "word": "vô",
        "startMs": 84820,
        "endMs": 84960,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 85,
    "sceneId": 9,
    "text": "địch vũ trụ.",
    "startMs": 84960,
    "endMs": 86080,
    "words": [
      {
        "word": "địch",
        "startMs": 84960,
        "endMs": 85290,
        "isKeyword": false
      },
      {
        "word": "vũ",
        "startMs": 85290,
        "endMs": 85430,
        "isKeyword": true
      },
      {
        "word": "trụ.",
        "startMs": 85430,
        "endMs": 86080,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 86,
    "sceneId": 10,
    "text": "Mỉa mai nhất là",
    "startMs": 86080,
    "endMs": 86810,
    "words": [
      {
        "word": "Mỉa",
        "startMs": 86080,
        "endMs": 86310,
        "isKeyword": false
      },
      {
        "word": "mai",
        "startMs": 86310,
        "endMs": 86400,
        "isKeyword": false
      },
      {
        "word": "nhất",
        "startMs": 86400,
        "endMs": 86670,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 86670,
        "endMs": 86810,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 87,
    "sceneId": 10,
    "text": "sau giải, FIFA vẫn",
    "startMs": 86810,
    "endMs": 87700,
    "words": [
      {
        "word": "sau",
        "startMs": 86810,
        "endMs": 86930,
        "isKeyword": false
      },
      {
        "word": "giải,",
        "startMs": 86930,
        "endMs": 87320,
        "isKeyword": false
      },
      {
        "word": "FIFA",
        "startMs": 87320,
        "endMs": 87520,
        "isKeyword": true
      },
      {
        "word": "vẫn",
        "startMs": 87520,
        "endMs": 87700,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 88,
    "sceneId": 10,
    "text": "cười toe toét bảo",
    "startMs": 87700,
    "endMs": 88610,
    "words": [
      {
        "word": "cười",
        "startMs": 87700,
        "endMs": 88000,
        "isKeyword": false
      },
      {
        "word": "toe",
        "startMs": 88000,
        "endMs": 88170,
        "isKeyword": false
      },
      {
        "word": "toét",
        "startMs": 88170,
        "endMs": 88410,
        "isKeyword": false
      },
      {
        "word": "bảo",
        "startMs": 88410,
        "endMs": 88610,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 89,
    "sceneId": 10,
    "text": "“trọng tài làm rất",
    "startMs": 88610,
    "endMs": 89420,
    "words": [
      {
        "word": "“trọng",
        "startMs": 88610,
        "endMs": 88910,
        "isKeyword": true
      },
      {
        "word": "tài",
        "startMs": 88910,
        "endMs": 89000,
        "isKeyword": true
      },
      {
        "word": "làm",
        "startMs": 89000,
        "endMs": 89170,
        "isKeyword": false
      },
      {
        "word": "rất",
        "startMs": 89170,
        "endMs": 89420,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 90,
    "sceneId": 10,
    "text": "tốt”. Còn người Hàn",
    "startMs": 89420,
    "endMs": 90470,
    "words": [
      {
        "word": "tốt”.",
        "startMs": 89420,
        "endMs": 89800,
        "isKeyword": false
      },
      {
        "word": "Còn",
        "startMs": 89800,
        "endMs": 89930,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 89930,
        "endMs": 90340,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 90340,
        "endMs": 90470,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 91,
    "sceneId": 10,
    "text": "thì nói “đấy, chúng",
    "startMs": 90470,
    "endMs": 91450,
    "words": [
      {
        "word": "thì",
        "startMs": 90470,
        "endMs": 90650,
        "isKeyword": false
      },
      {
        "word": "nói",
        "startMs": 90650,
        "endMs": 90830,
        "isKeyword": false
      },
      {
        "word": "“đấy,",
        "startMs": 90830,
        "endMs": 91190,
        "isKeyword": false
      },
      {
        "word": "chúng",
        "startMs": 91190,
        "endMs": 91450,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 92,
    "sceneId": 10,
    "text": "tôi mạnh thật đấy",
    "startMs": 91450,
    "endMs": 92450,
    "words": [
      {
        "word": "tôi",
        "startMs": 91450,
        "endMs": 91640,
        "isKeyword": false
      },
      {
        "word": "mạnh",
        "startMs": 91640,
        "endMs": 91910,
        "isKeyword": false
      },
      {
        "word": "thật",
        "startMs": 91910,
        "endMs": 92190,
        "isKeyword": false
      },
      {
        "word": "đấy",
        "startMs": 92190,
        "endMs": 92450,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 93,
    "sceneId": 10,
    "text": "chứ”. Ừ, mạnh thật…",
    "startMs": 92450,
    "endMs": 94640,
    "words": [
      {
        "word": "chứ”.",
        "startMs": 92450,
        "endMs": 93040,
        "isKeyword": false
      },
      {
        "word": "Ừ,",
        "startMs": 93040,
        "endMs": 93260,
        "isKeyword": false
      },
      {
        "word": "mạnh",
        "startMs": 93260,
        "endMs": 93920,
        "isKeyword": false
      },
      {
        "word": "thật…",
        "startMs": 93920,
        "endMs": 94640,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 94,
    "sceneId": 10,
    "text": "mạnh nhờ… “sự hỗ",
    "startMs": 94640,
    "endMs": 95710,
    "words": [
      {
        "word": "mạnh",
        "startMs": 94640,
        "endMs": 94970,
        "isKeyword": false
      },
      {
        "word": "nhờ…",
        "startMs": 94970,
        "endMs": 95300,
        "isKeyword": false
      },
      {
        "word": "“sự",
        "startMs": 95300,
        "endMs": 95510,
        "isKeyword": false
      },
      {
        "word": "hỗ",
        "startMs": 95510,
        "endMs": 95710,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 95,
    "sceneId": 10,
    "text": "trợ nhiệt tình từ",
    "startMs": 95710,
    "endMs": 96740,
    "words": [
      {
        "word": "trợ",
        "startMs": 95710,
        "endMs": 95960,
        "isKeyword": false
      },
      {
        "word": "nhiệt",
        "startMs": 95960,
        "endMs": 96270,
        "isKeyword": false
      },
      {
        "word": "tình",
        "startMs": 96270,
        "endMs": 96590,
        "isKeyword": false
      },
      {
        "word": "từ",
        "startMs": 96590,
        "endMs": 96740,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 96,
    "sceneId": 10,
    "text": "phía ban tổ chức”.",
    "startMs": 96740,
    "endMs": 97890,
    "words": [
      {
        "word": "phía",
        "startMs": 96740,
        "endMs": 97000,
        "isKeyword": false
      },
      {
        "word": "ban",
        "startMs": 97000,
        "endMs": 97090,
        "isKeyword": true
      },
      {
        "word": "tổ",
        "startMs": 97090,
        "endMs": 97290,
        "isKeyword": false
      },
      {
        "word": "chức”.",
        "startMs": 97290,
        "endMs": 97890,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 97,
    "sceneId": 11,
    "text": "Thế đấy, World Cup",
    "startMs": 97890,
    "endMs": 99270,
    "words": [
      {
        "word": "Thế",
        "startMs": 97890,
        "endMs": 98000,
        "isKeyword": false
      },
      {
        "word": "đấy,",
        "startMs": 98000,
        "endMs": 98630,
        "isKeyword": false
      },
      {
        "word": "World",
        "startMs": 98630,
        "endMs": 98770,
        "isKeyword": true
      },
      {
        "word": "Cup",
        "startMs": 98770,
        "endMs": 99270,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 98,
    "sceneId": 11,
    "text": "2002 – nơi Hàn Quốc",
    "startMs": 99270,
    "endMs": 101170,
    "words": [
      {
        "word": "2002 –",
        "startMs": 99270,
        "endMs": 100440,
        "isKeyword": true
      },
      {
        "word": "nơi",
        "startMs": 100440,
        "endMs": 100690,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 100690,
        "endMs": 100840,
        "isKeyword": true
      },
      {
        "word": "Quốc",
        "startMs": 100840,
        "endMs": 101170,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 99,
    "sceneId": 11,
    "text": "chứng minh rằng muốn",
    "startMs": 101170,
    "endMs": 102290,
    "words": [
      {
        "word": "chứng",
        "startMs": 101170,
        "endMs": 101490,
        "isKeyword": false
      },
      {
        "word": "minh",
        "startMs": 101490,
        "endMs": 101690,
        "isKeyword": false
      },
      {
        "word": "rằng",
        "startMs": 101690,
        "endMs": 101990,
        "isKeyword": false
      },
      {
        "word": "muốn",
        "startMs": 101990,
        "endMs": 102290,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 100,
    "sceneId": 11,
    "text": "vào bán kết thì",
    "startMs": 102290,
    "endMs": 103190,
    "words": [
      {
        "word": "vào",
        "startMs": 102290,
        "endMs": 102520,
        "isKeyword": false
      },
      {
        "word": "bán",
        "startMs": 102520,
        "endMs": 102790,
        "isKeyword": true
      },
      {
        "word": "kết",
        "startMs": 102790,
        "endMs": 102990,
        "isKeyword": true
      },
      {
        "word": "thì",
        "startMs": 102990,
        "endMs": 103190,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 101,
    "sceneId": 11,
    "text": "không cần đá hay",
    "startMs": 103190,
    "endMs": 104090,
    "words": [
      {
        "word": "không",
        "startMs": 103190,
        "endMs": 103490,
        "isKeyword": false
      },
      {
        "word": "cần",
        "startMs": 103490,
        "endMs": 103770,
        "isKeyword": false
      },
      {
        "word": "đá",
        "startMs": 103770,
        "endMs": 103940,
        "isKeyword": true
      },
      {
        "word": "hay",
        "startMs": 103940,
        "endMs": 104090,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 102,
    "sceneId": 11,
    "text": "bằng Ronaldo hay Zidane,",
    "startMs": 104090,
    "endMs": 105320,
    "words": [
      {
        "word": "bằng",
        "startMs": 104090,
        "endMs": 104380,
        "isKeyword": true
      },
      {
        "word": "Ronaldo",
        "startMs": 104380,
        "endMs": 104750,
        "isKeyword": true
      },
      {
        "word": "hay",
        "startMs": 104750,
        "endMs": 104900,
        "isKeyword": false
      },
      {
        "word": "Zidane,",
        "startMs": 104900,
        "endMs": 105320,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 103,
    "sceneId": 11,
    "text": "chỉ cần… trọng tài",
    "startMs": 105320,
    "endMs": 106400,
    "words": [
      {
        "word": "chỉ",
        "startMs": 105320,
        "endMs": 105620,
        "isKeyword": false
      },
      {
        "word": "cần…",
        "startMs": 105620,
        "endMs": 105850,
        "isKeyword": false
      },
      {
        "word": "trọng",
        "startMs": 105850,
        "endMs": 106250,
        "isKeyword": true
      },
      {
        "word": "tài",
        "startMs": 106250,
        "endMs": 106400,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 104,
    "sceneId": 11,
    "text": "thích bạn là được.",
    "startMs": 106250,
    "endMs": 107480,
    "words": [
      {
        "word": "thích",
        "startMs": 106250,
        "endMs": 106520,
        "isKeyword": false
      },
      {
        "word": "bạn",
        "startMs": 106520,
        "endMs": 106770,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 106770,
        "endMs": 106870,
        "isKeyword": false
      },
      {
        "word": "được.",
        "startMs": 106870,
        "endMs": 107480,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 105,
    "sceneId": 12,
    "text": "Cảm ơn FIFA đã",
    "startMs": 107480,
    "endMs": 108030,
    "words": [
      {
        "word": "Cảm",
        "startMs": 107480,
        "endMs": 107540,
        "isKeyword": false
      },
      {
        "word": "ơn",
        "startMs": 107540,
        "endMs": 107670,
        "isKeyword": false
      },
      {
        "word": "FIFA",
        "startMs": 107670,
        "endMs": 107870,
        "isKeyword": true
      },
      {
        "word": "đã",
        "startMs": 107870,
        "endMs": 108030,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 106,
    "sceneId": 12,
    "text": "mang đến cho chúng",
    "startMs": 108030,
    "endMs": 108880,
    "words": [
      {
        "word": "mang",
        "startMs": 108030,
        "endMs": 108210,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 108210,
        "endMs": 108480,
        "isKeyword": false
      },
      {
        "word": "cho",
        "startMs": 108480,
        "endMs": 108610,
        "isKeyword": false
      },
      {
        "word": "chúng",
        "startMs": 108610,
        "endMs": 108880,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 107,
    "sceneId": 12,
    "text": "ta một kỳ World",
    "startMs": 108880,
    "endMs": 109580,
    "words": [
      {
        "word": "ta",
        "startMs": 108880,
        "endMs": 108980,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 108980,
        "endMs": 109190,
        "isKeyword": false
      },
      {
        "word": "kỳ",
        "startMs": 109190,
        "endMs": 109360,
        "isKeyword": false
      },
      {
        "word": "World",
        "startMs": 109360,
        "endMs": 109580,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 108,
    "sceneId": 12,
    "text": "Cup đầy… bất ngờ.",
    "startMs": 109580,
    "endMs": 111150,
    "words": [
      {
        "word": "Cup",
        "startMs": 109580,
        "endMs": 109820,
        "isKeyword": true
      },
      {
        "word": "đầy…",
        "startMs": 109820,
        "endMs": 110260,
        "isKeyword": false
      },
      {
        "word": "bất",
        "startMs": 110260,
        "endMs": 110610,
        "isKeyword": false
      },
      {
        "word": "ngờ.",
        "startMs": 110610,
        "endMs": 111150,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 109,
    "sceneId": 12,
    "text": "Và cảm ơn Hàn",
    "startMs": 111150,
    "endMs": 111680,
    "words": [
      {
        "word": "Và",
        "startMs": 111150,
        "endMs": 111200,
        "isKeyword": false
      },
      {
        "word": "cảm",
        "startMs": 111200,
        "endMs": 111400,
        "isKeyword": false
      },
      {
        "word": "ơn",
        "startMs": 111400,
        "endMs": 111520,
        "isKeyword": false
      },
      {
        "word": "Hàn",
        "startMs": 111520,
        "endMs": 111680,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 110,
    "sceneId": 12,
    "text": "Quốc đã dạy cả",
    "startMs": 111680,
    "endMs": 112520,
    "words": [
      {
        "word": "Quốc",
        "startMs": 111680,
        "endMs": 111920,
        "isKeyword": true
      },
      {
        "word": "đã",
        "startMs": 111920,
        "endMs": 112120,
        "isKeyword": false
      },
      {
        "word": "dạy",
        "startMs": 112120,
        "endMs": 112280,
        "isKeyword": false
      },
      {
        "word": "cả",
        "startMs": 112280,
        "endMs": 112520,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 111,
    "sceneId": 12,
    "text": "thế giới bài học:",
    "startMs": 112520,
    "endMs": 113520,
    "words": [
      {
        "word": "thế",
        "startMs": 112520,
        "endMs": 112680,
        "isKeyword": false
      },
      {
        "word": "giới",
        "startMs": 112680,
        "endMs": 112880,
        "isKeyword": false
      },
      {
        "word": "bài",
        "startMs": 112880,
        "endMs": 113040,
        "isKeyword": false
      },
      {
        "word": "học:",
        "startMs": 113040,
        "endMs": 113520,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 112,
    "sceneId": 12,
    "text": "đôi khi, công bằng",
    "startMs": 113520,
    "endMs": 114590,
    "words": [
      {
        "word": "đôi",
        "startMs": 113520,
        "endMs": 113770,
        "isKeyword": false
      },
      {
        "word": "khi,",
        "startMs": 113770,
        "endMs": 114020,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 114020,
        "endMs": 114330,
        "isKeyword": true
      },
      {
        "word": "bằng",
        "startMs": 114330,
        "endMs": 114590,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 113,
    "sceneId": 12,
    "text": "chỉ là… một khái",
    "startMs": 114590,
    "endMs": 115510,
    "words": [
      {
        "word": "chỉ",
        "startMs": 114590,
        "endMs": 114850,
        "isKeyword": false
      },
      {
        "word": "là…",
        "startMs": 114850,
        "endMs": 115000,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 115000,
        "endMs": 115260,
        "isKeyword": false
      },
      {
        "word": "khái",
        "startMs": 115260,
        "endMs": 115510,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 114,
    "sceneId": 12,
    "text": "niệm tương đối.",
    "startMs": 115510,
    "endMs": 116720,
    "words": [
      {
        "word": "niệm",
        "startMs": 115510,
        "endMs": 115810,
        "isKeyword": false
      },
      {
        "word": "tương",
        "startMs": 115810,
        "endMs": 116170,
        "isKeyword": false
      },
      {
        "word": "đối.",
        "startMs": 116170,
        "endMs": 116720,
        "isKeyword": true
      }
    ]
  }
];
