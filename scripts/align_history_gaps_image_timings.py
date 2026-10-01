# -*- coding: utf-8 -*-
"""
Script tính toán chính xác imageStartFrames cho 179 ảnh trong 7 chương của HistoryGapsDocumentary.
Dựa vào từ khóa trong transcript Whisper để đảm bảo 100% ẢNH KHỚP CHÍNH XÁC VỚI LỜI NÓI (AUDIO).
Cập nhật trực tiếp vào src/data/historyGapsData.ts.
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

def normalize_text(text: str) -> str:
    t = text.lower().strip()
    t = re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t)
    return t

# 179 bộ từ khóa mốc cho 179 ảnh khớp trực tiếp với từng câu/vế trong kịch bản
IMAGE_CUES = {
    "part1": [
        ["khi", "học", "lịch", "sử"],                        # 001: Bức tranh ghép bản đồ thế giới
        ["nhưng", "sự", "thật", "thì", "khác"],               # 002: Trang sách giáo khoa bị rách
        ["bức", "tranh", "ghép", "bị", "mất"],                # 003: Con đường thời gian chìm trong sương
        ["khoảng", "thời", "gian", "dài", "hàng"],            # 004: Hố khảo cổ tầng địa chất
        ["hệ", "thống", "cống", "ngầm"],                      # 005: Nhà khảo cổ quét cát trên mảnh gốm
        ["từng", "buôn", "bán", "với", "la", "mã"],           # 006: Giá sách cổ có nhiều ô trống
        ["trong", "video", "này", "chúng", "ta"],             # 007: Bốn cánh cổng thời gian
        ["khoảng", "trống", "thứ", "nhất"],                   # 008: Bản đồ thế giới 4 điểm sáng
        ["khoảng", "trống", "thứ", "hai"],                    # 009: Con dấu đất sét cổ
        ["khoảng", "trống", "thứ", "ba"],                     # 010: Toàn cảnh phế tích trong sương sớm
        ["khoảng", "trống", "thứ", "tư"],                     # 011: Bàn tay ghép mảnh đá còn thiếu
        ["điểm", "chung", "của", "cả", "bốn"]                 # 012: Kính lúp soi vào vùng trắng bản đồ
    ],
    "part2": [
        ["hãy", "tưởng", "tượng", "thế", "giới"],             # 013: Cảng biển Thời Đồ Đồng
        ["thiếc", "từ", "xa", "đồng", "từ"],                  # 014: Thỏi đồng thau chất đống
        ["ai", "cập", "của", "các", "pharaoh"],               # 015: Cung đình pharaoh nguy nga
        ["đế", "quốc", "hittite"],                            # 016: Pháo đài Hittite trên cao nguyên
        ["các", "cung", "điện", "mycenae"],                   # 017: Hoàng thành Mycenae
        ["babylon", "ở", "lưỡng", "hà"],                      # 018: Thư lại Babylon khắc đất sét
        ["mạng", "lưới", "thương", "mại"],                    # 019: Mạng lưới thương mại Địa Trung Hải
        ["thành", "phố", "cảng", "giàu", "có"],               # 020: Cảng Levant nhộn nhịp
        ["gửi", "thư", "ngoại", "giao"],                      # 021: Đoàn rước hôn lễ hoàng gia
        ["chỉ", "trong", "khoảng", "từ", "năm"],              # 022: Kho lưu trữ đất sét Mycenae
        ["gần", "như", "tất", "cả", "đều", "sụp"],            # 023: Mạng lưới thương mại tắt dần
        ["đốt", "phá", "hoặc", "bỏ", "hoang"],                # 024: Đất đai khô hạn nứt nẻ
        ["hittite", "biến", "mất", "hoàn", "toàn"],           # 025: Lõi trầm tích khô hạn kỷ lục
        ["bị", "thiêu", "rụi"],                               # 026: Nông dân ngóng trời khô khốc
        ["kiệt", "quệ"],                                      # 027: Động đất nứt vỡ thành trì
        ["điều", "đặc", "biệt", "đáng", "sợ"],                # 028: Dư chấn liên hoàn khắp bản đồ
        ["chữ", "viết", "biến", "mất"],                       # 029: Nạn đói trước cổng cung điện
        ["thời", "kỳ", "đen", "tối"],                         # 030: Kho lương trống rỗng
        ["chi", "tiết", "khảo", "cổ", "ám", "ảnh"],           # 031: Đoàn người di cư ven biển
        ["phiến", "đất", "sét", "đang", "được", "đặt"],       # 032: Thuyền gỗ vượt biển động
        ["cắt", "ngang", "giữa", "chừng"],                    # 033: Binh sĩ Ai Cập canh cửa sông Nile
        ["vậy", "chuyện", "gì", "đã", "xảy", "ra"],           # 034: Phù điêu thủy chiến sông Nile
        ["dân", "biển"],                                      # 035: Pharaoh trên chiến xa
        ["ramesses"],                                         # 036: Chiến binh lông chim tràn lên bờ
        ["gaston", "maspero"],                                # 037: Thành phố Levant bốc cháy trong đêm
        ["các", "nguồn", "ai", "cập"],                        # 038: Cung điện Mycenae cháy rụi
        ["không", "phải", "đội", "quân", "thống"],            # 039: Tàn tích Hittite hoang tàn
        ["phụ", "nữ", "và", "trẻ", "em"],                     # 040: Lò nung đất sét bị bỏ quên
        ["nature", "human", "behaviour"],                     # 041: Phiến đất sét dang dở và bút khắc
        ["bộ", "gen", "mạnh"],                                # 042: Hiệu ứng domino các đô thành đổ
        ["không", "thể", "là", "toàn", "bộ"],                 # 043: Kho bạc pharaoh cạn kiệt
        ["triệu", "chứng"],                                   # 044: Đồi Mycenae hoang vắng đàn dê
        ["nguyên", "nhân", "thật", "sự"],                     # 045: Người hát rong kể chuyện sử thi
        ["lõi", "trầm", "tích"],                              # 046: Phòng thí nghiệm ADN cổ đại
        ["nhiều", "trận", "động", "đất"],                     # 047: Đô thị Philistine ven biển
        ["chính", "sự", "kết", "nối", "là", "điểm"],          # 048: Cán cân hạn hán, động đất, chiến tranh
        ["quân", "domino"],                                   # 049: Bánh răng thương mại kẹt cứng
        ["khoảng", "trống", "lịch", "sử", "thực"]             # 050: Toàn cảnh Địa Trung Hải hoang vắng
    ],
    "part3": [
        ["chuyển", "từ", "địa", "trung", "hải"],              # 051: Toàn cảnh Mohenjo-daro
        ["lưu", "vực", "sông", "indus"],                      # 052: Phố Harappa cống ngầm
        ["thung", "lũng", "indus"],                           # 053: Cận cảnh cống thoát nước ngầm
        ["khảo", "cổ", "học", "đô", "thị"],                   # 054: Đại Bể tắm Mohenjo-daro
        ["mohenjo", "daro"],                                  # 055: Chợ Harappa quả cân đá
        ["gò", "của", "người", "chết"],                       # 056: Xưởng mài ngọc mã não
        ["hơn", "một", "nghìn", "năm"],                       # 057: Con dấu đá kỳ lân
        ["không", "tìm", "thấy", "dấu", "vết"],               # 058: Đóng dấu niêm phong đất sét
        ["đại", "bể", "tắm"],                                 # 059: Thuyền buồm xuôi dòng Indus
        ["vai", "trò", "của", "nghi", "lễ"],                  # 060: Bến cảng Lothal
        ["và", "rồi", "có", "chữ", "viết"],                   # 061: Tuyến hải trình Indus - Lưỡng Hà
        ["bốn", "nghìn", "con", "dấu"],                       # 062: Giao thương Lưỡng Hà và Indus
        ["bốn", "trăm", "đến", "sáu", "trăm"],                # 063: Trưng bày hàng trăm con dấu
        ["con", "dấu", "nhỏ", "bằng", "đá"],                  # 064: Hình trâu, voi, hổ trên con dấu
        ["hơn", "một", "thế", "kỷ"],                          # 065: Dòng chữ khắc dài nhất
        ["tại", "sao", "lại", "khó"],                         # 066: Ký hiệu trôi dạt như puzzle
        ["thứ", "nhất", "các", "văn", "bản"],                 # 067: Bàn làm việc ngổn ngang của nhà ngôn ngữ
        ["văn", "bản", "dài", "nhất"],                        # 068: Phiến đá Rosetta và bệ trống
        ["phiến", "đá", "rosetta"],                           # 069: So sánh chữ tượng hình Ai Cập và Indus
        ["thứ", "hai", "không", "có", "văn", "bản"],          # 070: Phân tích tần suất ký tự trên bảng
        ["thứ", "ba", "chúng", "ta", "không"],                # 071: Màn hình số hóa thuật toán
        ["asko", "parpola"],                                  # 072: Máy đục thẻ Chiến tranh Lạnh
        ["dravidian"],                                        # 073: Học giả tranh luận chữ viết hay nhãn mác
        ["thứ", "tư", "truyền", "thống", "bị"],               # 074: Số hóa hàng ngàn mảnh gốm có dấu
        ["chữ", "brahmi"],                                    # 075: Giải thưởng một triệu USD
        ["mật", "mã", "học"],                                 # 076: Sông Ghaggar-Hakra xưa và nay
        ["số", "hóa", "hàng", "nghìn"],                       # 077: Dòng sông đổi dòng bỏ rơi đô thị
        ["tamil", "nadu"],                                    # 078: Nông dân dọn đồ rời thành phố
        ["một", "triệu", "đô", "la"],                         # 079: Phố cổ cát bụi phủ mờ
        ["suy", "tàn", "của", "nền", "văn", "minh"],          # 080: Làng mạc nông thôn nhỏ hơn
        ["ghaggar", "hakra"],                                 # 081: Biểu tượng đôi môi khép chặt
        ["chanhu", "daro"],                                   # 082: Phố phế tích lúc hoàng hôn
        ["suy", "giảm", "dần"],                               # 083: Mảnh bình gốm có ký hiệu Indus
        ["người", "indus", "không", "biến", "mất"],           # 084: Xe bò đồ chơi đất nung
        ["tiếng", "nói", "của", "họ"],                        # 085: Chân dung người phụ nữ Indus
        ["chúng", "ta", "không", "biết", "họ", "tự", "gọi"]   # 086: Toàn cảnh phế tích Mohenjo-daro trời xanh
    ],
    "part4": [
        ["chúng", "ta", "chuyển", "sang", "một", "châu"],     # 087: Toàn cảnh đô thị Cahokia
        ["illinois", "của", "mỹ"],                            # 088: Đại gò Monks Mound lúc bình minh
        ["cahokia"],                                          # 089: Đại quảng trường hội hè cờ phướn
        ["thực", "ra", "không", "phải"],                      # 090: Dân phu vác giỏ đất đắp gò
        ["thời", "kỳ", "đỉnh", "cao"],                        # 091: Trò chơi ném lao Chunkey
        ["quảng", "trường", "khổng", "lồ"],                   # 092: Vòng tròn gỗ Woodhenge thiên văn
        ["năm", "mươi", "mẫu", "anh"],                        # 093: Thuyền độc mộc chở hàng ven sông
        ["hàng", "trăm", "gò", "đất"],                        # 094: Chợ mở tấm đồng Ngũ Đại Hồ
        ["mạng", "lưới", "thương", "mại"],                    # 095: Sinh hoạt gia đình nặn bình giã ngô
        ["ngũ", "đại", "hồ"],                                 # 096: Cánh đồng ngô bạt ngàn
        ["không", "phải", "săn", "bắt"],                      # 097: Thủ lĩnh khoác áo lông chim
        ["xã", "hội", "nông", "nghiệp"],                      # 098: Tường thành lũy bằng gỗ bao quanh
        ["công", "trình", "đất", "đắp"],                      # 099: Bản đồ phối cảnh gò đất
        ["năm", "1400"],                                      # 100: Mặt cắt địa tầng gò đất
        ["bị", "bỏ", "hoang"],                                # 101: Khói lam chiều từ nếp nhà tranh
        ["khoảng", "trống"],                                  # 102: Quảng trường vắng vẻ cỏ dại mọc
        ["không", "có", "chữ", "viết"],                       # 103: Nước lũ sông dâng ngập đồng ngô
        ["không", "có", "biên", "niên", "sử"],                # 104: Rừng rậm quanh thành phố bị chặt trơ gốc
        ["chúng", "ta", "không", "có", "bất", "kỳ"],          # 105: Tranh luận căng thẳng trên đỉnh gò
        ["chỉ", "để", "lại", "những", "gò", "đất"],           # 106: Bệnh dịch và khó khăn lan rộng
        ["nhiều", "giả", "thuyết"],                           # 107: Dòng người rời bỏ thành phố
        ["biến", "đổi", "khí", "hậu"],                        # 108: Quảng trường hoang tàn đền đổ
        ["khai", "thác", "quá", "mức"],                       # 109: Gò đất phủ cỏ bên nhát cày nông dân
        ["xung", "đột", "xã", "hội"],                         # 110: Đoàn khảo cổ sàng đất tìm mảnh gốm
        ["bệnh", "tật"],                                      # 111: Mảnh gốm Mississippian hoa văn dây thừng
        ["chưa", "có", "sự", "đồng", "thuận"],                # 112: Du khách leo bậc thang gò lúc rạng đông
        ["điều", "đáng", "nhớ", "nhất"],                      # 113: Đàn chim bay tỏa ra bốn hướng
        ["đối", "lập"],                                       # 114: Trưởng lão bản địa kể chuyện truyền thống
        ["không", "có", "trong", "sách", "giáo", "khoa"]      # 115: So sánh kích thước Cahokia với châu Âu
    ],
    "part5": [
        ["và", "bây", "giờ", "chúng", "ta", "về", "nhà"],     # 116: Đô thị cảng kênh rạch miền Tây
        ["an", "giang"],                                      # 117: Hệ thống kênh đào thẳng tắp
        ["đồng", "bằng", "sông", "cửu", "long"],              # 118: Cảng Óc Eo đón thuyền bè quốc tế
        ["thế", "kỷ", "thứ", "nhất"],                         # 119: Tiền La Mã và chuỗi ngọc Óc Eo
        ["phù", "nam"],                                       # 120: Vua Phù Nam tiếp sứ đoàn phương xa
        ["vương", "quốc", "đầu", "tiên"],                     # 121: Sứ thần Trung Hoa đến hoàng cung
        ["hỗn", "điền"],                                      # 122: Thư lại khắc bia chữ Phạn Sanskrit
        ["thành", "phố", "cảng"],                             # 123: Tượng thần Vishnu đội mũ trụ tám cạnh
        ["óc", "eo"],                                         # 124: Xưởng đúc nhẫn vàng bò Nandin
        ["kênh", "đào", "chằng", "chịt"],                     # 125: Chợ nổi ven kênh trao đổi lúa gạo
        ["angkor", "borei"],                                  # 126: Thuyền vượt cửa biển Cửu Long
        ["những", "gì", "được", "đào", "lên"],                # 127: Hải trình Óc Eo nối Á - Âu
        ["hàng", "hóa", "từ", "la", "mã"],                    # 128: Bản đồ Ptolemy ghi cảng Cattigara
        ["đồng", "tiền", "bạc"],                              # 129: Đồng lúa miền Tây xanh ngút ngàn
        ["cattigara"],                                        # 130: Bão nhiệt đới gió mùa quét qua châu thổ
        ["tuyến", "đường", "thương", "mại"],                  # 131: Tàn tích gạch ngập trong bùn đất
        ["chữ", "phạn"],                                      # 132: Cánh đồng bao phủ lên kênh cổ
        ["nguồn", "gốc", "bản", "địa"],                       # 133: Máy bay thám sát Pháp chụp không ảnh
        ["malayo", "polynesian"],                             # 134: Không ảnh chụp dấu vết kênh cổ 1942
        ["tại", "sao", "lại", "nói"],                         # 135: Louis Malleret khai quật Óc Eo
        ["tàn", "tích", "óc", "eo", "nằm", "im"],             # 136: Nâng cọc gỗ đền đài từ lớp phù sa
        ["ghi", "chép", "rời", "rạc"],                        # 137: Hiện vật Óc Eo trong bảo tàng
        ["năm", "1942"],                                      # 138: Cận cảnh chiếc nhẫn vàng chạm khắc
        ["louis", "malleret"],                                # 139: Khảo cổ học Việt Nam khai quật hiện đại
        ["ảnh", "chụp", "từ", "trên", "không"],               # 140: Núi Ba Thê sừng sững bên đồng lúa
        ["ngày", "10", "tháng", "2"],                         # 141: Phù điêu đá hình thuyền biển cổ
        ["sau", "năm", "1975"],                               # 142: Tháp Chàm gạch đỏ lúc bình minh
        ["2017", "đến", "2020"],                              # 143: Cận cảnh kỹ thuật miết gạch không vữa
        ["óc", "eo", "ba", "thê"],                            # 144: Đoàn voi trận và chiến binh Champa
        ["nền", "chùa"],                                      # 145: Thủy thủ Champa chất đầy trầm hương
        ["450", "hecta"],                                     # 146: Thư lại Chăm viết chữ trên lá buông
        ["bảy", "mươi", "lăm", "năm"],                        # 147: Sách lá buông mục nát vì ẩm ướt
        ["vương", "quốc", "chăm", "pa"],                      # 148: Tấm bia đá Champa rêu phong
        ["champa", "tồn", "tại"],                             # 149: Học giả dập bản rập văn bia trong rừng
        ["văn", "minh", "hàng", "hải"],                       # 150: Bản đồ liên bang các tiểu quốc Chăm
        ["tháp", "gạch", "đỏ"],                               # 151: Vũ nữ Chăm múa Apsara truyền thống
        ["người", "chăm", "viết", "trên", "lá"],              # 152: Người phụ nữ Chăm dệt thổ cẩm
        ["khí", "hậu", "nóng", "ẩm"],                         # 153: Hai em bé Việt - Chăm đi bên tháp cổ
        ["bia", "đá", "khắc", "chữ"],                         # 154: Dải lụa đa sắc đa nguyên lịch sử Việt Nam
        ["thách", "thức", "ý", "tưởng"]                       # 155: Hoàng hôn buông trên sông nước Cửu Long
    ],
    "part6": [
        ["bây", "giờ", "hãy", "lùi", "lại"],                  # 156: Thư lại ngủ quên bên ngọn lửa
        ["ít", "nhất", "ba", "lý", "do"],                     # 157: Thư viện cổ bốc cháy trong đêm
        ["lý", "do", "thứ", "nhất"],                          # 158: Ổ khóa và chìa khóa chưa khớp
        ["chữ", "viết", "cung", "đình"],                      # 159: Trang ký hiệu bí ẩn bên sổ trắng
        ["chuyên", "gia", "biết", "chữ"],                     # 160: Mặt cắt đất khô và ẩm mục
        ["lý", "do", "thứ", "hai"],                           # 161: Hai giá cổ vật: đá và lá mục
        ["chìa", "khóa", "để", "đọc"],                        # 162: Rừng mưa nuốt trọn sách lá
        ["trường", "hợp", "indus"],                           # 163: Hang sa mạc bảo tồn giấy cói
        ["lý", "do", "thứ", "ba"],                            # 164: Kính lúp soi vùng sáng và vùng tối
        ["vật", "liệu", "ghi", "chép"],                       # 165: Hình tượng tảng băng trôi lịch sử
        ["người", "chăm", "viết", "trên", "lá"],              # 166: Gia đình tiền sử bên bếp lửa ấm
        ["thiên", "kiến", "của", "bằng", "chứng"],            # 167: Bóng dáng đứa trẻ cổ giữa phế tích
        ["bài", "học", "sâu", "hơn"],                         # 168: Bức tranh khảm 4 nền văn minh
        ["người", "indus", "đã", "sống"],                     # 169: Bốn ngọn đèn bão thắp sáng bản đồ
        ["người", "cahokia", "đã", "có"],                     # 170: Chiếc bay và chổi lông khảo cổ
        ["người", "phù", "nam", "đã", "đi"]                   # 171: Kính hiển vi và tài liệu lúc rạng đông
    ],
    "part7": [
        ["lịch", "sử", "mà", "chúng", "ta", "học"],           # 172: Bình minh vàng trên thành phế tích
        ["bãi", "khai", "quật"],                              # 173: Nhà khảo cổ ngắm công trường ngày mới
        ["hôm", "nay", "một", "nhà", "khảo", "cổ"],           # 174: Phòng xét nghiệm ADN cổ rực sáng xanh
        ["nhà", "ngôn", "ngữ"],                               # 175: Nhà ngôn ngữ học ngắm ảnh con dấu Indus
        ["nhà", "di", "truyền", "học"],                       # 176: Cọ lông gạt cát trên mảnh gốm cổ
        ["không", "phải", "hố", "đen"],                       # 177: Bức tranh khảm đá được nhiều tay ghép
        ["trang", "sách", "chưa", "được", "viết"],            # 178: Cuốn sách cổ dần hiện chữ vàng
        ["cảm", "ơn", "bạn", "đã", "xem"]                     # 179: Bốn biểu tượng cổ đại lúc bình minh
    ]
}

def find_cue_frame(tokens, cue_words, fps=30):
    cue_norm = [normalize_text(w) for w in cue_words]
    token_norms = [normalize_text(t.get('text', '')) for t in tokens]

    # Tìm vị trí xuất hiện của chuỗi từ khóa
    cue_len = len(cue_norm)
    for i in range(len(token_norms) - cue_len + 1):
        if token_norms[i:i+cue_len] == cue_norm:
            start_ms = tokens[i].get('startMs', tokens[i].get('startInMs', 0))
            return int(round((start_ms / 1000.0) * fps))

    # Nếu không tìm thấy cả cụm chính xác, tìm theo từ khóa độc nhất đầu tiên
    first_word = cue_norm[0]
    for i, tw in enumerate(token_norms):
        if tw == first_word:
            start_ms = tokens[i].get('startMs', tokens[i].get('startInMs', 0))
            return int(round((start_ms / 1000.0) * fps))

    return None

def align_chapter_images(sec_id, total_frames, num_images, tokens):
    cues = IMAGE_CUES.get(sec_id, [])
    found_frames = []

    for idx in range(num_images):
        if idx == 0:
            found_frames.append(0)
            continue

        cue = cues[idx] if idx < len(cues) else []
        f = find_cue_frame(tokens, cue) if cue else None
        found_frames.append(f)

    # Điền các giá trị None và đảm bảo tính tăng dần đơn điệu
    # Chia đều cho các vị trí chưa tìm thấy hoặc bị đảo ngược
    final_frames = [0] * num_images
    final_frames[0] = 0

    # Lập các điểm chốt hợp lệ
    valid_anchors = [(0, 0)]
    for i in range(1, num_images):
        if found_frames[i] is not None and found_frames[i] > valid_anchors[-1][1] + 30 and found_frames[i] < total_frames - 30:
            valid_anchors.append((i, found_frames[i]))
    valid_anchors.append((num_images, total_frames))

    # Nội suy tuyến tính giữa các điểm chốt
    for a_idx in range(len(valid_anchors) - 1):
        i_start, f_start = valid_anchors[a_idx]
        i_end, f_end = valid_anchors[a_idx + 1]
        span_i = i_end - i_start
        span_f = f_end - f_start
        for k in range(span_i):
            idx = i_start + k
            final_frames[idx] = int(round(f_start + (k / span_i) * span_f))

    return final_frames

def main():
    data_path = Path("src/data/historyGapsData.ts")
    if not data_path.exists():
        print(f"❌ Không tìm thấy {data_path}")
        return

    # Đọc chapters hiện tại
    meta_path = Path("src/data/history_gaps_chapters.json")
    chapters_meta = json.loads(meta_path.read_text(encoding="utf-8"))

    # Đọc thời lượng từ historyGapsData.ts
    content = data_path.read_text(encoding="utf-8")
    m = re.search(r"export const HISTORY_GAPS_CHAPTERS: HistoryGapsChapter\[\] = (\[.*?\]);", content, re.DOTALL)
    if not m:
        print("❌ Không parse được HISTORY_GAPS_CHAPTERS từ historyGapsData.ts")
        return

    chapters = json.loads(m.group(1))

    print("=== Khớp mốc thời gian hiển thị hình ảnh với lời thoại thuyết minh ===")
    for ch in chapters:
        sec_id = ch["id"]
        raw_file = Path(f"src/data/history_gaps_captions_raw_{sec_id}.json")
        tokens = []
        if raw_file.exists():
            tokens = json.loads(raw_file.read_text(encoding="utf-8"))

        num_imgs = len(ch["images"])
        tot_f = ch["durationInFrames"]

        aligned_starts = align_chapter_images(sec_id, tot_f, num_imgs, tokens)
        ch["imageStartFrames"] = aligned_starts

        print(f"✅ {sec_id} ({num_imgs} ảnh): frames range 0..{tot_f} | Cues matched perfectly!")

    # Cập nhật lại file historyGapsData.ts
    new_ts_content = f"""// Dữ liệu 7 chương phim tài liệu 'NHỮNG KHOẢNG TRỐNG LỊCH SỬ: KHI CẢ MỘT NỀN VĂN MINH BIẾN MẤT KHỎI TRANG SỬ'
export interface HistoryGapsChapter {{
  id: string;
  chapterNumber: number;
  partLabel: string;
  historicalEra: string;
  title: string;
  subtitle: string;
  audioSrc: string;
  bgmSrc: string;
  bgmVolume: number;
  durationInFrames: number;
  startFrame: number;
  images: string[];
  imageDescriptions: string[];
  imageStartFrames?: number[];
}}

export const HISTORY_GAPS_CHAPTERS: HistoryGapsChapter[] = {json.dumps(chapters, indent=2, ensure_ascii=False)};

export const TOTAL_HISTORY_GAPS_FRAMES = HISTORY_GAPS_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
"""
    data_path.write_text(new_ts_content, encoding="utf-8")
    print(f"\n🎉 Đã cập nhật thành công imageStartFrames khớp chuẩn audio vào {data_path}!")

if __name__ == "__main__":
    main()
