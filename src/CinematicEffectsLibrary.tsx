import React from "react";
import {
  AbsoluteFill,
  Composition,
  Folder,
  Sequence,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import {
  CinematicOverlay,
  CINEMATIC_KINDS,
  CINEMATIC_PRESETS,
} from "./components/effects";
import { LeninDisclaimer } from "./components/LeninDisclaimer";

const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: "#213B48" }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="560" cy="115" r="55" fill="#EBD9B8" />
      <path d="M0 390L175 160L365 360L510 215L800 380V450H0Z" fill="#49696B" />
      <path
        d="M105 250L175 160L250 255L197 236L171 258L152 224Z"
        fill="#ADBCA9"
      />
      <path d="M0 395Q250 260 480 400Q650 330 800 360V450H0Z" fill="#152A34" />
      <path
        d="M350 450Q300 395 410 367Q460 354 435 332"
        stroke="#76999B"
        strokeWidth="14"
        fill="none"
      />
    </svg>
  </AbsoluteFill>
);

export const CinematicGallery: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#101A20",
      color: "#EFEDE2",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 64,
        top: 42,
        fontSize: 20,
        letterSpacing: 5,
        color: "#BDB9A2",
      }}
    >
      THƯ VIỆN CHUYỂN ĐỘNG / 04
    </div>
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 80,
        fontSize: 64,
        fontWeight: 700,
      }}
    >
      Thêm chất điện ảnh cho khung hình.
    </div>
    {CINEMATIC_KINDS.map((kind, index) => (
      <div
        key={kind}
        style={{
          position: "absolute",
          left: 64 + (index % 4) * 452,
          top: 210 + Math.floor(index / 4) * 380,
          width: 434,
          height: 352,
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid #FFFFFF20",
        }}
      >
        <Sequence width={434} height={352} name={kind}>
          <Backdrop />
          <CinematicOverlay
            kind={kind}
            intensity={kind === "film-grain" ? 0.85 : 0.75}
            seed={`gallery-${kind}`}
            safeBottom={68}
          />
        </Sequence>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(transparent 55%, #07121DEB)",
            zIndex: 7,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 18,
            fontSize: 17,
            color: "#FFFFFFBB",
            zIndex: 8,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 49,
            left: 22,
            fontSize: 28,
            fontWeight: 700,
            zIndex: 8,
          }}
        >
          {CINEMATIC_PRESETS[kind].label}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 22,
            fontSize: 17,
            color: "#C0CACC",
            zIndex: 8,
          }}
        >
          {CINEMATIC_PRESETS[kind].hint}
        </div>
      </div>
    ))}
    <div
      style={{
        position: "absolute",
        left: 64,
        bottom: 38,
        fontSize: 20,
        color: "#BDB9A2",
      }}
    >
      8 lớp phủ mới · Tùy chỉnh cường độ, tốc độ · Không kèm âm thanh
    </div>
    <LeninDisclaimer right={40} bottom={24} />
  </AbsoluteFill>
);

const schema = z.object({
  kind: z.enum(CINEMATIC_KINDS),
  intensity: z.number().min(0).max(1),
  speed: z.number().min(0).max(5),
  seed: z.string(),
  transparent: z.boolean(),
});
const Preview: React.FC<z.infer<typeof schema>> = ({
  transparent,
  ...props
}) => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return (
    <AbsoluteFill style={{ fontFamily: "Arial, sans-serif" }}>
      {!transparent && <Backdrop />}
      <CinematicOverlay
        {...props}
        safeBottom={transparent ? 0 : portrait ? 380 : 150}
      />
      {!transparent && (
        <>
          <div
            style={{
              position: "absolute",
              top: 96,
              left: 36,
              width: "fit-content",
              padding: "12px 24px",
              borderRadius: 32,
              background: "#06131ACC",
              color: "#D8F0E3",
              fontSize: 24,
              zIndex: 10,
            }}
          >
            ● HIỆU ỨNG ĐIỆN ẢNH
          </div>
          <div
            style={{
              position: "absolute",
              left: 80,
              right: 80,
              top: height * 0.4,
              color: "#FFFFFF",
              fontSize: portrait ? 82 : 102,
              fontWeight: 700,
              textShadow: "0 3px 12px #00000066",
              zIndex: 10,
            }}
          >
            {CINEMATIC_PRESETS[props.kind].label}
          </div>
          <LeninDisclaimer right={40} bottom={portrait ? 240 : 24} />
        </>
      )}
    </AbsoluteFill>
  );
};

export const CinematicCompositions: React.FC = () => (
  <Folder name="Cinematic-Effects">
    <Composition
      id="CinematicGallery"
      component={CinematicGallery}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={360}
    />
    <Composition
      id="CinematicPreviewWide"
      component={Preview}
      schema={schema}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={360}
      defaultProps={{
        kind: "bokeh",
        intensity: 0.6,
        speed: 1,
        seed: "preview",
        transparent: false,
      }}
    />
    <Composition
      id="CinematicPreviewShort"
      component={Preview}
      schema={schema}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={360}
      defaultProps={{
        kind: "speed-lines",
        intensity: 0.6,
        speed: 1,
        seed: "preview",
        transparent: false,
      }}
    />
  </Folder>
);
