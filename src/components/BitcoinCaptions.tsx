import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { PhraseCaption } from "../data/bitcoinSubtitles";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["vietnamese", "latin"],
});

export const BitcoinCaptions: React.FC<{
  readonly phrases: PhraseCaption[];
  readonly bottom?: number;
}> = ({ phrases, bottom = 290 }) => {
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
        left: 50,
        right: 50,
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
          gap: "8px 12px",
          textAlign: "center",
        }}
      >
        {activePhrase.words.map((w, idx) => {
          const isActive = idx === activeWordIdx;
          const isKeyword = w.isKeyword;

          let color = "#FFFFFF";
          if (isKeyword) {
            color = "#FBBF24"; // Bright Bitcoin Gold
          }

          if (isActive) {
            return (
              <span
                key={`${w.word}-${idx}`}
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #F97316 50%, #06B6D4 100%)",
                  color: "#060B14",
                  fontSize: 48,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  padding: "4px 16px",
                  borderRadius: 16,
                  transform: "scale(1.08)",
                  boxShadow:
                    "0 0 24px rgba(245, 158, 11, 0.75), 0 4px 14px rgba(0, 0, 0, 0.9)",
                  WebkitTextStroke: "1px rgba(0,0,0,0.4)",
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
                fontSize: 46,
                fontWeight: 900,
                textTransform: "uppercase",
                WebkitTextStroke: "10px #000000",
                paintOrder: "stroke fill",
                textShadow:
                  "0 4px 16px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)",
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
