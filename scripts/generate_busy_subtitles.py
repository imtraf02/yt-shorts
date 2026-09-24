import json
import re

with open('whisper_busy_captions.json', 'r', encoding='utf-8') as f:
    raw_tokens = json.load(f)

# Split the 2 compound tokens:
# 1. 'email.' around 31.6s -> 'y' and 'nguyên'
# 2. 'iPad' around 51.9s -> 'ai' and 'chết'
tokens = []
for i, t in enumerate(raw_tokens):
    text = t['text'].strip()
    if 'email' in text.lower() and 31000 <= t['startMs'] <= 32500:
        mid = int((t['startMs'] + t['endMs']) / 2)
        tokens.append({'text': 'y', 'startMs': t['startMs'], 'endMs': mid})
        tokens.append({'text': 'nguyên', 'startMs': mid, 'endMs': t['endMs']})
    elif 'ipad' in text.lower() and 51000 <= t['startMs'] <= 53000:
        mid = int((t['startMs'] + t['endMs']) / 2)
        tokens.append({'text': 'ai', 'startMs': t['startMs'], 'endMs': mid})
        tokens.append({'text': 'chết', 'startMs': mid, 'endMs': t['endMs']})
    else:
        tokens.append({'text': text, 'startMs': t['startMs'], 'endMs': t['endMs']})

print(f"Total tokens available: {len(tokens)}")

# Definition of phrases with Vietnamese text and highlight keywords
phrases_def = [
    # Scene 1: 0.00s - 5.40s
    {
        "text": "Bạn dọn bàn làm việc sạch bong,",
        "keywords": ["sạch bong", "dọn bàn"]
    },
    {
        "text": "sắp xếp lại email theo màu,",
        "keywords": ["theo màu"]
    },
    {
        "text": "trả lời 20 tin nhắn không quan trọng —",
        "keywords": ["20 tin nhắn", "không quan trọng"]
    },

    # Scene 2: 5.40s - 9.40s
    {
        "text": "tất cả trước khi động vào cái báo cáo quan trọng",
        "keywords": ["báo cáo quan trọng"]
    },
    {
        "text": "đang treo lơ lửng từ 3 ngày trước.",
        "keywords": ["treo lơ lửng", "3 ngày trước"]
    },

    # Scene 3: 9.40s - 12.20s
    {
        "text": "Chúc mừng, bạn vừa mắc hội chứng giả vờ bận rộn.",
        "keywords": ["hội chứng", "giả vờ bận rộn"]
    },

    # Scene 4: 12.20s - 18.50s
    {
        "text": "Đây là cách nó hoạt động:",
        "keywords": ["cách nó hoạt động"]
    },
    {
        "text": "não bạn cực kỳ giỏi phân biệt bận và hiệu quả —",
        "keywords": ["bận", "hiệu quả"]
    },
    {
        "text": "chỉ có điều nó cố tình lờ đi sự khác biệt đó,",
        "keywords": ["cố tình lờ đi"]
    },

    # Scene 5: 18.50s - 29.80s
    {
        "text": "vì cảm giác hoàn thành việc nhỏ",
        "keywords": ["việc nhỏ"]
    },
    {
        "text": "sướng hơn nhiều so với đối mặt việc lớn đáng sợ.",
        "keywords": ["sướng hơn nhiều", "việc lớn đáng sợ"]
    },
    {
        "text": "Dọn bàn xong, bạn có cảm giác",
        "keywords": ["Dọn bàn xong"]
    },
    {
        "text": "à mình vừa làm được gì đó —",
        "keywords": ["làm được gì đó"]
    },
    {
        "text": "não tiết ra một chút dopamine,",
        "keywords": ["dopamine"]
    },
    {
        "text": "y hệt như vừa hoàn thành việc thật sự.",
        "keywords": ["việc thật sự"]
    },

    # Scene 6: 29.80s - 34.60s
    {
        "text": "Vấn đề là báo cáo kia thì vẫn nằm y nguyên,",
        "keywords": ["vẫn nằm y nguyên"]
    },
    {
        "text": "còn deadline thì đang xích lại gần hơn từng phút.",
        "keywords": ["deadline", "gần hơn từng phút"]
    },

    # Scene 7: 34.60s - 43.80s
    {
        "text": "Đây mới là phần buồn cười:",
        "keywords": ["buồn cười"]
    },
    {
        "text": "càng nhiều việc nhỏ giả vờ bận rộn,",
        "keywords": ["giả vờ bận rộn"]
    },
    {
        "text": "bạn càng có lý do chính đáng để nói",
        "keywords": ["lý do chính đáng"]
    },
    {
        "text": "hôm nay mình bận lắm —",
        "keywords": ["bận lắm"]
    },
    {
        "text": "mà không ai, kể cả chính bạn, chất vấn được điều đó.",
        "keywords": ["chất vấn"]
    },

    # Scene 8: 43.80s - 48.50s
    {
        "text": "Bận rộn giả vờ là vỏ bọc hoàn hảo,",
        "keywords": ["vỏ bọc hoàn hảo"]
    },
    {
        "text": "vì nhìn từ ngoài, nó giống hệt bận rộn thật.",
        "keywords": ["giống hệt", "bận rộn thật"]
    },

    # Scene 9: 48.50s - 55.70s
    {
        "text": "Cách nhận diện:",
        "keywords": ["Cách nhận diện"]
    },
    {
        "text": "nếu việc bạn đang làm có thể bị hoãn vô thời hạn",
        "keywords": ["hoãn vô thời hạn"]
    },
    {
        "text": "mà chẳng ai chết vì nó —",
        "keywords": ["chẳng ai chết"]
    },
    {
        "text": "kiểu sắp xếp lại thư mục file lần thứ 5 trong tháng —",
        "keywords": ["lần thứ 5 trong tháng"]
    },

    # Scene 10: 55.70s - 59.70s
    {
        "text": "thì khả năng cao đó không phải công việc,",
        "keywords": ["không phải công việc"]
    },
    {
        "text": "đó là trốn việc mặc áo giáp công việc.",
        "keywords": ["trốn việc", "áo giáp công việc"]
    },

    # Scene 11: 59.70s - 70.80s
    {
        "text": "Cách thoát:",
        "keywords": ["Cách thoát"]
    },
    {
        "text": "trước khi làm bất cứ việc nhỏ nào,",
        "keywords": ["việc nhỏ nào"]
    },
    {
        "text": "tự hỏi một câu duy nhất —",
        "keywords": ["một câu duy nhất"]
    },
    {
        "text": "việc này có đang né việc quan trọng nhất trong ngày không?",
        "keywords": ["né việc quan trọng nhất"]
    },
    {
        "text": "Nếu câu trả lời là có, đóng hết tab,",
        "keywords": ["đóng hết tab"]
    },
    {
        "text": "quay lại việc lớn, dù nó đáng sợ đến mấy.",
        "keywords": ["quay lại việc lớn"]
    },

    # Scene 12: 70.80s - 74.50s
    {
        "text": "Bận rộn không phải thành tích.",
        "keywords": ["không phải thành tích"]
    },
    {
        "text": "Làm đúng việc quan trọng mới là thành tích.",
        "keywords": ["đúng việc quan trọng", "thành tích"]
    },
]

current_token_idx = 0
phrases_output = []

for p_idx, p_def in enumerate(phrases_def):
    clean_text = re.sub(r'[,.…!—:?\'"“”]', '', p_def["text"]).strip()
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
        next_start = phrase_tokens[k+1]['startMs']
        if phrase_tokens[k]['startMs'] >= next_start:
            phrase_tokens[k+1]['startMs'] = phrase_tokens[k]['startMs'] + 80
            next_start = phrase_tokens[k+1]['startMs']
        phrase_tokens[k]['endMs'] = next_start

    # Last token in phrase
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

# Adjust displayEndMs so captions don't flash off abruptly
for i in range(len(phrases_output)):
    curr = phrases_output[i]
    if i + 1 < len(phrases_output):
        next_start = phrases_output[i+1]["startMs"]
        gap = next_start - curr["endMs"]
        if gap > 0:
            curr["endMs"] = min(next_start - 30, curr["endMs"] + 350)
    else:
        curr["endMs"] = curr["endMs"] + 400

print(f"Processed {len(phrases_output)} phrases, used {current_token_idx} tokens.")

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

export const fakeBusySubtitles: SubtitlePhrase[] = """ + json.dumps(phrases_output, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/fakeBusySubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Successfully wrote src/data/fakeBusySubtitles.ts!")
