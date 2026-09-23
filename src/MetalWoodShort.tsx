import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadBeVietnamPro } from "@remotion/google-fonts/BeVietnamPro";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";
import { AnimatedCaptions } from "./components/AnimatedCaptions";
import { ThermalInvestigationBackground } from "./components/ThermalInvestigationBackground";
import { ScrapbookPhotoCard } from "./components/ScrapbookPhotoCard";
import { ProgressBar } from "./components/ProgressBar";
import { metalWoodSubtitles } from "./data/metalWoodSubtitles";

// Load Vietnamese fonts with full diacritic support
const { fontFamily: beVietnamFont } = loadBeVietnamPro("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

// Top Dashboard Header
const DashboardCard: React.FC<{
  readonly title: string;
  readonly status: string;
  readonly seqNum?: string;
  readonly isHot?: boolean;
}> = ({ title, status, seqNum = "01", isHot = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  const accentColor = isHot ? "#fb923c" : "#38bdf8";
  const badgeBg = isHot ? "rgba(45, 15, 10, 0.92)" : "rgba(10, 22, 42, 0.92)";
  const badgeBorder = isHot ? "rgba(249, 115, 22, 0.8)" : "rgba(56, 189, 248, 0.8)";
  const dotColor = isHot ? "#f97316" : "#38bdf8";

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 60,
        right: 60,
        zIndex: 50,
        opacity: reveal,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            color: accentColor,
            fontFamily: beVietnamFont,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: dotColor,
              boxShadow: `0 0 16px ${dotColor}`,
            }}
          />
          {status}
        </div>

        <div
          style={{
            padding: "8px 20px",
            border: `1.5px solid ${badgeBorder}`,
            backgroundColor: badgeBg,
            color: "#f8fafc",
            fontFamily: robotoMonoFont,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1.5,
            borderRadius: 8,
            boxShadow: `0 4px 20px ${isHot ? "rgba(249, 115, 22, 0.35)" : "rgba(56, 189, 248, 0.35)"}`,
          }}
        >
          NOTE {seqNum}
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          maxWidth: 960,
          color: "#ffffff",
          fontFamily: beVietnamFont,
          fontSize: 48,
          fontWeight: 900,
          lineHeight: 1.18,
          letterSpacing: -0.5,
          textTransform: "uppercase",
          textShadow:
            "0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)",
        }}
      >
        {title}
      </div>
    </div>
  );
};

// Scene Timings (in frames at 30 fps)
// Audio duration: 49.227s = 1477 frames. Total video: 1530 frames (51.0s)
const SCENE_1_FRAMES = 134; // 0.00s - 4.47s
const SCENE_2_FRAMES = 109; // 4.47s - 8.11s
const SCENE_3_FRAMES = 105; // 8.11s - 11.59s
const SCENE_4_FRAMES = 152; // 11.59s - 16.68s
const SCENE_5_FRAMES = 111; // 16.68s - 20.37s
const SCENE_6_FRAMES = 141; // 20.37s - 25.08s
const SCENE_7_FRAMES = 90;  // 25.08s - 28.05s
const SCENE_8_FRAMES = 220; // 28.05s - 35.40s
const SCENE_9_FRAMES = 226; // 35.40s - 42.92s
const SCENE_10_FRAMES = 212; // 42.92s - 50.00s (Total = 1500)

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

export const MetalWoodShort: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/metal-wood-heat.wav")} volume={1} />

      {/* SCENE 1: Mùa đông - Cùng để ngoài trời lạnh */}
      <Sequence durationInFrames={SCENE_1_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Kim loại và gỗ có cùng nhiệt độ"
            status="MÙA ĐÔNG // ĐỐI CHỨNG"
            seqNum="01"
          />
          {/* Large Hero Note with Two Corner Tapes */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/01-same-temperature-cold.png"
            label="HAI VẬT Ở CÙNG NHIỆT ĐỘ NGOÀI TRỜI (0°C)"
            x={100}
            y={280}
            width={880}
            rotation={-1.5}
            delay={0}
            tapeStyle="two-top-corners"
            frameStyle="polaroid"
            stampText="❄️ 0°C ĐỐI CHỨNG"
            stampColor="#38bdf8"
            stampDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 2: Nhưng khi chạm vào - Cảm giác buốt lạnh */}
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Kim loại luôn khiến bạn thấy lạnh hơn"
            status="NGHỊCH LÝ XÚC GIÁC"
            seqNum="02"
          />
          {/* Large Hero Note with Diagonal Corner Tapes */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/02-metal-feels-colder.png"
            label="KIM LOẠI CHO CẢM GIÁC LẠNH BUỐT HƠN HẲN"
            x={100}
            y={280}
            width={880}
            rotation={2}
            delay={0}
            tapeStyle="diagonal-corners"
            frameStyle="craft-card"
            stampText="❄️ BUỐT LẠNH TÊ TAY"
            stampColor="#ef4444"
            stampDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 3: Không nằm ở nhiệt độ — mà nằm ở tốc độ truyền nhiệt */}
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Vấn đề nằm ở tốc độ truyền nhiệt"
            status="BẢN CHẤT VẬT LÝ"
            seqNum="03"
          />
          {/* Dual Overlapping Scrapbook Notes */}
          {/* Card 1: Left / Background */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/03-not-temperature.png"
            label="KHÔNG PHẢI DO NHIỆT ĐỘ"
            x={60}
            y={300}
            width={580}
            rotation={-5}
            delay={0}
            tapeStyle="two-top-corners"
            frameStyle="polaroid"
            stampText="❌ SAI LẦM"
            stampColor="#ef4444"
            zIndex={10}
          />
          {/* Card 2: Right / Overlapping Foreground */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/04-rate-of-heat-transfer.png"
            label="TỐC ĐỘ TRUYỀN NHIỆT (dQ/dt)"
            x={440}
            y={420}
            width={580}
            rotation={4.5}
            delay={7}
            tapeStyle="pushpin"
            pinColor="#facc15"
            frameStyle="clean-white"
            stampText="⚡ YẾU TỐ QUYẾT ĐỊNH"
            stampColor="#38bdf8"
            zIndex={20}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 4: Kim loại dẫn nhiệt tốt nhờ electron tự do */}
      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Biển Electron tự do di chuyển linh hoạt"
            status="CƠ CHẾ DẪN NHIỆT"
            seqNum="04"
          />
          {/* Dual Overlapping Notes with Side Tapes & Two-Top Tapes */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/05-metal-conducts-heat.png"
            label="MẠNG TINH THỂ KIM LOẠI"
            x={70}
            y={310}
            width={570}
            rotation={-4}
            delay={0}
            tapeStyle="side-tapes"
            frameStyle="polaroid"
            stampText="k ≈ 400 W/m·K"
            stampColor="#38bdf8"
            zIndex={10}
          />
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/06-free-electrons.png"
            label="ELECTRON TỰ DO CHUYỂN ĐỘNG"
            x={430}
            y={430}
            width={580}
            rotation={5}
            delay={7}
            tapeStyle="two-top-corners"
            frameStyle="polaroid"
            stampText="⚡ DẪN NHIỆT CỰC TỐT"
            stampColor="#facc15"
            zIndex={20}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 5: Nhiệt từ cơ thể bị hút đi rất nhanh */}
      <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Nhiệt từ ngón tay bị rút đi tức thì"
            status="DÒNG NHIỆT THOÁT RA"
            seqNum="05"
          />
          {/* Large Hero Note with Paperclip */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/07-heat-leaves-hand.png"
            label="DÒNG NHIỆT TỪ DA THOÁT RA Ồ ẠT"
            x={100}
            y={280}
            width={880}
            rotation={-1.5}
            delay={0}
            tapeStyle="paperclip"
            frameStyle="clean-white"
            stampText="🔥 37°C ➔ ❄️ 0°C"
            stampColor="#38bdf8"
            stampDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 6: Não bộ không đo nhiệt độ — chỉ cảm nhận tốc độ mất nhiệt */}
      <Sequence from={SCENE_6_START} durationInFrames={SCENE_6_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Não bộ chỉ cảm nhận tốc độ mất nhiệt"
            status="ĐÁNH LỪA XÚC GIÁC"
            seqNum="06"
          />
          {/* Dual Overlapping Notes with Pushpin and Diagonal Tapes */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/08-brain-not-thermometer.png"
            label="NÃO KHÔNG PHẢI LÀ NHIỆT KẾ"
            x={60}
            y={300}
            width={580}
            rotation={-5.5}
            delay={0}
            tapeStyle="diagonal-corners"
            frameStyle="polaroid"
            stampText="❌ KHÔNG ĐO T"
            stampColor="#ef4444"
            zIndex={10}
          />
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/09-brain-senses-heat-loss.png"
            label="CẢM NHẬN TỐC ĐỘ MẤT NHIỆT TỪ DA"
            x={440}
            y={420}
            width={580}
            rotation={4}
            delay={7}
            tapeStyle="pushpin"
            pinColor="#38bdf8"
            frameStyle="craft-card"
            stampText="🧠 THỤ THỂ DÒNG NHIỆT"
            stampColor="#38bdf8"
            zIndex={20}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 7: Nhiệt rời khỏi tay càng nhanh, bạn càng cảm thấy lạnh */}
      <Sequence from={SCENE_7_START} durationInFrames={SCENE_7_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Mất nhiệt càng nhanh càng thấy lạnh"
            status="NGUYÊN LÝ CẢM BIẾN"
            seqNum="07"
          />
          {/* Large Hero Note with Top Center Tape */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/10-faster-loss-colder.png"
            label="MẤT NHIỆT CÀNG NHANH ➔ CÀNG CẢM THẤY LẠNH"
            x={100}
            y={280}
            width={880}
            rotation={1.5}
            delay={0}
            tapeStyle="top-center"
            frameStyle="polaroid"
            stampText="⚡ TỐC ĐỘ MẤT NHIỆT MAX"
            stampColor="#38bdf8"
            stampDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 8: Trong khi đó, gỗ dẫn nhiệt rất kém */}
      <Sequence from={SCENE_8_START} durationInFrames={SCENE_8_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Gỗ dẫn nhiệt kém, giữ lại hơi ấm"
            status="VẬT LIỆU CÁCH NHIỆT"
            seqNum="08"
          />
          {/* Dual Overlapping Notes with Craft Card and Polaroid */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/11-wood-poor-conductor.png"
            label="GỖ CÁCH NHIỆT TỰ NHIÊN"
            x={70}
            y={300}
            width={570}
            rotation={-4}
            delay={0}
            tapeStyle="side-tapes"
            frameStyle="craft-card"
            stampText="k ≈ 0.15 W/m·K"
            stampColor="#facc15"
            zIndex={10}
          />
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/12-heat-stays-at-contact.png"
            label="NHIỆT TAY ĐƯỢC GIỮ LẠI ĐIỂM CHẠM"
            x={430}
            y={430}
            width={580}
            rotation={4.5}
            delay={7}
            tapeStyle="two-top-corners"
            frameStyle="polaroid"
            stampText="🧤 CẢM GIÁC ẤM ÁP"
            stampColor="#4ade80"
            zIndex={20}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 9: Đảo ngược khi trời nóng - Kim loại ngoài nắng nóng hơn */}
      <Sequence from={SCENE_9_START} durationInFrames={SCENE_9_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="summer-hot" />
          <DashboardCard
            title="Quy luật đảo ngược hoàn toàn khi trời nóng"
            status="MÙA HÈ NẮNG GẮT"
            seqNum="09"
            isHot={true}
          />
          {/* Dual Overlapping Notes with Summer Solar Tapes & Pushpin */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/14-reversal-in-heat.png"
            label="QUY LUẬT ĐẢO NGƯỢC VÀO MÙA NẮNG"
            x={60}
            y={300}
            width={580}
            rotation={-5}
            delay={0}
            tapeStyle="two-top-corners"
            tapeColor="rgba(254, 215, 170, 0.85)"
            frameStyle="polaroid"
            stampText="☀️ 50°C NẮNG GẮT"
            stampColor="#f97316"
            zIndex={10}
          />
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/15-sunlit-metal-feels-hotter.png"
            label="KIM LOẠI TRUYỀN NHIỆT VÀO TAY CỰC NHANH"
            x={440}
            y={420}
            width={580}
            rotation={5}
            delay={7}
            tapeStyle="pushpin"
            pinColor="#ea580c"
            frameStyle="clean-white"
            stampText="🔥 NÓNG RÁT HƠN GỖ"
            stampColor="#ef4444"
            zIndex={20}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 10: Kết luận - Cảm giác không phản ánh đúng nhiệt độ thật */}
      <Sequence from={SCENE_10_START} durationInFrames={SCENE_10_FRAMES}>
        <AbsoluteFill>
          <ThermalInvestigationBackground mode="winter-cold" />
          <DashboardCard
            title="Cảm giác nóng lạnh không phải nhiệt độ thật"
            status="BÀI HỌC KHOA HỌC"
            seqNum="10"
          />
          {/* Large Hero Polaroid with Two Corner Tapes */}
          <ScrapbookPhotoCard
            src="images/metal-wood-heat/17-perception-vs-temperature.png"
            label="CẢM NHẬN XÚC GIÁC VS NHIỆT ĐỘ THỰC TẾ"
            x={100}
            y={280}
            width={880}
            rotation={-1}
            delay={0}
            tapeStyle="two-top-corners"
            frameStyle="polaroid"
            stampText="🧠 TỐC ĐỘ ≠ NHIỆT ĐỘ"
            stampColor="#38bdf8"
            stampDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Subtitles Overlay */}
      <AnimatedCaptions phrases={metalWoodSubtitles} />

      {/* Top Video Progress Bar */}
      <ProgressBar color="#38bdf8" backgroundColor="rgba(255,255,255,0.16)" height={9} />
    </AbsoluteFill>
  );
};
