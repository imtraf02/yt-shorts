import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-zanzibar-scene.png
  `Có một cuộc chiến tranh chính thức trong lịch sử, ngắn hơn cả thời gian bạn xem hết video này cộng thêm vài chục lần nữa. Nó chỉ kéo dài đúng 38 phút.`,
  // Scene 2: 02-zanzibar-scene.png
  `Năm 1890, Anh và Đức ký Hiệp ước Heligoland-Zanzibar, theo đó Zanzibar, nay thuộc Tanzania, trở thành vùng bảo hộ của Đế quốc Anh. Anh đưa Sultan Hamad bin Thuwaini, người thân Anh, lên nắm quyền.`,
  // Scene 3: 03-zanzibar-scene.png
  `Ngày 25 tháng 8 năm 1896, Sultan Hamad đột ngột qua đời trong hoàn cảnh đáng ngờ.`,
  // Scene 4: 04-zanzibar-scene.png
  `Chỉ vài giờ sau, người cháu trai Khalid bin Barghash tự lập mình lên làm Sultan mới, không hề xin phép phía Anh như thông lệ. Nước Anh không chấp nhận vị Sultan tự phong này vì Khalid không thân thiện với lợi ích Anh.`,
  // Scene 5: 05-zanzibar-scene.png
  `Họ đưa ra tối hậu thư, Khalid phải rời cung điện trước 9 giờ sáng ngày 27 tháng 8, nếu không sẽ bị tấn công.`,
  // Scene 6: 06-zanzibar-scene.png
  `Khalid từ chối, cố thủ trong cung điện cùng khoảng 3.000 người bảo vệ, gồm lính, đầy tớ, nô lệ, và vài khẩu pháo cũ.`,
  // Scene 7: 07-zanzibar-scene.png
  `Đúng 9 giờ sáng, hạm đội Anh gồm 5 tàu chiến nổ súng.`,
  // Scene 8: 08-zanzibar-scene.png
  `Cuộc pháo kích dữ dội phá hủy hoàn toàn cung điện, đốt cháy hậu cung, đánh chìm du thuyền hoàng gia của Sultan. Chỉ sau khoảng 38 phút, cờ hiệu bị bắn hạ, toàn bộ kháng cự chấm dứt.`,
  // Scene 9: 09-zanzibar-scene.png
  `Kết quả gây sốc về sự chênh lệch, phía Zanzibar có khoảng 500 người thương vong, trong khi phía Anh chỉ có 1 thủy thủ bị thương nhẹ. Sultan Khalid đã bỏ trốn ngay từ phát súng đầu tiên, để mặc quân lính chiến đấu.`,
  // Scene 10: 10-zanzibar-scene.png
  `Anh nhanh chóng lập một Sultan mới thân Anh hơn lên nắm quyền, và Zanzibar tiếp tục là vùng bảo hộ của Đế quốc Anh trong nhiều thập kỷ sau đó. Không phải mọi cuộc chiến đều cần hàng năm trời hay hàng triệu sinh mạng để định đoạt kết quả. Đôi khi, chưa đầy một giờ đồng hồ là đủ để viết lại cả lịch sử một vùng đất.`,
];

const SCENE_BADGES = [
  "CHIẾN TRANH NGẮN NHẤT LỊCH SỬ • CHỈ KÉO DÀI 38 PHÚT",
  "HIỆP ƯỚC HELIGOLAND-ZANZIBAR • VÙNG BẢO HỘ ĐẾ QUỐC ANH",
  "SULTAN HAMAD QUA ĐỜI • NỖI NGHI NGỜ ĐẦU ĐỘC",
  "SULTAN TỰ PHONG KHALID • PHẢN ĐỐI SỰ KIỂM SOÁT CỦA ANH",
  "TỐI HẬU THƯ 9 GIỜ SÁNG • TỐI CỦA ĐẾ QUỐC ANH",
  "3.000 QUÂN CỐ THỦ • KHƯỚC TỪ LỜI ĐE DỌA",
  "9 GIỜ SÁNG NỔ SÚNG • 5 TÀU CHIẾN HOÀNG GIA ANH",
  "CUNG ĐIỆN SỤP ĐỔ • HẠ CỜ SAU 38 PHÚT",
  "500 NGƯỜI THƯƠNG VONG • KẺ CẦM ĐẦU BỎ TRỐN",
  "BÀI HỌC LỊCH SỬ • CHƯA ĐẦY MỘT GIỜ ĐỒNG HỒ",
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

const rawCaptionsPath = path.join(process.cwd(), "src/data/zanzibarCaptionsRaw.json");
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

console.log(`Zanzibar Target words: ${targetTokens.length}, Raw whisper tokens: ${rawTokens.length}`);

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

const outJsonPath = path.join(process.cwd(), "src/data/zanzibarCaptions.json");
fs.writeFileSync(outJsonPath, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases for ZanzibarShort`);

const fps = 30;
const lastPhrase = phrases[phrases.length - 1];
const totalFrames = Math.ceil(((lastPhrase.endMs + 1200) / 1000) * fps);

console.log(`Calculated Total Frames: ${totalFrames} (${(totalFrames / fps).toFixed(2)}s)`);

const subtitleTsContent = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./zanzibarCaptions.json";

export interface ZanzibarWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface ZanzibarPhrase extends Caption {
  readonly sceneId: number;
  readonly words: ZanzibarWordTiming[];
}

export interface ZanzibarSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const ZANZIBAR_FPS = ${fps};
export const ZANZIBAR_AUDIO_PATH = "audio/zanzibar.wav";
export const ZANZIBAR_AUDIO_FRAMES = ${Math.ceil((lastPhrase.endMs / 1000) * fps)};
export const ZANZIBAR_TOTAL_FRAMES = ${totalFrames};
export const ZANZIBAR_TRANSITION_FRAMES = 18;

export const ZANZIBAR_PHRASES = rawCaptions as ZanzibarPhrase[];

const SCENE_DEFINITIONS = [
${SCENE_BADGES.map((badge, idx) => `  { id: ${idx + 1}, image: "0${idx + 1}-zanzibar-scene.png".replace("010", "10"), badge: "${badge}" },`).join("\n")}
];

export const ZANZIBAR_SCENES: ZanzibarSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = ZANZIBAR_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = ZANZIBAR_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * ZANZIBAR_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * ZANZIBAR_FPS)
      : ZANZIBAR_TOTAL_FRAMES;
    const halfTransition = Math.floor(ZANZIBAR_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? ZANZIBAR_TOTAL_FRAMES
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

const outTsPath = path.join(process.cwd(), "src/data/zanzibarSubtitles.ts");
fs.writeFileSync(outTsPath, subtitleTsContent, "utf8");
console.log(`Saved ${outTsPath}`);
