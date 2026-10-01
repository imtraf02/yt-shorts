import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'preschool-animals-whiteboard-demo';
const p = `productions/${slug}`;
const a = `public/audio/${slug}`;
const d = `src/data/${slug}`;
const renderName = `${slug}-guess-3s`;
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const write = (file, data) => {
  fs.mkdirSync(path.dirname(path.join(root, file)), {recursive: true});
  fs.writeFileSync(path.join(root, file), typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n');
};
const board = read(`${p}/storyboard.json`);
const audio = read(`${a}/sentences_manifest.json`);
const animals = Object.keys(read(`${d}/animals.json`));
const fps = 30;
const playbackRate = 0.9;
let cursor = 0;
const sentences = board.scenes.map((scene) => {
  const voice = audio.find((item) => item.id === scene.id);
  if (!voice || voice.text !== scene.text || voice.quality.clippedSamples !== 0) throw new Error(`Invalid audio: ${scene.id}`);
  const audioFrames = Math.ceil(voice.audioDurationSeconds / playbackRate * fps);
  const holdFrames = scene.holdFrames;
  // Finish the entire outline before the silent three-second guessing window.
  const duration = scene.phase === 'draw'
    ? Math.max(scene.drawingFrames, audioFrames + 12) + 3 * fps
    : scene.phase === 'question' ? audioFrames + 3 * fps : audioFrames + holdFrames;
  const start = cursor;
  cursor += duration;
  scene.timing = {startMs: Math.round(start / fps * 1000), endMs: Math.round(cursor / fps * 1000)};
  return {...scene, start, duration, audioFrames, speechMs: voice.speechDurationMs / playbackRate,
    audioSrc: voice.audioSrc, playbackRate};
});
const chapters = [...new Set(sentences.map((s) => s.chapterId))].map((id) => {
  const items = sentences.filter((s) => s.chapterId === id);
  const first = items[0];
  const last = items[items.length - 1];
  return {id, group: first.group, animal: first.animal, start: first.start,
    duration: last.start + last.duration - first.start,
    options: first.options || [], question: first.question || '',
    lessonIndex: first.lessonIndex || 0, section: first.section || 0,
    drawEndAt: first.group === 'learn' ? first.duration - 3 * fps : 0,
    countdownAt: first.group === 'learn' || first.group === 'quiz' ? first.duration - 3 * fps : 0,
    revealAt: items.find((s) => s.phase === 'name' || s.phase === 'answer')?.start - first.start || 0,
    questionSpeechFrames: Math.ceil(first.speechMs / 1000 * fps)};
});
const captions = sentences.map((s) => ({text: s.text, startMs: s.start / fps * 1000,
  endMs: s.start / fps * 1000 + s.speechMs, timestampMs: null, confidence: null}));
const sfx = [];
for (const chapter of chapters) {
  if (chapter.group === 'learn') {
    sfx.push({id: `${chapter.id}-ink`, from: chapter.start + 10, duration: chapter.drawEndAt - 22,
      src: `audio/${slug}/sfx/draw.wav`, volume: 0.055, label: 'Tiếng bút vẽ nhẹ'});
    sfx.push({id: `${chapter.id}-color`, from: chapter.start + chapter.revealAt, duration: 18,
      src: `audio/${slug}/sfx/reveal.wav`, volume: 0.08, label: 'Hiện màu'});
  }
  if (chapter.group === 'learn' || chapter.group === 'quiz') {
    if (chapter.revealAt - chapter.countdownAt !== 3 * fps) throw new Error(`Invalid guessing duration: ${chapter.id}`);
    for (let remaining = 3; remaining >= 1; remaining--) {
      const local = chapter.countdownAt + (3 - remaining) * fps;
      sfx.push({id: `${chapter.id}-tick-${remaining}`, from: chapter.start + local, duration: 8,
        src: `audio/${slug}/sfx/tick.wav`, volume: 0.50, label: `Đếm ngược ${remaining}`});
    }
    sfx.push({id: `${chapter.id}-answer`, from: chapter.start + chapter.revealAt, duration: 24,
      src: `audio/${slug}/sfx/correct.wav`, volume: 0.16, label: 'Chime mở đáp án'});
  }
}
const stamp = (ms) => {
  const n = Math.round(ms);
  return `${String(Math.floor(n / 3600000)).padStart(2, '0')}:${String(Math.floor(n / 60000) % 60).padStart(2, '0')}:${String(Math.floor(n / 1000) % 60).padStart(2, '0')},${String(n % 1000).padStart(3, '0')}`;
};
write(`${a}/captions.srt`, captions.map((c, i) => `${i + 1}\n${stamp(c.startMs)} --> ${stamp(c.endMs)}\n${c.text}\n`).join('\n'));
write(`${d}/captions.json`, captions);
write(`${d}/timeline.json`, {slug, fps, playbackRate, durationInFrames: cursor, sentences, chapters, sfx});
write(`${p}/storyboard.json`, board);
const manifest = read(`${p}/manifest.json`);
Object.assign(manifest.settings, {style: 'Preschool whiteboard, traced ink to original color', backgroundMusic: true,
  musicVolume: 0.035, musicVolumeCap: 0.5, music: 'music/Cozy Nook.wav', voicePlaybackRate: playbackRate,
  durationInFrames: cursor, compositionId: 'PreschoolAnimalsWhiteboardDemo', showCta: false, showCharacter: false,
  showAiDisclaimer: false, preschoolOnlyException: 'User explicitly requested no character/disclaimer only for Preschool on 2026-10-01.',
  intro: 'Unlabelled silhouettes with question marks', drawingExtraHoldFrames: 0,
  countdown: 'Complete outline first, then exactly 90 silent frames: 3,2,1; only then name and color',
  guessingFrames: 90, tickVolume: 0.50, musicCountingVolume: 0.008,
  celebration: 'Short seeded confetti only in the illustration area after answer; no inferred child response',
  backgroundRemoval: 'Local Pillow/NumPy/SciPy only; no generative model or API',
  captions: 'Sentence-level SRT sidecar; real per-sentence audio durations'});
const images = animals.map((animal) => `public/images/${slug}/cutouts/${animal}.png`);
const effects = ['draw', 'reveal', 'tick', 'correct'].map((name) => `public/audio/${slug}/sfx/${name}.wav`);
manifest.stages.script.inputs = [`${p}/brief.md`, 'scripts/prepare-preschool-animals.mjs'];
manifest.stages.images.inputs = [`${p}/storyboard.json`, 'scripts/extract-preschool-cutouts.py',
  ...animals.map((animal) => `public/images/${slug}/${animal}.jpg`)];
manifest.stages.images.outputs = [...images, `public/images/${slug}/cutouts/extraction.json`];
manifest.stages.audio.inputs = [`${p}/narration.txt`, 'scripts/generate_tts_sentences.py'];
manifest.stages.audio.outputs = [...audio.map((s) => `public/${s.audioSrc}`), `${a}/sentences_manifest.json`, `${a}/tts_run.json`];
manifest.stages.captions.inputs = [`${a}/sentences_manifest.json`, `${p}/storyboard.json`, 'scripts/build-preschool-demo.mjs'];
manifest.stages.captions.outputs = [`${a}/captions.srt`, `${d}/captions.json`];
manifest.stages.composition.inputs = [`${p}/storyboard.json`, ...images, `${a}/sentences_manifest.json`,
  'scripts/build-preschool-strokes.py', 'scripts/build-preschool-demo.mjs', `${d}/animals.json`, 'public/music/Cozy Nook.wav',
  'src/Root.tsx', 'src/index.ts', 'src/index.css', 'package.json', 'remotion.config.ts', ...effects,
  'src/components/transitions/SceneTransition.tsx', 'src/components/transitions/model.ts',
  'src/components/effects/Atmosphere.tsx', 'src/components/effects/model.ts',
  'scripts/generate-preschool-sfx.py'];
manifest.stages.composition.outputs = [`${d}/timeline.json`, `${d}/strokes.json`,
  'src/preschool/PreschoolAnimalsDemo.tsx', 'src/preschool/WhiteboardAnimal.tsx', 'src/preschool/Scenes.tsx',
  'src/preschool/Celebration.tsx',
  'src/PreschoolLibrary.tsx'];
manifest.stages.qa.inputs = [...manifest.stages.composition.outputs, 'scripts/qa-preschool-demo.py', 'scripts/qa-preschool-frames.py',
  `out/${slug}/${renderName}.mp4`];
manifest.stages.qa.outputs = [`${p}/qa.md`, `${p}/audio_qa.json`, `${p}/visual_qa.json`];
manifest.stages.render.outputs = [`out/${slug}/${renderName}.mp4`, `out/${slug}/${renderName}.srt`];
write(`${p}/manifest.json`, manifest);
console.log(`${slug}: ${cursor} frames, ${(cursor / fps).toFixed(2)}s; ${sentences.length} sentence-aligned cues.`);
