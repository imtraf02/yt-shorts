import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  CAPTION_EFFECTS,
  makeCaptionPages,
  findCaptionPage,
  fromLegacyPhrases,
  keywordKey,
  wordMotion,
} from "../src/components/caption-effects/model.ts";

const captions = JSON.parse(
  fs.readFileSync(
    new URL("../src/data/caption-effects-demo.json", import.meta.url),
    "utf8",
  ),
);

test("keeps original word times and respects explicit page breaks and silence", () => {
  const pages = makeCaptionPages(captions);
  assert.equal(pages.length, 2);
  assert.deepEqual(
    pages.flatMap((page) => page.words),
    captions,
  );
  assert.equal(findCaptionPage(pages, 199), null);
  assert.equal(findCaptionPage(pages, 200), pages[0]);
  assert.equal(findCaptionPage(pages, 3100), null);
  assert.equal(findCaptionPage(pages, 3300), null);
  assert.equal(findCaptionPage(pages, 3500), pages[1]);
  assert.equal(findCaptionPage(pages, 6100), null);
});

test("word and character limits page text without altering timestamps", () => {
  const pages = makeCaptionPages(captions, 3, 20);
  assert.ok(pages.every((page) => page.words.length <= 3));
  assert.deepEqual(
    pages.flatMap((page) => page.words),
    captions,
  );
  assert.deepEqual(makeCaptionPages([]), []);
  assert.throws(() => makeCaptionPages(captions, 0));
  assert.throws(() => makeCaptionPages([{ ...captions[0], endMs: 100 }]));
  assert.throws(() => makeCaptionPages([captions[1], captions[0]]));
});

test("legacy adapter preserves timing, whitespace and phrase boundaries", () => {
  const converted = fromLegacyPhrases([
    {
      words: [
        { word: " thời ", startMs: 100, endMs: 300 },
        { word: "gian", startMs: 300, endMs: 650 },
      ],
    },
  ]);
  assert.equal(converted[0].text, "thời");
  assert.equal(converted[1].text, " gian");
  assert.equal(converted[1].endMs, 650);
  assert.equal(converted[1].pageBreakAfter, true);
  assert.equal(keywordKey("“THỜI,”"), keywordKey("thời"));
});

test("all word motion presets settle and remain finite under seeking", () => {
  for (const effect of CAPTION_EFFECTS) {
    const result = wordMotion(effect, 75, 400);
    wordMotion(effect, 12000, 400);
    assert.deepEqual(wordMotion(effect, 75, 400), result);
    assert.ok(Object.values(result).every(Number.isFinite));
    const end = wordMotion(effect, 800, 400);
    assert.ok(Math.abs(end.scale - 1) < 1e-9);
    assert.ok(Math.abs(end.y) < 1e-9);
    assert.equal(end.progress, 1);
  }
});
