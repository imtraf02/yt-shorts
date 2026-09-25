import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/aligned_columbus_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

# The 20 sentences
sentences = [
    "Christopher Columbus nổi tiếng là người 'phát hiện ra Châu Mỹ' năm 1492.",
    "Nhưng sự thật thú vị là: ông chưa từng biết mình đã tìm ra một lục địa mới —",
    "và có hàng triệu người đã sống ở đó từ hàng ngàn năm trước khi ông đặt chân tới.",
    "Đúng vậy, cho đến tận lúc qua đời, Columbus vẫn đinh ninh rằng mình đã đến được Ấn Độ hoặc vùng ven châu Á,",
    "không hề nhận ra ông đã đặt chân lên một vùng đất hoàn toàn khác biệt.",
    "Đó cũng là lý do vì sao người bản địa ở châu Mỹ bị gọi nhầm là 'người Indian' suốt hàng trăm năm sau đó.",
    "Chuyến hải trình huyền thoại của ông thực ra dựa trên một phép tính sai be bét.",
    "Columbus tính toán khoảng cách từ châu Âu đến châu Á ngắn hơn thực tế rất nhiều — nếu không có châu Mỹ tình cờ nằm chắn giữa đường, đoàn thủy thủ của ông gần như chắc chắn sẽ chết đói trên biển trước khi đến nơi.",
    "Về tên gọi 'châu Mỹ', trớ trêu thay, nó không hề được đặt theo tên Columbus.",
    "Cái tên này lấy từ Amerigo Vespucci, một nhà thám hiểm người Ý khác,",
    "người đầu tiên nhận ra và công bố rằng đây thực sự là một lục địa hoàn toàn mới, chứ không phải châu Á.",
    "Người tính toán sai lại nổi tiếng hơn, còn người tính đúng lại được đặt tên cho cả lục địa —",
    "lịch sử đôi khi trớ trêu như vậy.",
    "Một chi tiết ít người biết: Columbus chưa từng đặt chân lên lãnh thổ ngày nay là nước Mỹ.",
    "Ông chỉ đến các đảo vùng Caribbean và Trung Mỹ, chưa từng đi xa đến lục địa Bắc Mỹ thực sự.",
    "Và cuối đời, dù được xem là người mở đường cho làn sóng thám hiểm châu Âu sau này,",
    "Columbus lại qua đời trong cảnh gần như bị lãng quên và không được công nhận đầy đủ,",
    "vẫn tin chắc đến hơi thở cuối cùng rằng mình đã tìm ra con đường tới châu Á —",
    "trong khi cả thế giới dần nhận ra",
    "ông đã tìm ra một điều gì đó lớn lao hơn thế rất nhiều."
]

def clean_word(w):
    return re.sub(r"[^\w]", "", w, flags=re.UNICODE).lower()

all_sent_words = []
for s in sentences:
    all_sent_words.append([w for w in [clean_word(x) for x in s.split()] if w])

token_clean = [clean_word(t['word']) for t in tokens]

total_sent_words = sum(len(w) for w in all_sent_words)
print(f"Total tokens in json: {len(tokens)}")
print(f"Total words in 20 sentences: {total_sent_words}")

curr_token = 0
scene_info = []

for i, words in enumerate(all_sent_words):
    start_token = curr_token
    for w in words:
        if curr_token >= len(token_clean):
            print(f"Error: run out of tokens at sentence {i+1}, word '{w}'")
            break
        if token_clean[curr_token] != w:
            print(f"Mismatch at sentence {i+1}: expected '{w}', got '{token_clean[curr_token]}' (token {curr_token})")
        curr_token += 1
    end_token = curr_token - 1
    
    start_ms = tokens[start_token]['startMs']
    end_ms = tokens[end_token]['endMs']
    scene_info.append({
        "id": i + 1,
        "image": f"{i+1:02d}-columbus-scene.png",
        "sentence": sentences[i],
        "startToken": start_token,
        "endToken": end_token,
        "tokenCount": end_token - start_token + 1,
        "startMs": start_ms,
        "endMs": end_ms
    })

print(f"Final token consumed: {curr_token} / {len(tokens)}")
for sc in scene_info:
    print(f"Scene {sc['id']:02d}: tokens {sc['startToken']:3d}..{sc['endToken']:3d} ({sc['tokenCount']:2d} words) | {sc['startMs']:5.2f}s - {sc['endMs']:5.2f}s | {sc['sentence'][:50]}...")
