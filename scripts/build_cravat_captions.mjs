import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-cravat-scene.png
  `Chiếc cà vạt bạn thắt mỗi sáng đi làm, thực ra bắt nguồn từ một đội lính đánh thuê khát máu trên chiến trường thế kỷ 17. Và cái tên của nó cũng đến từ chính họ.`,
  // Scene 2: 02-cravat-scene.png
  `Câu chuyện bắt đầu trong cuộc Chiến tranh Ba mươi năm, từ 1618 đến 1648, một trong những cuộc chiến đẫm máu nhất châu Âu thời Cận đại. Năm 1635, vua Louis XIII của Pháp thuê một đội lính đánh thuê Croatia thiện chiến để tăng cường lực lượng.`,
  // Scene 3: 03-cravat-scene.png
  `Vì thời đó quân đội chưa có đồng phục chuẩn hóa, lính Croatia quấn quanh cổ những chiếc khăn thắt nút đặc trưng, vừa để giữ ấm, vừa để nhận diện đồng đội giữa chiến trường hỗn loạn.`,
  // Scene 4: 04-cravat-scene.png
  `Kiểu khăn quấn cổ này gây ấn tượng mạnh với giới quý tộc Paris vốn nổi tiếng sành điệu.`,
  // Scene 5: 05-cravat-scene.png
  `Vì người Pháp phát âm từ Croate, người Croatia, hơi trại đi, chiếc khăn được đặt tên là cravate, từ đó ra đời từ cravat trong tiếng Anh.`,
  // Scene 6: 06-cravat-scene.png
  `Đến năm 1646, khi mới 7 tuổi, vua Louis XIV bắt đầu đeo cravat làm bằng ren, ngay lập tức trở thành trào lưu thời trang bắt buộc trong giới quý tộc Pháp.`,
  // Scene 7: 07-cravat-scene.png
  `Từ một phụ kiện quân sự thuần túy chức năng, cravat nhanh chóng lan khắp châu Âu, trở thành biểu tượng của địa vị và sự giàu có,`,
  // Scene 8: 08-cravat-scene.png
  `nhiều quý tộc còn thuê hẳn người hầu chuyên thắt cravat vì độ phức tạp của nó.`,
  // Scene 9: 09-cravat-scene.png
  `Qua nhiều thế kỷ, cravat dần tiến hóa thành chiếc cà vạt hiện đại mà chúng ta biết ngày nay, mất đi hoàn toàn dấu vết quân sự ban đầu.`,
  // Scene 10: 10-cravat-scene.png
  `Đến nay, Croatia vẫn tự hào về phát minh này. Ngày 18 tháng 10 hàng năm được chọn là Ngày Cà Vạt Quốc Tế, kỷ niệm chính những người lính đã vô tình tạo ra một trong những phụ kiện thời trang phổ biến nhất lịch sử nhân loại. Không phải nhà thiết kế, mà chính những người lính đánh thuê giữa chiến trường đã tạo ra chiếc cà vạt. Lần tới khi thắt nó, hãy nhớ, bạn đang đeo một mảnh lịch sử chiến tranh quanh cổ.`,
];

const SCENE_BADGES = [
  "NGUỒN GỐC CHIẾC CÀ VẠT • LÍNH ĐÁNH THUÊ THẾ KỶ 17",
  "CHIẾN TRANH 30 NĂM • ĐỘI QUÂN ĐÁNH THUÊ CROATIA",
  "CHIẾC KHĂN ĐỎ QUẤN CỔ • NHẬN DIỆN CHIẾN TRƯỜNG",
  "CƠN SỐT TẠI PARIS • QUÝ TỘC PHÁP MÊ MẨN",
  "TỪ CROATE ĐẾN CRAVATE • NGUỒN GỐC TÊN GỌI",
  "VUA LOUIS XIV 1646 • TRÀO LƯU QUÝ TỘC PHÁP",
  "BIỂU TƯỢNG ĐỊA VỊ • LAN RỘNG KHẮP CHÂU ÂU",
  "NGHỆ THUẬT THẮT NÚT • THỢ THẮT KHĂN RIÊNG",
  "TIẾN HÓA QUA CÁC THẾ KỶ • CÀ VẠT HIỆN ĐẠI",
  "NGÀY CÀ VẠT QUỐC TẾ • LỊCH SỬ QUANH CỔ BẠN",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "cravatCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "cravatCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in cravatCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 90000;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate cravatSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./cravatCaptions.json";

export interface CravatWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface CravatPhrase extends Caption {
  readonly sceneId: number;
  readonly words: CravatWordTiming[];
}

export interface CravatSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const CRAVAT_FPS = 30;
export const CRAVAT_AUDIO_PATH = "audio/cravat.wav";
export const CRAVAT_AUDIO_FRAMES = ${audioFrames};
export const CRAVAT_TOTAL_FRAMES = ${totalFrames};
export const CRAVAT_TRANSITION_FRAMES = 18;

export const CRAVAT_PHRASES = rawCaptions as CravatPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-cravat-scene.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-cravat-scene.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-cravat-scene.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-cravat-scene.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-cravat-scene.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-cravat-scene.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-cravat-scene.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-cravat-scene.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-cravat-scene.png", badge: "${SCENE_BADGES[8]}" },
  { id: 10, image: "10-cravat-scene.png", badge: "${SCENE_BADGES[9]}" },
];

export const CRAVAT_SCENES: CravatSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = CRAVAT_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = CRAVAT_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * CRAVAT_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * CRAVAT_FPS)
      : CRAVAT_TOTAL_FRAMES;
    const halfTransition = Math.floor(CRAVAT_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? CRAVAT_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "cravatSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/cravatSubtitles.ts!");
