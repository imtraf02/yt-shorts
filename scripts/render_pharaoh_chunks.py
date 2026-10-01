# -*- coding: utf-8 -*-
"""
Script xuất video PharaohDocumentary theo 5 phân đoạn an toàn (Batches)
và tự động ghép nối không mất chất lượng bằng FFmpeg Concat.
Tránh tình trạng timeout tiến trình nền khi render video dài 19.3 phút (34,772 frames).
"""

import sys
import subprocess
import argparse
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BATCHES = [
    {
        "id": "batch1",
        "name": "Chương 1 - 4 (Nghịch lý, Kim tự tháp hoàng kim, Đạo tặc & Bài toán kinh tế)",
        "start": 0,
        "end": 8372,
        "out_file": "out/chunks/pharaoh_batch1.mp4"
    },
    {
        "id": "batch2",
        "name": "Chương 5 - 7 (Ý tưởng đột phá, Thung lũng các vị Vua & Làng thợ Deir el-Medina)",
        "start": 8373,
        "end": 15120,
        "out_file": "out/chunks/pharaoh_batch2.mp4"
    },
    {
        "id": "batch3",
        "name": "Chương 8 - 10 (Phiên tòa xét xử, Bí mật Tutankhamun & Sự phô trương đền Karnak)",
        "start": 15121,
        "end": 22144,
        "out_file": "out/chunks/pharaoh_batch3.mp4"
    },
    {
        "id": "batch4",
        "name": "Chương 11 - 14 (Thành phố thần linh, Thuế & Chiến lợi phẩm, Quyền lực tư tế & Kết luận)",
        "start": 22145,
        "end": 31230,
        "out_file": "out/chunks/pharaoh_batch4.mp4"
    }
]

def render_batch(batch, concurrency=12, force=False):
    out_path = Path(batch["out_file"])
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if not force and out_path.exists() and out_path.stat().st_size > 10 * 1024 * 1024:
        print(f"⏩ {batch['id']} ({batch['name']}) đã tồn tại ({out_path.stat().st_size / 1024 / 1024:.1f} MB), bỏ qua.")
        return True

    cmd = [
        "npx.cmd", "remotion", "render",
        "PharaohDocumentary",
        str(out_path),
        f"--frames={batch['start']}-{batch['end']}",
        "--gl=angle",
        f"--concurrency={concurrency}",
        "--overwrite"
    ]

    print(f"\n🎬 Bắt đầu render [{batch['id']}]: {batch['name']}")
    print(f"⏱️ Dải frames: {batch['start']} -> {batch['end']} ({batch['end'] - batch['start'] + 1} frames)")
    print(f"💻 Lệnh: {' '.join(cmd)}")

    ret = subprocess.run(cmd)
    if ret.returncode != 0:
        print(f"❌ Lỗi khi render {batch['id']} (code {ret.returncode})")
        return False

    print(f"✅ Đã render xong {batch['id']} -> {out_path} ({out_path.stat().st_size / 1024 / 1024:.1f} MB)")
    return True

def concatenate_batches(final_output="out/pharaoh-pyramids.mp4"):
    out_final = Path(final_output)
    out_final.parent.mkdir(parents=True, exist_ok=True)

    chunks_dir = Path("out/chunks")
    concat_list = chunks_dir / "concat_list_pharaoh.txt"

    lines = []
    for b in BATCHES:
        p = Path(b["out_file"]).resolve()
        if not p.exists() or p.stat().st_size < 1024 * 1024:
            print(f"❌ Thiếu file: {p}")
            return False
        lines.append(f"file '{p.as_posix()}'")

    concat_list.write_text("\n".join(lines), encoding="utf-8")
    print(f"\n📄 Đã tạo danh sách ghép nối: {concat_list}")

    cmd = [
        "npx.cmd", "remotion", "ffmpeg",
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_list),
        "-c", "copy",
        str(out_final)
    ]

    print(f"🔗 Ghép 5 phân đoạn thành video hoàn chỉnh: {out_final}...")
    ret = subprocess.run(cmd)
    if ret.returncode == 0:
        print(f"\n🎉 HOÀN THÀNH XUẤT BẢN VIDEO TOÀN DIỆN!")
        print(f"📁 Video thành phẩm: {out_final} ({out_final.stat().st_size / 1024 / 1024:.1f} MB)")
        return True
    else:
        print(f"❌ Lỗi ghép nối ffmpeg (code {ret.returncode})")
        return False

def main():
    parser = argparse.ArgumentParser(description="Render Pharaoh Documentary in chunks")
    parser.add_argument("--batch", type=str, default="all", help="batch1..batch4, 'concat', or 'all'")
    parser.add_argument("--concurrency", type=int, default=12, help="Remotion render concurrency (default: 12)")
    parser.add_argument("--force", action="store_true", help="Force re-rendering even if output exists")
    args = parser.parse_args()

    if args.batch == "concat":
        concatenate_batches()
        return

    if args.batch in ["batch1", "batch2", "batch3", "batch4"]:
        target = next(b for b in BATCHES if b["id"] == args.batch)
        render_batch(target, concurrency=args.concurrency, force=args.force)
        return

    # Render all
    for b in BATCHES:
        ok = render_batch(b, concurrency=args.concurrency, force=args.force)
        if not ok:
            print(f"Dừng tiến trình do lỗi ở {b['id']}")
            return

    # Tự động ghép nối sau khi tất cả batch hoàn tất
    concatenate_batches()

if __name__ == "__main__":
    main()
