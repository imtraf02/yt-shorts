# -*- coding: utf-8 -*-
"""
Script chuẩn bị cấu trúc 10 chương và metadata 84 ảnh cho phim tài liệu:
'Vì Sao Máy Tính Chỉ Hiểu Số 0 Và 1?' (16:9 Widescreen Documentary).
Xuất ra src/data/binary_chapters.json.
"""

import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

SCENE_DESCRIPTIONS_VN = [
    # Mở đầu (001 - 004)
    "Thác nước số nhị phân 0 và 1 phát sáng đổ xuống màn hình máy tính",
    "Các chữ số 2 và 10 tan vỡ thành cát bụi, chỉ còn lại số 0 và 1 phát sáng kiên định",
    "Một công tắc bật tắt đơn giản bên cạnh muôn vàn biểu tượng hình ảnh, âm nhạc và dữ liệu",
    "Chiếc công tắc đèn tường phát sáng cùng dấu vết lịch sử của bàn tính và bánh răng",

    # Phần 1: Trước cả điện, con người đã mơ về số nhị phân (005 - 023)
    "Đôi bàn tay đếm mười ngón bên đống lửa ấm áp cùng chiếc bàn tính cổ",
    "Chiếc bàn tính cổ với những hạt gỗ trượt trên thanh que dưới bàn tay người thợ",
    "Sáu vạch liền và đứt của quẻ Kinh Dịch cổ đại xếp chồng lên nhau huyền bí",
    "Quẻ Kinh Dịch cổ đại chuyển hóa tinh tế thành chiếc công tắc nhị phân hiện đại",
    "Nhà toán học Gottfried Leibniz bên bàn làm việc dưới ánh nến cùng những dãy ký hiệu nhị phân",
    "Trang bản thảo năm 1703 của Leibniz mô tả phép tính nhị phân đặt cạnh cây bút lông",
    "Cuộc gặp gỡ tư tưởng xuyên lục địa giữa quẻ Kinh Dịch phương Đông và nhị phân Leibniz",
    "Leibniz mỉm cười gấp cuốn sổ ghi chép, khép lại trò chơi trí tuệ đẹp đẽ của thời đại",
    "Cỗ máy tính cơ học bằng đồng thau tinh xảo với các mặt số xoay mười nấc",
    "Nhà toán học Blaise Pascal quay tay quay trên cỗ máy tính bánh răng cổ",
    "Bánh răng cỗ máy Pascal bị kẹt và bốc khói nhẹ khiến nhà phát minh bối rối",
    "Khung cửi dệt vải lớn bằng gỗ trong xưởng dệt thời kỳ đầu công nghiệp",
    "Tấm bìa đục lỗ được đưa vào khung cửi Jacquard điều khiển từng sợi chỉ",
    "Tấm vải dệt tuyệt đẹp hiện ra với hoa văn điều khiển bởi các lỗ đục có hoặc không",
    "Nhà phát minh Charles Babbage bên cỗ máy tính cơ học khổng lồ đầy tham vọng",
    "Nữ học giả Ada Lovelace bên bàn viết với các ghi chép thuật toán đầu tiên trong lịch sử",
    "Căn phòng phân loại dữ liệu dân số bằng máy đọc thẻ đục lỗ của Herman Hollerith",
    "Bức tranh kết nối quẻ bói, bản thảo, thẻ đục lỗ và bánh răng xuyên qua dòng thời gian",
    "Dòng chảy lịch sử hội tụ vào chiếc công tắc đèn hiện đại",

    # Phần 2: Điện chỉ biết bật và tắt (024 - 031)
    "Bóng đèn chia đôi: một nửa bừng sáng rực rỡ, một nửa tối đen tĩnh lặng",
    "Dòng điện chạy qua dây dẫn khép kín và bị chặn lại khi mạch hở",
    "Biểu tượng mạch điện gật đầu tán thành trước chiếc công tắc bật tắt rõ ràng",
    "Mặt đồng hồ với mười vạch điện áp chen chúc sát nhau dưới kính lúp lo lắng",
    "Mười mức điện áp dao động méo mó và nhòe lẫn vào nhau gây lỗi tín hiệu",
    "Mặt đồng hồ chỉ với hai mức điện áp rộng thênh thang, cách biệt an toàn tuyệt đối",
    "Đường tín hiệu nhị phân vững vàng vượt qua đám mây nhiễu điện mà không hề sai lệch",
    "Hai thanh tín hiệu 0 và 1 đứng vững chãi kiên cố như hai cột mốc không thể lay chuyển",

    # Phần 3: Một nhà toán học nghĩ về đúng và sai (032 - 038)
    "Chân dung nhà toán học George Boole trầm tư bên bảng đen giữa thế kỷ 19",
    "Boole viết lên bảng các phương trình logic biến đúng sai thành phép toán",
    "Ba khối hình đại diện cho ba phép toán logic cơ bản: VÀ, HOẶC, KHÔNG",
    "Khối logic VÀ chỉ sáng khi cả hai điều kiện cùng kích hoạt",
    "Khối logic HOẶC sáng rực rỡ khi chỉ cần một trong hai điều kiện được đáp ứng",
    "Boole mỉm cười nhẹ bên cuốn sách toán học thuần túy của mình",
    "Cuốn sách toán của Boole nằm yên trên giá sách như một hạt giống chờ ngày nảy mầm",

    # Phần 4: Người nối logic với dây điện (039 - 045)
    "Chàng sinh viên Claude Shannon 21 tuổi miệt mài bên sơ đồ mạch điện tại MIT",
    "Shannon phát hiện mạch điện công tắc hoạt động chuẩn xác theo logic đúng sai của Boole",
    "Hai công tắc nối tiếp nhau cùng bật sáng đèn: minh họa hoàn hảo cho phép VÀ",
    "Hai công tắc nối song song chỉ cần một cái bật là sáng đèn: minh họa phép HOẶC",
    "Bản luận văn thạc sĩ năm 1937 của Shannon phát sáng như ngọn hải đăng công nghệ",
    "Bàn tay kỹ sư lắp ráp các công tắc kim loại tạo thành mạch logic biết suy luận",
    "Sơ đồ nối liền từ logic trừu tượng thành mạng lưới dây điện và công tắc thực tế",

    # Phần 5: Từ cái công tắc to bằng bàn tay đến con chip nhỏ hơn hạt gạo (046 - 057)
    "Chiếc rơle điện cơ đầu tiên kêu lách cách với thanh kim loại đóng mở",
    "Kỹ sư máy tính soi đèn pin tìm thấy con bướm đêm kẹt giữa hai tiếp điểm rơle",
    "Con bướm đêm được dán cẩn thận vào sổ nhật ký máy tính cạnh dòng ghi chú 'bug'",
    "Căn phòng khổng lồ ngập tràn hàng nghìn bóng đèn chân không tỏa nhiệt nóng rực",
    "Một bóng đèn chân không bị cháy làm cả hệ thống máy tính khổng lồ ngừng hoạt động",
    "Ba nhà khoa học tại Bell Labs 1947 ngắm nhìn chiếc transistor đầu tiên vừa chế tạo",
    "Chiếc transistor nhỏ xíu đóng mở dòng điện êm ru mà không tỏa nhiệt",
    "Bàn tay đặt transistor nhỏ xíu cạnh chiếc bóng đèn chân không to lớn cồng kềnh",
    "Miếng silicon nhỏ xíu chứa hàng nghìn transistor li ti phát sáng dưới kính hiển vi",
    "Kỹ sư Gordon Moore bên bảng đồ thị biểu diễn định luật số lượng transistor tăng gấp đôi",
    "Đường cong định luật Moore vươn thẳng đứng qua nhiều thập kỷ phát triển chip",
    "Bàn tay cầm chiếc điện thoại thông minh hiện đại chứa hàng tỷ transistor trong túi áo",

    # Phần 6: Xây một con số, một chữ cái, một bức ảnh từ những cái công tắc (058 - 072)
    "Một hàng tám công tắc nhỏ bật tắt đại diện cho một byte dữ liệu",
    "Tám bit nhị phân nhảy múa biến đổi từ số 0 đến số 255",
    "Bảng mã ASCII quy ước từng chữ cái tiếng Anh thành một dãy số nhị phân riêng",
    "Chữ cái A phát sáng rực rỡ cùng chuỗi mã nhị phân 01000001",
    "Hai màn hình máy tính khác nhau cùng hiển thị chung một chữ cái nhờ bảng mã thống nhất",
    "Bảng mã Unicode mở rộng rực rỡ chứa tiếng Việt, chữ tượng hình và biểu tượng cảm xúc",
    "Nhóm pixel trên màn hình phóng to để lộ ma trận màu sắc cấu thành từ các byte",
    "Một bức ảnh phong cảnh tuyệt đẹp hình thành từ hàng triệu điểm ảnh nhị phân",
    "Sóng âm thanh analog uốn lượn được lấy mẫu và chuyển hóa thành dãy số nhị phân",
    "Bản nhạc số mượt mà phát ra từ những con số 0 và 1 được giải mã",
    "Cuộn phim video số chuyển động mượt mà từ hàng nghìn khung hình nhị phân nối tiếp",
    "Một hạt bụi vũ trụ bay xẹt qua chip làm đổi trạng thái của một bit nhị phân",
    "Bit chẵn lẻ kiểm tra như người lính gác phát hiện ngay bit dữ liệu bị lỗi",
    "Dữ liệu tải xuống nguyên vẹn hoàn hảo qua hàng nghìn cây số cáp quang biển",
    "Thế giới số sống động trên màn hình là bản giao hưởng của hàng tỷ công tắc nhỏ",

    # Phần 7: Từ công tắc đến phép tính (073 - 077)
    "Sơ đồ mạch cộng nhị phân nhỏ khéo léo tạo ra bit tổng và bit nhớ",
    "Bàn tay làm phép cộng tay có nhớ tương đồng với cơ chế của mạch bán cộng",
    "Mạng lưới hàng nghìn mạch cộng vi mô phối hợp nhịp nhàng bên trong bộ vi xử lý CPU",
    "Bộ vi xử lý hiện đại tính toán hàng tỷ phép toán logic trong một chớp mắt",
    "Mọi trò chơi 3D và ứng dụng phức tạp đều chẻ nhỏ thành các phép VÀ, HOẶC, KHÔNG",

    # Phần 8: Liệu có cần mãi chỉ hai trạng thái? (078 - 081)
    "Nhà khoa học bên cỗ máy tính lượng tử hình đèn chùm vàng trong phòng thí nghiệm",
    "Hạt qubit lượng tử lơ lửng trong trạng thái chồng chập mờ ảo giữa cả 0 và 1",
    "Sự đối lập thú vị giữa công tắc nhị phân dứt khoát và qubit lượng tử bí ẩn",
    "Trái Đất kỹ thuật số vẫn vận hành bền bỉ trên nền tảng nhị phân vững chắc",

    # Lời kết (082 - 084)
    "Hành trình kỳ vĩ kết nối từ quẻ bói cổ, Leibniz, Shannon đến con chip hiện đại",
    "Biểu tượng số 0 và 1 lặp lại hàng tỷ lần mỗi giây với độ chính xác tuyệt đối",
    "Màn hình máy tính mỉm cười chào tạm biệt khán giả trong ánh sáng số lung linh"
]

def main():
    txt_path = Path("kịch bản/vi sao may tinh hieu 0 va 1/loi-doc-tts-so-0-va-1.txt")
    if not txt_path.exists():
        print(f"❌ Không tìm thấy {txt_path}")
        return

    text = txt_path.read_text(encoding="utf-8")
    raw_sections = re.split(r'\n(?=\[[^\]]+\])', text.strip())

    chapter_configs = [
        {
            "id": "part1",
            "chapter_num": 1,
            "part_label": "MỞ ĐẦU",
            "historical_era": "NGHỊCH LÝ 0 VÀ 1",
            "title": "Bên Trong Chiếc Máy Tính",
            "subtitle": "Vì sao vạn vật số trên màn hình đều chỉ bắt đầu từ hai con số?",
        },
        {
            "id": "part2",
            "chapter_num": 2,
            "part_label": "PHẦN 1",
            "historical_era": "TIỀN ĐỀ LỊCH SỬ",
            "title": "Trước Cả Điện, Giấc Mơ Nhị Phân",
            "subtitle": "Từ quẻ Kinh Dịch, Leibniz đến khung cửi dệt vải Jacquard và Ada Lovelace",
        },
        {
            "id": "part3",
            "chapter_num": 3,
            "part_label": "PHẦN 2",
            "historical_era": "VẬT LÝ DÒNG ĐIỆN",
            "title": "Điện Chỉ Biết Bật Và Tắt",
            "subtitle": "Vì sao hai trạng thái đáng tin cậy hơn mười trạng thái chen chúc?",
        },
        {
            "id": "part4",
            "chapter_num": 4,
            "part_label": "PHẦN 3",
            "historical_era": "TOÁN HỌC THẾ KỶ 19",
            "title": "George Boole & Logic Đúng Sai",
            "subtitle": "Biến suy luận thành phép toán đại số với VÀ, HOẶC, KHÔNG",
        },
        {
            "id": "part5",
            "chapter_num": 5,
            "part_label": "PHẦN 4",
            "historical_era": "NĂM 1937",
            "title": "Claude Shannon Nối Logic Với Dây Điện",
            "subtitle": "Luận văn thạc sĩ thế kỷ biến công tắc thành cỗ máy biết suy luận",
        },
        {
            "id": "part6",
            "chapter_num": 6,
            "part_label": "PHẦN 5",
            "historical_era": "KỶ NGUYÊN BÁN DẪN",
            "title": "Từ Rơle Kêu Lách Cách Đến Transistor",
            "subtitle": "Sự cố con bướm đêm, phòng thí nghiệm Bell 1947 và định luật Moore",
        },
        {
            "id": "part7",
            "chapter_num": 7,
            "part_label": "PHẦN 6",
            "historical_era": "MÃ HÓA KỸ THUẬT SỐ",
            "title": "Xây Dựng Thế Giới Số Từ 0 Và 1",
            "subtitle": "Bit, byte, bảng mã ASCII, Unicode, điểm ảnh pixel và âm thanh số",
        },
        {
            "id": "part8",
            "chapter_num": 8,
            "part_label": "PHẦN 7",
            "historical_era": "VI KIẾN TRÚC CPU",
            "title": "Từ Công Tắc Đến Phép Tính",
            "subtitle": "Mạch cộng nhị phân và cách hàng tỷ phép tính đơn giản tạo nên trí tuệ máy",
        },
        {
            "id": "part9",
            "chapter_num": 9,
            "part_label": "PHẦN 8",
            "historical_era": "TƯƠNG LAI LƯỢNG TỬ",
            "title": "Liệu Có Mãi Mãi Chỉ 0 Và 1?",
            "subtitle": "Máy tính lượng tử qubit và ranh giới vật lý của công nghệ nhị phân",
        },
        {
            "id": "part10",
            "chapter_num": 10,
            "part_label": "KẾT",
            "historical_era": "LỜI KẾT",
            "title": "Hành Trình Của Hai Con Số",
            "subtitle": "Lặp lại một việc cực kỳ đơn giản hàng tỷ lần mỗi giây",
        },
    ]

    chapters = []
    global_img_idx = 1

    for s_idx, sec_text in enumerate(raw_sections):
        lines = [line.strip() for line in sec_text.split("\n") if line.strip()]
        header = lines[0].strip("[]")
        paras = [l for l in lines[1:] if not l.startswith("[")]
        
        cfg = chapter_configs[s_idx]
        sec_images = []
        sec_descs = []
        for p in paras:
            img_num = f"{global_img_idx:03d}"
            sec_images.append(f"images/vi-sao-may-tinh-0-va-1/{img_num}.png")
            sec_descs.append(SCENE_DESCRIPTIONS_VN[global_img_idx - 1])
            global_img_idx += 1

        word_count = sum(len(p.split()) for p in paras)

        ch_obj = {
            "id": cfg["id"],
            "chapter_num": cfg["chapter_num"],
            "part_label": cfg["part_label"],
            "historical_era": cfg["historical_era"],
            "title": cfg["title"],
            "subtitle": cfg["subtitle"],
            "paragraphs": paras,
            "word_count": word_count,
            "images": sec_images,
            "image_descriptions": sec_descs,
        }
        chapters.append(ch_obj)
        print(f"✅ {cfg['id']} [{cfg['part_label']}]: {len(paras)} đoạn | {len(sec_images)} ảnh | {word_count} từ")

    out_file = Path("src/data/binary_chapters.json")
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(chapters, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n🎉 Đã tạo thành công: {out_file} (Tổng {global_img_idx - 1} ảnh)")

if __name__ == "__main__":
    main()
