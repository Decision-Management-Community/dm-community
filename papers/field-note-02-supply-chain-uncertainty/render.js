const { chromium } = require('playwright-core');
const path = require('path');

const SRC = process.argv[2] || path.join(__dirname, 'field-note-02.html');
const OUT = process.argv[3] || path.join(__dirname, 'field-note-02.pdf');

const FONT = "'Bitstream Charter', Charter, 'Liberation Serif', Georgia, serif";

const header = `
<div style="width:100%; font-family:${FONT}; font-size:7pt; color:#333;
            padding:0 0.72in 3pt 0.72in; margin:0; -webkit-print-color-adjust:exact;
            border-bottom:0.5pt solid #cfcfcf; box-sizing:border-box;">
  <table style="width:100%; border:0; border-collapse:collapse; font-size:7pt;">
    <tr>
      <td style="text-align:left; letter-spacing:0.10em; padding:0;">BIT BROS &nbsp;|&nbsp; FIELD NOTE 02 &nbsp;|&nbsp; AUGUST 2026</td>
      <td style="text-align:right; letter-spacing:0.10em; padding:0;">SUPPLY CHAIN &amp; DECISION SYSTEMS</td>
    </tr>
  </table>
</div>`;

const footer = `
<div style="width:100%; font-family:${FONT}; font-size:7pt; color:#333;
            padding:4pt 0.72in 0 0.72in; margin:0; -webkit-print-color-adjust:exact;
            border-top:0.5pt solid #cfcfcf; box-sizing:border-box;">
  <table style="width:100%; border:0; border-collapse:collapse; font-size:7pt;">
    <tr>
      <td style="text-align:left; padding:0;">Bit Bros LLC &nbsp;|&nbsp; BitBrosData.com</td>
      <td style="text-align:right; padding:0;"><span class="pageNumber"></span> / <span class="totalPages"></span></td>
    </tr>
  </table>
</div>`;

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.goto('file://' + SRC, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: OUT,
    format: 'Letter',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: header,
    footerTemplate: footer,
    margin: { top: '0.78in', bottom: '0.68in', left: '0.72in', right: '0.72in' },
  });

  await browser.close();
  console.log('wrote', OUT);
})().catch((e) => { console.error(e); process.exit(1); });
