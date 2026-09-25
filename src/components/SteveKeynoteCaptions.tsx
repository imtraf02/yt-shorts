import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { PhraseCaption } from "../data/steveSubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const SteveKeynoteCaptions: React.FC<{
  readonly phrases: PhraseCaption[];
  readonly bottom?: number;
}> = ({ phrases, bottom = 280 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;

  // Find active phrase
  const activePhrase = phrases.find(
    (p) => currentMs >= p.startMs - 60 && currentMs <= p.endMs + 100
  );

  if (!activePhrase) {
    return null;
  }

  // Find active word index
  const activeWordIdx = activePhrase.words.findIndex(
    (w) => currentMs >= w.startMs - 30 && currentMs <= w.endMs + 50
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 110,
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 16px",
          textAlign: "center",
        }}
      >
        {activePhrase.words.map((w, idx) => {
          const isActive = idx === activeWordIdx;
          const isKeyword = w.isKeyword;

          let color = "#FFFFFF";
          if (isKeyword) {
            color = "#FFD60A"; // Apple Keynote Gold
          }

          if (isActive) {
            return (
              <span
                key={`${w.word}-${idx}`}
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #FFFFFF 0%, #E5E5EA 100%)",
                  color: "#0A0A0E",
                  fontSize: 45,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  padding: "4px 16px",
                  borderRadius: 16,
                  transform: "scale(1.08)",
                  boxShadow:
                    "0 0 28px rgba(255, 255, 255, 0.75), 0 8px 24px rgba(0, 0, 0, 0.85)",
                  letterSpacing: "0.5px",
                }}
              >
                {w.word}
              </span>
            );
          }

          return (
            <span
              key={`${w.word}-${idx}`}
              style={{
                display: "inline-block",
                color,
                fontSize: 44,
                fontWeight: 900,
                textTransform: "uppercase",
                WebkitTextStroke: "5px #000000",
                paintOrder: "stroke fill",
                textShadow:
                  "0 4px 18px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.9)",
                letterSpacing: "0.5px",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
