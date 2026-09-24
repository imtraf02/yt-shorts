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

const rawPhrases: Array<{
  startMs: number;
  endMs: number;
  text: string;
  keywords?: string[];
}> = [
  {
    "startMs": 40,
    "endMs": 1110,
    "text": "Ngồi cả ngày trước máy tính",
    "keywords": [
      "máy tính"
    ]
  },
  {
    "startMs": 1480,
    "endMs": 3100,
    "text": "mà cơ thể bạn im re không phản kháng?",
    "keywords": [
      "không phản kháng"
    ]
  },
  {
    "startMs": 3850,
    "endMs": 4780,
    "text": "Nó đang phản kháng đấy,",
    "keywords": [
      "phản kháng"
    ]
  },
  {
    "startMs": 5360,
    "endMs": 7250,
    "text": "chỉ là chờ 40 tuổi mới báo thù thôi.",
    "keywords": [
      "40 tuổi",
      "báo thù"
    ]
  },
  {
    "startMs": 7730,
    "endMs": 8220,
    "text": "Đầu tiên:",
    "keywords": [
      "Đầu tiên"
    ]
  },
  {
    "startMs": 8540,
    "endMs": 8810,
    "text": "cổ.",
    "keywords": [
      "cổ"
    ]
  },
  {
    "startMs": 9590,
    "endMs": 10230,
    "text": "Cứ 20 phút,",
    "keywords": [
      "20 phút"
    ]
  },
  {
    "startMs": 10560,
    "endMs": 11810,
    "text": "quay cổ chậm rãi từng bên,",
    "keywords": [
      "quay cổ",
      "từng bên"
    ]
  },
  {
    "startMs": 12210,
    "endMs": 13210,
    "text": "mỗi bên giữ 5 giây.",
    "keywords": [
      "giữ 5 giây"
    ]
  },
  {
    "startMs": 13810,
    "endMs": 16690,
    "text": "Đơn giản vậy thôi mà dân văn phòng vẫn cắm mặt vào màn hình như tượng,",
    "keywords": [
      "dân văn phòng",
      "như tượng"
    ]
  },
  {
    "startMs": 17170,
    "endMs": 18750,
    "text": "để rồi tối về xoa cổ kêu trời.",
    "keywords": [
      "xoa cổ",
      "kêu trời"
    ]
  },
  {
    "startMs": 19240,
    "endMs": 20180,
    "text": "Tiếp theo: cổ tay.",
    "keywords": [
      "cổ tay"
    ]
  },
  {
    "startMs": 20650,
    "endMs": 22410,
    "text": "Gõ phím cả ngày mà không xoay cổ tay",
    "keywords": [
      "Gõ phím",
      "xoay cổ tay"
    ]
  },
  {
    "startMs": 22690,
    "endMs": 24800,
    "text": "thì khác gì chạy marathon mà không giãn cơ.",
    "keywords": [
      "marathon",
      "không giãn cơ"
    ]
  },
  {
    "startMs": 25390,
    "endMs": 27270,
    "text": "Xoay tròn hai cổ tay 10 vòng mỗi chiều —",
    "keywords": [
      "10 vòng mỗi chiều"
    ]
  },
  {
    "startMs": 27540,
    "endMs": 28170,
    "text": "15 giây,",
    "keywords": [
      "15 giây"
    ]
  },
  {
    "startMs": 28550,
    "endMs": 30650,
    "text": "ít hơn thời gian bạn lướt một cái story trên mạng.",
    "keywords": [
      "lướt story"
    ]
  },
  {
    "startMs": 31120,
    "endMs": 32850,
    "text": "Vai bạn đang gù như dấu hỏi chấm kìa.",
    "keywords": [
      "dấu hỏi chấm"
    ]
  },
  {
    "startMs": 33340,
    "endMs": 34570,
    "text": "Kéo hai vai lên sát tai,",
    "keywords": [
      "sát tai"
    ]
  },
  {
    "startMs": 34840,
    "endMs": 35470,
    "text": "giữ 3 giây,",
    "keywords": [
      "giữ 3 giây"
    ]
  },
  {
    "startMs": 35730,
    "endMs": 37000,
    "text": "rồi thả rơi thật mạnh xuống.",
    "keywords": [
      "thả rơi thật mạnh"
    ]
  },
  {
    "startMs": 37600,
    "endMs": 38330,
    "text": "Lặp lại 5 lần.",
    "keywords": [
      "Lặp lại 5 lần"
    ]
  },
  {
    "startMs": 38950,
    "endMs": 41160,
    "text": "Cảm giác như vừa trút được một balo đá trên lưng.",
    "keywords": [
      "balo đá trên lưng"
    ]
  },
  {
    "startMs": 41650,
    "endMs": 43470,
    "text": "Ngồi lâu thì mông bạn cũng đang tắt thở đấy.",
    "keywords": [
      "mông tắt thở"
    ]
  },
  {
    "startMs": 44020,
    "endMs": 44400,
    "text": "Đứng dậy,",
    "keywords": [
      "Đứng dậy"
    ]
  },
  {
    "startMs": 44700,
    "endMs": 45910,
    "text": "siết mông thật chặt 5 giây,",
    "keywords": [
      "siết mông",
      "5 giây"
    ]
  },
  {
    "startMs": 46220,
    "endMs": 46660,
    "text": "thả ra,",
    "keywords": [
      "thả ra"
    ]
  },
  {
    "startMs": 46840,
    "endMs": 47610,
    "text": "lặp lại 10 lần.",
    "keywords": [
      "10 lần"
    ]
  },
  {
    "startMs": 48220,
    "endMs": 50240,
    "text": "Nghe hơi kỳ nhưng tuần hoàn máu cảm ơn bạn đấy.",
    "keywords": [
      "tuần hoàn máu"
    ]
  },
  {
    "startMs": 50720,
    "endMs": 52920,
    "text": "Mắt thì áp dụng quy tắc 20-20-20:",
    "keywords": [
      "quy tắc 20-20-20"
    ]
  },
  {
    "startMs": 53180,
    "endMs": 53790,
    "text": "mỗi 20 phút,",
    "keywords": [
      "20 phút"
    ]
  },
  {
    "startMs": 54100,
    "endMs": 55100,
    "text": "nhìn ra xa 20 feet,",
    "keywords": [
      "20 feet"
    ]
  },
  {
    "startMs": 55370,
    "endMs": 56030,
    "text": "trong 20 giây.",
    "keywords": [
      "20 giây"
    ]
  },
  {
    "startMs": 56500,
    "endMs": 58480,
    "text": "Không có cửa sổ thì nhìn góc phòng xa nhất cũng được —",
    "keywords": [
      "góc phòng xa nhất"
    ]
  },
  {
    "startMs": 58940,
    "endMs": 60770,
    "text": "miễn là đừng nhìn màn hình thêm một giây nào.",
    "keywords": [
      "đừng nhìn màn hình"
    ]
  },
  {
    "startMs": 61260,
    "endMs": 61660,
    "text": "Cuối cùng,",
    "keywords": [
      "Cuối cùng"
    ]
  },
  {
    "startMs": 61870,
    "endMs": 63510,
    "text": "đứng dậy đi vòng quanh bàn đúng một vòng.",
    "keywords": [
      "đi vòng quanh bàn",
      "một vòng"
    ]
  },
  {
    "startMs": 64100,
    "endMs": 64860,
    "text": "Chỉ một vòng thôi.",
    "keywords": [
      "Chỉ một vòng"
    ]
  },
  {
    "startMs": 65710,
    "endMs": 66840,
    "text": "Không cần đi bộ 10000 bước",
    "keywords": [
      "10000 bước"
    ]
  },
  {
    "startMs": 67040,
    "endMs": 68180,
    "text": "như quảng cáo đồng hồ thông minh,",
    "keywords": [
      "đồng hồ thông minh"
    ]
  },
  {
    "startMs": 68530,
    "endMs": 70240,
    "text": "chỉ cần đừng để cơ thể quên nó có chân.",
    "keywords": [
      "quên nó có chân"
    ]
  },
  {
    "startMs": 70710,
    "endMs": 71980,
    "text": "Những bài tập này tốn tổng cộng",
    "keywords": [
      "Những bài tập"
    ]
  },
  {
    "startMs": 72290,
    "endMs": 73420,
    "text": "chưa tới 2 phút mỗi giờ.",
    "keywords": [
      "chưa tới 2 phút"
    ]
  },
  {
    "startMs": 73820,
    "endMs": 76250,
    "text": "Ít hơn thời gian bạn ngồi nghĩ xem có nên làm hay không.",
    "keywords": [
      "ngồi nghĩ có nên làm"
    ]
  }
];

const removePunctuation = (value: string) =>
  value.replace(/[,.…!—:?']/g, '').replace(/\s{2,}/g, ' ').trim();

export const deskBodyBreaksSubtitles: SubtitlePhrase[] = rawPhrases.map((item, idx) => {
  const text = removePunctuation(item.text);
  const words = text.split(' ').filter(Boolean);
  const totalDuration = item.endMs - item.startMs;
  const wordDuration = totalDuration / Math.max(1, words.length);

  const tokens: SubtitleToken[] = words.map((word, wIdx) => {
    const startMs = item.startMs + wIdx * wordDuration;
    const endMs = startMs + wordDuration;
    return {
      text: word,
      startMs,
      endMs,
    };
  });

  const nextItem = rawPhrases[idx + 1];
  let displayEndMs = item.endMs;
  if (nextItem) {
    const gap = nextItem.startMs - item.endMs;
    if (gap > 0 && gap < 360) {
      displayEndMs = nextItem.startMs - 30;
    } else {
      displayEndMs = item.endMs + 180;
    }
  } else {
    displayEndMs = item.endMs + 350;
  }

  return {
    id: idx + 1,
    startMs: item.startMs,
    endMs: displayEndMs,
    text,
    tokens,
    highlightKeywords: item.keywords?.map(removePunctuation),
  };
});
