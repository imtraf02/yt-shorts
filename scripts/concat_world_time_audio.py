import json
import wave
import sys
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

manifest_path = Path("public/audio/world-time-documentary/sentences_manifest.json")
items = json.loads(manifest_path.read_text(encoding="utf-8"))
items_dict = {x["id"]: x for x in items}

PARTS = {
    "part1": {"title": "Khi Mỗi Thành Phố Từng Có Một Giờ Riêng", "sentences": [f"S{i:03d}" for i in range(1, 9)]},
    "part2": {"title": "Hàng Hải Biến Thời Gian Thành Vấn Đề Sống Còn", "sentences": [f"S{i:03d}" for i in range(9, 17)]},
    "part3": {"title": "Đường Sắt Phá Vỡ Giờ Địa Phương", "sentences": [f"S{i:03d}" for i in range(17, 25)]},
    "part4": {"title": "Bắc Mỹ Và Sự Ra Đời Của Múi Giờ Tiêu Chuẩn", "sentences": [f"S{i:03d}" for i in range(25, 33)]},
    "part5": {"title": "Hội Nghị Năm 1884 Và Greenwich", "sentences": [f"S{i:03d}" for i in range(33, 41)]},
    "part6": {"title": "Trái Đất Không Phải Một Chiếc Đồng Hồ Hoàn Hảo", "sentences": [f"S{i:03d}" for i in range(41, 49)]},
    "part7": {"title": "Vì Sao Đôi Khi Một Phút Có 61 Giây?", "sentences": [f"S{i:03d}" for i in range(49, 57)]},
    "part8": {"title": "Chiếc Điện Thoại Của Bạn Biết Mấy Giờ Bằng Cách Nào?", "sentences": [f"S{i:03d}" for i in range(57, 61)]},
    "part9": {"title": "Chúng Ta Đang Thay Đổi UTC Một Lần Nữa", "sentences": [f"S{i:03d}" for i in range(61, 63)]},
    "part10": {"title": "Câu Trả Lời Thật Sự", "sentences": [f"S{i:03d}" for i in range(63, 65)]},
}

out_dir = Path("public/audio")
for part_id, pdata in PARTS.items():
    part_wav = out_dir / f"world_time_{part_id}.wav"
    sentence_ids = pdata["sentences"]
    
    first_wav_path = Path("public/audio/world-time-documentary") / f"{sentence_ids[0]}.wav"
    with wave.open(str(first_wav_path), 'rb') as w_in:
        params = w_in.getparams()
    
    all_frames = []
    for sid in sentence_ids:
        sp = Path("public/audio/world-time-documentary") / f"{sid}.wav"
        with wave.open(str(sp), 'rb') as w_in:
            all_frames.append(w_in.readframes(w_in.getnframes()))
            
    with wave.open(str(part_wav), 'wb') as w_out:
        w_out.setparams(params)
        for chunk in all_frames:
            w_out.writeframes(chunk)
            
    with wave.open(str(part_wav), 'rb') as w_chk:
        dur_s = w_chk.getnframes() / float(w_chk.getframerate())
        print(f"✅ {part_id}: {part_wav.name} -> {dur_s:.2f}s ({int(round(dur_s*30))} frames) [{len(sentence_ids)} sentences]")
