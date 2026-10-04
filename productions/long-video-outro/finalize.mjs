import {checkpoint, inspectJob} from '../../scripts/video-job.mjs';
const root = process.cwd();
const notes = {
  script: 'Original generic outro copy reviewed against brief and narration; no factual claims.',
  storyboard: 'Five-second centered channel identity with user avatar, animated blue/green backdrop and bow-only corner characters.',
  images: 'User avatar copy hash matches original; two reviewed bow sets, 12 animation PNGs and one avatar PNG.',
  audio: 'Silent delivery verified. Output is audio-mode report only, no TTS WAVs generated; optional TTS remains unavailable.',
  captions: 'No captions for silent delivery. Output is explicit not-applicable report, no invented timestamps.',
  composition: 'TypeScript and scoped ESLint pass; 150 frames with centered identity, opposite-corner characters, no video cards or outro disclaimer per explicit user request.',
  qa: 'Visual QA of centered reveal, custom branding, corner poses and final frames; full MP4 decode passed; see qa.md.',
  render: 'Final MP4 ffprobe: H.264 1920x1080 30fps 150 frames 5.000000s; silent. Full decode exit 0.',
};
for (const [stage, note] of Object.entries(notes)) checkpoint(root, 'long-video-outro', stage, note);
console.log(Object.fromEntries(Object.entries(inspectJob(root, 'long-video-outro').stages).map(([stage, v]) => [stage, v.state])));
