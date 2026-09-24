import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { SubtitlePhrase } from "../data/deadlineCortisolSubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const CinematicCaptions: React.FC<{
  readonly phrases: SubtitlePhrase[];
  readonly bottom?: number;
}> = ({ phrases, bottom = 280 }) => {
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

  // Calculate entrance progress using spring
  const phraseStartFrame = (activePhrase.startMs / 1000) * fps;
  const entrance = spring({
    frame: Math.max(0, frame - phraseStartFrame),
    fps,
    config: { damping: 14, stiffness: 220 },
  });

  const phraseScale = interpolate(entrance, [0, 1], [0.92, 1]);
  const phraseTranslateY = interpolate(entrance, [0, 1], [18, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        right: 48,
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
          opacity: 1,
          maxWidth: 980,
          textAlign: "center",
          fontFamily,
          lineHeight: 1.3,
          letterSpacing: -0.5,
          // Subtle soft radial backdrop glow instead of heavy dark box
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
              config: { damping: 11, stiffness: 240 },
            });

            const wordScale = isWordActive
              ? interpolate(wordSpring, [0, 0.4, 1], [1, 1.26, 1.16])
              : 1;

            const wordRotation = isWordActive ? (tIdx % 2 === 0 ? -2 : 2) : 0;

            let wordColor = "#FFFFFF";
            let bgStyle: React.CSSProperties = {};

            if (isWordActive) {
              wordColor = "#FFE600"; // Electric Neon Yellow
              bgStyle = {
                backgroundColor: "rgba(255, 230, 0, 0.16)",
                border: "2px solid #FFE600",
                borderRadius: 10,
                boxShadow: "0 0 20px rgba(255, 230, 0, 0.75)",
                padding: "2px 10px",
              };
            } else if (isKeyword) {
              wordColor = "#38BDF8"; // Vibrant Cyan for keywords
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
                  WebkitTextStroke: "10px #000000",
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
