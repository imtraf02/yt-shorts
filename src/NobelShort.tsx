import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, NobelScene } from "./components/NobelScene";
import { NobelHUD } from "./components/NobelHUD";
import { NobelCaptions } from "./components/NobelCaptions";
import { NobelProgressBar } from "./components/NobelProgressBar";
import { NOBEL_PHRASES, NOBEL_SCENES } from "./data/nobelSubtitles";

const ALL_IMAGES = [
  "images/alfred-nobel/01-alfred-nobel-scene.png",
  "images/alfred-nobel/02-alfred-nobel-scene.png",
  "images/alfred-nobel/03-alfred-nobel-scene.png",
  "images/alfred-nobel/04-alfred-nobel-scene.png",
  "images/alfred-nobel/05-alfred-nobel-scene.png",
  "images/alfred-nobel/06-alfred-nobel-scene.png",
  "images/alfred-nobel/07-alfred-nobel-scene.png",
  "images/alfred-nobel/08-alfred-nobel-scene.png",
  "images/alfred-nobel/09-alfred-nobel-scene.png",
  "images/alfred-nobel/10-alfred-nobel-scene.png",
  "images/alfred-nobel/11-alfred-nobel-scene.png",
  "images/alfred-nobel/12-alfred-nobel-scene.png",
  "images/alfred-nobel/13-alfred-nobel-scene.png",
  "images/alfred-nobel/14-alfred-nobel-scene.png",
  "images/alfred-nobel/15-alfred-nobel-scene.png",
  "images/alfred-nobel/16-alfred-nobel-scene.png",
  "images/alfred-nobel/17-alfred-nobel-scene.png",
  "images/alfred-nobel/18-alfred-nobel-scene.png",
  "images/alfred-nobel/19-alfred-nobel-scene.png",
  "images/alfred-nobel/20-alfred-nobel-scene.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",       // 01: Di sản giải Nobel & lễ trao giải
  "dramatic-zoom", // 02: Bàng hoàng đọc cáo phó của chính mình
  "drift-right",   // 03: Năm 1888, báo Pháp đăng nhầm tin
  "dramatic-zoom", // 04: Tiêu đề rùng rợn 'Người buôn cái chết đã chết'
  "zoom-in",       // 05: Phát minh dynamite phục vụ khai khoáng
  "drift-left",    // 06: Vũ khí tàn phá khủng khiếp trên chiến trường
  "drift-down",    // 07: Thức tỉnh lương tâm & nỗi đau tột cùng
  "zoom-in",       // 08: Ý tưởng chuộc lại danh dự cuộc đời
  "zoom-in",       // 09: Bản di chúc lịch sử khai sinh giải Nobel
  "zoom-out",      // 10: Nghịch lý giàu có từ vũ khí giết người
  "drift-up",      // 11: Rót tiền vàng nuôi dưỡng bồ câu hòa bình
  "zoom-in",       // 12: Khói thuốc nổ hóa thành giải Nobel Hòa Bình
  "zoom-in",       // 13: Bữa tối cô độc, không vợ không con
  "drift-right",   // 14: Những đêm dài miệt mài trong phòng thí nghiệm
  "zoom-in",       // 15: Bức thư tự nhận là 'người bi quan nhất thế giới'
  "zoom-out",      // 16: Khối tài sản khổng lồ nhưng tâm hồn trống trải
  "zoom-in",       // 17: Bí ẩn huy chương Nobel thiếu miếng bánh toán học
  "drift-left",    // 18: Giả thuyết mối thù cá nhân với nhà toán học
  "zoom-out",      // 19: Cuộc chuộc tội vĩ đại nhất lịch sử nhân loại
  "dramatic-zoom", // 20: Alfred Nobel - Di sản bất tử của nhân loại
];

export const NobelShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#08070A" }}>
      {/* Voice-Over Audio */}
      <Audio src={staticFile("audio/alfred-nobel.wav")} />

      {/* 20 Chronological Story Sequences */}
      {NOBEL_SCENES.map((scene, idx) => {
        const imagePath = `images/alfred-nobel/${scene.image}`;
        const motion = SCENE_MOTIONS[idx] ?? "zoom-in";

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${scene.id}`}
          >
            <NobelScene
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

      {/* Top Header Victorian Archival Pill */}
      <NobelHUD title="ALFRED NOBEL • 1888" />

      {/* Liquid Burnished Gold Progress Bar */}
      <NobelProgressBar height={8} />

      {/* Victorian Serif Kinetic Subtitles */}
      <NobelCaptions phrases={NOBEL_PHRASES} bottom={290} />
    </AbsoluteFill>
  );
};
