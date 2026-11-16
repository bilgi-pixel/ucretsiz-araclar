// Kullanım: node scripts/uret/banka-dogrula.mjs  → web/assets/js/zeka-banka.js soru bankasını denetler.
import { BENZETME, FARKLI } from '../../web/assets/js/zeka-banka.js';
const E = [], norm = (s) => String(s).toLocaleLowerCase('tr').trim();
const gor = new Set();
BENZETME.forEach((q, i) => {
  const ad = `BENZETME[${i}] (${q.a}:${q.b})`;
  for (const k of ['a', 'b', 'c', 'd', 'aciklama']) if (typeof q[k] !== 'string' || !q[k].trim()) E.push(`${ad}: ${k} eksik`);
  if (!Array.isArray(q.yanlis) || q.yanlis.length !== 4) E.push(`${ad}: yanlis tam 4 çeldirici olmalı`);
  const hepsi = [q.d, ...(q.yanlis || [])].map(norm);
  if (new Set(hepsi).size !== hepsi.length) E.push(`${ad}: seçenekler tekrar ediyor`);
  if (hepsi.includes(norm(q.c)) || hepsi.slice(1).includes(norm(q.a)) && false) E.push(`${ad}: c seçeneklerde geçmemeli`);
  const key = [q.a, q.b, q.c].map(norm).join('|'); if (gor.has(key)) E.push(`${ad}: tekrar eden soru`); gor.add(key);
  if ((q.aciklama || '').length < 25) E.push(`${ad}: açıklama çok kısa`);
});
FARKLI.forEach((q, i) => {
  const ad = `FARKLI[${i}]`;
  if (!Array.isArray(q.kelimeler) || q.kelimeler.length !== 5 || new Set(q.kelimeler.map(norm)).size !== 5) E.push(`${ad}: kelimeler 5 farklı sözcük olmalı`);
  if (!Number.isInteger(q.farkli) || q.farkli < 0 || q.farkli > 4) E.push(`${ad}: farkli 0–4 arası sıra olmalı`);
  if (typeof q.aciklama !== 'string' || q.aciklama.length < 25) E.push(`${ad}: açıklama eksik/kısa`);
  const key = (q.kelimeler || []).map(norm).sort().join('|'); if (gor.has(key)) E.push(`${ad}: tekrar eden soru`); gor.add(key);
});
if (BENZETME.length < 90) E.push(`BENZETME en az 90 soru olmalı (şu an ${BENZETME.length})`);
if (FARKLI.length < 60) E.push(`FARKLI en az 60 soru olmalı (şu an ${FARKLI.length})`);
console.log(E.length ? E.map((e) => '✗ ' + e).join('\n') : `✓ banka geçerli: ${BENZETME.length} benzetme, ${FARKLI.length} farklı kelime`);
process.exit(E.length ? 1 : 0);
