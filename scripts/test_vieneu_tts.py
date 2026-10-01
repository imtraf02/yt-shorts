import os
import sys
import time
import unicodedata
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from vieneu import Vieneu

def to_ascii_slug(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = re.sub(r"[\u0300-\u036f]", "", text)
    text = text.replace("đ", "d").replace("Đ", "D")
    return re.sub(r"[^a-zA-Z0-9_]+", "_", text.lower()).strip("_")

def test_tts():
    print("=== Khởi tạo VieNeu-TTS (mode='v3turbo', GPU NVIDIA RTX 3060) ===")
    t0 = time.time()
    tts = Vieneu()
    print(f"Khởi tạo xong trong {time.time() - t0:.2f}s")
    
    print("\n=== Danh sách toàn bộ 25 giọng đọc có sẵn ===")
    voices = tts.list_preset_voices()
    for label, voice_id in voices:
        print(f" - {voice_id:15}: {label}")

    test_samples = [
        (
            "Thiện Minh",
            "Chào bạn! Tôi là Thiện Minh. VieNeu TTS là mô hình chuyển văn bản thành giọng nói tiếng Việt chất lượng cao với tốc độ cực nhanh."
        ),
        (
            "Mai Anh",
            "Bản tin công nghệ hôm nay: Hệ thống trí tuệ nhân tạo tạo sinh giọng nói đã được cài đặt và vận hành mượt mà trên hệ thống của bạn."
        ),
        (
            "Thùy Dung",
            "Xin chào quý khán giả miền Nam! Đây là giọng đọc nữ Nam Bộ rất tự nhiên và truyền cảm."
        )
    ]
    
    out_dir = "tmp/tts_test"
    os.makedirs(out_dir, exist_ok=True)
    
    results = []
    for voice_name, text in test_samples:
        print(f"\n--------------------------------------------------")
        print(f"🎙️ Đang tạo TTS với giọng: [{voice_name}]")
        print(f"📝 Nội dung: \"{text}\"")
        t_gen = time.time()
        audio = tts.infer(text, voice=voice_name)
        gen_duration = time.time() - t_gen
        
        safe_voice_filename = to_ascii_slug(voice_name)
        out_file = os.path.join(out_dir, f"test_{safe_voice_filename}.wav")
        tts.save(audio, out_file)
        
        file_size_kb = os.path.getsize(out_file) / 1024
        sr = 48000
        audio_len_s = len(audio) / sr if hasattr(audio, "__len__") else 0
        rtf = gen_duration / audio_len_s if audio_len_s > 0 else 0
        
        print(f"✅ Đã lưu: {out_file}")
        print(f"📊 Thông số:")
        print(f"   - Thời gian sinh: {gen_duration:.2f}s")
        print(f"   - Thời lượng audio: {audio_len_s:.2f}s")
        print(f"   - Tốc độ sinh (RTF): {rtf:.3f}x")
        print(f"   - Dung lượng: {file_size_kb:.1f} KB (48kHz)")
        results.append((voice_name, out_file, audio_len_s, gen_duration, rtf))

    print("\n==================================================")
    print("🎉 TẤT CẢ GIỌNG ĐỌC ĐÃ ĐƯỢC TẠO THÀNH CÔNG!")
    print("==================================================")
    for v, f, a_len, g_dur, rtf in results:
        print(f"* Giọng: {v:12} | File: {f} | Dài: {a_len:.1f}s | Sinh: {g_dur:.2f}s")

if __name__ == "__main__":
    test_tts()
