# QA Report: World Time Documentary

- **Slug**: `world-time-documentary`
- **Title**: Vì sao cả thế giới vẫn mô tả được cùng một thời điểm?
- **Date**: 2026-09-30
- **Duration**: 15,036 frames (~8 phút 21 giây @ 30fps)
- **Status**: PASSED

## Checklist
- [x] **TTS Voice**: Trúc Ly (VieNeu-TTS v3 Turbo, WAV 48kHz PCM 24-bit, -3dBFS, pause 0.4s).
- [x] **Visual Sync**: 128 images mapped precisely to 64 sentences across 10 chapters. Each sentence alternates between 2 scenes.
- [x] **Captions**: Bilingual kinetic subtitles (Vietnamese + English translation `textEn` on top).
- [x] **Disclaimers & Overlays**: AI disclaimer present (`* Hình ảnh chỉ mang tính chất minh họa`), progress bar, title badge.
- [x] **Copyright**: 0% BGM from `mp3/`, 100% clean voiceover.
- [x] **Remotion Verification**: Test frame 90 rendered successfully without errors.
