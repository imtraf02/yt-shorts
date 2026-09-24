import json
import re
import sys
import unicodedata
from difflib import SequenceMatcher

sys.stdout.reconfigure(encoding='utf-8')

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()

def is_similar(w1, w2):
    n1 = strip_accents(re.sub(r'[^\w]', '', w1))
    n2 = strip_accents(re.sub(r'[^\w]', '', w2))
    if n1 == n2 or n1 in n2 or n2 in n1:
        return True
    return SequenceMatcher(None, n1, n2).ratio() > 0.55

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

script_words = [w for w in re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text).split() if w]

with open('scripts/caligula_side_by_side.txt', 'w', encoding='utf-8') as f:
    for i in range(max(len(tokens), len(script_words))):
        t = tokens[i]['text'] if i < len(tokens) else "---"
        t_ms = f"{tokens[i]['startMs']}-{tokens[i]['endMs']}" if i < len(tokens) else ""
        s = script_words[i] if i < len(script_words) else "---"
        f.write(f"{i:3d}: whisper={t:15s} ({t_ms:12s}) | script={s}\n")

print(f"Tokens: {len(tokens)}, Script words: {len(script_words)}")

t_i = 0
s_i = 0
while t_i < len(tokens) and s_i < len(script_words):
    tw = tokens[t_i]['text'].strip()
    sw = script_words[s_i].strip()
    
    if is_similar(tw, sw):
        t_i += 1
        s_i += 1
    else:
        print(f"Mismatch at token {t_i} ('{tw}') vs script {s_i} ('{sw}')")
        print("Upcoming tokens:", [tokens[x]['text'].strip() for x in range(t_i, min(len(tokens), t_i+5))])
        print("Upcoming script:", script_words[s_i:s_i+5])
        # Lookahead
        if s_i + 1 < len(script_words) and is_similar(tw, script_words[s_i+1]):
            print(f"-> Script has extra word '{sw}'")
            s_i += 1
        elif t_i + 1 < len(tokens) and is_similar(tokens[t_i+1]['text'].strip(), sw):
            print(f"-> Whisper has extra token '{tw}'")
            t_i += 1
        else:
            break

print(f"End check: t_i={t_i}/{len(tokens)}, s_i={s_i}/{len(script_words)}")
