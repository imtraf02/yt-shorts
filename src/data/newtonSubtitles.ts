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

export const newtonSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "startMs": 40,
    "endMs": 1950,
    "text": "Isaac Newton ngồi dưới gốc táo,",
    "tokens": [
      {
        "text": "Isaac",
        "startMs": 40,
        "endMs": 310
      },
      {
        "text": "Newton",
        "startMs": 310,
        "endMs": 590
      },
      {
        "text": "ngồi",
        "startMs": 590,
        "endMs": 870
      },
      {
        "text": "dưới",
        "startMs": 870,
        "endMs": 1210
      },
      {
        "text": "gốc",
        "startMs": 1210,
        "endMs": 1420
      },
      {
        "text": "táo",
        "startMs": 1420,
        "endMs": 1950
      }
    ],
    "highlightKeywords": [
      "Isaac Newton",
      "gốc táo"
    ]
  },
  {
    "id": 1,
    "startMs": 1950,
    "endMs": 3430,
    "text": "một quả táo rơi trúng đầu,",
    "tokens": [
      {
        "text": "một",
        "startMs": 1950,
        "endMs": 1990
      },
      {
        "text": "quả",
        "startMs": 1990,
        "endMs": 2210
      },
      {
        "text": "táo",
        "startMs": 2210,
        "endMs": 2380
      },
      {
        "text": "rơi",
        "startMs": 2380,
        "endMs": 2710
      },
      {
        "text": "trúng",
        "startMs": 2710,
        "endMs": 2960
      },
      {
        "text": "đầu",
        "startMs": 2960,
        "endMs": 3430
      }
    ],
    "highlightKeywords": [
      "quả táo",
      "trúng đầu"
    ]
  },
  {
    "id": 2,
    "startMs": 3430,
    "endMs": 5060,
    "text": "và ông phát minh ra lực hấp dẫn.",
    "tokens": [
      {
        "text": "và",
        "startMs": 3430,
        "endMs": 3480
      },
      {
        "text": "ông",
        "startMs": 3480,
        "endMs": 3630
      },
      {
        "text": "phát",
        "startMs": 3630,
        "endMs": 3890
      },
      {
        "text": "minh",
        "startMs": 3890,
        "endMs": 4080
      },
      {
        "text": "ra",
        "startMs": 4080,
        "endMs": 4180
      },
      {
        "text": "lực",
        "startMs": 4180,
        "endMs": 4440
      },
      {
        "text": "hấp",
        "startMs": 4440,
        "endMs": 4730
      },
      {
        "text": "dẫn",
        "startMs": 4730,
        "endMs": 5060
      }
    ],
    "highlightKeywords": [
      "lực hấp dẫn"
    ]
  },
  {
    "id": 3,
    "startMs": 5060,
    "endMs": 6330,
    "text": "Câu chuyện hay đấy,",
    "tokens": [
      {
        "text": "Câu",
        "startMs": 5060,
        "endMs": 5350
      },
      {
        "text": "chuyện",
        "startMs": 5350,
        "endMs": 5690
      },
      {
        "text": "hay",
        "startMs": 5690,
        "endMs": 5850
      },
      {
        "text": "đấy",
        "startMs": 5850,
        "endMs": 6330
      }
    ],
    "highlightKeywords": [
      "Câu chuyện hay"
    ]
  },
  {
    "id": 4,
    "startMs": 6330,
    "endMs": 8860,
    "text": "chỉ có điều... nó hơi bị chế thêm gia vị.",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 6330,
        "endMs": 6540
      },
      {
        "text": "có",
        "startMs": 6540,
        "endMs": 6700
      },
      {
        "text": "điều",
        "startMs": 6700,
        "endMs": 7290
      },
      {
        "text": "nó",
        "startMs": 7290,
        "endMs": 7390
      },
      {
        "text": "hơi",
        "startMs": 7390,
        "endMs": 7590
      },
      {
        "text": "bị",
        "startMs": 7590,
        "endMs": 7790
      },
      {
        "text": "chế",
        "startMs": 7790,
        "endMs": 8040
      },
      {
        "text": "thêm",
        "startMs": 8040,
        "endMs": 8290
      },
      {
        "text": "gia",
        "startMs": 8290,
        "endMs": 8680
      },
      {
        "text": "vị",
        "startMs": 8680,
        "endMs": 8860
      }
    ],
    "highlightKeywords": [
      "chế thêm gia vị"
    ]
  },
  {
    "id": 5,
    "startMs": 8700,
    "endMs": 12230,
    "text": "Sự thật là Newton chỉ nhìn thấy một quả táo rơi từ xa,",
    "tokens": [
      {
        "text": "Sự",
        "startMs": 8700,
        "endMs": 8940
      },
      {
        "text": "thật",
        "startMs": 8940,
        "endMs": 9300
      },
      {
        "text": "là",
        "startMs": 9300,
        "endMs": 9480
      },
      {
        "text": "Newton",
        "startMs": 9480,
        "endMs": 10200
      },
      {
        "text": "chỉ",
        "startMs": 10200,
        "endMs": 10260
      },
      {
        "text": "nhìn",
        "startMs": 10260,
        "endMs": 10500
      },
      {
        "text": "thấy",
        "startMs": 10500,
        "endMs": 10800
      },
      {
        "text": "một",
        "startMs": 10800,
        "endMs": 11080
      },
      {
        "text": "quả",
        "startMs": 11080,
        "endMs": 11300
      },
      {
        "text": "táo",
        "startMs": 11300,
        "endMs": 11500
      },
      {
        "text": "rơi",
        "startMs": 11500,
        "endMs": 11840
      },
      {
        "text": "từ",
        "startMs": 11840,
        "endMs": 12100
      },
      {
        "text": "xa",
        "startMs": 12100,
        "endMs": 12230
      }
    ],
    "highlightKeywords": [
      "nhìn thấy",
      "rơi từ xa"
    ]
  },
  {
    "id": 6,
    "startMs": 12230,
    "endMs": 14780,
    "text": "không hề bị đánh trúng đầu như phim hoạt hình vẫn vẽ.",
    "tokens": [
      {
        "text": "không",
        "startMs": 12230,
        "endMs": 12410
      },
      {
        "text": "hề",
        "startMs": 12410,
        "endMs": 12570
      },
      {
        "text": "bị",
        "startMs": 12570,
        "endMs": 12730
      },
      {
        "text": "đánh",
        "startMs": 12730,
        "endMs": 12970
      },
      {
        "text": "trúng",
        "startMs": 12970,
        "endMs": 13220
      },
      {
        "text": "đầu",
        "startMs": 13220,
        "endMs": 13530
      },
      {
        "text": "như",
        "startMs": 13530,
        "endMs": 13630
      },
      {
        "text": "phim",
        "startMs": 13630,
        "endMs": 13800
      },
      {
        "text": "hoạt",
        "startMs": 13800,
        "endMs": 14030
      },
      {
        "text": "hình",
        "startMs": 14030,
        "endMs": 14220
      },
      {
        "text": "vẫn",
        "startMs": 14220,
        "endMs": 14480
      },
      {
        "text": "vẽ",
        "startMs": 14480,
        "endMs": 14780
      }
    ],
    "highlightKeywords": [
      "không hề bị đánh",
      "hoạt hình"
    ]
  },
  {
    "id": 7,
    "startMs": 14780,
    "endMs": 17240,
    "text": "Ông ấy chỉ đang ngồi suy nghĩ vẩn vơ thôi,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 14780,
        "endMs": 15040
      },
      {
        "text": "ấy",
        "startMs": 15040,
        "endMs": 15180
      },
      {
        "text": "chỉ",
        "startMs": 15180,
        "endMs": 15430
      },
      {
        "text": "đang",
        "startMs": 15430,
        "endMs": 15630
      },
      {
        "text": "ngồi",
        "startMs": 15630,
        "endMs": 15930
      },
      {
        "text": "suy",
        "startMs": 15930,
        "endMs": 16080
      },
      {
        "text": "nghĩ",
        "startMs": 16080,
        "endMs": 16340
      },
      {
        "text": "vẩn",
        "startMs": 16340,
        "endMs": 16580
      },
      {
        "text": "vơ",
        "startMs": 16580,
        "endMs": 17060
      },
      {
        "text": "thôi",
        "startMs": 17060,
        "endMs": 17240
      }
    ],
    "highlightKeywords": [
      "suy nghĩ vẩn vơ"
    ]
  },
  {
    "id": 8,
    "startMs": 17170,
    "endMs": 20620,
    "text": "và tự dưng nghĩ: 'Ơ, sao táo lại rơi xuống mà không bay ngang?'",
    "tokens": [
      {
        "text": "và",
        "startMs": 17170,
        "endMs": 17350
      },
      {
        "text": "tự",
        "startMs": 17350,
        "endMs": 17560
      },
      {
        "text": "dưng",
        "startMs": 17560,
        "endMs": 17780
      },
      {
        "text": "nghĩ",
        "startMs": 17780,
        "endMs": 18240
      },
      {
        "text": "Ơ",
        "startMs": 18240,
        "endMs": 18640
      },
      {
        "text": "sao",
        "startMs": 18640,
        "endMs": 18760
      },
      {
        "text": "táo",
        "startMs": 18760,
        "endMs": 18960
      },
      {
        "text": "lại",
        "startMs": 18960,
        "endMs": 19170
      },
      {
        "text": "rơi",
        "startMs": 19170,
        "endMs": 19450
      },
      {
        "text": "xuống",
        "startMs": 19450,
        "endMs": 19740
      },
      {
        "text": "mà",
        "startMs": 19740,
        "endMs": 19860
      },
      {
        "text": "không",
        "startMs": 19860,
        "endMs": 20110
      },
      {
        "text": "bay",
        "startMs": 20110,
        "endMs": 20310
      },
      {
        "text": "ngang",
        "startMs": 20310,
        "endMs": 20620
      }
    ],
    "highlightKeywords": [
      "rơi xuống",
      "không bay ngang"
    ]
  },
  {
    "id": 9,
    "startMs": 20620,
    "endMs": 22130,
    "text": "câu hỏi tưởng ngớ ngẩn này",
    "tokens": [
      {
        "text": "câu",
        "startMs": 20620,
        "endMs": 20820
      },
      {
        "text": "hỏi",
        "startMs": 20820,
        "endMs": 20980
      },
      {
        "text": "tưởng",
        "startMs": 20980,
        "endMs": 21310
      },
      {
        "text": "ngớ",
        "startMs": 21310,
        "endMs": 21550
      },
      {
        "text": "ngẩn",
        "startMs": 21550,
        "endMs": 21790
      },
      {
        "text": "này",
        "startMs": 21790,
        "endMs": 22130
      }
    ],
    "highlightKeywords": [
      "tưởng ngớ ngẩn"
    ]
  },
  {
    "id": 10,
    "startMs": 22130,
    "endMs": 24500,
    "text": "lại đẻ ra cả một định luật thay đổi vật lý học.",
    "tokens": [
      {
        "text": "lại",
        "startMs": 22130,
        "endMs": 22150
      },
      {
        "text": "đẻ",
        "startMs": 22150,
        "endMs": 22350
      },
      {
        "text": "ra",
        "startMs": 22350,
        "endMs": 22430
      },
      {
        "text": "cả",
        "startMs": 22430,
        "endMs": 22590
      },
      {
        "text": "một",
        "startMs": 22590,
        "endMs": 22790
      },
      {
        "text": "định",
        "startMs": 22790,
        "endMs": 23070
      },
      {
        "text": "luật",
        "startMs": 23070,
        "endMs": 23340
      },
      {
        "text": "thay",
        "startMs": 23340,
        "endMs": 23470
      },
      {
        "text": "đổi",
        "startMs": 23470,
        "endMs": 23710
      },
      {
        "text": "vật",
        "startMs": 23710,
        "endMs": 23910
      },
      {
        "text": "lý",
        "startMs": 23910,
        "endMs": 24020
      },
      {
        "text": "học",
        "startMs": 24020,
        "endMs": 24500
      }
    ],
    "highlightKeywords": [
      "thay đổi vật lý học"
    ]
  },
  {
    "id": 11,
    "startMs": 24500,
    "endMs": 27420,
    "text": "Nhưng khoan, Newton không chỉ có mỗi lực hấp dẫn đâu.",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 24500,
        "endMs": 24950
      },
      {
        "text": "khoan",
        "startMs": 24950,
        "endMs": 25350
      },
      {
        "text": "Newton",
        "startMs": 25350,
        "endMs": 25550
      },
      {
        "text": "không",
        "startMs": 25550,
        "endMs": 25820
      },
      {
        "text": "chỉ",
        "startMs": 25820,
        "endMs": 25990
      },
      {
        "text": "có",
        "startMs": 25990,
        "endMs": 26140
      },
      {
        "text": "mỗi",
        "startMs": 26140,
        "endMs": 26330
      },
      {
        "text": "lực",
        "startMs": 26330,
        "endMs": 26550
      },
      {
        "text": "hấp",
        "startMs": 26550,
        "endMs": 26790
      },
      {
        "text": "dẫn",
        "startMs": 26790,
        "endMs": 27000
      },
      {
        "text": "đâu",
        "startMs": 27000,
        "endMs": 27420
      }
    ],
    "highlightKeywords": [
      "không chỉ có",
      "lực hấp dẫn"
    ]
  },
  {
    "id": 12,
    "startMs": 27420,
    "endMs": 30300,
    "text": "Ông này còn là một người cực kỳ... rảnh theo kiểu bác học.",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 27420,
        "endMs": 27530
      },
      {
        "text": "này",
        "startMs": 27530,
        "endMs": 27670
      },
      {
        "text": "còn",
        "startMs": 27670,
        "endMs": 27840
      },
      {
        "text": "là",
        "startMs": 27840,
        "endMs": 27970
      },
      {
        "text": "một",
        "startMs": 27970,
        "endMs": 28180
      },
      {
        "text": "người",
        "startMs": 28180,
        "endMs": 28630
      },
      {
        "text": "cực",
        "startMs": 28630,
        "endMs": 28730
      },
      {
        "text": "kỳ",
        "startMs": 28730,
        "endMs": 29010
      },
      {
        "text": "rảnh",
        "startMs": 29010,
        "endMs": 29300
      },
      {
        "text": "theo",
        "startMs": 29300,
        "endMs": 29350
      },
      {
        "text": "kiểu",
        "startMs": 29350,
        "endMs": 29600
      },
      {
        "text": "bác",
        "startMs": 29600,
        "endMs": 29810
      },
      {
        "text": "học",
        "startMs": 29810,
        "endMs": 30300
      }
    ],
    "highlightKeywords": [
      "rảnh theo kiểu bác học"
    ]
  },
  {
    "id": 13,
    "startMs": 30300,
    "endMs": 32350,
    "text": "Ông từng tự chọc một cây kim vào mắt mình —",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 30300,
        "endMs": 30460
      },
      {
        "text": "từng",
        "startMs": 30460,
        "endMs": 30710
      },
      {
        "text": "tự",
        "startMs": 30710,
        "endMs": 30890
      },
      {
        "text": "chọc",
        "startMs": 30890,
        "endMs": 31130
      },
      {
        "text": "một",
        "startMs": 31130,
        "endMs": 31340
      },
      {
        "text": "cây",
        "startMs": 31340,
        "endMs": 31510
      },
      {
        "text": "kim",
        "startMs": 31510,
        "endMs": 31650
      },
      {
        "text": "vào",
        "startMs": 31650,
        "endMs": 31810
      },
      {
        "text": "mắt",
        "startMs": 31810,
        "endMs": 32020
      },
      {
        "text": "mình",
        "startMs": 32020,
        "endMs": 32350
      }
    ],
    "highlightKeywords": [
      "chọc một cây kim",
      "vào mắt mình"
    ]
  },
  {
    "id": 14,
    "startMs": 32350,
    "endMs": 33400,
    "text": "đúng nghĩa đen —",
    "tokens": [
      {
        "text": "đúng",
        "startMs": 32350,
        "endMs": 32560
      },
      {
        "text": "nghĩa",
        "startMs": 32560,
        "endMs": 32940
      },
      {
        "text": "đen",
        "startMs": 32940,
        "endMs": 33400
      }
    ],
    "highlightKeywords": [
      "đúng nghĩa đen"
    ]
  },
  {
    "id": 15,
    "startMs": 33400,
    "endMs": 34990,
    "text": "chỉ để nghiên cứu xem áp lực lên mắt",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 33400,
        "endMs": 33450
      },
      {
        "text": "để",
        "startMs": 33450,
        "endMs": 33660
      },
      {
        "text": "nghiên",
        "startMs": 33660,
        "endMs": 33960
      },
      {
        "text": "cứu",
        "startMs": 33960,
        "endMs": 34170
      },
      {
        "text": "xem",
        "startMs": 34170,
        "endMs": 34300
      },
      {
        "text": "áp",
        "startMs": 34300,
        "endMs": 34420
      },
      {
        "text": "lực",
        "startMs": 34420,
        "endMs": 34810
      },
      {
        "text": "lên",
        "startMs": 34810,
        "endMs": 34820
      },
      {
        "text": "mắt",
        "startMs": 34820,
        "endMs": 34990
      }
    ],
    "highlightKeywords": [
      "áp lực lên mắt"
    ]
  },
  {
    "id": 16,
    "startMs": 34990,
    "endMs": 37340,
    "text": "ảnh hưởng thế nào đến cách con người nhìn màu sắc.",
    "tokens": [
      {
        "text": "ảnh",
        "startMs": 34990,
        "endMs": 35180
      },
      {
        "text": "hưởng",
        "startMs": 35180,
        "endMs": 35450
      },
      {
        "text": "thế",
        "startMs": 35450,
        "endMs": 35630
      },
      {
        "text": "nào",
        "startMs": 35630,
        "endMs": 35820
      },
      {
        "text": "đến",
        "startMs": 35820,
        "endMs": 36050
      },
      {
        "text": "cách",
        "startMs": 36050,
        "endMs": 36250
      },
      {
        "text": "con",
        "startMs": 36250,
        "endMs": 36370
      },
      {
        "text": "người",
        "startMs": 36370,
        "endMs": 36680
      },
      {
        "text": "nhìn",
        "startMs": 36680,
        "endMs": 36870
      },
      {
        "text": "màu",
        "startMs": 36870,
        "endMs": 37060
      },
      {
        "text": "sắc",
        "startMs": 37060,
        "endMs": 37340
      }
    ],
    "highlightKeywords": [
      "nhìn màu sắc"
    ]
  },
  {
    "id": 17,
    "startMs": 37340,
    "endMs": 38800,
    "text": "Không ai bảo ông làm cả,",
    "tokens": [
      {
        "text": "Không",
        "startMs": 37340,
        "endMs": 37680
      },
      {
        "text": "ai",
        "startMs": 37680,
        "endMs": 37720
      },
      {
        "text": "bảo",
        "startMs": 37720,
        "endMs": 37950
      },
      {
        "text": "ông",
        "startMs": 37950,
        "endMs": 38140
      },
      {
        "text": "làm",
        "startMs": 38140,
        "endMs": 38330
      },
      {
        "text": "cả",
        "startMs": 38330,
        "endMs": 38800
      }
    ],
    "highlightKeywords": [
      "Không ai bảo"
    ]
  },
  {
    "id": 18,
    "startMs": 38800,
    "endMs": 39580,
    "text": "ông tự nguyện.",
    "tokens": [
      {
        "text": "ông",
        "startMs": 38800,
        "endMs": 38840
      },
      {
        "text": "tự",
        "startMs": 38840,
        "endMs": 38980
      },
      {
        "text": "nguyện",
        "startMs": 38980,
        "endMs": 39580
      }
    ],
    "highlightKeywords": [
      "tự nguyện"
    ]
  },
  {
    "id": 19,
    "startMs": 39580,
    "endMs": 41260,
    "text": "Và đây mới là phần hài nhất:",
    "tokens": [
      {
        "text": "Và",
        "startMs": 39580,
        "endMs": 39810
      },
      {
        "text": "đây",
        "startMs": 39810,
        "endMs": 39820
      },
      {
        "text": "mới",
        "startMs": 39820,
        "endMs": 40060
      },
      {
        "text": "là",
        "startMs": 40060,
        "endMs": 40200
      },
      {
        "text": "phần",
        "startMs": 40200,
        "endMs": 40480
      },
      {
        "text": "hài",
        "startMs": 40480,
        "endMs": 40620
      },
      {
        "text": "nhất",
        "startMs": 40620,
        "endMs": 41260
      }
    ],
    "highlightKeywords": [
      "phần hài nhất"
    ]
  },
  {
    "id": 20,
    "startMs": 41260,
    "endMs": 44170,
    "text": "Newton dành phần lớn cuộc đời không phải để nghiên cứu vật lý,",
    "tokens": [
      {
        "text": "Newton",
        "startMs": 41260,
        "endMs": 41380
      },
      {
        "text": "dành",
        "startMs": 41380,
        "endMs": 41580
      },
      {
        "text": "phần",
        "startMs": 41580,
        "endMs": 41820
      },
      {
        "text": "lớn",
        "startMs": 41820,
        "endMs": 42020
      },
      {
        "text": "cuộc",
        "startMs": 42020,
        "endMs": 42270
      },
      {
        "text": "đời",
        "startMs": 42270,
        "endMs": 42500
      },
      {
        "text": "không",
        "startMs": 42500,
        "endMs": 42740
      },
      {
        "text": "phải",
        "startMs": 42740,
        "endMs": 42980
      },
      {
        "text": "để",
        "startMs": 42980,
        "endMs": 43180
      },
      {
        "text": "nghiên",
        "startMs": 43180,
        "endMs": 43460
      },
      {
        "text": "cứu",
        "startMs": 43460,
        "endMs": 43660
      },
      {
        "text": "vật",
        "startMs": 43660,
        "endMs": 43900
      },
      {
        "text": "lý",
        "startMs": 43900,
        "endMs": 44170
      }
    ],
    "highlightKeywords": [
      "không phải nghiên cứu vật lý"
    ]
  },
  {
    "id": 21,
    "startMs": 44170,
    "endMs": 46230,
    "text": "mà để nghiên cứu... giả kim thuật.",
    "tokens": [
      {
        "text": "mà",
        "startMs": 44170,
        "endMs": 44320
      },
      {
        "text": "để",
        "startMs": 44320,
        "endMs": 44590
      },
      {
        "text": "nghiên",
        "startMs": 44590,
        "endMs": 45170
      },
      {
        "text": "cứu",
        "startMs": 45170,
        "endMs": 45260
      },
      {
        "text": "giả",
        "startMs": 45260,
        "endMs": 45490
      },
      {
        "text": "kim",
        "startMs": 45490,
        "endMs": 45630
      },
      {
        "text": "thuật",
        "startMs": 45630,
        "endMs": 46230
      }
    ],
    "highlightKeywords": [
      "giả kim thuật"
    ]
  },
  {
    "id": 22,
    "startMs": 46230,
    "endMs": 48430,
    "text": "Ông cực kỳ tin vào việc biến chì thành vàng,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 46230,
        "endMs": 46310
      },
      {
        "text": "cực",
        "startMs": 46310,
        "endMs": 46490
      },
      {
        "text": "kỳ",
        "startMs": 46490,
        "endMs": 46670
      },
      {
        "text": "tin",
        "startMs": 46670,
        "endMs": 46760
      },
      {
        "text": "vào",
        "startMs": 46760,
        "endMs": 46950
      },
      {
        "text": "việc",
        "startMs": 46950,
        "endMs": 47280
      },
      {
        "text": "biến",
        "startMs": 47280,
        "endMs": 47500
      },
      {
        "text": "chì",
        "startMs": 47500,
        "endMs": 47690
      },
      {
        "text": "thành",
        "startMs": 47690,
        "endMs": 47960
      },
      {
        "text": "vàng",
        "startMs": 47960,
        "endMs": 48430
      }
    ],
    "highlightKeywords": [
      "biến chì thành vàng"
    ]
  },
  {
    "id": 23,
    "startMs": 48430,
    "endMs": 50670,
    "text": "và viết hàng ngàn trang ghi chú bí mật về nó —",
    "tokens": [
      {
        "text": "và",
        "startMs": 48430,
        "endMs": 48520
      },
      {
        "text": "viết",
        "startMs": 48520,
        "endMs": 48790
      },
      {
        "text": "hàng",
        "startMs": 48790,
        "endMs": 49010
      },
      {
        "text": "ngàn",
        "startMs": 49010,
        "endMs": 49230
      },
      {
        "text": "trang",
        "startMs": 49230,
        "endMs": 49460
      },
      {
        "text": "ghi",
        "startMs": 49460,
        "endMs": 49580
      },
      {
        "text": "chú",
        "startMs": 49580,
        "endMs": 49760
      },
      {
        "text": "bí",
        "startMs": 49760,
        "endMs": 49890
      },
      {
        "text": "mật",
        "startMs": 49890,
        "endMs": 50110
      },
      {
        "text": "về",
        "startMs": 50110,
        "endMs": 50420
      },
      {
        "text": "nó",
        "startMs": 50420,
        "endMs": 50620
      }
    ],
    "highlightKeywords": [
      "hàng ngàn trang",
      "bí mật"
    ]
  },
  {
    "id": 24,
    "startMs": 50700,
    "endMs": 52600,
    "text": "bí mật đến mức mãi sau khi ông chết",
    "tokens": [
      {
        "text": "bí",
        "startMs": 50700,
        "endMs": 50740
      },
      {
        "text": "mật",
        "startMs": 50740,
        "endMs": 50910
      },
      {
        "text": "đến",
        "startMs": 50910,
        "endMs": 51170
      },
      {
        "text": "mức",
        "startMs": 51170,
        "endMs": 51380
      },
      {
        "text": "mãi",
        "startMs": 51380,
        "endMs": 51540
      },
      {
        "text": "sau",
        "startMs": 51540,
        "endMs": 51670
      },
      {
        "text": "khi",
        "startMs": 51670,
        "endMs": 51800
      },
      {
        "text": "ông",
        "startMs": 51800,
        "endMs": 51970
      },
      {
        "text": "chết",
        "startMs": 51970,
        "endMs": 52600
      }
    ],
    "highlightKeywords": [
      "sau khi ông chết"
    ]
  },
  {
    "id": 25,
    "startMs": 52600,
    "endMs": 53600,
    "text": "người ta mới phát hiện ra",
    "tokens": [
      {
        "text": "người",
        "startMs": 52600,
        "endMs": 52650
      },
      {
        "text": "ta",
        "startMs": 52650,
        "endMs": 52770
      },
      {
        "text": "mới",
        "startMs": 52770,
        "endMs": 52950
      },
      {
        "text": "phát",
        "startMs": 52950,
        "endMs": 53160
      },
      {
        "text": "hiện",
        "startMs": 53160,
        "endMs": 53420
      },
      {
        "text": "ra",
        "startMs": 53420,
        "endMs": 53600
      }
    ],
    "highlightKeywords": [
      "phát hiện ra"
    ]
  },
  {
    "id": 26,
    "startMs": 53500,
    "endMs": 54780,
    "text": "ông là một 'nhà giả kim'",
    "tokens": [
      {
        "text": "ông",
        "startMs": 53500,
        "endMs": 53670
      },
      {
        "text": "là",
        "startMs": 53670,
        "endMs": 53800
      },
      {
        "text": "một",
        "startMs": 53800,
        "endMs": 54020
      },
      {
        "text": "nhà",
        "startMs": 54020,
        "endMs": 54190
      },
      {
        "text": "giả",
        "startMs": 54190,
        "endMs": 54400
      },
      {
        "text": "kim",
        "startMs": 54400,
        "endMs": 54780
      }
    ],
    "highlightKeywords": [
      "nhà giả kim"
    ]
  },
  {
    "id": 27,
    "startMs": 54780,
    "endMs": 57010,
    "text": "hơn là nhà khoa học như sách giáo khoa vẽ.",
    "tokens": [
      {
        "text": "hơn",
        "startMs": 54780,
        "endMs": 54910
      },
      {
        "text": "là",
        "startMs": 54910,
        "endMs": 54920
      },
      {
        "text": "nhà",
        "startMs": 54920,
        "endMs": 55080
      },
      {
        "text": "khoa",
        "startMs": 55080,
        "endMs": 55250
      },
      {
        "text": "học",
        "startMs": 55250,
        "endMs": 55800
      },
      {
        "text": "như",
        "startMs": 55800,
        "endMs": 55960
      },
      {
        "text": "sách",
        "startMs": 55960,
        "endMs": 56170
      },
      {
        "text": "giáo",
        "startMs": 56170,
        "endMs": 56390
      },
      {
        "text": "khoa",
        "startMs": 56390,
        "endMs": 56560
      },
      {
        "text": "vẽ",
        "startMs": 56560,
        "endMs": 57010
      }
    ],
    "highlightKeywords": [
      "sách giáo khoa vẽ"
    ]
  },
  {
    "id": 28,
    "startMs": 57010,
    "endMs": 59230,
    "text": "Ông còn từng là Giám đốc Sở Đúc tiền Hoàng gia Anh,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 57010,
        "endMs": 57080
      },
      {
        "text": "còn",
        "startMs": 57080,
        "endMs": 57160
      },
      {
        "text": "từng",
        "startMs": 57160,
        "endMs": 57380
      },
      {
        "text": "là",
        "startMs": 57380,
        "endMs": 57490
      },
      {
        "text": "Giám",
        "startMs": 57490,
        "endMs": 57670
      },
      {
        "text": "đốc",
        "startMs": 57670,
        "endMs": 57900
      },
      {
        "text": "Sở",
        "startMs": 57900,
        "endMs": 58030
      },
      {
        "text": "Đúc",
        "startMs": 58030,
        "endMs": 58280
      },
      {
        "text": "tiền",
        "startMs": 58280,
        "endMs": 58430
      },
      {
        "text": "Hoàng",
        "startMs": 58430,
        "endMs": 58650
      },
      {
        "text": "gia",
        "startMs": 58650,
        "endMs": 58830
      },
      {
        "text": "Anh",
        "startMs": 58830,
        "endMs": 59230
      }
    ],
    "highlightKeywords": [
      "Giám đốc Sở Đúc tiền"
    ]
  },
  {
    "id": 29,
    "startMs": 59230,
    "endMs": 63220,
    "text": "và ở vị trí đó, Newton biến thành... thợ săn tiền giả.",
    "tokens": [
      {
        "text": "và",
        "startMs": 59230,
        "endMs": 59400
      },
      {
        "text": "ở",
        "startMs": 59400,
        "endMs": 59570
      },
      {
        "text": "vị",
        "startMs": 59570,
        "endMs": 59830
      },
      {
        "text": "trí",
        "startMs": 59830,
        "endMs": 60220
      },
      {
        "text": "đó",
        "startMs": 60220,
        "endMs": 60480
      },
      {
        "text": "Newton",
        "startMs": 60480,
        "endMs": 60860
      },
      {
        "text": "biến",
        "startMs": 60860,
        "endMs": 61250
      },
      {
        "text": "thành",
        "startMs": 61250,
        "endMs": 61900
      },
      {
        "text": "thợ",
        "startMs": 61900,
        "endMs": 62300
      },
      {
        "text": "săn",
        "startMs": 62300,
        "endMs": 62470
      },
      {
        "text": "tiền",
        "startMs": 62470,
        "endMs": 62740
      },
      {
        "text": "giả",
        "startMs": 62740,
        "endMs": 63220
      }
    ],
    "highlightKeywords": [
      "thợ săn tiền giả"
    ]
  },
  {
    "id": 30,
    "startMs": 63220,
    "endMs": 64860,
    "text": "Ông đích thân cải trang đi điều tra,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 63220,
        "endMs": 63230
      },
      {
        "text": "đích",
        "startMs": 63230,
        "endMs": 63510
      },
      {
        "text": "thân",
        "startMs": 63510,
        "endMs": 63720
      },
      {
        "text": "cải",
        "startMs": 63720,
        "endMs": 63940
      },
      {
        "text": "trang",
        "startMs": 63940,
        "endMs": 64160
      },
      {
        "text": "đi",
        "startMs": 64160,
        "endMs": 64290
      },
      {
        "text": "điều",
        "startMs": 64290,
        "endMs": 64600
      },
      {
        "text": "tra",
        "startMs": 64600,
        "endMs": 64860
      }
    ],
    "highlightKeywords": [
      "đích thân cải trang",
      "điều tra"
    ]
  },
  {
    "id": 31,
    "startMs": 64860,
    "endMs": 67970,
    "text": "bắt tận tay và đưa nhiều kẻ làm tiền giả lên giá treo cổ.",
    "tokens": [
      {
        "text": "bắt",
        "startMs": 64860,
        "endMs": 65060
      },
      {
        "text": "tận",
        "startMs": 65060,
        "endMs": 65260
      },
      {
        "text": "tay",
        "startMs": 65260,
        "endMs": 65390
      },
      {
        "text": "và",
        "startMs": 65390,
        "endMs": 65610
      },
      {
        "text": "đưa",
        "startMs": 65610,
        "endMs": 65780
      },
      {
        "text": "nhiều",
        "startMs": 65780,
        "endMs": 66050
      },
      {
        "text": "kẻ",
        "startMs": 66050,
        "endMs": 66270
      },
      {
        "text": "làm",
        "startMs": 66270,
        "endMs": 66400
      },
      {
        "text": "tiền",
        "startMs": 66400,
        "endMs": 66670
      },
      {
        "text": "giả",
        "startMs": 66670,
        "endMs": 66890
      },
      {
        "text": "lên",
        "startMs": 66890,
        "endMs": 67070
      },
      {
        "text": "giá",
        "startMs": 67070,
        "endMs": 67250
      },
      {
        "text": "treo",
        "startMs": 67250,
        "endMs": 67430
      },
      {
        "text": "cổ",
        "startMs": 67430,
        "endMs": 67970
      }
    ],
    "highlightKeywords": [
      "bắt tận tay",
      "giá treo cổ"
    ]
  },
  {
    "id": 32,
    "startMs": 67970,
    "endMs": 69380,
    "text": "Từ người phát minh ra lực hấp dẫn",
    "tokens": [
      {
        "text": "Từ",
        "startMs": 67970,
        "endMs": 68040
      },
      {
        "text": "người",
        "startMs": 68040,
        "endMs": 68360
      },
      {
        "text": "phát",
        "startMs": 68360,
        "endMs": 68520
      },
      {
        "text": "minh",
        "startMs": 68520,
        "endMs": 68700
      },
      {
        "text": "ra",
        "startMs": 68700,
        "endMs": 68770
      },
      {
        "text": "lực",
        "startMs": 68770,
        "endMs": 69090
      },
      {
        "text": "hấp",
        "startMs": 69090,
        "endMs": 69220
      },
      {
        "text": "dẫn",
        "startMs": 69220,
        "endMs": 69380
      }
    ],
    "highlightKeywords": [
      "phát minh lực hấp dẫn"
    ]
  },
  {
    "id": 33,
    "startMs": 69380,
    "endMs": 71080,
    "text": "đến cảnh sát trưởng phá án tiền giả —",
    "tokens": [
      {
        "text": "đến",
        "startMs": 69380,
        "endMs": 69600
      },
      {
        "text": "cảnh",
        "startMs": 69600,
        "endMs": 69770
      },
      {
        "text": "sát",
        "startMs": 69770,
        "endMs": 69900
      },
      {
        "text": "trưởng",
        "startMs": 69900,
        "endMs": 70200
      },
      {
        "text": "phá",
        "startMs": 70200,
        "endMs": 70300
      },
      {
        "text": "án",
        "startMs": 70300,
        "endMs": 70410
      },
      {
        "text": "tiền",
        "startMs": 70410,
        "endMs": 70570
      },
      {
        "text": "giả",
        "startMs": 70570,
        "endMs": 71080
      }
    ],
    "highlightKeywords": [
      "cảnh sát trưởng",
      "phá án tiền giả"
    ]
  },
  {
    "id": 34,
    "startMs": 71080,
    "endMs": 73260,
    "text": "sự nghiệp của ông đúng là không ai đoán trước được.",
    "tokens": [
      {
        "text": "sự",
        "startMs": 71080,
        "endMs": 71140
      },
      {
        "text": "nghiệp",
        "startMs": 71140,
        "endMs": 71350
      },
      {
        "text": "của",
        "startMs": 71350,
        "endMs": 71520
      },
      {
        "text": "ông",
        "startMs": 71520,
        "endMs": 71660
      },
      {
        "text": "đúng",
        "startMs": 71660,
        "endMs": 71870
      },
      {
        "text": "là",
        "startMs": 71870,
        "endMs": 71970
      },
      {
        "text": "không",
        "startMs": 71970,
        "endMs": 72180
      },
      {
        "text": "ai",
        "startMs": 72180,
        "endMs": 72250
      },
      {
        "text": "đoán",
        "startMs": 72250,
        "endMs": 72450
      },
      {
        "text": "trước",
        "startMs": 72450,
        "endMs": 72730
      },
      {
        "text": "được",
        "startMs": 72730,
        "endMs": 73140
      }
    ],
    "highlightKeywords": [
      "không ai đoán trước"
    ]
  },
  {
    "id": 35,
    "startMs": 73290,
    "endMs": 75590,
    "text": "Và có lẽ câu chuyện hài nhất về Newton là:",
    "tokens": [
      {
        "text": "Và",
        "startMs": 73290,
        "endMs": 73320
      },
      {
        "text": "có",
        "startMs": 73320,
        "endMs": 73480
      },
      {
        "text": "lẽ",
        "startMs": 73480,
        "endMs": 73640
      },
      {
        "text": "câu",
        "startMs": 73640,
        "endMs": 73840
      },
      {
        "text": "chuyện",
        "startMs": 73840,
        "endMs": 74260
      },
      {
        "text": "hài",
        "startMs": 74260,
        "endMs": 74450
      },
      {
        "text": "nhất",
        "startMs": 74450,
        "endMs": 74770
      },
      {
        "text": "về",
        "startMs": 74770,
        "endMs": 74930
      },
      {
        "text": "Newton",
        "startMs": 74930,
        "endMs": 75380
      },
      {
        "text": "là",
        "startMs": 75380,
        "endMs": 75590
      }
    ],
    "highlightKeywords": [
      "câu chuyện hài nhất"
    ]
  },
  {
    "id": 36,
    "startMs": 75590,
    "endMs": 78000,
    "text": "ông chưa từng... có bạn gái, chưa từng kết hôn,",
    "tokens": [
      {
        "text": "ông",
        "startMs": 75590,
        "endMs": 75620
      },
      {
        "text": "chưa",
        "startMs": 75620,
        "endMs": 75850
      },
      {
        "text": "từng",
        "startMs": 75850,
        "endMs": 76410
      },
      {
        "text": "có",
        "startMs": 76410,
        "endMs": 76670
      },
      {
        "text": "bạn",
        "startMs": 76670,
        "endMs": 76720
      },
      {
        "text": "gái",
        "startMs": 76720,
        "endMs": 76970
      },
      {
        "text": "chưa",
        "startMs": 76970,
        "endMs": 77230
      },
      {
        "text": "từng",
        "startMs": 77230,
        "endMs": 77590
      },
      {
        "text": "kết",
        "startMs": 77590,
        "endMs": 77830
      },
      {
        "text": "hôn",
        "startMs": 77830,
        "endMs": 78000
      }
    ],
    "highlightKeywords": [
      "chưa từng có bạn gái",
      "chưa từng kết hôn"
    ]
  },
  {
    "id": 37,
    "startMs": 78000,
    "endMs": 81980,
    "text": "và được cho là qua đời mà vẫn còn trinh trắng theo ghi chép lịch sử.",
    "tokens": [
      {
        "text": "và",
        "startMs": 78000,
        "endMs": 78150
      },
      {
        "text": "được",
        "startMs": 78150,
        "endMs": 78720
      },
      {
        "text": "cho",
        "startMs": 78720,
        "endMs": 78770
      },
      {
        "text": "là",
        "startMs": 78770,
        "endMs": 78870
      },
      {
        "text": "qua",
        "startMs": 78870,
        "endMs": 79020
      },
      {
        "text": "đời",
        "startMs": 79020,
        "endMs": 79330
      },
      {
        "text": "mà",
        "startMs": 79330,
        "endMs": 79480
      },
      {
        "text": "vẫn",
        "startMs": 79480,
        "endMs": 79740
      },
      {
        "text": "còn",
        "startMs": 79740,
        "endMs": 80010
      },
      {
        "text": "trinh",
        "startMs": 80010,
        "endMs": 80200
      },
      {
        "text": "trắng",
        "startMs": 80200,
        "endMs": 80560
      },
      {
        "text": "theo",
        "startMs": 80560,
        "endMs": 80770
      },
      {
        "text": "ghi",
        "startMs": 80770,
        "endMs": 80920
      },
      {
        "text": "chép",
        "startMs": 80920,
        "endMs": 81180
      },
      {
        "text": "lịch",
        "startMs": 81180,
        "endMs": 81480
      },
      {
        "text": "sử",
        "startMs": 81480,
        "endMs": 81980
      }
    ],
    "highlightKeywords": [
      "vẫn còn trinh trắng",
      "ghi chép lịch sử"
    ]
  },
  {
    "id": 38,
    "startMs": 81980,
    "endMs": 85470,
    "text": "Nhưng bù lại, ông có mối quan hệ tình cảm sâu đậm nhất đời mình",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 81980,
        "endMs": 82350
      },
      {
        "text": "bù",
        "startMs": 82350,
        "endMs": 82530
      },
      {
        "text": "lại",
        "startMs": 82530,
        "endMs": 82850
      },
      {
        "text": "ông",
        "startMs": 82850,
        "endMs": 82860
      },
      {
        "text": "có",
        "startMs": 82860,
        "endMs": 83190
      },
      {
        "text": "mối",
        "startMs": 83190,
        "endMs": 83450
      },
      {
        "text": "quan",
        "startMs": 83450,
        "endMs": 83610
      },
      {
        "text": "hệ",
        "startMs": 83610,
        "endMs": 83790
      },
      {
        "text": "tình",
        "startMs": 83790,
        "endMs": 84020
      },
      {
        "text": "cảm",
        "startMs": 84020,
        "endMs": 84260
      },
      {
        "text": "sâu",
        "startMs": 84260,
        "endMs": 84400
      },
      {
        "text": "đậm",
        "startMs": 84400,
        "endMs": 84670
      },
      {
        "text": "nhất",
        "startMs": 84670,
        "endMs": 84980
      },
      {
        "text": "đời",
        "startMs": 84980,
        "endMs": 85230
      },
      {
        "text": "mình",
        "startMs": 85230,
        "endMs": 85470
      }
    ],
    "highlightKeywords": [
      "tình cảm sâu đậm nhất"
    ]
  },
  {
    "id": 39,
    "startMs": 85470,
    "endMs": 86940,
    "text": "với... toán học.",
    "tokens": [
      {
        "text": "với",
        "startMs": 85470,
        "endMs": 85940
      },
      {
        "text": "toán",
        "startMs": 85940,
        "endMs": 86330
      },
      {
        "text": "học",
        "startMs": 86330,
        "endMs": 86940
      }
    ],
    "highlightKeywords": [
      "với toán học"
    ]
  },
  {
    "id": 40,
    "startMs": 86940,
    "endMs": 88670,
    "text": "Vậy lần tới khi thấy quả táo rơi,",
    "tokens": [
      {
        "text": "Vậy",
        "startMs": 86940,
        "endMs": 87110
      },
      {
        "text": "lần",
        "startMs": 87110,
        "endMs": 87280
      },
      {
        "text": "tới",
        "startMs": 87280,
        "endMs": 87500
      },
      {
        "text": "khi",
        "startMs": 87500,
        "endMs": 87640
      },
      {
        "text": "thấy",
        "startMs": 87640,
        "endMs": 87910
      },
      {
        "text": "quả",
        "startMs": 87910,
        "endMs": 88100
      },
      {
        "text": "táo",
        "startMs": 88100,
        "endMs": 88270
      },
      {
        "text": "rơi",
        "startMs": 88270,
        "endMs": 88670
      }
    ],
    "highlightKeywords": [
      "quả táo rơi"
    ]
  },
  {
    "id": 41,
    "startMs": 88670,
    "endMs": 90150,
    "text": "đừng nghĩ tới lực hấp dẫn —",
    "tokens": [
      {
        "text": "đừng",
        "startMs": 88670,
        "endMs": 88890
      },
      {
        "text": "nghĩ",
        "startMs": 88890,
        "endMs": 89160
      },
      {
        "text": "tới",
        "startMs": 89160,
        "endMs": 89330
      },
      {
        "text": "lực",
        "startMs": 89330,
        "endMs": 89580
      },
      {
        "text": "hấp",
        "startMs": 89580,
        "endMs": 89750
      },
      {
        "text": "dẫn",
        "startMs": 89750,
        "endMs": 90150
      }
    ],
    "highlightKeywords": [
      "đừng nghĩ tới",
      "lực hấp dẫn"
    ]
  },
  {
    "id": 42,
    "startMs": 90150,
    "endMs": 92180,
    "text": "hãy nghĩ tới một ông già thế kỷ 17",
    "tokens": [
      {
        "text": "hãy",
        "startMs": 90150,
        "endMs": 90280
      },
      {
        "text": "nghĩ",
        "startMs": 90280,
        "endMs": 90530
      },
      {
        "text": "tới",
        "startMs": 90530,
        "endMs": 90740
      },
      {
        "text": "một",
        "startMs": 90740,
        "endMs": 90970
      },
      {
        "text": "ông",
        "startMs": 90970,
        "endMs": 91150
      },
      {
        "text": "già",
        "startMs": 91150,
        "endMs": 91410
      },
      {
        "text": "thế",
        "startMs": 91410,
        "endMs": 91600
      },
      {
        "text": "kỷ",
        "startMs": 91600,
        "endMs": 91770
      },
      {
        "text": "17",
        "startMs": 91770,
        "endMs": 92180
      }
    ],
    "highlightKeywords": [
      "ông già thế kỷ 17"
    ]
  },
  {
    "id": 43,
    "startMs": 92180,
    "endMs": 93340,
    "text": "vừa chọc kim vào mắt mình,",
    "tokens": [
      {
        "text": "vừa",
        "startMs": 92180,
        "endMs": 92340
      },
      {
        "text": "chọc",
        "startMs": 92340,
        "endMs": 92570
      },
      {
        "text": "kim",
        "startMs": 92570,
        "endMs": 92660
      },
      {
        "text": "vào",
        "startMs": 92660,
        "endMs": 92780
      },
      {
        "text": "mắt",
        "startMs": 92780,
        "endMs": 92980
      },
      {
        "text": "mình",
        "startMs": 92980,
        "endMs": 93340
      }
    ],
    "highlightKeywords": [
      "chọc kim vào mắt"
    ]
  },
  {
    "id": 44,
    "startMs": 93340,
    "endMs": 94740,
    "text": "vừa cố biến chì thành vàng,",
    "tokens": [
      {
        "text": "vừa",
        "startMs": 93340,
        "endMs": 93510
      },
      {
        "text": "cố",
        "startMs": 93510,
        "endMs": 93720
      },
      {
        "text": "biến",
        "startMs": 93720,
        "endMs": 93930
      },
      {
        "text": "chì",
        "startMs": 93930,
        "endMs": 94090
      },
      {
        "text": "thành",
        "startMs": 94090,
        "endMs": 94360
      },
      {
        "text": "vàng",
        "startMs": 94360,
        "endMs": 94740
      }
    ],
    "highlightKeywords": [
      "biến chì thành vàng"
    ]
  },
  {
    "id": 45,
    "startMs": 94740,
    "endMs": 95900,
    "text": "vừa đi bắt tiền giả,",
    "tokens": [
      {
        "text": "vừa",
        "startMs": 94740,
        "endMs": 94920
      },
      {
        "text": "đi",
        "startMs": 94920,
        "endMs": 95050
      },
      {
        "text": "bắt",
        "startMs": 95050,
        "endMs": 95360
      },
      {
        "text": "tiền",
        "startMs": 95360,
        "endMs": 95530
      },
      {
        "text": "giả",
        "startMs": 95530,
        "endMs": 95900
      }
    ],
    "highlightKeywords": [
      "bắt tiền giả"
    ]
  },
  {
    "id": 46,
    "startMs": 95900,
    "endMs": 98000,
    "text": "tất cả trong cùng một cuộc đời.",
    "tokens": [
      {
        "text": "tất",
        "startMs": 95900,
        "endMs": 96180
      },
      {
        "text": "cả",
        "startMs": 96180,
        "endMs": 96350
      },
      {
        "text": "trong",
        "startMs": 96350,
        "endMs": 96460
      },
      {
        "text": "cùng",
        "startMs": 96460,
        "endMs": 96660
      },
      {
        "text": "một",
        "startMs": 96660,
        "endMs": 96860
      },
      {
        "text": "cuộc",
        "startMs": 96860,
        "endMs": 97120
      },
      {
        "text": "đời",
        "startMs": 97120,
        "endMs": 97500
      }
    ],
    "highlightKeywords": [
      "cùng một cuộc đời"
    ]
  }
];
