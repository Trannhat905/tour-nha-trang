const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  for (const n of ['01', '02', '03', '08', '12', '13']) {
    await page.goto('file:///home/z/my-project/download/slides/slide_' + n + '.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: '/home/z/my-project/scripts/check_' + n + '.png' });
    console.log('captured ' + n);
  }
  await browser.close();
})();
