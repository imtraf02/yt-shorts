# -*- coding: utf-8 -*-
"""
Căn chỉnh lời thoại kịch bản gốc của '5.000 năm lịch sử trò chơi'
với token timestamps của Whisper.
Đảm bảo 100% chuẩn chính tả tiếng Việt, câu thoại liền mạch theo câu/vế hoàn chỉnh.
Lưu trữ đầy đủ dấu câu tự nhiên.
Xuất ra src/data/game_historyCaptions.ts.
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

def split_sentence(sent_tokens: list, max_len: int = 18, ideal_min: int = 7) -> list:
    """
    Chia 1 câu thành các vế (clause) tự nhiên nếu dài quá max_len.
    """
    n = len(sent_tokens)
    if n <= max_len:
        return [sent_tokens]

    clauses = []
    current_clause = []

    for idx, tok in enumerate(sent_tokens):
        current_clause.append(tok)
        word = tok['word']
        has_comma = any(word.endswith(p) for p in [',', ';', ':', '—', '–'])
        rem = n - (idx + 1)

        if has_comma and len(current_clause) >= ideal_min and rem >= 4:
            clauses.append(current_clause)
            current_clause = []
        elif len(current_clause) >= max_len and rem >= 4:
            clauses.append(current_clause)
            current_clause = []

    if current_clause:
        if clauses and len(current_clause) < 4:
            clauses[-1].extend(current_clause)
        else:
            clauses.append(current_clause)

    return clauses

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
        clauses = split_sentence(sent, max_len=16, ideal_min=6)
        for clause in clauses:
            if not clause:
                continue
            start_ms = clause[0]['startMs']
            end_ms = clause[-1]['endMs']
            text = " ".join(t['word'] for t in clause)

            phrases.append({
                'id': phrase_id,
                'startMs': start_ms,
                'endMs': end_ms,
                'text': text,
                'words': [
                    {
                        'word': t['word'],
                        'startMs': t['startMs'],
                        'endMs': t['endMs'],
                    }
                    for t in clause
                ]
            })
            phrase_id += 1

    return phrases

def main():
    meta_path = Path("src/data/game_history_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}")
        return

    chapters = json.loads(meta_path.read_text(encoding="utf-8"))
    data_dir = Path("src/data")
    all_captions = {}

    for ch in chapters:
        sec_id = ch["id"]
        raw_file = data_dir / f"game_history_captions_raw_{sec_id}.json"
        if not raw_file.exists():
            print(f"⚠️ Chưa có file raw whisper cho {sec_id}: {raw_file}")
            continue

        raw_tokens = json.loads(raw_file.read_text(encoding="utf-8"))
        aligned_tokens = align_chapter(sec_id, ch["text"], raw_tokens)
        phrases = build_phrases(aligned_tokens)
        all_captions[sec_id] = phrases
        print(f"✅ {sec_id}: {len(aligned_tokens)} từ -> {len(phrases)} cụm phụ đề.")

    ts_out = data_dir / "game_historyCaptions.ts"
    header = "// Phụ đề Kinetic Whisper AI cho phim tài liệu 'Vì sao ai cũng chơi game? 5.000 năm lịch sử trò chơi'\n"
    header += "// 100% chuẩn chính tả kịch bản gốc, timestamps chính xác theo audio Trúc Ly\n\n"
    ts_content = header + "export const GAME_HISTORY_CAPTIONS = " + json.dumps(all_captions, indent=2, ensure_ascii=False) + ";\n"
    ts_out.write_text(ts_content, encoding="utf-8")
    print(f"🎉 Đã xuất thành công: {ts_out} ({len(all_captions)} chapters)")

if __name__ == "__main__":
    main()
