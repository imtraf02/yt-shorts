import React from "react";
import { AbsoluteFill } from "remotion";
import {
  loadVietnameseFont,
  VIETNAMESE_FONT_CATALOG,
  type VietnameseFontKey,
} from "./fonts/vietnameseFonts";

const loadedFamilies = Object.fromEntries(
  VIETNAMESE_FONT_CATALOG.map((font) => [
    font.key,
    loadVietnameseFont(font.key, {
      weights: ["700"],
      ignoreTooManyRequestsWarning: true,
    }).fontFamily,
  ]),
) as Record<VietnameseFontKey, string>;

export const VietnameseFontsGallery: React.FC = () => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      background:
        "radial-gradient(circle at 78% 10%, rgba(45, 212, 191, 0.16), transparent 32%), linear-gradient(145deg, #111E24, #08121B 68%)",
      color: "#F8FAFC",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 42,
        left: 64,
        color: "#6EE7B7",
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: 5,
      }}
    >
      TYPOGRAPHY / TIẾNG VIỆT
    </div>
    <div
      style={{
        position: "absolute",
        top: 78,
        left: 60,
        fontSize: 60,
        fontWeight: 800,
        letterSpacing: -1.5,
      }}
    >
      14 font mới cho video tiếng Việt
    </div>
    <div
      style={{
        position: "absolute",
        top: 103,
        right: 64,
        color: "rgba(226, 232, 240, 0.62)",
        fontSize: 19,
        letterSpacing: 1.4,
      }}
    >
      LATIN + VIETNAMESE · WEIGHT 700
    </div>

    {VIETNAMESE_FONT_CATALOG.map((font, index) => (
      <div
        key={font.key}
        style={{
          position: "absolute",
          left: 64 + (index % 2) * 916,
          top: 170 + Math.floor(index / 2) * 124,
          width: 886,
          height: 104,
          padding: "14px 20px",
          borderRadius: 16,
          background: "rgba(15, 35, 42, 0.72)",
          border: "1px solid rgba(148, 163, 184, 0.14)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span
            style={{
              color: "#A7F3D0",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            {String(index + 1).padStart(2, "0")} · {font.family}
          </span>
          <span
            style={{
              padding: "4px 9px",
              borderRadius: 999,
              color: "rgba(226, 232, 240, 0.68)",
              background: "rgba(255, 255, 255, 0.05)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {font.category}
          </span>
        </div>
        <div
          style={{
            marginTop: 7,
            overflow: "hidden",
            color: "#F8FAFC",
            fontFamily: loadedFamilies[font.key],
            fontSize: 27,
            fontWeight: 700,
            lineHeight: 1.1,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Trà Xanh kể chuyện Việt: biển đảo, đất nước, con người.
        </div>
        <div
          style={{
            marginTop: 6,
            color: "rgba(203, 213, 225, 0.56)",
            fontSize: 12,
          }}
        >
          {font.recommendedFor}
        </div>
      </div>
    ))}
  </AbsoluteFill>
);

export default VietnameseFontsGallery;
