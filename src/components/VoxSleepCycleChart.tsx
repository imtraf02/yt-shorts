import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VoxMarkerCircle } from "./VoxMarkerCircle";

export const VoxSleepCycleChart: React.FC<{
  readonly activePhase?: "all" | "nap20" | "deepSleep30" | "full90";
}> = ({ activePhase = "all" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Animated line drawing progress
  const lineProgress = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pathLength = 1200;
  const strokeDashoffset = (1 - lineProgress) * pathLength;

  // Dot position along the 90m curve based on frame
  const dotProgress = interpolate(frame, [15, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotX = 60 + dotProgress * 800;
  const dotY = 120 + Math.sin(dotProgress * Math.PI) * 240;

  return (
    <div
      style={{
        position: "relative",
        width: 900,
        backgroundColor: "#0A182D", // Deep Navy from reference
        border: "3px solid #FCF6E8", // Clean Cream border
        borderRadius: 24,
        padding: "26px 24px",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85)",
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* Header Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid rgba(252, 246, 232, 0.2)",
          paddingBottom: 14,
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 16,
              fontFamily: "'Courier New', Courier, monospace",
              color: "#F27438", // Terracotta
              letterSpacing: 1.5,
              fontWeight: 900,
            }}
          >
            SƠ ĐỒ CHU KỲ HOẠT ĐỘNG // 90 MINUTES
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: "#FCF6E8",
              marginTop: 4,
              letterSpacing: 0.5,
            }}
          >
            CÁC GIAI ĐOẠN NGỦ & THỜI ĐIỂM THỨC DẬY
          </div>
        </div>
      </div>

      {/* SVG Sleep Graph */}
      <div style={{ position: "relative", width: "100%", height: 380 }}>
        {/* Safe Zone (0-20 mins) Highlight Box */}
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 30,
            width: 170,
            height: 160,
            backgroundColor: "rgba(27, 122, 140, 0.25)",
            border: "2px dashed #5BB2C4",
            borderRadius: 12,
            padding: 8,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: "#FCF6E8",
              backgroundColor: "#1B7A8C",
              padding: "3px 8px",
              borderRadius: 4,
            }}
          >
            0 - 20 PHÚT (AN TOÀN)
          </span>
        </div>

        {/* Danger Zone (30-60 mins) Deep Sleep Box */}
        <div
          style={{
            position: "absolute",
            left: 240,
            top: 150,
            width: 310,
            height: 190,
            backgroundColor: "rgba(242, 116, 56, 0.2)",
            border: "2px dashed #F27438",
            borderRadius: 12,
            padding: 8,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: "#0B1A2F",
              backgroundColor: "#F27438",
              padding: "3px 8px",
              borderRadius: 4,
            }}
          >
            30 - 60 PHÚT (NGỦ SÂU)
          </span>
          <div
            style={{
              fontSize: 17,
              color: "#FCF6E8",
              fontWeight: 800,
              marginTop: 10,
            }}
          >
            ⚠️ Não rơi vào sóng chậm Delta
          </div>
        </div>

        {/* 90 min Full Cycle Box */}
        <div
          style={{
            position: "absolute",
            left: 570,
            top: 30,
            width: 250,
            height: 160,
            backgroundColor: "rgba(91, 178, 196, 0.2)",
            border: "2px dashed #5BB2C4",
            borderRadius: 12,
            padding: 8,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: "#0B1A2F",
              backgroundColor: "#5BB2C4",
              padding: "3px 8px",
              borderRadius: 4,
            }}
          >
            90 PHÚT (TRỌN VẸN)
          </span>
        </div>

        {/* Graph SVG Lines */}
        <svg width="100%" height="100%" viewBox="0 0 900 360">
          {/* Grid Horizontal Guidelines */}
          <line x1="50" y1="70" x2="840" y2="70" stroke="rgba(252,246,232,0.12)" strokeDasharray="4 4" />
          <line x1="50" y1="160" x2="840" y2="160" stroke="rgba(252,246,232,0.12)" strokeDasharray="4 4" />
          <line x1="50" y1="310" x2="840" y2="310" stroke="rgba(252,246,232,0.12)" strokeDasharray="4 4" />

          {/* Y Axis Labels */}
          <text x="15" y="75" fill="#5BB2C4" fontSize="15" fontFamily="'Courier New', monospace" fontWeight="bold">TỈNH</text>
          <text x="15" y="165" fill="#5BB2C4" fontSize="15" fontFamily="'Courier New', monospace" fontWeight="bold">NÔNG</text>
          <text x="15" y="315" fill="#F27438" fontSize="15" fontFamily="'Courier New', monospace" fontWeight="bold">SÂU</text>

          {/* Animated Sleep Wave Curve in Terracotta Orange */}
          <path
            d="M 60 70 Q 150 110 220 180 T 400 330 T 560 330 T 710 180 T 830 80"
            fill="none"
            stroke="#F27438"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
            style={{ filter: "drop-shadow(0 0 10px rgba(242, 116, 56, 0.6))" }}
          />

          {/* Animated Tracker Dot in Cream */}
          <circle
            cx={dotX}
            cy={dotY - 10}
            r="12"
            fill="#FCF6E8"
            stroke="#F27438"
            strokeWidth="5"
            style={{ filter: "drop-shadow(0 0 10px #F27438)" }}
          />
        </svg>

        {/* Active Stage Callout Marker */}
        {activePhase === "nap20" && (
          <div style={{ position: "absolute", left: 65, top: 75 }}>
            <VoxMarkerCircle width={180} height={70} color="#5BB2C4" startFrame={5} />
          </div>
        )}
        {activePhase === "deepSleep30" && (
          <div style={{ position: "absolute", left: 255, top: 190 }}>
            <VoxMarkerCircle width={280} height={100} color="#F27438" startFrame={5} />
          </div>
        )}
        {activePhase === "full90" && (
          <div style={{ position: "absolute", left: 585, top: 75 }}>
            <VoxMarkerCircle width={220} height={80} color="#5BB2C4" startFrame={5} />
          </div>
        )}
      </div>

      {/* Timeline Footnote (0m, 20m, 30m, 60m, 90m) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 30px 0 50px",
          color: "#FCF6E8",
          fontSize: 18,
          fontFamily: "'Courier New', monospace",
          fontWeight: 800,
        }}
      >
        <span>0 PHÚT</span>
        <span style={{ color: "#5BB2C4" }}>20 PHÚT (NAP)</span>
        <span style={{ color: "#F27438" }}>30 PHÚT (NGỦ SÂU)</span>
        <span>60 PHÚT</span>
        <span style={{ color: "#5BB2C4" }}>90 PHÚT (TRỌN VẸN)</span>
      </div>
    </div>
  );
};
