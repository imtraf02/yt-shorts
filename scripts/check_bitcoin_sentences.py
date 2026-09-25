import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/aligned_bitcoin_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

with open('scripts/bitcoin_script.txt', 'r', encoding='utf-8') as f:
    lines = [l.strip() for l in f if l.strip()]

cursor = 0
for i, l in enumerate(lines):
    words = l.split()
    s_toks = tokens[cursor : cursor + len(words)]
    cursor += len(words)
    print(f"S{i+1:02d} ({len(words):2d}w): {s_toks[0]['startMs']:6d}ms -> {s_toks[-1]['endMs']:6d}ms | {s_toks[0]['word']} ... {s_toks[-1]['word']}")

print(f"Total tokens processed: {cursor} / {len(tokens)}")

words_s21 = lines[20].split()
s21_tokens = tokens[cursor - len(words_s21) : cursor]
print("\nS21 tokens detail:")
for i, t in enumerate(s21_tokens):
    print(f"{i:2d}: {t['startMs']:6d} - {t['endMs']:6d} | {t['word']}")
