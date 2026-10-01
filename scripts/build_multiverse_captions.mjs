import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-parallel-self.png
  `Ngay lúc này, có thể có một phiên bản khác của bạn đang sống ở một vũ trụ hoàn toàn khác. Và ý tưởng điên rồ này lại đến từ một trong những lý thuyết vật lý nghiêm túc nhất thế kỷ 20.`,
  // Scene 2: 02-hugh-everett.png
  `Năm 1957, một nghiên cứu sinh vật lý tên Hugh Everett III tại Đại học Princeton đưa ra một ý tưởng táo bạo để giải quyết bài toán hóc búa nhất của cơ học lượng tử, nghịch lý con mèo Schrödinger.`,
  // Scene 3: 03-schrodinger-cat.png
  `Trong cơ học lượng tử, một hạt có thể tồn tại ở nhiều trạng thái cùng lúc cho đến khi bị quan sát.`,
  // Scene 4: 04-splitting-universes.png
  `Câu hỏi đặt ra, điều gì xảy ra với các trạng thái còn lại khi ta chọn quan sát một kết quả? Everett đề xuất, không có gì biến mất cả. Mỗi khi một sự kiện lượng tử xảy ra, vũ trụ tách ra thành nhiều nhánh song song, mỗi nhánh chứa một kết quả khác nhau. Đây gọi là lý thuyết Đa Thế Giới.`,
  // Scene 5: 05-rejection-tragic-life.png
  `Điều đáng buồn, khi công bố, lý thuyết của Everett bị giới khoa học chế giễu và phớt lờ hoàn toàn. Ông rời bỏ giới học thuật, làm việc cho quân đội Mỹ, rơi vào nghiện rượu và qua đời ở tuổi 51 mà không hề biết lý thuyết của mình sẽ trở nên nổi tiếng.`,
  // Scene 6: 06-cosmology-string-theory.png
  `Ngày nay, nhiều nhà vật lý hàng đầu thế giới xem xét nghiêm túc ý tưởng đa vũ trụ, không chỉ từ cơ học lượng tử, mà còn từ lý thuyết dây và vũ trụ học lạm phát,`,
  // Scene 7: 07-bubble-universes.png
  `cho rằng có thể tồn tại vô số vũ trụ bong bóng với các định luật vật lý khác nhau.`,
  // Scene 8: 08-untestable-frontier.png
  `Nhưng có một vấn đề lớn, đến nay, chưa có cách nào để kiểm chứng sự tồn tại của các vũ trụ song song bằng thực nghiệm, khiến nhiều nhà khoa học vẫn xem đây là ranh giới giữa vật lý và triết học.`,
  // Scene 9: 09-legacy-in-parallel.png
  `Người đàn ông đưa ra ý tưởng có thể thay đổi cách ta hiểu về thực tại lại chết trong lãng quên. Nhưng ở đâu đó, trong một vũ trụ song song, có thể ông đã được cả thế giới công nhận ngay lúc còn sống.`,
];

const SCENE_BADGES = [
  "MỘT PHIÊN BẢN KHÁC CỦA BẠN • VŨ TRỤ SONG SONG",
  "HUGH EVERETT III 1957 • NGHỊCH LÝ SCHRÖDINGER",
  "TRẠNG THÁI LƯỢNG TỬ • CON MÈO SỐNG VÀ CHẾT",
  "LÝ THUYẾT ĐA THẾ GIỚI • PHÂN NHÁNH VÔ TẬN",
  "BI KỊCH THIÊN TÀI • BỊ GIỚI HỌC THUẬT PHỚT LỜ",
  "LÝ THUYẾT DÂY & VŨ TRỤ HỌC LẠM PHÁT",
  "VÔ SỐ VŨ TRỤ BONG BÓNG TRONG ĐA VŨ TRỤ",
  "RANH GIỚI VẬT LÝ VÀ TRIẾT HỌC • CHƯA THỂ KIỂM CHỨNG",
  "Ở MỘT VŨ TRỤ KHÁC • ĐƯỢC CẢ THẾ GIỚI CÔNG NHẬN",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "multiverseCaptionsRaw.json"), "utf8"),
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

let i = expected.length;
let j = heard.length;
const alignments = [];
while (i > 0 || j > 0) {
  if (
    i > 0 &&
    j > 0 &&
    dp[i][j] === dp[i - 1][j - 1] + score(expected[i - 1], heard[j - 1])
  ) {
    alignments.push({ expectedIndex: i - 1, heardIndex: j - 1 });
    i--;
    j--;
  } else if (i > 0 && dp[i][j] === dp[i - 1][j] - 1) {
    alignments.push({ expectedIndex: i - 1, heardIndex: null });
    i--;
  } else {
    alignments.push({ expectedIndex: null, heardIndex: j - 1 });
    j--;
  }
}
alignments.reverse();

const matchedExpected = alignments.filter(
  (entry) => entry.expectedIndex !== null,
);

const alignedTimings = matchedExpected.map((match) => {
  const expectedMeta = allWordsWithScene[match.expectedIndex];
  if (match.heardIndex !== null) {
    const rawMatch = raw[match.heardIndex];
    return {
      word: expectedMeta.original,
      clean: expectedMeta.clean,
      sceneId: expectedMeta.sceneId,
      startMs: rawMatch.startMs,
      endMs: rawMatch.endMs,
      confidence: rawMatch.confidence ?? null,
    };
  }
  return {
    word: expectedMeta.original,
    clean: expectedMeta.clean,
    sceneId: expectedMeta.sceneId,
    startMs: null,
    endMs: null,
    confidence: null,
  };
});

// Interpolate any unaligned words smoothly
for (let k = 0; k < alignedTimings.length; k++) {
  if (alignedTimings[k].startMs === null) {
    let prev = k - 1;
    while (prev >= 0 && alignedTimings[prev].endMs === null) prev--;
    let next = k + 1;
    while (next < alignedTimings.length && alignedTimings[next].startMs === null)
      next++;

    const prevEnd = prev >= 0 ? alignedTimings[prev].endMs : 0;
    const nextStart =
      next < alignedTimings.length
        ? alignedTimings[next].startMs
        : prevEnd + 400 * (next - prev);
    const gap = Math.max(150, nextStart - prevEnd);
    const span = next - prev;
    const step = gap / span;
    const offset = k - prev;

    alignedTimings[k].startMs = Math.round(prevEnd + (offset - 1) * step);
    alignedTimings[k].endMs = Math.round(prevEnd + offset * step);
  }
}

// Group into phrases for YouTube Shorts subtitle display (3-4 words per phrase)
const phrases = [];
let currentGroup = [];

for (let idx = 0; idx < alignedTimings.length; idx++) {
  const item = alignedTimings[idx];
  const lastChar = item.word.slice(-1);
  const isPunctuation = [".", ",", "!", "?", ";", ":"].includes(lastChar);
  const isSceneEnd = idx < alignedTimings.length - 1 && alignedTimings[idx + 1].sceneId !== item.sceneId;

  currentGroup.push({
    word: item.clean,
    startMs: item.startMs,
    endMs: item.endMs,
    timestampMs: item.startMs,
    confidence: item.confidence,
  });

  if (
    currentGroup.length >= 4 ||
    (currentGroup.length >= 2 && isPunctuation) ||
    isSceneEnd ||
    idx === alignedTimings.length - 1
  ) {
    const pStart = currentGroup[0].startMs;
    const pEnd = currentGroup[currentGroup.length - 1].endMs;
    phrases.push({
      text: currentGroup.map((w) => w.word).join(" "),
      startMs: pStart,
      endMs: pEnd,
      timestampMs: pStart,
      confidence: null,
      sceneId: item.sceneId,
      words: [...currentGroup],
    });
    currentGroup = [];
  }
}

// Fix any phrase overlaps
for (let p = 0; p < phrases.length - 1; p++) {
  if (phrases[p].endMs > phrases[p + 1].startMs) {
    phrases[p].endMs = phrases[p + 1].startMs;
    const lastWord = phrases[p].words[phrases[p].words.length - 1];
    if (lastWord && lastWord.endMs > phrases[p].endMs) {
      lastWord.endMs = phrases[p].endMs;
    }
  }
}

const outCaptions = path.join(process.cwd(), "src", "data", "multiverseCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in multiverseCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 84500;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate multiverseSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./multiverseCaptions.json";

export interface MultiverseWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface MultiversePhrase extends Caption {
  readonly sceneId: number;
  readonly words: MultiverseWordTiming[];
}

export interface MultiverseSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const MULTIVERSE_FPS = 30;
export const MULTIVERSE_AUDIO_PATH = "audio/multiverse.wav";
export const MULTIVERSE_AUDIO_FRAMES = ${audioFrames};
export const MULTIVERSE_TOTAL_FRAMES = ${totalFrames};
export const MULTIVERSE_TRANSITION_FRAMES = 18;

export const MULTIVERSE_PHRASES = rawCaptions as MultiversePhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-parallel-self.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-hugh-everett.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-schrodinger-cat.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-splitting-universes.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-rejection-tragic-life.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-cosmology-string-theory.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-bubble-universes.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-untestable-frontier.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-legacy-in-parallel.png", badge: "${SCENE_BADGES[8]}" },
];

export const MULTIVERSE_SCENES: MultiverseSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = MULTIVERSE_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = MULTIVERSE_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * MULTIVERSE_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * MULTIVERSE_FPS)
      : MULTIVERSE_TOTAL_FRAMES;
    const halfTransition = Math.floor(MULTIVERSE_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? MULTIVERSE_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "multiverseSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/multiverseSubtitles.ts!");
