import React, { useId } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { bounded, seeded } from "./model";
import { CINEMATIC_PRESETS, cycleFade, cycleProgress } from "./cinematic-model";
import type { CinematicKind } from "./cinematic-model";

export type CinematicOverlayProps = {
  kind: CinematicKind;
  intensity?: number;
  speed?: number;
  color?: string;
  seed?: string;
  safeBottom?: number;
  zIndex?: number;
  timeOffsetSeconds?: number;
};

/** Visual overlay only: no audio, no changes to underlying scene timing/geometry. */
export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  kind,
  intensity = 0.45,
  speed = 1,
  color,
  seed = "cinematic-v1",
  safeBottom = 0,
  zIndex = 5,
  timeOffsetSeconds = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const filterId = `grain-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const seconds =
    (frame / fps + bounded(timeOffsetSeconds, -86400, 86400, 0)) *
    bounded(speed, 0, 5, 1);
  const opacity = bounded(intensity, 0, 1, 0.45);
  const tint = color ?? CINEMATIC_PRESETS[kind].color;
  const bottom = bounded(safeBottom, 0, height, 0);
  const unit = Math.min(width, height) / 1080;
  const mask =
    bottom > 0
      ? `linear-gradient(black ${Math.max(0, height - bottom - height * 0.12)}px, transparent ${height - bottom}px)`
      : undefined;
  if (opacity === 0) return null;
  return (
    <AbsoluteFill
      aria-hidden
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        opacity,
        zIndex,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      {kind === "bokeh" &&
        Array.from({ length: 24 }, (_, index) => {
          const r = (channel: number) => seeded(seed, index, channel);
          const size = (45 + r(0) * 125) * unit;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                left:
                  (r(1) + Math.sin(seconds * 0.13 + r(2) * 6.28) * 0.045) *
                  width,
                top:
                  (r(3) + Math.cos(seconds * 0.17 + r(4) * 6.28) * 0.06) *
                  height,
                background: `radial-gradient(circle, transparent 30%, ${tint} 58%, transparent 72%)`,
                filter: `blur(${2 * unit}px)`,
                opacity: 0.2 + r(5) * 0.5,
              }}
            />
          );
        })}
      {kind === "light-leak" && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at ${-8 + Math.sin(seconds * 0.3) * 12}% 35%, ${tint}, transparent 58%), radial-gradient(ellipse at 110% ${60 + Math.cos(seconds * 0.2) * 20}%, ${tint}, transparent 48%)`,
            opacity: 0.65 + Math.sin(seconds * 0.45) * 0.2,
          }}
        />
      )}
      {kind === "film-grain" && (
        <svg width={width} height={height} style={{ opacity: 0.45 }}>
          <defs>
            <filter id={filterId} x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={0.6 / unit}
                numOctaves={2}
                seed={Math.floor(
                  seeded(seed, Math.floor(seconds * 12), 0) * 65535,
                )}
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      )}
      {kind === "film-scratches" && (
        <svg width={width} height={height}>
          {Array.from({ length: 10 }, (_, index) => {
            const phase = cycleProgress(
              seconds,
              2.4 + seeded(seed, index, 1) * 3,
              seeded(seed, index, 2),
            );
            const x =
              (seeded(seed, index, 3) +
                Math.sin(seconds * 0.4 + index) * 0.01) *
              width;
            return (
              <path
                key={index}
                d={`M${x} 0Q${x + 4 * unit} ${height * 0.5} ${x - 2 * unit} ${height}`}
                stroke={tint}
                strokeWidth={(0.6 + seeded(seed, index, 4) * 1.5) * unit}
                opacity={cycleFade(phase) * 0.7}
                fill="none"
              />
            );
          })}
        </svg>
      )}
      {kind === "scanlines" && (
        <>
          <AbsoluteFill
            style={{
              background: `repeating-linear-gradient(to bottom, transparent 0px, transparent ${4 * unit}px, #000000 ${5 * unit}px, #000000 ${6 * unit}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: (cycleProgress(seconds, 5) * 1.3 - 0.2) * height,
              height: height * 0.16,
              background: `linear-gradient(transparent, ${tint}, transparent)`,
              opacity: 0.25,
            }}
          />
        </>
      )}
      {kind === "vignette" && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 50% 45%, transparent ${35 + Math.sin(seconds * 0.25) * 3}%, ${tint} 100%)`,
          }}
        />
      )}
      {kind === "speed-lines" && (
        <svg width={width} height={height}>
          {Array.from({ length: 36 }, (_, index) => {
            const phase = cycleProgress(
              seconds,
              0.8 + seeded(seed, index, 0),
              seeded(seed, index, 1),
            );
            const angle = seeded(seed, index, 2) * Math.PI * 2;
            const radius = Math.hypot(width, height) * (0.12 + phase * 0.5);
            const length = (30 + seeded(seed, index, 3) * 180) * unit;
            return (
              <line
                key={index}
                x1={width / 2 + Math.cos(angle) * radius}
                y1={height / 2 + Math.sin(angle) * radius}
                x2={width / 2 + Math.cos(angle) * (radius + length)}
                y2={height / 2 + Math.sin(angle) * (radius + length)}
                stroke={tint}
                strokeWidth={(0.8 + seeded(seed, index, 4) * 2) * unit}
                opacity={cycleFade(phase)}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      )}
      {kind === "ripples" && (
        <svg width={width} height={height}>
          {Array.from({ length: 5 }, (_, index) => {
            const phase = cycleProgress(seconds, 6, index / 5);
            return (
              <ellipse
                key={index}
                cx={width / 2}
                cy={height / 2}
                rx={phase * width * 0.65}
                ry={phase * height * 0.65}
                stroke={tint}
                strokeWidth={(1 + (1 - phase) * 2) * unit}
                fill="none"
                opacity={cycleFade(phase) * (1 - phase)}
              />
            );
          })}
        </svg>
      )}
    </AbsoluteFill>
  );
};
