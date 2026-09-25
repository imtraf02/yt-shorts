import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/columbus_script.txt', encoding='utf-8') as f:
    txt = f.read()

words_txt = [w for w in re.findall(r'\S+', txt)]

# Let's see the text in columbus_script.txt broken down into paragraphs
paragraphs = [p.strip() for p in txt.split('\n\n') if p.strip()]
print(f"Paragraphs: {len(paragraphs)}")
from verify_columbus_sentences import sentences

words_sent = []
for s in sentences:
    words_sent.extend(re.findall(r'\S+', s))

import json
tokens = json.load(open('scripts/aligned_columbus_tokens.json', encoding='utf-8'))
token_words = [t['word'] for t in tokens]

print(f"Total tokens: {len(token_words)}")
print(f"Total sent words: {len(words_sent)}")

for i in range(len(token_words)):
    w1 = token_words[i]
    w2 = words_sent[i] if i < len(words_sent) else "EOF"
    if w1 != w2:
        print(f"Diff at {i}: token='{w1}' vs sent='{w2}'")
        break


