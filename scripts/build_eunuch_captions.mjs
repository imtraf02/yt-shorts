import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-eunuch-scene.png
  `Suốt hơn 3.000 năm, các hoàng đế đã tin tưởng giao cả cung điện cho một nhóm người, bằng cách tước đi của họ thứ mà đàn ông coi trọng nhất.`,
  // Scene 2: 02-eunuch-scene.png
  `Chế độ thái giám xuất hiện sớm nhất tại vùng Lưỡng Hà cổ đại và đế chế Assyria khoảng thế kỷ 8 trước Công nguyên, trước khi lan rộng khắp Trung Đông, Byzantine, Ottoman và đặc biệt phát triển mạnh tại Trung Quốc.`,
  // Scene 3: 03-eunuch-scene.png
  `Lý do cốt lõi rất thực dụng, hoàng đế cần người hầu cận trong hậu cung, nơi có hàng trăm, hàng nghìn phi tần, nhưng lại không thể tin tưởng đàn ông bình thường ở gần vợ mình.`,
  // Scene 4: 04-eunuch-scene.png
  `Thái giám, sau khi bị tịnh thân, không thể có con nối dõi, nghĩa là họ không có tham vọng lập dòng họ riêng, không thể tranh giành ngai vàng cho con cháu. Điều này khiến hoàng đế yên tâm giao phó quyền lực. Tại Trung Quốc, chế độ thái giám tồn tại từ thời nhà Thương, Chu cho đến khi nhà Thanh sụp đổ năm 1912, kéo dài hơn 3.000 năm.`,
  // Scene 5: 05-eunuch-scene.png
  `Phần lớn xuất thân từ gia đình nghèo khó, cha mẹ tự nguyện đưa con vào cung với hy vọng đổi đời.`,
  // Scene 6: 06-eunuch-scene.png
  `Một số thái giám vươn lên quyền lực cực lớn, thậm chí thao túng cả triều đình, như Ngụy Trung Hiền thời Minh khiến cả triều thần khiếp sợ,`,
  // Scene 7: 07-eunuch-scene.png
  `hay ngược lại, nhà hàng hải Trịnh Hòa, thái giám dẫn hạm đội khổng lồ đi khắp Đông Nam Á, Ấn Độ, tận châu Phi.`,
  // Scene 8: 08-eunuch-scene.png
  `Tại đế chế Ottoman, thái giám da đen canh giữ hậu cung Sultan, trong khi thái giám da trắng phụ trách các công việc hành chính khác, tạo thành hai hệ thống quyền lực song song trong triều đình.`,
  // Scene 9: 09-eunuch-scene.png
  `Chế độ thái giám chính thức chấm dứt cùng với sự sụp đổ của các triều đại phong kiến đầu thế kỷ 20, tại Trung Quốc, một số thái giám cuối cùng vẫn còn sống trong Tử Cấm Thành đến tận những năm 1920.`,
  // Scene 10: 10-eunuch-scene.png
  `Một chế độ ra đời từ sự nghi kỵ và quyền lực tuyệt đối, đã tồn tại xuyên suốt hàng chục triều đại, để rồi biến mất cùng với chính những ngai vàng mà nó từng phục vụ. Đó là nguồn gốc của thái giám.`,
];

const SCENE_BADGES = [
  "BÍ MẬT HOÀNG CUNG • TƯỚC ĐOẠT BẢN NĂNG",
  "NGUỒN GỐC CỔ ĐẠI • LƯỠNG HÀ & ASSYRIA",
  "HẬU CUNG BA NGHÌN GIA NHÂN • SỰ NGHI KỴ",
  "BA NGHÌN NĂM LỊCH SỬ • THƯƠNG ĐẾN THANH",
  "BI KỊCH NGHÈO ĐÓI • HY VỌNG ĐỔI ĐỜI",
  "QUYỀN LỰC ĐEN TỐI • THAO TÚNG TRIỀU ĐÌNH",
  "ĐẠI HẢI TRÌNH TRỊNH HÒA • HẠM ĐỘI KHỔNG LỒ",
  "ĐẾ CHẾ OTTOMAN • HAI NHÁNH QUYỀN LỰC",
  "HOÀNG HÔN PHONG KIẾN • TỬ CẤM THÀNH 1920",
  "KHÉP LẠI QUÁ KHỨ • TÀN DƯ MỘT TRIỀU ĐẠI",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "eunuchCaptionsRaw.json"), "utf8"),
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
for (let scId = 1; scId <= 10; scId++) {
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
  path.join(process.cwd(), "src", "data", "eunuchCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log(`Generated ${phrases.length} phrases in eunuchCaptions.json`);

// Create src/data/eunuchSubtitles.ts
const subtitlesTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./eunuchCaptions.json";

export interface EunuchWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface EunuchPhrase extends Caption {
  readonly sceneId: number;
  readonly words: EunuchWordTiming[];
}

export interface EunuchSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const EUNUCH_FPS = 30;
export const EUNUCH_AUDIO_PATH = "audio/eunuch.wav";
export const EUNUCH_AUDIO_FRAMES = 2619; // 87.30s @ 30fps
export const EUNUCH_TOTAL_FRAMES = EUNUCH_AUDIO_FRAMES + 30; // 2649 frames
export const EUNUCH_TRANSITION_FRAMES = 18;

export const EUNUCH_PHRASES = rawCaptions as EunuchPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-eunuch-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-eunuch-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-eunuch-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-eunuch-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-eunuch-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-eunuch-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-eunuch-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-eunuch-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-eunuch-scene.png", badge: "${SCENE_BADGES[8]}" },
  { id: 10, image: "10-eunuch-scene.png", badge: "${SCENE_BADGES[9]}" },
];

export const EUNUCH_SCENES: EunuchSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = EUNUCH_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = EUNUCH_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * EUNUCH_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * EUNUCH_FPS)
      : EUNUCH_TOTAL_FRAMES;
    const halfTransition = Math.floor(EUNUCH_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? EUNUCH_TOTAL_FRAMES
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
  path.join(process.cwd(), "src", "data", "eunuchSubtitles.ts"),
  subtitlesTsContent,
);
console.log("Successfully created src/data/eunuchSubtitles.ts!");
