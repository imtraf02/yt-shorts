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

export const qinSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "scene": 1,
    "startMs": 30,
    "endMs": 1600,
    "text": "Tần Thủy Hoàng là vị hoàng đế đầu tiên",
    "tokens": [
      {
        "text": "Tần",
        "startMs": 30,
        "endMs": 140
      },
      {
        "text": "Thủy",
        "startMs": 140,
        "endMs": 350
      },
      {
        "text": "Hoàng",
        "startMs": 350,
        "endMs": 560
      },
      {
        "text": "là",
        "startMs": 560,
        "endMs": 670
      },
      {
        "text": "vị",
        "startMs": 670,
        "endMs": 810
      },
      {
        "text": "hoàng",
        "startMs": 810,
        "endMs": 1020
      },
      {
        "text": "đế",
        "startMs": 1020,
        "endMs": 1200
      },
      {
        "text": "đầu",
        "startMs": 1200,
        "endMs": 1420
      },
      {
        "text": "tiên",
        "startMs": 1420,
        "endMs": 1600
      }
    ],
    "highlightKeywords": [
      "Tần Thủy Hoàng",
      "hoàng đế đầu tiên"
    ]
  },
  {
    "id": 1,
    "scene": 1,
    "startMs": 1600,
    "endMs": 2530,
    "text": "thống nhất Trung Hoa,",
    "tokens": [
      {
        "text": "thống",
        "startMs": 1600,
        "endMs": 1850
      },
      {
        "text": "nhất",
        "startMs": 1850,
        "endMs": 2070
      },
      {
        "text": "Trung",
        "startMs": 2070,
        "endMs": 2320
      },
      {
        "text": "Hoa",
        "startMs": 2320,
        "endMs": 2530
      }
    ],
    "highlightKeywords": [
      "thống nhất Trung Hoa"
    ]
  },
  {
    "id": 2,
    "scene": 1,
    "startMs": 2530,
    "endMs": 3920,
    "text": "người đặt nền móng cho cả một đế chế",
    "tokens": [
      {
        "text": "người",
        "startMs": 2530,
        "endMs": 2740
      },
      {
        "text": "đặt",
        "startMs": 2740,
        "endMs": 2920
      },
      {
        "text": "nền",
        "startMs": 2920,
        "endMs": 3040
      },
      {
        "text": "móng",
        "startMs": 3040,
        "endMs": 3240
      },
      {
        "text": "cho",
        "startMs": 3240,
        "endMs": 3340
      },
      {
        "text": "cả",
        "startMs": 3340,
        "endMs": 3480
      },
      {
        "text": "một",
        "startMs": 3480,
        "endMs": 3760
      },
      {
        "text": "đế",
        "startMs": 3760,
        "endMs": 3830
      },
      {
        "text": "chế",
        "startMs": 3830,
        "endMs": 3920
      }
    ],
    "highlightKeywords": [
      "đặt nền móng",
      "đế chế"
    ]
  },
  {
    "id": 3,
    "scene": 1,
    "startMs": 3920,
    "endMs": 5880,
    "text": "kéo dài hơn 2000 năm sau đó.",
    "tokens": [
      {
        "text": "kéo",
        "startMs": 3920,
        "endMs": 4120
      },
      {
        "text": "dài",
        "startMs": 4120,
        "endMs": 4320
      },
      {
        "text": "hơn",
        "startMs": 4320,
        "endMs": 4520
      },
      {
        "text": "2000",
        "startMs": 4520,
        "endMs": 4820
      },
      {
        "text": "năm",
        "startMs": 4820,
        "endMs": 5120
      },
      {
        "text": "sau",
        "startMs": 5120,
        "endMs": 5270
      },
      {
        "text": "đó",
        "startMs": 5270,
        "endMs": 5880
      }
    ],
    "highlightKeywords": [
      "hơn 2000 năm"
    ]
  },
  {
    "id": 4,
    "scene": 2,
    "startMs": 5880,
    "endMs": 7430,
    "text": "Nhưng nỗi ám ảnh lớn nhất đời ông",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 5880,
        "endMs": 6130
      },
      {
        "text": "nỗi",
        "startMs": 6130,
        "endMs": 6280
      },
      {
        "text": "ám",
        "startMs": 6280,
        "endMs": 6380
      },
      {
        "text": "ảnh",
        "startMs": 6380,
        "endMs": 6570
      },
      {
        "text": "lớn",
        "startMs": 6570,
        "endMs": 6740
      },
      {
        "text": "nhất",
        "startMs": 6740,
        "endMs": 7040
      },
      {
        "text": "đời",
        "startMs": 7040,
        "endMs": 7410
      },
      {
        "text": "ông",
        "startMs": 7410,
        "endMs": 7430
      }
    ],
    "highlightKeywords": [
      "nỗi ám ảnh lớn nhất"
    ]
  },
  {
    "id": 5,
    "scene": 2,
    "startMs": 7430,
    "endMs": 9460,
    "text": "lại không phải chinh chiến hay quyền lực",
    "tokens": [
      {
        "text": "lại",
        "startMs": 7430,
        "endMs": 7600
      },
      {
        "text": "không",
        "startMs": 7600,
        "endMs": 7830
      },
      {
        "text": "phải",
        "startMs": 7830,
        "endMs": 8060
      },
      {
        "text": "chinh",
        "startMs": 8060,
        "endMs": 8270
      },
      {
        "text": "chiến",
        "startMs": 8270,
        "endMs": 8500
      },
      {
        "text": "hay",
        "startMs": 8500,
        "endMs": 8610
      },
      {
        "text": "quyền",
        "startMs": 8610,
        "endMs": 8870
      },
      {
        "text": "lực",
        "startMs": 8870,
        "endMs": 9460
      }
    ],
    "highlightKeywords": [
      "chinh chiến",
      "quyền lực"
    ]
  },
  {
    "id": 6,
    "scene": 2,
    "startMs": 9460,
    "endMs": 11050,
    "text": "mà là... cái chết.",
    "tokens": [
      {
        "text": "mà",
        "startMs": 9460,
        "endMs": 9740
      },
      {
        "text": "là",
        "startMs": 9740,
        "endMs": 9780
      },
      {
        "text": "cái",
        "startMs": 9780,
        "endMs": 10440
      },
      {
        "text": "chết",
        "startMs": 10440,
        "endMs": 11050
      }
    ],
    "highlightKeywords": [
      "cái chết"
    ]
  },
  {
    "id": 7,
    "scene": 3,
    "startMs": 11050,
    "endMs": 12180,
    "text": "Ông sợ chết đến mức điên cuồng",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 11050,
        "endMs": 11130
      },
      {
        "text": "sợ",
        "startMs": 11130,
        "endMs": 11280
      },
      {
        "text": "chết",
        "startMs": 11280,
        "endMs": 11560
      },
      {
        "text": "đến",
        "startMs": 11560,
        "endMs": 11730
      },
      {
        "text": "mức",
        "startMs": 11730,
        "endMs": 11860
      },
      {
        "text": "điên",
        "startMs": 11860,
        "endMs": 12030
      },
      {
        "text": "cuồng",
        "startMs": 12030,
        "endMs": 12180
      }
    ],
    "highlightKeywords": [
      "sợ chết",
      "điên cuồng"
    ]
  },
  {
    "id": 8,
    "scene": 3,
    "startMs": 12180,
    "endMs": 13590,
    "text": "tìm kiếm thuốc trường sinh bất tử",
    "tokens": [
      {
        "text": "tìm",
        "startMs": 12180,
        "endMs": 12270
      },
      {
        "text": "kiếm",
        "startMs": 12270,
        "endMs": 12430
      },
      {
        "text": "thuốc",
        "startMs": 12430,
        "endMs": 12610
      },
      {
        "text": "trường",
        "startMs": 12610,
        "endMs": 12960
      },
      {
        "text": "sinh",
        "startMs": 12960,
        "endMs": 13120
      },
      {
        "text": "bất",
        "startMs": 13120,
        "endMs": 13330
      },
      {
        "text": "tử",
        "startMs": 13330,
        "endMs": 13590
      }
    ],
    "highlightKeywords": [
      "thuốc trường sinh bất tử"
    ]
  },
  {
    "id": 9,
    "scene": 3,
    "startMs": 13590,
    "endMs": 15280,
    "text": "suốt phần lớn cuộc đời làm hoàng đế.",
    "tokens": [
      {
        "text": "suốt",
        "startMs": 13590,
        "endMs": 13730
      },
      {
        "text": "phần",
        "startMs": 13730,
        "endMs": 13940
      },
      {
        "text": "lớn",
        "startMs": 13940,
        "endMs": 14110
      },
      {
        "text": "cuộc",
        "startMs": 14110,
        "endMs": 14320
      },
      {
        "text": "đời",
        "startMs": 14320,
        "endMs": 14530
      },
      {
        "text": "làm",
        "startMs": 14530,
        "endMs": 14670
      },
      {
        "text": "hoàng",
        "startMs": 14670,
        "endMs": 14880
      },
      {
        "text": "đế",
        "startMs": 14880,
        "endMs": 15280
      }
    ],
    "highlightKeywords": [
      "suốt cuộc đời",
      "hoàng đế"
    ]
  },
  {
    "id": 10,
    "scene": 4,
    "startMs": 15280,
    "endMs": 16620,
    "text": "Ông cử hàng ngàn người,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 15280,
        "endMs": 15440
      },
      {
        "text": "cử",
        "startMs": 15440,
        "endMs": 15640
      },
      {
        "text": "hàng",
        "startMs": 15640,
        "endMs": 15840
      },
      {
        "text": "ngàn",
        "startMs": 15840,
        "endMs": 16040
      },
      {
        "text": "người",
        "startMs": 16040,
        "endMs": 16620
      }
    ],
    "highlightKeywords": [
      "hàng ngàn người"
    ]
  },
  {
    "id": 11,
    "scene": 4,
    "startMs": 16620,
    "endMs": 17770,
    "text": "trong đó có cả đoàn thám hiểm",
    "tokens": [
      {
        "text": "trong",
        "startMs": 16620,
        "endMs": 16650
      },
      {
        "text": "đó",
        "startMs": 16650,
        "endMs": 16810
      },
      {
        "text": "có",
        "startMs": 16810,
        "endMs": 16930
      },
      {
        "text": "cả",
        "startMs": 16930,
        "endMs": 17110
      },
      {
        "text": "đoàn",
        "startMs": 17110,
        "endMs": 17330
      },
      {
        "text": "thám",
        "startMs": 17330,
        "endMs": 17530
      },
      {
        "text": "hiểm",
        "startMs": 17530,
        "endMs": 17770
      }
    ],
    "highlightKeywords": [
      "đoàn thám hiểm"
    ]
  },
  {
    "id": 12,
    "scene": 4,
    "startMs": 17770,
    "endMs": 19150,
    "text": "hàng trăm nam nữ thanh niên,",
    "tokens": [
      {
        "text": "hàng",
        "startMs": 17770,
        "endMs": 17970
      },
      {
        "text": "trăm",
        "startMs": 17970,
        "endMs": 18170
      },
      {
        "text": "nam",
        "startMs": 18170,
        "endMs": 18330
      },
      {
        "text": "nữ",
        "startMs": 18330,
        "endMs": 18520
      },
      {
        "text": "thanh",
        "startMs": 18520,
        "endMs": 18690
      },
      {
        "text": "niên",
        "startMs": 18690,
        "endMs": 19150
      }
    ],
    "highlightKeywords": [
      "nam nữ thanh niên"
    ]
  },
  {
    "id": 13,
    "scene": 4,
    "startMs": 19150,
    "endMs": 20560,
    "text": "ra khơi tìm 'tiên đảo' huyền thoại",
    "tokens": [
      {
        "text": "ra",
        "startMs": 19150,
        "endMs": 19190
      },
      {
        "text": "khơi",
        "startMs": 19190,
        "endMs": 19380
      },
      {
        "text": "tìm",
        "startMs": 19380,
        "endMs": 19540
      },
      {
        "text": "tiên",
        "startMs": 19540,
        "endMs": 19720
      },
      {
        "text": "đảo",
        "startMs": 19720,
        "endMs": 19940
      },
      {
        "text": "huyền",
        "startMs": 19940,
        "endMs": 20210
      },
      {
        "text": "thoại",
        "startMs": 20210,
        "endMs": 20560
      }
    ],
    "highlightKeywords": [
      "tiên đảo huyền thoại"
    ]
  },
  {
    "id": 14,
    "scene": 4,
    "startMs": 20560,
    "endMs": 21540,
    "text": "để lấy linh dược —",
    "tokens": [
      {
        "text": "để",
        "startMs": 20560,
        "endMs": 20670
      },
      {
        "text": "lấy",
        "startMs": 20670,
        "endMs": 20860
      },
      {
        "text": "linh",
        "startMs": 20860,
        "endMs": 21010
      },
      {
        "text": "dược",
        "startMs": 21010,
        "endMs": 21540
      }
    ],
    "highlightKeywords": [
      "linh dược"
    ]
  },
  {
    "id": 15,
    "scene": 4,
    "startMs": 21540,
    "endMs": 23580,
    "text": "và không ai trong số họ từng quay trở lại.",
    "tokens": [
      {
        "text": "và",
        "startMs": 21540,
        "endMs": 21610
      },
      {
        "text": "không",
        "startMs": 21610,
        "endMs": 21870
      },
      {
        "text": "ai",
        "startMs": 21870,
        "endMs": 21950
      },
      {
        "text": "trong",
        "startMs": 21950,
        "endMs": 22170
      },
      {
        "text": "số",
        "startMs": 22170,
        "endMs": 22340
      },
      {
        "text": "họ",
        "startMs": 22340,
        "endMs": 22670
      },
      {
        "text": "từng",
        "startMs": 22670,
        "endMs": 22760
      },
      {
        "text": "quay",
        "startMs": 22760,
        "endMs": 22920
      },
      {
        "text": "trở",
        "startMs": 22920,
        "endMs": 23120
      },
      {
        "text": "lại",
        "startMs": 23120,
        "endMs": 23580
      }
    ],
    "highlightKeywords": [
      "không ai",
      "quay trở lại"
    ]
  },
  {
    "id": 16,
    "scene": 5,
    "startMs": 23660,
    "endMs": 25090,
    "text": "Trớ trêu thay, chính nỗi sợ chết",
    "tokens": [
      {
        "text": "Trớ",
        "startMs": 23660,
        "endMs": 23780
      },
      {
        "text": "trêu",
        "startMs": 23780,
        "endMs": 23980
      },
      {
        "text": "thay",
        "startMs": 23980,
        "endMs": 24220
      },
      {
        "text": "chính",
        "startMs": 24220,
        "endMs": 24510
      },
      {
        "text": "nỗi",
        "startMs": 24510,
        "endMs": 24680
      },
      {
        "text": "sợ",
        "startMs": 24680,
        "endMs": 24840
      },
      {
        "text": "chết",
        "startMs": 24840,
        "endMs": 25090
      }
    ],
    "highlightKeywords": [
      "Trớ trêu thay",
      "nỗi sợ chết"
    ]
  },
  {
    "id": 17,
    "scene": 5,
    "startMs": 25090,
    "endMs": 26090,
    "text": "đó lại giết chết ông.",
    "tokens": [
      {
        "text": "đó",
        "startMs": 25090,
        "endMs": 25300
      },
      {
        "text": "lại",
        "startMs": 25300,
        "endMs": 25470
      },
      {
        "text": "giết",
        "startMs": 25470,
        "endMs": 25640
      },
      {
        "text": "chết",
        "startMs": 25640,
        "endMs": 25820
      },
      {
        "text": "ông",
        "startMs": 25820,
        "endMs": 26090
      }
    ],
    "highlightKeywords": [
      "giết chết ông"
    ]
  },
  {
    "id": 18,
    "scene": 5,
    "startMs": 26090,
    "endMs": 27360,
    "text": "Để tìm thuốc trường sinh,",
    "tokens": [
      {
        "text": "Để",
        "startMs": 26090,
        "endMs": 26340
      },
      {
        "text": "tìm",
        "startMs": 26340,
        "endMs": 26460
      },
      {
        "text": "thuốc",
        "startMs": 26460,
        "endMs": 26750
      },
      {
        "text": "trường",
        "startMs": 26750,
        "endMs": 27120
      },
      {
        "text": "sinh",
        "startMs": 27120,
        "endMs": 27360
      }
    ],
    "highlightKeywords": [
      "thuốc trường sinh"
    ]
  },
  {
    "id": 19,
    "scene": 5,
    "startMs": 27360,
    "endMs": 28580,
    "text": "các ngự y đã cho ông uống",
    "tokens": [
      {
        "text": "các",
        "startMs": 27360,
        "endMs": 27530
      },
      {
        "text": "ngự",
        "startMs": 27530,
        "endMs": 27770
      },
      {
        "text": "y",
        "startMs": 27770,
        "endMs": 28010
      },
      {
        "text": "đã",
        "startMs": 28010,
        "endMs": 28040
      },
      {
        "text": "cho",
        "startMs": 28040,
        "endMs": 28160
      },
      {
        "text": "ông",
        "startMs": 28160,
        "endMs": 28330
      },
      {
        "text": "uống",
        "startMs": 28330,
        "endMs": 28580
      }
    ],
    "highlightKeywords": [
      "ngự y"
    ]
  },
  {
    "id": 20,
    "scene": 5,
    "startMs": 28580,
    "endMs": 30610,
    "text": "những viên thuốc chứa thủy ngân,",
    "tokens": [
      {
        "text": "những",
        "startMs": 28580,
        "endMs": 28890
      },
      {
        "text": "viên",
        "startMs": 28890,
        "endMs": 29070
      },
      {
        "text": "thuốc",
        "startMs": 29070,
        "endMs": 29360
      },
      {
        "text": "chứa",
        "startMs": 29360,
        "endMs": 29680
      },
      {
        "text": "thủy",
        "startMs": 29680,
        "endMs": 29930
      },
      {
        "text": "ngân",
        "startMs": 29930,
        "endMs": 30610
      }
    ],
    "highlightKeywords": [
      "viên thuốc",
      "thủy ngân"
    ]
  },
  {
    "id": 21,
    "scene": 5,
    "startMs": 30610,
    "endMs": 32600,
    "text": "tin rằng thứ kim loại lỏng lánh bạc đó",
    "tokens": [
      {
        "text": "tin",
        "startMs": 30610,
        "endMs": 30650
      },
      {
        "text": "rằng",
        "startMs": 30650,
        "endMs": 30890
      },
      {
        "text": "thứ",
        "startMs": 30890,
        "endMs": 31120
      },
      {
        "text": "kim",
        "startMs": 31120,
        "endMs": 31260
      },
      {
        "text": "loại",
        "startMs": 31260,
        "endMs": 31550
      },
      {
        "text": "lỏng",
        "startMs": 31550,
        "endMs": 31770
      },
      {
        "text": "lánh",
        "startMs": 31770,
        "endMs": 32000
      },
      {
        "text": "bạc",
        "startMs": 32000,
        "endMs": 32220
      },
      {
        "text": "đó",
        "startMs": 32220,
        "endMs": 32600
      }
    ],
    "highlightKeywords": [
      "kim loại lỏng",
      "lánh bạc"
    ]
  },
  {
    "id": 22,
    "scene": 5,
    "startMs": 32600,
    "endMs": 33670,
    "text": "mang lại sự bất tử.",
    "tokens": [
      {
        "text": "mang",
        "startMs": 32600,
        "endMs": 32600
      },
      {
        "text": "lại",
        "startMs": 32600,
        "endMs": 32830
      },
      {
        "text": "sự",
        "startMs": 32830,
        "endMs": 33010
      },
      {
        "text": "bất",
        "startMs": 33010,
        "endMs": 33290
      },
      {
        "text": "tử",
        "startMs": 33290,
        "endMs": 33670
      }
    ],
    "highlightKeywords": [
      "sự bất tử"
    ]
  },
  {
    "id": 23,
    "scene": 6,
    "startMs": 33670,
    "endMs": 35810,
    "text": "Tần Thủy Hoàng qua đời ở tuổi 49",
    "tokens": [
      {
        "text": "Tần",
        "startMs": 33670,
        "endMs": 33820
      },
      {
        "text": "Thủy",
        "startMs": 33820,
        "endMs": 34120
      },
      {
        "text": "Hoàng",
        "startMs": 34120,
        "endMs": 34430
      },
      {
        "text": "qua",
        "startMs": 34430,
        "endMs": 34580
      },
      {
        "text": "đời",
        "startMs": 34580,
        "endMs": 34890
      },
      {
        "text": "ở",
        "startMs": 34890,
        "endMs": 35040
      },
      {
        "text": "tuổi",
        "startMs": 35040,
        "endMs": 35350
      },
      {
        "text": "49",
        "startMs": 35350,
        "endMs": 35810
      }
    ],
    "highlightKeywords": [
      "qua đời",
      "tuổi 49"
    ]
  },
  {
    "id": 24,
    "scene": 6,
    "startMs": 35810,
    "endMs": 37100,
    "text": "vì chính ngộ độc thủy ngân —",
    "tokens": [
      {
        "text": "vì",
        "startMs": 35810,
        "endMs": 35910
      },
      {
        "text": "chính",
        "startMs": 35910,
        "endMs": 36120
      },
      {
        "text": "ngộ",
        "startMs": 36120,
        "endMs": 36290
      },
      {
        "text": "độc",
        "startMs": 36290,
        "endMs": 36490
      },
      {
        "text": "thủy",
        "startMs": 36490,
        "endMs": 36770
      },
      {
        "text": "ngân",
        "startMs": 36770,
        "endMs": 37100
      }
    ],
    "highlightKeywords": [
      "ngộ độc thủy ngân"
    ]
  },
  {
    "id": 25,
    "scene": 6,
    "startMs": 37100,
    "endMs": 37990,
    "text": "người sợ chết nhất",
    "tokens": [
      {
        "text": "người",
        "startMs": 37100,
        "endMs": 37400
      },
      {
        "text": "sợ",
        "startMs": 37400,
        "endMs": 37540
      },
      {
        "text": "chết",
        "startMs": 37540,
        "endMs": 37790
      },
      {
        "text": "nhất",
        "startMs": 37790,
        "endMs": 37990
      }
    ],
    "highlightKeywords": [
      "sợ chết nhất"
    ]
  },
  {
    "id": 26,
    "scene": 6,
    "startMs": 37990,
    "endMs": 39310,
    "text": "lại chết vì chính phương thuốc",
    "tokens": [
      {
        "text": "lại",
        "startMs": 37990,
        "endMs": 38190
      },
      {
        "text": "chết",
        "startMs": 38190,
        "endMs": 38510
      },
      {
        "text": "vì",
        "startMs": 38510,
        "endMs": 38580
      },
      {
        "text": "chính",
        "startMs": 38580,
        "endMs": 38740
      },
      {
        "text": "phương",
        "startMs": 38740,
        "endMs": 39040
      },
      {
        "text": "thuốc",
        "startMs": 39040,
        "endMs": 39310
      }
    ],
    "highlightKeywords": [
      "chết vì phương thuốc"
    ]
  },
  {
    "id": 27,
    "scene": 6,
    "startMs": 39310,
    "endMs": 40340,
    "text": "chống lại cái chết.",
    "tokens": [
      {
        "text": "chống",
        "startMs": 39310,
        "endMs": 39560
      },
      {
        "text": "lại",
        "startMs": 39560,
        "endMs": 39750
      },
      {
        "text": "cái",
        "startMs": 39750,
        "endMs": 39900
      },
      {
        "text": "chết",
        "startMs": 39900,
        "endMs": 40340
      }
    ],
    "highlightKeywords": [
      "chống lại cái chết"
    ]
  },
  {
    "id": 28,
    "scene": 7,
    "startMs": 40340,
    "endMs": 41880,
    "text": "Về đội quân đất nung nổi tiếng,",
    "tokens": [
      {
        "text": "Về",
        "startMs": 40340,
        "endMs": 40400
      },
      {
        "text": "đội",
        "startMs": 40400,
        "endMs": 40560
      },
      {
        "text": "quân",
        "startMs": 40560,
        "endMs": 40740
      },
      {
        "text": "đất",
        "startMs": 40740,
        "endMs": 40990
      },
      {
        "text": "nung",
        "startMs": 40990,
        "endMs": 41100
      },
      {
        "text": "nổi",
        "startMs": 41100,
        "endMs": 41280
      },
      {
        "text": "tiếng",
        "startMs": 41280,
        "endMs": 41880
      }
    ],
    "highlightKeywords": [
      "đội quân đất nung"
    ]
  },
  {
    "id": 29,
    "scene": 7,
    "startMs": 41880,
    "endMs": 44240,
    "text": "ít ai biết rằng hơn 8000 bức tượng binh lính đó",
    "tokens": [
      {
        "text": "ít",
        "startMs": 41880,
        "endMs": 42000
      },
      {
        "text": "ai",
        "startMs": 42000,
        "endMs": 42080
      },
      {
        "text": "biết",
        "startMs": 42080,
        "endMs": 42250
      },
      {
        "text": "rằng",
        "startMs": 42250,
        "endMs": 42480
      },
      {
        "text": "hơn",
        "startMs": 42480,
        "endMs": 42640
      },
      {
        "text": "8000",
        "startMs": 42640,
        "endMs": 43240
      },
      {
        "text": "bức",
        "startMs": 43240,
        "endMs": 43440
      },
      {
        "text": "tượng",
        "startMs": 43440,
        "endMs": 43760
      },
      {
        "text": "binh",
        "startMs": 43760,
        "endMs": 43920
      },
      {
        "text": "lính",
        "startMs": 43920,
        "endMs": 44080
      },
      {
        "text": "đó",
        "startMs": 44080,
        "endMs": 44240
      }
    ],
    "highlightKeywords": [
      "hơn 8000 bức tượng"
    ]
  },
  {
    "id": 30,
    "scene": 7,
    "startMs": 44240,
    "endMs": 45980,
    "text": "ban đầu được sơn màu sắc sặc sỡ,",
    "tokens": [
      {
        "text": "ban",
        "startMs": 44240,
        "endMs": 44430
      },
      {
        "text": "đầu",
        "startMs": 44430,
        "endMs": 44600
      },
      {
        "text": "được",
        "startMs": 44600,
        "endMs": 44920
      },
      {
        "text": "sơn",
        "startMs": 44920,
        "endMs": 45080
      },
      {
        "text": "màu",
        "startMs": 45080,
        "endMs": 45240
      },
      {
        "text": "sắc",
        "startMs": 45240,
        "endMs": 45440
      },
      {
        "text": "sặc",
        "startMs": 45440,
        "endMs": 45640
      },
      {
        "text": "sỡ",
        "startMs": 45640,
        "endMs": 45980
      }
    ],
    "highlightKeywords": [
      "sơn màu sắc sặc sỡ"
    ]
  },
  {
    "id": 31,
    "scene": 7,
    "startMs": 46020,
    "endMs": 47390,
    "text": "rực rỡ như người thật,",
    "tokens": [
      {
        "text": "rực",
        "startMs": 46020,
        "endMs": 46180
      },
      {
        "text": "rỡ",
        "startMs": 46180,
        "endMs": 46420
      },
      {
        "text": "như",
        "startMs": 46420,
        "endMs": 46700
      },
      {
        "text": "người",
        "startMs": 46700,
        "endMs": 47100
      },
      {
        "text": "thật",
        "startMs": 47100,
        "endMs": 47390
      }
    ],
    "highlightKeywords": [
      "rực rỡ như người thật"
    ]
  },
  {
    "id": 32,
    "scene": 7,
    "startMs": 47390,
    "endMs": 49020,
    "text": "chứ không phải màu đất nung xám xịt",
    "tokens": [
      {
        "text": "chứ",
        "startMs": 47390,
        "endMs": 47550
      },
      {
        "text": "không",
        "startMs": 47550,
        "endMs": 47780
      },
      {
        "text": "phải",
        "startMs": 47780,
        "endMs": 48020
      },
      {
        "text": "màu",
        "startMs": 48020,
        "endMs": 48180
      },
      {
        "text": "đất",
        "startMs": 48180,
        "endMs": 48420
      },
      {
        "text": "nung",
        "startMs": 48420,
        "endMs": 48580
      },
      {
        "text": "xám",
        "startMs": 48580,
        "endMs": 48780
      },
      {
        "text": "xịt",
        "startMs": 48780,
        "endMs": 49020
      }
    ],
    "highlightKeywords": [
      "đất nung xám xịt"
    ]
  },
  {
    "id": 33,
    "scene": 7,
    "startMs": 49020,
    "endMs": 50300,
    "text": "như chúng ta thấy ngày nay.",
    "tokens": [
      {
        "text": "như",
        "startMs": 49020,
        "endMs": 49180
      },
      {
        "text": "chúng",
        "startMs": 49180,
        "endMs": 49420
      },
      {
        "text": "ta",
        "startMs": 49420,
        "endMs": 49500
      },
      {
        "text": "thấy",
        "startMs": 49500,
        "endMs": 49740
      },
      {
        "text": "ngày",
        "startMs": 49740,
        "endMs": 49940
      },
      {
        "text": "nay",
        "startMs": 49940,
        "endMs": 50300
      }
    ],
    "highlightKeywords": [
      "thấy ngày nay"
    ]
  },
  {
    "id": 34,
    "scene": 8,
    "startMs": 50300,
    "endMs": 50980,
    "text": "Lớp sơn đã phai mờ",
    "tokens": [
      {
        "text": "Lớp",
        "startMs": 50300,
        "endMs": 50340
      },
      {
        "text": "sơn",
        "startMs": 50340,
        "endMs": 50500
      },
      {
        "text": "đã",
        "startMs": 50500,
        "endMs": 50660
      },
      {
        "text": "phai",
        "startMs": 50660,
        "endMs": 50820
      },
      {
        "text": "mờ",
        "startMs": 50820,
        "endMs": 50980
      }
    ],
    "highlightKeywords": [
      "phai mờ"
    ]
  },
  {
    "id": 35,
    "scene": 8,
    "startMs": 50980,
    "endMs": 52020,
    "text": "qua hơn 2000 năm",
    "tokens": [
      {
        "text": "qua",
        "startMs": 50980,
        "endMs": 51100
      },
      {
        "text": "hơn",
        "startMs": 51100,
        "endMs": 51300
      },
      {
        "text": "2000",
        "startMs": 51300,
        "endMs": 51860
      },
      {
        "text": "năm",
        "startMs": 51860,
        "endMs": 52020
      }
    ],
    "highlightKeywords": [
      "hơn 2000 năm"
    ]
  },
  {
    "id": 36,
    "scene": 8,
    "startMs": 52020,
    "endMs": 53220,
    "text": "chôn vùi dưới lòng đất.",
    "tokens": [
      {
        "text": "chôn",
        "startMs": 52020,
        "endMs": 52220
      },
      {
        "text": "vùi",
        "startMs": 52220,
        "endMs": 52340
      },
      {
        "text": "dưới",
        "startMs": 52340,
        "endMs": 52620
      },
      {
        "text": "lòng",
        "startMs": 52620,
        "endMs": 52820
      },
      {
        "text": "đất",
        "startMs": 52820,
        "endMs": 53220
      }
    ],
    "highlightKeywords": [
      "chôn vùi dưới lòng đất"
    ]
  },
  {
    "id": 37,
    "scene": 9,
    "startMs": 53220,
    "endMs": 54540,
    "text": "Tần Thủy Hoàng còn cho xây cả",
    "tokens": [
      {
        "text": "Tần",
        "startMs": 53220,
        "endMs": 53390
      },
      {
        "text": "Thủy",
        "startMs": 53390,
        "endMs": 53600
      },
      {
        "text": "Hoàng",
        "startMs": 53600,
        "endMs": 53850
      },
      {
        "text": "còn",
        "startMs": 53850,
        "endMs": 54020
      },
      {
        "text": "cho",
        "startMs": 54020,
        "endMs": 54150
      },
      {
        "text": "xây",
        "startMs": 54150,
        "endMs": 54320
      },
      {
        "text": "cả",
        "startMs": 54320,
        "endMs": 54540
      }
    ],
    "highlightKeywords": [
      "Tần Thủy Hoàng"
    ]
  },
  {
    "id": 38,
    "scene": 9,
    "startMs": 54540,
    "endMs": 55560,
    "text": "một lăng mộ khổng lồ",
    "tokens": [
      {
        "text": "một",
        "startMs": 54540,
        "endMs": 54700
      },
      {
        "text": "lăng",
        "startMs": 54700,
        "endMs": 54910
      },
      {
        "text": "mộ",
        "startMs": 54910,
        "endMs": 55090
      },
      {
        "text": "khổng",
        "startMs": 55090,
        "endMs": 55370
      },
      {
        "text": "lồ",
        "startMs": 55370,
        "endMs": 55560
      }
    ],
    "highlightKeywords": [
      "lăng mộ khổng lồ"
    ]
  },
  {
    "id": 39,
    "scene": 9,
    "startMs": 55560,
    "endMs": 57600,
    "text": "với sông suối bằng thủy ngân lỏng thật,",
    "tokens": [
      {
        "text": "với",
        "startMs": 55560,
        "endMs": 55750
      },
      {
        "text": "sông",
        "startMs": 55750,
        "endMs": 55960
      },
      {
        "text": "suối",
        "startMs": 55960,
        "endMs": 56340
      },
      {
        "text": "bằng",
        "startMs": 56340,
        "endMs": 56550
      },
      {
        "text": "thủy",
        "startMs": 56550,
        "endMs": 56800
      },
      {
        "text": "ngân",
        "startMs": 56800,
        "endMs": 56990
      },
      {
        "text": "lỏng",
        "startMs": 56990,
        "endMs": 57200
      },
      {
        "text": "thật",
        "startMs": 57200,
        "endMs": 57600
      }
    ],
    "highlightKeywords": [
      "sông suối",
      "thủy ngân lỏng"
    ]
  },
  {
    "id": 40,
    "scene": 9,
    "startMs": 57600,
    "endMs": 59380,
    "text": "mô phỏng lại bản đồ đế chế của mình,",
    "tokens": [
      {
        "text": "mô",
        "startMs": 57600,
        "endMs": 57800
      },
      {
        "text": "phỏng",
        "startMs": 57800,
        "endMs": 57960
      },
      {
        "text": "lại",
        "startMs": 57960,
        "endMs": 58160
      },
      {
        "text": "bản",
        "startMs": 58160,
        "endMs": 58360
      },
      {
        "text": "đồ",
        "startMs": 58360,
        "endMs": 58520
      },
      {
        "text": "đế",
        "startMs": 58520,
        "endMs": 58720
      },
      {
        "text": "chế",
        "startMs": 58720,
        "endMs": 58930
      },
      {
        "text": "của",
        "startMs": 58930,
        "endMs": 59120
      },
      {
        "text": "mình",
        "startMs": 59120,
        "endMs": 59380
      }
    ],
    "highlightKeywords": [
      "mô phỏng bản đồ đế chế"
    ]
  },
  {
    "id": 41,
    "scene": 10,
    "startMs": 59380,
    "endMs": 61340,
    "text": "được thiết kế với bẫy nỏ tự động",
    "tokens": [
      {
        "text": "được",
        "startMs": 59380,
        "endMs": 59840
      },
      {
        "text": "thiết",
        "startMs": 59840,
        "endMs": 60040
      },
      {
        "text": "kế",
        "startMs": 60040,
        "endMs": 60190
      },
      {
        "text": "với",
        "startMs": 60190,
        "endMs": 60360
      },
      {
        "text": "bẫy",
        "startMs": 60360,
        "endMs": 60560
      },
      {
        "text": "nỏ",
        "startMs": 60560,
        "endMs": 60720
      },
      {
        "text": "tự",
        "startMs": 60720,
        "endMs": 60880
      },
      {
        "text": "động",
        "startMs": 60880,
        "endMs": 61340
      }
    ],
    "highlightKeywords": [
      "bẫy nỏ tự động"
    ]
  },
  {
    "id": 42,
    "scene": 10,
    "startMs": 61340,
    "endMs": 62770,
    "text": "để ngăn kẻ trộm mộ xâm nhập.",
    "tokens": [
      {
        "text": "để",
        "startMs": 61340,
        "endMs": 61360
      },
      {
        "text": "ngăn",
        "startMs": 61360,
        "endMs": 61560
      },
      {
        "text": "kẻ",
        "startMs": 61560,
        "endMs": 61720
      },
      {
        "text": "trộm",
        "startMs": 61720,
        "endMs": 61920
      },
      {
        "text": "mộ",
        "startMs": 61920,
        "endMs": 62080
      },
      {
        "text": "xâm",
        "startMs": 62080,
        "endMs": 62240
      },
      {
        "text": "nhập",
        "startMs": 62240,
        "endMs": 62770
      }
    ],
    "highlightKeywords": [
      "kẻ trộm mộ"
    ]
  },
  {
    "id": 43,
    "scene": 10,
    "startMs": 62770,
    "endMs": 63950,
    "text": "Đến nay, các nhà khảo cổ",
    "tokens": [
      {
        "text": "Đến",
        "startMs": 62770,
        "endMs": 62980
      },
      {
        "text": "nay",
        "startMs": 62980,
        "endMs": 63120
      },
      {
        "text": "các",
        "startMs": 63120,
        "endMs": 63430
      },
      {
        "text": "nhà",
        "startMs": 63430,
        "endMs": 63480
      },
      {
        "text": "khảo",
        "startMs": 63480,
        "endMs": 63770
      },
      {
        "text": "cổ",
        "startMs": 63770,
        "endMs": 63950
      }
    ],
    "highlightKeywords": [
      "nhà khảo cổ"
    ]
  },
  {
    "id": 44,
    "scene": 10,
    "startMs": 63950,
    "endMs": 66010,
    "text": "vẫn chưa dám khai quật toàn bộ lăng mộ",
    "tokens": [
      {
        "text": "vẫn",
        "startMs": 63950,
        "endMs": 64170
      },
      {
        "text": "chưa",
        "startMs": 64170,
        "endMs": 64390
      },
      {
        "text": "dám",
        "startMs": 64390,
        "endMs": 64570
      },
      {
        "text": "khai",
        "startMs": 64570,
        "endMs": 64750
      },
      {
        "text": "quật",
        "startMs": 64750,
        "endMs": 65110
      },
      {
        "text": "toàn",
        "startMs": 65110,
        "endMs": 65250
      },
      {
        "text": "bộ",
        "startMs": 65250,
        "endMs": 65450
      },
      {
        "text": "lăng",
        "startMs": 65450,
        "endMs": 65650
      },
      {
        "text": "mộ",
        "startMs": 65650,
        "endMs": 66010
      }
    ],
    "highlightKeywords": [
      "chưa dám khai quật"
    ]
  },
  {
    "id": 45,
    "scene": 10,
    "startMs": 66010,
    "endMs": 67200,
    "text": "vì lượng thủy ngân độc hại",
    "tokens": [
      {
        "text": "vì",
        "startMs": 66010,
        "endMs": 66120
      },
      {
        "text": "lượng",
        "startMs": 66120,
        "endMs": 66410
      },
      {
        "text": "thủy",
        "startMs": 66410,
        "endMs": 66620
      },
      {
        "text": "ngân",
        "startMs": 66620,
        "endMs": 66800
      },
      {
        "text": "độc",
        "startMs": 66800,
        "endMs": 67020
      },
      {
        "text": "hại",
        "startMs": 67020,
        "endMs": 67200
      }
    ],
    "highlightKeywords": [
      "thủy ngân độc hại"
    ]
  },
  {
    "id": 46,
    "scene": 10,
    "startMs": 67200,
    "endMs": 68980,
    "text": "được cho là vẫn còn tồn tại bên trong.",
    "tokens": [
      {
        "text": "được",
        "startMs": 67200,
        "endMs": 67610
      },
      {
        "text": "cho",
        "startMs": 67610,
        "endMs": 67620
      },
      {
        "text": "là",
        "startMs": 67620,
        "endMs": 67720
      },
      {
        "text": "vẫn",
        "startMs": 67720,
        "endMs": 67930
      },
      {
        "text": "còn",
        "startMs": 67930,
        "endMs": 68090
      },
      {
        "text": "tồn",
        "startMs": 68090,
        "endMs": 68230
      },
      {
        "text": "tại",
        "startMs": 68230,
        "endMs": 68420
      },
      {
        "text": "bên",
        "startMs": 68420,
        "endMs": 68560
      },
      {
        "text": "trong",
        "startMs": 68560,
        "endMs": 68980
      }
    ],
    "highlightKeywords": [
      "vẫn còn tồn tại"
    ]
  },
  {
    "id": 47,
    "scene": 11,
    "startMs": 69090,
    "endMs": 70210,
    "text": "Và một sự thật gây sốc khác:",
    "tokens": [
      {
        "text": "Và",
        "startMs": 69090,
        "endMs": 69240
      },
      {
        "text": "một",
        "startMs": 69240,
        "endMs": 69290
      },
      {
        "text": "sự",
        "startMs": 69290,
        "endMs": 69430
      },
      {
        "text": "thật",
        "startMs": 69430,
        "endMs": 69660
      },
      {
        "text": "gây",
        "startMs": 69660,
        "endMs": 69780
      },
      {
        "text": "sốc",
        "startMs": 69780,
        "endMs": 69980
      },
      {
        "text": "khác",
        "startMs": 69980,
        "endMs": 70210
      }
    ],
    "highlightKeywords": [
      "sự thật gây sốc"
    ]
  },
  {
    "id": 48,
    "scene": 11,
    "startMs": 70210,
    "endMs": 72480,
    "text": "Tần Thủy Hoàng ra lệnh đốt hầu hết sách vở trong nước",
    "tokens": [
      {
        "text": "Tần",
        "startMs": 70210,
        "endMs": 70360
      },
      {
        "text": "Thủy",
        "startMs": 70360,
        "endMs": 70640
      },
      {
        "text": "Hoàng",
        "startMs": 70640,
        "endMs": 70800
      },
      {
        "text": "ra",
        "startMs": 70800,
        "endMs": 70860
      },
      {
        "text": "lệnh",
        "startMs": 70860,
        "endMs": 71080
      },
      {
        "text": "đốt",
        "startMs": 71080,
        "endMs": 71300
      },
      {
        "text": "hầu",
        "startMs": 71300,
        "endMs": 71490
      },
      {
        "text": "hết",
        "startMs": 71490,
        "endMs": 71690
      },
      {
        "text": "sách",
        "startMs": 71690,
        "endMs": 71870
      },
      {
        "text": "vở",
        "startMs": 71870,
        "endMs": 72020
      },
      {
        "text": "trong",
        "startMs": 72020,
        "endMs": 72210
      },
      {
        "text": "nước",
        "startMs": 72210,
        "endMs": 72480
      }
    ],
    "highlightKeywords": [
      "đốt hầu hết sách vở"
    ]
  },
  {
    "id": 49,
    "scene": 11,
    "startMs": 72480,
    "endMs": 74360,
    "text": "và chôn sống hàng trăm học giả,",
    "tokens": [
      {
        "text": "và",
        "startMs": 72480,
        "endMs": 72660
      },
      {
        "text": "chôn",
        "startMs": 72660,
        "endMs": 72810
      },
      {
        "text": "sống",
        "startMs": 72810,
        "endMs": 73000
      },
      {
        "text": "hàng",
        "startMs": 73000,
        "endMs": 73190
      },
      {
        "text": "trăm",
        "startMs": 73190,
        "endMs": 73370
      },
      {
        "text": "học",
        "startMs": 73370,
        "endMs": 73560
      },
      {
        "text": "giả",
        "startMs": 73560,
        "endMs": 74360
      }
    ],
    "highlightKeywords": [
      "chôn sống hàng trăm học giả"
    ]
  },
  {
    "id": 50,
    "scene": 11,
    "startMs": 74360,
    "endMs": 75240,
    "text": "chỉ vì họ dám chỉ trích",
    "tokens": [
      {
        "text": "chỉ",
        "startMs": 74360,
        "endMs": 74460
      },
      {
        "text": "vì",
        "startMs": 74460,
        "endMs": 74480
      },
      {
        "text": "họ",
        "startMs": 74480,
        "endMs": 74640
      },
      {
        "text": "dám",
        "startMs": 74640,
        "endMs": 74800
      },
      {
        "text": "chỉ",
        "startMs": 74800,
        "endMs": 75000
      },
      {
        "text": "trích",
        "startMs": 75000,
        "endMs": 75240
      }
    ],
    "highlightKeywords": [
      "dám chỉ trích"
    ]
  },
  {
    "id": 51,
    "scene": 11,
    "startMs": 75240,
    "endMs": 77510,
    "text": "hoặc đưa ra tư tưởng trái với triều đình —",
    "tokens": [
      {
        "text": "hoặc",
        "startMs": 75240,
        "endMs": 75560
      },
      {
        "text": "đưa",
        "startMs": 75560,
        "endMs": 75680
      },
      {
        "text": "ra",
        "startMs": 75680,
        "endMs": 75770
      },
      {
        "text": "tư",
        "startMs": 75770,
        "endMs": 75880
      },
      {
        "text": "tưởng",
        "startMs": 75880,
        "endMs": 76270
      },
      {
        "text": "trái",
        "startMs": 76270,
        "endMs": 76400
      },
      {
        "text": "với",
        "startMs": 76400,
        "endMs": 76600
      },
      {
        "text": "triều",
        "startMs": 76600,
        "endMs": 76880
      },
      {
        "text": "đình",
        "startMs": 76880,
        "endMs": 77510
      }
    ],
    "highlightKeywords": [
      "trái với triều đình"
    ]
  },
  {
    "id": 52,
    "scene": 11,
    "startMs": 77510,
    "endMs": 78880,
    "text": "một trong những cuộc thanh trừng tri thức",
    "tokens": [
      {
        "text": "một",
        "startMs": 77510,
        "endMs": 77550
      },
      {
        "text": "trong",
        "startMs": 77550,
        "endMs": 77790
      },
      {
        "text": "những",
        "startMs": 77790,
        "endMs": 77940
      },
      {
        "text": "cuộc",
        "startMs": 77940,
        "endMs": 78150
      },
      {
        "text": "thanh",
        "startMs": 78150,
        "endMs": 78320
      },
      {
        "text": "trừng",
        "startMs": 78320,
        "endMs": 78570
      },
      {
        "text": "tri",
        "startMs": 78570,
        "endMs": 78670
      },
      {
        "text": "thức",
        "startMs": 78670,
        "endMs": 78880
      }
    ],
    "highlightKeywords": [
      "thanh trừng tri thức"
    ]
  },
  {
    "id": 53,
    "scene": 11,
    "startMs": 78880,
    "endMs": 80440,
    "text": "khét tiếng nhất lịch sử nhân loại.",
    "tokens": [
      {
        "text": "khét",
        "startMs": 78880,
        "endMs": 79110
      },
      {
        "text": "tiếng",
        "startMs": 79110,
        "endMs": 79300
      },
      {
        "text": "nhất",
        "startMs": 79300,
        "endMs": 79540
      },
      {
        "text": "lịch",
        "startMs": 79540,
        "endMs": 79720
      },
      {
        "text": "sử",
        "startMs": 79720,
        "endMs": 79850
      },
      {
        "text": "nhân",
        "startMs": 79850,
        "endMs": 80030
      },
      {
        "text": "loại",
        "startMs": 80030,
        "endMs": 80440
      }
    ],
    "highlightKeywords": [
      "khét tiếng nhất"
    ]
  },
  {
    "id": 54,
    "scene": 12,
    "startMs": 80440,
    "endMs": 82290,
    "text": "Người đàn ông thống nhất cả một đế chế,",
    "tokens": [
      {
        "text": "Người",
        "startMs": 80440,
        "endMs": 80730
      },
      {
        "text": "đàn",
        "startMs": 80730,
        "endMs": 80920
      },
      {
        "text": "ông",
        "startMs": 80920,
        "endMs": 81090
      },
      {
        "text": "thống",
        "startMs": 81090,
        "endMs": 81460
      },
      {
        "text": "nhất",
        "startMs": 81460,
        "endMs": 81530
      },
      {
        "text": "cả",
        "startMs": 81530,
        "endMs": 81680
      },
      {
        "text": "một",
        "startMs": 81680,
        "endMs": 81860
      },
      {
        "text": "đế",
        "startMs": 81860,
        "endMs": 82040
      },
      {
        "text": "chế",
        "startMs": 82040,
        "endMs": 82290
      }
    ],
    "highlightKeywords": [
      "thống nhất cả một đế chế"
    ]
  },
  {
    "id": 55,
    "scene": 12,
    "startMs": 82290,
    "endMs": 83450,
    "text": "xây Vạn Lý Trường Thành,",
    "tokens": [
      {
        "text": "xây",
        "startMs": 82290,
        "endMs": 82430
      },
      {
        "text": "Vạn",
        "startMs": 82430,
        "endMs": 82610
      },
      {
        "text": "Lý",
        "startMs": 82610,
        "endMs": 82720
      },
      {
        "text": "Trường",
        "startMs": 82720,
        "endMs": 83040
      },
      {
        "text": "Thành",
        "startMs": 83040,
        "endMs": 83450
      }
    ],
    "highlightKeywords": [
      "Vạn Lý Trường Thành"
    ]
  },
  {
    "id": 56,
    "scene": 12,
    "startMs": 83450,
    "endMs": 85400,
    "text": "nhưng lại chết vì chính nỗi sợ chết của mình —",
    "tokens": [
      {
        "text": "nhưng",
        "startMs": 83450,
        "endMs": 83550
      },
      {
        "text": "lại",
        "startMs": 83550,
        "endMs": 83720
      },
      {
        "text": "chết",
        "startMs": 83720,
        "endMs": 84030
      },
      {
        "text": "vì",
        "startMs": 84030,
        "endMs": 84060
      },
      {
        "text": "chính",
        "startMs": 84060,
        "endMs": 84280
      },
      {
        "text": "nỗi",
        "startMs": 84280,
        "endMs": 84460
      },
      {
        "text": "sợ",
        "startMs": 84460,
        "endMs": 84600
      },
      {
        "text": "chết",
        "startMs": 84600,
        "endMs": 84830
      },
      {
        "text": "của",
        "startMs": 84830,
        "endMs": 85000
      },
      {
        "text": "mình",
        "startMs": 85000,
        "endMs": 85400
      }
    ],
    "highlightKeywords": [
      "chết vì nỗi sợ chết"
    ]
  },
  {
    "id": 57,
    "scene": 12,
    "startMs": 85400,
    "endMs": 86640,
    "text": "đó chính là Tần Thủy Hoàng.",
    "tokens": [
      {
        "text": "đó",
        "startMs": 85400,
        "endMs": 85480
      },
      {
        "text": "chính",
        "startMs": 85480,
        "endMs": 85620
      },
      {
        "text": "là",
        "startMs": 85620,
        "endMs": 85730
      },
      {
        "text": "Tần",
        "startMs": 85730,
        "endMs": 85870
      },
      {
        "text": "Thủy",
        "startMs": 85870,
        "endMs": 86090
      },
      {
        "text": "Hoàng",
        "startMs": 86090,
        "endMs": 86640
      }
    ],
    "highlightKeywords": [
      "Tần Thủy Hoàng"
    ]
  }
];
