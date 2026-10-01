import React from "react";
import {
  AbsoluteFill,
  Composition,
  Folder,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  DIRECTIONS,
  SceneTransition,
  TRANSITION_KINDS,
  TRANSITION_PRESETS,
} from "./components/transitions";
import type {
  TransitionDirection,
  TransitionKind,
} from "./components/transitions";
import { LeninDisclaimer } from "./components/LeninDisclaimer";

const Landscape: React.FC<{ night: boolean }> = ({ night }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: night ? "#192C47" : "#E8C091" }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx={night ? 600 : 210}
          cy={110}
          r={55}
          fill={night ? "#D1E7ED" : "#F8E8C5"}
        />
        {night && (
          <g fill="#D1E7ED" opacity={0.5}>
            <circle cx="100" cy="80" r="2" />
            <circle cx="300" cy="40" r="3" />
            <circle cx="460" cy="150" r="2" />
            <circle cx="700" cy="50" r="2" />
          </g>
        )}
        <path
          d="M-20 400L140 170L270 330L470 120L740 400L820 300V470H-20Z"
          fill={night ? "#345573" : "#AA775B"}
        />
        <path
          d="M345 276L470 120L585 240L501 211L463 239L434 202Z"
          fill={night ? "#8AAFC6" : "#E1BA96"}
        />
        <path
          d="M-20 420Q210 200 450 405Q610 285 820 365V470H-20Z"
          fill={night ? "#1D425B" : "#566858"}
        />
        <path
          d="M-20 460Q170 300 340 440Q590 270 820 430V470H-20Z"
          fill={night ? "#132E43" : "#354D44"}
        />
      </svg>
    </AbsoluteFill>
  );
};

const TransitionLoop: React.FC<{
  kind: TransitionKind;
  durationInFrames: number;
  direction: TransitionDirection;
  color: string;
}> = (props) => {
  const frame = useCurrentFrame();
  const cycleLength = props.durationInFrames + 60;
  const cycle = Math.floor(frame / cycleLength);
  return (
    <Sequence from={cycle * cycleLength} name="Transition sample">
      <SceneTransition
        {...props}
        from={30}
        outgoing={<Landscape night={cycle % 2 !== 0} />}
        incoming={<Landscape night={cycle % 2 === 0} />}
      />
    </Sequence>
  );
};

export const TransitionsGallery: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#111A20",
      color: "#F6EEE3",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 42,
        left: 64,
        fontSize: 20,
        letterSpacing: 5,
        color: "#CFB9A1",
      }}
    >
      THƯ VIỆN CHUYỂN ĐỘNG / 02
    </div>
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 60,
        fontSize: 66,
        fontWeight: 700,
      }}
    >
      Một nhịp nối. Một cảm xúc mới.
    </div>
    <div
      style={{
        position: "absolute",
        top: 105,
        right: 64,
        color: "#CFB9A1",
        fontSize: 21,
      }}
    >
      12 CHUYỂN CẢNH · 4 NHÓM
    </div>
    {TRANSITION_KINDS.map((kind, index) => (
      <div
        key={kind}
        style={{
          position: "absolute",
          left: 64 + (index % 4) * 452,
          top: 198 + Math.floor(index / 4) * 262,
          width: 434,
          height: 244,
          overflow: "hidden",
          borderRadius: 18,
          border: "1px solid #FFFFFF18",
        }}
      >
        <Sequence width={434} height={244} name={kind}>
          <TransitionLoop
            kind={kind}
            durationInFrames={30}
            direction="left"
            color="#15282C"
          />
        </Sequence>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(transparent 40%, #060B1499)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 22,
            fontSize: 14,
            letterSpacing: 1.5,
            color: "#FFFFFFBB",
          }}
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {TRANSITION_PRESETS[kind].pack.toUpperCase()}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 22,
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          {TRANSITION_PRESETS[kind].label}
        </div>
      </div>
    ))}
    <div
      style={{
        position: "absolute",
        left: 64,
        bottom: 38,
        fontSize: 19,
        color: "#CFB9A1",
      }}
    >
      Documentary · Editorial · Organic · Cinematic
    </div>
    <LeninDisclaimer right={40} bottom={24} />
  </AbsoluteFill>
);

export const transitionPreviewSchema = z.object({
  kind: z.enum(TRANSITION_KINDS),
  durationInFrames: z.number().int().min(1).max(90),
  direction: z.enum(DIRECTIONS),
  color: zColor(),
});

const TransitionPreview: React.FC<z.infer<typeof transitionPreviewSchema>> = (
  props,
) => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return (
    <AbsoluteFill style={{ fontFamily: "Arial, sans-serif" }}>
      <TransitionLoop {...props} />
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 36,
          padding: "12px 24px",
          width: "fit-content",
          borderRadius: 32,
          background: "#102324CC",
          color: "#F4ECDC",
          fontSize: 24,
        }}
      >
        ● CHUYỂN CẢNH / {TRANSITION_PRESETS[props.kind].pack.toUpperCase()}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: height * 0.42,
          fontSize: portrait ? 82 : 104,
          fontWeight: 700,
          color: "#FFF5E7",
          textShadow: "0 3px 25px #00000055",
        }}
      >
        {TRANSITION_PRESETS[props.kind].label}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: portrait ? 310 : 100,
          color: "#FFF5E7",
          fontSize: 30,
        }}
      >
        {props.durationInFrames} frames · Hình chuyển, lời kể tiếp nối
      </div>
      <LeninDisclaimer bottom={portrait ? 240 : 24} right={40} />
    </AbsoluteFill>
  );
};

export const TransitionCompositions: React.FC = () => (
  <Folder name="Transitions">
    <Composition
      id="TransitionsGallery"
      component={TransitionsGallery}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={360}
    />
    <Composition
      id="TransitionPreviewWide"
      component={TransitionPreview}
      schema={transitionPreviewSchema}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={360}
      defaultProps={{
        kind: "dissolve",
        durationInFrames: 24,
        direction: "left",
        color: "#15282C",
      }}
    />
    <Composition
      id="TransitionPreviewShort"
      component={TransitionPreview}
      schema={transitionPreviewSchema}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={360}
      defaultProps={{
        kind: "iris",
        durationInFrames: 28,
        direction: "left",
        color: "#15282C",
      }}
    />
  </Folder>
);
