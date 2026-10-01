import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-adolf-scene.png
  `Đây là vị vua duy nhất trong lịch sử được sách giáo khoa Thụy Điển ghi nhớ không phải vì thành tựu chính trị, mà vì cách ông qua đời, ăn đến chết.`,
  // Scene 2: 02-adolf-scene.png
  `Adolf Frederick trị vì Thụy Điển từ năm 1751 đến 1771, một vị vua khá mờ nhạt, gần như không có thực quyền chính trị vì lúc đó Quốc hội Thụy Điển nắm phần lớn quyền lực.`,
  // Scene 3: 03-adolf-scene.png
  `Ngày 12 tháng 2 năm 1771, nhà vua tổ chức một bữa tiệc thịnh soạn gồm rất nhiều món xa xỉ, tôm hùm, trứng cá muối, dưa cải muối chua, cá trích hun khói, và rượu champagne.`,
  // Scene 4: 04-adolf-scene.png
  `Nhưng thủ phạm chính lại là món tráng miệng, hetvägg, một loại bánh mì tròn truyền thống Thụy Điển nhân hạnh nhân, ngâm trong bát sữa nóng, thường chỉ ăn vào dịp lễ đặc biệt.`,
  // Scene 5: 05-adolf-scene.png
  `Nhà vua đã ăn liền một lúc mười bốn phần hetvägg sau khi đã no căng bụng với bữa tiệc chính, một con số khiến ngay cả các sử gia hiện đại cũng phải lắc đầu.`,
  // Scene 6: 06-adolf-scene.png
  `Ngay sau đó, Adolf Frederick gặp các vấn đề tiêu hóa nghiêm trọng và qua đời cùng ngày, nguyên nhân được cho là do hệ tiêu hóa quá tải hoàn toàn, dù các nhà sử học hiện đại cũng lưu ý ông vốn có tiền sử sức khỏe không tốt.`,
  // Scene 7: 07-adolf-scene.png
  `Cái chết dở khóc dở cười này khiến Adolf Frederick trở thành meme lịch sử phổ biến, thường được nhắc đến trong các danh sách những cái chết kỳ lạ nhất lịch sử trên khắp thế giới.`,
  // Scene 8: 08-adolf-scene.png
  `Thú vị hơn, món bánh hetvägg, nay gọi là semla, vẫn là món ăn truyền thống được người Thụy Điển yêu thích mỗi mùa lễ Shrove Tuesday hàng năm, dù biết rõ câu chuyện đằng sau nó.`,
  // Scene 9: 09-adolf-scene.png
  `Không phải chiến tranh, không phải bệnh dịch, mà chính chiếc bánh ông yêu thích nhất đã kết liễu đời vua.`,
  // Scene 10: 10-adolf-scene.png
  `Đó là câu chuyện có thật về Adolf Frederick của Thụy Điển.`,
];

const SCENE_BADGES = [
  "VỊ VUA KỲ LẠ • CÁI CHẾT VÌ ĂN QUÁ NHIỀU",
  "TRIỀU ĐẠI 1751–1771 • VỊ VUA KHÔNG THỰC QUYỀN",
  "BỮA ĐẠI TIỆC HOÀNG GIA • 12 THÁNG 2 NĂM 1771",
  "MÓN HETVÄGG • BÁNH MÌ NGÂM SỮA NÓNG",
  "MƯỜI BỐN PHẦN BÁNH • CON SỐ KỶ LỤC",
  "QUÁ TẢI TIÊU HÓA • BI KỊCH TRONG ĐÊM",
  "MEME LỊCH SỬ NỔI TIẾNG • CÁI CHẾT KỲ LẠ NHẤT",
  "BÁNH SEMLA HIỆN ĐẠI • LỄ SHROVE TUESDAY",
  "MÓN ĂN TRUYỀN THỐNG • HƯƠNG VỊ YÊU THÍCH",
  "VUA ADOLF FREDERICK • CÂU CHUYỆN CÓ THẬT",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "adolfCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "adolfCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in adolfCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 84500;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate adolfSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./adolfCaptions.json";

export interface AdolfWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface AdolfPhrase extends Caption {
  readonly sceneId: number;
  readonly words: AdolfWordTiming[];
}

export interface AdolfSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const ADOLF_FPS = 30;
export const ADOLF_AUDIO_PATH = "audio/adolf.wav";
export const ADOLF_AUDIO_FRAMES = ${audioFrames};
export const ADOLF_TOTAL_FRAMES = ${totalFrames};
export const ADOLF_TRANSITION_FRAMES = 18;

export const ADOLF_PHRASES = rawCaptions as AdolfPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-adolf-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-adolf-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-adolf-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-adolf-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-adolf-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-adolf-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-adolf-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-adolf-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-adolf-scene.png", badge: "${SCENE_BADGES[8]}" },
  { id: 10, image: "10-adolf-scene.png", badge: "${SCENE_BADGES[9]}" },
];

export const ADOLF_SCENES: AdolfSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = ADOLF_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = ADOLF_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * ADOLF_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * ADOLF_FPS)
      : ADOLF_TOTAL_FRAMES;
    const halfTransition = Math.floor(ADOLF_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? ADOLF_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "adolfSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/adolfSubtitles.ts!");
