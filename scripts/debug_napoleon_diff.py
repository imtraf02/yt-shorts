import json
import re
import difflib

with open('whisper_napoleon_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Napoleon Bonaparte là vị hoàng đế người Pháp đã làm rung chuyển cả châu Âu, người viết lại bản đồ lục địa và để lại Bộ luật Dân sự vẫn còn ảnh hưởng đến nhiều quốc gia ngày nay. Nhưng thứ đi theo ông suốt hơn 200 năm lại không phải chiến công hay quyền lực, mà là... chiều cao.

Cả thế giới đều tin Napoleon là một ông vua lùn tì, nhưng đó là một hiểu lầm khổng lồ. Khi ông qua đời, người ta ghi chiều cao của ông là 5 pieds 2 pouces. Nghe thì giống như 1 mét 57, nhưng đó là đơn vị đo của Pháp, vốn dài hơn đơn vị của Anh. Quy đổi ra thực tế, ông cao khoảng 1 mét 68 đến 1 mét 70, thậm chí còn cao hơn mức trung bình của đàn ông Pháp thời bấy giờ.

Vậy tại sao ông lại trông nhỏ bé đến thế? Vì những vệ binh đứng cạnh ông được tuyển chọn theo chiều cao, ai cũng cao lớn vượt trội. Đứng cạnh họ, dù là ai cũng sẽ trông bé đi.

Nhưng thủ phạm lớn nhất là báo chí Anh. Các họa sĩ biếm họa như James Gillray đã vẽ ông thành "Little Boney", một chú lùn nóng nảy, hay dỗi và hay cáu. Những bức tranh đó lan truyền khắp châu Âu, và hình ảnh ấy đã in sâu vào trí nhớ của cả nhân loại suốt hai thế kỷ.

Trớ trêu thay, người đàn ông chinh phục được gần cả châu Âu lại thua đúng một trận, và là trận truyền thông. Kẻ thù không cần đánh bại ông ngoài chiến trường, họ chỉ cần một cây bút và một tờ giấy để biến ông thành trò cười mãi mãi.

Còn một giai thoại vui nữa, dù chưa được kiểm chứng chắc chắn: trong một buổi săn thỏ, những con thỏ được chuẩn bị sẵn là thỏ nuôi, nên thay vì bỏ chạy, chúng lao thẳng về phía Napoleon và đoàn tùy tùng như một đội quân nhỏ. Vị tướng từng khiến cả châu Âu run sợ đã phải tháo chạy trước một bầy thỏ.

Người đàn ông từng đánh bại hết đội quân này đến đội quân khác, nhưng lại không thắng nổi một chiến dịch bôi nhọ và một bầy thỏ, đó chính là Napoleon.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

def norm(w):
    return re.sub(r'[^\w]', '', w).lower()

t_words = [norm(t['text']) for t in tokens]
s_words = [norm(s) for s in script_words]

matcher = difflib.SequenceMatcher(None, t_words, s_words)
with open('scripts/napoleon_diff.txt', 'w', encoding='utf-8') as out:
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag != 'equal':
            out.write(f"\n--- {tag.upper()} ---\n")
            out.write(f"Whisper [{i1}:{i2}]:\n")
            for x in range(i1, i2):
                out.write(f"  {x}: '{tokens[x]['text']}' ({tokens[x]['startMs']}-{tokens[x]['endMs']}ms)\n")
            out.write(f"Script [{j1}:{j2}]:\n")
            for y in range(j1, j2):
                out.write(f"  {y}: '{script_words[y]}'\n")

print("Wrote scripts/napoleon_diff.txt")
