import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-templar-scene.png
  `Vào lúc bình minh ngày thứ Sáu, 13 tháng 10 năm 1307, hàng trăm hiệp sĩ quyền lực nhất châu Âu bị bắt giữ trong một đêm. Nhưng kho báu khổng lồ của họ, đến nay vẫn chưa ai tìm thấy.`,
  // Scene 2: 02-templar-scene.png
  `Dòng Hiệp sĩ Templar được thành lập năm 1119, ban đầu chỉ là một nhóm nhỏ hiệp sĩ bảo vệ người hành hương Cơ đốc giáo trên đường đến Jerusalem trong thời kỳ Thập tự chinh.`,
  // Scene 3: 03-templar-scene.png
  `Nhờ được Giáo hoàng hậu thuẫn và miễn thuế, Templar phát triển thần tốc. Họ không chỉ là chiến binh mà còn xây dựng nên hệ thống ngân hàng đầu tiên của châu Âu, cho vay tiền, giữ của cải cho các vị vua và quý tộc khắp lục địa.`,
  // Scene 4: 04-templar-scene.png
  `Chỉ trong khoảng 200 năm, Templar sở hữu hàng nghìn lâu đài, vùng đất, tàu thuyền, trở thành một trong những tổ chức giàu có và quyền lực nhất châu Âu thời Trung cổ, độc lập gần như hoàn toàn với các vị vua.`,
  // Scene 5: 05-templar-scene.png
  `Điều đó khiến vua Pháp Philip IV, người đang nợ Templar một khoản tiền khổng lồ, lo sợ và ghen tị. Ông cấu kết với Giáo hoàng, vu cáo Templar tội dị giáo, thờ quỷ Satan để có cớ tiêu diệt họ.`,
  // Scene 6: 06-templar-scene.png
  `Ngày 13 tháng 10 năm 1307, theo lệnh bí mật của vua Philip, hàng trăm hiệp sĩ Templar khắp nước Pháp bị bắt giữ đồng loạt trong một đêm.`,
  // Scene 7: 07-templar-scene.png
  `Nhiều người bị tra tấn để ép nhận tội,`,
  // Scene 8: 08-templar-scene.png
  `sau đó bị thiêu sống, bao gồm cả vị Đại sư cuối cùng Jacques de Molay. Điều bí ẩn nhất, khi quân của vua Philip ập vào trụ sở chính ở Paris, kho báu khổng lồ của Templar, vàng bạc, châu báu tích lũy hàng thế kỷ, đã biến mất hoàn toàn, không để lại dấu vết.`,
  // Scene 9: 09-templar-scene.png
  `Nhiều giả thuyết ra đời. Kho báu được bí mật vận chuyển ra khỏi Pháp bằng hạm đội tàu Templar trước ngày bị bắt, được giấu tại Scotland, nơi vua Pháp không có quyền lực, hoặc thậm chí đã đến tận Bắc Mỹ trước cả Columbus.`,
  // Scene 10: 10-templar-scene.png
  `Một tổ chức từng giàu có hơn cả nhiều vương triều, sụp đổ chỉ trong một đêm vì lòng tham của một vị vua. Nhưng kho báu của họ, đến hôm nay, vẫn là một trong những bí ẩn lớn nhất lịch sử chưa có lời giải.`,
];

const SCENE_BADGES = [
  "THỨ SÁU NGÀY 13 • CUỘC BẮT BỚ LỊCH SỬ",
  "THÀNH LẬP NĂM 1119 • BẢO VỆ HÀNH HƯƠNG",
  "NGÂN HÀNG ĐẦU TIÊN • MẠNG LƯỚI TÀI CHÍNH",
  "QUYỀN LỰC TỐI THƯỢNG • THẦN TỐC PHÁT TRIỂN",
  "LÒNG THAM NHÀ VUA • ÂM MƯU TIÊU DIỆT",
  "MỆNH LỆNH BÍ MẬT • ĐỒNG LOẠT TRẤN ÁP",
  "TRA TẤN DÃ MAN • BẺ GÃY Ý CHÍ",
  "HỎA HÌNH JACQUES DE MOLAY • ĐẠI SƯ CUỐI CÙNG",
  "KHO BÁU BỐC HƠI • HẠM ĐỘI MẤT TÍCH",
  "BÍ ẨN NGHÌN NĂM • DẤU ẤN BẤT TỬ",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "templarCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "templarCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in templarCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 90000;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate templarSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./templarCaptions.json";

export interface TemplarWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface TemplarPhrase extends Caption {
  readonly sceneId: number;
  readonly words: TemplarWordTiming[];
}

export interface TemplarSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const TEMPLAR_FPS = 30;
export const TEMPLAR_AUDIO_PATH = "audio/templar.wav";
export const TEMPLAR_AUDIO_FRAMES = ${audioFrames};
export const TEMPLAR_TOTAL_FRAMES = ${totalFrames};
export const TEMPLAR_TRANSITION_FRAMES = 18;

export const TEMPLAR_PHRASES = rawCaptions as TemplarPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-templar-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-templar-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-templar-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-templar-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-templar-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-templar-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-templar-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-templar-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-templar-scene.png", badge: "${SCENE_BADGES[8]}" },
  { id: 10, image: "10-templar-scene.png", badge: "${SCENE_BADGES[9]}" },
];

export const TEMPLAR_SCENES: TemplarSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = TEMPLAR_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = TEMPLAR_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * TEMPLAR_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * TEMPLAR_FPS)
      : TEMPLAR_TOTAL_FRAMES;
    const halfTransition = Math.floor(TEMPLAR_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? TEMPLAR_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "templarSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/templarSubtitles.ts!");
