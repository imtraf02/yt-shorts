import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  directionVector,
  overlayEnvelope,
  TRANSITION_PRESETS,
  transitionProgress,
} from "./model";
import type { TransitionDirection, TransitionKind } from "./model";

export type SceneTransitionProps = {
  kind?: TransitionKind;
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
  /** Start frame relative to the enclosing Sequence. */
  from?: number;
  durationInFrames?: number;
  direction?: TransitionDirection;
  color?: string;
};

/** Composites two visual layers. Does not shorten the timeline or manage audio. */
export const SceneTransition: React.FC<SceneTransitionProps> = ({
  kind = "dissolve",
  outgoing,
  incoming,
  from = 0,
  durationInFrames = TRANSITION_PRESETS[kind].frames,
  direction = "left",
  color = "#101820",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const p = transitionProgress(frame, from, durationInFrames);
  if (p === 0)
    return (
      <AbsoluteFill style={{ overflow: "hidden" }}>{outgoing}</AbsoluteFill>
    );
  if (p === 1)
    return (
      <AbsoluteFill style={{ overflow: "hidden" }}>{incoming}</AbsoluteFill>
    );
  const before: React.CSSProperties = {};
  const after: React.CSSProperties = {};
  const [dx, dy] = directionVector(direction);
  const pulse = Math.sin(p * Math.PI);
  const shortEdge = Math.min(width, height);

  switch (kind) {
    case "dissolve":
      after.opacity = p;
      break;
    case "fade-color":
      before.opacity = Math.max(0, 1 - p * 2);
      after.opacity = Math.max(0, p * 2 - 1);
      break;
    case "wipe":
      after.clipPath =
        direction === "left"
          ? `inset(0 0 0 ${(1 - p) * 100}%)`
          : direction === "right"
            ? `inset(0 ${(1 - p) * 100}% 0 0)`
            : direction === "up"
              ? `inset(${(1 - p) * 100}% 0 0 0)`
              : `inset(0 0 ${(1 - p) * 100}% 0)`;
      break;
    case "slide":
    case "push":
      after.translate = `${-dx * (1 - p) * width}px ${-dy * (1 - p) * height}px`;
      if (kind === "push")
        before.translate = `${dx * p * width}px ${dy * p * height}px`;
      break;
    case "iris":
      after.clipPath = `circle(${(p * Math.hypot(width, height)) / 2}px at 50% 50%)`;
      break;
    case "diagonal":
      after.clipPath = `polygon(0 0, ${p * 200}% 0, ${p * 200 - 100}% 100%, 0 100%)`;
      break;
    case "blinds": {
      const stripe = height / 10;
      after.maskImage = `repeating-linear-gradient(to bottom, black 0px, black ${stripe * p}px, transparent ${stripe * p}px, transparent ${stripe}px)`;
      after.WebkitMaskImage = after.maskImage;
      break;
    }
    case "stripes": {
      const stripe = width / 12;
      after.maskImage = `repeating-linear-gradient(to right, black 0px, black ${stripe * p}px, transparent ${stripe * p}px, transparent ${stripe}px)`;
      after.WebkitMaskImage = after.maskImage;
      break;
    }
    case "door":
      after.clipPath = `inset(0 ${(1 - p) * 50}% 0 ${(1 - p) * 50}%)`;
      before.scale = 1 + p * 0.06;
      break;
    case "diamond": {
      const r = p * 150;
      after.clipPath = `polygon(50% ${50 - r}%, ${50 + r}% 50%, 50% ${50 + r}%, ${50 - r}% 50%)`;
      break;
    }
    case "zoom":
      before.scale = 1 + p * 0.28;
      after.scale = 1 + (1 - p) * 0.18;
      after.opacity = p;
      before.filter = `blur(${pulse * shortEdge * 0.006}px)`;
      break;
    case "blur":
      before.filter = `blur(${pulse * shortEdge * 0.018}px)`;
      after.filter = before.filter;
      after.opacity = p;
      before.scale = 1 + p * 0.06;
      after.scale = 1 + (1 - p) * 0.06;
      break;
    case "light-leak":
      before.opacity = p < 0.5 ? 1 : 0;
      after.opacity = p < 0.5 ? 0 : 1;
      break;
    case "flash":
      before.opacity = p < 0.5 ? 1 : 0;
      after.opacity = p < 0.5 ? 0 : 1;
      before.scale = 1 + p * 0.08;
      after.scale = 1 + (1 - p) * 0.08;
      break;
    case "clock":
      after.maskImage = `conic-gradient(from -90deg, black 0deg, black ${p * 360}deg, transparent ${p * 360}deg, transparent 360deg)`;
      after.WebkitMaskImage = after.maskImage;
      break;
    case "film-roll": {
      const barHeight = Math.max(16, Math.round(height * 0.05));
      const totalShift = (height + barHeight) * p;
      before.translate = `0px ${-totalShift}px`;
      after.translate = `0px ${height + barHeight - totalShift}px`;
      break;
    }
    case "spin": {
      const angle = 22;
      before.transform = `rotate(${-p * angle}deg) scale(${1 - p * 0.22})`;
      before.opacity = Math.max(0, 1 - p * 1.25);
      after.transform = `rotate(${(1 - p) * angle}deg) scale(${1 + (1 - p) * 0.22})`;
      after.opacity = Math.min(1, p * 1.25);
      break;
    }
    case "whip": {
      const motionBlur = pulse * shortEdge * 0.032;
      after.translate = `${-dx * (1 - p) * width}px ${-dy * (1 - p) * height}px`;
      before.translate = `${dx * p * width}px ${dy * p * height}px`;
      before.filter = `blur(${motionBlur}px)`;
      after.filter = `blur(${motionBlur}px)`;
      break;
    }
    case "glitch": {
      after.opacity = p;
      if (pulse > 0.05) {
        const jitter = Math.sin(frame * 19.7 + p * 23.1) * pulse * (shortEdge * 0.035);
        before.transform = `translateX(${jitter}px)`;
        after.transform = `translateX(${-jitter}px)`;
        const sliceY = (Math.abs(Math.sin(frame * 7.3)) * 80).toFixed(1);
        const sliceH = 8 + (frame % 12);
        after.clipPath = `polygon(0 0, 100% 0, 100% ${sliceY}%, 96% ${sliceY}%, 96% ${Number(sliceY) + sliceH}%, 100% ${Number(sliceY) + sliceH}%, 100% 100%, 0 100%, 0 ${Number(sliceY) + sliceH}%, 4% ${Number(sliceY) + sliceH}%, 4% ${sliceY}%, 0 ${sliceY}%)`;
      }
      break;
    }
    case "tv-snap": {
      if (p < 0.5) {
        const sy = Math.max(0.01, 1 - p * 2);
        before.transform = `scaleY(${sy}) scaleX(${1 + (1 - sy) * 0.1})`;
        before.filter = `brightness(${1 + (1 - sy) * 2})`;
        after.opacity = 0;
      } else {
        const sy = Math.max(0.01, (p - 0.5) * 2);
        before.opacity = 0;
        after.transform = `scaleY(${sy}) scaleX(${1 + (1 - sy) * 0.1})`;
        after.filter = `brightness(${1 + (1 - sy) * 2})`;
      }
      break;
    }
    case "burn":
      before.opacity = Math.max(0, 1 - p * 1.3);
      before.filter = `brightness(${1 + pulse * 1.5}) saturate(${1 + pulse * 2})`;
      after.opacity = Math.min(1, p * 1.3);
      after.filter = `brightness(${1 + (1 - p) * 1.2})`;
      break;
    case "aperture": {
      const r = p * 140;
      const angleOffset = p * 45;
      const points: string[] = [];
      for (let i = 0; i < 6; i++) {
        const rad = ((i * 60 + angleOffset) * Math.PI) / 180;
        const x = 50 + r * Math.cos(rad) * (shortEdge / width);
        const y = 50 + r * Math.sin(rad) * (shortEdge / height);
        points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
      }
      after.clipPath = `polygon(${points.join(", ")})`;
      before.scale = 1 + p * 0.08;
      break;
    }
    case "checkerboard": {
      const step = 48;
      const fillW = step * p;
      after.maskImage = `repeating-linear-gradient(45deg, black 0px, black ${fillW}px, transparent ${fillW}px, transparent ${step}px), repeating-linear-gradient(-45deg, black 0px, black ${fillW}px, transparent ${fillW}px, transparent ${step}px)`;
      after.WebkitMaskImage = after.maskImage;
      break;
    }
    case "heart": {
      const r = p * 135;
      const pts = [
        `50% ${50 - r * 0.3}%`,
        `${50 + r * 0.35}% ${50 - r * 0.7}%`,
        `${50 + r * 0.7}% ${50 - r * 0.4}%`,
        `${50 + r * 0.7}% ${50 + r * 0.1}%`,
        `50% ${50 + r * 0.8}%`,
        `${50 - r * 0.7}% ${50 + r * 0.1}%`,
        `${50 - r * 0.7}% ${50 - r * 0.4}%`,
        `${50 - r * 0.35}% ${50 - r * 0.7}%`,
      ];
      after.clipPath = `polygon(${pts.join(", ")})`;
      break;
    }
    case "star": {
      const rOut = p * 140;
      const rIn = rOut * 0.42;
      const pts: string[] = [];
      for (let i = 0; i < 5; i++) {
        const radOut = ((i * 72 - 90) * Math.PI) / 180;
        const xOut = 50 + rOut * Math.cos(radOut) * (shortEdge / width);
        const yOut = 50 + rOut * Math.sin(radOut) * (shortEdge / height);
        pts.push(`${xOut.toFixed(2)}% ${yOut.toFixed(2)}%`);
        const radIn = ((i * 72 + 36 - 90) * Math.PI) / 180;
        const xIn = 50 + rIn * Math.cos(radIn) * (shortEdge / width);
        const yIn = 50 + rIn * Math.sin(radIn) * (shortEdge / height);
        pts.push(`${xIn.toFixed(2)}% ${yIn.toFixed(2)}%`);
      }
      after.clipPath = `polygon(${pts.join(", ")})`;
      break;
    }
    case "cross-zoom":
      before.scale = 1 + p * 2.2;
      before.opacity = Math.max(0, 1 - p * 1.1);
      before.filter = `blur(${pulse * shortEdge * 0.02}px)`;
      after.scale = 0.35 + p * 0.65;
      after.opacity = p;
      after.filter = `blur(${(1 - p) * shortEdge * 0.02}px)`;
      break;
    case "flip":
      if (p < 0.5) {
        before.transform = `rotateY(${p * 180}deg) scale(${1 - p * 0.15})`;
        before.filter = `brightness(${1 - p * 0.4})`;
        after.opacity = 0;
      } else {
        before.opacity = 0;
        after.transform = `rotateY(${(p - 1) * 180}deg) scale(${1 - (1 - p) * 0.15})`;
        after.filter = `brightness(${1 - (1 - p) * 0.4})`;
      }
      break;
    case "cube":
      before.transform = `rotateY(${-p * 90}deg)`;
      before.transformOrigin = "right center";
      before.filter = `brightness(${1 - p * 0.5})`;
      before.opacity = p < 0.95 ? 1 : 0;
      after.transform = `rotateY(${(1 - p) * 90}deg)`;
      after.transformOrigin = "left center";
      after.filter = `brightness(${0.5 + p * 0.5})`;
      after.opacity = p > 0.05 ? 1 : 0;
      break;
    case "shake": {
      const shakeDecay = 1 - p;
      const shakeAmount = pulse * shakeDecay * (shortEdge * 0.04);
      const sx = Math.sin(frame * 2.9 + p * 17) * shakeAmount;
      const sy = Math.cos(frame * 3.7 + p * 19) * shakeAmount;
      const srot = Math.sin(frame * 2.1) * pulse * 2.2;
      before.opacity = p < 0.5 ? 1 : 0;
      after.opacity = p < 0.5 ? 0 : 1;
      const transform = `translate(${sx}px, ${sy}px) rotate(${srot}deg) scale(${1 + pulse * 0.06})`;
      before.transform = transform;
      after.transform = transform;
      break;
    }
  }
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: color,
        perspective: 1200,
      }}
    >
      <AbsoluteFill style={before}>{outgoing}</AbsoluteFill>
      <AbsoluteFill style={after}>{incoming}</AbsoluteFill>
      {kind === "light-leak" && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            opacity: pulse ** 3,
            background: `linear-gradient(${90 + p * 60}deg, ${color}, #FFF3D6 48%, #EBA765)`,
          }}
        />
      )}
      {kind === "flash" && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            opacity: pulse ** 1.6,
            backgroundColor: "#FFFFFF",
          }}
        />
      )}
      {kind === "tv-snap" && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: pulse ** 2,
            zIndex: 4,
          }}
        >
          <div
            style={{
              width: "100%",
              height: Math.max(2, Math.round(pulse * 6)),
              backgroundColor: "#FFFFFF",
              boxShadow: "0 0 25px 6px #FFFFFF, 0 0 50px 15px #38BDF8",
            }}
          />
        </AbsoluteFill>
      )}
      {kind === "burn" && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            opacity: pulse ** 1.3,
            mixBlendMode: "screen",
            background: `radial-gradient(ellipse at ${35 + p * 30}% ${40 + p * 20}%, #FFFDF0 0%, #FFB020 30%, #E63900 65%, transparent 85%)`,
            zIndex: 3,
          }}
        />
      )}
      {kind === "film-roll" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: Math.max(16, Math.round(height * 0.05)),
            top: height - (height + Math.max(16, Math.round(height * 0.05))) * p,
            background: "#080C10",
            borderTop: "2px solid #202E38",
            borderBottom: "2px solid #202E38",
            boxShadow: "0 0 16px rgba(0,0,0,0.85)",
            zIndex: 2,
          }}
        />
      )}
      {kind === "glitch" && pulse > 0.08 && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            opacity: pulse * 0.5,
            mixBlendMode: "screen",
            background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(56, 189, 248, 0.45) 3px, rgba(239, 68, 68, 0.45) 5px)",
            zIndex: 3,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export type TransitionOverlayProps = {
  boundaries: readonly number[];
  kind?:
    | "fade-color"
    | "light-leak"
    | "curtain"
    | "flash"
    | "whip"
    | "tv-snap"
    | "burn"
    | "shake";
  /** Total window is 2 * halfWindow + 1 frames. */
  halfWindow?: number;
  color?: string;
  zIndex?: number;
};

/** Covers existing hard cuts without moving narration/caption/scene timestamps. */
export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({
  boundaries,
  kind = "fade-color",
  halfWindow = 10,
  color = "#101820",
  zIndex = 6,
}) => {
  const frame = useCurrentFrame();
  if (
    !Number.isFinite(halfWindow) ||
    halfWindow < 1 ||
    !Number.isInteger(halfWindow)
  ) {
    throw new Error("halfWindow must be a positive integer.");
  }
  // Choose nearest cut if windows overlap; no additive flashing.
  const active = boundaries
    .filter((b) => Number.isFinite(b) && Math.abs(frame - b) <= halfWindow)
    .sort((a, b) => Math.abs(frame - a) - Math.abs(frame - b))[0];
  if (active === undefined) return null;
  const strength = overlayEnvelope(frame, active, halfWindow);

  if (kind === "flash") {
    return (
      <AbsoluteFill
        aria-hidden
        style={{
          pointerEvents: "none",
          zIndex,
          opacity: strength ** 1.6,
          backgroundColor: "#FFFFFF",
        }}
      />
    );
  }

  if (kind === "whip") {
    const progress = (frame - (active - halfWindow)) / (2 * halfWindow);
    return (
      <AbsoluteFill
        aria-hidden
        style={{
          pointerEvents: "none",
          zIndex,
          opacity: strength,
          background: `linear-gradient(90deg, transparent 0%, ${color} 40%, #FFF8EE 50%, ${color} 60%, transparent 100%)`,
          transform: `translateX(${(progress - 0.5) * 220}%)`,
        }}
      />
    );
  }

  if (kind === "tv-snap") {
    return (
      <AbsoluteFill
        aria-hidden
        style={{
          pointerEvents: "none",
          zIndex,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: Math.max(2, Math.round(strength * 6)),
            backgroundColor: "#FFFFFF",
            boxShadow: "0 0 30px 8px #FFFFFF, 0 0 60px 20px #38BDF8",
            opacity: strength ** 1.5,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (kind === "burn") {
    return (
      <AbsoluteFill
        aria-hidden
        style={{
          pointerEvents: "none",
          zIndex,
          opacity: strength ** 1.2,
          mixBlendMode: "screen",
          background: `radial-gradient(circle at 50% 50%, #FFFCE8 0%, #FF9900 35%, #E52E00 70%, transparent 90%)`,
        }}
      />
    );
  }

  if (kind === "shake") {
    const sx = Math.sin(frame * 4.1) * strength * 14;
    const sy = Math.cos(frame * 5.3) * strength * 10;
    return (
      <AbsoluteFill
        aria-hidden
        style={{
          pointerEvents: "none",
          zIndex,
          opacity: strength * 0.7,
          backgroundColor: "#000000",
          transform: `translate(${sx}px, ${sy}px)`,
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      aria-hidden
      style={{
        pointerEvents: "none",
        zIndex,
        opacity: kind === "curtain" ? 1 : strength,
        clipPath:
          kind === "curtain"
            ? `inset(0 ${(1 - strength) * 50}% 0 ${(1 - strength) * 50}%)`
            : undefined,
        background:
          kind === "light-leak"
            ? `linear-gradient(115deg, ${color}, #FFF0D6 52%, #ECA464)`
            : color,
      }}
    />
  );
};
