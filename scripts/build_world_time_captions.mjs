import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  transcribe,
  toCaptions,
} from "@remotion/install-whisper-cpp";

const whisperPath = path.join(process.cwd(), "whisper.cpp");

const CHAPTER_IDS = [
  "part1", "part2", "part3", "part4", "part5",
  "part6", "part7", "part8", "part9", "part10"
];

function convertTo16k(inputWav, output16kWav) {
  if (!fs.existsSync(output16kWav)) {
    console.log(`Converting ${path.basename(inputWav)} to 16kHz mono...`);
    execSync(`npx.cmd remotion ffmpeg -y -i "${inputWav}" -ar 16000 -ac 1 -c:a pcm_s16le "${output16kWav}"`, {
      stdio: "ignore",
    });
  }
}

async function transcribeChapter(id) {
  const inputWav = path.join(process.cwd(), "public", "audio", `world_time_${id}.wav`);
  const temp16k = path.join(process.cwd(), `temp_16k_world_time_${id}.wav`);
  const cacheJson = path.join(process.cwd(), "src", "data", `world_time_captions_raw_${id}.json`);

  if (fs.existsSync(cacheJson)) {
    console.log(`Using cached transcription for ${id}`);
    return JSON.parse(fs.readFileSync(cacheJson, "utf8"));
  }

  if (!fs.existsSync(inputWav)) {
    console.log(`Audio not found for ${id}: ${inputWav}`);
    return null;
  }

  convertTo16k(inputWav, temp16k);

  console.log(`Transcribing ${id} with whisper.cpp (base model, language: vi)...`);
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
  console.log(`✅ Done ${id} in ${((Date.now() - t0) / 1000).toFixed(1)}s (${captions.length} tokens)`);

  try {
    fs.unlinkSync(temp16k);
  } catch (e) {}

  return captions;
}

async function main() {
  console.log("Transcribing all 10 chapters of world_time with whisper.cpp...");
  const results = {};
  for (const id of CHAPTER_IDS) {
    const caps = await transcribeChapter(id);
    if (caps) results[id] = caps;
  }
  console.log("✅ All world_time chapters transcribed successfully!");
}

main().catch((err) => {
  console.error("Error transcribing world_time:", err);
  process.exit(1);
});
