import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  bounded,
  EFFECT_PRESETS,
  particleAt,
  particleCount,
  seeded,
} from "./model";
import type { EffectKind } from "./model";

export type AtmosphereProps = {
  kind: EffectKind;
  /** 0 disables; 1 is the preset; capped at 300 particles. */
  density?: number;
  speed?: number;
  /** Horizontal wind in pixels/second at a 1080 px short edge. */
  wind?: number;
  size?: number;
  opacity?: number;
  colors?: readonly string[];
  seed?: string;
  /** Transparent lower area in composition pixels, for captions/character. */
  safeBottom?: number;
  zIndex?: number;
  /** Keep phase continuous when this is placed in a Sequence. */
  timeOffsetSeconds?: number;
};

const ParticleShape: React.FC<{
  kind: EffectKind;
  color: string;
  index: number;
}> = ({ kind, color, index }) => {
  if (kind === "leaves")
    return (
      <>
        <path
          d={
            index % 2 === 0
              ? "M16 30C-3 18 3 6 28 2C28 19 28 27 16 30Z"
              : "M16 30L12 23L3 24L7 17L1 12L11 12L13 2L19 10L28 6L25 16L31 21L22 24Z"
          }
          fill={color}
        />
        <path
          d="M10 32Q15 21 24 7M16 22L9 17M19 16L25 15"
          fill="none"
          stroke="#6A472C"
          strokeWidth="1.1"
          opacity={0.6}
        />
      </>
    );
  if (kind === "petals")
    return (
      <>
        <path d="M16 29C-5 17 6-2 15 6C25-6 39 15 16 29Z" fill={color} />
        <path
          d="M16 26Q13 15 15 9"
          stroke="white"
          strokeWidth="1"
          fill="none"
          opacity={0.35}
        />
      </>
    );
  if (kind === "snow" && index % 5 === 0)
    return (
      <g stroke={color} strokeWidth="2" strokeLinecap="round">
        <path d="M16 2V30M4 9L28 23M4 23L28 9M12 6L16 10L20 6M12 26L16 22L20 26" />
      </g>
    );
  if (kind === "rain")
    return (
      <path
        d="M16 2V30"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    );
  if (kind === "bubbles")
    return (
      <>
        <circle
          cx="16"
          cy="16"
          r="13"
          fill={color}
          fillOpacity={0.055}
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M7 15Q7 7 15 7"
          fill="none"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={0.7}
        />
        <circle cx="23" cy="24" r="1.6" fill={color} />
      </>
    );
  if (kind === "confetti")
    return index % 3 === 0 ? (
      <path
        d="M8 3Q25 11 8 20Q23 24 14 30"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />
    ) : (
      <rect x="7" y="5" width="18" height="22" rx="2" fill={color} />
    );
  if (kind === "stars" && index % 4 === 0)
    return (
      <path d="M16 0L19 12L32 16L19 19L16 32L12 19L0 16L12 12Z" fill={color} />
    );
  return (
    <>
      {["dust", "embers", "fireflies", "stars"].includes(kind) && (
        <circle cx="16" cy="16" r="15" fill={color} opacity={0.12} />
      )}
      <ellipse
        cx="16"
        cy="16"
        rx={kind === "embers" ? 4 : 8}
        ry={kind === "embers" ? 11 : 8}
        fill={color}
      />
    </>
  );
};

/** Transparent, silent overlay. All movement is a pure function of frame + seed. */
export const Atmosphere: React.FC<AtmosphereProps> = ({
  kind,
  density = 1,
  speed = 1,
  wind = 18,
  size = 1,
  opacity = 0.65,
  colors,
  seed = "atmosphere-v1",
  safeBottom = 0,
  zIndex = 4,
  timeOffsetSeconds = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const preset = EFFECT_PRESETS[kind];
  const seconds =
    (frame / fps + bounded(timeOffsetSeconds, -86400, 86400, 0)) *
    bounded(speed, 0, 8, 1);
  const count = particleCount(kind, density);
  const palette = colors?.length ? colors : preset.colors;
  const alpha = bounded(opacity, 0, 1, 0.65);
  const scale = bounded(size, 0.1, 5, 1);
  const airflow = bounded(wind, -1000, 1000, 18);
  const bottom = bounded(safeBottom, 0, height, 0);
  if (count === 0 || alpha === 0) return null;
  return (
    <AbsoluteFill
      aria-hidden
      style={{
        overflow: "hidden",
        pointerEvents: "none",
        zIndex,
        opacity: alpha,
        maskImage:
          bottom > 0
            ? `linear-gradient(to bottom, black 0px, black ${Math.max(0, height - bottom - height * 0.12)}px, transparent ${height - bottom}px)`
            : undefined,
        WebkitMaskImage:
          bottom > 0
            ? `linear-gradient(to bottom, black 0px, black ${Math.max(0, height - bottom - height * 0.12)}px, transparent ${height - bottom}px)`
            : undefined,
      }}
    >
      {Array.from({ length: count }, (_, index) => {
        const color =
          palette[Math.floor(seeded(seed, index, 6) * palette.length)];
        if (kind === "fog") {
          const phase = seeded(seed, index, 1) * Math.PI * 2;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: width * 0.95 * scale,
                height: height * 0.52 * scale,
                left: width * (-0.32 + seeded(seed, index, 2) * 0.9),
                top: height * (0.15 + seeded(seed, index, 4) * 0.55),
                translate: `${Math.sin(seconds * 0.14 + phase) * width * 0.16 + (Math.sin(seconds * 0.08) * airflow * width) / 1920}px ${Math.cos(seconds * 0.18 + phase) * height * 0.055}px`,
                background: `radial-gradient(ellipse, ${color} 0%, transparent 68%)`,
                opacity: 0.13 + 0.06 * Math.sin(seconds * 0.2 + phase),
                mixBlendMode: "screen",
              }}
            />
          );
        }
        if (kind === "sunrays")
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: width * (0.03 + index * 0.075),
                top: -height * 0.3,
                width: width * 0.16 * scale,
                height: height * 1.8,
                transformOrigin: "50% 0%",
                rotate: `${-24 + index * 5 + Math.sin(seconds * 0.18 + index) * 4}deg`,
                clipPath: "polygon(48% 0, 52% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(to bottom, ${color}, transparent)`,
                opacity: 0.09 + 0.04 * Math.sin(seconds * 0.3 + index),
                mixBlendMode: "screen",
              }}
            />
          );
        const p = particleAt({
          kind,
          index,
          seed,
          seconds,
          width,
          height,
          wind: airflow,
          size: scale,
        });
        return (
          <svg
            key={index}
            viewBox="0 0 32 32"
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              overflow: "visible",
              opacity: p.opacity,
              rotate: `${p.rotation}deg`,
              scale: `${p.flip} 1`,
            }}
          >
            <ParticleShape kind={kind} color={color} index={index} />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

export type EffectOptions = Omit<AtmosphereProps, "kind">;
export const FallingLeaves = (props: EffectOptions) => (
  <Atmosphere {...props} kind="leaves" />
);
export const FallingSnow = (props: EffectOptions) => (
  <Atmosphere {...props} kind="snow" />
);
export const Rain = (props: EffectOptions) => (
  <Atmosphere {...props} kind="rain" />
);
export const FallingPetals = (props: EffectOptions) => (
  <Atmosphere {...props} kind="petals" />
);
export const GoldenDust = (props: EffectOptions) => (
  <Atmosphere {...props} kind="dust" />
);
export const RisingEmbers = (props: EffectOptions) => (
  <Atmosphere {...props} kind="embers" />
);
export const Fireflies = (props: EffectOptions) => (
  <Atmosphere {...props} kind="fireflies" />
);
export const Bubbles = (props: EffectOptions) => (
  <Atmosphere {...props} kind="bubbles" />
);
export const Confetti = (props: EffectOptions) => (
  <Atmosphere {...props} kind="confetti" />
);
export const TwinklingStars = (props: EffectOptions) => (
  <Atmosphere {...props} kind="stars" />
);
export const DriftingFog = (props: EffectOptions) => (
  <Atmosphere {...props} kind="fog" />
);
export const SunRays = (props: EffectOptions) => (
  <Atmosphere {...props} kind="sunrays" />
);
