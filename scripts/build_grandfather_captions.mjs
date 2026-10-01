import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-grandfather-scene.png
  `Nếu bạn quay ngược thời gian và khiến ông nội mình qua đời trước khi ông gặp bà, liệu bạn có còn tồn tại để thực hiện chuyến đi đó? Đây là nghịch lý khiến các nhà vật lý học đau đầu suốt gần một thế kỷ.`,
  // Scene 2: 02-grandfather-scene.png
  `Nghịch lý ông nội là một trong những nghịch lý nổi tiếng nhất về du hành thời gian, lần đầu được nhà văn khoa học viễn tưởng René Barjavel mô tả trong tiểu thuyết năm 1943. Tình huống đặt ra rất đơn giản. Giả sử bạn có một cỗ máy thời gian, bạn quay ngược về quá khứ và khiến ông nội mình qua đời trước khi ông kịp gặp bà và sinh ra cha hoặc mẹ của bạn.`,
  // Scene 3: 03-grandfather-scene.png
  `Nếu ông nội mất trước khi có con, cha hoặc mẹ bạn sẽ không bao giờ được sinh ra, và do đó, bạn cũng sẽ không tồn tại. Nhưng nếu bạn không tồn tại, thì làm sao bạn có thể quay ngược thời gian để khiến ông nội mình qua đời ngay từ đầu? Đây chính là vòng lặp nghịch lý, một hành động tự nó phủ định chính nguyên nhân dẫn đến nó.`,
  // Scene 4: 04-grandfather-scene.png
  `Về bản chất, nghịch lý này chạm đến một trong những nguyên lý cốt lõi của vật lý học, tính nhân quả, tức là nguyên nhân luôn phải xảy ra trước kết quả. Du hành thời gian ngược, nếu có thể, sẽ phá vỡ hoàn toàn trật tự nhân quả này. Các nhà khoa học và triết học đã đưa ra nhiều cách lý giải khác nhau. Một hướng tiếp cận cho rằng nếu bạn thực sự quay về quá khứ, bạn sẽ không bao giờ có thể khiến ông nội mình qua đời được, vì một lý do bất khả kháng nào đó luôn ngăn cản hành động ấy xảy ra, súng bị kẹt đạn, bạn đổi ý vào phút chót, hoặc một sự kiện ngẫu nhiên can thiệp. Đây được gọi là nguyên lý tự nhất quán của Novikov, cho rằng lịch sử luôn tự bảo toàn tính logic của nó.`,
  // Scene 5: 05-grandfather-scene.png
  `Một hướng giải thích khác đến từ cách diễn giải đa vũ trụ trong cơ học lượng tử. Theo giả thuyết này, khi bạn quay ngược thời gian và khiến ông nội qua đời, bạn không thay đổi lịch sử của chính vũ trụ mình đang sống, mà tạo ra một nhánh vũ trụ song song hoàn toàn mới. Trong vũ trụ gốc, bạn vẫn tồn tại bình thường. Trong vũ trụ mới, một phiên bản khác của bạn sẽ không bao giờ được sinh ra, nhưng điều đó không ảnh hưởng đến "bạn" ở vũ trụ ban đầu.`,
  // Scene 6: 06-grandfather-scene.png
  `Cho đến nay, chưa ai chứng minh được du hành thời gian ngược là khả thi trong thực tế, nên nghịch lý này vẫn chỉ tồn tại trên lý thuyết. Nhưng chính vì chưa có lời giải cuối cùng, nó vẫn tiếp tục là một trong những câu đố hóc búa nhất của vật lý học hiện đại,`,
  // Scene 7: 07-grandfather-scene.png
  `đủ sức truyền cảm hứng cho vô số bộ phim khoa học viễn tưởng từ Back to the Future cho đến nhiều tác phẩm khác. Đó là nghịch lý ông nội.`,
];

const SCENE_BADGES = [
  "NGHỊCH LÝ THỜI GIAN • CÂU HỎI MỘT THẾ KỶ",
  "RENÉ BARJAVEL 1943 • BÀI TOÁN QUÁ KHỨ",
  "VÒNG LẶP NGHỊCH LÝ • PHỦ ĐỊNH NGUYÊN NHÂN",
  "TÍNH NHÂN QUẢ • NGUYÊN LÝ NOVIKOV",
  "THUYẾT ĐA VŨ TRỤ • NHÁNH THỜI GIAN MỚI",
  "RANH GIỚI VẬT LÝ • CÂU ĐỐ CHƯA CÓ LỜI GIẢI",
  "NGUỒN CẢM HỨNG • BACK TO THE FUTURE",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "grandfatherCaptionsRaw.json"), "utf8"),
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

// Fill any missing mappings
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
for (let scId = 1; scId <= 7; scId++) {
  const sceneWords = captionWords.filter((w) => w.sceneId === scId);
  const scenePhrases = [];
  for (let start = 0; start < sceneWords.length; ) {
    let end = Math.min(start + 4, sceneWords.length);
    for (let idx = start; idx < end; idx++) {
      if (/[.,!?;:]/u.test(sceneWords[idx].original) && idx - start >= 2) {
        end = idx + 1;
        break;
      }
    }
    const remainingAfter = sceneWords.length - end;
    if (remainingAfter === 1) {
      if (end - start <= 3) {
        end += 1;
      }
    }

    const phraseWords = sceneWords.slice(start, end);
    scenePhrases.push(phraseWords);
    start = end;
  }

  if (scenePhrases.length > 1 && scenePhrases[scenePhrases.length - 1].length === 1) {
    const lastWord = scenePhrases.pop();
    scenePhrases[scenePhrases.length - 1].push(...lastWord);
  }

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
  path.join(process.cwd(), "src", "data", "grandfatherCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log(`Generated ${phrases.length} phrases in grandfatherCaptions.json`);

// Create src/data/grandfatherSubtitles.ts
const subtitlesTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./grandfatherCaptions.json";

export interface GrandfatherWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface GrandfatherPhrase extends Caption {
  readonly sceneId: number;
  readonly words: GrandfatherWordTiming[];
}

export interface GrandfatherSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const GRANDFATHER_FPS = 30;
export const GRANDFATHER_AUDIO_PATH = "audio/grandfather.wav";
export const GRANDFATHER_AUDIO_FRAMES = 3514; // 117.13s @ 30fps
export const GRANDFATHER_TOTAL_FRAMES = GRANDFATHER_AUDIO_FRAMES + 30; // 3544 frames
export const GRANDFATHER_TRANSITION_FRAMES = 18;

export const GRANDFATHER_PHRASES = rawCaptions as GrandfatherPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-grandfather-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-grandfather-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-grandfather-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-grandfather-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-grandfather-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-grandfather-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-grandfather-scene.png", badge: "${SCENE_BADGES[6]}" },
];

export const GRANDFATHER_SCENES: GrandfatherSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = GRANDFATHER_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = GRANDFATHER_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * GRANDFATHER_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * GRANDFATHER_FPS)
      : GRANDFATHER_TOTAL_FRAMES;
    const halfTransition = Math.floor(GRANDFATHER_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? GRANDFATHER_TOTAL_FRAMES
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
  path.join(process.cwd(), "src", "data", "grandfatherSubtitles.ts"),
  subtitlesTsContent,
);
console.log("Successfully created src/data/grandfatherSubtitles.ts!");
