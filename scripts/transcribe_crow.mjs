import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  toCaptions,
  transcribe,
} from "@remotion/install-whisper-cpp";

const whisperPath = path.join(process.cwd(), "whisper.cpp");
const inputWav = path.join(process.cwd(), "public", "audio", "crow.wav");
const temp16k = path.join(process.cwd(), "temp_16k_crow.wav");

if (!fs.existsSync(temp16k)) {
  console.log("Converting to 16kHz mono...");
  execSync(`npx.cmd remotion ffmpeg -y -i "${inputWav}" -ar 16000 -ac 1 -c:a pcm_s16le "${temp16k}"`, {
    stdio: "inherit",
  });
}

console.log("Transcribing with whisper.cpp...");
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
const outRaw = path.join(process.cwd(), "src", "data", "crowCaptionsRaw.json");
fs.writeFileSync(outRaw, JSON.stringify(captions, null, 2), "utf8");
console.log(`✅ Crow transcription complete in ${((Date.now() - t0)/1000).toFixed(1)}s. Tokens count: ${captions.length}`);

try {
  fs.unlinkSync(temp16k);
} catch (e) {}
