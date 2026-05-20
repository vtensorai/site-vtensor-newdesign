import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "screenshots", "hero-preview.png");

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  // do NOT force reducedMotion — we want the final animated state visible
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
// Let stagger animation finish (~1.5s) + fonts/images settle
await page.waitForTimeout(2000);
await page.screenshot({ path: OUT, fullPage: false });
console.log("Saved:", OUT);
await browser.close();
