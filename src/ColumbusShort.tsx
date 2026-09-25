import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, ColumbusScene } from "./components/ColumbusScene";
import { ColumbusHUD } from "./components/ColumbusHUD";
import { ColumbusCaptions } from "./components/ColumbusCaptions";
import { ColumbusProgressBar } from "./components/ColumbusProgressBar";
import { COLUMBUS_PHRASES, COLUMBUS_SCENES } from "./data/columbusSubtitles";

const ALL_IMAGES = [
  "images/christopher-columbus/01-columbus-scene.png",
  "images/christopher-columbus/02-columbus-scene.png",
  "images/christopher-columbus/03-columbus-scene.png",
  "images/christopher-columbus/04-columbus-scene.png",
  "images/christopher-columbus/05-columbus-scene.png",
  "images/christopher-columbus/06-columbus-scene.png",
  "images/christopher-columbus/07-columbus-scene.png",
  "images/christopher-columbus/08-columbus-scene.png",
  "images/christopher-columbus/09-columbus-scene.png",
  "images/christopher-columbus/10-columbus-scene.png",
  "images/christopher-columbus/11-columbus-scene.png",
  "images/christopher-columbus/12-columbus-scene.png",
  "images/christopher-columbus/13-columbus-scene.png",
  "images/christopher-columbus/14-columbus-scene.png",
  "images/christopher-columbus/15-columbus-scene.png",
  "images/christopher-columbus/16-columbus-scene.png",
  "images/christopher-columbus/17-columbus-scene.png",
  "images/christopher-columbus/18-columbus-scene.png",
  "images/christopher-columbus/19-columbus-scene.png",
  "images/christopher-columbus/20-columbus-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",       // 01: Columbus cập bến bờ biển năm 1492
  "drift-right",   // 02: Trên boong tàu soi bản đồ châu Á
  "zoom-in",       // 03: Bản làng người dân bản địa hàng ngàn năm
  "dramatic-zoom", // 04: Columbus cuối đời vẫn ngỡ là Ấn Độ
  "zoom-out",      // 05: Đặt chân lên vùng đất hoàn toàn khác biệt
  "drift-left",    // 06: Nguồn cơn tên gọi nhầm 'người Indian'
  "zoom-in",       // 07: Bản đồ hải trình dựa trên phép tính sai
  "dramatic-zoom", // 08: Boong tàu đói khát suýt chết giữa đại dương
  "drift-right",   // 09: Trớ trêu châu Mỹ không mang tên Columbus
  "zoom-in",       // 10: Nhà thám hiểm Amerigo Vespucci
  "drift-left",    // 11: Vespucci công bố lục địa mới trước học giả
  "zoom-out",      // 12: Kẻ tính sai nổi tiếng, kẻ tính đúng đặt tên
  "dramatic-zoom", // 13: Lịch sử trớ trêu & chia đôi số phận
  "drift-up",      // 14: Chưa từng đặt chân lên lãnh thổ nước Mỹ
  "zoom-in",       // 15: Chỉ đến các đảo Caribbean & Trung Mỹ
  "zoom-out",      // 16: Mở đường cho làn sóng thám hiểm vĩ đại
  "drift-down",    // 17: Qua đời trong cảnh lãng quên & không công nhận
  "zoom-in",       // 18: Niềm tin đến hơi thở cuối cùng về châu Á
  "zoom-in",       // 19: Thế giới dần dần nhận ra sự thật
  "dramatic-zoom", // 20: Di sản vĩ đại hơn thế rất nhiều
];

export const ColumbusShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#06101E" }}>
      {/* Voice-Over Audio */}
      <Audio src={staticFile("audio/christopher-columbus.wav")} />

      {/* 20 Chronological Story Sequences */}
      {COLUMBUS_SCENES.map((scene, idx) => {
        const imagePath = `images/christopher-columbus/${scene.image}`;
        const motion = SCENE_MOTIONS[idx] ?? "zoom-in";

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${scene.id}`}
          >
            <ColumbusScene
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

      {/* Top Header Renaissance Cartography Pill */}
      <ColumbusHUD title="CHRISTOPHER COLUMBUS • 1492" subtitle="EXPEDITION" />

      {/* Liquid Nautical Brass Progress Bar */}
      <ColumbusProgressBar height={8} />

      {/* Kinetic Age of Discovery Subtitles */}
      <ColumbusCaptions phrases={COLUMBUS_PHRASES} bottom={290} />
    </AbsoluteFill>
  );
};
