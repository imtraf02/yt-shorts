import json
import sys
import re

def normalize(w):
    w = w.lower()
    w = re.sub(r'[^\w\s]', '', w)
    return w.strip()

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/elon_script.txt', 'r', encoding='utf-8') as f:
        script_text = f.read()

    script_words = script_text.split()
    print(f"Script words: {len(script_words)}")

    with open('whisper_elon_captions.json', 'r', encoding='utf-8') as f:
        whisper_captions = json.load(f)

    print(f"Whisper tokens: {len(whisper_captions)}")

    n = len(script_words)
    m = len(whisper_captions)

    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        dp[i][0] = i * 10
    for j in range(m + 1):
        dp[0][j] = j * 10

    for i in range(1, n + 1):
        sw = normalize(script_words[i - 1])
        for j in range(1, m + 1):
            ww = normalize(whisper_captions[j - 1]['text'])
            if sw == ww:
                cost = 0
            elif sw in ww or ww in sw:
                cost = 1
            else:
                cost = 3
            dp[i][j] = min(
                dp[i - 1][j - 1] + cost,      # match/sub
                dp[i - 1][j] + 2,            # deletion
                dp[i][j - 1] + 2             # insertion
            )

    # Backtrack
    aligned = []
    i, j = n, m
    while i > 0 or j > 0:
        if i > 0 and j > 0:
            sw = normalize(script_words[i - 1])
            ww = normalize(whisper_captions[j - 1]['text'])
            cost = 0 if sw == ww else (1 if (sw in ww or ww in sw) else 3)
            if dp[i][j] == dp[i - 1][j - 1] + cost:
                aligned.append(('match', i - 1, j - 1))
                i -= 1
                j -= 1
                continue
        if i > 0 and dp[i][j] == dp[i - 1][j] + 2:
            aligned.append(('del_script', i - 1, None))
            i -= 1
            continue
        if j > 0 and dp[i][j] == dp[i][j - 1] + 2:
            aligned.append(('ins_whisper', None, j - 1))
            j -= 1
            continue
        if i > 0:
            aligned.append(('del_script', i - 1, None))
            i -= 1
        elif j > 0:
            aligned.append(('ins_whisper', None, j - 1))
            j -= 1

    aligned.reverse()

    print(f"Alignment completed with {len(aligned)} steps.")
    
    result_tokens = []
    last_end_ms = 0

    for step, s_idx, w_idx in aligned:
        if s_idx is not None:
            sword = script_words[s_idx]
            if w_idx is not None:
                wtok = whisper_captions[w_idx]
                start_ms = wtok['startMs']
                end_ms = wtok['endMs']
                last_end_ms = end_ms
            else:
                start_ms = last_end_ms
                end_ms = last_end_ms + 150
                last_end_ms = end_ms

            result_tokens.append({
                'word': sword,
                'startMs': start_ms,
                'endMs': end_ms
            })

    print(f"Aligned {len(result_tokens)} tokens out of {len(script_words)} script words.")

    with open('scripts/aligned_elon_tokens.json', 'w', encoding='utf-8') as f:
        json.dump(result_tokens, f, ensure_ascii=False, indent=2)

    print("Saved to scripts/aligned_elon_tokens.json")

if __name__ == '__main__':
    main()
