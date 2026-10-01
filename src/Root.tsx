import "./index.css";
import React from "react";
import { Composition, Folder } from "remotion";
import { PharaohDocumentary } from "./PharaohDocumentary";
import { TOTAL_PHARAOH_FRAMES } from "./data/pharaohData";
import { MayaDocumentary } from "./MayaDocumentary";
import { TOTAL_MAYA_FRAMES } from "./data/mayaData";
import { HistoryGapsDocumentary } from "./HistoryGapsDocumentary";
import { TOTAL_HISTORY_GAPS_FRAMES } from "./data/historyGapsData";
import { FacebookWhoPaysDocumentary } from "./FacebookWhoPaysDocumentary";
import { TOTAL_FACEBOOK_WHO_PAYS_FRAMES } from "./data/facebookWhoPaysData";
import { GameHistoryDocumentary } from "./GameHistoryDocumentary";
import { TOTAL_GAME_HISTORY_FRAMES } from "./data/gameHistoryData";
import { VacxinDocumentary } from "./VacxinDocumentary";
import { TOTAL_VACXIN_FRAMES } from "./data/vacxinData";
import { BinaryDocumentary } from "./BinaryDocumentary";
import { TOTAL_BINARY_FRAMES } from "./data/binaryData";
import { UndergroundDocumentary } from "./UndergroundDocumentary";
import { TOTAL_UNDERGROUND_FRAMES } from "./data/undergroundData";
import { WorldTimeDocumentary } from "./WorldTimeDocumentary";
import { TOTAL_WORLD_TIME_FRAMES } from "./data/worldTimeData";
import { EffectsCompositions } from "./EffectsLibrary";
import { TransitionCompositions } from "./TransitionsLibrary";
import { CaptionCompositions } from "./CaptionsLibrary";
import { CinematicCompositions } from "./CinematicEffectsLibrary";
import { CharacterComponentCompositions } from "./CharacterComponentsLibrary";
import { VietnameseFontCompositions } from "./VietnameseFontsLibrary";
import { PreschoolCompositions } from "./PreschoolLibrary";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <EffectsCompositions />
      <TransitionCompositions />
      <CaptionCompositions />
      <CinematicCompositions />
      <CharacterComponentCompositions />
      <VietnameseFontCompositions />
      <PreschoolCompositions />
      <Folder name="Documentaries">
        <Composition
          id="PharaohDocumentary"
          component={PharaohDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_PHARAOH_FRAMES}
        />
        <Composition
          id="MayaDocumentary"
          component={MayaDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_MAYA_FRAMES}
        />
        <Composition
          id="HistoryGapsDocumentary"
          component={HistoryGapsDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_HISTORY_GAPS_FRAMES}
        />
        <Composition
          id="FacebookWhoPaysDocumentary"
          component={FacebookWhoPaysDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_FACEBOOK_WHO_PAYS_FRAMES}
        />
        <Composition
          id="GameHistoryDocumentary"
          component={GameHistoryDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_GAME_HISTORY_FRAMES}
        />
        <Composition
          id="VacxinDocumentary"
          component={VacxinDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_VACXIN_FRAMES}
        />
        <Composition
          id="BinaryDocumentary"
          component={BinaryDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_BINARY_FRAMES}
        />
        <Composition
          id="UndergroundDocumentary"
          component={UndergroundDocumentary}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={TOTAL_UNDERGROUND_FRAMES}
        />
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
