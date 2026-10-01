# -*- coding: utf-8 -*-
"""
Script tính toán chính xác imageStartFrames cho 170 ảnh trong 13 chương của DinosaurDocumentary.
Dựa vào từ khóa trong dinosaurCaptions.ts và phân bổ nhịp nhàng theo câu chữ audio.
Cập nhật trực tiếp vào src/data/dinosaurData.ts.
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

# Bộ từ khóa mốc (anchor cues) cho 170 ảnh qua 13 phần
IMAGE_CUES = {
    # PHẦN 1 — MỞ BÀI (10 ảnh: 1..10)
    "part1": [
        ["trước", "khi", "bắt", "đầu"],                      # 001: Pteranodon sải cánh
        ["con", "thằn", "lằn", "bay"],                       # 002: So sánh 3 nhóm
        ["không", "phải", "khủng", "long"],                  # 003: Plesiosaurus cổ dài
        ["quái", "vật", "biển", "khổng", "lồ"],              # 004: So sánh xương hông đứng thẳng vs chìa ngang
        ["nghe", "có", "vẻ", "khó", "tin"],                  # 005: Mosasaurus đại dương
        ["cấu", "trúc", "của", "khớp", "hông"],              # 006: Cây tiến hóa bò sát
        ["những", "sinh", "vật", "bay", "lượn"],             # 007: Thước đo con người vs hóa thạch 160 triệu năm
        ["vậy", "khủng", "long", "thực", "sự", "là", "gì"],  # 008: Bản đồ hệ sinh thái tiền sử
        ["loài", "người", "hiện", "đại", "chúng", "ta"],     # 009: Toàn cảnh các nhóm khủng long
        ["trong", "video", "này", "chúng", "ta", "sẽ"]       # 010: Bình minh thảm họa 66 triệu năm
    ],

    # PHẦN 2 — HAI NHÁNH CHÍNH (6 ảnh: 11..16)
    "part2": [
        ["trước", "khi", "đi", "vào", "từng", "nhóm"],       # 011: Cây tiến hóa hai nhánh chính
        ["cấu", "trúc", "của", "xương", "hông"],             # 012: So sánh giải phẫu xương hông
        ["saurischia", "nghĩa", "là", "hông"],               # 013: Theropod và Sauropod nhóm hông thằn lằn
        ["nhóm", "thứ", "hai", "được", "gọi", "là"],         # 014: Chim tiến hóa từ Saurischia
        ["ornithischia", "nghĩa", "là"],                     # 015: Sổ tay giải phẫu cổ sinh vật học
        ["với", "nền", "tảng", "phân", "loại"]               # 016: Cây gia phả tỏa sáng các nhóm
    ],

    # PHẦN 3 — NHÓM THEROPODA (24 ảnh: 17..40)
    "part3": [
        ["nhóm", "đầu", "tiên"],                              # 017: T-Rex trong rừng
        ["theropoda", "nhóm", "khủng", "long", "ăn", "thịt"],# 018: Cận cảnh đầu T-Rex
        ["xương", "rỗng", "và", "ba", "ngón", "chân"],       # 019: T-Rex gầm vang trời
        ["đa", "dạng", "và", "thành", "công"],               # 020: Bầy Velociraptor rình mồi
        ["loài", "chim", "hiện", "đại"],                     # 021: Cận cảnh Velociraptor có lông
        ["tyrannosaurus", "rex"],                             # 022: Spinosaurus lội sông
        ["dài", "tới", "mười", "hai", "mét"],                # 023: Cận cảnh Spinosaurus đớp cá
        ["lực", "cắn", "kinh", "hoàng"],                     # 024: Ornithomimid chạy nhanh như đà điểu
        ["nghiền", "nát", "xương"],                          # 025: Therizinosaurus vuốt lưỡi hái
        ["kẻ", "săn", "mồi", "đỉnh", "cao"],                 # 026: Microraptor bốn cánh lướt gió
        ["velociraptor"],                                    # 027: Archaeopteryx hóa thạch chuyển tiếp
        ["móng", "vuốt", "hình", "lưỡi", "liềm"],            # 028: Allosaurus kẻ săn mồi kỷ Jura
        ["bộ", "não", "phát", "triển"],                      # 029: Ceratosaurus sừng mũi độc đáo
        ["săn", "mồi", "theo", "đàn"],                       # 030: Carnotaurus sừng bò sát
        ["spinosaurus"],                                     # 031: Carcharodontosaurus răng cá mập
        ["cánh", "buồm", "lớn", "trên", "lưng"],             # 032: Dromaeosauridae săn mồi phối hợp
        ["chuyên", "săn", "cá"],                             # 033: Theropod con nép mình trong tổ
        ["thích", "nghi", "với", "môi", "trường", "nước"],   # 034: Hóa thạch dấu chân ba ngón
        ["không", "phải", "tất", "cả", "theropoda"],         # 035: So sánh kích thước Theropod
        ["loài", "ăn", "thực", "vật"],                       # 036: Sọ Theropod với răng cưa sắc bén
        ["therizinosaurus"],                                 # 037: Theropod lông vũ trong tuyết
        ["móng", "vuốt", "khổng", "lồ", "như", "lưỡi", "hái"],# 038: Móng vuốt lưỡi liềm sát thủ
        ["microraptor"],                                     # 039: Hộp sọ T-Rex trong bảo tàng
        ["tổ", "tiên", "trực", "tiếp", "của", "loài", "chim"]# 040: Ánh sáng bình minh trên dấu chân bạo chúa
    ],

    # PHẦN 4 — NHÓM SAUROPODOMORPHA (20 ảnh: 41..60)
    "part4": [
        ["nhánh", "thứ", "hai", "thuộc", "về", "saurischia"],# 041: Bầy Sauropod bên bờ hồ
        ["sauropodomorpha"],                                 # 042: Cận cảnh đầu Brachiosaurus vươn cao
        ["gã", "khổng", "lồ", "cổ", "dài"],                  # 043: Brachiosaurus ăn ngọn cây tùng
        ["sinh", "vật", "trên", "cạn", "lớn", "nhất"],       # 044: Diplodocus quất đuôi roi
        ["brachiosaurus"],                                   # 045: Apatosaurus bước đi rung chuyển đất
        ["chi", "trước", "dài", "hơn", "chi", "sau"],        # 046: Argentinosaurus khổng lồ 80 tấn
        ["vươn", "tới", "tán", "lá", "cao"],                 # 047: So sánh kích thước Sauropod vs Voi
        ["diplodocus"],                                      # 048: Cổ dài Sauropod vươn qua sông
        ["chiếc", "đuôi", "dài", "như", "roi"],              # 049: Sơ đồ giải phẫu túi khí xương rỗng
        ["argentinosaurus"],                                 # 050: Dấu chân Sauropod ngập nước thành hố
        ["dài", "hơn", "ba", "mươi", "mét"],                 # 051: Sauropod con bé nhỏ bên chân mẹ
        ["nặng", "tới", "bảy", "mươi", "hoặc", "tám", "mươi"],# 052: Răng hình cào thìa của Sauropod
        ["tương", "đương", "với", "hơn", "mười", "con", "voi"],# 053: Sỏi dạ dày Gastrolith
        ["làm", "thế", "nào", "một", "cơ", "thể"],           # 054: Camarasaurus sọ vuông chắc khỏe
        ["hệ", "thống", "túi", "khí", "tinh", "vi"],         # 055: Titanosaur mang giáp xương lưng
        ["chiếc", "cổ", "dài", "giúp", "chúng", "đứng", "yên"],# 056: Bầy Sauropod di cư qua sa mạc
        ["hút", "thực", "vật", "như", "máy", "hút", "bụi"],  # 057: Cổ vươn tới cầu vồng sau mưa
        ["nuốt", "chửng", "lá", "cây"],                      # 058: Hóa thạch trứng Sauropod tròn trịa
        ["sỏi", "dạ", "dày", "nghiền", "nát"],               # 059: Khung xương khổng lồ trải dài bảo tàng
        ["bộ", "máy", "tiêu", "hóa", "khổng", "lồ"]          # 060: Hoàng hôn trên lưng gã khổng lồ
    ],

    # PHẦN 5 — NHÓM STEGOSAURIA (12 ảnh: 61..72)
    "part5": [
        ["chuyển", "sang", "nhánh", "ornithischia"],         # 061: Stegosaurus trên nền dương xỉ
        ["stegosauria"],                                     # 062: Cận cảnh phiến lưng ngũ giác
        ["hai", "hàng", "phiến", "xương", "dựng", "đứng"],   # 063: Thagomizer bốn gai đuôi chĩa ra
        ["bốn", "gai", "nhọn", "ở", "chóp", "đuôi"],         # 064: Stegosaurus tự vệ quất đuôi Allosaurus
        ["thagomizer"],                                      # 065: Sơ đồ mạch máu phiến điều nhiệt
        ["vũ", "khí", "tự", "vệ", "cực", "kỳ", "hiệu", "quả"],# 066: Kentrosaurus gai nhọn chi chít
        ["đánh", "gãy", "xương", "kẻ", "săn", "mồi"],        # 067: Đầu nhỏ tí hon của Stegosaurus
        ["phiến", "xương", "trên", "lưng"],                  # 068: Huashanosaurus họ hàng châu Á
        ["chức", "năng", "điều", "hòa", "thân", "nhiệt"],    # 069: Stegosaurus con nép dưới bóng mẹ
        ["mạch", "máu", "dày", "đặc"],                       # 070: Bầy phiến sừng uống nước hoàng hôn
        ["tán", "nhiệt", "hoặc", "hấp", "thụ", "nhiệt"],     # 071: Hóa thạch xương phiến lưng rực rỡ
        ["khoe", "mẽ", "đe", "dọa"]                          # 072: Bóng hình hàng gai ngược sáng
    ],

    # PHẦN 6 — NHÓM ANKYLOSAURIA (12 ảnh: 73..84)
    "part6": [
        ["nếu", "stegosauria", "được", "biết", "đến"],       # 073: Ankylosaurus phủ giáp toàn thân
        ["ankylosauria", "chính", "là", "những", "chiếc"],   # 074: Cận cảnh chùy đuôi xương đặc
        ["lớp", "giáp", "xương", "osteoderm"],               # 075: Gai nhọn hai bên sườn xe tăng
        ["phủ", "kín", "từ", "đầu", "đến", "đuôi"],          # 076: Chùy đuôi quật gãy chân bạo chúa
        ["ngay", "cả", "mí", "mắt"],                         # 077: Nodosaurus bọc giáp không chùy
        ["chiếc", "chùy", "xương", "nặng", "hàng", "chục"],  # 078: Borealopelta hóa thạch 3D nguyên vẹn
        ["vung", "đuôi", "với", "lực", "kinh", "hoàng"],     # 079: Cận cảnh mí mắt bọc xương
        ["đập", "vỡ", "mắt", "cá", "chân"],                  # 080: Ankylosaurus ép sát đất thủ thế
        ["kẻ", "săn", "mồi", "như", "t-rex"],                # 081: Euoplocephalus sọ bọc thép
        ["thân", "hình", "bè", "thấp", "sát", "mặt", "đất"], # 082: Chú Ankylosaurus con giáp mềm
        ["phần", "bụng", "mềm"],                             # 083: Bầy xe tăng lầm lũi vượt suối
        ["áp", "sát", "xuống", "đất"]                        # 084: Hóa thạch vòm lưng bất khả xâm phạm
    ],

    # PHẦN 7 — NHÓM CERATOPSIA (16 ảnh: 85..100)
    "part7": [
        ["tiếp", "tục", "hành", "trình", "khám", "phá"],     # 085: Triceratops oai vệ giữa đồng cỏ
        ["ceratopsia", "nhóm", "khủng", "long", "sừng"],     # 086: Cận cảnh ba sừng và diềm cổ
        ["triceratops"],                                     # 087: Triceratops đối đầu T-Rex nghẹt thở
        ["ba", "chiếc", "sừng", "trên", "mặt"],              # 088: Styracosaurus diềm gai tua tủa
        ["hai", "chiếc", "sừng", "dài", "trên", "mắt"],      # 089: Protoceratops nhỏ không sừng mũi
        ["sừng", "ngắn", "trên", "mũi"],                     # 090: Centrosaurus sừng mũi cong về trước
        ["diềm", "cổ", "bằng", "xương", "khổng", "lồ"],      # 091: Chasmosaurus diềm cổ hình trái tim
        ["tấm", "khiên", "bảo", "vệ", "vùng", "cổ"],         # 092: Pachyrhinosaurus bướu mũi gồ ghề
        ["điểm", "bám", "cho", "cơ", "hàm"],                 # 093: Hai chú Triceratops húc sừng tranh quyền
        ["vết", "thương", "do", "sừng", "gây", "ra"],        # 094: Vết sẹo hóa thạch trên sọ
        ["tranh", "giành", "con", "cái"],                    # 095: Pentaceratops năm sừng kỳ vĩ
        ["protoceratops"],                                   # 096: Đầu ba sừng in bóng hoàng hôn
        ["styracosaurus"],                                   # 097: Triceratops con ngây thơ
        ["vương", "miện", "gai"],                            # 098: Sơ đồ giải phẫu đa dạng kiểu sừng
        ["sống", "theo", "bầy", "đàn"],                      # 099: Bầy Ceratopsian tắm bùn
        ["bảo", "vệ", "con", "non"]                          # 100: Vòng tròn phòng thủ bảo vệ con non
    ],

    # PHẦN 8 — NHÓM ORNITHOPODA (16 ảnh: 101..116)
    "part8": [
        ["nhóm", "tiếp", "theo", "ornithopoda"],             # 101: Hadrosaur mỏ vịt gặm thực vật
        ["chân", "chim"],                                    # 102: Pin răng hàng trăm chiếc nghiền nát
        ["thành", "công", "về", "mặt", "số", "lượng"],       # 103: Parasaurolophus vươn mào cất tiếng hú
        ["iguanodon"],                                       # 104: Mặt cắt buồng âm thanh trong mào
        ["gai", "nhọn", "ở", "ngón", "tay", "cái"],          # 105: Đàn di cư hàng nghìn con rầm rộ
        ["từng", "bị", "gắn", "nhầm", "lên", "mũi"],         # 106: Iguanodon đứng thẳng lộ gai ngón cái
        ["hadrosauridae", "mỏ", "vịt"],                      # 107: Cận cảnh gai ngón cái sắc bén
        ["bộ", "hàm", "hoàn", "hảo", "nhất"],                # 108: Tổ ấp trứng Maiasaura người mẹ tốt
        ["hàng", "trăm", "chiếc", "răng", "xếp", "thành"],   # 109: Khủng long con nở từ trứng
        ["nghiền", "nát", "thực", "vật", "dai", "nhất"],     # 110: Edmontosaurus mào thịt mềm
        ["parasaurolophus"],                                 # 111: Bảng so sánh các kiểu mào Hadrosaur
        ["mào", "rỗng", "dài", "uốn", "cong"],               # 112: Sóng âm lan tỏa trong rừng sương
        ["nhạc", "cụ", "cộng", "hưởng"],                     # 113: Khủng long mỏ vịt phi nước đại
        ["phát", "ra", "âm", "thanh", "trầm"],               # 114: Bản vẽ phục dựng sai lầm thế kỷ 19
        ["giao", "tiếp", "khoảng", "cách", "xa"],            # 115: Bầy Ornithopod gặm cỏ thanh bình
        ["maiasaura", "chăm", "sóc", "con"]                  # 116: Hóa thạch mào Hadrosaur hoàn mỹ
    ],

    # PHẦN 9 — NHÓM PACHYCEPHALOSAURIA (10 ảnh: 117..126)
    "part9": [
        ["nhóm", "cuối", "cùng", "pachycephalosauria"],      # 117: Pachycephalosaurus đứng thẳng cảnh giác
        ["đầu", "dày"],                                      # 118: Cận cảnh vòm đầu gai xương
        ["vòm", "sọ", "bằng", "xương", "đặc", "cực", "kỳ"],  # 119: Hai chàng đầu cứng húc nhau tóe lửa
        ["dày", "tới", "hai", "mươi", "lăm", "centimét"],    # 120: Mặt cắt sọ dày 25cm
        ["những", "cú", "húc", "đầu", "trực", "diện"],       # 121: Stygimoloch vương miện gai nhọn
        ["cừu", "hoang", "hiện", "đại"],                     # 122: Giả thuyết húc sườn đối kháng
        ["húc", "vào", "hông"],                              # 123: Chạy nhanh thoăn thoắt hai chân
        ["thách", "thức", "uy", "quyền"],                    # 124: Nhóm nhỏ gật gù tìm chồi non
        ["kích", "thước", "tương", "đối", "nhỏ"],            # 125: Bóng vòm đầu in ráng chiều
        ["di", "chuyển", "nhanh", "nhẹn", "bằng", "hai"]     # 126: Hóa thạch vòm sọ vững như đá
    ],

    # PHẦN 10 — NHỮNG NGƯỜI HÀNG XÓM (12 ảnh: 127..138)
    "part10": [
        ["trước", "khi", "kết", "thúc", "hành", "trình"],    # 127: Pteranodon sải cánh vách biển
        ["thằn", "lằn", "bay", "pterosaur"],                 # 128: Màng cánh da thuộc ngón tay thứ tư
        ["màng", "da", "căng", "giữa", "ngón", "tay"],       # 129: Bầy Pterodactylus nhỏ chao liệng
        ["quetzalcoatlus"],                                  # 130: Quetzalcoatlus khổng lồ cao như hươu
        ["sải", "cánh", "hơn", "mười", "mét"],               # 131: Mosasaurus vọt nước đớp mồi
        ["cao", "ngang", "hươu", "cao", "cổ"],               # 132: Mái chèo và đuôi cá mập Mosasaur
        ["dưới", "đại", "dương"],                            # 133: Plesiosaurus cổ dài uốn lượn
        ["mosasaurus", "họ", "hàng", "thằn", "lằn"],         # 134: Ichthyosaurus dáng cá heo siêu tốc
        ["plesiosaurus", "cổ", "dài", "bốn", "mái"],         # 135: Mosasaurus ngoạm cúc đá Ammonite
        ["ichthyosaur", "giống", "cá", "heo"],               # 136: Ba tầng sinh thái Trời - Đất - Biển
        ["ba", "môi", "trường", "hoàn", "toàn"],             # 137: Hóa thạch cánh Pterosaur mỏng manh
        ["chia", "sẻ", "thời", "đại"]                        # 138: Plesiosaurus nhô cổ bên rạn san hô
    ],

    # PHẦN 11 — ĐẠI TUYỆT CHỦNG K-PG (14 ảnh: 139..152)
    "part11": [
        ["sau", "khi", "đã", "khám", "phá"],                 # 139: Thiên thạch xé toạc khí quyển
        ["khoảnh", "khắc", "định", "mệnh"],                  # 140: Quầng nổ chói lòa mù mịt
        ["sáu", "mươi", "sáu", "triệu", "năm", "trước"],     # 141: Miệng hố Chicxulub đường kính 200km
        ["tiểu", "hành", "tinh", "đường", "kính", "mười"],   # 142: Sóng thần đại hồng thủy cuốn trôi bờ
        ["chicxulub", "bán", "đảo", "yucatan"],              # 143: Cháy rừng thiêu rụi toàn cầu
        ["tốc", "độ", "kinh", "hoàng"],                      # 144: Mưa thủy tinh nóng chảy xuống sông
        ["vụ", "nổ", "tương", "đương", "hàng", "tỷ"],        # 145: Địa chất đào vỉa ranh giới K-Pg
        ["sóng", "thần", "cao", "hàng", "trăm", "mét"],      # 146: Khói bụi bóp nghẹt ánh sáng mặt trời
        ["động", "đất", "kinh", "hoàng"],                    # 147: Mùa đông va chạm băng giá bao phủ
        ["cháy", "rừng", "trên", "quy", "mô", "toàn", "cầu"],# 148: Triceratops trơ trọi giữa hoang mạc tro
        ["bụi", "và", "lưu", "huỳnh", "che", "khuất"],       # 149: Địa cầu bao phủ bởi làn sóng chấn động
        ["mùa", "đông", "hạt", "nhân"],                      # 150: Địa tầng giàu Iridium bất thường
        ["quang", "hợp", "ngừng", "trệ"],                    # 151: Thung lũng hoang tàn phủ đầy tro xám
        ["chuỗi", "thức", "ăn", "sụp", "đổ"]                 # 152: Đối lập: Rừng rực rỡ vs Đất xám chết
    ],

    # PHẦN 12 — KẺ SỐNG SÓT & KẺ DIỆT VONG (10 ảnh: 153..162)
    "part12": [
        ["sự", "kiện", "tuyệt", "chủng", "này"],             # 153: Thú có vú nhỏ trốn trong hang sâu
        ["xóa", "sổ", "khoảng", "bảy", "mươi", "lăm"],       # 154: Khủng long lông nép trong khe nứt
        ["tất", "cả", "khủng", "long", "phi", "chim"],       # 155: Cá sấu cổ ngâm mình dưới bùn lầy
        ["tại", "sao", "có", "loài", "sống", "sót"],         # 156: Sinh vật bé nhỏ sống sót vs bóng khổng lồ
        ["kích", "thước", "cơ", "thể"],                      # 157: Chim nguyên thủy bới tìm hạt cây tích trữ
        ["loài", "lớn", "hơn", "hai", "mươi", "lăm"],        # 158: Cụ rùa trồi lên từ bùn đáy hồ
        ["thú", "có", "vú", "nhỏ", "ẩn", "nấp"],             # 159: Cán cân sinh thái: Động vật lớn tuyệt chủng
        ["chuỗi", "thức", "ăn", "dựa", "vào", "mảnh", "vụn"],# 160: Thú có vú rời hang đón ánh bình minh
        ["cá", "sấu", "rùa"],                                # 161: Cây dương xỉ đâm chồi xanh từ đất tro
        ["loài", "chim", "ăn", "hạt"]                        # 162: Đàn chim cổ tung cánh trên miền xanh mới
    ],

    # PHẦN 13 — TỔNG KẾT: DI SẢN (8 ảnh: 163..170)
    "part13": [
        ["nhìn", "lại", "toàn", "bộ", "hành", "trình"],      # 163: Biến chuyển từ Theropod thành chim
        ["một", "trăm", "sáu", "mươi", "triệu", "năm"],      # 164: Đàn chim hiện đại rợp trời
        ["thống", "trị", "hành", "tinh"],                    # 165: Đại sảnh danh vọng các nhóm khủng long
        ["loài", "người", "chúng", "ta", "mới", "chỉ"],      # 166: Chim sẻ hót trên cành - Hậu duệ sống sót
        ["khủng", "long", "chưa", "hề", "biến", "mất"],      # 167: Dòng thời gian từ T-Rex đến chim sẻ
        ["hơn", "mười", "nghìn", "loài", "chim"],            # 168: Du khách chiêm ngưỡng hóa thạch bảo tàng
        ["chú", "chim", "sẻ", "trên", "cành", "cây"],        # 169: Toàn cảnh đại kỷ Trung sinh tráng lệ
        ["hậu", "duệ", "trực", "tiếp", "của", "những"]       # 170: Lông vũ phát sáng vút trời cao
    ]
}

def normalize_text(text: str) -> str:
    t = text.lower().strip()
    return re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t)

def find_cue_frame(phrase_list, cue_words):
    if not cue_words:
        return None
    cue_str = " ".join([normalize_text(w) for w in cue_words])

    for phrase in phrase_list:
        phrase_str = " ".join([normalize_text(w["word"]) for w in phrase["words"]])
        if cue_str in phrase_str or any(cw in phrase_str for cw in cue_words[:2]):
            ms = phrase["startMs"]
            return int(round((ms / 1000.0) * 30))
    return None

def update_image_timings():
    captions_file = Path("src/data/dinosaurCaptions.ts")
    if not captions_file.exists():
        print(f"❌ Chưa có {captions_file}")
        return

    # Trích xuất JSON từ TS
    ts_text = captions_file.read_text(encoding="utf-8")
    m = re.search(r'export const DINOSAUR_CAPTIONS: Record<string, CaptionPhrase\[\]> = (\{[\s\S]*?\});', ts_text)
    if not m:
        print("❌ Không tìm thấy JSON DINOSAUR_CAPTIONS trong file TS")
        return
    captions_by_chapter = json.loads(m.group(1))

    data_file = Path("src/data/dinosaurData.ts")
    data_text = data_file.read_text(encoding="utf-8")
    dm = re.search(r'export const DINOSAUR_CHAPTERS: DinosaurChapter\[\] = (\[[\s\S]*?\]);', data_text)
    if not dm:
        print("❌ Không tìm thấy JSON DINOSAUR_CHAPTERS")
        return
    chapters = json.loads(dm.group(1))

    total_updated = 0

    for ch in chapters:
        ch_id = ch["id"]
        num_imgs = len(ch["images"])
        dur = ch["durationInFrames"]
        phrases = captions_by_chapter.get(ch_id, [])
        cues = IMAGE_CUES.get(ch_id, [])

        start_frames = [0] * num_imgs
        start_frames[0] = 0

        # Tìm frame tương ứng
        found_frames = []
        for i in range(num_imgs):
            if i == 0:
                found_frames.append(0)
                continue
            cue_words = cues[i] if i < len(cues) else None
            frame = find_cue_frame(phrases, cue_words) if cue_words else None
            found_frames.append(frame)

        # Chuẩn hóa & nội suy mượt mà
        # min_gap: tối thiểu 60 frames (~2.0s) đến 90 frames (~3.0s) cho mỗi ảnh tùy mật độ ảnh của chương
        min_gap = min(80, max(45, (dur // num_imgs) - 25))
        for i in range(1, num_imgs):
            expected_even = int(round(i * (dur / num_imgs)))
            f = found_frames[i]
            if f is None or f <= start_frames[i - 1] + min_gap:
                f = max(start_frames[i - 1] + min_gap, expected_even)
            # Không vượt quá giới hạn
            max_allowed = dur - (num_imgs - i) * min_gap
            f = min(f, max_allowed)
            start_frames[i] = f

        ch["imageStartFrames"] = start_frames
        total_updated += num_imgs
        print(f"🎬 {ch_id} ({num_imgs} ảnh, {dur} frames): {start_frames}")

    # Ghi lại vào dinosaurData.ts
    new_json = json.dumps(chapters, indent=2, ensure_ascii=False)
    new_data_text = re.sub(
        r'(export const DINOSAUR_CHAPTERS: DinosaurChapter\[\] = )\[[\s\S]*?\];',
        f'\\1{new_json};',
        data_text
    )
    data_file.write_text(new_data_text, encoding="utf-8")
    print(f"\n🎉 Đã cập nhật thành công imageStartFrames cho {total_updated} ảnh trong dinosaurData.ts!")

if __name__ == "__main__":
    update_image_timings()
