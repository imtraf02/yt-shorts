import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1:
  `Có một thời, đàn ông thà bỏ đồng hồ vào túi quần còn hơn đeo lên cổ tay, vì họ cho rằng điều đó yếu đuối và thiếu nam tính.`,
  // Scene 2:
  `Năm 1810, thợ đồng hồ huyền thoại Breguet chế tác chiếc đồng hồ đeo tay đầu tiên được thiết kế từ đầu, theo yêu cầu của Nữ hoàng Caroline Murat xứ Naples, em gái của Napoleon Bonaparte.`,
  // Scene 3:
  `Suốt gần một thế kỷ sau đó, đồng hồ đeo tay, khi ấy gọi là wristlet, gần như chỉ dành cho phụ nữ, được xem như một món trang sức hơn là công cụ xem giờ chính xác.`,
  // Scene 4:
  `Trong khi đó, đàn ông trung thành với đồng hồ bỏ túi, không chỉ vì thói quen, mà còn vì đồng hồ đeo tay thời đó kém chính xác, dễ hỏng do bụi, ẩm, va đập. Nhưng lý do sâu xa hơn, nhiều người đàn ông coi việc đeo vòng tay có đồng hồ là ẻo lả, thiếu nam tính.`,
  // Scene 5:
  `Bước ngoặt đến từ chiến trường. Trong cuộc chiến Boer War, từ 1899 đến 1902, tại châu Phi, binh lính Anh nhận ra bất tiện khi phải rút đồng hồ bỏ túi ra giữa lúc chiến đấu, họ bắt đầu buộc đồng hồ vào cổ tay để tiện xem giờ nhanh mà không cần rảnh tay.`,
  // Scene 6:
  `Năm 1904, nhà thiết kế Louis Cartier tạo ra chiếc đồng hồ đeo tay dành riêng cho nam giới đầu tiên, theo yêu cầu của người bạn, phi công tiên phong Alberto Santos-Dumont, người cần xem giờ chính xác mà không thể rời tay khỏi cần lái máy bay.`,
  // Scene 7:
  `Đến Thế chiến thứ nhất, từ 1914 đến 1918, đồng hồ đeo tay trở thành thiết bị sống còn, binh lính cần đồng bộ giờ giấc chính xác để phối hợp tấn công, ném bom theo kế hoạch.`,
  // Scene 8:
  `Đồng hồ bỏ túi hoàn toàn không thực tế trong chiến hào.`,
  // Scene 9:
  `Sau chiến tranh, những người lính trở về vẫn tiếp tục đeo đồng hồ trên tay, biến nó từ biểu tượng yếu đuối thành biểu tượng của người từng ra trận.`,
  // Scene 10:
  `Đến thập niên 1920, đồng hồ đeo tay cuối cùng đã được cánh đàn ông chấp nhận hoàn toàn. Thứ từng bị chê là nữ tính lại được chính chiến tranh biến thành biểu tượng nam tính. Lần tới khi nhìn đồng hồ trên cổ tay, hãy nhớ, nó từng phải chiến đấu để được đàn ông chấp nhận.`,
];

const SCENE_BADGES = [
  "ĐỒNG HỒ ĐEO TAY • TỪNG BỊ COI LÀ YẾU ĐUỐI",
  "BREGUET 1810 • NỮ HOÀNG CAROLINE MURAT",
  "WRISTLET THỜI ĐẦU • TRANG SỨC CHO PHỤ NỮ",
  "ĐỒNG HỒ BỎ TÚI • BIỂU TƯỢNG CỦA PHÁI MẠNH",
  "BOER WAR 1899-1902 • BƯỚC NGOẶT CHIẾN TRƯỜNG",
  "LOUIS CARTIER 1904 • ĐỒNG HỒ CHO PHI CÔNG",
  "THẾ CHIẾN THỨ NHẤT • THIẾT BỊ ĐỒNG BỘ SỐNG CÒN",
  "CHIẾN HÀO ĐẪM MÁU • ĐỒNG HỒ BỎ TÚI LỖI THỜI",
  "NGƯỜI LÍNH TRỞ VỀ • BIỂU TƯỢNG CỦA CHIẾN BINH",
  "CHIẾN ĐẤU ĐỂ TỒN TẠI • CHẤP NHẬN TOÀN CẦU",
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

const rawCaptionsPath = path.join(process.cwd(), "src/data/watchCaptionsRaw.json");
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

console.log(`Watch Target words: ${targetTokens.length}, Raw whisper tokens: ${rawTokens.length}`);

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

const outJsonPath = path.join(process.cwd(), "src/data/watchCaptions.json");
fs.writeFileSync(outJsonPath, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases for WatchShort`);

const fps = 30;
const lastPhrase = phrases[phrases.length - 1];
const totalFrames = Math.ceil(((lastPhrase.endMs + 1200) / 1000) * fps);

console.log(`Calculated Total Frames: ${totalFrames} (${(totalFrames / fps).toFixed(2)}s)`);

const subtitleTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./watchCaptions.json";

export interface WatchWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface WatchPhrase extends Caption {
  readonly sceneId: number;
  readonly words: WatchWordTiming[];
}

export interface WatchSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const WATCH_FPS = ${fps};
export const WATCH_AUDIO_PATH = "audio/watch.wav";
export const WATCH_AUDIO_FRAMES = ${Math.ceil((lastPhrase.endMs / 1000) * fps)};
export const WATCH_TOTAL_FRAMES = ${totalFrames};
export const WATCH_TRANSITION_FRAMES = 18;

export const WATCH_PHRASES = rawCaptions as WatchPhrase[];

const SCENE_DEFINITIONS = [
${SCENE_BADGES.map((badge, idx) => `  { id: ${idx + 1}, image: "0${idx + 1}-watch-scene.png".replace("010", "10"), badge: "${badge}" },`).join("\n")}
];

export const WATCH_SCENES: WatchSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = WATCH_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = WATCH_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * WATCH_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * WATCH_FPS)
      : WATCH_TOTAL_FRAMES;
    const halfTransition = Math.floor(WATCH_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? WATCH_TOTAL_FRAMES
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

const outTsPath = path.join(process.cwd(), "src/data/watchSubtitles.ts");
fs.writeFileSync(outTsPath, subtitleTsContent, "utf8");
console.log(`Saved ${outTsPath}`);
