import json
from build_genghis_scenes_refined import all_phrases

ts_content = """export type SubtitleToken = {
  text: string;
  startMs: number;
  endMs: number;
};

export type SubtitlePhrase = {
  id: number;
  scene?: number;
  startMs: number;
  endMs: number;
  text: string;
  tokens: SubtitleToken[];
  highlightKeywords?: string[];
};

export const genghisSubtitles: SubtitlePhrase[] = """

ts_content += json.dumps(all_phrases, ensure_ascii=False, indent=2)
ts_content += ";\n"

with open('src/data/genghisSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Updated src/data/genghisSubtitles.ts successfully!")
