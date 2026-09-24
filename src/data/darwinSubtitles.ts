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

export const darwinSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "startMs": 50,
    "endMs": 2000,
    "text": "Charles Darwin viết ra thuyết tiến hóa,",
    "tokens": [
      {
        "text": "Charles",
        "startMs": 50,
        "endMs": 370
      },
      {
        "text": "Darwin",
        "startMs": 370,
        "endMs": 690
      },
      {
        "text": "viết",
        "startMs": 690,
        "endMs": 950
      },
      {
        "text": "ra",
        "startMs": 950,
        "endMs": 1050
      },
      {
        "text": "thuyết",
        "startMs": 1050,
        "endMs": 1460
      },
      {
        "text": "tiến",
        "startMs": 1460,
        "endMs": 1770
      },
      {
        "text": "hóa",
        "startMs": 1770,
        "endMs": 2000
      }
    ],
    "highlightKeywords": [
      "Charles Darwin",
      "thuyết tiến hóa"
    ]
  },
  {
    "id": 1,
    "startMs": 2000,
    "endMs": 3290,
    "text": "thay đổi hoàn toàn cách nhân loại",
    "tokens": [
      {
        "text": "thay",
        "startMs": 2000,
        "endMs": 2140
      },
      {
        "text": "đổi",
        "startMs": 2140,
        "endMs": 2360
      },
      {
        "text": "hoàn",
        "startMs": 2360,
        "endMs": 2540
      },
      {
        "text": "toàn",
        "startMs": 2540,
        "endMs": 2720
      },
      {
        "text": "cách",
        "startMs": 2720,
        "endMs": 2870
      },
      {
        "text": "nhân",
        "startMs": 2870,
        "endMs": 3060
      },
      {
        "text": "loại",
        "startMs": 3060,
        "endMs": 3290
      }
    ],
    "highlightKeywords": [
      "thay đổi hoàn toàn"
    ]
  },
  {
    "id": 2,
    "startMs": 3290,
    "endMs": 4660,
    "text": "hiểu về nguồn gốc sự sống.",
    "tokens": [
      {
        "text": "hiểu",
        "startMs": 3290,
        "endMs": 3500
      },
      {
        "text": "về",
        "startMs": 3500,
        "endMs": 3650
      },
      {
        "text": "nguồn",
        "startMs": 3650,
        "endMs": 3890
      },
      {
        "text": "gốc",
        "startMs": 3890,
        "endMs": 4070
      },
      {
        "text": "sự",
        "startMs": 4070,
        "endMs": 4220
      },
      {
        "text": "sống",
        "startMs": 4220,
        "endMs": 4660
      }
    ],
    "highlightKeywords": [
      "nguồn gốc sự sống"
    ]
  },
  {
    "id": 3,
    "startMs": 4660,
    "endMs": 5850,
    "text": "Nhưng trước khi trở thành",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 4660,
        "endMs": 4910
      },
      {
        "text": "trước",
        "startMs": 4910,
        "endMs": 5270
      },
      {
        "text": "khi",
        "startMs": 5270,
        "endMs": 5380
      },
      {
        "text": "trở",
        "startMs": 5380,
        "endMs": 5600
      },
      {
        "text": "thành",
        "startMs": 5600,
        "endMs": 5850
      }
    ],
    "highlightKeywords": [
      "trước khi"
    ]
  },
  {
    "id": 4,
    "startMs": 5850,
    "endMs": 7280,
    "text": "nhà khoa học vĩ đại đó,",
    "tokens": [
      {
        "text": "nhà",
        "startMs": 5850,
        "endMs": 6020
      },
      {
        "text": "khoa",
        "startMs": 6020,
        "endMs": 6260
      },
      {
        "text": "học",
        "startMs": 6260,
        "endMs": 6400
      },
      {
        "text": "vĩ",
        "startMs": 6400,
        "endMs": 6570
      },
      {
        "text": "đại",
        "startMs": 6570,
        "endMs": 7060
      },
      {
        "text": "đó",
        "startMs": 7060,
        "endMs": 7280
      }
    ],
    "highlightKeywords": [
      "nhà khoa học vĩ đại"
    ]
  },
  {
    "id": 5,
    "startMs": 7060,
    "endMs": 8890,
    "text": "ông từng có một sở thích kỳ lạ:",
    "tokens": [
      {
        "text": "ông",
        "startMs": 7060,
        "endMs": 7250
      },
      {
        "text": "từng",
        "startMs": 7250,
        "endMs": 7530
      },
      {
        "text": "có",
        "startMs": 7530,
        "endMs": 7670
      },
      {
        "text": "một",
        "startMs": 7670,
        "endMs": 7940
      },
      {
        "text": "sở",
        "startMs": 7940,
        "endMs": 8090
      },
      {
        "text": "thích",
        "startMs": 8090,
        "endMs": 8360
      },
      {
        "text": "kỳ",
        "startMs": 8360,
        "endMs": 8570
      },
      {
        "text": "lạ",
        "startMs": 8570,
        "endMs": 8890
      }
    ],
    "highlightKeywords": [
      "sở thích kỳ lạ"
    ]
  },
  {
    "id": 6,
    "startMs": 8890,
    "endMs": 9960,
    "text": "ăn gần như mọi con vật",
    "tokens": [
      {
        "text": "ăn",
        "startMs": 8890,
        "endMs": 8990
      },
      {
        "text": "gần",
        "startMs": 8990,
        "endMs": 9210
      },
      {
        "text": "như",
        "startMs": 9210,
        "endMs": 9390
      },
      {
        "text": "mọi",
        "startMs": 9390,
        "endMs": 9610
      },
      {
        "text": "con",
        "startMs": 9610,
        "endMs": 9740
      },
      {
        "text": "vật",
        "startMs": 9740,
        "endMs": 9960
      }
    ],
    "highlightKeywords": [
      "ăn gần như mọi con vật"
    ]
  },
  {
    "id": 7,
    "startMs": 9960,
    "endMs": 10760,
    "text": "ông nghiên cứu.",
    "tokens": [
      {
        "text": "ông",
        "startMs": 9960,
        "endMs": 10140
      },
      {
        "text": "nghiên",
        "startMs": 10140,
        "endMs": 10630
      },
      {
        "text": "cứu",
        "startMs": 10630,
        "endMs": 10760
      }
    ],
    "highlightKeywords": [
      "ông nghiên cứu"
    ]
  },
  {
    "id": 8,
    "startMs": 10760,
    "endMs": 12760,
    "text": "Đúng vậy, thời sinh viên ở Cambridge,",
    "tokens": [
      {
        "text": "Đúng",
        "startMs": 10760,
        "endMs": 11060
      },
      {
        "text": "vậy",
        "startMs": 11060,
        "endMs": 11580
      },
      {
        "text": "thời",
        "startMs": 11580,
        "endMs": 11740
      },
      {
        "text": "sinh",
        "startMs": 11740,
        "endMs": 11910
      },
      {
        "text": "viên",
        "startMs": 11910,
        "endMs": 12210
      },
      {
        "text": "ở",
        "startMs": 12210,
        "endMs": 12280
      },
      {
        "text": "Cambridge",
        "startMs": 12280,
        "endMs": 12760
      }
    ],
    "highlightKeywords": [
      "sinh viên",
      "Cambridge"
    ]
  },
  {
    "id": 9,
    "startMs": 12760,
    "endMs": 14440,
    "text": "Darwin tham gia một hội kín",
    "tokens": [
      {
        "text": "Darwin",
        "startMs": 12760,
        "endMs": 13080
      },
      {
        "text": "tham",
        "startMs": 13080,
        "endMs": 13270
      },
      {
        "text": "gia",
        "startMs": 13270,
        "endMs": 13440
      },
      {
        "text": "một",
        "startMs": 13440,
        "endMs": 13700
      },
      {
        "text": "hội",
        "startMs": 13700,
        "endMs": 13960
      },
      {
        "text": "kín",
        "startMs": 13960,
        "endMs": 14440
      }
    ],
    "highlightKeywords": [
      "hội kín"
    ]
  },
  {
    "id": 10,
    "startMs": 14440,
    "endMs": 15360,
    "text": "tên là 'Hội Ăn Tạp' —",
    "tokens": [
      {
        "text": "tên",
        "startMs": 14440,
        "endMs": 14560
      },
      {
        "text": "là",
        "startMs": 14560,
        "endMs": 14680
      },
      {
        "text": "Hội",
        "startMs": 14680,
        "endMs": 14880
      },
      {
        "text": "Ăn",
        "startMs": 14880,
        "endMs": 15010
      },
      {
        "text": "Tạp",
        "startMs": 15010,
        "endMs": 15360
      }
    ],
    "highlightKeywords": [
      "Hội Ăn Tạp"
    ]
  },
  {
    "id": 11,
    "startMs": 15360,
    "endMs": 16560,
    "text": "mục tiêu duy nhất của hội",
    "tokens": [
      {
        "text": "mục",
        "startMs": 15360,
        "endMs": 15570
      },
      {
        "text": "tiêu",
        "startMs": 15570,
        "endMs": 15770
      },
      {
        "text": "duy",
        "startMs": 15770,
        "endMs": 15890
      },
      {
        "text": "nhất",
        "startMs": 15890,
        "endMs": 16140
      },
      {
        "text": "của",
        "startMs": 16140,
        "endMs": 16350
      },
      {
        "text": "hội",
        "startMs": 16350,
        "endMs": 16560
      }
    ],
    "highlightKeywords": [
      "mục tiêu duy nhất"
    ]
  },
  {
    "id": 12,
    "startMs": 16560,
    "endMs": 17650,
    "text": "là nếm thử càng nhiều",
    "tokens": [
      {
        "text": "là",
        "startMs": 16560,
        "endMs": 16680
      },
      {
        "text": "nếm",
        "startMs": 16680,
        "endMs": 16920
      },
      {
        "text": "thử",
        "startMs": 16920,
        "endMs": 17200
      },
      {
        "text": "càng",
        "startMs": 17200,
        "endMs": 17380
      },
      {
        "text": "nhiều",
        "startMs": 17380,
        "endMs": 17650
      }
    ],
    "highlightKeywords": [
      "nếm thử"
    ]
  },
  {
    "id": 13,
    "startMs": 17650,
    "endMs": 19280,
    "text": "loài động vật kỳ lạ càng tốt.",
    "tokens": [
      {
        "text": "loài",
        "startMs": 17650,
        "endMs": 17870
      },
      {
        "text": "động",
        "startMs": 17870,
        "endMs": 18170
      },
      {
        "text": "vật",
        "startMs": 18170,
        "endMs": 18320
      },
      {
        "text": "kỳ",
        "startMs": 18320,
        "endMs": 18480
      },
      {
        "text": "lạ",
        "startMs": 18480,
        "endMs": 18660
      },
      {
        "text": "càng",
        "startMs": 18660,
        "endMs": 18870
      },
      {
        "text": "tốt",
        "startMs": 18870,
        "endMs": 19280
      }
    ],
    "highlightKeywords": [
      "động vật kỳ lạ"
    ]
  },
  {
    "id": 14,
    "startMs": 19280,
    "endMs": 20840,
    "text": "Cú, chim ưng,",
    "tokens": [
      {
        "text": "Cú",
        "startMs": 19280,
        "endMs": 19680
      },
      {
        "text": "chim",
        "startMs": 19680,
        "endMs": 20010
      },
      {
        "text": "ưng",
        "startMs": 20010,
        "endMs": 20840
      }
    ],
    "highlightKeywords": [
      "Cú",
      "chim ưng"
    ]
  },
  {
    "id": 15,
    "startMs": 20840,
    "endMs": 22380,
    "text": "thậm chí cả... một con cáo già,",
    "tokens": [
      {
        "text": "thậm",
        "startMs": 20840,
        "endMs": 21080
      },
      {
        "text": "chí",
        "startMs": 21080,
        "endMs": 21290
      },
      {
        "text": "cả",
        "startMs": 21290,
        "endMs": 21600
      },
      {
        "text": "một",
        "startMs": 21600,
        "endMs": 21830
      },
      {
        "text": "con",
        "startMs": 21830,
        "endMs": 21970
      },
      {
        "text": "cáo",
        "startMs": 21970,
        "endMs": 22150
      },
      {
        "text": "già",
        "startMs": 22150,
        "endMs": 22380
      }
    ],
    "highlightKeywords": [
      "con cáo già"
    ]
  },
  {
    "id": 16,
    "startMs": 22380,
    "endMs": 24760,
    "text": "tất cả đều từng nằm trên bàn ăn của ông",
    "tokens": [
      {
        "text": "tất",
        "startMs": 22380,
        "endMs": 22720
      },
      {
        "text": "cả",
        "startMs": 22720,
        "endMs": 22870
      },
      {
        "text": "đều",
        "startMs": 22870,
        "endMs": 23050
      },
      {
        "text": "từng",
        "startMs": 23050,
        "endMs": 23330
      },
      {
        "text": "nằm",
        "startMs": 23330,
        "endMs": 23540
      },
      {
        "text": "trên",
        "startMs": 23540,
        "endMs": 23770
      },
      {
        "text": "bàn",
        "startMs": 23770,
        "endMs": 24010
      },
      {
        "text": "ăn",
        "startMs": 24010,
        "endMs": 24180
      },
      {
        "text": "của",
        "startMs": 24180,
        "endMs": 24360
      },
      {
        "text": "ông",
        "startMs": 24360,
        "endMs": 24640
      }
    ],
    "highlightKeywords": [
      "bàn ăn của ông"
    ]
  },
  {
    "id": 17,
    "startMs": 24790,
    "endMs": 26470,
    "text": "trước khi nằm trong sách nghiên cứu.",
    "tokens": [
      {
        "text": "trước",
        "startMs": 24790,
        "endMs": 24990
      },
      {
        "text": "khi",
        "startMs": 24990,
        "endMs": 25090
      },
      {
        "text": "nằm",
        "startMs": 25090,
        "endMs": 25290
      },
      {
        "text": "trong",
        "startMs": 25290,
        "endMs": 25500
      },
      {
        "text": "sách",
        "startMs": 25500,
        "endMs": 25700
      },
      {
        "text": "nghiên",
        "startMs": 25700,
        "endMs": 25980
      },
      {
        "text": "cứu",
        "startMs": 25980,
        "endMs": 26470
      }
    ],
    "highlightKeywords": [
      "sách nghiên cứu"
    ]
  },
  {
    "id": 18,
    "startMs": 26470,
    "endMs": 27790,
    "text": "Trong chuyến hành trình huyền thoại",
    "tokens": [
      {
        "text": "Trong",
        "startMs": 26470,
        "endMs": 26560
      },
      {
        "text": "chuyến",
        "startMs": 26560,
        "endMs": 26790
      },
      {
        "text": "hành",
        "startMs": 26790,
        "endMs": 26990
      },
      {
        "text": "trình",
        "startMs": 26990,
        "endMs": 27230
      },
      {
        "text": "huyền",
        "startMs": 27230,
        "endMs": 27540
      },
      {
        "text": "thoại",
        "startMs": 27540,
        "endMs": 27790
      }
    ],
    "highlightKeywords": [
      "hành trình huyền thoại"
    ]
  },
  {
    "id": 19,
    "startMs": 27790,
    "endMs": 29050,
    "text": "trên tàu Beagle vòng quanh thế giới,",
    "tokens": [
      {
        "text": "trên",
        "startMs": 27790,
        "endMs": 28000
      },
      {
        "text": "tàu",
        "startMs": 28000,
        "endMs": 28160
      },
      {
        "text": "Beagle",
        "startMs": 28160,
        "endMs": 28280
      },
      {
        "text": "vòng",
        "startMs": 28280,
        "endMs": 28460
      },
      {
        "text": "quanh",
        "startMs": 28460,
        "endMs": 28660
      },
      {
        "text": "thế",
        "startMs": 28660,
        "endMs": 28840
      },
      {
        "text": "giới",
        "startMs": 28840,
        "endMs": 29050
      }
    ],
    "highlightKeywords": [
      "tàu Beagle",
      "thế giới"
    ]
  },
  {
    "id": 20,
    "startMs": 29050,
    "endMs": 31100,
    "text": "Darwin tiếp tục truyền thống đó.",
    "tokens": [
      {
        "text": "Darwin",
        "startMs": 29050,
        "endMs": 29480
      },
      {
        "text": "tiếp",
        "startMs": 29480,
        "endMs": 29750
      },
      {
        "text": "tục",
        "startMs": 29750,
        "endMs": 30020
      },
      {
        "text": "truyền",
        "startMs": 30020,
        "endMs": 30260
      },
      {
        "text": "thống",
        "startMs": 30260,
        "endMs": 30600
      },
      {
        "text": "đó",
        "startMs": 30600,
        "endMs": 31100
      }
    ],
    "highlightKeywords": [
      "truyền thống đó"
    ]
  },
  {
    "id": 21,
    "startMs": 31100,
    "endMs": 33380,
    "text": "Ông từng ăn thịt một con rùa khổng lồ Galapagos —",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 31100,
        "endMs": 31280
      },
      {
        "text": "từng",
        "startMs": 31280,
        "endMs": 31490
      },
      {
        "text": "ăn",
        "startMs": 31490,
        "endMs": 31780
      },
      {
        "text": "thịt",
        "startMs": 31780,
        "endMs": 31960
      },
      {
        "text": "một",
        "startMs": 31960,
        "endMs": 32290
      },
      {
        "text": "con",
        "startMs": 32290,
        "endMs": 32480
      },
      {
        "text": "rùa",
        "startMs": 32480,
        "endMs": 32650
      },
      {
        "text": "khổng",
        "startMs": 32650,
        "endMs": 32830
      },
      {
        "text": "lồ",
        "startMs": 32830,
        "endMs": 33180
      },
      {
        "text": "Galapagos",
        "startMs": 33180,
        "endMs": 33380
      }
    ],
    "highlightKeywords": [
      "rùa khổng lồ",
      "Galapagos"
    ]
  },
  {
    "id": 22,
    "startMs": 33380,
    "endMs": 35050,
    "text": "đúng loài rùa mà sau này",
    "tokens": [
      {
        "text": "đúng",
        "startMs": 33380,
        "endMs": 33920
      },
      {
        "text": "loài",
        "startMs": 33920,
        "endMs": 34190
      },
      {
        "text": "rùa",
        "startMs": 34190,
        "endMs": 34460
      },
      {
        "text": "mà",
        "startMs": 34460,
        "endMs": 34630
      },
      {
        "text": "sau",
        "startMs": 34630,
        "endMs": 34870
      },
      {
        "text": "này",
        "startMs": 34870,
        "endMs": 35050
      }
    ],
    "highlightKeywords": [
      "loài rùa"
    ]
  },
  {
    "id": 23,
    "startMs": 34910,
    "endMs": 35940,
    "text": "ông dùng làm bằng chứng",
    "tokens": [
      {
        "text": "ông",
        "startMs": 34910,
        "endMs": 35090
      },
      {
        "text": "dùng",
        "startMs": 35090,
        "endMs": 35270
      },
      {
        "text": "làm",
        "startMs": 35270,
        "endMs": 35530
      },
      {
        "text": "bằng",
        "startMs": 35530,
        "endMs": 35670
      },
      {
        "text": "chứng",
        "startMs": 35670,
        "endMs": 35940
      }
    ],
    "highlightKeywords": [
      "bằng chứng"
    ]
  },
  {
    "id": 24,
    "startMs": 35940,
    "endMs": 36980,
    "text": "cho thuyết tiến hóa.",
    "tokens": [
      {
        "text": "cho",
        "startMs": 35940,
        "endMs": 36260
      },
      {
        "text": "thuyết",
        "startMs": 36260,
        "endMs": 36410
      },
      {
        "text": "tiến",
        "startMs": 36410,
        "endMs": 36760
      },
      {
        "text": "hóa",
        "startMs": 36760,
        "endMs": 36980
      }
    ],
    "highlightKeywords": [
      "thuyết tiến hóa"
    ]
  },
  {
    "id": 25,
    "startMs": 36980,
    "endMs": 38040,
    "text": "Vừa nghiên cứu khoa học,",
    "tokens": [
      {
        "text": "Vừa",
        "startMs": 36980,
        "endMs": 37280
      },
      {
        "text": "nghiên",
        "startMs": 37280,
        "endMs": 37460
      },
      {
        "text": "cứu",
        "startMs": 37460,
        "endMs": 37770
      },
      {
        "text": "khoa",
        "startMs": 37770,
        "endMs": 37920
      },
      {
        "text": "học",
        "startMs": 37920,
        "endMs": 38040
      }
    ],
    "highlightKeywords": [
      "nghiên cứu khoa học"
    ]
  },
  {
    "id": 26,
    "startMs": 38040,
    "endMs": 39790,
    "text": "vừa dùng bữa với chính đối tượng nghiên cứu,",
    "tokens": [
      {
        "text": "vừa",
        "startMs": 38040,
        "endMs": 38280
      },
      {
        "text": "dùng",
        "startMs": 38280,
        "endMs": 38440
      },
      {
        "text": "bữa",
        "startMs": 38440,
        "endMs": 38600
      },
      {
        "text": "với",
        "startMs": 38600,
        "endMs": 38760
      },
      {
        "text": "chính",
        "startMs": 38760,
        "endMs": 38960
      },
      {
        "text": "đối",
        "startMs": 38960,
        "endMs": 39140
      },
      {
        "text": "tượng",
        "startMs": 39140,
        "endMs": 39310
      },
      {
        "text": "nghiên",
        "startMs": 39310,
        "endMs": 39570
      },
      {
        "text": "cứu",
        "startMs": 39570,
        "endMs": 39790
      }
    ],
    "highlightKeywords": [
      "dùng bữa",
      "đối tượng nghiên cứu"
    ]
  },
  {
    "id": 27,
    "startMs": 39790,
    "endMs": 41030,
    "text": "không ai làm điều đó",
    "tokens": [
      {
        "text": "không",
        "startMs": 39790,
        "endMs": 40080
      },
      {
        "text": "ai",
        "startMs": 40080,
        "endMs": 40380
      },
      {
        "text": "làm",
        "startMs": 40380,
        "endMs": 40480
      },
      {
        "text": "điều",
        "startMs": 40480,
        "endMs": 40680
      },
      {
        "text": "đó",
        "startMs": 40680,
        "endMs": 41030
      }
    ],
    "highlightKeywords": [
      "không ai"
    ]
  },
  {
    "id": 28,
    "startMs": 41030,
    "endMs": 41880,
    "text": "tận tâm hơn Darwin.",
    "tokens": [
      {
        "text": "tận",
        "startMs": 41030,
        "endMs": 41230
      },
      {
        "text": "tâm",
        "startMs": 41230,
        "endMs": 41480
      },
      {
        "text": "hơn",
        "startMs": 41480,
        "endMs": 41680
      },
      {
        "text": "Darwin",
        "startMs": 41680,
        "endMs": 41880
      }
    ],
    "highlightKeywords": [
      "tận tâm hơn Darwin"
    ]
  },
  {
    "id": 29,
    "startMs": 41880,
    "endMs": 43610,
    "text": "Ông còn là người cực kỳ chi tiết",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 41880,
        "endMs": 42200
      },
      {
        "text": "còn",
        "startMs": 42200,
        "endMs": 42380
      },
      {
        "text": "là",
        "startMs": 42380,
        "endMs": 42570
      },
      {
        "text": "người",
        "startMs": 42570,
        "endMs": 42700
      },
      {
        "text": "cực",
        "startMs": 42700,
        "endMs": 43090
      },
      {
        "text": "kỳ",
        "startMs": 43090,
        "endMs": 43290
      },
      {
        "text": "chi",
        "startMs": 43290,
        "endMs": 43460
      },
      {
        "text": "tiết",
        "startMs": 43460,
        "endMs": 43610
      }
    ],
    "highlightKeywords": [
      "cực kỳ chi tiết"
    ]
  },
  {
    "id": 30,
    "startMs": 43610,
    "endMs": 44580,
    "text": "đến mức ám ảnh.",
    "tokens": [
      {
        "text": "đến",
        "startMs": 43610,
        "endMs": 43900
      },
      {
        "text": "mức",
        "startMs": 43900,
        "endMs": 44190
      },
      {
        "text": "ám",
        "startMs": 44190,
        "endMs": 44400
      },
      {
        "text": "ảnh",
        "startMs": 44400,
        "endMs": 44580
      }
    ],
    "highlightKeywords": [
      "ám ảnh"
    ]
  },
  {
    "id": 31,
    "startMs": 44500,
    "endMs": 46000,
    "text": "Darwin dành tới 8 năm",
    "tokens": [
      {
        "text": "Darwin",
        "startMs": 44500,
        "endMs": 45000
      },
      {
        "text": "dành",
        "startMs": 45000,
        "endMs": 45310
      },
      {
        "text": "tới",
        "startMs": 45310,
        "endMs": 45560
      },
      {
        "text": "8",
        "startMs": 45560,
        "endMs": 45820
      },
      {
        "text": "năm",
        "startMs": 45820,
        "endMs": 46000
      }
    ],
    "highlightKeywords": [
      "8 năm"
    ]
  },
  {
    "id": 32,
    "startMs": 46000,
    "endMs": 48190,
    "text": "chỉ để nghiên cứu... một loài hà biển",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 46000,
        "endMs": 46180
      },
      {
        "text": "để",
        "startMs": 46180,
        "endMs": 46450
      },
      {
        "text": "nghiên",
        "startMs": 46450,
        "endMs": 46700
      },
      {
        "text": "cứu",
        "startMs": 46700,
        "endMs": 47060
      },
      {
        "text": "một",
        "startMs": 47060,
        "endMs": 47520
      },
      {
        "text": "loài",
        "startMs": 47520,
        "endMs": 47740
      },
      {
        "text": "hà",
        "startMs": 47740,
        "endMs": 48010
      },
      {
        "text": "biển",
        "startMs": 48010,
        "endMs": 48190
      }
    ],
    "highlightKeywords": [
      "loài hà biển"
    ]
  },
  {
    "id": 33,
    "startMs": 48100,
    "endMs": 49640,
    "text": "(giống như con hàu bám trên đá).",
    "tokens": [
      {
        "text": "giống",
        "startMs": 48100,
        "endMs": 48460
      },
      {
        "text": "như",
        "startMs": 48460,
        "endMs": 48690
      },
      {
        "text": "con",
        "startMs": 48690,
        "endMs": 48870
      },
      {
        "text": "hàu",
        "startMs": 48870,
        "endMs": 49010
      },
      {
        "text": "bám",
        "startMs": 49010,
        "endMs": 49230
      },
      {
        "text": "trên",
        "startMs": 49230,
        "endMs": 49410
      },
      {
        "text": "đá",
        "startMs": 49410,
        "endMs": 49640
      }
    ],
    "highlightKeywords": [
      "con hàu bám trên đá"
    ]
  },
  {
    "id": 34,
    "startMs": 49640,
    "endMs": 51300,
    "text": "8 năm, chỉ để hiểu tường tận",
    "tokens": [
      {
        "text": "8",
        "startMs": 49640,
        "endMs": 50080
      },
      {
        "text": "năm",
        "startMs": 50080,
        "endMs": 50090
      },
      {
        "text": "chỉ",
        "startMs": 50090,
        "endMs": 50260
      },
      {
        "text": "để",
        "startMs": 50260,
        "endMs": 50660
      },
      {
        "text": "hiểu",
        "startMs": 50660,
        "endMs": 50710
      },
      {
        "text": "tường",
        "startMs": 50710,
        "endMs": 50950
      },
      {
        "text": "tận",
        "startMs": 50950,
        "endMs": 51300
      }
    ],
    "highlightKeywords": [
      "8 năm",
      "hiểu tường tận"
    ]
  },
  {
    "id": 35,
    "startMs": 51300,
    "endMs": 53000,
    "text": "một sinh vật bé xíu bám vào thành tàu,",
    "tokens": [
      {
        "text": "một",
        "startMs": 51300,
        "endMs": 51510
      },
      {
        "text": "sinh",
        "startMs": 51510,
        "endMs": 51730
      },
      {
        "text": "vật",
        "startMs": 51730,
        "endMs": 51900
      },
      {
        "text": "bé",
        "startMs": 51900,
        "endMs": 52110
      },
      {
        "text": "xíu",
        "startMs": 52110,
        "endMs": 52240
      },
      {
        "text": "bám",
        "startMs": 52240,
        "endMs": 52440
      },
      {
        "text": "vào",
        "startMs": 52440,
        "endMs": 52570
      },
      {
        "text": "thành",
        "startMs": 52570,
        "endMs": 52740
      },
      {
        "text": "tàu",
        "startMs": 52740,
        "endMs": 53000
      }
    ],
    "highlightKeywords": [
      "sinh vật bé xíu"
    ]
  },
  {
    "id": 36,
    "startMs": 53000,
    "endMs": 54240,
    "text": "trước khi dám công bố",
    "tokens": [
      {
        "text": "trước",
        "startMs": 53000,
        "endMs": 53400
      },
      {
        "text": "khi",
        "startMs": 53400,
        "endMs": 53740
      },
      {
        "text": "dám",
        "startMs": 53740,
        "endMs": 53840
      },
      {
        "text": "công",
        "startMs": 53840,
        "endMs": 54040
      },
      {
        "text": "bố",
        "startMs": 54040,
        "endMs": 54240
      }
    ],
    "highlightKeywords": [
      "công bố"
    ]
  },
  {
    "id": 37,
    "startMs": 54240,
    "endMs": 56320,
    "text": "lý thuyết lớn về sự sống trên toàn hành tinh.",
    "tokens": [
      {
        "text": "lý",
        "startMs": 54240,
        "endMs": 54450
      },
      {
        "text": "thuyết",
        "startMs": 54450,
        "endMs": 54480
      },
      {
        "text": "lớn",
        "startMs": 54480,
        "endMs": 54800
      },
      {
        "text": "về",
        "startMs": 54800,
        "endMs": 55100
      },
      {
        "text": "sự",
        "startMs": 55100,
        "endMs": 55210
      },
      {
        "text": "sống",
        "startMs": 55210,
        "endMs": 55380
      },
      {
        "text": "trên",
        "startMs": 55380,
        "endMs": 55640
      },
      {
        "text": "toàn",
        "startMs": 55640,
        "endMs": 55860
      },
      {
        "text": "hành",
        "startMs": 55860,
        "endMs": 56110
      },
      {
        "text": "tinh",
        "startMs": 56110,
        "endMs": 56320
      }
    ],
    "highlightKeywords": [
      "lý thuyết lớn",
      "sự sống"
    ]
  },
  {
    "id": 38,
    "startMs": 56320,
    "endMs": 58570,
    "text": "Và đây là chi tiết khiến ai cũng bật cười:",
    "tokens": [
      {
        "text": "Và",
        "startMs": 56320,
        "endMs": 56600
      },
      {
        "text": "đây",
        "startMs": 56600,
        "endMs": 56760
      },
      {
        "text": "là",
        "startMs": 56760,
        "endMs": 57010
      },
      {
        "text": "chi",
        "startMs": 57010,
        "endMs": 57160
      },
      {
        "text": "tiết",
        "startMs": 57160,
        "endMs": 57310
      },
      {
        "text": "khiến",
        "startMs": 57310,
        "endMs": 57760
      },
      {
        "text": "ai",
        "startMs": 57760,
        "endMs": 57960
      },
      {
        "text": "cũng",
        "startMs": 57960,
        "endMs": 58060
      },
      {
        "text": "bật",
        "startMs": 58060,
        "endMs": 58320
      },
      {
        "text": "cười",
        "startMs": 58320,
        "endMs": 58570
      }
    ],
    "highlightKeywords": [
      "bật cười"
    ]
  },
  {
    "id": 39,
    "startMs": 58570,
    "endMs": 60850,
    "text": "Darwin sợ hãi việc công bố thuyết tiến hóa",
    "tokens": [
      {
        "text": "Darwin",
        "startMs": 58570,
        "endMs": 59000
      },
      {
        "text": "sợ",
        "startMs": 59000,
        "endMs": 59270
      },
      {
        "text": "hãi",
        "startMs": 59270,
        "endMs": 59440
      },
      {
        "text": "việc",
        "startMs": 59440,
        "endMs": 59640
      },
      {
        "text": "công",
        "startMs": 59640,
        "endMs": 59880
      },
      {
        "text": "bố",
        "startMs": 59880,
        "endMs": 60140
      },
      {
        "text": "thuyết",
        "startMs": 60140,
        "endMs": 60270
      },
      {
        "text": "tiến",
        "startMs": 60270,
        "endMs": 60630
      },
      {
        "text": "hóa",
        "startMs": 60630,
        "endMs": 60850
      }
    ],
    "highlightKeywords": [
      "sợ hãi",
      "thuyết tiến hóa"
    ]
  },
  {
    "id": 40,
    "startMs": 60850,
    "endMs": 63000,
    "text": "đến mức trì hoãn suốt 20 năm.",
    "tokens": [
      {
        "text": "đến",
        "startMs": 60850,
        "endMs": 61200
      },
      {
        "text": "mức",
        "startMs": 61200,
        "endMs": 61490
      },
      {
        "text": "trì",
        "startMs": 61490,
        "endMs": 61730
      },
      {
        "text": "hoãn",
        "startMs": 61730,
        "endMs": 61960
      },
      {
        "text": "suốt",
        "startMs": 61960,
        "endMs": 62240
      },
      {
        "text": "20",
        "startMs": 62240,
        "endMs": 62520
      },
      {
        "text": "năm",
        "startMs": 62520,
        "endMs": 63000
      }
    ],
    "highlightKeywords": [
      "trì hoãn suốt 20 năm"
    ]
  },
  {
    "id": 41,
    "startMs": 63000,
    "endMs": 64110,
    "text": "Ông có đầy đủ bằng chứng,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 63000,
        "endMs": 63200
      },
      {
        "text": "có",
        "startMs": 63200,
        "endMs": 63370
      },
      {
        "text": "đầy",
        "startMs": 63370,
        "endMs": 63470
      },
      {
        "text": "đủ",
        "startMs": 63470,
        "endMs": 63690
      },
      {
        "text": "bằng",
        "startMs": 63690,
        "endMs": 63880
      },
      {
        "text": "chứng",
        "startMs": 63880,
        "endMs": 64110
      }
    ],
    "highlightKeywords": [
      "đầy đủ bằng chứng"
    ]
  },
  {
    "id": 42,
    "startMs": 64110,
    "endMs": 65130,
    "text": "đầy đủ lý luận,",
    "tokens": [
      {
        "text": "đầy",
        "startMs": 64110,
        "endMs": 64610
      },
      {
        "text": "đủ",
        "startMs": 64610,
        "endMs": 64780
      },
      {
        "text": "lý",
        "startMs": 64780,
        "endMs": 65000
      },
      {
        "text": "luận",
        "startMs": 65000,
        "endMs": 65130
      }
    ],
    "highlightKeywords": [
      "đầy đủ lý luận"
    ]
  },
  {
    "id": 43,
    "startMs": 65130,
    "endMs": 66110,
    "text": "nhưng cứ ngồi im",
    "tokens": [
      {
        "text": "nhưng",
        "startMs": 65130,
        "endMs": 65440
      },
      {
        "text": "cứ",
        "startMs": 65440,
        "endMs": 65680
      },
      {
        "text": "ngồi",
        "startMs": 65680,
        "endMs": 65840
      },
      {
        "text": "im",
        "startMs": 65840,
        "endMs": 66110
      }
    ],
    "highlightKeywords": [
      "ngồi im"
    ]
  },
  {
    "id": 44,
    "startMs": 66110,
    "endMs": 67160,
    "text": "vì sợ phản ứng dữ dội",
    "tokens": [
      {
        "text": "vì",
        "startMs": 66110,
        "endMs": 66240
      },
      {
        "text": "sợ",
        "startMs": 66240,
        "endMs": 66350
      },
      {
        "text": "phản",
        "startMs": 66350,
        "endMs": 66520
      },
      {
        "text": "ứng",
        "startMs": 66520,
        "endMs": 66760
      },
      {
        "text": "dữ",
        "startMs": 66760,
        "endMs": 66960
      },
      {
        "text": "dội",
        "startMs": 66960,
        "endMs": 67160
      }
    ],
    "highlightKeywords": [
      "phản ứng dữ dội"
    ]
  },
  {
    "id": 45,
    "startMs": 67160,
    "endMs": 68750,
    "text": "từ tôn giáo và xã hội thời đó.",
    "tokens": [
      {
        "text": "từ",
        "startMs": 67160,
        "endMs": 67440
      },
      {
        "text": "tôn",
        "startMs": 67440,
        "endMs": 67620
      },
      {
        "text": "giáo",
        "startMs": 67620,
        "endMs": 67790
      },
      {
        "text": "và",
        "startMs": 67790,
        "endMs": 68010
      },
      {
        "text": "xã",
        "startMs": 68010,
        "endMs": 68140
      },
      {
        "text": "hội",
        "startMs": 68140,
        "endMs": 68270
      },
      {
        "text": "thời",
        "startMs": 68270,
        "endMs": 68490
      },
      {
        "text": "đó",
        "startMs": 68490,
        "endMs": 68750
      }
    ],
    "highlightKeywords": [
      "tôn giáo",
      "xã hội"
    ]
  },
  {
    "id": 46,
    "startMs": 68750,
    "endMs": 70650,
    "text": "Cuối cùng, ông chỉ công bố vội vàng",
    "tokens": [
      {
        "text": "Cuối",
        "startMs": 68750,
        "endMs": 69160
      },
      {
        "text": "cùng",
        "startMs": 69160,
        "endMs": 69450
      },
      {
        "text": "ông",
        "startMs": 69450,
        "endMs": 69910
      },
      {
        "text": "chỉ",
        "startMs": 69910,
        "endMs": 69950
      },
      {
        "text": "công",
        "startMs": 69950,
        "endMs": 70190
      },
      {
        "text": "bố",
        "startMs": 70190,
        "endMs": 70330
      },
      {
        "text": "vội",
        "startMs": 70330,
        "endMs": 70470
      },
      {
        "text": "vàng",
        "startMs": 70470,
        "endMs": 70650
      }
    ],
    "highlightKeywords": [
      "công bố vội vàng"
    ]
  },
  {
    "id": 47,
    "startMs": 70650,
    "endMs": 72010,
    "text": "khi phát hiện một nhà khoa học khác —",
    "tokens": [
      {
        "text": "khi",
        "startMs": 70650,
        "endMs": 70830
      },
      {
        "text": "phát",
        "startMs": 70830,
        "endMs": 70960
      },
      {
        "text": "hiện",
        "startMs": 70960,
        "endMs": 71120
      },
      {
        "text": "một",
        "startMs": 71120,
        "endMs": 71340
      },
      {
        "text": "nhà",
        "startMs": 71340,
        "endMs": 71530
      },
      {
        "text": "khoa",
        "startMs": 71530,
        "endMs": 71680
      },
      {
        "text": "học",
        "startMs": 71680,
        "endMs": 71820
      },
      {
        "text": "khác",
        "startMs": 71820,
        "endMs": 72010
      }
    ],
    "highlightKeywords": [
      "nhà khoa học khác"
    ]
  },
  {
    "id": 48,
    "startMs": 72010,
    "endMs": 72970,
    "text": "Alfred Russel Wallace —",
    "tokens": [
      {
        "text": "Alfred",
        "startMs": 72010,
        "endMs": 72280
      },
      {
        "text": "Russel",
        "startMs": 72280,
        "endMs": 72620
      },
      {
        "text": "Wallace",
        "startMs": 72620,
        "endMs": 72970
      }
    ],
    "highlightKeywords": [
      "Alfred Russel Wallace"
    ]
  },
  {
    "id": 49,
    "startMs": 72970,
    "endMs": 74250,
    "text": "sắp công bố ý tưởng",
    "tokens": [
      {
        "text": "sắp",
        "startMs": 72970,
        "endMs": 73340
      },
      {
        "text": "công",
        "startMs": 73340,
        "endMs": 73580
      },
      {
        "text": "bố",
        "startMs": 73580,
        "endMs": 73910
      },
      {
        "text": "ý",
        "startMs": 73910,
        "endMs": 74070
      },
      {
        "text": "tưởng",
        "startMs": 74070,
        "endMs": 74250
      }
    ],
    "highlightKeywords": [
      "sắp công bố"
    ]
  },
  {
    "id": 50,
    "startMs": 74180,
    "endMs": 75210,
    "text": "gần giống hệt.",
    "tokens": [
      {
        "text": "gần",
        "startMs": 74180,
        "endMs": 74590
      },
      {
        "text": "giống",
        "startMs": 74590,
        "endMs": 74860
      },
      {
        "text": "hệt",
        "startMs": 74860,
        "endMs": 75210
      }
    ],
    "highlightKeywords": [
      "gần giống hệt"
    ]
  },
  {
    "id": 51,
    "startMs": 75210,
    "endMs": 77770,
    "text": "Về đời tư, Darwin kết hôn với người em họ",
    "tokens": [
      {
        "text": "Về",
        "startMs": 75210,
        "endMs": 75640
      },
      {
        "text": "đời",
        "startMs": 75640,
        "endMs": 75820
      },
      {
        "text": "tư",
        "startMs": 75820,
        "endMs": 76090
      },
      {
        "text": "Darwin",
        "startMs": 76090,
        "endMs": 76560
      },
      {
        "text": "kết",
        "startMs": 76560,
        "endMs": 76590
      },
      {
        "text": "hôn",
        "startMs": 76590,
        "endMs": 76810
      },
      {
        "text": "với",
        "startMs": 76810,
        "endMs": 77030
      },
      {
        "text": "người",
        "startMs": 77030,
        "endMs": 77220
      },
      {
        "text": "em",
        "startMs": 77220,
        "endMs": 77590
      },
      {
        "text": "họ",
        "startMs": 77590,
        "endMs": 77770
      }
    ],
    "highlightKeywords": [
      "đời tư",
      "người em họ"
    ]
  },
  {
    "id": 52,
    "startMs": 77680,
    "endMs": 78370,
    "text": "của chính mình,",
    "tokens": [
      {
        "text": "của",
        "startMs": 77680,
        "endMs": 77860
      },
      {
        "text": "chính",
        "startMs": 77860,
        "endMs": 78090
      },
      {
        "text": "mình",
        "startMs": 78090,
        "endMs": 78370
      }
    ],
    "highlightKeywords": [
      "chính mình"
    ]
  },
  {
    "id": 53,
    "startMs": 78370,
    "endMs": 80560,
    "text": "và ông lo lắng đến mức viết hẳn một danh sách",
    "tokens": [
      {
        "text": "và",
        "startMs": 78370,
        "endMs": 78900
      },
      {
        "text": "ông",
        "startMs": 78900,
        "endMs": 78910
      },
      {
        "text": "lo",
        "startMs": 78910,
        "endMs": 79070
      },
      {
        "text": "lắng",
        "startMs": 79070,
        "endMs": 79130
      },
      {
        "text": "đến",
        "startMs": 79130,
        "endMs": 79350
      },
      {
        "text": "mức",
        "startMs": 79350,
        "endMs": 79580
      },
      {
        "text": "viết",
        "startMs": 79580,
        "endMs": 79760
      },
      {
        "text": "hẳn",
        "startMs": 79760,
        "endMs": 80010
      },
      {
        "text": "một",
        "startMs": 80010,
        "endMs": 80240
      },
      {
        "text": "danh",
        "startMs": 80240,
        "endMs": 80400
      },
      {
        "text": "sách",
        "startMs": 80400,
        "endMs": 80560
      }
    ],
    "highlightKeywords": [
      "lo lắng",
      "danh sách"
    ]
  },
  {
    "id": 54,
    "startMs": 80560,
    "endMs": 82020,
    "text": "'ưu và nhược điểm của việc kết hôn'",
    "tokens": [
      {
        "text": "ưu",
        "startMs": 80560,
        "endMs": 80720
      },
      {
        "text": "và",
        "startMs": 80720,
        "endMs": 80880
      },
      {
        "text": "nhược",
        "startMs": 80880,
        "endMs": 80990
      },
      {
        "text": "điểm",
        "startMs": 80990,
        "endMs": 81210
      },
      {
        "text": "của",
        "startMs": 81210,
        "endMs": 81460
      },
      {
        "text": "việc",
        "startMs": 81460,
        "endMs": 81710
      },
      {
        "text": "kết",
        "startMs": 81710,
        "endMs": 81850
      },
      {
        "text": "hôn",
        "startMs": 81850,
        "endMs": 82020
      }
    ],
    "highlightKeywords": [
      "ưu và nhược điểm",
      "kết hôn"
    ]
  },
  {
    "id": 55,
    "startMs": 82020,
    "endMs": 82760,
    "text": "trước khi cầu hôn —",
    "tokens": [
      {
        "text": "trước",
        "startMs": 82020,
        "endMs": 82160
      },
      {
        "text": "khi",
        "startMs": 82160,
        "endMs": 82450
      },
      {
        "text": "cầu",
        "startMs": 82450,
        "endMs": 82560
      },
      {
        "text": "hôn",
        "startMs": 82560,
        "endMs": 82760
      }
    ],
    "highlightKeywords": [
      "cầu hôn"
    ]
  },
  {
    "id": 56,
    "startMs": 82760,
    "endMs": 84610,
    "text": "như một bản báo cáo khoa học thực thụ,",
    "tokens": [
      {
        "text": "như",
        "startMs": 82760,
        "endMs": 83040
      },
      {
        "text": "một",
        "startMs": 83040,
        "endMs": 83200
      },
      {
        "text": "bản",
        "startMs": 83200,
        "endMs": 83440
      },
      {
        "text": "báo",
        "startMs": 83440,
        "endMs": 83600
      },
      {
        "text": "cáo",
        "startMs": 83600,
        "endMs": 83760
      },
      {
        "text": "khoa",
        "startMs": 83760,
        "endMs": 83920
      },
      {
        "text": "học",
        "startMs": 83920,
        "endMs": 84080
      },
      {
        "text": "thực",
        "startMs": 84080,
        "endMs": 84290
      },
      {
        "text": "thụ",
        "startMs": 84290,
        "endMs": 84610
      }
    ],
    "highlightKeywords": [
      "báo cáo khoa học"
    ]
  },
  {
    "id": 57,
    "startMs": 84610,
    "endMs": 86360,
    "text": "cân đo đong đếm cả chuyện tình cảm.",
    "tokens": [
      {
        "text": "cân",
        "startMs": 84610,
        "endMs": 84880
      },
      {
        "text": "đo",
        "startMs": 84880,
        "endMs": 85060
      },
      {
        "text": "đong",
        "startMs": 85060,
        "endMs": 85200
      },
      {
        "text": "đếm",
        "startMs": 85200,
        "endMs": 85440
      },
      {
        "text": "cả",
        "startMs": 85440,
        "endMs": 85680
      },
      {
        "text": "chuyện",
        "startMs": 85680,
        "endMs": 85840
      },
      {
        "text": "tình",
        "startMs": 85840,
        "endMs": 86160
      },
      {
        "text": "cảm",
        "startMs": 86160,
        "endMs": 86360
      }
    ],
    "highlightKeywords": [
      "cân đo đong đếm",
      "tình cảm"
    ]
  },
  {
    "id": 58,
    "startMs": 86360,
    "endMs": 88510,
    "text": "Người đàn ông ăn rùa Galapagos,",
    "tokens": [
      {
        "text": "Người",
        "startMs": 86360,
        "endMs": 86720
      },
      {
        "text": "đàn",
        "startMs": 86720,
        "endMs": 87200
      },
      {
        "text": "ông",
        "startMs": 87200,
        "endMs": 87460
      },
      {
        "text": "ăn",
        "startMs": 87460,
        "endMs": 87690
      },
      {
        "text": "rùa",
        "startMs": 87690,
        "endMs": 87960
      },
      {
        "text": "Galapagos",
        "startMs": 87960,
        "endMs": 88510
      }
    ],
    "highlightKeywords": [
      "ăn rùa Galapagos"
    ]
  },
  {
    "id": 59,
    "startMs": 88510,
    "endMs": 90240,
    "text": "dành 8 năm nghiên cứu con hà,",
    "tokens": [
      {
        "text": "dành",
        "startMs": 88510,
        "endMs": 88740
      },
      {
        "text": "8",
        "startMs": 88740,
        "endMs": 88910
      },
      {
        "text": "năm",
        "startMs": 88910,
        "endMs": 89140
      },
      {
        "text": "nghiên",
        "startMs": 89140,
        "endMs": 89420
      },
      {
        "text": "cứu",
        "startMs": 89420,
        "endMs": 89760
      },
      {
        "text": "con",
        "startMs": 89760,
        "endMs": 89920
      },
      {
        "text": "hà",
        "startMs": 89920,
        "endMs": 90240
      }
    ],
    "highlightKeywords": [
      "8 năm",
      "con hà"
    ]
  },
  {
    "id": 60,
    "startMs": 90240,
    "endMs": 92580,
    "text": "và trì hoãn công bố phát hiện lớn nhất đời mình",
    "tokens": [
      {
        "text": "và",
        "startMs": 90240,
        "endMs": 90410
      },
      {
        "text": "trì",
        "startMs": 90410,
        "endMs": 90570
      },
      {
        "text": "hoãn",
        "startMs": 90570,
        "endMs": 90820
      },
      {
        "text": "công",
        "startMs": 90820,
        "endMs": 91030
      },
      {
        "text": "bố",
        "startMs": 91030,
        "endMs": 91190
      },
      {
        "text": "phát",
        "startMs": 91190,
        "endMs": 91440
      },
      {
        "text": "hiện",
        "startMs": 91440,
        "endMs": 91690
      },
      {
        "text": "lớn",
        "startMs": 91690,
        "endMs": 91850
      },
      {
        "text": "nhất",
        "startMs": 91850,
        "endMs": 92100
      },
      {
        "text": "đời",
        "startMs": 92100,
        "endMs": 92350
      },
      {
        "text": "mình",
        "startMs": 92350,
        "endMs": 92580
      }
    ],
    "highlightKeywords": [
      "trì hoãn",
      "lớn nhất đời mình"
    ]
  },
  {
    "id": 61,
    "startMs": 92580,
    "endMs": 93560,
    "text": "suốt 2 thập kỷ —",
    "tokens": [
      {
        "text": "suốt",
        "startMs": 92580,
        "endMs": 92810
      },
      {
        "text": "2",
        "startMs": 92810,
        "endMs": 93010
      },
      {
        "text": "thập",
        "startMs": 93010,
        "endMs": 93180
      },
      {
        "text": "kỷ",
        "startMs": 93180,
        "endMs": 93560
      }
    ],
    "highlightKeywords": [
      "2 thập kỷ"
    ]
  },
  {
    "id": 62,
    "startMs": 93560,
    "endMs": 95820,
    "text": "đó chính là Charles Darwin.",
    "tokens": [
      {
        "text": "đó",
        "startMs": 93560,
        "endMs": 93800
      },
      {
        "text": "chính",
        "startMs": 93800,
        "endMs": 94160
      },
      {
        "text": "là",
        "startMs": 94160,
        "endMs": 94360
      },
      {
        "text": "Charles",
        "startMs": 94360,
        "endMs": 94760
      },
      {
        "text": "Darwin",
        "startMs": 94760,
        "endMs": 95320
      }
    ],
    "highlightKeywords": [
      "Charles Darwin"
    ]
  }
];
