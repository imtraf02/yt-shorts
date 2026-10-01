import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 5,000 years ago mystery & 25-ton blocks
  `5.000 năm trước, con người chưa có bánh xe, chưa có chữ viết, nhưng đã kéo những khối đá nặng tới 25 tấn đi xa hàng trăm km để dựng nên một vòng tròn bí ẩn. Đến nay, không ai biết chắc họ làm điều đó để làm gì.`,
  // Scene 2: Wiltshire, England & older than Giza pyramids
  `Stonehenge tọa lạc tại vùng Wiltshire, nước Anh, được xây dựng qua nhiều giai đoạn, bắt đầu từ khoảng 3.000 năm trước Công nguyên, thời điểm này Ai Cập còn chưa xây Kim tự tháp Giza.`,
  // Scene 3: Sarsen 25-ton giant blocks
  `Công trình gồm hai loại đá chính: những khối đá Sarsen khổng lồ nặng tới 25 tấn, lấy từ khu vực cách đó khoảng 30 km,`,
  // Scene 4: Preseli Bluestones from Wales 240km away
  `và những phiến đá xanh nhỏ hơn, nhưng đặc biệt hơn, được xác định có nguồn gốc từ vùng đồi Preseli ở xứ Wales, cách xa tới 240 km.`,
  // Scene 5: Stone Age transport mystery (sleds & rollers)
  `Điều gây sốc nhất, làm sao người thời đồ đá vận chuyển những khối đá khổng lồ đi xa như vậy mà không có bánh xe, không có kim loại? Các nhà khoa học đưa ra giả thuyết họ dùng xe trượt gỗ, con lăn, thậm chí có thể vận chuyển một phần bằng đường thủy qua sông.`,
  // Scene 6: Astronomical solstice alignment
  `Mục đích thực sự của Stonehenge vẫn là chủ đề tranh cãi suốt hàng thế kỷ. Một số cho rằng đây là đài quan sát thiên văn, vì các phiến đá thẳng hàng chính xác với hướng mặt trời mọc ngày hạ chí và lặn ngày đông chí.`,
  // Scene 7: Cremation burials & sacred ancestral grounds
  `Các khai quật khảo cổ khác lại tìm thấy hàng trăm hài cốt hỏa táng quanh khu vực, cho thấy đây có thể từng là một nghĩa địa hoặc nơi thờ cúng tổ tiên linh thiêng.`,
  // Scene 8: 2022 Altar Stone Scottish discovery (750km)
  `Một nghiên cứu công bố năm 2022 còn gây chấn động khi phát hiện phiến đá bàn thờ trung tâm thực chất có nguồn gốc từ tận Scotland, cách đó hơn 750 km, cho thấy Stonehenge có thể là biểu tượng đoàn kết giữa các cộng đồng khắp nước Anh thời cổ đại.`,
  // Scene 9: 5,000-year timeless enigma
  `Không có văn tự, không có tên người xây dựng, không một lời giải thích để lại, nhưng Stonehenge vẫn đứng vững suốt 5.000 năm, thách thức mọi lời giải đáp của con người hiện đại.`,
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "stonehengeCaptionsRaw.json"), "utf8"),
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
  path.join(process.cwd(), "src", "data", "stonehengeCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log("Successfully generated", phrases.length, "phrases for Stonehenge!");
