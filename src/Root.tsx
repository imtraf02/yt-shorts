import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { VictoriaShort } from "./VictoriaShort";
import { VICTORIA_TOTAL_FRAMES } from "./data/victoriaSubtitles";
import { AlexanderShort } from "./AlexanderShort";
import { ALEXANDER_TOTAL_FRAMES } from "./data/alexanderSubtitles";
import { VanGoghShort } from "./VanGoghShort";
import { VANGOGH_TOTAL_FRAMES } from "./data/vangoghSubtitles";
import { JuliusCaesarShort } from "./JuliusCaesarShort";
import { JULIUS_CAESAR_TOTAL_FRAMES } from "./data/juliusCaesarSubtitles";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VictoriaShort"
        component={VictoriaShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={VICTORIA_TOTAL_FRAMES}
      />
      <Composition
        id="AlexanderShort"
        component={AlexanderShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={ALEXANDER_TOTAL_FRAMES}
      />
      <Composition
        id="VanGoghShort"
        component={VanGoghShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={VANGOGH_TOTAL_FRAMES}
      />
      <Composition
        id="JuliusCaesarShort"
        component={JuliusCaesarShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={JULIUS_CAESAR_TOTAL_FRAMES}
      />
    </>
  );
};
