# -*- coding: utf-8 -*-
"""
Căn chỉnh lời thoại gốc trong kịch bản Những Khoảng Trống Lịch Sử với token timestamps của Whisper.
Đảm bảo 100% chuẩn chính tả tiếng Việt, câu thoại liền mạch theo câu/vế hoàn chỉnh (không tách vụn vặt 5 từ).
Lưu trữ đầy đủ dấu câu tự nhiên (. , ? ! : ; “ ”).
Xuất ra src/data/historyGapsCaptions.ts.
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

def split_sentence(sent_tokens: list, max_len: int = 20, ideal_min: int = 8) -> list:
    """
    Chia 1 câu thành các vế (clause) tự nhiên bằng Dynamic Programming.
    - Nếu câu <= max_len từ: giữ nguyên cả câu làm 1 cụm phụ đề.
    - Nếu câu > max_len từ: tìm vị trí ngắt tự nhiên nhất tại dấu hai chấm, dấu phẩy, từ nối, hoặc khoảng nghỉ.
    """
    n = len(sent_tokens)
    if n <= max_len:
        return [sent_tokens]

    CONJUNCTIONS = {'và', 'nhưng', 'mà', 'để', 'khi', 'vì', 'thì', 'rồi', 'hoặc', 'tuy'}

    candidate_scores = {}
    for i in range(n - 1):
        t = sent_tokens[i]
        next_t = sent_tokens[i + 1]
        w = t['word'].strip()
        gap = next_t['startMs'] - t['endMs']

        score = 0
        if re.search(r'[:;]+$', w):
            score = 100
        elif re.search(r'[,—–]+$', w):
            score = 80
        elif gap >= 350:
            score = 50
        elif next_t['word'].lower() in CONJUNCTIONS:
            score = 40

        if score > 0:
            candidate_scores[i + 1] = score

    dp = {0: (0, -1)}
    for i in range(1, n + 1):
        best_cost = float('inf')
        best_prev = -1
        for j in range(max(0, i - max_len), i):
            if j not in dp:
                continue
            seg_len = i - j
            prev_cost = dp[j][0]

            len_penalty = (seg_len - 14) ** 2
            if seg_len < 6:
                len_penalty += 300
            elif seg_len < 8:
                len_penalty += 100
            elif seg_len > max_len:
                len_penalty += 2000

            cut_bonus = 0
            if i < n:
                cut_score = candidate_scores.get(i, 0)
                if cut_score == 0:
                    cut_bonus = 500
                else:
                    cut_bonus = -cut_score * 4

            total_c = prev_cost + len_penalty + cut_bonus
            if total_c < best_cost:
                best_cost = total_c
                best_prev = j

        dp[i] = (best_cost, best_prev)

    cuts = []
    curr = n
    while curr > 0:
        prev = dp[curr][1]
        if prev > 0:
            cuts.append(prev)
        curr = prev
    cuts.reverse()

    chunks = []
    start = 0
    for c in cuts:
        chunks.append(sent_tokens[start:c])
        start = c
    chunks.append(sent_tokens[start:n])

    return chunks

def group_into_sentence_phrases(tokens: list) -> list:
    """
    Gom phụ đề theo từng câu hoàn chỉnh hoặc vế câu tự nhiên.
    Giữ thời gian hiển thị mượt mà trên khung hình.
    """
    # 1. Tách các câu hoàn chỉnh dựa trên dấu kết thúc (. ? ! …)
    sentences = []
    current_sent = []
    for t in tokens:
        current_sent.append(t)
        w = t['word'].strip()
        if re.search(r'[.?!…]+["\'”’]?$', w):
            sentences.append(current_sent)
            current_sent = []
    if current_sent:
        sentences.append(current_sent)

    # 2. Phân chia các câu dài thành các vế câu tự nhiên
    all_clauses = []
    for s in sentences:
        clauses = split_sentence(s, max_len=20, ideal_min=8)
        all_clauses.extend(clauses)

    # 3. Tính toán startMs và endMs hiển thị cho từng cụm phụ đề
    phrases = []
    for i, cl in enumerate(all_clauses):
        p_start = cl[0]['startMs']
        p_last_end = cl[-1]['endMs']

        next_cl = all_clauses[i + 1] if i + 1 < len(all_clauses) else None
        if next_cl:
            next_start = next_cl[0]['startMs']
            if next_start > p_last_end + 100:
                p_end = min(next_start - 50, p_last_end + 350)
            else:
                p_end = max(p_last_end, next_start)
        else:
            p_end = p_last_end + 500

        phrases.append({
            'startMs': p_start,
            'endMs': max(p_end, p_start + 600),
            'words': cl,
        })

    return phrases

def main():
    meta_path = Path("src/data/history_gaps_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}")
        return

    chapters = json.loads(meta_path.read_text(encoding='utf-8'))
    captions_by_chapter = {}

    for ch in chapters:
        sec_id = ch['id']
        raw_file = Path(f"src/data/history_gaps_captions_raw_{sec_id}.json")
        if not raw_file.exists():
            print(f"⚠️ Chưa có file raw cho {sec_id}: {raw_file}")
            continue

        raw_tokens = json.loads(raw_file.read_text(encoding='utf-8'))
        aligned_tokens = align_chapter(sec_id, ch['text'], raw_tokens)
        phrases = group_into_sentence_phrases(aligned_tokens)
        captions_by_chapter[sec_id] = phrases
        
        lens = [len(p['words']) for p in phrases]
        avg_l = sum(lens) / len(lens) if lens else 0
        print(f"✅ {sec_id}: {ch['word_count']} từ kịch bản -> {len(aligned_tokens)} từ căn chỉnh -> {len(phrases)} câu/vế phụ đề (Trung bình {avg_l:.1f} từ/cụm, dải {min(lens)}-{max(lens)} từ).")

    out_ts = Path("src/data/historyGapsCaptions.ts")
    ts_code = f"""// Phụ đề động cho 7 chương HistoryGapsDocumentary (câu/vế hoàn chỉnh, chính tả chuẩn tiếng Việt)
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

export const HISTORY_GAPS_CAPTIONS: Record<string, CaptionPhrase[]> = {json.dumps(captions_by_chapter, indent=2, ensure_ascii=False)};
"""
    out_ts.write_text(ts_code, encoding='utf-8')
    print(f"\n🎉 Đã xuất thành công historyGapsCaptions.ts tại: {out_ts}")

if __name__ == "__main__":
    main()
