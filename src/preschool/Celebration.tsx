import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Confetti} from '../components/effects';

/** Silent, short reward in the drawing area; names and countdown stay unobscured. */
export const Celebration: React.FC<{seed: string; left?: number; top?: number; width?: number; height?: number}> =
  ({seed, left = 120, top = 330, width = 1040, height = 600}) => {
  const frame = useCurrentFrame();
  return <div aria-hidden style={{position: 'absolute', left, top, width, height,
    overflow: 'hidden', pointerEvents: 'none', zIndex: 2,
    opacity: interpolate(frame, [0, 8, 52, 72], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
    <div style={{position: 'absolute', inset: 0, width: 1920, height: 1080, scale: height / 1080, transformOrigin: '0 0'}}>
      <Confetti density={0.55} size={1.7} speed={1.6} wind={10} opacity={0.85}
        colors={['#f4b75e', '#78bca7', '#e990a6', '#a299d9']} seed={seed} safeBottom={130} />
    </div>
  </div>;
};
