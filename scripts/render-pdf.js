const path = require('path');
const puppeteer = require('puppeteer');

const SOURCE = path.resolve(__dirname, '..', 'lebenslauf-luc-wilcox.html');
const OUTPUT = path.resolve(__dirname, '..', 'lebenslauf-luc-wilcox.pdf');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`file://${SOURCE}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`Wrote ${OUTPUT}`);
})();
