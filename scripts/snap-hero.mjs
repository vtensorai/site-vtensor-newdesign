import { chromium } from "playwright";

const out = "C:/tmp/vtensor-screenshots/hero-animated-grid.png";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push("console: " + msg.text());
});
const resp = await page.goto("http://localhost:3000", {
  waitUntil: "networkidle",
  timeout: 30000,
});
console.log("HTTP status:", resp?.status());
await page.mouse.move(640, 320);
await page.waitForTimeout(500);
await page.mouse.move(800, 380, { steps: 10 });
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: false });
console.log("Saved:", out);
if (errors.length) {
  console.log("ERRORS:");
  errors.forEach((e) => console.log(" -", e));
} else {
  console.log("No console errors.");
}
await browser.close();
