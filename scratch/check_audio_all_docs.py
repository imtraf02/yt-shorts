import re
from pathlib import Path

docs = list(Path("src").glob("*Documentary.tsx"))
for doc in docs:
    text = doc.read_text(encoding="utf-8")
    audio_tags = re.findall(r'<Audio[^>]*>', text)
    print(f"{doc.name}:")
    for a in audio_tags:
        print(f"   {a}")
