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
    endMs: 3400,
    text: "Ngủ trưa càng lâu không phải lúc nào cũng tỉnh táo hơn.",
    keywords: ["càng lâu", "tỉnh táo hơn"],
  },
  {
    startMs: 3900,
    endMs: 6000,
    text: "Đôi khi bạn tỉnh dậy lại thấy mệt mỏi,",
    keywords: ["mệt mỏi"],
  },
  {
    startMs: 6200,
    endMs: 7200,
    text: "đầu óc nặng trịch,",
    keywords: ["nặng trịch"],
  },
  {
    startMs: 7500,
    endMs: 9300,
    text: "thậm chí tệ hơn cả trước khi ngủ.",
    keywords: ["tệ hơn"],
  },
  {
    startMs: 9800,
    endMs: 11000,
    text: "Nghe có vẻ vô lý,",
    keywords: ["vô lý"],
  },
  {
    startMs: 11200,
    endMs: 13000,
    text: "nhưng đây là hiện tượng rất phổ biến.",
    keywords: ["phổ biến"],
  },
  {
    startMs: 13500,
    endMs: 15800,
    text: "Bí mật nằm ở các giai đoạn của giấc ngủ.",
    keywords: ["Bí mật", "giai đoạn"],
  },
  {
    startMs: 16200,
    endMs: 18500,
    text: "Cơ thể không ngủ một cách đồng đều,",
    keywords: ["đồng đều"],
  },
  {
    startMs: 18700,
    endMs: 20400,
    text: "mà đi qua nhiều tầng khác nhau,",
    keywords: ["nhiều tầng"],
  },
  {
    startMs: 20700,
    endMs: 22400,
    text: "từ ngủ nông đến ngủ sâu,",
    keywords: ["ngủ nông", "ngủ sâu"],
  },
  {
    startMs: 22800,
    endMs: 24700,
    text: "theo từng chu kỳ khoảng 90 phút.",
    keywords: ["chu kỳ 90 phút"],
  },
  {
    startMs: 25100,
    endMs: 26800,
    text: "Nếu chỉ ngủ khoảng 20 phút,",
    keywords: ["20 phút"],
  },
  {
    startMs: 27100,
    endMs: 29100,
    text: "bạn vẫn đang ở giai đoạn ngủ nông,",
    keywords: ["ngủ nông"],
  },
  {
    startMs: 29500,
    endMs: 31800,
    text: "và có thể tỉnh dậy dễ dàng, nhẹ nhàng.",
    keywords: ["dễ dàng", "nhẹ nhàng"],
  },
  {
    startMs: 32200,
    endMs: 34000,
    text: "Nhưng nếu ngủ lâu hơn 30 phút,",
    keywords: ["hơn 30 phút"],
  },
  {
    startMs: 34300,
    endMs: 36800,
    text: "cơ thể bắt đầu tiến vào giai đoạn ngủ sâu.",
    keywords: ["ngủ sâu"],
  },
  {
    startMs: 37200,
    endMs: 39000,
    text: "Đây là giai đoạn não hoạt động chậm nhất,",
    keywords: ["chậm nhất"],
  },
  {
    startMs: 39300,
    endMs: 42000,
    text: "và cơ thể đang bận rộn phục hồi, sửa chữa.",
    keywords: ["phục hồi", "sửa chữa"],
  },
  {
    startMs: 42400,
    endMs: 44400,
    text: "Nếu bị đánh thức ngay giữa giai đoạn đó...",
    keywords: ["đánh thức"],
  },
  {
    startMs: 44800,
    endMs: 47200,
    text: "não bộ chưa kịp khởi động lại,",
    keywords: ["chưa kịp khởi động"],
  },
  {
    startMs: 47300,
    endMs: 50600,
    text: "như máy tính bị rút phích cắm đột ngột giữa chừng.",
    keywords: ["rút phích cắm đột ngột"],
  },
  {
    startMs: 51100,
    endMs: 52000,
    text: "Không chỉ vậy,",
    keywords: ["Không chỉ vậy"],
  },
  {
    startMs: 52100,
    endMs: 57200,
    text: "chất hóa học tên Adenosine tích tụ nhiều hơn trong não.",
    keywords: ["Adenosine", "tích tụ"],
  },
  {
    startMs: 57700,
    endMs: 59400,
    text: "Đây là chất tạo cảm giác buồn ngủ,",
    keywords: ["buồn ngủ"],
  },
  {
    startMs: 59700,
    endMs: 62900,
    text: "và nó không biến mất ngay chỉ vì bạn mở mắt ra.",
    keywords: ["không biến mất"],
  },
  {
    startMs: 63300,
    endMs: 65300,
    text: "Hiện tượng này gọi là quán tính giấc ngủ —",
    keywords: ["quán tính giấc ngủ"],
  },
  {
    startMs: 65600,
    endMs: 68000,
    text: "khiến bạn choáng váng, mất phương hướng,",
    keywords: ["choáng váng", "mất phương hướng"],
  },
  {
    startMs: 68200,
    endMs: 70000,
    text: "phản xạ chậm chạp trong nhiều phút,",
    keywords: ["phản xạ chậm"],
  },
  {
    startMs: 70300,
    endMs: 72900,
    text: "thậm chí kéo dài cả tiếng đồng hồ sau đó.",
    keywords: ["cả tiếng đồng hồ"],
  },
  {
    startMs: 73300,
    endMs: 76500,
    text: "Đó là lý do phi công, bác sĩ trực đêm,",
    keywords: ["phi công", "bác sĩ trực đêm"],
  },
  {
    startMs: 76800,
    endMs: 79200,
    text: "hay người vận hành máy móc",
    keywords: ["vận hành máy móc"],
  },
  {
    startMs: 79500,
    endMs: 82600,
    text: "phải đặc biệt cẩn trọng nếu vừa tỉnh sau giấc ngủ dài.",
    keywords: ["đặc biệt cẩn trọng"],
  },
  {
    startMs: 83000,
    endMs: 86500,
    text: "Vậy để ngủ trưa mà vẫn tỉnh táo, có 2 lựa chọn.",
    keywords: ["2 lựa chọn"],
  },
  {
    startMs: 87000,
    endMs: 89400,
    text: "Một là giới hạn giấc ngủ trong 20 phút,",
    keywords: ["20 phút"],
  },
  {
    startMs: 89700,
    endMs: 91300,
    text: "để không rơi vào giấc ngủ sâu.",
    keywords: ["ngủ sâu"],
  },
  {
    startMs: 91700,
    endMs: 94200,
    text: "Hai là ngủ đủ trọn một chu kỳ 90 phút,",
    keywords: ["chu kỳ 90 phút"],
  },
  {
    startMs: 94500,
    endMs: 97200,
    text: "để cơ thể tự hoàn tất và tỉnh dậy đúng lúc!",
    keywords: ["tự hoàn tất", "tỉnh dậy đúng lúc"],
  },
];

const removePunctuation = (value: string) =>
  value.replace(/[,.…!—]/g, "").replace(/\s{2,}/g, " ").trim();

export const AUDIO_SPEED = 1.12;

export const phrases: SubtitlePhrase[] = rawPhrases.map((item, idx) => {
  const scaledStartMs = Math.round(item.startMs / AUDIO_SPEED);
  const scaledEndMs = Math.round(item.endMs / AUDIO_SPEED);
  const text = removePunctuation(item.text);
  const words = text.split(" ").filter(Boolean);
  const totalDuration = scaledEndMs - scaledStartMs;
  const wordDuration = totalDuration / Math.max(1, words.length);

  const tokens: SubtitleToken[] = words.map((word, wIdx) => {
    const startMs = scaledStartMs + wIdx * wordDuration;
    const endMs = startMs + wordDuration;
    return {
      text: word,
      startMs,
      endMs,
    };
  });

  return {
    id: idx + 1,
    startMs: scaledStartMs,
    endMs: scaledEndMs,
    text,
    tokens,
    highlightKeywords: item.keywords?.map(removePunctuation),
  };
});
