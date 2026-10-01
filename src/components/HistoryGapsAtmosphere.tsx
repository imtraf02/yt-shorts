import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// 36 hạt bụi thời gian / tàn tích khảo cổ / ánh vàng cổ xưa lơ lửng
const ARCHAEOLOGY_MOTES = Array.from({ length: 36 }, (_, index) => ({
  x: (index * 59) % 1920,
  size: 3 + ((index * 5) % 5),
  speedY: 0.4 + ((index * 7) % 10) / 10,
  speedX: 0.2 + ((index * 3) % 8) / 10,
  delay: (index * 83) % 1200,
  drift: 16 + ((index * 11) % 22),
  phase: index * 0.62,
  baseOpacity: 0.22 + ((index * 3) % 5) / 15,
  isBronze: index % 3 === 0,
  isGold: index % 3 === 1,
}));

export const HistoryGapsAtmosphere: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {/* 1. Lớp bụi trầm tích thời gian & ánh vàng đồng cổ xưa lơ lửng */}
      {ARCHAEOLOGY_MOTES.map((p, index) => {
        const y = 1120 - ((frame * p.speedY + p.delay) % 1200);
        const x =
          (p.x + frame * p.speedX + Math.sin(frame * 0.02 + p.phase) * p.drift) %
          1940;

        const edgeFade = interpolate(
          y,
          [0, 100, 980, 1080],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const color = p.isBronze
          ? "#f59e0b" // Đồng thau & Đất nung Harappa
          : p.isGold
          ? "#fbbf24" // Vàng kim cổ đại Phù Nam
          : "#e2e8f0"; // Bụi thời gian & sương khói

        const shadowColor = p.isBronze
          ? "rgba(245, 158, 11, 0.75)"
          : p.isGold
          ? "rgba(251, 191, 36, 0.75)"
          : "rgba(226, 232, 240, 0.45)";

        return (
          <div
            key={`arch-mote-${index}`}
            style={{
              position: "absolute",
              left: x - 20,
              top: y - 20,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: p.baseOpacity * edgeFade,
              boxShadow: `0 0 10px ${shadowColor}`,
            }}
          />
        );
      })}

      {/* 2. Ánh hào quang ấm áp góc trên - không khí điện ảnh tài liệu lịch sử */}
      <div
        style={{
          position: "absolute",
          top: -220,
          left: "22%",
          width: 950,
          height: 520,
          background:
            "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.04) 55%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};
