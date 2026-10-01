import React from "react";
import { interpolate, Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
});

interface AiBadgeInterval {
  startFrame: number;
  durationFrames: number;
  title: string;
  subtitle: string;
}

const BADGE_INTERVALS: AiBadgeInterval[] = [
  {
    startFrame: 500,
    durationFrames: 210, // 7s
    title: "LƯU Ý CỔ SINH VẬT HỌC · MINH HỌA TÁI HIỆN BỞI AI",
    subtitle:
      "Hình ảnh phục dựng thế giới tiền sử kỷ Trung sinh mang tính chất ước lệ khoa học & trực quan",
  },
  {
    startFrame: 4800,
    durationFrames: 210,
    title: "TƯ LIỆU CỔ SINH · HÌNH ẢNH MINH HỌA AI",
    subtitle:
      "Hình thái các nhóm khủng long được tái hiện dựa trên bằng chứng hóa thạch & giải phẫu học",
  },
  {
    startFrame: 10800,
    durationFrames: 210,
    title: "HỒ SƠ TIỀN SỬ · TÁI HIỆN ĐẠI KỶ TRUNG SINH",
    subtitle:
      "Môi trường sinh thái và tập tính bầy đàn được mô phỏng nhằm hỗ trợ cảm nhận không gian cổ đại",
  },
  {
    startFrame: 18000,
    durationFrames: 210,
    title: "TIẾN HÓA & PHÒNG THỦ · TƯ LIỆU KHOA HỌC",
    subtitle:
      "Cấu trúc giáp xương, sừng và vũ khí tự vệ được phục dựng theo các nghiên cứu cổ sinh vật học",
  },
  {
    startFrame: 25000,
    durationFrames: 210,
    title: "ĐẠI TUYỆT CHỦNG K-PG · MÔ PHỎNG BIẾN CỐ",
    subtitle:
      "Khoảnh khắc va chạm thiên thạch và thảm họa địa chất được tái hiện theo tư liệu ranh giới K-Pg",
  },
];

export const DinosaurAiDisclaimerBadge: React.FC<{ globalFrame: number }> = ({
  globalFrame,
}) => {
  const activeInterval = BADGE_INTERVALS.find(
    (b) =>
      globalFrame >= b.startFrame &&
      globalFrame < b.startFrame + b.durationFrames
  );

  if (!activeInterval) {
    return null;
  }

  const localFrame = globalFrame - activeInterval.startFrame;
  const dur = activeInterval.durationFrames;
  const FADE_IN = 20;
  const FADE_OUT = 20;

  let opacity = 1;
  let translateY = 0;

  if (localFrame < FADE_IN) {
    opacity = interpolate(localFrame, [0, FADE_IN], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    translateY = interpolate(localFrame, [0, FADE_IN], [15, 0], {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (localFrame > dur - FADE_OUT) {
    opacity = interpolate(localFrame, [dur - FADE_OUT, dur], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    translateY = interpolate(localFrame, [dur - FADE_OUT, dur], [0, 10], {
      easing: Easing.in(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 54,
        zIndex: 40,
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: "none",
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 16px",
          backgroundColor: "rgba(10, 6, 4, 0.88)",
          borderRadius: 10,
          border: "1px solid rgba(245, 158, 11, 0.4)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(245, 158, 11, 0.15)",
          backdropFilter: "blur(8px)",
          maxWidth: 620,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            border: "1px solid rgba(245, 158, 11, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 14,
            color: "#fbbf24",
          }}
        >
          ✦
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "#fbbf24",
              textTransform: "uppercase",
            }}
          >
            {activeInterval.title}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#e2e8f0",
              lineHeight: 1.35,
            }}
          >
            {activeInterval.subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};
