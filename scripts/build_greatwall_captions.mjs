import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: Introduction & 21,000km scale
  `Một bức tường dài hơn 21.000 km, đủ để quấn quanh nửa vòng Trái Đất. Nhưng để xây nó, có thể đã có hàng trăm nghìn người bỏ mạng ngay tại công trường.`,
  // Scene 2: 2,000-year history across dynasties
  `Vạn Lý Trường Thành không phải công trình của một triều đại duy nhất. Nó được xây dựng, nối dài và tu sửa qua hơn 2.000 năm, bắt đầu từ thời Chiến Quốc, thế kỷ 7 trước Công nguyên, khi các nước chư hầu xây tường riêng để phòng thủ lẫn nhau.`,
  // Scene 3: Qin Shi Huang & unification against Xiongnu
  `Người đặt nền móng cho ý tưởng một bức tường thống nhất là Tần Thủy Hoàng. Sau khi thống nhất Trung Hoa năm 221 trước Công nguyên, ông ra lệnh nối liền và mở rộng các đoạn tường cũ để chống lại các bộ tộc du mục phương Bắc, đặc biệt là Hung Nô.`,
  // Scene 4: Brutal labor mobilization
  `Công trình dưới thời Tần được xây với cái giá khủng khiếp. Hàng trăm nghìn dân phu, tù nhân và binh lính bị huy động, làm việc trong điều kiện khắc nghiệt,`,
  // Scene 5: Legends of suffering & sacrifice
  `tương truyền vô số người đã chết vì kiệt sức, đói rét, thi thể có khi bị chôn ngay trong chính nền móng của bức tường.`,
  // Scene 6: Ming dynasty brick & beacon towers
  `Phần lớn đoạn tường nổi tiếng và kiên cố nhất mà chúng ta thấy ngày nay thực chất được xây dưới thời nhà Minh, từ năm 1368 đến 1644, sử dụng gạch nung và đá thay vì đất nện, với hệ thống tháp canh, trạm gác dày đặc để truyền tín hiệu bằng khói và lửa.`,
  // Scene 7: Debunking the space visibility myth
  `Có một hiểu lầm phổ biến, Vạn Lý Trường Thành không thể nhìn thấy bằng mắt thường từ vũ trụ như nhiều người vẫn tin, các phi hành gia đã xác nhận điều này.`,
  // Scene 8: Invasions & Qing dynasty entry
  `Dù tốn kém sinh mạng và của cải khổng lồ, bức tường vẫn không ngăn được hoàn toàn các cuộc xâm lược. Điển hình là quân Mãn Châu vẫn tiến vào chiếm Trung Hoa, lập nên nhà Thanh vào thế kỷ 17.`,
  // Scene 9: Human cost and eternal monument
  `Một công trình được xây để bảo vệ cả một đế chế, nhưng cái giá phải trả lại là vô số sinh mạng của chính những người dân xây nên nó. Đó là Vạn Lý Trường Thành.`,
];

const normalize = (word) =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/gu, "");

const editDistance = (a, b) => {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        previous + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      previous = current;
    }
  }
  return row[b.length];
};

const score = (expected, heard) => {
  if (expected === heard) return 4;
  if (
    expected.length > 2 &&
    heard.length > 2 &&
    (expected.includes(heard) || heard.includes(expected))
  )
    return 2;
  if (expected.length > 3 && heard.length > 3 && editDistance(expected, heard) <= 1)
    return 1;
  return -1;
};

const raw = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src", "data", "greatwallCaptionsRaw.json"), "utf8"),
);

const allWordsWithScene = [];
SCENE_SCRIPTS.forEach((text, sceneIdx) => {
  const words = text.match(/\S+/gu) ?? [];
  words.forEach((w) => {
    allWordsWithScene.push({ word: w, sceneId: sceneIdx + 1 });
  });
});

const heard = raw.map((caption) => normalize(caption.text));
const expected = allWordsWithScene.map((entry) => normalize(entry.word));

const dp = Array.from({ length: expected.length + 1 }, () =>
  Array(heard.length + 1).fill(0),
);

for (let i = 1; i <= expected.length; i++) dp[i][0] = -i;
for (let j = 1; j <= heard.length; j++) dp[0][j] = -j;
for (let i = 1; i <= expected.length; i++) {
  for (let j = 1; j <= heard.length; j++) {
    dp[i][j] = Math.max(
      dp[i - 1][j - 1] + score(expected[i - 1], heard[j - 1]),
      dp[i - 1][j] - 1,
      dp[i][j - 1] - 1,
    );
  }
}

const wordToRaw = Array(expected.length).fill(-1);
let i = expected.length;
let j = heard.length;
while (i > 0 || j > 0) {
  if (
    i > 0 &&
    j > 0 &&
    dp[i][j] === dp[i - 1][j - 1] + score(expected[i - 1], heard[j - 1])
  ) {
    wordToRaw[i - 1] = j - 1;
    i--;
    j--;
  } else if (j > 0 && dp[i][j] === dp[i][j - 1] - 1) {
    j--;
  } else {
    i--;
  }
}

for (let index = 0; index < wordToRaw.length; index++) {
  if (wordToRaw[index] >= 0) continue;
  const before = wordToRaw.slice(0, index).findLastIndex((value) => value >= 0);
  const afterOffset = wordToRaw.slice(index + 1).findIndex((value) => value >= 0);
  const after = afterOffset < 0 ? -1 : index + afterOffset + 1;
  if (before >= 0 && after >= 0) {
    const ratio = (index - before) / (after - before);
    wordToRaw[index] = Math.round(
      wordToRaw[before] + ratio * (wordToRaw[after] - wordToRaw[before]),
    );
  } else if (before >= 0) {
    wordToRaw[index] = Math.min(raw.length - 1, wordToRaw[before] + (index - before));
  } else if (after >= 0) {
    wordToRaw[index] = Math.max(0, wordToRaw[after] - (after - index));
  } else {
    wordToRaw[index] = Math.floor((index / expected.length) * raw.length);
  }
}

const captionWords = allWordsWithScene.map((entry, index) => {
  const source = raw[wordToRaw[index]];
  const next = raw[Math.min(raw.length - 1, wordToRaw[index] + 1)];
  return {
    word: entry.word,
    sceneId: entry.sceneId,
    startMs: source.startMs,
    endMs: Math.max(source.endMs, next.startMs),
    timestampMs: source.timestampMs,
    confidence: source.confidence,
  };
});

// Group into phrases per scene
const phrases = [];
for (let scId = 1; scId <= 9; scId++) {
  const sceneWords = captionWords.filter((w) => w.sceneId === scId);
  for (let start = 0; start < sceneWords.length; ) {
    let end = Math.min(start + 5, sceneWords.length);
    for (let idx = start; idx < end; idx++) {
      if (/[.,!?;:]/u.test(sceneWords[idx].word) && idx - start >= 2) {
        end = idx + 1;
        break;
      }
    }
    const phraseWords = sceneWords.slice(start, end);
    const startMs = phraseWords[0].startMs;
    phrases.push({
      sceneId: scId,
      text: phraseWords.map((entry) => entry.word).join(" "),
      startMs,
      endMs: phraseWords.at(-1).endMs,
      timestampMs: phraseWords[Math.floor(phraseWords.length / 2)].timestampMs,
      confidence: null,
      pageBreakAfter: true,
      words: phraseWords.map(({ word, startMs, endMs, timestampMs, confidence }) => ({
        word,
        startMs,
        endMs,
        timestampMs,
        confidence,
      })),
    });
    start = end;
  }
}

fs.writeFileSync(
  path.join(process.cwd(), "src", "data", "greatwallCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log("Successfully generated", phrases.length, "phrases for Great Wall of China!");
