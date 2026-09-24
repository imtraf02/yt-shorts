import json
import re

with open('whisper_tesla_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

scenes_def = [
    # Scene 1: 01-lighting-the-world.png
    {
        "scene": 1,
        "image": "images/tesla-hidden-lives/01-lighting-the-world.png",
        "phrases": [
            {
                "text": "Nikola Tesla là người phát minh ra dòng điện xoay chiều,",
                "keywords": ["phát minh", "dòng điện xoay chiều"]
            },
            {
                "text": "thứ đang thắp sáng ngôi nhà bạn ngay lúc này.",
                "keywords": ["thắp sáng", "ngôi nhà bạn"]
            },
            {
                "text": "Nhưng đời tư của ông thì...",
                "keywords": ["đời tư của ông"]
            },
            {
                "text": "kỳ lạ hơn bất kỳ phát minh nào ông từng làm ra.",
                "keywords": ["kỳ lạ hơn", "bất kỳ phát minh"]
            }
        ]
    },

    # Scene 2: 02-obsessive-handwashing.png
    {
        "scene": 2,
        "image": "images/tesla-hidden-lives/02-obsessive-handwashing.png",
        "phrases": [
            {
                "text": "Đầu tiên, Tesla mắc chứng sợ vi khuẩn nặng đến mức ám ảnh.",
                "keywords": ["sợ vi khuẩn", "ám ảnh"]
            },
            {
                "text": "Ông rửa tay liên tục,",
                "keywords": ["rửa tay liên tục"]
            }
        ]
    },

    # Scene 3: 03-eighteen-towels.png
    {
        "scene": 3,
        "image": "images/tesla-hidden-lives/03-eighteen-towels.png",
        "phrases": [
            {
                "text": "ở khách sạn thì yêu cầu đúng 18 chiếc khăn sạch mỗi ngày,",
                "keywords": ["18 chiếc khăn sạch"]
            },
            {
                "text": "và tuyệt đối không bao giờ bắt tay ai.",
                "keywords": ["không bao giờ bắt tay"]
            },
            {
                "text": "Bạn nghĩ đồng nghiệp bạn khó tính?",
                "keywords": ["đồng nghiệp khó tính"]
            },
            {
                "text": "Gặp Tesla đi.",
                "keywords": ["Gặp Tesla đi"]
            }
        ]
    },

    # Scene 4: 04-rule-of-three.png
    {
        "scene": 4,
        "image": "images/tesla-hidden-lives/04-rule-of-three.png",
        "phrases": [
            {
                "text": "Ông còn cực kỳ ám ảnh với con số 3.",
                "keywords": ["ám ảnh với con số 3"]
            },
            {
                "text": "Mọi thứ ông làm đều phải chia hết cho 3 —",
                "keywords": ["chia hết cho 3"]
            },
            {
                "text": "đi bộ quanh tòa nhà đúng 3 vòng trước khi vào,",
                "keywords": ["đúng 3 vòng"]
            },
            {
                "text": "ở phòng khách sạn phải mang số chia hết cho 3,",
                "keywords": ["số chia hết cho 3"]
            }
        ]
    },

    # Scene 5: 05-measuring-food-volume.png
    {
        "scene": 5,
        "image": "images/tesla-hidden-lives/05-measuring-food-volume.png",
        "phrases": [
            {
                "text": "thậm chí tính lượng thức ăn bằng thể tích",
                "keywords": ["lượng thức ăn", "thể tích"]
            },
            {
                "text": "thay vì nhìn hình dạng món ăn,",
                "keywords": ["hình dạng món ăn"]
            },
            {
                "text": "vì ông ghét... nhìn thấy tóc hay bụi trên đồ ăn.",
                "keywords": ["ghét nhìn thấy tóc hay bụi"]
            }
        ]
    },

    # Scene 6: 06-white-dove-love.png
    {
        "scene": 6,
        "image": "images/tesla-hidden-lives/06-white-dove-love.png",
        "phrases": [
            {
                "text": "Và đây là chuyện tình duy nhất mà lịch sử ghi lại về ông:",
                "keywords": ["chuyện tình duy nhất"]
            },
            {
                "text": "Tesla không hề kết hôn, không hề có người yêu chính thức,",
                "keywords": ["không hề kết hôn", "người yêu chính thức"]
            },
            {
                "text": "nhưng ông có một mối quan hệ cực kỳ sâu đậm",
                "keywords": ["mối quan hệ cực kỳ sâu đậm"]
            },
            {
                "text": "với... một con bồ câu trắng.",
                "keywords": ["con bồ câu trắng"]
            },
            {
                "text": "Ông cho nó ăn mỗi ngày, gọi nó là tình yêu của đời mình,",
                "keywords": ["tình yêu của đời mình"]
            }
        ]
    },

    # Scene 7: 07-lost-dove.png
    {
        "scene": 7,
        "image": "images/tesla-hidden-lives/07-lost-dove.png",
        "phrases": [
            {
                "text": "và khi nó chết,",
                "keywords": ["khi nó chết"]
            },
            {
                "text": "Tesla nói rằng ông cảm thấy như vừa mất đi một phần bản thân.",
                "keywords": ["mất đi một phần bản thân"]
            }
        ]
    },

    # Scene 8: 08-war-of-currents.png
    {
        "scene": 8,
        "image": "images/tesla-hidden-lives/08-war-of-currents.png",
        "phrases": [
            {
                "text": "Về sự nghiệp, Tesla có cuộc chiến huyền thoại với Thomas Edison —",
                "keywords": ["cuộc chiến huyền thoại", "Thomas Edison"]
            },
            {
                "text": "gọi là 'Cuộc chiến dòng điện'.",
                "keywords": ["Cuộc chiến dòng điện"]
            },
            {
                "text": "Edison ủng hộ dòng điện một chiều,",
                "keywords": ["dòng điện một chiều"]
            },
            {
                "text": "Tesla ủng hộ dòng điện xoay chiều,",
                "keywords": ["dòng điện xoay chiều"]
            }
        ]
    },

    # Scene 9: 09-electricity-fear-campaign.png
    {
        "scene": 9,
        "image": "images/tesla-hidden-lives/09-electricity-fear-campaign.png",
        "phrases": [
            {
                "text": "và để chứng minh dòng điện xoay chiều nguy hiểm,",
                "keywords": ["chứng minh", "nguy hiểm"]
            },
            {
                "text": "Edison công khai... giật điện chết voi trước công chúng.",
                "keywords": ["giật điện chết voi"]
            }
        ]
    },

    # Scene 10: 10-safe-electricity-stage.png
    {
        "scene": 10,
        "image": "images/tesla-hidden-lives/10-safe-electricity-stage.png",
        "phrases": [
            {
                "text": "Tesla thì đáp trả bằng cách",
                "keywords": ["Tesla đáp trả"]
            },
            {
                "text": "tự cho dòng điện xoay chiều chạy qua chính cơ thể mình",
                "keywords": ["chạy qua chính cơ thể"]
            },
            {
                "text": "trên sân khấu để chứng minh nó an toàn.",
                "keywords": ["chứng minh nó an toàn"]
            }
        ]
    },

    # Scene 11: 11-eccentric-final-years.png
    {
        "scene": 11,
        "image": "images/tesla-hidden-lives/11-eccentric-final-years.png",
        "phrases": [
            {
                "text": "Cuối đời, Tesla sống gần như ẩn dật trong một phòng khách sạn,",
                "keywords": ["sống gần như ẩn dật"]
            },
            {
                "text": "nợ nần chồng chất,",
                "keywords": ["nợ nần chồng chất"]
            },
            {
                "text": "tin rằng mình đã phát minh ra tia laser huỷ diệt",
                "keywords": ["tia laser huỷ diệt"]
            },
            {
                "text": "và máy liên lạc với người ngoài hành tinh.",
                "keywords": ["người ngoài hành tinh"]
            }
        ]
    },

    # Scene 12: 12-lit-world-lonely-end.png
    {
        "scene": 12,
        "image": "images/tesla-hidden-lives/12-lit-world-lonely-end.png",
        "phrases": [
            {
                "text": "Ông qua đời trong nghèo khó, một mình,",
                "keywords": ["nghèo khó, một mình"]
            },
            {
                "text": "dù những phát minh của ông đang thắp sáng cả thế giới ngoài kia.",
                "keywords": ["thắp sáng cả thế giới"]
            },
            {
                "text": "Người đàn ông sợ vi khuẩn, yêu một con chim,",
                "keywords": ["sợ vi khuẩn", "yêu một con chim"]
            },
            {
                "text": "và suýt thay đổi cả thế giới điện —",
                "keywords": ["thay đổi cả thế giới điện"]
            },
            {
                "text": "đó chính là Nikola Tesla.",
                "keywords": ["Nikola Tesla"]
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
    print("PERFECT 100% MATCH: 394 words == 394 tokens!")
