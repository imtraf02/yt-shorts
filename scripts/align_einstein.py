import json
import re

with open('whisper_einstein_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

script_text = """
Albert Einstein — người phát minh ra thuyết tương đối, thay đổi cách nhân loại hiểu về không gian và thời gian. Nhưng ngoài đời, ông lại là kiểu người quên mang chìa khóa nhà mình thường xuyên đến mức đáng báo động.

Đúng vậy, bộ não vĩ đại nhất thế kỷ 20 lại sở hữu trí nhớ tệ không tưởng cho những chuyện đời thường. Einstein từng quên hẳn địa chỉ nhà mình, đến mức phải gọi điện cho văn phòng của chính ông để hỏi... ông sống ở đâu. Bộ não tính ra được năng lượng bằng khối lượng nhân bình phương vận tốc ánh sáng, nhưng lại không nhớ nổi số nhà.

Ông còn nổi tiếng ghét đi tất. Đúng nghĩa đen — Einstein từ chối mang tất suốt phần lớn cuộc đời trưởng thành, kể cả trong những dịp trang trọng. Lý do ông đưa ra đơn giản đến mức ngớ ngẩn: ông ghét cảm giác ngón chân cái chọc thủng lỗ tất theo thời gian, nên quyết định cắt bỏ vấn đề tận gốc — không mang tất nữa là xong.

Về tóc, chắc bạn từng thấy bức ảnh Einstein với mái tóc bạc dựng đứng huyền thoại. Sự thật là ông gần như không bao giờ chải tóc, và khi được hỏi tại sao, ông trả lời rằng cắt tóc và chải đầu là 'lãng phí thời gian quý báu' có thể dùng để suy nghĩ về vũ trụ. Tóc rối là cái giá ông sẵn sàng trả để dành thời gian cho vật lý.

Đây là chi tiết ít ai biết: Einstein từng được mời làm Tổng thống Israel vào năm 1952, sau khi vị tổng thống đầu tiên qua đời. Ông từ chối thẳng thừng, nói rằng mình không có năng khiếu xử lý con người, và thành thật hơn là ông thích phương trình hơn chính trị rất nhiều.

Và một sự thật gây sốc: Einstein thi trượt kỳ thi tuyển sinh đại học lần đầu tiên. Không phải vì môn toán hay vật lý — ông xuất sắc ở hai môn đó — mà vì ông trượt các môn còn lại như ngôn ngữ và lịch sử tự nhiên. Người sau này định nghĩa lại cả vũ trụ lại từng bị một kỳ thi đại học đánh gục.

Bộ não tính ra thuyết tương đối, nhưng quên địa chỉ nhà, ghét tất, và từng trượt đại học — đó chính là Albert Einstein, thiên tài lộn xộn nhất lịch sử khoa học.
"""

clean_script = re.sub(r'[,.…!—:?\'"“”/]', ' ', script_text)
script_words = [w for w in clean_script.split() if w]

print(f"Total whisper tokens: {len(tokens)}")
print(f"Total script words: {len(script_words)}")

with open('scripts/einstein_comparison.txt', 'w', encoding='utf-8') as out:
    for i in range(max(len(tokens), len(script_words))):
        t_text = tokens[i]['text'].strip() if i < len(tokens) else "---"
        t_start = tokens[i]['startMs'] if i < len(tokens) else 0
        t_end = tokens[i]['endMs'] if i < len(tokens) else 0
        s_word = script_words[i] if i < len(script_words) else "---"
        out.write(f"{i:3d}: whisper='{t_text}' ({t_start}-{t_end}ms)  |  script='{s_word}'\n")

print("Wrote scripts/einstein_comparison.txt")
