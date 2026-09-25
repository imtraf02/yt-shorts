import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, VictoriaScene } from "./components/VictoriaScene";
import { VictoriaHUD } from "./components/VictoriaHUD";
import { VictoriaCaptions } from "./components/VictoriaCaptions";
import { VictoriaProgressBar } from "./components/VictoriaProgressBar";
import {
  VICTORIA_AUDIO_PATH,
  VICTORIA_PHRASES,
  VICTORIA_SCENES,
} from "./data/victoriaSubtitles";

const ALL_IMAGES = [
  "images/queen-victoria/01-victoria-scene.png",
  "images/queen-victoria/02-victoria-scene.png",
  "images/queen-victoria/03-victoria-scene.png",
  "images/queen-victoria/04-victoria-scene.png",
  "images/queen-victoria/05-victoria-scene.png",
  "images/queen-victoria/06-victoria-scene.png",
  "images/queen-victoria/07-victoria-scene.png",
  "images/queen-victoria/08-victoria-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",       // 01: 40 năm mặc đồ đen bí ẩn
  "zoom-out",      // 02: Lên ngôi năm 18 tuổi, trị vì 63 năm
  "zoom-in",       // 03: Quỳ xuống cầu hôn Albert
  "drift-right",   // 04: Gia đình hoàng gia & 9 người con
  "dramatic-zoom", // 05: 1861 Albert qua đời vì thương hàn
  "drift-down",    // 06: Mỗi sáng chuẩn bị đồ cho người quá cố
  "drift-left",    // 07: Thời kỳ hoàng kim & cách mạng công nghiệp
  "zoom-out",      // 08: Trái tim cả đời chỉ thuộc về một người
];

export const VictoriaShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#08060B" }}>
      {/* Voice-Over Audio */}
      <Audio src={staticFile(VICTORIA_AUDIO_PATH)} />

      {/* 8 Chronological Story Sequences */}
      {VICTORIA_SCENES.map((scene, idx) => {
        const imagePath = `images/queen-victoria/${scene.image}`;
        const motion = SCENE_MOTIONS[idx] ?? "zoom-in";

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${scene.id}`}
          >
            <VictoriaScene
              src={imagePath}
              motion={motion}
              badgeText={scene.badge}
              objectPosition={scene.objectPosition}
            />
          </Sequence>
        );
      })}

      {/* Pre-load All Images for Smooth Render */}
      <div style={{ display: "none" }} aria-hidden>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* Top Header Pill */}
      <VictoriaHUD
        title="QUEEN VICTORIA • 1819-1901"
        subtitle="40 NĂM MẶC ĐỒ TANG"
      />

      {/* Top Liquid Progress Bar */}
      <VictoriaProgressBar height={8} />

      {/* Kinetic Subtitles */}
      <VictoriaCaptions phrases={VICTORIA_PHRASES} bottom={290} />
    </AbsoluteFill>
  );
};
