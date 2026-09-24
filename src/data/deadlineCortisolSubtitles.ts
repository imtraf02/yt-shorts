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

export const deadlineCortisolSubtitles: SubtitlePhrase[] = [
  {
    "id": 1,
    "startMs": 40,
    "endMs": 1920,
    "text": "Bạn để deadline tới sát nút mới làm",
    "tokens": [
      {
        "text": "Bạn",
        "startMs": 40,
        "endMs": 230
      },
      {
        "text": "để",
        "startMs": 230,
        "endMs": 500
      },
      {
        "text": "deadline",
        "startMs": 500,
        "endMs": 750
      },
      {
        "text": "tới",
        "startMs": 750,
        "endMs": 990
      },
      {
        "text": "sát",
        "startMs": 990,
        "endMs": 1170
      },
      {
        "text": "nút",
        "startMs": 1170,
        "endMs": 1350
      },
      {
        "text": "mới",
        "startMs": 1350,
        "endMs": 1590
      },
      {
        "text": "làm",
        "startMs": 1590,
        "endMs": 1920
      }
    ],
    "highlightKeywords": [
      "deadline",
      "sát nút"
    ]
  },
  {
    "id": 2,
    "startMs": 1920,
    "endMs": 3680,
    "text": "xong sản phẩm lại ngon hơn hẳn",
    "tokens": [
      {
        "text": "xong",
        "startMs": 1920,
        "endMs": 2120
      },
      {
        "text": "sản",
        "startMs": 2120,
        "endMs": 2390
      },
      {
        "text": "phẩm",
        "startMs": 2390,
        "endMs": 2710
      },
      {
        "text": "lại",
        "startMs": 2710,
        "endMs": 2920
      },
      {
        "text": "ngon",
        "startMs": 2920,
        "endMs": 3120
      },
      {
        "text": "hơn",
        "startMs": 3120,
        "endMs": 3370
      },
      {
        "text": "hẳn",
        "startMs": 3370,
        "endMs": 3680
      }
    ],
    "highlightKeywords": [
      "ngon hơn hẳn"
    ]
  },
  {
    "id": 3,
    "startMs": 3680,
    "endMs": 5120,
    "text": "Không phải bạn thiên tài đâu",
    "tokens": [
      {
        "text": "Không",
        "startMs": 3680,
        "endMs": 3980
      },
      {
        "text": "phải",
        "startMs": 3980,
        "endMs": 4200
      },
      {
        "text": "bạn",
        "startMs": 4200,
        "endMs": 4420
      },
      {
        "text": "thiên",
        "startMs": 4420,
        "endMs": 4720
      },
      {
        "text": "tài",
        "startMs": 4720,
        "endMs": 4850
      },
      {
        "text": "đâu",
        "startMs": 4850,
        "endMs": 5120
      }
    ],
    "highlightKeywords": [
      "thiên tài"
    ]
  },
  {
    "id": 4,
    "startMs": 5120,
    "endMs": 7860,
    "text": "não bạn đang chơi một trò rất bẩn với chính bạn thôi",
    "tokens": [
      {
        "text": "não",
        "startMs": 5120,
        "endMs": 5270
      },
      {
        "text": "bạn",
        "startMs": 5270,
        "endMs": 5450
      },
      {
        "text": "đang",
        "startMs": 5450,
        "endMs": 5630
      },
      {
        "text": "chơi",
        "startMs": 5630,
        "endMs": 5810
      },
      {
        "text": "một",
        "startMs": 5810,
        "endMs": 5990
      },
      {
        "text": "trò",
        "startMs": 5990,
        "endMs": 6130
      },
      {
        "text": "rất",
        "startMs": 6130,
        "endMs": 6310
      },
      {
        "text": "bẩn",
        "startMs": 6310,
        "endMs": 6560
      },
      {
        "text": "với",
        "startMs": 6560,
        "endMs": 6810
      },
      {
        "text": "chính",
        "startMs": 6810,
        "endMs": 7110
      },
      {
        "text": "bạn",
        "startMs": 7110,
        "endMs": 7640
      },
      {
        "text": "thôi",
        "startMs": 7640,
        "endMs": 7860
      }
    ],
    "highlightKeywords": [
      "trò rất bẩn"
    ]
  },
  {
    "id": 5,
    "startMs": 7640,
    "endMs": 9340,
    "text": "Thủ phạm là cortisol",
    "tokens": [
      {
        "text": "Thủ",
        "startMs": 7640,
        "endMs": 7880
      },
      {
        "text": "phạm",
        "startMs": 7880,
        "endMs": 8240
      },
      {
        "text": "là",
        "startMs": 8240,
        "endMs": 8420
      },
      {
        "text": "cortisol",
        "startMs": 8420,
        "endMs": 9340
      }
    ],
    "highlightKeywords": [
      "cortisol"
    ]
  },
  {
    "id": 6,
    "startMs": 9340,
    "endMs": 10900,
    "text": "Khi deadline cận kề",
    "tokens": [
      {
        "text": "Khi",
        "startMs": 9340,
        "endMs": 9560
      },
      {
        "text": "deadline",
        "startMs": 9560,
        "endMs": 10020
      },
      {
        "text": "cận",
        "startMs": 10020,
        "endMs": 10470
      },
      {
        "text": "kề",
        "startMs": 10470,
        "endMs": 10900
      }
    ],
    "highlightKeywords": [
      "deadline cận kề"
    ]
  },
  {
    "id": 7,
    "startMs": 10900,
    "endMs": 12880,
    "text": "cơ thể coi đó như đang bị hổ đuổi",
    "tokens": [
      {
        "text": "cơ",
        "startMs": 10900,
        "endMs": 11060
      },
      {
        "text": "thể",
        "startMs": 11060,
        "endMs": 11390
      },
      {
        "text": "coi",
        "startMs": 11390,
        "endMs": 11460
      },
      {
        "text": "đó",
        "startMs": 11460,
        "endMs": 11670
      },
      {
        "text": "như",
        "startMs": 11670,
        "endMs": 11880
      },
      {
        "text": "đang",
        "startMs": 11880,
        "endMs": 12150
      },
      {
        "text": "bị",
        "startMs": 12150,
        "endMs": 12350
      },
      {
        "text": "hổ",
        "startMs": 12350,
        "endMs": 12550
      },
      {
        "text": "đuổi",
        "startMs": 12550,
        "endMs": 12880
      }
    ],
    "highlightKeywords": [
      "bị hổ đuổi"
    ]
  },
  {
    "id": 8,
    "startMs": 12880,
    "endMs": 15060,
    "text": "và bị hổ đuổi thì não không có thời gian",
    "tokens": [
      {
        "text": "và",
        "startMs": 12880,
        "endMs": 13100
      },
      {
        "text": "bị",
        "startMs": 13100,
        "endMs": 13400
      },
      {
        "text": "hổ",
        "startMs": 13400,
        "endMs": 13680
      },
      {
        "text": "đuổi",
        "startMs": 13680,
        "endMs": 14120
      },
      {
        "text": "thì",
        "startMs": 14120,
        "endMs": 14170
      },
      {
        "text": "não",
        "startMs": 14170,
        "endMs": 14280
      },
      {
        "text": "không",
        "startMs": 14280,
        "endMs": 14530
      },
      {
        "text": "có",
        "startMs": 14530,
        "endMs": 14670
      },
      {
        "text": "thời",
        "startMs": 14670,
        "endMs": 14900
      },
      {
        "text": "gian",
        "startMs": 14900,
        "endMs": 15060
      }
    ],
    "highlightKeywords": [
      "hổ đuổi"
    ]
  },
  {
    "id": 9,
    "startMs": 15060,
    "endMs": 16680,
    "text": "lăn tăn chỉnh sửa 5 lần nữa",
    "tokens": [
      {
        "text": "lăn",
        "startMs": 15060,
        "endMs": 15220
      },
      {
        "text": "tăn",
        "startMs": 15220,
        "endMs": 15380
      },
      {
        "text": "chỉnh",
        "startMs": 15380,
        "endMs": 15680
      },
      {
        "text": "sửa",
        "startMs": 15680,
        "endMs": 15940
      },
      {
        "text": "5",
        "startMs": 15940,
        "endMs": 16100
      },
      {
        "text": "lần",
        "startMs": 16100,
        "endMs": 16370
      },
      {
        "text": "nữa",
        "startMs": 16370,
        "endMs": 16680
      }
    ],
    "highlightKeywords": [
      "chỉnh sửa"
    ]
  },
  {
    "id": 10,
    "startMs": 16680,
    "endMs": 17880,
    "text": "nó chỉ chạy thôi",
    "tokens": [
      {
        "text": "nó",
        "startMs": 16680,
        "endMs": 16830
      },
      {
        "text": "chỉ",
        "startMs": 16830,
        "endMs": 17110
      },
      {
        "text": "chạy",
        "startMs": 17110,
        "endMs": 17410
      },
      {
        "text": "thôi",
        "startMs": 17410,
        "endMs": 17880
      }
    ],
    "highlightKeywords": [
      "chỉ chạy thôi"
    ]
  },
  {
    "id": 11,
    "startMs": 17880,
    "endMs": 20160,
    "text": "Thứ hai deadline cắt bớt lựa chọn",
    "tokens": [
      {
        "text": "Thứ",
        "startMs": 17880,
        "endMs": 18250
      },
      {
        "text": "hai",
        "startMs": 18250,
        "endMs": 18650
      },
      {
        "text": "deadline",
        "startMs": 18650,
        "endMs": 18950
      },
      {
        "text": "cắt",
        "startMs": 18950,
        "endMs": 19240
      },
      {
        "text": "bớt",
        "startMs": 19240,
        "endMs": 19480
      },
      {
        "text": "lựa",
        "startMs": 19480,
        "endMs": 19740
      },
      {
        "text": "chọn",
        "startMs": 19740,
        "endMs": 20160
      }
    ],
    "highlightKeywords": [
      "cắt bớt lựa chọn"
    ]
  },
  {
    "id": 12,
    "startMs": 20160,
    "endMs": 21960,
    "text": "Lúc rảnh bạn có 100 cách bắt đầu",
    "tokens": [
      {
        "text": "Lúc",
        "startMs": 20160,
        "endMs": 20320
      },
      {
        "text": "rảnh",
        "startMs": 20320,
        "endMs": 20550
      },
      {
        "text": "bạn",
        "startMs": 20550,
        "endMs": 20740
      },
      {
        "text": "có",
        "startMs": 20740,
        "endMs": 20850
      },
      {
        "text": "100",
        "startMs": 20850,
        "endMs": 21200
      },
      {
        "text": "cách",
        "startMs": 21200,
        "endMs": 21390
      },
      {
        "text": "bắt",
        "startMs": 21390,
        "endMs": 21570
      },
      {
        "text": "đầu",
        "startMs": 21570,
        "endMs": 21960
      }
    ],
    "highlightKeywords": [
      "100 cách"
    ]
  },
  {
    "id": 13,
    "startMs": 21960,
    "endMs": 23600,
    "text": "đứng chôn chân cả tiếng để chọn",
    "tokens": [
      {
        "text": "đứng",
        "startMs": 21960,
        "endMs": 22220
      },
      {
        "text": "chôn",
        "startMs": 22220,
        "endMs": 22400
      },
      {
        "text": "chân",
        "startMs": 22400,
        "endMs": 22590
      },
      {
        "text": "cả",
        "startMs": 22590,
        "endMs": 22740
      },
      {
        "text": "tiếng",
        "startMs": 22740,
        "endMs": 23000
      },
      {
        "text": "để",
        "startMs": 23000,
        "endMs": 23260
      },
      {
        "text": "chọn",
        "startMs": 23260,
        "endMs": 23600
      }
    ],
    "highlightKeywords": [
      "chôn chân cả tiếng"
    ]
  },
  {
    "id": 14,
    "startMs": 23600,
    "endMs": 24680,
    "text": "Còn 2 tiếng nữa hết giờ",
    "tokens": [
      {
        "text": "Còn",
        "startMs": 23600,
        "endMs": 23790
      },
      {
        "text": "2",
        "startMs": 23790,
        "endMs": 23850
      },
      {
        "text": "tiếng",
        "startMs": 23850,
        "endMs": 24150
      },
      {
        "text": "nữa",
        "startMs": 24150,
        "endMs": 24300
      },
      {
        "text": "hết",
        "startMs": 24300,
        "endMs": 24490
      },
      {
        "text": "giờ",
        "startMs": 24490,
        "endMs": 24680
      }
    ],
    "highlightKeywords": [
      "2 tiếng"
    ]
  },
  {
    "id": 15,
    "startMs": 24680,
    "endMs": 26340,
    "text": "thì chỉ còn đúng 1 cách khả thi",
    "tokens": [
      {
        "text": "thì",
        "startMs": 24680,
        "endMs": 24830
      },
      {
        "text": "chỉ",
        "startMs": 24830,
        "endMs": 25020
      },
      {
        "text": "còn",
        "startMs": 25020,
        "endMs": 25200
      },
      {
        "text": "đúng",
        "startMs": 25200,
        "endMs": 25390
      },
      {
        "text": "1",
        "startMs": 25390,
        "endMs": 25580
      },
      {
        "text": "cách",
        "startMs": 25580,
        "endMs": 25820
      },
      {
        "text": "khả",
        "startMs": 25820,
        "endMs": 25990
      },
      {
        "text": "thi",
        "startMs": 25990,
        "endMs": 26340
      }
    ],
    "highlightKeywords": [
      "1 cách khả thi"
    ]
  },
  {
    "id": 16,
    "startMs": 26340,
    "endMs": 27220,
    "text": "cách nhanh nhất",
    "tokens": [
      {
        "text": "cách",
        "startMs": 26340,
        "endMs": 26530
      },
      {
        "text": "nhanh",
        "startMs": 26530,
        "endMs": 27040
      },
      {
        "text": "nhất",
        "startMs": 27040,
        "endMs": 27220
      }
    ],
    "highlightKeywords": [
      "nhanh nhất"
    ]
  },
  {
    "id": 17,
    "startMs": 27220,
    "endMs": 28600,
    "text": "Và đây mới là cú lừa thật",
    "tokens": [
      {
        "text": "Và",
        "startMs": 27220,
        "endMs": 27300
      },
      {
        "text": "đây",
        "startMs": 27300,
        "endMs": 27460
      },
      {
        "text": "mới",
        "startMs": 27460,
        "endMs": 27700
      },
      {
        "text": "là",
        "startMs": 27700,
        "endMs": 27840
      },
      {
        "text": "cú",
        "startMs": 27840,
        "endMs": 28000
      },
      {
        "text": "lừa",
        "startMs": 28000,
        "endMs": 28200
      },
      {
        "text": "thật",
        "startMs": 28200,
        "endMs": 28600
      }
    ],
    "highlightKeywords": [
      "cú lừa thật"
    ]
  },
  {
    "id": 18,
    "startMs": 28600,
    "endMs": 30560,
    "text": "bạn không làm tốt hơn vào phút chót",
    "tokens": [
      {
        "text": "bạn",
        "startMs": 28600,
        "endMs": 28850
      },
      {
        "text": "không",
        "startMs": 28850,
        "endMs": 29110
      },
      {
        "text": "làm",
        "startMs": 29110,
        "endMs": 29300
      },
      {
        "text": "tốt",
        "startMs": 29300,
        "endMs": 29530
      },
      {
        "text": "hơn",
        "startMs": 29530,
        "endMs": 29720
      },
      {
        "text": "vào",
        "startMs": 29720,
        "endMs": 29940
      },
      {
        "text": "phút",
        "startMs": 29940,
        "endMs": 30230
      },
      {
        "text": "chót",
        "startMs": 30230,
        "endMs": 30560
      }
    ],
    "highlightKeywords": [
      "phút chót"
    ]
  },
  {
    "id": 19,
    "startMs": 30560,
    "endMs": 32760,
    "text": "Bạn chỉ đang so bản tập trung 100%",
    "tokens": [
      {
        "text": "Bạn",
        "startMs": 30560,
        "endMs": 30810
      },
      {
        "text": "chỉ",
        "startMs": 30810,
        "endMs": 31070
      },
      {
        "text": "đang",
        "startMs": 31070,
        "endMs": 31330
      },
      {
        "text": "so",
        "startMs": 31330,
        "endMs": 31430
      },
      {
        "text": "bản",
        "startMs": 31430,
        "endMs": 31680
      },
      {
        "text": "tập",
        "startMs": 31680,
        "endMs": 31930
      },
      {
        "text": "trung",
        "startMs": 31930,
        "endMs": 32200
      },
      {
        "text": "100%",
        "startMs": 32200,
        "endMs": 32760
      }
    ],
    "highlightKeywords": [
      "tập trung 100%"
    ]
  },
  {
    "id": 20,
    "startMs": 32760,
    "endMs": 34000,
    "text": "với bản làm sớm",
    "tokens": [
      {
        "text": "với",
        "startMs": 32760,
        "endMs": 33070
      },
      {
        "text": "bản",
        "startMs": 33070,
        "endMs": 33380
      },
      {
        "text": "làm",
        "startMs": 33380,
        "endMs": 33630
      },
      {
        "text": "sớm",
        "startMs": 33630,
        "endMs": 34000
      }
    ],
    "highlightKeywords": [
      "làm sớm"
    ]
  },
  {
    "id": 21,
    "startMs": 34000,
    "endMs": 36120,
    "text": "mà thật ra vừa làm vừa lướt điện thoại",
    "tokens": [
      {
        "text": "mà",
        "startMs": 34000,
        "endMs": 34170
      },
      {
        "text": "thật",
        "startMs": 34170,
        "endMs": 34470
      },
      {
        "text": "ra",
        "startMs": 34470,
        "endMs": 34500
      },
      {
        "text": "vừa",
        "startMs": 34500,
        "endMs": 34730
      },
      {
        "text": "làm",
        "startMs": 34730,
        "endMs": 34920
      },
      {
        "text": "vừa",
        "startMs": 34920,
        "endMs": 35150
      },
      {
        "text": "lướt",
        "startMs": 35150,
        "endMs": 35380
      },
      {
        "text": "điện",
        "startMs": 35380,
        "endMs": 35710
      },
      {
        "text": "thoại",
        "startMs": 35710,
        "endMs": 36120
      }
    ],
    "highlightKeywords": [
      "lướt điện thoại"
    ]
  },
  {
    "id": 22,
    "startMs": 36120,
    "endMs": 37640,
    "text": "đứng dậy pha trà 5 lần",
    "tokens": [
      {
        "text": "đứng",
        "startMs": 36120,
        "endMs": 36480
      },
      {
        "text": "dậy",
        "startMs": 36480,
        "endMs": 36730
      },
      {
        "text": "pha",
        "startMs": 36730,
        "endMs": 36930
      },
      {
        "text": "trà",
        "startMs": 36930,
        "endMs": 37180
      },
      {
        "text": "5",
        "startMs": 37180,
        "endMs": 37330
      },
      {
        "text": "lần",
        "startMs": 37330,
        "endMs": 37640
      }
    ],
    "highlightKeywords": [
      "pha trà 5 lần"
    ]
  },
  {
    "id": 23,
    "startMs": 37640,
    "endMs": 39400,
    "text": "Deadline không làm bạn giỏi hơn",
    "tokens": [
      {
        "text": "Deadline",
        "startMs": 37640,
        "endMs": 37970
      },
      {
        "text": "không",
        "startMs": 37970,
        "endMs": 38300
      },
      {
        "text": "làm",
        "startMs": 38300,
        "endMs": 38450
      },
      {
        "text": "bạn",
        "startMs": 38450,
        "endMs": 38700
      },
      {
        "text": "giỏi",
        "startMs": 38700,
        "endMs": 39000
      },
      {
        "text": "hơn",
        "startMs": 39000,
        "endMs": 39400
      }
    ],
    "highlightKeywords": [
      "không giỏi hơn"
    ]
  },
  {
    "id": 24,
    "startMs": 39400,
    "endMs": 41460,
    "text": "nó chỉ làm bạn ngừng tự phá mình",
    "tokens": [
      {
        "text": "nó",
        "startMs": 39400,
        "endMs": 39540
      },
      {
        "text": "chỉ",
        "startMs": 39540,
        "endMs": 39790
      },
      {
        "text": "làm",
        "startMs": 39790,
        "endMs": 39970
      },
      {
        "text": "bạn",
        "startMs": 39970,
        "endMs": 40210
      },
      {
        "text": "ngừng",
        "startMs": 40210,
        "endMs": 40580
      },
      {
        "text": "tự",
        "startMs": 40580,
        "endMs": 40730
      },
      {
        "text": "phá",
        "startMs": 40730,
        "endMs": 41240
      },
      {
        "text": "mình",
        "startMs": 41240,
        "endMs": 41460
      }
    ],
    "highlightKeywords": [
      "ngừng tự phá mình"
    ]
  },
  {
    "id": 25,
    "startMs": 41240,
    "endMs": 43120,
    "text": "Nhưng cortisol không miễn phí đâu",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 41240,
        "endMs": 41510
      },
      {
        "text": "cortisol",
        "startMs": 41510,
        "endMs": 41990
      },
      {
        "text": "không",
        "startMs": 41990,
        "endMs": 42260
      },
      {
        "text": "miễn",
        "startMs": 42260,
        "endMs": 42520
      },
      {
        "text": "phí",
        "startMs": 42520,
        "endMs": 42700
      },
      {
        "text": "đâu",
        "startMs": 42700,
        "endMs": 43120
      }
    ],
    "highlightKeywords": [
      "không miễn phí"
    ]
  },
  {
    "id": 26,
    "startMs": 43120,
    "endMs": 45600,
    "text": "dùng liên tục là cách nhanh nhất để burnout",
    "tokens": [
      {
        "text": "dùng",
        "startMs": 43120,
        "endMs": 43370
      },
      {
        "text": "liên",
        "startMs": 43370,
        "endMs": 43620
      },
      {
        "text": "tục",
        "startMs": 43620,
        "endMs": 43980
      },
      {
        "text": "là",
        "startMs": 43980,
        "endMs": 44020
      },
      {
        "text": "cách",
        "startMs": 44020,
        "endMs": 44270
      },
      {
        "text": "nhanh",
        "startMs": 44270,
        "endMs": 44520
      },
      {
        "text": "nhất",
        "startMs": 44520,
        "endMs": 44820
      },
      {
        "text": "để",
        "startMs": 44820,
        "endMs": 45070
      },
      {
        "text": "burnout",
        "startMs": 45070,
        "endMs": 45600
      }
    ],
    "highlightKeywords": [
      "burnout"
    ]
  },
  {
    "id": 27,
    "startMs": 45600,
    "endMs": 46960,
    "text": "Muốn có cảm giác tập trung đó",
    "tokens": [
      {
        "text": "Muốn",
        "startMs": 45600,
        "endMs": 45770
      },
      {
        "text": "có",
        "startMs": 45770,
        "endMs": 45900
      },
      {
        "text": "cảm",
        "startMs": 45900,
        "endMs": 46120
      },
      {
        "text": "giác",
        "startMs": 46120,
        "endMs": 46340
      },
      {
        "text": "tập",
        "startMs": 46340,
        "endMs": 46620
      },
      {
        "text": "trung",
        "startMs": 46620,
        "endMs": 46780
      },
      {
        "text": "đó",
        "startMs": 46780,
        "endMs": 46960
      }
    ],
    "highlightKeywords": [
      "tập trung"
    ]
  },
  {
    "id": 28,
    "startMs": 46960,
    "endMs": 48440,
    "text": "mà không cần đợi sát nút",
    "tokens": [
      {
        "text": "mà",
        "startMs": 46960,
        "endMs": 47090
      },
      {
        "text": "không",
        "startMs": 47090,
        "endMs": 47360
      },
      {
        "text": "cần",
        "startMs": 47360,
        "endMs": 47580
      },
      {
        "text": "đợi",
        "startMs": 47580,
        "endMs": 47840
      },
      {
        "text": "sát",
        "startMs": 47840,
        "endMs": 48140
      },
      {
        "text": "nút",
        "startMs": 48140,
        "endMs": 48440
      }
    ],
    "highlightKeywords": [
      "sát nút"
    ]
  },
  {
    "id": 29,
    "startMs": 48440,
    "endMs": 49680,
    "text": "Tự tạo deadline giả",
    "tokens": [
      {
        "text": "Tự",
        "startMs": 48440,
        "endMs": 48650
      },
      {
        "text": "tạo",
        "startMs": 48650,
        "endMs": 48920
      },
      {
        "text": "deadline",
        "startMs": 48920,
        "endMs": 49250
      },
      {
        "text": "giả",
        "startMs": 49250,
        "endMs": 49680
      }
    ],
    "highlightKeywords": [
      "deadline giả"
    ]
  },
  {
    "id": 30,
    "startMs": 49680,
    "endMs": 51440,
    "text": "và tự cắt bớt lựa chọn của mình",
    "tokens": [
      {
        "text": "và",
        "startMs": 49680,
        "endMs": 49850
      },
      {
        "text": "tự",
        "startMs": 49850,
        "endMs": 49980
      },
      {
        "text": "cắt",
        "startMs": 49980,
        "endMs": 50240
      },
      {
        "text": "bớt",
        "startMs": 50240,
        "endMs": 50410
      },
      {
        "text": "lựa",
        "startMs": 50410,
        "endMs": 50620
      },
      {
        "text": "chọn",
        "startMs": 50620,
        "endMs": 50870
      },
      {
        "text": "của",
        "startMs": 50870,
        "endMs": 51090
      },
      {
        "text": "mình",
        "startMs": 51090,
        "endMs": 51440
      }
    ],
    "highlightKeywords": [
      "cắt bớt lựa chọn"
    ]
  },
  {
    "id": 31,
    "startMs": 51440,
    "endMs": 53440,
    "text": "y như deadline thật đang làm",
    "tokens": [
      {
        "text": "y",
        "startMs": 51440,
        "endMs": 51600
      },
      {
        "text": "như",
        "startMs": 51600,
        "endMs": 51770
      },
      {
        "text": "deadline",
        "startMs": 51770,
        "endMs": 52170
      },
      {
        "text": "thật",
        "startMs": 52170,
        "endMs": 52570
      },
      {
        "text": "đang",
        "startMs": 52570,
        "endMs": 53180
      },
      {
        "text": "làm",
        "startMs": 53180,
        "endMs": 53440
      }
    ],
    "highlightKeywords": [
      "deadline thật"
    ]
  },
  {
    "id": 32,
    "startMs": 53440,
    "endMs": 54890,
    "text": "Hẹn giờ 25 phút",
    "tokens": [
      {
        "text": "Hẹn",
        "startMs": 53440,
        "endMs": 53770
      },
      {
        "text": "giờ",
        "startMs": 53770,
        "endMs": 54040
      },
      {
        "text": "25",
        "startMs": 54040,
        "endMs": 54470
      },
      {
        "text": "phút",
        "startMs": 54470,
        "endMs": 54840
      }
    ],
    "highlightKeywords": [
      "25 phút"
    ]
  },
  {
    "id": 33,
    "startMs": 54920,
    "endMs": 56630,
    "text": "chọn đúng 1 cách để bắt đầu",
    "tokens": [
      {
        "text": "chọn",
        "startMs": 54920,
        "endMs": 55110
      },
      {
        "text": "đúng",
        "startMs": 55110,
        "endMs": 55320
      },
      {
        "text": "1",
        "startMs": 55320,
        "endMs": 55530
      },
      {
        "text": "cách",
        "startMs": 55530,
        "endMs": 55740
      },
      {
        "text": "để",
        "startMs": 55740,
        "endMs": 55950
      },
      {
        "text": "bắt",
        "startMs": 55950,
        "endMs": 56140
      },
      {
        "text": "đầu",
        "startMs": 56140,
        "endMs": 56630
      }
    ],
    "highlightKeywords": [
      "1 cách"
    ]
  },
  {
    "id": 34,
    "startMs": 56630,
    "endMs": 58100,
    "text": "không cho phép đổi ý",
    "tokens": [
      {
        "text": "không",
        "startMs": 56630,
        "endMs": 56950
      },
      {
        "text": "cho",
        "startMs": 56950,
        "endMs": 57080
      },
      {
        "text": "phép",
        "startMs": 57080,
        "endMs": 57370
      },
      {
        "text": "đổi",
        "startMs": 57370,
        "endMs": 57880
      },
      {
        "text": "ý",
        "startMs": 57880,
        "endMs": 58100
      }
    ],
    "highlightKeywords": [
      "không đổi ý"
    ]
  },
  {
    "id": 35,
    "startMs": 57880,
    "endMs": 59660,
    "text": "Não bạn không cần một con hổ thật",
    "tokens": [
      {
        "text": "Não",
        "startMs": 57880,
        "endMs": 58070
      },
      {
        "text": "bạn",
        "startMs": 58070,
        "endMs": 58290
      },
      {
        "text": "không",
        "startMs": 58290,
        "endMs": 58580
      },
      {
        "text": "cần",
        "startMs": 58580,
        "endMs": 58820
      },
      {
        "text": "một",
        "startMs": 58820,
        "endMs": 59060
      },
      {
        "text": "con",
        "startMs": 59060,
        "endMs": 59200
      },
      {
        "text": "hổ",
        "startMs": 59200,
        "endMs": 59370
      },
      {
        "text": "thật",
        "startMs": 59370,
        "endMs": 59660
      }
    ],
    "highlightKeywords": [
      "hổ thật"
    ]
  },
  {
    "id": 36,
    "startMs": 59660,
    "endMs": 60520,
    "text": "để chạy nhanh",
    "tokens": [
      {
        "text": "để",
        "startMs": 59660,
        "endMs": 59900
      },
      {
        "text": "chạy",
        "startMs": 59900,
        "endMs": 60260
      },
      {
        "text": "nhanh",
        "startMs": 60260,
        "endMs": 60520
      }
    ],
    "highlightKeywords": [
      "chạy nhanh"
    ]
  },
  {
    "id": 37,
    "startMs": 60520,
    "endMs": 63160,
    "text": "Nó chỉ cần tin là có hổ thôi",
    "tokens": [
      {
        "text": "Nó",
        "startMs": 60520,
        "endMs": 60730
      },
      {
        "text": "chỉ",
        "startMs": 60730,
        "endMs": 61030
      },
      {
        "text": "cần",
        "startMs": 61030,
        "endMs": 61350
      },
      {
        "text": "tin",
        "startMs": 61350,
        "endMs": 61540
      },
      {
        "text": "là",
        "startMs": 61540,
        "endMs": 61730
      },
      {
        "text": "có",
        "startMs": 61730,
        "endMs": 61930
      },
      {
        "text": "hổ",
        "startMs": 61930,
        "endMs": 62170
      },
      {
        "text": "thôi",
        "startMs": 62170,
        "endMs": 62760
      }
    ],
    "highlightKeywords": [
      "tin là có hổ"
    ]
  }
];
