import "./index.css";
import { Composition } from "remotion";
import { VoxSleepShort } from "./VoxSleepShort";
import { MetalWoodShort } from "./MetalWoodShort";
import { ProcrastinationShort } from "./ProcrastinationShort";
import {
  SubscribeOverlay,
  subscribeAnimationSchema,
} from "./components/SubscribeAnimation";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
