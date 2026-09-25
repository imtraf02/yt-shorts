import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, VladScene } from "./components/VladScene";
import { VladHUD } from "./components/VladHUD";
import { VladCaptions } from "./components/VladCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { VLAD_PHRASES, VLAD_SCENES } from "./data/vladSubtitles";

const ALL_IMAGES = [
  "images/vlad-dracula/01-vlad-dracula-scene.png",
  "images/vlad-dracula/02-vlad-dracula-scene.png",
  "images/vlad-dracula/03-vlad-dracula-scene.png",
  "images/vlad-dracula/04-vlad-dracula-scene.png",
  "images/vlad-dracula/05-vlad-dracula-scene.png",
  "images/vlad-dracula/06-vlad-dracula-scene.png",
  "images/vlad-dracula/07-vlad-dracula-scene.png",
  "images/vlad-dracula/08-vlad-dracula-scene.png",
  "images/vlad-dracula/09-vlad-dracula-scene.png",
  "images/vlad-dracula/10-vlad-dracula-scene.png",
  "images/vlad-dracula/11-vlad-dracula-scene.png",
  "images/vlad-dracula/12-vlad-dracula-scene.png",
  "images/vlad-dracula/13-vlad-dracula-scene.png",
  "images/vlad-dracula/14-vlad-dracula-scene.png",
  "images/vlad-dracula/15-vlad-dracula-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",    // 01: Heroic & menacing prince at dusk
  "zoom-out",   // 02: Order of the Dragon
  "drift-right",// 03: Ottoman royal court hostage
  "drift-down", // 04: Grief and empty chairs
  "drift-up",   // 05: Coronation in gothic hall
  "zoom-in",    // 06: Golden cup in square
  "zoom-out",   // 07: Field of wooden stakes
  "drift-left", // 08: Sultan Mehmed II army
  "zoom-in",    // 09: Night attack charge
  "drift-up",   // 10: Scorched earth burning fields
  "zoom-out",   // 11: Forest of stakes retreat
  "drift-down", // 12: Mysterious death on battlefield
  "drift-right",// 13: Unmarked crypt tomb
  "zoom-in",    // 14: Bram Stoker novel creation
  "zoom-out",   // 15: Prince vs Vampire split face
];

const BADGE_COLORS = [
  "#DC2626", // 01: Blood Crimson
  "#F59E0B", // 02: Dragon Gold
  "#38BDF8", // 03: Cyan
  "#DC2626", // 04: Crimson
  "#F59E0B", // 05: Gold
  "#10B981", // 06: Emerald
  "#DC2626", // 07: Crimson
  "#F97316", // 08: Orange
  "#F59E0B", // 09: Gold
  "#EF4444", // 10: Red
  "#DC2626", // 11: Crimson
  "#94A3B8", // 12: Silver Slate
  "#A855F7", // 13: Purple
  "#38BDF8", // 14: Cyan
  "#DC2626", // 15: Crimson
];

export const VladDraculaShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0B10" }}>
      {/* Voiceover Audio Track (135.443s, 4063 frames @ 30 FPS) */}
      <Audio src={staticFile("audio/vlad-dracula.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* 15 Perfectly Aligned Sequences */}
      {VLAD_SCENES.map((scene, idx) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          premountFor={60}
        >
          <VladScene
            src={`images/vlad-dracula/${scene.image}`}
            motion={SCENE_MOTIONS[idx]}
            badgeText={scene.badge}
            badgeColor={BADGE_COLORS[idx]}
          >
            <VladHUD tag={scene.hud} accentColor={BADGE_COLORS[idx]} />
          </VladScene>
        </Sequence>
      ))}

      {/* Kinetic Subtitles (Centered at bottom 290px) */}
      <VladCaptions phrases={VLAD_PHRASES} bottom={290} />

      {/* Subtle Progress Bar */}
      <ProgressBar color="#DC2626" height={5} />
    </AbsoluteFill>
  );
};
