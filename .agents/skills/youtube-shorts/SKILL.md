---
name: youtube-shorts
description: Best practices, layout rules, hooks, animation patterns, safe zones, and rendering workflows for creating YouTube Shorts and vertical videos (9:16) with Remotion.
version: 1.1.0
---

# YouTube Shorts with Remotion (Project Guidelines)

Comprehensive rules and workflows for generating vertical YouTube Shorts (9:16) in this workspace.

---

## 1. Project-Specific Layout Rules (MANDATORY)

1. **NO Like / Subscribe Overlays**:
   - Do NOT render `<SubscribeOverlay />` or any CTA buttons/stamps.
2. **Top Header**:
   - Use ONLY an auto-width badge pill (`width: fit-content`), e.g., `[ ● TÊN CHỦ ĐỀ ]`.
   - Do NOT use full-width 1000px banners or `FILE #...` / `CHỦ ĐỀ: ...` text spanning across the top.
   - Position: `top: 96, left: 36`.
3. **Top Progress Bar**:
   - `<ProgressBar color="..." height={8} />` anchored at `top: 0`.
4. **Contextual Scene Badge**:
   - Elevated position: `bottom: 530px` (keeps it strictly above subtitles).
   - Font size: `24px`, uppercase, bold (`fontWeight: 800`), glowing neon dot indicator on the left.
5. **Kinetic Subtitles**:
   - Position: `bottom: 290px`, centered, max width `980px`.
   - Active word pill: Glowing gradient pill (`boxShadow: 0 0 25px ..., 0 0 10px ...`, dark text `#040816` or `#140A02`).
   - Keyword highlights: Contrasting yellow (`#FACC15`) or cyan (`#38BDF8`).
   - Regular words: White with thick black stroke (`WebkitTextStroke: "10px #000000"`, `paintOrder: "stroke fill"`).
6. **Housekeeping (Cleanup)**:
   - When render finishes, always clean up all preview/test images in `out/*.png`:
     `Remove-Item -Path "out\*.png" -Force`.

---

## 2. Video Technical Specifications
- **Aspect Ratio**: 9:16 (Vertical)
- **Resolution**: 1080 x 1920 px
- **Frame Rate**: 30 fps
- **Duration**: Driven by audio length + ~20-30 frames tail hold.

---

## 3. Step-by-Step Production Pipeline

1. **Audio & Duration**:
   - Copy TTS audio to `public/audio/<name>.wav`.
   - Read byte rate and data size using node to get exact seconds and 30fps frame count.
2. **16kHz Conversion**:
   - `npx.cmd remotion ffmpeg -y -i public/audio/<name>.wav -ar 16000 -ac 1 -c:a pcm_s16le temp_16k_<name>.wav`.
3. **Whisper Transcription**:
   - Run whisper.cpp (`model: "base"`, `tokenLevelTimestamps: true`, `language: "vi"`, `splitOnWord: true`).
4. **Word-by-Word Alignment**:
   - Compare whisper tokens 1-to-1 with script words (`align_<name>.py`). Merge split syllables if needed.
   - Partition into 12 scenes matching the 12 images in `public/images/<topic>/`.
   - Generate `src/data/<name>Subtitles.ts`.
5. **Components**:
   - `<Name>HUD.tsx`: Auto-width top badge pill.
   - `<Name>Scene.tsx`: Ken Burns camera motion (`zoom-in`, `zoom-out`, `drift-*`), bottom vignette, elevated badge at `bottom: 530px`, font size `24px`.
   - `<Name>Captions.tsx`: Kinetic subtitles at `bottom: 290px`.
6. **Composition & Register**:
   - Create `src/<Name>Short.tsx` with 12 sequences matching timestamps.
   - Register in `src/Root.tsx`.
   - Add `"render:<name>"` in `package.json`.
7. **Preview Check**:
   - Render 1-2 frames (e.g. frame 60, frame 900) to verify safe bounds and typography:
     `npx.cmd remotion still <Name>Short out/preview_f60.png --frame=60`.
8. **Render MP4**:
   - `npx.cmd remotion render <Name>Short out/<name>.mp4 --concurrency=4`.
9. **Clean Up**:
   - `Remove-Item -Path "out\*.png" -Force`.

---

## 4. Master Docs Reference
Detailed documentation is stored at:
- [`docs/SHORTS_PRODUCTION_GUIDE.md`](file:///C:/Users/studi/Documents/Codex/2026-09-23/cl/yt-shorts/docs/SHORTS_PRODUCTION_GUIDE.md)
