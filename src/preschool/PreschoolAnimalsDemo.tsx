import React from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Interactive, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NunitoSans';
import {TransitionOverlay} from '../components/transitions';
import timeline from '../data/preschool-animals-whiteboard-demo/timeline.json';
import {LearningScene, QuizScene, WelcomeScene} from './Scenes';

const {fontFamily} = loadFont('normal', {weights: ['600', '700', '800'], subsets: ['latin', 'vietnamese']});
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const PRESCHOOL_DEMO_FRAMES = timeline.durationInFrames;

/** Names are burnt in; complete sentence-level captions are supplied as an SRT sidecar. */
export const PreschoolAnimalsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily, background: '#fff9ed', color: '#315947'}}>
    <div style={{position: 'absolute', left: -140, top: -250, width: 650, height: 650, borderRadius: '50%', background: '#f1efd9'}} />
    <div style={{position: 'absolute', right: -180, bottom: -280, width: 760, height: 760, borderRadius: '50%', background: '#f4e9d1'}} />
    {timeline.chapters.map((chapter) => <Sequence key={chapter.id} from={chapter.start} durationInFrames={chapter.duration} premountFor={30} name={`${chapter.id} — ${chapter.group}`}>
      {chapter.group === 'intro' ? <WelcomeScene chapter={chapter} /> : chapter.group === 'outro' ? <WelcomeScene outro chapter={chapter} />
        : chapter.group === 'quiz' ? <QuizScene chapter={chapter} /> : <LearningScene chapter={chapter} />}
    </Sequence>)}
    <TransitionOverlay boundaries={timeline.chapters.slice(1).map((c) => c.start)} halfWindow={9} kind="fade-color" color="#fff9ed" />
    <Interactive.Div name="Chủ đề bài học" style={{position: 'absolute', top: 96, left: 36, width: 'fit-content', padding: '14px 25px',
      borderRadius: 50, background: '#e2edd9', color: '#386b49', fontWeight: 800, fontSize: 25, zIndex: 10}}>● BÉ LÀM QUEN VỚI ĐỘNG VẬT</Interactive.Div>
    <div style={{position: 'absolute', top: 0, height: 8, width: `${frame / (PRESCHOOL_DEMO_FRAMES - 1) * 100}%`, background: '#81a97a', zIndex: 60}} />
    {/* Preschool-only exception requested by the user: no mascot or AI disclaimer. */}
    {timeline.sentences.map((s) => <Sequence key={s.id} from={s.start} durationInFrames={s.audioFrames} premountFor={30} name={`${s.id} — Trúc Ly`}>
      <Audio src={staticFile(s.audioSrc)} volume={1} playbackRate={s.playbackRate} />
    </Sequence>)}
    {timeline.sfx.map((cue) => <Sequence key={cue.id} from={cue.from} durationInFrames={cue.duration} premountFor={30} name={cue.label}>
      <Audio src={staticFile(cue.src)} volume={cue.volume} />
    </Sequence>)}
    <Audio src={staticFile('music/Cozy Nook.wav')} loop loopVolumeCurveBehavior="extend" volume={(f) => {
      // Lower the music during counting, with short ramps instead of abrupt gain changes.
      let gain = 0.035;
      for (const c of timeline.chapters) {
        if (c.group !== 'learn' && c.group !== 'quiz') continue;
        const begin = c.start + c.countdownAt;
        const end = c.start + c.revealAt;
        if (f >= begin - 12 && f <= end + 12) {
          gain = Math.min(gain, interpolate(f, [begin - 12, begin, end, end + 12], [0.035, 0.008, 0.008, 0.035], clamp));
        }
      }
      return gain * interpolate(f, [0, 36, PRESCHOOL_DEMO_FRAMES - 54, PRESCHOOL_DEMO_FRAMES - 1], [0, 1, 1, 0], clamp);
    }} />
  </AbsoluteFill>;
};
