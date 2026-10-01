# -*- coding: utf-8 -*-
"""
Script xuất video FidelCastroDocumentary theo 4 phân đoạn an toàn (Batches)
và tự động ghép nối không mất chất lượng bằng FFmpeg Concat.
Tránh tình trạng timeout tiến trình nền khi render video dài 18.8 phút.
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
        "name": "Chương 1 - 3 (Mở đầu, Tuổi thơ Biran, Pháo đài Moncada)",
        "start": 0,
        "end": 7723,
        "out_file": "out/chunks/fidel_batch1.mp4"
    },
    {
        "id": "batch2",
        "name": "Chương 4 - 6 (Che Guevara & Granma, Chiến thắng 1959, Quan hệ với Mỹ)",
        "start": 7724,
        "end": 15902,
        "out_file": "out/chunks/fidel_batch2.mp4"
    },
    {
        "id": "batch3",
        "name": "Chương 7 - 9 (Vịnh Con Lợn, Khủng hoảng tên lửa, Người bạn lớn Việt Nam)",
        "start": 15903,
        "end": 24832,
        "out_file": "out/chunks/fidel_batch3.mp4"
    },
    {
        "id": "batch4",
        "name": "Chương 10 - 12 (Nửa thế kỷ cầm quyền, Những năm cuối đời, Di sản bất tử)",
        "start": 24833,
        "end": 33822,
        "out_file": "out/chunks/fidel_batch4.mp4"
    }
]

def render_batch(batch, concurrency=12):
    out_path = Path(batch["out_file"])
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if out_path.exists() and out_path.stat().st_size > 10 * 1024 * 1024:
        print(f"⏩ {batch['id']} ({batch['name']}) đã tồn tại ({out_path.stat().st_size / 1024 / 1024:.1f} MB), bỏ qua.")
        return True

    cmd = [
        "npx.cmd", "remotion", "render",
        "FidelCastroDocumentary",
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

def concatenate_batches(final_output="out/fidel-castro.mp4"):
    out_final = Path(final_output)
    out_final.parent.mkdir(parents=True, exist_ok=True)

    chunks_dir = Path("out/chunks")
    concat_list = chunks_dir / "concat_list.txt"

    lines = []
    for b in BATCHES:
        p = Path(b["out_file"]).resolve()
        if not p.exists() or p.stat().st_size < 1024 * 1024:
            print(f"❌ Thiếu file: {p}")
            return False
        # FFmpeg concat file format with forward slashes
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

    print(f"🔗 Ghép 4 phân đoạn thành video hoàn chỉnh: {out_final}...")
    ret = subprocess.run(cmd)
    if ret.returncode != 0:
        print(f"❌ Ghép thất bại (code {ret.returncode})")
        return False

    size_mb = out_final.stat().st_size / 1024 / 1024
    print(f"\n🎉 THÀNH CÔNG! Đã xuất hoàn chỉnh video: {out_final} ({size_mb:.1f} MB)")
    return True

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch", type=str, default="all", help="batch1..batch4, or 'concat', or 'all'")
    parser.add_argument("--concurrency", type=int, default=12)
    args = parser.parse_args()

    if args.batch == "concat":
        concatenate_batches()
        return

    for b in BATCHES:
        if args.batch != "all" and args.batch != b["id"]:
            continue
        success = render_batch(b, concurrency=args.concurrency)
        if not success:
            sys.exit(1)

    if args.batch == "all":
        concatenate_batches()

if __name__ == "__main__":
    main()
