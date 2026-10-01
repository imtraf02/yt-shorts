import fs from "node:fs";
import path from "node:path";

const SCENE_SCRIPTS = [
  // Scene 1: Half a million square miles & 1,000 casualties
  `Một khu vực đại dương rộng nửa triệu dặm vuông, nơi hơn 1.000 tàu và máy bay từng gặp nạn trong suốt 5 thế kỷ. Không mảnh vỡ, không tín hiệu cầu cứu, đôi khi không cả một lời giải thích. Điều gì thực sự xảy ra ở Tam Giác Quỷ Bermuda?`,
  // Scene 2: Geographic boundary (Miami, Bermuda, Puerto Rico)
  `Tam Giác Quỷ Bermuda là vùng biển tưởng tượng nằm giữa 3 điểm: Bermuda, Puerto Rico và Miami, Florida, tổng diện tích khoảng 500.000 dặm vuông Anh trên Đại Tây Dương.`,
  // Scene 3: Flight 19 in 1945
  `Cái tên này bắt đầu phổ biến từ giữa thế kỷ 20 sau hàng loạt vụ mất tích gây chấn động, nổi bật nhất là chuyến bay Flight 19 năm 1945, khi 5 máy bay ném bom của Hải quân Mỹ cùng phi hành đoàn biến mất không dấu vết trong một chuyến bay huấn luyện thông thường.`,
  // Scene 4: Mystifying vanishings without wreckage
  `Kể từ đó, khu vực này gắn liền với hàng chục vụ tàu thuyền và máy bay biến mất bí ẩn, một số không bao giờ tìm thấy xác, một số được tìm thấy nhưng không có lời giải thích cho nguyên nhân.`,
  // Scene 5: Alien & wormhole theories vs science
  `Nhiều giả thuyết đã được đưa ra để lý giải hiện tượng này. Có người tin vào sự can thiệp của người ngoài hành tinh hoặc cổng không gian bí ẩn, nhưng phần lớn nhà khoa học nghiêng về những lời giải thích tự nhiên hơn.`,
  // Scene 6: Busiest maritime routes & rogue weather
  `Khu vực này nằm trên tuyến đường hàng hải và hàng không nhộn nhịp bậc nhất thế giới, nên xác suất xảy ra tai nạn tự nhiên cao hơn hẳn so với nơi khác. Thời tiết ở đây cũng cực kỳ thất thường, với những cơn bão nhiệt đới hình thành đột ngột và dữ dội.`,
  // Scene 7: Methane hydrate pockets theory
  `Một giả thuyết khác cho rằng các túi khí metan khổng lồ thoát ra từ đáy biển có thể làm giảm mật độ nước biển đột ngột, khiến tàu thuyền chìm nhanh chóng mà không kịp phát tín hiệu cầu cứu.`,
  // Scene 8: Statistical reality from Lloyd's of London & US Coast Guard
  `Các nhà nghiên cứu bảo hiểm hàng hải như Lloyd's of London và Tuần duyên Hoa Kỳ sau khi thống kê dữ liệu nhiều thập kỷ, kết luận rằng tỷ lệ tai nạn ở Tam Giác Quỷ Bermuda không cao hơn đáng kể so với các vùng biển đông đúc khác trên thế giới.`,
  // Scene 9: Ghost ships & enduring maritime mystery
  `Nói cách khác, phần lớn những gì được gọi là bí ẩn có thể chỉ là sự cộng hưởng giữa thời tiết khắc nghiệt, mật độ giao thông cao và trí tưởng tượng của con người được truyền thông khuếch đại qua nhiều thập kỷ. Nhưng vẫn còn đó những trường hợp chưa từng có lời giải thích thỏa đáng, những con tàu được tìm thấy trôi dạt mà không một bóng người trên boong. Khoa học có thể giải thích phần lớn nhưng không phải tất cả. Đó là bí ẩn của Tam Giác Quỷ Bermuda.`,
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
  fs.readFileSync(path.join(process.cwd(), "src", "data", "bermudaCaptionsRaw.json"), "utf8"),
);

const allWordsWithScene = [];
SCENE_SCRIPTS.forEach((text, sceneIdx) => {
  const words = text.match(/\S+/gu) ?? [];
  words.forEach((w) => {
    allWordsWithScene.push({ word: w, sceneId: sceneIdx + 1 });
  });
});

const heard = raw.map((caption) => normalize(caption.text));
const expected = allWordsWithScene.map((entry) => normalize(entry.word));

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

const wordToRaw = Array(expected.length).fill(-1);
let i = expected.length;
let j = heard.length;
while (i > 0 || j > 0) {
  if (
    i > 0 &&
    j > 0 &&
    dp[i][j] === dp[i - 1][j - 1] + score(expected[i - 1], heard[j - 1])
  ) {
    wordToRaw[i - 1] = j - 1;
    i--;
    j--;
  } else if (j > 0 && dp[i][j] === dp[i][j - 1] - 1) {
    j--;
  } else {
    i--;
  }
}

for (let index = 0; index < wordToRaw.length; index++) {
  if (wordToRaw[index] >= 0) continue;
  const before = wordToRaw.slice(0, index).findLastIndex((value) => value >= 0);
  const afterOffset = wordToRaw.slice(index + 1).findIndex((value) => value >= 0);
  const after = afterOffset < 0 ? -1 : index + afterOffset + 1;
  if (before >= 0 && after >= 0) {
    const ratio = (index - before) / (after - before);
    wordToRaw[index] = Math.round(
      wordToRaw[before] + ratio * (wordToRaw[after] - wordToRaw[before]),
    );
  } else if (before >= 0) {
    wordToRaw[index] = Math.min(raw.length - 1, wordToRaw[before] + (index - before));
  } else if (after >= 0) {
    wordToRaw[index] = Math.max(0, wordToRaw[after] - (after - index));
  } else {
    wordToRaw[index] = Math.floor((index / expected.length) * raw.length);
  }
}

const captionWords = allWordsWithScene.map((entry, index) => {
  const source = raw[wordToRaw[index]];
  const next = raw[Math.min(raw.length - 1, wordToRaw[index] + 1)];
  return {
    word: entry.word,
    sceneId: entry.sceneId,
    startMs: source.startMs,
    endMs: Math.max(source.endMs, next.startMs),
    timestampMs: source.timestampMs,
    confidence: source.confidence,
  };
});

// Group into phrases per scene
const phrases = [];
for (let scId = 1; scId <= 9; scId++) {
  const sceneWords = captionWords.filter((w) => w.sceneId === scId);
  for (let start = 0; start < sceneWords.length; ) {
    let end = Math.min(start + 5, sceneWords.length);
    for (let idx = start; idx < end; idx++) {
      if (/[.,!?;:]/u.test(sceneWords[idx].word) && idx - start >= 2) {
        end = idx + 1;
        break;
      }
    }
    const phraseWords = sceneWords.slice(start, end);
    const startMs = phraseWords[0].startMs;
    phrases.push({
      sceneId: scId,
      text: phraseWords.map((entry) => entry.word).join(" "),
      startMs,
      endMs: phraseWords.at(-1).endMs,
      timestampMs: phraseWords[Math.floor(phraseWords.length / 2)].timestampMs,
      confidence: null,
      pageBreakAfter: true,
      words: phraseWords.map(({ word, startMs, endMs, timestampMs, confidence }) => ({
        word,
        startMs,
        endMs,
        timestampMs,
        confidence,
      })),
    });
    start = end;
  }
}

fs.writeFileSync(
  path.join(process.cwd(), "src", "data", "bermudaCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
console.log("Successfully generated", phrases.length, "phrases for Bermuda Triangle!");
