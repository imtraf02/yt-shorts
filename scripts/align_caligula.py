import json
import re

with open('whisper_caligula_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Caligula lên ngôi Hoàng đế La Mã ở tuổi 24, và trong vài tháng đầu, dân chúng thực sự yêu quý ông — cho đến khi mọi thứ đi chệch hướng theo cách không ai đoán trước được.

Trước hết, cái tên 'Caligula' thực ra không phải tên thật của ông. Đó là biệt danh nghĩa là 'đôi bốt nhỏ' — do binh lính đặt cho ông từ khi còn bé, vì ông hay mặc một bộ đồng phục lính thu nhỏ, kèm đôi bốt tí hon, đi loanh quanh doanh trại của cha mình. Vị hoàng đế khét tiếng tàn bạo bậc nhất lịch sử, hóa ra lại có biệt danh đáng yêu như một đứa trẻ.

Chuyện nổi tiếng nhất về Caligula là ông định phong con ngựa cưng của mình, tên là Incitatus, làm quan chấp chính — chức vụ chính trị cao cấp bậc nhất La Mã. Con ngựa này được cho ở trong một chuồng ngựa bằng đá cẩm thạch, có máng ăn bằng ngà voi, và thậm chí có cả... người hầu riêng. Sử gia vẫn tranh cãi liệu đây là sự thật hay chỉ là cách Caligula châm biếm chính giới quý tộc La Mã, nhưng dù thế nào, câu chuyện cũng đủ hoang đường để đi vào lịch sử.

Caligula còn tự xưng mình là thần sống, và ra lệnh xây tượng của chính mình đặt cạnh tượng các vị thần La Mã để dân chúng thờ cúng. Ông thậm chí từng ra lệnh chặt đầu tượng thần Zeus tại Hy Lạp và thay bằng đầu của chính mình — một hành động khiến cả giới tư tế lẫn dân chúng đều choáng váng.

Một câu chuyện khác kể rằng Caligula từng tuyên chiến với... biển cả. Ông dẫn quân đến bờ biển Eo biển Manche, ra lệnh binh lính giơ giáo tấn công những con sóng, rồi bắt họ nhặt vỏ sò mang về như chiến lợi phẩm — coi đó là chiến thắng vẻ vang trước thần biển Neptune.

Cuối cùng, sau chưa đầy 4 năm trị vì đầy rẫy những quyết định kỳ lạ, Caligula bị chính đội cận vệ của mình ám sát ngay trong cung điện — khép lại triều đại của một trong những hoàng đế gây tranh cãi và khó đoán nhất lịch sử La Mã.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

with open('scripts/caligula_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/caligula_comparison.txt")
