// LGS Puan Hesaplama — yalnızca YAKLAŞIK tahmin; tamamı tarayıcıda çalışır, veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

let P = null; // parametreler.json içeriği

function cell(text) { const c = document.createElement('td'); c.textContent = text; return c; }

/** Girişleri doğrular ve net hesaplar (net = doğru − yanlış/3). */
function readCourses() {
  return P.dersler.map((c) => {
    const rd = $(`lgs-${c.id}-d`).value.trim(), ry = $(`lgs-${c.id}-y`).value.trim();
    const d = rd === '' ? 0 : Number(rd), y = ry === '' ? 0 : Number(ry);
    if (!Number.isInteger(d) || !Number.isInteger(y) || d < 0 || y < 0) {
      throw new Error(`${c.ad}: doğru ve yanlış sayıları 0 veya daha büyük tam sayı olmalı. Ondalık ya da eksi değer girmeyin.`);
    }
    if (d + y > c.soru) {
      throw new Error(`${c.ad}: doğru (${d}) ve yanlış (${y}) toplamı ${c.soru} soruyu aşamaz. Sayıları kontrol edip düzeltin.`);
    }
    return { ...c, d, y, bos: c.soru - d - y, net: d - y / P.yanlis_bolen };
  });
}

/** Ağırlıklı net → 100-500 ölçeği (yaklaşık). */
function score(rows) {
  const w = rows.reduce((s, r) => s + Math.max(0, r.net) * r.katsayi, 0);
  const max = P.dersler.reduce((s, c) => s + c.soru * c.katsayi, 0);
  const { min, max: top } = P.olcek;
  return { weighted: w, maxWeighted: max, puan: min + (top - min) * (w / max) };
}

function render(rows, sc) {
  const tb = $('tbl'); tb.textContent = '';
  for (const r of rows) {
    const tr = document.createElement('tr');
    tr.append(cell(r.ad), cell(r.oturum), cell(String(r.soru)), cell(String(r.d)), cell(String(r.y)), cell(String(r.bos)), cell(nf.format(r.net)), cell(String(r.katsayi)));
    tb.append(tr);
  }
  const sum = (o) => rows.filter((r) => r.oturum === o).reduce((s, r) => s + r.net, 0);
  $('r-sozel').textContent = nf.format(sum('Sözel'));
  $('r-sayisal').textContent = nf.format(sum('Sayısal'));
  $('r-net').textContent = nf.format(rows.reduce((s, r) => s + r.net, 0));
  $('r-puan').textContent = nf.format(sc.puan);
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(rows, sc) {
  const lines = ['LGS puan tahmini (yaklaşık; resmî sonuç değildir)'];
  for (const r of rows) lines.push(`${r.ad}: ${r.d} D, ${r.y} Y, net ${nf.format(r.net)}`);
  lines.push(`Toplam net: ${nf.format(rows.reduce((s, r) => s + r.net, 0))}`);
  lines.push(`Yaklaşık puan: ${nf.format(sc.puan)} (100-500 ölçeği)`);
  lines.push("ÖSYM/MEB'in resmî puan hesaplaması, soru iptalleri ve standart sapma değerlerine göre değişir; bu araç yalnızca yaklaşık tahmin verir.");
  return lines.join('\n');
}

function buildRows() {
  for (const oturum of ['Sözel', 'Sayısal']) {
    const box = $(oturum === 'Sözel' ? 'rows-sozel' : 'rows-sayisal'); box.textContent = '';
    for (const c of P.dersler.filter((x) => x.oturum === oturum)) {
      const row = document.createElement('div'); row.className = 'ders-row';
      const name = document.createElement('div'); name.className = 'ders-ad'; name.textContent = `${c.ad} (${c.soru} soru)`;
      const mk = (suffix, label) => {
        const wrap = document.createElement('label'); wrap.className = 'ders-in';
        const sp = document.createElement('span'); sp.textContent = label;
        const inp = document.createElement('input');
        inp.type = 'number'; inp.min = '0'; inp.max = String(c.soru); inp.step = '1'; inp.inputMode = 'numeric';
        inp.id = `lgs-${c.id}-${suffix}`; inp.placeholder = '0';
        wrap.append(sp, inp); return wrap;
      };
      row.append(name, mk('d', 'Doğru'), mk('y', 'Yanlış'));
      box.append(row);
    }
  }
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    const rows = readCourses(); const sc = score(rows);
    last = { rows, sc }; render(rows, sc);
  } catch (e) {
    last = null; $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    P = await res.json();
  } catch {
    showError($('error'), 'Puan parametreleri yüklenemedi. Sayfayı yenileyin; sorun sürerse internet bağlantınızı kontrol edip tekrar deneyin.');
    return;
  }
  buildRows();
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  document.documentElement.dataset.ready = '1';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => {
  for (const i of document.querySelectorAll('.ders-row input')) i.value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last.rows, last.sc)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
init();
