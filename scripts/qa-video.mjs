import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath:
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
});
const results = [];
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.querySelector("video")?.readyState >= 1,
  );
  const data = await page.evaluate(async () => {
    const { ScrollTrigger } = await import("/src/animations/engine.ts");
    const t = ScrollTrigger.getById("cinema");
    return {
      start: t.start,
      end: t.end,
      duration: document.querySelector("video").duration,
    };
  });
  for (const progress of [0, 0.25, 0.75, 1, 0.4, 0]) {
    const time = 22.15 + 4 * progress;
    await page.evaluate(
      (y) => scrollTo(0, y),
      data.start + ((data.end - data.start) * time) / 28,
    );
    const expected = progress * (data.duration - 1 / 24);
    await page.waitForFunction(
      (expected) => {
        const v = document.querySelector("video");
        return !v.seeking && Math.abs(v.currentTime - expected) < 0.085;
      },
      expected,
      { timeout: 5000 },
    );
    const state = await page
      .locator("video")
      .evaluate((v) => ({
        time: v.currentTime,
        paused: v.paused,
        muted: v.muted,
        inline: v.playsInline,
      }));
    assert(state.paused && state.muted && state.inline);
    results.push({ width, progress, expected, ...state });
    if (progress === 0.75)
      await page.screenshot({
        path: "artifacts/qa-cinema/video-" + width + ".jpg",
        type: "jpeg",
        quality: 85,
      });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(200);
  assert(await page.locator("video").evaluate((v) => v.controls));
  assert.equal(await page.locator(".pin-spacer").count(), 0);
  await page.close();
}
await browser.close();
await writeFile(
  "artifacts/qa-cinema/video-results.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results));
