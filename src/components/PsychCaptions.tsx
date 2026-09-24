import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { SubtitlePhrase } from "../data/fakeBusySubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const PsychCaptions: React.FC<{
  readonly phrases: SubtitlePhrase[];
  readonly bottom?: number;
}> = ({ phrases, bottom = 290 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  // Find active phrase
  const activePhrase = phrases.find(
    (p) => currentTimeMs >= p.startMs && currentTimeMs <= p.endMs
  );

  if (!activePhrase) {
    return null;
  }

  // Calculate entrance animation
  const phraseStartFrame = (activePhrase.startMs / 1000) * fps;
  const entrance = spring({
    frame: Math.max(0, frame - phraseStartFrame),
    fps,
    config: { damping: 13, stiffness: 230 },
  });

  const phraseScale = interpolate(entrance, [0, 1], [0.93, 1]);
  const phraseTranslateY = interpolate(entrance, [0, 1], [14, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        bottom,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 500,
      }}
    >
      <div
        style={{
          transform: `scale(${phraseScale}) translateY(${phraseTranslateY}px)`,
          maxWidth: 960,
          textAlign: "center",
          fontFamily,
          lineHeight: 1.35,
          letterSpacing: -0.4,
          filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.95))",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px 12px",
          }}
        >
          {activePhrase.tokens.map((token, tIdx) => {
            const isWordActive =
              currentTimeMs >= token.startMs && currentTimeMs < token.endMs;

            const isKeyword = activePhrase.highlightKeywords?.some((kw) =>
              kw.toLowerCase().includes(token.text.toLowerCase())
            );

            // Active word punch animation
            const wordSpring = spring({
              frame: Math.max(0, frame - (token.startMs / 1000) * fps),
              fps,
              config: { damping: 10, stiffness: 250 },
            });

            const wordScale = isWordActive
              ? interpolate(wordSpring, [0, 0.4, 1], [1, 1.25, 1.15])
              : 1;

            const wordRotation = isWordActive ? (tIdx % 2 === 0 ? -2.5 : 2.5) : 0;

            let wordColor = "#FFFFFF";
            let bgStyle: React.CSSProperties = {};

            if (isWordActive) {
              // High-impact Electric Orange-Amber Gradient Pill
              wordColor = "#000000";
              bgStyle = {
                background: "linear-gradient(135deg, #FF6B00 0%, #FFA800 100%)",
                borderRadius: 10,
                boxShadow: "0 0 24px rgba(255, 107, 0, 0.9), 0 0 10px rgba(255, 168, 0, 0.8)",
                padding: "2px 12px",
                border: "2px solid #FFF275",
              };
            } else if (isKeyword) {
              // Vibrant Emerald for key concepts
              wordColor = "#34D399";
              bgStyle = {
                padding: "2px 4px",
              };
            } else {
              bgStyle = {
                padding: "2px 4px",
              };
            }

            return (
              <span
                key={`${tIdx}-${token.text}`}
                style={{
                  display: "inline-block",
                  fontSize: 48,
                  fontWeight: 900,
                  color: wordColor,
                  WebkitTextStroke: isWordActive ? "0px" : "10px #000000",
                  paintOrder: "stroke fill",
                  transform: `scale(${wordScale}) rotate(${wordRotation}deg)`,
                  textTransform: "uppercase",
                  transition: "all 0.08s ease-out",
                  ...bgStyle,
                }}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
