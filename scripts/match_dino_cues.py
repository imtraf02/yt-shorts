# -*- coding: utf-8 -*-
import sys
import json
import re
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from dinosaur_descriptions import DINOSAUR_DESCRIPTIONS

def main():
    with open("src/data/dinosaur_chapters.json", "r", encoding="utf-8") as f:
        chapters = json.load(f)

    for ch in chapters:
        c_id = ch["id"]
        c_title = ch["title"]
        images = ch["images"]
        descs = ch["image_descriptions"]
        text = ch["text"]
        sentences = [s.strip() for s in re.split(r'[.?!]+', text) if s.strip()]
        print(f"\n==========================================")
        print(f"[{c_id}] {c_title} ({len(images)} images, {len(sentences)} sentences)")
        for idx, (img, desc) in enumerate(zip(images, descs)):
            img_num = img.split("/")[-1].replace(".png", "")
            print(f"  Img #{img_num}: {desc[:60]}...")

if __name__ == "__main__":
    main()
