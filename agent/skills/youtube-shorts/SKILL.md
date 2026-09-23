---
name: youtube-shorts
description: Best practices, layout rules, hooks, animation patterns, safe zones, and rendering workflows for creating YouTube Shorts and vertical videos (9:16) with Remotion.
version: 1.0.0
---

# YouTube Shorts with Remotion

Guide and best practices for creating engaging, high-retention YouTube Shorts, TikTok, and Instagram Reels videos using Remotion.

## 1. Video Specifications
- **Aspect Ratio**: 9:16 (Vertical)
- **Resolution**: 1080 x 1920 px
- **Frame Rate**: 30 fps (standard) or 60 fps (ultra-smooth motion)
- **Duration**: Ideal 15 - 45 seconds (max 60 seconds for YouTube Shorts)

## 2. Safe Zones for Mobile UI
YouTube Shorts mobile overlay places UI controls on top of the video:
- **Top Header**: ~160px (Search bar, camera icon, sound title)
- **Right Action Rail**: ~140px (Like, Dislike, Comments count, Share, Remix, Sound disc)
- **Bottom Info Area**: ~400px (Channel avatar, handle, Subscribe button, video title/description)

### Recommended Safe Bounds:
```tsx
// Keep crucial text, titles, subtitles, and face focus inside:
top: 200px - 220px
bottom: 420px
left: 80px
right: 170px
```
Use the helper component `<ShortsSafeArea showGuideLines />` during preview to visually verify layouts.

## 3. High-Retention Animation Patterns

### Retention Hooks (First 3 Seconds)
- The first 1-3 seconds decide if the viewer swipes away.
- Use dynamic spring-based entrances for the hook title:
```tsx
const titleEntrance = spring({
  frame,
  fps,
  config: { damping: 12, stiffness: 100 },
});
```

### Animated Progress Bar
- Keep viewers watching until the end by visually communicating video progress:
```tsx
<ProgressBar color="#f43f5e" height={10} top={0} />
```

### Word-by-Word Highlighted Subtitles
- Use `@remotion/captions` with `createTikTokStyleCaptions`:
```tsx
const { pages } = createTikTokStyleCaptions({
  combineTokensWithinMilliseconds: 1200,
  captions: subtitles,
});
```
- Highlight active word with bright accent colors (`#39E508`, `#FFE600`, or `#FF3366`).
- Apply stroke (`WebkitTextStroke: "16px black"`) and shadow for legibility over any background.

### Fast Pacing and Transitions
- Never leave visuals static for more than 2-3 seconds.
- Use continuous subtle zoom / Ken Burns effect:
```tsx
const scale = interpolate(frame, [0, durationInFrames], [1, 1.15], {
  extrapolateRight: "clamp",
});
```

## 4. Useful Project Commands

### Preview in Remotion Studio
```bash
npm run dev
# Or without auto-opening browser:
npx remotion studio --no-open
```

### Quick Frame Check (Render Still Image)
```bash
npx remotion still YouTubeShort out/preview.png --frame=60
# With safe zone overlay:
npx remotion still YouTubeShort out/preview.png --frame=60 --props='{"showSafeArea": true}'
```

### Render Video (MP4)
```bash
# Render YouTubeShort composition
npm run render:short

# Or custom render command
npx remotion render YouTubeShort out/my-short.mp4 --concurrency=4
```

### Auto-Generate Subtitles (Whisper C++ integration)
```bash
npm run create-subtitles public/sample-video.mp4
```
### Reusable Like & Subscribe CTA Asset
Use the pre-built, interactive `<SubscribeAnimation />` component at the outro of any video:
```tsx
import { SubscribeAnimation } from "../components/SubscribeAnimation";

// Inside any Sequence (e.g., last 3-4 seconds):
<SubscribeAnimation
  channelName="Tên Kênh Của Bạn"
  channelHandle="@tenkenh"
  subscribersCount="100K người đăng ký"
  theme="dark" // "dark" | "light" | "transparent"
  scale={1}
  accentColor="#ff0000"
/>
```
Render standalone:
```bash
# Render as MP4
npx remotion render SubscribeOverlay out/subscribe-cta.mp4

# Render with Transparent Alpha Channel (ProRes 4444) for Premiere, CapCut, DaVinci:
npx remotion render SubscribeOverlay out/subscribe-cta.mov --codec=prores --prores-profile=4444 --props='{"theme":"transparent"}'
```
