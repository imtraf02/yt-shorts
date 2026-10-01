import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: Introduction & Fatal Blow
  `Vị Sa hoàng đầu tiên của nước Nga, trong một cơn thịnh nộ, đã dùng chính cây gậy quyền trượng của mình đánh chết con trai ruột. Và ông không bao giờ tha thứ cho chính mình.`,
  // Scene 2: Childhood & Boyar intrigue
  `Ivan mồ côi cha từ năm 3 tuổi, mẹ qua đời khi ông mới 8 tuổi. Lớn lên giữa những âm mưu tranh giành quyền lực tàn khốc trong cung điện, chứng kiến các quý tộc Boyar giết hại người thân, tranh đoạt tài sản ngay trước mắt mình.`,
  // Scene 3: Coronation at 16, First Tsar
  `Năm 16 tuổi, Ivan lên ngôi và tự phong là Sa hoàng đầu tiên trong lịch sử Nga, danh xưng bắt nguồn từ Caesar, khẳng định quyền lực tối cao ngang hàng hoàng đế La Mã.`,
  // Scene 4: Golden Era of Reform
  `Giai đoạn đầu trị vì, Ivan thực sự là một nhà cải cách tài giỏi, xây dựng bộ luật mới, mở rộng lãnh thổ Nga, thành lập lực lượng quân đội thường trực đầu tiên.`,
  // Scene 5: Paranoia and Terror
  `Nhưng sau khi người vợ yêu quý Anastasia qua đời, nghi bị đầu độc, Ivan trở nên hoang tưởng và tàn bạo. Ông tin rằng giới quý tộc âm mưu hại mình, và bắt đầu một cuộc thanh trừng đẫm máu khắp nước Nga, hàng nghìn người bị tra tấn, xử tử.`,
  // Scene 6: Quarrel in 1581
  `Năm 1581, trong một cơn giận dữ vì con dâu đang mang thai mặc trang phục không phù hợp, Ivan đánh đập bà. Con trai cả, Ivan Ivanovich, đến can ngăn.`,
  // Scene 7: The Fatal Strike
  `Trong cơn thịnh nộ mất kiểm soát, Sa hoàng vung cây quyền trượng bịt sắt đánh vào đầu chính con trai mình. Người con trai qua đời vài ngày sau đó.`,
  // Scene 8: Repentance and Despair
  `Ivan suy sụp hoàn toàn, người thừa kế duy nhất có năng lực đã chết dưới chính tay ông, để lại ngai vàng cho người con trai còn lại yếu đuối, thiếu năng lực trị vì.`,
  // Scene 9: Legacy of Ivan the Terrible
  `Vị vua xây dựng nên cả một đế chế Nga hùng mạnh lại tự tay phá hủy tương lai của chính dòng họ mình. Đó là Ivan Bạo chúa.`,
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "ivanCaptionsRaw.json"), "utf8"),
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
  path.join(process.cwd(), "src", "data", "ivanCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log("Successfully generated", phrases.length, "phrases for Ivan the Terrible!");
