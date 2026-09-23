import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { AnimeStudyBackground } from "./components/AnimeStudyBackground";
import { AnimeCard } from "./components/AnimeCard";
import { AnimeHeader } from "./components/AnimeHeader";
import { AnimeCaptions } from "./components/AnimeCaptions";
import { ProgressBar } from "./components/ProgressBar";
import { procrastinationSubtitles } from "./data/procrastinationSubtitles";

// Scene frame ranges (at 30 fps, total = 2790 frames = 93.0s)
const SCENE_1_FRAMES = 135; // 0.00s - 4.50s: Bạn không lười, bạn tự lừa mình
const SCENE_2_FRAMES = 305; // 4.50s - 14.67s: Việc dưới 2 phút & to-do list
const SCENE_3_FRAMES = 464; // 14.67s - 30.13s: Nhìn deadline & hoảng loạn
const SCENE_4_FRAMES = 408; // 30.13s - 43.73s: Điện thoại úp mặt xuống bàn
const SCENE_5_FRAMES = 422; // 43.73s - 57.80s: Mẹo 10-2 & cú thắng nhỏ
const SCENE_6_FRAMES = 396; // 57.80s - 71.00s: Đếm 5-4-3-2-1 làm ngay
const SCENE_7_FRAMES = 445; // 71.00s - 85.83s: Quy tắc không bỏ 2 ngày liên tiếp
const SCENE_8_FRAMES = 215; // 85.83s - 93.00s: Giỏi bào chữa thi hùng biện

const SCENE_1_START = 0;
const SCENE_2_START = SCENE_1_START + SCENE_1_FRAMES;
const SCENE_3_START = SCENE_2_START + SCENE_2_FRAMES;
const SCENE_4_START = SCENE_3_START + SCENE_3_FRAMES;
const SCENE_5_START = SCENE_4_START + SCENE_4_FRAMES;
const SCENE_6_START = SCENE_5_START + SCENE_5_FRAMES;
const SCENE_7_START = SCENE_6_START + SCENE_6_FRAMES;
const SCENE_8_START = SCENE_7_START + SCENE_7_FRAMES;

const ALL_IMAGES = [
  "images/procrastination-short/01-brain-self-deception.png",
  "images/procrastination-short/02-two-minute-detour.png",
  "images/procrastination-short/03-endless-todo-list.png",
  "images/procrastination-short/04-deadline-panic.png",
  "images/procrastination-short/05-zoom-out-vs-next-step.png",
  "images/procrastination-short/06-face-down-phone-distraction.png",
  "images/procrastination-short/07-willpower-battery.png",
  "images/procrastination-short/08-design-your-environment.png",
  "images/procrastination-short/09-focus-sprints-10-2.png",
  "images/procrastination-short/10-task-switching-chaos.png",
  "images/procrastination-short/11-fear-of-failure.png",
  "images/procrastination-short/12-concrete-first-step.png",
  "images/procrastination-short/13-countdown-to-action.png",
  "images/procrastination-short/14-never-miss-two-days.png",
  "images/procrastination-short/15-master-of-excuses.png",
  "images/procrastination-short/16-small-wins-staircase.png",
];

export const ProcrastinationShort: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Audio Track */}
      <Audio src={staticFile("audio/procrastination.wav")} volume={1} />

      {/* Preload all images so Chromium never drops frames on transitions */}
      <div style={{ display: "none" }}>
        {ALL_IMAGES.map((img) => (
          <Img key={img} src={staticFile(img)} />
        ))}
      </div>

      {/* ============================================================ */}
      {/* SCENE 1: BẠN KHÔNG LƯỜI, BẠN CHỈ ĐANG TỰ LỪA MÌNH           */}
      {/* ============================================================ */}
      <Sequence durationInFrames={SCENE_1_FRAMES} premountFor={60}>
        <AbsoluteFill>
          <AnimeStudyBackground mood="action" />
          <AnimeHeader
            title="BẠN KHÔNG LƯỜI, BẠN TỰ LỪA MÌNH"
            category="TÂM LÝ HỌC // BẪY NÃO BỘ"
            tag="SỰ THẬT #01"
            accentColor="#fde047"
          />
          {/* Hero Single Card */}
          <AnimeCard
            src="images/procrastination-short/01-brain-self-deception.png"
            x={115}
            y={275}
            width={850}
            rotation={-1.5}
            delay={0}
            frameStyle="neon-glow"
            glowColor="#fde047"
            tapeStyle="two-neon-tapes"
            badgeText="🧠 BẪY TỰ LỪA MÌNH"
            badgeColor="#fde047"
            badgePosition="bottom-right"
            badgeDelay={8}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 2: VIỆC DƯỚI 2 PHÚT & TO-DO LIST VÔ ÍCH                */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="alert" />
          <AnimeHeader
            title="VIỆC DƯỚI 2 PHÚT: ĐỪNG GHI TO-DO LIST"
            category="TỐI ƯU HÀNH ĐỘNG // NGHỊCH LÝ"
            tag="CẢNH BÁO"
            accentColor="#ef4444"
          />
          {/* Dual Overlapping Cards */}
          {/* Card 1: Left Background */}
          <AnimeCard
            src="images/procrastination-short/03-endless-todo-list.png"
            x={50}
            y={280}
            width={580}
            rotation={-4.5}
            delay={0}
            zIndex={10}
            frameStyle="manga-border"
            tapeStyle="hazard-tape"
            badgeText="❌ VÔ ÍCH"
            badgeColor="#ef4444"
            badgePosition="top-left"
            badgeDelay={6}
          />
          {/* Card 2: Right Overlapping Foreground */}
          <AnimeCard
            src="images/procrastination-short/02-two-minute-detour.png"
            x={440}
            y={390}
            width={585}
            rotation={4.5}
            delay={185}
            zIndex={20}
            frameStyle="cyber-slate"
            glowColor="#f97316"
            tapeStyle="two-neon-tapes"
            badgeText="🔄 ĐI VÒNG TỰ LÀM KHÓ"
            badgeColor="#f97316"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 3: NHÌN DEADLINE LÀ SAI BÉT -> CHỈ NHÌN 10 PHÚT         */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="alert" showSpeedLines={true} />
          <AnimeHeader
            title="NHÌN DEADLINE: ÁP LỰC HAY HOẢNG LOẠN?"
            category="BẪY TÂM LÝ // ĐỘNG LỰC ẢO"
            tag="SAI BÉT!"
            accentColor="#ef4444"
          />
          {/* Card 1: Left Background */}
          <AnimeCard
            src="images/procrastination-short/04-deadline-panic.png"
            x={50}
            y={280}
            width={580}
            rotation={-4}
            delay={0}
            zIndex={10}
            frameStyle="holo-card"
            tapeStyle="hazard-tape"
            badgeText="⚠️ TIM ĐẬP NHANH"
            badgeColor="#ef4444"
            badgePosition="top-left"
            badgeDelay={6}
          />
          {/* Card 2: Right Overlapping Foreground */}
          <AnimeCard
            src="images/procrastination-short/05-zoom-out-vs-next-step.png"
            x={440}
            y={390}
            width={585}
            rotation={4}
            delay={277}
            zIndex={20}
            frameStyle="neon-glow"
            glowColor="#38bdf8"
            tapeStyle="two-neon-tapes"
            badgeText="⏱️ CHỈ 10 PHÚT TỚI"
            badgeColor="#38bdf8"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 4: ĐIỆN THOẠI ÚP MẶT XUỐNG BÀN & ĐỂ SANG PHÒNG KHÁC    */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="focus" />
          <AnimeHeader
            title="ÚP ĐIỆN THOẠI XUỐNG BÀN LÀ TỰ LỪA"
            category="CÁCH LY MÔI TRƯỜNG"
            tag="MẸO #02"
            accentColor="#38bdf8"
          />
          {/* Card 1: Left Background */}
          <AnimeCard
            src="images/procrastination-short/06-face-down-phone-distraction.png"
            x={50}
            y={280}
            width={580}
            rotation={-3.5}
            delay={0}
            zIndex={10}
            frameStyle="manga-border"
            tapeStyle="hazard-tape"
            badgeText="👻 MA ÁM TỪ BÓNG TỐI"
            badgeColor="#ef4444"
            badgePosition="top-left"
            badgeDelay={6}
          />
          {/* Card 2: Right Overlapping Foreground */}
          <AnimeCard
            src="images/procrastination-short/08-design-your-environment.png"
            x={440}
            y={390}
            width={585}
            rotation={4.5}
            delay={250}
            zIndex={20}
            frameStyle="neon-glow"
            glowColor="#10b981"
            tapeStyle="corner-washi"
            badgeText="🚪 SANG PHÒNG KHÁC"
            badgeColor="#10b981"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 5: LÀM 10 PHÚT NGHỈ 2 PHÚT & CÚ THẮNG NHỎ             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="calm" />
          <AnimeHeader
            title="LÀM 10 PHÚT - NGHỈ 2 PHÚT - LẶP LẠI"
            category="CÚ THẮNG NHỎ // MICRO-SPRINT"
            tag="MẸO #03"
            accentColor="#14b8a6"
          />
          {/* Card 1: Left Background */}
          <AnimeCard
            src="images/procrastination-short/09-focus-sprints-10-2.png"
            x={50}
            y={280}
            width={580}
            rotation={-4}
            delay={0}
            zIndex={10}
            frameStyle="cyber-slate"
            glowColor="#14b8a6"
            tapeStyle="two-neon-tapes"
            badgeText="⏱️ 10 PHÚT - NGHỈ 2 PHÚT"
            badgeColor="#14b8a6"
            badgePosition="top-left"
            badgeDelay={6}
          />
          {/* Card 2: Right Overlapping Foreground */}
          <AnimeCard
            src="images/procrastination-short/16-small-wins-staircase.png"
            x={440}
            y={390}
            width={585}
            rotation={4.5}
            delay={260}
            zIndex={20}
            frameStyle="holo-card"
            tapeStyle="holo-tape"
            badgeText="🏆 CÚ THẮNG NHỎ"
            badgeColor="#facc15"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 6: QUY TẮC 5 GIÂY (5-4-3-2-1 RỒI LÀM NGAY)             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="action" showSpeedLines={true} />
          <AnimeHeader
            title="ĐẾM 5-4-3-2-1 RỒI LÀM NGAY"
            category="HÀNH ĐỘNG TỨC THÌ"
            tag="MẸO #04"
            accentColor="#fde047"
          />
          {/* Card 1: Left Background */}
          <AnimeCard
            src="images/procrastination-short/13-countdown-to-action.png"
            x={50}
            y={280}
            width={580}
            rotation={-4}
            delay={0}
            zIndex={10}
            frameStyle="neon-glow"
            glowColor="#fde047"
            tapeStyle="hazard-tape"
            badgeText="🚀 5-4-3-2-1 ACTION!"
            badgeColor="#fde047"
            badgePosition="top-left"
            badgeDelay={6}
          />
          {/* Card 2: Right Overlapping Foreground */}
          <AnimeCard
            src="images/procrastination-short/12-concrete-first-step.png"
            x={440}
            y={390}
            width={585}
            rotation={5}
            delay={215}
            zIndex={20}
            frameStyle="manga-border"
            tapeStyle="two-neon-tapes"
            badgeText="🛑 CHẶN 5 GIÂY BÀO CHỮA"
            badgeColor="#38bdf8"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 7: QUY TẮC CUỐI - ĐỪNG BỎ 2 NGÀY LIÊN TIẾP             */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="alert" />
          <AnimeHeader
            title="QUY TẮC CUỐI: ĐỪNG BỎ 2 NGÀY LIÊN TIẾP"
            category="DUY TRÌ QUÁN TÍNH"
            tag="QUY TẮC VÀNG"
            accentColor="#ef4444"
          />
          {/* Card 1: Left Background */}
          <AnimeCard
            src="images/procrastination-short/14-never-miss-two-days.png"
            x={50}
            y={280}
            width={580}
            rotation={-3.5}
            delay={0}
            zIndex={10}
            frameStyle="neon-glow"
            glowColor="#38bdf8"
            tapeStyle="corner-washi"
            badgeText="🛡️ KHÔNG BỎ 2 NGÀY"
            badgeColor="#38bdf8"
            badgePosition="top-left"
            badgeDelay={6}
          />
          {/* Card 2: Right Overlapping Foreground */}
          <AnimeCard
            src="images/procrastination-short/11-fear-of-failure.png"
            x={440}
            y={390}
            width={585}
            rotation={4}
            delay={230}
            zIndex={20}
            frameStyle="cyber-slate"
            glowColor="#ef4444"
            tapeStyle="hazard-tape"
            badgeText="💥 BỎ 2 NGÀY = XONG PHIM"
            badgeColor="#ef4444"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================ */}
      {/* SCENE 8: KẾT LUẬN - GIỎI BÀO CHỮA NÊN ĐI THI HÙNG BIỆN       */}
      {/* ============================================================ */}
      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_FRAMES}
        premountFor={60}
      >
        <AbsoluteFill>
          <AnimeStudyBackground mood="action" showSpeedLines={true} />
          <AnimeHeader
            title="BẠN GIỎI BÀO CHỮA HƠN BẠN TƯỞNG!"
            category="KẾT LUẬN // TÂM LÝ"
            tag="TỔNG KẾT"
            accentColor="#fde047"
          />
          {/* Card 1: Center-Left */}
          <AnimeCard
            src="images/procrastination-short/15-master-of-excuses.png"
            x={55}
            y={280}
            width={600}
            rotation={-3}
            delay={0}
            zIndex={15}
            frameStyle="holo-card"
            tapeStyle="two-neon-tapes"
            badgeText="🏆 VUA BÀO CHỮA"
            badgeColor="#fde047"
            badgePosition="bottom-left"
            badgeDelay={6}
          />
          {/* Card 2: Right Overlapping */}
          <AnimeCard
            src="images/procrastination-short/10-task-switching-chaos.png"
            x={445}
            y={380}
            width={585}
            rotation={5}
            delay={25}
            zIndex={25}
            frameStyle="manga-border"
            tapeStyle="corner-washi"
            badgeText="🧠 DỪNG TỰ LỪA MÌNH!"
            badgeColor="#38bdf8"
            badgePosition="bottom-right"
            badgeDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Dynamic Anime Subtitles */}
      <AnimeCaptions phrases={procrastinationSubtitles} />

      {/* Top Video Progress Bar */}
      <ProgressBar
        color="#fde047"
        backgroundColor="rgba(255, 255, 255, 0.16)"
        height={9}
      />
    </AbsoluteFill>
  );
};
