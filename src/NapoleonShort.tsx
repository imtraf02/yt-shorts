import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, NapoleonScene } from "./components/NapoleonScene";
import { NapoleonHUD } from "./components/NapoleonHUD";
import { NapoleonCaptions } from "./components/NapoleonCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { NAPOLEON_PHRASES, NAPOLEON_SCENES } from "./data/napoleonSubtitles";

const ALL_IMAGES = [
  "images/napoleon-media-myth/01-napoleon-scene.png",
  "images/napoleon-media-myth/02-napoleon-scene.png",
  "images/napoleon-media-myth/03-napoleon-scene.png",
  "images/napoleon-media-myth/04-napoleon-scene.png",
  "images/napoleon-media-myth/05-napoleon-scene.png",
  "images/napoleon-media-myth/06-napoleon-scene.png",
  "images/napoleon-media-myth/07-napoleon-scene.png",
  "images/napoleon-media-myth/08-napoleon-scene.png",
  "images/napoleon-media-myth/09-napoleon-scene.png",
  "images/napoleon-media-myth/10-napoleon-scene.png",
  "images/napoleon-media-myth/11-napoleon-scene.png",
  "images/napoleon-media-myth/12-napoleon-scene.png",
  "images/napoleon-media-myth/13-napoleon-scene.png",
  "images/napoleon-media-myth/14-napoleon-scene.png",
  "images/napoleon-media-myth/15-napoleon-scene.png",
  "images/napoleon-media-myth/16-napoleon-scene.png",
];

// Curated camera motions for maximum cinematic pacing
const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",    // 01: Heroic Emperor on cliff
  "drift-up",   // 02: Civil code quill writing
  "zoom-out",   // 03: Mocking towering crowd
  "drift-down", // 04: Measuring tape height
  "drift-right",// 05: French vs British royal comparison
  "zoom-in",    // 06: Height chart lineup
  "drift-up",   // 07: Giant bearskin guards towering
  "zoom-in",    // 08: Optical perspective grid
  "zoom-out",   // 09: James Gillray cartoonist in London
  "zoom-in",    // 10: Little Boney tantrum
  "drift-left", // 11: Flying newspapers over Europe
  "drift-up",   // 12: Split: battle victory vs press defeat
  "drift-right",// 13: Quill pen and broken sword
  "zoom-out",   // 14: Tame rabbit cages in field
  "zoom-in",    // 15: Terrified Napoleon chased by rabbits
  "zoom-out",   // 16: Dual split face finale
];

const BADGE_COLORS = [
  "#F59E0B", // 01: Gold
  "#38BDF8", // 02: Cyan
  "#F97316", // 03: Orange
  "#EF4444", // 04: Red
  "#38BDF8", // 05: Cyan
  "#10B981", // 06: Emerald
  "#F59E0B", // 07: Gold
  "#A855F7", // 08: Purple
  "#DC2626", // 09: Crimson
  "#F59E0B", // 10: Gold
  "#8B5CF6", // 11: Violet
  "#EF4444", // 12: Red
  "#38BDF8", // 13: Cyan
  "#10B981", // 14: Emerald
  "#F97316", // 15: Orange
  "#F59E0B", // 16: Gold
];

export const NapoleonShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0D14" }}>
      {/* Voiceover Audio Track (93.360s, 2801 frames @ 30 FPS) */}
      <Audio src={staticFile("audio/napoleon-secrets.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* 16 Perfectly Aligned Sequences */}
      {NAPOLEON_SCENES.map((scene, idx) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          premountFor={60}
        >
          <NapoleonScene
            src={`images/napoleon-media-myth/${scene.image}`}
            motion={SCENE_MOTIONS[idx]}
            badgeText={scene.badge}
            badgeColor={BADGE_COLORS[idx]}
          >
            <NapoleonHUD tag={scene.hud} accentColor={BADGE_COLORS[idx]} />
          </NapoleonScene>
        </Sequence>
      ))}

      {/* Kinetic Subtitles (Centered at bottom 290px) */}
      <NapoleonCaptions phrases={NAPOLEON_PHRASES} bottom={290} />

      {/* Subtle Progress Bar */}
      <ProgressBar color="#F59E0B" height={5} />
    </AbsoluteFill>
  );
};
