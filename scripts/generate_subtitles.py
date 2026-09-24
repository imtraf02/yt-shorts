import json
import re

with open('whisper_captions.json', 'r', encoding='utf-8') as f:
    raw_tokens = json.load(f)

# Merge token 180 ('bơ') and 181 ('nào.') into 'burnout'
tokens = []
i = 0
while i < len(raw_tokens):
    if i == 180 and raw_tokens[i]['text'].strip() == 'bơ' and raw_tokens[i+1]['text'].strip() == 'nào.':
        tokens.append({
            'text': 'burnout',
            'startMs': raw_tokens[i]['startMs'],
            'endMs': raw_tokens[i+1]['endMs']
        })
        i += 2
    else:
        tokens.append({
            'text': raw_tokens[i]['text'].strip(),
            'startMs': raw_tokens[i]['startMs'],
            'endMs': raw_tokens[i]['endMs']
        })
        i += 1

# Definition of phrases with ground-truth Vietnamese text and keywords
phrases_def = [
    # Scene 1: Hook (0s - 7.64s)
    {
        "text": "Bạn để deadline tới sát nút mới làm,",
        "keywords": ["deadline", "sát nút"]
    },
    {
        "text": "xong sản phẩm lại ngon hơn hẳn?",
        "keywords": ["ngon hơn hẳn"]
    },
    {
        "text": "Không phải bạn thiên tài đâu —",
        "keywords": ["thiên tài"]
    },
    {
        "text": "não bạn đang chơi một trò rất bẩn với chính bạn thôi.",
        "keywords": ["trò rất bẩn"]
    },

    # Scene 2: Cortisol & bị hổ đuổi (7.64s - 17.88s)
    {
        "text": "Thủ phạm là cortisol.",
        "keywords": ["cortisol"]
    },
    {
        "text": "Khi deadline cận kề,",
        "keywords": ["deadline cận kề"]
    },
    {
        "text": "cơ thể coi đó như đang bị hổ đuổi —",
        "keywords": ["bị hổ đuổi"]
    },
    {
        "text": "và bị hổ đuổi thì não không có thời gian",
        "keywords": ["hổ đuổi"]
    },
    {
        "text": "lăn tăn chỉnh sửa 5 lần nữa,",
        "keywords": ["chỉnh sửa"]
    },
    {
        "text": "nó chỉ chạy thôi.",
        "keywords": ["chỉ chạy thôi"]
    },

    # Scene 3: 100 cách bắt đầu & tê liệt (17.88s - 23.60s)
    {
        "text": "Thứ hai, deadline cắt bớt lựa chọn.",
        "keywords": ["cắt bớt lựa chọn"]
    },
    {
        "text": "Lúc rảnh bạn có 100 cách bắt đầu,",
        "keywords": ["100 cách"]
    },
    {
        "text": "đứng chôn chân cả tiếng để chọn.",
        "keywords": ["chôn chân cả tiếng"]
    },

    # Scene 4: Còn 2 tiếng & 1 cách duy nhất (23.60s - 27.15s)
    {
        "text": "Còn 2 tiếng nữa hết giờ",
        "keywords": ["2 tiếng"]
    },
    {
        "text": "thì chỉ còn đúng 1 cách khả thi —",
        "keywords": ["1 cách khả thi"]
    },
    {
        "text": "cách nhanh nhất.",
        "keywords": ["nhanh nhất"]
    },

    # Scene 5: Cú lừa so sánh khập khiễng (27.15s - 37.64s)
    {
        "text": "Và đây mới là cú lừa thật:",
        "keywords": ["cú lừa thật"]
    },
    {
        "text": "bạn không làm tốt hơn vào phút chót.",
        "keywords": ["phút chót"]
    },
    {
        "text": "Bạn chỉ đang so bản tập trung 100%",
        "keywords": ["tập trung 100%"]
    },
    {
        "text": "với bản làm sớm",
        "keywords": ["làm sớm"]
    },
    {
        "text": "mà thật ra vừa làm vừa lướt điện thoại,",
        "keywords": ["lướt điện thoại"]
    },
    {
        "text": "đứng dậy pha trà 5 lần.",
        "keywords": ["pha trà 5 lần"]
    },

    # Scene 6: Cortisol & Burnout (37.64s - 45.60s)
    {
        "text": "Deadline không làm bạn giỏi hơn,",
        "keywords": ["không giỏi hơn"]
    },
    {
        "text": "nó chỉ làm bạn ngừng tự phá mình.",
        "keywords": ["ngừng tự phá mình"]
    },
    {
        "text": "Nhưng cortisol không miễn phí đâu —",
        "keywords": ["không miễn phí"]
    },
    {
        "text": "dùng liên tục là cách nhanh nhất để burnout.",
        "keywords": ["burnout"]
    },

    # Scene 7: Giải pháp - Deadline giả 25 phút (45.60s - 57.88s)
    {
        "text": "Muốn có cảm giác tập trung đó",
        "keywords": ["tập trung"]
    },
    {
        "text": "mà không cần đợi sát nút?",
        "keywords": ["sát nút"]
    },
    {
        "text": "Tự tạo deadline giả,",
        "keywords": ["deadline giả"]
    },
    {
        "text": "và tự cắt bớt lựa chọn của mình",
        "keywords": ["cắt bớt lựa chọn"]
    },
    {
        "text": "y như deadline thật đang làm.",
        "keywords": ["deadline thật"]
    },
    {
        "text": "Hẹn giờ 25 phút,",
        "keywords": ["25 phút"]
    },
    {
        "text": "chọn đúng 1 cách để bắt đầu,",
        "keywords": ["1 cách"]
    },
    {
        "text": "không cho phép đổi ý.",
        "keywords": ["không đổi ý"]
    },

    # Scene 8: Kết luận - Không cần hổ thật (57.88s - 62.76s)
    {
        "text": "Não bạn không cần một con hổ thật",
        "keywords": ["hổ thật"]
    },
    {
        "text": "để chạy nhanh.",
        "keywords": ["chạy nhanh"]
    },
    {
        "text": "Nó chỉ cần tin là có hổ thôi.",
        "keywords": ["tin là có hổ"]
    },
]

current_token_idx = 0
phrases_output = []

for p_idx, p_def in enumerate(phrases_def):
    clean_text = re.sub(r'[,.…!—:?"]', '', p_def["text"]).strip()
    words = clean_text.split()
    phrase_tokens = []
    
    for w in words:
        tok = tokens[current_token_idx]
        start_ms = tok['startMs']
        end_ms = tok['endMs']
        phrase_tokens.append({
            "text": w,
            "startMs": start_ms,
            "endMs": end_ms
        })
        current_token_idx += 1
        
    # Ensure sequential non-overlapping coverage:
    for k in range(len(phrase_tokens) - 1):
        # Next token start
        next_start = phrase_tokens[k+1]['startMs']
        # Ensure k's startMs is strictly before next_start
        if phrase_tokens[k]['startMs'] >= next_start:
            phrase_tokens[k+1]['startMs'] = phrase_tokens[k]['startMs'] + 80
            next_start = phrase_tokens[k+1]['startMs']
        # EndMs of token k is exactly next_start
        phrase_tokens[k]['endMs'] = next_start

    # For the last token:
    last_tok = phrase_tokens[-1]
    if last_tok['endMs'] <= last_tok['startMs']:
        last_tok['endMs'] = last_tok['startMs'] + 220
    elif last_tok['endMs'] - last_tok['startMs'] < 120:
        last_tok['endMs'] = last_tok['startMs'] + 180

    phrase_start_ms = phrase_tokens[0]["startMs"]
    last_token_end_ms = phrase_tokens[-1]["endMs"]
    
    phrases_output.append({
        "id": p_idx + 1,
        "startMs": phrase_start_ms,
        "endMs": last_token_end_ms,
        "text": clean_text,
        "tokens": phrase_tokens,
        "highlightKeywords": p_def["keywords"]
    })

# Adjust phrase endMs (displayEndMs) so caption stays on screen until next phrase starts
for i in range(len(phrases_output)):
    curr = phrases_output[i]
    if i + 1 < len(phrases_output):
        next_start = phrases_output[i+1]["startMs"]
        gap = next_start - curr["endMs"]
        if gap > 0:
            # Leave caption up until just before next phrase begins, max 350ms extension
            curr["endMs"] = min(next_start - 30, curr["endMs"] + 350)
    else:
        curr["endMs"] = curr["endMs"] + 400

print(f"Processed {len(phrases_output)} phrases, used {current_token_idx} tokens.")

# Generate TypeScript code
ts_code = """export type SubtitleToken = {
  text: string;
  startMs: number;
  endMs: number;
};

export type SubtitlePhrase = {
  id: number;
  startMs: number;
  endMs: number;
  text: string;
  tokens: SubtitleToken[];
  highlightKeywords?: string[];
};

export const deadlineCortisolSubtitles: SubtitlePhrase[] = """ + json.dumps(phrases_output, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/deadlineCortisolSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Successfully wrote src/data/deadlineCortisolSubtitles.ts with perfect token chain!")
