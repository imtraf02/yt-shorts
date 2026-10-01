# -*- coding: utf-8 -*-
import sys
import json
import re
import difflib
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

def normalize_for_matching(word: str) -> str:
    w = word.lower().strip()
    w = re.sub(r'[.,!?;:\"“”\'…()—–-]', '', w)
    return w

def align_and_group(script_text, raw_tokens):
    raw_script_tokens = script_text.split()
    script_words = []
    for st in raw_script_tokens:
        clean = st.strip()
        if clean in ['—', '–', '-']:
            if script_words:
                script_words[-1]['has_comma'] = True
            continue
        has_period = bool(re.search(r'[.?!]+$', clean))
        has_comma = bool(re.search(r'[,;:—–]+$', clean))
        display_word = re.sub(r'^[.,!?;:\"“”\'…()—–-]+|[.,!?;:\"“”\'…()—–-]+$', '', clean)
        if display_word:
            script_words.append({
                'word': display_word,
                'has_period': has_period,
                'has_comma': has_comma,
            })

    whisper_words = []
    for wt in raw_tokens:
        text = wt.get('text', '').strip()
        if not text or text in ['—', '–', '-']:
            continue
        whisper_words.append({
            'word': text,
            'startMs': wt.get('startMs', wt.get('startInMs', 0)),
            'endMs': wt.get('endMs', wt.get('endInMs', 0)),
        })

    s_norm = [normalize_for_matching(w['word']) for w in script_words]
    w_norm = [normalize_for_matching(wt['word']) for wt in whisper_words]

    matcher = difflib.SequenceMatcher(None, s_norm, w_norm)
    aligned_tokens = []

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'equal':
            for si, wj in zip(range(i1, i2), range(j1, j2)):
                aligned_tokens.append({
                    'word': script_words[si]['word'],
                    'has_period': script_words[si]['has_period'],
                    'has_comma': script_words[si]['has_comma'],
                    'startMs': whisper_words[wj]['startMs'],
                    'endMs': whisper_words[wj]['endMs'],
                })
        elif tag == 'replace':
            start_ms = whisper_words[j1]['startMs'] if j1 < len(whisper_words) else (aligned_tokens[-1]['endMs'] if aligned_tokens else 0)
            end_ms = whisper_words[min(j2 - 1, len(whisper_words) - 1)]['endMs'] if j2 > j1 and j1 < len(whisper_words) else start_ms + 400
            n_script = i2 - i1
            if n_script > 0:
                duration_per_word = max(180, (end_ms - start_ms) // n_script)
                for k, si in enumerate(range(i1, i2)):
                    w_start = start_ms + k * duration_per_word
                    w_end = w_start + duration_per_word
                    aligned_tokens.append({
                        'word': script_words[si]['word'],
                        'has_period': script_words[si]['has_period'],
                        'has_comma': script_words[si]['has_comma'],
                        'startMs': w_start,
                        'endMs': w_end,
                    })
        elif tag == 'delete':
            prev_end = aligned_tokens[-1]['endMs'] if aligned_tokens else 0
            for si in range(i1, i2):
                aligned_tokens.append({
                    'word': script_words[si]['word'],
                    'has_period': script_words[si]['has_period'],
                    'has_comma': script_words[si]['has_comma'],
                    'startMs': prev_end,
                    'endMs': prev_end + 250,
                })
                prev_end += 250

    # Gom nhóm theo câu hoàn chỉnh và vế câu tự nhiên
    phrases = []
    current_words = []
    phrase_start_ms = None

    for i, t in enumerate(aligned_tokens):
        if not current_words:
            phrase_start_ms = t['startMs']

        current_words.append({
            'word': t['word'],
            'startMs': t['startMs'],
            'endMs': t['endMs'],
        })

        is_last = (i == len(aligned_tokens) - 1)
        next_t = aligned_tokens[i + 1] if not is_last else None
        gap_ms = (next_t['startMs'] - t['endMs']) if next_t else 0

        # Kiểm tra xem có dấu chấm câu trong vòng 4 từ tới hay không (tránh ngắt mồ côi 1-3 từ cuối câu)
        has_period_soon = any(aligned_tokens[k]['has_period'] for k in range(i + 1, min(i + 5, len(aligned_tokens))))
        has_comma_soon = any(aligned_tokens[k]['has_comma'] for k in range(i + 1, min(i + 4, len(aligned_tokens))))

        # Điều kiện ngắt câu chuẩn ngữ nghĩa:
        end_sentence = t['has_period']
        end_clause = t['has_comma'] and (len(current_words) >= 6 or gap_ms > 300)
        end_pause = gap_ms > 500 and len(current_words) >= 5
        
        # Nếu đạt độ dài nhưng sắp hết câu, hãy đợi hết câu thay vì ngắt lửng lơ
        end_max = (len(current_words) >= 18 and not has_period_soon and not has_comma_soon) or (len(current_words) >= 25)

        if end_sentence or end_clause or end_pause or end_max or is_last:
            phrase_end_ms = current_words[-1]['endMs']
            phrases.append({
                'startMs': phrase_start_ms,
                'endMs': phrase_end_ms + 200,
                'text': " ".join([w['word'] for w in current_words]),
                'words': list(current_words),
            })
            current_words = []
            phrase_start_ms = None

    return phrases

with open('src/data/pharaoh_chapters.json', 'r', encoding='utf-8') as f:
    chapters = json.load(f)

raw_tokens = json.loads(Path("src/data/pharaoh_captions_raw_part1.json").read_text(encoding='utf-8'))
phrases = align_and_group(chapters[0]['text'], raw_tokens)

print(f"Tổng số cụm phụ đề nguyên vẹn câu: {len(phrases)}")
for idx, p in enumerate(phrases):
    dur_s = (p['endMs'] - p['startMs']) / 1000.0
    print(f"[{idx+1:2d}] ({dur_s:.1f}s | {len(p['words']):2d} từ): {p['text']}")
