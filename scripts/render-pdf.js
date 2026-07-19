const path = require('path');
const puppeteer = require('puppeteer');

const sourceFile = process.argv[2] || 'lebenslauf-luc-wilcox.html';
const outputFile = process.argv[3] || 'lebenslauf-luc-wilcox.pdf';

const SOURCE = path.resolve(__dirname, '..', sourceFile);
const OUTPUT = path.resolve(__dirname, '..', outputFile);

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
