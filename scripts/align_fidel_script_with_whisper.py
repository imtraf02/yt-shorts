# -*- coding: utf-8 -*-
"""
Căn chỉnh lời thoại gốc trong kịch bản Fidel Castro với token timestamps của Whisper.
Đảm bảo 100% chuẩn chính tả tiếng Việt, chữ hoa/thường tự nhiên (Aa/aa), bỏ dấu phẩy và chấm cuối từ.
Xuất ra src/data/fidelCastroCaptions.ts
"""

import json
import re
import difflib
from pathlib import Path
from build_fidel_tts import FIDEL_SECTIONS

def normalize_for_matching(word: str) -> str:
    w = word.lower().strip()
    w = re.sub(r'[.,!?;:\"“”\'…()—–-]', '', w)
    return w

def align_chapter(section_id, script_text, raw_tokens):
    raw_script_tokens = script_text.split()
    script_words = []
    for st in raw_script_tokens:
        clean = st.strip()
        if clean in ['—', '–', '-']:
            continue
        clean = re.sub(r'^[.,]+|[.,]+$', '', clean)
        if clean:
            script_words.append(clean)

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

    s_norm = [normalize_for_matching(w) for w in script_words]
    w_norm = [normalize_for_matching(wt['word']) for wt in whisper_words]

    matcher = difflib.SequenceMatcher(None, s_norm, w_norm)
    blocks = matcher.get_matching_blocks()

    aligned_tokens = []

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'equal':
            for si, wj in zip(range(i1, i2), range(j1, j2)):
                aligned_tokens.append({
                    'word': script_words[si],
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
                        'word': script_words[si],
                        'startMs': w_start,
                        'endMs': w_end,
                    })
        elif tag == 'insert':
            pass
        elif tag == 'delete':
            prev_end = aligned_tokens[-1]['endMs'] if aligned_tokens else 0
            for si in range(i1, i2):
                aligned_tokens.append({
                    'word': script_words[si],
                    'startMs': prev_end,
                    'endMs': prev_end + 250,
                })
                prev_end += 250

    return aligned_tokens

def group_into_phrases(tokens, max_words=5):
    phrases = []
    current_words = []
    phrase_start_ms = None

    for i, t in enumerate(tokens):
        if not current_words:
            phrase_start_ms = t['startMs']

        clean_word = re.sub(r'[.,]', '', t['word']).strip()
        current_words.append({
            'word': clean_word,
            'startMs': t['startMs'],
            'endMs': t['endMs'],
        })

        is_too_long = len(current_words) >= max_words
        next_start_ms = tokens[i + 1]['startMs'] if i + 1 < len(tokens) else t['endMs']
        is_gap_long = (next_start_ms - t['endMs'] > 450)
        is_last = (i == len(tokens) - 1)

        if is_too_long or is_gap_long or is_last:
            phrase_end_ms = current_words[-1]['endMs']
            phrases.append({
                'startMs': phrase_start_ms,
                'endMs': phrase_end_ms + 250,
                'words': list(current_words),
            })
            current_words = []
            phrase_start_ms = None

    return phrases

def main():
    captions_by_chapter = {}

    for sec in FIDEL_SECTIONS:
        sec_id = sec['id']
        raw_file = Path(f"src/data/fidel_captions_raw_{sec_id}.json")
        if not raw_file.exists():
            print(f"⚠️ Chưa có file raw cho {sec_id}: {raw_file}")
            continue

        raw_tokens = json.loads(raw_file.read_text(encoding='utf-8'))
        aligned_tokens = align_chapter(sec_id, sec['text'], raw_tokens)
        phrases = group_into_phrases(aligned_tokens, max_words=5)
        captions_by_chapter[sec_id] = phrases
        print(f"✅ {sec_id}: {len(sec['text'].split())} từ kịch bản -> {len(aligned_tokens)} từ căn chỉnh -> {len(phrases)} cụm phụ đề.")

    out_ts = Path("src/data/fidelCastroCaptions.ts")
    ts_code = f"""// Phụ đề động cho 12 chương FidelCastroDocumentary (chính tả chuẩn, không dấu phẩy/chấm)
export interface CaptionWord {{
  word: string;
  startMs: number;
  endMs: number;
}}

export interface CaptionPhrase {{
  startMs: number;
  endMs: number;
  words: CaptionWord[];
}}

export const FIDEL_CAPTIONS: Record<string, CaptionPhrase[]> = {json.dumps(captions_by_chapter, indent=2, ensure_ascii=False)};
"""
    out_ts.write_text(ts_code, encoding='utf-8')
    print(f"\n🎉 Đã xuất thành công fidelCastroCaptions.ts tại: {out_ts}")

if __name__ == "__main__":
    main()
