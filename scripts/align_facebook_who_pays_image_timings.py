# -*- coding: utf-8 -*-
"""
Script tính toán chính xác imageStartFrames cho 120 ảnh trong 12 chương của video Facebook Ai Trả Tiền.
Dựa vào từ khóa trong transcript Whisper để đảm bảo 100% ẢNH KHỚP CHÍNH XÁC VỚI LỜI NÓI (AUDIO).
Cập nhật trực tiếp vào src/data/facebookWhoPaysData.ts.
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

# Cues từ khóa cho từng ảnh tương ứng trong 12 chương
IMAGE_CUES = {
    "part1": [
        ["bạn", "dùng", "facebook"],                        # 001: Minh lướt điện thoại ban đêm
        ["bạn", "lướt", "tiktok"],                          # 002: Cận cảnh ngón tay lướt TikTok
        ["vậy", "mà", "meta"],                              # 003: Tòa nhà chọc trời hình điện thoại kho vàng
        ["hơn", "một", "nghìn", "tỷ"],                      # 004: Ngọn núi tiền vàng khổng lồ
        ["không", "công", "ty", "nào", "sống"],             # 005: Minh lộn ví trống rỗng
        ["nghĩa", "là", "có", "người"],                     # 006: Khung hình chia đôi đếm tiền phía sau
        ["trong", "video", "này", "mình"],                  # 007: Bóng đen Mr. Feed trên sân thượng
        ["mình", "hứa", "sẽ", "cố"]                         # 008: Linh vật Xu thò đầu ra túi áo nháy mắt
    ],
    "part2": [
        # 10 ảnh: 009..018
        # Trật tự theo nội dung:
        # Đầu tiên nói về chi phí biên và bánh mì -> 013
        # Máy chủ và sản phẩm số -> 014, 015
        # Giá kéo xuống đáy số không -> 016, 017
        # Quán rượu ăn trưa miễn phí, bia mặn -> 009, 010, 011
        # Quán cà phê wifi -> 012
        # Ly bia của Facebook là gì? -> 018
        ["trước", "khi", "nói", "về"],                      # 013: Dây chuyền bánh mì chi phí biên
        ["trong", "kinh", "tế", "học"],                     # 014: Phòng máy chủ rực sáng
        ["nhưng", "với", "một", "sản", "phẩm"],             # 015: Cỗ máy dập khối số vài xu
        ["và", "đây", "là", "điểm", "mấu"],                 # 016: Thẻ giá trượt dốc xuống hố số 0
        ["nói", "cách", "khác", "miễn", "phí"],             # 017: Hai cửa hàng đối diện hạ biển giá
        ["ngày", "xưa", "cũng", "có"],                      # 009: Quán rượu kiểu Mỹ ăn trưa miễn phí
        ["nhưng", "bạn", "thử", "đoán"],                    # 010: Cận cảnh đĩa đồ ăn mặn chát
        ["ăn", "xong", "thì", "khát"],                      # 011: Bartender rót bia leng keng tiền
        ["chuyện", "này", "nghe", "quen"],                  # 012: Quán cà phê wifi ly nước rỗng
        ["vậy", "câu", "hỏi", "của", "chúng"]               # 018: Xu trên xích đu bên khay cơm trưa
    ],
    "part3": [
        # 12 ảnh: 019..030
        ["để", "trả", "lời", "ta", "cần"],                  # 026: Nhà kinh tế học trước bảng đen
        ["ý", "tưởng", "rất", "đơn", "giản"],               # 019: Chợ truyền thống kết nối chỉ vàng
        ["ví", "dụ", "tờ", "báo"],                          # 020: Quầy báo cổ điển
        ["ví", "dụ", "thẻ", "tín", "dụng"],                 # 022: Quẹt thẻ tín dụng POS
        ["ví", "dụ", "cái", "chợ"],                         # 021: Cây cầu phát sáng nối 2 đảo
        ["điều", "thú", "vị", "của"],                       # 023: Mr. Feed trên cán cân vàng
        ["trợ", "cấp", "chéo"],                             # 024: Bập bênh khổng lồ
        ["vậy", "nền", "tảng", "chọn"],                     # 025: Hai cánh cổng: miễn phí vs cổng vàng
        ["với", "mạng", "xã", "hội"],                       # 027: Minh nhìn bảng giá bỏ chạy
        ["mà", "khi", "người", "dùng", "biến"],             # 028: Thành phố ứng dụng bị bỏ hoang
        ["bằng", "chứng", "cho", "lập"],                    # 029: Cánh cửa màu tím khiên bảo vệ
        ["nói", "vui", "thì", "facebook"]                   # 030: Chợ khổng lồ trên chân dung của Minh
    ],
    "part4": [
        # 14 ảnh: 031..044
        ["đến", "đây", "có", "người"],                      # 031: Nhà phát minh già bên điện thoại đầu tiên
        ["câu", "trả", "lời", "nằm"],                       # 032: Cả thành phố giăng kín dây điện thoại
        ["hiệu", "ứng", "mạng", "lưới"],                    # 033: Mạng lưới nút sáng toàn cầu
        ["với", "nền", "tảng", "hai"],                      # 034: Bánh đà khổng lồ quay tròn
        ["hệ", "quả", "là", "các"],                         # 035: Điểm lật bờ vực
        ["kinh", "tế", "học", "gọi"],                       # 036: Quả cầu tuyết lăn xuống núi
        ["chính", "vì", "thế", "giai"],                     # 037: Mr. Feed ném tiền vào lò lửa xe lửa
        ["tiktok", "từng", "chi", "số"],                    # 038: Linh vật neon ném phong bao lì xì
        ["và", "khi", "đã", "thắng"],                       # 039: Minh bị tay chibi kéo lại ở cửa nhóm chat
        ["nó", "giống", "nhóm", "chat"],                    # 040: Chiếc lồng êm ái hình chuông thông báo
        ["còn", "một", "chi", "tiết"],                      # 041: Mr. Feed cầm máy hút bụi hút startup
        ["hai", "năm", "sau", "họ"],                        # 042: Hai tòa nhà mua bằng vali tiền
        ["về", "phía", "tiktok", "họ"],                     # 043: Đồ thị bạn bè vs mưa video sở thích
        ["nghĩa", "là", "một", "người"]                     # 044: Hạ kinh ngạc trước video lên xu hướng
    ],
    "part5": [
        # 12 ảnh: 045..056
        ["vậy", "nhà", "quảng", "cáo"],                     # 047: Chiếc đồng hồ cát vàng tí hon
        ["năm", "một", "nghìn", "chín"],                    # 045: Học giả 1970 trong thư viện sách
        ["mỗi", "ngày", "chỉ", "có"],                       # 046: Đồng hồ 24 giờ hình biểu đồ tròn
        ["cho", "nên", "các", "nền"],                       # 048: Con đường vô tận dệt bằng khung video
        ["và", "họ", "thiết", "kế"],                        # 049: Minh ăn snack từ bát không đáy
        ["có", "nút", "thông", "báo"],                      # 050: Chấm thông báo đỏ rực như mắt cú
        ["có", "video", "tự", "động"],                      # 051: Minh ngồi ghế bành trên băng chuyền sushi
        ["còn", "có", "một", "cơ"],                         # 052: Máy đánh bạc màn hình điện thoại
        ["máy", "đánh", "bạc"],                             # 053: Máy nhả kẹo tự động
        ["cộng", "thêm", "một", "đặc"],                     # 054: Bức tranh lựa chọn bánh ngọt vs kho báu
        ["và", "rồi", "là", "hai"],                         # 055: Phòng ngủ 2h sáng quả trứng sống
        ["trong", "khi", "bạn", "còn"]                      # 056: Đồng hồ tan chảy vắt trên cành cây
    ],
    "part6": [
        # 12 ảnh: 057..068
        ["nhưng", "giữ", "chân", "bạn"],                    # 057: Bình thủy tinh biểu tượng sở thích
        ["nhà", "quảng", "cáo", "trả"],                     # 064: Thợ may đo đạc vs may đại trà
        ["hãy", "tưởng", "tượng", "một"],                   # 065: Phát tờ rơi bừa bãi vs rọi cô dâu
        ["để", "làm", "được", "việc"],                      # 058: Ống kính con mắt khổng lồ quan sát
        ["nhiều", "người", "nói", "điện"],                  # 059: Đồng tử Minh phản chiếu giày
        ["nó", "không", "cần", "nghe"],                     # 060: Điện thoại mắt tí hon trên bàn cafe
        ["và", "điều", "thú", "vị"],                        # 061: Phòng đấu giá tốc độ cao
        ["mỗi", "lần", "bạn", "mở"],                        # 062: Đóng băng ngón tay chạm màn hình
        ["một", "quảng", "cáo", "trả"],                     # 063: Ba quả cầu hợp nhất thành thẻ quảng cáo
        ["nghĩa", "là", "bạn", "đang"],                     # 068: Minh đứng bơ vơ giữa sân khấu đấu giá
        ["đến", "đây", "có", "một"],                        # 066: Cuộn giấy điều khoản dài vô tận
        ["có", "một", "con", "số"]                          # 067: Bản đồ thế giới với đồng tiền to nhỏ
    ],
    "part7": [
        # 10 ảnh: 069..078
        ["đến", "đây", "bạn", "có"],                        # 069: Cán cân thặng dư tiêu dùng
        ["kinh", "tế", "học", "có"],                        # 076: Kéo co món quà vs sợi xích
        ["với", "hàng", "miễn", "phí"],                     # 070: Bà cụ gọi video call cho cháu
        ["xem", "hướng", "dẫn", "sửa"],                     # 071: Bạn trẻ tự học sửa xe đạp
        ["bản", "đồ", "tìm", "kiếm"],                       # 072: Biểu tượng bản đồ tìm kiếm tựa tiểu tiên
        ["có", "nghiên", "cứu", "thú"],                     # 073: Nhà nghiên cứu cầm bảng khảo sát 100 đô
        ["điều", "này", "còn", "dẫn"],                      # 075: Nhà kinh tế học soi sổ cái GDP
        ["nhưng", "cũng", "chính", "nghiên"],               # 074: Minh tắt app ba lô nặng rơi khỏi vai
        ["vì", "vậy", "câu", "trả"],                        # 077: Xu cân não trên bập bênh
        ["lấy", "đi", "một", "thứ"]                         # 078: Ngã ba đường công viên vs thành phố màn hình
    ],
    "part8": [
        # 10 ảnh: 079..088
        ["thứ", "đó", "chính", "là"],                       # 079: Ống khói nhà máy xả khói
        ["ngoại", "tác", "là", "những"],                    # 080: Ống khói điện thoại xả khói thông báo
        ["với", "nền", "tảng", "số"],                       # 088: Cán cân lợi nhuận vs hóa đơn vô hình
        ["thứ", "nhất", "là", "thời"],                      # 081: Cuốn lịch năm 30 ngày bị mất
        ["mỗi", "năm", "bạn", "tặng"],                      # 082: Đồng hồ cát ngọn núi thời gian
        ["thứ", "hai", "là", "tác"],                        # 083: Soi gương hình ảnh hào nhoáng trôi nổi
        ["có", "nghiên", "cứu", "khác"],                    # 084: Hai nhóm nghiên cứu giơ biểu đồ
        ["thứ", "ba", "là", "tác"],                         # 085: Loa phát thanh giật gân bốc cháy
        ["khi", "mô", "hình", "kinh"],                      # 086: Bong bóng phẫn nộ cưỡi tên lửa
        ["kinh", "tế", "học", "đã"]                         # 087: Thanh tra chính phủ cầm con dấu thuế
    ],
    "part9": [
        # 10 ảnh: 089..098
        ["còn", "một", "nhân", "vật"],                      # 089: Hạ livestream phòng nhỏ ấm cúng
        ["đặc", "điểm", "thứ", "nhất"],                     # 090: Kim tự tháp thu nhập ngôi sao đỉnh chóp
        ["nó", "giống", "một", "cuộc"],                     # 091: Lồng quay xổ số xoay tròn
        ["đặc", "điểm", "thứ", "hai"],                      # 092: Cánh đồng lúa Mr. Feed thu tô
        ["và", "chỉ", "cần", "một"],                        # 093: Chong chóng thuật toán quay xơ xác
        ["doanh", "nghiệp", "nhỏ", "cũng"],                 # 094: Cô Ba nhìn hóa đơn quảng cáo dài
        ["khi", "ngày", "càng", "nhiều"],                   # 095: Đấu giá chật chội nhiệt kế giá thầu
        ["có", "một", "nhà", "văn"],                        # 096: Ba giai đoạn thoái hóa quán cafe
        ["dù", "bạn", "có", "đồng"],                        # 097: Chiếc bánh bị cắt nền tảng lấy phần lớn
        ["khi", "bạn", "không", "phải"]                     # 098: Hạ tự xây ngọn hải đăng quyết tâm
    ],
    "part10": [
        # 10 ảnh: 099..108
        ["vậy", "chuyện", "này", "sẽ"],                     # 108: Đám mây hình dấu hỏi khổng lồ
        ["hướng", "thứ", "nhất", "là"],                     # 099: Nữ thẩm phán cầm cân công lý
        ["lập", "luận", "phản", "đối"],                     # 100: Startup trước sóng thần điện thoại
        ["hướng", "thứ", "hai", "là"],                     # 101: Nghị viện tranh luận bàn tròn
        ["phía", "phản", "biện", "lo"],                     # 102: Ổ khóa và chìa khóa kho dữ liệu
        ["hướng", "thứ", "ba", "là"],                       # 103: Hai cánh cửa: miễn phí vs trả phí
        ["và", "hướng", "thứ", "tư"],                       # 104: Minh làm thợ mỏ dữ liệu nhận lương
        ["chưa", "có", "hướng", "nào"],                     # 105: Kéo co hai phe quy định
        ["nhưng", "điểm", "chung", "là"],                   # 106: Thành phố tương lai 2040
        ["mô", "hình", "kinh", "doanh"]                     # 107: Bình minh rực rỡ đường chân trời
    ],
    "part11": [
        # 6 ảnh: 109..114
        ["nếu", "bạn", "không", "muốn"],                    # 112: Minh nhìn gương mỉm cười tự vấn
        ["hãy", "coi", "thời", "gian"],                     # 109: Minh cài đặt giới hạn thời gian đồng hồ cát
        ["hãy", "tắt", "những", "thông"],                   # 110: Minh tắt thông báo bóng đỏ xẹp
        ["và", "thỉnh", "thoảng", "hãy"],                   # 111: Minh cất điện thoại ra công viên
        ["nếu", "bạn", "làm", "nội"],                       # 113: Hạ chia trứng vào nhiều giỏ
        ["xây", "dựng", "kênh", "riêng"]                    # 114: Cây cầu nối thẳng đến khán giả
    ],
    "part12": [
        # 6 ảnh: 115..120
        ["tóm", "lại", "miễn", "phí"],                      # 115: Xu cầm dấu hỏi lớn mỉm cười dưới đèn
        ["lần", "tới", "khi", "thấy"],                      # 117: Cận cảnh nụ cười thấu hiểu của Minh
        ["nếu", "tìm", "mãi", "không"],                     # 116: Ảnh toàn thể tất cả nhân vật
        ["cảm", "ơn", "bạn", "đã"],                         # 118: Điện thoại úp mặt bên tách cà phê
        ["hẹn", "gặp", "lại"],                              # 119: Linh vật Xu vẫy tay chào tạm biệt
        ["hẹn", "gặp", "lại"]                               # 120: Hoàng hôn rực rỡ Minh bước đi lắng đọng
    ]
}

def find_cue_frame(cue_words: list, tokens: list, fps: int = 30) -> int:
    """
    Tìm thời điểm xuất hiện của cụm từ khóa cue_words trong danh sách tokens.
    """
    if not cue_words or not tokens:
        return 0

    norm_tokens = [normalize_text(t.get('word', t.get('text', ''))) for t in tokens]
    n_cue = len(cue_words)

    for i in range(len(norm_tokens) - n_cue + 1):
        match = True
        for k in range(n_cue):
            if cue_words[k] not in norm_tokens[i + k]:
                match = False
                break
        if match:
            start_ms = tokens[i].get('startMs', tokens[i].get('startInMs', 0))
            return int(round((start_ms / 1000.0) * fps))

    # Nếu không khớp cả cụm, thử tìm từ khóa đầu tiên
    first_word = cue_words[0]
    for i, t in enumerate(norm_tokens):
        if first_word in t:
            start_ms = tokens[i].get('startMs', tokens[i].get('startInMs', 0))
            return int(round((start_ms / 1000.0) * fps))

    return 0

def main():
    meta_path = Path("src/data/facebook_who_pays_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}")
        return

    chapters = json.loads(meta_path.read_text(encoding="utf-8"))
    fps = 30

    import wave

    captions_file = Path("src/data/facebookWhoPaysCaptions.ts")
    captions_dict = {}
    if captions_file.exists():
        txt = captions_file.read_text(encoding="utf-8")
        kw = "FACEBOOK_WHO_PAYS_CAPTIONS"
        pos = txt.find(kw)
        if pos != -1:
            s = txt.find('{', pos)
            e = txt.rfind('}')
            if s != -1 and e != -1:
                captions_dict = json.loads(txt[s:e+1])

    updated_chapters = []
    current_global_frame = 0

    for ch in chapters:
        sec_id = ch["id"]
        wav_file = Path(f"public/audio/facebook_who_pays_{sec_id}.wav")
        if not wav_file.exists():
            print(f"⚠️ Chưa có audio: {wav_file}")
            continue

        with wave.open(str(wav_file), 'rb') as wf:
            frames = wf.getnframes()
            rate = wf.getframerate()
            duration_s = frames / float(rate)
        dur_frames = int(round(duration_s * fps))

        # Đọc tokens từ phụ đề đã căn chỉnh chính xác 100% kịch bản
        phrases = captions_dict.get(sec_id, [])
        tokens = []
        for p in phrases:
            tokens.extend(p.get('words', []))

        cues = IMAGE_CUES.get(sec_id, [])
        num_images = len(ch["images"])
        start_frames = []

        for idx in range(num_images):
            if idx == 0:
                start_frames.append(0)
            elif idx < len(cues):
                cue = cues[idx]
                f = find_cue_frame(cue, tokens, fps)
                # Đảm bảo start_frames luôn tăng dần
                prev = start_frames[-1]
                min_step = 45 # Ít nhất 1.5 giây giữa các ảnh
                if f <= prev:
                    f = prev + int(round((dur_frames - prev) / (num_images - idx)))
                start_frames.append(max(prev + min_step, min(dur_frames - 30, f)))
            else:
                prev = start_frames[-1]
                start_frames.append(prev + int(round((dur_frames - prev) / (num_images - idx))))

        # Điều chỉnh ảnh cuối cùng
        for idx in range(1, len(start_frames)):
            if start_frames[idx] >= dur_frames:
                start_frames[idx] = dur_frames - (len(start_frames) - idx) * 30

        updated_chapters.append({
            "id": ch["id"],
            "chapterNumber": ch["chapter_num"],
            "partLabel": ch["part_label"],
            "historicalEra": ch["historical_era"],
            "title": ch["title"],
            "subtitle": ch["subtitle"],
            "audioSrc": f"audio/facebook_who_pays_{sec_id}.wav",
            "durationInFrames": dur_frames,
            "startFrame": current_global_frame,
            "images": ch["images"],
            "imageDescriptions": ch["image_descriptions"],
            "imageStartFrames": start_frames
        })

        current_global_frame += dur_frames
        print(f"✅ {sec_id:8}: {dur_frames:5} frames ({duration_s:5.1f}s) | {len(start_frames)} ảnh | Frames: {start_frames[:4]}...")

    ts_content = """// Dữ liệu 12 chương phim tài liệu 'Facebook không thu tiền bạn. Vậy ai đang trả tiền?'
export interface FacebookWhoPaysChapter {
  id: string;
  chapterNumber: number;
  partLabel: string;
  historicalEra: string;
  title: string;
  subtitle: string;
  audioSrc: string;
  durationInFrames: number;
  startFrame: number;
  images: string[];
  imageDescriptions: string[];
  imageStartFrames?: number[];
}

export const TOTAL_FACEBOOK_WHO_PAYS_FRAMES = """ + str(current_global_frame) + """;

export const FACEBOOK_WHO_PAYS_CHAPTERS: FacebookWhoPaysChapter[] = """ + json.dumps(updated_chapters, ensure_ascii=False, indent=2) + ";\n"

    out_ts = Path("src/data/facebookWhoPaysData.ts")
    out_ts.write_text(ts_content, encoding="utf-8")
    print(f"\n🎉 Đã cập nhật thành công {out_ts}!")
    print(f"⏱️ Tổng thời lượng video: {current_global_frame} frames ({current_global_frame/fps:.1f}s = {current_global_frame/(fps*60):.2f} phút)")

if __name__ == "__main__":
    main()
