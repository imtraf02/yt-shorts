import fs from "node:fs";
const phrases = JSON.parse(fs.readFileSync("src/data/catCaptions.json", "utf8"));
phrases.forEach((p, i) => {
  console.log(`[${String(i + 1).padStart(2, "0")}] (Scene ${p.sceneId}) ${(p.startMs / 1000).toFixed(2)}s - ${(p.endMs / 1000).toFixed(2)}s (${p.words.length} words): "${p.text}"`);
});
