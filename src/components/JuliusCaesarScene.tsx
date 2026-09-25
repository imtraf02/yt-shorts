import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { JuliusCaesarSceneMeta } from "../data/juliusCaesarSubtitles";

export const JuliusCaesarScene: React.FC<{
  readonly scene: JuliusCaesarSceneMeta;
}> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = Math.min(
    1,
    Math.max(0, frame / Math.max(1, durationInFrames - 1)),
  );
  const halfTransition = 9;
  const fadeIn =
    scene.id === 1
      ? 1
      : interpolate(frame, [0, halfTransition * 2], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const fadeOut =
    scene.id === 9
      ? 1
      : interpolate(
          frame,
          [durationInFrames - halfTransition * 2, durationInFrames - 1],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
  );
  const panX = scene.id % 2 === 0 ? 14 : -14;
  const translateX = interpolate(progress, [0, 1], [panX, -panX]);
  const translateY = interpolate(progress, [0, 1], [8, -8]);
  const scale = interpolate(progress, [0, 1], [1.035, 1.09]);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        backgroundColor: "#090807",
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(`images/julius-caesar/${scene.image}`)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale,
          translate: `${translateX}px ${translateY}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(12, 9, 7, 0.4) 0.9px, transparent 1.2px)",
          backgroundSize: "8px 8px",
          opacity: 0.13,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
