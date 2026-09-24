import json
import re

with open('whisper_tesla_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Nikola Tesla là người phát minh ra dòng điện xoay chiều, thứ đang thắp sáng ngôi nhà bạn ngay lúc này. Nhưng đời tư của ông thì... kỳ lạ hơn bất kỳ phát minh nào ông từng làm ra.

Đầu tiên, Tesla mắc chứng sợ vi khuẩn nặng đến mức ám ảnh. Ông rửa tay liên tục, ở khách sạn thì yêu cầu đúng 18 chiếc khăn sạch mỗi ngày, và tuyệt đối không bao giờ bắt tay ai. Bạn nghĩ đồng nghiệp bạn khó tính? Gặp Tesla đi.

Ông còn cực kỳ ám ảnh với con số 3. Mọi thứ ông làm đều phải chia hết cho 3 — đi bộ quanh tòa nhà đúng 3 vòng trước khi vào, ở phòng khách sạn phải mang số chia hết cho 3, thậm chí tính lượng thức ăn bằng thể tích thay vì nhìn hình dạng món ăn, vì ông ghét... nhìn thấy tóc hay bụi trên đồ ăn.

Và đây là chuyện tình duy nhất mà lịch sử ghi lại về ông: Tesla không hề kết hôn, không hề có người yêu chính thức, nhưng ông có một mối quan hệ cực kỳ sâu đậm với... một con bồ câu trắng. Ông cho nó ăn mỗi ngày, gọi nó là tình yêu của đời mình, và khi nó chết, Tesla nói rằng ông cảm thấy như vừa mất đi một phần bản thân.

Về sự nghiệp, Tesla có cuộc chiến huyền thoại với Thomas Edison — gọi là 'Cuộc chiến dòng điện'. Edison ủng hộ dòng điện một chiều, Tesla ủng hộ dòng điện xoay chiều, và để chứng minh dòng điện xoay chiều nguy hiểm, Edison công khai... giật điện chết voi trước công chúng. Tesla thì đáp trả bằng cách tự cho dòng điện xoay chiều chạy qua chính cơ thể mình trên sân khấu để chứng minh nó an toàn.

Cuối đời, Tesla sống gần như ẩn dật trong một phòng khách sạn, nợ nần chồng chất, tin rằng mình đã phát minh ra tia laser huỷ diệt và máy liên lạc với người ngoài hành tinh. Ông qua đời trong nghèo khó, một mình, dù những phát minh của ông đang thắp sáng cả thế giới ngoài kia.

Người đàn ông sợ vi khuẩn, yêu một con chim, và suýt thay đổi cả thế giới điện — đó chính là Nikola Tesla.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

with open('scripts/tesla_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/tesla_comparison.txt")
