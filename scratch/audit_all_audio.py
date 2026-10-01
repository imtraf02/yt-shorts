import json
import re
import subprocess
from pathlib import Path

def get_audio_duration(file_path):
    cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(file_path)]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip()) if res.stdout.strip() else 0.0

configs = [
    ("Facebook", "src/data/facebookWhoPaysData.ts", "FACEBOOK_WHO_PAYS_CHAPTERS"),
    ("GameHistory", "src/data/gameHistoryData.ts", "GAME_HISTORY_CHAPTERS"),
    ("Vacxin", "src/data/vacxinData.ts", "VACXIN_CHAPTERS"),
    ("Binary", "src/data/binaryData.ts", "BINARY_CHAPTERS"),
]

for name, ts_path, var_name in configs:
    content = Path(ts_path).read_text(encoding="utf-8")
    m = re.search(f"{var_name}:.*?= (\\[[\\s\\S]*?\\]);", content)
    if not m:
        print(f"Could not parse {name}")
        continue
    chapters = json.loads(m.group(1))
    print(f"\n==================== {name} ====================")
    current_cum = 0
    for ch in chapters:
        audio_file = Path("public") / ch["audioSrc"]
        if audio_file.exists():
            real_sec = get_audio_duration(audio_file)
            real_frames = round(real_sec * 30)
        else:
            real_sec = -1
            real_frames = -1
        
        data_start = ch["startFrame"]
        data_dur = ch["durationInFrames"]
        diff_dur = real_frames - data_dur if real_frames >= 0 else 0
        diff_start = current_cum - data_start
        
        status = "OK" if diff_dur == 0 and diff_start == 0 else f"MISMATCH (diff_dur={diff_dur}, diff_start={diff_start})"
        print(f"{ch['id']:<8} | start={data_start:<6} (cum={current_cum:<6}) | dur={data_dur:<5} (real={real_frames:<5}, {real_sec:.2f}s) | {status}")
        current_cum += data_dur
