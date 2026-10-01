import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1:
  `Quạ có thể nhớ khuôn mặt của một người từng làm hại chúng, rồi nhiều năm sau vẫn nhận ra người đó giữa đám đông. Và đáng sợ hơn, chúng còn có thể kể cho những con quạ khác biết bạn là ai.`,
  // Scene 2:
  `Một trong những thí nghiệm nổi tiếng nhất về khả năng này được thực hiện bởi các nhà nghiên cứu tại Đại học Washington, Mỹ. Các nhà khoa học đeo một chiếc mặt nạ có khuôn mặt cố định trong lúc bắt một số con quạ hoang dã để gắn vòng nhận dạng rồi thả chúng trở lại tự nhiên.`,
  // Scene 3:
  `Với quạ, khuôn mặt trên chiếc mặt nạ nhanh chóng trở thành hình ảnh gắn liền với một trải nghiệm nguy hiểm.`,
  // Scene 4:
  `Sau đó, các nhà nghiên cứu tiếp tục cho người đeo chính chiếc mặt nạ đó đi bộ qua khu vực, nhưng lần này hoàn toàn không bắt hay làm gì những con quạ.`,
  // Scene 5:
  `Kết quả rất rõ ràng. Những con từng trải qua việc bị bắt lập tức nhận ra khuôn mặt, kêu cảnh báo dữ dội, bay theo và tụ tập thành nhóm để quấy rối người đeo mặt nạ. Trong khi đó, khi một khuôn mặt trung tính khác xuất hiện, chúng gần như không phản ứng.`,
  // Scene 6:
  `Điều bất ngờ hơn xảy ra sau đó. Không chỉ những con từng bị bắt mới biết khuôn mặt nguy hiểm. Những con quạ chưa bao giờ trực tiếp gặp sự việc cũng bắt đầu phản ứng tương tự sau khi quan sát đồng loại.`,
  // Scene 7:
  `Chim non thậm chí có thể học từ bố mẹ rằng khuôn mặt nào cần phải đề phòng. Như vậy, thông tin về một con người nguy hiểm có thể lan truyền trong cả cộng đồng quạ mà không cần từng cá thể phải tự mình trải nghiệm.`,
  // Scene 8:
  `Trong một khu vực nghiên cứu, sau 5 năm, hành vi cảnh báo đối với khuôn mặt này đã lan ít nhất hơn một kilomet từ nơi thí nghiệm ban đầu.`,
  // Scene 9:
  `Các nghiên cứu về não quạ sau đó còn cho thấy khi chúng nhìn thấy khuôn mặt gắn với trải nghiệm nguy hiểm, những vùng não liên quan đến việc xử lý mối đe dọa và ghi nhớ được kích hoạt.`,
  // Scene 10:
  `Vì vậy, nói rằng quạ trả thù giống con người có thể hơi quá. Chúng ta chưa biết chúng có thực sự suy nghĩ kiểu, người này từng làm tôi tức nên tôi sẽ trả đũa. Nhưng điều chắc chắn là chúng có thể nhận diện khuôn mặt, ghi nhớ ai từng gây nguy hiểm, cảnh báo đồng loại và tiếp tục phản ứng với người đó rất lâu sau sự việc ban đầu. Nghĩa là nếu một ngày bạn chọc giận một con quạ, vấn đề có thể không chỉ là con quạ đó. Cả đàn của nó có thể biết mặt bạn. Và có khi, thế hệ sau cũng biết luôn.`,
];

const SCENE_BADGES = [
  "TRÍ THÔNG MINH LOÀI QUẠ • KHẢ NĂNG NHẬN DIỆN MẶT",
  "ĐẠI HỌC WASHINGTON • THÍ NGHIỆM CHIẾC MẶT NẠ",
  "KHẮC SÂU TRÍ NHỚ • TRẢI NGHIỆM NGUY HIỂM",
  "ĐI BỘ BÌNH THƯỜNG • KHÔNG HỀ TẤN CÔNG",
  "TỤ TẬP QUẤY RỐI • PHÂN BIỆT RÕ KHUÔN MẶT",
  "LAN TRUYỀN THÔNG TIN • HỌC HỎI ĐỒNG LOẠI",
  "TRUYỀN DẠY THẾ HỆ • BỐ MẸ DẠY CHIM NON",
  "MẠNG LƯỚI BÁO ĐỘNG • LAN XA HÀNG KILOMET",
  "QUÉT NÃO BỘ • KÍCH HOẠT VÙNG KÝ ỨC",
  "CẢ ĐÀN BIẾT MẶT • THẾ HỆ SAU CŨNG NHỚ",
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

const rawCaptionsPath = path.join(process.cwd(), "src/data/crowCaptionsRaw.json");
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

console.log(`Crow Target words: ${targetTokens.length}, Raw whisper tokens: ${rawTokens.length}`);

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

const outJsonPath = path.join(process.cwd(), "src/data/crowCaptions.json");
fs.writeFileSync(outJsonPath, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases for CrowShort`);

const fps = 30;
const lastPhrase = phrases[phrases.length - 1];
const totalFrames = Math.ceil(((lastPhrase.endMs + 1200) / 1000) * fps);

console.log(`Calculated Total Frames: ${totalFrames} (${(totalFrames / fps).toFixed(2)}s)`);

const subtitleTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./crowCaptions.json";

export interface CrowWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface CrowPhrase extends Caption {
  readonly sceneId: number;
  readonly words: CrowWordTiming[];
}

export interface CrowSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const CROW_FPS = ${fps};
export const CROW_AUDIO_PATH = "audio/crow.wav";
export const CROW_AUDIO_FRAMES = ${Math.ceil((lastPhrase.endMs / 1000) * fps)};
export const CROW_TOTAL_FRAMES = ${totalFrames};
export const CROW_TRANSITION_FRAMES = 18;

export const CROW_PHRASES = rawCaptions as CrowPhrase[];

const SCENE_DEFINITIONS = [
${SCENE_BADGES.map((badge, idx) => `  { id: ${idx + 1}, image: "0${idx + 1}-crow-scene.png".replace("010", "10"), badge: "${badge}" },`).join("\n")}
];

export const CROW_SCENES: CrowSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = CROW_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = CROW_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * CROW_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * CROW_FPS)
      : CROW_TOTAL_FRAMES;
    const halfTransition = Math.floor(CROW_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? CROW_TOTAL_FRAMES
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

const outTsPath = path.join(process.cwd(), "src/data/crowSubtitles.ts");
fs.writeFileSync(outTsPath, subtitleTsContent, "utf8");
console.log(`Saved ${outTsPath}`);
