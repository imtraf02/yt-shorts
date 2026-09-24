import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('whisper_chaplin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

# 1. Merge lôn + đôn into London
tokens_pass1 = []
i = 0
while i < len(tokens):
    if i + 1 < len(tokens) and 'lôn' in tokens[i]['text'].lower() and 'đôn' in tokens[i+1]['text'].lower():
        tokens_pass1.append({
            'text': 'London.',
            'startMs': tokens[i]['startMs'],
            'endMs': tokens[i+1]['endMs'],
            'timestampMs': tokens[i]['timestampMs'],
            'confidence': (tokens[i]['confidence'] + tokens[i+1]['confidence']) / 2
        })
        i += 2
    else:
        tokens_pass1.append(tokens[i])
        i += 1

# 2. Expand ZMF (ria mép) and T-Tramp (The Tramp)
tokens_pass2 = []
for t in tokens_pass1:
    txt = t['text'].strip()
    if 'zmf' in txt.lower():
        mid = (t['startMs'] + t['endMs']) // 2
        tokens_pass2.append({
            'text': 'ria',
            'startMs': t['startMs'],
            'endMs': mid,
            'timestampMs': t['startMs'],
            'confidence': t['confidence']
        })
        tokens_pass2.append({
            'text': 'mép',
            'startMs': mid,
            'endMs': t['endMs'],
            'timestampMs': mid,
            'confidence': t['confidence']
        })
    elif 'tramp' in txt.lower() and ('t-tramp' in txt.lower() or 'the' not in txt.lower()):
        # Split into The and Tramp
        t_start = t['startMs']
        t_end = t['endMs']
        split_point = t_start + int((t_end - t_start) * 0.35)
        tokens_pass2.append({
            'text': 'The',
            'startMs': t_start,
            'endMs': split_point,
            'timestampMs': t_start,
            'confidence': t['confidence']
        })
        tokens_pass2.append({
            'text': 'Tramp',
            'startMs': split_point,
            'endMs': t_end,
            'timestampMs': split_point,
            'confidence': t['confidence']
        })
    else:
        tokens_pass2.append(t)

script_text = """
Charlie Chaplin là vua hài câm huyền thoại, khiến cả thế giới cười mà không cần nói một lời. Nhưng đời thật của ông lại chẳng hài hước chút nào.

Ông lớn lên trong nghèo đói cùng cực ở London. Mẹ bị bệnh tâm thần, phải vào trại tế bần, còn cậu bé Chaplin tự bươn chải trên đường phố từ rất nhỏ. Người sau này giàu có bậc nhất Hollywood từng không có nổi bữa ăn no thời thơ ấu.

Bộ ria mép và chiếc gậy huyền thoại của 'The Tramp' thực ra chỉ là trang phục ông mặc vội trong vài phút trước khi quay, không hề có kế hoạch. Ghép ngẫu nhiên vài món đồ không ăn khớp, và nhân vật biểu tượng nhất lịch sử điện ảnh ra đời như vậy.

Chi tiết gây sốc nhất: Chaplin kết hôn 4 lần, nhiều cuộc hôn nhân vướng tranh cãi vì chênh lệch tuổi tác lớn. Cuộc hôn nhân cuối, ông 54 tuổi còn vợ mới 18 — trớ trêu thay, lại là cuộc hôn nhân hạnh phúc và bền lâu nhất đời ông.

Chaplin còn bị FBI theo dõi nhiều năm vì nghi ngờ liên hệ cộng sản. Năm 1952, chính phủ Mỹ thu hồi giấy phép nhập cảnh khi ông đang trên tàu sang châu Âu — vua hài của Hollywood bị chính Hollywood đá văng không thương tiếc.

Từ đứa trẻ đói khát ở London, đến biểu tượng điện ảnh toàn cầu, rồi bị chính nước Mỹ trục xuất — cuộc đời Charlie Chaplin chứng minh: người khiến cả thế giới cười, lại sống một cuộc đời chẳng hề dễ dàng.
"""

script_words = [w for w in re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text).split() if w]

print(f"Refined tokens: {len(tokens_pass2)}")
print(f"Script words: {len(script_words)}")

with open('scripts/chaplin_perfect_comparison.txt', 'w', encoding='utf-8') as f:
    for i in range(max(len(tokens_pass2), len(script_words))):
        t = tokens_pass2[i]['text'] if i < len(tokens_pass2) else "---"
        t_ms = f"{tokens_pass2[i]['startMs']}-{tokens_pass2[i]['endMs']}" if i < len(tokens_pass2) else ""
        s = script_words[i] if i < len(script_words) else "---"
        f.write(f"{i:3d}: token='{t:15s}' ({t_ms:12s}) | script='{s}'\n")

# Save refined tokens
with open('whisper_chaplin_aligned_tokens.json', 'w', encoding='utf-8') as f:
    json.dump(tokens_pass2, f, ensure_ascii=False, indent=2)

print("Saved refined tokens to whisper_chaplin_aligned_tokens.json")
