import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

tokens = json.load(open('scripts/aligned_pubg_tokens.json', encoding='utf-8'))
print(f"Total tokens: {len(tokens)}")

scenes = [
    {
        "id": 1,
        "image": "01-football-to-battle-royale-hook.png",
        "text": "các bạn ơi… nhớ cái thoại World Cup 2002 của Hàn Quốc hôm trước không? Cái “phép màu” mà trọng tài biến thành cầu thủ thứ 12 ấy? Giờ thì lịch sử lặp lại, nhưng lần này không phải trên sân cỏ, mà trên… map Erangel. Và nhân vật chính vẫn là… Hàn Quốc.",
        "badge": "🎮 TỪ WORLD CUP 2002 ĐẾN ERANGEL",
        "hud": "PUBG ASIA STARS 2026 • SCANDAL"
    },
    {
        "id": 2,
        "image": "02-friendly-tournament-gameplay.png",
        "text": "Mời quý vị cùng tôi ôn lại vụ “PUBG Asia Stars 2026” – giải giao hữu vui vẻ, giải trí, không áp lực… cho đến khi có người Hàn bị hạ.",
        "badge": "🎯 GIẢI GIAO HỮU CHO ĐẾN KHI...",
        "hud": "GIẢI GIAO HỮU ASIA STARS"
    },
    {
        "id": 3,
        "image": "03-disputed-accusation-replay.png",
        "text": "Ngày 17/9, hai tuyển thủ Việt Nam Himass và TanVuu đang chơi bình thường. Nữ streamer Hàn Quốc Soopi bị hạ, lên tiếng tố “đá stream”. Cái gì? Xem livestream đối thủ á? Ôi trời, tội nặng quá! Ban tổ chức Krafton (công ty Hàn Quốc) nghe xong lập tức… xử lý nhanh như chớp. Loại hai người Việt khỏi giải, thu hồi Partner, còn giải thì hỗn loạn.",
        "badge": "🚨 CÁO BUỘC 'ĐÁ STREAM' VÔ CĂN CỨ",
        "hud": "STREAMER HÀN QUỐC TỐ CÁO"
    },
    {
        "id": 4,
        "image": "04-rapid-administrative-action.png",
        "text": "",
        "badge": "",
        "hud": ""
    }
]
