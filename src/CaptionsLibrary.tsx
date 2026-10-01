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
import {
  CAPTION_EFFECTS,
  CAPTION_PRESETS,
  KineticCaptions,
} from "./components/caption-effects";
import type { CaptionEffect } from "./components/caption-effects";
import demoCaptions from "./data/caption-effects-demo.json";
import { LeninDisclaimer } from "./components/LeninDisclaimer";
import { Atmosphere } from "./components/effects";

const DemoCaptionLoop: React.FC<{
  effect: CaptionEffect;
  theme: "gold" | "cyan" | "emerald";
  gallery?: boolean;
  panel?: boolean;
}> = ({ effect, theme, gallery, panel }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cycle = Math.floor(frame / (fps * 7));
  return (
    <Sequence from={cycle * fps * 7} name="Caption demo">
      <KineticCaptions
        captions={demoCaptions}
        effect={effect}
        theme={theme}
        keywords={["chuyện", "nhịp", "Thời", "gian", "giới."]}
        fontSize={gallery ? 28 : undefined}
        bottom={gallery ? 77 : undefined}
        maxWidth={gallery ? 538 : undefined}
        strokeWidth={gallery ? 5 : 10}
        panel={panel}
      />
    </Sequence>
  );
};

export const CaptionsGallery: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#101921",
      color: "#F0F3EA",
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
        color: "#AAC6D0",
      }}
    >
      THƯ VIỆN CHUYỂN ĐỘNG / 03
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
      Lời kể có nhịp. Từng chữ có hồn.
    </div>
    <div
      style={{
        position: "absolute",
        top: 105,
        right: 64,
        color: "#AAC6D0",
        fontSize: 21,
      }}
    >
      9 KIỂU · 3 BẢNG MÀU
    </div>
    {CAPTION_EFFECTS.map((effect, index) => (
      <div
        key={effect}
        style={{
          position: "absolute",
          left: 64 + (index % 3) * 604,
          top: 198 + Math.floor(index / 3) * 262,
          width: 578,
          height: 244,
          overflow: "hidden",
          borderRadius: 18,
          border: "1px solid #FFFFFF18",
          background: "linear-gradient(140deg, #25404A, #14232D 65%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 24,
            color: "#D7E8E1",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          {String(index + 1).padStart(2, "0")} / {CAPTION_PRESETS[effect].label}
        </div>
        <Sequence width={578} height={244} name={effect}>
          <DemoCaptionLoop
            effect={effect}
            theme={
              index % 3 === 0 ? "gold" : index % 3 === 1 ? "cyan" : "emerald"
            }
            gallery
          />
        </Sequence>
        <div
          style={{
            position: "absolute",
            bottom: 19,
            left: 24,
            fontSize: 18,
            color: "#A3C0C8",
          }}
        >
          {CAPTION_PRESETS[effect].description}
        </div>
      </div>
    ))}
    <div
      style={{
        position: "absolute",
        left: 64,
        bottom: 38,
        color: "#AAC6D0",
        fontSize: 19,
      }}
    >
      Demo không âm thanh · Timestamp minh họa · Sẵn sàng nhận dữ liệu Whisper
    </div>
    <LeninDisclaimer right={40} bottom={24} />
  </AbsoluteFill>
);

export const captionsPreviewSchema = z.object({
  effect: z.enum(CAPTION_EFFECTS),
  theme: z.enum(["gold", "cyan", "emerald"]),
  panel: z.boolean(),
});

const CaptionsPreview: React.FC<z.infer<typeof captionsPreviewSchema>> = (
  props,
) => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(155deg, #24463F, #121F31 65%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Atmosphere kind="dust" opacity={0.4} safeBottom={portrait ? 420 : 200} />
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 36,
          padding: "12px 24px",
          borderRadius: 32,
          width: "fit-content",
          background: "#07151ACC",
          color: "#D4F2D9",
          fontSize: 24,
        }}
      >
        ● PHỤ ĐỀ ĐỘNG
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: height * 0.34,
          fontSize: portrait ? 86 : 106,
          lineHeight: 1.15,
          color: "#F2F4EA",
          fontWeight: 700,
        }}
      >
        {CAPTION_PRESETS[props.effect].label}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: height * 0.53,
          color: "#B7CDCA",
          fontSize: 28,
        }}
      >
        Mẫu chữ chuyển động theo từng từ.
        <br />
        Không có voiceover trong bản demo.
      </div>
      <DemoCaptionLoop {...props} />
      <LeninDisclaimer bottom={portrait ? 240 : 24} right={40} />
    </AbsoluteFill>
  );
};

export const CaptionCompositions: React.FC = () => (
  <Folder name="Caption-Effects">
    <Composition
      id="CaptionsGallery"
      component={CaptionsGallery}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={420}
    />
    <Composition
      id="CaptionsPreviewWide"
      component={CaptionsPreview}
      schema={captionsPreviewSchema}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={420}
      defaultProps={{ effect: "karaoke", theme: "gold", panel: false }}
    />
    <Composition
      id="CaptionsPreviewShort"
      component={CaptionsPreview}
      schema={captionsPreviewSchema}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={420}
      defaultProps={{ effect: "pop", theme: "cyan", panel: false }}
    />
  </Folder>
);
