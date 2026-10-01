import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: 01-ancient-route.png
  `Một tuyến đường dài hơn 6.400 km, nối liền hai đầu thế giới cổ đại, nơi tơ lụa, hương liệu, và cả những căn bệnh chết người cùng lưu thông suốt hơn một nghìn năm. Vì sao con đường huyết mạch này lại biến mất?`,
  // Scene 2: 02-chinese-sericulture.png
  `Con đường tơ lụa hình thành từ khoảng thế kỷ 2 trước Công nguyên, là con đường thương mại lịch sử trải dài từ châu Á đến Địa Trung Hải, đi qua Trung Quốc, Ấn Độ, Ba Tư, Ả Rập, Hy Lạp và Ý. Tơ lụa vốn là mặt hàng độc quyền của Trung Quốc, do người Trung Hoa khám phá ra kỹ thuật trồng dâu nuôi tằm để ươm tơ dệt lụa từ thế kỷ thứ 3 trước Công nguyên, ban đầu chỉ dành cho vua chúa và giới quý tộc.`,
  // Scene 3: 03-caravan-trade.png
  `Khi thương nhân Trung Hoa mang lụa và gấm vóc ra nước ngoài giao thương với Ba Tư và La Mã, tuyến đường huyền thoại này dần thành hình.`,
  // Scene 4: 04-goods-and-ideas.png
  `Nhưng con đường tơ lụa không chỉ chở lụa. Nó còn là kênh lưu thông của vải vóc, gia vị, ngũ cốc, trái cây, da động vật, gỗ, kim loại và đá quý, cùng với đó là dòng chảy chưa từng có của tri thức, tôn giáo, ngôn ngữ và cả công nghệ giữa Đông và Tây.`,
  // Scene 5: 05-buddhism-paper.png
  `Phật giáo theo chân các đoàn lữ hành để đến Trung Quốc, kỹ thuật làm giấy từ Trung Hoa lan sang thế giới Hồi giáo rồi tới châu Âu.`,
  // Scene 6: 06-black-death.png
  `Nhưng con đường ấy cũng mang theo mầm bệnh. Đại dịch Cái Chết Đen giữa thế kỷ 14, một trong những thảm họa chết chóc nhất lịch sử nhân loại, được cho là đã theo các tuyến thương mại này lan từ Trung Á sang châu Âu.`,
  // Scene 7: 07-mongol-decline.png
  `Sự suy tàn của con đường tơ lụa đến từ nhiều nguyên nhân cộng hưởng. Đế chế Mông Cổ, vốn từng thống nhất và bảo vệ an toàn cho các tuyến đường xuyên lục địa, dần tan rã, khiến giao thương trở nên nguy hiểm và bất ổn trở lại.`,
  // Scene 8: 08-age-of-discovery.png
  `Cùng lúc đó, các cường quốc hàng hải châu Âu như Bồ Đào Nha bắt đầu tìm ra những tuyến đường biển vòng qua châu Phi để đến thẳng châu Á, giúp việc vận chuyển hàng hóa nhanh hơn, rẻ hơn và an toàn hơn nhiều so với hành trình xuyên sa mạc đầy hiểm nguy. Đến thế kỷ 15, phần lớn hoạt động thương mại đã chuyển sang đường biển, con đường tơ lụa trên bộ dần rơi vào quên lãng.`,
  // Scene 9: 09-belt-and-road.png
  `Nhưng di sản của nó thì không hề biến mất. Ngày nay, sáng kiến Vành đai và Con đường của Trung Quốc được xem như một nỗ lực hồi sinh tinh thần kết nối Đông Tây từng tồn tại hàng nghìn năm trước. Đó là câu chuyện của Con đường tơ lụa.`,
];

const SCENE_BADGES = [
  "CON ĐƯỜNG TƠ LỤA • 6.400 KM KẾT NỐI ĐÔNG TÂY",
  "BÍ MẬT ƯƠM TƠ • ĐỘC QUYỀN HOÀNG GIA",
  "ĐOÀN LỮ HÀNH SA MẠC • BA TƯ VÀ LA MÃ",
  "DÒNG CHẢY HÀNG HÓA & TRI THỨC TOÀN CẦU",
  "PHẬT GIÁO VÀ NGHỆ THUẬT LÀM GIẤY",
  "CÁI CHẾT ĐEN • ĐẠI DỊCH THẾ KỶ 14",
  "ĐẾ CHẾ MÔNG CỔ TAN RÃ • HIỂM NGUY RÌNH RẬP",
  "THỜI ĐẠI HÀNG HẢI • BỒ ĐÀO NHA VÀ ĐƯỜNG BIỂN",
  "DI SẢN BẤT TỬ • VÀNH ĐAI VÀ CON ĐƯỜNG",
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "silkroadCaptionsRaw.json"), "utf8"),
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

const outCaptions = path.join(process.cwd(), "src", "data", "silkroadCaptions.json");
fs.writeFileSync(outCaptions, JSON.stringify(phrases, null, 2), "utf8");
console.log(`Generated ${phrases.length} phrases in silkroadCaptions.json`);

// Calculate total audio duration from last caption endMs
const lastCaptionEndMs = phrases[phrases.length - 1]?.endMs ?? 95000;
const audioFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);
const totalFrames = audioFrames + 30; // 1s extra buffer

// Generate silkroadSubtitles.ts
const subtitlesTs = `import type { Caption } from "@remotion/captions";
import rawCaptions from "./silkroadCaptions.json";

export interface SilkRoadWordTiming {
  readonly word: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly timestampMs: number | null;
  readonly confidence: number | null;
}

export interface SilkRoadPhrase extends Caption {
  readonly sceneId: number;
  readonly words: SilkRoadWordTiming[];
}

export interface SilkRoadSceneMeta {
  readonly id: number;
  readonly image: string;
  readonly badge: string;
  readonly captionStartFrame: number;
  readonly startFrame: number;
  readonly durationInFrames: number;
}

export const SILKROAD_FPS = 30;
export const SILKROAD_AUDIO_PATH = "audio/silkroad.wav";
export const SILKROAD_AUDIO_FRAMES = ${audioFrames};
export const SILKROAD_TOTAL_FRAMES = ${totalFrames};
export const SILKROAD_TRANSITION_FRAMES = 20;

export const SILKROAD_PHRASES = rawCaptions as SilkRoadPhrase[];

const SCENE_DEFINITIONS = [
  { id: 1, image: "01-ancient-route.png", badge: "${SCENE_BADGES[0]}" },
  { id: 2, image: "02-chinese-sericulture.png", badge: "${SCENE_BADGES[1]}" },
  { id: 3, image: "03-caravan-trade.png", badge: "${SCENE_BADGES[2]}" },
  { id: 4, image: "04-goods-and-ideas.png", badge: "${SCENE_BADGES[3]}" },
  { id: 5, image: "05-buddhism-paper.png", badge: "${SCENE_BADGES[4]}" },
  { id: 6, image: "06-black-death.png", badge: "${SCENE_BADGES[5]}" },
  { id: 7, image: "07-mongol-decline.png", badge: "${SCENE_BADGES[6]}" },
  { id: 8, image: "08-age-of-discovery.png", badge: "${SCENE_BADGES[7]}" },
  { id: 9, image: "09-belt-and-road.png", badge: "${SCENE_BADGES[8]}" },
];

export const SILKROAD_SCENES: SilkRoadSceneMeta[] = SCENE_DEFINITIONS.map(
  (scene, index) => {
    const firstPhrase = SILKROAD_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id,
    );
    const nextPhrase = SILKROAD_PHRASES.find(
      (phrase) => phrase.sceneId === scene.id + 1,
    );
    const captionStartFrame = Math.floor(
      ((firstPhrase?.startMs ?? 0) / 1000) * SILKROAD_FPS,
    );
    const nextCaptionStartFrame = nextPhrase
      ? Math.floor((nextPhrase.startMs / 1000) * SILKROAD_FPS)
      : SILKROAD_TOTAL_FRAMES;
    const halfTransition = Math.floor(SILKROAD_TRANSITION_FRAMES / 2);
    const startFrame =
      scene.id === 1 ? 0 : Math.max(0, captionStartFrame - halfTransition);
    const endFrame =
      index === SCENE_DEFINITIONS.length - 1
        ? SILKROAD_TOTAL_FRAMES
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

const outSubtitles = path.join(process.cwd(), "src", "data", "silkroadSubtitles.ts");
fs.writeFileSync(outSubtitles, subtitlesTs, "utf8");
console.log("Successfully created src/data/silkroadSubtitles.ts!");
