import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
await mkdir("artifacts/qa-cinema", { recursive: true });
const browser = await chromium.launch({
  executablePath:
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
});
const results = [];
const errors = [];
for (const [label, width, height, motion] of [
  ["desktop", 1440, 900, "no-preference"],
  ["mobile", 390, 844, "no-preference"],
  ["reduced", 390, 844, "reduce"],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: motion,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(r.status() + " " + r.url());
  });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  assert(await page.locator("#tatiana").count());
  assert.equal(
    await page.locator(".site-header .brand img").getAttribute("src"),
    "/assets/elevarte-symbol.webp",
  );
  const trigger = await page.evaluate(async () => {
    const { ScrollTrigger } = await import("/src/animations/engine.ts");
    const t = ScrollTrigger.getById("cinema");
    return t ? { start: t.start, end: t.end } : null;
  });
  if (trigger) {
    for (const [name, time] of [
      ["hero", 0],
      ["hero-light", 1.8], ["assembly", 2.8], ["nogueira-depth", 5.6], ["nogueira-break", 6.8], ["aol-depth", 14.4], ["tatiana-depth", 19.1],
      ["nogueira", 4.6],
      ["nogueira-full", 6.1],
      ["n-story", 8.8],
      ["aol", 12.8],
      ["tatiana", 18],
      ["tatiana-detail", 21.8],
    ]) {
      await page.evaluate(
        (y) => scrollTo(0, y),
        trigger.start + ((trigger.end - trigger.start) * time) / 28,
      );
      await page.waitForTimeout(150);
      await page.screenshot({
        path: "artifacts/qa-cinema/" + label + "-" + name + ".png",
      });
    }
    const state = async (t) => {
      await page.evaluate(
        (y) => scrollTo(0, y),
        trigger.start + ((trigger.end - trigger.start) * t) / 28,
      );
      await page.waitForFunction(async (expected) => {
        const { ScrollTrigger } = await import("/src/animations/engine.ts");
        const timeline = ScrollTrigger.getById("cinema")?.animation;
        return timeline && Math.abs(timeline.time() - expected) < 0.01;
      }, t);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      return page
        .locator(".cinema")
        .evaluate((el) =>
          [...el.querySelectorAll(".c-surface,.c-chapter,h2,.media-strip,.c-letter,.c-aol-glyphs b,.c-n-companion,.c-t-satellite")].map(
            (n) =>
              getComputedStyle(n).transform +
              getComputedStyle(n).opacity +
              getComputedStyle(n).clipPath,
          ),
        );
    };
    for (const time of [2, 4.6, 8, 12.8, 18, 21]) {
      const first = await state(time);
      await state(23);
      assert.deepEqual(
        await state(time),
        first,
        "cinema is reversible at " + time,
      );
    }
  } else {
    assert.equal(await page.locator(".pin-spacer").count(), 0);
    await page.locator("#tatiana").scrollIntoViewIfNeeded();
    await page.screenshot({ path: "artifacts/qa-cinema/reduced-tatiana.png" });
  }
  assert.equal(await page.locator(".contact-form").count(), 1);
  assert.equal(await page.locator(".contact-form").getAttribute("action"), "https://wa.me/5511981940728");
  assert.equal(
    await page.locator(".instagram-link").getAttribute("href"),
    "https://www.instagram.com/elevarte.design/",
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(100);
  if (width < 768) {
    await page.locator(".menu-toggle").click();
    await page.locator("#mobile-nav a").first().click();
  } else await page.locator(".desktop-nav a").first().click();
  await page.waitForTimeout(1000);
  if (trigger)
    assert(
      Math.abs(
        (await page.evaluate(() => scrollY)) -
          (trigger.start + ((trigger.end - trigger.start) * 4.6) / 28),
      ) < 3,
    );
  await page.locator(".language button").nth(1).click();
  await page.waitForTimeout(100);
  assert((await page.locator("h1").textContent()).includes("BRANDS THAT"));
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  results.push({
    label,
    width,
    tatiana: true,
    newNogueira: await page.locator(".c-n-cover > img").getAttribute("src"),
    symbolOnly: true,
    reversible: !!trigger,
    whatsapp: true,
    instagram: true,
    overflow: false,
  });
  await context.close();
}
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
for (const width of [1024, 768, 320]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(350);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.equal(await page.locator(".pin-spacer").count(), 3);
}
await page.emulateMedia({ reducedMotion: "reduce" });
await page.waitForTimeout(200);
assert.equal(await page.locator(".pin-spacer").count(), 0);
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.waitForTimeout(200);
assert.equal(await page.locator(".pin-spacer").count(), 3);
await browser.close();
assert.deepEqual(errors, []);
await writeFile(
  "artifacts/qa-cinema/results.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ results, errors }));
