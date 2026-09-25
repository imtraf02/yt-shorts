import json
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/aligned_vlad_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    for i in range(290, 390):
        t = tokens[i]
        print(f"{i}: {t['word']} ({t['startMs']}-{t['endMs']})")

if __name__ == '__main__':
    main()
