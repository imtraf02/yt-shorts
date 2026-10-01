import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-teaceremony-scene.png
  `Một chén trà, pha trong im lặng, kéo dài có khi cả tiếng đồng hồ. Người Nhật gọi đó là con đường, để tìm thấy sự bình yên trong một khoảnh khắc duy nhất.`,
  // Scene 2: 02-teaceremony-scene.png
  `Trà đạo, tiếng Nhật gọi là Chanoyu hoặc Sadō, nghĩa là con đường của trà, không đơn thuần là pha và uống trà, đó là một nghi thức mang tính thiền định, chịu ảnh hưởng sâu sắc từ Thiền tông Phật giáo.`,
  // Scene 3: 03-teaceremony-scene.png
  `Trà được du nhập vào Nhật Bản từ Trung Quốc khoảng thế kỷ 9, nhưng phải đến thế kỷ 16, trà sư Sen no Rikyū mới định hình nên nghi thức trà đạo hoàn chỉnh như ngày nay, nhấn mạnh vào sự giản dị và tĩnh lặng.`,
  // Scene 4: 04-teaceremony-scene.png
  `Bốn nguyên tắc cốt lõi của trà đạo, được gọi là Wa Kei Sei Jaku, Hòa, Kính, Thanh, Tịch, áp dụng cho cả không gian, dụng cụ lẫn tâm thái người tham dự.`,
  // Scene 5: 05-teaceremony-scene.png
  `Mọi chi tiết trong buổi trà đạo đều được tính toán tỉ mỉ, từ cách bước vào trà thất qua một cửa nhỏ thấp, buộc mọi người phải cúi đầu, biểu tượng cho sự khiêm nhường, bình đẳng, dù là võ sĩ hay nông dân, đến cách cầm chén trà, thứ tự khuấy trà bằng chổi tre.`,
  // Scene 6: 06-teaceremony-scene.png
  `Triết lý quan trọng nhất trong trà đạo là Ichigo Ichie, nghĩa là một lần gặp gỡ, một lần duy nhất.`,
  // Scene 7: 07-teaceremony-scene.png
  `Mỗi buổi trà đạo được xem như một khoảnh khắc không bao giờ lặp lại, dù cùng những người đó, cùng không gian đó, khuyến khích người tham dự trân trọng hiện tại tuyệt đối.`,
  // Scene 8: 08-teaceremony-scene.png
  `Loại trà chính được sử dụng là Matcha, bột trà xanh nghiền mịn, được đánh bông bằng chổi tre trong bát trà, tạo nên hương vị đậm đà, hơi đắng đặc trưng.`,
  // Scene 9: 09-teaceremony-scene.png
  `Ngày nay, dù xã hội Nhật Bản đã hiện đại hóa, trà đạo vẫn được gìn giữ nghiêm túc trong các trường phái truyền thống, không chỉ như một nghi lễ văn hóa mà còn như một cách để con người chậm lại giữa nhịp sống hối hả.`,
  // Scene 10: 10-teaceremony-scene.png
  `Không phải vì trà ngon hay dở, mà vì trong khoảnh khắc pha trà đó, con người học được cách hiện diện trọn vẹn với chính mình. Đó là ý nghĩa thực sự của trà đạo.`,
];

const SCENE_BADGES = [
  "PHA TRÀ TRONG IM LẶNG • BÌNH YÊN MỘT KHOẢNH KHẮC",
  "CHANOYU & SADŌ • CON ĐƯỜNG THIỀN ĐỊNH",
  "TRÀ SƯ SEN NO RIKYŪ • GIẢN DỊ VÀ TĨNH LẶNG",
  "WA KEI SEI JAKU • HÒA, KÍNH, THANH, TỊCH",
  "CỬA VÀO TRÀ THẤT • KHIÊM NHƯỜNG VÀ BÌNH ĐẲNG",
  "TRIẾT LÝ ICHIGO ICHIE • MỘT LẦN GẶP GỠ DUY NHẤT",
  "TRÂN TRỌNG HIỆN TẠI • KHOẢNH KHẮC VÔ GIÁ",
  "BỘT TRÀ MATCHA • ĐẬM ĐÀ HƯƠNG VỊ",
  "CHẬM LẠI GIỮA ĐÔ THỊ • GÌN GIỮ TRUYỀN THỐNG",
  "HIỆN DIỆN TRỌN VẸN • Ý NGHĨA THỰC SỰ",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "teaceremonyCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "teaceremonyCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in teaceremonyCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 84500;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate teaceremonySubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./teaceremonyCaptions.json";

export interface TeaWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface TeaPhrase extends Caption {
  readonly sceneId: number;
  readonly words: TeaWordTiming[];
}

export interface TeaSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const TEA_FPS = 30;
export const TEA_AUDIO_PATH = "audio/teaceremony.wav";
export const TEA_AUDIO_FRAMES = ${audioFrames};
export const TEA_TOTAL_FRAMES = ${totalFrames};
export const TEA_TRANSITION_FRAMES = 18;

export const TEA_PHRASES = rawCaptions as TeaPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-teaceremony-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-teaceremony-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-teaceremony-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-teaceremony-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-teaceremony-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-teaceremony-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-teaceremony-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-teaceremony-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-teaceremony-scene.png", badge: "${SCENE_BADGES[8]}" },
  { id: 10, image: "10-teaceremony-scene.png", badge: "${SCENE_BADGES[9]}" },
];

export const TEA_SCENES: TeaSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = TEA_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = TEA_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * TEA_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * TEA_FPS)
      : TEA_TOTAL_FRAMES;
    const halfTransition = Math.floor(TEA_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? TEA_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "teaceremonySubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/teaceremonySubtitles.ts!");
