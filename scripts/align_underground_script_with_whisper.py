# -*- coding: utf-8 -*-
"""
Căn chỉnh lời thoại kịch bản gốc của 'Cuộc Sống Bí Mật Dưới Lòng Đất: Mạng Lưới Nấm'
với token timestamps của Whisper.
Đảm bảo 100% chuẩn chính tả tiếng Việt, câu thoại liền mạch theo câu/vế hoàn chỉnh.
Lưu trữ đầy đủ dấu câu tự nhiên.
Xuất ra src/data/undergroundCaptions.ts.
"""

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

def align_chapter(section_id: str, script_text: str, raw_tokens: list) -> list:
    """
    Căn chỉnh từng từ kịch bản gốc (giữ nguyên chính tả và dấu câu) với timestamps từ Whisper.
    """
    raw_script_tokens = script_text.split()
    script_words = []
    for st in raw_script_tokens:
        clean = st.strip()
        if clean in ['—', '–', '-']:
            continue
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

def split_sentence(sent_tokens: list, max_len: int = 16, ideal_min: int = 5) -> list:
    """
    Chia 1 câu thành các vế (clause) tự nhiên nếu dài quá max_len.
    """
    n = len(sent_tokens)
    if n <= max_len:
        return [sent_tokens]

    break_indices = []
    for idx, tok in enumerate(sent_tokens[:-1]):
        word = tok['word']
        if any(word.endswith(p) for p in [',', ';', ':']):
            break_indices.append(idx + 1)
        elif word.lower() in ['và', 'nhưng', 'khi', 'nếu', 'để', 'vì', 'rồi', 'mà', 'hoặc'] and idx >= 4:
            break_indices.append(idx)

    clauses = []
    last_idx = 0
    for b in break_indices:
        if b - last_idx >= ideal_min and n - b >= ideal_min:
            clauses.append(sent_tokens[last_idx:b])
            last_idx = b

    if last_idx < n:
        clauses.append(sent_tokens[last_idx:])

    if not clauses:
        return [sent_tokens]

    merged = []
    for c in clauses:
        if len(c) > max_len:
            mid = len(c) // 2
            merged.append(c[:mid])
            merged.append(c[mid:])
        else:
            merged.append(c)

    return merged

def build_phrases(aligned_tokens: list) -> list:
    """
    Nhóm aligned tokens thành các câu / cụm từ tự nhiên.
    """
    sentences = []
    current_sent = []

    for tok in aligned_tokens:
        current_sent.append(tok)
        word = tok['word']
        if any(word.endswith(p) for p in ['.', '!', '?', '…']):
            sentences.append(current_sent)
            current_sent = []

    if current_sent:
        sentences.append(current_sent)

    phrases = []
    phrase_id = 0

    for sent in sentences:
        clauses = split_sentence(sent, max_len=16, ideal_min=5)
        for clause in clauses:
            if not clause:
                continue
            start_ms = clause[0]['startMs']
            end_ms = clause[-1]['endMs']
            text = " ".join(t['word'] for t in clause)

            phrases.append({
                'startMs': start_ms,
                'endMs': end_ms,
                'words': [
                    {
                        'word': t['word'],
                        'startMs': t['startMs'],
                        'endMs': t['endMs'],
                    }
                    for t in clause
                ]
            })

    return phrases

def main():
    meta_path = Path("src/data/underground_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}")
        return

    chapters = json.loads(meta_path.read_text(encoding="utf-8"))
    captions_by_chapter = {}

    for ch in chapters:
        sec_id = ch["id"]
        raw_json_path = Path(f"src/data/underground_captions_raw_{sec_id}.json")

        if not raw_json_path.exists():
            print(f"⚠️ Chưa có raw tokens cho {sec_id}: {raw_json_path}. Bỏ qua.")
            continue

        raw_tokens = json.loads(raw_json_path.read_text(encoding="utf-8"))
        aligned_tokens = align_chapter(sec_id, ch["script"], raw_tokens)
        phrases = build_phrases(aligned_tokens)
        captions_by_chapter[sec_id] = phrases
        print(f"✅ {sec_id}: {len(aligned_tokens)} từ -> {len(phrases)} cụm phụ đề")

    # Xuất ra file TypeScript
    out_ts = Path("src/data/undergroundCaptions.ts")
    ts_code = []
    ts_code.append('// Auto-generated by align_underground_script_with_whisper.py')
    ts_code.append('import type { CaptionPhrase } from "./historyGapsCaptions";\n')
    ts_code.append('export const UNDERGROUND_CAPTIONS: Record<string, CaptionPhrase[]> = {')

    for sec_id, phrases in captions_by_chapter.items():
        ts_code.append(f'  "{sec_id}": {json.dumps(phrases, ensure_ascii=False, indent=4)},')

    ts_code.append('};\n')
    out_ts.write_text("\n".join(ts_code), encoding="utf-8")
    print(f"🎉 Đã ghi thành công toàn bộ phụ đề vào {out_ts}!")

if __name__ == "__main__":
    main()
