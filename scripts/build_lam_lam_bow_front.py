"""Split the generated six-pose sheet and assemble looping character assets."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/characters/animations/lam-lam-cui-cam-on-v1'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = Path(r'C:/Users/phamn/.codex/generated_images/01a0fb75-0a81-7fe2-839b-8badf4566550/exec-763a095e-69da-4d7e-b9fe-82118481fa60.png')
sheet = Image.open(SOURCE).convert('RGBA')
sheet.save(OUT / 'sprite-sheet.png')
w, h = sheet.size
frames = []
for i in range(6):
    x, y = i % 3, i // 3
    # Split through the actual empty gutter, keeping the entire hip crop.
    row_edges = [0, 560, h]
    cut = sheet.crop((x*w//3, row_edges[y], (x+1)*w//3, row_edges[y+1]))
    frame = Image.new('RGBA', (512, 560), (0, 0, 0, 0))
    frame.alpha_composite(cut)
    scaled = frame.resize((410, 448), Image.Resampling.LANCZOS)
    bottom = scaled.getchannel('A').point(lambda a: 255 if a >= 128 else 0).getbbox()[3]
    aligned = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    aligned.alpha_composite(scaled, (51, 470 - bottom))
    frame = aligned
    frame.save(OUT / f'frame-{i+1:02d}.png')
    frames.append(frame)

# Bow deeply, hold, and rise again.
order = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]
durations = [500, 120, 120, 160, 250, 500, 180, 160, 120, 120, 400]
animation = [frames[i] for i in order]
animation[0].save(OUT / 'lam-lam-cui-cam-on.webp', save_all=True,
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
gif_frames[0].save(OUT / 'lam-lam-cui-cam-on.gif', save_all=True,
                   append_images=gif_frames[1:], duration=durations, loop=0,
                   transparency=255, disposal=2, optimize=False)
(OUT / 'animation.json').write_text(json.dumps({
    'character': 'Lam Lam', 'action': 'Cúi đầu cảm ơn chính diện',
    'width': 512, 'height': 512, 'loop': True,
    'durationMs': sum(durations), 'sourceFrames': 6,
    'sequence': [{'file': f'frame-{i+1:02d}.png', 'durationMs': d}
                 for i, d in zip(order, durations)],
    'generator': 'Built-in image_gen',
    'reference': 'public/characters/lam-lam-thuyet-minh.png'
}, ensure_ascii=False, indent=2), encoding='utf-8')

with Image.open(OUT / 'lam-lam-cui-cam-on.gif') as check:
    assert check.n_frames == len(order)
    assert check.size == (512, 512)
    assert check.info['loop'] == 0
    total = 0
    for i in range(check.n_frames):
        check.seek(i)
        total += check.info['duration']
    assert total == sum(durations)
assert frames[0].getchannel('A').getextrema()[0] == 0
frames[0].save(ROOT / 'public/characters/lam-lam-cam-on.png')
print(json.dumps({'output': str(OUT), 'frames': len(order), 'durationMs': total,
                  'transparent': True}, ensure_ascii=False))







