export type SubtitleToken = {
  text: string;
  startMs: number;
  endMs: number;
};

export type SubtitlePhrase = {
  id: number;
  startMs: number;
  endMs: number;
  text: string;
  tokens: SubtitleToken[];
  highlightKeywords?: string[];
};

export const chaplinSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "startMs": 30,
    "endMs": 1910,
    "text": "Charlie Chaplin là vua hài câm huyền thoại,",
    "tokens": [
      {
        "text": "Charlie",
        "startMs": 30,
        "endMs": 370
      },
      {
        "text": "Chaplin",
        "startMs": 370,
        "endMs": 670
      },
      {
        "text": "là",
        "startMs": 670,
        "endMs": 850
      },
      {
        "text": "vua",
        "startMs": 850,
        "endMs": 1080
      },
      {
        "text": "hài",
        "startMs": 1080,
        "endMs": 1090
      },
      {
        "text": "câm",
        "startMs": 1090,
        "endMs": 1300
      },
      {
        "text": "huyền",
        "startMs": 1300,
        "endMs": 1650
      },
      {
        "text": "thoại",
        "startMs": 1650,
        "endMs": 1910
      }
    ],
    "highlightKeywords": [
      "Charlie Chaplin",
      "vua hài câm"
    ]
  },
  {
    "id": 1,
    "startMs": 1910,
    "endMs": 3590,
    "text": "khiến cả thế giới cười",
    "tokens": [
      {
        "text": "khiến",
        "startMs": 1910,
        "endMs": 2430
      },
      {
        "text": "cả",
        "startMs": 2430,
        "endMs": 2560
      },
      {
        "text": "thế",
        "startMs": 2560,
        "endMs": 2670
      },
      {
        "text": "giới",
        "startMs": 2670,
        "endMs": 2950
      },
      {
        "text": "cười",
        "startMs": 2950,
        "endMs": 3590
      }
    ],
    "highlightKeywords": [
      "cả thế giới cười"
    ]
  },
  {
    "id": 2,
    "startMs": 3590,
    "endMs": 4940,
    "text": "mà không cần nói một lời.",
    "tokens": [
      {
        "text": "mà",
        "startMs": 3590,
        "endMs": 3720
      },
      {
        "text": "không",
        "startMs": 3720,
        "endMs": 3910
      },
      {
        "text": "cần",
        "startMs": 3910,
        "endMs": 4160
      },
      {
        "text": "nói",
        "startMs": 4160,
        "endMs": 4360
      },
      {
        "text": "một",
        "startMs": 4360,
        "endMs": 4620
      },
      {
        "text": "lời",
        "startMs": 4620,
        "endMs": 4940
      }
    ],
    "highlightKeywords": [
      "không cần nói một lời"
    ]
  },
  {
    "id": 3,
    "startMs": 4940,
    "endMs": 6200,
    "text": "Nhưng đời thật của ông",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 4940,
        "endMs": 5310
      },
      {
        "text": "đời",
        "startMs": 5310,
        "endMs": 5500
      },
      {
        "text": "thật",
        "startMs": 5500,
        "endMs": 5780
      },
      {
        "text": "của",
        "startMs": 5780,
        "endMs": 6010
      },
      {
        "text": "ông",
        "startMs": 6010,
        "endMs": 6200
      }
    ],
    "highlightKeywords": [
      "đời thật"
    ]
  },
  {
    "id": 4,
    "startMs": 6200,
    "endMs": 8010,
    "text": "lại chẳng hài hước chút nào.",
    "tokens": [
      {
        "text": "lại",
        "startMs": 6200,
        "endMs": 6490
      },
      {
        "text": "chẳng",
        "startMs": 6490,
        "endMs": 6760
      },
      {
        "text": "hài",
        "startMs": 6760,
        "endMs": 6990
      },
      {
        "text": "hước",
        "startMs": 6990,
        "endMs": 7320
      },
      {
        "text": "chút",
        "startMs": 7320,
        "endMs": 7530
      },
      {
        "text": "nào",
        "startMs": 7530,
        "endMs": 8010
      }
    ],
    "highlightKeywords": [
      "chẳng hài hước chút nào"
    ]
  },
  {
    "id": 5,
    "startMs": 8010,
    "endMs": 10180,
    "text": "Ông lớn lên trong nghèo đói cùng cực ở London.",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 8010,
        "endMs": 8090
      },
      {
        "text": "lớn",
        "startMs": 8090,
        "endMs": 8270
      },
      {
        "text": "lên",
        "startMs": 8270,
        "endMs": 8420
      },
      {
        "text": "trong",
        "startMs": 8420,
        "endMs": 8610
      },
      {
        "text": "nghèo",
        "startMs": 8610,
        "endMs": 8820
      },
      {
        "text": "đói",
        "startMs": 8820,
        "endMs": 9050
      },
      {
        "text": "cùng",
        "startMs": 9050,
        "endMs": 9230
      },
      {
        "text": "cực",
        "startMs": 9230,
        "endMs": 9400
      },
      {
        "text": "ở",
        "startMs": 9400,
        "endMs": 9510
      },
      {
        "text": "London",
        "startMs": 9510,
        "endMs": 10180
      }
    ],
    "highlightKeywords": [
      "nghèo đói cùng cực",
      "London"
    ]
  },
  {
    "id": 6,
    "startMs": 10180,
    "endMs": 11650,
    "text": "Mẹ bị bệnh tâm thần,",
    "tokens": [
      {
        "text": "Mẹ",
        "startMs": 10180,
        "endMs": 10440
      },
      {
        "text": "bị",
        "startMs": 10440,
        "endMs": 10600
      },
      {
        "text": "bệnh",
        "startMs": 10600,
        "endMs": 10910
      },
      {
        "text": "tâm",
        "startMs": 10910,
        "endMs": 11090
      },
      {
        "text": "thần",
        "startMs": 11090,
        "endMs": 11650
      }
    ],
    "highlightKeywords": [
      "bệnh tâm thần"
    ]
  },
  {
    "id": 7,
    "startMs": 11650,
    "endMs": 12920,
    "text": "phải vào trại tế bần,",
    "tokens": [
      {
        "text": "phải",
        "startMs": 11650,
        "endMs": 11780
      },
      {
        "text": "vào",
        "startMs": 11780,
        "endMs": 11980
      },
      {
        "text": "trại",
        "startMs": 11980,
        "endMs": 12280
      },
      {
        "text": "tế",
        "startMs": 12280,
        "endMs": 12470
      },
      {
        "text": "bần",
        "startMs": 12470,
        "endMs": 12920
      }
    ],
    "highlightKeywords": [
      "trại tế bần"
    ]
  },
  {
    "id": 8,
    "startMs": 12920,
    "endMs": 13680,
    "text": "còn cậu bé Chaplin",
    "tokens": [
      {
        "text": "còn",
        "startMs": 12920,
        "endMs": 13040
      },
      {
        "text": "cậu",
        "startMs": 13040,
        "endMs": 13280
      },
      {
        "text": "bé",
        "startMs": 13280,
        "endMs": 13430
      },
      {
        "text": "Chaplin",
        "startMs": 13430,
        "endMs": 13680
      }
    ],
    "highlightKeywords": [
      "cậu bé Chaplin"
    ]
  },
  {
    "id": 9,
    "startMs": 13680,
    "endMs": 15050,
    "text": "tự bươn chải trên đường phố",
    "tokens": [
      {
        "text": "tự",
        "startMs": 13680,
        "endMs": 13840
      },
      {
        "text": "bươn",
        "startMs": 13840,
        "endMs": 14040
      },
      {
        "text": "chải",
        "startMs": 14040,
        "endMs": 14280
      },
      {
        "text": "trên",
        "startMs": 14280,
        "endMs": 14480
      },
      {
        "text": "đường",
        "startMs": 14480,
        "endMs": 14890
      },
      {
        "text": "phố",
        "startMs": 14890,
        "endMs": 15050
      }
    ],
    "highlightKeywords": [
      "tự bươn chải",
      "đường phố"
    ]
  },
  {
    "id": 10,
    "startMs": 15050,
    "endMs": 15860,
    "text": "từ rất nhỏ.",
    "tokens": [
      {
        "text": "từ",
        "startMs": 15050,
        "endMs": 15210
      },
      {
        "text": "rất",
        "startMs": 15210,
        "endMs": 15410
      },
      {
        "text": "nhỏ",
        "startMs": 15410,
        "endMs": 15860
      }
    ],
    "highlightKeywords": [
      "từ rất nhỏ"
    ]
  },
  {
    "id": 11,
    "startMs": 15860,
    "endMs": 18090,
    "text": "Người sau này giàu có bậc nhất Hollywood",
    "tokens": [
      {
        "text": "Người",
        "startMs": 15860,
        "endMs": 16240
      },
      {
        "text": "sau",
        "startMs": 16240,
        "endMs": 16380
      },
      {
        "text": "này",
        "startMs": 16380,
        "endMs": 16570
      },
      {
        "text": "giàu",
        "startMs": 16570,
        "endMs": 16800
      },
      {
        "text": "có",
        "startMs": 16800,
        "endMs": 16940
      },
      {
        "text": "bậc",
        "startMs": 16940,
        "endMs": 17170
      },
      {
        "text": "nhất",
        "startMs": 17170,
        "endMs": 17460
      },
      {
        "text": "Hollywood",
        "startMs": 17460,
        "endMs": 18090
      }
    ],
    "highlightKeywords": [
      "giàu có bậc nhất",
      "Hollywood"
    ]
  },
  {
    "id": 12,
    "startMs": 18090,
    "endMs": 19340,
    "text": "từng không có nổi bữa ăn no",
    "tokens": [
      {
        "text": "từng",
        "startMs": 18090,
        "endMs": 18180
      },
      {
        "text": "không",
        "startMs": 18180,
        "endMs": 18500
      },
      {
        "text": "có",
        "startMs": 18500,
        "endMs": 18610
      },
      {
        "text": "nổi",
        "startMs": 18610,
        "endMs": 18840
      },
      {
        "text": "bữa",
        "startMs": 18840,
        "endMs": 19070
      },
      {
        "text": "ăn",
        "startMs": 19070,
        "endMs": 19160
      },
      {
        "text": "no",
        "startMs": 19160,
        "endMs": 19340
      }
    ],
    "highlightKeywords": [
      "không có nổi bữa ăn no"
    ]
  },
  {
    "id": 13,
    "startMs": 19250,
    "endMs": 20120,
    "text": "thời thơ ấu.",
    "tokens": [
      {
        "text": "thời",
        "startMs": 19250,
        "endMs": 19540
      },
      {
        "text": "thơ",
        "startMs": 19540,
        "endMs": 19770
      },
      {
        "text": "ấu",
        "startMs": 19770,
        "endMs": 20120
      }
    ],
    "highlightKeywords": [
      "thời thơ ấu"
    ]
  },
  {
    "id": 14,
    "startMs": 20120,
    "endMs": 22600,
    "text": "Bộ ria mép và chiếc gậy huyền thoại của 'The Tramp'",
    "tokens": [
      {
        "text": "Bộ",
        "startMs": 20120,
        "endMs": 20320
      },
      {
        "text": "ria",
        "startMs": 20320,
        "endMs": 20395
      },
      {
        "text": "mép",
        "startMs": 20395,
        "endMs": 20470
      },
      {
        "text": "và",
        "startMs": 20470,
        "endMs": 20620
      },
      {
        "text": "chiếc",
        "startMs": 20620,
        "endMs": 20890
      },
      {
        "text": "gậy",
        "startMs": 20890,
        "endMs": 21070
      },
      {
        "text": "huyền",
        "startMs": 21070,
        "endMs": 21430
      },
      {
        "text": "thoại",
        "startMs": 21430,
        "endMs": 21790
      },
      {
        "text": "của",
        "startMs": 21790,
        "endMs": 22050
      },
      {
        "text": "The",
        "startMs": 22050,
        "endMs": 22242
      },
      {
        "text": "Tramp",
        "startMs": 22242,
        "endMs": 22600
      }
    ],
    "highlightKeywords": [
      "Bộ ria mép",
      "chiếc gậy",
      "The Tramp"
    ]
  },
  {
    "id": 15,
    "startMs": 22600,
    "endMs": 23580,
    "text": "thực ra chỉ là trang phục",
    "tokens": [
      {
        "text": "thực",
        "startMs": 22600,
        "endMs": 22790
      },
      {
        "text": "ra",
        "startMs": 22790,
        "endMs": 22860
      },
      {
        "text": "chỉ",
        "startMs": 22860,
        "endMs": 23050
      },
      {
        "text": "là",
        "startMs": 23050,
        "endMs": 23160
      },
      {
        "text": "trang",
        "startMs": 23160,
        "endMs": 23340
      },
      {
        "text": "phục",
        "startMs": 23340,
        "endMs": 23580
      }
    ],
    "highlightKeywords": [
      "trang phục"
    ]
  },
  {
    "id": 16,
    "startMs": 23580,
    "endMs": 25550,
    "text": "ông mặc vội trong vài phút trước khi quay,",
    "tokens": [
      {
        "text": "ông",
        "startMs": 23580,
        "endMs": 23710
      },
      {
        "text": "mặc",
        "startMs": 23710,
        "endMs": 23890
      },
      {
        "text": "vội",
        "startMs": 23890,
        "endMs": 24070
      },
      {
        "text": "trong",
        "startMs": 24070,
        "endMs": 24260
      },
      {
        "text": "vài",
        "startMs": 24260,
        "endMs": 24440
      },
      {
        "text": "phút",
        "startMs": 24440,
        "endMs": 24620
      },
      {
        "text": "trước",
        "startMs": 24620,
        "endMs": 24920
      },
      {
        "text": "khi",
        "startMs": 24920,
        "endMs": 25030
      },
      {
        "text": "quay",
        "startMs": 25030,
        "endMs": 25550
      }
    ],
    "highlightKeywords": [
      "mặc vội trong vài phút"
    ]
  },
  {
    "id": 17,
    "startMs": 25550,
    "endMs": 26600,
    "text": "không hề có kế hoạch.",
    "tokens": [
      {
        "text": "không",
        "startMs": 25550,
        "endMs": 25660
      },
      {
        "text": "hề",
        "startMs": 25660,
        "endMs": 25870
      },
      {
        "text": "có",
        "startMs": 25870,
        "endMs": 25990
      },
      {
        "text": "kế",
        "startMs": 25990,
        "endMs": 26160
      },
      {
        "text": "hoạch",
        "startMs": 26160,
        "endMs": 26600
      }
    ],
    "highlightKeywords": [
      "không hề có kế hoạch"
    ]
  },
  {
    "id": 18,
    "startMs": 26600,
    "endMs": 28360,
    "text": "Ghép ngẫu nhiên vài món đồ không ăn khớp,",
    "tokens": [
      {
        "text": "Ghép",
        "startMs": 26600,
        "endMs": 26820
      },
      {
        "text": "ngẫu",
        "startMs": 26820,
        "endMs": 27000
      },
      {
        "text": "nhiên",
        "startMs": 27000,
        "endMs": 27240
      },
      {
        "text": "vài",
        "startMs": 27240,
        "endMs": 27400
      },
      {
        "text": "món",
        "startMs": 27400,
        "endMs": 27560
      },
      {
        "text": "đồ",
        "startMs": 27560,
        "endMs": 27760
      },
      {
        "text": "không",
        "startMs": 27760,
        "endMs": 28020
      },
      {
        "text": "ăn",
        "startMs": 28020,
        "endMs": 28120
      },
      {
        "text": "khớp",
        "startMs": 28120,
        "endMs": 28360
      }
    ],
    "highlightKeywords": [
      "Ghép ngẫu nhiên",
      "không ăn khớp"
    ]
  },
  {
    "id": 19,
    "startMs": 28360,
    "endMs": 30520,
    "text": "và nhân vật biểu tượng nhất lịch sử điện ảnh",
    "tokens": [
      {
        "text": "và",
        "startMs": 28360,
        "endMs": 28680
      },
      {
        "text": "nhân",
        "startMs": 28680,
        "endMs": 28720
      },
      {
        "text": "vật",
        "startMs": 28720,
        "endMs": 28880
      },
      {
        "text": "biểu",
        "startMs": 28880,
        "endMs": 29120
      },
      {
        "text": "tượng",
        "startMs": 29120,
        "endMs": 29430
      },
      {
        "text": "nhất",
        "startMs": 29430,
        "endMs": 29680
      },
      {
        "text": "lịch",
        "startMs": 29680,
        "endMs": 29920
      },
      {
        "text": "sử",
        "startMs": 29920,
        "endMs": 30080
      },
      {
        "text": "điện",
        "startMs": 30080,
        "endMs": 30320
      },
      {
        "text": "ảnh",
        "startMs": 30320,
        "endMs": 30520
      }
    ],
    "highlightKeywords": [
      "biểu tượng nhất",
      "lịch sử điện ảnh"
    ]
  },
  {
    "id": 20,
    "startMs": 30520,
    "endMs": 31380,
    "text": "ra đời như vậy.",
    "tokens": [
      {
        "text": "ra",
        "startMs": 30520,
        "endMs": 30600
      },
      {
        "text": "đời",
        "startMs": 30600,
        "endMs": 30840
      },
      {
        "text": "như",
        "startMs": 30840,
        "endMs": 30990
      },
      {
        "text": "vậy",
        "startMs": 30990,
        "endMs": 31380
      }
    ],
    "highlightKeywords": [
      "ra đời như vậy"
    ]
  },
  {
    "id": 21,
    "startMs": 31380,
    "endMs": 32540,
    "text": "Chi tiết gây sốc nhất:",
    "tokens": [
      {
        "text": "Chi",
        "startMs": 31380,
        "endMs": 31580
      },
      {
        "text": "tiết",
        "startMs": 31580,
        "endMs": 31820
      },
      {
        "text": "gây",
        "startMs": 31820,
        "endMs": 31980
      },
      {
        "text": "sốc",
        "startMs": 31980,
        "endMs": 32180
      },
      {
        "text": "nhất",
        "startMs": 32180,
        "endMs": 32540
      }
    ],
    "highlightKeywords": [
      "gây sốc nhất"
    ]
  },
  {
    "id": 22,
    "startMs": 32540,
    "endMs": 33900,
    "text": "Chaplin kết hôn 4 lần,",
    "tokens": [
      {
        "text": "Chaplin",
        "startMs": 32540,
        "endMs": 32780
      },
      {
        "text": "kết",
        "startMs": 32780,
        "endMs": 32980
      },
      {
        "text": "hôn",
        "startMs": 32980,
        "endMs": 33140
      },
      {
        "text": "4",
        "startMs": 33140,
        "endMs": 33340
      },
      {
        "text": "lần",
        "startMs": 33340,
        "endMs": 33900
      }
    ],
    "highlightKeywords": [
      "kết hôn 4 lần"
    ]
  },
  {
    "id": 23,
    "startMs": 33900,
    "endMs": 35220,
    "text": "nhiều cuộc hôn nhân vướng tranh cãi",
    "tokens": [
      {
        "text": "nhiều",
        "startMs": 33900,
        "endMs": 33970
      },
      {
        "text": "cuộc",
        "startMs": 33970,
        "endMs": 34180
      },
      {
        "text": "hôn",
        "startMs": 34180,
        "endMs": 34340
      },
      {
        "text": "nhân",
        "startMs": 34340,
        "endMs": 34540
      },
      {
        "text": "vướng",
        "startMs": 34540,
        "endMs": 34860
      },
      {
        "text": "tranh",
        "startMs": 34860,
        "endMs": 35060
      },
      {
        "text": "cãi",
        "startMs": 35060,
        "endMs": 35220
      }
    ],
    "highlightKeywords": [
      "vướng tranh cãi"
    ]
  },
  {
    "id": 24,
    "startMs": 35220,
    "endMs": 36620,
    "text": "vì chênh lệch tuổi tác lớn.",
    "tokens": [
      {
        "text": "vì",
        "startMs": 35220,
        "endMs": 35370
      },
      {
        "text": "chênh",
        "startMs": 35370,
        "endMs": 35540
      },
      {
        "text": "lệch",
        "startMs": 35540,
        "endMs": 35810
      },
      {
        "text": "tuổi",
        "startMs": 35810,
        "endMs": 36020
      },
      {
        "text": "tác",
        "startMs": 36020,
        "endMs": 36340
      },
      {
        "text": "lớn",
        "startMs": 36340,
        "endMs": 36620
      }
    ],
    "highlightKeywords": [
      "chênh lệch tuổi tác lớn"
    ]
  },
  {
    "id": 25,
    "startMs": 36620,
    "endMs": 37830,
    "text": "Cuộc hôn nhân cuối,",
    "tokens": [
      {
        "text": "Cuộc",
        "startMs": 36620,
        "endMs": 36920
      },
      {
        "text": "hôn",
        "startMs": 36920,
        "endMs": 37220
      },
      {
        "text": "nhân",
        "startMs": 37220,
        "endMs": 37430
      },
      {
        "text": "cuối",
        "startMs": 37430,
        "endMs": 37830
      }
    ],
    "highlightKeywords": [
      "Cuộc hôn nhân cuối"
    ]
  },
  {
    "id": 26,
    "startMs": 37830,
    "endMs": 39820,
    "text": "ông 54 tuổi còn vợ mới 18 —",
    "tokens": [
      {
        "text": "ông",
        "startMs": 37830,
        "endMs": 38030
      },
      {
        "text": "54",
        "startMs": 38030,
        "endMs": 38380
      },
      {
        "text": "tuổi",
        "startMs": 38380,
        "endMs": 38690
      },
      {
        "text": "còn",
        "startMs": 38690,
        "endMs": 38840
      },
      {
        "text": "vợ",
        "startMs": 38840,
        "endMs": 39040
      },
      {
        "text": "mới",
        "startMs": 39040,
        "endMs": 39240
      },
      {
        "text": "18",
        "startMs": 39240,
        "endMs": 39820
      }
    ],
    "highlightKeywords": [
      "54 tuổi",
      "vợ mới 18"
    ]
  },
  {
    "id": 27,
    "startMs": 39820,
    "endMs": 40410,
    "text": "trớ trêu thay,",
    "tokens": [
      {
        "text": "trớ",
        "startMs": 39820,
        "endMs": 39960
      },
      {
        "text": "trêu",
        "startMs": 39960,
        "endMs": 40260
      },
      {
        "text": "thay",
        "startMs": 40260,
        "endMs": 40410
      }
    ],
    "highlightKeywords": [
      "trớ trêu thay"
    ]
  },
  {
    "id": 28,
    "startMs": 40410,
    "endMs": 42050,
    "text": "lại là cuộc hôn nhân hạnh phúc",
    "tokens": [
      {
        "text": "lại",
        "startMs": 40410,
        "endMs": 40760
      },
      {
        "text": "là",
        "startMs": 40760,
        "endMs": 40860
      },
      {
        "text": "cuộc",
        "startMs": 40860,
        "endMs": 41020
      },
      {
        "text": "hôn",
        "startMs": 41020,
        "endMs": 41290
      },
      {
        "text": "nhân",
        "startMs": 41290,
        "endMs": 41450
      },
      {
        "text": "hạnh",
        "startMs": 41450,
        "endMs": 41710
      },
      {
        "text": "phúc",
        "startMs": 41710,
        "endMs": 42050
      }
    ],
    "highlightKeywords": [
      "hạnh phúc"
    ]
  },
  {
    "id": 29,
    "startMs": 42050,
    "endMs": 43320,
    "text": "và bền lâu nhất đời ông.",
    "tokens": [
      {
        "text": "và",
        "startMs": 42050,
        "endMs": 42090
      },
      {
        "text": "bền",
        "startMs": 42090,
        "endMs": 42220
      },
      {
        "text": "lâu",
        "startMs": 42220,
        "endMs": 42390
      },
      {
        "text": "nhất",
        "startMs": 42390,
        "endMs": 42650
      },
      {
        "text": "đời",
        "startMs": 42650,
        "endMs": 42900
      },
      {
        "text": "ông",
        "startMs": 42900,
        "endMs": 43320
      }
    ],
    "highlightKeywords": [
      "bền lâu nhất đời ông"
    ]
  },
  {
    "id": 30,
    "startMs": 43320,
    "endMs": 45220,
    "text": "Chaplin còn bị FBI theo dõi nhiều năm",
    "tokens": [
      {
        "text": "Chaplin",
        "startMs": 43320,
        "endMs": 43670
      },
      {
        "text": "còn",
        "startMs": 43670,
        "endMs": 43910
      },
      {
        "text": "bị",
        "startMs": 43910,
        "endMs": 44090
      },
      {
        "text": "FBI",
        "startMs": 44090,
        "endMs": 44240
      },
      {
        "text": "theo",
        "startMs": 44240,
        "endMs": 44450
      },
      {
        "text": "dõi",
        "startMs": 44450,
        "endMs": 44650
      },
      {
        "text": "nhiều",
        "startMs": 44650,
        "endMs": 45010
      },
      {
        "text": "năm",
        "startMs": 45010,
        "endMs": 45220
      }
    ],
    "highlightKeywords": [
      "FBI theo dõi",
      "nhiều năm"
    ]
  },
  {
    "id": 31,
    "startMs": 45220,
    "endMs": 47100,
    "text": "vì nghi ngờ liên hệ cộng sản.",
    "tokens": [
      {
        "text": "vì",
        "startMs": 45220,
        "endMs": 45370
      },
      {
        "text": "nghi",
        "startMs": 45370,
        "endMs": 45680
      },
      {
        "text": "ngờ",
        "startMs": 45680,
        "endMs": 45830
      },
      {
        "text": "liên",
        "startMs": 45830,
        "endMs": 46080
      },
      {
        "text": "hệ",
        "startMs": 46080,
        "endMs": 46280
      },
      {
        "text": "cộng",
        "startMs": 46280,
        "endMs": 46590
      },
      {
        "text": "sản",
        "startMs": 46590,
        "endMs": 47100
      }
    ],
    "highlightKeywords": [
      "liên hệ cộng sản"
    ]
  },
  {
    "id": 32,
    "startMs": 47100,
    "endMs": 48840,
    "text": "Năm 1952, chính phủ Mỹ",
    "tokens": [
      {
        "text": "Năm",
        "startMs": 47100,
        "endMs": 47280
      },
      {
        "text": "1952",
        "startMs": 47280,
        "endMs": 47950
      },
      {
        "text": "chính",
        "startMs": 47950,
        "endMs": 48240
      },
      {
        "text": "phủ",
        "startMs": 48240,
        "endMs": 48660
      },
      {
        "text": "Mỹ",
        "startMs": 48660,
        "endMs": 48840
      }
    ],
    "highlightKeywords": [
      "Năm 1952",
      "chính phủ Mỹ"
    ]
  },
  {
    "id": 33,
    "startMs": 48680,
    "endMs": 50100,
    "text": "thu hồi giấy phép nhập cảnh",
    "tokens": [
      {
        "text": "thu",
        "startMs": 48680,
        "endMs": 48800
      },
      {
        "text": "hồi",
        "startMs": 48800,
        "endMs": 49030
      },
      {
        "text": "giấy",
        "startMs": 49030,
        "endMs": 49310
      },
      {
        "text": "phép",
        "startMs": 49310,
        "endMs": 49530
      },
      {
        "text": "nhập",
        "startMs": 49530,
        "endMs": 49820
      },
      {
        "text": "cảnh",
        "startMs": 49820,
        "endMs": 50100
      }
    ],
    "highlightKeywords": [
      "thu hồi giấy phép nhập cảnh"
    ]
  },
  {
    "id": 34,
    "startMs": 50100,
    "endMs": 52030,
    "text": "khi ông đang trên tàu sang châu Âu —",
    "tokens": [
      {
        "text": "khi",
        "startMs": 50100,
        "endMs": 50240
      },
      {
        "text": "ông",
        "startMs": 50240,
        "endMs": 50480
      },
      {
        "text": "đang",
        "startMs": 50480,
        "endMs": 50670
      },
      {
        "text": "trên",
        "startMs": 50670,
        "endMs": 50920
      },
      {
        "text": "tàu",
        "startMs": 50920,
        "endMs": 51080
      },
      {
        "text": "sang",
        "startMs": 51080,
        "endMs": 51290
      },
      {
        "text": "châu",
        "startMs": 51290,
        "endMs": 51500
      },
      {
        "text": "Âu",
        "startMs": 51500,
        "endMs": 52020
      }
    ],
    "highlightKeywords": [
      "tàu sang châu Âu"
    ]
  },
  {
    "id": 35,
    "startMs": 52060,
    "endMs": 52970,
    "text": "vua hài của Hollywood",
    "tokens": [
      {
        "text": "vua",
        "startMs": 52060,
        "endMs": 52190
      },
      {
        "text": "hài",
        "startMs": 52190,
        "endMs": 52290
      },
      {
        "text": "của",
        "startMs": 52290,
        "endMs": 52530
      },
      {
        "text": "Hollywood",
        "startMs": 52530,
        "endMs": 52970
      }
    ],
    "highlightKeywords": [
      "vua hài"
    ]
  },
  {
    "id": 36,
    "startMs": 52970,
    "endMs": 55400,
    "text": "bị chính Hollywood đá văng không thương tiếc.",
    "tokens": [
      {
        "text": "bị",
        "startMs": 52970,
        "endMs": 53310
      },
      {
        "text": "chính",
        "startMs": 53310,
        "endMs": 53480
      },
      {
        "text": "Hollywood",
        "startMs": 53480,
        "endMs": 53890
      },
      {
        "text": "đá",
        "startMs": 53890,
        "endMs": 54120
      },
      {
        "text": "văng",
        "startMs": 54120,
        "endMs": 54260
      },
      {
        "text": "không",
        "startMs": 54260,
        "endMs": 54550
      },
      {
        "text": "thương",
        "startMs": 54550,
        "endMs": 54930
      },
      {
        "text": "tiếc",
        "startMs": 54930,
        "endMs": 55400
      }
    ],
    "highlightKeywords": [
      "đá văng không thương tiếc"
    ]
  },
  {
    "id": 37,
    "startMs": 55400,
    "endMs": 57120,
    "text": "Từ đứa trẻ đói khát ở London,",
    "tokens": [
      {
        "text": "Từ",
        "startMs": 55400,
        "endMs": 55430
      },
      {
        "text": "đứa",
        "startMs": 55430,
        "endMs": 55670
      },
      {
        "text": "trẻ",
        "startMs": 55670,
        "endMs": 55900
      },
      {
        "text": "đói",
        "startMs": 55900,
        "endMs": 56180
      },
      {
        "text": "khát",
        "startMs": 56180,
        "endMs": 56420
      },
      {
        "text": "ở",
        "startMs": 56420,
        "endMs": 56560
      },
      {
        "text": "London",
        "startMs": 56560,
        "endMs": 57120
      }
    ],
    "highlightKeywords": [
      "đói khát ở London"
    ]
  },
  {
    "id": 38,
    "startMs": 57120,
    "endMs": 58600,
    "text": "đến biểu tượng điện ảnh toàn cầu,",
    "tokens": [
      {
        "text": "đến",
        "startMs": 57120,
        "endMs": 57250
      },
      {
        "text": "biểu",
        "startMs": 57250,
        "endMs": 57470
      },
      {
        "text": "tượng",
        "startMs": 57470,
        "endMs": 57760
      },
      {
        "text": "điện",
        "startMs": 57760,
        "endMs": 57980
      },
      {
        "text": "ảnh",
        "startMs": 57980,
        "endMs": 58160
      },
      {
        "text": "toàn",
        "startMs": 58160,
        "endMs": 58370
      },
      {
        "text": "cầu",
        "startMs": 58370,
        "endMs": 58600
      }
    ],
    "highlightKeywords": [
      "biểu tượng điện ảnh toàn cầu"
    ]
  },
  {
    "id": 39,
    "startMs": 58600,
    "endMs": 60550,
    "text": "rồi bị chính nước Mỹ trục xuất —",
    "tokens": [
      {
        "text": "rồi",
        "startMs": 58600,
        "endMs": 58820
      },
      {
        "text": "bị",
        "startMs": 58820,
        "endMs": 59000
      },
      {
        "text": "chính",
        "startMs": 59000,
        "endMs": 59280
      },
      {
        "text": "nước",
        "startMs": 59280,
        "endMs": 59610
      },
      {
        "text": "Mỹ",
        "startMs": 59610,
        "endMs": 59780
      },
      {
        "text": "trục",
        "startMs": 59780,
        "endMs": 60140
      },
      {
        "text": "xuất",
        "startMs": 60140,
        "endMs": 60550
      }
    ],
    "highlightKeywords": [
      "trục xuất"
    ]
  },
  {
    "id": 40,
    "startMs": 60550,
    "endMs": 62490,
    "text": "cuộc đời Charlie Chaplin chứng minh:",
    "tokens": [
      {
        "text": "cuộc",
        "startMs": 60550,
        "endMs": 60690
      },
      {
        "text": "đời",
        "startMs": 60690,
        "endMs": 60950
      },
      {
        "text": "Charlie",
        "startMs": 60950,
        "endMs": 61290
      },
      {
        "text": "Chaplin",
        "startMs": 61290,
        "endMs": 61600
      },
      {
        "text": "chứng",
        "startMs": 61600,
        "endMs": 61920
      },
      {
        "text": "minh",
        "startMs": 61920,
        "endMs": 62490
      }
    ],
    "highlightKeywords": [
      "Charlie Chaplin"
    ]
  },
  {
    "id": 41,
    "startMs": 62490,
    "endMs": 63980,
    "text": "người khiến cả thế giới cười,",
    "tokens": [
      {
        "text": "người",
        "startMs": 62490,
        "endMs": 62620
      },
      {
        "text": "khiến",
        "startMs": 62620,
        "endMs": 62900
      },
      {
        "text": "cả",
        "startMs": 62900,
        "endMs": 63060
      },
      {
        "text": "thế",
        "startMs": 63060,
        "endMs": 63260
      },
      {
        "text": "giới",
        "startMs": 63260,
        "endMs": 63500
      },
      {
        "text": "cười",
        "startMs": 63500,
        "endMs": 63980
      }
    ],
    "highlightKeywords": [
      "cả thế giới cười"
    ]
  },
  {
    "id": 42,
    "startMs": 63980,
    "endMs": 66340,
    "text": "lại sống một cuộc đời chẳng hề dễ dàng.",
    "tokens": [
      {
        "text": "lại",
        "startMs": 63980,
        "endMs": 63990
      },
      {
        "text": "sống",
        "startMs": 63990,
        "endMs": 64220
      },
      {
        "text": "một",
        "startMs": 64220,
        "endMs": 64480
      },
      {
        "text": "cuộc",
        "startMs": 64480,
        "endMs": 64660
      },
      {
        "text": "đời",
        "startMs": 64660,
        "endMs": 64900
      },
      {
        "text": "chẳng",
        "startMs": 64900,
        "endMs": 65180
      },
      {
        "text": "hề",
        "startMs": 65180,
        "endMs": 65340
      },
      {
        "text": "dễ",
        "startMs": 65340,
        "endMs": 65490
      },
      {
        "text": "dàng",
        "startMs": 65490,
        "endMs": 65840
      }
    ],
    "highlightKeywords": [
      "chẳng hề dễ dàng"
    ]
  }
];
