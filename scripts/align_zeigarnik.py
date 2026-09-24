import json
import re

with open('whisper_zeigarnik_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Bạn nhắn cho bạn thân: "Mai tao gọi cho mày để bàn chuyện đó nha." Gửi xong, bạn tắt điện thoại, thấy nhẹ hẳn người — như thể chuyện đó đã được giải quyết. Nhưng ngày mai chưa tới, cuộc gọi chưa xảy ra, chuyện vẫn y nguyên như cũ. Đó là hiệu ứng Zeigarnik ngược.

Cơ chế của nó thế này: bình thường não bạn cực kỳ khó chịu với việc dang dở — đó là lý do bạn cứ nhớ mãi một tin nhắn chưa trả lời, một bộ phim xem dở giữa chừng. Nhưng có một lỗ hổng: chỉ cần bạn nói ra hoặc hẹn sẽ làm — dù chỉ là một câu nhắn tin — não bạn đã coi như tín hiệu "đã xử lý" được gửi đi, dù thực tế chưa làm gì cả.

Phần nguy hiểm là dopamine không phân biệt được "hẹn làm" với "đã làm". Cả hai đều cho bạn cảm giác nhẹ nhõm y hệt nhau. Thế nên bạn có thể hẹn "để tuần sau", "để mai tính", "lát nữa làm" cả chục lần một ngày, cảm thấy mình đã kiểm soát được mọi thứ — trong khi chẳng có việc nào thực sự nhúc nhích.

Điều buồn cười là: một câu hẹn nghe rất có trách nhiệm — "tao sẽ", "để tao", "mai tao" — nên bạn còn được người khác tin là người chu đáo, đáng tin cậy. Trong khi thực chất, câu nói đó chỉ đang mua thời gian để trì hoãn thêm một nhịp nữa.

Cách nhận diện: nếu bạn thấy mình nói "để mai/lát/tuần sau tính" về cùng một việc từ hai lần trở lên, mà chưa từng thử làm ngay dù chỉ 5 phút, thì bạn không đang lên kế hoạch — bạn đang trốn việc bằng lời hứa.

Cách thoát rất đơn giản: đừng hẹn làm, làm ngay phần nhỏ nhất có thể làm lúc này. Không có "để mai" — chỉ có "làm luôn 5 phút, xong tính tiếp".

Hẹn không phải là làm. Nói ra không xóa được việc còn dang dở trong thực tế.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

with open('scripts/zeigarnik_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/zeigarnik_comparison.txt")
