import { chromium, devices } from "playwright";

const URL = process.env.AUDIT_URL || "https://staging.vtensor.ai";
const OUT = "C:/Users/victo/Vtensor/site-vtensor/screenshots/responsive-audit";
const SUFFIX = process.env.AUDIT_SUFFIX || "before";

const VIEWPORTS = [
  { name: "iphone-se", width: 375, height: 667, ua: devices["iPhone SE"]?.userAgent },
  { name: "iphone-14", width: 390, height: 844, ua: devices["iPhone 14"]?.userAgent },
  { name: "ipad-mini", width: 768, height: 1024, ua: devices["iPad Mini"]?.userAgent },
];

// Cap to ≤1900px to comply with project rule (no images >2000px)
const MAX_HEIGHT = 1900;

const browser = await chromium.launch();
const errors = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    userAgent: vp.ua,
    deviceScaleFactor: 1,
    isMobile: vp.width < 768,
    hasTouch: vp.width < 1024,
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`[${vp.name}] pageerror: ${e.message}`));

  console.log(`[${vp.name}] navigating ${URL}...`);
  const resp = await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  console.log(`[${vp.name}] HTTP ${resp?.status()}`);

  // Top of page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `${OUT}/${SUFFIX}-${vp.name}-top.png`,
    fullPage: false,
  });

  // Mid-scroll (Hidden Cost section territory)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.4));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `${OUT}/${SUFFIX}-${vp.name}-mid1.png`,
    fullPage: false,
  });

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.5));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `${OUT}/${SUFFIX}-${vp.name}-mid2.png`,
    fullPage: false,
  });

  // Full page (capped height)
  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const clipHeight = Math.min(fullHeight, MAX_HEIGHT);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${OUT}/${SUFFIX}-${vp.name}-full.png`,
    clip: { x: 0, y: 0, width: vp.width, height: clipHeight },
  });

  // Detect overflow elements
  const overflow = await page.evaluate(() => {
    const vw = window.innerWidth;
    const offenders = [];
    const all = document.querySelectorAll("*");
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 4 && r.width < 5000) {
        offenders.push({
          tag: el.tagName,
          cls: (el.className || "").toString().slice(0, 80),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    }
    return { vw, count: offenders.length, top: offenders.slice(0, 8) };
  });
  console.log(`[${vp.name}] overflow elements: ${overflow.count} (vw=${overflow.vw})`);
  if (overflow.top.length) {
    for (const o of overflow.top) {
      console.log(`  ${o.tag}.${o.cls} right=${o.right} w=${o.width}`);
    }
  }

  await ctx.close();
}

if (errors.length) {
  console.log("\nPAGE ERRORS:");
  errors.forEach((e) => console.log(" -", e));
}

await browser.close();
console.log("\nDone.");
