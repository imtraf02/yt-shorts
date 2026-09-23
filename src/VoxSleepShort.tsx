import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadBeVietnamPro } from "@remotion/google-fonts/BeVietnamPro";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";
import { AnimatedCaptions } from "./components/AnimatedCaptions";
import { AnimatedResearchBackground } from "./components/AnimatedResearchBackground";
import { ProgressBar } from "./components/ProgressBar";
import { phrases } from "./data/subtitles";

// Load Vietnamese fonts with full diacritic support
const { fontFamily: beVietnamFont } = loadBeVietnamPro("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["600", "700"],
  subsets: ["vietnamese", "latin"],
});

const FPS = 30;

// Top Dashboard Header with enlarged typography & clear safe-zone margins
const DashboardCard: React.FC<{
  readonly title: string;
  readonly status: string;
  readonly seqNum?: string;
}> = ({ title, status, seqNum = "01" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 110,
        left: 60,
        right: 60,
        zIndex: 40,
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
            color: "#d8b4fe",
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
              backgroundColor: "#c084fc",
              boxShadow: "0 0 16px #c084fc",
            }}
          />
          {status}
        </div>

        <div
          style={{
            padding: "8px 20px",
            border: "1.5px solid rgba(192, 132, 252, 0.8)",
            backgroundColor: "rgba(35, 15, 65, 0.85)",
            color: "#f3e8ff",
            fontFamily: robotoMonoFont,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1.5,
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(168, 85, 247, 0.4)",
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
          fontSize: 52,
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

// UI Element 1: Vintage Polaroid Photo Card with bold 26px+ label and customizable aspect ratio
const PinnedPolaroid: React.FC<{
  readonly src: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly rotation: number;
  readonly delay?: number;
  readonly accentColor?: string;
  readonly aspectRatio?: string;
}> = ({
  src,
  label,
  x,
  y,
  width,
  rotation,
  delay = 0,
  accentColor = "#a855f7",
  aspectRatio = "16 / 10",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 150 },
  });
  const bob = Math.sin((frame + delay * 4) * 0.045) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex: 8 + delay,
        opacity: appear,
        scale: interpolate(appear, [0, 1], [0.85, 1]),
        translate: `0 ${interpolate(appear, [0, 1], [40, 0]) + bob}px`,
        rotate: `${rotation}deg`,
        transformOrigin: "center center",
        filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.75))",
      }}
    >
      {/* Scotch Tape */}
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          left: "50%",
          top: -18,
          width: 150,
          height: 38,
          translate: "-50% 0",
          rotate: `${rotation * -0.35}deg`,
          backgroundColor: "rgba(250, 231, 122, 0.82)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      />
      {/* Paper frame */}
      <div
        style={{
          padding: 16,
          backgroundColor: "#faf8f2",
          border: "6px solid #fefcf7",
          borderRadius: 6,
          boxShadow: `inset 0 0 0 2px ${accentColor}45, 0 12px 32px rgba(0,0,0,0.4)`,
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio,
            overflow: "hidden",
            backgroundColor: "#e8dfd1",
            borderRadius: 4,
          }}
        >
          <Img
            src={staticFile(src)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            padding: "16px 8px 6px",
            color: "#18181b",
            fontFamily: beVietnamFont,
            textAlign: "center",
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 0.8,
            lineHeight: 1.25,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

// UI Element 2: Clinical Science Callout Card (Used in Scene 1 to balance vertical space)
const ScienceMemoBanner: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly delay?: number;
}> = ({ x, y, width, delay = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex: 15,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [35, 0])}px)`,
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))",
        backgroundColor: "rgba(15, 23, 42, 0.96)",
        border: "2.5px solid #38bdf8",
        borderRadius: 12,
        padding: "20px 24px",
        fontFamily: beVietnamFont,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1.5px solid rgba(56, 189, 248, 0.35)",
          paddingBottom: 10,
          marginBottom: 12,
        }}
      >
        <span style={{ color: "#38bdf8", fontSize: 24, fontWeight: 900, letterSpacing: 1 }}>
          NGHIÊN CỨU GIẤC NGỦ // Y HỌC
        </span>
        <span style={{ color: "#94a3b8", fontSize: 16, fontFamily: robotoMonoFont, fontWeight: 700 }}>
          CLINICAL STUDY
        </span>
      </div>

      <div style={{ fontSize: 24, color: "#f1f5f9", lineHeight: 1.45, marginBottom: 14 }}>
        Ngủ quá sâu vào buổi trưa khiến não bộ rơi vào quán tính ngủ sâu, làm cơ thể mệt mỏi và giảm hiệu suất suốt buổi chiều.
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "1px solid #38bdf8",
            borderRadius: 8,
            padding: "10px 14px",
            textAlign: "center",
            fontSize: 20,
            fontWeight: 800,
            color: "#38bdf8",
          }}
        >
          ⏱️ MỐC CHUẨN: 15 - 20 PHÚT
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(234, 179, 8, 0.15)",
            border: "1px solid #eab308",
            borderRadius: 8,
            padding: "10px 14px",
            textAlign: "center",
            fontSize: 20,
            fontWeight: 800,
            color: "#fde047",
          }}
        >
          ⚡ NẠP LẠI NĂNG LƯỢNG NHANH
        </div>
      </div>
    </div>
  );
};

// UI Element 3: Full-width Medical Caution Memo Card (Used in Scene 2)
const CautionMemoCard: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly delay?: number;
}> = ({ x, y, width, delay = 10 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex: 15,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [35, 0])}px)`,
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))",
        backgroundColor: "rgba(24, 18, 12, 0.96)",
        border: "2.5px solid #facc15",
        borderRadius: 12,
        padding: "22px 26px",
        fontFamily: beVietnamFont,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderBottom: "1.5px solid rgba(250, 204, 21, 0.4)",
          paddingBottom: 12,
          marginBottom: 16,
        }}
      >
        <Img
          src={staticFile("images/note-collage/10-caution.png")}
          style={{ width: 52, height: 52, objectFit: "contain" }}
        />
        <div>
          <div style={{ color: "#facc15", fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>
            CẢNH BÁO Y KHOA: SLEEP INERTIA
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 18, fontFamily: robotoMonoFont, fontWeight: 700 }}>
            QUÁN TÍNH GIẤC NGỦ // TRẠNG THÁI LAG NÃO
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#f8fafc", marginBottom: 6 }}>
            <span>Tốc độ phản xạ:</span>
            <span style={{ color: "#ef4444", fontWeight: 900, fontSize: 30 }}>GIẢM -35%</span>
          </div>
          <div style={{ width: "100%", height: 12, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: "35%", height: "100%", backgroundColor: "#ef4444" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#f8fafc" }}>
          <span>Trạng thái não bộ:</span>
          <span style={{ color: "#facc15", fontWeight: 900, fontSize: 28 }}>CHẬM KHỞI ĐỘNG</span>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#e2e8f0",
            lineHeight: 1.45,
            paddingTop: 8,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Cơ thể đã thức dậy nhưng não vẫn còn kẹt trong pha sóng chậm Delta, gây choáng váng từ 15-30 phút.
        </div>
      </div>
    </div>
  );
};

// UI Element 4: Large Widescreen Infographic Card (Used in Scene 3)
const WideInfographicCard: React.FC<{
  readonly src: string;
  readonly title: string;
  readonly subtitle: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly delay?: number;
}> = ({ src, title, subtitle, x, y, width, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex: 12,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
        filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.75))",
        backgroundColor: "rgba(11, 18, 32, 0.96)",
        border: "2.5px solid rgba(56, 189, 248, 0.8)",
        borderRadius: 14,
        overflow: "hidden",
        fontFamily: beVietnamFont,
      }}
    >
      <div
        style={{
          padding: "16px 22px",
          backgroundColor: "rgba(56, 189, 248, 0.18)",
          borderBottom: "1.5px solid rgba(56, 189, 248, 0.45)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#38bdf8", fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>
          {title}
        </span>
        <span style={{ color: "#cbd5e1", fontSize: 18, fontFamily: robotoMonoFont, fontWeight: 700 }}>
          CHU KỲ 90 PHÚT
        </span>
      </div>

      <div style={{ width: "100%", height: 380, overflow: "hidden", position: "relative" }}>
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: "18px 22px", color: "#f1f5f9", fontSize: 24, fontWeight: 700, lineHeight: 1.4 }}>
        {subtitle}
      </div>
    </div>
  );
};

// UI Element 5: Brainwave Comparison Card (Used in Scene 3 below the chart)
const BrainwaveCompareCard: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly delay?: number;
}> = ({ x, y, width, delay = 12 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex: 14,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [35, 0])}px)`,
        backgroundColor: "rgba(18, 12, 34, 0.96)",
        border: "2.5px solid #a855f7",
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        gap: 22,
        alignItems: "center",
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))",
        fontFamily: beVietnamFont,
      }}
    >
      <div style={{ width: 180, height: 180, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
        <Img
          src={staticFile("images/note-collage/04-deep-sleep-brain.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#c084fc", fontSize: 24, fontWeight: 900, marginBottom: 6 }}>
          GIAI ĐOẠN SÓNG CHẬM (N3)
        </div>
        <div style={{ fontSize: 22, color: "#e2e8f0", lineHeight: 1.4, marginBottom: 10 }}>
          Sóng não biến đổi sâu, tần số giảm mạnh. Thức giấc lúc này sẽ kích hoạt cơn uể oải tồi tệ nhất.
        </div>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(239, 68, 68, 0.18)",
            border: "1px solid #ef4444",
            padding: "4px 10px",
            borderRadius: 6,
            color: "#fca5a5",
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          ⚠️ Pha khó đánh thức nhất chu kỳ
        </div>
      </div>
    </div>
  );
};

// UI Element 6: Chemical / Brain Repair Diagnostic Card (Used in Scene 4)
const SystemStatusCard: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly delay?: number;
}> = ({ x, y, width, delay = 12 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex: 14,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
        backgroundColor: "rgba(18, 12, 30, 0.96)",
        border: "2.5px solid #a855f7",
        borderRadius: 12,
        padding: "22px 26px",
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))",
        fontFamily: beVietnamFont,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: "#c084fc", fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>
          TRẠNG THÁI PHỤC HỒI NÃO BỘ
        </div>
        <div style={{ color: "#facc15", fontSize: 18, fontFamily: robotoMonoFont, fontWeight: 700 }}>
          STAGE: DEEP SLEEP (N3)
        </div>
      </div>

      <div style={{ fontSize: 24, color: "#f1f5f9", lineHeight: 1.45, marginBottom: 14 }}>
        Sóng não chậm lại để hệ thống glymphatic quét sạch phân tử gây buồn ngủ Adenosine tích tụ.
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#cbd5e1", marginBottom: 6 }}>
        <span>Xóa phân tử Adenosine:</span>
        <span style={{ color: "#38bdf8", fontWeight: 800, fontSize: 24 }}>ĐANG TIẾN HÀNH (65%)</span>
      </div>
      <div style={{ width: "100%", height: 14, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 7, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ width: "65%", height: "100%", backgroundColor: "#a855f7" }} />
      </div>

      <div style={{ color: "#fde047", fontSize: 22, fontWeight: 700 }}>
        ⚡ Thức dậy lúc này tương tự việc đột ngột rút điện máy tính khi đang cập nhật hệ thống!
      </div>
    </div>
  );
};

// UI Element 7: Cognitive Latency Panel (Used in Scene 5)
const CognitiveTelemetryCard: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly delay?: number;
}> = ({ x, y, width, delay = 10 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        backgroundColor: "rgba(15, 23, 42, 0.96)",
        border: "2.5px solid #ef4444",
        borderRadius: 12,
        padding: "22px 26px",
        fontFamily: beVietnamFont,
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))",
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
        zIndex: 16,
      }}
    >
      <div style={{ color: "#fca5a5", fontSize: 26, fontWeight: 900, marginBottom: 14, letterSpacing: 1 }}>
        ĐO LƯỜNG TÁC ĐỘNG NHẬN THỨC // DATA TEST
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 24, color: "#e2e8f0" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>Tốc độ xử lý thông tin:</span>
            <span style={{ color: "#ef4444", fontWeight: 900, fontSize: 28 }}>CHẬM HƠN 40%</span>
          </div>
          <div style={{ height: 12, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: "40%", height: "100%", backgroundColor: "#ef4444" }} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>Khả năng tập trung chú ý:</span>
            <span style={{ color: "#facc15", fontWeight: 900, fontSize: 28 }}>GIẢM ĐỘT NGỘT</span>
          </div>
          <div style={{ height: 12, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: "30%", height: "100%", backgroundColor: "#facc15" }} />
          </div>
        </div>

        <div style={{ paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 22, color: "#cbd5e1" }}>
          ⏱️ Thời gian hồi phục: Cần <strong>15 - 30 phút</strong> để vỏ não tái kích hoạt toàn diện.
        </div>
      </div>
    </div>
  );
};

// UI Element 8: Side-by-Side Dual Choice Comparison with large typography (Used in Scene 6)
const DualChoiceComparison: React.FC<{
  readonly delay?: number;
}> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 340,
        left: 60,
        right: 60,
        zIndex: 20,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: beVietnamFont,
      }}
    >
      {/* 2 Options Row */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        {/* Option A: 20 Phút */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(10, 24, 38, 0.96)",
            border: "2.5px solid #38bdf8",
            borderRadius: 14,
            padding: 18,
            filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.65))",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.22)",
              color: "#38bdf8",
              fontSize: 18,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 6,
              textAlign: "center",
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            LỰA CHỌN 1 // POWER NAP
          </div>

          <div style={{ height: 250, overflow: "hidden", borderRadius: 8, marginBottom: 14 }}>
            <Img
              src={staticFile("images/note-collage/08-short-nap-clock.png")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ textAlign: "center", color: "#ffffff", fontSize: 40, fontWeight: 900 }}>
            20 PHÚT
          </div>
          <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 22, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>
            Tỉnh táo ngay, không chạm ngủ sâu
          </div>
        </div>

        {/* Option B: 90 Phút */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(24, 12, 38, 0.96)",
            border: "2.5px solid #a855f7",
            borderRadius: 14,
            padding: 18,
            filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.65))",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.22)",
              color: "#c084fc",
              fontSize: 18,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 6,
              textAlign: "center",
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            LỰA CHỌN 2 // FULL CYCLE
          </div>

          <div style={{ height: 250, overflow: "hidden", borderRadius: 8, marginBottom: 14 }}>
            <Img
              src={staticFile("images/note-collage/09-full-cycle.png")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ textAlign: "center", color: "#ffffff", fontSize: 40, fontWeight: 900 }}>
            90 PHÚT
          </div>
          <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 22, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>
            Trọn 1 chu kỳ, não phục hồi tối đa
          </div>
        </div>
      </div>

      {/* Danger Warning Banner */}
      <div
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "2px solid #ef4444",
          borderRadius: 10,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 36 }}>⚠️</span>
        <div style={{ color: "#fecaca", fontSize: 24, fontWeight: 800, lineHeight: 1.35 }}>
          KHUYẾN CÁO: Tránh ngủ từ 30 - 60 phút vì rất dễ rơi vào vùng ngủ sâu và thức dậy trong trạng thái uể oải!
        </div>
      </div>

      {/* Coffee Nap Pro-Tip Banner */}
      <div
        style={{
          backgroundColor: "rgba(234, 179, 8, 0.16)",
          border: "1.5px solid #eab308",
          borderRadius: 10,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 32 }}>☕</span>
        <div style={{ color: "#fde047", fontSize: 22, fontWeight: 800, lineHeight: 1.35 }}>
          MẸO NHANH: Uống 1 ngụm cà phê trước khi ngủ 20 phút (Coffee Nap) để nhân đôi hiệu quả tỉnh táo!
        </div>
      </div>
    </div>
  );
};

const SPEED = 1.12;
const scaleSec = (sec: number) => Math.round((sec * FPS) / SPEED);

const SCENE_1_FRAMES = scaleSec(15);
const SCENE_2_FRAMES = scaleSec(12);
const SCENE_3_FRAMES = scaleSec(23);
const SCENE_4_FRAMES = scaleSec(17);
const SCENE_5_FRAMES = scaleSec(15);
const SCENE_6_FRAMES =
  2650 -
  (SCENE_1_FRAMES +
    SCENE_2_FRAMES +
    SCENE_3_FRAMES +
    SCENE_4_FRAMES +
    SCENE_5_FRAMES);

const SCENE_1_START = 0;
const SCENE_2_START = SCENE_1_START + SCENE_1_FRAMES;
const SCENE_3_START = SCENE_2_START + SCENE_2_FRAMES;
const SCENE_4_START = SCENE_3_START + SCENE_3_FRAMES;
const SCENE_5_START = SCENE_4_START + SCENE_4_FRAMES;
const SCENE_6_START = SCENE_5_START + SCENE_5_FRAMES;

export const VoxSleepShort: React.FC = () => {
  return (
    <AbsoluteFill>
      <AnimatedResearchBackground />
      <Audio src={staticFile("audio/sleep-nap.wav")} volume={1} />

      {/* SCENE 1: Giấc ngủ trưa - Ngủ lâu chưa chắc tỉnh */}
      <Sequence durationInFrames={SCENE_1_FRAMES}>
        <AbsoluteFill>
          <DashboardCard
            title="Ngủ lâu hơn chưa chắc tỉnh hơn"
            status="GIẤC NGỦ TRƯA"
            seqNum="01"
          />
          {/* Note 1: Desk nap */}
          <PinnedPolaroid
            src="images/note-collage/01-desk-nap.png"
            label="GIẤC NGỦ GIỮA NGÀY"
            x={60}
            y={320}
            width={520}
            rotation={-3}
            delay={0}
            accentColor="#facc15"
            aspectRatio="4 / 3"
          />
          {/* Note 2: Alarm coffee */}
          <PinnedPolaroid
            src="images/note-collage/02-alarm-coffee.png"
            label="TỈNH DẬY UỂ OẢI"
            x={570}
            y={350}
            width={450}
            rotation={4}
            delay={10}
            accentColor="#a855f7"
            aspectRatio="4 / 3"
          />
          {/* Clinical Science Callout Card */}
          <ScienceMemoBanner x={60} y={870} width={960} delay={18} />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 2: Tỉnh dậy giữa chừng - Cảm giác choáng váng */}
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_FRAMES}>
        <AbsoluteFill>
          <DashboardCard
            title="Bạn có thể thấy mệt hơn trước khi ngủ"
            status="TỈNH DẬY GIỮA CHỪNG"
            seqNum="02"
          />
          {/* Hero Note: Groggy wake (Enlarged & Prominent with 16/10 aspect ratio) */}
          <PinnedPolaroid
            src="images/note-collage/06-groggy-wake.png"
            label="CẢM GIÁC CHOÁNG VÁNG"
            x={200}
            y={320}
            width={680}
            rotation={-2}
            delay={0}
            accentColor="#a855f7"
            aspectRatio="16 / 10"
          />
          {/* Full-width Medical Caution Memo Card */}
          <CautionMemoCard x={60} y={870} width={960} delay={10} />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 3: Chu kỳ giấc ngủ - Các tầng ngủ */}
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_FRAMES}>
        <AbsoluteFill>
          <DashboardCard
            title="Cơ thể đi qua nhiều tầng ngủ khác nhau"
            status="CHU KỲ GIẤC NGỦ"
            seqNum="03"
          />
          {/* Full Widescreen Cycle Chart */}
          <WideInfographicCard
            src="images/note-collage/03-cycle-wave.png"
            title="SƠ ĐỒ CHU KỲ 90 PHÚT"
            subtitle="Ru ngủ ➔ Ngủ nông ➔ Ngủ sâu (N3) ➔ Giấc ngủ mơ (REM)"
            x={60}
            y={330}
            width={960}
            delay={0}
          />
          {/* Brainwave Comparison Card */}
          <BrainwaveCompareCard x={60} y={900} width={960} delay={12} />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 4: Giấc ngủ sâu - Phục hồi não */}
      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_FRAMES}>
        <AbsoluteFill>
          <DashboardCard
            title="Não đang phục hồi khi bạn ngủ sâu"
            status="GIẤC NGỦ SÂU"
            seqNum="04"
          />
          {/* Unplugged Computer */}
          <PinnedPolaroid
            src="images/note-collage/05-unplugged-computer.png"
            label="NGẮT ĐIỆN ĐỘT NGỘT"
            x={60}
            y={320}
            width={465}
            rotation={-3}
            delay={0}
            accentColor="#facc15"
            aspectRatio="4 / 3"
          />
          {/* Adenosine molecule */}
          <PinnedPolaroid
            src="images/note-collage/07-adenosine.png"
            label="PHÂN TỬ ADENOSINE"
            x={555}
            y={320}
            width={465}
            rotation={3}
            delay={10}
            accentColor="#38bdf8"
            aspectRatio="4 / 3"
          />
          {/* System Status Diagnostic Card */}
          <SystemStatusCard x={60} y={860} width={960} delay={18} />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 5: Quán tính giấc ngủ - Phản xạ chậm */}
      <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_FRAMES}>
        <AbsoluteFill>
          <DashboardCard
            title="Phản xạ có thể chậm đi sau giấc ngủ dài"
            status="QUÁN TÍNH GIẤC NGỦ"
            seqNum="05"
          />
          {/* Hero Polaroid Card */}
          <PinnedPolaroid
            src="images/vox-nap/02-sleep-inertia.png"
            label="HIỆU ỨNG LAG NÃO BỘ (SLEEP INERTIA)"
            x={200}
            y={320}
            width={680}
            rotation={-2}
            delay={0}
            accentColor="#a855f7"
            aspectRatio="16 / 10"
          />
          {/* Full-width Cognitive Latency Panel */}
          <CognitiveTelemetryCard x={60} y={870} width={960} delay={10} />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 6: Mốc ngủ trưa - Lựa chọn tối ưu */}
      <Sequence from={SCENE_6_START} durationInFrames={SCENE_6_FRAMES}>
        <AbsoluteFill>
          <DashboardCard
            title="Chọn ngủ ngắn hoặc ngủ trọn một chu kỳ"
            status="MỐC NGỦ TRƯA TỐI ƯU"
            seqNum="06"
          />
          <DualChoiceComparison delay={0} />
        </AbsoluteFill>
      </Sequence>

      <AnimatedCaptions phrases={phrases} />
      <ProgressBar color="#a855f7" backgroundColor="rgba(255,255,255,0.16)" height={9} />
    </AbsoluteFill>
  );
};
