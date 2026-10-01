import re, json

with open("src/data/worldTimeData.ts", "r", encoding="utf-8") as f:
    txt = f.read()

# Match each chapter object
pattern = r'\{\s*"id":\s*"(part\d+)",.*?"globalStartFrame":\s*(\d+),.*?"imageStartFrames":\s*\[(.*?)\]'
matches = re.findall(pattern, txt, re.DOTALL)

print(f"Found {len(matches)} chapters")
for ch, g_start, frames_str in matches:
    frames = [int(x.strip()) for x in frames_str.split(",") if x.strip()]
    print(f"{ch} (global {g_start}): {len(frames)} scenes, local frames: {frames[:4]}...")
