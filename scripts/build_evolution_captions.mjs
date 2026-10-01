import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-evolution-scene.png
  `Bạn có bao giờ thắc mắc vì sao hươu cao cổ có cổ dài, hay vì sao vi khuẩn có thể lờn thuốc kháng sinh? Câu trả lời nằm gọn trong một cơ chế duy nhất.`,
  // Scene 2: 02-evolution-scene.png
  `Tiến hóa, hiểu đơn giản, là quá trình các loài sinh vật thay đổi đặc điểm qua nhiều thế hệ để thích nghi tốt hơn với môi trường sống. Cơ chế cốt lõi là chọn lọc tự nhiên, vận hành theo ba nguyên tắc.`,
  // Scene 3: 03-evolution-scene.png
  `Một, trong một quần thể luôn có sự biến dị, không cá thể nào giống hệt nhau hoàn toàn.`,
  // Scene 4: 04-evolution-scene.png
  `Hai, một số biến dị giúp cá thể sống sót và sinh sản tốt hơn trong môi trường cụ thể. Ba, những đặc điểm có lợi đó được di truyền cho thế hệ sau.`,
  // Scene 5: 05-evolution-scene.png
  `Ví dụ kinh điển, trong một quần thể hươu cao cổ, những con có cổ dài hơn một chút sẽ ăn được lá cây trên cao, nơi thức ăn ít bị cạnh tranh. Chúng sống sót tốt hơn, sinh nhiều con hơn, và đặc điểm cổ dài dần lan rộng trong cả quần thể qua hàng nghìn thế hệ.`,
  // Scene 6: 06-evolution-scene.png
  `Điều quan trọng cần làm rõ, tiến hóa không có mục đích hay ý chí, không phải hươu muốn có cổ dài rồi cổ tự dài ra. Đó chỉ đơn thuần là kết quả của việc những cá thể phù hợp hơn sống sót nhiều hơn.`,
  // Scene 7: 07-evolution-scene.png
  `Nguồn gốc của sự biến dị đến từ đột biến gen, những thay đổi ngẫu nhiên trong DNA khi tế bào sinh sản. Phần lớn đột biến vô hại hoặc có hại, nhưng đôi khi, một đột biến ngẫu nhiên lại mang đến lợi thế sống sót.`,
  // Scene 8: 08-evolution-scene.png
  `Đây chính là lý do vi khuẩn có thể lờn thuốc kháng sinh. Khi ta dùng kháng sinh, phần lớn vi khuẩn chết, nhưng số ít có đột biến kháng thuốc tình cờ sẽ sống sót và sinh sôi, tạo ra cả một thế hệ vi khuẩn kháng thuốc mới, đây là tiến hóa đang diễn ra ngay trước mắt chúng ta.`,
  // Scene 9: 09-evolution-scene.png
  `Qua đủ thời gian, hàng triệu, hàng tỷ năm, những thay đổi nhỏ tích lũy dần có thể dẫn đến sự hình thành loài mới hoàn toàn, giải thích vì sao Trái Đất có sự đa dạng sinh học khổng lồ từ một tổ tiên chung ban đầu.`,
  // Scene 10: 10-evolution-scene.png
  `Không có kế hoạch, không có mục đích, chỉ có sự sống sót của những gì phù hợp nhất. Đó là bản chất thực sự của tiến hóa.`,
];

const SCENE_BADGES = [
  "BÍ ẨN TIẾN HÓA • CÂU HỎI LỚN CỦA TỰ NHIÊN",
  "CHỌN LỌC TỰ NHIÊN • NGUYÊN TẮC CỐT LÕI",
  "NGUYÊN TẮC 1 • SỰ BIẾN DỊ QUẦN THỂ",
  "NGUYÊN TẮC 2 & 3 • SỐNG SÓT VÀ DI TRUYỀN",
  "VÍ DỤ HƯƠU CAO CỔ • LỢI THẾ CỔ DÀI",
  "KHÔNG CÓ MỤC ĐÍCH • THÍCH NGHI ĐỂ SINH TỒN",
  "ĐỘT BIẾN GEN • BIẾN ĐỔI NGẪU NHIÊN DNA",
  "VI KHUẨN KHÁNG THUỐC • TIẾN HÓA TRƯỚC MẮT",
  "CÂY SỰ SỐNG • HÀNG TỶ NĂM TÍCH LŨY",
  "QUY LUẬT SINH TỒN • PHÙ HỢP ĐỂ SỐNG SÓT",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "evolutionCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "evolutionCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in evolutionCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 91000;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate evolutionSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./evolutionCaptions.json";

export interface EvolutionWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface EvolutionPhrase extends Caption {
  readonly sceneId: number;
  readonly words: EvolutionWordTiming[];
}

export interface EvolutionSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const EVOLUTION_FPS = 30;
export const EVOLUTION_AUDIO_PATH = "audio/evolution.wav";
export const EVOLUTION_AUDIO_FRAMES = ${audioFrames};
export const EVOLUTION_TOTAL_FRAMES = ${totalFrames};
export const EVOLUTION_TRANSITION_FRAMES = 18;

export const EVOLUTION_PHRASES = rawCaptions as EvolutionPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-evolution-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-evolution-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-evolution-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-evolution-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-evolution-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-evolution-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-evolution-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-evolution-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-evolution-scene.png", badge: "${SCENE_BADGES[8]}" },
  { id: 10, image: "10-evolution-scene.png", badge: "${SCENE_BADGES[9]}" },
];

export const EVOLUTION_SCENES: EvolutionSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = EVOLUTION_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = EVOLUTION_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * EVOLUTION_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * EVOLUTION_FPS)
      : EVOLUTION_TOTAL_FRAMES;
    const halfTransition = Math.floor(EVOLUTION_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? EVOLUTION_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "evolutionSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/evolutionSubtitles.ts!");
