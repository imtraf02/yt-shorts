import json, sys, re
sys.stdout.reconfigure(encoding='utf-8')

tokens = json.load(open('scripts/aligned_columbus_tokens.json', encoding='utf-8'))

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

def norm(w):
    return re.sub(r"[^\w]", "", w, flags=re.UNICODE).lower()

curr_idx = 0
scene_bounds = []

for s_idx, s in enumerate(sentences):
    s_words = [w for w in s.split() if norm(w)]
    start_token = curr_idx
    matched = 0
    while curr_idx < len(tokens) and matched < len(s_words):
        t_word = tokens[curr_idx]['word']
        if not norm(t_word):
            # punctuation token (e.g. '—')
            curr_idx += 1
            continue
        if norm(t_word) == norm(s_words[matched]):
            matched += 1
            curr_idx += 1
        else:
            print(f"Error at sentence {s_idx+1}: expected '{s_words[matched]}' but token {curr_idx} is '{t_word}'")
            break
            
    # If the next token is punctuation (like '—' attached to this sentence end), consume it
    if curr_idx < len(tokens) and not norm(tokens[curr_idx]['word']):
        curr_idx += 1
        
    end_token = curr_idx - 1
    scene_bounds.append((start_token, end_token))

print("Found scene bounds:")
for i, (st, en) in enumerate(scene_bounds):
    txt = " ".join([t['word'] for t in tokens[st:en+1]])
    print(f"Scene {i+1:02d}: ({st:3d}, {en:3d}) | {txt}")

print(f"\nTotal tokens consumed: {curr_idx} / {len(tokens)}")
