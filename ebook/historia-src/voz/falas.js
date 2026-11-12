#!/usr/bin/env node
// Lista todas as falas do desenho (título, cenas, "Cai na prova" e pegadinha), exatamente como o player as narra.
// Uso: node falas.js > falas.json
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => /^(10-art|2\d-cenas-\d)\.js$/.test(f)).sort();
const code = files.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n') + '\n;SCENES';
const SCENES = vm.runInNewContext(code, {});
// mesmo cálculo do player (99-app.js): se o texto mudar, o código muda e a gravação antiga deixa de ser usada
function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0; return h.toString(36); }
const out = [];
SCENES.forEach((sc, i) => {
  const add = (key, text) => out.push({ id: sc.id, key, text, hash: hash(text) });
  add('t', (i ? 'Episódio ' + i + '. ' : '') + sc.title + '.');
  sc.beats.forEach((b, n) => add('b' + n, b.t));
  sc.facts.forEach((f, n) => add('f' + n, (n === 0 ? 'Cai na prova. ' : '') + f));
  if (sc.trap) add('p', 'Pegadinha da banca. ' + sc.trap);
});
process.stdout.write(JSON.stringify(out, null, 1));
