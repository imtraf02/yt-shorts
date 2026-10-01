import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: Introduction & The 6-million ton wonder
  `4.500 năm trước, con người đã xây một công trình nặng gần 6 triệu tấn, mà không có bánh xe, không có máy móc, không có cả sắt thép. Đến nay, các nhà khoa học vẫn tranh cãi, họ làm điều đó bằng cách nào?`,
  // Scene 2: Pharaoh Khufu & 3,800-year record
  `Đại Kim tự tháp Giza được xây dựng cho pharaoh Khufu vào khoảng năm 2560 trước Công nguyên, là công trình cao nhất thế giới suốt hơn 3.800 năm, kỷ lục không bị phá vỡ cho đến thời hiện đại.`,
  // Scene 3: 2.3 million blocks & 80-ton granite
  `Kim tự tháp được ghép từ khoảng 2,3 triệu khối đá vôi và đá granite, mỗi khối nặng trung bình 2,5 tấn, có khối nặng tới 80 tấn. Tổng khối lượng công trình lên tới gần 6 triệu tấn.`,
  // Scene 4: The lifting mystery to 140m
  `Điều gây tranh cãi nhất, làm sao người Ai Cập cổ đại vận chuyển và nâng những khối đá khổng lồ này lên độ cao hơn 140 mét mà không có ròng rọc hiện đại, không có cần cẩu?`,
  // Scene 5: Ramp theory & wet sand sleds
  `Giả thuyết được chấp nhận rộng rãi nhất, họ xây những con dốc đất nghiêng khổng lồ bao quanh kim tự tháp, dùng xe trượt gỗ kéo đá lên qua dốc, kết hợp làm ướt cát để giảm ma sát, một kỹ thuật đã được minh họa trong tranh vẽ Ai Cập cổ.`,
  // Scene 6: Workers, not slaves
  `Trái với suy nghĩ phổ biến rằng đây là công trình của nô lệ, các nhà khảo cổ tìm thấy bằng chứng cho thấy phần lớn được xây bởi công nhân được trả công, có nơi ở, được cung cấp bánh mì, bia, thịt, thậm chí được chôn cất tử tế gần kim tự tháp như một vinh dự.`,
  // Scene 7: 30,000 workers for 20 years
  `Ước tính cần khoảng 20 đến 30 nghìn công nhân, làm việc liên tục trong khoảng 20 năm để hoàn thành toàn bộ công trình, với độ chính xác đến kinh ngạc,`,
  // Scene 8: Perfect cardinal alignment
  `các mặt kim tự tháp gần như thẳng hàng hoàn hảo với bốn hướng la bàn.`,
  // Scene 9: Eternal wonder of human history
  `Không có máy móc hiện đại, không có văn bản ghi chép chi tiết, nhưng người Ai Cập cổ đại đã để lại một công trình khiến cả thế giới hiện đại vẫn phải ngả mũ thán phục. Đó là Đại Kim tự tháp Giza.`,
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "gizaCaptionsRaw.json"), "utf8"),
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
  path.join(process.cwd(), "src", "data", "gizaCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log("Successfully generated", phrases.length, "phrases for Great Pyramid of Giza!");
