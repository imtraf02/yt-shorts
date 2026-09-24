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

export const teslaSubtitles: SubtitlePhrase[] = [
  {
    "id": 0,
    "startMs": 40,
    "endMs": 3170,
    "text": "Nikola Tesla là người phát minh ra dòng điện xoay chiều,",
    "tokens": [
      {
        "text": "Nikola",
        "startMs": 40,
        "endMs": 300
      },
      {
        "text": "Tesla",
        "startMs": 300,
        "endMs": 570
      },
      {
        "text": "là",
        "startMs": 570,
        "endMs": 690
      },
      {
        "text": "người",
        "startMs": 690,
        "endMs": 1210
      },
      {
        "text": "phát",
        "startMs": 1210,
        "endMs": 1360
      },
      {
        "text": "minh",
        "startMs": 1360,
        "endMs": 1560
      },
      {
        "text": "ra",
        "startMs": 1560,
        "endMs": 1660
      },
      {
        "text": "dòng",
        "startMs": 1660,
        "endMs": 1910
      },
      {
        "text": "điện",
        "startMs": 1910,
        "endMs": 2310
      },
      {
        "text": "xoay",
        "startMs": 2310,
        "endMs": 2460
      },
      {
        "text": "chiều",
        "startMs": 2460,
        "endMs": 3170
      }
    ],
    "highlightKeywords": [
      "phát minh",
      "dòng điện xoay chiều"
    ]
  },
  {
    "id": 1,
    "startMs": 3170,
    "endMs": 5160,
    "text": "thứ đang thắp sáng ngôi nhà bạn ngay lúc này.",
    "tokens": [
      {
        "text": "thứ",
        "startMs": 3170,
        "endMs": 3190
      },
      {
        "text": "đang",
        "startMs": 3190,
        "endMs": 3400
      },
      {
        "text": "thắp",
        "startMs": 3400,
        "endMs": 3670
      },
      {
        "text": "sáng",
        "startMs": 3670,
        "endMs": 3870
      },
      {
        "text": "ngôi",
        "startMs": 3870,
        "endMs": 4090
      },
      {
        "text": "nhà",
        "startMs": 4090,
        "endMs": 4310
      },
      {
        "text": "bạn",
        "startMs": 4310,
        "endMs": 4480
      },
      {
        "text": "ngay",
        "startMs": 4480,
        "endMs": 4650
      },
      {
        "text": "lúc",
        "startMs": 4650,
        "endMs": 4810
      },
      {
        "text": "này",
        "startMs": 4810,
        "endMs": 5160
      }
    ],
    "highlightKeywords": [
      "thắp sáng",
      "ngôi nhà bạn"
    ]
  },
  {
    "id": 2,
    "startMs": 5160,
    "endMs": 6640,
    "text": "Nhưng đời tư của ông thì...",
    "tokens": [
      {
        "text": "Nhưng",
        "startMs": 5160,
        "endMs": 5460
      },
      {
        "text": "đời",
        "startMs": 5460,
        "endMs": 5760
      },
      {
        "text": "tư",
        "startMs": 5760,
        "endMs": 5930
      },
      {
        "text": "của",
        "startMs": 5930,
        "endMs": 6160
      },
      {
        "text": "ông",
        "startMs": 6160,
        "endMs": 6350
      },
      {
        "text": "thì",
        "startMs": 6350,
        "endMs": 6640
      }
    ],
    "highlightKeywords": [
      "đời tư của ông"
    ]
  },
  {
    "id": 3,
    "startMs": 6640,
    "endMs": 9740,
    "text": "kỳ lạ hơn bất kỳ phát minh nào ông từng làm ra.",
    "tokens": [
      {
        "text": "kỳ",
        "startMs": 6640,
        "endMs": 6880
      },
      {
        "text": "lạ",
        "startMs": 6880,
        "endMs": 6990
      },
      {
        "text": "hơn",
        "startMs": 6990,
        "endMs": 7200
      },
      {
        "text": "bất",
        "startMs": 7200,
        "endMs": 7440
      },
      {
        "text": "kỳ",
        "startMs": 7440,
        "endMs": 7640
      },
      {
        "text": "phát",
        "startMs": 7640,
        "endMs": 7890
      },
      {
        "text": "minh",
        "startMs": 7890,
        "endMs": 8090
      },
      {
        "text": "nào",
        "startMs": 8090,
        "endMs": 8520
      },
      {
        "text": "ông",
        "startMs": 8520,
        "endMs": 8720
      },
      {
        "text": "từng",
        "startMs": 8720,
        "endMs": 9130
      },
      {
        "text": "làm",
        "startMs": 9130,
        "endMs": 9560
      },
      {
        "text": "ra",
        "startMs": 9560,
        "endMs": 9740
      }
    ],
    "highlightKeywords": [
      "kỳ lạ hơn",
      "bất kỳ phát minh"
    ]
  },
  {
    "id": 4,
    "startMs": 9600,
    "endMs": 13040,
    "text": "Đầu tiên, Tesla mắc chứng sợ vi khuẩn nặng đến mức ám ảnh.",
    "tokens": [
      {
        "text": "Đầu",
        "startMs": 9600,
        "endMs": 9880
      },
      {
        "text": "tiên",
        "startMs": 9880,
        "endMs": 10430
      },
      {
        "text": "Tesla",
        "startMs": 10430,
        "endMs": 10470
      },
      {
        "text": "mắc",
        "startMs": 10470,
        "endMs": 10710
      },
      {
        "text": "chứng",
        "startMs": 10710,
        "endMs": 10980
      },
      {
        "text": "sợ",
        "startMs": 10980,
        "endMs": 11160
      },
      {
        "text": "vi",
        "startMs": 11160,
        "endMs": 11310
      },
      {
        "text": "khuẩn",
        "startMs": 11310,
        "endMs": 11670
      },
      {
        "text": "nặng",
        "startMs": 11670,
        "endMs": 12030
      },
      {
        "text": "đến",
        "startMs": 12030,
        "endMs": 12220
      },
      {
        "text": "mức",
        "startMs": 12220,
        "endMs": 12450
      },
      {
        "text": "ám",
        "startMs": 12450,
        "endMs": 12580
      },
      {
        "text": "ảnh",
        "startMs": 12580,
        "endMs": 13040
      }
    ],
    "highlightKeywords": [
      "sợ vi khuẩn",
      "ám ảnh"
    ]
  },
  {
    "id": 5,
    "startMs": 13040,
    "endMs": 14080,
    "text": "Ông rửa tay liên tục,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 13040,
        "endMs": 13240
      },
      {
        "text": "rửa",
        "startMs": 13240,
        "endMs": 13440
      },
      {
        "text": "tay",
        "startMs": 13440,
        "endMs": 13560
      },
      {
        "text": "liên",
        "startMs": 13560,
        "endMs": 13760
      },
      {
        "text": "tục",
        "startMs": 13760,
        "endMs": 14080
      }
    ],
    "highlightKeywords": [
      "rửa tay liên tục"
    ]
  },
  {
    "id": 6,
    "startMs": 14080,
    "endMs": 16780,
    "text": "ở khách sạn thì yêu cầu đúng 18 chiếc khăn sạch mỗi ngày,",
    "tokens": [
      {
        "text": "ở",
        "startMs": 14080,
        "endMs": 14160
      },
      {
        "text": "khách",
        "startMs": 14160,
        "endMs": 14320
      },
      {
        "text": "sạn",
        "startMs": 14320,
        "endMs": 14520
      },
      {
        "text": "thì",
        "startMs": 14520,
        "endMs": 14690
      },
      {
        "text": "yêu",
        "startMs": 14690,
        "endMs": 14840
      },
      {
        "text": "cầu",
        "startMs": 14840,
        "endMs": 15050
      },
      {
        "text": "đúng",
        "startMs": 15050,
        "endMs": 15280
      },
      {
        "text": "18",
        "startMs": 15280,
        "endMs": 15580
      },
      {
        "text": "chiếc",
        "startMs": 15580,
        "endMs": 15760
      },
      {
        "text": "khăn",
        "startMs": 15760,
        "endMs": 15960
      },
      {
        "text": "sạch",
        "startMs": 15960,
        "endMs": 16200
      },
      {
        "text": "mỗi",
        "startMs": 16200,
        "endMs": 16400
      },
      {
        "text": "ngày",
        "startMs": 16400,
        "endMs": 16780
      }
    ],
    "highlightKeywords": [
      "18 chiếc khăn sạch"
    ]
  },
  {
    "id": 7,
    "startMs": 16780,
    "endMs": 18880,
    "text": "và tuyệt đối không bao giờ bắt tay ai.",
    "tokens": [
      {
        "text": "và",
        "startMs": 16780,
        "endMs": 16790
      },
      {
        "text": "tuyệt",
        "startMs": 16790,
        "endMs": 17150
      },
      {
        "text": "đối",
        "startMs": 17150,
        "endMs": 17440
      },
      {
        "text": "không",
        "startMs": 17440,
        "endMs": 17750
      },
      {
        "text": "bao",
        "startMs": 17750,
        "endMs": 17950
      },
      {
        "text": "giờ",
        "startMs": 17950,
        "endMs": 18160
      },
      {
        "text": "bắt",
        "startMs": 18160,
        "endMs": 18560
      },
      {
        "text": "tay",
        "startMs": 18560,
        "endMs": 18640
      },
      {
        "text": "ai",
        "startMs": 18640,
        "endMs": 18880
      }
    ],
    "highlightKeywords": [
      "không bao giờ bắt tay"
    ]
  },
  {
    "id": 8,
    "startMs": 18880,
    "endMs": 20560,
    "text": "Bạn nghĩ đồng nghiệp bạn khó tính?",
    "tokens": [
      {
        "text": "Bạn",
        "startMs": 18880,
        "endMs": 19080
      },
      {
        "text": "nghĩ",
        "startMs": 19080,
        "endMs": 19300
      },
      {
        "text": "đồng",
        "startMs": 19300,
        "endMs": 19560
      },
      {
        "text": "nghiệp",
        "startMs": 19560,
        "endMs": 19930
      },
      {
        "text": "bạn",
        "startMs": 19930,
        "endMs": 20090
      },
      {
        "text": "khó",
        "startMs": 20090,
        "endMs": 20240
      },
      {
        "text": "tính",
        "startMs": 20240,
        "endMs": 20560
      }
    ],
    "highlightKeywords": [
      "đồng nghiệp khó tính"
    ]
  },
  {
    "id": 9,
    "startMs": 20560,
    "endMs": 22000,
    "text": "Gặp Tesla đi.",
    "tokens": [
      {
        "text": "Gặp",
        "startMs": 20560,
        "endMs": 21040
      },
      {
        "text": "Tesla",
        "startMs": 21040,
        "endMs": 21460
      },
      {
        "text": "đi",
        "startMs": 21460,
        "endMs": 22000
      }
    ],
    "highlightKeywords": [
      "Gặp Tesla đi"
    ]
  },
  {
    "id": 10,
    "startMs": 22000,
    "endMs": 24000,
    "text": "Ông còn cực kỳ ám ảnh với con số 3.",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 22000,
        "endMs": 22110
      },
      {
        "text": "còn",
        "startMs": 22110,
        "endMs": 22340
      },
      {
        "text": "cực",
        "startMs": 22340,
        "endMs": 22520
      },
      {
        "text": "kỳ",
        "startMs": 22520,
        "endMs": 22690
      },
      {
        "text": "ám",
        "startMs": 22690,
        "endMs": 22820
      },
      {
        "text": "ảnh",
        "startMs": 22820,
        "endMs": 23050
      },
      {
        "text": "với",
        "startMs": 23050,
        "endMs": 23290
      },
      {
        "text": "con",
        "startMs": 23290,
        "endMs": 23430
      },
      {
        "text": "số",
        "startMs": 23430,
        "endMs": 23760
      },
      {
        "text": "3",
        "startMs": 23760,
        "endMs": 24000
      }
    ],
    "highlightKeywords": [
      "ám ảnh với con số 3"
    ]
  },
  {
    "id": 11,
    "startMs": 24000,
    "endMs": 26140,
    "text": "Mọi thứ ông làm đều phải chia hết cho 3 —",
    "tokens": [
      {
        "text": "Mọi",
        "startMs": 24000,
        "endMs": 24210
      },
      {
        "text": "thứ",
        "startMs": 24210,
        "endMs": 24430
      },
      {
        "text": "ông",
        "startMs": 24430,
        "endMs": 24600
      },
      {
        "text": "làm",
        "startMs": 24600,
        "endMs": 24770
      },
      {
        "text": "đều",
        "startMs": 24770,
        "endMs": 25030
      },
      {
        "text": "phải",
        "startMs": 25030,
        "endMs": 25280
      },
      {
        "text": "chia",
        "startMs": 25280,
        "endMs": 25460
      },
      {
        "text": "hết",
        "startMs": 25460,
        "endMs": 25670
      },
      {
        "text": "cho",
        "startMs": 25670,
        "endMs": 26000
      },
      {
        "text": "3",
        "startMs": 26000,
        "endMs": 26140
      }
    ],
    "highlightKeywords": [
      "chia hết cho 3"
    ]
  },
  {
    "id": 12,
    "startMs": 26140,
    "endMs": 28620,
    "text": "đi bộ quanh tòa nhà đúng 3 vòng trước khi vào,",
    "tokens": [
      {
        "text": "đi",
        "startMs": 26140,
        "endMs": 26230
      },
      {
        "text": "bộ",
        "startMs": 26230,
        "endMs": 26460
      },
      {
        "text": "quanh",
        "startMs": 26460,
        "endMs": 26630
      },
      {
        "text": "tòa",
        "startMs": 26630,
        "endMs": 26770
      },
      {
        "text": "nhà",
        "startMs": 26770,
        "endMs": 26960
      },
      {
        "text": "đúng",
        "startMs": 26960,
        "endMs": 27240
      },
      {
        "text": "3",
        "startMs": 27240,
        "endMs": 27380
      },
      {
        "text": "vòng",
        "startMs": 27380,
        "endMs": 27610
      },
      {
        "text": "trước",
        "startMs": 27610,
        "endMs": 27990
      },
      {
        "text": "khi",
        "startMs": 27990,
        "endMs": 28400
      },
      {
        "text": "vào",
        "startMs": 28400,
        "endMs": 28620
      }
    ],
    "highlightKeywords": [
      "đúng 3 vòng"
    ]
  },
  {
    "id": 13,
    "startMs": 28480,
    "endMs": 30600,
    "text": "ở phòng khách sạn phải mang số chia hết cho 3,",
    "tokens": [
      {
        "text": "ở",
        "startMs": 28480,
        "endMs": 28570
      },
      {
        "text": "phòng",
        "startMs": 28570,
        "endMs": 28760
      },
      {
        "text": "khách",
        "startMs": 28760,
        "endMs": 29000
      },
      {
        "text": "sạn",
        "startMs": 29000,
        "endMs": 29240
      },
      {
        "text": "phải",
        "startMs": 29240,
        "endMs": 29450
      },
      {
        "text": "mang",
        "startMs": 29450,
        "endMs": 29610
      },
      {
        "text": "số",
        "startMs": 29610,
        "endMs": 29770
      },
      {
        "text": "chia",
        "startMs": 29770,
        "endMs": 29930
      },
      {
        "text": "hết",
        "startMs": 29930,
        "endMs": 30140
      },
      {
        "text": "cho",
        "startMs": 30140,
        "endMs": 30260
      },
      {
        "text": "3",
        "startMs": 30260,
        "endMs": 30600
      }
    ],
    "highlightKeywords": [
      "số chia hết cho 3"
    ]
  },
  {
    "id": 14,
    "startMs": 30600,
    "endMs": 32710,
    "text": "thậm chí tính lượng thức ăn bằng thể tích",
    "tokens": [
      {
        "text": "thậm",
        "startMs": 30600,
        "endMs": 30850
      },
      {
        "text": "chí",
        "startMs": 30850,
        "endMs": 31010
      },
      {
        "text": "tính",
        "startMs": 31010,
        "endMs": 31220
      },
      {
        "text": "lượng",
        "startMs": 31220,
        "endMs": 31560
      },
      {
        "text": "thức",
        "startMs": 31560,
        "endMs": 31810
      },
      {
        "text": "ăn",
        "startMs": 31810,
        "endMs": 31940
      },
      {
        "text": "bằng",
        "startMs": 31940,
        "endMs": 32200
      },
      {
        "text": "thể",
        "startMs": 32200,
        "endMs": 32460
      },
      {
        "text": "tích",
        "startMs": 32460,
        "endMs": 32710
      }
    ],
    "highlightKeywords": [
      "lượng thức ăn",
      "thể tích"
    ]
  },
  {
    "id": 15,
    "startMs": 32710,
    "endMs": 34110,
    "text": "thay vì nhìn hình dạng món ăn,",
    "tokens": [
      {
        "text": "thay",
        "startMs": 32710,
        "endMs": 32870
      },
      {
        "text": "vì",
        "startMs": 32870,
        "endMs": 33000
      },
      {
        "text": "nhìn",
        "startMs": 33000,
        "endMs": 33210
      },
      {
        "text": "hình",
        "startMs": 33210,
        "endMs": 33420
      },
      {
        "text": "dạng",
        "startMs": 33420,
        "endMs": 33670
      },
      {
        "text": "món",
        "startMs": 33670,
        "endMs": 33930
      },
      {
        "text": "ăn",
        "startMs": 33930,
        "endMs": 34110
      }
    ],
    "highlightKeywords": [
      "hình dạng món ăn"
    ]
  },
  {
    "id": 16,
    "startMs": 33980,
    "endMs": 36690,
    "text": "vì ông ghét... nhìn thấy tóc hay bụi trên đồ ăn.",
    "tokens": [
      {
        "text": "vì",
        "startMs": 33980,
        "endMs": 34100
      },
      {
        "text": "ông",
        "startMs": 34100,
        "endMs": 34270
      },
      {
        "text": "ghét",
        "startMs": 34270,
        "endMs": 34760
      },
      {
        "text": "nhìn",
        "startMs": 34760,
        "endMs": 35000
      },
      {
        "text": "thấy",
        "startMs": 35000,
        "endMs": 35290
      },
      {
        "text": "tóc",
        "startMs": 35290,
        "endMs": 35480
      },
      {
        "text": "hay",
        "startMs": 35480,
        "endMs": 35630
      },
      {
        "text": "bụi",
        "startMs": 35630,
        "endMs": 35860
      },
      {
        "text": "trên",
        "startMs": 35860,
        "endMs": 36100
      },
      {
        "text": "đồ",
        "startMs": 36100,
        "endMs": 36560
      },
      {
        "text": "ăn",
        "startMs": 36560,
        "endMs": 36690
      }
    ],
    "highlightKeywords": [
      "ghét nhìn thấy tóc hay bụi"
    ]
  },
  {
    "id": 17,
    "startMs": 36690,
    "endMs": 39400,
    "text": "Và đây là chuyện tình duy nhất mà lịch sử ghi lại về ông:",
    "tokens": [
      {
        "text": "Và",
        "startMs": 36690,
        "endMs": 36760
      },
      {
        "text": "đây",
        "startMs": 36760,
        "endMs": 36960
      },
      {
        "text": "là",
        "startMs": 36960,
        "endMs": 37080
      },
      {
        "text": "chuyện",
        "startMs": 37080,
        "endMs": 37400
      },
      {
        "text": "tình",
        "startMs": 37400,
        "endMs": 37600
      },
      {
        "text": "duy",
        "startMs": 37600,
        "endMs": 37720
      },
      {
        "text": "nhất",
        "startMs": 37720,
        "endMs": 37960
      },
      {
        "text": "mà",
        "startMs": 37960,
        "endMs": 38120
      },
      {
        "text": "lịch",
        "startMs": 38120,
        "endMs": 38350
      },
      {
        "text": "sử",
        "startMs": 38350,
        "endMs": 38480
      },
      {
        "text": "ghi",
        "startMs": 38480,
        "endMs": 38610
      },
      {
        "text": "lại",
        "startMs": 38610,
        "endMs": 38790
      },
      {
        "text": "về",
        "startMs": 38790,
        "endMs": 39220
      },
      {
        "text": "ông",
        "startMs": 39220,
        "endMs": 39400
      }
    ],
    "highlightKeywords": [
      "chuyện tình duy nhất"
    ]
  },
  {
    "id": 18,
    "startMs": 39240,
    "endMs": 42420,
    "text": "Tesla không hề kết hôn, không hề có người yêu chính thức,",
    "tokens": [
      {
        "text": "Tesla",
        "startMs": 39240,
        "endMs": 39460
      },
      {
        "text": "không",
        "startMs": 39460,
        "endMs": 39730
      },
      {
        "text": "hề",
        "startMs": 39730,
        "endMs": 39930
      },
      {
        "text": "kết",
        "startMs": 39930,
        "endMs": 40120
      },
      {
        "text": "hôn",
        "startMs": 40120,
        "endMs": 40380
      },
      {
        "text": "không",
        "startMs": 40380,
        "endMs": 40690
      },
      {
        "text": "hề",
        "startMs": 40690,
        "endMs": 40950
      },
      {
        "text": "có",
        "startMs": 40950,
        "endMs": 41030
      },
      {
        "text": "người",
        "startMs": 41030,
        "endMs": 41330
      },
      {
        "text": "yêu",
        "startMs": 41330,
        "endMs": 41490
      },
      {
        "text": "chính",
        "startMs": 41490,
        "endMs": 41760
      },
      {
        "text": "thức",
        "startMs": 41760,
        "endMs": 42420
      }
    ],
    "highlightKeywords": [
      "không hề kết hôn",
      "người yêu chính thức"
    ]
  },
  {
    "id": 19,
    "startMs": 42420,
    "endMs": 44490,
    "text": "nhưng ông có một mối quan hệ cực kỳ sâu đậm",
    "tokens": [
      {
        "text": "nhưng",
        "startMs": 42420,
        "endMs": 42480
      },
      {
        "text": "ông",
        "startMs": 42480,
        "endMs": 42670
      },
      {
        "text": "có",
        "startMs": 42670,
        "endMs": 42840
      },
      {
        "text": "một",
        "startMs": 42840,
        "endMs": 43060
      },
      {
        "text": "mối",
        "startMs": 43060,
        "endMs": 43280
      },
      {
        "text": "quan",
        "startMs": 43280,
        "endMs": 43510
      },
      {
        "text": "hệ",
        "startMs": 43510,
        "endMs": 43650
      },
      {
        "text": "cực",
        "startMs": 43650,
        "endMs": 43870
      },
      {
        "text": "kỳ",
        "startMs": 43870,
        "endMs": 44040
      },
      {
        "text": "sâu",
        "startMs": 44040,
        "endMs": 44240
      },
      {
        "text": "đậm",
        "startMs": 44240,
        "endMs": 44490
      }
    ],
    "highlightKeywords": [
      "mối quan hệ cực kỳ sâu đậm"
    ]
  },
  {
    "id": 20,
    "startMs": 44490,
    "endMs": 46170,
    "text": "với... một con bồ câu trắng.",
    "tokens": [
      {
        "text": "với",
        "startMs": 44490,
        "endMs": 45000
      },
      {
        "text": "một",
        "startMs": 45000,
        "endMs": 45240
      },
      {
        "text": "con",
        "startMs": 45240,
        "endMs": 45430
      },
      {
        "text": "bồ",
        "startMs": 45430,
        "endMs": 45570
      },
      {
        "text": "câu",
        "startMs": 45570,
        "endMs": 45750
      },
      {
        "text": "trắng",
        "startMs": 45750,
        "endMs": 46170
      }
    ],
    "highlightKeywords": [
      "con bồ câu trắng"
    ]
  },
  {
    "id": 21,
    "startMs": 46170,
    "endMs": 49280,
    "text": "Ông cho nó ăn mỗi ngày, gọi nó là tình yêu của đời mình,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 46170,
        "endMs": 46500
      },
      {
        "text": "cho",
        "startMs": 46500,
        "endMs": 46520
      },
      {
        "text": "nó",
        "startMs": 46520,
        "endMs": 46640
      },
      {
        "text": "ăn",
        "startMs": 46640,
        "endMs": 46780
      },
      {
        "text": "mỗi",
        "startMs": 46780,
        "endMs": 47020
      },
      {
        "text": "ngày",
        "startMs": 47020,
        "endMs": 47350
      },
      {
        "text": "gọi",
        "startMs": 47350,
        "endMs": 47710
      },
      {
        "text": "nó",
        "startMs": 47710,
        "endMs": 47730
      },
      {
        "text": "là",
        "startMs": 47730,
        "endMs": 47870
      },
      {
        "text": "tình",
        "startMs": 47870,
        "endMs": 48110
      },
      {
        "text": "yêu",
        "startMs": 48110,
        "endMs": 48300
      },
      {
        "text": "của",
        "startMs": 48300,
        "endMs": 48580
      },
      {
        "text": "đời",
        "startMs": 48580,
        "endMs": 48820
      },
      {
        "text": "mình",
        "startMs": 48820,
        "endMs": 49280
      }
    ],
    "highlightKeywords": [
      "tình yêu của đời mình"
    ]
  },
  {
    "id": 22,
    "startMs": 49280,
    "endMs": 50320,
    "text": "và khi nó chết,",
    "tokens": [
      {
        "text": "và",
        "startMs": 49280,
        "endMs": 49440
      },
      {
        "text": "khi",
        "startMs": 49440,
        "endMs": 49560
      },
      {
        "text": "nó",
        "startMs": 49560,
        "endMs": 49700
      },
      {
        "text": "chết",
        "startMs": 49700,
        "endMs": 50320
      }
    ],
    "highlightKeywords": [
      "khi nó chết"
    ]
  },
  {
    "id": 23,
    "startMs": 50320,
    "endMs": 53530,
    "text": "Tesla nói rằng ông cảm thấy như vừa mất đi một phần bản thân.",
    "tokens": [
      {
        "text": "Tesla",
        "startMs": 50320,
        "endMs": 50370
      },
      {
        "text": "nói",
        "startMs": 50370,
        "endMs": 50560
      },
      {
        "text": "rằng",
        "startMs": 50560,
        "endMs": 50800
      },
      {
        "text": "ông",
        "startMs": 50800,
        "endMs": 50990
      },
      {
        "text": "cảm",
        "startMs": 50990,
        "endMs": 51400
      },
      {
        "text": "thấy",
        "startMs": 51400,
        "endMs": 51520
      },
      {
        "text": "như",
        "startMs": 51520,
        "endMs": 51760
      },
      {
        "text": "vừa",
        "startMs": 51760,
        "endMs": 51950
      },
      {
        "text": "mất",
        "startMs": 51950,
        "endMs": 52190
      },
      {
        "text": "đi",
        "startMs": 52190,
        "endMs": 52390
      },
      {
        "text": "một",
        "startMs": 52390,
        "endMs": 52570
      },
      {
        "text": "phần",
        "startMs": 52570,
        "endMs": 52860
      },
      {
        "text": "bản",
        "startMs": 52860,
        "endMs": 53100
      },
      {
        "text": "thân",
        "startMs": 53100,
        "endMs": 53520
      }
    ],
    "highlightKeywords": [
      "mất đi một phần bản thân"
    ]
  },
  {
    "id": 24,
    "startMs": 53560,
    "endMs": 56730,
    "text": "Về sự nghiệp, Tesla có cuộc chiến huyền thoại với Thomas Edison —",
    "tokens": [
      {
        "text": "Về",
        "startMs": 53560,
        "endMs": 53690
      },
      {
        "text": "sự",
        "startMs": 53690,
        "endMs": 53870
      },
      {
        "text": "nghiệp",
        "startMs": 53870,
        "endMs": 54420
      },
      {
        "text": "Tesla",
        "startMs": 54420,
        "endMs": 54540
      },
      {
        "text": "có",
        "startMs": 54540,
        "endMs": 54670
      },
      {
        "text": "cuộc",
        "startMs": 54670,
        "endMs": 54940
      },
      {
        "text": "chiến",
        "startMs": 54940,
        "endMs": 55250
      },
      {
        "text": "huyền",
        "startMs": 55250,
        "endMs": 55650
      },
      {
        "text": "thoại",
        "startMs": 55650,
        "endMs": 55870
      },
      {
        "text": "với",
        "startMs": 55870,
        "endMs": 56150
      },
      {
        "text": "Thomas",
        "startMs": 56150,
        "endMs": 56360
      },
      {
        "text": "Edison",
        "startMs": 56360,
        "endMs": 56730
      }
    ],
    "highlightKeywords": [
      "cuộc chiến huyền thoại",
      "Thomas Edison"
    ]
  },
  {
    "id": 25,
    "startMs": 56730,
    "endMs": 58520,
    "text": "gọi là 'Cuộc chiến dòng điện'.",
    "tokens": [
      {
        "text": "gọi",
        "startMs": 56730,
        "endMs": 56960
      },
      {
        "text": "là",
        "startMs": 56960,
        "endMs": 57080
      },
      {
        "text": "Cuộc",
        "startMs": 57080,
        "endMs": 57400
      },
      {
        "text": "chiến",
        "startMs": 57400,
        "endMs": 57660
      },
      {
        "text": "dòng",
        "startMs": 57660,
        "endMs": 58010
      },
      {
        "text": "điện",
        "startMs": 58010,
        "endMs": 58520
      }
    ],
    "highlightKeywords": [
      "Cuộc chiến dòng điện"
    ]
  },
  {
    "id": 26,
    "startMs": 58520,
    "endMs": 60670,
    "text": "Edison ủng hộ dòng điện một chiều,",
    "tokens": [
      {
        "text": "Edison",
        "startMs": 58520,
        "endMs": 58810
      },
      {
        "text": "ủng",
        "startMs": 58810,
        "endMs": 59040
      },
      {
        "text": "hộ",
        "startMs": 59040,
        "endMs": 59230
      },
      {
        "text": "dòng",
        "startMs": 59230,
        "endMs": 59480
      },
      {
        "text": "điện",
        "startMs": 59480,
        "endMs": 59800
      },
      {
        "text": "một",
        "startMs": 59800,
        "endMs": 60040
      },
      {
        "text": "chiều",
        "startMs": 60040,
        "endMs": 60670
      }
    ],
    "highlightKeywords": [
      "dòng điện một chiều"
    ]
  },
  {
    "id": 27,
    "startMs": 60670,
    "endMs": 62600,
    "text": "Tesla ủng hộ dòng điện xoay chiều,",
    "tokens": [
      {
        "text": "Tesla",
        "startMs": 60670,
        "endMs": 60700
      },
      {
        "text": "ủng",
        "startMs": 60700,
        "endMs": 60930
      },
      {
        "text": "hộ",
        "startMs": 60930,
        "endMs": 61120
      },
      {
        "text": "dòng",
        "startMs": 61120,
        "endMs": 61360
      },
      {
        "text": "điện",
        "startMs": 61360,
        "endMs": 61690
      },
      {
        "text": "xoay",
        "startMs": 61690,
        "endMs": 61920
      },
      {
        "text": "chiều",
        "startMs": 61920,
        "endMs": 62600
      }
    ],
    "highlightKeywords": [
      "dòng điện xoay chiều"
    ]
  },
  {
    "id": 28,
    "startMs": 62600,
    "endMs": 64520,
    "text": "và để chứng minh dòng điện xoay chiều nguy hiểm,",
    "tokens": [
      {
        "text": "và",
        "startMs": 62600,
        "endMs": 62620
      },
      {
        "text": "để",
        "startMs": 62620,
        "endMs": 62800
      },
      {
        "text": "chứng",
        "startMs": 62800,
        "endMs": 63050
      },
      {
        "text": "minh",
        "startMs": 63050,
        "endMs": 63190
      },
      {
        "text": "dòng",
        "startMs": 63190,
        "endMs": 63370
      },
      {
        "text": "điện",
        "startMs": 63370,
        "endMs": 63630
      },
      {
        "text": "xoay",
        "startMs": 63630,
        "endMs": 63810
      },
      {
        "text": "chiều",
        "startMs": 63810,
        "endMs": 64070
      },
      {
        "text": "nguy",
        "startMs": 64070,
        "endMs": 64200
      },
      {
        "text": "hiểm",
        "startMs": 64200,
        "endMs": 64520
      }
    ],
    "highlightKeywords": [
      "chứng minh",
      "nguy hiểm"
    ]
  },
  {
    "id": 29,
    "startMs": 64520,
    "endMs": 67520,
    "text": "Edison công khai... giật điện chết voi trước công chúng.",
    "tokens": [
      {
        "text": "Edison",
        "startMs": 64520,
        "endMs": 64810
      },
      {
        "text": "công",
        "startMs": 64810,
        "endMs": 65050
      },
      {
        "text": "khai",
        "startMs": 65050,
        "endMs": 65330
      },
      {
        "text": "giật",
        "startMs": 65330,
        "endMs": 65740
      },
      {
        "text": "điện",
        "startMs": 65740,
        "endMs": 65930
      },
      {
        "text": "chết",
        "startMs": 65930,
        "endMs": 66210
      },
      {
        "text": "voi",
        "startMs": 66210,
        "endMs": 66420
      },
      {
        "text": "trước",
        "startMs": 66420,
        "endMs": 66820
      },
      {
        "text": "công",
        "startMs": 66820,
        "endMs": 67000
      },
      {
        "text": "chúng",
        "startMs": 67000,
        "endMs": 67520
      }
    ],
    "highlightKeywords": [
      "giật điện chết voi"
    ]
  },
  {
    "id": 30,
    "startMs": 67520,
    "endMs": 68810,
    "text": "Tesla thì đáp trả bằng cách",
    "tokens": [
      {
        "text": "Tesla",
        "startMs": 67520,
        "endMs": 67780
      },
      {
        "text": "thì",
        "startMs": 67780,
        "endMs": 67950
      },
      {
        "text": "đáp",
        "startMs": 67950,
        "endMs": 68120
      },
      {
        "text": "trả",
        "startMs": 68120,
        "endMs": 68330
      },
      {
        "text": "bằng",
        "startMs": 68330,
        "endMs": 68590
      },
      {
        "text": "cách",
        "startMs": 68590,
        "endMs": 68810
      }
    ],
    "highlightKeywords": [
      "Tesla đáp trả"
    ]
  },
  {
    "id": 31,
    "startMs": 68810,
    "endMs": 71410,
    "text": "tự cho dòng điện xoay chiều chạy qua chính cơ thể mình",
    "tokens": [
      {
        "text": "tự",
        "startMs": 68810,
        "endMs": 69040
      },
      {
        "text": "cho",
        "startMs": 69040,
        "endMs": 69110
      },
      {
        "text": "dòng",
        "startMs": 69110,
        "endMs": 69320
      },
      {
        "text": "điện",
        "startMs": 69320,
        "endMs": 69660
      },
      {
        "text": "xoay",
        "startMs": 69660,
        "endMs": 69830
      },
      {
        "text": "chiều",
        "startMs": 69830,
        "endMs": 70290
      },
      {
        "text": "chạy",
        "startMs": 70290,
        "endMs": 70490
      },
      {
        "text": "qua",
        "startMs": 70490,
        "endMs": 70590
      },
      {
        "text": "chính",
        "startMs": 70590,
        "endMs": 70850
      },
      {
        "text": "cơ",
        "startMs": 70850,
        "endMs": 70970
      },
      {
        "text": "thể",
        "startMs": 70970,
        "endMs": 71190
      },
      {
        "text": "mình",
        "startMs": 71190,
        "endMs": 71410
      }
    ],
    "highlightKeywords": [
      "chạy qua chính cơ thể"
    ]
  },
  {
    "id": 32,
    "startMs": 71410,
    "endMs": 73520,
    "text": "trên sân khấu để chứng minh nó an toàn.",
    "tokens": [
      {
        "text": "trên",
        "startMs": 71410,
        "endMs": 71630
      },
      {
        "text": "sân",
        "startMs": 71630,
        "endMs": 71800
      },
      {
        "text": "khấu",
        "startMs": 71800,
        "endMs": 72220
      },
      {
        "text": "để",
        "startMs": 72220,
        "endMs": 72270
      },
      {
        "text": "chứng",
        "startMs": 72270,
        "endMs": 72570
      },
      {
        "text": "minh",
        "startMs": 72570,
        "endMs": 72740
      },
      {
        "text": "nó",
        "startMs": 72740,
        "endMs": 72870
      },
      {
        "text": "an",
        "startMs": 72870,
        "endMs": 73020
      },
      {
        "text": "toàn",
        "startMs": 73020,
        "endMs": 73520
      }
    ],
    "highlightKeywords": [
      "chứng minh nó an toàn"
    ]
  },
  {
    "id": 33,
    "startMs": 73520,
    "endMs": 76800,
    "text": "Cuối đời, Tesla sống gần như ẩn dật trong một phòng khách sạn,",
    "tokens": [
      {
        "text": "Cuối",
        "startMs": 73520,
        "endMs": 73790
      },
      {
        "text": "đời",
        "startMs": 73790,
        "endMs": 74360
      },
      {
        "text": "Tesla",
        "startMs": 74360,
        "endMs": 74370
      },
      {
        "text": "sống",
        "startMs": 74370,
        "endMs": 74630
      },
      {
        "text": "gần",
        "startMs": 74630,
        "endMs": 74850
      },
      {
        "text": "như",
        "startMs": 74850,
        "endMs": 75030
      },
      {
        "text": "ẩn",
        "startMs": 75030,
        "endMs": 75200
      },
      {
        "text": "dật",
        "startMs": 75200,
        "endMs": 75470
      },
      {
        "text": "trong",
        "startMs": 75470,
        "endMs": 75740
      },
      {
        "text": "một",
        "startMs": 75740,
        "endMs": 75910
      },
      {
        "text": "phòng",
        "startMs": 75910,
        "endMs": 76230
      },
      {
        "text": "khách",
        "startMs": 76230,
        "endMs": 76450
      },
      {
        "text": "sạn",
        "startMs": 76450,
        "endMs": 76800
      }
    ],
    "highlightKeywords": [
      "sống gần như ẩn dật"
    ]
  },
  {
    "id": 34,
    "startMs": 76800,
    "endMs": 77920,
    "text": "nợ nần chồng chất,",
    "tokens": [
      {
        "text": "nợ",
        "startMs": 76800,
        "endMs": 76930
      },
      {
        "text": "nần",
        "startMs": 76930,
        "endMs": 77150
      },
      {
        "text": "chồng",
        "startMs": 77150,
        "endMs": 77370
      },
      {
        "text": "chất",
        "startMs": 77370,
        "endMs": 77920
      }
    ],
    "highlightKeywords": [
      "nợ nần chồng chất"
    ]
  },
  {
    "id": 35,
    "startMs": 77920,
    "endMs": 80080,
    "text": "tin rằng mình đã phát minh ra tia laser huỷ diệt",
    "tokens": [
      {
        "text": "tin",
        "startMs": 77920,
        "endMs": 78190
      },
      {
        "text": "rằng",
        "startMs": 78190,
        "endMs": 78360
      },
      {
        "text": "mình",
        "startMs": 78360,
        "endMs": 78580
      },
      {
        "text": "đã",
        "startMs": 78580,
        "endMs": 78760
      },
      {
        "text": "phát",
        "startMs": 78760,
        "endMs": 79030
      },
      {
        "text": "minh",
        "startMs": 79030,
        "endMs": 79150
      },
      {
        "text": "ra",
        "startMs": 79150,
        "endMs": 79240
      },
      {
        "text": "tia",
        "startMs": 79240,
        "endMs": 79520
      },
      {
        "text": "laser",
        "startMs": 79520,
        "endMs": 79680
      },
      {
        "text": "huỷ",
        "startMs": 79680,
        "endMs": 79810
      },
      {
        "text": "diệt",
        "startMs": 79810,
        "endMs": 80080
      }
    ],
    "highlightKeywords": [
      "tia laser huỷ diệt"
    ]
  },
  {
    "id": 36,
    "startMs": 80080,
    "endMs": 82590,
    "text": "và máy liên lạc với người ngoài hành tinh.",
    "tokens": [
      {
        "text": "và",
        "startMs": 80080,
        "endMs": 80200
      },
      {
        "text": "máy",
        "startMs": 80200,
        "endMs": 80470
      },
      {
        "text": "liên",
        "startMs": 80470,
        "endMs": 80600
      },
      {
        "text": "lạc",
        "startMs": 80600,
        "endMs": 80810
      },
      {
        "text": "với",
        "startMs": 80810,
        "endMs": 81030
      },
      {
        "text": "người",
        "startMs": 81030,
        "endMs": 81390
      },
      {
        "text": "ngoài",
        "startMs": 81390,
        "endMs": 81700
      },
      {
        "text": "hành",
        "startMs": 81700,
        "endMs": 81920
      },
      {
        "text": "tinh",
        "startMs": 81920,
        "endMs": 82590
      }
    ],
    "highlightKeywords": [
      "người ngoài hành tinh"
    ]
  },
  {
    "id": 37,
    "startMs": 82590,
    "endMs": 84580,
    "text": "Ông qua đời trong nghèo khó, một mình,",
    "tokens": [
      {
        "text": "Ông",
        "startMs": 82590,
        "endMs": 82640
      },
      {
        "text": "qua",
        "startMs": 82640,
        "endMs": 82720
      },
      {
        "text": "đời",
        "startMs": 82720,
        "endMs": 82970
      },
      {
        "text": "trong",
        "startMs": 82970,
        "endMs": 83190
      },
      {
        "text": "nghèo",
        "startMs": 83190,
        "endMs": 83440
      },
      {
        "text": "khó",
        "startMs": 83440,
        "endMs": 83760
      },
      {
        "text": "một",
        "startMs": 83760,
        "endMs": 84120
      },
      {
        "text": "mình",
        "startMs": 84120,
        "endMs": 84580
      }
    ],
    "highlightKeywords": [
      "nghèo khó, một mình"
    ]
  },
  {
    "id": 38,
    "startMs": 84580,
    "endMs": 87320,
    "text": "dù những phát minh của ông đang thắp sáng cả thế giới ngoài kia.",
    "tokens": [
      {
        "text": "dù",
        "startMs": 84580,
        "endMs": 84710
      },
      {
        "text": "những",
        "startMs": 84710,
        "endMs": 84910
      },
      {
        "text": "phát",
        "startMs": 84910,
        "endMs": 85100
      },
      {
        "text": "minh",
        "startMs": 85100,
        "endMs": 85230
      },
      {
        "text": "của",
        "startMs": 85230,
        "endMs": 85430
      },
      {
        "text": "ông",
        "startMs": 85430,
        "endMs": 85570
      },
      {
        "text": "đang",
        "startMs": 85570,
        "endMs": 85760
      },
      {
        "text": "thắp",
        "startMs": 85760,
        "endMs": 86000
      },
      {
        "text": "sáng",
        "startMs": 86000,
        "endMs": 86150
      },
      {
        "text": "cả",
        "startMs": 86150,
        "endMs": 86330
      },
      {
        "text": "thế",
        "startMs": 86330,
        "endMs": 86490
      },
      {
        "text": "giới",
        "startMs": 86490,
        "endMs": 86710
      },
      {
        "text": "ngoài",
        "startMs": 86710,
        "endMs": 86980
      },
      {
        "text": "kia",
        "startMs": 86980,
        "endMs": 87320
      }
    ],
    "highlightKeywords": [
      "thắp sáng cả thế giới"
    ]
  },
  {
    "id": 39,
    "startMs": 87320,
    "endMs": 89820,
    "text": "Người đàn ông sợ vi khuẩn, yêu một con chim,",
    "tokens": [
      {
        "text": "Người",
        "startMs": 87320,
        "endMs": 87730
      },
      {
        "text": "đàn",
        "startMs": 87730,
        "endMs": 87980
      },
      {
        "text": "ông",
        "startMs": 87980,
        "endMs": 88190
      },
      {
        "text": "sợ",
        "startMs": 88190,
        "endMs": 88390
      },
      {
        "text": "vi",
        "startMs": 88390,
        "endMs": 88490
      },
      {
        "text": "khuẩn",
        "startMs": 88490,
        "endMs": 88840
      },
      {
        "text": "yêu",
        "startMs": 88840,
        "endMs": 89120
      },
      {
        "text": "một",
        "startMs": 89120,
        "endMs": 89310
      },
      {
        "text": "con",
        "startMs": 89310,
        "endMs": 89460
      },
      {
        "text": "chim",
        "startMs": 89460,
        "endMs": 89820
      }
    ],
    "highlightKeywords": [
      "sợ vi khuẩn",
      "yêu một con chim"
    ]
  },
  {
    "id": 40,
    "startMs": 89820,
    "endMs": 91720,
    "text": "và suýt thay đổi cả thế giới điện —",
    "tokens": [
      {
        "text": "và",
        "startMs": 89820,
        "endMs": 89840
      },
      {
        "text": "suýt",
        "startMs": 89840,
        "endMs": 89970
      },
      {
        "text": "thay",
        "startMs": 89970,
        "endMs": 90210
      },
      {
        "text": "đổi",
        "startMs": 90210,
        "endMs": 90480
      },
      {
        "text": "cả",
        "startMs": 90480,
        "endMs": 90690
      },
      {
        "text": "thế",
        "startMs": 90690,
        "endMs": 90950
      },
      {
        "text": "giới",
        "startMs": 90950,
        "endMs": 91410
      },
      {
        "text": "điện",
        "startMs": 91410,
        "endMs": 91720
      }
    ],
    "highlightKeywords": [
      "thay đổi cả thế giới điện"
    ]
  },
  {
    "id": 41,
    "startMs": 91720,
    "endMs": 93820,
    "text": "đó chính là Nikola Tesla.",
    "tokens": [
      {
        "text": "đó",
        "startMs": 91720,
        "endMs": 91930
      },
      {
        "text": "chính",
        "startMs": 91930,
        "endMs": 92290
      },
      {
        "text": "là",
        "startMs": 92290,
        "endMs": 92390
      },
      {
        "text": "Nikola",
        "startMs": 92390,
        "endMs": 92760
      },
      {
        "text": "Tesla",
        "startMs": 92760,
        "endMs": 93320
      }
    ],
    "highlightKeywords": [
      "Nikola Tesla"
    ]
  }
];
