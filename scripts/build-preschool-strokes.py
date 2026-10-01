"""Extract vector center-lines for the demo; never modify the source illustrations."""
import json
import math
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SLUG = "preschool-animals-whiteboard-demo"


def skeletonize(mask):
    image = np.pad(mask, 1).astype(np.uint8)
    for _ in range(80):
        changed = False
        for step in (0, 1):
            p = [image[:-2, 1:-1], image[:-2, 2:], image[1:-1, 2:], image[2:, 2:],
                 image[2:, 1:-1], image[2:, :-2], image[1:-1, :-2], image[:-2, :-2]]
            neighbors = sum(p)
            transitions = sum((p[i] == 0) & (p[(i + 1) % 8] == 1) for i in range(8))
            if step == 0:
                first, second = p[0] * p[2] * p[4], p[2] * p[4] * p[6]
            else:
                first, second = p[0] * p[2] * p[6], p[0] * p[4] * p[6]
            remove = (image[1:-1, 1:-1] == 1) & (neighbors >= 2) & (neighbors <= 6)
            remove &= (transitions == 1) & (first == 0) & (second == 0)
            if remove.any():
                image[1:-1, 1:-1][remove] = 0
                changed = True
        if not changed:
            break
    return image[1:-1, 1:-1]


def trace(mask):
    remaining = set(map(tuple, np.argwhere(mask)))
    offsets = [(-1, 0), (0, 1), (1, 0), (0, -1), (-1, 1), (1, 1), (1, -1), (-1, -1)]
    paths = []
    while remaining:
        # Starting at an endpoint makes the outside outline more continuous.
        endpoints = [p for p in remaining if sum((p[0] + y, p[1] + x) in remaining for y, x in offsets) <= 1]
        current = min(endpoints or remaining)
        points = []
        while current in remaining:
            remaining.remove(current)
            points.append(current)
            adjacent = [(current[0] + y, current[1] + x) for y, x in offsets
                        if (current[0] + y, current[1] + x) in remaining]
            if not adjacent:
                break
            if len(points) > 1:
                dy, dx = current[0] - points[-2][0], current[1] - points[-2][1]
                adjacent.sort(key=lambda q: -(q[0] - current[0]) * dy - (q[1] - current[1]) * dx)
            current = adjacent[0]
        if len(points) >= 5:
            # Keep enough points for a smooth silhouette without oversized SVG data.
            sampled = points[::2]
            if sampled[-1] != points[-1]:
                sampled.append(points[-1])
            paths.append([[int(x * 3), int(y * 3)] for y, x in sampled])
    return sorted(paths, key=len, reverse=True)


def main():
    result = {}
    for animal in ("cat", "dog", "rabbit", "duck", "cow", "pig", "goat", "hen", "elephant", "giraffe", "tortoise", "goldfish"):
        source = ROOT / "public" / "images" / SLUG / "cutouts" / f"{animal}.png"
        with Image.open(source) as original:
            width, height = original.size
            original = original.convert("RGBA")
            bounds = original.getchannel("A").getbbox()
            if not bounds or bounds == (0, 0, width, height):
                raise ValueError(f"Missing actual transparent background: {animal}")
            reduced = np.array(original.resize((width // 3, height // 3)))
        # Read alpha without flattening or altering the PNG. Transparent pixels must not become dark strokes.
        mask = (reduced[:, :, :3].max(axis=2) < 160) & (reduced[:, :, 3] > 180)
        paths = trace(skeletonize(mask))
        strokes, offset = [], 0
        for points in paths:
            lengths = [0]
            for a, b in zip(points, points[1:]):
                lengths.append(lengths[-1] + math.dist(a, b))
            length = round(lengths[-1], 2)
            strokes.append({"points": points, "lengths": [round(n, 2) for n in lengths],
                            "length": length, "start": round(offset, 2),
                            "d": "M" + " L".join(f"{x},{y}" for x, y in points)})
            offset += length
        all_points = [p for stroke in strokes for p in stroke["points"]]
        x1, y1, x2, y2 = bounds
        margin = 28
        result[animal] = {"width": width, "height": height, "totalLength": round(offset, 2),
                          "assetSrc": f"images/{SLUG}/cutouts/{animal}.png",
                          "box": [max(0, x1 - margin), max(0, y1 - margin), min(width, x2 + margin) - max(0, x1 - margin), min(height, y2 + margin) - max(0, y1 - margin)],
                          "strokes": strokes}
        print(f"{animal}: {len(strokes)} strokes, {len(all_points)} points")
    target = ROOT / "src" / "data" / SLUG / "strokes.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(result, separators=(",", ":")), encoding="utf-8")


if __name__ == "__main__":
    main()
