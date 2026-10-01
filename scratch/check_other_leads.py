import wave
import numpy as np
import json
import re
from pathlib import Path

def check_file(cap_path, prefix, wav_prefix):
    text = Path(cap_path).read_text(encoding="utf-8")
    m = re.search(f"{prefix}: Record<string, CaptionPhrase\\[\\]> = ([\\s\\S]*?);", text)
    if not m:
        return
    caps = json.loads(m.group(1))
    p1 = caps.get("part1", [])
    if p1 and p1[0]["words"]:
        cap_start = p1[0]["words"][0]["startMs"]
    else:
        cap_start = 0
    
    with wave.open(f"public/audio/{wav_prefix}_part1.wav", "rb") as wf:
        sr = wf.getframerate()
        data = np.frombuffer(wf.readframes(sr * 2), dtype=np.int16)
        non_zero = np.where(np.abs(data) > 500)[0]
        audio_start = (non_zero[0] / sr) * 1000 if len(non_zero) > 0 else 0
        
    print(f"{wav_prefix:<15} | Audio Start = {audio_start:.1f}ms | Cap Start = {cap_start:.1f}ms | Lead = {cap_start - audio_start:.1f}ms")

check_file("src/data/game_historyCaptions.ts", "GAME_HISTORY_CAPTIONS", "game_history")
check_file("src/data/vacxinCaptions.ts", "VACXIN_CAPTIONS", "vacxin")
check_file("src/data/binaryCaptions.ts", "BINARY_CAPTIONS", "binary")
