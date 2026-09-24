import json
import re

with open('whisper_caligula_aligned_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

scenes_def = [
    # Scene 1: 01-emperor-at-24.png
    {
        "scene": 1,
        "image": "images/caligula-quirks/01-emperor-at-24.png",
        "phrases": [
            {
                "text": "Caligula lên ngôi Hoàng đế La Mã",
                "keywords": ["Caligula", "Hoàng đế La Mã"]
            },
            {
                "text": "ở tuổi 24,",
                "keywords": ["tuổi 24"]
            },
            {
                "text": "và trong vài tháng đầu,",
                "keywords": ["vài tháng đầu"]
            },
            {
                "text": "dân chúng thực sự yêu quý ông —",
                "keywords": ["yêu quý ông"]
            },
            {
                "text": "cho đến khi mọi thứ đi chệch hướng",
                "keywords": ["đi chệch hướng"]
            },
            {
                "text": "theo cách không ai đoán trước được.",
                "keywords": ["không ai đoán trước"]
            }
        ]
    },

    # Scene 2: 02-little-boots-childhood.png
    {
        "scene": 2,
        "image": "images/caligula-quirks/02-little-boots-childhood.png",
        "phrases": [
            {
                "text": "Trước hết, cái tên 'Caligula'",
                "keywords": ["Caligula"]
            },
            {
                "text": "thực ra không phải tên thật của ông.",
                "keywords": ["không phải tên thật"]
            },
            {
                "text": "Đó là biệt danh nghĩa là 'đôi bốt nhỏ' —",
                "keywords": ["đôi bốt nhỏ"]
            },
            {
                "text": "do binh lính đặt cho ông từ khi còn bé,",
                "keywords": ["binh lính đặt"]
            },
            {
                "text": "vì ông hay mặc một bộ đồng phục lính thu nhỏ,",
                "keywords": ["đồng phục lính thu nhỏ"]
            },
            {
                "text": "kèm đôi bốt tí hon,",
                "keywords": ["đôi bốt tí hon"]
            },
            {
                "text": "đi loanh quanh doanh trại của cha mình.",
                "keywords": ["doanh trại"]
            }
        ]
    },

    # Scene 3: 03-cute-name-cruel-emperor.png
    {
        "scene": 3,
        "image": "images/caligula-quirks/03-cute-name-cruel-emperor.png",
        "phrases": [
            {
                "text": "Vị hoàng đế khét tiếng tàn bạo bậc nhất lịch sử,",
                "keywords": ["tàn bạo bậc nhất"]
            },
            {
                "text": "hóa ra lại có biệt danh đáng yêu như một đứa trẻ.",
                "keywords": ["đáng yêu", "đứa trẻ"]
            }
        ]
    },

    # Scene 4: 04-horse-for-consul.png
    {
        "scene": 4,
        "image": "images/caligula-quirks/04-horse-for-consul.png",
        "phrases": [
            {
                "text": "Chuyện nổi tiếng nhất về Caligula",
                "keywords": ["nổi tiếng nhất"]
            },
            {
                "text": "là ông định phong con ngựa cưng của mình,",
                "keywords": ["con ngựa cưng"]
            },
            {
                "text": "tên là Incitatus, làm quan chấp chính —",
                "keywords": ["Incitatus", "quan chấp chính"]
            },
            {
                "text": "chức vụ chính trị cao cấp bậc nhất La Mã.",
                "keywords": ["cao cấp bậc nhất"]
            }
        ]
    },

    # Scene 5: 05-marble-horse-stable.png
    {
        "scene": 5,
        "image": "images/caligula-quirks/05-marble-horse-stable.png",
        "phrases": [
            {
                "text": "Con ngựa này được cho ở",
                "keywords": ["con ngựa"]
            },
            {
                "text": "trong một chuồng ngựa bằng đá cẩm thạch,",
                "keywords": ["đá cẩm thạch"]
            },
            {
                "text": "có máng ăn bằng ngà voi,",
                "keywords": ["ngà voi"]
            },
            {
                "text": "và thậm chí có cả... người hầu riêng.",
                "keywords": ["người hầu riêng"]
            },
            {
                "text": "Sử gia vẫn tranh cãi liệu đây là sự thật",
                "keywords": ["tranh cãi"]
            },
            {
                "text": "hay chỉ là cách Caligula châm biếm chính giới quý tộc La Mã,",
                "keywords": ["châm biếm", "quý tộc La Mã"]
            },
            {
                "text": "nhưng dù thế nào,",
                "keywords": ["dù thế nào"]
            },
            {
                "text": "câu chuyện cũng đủ hoang đường để đi vào lịch sử.",
                "keywords": ["hoang đường", "lịch sử"]
            }
        ]
    },

    # Scene 6: 06-living-god.png
    {
        "scene": 6,
        "image": "images/caligula-quirks/06-living-god.png",
        "phrases": [
            {
                "text": "Caligula còn tự xưng mình là thần sống,",
                "keywords": ["thần sống"]
            },
            {
                "text": "và ra lệnh xây tượng của chính mình",
                "keywords": ["xây tượng"]
            },
            {
                "text": "đặt cạnh tượng các vị thần La Mã",
                "keywords": ["vị thần La Mã"]
            },
            {
                "text": "để dân chúng thờ cúng.",
                "keywords": ["thờ cúng"]
            }
        ]
    },

    # Scene 7: 07-statue-among-gods.png
    {
        "scene": 7,
        "image": "images/caligula-quirks/07-statue-among-gods.png",
        "phrases": [
            {
                "text": "Ông thậm chí từng ra lệnh",
                "keywords": ["ra lệnh"]
            },
            {
                "text": "chặt đầu tượng thần Zeus tại Hy Lạp",
                "keywords": ["chặt đầu tượng", "thần Zeus", "Hy Lạp"]
            }
        ]
    },

    # Scene 8: 08-zeus-head-swap.png
    {
        "scene": 8,
        "image": "images/caligula-quirks/08-zeus-head-swap.png",
        "phrases": [
            {
                "text": "và thay bằng đầu của chính mình —",
                "keywords": ["đầu của chính mình"]
            },
            {
                "text": "một hành động khiến cả giới tư tế",
                "keywords": ["giới tư tế"]
            },
            {
                "text": "lẫn dân chúng đều choáng váng.",
                "keywords": ["choáng váng"]
            }
        ]
    },

    # Scene 9: 09-war-on-the-sea.png
    {
        "scene": 9,
        "image": "images/caligula-quirks/09-war-on-the-sea.png",
        "phrases": [
            {
                "text": "Một câu chuyện khác kể rằng",
                "keywords": ["câu chuyện khác"]
            },
            {
                "text": "Caligula từng tuyên chiến với... biển cả.",
                "keywords": ["tuyên chiến", "biển cả"]
            },
            {
                "text": "Ông dẫn quân đến bờ biển Eo biển Manche,",
                "keywords": ["Eo biển Manche"]
            },
            {
                "text": "ra lệnh binh lính giơ giáo tấn công những con sóng,",
                "keywords": ["tấn công những con sóng"]
            }
        ]
    },

    # Scene 10: 10-seashell-trophies.png
    {
        "scene": 10,
        "image": "images/caligula-quirks/10-seashell-trophies.png",
        "phrases": [
            {
                "text": "rồi bắt họ nhặt vỏ sò mang về như chiến lợi phẩm —",
                "keywords": ["nhặt vỏ sò", "chiến lợi phẩm"]
            },
            {
                "text": "coi đó là chiến thắng vẻ vang",
                "keywords": ["chiến thắng vẻ vang"]
            },
            {
                "text": "trước thần biển Neptune.",
                "keywords": ["thần biển Neptune"]
            }
        ]
    },

    # Scene 11: 11-palace-corridor.png
    {
        "scene": 11,
        "image": "images/caligula-quirks/11-palace-corridor.png",
        "phrases": [
            {
                "text": "Cuối cùng, sau chưa đầy 4 năm trị vì",
                "keywords": ["chưa đầy 4 năm"]
            },
            {
                "text": "đầy rẫy những quyết định kỳ lạ,",
                "keywords": ["quyết định kỳ lạ"]
            },
            {
                "text": "Caligula bị chính đội cận vệ của mình",
                "keywords": ["đội cận vệ"]
            },
            {
                "text": "ám sát ngay trong cung điện —",
                "keywords": ["ám sát", "cung điện"]
            }
        ]
    },

    # Scene 12: 12-fallen-crown.png
    {
        "scene": 12,
        "image": "images/caligula-quirks/12-fallen-crown.png",
        "phrases": [
            {
                "text": "khép lại triều đại của một trong những hoàng đế",
                "keywords": ["khép lại triều đại"]
            },
            {
                "text": "gây tranh cãi và khó đoán nhất lịch sử La Mã.",
                "keywords": ["gây tranh cãi", "khó đoán nhất", "lịch sử La Mã"]
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
    print("PERFECT 100% MATCH: 385 words == 385 tokens!")
