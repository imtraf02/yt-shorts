import fs from 'node:fs';
const slug = 'long-video-outro';
const root = `productions/${slug}`;
const brand = JSON.parse(fs.readFileSync('src/data/long-video-outro/brand.json', 'utf8'));
const pairs = [
  ['tra-xanh-cui-cam-on-v2', 'lam-lam-cui-cam-on-v1'],
];
const moves = [...new Set(pairs.flat())];
const files = moves.flatMap(move => {
  const base = `public/characters/animations/${move}`;
  const anim = JSON.parse(fs.readFileSync(`${base}/animation.json`, 'utf8'));
  return [`${base}/animation.json`, ...new Set(anim.sequence.map(x => `${base}/${x.file}`))];
});
if (brand.avatarSrc && !/^https?:\/\//.test(brand.avatarSrc)) files.push(`public/${brand.avatarSrc.replace(/^public\//, '')}`);
const boundaries = [0, 150];
const storyboard = pairs.map((pair, i) => ({
  id: `I00${i + 1}`, chapterId: 'C01', sentenceIds: [], audioMode: 'silent',
  plannedNarration: null, kind: 'existing-image',
  file: `public/characters/animations/${pair[0]}/animation.json`,
  characterAssets: pair.map(move => `public/characters/animations/${move}/animation.json`),
  prompt: null, overlayText: [brand.channelName, brand.tagline],
  timing: {startMs: boundaries[i] / 30 * 1000, endMs: boundaries[i + 1] / 30 * 1000},
  status: 'verified', qa: 'Use existing frame sequence at its declared duration. No new image generation.',
  brandAnimation: 'User-provided avatar, centered Lam Lam & Trà Xanh title; drifting aurora glows, flowing ribbons, elliptical orbits, petals and fireflies; both corner characters use bow animation only',
}));
fs.writeFileSync(`${root}/storyboard.json`, JSON.stringify(storyboard, null, 2));
const file = `${root}/manifest.json`;
const m = JSON.parse(fs.readFileSync(file, 'utf8'));
m.settings.audioMode = 'silent';
m.settings.durationInFrames = 150;
m.settings.compositionId = 'LongVideoOutro';
m.settings.style = 'Centered 5-second channel signature with blue/green animated aurora backdrop';
m.settings.characterPositions = {lamLam: {left: 40, bottom: 20, height: 180}, traXanh: {right: 40, bottom: 20, height: 180}};
m.settings.outroDisclaimer = false;
m.settings.userOverrides = ['Maximum 5 seconds', 'Remove video recommendation cards', 'Remove illustration disclaimer in this outro only', 'Lam Lam bottom-left; Trà Xanh bottom-right; centered channel identity', 'Use supplied avatar and channel name Lam Lam & Trà Xanh', 'Character animations: bow only'];
m.settings.brandConfig = 'src/data/long-video-outro/brand.json';
m.notes = ['User avatar copied unchanged; title Lam Lam & Trà Xanh; bow-only corner animations; animated blue/green backdrop; five seconds, silent.', 'No recommendation cards or disclaimer in this outro, following explicit user request.'];
m.stages.images.outputs = files;
m.stages.audio.inputs = [`${root}/narration.txt`, 'scripts/generate_tts_sentences.py', 'scripts/tts_audio.py'];
m.stages.audio.outputs = [`${root}/audio_mode.json`];
m.stages.audio.applicable = false;
m.stages.audio.note = 'No audio in silent deliverable. Do not infer that TTS has been generated.';
m.stages.captions.inputs = [`${root}/audio_mode.json`];
m.stages.captions.outputs = [`${root}/captions_mode.json`];
m.stages.captions.applicable = false;
m.stages.captions.note = 'No spoken captions in silent version; on-screen copy is graphic text.';
m.stages.composition.inputs = [`${root}/storyboard.json`, 'src/data/long-video-outro/brand.json', ...files, 'src/components/effects/Atmosphere.tsx', 'src/components/effects/model.ts'];
m.stages.composition.outputs = ['src/LongVideoOutro.tsx', 'src/components/CharacterFrameAnimation.tsx', 'src/Root.tsx'];
m.stages.qa.inputs = [...m.stages.composition.outputs, ...m.stages.composition.inputs];
m.stages.render.inputs = [...m.stages.qa.inputs, `${root}/qa.md`, `${root}/stage-assets.mjs`, 'src/index.ts', 'remotion.config.ts', 'package-lock.json'];
m.stages.render.outputs = [`out/${slug}/${slug}.mp4`, `out/${slug}/poster.jpg`];
fs.writeFileSync(file, JSON.stringify(m, null, 2));
