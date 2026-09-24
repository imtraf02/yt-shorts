import json
import re

with open('whisper_darwin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

from align_darwin_scenes import scenes_def

current_token_idx = 0
phrases_output = []
phrase_global_id = 0
scene_timings = []

for s in scenes_def:
    s_start_ms = None
    s_end_ms = None
    
    for p_def in s["phrases"]:
        clean_text = p_def["text"]
        words = [w for w in re.sub(r'[,.…!—:?\'"“”/()]', ' ', clean_text).split() if w]
        
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

# Calculate seamless contiguous scene frame allocations (total = 2880 frames = 96.00s @ 30 FPS)
# Audio duration is 95.36s (2861 frames). Total video frames = 2880 (96s).
total_video_frames = 2880
scene_frame_durations = []

for idx in range(len(scene_timings)):
    if idx == 0:
        start_frame = 0
    else:
        # cut point is halfway between previous scene's end and current scene's start, or at current scene's start
        prev_end_sec = scene_timings[idx-1]['endMs'] / 1000.0
        curr_start_sec = scene_timings[idx]['startMs'] / 1000.0
        cut_sec = (prev_end_sec + curr_start_sec) / 2.0
        start_frame = round(cut_sec * 30)

    if idx < len(scene_timings) - 1:
        next_start_sec = scene_timings[idx+1]['startMs'] / 1000.0
        curr_end_sec = scene_timings[idx]['endMs'] / 1000.0
        cut_sec = (curr_end_sec + next_start_sec) / 2.0
        end_frame = round(cut_sec * 30)
    else:
        end_frame = total_video_frames

    dur = end_frame - start_frame
    scene_frame_durations.append(dur)

# Sanity check sum
print("\nContiguous Scene Durations (30 FPS):")
acc = 0
for idx, dur in enumerate(scene_frame_durations):
    print(f"Scene {idx+1:2d}: {dur:3d} frames ({acc:4d} to {acc+dur:4d}) | {dur/30:.2f}s")
    acc += dur

print(f"Total video frames: {acc} (Target: {total_video_frames})")

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

export const darwinSubtitles: SubtitlePhrase[] = """ + json.dumps(phrases_output, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/darwinSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("\nSuccessfully generated src/data/darwinSubtitles.ts")
