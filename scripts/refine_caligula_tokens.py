import json
import re

with open('whisper_caligula_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

# Split Hilap into Hy and Lạp
tokens_aligned = []
for t in tokens:
    txt = t['text'].strip()
    if 'hilap' in txt.lower():
        t_start = t['startMs']
        t_end = t['endMs']
        mid = (t_start + t_end) // 2
        tokens_aligned.append({
            'text': 'Hy',
            'startMs': t_start,
            'endMs': mid,
            'timestampMs': t_start,
            'confidence': t['confidence']
        })
        tokens_aligned.append({
            'text': 'Lạp',
            'startMs': mid,
            'endMs': t_end,
            'timestampMs': mid,
            'confidence': t['confidence']
        })
    else:
        tokens_aligned.append(t)

script_text = """
Caligula lên ngôi Hoàng đế La Mã ở tuổi 24, và trong vài tháng đầu, dân chúng thực sự yêu quý ông — cho đến khi mọi thứ đi chệch hướng theo cách không ai đoán trước được.

Trước hết, cái tên 'Caligula' thực ra không phải tên thật của ông. Đó là biệt danh nghĩa là 'đôi bốt nhỏ' — do binh lính đặt cho ông từ khi còn bé, vì ông hay mặc một bộ đồng phục lính thu nhỏ, kèm đôi bốt tí hon, đi loanh quanh doanh trại của cha mình. Vị hoàng đế khét tiếng tàn bạo bậc nhất lịch sử, hóa ra lại có biệt danh đáng yêu như một đứa trẻ.

Chuyện nổi tiếng nhất về Caligula là ông định phong con ngựa cưng của mình, tên là Incitatus, làm quan chấp chính — chức vụ chính trị cao cấp bậc nhất La Mã. Con ngựa này được cho ở trong một chuồng ngựa bằng đá cẩm thạch, có máng ăn bằng ngà voi, và thậm chí có cả... người hầu riêng. Sử gia vẫn tranh cãi liệu đây là sự thật hay chỉ là cách Caligula châm biếm chính giới quý tộc La Mã, nhưng dù thế nào, câu chuyện cũng đủ hoang đường để đi vào lịch sử.

Caligula còn tự xưng mình là thần sống, và ra lệnh xây tượng của chính mình đặt cạnh tượng các vị thần La Mã để dân chúng thờ cúng. Ông thậm chí từng ra lệnh chặt đầu tượng thần Zeus tại Hy Lạp và thay bằng đầu của chính mình — một hành động khiến cả giới tư tế lẫn dân chúng đều choáng váng.

Một câu chuyện khác kể rằng Caligula từng tuyên chiến với... biển cả. Ông dẫn quân đến bờ biển Eo biển Manche, ra lệnh binh lính giơ giáo tấn công những con sóng, rồi bắt họ nhặt vỏ sò mang về như chiến lợi phẩm — coi đó là chiến thắng vẻ vang trước thần biển Neptune.

Cuối cùng, sau chưa đầy 4 năm trị vì đầy rẫy những quyết định kỳ lạ, Caligula bị chính đội cận vệ của mình ám sát ngay trong cung điện — khép lại triều đại của một trong những hoàng đế gây tranh cãi và khó đoán nhất lịch sử La Mã.
"""

script_words = [w for w in re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text).split() if w]

print(f"Refined tokens: {len(tokens_aligned)}")
print(f"Script words: {len(script_words)}")

with open('scripts/caligula_perfect_comparison.txt', 'w', encoding='utf-8') as f:
    for i in range(max(len(tokens_aligned), len(script_words))):
        t = tokens_aligned[i]['text'] if i < len(tokens_aligned) else "---"
        t_ms = f"{tokens_aligned[i]['startMs']}-{tokens_aligned[i]['endMs']}" if i < len(tokens_aligned) else ""
        s = script_words[i] if i < len(script_words) else "---"
        f.write(f"{i:3d}: token='{t:15s}' ({t_ms:12s}) | script='{s}'\n")

with open('whisper_caligula_aligned_tokens.json', 'w', encoding='utf-8') as f:
    json.dump(tokens_aligned, f, ensure_ascii=False, indent=2)

print("Saved whisper_caligula_aligned_tokens.json")
