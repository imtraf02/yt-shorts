import json
import re

with open('whisper_zeigarnik_captions.json', 'r', encoding='utf-8') as f:
    raw_tokens = json.load(f)

# Merge:
# 1. 'dì' + 'gà' + 'ních' (around 12.0s - 12.6s) -> 'Zeigarnik'
# 2. 'đô' + 'bà' + 'mình' (around 30.7s - 31.2s) -> 'dopamine'
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
    else:
        tokens.append({
            'text': text,
            'startMs': t['startMs'],
            'endMs': t['endMs']
        })
        i += 1

print(f"Tokens after merge: {len(tokens)}")

# Now let's define the 12 scenes and phrases:
scenes_def = [
    # Scene 1: 01-message-friend-at-night.png
    # Text: Bạn nhắn cho bạn thân: "Mai tao gọi cho mày để bàn chuyện đó nha."
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
    # Text: Gửi xong, bạn tắt điện thoại, thấy nhẹ hẳn người — như thể chuyện đó đã được giải quyết.
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
    # Text: Nhưng ngày mai chưa tới, cuộc gọi chưa xảy ra, chuyện vẫn y nguyên như cũ. Đó là hiệu ứng Zeigarnik ngược.
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
    # Text: Cơ chế của nó thế này: bình thường não bạn cực kỳ khó chịu với việc dang dở — đó là lý do bạn cứ nhớ mãi một tin nhắn chưa trả lời, một bộ phim xem dở giữa chừng.
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
    # Text: Nhưng có một lỗ hổng: chỉ cần bạn nói ra hoặc hẹn sẽ làm — dù chỉ là một câu nhắn tin — não bạn đã coi như tín hiệu "đã xử lý" được gửi đi, dù thực tế chưa làm gì cả.
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
    # Text: Phần nguy hiểm là dopamine không phân biệt được "hẹn làm" với "đã làm". Cả hai đều cho bạn cảm giác nhẹ nhõm y hệt nhau.
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
    # Text: Thế nên bạn có thể hẹn "để tuần sau", "để mai tính", "lát nữa làm" cả chục lần một ngày, cảm thấy mình đã kiểm soát được mọi thứ — trong khi chẳng có việc nào thực sự nhúc nhích.
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
    # Text: Điều buồn cười là: một câu hẹn nghe rất có trách nhiệm — "tao sẽ", "để tao", "mai tao" — nên bạn còn được người khác tin là người chu đáo, đáng tin cậy.
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
    # Text: Trong khi thực chất, câu nói đó chỉ đang mua thời gian để trì hoãn thêm một nhịp nữa.
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
    # Text: Cách nhận diện: nếu bạn thấy mình nói "để mai/lát/tuần sau tính" về cùng một việc từ hai lần trở lên, mà chưa từng thử làm ngay dù chỉ 5 phút, thì bạn không đang lên kế hoạch — bạn đang trốn việc bằng lời hứa.
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
    # Text: Cách thoát rất đơn giản: đừng hẹn làm, làm ngay phần nhỏ nhất có thể làm lúc này. Không có "để mai" — chỉ có "làm luôn 5 phút, xong tính tiếp".
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
    # Text: Hẹn không phải là làm. Nói ra không xóa được việc còn dang dở trong thực tế.
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

total_phrase_words = sum(len(p["text"].replace("—", " ").replace(",", " ").replace(".", " ").split()) for s in scenes_def for p in s["phrases"])
print(f"Total words across all phrases: {total_phrase_words}")
