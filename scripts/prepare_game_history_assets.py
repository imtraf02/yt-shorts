# -*- coding: utf-8 -*-
"""
Chuẩn bị dữ liệu cho phim tài liệu:
'Vì sao ai cũng chơi game? 5.000 năm lịch sử trò chơi'
Gồm 10 phần, 108 hình ảnh 16:9 và mô tả phân cảnh tiếng Việt.
"""

import sys
import json
import re
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

SECTIONS_CONFIG = [
    {
        "id": "part1",
        "chapter_num": 1,
        "part_label": "MỞ ĐẦU",
        "historical_era": "NGHỊCH LÝ TRÒ CHƠI",
        "title": "Bữa Trưa Của Trí Não",
        "subtitle": "Vì sao mọi nền văn minh đều chơi game dù không giúp no bụng?",
        "img_start": 1,
        "img_end": 8,
    },
    {
        "id": "part2",
        "chapter_num": 2,
        "part_label": "PHẦN 1",
        "historical_era": "LƯỠNG HÀ CỔ ĐẠI",
        "title": "Ván Cờ Nằm Trong Mộ",
        "subtitle": "Bàn cờ hoàng gia Ur 4.500 năm tuổi và tấm bảng đất sét Babylon",
        "img_start": 9,
        "img_end": 24,
    },
    {
        "id": "part3",
        "chapter_num": 3,
        "part_label": "PHẦN 2",
        "historical_era": "AI CẬP CỔ ĐẠI",
        "title": "Senet: Trò Chơi Của Linh Hồn",
        "subtitle": "Ván cờ vượt qua cõi chết của các Pharaoh và lăng mộ Nefertari",
        "img_start": 25,
        "img_end": 37,
    },
    {
        "id": "part4",
        "chapter_num": 4,
        "part_label": "PHẦN 3",
        "historical_era": "VĂN HÓA XÚC XẮC",
        "title": "Xúc Xắc & Chuyện Chơi Với Số Phận",
        "subtitle": "Từ xương cừu La Mã đến sự ra đời của toán học xác suất",
        "img_start": 38,
        "img_end": 52,
    },
    {
        "id": "part5",
        "chapter_num": 5,
        "part_label": "PHẦN 4",
        "historical_era": "CỜ VÂY & CỜ VUA",
        "title": "Chiến Tranh Trên Bàn Cờ",
        "subtitle": "Chiến thuật không đổ máu, trí tuệ quân tử và cuộc đụng độ AI",
        "img_start": 53,
        "img_end": 69,
    },
    {
        "id": "part6",
        "chapter_num": 6,
        "part_label": "PHẦN 5",
        "historical_era": "TRIẾT LÝ ẤN ĐỘ",
        "title": "Trò Chơi Biết Dạy Đạo Lý",
        "subtitle": "Rắn & Thang dạy về nghiệp, Pachisi cờ cá ngựa và tình anh em",
        "img_start": 70,
        "img_end": 78,
    },
    {
        "id": "part7",
        "chapter_num": 7,
        "part_label": "PHẦN 6",
        "historical_era": "VĂN HÓA VIỆT NAM",
        "title": "Trò Chơi Của Chúng Ta",
        "subtitle": "Ô ăn quan, cờ tướng vỉa hè, bầu cua tôm cá và ký ức tuổi thơ",
        "img_start": 79,
        "img_end": 88,
    },
    {
        "id": "part8",
        "chapter_num": 8,
        "part_label": "PHẦN 7",
        "historical_era": "HOMO LUDENS",
        "title": "Vì Sao Ở Đâu Cũng Có Trò Chơi?",
        "subtitle": "Tín hiệu mời chơi, trạng thái dòng chảy và tập thất bại dịu dàng",
        "img_start": 89,
        "img_end": 100,
    },
    {
        "id": "part9",
        "chapter_num": 9,
        "part_label": "PHẦN 8",
        "historical_era": "KỶ NGUYÊN MÀN HÌNH",
        "title": "Từ Bàn Cờ Đến Màn Hình",
        "subtitle": "Tấm gương phản chiếu thế giới và viên xúc xắc không đổi thay",
        "img_start": 101,
        "img_end": 106,
    },
    {
        "id": "part10",
        "chapter_num": 10,
        "part_label": "LỜI KẾT",
        "historical_era": "THÔNG ĐIỆP ĐỌNG LẠI",
        "title": "Bản Năng Vui Chơi Của Loài Người",
        "subtitle": "Thua mà không đau, và thắng mà không cần ai phải chết",
        "img_start": 107,
        "img_end": 108,
    },
]

# 108 mô tả phân cảnh tiếng Việt chi tiết tương ứng 108 ảnh
IMAGE_DESCRIPTIONS = {
    # MỞ ĐẦU (1..8)
    1: "Người đàn ông Lưỡng Hà ngồi ném xúc xắc cùng bạn 4.500 năm trước",
    2: "Chiếc bụng đói biểu tượng cồn cào: Chơi game không giúp no bụng",
    3: "Cú đập bàn cay cú khi thua ván xúc xắc giữa hai người bạn cổ đại",
    4: "Bản đồ thế giới với các bàn cờ xuất hiện độc lập ở mọi nền văn minh",
    5: "Bin bước ra từ cánh cổng thời gian cùng viên xúc xắc Ngầu",
    6: "Bin tự tin với đồng hồ du hành thời gian và bánh răng lịch sử",
    7: "Viên xúc xắc Ngầu đứng trên bục với nụ cười tinh nghịch",
    8: "Bản đồ lộ trình 6 điểm dừng xuyên qua 5.000 năm lịch sử trò chơi",

    # PHẦN 1 — VÁN CỜ NẰM TRONG MỘ (9..24)
    9: "Bin đáp xuống thành phố cổ Ur bên dòng sông Lưỡng Hà",
    10: "Các nhà khảo cổ thập niên 1920 khai quật bàn cờ khảm ngọc trong mộ",
    11: "So sánh niên đại: Bàn cờ Ur có tuổi đời ngang kim tự tháp đầu tiên",
    12: "Người cổ đại chôn kèm bàn cờ nhưng quên chôn kèm sách hướng dẫn",
    13: "Học giả Irving Finkel giải mã tấm bảng đất sét chữ hình nêm",
    14: "Người ghi chép Babylon khắc luật chơi lên đất sét hơn 2.000 năm trước",
    15: "Tấm bảng đất sét phát sáng tiết lộ luật chơi sau hàng nghìn năm",
    16: "Thành phố Ur sầm uất với đền tháp, kho thóc và thương nhân buôn bán",
    17: "Bàn cờ Ur 20 ô với 7 quân mỗi bên chạy đua qua bàn",
    18: "Khu vực giao tranh ở giữa bàn cờ, nơi hai bên ăn quân của nhau",
    19: "Xúc xắc 4 mặt hình chóp quyết định số bước đi trong tiếng cười của Ngầu",
    20: "Quân cờ đặt vào ô hoa hồng được nhận thêm một lượt đi thưởng",
    21: "Cận cảnh bàn cờ khảm vỏ sò, đá xanh lapis lazuli và đá đỏ tinh xảo",
    22: "Chôn bàn cờ cùng chủ nhân vì tin rằng cõi bên kia vẫn cần thú vui",
    23: "Sự kết hợp hoàn hảo giữa may rủi, chiến thuật và niềm vui ăn quân",
    24: "Biến thể của trò chơi Ur vẫn được chơi tại Ấn Độ đến tận thế kỷ 20",

    # PHẦN 2 — SENET: TRÒ CHƠI CỦA LINH HỒN (25..37)
    25: "Bin du hành đến Ai Cập cổ đại bên dòng sông Nile huyền bí",
    26: "Bàn cờ Senet với những quân cờ hình nón dọc theo dòng lịch sử",
    27: "Bàn Senet 3 hàng 10 ô với đường đi hình chữ S uốn lượn",
    28: "Ném que gỗ tính điểm thay vì xúc xắc vuông hiện đại",
    29: "Người quá cố ngồi chơi Senet với một đối thủ vô hình nơi thế giới ngầm",
    30: "Bàn Senet bằng gỗ quý và ngà voi trong lăng mộ vua Tutankhamun",
    31: "Bức bích họa hoàng hậu Nefertari chơi Senet trước cõi vĩnh hằng",
    32: "Bàn cờ Senet khắc vội trên bậc đá đền thờ của những người lính gác",
    33: "Ván cờ Senet trở thành biểu tượng hành trình linh hồn qua thế giới bên kia",
    34: "Ô nước hiểm trở, nơi quân cờ có thể bị nhấn chìm xuống cõi sâu",
    35: "Linh hồn chiến thắng ván cờ bước đến bên cỗ xe thần Mặt Trời Ra",
    36: "Các nhà khảo cổ hiện đại tranh luận sôi nổi về luật chơi Senet",
    37: "Với người Ai Cập cổ, chơi đùa và thiêng liêng chưa bao giờ tách rời",

    # PHẦN 3 — XÚC XẮC & CHUYỆN CHƠI VỚI SỐ PHẬN (38..52)
    38: "Ngầu tỏa sáng như nhân vật chính trên sân khấu xúc xắc",
    39: "Những viên xúc xắc đầu tiên làm từ xương gót chân cừu astragali",
    40: "Ném xương 4 mặt không đều nhau để xem mặt nào ngửa lên",
    41: "Người La Mã đặt tên cú ném Venus tốt nhất và cú con chó tệ nhất",
    42: "Xúc xắc 6 mặt cổ xưa chế tác từ đất nung, đá và ngà voi",
    43: "Bộ cờ tào cáo 5.000 năm tuổi khai quật tại Shahr-e Sukhteh Iran",
    44: "Người xưa tin rằng xúc xắc rơi là do ý muốn của các vị thần",
    45: "Ném xúc xắc hỏi ý trời, thua liền 5 ván nghĩa là trời đang giận",
    46: "Các trò đỏ đen cờ bạc xúc xắc xuất hiện khắp quảng trường La Mã",
    47: "Quan chức La Mã ra lệnh cấm nhưng người dân vẫn lén lút chơi",
    48: "Ảo tưởng con bạc: Tin rằng xúc xắc có ký ức sau chuỗi ván thua",
    49: "Năm 1654: Pascal và Fermat trao đổi thư từ về ván cược dang dở",
    50: "Từ cuộc cãi nhau xúc xắc, ngành toán xác suất hiện đại chính thức ra đời",
    51: "Xác suất xúc xắc nuôi dưỡng ngành bảo hiểm, thống kê và trí tuệ nhân tạo",
    52: "Bin và Ngầu tự hào vì mỗi lần thua xúc xắc là đóng góp cho khoa học",

    # PHẦN 4 — CHIẾN TRANH TRÊN BÀN CỜ (53..69)
    53: "Bin bước tới đình viện Trung Hoa cổ kính với bàn cờ vây",
    54: "Bàn cờ vây lưới 19x19 với các quân đen trắng tối giản mà uyên thâm",
    55: "Vị vua cổ đại sáng tạo cờ vây để dạy con trai tính kiên nhẫn",
    56: "Người con ôm đầu nát óc suy nghĩ trước thế cờ hóc búa",
    57: "Cờ vây được xếp vào tứ nghệ quân tử: Cầm, Kỳ, Thi, Họa",
    58: "Người quân tử say mê chơi cờ bên thư pháp và tiếng đàn tranh",
    59: "Các kỳ thủ cờ vây Nhật Bản được chính quyền phong kiến trả lương thi đấu",
    60: "Số thế cờ vây nhiều hơn cả số lượng nguyên tử trong vũ trụ quan sát được",
    61: "Cờ vua bắt nguồn từ trò chơi cổ Chaturanga tại Ấn Độ 1.500 năm trước",
    62: "Ý nghĩa bốn binh chủng: Bộ binh, kỵ binh, tượng binh và chiến xa",
    63: "Chaturanga du hành từ Ấn Độ qua Ba Tư, thế giới Ả Rập rồi sang châu Âu",
    64: "Cụm từ Checkmate bắt nguồn từ chữ 'Shah Mat' trong tiếng Ba Tư",
    65: "Quân voi thành giám mục, quân hậu trở thành quân mạnh nhất bàn cờ",
    66: "Cờ vây và cờ vua: Những cuộc chiến tranh thu nhỏ không đổ máu",
    67: "Tướng lĩnh và quý tộc thời xưa luyện tập tư duy trước ba nước đi",
    68: "Năm 1997: Siêu máy tính Deep Blue đánh bại kiện tướng Garry Kasparov",
    69: "Năm 2016: Trí tuệ nhân tạo AlphaGo đánh bại huyền thoại cờ vây Lee Sedol",

    # PHẦN 5 — TRÒ CHƠI BIẾT DẠY ĐẠO LÝ (70..78)
    70: "Bàn cờ Moksha Patam cổ đại của Ấn Độ với chiếc thang và chú rắn",
    71: "Thang tượng trưng cho điều thiện đưa lên cao, rắn tượng trưng cho điều xấu kéo lùi",
    72: "Người xưa dạy con trẻ về luật nhân quả luân hồi qua trò Rắn và Thang",
    73: "Rắn và Thang sang nước Anh thời Victoria biến đổi thành bài học đạo đức phương Tây",
    74: "Trò chơi Pachisi tại Ấn Độ: Cụ tổ của trò cờ cá ngựa quen thuộc",
    75: "Hoàng đế Ấn Độ dùng cung nữ và lính hầu làm quân cờ sống giữa sân điện",
    76: "Cờ cá ngựa: Nơi tình anh em bị thử thách nặng nề nhất mỗi khi bị đá quân",
    77: "Trò chơi là phương tiện người xưa truyền tải giá trị sống qua bao thế hệ",
    78: "Bin và Ngầu chiêm nghiệm những bài học nhân sinh ẩn sau từng ván cờ",

    # PHẦN 6 — TRÒ CHƠI CỦA CHÚNG TA (79..88)
    79: "Bin trở về sân đình làng quê Việt Nam dưới bóng lũy tre xanh",
    80: "Trò chơi Ô ăn quan vẽ bằng phấn trên sân đất với những viên sỏi nhỏ",
    81: "Người chơi rải từng nắm sỏi theo vòng ô, họ hàng với trò Mancala thế giới",
    82: "Bàn cờ tướng vỉa hè, các bác ngồi tranh luận nước đi sôi nổi cả chiều",
    83: "Bầu cua tôm cá ngày Tết sum vầy, Ngầu hào hứng lắc chiếc bát nhôm",
    84: "Ký ức trò chơi dân gian: Chơi chuyền, đánh đáo, nhảy dây, bịt mắt bắt dê",
    85: "Chiều hè chạy nhảy trên sân cát cho đến khi mẹ gọi về ăn cơm",
    86: "Trò chơi dân gian rèn luyện sự khéo léo, nhịp điệu và niềm tin bạn bè",
    87: "Ký ức tuổi thơ không có điểm số hay bảng xếp hạng, chỉ có tiếng cười giòn giã",
    88: "Câu hỏi suy ngẫm: Lần cuối bạn chơi một trò không cần màn hình là khi nào?",

    # PHẦN 7 — VÌ SAO Ở ĐÂU CŨNG CÓ TRÒ CHƠI? (89..100)
    89: "Bin và Ngầu đứng giữa vòng xoáy các thời đại tìm câu trả lời vì sao ta chơi",
    90: "Hai chú chó con cúi thấp mình vẫy đuôi: Tín hiệu mời chơi từ tự nhiên",
    91: "Bản năng vui chơi xuất hiện trước cả ngôn ngữ và trước ván cờ đầu tiên",
    92: "Nhà nghiên cứu Johan Huizinga với cuốn sách Homo Ludens: Con người biết chơi",
    93: "Giả thuyết 1: Nông nghiệp dư thừa lương thực tạo ra thời gian rảnh rỗi",
    94: "Giả thuyết 2: Tập dượt an toàn trước chiến tranh và rủi ro cuộc sống",
    95: "Giả thuyết 3: Kết nối xã hội, luật chơi chung xây dựng niềm tin giữa người lạ",
    96: "Giả thuyết 4: Bộ não bị thu hút bởi sự không chắc chắn và tính bất ngờ",
    97: "Trạng thái dòng chảy Flow: Khi thử thách cân bằng với khả năng của bạn",
    98: "Đời thật thua thì mất thật, trong trò chơi ta được tập thất bại dịu dàng",
    99: "Vì chơi vui: Lý do đơn giản và thuần khiết nhất mà khoa học chưa giải thích hết",
    100: "Bin mỉm cười nhận ra chơi game là bản năng nuôi dưỡng tâm hồn con người",

    # PHẦN 8 — TỪ BÀN CỜ ĐẾN MÀN HÌNH (101..106)
    101: "Dòng sông thời gian: Mỗi trò chơi là tấm gương phản chiếu thời đại của nó",
    102: "Ur nói về vận may, Senet nói về cõi chết, Cờ vua về chiến tranh, Rắn thang về đạo đức",
    103: "Nỗi lo muôn thuở của người lớn về việc con trẻ mê chơi từ xúc xắc đến điện tử",
    104: "Trò chơi hiện đại: Luật, mục tiêu, thử thách và phần thưởng chuyển lên màn hình",
    105: "Viên xúc xắc Ngầu vẫn vậy, luôn chịu trách nhiệm cho mỗi lần bạn xui",
    106: "Màn hình sáng rực kết nối hàng triệu người chơi khắp các châu lục",

    # LỜI KẾT (107..108)
    107: "Từ Ur cổ đại đến điện thoại thông minh: Con người cần một sân chơi an toàn",
    108: "Bin và Ngầu cúi đầu cảm ơn khán giả đã đồng hành suốt 5.000 năm lịch sử"
}

def main():
    script_txt = Path("kịch bản/Người Ai Cập cổ đại cũng cày game 5.000 năm lịch sử trò chơi/loi-doc-tts-lich-su-tro-choi.txt")
    if not script_txt.exists():
        print(f"❌ Không tìm thấy {script_txt}")
        return

    text = script_txt.read_text(encoding="utf-8")
    lines = text.splitlines()

    sections = []
    current_sec_title = None
    current_paras = []

    for line in lines:
        line_s = line.strip()
        if line_s.startswith('[') and line_s.endswith(']'):
            if current_sec_title:
                sections.append((current_sec_title, current_paras))
            current_sec_title = line_s[1:-1]
            current_paras = []
        elif line_s:
            current_paras.append(line_s)
    if current_sec_title:
        sections.append((current_sec_title, current_paras))

    print(f"✅ Đọc được {len(sections)} phần từ file kịch bản.")

    chapters = []
    for idx, conf in enumerate(SECTIONS_CONFIG):
        sec_title, paras = sections[idx]
        img_start = conf["img_start"]
        img_end = conf["img_end"]

        img_list = []
        desc_list = []
        for i in range(img_start, img_end + 1):
            img_rel = f"images/lich-su-tro-choi/{i:03d}.png"
            img_list.append(img_rel)
            desc_list.append(IMAGE_DESCRIPTIONS.get(i, f"Hình ảnh minh họa #{i:03d}"))

        full_text = "\n\n".join(paras)
        chapters.append({
            "id": conf["id"],
            "chapter_num": conf["chapter_num"],
            "part_label": conf["part_label"],
            "historical_era": conf["historical_era"],
            "title": conf["title"],
            "subtitle": conf["subtitle"],
            "word_count": len(full_text.split()),
            "paragraphs": paras,
            "text": full_text,
            "images": img_list,
            "image_descriptions": desc_list,
            "img_count": len(img_list)
        })

    out_file = Path("src/data/game_history_chapters.json")
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(chapters, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã ghi nhận {len(chapters)} phần vào {out_file}")

    total_imgs = sum(c['img_count'] for c in chapters)
    total_words = sum(c['word_count'] for c in chapters)
    print(f"📊 Tổng số ảnh: {total_imgs} / 108 | Tổng số từ: {total_words} từ.")

if __name__ == "__main__":
    main()
