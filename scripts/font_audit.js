// Crop-audit Vietnamese diacritics rendering at native resolution (deviceScaleFactor=2)
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // font glyph coverage check for key Vietnamese uppercase chars
  const glyphCheck = await page.evaluate(() => {
    const chars = "ÀÁẠÃẮẰẲẴẶĂÂẤẦẨẪẬĐÈÉẸẺÊỀẾỂỄỆÌÍỊỈĨÒÓỌỎÔỒỐỔỖỘƠỜỚỞỠỢÙÚỤỦƯỪỨỬỮỰỲÝỴỶỸ";
    const missing = [];
    for (const c of chars) {
      if (!document.fonts.check('900 16px "Be Vietnam Pro"', c)) missing.push(c);
    }
    return {
      bvpLoaded: document.fonts.check('900 16px "Be Vietnam Pro"', "A"),
      missingUppercase: missing.join(""),
      htmlFF: getComputedStyle(document.documentElement).fontFamily.slice(0, 40),
    };
  });
  console.log("GLYPH CHECK:", JSON.stringify(glyphCheck));

  // helper: scroll slide into view, wait reveal, crop screenshot
  async function shotSlide(idx, clip, name) {
    await page.evaluate((i) => {
      document.querySelectorAll(".deck-slide")[i].scrollIntoView({ behavior: "instant" });
    }, idx);
    await page.waitForTimeout(1700);
    await page.screenshot({ path: `/home/z/my-project/scripts/crop_${name}.png`, clip });
    console.log("saved", name);
  }

  // slide 11 (idx 10) — overview values: left column x=120..700, cards y=395..690
  await shotSlide(10, { x: 120, y: 390, width: 600, height: 310 }, "11_overview");
  // slide 5 (idx 4) — heading with NGỌC/BIỂN collision, x=90..680 y=180..420
  await shotSlide(4, { x: 90, y: 170, width: 600, height: 260 }, "05_heading");
  // slide 7 (idx 6) — divider heading 3 lines
  await shotSlide(6, { x: 90, y: 290, width: 760, height: 290 }, "07_divider");
  // slide 3 (idx 2) — agenda rows
  await shotSlide(2, { x: 160, y: 300, width: 720, height: 430 }, "03_agenda");
  // slide 8 (idx 7) — stats heading + TRIỆU
  await shotSlide(7, { x: 100, y: 220, width: 1220, height: 180 }, "08_heading");
  // slide 12 (idx 11) — itinerary card 1 text
  await shotSlide(11, { x: 100, y: 540, width: 420, height: 180 }, "12_day1");
  // slide 15 (idx 14) — thanks heading
  await shotSlide(14, { x: 320, y: 200, width: 800, height: 330 }, "15_thanks");

  await browser.close();
  console.log("DONE");
})();
