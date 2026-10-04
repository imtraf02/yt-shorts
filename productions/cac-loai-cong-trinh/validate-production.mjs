import fs from 'node:fs';
const base = 'productions/cac-loai-cong-trinh';
const read = name => JSON.parse(fs.readFileSync(`${base}/${name}`, 'utf8'));
const scenes = read('storyboard.json'), sentences = read('sentences.json'), chapters = read('chapters.json'), job = read('manifest.json');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
check(scenes.length === 360 && sentences.length === 360 && chapters.length === 12, 'Counts differ from 360 scenes / 360 sentences / 12 chapters.');
let existing = 0, verified = 0;
for (let i = 0; i < scenes.length; i++) {
  const s = scenes[i], sentence = sentences[i], num = String(i + 1).padStart(3, '0');
  check(s.id === `I${num}` && sentence.id === `S${num}`, `Non-contiguous ID at ${i}.`);
  check(s.sentenceIds.length === 1 && s.sentenceIds[0] === sentence.id && s.text === sentence.text, `${s.id}: sentence mapping mismatch.`);
  check(s.chapterId === sentence.chapterId && chapters.some(c => c.id === s.chapterId && c.sceneIds.includes(s.id) && c.sentenceIds.includes(sentence.id)), `${s.id}: chapter mapping mismatch.`);
  check(s.file === `public/images/cac-loai-cong-trinh/${num}.png`, `${s.id}: unexpected path.`);
  check(s.timing.startMs === null && s.timing.endMs === null, `${s.id}: premature timing.`);
  check(typeof s.prompt === 'string' && s.prompt.includes('16:9'), `${s.id}: missing prompt.`);
  if (fs.existsSync(s.file)) {
    existing++;
    const b = fs.readFileSync(s.file);
    check(b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), `${s.id}: invalid PNG signature.`);
    const width = b.readUInt32BE(16), height = b.readUInt32BE(20);
    check(Math.abs((width / height) / (16 / 9) - 1) <= 0.002, `${s.id}: aspect ratio.`);
    check(s.qa?.width === width && s.qa?.height === height, `${s.id}: QA dimensions mismatch.`);
  } else check(s.status === 'pending' || s.status === 'blocked', `${s.id}: missing file marked created.`);
  if (s.status === 'verified') { verified++; check(fs.existsSync(s.file) && s.qa?.visualReview && s.qa?.reviewedAt, `${s.id}: missing review evidence.`); }
}
const narration = fs.readFileSync(`${base}/narration.txt`, 'utf8').trim().split(/\r?\n/).filter(Boolean);
check(JSON.stringify(narration) === JSON.stringify(sentences.map(s => s.text)), 'Narration differs from sentence text.');
check(new Set(chapters.flatMap(c => c.sceneIds)).size === 360 && chapters.flatMap(c => c.sceneIds).length === 360, 'Chapter coverage mismatch.');
check(job.progress.generatedImages === existing && job.progress.verifiedImages === verified && job.progress.pendingImages === 360 - existing, 'Manifest progress mismatch.');
const result = {checkedAt: new Date().toISOString(), passed: errors.length === 0, sceneCount: scenes.length, sentenceCount: sentences.length, chapterCount: chapters.length, existingImages: existing, verifiedImages: verified, remainingImages: 360-existing, firstPendingScene: scenes.find(s => !fs.existsSync(s.file))?.id ?? null, blockers: job.blockers, errors};
fs.writeFileSync(`${base}/validation.json`, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
