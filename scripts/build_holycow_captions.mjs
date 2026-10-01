import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-holycow-scene.png
  `Ở Ấn Độ, con bò được tôn kính hơn cả nhiều vị vua. Không ai được phép giết nó. Nhưng lý do đằng sau lại không chỉ đơn giản là tôn giáo.`,
  // Scene 2: 02-holycow-scene.png
  `Trong Ấn Độ giáo, con bò được gọi là Gau Mata, nghĩa là Mẹ Bò, biểu tượng của sự nuôi dưỡng, hy sinh và lòng bao dung, vì nó cho sữa nuôi con người mà không đòi hỏi gì.`,
  // Scene 3: 03-holycow-scene.png
  `Nhiều vị thần quan trọng gắn liền với hình ảnh con bò. Thần Krishna thời trẻ là một người chăn bò. Thần Shiva cưỡi con bò thần Nandi. Và Kamadhenu là con bò thần thoại có khả năng ban phát mọi điều ước.`,
  // Scene 4: 04-holycow-scene.png
  `Nguyên tắc Ahimsa, bất bạo động, trong Ấn Độ giáo cũng đóng vai trò lớn. Bò được xem là loài vật hiền lành, không gây hại, nên việc sát hại nó bị coi là hành động đặc biệt tàn nhẫn.`,
  // Scene 5: 05-holycow-scene.png
  `Nhưng đằng sau tín ngưỡng còn có lý do thực tiễn lịch sử. Trong xã hội nông nghiệp Ấn Độ hàng nghìn năm qua, bò là tài sản sống còn, kéo cày, cho sữa,`,
  // Scene 6: 06-holycow-scene.png
  `và phân bò dùng làm nhiên liệu, phân bón. Giết một con bò đồng nghĩa với phá hủy sinh kế của cả gia đình.`,
  // Scene 7: 07-holycow-scene.png
  `Ngày nay, việc bảo vệ bò không chỉ dừng ở tôn giáo mà còn trở thành vấn đề pháp lý và chính trị. Nhiều bang ở Ấn Độ ban hành luật cấm giết mổ bò, với hình phạt nghiêm khắc.`,
  // Scene 8: 08-holycow-scene.png
  `Điều thú vị, không phải toàn bộ dân số Ấn Độ đều kiêng thịt bò. Nhiều cộng đồng như người Hồi giáo, Cơ đốc giáo, hay một số vùng ở Đông Bắc Ấn Độ vẫn tiêu thụ thịt bò bình thường, cho thấy đây là vấn đề đa dạng văn hóa phức tạp hơn nhiều người nghĩ.`,
  // Scene 9: 09-holycow-scene.png
  `Không đơn thuần là một tín ngưỡng, đó là sự giao thoa giữa tâm linh, sinh tồn và bản sắc văn hóa suốt hàng nghìn năm. Đó là lý do Ấn Độ thờ bò.`,
];

const SCENE_BADGES = [
  "LINH VẬT TÔN KÍNH • VĂN HÓA ẤN ĐỘ",
  "GAU MATA • MẸ BÒ THIÊNG LIÊNG",
  "HÌNH TƯỢNG THẦN THOẠI • KRISHNA & SHIVA",
  "NGUYÊN TẮC AHIMSA • BẤT BẠO ĐỘNG",
  "TRỤ CỘT NÔNG NGHIỆP • TÀI SẢN SỐNG CÒN",
  "NGUỒN SỐNG GIA ĐÌNH • SINH KẾ NÔNG THÔN",
  "LUẬT PHÁP BẢO VỆ • TRANH CÃI CHÍNH TRỊ",
  "GÓC NHÌN ĐA CHIỀU • ĐA DẠNG VĂN HÓA",
  "BẢN SẮC NGÀN NĂM • TÂM LINH & SINH TỒN",
];

const normalize = (word) =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/gu, "");

const cleanWord = (word) =>
  word.replace(/^[.,!?;:”“"'…()]+|[.,!?;:”“"'…()]+$/gu, "");

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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "holycowCaptionsRaw.json"), "utf8"),
);

const allWordsWithScene = [];
SCENE_SCRIPTS.forEach((text, sceneIdx) => {
  const words = text.match(/\S+/gu) ?? [];
  words.forEach((w) => {
    allWordsWithScene.push({
      original: w,
      clean: cleanWord(w),
      sceneId: sceneIdx + 1,
    });
  });
});

const heard = raw.map((caption) => normalize(caption.text));
const expected = allWordsWithScene.map((entry) => normalize(entry.clean));

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

// Fix missing word 0 ("Ở" precedes "Ấn")
if (wordToRaw[0] === -1 && wordToRaw[1] !== -1) {
  // Let "Ở" be 0 to 180ms, shift word 1 startMs to 180ms
  wordToRaw[0] = 0;
}

// Fill any other missing mappings
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

// Build caption words with monotonic times
const captionWords = allWordsWithScene.map((entry, index) => {
  const rawIdx = wordToRaw[index];
  const source = raw[rawIdx];
  const nextRaw = raw[Math.min(raw.length - 1, rawIdx + 1)];

  let startMs = source.startMs;
  let endMs = Math.max(source.endMs, nextRaw.startMs);

  // Special manual micro-timing adjustments
  if (index === 0) {
    // "Ở"
    startMs = 0;
    endMs = 200;
  } else if (index === 1) {
    // "Ấn"
    startMs = 200;
    endMs = 440;
  } else if (index === 52 && entry.clean === "hy") {
    // "hy" from "heising"
    startMs = source.startMs;
    endMs = Math.round((source.startMs + source.endMs) / 2);
  } else if (index === 53 && entry.clean === "sinh") {
    // "sinh" from "heising"
    startMs = Math.round((source.startMs + source.endMs) / 2);
    endMs = source.endMs;
  }

  return {
    original: entry.original,
    word: entry.clean,
    sceneId: entry.sceneId,
    startMs,
    endMs: Math.max(startMs + 80, endMs),
    timestampMs: source.timestampMs,
    confidence: source.confidence,
  };
});

// Enforce strictly non-decreasing startMs and endMs >= startMs + 60
for (let k = 1; k < captionWords.length; k++) {
  if (captionWords[k].startMs < captionWords[k - 1].startMs) {
    captionWords[k].startMs = captionWords[k - 1].endMs;
  }
  if (captionWords[k].endMs <= captionWords[k].startMs) {
    captionWords[k].endMs = captionWords[k].startMs + 120;
  }
}

// Group into short, punchy phrases per scene (target 3-4 words, min 2)
const phrases = [];
for (let scId = 1; scId <= 9; scId++) {
  const sceneWords = captionWords.filter((w) => w.sceneId === scId);
  const scenePhrases = [];
  for (let start = 0; start < sceneWords.length; ) {
    let end = Math.min(start + 4, sceneWords.length);
    // Break early if punctuation in original word (comma, period, semicolon)
    for (let idx = start; idx < end; idx++) {
      if (/[.,!?;:]/u.test(sceneWords[idx].original) && idx - start >= 2) {
        end = idx + 1;
        break;
      }
    }
    // Prevent leaving an orphan single word at the end
    const remainingAfter = sceneWords.length - end;
    if (remainingAfter === 1) {
      // either take the remaining word if length <= 4, or take one less
      if (end - start <= 3) {
        end += 1;
      }
    }

    const phraseWords = sceneWords.slice(start, end);
    scenePhrases.push(phraseWords);
    start = end;
  }

  // If the last phrase is just 1 word, merge it into the previous phrase
  if (scenePhrases.length > 1 && scenePhrases[scenePhrases.length - 1].length === 1) {
    const lastWord = scenePhrases.pop();
    scenePhrases[scenePhrases.length - 1].push(...lastWord);
  }

  // Convert to phrase objects
  for (const phraseWords of scenePhrases) {
    const startMs = phraseWords[0].startMs;
    const endMs = phraseWords.at(-1).endMs;
    phrases.push({
      sceneId: scId,
      text: phraseWords.map((entry) => entry.word).join(" "),
      startMs,
      endMs,
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
  }
}

// Save phrases JSON
fs.writeFileSync(
  path.join(process.cwd(), "src", "data", "holycowCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log(`Generated ${phrases.length} phrases in holycowCaptions.json`);

// Create src/data/holycowSubtitles.ts
const subtitlesTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./holycowCaptions.json";

export interface HolyCowWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface HolyCowPhrase extends Caption {
  readonly sceneId: number;
  readonly words: HolyCowWordTiming[];
}

export interface HolyCowSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const HOLYCOW_FPS = 30;
export const HOLYCOW_AUDIO_PATH = "audio/holycow.wav";
export const HOLYCOW_AUDIO_FRAMES = 2264; // 75.45s @ 30fps
export const HOLYCOW_TOTAL_FRAMES = HOLYCOW_AUDIO_FRAMES + 30; // 2294 frames
export const HOLYCOW_TRANSITION_FRAMES = 18;

export const HOLYCOW_PHRASES = rawCaptions as HolyCowPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-holycow-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-holycow-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-holycow-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-holycow-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-holycow-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-holycow-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-holycow-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-holycow-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-holycow-scene.png", badge: "${SCENE_BADGES[8]}" },
];

export const HOLYCOW_SCENES: HolyCowSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = HOLYCOW_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = HOLYCOW_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * HOLYCOW_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * HOLYCOW_FPS)
      : HOLYCOW_TOTAL_FRAMES;
    const halfTransition = Math.floor(HOLYCOW_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? HOLYCOW_TOTAL_FRAMES
        : nextCaptionStartFrame + halfTransition;

    return {
      ...scene,
      captionStartFrame,
      startFrame,
      durationInFrames: Math.max(1, endFrame - startFrame),
    };
  },
);
`;

fs.writeFileSync(
  path.join(process.cwd(), "src", "data", "holycowSubtitles.ts"),
  subtitlesTsContent,
);
console.log("Successfully created src/data/holycowSubtitles.ts!");
