"""Split the generated six-pose sheet and assemble looping character assets."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/characters/animations/tra-xanh-xoay-vong-v1'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = Path(r'C:/Users/phamn/.codex/generated_images/01a0fb75-0a81-7fe2-839b-8badf4566550/exec-6d60d27f-adf1-4347-8de6-7293a5570345.png')
sheet = Image.open(SOURCE).convert('RGBA')
sheet.save(OUT / 'sprite-sheet.png')
w, h = sheet.size
frames = []
for i in range(8):
    x, y = i % 4, i // 4
    frame = sheet.crop((x*w//4, y*h//2, (x+1)*w//4, (y+1)*h//2))
    # Keep the rotation axis over the same planted foot position.
    foot_x = [0.508, 0.463, 0.401, 0.491, 0.512, 0.496, 0.548, 0.489][i]
    scaled = frame.resize((410, 410), Image.Resampling.LANCZOS)
    aligned = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    aligned.alpha_composite(scaled, (round(256 - foot_x * 410), round(470 - 0.98 * 410)))
    frame = aligned
    frame.save(OUT / f'frame-{i+1:02d}.png')
    frames.append(frame)

# Front, left, back, right, then return to front.
order = [0, 1, 2, 3, 4, 5, 6, 7]
durations = [160] * 8
animation = [frames[i] for i in order]
animation[0].save(OUT / 'tra-xanh-xoay-vong.webp', save_all=True,
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
gif_frames[0].save(OUT / 'tra-xanh-xoay-vong.gif', save_all=True,
                   append_images=gif_frames[1:], duration=durations, loop=0,
                   transparency=255, disposal=2, optimize=False)
(OUT / 'animation.json').write_text(json.dumps({
    'character': 'Trà Xanh', 'action': 'Xoay một vòng 360 độ tại chỗ',
    'width': 512, 'height': 512, 'loop': True,
    'durationMs': sum(durations), 'sourceFrames': 8,
    'sequence': [{'file': f'frame-{i+1:02d}.png', 'durationMs': d}
                 for i, d in zip(order, durations)],
    'generator': 'Built-in image_gen',
    'reference': 'public/characters/tra-xanh-cam-on.png'
}, ensure_ascii=False, indent=2), encoding='utf-8')

with Image.open(OUT / 'tra-xanh-xoay-vong.gif') as check:
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





