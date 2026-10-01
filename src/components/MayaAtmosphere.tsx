import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// 36 hạt bụi phấn rừng già / bào tử xanh ngọc bích / tàn tích cổ xưa trôi lơ lửng nhẹ
const JUNGLE_MOTES = Array.from({ length: 36 }, (_, index) => ({
  x: (index * 57) % 1920,
  size: 3 + ((index * 5) % 5),
  speedY: 0.5 + ((index * 7) % 12) / 10,
  speedX: 0.2 + ((index * 3) % 8) / 10,
  delay: (index * 91) % 1200,
  drift: 18 + ((index * 11) % 20),
  phase: index * 0.58,
  baseOpacity: 0.20 + ((index * 3) % 5) / 15,
  isJade: index % 3 === 0,
  isGold: index % 3 === 1,
}));

export const MayaAtmosphere: React.FC = () => {
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
      {/* 1. Lớp bụi phấn rừng nhiệt đới & đốm sáng ngọc bích lơ lửng */}
      {JUNGLE_MOTES.map((p, index) => {
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

        const color = p.isJade
          ? "#34d399" // Ngọc bích Maya (Jade)
          : p.isGold
          ? "#fbbf24" // Vàng kim cổ đại
          : "#e2e8f0"; // Ánh sương rừng

        const shadowColor = p.isJade
          ? "rgba(52, 211, 153, 0.8)"
          : p.isGold
          ? "rgba(251, 191, 36, 0.7)"
          : "rgba(226, 232, 240, 0.5)";

        return (
          <div
            key={`jungle-mote-${index}`}
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
              filter: "blur(0.5px)",
            }}
          />
        );
      })}

      {/* 2. Luồng sáng mặt trời xuyên qua tán rừng già nhiệt đới (Canopy Godrays) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(125deg, rgba(52, 211, 153, 0.02) 0%, transparent 45%, rgba(251, 191, 36, 0.025) 75%, transparent 100%)",
          transform: `translateX(${interpolate(
            frame % 300,
            [0, 300],
            [-150, 150]
          )}px)`,
        }}
      />
    </div>
  );
};
