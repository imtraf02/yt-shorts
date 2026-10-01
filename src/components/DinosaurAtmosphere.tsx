import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// 42 hạt bụi phấn cổ sinh / tàn tro núi lửa / bào tử dương xỉ nguyên thủy trôi lơ lửng
const PREHISTORIC_MOTES = Array.from({ length: 42 }, (_, index) => ({
  x: (index * 47) % 1920,
  size: 3 + ((index * 5) % 6),
  speedY: 0.4 + ((index * 7) % 12) / 10,
  speedX: 0.2 + ((index * 3) % 8) / 10,
  delay: (index * 83) % 1200,
  drift: 16 + ((index * 11) % 24),
  phase: index * 0.62,
  baseOpacity: 0.22 + ((index * 3) % 6) / 16,
  isEmber: index % 4 === 0,
  isAmber: index % 4 === 1,
  isSpore: index % 4 === 2,
}));

export const DinosaurAtmosphere: React.FC = () => {
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
      {/* 1. Lớp bụi bào tử kỷ Jura & tàn tro núi lửa nguyên thủy lơ lửng */}
      {PREHISTORIC_MOTES.map((p, index) => {
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

        const color = p.isEmber
          ? "#f97316" // Tàn tro núi lửa / lửa nguyên thủy
          : p.isAmber
          ? "#f59e0b" // Hổ phách hóa thạch (Amber)
          : p.isSpore
          ? "#10b981" // Bào tử rừng dương xỉ cổ đại
          : "#fef08a"; // Bụi nắng nguyên sinh

        const shadowColor = p.isEmber
          ? "rgba(249, 115, 22, 0.85)"
          : p.isAmber
          ? "rgba(245, 158, 11, 0.8)"
          : p.isSpore
          ? "rgba(16, 185, 129, 0.75)"
          : "rgba(254, 240, 138, 0.6)";

        return (
          <div
            key={`prehistoric-mote-${index}`}
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

      {/* 2. Ánh rực hoàng hôn / nguyên sinh nhẹ nhàng hai góc trên */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 180,
          background:
            "linear-gradient(180deg, rgba(245, 158, 11, 0.07) 0%, transparent 100%)",
        }}
      />
    </div>
  );
};
