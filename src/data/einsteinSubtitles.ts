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

export const einsteinSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "startMs": 40,
    "endMs": 720,
    "text": "Albert Einstein —",
    "tokens": [
      {
        "text": "Albert",
        "startMs": 40,
        "endMs": 390
      },
      {
        "text": "Einstein",
        "startMs": 390,
        "endMs": 720
      }
    ],
    "highlightKeywords": [
      "Albert Einstein"
    ]
  },
  {
    "id": 1,
    "startMs": 720,
    "endMs": 2660,
    "text": "người phát minh ra thuyết tương đối,",
    "tokens": [
      {
        "text": "người",
        "startMs": 720,
        "endMs": 1170
      },
      {
        "text": "phát",
        "startMs": 1170,
        "endMs": 1300
      },
      {
        "text": "minh",
        "startMs": 1300,
        "endMs": 1470
      },
      {
        "text": "ra",
        "startMs": 1470,
        "endMs": 1560
      },
      {
        "text": "thuyết",
        "startMs": 1560,
        "endMs": 1960
      },
      {
        "text": "tương",
        "startMs": 1960,
        "endMs": 2230
      },
      {
        "text": "đối",
        "startMs": 2230,
        "endMs": 2660
      }
    ],
    "highlightKeywords": [
      "thuyết tương đối"
    ]
  },
  {
    "id": 2,
    "startMs": 2660,
    "endMs": 5240,
    "text": "thay đổi cách nhân loại hiểu về không gian và thời gian.",
    "tokens": [
      {
        "text": "thay",
        "startMs": 2660,
        "endMs": 2820
      },
      {
        "text": "đổi",
        "startMs": 2820,
        "endMs": 3060
      },
      {
        "text": "cách",
        "startMs": 3060,
        "endMs": 3270
      },
      {
        "text": "nhân",
        "startMs": 3270,
        "endMs": 3490
      },
      {
        "text": "loại",
        "startMs": 3490,
        "endMs": 3730
      },
      {
        "text": "hiểu",
        "startMs": 3730,
        "endMs": 3960
      },
      {
        "text": "về",
        "startMs": 3960,
        "endMs": 4120
      },
      {
        "text": "không",
        "startMs": 4120,
        "endMs": 4370
      },
      {
        "text": "gian",
        "startMs": 4370,
        "endMs": 4530
      },
      {
        "text": "và",
        "startMs": 4530,
        "endMs": 4650
      },
      {
        "text": "thời",
        "startMs": 4650,
        "endMs": 4880
      },
      {
        "text": "gian",
        "startMs": 4880,
        "endMs": 5240
      }
    ],
    "highlightKeywords": [
      "không gian",
      "thời gian"
    ]
  },
  {
    "id": 3,
    "startMs": 5240,
    "endMs": 7080,
    "text": "Nhưng ngoài đời, ông lại là kiểu người",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 5240,
        "endMs": 5490
      },
      {
        "text": "ngoài",
        "startMs": 5490,
        "endMs": 5730
      },
      {
        "text": "đời",
        "startMs": 5730,
        "endMs": 6160
      },
      {
        "text": "ông",
        "startMs": 6160,
        "endMs": 6250
      },
      {
        "text": "lại",
        "startMs": 6250,
        "endMs": 6440
      },
      {
        "text": "là",
        "startMs": 6440,
        "endMs": 6620
      },
      {
        "text": "kiểu",
        "startMs": 6620,
        "endMs": 6770
      },
      {
        "text": "người",
        "startMs": 6770,
        "endMs": 7080
      }
    ],
    "highlightKeywords": [
      "ngoài đời"
    ]
  },
  {
    "id": 4,
    "startMs": 7080,
    "endMs": 8300,
    "text": "quên mang chìa khóa nhà mình",
    "tokens": [
      {
        "text": "quên",
        "startMs": 7080,
        "endMs": 7260
      },
      {
        "text": "mang",
        "startMs": 7260,
        "endMs": 7410
      },
      {
        "text": "chìa",
        "startMs": 7410,
        "endMs": 7580
      },
      {
        "text": "khóa",
        "startMs": 7580,
        "endMs": 7750
      },
      {
        "text": "nhà",
        "startMs": 7750,
        "endMs": 7900
      },
      {
        "text": "mình",
        "startMs": 7900,
        "endMs": 8300
      }
    ],
    "highlightKeywords": [
      "quên mang chìa khóa"
    ]
  },
  {
    "id": 5,
    "startMs": 8300,
    "endMs": 10100,
    "text": "thường xuyên đến mức đáng báo động.",
    "tokens": [
      {
        "text": "thường",
        "startMs": 8300,
        "endMs": 8620
      },
      {
        "text": "xuyên",
        "startMs": 8620,
        "endMs": 8830
      },
      {
        "text": "đến",
        "startMs": 8830,
        "endMs": 9040
      },
      {
        "text": "mức",
        "startMs": 9040,
        "endMs": 9220
      },
      {
        "text": "đáng",
        "startMs": 9220,
        "endMs": 9430
      },
      {
        "text": "báo",
        "startMs": 9430,
        "endMs": 9880
      },
      {
        "text": "động",
        "startMs": 9880,
        "endMs": 10100
      }
    ],
    "highlightKeywords": [
      "đáng báo động"
    ]
  },
  {
    "id": 6,
    "startMs": 9880,
    "endMs": 12120,
    "text": "Đúng vậy, bộ não vĩ đại nhất thế kỷ 20",
    "tokens": [
      {
        "text": "Đúng",
        "startMs": 9880,
        "endMs": 10120
      },
      {
        "text": "vậy",
        "startMs": 10120,
        "endMs": 10440
      },
      {
        "text": "bộ",
        "startMs": 10440,
        "endMs": 10560
      },
      {
        "text": "não",
        "startMs": 10560,
        "endMs": 10760
      },
      {
        "text": "vĩ",
        "startMs": 10760,
        "endMs": 10920
      },
      {
        "text": "đại",
        "startMs": 10920,
        "endMs": 11220
      },
      {
        "text": "nhất",
        "startMs": 11220,
        "endMs": 11400
      },
      {
        "text": "thế",
        "startMs": 11400,
        "endMs": 11600
      },
      {
        "text": "kỷ",
        "startMs": 11600,
        "endMs": 11760
      },
      {
        "text": "20",
        "startMs": 11760,
        "endMs": 12120
      }
    ],
    "highlightKeywords": [
      "bộ não vĩ đại nhất"
    ]
  },
  {
    "id": 7,
    "startMs": 12120,
    "endMs": 15460,
    "text": "lại sở hữu trí nhớ tệ không tưởng cho những chuyện đời thường.",
    "tokens": [
      {
        "text": "lại",
        "startMs": 12120,
        "endMs": 12280
      },
      {
        "text": "sở",
        "startMs": 12280,
        "endMs": 12460
      },
      {
        "text": "hữu",
        "startMs": 12460,
        "endMs": 12740
      },
      {
        "text": "trí",
        "startMs": 12740,
        "endMs": 12880
      },
      {
        "text": "nhớ",
        "startMs": 12880,
        "endMs": 13110
      },
      {
        "text": "tệ",
        "startMs": 13110,
        "endMs": 13450
      },
      {
        "text": "không",
        "startMs": 13450,
        "endMs": 13620
      },
      {
        "text": "tưởng",
        "startMs": 13620,
        "endMs": 13920
      },
      {
        "text": "cho",
        "startMs": 13920,
        "endMs": 14040
      },
      {
        "text": "những",
        "startMs": 14040,
        "endMs": 14330
      },
      {
        "text": "chuyện",
        "startMs": 14330,
        "endMs": 14640
      },
      {
        "text": "đời",
        "startMs": 14640,
        "endMs": 14890
      },
      {
        "text": "thường",
        "startMs": 14890,
        "endMs": 15460
      }
    ],
    "highlightKeywords": [
      "trí nhớ tệ",
      "đời thường"
    ]
  },
  {
    "id": 8,
    "startMs": 15460,
    "endMs": 17520,
    "text": "Einstein từng quên hẳn địa chỉ nhà mình,",
    "tokens": [
      {
        "text": "Einstein",
        "startMs": 15460,
        "endMs": 15820
      },
      {
        "text": "từng",
        "startMs": 15820,
        "endMs": 16090
      },
      {
        "text": "quên",
        "startMs": 16090,
        "endMs": 16310
      },
      {
        "text": "hẳn",
        "startMs": 16310,
        "endMs": 16520
      },
      {
        "text": "địa",
        "startMs": 16520,
        "endMs": 16780
      },
      {
        "text": "chỉ",
        "startMs": 16780,
        "endMs": 17000
      },
      {
        "text": "nhà",
        "startMs": 17000,
        "endMs": 17170
      },
      {
        "text": "mình",
        "startMs": 17170,
        "endMs": 17520
      }
    ],
    "highlightKeywords": [
      "quên hẳn địa chỉ nhà"
    ]
  },
  {
    "id": 9,
    "startMs": 17520,
    "endMs": 20160,
    "text": "đến mức phải gọi điện cho văn phòng của chính ông",
    "tokens": [
      {
        "text": "đến",
        "startMs": 17520,
        "endMs": 17730
      },
      {
        "text": "mức",
        "startMs": 17730,
        "endMs": 17950
      },
      {
        "text": "phải",
        "startMs": 17950,
        "endMs": 18220
      },
      {
        "text": "gọi",
        "startMs": 18220,
        "endMs": 18440
      },
      {
        "text": "điện",
        "startMs": 18440,
        "endMs": 18700
      },
      {
        "text": "cho",
        "startMs": 18700,
        "endMs": 18830
      },
      {
        "text": "văn",
        "startMs": 18830,
        "endMs": 19000
      },
      {
        "text": "phòng",
        "startMs": 19000,
        "endMs": 19270
      },
      {
        "text": "của",
        "startMs": 19270,
        "endMs": 19480
      },
      {
        "text": "chính",
        "startMs": 19480,
        "endMs": 19940
      },
      {
        "text": "ông",
        "startMs": 19940,
        "endMs": 20160
      }
    ],
    "highlightKeywords": [
      "gọi điện cho văn phòng"
    ]
  },
  {
    "id": 10,
    "startMs": 19940,
    "endMs": 21600,
    "text": "để hỏi... ông sống ở đâu.",
    "tokens": [
      {
        "text": "để",
        "startMs": 19940,
        "endMs": 20160
      },
      {
        "text": "hỏi",
        "startMs": 20160,
        "endMs": 20580
      },
      {
        "text": "ông",
        "startMs": 20580,
        "endMs": 20820
      },
      {
        "text": "sống",
        "startMs": 20820,
        "endMs": 21060
      },
      {
        "text": "ở",
        "startMs": 21060,
        "endMs": 21210
      },
      {
        "text": "đâu",
        "startMs": 21210,
        "endMs": 21600
      }
    ],
    "highlightKeywords": [
      "ông sống ở đâu"
    ]
  },
  {
    "id": 11,
    "startMs": 21600,
    "endMs": 23290,
    "text": "Bộ não tính ra được năng lượng bằng khối lượng",
    "tokens": [
      {
        "text": "Bộ",
        "startMs": 21600,
        "endMs": 21700
      },
      {
        "text": "não",
        "startMs": 21700,
        "endMs": 21850
      },
      {
        "text": "tính",
        "startMs": 21850,
        "endMs": 22000
      },
      {
        "text": "ra",
        "startMs": 22000,
        "endMs": 22060
      },
      {
        "text": "được",
        "startMs": 22060,
        "endMs": 22300
      },
      {
        "text": "năng",
        "startMs": 22300,
        "endMs": 22450
      },
      {
        "text": "lượng",
        "startMs": 22450,
        "endMs": 22690
      },
      {
        "text": "bằng",
        "startMs": 22690,
        "endMs": 22870
      },
      {
        "text": "khối",
        "startMs": 22870,
        "endMs": 23050
      },
      {
        "text": "lượng",
        "startMs": 23050,
        "endMs": 23290
      }
    ],
    "highlightKeywords": [
      "năng lượng bằng khối lượng"
    ]
  },
  {
    "id": 12,
    "startMs": 23290,
    "endMs": 25020,
    "text": "nhân bình phương vận tốc ánh sáng,",
    "tokens": [
      {
        "text": "nhân",
        "startMs": 23290,
        "endMs": 23440
      },
      {
        "text": "bình",
        "startMs": 23440,
        "endMs": 23590
      },
      {
        "text": "phương",
        "startMs": 23590,
        "endMs": 23860
      },
      {
        "text": "vận",
        "startMs": 23860,
        "endMs": 24220
      },
      {
        "text": "tốc",
        "startMs": 24220,
        "endMs": 24470
      },
      {
        "text": "ánh",
        "startMs": 24470,
        "endMs": 24710
      },
      {
        "text": "sáng",
        "startMs": 24710,
        "endMs": 24980
      }
    ],
    "highlightKeywords": [
      "vận tốc ánh sáng"
    ]
  },
  {
    "id": 13,
    "startMs": 25050,
    "endMs": 26760,
    "text": "nhưng lại không nhớ nổi số nhà.",
    "tokens": [
      {
        "text": "nhưng",
        "startMs": 25050,
        "endMs": 25250
      },
      {
        "text": "lại",
        "startMs": 25250,
        "endMs": 25470
      },
      {
        "text": "không",
        "startMs": 25470,
        "endMs": 25740
      },
      {
        "text": "nhớ",
        "startMs": 25740,
        "endMs": 25970
      },
      {
        "text": "nổi",
        "startMs": 25970,
        "endMs": 26180
      },
      {
        "text": "số",
        "startMs": 26180,
        "endMs": 26540
      },
      {
        "text": "nhà",
        "startMs": 26540,
        "endMs": 26760
      }
    ],
    "highlightKeywords": [
      "không nhớ nổi số nhà"
    ]
  },
  {
    "id": 14,
    "startMs": 26760,
    "endMs": 28370,
    "text": "Ông còn nổi tiếng ghét đi tất.",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 26760,
        "endMs": 26850
      },
      {
        "text": "còn",
        "startMs": 26850,
        "endMs": 27030
      },
      {
        "text": "nổi",
        "startMs": 27030,
        "endMs": 27250
      },
      {
        "text": "tiếng",
        "startMs": 27250,
        "endMs": 27560
      },
      {
        "text": "ghét",
        "startMs": 27560,
        "endMs": 27910
      },
      {
        "text": "đi",
        "startMs": 27910,
        "endMs": 27950
      },
      {
        "text": "tất",
        "startMs": 27950,
        "endMs": 28370
      }
    ],
    "highlightKeywords": [
      "ghét đi tất"
    ]
  },
  {
    "id": 15,
    "startMs": 28370,
    "endMs": 29260,
    "text": "Đúng nghĩa đen —",
    "tokens": [
      {
        "text": "Đúng",
        "startMs": 28370,
        "endMs": 28600
      },
      {
        "text": "nghĩa",
        "startMs": 28600,
        "endMs": 28870
      },
      {
        "text": "đen",
        "startMs": 28870,
        "endMs": 29260
      }
    ],
    "highlightKeywords": [
      "Đúng nghĩa đen"
    ]
  },
  {
    "id": 16,
    "startMs": 29260,
    "endMs": 31980,
    "text": "Einstein từ chối mang tất suốt phần lớn cuộc đời trưởng thành,",
    "tokens": [
      {
        "text": "Einstein",
        "startMs": 29260,
        "endMs": 29570
      },
      {
        "text": "từ",
        "startMs": 29570,
        "endMs": 29760
      },
      {
        "text": "chối",
        "startMs": 29760,
        "endMs": 30040
      },
      {
        "text": "mang",
        "startMs": 30040,
        "endMs": 30260
      },
      {
        "text": "tất",
        "startMs": 30260,
        "endMs": 30500
      },
      {
        "text": "suốt",
        "startMs": 30500,
        "endMs": 30720
      },
      {
        "text": "phần",
        "startMs": 30720,
        "endMs": 30880
      },
      {
        "text": "lớn",
        "startMs": 30880,
        "endMs": 31010
      },
      {
        "text": "cuộc",
        "startMs": 31010,
        "endMs": 31170
      },
      {
        "text": "đời",
        "startMs": 31170,
        "endMs": 31330
      },
      {
        "text": "trưởng",
        "startMs": 31330,
        "endMs": 31570
      },
      {
        "text": "thành",
        "startMs": 31570,
        "endMs": 31980
      }
    ],
    "highlightKeywords": [
      "từ chối mang tất"
    ]
  },
  {
    "id": 17,
    "startMs": 31980,
    "endMs": 33710,
    "text": "kể cả trong những dịp trang trọng.",
    "tokens": [
      {
        "text": "kể",
        "startMs": 31980,
        "endMs": 32140
      },
      {
        "text": "cả",
        "startMs": 32140,
        "endMs": 32300
      },
      {
        "text": "trong",
        "startMs": 32300,
        "endMs": 32510
      },
      {
        "text": "những",
        "startMs": 32510,
        "endMs": 32800
      },
      {
        "text": "dịp",
        "startMs": 32800,
        "endMs": 33000
      },
      {
        "text": "trang",
        "startMs": 33000,
        "endMs": 33190
      },
      {
        "text": "trọng",
        "startMs": 33190,
        "endMs": 33710
      }
    ],
    "highlightKeywords": [
      "dịp trang trọng"
    ]
  },
  {
    "id": 18,
    "startMs": 33710,
    "endMs": 36020,
    "text": "Lý do ông đưa ra đơn giản đến mức ngớ ngẩn:",
    "tokens": [
      {
        "text": "Lý",
        "startMs": 33710,
        "endMs": 33830
      },
      {
        "text": "do",
        "startMs": 33830,
        "endMs": 33910
      },
      {
        "text": "ông",
        "startMs": 33910,
        "endMs": 34110
      },
      {
        "text": "đưa",
        "startMs": 34110,
        "endMs": 34360
      },
      {
        "text": "ra",
        "startMs": 34360,
        "endMs": 34480
      },
      {
        "text": "đơn",
        "startMs": 34480,
        "endMs": 34710
      },
      {
        "text": "giản",
        "startMs": 34710,
        "endMs": 35160
      },
      {
        "text": "đến",
        "startMs": 35160,
        "endMs": 35310
      },
      {
        "text": "mức",
        "startMs": 35310,
        "endMs": 35470
      },
      {
        "text": "ngớ",
        "startMs": 35470,
        "endMs": 35750
      },
      {
        "text": "ngẩn",
        "startMs": 35750,
        "endMs": 36020
      }
    ],
    "highlightKeywords": [
      "đơn giản đến mức ngớ ngẩn"
    ]
  },
  {
    "id": 19,
    "startMs": 36020,
    "endMs": 38740,
    "text": "ông ghét cảm giác ngón chân cái chọc thủng lỗ tất theo thời gian,",
    "tokens": [
      {
        "text": "ông",
        "startMs": 36020,
        "endMs": 36180
      },
      {
        "text": "ghét",
        "startMs": 36180,
        "endMs": 36400
      },
      {
        "text": "cảm",
        "startMs": 36400,
        "endMs": 36570
      },
      {
        "text": "giác",
        "startMs": 36570,
        "endMs": 36750
      },
      {
        "text": "ngón",
        "startMs": 36750,
        "endMs": 36900
      },
      {
        "text": "chân",
        "startMs": 36900,
        "endMs": 37090
      },
      {
        "text": "cái",
        "startMs": 37090,
        "endMs": 37250
      },
      {
        "text": "chọc",
        "startMs": 37250,
        "endMs": 37510
      },
      {
        "text": "thủng",
        "startMs": 37510,
        "endMs": 37730
      },
      {
        "text": "lỗ",
        "startMs": 37730,
        "endMs": 37880
      },
      {
        "text": "tất",
        "startMs": 37880,
        "endMs": 38070
      },
      {
        "text": "theo",
        "startMs": 38070,
        "endMs": 38230
      },
      {
        "text": "thời",
        "startMs": 38230,
        "endMs": 38460
      },
      {
        "text": "gian",
        "startMs": 38460,
        "endMs": 38740
      }
    ],
    "highlightKeywords": [
      "chọc thủng lỗ tất"
    ]
  },
  {
    "id": 20,
    "startMs": 38740,
    "endMs": 40970,
    "text": "nên quyết định cắt bỏ vấn đề tận gốc —",
    "tokens": [
      {
        "text": "nên",
        "startMs": 38740,
        "endMs": 38900
      },
      {
        "text": "quyết",
        "startMs": 38900,
        "endMs": 39180
      },
      {
        "text": "định",
        "startMs": 39180,
        "endMs": 39610
      },
      {
        "text": "cắt",
        "startMs": 39610,
        "endMs": 39760
      },
      {
        "text": "bỏ",
        "startMs": 39760,
        "endMs": 39880
      },
      {
        "text": "vấn",
        "startMs": 39880,
        "endMs": 40090
      },
      {
        "text": "đề",
        "startMs": 40090,
        "endMs": 40310
      },
      {
        "text": "tận",
        "startMs": 40310,
        "endMs": 40540
      },
      {
        "text": "gốc",
        "startMs": 40540,
        "endMs": 40970
      }
    ],
    "highlightKeywords": [
      "cắt bỏ vấn đề tận gốc"
    ]
  },
  {
    "id": 21,
    "startMs": 40970,
    "endMs": 42300,
    "text": "không mang tất nữa là xong.",
    "tokens": [
      {
        "text": "không",
        "startMs": 40970,
        "endMs": 41120
      },
      {
        "text": "mang",
        "startMs": 41120,
        "endMs": 41310
      },
      {
        "text": "tất",
        "startMs": 41310,
        "endMs": 41520
      },
      {
        "text": "nữa",
        "startMs": 41520,
        "endMs": 41760
      },
      {
        "text": "là",
        "startMs": 41760,
        "endMs": 41890
      },
      {
        "text": "xong",
        "startMs": 41890,
        "endMs": 42300
      }
    ],
    "highlightKeywords": [
      "không mang tất nữa"
    ]
  },
  {
    "id": 22,
    "startMs": 42300,
    "endMs": 44750,
    "text": "Về tóc, chắc bạn từng thấy bức ảnh Einstein",
    "tokens": [
      {
        "text": "Về",
        "startMs": 42300,
        "endMs": 42430
      },
      {
        "text": "tóc",
        "startMs": 42430,
        "endMs": 42780
      },
      {
        "text": "chắc",
        "startMs": 42780,
        "endMs": 43060
      },
      {
        "text": "bạn",
        "startMs": 43060,
        "endMs": 43210
      },
      {
        "text": "từng",
        "startMs": 43210,
        "endMs": 43460
      },
      {
        "text": "thấy",
        "startMs": 43460,
        "endMs": 43730
      },
      {
        "text": "bức",
        "startMs": 43730,
        "endMs": 43950
      },
      {
        "text": "ảnh",
        "startMs": 43950,
        "endMs": 44170
      },
      {
        "text": "Einstein",
        "startMs": 44170,
        "endMs": 44750
      }
    ],
    "highlightKeywords": [
      "bức ảnh Einstein"
    ]
  },
  {
    "id": 23,
    "startMs": 44750,
    "endMs": 46360,
    "text": "với mái tóc bạc dựng đứng huyền thoại.",
    "tokens": [
      {
        "text": "với",
        "startMs": 44750,
        "endMs": 44800
      },
      {
        "text": "mái",
        "startMs": 44800,
        "endMs": 44940
      },
      {
        "text": "tóc",
        "startMs": 44940,
        "endMs": 45080
      },
      {
        "text": "bạc",
        "startMs": 45080,
        "endMs": 45250
      },
      {
        "text": "dựng",
        "startMs": 45250,
        "endMs": 45480
      },
      {
        "text": "đứng",
        "startMs": 45480,
        "endMs": 45710
      },
      {
        "text": "huyền",
        "startMs": 45710,
        "endMs": 45940
      },
      {
        "text": "thoại",
        "startMs": 45940,
        "endMs": 46360
      }
    ],
    "highlightKeywords": [
      "mái tóc bạc dựng đứng"
    ]
  },
  {
    "id": 24,
    "startMs": 46360,
    "endMs": 48560,
    "text": "Sự thật là ông gần như không bao giờ chải tóc,",
    "tokens": [
      {
        "text": "Sự",
        "startMs": 46360,
        "endMs": 46530
      },
      {
        "text": "thật",
        "startMs": 46530,
        "endMs": 46850
      },
      {
        "text": "là",
        "startMs": 46850,
        "endMs": 46910
      },
      {
        "text": "ông",
        "startMs": 46910,
        "endMs": 47080
      },
      {
        "text": "gần",
        "startMs": 47080,
        "endMs": 47290
      },
      {
        "text": "như",
        "startMs": 47290,
        "endMs": 47520
      },
      {
        "text": "không",
        "startMs": 47520,
        "endMs": 47720
      },
      {
        "text": "bao",
        "startMs": 47720,
        "endMs": 47850
      },
      {
        "text": "giờ",
        "startMs": 47850,
        "endMs": 48070
      },
      {
        "text": "chải",
        "startMs": 48070,
        "endMs": 48350
      },
      {
        "text": "tóc",
        "startMs": 48350,
        "endMs": 48560
      }
    ],
    "highlightKeywords": [
      "không bao giờ chải tóc"
    ]
  },
  {
    "id": 25,
    "startMs": 48560,
    "endMs": 50000,
    "text": "và khi được hỏi tại sao,",
    "tokens": [
      {
        "text": "và",
        "startMs": 48560,
        "endMs": 48700
      },
      {
        "text": "khi",
        "startMs": 48700,
        "endMs": 48860
      },
      {
        "text": "được",
        "startMs": 48860,
        "endMs": 49260
      },
      {
        "text": "hỏi",
        "startMs": 49260,
        "endMs": 49440
      },
      {
        "text": "tại",
        "startMs": 49440,
        "endMs": 49670
      },
      {
        "text": "sao",
        "startMs": 49670,
        "endMs": 50000
      }
    ],
    "highlightKeywords": [
      "khi được hỏi"
    ]
  },
  {
    "id": 26,
    "startMs": 50000,
    "endMs": 53710,
    "text": "ông trả lời rằng cắt tóc và chải đầu là 'lãng phí thời gian quý báu'",
    "tokens": [
      {
        "text": "ông",
        "startMs": 50000,
        "endMs": 50130
      },
      {
        "text": "trả",
        "startMs": 50130,
        "endMs": 50360
      },
      {
        "text": "lời",
        "startMs": 50360,
        "endMs": 50590
      },
      {
        "text": "rằng",
        "startMs": 50590,
        "endMs": 50950
      },
      {
        "text": "cắt",
        "startMs": 50950,
        "endMs": 51210
      },
      {
        "text": "tóc",
        "startMs": 51210,
        "endMs": 51530
      },
      {
        "text": "và",
        "startMs": 51530,
        "endMs": 51630
      },
      {
        "text": "chải",
        "startMs": 51630,
        "endMs": 51840
      },
      {
        "text": "đầu",
        "startMs": 51840,
        "endMs": 52160
      },
      {
        "text": "là",
        "startMs": 52160,
        "endMs": 52370
      },
      {
        "text": "lãng",
        "startMs": 52370,
        "endMs": 52590
      },
      {
        "text": "phí",
        "startMs": 52590,
        "endMs": 52770
      },
      {
        "text": "thời",
        "startMs": 52770,
        "endMs": 53090
      },
      {
        "text": "gian",
        "startMs": 53090,
        "endMs": 53300
      },
      {
        "text": "quý",
        "startMs": 53300,
        "endMs": 53540
      },
      {
        "text": "báu",
        "startMs": 53540,
        "endMs": 53710
      }
    ],
    "highlightKeywords": [
      "lãng phí thời gian"
    ]
  },
  {
    "id": 27,
    "startMs": 53710,
    "endMs": 56040,
    "text": "có thể dùng để suy nghĩ về vũ trụ.",
    "tokens": [
      {
        "text": "có",
        "startMs": 53710,
        "endMs": 54140
      },
      {
        "text": "thể",
        "startMs": 54140,
        "endMs": 54190
      },
      {
        "text": "dùng",
        "startMs": 54190,
        "endMs": 54400
      },
      {
        "text": "để",
        "startMs": 54400,
        "endMs": 54670
      },
      {
        "text": "suy",
        "startMs": 54670,
        "endMs": 54820
      },
      {
        "text": "nghĩ",
        "startMs": 54820,
        "endMs": 55090
      },
      {
        "text": "về",
        "startMs": 55090,
        "endMs": 55300
      },
      {
        "text": "vũ",
        "startMs": 55300,
        "endMs": 55450
      },
      {
        "text": "trụ",
        "startMs": 55450,
        "endMs": 56040
      }
    ],
    "highlightKeywords": [
      "suy nghĩ về vũ trụ"
    ]
  },
  {
    "id": 28,
    "startMs": 56040,
    "endMs": 58020,
    "text": "Tóc rối là cái giá ông sẵn sàng trả",
    "tokens": [
      {
        "text": "Tóc",
        "startMs": 56040,
        "endMs": 56260
      },
      {
        "text": "rối",
        "startMs": 56260,
        "endMs": 56450
      },
      {
        "text": "là",
        "startMs": 56450,
        "endMs": 56590
      },
      {
        "text": "cái",
        "startMs": 56590,
        "endMs": 56810
      },
      {
        "text": "giá",
        "startMs": 56810,
        "endMs": 56960
      },
      {
        "text": "ông",
        "startMs": 56960,
        "endMs": 57150
      },
      {
        "text": "sẵn",
        "startMs": 57150,
        "endMs": 57370
      },
      {
        "text": "sàng",
        "startMs": 57370,
        "endMs": 57570
      },
      {
        "text": "trả",
        "startMs": 57570,
        "endMs": 58020
      }
    ],
    "highlightKeywords": [
      "cái giá sẵn sàng trả"
    ]
  },
  {
    "id": 29,
    "startMs": 58020,
    "endMs": 59440,
    "text": "để dành thời gian cho vật lý.",
    "tokens": [
      {
        "text": "để",
        "startMs": 58020,
        "endMs": 58040
      },
      {
        "text": "dành",
        "startMs": 58040,
        "endMs": 58270
      },
      {
        "text": "thời",
        "startMs": 58270,
        "endMs": 58560
      },
      {
        "text": "gian",
        "startMs": 58560,
        "endMs": 58730
      },
      {
        "text": "cho",
        "startMs": 58730,
        "endMs": 58880
      },
      {
        "text": "vật",
        "startMs": 58880,
        "endMs": 59110
      },
      {
        "text": "lý",
        "startMs": 59110,
        "endMs": 59440
      }
    ],
    "highlightKeywords": [
      "thời gian cho vật lý"
    ]
  },
  {
    "id": 30,
    "startMs": 59440,
    "endMs": 60860,
    "text": "Đây là chi tiết ít ai biết:",
    "tokens": [
      {
        "text": "Đây",
        "startMs": 59440,
        "endMs": 59710
      },
      {
        "text": "là",
        "startMs": 59710,
        "endMs": 59870
      },
      {
        "text": "chi",
        "startMs": 59870,
        "endMs": 60030
      },
      {
        "text": "tiết",
        "startMs": 60030,
        "endMs": 60440
      },
      {
        "text": "ít",
        "startMs": 60440,
        "endMs": 60490
      },
      {
        "text": "ai",
        "startMs": 60490,
        "endMs": 60640
      },
      {
        "text": "biết",
        "startMs": 60640,
        "endMs": 60860
      }
    ],
    "highlightKeywords": [
      "chi tiết ít ai biết"
    ]
  },
  {
    "id": 31,
    "startMs": 60860,
    "endMs": 64700,
    "text": "Einstein từng được mời làm Tổng thống Israel vào năm 1952,",
    "tokens": [
      {
        "text": "Einstein",
        "startMs": 60860,
        "endMs": 61290
      },
      {
        "text": "từng",
        "startMs": 61290,
        "endMs": 61600
      },
      {
        "text": "được",
        "startMs": 61600,
        "endMs": 62030
      },
      {
        "text": "mời",
        "startMs": 62030,
        "endMs": 62290
      },
      {
        "text": "làm",
        "startMs": 62290,
        "endMs": 62500
      },
      {
        "text": "Tổng",
        "startMs": 62500,
        "endMs": 62860
      },
      {
        "text": "thống",
        "startMs": 62860,
        "endMs": 63180
      },
      {
        "text": "Israel",
        "startMs": 63180,
        "endMs": 63500
      },
      {
        "text": "vào",
        "startMs": 63500,
        "endMs": 63730
      },
      {
        "text": "năm",
        "startMs": 63730,
        "endMs": 63920
      },
      {
        "text": "1952",
        "startMs": 63920,
        "endMs": 64700
      }
    ],
    "highlightKeywords": [
      "Tổng thống Israel",
      "1952"
    ]
  },
  {
    "id": 32,
    "startMs": 64700,
    "endMs": 66720,
    "text": "sau khi vị tổng thống đầu tiên qua đời.",
    "tokens": [
      {
        "text": "sau",
        "startMs": 64700,
        "endMs": 64840
      },
      {
        "text": "khi",
        "startMs": 64840,
        "endMs": 64940
      },
      {
        "text": "vị",
        "startMs": 64940,
        "endMs": 65100
      },
      {
        "text": "tổng",
        "startMs": 65100,
        "endMs": 65360
      },
      {
        "text": "thống",
        "startMs": 65360,
        "endMs": 65620
      },
      {
        "text": "đầu",
        "startMs": 65620,
        "endMs": 65890
      },
      {
        "text": "tiên",
        "startMs": 65890,
        "endMs": 66080
      },
      {
        "text": "qua",
        "startMs": 66080,
        "endMs": 66180
      },
      {
        "text": "đời",
        "startMs": 66180,
        "endMs": 66720
      }
    ],
    "highlightKeywords": [
      "tổng thống đầu tiên qua đời"
    ]
  },
  {
    "id": 33,
    "startMs": 66720,
    "endMs": 67920,
    "text": "Ông từ chối thẳng thừng,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 66720,
        "endMs": 66740
      },
      {
        "text": "từ",
        "startMs": 66740,
        "endMs": 66910
      },
      {
        "text": "chối",
        "startMs": 66910,
        "endMs": 67120
      },
      {
        "text": "thẳng",
        "startMs": 67120,
        "endMs": 67390
      },
      {
        "text": "thừng",
        "startMs": 67390,
        "endMs": 67920
      }
    ],
    "highlightKeywords": [
      "từ chối thẳng thừng"
    ]
  },
  {
    "id": 34,
    "startMs": 67920,
    "endMs": 70650,
    "text": "nói rằng mình không có năng khiếu xử lý con người,",
    "tokens": [
      {
        "text": "nói",
        "startMs": 67920,
        "endMs": 68090
      },
      {
        "text": "rằng",
        "startMs": 68090,
        "endMs": 68460
      },
      {
        "text": "mình",
        "startMs": 68460,
        "endMs": 68710
      },
      {
        "text": "không",
        "startMs": 68710,
        "endMs": 68970
      },
      {
        "text": "có",
        "startMs": 68970,
        "endMs": 69110
      },
      {
        "text": "năng",
        "startMs": 69110,
        "endMs": 69410
      },
      {
        "text": "khiếu",
        "startMs": 69410,
        "endMs": 69640
      },
      {
        "text": "xử",
        "startMs": 69640,
        "endMs": 69810
      },
      {
        "text": "lý",
        "startMs": 69810,
        "endMs": 69940
      },
      {
        "text": "con",
        "startMs": 69940,
        "endMs": 70080
      },
      {
        "text": "người",
        "startMs": 70080,
        "endMs": 70650
      }
    ],
    "highlightKeywords": [
      "không có năng khiếu"
    ]
  },
  {
    "id": 35,
    "startMs": 70650,
    "endMs": 73420,
    "text": "và thành thật hơn là ông thích phương trình hơn chính trị rất nhiều.",
    "tokens": [
      {
        "text": "và",
        "startMs": 70650,
        "endMs": 70700
      },
      {
        "text": "thành",
        "startMs": 70700,
        "endMs": 70880
      },
      {
        "text": "thật",
        "startMs": 70880,
        "endMs": 71200
      },
      {
        "text": "hơn",
        "startMs": 71200,
        "endMs": 71250
      },
      {
        "text": "là",
        "startMs": 71250,
        "endMs": 71360
      },
      {
        "text": "ông",
        "startMs": 71360,
        "endMs": 71510
      },
      {
        "text": "thích",
        "startMs": 71510,
        "endMs": 71720
      },
      {
        "text": "phương",
        "startMs": 71720,
        "endMs": 72040
      },
      {
        "text": "trình",
        "startMs": 72040,
        "endMs": 72250
      },
      {
        "text": "hơn",
        "startMs": 72250,
        "endMs": 72410
      },
      {
        "text": "chính",
        "startMs": 72410,
        "endMs": 72630
      },
      {
        "text": "trị",
        "startMs": 72630,
        "endMs": 72860
      },
      {
        "text": "rất",
        "startMs": 72860,
        "endMs": 73000
      },
      {
        "text": "nhiều",
        "startMs": 73000,
        "endMs": 73420
      }
    ],
    "highlightKeywords": [
      "thích phương trình hơn chính trị"
    ]
  },
  {
    "id": 36,
    "startMs": 73420,
    "endMs": 75000,
    "text": "Và một sự thật gây sốc:",
    "tokens": [
      {
        "text": "Và",
        "startMs": 73420,
        "endMs": 73610
      },
      {
        "text": "một",
        "startMs": 73610,
        "endMs": 73820
      },
      {
        "text": "sự",
        "startMs": 73820,
        "endMs": 74010
      },
      {
        "text": "thật",
        "startMs": 74010,
        "endMs": 74320
      },
      {
        "text": "gây",
        "startMs": 74320,
        "endMs": 74520
      },
      {
        "text": "sốc",
        "startMs": 74520,
        "endMs": 75000
      }
    ],
    "highlightKeywords": [
      "sự thật gây sốc"
    ]
  },
  {
    "id": 37,
    "startMs": 75000,
    "endMs": 77860,
    "text": "Einstein thi trượt kỳ thi tuyển sinh đại học lần đầu tiên.",
    "tokens": [
      {
        "text": "Einstein",
        "startMs": 75000,
        "endMs": 75230
      },
      {
        "text": "thi",
        "startMs": 75230,
        "endMs": 75360
      },
      {
        "text": "trượt",
        "startMs": 75360,
        "endMs": 75700
      },
      {
        "text": "kỳ",
        "startMs": 75700,
        "endMs": 75860
      },
      {
        "text": "thi",
        "startMs": 75860,
        "endMs": 75990
      },
      {
        "text": "tuyển",
        "startMs": 75990,
        "endMs": 76280
      },
      {
        "text": "sinh",
        "startMs": 76280,
        "endMs": 76450
      },
      {
        "text": "đại",
        "startMs": 76450,
        "endMs": 76630
      },
      {
        "text": "học",
        "startMs": 76630,
        "endMs": 76840
      },
      {
        "text": "lần",
        "startMs": 76840,
        "endMs": 77050
      },
      {
        "text": "đầu",
        "startMs": 77050,
        "endMs": 77300
      },
      {
        "text": "tiên",
        "startMs": 77300,
        "endMs": 77620
      }
    ],
    "highlightKeywords": [
      "thi trượt đại học",
      "lần đầu tiên"
    ]
  },
  {
    "id": 38,
    "startMs": 77890,
    "endMs": 79620,
    "text": "Không phải vì môn toán hay vật lý —",
    "tokens": [
      {
        "text": "Không",
        "startMs": 77890,
        "endMs": 77940
      },
      {
        "text": "phải",
        "startMs": 77940,
        "endMs": 78260
      },
      {
        "text": "vì",
        "startMs": 78260,
        "endMs": 78420
      },
      {
        "text": "môn",
        "startMs": 78420,
        "endMs": 78580
      },
      {
        "text": "toán",
        "startMs": 78580,
        "endMs": 78840
      },
      {
        "text": "hay",
        "startMs": 78840,
        "endMs": 79050
      },
      {
        "text": "vật",
        "startMs": 79050,
        "endMs": 79260
      },
      {
        "text": "lý",
        "startMs": 79260,
        "endMs": 79620
      }
    ],
    "highlightKeywords": [
      "môn toán",
      "vật lý"
    ]
  },
  {
    "id": 39,
    "startMs": 79620,
    "endMs": 81100,
    "text": "ông xuất sắc ở hai môn đó —",
    "tokens": [
      {
        "text": "ông",
        "startMs": 79620,
        "endMs": 79720
      },
      {
        "text": "xuất",
        "startMs": 79720,
        "endMs": 80030
      },
      {
        "text": "sắc",
        "startMs": 80030,
        "endMs": 80290
      },
      {
        "text": "ở",
        "startMs": 80290,
        "endMs": 80450
      },
      {
        "text": "hai",
        "startMs": 80450,
        "endMs": 80610
      },
      {
        "text": "môn",
        "startMs": 80610,
        "endMs": 80770
      },
      {
        "text": "đó",
        "startMs": 80770,
        "endMs": 81100
      }
    ],
    "highlightKeywords": [
      "xuất sắc"
    ]
  },
  {
    "id": 40,
    "startMs": 81100,
    "endMs": 82600,
    "text": "mà vì ông trượt các môn còn lại",
    "tokens": [
      {
        "text": "mà",
        "startMs": 81100,
        "endMs": 81250
      },
      {
        "text": "vì",
        "startMs": 81250,
        "endMs": 81360
      },
      {
        "text": "ông",
        "startMs": 81360,
        "endMs": 81530
      },
      {
        "text": "trượt",
        "startMs": 81530,
        "endMs": 81940
      },
      {
        "text": "các",
        "startMs": 81940,
        "endMs": 82040
      },
      {
        "text": "môn",
        "startMs": 82040,
        "endMs": 82250
      },
      {
        "text": "còn",
        "startMs": 82250,
        "endMs": 82380
      },
      {
        "text": "lại",
        "startMs": 82380,
        "endMs": 82600
      }
    ],
    "highlightKeywords": [
      "trượt các môn còn lại"
    ]
  },
  {
    "id": 41,
    "startMs": 82600,
    "endMs": 84300,
    "text": "như ngôn ngữ và lịch sử tự nhiên.",
    "tokens": [
      {
        "text": "như",
        "startMs": 82600,
        "endMs": 82770
      },
      {
        "text": "ngôn",
        "startMs": 82770,
        "endMs": 82980
      },
      {
        "text": "ngữ",
        "startMs": 82980,
        "endMs": 83320
      },
      {
        "text": "và",
        "startMs": 83320,
        "endMs": 83400
      },
      {
        "text": "lịch",
        "startMs": 83400,
        "endMs": 83580
      },
      {
        "text": "sử",
        "startMs": 83580,
        "endMs": 83780
      },
      {
        "text": "tự",
        "startMs": 83780,
        "endMs": 83920
      },
      {
        "text": "nhiên",
        "startMs": 83920,
        "endMs": 84300
      }
    ],
    "highlightKeywords": [
      "ngôn ngữ",
      "lịch sử tự nhiên"
    ]
  },
  {
    "id": 42,
    "startMs": 84300,
    "endMs": 85870,
    "text": "Người sau này định nghĩa lại cả vũ trụ",
    "tokens": [
      {
        "text": "Người",
        "startMs": 84300,
        "endMs": 84580
      },
      {
        "text": "sau",
        "startMs": 84580,
        "endMs": 84690
      },
      {
        "text": "này",
        "startMs": 84690,
        "endMs": 84830
      },
      {
        "text": "định",
        "startMs": 84830,
        "endMs": 85090
      },
      {
        "text": "nghĩa",
        "startMs": 85090,
        "endMs": 85290
      },
      {
        "text": "lại",
        "startMs": 85290,
        "endMs": 85530
      },
      {
        "text": "cả",
        "startMs": 85530,
        "endMs": 85610
      },
      {
        "text": "vũ",
        "startMs": 85610,
        "endMs": 85700
      },
      {
        "text": "trụ",
        "startMs": 85700,
        "endMs": 85870
      }
    ],
    "highlightKeywords": [
      "định nghĩa lại cả vũ trụ"
    ]
  },
  {
    "id": 43,
    "startMs": 85870,
    "endMs": 87900,
    "text": "lại từng bị một kỳ thi đại học đánh gục.",
    "tokens": [
      {
        "text": "lại",
        "startMs": 85870,
        "endMs": 86050
      },
      {
        "text": "từng",
        "startMs": 86050,
        "endMs": 86290
      },
      {
        "text": "bị",
        "startMs": 86290,
        "endMs": 86430
      },
      {
        "text": "một",
        "startMs": 86430,
        "endMs": 86610
      },
      {
        "text": "kỳ",
        "startMs": 86610,
        "endMs": 86760
      },
      {
        "text": "thi",
        "startMs": 86760,
        "endMs": 86850
      },
      {
        "text": "đại",
        "startMs": 86850,
        "endMs": 87060
      },
      {
        "text": "học",
        "startMs": 87060,
        "endMs": 87240
      },
      {
        "text": "đánh",
        "startMs": 87240,
        "endMs": 87450
      },
      {
        "text": "gục",
        "startMs": 87450,
        "endMs": 87900
      }
    ],
    "highlightKeywords": [
      "bị kỳ thi đánh gục"
    ]
  },
  {
    "id": 44,
    "startMs": 87900,
    "endMs": 89630,
    "text": "Bộ não tính ra thuyết tương đối,",
    "tokens": [
      {
        "text": "Bộ",
        "startMs": 87900,
        "endMs": 88100
      },
      {
        "text": "não",
        "startMs": 88100,
        "endMs": 88230
      },
      {
        "text": "tính",
        "startMs": 88230,
        "endMs": 88440
      },
      {
        "text": "ra",
        "startMs": 88440,
        "endMs": 88520
      },
      {
        "text": "thuyết",
        "startMs": 88520,
        "endMs": 88850
      },
      {
        "text": "tương",
        "startMs": 88850,
        "endMs": 89100
      },
      {
        "text": "đối",
        "startMs": 89100,
        "endMs": 89630
      }
    ],
    "highlightKeywords": [
      "thuyết tương đối"
    ]
  },
  {
    "id": 45,
    "startMs": 89630,
    "endMs": 90980,
    "text": "nhưng quên địa chỉ nhà,",
    "tokens": [
      {
        "text": "nhưng",
        "startMs": 89630,
        "endMs": 89860
      },
      {
        "text": "quên",
        "startMs": 89860,
        "endMs": 90060
      },
      {
        "text": "địa",
        "startMs": 90060,
        "endMs": 90370
      },
      {
        "text": "chỉ",
        "startMs": 90370,
        "endMs": 90800
      },
      {
        "text": "nhà",
        "startMs": 90800,
        "endMs": 90980
      }
    ],
    "highlightKeywords": [
      "quên địa chỉ nhà"
    ]
  },
  {
    "id": 46,
    "startMs": 90830,
    "endMs": 91430,
    "text": "ghét tất,",
    "tokens": [
      {
        "text": "ghét",
        "startMs": 90830,
        "endMs": 91080
      },
      {
        "text": "tất",
        "startMs": 91080,
        "endMs": 91430
      }
    ],
    "highlightKeywords": [
      "ghét tất"
    ]
  },
  {
    "id": 47,
    "startMs": 91430,
    "endMs": 92600,
    "text": "và từng trượt đại học —",
    "tokens": [
      {
        "text": "và",
        "startMs": 91430,
        "endMs": 91500
      },
      {
        "text": "từng",
        "startMs": 91500,
        "endMs": 91770
      },
      {
        "text": "trượt",
        "startMs": 91770,
        "endMs": 91960
      },
      {
        "text": "đại",
        "startMs": 91960,
        "endMs": 92420
      },
      {
        "text": "học",
        "startMs": 92420,
        "endMs": 92600
      }
    ],
    "highlightKeywords": [
      "từng trượt đại học"
    ]
  },
  {
    "id": 48,
    "startMs": 92460,
    "endMs": 93810,
    "text": "đó chính là Albert Einstein,",
    "tokens": [
      {
        "text": "đó",
        "startMs": 92460,
        "endMs": 92660
      },
      {
        "text": "chính",
        "startMs": 92660,
        "endMs": 92960
      },
      {
        "text": "là",
        "startMs": 92960,
        "endMs": 93110
      },
      {
        "text": "Albert",
        "startMs": 93110,
        "endMs": 93410
      },
      {
        "text": "Einstein",
        "startMs": 93410,
        "endMs": 93810
      }
    ],
    "highlightKeywords": [
      "Albert Einstein"
    ]
  },
  {
    "id": 49,
    "startMs": 93810,
    "endMs": 96680,
    "text": "thiên tài lộn xộn nhất lịch sử khoa học.",
    "tokens": [
      {
        "text": "thiên",
        "startMs": 93810,
        "endMs": 94110
      },
      {
        "text": "tài",
        "startMs": 94110,
        "endMs": 94350
      },
      {
        "text": "lộn",
        "startMs": 94350,
        "endMs": 94560
      },
      {
        "text": "xộn",
        "startMs": 94560,
        "endMs": 94760
      },
      {
        "text": "nhất",
        "startMs": 94760,
        "endMs": 95070
      },
      {
        "text": "lịch",
        "startMs": 95070,
        "endMs": 95360
      },
      {
        "text": "sử",
        "startMs": 95360,
        "endMs": 95560
      },
      {
        "text": "khoa",
        "startMs": 95560,
        "endMs": 95760
      },
      {
        "text": "học",
        "startMs": 95760,
        "endMs": 96180
      }
    ],
    "highlightKeywords": [
      "thiên tài lộn xộn nhất"
    ]
  }
];
