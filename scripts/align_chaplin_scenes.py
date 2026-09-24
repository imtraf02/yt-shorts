import json
import re

with open('whisper_chaplin_aligned_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

scenes_def = [
    # Scene 1: 01-silent-comedy-legend.png
    {
        "scene": 1,
        "image": "images/chaplin-hidden-life/01-silent-comedy-legend.png",
        "phrases": [
            {
                "text": "Charlie Chaplin là vua hài câm huyền thoại,",
                "keywords": ["Charlie Chaplin", "vua hài câm"]
            },
            {
                "text": "khiến cả thế giới cười",
                "keywords": ["cả thế giới cười"]
            },
            {
                "text": "mà không cần nói một lời.",
                "keywords": ["không cần nói một lời"]
            },
            {
                "text": "Nhưng đời thật của ông",
                "keywords": ["đời thật"]
            },
            {
                "text": "lại chẳng hài hước chút nào.",
                "keywords": ["chẳng hài hước chút nào"]
            }
        ]
    },

    # Scene 2: 02-london-poverty.png
    {
        "scene": 2,
        "image": "images/chaplin-hidden-life/02-london-poverty.png",
        "phrases": [
            {
                "text": "Ông lớn lên trong nghèo đói cùng cực ở London.",
                "keywords": ["nghèo đói cùng cực", "London"]
            },
            {
                "text": "Mẹ bị bệnh tâm thần,",
                "keywords": ["bệnh tâm thần"]
            },
            {
                "text": "phải vào trại tế bần,",
                "keywords": ["trại tế bần"]
            }
        ]
    },

    # Scene 3: 03-self-reliance.png
    {
        "scene": 3,
        "image": "images/chaplin-hidden-life/03-self-reliance.png",
        "phrases": [
            {
                "text": "còn cậu bé Chaplin",
                "keywords": ["cậu bé Chaplin"]
            },
            {
                "text": "tự bươn chải trên đường phố",
                "keywords": ["tự bươn chải", "đường phố"]
            },
            {
                "text": "từ rất nhỏ.",
                "keywords": ["từ rất nhỏ"]
            }
        ]
    },

    # Scene 4: 04-hollywood-wealth.png
    {
        "scene": 4,
        "image": "images/chaplin-hidden-life/04-hollywood-wealth.png",
        "phrases": [
            {
                "text": "Người sau này giàu có bậc nhất Hollywood",
                "keywords": ["giàu có bậc nhất", "Hollywood"]
            },
            {
                "text": "từng không có nổi bữa ăn no",
                "keywords": ["không có nổi bữa ăn no"]
            },
            {
                "text": "thời thơ ấu.",
                "keywords": ["thời thơ ấu"]
            }
        ]
    },

    # Scene 5: 05-tramp-costume.png
    {
        "scene": 5,
        "image": "images/chaplin-hidden-life/05-tramp-costume.png",
        "phrases": [
            {
                "text": "Bộ ria mép và chiếc gậy huyền thoại của 'The Tramp'",
                "keywords": ["Bộ ria mép", "chiếc gậy", "The Tramp"]
            },
            {
                "text": "thực ra chỉ là trang phục",
                "keywords": ["trang phục"]
            },
            {
                "text": "ông mặc vội trong vài phút trước khi quay,",
                "keywords": ["mặc vội trong vài phút"]
            },
            {
                "text": "không hề có kế hoạch.",
                "keywords": ["không hề có kế hoạch"]
            }
        ]
    },

    # Scene 6: 06-icon-born.png
    {
        "scene": 6,
        "image": "images/chaplin-hidden-life/06-icon-born.png",
        "phrases": [
            {
                "text": "Ghép ngẫu nhiên vài món đồ không ăn khớp,",
                "keywords": ["Ghép ngẫu nhiên", "không ăn khớp"]
            },
            {
                "text": "và nhân vật biểu tượng nhất lịch sử điện ảnh",
                "keywords": ["biểu tượng nhất", "lịch sử điện ảnh"]
            },
            {
                "text": "ra đời như vậy.",
                "keywords": ["ra đời như vậy"]
            }
        ]
    },

    # Scene 7: 07-four-marriages.png
    {
        "scene": 7,
        "image": "images/chaplin-hidden-life/07-four-marriages.png",
        "phrases": [
            {
                "text": "Chi tiết gây sốc nhất:",
                "keywords": ["gây sốc nhất"]
            },
            {
                "text": "Chaplin kết hôn 4 lần,",
                "keywords": ["kết hôn 4 lần"]
            },
            {
                "text": "nhiều cuộc hôn nhân vướng tranh cãi",
                "keywords": ["vướng tranh cãi"]
            },
            {
                "text": "vì chênh lệch tuổi tác lớn.",
                "keywords": ["chênh lệch tuổi tác lớn"]
            }
        ]
    },

    # Scene 8: 08-final-marriage.png
    {
        "scene": 8,
        "image": "images/chaplin-hidden-life/08-final-marriage.png",
        "phrases": [
            {
                "text": "Cuộc hôn nhân cuối,",
                "keywords": ["Cuộc hôn nhân cuối"]
            },
            {
                "text": "ông 54 tuổi còn vợ mới 18 —",
                "keywords": ["54 tuổi", "vợ mới 18"]
            }
        ]
    },

    # Scene 9: 09-happiest-marriage.png
    {
        "scene": 9,
        "image": "images/chaplin-hidden-life/09-happiest-marriage.png",
        "phrases": [
            {
                "text": "trớ trêu thay,",
                "keywords": ["trớ trêu thay"]
            },
            {
                "text": "lại là cuộc hôn nhân hạnh phúc",
                "keywords": ["hạnh phúc"]
            },
            {
                "text": "và bền lâu nhất đời ông.",
                "keywords": ["bền lâu nhất đời ông"]
            }
        ]
    },

    # Scene 10: 10-under-surveillance.png
    {
        "scene": 10,
        "image": "images/chaplin-hidden-life/10-under-surveillance.png",
        "phrases": [
            {
                "text": "Chaplin còn bị FBI theo dõi nhiều năm",
                "keywords": ["FBI theo dõi", "nhiều năm"]
            },
            {
                "text": "vì nghi ngờ liên hệ cộng sản.",
                "keywords": ["liên hệ cộng sản"]
            }
        ]
    },

    # Scene 11: 11-ocean-liner-exile.png
    {
        "scene": 11,
        "image": "images/chaplin-hidden-life/11-ocean-liner-exile.png",
        "phrases": [
            {
                "text": "Năm 1952, chính phủ Mỹ",
                "keywords": ["Năm 1952", "chính phủ Mỹ"]
            },
            {
                "text": "thu hồi giấy phép nhập cảnh",
                "keywords": ["thu hồi giấy phép nhập cảnh"]
            },
            {
                "text": "khi ông đang trên tàu sang châu Âu —",
                "keywords": ["tàu sang châu Âu"]
            },
            {
                "text": "vua hài của Hollywood",
                "keywords": ["vua hài"]
            },
            {
                "text": "bị chính Hollywood đá văng không thương tiếc.",
                "keywords": ["đá văng không thương tiếc"]
            }
        ]
    },

    # Scene 12: 12-bittersweet-life.png
    {
        "scene": 12,
        "image": "images/chaplin-hidden-life/12-bittersweet-life.png",
        "phrases": [
            {
                "text": "Từ đứa trẻ đói khát ở London,",
                "keywords": ["đói khát ở London"]
            },
            {
                "text": "đến biểu tượng điện ảnh toàn cầu,",
                "keywords": ["biểu tượng điện ảnh toàn cầu"]
            },
            {
                "text": "rồi bị chính nước Mỹ trục xuất —",
                "keywords": ["trục xuất"]
            },
            {
                "text": "cuộc đời Charlie Chaplin chứng minh:",
                "keywords": ["Charlie Chaplin"]
            },
            {
                "text": "người khiến cả thế giới cười,",
                "keywords": ["cả thế giới cười"]
            },
            {
                "text": "lại sống một cuộc đời chẳng hề dễ dàng.",
                "keywords": ["chẳng hề dễ dàng"]
            }
        ]
    }
]

# Verify word count against refined tokens
all_words = []
for s in scenes_def:
    for p in s["phrases"]:
        cleaned = re.sub(r'[,.…!—:?\'"“”/()]', ' ', p["text"])
        words = [w for w in cleaned.split() if w]
        all_words.extend(words)

print(f"Total words in phrases: {len(all_words)}")
print(f"Total refined tokens: {len(tokens)}")

if len(all_words) != len(tokens):
    print("MISMATCH! Detailed check:")
    for idx in range(max(len(all_words), len(tokens))):
        pw = all_words[idx] if idx < len(all_words) else "---"
        tw = tokens[idx]['text'] if idx < len(tokens) else "---"
        if pw.lower() != tw.lower():
            print(f"Mismatch at {idx}: phrase='{pw}' vs token='{tw}'")
            break
else:
    print("PERFECT 100% MATCH: 273 words == 273 tokens!")
