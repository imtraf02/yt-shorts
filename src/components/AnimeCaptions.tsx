import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { SubtitlePhrase } from "../data/procrastinationSubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const AnimeCaptions: React.FC<{
  readonly phrases: SubtitlePhrase[];
}> = ({ phrases }) => {
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
    config: { damping: 13, stiffness: 190 },
  });

  const phraseScale = interpolate(entrance, [0, 1], [0.88, 1]);
  const phraseTranslateY = interpolate(entrance, [0, 1], [25, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        bottom: 260,
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
          opacity: entrance,
          backgroundColor: "rgba(15, 23, 42, 0.96)",
          padding: "18px 28px",
          borderRadius: 18,
          border: "4px solid #fde047",
          boxShadow:
            "0 18px 48px rgba(0, 0, 0, 0.85), 0 0 24px rgba(250, 204, 21, 0.45)",
          maxWidth: 960,
          textAlign: "center",
          fontFamily,
          lineHeight: 1.35,
          letterSpacing: -0.3,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "4px 9px",
          }}
        >
          {activePhrase.tokens.map((token, tIdx) => {
            const isWordActive =
              currentTimeMs >= token.startMs && currentTimeMs < token.endMs;

            const isKeyword = activePhrase.highlightKeywords?.some((kw) =>
              kw.toLowerCase().includes(token.text.toLowerCase())
            );

            // Active word bounce
            const wordSpring = spring({
              frame: Math.max(0, frame - (token.startMs / 1000) * fps),
              fps,
              config: { damping: 10, stiffness: 220 },
            });

            const wordScale = isWordActive
              ? interpolate(wordSpring, [0, 0.5, 1], [1, 1.25, 1.15])
              : 1;

            let wordColor = "#F8FAFC"; // crisp light
            let textShadow = "0 2px 8px rgba(0, 0, 0, 0.85)";
            let bgHighlight = "transparent";

            if (isWordActive) {
              wordColor = "#090d1a";
              textShadow = "none";
              bgHighlight = "#fde047"; // electric yellow pill
            } else if (isKeyword) {
              wordColor = "#38bdf8"; // cyan for keywords
              textShadow = "0 0 12px rgba(56, 189, 248, 0.6)";
            }

            return (
              <span
                key={`${tIdx}-${token.text}`}
                style={{
                  display: "inline-block",
                  fontSize: 44,
                  fontWeight: 900,
                  color: wordColor,
                  textShadow,
                  backgroundColor: bgHighlight,
                  padding: isWordActive ? "3px 8px" : "2px 5px",
                  borderRadius: 8,
                  transform: `scale(${wordScale})`,
                  textTransform: "uppercase",
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
