import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

tokens = json.load(open('scripts/aligned_worldcup_tokens.json', encoding='utf-8'))
print(f"Total tokens: {len(tokens)}")

scenes = [
    {
        "id": 1,
        "image": "01-korea-2002-miracle-hook.png",
        "text": "World Cup 2002 của Hàn Quốc… cái “phép màu” bóng đá châu Á mà đến giờ vẫn khiến người ta phải cười ra nước mắt. Mời quý vị cùng tôi ôn lại hành trình “công bằng tuyệt đối” của đội chủ nhà năm ấy nhé.",
        "badge": "⚽ 'PHÉP MÀU' WORLD CUP 2002",
        "hud": "WORLD CUP 2002 • CONTROVERSY"
    },
    {
        "id": 2,
        "image": "02-host-nation-spotlight.png",
        "text": "Trước hết, xin chúc mừng Hàn Quốc đã biến World Cup thành… World Cup dành riêng cho mình. Ý tôi là, FIFA lúc đó chắc nghĩ: “Ủa, đã cho họ làm chủ nhà rồi thì phải cho họ đá bán kết chứ, không thì dân Hàn buồn lắm, bán vé không chạy đâu.”",
        "badge": "🎪 WORLD CUP DÀNH RIÊNG CHO CHỦ NHÀ",
        "hud": "SUẤT BÁN KẾT ĐẶC CÁCH"
    },
    {
        "id": 3,
        "image": "03-italy-match-controversial-red-card.png",
        "text": "Trận với Ý. Ý đá hay, Hàn đá… được trọng tài. Totti vừa chạm bóng đã bị thẻ đỏ vì “giả vờ ngã”, trong khi cầu thủ Hàn Quốc ngã như đang đóng phim hành động Hollywood thì trọng tài quay đi uống nước.",
        "badge": "🟥 THẺ ĐỎ OAN NGHIỆT CHO TOTTI",
        "hud": "TRẬN CHIẾN Ý - HÀN QUỐC"
    },
    {
        "id": 4,
        "image": "04-replay-and-golden-goal.png",
        "text": "Rồi đến phút vàng, Ahn Jung-hwan đánh đầu ghi bàn… ừ thì đẹp, nhưng cái đường chuyền trước đó thì “hơi hơi” việt vị một tí. Nhưng không sao, trọng tài mắt tinh lắm, ông ấy nhìn rõ là… không việt vị. Kết quả: Ý về nước sớm, Totti ôm mặt khóc, còn Hàn Quốc thì ôm cúp… à không, ôm chiếc vé vào tứ kết.",
        "badge": "⚡ BÀN THẮNG VÀNG & NỖI UẤT ỨC Ý",
        "hud": "BÀN THẮNG VÀNG TRANH CÃI"
    },
    {
        "id": 5,
        "image": "05-spain-disallowed-goal-debate.png",
        "text": "Sang đến Tây Ban Nha. Hai bàn thắng của Tây Ban Nha bị hủy vì… “việt vị”. Việt vị kiểu gì mà camera chậm lại vẫn không thấy, nhưng trọng tài Ecuador thì thấy rõ như ban ngày.",
        "badge": "🚫 2 BÀN THẮNG BỊ TỪ CHỐI KHÓ HIỂU",
        "hud": "TÂY BAN NHA BỊ XỬ ÉP"
    },
    {
        "id": 6,
        "image": "07-twelve-vs-eleven-satire.png",
        "text": "Người Tây Ban Nha lúc đó chắc nghĩ mình đang đá với đội bóng 12 người: 11 cầu thủ Hàn + 1 trọng tài.",
        "badge": "👥 ĐỘI BÓNG 12 NGƯỜI TRÊN SÂN",
        "hud": "11 CẦU THỦ + 1 TRỌNG TÀI"
    },
    {
        "id": 7,
        "image": "06-penalty-shootout-reactions.png",
        "text": "Phạt đền, Hàn Quốc thắng, Tây Ban Nha về nước với tâm trạng “lần sau tôi không đá World Cup ở châu Á nữa”.",
        "badge": "🥅 PHẠT ĐỀN NƯỚC MẮT TÂY BAN NHA",
        "hud": "LUÂN LƯU 11M ĐỊNH MỆNH"
    },
    {
        "id": 8,
        "image": "08-germany-semifinal-reality-check.png",
        "text": "Rồi bán kết gặp Đức. Lúc này trọng tài chắc nghĩ “thôi, cho chúng nó đá thật đi, kẻo lộ quá”. Kết quả thua 0-1.",
        "badge": "🇩🇪 BÁN KẾT: ĐỨC DẬP TẮT ẢO TƯỞNG",
        "hud": "KẾT QUẢ THUA 0-1 TRƯỚC ĐỨC"
    },
    {
        "id": 9,
        "image": "09-fourth-place-celebration.png",
        "text": "Nhưng không sao, Hàn Quốc vẫn về hạng tư, cả nước ăn mừng như vừa vô địch vũ trụ.",
        "badge": "🎆 ĂN MỪNG NHƯ VÔ ĐỊCH VŨ TRỤ",
        "hud": "KỲ TÍCH HẠNG TƯ THẾ GIỚI"
    },
    {
        "id": 10,
        "image": "10-refereeing-debate-after-tournament.png",
        "text": "Mỉa mai nhất là sau giải, FIFA vẫn cười toe toét bảo “trọng tài làm rất tốt”. Còn người Hàn thì nói “đấy, chúng tôi mạnh thật đấy chứ”. Ừ, mạnh thật… mạnh nhờ… “sự hỗ trợ nhiệt tình từ phía ban tổ chức”.",
        "badge": "🎤 'TRỌNG TÀI ĐÃ LÀM RẤT TỐT'",
        "hud": "PHÁT NGÔN BẤT HỦ CỦA FIFA"
    },
    {
        "id": 11,
        "image": "11-fans-divided-legacy.png",
        "text": "Thế đấy, World Cup 2002 – nơi Hàn Quốc chứng minh rằng muốn vào bán kết thì không cần đá hay bằng Ronaldo hay Zidane, chỉ cần… trọng tài thích bạn là được.",
        "badge": "🤷 CHỈ CẦN TRỌNG TÀI THÍCH BẠN",
        "hud": "CÔNG THỨC VÀO BÁN KẾT"
    },
    {
        "id": 12,
        "image": "12-fairness-is-relative-ending.png",
        "text": "Cảm ơn FIFA đã mang đến cho chúng ta một kỳ World Cup đầy… bất ngờ. Và cảm ơn Hàn Quốc đã dạy cả thế giới bài học: đôi khi, công bằng chỉ là… một khái niệm tương đối.",
        "badge": "⚖️ CÔNG BẰNG LÀ KHÁI NIỆM TƯƠNG ĐỐI",
        "hud": "BÀI HỌC VỀ SỰ CÔNG BẰNG"
    }
]

def norm(w):
    return re.sub(r"[^\w]", "", w, flags=re.UNICODE).lower()

curr_idx = 0
scene_bounds = []

for sc in scenes:
    s_words = [w for w in sc['text'].split() if norm(w)]
    start_token = curr_idx
    matched = 0
    while curr_idx < len(tokens) and matched < len(s_words):
        t_word = tokens[curr_idx]['word']
        if not norm(t_word):
            curr_idx += 1
            continue
        if norm(t_word) == norm(s_words[matched]):
            matched += 1
            curr_idx += 1
        else:
            print(f"Mismatch at scene {sc['id']}: expected '{s_words[matched]}', got token {curr_idx}='{t_word}'")
            break
            
    while curr_idx < len(tokens) and not norm(tokens[curr_idx]['word']):
        curr_idx += 1
        
    end_token = curr_idx - 1
    scene_bounds.append((start_token, end_token))

print(f"Consumed tokens: {curr_idx} / {len(tokens)}")

for i, (st, en) in enumerate(scene_bounds):
    sc = scenes[i]
    st_ms = tokens[st]['startMs']
    en_ms = tokens[en]['endMs']
    sample = " ".join([t['word'] for t in tokens[st:en+1]])
    print(f"Scene {sc['id']:02d}: tokens {st:3d}..{en:3d} ({en-st+1:2d} words) | {st_ms/1000:6.2f}s - {en_ms/1000:6.2f}s | {sc['badge']}")
    print(f"   Text: {sample[:70]}...")
