import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  transcribe,
  toCaptions,
} from "@remotion/install-whisper-cpp";

const whisperPath = path.join(process.cwd(), "whisper.cpp");

const CHAPTERS = [
  { id: "part1", name: "part1", wav: "us_war_economy_part1.wav" },
  { id: "part2", name: "part2", wav: "us_war_economy_part2.wav" },
  { id: "part3", name: "part3", wav: "us_war_economy_part3.wav" },
  { id: "part4", name: "part4", wav: "us_war_economy_part4.wav" },
  { id: "part5", name: "part5", wav: "us_war_economy_part5.wav" },
  { id: "part6", name: "part6", wav: "us_war_economy_part6.wav" },
  { id: "part7", name: "part7", wav: "us_war_economy_part7.wav" },
];

function convertTo16k(inputWav, output16kWav) {
  if (!fs.existsSync(output16kWav)) {
    console.log(`Converting ${inputWav} to 16kHz mono...`);
    execSync(`npx.cmd remotion ffmpeg -y -i "${inputWav}" -ar 16000 -ac 1 -c:a pcm_s16le "${output16kWav}"`, {
      stdio: "ignore",
    });
  }
}

async function transcribeChapter(chapter) {
  const inputWav = path.join(process.cwd(), "public", "audio", chapter.wav);
  const temp16k = path.join(process.cwd(), `temp_16k_${chapter.id}.wav`);
  const cacheJson = path.join(process.cwd(), "src", "data", `captions_raw_${chapter.id}.json`);

  if (fs.existsSync(cacheJson)) {
    console.log(`Using cached transcription for ${chapter.id}`);
    return JSON.parse(fs.readFileSync(cacheJson, "utf8"));
  }

  convertTo16k(inputWav, temp16k);

  console.log(`Transcribing ${chapter.id} with whisper.cpp...`);
  const t0 = Date.now();
  const whisperCppOutput = await transcribe({
    inputPath: temp16k,
    model: "base",
    tokenLevelTimestamps: true,
    whisperPath,
    whisperCppVersion: "1.6.0",
    language: "vi",
    splitOnWord: true,
  });

  const { captions } = toCaptions({ whisperCppOutput });
  fs.writeFileSync(cacheJson, JSON.stringify(captions, null, 2), "utf8");
  console.log(`Done ${chapter.id} in ${((Date.now() - t0) / 1000).toFixed(1)}s (${captions.length} tokens)`);

  // Dọn dẹp file 16k tạm
  try {
    fs.unlinkSync(temp16k);
  } catch (e) {}

  return captions;
}

// Gom tokens thành các phrases (mỗi cụm 4-7 từ, kết thúc theo dấu câu hoặc độ dài tối đa)
function groupTokensIntoPhrases(tokens, maxWords = 6) {
  const phrases = [];
  let currentWords = [];
  let phraseStartMs = null;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const text = t.text.trim();
    if (!text) continue;

    const startMs = t.startMs ?? t.startInMs ?? 0;
    const endMs = t.endMs ?? t.endInMs ?? startMs + 200;

    if (currentWords.length === 0) {
      phraseStartMs = startMs;
    }

    currentWords.push({
      word: text,
      startMs,
      endMs,
    });

    const isPunctuationEnd = /[.,!?;:…]$/.test(text);
    const isTooLong = currentWords.length >= maxWords;
    const nextStartMs = (i < tokens.length - 1) ? (tokens[i + 1].startMs ?? tokens[i + 1].startInMs ?? endMs) : endMs;
    const isGapLong = (nextStartMs - endMs > 500);

    if (isPunctuationEnd || isTooLong || isGapLong || i === tokens.length - 1) {
      const phraseEndMs = currentWords[currentWords.length - 1].endMs;
      phrases.push({
        startMs: phraseStartMs,
        endMs: phraseEndMs + 250, // hold nhẹ 250ms để chữ không bị giật biến mất
        words: [...currentWords],
      });
      currentWords = [];
      phraseStartMs = null;
    }
  }

  return phrases;
}

async function main() {
  console.log("=== Bắt đầu trích xuất phụ đề cho 7 chương tài liệu ===");
  const allChapterPhrases = {};

  for (const ch of CHAPTERS) {
    const tokens = await transcribeChapter(ch);
    const phrases = groupTokensIntoPhrases(tokens, 5);
    allChapterPhrases[ch.id] = phrases;
    console.log(`Chương ${ch.id}: tạo được ${phrases.length} cụm phụ đề động.`);
  }

  const outTsPath = path.join(process.cwd(), "src", "data", "usWarEconomyCaptions.ts");
  const tsContent = `// File phụ đề động word-by-word cho toàn bộ 7 chương USWarEconomyDocumentary
export interface CaptionWord {
  word: string;
  startMs: number;
  endMs: number;
}

export interface CaptionPhrase {
  startMs: number;
  endMs: number;
  words: CaptionWord[];
}

export const US_WAR_ECONOMY_CAPTIONS: Record<string, CaptionPhrase[]> = ${JSON.stringify(
    allChapterPhrases,
    null,
    2
  )};
`;

  fs.writeFileSync(outTsPath, tsContent, "utf8");
  console.log(`\n🎉 Đã xuất thành công toàn bộ phụ đề tại: ${outTsPath}`);
}

main().catch(console.error);
