# -*- coding: utf-8 -*-
"""
Script cập nhật UndergroundDocumentary sang kiến trúc âm thanh mới (Sentence-by-Sentence).
- Nạp metadata từ public/audio/underground/sentences_manifest.json
- Tái cấu trúc src/data/undergroundData.ts với 63 phân cảnh và audio từng câu
- Tự động đồng bộ timestamps phụ đề song ngữ (VN + EN) trong src/data/undergroundCaptions.ts
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
    return re.sub(r"[^\w\s]", "", text.lower()).strip()

def main():
    chapters_path = Path("src/data/underground_chapters.json")
    manifest_path = Path("public/audio/underground/sentences_manifest.json")
    captions_ts_path = Path("src/data/undergroundCaptions.ts")

    chapters_raw = json.loads(chapters_path.read_text(encoding="utf-8"))
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest_map = {item["id"]: item for item in manifest}

    # 1. Đọc undergroundCaptions.ts hiện tại
    content = captions_ts_path.read_text(encoding="utf-8")
    prefix = "export const UNDERGROUND_CAPTIONS: Record<string, CaptionPhrase[]> = "
    json_text = content.split(prefix)[1].strip()
    if json_text.endswith(";"):
        json_text = json_text[:-1].strip()
    json_text = re.sub(r",\s*\}", "}", json_text)
    json_text = re.sub(r",\s*\]", "]", json_text)
    orig_captions = json.loads(json_text)

    # 2. Xây dựng cấu trúc Chapters và Scenes
    updated_chapters = []
    global_scene_idx = 1
    accumulated_global_frame = 0

    new_chapter_captions = {}

    for ch in chapters_raw:
        cid = ch["id"]
        ch_num = ch["chapterNumber"]
        scenes_in_ch = []
        img_start_frames = []
        scene_audios = []
        ch_local_frame = 0

        # Danh sách scenes của chapter
        for p_idx, (para, img, desc) in enumerate(zip(ch["paragraphs"], ch["images"], ch["imageDescriptions"])):
            sid = f"S{global_scene_idx:03d}"
            m_item = manifest_map[sid]

            dur_frames = m_item["durationInFrames"]
            speech_ms = m_item["speechDurationMs"]
            pause_ms = m_item["pauseDurationMs"]
            dur_ms = m_item["durationMs"]

            scene_obj = {
                "id": sid,
                "sceneIndex": global_scene_idx,
                "text": para.strip(),
                "image": img,
                "description": desc,
                "audioSrc": m_item["audioSrc"],
                "speechDurationMs": speech_ms,
                "pauseDurationMs": pause_ms,
                "durationMs": dur_ms,
                "durationInFrames": dur_frames,
                "chapterLocalStartFrame": ch_local_frame,
                "globalStartFrame": accumulated_global_frame + ch_local_frame
            }

            img_start_frames.append(ch_local_frame)
            scene_audios.append(m_item["audioSrc"])
            scenes_in_ch.append(scene_obj)

            ch_local_frame += dur_frames
            global_scene_idx += 1

        ch_dur_frames = ch_local_frame
        updated_chapter = {
            "id": cid,
            "chapterNumber": ch_num,
            "partLabel": ch["partLabel"],
            "historicalEra": ch["historicalEra"],
            "title": ch["title"],
            "subtitle": ch["subtitle"],
            "durationInFrames": ch_dur_frames,
            "startFrame": accumulated_global_frame,
            "images": ch["images"],
            "imageDescriptions": ch["imageDescriptions"],
            "imageStartFrames": img_start_frames,
            "sceneAudios": scene_audios,
            "scenes": scenes_in_ch
        }
        updated_chapters.append(updated_chapter)
        accumulated_global_frame += ch_dur_frames

        # 3. Đồng bộ phụ đề cho chapter này
        ch_orig_phrases = orig_captions.get(cid, [])
        num_scenes = len(scenes_in_ch)
        
        # Ghép phrases vào từng scene tương ứng
        # Lấy từ vựng để so khớp
        scene_phrases_map = [[] for _ in range(num_scenes)]
        
        # Dùng tỷ lệ số từ lũy kế để phân bổ phrase chính xác vào scene
        scene_word_lens = [len(s["text"].split()) for s in scenes_in_ch]
        total_scene_words = sum(scene_word_lens)

        phrase_word_lens = [len(p["words"]) for p in ch_orig_phrases]
        total_p_words = sum(phrase_word_lens)

        cum_words = 0
        scene_cum = []
        for w in scene_word_lens:
            cum_words += w
            scene_cum.append(cum_words)

        cur_scene = 0
        p_word_sum = 0
        for p in ch_orig_phrases:
            p_len = len(p["words"])
            mid_p = p_word_sum + p_len / 2.0
            while cur_scene < num_scenes - 1 and mid_p > (scene_cum[cur_scene] / total_scene_words * total_p_words):
                cur_scene += 1
            scene_phrases_map[cur_scene].append(p)
            p_word_sum += p_len

        # Bây giờ cập nhật timestamps chính xác theo từng scene
        new_ch_phrases = []
        for s_idx, scene in enumerate(scenes_in_ch):
            s_phrases = scene_phrases_map[s_idx]
            if not s_phrases:
                continue

            scene_start_ms = int((scene["chapterLocalStartFrame"] / 30) * 1000)
            speech_ms = scene["speechDurationMs"]

            s_words_total = sum(len(p["words"]) for p in s_phrases)
            if s_words_total == 0:
                continue

            ms_per_w = speech_ms / s_words_total
            word_acc = 0

            for p in s_phrases:
                p_word_count = len(p["words"])
                p_start_ms = int(scene_start_ms + word_acc * ms_per_w)
                p_end_ms = int(scene_start_ms + (word_acc + p_word_count) * ms_per_w)

                new_words = []
                for wi, w in enumerate(p["words"]):
                    w_start = int(scene_start_ms + (word_acc + wi) * ms_per_w)
                    w_end = int(scene_start_ms + (word_acc + wi + 1) * ms_per_w)
                    new_words.append({
                        "word": w["word"],
                        "startMs": w_start,
                        "endMs": w_end
                    })

                new_phrase = {
                    "startMs": p_start_ms,
                    "endMs": p_end_ms,
                    "words": new_words
                }
                if "textEn" in p:
                    new_phrase["textEn"] = p["textEn"]

                new_ch_phrases.append(new_phrase)
                word_acc += p_word_count

        new_chapter_captions[cid] = new_ch_phrases

    total_frames = accumulated_global_frame
    print(f"✅ Đã cấu trúc 8 chương, tổng frames mới: {total_frames} ({total_frames/30:.2f}s, {total_frames/30/60:.2f} phút)")

    # 4. Ghi file src/data/undergroundData.ts
    underground_data_ts = f"""// Dữ liệu 8 chương phim tài liệu 'Cuộc Sống Bí Mật Dưới Lòng Đất: Mạng Lưới Nấm'
// Áp dụng kiến trúc âm thanh TỪNG CÂU (Sentence-by-Sentence) với khoảng ngắt nhịp tự nhiên 0.45s

export interface UndergroundScene {{
  id: string;
  sceneIndex: number;
  text: string;
  image: string;
  description: string;
  audioSrc: string;
  speechDurationMs: number;
  pauseDurationMs: number;
  durationMs: number;
  durationInFrames: number;
  chapterLocalStartFrame: number;
  globalStartFrame: number;
}}

export interface UndergroundChapter {{
  id: string;
  chapterNumber: number;
  partLabel: string;
  historicalEra: string;
  title: string;
  subtitle: string;
  durationInFrames: number;
  startFrame: number;
  images: string[];
  imageDescriptions: string[];
  imageStartFrames: number[];
  sceneAudios: string[];
  scenes: UndergroundScene[];
}}

export const TOTAL_UNDERGROUND_FRAMES = {total_frames};

export const UNDERGROUND_CHAPTERS: UndergroundChapter[] = {json.dumps(updated_chapters, ensure_ascii=False, indent=2)};
"""
    Path("src/data/undergroundData.ts").write_text(underground_data_ts, encoding="utf-8")
    print(f"📄 Đã cập nhật: src/data/undergroundData.ts")

    # 5. Ghi file src/data/undergroundCaptions.ts
    captions_ts_content = f"""// Auto-generated bilingual subtitles (VN + EN) for UndergroundDocumentary
// Đồng bộ 100% với kiến trúc âm thanh Sentence-by-Sentence mới (48kHz Hi-Fi Trúc Ly)
import type {{ CaptionPhrase }} from "./historyGapsCaptions";

export const UNDERGROUND_CAPTIONS: Record<string, CaptionPhrase[]> = {json.dumps(new_chapter_captions, ensure_ascii=False, indent=2)};
"""
    captions_ts_path.write_text(captions_ts_content, encoding="utf-8")
    print(f"📄 Đã cập nhật phụ đề song ngữ: src/data/undergroundCaptions.ts")

if __name__ == "__main__":
    main()
