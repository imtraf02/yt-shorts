import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-sahara-scene.png
  `Một vùng đất rộng bằng cả nước Mỹ, nơi từng có hồ nước, sông ngòi, cá sấu và hà mã sinh sống. Ngày nay, đó là sa mạc khô cằn nhất hành tinh. Chuyện gì đã biến vùng đất xanh tươi ấy thành biển cát?`,
  // Scene 2: 02-sahara-scene.png
  `Sahara là sa mạc nóng lớn nhất thế giới, rộng hơn 9 triệu km vuông, gần bằng diện tích cả nước Mỹ hoặc Trung Quốc. Nhưng ít ai biết rằng, ngay sau khi kỷ băng hà cuối cùng kết thúc, khu vực này từng là một vùng đất ẩm ướt hơn rất nhiều so với hiện tại. Các nhà khoa học gọi thời kỳ này là "Thời kỳ ẩm ướt châu Phi", kéo dài khoảng từ 11.000 đến 5.000 năm trước.`,
  // Scene 3: 03-sahara-scene.png
  `Trong suốt giai đoạn đó, Sahara được nuôi dưỡng bởi sông ngòi và hồ nước rộng lớn, là nơi sinh sống của cá sấu, rùa, hà mã và nhiều loài cá nước ngọt. Vùng đất này từng thu hút cả những người săn bắt hái lượm và chăn nuôi thời tiền sử đến định cư. Bằng chứng rõ ràng nhất nằm ở hơn 30.000 hình khắc đá cổ mô tả các loài động vật sông nước như cá sấu, cho thấy con người từng chứng kiến một hệ sinh thái hoàn toàn khác biệt.`,
  // Scene 4: 04-sahara-scene.png
  `Ảnh vệ tinh còn phát hiện những kênh nước đen ngoằn ngoèo ẩn dưới lớp cát, dấu tích của một dòng sông cổ từng nuôi dưỡng cả một ốc đảo. Vậy điều gì đã khiến vùng đất trù phú này biến thành sa mạc khô cằn nhất hành tinh?`,
  // Scene 5: 05-sahara-scene.png
  `Nguyên nhân chính đến từ sự thay đổi trong quỹ đạo và độ nghiêng trục quay của Trái Đất, một hiện tượng thiên văn học diễn ra theo chu kỳ hàng chục nghìn năm, làm thay đổi vị trí và cường độ của các luồng gió mùa châu Phi.`,
  // Scene 6: 06-sahara-scene.png
  `Khi quỹ đạo Trái Đất dịch chuyển, lượng mưa gió mùa vốn nuôi sống Sahara dần suy yếu và rút lui về phía nam.`,
  // Scene 7: 07-sahara-scene.png
  `Một số nhà nghiên cứu cũng cho rằng hoạt động chăn thả gia súc của con người thời tiền sử có thể đã góp phần đẩy nhanh quá trình sa mạc hóa, khi thảm thực vật bị phá hủy khiến đất không còn giữ được độ ẩm.`,
  // Scene 8: 08-sahara-scene.png
  `Quá trình khô hạn hóa không diễn ra ngay lập tức mà kéo dài hàng nghìn năm, cho đến khi Sahara hoàn toàn trở thành sa mạc như ngày nay.`,
  // Scene 9: 09-sahara-scene.png
  `Điều thú vị là, theo chu kỳ thiên văn học tương tự, một số nhà khoa học dự đoán rằng trong hàng chục nghìn năm tới, Sahara có thể một lần nữa chuyển mình trở lại thành vùng đất xanh tươi. Đó là câu chuyện về vùng đất xanh đã mất của Sahara.`,
];

const SCENE_BADGES = [
  "VÙNG ĐẤT BÍ ẨN • BIỂN CÁT TỪNG XANH",
  "THỜI KỲ ẨM ƯỚT • THIÊN ĐƯỜNG ĐỘNG VẬT",
  "HÌNH KHẮC ĐÁ CỔ • DẤU ẤN TIỀN SỬ",
  "ẢNH VỆ TINH • DÒNG SÔNG DƯỚI CÁT",
  "CHU KỲ THIÊN VĂN • ĐỘ NGHIÊNG TRỤC QUAY",
  "GIÓ MÙA RÚT LUI • KHÍ HẬU DỊCH CHUYỂN",
  "CHĂN THẢ GIA SÚC • ĐẨY NHANH SA MẠC HÓA",
  "HÀNG NGHÌN NĂM • ĐẠI SA MẠC HÌNH THÀNH",
  "TƯƠNG LAI HỒI SINH • CHUYỂN MÌNH XANH TƯƠI",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "saharaCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "saharaCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in saharaCaptions.json`);

// Generate saharaSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./saharaCaptions.json";

export interface SaharaWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface SaharaPhrase extends Caption {
  readonly sceneId: number;
  readonly words: SaharaWordTiming[];
}

export interface SaharaSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const SAHARA_FPS = 30;
export const SAHARA_AUDIO_PATH = "audio/sahara.wav";
export const SAHARA_AUDIO_FRAMES = 3051; // 101.70s @ 30fps
export const SAHARA_TOTAL_FRAMES = SAHARA_AUDIO_FRAMES + 30; // 3081 frames
export const SAHARA_TRANSITION_FRAMES = 18;

export const SAHARA_PHRASES = rawCaptions as SaharaPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-sahara-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-sahara-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-sahara-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-sahara-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-sahara-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-sahara-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-sahara-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-sahara-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-sahara-scene.png", badge: "${SCENE_BADGES[8]}" },
];

export const SAHARA_SCENES: SaharaSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = SAHARA_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = SAHARA_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * SAHARA_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * SAHARA_FPS)
      : SAHARA_TOTAL_FRAMES;
    const halfTransition = Math.floor(SAHARA_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? SAHARA_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "saharaSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/saharaSubtitles.ts!");
