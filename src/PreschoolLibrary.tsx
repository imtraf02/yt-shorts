import React from 'react';
import {Composition, Folder} from 'remotion';
import timeline from './data/preschool-animals-whiteboard-demo/timeline.json';

const loadDemo = async (): Promise<{default: React.FC}> => {
  const module = await import('./preschool/PreschoolAnimalsDemo');
  return {default: module.PreschoolAnimalsDemo};
};

export const PreschoolCompositions: React.FC = () => <Folder name="Preschool">
  <Composition id="PreschoolAnimalsWhiteboardDemo" defaultProps={{}} width={1920} height={1080} fps={30} durationInFrames={timeline.durationInFrames}
    lazyComponent={loadDemo} />
</Folder>;
