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

export const fakeBusySubtitles: SubtitlePhrase[] = [
  {
    "id": 1,
    "startMs": 30,
    "endMs": 1610,
    "text": "Bạn dọn bàn làm việc sạch bong",
    "tokens": [
      {
        "text": "Bạn",
        "startMs": 30,
        "endMs": 200
      },
      {
        "text": "dọn",
        "startMs": 200,
        "endMs": 400
      },
      {
        "text": "bàn",
        "startMs": 400,
        "endMs": 610
      },
      {
        "text": "làm",
        "startMs": 610,
        "endMs": 760
      },
      {
        "text": "việc",
        "startMs": 760,
        "endMs": 1010
      },
      {
        "text": "sạch",
        "startMs": 1010,
        "endMs": 1260
      },
      {
        "text": "bong",
        "startMs": 1260,
        "endMs": 1610
      }
    ],
    "highlightKeywords": [
      "sạch bong",
      "dọn bàn"
    ]
  },
  {
    "id": 2,
    "startMs": 1610,
    "endMs": 3080,
    "text": "sắp xếp lại email theo màu",
    "tokens": [
      {
        "text": "sắp",
        "startMs": 1610,
        "endMs": 1830
      },
      {
        "text": "xếp",
        "startMs": 1830,
        "endMs": 2120
      },
      {
        "text": "lại",
        "startMs": 2120,
        "endMs": 2290
      },
      {
        "text": "email",
        "startMs": 2290,
        "endMs": 2530
      },
      {
        "text": "theo",
        "startMs": 2530,
        "endMs": 2720
      },
      {
        "text": "màu",
        "startMs": 2720,
        "endMs": 3080
      }
    ],
    "highlightKeywords": [
      "theo màu"
    ]
  },
  {
    "id": 3,
    "startMs": 3080,
    "endMs": 5240,
    "text": "trả lời 20 tin nhắn không quan trọng",
    "tokens": [
      {
        "text": "trả",
        "startMs": 3080,
        "endMs": 3330
      },
      {
        "text": "lời",
        "startMs": 3330,
        "endMs": 3580
      },
      {
        "text": "20",
        "startMs": 3580,
        "endMs": 3880
      },
      {
        "text": "tin",
        "startMs": 3880,
        "endMs": 4030
      },
      {
        "text": "nhắn",
        "startMs": 4030,
        "endMs": 4360
      },
      {
        "text": "không",
        "startMs": 4360,
        "endMs": 4630
      },
      {
        "text": "quan",
        "startMs": 4630,
        "endMs": 4930
      },
      {
        "text": "trọng",
        "startMs": 4930,
        "endMs": 5240
      }
    ],
    "highlightKeywords": [
      "20 tin nhắn",
      "không quan trọng"
    ]
  },
  {
    "id": 4,
    "startMs": 5240,
    "endMs": 7480,
    "text": "tất cả trước khi động vào cái báo cáo quan trọng",
    "tokens": [
      {
        "text": "tất",
        "startMs": 5240,
        "endMs": 5430
      },
      {
        "text": "cả",
        "startMs": 5430,
        "endMs": 5610
      },
      {
        "text": "trước",
        "startMs": 5610,
        "endMs": 5900
      },
      {
        "text": "khi",
        "startMs": 5900,
        "endMs": 6040
      },
      {
        "text": "động",
        "startMs": 6040,
        "endMs": 6290
      },
      {
        "text": "vào",
        "startMs": 6290,
        "endMs": 6450
      },
      {
        "text": "cái",
        "startMs": 6450,
        "endMs": 6610
      },
      {
        "text": "báo",
        "startMs": 6610,
        "endMs": 6790
      },
      {
        "text": "cáo",
        "startMs": 6790,
        "endMs": 6910
      },
      {
        "text": "quan",
        "startMs": 6910,
        "endMs": 7070
      },
      {
        "text": "trọng",
        "startMs": 7070,
        "endMs": 7480
      }
    ],
    "highlightKeywords": [
      "báo cáo quan trọng"
    ]
  },
  {
    "id": 5,
    "startMs": 7480,
    "endMs": 9340,
    "text": "đang treo lơ lửng từ 3 ngày trước",
    "tokens": [
      {
        "text": "đang",
        "startMs": 7480,
        "endMs": 7620
      },
      {
        "text": "treo",
        "startMs": 7620,
        "endMs": 7840
      },
      {
        "text": "lơ",
        "startMs": 7840,
        "endMs": 8060
      },
      {
        "text": "lửng",
        "startMs": 8060,
        "endMs": 8320
      },
      {
        "text": "từ",
        "startMs": 8320,
        "endMs": 8500
      },
      {
        "text": "3",
        "startMs": 8500,
        "endMs": 8630
      },
      {
        "text": "ngày",
        "startMs": 8630,
        "endMs": 8850
      },
      {
        "text": "trước",
        "startMs": 8850,
        "endMs": 9340
      }
    ],
    "highlightKeywords": [
      "treo lơ lửng",
      "3 ngày trước"
    ]
  },
  {
    "id": 6,
    "startMs": 9340,
    "endMs": 12160,
    "text": "Chúc mừng bạn vừa mắc hội chứng giả vờ bận rộn",
    "tokens": [
      {
        "text": "Chúc",
        "startMs": 9340,
        "endMs": 9560
      },
      {
        "text": "mừng",
        "startMs": 9560,
        "endMs": 10150
      },
      {
        "text": "bạn",
        "startMs": 10150,
        "endMs": 10190
      },
      {
        "text": "vừa",
        "startMs": 10190,
        "endMs": 10370
      },
      {
        "text": "mắc",
        "startMs": 10370,
        "endMs": 10590
      },
      {
        "text": "hội",
        "startMs": 10590,
        "endMs": 10810
      },
      {
        "text": "chứng",
        "startMs": 10810,
        "endMs": 11130
      },
      {
        "text": "giả",
        "startMs": 11130,
        "endMs": 11390
      },
      {
        "text": "vờ",
        "startMs": 11390,
        "endMs": 11610
      },
      {
        "text": "bận",
        "startMs": 11610,
        "endMs": 11870
      },
      {
        "text": "rộn",
        "startMs": 11870,
        "endMs": 12160
      }
    ],
    "highlightKeywords": [
      "hội chứng",
      "giả vờ bận rộn"
    ]
  },
  {
    "id": 7,
    "startMs": 12160,
    "endMs": 13420,
    "text": "Đây là cách nó hoạt động",
    "tokens": [
      {
        "text": "Đây",
        "startMs": 12160,
        "endMs": 12360
      },
      {
        "text": "là",
        "startMs": 12360,
        "endMs": 12480
      },
      {
        "text": "cách",
        "startMs": 12480,
        "endMs": 12680
      },
      {
        "text": "nó",
        "startMs": 12680,
        "endMs": 12800
      },
      {
        "text": "hoạt",
        "startMs": 12800,
        "endMs": 13070
      },
      {
        "text": "động",
        "startMs": 13070,
        "endMs": 13420
      }
    ],
    "highlightKeywords": [
      "cách nó hoạt động"
    ]
  },
  {
    "id": 8,
    "startMs": 13420,
    "endMs": 15900,
    "text": "não bạn cực kỳ giỏi phân biệt bận và hiệu quả",
    "tokens": [
      {
        "text": "não",
        "startMs": 13420,
        "endMs": 13590
      },
      {
        "text": "bạn",
        "startMs": 13590,
        "endMs": 13800
      },
      {
        "text": "cực",
        "startMs": 13800,
        "endMs": 14000
      },
      {
        "text": "kỳ",
        "startMs": 14000,
        "endMs": 14160
      },
      {
        "text": "giỏi",
        "startMs": 14160,
        "endMs": 14410
      },
      {
        "text": "phân",
        "startMs": 14410,
        "endMs": 14610
      },
      {
        "text": "biệt",
        "startMs": 14610,
        "endMs": 14860
      },
      {
        "text": "bận",
        "startMs": 14860,
        "endMs": 15100
      },
      {
        "text": "và",
        "startMs": 15100,
        "endMs": 15220
      },
      {
        "text": "hiệu",
        "startMs": 15220,
        "endMs": 15470
      },
      {
        "text": "quả",
        "startMs": 15470,
        "endMs": 15900
      }
    ],
    "highlightKeywords": [
      "bận",
      "hiệu quả"
    ]
  },
  {
    "id": 9,
    "startMs": 15900,
    "endMs": 18680,
    "text": "chỉ có điều nó cố tình lờ đi sự khác biệt đó",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 15900,
        "endMs": 16130
      },
      {
        "text": "có",
        "startMs": 16130,
        "endMs": 16270
      },
      {
        "text": "điều",
        "startMs": 16270,
        "endMs": 16600
      },
      {
        "text": "nó",
        "startMs": 16600,
        "endMs": 16740
      },
      {
        "text": "cố",
        "startMs": 16740,
        "endMs": 16920
      },
      {
        "text": "tình",
        "startMs": 16920,
        "endMs": 17150
      },
      {
        "text": "lờ",
        "startMs": 17150,
        "endMs": 17330
      },
      {
        "text": "đi",
        "startMs": 17330,
        "endMs": 17470
      },
      {
        "text": "sự",
        "startMs": 17470,
        "endMs": 17660
      },
      {
        "text": "khác",
        "startMs": 17660,
        "endMs": 17900
      },
      {
        "text": "biệt",
        "startMs": 17900,
        "endMs": 18460
      },
      {
        "text": "đó",
        "startMs": 18460,
        "endMs": 18680
      }
    ],
    "highlightKeywords": [
      "cố tình lờ đi"
    ]
  },
  {
    "id": 10,
    "startMs": 18460,
    "endMs": 19900,
    "text": "vì cảm giác hoàn thành việc nhỏ",
    "tokens": [
      {
        "text": "vì",
        "startMs": 18460,
        "endMs": 18610
      },
      {
        "text": "cảm",
        "startMs": 18610,
        "endMs": 18790
      },
      {
        "text": "giác",
        "startMs": 18790,
        "endMs": 18990
      },
      {
        "text": "hoàn",
        "startMs": 18990,
        "endMs": 19190
      },
      {
        "text": "thành",
        "startMs": 19190,
        "endMs": 19440
      },
      {
        "text": "việc",
        "startMs": 19440,
        "endMs": 19690
      },
      {
        "text": "nhỏ",
        "startMs": 19690,
        "endMs": 19900
      }
    ],
    "highlightKeywords": [
      "việc nhỏ"
    ]
  },
  {
    "id": 11,
    "startMs": 19900,
    "endMs": 22540,
    "text": "sướng hơn nhiều so với đối mặt việc lớn đáng sợ",
    "tokens": [
      {
        "text": "sướng",
        "startMs": 19900,
        "endMs": 20220
      },
      {
        "text": "hơn",
        "startMs": 20220,
        "endMs": 20380
      },
      {
        "text": "nhiều",
        "startMs": 20380,
        "endMs": 20760
      },
      {
        "text": "so",
        "startMs": 20760,
        "endMs": 20850
      },
      {
        "text": "với",
        "startMs": 20850,
        "endMs": 21050
      },
      {
        "text": "đối",
        "startMs": 21050,
        "endMs": 21290
      },
      {
        "text": "mặt",
        "startMs": 21290,
        "endMs": 21510
      },
      {
        "text": "việc",
        "startMs": 21510,
        "endMs": 21740
      },
      {
        "text": "lớn",
        "startMs": 21740,
        "endMs": 21940
      },
      {
        "text": "đáng",
        "startMs": 21940,
        "endMs": 22180
      },
      {
        "text": "sợ",
        "startMs": 22180,
        "endMs": 22540
      }
    ],
    "highlightKeywords": [
      "sướng hơn nhiều",
      "việc lớn đáng sợ"
    ]
  },
  {
    "id": 12,
    "startMs": 22540,
    "endMs": 24180,
    "text": "Dọn bàn xong bạn có cảm giác",
    "tokens": [
      {
        "text": "Dọn",
        "startMs": 22540,
        "endMs": 22790
      },
      {
        "text": "bàn",
        "startMs": 22790,
        "endMs": 23050
      },
      {
        "text": "xong",
        "startMs": 23050,
        "endMs": 23540
      },
      {
        "text": "bạn",
        "startMs": 23540,
        "endMs": 23570
      },
      {
        "text": "có",
        "startMs": 23570,
        "endMs": 23710
      },
      {
        "text": "cảm",
        "startMs": 23710,
        "endMs": 23950
      },
      {
        "text": "giác",
        "startMs": 23950,
        "endMs": 24180
      }
    ],
    "highlightKeywords": [
      "Dọn bàn xong"
    ]
  },
  {
    "id": 13,
    "startMs": 24180,
    "endMs": 26010,
    "text": "à mình vừa làm được gì đó",
    "tokens": [
      {
        "text": "à",
        "startMs": 24180,
        "endMs": 24400
      },
      {
        "text": "mình",
        "startMs": 24400,
        "endMs": 24680
      },
      {
        "text": "vừa",
        "startMs": 24680,
        "endMs": 24870
      },
      {
        "text": "làm",
        "startMs": 24870,
        "endMs": 25060
      },
      {
        "text": "được",
        "startMs": 25060,
        "endMs": 25440
      },
      {
        "text": "gì",
        "startMs": 25440,
        "endMs": 25580
      },
      {
        "text": "đó",
        "startMs": 25580,
        "endMs": 26000
      }
    ],
    "highlightKeywords": [
      "làm được gì đó"
    ]
  },
  {
    "id": 14,
    "startMs": 26040,
    "endMs": 27590,
    "text": "não tiết ra một chút dopamine",
    "tokens": [
      {
        "text": "não",
        "startMs": 26040,
        "endMs": 26240
      },
      {
        "text": "tiết",
        "startMs": 26240,
        "endMs": 26500
      },
      {
        "text": "ra",
        "startMs": 26500,
        "endMs": 26580
      },
      {
        "text": "một",
        "startMs": 26580,
        "endMs": 26810
      },
      {
        "text": "chút",
        "startMs": 26810,
        "endMs": 27040
      },
      {
        "text": "dopamine",
        "startMs": 27040,
        "endMs": 27590
      }
    ],
    "highlightKeywords": [
      "dopamine"
    ]
  },
  {
    "id": 15,
    "startMs": 27590,
    "endMs": 29680,
    "text": "y hệt như vừa hoàn thành việc thật sự",
    "tokens": [
      {
        "text": "y",
        "startMs": 27590,
        "endMs": 27630
      },
      {
        "text": "hệt",
        "startMs": 27630,
        "endMs": 27870
      },
      {
        "text": "như",
        "startMs": 27870,
        "endMs": 27990
      },
      {
        "text": "vừa",
        "startMs": 27990,
        "endMs": 28210
      },
      {
        "text": "hoàn",
        "startMs": 28210,
        "endMs": 28440
      },
      {
        "text": "thành",
        "startMs": 28440,
        "endMs": 28740
      },
      {
        "text": "việc",
        "startMs": 28740,
        "endMs": 29000
      },
      {
        "text": "thật",
        "startMs": 29000,
        "endMs": 29270
      },
      {
        "text": "sự",
        "startMs": 29270,
        "endMs": 29680
      }
    ],
    "highlightKeywords": [
      "việc thật sự"
    ]
  },
  {
    "id": 16,
    "startMs": 29680,
    "endMs": 32100,
    "text": "Vấn đề là báo cáo kia thì vẫn nằm y nguyên",
    "tokens": [
      {
        "text": "Vấn",
        "startMs": 29680,
        "endMs": 29940
      },
      {
        "text": "đề",
        "startMs": 29940,
        "endMs": 30200
      },
      {
        "text": "là",
        "startMs": 30200,
        "endMs": 30360
      },
      {
        "text": "báo",
        "startMs": 30360,
        "endMs": 30570
      },
      {
        "text": "cáo",
        "startMs": 30570,
        "endMs": 30780
      },
      {
        "text": "kia",
        "startMs": 30780,
        "endMs": 30940
      },
      {
        "text": "thì",
        "startMs": 30940,
        "endMs": 31140
      },
      {
        "text": "vẫn",
        "startMs": 31140,
        "endMs": 31400
      },
      {
        "text": "nằm",
        "startMs": 31400,
        "endMs": 31610
      },
      {
        "text": "y",
        "startMs": 31610,
        "endMs": 31855
      },
      {
        "text": "nguyên",
        "startMs": 31855,
        "endMs": 32100
      }
    ],
    "highlightKeywords": [
      "vẫn nằm y nguyên"
    ]
  },
  {
    "id": 17,
    "startMs": 32100,
    "endMs": 34540,
    "text": "còn deadline thì đang xích lại gần hơn từng phút",
    "tokens": [
      {
        "text": "còn",
        "startMs": 32100,
        "endMs": 32240
      },
      {
        "text": "deadline",
        "startMs": 32240,
        "endMs": 32630
      },
      {
        "text": "thì",
        "startMs": 32630,
        "endMs": 32820
      },
      {
        "text": "đang",
        "startMs": 32820,
        "endMs": 33060
      },
      {
        "text": "xích",
        "startMs": 33060,
        "endMs": 33290
      },
      {
        "text": "lại",
        "startMs": 33290,
        "endMs": 33530
      },
      {
        "text": "gần",
        "startMs": 33530,
        "endMs": 33760
      },
      {
        "text": "hơn",
        "startMs": 33760,
        "endMs": 33950
      },
      {
        "text": "từng",
        "startMs": 33950,
        "endMs": 34320
      },
      {
        "text": "phút",
        "startMs": 34320,
        "endMs": 34540
      }
    ],
    "highlightKeywords": [
      "deadline",
      "gần hơn từng phút"
    ]
  },
  {
    "id": 18,
    "startMs": 34540,
    "endMs": 36080,
    "text": "Đây mới là phần buồn cười",
    "tokens": [
      {
        "text": "Đây",
        "startMs": 34540,
        "endMs": 34760
      },
      {
        "text": "mới",
        "startMs": 34760,
        "endMs": 34980
      },
      {
        "text": "là",
        "startMs": 34980,
        "endMs": 35110
      },
      {
        "text": "phần",
        "startMs": 35110,
        "endMs": 35380
      },
      {
        "text": "buồn",
        "startMs": 35380,
        "endMs": 35640
      },
      {
        "text": "cười",
        "startMs": 35640,
        "endMs": 36080
      }
    ],
    "highlightKeywords": [
      "buồn cười"
    ]
  },
  {
    "id": 19,
    "startMs": 36080,
    "endMs": 37980,
    "text": "càng nhiều việc nhỏ giả vờ bận rộn",
    "tokens": [
      {
        "text": "càng",
        "startMs": 36080,
        "endMs": 36290
      },
      {
        "text": "nhiều",
        "startMs": 36290,
        "endMs": 36580
      },
      {
        "text": "việc",
        "startMs": 36580,
        "endMs": 36830
      },
      {
        "text": "nhỏ",
        "startMs": 36830,
        "endMs": 37030
      },
      {
        "text": "giả",
        "startMs": 37030,
        "endMs": 37230
      },
      {
        "text": "vờ",
        "startMs": 37230,
        "endMs": 37440
      },
      {
        "text": "bận",
        "startMs": 37440,
        "endMs": 37720
      },
      {
        "text": "rộn",
        "startMs": 37720,
        "endMs": 37980
      }
    ],
    "highlightKeywords": [
      "giả vờ bận rộn"
    ]
  },
  {
    "id": 20,
    "startMs": 37980,
    "endMs": 39640,
    "text": "bạn càng có lý do chính đáng để nói",
    "tokens": [
      {
        "text": "bạn",
        "startMs": 37980,
        "endMs": 38210
      },
      {
        "text": "càng",
        "startMs": 38210,
        "endMs": 38400
      },
      {
        "text": "có",
        "startMs": 38400,
        "endMs": 38520
      },
      {
        "text": "lý",
        "startMs": 38520,
        "endMs": 38640
      },
      {
        "text": "do",
        "startMs": 38640,
        "endMs": 38720
      },
      {
        "text": "chính",
        "startMs": 38720,
        "endMs": 39010
      },
      {
        "text": "đáng",
        "startMs": 39010,
        "endMs": 39260
      },
      {
        "text": "để",
        "startMs": 39260,
        "endMs": 39470
      },
      {
        "text": "nói",
        "startMs": 39470,
        "endMs": 39640
      }
    ],
    "highlightKeywords": [
      "lý do chính đáng"
    ]
  },
  {
    "id": 21,
    "startMs": 39640,
    "endMs": 40760,
    "text": "hôm nay mình bận lắm",
    "tokens": [
      {
        "text": "hôm",
        "startMs": 39640,
        "endMs": 39800
      },
      {
        "text": "nay",
        "startMs": 39800,
        "endMs": 39920
      },
      {
        "text": "mình",
        "startMs": 39920,
        "endMs": 40120
      },
      {
        "text": "bận",
        "startMs": 40120,
        "endMs": 40370
      },
      {
        "text": "lắm",
        "startMs": 40370,
        "endMs": 40760
      }
    ],
    "highlightKeywords": [
      "bận lắm"
    ]
  },
  {
    "id": 22,
    "startMs": 40760,
    "endMs": 43740,
    "text": "mà không ai kể cả chính bạn chất vấn được điều đó",
    "tokens": [
      {
        "text": "mà",
        "startMs": 40760,
        "endMs": 40970
      },
      {
        "text": "không",
        "startMs": 40970,
        "endMs": 41390
      },
      {
        "text": "ai",
        "startMs": 41390,
        "endMs": 41720
      },
      {
        "text": "kể",
        "startMs": 41720,
        "endMs": 41840
      },
      {
        "text": "cả",
        "startMs": 41840,
        "endMs": 42000
      },
      {
        "text": "chính",
        "startMs": 42000,
        "endMs": 42240
      },
      {
        "text": "bạn",
        "startMs": 42240,
        "endMs": 42520
      },
      {
        "text": "chất",
        "startMs": 42520,
        "endMs": 42680
      },
      {
        "text": "vấn",
        "startMs": 42680,
        "endMs": 42880
      },
      {
        "text": "được",
        "startMs": 42880,
        "endMs": 43200
      },
      {
        "text": "điều",
        "startMs": 43200,
        "endMs": 43480
      },
      {
        "text": "đó",
        "startMs": 43480,
        "endMs": 43740
      }
    ],
    "highlightKeywords": [
      "chất vấn"
    ]
  },
  {
    "id": 23,
    "startMs": 43740,
    "endMs": 45960,
    "text": "Bận rộn giả vờ là vỏ bọc hoàn hảo",
    "tokens": [
      {
        "text": "Bận",
        "startMs": 43740,
        "endMs": 44040
      },
      {
        "text": "rộn",
        "startMs": 44040,
        "endMs": 44290
      },
      {
        "text": "giả",
        "startMs": 44290,
        "endMs": 44540
      },
      {
        "text": "vờ",
        "startMs": 44540,
        "endMs": 44790
      },
      {
        "text": "là",
        "startMs": 44790,
        "endMs": 44940
      },
      {
        "text": "vỏ",
        "startMs": 44940,
        "endMs": 45190
      },
      {
        "text": "bọc",
        "startMs": 45190,
        "endMs": 45390
      },
      {
        "text": "hoàn",
        "startMs": 45390,
        "endMs": 45690
      },
      {
        "text": "hảo",
        "startMs": 45690,
        "endMs": 45960
      }
    ],
    "highlightKeywords": [
      "vỏ bọc hoàn hảo"
    ]
  },
  {
    "id": 24,
    "startMs": 45960,
    "endMs": 48400,
    "text": "vì nhìn từ ngoài nó giống hệt bận rộn thật",
    "tokens": [
      {
        "text": "vì",
        "startMs": 45960,
        "endMs": 46090
      },
      {
        "text": "nhìn",
        "startMs": 46090,
        "endMs": 46310
      },
      {
        "text": "từ",
        "startMs": 46310,
        "endMs": 46490
      },
      {
        "text": "ngoài",
        "startMs": 46490,
        "endMs": 46750
      },
      {
        "text": "nó",
        "startMs": 46750,
        "endMs": 46970
      },
      {
        "text": "giống",
        "startMs": 46970,
        "endMs": 47190
      },
      {
        "text": "hệt",
        "startMs": 47190,
        "endMs": 47410
      },
      {
        "text": "bận",
        "startMs": 47410,
        "endMs": 47670
      },
      {
        "text": "rộn",
        "startMs": 47670,
        "endMs": 47880
      },
      {
        "text": "thật",
        "startMs": 47880,
        "endMs": 48400
      }
    ],
    "highlightKeywords": [
      "giống hệt",
      "bận rộn thật"
    ]
  },
  {
    "id": 25,
    "startMs": 48400,
    "endMs": 49290,
    "text": "Cách nhận diện",
    "tokens": [
      {
        "text": "Cách",
        "startMs": 48400,
        "endMs": 48630
      },
      {
        "text": "nhận",
        "startMs": 48630,
        "endMs": 48890
      },
      {
        "text": "diện",
        "startMs": 48890,
        "endMs": 49290
      }
    ],
    "highlightKeywords": [
      "Cách nhận diện"
    ]
  },
  {
    "id": 26,
    "startMs": 49290,
    "endMs": 51400,
    "text": "nếu việc bạn đang làm có thể bị hoãn vô thời hạn",
    "tokens": [
      {
        "text": "nếu",
        "startMs": 49290,
        "endMs": 49450
      },
      {
        "text": "việc",
        "startMs": 49450,
        "endMs": 49660
      },
      {
        "text": "bạn",
        "startMs": 49660,
        "endMs": 49830
      },
      {
        "text": "đang",
        "startMs": 49830,
        "endMs": 50000
      },
      {
        "text": "làm",
        "startMs": 50000,
        "endMs": 50140
      },
      {
        "text": "có",
        "startMs": 50140,
        "endMs": 50240
      },
      {
        "text": "thể",
        "startMs": 50240,
        "endMs": 50410
      },
      {
        "text": "bị",
        "startMs": 50410,
        "endMs": 50540
      },
      {
        "text": "hoãn",
        "startMs": 50540,
        "endMs": 50780
      },
      {
        "text": "vô",
        "startMs": 50780,
        "endMs": 50860
      },
      {
        "text": "thời",
        "startMs": 50860,
        "endMs": 51070
      },
      {
        "text": "hạn",
        "startMs": 51070,
        "endMs": 51400
      }
    ],
    "highlightKeywords": [
      "hoãn vô thời hạn"
    ]
  },
  {
    "id": 27,
    "startMs": 51400,
    "endMs": 52830,
    "text": "mà chẳng ai chết vì nó",
    "tokens": [
      {
        "text": "mà",
        "startMs": 51400,
        "endMs": 51480
      },
      {
        "text": "chẳng",
        "startMs": 51480,
        "endMs": 51930
      },
      {
        "text": "ai",
        "startMs": 51930,
        "endMs": 52065
      },
      {
        "text": "chết",
        "startMs": 52065,
        "endMs": 52200
      },
      {
        "text": "vì",
        "startMs": 52200,
        "endMs": 52600
      },
      {
        "text": "nó",
        "startMs": 52600,
        "endMs": 52780
      }
    ],
    "highlightKeywords": [
      "chẳng ai chết"
    ]
  },
  {
    "id": 28,
    "startMs": 52860,
    "endMs": 55640,
    "text": "kiểu sắp xếp lại thư mục file lần thứ 5 trong tháng",
    "tokens": [
      {
        "text": "kiểu",
        "startMs": 52860,
        "endMs": 53030
      },
      {
        "text": "sắp",
        "startMs": 53030,
        "endMs": 53240
      },
      {
        "text": "xếp",
        "startMs": 53240,
        "endMs": 53450
      },
      {
        "text": "lại",
        "startMs": 53450,
        "endMs": 53670
      },
      {
        "text": "thư",
        "startMs": 53670,
        "endMs": 53980
      },
      {
        "text": "mục",
        "startMs": 53980,
        "endMs": 54110
      },
      {
        "text": "file",
        "startMs": 54110,
        "endMs": 54270
      },
      {
        "text": "lần",
        "startMs": 54270,
        "endMs": 54480
      },
      {
        "text": "thứ",
        "startMs": 54480,
        "endMs": 54700
      },
      {
        "text": "5",
        "startMs": 54700,
        "endMs": 54830
      },
      {
        "text": "trong",
        "startMs": 54830,
        "endMs": 55050
      },
      {
        "text": "tháng",
        "startMs": 55050,
        "endMs": 55640
      }
    ],
    "highlightKeywords": [
      "lần thứ 5 trong tháng"
    ]
  },
  {
    "id": 29,
    "startMs": 55640,
    "endMs": 57540,
    "text": "thì khả năng cao đó không phải công việc",
    "tokens": [
      {
        "text": "thì",
        "startMs": 55640,
        "endMs": 55670
      },
      {
        "text": "khả",
        "startMs": 55670,
        "endMs": 55880
      },
      {
        "text": "năng",
        "startMs": 55880,
        "endMs": 56110
      },
      {
        "text": "cao",
        "startMs": 56110,
        "endMs": 56210
      },
      {
        "text": "đó",
        "startMs": 56210,
        "endMs": 56380
      },
      {
        "text": "không",
        "startMs": 56380,
        "endMs": 56640
      },
      {
        "text": "phải",
        "startMs": 56640,
        "endMs": 56940
      },
      {
        "text": "công",
        "startMs": 56940,
        "endMs": 57120
      },
      {
        "text": "việc",
        "startMs": 57120,
        "endMs": 57540
      }
    ],
    "highlightKeywords": [
      "không phải công việc"
    ]
  },
  {
    "id": 30,
    "startMs": 57540,
    "endMs": 59580,
    "text": "đó là trốn việc mặc áo giáp công việc",
    "tokens": [
      {
        "text": "đó",
        "startMs": 57540,
        "endMs": 57720
      },
      {
        "text": "là",
        "startMs": 57720,
        "endMs": 57850
      },
      {
        "text": "trốn",
        "startMs": 57850,
        "endMs": 58150
      },
      {
        "text": "việc",
        "startMs": 58150,
        "endMs": 58460
      },
      {
        "text": "mặc",
        "startMs": 58460,
        "endMs": 58670
      },
      {
        "text": "áo",
        "startMs": 58670,
        "endMs": 58770
      },
      {
        "text": "giáp",
        "startMs": 58770,
        "endMs": 59040
      },
      {
        "text": "công",
        "startMs": 59040,
        "endMs": 59220
      },
      {
        "text": "việc",
        "startMs": 59220,
        "endMs": 59580
      }
    ],
    "highlightKeywords": [
      "trốn việc",
      "áo giáp công việc"
    ]
  },
  {
    "id": 31,
    "startMs": 59580,
    "endMs": 60450,
    "text": "Cách thoát",
    "tokens": [
      {
        "text": "Cách",
        "startMs": 59580,
        "endMs": 59850
      },
      {
        "text": "thoát",
        "startMs": 59850,
        "endMs": 60450
      }
    ],
    "highlightKeywords": [
      "Cách thoát"
    ]
  },
  {
    "id": 32,
    "startMs": 60450,
    "endMs": 61940,
    "text": "trước khi làm bất cứ việc nhỏ nào",
    "tokens": [
      {
        "text": "trước",
        "startMs": 60450,
        "endMs": 60640
      },
      {
        "text": "khi",
        "startMs": 60640,
        "endMs": 60760
      },
      {
        "text": "làm",
        "startMs": 60760,
        "endMs": 60920
      },
      {
        "text": "bất",
        "startMs": 60920,
        "endMs": 61120
      },
      {
        "text": "cứ",
        "startMs": 61120,
        "endMs": 61300
      },
      {
        "text": "việc",
        "startMs": 61300,
        "endMs": 61520
      },
      {
        "text": "nhỏ",
        "startMs": 61520,
        "endMs": 61710
      },
      {
        "text": "nào",
        "startMs": 61710,
        "endMs": 61940
      }
    ],
    "highlightKeywords": [
      "việc nhỏ nào"
    ]
  },
  {
    "id": 33,
    "startMs": 61940,
    "endMs": 63500,
    "text": "tự hỏi một câu duy nhất",
    "tokens": [
      {
        "text": "tự",
        "startMs": 61940,
        "endMs": 62130
      },
      {
        "text": "hỏi",
        "startMs": 62130,
        "endMs": 62360
      },
      {
        "text": "một",
        "startMs": 62360,
        "endMs": 62600
      },
      {
        "text": "câu",
        "startMs": 62600,
        "endMs": 62780
      },
      {
        "text": "duy",
        "startMs": 62780,
        "endMs": 62920
      },
      {
        "text": "nhất",
        "startMs": 62920,
        "endMs": 63500
      }
    ],
    "highlightKeywords": [
      "một câu duy nhất"
    ]
  },
  {
    "id": 34,
    "startMs": 63500,
    "endMs": 65980,
    "text": "việc này có đang né việc quan trọng nhất trong ngày không",
    "tokens": [
      {
        "text": "việc",
        "startMs": 63500,
        "endMs": 63630
      },
      {
        "text": "này",
        "startMs": 63630,
        "endMs": 63740
      },
      {
        "text": "có",
        "startMs": 63740,
        "endMs": 63900
      },
      {
        "text": "đang",
        "startMs": 63900,
        "endMs": 64060
      },
      {
        "text": "né",
        "startMs": 64060,
        "endMs": 64220
      },
      {
        "text": "việc",
        "startMs": 64220,
        "endMs": 64470
      },
      {
        "text": "quan",
        "startMs": 64470,
        "endMs": 64620
      },
      {
        "text": "trọng",
        "startMs": 64620,
        "endMs": 65120
      },
      {
        "text": "nhất",
        "startMs": 65120,
        "endMs": 65160
      },
      {
        "text": "trong",
        "startMs": 65160,
        "endMs": 65340
      },
      {
        "text": "ngày",
        "startMs": 65340,
        "endMs": 65540
      },
      {
        "text": "không",
        "startMs": 65540,
        "endMs": 65980
      }
    ],
    "highlightKeywords": [
      "né việc quan trọng nhất"
    ]
  },
  {
    "id": 35,
    "startMs": 65980,
    "endMs": 68250,
    "text": "Nếu câu trả lời là có đóng hết tab",
    "tokens": [
      {
        "text": "Nếu",
        "startMs": 65980,
        "endMs": 66240
      },
      {
        "text": "câu",
        "startMs": 66240,
        "endMs": 66450
      },
      {
        "text": "trả",
        "startMs": 66450,
        "endMs": 66710
      },
      {
        "text": "lời",
        "startMs": 66710,
        "endMs": 66970
      },
      {
        "text": "là",
        "startMs": 66970,
        "endMs": 67130
      },
      {
        "text": "có",
        "startMs": 67130,
        "endMs": 67420
      },
      {
        "text": "đóng",
        "startMs": 67420,
        "endMs": 67650
      },
      {
        "text": "hết",
        "startMs": 67650,
        "endMs": 67930
      },
      {
        "text": "tab",
        "startMs": 67930,
        "endMs": 68250
      }
    ],
    "highlightKeywords": [
      "đóng hết tab"
    ]
  },
  {
    "id": 36,
    "startMs": 68250,
    "endMs": 70740,
    "text": "quay lại việc lớn dù nó đáng sợ đến mấy",
    "tokens": [
      {
        "text": "quay",
        "startMs": 68250,
        "endMs": 68340
      },
      {
        "text": "lại",
        "startMs": 68340,
        "endMs": 68580
      },
      {
        "text": "việc",
        "startMs": 68580,
        "endMs": 68870
      },
      {
        "text": "lớn",
        "startMs": 68870,
        "endMs": 69180
      },
      {
        "text": "dù",
        "startMs": 69180,
        "endMs": 69370
      },
      {
        "text": "nó",
        "startMs": 69370,
        "endMs": 69490
      },
      {
        "text": "đáng",
        "startMs": 69490,
        "endMs": 69800
      },
      {
        "text": "sợ",
        "startMs": 69800,
        "endMs": 70010
      },
      {
        "text": "đến",
        "startMs": 70010,
        "endMs": 70330
      },
      {
        "text": "mấy",
        "startMs": 70330,
        "endMs": 70740
      }
    ],
    "highlightKeywords": [
      "quay lại việc lớn"
    ]
  },
  {
    "id": 37,
    "startMs": 70740,
    "endMs": 72180,
    "text": "Bận rộn không phải thành tích",
    "tokens": [
      {
        "text": "Bận",
        "startMs": 70740,
        "endMs": 71000
      },
      {
        "text": "rộn",
        "startMs": 71000,
        "endMs": 71140
      },
      {
        "text": "không",
        "startMs": 71140,
        "endMs": 71380
      },
      {
        "text": "phải",
        "startMs": 71380,
        "endMs": 71640
      },
      {
        "text": "thành",
        "startMs": 71640,
        "endMs": 71850
      },
      {
        "text": "tích",
        "startMs": 71850,
        "endMs": 72180
      }
    ],
    "highlightKeywords": [
      "không phải thành tích"
    ]
  },
  {
    "id": 38,
    "startMs": 72180,
    "endMs": 74820,
    "text": "Làm đúng việc quan trọng mới là thành tích",
    "tokens": [
      {
        "text": "Làm",
        "startMs": 72180,
        "endMs": 72390
      },
      {
        "text": "đúng",
        "startMs": 72390,
        "endMs": 72630
      },
      {
        "text": "việc",
        "startMs": 72630,
        "endMs": 72900
      },
      {
        "text": "quan",
        "startMs": 72900,
        "endMs": 73080
      },
      {
        "text": "trọng",
        "startMs": 73080,
        "endMs": 73390
      },
      {
        "text": "mới",
        "startMs": 73390,
        "endMs": 73610
      },
      {
        "text": "là",
        "startMs": 73610,
        "endMs": 73740
      },
      {
        "text": "thành",
        "startMs": 73740,
        "endMs": 74050
      },
      {
        "text": "tích",
        "startMs": 74050,
        "endMs": 74420
      }
    ],
    "highlightKeywords": [
      "đúng việc quan trọng",
      "thành tích"
    ]
  }
];
