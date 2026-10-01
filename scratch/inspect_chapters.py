import re, json

with open("src/data/worldTimeData.ts", "r", encoding="utf-8") as f:
    txt = f.read()

# Parse JSON-like structure
matches = re.findall(r'"id":\s*"(part\d+)",.*?"durationInFrames":\s*(\d+),\s*"globalStartFrame":\s*(\d+)', txt, re.DOTALL)
for ch, dur, start in matches:
    print(f"{ch}: start={start}, duration={dur}, end={int(start)+int(dur)}")
