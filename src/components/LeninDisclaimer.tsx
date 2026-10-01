import React from "react";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500"],
  subsets: ["vietnamese", "latin"],
});

interface LeninDisclaimerProps {
  text?: string;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  fontSize?: number;
  color?: string;
}

export const LeninDisclaimer: React.FC<LeninDisclaimerProps> = ({
  text = "* Hình ảnh chỉ mang tính chất minh họa",
  top,
  bottom,
  right,
  left,
  fontSize = 13,
  color = "rgba(226, 232, 240, 0.65)",
}) => {
  // Mặc định chuẩn vị trí góc DƯỚI - TRÁI (bottom: 24, left: 40)
  // Đảm bảo thông thoáng, không đè lên các Badge góc trên và không đè lên Trà Xanh góc dưới phải
  const vertStyle: React.CSSProperties =
    top !== undefined ? { top } : { bottom: bottom ?? 24 };
  const horizStyle: React.CSSProperties =
    right !== undefined ? { right } : { left: left ?? 40 };

  return (
    <div
      style={{
        position: "absolute",
        ...vertStyle,
        ...horizStyle,
        pointerEvents: "none",
        zIndex: 50,
        fontFamily,
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 400,
          fontStyle: "italic",
          letterSpacing: 0.5,
          color,
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 1)",
          userSelect: "none",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const AiDisclaimer = LeninDisclaimer;
