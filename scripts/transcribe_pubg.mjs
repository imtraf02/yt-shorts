import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import path from "path";
import fs from "fs";

const whisperPath = path.join(process.cwd(), "whisper.cpp");
const inputPath = path.join(process.cwd(), "temp_16k_pubg.wav");

console.log("Starting Whisper transcription on temp_16k_pubg.wav...");

const whisperCppOutput = await transcribe({
  inputPath,
  model: "base",
  tokenLevelTimestamps: true,
  whisperPath,
  whisperCppVersion: "1.6.0",
  language: "vi",
  splitOnWord: true,
});

fs.writeFileSync("whisper_pubg_raw.json", JSON.stringify(whisperCppOutput, null, 2));

const { captions } = toCaptions({ whisperCppOutput });
fs.writeFileSync("whisper_pubg_captions.json", JSON.stringify(captions, null, 2));

console.log(`Transcription completed. Total captions: ${captions.length}`);
