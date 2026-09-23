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
  { startMs: 0, endMs: 578, text: "Bạn không lười.", keywords: ["không lười"] },
  { startMs: 1060, endMs: 2807, text: "Bạn chỉ đang tự lừa não mình mỗi ngày thôi,", keywords: ["tự lừa não"] },
  { startMs: 3223, endMs: 4108, text: "và lừa rất có nghề.", keywords: ["rất có nghề"] },
  { startMs: 4610, endMs: 6582, text: "Việc dưới 2 phút mà bạn ghi vào to-do list?", keywords: ["dưới 2 phút", "to-do list"] },
  { startMs: 7159, endMs: 7408, text: "Vô ích.", keywords: ["Vô ích"] },
  { startMs: 7926, endMs: 10627, text: "Ghi xong bạn còn tốn thời gian đọc lại nó hơn là làm luôn từ đầu —", keywords: ["tốn thời gian", "làm luôn"] },
  { startMs: 11036, endMs: 12391, text: "não bạn đang tự làm khó chính nó,", keywords: ["tự làm khó"] },
  { startMs: 12818, endMs: 14380, text: "kiểu như đi vòng để tới cái đích ngay trước mặt.", keywords: ["đi vòng", "trước mặt"] },
  { startMs: 14868, endMs: 18029, text: "Còn cái việc bạn ngồi nhìn deadline cho có cảm giác áp lực tạo động lực ấy?", keywords: ["deadline", "áp lực tạo động lực"] },
  { startMs: 18344, endMs: 18715, text: "Sai bét.", keywords: ["Sai bét"] },
  { startMs: 19391, endMs: 20689, text: "Nhìn deadline chỉ làm bạn hoảng,", keywords: ["làm bạn hoảng"] },
  { startMs: 21119, endMs: 21688, text: "tim đập nhanh,", keywords: ["tim đập nhanh"] },
  { startMs: 22055, endMs: 23543, text: "tay thì vẫn không nhấc lên gõ chữ nào.", keywords: ["không nhấc lên"] },
  { startMs: 23892, endMs: 25425, text: "Muốn làm thật thì đừng nhìn cả núi việc —", keywords: ["Muốn làm thật", "cả núi việc"] },
  { startMs: 25831, endMs: 27234, text: "chỉ nhìn đúng 10 phút tiếp theo thôi.", keywords: ["đúng 10 phút"] },
  { startMs: 28097, endMs: 29879, text: "Zoom to quá là não bạn chạy mất dép ngay.", keywords: ["chạy mất dép"] },
  { startMs: 30371, endMs: 32105, text: "Và đừng có để điện thoại úp mặt xuống bàn", keywords: ["điện thoại úp mặt"] },
  { startMs: 32391, endMs: 33745, text: "rồi tự hào là mình kỷ luật lắm.", keywords: ["kỷ luật lắm"] },
  { startMs: 34296, endMs: 35611, text: "Úp mặt xuống thì nó vẫn rung,", keywords: ["vẫn rung"] },
  { startMs: 35881, endMs: 36373, text: "vẫn sáng,", keywords: ["vẫn sáng"] },
  { startMs: 36656, endMs: 38423, text: "vẫn gọi tên bạn từ trong bóng tối như ma.", keywords: ["gọi tên bạn", "như ma"] },
  { startMs: 38945, endMs: 39941, text: "Để nó qua tận phòng khác.", keywords: ["phòng khác"] },
  { startMs: 40295, endMs: 41943, text: "Ý chí của bạn không mạnh như bạn nghĩ đâu,", keywords: ["không mạnh"] },
  { startMs: 42241, endMs: 43500, text: "đừng thử thách nó làm gì cho mệt.", keywords: ["thử thách"] },
  { startMs: 43981, endMs: 44698, text: "Một mẹo hay nữa:", keywords: ["mẹo hay"] },
  { startMs: 45052, endMs: 47221, text: "đừng bắt bản thân ngồi tập trung một mạch 25 phút", keywords: ["25 phút"] },
  { startMs: 47608, endMs: 49561, text: "nếu bạn còn đang chật vật mới bắt đầu lại thói quen.", keywords: ["chật vật"] },
  { startMs: 50357, endMs: 50881, text: "Làm 10 phút,", keywords: ["10 phút"] },
  { startMs: 51281, endMs: 51832, text: "nghỉ 2 phút,", keywords: ["nghỉ 2 phút"] },
  { startMs: 52197, endMs: 52518, text: "lặp lại.", keywords: ["lặp lại"] },
  { startMs: 52857, endMs: 54308, text: "Não cần những cú thắng nhỏ liên tục để tin rằng nó làm được —", keywords: ["cú thắng nhỏ"] },
  { startMs: 54695, endMs: 55753, text: "chứ không cần một trận đấu marathon", keywords: ["marathon"] },
  { startMs: 56126, endMs: 57649, text: "làm nó nản từ phút thứ ba.", keywords: ["nản"] },
  { startMs: 57937, endMs: 60272, text: "Mẹo áp chót, dễ nhất mà hiệu quả bất ngờ:", keywords: ["áp chót", "hiệu quả bất ngờ"] },
  { startMs: 60622, endMs: 61895, text: "đếm 5-4-3-2-1 rồi làm ngay,", keywords: ["5-4-3-2-1", "làm ngay"] },
  { startMs: 62250, endMs: 64195, text: "đừng nghĩ thêm giây nào nữa.", keywords: ["đừng nghĩ thêm"] },
  { startMs: 64654, endMs: 65737, text: "Vì con não khốn nạn của bạn chỉ cần đúng 5 giây", keywords: ["đúng 5 giây"] },
  { startMs: 66084, endMs: 67183, text: "để nghĩ ra một lý do trì hoãn cực kỳ thuyết phục,", keywords: ["lý do trì hoãn"] },
  { startMs: 67496, endMs: 70599, text: "thuyết phục đến mức chính bạn cũng phải gật gù tin theo.", keywords: ["gật gù tin theo"] },
  { startMs: 71333, endMs: 73752, text: "Và nhớ quy tắc cuối:", keywords: ["quy tắc cuối"] },
  { startMs: 74253, endMs: 78268, text: "đừng bao giờ để 2 ngày liên tiếp trôi qua mà không động vào việc đó.", keywords: ["2 ngày liên tiếp", "không động vào"] },
  { startMs: 78910, endMs: 79512, text: "Bỏ một ngày —", keywords: ["Bỏ một ngày"] },
  { startMs: 79758, endMs: 80219, text: "bình thường,", keywords: ["bình thường"] },
  { startMs: 80648, endMs: 81498, text: "ai chẳng có ngày lười.", keywords: ["ngày lười"] },
  { startMs: 82009, endMs: 82608, text: "Bỏ hai ngày —", keywords: ["Bỏ hai ngày"] },
  { startMs: 83109, endMs: 84230, text: "thói quen coi như xong phim,", keywords: ["xong phim"] },
  { startMs: 84679, endMs: 85532, text: "phải xây lại từ đầu.", keywords: ["xây lại từ đầu"] },
  { startMs: 86028, endMs: 87336, text: "Trì hoãn không phải vì bạn lười.", keywords: ["không phải vì bạn lười"] },
  { startMs: 87700, endMs: 89664, text: "Là vì bạn giỏi bào chữa hơn bạn tưởng thôi —", keywords: ["giỏi bào chữa"] },
  { startMs: 90010, endMs: 92006, text: "giỏi đến mức có khi nên đi thi hùng biện.", keywords: ["đi thi hùng biện"] },
];

const removePunctuation = (value: string) =>
  value.replace(/[,.…!—:?']/g, "").replace(/\s{2,}/g, " ").trim();

export const procrastinationSubtitles: SubtitlePhrase[] = rawPhrases.map((item, idx) => {
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

  const nextItem = rawPhrases[idx + 1];
  let displayEndMs = item.endMs;
  if (nextItem) {
    const gap = nextItem.startMs - item.endMs;
    if (gap > 0 && gap < 420) {
      displayEndMs = nextItem.startMs - 40;
    } else {
      displayEndMs = item.endMs + 180;
    }
  } else {
    displayEndMs = item.endMs + 250;
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
