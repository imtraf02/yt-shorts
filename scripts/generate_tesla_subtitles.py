import json
import re

with open('whisper_tesla_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

from align_tesla_scenes import scenes_def

current_token_idx = 0
phrases_output = []
phrase_global_id = 0
scene_timings = []

for s in scenes_def:
    s_start_ms = None
    s_end_ms = None
    
    for p_def in s["phrases"]:
        clean_text = p_def["text"]
        words = [w for w in re.sub(r'[,.…!—:?\'"“”/]', ' ', clean_text).split() if w]
        
        phrase_tokens = []
        for w in words:
            tok = tokens[current_token_idx]
            phrase_tokens.append({
                "text": w,
                "startMs": tok["startMs"],
                "endMs": tok["endMs"]
            })
            current_token_idx += 1
            
        # Ensure sequential non-overlapping coverage:
        for k in range(len(phrase_tokens) - 1):
            next_start = phrase_tokens[k+1]['startMs']
            if phrase_tokens[k]['startMs'] >= next_start:
                phrase_tokens[k+1]['startMs'] = phrase_tokens[k]['startMs'] + 80
                next_start = phrase_tokens[k+1]['startMs']
            phrase_tokens[k]['endMs'] = next_start

        # Last token
        last_tok = phrase_tokens[-1]
        if last_tok['endMs'] <= last_tok['startMs']:
            last_tok['endMs'] = last_tok['startMs'] + 220
        elif last_tok['endMs'] - last_tok['startMs'] < 120:
            last_tok['endMs'] = last_tok['startMs'] + 180

        p_start = phrase_tokens[0]["startMs"]
        p_end = phrase_tokens[-1]["endMs"]
        
        if s_start_ms is None:
            s_start_ms = p_start
        s_end_ms = p_end

        phrases_output.append({
            "id": phrase_global_id,
            "startMs": p_start,
            "endMs": p_end,
            "text": clean_text,
            "tokens": phrase_tokens,
            "highlightKeywords": p_def["keywords"]
        })
        phrase_global_id += 1
        
    scene_timings.append({
        "scene": s["scene"],
        "startMs": s_start_ms,
        "endMs": s_end_ms
    })

# Adjust displayEndMs so captions don't flash off abruptly during natural speech pauses
for i in range(len(phrases_output)):
    curr = phrases_output[i]
    if i + 1 < len(phrases_output):
        next_start = phrases_output[i+1]["startMs"]
        gap = next_start - curr["endMs"]
        if gap > 0:
            curr["endMs"] = min(next_start - 30, curr["endMs"] + 350)
    else:
        curr["endMs"] = curr["endMs"] + 500

print(f"Generated {len(phrases_output)} phrases using {current_token_idx} tokens.")
print("\nScene raw speech timings (ms):")
for st in scene_timings:
    print(f"Scene {st['scene']:2d}: {st['startMs']}ms -> {st['endMs']}ms (approx frame {int(st['startMs']*30/1000)} -> {int(st['endMs']*30/1000)})")

ts_code = """export type SubtitleToken = {
  text: string;
  startMs: number;
  endMs: number;
};

export type SubtitlePhrase = {
  id: number;
  startMs: number;
  endMs: number;
  text: string;
  tokens: SubtitleToken[];
  highlightKeywords?: string[];
};

export const teslaSubtitles: SubtitlePhrase[] = """ + json.dumps(phrases_output, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/teslaSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("\nSuccessfully wrote src/data/teslaSubtitles.ts!")
