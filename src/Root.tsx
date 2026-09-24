import "./index.css";
import { Composition } from "remotion";
import { VoxSleepShort } from "./VoxSleepShort";
import { MetalWoodShort } from "./MetalWoodShort";
import { ProcrastinationShort } from "./ProcrastinationShort";
import { DeskBodyBreaksShort } from "./DeskBodyBreaksShort";
import { DeadlineCortisolShort } from "./DeadlineCortisolShort";
import { FakeBusySyndromeShort } from "./FakeBusySyndromeShort";
import { ZeigarnikEffectShort } from "./ZeigarnikEffectShort";
import { NewtonHiddenLivesShort } from "./NewtonHiddenLivesShort";
import { TeslaHiddenLivesShort } from "./TeslaHiddenLivesShort";
import { NapoleonShort } from "./NapoleonShort";
import { GenghisKhanShort } from "./GenghisKhanShort";
import { QinShiHuangShort } from "./QinShiHuangShort";
import { CaligulaQuirksShort } from "./CaligulaQuirksShort";
import { ChaplinHiddenLivesShort } from "./ChaplinHiddenLivesShort";
import { DarwinQuirksShort } from "./DarwinQuirksShort";
import { EinsteinQuirksShort } from "./EinsteinQuirksShort";
import {
  SubscribeOverlay,
  subscribeAnimationSchema,
} from "./components/SubscribeAnimation";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NapoleonShort"
        component={NapoleonShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2850}
      />
      <Composition
        id="GenghisKhanShort"
        component={GenghisKhanShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={3120}
      />
      <Composition
        id="QinShiHuangShort"
        component={QinShiHuangShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2640}
      />
      <Composition
        id="CaligulaQuirksShort"
        component={CaligulaQuirksShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2670}
      />
      <Composition
        id="ChaplinHiddenLivesShort"
        component={ChaplinHiddenLivesShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2000}
      />
      <Composition
        id="DarwinQuirksShort"
        component={DarwinQuirksShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2880}
      />
      <Composition
        id="EinsteinQuirksShort"
        component={EinsteinQuirksShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2910}
      />
      <Composition
        id="TeslaHiddenLivesShort"
        component={TeslaHiddenLivesShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2820}
      />
      <Composition
        id="NewtonHiddenLivesShort"
        component={NewtonHiddenLivesShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2940}
      />
      <Composition
        id="ZeigarnikEffectShort"
        component={ZeigarnikEffectShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2370}
      />
      <Composition
        id="FakeBusySyndromeShort"
        component={FakeBusySyndromeShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2235}
      />
      <Composition
        id="DeadlineCortisolShort"
        component={DeadlineCortisolShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={1884}
      />
      <Composition
        id="DeskBodyBreaksShort"
        component={DeskBodyBreaksShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2310}
      />
      <Composition
        id="ProcrastinationShort"
        component={ProcrastinationShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2790}
      />
      <Composition
        id="MetalWoodShort"
        component={MetalWoodShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={1500}
      />
      <Composition
        id="SubscribeOverlay"
        component={SubscribeOverlay}
        schema={subscribeAnimationSchema}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={120} // 4 seconds animation
        defaultProps={{
          channelName: "Antigravity Dev",
          channelHandle: "@antigravity_dev",
          subscribersCount: "128K người đăng ký",
          theme: "dark",
          scale: 1.1,
          accentColor: "#ef4444",
        }}
      />
      <Composition
        id="VoxSleepShort"
        component={VoxSleepShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={2650}
      />
    </>
  );
};
