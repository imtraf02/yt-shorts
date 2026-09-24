import json
import re

with open('whisper_darwin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Charles Darwin viết ra thuyết tiến hóa, thay đổi hoàn toàn cách nhân loại hiểu về nguồn gốc sự sống. Nhưng trước khi trở thành nhà khoa học vĩ đại đó, ông từng có một sở thích kỳ lạ: ăn gần như mọi con vật ông nghiên cứu.

Đúng vậy, thời sinh viên ở Cambridge, Darwin tham gia một hội kín tên là 'Hội Ăn Tạp' — mục tiêu duy nhất của hội là nếm thử càng nhiều loài động vật kỳ lạ càng tốt. Cú, chim ưng, thậm chí cả... một con cáo già, tất cả đều từng nằm trên bàn ăn của ông trước khi nằm trong sách nghiên cứu.

Trong chuyến hành trình huyền thoại trên tàu Beagle vòng quanh thế giới, Darwin tiếp tục truyền thống đó. Ông từng ăn thịt một con rùa khổng lồ Galapagos — đúng loài rùa mà sau này ông dùng làm bằng chứng cho thuyết tiến hóa. Vừa nghiên cứu khoa học, vừa dùng bữa với chính đối tượng nghiên cứu, không ai làm điều đó tận tâm hơn Darwin.

Ông còn là người cực kỳ chi tiết đến mức ám ảnh. Darwin dành tới 8 năm chỉ để nghiên cứu... một loài hà biển (giống như con hàu bám trên đá). 8 năm, chỉ để hiểu tường tận một sinh vật bé xíu bám vào thành tàu, trước khi dám công bố lý thuyết lớn về sự sống trên toàn hành tinh.

Và đây là chi tiết khiến ai cũng bật cười: Darwin sợ hãi việc công bố thuyết tiến hóa đến mức trì hoãn suốt 20 năm. Ông có đầy đủ bằng chứng, đầy đủ lý luận, nhưng cứ ngồi im vì sợ phản ứng dữ dội từ tôn giáo và xã hội thời đó. Cuối cùng, ông chỉ công bố vội vàng khi phát hiện một nhà khoa học khác — Alfred Russel Wallace — sắp công bố ý tưởng gần giống hệt.

Về đời tư, Darwin kết hôn với người em họ của chính mình, và ông lo lắng đến mức viết hẳn một danh sách 'ưu và nhược điểm của việc kết hôn' trước khi cầu hôn — như một bản báo cáo khoa học thực thụ, cân đo đong đếm cả chuyện tình cảm.

Người đàn ông ăn rùa Galapagos, dành 8 năm nghiên cứu con hà, và trì hoãn công bố phát hiện lớn nhất đời mình suốt 2 thập kỷ — đó chính là Charles Darwin.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/()]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

with open('scripts/darwin_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/darwin_comparison.txt")
