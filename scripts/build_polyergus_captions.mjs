import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1:
  `Có một loài kiến hoàn toàn không thể tự kiếm ăn, không thể chăm con, thậm chí không thể dọn tổ. Cách chúng tồn tại là bắt cóc con của loài kiến khác về làm nô lệ.`,
  // Scene 2:
  `Hiện tượng này được các nhà khoa học gọi là Dulosis, từ tiếng Hy Lạp nghĩa là nô lệ, xảy ra ở khoảng 50 loài kiến trên tổng số hơn 10.000 loài, điển hình nhất là chi Polyergus, còn gọi là kiến Amazon.`,
  // Scene 3:
  `Mọi chuyện bắt đầu từ chính con kiến chúa. Một kiến chúa Polyergus sẽ xâm nhập vào tổ của loài kiến khác, thường là chi Formica, tìm cách giết chết kiến chúa bản địa, rồi tự khoác lên mình mùi hương của tổ để đánh lừa đàn kiến thợ chấp nhận mình làm chúa mới.`,
  // Scene 4:
  `Khi tổ đã phát triển đủ lớn, kiến thợ Polyergus bắt đầu tiến hành các cuộc đột kích nô lệ. Một nhóm trinh sát tìm tổ kiến Formica gần đó, sau đó dẫn theo hàng nghìn kiến thợ tấn công ồ ạt.`,
  // Scene 5:
  `Trong cuộc đột kích, kiến Polyergus dùng hàm sắc như lưỡi liềm để chiến đấu, nhưng mục tiêu chính không phải giết kiến trưởng thành, mà là cướp lấy trứng và nhộng mang về tổ của mình.`,
  // Scene 6:
  `Những con nhộng bị bắt cóc sẽ nở ra và lớn lên ngay trong tổ của kẻ bắt cóc. Vì được lập trình theo mùi hương từ nhỏ, chúng không hề biết mình bị bắt,`,
  // Scene 7:
  `mà tự nhiên đảm nhận toàn bộ công việc, kiếm ăn, chăm ấu trùng, dọn tổ. Kiến Polyergus trưởng thành gần như hoàn toàn phụ thuộc vào những nô lệ này.`,
  // Scene 8:
  `Các nhà khoa học từng thử nhốt riêng kiến Polyergus mà không có kiến Formica đi cùng, chỉ trong vài ngày, chúng bắt đầu chết đói dù xung quanh có đầy thức ăn, vì chúng không biết cách tự ăn.`,
  // Scene 9:
  `Khi được thả một con kiến Formica duy nhất vào, con kiến đó lập tức tổ chức lại mọi thứ, dọn tổ, chăm ấu trùng, cứu sống những con Polyergus còn lại, cho thấy mức độ phụ thuộc gần như tuyệt đối của loài chủ nô này.`,
  // Scene 10:
  `Một loài kiến đã tiến hóa đến mức đánh mất hoàn toàn khả năng tự sinh tồn, chỉ có thể tồn tại bằng cách chiếm đoạt lao động của loài khác. Đó là chế độ nô lệ có thật trong thế giới côn trùng.`,
];

const SCENE_BADGES = [
  "KẺ KÝ SINH XÃ HỘI • KHÔNG THỂ TỰ KIẾM ĂN",
  "HIỆN TƯỢNG DULOSIS • VŨ KHÍ HÀM LƯỠI LIỀM",
  "KIẾN CHÚA XÂM NHẬP • ĐOẠT MÙI HƯƠNG TỔ MỚI",
  "BINH ĐOÀN ĐỘT KÍCH • HÀNG NGHÌN QUÂN TẤN CÔNG",
  "CƯỚP ĐOẠT ẤU TRÙNG • BẮT CÓC THẾ HỆ NON",
  "LẬP TRÌNH MÙI HƯƠNG • NỞ RA TẠI TỔ ĐỊCH",
  "LAO DỊCH KHỔ SAI • PHỤ THUỘC TUYỆT ĐỐI",
  "THÍ NGHIỆM ĐỘC QUYỀN • CHẾT ĐÓI DÙ CÓ THỨC ĂN",
  "MỘT NÔ LỆ DUY NHẤT • TÁI THIẾT LẬP TRẬT TỰ",
  "CHẾ ĐỘ NÔ LỆ • TIẾN HÓA KỲ LẠ TỰ NHIÊN",
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

const similarity = (a, b) => {
  const normA = normalize(a);
  const normB = normalize(b);
  if (!normA && !normB) return 1;
  if (!normA || !normB) return 0;
  if (normA === normB) return 1;
  const dist = editDistance(normA, normB);
  const maxLen = Math.max(normA.length, normB.length);
  return Math.max(0, 1 - dist / maxLen);
};

const rawCaptionsPath = path.join(process.cwd(), "src/data/polyergusCaptionsRaw.json");
const rawCaptions = JSON.parse(fs.readFileSync(rawCaptionsPath, "utf8"));

const rawTokens = rawCaptions.map((caption) => ({
  text: caption.text.trim(),
  startMs: caption.startMs,
  endMs: caption.endMs,
  timestampMs: caption.timestampMs,
  confidence: caption.confidence,
}));

const targetTokens = [];
SCENE_SCRIPTS.forEach((sceneScript, sceneIndex) => {
  const words = sceneScript
    .trim()
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  words.forEach((word) => {
    targetTokens.push({
      word,
      sceneId: sceneIndex + 1,
    });
  });
});

console.log(`Polyergus Target words: ${targetTokens.length}, Raw whisper tokens: ${rawTokens.length}`);

const n = targetTokens.length;
const m = rawTokens.length;
const dp = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
const trace = Array.from({ length: n + 1 }, () => new Uint8Array(m + 1));

const GAP_PENALTY = -0.55;

for (let i = 1; i <= n; i++) {
  dp[i][0] = dp[i - 1][0] + GAP_PENALTY;
  trace[i][0] = 1;
}

for (let j = 1; j <= m; j++) {
  dp[0][j] = dp[0][j - 1] + GAP_PENALTY;
  trace[0][j] = 2;
}

for (let i = 1; i <= n; i++) {
  const targetNorm = normalize(targetTokens[i - 1].word);
  for (let j = 1; j <= m; j++) {
    const rawNorm = normalize(rawTokens[j - 1].text);
    let sim = similarity(targetNorm, rawNorm);
    let matchScore = -0.7;
    if (sim >= 0.8) {
      matchScore = 2.2 * sim;
    } else if (sim >= 0.5) {
      matchScore = 0.9 * sim;
    }

    const diag = dp[i - 1][j - 1] + matchScore;
    const up = dp[i - 1][j] + GAP_PENALTY;
    const left = dp[i][j - 1] + GAP_PENALTY;

    let best = diag;
    let choice = 0;
    if (up > best) {
      best = up;
      choice = 1;
    }
    if (left > best) {
      best = left;
      choice = 2;
    }

    dp[i][j] = best;
    trace[i][j] = choice;
  }
}

let currI = n;
let currJ = m;
const matchedRawForTarget = new Map();

while (currI > 0 || currJ > 0) {
  const choice = trace[currI][currJ];
  if (choice === 0) {
    matchedRawForTarget.set(currI - 1, currJ - 1);
    currI--;
    currJ--;
  } else if (choice === 1) {
    currI--;
  } else {
    currJ--;
  }
}

console.log(`Matched target words to raw tokens: ${matchedRawForTarget.size}/${n}`);

const alignedWords = targetTokens.map((t, index) => {
  const rawIndex = matchedRawForTarget.get(index);
  if (rawIndex !== undefined) {
    const raw = rawTokens[rawIndex];
    return {
      word: t.word,
      sceneId: t.sceneId,
      startMs: raw.startMs,
      endMs: raw.endMs,
      timestampMs: raw.timestampMs,
      confidence: raw.confidence,
      matched: true,
    };
  }
  return {
    word: t.word,
    sceneId: t.sceneId,
    startMs: null,
    endMs: null,
    timestampMs: null,
    confidence: null,
    matched: false,
  };
});

let lastKnownEnd = 0;
for (let i = 0; i < alignedWords.length; i++) {
  if (alignedWords[i].matched) {
    lastKnownEnd = alignedWords[i].endMs;
  } else {
    let nextKnownIndex = -1;
    for (let j = i + 1; j < alignedWords.length; j++) {
      if (alignedWords[j].matched) {
        nextKnownIndex = j;
        break;
      }
    }
    const nextKnownStart =
      nextKnownIndex !== -1
        ? alignedWords[nextKnownIndex].startMs
        : rawTokens[rawTokens.length - 1].endMs + 1000;
    const gapWords = (nextKnownIndex !== -1 ? nextKnownIndex : alignedWords.length) - i;
    const totalDuration = Math.max(gapWords * 180, nextKnownStart - lastKnownEnd);
    const step = totalDuration / gapWords;

    for (let k = 0; k < gapWords; k++) {
      alignedWords[i + k].startMs = Math.round(lastKnownEnd + k * step);
      alignedWords[i + k].endMs = Math.round(lastKnownEnd + (k + 1) * step - 20);
    }
    i += gapWords - 1;
    lastKnownEnd = nextKnownStart;
  }
}

for (let i = 1; i < alignedWords.length; i++) {
  if (alignedWords[i].startMs <= alignedWords[i - 1].startMs) {
    alignedWords[i].startMs = alignedWords[i - 1].startMs + 120;
  }
  if (alignedWords[i].endMs <= alignedWords[i].startMs) {
    alignedWords[i].endMs = alignedWords[i].startMs + 150;
  }
}

const phrases = [];
let currentPhraseWords = [];
let currentSceneId = alignedWords[0].sceneId;

const flushPhrase = () => {
  if (currentPhraseWords.length === 0) return;
  const startMs = currentPhraseWords[0].startMs;
  const endMs = currentPhraseWords[currentPhraseWords.length - 1].endMs;
  const text = currentPhraseWords.map((w) => w.word).join(" ");
  phrases.push({
    text,
    startMs,
    endMs,
    timestampMs: startMs,
    confidence: null,
    sceneId: currentSceneId,
    words: currentPhraseWords.map((w) => ({
      word: w.word,
      startMs: w.startMs,
      endMs: w.endMs,
      timestampMs: w.startMs,
      confidence: null,
    })),
  });
  currentPhraseWords = [];
};

alignedWords.forEach((word) => {
  if (word.sceneId !== currentSceneId) {
    flushPhrase();
    currentSceneId = word.sceneId;
  }

  currentPhraseWords.push(word);
  const textSoFar = currentPhraseWords.map((w) => w.word).join(" ");
  const endsWithPunct = /[.,!?;:]$/.test(word.word);

  if (currentPhraseWords.length >= 6 || (currentPhraseWords.length >= 3 && endsWithPunct) || textSoFar.length >= 28) {
    flushPhrase();
  }
});
flushPhrase();

const outJsonPath = path.join(process.cwd(), "src/data/polyergusCaptions.json");
fs.writeFileSync(outJsonPath, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases for PolyergusShort`);

const fps = 30;
const lastPhrase = phrases[phrases.length - 1];
const totalFrames = Math.ceil(((lastPhrase.endMs + 1200) / 1000) * fps);

console.log(`Calculated Total Frames: ${totalFrames} (${(totalFrames / fps).toFixed(2)}s)`);

const subtitleTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./polyergusCaptions.json";

export interface PolyergusWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface PolyergusPhrase extends Caption {
  readonly sceneId: number;
  readonly words: PolyergusWordTiming[];
}

export interface PolyergusSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const POLYERGUS_FPS = ${fps};
export const POLYERGUS_AUDIO_PATH = "audio/polyergus.wav";
export const POLYERGUS_AUDIO_FRAMES = ${Math.ceil((lastPhrase.endMs / 1000) * fps)};
export const POLYERGUS_TOTAL_FRAMES = ${totalFrames};
export const POLYERGUS_TRANSITION_FRAMES = 18;

export const POLYERGUS_PHRASES = rawCaptions as PolyergusPhrase[];

const SCENE_DEFINITIONS = [
${SCENE_BADGES.map((badge, idx) => `  { id: ${idx + 1}, image: "0${idx + 1}-polyergus-scene.png".replace("010", "10"), badge: "${badge}" },`).join("\n")}
];

export const POLYERGUS_SCENES: PolyergusSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = POLYERGUS_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = POLYERGUS_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * POLYERGUS_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * POLYERGUS_FPS)
      : POLYERGUS_TOTAL_FRAMES;
    const halfTransition = Math.floor(POLYERGUS_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? POLYERGUS_TOTAL_FRAMES
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

const outTsPath = path.join(process.cwd(), "src/data/polyergusSubtitles.ts");
fs.writeFileSync(outTsPath, subtitleTsContent, "utf8");
console.log(`Saved ${outTsPath}`);
