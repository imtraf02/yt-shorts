import test from "node:test";
import assert from "node:assert/strict";
import {
  EFFECT_KINDS,
  particleAt,
  particleCount,
} from "../src/components/effects/model.ts";
import {
  transitionProgress,
  overlayEnvelope,
  directionVector,
} from "../src/components/transitions/model.ts";

test("particles are deterministic under out-of-order frame rendering", () => {
  const input = {
    kind: "leaves",
    index: 5,
    seed: "test",
    seconds: 2,
    width: 1920,
    height: 1080,
    wind: 32,
    size: 1,
  };
  const reference = particleAt(input);
  particleAt({ ...input, seconds: 150 });
  particleAt({ ...input, seconds: 0 });
  assert.deepEqual(particleAt(input), reference);
  assert.notDeepEqual(particleAt({ ...input, seed: "different" }), reference);
});

test("all presets have bounded particles and finite positions in both aspect ratios", () => {
  for (const kind of EFFECT_KINDS) {
    assert.equal(particleCount(kind, 0), 0);
    assert.ok(particleCount(kind, 100) <= 300);
    for (const [width, height] of [
      [1920, 1080],
      [1080, 1920],
    ]) {
      for (const seconds of [-1, 0, 1, 600, 3600]) {
        const p = particleAt({
          kind,
          index: 21,
          seed: "test",
          seconds,
          width,
          height,
          wind: -1000,
          size: 5,
        });
        assert.ok(
          [p.x, p.y, p.size, p.rotation, p.opacity, p.flip].every(
            Number.isFinite,
          ),
        );
        assert.ok(p.opacity >= 0 && p.opacity <= 1);
      }
    }
  }
});

test("particle positions represent seconds, independently of composition fps", () => {
  const base = {
    kind: "snow",
    index: 1,
    seed: "fps",
    width: 1920,
    height: 1080,
    wind: 15,
    size: 1,
  };
  assert.deepEqual(
    particleAt({ ...base, seconds: 60 / 30 }),
    particleAt({ ...base, seconds: 120 / 60 }),
  );
});

test("transition endpoints are exact and progress stays monotonic", () => {
  assert.equal(transitionProgress(20, 30, 24), 0);
  assert.equal(transitionProgress(30, 30, 24), 0);
  assert.equal(transitionProgress(53, 30, 24), 1);
  assert.equal(transitionProgress(80, 30, 24), 1);
  const values = Array.from({ length: 70 }, (_, frame) =>
    transitionProgress(frame, 30, 24),
  );
  values.slice(1).forEach((p, i) => assert.ok(p >= values[i]));
  assert.equal(transitionProgress(30, 30, 1), 1);
  assert.throws(() => transitionProgress(30, 30, 0));
  assert.throws(() => transitionProgress(30, 30, 2.5));
});

test("overlay fully covers the hard cut, disappears at its window edges", () => {
  assert.equal(overlayEnvelope(100, 100, 10), 1);
  assert.equal(overlayEnvelope(90, 100, 10), 0);
  assert.equal(overlayEnvelope(110, 100, 10), 0);
  assert.equal(overlayEnvelope(200, 100, 10), 0);
  assert.deepEqual(directionVector("left"), [-1, 0]);
  assert.deepEqual(directionVector("up"), [0, -1]);
});
