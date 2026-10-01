import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import geometry from '../data/preschool-animals-whiteboard-demo/strokes.json';
import animals from '../data/preschool-animals-whiteboard-demo/animals.json';

export type Animal = keyof typeof geometry;
export const ANIMALS = animals;

/** Only SVG line geometry is derived; original JPEGs remain unchanged. */
export const WhiteboardAnimal: React.FC<{
  animal: Animal; width: number; height: number; ink?: number; color?: number; pen?: boolean;
}> = ({animal, width, height, ink = 1, color = 1, pen = false}) => {
  const data = geometry[animal];
  const target = data.totalLength * Math.min(1, Math.max(0, ink));
  const active = data.strokes.find((s) => s.start + s.length >= target) ?? data.strokes[data.strokes.length - 1];
  const distance = Math.max(0, target - active.start);
  const nextIndex = active.lengths.findIndex((n) => n >= distance);
  const index = Math.max(1, nextIndex < 0 ? active.points.length - 1 : nextIndex);
  const from = active.points[index - 1];
  const to = active.points[index];
  const fraction = (distance - active.lengths[index - 1]) / Math.max(1, active.lengths[index] - active.lengths[index - 1]);
  const px = interpolate(fraction, [0, 1], [from[0], to[0]], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const py = interpolate(fraction, [0, 1], [from[1], to[1]], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const [x, y, w, h] = data.box;
  const scale = Math.min(width / w, height / h);
  const assetSrc = 'assetSrc' in data && typeof data.assetSrc === 'string'
    ? data.assetSrc : `images/preschool-animals-whiteboard-demo/cutouts/${animal}.png`;
  return <div style={{position: 'relative', width, height, overflow: 'hidden', flexShrink: 0, display: 'inline-block', verticalAlign: 'top'}}>
    <Img src={staticFile(assetSrc)} style={{
      position: 'absolute', left: (width - w * scale) / 2 - x * scale, top: (height - h * scale) / 2 - y * scale,
      width: data.width * scale, height: data.height * scale, maxWidth: 'none', maxHeight: 'none', display: 'block', opacity: Math.min(1, color * 3),
      clipPath: `inset(0 0 ${(1 - color) * 100}% 0)`,
    }} />
    <svg width={width} height={height} viewBox={`${x} ${y} ${w} ${h}`} style={{position: 'absolute', inset: 0}}>
    <g fill="none" stroke="#496a5a" strokeWidth={4.2} strokeLinejoin="round" strokeLinecap="round" opacity={1 - color}>
      {data.strokes.map((stroke, i) => {
        const revealed = Math.max(0, Math.min(stroke.length, target - stroke.start));
        return revealed > 0 ? <path key={i} d={stroke.d} strokeDasharray={`${stroke.length} ${stroke.length + 1}`} strokeDashoffset={stroke.length - revealed} /> : null;
      })}
    </g>
    {pen && ink > 0 && ink < 1 && <g transform={`translate(${px}, ${py}) rotate(35)`}>
      <path d="M0 0L-8 -23L8 -23Z" fill="#edd0a0" stroke="#694834" strokeWidth={2} />
      <path d="M0 0L-3 -8L3 -8Z" fill="#504039" />
      <rect x={-8} y={-118} width={16} height={95} rx={4} fill="#47977a" stroke="#246248" strokeWidth={2} />
      <path d="M-3 -110V-28" stroke="#c0e1cd" strokeWidth={3} />
      <rect x={-8} y={-126} width={16} height={14} rx={4} fill="#e0a08e" />
    </g>}
    </svg>
  </div>;
};
