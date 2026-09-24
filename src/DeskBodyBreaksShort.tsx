import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { AnimeStudyBackground } from "./components/AnimeStudyBackground";
import { AnimeCard } from "./components/AnimeCard";
import { AnimeHeader } from "./components/AnimeHeader";
import { AnimeCaptions } from "./components/AnimeCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { deskBodyBreaksSubtitles } from "./data/deskBodyBreaksSubtitles";

// Scene frame ranges (at 30 fps, total = 2310 frames = 77.00s)
// Audio duration: 76.51s
const SCENE_1_FRAMES = 222; // 0.00s - 7.40s: Bom nổ tuổi 40
const SCENE_2_FRAMES = 348; // 7.40s - 19.00s: Bài tập cổ
const SCENE_3_FRAMES = 354; // 19.00s - 30.80s: Bài tập cổ tay
const SCENE_4_FRAMES = 318; // 30.80s - 41.40s: Chống vai gù
const SCENE_5_FRAMES = 270; // 41.40s - 50.40s: Siết mông & lưu thông máu
const SCENE_6_FRAMES = 174; // 50.40s - 56.20s: Quy tắc mắt 20-20-20
const SCENE_7_FRAMES = 144; // 56.20s - 61.00s: Nhìn góc phòng xa nhất
const SCENE_8_FRAMES = 126; // 61.00s - 65.20s: Đi quanh bàn đúng một vòng
const SCENE_9_FRAMES = 156; // 65.20s - 70.40s: Đừng để cơ thể quên có chân
const SCENE_10_FRAMES = 198; // 70.40s - 77.00s: < 2 phút mỗi giờ

const SCENE_1_START = 0;
const SCENE_2_START = SCENE_1_START + SCENE_1_FRAMES;
const SCENE_3_START = SCENE_2_START + SCENE_2_FRAMES;
const SCENE_4_START = SCENE_3_START + SCENE_3_FRAMES;
const SCENE_5_START = SCENE_4_START + SCENE_4_FRAMES;
const SCENE_6_START = SCENE_5_START + SCENE_5_FRAMES;
const SCENE_7_START = SCENE_6_START + SCENE_6_FRAMES;
const SCENE_8_START = SCENE_7_START + SCENE_7_FRAMES;
const SCENE_9_START = SCENE_8_START + SCENE_8_FRAMES;
const SCENE_10_START = SCENE_9_START + SCENE_9_FRAMES;

const ALL_IMAGES = [
  "images/desk-body-breaks-short/01-body-waits-for-revenge.png",
  "images/desk-body-breaks-short/02-neck-rotation.png",
  "images/desk-body-breaks-short/03-wrist-rotation.png",
  "images/desk-body-breaks-short/04-shoulders-question-mark.png",
  "images/desk-body-breaks-short/05-glute-squeeze-stand.png",
  "images/desk-body-breaks-short/06-rule-20-20-20.png",
  "images/desk-body-breaks-short/07-look-at-room-corner.png",
  "images/desk-body-breaks-short/08-walk-around-desk.png",
  "images/desk-body-breaks-short/09-rediscover-legs.png",
  "images/desk-body-breaks-short/10-under-two-minutes-per-hour.png",
];

export const DeskBodyBreaksShort: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/desk-body-breaks.wav")} volume={1} />

      {/* Preload all images so Chromium never drops frames on transitions */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 1: HOOK - CƠ THỂ BÁO THÙ TUỔI 40                      */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <AbsoluteFill>
          <AnimeStudyBackground mood="alert" showSpeedLines={true} />
          <AnimeHeader
            title="CƠ THỂ BÁO THÙ TUỔI 40"
            category="SỨC KHỎE // DÂN VĂN PHÒNG"
            tag="CẢNH BÁO #01"
            accentColor="#f87171"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/01-body-waits-for-revenge.png"
            x={115}
            y={275}
            width={850}
            rotation={-1.5}
            delay={0}
            frameStyle="neon-glow"
            glowColor="#f87171"
            tapeStyle="two-neon-tapes"
            badgeText="💣 BOM NỔ CHẬM"
            badgeColor="#f87171"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 2: BÀI TẬP CỔ - CỨ 20 PHÚT GIỮ 5 GIÂY                  */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="focus" />
          <AnimeHeader
            title="QUAY CỔ CHẬM RÃI TỪNG BÊN"
            category="BÀI TẬP #01 // VÙNG CỔ"
            tag="CỨ 20 PHÚT"
            accentColor="#38bdf8"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/02-neck-rotation.png"
            x={115}
            y={275}
            width={850}
            rotation={1.2}
            delay={0}
            frameStyle="holo-card"
            tapeStyle="corner-washi"
            badgeText="⏱ GIỮ 5 GIÂY / BÊN"
            badgeColor="#38bdf8"
            badgePosition="bottom-left"
            badgeDelay={8}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 3: BÀI TẬP CỔ TAY - 10 VÒNG MỖI CHIỀU                 */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="action" />
          <AnimeHeader
            title="XOAY TRÒN CỔ TAY 10 VÒNG"
            category="BÀI TẬP #02 // CỔ TAY"
            tag="15 GIÂY"
            accentColor="#facc15"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/03-wrist-rotation.png"
            x={115}
            y={275}
            width={850}
            rotation={-1.8}
            delay={0}
            frameStyle="neon-glow"
            glowColor="#facc15"
            tapeStyle="two-neon-tapes"
            badgeText="⚡ GIÃN CƠ GÕ PHÍM"
            badgeColor="#facc15"
            badgePosition="bottom-right"
            badgeDelay={8}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 4: CHỐNG GÙ VAI - TRÚT BỎ BALO ĐÁ                    */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="alert" />
          <AnimeHeader
            title="TRÚT BỎ BALO ĐÁ TRÊN LƯNG"
            category="BÀI TẬP #03 // CHỐNG GÙ VAI"
            tag="LẶP LẠI 5 LẦN"
            accentColor="#fb923c"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/04-shoulders-question-mark.png"
            x={115}
            y={275}
            width={850}
            rotation={1.5}
            delay={0}
            frameStyle="manga-border"
            tapeStyle="corner-washi"
            badgeText="💥 NÂNG VAI & THẢ RƠI"
            badgeColor="#fb923c"
            badgePosition="bottom-left"
            badgeDelay={8}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 5: SIẾT MÔNG & TUẦN HOÀN MÁU                          */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="action" />
          <AnimeHeader
            title="SIẾT MÔNG 5 GIÂY ĐỂ TÁI SINH"
            category="BÀI TẬP #04 // TUẦN HOÀN MÁU"
            tag="ĐỨNG DẬY NGAY"
            accentColor="#ec4899"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/05-glute-squeeze-stand.png"
            x={115}
            y={275}
            width={850}
            rotation={-1.2}
            delay={0}
            frameStyle="neon-glow"
            glowColor="#ec4899"
            tapeStyle="two-neon-tapes"
            badgeText="❤️ BƠM MÁU TOÀN THÂN"
            badgeColor="#ec4899"
            badgePosition="bottom-right"
            badgeDelay={8}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 6: QUY TẮC MẮT 20-20-20                               */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="calm" />
          <AnimeHeader
            title="BẢO VỆ MẮT TRƯỚC MÀN HÌNH"
            category="BÀI TẬP #05 // THỊ LỰC"
            tag="QUY TẮC 20-20-20"
            accentColor="#2dd4bf"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/06-rule-20-20-20.png"
            x={115}
            y={275}
            width={850}
            rotation={1.4}
            delay={0}
            frameStyle="holo-card"
            tapeStyle="corner-washi"
            badgeText="🌿 NHÌN XA 20 FEET"
            badgeColor="#2dd4bf"
            badgePosition="bottom-left"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 7: NHÌN GÓC PHÒNG XA NHẤT                             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="focus" />
          <AnimeHeader
            title="NHÌN GÓC PHÒNG XA NHẤT"
            category="MẸO KHÔNG CÓ CỬA SỔ"
            tag="GÓC PHÒNG"
            accentColor="#38bdf8"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/07-look-at-room-corner.png"
            x={115}
            y={275}
            width={850}
            rotation={-1.5}
            delay={0}
            frameStyle="neon-glow"
            glowColor="#38bdf8"
            tapeStyle="two-neon-tapes"
            badgeText="👀 RỜI XA MÀN HÌNH"
            badgeColor="#38bdf8"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 8: ĐỨNG DẬY ĐI QUANH BÀN ĐÚNG 1 VÒNG                  */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="action" />
          <AnimeHeader
            title="ĐỨNG DẬY ĐI QUANH BÀN"
            category="BÀI TẬP #06 // VẬN ĐỘNG"
            tag="ĐÚNG 1 VÒNG"
            accentColor="#a855f7"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/08-walk-around-desk.png"
            x={115}
            y={275}
            width={850}
            rotation={1.2}
            delay={0}
            frameStyle="manga-border"
            tapeStyle="corner-washi"
            badgeText="🚶 CHỈ CẦN 1 VÒNG"
            badgeColor="#a855f7"
            badgePosition="bottom-left"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 9: ĐỪNG ĐỂ CƠ THỂ QUÊN NÓ CÓ CHÂN                     */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="alert" />
          <AnimeHeader
            title="CƠ THỂ BẠN CÓ ĐÔI CHÂN"
            category="THÔNG ĐIỆP // ĐÔI CHÂN"
            tag="ĐỪNG QUÊN"
            accentColor="#f97316"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/09-rediscover-legs.png"
            x={115}
            y={275}
            width={850}
            rotation={-1.6}
            delay={0}
            frameStyle="neon-glow"
            glowColor="#f97316"
            tapeStyle="two-neon-tapes"
            badgeText="🏃 THỨC TỈNH CƠ THỂ"
            badgeColor="#f97316"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 10: TỔNG KẾT - CHƯA TỚI 2 PHÚT MỖI GIỜ               */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="calm" />
          <AnimeHeader
            title="ĐẦU TƯ 2 PHÚT MỖI GIỜ"
            category="KẾT LUẬN // SỐNG KHỎE"
            tag="< 2 PHÚT / GIỜ"
            accentColor="#10b981"
          />
          <AnimeCard
            src="images/desk-body-breaks-short/10-under-two-minutes-per-hour.png"
            x={115}
            y={275}
            width={850}
            rotation={1.0}
            delay={0}
            frameStyle="holo-card"
            tapeStyle="corner-washi"
            badgeText="✨ HÀNH ĐỘNG NGAY"
            badgeColor="#10b981"
            badgePosition="bottom-left"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Dynamic Word-by-Word Animated Subtitles */}
      <AnimeCaptions phrases={deskBodyBreaksSubtitles} />

      {/* Top Video Progress Bar */}
      <ProgressBar
        color="#fde047"
        backgroundColor="rgba(255, 255, 255, 0.16)"
        height={9}
      />
    </AbsoluteFill>
  );
};
