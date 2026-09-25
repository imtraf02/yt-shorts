// Auto-generated Subtitles and Scene Configuration for Steve Jobs Short
// 24 Scenes matching 24 images and Apple narrative beats

export interface WordTiming {
  word: string;
  startMs: number;
  endMs: number;
  isKeyword?: boolean;
}

export interface PhraseCaption {
  id: number;
  sceneId: number;
  text: string;
  startMs: number;
  endMs: number;
  words: WordTiming[];
}

export interface SceneMeta {
  id: number;
  image: string;
  badge: string;
  hud: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
}

export const STEVE_TOTAL_FRAMES = 5010;
export const STEVE_FPS = 30;
export const STEVE_AUDIO_PATH = "audio/steve-jobs.wav";

export const STEVE_SCENES: SceneMeta[] = [
  {
    "id": 1,
    "image": "01-steve-jobs-scene.png",
    "badge": "🍎 HUYỀN THOẠI STEVE JOBS",
    "hud": "APPLE & NHỮNG ĐỘT PHÁ THẾ KỶ",
    "startFrame": 0,
    "endFrame": 234,
    "durationInFrames": 234
  },
  {
    "id": 2,
    "image": "02-steve-jobs-scene.png",
    "badge": "📦 BỊ SA THẢI & 12 NĂM TÁI SINH",
    "hud": "CỨU APPLE TỪ BỜ VỰC SỤP ĐỔ",
    "startFrame": 234,
    "endFrame": 441,
    "durationInFrames": 207
  },
  {
    "id": 3,
    "image": "03-steve-jobs-scene.png",
    "badge": "🌉 SAN FRANCISCO 1955",
    "hud": "CẬU BÉ ĐƯỢC NHẬN NUÔI",
    "startFrame": 441,
    "endFrame": 599,
    "durationInFrames": 158
  },
  {
    "id": 4,
    "image": "04-steve-jobs-scene.png",
    "badge": "⚡ ĐAM MÊ ĐIỆN TỬ TỪ NHỎ",
    "hud": "TRÁI TIM THUNG LŨNG SILICON",
    "startFrame": 599,
    "endFrame": 716,
    "durationInFrames": 117
  },
  {
    "id": 5,
    "image": "05-steve-jobs-scene.png",
    "badge": "🖋️ LỚP THƯ PHÁP ĐẠI HỌC REED",
    "hud": "QUYẾT ĐỊNH BỎ HỌC ĐỂ DỰ THÍNH",
    "startFrame": 716,
    "endFrame": 899,
    "durationInFrames": 183
  },
  {
    "id": 6,
    "image": "06-steve-jobs-scene.png",
    "badge": "💻 NGHỆ THUẬT FONT CHỮ MACINTOSH",
    "hud": "GIAO THOA CÔNG NGHỆ & NGHỆ THUẬT",
    "startFrame": 899,
    "endFrame": 1072,
    "durationInFrames": 173
  },
  {
    "id": 7,
    "image": "07-steve-jobs-scene.png",
    "badge": "🔨 GA-RA NHÀ STEVE JOBS 1976",
    "hud": "CÙNG WOZNIAK SÁNG LẬP APPLE",
    "startFrame": 1072,
    "endFrame": 1213,
    "durationInFrames": 141
  },
  {
    "id": 8,
    "image": "08-steve-jobs-scene.png",
    "badge": "📈 TRIỆU PHÚ TUỔI 25 VỚI APPLE II",
    "hud": "IPO LỊCH SỬ NĂM 1980",
    "startFrame": 1213,
    "endFrame": 1465,
    "durationInFrames": 252
  },
  {
    "id": 9,
    "image": "09-steve-jobs-scene.png",
    "badge": "🖥️ ĐẠI CÁCH MẠNG MACINTOSH 1984",
    "hud": "GIAO DIỆN ĐỒ HỌA & CON CHUỘT",
    "startFrame": 1465,
    "endFrame": 1667,
    "durationInFrames": 202
  },
  {
    "id": 10,
    "image": "10-steve-jobs-scene.png",
    "badge": "🥤 CÂU HỎI THAY ĐỔI LỊCH SỬ",
    "hud": "LỜI MỜI DÀNH CHO JOHN SCULLEY",
    "startFrame": 1667,
    "endFrame": 1892,
    "durationInFrames": 225
  },
  {
    "id": 11,
    "image": "11-steve-jobs-scene.png",
    "badge": "⚡ BI KỊCH BỊ ĐẨY KHỎI APPLE 1985",
    "hud": "CUỘC ĐẢO CHÍNH PHÒNG HỌP",
    "startFrame": 1892,
    "endFrame": 2158,
    "durationInFrames": 266
  },
  {
    "id": 12,
    "image": "12-steve-jobs-scene.png",
    "badge": "⬛ KHỐI LẬP PHƯƠNG NEXT COMPUTER",
    "hud": "BẮT ĐẦU LẠI TỪ CON SỐ KHÔNG",
    "startFrame": 2158,
    "endFrame": 2285,
    "durationInFrames": 127
  },
  {
    "id": 13,
    "image": "13-steve-jobs-scene.png",
    "badge": "🎨 MUA LẠI PIXAR NĂM 1986",
    "hud": "5 TRIỆU ĐÔ LA & ĐỒ HỌA 3D",
    "startFrame": 2285,
    "endFrame": 2487,
    "durationInFrames": 202
  },
  {
    "id": 14,
    "image": "14-steve-jobs-scene.png",
    "badge": "🧸 TOY STORY 1995 THẮNG LỚN",
    "hud": "PHIM HOẠT HÌNH 3D ĐẦU TIÊN",
    "startFrame": 2487,
    "endFrame": 2761,
    "durationInFrames": 274
  },
  {
    "id": 15,
    "image": "15-steve-jobs-scene.png",
    "badge": "🔄 CÚ TRỞ LẠI NGOẠN MỤC 1997",
    "hud": "APPLE MUA NEXT $400 TRIỆU",
    "startFrame": 2761,
    "endFrame": 3036,
    "durationInFrames": 275
  },
  {
    "id": 16,
    "image": "16-steve-jobs-scene.png",
    "badge": "🤝 CẮT GIẢM & BẮT TAY MICROSOFT",
    "hud": "KHOẢN CỨU NGUY $150 TRIỆU",
    "startFrame": 3036,
    "endFrame": 3216,
    "durationInFrames": 180
  },
  {
    "id": 17,
    "image": "17-steve-jobs-scene.png",
    "badge": "🌈 IMAC ĐẦY MÀU SẮC 1998",
    "hud": "HỒI SINH LINH HỒN APPLE",
    "startFrame": 3216,
    "endFrame": 3362,
    "durationInFrames": 146
  },
  {
    "id": 18,
    "image": "18-steve-jobs-scene.png",
    "badge": "🎵 1.000 BÀI HÁT TRONG TÚI ÁO",
    "hud": "IPOD 2001 & CỬA HÀNG ITUNES",
    "startFrame": 3362,
    "endFrame": 3659,
    "durationInFrames": 297
  },
  {
    "id": 19,
    "image": "19-steve-jobs-scene.png",
    "badge": "📱 NGÀY IPHONE RA ĐỜI 2007",
    "hud": "3 THIẾT BỊ TRONG MỘT CHIẾC MÁY",
    "startFrame": 3659,
    "endFrame": 3870,
    "durationInFrames": 211
  },
  {
    "id": 20,
    "image": "20-steve-jobs-scene.png",
    "badge": "📖 MÁY TÍNH BẢNG IPAD 2010",
    "hud": "KỶ NGUYÊN HẬU PC",
    "startFrame": 3870,
    "endFrame": 3931,
    "durationInFrames": 61
  },
  {
    "id": 21,
    "image": "21-steve-jobs-scene.png",
    "badge": "🌀 TRƯỜNG BÓP MÉO THỰC TẠI",
    "hud": "SỰ CẦU TOÀN TUYỆT ĐỐI",
    "startFrame": 3931,
    "endFrame": 4357,
    "durationInFrames": 426
  },
  {
    "id": 22,
    "image": "22-steve-jobs-scene.png",
    "badge": "🎓 BÀI HỌC CÁI CHẾT TẠI STANFORD",
    "hud": "SỐNG THẬT VỚI ĐIỀU MÌNH YÊU",
    "startFrame": 4357,
    "endFrame": 4668,
    "durationInFrames": 311
  },
  {
    "id": 23,
    "image": "23-steve-jobs-scene.png",
    "badge": "🕯️ VĨNH BIỆT STEVE JOBS 2011",
    "hud": "HƯỞNG THỌ 56 TUỔI",
    "startFrame": 4668,
    "endFrame": 4770,
    "durationInFrames": 102
  },
  {
    "id": 24,
    "image": "24-steve-jobs-scene.png",
    "badge": "🍎 STAY HUNGRY, STAY FOOLISH",
    "hud": "NGƯỜI THAY ĐỔI CẢ THẾ GIỚI",
    "startFrame": 4770,
    "endFrame": 5010,
    "durationInFrames": 240
  }
];

export const STEVE_PHRASES: PhraseCaption[] = [
  {
    "id": 1,
    "sceneId": 1,
    "text": "Steve Jobs là người đồng",
    "startMs": 170,
    "endMs": 1260,
    "words": [
      {
        "word": "Steve",
        "startMs": 170,
        "endMs": 230,
        "isKeyword": true
      },
      {
        "word": "Jobs",
        "startMs": 230,
        "endMs": 420,
        "isKeyword": true
      },
      {
        "word": "là",
        "startMs": 420,
        "endMs": 710,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 710,
        "endMs": 940,
        "isKeyword": false
      },
      {
        "word": "đồng",
        "startMs": 940,
        "endMs": 1260,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 2,
    "sceneId": 1,
    "text": "sáng lập Apple, người đứng",
    "startMs": 1260,
    "endMs": 2640,
    "words": [
      {
        "word": "sáng",
        "startMs": 1260,
        "endMs": 1490,
        "isKeyword": false
      },
      {
        "word": "lập",
        "startMs": 1490,
        "endMs": 1720,
        "isKeyword": false
      },
      {
        "word": "Apple,",
        "startMs": 1720,
        "endMs": 2090,
        "isKeyword": true
      },
      {
        "word": "người",
        "startMs": 2090,
        "endMs": 2380,
        "isKeyword": false
      },
      {
        "word": "đứng",
        "startMs": 2380,
        "endMs": 2640,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 3,
    "sceneId": 1,
    "text": "sau Macintosh, iPod, iPhone và",
    "startMs": 2640,
    "endMs": 4910,
    "words": [
      {
        "word": "sau",
        "startMs": 2640,
        "endMs": 2760,
        "isKeyword": false
      },
      {
        "word": "Macintosh,",
        "startMs": 2760,
        "endMs": 3360,
        "isKeyword": true
      },
      {
        "word": "iPod,",
        "startMs": 3360,
        "endMs": 4180,
        "isKeyword": true
      },
      {
        "word": "iPhone",
        "startMs": 4180,
        "endMs": 4690,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 4690,
        "endMs": 4910,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 4,
    "sceneId": 1,
    "text": "iPad, những sản phẩm đã",
    "startMs": 4910,
    "endMs": 6000,
    "words": [
      {
        "word": "iPad,",
        "startMs": 4910,
        "endMs": 5470,
        "isKeyword": true
      },
      {
        "word": "những",
        "startMs": 5470,
        "endMs": 5520,
        "isKeyword": false
      },
      {
        "word": "sản",
        "startMs": 5520,
        "endMs": 5690,
        "isKeyword": true
      },
      {
        "word": "phẩm",
        "startMs": 5690,
        "endMs": 5920,
        "isKeyword": false
      },
      {
        "word": "đã",
        "startMs": 5920,
        "endMs": 6000,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 5,
    "sceneId": 1,
    "text": "thay đổi cách cả thế giới dùng công nghệ.",
    "startMs": 6000,
    "endMs": 7800,
    "words": [
      {
        "word": "thay",
        "startMs": 6000,
        "endMs": 6100,
        "isKeyword": false
      },
      {
        "word": "đổi",
        "startMs": 6100,
        "endMs": 6280,
        "isKeyword": false
      },
      {
        "word": "cách",
        "startMs": 6280,
        "endMs": 6530,
        "isKeyword": false
      },
      {
        "word": "cả",
        "startMs": 6530,
        "endMs": 6690,
        "isKeyword": false
      },
      {
        "word": "thế",
        "startMs": 6690,
        "endMs": 6810,
        "isKeyword": false
      },
      {
        "word": "giới",
        "startMs": 6810,
        "endMs": 7030,
        "isKeyword": false
      },
      {
        "word": "dùng",
        "startMs": 7030,
        "endMs": 7210,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 7210,
        "endMs": 7400,
        "isKeyword": false
      },
      {
        "word": "nghệ.",
        "startMs": 7400,
        "endMs": 7800,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 6,
    "sceneId": 2,
    "text": "Nhưng ít ai biết rằng",
    "startMs": 7800,
    "endMs": 8770,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 7800,
        "endMs": 8080,
        "isKeyword": false
      },
      {
        "word": "ít",
        "startMs": 8080,
        "endMs": 8230,
        "isKeyword": false
      },
      {
        "word": "ai",
        "startMs": 8080,
        "endMs": 8210,
        "isKeyword": false
      },
      {
        "word": "biết",
        "startMs": 8210,
        "endMs": 8490,
        "isKeyword": false
      },
      {
        "word": "rằng",
        "startMs": 8490,
        "endMs": 8770,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 7,
    "sceneId": 2,
    "text": "ông từng bị chính công",
    "startMs": 8770,
    "endMs": 9950,
    "words": [
      {
        "word": "ông",
        "startMs": 8770,
        "endMs": 8970,
        "isKeyword": false
      },
      {
        "word": "từng",
        "startMs": 8970,
        "endMs": 9240,
        "isKeyword": false
      },
      {
        "word": "bị",
        "startMs": 9240,
        "endMs": 9430,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 9430,
        "endMs": 9710,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 9710,
        "endMs": 9950,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 8,
    "sceneId": 2,
    "text": "ty mình lập ra sa",
    "startMs": 9950,
    "endMs": 10690,
    "words": [
      {
        "word": "ty",
        "startMs": 9950,
        "endMs": 10040,
        "isKeyword": false
      },
      {
        "word": "mình",
        "startMs": 10040,
        "endMs": 10320,
        "isKeyword": false
      },
      {
        "word": "lập",
        "startMs": 10320,
        "endMs": 10510,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 10510,
        "endMs": 10600,
        "isKeyword": false
      },
      {
        "word": "sa",
        "startMs": 10600,
        "endMs": 10690,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 9,
    "sceneId": 2,
    "text": "thải, rồi 12 năm sau",
    "startMs": 10690,
    "endMs": 12330,
    "words": [
      {
        "word": "thải,",
        "startMs": 10690,
        "endMs": 11280,
        "isKeyword": true
      },
      {
        "word": "rồi",
        "startMs": 11280,
        "endMs": 11540,
        "isKeyword": false
      },
      {
        "word": "12",
        "startMs": 11540,
        "endMs": 11860,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 11860,
        "endMs": 12070,
        "isKeyword": true
      },
      {
        "word": "sau",
        "startMs": 12070,
        "endMs": 12330,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 10,
    "sceneId": 2,
    "text": "quay lại cứu nó khỏi bờ vực phá sản.",
    "startMs": 12330,
    "endMs": 14690,
    "words": [
      {
        "word": "quay",
        "startMs": 12330,
        "endMs": 12530,
        "isKeyword": false
      },
      {
        "word": "lại",
        "startMs": 12530,
        "endMs": 12790,
        "isKeyword": false
      },
      {
        "word": "cứu",
        "startMs": 12790,
        "endMs": 13080,
        "isKeyword": false
      },
      {
        "word": "nó",
        "startMs": 13080,
        "endMs": 13210,
        "isKeyword": false
      },
      {
        "word": "khỏi",
        "startMs": 13210,
        "endMs": 13520,
        "isKeyword": false
      },
      {
        "word": "bờ",
        "startMs": 13520,
        "endMs": 13730,
        "isKeyword": false
      },
      {
        "word": "vực",
        "startMs": 13730,
        "endMs": 13990,
        "isKeyword": false
      },
      {
        "word": "phá",
        "startMs": 13990,
        "endMs": 14190,
        "isKeyword": true
      },
      {
        "word": "sản.",
        "startMs": 14190,
        "endMs": 14690,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 11,
    "sceneId": 3,
    "text": "Ông sinh năm 1955 tại",
    "startMs": 14690,
    "endMs": 16350,
    "words": [
      {
        "word": "Ông",
        "startMs": 14690,
        "endMs": 14960,
        "isKeyword": false
      },
      {
        "word": "sinh",
        "startMs": 14960,
        "endMs": 15110,
        "isKeyword": true
      },
      {
        "word": "năm",
        "startMs": 14960,
        "endMs": 15220,
        "isKeyword": true
      },
      {
        "word": "1955",
        "startMs": 15220,
        "endMs": 16020,
        "isKeyword": true
      },
      {
        "word": "tại",
        "startMs": 16020,
        "endMs": 16350,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 12,
    "sceneId": 3,
    "text": "San Francisco và được một",
    "startMs": 16350,
    "endMs": 17800,
    "words": [
      {
        "word": "San",
        "startMs": 16350,
        "endMs": 16550,
        "isKeyword": true
      },
      {
        "word": "Francisco",
        "startMs": 16550,
        "endMs": 17310,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 17310,
        "endMs": 17360,
        "isKeyword": false
      },
      {
        "word": "được",
        "startMs": 17360,
        "endMs": 17610,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 17610,
        "endMs": 17800,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 13,
    "sceneId": 3,
    "text": "cặp vợ chồng nhận nuôi",
    "startMs": 17800,
    "endMs": 18690,
    "words": [
      {
        "word": "cặp",
        "startMs": 17800,
        "endMs": 17970,
        "isKeyword": false
      },
      {
        "word": "vợ",
        "startMs": 17970,
        "endMs": 18120,
        "isKeyword": false
      },
      {
        "word": "chồng",
        "startMs": 18120,
        "endMs": 18300,
        "isKeyword": false
      },
      {
        "word": "nhận",
        "startMs": 18300,
        "endMs": 18520,
        "isKeyword": true
      },
      {
        "word": "nuôi",
        "startMs": 18520,
        "endMs": 18690,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 14,
    "sceneId": 3,
    "text": "ngay từ khi mới chào đời.",
    "startMs": 18690,
    "endMs": 19960,
    "words": [
      {
        "word": "ngay",
        "startMs": 18690,
        "endMs": 18920,
        "isKeyword": false
      },
      {
        "word": "từ",
        "startMs": 18920,
        "endMs": 19080,
        "isKeyword": false
      },
      {
        "word": "khi",
        "startMs": 19080,
        "endMs": 19150,
        "isKeyword": false
      },
      {
        "word": "mới",
        "startMs": 19150,
        "endMs": 19340,
        "isKeyword": false
      },
      {
        "word": "chào",
        "startMs": 19340,
        "endMs": 19520,
        "isKeyword": false
      },
      {
        "word": "đời.",
        "startMs": 19520,
        "endMs": 19960,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 15,
    "sceneId": 4,
    "text": "Lớn lên giữa Thung",
    "startMs": 19960,
    "endMs": 21060,
    "words": [
      {
        "word": "Lớn",
        "startMs": 19960,
        "endMs": 20320,
        "isKeyword": false
      },
      {
        "word": "lên",
        "startMs": 20320,
        "endMs": 20510,
        "isKeyword": false
      },
      {
        "word": "giữa",
        "startMs": 20510,
        "endMs": 20760,
        "isKeyword": false
      },
      {
        "word": "Thung",
        "startMs": 20760,
        "endMs": 21060,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 16,
    "sceneId": 4,
    "text": "lũng Silicon, cậu bé",
    "startMs": 21060,
    "endMs": 22210,
    "words": [
      {
        "word": "lũng",
        "startMs": 21060,
        "endMs": 21310,
        "isKeyword": false
      },
      {
        "word": "Silicon,",
        "startMs": 21310,
        "endMs": 21810,
        "isKeyword": true
      },
      {
        "word": "cậu",
        "startMs": 21810,
        "endMs": 22060,
        "isKeyword": false
      },
      {
        "word": "bé",
        "startMs": 22060,
        "endMs": 22210,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 17,
    "sceneId": 4,
    "text": "Steve sớm mê điện tử.",
    "startMs": 22210,
    "endMs": 23850,
    "words": [
      {
        "word": "Steve",
        "startMs": 22210,
        "endMs": 22600,
        "isKeyword": true
      },
      {
        "word": "sớm",
        "startMs": 22600,
        "endMs": 22810,
        "isKeyword": false
      },
      {
        "word": "mê",
        "startMs": 22810,
        "endMs": 22960,
        "isKeyword": false
      },
      {
        "word": "điện",
        "startMs": 22960,
        "endMs": 23310,
        "isKeyword": true
      },
      {
        "word": "tử.",
        "startMs": 23310,
        "endMs": 23850,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 18,
    "sceneId": 5,
    "text": "Vào đại học Reed, ông",
    "startMs": 23850,
    "endMs": 24900,
    "words": [
      {
        "word": "Vào",
        "startMs": 23850,
        "endMs": 23860,
        "isKeyword": false
      },
      {
        "word": "đại",
        "startMs": 23860,
        "endMs": 24160,
        "isKeyword": false
      },
      {
        "word": "học",
        "startMs": 24160,
        "endMs": 24410,
        "isKeyword": true
      },
      {
        "word": "Reed,",
        "startMs": 24410,
        "endMs": 24820,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 24820,
        "endMs": 24900,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 19,
    "sceneId": 5,
    "text": "bỏ học chỉ sau một",
    "startMs": 24900,
    "endMs": 25910,
    "words": [
      {
        "word": "bỏ",
        "startMs": 24900,
        "endMs": 25080,
        "isKeyword": true
      },
      {
        "word": "học",
        "startMs": 25080,
        "endMs": 25380,
        "isKeyword": true
      },
      {
        "word": "chỉ",
        "startMs": 25380,
        "endMs": 25540,
        "isKeyword": false
      },
      {
        "word": "sau",
        "startMs": 25540,
        "endMs": 25680,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 25680,
        "endMs": 25910,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 20,
    "sceneId": 5,
    "text": "học kỳ, nhưng vẫn ở",
    "startMs": 25910,
    "endMs": 26900,
    "words": [
      {
        "word": "học",
        "startMs": 25910,
        "endMs": 26140,
        "isKeyword": true
      },
      {
        "word": "kỳ,",
        "startMs": 26140,
        "endMs": 26360,
        "isKeyword": false
      },
      {
        "word": "nhưng",
        "startMs": 26360,
        "endMs": 26610,
        "isKeyword": false
      },
      {
        "word": "vẫn",
        "startMs": 26610,
        "endMs": 26780,
        "isKeyword": false
      },
      {
        "word": "ở",
        "startMs": 26780,
        "endMs": 26900,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 21,
    "sceneId": 5,
    "text": "lại dự thính những lớp",
    "startMs": 26900,
    "endMs": 28020,
    "words": [
      {
        "word": "lại",
        "startMs": 26900,
        "endMs": 27100,
        "isKeyword": false
      },
      {
        "word": "dự",
        "startMs": 27100,
        "endMs": 27290,
        "isKeyword": false
      },
      {
        "word": "thính",
        "startMs": 27290,
        "endMs": 27530,
        "isKeyword": false
      },
      {
        "word": "những",
        "startMs": 27530,
        "endMs": 27780,
        "isKeyword": false
      },
      {
        "word": "lớp",
        "startMs": 27780,
        "endMs": 28020,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 22,
    "sceneId": 5,
    "text": "mình thích, trong đó có lớp thư pháp.",
    "startMs": 28020,
    "endMs": 29960,
    "words": [
      {
        "word": "mình",
        "startMs": 28020,
        "endMs": 28170,
        "isKeyword": false
      },
      {
        "word": "thích,",
        "startMs": 28170,
        "endMs": 28650,
        "isKeyword": false
      },
      {
        "word": "trong",
        "startMs": 28650,
        "endMs": 28820,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 28820,
        "endMs": 29030,
        "isKeyword": false
      },
      {
        "word": "có",
        "startMs": 29030,
        "endMs": 29210,
        "isKeyword": false
      },
      {
        "word": "lớp",
        "startMs": 29210,
        "endMs": 29470,
        "isKeyword": false
      },
      {
        "word": "thư",
        "startMs": 29470,
        "endMs": 29650,
        "isKeyword": true
      },
      {
        "word": "pháp.",
        "startMs": 29650,
        "endMs": 29960,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 23,
    "sceneId": 6,
    "text": "Nhiều năm sau, chính lớp",
    "startMs": 29970,
    "endMs": 31240,
    "words": [
      {
        "word": "Nhiều",
        "startMs": 29970,
        "endMs": 30300,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 30300,
        "endMs": 30490,
        "isKeyword": true
      },
      {
        "word": "sau,",
        "startMs": 30490,
        "endMs": 30720,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 30720,
        "endMs": 31120,
        "isKeyword": false
      },
      {
        "word": "lớp",
        "startMs": 31120,
        "endMs": 31240,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 24,
    "sceneId": 6,
    "text": "học ấy giúp máy Macintosh",
    "startMs": 31240,
    "endMs": 32450,
    "words": [
      {
        "word": "học",
        "startMs": 31240,
        "endMs": 31480,
        "isKeyword": true
      },
      {
        "word": "ấy",
        "startMs": 31480,
        "endMs": 31670,
        "isKeyword": false
      },
      {
        "word": "giúp",
        "startMs": 31670,
        "endMs": 31850,
        "isKeyword": false
      },
      {
        "word": "máy",
        "startMs": 31850,
        "endMs": 32080,
        "isKeyword": false
      },
      {
        "word": "Macintosh",
        "startMs": 32080,
        "endMs": 32450,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 25,
    "sceneId": 6,
    "text": "có những kiểu chữ đẹp,",
    "startMs": 32450,
    "endMs": 34100,
    "words": [
      {
        "word": "có",
        "startMs": 32450,
        "endMs": 32590,
        "isKeyword": false
      },
      {
        "word": "những",
        "startMs": 32590,
        "endMs": 32930,
        "isKeyword": false
      },
      {
        "word": "kiểu",
        "startMs": 32930,
        "endMs": 33220,
        "isKeyword": true
      },
      {
        "word": "chữ",
        "startMs": 33220,
        "endMs": 33440,
        "isKeyword": true
      },
      {
        "word": "đẹp,",
        "startMs": 33440,
        "endMs": 34100,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 26,
    "sceneId": 6,
    "text": "điều mà máy tính thời đó chưa có.",
    "startMs": 34100,
    "endMs": 35720,
    "words": [
      {
        "word": "điều",
        "startMs": 34100,
        "endMs": 34260,
        "isKeyword": false
      },
      {
        "word": "mà",
        "startMs": 34260,
        "endMs": 34390,
        "isKeyword": false
      },
      {
        "word": "máy",
        "startMs": 34390,
        "endMs": 34600,
        "isKeyword": false
      },
      {
        "word": "tính",
        "startMs": 34600,
        "endMs": 34900,
        "isKeyword": false
      },
      {
        "word": "thời",
        "startMs": 34900,
        "endMs": 35150,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 35150,
        "endMs": 35320,
        "isKeyword": false
      },
      {
        "word": "chưa",
        "startMs": 35320,
        "endMs": 35540,
        "isKeyword": false
      },
      {
        "word": "có.",
        "startMs": 35540,
        "endMs": 35720,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 27,
    "sceneId": 7,
    "text": "Năm 1976, ông cùng",
    "startMs": 35720,
    "endMs": 37640,
    "words": [
      {
        "word": "Năm",
        "startMs": 35720,
        "endMs": 36000,
        "isKeyword": true
      },
      {
        "word": "1976,",
        "startMs": 36000,
        "endMs": 36850,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 36850,
        "endMs": 37100,
        "isKeyword": false
      },
      {
        "word": "cùng",
        "startMs": 37100,
        "endMs": 37640,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 28,
    "sceneId": 7,
    "text": "Steve Wozniak lập Apple",
    "startMs": 37640,
    "endMs": 38970,
    "words": [
      {
        "word": "Steve",
        "startMs": 37640,
        "endMs": 37720,
        "isKeyword": true
      },
      {
        "word": "Wozniak",
        "startMs": 37970,
        "endMs": 38340,
        "isKeyword": true
      },
      {
        "word": "lập",
        "startMs": 38340,
        "endMs": 38750,
        "isKeyword": false
      },
      {
        "word": "Apple",
        "startMs": 38750,
        "endMs": 38970,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 29,
    "sceneId": 7,
    "text": "trong ga-ra nhà mình.",
    "startMs": 38970,
    "endMs": 40430,
    "words": [
      {
        "word": "trong",
        "startMs": 38970,
        "endMs": 39270,
        "isKeyword": false
      },
      {
        "word": "ga-ra",
        "startMs": 39450,
        "endMs": 39570,
        "isKeyword": false
      },
      {
        "word": "nhà",
        "startMs": 39570,
        "endMs": 39820,
        "isKeyword": false
      },
      {
        "word": "mình.",
        "startMs": 39820,
        "endMs": 40430,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 30,
    "sceneId": 8,
    "text": "Máy Apple II ra mắt",
    "startMs": 40430,
    "endMs": 41640,
    "words": [
      {
        "word": "Máy",
        "startMs": 40430,
        "endMs": 40720,
        "isKeyword": false
      },
      {
        "word": "Apple",
        "startMs": 40720,
        "endMs": 41020,
        "isKeyword": true
      },
      {
        "word": "II",
        "startMs": 41020,
        "endMs": 41140,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 41140,
        "endMs": 41270,
        "isKeyword": false
      },
      {
        "word": "mắt",
        "startMs": 41270,
        "endMs": 41640,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 31,
    "sceneId": 8,
    "text": "năm 1977 và thành công",
    "startMs": 41640,
    "endMs": 43550,
    "words": [
      {
        "word": "năm",
        "startMs": 41640,
        "endMs": 41850,
        "isKeyword": true
      },
      {
        "word": "1977",
        "startMs": 41850,
        "endMs": 42640,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 42640,
        "endMs": 42830,
        "isKeyword": false
      },
      {
        "word": "thành",
        "startMs": 42830,
        "endMs": 43230,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 43230,
        "endMs": 43550,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 32,
    "sceneId": 8,
    "text": "lớn, đến năm 1980 Apple",
    "startMs": 43550,
    "endMs": 45340,
    "words": [
      {
        "word": "lớn,",
        "startMs": 43550,
        "endMs": 43960,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 43960,
        "endMs": 44260,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 44260,
        "endMs": 44460,
        "isKeyword": true
      },
      {
        "word": "1980",
        "startMs": 44460,
        "endMs": 45080,
        "isKeyword": true
      },
      {
        "word": "Apple",
        "startMs": 45080,
        "endMs": 45340,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 33,
    "sceneId": 8,
    "text": "lên sàn chứng khoán, biến",
    "startMs": 45340,
    "endMs": 46920,
    "words": [
      {
        "word": "lên",
        "startMs": 45340,
        "endMs": 45540,
        "isKeyword": false
      },
      {
        "word": "sàn",
        "startMs": 45540,
        "endMs": 45790,
        "isKeyword": false
      },
      {
        "word": "chứng",
        "startMs": 45790,
        "endMs": 46150,
        "isKeyword": false
      },
      {
        "word": "khoán,",
        "startMs": 46150,
        "endMs": 46550,
        "isKeyword": false
      },
      {
        "word": "biến",
        "startMs": 46550,
        "endMs": 46920,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 34,
    "sceneId": 8,
    "text": "ông thành triệu phú ở tuổi 25.",
    "startMs": 46920,
    "endMs": 48820,
    "words": [
      {
        "word": "ông",
        "startMs": 46920,
        "endMs": 47050,
        "isKeyword": false
      },
      {
        "word": "thành",
        "startMs": 47050,
        "endMs": 47360,
        "isKeyword": false
      },
      {
        "word": "triệu",
        "startMs": 47360,
        "endMs": 47710,
        "isKeyword": true
      },
      {
        "word": "phú",
        "startMs": 47710,
        "endMs": 47910,
        "isKeyword": true
      },
      {
        "word": "ở",
        "startMs": 47910,
        "endMs": 48060,
        "isKeyword": false
      },
      {
        "word": "tuổi",
        "startMs": 48060,
        "endMs": 48360,
        "isKeyword": false
      },
      {
        "word": "25.",
        "startMs": 48360,
        "endMs": 48820,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 35,
    "sceneId": 9,
    "text": "Năm 1984, Macintosh ra đời,",
    "startMs": 48820,
    "endMs": 50990,
    "words": [
      {
        "word": "Năm",
        "startMs": 48820,
        "endMs": 49160,
        "isKeyword": true
      },
      {
        "word": "1984,",
        "startMs": 49160,
        "endMs": 49720,
        "isKeyword": true
      },
      {
        "word": "Macintosh",
        "startMs": 49720,
        "endMs": 50120,
        "isKeyword": true
      },
      {
        "word": "ra",
        "startMs": 50120,
        "endMs": 50220,
        "isKeyword": false
      },
      {
        "word": "đời,",
        "startMs": 50220,
        "endMs": 50990,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 36,
    "sceneId": 9,
    "text": "chiếc máy tính đưa giao",
    "startMs": 50990,
    "endMs": 52190,
    "words": [
      {
        "word": "chiếc",
        "startMs": 50990,
        "endMs": 51020,
        "isKeyword": false
      },
      {
        "word": "máy",
        "startMs": 51020,
        "endMs": 51290,
        "isKeyword": false
      },
      {
        "word": "tính",
        "startMs": 51290,
        "endMs": 51620,
        "isKeyword": false
      },
      {
        "word": "đưa",
        "startMs": 51620,
        "endMs": 51870,
        "isKeyword": false
      },
      {
        "word": "giao",
        "startMs": 51870,
        "endMs": 52190,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 37,
    "sceneId": 9,
    "text": "diện đồ họa và con",
    "startMs": 52190,
    "endMs": 53240,
    "words": [
      {
        "word": "diện",
        "startMs": 52190,
        "endMs": 52420,
        "isKeyword": false
      },
      {
        "word": "đồ",
        "startMs": 52420,
        "endMs": 52670,
        "isKeyword": false
      },
      {
        "word": "họa",
        "startMs": 52670,
        "endMs": 52930,
        "isKeyword": false
      },
      {
        "word": "và",
        "startMs": 52930,
        "endMs": 53070,
        "isKeyword": false
      },
      {
        "word": "con",
        "startMs": 53070,
        "endMs": 53240,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 38,
    "sceneId": 9,
    "text": "chuột đến với đông đảo công chúng.",
    "startMs": 53240,
    "endMs": 55570,
    "words": [
      {
        "word": "chuột",
        "startMs": 53240,
        "endMs": 53590,
        "isKeyword": true
      },
      {
        "word": "đến",
        "startMs": 53590,
        "endMs": 53870,
        "isKeyword": false
      },
      {
        "word": "với",
        "startMs": 53870,
        "endMs": 54220,
        "isKeyword": false
      },
      {
        "word": "đông",
        "startMs": 54220,
        "endMs": 54420,
        "isKeyword": false
      },
      {
        "word": "đảo",
        "startMs": 54420,
        "endMs": 54720,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 54720,
        "endMs": 54970,
        "isKeyword": false
      },
      {
        "word": "chúng.",
        "startMs": 54970,
        "endMs": 55570,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 39,
    "sceneId": 10,
    "text": "Ông mời John Sculley từ Pepsi",
    "startMs": 55570,
    "endMs": 57230,
    "words": [
      {
        "word": "Ông",
        "startMs": 55570,
        "endMs": 55730,
        "isKeyword": false
      },
      {
        "word": "mời",
        "startMs": 55730,
        "endMs": 56040,
        "isKeyword": false
      },
      {
        "word": "John",
        "startMs": 56040,
        "endMs": 56290,
        "isKeyword": false
      },
      {
        "word": "Sculley",
        "startMs": 56290,
        "endMs": 56700,
        "isKeyword": true
      },
      {
        "word": "từ",
        "startMs": 56700,
        "endMs": 56920,
        "isKeyword": false
      },
      {
        "word": "Pepsi",
        "startMs": 56920,
        "endMs": 57230,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 40,
    "sceneId": 10,
    "text": "về làm CEO, với một câu",
    "startMs": 57230,
    "endMs": 58560,
    "words": [
      {
        "word": "về",
        "startMs": 57230,
        "endMs": 57480,
        "isKeyword": false
      },
      {
        "word": "làm",
        "startMs": 57480,
        "endMs": 57730,
        "isKeyword": false
      },
      {
        "word": "CEO,",
        "startMs": 57730,
        "endMs": 58000,
        "isKeyword": true
      },
      {
        "word": "với",
        "startMs": 58000,
        "endMs": 58270,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 58270,
        "endMs": 58400,
        "isKeyword": false
      },
      {
        "word": "câu",
        "startMs": 58400,
        "endMs": 58560,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 41,
    "sceneId": 10,
    "text": "hỏi được kể lại rất nổi",
    "startMs": 58560,
    "endMs": 59850,
    "words": [
      {
        "word": "hỏi",
        "startMs": 58560,
        "endMs": 58760,
        "isKeyword": false
      },
      {
        "word": "được",
        "startMs": 58760,
        "endMs": 59090,
        "isKeyword": false
      },
      {
        "word": "kể",
        "startMs": 59090,
        "endMs": 59250,
        "isKeyword": false
      },
      {
        "word": "lại",
        "startMs": 59250,
        "endMs": 59450,
        "isKeyword": false
      },
      {
        "word": "rất",
        "startMs": 59450,
        "endMs": 59650,
        "isKeyword": false
      },
      {
        "word": "nổi",
        "startMs": 59650,
        "endMs": 59850,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 42,
    "sceneId": 10,
    "text": "tiếng: muốn bán nước ngọt cả",
    "startMs": 59850,
    "endMs": 61300,
    "words": [
      {
        "word": "tiếng:",
        "startMs": 59850,
        "endMs": 60390,
        "isKeyword": false
      },
      {
        "word": "muốn",
        "startMs": 60390,
        "endMs": 60450,
        "isKeyword": false
      },
      {
        "word": "bán",
        "startMs": 60450,
        "endMs": 60610,
        "isKeyword": false
      },
      {
        "word": "nước",
        "startMs": 60610,
        "endMs": 60900,
        "isKeyword": true
      },
      {
        "word": "ngọt",
        "startMs": 60900,
        "endMs": 61140,
        "isKeyword": true
      },
      {
        "word": "cả",
        "startMs": 61140,
        "endMs": 61300,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 43,
    "sceneId": 10,
    "text": "đời, hay cùng thay đổi thế giới?",
    "startMs": 61300,
    "endMs": 63080,
    "words": [
      {
        "word": "đời,",
        "startMs": 61300,
        "endMs": 61620,
        "isKeyword": false
      },
      {
        "word": "hay",
        "startMs": 61620,
        "endMs": 61890,
        "isKeyword": false
      },
      {
        "word": "cùng",
        "startMs": 61890,
        "endMs": 61940,
        "isKeyword": false
      },
      {
        "word": "thay",
        "startMs": 61940,
        "endMs": 62100,
        "isKeyword": false
      },
      {
        "word": "đổi",
        "startMs": 62100,
        "endMs": 62340,
        "isKeyword": false
      },
      {
        "word": "thế",
        "startMs": 62340,
        "endMs": 62540,
        "isKeyword": false
      },
      {
        "word": "giới?",
        "startMs": 62540,
        "endMs": 63080,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 44,
    "sceneId": 11,
    "text": "Nhưng chính Sculley lại là",
    "startMs": 63080,
    "endMs": 64140,
    "words": [
      {
        "word": "Nhưng",
        "startMs": 63080,
        "endMs": 63420,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 63420,
        "endMs": 63570,
        "isKeyword": false
      },
      {
        "word": "Sculley",
        "startMs": 63570,
        "endMs": 63910,
        "isKeyword": true
      },
      {
        "word": "lại",
        "startMs": 63910,
        "endMs": 64020,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 64020,
        "endMs": 64140,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 45,
    "sceneId": 11,
    "text": "người đứng về phía hội",
    "startMs": 64140,
    "endMs": 65400,
    "words": [
      {
        "word": "người",
        "startMs": 64140,
        "endMs": 64490,
        "isKeyword": false
      },
      {
        "word": "đứng",
        "startMs": 64490,
        "endMs": 64760,
        "isKeyword": false
      },
      {
        "word": "về",
        "startMs": 64760,
        "endMs": 64920,
        "isKeyword": false
      },
      {
        "word": "phía",
        "startMs": 64920,
        "endMs": 65120,
        "isKeyword": false
      },
      {
        "word": "hội",
        "startMs": 65120,
        "endMs": 65400,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 46,
    "sceneId": 11,
    "text": "đồng quản trị trong cuộc",
    "startMs": 65400,
    "endMs": 66610,
    "words": [
      {
        "word": "đồng",
        "startMs": 65400,
        "endMs": 65610,
        "isKeyword": false
      },
      {
        "word": "quản",
        "startMs": 65610,
        "endMs": 65850,
        "isKeyword": false
      },
      {
        "word": "trị",
        "startMs": 65850,
        "endMs": 66050,
        "isKeyword": false
      },
      {
        "word": "trong",
        "startMs": 66050,
        "endMs": 66510,
        "isKeyword": false
      },
      {
        "word": "cuộc",
        "startMs": 66510,
        "endMs": 66610,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 47,
    "sceneId": 11,
    "text": "tranh giành quyền lực. Năm",
    "startMs": 66510,
    "endMs": 68110,
    "words": [
      {
        "word": "tranh",
        "startMs": 66510,
        "endMs": 66710,
        "isKeyword": false
      },
      {
        "word": "giành",
        "startMs": 66710,
        "endMs": 66910,
        "isKeyword": false
      },
      {
        "word": "quyền",
        "startMs": 66910,
        "endMs": 67210,
        "isKeyword": false
      },
      {
        "word": "lực.",
        "startMs": 67210,
        "endMs": 67770,
        "isKeyword": false
      },
      {
        "word": "Năm",
        "startMs": 67770,
        "endMs": 68110,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 48,
    "sceneId": 11,
    "text": "1985, Jobs bị đẩy khỏi",
    "startMs": 68110,
    "endMs": 69990,
    "words": [
      {
        "word": "1985,",
        "startMs": 68110,
        "endMs": 69250,
        "isKeyword": true
      },
      {
        "word": "Jobs",
        "startMs": 69250,
        "endMs": 69430,
        "isKeyword": true
      },
      {
        "word": "bị",
        "startMs": 69430,
        "endMs": 69580,
        "isKeyword": false
      },
      {
        "word": "đẩy",
        "startMs": 69580,
        "endMs": 69770,
        "isKeyword": false
      },
      {
        "word": "khỏi",
        "startMs": 69770,
        "endMs": 69990,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 49,
    "sceneId": 11,
    "text": "vị trí điều hành công ty do mình sáng lập.",
    "startMs": 69990,
    "endMs": 71920,
    "words": [
      {
        "word": "vị",
        "startMs": 69990,
        "endMs": 70140,
        "isKeyword": false
      },
      {
        "word": "trí",
        "startMs": 70140,
        "endMs": 70280,
        "isKeyword": false
      },
      {
        "word": "điều",
        "startMs": 70280,
        "endMs": 70550,
        "isKeyword": false
      },
      {
        "word": "hành",
        "startMs": 70550,
        "endMs": 70730,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 70730,
        "endMs": 70920,
        "isKeyword": false
      },
      {
        "word": "ty",
        "startMs": 70920,
        "endMs": 71080,
        "isKeyword": false
      },
      {
        "word": "do",
        "startMs": 71080,
        "endMs": 71150,
        "isKeyword": false
      },
      {
        "word": "mình",
        "startMs": 71150,
        "endMs": 71360,
        "isKeyword": false
      },
      {
        "word": "sáng",
        "startMs": 71360,
        "endMs": 71520,
        "isKeyword": false
      },
      {
        "word": "lập.",
        "startMs": 71520,
        "endMs": 71920,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 50,
    "sceneId": 12,
    "text": "Ông rời Apple và",
    "startMs": 71920,
    "endMs": 72650,
    "words": [
      {
        "word": "Ông",
        "startMs": 71920,
        "endMs": 72090,
        "isKeyword": false
      },
      {
        "word": "rời",
        "startMs": 72090,
        "endMs": 72310,
        "isKeyword": false
      },
      {
        "word": "Apple",
        "startMs": 72310,
        "endMs": 72520,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 72520,
        "endMs": 72650,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 51,
    "sceneId": 12,
    "text": "lập NeXT, một công",
    "startMs": 72650,
    "endMs": 73550,
    "words": [
      {
        "word": "lập",
        "startMs": 72650,
        "endMs": 72930,
        "isKeyword": false
      },
      {
        "word": "NeXT,",
        "startMs": 72930,
        "endMs": 73110,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 73110,
        "endMs": 73330,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 73330,
        "endMs": 73550,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 52,
    "sceneId": 12,
    "text": "ty máy tính hướng",
    "startMs": 73550,
    "endMs": 74490,
    "words": [
      {
        "word": "ty",
        "startMs": 73550,
        "endMs": 73630,
        "isKeyword": false
      },
      {
        "word": "máy",
        "startMs": 73630,
        "endMs": 73840,
        "isKeyword": false
      },
      {
        "word": "tính",
        "startMs": 73840,
        "endMs": 74160,
        "isKeyword": false
      },
      {
        "word": "hướng",
        "startMs": 74160,
        "endMs": 74490,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 53,
    "sceneId": 12,
    "text": "đến giáo dục và doanh nghiệp.",
    "startMs": 74490,
    "endMs": 76160,
    "words": [
      {
        "word": "đến",
        "startMs": 74490,
        "endMs": 74740,
        "isKeyword": false
      },
      {
        "word": "giáo",
        "startMs": 74740,
        "endMs": 74950,
        "isKeyword": false
      },
      {
        "word": "dục",
        "startMs": 74950,
        "endMs": 75160,
        "isKeyword": false
      },
      {
        "word": "và",
        "startMs": 75160,
        "endMs": 75370,
        "isKeyword": false
      },
      {
        "word": "doanh",
        "startMs": 75370,
        "endMs": 75500,
        "isKeyword": false
      },
      {
        "word": "nghiệp.",
        "startMs": 75500,
        "endMs": 76160,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 54,
    "sceneId": 13,
    "text": "Năm 1986, ông mua bộ",
    "startMs": 76160,
    "endMs": 77730,
    "words": [
      {
        "word": "Năm",
        "startMs": 76160,
        "endMs": 76370,
        "isKeyword": true
      },
      {
        "word": "1986,",
        "startMs": 76370,
        "endMs": 77150,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 77150,
        "endMs": 77400,
        "isKeyword": false
      },
      {
        "word": "mua",
        "startMs": 77400,
        "endMs": 77530,
        "isKeyword": false
      },
      {
        "word": "bộ",
        "startMs": 77530,
        "endMs": 77730,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 55,
    "sceneId": 13,
    "text": "phận đồ họa của Lucasfilm",
    "startMs": 77730,
    "endMs": 79390,
    "words": [
      {
        "word": "phận",
        "startMs": 77730,
        "endMs": 78010,
        "isKeyword": false
      },
      {
        "word": "đồ",
        "startMs": 78010,
        "endMs": 78280,
        "isKeyword": false
      },
      {
        "word": "họa",
        "startMs": 78280,
        "endMs": 78550,
        "isKeyword": false
      },
      {
        "word": "của",
        "startMs": 78550,
        "endMs": 78950,
        "isKeyword": false
      },
      {
        "word": "Lucasfilm",
        "startMs": 78950,
        "endMs": 79390,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 56,
    "sceneId": 13,
    "text": "với giá khoảng 5 triệu",
    "startMs": 79390,
    "endMs": 80840,
    "words": [
      {
        "word": "với",
        "startMs": 79390,
        "endMs": 79720,
        "isKeyword": false
      },
      {
        "word": "giá",
        "startMs": 79720,
        "endMs": 79900,
        "isKeyword": false
      },
      {
        "word": "khoảng",
        "startMs": 79900,
        "endMs": 80280,
        "isKeyword": false
      },
      {
        "word": "5",
        "startMs": 80280,
        "endMs": 80450,
        "isKeyword": true
      },
      {
        "word": "triệu",
        "startMs": 80450,
        "endMs": 80840,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 57,
    "sceneId": 13,
    "text": "đô la, sau này trở thành Pixar.",
    "startMs": 80840,
    "endMs": 82890,
    "words": [
      {
        "word": "đô",
        "startMs": 80840,
        "endMs": 81060,
        "isKeyword": true
      },
      {
        "word": "la,",
        "startMs": 81060,
        "endMs": 81510,
        "isKeyword": true
      },
      {
        "word": "sau",
        "startMs": 81510,
        "endMs": 81580,
        "isKeyword": false
      },
      {
        "word": "này",
        "startMs": 81580,
        "endMs": 81790,
        "isKeyword": false
      },
      {
        "word": "trở",
        "startMs": 81790,
        "endMs": 82040,
        "isKeyword": false
      },
      {
        "word": "thành",
        "startMs": 82040,
        "endMs": 82340,
        "isKeyword": false
      },
      {
        "word": "Pixar.",
        "startMs": 82340,
        "endMs": 82890,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 58,
    "sceneId": 14,
    "text": "Nhiều năm liền công ty",
    "startMs": 82890,
    "endMs": 83880,
    "words": [
      {
        "word": "Nhiều",
        "startMs": 82890,
        "endMs": 83090,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 83090,
        "endMs": 83280,
        "isKeyword": true
      },
      {
        "word": "liền",
        "startMs": 83280,
        "endMs": 83560,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 83560,
        "endMs": 83790,
        "isKeyword": false
      },
      {
        "word": "ty",
        "startMs": 83790,
        "endMs": 83880,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 59,
    "sceneId": 14,
    "text": "thua lỗ, cho đến năm",
    "startMs": 83880,
    "endMs": 85020,
    "words": [
      {
        "word": "thua",
        "startMs": 83880,
        "endMs": 84020,
        "isKeyword": false
      },
      {
        "word": "lỗ,",
        "startMs": 84020,
        "endMs": 84280,
        "isKeyword": false
      },
      {
        "word": "cho",
        "startMs": 84280,
        "endMs": 84530,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 84530,
        "endMs": 84790,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 84790,
        "endMs": 85020,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 60,
    "sceneId": 14,
    "text": "1995, Toy Story ra mắt,",
    "startMs": 85020,
    "endMs": 86890,
    "words": [
      {
        "word": "1995,",
        "startMs": 85020,
        "endMs": 85820,
        "isKeyword": true
      },
      {
        "word": "Toy",
        "startMs": 85820,
        "endMs": 86280,
        "isKeyword": true
      },
      {
        "word": "Story",
        "startMs": 86280,
        "endMs": 86380,
        "isKeyword": true
      },
      {
        "word": "ra",
        "startMs": 86280,
        "endMs": 86540,
        "isKeyword": false
      },
      {
        "word": "mắt,",
        "startMs": 86540,
        "endMs": 86890,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 61,
    "sceneId": 14,
    "text": "bộ phim hoạt hình dài",
    "startMs": 86890,
    "endMs": 88170,
    "words": [
      {
        "word": "bộ",
        "startMs": 86890,
        "endMs": 87100,
        "isKeyword": false
      },
      {
        "word": "phim",
        "startMs": 87100,
        "endMs": 87430,
        "isKeyword": false
      },
      {
        "word": "hoạt",
        "startMs": 87430,
        "endMs": 87670,
        "isKeyword": false
      },
      {
        "word": "hình",
        "startMs": 87670,
        "endMs": 87950,
        "isKeyword": false
      },
      {
        "word": "dài",
        "startMs": 87950,
        "endMs": 88170,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 62,
    "sceneId": 14,
    "text": "đầu tiên làm hoàn toàn",
    "startMs": 88170,
    "endMs": 89520,
    "words": [
      {
        "word": "đầu",
        "startMs": 88170,
        "endMs": 88510,
        "isKeyword": false
      },
      {
        "word": "tiên",
        "startMs": 88510,
        "endMs": 89040,
        "isKeyword": false
      },
      {
        "word": "làm",
        "startMs": 89040,
        "endMs": 89180,
        "isKeyword": false
      },
      {
        "word": "hoàn",
        "startMs": 89180,
        "endMs": 89350,
        "isKeyword": false
      },
      {
        "word": "toàn",
        "startMs": 89350,
        "endMs": 89520,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 63,
    "sceneId": 14,
    "text": "bằng máy tính, và Pixar lên sàn chứng khoán.",
    "startMs": 89520,
    "endMs": 92020,
    "words": [
      {
        "word": "bằng",
        "startMs": 89520,
        "endMs": 89720,
        "isKeyword": false
      },
      {
        "word": "máy",
        "startMs": 89720,
        "endMs": 89880,
        "isKeyword": false
      },
      {
        "word": "tính,",
        "startMs": 89880,
        "endMs": 90160,
        "isKeyword": false
      },
      {
        "word": "và",
        "startMs": 90160,
        "endMs": 90330,
        "isKeyword": false
      },
      {
        "word": "Pixar",
        "startMs": 90330,
        "endMs": 90600,
        "isKeyword": true
      },
      {
        "word": "lên",
        "startMs": 90600,
        "endMs": 90820,
        "isKeyword": false
      },
      {
        "word": "sàn",
        "startMs": 90820,
        "endMs": 91100,
        "isKeyword": false
      },
      {
        "word": "chứng",
        "startMs": 91100,
        "endMs": 91470,
        "isKeyword": false
      },
      {
        "word": "khoán.",
        "startMs": 91470,
        "endMs": 92020,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 64,
    "sceneId": 15,
    "text": "Trong lúc đó, Apple sa sút",
    "startMs": 92020,
    "endMs": 93490,
    "words": [
      {
        "word": "Trong",
        "startMs": 92020,
        "endMs": 92260,
        "isKeyword": false
      },
      {
        "word": "lúc",
        "startMs": 92260,
        "endMs": 92460,
        "isKeyword": false
      },
      {
        "word": "đó,",
        "startMs": 92460,
        "endMs": 92800,
        "isKeyword": false
      },
      {
        "word": "Apple",
        "startMs": 92800,
        "endMs": 93070,
        "isKeyword": true
      },
      {
        "word": "sa",
        "startMs": 93070,
        "endMs": 93200,
        "isKeyword": true
      },
      {
        "word": "sút",
        "startMs": 93200,
        "endMs": 93490,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 65,
    "sceneId": 15,
    "text": "và đứng gần bờ vực phá",
    "startMs": 93490,
    "endMs": 94820,
    "words": [
      {
        "word": "và",
        "startMs": 93490,
        "endMs": 93690,
        "isKeyword": false
      },
      {
        "word": "đứng",
        "startMs": 93690,
        "endMs": 93910,
        "isKeyword": false
      },
      {
        "word": "gần",
        "startMs": 93910,
        "endMs": 94130,
        "isKeyword": false
      },
      {
        "word": "bờ",
        "startMs": 94130,
        "endMs": 94340,
        "isKeyword": false
      },
      {
        "word": "vực",
        "startMs": 94340,
        "endMs": 94560,
        "isKeyword": false
      },
      {
        "word": "phá",
        "startMs": 94560,
        "endMs": 94820,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 66,
    "sceneId": 15,
    "text": "sản. Năm 1997, Apple mua lại",
    "startMs": 94820,
    "endMs": 97210,
    "words": [
      {
        "word": "sản.",
        "startMs": 94820,
        "endMs": 95240,
        "isKeyword": true
      },
      {
        "word": "Năm",
        "startMs": 95240,
        "endMs": 95560,
        "isKeyword": true
      },
      {
        "word": "1997,",
        "startMs": 95560,
        "endMs": 96390,
        "isKeyword": true
      },
      {
        "word": "Apple",
        "startMs": 96390,
        "endMs": 96680,
        "isKeyword": true
      },
      {
        "word": "mua",
        "startMs": 96680,
        "endMs": 97050,
        "isKeyword": false
      },
      {
        "word": "lại",
        "startMs": 97050,
        "endMs": 97210,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 67,
    "sceneId": 15,
    "text": "NeXT với giá khoảng 400 triệu",
    "startMs": 97210,
    "endMs": 99480,
    "words": [
      {
        "word": "NeXT",
        "startMs": 97210,
        "endMs": 97420,
        "isKeyword": true
      },
      {
        "word": "với",
        "startMs": 97420,
        "endMs": 97730,
        "isKeyword": false
      },
      {
        "word": "giá",
        "startMs": 97730,
        "endMs": 97970,
        "isKeyword": false
      },
      {
        "word": "khoảng",
        "startMs": 97970,
        "endMs": 98470,
        "isKeyword": false
      },
      {
        "word": "400",
        "startMs": 98470,
        "endMs": 99040,
        "isKeyword": true
      },
      {
        "word": "triệu",
        "startMs": 99040,
        "endMs": 99480,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 68,
    "sceneId": 15,
    "text": "đô la, và Jobs trở về.",
    "startMs": 99480,
    "endMs": 101200,
    "words": [
      {
        "word": "đô",
        "startMs": 99480,
        "endMs": 99840,
        "isKeyword": true
      },
      {
        "word": "la,",
        "startMs": 99840,
        "endMs": 100080,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 100080,
        "endMs": 100190,
        "isKeyword": false
      },
      {
        "word": "Jobs",
        "startMs": 100190,
        "endMs": 100420,
        "isKeyword": true
      },
      {
        "word": "trở",
        "startMs": 100420,
        "endMs": 100650,
        "isKeyword": false
      },
      {
        "word": "về.",
        "startMs": 100650,
        "endMs": 101200,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 69,
    "sceneId": 16,
    "text": "Ông cắt giảm mạnh số lượng",
    "startMs": 101200,
    "endMs": 102250,
    "words": [
      {
        "word": "Ông",
        "startMs": 101200,
        "endMs": 101210,
        "isKeyword": false
      },
      {
        "word": "cắt",
        "startMs": 101210,
        "endMs": 101370,
        "isKeyword": false
      },
      {
        "word": "giảm",
        "startMs": 101370,
        "endMs": 101550,
        "isKeyword": false
      },
      {
        "word": "mạnh",
        "startMs": 101550,
        "endMs": 101810,
        "isKeyword": false
      },
      {
        "word": "số",
        "startMs": 101810,
        "endMs": 101940,
        "isKeyword": false
      },
      {
        "word": "lượng",
        "startMs": 101940,
        "endMs": 102250,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 70,
    "sceneId": 16,
    "text": "sản phẩm, và bắt tay với",
    "startMs": 102250,
    "endMs": 103410,
    "words": [
      {
        "word": "sản",
        "startMs": 102250,
        "endMs": 102440,
        "isKeyword": true
      },
      {
        "word": "phẩm,",
        "startMs": 102440,
        "endMs": 102850,
        "isKeyword": false
      },
      {
        "word": "và",
        "startMs": 102850,
        "endMs": 102860,
        "isKeyword": false
      },
      {
        "word": "bắt",
        "startMs": 102860,
        "endMs": 103060,
        "isKeyword": false
      },
      {
        "word": "tay",
        "startMs": 103060,
        "endMs": 103190,
        "isKeyword": false
      },
      {
        "word": "với",
        "startMs": 103190,
        "endMs": 103410,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 71,
    "sceneId": 16,
    "text": "chính đối thủ Microsoft, nhận khoản",
    "startMs": 103410,
    "endMs": 105260,
    "words": [
      {
        "word": "chính",
        "startMs": 103410,
        "endMs": 103670,
        "isKeyword": false
      },
      {
        "word": "đối",
        "startMs": 103670,
        "endMs": 103920,
        "isKeyword": false
      },
      {
        "word": "thủ",
        "startMs": 103920,
        "endMs": 104150,
        "isKeyword": false
      },
      {
        "word": "Microsoft,",
        "startMs": 104150,
        "endMs": 104590,
        "isKeyword": true
      },
      {
        "word": "nhận",
        "startMs": 104590,
        "endMs": 104890,
        "isKeyword": true
      },
      {
        "word": "khoản",
        "startMs": 104890,
        "endMs": 105260,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 72,
    "sceneId": 16,
    "text": "đầu tư 150 triệu đô la.",
    "startMs": 105260,
    "endMs": 107000,
    "words": [
      {
        "word": "đầu",
        "startMs": 105260,
        "endMs": 105550,
        "isKeyword": false
      },
      {
        "word": "tư",
        "startMs": 105550,
        "endMs": 105700,
        "isKeyword": false
      },
      {
        "word": "150",
        "startMs": 105700,
        "endMs": 106150,
        "isKeyword": true
      },
      {
        "word": "triệu",
        "startMs": 106150,
        "endMs": 106460,
        "isKeyword": true
      },
      {
        "word": "đô",
        "startMs": 106460,
        "endMs": 106640,
        "isKeyword": true
      },
      {
        "word": "la.",
        "startMs": 106640,
        "endMs": 107000,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 73,
    "sceneId": 17,
    "text": "Năm 1998, chiếc iMac",
    "startMs": 107210,
    "endMs": 109030,
    "words": [
      {
        "word": "Năm",
        "startMs": 107210,
        "endMs": 107250,
        "isKeyword": true
      },
      {
        "word": "1998,",
        "startMs": 107250,
        "endMs": 108140,
        "isKeyword": true
      },
      {
        "word": "chiếc",
        "startMs": 108140,
        "endMs": 108700,
        "isKeyword": false
      },
      {
        "word": "iMac",
        "startMs": 108700,
        "endMs": 109030,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 74,
    "sceneId": 17,
    "text": "nhiều màu sắc ra",
    "startMs": 109030,
    "endMs": 110260,
    "words": [
      {
        "word": "nhiều",
        "startMs": 109030,
        "endMs": 109490,
        "isKeyword": false
      },
      {
        "word": "màu",
        "startMs": 109490,
        "endMs": 109710,
        "isKeyword": false
      },
      {
        "word": "sắc",
        "startMs": 109710,
        "endMs": 110040,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 110040,
        "endMs": 110260,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 75,
    "sceneId": 17,
    "text": "mắt và giúp Apple hồi sinh.",
    "startMs": 110260,
    "endMs": 112070,
    "words": [
      {
        "word": "mắt",
        "startMs": 110260,
        "endMs": 110570,
        "isKeyword": false
      },
      {
        "word": "và",
        "startMs": 110570,
        "endMs": 110760,
        "isKeyword": false
      },
      {
        "word": "giúp",
        "startMs": 110760,
        "endMs": 111080,
        "isKeyword": false
      },
      {
        "word": "Apple",
        "startMs": 111080,
        "endMs": 111400,
        "isKeyword": true
      },
      {
        "word": "hồi",
        "startMs": 111400,
        "endMs": 111890,
        "isKeyword": true
      },
      {
        "word": "sinh.",
        "startMs": 111890,
        "endMs": 112070,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 76,
    "sceneId": 18,
    "text": "Năm 2001, iPod xuất hiện,",
    "startMs": 112070,
    "endMs": 114150,
    "words": [
      {
        "word": "Năm",
        "startMs": 112070,
        "endMs": 112320,
        "isKeyword": true
      },
      {
        "word": "2001,",
        "startMs": 112320,
        "endMs": 113400,
        "isKeyword": true
      },
      {
        "word": "iPod",
        "startMs": 113400,
        "endMs": 113610,
        "isKeyword": true
      },
      {
        "word": "xuất",
        "startMs": 113610,
        "endMs": 113820,
        "isKeyword": false
      },
      {
        "word": "hiện,",
        "startMs": 113820,
        "endMs": 114150,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 77,
    "sceneId": 18,
    "text": "biến cả một thư viện",
    "startMs": 114150,
    "endMs": 115210,
    "words": [
      {
        "word": "biến",
        "startMs": 114150,
        "endMs": 114410,
        "isKeyword": false
      },
      {
        "word": "cả",
        "startMs": 114410,
        "endMs": 114580,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 114580,
        "endMs": 114850,
        "isKeyword": false
      },
      {
        "word": "thư",
        "startMs": 114850,
        "endMs": 114960,
        "isKeyword": true
      },
      {
        "word": "viện",
        "startMs": 114960,
        "endMs": 115210,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 78,
    "sceneId": 18,
    "text": "âm nhạc thành thứ nằm",
    "startMs": 115210,
    "endMs": 116190,
    "words": [
      {
        "word": "âm",
        "startMs": 115210,
        "endMs": 115330,
        "isKeyword": false
      },
      {
        "word": "nhạc",
        "startMs": 115330,
        "endMs": 115590,
        "isKeyword": true
      },
      {
        "word": "thành",
        "startMs": 115590,
        "endMs": 115840,
        "isKeyword": false
      },
      {
        "word": "thứ",
        "startMs": 115840,
        "endMs": 116060,
        "isKeyword": false
      },
      {
        "word": "nằm",
        "startMs": 116060,
        "endMs": 116190,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 79,
    "sceneId": 18,
    "text": "gọn trong túi áo. Năm",
    "startMs": 116190,
    "endMs": 117520,
    "words": [
      {
        "word": "gọn",
        "startMs": 116190,
        "endMs": 116400,
        "isKeyword": false
      },
      {
        "word": "trong",
        "startMs": 116400,
        "endMs": 116620,
        "isKeyword": false
      },
      {
        "word": "túi",
        "startMs": 116620,
        "endMs": 116870,
        "isKeyword": true
      },
      {
        "word": "áo.",
        "startMs": 116870,
        "endMs": 117280,
        "isKeyword": true
      },
      {
        "word": "Năm",
        "startMs": 117280,
        "endMs": 117520,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 80,
    "sceneId": 18,
    "text": "2003, cửa hàng iTunes mở",
    "startMs": 117520,
    "endMs": 119560,
    "words": [
      {
        "word": "2003,",
        "startMs": 117520,
        "endMs": 118350,
        "isKeyword": true
      },
      {
        "word": "cửa",
        "startMs": 118350,
        "endMs": 118660,
        "isKeyword": false
      },
      {
        "word": "hàng",
        "startMs": 118660,
        "endMs": 119030,
        "isKeyword": false
      },
      {
        "word": "iTunes",
        "startMs": 119030,
        "endMs": 119350,
        "isKeyword": true
      },
      {
        "word": "mở",
        "startMs": 119350,
        "endMs": 119560,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 81,
    "sceneId": 18,
    "text": "ra, thay đổi cách người ta mua nhạc.",
    "startMs": 119560,
    "endMs": 121960,
    "words": [
      {
        "word": "ra,",
        "startMs": 119560,
        "endMs": 119800,
        "isKeyword": false
      },
      {
        "word": "thay",
        "startMs": 119800,
        "endMs": 120040,
        "isKeyword": false
      },
      {
        "word": "đổi",
        "startMs": 120040,
        "endMs": 120540,
        "isKeyword": false
      },
      {
        "word": "cách",
        "startMs": 120540,
        "endMs": 120700,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 120700,
        "endMs": 121180,
        "isKeyword": false
      },
      {
        "word": "ta",
        "startMs": 121180,
        "endMs": 121300,
        "isKeyword": false
      },
      {
        "word": "mua",
        "startMs": 121300,
        "endMs": 121480,
        "isKeyword": false
      },
      {
        "word": "nhạc.",
        "startMs": 121480,
        "endMs": 121960,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 82,
    "sceneId": 19,
    "text": "Tháng 1 năm 2007, ông",
    "startMs": 121960,
    "endMs": 123830,
    "words": [
      {
        "word": "Tháng",
        "startMs": 121960,
        "endMs": 122320,
        "isKeyword": false
      },
      {
        "word": "1",
        "startMs": 122320,
        "endMs": 122500,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 122500,
        "endMs": 122760,
        "isKeyword": true
      },
      {
        "word": "2007,",
        "startMs": 122760,
        "endMs": 123750,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 123750,
        "endMs": 123830,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 83,
    "sceneId": 19,
    "text": "giới thiệu iPhone, một chiếc",
    "startMs": 123830,
    "endMs": 125170,
    "words": [
      {
        "word": "giới",
        "startMs": 123830,
        "endMs": 124110,
        "isKeyword": false
      },
      {
        "word": "thiệu",
        "startMs": 124110,
        "endMs": 124480,
        "isKeyword": false
      },
      {
        "word": "iPhone,",
        "startMs": 124480,
        "endMs": 124960,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 124960,
        "endMs": 124990,
        "isKeyword": false
      },
      {
        "word": "chiếc",
        "startMs": 124990,
        "endMs": 125170,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 84,
    "sceneId": 19,
    "text": "điện thoại, một máy nghe",
    "startMs": 125170,
    "endMs": 126290,
    "words": [
      {
        "word": "điện",
        "startMs": 125170,
        "endMs": 125350,
        "isKeyword": true
      },
      {
        "word": "thoại,",
        "startMs": 125350,
        "endMs": 125800,
        "isKeyword": true
      },
      {
        "word": "một",
        "startMs": 125800,
        "endMs": 125890,
        "isKeyword": false
      },
      {
        "word": "máy",
        "startMs": 125890,
        "endMs": 126090,
        "isKeyword": false
      },
      {
        "word": "nghe",
        "startMs": 126090,
        "endMs": 126290,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 85,
    "sceneId": 19,
    "text": "nhạc và một thiết bị",
    "startMs": 126290,
    "endMs": 127390,
    "words": [
      {
        "word": "nhạc",
        "startMs": 126290,
        "endMs": 126680,
        "isKeyword": true
      },
      {
        "word": "và",
        "startMs": 126680,
        "endMs": 126720,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 126720,
        "endMs": 126930,
        "isKeyword": false
      },
      {
        "word": "thiết",
        "startMs": 126930,
        "endMs": 127370,
        "isKeyword": false
      },
      {
        "word": "bị",
        "startMs": 127370,
        "endMs": 127390,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 86,
    "sceneId": 19,
    "text": "internet trong cùng một chiếc máy.",
    "startMs": 127390,
    "endMs": 129000,
    "words": [
      {
        "word": "internet",
        "startMs": 127390,
        "endMs": 127730,
        "isKeyword": true
      },
      {
        "word": "trong",
        "startMs": 127730,
        "endMs": 127940,
        "isKeyword": false
      },
      {
        "word": "cùng",
        "startMs": 127940,
        "endMs": 128150,
        "isKeyword": false
      },
      {
        "word": "một",
        "startMs": 128150,
        "endMs": 128360,
        "isKeyword": false
      },
      {
        "word": "chiếc",
        "startMs": 128360,
        "endMs": 128640,
        "isKeyword": false
      },
      {
        "word": "máy.",
        "startMs": 128640,
        "endMs": 129000,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 87,
    "sceneId": 20,
    "text": "Năm 2010, iPad",
    "startMs": 129000,
    "endMs": 130030,
    "words": [
      {
        "word": "Năm",
        "startMs": 129000,
        "endMs": 129280,
        "isKeyword": true
      },
      {
        "word": "2010,",
        "startMs": 129280,
        "endMs": 129780,
        "isKeyword": true
      },
      {
        "word": "iPad",
        "startMs": 129780,
        "endMs": 130030,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 88,
    "sceneId": 20,
    "text": "tiếp tục ra đời.",
    "startMs": 130030,
    "endMs": 131020,
    "words": [
      {
        "word": "tiếp",
        "startMs": 130030,
        "endMs": 130330,
        "isKeyword": false
      },
      {
        "word": "tục",
        "startMs": 130330,
        "endMs": 130570,
        "isKeyword": false
      },
      {
        "word": "ra",
        "startMs": 130570,
        "endMs": 130580,
        "isKeyword": false
      },
      {
        "word": "đời.",
        "startMs": 130580,
        "endMs": 131020,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 89,
    "sceneId": 21,
    "text": "Ông nổi tiếng khắt khe đến mức",
    "startMs": 131020,
    "endMs": 132470,
    "words": [
      {
        "word": "Ông",
        "startMs": 131020,
        "endMs": 131080,
        "isKeyword": false
      },
      {
        "word": "nổi",
        "startMs": 131080,
        "endMs": 131330,
        "isKeyword": false
      },
      {
        "word": "tiếng",
        "startMs": 131330,
        "endMs": 131590,
        "isKeyword": false
      },
      {
        "word": "khắt",
        "startMs": 131590,
        "endMs": 131840,
        "isKeyword": true
      },
      {
        "word": "khe",
        "startMs": 131840,
        "endMs": 132010,
        "isKeyword": true
      },
      {
        "word": "đến",
        "startMs": 132010,
        "endMs": 132260,
        "isKeyword": false
      },
      {
        "word": "mức",
        "startMs": 132260,
        "endMs": 132470,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 90,
    "sceneId": 21,
    "text": "nhiều người làm việc cùng gọi ông",
    "startMs": 132470,
    "endMs": 134160,
    "words": [
      {
        "word": "nhiều",
        "startMs": 132470,
        "endMs": 132780,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 132780,
        "endMs": 133130,
        "isKeyword": false
      },
      {
        "word": "làm",
        "startMs": 133130,
        "endMs": 133300,
        "isKeyword": false
      },
      {
        "word": "việc",
        "startMs": 133300,
        "endMs": 133560,
        "isKeyword": false
      },
      {
        "word": "cùng",
        "startMs": 133560,
        "endMs": 133790,
        "isKeyword": false
      },
      {
        "word": "gọi",
        "startMs": 133790,
        "endMs": 134070,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 134070,
        "endMs": 134160,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 91,
    "sceneId": 21,
    "text": "là người rất khó chiều, và thường",
    "startMs": 134160,
    "endMs": 136010,
    "words": [
      {
        "word": "là",
        "startMs": 134160,
        "endMs": 134360,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 134360,
        "endMs": 134640,
        "isKeyword": false
      },
      {
        "word": "rất",
        "startMs": 134640,
        "endMs": 134860,
        "isKeyword": false
      },
      {
        "word": "khó",
        "startMs": 134860,
        "endMs": 135020,
        "isKeyword": false
      },
      {
        "word": "chiều,",
        "startMs": 135020,
        "endMs": 135540,
        "isKeyword": false
      },
      {
        "word": "và",
        "startMs": 135540,
        "endMs": 135670,
        "isKeyword": false
      },
      {
        "word": "thường",
        "startMs": 135670,
        "endMs": 136010,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 92,
    "sceneId": 21,
    "text": "nhắc đến \"trường bóp méo thực tại\"",
    "startMs": 136010,
    "endMs": 137490,
    "words": [
      {
        "word": "nhắc",
        "startMs": 136010,
        "endMs": 136250,
        "isKeyword": false
      },
      {
        "word": "đến",
        "startMs": 136250,
        "endMs": 136470,
        "isKeyword": false
      },
      {
        "word": "\"trường",
        "startMs": 136470,
        "endMs": 136810,
        "isKeyword": false
      },
      {
        "word": "bóp",
        "startMs": 136810,
        "endMs": 136940,
        "isKeyword": true
      },
      {
        "word": "méo",
        "startMs": 136940,
        "endMs": 137070,
        "isKeyword": true
      },
      {
        "word": "thực",
        "startMs": 137070,
        "endMs": 137300,
        "isKeyword": true
      },
      {
        "word": "tại\"",
        "startMs": 137300,
        "endMs": 137490,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 93,
    "sceneId": 21,
    "text": "của ông, khả năng thuyết phục người",
    "startMs": 137490,
    "endMs": 138990,
    "words": [
      {
        "word": "của",
        "startMs": 137490,
        "endMs": 137770,
        "isKeyword": false
      },
      {
        "word": "ông,",
        "startMs": 137770,
        "endMs": 138040,
        "isKeyword": false
      },
      {
        "word": "khả",
        "startMs": 138040,
        "endMs": 138130,
        "isKeyword": false
      },
      {
        "word": "năng",
        "startMs": 138130,
        "endMs": 138290,
        "isKeyword": false
      },
      {
        "word": "thuyết",
        "startMs": 138290,
        "endMs": 138540,
        "isKeyword": false
      },
      {
        "word": "phục",
        "startMs": 138540,
        "endMs": 138730,
        "isKeyword": false
      },
      {
        "word": "người",
        "startMs": 138730,
        "endMs": 138990,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 94,
    "sceneId": 21,
    "text": "khác làm điều tưởng như bất khả",
    "startMs": 138990,
    "endMs": 140210,
    "words": [
      {
        "word": "khác",
        "startMs": 138990,
        "endMs": 139150,
        "isKeyword": false
      },
      {
        "word": "làm",
        "startMs": 139150,
        "endMs": 139280,
        "isKeyword": false
      },
      {
        "word": "điều",
        "startMs": 139280,
        "endMs": 139510,
        "isKeyword": false
      },
      {
        "word": "tưởng",
        "startMs": 139510,
        "endMs": 139770,
        "isKeyword": false
      },
      {
        "word": "như",
        "startMs": 139770,
        "endMs": 139930,
        "isKeyword": false
      },
      {
        "word": "bất",
        "startMs": 139930,
        "endMs": 140120,
        "isKeyword": false
      },
      {
        "word": "khả",
        "startMs": 140120,
        "endMs": 140210,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 95,
    "sceneId": 21,
    "text": "thi. Sự cầu toàn ấy tạo nên",
    "startMs": 140210,
    "endMs": 141610,
    "words": [
      {
        "word": "thi.",
        "startMs": 140210,
        "endMs": 140500,
        "isKeyword": false
      },
      {
        "word": "Sự",
        "startMs": 140500,
        "endMs": 140660,
        "isKeyword": false
      },
      {
        "word": "cầu",
        "startMs": 140660,
        "endMs": 140860,
        "isKeyword": false
      },
      {
        "word": "toàn",
        "startMs": 140860,
        "endMs": 141060,
        "isKeyword": false
      },
      {
        "word": "ấy",
        "startMs": 141060,
        "endMs": 141230,
        "isKeyword": false
      },
      {
        "word": "tạo",
        "startMs": 141230,
        "endMs": 141420,
        "isKeyword": false
      },
      {
        "word": "nên",
        "startMs": 141420,
        "endMs": 141610,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 96,
    "sceneId": 21,
    "text": "những sản phẩm đột phá, nhưng cũng",
    "startMs": 141610,
    "endMs": 143320,
    "words": [
      {
        "word": "những",
        "startMs": 141610,
        "endMs": 141860,
        "isKeyword": false
      },
      {
        "word": "sản",
        "startMs": 141860,
        "endMs": 142060,
        "isKeyword": true
      },
      {
        "word": "phẩm",
        "startMs": 142060,
        "endMs": 142300,
        "isKeyword": false
      },
      {
        "word": "đột",
        "startMs": 142300,
        "endMs": 142530,
        "isKeyword": false
      },
      {
        "word": "phá,",
        "startMs": 142530,
        "endMs": 143070,
        "isKeyword": true
      },
      {
        "word": "nhưng",
        "startMs": 143070,
        "endMs": 143110,
        "isKeyword": false
      },
      {
        "word": "cũng",
        "startMs": 143110,
        "endMs": 143320,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 97,
    "sceneId": 21,
    "text": "để lại nhiều mối quan hệ rạn nứt.",
    "startMs": 143320,
    "endMs": 145230,
    "words": [
      {
        "word": "để",
        "startMs": 143320,
        "endMs": 143530,
        "isKeyword": false
      },
      {
        "word": "lại",
        "startMs": 143530,
        "endMs": 143760,
        "isKeyword": false
      },
      {
        "word": "nhiều",
        "startMs": 143760,
        "endMs": 144080,
        "isKeyword": false
      },
      {
        "word": "mối",
        "startMs": 144080,
        "endMs": 144300,
        "isKeyword": false
      },
      {
        "word": "quan",
        "startMs": 144300,
        "endMs": 144520,
        "isKeyword": false
      },
      {
        "word": "hệ",
        "startMs": 144520,
        "endMs": 144690,
        "isKeyword": false
      },
      {
        "word": "rạn",
        "startMs": 144690,
        "endMs": 144970,
        "isKeyword": false
      },
      {
        "word": "nứt.",
        "startMs": 144970,
        "endMs": 145230,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 98,
    "sceneId": 22,
    "text": "Năm 2003, ông được chẩn đoán",
    "startMs": 145230,
    "endMs": 147100,
    "words": [
      {
        "word": "Năm",
        "startMs": 145230,
        "endMs": 145430,
        "isKeyword": true
      },
      {
        "word": "2003,",
        "startMs": 145430,
        "endMs": 146140,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 146140,
        "endMs": 146430,
        "isKeyword": false
      },
      {
        "word": "được",
        "startMs": 146430,
        "endMs": 146620,
        "isKeyword": false
      },
      {
        "word": "chẩn",
        "startMs": 146620,
        "endMs": 146860,
        "isKeyword": false
      },
      {
        "word": "đoán",
        "startMs": 146860,
        "endMs": 147100,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 99,
    "sceneId": 22,
    "text": "mắc ung thư tuyến tụy. Năm",
    "startMs": 147100,
    "endMs": 148650,
    "words": [
      {
        "word": "mắc",
        "startMs": 147100,
        "endMs": 147300,
        "isKeyword": false
      },
      {
        "word": "ung",
        "startMs": 147300,
        "endMs": 147460,
        "isKeyword": true
      },
      {
        "word": "thư",
        "startMs": 147460,
        "endMs": 147620,
        "isKeyword": true
      },
      {
        "word": "tuyến",
        "startMs": 147620,
        "endMs": 147980,
        "isKeyword": false
      },
      {
        "word": "tụy.",
        "startMs": 147980,
        "endMs": 148450,
        "isKeyword": false
      },
      {
        "word": "Năm",
        "startMs": 148450,
        "endMs": 148650,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 100,
    "sceneId": 22,
    "text": "2005, trong bài diễn thuyết nổi",
    "startMs": 148650,
    "endMs": 150900,
    "words": [
      {
        "word": "2005,",
        "startMs": 148650,
        "endMs": 149920,
        "isKeyword": true
      },
      {
        "word": "trong",
        "startMs": 149920,
        "endMs": 149950,
        "isKeyword": false
      },
      {
        "word": "bài",
        "startMs": 149950,
        "endMs": 150110,
        "isKeyword": false
      },
      {
        "word": "diễn",
        "startMs": 150110,
        "endMs": 150360,
        "isKeyword": false
      },
      {
        "word": "thuyết",
        "startMs": 150360,
        "endMs": 150690,
        "isKeyword": false
      },
      {
        "word": "nổi",
        "startMs": 150690,
        "endMs": 150900,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 101,
    "sceneId": 22,
    "text": "tiếng tại Đại học Stanford, ông",
    "startMs": 150900,
    "endMs": 152290,
    "words": [
      {
        "word": "tiếng",
        "startMs": 150900,
        "endMs": 151190,
        "isKeyword": false
      },
      {
        "word": "tại",
        "startMs": 151190,
        "endMs": 151400,
        "isKeyword": true
      },
      {
        "word": "Đại",
        "startMs": 151400,
        "endMs": 151550,
        "isKeyword": false
      },
      {
        "word": "học",
        "startMs": 151400,
        "endMs": 151670,
        "isKeyword": true
      },
      {
        "word": "Stanford,",
        "startMs": 151670,
        "endMs": 152160,
        "isKeyword": true
      },
      {
        "word": "ông",
        "startMs": 152160,
        "endMs": 152290,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 102,
    "sceneId": 22,
    "text": "nói rằng ý thức về cái",
    "startMs": 152290,
    "endMs": 153350,
    "words": [
      {
        "word": "nói",
        "startMs": 152290,
        "endMs": 152420,
        "isKeyword": false
      },
      {
        "word": "rằng",
        "startMs": 152420,
        "endMs": 152680,
        "isKeyword": false
      },
      {
        "word": "ý",
        "startMs": 152680,
        "endMs": 152810,
        "isKeyword": false
      },
      {
        "word": "thức",
        "startMs": 152810,
        "endMs": 153010,
        "isKeyword": false
      },
      {
        "word": "về",
        "startMs": 153010,
        "endMs": 153220,
        "isKeyword": false
      },
      {
        "word": "cái",
        "startMs": 153220,
        "endMs": 153350,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 103,
    "sceneId": 22,
    "text": "chết nhắc ông sống thật với điều mình yêu.",
    "startMs": 153350,
    "endMs": 155600,
    "words": [
      {
        "word": "chết",
        "startMs": 153350,
        "endMs": 153610,
        "isKeyword": true
      },
      {
        "word": "nhắc",
        "startMs": 153610,
        "endMs": 154020,
        "isKeyword": false
      },
      {
        "word": "ông",
        "startMs": 154020,
        "endMs": 154120,
        "isKeyword": false
      },
      {
        "word": "sống",
        "startMs": 154120,
        "endMs": 154350,
        "isKeyword": false
      },
      {
        "word": "thật",
        "startMs": 154350,
        "endMs": 154650,
        "isKeyword": false
      },
      {
        "word": "với",
        "startMs": 154650,
        "endMs": 154780,
        "isKeyword": false
      },
      {
        "word": "điều",
        "startMs": 154780,
        "endMs": 155050,
        "isKeyword": false
      },
      {
        "word": "mình",
        "startMs": 155050,
        "endMs": 155240,
        "isKeyword": false
      },
      {
        "word": "yêu.",
        "startMs": 155240,
        "endMs": 155600,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 104,
    "sceneId": 23,
    "text": "Ông qua đời ngày",
    "startMs": 155600,
    "endMs": 156360,
    "words": [
      {
        "word": "Ông",
        "startMs": 155600,
        "endMs": 155660,
        "isKeyword": false
      },
      {
        "word": "qua",
        "startMs": 155660,
        "endMs": 155810,
        "isKeyword": false
      },
      {
        "word": "đời",
        "startMs": 155810,
        "endMs": 156110,
        "isKeyword": false
      },
      {
        "word": "ngày",
        "startMs": 156110,
        "endMs": 156360,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 105,
    "sceneId": 23,
    "text": "5 tháng 10 năm",
    "startMs": 156360,
    "endMs": 157360,
    "words": [
      {
        "word": "5",
        "startMs": 156360,
        "endMs": 156560,
        "isKeyword": true
      },
      {
        "word": "tháng",
        "startMs": 156560,
        "endMs": 156860,
        "isKeyword": false
      },
      {
        "word": "10",
        "startMs": 156860,
        "endMs": 157170,
        "isKeyword": false
      },
      {
        "word": "năm",
        "startMs": 157170,
        "endMs": 157360,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 106,
    "sceneId": 23,
    "text": "2011, ở tuổi 56.",
    "startMs": 157360,
    "endMs": 158900,
    "words": [
      {
        "word": "2011,",
        "startMs": 157360,
        "endMs": 157960,
        "isKeyword": true
      },
      {
        "word": "ở",
        "startMs": 157960,
        "endMs": 158110,
        "isKeyword": false
      },
      {
        "word": "tuổi",
        "startMs": 158110,
        "endMs": 158410,
        "isKeyword": false
      },
      {
        "word": "56.",
        "startMs": 158410,
        "endMs": 158900,
        "isKeyword": true
      }
    ]
  },
  {
    "id": 107,
    "sceneId": 24,
    "text": "Người thanh niên bỏ học đại",
    "startMs": 158990,
    "endMs": 160460,
    "words": [
      {
        "word": "Người",
        "startMs": 158990,
        "endMs": 159270,
        "isKeyword": false
      },
      {
        "word": "thanh",
        "startMs": 159270,
        "endMs": 159480,
        "isKeyword": false
      },
      {
        "word": "niên",
        "startMs": 159480,
        "endMs": 159700,
        "isKeyword": false
      },
      {
        "word": "bỏ",
        "startMs": 159700,
        "endMs": 159870,
        "isKeyword": true
      },
      {
        "word": "học",
        "startMs": 159870,
        "endMs": 160100,
        "isKeyword": true
      },
      {
        "word": "đại",
        "startMs": 160100,
        "endMs": 160460,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 108,
    "sceneId": 24,
    "text": "học, bị đuổi khỏi công ty",
    "startMs": 160460,
    "endMs": 161590,
    "words": [
      {
        "word": "học,",
        "startMs": 160460,
        "endMs": 160600,
        "isKeyword": true
      },
      {
        "word": "bị",
        "startMs": 160600,
        "endMs": 160840,
        "isKeyword": false
      },
      {
        "word": "đuổi",
        "startMs": 160840,
        "endMs": 161000,
        "isKeyword": false
      },
      {
        "word": "khỏi",
        "startMs": 161000,
        "endMs": 161270,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 161270,
        "endMs": 161500,
        "isKeyword": false
      },
      {
        "word": "ty",
        "startMs": 161500,
        "endMs": 161590,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 109,
    "sceneId": 24,
    "text": "của chính mình, để rồi quay",
    "startMs": 161590,
    "endMs": 163040,
    "words": [
      {
        "word": "của",
        "startMs": 161590,
        "endMs": 162090,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 162090,
        "endMs": 162140,
        "isKeyword": false
      },
      {
        "word": "mình,",
        "startMs": 162140,
        "endMs": 162320,
        "isKeyword": false
      },
      {
        "word": "để",
        "startMs": 162320,
        "endMs": 162550,
        "isKeyword": false
      },
      {
        "word": "rồi",
        "startMs": 162550,
        "endMs": 162770,
        "isKeyword": false
      },
      {
        "word": "quay",
        "startMs": 162770,
        "endMs": 163040,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 110,
    "sceneId": 24,
    "text": "lại và làm thay đổi cả",
    "startMs": 163040,
    "endMs": 164130,
    "words": [
      {
        "word": "lại",
        "startMs": 163040,
        "endMs": 163190,
        "isKeyword": false
      },
      {
        "word": "và",
        "startMs": 163190,
        "endMs": 163320,
        "isKeyword": false
      },
      {
        "word": "làm",
        "startMs": 163320,
        "endMs": 163500,
        "isKeyword": false
      },
      {
        "word": "thay",
        "startMs": 163500,
        "endMs": 163680,
        "isKeyword": false
      },
      {
        "word": "đổi",
        "startMs": 163680,
        "endMs": 163950,
        "isKeyword": false
      },
      {
        "word": "cả",
        "startMs": 163950,
        "endMs": 164130,
        "isKeyword": false
      }
    ]
  },
  {
    "id": 111,
    "sceneId": 24,
    "text": "ngành công nghệ, đó chính là Steve Jobs.",
    "startMs": 164130,
    "endMs": 166000,
    "words": [
      {
        "word": "ngành",
        "startMs": 164130,
        "endMs": 164580,
        "isKeyword": false
      },
      {
        "word": "công",
        "startMs": 164580,
        "endMs": 164710,
        "isKeyword": false
      },
      {
        "word": "nghệ,",
        "startMs": 164710,
        "endMs": 164840,
        "isKeyword": false
      },
      {
        "word": "đó",
        "startMs": 164840,
        "endMs": 165020,
        "isKeyword": false
      },
      {
        "word": "chính",
        "startMs": 165020,
        "endMs": 165320,
        "isKeyword": false
      },
      {
        "word": "là",
        "startMs": 165320,
        "endMs": 165420,
        "isKeyword": false
      },
      {
        "word": "Steve",
        "startMs": 165420,
        "endMs": 165650,
        "isKeyword": true
      },
      {
        "word": "Jobs.",
        "startMs": 165650,
        "endMs": 166000,
        "isKeyword": true
      }
    ]
  }
];
