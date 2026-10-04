"""Split the generated six-pose sheet and assemble looping character assets."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/characters/animations/tra-xanh-cui-cam-on-v2'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = Path(r'C:/Users/phamn/.codex/generated_images/01a0fb75-0a81-7fe2-839b-8badf4566550/exec-efee15e3-99ec-4b08-ac4a-beb026d2bce6.png')
sheet = Image.open(SOURCE).convert('RGBA')
sheet.save(OUT / 'sprite-sheet.png')
w, h = sheet.size
frames = []
for i in range(6):
    x, y = i % 3, i // 3
    frame = sheet.crop((x*w//3, y*h//2, (x+1)*w//3, (y+1)*h//2))
    # Align planted feet on a shared baseline without changing relative anatomy.
    anchors = [(275, 505), (274, 505), (274, 505), (278, 485), (272, 485), (275, 485)]
    ax, ay = anchors[i]
    scaled = frame.resize((410, 410), Image.Resampling.LANCZOS)
    aligned = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    aligned.alpha_composite(scaled, (round(256 - ax * 410/512), round(470 - ay * 410/512)))
    frame = aligned
    frame.save(OUT / f'frame-{i+1:02d}.png')
    frames.append(frame)

# Bow deeply, hold, and rise again.
order = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]
durations = [500, 120, 120, 160, 250, 500, 180, 160, 120, 120, 400]
animation = [frames[i] for i in order]
animation[0].save(OUT / 'tra-xanh-cui-cam-on.webp', save_all=True,
                  append_images=animation[1:], duration=durations, loop=0,
                  lossless=True, method=6)

# One shared palette prevents color shifts. Reserve index 255 for GIF transparency.
rgb_sheet = Image.new('RGB', sheet.size, (255, 255, 255))
rgb_sheet.paste(sheet, mask=sheet.getchannel('A'))
palette = rgb_sheet.quantize(colors=255, method=Image.Quantize.MEDIANCUT)
gif_frames = []
for frame in animation:
    rgb = Image.new('RGB', frame.size, (255, 255, 255))
    rgb.paste(frame, mask=frame.getchannel('A'))
    indexed = rgb.quantize(palette=palette, dither=Image.Dither.NONE)
    transparent = frame.getchannel('A').point(lambda a: 255 if a < 128 else 0)
    indexed.paste(255, mask=transparent)
    indexed.info['transparency'] = 255
    gif_frames.append(indexed)
gif_frames[0].save(OUT / 'tra-xanh-cui-cam-on.gif', save_all=True,
                   append_images=gif_frames[1:], duration=durations, loop=0,
                   transparency=255, disposal=2, optimize=False)
(OUT / 'animation.json').write_text(json.dumps({
    'character': 'Trà Xanh', 'action': 'Cúi đầu chính diện cảm ơn — v2',
    'width': 512, 'height': 512, 'loop': True,
    'durationMs': sum(durations), 'sourceFrames': 6,
    'sequence': [{'file': f'frame-{i+1:02d}.png', 'durationMs': d}
                 for i, d in zip(order, durations)],
    'generator': 'Built-in image_gen',
    'reference': 'public/characters/tra-xanh-cam-on.png'
}, ensure_ascii=False, indent=2), encoding='utf-8')

with Image.open(OUT / 'tra-xanh-cui-cam-on.gif') as check:
    assert check.n_frames == len(order)
    assert check.size == (512, 512)
    assert check.info['loop'] == 0
    total = 0
    for i in range(check.n_frames):
        check.seek(i)
        total += check.info['duration']
    assert total == sum(durations)
assert frames[0].getchannel('A').getextrema()[0] == 0
print(json.dumps({'output': str(OUT), 'frames': len(order), 'durationMs': total,
                  'transparent': True}, ensure_ascii=False))






