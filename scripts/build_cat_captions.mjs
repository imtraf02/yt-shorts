import fs from "node:fs";
import path from "node:path";

// 10 Scenes broken into natural, grammatically complete clauses ("nguyên câu có nghĩa")
const SCENE_CLAUSES = [
  // Scene 1: BẬC THẦY TIẾP ĐẤT • BỐN CHÂN LUÔN HƯỚNG ĐẤT
  {
    sceneId: 1,
    clauses: [
      "Bạn thả một con mèo từ độ cao nào,",
      "chỉ cần đủ thời gian,",
      "nó gần như luôn tiếp đất bằng bốn chân.",
      "Bí mật nằm ở một phản xạ",
      "mà mèo đã có sẵn từ khi mới 3 tuần tuổi.",
    ],
  },
  // Scene 2: HỆ THỐNG TIỀN ĐÌNH • ĐỊNH HƯỚNG TAI TRONG
  {
    sceneId: 2,
    clauses: [
      "Hiện tượng này được gọi là phản xạ tự chỉnh tư thế, hay righting reflex.",
      "Khi rơi, hệ thống tiền đình nằm trong tai trong của mèo",
      "lập tức phát hiện sự thay đổi hướng,",
      "ngay cả khi mắt bị bịt lại,",
      "mèo vẫn biết đâu là trên, đâu là dưới.",
    ],
  },
  // Scene 3: CỘT SỐNG SIÊU LINH HOẠT • 53 ĐỐT SỐNG
  {
    sceneId: 3,
    clauses: [
      "Điều đặc biệt giúp mèo làm được điều này",
      "là cột sống cực kỳ linh hoạt, với tới 53 đốt sống,",
      "nhiều hơn hầu hết các loài động vật có vú khác.",
    ],
  },
  // Scene 4: KHỚP VAI TỰ DO • KHÔNG XƯƠNG ĐÒN CỐ ĐỊNH
  {
    sceneId: 4,
    clauses: [
      "Mèo cũng không có xương đòn cố định như con người,",
      "giúp phần vai có thể xoay tự do gần như độc lập với phần hông.",
    ],
  },
  // Scene 5: XOAY THÂN ĐỐI NGHỊCH • UỐN CONG CỘT SỐNG
  {
    sceneId: 5,
    clauses: [
      "Khi rơi, mèo uốn cong cột sống,",
      "xoay riêng phần thân trước và thân sau theo hai hướng ngược nhau,",
    ],
  },
  // Scene 6: ĐỊNH LUẬT VẬT LÝ • BẢO TOÀN ĐỘNG LƯỢNG GÓC
  {
    sceneId: 6,
    clauses: [
      "trong khi vẫn giữ nguyên tổng động lượng góc bằng không,",
      "đúng theo định luật bảo toàn động lượng góc trong vật lý.",
    ],
  },
  // Scene 7: CO DUỖI CHÂN • ĐIỀU CHỈNH TỐC ĐỘ XOAY
  {
    sceneId: 7,
    clauses: [
      "Chân trước được thu gọn lại để xoay nhanh hơn,",
      "trong khi chân sau duỗi ra để xoay chậm hơn,",
      "sau đó đổi ngược lại,",
      "cứ thế cho đến khi cả cơ thể hướng bụng xuống đất.",
    ],
  },
  // Scene 8: TIẾP ĐẤT AN TOÀN • HẤP THỤ LỰC VA CHẠM
  {
    sceneId: 8,
    clauses: [
      "Ngay trước khi tiếp đất, mèo duỗi cả bốn chân ra,",
      "cong nhẹ đầu gối để hấp thụ lực va chạm,",
      "phân tán đều trọng lượng cơ thể.",
    ],
  },
  // Scene 9: GIỚI HẠN SINH HỌC • RỦI RO ĐỘ CAO CỰC ĐOAN
  {
    sceneId: 9,
    clauses: [
      "Nhưng điều quan trọng cần biết,",
      "đây không phải siêu năng lực bất khả chiến bại.",
      "Nếu rơi từ độ cao quá thấp, dưới khoảng 30cm,",
      "mèo có thể không đủ thời gian để hoàn thành cú xoay.",
      "Và trớ trêu thay, rơi từ quá cao cũng cực kỳ nguy hiểm,",
      "có thể gây chấn thương nghiêm trọng dù mèo tiếp đất đúng tư thế.",
    ],
  },
  // Scene 10: BẬC THẦY CÂN BẰNG • KẾT HỢP SINH HỌC & VẬT LÝ
  {
    sceneId: 10,
    clauses: [
      "Không phải phép màu,",
      "mà là sự kết hợp hoàn hảo giữa sinh học và vật lý",
      "đã biến mèo thành bậc thầy giữ thăng bằng của thế giới động vật.",
    ],
  },
];

const SCENE_BADGES = [
  "BẬC THẦY TIẾP ĐẤT • BỐN CHÂN LUÔN HƯỚNG ĐẤT",
  "HỆ THỐNG TIỀN ĐÌNH • ĐỊNH HƯỚNG TAI TRONG",
  "CỘT SỐNG SIÊU LINH HOẠT • 53 ĐỐT SỐNG",
  "KHỚP VAI TỰ DO • KHÔNG XƯƠNG ĐÒN CỐ ĐỊNH",
  "XOAY THÂN ĐỐI NGHỊCH • UỐN CONG CỘT SỐNG",
  "ĐỊNH LUẬT VẬT LÝ • BẢO TOÀN ĐỘNG LƯỢNG GÓC",
  "CO DUỖI CHÂN • ĐIỀU CHỈNH TỐC ĐỘ XOAY",
  "TIẾP ĐẤT AN TOÀN • HẤP THỤ LỰC VA CHẠM",
  "GIỚI HẠN SINH HỌC • RỦI RO ĐỘ CAO CỰC ĐOAN",
  "BẬC THẦY CÂN BẰNG • KẾT HỢP SINH HỌC & VẬT LÝ",
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

const rawCaptionsPath = path.join(process.cwd(), "src/data/catCaptionsRaw.json");
const rawCaptions = JSON.parse(fs.readFileSync(rawCaptionsPath, "utf8"));

const rawTokens = rawCaptions.map((caption) => ({
  text: caption.text.trim(),
  startMs: caption.startMs,
  endMs: caption.endMs,
  timestampMs: caption.timestampMs,
  confidence: caption.confidence,
}));

// Build target tokens list, tagged with sceneId and clauseIndex
const targetTokens = [];
let globalClauseIndex = 0;

SCENE_CLAUSES.forEach((sceneDef) => {
  sceneDef.clauses.forEach((clauseText) => {
    const clauseWords = clauseText
      .trim()
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean);

    clauseWords.forEach((word) => {
      targetTokens.push({
        word,
        sceneId: sceneDef.sceneId,
        clauseIndex: globalClauseIndex,
      });
    });
    globalClauseIndex++;
  });
});

console.log(`Cat Target words: ${targetTokens.length}, Raw whisper tokens: ${rawTokens.length}`);

// Sequence alignment using Dynamic Programming Needleman-Wunsch
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
      clauseIndex: t.clauseIndex,
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
    clauseIndex: t.clauseIndex,
    startMs: null,
    endMs: null,
    timestampMs: null,
    confidence: null,
    matched: false,
  };
});

// Interpolate any unmatched gaps smoothly
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

// Ensure strictly increasing start times
for (let i = 1; i < alignedWords.length; i++) {
  if (alignedWords[i].startMs <= alignedWords[i - 1].startMs) {
    alignedWords[i].startMs = alignedWords[i - 1].startMs + 120;
  }
  if (alignedWords[i].endMs <= alignedWords[i].startMs) {
    alignedWords[i].endMs = alignedWords[i].startMs + 150;
  }
}

// Group strictly by clauseIndex! Each phrase is a coherent grammatical clause / sentence!
const phrases = [];
let currentClauseIndex = alignedWords[0].clauseIndex;
let currentPhraseWords = [];

alignedWords.forEach((word) => {
  if (word.clauseIndex !== currentClauseIndex) {
    if (currentPhraseWords.length > 0) {
      const startMs = currentPhraseWords[0].startMs;
      const endMs = currentPhraseWords[currentPhraseWords.length - 1].endMs;
      const text = currentPhraseWords.map((w) => w.word).join(" ");
      phrases.push({
        text,
        startMs,
        endMs,
        timestampMs: startMs,
        confidence: null,
        sceneId: currentPhraseWords[0].sceneId,
        words: currentPhraseWords.map((w) => ({
          word: w.word,
          startMs: w.startMs,
          endMs: w.endMs,
          timestampMs: w.startMs,
          confidence: null,
        })),
      });
      currentPhraseWords = [];
    }
    currentClauseIndex = word.clauseIndex;
  }
  currentPhraseWords.push(word);
});

if (currentPhraseWords.length > 0) {
  const startMs = currentPhraseWords[0].startMs;
  const endMs = currentPhraseWords[currentPhraseWords.length - 1].endMs;
  const text = currentPhraseWords.map((w) => w.word).join(" ");
  phrases.push({
    text,
    startMs,
    endMs,
    timestampMs: startMs,
    confidence: null,
    sceneId: currentPhraseWords[0].sceneId,
    words: currentPhraseWords.map((w) => ({
      word: w.word,
      startMs: w.startMs,
      endMs: w.endMs,
      timestampMs: w.startMs,
      confidence: null,
    })),
  });
}

// Smooth phrase transitions: expand endMs slightly to prevent flickers between phrases
for (let p = 0; p < phrases.length; p++) {
  if (p < phrases.length - 1) {
    const nextStart = phrases[p + 1].startMs;
    if (phrases[p].endMs < nextStart) {
      // If gap is small (< 500ms), bridge it smoothly so text stays on screen
      if (nextStart - phrases[p].endMs <= 500) {
        phrases[p].endMs = nextStart - 50;
      }
    }
  } else {
    // Last phrase stays visible for 1.2s
    phrases[p].endMs += 1200;
  }
}

const outJsonPath = path.join(process.cwd(), "src/data/catCaptions.json");
fs.writeFileSync(outJsonPath, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} meaningful phrases for CatShort`);

const fps = 30;
const lastPhrase = phrases[phrases.length - 1];
const totalFrames = Math.ceil(((lastPhrase.endMs + 1200) / 1000) * fps);

// Generate src/data/catSubtitles.ts
const tsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./catCaptions.json";

export interface CatWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface CatPhrase extends Caption {
  readonly sceneId: number;
  readonly words: CatWordTiming[];
}

export interface CatSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const CAT_FPS = ${fps};
export const CAT_AUDIO_PATH = "audio/cat.wav";
export const CAT_BGM_PATH = "audio/cat_bgm.mp3";
export const CAT_AUDIO_FRAMES = ${Math.ceil((lastPhrase.endMs / 1000) * fps)};
export const CAT_TOTAL_FRAMES = ${totalFrames};
export const CAT_TRANSITION_FRAMES = 18;

export const CAT_PHRASES = rawCaptions as CatPhrase[];

const SCENE_DEFINITIONS = [
${SCENE_BADGES.map((badge, idx) => {
  const padIdx = String(idx + 1).padStart(2, "0");
  return `  { id: ${idx + 1}, image: "${padIdx}.png", badge: "${badge}" },`;
}).join("\n")}
];

export const CAT_SCENES: CatSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = CAT_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = CAT_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * CAT_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * CAT_FPS)
      : CAT_TOTAL_FRAMES;
    const halfTransition = Math.floor(CAT_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? CAT_TOTAL_FRAMES
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

const outTsPath = path.join(process.cwd(), "src/data/catSubtitles.ts");
fs.writeFileSync(outTsPath, tsContent, "utf8");
console.log(`Generated ${outTsPath} with ${SCENE_BADGES.length} scenes and ${totalFrames} frames!`);
