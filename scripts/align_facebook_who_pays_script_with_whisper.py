# -*- coding: utf-8 -*-
"""
Căn chỉnh lời thoại gốc trong kịch bản 'Facebook không thu tiền bạn. Vậy ai đang trả tiền?'
với token timestamps của Whisper.
Đảm bảo 100% chuẩn chính tả tiếng Việt, câu thoại liền mạch theo câu/vế hoàn chỉnh.
Lưu trữ đầy đủ dấu câu tự nhiên (. , ? ! : ; “ ”).
Xuất ra src/data/facebookWhoPaysCaptions.ts.
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
    Chia 1 câu thành các vế (clause) tự nhiên.
    """
    n = len(sent_tokens)
    if n <= max_len:
        return [sent_tokens]

    best_split = None
    best_score = -999999

    for i in range(ideal_min, n - ideal_min + 1):
        prev_w = sent_tokens[i - 1]['word']
        curr_w = sent_tokens[i]['word'].lower()
        pause_gap = sent_tokens[i]['startMs'] - sent_tokens[i - 1]['endMs']

        score = 0
        if prev_w.endswith(','):
            score += 100
        elif prev_w.endswith(':'):
            score += 90
        elif prev_w.endswith(';') or prev_w.endswith('—'):
            score += 80

        if curr_w in ['và', 'nhưng', 'mà', 'vì', 'cho', 'để', 'thì', 'nếu', 'khi', 'hoặc', 'tuy']:
            score += 40

        if pause_gap >= 250:
            score += min(50, int(pause_gap / 10))

        balance_penalty = abs(i - (n // 2)) * 3
        score -= balance_penalty

        if score > best_score:
            best_score = score
            best_split = i

    if best_split is None or best_score < 0:
        best_split = n // 2

    left = split_sentence(sent_tokens[:best_split], max_len, ideal_min)
    right = split_sentence(sent_tokens[best_split:], max_len, ideal_min)
    return left + right

def build_phrases_from_tokens(aligned_tokens: list) -> list:
    """
    Nhóm danh sách các từ đã gán timestamp thành các cụm phụ đề (phrases) hoàn chỉnh.
    """
    sentences = []
    curr_sent = []

    for tok in aligned_tokens:
        curr_sent.append(tok)
        w = tok['word']
        if re.search(r'[.!?…]+[\"”\']?$', w):
            sentences.append(curr_sent)
            curr_sent = []

    if curr_sent:
        sentences.append(curr_sent)

    phrases = []
    for sent in sentences:
        if not sent:
            continue
        sub_chunks = split_sentence(sent, max_len=18, ideal_min=7)
        for chunk in sub_chunks:
            if not chunk:
                continue
            phrases.append({
                'startMs': chunk[0]['startMs'],
                'endMs': chunk[-1]['endMs'],
                'words': chunk
            })

    return phrases

def main():
    meta_path = Path("src/data/facebook_who_pays_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}")
        return

    chapters = json.loads(meta_path.read_text(encoding="utf-8"))
    all_captions = {}
    total_phrases = 0
    total_words = 0

    for ch in chapters:
        sec_id = ch["id"]
        raw_path = Path(f"src/data/facebook_who_pays_captions_raw_{sec_id}.json")
        if not raw_path.exists():
            print(f"⚠️ Chưa có {raw_path}, bỏ qua {sec_id}")
            continue

        raw_tokens = json.loads(raw_path.read_text(encoding="utf-8"))
        aligned = align_chapter(sec_id, ch["text"], raw_tokens)
        phrases = build_phrases_from_tokens(aligned)
        all_captions[sec_id] = phrases

        total_phrases += len(phrases)
        total_words += sum(len(p['words']) for p in phrases)
        print(f"✅ {sec_id:8}: {len(aligned):4} từ -> {len(phrases):3} cụm phụ đề")

    out_ts = Path("src/data/facebookWhoPaysCaptions.ts")
    ts_content = """// Phụ đề tự động khớp 100% kịch bản gốc và timestamp từ Whisper cho Facebook Ai Trả Tiền
export interface CaptionWord {
  word: string;
  startMs: number;
  endMs: number;
}

export interface CaptionPhrase {
  startMs: number;
  endMs: number;
  words: CaptionWord[];
}

export const FACEBOOK_WHO_PAYS_CAPTIONS: Record<string, CaptionPhrase[]> = """ + json.dumps(all_captions, ensure_ascii=False, indent=2) + ";\n"

    out_ts.write_text(ts_content, encoding="utf-8")
    print(f"\n🎉 Đã lưu toàn bộ phụ đề vào {out_ts}")
    print(f"📊 Tổng số cụm: {total_phrases} | Tổng số từ: {total_words}")

if __name__ == "__main__":
    main()
