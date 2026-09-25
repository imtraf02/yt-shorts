import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# Read script text
with open('scripts/figma_script.txt', 'r', encoding='utf-8') as f:
    script_text = f.read()

# Read whisper captions
with open('whisper_figma_captions.json', 'r', encoding='utf-8') as f:
    whisper_caps = json.load(f)

# Split script into words
script_words = script_text.split()
print(f"Total script words: {len(script_words)}")
print(f"Total whisper tokens: {len(whisper_caps)}")

# Let's map script words to whisper tokens
# We have 15 scenes. Let's define the exact script word ranges for each scene:
scenes_def = [
    {
        "id": "scene_1",
        "index": 1,
        "image": "images/figma-dylan-field/01-figma-scene.png",
        "badge": "⚡ NHÀ SÁNG LẬP FIGMA",
        "category": "KHỞI ĐẦU BẤT KHẢ THI",
        "text": "Dylan Field là nhà sáng lập Figma, công cụ thiết kế giao diện mà hàng triệu designer trên thế giới dùng mỗi ngày. Nhưng ít ai biết rằng ông bắt đầu bằng một ý tưởng mà gần như cả ngành công nghệ lúc đó cho là bất khả thi: làm một phần mềm thiết kế chuyên nghiệp chạy ngay trên trình duyệt web."
    },
    {
        "id": "scene_2",
        "index": 2,
        "image": "images/figma-dylan-field/02-figma-scene.png",
        "badge": "🌉 CÁI NÔI SILICON VALLEY",
        "category": "TUỔI THƠ SAY MÊ MÁY TÍNH",
        "text": "Ông sinh năm 1991, lớn lên ở vùng Bay Area, cái nôi của Thung lũng Silicon, và say mê máy tính từ nhỏ."
    },
    {
        "id": "scene_3",
        "index": 3,
        "image": "images/figma-dylan-field/03-figma-scene.png",
        "badge": "💻 BỘ ĐÔI THIÊN TÀI BROWN",
        "category": "EVAN WALLACE & WEBGL",
        "text": "Khi học Khoa học Máy tính tại Đại học Brown, ông gặp Evan Wallace, một lập trình viên đồ họa cực kỳ xuất sắc, người từng làm nên những demo WebGL khiến giới lập trình phải ngỡ ngàng. Hai người nhanh chóng nhận ra họ có thể làm được điều mà người khác nghĩ là không thể."
    },
    {
        "id": "scene_4",
        "index": 4,
        "image": "images/figma-dylan-field/04-figma-scene.png",
        "badge": "🎓 HỌC BỔNG THIEL $100.000",
        "category": "QUYẾT ĐỊNH BỎ HỌC ĐẠI HỌC",
        "text": "Năm 2012, khi đang học dở đại học, Dylan nhận được học bổng Thiel Fellowship: 100.000 đô la để bỏ học và theo đuổi ý tưởng của mình. Ông đã đồng ý."
    },
    {
        "id": "scene_5",
        "index": 5,
        "image": "images/figma-dylan-field/05-figma-scene.png",
        "badge": "🖥️ ĐẾ CHẾ ADOBE NẶNG NỀ",
        "category": "CANH BẠC CÔNG NGHỆ",
        "text": "Đó là một canh bạc lớn, vì phần mềm thiết kế lúc ấy hoàn toàn thuộc về các ông lớn như Adobe, chạy nặng nề trên máy tính cá nhân,"
    },
    {
        "id": "scene_6",
        "index": 6,
        "image": "images/figma-dylan-field/06-figma-scene.png",
        "badge": "🚫 NỖI HOÀI NGHI CẢ NGÀNH",
        "category": "KHÔNG AI TIN TRÌNH DUYỆT",
        "text": "và không ai tin trình duyệt đủ mạnh để thay thế."
    },
    {
        "id": "scene_7",
        "index": 7,
        "image": "images/figma-dylan-field/07-figma-scene.png",
        "badge": "⏳ 4 NĂM XÂY MÓNG",
        "category": "KIÊN TRÌ TRONG BÓNG TỐI",
        "text": "Hai người mất khoảng bốn năm chỉ để xây nền móng."
    },
    {
        "id": "scene_8",
        "index": 8,
        "image": "images/figma-dylan-field/08-figma-scene.png",
        "badge": "⚙️ BỘ MÁY C++ & WEBGL",
        "category": "TỐC ĐỘ NHƯ PHẦN MỀM GỐC",
        "text": "Evan viết bộ máy đồ họa bằng C++ rồi biên dịch để chạy được trên trình duyệt, tận dụng WebGL để vẽ nhanh như phần mềm cài trên máy."
    },
    {
        "id": "scene_9",
        "index": 9,
        "image": "images/figma-dylan-field/09-figma-scene.png",
        "badge": "🚀 RA MẮT CHÍNH THỨC 2016",
        "category": "CÙNG CHỈNH SỬA THỜI GIAN THỰC",
        "text": "Đến năm 2016, Figma mới ra mắt bản chính thức. Và điểm khác biệt nằm ở chỗ nhiều người có thể cùng chỉnh sửa một bản thiết kế cùng lúc, giống như Google Docs dành cho designer."
    },
    {
        "id": "scene_10",
        "index": 10,
        "image": "images/figma-dylan-field/10-figma-scene.png",
        "badge": "🔗 CHẤM DỨT NỖI ÁM ẢNH FILE",
        "category": "CHỈ CẦN MỘT ĐƯỜNG LINK",
        "text": "Cả đội không còn phải gửi file qua lại nữa."
    },
    {
        "id": "scene_11",
        "index": 11,
        "image": "images/figma-dylan-field/11-figma-scene.png",
        "badge": "💰 LỜI CHÀO MUA 20 TỶ USD",
        "category": "ADOBE CÔNG BỐ THƯƠNG VỤ",
        "text": "Figma lớn rất nhanh. Năm 2022, Adobe công bố thương vụ mua lại với giá khoảng 20 tỷ đô la."
    },
    {
        "id": "scene_12",
        "index": 12,
        "image": "images/figma-dylan-field/12-figma-scene.png",
        "badge": "⚖️ CƠ QUAN QUẢN LÝ CHẶN ĐỨNG",
        "category": "ANH & CHÂU ÂU TUÝT CÒI",
        "text": "Nhưng các cơ quan quản lý ở Anh và châu Âu lo ngại về việc độc quyền, và cuối năm 2023, thương vụ bị hủy."
    },
    {
        "id": "scene_13",
        "index": 13,
        "image": "images/figma-dylan-field/13-figma-scene.png",
        "badge": "💵 PHÍ ĐỀN BÙ 1 TỶ USD",
        "category": "CHỨNG MINH GIÁ TRỊ KHỔNG LỒ",
        "text": "Adobe phải trả khoản phí chấm dứt khoảng 1 tỷ đô la. Trớ trêu thay, chính thương vụ thất bại ấy lại chứng minh giá trị của Figma lớn đến mức nào."
    },
    {
        "id": "scene_14",
        "index": 14,
        "image": "images/figma-dylan-field/14-figma-scene.png",
        "badge": "📈 IPO LỊCH SỬ TĂNG 250%",
        "category": "TỶ PHÚ NGOÀI BA MƯƠI",
        "text": "Tháng 7 năm 2025, Figma lên sàn chứng khoán. Ngày đầu tiên, cổ phiếu tăng hơn 250%, một trong những vụ IPO công nghệ gây chú ý nhất năm, và biến Dylan thành tỷ phú ở tuổi ngoài ba mươi."
    },
    {
        "id": "scene_15",
        "index": 15,
        "image": "images/figma-dylan-field/15-figma-scene.png",
        "badge": "✨ THAY ĐỔI CẢ NGÀNH THIẾT KẾ",
        "category": "DYLAN FIELD - KẺ MỘNG MƠ",
        "text": "Người thanh niên bỏ học đại học để làm một thứ mà ai cũng nói không thể, cuối cùng lại làm thay đổi cách cả ngành thiết kế làm việc, đó chính là Dylan Field."
    }
]

# Verify total text reconstruction equals original script text
reconstructed_text = " ".join([s["text"] for s in scenes_def])
clean_orig = re.sub(r'\s+', ' ', script_text).strip()
clean_recon = re.sub(r'\s+', ' ', reconstructed_text).strip()
print(f"Text matches perfectly: {clean_orig == clean_recon}")
if clean_orig != clean_recon:
    print("Diff in texts!")
    print("Orig length:", len(clean_orig))
    print("Recon length:", len(clean_recon))

# Word counts for each scene
for s in scenes_def:
    w_count = len(s["text"].split())
    print(f"Scene {s['index']:2d} ({w_count:2d} words): {s['text'][:50]}...")
