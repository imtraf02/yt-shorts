import React from "react";
import {
  AbsoluteFill,
  Composition,
  Folder,
  Sequence,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Atmosphere, EFFECT_KINDS, EFFECT_PRESETS } from "./components/effects";
import type { EffectKind } from "./components/effects";
import { LeninDisclaimer } from "./components/LeninDisclaimer";

const SceneBackdrop: React.FC<{ kind: EffectKind }> = ({ kind }) => {
  const { width, height } = useVideoConfig();
  const color = EFFECT_PRESETS[kind].background;
  return (
    <AbsoluteFill style={{ background: color }}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <circle
          cx={width * 0.78}
          cy={height * 0.27}
          r={height * 0.14}
          fill="#F8D8A0"
          opacity={0.07}
        />
        <path
          d={`M0 ${height * 0.8} Q${width * 0.25} ${height * 0.35} ${width * 0.52} ${height * 0.83} Q${width * 0.8} ${height * 0.55} ${width} ${height * 0.76} V${height} H0Z`}
          fill="#050D19"
          opacity={0.32}
        />
        <path
          d={`M0 ${height * 0.96} Q${width * 0.4} ${height * 0.6} ${width} ${height * 0.92} V${height} H0Z`}
          fill="#040A14"
          opacity={0.35}
        />
      </svg>
    </AbsoluteFill>
  );
};

/** A silent, animated contact sheet, not a final documentary. */
export const EffectsGallery: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#0D171C",
      fontFamily: "Arial, sans-serif",
      color: "#EDF2E9",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 64,
        top: 42,
        fontSize: 20,
        letterSpacing: 5,
        color: "#A8BEA8",
      }}
    >
      THƯ VIỆN CHUYỂN ĐỘNG / 01
    </div>
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 80,
        fontSize: 66,
        fontWeight: 700,
      }}
    >
      Không khí cho từng câu chuyện.
    </div>
    <div
      style={{
        position: "absolute",
        right: 64,
        top: 105,
        fontSize: 21,
        color: "#A8BEA8",
      }}
    >
      12 HIỆU ỨNG · 16:9 + 9:16
    </div>
    {EFFECT_KINDS.map((kind, index) => (
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
        <Sequence name={kind} width={434} height={244}>
          <SceneBackdrop kind={kind} />
          <Atmosphere
            kind={kind}
            density={0.85}
            size={1.5}
            opacity={0.95}
            wind={kind === "rain" ? 150 : 30}
            seed={`gallery-${kind}`}
            safeBottom={28}
          />
        </Sequence>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(transparent 48%, #060B1466)",
            zIndex: 5,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 20,
            fontSize: 15,
            letterSpacing: 2,
            color: "#FFFFFF66",
            zIndex: 6,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 22,
            fontSize: 28,
            fontWeight: 600,
            zIndex: 6,
          }}
        >
          {EFFECT_PRESETS[kind].label}
        </div>
      </div>
    ))}
    <div
      style={{
        position: "absolute",
        left: 64,
        bottom: 38,
        fontSize: 19,
        color: "#A8BEA8",
      }}
    >
      Lớp phủ trong suốt · Màu, mật độ, tốc độ tùy chỉnh · Không kèm âm thanh
    </div>
    <LeninDisclaimer right={40} bottom={24} />
  </AbsoluteFill>
);

export const effectsPreviewSchema = z.object({
  kind: z.enum(EFFECT_KINDS),
  density: z.number().min(0).max(3),
  speed: z.number().min(0).max(8),
  wind: z.number().min(-1000).max(1000),
  size: z.number().min(0.1).max(5),
  opacity: z.number().min(0).max(1),
  seed: z.string(),
  safeBottom: z.number().min(0).max(1920),
  transparent: z.boolean(),
});

const EffectsPreview: React.FC<z.infer<typeof effectsPreviewSchema>> = ({
  transparent,
  ...props
}) => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return (
    <AbsoluteFill style={{ fontFamily: "Arial, sans-serif" }}>
      {!transparent && (
        <>
          <SceneBackdrop kind={props.kind} />
          <div
            style={{
              position: "absolute",
              top: 96,
              left: 36,
              padding: "12px 24px",
              borderRadius: 36,
              width: "fit-content",
              background: "#06131799",
              color: "#DCF5DF",
              fontSize: 24,
              zIndex: 10,
            }}
          >
            ● THƯ VIỆN HIỆU ỨNG
          </div>
          <div
            style={{
              position: "absolute",
              left: 80,
              top: height * 0.35,
              right: 80,
              fontSize: portrait ? 90 : 112,
              color: "#EFF4E9",
              fontWeight: 700,
              lineHeight: 1.1,
              zIndex: 10,
            }}
          >
            {EFFECT_PRESETS[props.kind].label}
          </div>
          <div
            style={{
              position: "absolute",
              left: 80,
              right: 80,
              bottom: portrait ? 310 : 100,
              fontSize: portrait ? 36 : 32,
              color: "#E7ECD9",
              zIndex: 10,
            }}
          >
            Lớp chuyển động nhẹ, để câu chuyện luôn ở trung tâm.
          </div>
          <LeninDisclaimer bottom={portrait ? 240 : 24} right={40} />
        </>
      )}
      <Atmosphere {...props} />
    </AbsoluteFill>
  );
};

export const EffectsCompositions: React.FC = () => (
  <Folder name="Effects">
    <Composition
      id="EffectsGallery"
      component={EffectsGallery}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={360}
    />
    <Composition
      id="EffectsPreviewWide"
      component={EffectsPreview}
      schema={effectsPreviewSchema}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={360}
      defaultProps={{
        kind: "leaves",
        density: 1,
        speed: 1,
        wind: 30,
        size: 1,
        opacity: 0.75,
        seed: "preview",
        safeBottom: 130,
        transparent: false,
      }}
    />
    <Composition
      id="EffectsPreviewShort"
      component={EffectsPreview}
      schema={effectsPreviewSchema}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={360}
      defaultProps={{
        kind: "snow",
        density: 1,
        speed: 1,
        wind: 15,
        size: 1,
        opacity: 0.75,
        seed: "preview",
        safeBottom: 380,
        transparent: false,
      }}
    />
  </Folder>
);
