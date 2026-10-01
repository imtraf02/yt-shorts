import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 6 wives overview & memory formula
  `Một vị vua đã cưới sáu người vợ. Và công thức để nhớ số phận của họ là, ly hôn, xử tử, chết, ly hôn, xử tử, sống sót.`,
  // Scene 2: Young Henry VIII coronation 1509
  `Henry VIII lên ngôi năm 1509, khi mới 17 tuổi, một chàng trai trẻ đẹp trai, thể thao giỏi, được dân chúng yêu mến như vị vua vàng của nước Anh.`,
  // Scene 3: Catherine of Aragon marriage & daughter
  `Ông kết hôn với Catherine of Aragon, góa phụ của chính anh trai mình. Cuộc hôn nhân kéo dài 24 năm, nhưng chỉ sinh được một con gái sống sót, không có con trai nối dõi.`,
  // Scene 4: Anne Boleyn love, Papal refusal & Church of England break
  `Henry đem lòng yêu Anne Boleyn và quyết định ly hôn Catherine, nhưng Giáo hoàng từ chối chấp thuận. Phản ứng của Henry gây chấn động cả châu Âu, ông ly khai khỏi Giáo hội Công giáo La Mã, tự lập Giáo hội Anh, tự phong mình là người đứng đầu.`,
  // Scene 5: Anne Boleyn gives birth to Elizabeth I
  `Anne Boleyn sinh con gái, sau này là Nữ hoàng Elizabeth I vĩ đại, nhưng vẫn không có con trai.`,
  // Scene 6: Accusation & execution in 1536
  `Chỉ ba năm sau cưới, Henry buộc tội Anne ngoại tình và phản quốc, bà bị chặt đầu năm 1536.`,
  // Scene 7: 4 remaining wives (Jane, Anne, Catherine H, Catherine P)
  `Henry cưới liên tiếp thêm bốn người vợ nữa. Jane Seymour chết sau khi sinh con trai. Anne of Cleves bị ly hôn vì Henry chê không hợp. Catherine Howard bị xử tử vì ngoại tình. Và Catherine Parr là người duy nhất sống sót qua đời ông.`,
  // Scene 8: Obese, bitter, tyrannical late life
  `Cuối đời, Henry trở nên béo phì nghiêm trọng, đau đớn vì vết thương cũ không lành, tính khí thất thường và tàn bạo, hoàn toàn khác với chàng trai trẻ đẹp trai năm xưa.`,
  // Scene 9: Legacy, religious rupture & closing
  `Chỉ vì muốn có một đứa con trai, ông đã thay đổi cả tôn giáo của một quốc gia, và để lại một chuỗi bi kịch mang tên sáu người vợ. Đó là Henry VIII. Theo dõi để nghe thêm những câu chuyện lịch sử ít ai biết.`,
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "henryCaptionsRaw.json"), "utf8"),
);

// Flatten all scene words while preserving scene indices
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

// Now group into phrases PER SCENE so no phrase ever crosses a scene boundary
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
  path.join(process.cwd(), "src", "data", "henryCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log("Successfully generated", phrases.length, "phrases perfectly grouped by scene!");
