import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, VanGoghScene } from "./components/VanGoghScene";
import { VanGoghHUD } from "./components/VanGoghHUD";
import { VanGoghCaptions } from "./components/VanGoghCaptions";
import { VanGoghProgressBar } from "./components/VanGoghProgressBar";
import { VANGOGH_PHRASES, VANGOGH_SCENES } from "./data/vangoghSubtitles";

const ALL_IMAGES = [
  "images/vincent-van-gogh/01-vangogh-scene.png",
  "images/vincent-van-gogh/02-vangogh-scene.png",
  "images/vincent-van-gogh/03-vangogh-scene.png",
  "images/vincent-van-gogh/04-vangogh-scene.png",
  "images/vincent-van-gogh/05-vangogh-scene.png",
  "images/vincent-van-gogh/06-vangogh-scene.png",
  "images/vincent-van-gogh/07-vangogh-scene.png",
  "images/vincent-van-gogh/08-vangogh-scene.png",
  "images/vincent-van-gogh/09-vangogh-scene.png",
  "images/vincent-van-gogh/10-vangogh-scene.png",
  "images/vincent-van-gogh/11-vangogh-scene.png",
  "images/vincent-van-gogh/12-vangogh-scene.png",
  "images/vincent-van-gogh/13-vangogh-scene.png",
  "images/vincent-van-gogh/14-vangogh-scene.png",
  "images/vincent-van-gogh/15-vangogh-scene.png",
  "images/vincent-van-gogh/16-vangogh-scene.png",
  "images/vincent-van-gogh/17-vangogh-scene.png",
  "images/vincent-van-gogh/18-vangogh-scene.png",
  "images/vincent-van-gogh/19-vangogh-scene.png",
  "images/vincent-van-gogh/20-vangogh-scene.png",
  "images/vincent-van-gogh/21-vangogh-scene.png",
  "images/vincent-van-gogh/22-vangogh-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",       // 01: Kiệt tác vang danh bảo tàng
  "zoom-out",      // 02: Chỉ bán 1 bức tranh khi sống
  "drift-right",   // 03: Sinh năm 1853 tại Hà Lan, con mục sư
  "drift-left",    // 04: Thợ mỏ Bỉ dốc lòng giúp đỡ
  "zoom-in",       // 05: Mọi con đường đều thất bại
  "dramatic-zoom", // 06: 27 tuổi quyết định làm họa sĩ
  "drift-right",   // 07: Em trai Theo là điểm tựa duy nhất
  "zoom-in",       // 08: Hàng trăm lá thư tâm huyết lưu giữ
  "zoom-out",      // 09: Bảng màu bừng sáng tại Paris
  "dramatic-zoom", // 10: Phong cách rực rỡ cả thế giới biết đến
  "zoom-in",       // 11: Đến Arles: Giấc mơ xưởng vẽ phương Nam
  "drift-right",   // 12: Đón Paul Gauguin đến sống cùng
  "zoom-in",       // 13: Vẽ Hoa Hướng Dương trong hào hứng tột độ
  "dramatic-zoom", // 14: Xung đột và bất đồng căng thẳng
  "zoom-in",       // 15: Cơn khủng hoảng tinh thần và tự cắt tai
  "drift-up",      // 16: Bệnh viện Saint-Rémy & Đêm đầy sao
  "dramatic-zoom", // 17: Hai năm cuối tốc độ vẽ kinh ngạc
  "drift-down",    // 18: Phát súng định mệnh Auvers-sur-Oise
  "zoom-in",       // 19: Uẩn khúc cái chết gây tranh cãi
  "zoom-out",      // 20: Mất trong nghèo khó, tranh nay vô giá
  "drift-right",   // 21: Chị dâu Johanna gìn giữ di sản toàn cầu
  "dramatic-zoom", // 22: Huyền thoại bất tử Vincent van Gogh
];

export const VanGoghShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050C1A" }}>
      {/* Voice-Over Audio */}
      <Audio src={staticFile("audio/vincent-van-gogh.wav")} />

      {/* 22 Chronological Story Sequences */}
      {VANGOGH_SCENES.map((scene, idx) => {
        const imagePath = `images/vincent-van-gogh/${scene.image}`;
        const motion = SCENE_MOTIONS[idx] ?? "zoom-in";

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${scene.id}`}
          >
            <VanGoghScene
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
      <VanGoghHUD title="VINCENT VAN GOGH • 1853-1890" subtitle="KIỆT TÁC HỘI HỌA" />

      {/* Top Liquid Progress Bar */}
      <VanGoghProgressBar height={8} />

      {/* Kinetic Kinetic Subtitles */}
      <VanGoghCaptions phrases={VANGOGH_PHRASES} bottom={290} />
    </AbsoluteFill>
  );
};
