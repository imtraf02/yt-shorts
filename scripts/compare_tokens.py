import json
import re

with open('whisper_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

phrases_text = [
    # Scene 1: 0 - 7.64s
    ("Bạn để deadline tới sát nút mới làm,", ["deadline", "sát nút"]),
    ("xong sản phẩm lại ngon hơn hẳn?", ["ngon hơn hẳn"]),
    ("Không phải bạn thiên tài đâu —", ["thiên tài"]),
    ("não bạn đang chơi một trò rất bẩn với chính bạn thôi.", ["trò rất bẩn"]),

    # Scene 2: 7.64s - 17.88s
    ("Thủ phạm là cortisol.", ["cortisol"]),
    ("Khi deadline cận kề,", ["deadline cận kề"]),
    ("cơ thể coi đó như đang bị hổ đuổi —", ["bị hổ đuổi"]),
    ("và bị hổ đuổi thì não không có thời gian", ["hổ đuổi"]),
    ("lăn tăn chỉnh sửa 5 lần nữa,", ["chỉnh sửa"]),
    ("nó chỉ chạy thôi.", ["chỉ chạy thôi"]),

    # Scene 3: 17.88s - 23.60s
    ("Thứ hai, deadline cắt bớt lựa chọn.", ["cắt bớt lựa chọn"]),
    ("Lúc rảnh bạn có 100 cách bắt đầu,", ["100 cách"]),
    ("đứng chôn chân cả tiếng để chọn.", ["chôn chân cả tiếng"]),

    # Scene 4: 23.60s - 27.15s
    ("Còn 2 tiếng nữa hết giờ", ["2 tiếng"]),
    ("thì chỉ còn đúng 1 cách khả thi —", ["1 cách khả thi"]),
    ("cách nhanh nhất.", ["nhanh nhất"]),

    # Scene 5: 27.15s - 37.64s
    ("Và đây mới là cú lừa thật:", ["cú lừa thật"]),
    ("bạn không làm tốt hơn vào phút chót.", ["phút chót"]),
    ("Bạn chỉ đang so bản tập trung 100%", ["tập trung 100%"]),
    ("với bản làm sớm", ["làm sớm"]),
    ("mà thật ra vừa làm vừa lướt điện thoại,", ["lướt điện thoại"]),
    ("đứng dậy pha trà 5 lần.", ["pha trà 5 lần"]),

    # Scene 6: 37.64s - 45.60s
    ("Deadline không làm bạn giỏi hơn,", ["không giỏi hơn"]),
    ("nó chỉ làm bạn ngừng tự phá mình.", ["ngừng tự phá mình"]),
    ("Nhưng cortisol không miễn phí đâu —", ["không miễn phí"]),
    ("dùng liên tục là cách nhanh nhất để burnout.", ["burnout"]),

    # Scene 7: 45.60s - 57.88s
    ("Muốn có cảm giác tập trung đó", ["tập trung"]),
    ("mà không cần đợi sát nút?", ["sát nút"]),
    ("Tự tạo deadline giả,", ["deadline giả"]),
    ("và tự cắt bớt lựa chọn của mình", ["cắt bớt lựa chọn"]),
    ("y như deadline thật đang làm.", ["deadline thật"]),
    ("Hẹn giờ 25 phút,", ["25 phút"]),
    ("chọn đúng 1 cách để bắt đầu,", ["1 cách"]),
    ("không cho phép đổi ý.", ["không đổi ý"]),

    # Scene 8: 57.88s - 62.76s
    ("Não bạn không cần một con hổ thật", ["hổ thật"]),
    ("để chạy nhanh.", ["chạy nhanh"]),
    ("Nó chỉ cần tin là có hổ thôi.", ["tin là có hổ"]),
]

words_all = []
for p_idx, (p, kw) in enumerate(phrases_text):
    clean = re.sub(r'[,.…!—:?"]', '', p).strip()
    for w in clean.split():
        words_all.append((p_idx, w))

with open('scripts/comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(words_all))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        w_info = words_all[i] if i < len(words_all) else (-1, "---")
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{w_info[1]}' (phrase {w_info[0]})\n")

print("Done writing comparison.txt")
