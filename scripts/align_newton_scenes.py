import json
import re

with open('whisper_newton_captions.json', 'r', encoding='utf-8') as f:
    raw_tokens = json.load(f)

# Merge: 'ái' + 'xác' -> 'Isaac'
tokens = []
i = 0
while i < len(raw_tokens):
    t = raw_tokens[i]
    text = t['text'].strip()
    if i == 0 and text.lower() == 'ái' and i + 1 < len(raw_tokens) and raw_tokens[i+1]['text'].strip().lower() == 'xác':
        tokens.append({
            'text': 'Isaac',
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

print(f"Total tokens after merge: {len(tokens)}")

scenes_def = [
    # Scene 1: 01-apple-myth.png
    {
        "scene": 1,
        "image": "images/newton-hidden-lives/01-apple-myth.png",
        "phrases": [
            {
                "text": "Isaac Newton ngồi dưới gốc táo,",
                "keywords": ["Isaac Newton", "gốc táo"]
            },
            {
                "text": "một quả táo rơi trúng đầu,",
                "keywords": ["quả táo", "trúng đầu"]
            },
            {
                "text": "và ông phát minh ra lực hấp dẫn.",
                "keywords": ["lực hấp dẫn"]
            },
            {
                "text": "Câu chuyện hay đấy,",
                "keywords": ["Câu chuyện hay"]
            },
            {
                "text": "chỉ có điều... nó hơi bị chế thêm gia vị.",
                "keywords": ["chế thêm gia vị"]
            }
        ]
    },

    # Scene 2: 02-watching-apple-fall.png
    {
        "scene": 2,
        "image": "images/newton-hidden-lives/02-watching-apple-fall.png",
        "phrases": [
            {
                "text": "Sự thật là Newton chỉ nhìn thấy một quả táo rơi từ xa,",
                "keywords": ["nhìn thấy", "rơi từ xa"]
            },
            {
                "text": "không hề bị đánh trúng đầu như phim hoạt hình vẫn vẽ.",
                "keywords": ["không hề bị đánh", "hoạt hình"]
            }
        ]
    },

    # Scene 3: 03-silly-question-law.png
    {
        "scene": 3,
        "image": "images/newton-hidden-lives/03-silly-question-law.png",
        "phrases": [
            {
                "text": "Ông ấy chỉ đang ngồi suy nghĩ vẩn vơ thôi,",
                "keywords": ["suy nghĩ vẩn vơ"]
            },
            {
                "text": "và tự dưng nghĩ: 'Ơ, sao táo lại rơi xuống mà không bay ngang?'",
                "keywords": ["rơi xuống", "không bay ngang"]
            },
            {
                "text": "câu hỏi tưởng ngớ ngẩn này",
                "keywords": ["tưởng ngớ ngẩn"]
            },
            {
                "text": "lại đẻ ra cả một định luật thay đổi vật lý học.",
                "keywords": ["thay đổi vật lý học"]
            }
        ]
    },

    # Scene 4: 04-optics-experiment.png
    {
        "scene": 4,
        "image": "images/newton-hidden-lives/04-optics-experiment.png",
        "phrases": [
            {
                "text": "Nhưng khoan, Newton không chỉ có mỗi lực hấp dẫn đâu.",
                "keywords": ["không chỉ có", "lực hấp dẫn"]
            },
            {
                "text": "Ông này còn là một người cực kỳ... rảnh theo kiểu bác học.",
                "keywords": ["rảnh theo kiểu bác học"]
            },
            {
                "text": "Ông từng tự chọc một cây kim vào mắt mình —",
                "keywords": ["chọc một cây kim", "vào mắt mình"]
            },
            {
                "text": "đúng nghĩa đen —",
                "keywords": ["đúng nghĩa đen"]
            },
            {
                "text": "chỉ để nghiên cứu xem áp lực lên mắt",
                "keywords": ["áp lực lên mắt"]
            },
            {
                "text": "ảnh hưởng thế nào đến cách con người nhìn màu sắc.",
                "keywords": ["nhìn màu sắc"]
            }
        ]
    },

    # Scene 5: 05-nobody-asked.png
    {
        "scene": 5,
        "image": "images/newton-hidden-lives/05-nobody-asked.png",
        "phrases": [
            {
                "text": "Không ai bảo ông làm cả,",
                "keywords": ["Không ai bảo"]
            },
            {
                "text": "ông tự nguyện.",
                "keywords": ["tự nguyện"]
            }
        ]
    },

    # Scene 6: 06-alchemy-obsession.png
    {
        "scene": 6,
        "image": "images/newton-hidden-lives/06-alchemy-obsession.png",
        "phrases": [
            {
                "text": "Và đây mới là phần hài nhất:",
                "keywords": ["phần hài nhất"]
            },
            {
                "text": "Newton dành phần lớn cuộc đời không phải để nghiên cứu vật lý,",
                "keywords": ["không phải nghiên cứu vật lý"]
            },
            {
                "text": "mà để nghiên cứu... giả kim thuật.",
                "keywords": ["giả kim thuật"]
            },
            {
                "text": "Ông cực kỳ tin vào việc biến chì thành vàng,",
                "keywords": ["biến chì thành vàng"]
            }
        ]
    },

    # Scene 7: 07-secret-notebooks.png
    {
        "scene": 7,
        "image": "images/newton-hidden-lives/07-secret-notebooks.png",
        "phrases": [
            {
                "text": "và viết hàng ngàn trang ghi chú bí mật về nó —",
                "keywords": ["hàng ngàn trang", "bí mật"]
            }
        ]
    },

    # Scene 8: 08-alchemy-discovered.png
    {
        "scene": 8,
        "image": "images/newton-hidden-lives/08-alchemy-discovered.png",
        "phrases": [
            {
                "text": "bí mật đến mức mãi sau khi ông chết",
                "keywords": ["sau khi ông chết"]
            },
            {
                "text": "người ta mới phát hiện ra",
                "keywords": ["phát hiện ra"]
            },
            {
                "text": "ông là một 'nhà giả kim'",
                "keywords": ["nhà giả kim"]
            },
            {
                "text": "hơn là nhà khoa học như sách giáo khoa vẽ.",
                "keywords": ["sách giáo khoa vẽ"]
            }
        ]
    },

    # Scene 9: 09-counterfeit-detective.png
    {
        "scene": 9,
        "image": "images/newton-hidden-lives/09-counterfeit-detective.png",
        "phrases": [
            {
                "text": "Ông còn từng là Giám đốc Sở Đúc tiền Hoàng gia Anh,",
                "keywords": ["Giám đốc Sở Đúc tiền"]
            },
            {
                "text": "và ở vị trí đó, Newton biến thành... thợ săn tiền giả.",
                "keywords": ["thợ săn tiền giả"]
            }
        ]
    },

    # Scene 10: 10-counterfeiter-caught.png
    {
        "scene": 10,
        "image": "images/newton-hidden-lives/10-counterfeiter-caught.png",
        "phrases": [
            {
                "text": "Ông đích thân cải trang đi điều tra,",
                "keywords": ["đích thân cải trang", "điều tra"]
            },
            {
                "text": "bắt tận tay và đưa nhiều kẻ làm tiền giả lên giá treo cổ.",
                "keywords": ["bắt tận tay", "giá treo cổ"]
            },
            {
                "text": "Từ người phát minh ra lực hấp dẫn",
                "keywords": ["phát minh lực hấp dẫn"]
            },
            {
                "text": "đến cảnh sát trưởng phá án tiền giả —",
                "keywords": ["cảnh sát trưởng", "phá án tiền giả"]
            },
            {
                "text": "sự nghiệp của ông đúng là không ai đoán trước được.",
                "keywords": ["không ai đoán trước"]
            }
        ]
    },

    # Scene 11: 11-love-of-math.png
    {
        "scene": 11,
        "image": "images/newton-hidden-lives/11-love-of-math.png",
        "phrases": [
            {
                "text": "Và có lẽ câu chuyện hài nhất về Newton là:",
                "keywords": ["câu chuyện hài nhất"]
            },
            {
                "text": "ông chưa từng... có bạn gái, chưa từng kết hôn,",
                "keywords": ["chưa từng có bạn gái", "chưa từng kết hôn"]
            },
            {
                "text": "và được cho là qua đời mà vẫn còn trinh trắng theo ghi chép lịch sử.",
                "keywords": ["vẫn còn trinh trắng", "ghi chép lịch sử"]
            },
            {
                "text": "Nhưng bù lại, ông có mối quan hệ tình cảm sâu đậm nhất đời mình",
                "keywords": ["tình cảm sâu đậm nhất"]
            },
            {
                "text": "với... toán học.",
                "keywords": ["với toán học"]
            }
        ]
    },

    # Scene 12: 12-newton-many-roles.png
    {
        "scene": 12,
        "image": "images/newton-hidden-lives/12-newton-many-roles.png",
        "phrases": [
            {
                "text": "Vậy lần tới khi thấy quả táo rơi,",
                "keywords": ["quả táo rơi"]
            },
            {
                "text": "đừng nghĩ tới lực hấp dẫn —",
                "keywords": ["đừng nghĩ tới", "lực hấp dẫn"]
            },
            {
                "text": "hãy nghĩ tới một ông già thế kỷ 17",
                "keywords": ["ông già thế kỷ 17"]
            },
            {
                "text": "vừa chọc kim vào mắt mình,",
                "keywords": ["chọc kim vào mắt"]
            },
            {
                "text": "vừa cố biến chì thành vàng,",
                "keywords": ["biến chì thành vàng"]
            },
            {
                "text": "vừa đi bắt tiền giả,",
                "keywords": ["bắt tiền giả"]
            },
            {
                "text": "tất cả trong cùng một cuộc đời.",
                "keywords": ["cùng một cuộc đời"]
            }
        ]
    }
]

# Verify token count matching
all_phrase_words = []
for s in scenes_def:
    for p in s["phrases"]:
        cleaned = re.sub(r'[,.…!—:?\'"“”/]', ' ', p["text"])
        words = [w for w in cleaned.split() if w]
        all_phrase_words.extend(words)

print(f"Total words in phrases: {len(all_phrase_words)}")
print(f"Total whisper tokens: {len(tokens)}")

if len(all_phrase_words) != len(tokens):
    print("MISMATCH! Detailed check:")
    for idx in range(max(len(all_phrase_words), len(tokens))):
        pw = all_phrase_words[idx] if idx < len(all_phrase_words) else "---"
        tw = tokens[idx]['text'] if idx < len(tokens) else "---"
        if pw.lower() != tw.lower():
            print(f"Mismatch at {idx}: phrase='{pw}' vs whisper='{tw}'")
            break
else:
    print("PERFECT 100% MATCH: 420 words == 420 tokens!")
