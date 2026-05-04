import { chromium, devices } from "playwright";

const URL = process.env.AUDIT_URL || "https://d893230a.vtensor-staging.pages.dev";
const OUT = "C:/Users/victo/Vtensor/site-vtensor/screenshots/responsive-audit";

const browser = await chromium.launch();

// Test menu burger on iPhone 14
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  userAgent: devices["iPhone 14"]?.userAgent,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(800);

// Capture closed nav
await page.screenshot({ path: `${OUT}/after-iphone-14-nav-closed.png`, fullPage: false });

// Click burger
const burger = await page.$('button[aria-label="Ouvrir le menu"]');
if (burger) {
  await burger.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/after-iphone-14-nav-open.png`, fullPage: false });
  console.log("Burger menu opened OK");
} else {
  console.log("ERROR: burger button not found");
}

await ctx.close();
await browser.close();
