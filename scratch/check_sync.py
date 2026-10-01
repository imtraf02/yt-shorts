import json
import re
from pathlib import Path

# Load captions ts
cap_file = Path("src/data/facebookWhoPaysCaptions.ts")
text = cap_file.read_text(encoding="utf-8")

# Extract the JSON object
prefix = "export const FACEBOOK_WHO_PAYS_CAPTIONS: Record<string, CaptionPhrase[]> = "
idx = text.find(prefix)
if idx != -1:
    raw_json = text[idx + len(prefix):].rstrip().rstrip(";")
    captions = json.loads(raw_json)
else:
    print("Could not find prefix")
    exit(1)

# Load data chapters
data_file = Path("src/data/facebook_who_pays_chapters.json")
chapters = json.loads(data_file.read_text(encoding="utf-8"))

print(f"{'Chapter':<8} | {'Audio Dur (s)':<14} | {'Cap End (s)':<14} | {'Diff (s)':<10} | {'Phrases':<8} | {'Tokens':<8}")
print("-" * 75)

for ch in chapters:
    cid = ch["id"]
    audio_dur = ch.get("audio_duration_seconds", 0)
    c_phrases = captions.get(cid, [])
    if c_phrases:
        last_phrase = c_phrases[-1]
        cap_end_ms = last_phrase["endMs"]
        cap_end_s = cap_end_ms / 1000.0
        diff = cap_end_s - audio_dur
        total_words = sum(len(p["words"]) for p in c_phrases)
        print(f"{cid:<8} | {audio_dur:<14.2f} | {cap_end_s:<14.2f} | {diff:<10.2f} | {len(c_phrases):<8} | {total_words:<8}")
    else:
        print(f"{cid:<8} | {audio_dur:<14.2f} | NO CAPTIONS")
