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
    startMs: 0,
    endMs: 1100,
    text: "Cùng để ngoài trời lạnh,",
    keywords: ["ngoài trời lạnh"],
  },
  {
    startMs: 1120,
    endMs: 2700,
    text: "một thanh kim loại và một khúc gỗ",
    keywords: ["kim loại", "khúc gỗ"],
  },
  {
    startMs: 2800,
    endMs: 4400,
    text: "có cùng nhiệt độ như nhau.",
    keywords: ["cùng nhiệt độ"],
  },
  {
    startMs: 4470,
    endMs: 5600,
    text: "Nhưng khi chạm vào,",
    keywords: ["chạm vào"],
  },
  {
    startMs: 5670,
    endMs: 8050,
    text: "kim loại luôn khiến bạn cảm thấy lạnh hơn hẳn.",
    keywords: ["lạnh hơn hẳn"],
  },
  {
    startMs: 8110,
    endMs: 9800,
    text: "Vậy vấn đề không nằm ở nhiệt độ —",
    keywords: ["không nằm ở nhiệt độ"],
  },
  {
    startMs: 9900,
    endMs: 11500,
    text: "mà nằm ở tốc độ truyền nhiệt.",
    keywords: ["tốc độ truyền nhiệt"],
  },
  {
    startMs: 11590,
    endMs: 13600,
    text: "Kim loại có khả năng dẫn nhiệt cực tốt,",
    keywords: ["dẫn nhiệt cực tốt"],
  },
  {
    startMs: 13670,
    endMs: 16500,
    text: "nhờ các electron tự do di chuyển linh hoạt bên trong.",
    keywords: ["electron tự do", "linh hoạt"],
  },
  {
    startMs: 16680,
    endMs: 17950,
    text: "Khi tay bạn chạm vào,",
    keywords: ["tay bạn chạm"],
  },
  {
    startMs: 18020,
    endMs: 20200,
    text: "nhiệt từ cơ thể bị hút đi rất nhanh.",
    keywords: ["bị hút đi rất nhanh"],
  },
  {
    startMs: 20370,
    endMs: 22450,
    text: "Não bộ không đo nhiệt độ thực tế của vật —",
    keywords: ["không đo nhiệt độ"],
  },
  {
    startMs: 22580,
    endMs: 24950,
    text: "nó chỉ cảm nhận tốc độ mất nhiệt từ da.",
    keywords: ["tốc độ mất nhiệt"],
  },
  {
    startMs: 25070,
    endMs: 26600,
    text: "Nhiệt rời khỏi tay càng nhanh,",
    keywords: ["càng nhanh"],
  },
  {
    startMs: 26690,
    endMs: 27950,
    text: "bạn càng cảm thấy lạnh.",
    keywords: ["càng cảm thấy lạnh"],
  },
  {
    startMs: 28050,
    endMs: 30300,
    text: "Trong khi đó, gỗ dẫn nhiệt rất kém.",
    keywords: ["dẫn nhiệt rất kém"],
  },
  {
    startMs: 30430,
    endMs: 33500,
    text: "Nhiệt từ tay bạn gần như bị giữ lại ngay tại điểm tiếp xúc,",
    keywords: ["giữ lại", "điểm tiếp xúc"],
  },
  {
    startMs: 33650,
    endMs: 35250,
    text: "nên cảm giác ấm hơn nhiều.",
    keywords: ["ấm hơn nhiều"],
  },
  {
    startMs: 35400,
    endMs: 36300,
    text: "Thú vị hơn,",
    keywords: ["Thú vị hơn"],
  },
  {
    startMs: 36340,
    endMs: 38250,
    text: "quy luật này đảo ngược khi trời nóng.",
    keywords: ["đảo ngược khi trời nóng"],
  },
  {
    startMs: 38370,
    endMs: 40800,
    text: "Kim loại ngoài nắng sẽ khiến bạn thấy nóng hơn gỗ,",
    keywords: ["thấy nóng hơn gỗ"],
  },
  {
    startMs: 40880,
    endMs: 42800,
    text: "dù nhiệt độ đo được vẫn bằng nhau.",
    keywords: ["vẫn bằng nhau"],
  },
  {
    startMs: 42910,
    endMs: 44700,
    text: "Vậy nên lần tới chạm vào một vật,",
    keywords: ["chạm vào một vật"],
  },
  {
    startMs: 44810,
    endMs: 45450,
    text: "hãy nhớ:",
    keywords: ["hãy nhớ"],
  },
  {
    startMs: 45540,
    endMs: 48940,
    text: "cảm giác nóng lạnh không phải lúc nào cũng phản ánh đúng nhiệt độ thật của nó.",
    keywords: ["nóng lạnh", "nhiệt độ thật"],
  },
];

const removePunctuation = (value: string) =>
  value.replace(/[,.…!—:]/g, "").replace(/\s{2,}/g, " ").trim();

export const metalWoodSubtitles: SubtitlePhrase[] = rawPhrases.map((item, idx) => {
  const text = removePunctuation(item.text);
  const words = text.split(" ").filter(Boolean);
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

  return {
    id: idx + 1,
    startMs: item.startMs,
    endMs: item.endMs,
    text,
    tokens,
    highlightKeywords: item.keywords?.map(removePunctuation),
  };
});
