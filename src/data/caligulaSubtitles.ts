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

export const caligulaSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "startMs": 50,
    "endMs": 1830,
    "text": "Caligula lên ngôi Hoàng đế La Mã",
    "tokens": [
      {
        "text": "Caligula",
        "startMs": 50,
        "endMs": 420
      },
      {
        "text": "lên",
        "startMs": 420,
        "endMs": 630
      },
      {
        "text": "ngôi",
        "startMs": 630,
        "endMs": 890
      },
      {
        "text": "Hoàng",
        "startMs": 890,
        "endMs": 1200
      },
      {
        "text": "đế",
        "startMs": 1200,
        "endMs": 1470
      },
      {
        "text": "La",
        "startMs": 1470,
        "endMs": 1620
      },
      {
        "text": "Mã",
        "startMs": 1620,
        "endMs": 1830
      }
    ],
    "highlightKeywords": [
      "Caligula",
      "Hoàng đế La Mã"
    ]
  },
  {
    "id": 1,
    "startMs": 1830,
    "endMs": 2870,
    "text": "ở tuổi 24,",
    "tokens": [
      {
        "text": "ở",
        "startMs": 1830,
        "endMs": 1990
      },
      {
        "text": "tuổi",
        "startMs": 1990,
        "endMs": 2300
      },
      {
        "text": "24",
        "startMs": 2300,
        "endMs": 2870
      }
    ],
    "highlightKeywords": [
      "tuổi 24"
    ]
  },
  {
    "id": 2,
    "startMs": 2870,
    "endMs": 3990,
    "text": "và trong vài tháng đầu,",
    "tokens": [
      {
        "text": "và",
        "startMs": 2870,
        "endMs": 2900
      },
      {
        "text": "trong",
        "startMs": 2900,
        "endMs": 3120
      },
      {
        "text": "vài",
        "startMs": 3120,
        "endMs": 3320
      },
      {
        "text": "tháng",
        "startMs": 3320,
        "endMs": 3620
      },
      {
        "text": "đầu",
        "startMs": 3620,
        "endMs": 3990
      }
    ],
    "highlightKeywords": [
      "vài tháng đầu"
    ]
  },
  {
    "id": 3,
    "startMs": 3990,
    "endMs": 5820,
    "text": "dân chúng thực sự yêu quý ông —",
    "tokens": [
      {
        "text": "dân",
        "startMs": 3990,
        "endMs": 4140
      },
      {
        "text": "chúng",
        "startMs": 4140,
        "endMs": 4470
      },
      {
        "text": "thực",
        "startMs": 4470,
        "endMs": 4770
      },
      {
        "text": "sự",
        "startMs": 4770,
        "endMs": 4980
      },
      {
        "text": "yêu",
        "startMs": 4980,
        "endMs": 5130
      },
      {
        "text": "quý",
        "startMs": 5130,
        "endMs": 5600
      },
      {
        "text": "ông",
        "startMs": 5600,
        "endMs": 5820
      }
    ],
    "highlightKeywords": [
      "yêu quý ông"
    ]
  },
  {
    "id": 4,
    "startMs": 5600,
    "endMs": 7060,
    "text": "cho đến khi mọi thứ đi chệch hướng",
    "tokens": [
      {
        "text": "cho",
        "startMs": 5600,
        "endMs": 5710
      },
      {
        "text": "đến",
        "startMs": 5710,
        "endMs": 5930
      },
      {
        "text": "khi",
        "startMs": 5930,
        "endMs": 6040
      },
      {
        "text": "mọi",
        "startMs": 6040,
        "endMs": 6220
      },
      {
        "text": "thứ",
        "startMs": 6220,
        "endMs": 6420
      },
      {
        "text": "đi",
        "startMs": 6420,
        "endMs": 6520
      },
      {
        "text": "chệch",
        "startMs": 6520,
        "endMs": 6770
      },
      {
        "text": "hướng",
        "startMs": 6770,
        "endMs": 7060
      }
    ],
    "highlightKeywords": [
      "đi chệch hướng"
    ]
  },
  {
    "id": 5,
    "startMs": 7060,
    "endMs": 8540,
    "text": "theo cách không ai đoán trước được.",
    "tokens": [
      {
        "text": "theo",
        "startMs": 7060,
        "endMs": 7210
      },
      {
        "text": "cách",
        "startMs": 7210,
        "endMs": 7450
      },
      {
        "text": "không",
        "startMs": 7450,
        "endMs": 7620
      },
      {
        "text": "ai",
        "startMs": 7620,
        "endMs": 7690
      },
      {
        "text": "đoán",
        "startMs": 7690,
        "endMs": 7910
      },
      {
        "text": "trước",
        "startMs": 7910,
        "endMs": 8120
      },
      {
        "text": "được",
        "startMs": 8120,
        "endMs": 8540
      }
    ],
    "highlightKeywords": [
      "không ai đoán trước"
    ]
  },
  {
    "id": 6,
    "startMs": 8540,
    "endMs": 10100,
    "text": "Trước hết, cái tên 'Caligula'",
    "tokens": [
      {
        "text": "Trước",
        "startMs": 8540,
        "endMs": 9260
      },
      {
        "text": "hết",
        "startMs": 9260,
        "endMs": 9380
      },
      {
        "text": "cái",
        "startMs": 9380,
        "endMs": 9540
      },
      {
        "text": "tên",
        "startMs": 9540,
        "endMs": 9730
      },
      {
        "text": "Caligula",
        "startMs": 9730,
        "endMs": 10100
      }
    ],
    "highlightKeywords": [
      "Caligula"
    ]
  },
  {
    "id": 7,
    "startMs": 10100,
    "endMs": 12100,
    "text": "thực ra không phải tên thật của ông.",
    "tokens": [
      {
        "text": "thực",
        "startMs": 10100,
        "endMs": 10390
      },
      {
        "text": "ra",
        "startMs": 10390,
        "endMs": 10530
      },
      {
        "text": "không",
        "startMs": 10530,
        "endMs": 10770
      },
      {
        "text": "phải",
        "startMs": 10770,
        "endMs": 11090
      },
      {
        "text": "tên",
        "startMs": 11090,
        "endMs": 11250
      },
      {
        "text": "thật",
        "startMs": 11250,
        "endMs": 11570
      },
      {
        "text": "của",
        "startMs": 11570,
        "endMs": 11770
      },
      {
        "text": "ông",
        "startMs": 11770,
        "endMs": 12100
      }
    ],
    "highlightKeywords": [
      "không phải tên thật"
    ]
  },
  {
    "id": 8,
    "startMs": 12100,
    "endMs": 13920,
    "text": "Đó là biệt danh nghĩa là 'đôi bốt nhỏ' —",
    "tokens": [
      {
        "text": "Đó",
        "startMs": 12100,
        "endMs": 12260
      },
      {
        "text": "là",
        "startMs": 12260,
        "endMs": 12380
      },
      {
        "text": "biệt",
        "startMs": 12380,
        "endMs": 12660
      },
      {
        "text": "danh",
        "startMs": 12660,
        "endMs": 12820
      },
      {
        "text": "nghĩa",
        "startMs": 12820,
        "endMs": 13060
      },
      {
        "text": "là",
        "startMs": 13060,
        "endMs": 13180
      },
      {
        "text": "đôi",
        "startMs": 13180,
        "endMs": 13450
      },
      {
        "text": "bốt",
        "startMs": 13450,
        "endMs": 13610
      },
      {
        "text": "nhỏ",
        "startMs": 13610,
        "endMs": 13920
      }
    ],
    "highlightKeywords": [
      "đôi bốt nhỏ"
    ]
  },
  {
    "id": 9,
    "startMs": 13920,
    "endMs": 16180,
    "text": "do binh lính đặt cho ông từ khi còn bé,",
    "tokens": [
      {
        "text": "do",
        "startMs": 13920,
        "endMs": 14020
      },
      {
        "text": "binh",
        "startMs": 14020,
        "endMs": 14280
      },
      {
        "text": "lính",
        "startMs": 14280,
        "endMs": 14540
      },
      {
        "text": "đặt",
        "startMs": 14540,
        "endMs": 14860
      },
      {
        "text": "cho",
        "startMs": 14860,
        "endMs": 15010
      },
      {
        "text": "ông",
        "startMs": 15010,
        "endMs": 15220
      },
      {
        "text": "từ",
        "startMs": 15220,
        "endMs": 15430
      },
      {
        "text": "khi",
        "startMs": 15430,
        "endMs": 15590
      },
      {
        "text": "còn",
        "startMs": 15590,
        "endMs": 16000
      },
      {
        "text": "bé",
        "startMs": 16000,
        "endMs": 16180
      }
    ],
    "highlightKeywords": [
      "binh lính đặt"
    ]
  },
  {
    "id": 10,
    "startMs": 16040,
    "endMs": 18260,
    "text": "vì ông hay mặc một bộ đồng phục lính thu nhỏ,",
    "tokens": [
      {
        "text": "vì",
        "startMs": 16040,
        "endMs": 16160
      },
      {
        "text": "ông",
        "startMs": 16160,
        "endMs": 16330
      },
      {
        "text": "hay",
        "startMs": 16330,
        "endMs": 16460
      },
      {
        "text": "mặc",
        "startMs": 16460,
        "endMs": 16670
      },
      {
        "text": "một",
        "startMs": 16670,
        "endMs": 16880
      },
      {
        "text": "bộ",
        "startMs": 16880,
        "endMs": 17060
      },
      {
        "text": "đồng",
        "startMs": 17060,
        "endMs": 17390
      },
      {
        "text": "phục",
        "startMs": 17390,
        "endMs": 17590
      },
      {
        "text": "lính",
        "startMs": 17590,
        "endMs": 17800
      },
      {
        "text": "thu",
        "startMs": 17800,
        "endMs": 18010
      },
      {
        "text": "nhỏ",
        "startMs": 18010,
        "endMs": 18260
      }
    ],
    "highlightKeywords": [
      "đồng phục lính thu nhỏ"
    ]
  },
  {
    "id": 11,
    "startMs": 18260,
    "endMs": 19620,
    "text": "kèm đôi bốt tí hon,",
    "tokens": [
      {
        "text": "kèm",
        "startMs": 18260,
        "endMs": 18470
      },
      {
        "text": "đôi",
        "startMs": 18470,
        "endMs": 18840
      },
      {
        "text": "bốt",
        "startMs": 18840,
        "endMs": 19070
      },
      {
        "text": "tí",
        "startMs": 19070,
        "endMs": 19440
      },
      {
        "text": "hon",
        "startMs": 19440,
        "endMs": 19620
      }
    ],
    "highlightKeywords": [
      "đôi bốt tí hon"
    ]
  },
  {
    "id": 12,
    "startMs": 19520,
    "endMs": 21160,
    "text": "đi loanh quanh doanh trại của cha mình.",
    "tokens": [
      {
        "text": "đi",
        "startMs": 19520,
        "endMs": 19650
      },
      {
        "text": "loanh",
        "startMs": 19650,
        "endMs": 19910
      },
      {
        "text": "quanh",
        "startMs": 19910,
        "endMs": 20070
      },
      {
        "text": "doanh",
        "startMs": 20070,
        "endMs": 20280
      },
      {
        "text": "trại",
        "startMs": 20280,
        "endMs": 20530
      },
      {
        "text": "của",
        "startMs": 20530,
        "endMs": 20750
      },
      {
        "text": "cha",
        "startMs": 20750,
        "endMs": 20880
      },
      {
        "text": "mình",
        "startMs": 20880,
        "endMs": 21160
      }
    ],
    "highlightKeywords": [
      "doanh trại"
    ]
  },
  {
    "id": 13,
    "startMs": 21160,
    "endMs": 23560,
    "text": "Vị hoàng đế khét tiếng tàn bạo bậc nhất lịch sử,",
    "tokens": [
      {
        "text": "Vị",
        "startMs": 21160,
        "endMs": 21290
      },
      {
        "text": "hoàng",
        "startMs": 21290,
        "endMs": 21540
      },
      {
        "text": "đế",
        "startMs": 21540,
        "endMs": 21750
      },
      {
        "text": "khét",
        "startMs": 21750,
        "endMs": 22000
      },
      {
        "text": "tiếng",
        "startMs": 22000,
        "endMs": 22170
      },
      {
        "text": "tàn",
        "startMs": 22170,
        "endMs": 22340
      },
      {
        "text": "bạo",
        "startMs": 22340,
        "endMs": 22550
      },
      {
        "text": "bậc",
        "startMs": 22550,
        "endMs": 22810
      },
      {
        "text": "nhất",
        "startMs": 22810,
        "endMs": 23020
      },
      {
        "text": "lịch",
        "startMs": 23020,
        "endMs": 23320
      },
      {
        "text": "sử",
        "startMs": 23320,
        "endMs": 23560
      }
    ],
    "highlightKeywords": [
      "tàn bạo bậc nhất"
    ]
  },
  {
    "id": 14,
    "startMs": 23560,
    "endMs": 26140,
    "text": "hóa ra lại có biệt danh đáng yêu như một đứa trẻ.",
    "tokens": [
      {
        "text": "hóa",
        "startMs": 23560,
        "endMs": 23690
      },
      {
        "text": "ra",
        "startMs": 23690,
        "endMs": 23780
      },
      {
        "text": "lại",
        "startMs": 23780,
        "endMs": 24010
      },
      {
        "text": "có",
        "startMs": 24010,
        "endMs": 24150
      },
      {
        "text": "biệt",
        "startMs": 24150,
        "endMs": 24460
      },
      {
        "text": "danh",
        "startMs": 24460,
        "endMs": 24640
      },
      {
        "text": "đáng",
        "startMs": 24640,
        "endMs": 24910
      },
      {
        "text": "yêu",
        "startMs": 24910,
        "endMs": 25090
      },
      {
        "text": "như",
        "startMs": 25090,
        "endMs": 25270
      },
      {
        "text": "một",
        "startMs": 25270,
        "endMs": 25500
      },
      {
        "text": "đứa",
        "startMs": 25500,
        "endMs": 25850
      },
      {
        "text": "trẻ",
        "startMs": 25850,
        "endMs": 26080
      }
    ],
    "highlightKeywords": [
      "đáng yêu",
      "đứa trẻ"
    ]
  },
  {
    "id": 15,
    "startMs": 26170,
    "endMs": 28000,
    "text": "Chuyện nổi tiếng nhất về Caligula",
    "tokens": [
      {
        "text": "Chuyện",
        "startMs": 26170,
        "endMs": 26450
      },
      {
        "text": "nổi",
        "startMs": 26450,
        "endMs": 26680
      },
      {
        "text": "tiếng",
        "startMs": 26680,
        "endMs": 27010
      },
      {
        "text": "nhất",
        "startMs": 27010,
        "endMs": 27300
      },
      {
        "text": "về",
        "startMs": 27300,
        "endMs": 27490
      },
      {
        "text": "Caligula",
        "startMs": 27490,
        "endMs": 28000
      }
    ],
    "highlightKeywords": [
      "nổi tiếng nhất"
    ]
  },
  {
    "id": 16,
    "startMs": 28000,
    "endMs": 30020,
    "text": "là ông định phong con ngựa cưng của mình,",
    "tokens": [
      {
        "text": "là",
        "startMs": 28000,
        "endMs": 28140
      },
      {
        "text": "ông",
        "startMs": 28140,
        "endMs": 28190
      },
      {
        "text": "định",
        "startMs": 28190,
        "endMs": 28520
      },
      {
        "text": "phong",
        "startMs": 28520,
        "endMs": 28750
      },
      {
        "text": "con",
        "startMs": 28750,
        "endMs": 28890
      },
      {
        "text": "ngựa",
        "startMs": 28890,
        "endMs": 29190
      },
      {
        "text": "cưng",
        "startMs": 29190,
        "endMs": 29390
      },
      {
        "text": "của",
        "startMs": 29390,
        "endMs": 29630
      },
      {
        "text": "mình",
        "startMs": 29630,
        "endMs": 30020
      }
    ],
    "highlightKeywords": [
      "con ngựa cưng"
    ]
  },
  {
    "id": 17,
    "startMs": 30020,
    "endMs": 32620,
    "text": "tên là Incitatus, làm quan chấp chính —",
    "tokens": [
      {
        "text": "tên",
        "startMs": 30020,
        "endMs": 30260
      },
      {
        "text": "là",
        "startMs": 30260,
        "endMs": 30470
      },
      {
        "text": "Incitatus",
        "startMs": 30470,
        "endMs": 31080
      },
      {
        "text": "làm",
        "startMs": 31080,
        "endMs": 31580
      },
      {
        "text": "quan",
        "startMs": 31580,
        "endMs": 31630
      },
      {
        "text": "chấp",
        "startMs": 31630,
        "endMs": 32000
      },
      {
        "text": "chính",
        "startMs": 32000,
        "endMs": 32620
      }
    ],
    "highlightKeywords": [
      "Incitatus",
      "quan chấp chính"
    ]
  },
  {
    "id": 18,
    "startMs": 32620,
    "endMs": 34740,
    "text": "chức vụ chính trị cao cấp bậc nhất La Mã.",
    "tokens": [
      {
        "text": "chức",
        "startMs": 32620,
        "endMs": 32870
      },
      {
        "text": "vụ",
        "startMs": 32870,
        "endMs": 33030
      },
      {
        "text": "chính",
        "startMs": 33030,
        "endMs": 33280
      },
      {
        "text": "trị",
        "startMs": 33280,
        "endMs": 33500
      },
      {
        "text": "cao",
        "startMs": 33500,
        "endMs": 33600
      },
      {
        "text": "cấp",
        "startMs": 33600,
        "endMs": 33810
      },
      {
        "text": "bậc",
        "startMs": 33810,
        "endMs": 34020
      },
      {
        "text": "nhất",
        "startMs": 34020,
        "endMs": 34270
      },
      {
        "text": "La",
        "startMs": 34270,
        "endMs": 34390
      },
      {
        "text": "Mã",
        "startMs": 34390,
        "endMs": 34740
      }
    ],
    "highlightKeywords": [
      "cao cấp bậc nhất"
    ]
  },
  {
    "id": 19,
    "startMs": 34740,
    "endMs": 35700,
    "text": "Con ngựa này được cho ở",
    "tokens": [
      {
        "text": "Con",
        "startMs": 34740,
        "endMs": 34890
      },
      {
        "text": "ngựa",
        "startMs": 34890,
        "endMs": 35040
      },
      {
        "text": "này",
        "startMs": 35040,
        "endMs": 35180
      },
      {
        "text": "được",
        "startMs": 35180,
        "endMs": 35460
      },
      {
        "text": "cho",
        "startMs": 35460,
        "endMs": 35560
      },
      {
        "text": "ở",
        "startMs": 35560,
        "endMs": 35700
      }
    ],
    "highlightKeywords": [
      "con ngựa"
    ]
  },
  {
    "id": 20,
    "startMs": 35700,
    "endMs": 37340,
    "text": "trong một chuồng ngựa bằng đá cẩm thạch,",
    "tokens": [
      {
        "text": "trong",
        "startMs": 35700,
        "endMs": 35830
      },
      {
        "text": "một",
        "startMs": 35830,
        "endMs": 36000
      },
      {
        "text": "chuồng",
        "startMs": 36000,
        "endMs": 36310
      },
      {
        "text": "ngựa",
        "startMs": 36310,
        "endMs": 36510
      },
      {
        "text": "bằng",
        "startMs": 36510,
        "endMs": 36710
      },
      {
        "text": "đá",
        "startMs": 36710,
        "endMs": 36860
      },
      {
        "text": "cẩm",
        "startMs": 36860,
        "endMs": 37020
      },
      {
        "text": "thạch",
        "startMs": 37020,
        "endMs": 37340
      }
    ],
    "highlightKeywords": [
      "đá cẩm thạch"
    ]
  },
  {
    "id": 21,
    "startMs": 37340,
    "endMs": 38930,
    "text": "có máng ăn bằng ngà voi,",
    "tokens": [
      {
        "text": "có",
        "startMs": 37340,
        "endMs": 37520
      },
      {
        "text": "máng",
        "startMs": 37520,
        "endMs": 37800
      },
      {
        "text": "ăn",
        "startMs": 37800,
        "endMs": 37950
      },
      {
        "text": "bằng",
        "startMs": 37950,
        "endMs": 38320
      },
      {
        "text": "ngà",
        "startMs": 38320,
        "endMs": 38620
      },
      {
        "text": "voi",
        "startMs": 38620,
        "endMs": 38930
      }
    ],
    "highlightKeywords": [
      "ngà voi"
    ]
  },
  {
    "id": 22,
    "startMs": 38930,
    "endMs": 41500,
    "text": "và thậm chí có cả... người hầu riêng.",
    "tokens": [
      {
        "text": "và",
        "startMs": 38930,
        "endMs": 39050
      },
      {
        "text": "thậm",
        "startMs": 39050,
        "endMs": 39470
      },
      {
        "text": "chí",
        "startMs": 39470,
        "endMs": 39750
      },
      {
        "text": "có",
        "startMs": 39750,
        "endMs": 40240
      },
      {
        "text": "cả",
        "startMs": 40240,
        "endMs": 40460
      },
      {
        "text": "người",
        "startMs": 40460,
        "endMs": 40830
      },
      {
        "text": "hầu",
        "startMs": 40830,
        "endMs": 41060
      },
      {
        "text": "riêng",
        "startMs": 41060,
        "endMs": 41500
      }
    ],
    "highlightKeywords": [
      "người hầu riêng"
    ]
  },
  {
    "id": 23,
    "startMs": 41500,
    "endMs": 43500,
    "text": "Sử gia vẫn tranh cãi liệu đây là sự thật",
    "tokens": [
      {
        "text": "Sử",
        "startMs": 41500,
        "endMs": 41630
      },
      {
        "text": "gia",
        "startMs": 41630,
        "endMs": 41750
      },
      {
        "text": "vẫn",
        "startMs": 41750,
        "endMs": 41940
      },
      {
        "text": "tranh",
        "startMs": 41940,
        "endMs": 42160
      },
      {
        "text": "cãi",
        "startMs": 42160,
        "endMs": 42330
      },
      {
        "text": "liệu",
        "startMs": 42330,
        "endMs": 42680
      },
      {
        "text": "đây",
        "startMs": 42680,
        "endMs": 42820
      },
      {
        "text": "là",
        "startMs": 42820,
        "endMs": 42950
      },
      {
        "text": "sự",
        "startMs": 42950,
        "endMs": 43130
      },
      {
        "text": "thật",
        "startMs": 43130,
        "endMs": 43500
      }
    ],
    "highlightKeywords": [
      "tranh cãi"
    ]
  },
  {
    "id": 24,
    "startMs": 43500,
    "endMs": 46420,
    "text": "hay chỉ là cách Caligula châm biếm chính giới quý tộc La Mã,",
    "tokens": [
      {
        "text": "hay",
        "startMs": 43500,
        "endMs": 43650
      },
      {
        "text": "chỉ",
        "startMs": 43650,
        "endMs": 43850
      },
      {
        "text": "là",
        "startMs": 43850,
        "endMs": 43980
      },
      {
        "text": "cách",
        "startMs": 43980,
        "endMs": 44210
      },
      {
        "text": "Caligula",
        "startMs": 44210,
        "endMs": 44550
      },
      {
        "text": "châm",
        "startMs": 44550,
        "endMs": 44790
      },
      {
        "text": "biếm",
        "startMs": 44790,
        "endMs": 45030
      },
      {
        "text": "chính",
        "startMs": 45030,
        "endMs": 45300
      },
      {
        "text": "giới",
        "startMs": 45300,
        "endMs": 45620
      },
      {
        "text": "quý",
        "startMs": 45620,
        "endMs": 45790
      },
      {
        "text": "tộc",
        "startMs": 45790,
        "endMs": 46000
      },
      {
        "text": "La",
        "startMs": 46000,
        "endMs": 46180
      },
      {
        "text": "Mã",
        "startMs": 46180,
        "endMs": 46420
      }
    ],
    "highlightKeywords": [
      "châm biếm",
      "quý tộc La Mã"
    ]
  },
  {
    "id": 25,
    "startMs": 46420,
    "endMs": 47580,
    "text": "nhưng dù thế nào,",
    "tokens": [
      {
        "text": "nhưng",
        "startMs": 46420,
        "endMs": 46720
      },
      {
        "text": "dù",
        "startMs": 46720,
        "endMs": 46910
      },
      {
        "text": "thế",
        "startMs": 46910,
        "endMs": 47130
      },
      {
        "text": "nào",
        "startMs": 47130,
        "endMs": 47580
      }
    ],
    "highlightKeywords": [
      "dù thế nào"
    ]
  },
  {
    "id": 26,
    "startMs": 47580,
    "endMs": 49950,
    "text": "câu chuyện cũng đủ hoang đường để đi vào lịch sử.",
    "tokens": [
      {
        "text": "câu",
        "startMs": 47580,
        "endMs": 47650
      },
      {
        "text": "chuyện",
        "startMs": 47650,
        "endMs": 47960
      },
      {
        "text": "cũng",
        "startMs": 47960,
        "endMs": 48120
      },
      {
        "text": "đủ",
        "startMs": 48120,
        "endMs": 48310
      },
      {
        "text": "hoang",
        "startMs": 48310,
        "endMs": 48500
      },
      {
        "text": "đường",
        "startMs": 48500,
        "endMs": 48850
      },
      {
        "text": "để",
        "startMs": 48850,
        "endMs": 49050
      },
      {
        "text": "đi",
        "startMs": 49050,
        "endMs": 49160
      },
      {
        "text": "vào",
        "startMs": 49160,
        "endMs": 49330
      },
      {
        "text": "lịch",
        "startMs": 49330,
        "endMs": 49600
      },
      {
        "text": "sử",
        "startMs": 49600,
        "endMs": 49860
      }
    ],
    "highlightKeywords": [
      "hoang đường",
      "lịch sử"
    ]
  },
  {
    "id": 27,
    "startMs": 49980,
    "endMs": 51580,
    "text": "Caligula còn tự xưng mình là thần sống,",
    "tokens": [
      {
        "text": "Caligula",
        "startMs": 49980,
        "endMs": 50200
      },
      {
        "text": "còn",
        "startMs": 50200,
        "endMs": 50370
      },
      {
        "text": "tự",
        "startMs": 50370,
        "endMs": 50560
      },
      {
        "text": "xưng",
        "startMs": 50560,
        "endMs": 50770
      },
      {
        "text": "mình",
        "startMs": 50770,
        "endMs": 50970
      },
      {
        "text": "là",
        "startMs": 50970,
        "endMs": 51100
      },
      {
        "text": "thần",
        "startMs": 51100,
        "endMs": 51320
      },
      {
        "text": "sống",
        "startMs": 51320,
        "endMs": 51580
      }
    ],
    "highlightKeywords": [
      "thần sống"
    ]
  },
  {
    "id": 28,
    "startMs": 51580,
    "endMs": 53500,
    "text": "và ra lệnh xây tượng của chính mình",
    "tokens": [
      {
        "text": "và",
        "startMs": 51580,
        "endMs": 51800
      },
      {
        "text": "ra",
        "startMs": 51800,
        "endMs": 51920
      },
      {
        "text": "lệnh",
        "startMs": 51920,
        "endMs": 52130
      },
      {
        "text": "xây",
        "startMs": 52130,
        "endMs": 52330
      },
      {
        "text": "tượng",
        "startMs": 52330,
        "endMs": 52650
      },
      {
        "text": "của",
        "startMs": 52650,
        "endMs": 52900
      },
      {
        "text": "chính",
        "startMs": 52900,
        "endMs": 53130
      },
      {
        "text": "mình",
        "startMs": 53130,
        "endMs": 53500
      }
    ],
    "highlightKeywords": [
      "xây tượng"
    ]
  },
  {
    "id": 29,
    "startMs": 53500,
    "endMs": 54940,
    "text": "đặt cạnh tượng các vị thần La Mã",
    "tokens": [
      {
        "text": "đặt",
        "startMs": 53500,
        "endMs": 53700
      },
      {
        "text": "cạnh",
        "startMs": 53700,
        "endMs": 53910
      },
      {
        "text": "tượng",
        "startMs": 53910,
        "endMs": 54180
      },
      {
        "text": "các",
        "startMs": 54180,
        "endMs": 54320
      },
      {
        "text": "vị",
        "startMs": 54320,
        "endMs": 54460
      },
      {
        "text": "thần",
        "startMs": 54460,
        "endMs": 54630
      },
      {
        "text": "La",
        "startMs": 54630,
        "endMs": 54730
      },
      {
        "text": "Mã",
        "startMs": 54730,
        "endMs": 54940
      }
    ],
    "highlightKeywords": [
      "vị thần La Mã"
    ]
  },
  {
    "id": 30,
    "startMs": 54940,
    "endMs": 55920,
    "text": "để dân chúng thờ cúng.",
    "tokens": [
      {
        "text": "để",
        "startMs": 54940,
        "endMs": 55030
      },
      {
        "text": "dân",
        "startMs": 55030,
        "endMs": 55160
      },
      {
        "text": "chúng",
        "startMs": 55160,
        "endMs": 55390
      },
      {
        "text": "thờ",
        "startMs": 55390,
        "endMs": 55580
      },
      {
        "text": "cúng",
        "startMs": 55580,
        "endMs": 55920
      }
    ],
    "highlightKeywords": [
      "thờ cúng"
    ]
  },
  {
    "id": 31,
    "startMs": 55920,
    "endMs": 57120,
    "text": "Ông thậm chí từng ra lệnh",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 55920,
        "endMs": 56080
      },
      {
        "text": "thậm",
        "startMs": 56080,
        "endMs": 56320
      },
      {
        "text": "chí",
        "startMs": 56320,
        "endMs": 56480
      },
      {
        "text": "từng",
        "startMs": 56480,
        "endMs": 56720
      },
      {
        "text": "ra",
        "startMs": 56720,
        "endMs": 56880
      },
      {
        "text": "lệnh",
        "startMs": 56880,
        "endMs": 57120
      }
    ],
    "highlightKeywords": [
      "ra lệnh"
    ]
  },
  {
    "id": 32,
    "startMs": 57120,
    "endMs": 58800,
    "text": "chặt đầu tượng thần Zeus tại Hy Lạp",
    "tokens": [
      {
        "text": "chặt",
        "startMs": 57120,
        "endMs": 57360
      },
      {
        "text": "đầu",
        "startMs": 57360,
        "endMs": 57610
      },
      {
        "text": "tượng",
        "startMs": 57610,
        "endMs": 57920
      },
      {
        "text": "thần",
        "startMs": 57920,
        "endMs": 58240
      },
      {
        "text": "Zeus",
        "startMs": 58240,
        "endMs": 58280
      },
      {
        "text": "tại",
        "startMs": 58280,
        "endMs": 58480
      },
      {
        "text": "Hy",
        "startMs": 58480,
        "endMs": 58640
      },
      {
        "text": "Lạp",
        "startMs": 58640,
        "endMs": 58800
      }
    ],
    "highlightKeywords": [
      "chặt đầu tượng",
      "thần Zeus",
      "Hy Lạp"
    ]
  },
  {
    "id": 33,
    "startMs": 58800,
    "endMs": 60260,
    "text": "và thay bằng đầu của chính mình —",
    "tokens": [
      {
        "text": "và",
        "startMs": 58800,
        "endMs": 58880
      },
      {
        "text": "thay",
        "startMs": 58880,
        "endMs": 58960
      },
      {
        "text": "bằng",
        "startMs": 58960,
        "endMs": 59200
      },
      {
        "text": "đầu",
        "startMs": 59200,
        "endMs": 59490
      },
      {
        "text": "của",
        "startMs": 59490,
        "endMs": 59640
      },
      {
        "text": "chính",
        "startMs": 59640,
        "endMs": 59880
      },
      {
        "text": "mình",
        "startMs": 59880,
        "endMs": 60260
      }
    ],
    "highlightKeywords": [
      "đầu của chính mình"
    ]
  },
  {
    "id": 34,
    "startMs": 60260,
    "endMs": 61810,
    "text": "một hành động khiến cả giới tư tế",
    "tokens": [
      {
        "text": "một",
        "startMs": 60260,
        "endMs": 60440
      },
      {
        "text": "hành",
        "startMs": 60440,
        "endMs": 60620
      },
      {
        "text": "động",
        "startMs": 60620,
        "endMs": 60950
      },
      {
        "text": "khiến",
        "startMs": 60950,
        "endMs": 61150
      },
      {
        "text": "cả",
        "startMs": 61150,
        "endMs": 61300
      },
      {
        "text": "giới",
        "startMs": 61300,
        "endMs": 61550
      },
      {
        "text": "tư",
        "startMs": 61550,
        "endMs": 61650
      },
      {
        "text": "tế",
        "startMs": 61650,
        "endMs": 61810
      }
    ],
    "highlightKeywords": [
      "giới tư tế"
    ]
  },
  {
    "id": 35,
    "startMs": 61810,
    "endMs": 63260,
    "text": "lẫn dân chúng đều choáng váng.",
    "tokens": [
      {
        "text": "lẫn",
        "startMs": 61810,
        "endMs": 61970
      },
      {
        "text": "dân",
        "startMs": 61970,
        "endMs": 62110
      },
      {
        "text": "chúng",
        "startMs": 62110,
        "endMs": 62340
      },
      {
        "text": "đều",
        "startMs": 62340,
        "endMs": 62560
      },
      {
        "text": "choáng",
        "startMs": 62560,
        "endMs": 62770
      },
      {
        "text": "váng",
        "startMs": 62770,
        "endMs": 63260
      }
    ],
    "highlightKeywords": [
      "choáng váng"
    ]
  },
  {
    "id": 36,
    "startMs": 63260,
    "endMs": 64630,
    "text": "Một câu chuyện khác kể rằng",
    "tokens": [
      {
        "text": "Một",
        "startMs": 63260,
        "endMs": 63480
      },
      {
        "text": "câu",
        "startMs": 63480,
        "endMs": 63680
      },
      {
        "text": "chuyện",
        "startMs": 63680,
        "endMs": 64110
      },
      {
        "text": "khác",
        "startMs": 64110,
        "endMs": 64260
      },
      {
        "text": "kể",
        "startMs": 64260,
        "endMs": 64410
      },
      {
        "text": "rằng",
        "startMs": 64410,
        "endMs": 64630
      }
    ],
    "highlightKeywords": [
      "câu chuyện khác"
    ]
  },
  {
    "id": 37,
    "startMs": 64630,
    "endMs": 67100,
    "text": "Caligula từng tuyên chiến với... biển cả.",
    "tokens": [
      {
        "text": "Caligula",
        "startMs": 64630,
        "endMs": 64980
      },
      {
        "text": "từng",
        "startMs": 64980,
        "endMs": 65250
      },
      {
        "text": "tuyên",
        "startMs": 65250,
        "endMs": 65510
      },
      {
        "text": "chiến",
        "startMs": 65510,
        "endMs": 65820
      },
      {
        "text": "với",
        "startMs": 65820,
        "endMs": 66300
      },
      {
        "text": "biển",
        "startMs": 66300,
        "endMs": 66650
      },
      {
        "text": "cả",
        "startMs": 66650,
        "endMs": 67100
      }
    ],
    "highlightKeywords": [
      "tuyên chiến",
      "biển cả"
    ]
  },
  {
    "id": 38,
    "startMs": 67100,
    "endMs": 69140,
    "text": "Ông dẫn quân đến bờ biển Eo biển Manche,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 67100,
        "endMs": 67140
      },
      {
        "text": "dẫn",
        "startMs": 67140,
        "endMs": 67370
      },
      {
        "text": "quân",
        "startMs": 67370,
        "endMs": 67600
      },
      {
        "text": "đến",
        "startMs": 67600,
        "endMs": 67900
      },
      {
        "text": "bờ",
        "startMs": 67900,
        "endMs": 68100
      },
      {
        "text": "biển",
        "startMs": 68100,
        "endMs": 68400
      },
      {
        "text": "Eo",
        "startMs": 68400,
        "endMs": 68500
      },
      {
        "text": "biển",
        "startMs": 68500,
        "endMs": 68800
      },
      {
        "text": "Manche",
        "startMs": 68800,
        "endMs": 69140
      }
    ],
    "highlightKeywords": [
      "Eo biển Manche"
    ]
  },
  {
    "id": 39,
    "startMs": 69140,
    "endMs": 71460,
    "text": "ra lệnh binh lính giơ giáo tấn công những con sóng,",
    "tokens": [
      {
        "text": "ra",
        "startMs": 69140,
        "endMs": 69300
      },
      {
        "text": "lệnh",
        "startMs": 69300,
        "endMs": 69550
      },
      {
        "text": "binh",
        "startMs": 69550,
        "endMs": 69760
      },
      {
        "text": "lính",
        "startMs": 69760,
        "endMs": 69930
      },
      {
        "text": "giơ",
        "startMs": 69930,
        "endMs": 70050
      },
      {
        "text": "giáo",
        "startMs": 70050,
        "endMs": 70260
      },
      {
        "text": "tấn",
        "startMs": 70260,
        "endMs": 70510
      },
      {
        "text": "công",
        "startMs": 70510,
        "endMs": 70680
      },
      {
        "text": "những",
        "startMs": 70680,
        "endMs": 70980
      },
      {
        "text": "con",
        "startMs": 70980,
        "endMs": 71110
      },
      {
        "text": "sóng",
        "startMs": 71110,
        "endMs": 71460
      }
    ],
    "highlightKeywords": [
      "tấn công những con sóng"
    ]
  },
  {
    "id": 40,
    "startMs": 71460,
    "endMs": 74150,
    "text": "rồi bắt họ nhặt vỏ sò mang về như chiến lợi phẩm —",
    "tokens": [
      {
        "text": "rồi",
        "startMs": 71460,
        "endMs": 71680
      },
      {
        "text": "bắt",
        "startMs": 71680,
        "endMs": 71890
      },
      {
        "text": "họ",
        "startMs": 71890,
        "endMs": 72100
      },
      {
        "text": "nhặt",
        "startMs": 72100,
        "endMs": 72330
      },
      {
        "text": "vỏ",
        "startMs": 72330,
        "endMs": 72520
      },
      {
        "text": "sò",
        "startMs": 72520,
        "endMs": 72600
      },
      {
        "text": "mang",
        "startMs": 72600,
        "endMs": 72770
      },
      {
        "text": "về",
        "startMs": 72770,
        "endMs": 72940
      },
      {
        "text": "như",
        "startMs": 72940,
        "endMs": 73110
      },
      {
        "text": "chiến",
        "startMs": 73110,
        "endMs": 73410
      },
      {
        "text": "lợi",
        "startMs": 73410,
        "endMs": 73670
      },
      {
        "text": "phẩm",
        "startMs": 73670,
        "endMs": 74140
      }
    ],
    "highlightKeywords": [
      "nhặt vỏ sò",
      "chiến lợi phẩm"
    ]
  },
  {
    "id": 41,
    "startMs": 74180,
    "endMs": 75680,
    "text": "coi đó là chiến thắng vẻ vang",
    "tokens": [
      {
        "text": "coi",
        "startMs": 74180,
        "endMs": 74310
      },
      {
        "text": "đó",
        "startMs": 74310,
        "endMs": 74490
      },
      {
        "text": "là",
        "startMs": 74490,
        "endMs": 74630
      },
      {
        "text": "chiến",
        "startMs": 74630,
        "endMs": 74950
      },
      {
        "text": "thắng",
        "startMs": 74950,
        "endMs": 75270
      },
      {
        "text": "vẻ",
        "startMs": 75270,
        "endMs": 75450
      },
      {
        "text": "vang",
        "startMs": 75450,
        "endMs": 75680
      }
    ],
    "highlightKeywords": [
      "chiến thắng vẻ vang"
    ]
  },
  {
    "id": 42,
    "startMs": 75680,
    "endMs": 76990,
    "text": "trước thần biển Neptune.",
    "tokens": [
      {
        "text": "trước",
        "startMs": 75680,
        "endMs": 76050
      },
      {
        "text": "thần",
        "startMs": 76050,
        "endMs": 76290
      },
      {
        "text": "biển",
        "startMs": 76290,
        "endMs": 76870
      },
      {
        "text": "Neptune",
        "startMs": 76870,
        "endMs": 76990
      }
    ],
    "highlightKeywords": [
      "thần biển Neptune"
    ]
  },
  {
    "id": 43,
    "startMs": 76990,
    "endMs": 79010,
    "text": "Cuối cùng, sau chưa đầy 4 năm trị vì",
    "tokens": [
      {
        "text": "Cuối",
        "startMs": 76990,
        "endMs": 77230
      },
      {
        "text": "cùng",
        "startMs": 77230,
        "endMs": 77600
      },
      {
        "text": "sau",
        "startMs": 77600,
        "endMs": 77680
      },
      {
        "text": "chưa",
        "startMs": 77680,
        "endMs": 77850
      },
      {
        "text": "đầy",
        "startMs": 77850,
        "endMs": 78100
      },
      {
        "text": "4",
        "startMs": 78100,
        "endMs": 78240
      },
      {
        "text": "năm",
        "startMs": 78240,
        "endMs": 78420
      },
      {
        "text": "trị",
        "startMs": 78420,
        "endMs": 78830
      },
      {
        "text": "vì",
        "startMs": 78830,
        "endMs": 79010
      }
    ],
    "highlightKeywords": [
      "chưa đầy 4 năm"
    ]
  },
  {
    "id": 44,
    "startMs": 78890,
    "endMs": 80560,
    "text": "đầy rẫy những quyết định kỳ lạ,",
    "tokens": [
      {
        "text": "đầy",
        "startMs": 78890,
        "endMs": 79100
      },
      {
        "text": "rẫy",
        "startMs": 79100,
        "endMs": 79310
      },
      {
        "text": "những",
        "startMs": 79310,
        "endMs": 79570
      },
      {
        "text": "quyết",
        "startMs": 79570,
        "endMs": 79820
      },
      {
        "text": "định",
        "startMs": 79820,
        "endMs": 80060
      },
      {
        "text": "kỳ",
        "startMs": 80060,
        "endMs": 80380
      },
      {
        "text": "lạ",
        "startMs": 80380,
        "endMs": 80560
      }
    ],
    "highlightKeywords": [
      "quyết định kỳ lạ"
    ]
  },
  {
    "id": 45,
    "startMs": 80420,
    "endMs": 82420,
    "text": "Caligula bị chính đội cận vệ của mình",
    "tokens": [
      {
        "text": "Caligula",
        "startMs": 80420,
        "endMs": 80790
      },
      {
        "text": "bị",
        "startMs": 80790,
        "endMs": 80950
      },
      {
        "text": "chính",
        "startMs": 80950,
        "endMs": 81280
      },
      {
        "text": "đội",
        "startMs": 81280,
        "endMs": 81480
      },
      {
        "text": "cận",
        "startMs": 81480,
        "endMs": 81740
      },
      {
        "text": "vệ",
        "startMs": 81740,
        "endMs": 82020
      },
      {
        "text": "của",
        "startMs": 82020,
        "endMs": 82130
      },
      {
        "text": "mình",
        "startMs": 82130,
        "endMs": 82420
      }
    ],
    "highlightKeywords": [
      "đội cận vệ"
    ]
  },
  {
    "id": 46,
    "startMs": 82420,
    "endMs": 83840,
    "text": "ám sát ngay trong cung điện —",
    "tokens": [
      {
        "text": "ám",
        "startMs": 82420,
        "endMs": 82480
      },
      {
        "text": "sát",
        "startMs": 82480,
        "endMs": 82650
      },
      {
        "text": "ngay",
        "startMs": 82650,
        "endMs": 82830
      },
      {
        "text": "trong",
        "startMs": 82830,
        "endMs": 83050
      },
      {
        "text": "cung",
        "startMs": 83050,
        "endMs": 83220
      },
      {
        "text": "điện",
        "startMs": 83220,
        "endMs": 83840
      }
    ],
    "highlightKeywords": [
      "ám sát",
      "cung điện"
    ]
  },
  {
    "id": 47,
    "startMs": 83840,
    "endMs": 86200,
    "text": "khép lại triều đại của một trong những hoàng đế",
    "tokens": [
      {
        "text": "khép",
        "startMs": 83840,
        "endMs": 84050
      },
      {
        "text": "lại",
        "startMs": 84050,
        "endMs": 84290
      },
      {
        "text": "triều",
        "startMs": 84290,
        "endMs": 84560
      },
      {
        "text": "đại",
        "startMs": 84560,
        "endMs": 84810
      },
      {
        "text": "của",
        "startMs": 84810,
        "endMs": 85100
      },
      {
        "text": "một",
        "startMs": 85100,
        "endMs": 85230
      },
      {
        "text": "trong",
        "startMs": 85230,
        "endMs": 85440
      },
      {
        "text": "những",
        "startMs": 85440,
        "endMs": 85740
      },
      {
        "text": "hoàng",
        "startMs": 85740,
        "endMs": 85990
      },
      {
        "text": "đế",
        "startMs": 85990,
        "endMs": 86200
      }
    ],
    "highlightKeywords": [
      "khép lại triều đại"
    ]
  },
  {
    "id": 48,
    "startMs": 86200,
    "endMs": 89040,
    "text": "gây tranh cãi và khó đoán nhất lịch sử La Mã.",
    "tokens": [
      {
        "text": "gây",
        "startMs": 86200,
        "endMs": 86540
      },
      {
        "text": "tranh",
        "startMs": 86540,
        "endMs": 86620
      },
      {
        "text": "cãi",
        "startMs": 86620,
        "endMs": 86740
      },
      {
        "text": "và",
        "startMs": 86740,
        "endMs": 86870
      },
      {
        "text": "khó",
        "startMs": 86870,
        "endMs": 87030
      },
      {
        "text": "đoán",
        "startMs": 87030,
        "endMs": 87350
      },
      {
        "text": "nhất",
        "startMs": 87350,
        "endMs": 87540
      },
      {
        "text": "lịch",
        "startMs": 87540,
        "endMs": 87790
      },
      {
        "text": "sử",
        "startMs": 87790,
        "endMs": 87960
      },
      {
        "text": "La",
        "startMs": 87960,
        "endMs": 88130
      },
      {
        "text": "Mã",
        "startMs": 88130,
        "endMs": 88540
      }
    ],
    "highlightKeywords": [
      "gây tranh cãi",
      "khó đoán nhất",
      "lịch sử La Mã"
    ]
  }
];
