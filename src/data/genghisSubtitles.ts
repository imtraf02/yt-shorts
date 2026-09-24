export type SubtitleToken = {
  text: string;
  startMs: number;
  endMs: number;
};

export type SubtitlePhrase = {
  id: number;
  scene?: number;
  startMs: number;
  endMs: number;
  text: string;
  tokens: SubtitleToken[];
  highlightKeywords?: string[];
};

export const genghisSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "scene": 1,
    "startMs": 40,
    "endMs": 1350,
    "text": "Thành Cát Tư Hãn là người sáng lập",
    "tokens": [
      {
        "text": "Thành",
        "startMs": 40,
        "endMs": 230
      },
      {
        "text": "Cát",
        "startMs": 230,
        "endMs": 340
      },
      {
        "text": "Tư",
        "startMs": 340,
        "endMs": 440
      },
      {
        "text": "Hãn",
        "startMs": 440,
        "endMs": 570
      },
      {
        "text": "là",
        "startMs": 570,
        "endMs": 680
      },
      {
        "text": "người",
        "startMs": 680,
        "endMs": 1010
      },
      {
        "text": "sáng",
        "startMs": 1010,
        "endMs": 1170
      },
      {
        "text": "lập",
        "startMs": 1170,
        "endMs": 1350
      }
    ],
    "highlightKeywords": [
      "Thành Cát Tư Hãn",
      "sáng lập"
    ]
  },
  {
    "id": 1,
    "scene": 1,
    "startMs": 1350,
    "endMs": 2310,
    "text": "Đế quốc Mông Cổ,",
    "tokens": [
      {
        "text": "Đế",
        "startMs": 1350,
        "endMs": 1530
      },
      {
        "text": "quốc",
        "startMs": 1530,
        "endMs": 1780
      },
      {
        "text": "Mông",
        "startMs": 1780,
        "endMs": 1920
      },
      {
        "text": "Cổ",
        "startMs": 1920,
        "endMs": 2310
      }
    ],
    "highlightKeywords": [
      "Đế quốc Mông Cổ"
    ]
  },
  {
    "id": 2,
    "scene": 1,
    "startMs": 2310,
    "endMs": 4580,
    "text": "đế chế liền lãnh thổ lớn nhất lịch sử nhân loại,",
    "tokens": [
      {
        "text": "đế",
        "startMs": 2310,
        "endMs": 2450
      },
      {
        "text": "chế",
        "startMs": 2450,
        "endMs": 2630
      },
      {
        "text": "liền",
        "startMs": 2630,
        "endMs": 2850
      },
      {
        "text": "lãnh",
        "startMs": 2850,
        "endMs": 3050
      },
      {
        "text": "thổ",
        "startMs": 3050,
        "endMs": 3200
      },
      {
        "text": "lớn",
        "startMs": 3200,
        "endMs": 3380
      },
      {
        "text": "nhất",
        "startMs": 3380,
        "endMs": 3680
      },
      {
        "text": "lịch",
        "startMs": 3680,
        "endMs": 3900
      },
      {
        "text": "sử",
        "startMs": 3900,
        "endMs": 4040
      },
      {
        "text": "nhân",
        "startMs": 4040,
        "endMs": 4230
      },
      {
        "text": "loại",
        "startMs": 4230,
        "endMs": 4580
      }
    ],
    "highlightKeywords": [
      "lớn nhất lịch sử"
    ]
  },
  {
    "id": 3,
    "scene": 1,
    "startMs": 4580,
    "endMs": 5980,
    "text": "trải dài từ Thái Bình Dương",
    "tokens": [
      {
        "text": "trải",
        "startMs": 4580,
        "endMs": 4820
      },
      {
        "text": "dài",
        "startMs": 4820,
        "endMs": 5060
      },
      {
        "text": "từ",
        "startMs": 5060,
        "endMs": 5220
      },
      {
        "text": "Thái",
        "startMs": 5220,
        "endMs": 5420
      },
      {
        "text": "Bình",
        "startMs": 5420,
        "endMs": 5620
      },
      {
        "text": "Dương",
        "startMs": 5620,
        "endMs": 5980
      }
    ],
    "highlightKeywords": [
      "Thái Bình Dương"
    ]
  },
  {
    "id": 4,
    "scene": 1,
    "startMs": 5980,
    "endMs": 6920,
    "text": "đến tận Đông Âu.",
    "tokens": [
      {
        "text": "đến",
        "startMs": 5980,
        "endMs": 6160
      },
      {
        "text": "tận",
        "startMs": 6160,
        "endMs": 6360
      },
      {
        "text": "Đông",
        "startMs": 6360,
        "endMs": 6600
      },
      {
        "text": "Âu",
        "startMs": 6600,
        "endMs": 6920
      }
    ],
    "highlightKeywords": [
      "Đông Âu"
    ]
  },
  {
    "id": 5,
    "scene": 2,
    "startMs": 6920,
    "endMs": 7780,
    "text": "Nhưng ít ai biết rằng",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 6920,
        "endMs": 7170
      },
      {
        "text": "ít",
        "startMs": 7170,
        "endMs": 7270
      },
      {
        "text": "ai",
        "startMs": 7270,
        "endMs": 7410
      },
      {
        "text": "biết",
        "startMs": 7410,
        "endMs": 7560
      },
      {
        "text": "rằng",
        "startMs": 7560,
        "endMs": 7780
      }
    ],
    "highlightKeywords": [
      "ít ai biết"
    ]
  },
  {
    "id": 6,
    "scene": 2,
    "startMs": 7780,
    "endMs": 9350,
    "text": "người đàn ông ấy bắt đầu cuộc đời",
    "tokens": [
      {
        "text": "người",
        "startMs": 7780,
        "endMs": 8100
      },
      {
        "text": "đàn",
        "startMs": 8100,
        "endMs": 8250
      },
      {
        "text": "ông",
        "startMs": 8250,
        "endMs": 8410
      },
      {
        "text": "ấy",
        "startMs": 8410,
        "endMs": 8540
      },
      {
        "text": "bắt",
        "startMs": 8540,
        "endMs": 8700
      },
      {
        "text": "đầu",
        "startMs": 8700,
        "endMs": 8920
      },
      {
        "text": "cuộc",
        "startMs": 8920,
        "endMs": 9200
      },
      {
        "text": "đời",
        "startMs": 9200,
        "endMs": 9350
      }
    ],
    "highlightKeywords": [
      "bắt đầu cuộc đời"
    ]
  },
  {
    "id": 7,
    "scene": 2,
    "startMs": 9350,
    "endMs": 10320,
    "text": "từ đáy xã hội,",
    "tokens": [
      {
        "text": "từ",
        "startMs": 9350,
        "endMs": 9490
      },
      {
        "text": "đáy",
        "startMs": 9490,
        "endMs": 9710
      },
      {
        "text": "xã",
        "startMs": 9710,
        "endMs": 9800
      },
      {
        "text": "hội",
        "startMs": 9800,
        "endMs": 10320
      }
    ],
    "highlightKeywords": [
      "đáy xã hội"
    ]
  },
  {
    "id": 8,
    "scene": 2,
    "startMs": 10320,
    "endMs": 11920,
    "text": "bị chính bộ tộc của mình bỏ rơi.",
    "tokens": [
      {
        "text": "bị",
        "startMs": 10320,
        "endMs": 10320
      },
      {
        "text": "chính",
        "startMs": 10320,
        "endMs": 10600
      },
      {
        "text": "bộ",
        "startMs": 10600,
        "endMs": 10820
      },
      {
        "text": "tộc",
        "startMs": 10820,
        "endMs": 11020
      },
      {
        "text": "của",
        "startMs": 11020,
        "endMs": 11230
      },
      {
        "text": "mình",
        "startMs": 11230,
        "endMs": 11460
      },
      {
        "text": "bỏ",
        "startMs": 11460,
        "endMs": 11680
      },
      {
        "text": "rơi",
        "startMs": 11680,
        "endMs": 11920
      }
    ],
    "highlightKeywords": [
      "bộ tộc",
      "bỏ rơi"
    ]
  },
  {
    "id": 9,
    "scene": 3,
    "startMs": 11920,
    "endMs": 13760,
    "text": "Ông tên thật là Temüjin.",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 11920,
        "endMs": 12180
      },
      {
        "text": "tên",
        "startMs": 12180,
        "endMs": 12440
      },
      {
        "text": "thật",
        "startMs": 12440,
        "endMs": 12840
      },
      {
        "text": "là",
        "startMs": 12840,
        "endMs": 13040
      },
      {
        "text": "Temüjin",
        "startMs": 13040,
        "endMs": 13760
      }
    ],
    "highlightKeywords": [
      "Temüjin"
    ]
  },
  {
    "id": 10,
    "scene": 3,
    "startMs": 13760,
    "endMs": 15290,
    "text": "Khi ông mới khoảng 9 tuổi,",
    "tokens": [
      {
        "text": "Khi",
        "startMs": 13760,
        "endMs": 13980
      },
      {
        "text": "ông",
        "startMs": 13980,
        "endMs": 14070
      },
      {
        "text": "mới",
        "startMs": 14070,
        "endMs": 14290
      },
      {
        "text": "khoảng",
        "startMs": 14290,
        "endMs": 14640
      },
      {
        "text": "9",
        "startMs": 14640,
        "endMs": 14770
      },
      {
        "text": "tuổi",
        "startMs": 14770,
        "endMs": 15290
      }
    ],
    "highlightKeywords": [
      "khoảng 9 tuổi"
    ]
  },
  {
    "id": 11,
    "scene": 3,
    "startMs": 15290,
    "endMs": 17060,
    "text": "cha ông bị người Tatar đầu độc.",
    "tokens": [
      {
        "text": "cha",
        "startMs": 15290,
        "endMs": 15340
      },
      {
        "text": "ông",
        "startMs": 15340,
        "endMs": 15550
      },
      {
        "text": "bị",
        "startMs": 15550,
        "endMs": 15760
      },
      {
        "text": "người",
        "startMs": 15760,
        "endMs": 16200
      },
      {
        "text": "Tatar",
        "startMs": 16200,
        "endMs": 16380
      },
      {
        "text": "đầu",
        "startMs": 16380,
        "endMs": 16800
      },
      {
        "text": "độc",
        "startMs": 16800,
        "endMs": 17060
      }
    ],
    "highlightKeywords": [
      "Tatar đầu độc"
    ]
  },
  {
    "id": 12,
    "scene": 3,
    "startMs": 17060,
    "endMs": 18460,
    "text": "Cả gia đình bị bộ tộc ruồng bỏ",
    "tokens": [
      {
        "text": "Cả",
        "startMs": 17060,
        "endMs": 17250
      },
      {
        "text": "gia",
        "startMs": 17250,
        "endMs": 17340
      },
      {
        "text": "đình",
        "startMs": 17340,
        "endMs": 17580
      },
      {
        "text": "bị",
        "startMs": 17580,
        "endMs": 17740
      },
      {
        "text": "bộ",
        "startMs": 17740,
        "endMs": 17900
      },
      {
        "text": "tộc",
        "startMs": 17900,
        "endMs": 18100
      },
      {
        "text": "ruồng",
        "startMs": 18100,
        "endMs": 18300
      },
      {
        "text": "bỏ",
        "startMs": 18300,
        "endMs": 18460
      }
    ],
    "highlightKeywords": [
      "ruồng bỏ"
    ]
  },
  {
    "id": 13,
    "scene": 3,
    "startMs": 18460,
    "endMs": 19960,
    "text": "giữa thảo nguyên khắc nghiệt,",
    "tokens": [
      {
        "text": "giữa",
        "startMs": 18460,
        "endMs": 18700
      },
      {
        "text": "thảo",
        "startMs": 18700,
        "endMs": 18940
      },
      {
        "text": "nguyên",
        "startMs": 18940,
        "endMs": 19140
      },
      {
        "text": "khắc",
        "startMs": 19140,
        "endMs": 19380
      },
      {
        "text": "nghiệt",
        "startMs": 19380,
        "endMs": 19960
      }
    ],
    "highlightKeywords": [
      "thảo nguyên khắc nghiệt"
    ]
  },
  {
    "id": 14,
    "scene": 4,
    "startMs": 19960,
    "endMs": 21490,
    "text": "phải sống sót bằng rễ cây,",
    "tokens": [
      {
        "text": "phải",
        "startMs": 19960,
        "endMs": 20230
      },
      {
        "text": "sống",
        "startMs": 20230,
        "endMs": 20510
      },
      {
        "text": "sót",
        "startMs": 20510,
        "endMs": 20720
      },
      {
        "text": "bằng",
        "startMs": 20720,
        "endMs": 20950
      },
      {
        "text": "rễ",
        "startMs": 20950,
        "endMs": 21160
      },
      {
        "text": "cây",
        "startMs": 21160,
        "endMs": 21490
      }
    ],
    "highlightKeywords": [
      "sống sót",
      "rễ cây"
    ]
  },
  {
    "id": 15,
    "scene": 4,
    "startMs": 21490,
    "endMs": 23020,
    "text": "quả dại và những con thú nhỏ.",
    "tokens": [
      {
        "text": "quả",
        "startMs": 21490,
        "endMs": 21630
      },
      {
        "text": "dại",
        "startMs": 21630,
        "endMs": 21990
      },
      {
        "text": "và",
        "startMs": 21990,
        "endMs": 22060
      },
      {
        "text": "những",
        "startMs": 22060,
        "endMs": 22320
      },
      {
        "text": "con",
        "startMs": 22320,
        "endMs": 22470
      },
      {
        "text": "thú",
        "startMs": 22470,
        "endMs": 22640
      },
      {
        "text": "nhỏ",
        "startMs": 22640,
        "endMs": 23020
      }
    ],
    "highlightKeywords": [
      "quả dại",
      "con thú nhỏ"
    ]
  },
  {
    "id": 16,
    "scene": 4,
    "startMs": 23100,
    "endMs": 23830,
    "text": "Đây là khởi đầu",
    "tokens": [
      {
        "text": "Đây",
        "startMs": 23100,
        "endMs": 23220
      },
      {
        "text": "là",
        "startMs": 23220,
        "endMs": 23410
      },
      {
        "text": "khởi",
        "startMs": 23410,
        "endMs": 23580
      },
      {
        "text": "đầu",
        "startMs": 23580,
        "endMs": 23830
      }
    ],
    "highlightKeywords": [
      "khởi đầu"
    ]
  },
  {
    "id": 17,
    "scene": 4,
    "startMs": 23830,
    "endMs": 25890,
    "text": "của người sau này chinh phục nửa thế giới.",
    "tokens": [
      {
        "text": "của",
        "startMs": 23830,
        "endMs": 24030
      },
      {
        "text": "người",
        "startMs": 24030,
        "endMs": 24370
      },
      {
        "text": "sau",
        "startMs": 24370,
        "endMs": 24480
      },
      {
        "text": "này",
        "startMs": 24480,
        "endMs": 24650
      },
      {
        "text": "chinh",
        "startMs": 24650,
        "endMs": 24900
      },
      {
        "text": "phục",
        "startMs": 24900,
        "endMs": 25130
      },
      {
        "text": "nửa",
        "startMs": 25130,
        "endMs": 25530
      },
      {
        "text": "thế",
        "startMs": 25530,
        "endMs": 25610
      },
      {
        "text": "giới",
        "startMs": 25610,
        "endMs": 25890
      }
    ],
    "highlightKeywords": [
      "chinh phục nửa thế giới"
    ]
  },
  {
    "id": 18,
    "scene": 5,
    "startMs": 25890,
    "endMs": 27260,
    "text": "Ông lớn lên trong bị bắt giữ,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 25890,
        "endMs": 26050
      },
      {
        "text": "lớn",
        "startMs": 26050,
        "endMs": 26210
      },
      {
        "text": "lên",
        "startMs": 26210,
        "endMs": 26370
      },
      {
        "text": "trong",
        "startMs": 26370,
        "endMs": 26570
      },
      {
        "text": "bị",
        "startMs": 26570,
        "endMs": 26730
      },
      {
        "text": "bắt",
        "startMs": 26730,
        "endMs": 27010
      },
      {
        "text": "giữ",
        "startMs": 27010,
        "endMs": 27260
      }
    ],
    "highlightKeywords": [
      "bắt giữ"
    ]
  },
  {
    "id": 19,
    "scene": 5,
    "startMs": 27260,
    "endMs": 28370,
    "text": "phản bội và mất mát,",
    "tokens": [
      {
        "text": "phản",
        "startMs": 27260,
        "endMs": 27450
      },
      {
        "text": "bội",
        "startMs": 27450,
        "endMs": 27650
      },
      {
        "text": "và",
        "startMs": 27650,
        "endMs": 27770
      },
      {
        "text": "mất",
        "startMs": 27770,
        "endMs": 27970
      },
      {
        "text": "mát",
        "startMs": 27970,
        "endMs": 28370
      }
    ],
    "highlightKeywords": [
      "phản bội",
      "mất mát"
    ]
  },
  {
    "id": 20,
    "scene": 5,
    "startMs": 28370,
    "endMs": 29340,
    "text": "đến cả vợ ông là Börte",
    "tokens": [
      {
        "text": "đến",
        "startMs": 28370,
        "endMs": 28380
      },
      {
        "text": "cả",
        "startMs": 28380,
        "endMs": 28570
      },
      {
        "text": "vợ",
        "startMs": 28570,
        "endMs": 28740
      },
      {
        "text": "ông",
        "startMs": 28740,
        "endMs": 28900
      },
      {
        "text": "là",
        "startMs": 28900,
        "endMs": 29020
      },
      {
        "text": "Börte",
        "startMs": 29020,
        "endMs": 29340
      }
    ],
    "highlightKeywords": [
      "vợ ông",
      "Börte"
    ]
  },
  {
    "id": 21,
    "scene": 5,
    "startMs": 29340,
    "endMs": 30700,
    "text": "cũng từng bị bắt cóc.",
    "tokens": [
      {
        "text": "cũng",
        "startMs": 29340,
        "endMs": 29500
      },
      {
        "text": "từng",
        "startMs": 29500,
        "endMs": 29740
      },
      {
        "text": "bị",
        "startMs": 29740,
        "endMs": 29900
      },
      {
        "text": "bắt",
        "startMs": 29900,
        "endMs": 30100
      },
      {
        "text": "cóc",
        "startMs": 30100,
        "endMs": 30700
      }
    ],
    "highlightKeywords": [
      "bị bắt cóc"
    ]
  },
  {
    "id": 22,
    "scene": 5,
    "startMs": 30700,
    "endMs": 31900,
    "text": "Nhưng chính những năm tháng ấy",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 30700,
        "endMs": 30910
      },
      {
        "text": "chính",
        "startMs": 30910,
        "endMs": 31120
      },
      {
        "text": "những",
        "startMs": 31120,
        "endMs": 31370
      },
      {
        "text": "năm",
        "startMs": 31370,
        "endMs": 31540
      },
      {
        "text": "tháng",
        "startMs": 31540,
        "endMs": 31760
      },
      {
        "text": "ấy",
        "startMs": 31760,
        "endMs": 31900
      }
    ],
    "highlightKeywords": [
      "năm tháng ấy"
    ]
  },
  {
    "id": 23,
    "scene": 5,
    "startMs": 31900,
    "endMs": 32810,
    "text": "dạy ông một điều:",
    "tokens": [
      {
        "text": "dạy",
        "startMs": 31900,
        "endMs": 32060
      },
      {
        "text": "ông",
        "startMs": 32060,
        "endMs": 32240
      },
      {
        "text": "một",
        "startMs": 32240,
        "endMs": 32380
      },
      {
        "text": "điều",
        "startMs": 32380,
        "endMs": 32810
      }
    ],
    "highlightKeywords": [
      "dạy ông"
    ]
  },
  {
    "id": 24,
    "scene": 5,
    "startMs": 32810,
    "endMs": 34310,
    "text": "sức mạnh không đến từ dòng máu,",
    "tokens": [
      {
        "text": "sức",
        "startMs": 32810,
        "endMs": 32990
      },
      {
        "text": "mạnh",
        "startMs": 32990,
        "endMs": 33260
      },
      {
        "text": "không",
        "startMs": 33260,
        "endMs": 33410
      },
      {
        "text": "đến",
        "startMs": 33410,
        "endMs": 33640
      },
      {
        "text": "từ",
        "startMs": 33640,
        "endMs": 33790
      },
      {
        "text": "dòng",
        "startMs": 33790,
        "endMs": 33970
      },
      {
        "text": "máu",
        "startMs": 33970,
        "endMs": 34310
      }
    ],
    "highlightKeywords": [
      "dòng máu"
    ]
  },
  {
    "id": 25,
    "scene": 5,
    "startMs": 34310,
    "endMs": 35720,
    "text": "mà đến từ lòng trung thành.",
    "tokens": [
      {
        "text": "mà",
        "startMs": 34310,
        "endMs": 34400
      },
      {
        "text": "đến",
        "startMs": 34400,
        "endMs": 34580
      },
      {
        "text": "từ",
        "startMs": 34580,
        "endMs": 34760
      },
      {
        "text": "lòng",
        "startMs": 34760,
        "endMs": 34980
      },
      {
        "text": "trung",
        "startMs": 34980,
        "endMs": 35200
      },
      {
        "text": "thành",
        "startMs": 35200,
        "endMs": 35720
      }
    ],
    "highlightKeywords": [
      "lòng trung thành"
    ]
  },
  {
    "id": 26,
    "scene": 5,
    "startMs": 35720,
    "endMs": 37360,
    "text": "Năm 1206,",
    "tokens": [
      {
        "text": "Năm",
        "startMs": 35720,
        "endMs": 36130
      },
      {
        "text": "1206",
        "startMs": 36130,
        "endMs": 37360
      }
    ],
    "highlightKeywords": [
      "Năm 1206"
    ]
  },
  {
    "id": 27,
    "scene": 5,
    "startMs": 37360,
    "endMs": 39040,
    "text": "sau khi thống nhất các bộ tộc Mông Cổ",
    "tokens": [
      {
        "text": "sau",
        "startMs": 37360,
        "endMs": 37480
      },
      {
        "text": "khi",
        "startMs": 37480,
        "endMs": 37640
      },
      {
        "text": "thống",
        "startMs": 37640,
        "endMs": 37840
      },
      {
        "text": "nhất",
        "startMs": 37840,
        "endMs": 38320
      },
      {
        "text": "các",
        "startMs": 38320,
        "endMs": 38340
      },
      {
        "text": "bộ",
        "startMs": 38340,
        "endMs": 38480
      },
      {
        "text": "tộc",
        "startMs": 38480,
        "endMs": 38680
      },
      {
        "text": "Mông",
        "startMs": 38680,
        "endMs": 38880
      },
      {
        "text": "Cổ",
        "startMs": 38880,
        "endMs": 39040
      }
    ],
    "highlightKeywords": [
      "thống nhất",
      "Mông Cổ"
    ]
  },
  {
    "id": 28,
    "scene": 5,
    "startMs": 39040,
    "endMs": 40940,
    "text": "vốn thù địch nhau suốt nhiều thế hệ,",
    "tokens": [
      {
        "text": "vốn",
        "startMs": 39040,
        "endMs": 39240
      },
      {
        "text": "thù",
        "startMs": 39240,
        "endMs": 39360
      },
      {
        "text": "địch",
        "startMs": 39360,
        "endMs": 39640
      },
      {
        "text": "nhau",
        "startMs": 39640,
        "endMs": 39880
      },
      {
        "text": "suốt",
        "startMs": 39880,
        "endMs": 40040
      },
      {
        "text": "nhiều",
        "startMs": 40040,
        "endMs": 40330
      },
      {
        "text": "thế",
        "startMs": 40330,
        "endMs": 40570
      },
      {
        "text": "hệ",
        "startMs": 40570,
        "endMs": 40940
      }
    ],
    "highlightKeywords": [
      "thù địch nhau"
    ]
  },
  {
    "id": 29,
    "scene": 5,
    "startMs": 40940,
    "endMs": 42840,
    "text": "ông được tôn làm Thành Cát Tư Hãn.",
    "tokens": [
      {
        "text": "ông",
        "startMs": 40940,
        "endMs": 41110
      },
      {
        "text": "được",
        "startMs": 41110,
        "endMs": 41450
      },
      {
        "text": "tôn",
        "startMs": 41450,
        "endMs": 41620
      },
      {
        "text": "làm",
        "startMs": 41620,
        "endMs": 41790
      },
      {
        "text": "Thành",
        "startMs": 41790,
        "endMs": 42140
      },
      {
        "text": "Cát",
        "startMs": 42140,
        "endMs": 42180
      },
      {
        "text": "Tư",
        "startMs": 42180,
        "endMs": 42300
      },
      {
        "text": "Hãn",
        "startMs": 42300,
        "endMs": 42840
      }
    ],
    "highlightKeywords": [
      "Thành Cát Tư Hãn"
    ]
  },
  {
    "id": 30,
    "scene": 6,
    "startMs": 42840,
    "endMs": 44400,
    "text": "Điều khiến quân đội của ông bất bại",
    "tokens": [
      {
        "text": "Điều",
        "startMs": 42840,
        "endMs": 42970
      },
      {
        "text": "khiến",
        "startMs": 42970,
        "endMs": 43180
      },
      {
        "text": "quân",
        "startMs": 43180,
        "endMs": 43350
      },
      {
        "text": "đội",
        "startMs": 43350,
        "endMs": 43600
      },
      {
        "text": "của",
        "startMs": 43600,
        "endMs": 43810
      },
      {
        "text": "ông",
        "startMs": 43810,
        "endMs": 43980
      },
      {
        "text": "bất",
        "startMs": 43980,
        "endMs": 44190
      },
      {
        "text": "bại",
        "startMs": 44190,
        "endMs": 44400
      }
    ],
    "highlightKeywords": [
      "quân đội bất bại"
    ]
  },
  {
    "id": 31,
    "scene": 6,
    "startMs": 44400,
    "endMs": 46040,
    "text": "không chỉ là ngựa và cung tên.",
    "tokens": [
      {
        "text": "không",
        "startMs": 44400,
        "endMs": 44660
      },
      {
        "text": "chỉ",
        "startMs": 44660,
        "endMs": 44870
      },
      {
        "text": "là",
        "startMs": 44870,
        "endMs": 45000
      },
      {
        "text": "ngựa",
        "startMs": 45000,
        "endMs": 45250
      },
      {
        "text": "và",
        "startMs": 45250,
        "endMs": 45380
      },
      {
        "text": "cung",
        "startMs": 45380,
        "endMs": 45590
      },
      {
        "text": "tên",
        "startMs": 45590,
        "endMs": 46040
      }
    ],
    "highlightKeywords": [
      "ngựa và cung tên"
    ]
  },
  {
    "id": 32,
    "scene": 7,
    "startMs": 46040,
    "endMs": 47210,
    "text": "Ông thăng chức theo năng lực",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 46040,
        "endMs": 46180
      },
      {
        "text": "thăng",
        "startMs": 46180,
        "endMs": 46440
      },
      {
        "text": "chức",
        "startMs": 46440,
        "endMs": 46680
      },
      {
        "text": "theo",
        "startMs": 46680,
        "endMs": 46810
      },
      {
        "text": "năng",
        "startMs": 46810,
        "endMs": 46990
      },
      {
        "text": "lực",
        "startMs": 46990,
        "endMs": 47210
      }
    ],
    "highlightKeywords": [
      "theo năng lực"
    ]
  },
  {
    "id": 33,
    "scene": 7,
    "startMs": 47210,
    "endMs": 48270,
    "text": "chứ không theo xuất thân,",
    "tokens": [
      {
        "text": "chứ",
        "startMs": 47210,
        "endMs": 47370
      },
      {
        "text": "không",
        "startMs": 47370,
        "endMs": 47570
      },
      {
        "text": "theo",
        "startMs": 47570,
        "endMs": 47790
      },
      {
        "text": "xuất",
        "startMs": 47790,
        "endMs": 47940
      },
      {
        "text": "thân",
        "startMs": 47940,
        "endMs": 48270
      }
    ],
    "highlightKeywords": [
      "không theo xuất thân"
    ]
  },
  {
    "id": 34,
    "scene": 7,
    "startMs": 48270,
    "endMs": 49160,
    "text": "nên một người chăn cừu",
    "tokens": [
      {
        "text": "nên",
        "startMs": 48270,
        "endMs": 48350
      },
      {
        "text": "một",
        "startMs": 48350,
        "endMs": 48460
      },
      {
        "text": "người",
        "startMs": 48460,
        "endMs": 48760
      },
      {
        "text": "chăn",
        "startMs": 48760,
        "endMs": 48990
      },
      {
        "text": "cừu",
        "startMs": 48990,
        "endMs": 49160
      }
    ],
    "highlightKeywords": [
      "người chăn cừu"
    ]
  },
  {
    "id": 35,
    "scene": 7,
    "startMs": 49160,
    "endMs": 50840,
    "text": "hoàn toàn có thể trở thành tướng lĩnh.",
    "tokens": [
      {
        "text": "hoàn",
        "startMs": 49160,
        "endMs": 49340
      },
      {
        "text": "toàn",
        "startMs": 49340,
        "endMs": 49520
      },
      {
        "text": "có",
        "startMs": 49520,
        "endMs": 49680
      },
      {
        "text": "thể",
        "startMs": 49680,
        "endMs": 49820
      },
      {
        "text": "trở",
        "startMs": 49820,
        "endMs": 50000
      },
      {
        "text": "thành",
        "startMs": 50000,
        "endMs": 50250
      },
      {
        "text": "tướng",
        "startMs": 50250,
        "endMs": 50470
      },
      {
        "text": "lĩnh",
        "startMs": 50470,
        "endMs": 50840
      }
    ],
    "highlightKeywords": [
      "trở thành tướng lĩnh"
    ]
  },
  {
    "id": 36,
    "scene": 8,
    "startMs": 50920,
    "endMs": 52310,
    "text": "Ông lập hệ thống trạm dịch Yam",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 50920,
        "endMs": 51000
      },
      {
        "text": "lập",
        "startMs": 51000,
        "endMs": 51130
      },
      {
        "text": "hệ",
        "startMs": 51130,
        "endMs": 51300
      },
      {
        "text": "thống",
        "startMs": 51300,
        "endMs": 51590
      },
      {
        "text": "trạm",
        "startMs": 51590,
        "endMs": 51850
      },
      {
        "text": "dịch",
        "startMs": 51850,
        "endMs": 52090
      },
      {
        "text": "Yam",
        "startMs": 52090,
        "endMs": 52310
      }
    ],
    "highlightKeywords": [
      "trạm dịch Yam"
    ]
  },
  {
    "id": 37,
    "scene": 8,
    "startMs": 52310,
    "endMs": 54160,
    "text": "để tin tức băng qua hàng nghìn cây số",
    "tokens": [
      {
        "text": "để",
        "startMs": 52310,
        "endMs": 52470
      },
      {
        "text": "tin",
        "startMs": 52470,
        "endMs": 52630
      },
      {
        "text": "tức",
        "startMs": 52630,
        "endMs": 52800
      },
      {
        "text": "băng",
        "startMs": 52800,
        "endMs": 52960
      },
      {
        "text": "qua",
        "startMs": 52960,
        "endMs": 53060
      },
      {
        "text": "hàng",
        "startMs": 53060,
        "endMs": 53270
      },
      {
        "text": "nghìn",
        "startMs": 53270,
        "endMs": 53530
      },
      {
        "text": "cây",
        "startMs": 53530,
        "endMs": 53700
      },
      {
        "text": "số",
        "startMs": 53700,
        "endMs": 54160
      }
    ],
    "highlightKeywords": [
      "hàng nghìn cây số"
    ]
  },
  {
    "id": 38,
    "scene": 8,
    "startMs": 54160,
    "endMs": 55320,
    "text": "chỉ trong thời gian ngắn,",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 54160,
        "endMs": 54270
      },
      {
        "text": "trong",
        "startMs": 54270,
        "endMs": 54490
      },
      {
        "text": "thời",
        "startMs": 54490,
        "endMs": 54690
      },
      {
        "text": "gian",
        "startMs": 54690,
        "endMs": 54830
      },
      {
        "text": "ngắn",
        "startMs": 54830,
        "endMs": 55320
      }
    ],
    "highlightKeywords": [
      "thời gian ngắn"
    ]
  },
  {
    "id": 39,
    "scene": 9,
    "startMs": 55320,
    "endMs": 56660,
    "text": "ban hành bộ luật Yassa",
    "tokens": [
      {
        "text": "ban",
        "startMs": 55320,
        "endMs": 55350
      },
      {
        "text": "hành",
        "startMs": 55350,
        "endMs": 55660
      },
      {
        "text": "bộ",
        "startMs": 55660,
        "endMs": 55920
      },
      {
        "text": "luật",
        "startMs": 55920,
        "endMs": 56220
      },
      {
        "text": "Yassa",
        "startMs": 56220,
        "endMs": 56660
      }
    ],
    "highlightKeywords": [
      "bộ luật Yassa"
    ]
  },
  {
    "id": 40,
    "scene": 9,
    "startMs": 56660,
    "endMs": 57540,
    "text": "và cho phép các tôn giáo",
    "tokens": [
      {
        "text": "và",
        "startMs": 56660,
        "endMs": 56700
      },
      {
        "text": "cho",
        "startMs": 56700,
        "endMs": 56820
      },
      {
        "text": "phép",
        "startMs": 56820,
        "endMs": 57020
      },
      {
        "text": "các",
        "startMs": 57020,
        "endMs": 57180
      },
      {
        "text": "tôn",
        "startMs": 57180,
        "endMs": 57340
      },
      {
        "text": "giáo",
        "startMs": 57340,
        "endMs": 57540
      }
    ],
    "highlightKeywords": [
      "các tôn giáo"
    ]
  },
  {
    "id": 41,
    "scene": 9,
    "startMs": 57540,
    "endMs": 59420,
    "text": "được tự do tín ngưỡng trong đế chế.",
    "tokens": [
      {
        "text": "được",
        "startMs": 57540,
        "endMs": 57860
      },
      {
        "text": "tự",
        "startMs": 57860,
        "endMs": 58020
      },
      {
        "text": "do",
        "startMs": 58020,
        "endMs": 58100
      },
      {
        "text": "tín",
        "startMs": 58100,
        "endMs": 58300
      },
      {
        "text": "ngưỡng",
        "startMs": 58300,
        "endMs": 58660
      },
      {
        "text": "trong",
        "startMs": 58660,
        "endMs": 58870
      },
      {
        "text": "đế",
        "startMs": 58870,
        "endMs": 59060
      },
      {
        "text": "chế",
        "startMs": 59060,
        "endMs": 59420
      }
    ],
    "highlightKeywords": [
      "tự do tín ngưỡng"
    ]
  },
  {
    "id": 42,
    "scene": 10,
    "startMs": 59420,
    "endMs": 61500,
    "text": "Nhưng mặt tối cũng khủng khiếp không kém.",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 59420,
        "endMs": 59690
      },
      {
        "text": "mặt",
        "startMs": 59690,
        "endMs": 59930
      },
      {
        "text": "tối",
        "startMs": 59930,
        "endMs": 60170
      },
      {
        "text": "cũng",
        "startMs": 60170,
        "endMs": 60360
      },
      {
        "text": "khủng",
        "startMs": 60360,
        "endMs": 60700
      },
      {
        "text": "khiếp",
        "startMs": 60700,
        "endMs": 60860
      },
      {
        "text": "không",
        "startMs": 60860,
        "endMs": 61130
      },
      {
        "text": "kém",
        "startMs": 61130,
        "endMs": 61500
      }
    ],
    "highlightKeywords": [
      "mặt tối khủng khiếp"
    ]
  },
  {
    "id": 43,
    "scene": 10,
    "startMs": 61500,
    "endMs": 62770,
    "text": "Khi các thành phố kháng cự,",
    "tokens": [
      {
        "text": "Khi",
        "startMs": 61500,
        "endMs": 61660
      },
      {
        "text": "các",
        "startMs": 61660,
        "endMs": 61680
      },
      {
        "text": "thành",
        "startMs": 61680,
        "endMs": 61960
      },
      {
        "text": "phố",
        "startMs": 61960,
        "endMs": 62190
      },
      {
        "text": "kháng",
        "startMs": 62190,
        "endMs": 62460
      },
      {
        "text": "cự",
        "startMs": 62460,
        "endMs": 62770
      }
    ],
    "highlightKeywords": [
      "kháng cự"
    ]
  },
  {
    "id": 44,
    "scene": 11,
    "startMs": 62770,
    "endMs": 64440,
    "text": "quân Mông Cổ san phẳng chúng,",
    "tokens": [
      {
        "text": "quân",
        "startMs": 62770,
        "endMs": 62910
      },
      {
        "text": "Mông",
        "startMs": 62910,
        "endMs": 63130
      },
      {
        "text": "Cổ",
        "startMs": 63130,
        "endMs": 63400
      },
      {
        "text": "san",
        "startMs": 63400,
        "endMs": 63580
      },
      {
        "text": "phẳng",
        "startMs": 63580,
        "endMs": 63910
      },
      {
        "text": "chúng",
        "startMs": 63910,
        "endMs": 64440
      }
    ],
    "highlightKeywords": [
      "san phẳng chúng"
    ]
  },
  {
    "id": 45,
    "scene": 11,
    "startMs": 64440,
    "endMs": 65630,
    "text": "và nhiều nhà sử học ước tính",
    "tokens": [
      {
        "text": "và",
        "startMs": 64440,
        "endMs": 64470
      },
      {
        "text": "nhiều",
        "startMs": 64470,
        "endMs": 64740
      },
      {
        "text": "nhà",
        "startMs": 64740,
        "endMs": 64890
      },
      {
        "text": "sử",
        "startMs": 64890,
        "endMs": 65030
      },
      {
        "text": "học",
        "startMs": 65030,
        "endMs": 65220
      },
      {
        "text": "ước",
        "startMs": 65220,
        "endMs": 65480
      },
      {
        "text": "tính",
        "startMs": 65480,
        "endMs": 65630
      }
    ],
    "highlightKeywords": [
      "nhà sử học"
    ]
  },
  {
    "id": 46,
    "scene": 11,
    "startMs": 65630,
    "endMs": 66940,
    "text": "hàng triệu người đã thiệt mạng",
    "tokens": [
      {
        "text": "hàng",
        "startMs": 65630,
        "endMs": 65820
      },
      {
        "text": "triệu",
        "startMs": 65820,
        "endMs": 66080
      },
      {
        "text": "người",
        "startMs": 66080,
        "endMs": 66440
      },
      {
        "text": "đã",
        "startMs": 66440,
        "endMs": 66540
      },
      {
        "text": "thiệt",
        "startMs": 66540,
        "endMs": 66830
      },
      {
        "text": "mạng",
        "startMs": 66830,
        "endMs": 66940
      }
    ],
    "highlightKeywords": [
      "hàng triệu người",
      "thiệt mạng"
    ]
  },
  {
    "id": 47,
    "scene": 11,
    "startMs": 66940,
    "endMs": 68220,
    "text": "trong các cuộc chinh phạt.",
    "tokens": [
      {
        "text": "trong",
        "startMs": 66940,
        "endMs": 67140
      },
      {
        "text": "các",
        "startMs": 67140,
        "endMs": 67300
      },
      {
        "text": "cuộc",
        "startMs": 67300,
        "endMs": 67510
      },
      {
        "text": "chinh",
        "startMs": 67510,
        "endMs": 67760
      },
      {
        "text": "phạt",
        "startMs": 67760,
        "endMs": 68220
      }
    ],
    "highlightKeywords": [
      "chinh phạt"
    ]
  },
  {
    "id": 48,
    "scene": 11,
    "startMs": 68220,
    "endMs": 70480,
    "text": "Con số chính xác vẫn còn tranh cãi.",
    "tokens": [
      {
        "text": "Con",
        "startMs": 68220,
        "endMs": 68430
      },
      {
        "text": "số",
        "startMs": 68430,
        "endMs": 68630
      },
      {
        "text": "chính",
        "startMs": 68630,
        "endMs": 68980
      },
      {
        "text": "xác",
        "startMs": 68980,
        "endMs": 69280
      },
      {
        "text": "vẫn",
        "startMs": 69280,
        "endMs": 69490
      },
      {
        "text": "còn",
        "startMs": 69490,
        "endMs": 69690
      },
      {
        "text": "tranh",
        "startMs": 69690,
        "endMs": 69970
      },
      {
        "text": "cãi",
        "startMs": 69970,
        "endMs": 70480
      }
    ],
    "highlightKeywords": [
      "vẫn còn tranh cãi"
    ]
  },
  {
    "id": 49,
    "scene": 12,
    "startMs": 70480,
    "endMs": 71940,
    "text": "Ông qua đời năm 1227",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 70480,
        "endMs": 70520
      },
      {
        "text": "qua",
        "startMs": 70520,
        "endMs": 70690
      },
      {
        "text": "đời",
        "startMs": 70690,
        "endMs": 71030
      },
      {
        "text": "năm",
        "startMs": 71030,
        "endMs": 71260
      },
      {
        "text": "1227",
        "startMs": 71260,
        "endMs": 71940
      }
    ],
    "highlightKeywords": [
      "qua đời năm 1227"
    ]
  },
  {
    "id": 50,
    "scene": 12,
    "startMs": 71940,
    "endMs": 73940,
    "text": "trong chiến dịch chống Tây Hạ,",
    "tokens": [
      {
        "text": "trong",
        "startMs": 71940,
        "endMs": 72210
      },
      {
        "text": "chiến",
        "startMs": 72210,
        "endMs": 72620
      },
      {
        "text": "dịch",
        "startMs": 72620,
        "endMs": 72950
      },
      {
        "text": "chống",
        "startMs": 72950,
        "endMs": 73260
      },
      {
        "text": "Tây",
        "startMs": 73260,
        "endMs": 73450
      },
      {
        "text": "Hạ",
        "startMs": 73450,
        "endMs": 73940
      }
    ],
    "highlightKeywords": [
      "chống Tây Hạ"
    ]
  },
  {
    "id": 51,
    "scene": 12,
    "startMs": 73940,
    "endMs": 76020,
    "text": "nguyên nhân vẫn chưa ai chắc chắn.",
    "tokens": [
      {
        "text": "nguyên",
        "startMs": 73940,
        "endMs": 74310
      },
      {
        "text": "nhân",
        "startMs": 74310,
        "endMs": 74620
      },
      {
        "text": "vẫn",
        "startMs": 74620,
        "endMs": 74850
      },
      {
        "text": "chưa",
        "startMs": 74850,
        "endMs": 75120
      },
      {
        "text": "ai",
        "startMs": 75120,
        "endMs": 75220
      },
      {
        "text": "chắc",
        "startMs": 75220,
        "endMs": 75630
      },
      {
        "text": "chắn",
        "startMs": 75630,
        "endMs": 76020
      }
    ],
    "highlightKeywords": [
      "chưa ai chắc chắn"
    ]
  },
  {
    "id": 52,
    "scene": 13,
    "startMs": 76020,
    "endMs": 77100,
    "text": "Nơi chôn cất ông",
    "tokens": [
      {
        "text": "Nơi",
        "startMs": 76020,
        "endMs": 76270
      },
      {
        "text": "chôn",
        "startMs": 76270,
        "endMs": 76610
      },
      {
        "text": "cất",
        "startMs": 76610,
        "endMs": 76880
      },
      {
        "text": "ông",
        "startMs": 76880,
        "endMs": 77100
      }
    ],
    "highlightKeywords": [
      "chôn cất"
    ]
  },
  {
    "id": 53,
    "scene": 13,
    "startMs": 77100,
    "endMs": 79000,
    "text": "cho đến nay vẫn là bí ẩn.",
    "tokens": [
      {
        "text": "cho",
        "startMs": 77100,
        "endMs": 77280
      },
      {
        "text": "đến",
        "startMs": 77280,
        "endMs": 77640
      },
      {
        "text": "nay",
        "startMs": 77640,
        "endMs": 77810
      },
      {
        "text": "vẫn",
        "startMs": 77810,
        "endMs": 78300
      },
      {
        "text": "là",
        "startMs": 78300,
        "endMs": 78300
      },
      {
        "text": "bí",
        "startMs": 78300,
        "endMs": 78540
      },
      {
        "text": "ẩn",
        "startMs": 78540,
        "endMs": 79000
      }
    ],
    "highlightKeywords": [
      "vẫn là bí ẩn"
    ]
  },
  {
    "id": 54,
    "scene": 13,
    "startMs": 79160,
    "endMs": 80090,
    "text": "Theo truyền thuyết,",
    "tokens": [
      {
        "text": "Theo",
        "startMs": 79160,
        "endMs": 79170
      },
      {
        "text": "truyền",
        "startMs": 79170,
        "endMs": 79480
      },
      {
        "text": "thuyết",
        "startMs": 79480,
        "endMs": 80090
      }
    ],
    "highlightKeywords": [
      "truyền thuyết"
    ]
  },
  {
    "id": 55,
    "scene": 13,
    "startMs": 80090,
    "endMs": 81350,
    "text": "mộ ông được giấu kín,",
    "tokens": [
      {
        "text": "mộ",
        "startMs": 80090,
        "endMs": 80120
      },
      {
        "text": "ông",
        "startMs": 80120,
        "endMs": 80300
      },
      {
        "text": "được",
        "startMs": 80300,
        "endMs": 80620
      },
      {
        "text": "giấu",
        "startMs": 80620,
        "endMs": 80860
      },
      {
        "text": "kín",
        "startMs": 80860,
        "endMs": 81350
      }
    ],
    "highlightKeywords": [
      "giấu kín"
    ]
  },
  {
    "id": 56,
    "scene": 13,
    "startMs": 81350,
    "endMs": 83330,
    "text": "nhưng chi tiết này chưa được kiểm chứng.",
    "tokens": [
      {
        "text": "nhưng",
        "startMs": 81350,
        "endMs": 81430
      },
      {
        "text": "chi",
        "startMs": 81430,
        "endMs": 81470
      },
      {
        "text": "tiết",
        "startMs": 81470,
        "endMs": 81710
      },
      {
        "text": "này",
        "startMs": 81710,
        "endMs": 81870
      },
      {
        "text": "chưa",
        "startMs": 81870,
        "endMs": 82080
      },
      {
        "text": "được",
        "startMs": 82080,
        "endMs": 82410
      },
      {
        "text": "kiểm",
        "startMs": 82410,
        "endMs": 82650
      },
      {
        "text": "chứng",
        "startMs": 82650,
        "endMs": 83330
      }
    ],
    "highlightKeywords": [
      "chưa được kiểm chứng"
    ]
  },
  {
    "id": 57,
    "scene": 14,
    "startMs": 83330,
    "endMs": 85370,
    "text": "Có một điều còn tồn tại đến tận hôm nay:",
    "tokens": [
      {
        "text": "Có",
        "startMs": 83330,
        "endMs": 83510
      },
      {
        "text": "một",
        "startMs": 83510,
        "endMs": 83550
      },
      {
        "text": "điều",
        "startMs": 83550,
        "endMs": 83860
      },
      {
        "text": "còn",
        "startMs": 83860,
        "endMs": 84000
      },
      {
        "text": "tồn",
        "startMs": 84000,
        "endMs": 84200
      },
      {
        "text": "tại",
        "startMs": 84200,
        "endMs": 84460
      },
      {
        "text": "đến",
        "startMs": 84460,
        "endMs": 84720
      },
      {
        "text": "tận",
        "startMs": 84720,
        "endMs": 84890
      },
      {
        "text": "hôm",
        "startMs": 84890,
        "endMs": 85060
      },
      {
        "text": "nay",
        "startMs": 85060,
        "endMs": 85370
      }
    ],
    "highlightKeywords": [
      "tồn tại đến hôm nay"
    ]
  },
  {
    "id": 58,
    "scene": 14,
    "startMs": 85370,
    "endMs": 87990,
    "text": "một nghiên cứu di truyền năm 2003 cho thấy",
    "tokens": [
      {
        "text": "một",
        "startMs": 85370,
        "endMs": 85590
      },
      {
        "text": "nghiên",
        "startMs": 85590,
        "endMs": 85940
      },
      {
        "text": "cứu",
        "startMs": 85940,
        "endMs": 86190
      },
      {
        "text": "di",
        "startMs": 86190,
        "endMs": 86340
      },
      {
        "text": "truyền",
        "startMs": 86340,
        "endMs": 86740
      },
      {
        "text": "năm",
        "startMs": 86740,
        "endMs": 86950
      },
      {
        "text": "2003",
        "startMs": 86950,
        "endMs": 87690
      },
      {
        "text": "cho",
        "startMs": 87690,
        "endMs": 87740
      },
      {
        "text": "thấy",
        "startMs": 87740,
        "endMs": 87990
      }
    ],
    "highlightKeywords": [
      "nghiên cứu di truyền",
      "2003"
    ]
  },
  {
    "id": 59,
    "scene": 14,
    "startMs": 87990,
    "endMs": 89330,
    "text": "dòng gen Y hiếm gặp,",
    "tokens": [
      {
        "text": "dòng",
        "startMs": 87990,
        "endMs": 88240
      },
      {
        "text": "gen",
        "startMs": 88240,
        "endMs": 88390
      },
      {
        "text": "Y",
        "startMs": 88390,
        "endMs": 88460
      },
      {
        "text": "hiếm",
        "startMs": 88460,
        "endMs": 88740
      },
      {
        "text": "gặp",
        "startMs": 88740,
        "endMs": 89330
      }
    ],
    "highlightKeywords": [
      "dòng gen Y hiếm gặp"
    ]
  },
  {
    "id": 60,
    "scene": 14,
    "startMs": 89330,
    "endMs": 91360,
    "text": "có thể bắt nguồn từ ông hoặc gia tộc ông,",
    "tokens": [
      {
        "text": "có",
        "startMs": 89330,
        "endMs": 89440
      },
      {
        "text": "thể",
        "startMs": 89440,
        "endMs": 89550
      },
      {
        "text": "bắt",
        "startMs": 89550,
        "endMs": 89780
      },
      {
        "text": "nguồn",
        "startMs": 89780,
        "endMs": 90070
      },
      {
        "text": "từ",
        "startMs": 90070,
        "endMs": 90220
      },
      {
        "text": "ông",
        "startMs": 90220,
        "endMs": 90390
      },
      {
        "text": "hoặc",
        "startMs": 90390,
        "endMs": 90640
      },
      {
        "text": "gia",
        "startMs": 90640,
        "endMs": 90760
      },
      {
        "text": "tộc",
        "startMs": 90760,
        "endMs": 90930
      },
      {
        "text": "ông",
        "startMs": 90930,
        "endMs": 91360
      }
    ],
    "highlightKeywords": [
      "gia tộc ông"
    ]
  },
  {
    "id": 61,
    "scene": 14,
    "startMs": 91360,
    "endMs": 93010,
    "text": "hiện diện ở khoảng 16 triệu đàn ông",
    "tokens": [
      {
        "text": "hiện",
        "startMs": 91360,
        "endMs": 91400
      },
      {
        "text": "diện",
        "startMs": 91400,
        "endMs": 91610
      },
      {
        "text": "ở",
        "startMs": 91610,
        "endMs": 91740
      },
      {
        "text": "khoảng",
        "startMs": 91740,
        "endMs": 92080
      },
      {
        "text": "16",
        "startMs": 92080,
        "endMs": 92340
      },
      {
        "text": "triệu",
        "startMs": 92340,
        "endMs": 92630
      },
      {
        "text": "đàn",
        "startMs": 92630,
        "endMs": 92850
      },
      {
        "text": "ông",
        "startMs": 92850,
        "endMs": 93010
      }
    ],
    "highlightKeywords": [
      "16 triệu đàn ông"
    ]
  },
  {
    "id": 62,
    "scene": 14,
    "startMs": 93010,
    "endMs": 93960,
    "text": "trên khắp châu Á.",
    "tokens": [
      {
        "text": "trên",
        "startMs": 93010,
        "endMs": 93300
      },
      {
        "text": "khắp",
        "startMs": 93300,
        "endMs": 93490
      },
      {
        "text": "châu",
        "startMs": 93490,
        "endMs": 93960
      },
      {
        "text": "Á",
        "startMs": 93960,
        "endMs": 93960
      }
    ],
    "highlightKeywords": [
      "khắp châu Á"
    ]
  },
  {
    "id": 63,
    "scene": 15,
    "startMs": 93960,
    "endMs": 96070,
    "text": "Người đàn ông bị bỏ rơi giữa thảo nguyên,",
    "tokens": [
      {
        "text": "Người",
        "startMs": 93960,
        "endMs": 94280
      },
      {
        "text": "đàn",
        "startMs": 94280,
        "endMs": 94480
      },
      {
        "text": "ông",
        "startMs": 94480,
        "endMs": 94640
      },
      {
        "text": "bị",
        "startMs": 94640,
        "endMs": 94800
      },
      {
        "text": "bỏ",
        "startMs": 94800,
        "endMs": 94970
      },
      {
        "text": "rơi",
        "startMs": 94970,
        "endMs": 95120
      },
      {
        "text": "giữa",
        "startMs": 95120,
        "endMs": 95360
      },
      {
        "text": "thảo",
        "startMs": 95360,
        "endMs": 95600
      },
      {
        "text": "nguyên",
        "startMs": 95600,
        "endMs": 96070
      }
    ],
    "highlightKeywords": [
      "bị bỏ rơi",
      "thảo nguyên"
    ]
  },
  {
    "id": 64,
    "scene": 15,
    "startMs": 96070,
    "endMs": 97960,
    "text": "để rồi dựng nên đế chế lớn nhất lịch sử,",
    "tokens": [
      {
        "text": "để",
        "startMs": 96070,
        "endMs": 96080
      },
      {
        "text": "rồi",
        "startMs": 96080,
        "endMs": 96280
      },
      {
        "text": "dựng",
        "startMs": 96280,
        "endMs": 96560
      },
      {
        "text": "nên",
        "startMs": 96560,
        "endMs": 96680
      },
      {
        "text": "đế",
        "startMs": 96680,
        "endMs": 96920
      },
      {
        "text": "chế",
        "startMs": 96920,
        "endMs": 97080
      },
      {
        "text": "lớn",
        "startMs": 97080,
        "endMs": 97280
      },
      {
        "text": "nhất",
        "startMs": 97280,
        "endMs": 97540
      },
      {
        "text": "lịch",
        "startMs": 97540,
        "endMs": 97760
      },
      {
        "text": "sử",
        "startMs": 97760,
        "endMs": 97960
      }
    ],
    "highlightKeywords": [
      "đế chế lớn nhất lịch sử"
    ]
  },
  {
    "id": 65,
    "scene": 15,
    "startMs": 97960,
    "endMs": 99580,
    "text": "và còn để lại dấu vết trong gen",
    "tokens": [
      {
        "text": "và",
        "startMs": 97960,
        "endMs": 98250
      },
      {
        "text": "còn",
        "startMs": 98250,
        "endMs": 98290
      },
      {
        "text": "để",
        "startMs": 98290,
        "endMs": 98520
      },
      {
        "text": "lại",
        "startMs": 98520,
        "endMs": 98750
      },
      {
        "text": "dấu",
        "startMs": 98750,
        "endMs": 98980
      },
      {
        "text": "vết",
        "startMs": 98980,
        "endMs": 99300
      },
      {
        "text": "trong",
        "startMs": 99300,
        "endMs": 99440
      },
      {
        "text": "gen",
        "startMs": 99440,
        "endMs": 99580
      }
    ],
    "highlightKeywords": [
      "dấu vết trong gen"
    ]
  },
  {
    "id": 66,
    "scene": 15,
    "startMs": 99580,
    "endMs": 100900,
    "text": "của hàng triệu người,",
    "tokens": [
      {
        "text": "của",
        "startMs": 99580,
        "endMs": 99810
      },
      {
        "text": "hàng",
        "startMs": 99810,
        "endMs": 100040
      },
      {
        "text": "triệu",
        "startMs": 100040,
        "endMs": 100370
      },
      {
        "text": "người",
        "startMs": 100370,
        "endMs": 100900
      }
    ],
    "highlightKeywords": [
      "hàng triệu người"
    ]
  },
  {
    "id": 67,
    "scene": 15,
    "startMs": 100900,
    "endMs": 102560,
    "text": "đó chính là Thành Cát Tư Hãn.",
    "tokens": [
      {
        "text": "đó",
        "startMs": 100900,
        "endMs": 101030
      },
      {
        "text": "chính",
        "startMs": 101030,
        "endMs": 101310
      },
      {
        "text": "là",
        "startMs": 101310,
        "endMs": 101450
      },
      {
        "text": "Thành",
        "startMs": 101450,
        "endMs": 101730
      },
      {
        "text": "Cát",
        "startMs": 101730,
        "endMs": 101880
      },
      {
        "text": "Tư",
        "startMs": 101880,
        "endMs": 102000
      },
      {
        "text": "Hãn",
        "startMs": 102000,
        "endMs": 102560
      }
    ],
    "highlightKeywords": [
      "Thành Cát Tư Hãn"
    ]
  }
];
