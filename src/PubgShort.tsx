import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, PubgScene } from "./components/PubgScene";
import { PubgHUD } from "./components/PubgHUD";
import { PubgCaptions } from "./components/PubgCaptions";
import { PubgProgressBar } from "./components/PubgProgressBar";
import {
  PUBG_AUDIO_PATH,
  PUBG_PHRASES,
  PUBG_SCENES,
} from "./data/pubgSubtitles";

const ALL_IMAGES = [
  "images/pubg-asia-stars-2026/01-football-to-battle-royale-hook.png",
  "images/pubg-asia-stars-2026/02-friendly-tournament-gameplay.png",
  "images/pubg-asia-stars-2026/03-disputed-accusation-replay.png",
  "images/pubg-asia-stars-2026/04-rapid-administrative-action.png",
  "images/pubg-asia-stars-2026/05-tournament-disruption-boycott.png",
  "images/pubg-asia-stars-2026/06-apology-and-confusion.png",
  "images/pubg-asia-stars-2026/07-severe-long-term-ban-metaphor.png",
  "images/pubg-asia-stars-2026/08-unclear-rules-heavy-punishment.png",
  "images/pubg-asia-stars-2026/09-football-game-parallel.png",
  "images/pubg-asia-stars-2026/10-community-uninstall-response.png",
  "images/pubg-asia-stars-2026/11-negative-reaction-wave.png",
  "images/pubg-asia-stars-2026/12-reputation-financial-shock-metaphor.png",
  "images/pubg-asia-stars-2026/13-himass-personal-impact.png",
  "images/pubg-asia-stars-2026/14-tanvuu-personal-impact.png",
  "images/pubg-asia-stars-2026/15-apology-versus-sanction.png",
  "images/pubg-asia-stars-2026/16-leave-map-new-path.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in", // 01: Hook - World Cup 2002 to Erangel
  "drift-down", // 02: Friendly tournament Asia Stars
  "dramatic-zoom", // 03: Accusation of stream sniping
  "drift-right", // 04: Rapid administrative punishment
  "drift-left", // 05: Korean boycott & Day 3 cancelled
  "drift-up", // 06: Krafton clumsy apology
  "dramatic-zoom", // 07: Global permanent ban verdict
  "zoom-in", // 08: Disparity - Unclear rules vs permanent ban
  "drift-down", // 09: Parallel to 2002 referee bias
  "drift-right", // 10: Vietnamese community uninstall & Do Mixi
  "drift-left", // 11: Review bombing - Mostly Negative
  "dramatic-zoom", // 12: Financial blow - $160M USD loss
  "zoom-in", // 13: Himass personal impact - officially unemployed
  "drift-up", // 14: TanVuu tearful uninstall
  "dramatic-zoom", // 15: Double standards - Korean protected vs VN destroyed
  "zoom-out", // 16: Leaving Erangel - moving to better horizons
];

export const PubgShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A1218" }}>
      {/* Voice-Over Audio */}
      <Audio src={staticFile(PUBG_AUDIO_PATH)} />

      {/* 16 Chronological Story Sequences */}
      {PUBG_SCENES.map((scene, idx) => {
        const imagePath = `images/pubg-asia-stars-2026/${scene.image}`;
        const motion = SCENE_MOTIONS[idx] ?? "zoom-in";

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${scene.id}`}
          >
            <PubgScene
              src={imagePath}
              motion={motion}
              badgeText={scene.badge}
            />
          </Sequence>
        );
      })}

      {/* Pre-load All Images for Ultra-smooth Render */}
      <div style={{ display: "none" }} aria-hidden>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* Top Header HUD Scoreboard Pill */}
      <PubgHUD
        title="PUBG ASIA STARS 2026"
        subtitle="KRAFTON SCANDAL"
      />

      {/* Tactical Neon Progress Bar */}
      <PubgProgressBar height={8} />

      {/* Kinetic Esports Subtitles */}
      <PubgCaptions phrases={PUBG_PHRASES} bottom={290} />
    </AbsoluteFill>
  );
};
