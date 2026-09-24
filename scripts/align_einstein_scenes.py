import json
import re

with open('whisper_einstein_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

scenes_def = [
    # Scene 1: 01-changing-the-universe.png
    {
        "scene": 1,
        "image": "images/einstein-quirks/01-changing-the-universe.png",
        "phrases": [
            {
                "text": "Albert Einstein —",
                "keywords": ["Albert Einstein"]
            },
            {
                "text": "người phát minh ra thuyết tương đối,",
                "keywords": ["thuyết tương đối"]
            },
            {
                "text": "thay đổi cách nhân loại hiểu về không gian và thời gian.",
                "keywords": ["không gian", "thời gian"]
            },
            {
                "text": "Nhưng ngoài đời, ông lại là kiểu người",
                "keywords": ["ngoài đời"]
            },
            {
                "text": "quên mang chìa khóa nhà mình",
                "keywords": ["quên mang chìa khóa"]
            },
            {
                "text": "thường xuyên đến mức đáng báo động.",
                "keywords": ["đáng báo động"]
            }
        ]
    },

    # Scene 2: 02-forgot-home-address.png
    {
        "scene": 2,
        "image": "images/einstein-quirks/02-forgot-home-address.png",
        "phrases": [
            {
                "text": "Đúng vậy, bộ não vĩ đại nhất thế kỷ 20",
                "keywords": ["bộ não vĩ đại nhất"]
            },
            {
                "text": "lại sở hữu trí nhớ tệ không tưởng cho những chuyện đời thường.",
                "keywords": ["trí nhớ tệ", "đời thường"]
            },
            {
                "text": "Einstein từng quên hẳn địa chỉ nhà mình,",
                "keywords": ["quên hẳn địa chỉ nhà"]
            },
            {
                "text": "đến mức phải gọi điện cho văn phòng của chính ông",
                "keywords": ["gọi điện cho văn phòng"]
            },
            {
                "text": "để hỏi... ông sống ở đâu.",
                "keywords": ["ông sống ở đâu"]
            }
        ]
    },

    # Scene 3: 03-genius-forgets-house-number.png
    {
        "scene": 3,
        "image": "images/einstein-quirks/03-genius-forgets-house-number.png",
        "phrases": [
            {
                "text": "Bộ não tính ra được năng lượng bằng khối lượng",
                "keywords": ["năng lượng bằng khối lượng"]
            },
            {
                "text": "nhân bình phương vận tốc ánh sáng,",
                "keywords": ["vận tốc ánh sáng"]
            },
            {
                "text": "nhưng lại không nhớ nổi số nhà.",
                "keywords": ["không nhớ nổi số nhà"]
            }
        ]
    },

    # Scene 4: 04-no-socks.png
    {
        "scene": 4,
        "image": "images/einstein-quirks/04-no-socks.png",
        "phrases": [
            {
                "text": "Ông còn nổi tiếng ghét đi tất.",
                "keywords": ["ghét đi tất"]
            },
            {
                "text": "Đúng nghĩa đen —",
                "keywords": ["Đúng nghĩa đen"]
            },
            {
                "text": "Einstein từ chối mang tất suốt phần lớn cuộc đời trưởng thành,",
                "keywords": ["từ chối mang tất"]
            },
            {
                "text": "kể cả trong những dịp trang trọng.",
                "keywords": ["dịp trang trọng"]
            }
        ]
    },

    # Scene 5: 05-sock-hole-solution.png
    {
        "scene": 5,
        "image": "images/einstein-quirks/05-sock-hole-solution.png",
        "phrases": [
            {
                "text": "Lý do ông đưa ra đơn giản đến mức ngớ ngẩn:",
                "keywords": ["đơn giản đến mức ngớ ngẩn"]
            },
            {
                "text": "ông ghét cảm giác ngón chân cái chọc thủng lỗ tất theo thời gian,",
                "keywords": ["chọc thủng lỗ tất"]
            },
            {
                "text": "nên quyết định cắt bỏ vấn đề tận gốc —",
                "keywords": ["cắt bỏ vấn đề tận gốc"]
            },
            {
                "text": "không mang tất nữa là xong.",
                "keywords": ["không mang tất nữa"]
            }
        ]
    },

    # Scene 6: 06-legendary-messy-hair.png
    {
        "scene": 6,
        "image": "images/einstein-quirks/06-legendary-messy-hair.png",
        "phrases": [
            {
                "text": "Về tóc, chắc bạn từng thấy bức ảnh Einstein",
                "keywords": ["bức ảnh Einstein"]
            },
            {
                "text": "với mái tóc bạc dựng đứng huyền thoại.",
                "keywords": ["mái tóc bạc dựng đứng"]
            },
            {
                "text": "Sự thật là ông gần như không bao giờ chải tóc,",
                "keywords": ["không bao giờ chải tóc"]
            }
        ]
    },

    # Scene 7: 07-physics-over-grooming.png
    {
        "scene": 7,
        "image": "images/einstein-quirks/07-physics-over-grooming.png",
        "phrases": [
            {
                "text": "và khi được hỏi tại sao,",
                "keywords": ["khi được hỏi"]
            },
            {
                "text": "ông trả lời rằng cắt tóc và chải đầu là 'lãng phí thời gian quý báu'",
                "keywords": ["lãng phí thời gian"]
            },
            {
                "text": "có thể dùng để suy nghĩ về vũ trụ.",
                "keywords": ["suy nghĩ về vũ trụ"]
            },
            {
                "text": "Tóc rối là cái giá ông sẵn sàng trả",
                "keywords": ["cái giá sẵn sàng trả"]
            },
            {
                "text": "để dành thời gian cho vật lý.",
                "keywords": ["thời gian cho vật lý"]
            }
        ]
    },

    # Scene 8: 08-presidential-invitation.png
    {
        "scene": 8,
        "image": "images/einstein-quirks/08-presidential-invitation.png",
        "phrases": [
            {
                "text": "Đây là chi tiết ít ai biết:",
                "keywords": ["chi tiết ít ai biết"]
            },
            {
                "text": "Einstein từng được mời làm Tổng thống Israel vào năm 1952,",
                "keywords": ["Tổng thống Israel", "1952"]
            },
            {
                "text": "sau khi vị tổng thống đầu tiên qua đời.",
                "keywords": ["tổng thống đầu tiên qua đời"]
            }
        ]
    },

    # Scene 9: 09-equations-over-politics.png
    {
        "scene": 9,
        "image": "images/einstein-quirks/09-equations-over-politics.png",
        "phrases": [
            {
                "text": "Ông từ chối thẳng thừng,",
                "keywords": ["từ chối thẳng thừng"]
            },
            {
                "text": "nói rằng mình không có năng khiếu xử lý con người,",
                "keywords": ["không có năng khiếu"]
            },
            {
                "text": "và thành thật hơn là ông thích phương trình hơn chính trị rất nhiều.",
                "keywords": ["thích phương trình hơn chính trị"]
            }
        ]
    },

    # Scene 10: 10-first-exam-setback.png
    {
        "scene": 10,
        "image": "images/einstein-quirks/10-first-exam-setback.png",
        "phrases": [
            {
                "text": "Và một sự thật gây sốc:",
                "keywords": ["sự thật gây sốc"]
            },
            {
                "text": "Einstein thi trượt kỳ thi tuyển sinh đại học lần đầu tiên.",
                "keywords": ["thi trượt đại học", "lần đầu tiên"]
            }
        ]
    },

    # Scene 11: 11-strengths-and-blindspots.png
    {
        "scene": 11,
        "image": "images/einstein-quirks/11-strengths-and-blindspots.png",
        "phrases": [
            {
                "text": "Không phải vì môn toán hay vật lý —",
                "keywords": ["môn toán", "vật lý"]
            },
            {
                "text": "ông xuất sắc ở hai môn đó —",
                "keywords": ["xuất sắc"]
            },
            {
                "text": "mà vì ông trượt các môn còn lại",
                "keywords": ["trượt các môn còn lại"]
            },
            {
                "text": "như ngôn ngữ và lịch sử tự nhiên.",
                "keywords": ["ngôn ngữ", "lịch sử tự nhiên"]
            },
            {
                "text": "Người sau này định nghĩa lại cả vũ trụ",
                "keywords": ["định nghĩa lại cả vũ trụ"]
            },
            {
                "text": "lại từng bị một kỳ thi đại học đánh gục.",
                "keywords": ["bị kỳ thi đánh gục"]
            }
        ]
    },

    # Scene 12: 12-messy-science-genius.png
    {
        "scene": 12,
        "image": "images/einstein-quirks/12-messy-science-genius.png",
        "phrases": [
            {
                "text": "Bộ não tính ra thuyết tương đối,",
                "keywords": ["thuyết tương đối"]
            },
            {
                "text": "nhưng quên địa chỉ nhà,",
                "keywords": ["quên địa chỉ nhà"]
            },
            {
                "text": "ghét tất,",
                "keywords": ["ghét tất"]
            },
            {
                "text": "và từng trượt đại học —",
                "keywords": ["từng trượt đại học"]
            },
            {
                "text": "đó chính là Albert Einstein,",
                "keywords": ["Albert Einstein"]
            },
            {
                "text": "thiên tài lộn xộn nhất lịch sử khoa học.",
                "keywords": ["thiên tài lộn xộn nhất"]
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
    print("PERFECT 100% MATCH: 416 words == 416 tokens!")
