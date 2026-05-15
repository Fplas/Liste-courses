import { chromium } from 'playwright';

const URL = 'https://fplas.github.io/Liste-courses/';
const browser = await chromium.launch();

const configs = [
  { name: 'light-pantry',  scheme: 'light', width: 390, height: 844, scale: 3 },
  { name: 'dark-pantry',   scheme: 'dark',  width: 390, height: 844, scale: 3 },
  { name: 'dark-liste',    scheme: 'dark',  width: 390, height: 844, scale: 3, clickListe: true },
];

for (const cfg of configs) {
  const ctx = await browser.newContext({
    viewport: { width: cfg.width, height: cfg.height },
    deviceScaleFactor: cfg.scale,
    isMobile: true,
    hasTouch: true,
    colorScheme: cfg.scheme,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  if (cfg.clickListe) {
    await page.click('[data-tab="liste"]');
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: `screenshot-${cfg.name}.png`, fullPage: true });
  console.log(`✓ ${cfg.name}`);
  await ctx.close();
}

await browser.close();
