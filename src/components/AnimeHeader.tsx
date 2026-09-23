import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadBeVietnamPro } from "@remotion/google-fonts/BeVietnamPro";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

const { fontFamily: beVietnamFont } = loadBeVietnamPro("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

const { fontFamily: robotoMonoFont } = loadRobotoMono("normal", {
  weights: ["700"],
  subsets: ["vietnamese", "latin"],
});

interface AnimeHeaderProps {
  readonly title: string;
  readonly category?: string;
  readonly tag?: string;
  readonly accentColor?: string;
}

export const AnimeHeader: React.FC<AnimeHeaderProps> = ({
  title,
  category = "TÂM LÝ HỌC // BẪY NÃO BỘ",
  tag = "HACK #01",
  accentColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  const translateY = interpolate(reveal, [0, 1], [-18, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 96,
        left: 56,
        right: 56,
        zIndex: 60,
        transform: `translateY(${translateY}px)`,
        opacity: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Category Label */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            color: accentColor,
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
              backgroundColor: accentColor,
              boxShadow: `0 0 14px ${accentColor}`,
            }}
          />
          {category}
        </div>

        {/* Tag Badge */}
        <div
          style={{
            padding: "6px 18px",
            border: `1.5px solid ${accentColor}aa`,
            backgroundColor: "rgba(10, 16, 32, 0.92)",
            color: "#f8fafc",
            fontFamily: robotoMonoFont,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: 1.2,
            borderRadius: 8,
            boxShadow: `0 4px 18px ${accentColor}33`,
          }}
        >
          {tag}
        </div>
      </div>

      {/* Main Title Hook */}
      <div
        style={{
          marginTop: 12,
          maxWidth: 968,
          color: "#ffffff",
          fontFamily: beVietnamFont,
          fontSize: 46,
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
