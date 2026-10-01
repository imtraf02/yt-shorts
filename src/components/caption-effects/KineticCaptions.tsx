import React, { useMemo } from "react";
import type { Caption } from "@remotion/captions";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import {
  findCaptionPage,
  keywordKey,
  makeCaptionPages,
  wordMotion,
} from "./model";
import type { CaptionEffect } from "./model";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["vietnamese", "latin"],
});

export const CAPTION_THEMES = {
  gold: {
    gradient: "linear-gradient(120deg, #FEF08A, #FBBF24)",
    glow: "#FBBF2477",
    line: "#FFF6B2",
  },
  cyan: {
    gradient: "linear-gradient(120deg, #BAF5FF, #38BDF8)",
    glow: "#38BDF877",
    line: "#ECFEFF",
  },
  emerald: {
    gradient: "linear-gradient(120deg, #D9F99D, #6EE7B7)",
    glow: "#6EE7B777",
    line: "#ECFCCB",
  },
} as const;

export type KineticCaptionsProps = {
  captions: readonly Caption[];
  effect?: CaptionEffect;
  theme?: keyof typeof CAPTION_THEMES;
  keywords?: readonly string[];
  keywordColor?: "#FACC15" | "#38BDF8";
  fontSize?: number;
  bottom?: number;
  maxWidth?: number;
  maxWords?: number;
  maxCharacters?: number;
  /** Positive delays captions; negative makes them appear earlier. */
  offsetMs?: number;
  /** Optional legacy adapter: use chapter-local frames without nesting a Sequence. */
  localFrame?: number;
  panel?: boolean;
  strokeWidth?: number;
  zIndex?: number;
};

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({
  captions,
  effect = "pop",
  theme = "gold",
  keywords = [],
  keywordColor = "#FACC15",
  fontSize,
  bottom,
  maxWidth,
  maxWords = 7,
  maxCharacters = 44,
  offsetMs = 0,
  localFrame,
  panel = false,
  strokeWidth = 10,
  zIndex = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const portrait = height > width;
  const size = fontSize ?? (portrait ? 64 : 48);
  const pages = useMemo(
    () => makeCaptionPages(captions, maxWords, maxCharacters),
    [captions, maxWords, maxCharacters],
  );
  const keywordSet = useMemo(
    () => new Set(keywords.map(keywordKey)),
    [keywords],
  );
  const now = ((localFrame ?? frame) / fps) * 1000 - offsetMs;
  const page = findCaptionPage(pages, now);
  if (!page) return null;
  const colors = CAPTION_THEMES[theme];
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: bottom ?? (portrait ? 290 : 44),
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex,
        fontFamily,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.4,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: `${size * 0.14}px ${size * 0.04}px`,
          maxWidth: Math.min(maxWidth ?? (portrait ? 980 : 1380), width - 48),
          padding: `${size * 0.14}px ${size * 0.25}px`,
          borderRadius: size * 0.35,
          background: panel ? "#07111DEB" : undefined,
        }}
      >
        {page.words.map((word, index) => {
          const active = now >= word.startMs && now < word.endMs;
          const future = now < word.startMs;
          const motion = wordMotion(
            effect,
            now - word.startMs,
            word.endMs - word.startMs,
          );
          const keyword = keywordSet.has(keywordKey(word.text));
          return (
            <span
              key={`${word.startMs}-${index}`}
              style={{
                position: "relative",
                display: "inline-block",
                whiteSpace: "pre-wrap",
                maxWidth: "100%",
                overflowWrap: "anywhere",
                padding: `${size * 0.035}px ${size * 0.1}px`,
                borderRadius: size * 0.18,
                // All words reserve identical padding; highlighting never reflows a page.
                visibility:
                  effect === "typewriter" && future ? "hidden" : "visible",
                scale: active ? motion.scale : 1,
                translate: active ? `0px ${motion.y * size}px` : "0px 0px",
                rotate: active ? `${motion.rotation}deg` : "0deg",
                opacity: active
                  ? motion.opacity
                  : effect === "spotlight"
                    ? 0.55
                    : 1,
                background: active ? colors.gradient : undefined,
                boxShadow: active
                  ? `0 0 ${size * 0.5}px ${colors.glow}`
                  : undefined,
                color: active ? "#040816" : keyword ? keywordColor : "#FFFFFF",
                WebkitTextStroke: active
                  ? "0px transparent"
                  : `${strokeWidth}px #000000`,
                paintOrder: "stroke fill",
                textShadow: active ? "none" : "0 3px 7px #00000099",
              }}
            >
              {active && effect === "karaoke" && (
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    background: "#FFFFFF55",
                    clipPath: `inset(0 ${(1 - motion.progress) * 100}% 0 0)`,
                  }}
                />
              )}
              <span style={{ position: "relative" }}>{word.text}</span>
              {active && effect === "underline" && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "8%",
                    width: `${motion.progress * 84}%`,
                    height: Math.max(2, size * 0.055),
                    borderRadius: 3,
                    background: "#040816",
                  }}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
