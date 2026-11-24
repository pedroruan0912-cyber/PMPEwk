// Gera os PDFs dos post-its (colorido e econômico) a partir do HTML.
//   node postits/gerar-pdf.js                 -> todos os arquivos .html da pasta postits/
//   node postits/gerar-pdf.js lei-de-drogas   -> só um
// Antes de gerar, confere se o texto de algum post-it passou do tamanho do quadrado.
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const dir = __dirname;
const only = process.argv[2];
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.html'))
  .filter(f => !only || f === only || f === only + '.html');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let failed = false;
  for (const f of files) {
    const base = f.replace(/\.html$/, '');
    for (const eco of [false, true]) {
      await page.goto('file://' + path.join(dir, f) + (eco ? '?eco' : ''));
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: 'print' });
      const over = await page.$$eval('.pi', els => els.map((el, i) => {
        const b = el.querySelector('.body');
        return b.scrollHeight - b.clientHeight > 1 ? `#${i + 1} (${el.querySelector('h2').textContent.trim()}): +${b.scrollHeight - b.clientHeight}px` : null;
      }).filter(Boolean));
      if (over.length) { failed = true; console.error(`${f}: texto estourando em ${over.join('; ')}`); }
      const out = path.join(dir, `${base}-${eco ? 'economico' : 'colorido'}.pdf`);
      await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
      console.log('ok:', path.relative(process.cwd(), out));
    }
  }
  await browser.close();
  if (failed) process.exit(1);
})();
