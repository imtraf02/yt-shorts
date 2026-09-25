import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, ElonScene } from "./components/ElonScene";
import { ElonHUD } from "./components/ElonHUD";
import { ElonCaptions } from "./components/ElonCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { ELON_PHRASES, ELON_SCENES } from "./data/elonSubtitles";

const ALL_IMAGES = [
  "images/elon-musk-journey/01-elon-musk-scene.png",
  "images/elon-musk-journey/02-elon-musk-scene.png",
  "images/elon-musk-journey/03-elon-musk-scene.png",
  "images/elon-musk-journey/04-elon-musk-scene.png",
  "images/elon-musk-journey/05-elon-musk-scene.png",
  "images/elon-musk-journey/06-elon-musk-scene.png",
  "images/elon-musk-journey/07-elon-musk-scene.png",
  "images/elon-musk-journey/08-elon-musk-scene.png",
  "images/elon-musk-journey/09-elon-musk-scene.png",
  "images/elon-musk-journey/10-elon-musk-scene.png",
  "images/elon-musk-journey/11-elon-musk-scene.png",
  "images/elon-musk-journey/12-elon-musk-scene.png",
  "images/elon-musk-journey/13-elon-musk-scene.png",
  "images/elon-musk-journey/14-elon-musk-scene.png",
  "images/elon-musk-journey/15-elon-musk-scene.png",
  "images/elon-musk-journey/16-elon-musk-scene.png",
  "images/elon-musk-journey/17-elon-musk-scene.png",
  "images/elon-musk-journey/18-elon-musk-scene.png",
  "images/elon-musk-journey/19-elon-musk-scene.png",
  "images/elon-musk-journey/20-elon-musk-scene.png",
  "images/elon-musk-journey/21-elon-musk-scene.png",
  "images/elon-musk-journey/22-elon-musk-scene.png",
  "images/elon-musk-journey/23-elon-musk-scene.png",
  "images/elon-musk-journey/24-elon-musk-scene.png",
  "images/elon-musk-journey/25-elon-musk-scene.png",
  "images/elon-musk-journey/26-elon-musk-scene.png",
  "images/elon-musk-journey/27-elon-musk-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",     // 01: Elon Musk intro with rocket & Tesla
  "zoom-out",    // 02: Cliff edge / near total bankruptcy
  "drift-right", // 03: 1971 Pretoria South Africa roots
  "drift-down",  // 04: Bookworm boy bullied in school
  "drift-left",  // 05: 12yo self-taught code & Blastar game
  "drift-up",    // 06: Canada & Penn University travel
  "drift-right", // 07: 1995 Zip2 with brother Kimbal
  "zoom-in",     // 08: Compaq acquisition for $300M
  "drift-left",  // 09: Reinvesting in X.com online bank
  "zoom-out",    // 10: PayPal merger & eBay $1.5B sale
  "zoom-in",     // 11: 2002 SpaceX reusable rocket bet
  "drift-right", // 12: Aerospace industry skepticism
  "zoom-out",    // 13: Tesla investment & becoming CEO
  "drift-down",  // 14: 2008 dual company crisis storm
  "zoom-in",     // 15: Falcon 1 triple failure explosions
  "drift-left",  // 16: Tesla out of cash near payday
  "zoom-out",    // 17: Pouring every last dollar all-in
  "zoom-in",     // 18: 4th Falcon 1 launch historic success
  "drift-right", // 19: NASA $1.6B lifeline & turnaround
  "drift-up",    // 20: Step-by-step achieving the impossible
  "zoom-in",     // 21: 2015 Falcon 9 first stage rocket landing
  "drift-down",  // 22: 2018 Falcon Heavy launches Tesla Roadster
  "zoom-out",    // 23: Tesla becomes world's top EV maker
  "drift-right", // 24: 2022 Twitter acquisition $44B to X
  "drift-left",  // 25: Fierce public debate & controversy
  "zoom-out",    // 26: Constant media spotlight & scrutiny
  "zoom-in",     // 27: From bullied kid to legendary disruptor
];

const BADGE_COLORS = [
  "#F97316", // 01: SpaceX Orange
  "#EF4444", // 02: Crisis Red
  "#EAB308", // 03: South Africa Warm Amber
  "#818CF8", // 04: Childhood Purple
  "#10B981", // 05: Arcade Green
  "#38BDF8", // 06: Sky Cyan America
  "#06B6D4", // 07: Tech Cyan Zip2
  "#F59E0B", // 08: Gold Compaq $300M
  "#10B981", // 09: Green X.com
  "#3B82F6", // 10: PayPal Blue
  "#F97316", // 11: SpaceX Flame
  "#EF4444", // 12: Skepticism Red
  "#E82127", // 13: Tesla Red
  "#64748B", // 14: 2008 Storm Slate
  "#DC2626", // 15: Fire Crimson
  "#EF4444", // 16: Empty Wallet Red
  "#F59E0B", // 17: Gold Coin All-In
  "#10B981", // 18: Success Green
  "#38BDF8", // 19: NASA Cyan
  "#8B5CF6", // 20: Violet Portal
  "#10B981", // 21: Landing Emerald
  "#E82127", // 22: Roadster Mars Red
  "#06B6D4", // 23: Gigafactory Cyan
  "#F3F4F6", // 24: White / Silver X
  "#F59E0B", // 25: Controversy Amber
  "#818CF8", // 26: Media Spotlight Indigo
  "#F97316", // 27: SpaceX Orange Legend
];

export const ElonShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#060B14" }}>
      {/* Voiceover Audio Track (140.520s, 4216 frames @ 30 FPS) */}
      <Audio src={staticFile("audio/elon-musk.wav")} volume={1} />

      {/* Preload all 27 images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* 27 Perfectly Aligned Sequences (1 sentence = 1 image) */}
      {ELON_SCENES.map((scene, idx) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          premountFor={60}
        >
          <ElonScene
            src={`images/elon-musk-journey/${scene.image}`}
            motion={SCENE_MOTIONS[idx]}
            badgeText={scene.badge}
            badgeColor={BADGE_COLORS[idx]}
          >
            <ElonHUD tag={scene.hud} accentColor={BADGE_COLORS[idx]} />
          </ElonScene>
        </Sequence>
      ))}

      {/* Kinetic Subtitles (Centered at bottom 290px) */}
      <ElonCaptions phrases={ELON_PHRASES} bottom={290} />

      {/* Subtle Progress Bar */}
      <ProgressBar color="#F97316" height={5} />
    </AbsoluteFill>
  );
};
