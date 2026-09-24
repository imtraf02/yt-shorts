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

with open('whisper_chaplin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

# Merge lôn + đôn into London
merged_tokens = []
i = 0
while i < len(tokens):
    if i + 1 < len(tokens) and 'lôn' in tokens[i]['text'].lower() and 'đôn' in tokens[i+1]['text'].lower():
        merged_tokens.append({
            'text': 'London.',
            'startMs': tokens[i]['startMs'],
            'endMs': tokens[i+1]['endMs'],
            'timestampMs': tokens[i]['timestampMs'],
            'confidence': (tokens[i]['confidence'] + tokens[i+1]['confidence']) / 2
        })
        i += 2
    else:
        merged_tokens.append(tokens[i])
        i += 1

script_text = """
Charlie Chaplin là vua hài câm huyền thoại, khiến cả thế giới cười mà không cần nói một lời. Nhưng đời thật của ông lại chẳng hài hước chút nào.

Ông lớn lên trong nghèo đói cùng cực ở London. Mẹ bị bệnh tâm thần, phải vào trại tế bần, còn cậu bé Chaplin tự bươn chải trên đường phố từ rất nhỏ. Người sau này giàu có bậc nhất Hollywood từng không có nổi bữa ăn no thời thơ ấu.

Bộ ria mép và chiếc gậy huyền thoại của 'The Tramp' thực ra chỉ là trang phục ông mặc vội trong vài phút trước khi quay, không hề có kế hoạch. Ghép ngẫu nhiên vài món đồ không ăn khớp, và nhân vật biểu tượng nhất lịch sử điện ảnh ra đời như vậy.

Chi tiết gây sốc nhất: Chaplin kết hôn 4 lần, nhiều cuộc hôn nhân vướng tranh cãi vì chênh lệch tuổi tác lớn. Cuộc hôn nhân cuối, ông 54 tuổi còn vợ mới 18 — trớ trêu thay, lại là cuộc hôn nhân hạnh phúc và bền lâu nhất đời ông.

Chaplin còn bị FBI theo dõi nhiều năm vì nghi ngờ liên hệ cộng sản. Năm 1952, chính phủ Mỹ thu hồi giấy phép nhập cảnh khi ông đang trên tàu sang châu Âu — vua hài của Hollywood bị chính Hollywood đá văng không thương tiếc.

Từ đứa trẻ đói khát ở London, đến biểu tượng điện ảnh toàn cầu, rồi bị chính nước Mỹ trục xuất — cuộc đời Charlie Chaplin chứng minh: người khiến cả thế giới cười, lại sống một cuộc đời chẳng hề dễ dàng.
"""

script_words = [w for w in re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text).split() if w]

t_i = 0
s_i = 0
while t_i < len(merged_tokens) and s_i < len(script_words):
    tw = merged_tokens[t_i]['text'].strip()
    sw = script_words[s_i].strip()
    
    if is_similar(tw, sw):
        t_i += 1
        s_i += 1
    else:
        print(f"Mismatch at token {t_i} ('{tw}') vs script {s_i} ('{sw}')")
        print("Upcoming tokens:", [merged_tokens[x]['text'].strip() for x in range(t_i, min(len(merged_tokens), t_i+5))])
        print("Upcoming script:", script_words[s_i:s_i+5])
        # Try lookahead
        if s_i + 1 < len(script_words) and is_similar(tw, script_words[s_i+1]):
            print(f"Skipping script word '{sw}'")
            s_i += 1
        elif t_i + 1 < len(merged_tokens) and is_similar(merged_tokens[t_i+1]['text'].strip(), sw):
            print(f"Skipping token '{tw}'")
            t_i += 1
        else:
            break

print(f"Final check: t_i={t_i}/{len(merged_tokens)}, s_i={s_i}/{len(script_words)}")
