import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: Introduction & Mystery
  `Hơn 2.300 năm qua, con người vẫn đi tìm một thành phố mà có thể chưa từng tồn tại. Và người đầu tiên kể về nó, có thể đã bịa ra tất cả.`,
  // Scene 2: Plato & Dialogues
  `Câu chuyện về Atlantis xuất phát từ triết gia Hy Lạp Plato, khoảng năm 360 trước Công nguyên, trong hai tác phẩm Timaeus và Critias.`,
  // Scene 3: Mighty Civilization
  `Theo Plato, Atlantis là một hòn đảo cực kỳ hùng mạnh, nằm ngoài Cột trụ Hercules, được cho là eo biển Gibraltar ngày nay, với công nghệ, quân đội và của cải vượt xa mọi nền văn minh khác.`,
  // Scene 4: Cataclysm in One Day and Night
  `Nhưng vì kiêu ngạo và tham lam, các vị thần đã trừng phạt Atlantis. Chỉ trong một ngày một đêm khủng khiếp, cả hòn đảo chìm xuống đáy đại dương, biến mất vĩnh viễn.`,
  // Scene 5: Doubts of Reality
  `Điều thú vị là chính Plato cũng không hề khẳng định đây là chuyện có thật.`,
  // Scene 6: Moral Allegory & Endless Search
  `Nhiều học giả tin rằng ông chỉ dùng Atlantis như một câu chuyện ngụ ngôn để cảnh báo về sự kiêu ngạo và tham vọng quân sự của con người. Dù vậy, suốt hàng thế kỷ, người ta vẫn không ngừng đi tìm Atlantis ngoài đời thực.`,
  // Scene 7: Hypotheses: Santorini, Spain, Antarctica
  `Nhiều giả thuyết được đưa ra, đảo Santorini ở Hy Lạp từng bị núi lửa phá hủy dữ dội, vùng biển gần Tây Ban Nha, thậm chí cả Nam Cực.`,
  // Scene 8: Modern Underwater Search & No Archaeological Proof
  `Cho đến nay, không có bằng chứng khảo cổ học nào xác nhận Atlantis từng tồn tại như Plato mô tả.`,
  // Scene 9: The Eternal Legend
  `Nhưng chính sự bí ẩn đó đã biến Atlantis thành một trong những huyền thoại được nhắc đến nhiều nhất trong lịch sử nhân loại, truyền cảm hứng cho vô số sách, phim ảnh, trò chơi. Có thể Atlantis chưa từng tồn tại. Nhưng suốt hơn 2000 năm, nhân loại vẫn không ngừng tìm kiếm nó. Đó là sức mạnh của một truyền thuyết.`,
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "atlantisCaptionsRaw.json"), "utf8"),
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
  path.join(process.cwd(), "src", "data", "atlantisCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log("Successfully generated", phrases.length, "phrases for Atlantis!");
