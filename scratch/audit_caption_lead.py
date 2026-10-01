import wave
import numpy as np
import json
from pathlib import Path

content = Path("src/data/facebookWhoPaysCaptions.ts").read_text(encoding="utf-8")
prefix = "export const FACEBOOK_WHO_PAYS_CAPTIONS: Record<string, CaptionPhrase[]> = "
idx = content.find(prefix)
captions = json.loads(content[idx + len(prefix):].rstrip().rstrip(";"))

print(f"{'Part':<8} | {'Audio 1st Sound (ms)':<22} | {'Cap 1st Word Start (ms)':<25} | {'Diff (ms)':<10}")
print("-" * 75)

for i in range(1, 13):
    part = f"part{i}"
    wav_path = f"public/audio/facebook_who_pays_{part}.wav"
    try:
        with wave.open(wav_path, "rb") as wf:
            sr = wf.getframerate()
            frames = wf.readframes(sr * 2) # 2 seconds
            data = np.frombuffer(frames, dtype=np.int16)
            non_zero = np.where(np.abs(data) > 500)[0]
            first_ms = (non_zero[0] / sr) * 1000 if len(non_zero) > 0 else 0
    except Exception as e:
        first_ms = -1
        
    phrases = captions.get(part, [])
    if phrases and phrases[0]["words"]:
        cap_first_ms = phrases[0]["words"][0]["startMs"]
    else:
        cap_first_ms = -1
        
    diff = cap_first_ms - first_ms
    print(f"{part:<8} | {first_ms:<22.1f} | {cap_first_ms:<25.1f} | {diff:<10.1f}")
