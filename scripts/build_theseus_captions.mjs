import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: If you replace every single plank of a ship
  `Nếu bạn thay hết từng bộ phận của một con tàu, từng tấm ván một, cho đến khi không còn mảnh gỗ nào từ ban đầu, liệu nó có còn là con tàu cũ hay đã trở thành một con tàu hoàn toàn khác? Nghịch lý con tàu Theseus là một trong những câu đố triết học lâu đời nhất về bản chất của sự đồng nhất, được ghi lại từ hơn hai nghìn năm trước bởi nhà sử học Hy Lạp cổ đại Plutarch.`,
  // Scene 2: Legend of Theseus & Minotaur
  `Câu chuyện bắt nguồn từ huyền thoại về Theseus, vị anh hùng đã đánh bại quái vật Minotaur trong mê cung ở đảo Crete. Khi Theseus trở về Athens trên con tàu chiến thắng, người dân nơi đây vô cùng tự hào, quyết định giữ lại con tàu như một biểu tượng vinh danh, neo đậu mãi mãi tại bến cảng.`,
  // Scene 3: Wood rotting in saltwater harbor
  `Nhưng gỗ thì không tồn tại vĩnh viễn, đặc biệt khi ngâm trong nước biển mặn suốt hàng năm trời. Để giữ con tàu không bị mục nát, người Athens liên tục thay thế từng tấm ván cũ bằng gỗ mới mỗi khi chúng hư hỏng.`,
  // Scene 4: All original planks replaced & core philosophical question
  `Quá trình này diễn ra chậm rãi qua nhiều năm, cho đến một ngày, toàn bộ những tấm ván nguyên bản đều đã được thay mới hoàn toàn. Từ đó, một câu hỏi triết học được đặt ra và tồn tại cho đến ngày nay. Con tàu đang neo đậu ở bến cảng lúc này, có còn là con tàu của Theseus năm xưa hay không?`,
  // Scene 5: The two philosophical arguments (Continuity vs Material)
  `Một bên lập luận cho rằng, con tàu vẫn giữ nguyên hình dáng, chức năng và sự liên tục trong suốt quá trình thay đổi, nên về bản chất, nó vẫn là con tàu của Theseus, chỉ đơn giản là được bảo trì theo thời gian. Nhưng bên còn lại phản bác, nếu không một mảnh gỗ nào từ con tàu ban đầu còn sót lại, thì làm sao có thể gọi đó là con tàu cũ được nữa? Nó chỉ là một con tàu hoàn toàn mới, mang hình dáng tương tự mà thôi.`,
  // Scene 6: The two ships dilemma (rebuilding from old discarded planks)
  `Câu chuyện còn được đẩy đi xa hơn với một tình huống giả định thú vị. Nếu ai đó thu thập lại toàn bộ những tấm ván cũ đã bị tháo ra, rồi ghép chúng lại thành một con tàu khác, vậy trong hai con tàu, một chiếc đang neo ở cảng với toàn bộ gỗ mới, và một chiếc được ghép từ gỗ cũ, đâu mới thực sự là con tàu nguyên bản của Theseus?`,
  // Scene 7: Human cells & personal identity
  `Nghịch lý này không chỉ dừng lại ở một con tàu bằng gỗ. Nó chạm đến câu hỏi sâu xa hơn về chính con người chúng ta. Tế bào trong cơ thể liên tục được thay thế qua từng năm tháng, ký ức thay đổi, suy nghĩ thay đổi, vậy điều gì thực sự khiến một người vẫn là chính họ theo thời gian?`,
  // Scene 8: Unresolved question & nature of identity
  `Cho đến nay, chưa có một câu trả lời duy nhất nào được xem là đúng tuyệt đối. Các triết gia vẫn tiếp tục tranh luận, mỗi người đưa ra một cách nhìn khác nhau về bản chất của sự đồng nhất. Đó là nghịch lý con tàu Theseus.`,
];

const SCENE_BADGES = [
  "NGHỊCH LÝ CON TÀU THESEUS • 2.000 NĂM TRANH LUẬN",
  "THESEUS & QUÁI VẬT MINOTAUR • HUYỀN THOẠI ATHENS",
  "BẾN CẢNG ATHENS • TỪNG TẤM VÁN MỤC NÁT",
  "THAY THẾ TOÀN BỘ GỖ MỚI • BẢN CHẤT ĐỒNG NHẤT",
  "HAI LUỒNG QUAN ĐIỂM • HÌNH DÁNG HAY CHẤT LIỆU?",
  "NGHỊCH LÝ 2 CON TÀU • ĐÂU MỚI LÀ BẢN NGUYÊN?",
  "TẾ BÀO VÀ BẢN NGÃ CON NGƯỜI • TA LÀ AI?",
  "CÂU ĐỐ CHƯA CÓ LỜI GIẢI • BẢN CHẤT TỒN TẠI",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "theseusCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "theseusCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in theseusCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 105000;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate theseusSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./theseusCaptions.json";

export interface TheseusWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface TheseusPhrase extends Caption {
  readonly sceneId: number;
  readonly words: TheseusWordTiming[];
}

export interface TheseusSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const THESEUS_FPS = 30;
export const THESEUS_AUDIO_PATH = "audio/theseus.wav";
export const THESEUS_AUDIO_FRAMES = ${audioFrames};
export const THESEUS_TOTAL_FRAMES = ${totalFrames};
export const THESEUS_TRANSITION_FRAMES = 18;

export const THESEUS_PHRASES = rawCaptions as TheseusPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-ship-paradox.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-theseus-myth.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-athens-harbor-rot.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-replacing-planks.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-two-arguments.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-two-ships-dilemma.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-human-cells-identity.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-eternal-question.png", badge: "${SCENE_BADGES[7]}" },
];

export const THESEUS_SCENES: TheseusSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = THESEUS_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = THESEUS_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * THESEUS_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * THESEUS_FPS)
      : THESEUS_TOTAL_FRAMES;
    const halfTransition = Math.floor(THESEUS_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? THESEUS_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "theseusSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/theseusSubtitles.ts!");
