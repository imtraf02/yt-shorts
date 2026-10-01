import test from "node:test";
import assert from "node:assert/strict";
import {
  cycleProgress,
  cycleFade,
} from "../src/components/effects/cinematic-model.ts";

test("cycles support negative offsets and are reproducible when seeking", () => {
  const expected = cycleProgress(12.5, 3, 0.2);
  cycleProgress(1500, 3, 0.2);
  assert.equal(cycleProgress(12.5, 3, 0.2), expected);
  assert.ok(Math.abs(cycleProgress(-1, 3) - 2 / 3) < 1e-9);
  assert.ok(Math.abs(cycleProgress(12.5 + 3, 3, 0.2) - expected) < 1e-9);
  assert.throws(() => cycleProgress(1, 0));
});

test("cyclic particles fade out at their wrap boundary", () => {
  assert.equal(cycleFade(0), 0);
  assert.ok(cycleFade(1) < 1e-12);
  assert.equal(cycleFade(0.5), 1);
  for (let i = 0; i <= 100; i++)
    assert.ok(cycleFade(i / 100) >= 0 && cycleFade(i / 100) <= 1);
});
