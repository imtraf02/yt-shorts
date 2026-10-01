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
    case "clock":
      after.maskImage = `conic-gradient(from -90deg, black 0deg, black ${p * 360}deg, transparent ${p * 360}deg, transparent 360deg)`;
      after.WebkitMaskImage = after.maskImage;
      break;
  }
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: color }}>
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
    </AbsoluteFill>
  );
};

export type TransitionOverlayProps = {
  boundaries: readonly number[];
  kind?: "fade-color" | "light-leak" | "curtain";
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
