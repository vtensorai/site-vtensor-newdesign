import { chromium } from "playwright";

const URL = "http://localhost:3000/hero-tagline-compare";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message}`));

await page.goto(URL, { waitUntil: "networkidle" });

// Section 1 — Variante 1
await page.locator("#variante-1").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({
  path: "C:/tmp/hero-tagline-variante-1.png",
  clip: { x: 0, y: 0, width: 1280, height: 720 },
});

// Section 2 — Variante 2
await page.locator("#variante-2").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({
  path: "C:/tmp/hero-tagline-variante-2.png",
  clip: { x: 0, y: 0, width: 1280, height: 720 },
});

console.log("OK — screenshots saved to C:/tmp/hero-tagline-variante-{1,2}.png");
if (errors.length) {
  console.log(`Console errors (${errors.length}):`);
  for (const e of errors) console.log("  -", e);
} else {
  console.log("No console errors.");
}

await browser.close();
