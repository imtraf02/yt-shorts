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

export const zeigarnikSubtitles: SubtitlePhrase[] = [
  {
    "id": 1,
    "startMs": 40,
    "endMs": 1200,
    "text": "Bạn nhắn cho bạn thân",
    "tokens": [
      {
        "text": "Bạn",
        "startMs": 40,
        "endMs": 200
      },
      {
        "text": "nhắn",
        "startMs": 200,
        "endMs": 440
      },
      {
        "text": "cho",
        "startMs": 440,
        "endMs": 560
      },
      {
        "text": "bạn",
        "startMs": 560,
        "endMs": 760
      },
      {
        "text": "thân",
        "startMs": 760,
        "endMs": 1200
      }
    ],
    "highlightKeywords": [
      "nhắn cho bạn thân"
    ]
  },
  {
    "id": 2,
    "startMs": 1200,
    "endMs": 3360,
    "text": "Mai tao gọi cho mày để bàn chuyện đó nha",
    "tokens": [
      {
        "text": "Mai",
        "startMs": 1200,
        "endMs": 1280
      },
      {
        "text": "tao",
        "startMs": 1280,
        "endMs": 1400
      },
      {
        "text": "gọi",
        "startMs": 1400,
        "endMs": 1560
      },
      {
        "text": "cho",
        "startMs": 1560,
        "endMs": 1700
      },
      {
        "text": "mày",
        "startMs": 1700,
        "endMs": 1840
      },
      {
        "text": "để",
        "startMs": 1840,
        "endMs": 2040
      },
      {
        "text": "bàn",
        "startMs": 2040,
        "endMs": 2240
      },
      {
        "text": "chuyện",
        "startMs": 2240,
        "endMs": 2560
      },
      {
        "text": "đó",
        "startMs": 2560,
        "endMs": 2760
      },
      {
        "text": "nha",
        "startMs": 2760,
        "endMs": 3360
      }
    ],
    "highlightKeywords": [
      "Mai tao gọi",
      "bàn chuyện đó"
    ]
  },
  {
    "id": 3,
    "startMs": 3360,
    "endMs": 4950,
    "text": "Gửi xong  bạn tắt điện thoại",
    "tokens": [
      {
        "text": "Gửi",
        "startMs": 3360,
        "endMs": 3680
      },
      {
        "text": "xong",
        "startMs": 3680,
        "endMs": 4060
      },
      {
        "text": "bạn",
        "startMs": 4060,
        "endMs": 4160
      },
      {
        "text": "tắt",
        "startMs": 4160,
        "endMs": 4360
      },
      {
        "text": "điện",
        "startMs": 4360,
        "endMs": 4640
      },
      {
        "text": "thoại",
        "startMs": 4640,
        "endMs": 4950
      }
    ],
    "highlightKeywords": [
      "tắt điện thoại"
    ]
  },
  {
    "id": 4,
    "startMs": 4950,
    "endMs": 5980,
    "text": "thấy nhẹ hẳn người",
    "tokens": [
      {
        "text": "thấy",
        "startMs": 4950,
        "endMs": 5210
      },
      {
        "text": "nhẹ",
        "startMs": 5210,
        "endMs": 5360
      },
      {
        "text": "hẳn",
        "startMs": 5360,
        "endMs": 5560
      },
      {
        "text": "người",
        "startMs": 5560,
        "endMs": 5980
      }
    ],
    "highlightKeywords": [
      "nhẹ hẳn người"
    ]
  },
  {
    "id": 5,
    "startMs": 5980,
    "endMs": 7540,
    "text": "như thể chuyện đó đã được giải quyết",
    "tokens": [
      {
        "text": "như",
        "startMs": 5980,
        "endMs": 6150
      },
      {
        "text": "thể",
        "startMs": 6150,
        "endMs": 6310
      },
      {
        "text": "chuyện",
        "startMs": 6310,
        "endMs": 6530
      },
      {
        "text": "đó",
        "startMs": 6530,
        "endMs": 6690
      },
      {
        "text": "đã",
        "startMs": 6690,
        "endMs": 6850
      },
      {
        "text": "được",
        "startMs": 6850,
        "endMs": 7050
      },
      {
        "text": "giải",
        "startMs": 7050,
        "endMs": 7340
      },
      {
        "text": "quyết",
        "startMs": 7340,
        "endMs": 7540
      }
    ],
    "highlightKeywords": [
      "đã được giải quyết"
    ]
  },
  {
    "id": 6,
    "startMs": 7540,
    "endMs": 8820,
    "text": "Nhưng ngày mai chưa tới",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 7540,
        "endMs": 7820
      },
      {
        "text": "ngày",
        "startMs": 7820,
        "endMs": 8070
      },
      {
        "text": "mai",
        "startMs": 8070,
        "endMs": 8200
      },
      {
        "text": "chưa",
        "startMs": 8200,
        "endMs": 8680
      },
      {
        "text": "tới",
        "startMs": 8680,
        "endMs": 8820
      }
    ],
    "highlightKeywords": [
      "chưa tới"
    ]
  },
  {
    "id": 7,
    "startMs": 8820,
    "endMs": 10100,
    "text": "cuộc gọi chưa xảy ra",
    "tokens": [
      {
        "text": "cuộc",
        "startMs": 8820,
        "endMs": 9010
      },
      {
        "text": "gọi",
        "startMs": 9010,
        "endMs": 9240
      },
      {
        "text": "chưa",
        "startMs": 9240,
        "endMs": 9480
      },
      {
        "text": "xảy",
        "startMs": 9480,
        "endMs": 9920
      },
      {
        "text": "ra",
        "startMs": 9920,
        "endMs": 10100
      }
    ],
    "highlightKeywords": [
      "chưa xảy ra"
    ]
  },
  {
    "id": 8,
    "startMs": 10000,
    "endMs": 11340,
    "text": "chuyện vẫn y nguyên như cũ",
    "tokens": [
      {
        "text": "chuyện",
        "startMs": 10000,
        "endMs": 10340
      },
      {
        "text": "vẫn",
        "startMs": 10340,
        "endMs": 10550
      },
      {
        "text": "y",
        "startMs": 10550,
        "endMs": 10790
      },
      {
        "text": "nguyên",
        "startMs": 10790,
        "endMs": 10910
      },
      {
        "text": "như",
        "startMs": 10910,
        "endMs": 11120
      },
      {
        "text": "cũ",
        "startMs": 11120,
        "endMs": 11340
      }
    ],
    "highlightKeywords": [
      "vẫn y nguyên"
    ]
  },
  {
    "id": 9,
    "startMs": 11340,
    "endMs": 12880,
    "text": "Đó là hiệu ứng Zeigarnik ngược",
    "tokens": [
      {
        "text": "Đó",
        "startMs": 11340,
        "endMs": 11500
      },
      {
        "text": "là",
        "startMs": 11500,
        "endMs": 11620
      },
      {
        "text": "hiệu",
        "startMs": 11620,
        "endMs": 11860
      },
      {
        "text": "ứng",
        "startMs": 11860,
        "endMs": 12060
      },
      {
        "text": "Zeigarnik",
        "startMs": 12060,
        "endMs": 12580
      },
      {
        "text": "ngược",
        "startMs": 12580,
        "endMs": 12880
      }
    ],
    "highlightKeywords": [
      "Zeigarnik ngược"
    ]
  },
  {
    "id": 10,
    "startMs": 12880,
    "endMs": 14070,
    "text": "Cơ chế của nó thế này",
    "tokens": [
      {
        "text": "Cơ",
        "startMs": 12880,
        "endMs": 13000
      },
      {
        "text": "chế",
        "startMs": 13000,
        "endMs": 13230
      },
      {
        "text": "của",
        "startMs": 13230,
        "endMs": 13410
      },
      {
        "text": "nó",
        "startMs": 13410,
        "endMs": 13530
      },
      {
        "text": "thế",
        "startMs": 13530,
        "endMs": 13740
      },
      {
        "text": "này",
        "startMs": 13740,
        "endMs": 14070
      }
    ],
    "highlightKeywords": [
      "Cơ chế"
    ]
  },
  {
    "id": 11,
    "startMs": 14070,
    "endMs": 15510,
    "text": "bình thường não bạn cực kỳ khó chịu",
    "tokens": [
      {
        "text": "bình",
        "startMs": 14070,
        "endMs": 14220
      },
      {
        "text": "thường",
        "startMs": 14220,
        "endMs": 14550
      },
      {
        "text": "não",
        "startMs": 14550,
        "endMs": 14680
      },
      {
        "text": "bạn",
        "startMs": 14680,
        "endMs": 14860
      },
      {
        "text": "cực",
        "startMs": 14860,
        "endMs": 15030
      },
      {
        "text": "kỳ",
        "startMs": 15030,
        "endMs": 15170
      },
      {
        "text": "khó",
        "startMs": 15170,
        "endMs": 15300
      },
      {
        "text": "chịu",
        "startMs": 15300,
        "endMs": 15510
      }
    ],
    "highlightKeywords": [
      "cực kỳ khó chịu"
    ]
  },
  {
    "id": 12,
    "startMs": 15510,
    "endMs": 16420,
    "text": "với việc dang dở",
    "tokens": [
      {
        "text": "với",
        "startMs": 15510,
        "endMs": 15690
      },
      {
        "text": "việc",
        "startMs": 15690,
        "endMs": 15910
      },
      {
        "text": "dang",
        "startMs": 15910,
        "endMs": 16080
      },
      {
        "text": "dở",
        "startMs": 16080,
        "endMs": 16420
      }
    ],
    "highlightKeywords": [
      "việc dang dở"
    ]
  },
  {
    "id": 13,
    "startMs": 16420,
    "endMs": 17780,
    "text": "đó là lý do bạn cứ nhớ mãi",
    "tokens": [
      {
        "text": "đó",
        "startMs": 16420,
        "endMs": 16600
      },
      {
        "text": "là",
        "startMs": 16600,
        "endMs": 16740
      },
      {
        "text": "lý",
        "startMs": 16740,
        "endMs": 16870
      },
      {
        "text": "do",
        "startMs": 16870,
        "endMs": 16960
      },
      {
        "text": "bạn",
        "startMs": 16960,
        "endMs": 17190
      },
      {
        "text": "cứ",
        "startMs": 17190,
        "endMs": 17370
      },
      {
        "text": "nhớ",
        "startMs": 17370,
        "endMs": 17600
      },
      {
        "text": "mãi",
        "startMs": 17600,
        "endMs": 17780
      }
    ],
    "highlightKeywords": [
      "nhớ mãi"
    ]
  },
  {
    "id": 14,
    "startMs": 17780,
    "endMs": 19320,
    "text": "một tin nhắn chưa trả lời",
    "tokens": [
      {
        "text": "một",
        "startMs": 17780,
        "endMs": 18020
      },
      {
        "text": "tin",
        "startMs": 18020,
        "endMs": 18150
      },
      {
        "text": "nhắn",
        "startMs": 18150,
        "endMs": 18420
      },
      {
        "text": "chưa",
        "startMs": 18420,
        "endMs": 18650
      },
      {
        "text": "trả",
        "startMs": 18650,
        "endMs": 18880
      },
      {
        "text": "lời",
        "startMs": 18880,
        "endMs": 19320
      }
    ],
    "highlightKeywords": [
      "tin nhắn chưa trả lời"
    ]
  },
  {
    "id": 15,
    "startMs": 19320,
    "endMs": 21520,
    "text": "một bộ phim xem dở giữa chừng",
    "tokens": [
      {
        "text": "một",
        "startMs": 19320,
        "endMs": 19570
      },
      {
        "text": "bộ",
        "startMs": 19570,
        "endMs": 19790
      },
      {
        "text": "phim",
        "startMs": 19790,
        "endMs": 20010
      },
      {
        "text": "xem",
        "startMs": 20010,
        "endMs": 20180
      },
      {
        "text": "dở",
        "startMs": 20180,
        "endMs": 20460
      },
      {
        "text": "giữa",
        "startMs": 20460,
        "endMs": 20840
      },
      {
        "text": "chừng",
        "startMs": 20840,
        "endMs": 21520
      }
    ],
    "highlightKeywords": [
      "xem dở giữa chừng"
    ]
  },
  {
    "id": 16,
    "startMs": 21520,
    "endMs": 22600,
    "text": "Nhưng có một lỗ hổng",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 21520,
        "endMs": 21770
      },
      {
        "text": "có",
        "startMs": 21770,
        "endMs": 21890
      },
      {
        "text": "một",
        "startMs": 21890,
        "endMs": 22100
      },
      {
        "text": "lỗ",
        "startMs": 22100,
        "endMs": 22260
      },
      {
        "text": "hổng",
        "startMs": 22260,
        "endMs": 22600
      }
    ],
    "highlightKeywords": [
      "lỗ hổng"
    ]
  },
  {
    "id": 17,
    "startMs": 22600,
    "endMs": 24450,
    "text": "chỉ cần bạn nói ra hoặc hẹn sẽ làm",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 22600,
        "endMs": 22800
      },
      {
        "text": "cần",
        "startMs": 22800,
        "endMs": 23010
      },
      {
        "text": "bạn",
        "startMs": 23010,
        "endMs": 23220
      },
      {
        "text": "nói",
        "startMs": 23220,
        "endMs": 23390
      },
      {
        "text": "ra",
        "startMs": 23390,
        "endMs": 23470
      },
      {
        "text": "hoặc",
        "startMs": 23470,
        "endMs": 23720
      },
      {
        "text": "hẹn",
        "startMs": 23720,
        "endMs": 23920
      },
      {
        "text": "sẽ",
        "startMs": 23920,
        "endMs": 24090
      },
      {
        "text": "làm",
        "startMs": 24090,
        "endMs": 24450
      }
    ],
    "highlightKeywords": [
      "nói ra",
      "hẹn sẽ làm"
    ]
  },
  {
    "id": 18,
    "startMs": 24450,
    "endMs": 26180,
    "text": "dù chỉ là một câu nhắn tin",
    "tokens": [
      {
        "text": "dù",
        "startMs": 24450,
        "endMs": 24560
      },
      {
        "text": "chỉ",
        "startMs": 24560,
        "endMs": 24830
      },
      {
        "text": "là",
        "startMs": 24830,
        "endMs": 24990
      },
      {
        "text": "một",
        "startMs": 24990,
        "endMs": 25260
      },
      {
        "text": "câu",
        "startMs": 25260,
        "endMs": 25470
      },
      {
        "text": "nhắn",
        "startMs": 25470,
        "endMs": 26000
      },
      {
        "text": "tin",
        "startMs": 26000,
        "endMs": 26180
      }
    ],
    "highlightKeywords": [
      "câu nhắn tin"
    ]
  },
  {
    "id": 19,
    "startMs": 26080,
    "endMs": 27730,
    "text": "não bạn đã coi như tín hiệu đã xử lý",
    "tokens": [
      {
        "text": "não",
        "startMs": 26080,
        "endMs": 26220
      },
      {
        "text": "bạn",
        "startMs": 26220,
        "endMs": 26430
      },
      {
        "text": "đã",
        "startMs": 26430,
        "endMs": 26600
      },
      {
        "text": "coi",
        "startMs": 26600,
        "endMs": 26720
      },
      {
        "text": "như",
        "startMs": 26720,
        "endMs": 26890
      },
      {
        "text": "tín",
        "startMs": 26890,
        "endMs": 27020
      },
      {
        "text": "hiệu",
        "startMs": 27020,
        "endMs": 27270
      },
      {
        "text": "đã",
        "startMs": 27270,
        "endMs": 27440
      },
      {
        "text": "xử",
        "startMs": 27440,
        "endMs": 27610
      },
      {
        "text": "lý",
        "startMs": 27610,
        "endMs": 27730
      }
    ],
    "highlightKeywords": [
      "tín hiệu đã xử lý"
    ]
  },
  {
    "id": 20,
    "startMs": 27730,
    "endMs": 30000,
    "text": "được gửi đi  dù thực tế chưa làm gì cả",
    "tokens": [
      {
        "text": "được",
        "startMs": 27730,
        "endMs": 28070
      },
      {
        "text": "gửi",
        "startMs": 28070,
        "endMs": 28410
      },
      {
        "text": "đi",
        "startMs": 28410,
        "endMs": 28530
      },
      {
        "text": "dù",
        "startMs": 28530,
        "endMs": 28610
      },
      {
        "text": "thực",
        "startMs": 28610,
        "endMs": 28880
      },
      {
        "text": "tế",
        "startMs": 28880,
        "endMs": 29040
      },
      {
        "text": "chưa",
        "startMs": 29040,
        "endMs": 29250
      },
      {
        "text": "làm",
        "startMs": 29250,
        "endMs": 29420
      },
      {
        "text": "gì",
        "startMs": 29420,
        "endMs": 29550
      },
      {
        "text": "cả",
        "startMs": 29550,
        "endMs": 30000
      }
    ],
    "highlightKeywords": [
      "chưa làm gì cả"
    ]
  },
  {
    "id": 21,
    "startMs": 30000,
    "endMs": 30760,
    "text": "Phần nguy hiểm là",
    "tokens": [
      {
        "text": "Phần",
        "startMs": 30000,
        "endMs": 30240
      },
      {
        "text": "nguy",
        "startMs": 30240,
        "endMs": 30400
      },
      {
        "text": "hiểm",
        "startMs": 30400,
        "endMs": 30640
      },
      {
        "text": "là",
        "startMs": 30640,
        "endMs": 30760
      }
    ],
    "highlightKeywords": [
      "nguy hiểm"
    ]
  },
  {
    "id": 22,
    "startMs": 30760,
    "endMs": 32240,
    "text": "dopamine không phân biệt được",
    "tokens": [
      {
        "text": "dopamine",
        "startMs": 30760,
        "endMs": 31240
      },
      {
        "text": "không",
        "startMs": 31240,
        "endMs": 31540
      },
      {
        "text": "phân",
        "startMs": 31540,
        "endMs": 31680
      },
      {
        "text": "biệt",
        "startMs": 31680,
        "endMs": 31920
      },
      {
        "text": "được",
        "startMs": 31920,
        "endMs": 32240
      }
    ],
    "highlightKeywords": [
      "dopamine không phân biệt"
    ]
  },
  {
    "id": 23,
    "startMs": 32240,
    "endMs": 33340,
    "text": "hẹn làm với đã làm",
    "tokens": [
      {
        "text": "hẹn",
        "startMs": 32240,
        "endMs": 32440
      },
      {
        "text": "làm",
        "startMs": 32440,
        "endMs": 32600
      },
      {
        "text": "với",
        "startMs": 32600,
        "endMs": 32800
      },
      {
        "text": "đã",
        "startMs": 32800,
        "endMs": 33120
      },
      {
        "text": "làm",
        "startMs": 33120,
        "endMs": 33340
      }
    ],
    "highlightKeywords": [
      "hẹn làm",
      "đã làm"
    ]
  },
  {
    "id": 24,
    "startMs": 33340,
    "endMs": 35820,
    "text": "Cả hai đều cho bạn cảm giác nhẹ nhõm y hệt nhau",
    "tokens": [
      {
        "text": "Cả",
        "startMs": 33340,
        "endMs": 33510
      },
      {
        "text": "hai",
        "startMs": 33510,
        "endMs": 33640
      },
      {
        "text": "đều",
        "startMs": 33640,
        "endMs": 33910
      },
      {
        "text": "cho",
        "startMs": 33910,
        "endMs": 34040
      },
      {
        "text": "bạn",
        "startMs": 34040,
        "endMs": 34260
      },
      {
        "text": "cảm",
        "startMs": 34260,
        "endMs": 34480
      },
      {
        "text": "giác",
        "startMs": 34480,
        "endMs": 34700
      },
      {
        "text": "nhẹ",
        "startMs": 34700,
        "endMs": 34920
      },
      {
        "text": "nhõm",
        "startMs": 34920,
        "endMs": 35140
      },
      {
        "text": "y",
        "startMs": 35140,
        "endMs": 35340
      },
      {
        "text": "hệt",
        "startMs": 35340,
        "endMs": 35530
      },
      {
        "text": "nhau",
        "startMs": 35530,
        "endMs": 35820
      }
    ],
    "highlightKeywords": [
      "nhẹ nhõm y hệt"
    ]
  },
  {
    "id": 25,
    "startMs": 35820,
    "endMs": 37020,
    "text": "Thế nên bạn có thể hẹn",
    "tokens": [
      {
        "text": "Thế",
        "startMs": 35820,
        "endMs": 36040
      },
      {
        "text": "nên",
        "startMs": 36040,
        "endMs": 36220
      },
      {
        "text": "bạn",
        "startMs": 36220,
        "endMs": 36450
      },
      {
        "text": "có",
        "startMs": 36450,
        "endMs": 36580
      },
      {
        "text": "thể",
        "startMs": 36580,
        "endMs": 36810
      },
      {
        "text": "hẹn",
        "startMs": 36810,
        "endMs": 37020
      }
    ],
    "highlightKeywords": [
      "hẹn"
    ]
  },
  {
    "id": 26,
    "startMs": 37020,
    "endMs": 38900,
    "text": "để tuần sau  để mai tính  lát nữa làm",
    "tokens": [
      {
        "text": "để",
        "startMs": 37020,
        "endMs": 37250
      },
      {
        "text": "tuần",
        "startMs": 37250,
        "endMs": 37580
      },
      {
        "text": "sau",
        "startMs": 37580,
        "endMs": 37650
      },
      {
        "text": "để",
        "startMs": 37650,
        "endMs": 37880
      },
      {
        "text": "mai",
        "startMs": 37880,
        "endMs": 38010
      },
      {
        "text": "tính",
        "startMs": 38010,
        "endMs": 38450
      },
      {
        "text": "lát",
        "startMs": 38450,
        "endMs": 38540
      },
      {
        "text": "nữa",
        "startMs": 38540,
        "endMs": 38720
      },
      {
        "text": "làm",
        "startMs": 38720,
        "endMs": 38900
      }
    ],
    "highlightKeywords": [
      "để mai tính",
      "lát nữa làm"
    ]
  },
  {
    "id": 27,
    "startMs": 38900,
    "endMs": 40320,
    "text": "cả chục lần một ngày",
    "tokens": [
      {
        "text": "cả",
        "startMs": 38900,
        "endMs": 39080
      },
      {
        "text": "chục",
        "startMs": 39080,
        "endMs": 39350
      },
      {
        "text": "lần",
        "startMs": 39350,
        "endMs": 39570
      },
      {
        "text": "một",
        "startMs": 39570,
        "endMs": 39800
      },
      {
        "text": "ngày",
        "startMs": 39800,
        "endMs": 40320
      }
    ],
    "highlightKeywords": [
      "cả chục lần"
    ]
  },
  {
    "id": 28,
    "startMs": 40320,
    "endMs": 42300,
    "text": "cảm thấy mình đã kiểm soát được mọi thứ",
    "tokens": [
      {
        "text": "cảm",
        "startMs": 40320,
        "endMs": 40490
      },
      {
        "text": "thấy",
        "startMs": 40490,
        "endMs": 40710
      },
      {
        "text": "mình",
        "startMs": 40710,
        "endMs": 40890
      },
      {
        "text": "đã",
        "startMs": 40890,
        "endMs": 41020
      },
      {
        "text": "kiểm",
        "startMs": 41020,
        "endMs": 41260
      },
      {
        "text": "soát",
        "startMs": 41260,
        "endMs": 41420
      },
      {
        "text": "được",
        "startMs": 41420,
        "endMs": 41730
      },
      {
        "text": "mọi",
        "startMs": 41730,
        "endMs": 41880
      },
      {
        "text": "thứ",
        "startMs": 41880,
        "endMs": 42300
      }
    ],
    "highlightKeywords": [
      "kiểm soát mọi thứ"
    ]
  },
  {
    "id": 29,
    "startMs": 42300,
    "endMs": 44240,
    "text": "trong khi chẳng có việc nào thực sự nhúc nhích",
    "tokens": [
      {
        "text": "trong",
        "startMs": 42300,
        "endMs": 42410
      },
      {
        "text": "khi",
        "startMs": 42410,
        "endMs": 42520
      },
      {
        "text": "chẳng",
        "startMs": 42520,
        "endMs": 42760
      },
      {
        "text": "có",
        "startMs": 42760,
        "endMs": 42870
      },
      {
        "text": "việc",
        "startMs": 42870,
        "endMs": 43100
      },
      {
        "text": "nào",
        "startMs": 43100,
        "endMs": 43250
      },
      {
        "text": "thực",
        "startMs": 43250,
        "endMs": 43480
      },
      {
        "text": "sự",
        "startMs": 43480,
        "endMs": 43630
      },
      {
        "text": "nhúc",
        "startMs": 43630,
        "endMs": 43810
      },
      {
        "text": "nhích",
        "startMs": 43810,
        "endMs": 44240
      }
    ],
    "highlightKeywords": [
      "không nhúc nhích"
    ]
  },
  {
    "id": 30,
    "startMs": 44240,
    "endMs": 45300,
    "text": "Điều buồn cười là",
    "tokens": [
      {
        "text": "Điều",
        "startMs": 44240,
        "endMs": 44480
      },
      {
        "text": "buồn",
        "startMs": 44480,
        "endMs": 44720
      },
      {
        "text": "cười",
        "startMs": 44720,
        "endMs": 45000
      },
      {
        "text": "là",
        "startMs": 45000,
        "endMs": 45300
      }
    ],
    "highlightKeywords": [
      "buồn cười"
    ]
  },
  {
    "id": 31,
    "startMs": 45300,
    "endMs": 46810,
    "text": "một câu hẹn nghe rất có trách nhiệm",
    "tokens": [
      {
        "text": "một",
        "startMs": 45300,
        "endMs": 45320
      },
      {
        "text": "câu",
        "startMs": 45320,
        "endMs": 45480
      },
      {
        "text": "hẹn",
        "startMs": 45480,
        "endMs": 45730
      },
      {
        "text": "nghe",
        "startMs": 45730,
        "endMs": 45840
      },
      {
        "text": "rất",
        "startMs": 45840,
        "endMs": 46110
      },
      {
        "text": "có",
        "startMs": 46110,
        "endMs": 46160
      },
      {
        "text": "trách",
        "startMs": 46160,
        "endMs": 46400
      },
      {
        "text": "nhiệm",
        "startMs": 46400,
        "endMs": 46810
      }
    ],
    "highlightKeywords": [
      "có trách nhiệm"
    ]
  },
  {
    "id": 32,
    "startMs": 46810,
    "endMs": 48080,
    "text": "tao sẽ  để tao  mai tao",
    "tokens": [
      {
        "text": "tao",
        "startMs": 46810,
        "endMs": 46960
      },
      {
        "text": "sẽ",
        "startMs": 46960,
        "endMs": 47430
      },
      {
        "text": "để",
        "startMs": 47430,
        "endMs": 47490
      },
      {
        "text": "tao",
        "startMs": 47490,
        "endMs": 47730
      },
      {
        "text": "mai",
        "startMs": 47730,
        "endMs": 47880
      },
      {
        "text": "tao",
        "startMs": 47880,
        "endMs": 48080
      }
    ],
    "highlightKeywords": [
      "tao sẽ",
      "mai tao"
    ]
  },
  {
    "id": 33,
    "startMs": 48080,
    "endMs": 50040,
    "text": "nên bạn còn được người khác tin",
    "tokens": [
      {
        "text": "nên",
        "startMs": 48080,
        "endMs": 48230
      },
      {
        "text": "bạn",
        "startMs": 48230,
        "endMs": 48470
      },
      {
        "text": "còn",
        "startMs": 48470,
        "endMs": 48670
      },
      {
        "text": "được",
        "startMs": 48670,
        "endMs": 49060
      },
      {
        "text": "người",
        "startMs": 49060,
        "endMs": 49450
      },
      {
        "text": "khác",
        "startMs": 49450,
        "endMs": 49690
      },
      {
        "text": "tin",
        "startMs": 49690,
        "endMs": 50040
      }
    ],
    "highlightKeywords": [
      "được tin"
    ]
  },
  {
    "id": 34,
    "startMs": 50040,
    "endMs": 52050,
    "text": "là người chu đáo  đáng tin cậy",
    "tokens": [
      {
        "text": "là",
        "startMs": 50040,
        "endMs": 50120
      },
      {
        "text": "người",
        "startMs": 50120,
        "endMs": 50360
      },
      {
        "text": "chu",
        "startMs": 50360,
        "endMs": 50520
      },
      {
        "text": "đáo",
        "startMs": 50520,
        "endMs": 50930
      },
      {
        "text": "đáng",
        "startMs": 50930,
        "endMs": 51220
      },
      {
        "text": "tin",
        "startMs": 51220,
        "endMs": 51410
      },
      {
        "text": "cậy",
        "startMs": 51410,
        "endMs": 52000
      }
    ],
    "highlightKeywords": [
      "chu đáo",
      "đáng tin cậy"
    ]
  },
  {
    "id": 35,
    "startMs": 52080,
    "endMs": 52930,
    "text": "Trong khi thực chất",
    "tokens": [
      {
        "text": "Trong",
        "startMs": 52080,
        "endMs": 52200
      },
      {
        "text": "khi",
        "startMs": 52200,
        "endMs": 52320
      },
      {
        "text": "thực",
        "startMs": 52320,
        "endMs": 52570
      },
      {
        "text": "chất",
        "startMs": 52570,
        "endMs": 52930
      }
    ],
    "highlightKeywords": [
      "thực chất"
    ]
  },
  {
    "id": 36,
    "startMs": 52930,
    "endMs": 54350,
    "text": "câu nói đó chỉ đang mua thời gian",
    "tokens": [
      {
        "text": "câu",
        "startMs": 52930,
        "endMs": 53060
      },
      {
        "text": "nói",
        "startMs": 53060,
        "endMs": 53230
      },
      {
        "text": "đó",
        "startMs": 53230,
        "endMs": 53400
      },
      {
        "text": "chỉ",
        "startMs": 53400,
        "endMs": 53630
      },
      {
        "text": "đang",
        "startMs": 53630,
        "endMs": 53820
      },
      {
        "text": "mua",
        "startMs": 53820,
        "endMs": 53940
      },
      {
        "text": "thời",
        "startMs": 53940,
        "endMs": 54190
      },
      {
        "text": "gian",
        "startMs": 54190,
        "endMs": 54350
      }
    ],
    "highlightKeywords": [
      "mua thời gian"
    ]
  },
  {
    "id": 37,
    "startMs": 54350,
    "endMs": 56140,
    "text": "để trì hoãn thêm một nhịp nữa",
    "tokens": [
      {
        "text": "để",
        "startMs": 54350,
        "endMs": 54630
      },
      {
        "text": "trì",
        "startMs": 54630,
        "endMs": 54770
      },
      {
        "text": "hoãn",
        "startMs": 54770,
        "endMs": 54970
      },
      {
        "text": "thêm",
        "startMs": 54970,
        "endMs": 55180
      },
      {
        "text": "một",
        "startMs": 55180,
        "endMs": 55400
      },
      {
        "text": "nhịp",
        "startMs": 55400,
        "endMs": 55660
      },
      {
        "text": "nữa",
        "startMs": 55660,
        "endMs": 56140
      }
    ],
    "highlightKeywords": [
      "trì hoãn thêm"
    ]
  },
  {
    "id": 38,
    "startMs": 56140,
    "endMs": 56970,
    "text": "Cách nhận diện",
    "tokens": [
      {
        "text": "Cách",
        "startMs": 56140,
        "endMs": 56370
      },
      {
        "text": "nhận",
        "startMs": 56370,
        "endMs": 56600
      },
      {
        "text": "diện",
        "startMs": 56600,
        "endMs": 56970
      }
    ],
    "highlightKeywords": [
      "Cách nhận diện"
    ]
  },
  {
    "id": 39,
    "startMs": 56970,
    "endMs": 59500,
    "text": "nếu bạn thấy mình nói để mai  lát  tuần sau tính",
    "tokens": [
      {
        "text": "nếu",
        "startMs": 56970,
        "endMs": 57140
      },
      {
        "text": "bạn",
        "startMs": 57140,
        "endMs": 57350
      },
      {
        "text": "thấy",
        "startMs": 57350,
        "endMs": 57600
      },
      {
        "text": "mình",
        "startMs": 57600,
        "endMs": 57810
      },
      {
        "text": "nói",
        "startMs": 57810,
        "endMs": 57980
      },
      {
        "text": "để",
        "startMs": 57980,
        "endMs": 58190
      },
      {
        "text": "mai",
        "startMs": 58190,
        "endMs": 58550
      },
      {
        "text": "lát",
        "startMs": 58550,
        "endMs": 58910
      },
      {
        "text": "tuần",
        "startMs": 58910,
        "endMs": 59290
      },
      {
        "text": "sau",
        "startMs": 59290,
        "endMs": 59330
      },
      {
        "text": "tính",
        "startMs": 59330,
        "endMs": 59500
      }
    ],
    "highlightKeywords": [
      "để mai",
      "tuần sau tính"
    ]
  },
  {
    "id": 40,
    "startMs": 59500,
    "endMs": 61600,
    "text": "về cùng một việc từ 2 lần trở lên",
    "tokens": [
      {
        "text": "về",
        "startMs": 59500,
        "endMs": 59720
      },
      {
        "text": "cùng",
        "startMs": 59720,
        "endMs": 59880
      },
      {
        "text": "một",
        "startMs": 59880,
        "endMs": 60090
      },
      {
        "text": "việc",
        "startMs": 60090,
        "endMs": 60340
      },
      {
        "text": "từ",
        "startMs": 60340,
        "endMs": 60510
      },
      {
        "text": "2",
        "startMs": 60510,
        "endMs": 60650
      },
      {
        "text": "lần",
        "startMs": 60650,
        "endMs": 60850
      },
      {
        "text": "trở",
        "startMs": 60850,
        "endMs": 61380
      },
      {
        "text": "lên",
        "startMs": 61380,
        "endMs": 61600
      }
    ],
    "highlightKeywords": [
      "từ 2 lần trở lên"
    ]
  },
  {
    "id": 41,
    "startMs": 61380,
    "endMs": 63570,
    "text": "mà chưa từng thử làm ngay dù chỉ 5 phút",
    "tokens": [
      {
        "text": "mà",
        "startMs": 61380,
        "endMs": 61510
      },
      {
        "text": "chưa",
        "startMs": 61510,
        "endMs": 61770
      },
      {
        "text": "từng",
        "startMs": 61770,
        "endMs": 62010
      },
      {
        "text": "thử",
        "startMs": 62010,
        "endMs": 62230
      },
      {
        "text": "làm",
        "startMs": 62230,
        "endMs": 62410
      },
      {
        "text": "ngay",
        "startMs": 62410,
        "endMs": 62680
      },
      {
        "text": "dù",
        "startMs": 62680,
        "endMs": 62810
      },
      {
        "text": "chỉ",
        "startMs": 62810,
        "endMs": 63040
      },
      {
        "text": "5",
        "startMs": 63040,
        "endMs": 63200
      },
      {
        "text": "phút",
        "startMs": 63200,
        "endMs": 63570
      }
    ],
    "highlightKeywords": [
      "làm ngay dù chỉ 5 phút"
    ]
  },
  {
    "id": 42,
    "startMs": 63570,
    "endMs": 65210,
    "text": "thì bạn không đang lên kế hoạch",
    "tokens": [
      {
        "text": "thì",
        "startMs": 63570,
        "endMs": 63690
      },
      {
        "text": "bạn",
        "startMs": 63690,
        "endMs": 63800
      },
      {
        "text": "không",
        "startMs": 63800,
        "endMs": 64070
      },
      {
        "text": "đang",
        "startMs": 64070,
        "endMs": 64300
      },
      {
        "text": "lên",
        "startMs": 64300,
        "endMs": 64480
      },
      {
        "text": "kế",
        "startMs": 64480,
        "endMs": 64650
      },
      {
        "text": "hoạch",
        "startMs": 64650,
        "endMs": 65210
      }
    ],
    "highlightKeywords": [
      "không lên kế hoạch"
    ]
  },
  {
    "id": 43,
    "startMs": 65210,
    "endMs": 66780,
    "text": "bạn đang trốn việc bằng lời hứa",
    "tokens": [
      {
        "text": "bạn",
        "startMs": 65210,
        "endMs": 65370
      },
      {
        "text": "đang",
        "startMs": 65370,
        "endMs": 65570
      },
      {
        "text": "trốn",
        "startMs": 65570,
        "endMs": 65780
      },
      {
        "text": "việc",
        "startMs": 65780,
        "endMs": 66010
      },
      {
        "text": "bằng",
        "startMs": 66010,
        "endMs": 66230
      },
      {
        "text": "lời",
        "startMs": 66230,
        "endMs": 66410
      },
      {
        "text": "hứa",
        "startMs": 66410,
        "endMs": 66780
      }
    ],
    "highlightKeywords": [
      "trốn việc",
      "lời hứa"
    ]
  },
  {
    "id": 44,
    "startMs": 66780,
    "endMs": 68060,
    "text": "Cách thoát rất đơn giản",
    "tokens": [
      {
        "text": "Cách",
        "startMs": 66780,
        "endMs": 67050
      },
      {
        "text": "thoát",
        "startMs": 67050,
        "endMs": 67280
      },
      {
        "text": "rất",
        "startMs": 67280,
        "endMs": 67480
      },
      {
        "text": "đơn",
        "startMs": 67480,
        "endMs": 67700
      },
      {
        "text": "giản",
        "startMs": 67700,
        "endMs": 68060
      }
    ],
    "highlightKeywords": [
      "rất đơn giản"
    ]
  },
  {
    "id": 45,
    "startMs": 68060,
    "endMs": 70670,
    "text": "đừng hẹn làm  làm ngay phần nhỏ nhất có thể lúc này",
    "tokens": [
      {
        "text": "đừng",
        "startMs": 68060,
        "endMs": 68370
      },
      {
        "text": "hẹn",
        "startMs": 68370,
        "endMs": 68580
      },
      {
        "text": "làm",
        "startMs": 68580,
        "endMs": 68850
      },
      {
        "text": "làm",
        "startMs": 68850,
        "endMs": 69030
      },
      {
        "text": "ngay",
        "startMs": 69030,
        "endMs": 69230
      },
      {
        "text": "phần",
        "startMs": 69230,
        "endMs": 69480
      },
      {
        "text": "nhỏ",
        "startMs": 69480,
        "endMs": 69750
      },
      {
        "text": "nhất",
        "startMs": 69750,
        "endMs": 69970
      },
      {
        "text": "có",
        "startMs": 69970,
        "endMs": 70100
      },
      {
        "text": "thể",
        "startMs": 70100,
        "endMs": 70320
      },
      {
        "text": "lúc",
        "startMs": 70320,
        "endMs": 70540
      },
      {
        "text": "này",
        "startMs": 70540,
        "endMs": 70670
      }
    ],
    "highlightKeywords": [
      "đừng hẹn làm",
      "làm ngay"
    ]
  },
  {
    "id": 46,
    "startMs": 70670,
    "endMs": 71860,
    "text": "Không có để mai",
    "tokens": [
      {
        "text": "Không",
        "startMs": 70670,
        "endMs": 71140
      },
      {
        "text": "có",
        "startMs": 71140,
        "endMs": 71450
      },
      {
        "text": "để",
        "startMs": 71450,
        "endMs": 71600
      },
      {
        "text": "mai",
        "startMs": 71600,
        "endMs": 71860
      }
    ],
    "highlightKeywords": [
      "Không có để mai"
    ]
  },
  {
    "id": 47,
    "startMs": 71860,
    "endMs": 74350,
    "text": "chỉ có làm luôn 5 phút  xong tính tiếp",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 71860,
        "endMs": 72290
      },
      {
        "text": "có",
        "startMs": 72290,
        "endMs": 72370
      },
      {
        "text": "làm",
        "startMs": 72370,
        "endMs": 72520
      },
      {
        "text": "luôn",
        "startMs": 72520,
        "endMs": 72720
      },
      {
        "text": "5",
        "startMs": 72720,
        "endMs": 72980
      },
      {
        "text": "phút",
        "startMs": 72980,
        "endMs": 73160
      },
      {
        "text": "xong",
        "startMs": 73160,
        "endMs": 73480
      },
      {
        "text": "tính",
        "startMs": 73480,
        "endMs": 73790
      },
      {
        "text": "tiếp",
        "startMs": 73790,
        "endMs": 74350
      }
    ],
    "highlightKeywords": [
      "làm luôn 5 phút",
      "xong tính tiếp"
    ]
  },
  {
    "id": 48,
    "startMs": 74350,
    "endMs": 75780,
    "text": "Hẹn không phải là làm",
    "tokens": [
      {
        "text": "Hẹn",
        "startMs": 74350,
        "endMs": 74450
      },
      {
        "text": "không",
        "startMs": 74450,
        "endMs": 74700
      },
      {
        "text": "phải",
        "startMs": 74700,
        "endMs": 75010
      },
      {
        "text": "là",
        "startMs": 75010,
        "endMs": 75520
      },
      {
        "text": "làm",
        "startMs": 75520,
        "endMs": 75780
      }
    ],
    "highlightKeywords": [
      "Hẹn không phải là làm"
    ]
  },
  {
    "id": 49,
    "startMs": 75780,
    "endMs": 77360,
    "text": "Nói ra không xóa được việc",
    "tokens": [
      {
        "text": "Nói",
        "startMs": 75780,
        "endMs": 75980
      },
      {
        "text": "ra",
        "startMs": 75980,
        "endMs": 76070
      },
      {
        "text": "không",
        "startMs": 76070,
        "endMs": 76390
      },
      {
        "text": "xóa",
        "startMs": 76390,
        "endMs": 76640
      },
      {
        "text": "được",
        "startMs": 76640,
        "endMs": 77050
      },
      {
        "text": "việc",
        "startMs": 77050,
        "endMs": 77360
      }
    ],
    "highlightKeywords": [
      "Nói ra không xóa được"
    ]
  },
  {
    "id": 50,
    "startMs": 77360,
    "endMs": 79470,
    "text": "còn dang dở trong thực tế",
    "tokens": [
      {
        "text": "còn",
        "startMs": 77360,
        "endMs": 77550
      },
      {
        "text": "dang",
        "startMs": 77550,
        "endMs": 77820
      },
      {
        "text": "dở",
        "startMs": 77820,
        "endMs": 78010
      },
      {
        "text": "trong",
        "startMs": 78010,
        "endMs": 78290
      },
      {
        "text": "thực",
        "startMs": 78290,
        "endMs": 78370
      },
      {
        "text": "tế",
        "startMs": 78370,
        "endMs": 79020
      }
    ],
    "highlightKeywords": [
      "dang dở trong thực tế"
    ]
  }
];
