import { chromium, devices } from "playwright";

const URL = process.env.AUDIT_URL || "https://d893230a.vtensor-staging.pages.dev";
const OUT = "C:/Users/victo/Vtensor/site-vtensor/screenshots/responsive-audit";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  userAgent: devices["iPhone 14"]?.userAgent,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });

// Scroll progressif dans la section Hidden Cost (vh ≈ 844px sur iPhone14, section = 220vh ≈ 1857px)
const positions = [
  { y: 0, name: "scroll-0" },
  { y: 800, name: "scroll-800" },
  { y: 1400, name: "scroll-1400" },
  { y: 2000, name: "scroll-2000" },
  { y: 2600, name: "scroll-2600" },
];

for (const pos of positions) {
  await page.evaluate((y) => window.scrollTo(0, y), pos.y);
  await page.waitForTimeout(700);
  await page.screenshot({
    path: `${OUT}/after-iphone-14-${pos.name}.png`,
    fullPage: false,
  });
  console.log(`Captured ${pos.name} (y=${pos.y})`);
}

await ctx.close();
await browser.close();
