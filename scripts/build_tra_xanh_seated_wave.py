"""Split the generated six-pose sheet and assemble looping character assets."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/characters/animations/tra-xanh-ngoi-vay-chao-v1'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = Path(r'C:/Users/phamn/.codex/generated_images/01a0fb75-0a81-7fe2-839b-8badf4566550/exec-15b9e26a-c4c5-4733-a213-d28dff8f0978.png')
sheet = Image.open(SOURCE).convert('RGBA')
sheet.save(OUT / 'sprite-sheet.png')
w, h = sheet.size
frames = []
for i in range(6):
    x, y = i % 3, i // 3
    frame = sheet.crop((x*w//3, y*h//2, (x+1)*w//3, (y+1)*h//2))
    frame.save(OUT / f'frame-{i+1:02d}.png')
    frames.append(frame)

# Return through the neutral hand poses, with one cheerful blink per cycle.
order = [0, 1, 2, 1, 0, 4, 3, 5, 2, 1]
durations = [180, 140, 180, 140, 180, 160, 100, 140, 180, 140]
animation = [frames[i] for i in order]
animation[0].save(OUT / 'tra-xanh-ngoi-vay-chao.webp', save_all=True,
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
gif_frames[0].save(OUT / 'tra-xanh-ngoi-vay-chao.gif', save_all=True,
                   append_images=gif_frames[1:], duration=durations, loop=0,
                   transparency=255, disposal=2, optimize=False)
(OUT / 'animation.json').write_text(json.dumps({
    'character': 'Trà Xanh', 'action': 'Ngồi vẫy chào khán giả',
    'width': 512, 'height': 512, 'loop': True,
    'durationMs': sum(durations), 'sourceFrames': 6,
    'sequence': [{'file': f'frame-{i+1:02d}.png', 'durationMs': d}
                 for i, d in zip(order, durations)],
    'generator': 'Built-in image_gen',
    'reference': 'public/characters/tra-xanh-ngoi-nghieng-vay-chao.png'
}, ensure_ascii=False, indent=2), encoding='utf-8')

with Image.open(OUT / 'tra-xanh-ngoi-vay-chao.gif') as check:
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
