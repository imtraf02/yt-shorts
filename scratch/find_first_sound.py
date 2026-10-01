import wave
import numpy as np

with wave.open("public/audio/facebook_who_pays_part1.wav", "rb") as wf:
    sr = wf.getframerate()
    frames = wf.readframes(sr) # read 1 second
    data = np.frombuffer(frames, dtype=np.int16)
    
print("Sample rate:", sr)
# check when amplitude exceeds threshold (e.g. 500)
thresh = 500
non_zero = np.where(np.abs(data) > thresh)[0]
if len(non_zero) > 0:
    first_sound_sample = non_zero[0]
    first_sound_ms = (first_sound_sample / sr) * 1000
    print(f"First sound occurs at sample {first_sound_sample}, which is {first_sound_ms:.1f}ms")
else:
    print("No sound > thresh in first 1 second")
