import fs from "node:fs";
import path from "node:path";

// 10 Scenes broken into natural, grammatically complete clauses ("nguyên câu có nghĩa")
const SCENE_CLAUSES = [
  // Scene 1: HIỂU LẦM PHỔ BIẾN • DA HÚT NƯỚC PHỒNG LÊN?
  {
    sceneId: 1,
    clauses: [
      "Nhiều người vẫn nghĩ ngón tay nhăn khi ngâm nước lâu",
      "là vì da hút nước rồi phồng lên.",
      "Nhưng khoa học đã chứng minh điều đó gần như sai hoàn toàn.",
    ],
  },
  // Scene 2: PHÁT HIỆN KỲ LẠ 1930 • TỔN THƯƠNG DÂY THẦN KINH
  {
    sceneId: 2,
    clauses: [
      "Từ những năm 1930, các nhà khoa học phát hiện một điều kỳ lạ,",
      "nếu dây thần kinh ở ngón tay bị tổn thương,",
      "ngón tay đó sẽ không hề nhăn dù ngâm nước bao lâu đi nữa.",
    ],
  },
  // Scene 3: CƠ CHẾ THẦN KINH • PHẢN XẠ CHỦ ĐỘNG CƠ THỂ
  {
    sceneId: 3,
    clauses: [
      "Điều này chứng minh việc nhăn da không đơn thuần là phản ứng vật lý thụ động,",
      "mà là một phản xạ chủ động của hệ thần kinh.",
    ],
  },
  // Scene 4: HIỆN TƯỢNG CO MẠCH • MẠCH MÁU DƯỚI DA CO LẠI
  {
    sceneId: 4,
    clauses: [
      "Sau khoảng 5 phút ngâm nước,",
      "hệ thần kinh tự chủ ra lệnh cho các mạch máu dưới da ngón tay co lại,",
      "hiện tượng gọi là co mạch.",
    ],
  },
  // Scene 5: CƠ CHẾ TẠO NẾP NHĂN • GIẢM THỂ TÍCH MÔ DƯỚI DA
  {
    sceneId: 5,
    clauses: [
      "Khi mạch máu co lại, thể tích bên dưới giảm xuống,",
      "kéo lớp da bên trên sụp vào trong,",
      "tạo thành các nếp nhăn đặc trưng.",
    ],
  },
  // Scene 6: BÍ ẨN TIẾN HÓA • GIẢ THUYẾT MARK CHANGIZI 2011
  {
    sceneId: 6,
    clauses: [
      "Nhưng câu hỏi lớn hơn là,",
      "tại sao cơ thể lại chủ động làm điều này?",
      "Năm 2011, nhà thần kinh học tiến hóa Mark Changizi",
      "đưa ra một giả thuyết được nhiều người chấp nhận.",
    ],
  },
  // Scene 7: KÊNH THOÁT NƯỚC • HOẠT ĐỘNG NHƯ RÃNH LỐP XE
  {
    sceneId: 7,
    clauses: [
      "Ông cho rằng những nếp nhăn này hoạt động giống hệt như các rãnh trên lốp xe ô tô,",
      "tạo ra các kênh nhỏ giúp thoát nước khi ngón tay chạm vào bề mặt ướt,",
      "từ đó tăng độ bám.",
    ],
  },
  // Scene 8: THỰC NGHIỆM KHOA HỌC • TĂNG 12% ĐỘ BÁM DƯỚI NƯỚC
  {
    sceneId: 8,
    clauses: [
      "Các nghiên cứu sau đó đã kiểm chứng giả thuyết này bằng thực nghiệm,",
      "người tham gia di chuyển vật thể ướt nhanh hơn tới 12%",
      "khi ngón tay đã nhăn, so với ngón tay khô bình thường.",
    ],
  },
  // Scene 9: ĐẦU NGÓN TAY & CHÂN • CHỈ XẢY RA Ở VÙNG CẦM NẮM
  {
    sceneId: 9,
    clauses: [
      "Điều thú vị, hiện tượng này chỉ xảy ra ở đầu ngón tay và ngón chân,",
      "những vùng da thường xuyên tiếp xúc và cầm nắm vật thể,",
      "không xảy ra ở bất kỳ vùng da nào khác trên cơ thể.",
    ],
  },
  // Scene 10: VŨ KHÍ SINH TỒN • KẾ THỪA TỪ TỔ TIÊN NGUYÊN THỦY
  {
    sceneId: 10,
    clauses: [
      "Các nhà khoa học tin rằng đây có thể là một đặc điểm tiến hóa từ tổ tiên loài người,",
      "giúp họ cầm nắm chắc chắn hơn khi săn bắt, hái lượm trong môi trường ẩm ướt, trơn trượt.",
      "Không phải một lỗi ngẫu nhiên của cơ thể,",
      "mà là một công cụ sinh tồn tinh vi được tiến hóa qua hàng chục nghìn năm,",
      "vẫn còn hoạt động ngay trên đầu ngón tay bạn mỗi khi tắm lâu.",
    ],
  },
];

const SCENE_BADGES = [
  "HIỂU LẦM PHỔ BIẾN • DA HÚT NƯỚC PHỒNG LÊN?",
  "PHÁT HIỆN KỲ LẠ 1930 • TỔN THƯƠNG DÂY THẦN KINH",
  "CƠ CHẾ THẦN KINH • PHẢN XẠ CHỦ ĐỘNG CƠ THỂ",
  "HIỆN TƯỢNG CO MẠCH • MẠCH MÁU DƯỚI DA CO LẠI",
  "CƠ CHẾ TẠO NẾP NHĂN • GIẢM THỂ TÍCH MÔ DƯỚI DA",
  "BÍ ẨN TIẾN HÓA • GIẢ THUYẾT MARK CHANGIZI 2011",
  "KÊNH THOÁT NƯỚC • HOẠT ĐỘNG NHƯ RÃNH LỐP XE",
  "THỰC NGHIỆM KHOA HỌC • TĂNG 12% ĐỘ BÁM DƯỚI NƯỚC",
  "ĐẦU NGÓN TAY & CHÂN • CHỈ XẢY RA Ở VÙNG CẦM NẮM",
  "VŨ KHÍ SINH TỒN • KẾ THỪA TỪ TỔ TIÊN NGUYÊN THỦY",
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

const rawCaptionsPath = path.join(process.cwd(), "src/data/wrinkleCaptionsRaw.json");
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

console.log(`Wrinkle Target words: ${targetTokens.length}, Raw whisper tokens: ${rawTokens.length}`);

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
      if (nextStart - phrases[p].endMs <= 500) {
        phrases[p].endMs = nextStart - 50;
      }
    }
  } else {
    phrases[p].endMs += 1200;
  }
}

const outJsonPath = path.join(process.cwd(), "src/data/wrinkleCaptions.json");
fs.writeFileSync(outJsonPath, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} meaningful phrases for WrinkleShort`);

const fps = 30;
const lastPhrase = phrases[phrases.length - 1];
const totalFrames = Math.ceil(((lastPhrase.endMs + 1200) / 1000) * fps);

// Generate src/data/wrinkleSubtitles.ts
const tsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./wrinkleCaptions.json";

export interface WrinkleWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface WrinklePhrase extends Caption {
  readonly sceneId: number;
  readonly words: WrinkleWordTiming[];
}

export interface WrinkleSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const WRINKLE_FPS = ${fps};
export const WRINKLE_AUDIO_PATH = "audio/wrinkle.wav";
export const WRINKLE_BGM_PATH = "audio/wrinkle_bgm.mp3";
export const WRINKLE_AUDIO_FRAMES = ${Math.ceil((lastPhrase.endMs / 1000) * fps)};
export const WRINKLE_TOTAL_FRAMES = ${totalFrames};
export const WRINKLE_TRANSITION_FRAMES = 18;

export const WRINKLE_PHRASES = rawCaptions as WrinklePhrase[];

const SCENE_DEFINITIONS = [
${SCENE_BADGES.map((badge, idx) => {
  const padIdx = String(idx + 1).padStart(2, "0");
  return `  { id: ${idx + 1}, image: "${padIdx}.png", badge: "${badge}" },`;
}).join("\n")}
];

export const WRINKLE_SCENES: WrinkleSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = WRINKLE_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = WRINKLE_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * WRINKLE_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * WRINKLE_FPS)
      : WRINKLE_TOTAL_FRAMES;
    const halfTransition = Math.floor(WRINKLE_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? WRINKLE_TOTAL_FRAMES
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

const outTsPath = path.join(process.cwd(), "src/data/wrinkleSubtitles.ts");
fs.writeFileSync(outTsPath, tsContent, "utf8");
console.log(`Generated ${outTsPath} with ${SCENE_BADGES.length} scenes and ${totalFrames} frames!`);
