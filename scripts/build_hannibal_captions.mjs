import fs from "node:fs";
import path from "node:path";

const script = `Một vị tướng 9 tuổi đã thề sẽ tiêu diệt La Mã. Và gần 30 năm sau, ông dẫn cả một đội quân cùng voi chiến vượt qua dãy núi mà không ai nghĩ con người có thể vượt qua. Năm 9 tuổi, Hannibal được cha, tướng quân Carthage Hamilcar Barca, bắt thề trước bàn thờ thần linh rằng sẽ mãi mãi là kẻ thù của La Mã. Lời thề đó định hình cả cuộc đời ông. Carthage vừa thua La Mã trong cuộc chiến Punic lần một, mất gần hết lãnh thổ. Hannibal lớn lên với một mục tiêu duy nhất, trả thù. Năm 218 trước Công nguyên, thay vì tấn công La Mã bằng đường biển như dự đoán, Hannibal làm điều không ai ngờ tới, dẫn năm mươi nghìn quân, kỵ binh và khoảng ba mươi bảy con voi chiến vượt qua dãy núi Alps hiểm trở, nơi tuyết phủ, vách đá dựng đứng, gần như bất khả thi với công nghệ thời đó. Ông mất hơn một nửa quân số trong hành trình vì lạnh giá, đói và các bộ tộc thù địch tấn công. Nhưng khi xuống được đồng bằng Ý, ông vẫn còn đủ lực để làm rung chuyển cả La Mã. Trận Cannae năm 216 trước Công nguyên trở thành một trong những chiến thắng quân sự lỗi lạc nhất lịch sử. Hannibal dùng chiến thuật bao vây gọng kìm, tiêu diệt hàng chục nghìn lính La Mã chỉ trong một ngày, đến nay vẫn được giảng dạy trong các học viện quân sự. Nhưng nghịch lý, dù thắng liên tiếp trên đất Ý suốt mười lăm năm, Hannibal không bao giờ chiếm được chính thành Rome. Cuối cùng, La Mã phản công vào Carthage, buộc ông phải quay về và thất bại trong trận Zama. Hannibal sống lưu vong nhiều năm, bị La Mã truy đuổi khắp nơi. Cuối cùng, để không rơi vào tay kẻ thù, ông tự sát bằng thuốc độc mà mình luôn mang theo. Người khiến cả La Mã khiếp sợ suốt hàng chục năm lại chết trong cô độc, chạy trốn đến hơi thở cuối cùng. Đó là Hannibal. Theo dõi để nghe thêm những câu chuyện lịch sử ít ai biết.`;

const sceneBoundaries = [0, 8760, 19170, 27720, 41160, 49960, 61590, 73000, 81280, 87680];

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
  if (expected.length > 2 && heard.length > 2 && (expected.includes(heard) || heard.includes(expected))) return 2;
  if (expected.length > 3 && heard.length > 3 && editDistance(expected, heard) <= 1) return 1;
  return -1;
};

const raw = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src", "data", "hannibalCaptionsRaw.json"), "utf8"),
);
const words = script.match(/\S+/gu) ?? [];
const heard = raw.map((caption) => normalize(caption.text));
const expected = words.map(normalize);
const dp = Array.from({ length: expected.length + 1 }, () => Array(heard.length + 1).fill(0));

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
  if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + score(expected[i - 1], heard[j - 1])) {
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
    wordToRaw[index] = Math.round(wordToRaw[before] + ratio * (wordToRaw[after] - wordToRaw[before]));
  } else if (before >= 0) {
    wordToRaw[index] = Math.min(raw.length - 1, wordToRaw[before] + (index - before));
  } else if (after >= 0) {
    wordToRaw[index] = Math.max(0, wordToRaw[after] - (after - index));
  } else {
    wordToRaw[index] = Math.floor((index / expected.length) * raw.length);
  }
}

const captionWords = words.map((word, index) => {
  const source = raw[wordToRaw[index]];
  const next = raw[Math.min(raw.length - 1, wordToRaw[index] + 1)];
  return {
    word,
    startMs: source.startMs,
    endMs: Math.max(source.endMs, next.startMs),
    timestampMs: source.timestampMs,
    confidence: source.confidence,
  };
});

const phrases = [];
for (let start = 0; start < captionWords.length;) {
  let end = Math.min(start + 6, captionWords.length);
  for (let index = start; index < end; index++) {
    if (/[.,!?;:]/u.test(captionWords[index].word) && index - start >= 2) {
      end = index + 1;
      break;
    }
  }
  const phraseWords = captionWords.slice(start, end);
  const startMs = phraseWords[0].startMs;
  const sceneIndex = sceneBoundaries.findLastIndex((boundary) => startMs >= boundary);
  phrases.push({
    sceneId: sceneIndex + 1,
    text: phraseWords.map((entry) => entry.word).join(" "),
    startMs,
    endMs: phraseWords.at(-1).endMs,
    timestampMs: phraseWords[Math.floor(phraseWords.length / 2)].timestampMs,
    confidence: null,
    pageBreakAfter: true,
    words: phraseWords,
  });
  start = end;
}

fs.writeFileSync(
  path.join(process.cwd(), "src", "data", "hannibalCaptions.json"),
  JSON.stringify(phrases, null, 2),
);
