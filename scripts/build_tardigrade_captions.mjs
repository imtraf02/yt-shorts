import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1:
  `Có một sinh vật dài chưa đến 1mm, đã sống sót sau khi bị phóng thẳng ra ngoài vũ trụ, phơi mình trong chân không tuyệt đối suốt 10 ngày. Và nó vẫn sống.`,
  // Scene 2:
  `Gấu nước là sinh vật siêu nhỏ, dài chỉ khoảng 0,5 đến 1mm, có 8 chân mũm mĩm khiến chúng trông giống hệt một chú gấu con thu nhỏ khi nhìn qua kính hiển vi.`,
  // Scene 3:
  `Bí mật đằng sau khả năng sinh tồn phi thường của chúng nằm ở trạng thái gọi là Cryptobiosis. Khi môi trường trở nên khắc nghiệt, gấu nước có thể đưa toàn bộ quá trình trao đổi chất về gần như bằng 0, mất tới hơn 95% lượng nước trong cơ thể, co lại thành dạng tun gần như bất động.`,
  // Scene 4:
  `Ở trạng thái này, gấu nước có thể chịu đựng nhiệt độ cực đoan, từ gần âm 273 độ C, gần độ không tuyệt đối, đến 150 độ C. Chịu được áp suất gấp 6.000 lần áp suất khí quyển, cao hơn cả áp suất ở rãnh đại dương sâu nhất Trái Đất.`,
  // Scene 5:
  `Năm 2007, Cơ quan Vũ trụ châu Âu đưa hàng nghìn con gấu nước lên tàu FOTON-M3, phơi chúng trực tiếp trong chân không vũ trụ suốt 10 ngày, chịu cả bức xạ mặt trời không được bảo vệ.`,
  // Scene 6:
  `Kết quả, phần lớn sống sót, một số còn đẻ trứng và trứng nở bình thường sau khi trở về Trái Đất.`,
  // Scene 7:
  `Gấu nước cũng có thể sống sót nhiều năm mà không cần nước, chịu được liều phóng xạ gấp hàng nghìn lần mức có thể giết chết con người, nhờ khả năng tự sửa chữa DNA đặc biệt hiệu quả.`,
  // Scene 8:
  `Dù được mệnh danh gần như bất tử, cần làm rõ, gấu nước không sống mãi mãi. Tuổi thọ hoạt động thực tế của chúng chỉ khoảng dưới 1 năm trong điều kiện bình thường. Khả năng đặc biệt của chúng là tạm dừng sự sống để chờ điều kiện thuận lợi quay lại, chứ không phải trường sinh bất tử theo nghĩa đen.`,
  // Scene 9:
  `Gấu nước được tìm thấy ở khắp mọi nơi trên Trái Đất, từ đỉnh núi cao nhất, đáy đại dương sâu nhất, đến ngay trong lớp rêu ẩm trong vườn nhà bạn.`,
  // Scene 10:
  `Không cần siêu năng lực, không cần công nghệ, chỉ bằng cách tạm dừng chính sự sống của mình, gấu nước đã trở thành sinh vật khó bị tiêu diệt nhất từng được biết đến.`,
];

const SCENE_BADGES = [
  "SINH VẬT NGOÀI VŨ TRỤ • 10 NGÀY TRONG CHÂN KHÔNG",
  "GẤU NƯỚC SIÊU NHỎ • 8 CHÂN DƯỚI KÍNH HIỂN VI",
  "TRẠNG THÁI CRYPTOBIOSIS • MẤT 95% LƯỢNG NƯỚC",
  "GIỚI HẠN CỰC ĐOAN • ÂM 273 ĐẾN 150 ĐỘ C",
  "TÀU VŨ TRỤ FOTON-M3 • PHƠI TRỰC TIẾP CHÂN KHÔNG",
  "SỐNG SÓT KỲ DIỆU • ĐẺ TRỨNG NỞ BÌNH THƯỜNG",
  "KHÁNG PHÓNG XẠ CỰC MẠNH • TỰ PHỤC HỒI DNA",
  "TẠM DỪNG SỰ SỐNG • KHÔNG PHẢI BẤT TỬ",
  "PHỦ KHẮP HÀNH TINH • TỪ ĐỈNH NÚI TỚI RÊU VƯỜN",
  "SINH VẬT BẤT DIỆT • ĐỈNH CAO TIẾN HÓA",
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

const rawCaptionsPath = path.join(process.cwd(), "src/data/tardigradeCaptionsRaw.json");
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

console.log(`Tardigrade Target words: ${targetTokens.length}, Raw whisper tokens: ${rawTokens.length}`);

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

const outJsonPath = path.join(process.cwd(), "src/data/tardigradeCaptions.json");
fs.writeFileSync(outJsonPath, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases for TardigradeShort`);

const fps = 30;
const lastPhrase = phrases[phrases.length - 1];
const totalFrames = Math.ceil(((lastPhrase.endMs + 1200) / 1000) * fps);

console.log(`Calculated Total Frames: ${totalFrames} (${(totalFrames / fps).toFixed(2)}s)`);

const subtitleTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./tardigradeCaptions.json";

export interface TardigradeWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface TardigradePhrase extends Caption {
  readonly sceneId: number;
  readonly words: TardigradeWordTiming[];
}

export interface TardigradeSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const TARDIGRADE_FPS = ${fps};
export const TARDIGRADE_AUDIO_PATH = "audio/tardigrade.wav";
export const TARDIGRADE_AUDIO_FRAMES = ${Math.ceil((lastPhrase.endMs / 1000) * fps)};
export const TARDIGRADE_TOTAL_FRAMES = ${totalFrames};
export const TARDIGRADE_TRANSITION_FRAMES = 18;

export const TARDIGRADE_PHRASES = rawCaptions as TardigradePhrase[];

const SCENE_DEFINITIONS = [
${SCENE_BADGES.map((badge, idx) => `  { id: ${idx + 1}, image: "0${idx + 1}-tardigrade-scene.png".replace("010", "10"), badge: "${badge}" },`).join("\n")}
];

export const TARDIGRADE_SCENES: TardigradeSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = TARDIGRADE_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = TARDIGRADE_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * TARDIGRADE_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * TARDIGRADE_FPS)
      : TARDIGRADE_TOTAL_FRAMES;
    const halfTransition = Math.floor(TARDIGRADE_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? TARDIGRADE_TOTAL_FRAMES
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

const outTsPath = path.join(process.cwd(), "src/data/tardigradeSubtitles.ts");
fs.writeFileSync(outTsPath, subtitleTsContent, "utf8");
console.log(`Saved ${outTsPath}`);
