import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT1 = path.resolve(__dirname, "..", "screenshots", "mist-v2-t0.png");
const OUT2 = path.resolve(__dirname, "..", "screenshots", "mist-v2-t2.png");

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/backgrounds-demo#mist", {
  waitUntil: "networkidle",
  timeout: 30000,
});

// Scroll to mist section
await page.evaluate(() => {
  const el = document.getElementById("mist");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await page.waitForTimeout(800);

// First snapshot
const mist = await page.locator("#mist").first();
await mist.screenshot({ path: OUT1 });
console.log("Saved t0:", OUT1);

// Wait 2s and take a second screenshot to compare animation
await page.waitForTimeout(2000);
await mist.screenshot({ path: OUT2 });
console.log("Saved t2:", OUT2);

await browser.close();
