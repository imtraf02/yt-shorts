import json
import re

with open('whisper_busy_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Bạn dọn bàn làm việc sạch bong, sắp xếp lại email theo màu, trả lời 20 tin nhắn không quan trọng — tất cả trước khi động vào cái báo cáo quan trọng đang treo lơ lửng từ 3 ngày trước. Chúc mừng, bạn vừa mắc hội chứng giả vờ bận rộn.

Đây là cách nó hoạt động: não bạn cực kỳ giỏi phân biệt "bận" và "hiệu quả" — chỉ có điều nó cố tình lờ đi sự khác biệt đó, vì cảm giác hoàn thành việc nhỏ sướng hơn nhiều so với đối mặt việc lớn đáng sợ.

Dọn bàn xong, bạn có cảm giác "à mình vừa làm được gì đó" — não tiết ra một chút dopamine, y hệt như vừa hoàn thành việc thật sự. Vấn đề là báo cáo kia thì vẫn nằm y nguyên, còn deadline thì đang xích lại gần hơn từng phút.

Đây mới là phần buồn cười: càng nhiều việc nhỏ giả vờ bận rộn, bạn càng có lý do chính đáng để nói "hôm nay mình bận lắm" — mà không ai, kể cả chính bạn, chất vấn được điều đó. Bận rộn giả vờ là vỏ bọc hoàn hảo, vì nhìn từ ngoài, nó giống hệt bận rộn thật.

Cách nhận diện: nếu việc bạn đang làm có thể bị hoãn vô thời hạn mà chẳng ai chết vì nó — kiểu sắp xếp lại thư mục file lần thứ 5 trong tháng — thì khả năng cao đó không phải công việc, đó là trốn việc mặc áo giáp công việc.

Cách thoát: trước khi làm bất cứ việc nhỏ nào, tự hỏi một câu duy nhất — 'việc này có đang né việc quan trọng nhất trong ngày không?' Nếu câu trả lời là có, đóng hết tab, quay lại việc lớn, dù nó đáng sợ đến mấy.

Bận rộn không phải thành tích. Làm đúng việc quan trọng mới là thành tích.
"""

# Let's clean script words
clean_script = re.sub(r'[,.…!—:?\'"“”]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

# Compare side-by-side
with open('scripts/busy_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/busy_comparison.txt")
