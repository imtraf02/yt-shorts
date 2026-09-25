import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, AlexanderScene } from "./components/AlexanderScene";
import { AlexanderHUD } from "./components/AlexanderHUD";
import { AlexanderCaptions } from "./components/AlexanderCaptions";
import { AlexanderProgressBar } from "./components/AlexanderProgressBar";
import {
  ALEXANDER_AUDIO_PATH,
  ALEXANDER_PHRASES,
  ALEXANDER_SCENES,
} from "./data/alexanderSubtitles";

const ALL_IMAGES = [
  "images/alexander-the-great/01-alexander-scene.png",
  "images/alexander-the-great/02-alexander-scene.png",
  "images/alexander-the-great/03-alexander-scene.png",
  "images/alexander-the-great/04-alexander-scene.png",
  "images/alexander-the-great/05-alexander-scene.png",
  "images/alexander-the-great/06-alexander-scene.png",
  "images/alexander-the-great/07-alexander-scene.png",
  "images/alexander-the-great/08-alexander-scene.png",
  "images/alexander-the-great/09-alexander-scene.png",
  "images/alexander-the-great/10-alexander-scene.png",
  "images/alexander-the-great/11-alexander-scene.png",
  "images/alexander-the-great/12-alexander-scene.png",
  "images/alexander-the-great/13-alexander-scene.png",
  "images/alexander-the-great/14-alexander-scene.png",
  "images/alexander-the-great/15-alexander-scene.png",
  "images/alexander-the-great/16-alexander-scene.png",
  "images/alexander-the-great/17-alexander-scene.png",
  "images/alexander-the-great/18-alexander-scene.png",
  "images/alexander-the-great/19-alexander-scene.png",
  "images/alexander-the-great/20-alexander-scene.png",
  "images/alexander-the-great/21-alexander-scene.png",
  "images/alexander-the-great/22-alexander-scene.png",
  "images/alexander-the-great/23-alexander-scene.png",
  "images/alexander-the-great/24-alexander-scene.png",
  "images/alexander-the-great/25-alexander-scene.png",
  "images/alexander-the-great/26-alexander-scene.png",
  "images/alexander-the-great/27-alexander-scene.png",
  "images/alexander-the-great/28-alexander-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",       // 01: Đế chế từ Hy Lạp đến Ấn Độ
  "zoom-out",      // 02: Bí ẩn qua đời tuổi 32
  "drift-right",   // 03: Sinh năm 356 TCN tại Pella
  "zoom-in",       // 04: Triết gia Aristotle truyền dạy
  "dramatic-zoom", // 05: Thuần phục tuấn mã Bucephalus
  "zoom-in",       // 06: Lên ngôi vua năm 20 tuổi
  "drift-left",    // 07: Dẹp loạn & san bằng Thebes
  "zoom-in",       // 08: 334 TCN vượt eo biển Hellespont sang châu Á
  "dramatic-zoom", // 09: Chiến thắng sông Granicus
  "zoom-in",       // 10: Chém đứt nút thắt Gordian
  "dramatic-zoom", // 11: 333 TCN đại thắng Darius tại Issus
  "zoom-out",      // 12: Công phá Tyre & tiến vào Ai Cập
  "drift-right",   // 13: Thành lập đô thành Alexandria
  "zoom-in",       // 14: Đền thờ Siwa: Con của thần
  "dramatic-zoom", // 15: 331 TCN đại chiến Gaugamela mũi nêm
  "drift-left",    // 16: Darius bỏ chạy và bị thuộc hạ giết
  "zoom-in",       // 17: Thiêu cháy cung điện Persepolis 330 TCN
  "drift-right",   // 18: 327 TCN cưới Roxana xứ Bactria
  "dramatic-zoom", // 19: 326 TCN đại chiến voi chiến sông Hydaspes
  "zoom-out",      // 20: Binh lính kiệt sức, lần đầu quay về
  "drift-down",    // 21: Sa mạc Gedrosia khắc nghiệt
  "zoom-in",       // 22: Hòa hợp hai thế giới Đông - Tây
  "drift-right",   // 23: 324 TCN đám cưới tập thể Susa
  "zoom-in",       // 24: Hephaestion qua đời: đau buồn khôn nguôi
  "zoom-out",      // 25: Tháng 6 năm 323 TCN băng hà tại Babylon
  "dramatic-zoom", // 26: 4 nguyên nhân cái chết bí ẩn
  "zoom-in",       // 27: Trăn trối: Cho người mạnh nhất
  "zoom-out",      // 28: Đế chế phân chia & đến Cleopatra
];

export const AlexanderShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#05020A" }}>
      {/* Voice-Over Audio */}
      <Audio src={staticFile(ALEXANDER_AUDIO_PATH)} />

      {/* 28 Chronological Story Sequences */}
      {ALEXANDER_SCENES.map((scene, idx) => {
        const imagePath = `images/alexander-the-great/${scene.image}`;
        const motion = SCENE_MOTIONS[idx] ?? "zoom-in";

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${scene.id}`}
          >
            <AlexanderScene
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

      {/* Top Header Pill */}
      <AlexanderHUD
        title="ALEXANDER ĐẠI ĐẾ • 356-323 TCN"
        subtitle="ĐẾ CHẾ VĨ ĐẠI"
      />

      {/* Top Liquid Progress Bar */}
      <AlexanderProgressBar height={8} />

      {/* Kinetic Subtitles */}
      <AlexanderCaptions phrases={ALEXANDER_PHRASES} bottom={290} />
    </AbsoluteFill>
  );
};
