import React from "react";
import { AbsoluteFill, Composition, Folder, useVideoConfig } from "remotion";
import {
  ContinuousTraXanhNext,
  type TraXanhNextBubbleMoment,
  type TraXanhTimelineSegmentNext,
} from "./components/TraXanhCharacterNext";
import { LeninDisclaimer } from "./components/LeninDisclaimer";

const DEMO_TIMELINE: TraXanhTimelineSegmentNext[] = [
  { from: 0, pose: "vay-chao" },
  { from: 106, pose: "thuyet-minh" },
  { from: 210, pose: "nay-y-tuong" },
];

const DEMO_BUBBLES: TraXanhNextBubbleMoment[] = [
  {
    from: 24,
    durationInFrames: 252,
    kind: "cta",
    eyebrow: "BONG BÓNG CTA MỚI",
    text: "Thấy nội dung hữu ích? Thả tim và đăng ký để gặp lại Trà Xanh nhé!",
  },
];

const CharacterPreview: React.FC = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(circle at 72% 30%, rgba(52, 211, 153, 0.17), transparent 28%), linear-gradient(145deg, #172B2A 0%, #0C1822 56%, #111827 100%)",
        color: "#ECFDF5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: portrait ? "56px 56px" : "64px 64px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 36,
          width: "fit-content",
          padding: portrait ? "12px 22px" : "10px 20px",
          borderRadius: 999,
          color: "#A7F3D0",
          background: "rgba(3, 24, 20, 0.78)",
          border: "1px solid rgba(110, 231, 183, 0.28)",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 0.8,
        }}
      >
        ● CHARACTER MOTION LAB
      </div>

      <div
        style={{
          position: "absolute",
          top: portrait ? 270 : 210,
          left: portrait ? 58 : 96,
          right: portrait ? 58 : 650,
        }}
      >
        <div
          style={{
            color: "rgba(167, 243, 208, 0.72)",
            fontSize: portrait ? 22 : 20,
            fontWeight: 800,
            letterSpacing: 3,
          }}
        >
          OPT-IN · KHÔNG ÁP DỤNG HỒI TỐ
        </div>
        <div
          style={{
            marginTop: 18,
            maxWidth: portrait ? 880 : 990,
            fontSize: portrait ? 72 : 82,
            lineHeight: 1.04,
            fontWeight: 800,
            letterSpacing: -2.2,
          }}
        >
          Nhân vật có nhịp thở. Bong bóng có thứ bậc.
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: portrait ? 820 : 850,
            color: "rgba(226, 232, 240, 0.68)",
            fontSize: portrait ? 26 : 25,
            lineHeight: 1.45,
          }}
        >
          Chuyển pose có quán tính, CTA theo nhịp và tự tránh vùng phụ đề ở
          khung dọc.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: portrait ? 50 : 240,
          right: portrait ? 50 : 240,
          bottom: portrait ? 290 : 44,
          minHeight: portrait ? 92 : 74,
          padding: portrait ? "18px 30px" : "14px 28px",
          borderRadius: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255, 255, 255, 0.5)",
          background: "rgba(3, 7, 18, 0.4)",
          border: "1px dashed rgba(255, 255, 255, 0.16)",
          fontSize: portrait ? 24 : 21,
          fontWeight: 700,
          letterSpacing: 1.8,
        }}
      >
        VÙNG PHỤ ĐỀ — BONG BÓNG KHÔNG CHE KHU VỰC NÀY
      </div>

      <ContinuousTraXanhNext
        timeline={DEMO_TIMELINE}
        bubbleMoments={DEMO_BUBBLES}
        height={180}
        bottom={20}
        right={40}
      />

      <LeninDisclaimer
        text="* Hình ảnh chỉ mang tính chất minh họa"
        bottom={portrait ? 240 : 24}
        left={portrait ? 36 : 40}
      />
    </AbsoluteFill>
  );
};

export const CharacterComponentCompositions: React.FC = () => (
  <Folder name="Character-Next">
    <Composition
      id="TraXanhNextWide"
      component={CharacterPreview}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={300}
    />
    <Composition
      id="TraXanhNextShort"
      component={CharacterPreview}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
    />
  </Folder>
);
