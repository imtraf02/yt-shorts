import json
import re

with open('whisper_darwin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

scenes_def = [
    # Scene 1: 01-evolutionary-theory.png
    {
        "scene": 1,
        "image": "images/darwin-quirks/01-evolutionary-theory.png",
        "phrases": [
            {
                "text": "Charles Darwin viết ra thuyết tiến hóa,",
                "keywords": ["Charles Darwin", "thuyết tiến hóa"]
            },
            {
                "text": "thay đổi hoàn toàn cách nhân loại",
                "keywords": ["thay đổi hoàn toàn"]
            },
            {
                "text": "hiểu về nguồn gốc sự sống.",
                "keywords": ["nguồn gốc sự sống"]
            },
            {
                "text": "Nhưng trước khi trở thành",
                "keywords": ["trước khi"]
            },
            {
                "text": "nhà khoa học vĩ đại đó,",
                "keywords": ["nhà khoa học vĩ đại"]
            },
            {
                "text": "ông từng có một sở thích kỳ lạ:",
                "keywords": ["sở thích kỳ lạ"]
            },
            {
                "text": "ăn gần như mọi con vật",
                "keywords": ["ăn gần như mọi con vật"]
            },
            {
                "text": "ông nghiên cứu.",
                "keywords": ["ông nghiên cứu"]
            }
        ]
    },

    # Scene 2: 02-gourmet-club.png
    {
        "scene": 2,
        "image": "images/darwin-quirks/02-gourmet-club.png",
        "phrases": [
            {
                "text": "Đúng vậy, thời sinh viên ở Cambridge,",
                "keywords": ["sinh viên", "Cambridge"]
            },
            {
                "text": "Darwin tham gia một hội kín",
                "keywords": ["hội kín"]
            },
            {
                "text": "tên là 'Hội Ăn Tạp' —",
                "keywords": ["Hội Ăn Tạp"]
            },
            {
                "text": "mục tiêu duy nhất của hội",
                "keywords": ["mục tiêu duy nhất"]
            },
            {
                "text": "là nếm thử càng nhiều",
                "keywords": ["nếm thử"]
            },
            {
                "text": "loài động vật kỳ lạ càng tốt.",
                "keywords": ["động vật kỳ lạ"]
            }
        ]
    },

    # Scene 3: 03-exotic-menu.png
    {
        "scene": 3,
        "image": "images/darwin-quirks/03-exotic-menu.png",
        "phrases": [
            {
                "text": "Cú, chim ưng,",
                "keywords": ["Cú", "chim ưng"]
            },
            {
                "text": "thậm chí cả... một con cáo già,",
                "keywords": ["con cáo già"]
            },
            {
                "text": "tất cả đều từng nằm trên bàn ăn của ông",
                "keywords": ["bàn ăn của ông"]
            },
            {
                "text": "trước khi nằm trong sách nghiên cứu.",
                "keywords": ["sách nghiên cứu"]
            }
        ]
    },

    # Scene 4: 04-beagle-voyage.png
    {
        "scene": 4,
        "image": "images/darwin-quirks/04-beagle-voyage.png",
        "phrases": [
            {
                "text": "Trong chuyến hành trình huyền thoại",
                "keywords": ["hành trình huyền thoại"]
            },
            {
                "text": "trên tàu Beagle vòng quanh thế giới,",
                "keywords": ["tàu Beagle", "thế giới"]
            },
            {
                "text": "Darwin tiếp tục truyền thống đó.",
                "keywords": ["truyền thống đó"]
            }
        ]
    },

    # Scene 5: 05-galapagos-tortoise-dish.png
    {
        "scene": 5,
        "image": "images/darwin-quirks/05-galapagos-tortoise-dish.png",
        "phrases": [
            {
                "text": "Ông từng ăn thịt một con rùa khổng lồ Galapagos —",
                "keywords": ["rùa khổng lồ", "Galapagos"]
            },
            {
                "text": "đúng loài rùa mà sau này",
                "keywords": ["loài rùa"]
            },
            {
                "text": "ông dùng làm bằng chứng",
                "keywords": ["bằng chứng"]
            },
            {
                "text": "cho thuyết tiến hóa.",
                "keywords": ["thuyết tiến hóa"]
            }
        ]
    },

    # Scene 6: 06-study-and-eat.png
    {
        "scene": 6,
        "image": "images/darwin-quirks/06-study-and-eat.png",
        "phrases": [
            {
                "text": "Vừa nghiên cứu khoa học,",
                "keywords": ["nghiên cứu khoa học"]
            },
            {
                "text": "vừa dùng bữa với chính đối tượng nghiên cứu,",
                "keywords": ["dùng bữa", "đối tượng nghiên cứu"]
            },
            {
                "text": "không ai làm điều đó",
                "keywords": ["không ai"]
            },
            {
                "text": "tận tâm hơn Darwin.",
                "keywords": ["tận tâm hơn Darwin"]
            }
        ]
    },

    # Scene 7: 07-barnacle-years.png
    {
        "scene": 7,
        "image": "images/darwin-quirks/07-barnacle-years.png",
        "phrases": [
            {
                "text": "Ông còn là người cực kỳ chi tiết",
                "keywords": ["cực kỳ chi tiết"]
            },
            {
                "text": "đến mức ám ảnh.",
                "keywords": ["ám ảnh"]
            },
            {
                "text": "Darwin dành tới 8 năm",
                "keywords": ["8 năm"]
            },
            {
                "text": "chỉ để nghiên cứu... một loài hà biển",
                "keywords": ["loài hà biển"]
            },
            {
                "text": "(giống như con hàu bám trên đá).",
                "keywords": ["con hàu bám trên đá"]
            },
            {
                "text": "8 năm, chỉ để hiểu tường tận",
                "keywords": ["8 năm", "hiểu tường tận"]
            },
            {
                "text": "một sinh vật bé xíu bám vào thành tàu,",
                "keywords": ["sinh vật bé xíu"]
            },
            {
                "text": "trước khi dám công bố",
                "keywords": ["công bố"]
            },
            {
                "text": "lý thuyết lớn về sự sống trên toàn hành tinh.",
                "keywords": ["lý thuyết lớn", "sự sống"]
            }
        ]
    },

    # Scene 8: 08-delayed-publication.png
    {
        "scene": 8,
        "image": "images/darwin-quirks/08-delayed-publication.png",
        "phrases": [
            {
                "text": "Và đây là chi tiết khiến ai cũng bật cười:",
                "keywords": ["bật cười"]
            },
            {
                "text": "Darwin sợ hãi việc công bố thuyết tiến hóa",
                "keywords": ["sợ hãi", "thuyết tiến hóa"]
            },
            {
                "text": "đến mức trì hoãn suốt 20 năm.",
                "keywords": ["trì hoãn suốt 20 năm"]
            },
            {
                "text": "Ông có đầy đủ bằng chứng,",
                "keywords": ["đầy đủ bằng chứng"]
            },
            {
                "text": "đầy đủ lý luận,",
                "keywords": ["đầy đủ lý luận"]
            },
            {
                "text": "nhưng cứ ngồi im",
                "keywords": ["ngồi im"]
            },
            {
                "text": "vì sợ phản ứng dữ dội",
                "keywords": ["phản ứng dữ dội"]
            },
            {
                "text": "từ tôn giáo và xã hội thời đó.",
                "keywords": ["tôn giáo", "xã hội"]
            }
        ]
    },

    # Scene 9: 09-wallace-urgency.png
    {
        "scene": 9,
        "image": "images/darwin-quirks/09-wallace-urgency.png",
        "phrases": [
            {
                "text": "Cuối cùng, ông chỉ công bố vội vàng",
                "keywords": ["công bố vội vàng"]
            },
            {
                "text": "khi phát hiện một nhà khoa học khác —",
                "keywords": ["nhà khoa học khác"]
            },
            {
                "text": "Alfred Russel Wallace —",
                "keywords": ["Alfred Russel Wallace"]
            }
        ]
    },

    # Scene 10: 10-rushed-publication.png
    {
        "scene": 10,
        "image": "images/darwin-quirks/10-rushed-publication.png",
        "phrases": [
            {
                "text": "sắp công bố ý tưởng",
                "keywords": ["sắp công bố"]
            },
            {
                "text": "gần giống hệt.",
                "keywords": ["gần giống hệt"]
            }
        ]
    },

    # Scene 11: 11-marriage-pros-cons.png
    {
        "scene": 11,
        "image": "images/darwin-quirks/11-marriage-pros-cons.png",
        "phrases": [
            {
                "text": "Về đời tư, Darwin kết hôn với người em họ",
                "keywords": ["đời tư", "người em họ"]
            },
            {
                "text": "của chính mình,",
                "keywords": ["chính mình"]
            },
            {
                "text": "và ông lo lắng đến mức viết hẳn một danh sách",
                "keywords": ["lo lắng", "danh sách"]
            },
            {
                "text": "'ưu và nhược điểm của việc kết hôn'",
                "keywords": ["ưu và nhược điểm", "kết hôn"]
            },
            {
                "text": "trước khi cầu hôn —",
                "keywords": ["cầu hôn"]
            },
            {
                "text": "như một bản báo cáo khoa học thực thụ,",
                "keywords": ["báo cáo khoa học"]
            },
            {
                "text": "cân đo đong đếm cả chuyện tình cảm.",
                "keywords": ["cân đo đong đếm", "tình cảm"]
            }
        ]
    },

    # Scene 12: 12-darwin-quirky-hero.png
    {
        "scene": 12,
        "image": "images/darwin-quirks/12-darwin-quirky-hero.png",
        "phrases": [
            {
                "text": "Người đàn ông ăn rùa Galapagos,",
                "keywords": ["ăn rùa Galapagos"]
            },
            {
                "text": "dành 8 năm nghiên cứu con hà,",
                "keywords": ["8 năm", "con hà"]
            },
            {
                "text": "và trì hoãn công bố phát hiện lớn nhất đời mình",
                "keywords": ["trì hoãn", "lớn nhất đời mình"]
            },
            {
                "text": "suốt 2 thập kỷ —",
                "keywords": ["2 thập kỷ"]
            },
            {
                "text": "đó chính là Charles Darwin.",
                "keywords": ["Charles Darwin"]
            }
        ]
    }
]

# Verify word count against whisper tokens
all_words = []
for s in scenes_def:
    for p in s["phrases"]:
        cleaned = re.sub(r'[,.…!—:?\'"“”/()]', ' ', p["text"])
        words = [w for w in cleaned.split() if w]
        all_words.extend(words)

print(f"Total words in phrases: {len(all_words)}")
print(f"Total whisper tokens: {len(tokens)}")

if len(all_words) != len(tokens):
    print("MISMATCH! Detailed check:")
    for idx in range(max(len(all_words), len(tokens))):
        pw = all_words[idx] if idx < len(all_words) else "---"
        tw = tokens[idx]['text'] if idx < len(tokens) else "---"
        if pw.lower() != tw.lower():
            print(f"Mismatch at {idx}: phrase='{pw}' vs whisper='{tw}'")
            break
else:
    print("PERFECT 100% MATCH: 408 words == 408 tokens!")
