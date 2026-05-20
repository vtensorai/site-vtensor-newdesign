import { chromium, devices } from "playwright";

const URL = process.env.AUDIT_URL || "https://d893230a.vtensor-staging.pages.dev";

const VIEWPORTS = [
  { name: "iphone-se", width: 375, height: 667, ua: devices["iPhone SE"]?.userAgent },
  { name: "iphone-14", width: 390, height: 844, ua: devices["iPhone 14"]?.userAgent },
  { name: "ipad-mini", width: 768, height: 1024, ua: devices["iPad Mini"]?.userAgent },
];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    userAgent: vp.ua,
    isMobile: vp.width < 768,
    hasTouch: vp.width < 1024,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });

  const data = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    return {
      htmlScrollWidth: html.scrollWidth,
      htmlClientWidth: html.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
      hasHorizontalScroll: html.scrollWidth > html.clientWidth,
    };
  });
  console.log(`[${vp.name}] vw=${vp.width} html.scrollWidth=${data.htmlScrollWidth} body.scrollWidth=${data.bodyScrollWidth} → horizontalScroll=${data.hasHorizontalScroll}`);

  await ctx.close();
}

await browser.close();
