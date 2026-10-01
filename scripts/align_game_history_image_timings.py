# -*- coding: utf-8 -*-
"""
Script tính toán chính xác imageStartFrames cho 108 ảnh trong 10 chương của video
'Vì sao ai cũng chơi game? 5.000 năm lịch sử trò chơi'.
Dựa trên timestamps chính xác của từng paragraph từ Whisper để đảm bảo
100% ẢNH KHỚP CHÍNH XÁC VỚI LỜI NÓI (AUDIO).
Xuất ra src/data/gameHistoryData.ts.
"""

import sys
import json
import re
import wave
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

def normalize_text(text: str) -> str:
    t = text.lower().strip()
    t = re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t)
    return t

def get_audio_duration_in_frames(wav_path: Path, fps: int = 30) -> int:
    with wave.open(str(wav_path), 'rb') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        duration_s = frames / float(rate)
        return int(round(duration_s * fps))

def find_paragraph_start_ms(para_text: str, aligned_words: list, search_start_idx: int = 0):
    """
    Tìm vị trí bắt đầu (startMs) của đoạn văn trong danh sách từ đã căn chỉnh.
    """
    first_words = [normalize_text(w) for w in para_text.split()[:4]]
    if not first_words:
        return 0, search_start_idx

    for idx in range(search_start_idx, len(aligned_words) - len(first_words) + 1):
        match = True
        for k, fw in enumerate(first_words):
            if normalize_text(aligned_words[idx + k]["word"]) != fw:
                match = False
                break
        if match:
            return aligned_words[idx]["startMs"], idx + len(first_words)

    # Fallback nếu không khớp chính xác 4 từ: thử khớp 2 từ đầu
    first_two = first_words[:2]
    for idx in range(search_start_idx, len(aligned_words) - len(first_two) + 1):
        if [normalize_text(aligned_words[idx + k]["word"]) for k in range(len(first_two))] == first_two:
            return aligned_words[idx]["startMs"], idx + len(first_two)

    return (aligned_words[search_start_idx]["startMs"] if search_start_idx < len(aligned_words) else 0), search_start_idx

def main():
    meta_path = Path("src/data/game_history_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}")
        return

    chapters = json.loads(meta_path.read_text(encoding="utf-8"))
    captions_file = Path("src/data/game_historyCaptions.ts")

    # Đọc raw tokens từ whisper
    fps = 30
    global_start_frame = 0
    final_chapters = []

    for ch in chapters:
        sec_id = ch["id"]
        wav_file = Path("public/audio") / f"game_history_{sec_id}.wav"
        if not wav_file.exists():
            print(f"❌ Không tìm thấy audio {wav_file}")
            return

        dur_frames = get_audio_duration_in_frames(wav_file, fps)

        raw_file = Path("src/data") / f"game_history_captions_raw_{sec_id}.json"
        if not raw_file.exists():
            print(f"❌ Chưa có raw whisper captions: {raw_file}")
            return

        raw_tokens = json.loads(raw_file.read_text(encoding="utf-8"))
        from scripts.align_game_history_script_with_whisper import align_chapter
        full_text = " ".join(ch["paragraphs"])
        aligned_tokens = align_chapter(sec_id, full_text, raw_tokens)

        image_start_frames = []
        w_idx = 0
        for p_idx, para in enumerate(ch["paragraphs"]):
            p_len = len(para.split())
            if p_idx == 0:
                frame_at = 0
            else:
                start_ms = aligned_tokens[w_idx]["startMs"] if w_idx < len(aligned_tokens) else (aligned_tokens[-1]["endMs"] if aligned_tokens else 0)
                frame_at = int(round((start_ms / 1000.0) * fps))
                prev_frame = image_start_frames[-1]
                if frame_at <= prev_frame:
                    frame_at = prev_frame + 20
                if frame_at >= dur_frames - 15:
                    frame_at = dur_frames - 15
            image_start_frames.append(frame_at)
            w_idx += p_len

        ch_data = {
            "id": sec_id,
            "chapterNumber": ch["chapter_num"],
            "partLabel": ch["part_label"],
            "historicalEra": ch["historical_era"],
            "title": ch["title"],
            "subtitle": ch["subtitle"],
            "audioSrc": f"audio/game_history_{sec_id}.wav",
            "durationInFrames": dur_frames,
            "startFrame": global_start_frame,
            "images": ch["images"],
            "imageDescriptions": ch["image_descriptions"],
            "imageStartFrames": image_start_frames,
        }
        final_chapters.append(ch_data)
        print(f"✅ {sec_id}: {dur_frames} frames ({dur_frames/fps:.1f}s) | {len(image_start_frames)} ảnh | Start: {global_start_frame}")
        global_start_frame += dur_frames

    total_frames = global_start_frame
    total_sec = total_frames / fps

    ts_content = f"""// Dữ liệu 10 chương phim tài liệu 'Vì sao ai cũng chơi game? 5.000 năm lịch sử trò chơi'
export interface GameHistoryChapter {{
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
}}

export const TOTAL_GAME_HISTORY_FRAMES = {total_frames};

export const GAME_HISTORY_CHAPTERS: GameHistoryChapter[] = {json.dumps(final_chapters, indent=2, ensure_ascii=False)};
"""

    out_ts = Path("src/data/gameHistoryData.ts")
    out_ts.write_text(ts_content, encoding="utf-8")
    print(f"\n🎉 Đã xuất thành công: {out_ts}")
    print(f"📊 Tổng thời lượng toàn bộ phim: {total_frames} frames ({total_sec:.1f}s ~ {total_sec/60:.2f} phút)")

if __name__ == "__main__":
    main()
