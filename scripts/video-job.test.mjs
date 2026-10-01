import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {initJob, inspectJob, checkpoint, safePath} from './video-job.mjs';

function fixture(t) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const root = fs.mkdtempSync(path.join(tempRoot, 'video-job-test-'));
  t.after(() => {
    // Only remove the exact unique fixture directory created by this test.
    assert.equal(path.dirname(root), tempRoot);
    assert.ok(path.basename(root).startsWith('video-job-test-'));
    fs.rmSync(root, {recursive: true, force: true});
  });
  const write = (rel, body = 'Test artifact content') => {
    const file = safePath(root, rel);
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, body);
  };
  return {root, write};
}

test('init preserves existing work and rejects path escapes / Windows reserved names', (t) => {
  const {root} = fixture(t);
  const job = initJob(root, 'example-video', 'short');
  assert.equal(job.settings.width, 1080);
  const manifest = fs.readFileSync(path.join(root, 'productions/example-video/manifest.json'), 'utf8');
  assert.throws(() => initJob(root, 'example-video'), /already exists/);
  assert.equal(fs.readFileSync(path.join(root, 'productions/example-video/manifest.json'), 'utf8'), manifest);
  for (const slug of ['../bad', 'CON', 'nul', 'com1', 'foo/bar']) assert.throws(() => initJob(root, slug));
  for (const rel of ['../outside', 'C:\\outside', '.', 'folder/../../outside']) assert.throws(() => safePath(root, rel));
});

test('new jobs are pending; incomplete stages cannot be checkpointed', (t) => {
  const {root} = fixture(t);
  initJob(root, 'pending-video');
  assert.equal(inspectJob(root, 'pending-video').stages.render.state, 'pending');
  assert.throws(() => checkpoint(root, 'pending-video', 'script', 'Reviewed script and source links'), /Missing/);
  assert.throws(() => checkpoint(root, 'pending-video', 'render', 'Reviewed final movie playback'), /dependencies/);
});

test('hash changes invalidate dependents even after the upstream is checkpointed again', (t) => {
  const {root, write} = fixture(t);
  initJob(root, 'hash-video');
  const prefix = 'productions/hash-video';
  for (const name of ['script.md', 'narration.txt', 'sources.md']) write(`${prefix}/${name}`);
  write(`${prefix}/storyboard.json`, '[{"id":"I001"}]');
  checkpoint(root, 'hash-video', 'script', 'Reviewed narration against script and references');
  checkpoint(root, 'hash-video', 'storyboard', 'Reviewed all shots against approved narration');
  assert.equal(inspectJob(root, 'hash-video').stages.storyboard.state, 'verified');
  write(`${prefix}/narration.txt`, 'Changed narration content');
  assert.equal(inspectJob(root, 'hash-video').stages.script.state, 'stale');
  assert.equal(inspectJob(root, 'hash-video').stages.storyboard.state, 'stale');
  checkpoint(root, 'hash-video', 'script', 'Reviewed the corrected narration and script');
  assert.equal(inspectJob(root, 'hash-video').stages.storyboard.state, 'stale');
});

test('image quota does not block independent audio and caption stages', (t) => {
  const {root, write} = fixture(t);
  const job = initJob(root, 'blocked-video');
  const prefix = 'productions/blocked-video';
  job.blockers.push({stage: 'images', reason: 'usage_limit_reached', retryAfter: null});
  write(`${prefix}/manifest.json`, JSON.stringify(job));
  for (const name of ['script.md', 'narration.txt', 'sources.md']) write(`${prefix}/${name}`);
  write('scripts/generate_tts.py');
  // Synthetic files test checkpoint logic, not media validity (which requires QA).
  write('public/audio/blocked-video/narration.wav');
  write('src/data/blocked-video/captions.json', '[]');
  checkpoint(root, 'blocked-video', 'script', 'Test evidence for script stage');
  checkpoint(root, 'blocked-video', 'audio', 'Test evidence for audio stage');
  checkpoint(root, 'blocked-video', 'captions', 'Test evidence for caption stage');
  let stages = inspectJob(root, 'blocked-video').stages;
  assert.equal(stages.images.state, 'blocked');
  assert.equal(stages.captions.state, 'verified');
  assert.throws(() => checkpoint(root, 'blocked-video', 'images', 'Test image evidence here'), /blocker/);
  const updated = JSON.parse(fs.readFileSync(path.join(root, prefix, 'manifest.json'), 'utf8'));
  updated.settings.voice = 'Changed voice';
  write(`${prefix}/manifest.json`, JSON.stringify(updated));
  stages = inspectJob(root, 'blocked-video').stages;
  assert.equal(stages.audio.state, 'stale');
  assert.equal(stages.captions.state, 'stale');
});
