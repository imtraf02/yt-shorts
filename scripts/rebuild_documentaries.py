# -*- coding: utf-8 -*-
"""
Master Orchestration Script: Re-generate TTS with VieNeu-TTS, transcribe Whisper tokens,
align captions, and synchronize image timings for all 9 long documentaries.
"""

import os
import sys
import time
import subprocess
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PYTHON_VENV = str(Path("VieNeu-TTS/.venv/Scripts/python.exe").resolve())

DOCS_CONFIG = {
    "pharaoh": {
        "name": "Tại sao Pharaoh ngừng xây Kim tự tháp?",
        "comp_id": "PharaohDocumentary",
        "tts_script": "scripts/build_pharaoh_tts.py",
        "raw_json_glob": "pharaoh_captions_raw_part*.json",
        "captions_mjs": "scripts/build_pharaoh_captions.mjs",
        "align_captions": "scripts/align_pharaoh_script_with_whisper.py",
        "generate_data": "scripts/generate_pharaoh_data.py",
        "align_timings": "scripts/align_pharaoh_image_timings.py",
    },
    "maya": {
        "name": "Đế Chế Maya Sụp Đổ: Bí Ẩn Lớn Nhất Khảo Cổ Học",
        "comp_id": "MayaDocumentary",
        "tts_script": "scripts/build_maya_tts.py",
        "raw_json_glob": "maya_captions_raw_part*.json",
        "captions_mjs": "scripts/build_maya_captions.mjs",
        "align_captions": "scripts/align_maya_script_with_whisper.py",
        "generate_data": "scripts/generate_maya_data.py",
        "align_timings": "scripts/align_maya_image_timings.py",
    },
    "dinosaur": {
        "name": "Toàn Cảnh Khủng Long: Các Nhóm Loài Thống Trị Trái Đất",
        "comp_id": "DinosaurDocumentary",
        "tts_script": "scripts/build_dinosaur_tts.py",
        "raw_json_glob": "dinosaur_captions_raw_part*.json",
        "captions_mjs": "scripts/build_dinosaur_captions.mjs",
        "align_captions": "scripts/align_dinosaur_script_with_whisper.py",
        "generate_data": "scripts/generate_dinosaur_data.py",
        "align_timings": "scripts/align_dinosaur_image_timings.py",
    },
    "history_gaps": {
        "name": "Những Khoảng Trống Lịch Sử: Khi Nền Văn Minh Biến Mất",
        "comp_id": "HistoryGapsDocumentary",
        "tts_script": "scripts/build_history_gaps_tts.py",
        "raw_json_glob": "history_gaps_captions_raw_part*.json",
        "captions_mjs": "scripts/build_history_gaps_captions.mjs",
        "align_captions": "scripts/align_history_gaps_script_with_whisper.py",
        "generate_data": "scripts/generate_history_gaps_data.py",
        "align_timings": "scripts/align_history_gaps_image_timings.py",
    },
    "facebook_who_pays": {
        "name": "Facebook Không Thu Tiền Bạn. Vậy Ai Đang Trả Tiền?",
        "comp_id": "FacebookWhoPaysDocumentary",
        "tts_script": "scripts/build_facebook_who_pays_tts.py",
        "raw_json_glob": "facebook_who_pays_captions_raw_part*.json",
        "captions_mjs": "scripts/build_facebook_who_pays_captions.mjs",
        "align_captions": "scripts/align_facebook_who_pays_script_with_whisper.py",
        "generate_data": None,
        "align_timings": "scripts/reorder_and_align_all_images.py",
    },
    "game_history": {
        "name": "Vì Sao Ai Cũng Chơi Game? 5.000 Năm Lịch Sử Trò Chơi",
        "comp_id": "GameHistoryDocumentary",
        "tts_script": "scripts/build_game_history_tts.py",
        "raw_json_glob": "game_history_captions_raw_part*.json",
        "captions_mjs": "scripts/build_game_history_captions.mjs",
        "align_captions": "scripts/align_game_history_script_with_whisper.py",
        "generate_data": None,
        "align_timings": "scripts/align_game_history_image_timings.py",
    },
    "vacxin": {
        "name": "Vacxin: Từ Con Bò Đến Mũi Tiêm Đầu Tiên",
        "comp_id": "VacxinDocumentary",
        "tts_script": "scripts/build_vacxin_tts.py",
        "raw_json_glob": "vacxin_captions_raw_part*.json",
        "captions_mjs": "scripts/build_vacxin_captions.mjs",
        "align_captions": "scripts/align_vacxin_script_with_whisper.py",
        "generate_data": None,
        "align_timings": "scripts/align_vacxin_image_timings.py",
    },
    "binary": {
        "name": "Vì Sao Máy Tính Chỉ Hiểu Số 0 Và 1?",
        "comp_id": "BinaryDocumentary",
        "tts_script": "scripts/build_binary_tts.py",
        "raw_json_glob": "binary_captions_raw_part*.json",
        "captions_mjs": "scripts/build_binary_captions.mjs",
        "align_captions": "scripts/align_binary_script_with_whisper.py",
        "generate_data": None,
        "align_timings": "scripts/align_binary_image_timings.py",
    },
    "underground": {
        "name": "Cuộc Sống Bí Mật Dưới Lòng Đất: Mạng Lưới Nấm Rừng",
        "comp_id": "UndergroundDocumentary",
        "tts_script": "scripts/build_underground_tts.py",
        "raw_json_glob": "underground_captions_raw_part*.json",
        "captions_mjs": "scripts/build_underground_captions.mjs",
        "align_captions": "scripts/align_underground_script_with_whisper.py",
        "generate_data": None,
        "align_timings": "scripts/align_underground_image_timings.py",
    },
}

def run_cmd(cmd_list, description):
    print(f"\n---> [BẮT ĐẦU] {description}")
    t0 = time.time()
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"
    result = subprocess.run(cmd_list, env=env, text=True, capture_output=False)
    el = time.time() - t0
    if result.returncode != 0:
        print(f"❌ [LỖI] {description} thất bại (mã thoát {result.returncode}) sau {el:.1f}s!")
        raise RuntimeError(f"Command failed: {description}")
    print(f"✅ [XONG] {description} hoàn tất thành công trong {el:.1f}s.")

def process_documentary(doc_key: str, cfg: dict):
    print("\n" + "#" * 70)
    print(f"🎬 XỬ LÝ PHIM TÀI LIỆU: [{doc_key.upper()}] - {cfg['name']}")
    print("#" * 70)
    doc_t0 = time.time()

    # Bước 1: Sinh TTS
    tts_cmd = [PYTHON_VENV, cfg["tts_script"], "--force"]
    run_cmd(tts_cmd, f"Sinh TTS VieNeu-TTS (Trúc Ly) cho {doc_key}")

    # Bước 2: Xóa cache raw Whisper cũ và temp_16k để đảm bảo Whisper bóc tách lại từ audio mới
    data_dir = Path("src/data")
    deleted_raw = 0
    for p in data_dir.glob(cfg["raw_json_glob"]):
        try:
            p.unlink()
            deleted_raw += 1
        except Exception:
            pass
    for p in Path(".").glob("temp_16k_*.wav"):
        try:
            p.unlink()
        except Exception:
            pass
    print(f"🧹 Đã xóa {deleted_raw} file raw whisper cache cũ để bóc tách từ audio mới.")

    # Bước 3: Chạy Whisper.cpp trích xuất timestamps
    captions_cmd = ["node", cfg["captions_mjs"]]
    run_cmd(captions_cmd, f"Bóc tách Whisper timestamps cho {doc_key}")

    # Bước 4: Căn chỉnh kịch bản với Whisper tokens -> tạo file TS captions
    align_captions_cmd = [PYTHON_VENV, cfg["align_captions"]]
    run_cmd(align_captions_cmd, f"Căn chỉnh captions TS cho {doc_key}")

    # Bước 5a: Generate Data (nếu có script riêng)
    if cfg["generate_data"]:
        gen_data_cmd = [PYTHON_VENV, cfg["generate_data"]]
        run_cmd(gen_data_cmd, f"Cập nhật thời lượng audio vào Data.ts cho {doc_key}")

    # Bước 5b: Căn chỉnh khớp ảnh với audio (imageStartFrames)
    if cfg["align_timings"]:
        align_timings_cmd = [PYTHON_VENV, cfg["align_timings"]]
        run_cmd(align_timings_cmd, f"Căn chỉnh khớp ảnh với lời thoại (imageStartFrames) cho {doc_key}")

    # Bước 6: Kiểm tra nhanh Still Frame trên Remotion
    test_still_path = Path(f"out/test_{doc_key}.png")
    still_cmd = ["npx.cmd", "remotion", "still", cfg["comp_id"], str(test_still_path), "--frame=60", "--gl=angle"]
    try:
        run_cmd(still_cmd, f"Kiểm tra Remotion Still render cho {cfg['comp_id']}")
        if test_still_path.exists():
            test_still_path.unlink()
            print(f"🧹 Đã dọn dẹp preview ảnh kiểm tra {test_still_path}")
    except Exception as e:
        print(f"⚠️ Cảnh báo kiểm tra still: {e}")

    total_el = time.time() - doc_t0
    print(f"\n🎉 [HOÀN TẤT TOÀN BỘ] {cfg['name']} ({doc_key}) trong {total_el/60:.2f} phút!")

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--doc", type=str, default="all",
                        help="Tên phim tài liệu (pharaoh, maya, dinosaur, history_gaps, facebook_who_pays, game_history, vacxin, binary, underground) hoặc 'all'")
    args = parser.parse_args()

    t_start = time.time()
    if args.doc == "all":
        docs_to_run = list(DOCS_CONFIG.keys())
    elif "," in args.doc:
        docs_to_run = [d.strip() for d in args.doc.split(",") if d.strip()]
    else:
        docs_to_run = [args.doc]

    print(f"🚀 BẮT ĐẦU QUY TRÌNH TÁI CẤU TRÚC TTS VÀ ĐỒNG BỘ HÌNH ẢNH CHO {len(docs_to_run)} PHIM TÀI LIỆU...")
    for idx, doc_key in enumerate(docs_to_run, 1):
        if doc_key not in DOCS_CONFIG:
            print(f"❌ Không tìm thấy phim tài liệu với slug: {doc_key}")
            continue
        print(f"\n>>> [{idx}/{len(docs_to_run)}] ĐANG TIẾN HÀNH: {doc_key}")
        process_documentary(doc_key, DOCS_CONFIG[doc_key])

    grand_total = time.time() - t_start
    print("\n" + "=" * 70)
    print(f"🏆 TẤT CẢ {len(docs_to_run)} PHIM TÀI LIỆU ĐÃ ĐƯỢC CẬP NHẬT TTS MỚI VÀ ĐỒNG BỘ KHỚP ẢNH 100%!")
    print(f"⏱️ Tổng thời gian thực hiện: {grand_total/60:.2f} phút ({grand_total:.1f}s)")
    print("=" * 70)

if __name__ == "__main__":
    main()
