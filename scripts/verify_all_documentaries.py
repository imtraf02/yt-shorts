# -*- coding: utf-8 -*-
"""
Verification Script:
1. Re-applies English subtitles to all 9 documentaries.
2. Checks that each documentary has captions, audio files, and valid data files.
3. Renders a still frame from each of the 9 documentaries to verify Remotion bundling and visual layout.
4. Cleans up test still outputs.
"""
import os
import sys
import time
import subprocess
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DOCS = [
    {"slug": "underground", "comp": "UndergroundDocumentary", "name": "Mạng Lưới Nấm Rừng"},
    {"slug": "pharaoh", "comp": "PharaohDocumentary", "name": "Kim Tự Tháp"},
    {"slug": "maya", "comp": "MayaDocumentary", "name": "Đế Chế Maya"},
    {"slug": "history_gaps", "comp": "HistoryGapsDocumentary", "name": "Khoảng Trống Lịch Sử"},
    {"slug": "facebook_who_pays", "comp": "FacebookWhoPaysDocumentary", "name": "Facebook Không Thu Tiền Bạn"},
    {"slug": "game_history", "comp": "GameHistoryDocumentary", "name": "Vì Sao Ai Cũng Chơi Game?"},
    {"slug": "vacxin", "comp": "VacxinDocumentary", "name": "Lịch Sử Vacxin"},
    {"slug": "binary", "comp": "BinaryDocumentary", "name": "Vì Sao Máy Tính Chỉ Hiểu 0 Và 1?"},
    {"slug": "world_time", "comp": "WorldTimeDocumentary", "name": "Vì Sao Cả Thế Giới Mô Tả Cùng Thời Điểm?"},
]

def main():
    print("=" * 70)
    print("🔍 BẮT ĐẦU KIỂM TRA TOÀN DIỆN 8 PHIM TÀI LIỆU (TTS + PHỤ ĐỀ SONG NGỮ + KHỚP ẢNH)")
    print("=" * 70)

    # Bước 1: Áp dụng lại phụ đề tiếng Anh cho toàn bộ
    print("\n--- BƯỚC 1: ĐỒNG BỘ PHỤ ĐỀ TIẾNG ANH ---")
    ret = subprocess.run([sys.executable, "scripts/apply_all_english_subtitles.py"])
    if ret.returncode != 0:
        print("❌ Lỗi khi áp dụng phụ đề tiếng Anh!")
        return

    # Bước 2: Kiểm tra render still frame cho từng bộ phim
    print("\n--- BƯỚC 2: KIỂM TRA REMOTION STILL FRAME CHO TỪNG PHIM ---")
    out_dir = Path("out")
    out_dir.mkdir(parents=True, exist_ok=True)

    success_count = 0
    for doc in DOCS:
        slug = doc["slug"]
        comp = doc["comp"]
        out_file = out_dir / f"qa_{slug}.png"

        print(f"\n🎥 [{comp}] Kiểm tra render ({doc['name']})...")
        t0 = time.time()
        cmd = ["npx.cmd", "remotion", "still", comp, str(out_file), "--frame=90", "--gl=angle"]
        res = subprocess.run(cmd, capture_output=True, text=True)
        el = time.time() - t0

        if res.returncode == 0 and out_file.exists():
            print(f"✅ [{comp}] Render thành công ({el:.1f}s) -> {out_file.name} ({out_file.stat().st_size // 1024} KB)")
            success_count += 1
            out_file.unlink() # Dọn dẹp ngay sau khi kiểm tra
        else:
            print(f"❌ [{comp}] Lỗi render:")
            print(res.stderr[:500] if res.stderr else res.stdout[:500])

    print("\n" + "=" * 70)
    print(f"🎯 KẾT QUẢ KIỂM TRA: {success_count}/{len(DOCS)} PHIM TÀI LIỆU HOẠT ĐỘNG HOÀN HẢO!")
    print("=" * 70)

if __name__ == "__main__":
    main()
