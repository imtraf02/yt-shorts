import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, FigmaScene } from "./components/FigmaScene";
import { FigmaHUD } from "./components/FigmaHUD";
import { FigmaCaptions } from "./components/FigmaCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { FIGMA_PHRASES, FIGMA_SCENES } from "./data/figmaSubtitles";

const ALL_IMAGES = [
  "images/figma-dylan-field/01-figma-scene.png",
  "images/figma-dylan-field/02-figma-scene.png",
  "images/figma-dylan-field/03-figma-scene.png",
  "images/figma-dylan-field/04-figma-scene.png",
  "images/figma-dylan-field/05-figma-scene.png",
  "images/figma-dylan-field/06-figma-scene.png",
  "images/figma-dylan-field/07-figma-scene.png",
  "images/figma-dylan-field/08-figma-scene.png",
  "images/figma-dylan-field/09-figma-scene.png",
  "images/figma-dylan-field/10-figma-scene.png",
  "images/figma-dylan-field/11-figma-scene.png",
  "images/figma-dylan-field/12-figma-scene.png",
  "images/figma-dylan-field/13-figma-scene.png",
  "images/figma-dylan-field/14-figma-scene.png",
  "images/figma-dylan-field/15-figma-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",    // 01: Founder Dylan Field intro
  "zoom-out",   // 02: Bay Area / Silicon Valley roots
  "drift-right",// 03: Brown University & WebGL collaboration
  "drift-down", // 04: Thiel Fellowship dropout decision
  "drift-up",   // 05: Towering Adobe PC monopoly
  "zoom-out",   // 06: Industry skepticism / rejection
  "drift-left", // 07: 4 years building foundation
  "zoom-in",    // 08: C++ compiled to WebGL browser speed
  "zoom-out",   // 09: 2016 launch & multiplayer editing
  "drift-right",// 10: Single URL vs file chaos
  "zoom-in",    // 11: 2022 Adobe $20B acquisition offer
  "drift-down", // 12: Regulators block deal
  "zoom-out",   // 13: $1B break fee & value proven
  "zoom-in",    // 14: July 2025 IPO +250% & billionaire
  "zoom-out",   // 15: Visionary dropout changed design
];

const BADGE_COLORS = [
  "#1ABCFE", // 01: Figma Blue
  "#FF7262", // 02: Figma Coral
  "#A259FF", // 03: Figma Purple
  "#F24E1E", // 04: Figma Red
  "#64748B", // 05: Slate PC
  "#EF4444", // 06: Red Rejection
  "#3B82F6", // 07: Blue Night
  "#0ACF83", // 08: Figma Green
  "#A259FF", // 09: Figma Purple
  "#1ABCFE", // 10: Figma Blue Link
  "#F24E1E", // 11: Adobe Red
  "#EAB308", // 12: Regulatory Amber
  "#10B981", // 13: Green $1B
  "#0ACF83", // 14: Figma Green IPO
  "#A259FF", // 15: Figma Purple Legacy
];

export const FigmaShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0D1117" }}>
      {/* Voiceover Audio Track (113.097s, 3393 frames @ 30 FPS) */}
      <Audio src={staticFile("audio/figma-dylan-field.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* 15 Perfectly Aligned Sequences */}
      {FIGMA_SCENES.map((scene, idx) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          premountFor={60}
        >
          <FigmaScene
            src={`images/figma-dylan-field/${scene.image}`}
            motion={SCENE_MOTIONS[idx]}
            badgeText={scene.badge}
            badgeColor={BADGE_COLORS[idx]}
          >
            <FigmaHUD tag={scene.hud} accentColor={BADGE_COLORS[idx]} />
          </FigmaScene>
        </Sequence>
      ))}

      {/* Kinetic Subtitles (Centered at bottom 290px) */}
      <FigmaCaptions phrases={FIGMA_PHRASES} bottom={290} />

      {/* Subtle Progress Bar */}
      <ProgressBar color="#A259FF" height={5} />
    </AbsoluteFill>
  );
};
