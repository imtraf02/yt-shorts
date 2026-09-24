import json
import re

with open('whisper_zeigarnik_captions.json', 'r', encoding='utf-8') as f:
    raw_tokens = json.load(f)

# Merge:
# 1. 'dì' + 'gà' + 'ních' -> 'Zeigarnik'
# 2. 'đô' + 'bà' + 'mình' -> 'dopamine'
# 3. 'mai' + 'trên' -> 'mai'
# 4. 'lát' + 'trên' -> 'lát'
tokens = []
i = 0
while i < len(raw_tokens):
    t = raw_tokens[i]
    text = t['text'].strip()
    
    # Check for Zeigarnik (dì gà ních)
    if text.lower() == 'dì' and i + 2 < len(raw_tokens) and 'ních' in raw_tokens[i+2]['text'].lower():
        tokens.append({
            'text': 'Zeigarnik',
            'startMs': raw_tokens[i]['startMs'],
            'endMs': raw_tokens[i+2]['endMs']
        })
        i += 3
    # Check for dopamine (đô bà mình)
    elif text.lower() == 'đô' and i + 2 < len(raw_tokens) and 'mình' in raw_tokens[i+2]['text'].lower():
        tokens.append({
            'text': 'dopamine',
            'startMs': raw_tokens[i]['startMs'],
            'endMs': raw_tokens[i+2]['endMs']
        })
        i += 3
    # Check for 'mai' + 'trên' around 58.3s
    elif text.lower() == 'mai' and i + 1 < len(raw_tokens) and raw_tokens[i+1]['text'].strip().lower() == 'trên' and 57000 <= t['startMs'] <= 59000:
        tokens.append({
            'text': 'mai',
            'startMs': raw_tokens[i]['startMs'],
            'endMs': raw_tokens[i+1]['endMs']
        })
        i += 2
    # Check for 'lát' + 'trên' around 58.7s
    elif text.lower() == 'lát' and i + 1 < len(raw_tokens) and raw_tokens[i+1]['text'].strip().lower() == 'trên' and 57000 <= t['startMs'] <= 59500:
        tokens.append({
            'text': 'lát',
            'startMs': raw_tokens[i]['startMs'],
            'endMs': raw_tokens[i+1]['endMs']
        })
        i += 2
    else:
        tokens.append({
            'text': text,
            'startMs': t['startMs'],
            'endMs': t['endMs']
        })
        i += 1

print(f"Tokens after merges: {len(tokens)}")

scenes_def = [
    # Scene 1: 01-message-friend-at-night.png
    {
        "scene": 1,
        "image": "images/talking-is-not-doing/01-message-friend-at-night.png",
        "phrases": [
            {
                "text": "Bạn nhắn cho bạn thân:",
                "keywords": ["nhắn cho bạn thân"]
            },
            {
                "text": "Mai tao gọi cho mày để bàn chuyện đó nha.",
                "keywords": ["Mai tao gọi", "bàn chuyện đó"]
            }
        ]
    },

    # Scene 2: 02-relief-after-sending.png
    {
        "scene": 2,
        "image": "images/talking-is-not-doing/02-relief-after-sending.png",
        "phrases": [
            {
                "text": "Gửi xong, bạn tắt điện thoại,",
                "keywords": ["tắt điện thoại"]
            },
            {
                "text": "thấy nhẹ hẳn người —",
                "keywords": ["nhẹ hẳn người"]
            },
            {
                "text": "như thể chuyện đó đã được giải quyết.",
                "keywords": ["đã được giải quyết"]
            }
        ]
    },

    # Scene 3: 03-task-still-untouched.png
    {
        "scene": 3,
        "image": "images/talking-is-not-doing/03-task-still-untouched.png",
        "phrases": [
            {
                "text": "Nhưng ngày mai chưa tới,",
                "keywords": ["chưa tới"]
            },
            {
                "text": "cuộc gọi chưa xảy ra,",
                "keywords": ["chưa xảy ra"]
            },
            {
                "text": "chuyện vẫn y nguyên như cũ.",
                "keywords": ["vẫn y nguyên"]
            },
            {
                "text": "Đó là hiệu ứng Zeigarnik ngược.",
                "keywords": ["Zeigarnik ngược"]
            }
        ]
    },

    # Scene 4: 04-unfinished-task-brain.png
    {
        "scene": 4,
        "image": "images/talking-is-not-doing/04-unfinished-task-brain.png",
        "phrases": [
            {
                "text": "Cơ chế của nó thế này:",
                "keywords": ["Cơ chế"]
            },
            {
                "text": "bình thường não bạn cực kỳ khó chịu",
                "keywords": ["cực kỳ khó chịu"]
            },
            {
                "text": "với việc dang dở —",
                "keywords": ["việc dang dở"]
            },
            {
                "text": "đó là lý do bạn cứ nhớ mãi",
                "keywords": ["nhớ mãi"]
            },
            {
                "text": "một tin nhắn chưa trả lời,",
                "keywords": ["tin nhắn chưa trả lời"]
            },
            {
                "text": "một bộ phim xem dở giữa chừng.",
                "keywords": ["xem dở giữa chừng"]
            }
        ]
    },

    # Scene 5: 05-saying-feels-like-doing.png
    {
        "scene": 5,
        "image": "images/talking-is-not-doing/05-saying-feels-like-doing.png",
        "phrases": [
            {
                "text": "Nhưng có một lỗ hổng:",
                "keywords": ["lỗ hổng"]
            },
            {
                "text": "chỉ cần bạn nói ra hoặc hẹn sẽ làm —",
                "keywords": ["nói ra", "hẹn sẽ làm"]
            },
            {
                "text": "dù chỉ là một câu nhắn tin —",
                "keywords": ["câu nhắn tin"]
            },
            {
                "text": "não bạn đã coi như tín hiệu đã xử lý",
                "keywords": ["tín hiệu đã xử lý"]
            },
            {
                "text": "được gửi đi, dù thực tế chưa làm gì cả.",
                "keywords": ["chưa làm gì cả"]
            }
        ]
    },

    # Scene 6: 06-dopamine-cannot-tell.png
    {
        "scene": 6,
        "image": "images/talking-is-not-doing/06-dopamine-cannot-tell.png",
        "phrases": [
            {
                "text": "Phần nguy hiểm là",
                "keywords": ["nguy hiểm"]
            },
            {
                "text": "dopamine không phân biệt được",
                "keywords": ["dopamine không phân biệt"]
            },
            {
                "text": "hẹn làm với đã làm.",
                "keywords": ["hẹn làm", "đã làm"]
            },
            {
                "text": "Cả hai đều cho bạn cảm giác nhẹ nhõm y hệt nhau.",
                "keywords": ["nhẹ nhõm y hệt"]
            }
        ]
    },

    # Scene 7: 07-postpone-all-day.png
    {
        "scene": 7,
        "image": "images/talking-is-not-doing/07-postpone-all-day.png",
        "phrases": [
            {
                "text": "Thế nên bạn có thể hẹn",
                "keywords": ["hẹn"]
            },
            {
                "text": "để tuần sau, để mai tính, lát nữa làm",
                "keywords": ["để mai tính", "lát nữa làm"]
            },
            {
                "text": "cả chục lần một ngày,",
                "keywords": ["cả chục lần"]
            },
            {
                "text": "cảm thấy mình đã kiểm soát được mọi thứ —",
                "keywords": ["kiểm soát mọi thứ"]
            },
            {
                "text": "trong khi chẳng có việc nào thực sự nhúc nhích.",
                "keywords": ["không nhúc nhích"]
            }
        ]
    },

    # Scene 8: 08-trustworthy-appearance.png
    {
        "scene": 8,
        "image": "images/talking-is-not-doing/08-trustworthy-appearance.png",
        "phrases": [
            {
                "text": "Điều buồn cười là:",
                "keywords": ["buồn cười"]
            },
            {
                "text": "một câu hẹn nghe rất có trách nhiệm —",
                "keywords": ["có trách nhiệm"]
            },
            {
                "text": "tao sẽ, để tao, mai tao —",
                "keywords": ["tao sẽ", "mai tao"]
            },
            {
                "text": "nên bạn còn được người khác tin",
                "keywords": ["được tin"]
            },
            {
                "text": "là người chu đáo, đáng tin cậy.",
                "keywords": ["chu đáo", "đáng tin cậy"]
            }
        ]
    },

    # Scene 9: 09-buying-time-hourglass.png
    {
        "scene": 9,
        "image": "images/talking-is-not-doing/09-buying-time-hourglass.png",
        "phrases": [
            {
                "text": "Trong khi thực chất,",
                "keywords": ["thực chất"]
            },
            {
                "text": "câu nói đó chỉ đang mua thời gian",
                "keywords": ["mua thời gian"]
            },
            {
                "text": "để trì hoãn thêm một nhịp nữa.",
                "keywords": ["trì hoãn thêm"]
            }
        ]
    },

    # Scene 10: 10-repeated-tomorrow-warning.png
    {
        "scene": 10,
        "image": "images/talking-is-not-doing/10-repeated-tomorrow-warning.png",
        "phrases": [
            {
                "text": "Cách nhận diện:",
                "keywords": ["Cách nhận diện"]
            },
            {
                "text": "nếu bạn thấy mình nói để mai, lát, tuần sau tính",
                "keywords": ["để mai", "tuần sau tính"]
            },
            {
                "text": "về cùng một việc từ 2 lần trở lên,",
                "keywords": ["từ 2 lần trở lên"]
            },
            {
                "text": "mà chưa từng thử làm ngay dù chỉ 5 phút,",
                "keywords": ["làm ngay dù chỉ 5 phút"]
            },
            {
                "text": "thì bạn không đang lên kế hoạch —",
                "keywords": ["không lên kế hoạch"]
            },
            {
                "text": "bạn đang trốn việc bằng lời hứa.",
                "keywords": ["trốn việc", "lời hứa"]
            }
        ]
    },

    # Scene 11: 11-start-for-five-minutes.png
    {
        "scene": 11,
        "image": "images/talking-is-not-doing/11-start-for-five-minutes.png",
        "phrases": [
            {
                "text": "Cách thoát rất đơn giản:",
                "keywords": ["rất đơn giản"]
            },
            {
                "text": "đừng hẹn làm, làm ngay phần nhỏ nhất có thể lúc này.",
                "keywords": ["đừng hẹn làm", "làm ngay"]
            },
            {
                "text": "Không có để mai —",
                "keywords": ["Không có để mai"]
            },
            {
                "text": "chỉ có làm luôn 5 phút, xong tính tiếp.",
                "keywords": ["làm luôn 5 phút", "xong tính tiếp"]
            }
        ]
    },

    # Scene 12: 12-real-completion.png
    {
        "scene": 12,
        "image": "images/talking-is-not-doing/12-real-completion.png",
        "phrases": [
            {
                "text": "Hẹn không phải là làm.",
                "keywords": ["Hẹn không phải là làm"]
            },
            {
                "text": "Nói ra không xóa được việc",
                "keywords": ["Nói ra không xóa được"]
            },
            {
                "text": "còn dang dở trong thực tế.",
                "keywords": ["dang dở trong thực tế"]
            }
        ]
    }
]

current_token_idx = 0
phrases_output = []
scene_timings = []

phrase_global_id = 1
for s in scenes_def:
    s_start_ms = None
    s_end_ms = None
    
    for p_def in s["phrases"]:
        clean_text = re.sub(r'[,.…!—:?\'"“”/]', ' ', p_def["text"]).strip()
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

        # Last token
        last_tok = phrase_tokens[-1]
        if last_tok['endMs'] <= last_tok['startMs']:
            last_tok['endMs'] = last_tok['startMs'] + 220
        elif last_tok['endMs'] - last_tok['startMs'] < 120:
            last_tok['endMs'] = last_tok['startMs'] + 180

        p_start = phrase_tokens[0]["startMs"]
        p_end = phrase_tokens[-1]["endMs"]
        
        if s_start_ms is None:
            s_start_ms = p_start
        s_end_ms = p_end

        phrases_output.append({
            "id": phrase_global_id,
            "startMs": p_start,
            "endMs": p_end,
            "text": clean_text,
            "tokens": phrase_tokens,
            "highlightKeywords": p_def["keywords"]
        })
        phrase_global_id += 1
        
    scene_timings.append({
        "scene": s["scene"],
        "startMs": s_start_ms,
        "endMs": s_end_ms
    })

# Adjust displayEndMs so captions don't flash off
for i in range(len(phrases_output)):
    curr = phrases_output[i]
    if i + 1 < len(phrases_output):
        next_start = phrases_output[i+1]["startMs"]
        gap = next_start - curr["endMs"]
        if gap > 0:
            curr["endMs"] = min(next_start - 30, curr["endMs"] + 350)
    else:
        curr["endMs"] = curr["endMs"] + 450

print(f"Generated {len(phrases_output)} phrases using {current_token_idx} tokens.")
print("Scene timings (ms):")
for st in scene_timings:
    print(f"Scene {st['scene']:2d}: {st['startMs']}ms -> {st['endMs']}ms (approx frame {int(st['startMs']*30/1000)} -> {int(st['endMs']*30/1000)})")

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

export const zeigarnikSubtitles: SubtitlePhrase[] = """ + json.dumps(phrases_output, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/zeigarnikSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Successfully wrote src/data/zeigarnikSubtitles.ts!")
