# -*- coding: utf-8 -*-
import json
import re
import difflib
from pathlib import Path
from build_us_war_economy_tts import SECTIONS_DATA

def normalize_for_matching(word: str) -> str:
    # Bỏ dấu câu để so khớp từ vựng
    w = word.lower().strip()
    w = re.sub(r'[.,!?;:\"“”\'…()—–-]', '', w)
    return w

def align_chapter(section_id, script_text, raw_tokens):
    # Tách từ trong kịch bản gốc
    # Tách theo khoảng trắng
    raw_script_tokens = script_text.split()
    script_words = []
    for st in raw_script_tokens:
        clean = st.strip()
        # Loại bỏ các ký tự dấu gạch ngang dài đơn lẻ như '—'
        if clean in ['—', '–', '-']:
            continue
        # Bỏ dấu phẩy và chấm ở đầu/cuối theo yêu cầu của user
        clean = re.sub(r'^[.,]+|[.,]+$', '', clean)
        if clean:
            script_words.append(clean)

    # Lấy danh sách từ whisper
    whisper_words = []
    for wt in raw_tokens:
        text = wt['text'].strip()
        if not text or text in ['—', '–', '-']:
            continue
        whisper_words.append({
            'word': text,
            'startMs': wt.get('startMs', wt.get('startInMs', 0)),
            'endMs': wt.get('endMs', wt.get('endInMs', 0)),
        })

    # Dùng SequenceMatcher để căn chỉnh
    s_norm = [normalize_for_matching(w) for w in script_words]
    w_norm = [normalize_for_matching(wt['word']) for wt in whisper_words]

    matcher = difflib.SequenceMatcher(None, s_norm, w_norm)
    blocks = matcher.get_matching_blocks()

    # Ánh xạ từ script_words sang timestamps
    aligned_tokens = []
    w_idx = 0

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'equal':
            for si, wj in zip(range(i1, i2), range(j1, j2)):
                aligned_tokens.append({
                    'word': script_words[si], # Giữ nguyên chính tả chuẩn và chữ hoa/thường từ kịch bản gốc!
                    'startMs': whisper_words[wj]['startMs'],
                    'endMs': whisper_words[wj]['endMs'],
                })
        elif tag == 'replace':
            # Số lượng từ kịch bản và whisper có thể khác nhau nhẹ
            # Phân bổ khoảng thời gian của range j1..j2 cho range i1..i2
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
            # Từ có trong whisper nhưng không có trong kịch bản (tiếng ậm ừ hoặc lỗi) -> bỏ qua
            pass
        elif tag == 'delete':
            # Từ có trong kịch bản nhưng whisper bỏ sót -> gán theo mốc thời gian lân cận
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

        current_words.append(t)

        is_too_long = len(current_words) >= max_words
        is_gap_long = (i < len(tokens) - 1) and (tokens[i + 1]['startMs'] - t['endMs'] > 500)
        is_last = i == len(tokens) - 1

        if is_too_long or is_gap_long or is_last:
            phrase_end_ms = current_words[-1]['endMs']
            phrases.append({
                'startMs': phrase_start_ms,
                'endMs': phrase_end_ms + 250,
                'words': list(current_words)
            })
            current_words = []
            phrase_start_ms = None

    return phrases

def main():
    all_chapter_phrases = {}

    for sec in SECTIONS_DATA:
        sec_id = sec['id']
        raw_path = Path('src/data') / f'captions_raw_{sec_id}.json'
        with open(raw_path, 'r', encoding='utf-8') as f:
            raw_tokens = json.load(f)

        aligned_tokens = align_chapter(sec_id, sec['text'], raw_tokens)
        phrases = group_into_phrases(aligned_tokens, max_words=5)
        all_chapter_phrases[sec_id] = phrases
        print(f"Chapter {sec_id}: script tokens={len(sec['text'].split())}, whisper tokens={len(raw_tokens)}, aligned={len(aligned_tokens)}, phrases={len(phrases)}")

    out_ts = Path('src/data/usWarEconomyCaptions.ts')
    content = f"""// File phụ đề động word-by-word cho toàn bộ 7 chương USWarEconomyDocumentary
// Đã được chuẩn hóa 100% chính tả theo kịch bản gốc và loại bỏ dấu phẩy/chấm
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

export const US_WAR_ECONOMY_CAPTIONS: Record<string, CaptionPhrase[]> = {json.dumps(all_chapter_phrases, ensure_ascii=False, indent=2)};
"""
    with open(out_ts, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\n🎉 Đã cập nhật phụ đề chuẩn chính tả 100% tại: {out_ts}")

if __name__ == '__main__':
    main()
