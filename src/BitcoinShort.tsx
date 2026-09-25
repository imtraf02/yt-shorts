import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, BitcoinScene } from "./components/BitcoinScene";
import { BitcoinHUD } from "./components/BitcoinHUD";
import { BitcoinCaptions } from "./components/BitcoinCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { BITCOIN_PHRASES, BITCOIN_SCENES } from "./data/bitcoinSubtitles";

const ALL_IMAGES = [
  "images/bitcoin-origin/01-bitcoin-scene.png",
  "images/bitcoin-origin/02-bitcoin-scene.png",
  "images/bitcoin-origin/03-bitcoin-scene.png",
  "images/bitcoin-origin/04-bitcoin-scene.png",
  "images/bitcoin-origin/05-bitcoin-scene.png",
  "images/bitcoin-origin/06-bitcoin-scene.png",
  "images/bitcoin-origin/07-bitcoin-scene.png",
  "images/bitcoin-origin/08-bitcoin-scene.png",
  "images/bitcoin-origin/09-bitcoin-scene.png",
  "images/bitcoin-origin/10-bitcoin-scene.png",
  "images/bitcoin-origin/11-bitcoin-scene.png",
  "images/bitcoin-origin/12-bitcoin-scene.png",
  "images/bitcoin-origin/13-bitcoin-scene.png",
  "images/bitcoin-origin/14-bitcoin-scene.png",
  "images/bitcoin-origin/15-bitcoin-scene.png",
  "images/bitcoin-origin/16-bitcoin-scene.png",
  "images/bitcoin-origin/17-bitcoin-scene.png",
  "images/bitcoin-origin/18-bitcoin-scene.png",
  "images/bitcoin-origin/19-bitcoin-scene.png",
  "images/bitcoin-origin/20-bitcoin-scene.png",
  "images/bitcoin-origin/21-bitcoin-scene.png",
  "images/bitcoin-origin/22-bitcoin-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",     // 01: Golden Bitcoin floating over skyline
  "zoom-out",    // 02: Satoshi mystery hooded silhouette
  "drift-down",  // 03: 2008 financial crisis bank collapses
  "drift-right", // 04: Satoshi sends 9-page whitepaper
  "drift-up",    // 05: Decentralized blockchain network
  "zoom-in",     // 06: Genesis block mined Jan 3 2009
  "drift-left",  // 07: The Times headline bank bailout
  "drift-right", // 08: First transaction sent to Hal Finney
  "zoom-in",     // 09: Laszlo Hanyecz 10k BTC for 2 pizzas
  "zoom-out",    // 10: Two pizzas worth hundreds of millions
  "drift-up",    // 11: Bitcoin Pizza Day celebration
  "zoom-out",    // 12: Satoshi vanishes into digital dust
  "zoom-in",     // 13: Untouched 1 million Bitcoin vault
  "drift-left",  // 14: Suspects board and mystery identities
  "drift-right", // 15: 21 million supply cap & halving cycles
  "zoom-in",     // 16: Bull run surging to nearly $20,000
  "drift-down",  // 17: Mt. Gox 2014 hack and collapse
  "zoom-in",     // 18: Rising from grave / declared dead 400+ times
  "drift-up",    // 19: El Salvador legal tender in 2021 ($69k)
  "zoom-in",     // 20: Spot Bitcoin ETF approved on Wall St 2024
  "zoom-out",    // 21: Digital gold vs speculative bubbles
  "drift-right", // 22: Evolution of money & global monetary future
];

const BADGE_COLORS = [
  "#F59E0B", // 01: Bitcoin Gold
  "#818CF8", // 02: Mystery Violet
  "#EF4444", // 03: Crisis Red
  "#06B6D4", // 04: Whitepaper Cyan
  "#3B82F6", // 05: Blockchain Blue
  "#10B981", // 06: Genesis Emerald
  "#F97316", // 07: Times Headline Amber
  "#38BDF8", // 08: Hal Finney Cyan
  "#F59E0B", // 09: Pizza Orange-Gold
  "#10B981", // 10: Billion Dollar Meal Emerald
  "#EAB308", // 11: Pizza Day Yellow
  "#94A3B8", // 12: Disappearance Slate
  "#F59E0B", // 13: Untouched Vault Gold
  "#A855F7", // 14: Suspects Violet
  "#06B6D4", // 15: 21M Cap Cyan
  "#10B981", // 16: Bull Run Emerald
  "#DC2626", // 17: Mt. Gox Disaster Crimson
  "#F97316", // 18: Phoenix Rebirth Amber
  "#38BDF8", // 19: El Salvador Sky Blue
  "#10B981", // 20: ETF Approval Emerald
  "#F59E0B", // 21: Digital Gold vs Bubble Gold
  "#06B6D4", // 22: Future of Money Cyan
];

export const BitcoinShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#060B14" }}>
      {/* Voiceover Audio Track (136.920s, 4140 frames @ 30 FPS) */}
      <Audio src={staticFile("audio/bitcoin.wav")} volume={1} />

      {/* Preload all 22 images so no dropped frames */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* 22 Perfectly Aligned Sequences */}
      {BITCOIN_SCENES.map((scene, idx) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          premountFor={60}
        >
          <BitcoinScene
            src={`images/bitcoin-origin/${scene.image}`}
            motion={SCENE_MOTIONS[idx]}
            badgeText={scene.badge}
            badgeColor={BADGE_COLORS[idx]}
          >
            <BitcoinHUD tag={scene.hud} accentColor={BADGE_COLORS[idx]} />
          </BitcoinScene>
        </Sequence>
      ))}

      {/* Kinetic Subtitles (Centered at bottom 290px) */}
      <BitcoinCaptions phrases={BITCOIN_PHRASES} bottom={290} />

      {/* Subtle Gold Progress Bar */}
      <ProgressBar color="#F59E0B" height={5} />
    </AbsoluteFill>
  );
};
