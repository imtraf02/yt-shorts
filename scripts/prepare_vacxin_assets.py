# -*- coding: utf-8 -*-
"""
Script chuẩn bị cấu trúc 8 chương và metadata 99 ảnh cho phim tài liệu:
'Vacxin: Từ Con Bò Đến Mũi Tiêm Đầu Tiên' (16:9 Widescreen Documentary).
Xuất ra src/data/vacxin_chapters.json.
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

# 99 mô tả phân cảnh tiếng Việt chi tiết cho Scene Context Badge
SCENE_DESCRIPTIONS_VN = [
    # Mở đầu (001 - 007)
    "Chú bò hoạt hình trên đồng cỏ nước Anh với biểu tượng mũi tiêm phát sáng",
    "Những cô gái vắt sữa lúc bình minh dưới ánh mắt quan sát của bác sĩ nông thôn",
    "Bóng ma virus đậu mùa khổng lồ bao trùm ngôi làng thời xưa",
    "Bin bước ra từ cánh cổng thời gian cùng chiến binh bạch cầu Bạch",
    "Bin bám chặt cỗ xe du hành thời gian tự chế đang xóc nảy dữ dội",
    "Chiến binh bạch cầu Bạch đứng nghiêm trang với khiên và mũ hiệp sĩ nhỏ",
    "Nữ y tá thân thiện trao biểu tượng like cho Bin và Bạch trong phòng khám",
    
    # Phần 1: Kẻ thù tên đậu mùa (008 - 018)
    "Bản đồ thế giới với các đốm đỏ bệnh đậu mùa lan tràn qua các châu lục",
    "Người bệnh nằm nghỉ trên giường với các nốt đỏ và người thân chăm sóc",
    "Biểu tượng 10 người dân với 3 bóng người mờ dần: tỷ lệ tử vong 30%",
    "Gương mặt nhân vật mang những vết sẹo đậu mùa trong không gian trầm tư",
    "Căn phòng lăng mộ Ai Cập với xác ướp Pharaoh mang dấu vết đậu mùa cổ đại",
    "Quảng trường thị trấn châu Âu thế kỷ 18 trong nỗi âu lo mùa dịch bệnh",
    "Những con thuyền gỗ cập bến châu Mỹ mang theo mầm bệnh xa lạ",
    "Căn phòng hoàng gia trang nghiêm với chiếc vương miện trên gối tang",
    "Ngôi miếu nhỏ nghi ngút khói hương thờ vị thần bảo hộ trẻ em khỏi đậu mùa",
    "Người sống sót đứng kiêu hãnh với vầng hào quang bảo vệ khỏi bệnh tật",
    "Bin nảy ra ý tưởng táo bạo khiến bạch cầu Bạch giật mình lo lắng",
    
    # Phần 2: Trước Jenner, người xưa đã tìm ra một cách (019 - 034)
    "Đôi bàn tay từ Trung Hoa, Ấn Độ và Trung Đông cầm dụng cụ cấy đậu",
    "Sơ đồ cấy mầm bệnh thể nhẹ từ người này sang người khác",
    "Thầy lang Trung Hoa với ống trúc và phụ nữ Trung Đông với kim cấy đậu",
    "Chiếc cân thăng bằng giữa rủi ro cấy đậu và hiểm họa đậu mùa tự nhiên",
    "Gia đình đứng trước ngã rẽ lựa chọn giữa nguy cơ và cơ hội sống",
    "Chân dung bà quý tộc Mary Wortley Montagu thông thái và kiên định",
    "Bà Montagu ngắm nhìn vết sẹo trên gương mặt trước gương với lòng quyết tâm",
    "Sân vườn Ottoman nơi phụ nữ tụ họp và tiến hành cấy đậu mùa truyền thống",
    "Bà Montagu cho con gái cấy đậu trước ánh mắt hoài nghi của giới bác sĩ London",
    "Bin và Bạch lấp ló sau rèm nhìn các bác sĩ quý tộc đang nhíu mày soi kính",
    "Hành lang đá nhà tù Newgate nơi 6 tử tù được trao cơ hội sống sót",
    "Người đàn ông nô lệ Onesimus giải thích cách cấy đậu cho mục sư tại Boston",
    "Bác sĩ Zabdiel Boylston cẩn thận cấy đậu cho người dân trong dịch bệnh 1721",
    "Bác sĩ Boylston cặm cụi ghi chép số liệu tỷ lệ tử vong chi tiết từng ca bệnh",
    "Bạch cầu Bạch đứng cạnh cuốn sổ số liệu mở ra chân lý khoa học",
    "Thế giới cổ đại đứng trước canh bạc lớn, khao khát một giải pháp an toàn",
    
    # Phần 3: Người vắt sữa và con bò (035 - 048)
    "Bác sĩ Edward Jenner trầm ngâm giữa khung cảnh đồng quê Gloucestershire",
    "Những cô gái vắt sữa khỏe mạnh vui vẻ bên đàn bò sữa thảnh thơi",
    "Bàn tay cô gái vắt sữa với vết đậu bò nhẹ nhàng không nguy hiểm",
    "Nông dân Benjamin Jesty cùng gia đình được bảo vệ nhờ nhiễm đậu bò",
    "Bác sĩ Jenner chăm chú quan sát kính lúp và ghi chép quyết tâm chứng minh",
    "Jenner lấy mẫu đậu bò từ bàn tay cô gái vắt sữa Sarah Nelmes",
    "Jenner cẩn thận đưa mẫu đậu bò vào tay cậu bé James Phipps 8 tuổi",
    "Cậu bé James Phipps nghỉ ngơi hồi phục nhanh chóng bên gia đình",
    "Cuộc thử nghiệm quyết định: Jenner cho cậu bé tiếp xúc mầm đậu mùa thật",
    "James Phipps hoàn toàn khỏe mạnh, chứng minh giả thuyết Jenner là đúng",
    "Hội Hoàng gia London ngập ngừng xem bản báo cáo đầu tiên của Jenner",
    "Jenner tự tin xuất bản công trình lịch sử năm 1798 mang tên Vacca",
    "Bin và Bạch bật cười thích thú bên chú bò sữa đeo vòng hoa vinh danh",
    "Jenner tiêm vacxin miễn phí cho người nghèo tại Đền thờ Vaccinia trong vườn",
    
    # Phần 4: Tin tốt lan nhanh, nỗi lo cũng vậy (049 - 062)
    "Bản đồ châu Âu với những mũi tên lan truyền phương pháp tiêm đậu bò",
    "Những lá thư niêm phong sáp và lọ mẫu vacxin vượt biển trên tàu buồm",
    "Sơ đồ chuỗi truyền vacxin sống từ cánh tay này sang cánh tay khác",
    "Đoàn thám hiểm Hoàng gia Tây Ban Nha 1803 giương buồm vượt Đại Tây Dương",
    "Nhóm trẻ em mồ côi kiên cường trên boong tàu gìn giữ ngọn lửa vacxin",
    "Đoàn thám hiểm mang vacxin cứu sống hàng vạn người dân châu Mỹ và Philippines",
    "Napoleon Bonaparte trao huân chương danh dự vinh danh bác sĩ Edward Jenner",
    "Người dân tụ tập xôn xao bàn tán trước những tin đồn kỳ quái",
    "Bức tranh biếm họa năm 1802 vẽ cảnh người tiêm mọc sừng và đầu bò",
    "Bin và Bạch ngơ ngác nhìn người biểu tình cầm tấm biển vẽ người mọc sừng",
    "Bác sĩ kiên nhẫn mở sách đối thoại và giải thích cặn kẽ cho người dân",
    "Làn sóng phản đối luật bắt buộc tiêm chủng tại nước Anh năm 1853",
    "Bạch cầu Bạch giơ cao chiếc khiên trước đồ thị ca bệnh đậu mùa giảm dốc đứng",
    "Đồ thị ca bệnh giảm sâu chứng minh sức mạnh bảo vệ của tiêm chủng diện rộng",
    
    # Phần 5: Pasteur và nguyên lý luyện tập (063 - 085)
    "Chân dung nhà hóa học Louis Pasteur trong phòng thí nghiệm nước Pháp",
    "Pasteur quan sát các mẫu vi sinh vật phát sáng dưới kính hiển vi",
    "Pasteur bước vào phòng thí nghiệm ngập tràn ánh nắng sau kỳ nghỉ hè 1879",
    "Đàn gà khỏe mạnh được tiêm mẫu vi khuẩn tả đã suy yếu do để quên",
    "Pasteur kinh ngạc nhận ra đàn gà miễn nhiễm hoàn toàn với vi khuẩn độc lực mạnh",
    "Sơ đồ minh họa nguyên lý làm suy yếu mầm bệnh để cơ thể làm quen",
    "Bạch cầu Bạch tập luyện đấm bốc với hình nộm virus đeo bao cát",
    "Đội quân bạch cầu nhận diện và tiêu diệt nhanh chóng kẻ thù quen mặt",
    "Pasteur trầm ngâm bên bàn làm việc: Cơ hội chỉ đến với trí tuệ có chuẩn bị",
    "Pasteur trân trọng đặt tên phương pháp là Vacxin để tri ân Edward Jenner",
    "Cuộc thử nghiệm công khai năm 1881 với đàn cừu trước đông đảo công chúng",
    "Đàn cừu được tiêm vacxin thong dong gặm cỏ giữa sự kinh ngạc của đám đông",
    "Bin và Bạch chăm chú nhìn cuốn sổ ghi chép của nhà khoa học Pasteur",
    "Bóng ma đáng sợ của căn bệnh dại lẩn khuất trong ngõ tối thời xưa",
    "Biểu tượng căn bệnh dại từng là bản án tử không lối thoát cho con người",
    "Người mẹ tuyệt vọng dẫn cậu bé Joseph Meister 9 tuổi đến tìm Pasteur",
    "Pasteur hội ý căng thẳng cùng các bác sĩ đồng nghiệp tìm đường sống cho cậu bé",
    "Pasteur thực hiện chuỗi mũi tiêm vacxin phòng dại cho cậu bé Joseph",
    "Cậu bé Joseph Meister mỉm cười khỏe mạnh bên người mẹ tràn đầy hạnh phúc",
    "Người gác cổng Joseph Meister trưởng thành đứng trước cổng Viện Pasteur Paris",
    "Cánh cửa viện nghiên cứu mở ra kỷ nguyên mới bảo vệ con người khỏi bệnh dịch",
    "Kính hiển vi điện tử hiện đại hé lộ cấu trúc thực sự của thế giới virus",
    "Bác sĩ Jenner đứng cạnh Pasteur với ánh sáng tri thức rực rỡ xuyên thời gian",
    
    # Phần 6: Từ đó đến nay (086 - 097)
    "Mũi tiêm vacxin tỏa sáng như ngọn hải đăng che chở sự sống nhân loại",
    "Dãy lọ vacxin thế kỷ 20: bạch hầu, ho gà, uốn ván, sởi, bại liệt",
    "Gia đình Việt Nam đưa con đến trạm y tế với cuốn sổ tiêm chủng thân thương",
    "Quả địa cầu hòa bình đánh dấu chiến thắng lịch sử trước dịch đậu mùa",
    "Đại hội đồng Y tế Thế giới 1980 chính thức tuyên bố xóa sổ bệnh đậu mùa",
    "Bin và Bạch ăn mừng bên cuốn sách lịch sử đóng lại chương đậu mùa",
    "Một ngày bình yên trên đường phố: thành công thầm lặng của lá chắn tiêm chủng",
    "Phòng thí nghiệm công nghệ sinh học hiện đại với chuỗi xoắn DNA phát sáng",
    "Bác sĩ nông thôn ghi chép bên chú bò bắt đầu cho chuỗi hành trình vĩ đại",
    "Chuỗi mắt xích nhân loại cùng chung tay viết nên lịch sử y học",
    "Bạch cầu Bạch đứng gác kiên cường trên bờ thành lúc bình minh rạng rỡ",
    "Chiến binh Bạch chào tạm biệt khán giả với nụ cười tự tin và quả cảm",
    
    # Kết (098 - 099)
    "Hành trình kỳ diệu nối liền từ chú bò nước Anh đến tấm sổ tiêm chủng hôm nay",
    "Bin và Bạch vẫy tay chào tạm biệt trước cánh cổng thời gian lấp lánh ánh hoàng hôn"
]

def main():
    txt_path = Path("kịch bản/vacxin/loi-doc-tts-lich-su-vacxin.txt")
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
            "historical_era": "NGHỊCH LÝ CON BÒ",
            "title": "Thuốc Từ Một Con Bò",
            "subtitle": "Bác sĩ nông thôn và điều kỳ lạ ở những người vắt sữa bò",
        },
        {
            "id": "part2",
            "chapter_num": 2,
            "part_label": "PHẦN 1",
            "historical_era": "THẢM HỌA CỔ ĐẠI",
            "title": "Kẻ Thù Tên Đậu Mùa",
            "subtitle": "Căn bệnh cướp đi sinh mạng hàng trăm triệu người",
        },
        {
            "id": "part3",
            "chapter_num": 3,
            "part_label": "PHẦN 2",
            "historical_era": "PHƯƠNG ĐÔNG & CONSTANTINOPLE",
            "title": "Trước Jenner, Người Xưa Đã Cấy Đậu",
            "subtitle": "Bà Montagu, tù nhân Newgate và câu chuyện của Onesimus ở Boston",
        },
        {
            "id": "part4",
            "chapter_num": 4,
            "part_label": "PHẦN 3",
            "historical_era": "NƯỚC ANH NĂM 1796",
            "title": "Người Vắt Sữa Và Con Bò",
            "subtitle": "Thí nghiệm lịch sử của Edward Jenner và nguồn gốc chữ Vacca",
        },
        {
            "id": "part5",
            "chapter_num": 5,
            "part_label": "PHẦN 4",
            "historical_era": "CHÂU ÂU THẾ KỶ 19",
            "title": "Tin Tốt Lan Nhanh, Nỗi Lo Cũng Vậy",
            "subtitle": "Đoàn thám hiểm trẻ mồ côi Tây Ban Nha và tranh biếm họa mọc sừng bò",
        },
        {
            "id": "part6",
            "chapter_num": 6,
            "part_label": "PHẦN 5",
            "historical_era": "NƯỚC PHÁP NĂM 1885",
            "title": "Pasteur & Nguyên Lý Luyện Tập",
            "subtitle": "Từ con gà bị lãng quên đến cậu bé Joseph Meister thoát án tử",
        },
        {
            "id": "part7",
            "chapter_num": 7,
            "part_label": "PHẦN 6",
            "historical_era": "THẾ KỶ 20 ĐẾN NAY",
            "title": "Từ Đó Đến Nay",
            "subtitle": "Năm 1980: Đậu mùa bị xóa sổ trên toàn cầu",
        },
        {
            "id": "part8",
            "chapter_num": 8,
            "part_label": "KẾT",
            "historical_era": "LỜI KẾT",
            "title": "Buổi Diễn Tập Của Cơ Thể",
            "subtitle": "Hành trình loài người học cách tập luyện trước khi ra trận",
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
            sec_images.append(f"images/vacxin/{img_num}.png")
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

    out_file = Path("src/data/vacxin_chapters.json")
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(chapters, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n🎉 Đã tạo thành công: {out_file} (Tổng {global_img_idx - 1} ảnh)")

if __name__ == "__main__":
    main()
