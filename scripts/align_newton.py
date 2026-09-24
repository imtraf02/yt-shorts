import json
import re

with open('whisper_newton_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Isaac Newton ngồi dưới gốc táo, một quả táo rơi trúng đầu, và ông phát minh ra lực hấp dẫn. Câu chuyện hay đấy, chỉ có điều... nó hơi bị chế thêm gia vị.

Sự thật là Newton chỉ nhìn thấy một quả táo rơi từ xa, không hề bị đánh trúng đầu như phim hoạt hình vẫn vẽ. Ông ấy chỉ đang ngồi suy nghĩ vẩn vơ thôi, và tự dưng nghĩ: 'Ơ, sao táo lại rơi xuống mà không bay ngang?' — câu hỏi tưởng ngớ ngẩn này lại đẻ ra cả một định luật thay đổi vật lý học.

Nhưng khoan, Newton không chỉ có mỗi lực hấp dẫn đâu. Ông này còn là một người cực kỳ... rảnh theo kiểu bác học. Ông từng tự chọc một cây kim vào mắt mình — đúng nghĩa đen — chỉ để nghiên cứu xem áp lực lên mắt ảnh hưởng thế nào đến cách con người nhìn màu sắc. Không ai bảo ông làm cả, ông tự nguyện.

Và đây mới là phần hài nhất: Newton dành phần lớn cuộc đời không phải để nghiên cứu vật lý, mà để nghiên cứu... giả kim thuật. Ông cực kỳ tin vào việc biến chì thành vàng, và viết hàng ngàn trang ghi chú bí mật về nó — bí mật đến mức mãi sau khi ông chết người ta mới phát hiện ra ông là một 'nhà giả kim' hơn là nhà khoa học như sách giáo khoa vẽ.

Ông còn từng là Giám đốc Sở Đúc tiền Hoàng gia Anh, và ở vị trí đó, Newton biến thành... thợ săn tiền giả. Ông đích thân cải trang đi điều tra, bắt tận tay và đưa nhiều kẻ làm tiền giả lên giá treo cổ. Từ người phát minh ra lực hấp dẫn đến cảnh sát trưởng phá án tiền giả — sự nghiệp của ông đúng là không ai đoán trước được.

Và có lẽ câu chuyện hài nhất về Newton là: ông chưa từng... có bạn gái, chưa từng kết hôn, và được cho là qua đời mà vẫn còn trinh trắng theo ghi chép lịch sử. Nhưng bù lại, ông có mối quan hệ tình cảm sâu đậm nhất đời mình với... toán học.

Vậy lần tới khi thấy quả táo rơi, đừng nghĩ tới lực hấp dẫn — hãy nghĩ tới một ông già thế kỷ 17 vừa chọc kim vào mắt mình, vừa cố biến chì thành vàng, vừa đi bắt tiền giả, tất cả trong cùng một cuộc đời.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

with open('scripts/newton_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/newton_comparison.txt")
