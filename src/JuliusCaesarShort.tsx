import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { JuliusCaesarCaptions } from "./components/JuliusCaesarCaptions";
import { JuliusCaesarHUD } from "./components/JuliusCaesarHUD";
import { JuliusCaesarProgressBar } from "./components/JuliusCaesarProgressBar";
import { JuliusCaesarScene } from "./components/JuliusCaesarScene";
import { JuliusCaesarTransition } from "./components/JuliusCaesarTransition";
import {
  JULIUS_CAESAR_AUDIO_PATH,
  JULIUS_CAESAR_PHRASES,
  JULIUS_CAESAR_SCENES,
} from "./data/juliusCaesarSubtitles";

export const JuliusCaesarShort: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#090807" }}>
    <Audio src={staticFile(JULIUS_CAESAR_AUDIO_PATH)} />

    {JULIUS_CAESAR_SCENES.map((scene) => (
      <Sequence
        key={scene.id}
        from={scene.startFrame}
        durationInFrames={scene.durationInFrames}
        name={`Scene-${scene.id}`}
      >
        <JuliusCaesarScene scene={scene} />
      </Sequence>
    ))}

    <JuliusCaesarTransition
      boundaries={JULIUS_CAESAR_SCENES.slice(1).map(
        (scene) => scene.captionStartFrame,
      )}
    />

    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        boxSizing: "border-box",
        border: "12px solid #211815",
        boxShadow:
          "inset 0 0 0 3px rgba(255, 238, 205, 0.84), inset 0 0 0 6px rgba(124, 32, 37, 0.86), inset 0 0 30px rgba(0, 0, 0, 0.38)",
        pointerEvents: "none",
        zIndex: 150,
      }}
    />

    <div style={{ display: "none" }} aria-hidden>
      {JULIUS_CAESAR_SCENES.map((scene) => (
        <Img
          key={scene.image}
          src={staticFile(`images/julius-caesar/${scene.image}`)}
        />
      ))}
    </div>

    <JuliusCaesarHUD />
    <JuliusCaesarProgressBar />
    <JuliusCaesarCaptions phrases={JULIUS_CAESAR_PHRASES} bottom={290} />
  </AbsoluteFill>
);
