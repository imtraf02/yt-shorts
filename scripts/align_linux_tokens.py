import json
import sys
import re

def normalize(w):
    w = w.lower()
    w = re.sub(r'[^\w\s]', '', w)
    return w.strip()

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/linux_script.txt', 'r', encoding='utf-8') as f:
        script_text = f.read()

    script_words = script_text.split()
    print(f"Script words: {len(script_words)}")

    with open('whisper_linux_captions.json', 'r', encoding='utf-8') as f:
        whisper_captions = json.load(f)

    print(f"Whisper tokens: {len(whisper_captions)}")

    # Check 1-to-1 correspondence
    diff_count = 0
    for i in range(len(script_words)):
        sw = normalize(script_words[i])
        ww = normalize(whisper_captions[i]['text'])
        if sw != ww:
            diff_count += 1
            if diff_count <= 15:
                print(f"[{i:3d}] Script: '{script_words[i]}' vs Whisper: '{whisper_captions[i]['text'].strip()}'")

    print(f"Differences in normalized words: {diff_count} / {len(script_words)}")

    # Let's save aligned tokens with the exact original script words and timestamps
    result_tokens = []
    for i in range(len(script_words)):
        result_tokens.append({
            'word': script_words[i],
            'startMs': whisper_captions[i]['startMs'],
            'endMs': whisper_captions[i]['endMs']
        })

    with open('scripts/aligned_linux_tokens.json', 'w', encoding='utf-8') as f:
        json.dump(result_tokens, f, ensure_ascii=False, indent=2)

    print("Saved to scripts/aligned_linux_tokens.json")

if __name__ == '__main__':
    main()
