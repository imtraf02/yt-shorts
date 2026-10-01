import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface DocumentaryKenBurnsProps {
  src: string;
  durationInFrames: number;
  motionIndex: number;
}

export const DocumentaryKenBurns: React.FC<DocumentaryKenBurnsProps> = ({
  src,
  durationInFrames,
  motionIndex,
}) => {
  const frame = useCurrentFrame();

  // 4 biến thể chuyển động camera tài liệu điện ảnh:
  // 0: Zoom-in nhẹ vào tâm
  // 1: Drift từ trái sang phải + zoom nhẹ
  // 2: Zoom-out chậm từ cận cảnh ra toàn cảnh
  // 3: Drift từ phải sang trái + zoom nhẹ
  const mode = motionIndex % 4;

  let scale = 1.0;
  let translateX = 0;
  let translateY = 0;

  const safeDuration = Math.max(2, durationInFrames);

  switch (mode) {
    case 0:
      // Zoom in từ 1.0 đến 1.10
      scale = interpolate(frame, [0, safeDuration], [1.0, 1.10], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      break;
    case 1:
      // Zoom 1.06 và Pan từ -30px sang +30px
      scale = interpolate(frame, [0, safeDuration], [1.05, 1.12], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      translateX = interpolate(frame, [0, safeDuration], [-25, 25], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      break;
    case 2:
      // Zoom out từ 1.12 về 1.02
      scale = interpolate(frame, [0, safeDuration], [1.12, 1.02], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      break;
    case 3:
      // Zoom 1.08 và Pan từ +25px sang -25px
      scale = interpolate(frame, [0, safeDuration], [1.06, 1.13], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      translateX = interpolate(frame, [0, safeDuration], [25, -25], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      translateY = interpolate(frame, [0, safeDuration], [10, -10], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      break;
  }

  // Crossfade nhẹ đầu & cuối cảnh (chỉ áp dụng khi đủ dài)
  let opacity = 1;
  const fadeDuration = Math.min(15, Math.floor(durationInFrames / 6));
  if (fadeDuration >= 1 && durationInFrames > fadeDuration * 2) {
    const endFadeStart = durationInFrames - fadeDuration;
    if (0 < fadeDuration && fadeDuration < endFadeStart && endFadeStart < durationInFrames) {
      opacity = interpolate(
        frame,
        [0, fadeDuration, endFadeStart, durationInFrames],
        [0, 1, 1, 0.2],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );
    }
  }


  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: "#05070d",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};
