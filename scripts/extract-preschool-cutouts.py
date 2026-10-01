"""User-approved local matte extraction. Preserve original pixels inside each animal."""
import json
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
SLUG = "preschool-animals-whiteboard-demo"
folder = ROOT / "public" / "images" / SLUG
output = folder / "cutouts"
output.mkdir(parents=True, exist_ok=True)
reports = []

for animal in ("cat", "dog", "rabbit", "duck", "cow", "pig", "goat", "hen", "elephant", "giraffe", "tortoise", "goldfish"):
    source = folder / f"{animal}.jpg"
    rgb = np.array(Image.open(source).convert("RGB"))
    height, width, _ = rgb.shape
    dark = rgb.max(axis=2) < 185
    labels, _ = ndi.label(dark)
    sizes = np.bincount(labels.ravel())
    sizes[0] = 0
    dark &= sizes[labels] >= 15
    # Closing reconnects tiny gaps where whiskers cross the contour. Fill only the enclosed animal.
    filled = ndi.binary_fill_holes(ndi.binary_closing(dark, iterations=3))
    labels, _ = ndi.label(filled)
    sizes = np.bincount(labels.ravel())
    sizes[0] = 0
    body = labels == sizes.argmax()
    assert body.sum() > 80000, f"Incomplete silhouette: {animal}"
    # Background gradient estimated from the untouched outer columns of every row.
    row_background = np.median(np.concatenate((rgb[:, :160], rgb[:, -160:]), axis=1), axis=1)
    background = np.broadcast_to(row_background[:, None, :], rgb.shape).astype(np.float32)
    distance = ndi.distance_transform_edt(~body)
    if animal == "cat":
        # Keep fine white whiskers outside the dark contour; the detached corner watermark is far away.
        whiskers = (rgb[:, :, 2] > background[:, :, 2] + 23) & (rgb[:, :, 0] > 230) & (rgb[:, :, 1] > 225)
        whiskers &= distance < 90
        whiskers[:250] = False
        whiskers[430:] = False
        body |= whiskers
        distance = ndi.distance_transform_edt(~body)
    alpha = body.astype(np.float32)
    # Recover the original anti-aliased outer contour from the local background/nearest outline color.
    _, nearest = ndi.distance_transform_edt(~dark, return_indices=True)
    foreground = rgb[nearest[0], nearest[1]].astype(np.float32)
    direction = foreground - background
    projected = np.sum((rgb.astype(np.float32) - background) * direction, axis=2) / np.maximum(np.sum(direction ** 2, axis=2), 1)
    ring = (~body) & (distance <= 2)
    alpha[ring] = np.clip(projected[ring], 0, 1)
    alpha[alpha < 0.04] = 0
    rgba = np.concatenate((rgb, np.round(alpha[:, :, None] * 255).astype(np.uint8)), axis=2)
    # Adjust only semi-transparent edge pixels; the entire opaque animal is byte-for-byte unchanged.
    semi = (alpha > 0) & (alpha < 1)
    if semi.any():
        straight = (rgb.astype(np.float32) - (1 - alpha[:, :, None]) * background) / np.maximum(alpha[:, :, None], 0.04)
        rgba[semi, :3] = np.clip(straight[semi], 0, 255).astype(np.uint8)
    rgba[alpha == 0, :3] = 0
    target = output / f"{animal}.png"
    Image.fromarray(rgba).save(target)
    with Image.open(target) as check:
        actual = np.array(check)
        assert check.mode == "RGBA" and check.size == (width, height)
        assert np.all(actual[:50, :50, 3] == 0)
        assert np.all(actual[620:, 1150:, 3] == 0), "Watermark remains"
        assert np.array_equal(actual[alpha == 1, :3], rgb[alpha == 1]), "Animal pixels changed"
        bounds = check.getchannel("A").getbbox()
    reports.append({"animal": animal, "source": str(source.relative_to(ROOT)).replace('\\', '/'),
      "output": str(target.relative_to(ROOT)).replace('\\', '/'), "bounds": bounds,
      "transparentPixels": int(np.count_nonzero(actual[:, :, 3] == 0)),
      "opaquePixelsUnchanged": int(np.count_nonzero(alpha == 1)),
      "method": "Local dark-outline enclosure, original RGB/edge alpha matting; user explicitly approved local image processing."})
(output / "extraction.json").write_text(json.dumps(reports, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(reports))
