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
    durationFrames: 210, // 7 giây
    title: "LƯU Ý TƯ LIỆU · MINH HỌA TÁI HIỆN BỞI AI",
    subtitle:
      "Hình ảnh chỉ mang tính chất minh họa ước lệ & tham khảo lịch sử",
  },
  {
    startFrame: 4800,
    durationFrames: 210,
    title: "TƯ LIỆU NGHỆ THUẬT · MINH HỌA AI",
    subtitle:
      "Hình ảnh chỉ mang tính chất minh họa không gian khảo cổ cổ đại",
  },
  {
    startFrame: 10800,
    durationFrames: 210,
    title: "KHẢO CỔ HỌC · MINH HỌA BỐI CẢNH",
    subtitle:
      "Hình ảnh chỉ mang tính chất minh họa nhằm hỗ trợ cảm nhận tư liệu lịch sử",
  },
  {
    startFrame: 16800,
    durationFrames: 210,
    title: "TÁI HIỆN TRỰC QUAN · KHÔNG GIAN CỔ ĐẠI",
    subtitle:
      "Hình ảnh chỉ mang tính chất minh họa nội dung & giả thuyết nghiên cứu",
  },
  {
    startFrame: 22800,
    durationFrames: 210,
    title: "VĂN MINH CỔ ĐẠI · TƯ LIỆU THAM KHẢO",
    subtitle:
      "Hình ảnh chỉ mang tính chất minh họa trực quan bối cảnh thương mại & đô thị xưa",
  },
  {
    startFrame: 28800,
    durationFrames: 210,
    title: "DI SẢN LỊCH SỬ · TƯ LIỆU THAM KHẢO",
    subtitle:
      "Hình ảnh chỉ mang tính chất minh họa giúp người xem hình dung trọn vẹn dòng chảy lịch sử",
  },
];

export const DocumentaryAiDisclaimerBadge: React.FC<{ globalFrame: number }> = ({
  globalFrame,
}) => {
  // Tìm xem frame hiện tại có rơi vào khoảng xuất hiện nào không
  const activeInterval = BADGE_INTERVALS.find(
    (b) =>
      globalFrame >= b.startFrame &&
      globalFrame < b.startFrame + b.durationFrames
  );

  if (!activeInterval) return null;

  const localFrame = globalFrame - activeInterval.startFrame;
  const dur = activeInterval.durationFrames;

  // Fade-in trong 15 frames đầu, Fade-out trong 15 frames cuối
  const opacity = interpolate(
    localFrame,
    [0, 16, dur - 16, dur],
    [0, 1, 1, 0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(
    localFrame,
    [0, 16, dur - 16, dur],
    [14, 0, 0, 14],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 130,
        left: 54,
        display: "flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(18, 12, 6, 0.92)",
        border: "1px solid rgba(245, 158, 11, 0.40)",
        borderLeft: "4px solid #f59e0b",
        borderRadius: 12,
        padding: "10px 20px",
        backdropFilter: "blur(14px)",
        boxShadow: "0 8px 28px rgba(0, 0, 0, 0.8)",
        pointerEvents: "none",
        zIndex: 20,
        fontFamily,
        opacity,
        transform: `translateY(${translateY}px)`,
        maxWidth: 720,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: "rgba(245, 158, 11, 0.15)",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        ✨
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#fbbf24",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {activeInterval.title}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#fef3c7",
            lineHeight: 1.35,
            letterSpacing: 0.2,
          }}
        >
          {activeInterval.subtitle}
        </div>
      </div>
    </div>
  );
};
