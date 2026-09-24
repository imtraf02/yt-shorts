import json
import re

with open('whisper_chaplin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Charlie Chaplin là vua hài câm huyền thoại, khiến cả thế giới cười mà không cần nói một lời. Nhưng đời thật của ông lại chẳng hài hước chút nào.

Ông lớn lên trong nghèo đói cùng cực ở London. Mẹ bị bệnh tâm thần, phải vào trại tế bần, còn cậu bé Chaplin tự bươn chải trên đường phố từ rất nhỏ. Người sau này giàu có bậc nhất Hollywood từng không có nổi bữa ăn no thời thơ ấu.

Bộ ria mép và chiếc gậy huyền thoại của 'The Tramp' thực ra chỉ là trang phục ông mặc vội trong vài phút trước khi quay, không hề có kế hoạch. Ghép ngẫu nhiên vài món đồ không ăn khớp, và nhân vật biểu tượng nhất lịch sử điện ảnh ra đời như vậy.

Chi tiết gây sốc nhất: Chaplin kết hôn 4 lần, nhiều cuộc hôn nhân vướng tranh cãi vì chênh lệch tuổi tác lớn. Cuộc hôn nhân cuối, ông 54 tuổi còn vợ mới 18 — trớ trêu thay, lại là cuộc hôn nhân hạnh phúc và bền lâu nhất đời ông.

Chaplin còn bị FBI theo dõi nhiều năm vì nghi ngờ liên hệ cộng sản. Năm 1952, chính phủ Mỹ thu hồi giấy phép nhập cảnh khi ông đang trên tàu sang châu Âu — vua hài của Hollywood bị chính Hollywood đá văng không thương tiếc.

Từ đứa trẻ đói khát ở London, đến biểu tượng điện ảnh toàn cầu, rồi bị chính nước Mỹ trục xuất — cuộc đời Charlie Chaplin chứng minh: người khiến cả thế giới cười, lại sống một cuộc đời chẳng hề dễ dàng.
"""

script_words = [w for w in re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text).split() if w]

with open('scripts/full_chaplin_side_by_side.txt', 'w', encoding='utf-8') as f:
    for i in range(max(len(tokens), len(script_words))):
        t = tokens[i]['text'] if i < len(tokens) else "---"
        t_ms = f"{tokens[i]['startMs']}-{tokens[i]['endMs']}" if i < len(tokens) else ""
        s = script_words[i] if i < len(script_words) else "---"
        f.write(f"{i:3d}: whisper={t:15s} ({t_ms:12s}) | script={s}\n")

print(f"Tokens: {len(tokens)}, Script words: {len(script_words)}")
