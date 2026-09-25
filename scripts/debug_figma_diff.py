import json
import sys
import difflib

def clean_word(w):
    return w.lower().strip('.,!?:;\"\'—-[]()')

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/figma_script.txt', 'r', encoding='utf-8') as f:
        script_words = f.read().split()

    with open('whisper_figma_captions.json', 'r', encoding='utf-8') as f:
        captions = json.load(f)

    print(f"Script words: {len(script_words)}, Whisper tokens: {len(captions)}")

    sw_clean = [clean_word(w) for w in script_words]
    ww_clean = [clean_word(c['text']) for c in captions]

    matcher = difflib.SequenceMatcher(None, sw_clean, ww_clean)
    diff_report = []
    
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag != 'equal':
            diff_report.append((tag, i1, i2, j1, j2, script_words[i1:i2], [captions[k]['text'].strip() for k in range(j1, j2)]))

    print(f"Found {len(diff_report)} difference blocks:")
    for tag, i1, i2, j1, j2, s_chunk, w_chunk in diff_report:
        print(f"--- {tag} (Script {i1}:{i2} vs Whisper {j1}:{j2}) ---")
        print(f"  Script:  {s_chunk}")
        print(f"  Whisper: {w_chunk}")

if __name__ == '__main__':
    main()
