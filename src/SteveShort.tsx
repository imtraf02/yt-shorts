import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, SteveKeynoteScene } from "./components/SteveKeynoteScene";
import { SteveDynamicIsland } from "./components/SteveDynamicIsland";
import { SteveKeynoteCaptions } from "./components/SteveKeynoteCaptions";
import { SteveProgressBar } from "./components/SteveProgressBar";
import { STEVE_PHRASES, STEVE_SCENES } from "./data/steveSubtitles";

const ALL_IMAGES = [
  "images/steve-jobs-recognizable/01-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/02-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/03-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/04-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/05-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/06-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/07-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/08-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/09-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/10-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/11-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/12-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/13-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/14-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/15-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/16-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/17-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/18-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/19-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/20-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/21-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/22-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/23-steve-jobs-scene.png",
  "images/steve-jobs-recognizable/24-steve-jobs-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",     // 01: Keynote stage with all Apple iconic products
  "zoom-out",    // 02: Fired carrying box & 12 years return
  "drift-right", // 03: 1955 San Francisco adoption
  "drift-down",  // 04: Young Steve soldering in garage
  "drift-left",  // 05: Reed College calligraphy class
  "zoom-in",     // 06: Macintosh elegant font calligraphy
  "drift-right", // 07: Jobs & Wozniak Apple I in garage
  "zoom-out",    // 08: Apple II success & 1980 IPO millionaire at 25
  "zoom-in",     // 09: 1984 Macintosh unveiling with GUI
  "drift-left",  // 10: John Sculley Pepsi soda challenge
  "drift-down",  // 11: Boardroom coup ousted in 1985
  "zoom-out",    // 12: NeXT computer black cube
  "drift-right", // 13: Pixar Lucasfilm graphics division
  "zoom-in",     // 14: Toy Story 1995 premiere & IPO
  "zoom-out",    // 15: Apple near bankruptcy & Jobs return
  "drift-left",  // 16: 2x2 product grid & Microsoft deal
  "zoom-in",     // 17: Bondi Blue & colorful iMac 1998
  "drift-right", // 18: iPod 1000 songs in pocket & iTunes
  "zoom-in",     // 19: iPhone 3-in-1 revolutionary keynote
  "zoom-out",    // 20: iPad tablet armchair presentation
  "drift-down",  // 21: Reality distortion field & perfectionism
  "zoom-in",     // 22: Stanford 2005 speech love & mortality
  "drift-up",    // 23: Apple Store candlelight memorial Oct 5 2011
  "zoom-in",     // 24: Garage dropout to visionary changing the world
];

const BADGE_COLORS = [
  "#0071E3", // 01: Apple Classic Blue
  "#FF9500", // 02: Rebirth Orange
  "#34C759", // 03: San Francisco Green
  "#5856D6", // 04: Silicon Valley Indigo
  "#FF2D55", // 05: Reed Rose
  "#0071E3", // 06: Macintosh Blue
  "#FF9500", // 07: Garage Amber
  "#FFD60A", // 08: Apple II Gold
  "#64D2FF", // 09: 1984 GUI Cyan
  "#FF3B30", // 10: Pepsi Red
  "#8E8E93", // 11: Coup Slate
  "#E5E5EA", // 12: NeXT Titanium
  "#AF52DE", // 13: Pixar Violet
  "#FF9500", // 14: Toy Story Orange
  "#0071E3", // 15: Apple Return Blue
  "#34C759", // 16: Microsoft $150M Emerald
  "#00C7BE", // 17: Bondi Teal iMac
  "#FF9500", // 18: iPod Amber
  "#64D2FF", // 19: iPhone Cyan
  "#5856D6", // 20: iPad Indigo
  "#FF3B30", // 21: Reality Distortion Crimson
  "#FFD60A", // 22: Stanford Gold
  "#E5E5EA", // 23: Memorial Silver
  "#0071E3", // 24: Legacy Blue
];

const ERAS = [
  "1955 - 2011", // 01
  "1985 - 1997", // 02
  "1955",        // 03
  "THIẾU THỜI",  // 04
  "REED 1972",   // 05
  "TYPOGRAPHY",  // 06
  "APPLE 1976",  // 07
  "IPO 1980",    // 08
  "MAC 1984",    // 09
  "PEPSI 1983",  // 10
  "COUP 1985",   // 11
  "NEXT 1985",   // 12
  "PIXAR 1986",  // 13
  "PIXAR 1995",  // 14
  "RETURN 1997", // 15
  "DEAL 1997",   // 16
  "IMAC 1998",   // 17
  "IPOD 2001",   // 18
  "IPHONE 2007", // 19
  "IPAD 2010",   // 20
  "PHILOSOPHY",  // 21
  "STANFORD 2005",// 22
  "2011",        // 23
  "LEGACY",      // 24
];

export const SteveShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#06080C" }}>
      {/* Voiceover Audio Track (166.08s, 5010 frames @ 30 FPS) */}
      <Audio src={staticFile("audio/steve-jobs.wav")} volume={1} />

      {/* Preload all 24 images */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* 24 Aligned Apple Keynote Sequences */}
      {STEVE_SCENES.map((scene, idx) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          premountFor={60}
        >
          <SteveKeynoteScene
            src={`images/steve-jobs-recognizable/${scene.image}`}
            motion={SCENE_MOTIONS[idx]}
            badgeText={scene.badge}
            badgeColor={BADGE_COLORS[idx]}
          >
            {/* Top Dynamic Island Glass Capsule */}
            <SteveDynamicIsland
              tag={scene.hud}
              era={ERAS[idx]}
              accentColor={BADGE_COLORS[idx]}
            />
          </SteveKeynoteScene>
        </Sequence>
      ))}

      {/* Apple Studio Kinetic Typography Subtitles (Centered at bottom 280px) */}
      <SteveKeynoteCaptions phrases={STEVE_PHRASES} bottom={280} />

      {/* iOS Media Scrubber Progress Bar */}
      <SteveProgressBar height={4} />
    </AbsoluteFill>
  );
};
