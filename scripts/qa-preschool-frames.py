"""Sample encoded frames and detect empty animal panels; no bitmap assets are modified."""
import json
import io
import struct
import subprocess
import sys
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SLUG = "preschool-animals-whiteboard-demo"
video = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "out" / SLUG / f"{SLUG}-guess-3s.mp4"
offset = float(sys.argv[2]) if len(sys.argv) > 2 else 0
ffmpeg = ROOT / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"
decoder = subprocess.Popen([str(ffmpeg), "-v", "error", "-i", str(video), "-an", "-vf", "scale=480:270",
                            "-vsync", "0", "-c:v", "png", "-f", "image2pipe", "-"],
                           stdout=subprocess.PIPE, stderr=subprocess.PIPE)
# Read source frames sequentially and retain every 15th frame. Output -r2 performs
# CFR duplication/drop with shifted timestamps, which can misclassify a transition.
def exact_bytes(length):
    result = bytearray()
    while len(result) < length:
        chunk = decoder.stdout.read(length - len(result))
        if not chunk:
            raise EOFError("Truncated PNG stream")
        result.extend(chunk)
    return bytes(result)

frames = []
source_index = 0
while True:
    signature = decoder.stdout.read(8)
    if not signature:
        break
    assert signature == b"\x89PNG\r\n\x1a\n"
    picture_bytes = bytearray(signature)
    while True:
        header = exact_bytes(8)
        length = struct.unpack(">I", header[:4])[0]
        chunk_type = header[4:8]
        picture_bytes.extend(header)
        picture_bytes.extend(exact_bytes(length + 4))
        if chunk_type == b"IEND":
            break
    if source_index % 15 == 0:
        with Image.open(io.BytesIO(picture_bytes)) as picture:
            frames.append((source_index, np.array(picture.convert("RGB"))))
    source_index += 1
error = decoder.stderr.read().decode("utf-8", errors="replace")
assert decoder.wait() == 0, error
timeline = json.loads((ROOT / "src" / "data" / SLUG / "timeline.json").read_text(encoding="utf-8"))
checks = []
for index, frame in frames:
    second = index / 30 + offset
    absolute = second * 30
    chapter = next((c for c in timeline["chapters"] if c["start"] <= absolute < c["start"] + c["duration"]), None)
    if not chapter:
        continue
    local = absolute - chapter["start"]
    if local < 15 or local > chapter["duration"] - 15:
        continue  # Don't judge intentional fade-to-paper transition frames.
    boxes = []
    if chapter["group"] == "learn" and local >= chapter["drawEndAt"]:
        boxes = [(170, 355, 1120, 895)]
    elif chapter["group"] == "quiz":
        choices = [(290, 380, 860, 790), (1050, 380, 1620, 790)]
        if local < chapter["revealAt"]:
            boxes = choices
        else:
            boxes = [choices[chapter["options"].index(chapter["animal"])]]
    elif chapter["group"] in ("intro", "outro") and local > 45:
        boxes = [(235 + i * 380, 475, 545 + i * 380, 755) for i in range(4)]
    for box_index, (x1, y1, x2, y2) in enumerate(boxes):
        roi = frame[y1 // 4:y2 // 4, x1 // 4:x2 // 4]
        count = int(np.count_nonzero(roi.max(axis=2) < 170))
        checks.append({"second": second, "chapter": chapter["id"], "panel": box_index, "darkSubjectPixels": count})
failures = [item for item in checks if item["darkSubjectPixels"] < 30]
report = {"sampleRateFps": 2, "decodedSourceFrames": source_index, "sampledFrames": len(frames), "subjectPanelChecks": len(checks),
          "minimumDarkSubjectPixels": min(item["darkSubjectPixels"] for item in checks), "emptyPanels": failures,
          "limitation": "Coarse missing-image detection; does not replace visual review of proportions, colors or text."}
print(json.dumps(report))
assert not failures, "Animal panel disappeared in encoded video"
if not offset:
    (ROOT / "productions" / SLUG / "visual_qa.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
