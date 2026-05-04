import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`PAGE: ${e.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`CONS: ${msg.text()}`);
});

await page.goto("http://localhost:3000/backgrounds-demo", {
  waitUntil: "networkidle",
  timeout: 30000,
});
await page.waitForTimeout(1500);

const buttons = await page.$$eval("nav button", (btns) =>
  btns.map((b) => b.textContent.trim())
);
console.log("NAV BUTTONS:", JSON.stringify(buttons));

const mistBtn = await page.locator("nav button", { hasText: "Shader Mist" }).first();
await mistBtn.click();
await page.waitForTimeout(800);

const sections = await page.$$eval("main section", (els) => els.map((s) => s.id));
console.log("SECTIONS COUNT:", sections.length);
console.log("SECTION IDS:", JSON.stringify(sections));

for (let i = 0; i < sections.length; i++) {
  await page.locator(`#${sections[i]}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
}

await page.waitForTimeout(800);
console.log("ERRORS:", errors.length);
errors.slice(0, 12).forEach((e) => console.log("  -", e));

await browser.close();
