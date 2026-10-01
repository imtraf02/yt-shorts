import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const t = JSON.parse(fs.readFileSync(new URL('../src/data/preschool-animals-whiteboard-demo/timeline.json', import.meta.url), 'utf8'));

test('12 complete outlines, then exactly three seconds without narration', () => {
  const lessons = t.chapters.filter(c => c.group === 'learn');
  assert.equal(lessons.length, 12);
  assert.equal(new Set(lessons.map(c => c.animal)).size, 12);
  for (const c of t.chapters.filter(c => c.group === 'learn' || c.group === 'quiz')) {
    assert.equal(c.revealAt - c.countdownAt, 3 * t.fps, c.id);
    if (c.group === 'learn') {
      assert.equal(c.drawEndAt, c.countdownAt);
      assert.ok(c.drawEndAt >= 180);
    }
    const start = c.start + c.countdownAt, end = c.start + c.revealAt;
    assert.ok(!t.sentences.some(s => s.start < end && s.start + s.audioFrames > start), 'Speech during guessing: ' + c.id);
    const ticks = t.sfx.filter(s => s.id.startsWith(c.id + '-tick-'));
    assert.deepEqual(ticks.map(s => s.from), [start, start + t.fps, start + 2 * t.fps]);
    assert.deepEqual(ticks.map(s => s.id.split('-').pop()), ['3', '2', '1']);
    assert.equal(t.sentences.find(s => s.chapterId === c.id && (s.phase === 'name' || s.phase === 'answer')).start, end);
    const ink = t.sfx.find(s => s.id === c.id + '-ink');
    if (ink) assert.ok(ink.from + ink.duration <= start);
  }
});

test('friendly names, measured sequential speech and no cues past the end', () => {
  assert.equal(t.sentences.length, 49);
  for (const [i, s] of t.sentences.entries()) {
    assert.ok(!/\bcon\b/u.test(s.text.toLowerCase()));
    assert.ok(s.speechMs > 0 && s.audioFrames <= s.duration);
    assert.equal(s.start, i ? t.sentences[i - 1].start + t.sentences[i - 1].duration : 0);
  }
  const last = t.sentences[t.sentences.length - 1];
  assert.equal(last.start + last.duration, t.durationInFrames);
  assert.equal(t.sfx.filter(s => s.id.includes('-tick-')).length, 45);
  assert.ok(t.sfx.every(s => s.from >= 0 && s.duration > 0 && s.from + s.duration <= t.durationInFrames));
});
