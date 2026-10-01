import fs from "node:fs";
import path from "node:path";
import {
  downloadWhisperModel,
  installWhisperCpp,
  toCaptions,
  transcribe,
} from "@remotion/install-whisper-cpp";

const whisperPath = path.join(process.cwd(), "whisper.cpp");

await installWhisperCpp({ to: whisperPath, version: "1.6.0" });
await downloadWhisperModel({ folder: whisperPath, model: "base" });

const whisperCppOutput = await transcribe({
  inputPath: path.join(process.cwd(), "temp_16k_lincoln.wav"),
  model: "base",
  tokenLevelTimestamps: true,
  whisperPath,
  whisperCppVersion: "1.6.0",
  language: "vi",
  splitOnWord: true,
});

const { captions } = toCaptions({ whisperCppOutput });
fs.writeFileSync(
  path.join(process.cwd(), "src", "data", "lincolnCaptionsRaw.json"),
  JSON.stringify(captions, null, 2),
);
console.log("Lincoln transcription complete. Tokens count:", captions.length);
