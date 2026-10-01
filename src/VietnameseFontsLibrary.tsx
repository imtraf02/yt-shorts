import React from "react";
import { Composition, Folder } from "remotion";

export const VietnameseFontCompositions: React.FC = () => (
  <Folder name="Vietnamese-Fonts">
    <Composition
      id="VietnameseFontsGallery"
      lazyComponent={() => import("./VietnameseFontsGallery")}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={150}
    />
  </Folder>
);
