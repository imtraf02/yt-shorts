import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, LinuxScene } from "./components/LinuxScene";
import { LinuxHUD } from "./components/LinuxHUD";
import { LinuxCaptions } from "./components/LinuxCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { LINUX_PHRASES, LINUX_SCENES } from "./data/linuxSubtitles";

const ALL_IMAGES = [
  "images/linux-linus-torvalds/01-linux-scene.png",
  "images/linux-linus-torvalds/02-linux-scene.png",
  "images/linux-linus-torvalds/03-linux-scene.png",
  "images/linux-linus-torvalds/04-linux-scene.png",
  "images/linux-linus-torvalds/05-linux-scene.png",
  "images/linux-linus-torvalds/06-linux-scene.png",
  "images/linux-linus-torvalds/07-linux-scene.png",
  "images/linux-linus-torvalds/08-linux-scene.png",
  "images/linux-linus-torvalds/09-linux-scene.png",
  "images/linux-linus-torvalds/10-linux-scene.png",
  "images/linux-linus-torvalds/11-linux-scene.png",
  "images/linux-linus-torvalds/12-linux-scene.png",
  "images/linux-linus-torvalds/13-linux-scene.png",
  "images/linux-linus-torvalds/14-linux-scene.png",
  "images/linux-linus-torvalds/15-linux-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",     // 01: Linus Torvalds intro / servers & Android
  "zoom-out",    // 02: Helsinki 1969 & grandfather's Commodore VIC-20
  "drift-right", // 03: 1991 Intel 386 & Minix dissatisfaction
  "drift-down",  // 04: August 25 newsgroup announcement
  "drift-left",  // 05: Ari Lemmke renames Freax to Linux
  "zoom-out",    // 06: Global developer community contribution
  "drift-up",    // 07: Tanenbaum critique: microkernel vs monolithic
  "zoom-in",     // 08: Linux & Tux triumph in server world
  "drift-right", // 09: 2005 version control crisis
  "zoom-in",     // 10: BitKeeper license revoked, 10 days coding
  "drift-down",  // 11: Git revolutionizes software version control
  "drift-left",  // 12: Blunt management style & flame emails
  "zoom-out",    // 13: 2018 self-reflection & stepping back
  "drift-right", // 14: Choosing code craftsmanship over billionaire status
  "zoom-in",     // 15: Student hobby that became modern digital backbone
];

const BADGE_COLORS = [
  "#10B981", // 01: Terminal Emerald
  "#F59E0B", // 02: Amber Retro VIC-20
  "#06B6D4", // 03: Electric Cyan Intel 386
  "#10B981", // 04: Emerald Newsgroup Announcement
  "#FACC15", // 05: Tux Yellow Linux Name
  "#38BDF8", // 06: Sky Cyan Global Contributors
  "#F97316", // 07: Orange Flame Tanenbaum
  "#F59E0B", // 08: Tux Gold Server Victory
  "#06B6D4", // 09: Cyan Tech Evolution 2005
  "#EF4444", // 10: Red License Alert / 10 Days
  "#10B981", // 11: Emerald Git Revolution
  "#F59E0B", // 12: Warning Amber Direct Style
  "#818CF8", // 13: Indigo Introspection 2018
  "#10B981", // 14: Emerald Open Source Values
  "#06B6D4", // 15: Cyan Modern Digital Backbone
];

export const LinuxShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#080C14" }}>
      {/* Voiceover Audio Track (117.600s, 3528 frames @ 30 FPS) */}
      <Audio src={staticFile("audio/linus-torvalds.wav")} volume={1} />

      {/* Preload all images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* 15 Perfectly Aligned Sequences */}
      {LINUX_SCENES.map((scene, idx) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          premountFor={60}
        >
          <LinuxScene
            src={`images/linux-linus-torvalds/${scene.image}`}
            motion={SCENE_MOTIONS[idx]}
            badgeText={scene.badge}
            badgeColor={BADGE_COLORS[idx]}
          >
            <LinuxHUD tag={scene.hud} accentColor={BADGE_COLORS[idx]} />
          </LinuxScene>
        </Sequence>
      ))}

      {/* Kinetic Subtitles (Centered at bottom 290px) */}
      <LinuxCaptions phrases={LINUX_PHRASES} bottom={290} />

      {/* Subtle Progress Bar */}
      <ProgressBar color="#10B981" height={5} />
    </AbsoluteFill>
  );
};
