"""Split the generated six-pose sheet and assemble looping character assets."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/characters/animations/tra-xanh-xoay-vong-v2'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = Path(r'C:/Users/phamn/.codex/generated_images/01a0fb75-0a81-7fe2-839b-8badf4566550/exec-f67e2864-06a3-4d76-9ff4-e226c59dc038.png')
sheet = Image.open(SOURCE).convert('RGBA')
sheet.save(OUT / 'sprite-sheet.png')
w, h = sheet.size
frames = []
for i in range(8):
    x, y = i % 4, i // 4
    frame = sheet.crop((x*w//4, y*h//2, (x+1)*w//4, (y+1)*h//2))
    # Keep the rotation axis over the same planted foot position.
    scaled = frame.resize((410, 410), Image.Resampling.LANCZOS)
    solid = scaled.getchannel('A').point(lambda a: 255 if a >= 128 else 0)
    bounds = solid.getbbox()
    # Hair and the lifted shoe sit above the sole of the supporting shoe.
    sole_band = solid.crop((0, bounds[3] - 8, 410, bounds[3]))
    sole = sole_band.getbbox()
    contact_x = (sole[0] + sole[2]) / 2
    contact_y = bounds[3] - 1
    aligned = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    aligned.alpha_composite(scaled, (round(256 - contact_x), round(470 - contact_y)))
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
    'character': 'Trà Xanh', 'action': 'Xoay một vòng trên một chân trụ, chân kia co lên',
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






