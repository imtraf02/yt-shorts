import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import path from "path";
import fs from "fs";

async function main() {
  const whisperPath = path.join(process.cwd(), "whisper.cpp");
  const inputPath = path.join(process.cwd(), "temp_16k_bitcoin.wav");

  console.log("Transcribing temp_16k_bitcoin.wav with whisper.cpp...");
  const whisperCppOutput = await transcribe({
    inputPath,
    model: "base",
    tokenLevelTimestamps: true,
    whisperPath,
    whisperCppVersion: "1.6.0",
    printOutput: false,
    translateToEnglish: false,
    language: "vi",
    splitOnWord: true,
  });

  fs.writeFileSync(
    "whisper_bitcoin_raw.json",
    JSON.stringify(whisperCppOutput, null, 2)
  );

  const { captions } = toCaptions({ whisperCppOutput });
  fs.writeFileSync(
    "whisper_bitcoin_captions.json",
    JSON.stringify(captions, null, 2)
  );

  console.log("Done! Captions count:", captions.length);
}

main().catch((err) => {
  console.error("Transcription error:", err);
  process.exit(1);
});
