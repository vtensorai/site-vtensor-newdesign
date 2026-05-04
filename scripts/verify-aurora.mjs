import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });

await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const el = document.querySelector("[data-aurora]");
  if (!el) return { found: false };
  const cs = getComputedStyle(el);
  return {
    found: true,
    animationName: cs.animationName,
    animationDuration: cs.animationDuration,
    animationIterationCount: cs.animationIterationCount,
    animationPlayState: cs.animationPlayState,
    backgroundPosition: cs.backgroundPosition,
    opacity: cs.opacity,
    rect: el.getBoundingClientRect().toJSON(),
  };
});

console.log("Computed style:", JSON.stringify(info, null, 2));

const clip = info.rect
  ? {
      x: Math.max(0, info.rect.x),
      y: Math.max(0, info.rect.y),
      width: Math.min(info.rect.width, 1280),
      height: Math.min(info.rect.height, 720),
    }
  : { x: 0, y: 0, width: 1280, height: 720 };

const t0 = await page.screenshot({ clip });
await page.waitForTimeout(2200);
const t1 = await page.screenshot({ clip });

const equal = t0.length === t1.length && Buffer.compare(t0, t1) === 0;
console.log(`Frame sizes: t0=${t0.length} t1=${t1.length}`);
console.log(`Identical bytes? ${equal}`);
console.log(`Motion detected: ${!equal ? "YES" : "NO"}`);

await browser.close();
process.exit(equal ? 1 : 0);
