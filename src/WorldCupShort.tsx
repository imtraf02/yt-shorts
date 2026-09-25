import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { CameraMotion, WorldCupScene } from "./components/WorldCupScene";
import { WorldCupHUD } from "./components/WorldCupHUD";
import { WorldCupCaptions } from "./components/WorldCupCaptions";
import { WorldCupProgressBar } from "./components/WorldCupProgressBar";
import { WORLDCUP_PHRASES, WORLDCUP_SCENES } from "./data/worldcupSubtitles";

const ALL_IMAGES = [
  "images/world-cup-2002-referee-controversy/01-korea-2002-miracle-hook.png",
  "images/world-cup-2002-referee-controversy/02-host-nation-spotlight.png",
  "images/world-cup-2002-referee-controversy/03-italy-match-controversial-red-card.png",
  "images/world-cup-2002-referee-controversy/04-replay-and-golden-goal.png",
  "images/world-cup-2002-referee-controversy/05-spain-disallowed-goal-debate.png",
  "images/world-cup-2002-referee-controversy/07-twelve-vs-eleven-satire.png",
  "images/world-cup-2002-referee-controversy/06-penalty-shootout-reactions.png",
  "images/world-cup-2002-referee-controversy/08-germany-semifinal-reality-check.png",
  "images/world-cup-2002-referee-controversy/09-fourth-place-celebration.png",
  "images/world-cup-2002-referee-controversy/10-refereeing-debate-after-tournament.png",
  "images/world-cup-2002-referee-controversy/11-fans-divided-legacy.png",
  "images/world-cup-2002-referee-controversy/12-fairness-is-relative-ending.png",
];

const SCENE_MOTIONS: CameraMotion[] = [
  "zoom-in",       // 01: 'Phép màu' bóng đá châu Á & nghịch lý
  "drift-down",    // 02: Biến World Cup thành giải đấu riêng
  "dramatic-zoom", // 03: Trận đấu với Ý & thẻ đỏ của Totti
  "zoom-in",       // 04: Bàn thắng vàng & pha việt vị gây sốt
  "dramatic-zoom", // 05: Tây Ban Nha bị tước 2 bàn thắng hợp lệ
  "drift-right",   // 06: Đội bóng 12 người (11 cầu thủ + 1 trọng tài)
  "zoom-in",       // 07: Thua luân lưu 11m, Tây Ban Nha tức tưởi
  "drift-left",    // 08: Bán kết đụng Đức, trọng tài 'cho đá thật'
  "zoom-out",      // 09: Về hạng tư ăn mừng như vô địch vũ trụ
  "drift-up",      // 10: FIFA thanh minh 'trọng tài làm rất tốt'
  "zoom-in",       // 11: Chỉ cần trọng tài thích bạn là vào bán kết
  "dramatic-zoom", // 12: Bài học triết lý về sự công bằng
];

export const WorldCupShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#08120C" }}>
      {/* Voice-Over Audio */}
      <Audio src={staticFile("audio/world-cup-2002.wav")} />

      {/* 12 Chronological Satirical Story Sequences */}
      {WORLDCUP_SCENES.map((scene, idx) => {
        const imagePath = `images/world-cup-2002-referee-controversy/${scene.image}`;
        const motion = SCENE_MOTIONS[idx] ?? "zoom-in";

        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${scene.id}`}
          >
            <WorldCupScene
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
      <WorldCupHUD
        title="WORLD CUP 2002 • CONTROVERSY"
        subtitle="REFEREE SCANDAL"
      />

      {/* Stadium Pitch Neon Progress Bar */}
      <WorldCupProgressBar height={8} />

      {/* Kinetic Football Subtitles */}
      <WorldCupCaptions phrases={WORLDCUP_PHRASES} bottom={290} />
    </AbsoluteFill>
  );
};
