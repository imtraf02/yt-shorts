import json
import re

with open('whisper_qin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Tần Thủy Hoàng là vị hoàng đế đầu tiên thống nhất Trung Hoa, người đặt nền móng cho cả một đế chế kéo dài hơn 2000 năm sau đó. Nhưng nỗi ám ảnh lớn nhất đời ông lại không phải chinh chiến hay quyền lực — mà là... cái chết.

Ông sợ chết đến mức điên cuồng tìm kiếm thuốc trường sinh bất tử suốt phần lớn cuộc đời làm hoàng đế. Ông cử hàng ngàn người, trong đó có cả đoàn thám hiểm hàng trăm nam nữ thanh niên, ra khơi tìm 'tiên đảo' huyền thoại để lấy linh dược — và không ai trong số họ từng quay trở lại.

Trớ trêu thay, chính nỗi sợ chết đó lại giết chết ông. Để tìm thuốc trường sinh, các ngự y đã cho ông uống những viên thuốc chứa thủy ngân, tin rằng thứ kim loại lỏng lánh bạc đó mang lại sự bất tử. Tần Thủy Hoàng qua đời ở tuổi 49 vì chính ngộ độc thủy ngân — người sợ chết nhất lại chết vì chính phương thuốc chống lại cái chết.

Về đội quân đất nung nổi tiếng, ít ai biết rằng hơn 8000 bức tượng binh lính đó ban đầu được sơn màu sắc sặc sỡ, rực rỡ như người thật, chứ không phải màu đất nung xám xịt như chúng ta thấy ngày nay. Lớp sơn đã phai mờ qua hơn 2000 năm chôn vùi dưới lòng đất.

Tần Thủy Hoàng còn cho xây cả một lăng mộ khổng lồ với sông suối bằng thủy ngân lỏng thật, mô phỏng lại bản đồ đế chế của mình, được thiết kế với bẫy nỏ tự động để ngăn kẻ trộm mộ xâm nhập. Đến nay, các nhà khảo cổ vẫn chưa dám khai quật toàn bộ lăng mộ vì lượng thủy ngân độc hại được cho là vẫn còn tồn tại bên trong.

Và một sự thật gây sốc khác: Tần Thủy Hoàng ra lệnh đốt hầu hết sách vở trong nước và chôn sống hàng trăm học giả, chỉ vì họ dám chỉ trích hoặc đưa ra tư tưởng trái với triều đình — một trong những cuộc thanh trừng tri thức khét tiếng nhất lịch sử nhân loại.

Người đàn ông thống nhất cả một đế chế, xây Vạn Lý Trường Thành, nhưng lại chết vì chính nỗi sợ chết của mình — đó chính là Tần Thủy Hoàng.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text)
words = [w for w in clean_script.split() if w]
print(f"Total script words: {len(words)}")
print(f"Total whisper tokens: {len(tokens)}")

# Now construct the 401 aligned tokens
aligned_tokens = []
w_idx = 0
for t_idx, tok in enumerate(tokens):
    if t_idx == 25: # ' 2005' (4520-5120ms) -> '2000' and 'năm'
        aligned_tokens.append({'text': words[w_idx], 'startMs': tok['startMs'], 'endMs': tok['startMs'] + 300})
        w_idx += 1
        aligned_tokens.append({'text': words[w_idx], 'startMs': tok['startMs'] + 300, 'endMs': tok['endMs']})
        w_idx += 1
    elif t_idx == 118: # ' "ZChết' (25470-25820ms) -> 'giết' and 'chết'
        aligned_tokens.append({'text': words[w_idx], 'startMs': tok['startMs'], 'endMs': tok['startMs'] + 170})
        w_idx += 1
        aligned_tokens.append({'text': words[w_idx], 'startMs': tok['startMs'] + 170, 'endMs': tok['endMs']})
        w_idx += 1
    elif t_idx == 126: # ' người' (27530-28010ms) -> 'ngự' and 'y'
        aligned_tokens.append({'text': words[w_idx], 'startMs': tok['startMs'], 'endMs': tok['startMs'] + 240})
        w_idx += 1
        aligned_tokens.append({'text': words[w_idx], 'startMs': tok['startMs'] + 240, 'endMs': tok['endMs']})
        w_idx += 1
    else:
        aligned_tokens.append({'text': words[w_idx], 'startMs': tok['startMs'], 'endMs': tok['endMs']})
        w_idx += 1

print(f"Total aligned tokens: {len(aligned_tokens)}, w_idx final: {w_idx}")
assert len(aligned_tokens) == len(words)

# Write aligned tokens for verification
with open('scripts/aligned_tokens.json', 'w', encoding='utf-8') as f:
    json.dump(aligned_tokens, f, ensure_ascii=False, indent=2)

print("Saved scripts/aligned_tokens.json successfully!")
