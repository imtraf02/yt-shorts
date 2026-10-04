import React from "react";
import {Img, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

export interface CharacterAnimationData {
  durationMs: number;
  loop: boolean;
  sequence: {file: string; durationMs: number}[];
}

/** Uses the asset's real frame durations and remains deterministic when seeking. */
export const CharacterFrameAnimation: React.FC<{
  directory: string;
  animation: CharacterAnimationData;
  height?: number;
  characterName?: string;
}> = ({directory, animation, height = 180, characterName = "Trà Xanh"}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const totalMs = animation.sequence.reduce((sum, item) => sum + item.durationMs, 0);
  const elapsedMs = frame * 1000 / fps;
  const localMs = animation.loop ? elapsedMs % totalMs : Math.min(elapsedMs, totalMs - 0.001);
  let boundary = 0;
  const item = animation.sequence.find((entry) => {
    boundary += entry.durationMs;
    return localMs < boundary;
  }) ?? animation.sequence[animation.sequence.length - 1];
  return <Img name={`${characterName} — hoạt ảnh có sẵn`} src={staticFile(`${directory}/${item.file}`)}
    style={{height, width: height, objectFit: "contain", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"}} />;
};
