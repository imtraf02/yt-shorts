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
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

with open('scripts/qin_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/qin_comparison.txt")
