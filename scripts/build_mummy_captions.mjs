import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-mummy-scene.png
  `Người Ai Cập cổ đại tin rằng cái chết chỉ là khởi đầu của một chuyến đi dài. Và để chuẩn bị cho chuyến đi đó, họ đã làm một điều khiến cả thế giới hiện đại phải kinh ngạc suốt hàng nghìn năm.`,
  // Scene 2: 02-mummy-scene.png
  `Người Ai Cập cổ đại tin vào thế giới bên kia, cái chết không phải kết thúc, mà là bước chuyển sang một cuộc sống vĩnh hằng khác. Nhưng để linh hồn có thể tiếp tục tồn tại, họ tin rằng cơ thể vật lý phải được bảo tồn nguyên vẹn.`,
  // Scene 3: 03-mummy-scene.png
  `Theo tín ngưỡng, con người có nhiều thành phần linh hồn, trong đó quan trọng nhất là Ka, sinh lực, và Ba, nhân cách. Sau khi chết, Ba sẽ rời cơ thể ban ngày nhưng phải quay về xác vào ban đêm để nghỉ ngơi. Nếu thi thể bị phân hủy, linh hồn sẽ mất nơi trú ngụ và không thể tái sinh.`,
  // Scene 4: 04-mummy-scene.png
  `Quá trình ướp xác thường kéo dài khoảng 70 ngày. Đầu tiên, các thầy tu lấy hết nội tạng ra khỏi cơ thể, trừ trái tim,`,
  // Scene 5: 05-mummy-scene.png
  `vì họ tin đây là nơi chứa đựng trí tuệ và sẽ được cân đo trong nghi lễ phán xét sau khi chết.`,
  // Scene 6: 06-mummy-scene.png
  `Não bộ bị coi là không quan trọng. Các thầy tu dùng một cây móc dài luồn qua lỗ mũi để lấy não ra từng mảnh nhỏ và vứt bỏ hoàn toàn.`,
  // Scene 7: 07-mummy-scene.png
  `Cơ thể sau đó được phủ đầy muối natron trong suốt 40 ngày để hút hết độ ẩm, bước quan trọng nhất giúp ngăn vi khuẩn phân hủy xác.`,
  // Scene 8: 08-mummy-scene.png
  `Cuối cùng, xác được quấn hàng trăm mét vải lanh, đặt bùa hộ mệnh xen giữa các lớp vải, rồi đặt vào quan tài trang trí công phu, thường được chôn cùng của cải, thức ăn, đồ dùng để phục vụ cho cuộc sống ở thế giới bên kia.`,
  // Scene 9: 09-mummy-scene.png
  `Điều thú vị, không phải ai cũng được ướp xác. Đây là đặc quyền tốn kém, ban đầu chỉ dành cho pharaoh và giới quý tộc, người dân thường gần như không có khả năng chi trả cho nghi thức này.`,
  // Scene 10: 10-mummy-scene.png
  `Một nỗi sợ về sự lãng quên đã thúc đẩy con người tạo ra kỹ thuật bảo quản thi thể tinh vi nhất thời cổ đại, để rồi hàng nghìn năm sau, chính những xác ướp ấy lại giúp chúng ta hiểu về họ nhiều hơn bao giờ hết.`,
];

const SCENE_BADGES = [
  "CHUYẾN ĐI DÀI • NIỀM TIN BẤT TỬ",
  "BƯỚC CHUYỂN SINH • CUỘC SỐNG VĨNH HẰNG",
  "LINH HỒN KA & BA • NƠI TRÚ NGỤ BAN ĐÊM",
  "NGHI THỨC 70 NGÀY • BẢO TỒN THỂ XÁC",
  "TRÁI TIM & CÂN PHÁN XÉT • NỮ THẦN MA'AT",
  "CÂY MÓC QUA MŨI • LOẠI BỎ NÃO BỘ",
  "MUỐI NATRON 40 NGÀY • HÚT CẠN ĐỘ ẨM",
  "TRĂM MÉT VẢI LANH • BÙA CHÚ HỘ MỆNH",
  "ĐẶC QUYỀN PHARAOH • TỐN KÉM XA HOA",
  "HÀNG NGHÌN NĂM SAU • DI SẢN BẤT DIỆT",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "mummyCaptionsRaw.json"), "utf8"),
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
let currentSceneId = alignedTimings[0]?.sceneId ?? 1;

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

const outCaptions = path.join(process.cwd(), "src", "data", "mummyCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in mummyCaptions.json`);

// Generate mummySubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./mummyCaptions.json";

export interface MummyWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface MummyPhrase extends Caption {
  readonly sceneId: number;
  readonly words: MummyWordTiming[];
}

export interface MummySceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const MUMMY_FPS = 30;
export const MUMMY_AUDIO_PATH = "audio/mummy.wav";
export const MUMMY_AUDIO_FRAMES = 2580; // 86.01s @ 30fps
export const MUMMY_TOTAL_FRAMES = MUMMY_AUDIO_FRAMES + 30; // 2610 frames
export const MUMMY_TRANSITION_FRAMES = 18;

export const MUMMY_PHRASES = rawCaptions as MummyPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-mummy-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-mummy-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-mummy-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-mummy-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-mummy-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-mummy-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-mummy-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-mummy-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-mummy-scene.png", badge: "${SCENE_BADGES[8]}" },
  { id: 10, image: "10-mummy-scene.png", badge: "${SCENE_BADGES[9]}" },
];

export const MUMMY_SCENES: MummySceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = MUMMY_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = MUMMY_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * MUMMY_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * MUMMY_FPS)
      : MUMMY_TOTAL_FRAMES;
    const halfTransition = Math.floor(MUMMY_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? MUMMY_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "mummySubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/mummySubtitles.ts!");
