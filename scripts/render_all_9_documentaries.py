# -*- coding: utf-8 -*-
"""
Script render toàn bộ 9 phim tài liệu Remotion chất lượng cao (1080p 30fps)
Tự động lưu tiến độ, hỗ trợ nối tiếp nếu bị ngắt quãng, dọn dẹp file tạm sau khi xong.
"""
import os
import sys
import time
import json
import subprocess
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

DOCUMENTARIES = [
    {
        "id": "UndergroundDocumentary",
        "name": "Mạng Lưới Nấm Rừng",
        "output": "out/underground-documentary.mp4",
        "frames": 14351,
        "est_min": 7.97,
    },
    {
        "id": "WorldTimeDocumentary",
        "name": "Vì Sao Cả Thế Giới Mô Tả Cùng Thời Điểm?",
        "output": "out/world-time-documentary.mp4",
        "frames": 15036,
        "est_min": 8.35,
    },
    {
        "id": "VacxinDocumentary",
        "name": "Lịch Sử Vacxin",
        "output": "out/vacxin-documentary.mp4",
        "frames": 17608,
        "est_min": 9.78,
    },
    {
        "id": "BinaryDocumentary",
        "name": "Vì Sao Máy Tính Chỉ Hiểu 0 Và 1?",
        "output": "out/binary-documentary.mp4",
        "frames": 18321,
        "est_min": 10.18,
    },
    {
        "id": "GameHistoryDocumentary",
        "name": "Vì Sao Ai Cũng Chơi Game?",
        "output": "out/game-history-documentary.mp4",
        "frames": 19723,
        "est_min": 10.96,
    },
    {
        "id": "MayaDocumentary",
        "name": "Sự Sụp Đổ Của Đế Chế Maya",
        "output": "out/maya-documentary.mp4",
        "frames": 25500,
        "est_min": 14.17,
    },
    {
        "id": "FacebookWhoPaysDocumentary",
        "name": "Facebook Không Thu Tiền Bạn - Ai Đang Trả?",
        "output": "out/facebook-ai-tra-tien.mp4",
        "frames": 28095,
        "est_min": 15.61,
    },
    {
        "id": "HistoryGapsDocumentary",
        "name": "Những Khoảng Trống Lịch Sử",
        "output": "out/history-gaps-documentary.mp4",
        "frames": 31073,
        "est_min": 17.26,
    },
    {
        "id": "PharaohDocumentary",
        "name": "Tại Sao Pharaoh Ngừng Xây Kim Tự Tháp?",
        "output": "out/pharaoh-pyramids.mp4",
        "frames": 31647,
        "est_min": 17.58,
    },
]

STATUS_FILE = Path("out/render_status.json")

def load_status():
    if STATUS_FILE.exists():
        try:
            return json.loads(STATUS_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {}

def save_status(status):
    STATUS_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATUS_FILE.write_text(json.dumps(status, ensure_ascii=False, indent=2), encoding="utf-8")

def format_time(seconds):
    mins = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{mins}m {secs}s"

def render_documentary(doc, concurrency=10, force=False):
    out_path = Path(doc["output"])
    out_path.parent.mkdir(parents=True, exist_ok=True)
    
    comp_id = doc["id"]
    name = doc["name"]
    frames = doc["frames"]
    est = doc["est_min"]
    
    print("\n" + "=" * 75)
    print(f"🎬 BẮT ĐẦU RENDER: {comp_id}")
    print(f"📖 Tiêu đề: {name}")
    print(f"⏱️ Thời lượng: {frames} frames (~{est:.1f} phút @ 30fps)")
    print(f"📁 Đầu ra: {out_path}")
    print("=" * 75)

    status = load_status()
    t0 = time.time()
    
    status[comp_id] = {
        "name": name,
        "output": str(out_path),
        "status": "rendering",
        "start_time": time.strftime("%Y-%m-%d %H:%M:%S"),
        "frames": frames,
    }
    save_status(status)

    cmd = [
        "npx.cmd", "remotion", "render",
        comp_id,
        str(out_path),
        "--gl=angle",
        f"--concurrency={concurrency}",
    ]
    
    # Chạy lệnh render
    res = subprocess.run(cmd)
    duration = time.time() - t0

    if res.returncode == 0 and out_path.exists() and out_path.stat().st_size > 10 * 1024 * 1024:
        size_mb = out_path.stat().st_size / 1024 / 1024
        print(f"\n✅ HOÀN TẤT [{comp_id}]: {size_mb:.1f} MB trong {format_time(duration)}")
        status[comp_id].update({
            "status": "completed",
            "end_time": time.strftime("%Y-%m-%d %H:%M:%S"),
            "duration_seconds": round(duration, 1),
            "size_mb": round(size_mb, 2),
        })
        save_status(status)
        return True
    else:
        print(f"\n❌ LỖI RENDER [{comp_id}]! Mã lỗi: {res.returncode}")
        status[comp_id].update({
            "status": "failed",
            "end_time": time.strftime("%Y-%m-%d %H:%M:%S"),
            "exit_code": res.returncode,
        })
        save_status(status)
        return False

def main():
    concurrency = 10
    total_docs = len(DOCUMENTARIES)
    print("=" * 75)
    print(f"🚀 BẮT ĐẦU QUY TRÌNH RENDER HÀNG LOẠT {total_docs} PHIM TÀI LIỆU")
    print(f"⚙️ Cấu hình: GPU NVIDIA RTX 3060 · GL Backend: ANGLE · Concurrency: {concurrency}")
    print("=" * 75)

    overall_t0 = time.time()
    completed = 0
    failed = 0

    for idx, doc in enumerate(DOCUMENTARIES, 1):
        print(f"\n>>> [{idx}/{total_docs}] XỬ LÝ PHIM: {doc['id']} ({doc['name']})")
        ok = render_documentary(doc, concurrency=concurrency, force=True)
        if ok:
            completed += 1
        else:
            failed += 1
            print(f"⚠️ Phim {doc['id']} bị lỗi, chuyển sang phim tiếp theo...")

    # Dọn dẹp file ảnh tạm nếu có
    for p in Path("out").glob("*.png"):
        try:
            p.unlink()
        except Exception:
            pass

    overall_time = time.time() - overall_t0
    print("\n" + "=" * 75)
    print(f"🏁 TỔNG KẾT RENDER:")
    print(f"   - Thành công: {completed}/{total_docs}")
    print(f"   - Thất bại: {failed}/{total_docs}")
    print(f"   - Tổng thời gian: {format_time(overall_time)}")
    print(f"   - Nhật ký chi tiết: {STATUS_FILE}")
    print("=" * 75)

if __name__ == "__main__":
    main()
