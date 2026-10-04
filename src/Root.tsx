import "./index.css";
import React from "react";
import { Composition, Folder } from "remotion";
import { WorldTimeDocumentary } from "./WorldTimeDocumentary";
import { TOTAL_WORLD_TIME_FRAMES } from "./data/worldTimeData";
import { EffectsCompositions } from "./EffectsLibrary";
import { TransitionCompositions } from "./TransitionsLibrary";
import { CaptionCompositions } from "./CaptionsLibrary";
import { CinematicCompositions } from "./CinematicEffectsLibrary";
import { CharacterComponentCompositions } from "./CharacterComponentsLibrary";
import { VietnameseFontCompositions } from "./VietnameseFontsLibrary";
import { PreschoolCompositions } from "./PreschoolLibrary";
import { LongVideoOutro, LONG_OUTRO_FRAMES, longOutroSchema } from "./LongVideoOutro";
import outroBrand from "./data/long-video-outro/brand.json";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Outros">
        <Composition id="LongVideoOutro" component={LongVideoOutro} schema={longOutroSchema} defaultProps={outroBrand} width={1920} height={1080} fps={30} durationInFrames={LONG_OUTRO_FRAMES} />
      </Folder>
      <EffectsCompositions />
      <TransitionCompositions />
      <CaptionCompositions />
      <CinematicCompositions />
      <CharacterComponentCompositions />
      <VietnameseFontCompositions />
      <PreschoolCompositions />
      <Folder name="Documentaries">
        <Composition
          id="WorldTimeDocumentary"
          component={WorldTimeDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_WORLD_TIME_FRAMES}
        />
      </Folder>
    </>
  );
};
