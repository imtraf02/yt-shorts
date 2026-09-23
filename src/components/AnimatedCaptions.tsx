import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { SubtitlePhrase } from "../data/subtitles";

// Load Google Font Montserrat with Vietnamese support
const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const AnimatedCaptions: React.FC<{
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
    config: { damping: 14, stiffness: 180 },
  });

  const phraseScale = interpolate(entrance, [0, 1], [0.85, 1]);
  const phraseTranslateY = interpolate(entrance, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        bottom: 270,
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
          backgroundColor: "rgba(8, 10, 18, 0.94)",
          padding: "22px 30px",
          borderRadius: 18,
          border: "5px solid #f6e6a8",
          boxShadow:
            "0 18px 46px rgba(0, 0, 0, 0.76), inset 0 0 0 2px rgba(168, 85, 247, 0.75)",
          maxWidth: 940,
          textAlign: "center",
          fontFamily,
          lineHeight: 1.35,
          letterSpacing: -0.5,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "4px 10px",
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

            let wordColor = "#FCF6E8"; // Warm cream
            let textShadow = "0 2px 8px rgba(0, 0, 0, 0.8)";
            let bgHighlight = "transparent";

            if (isWordActive) {
              wordColor = "#FFFFFF";
              textShadow = "0 0 18px rgba(250, 204, 21, 0.7), 0 2px 4px black";
              bgHighlight = "rgba(168, 85, 247, 0.88)";
            } else if (isKeyword) {
              wordColor = "#7dd3fc";
            }

            return (
              <span
                key={`${tIdx}-${token.text}`}
                style={{
                  display: "inline-block",
                  fontSize: 45,
                  fontWeight: 900,
                  color: wordColor,
                  textShadow,
                  backgroundColor: bgHighlight,
                  padding: "2px 6px",
                  borderRadius: 7,
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
