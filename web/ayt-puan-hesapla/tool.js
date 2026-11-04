// AYT Puan Hesaplama — YAKLAŞIK tahmin; tamamı tarayıcıda çalışır, veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
let P = null; // parametreler.json içeriği

/** Net = doğru − yanlış/4 (ÖSYM kuralı). */
export const netOf = (d, y) => d - y / 4;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Bir ders listesindeki girişleri okur ve doğrular; hata varsa Türkçe Error fırlatır. */
function readCourses(prefix, courses, katsayi) {
  return courses.map((c) => {
    const rd = $(`${prefix}-${c.id}-d`).value.trim(), ry = $(`${prefix}-${c.id}-y`).value.trim();
    const d = rd === '' ? 0 : Number(rd), y = ry === '' ? 0 : Number(ry);
    if (!Number.isInteger(d) || !Number.isInteger(y) || d < 0 || y < 0) {
      throw new Error(`${c.ad}: doğru ve yanlış sayıları 0 veya daha büyük tam sayı olmalı. Ondalık ya da eksi değer girmeyin.`);
    }
    if (d + y > c.soru) {
      throw new Error(`${c.ad}: doğru (${d}) ve yanlış (${y}) toplamı ${c.soru} soruyu aşamaz. Sayıları cevap anahtarınızla kontrol edip düzeltin.`);
    }
    const net = netOf(d, y);
    return { ...c, d, y, bos: c.soru - d - y, net, katki: Math.max(0, net) * c.agirlik * katsayi };
  });
}

function compute() {
  const tytRows = readCourses('tyt', P.tyt.dersler, 1);
  const tytSum = tytRows.reduce((s, r) => s + r.katki, 0);
  const tytPuan = clamp(P.tyt.taban + tytSum, P.olcek.min, P.olcek.max);
  const alan = $('alan').value;
  const aytRows = readCourses('ayt', P.ayt.alanlar[alan].dersler, 1);
  const aytSum = aytRows.reduce((s, r) => s + r.katki, 0);
  const tytKatki = tytSum * P.ayt.tyt_payi;
  const out = {
    alan: P.ayt.alanlar[alan].ad, aytRows, tytKatki, aytSum, tytPuan,
    ayt: clamp(P.tyt.taban + tytKatki + aytSum, P.olcek.min, P.olcek.max),
    aytNet: aytRows.reduce((s, r) => s + r.net, 0), tytNet: tytRows.reduce((s, r) => s + r.net, 0), obp: null, notes: [],
  };
  const rawD = $('diploma').value.trim().replace(',', '.');
  if (rawD !== '') {
    const dip = Number(rawD);
    if (!Number.isFinite(dip) || dip < 50 || dip > 100) throw new Error('Diploma notu 50 ile 100 arasında olmalı (örn. 85,5). Ortaöğretim diploma notunuzu kontrol edip yeniden girin.');
    const obp = dip * P.obp.diploma_carpan;
    out.obp = { obp, katki: obp * ($('placed').checked ? P.obp.katki_yerlesmis : P.obp.katki) };
  }
  const need = P.min_net_sart;
  // Kılavuz: Türkçe VEYA Temel Matematik testlerinin en az birinden 0,5 net yeterli; ikisi de altındaysa uyarı.
  const tested = tytRows.filter((r) => need.ders.includes(r.id));
  if (tested.length && tested.every((r) => r.net < need.net)) out.notes.push(`Türkçe ve Temel Matematik testlerinin ikisinde de net ${need.net} değerinin altında görünüyor. ${need.not}`);
  return out;
}

function cell(t) { const c = document.createElement('td'); c.textContent = t; return c; }

function render(r) {
  const tb = $('tbl-ayt'); tb.textContent = '';
  for (const x of r.aytRows) {
    const tr = document.createElement('tr');
    tr.append(cell(x.ad), cell(String(x.soru)), cell(String(x.d)), cell(String(x.y)), cell(String(x.bos)), cell(nf.format(x.net)), cell(nf.format(x.katki)));
    tb.append(tr);
  }
  $('r-alan').textContent = r.alan;
  $('r-ayt-net').textContent = nf.format(r.aytNet);
  $('r-ayt').textContent = nf.format(r.ayt);
  $('r-tyt-katki').textContent = `${nf.format(r.tytKatki)} puan (TYT neti ${nf.format(r.tytNet)})`;
  $('row-obp').hidden = !r.obp; $('row-place').hidden = !r.obp;
  if (r.obp) {
    $('r-obp').textContent = `${nf.format(r.obp.obp)} (katkı ${nf.format(r.obp.katki)} puan)`;
    $('r-place').textContent = nf.format(r.ayt + r.obp.katki);
  }
  $('r-notes').textContent = r.notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  const l = [`AYT puan tahmini – ${r.alan} (yaklaşık; resmî sonuç değildir)`];
  for (const x of r.aytRows) l.push(`${x.ad}: ${x.d} D, ${x.y} Y, net ${nf.format(x.net)}`);
  l.push(`AYT toplam net: ${nf.format(r.aytNet)}`, `AYT puanı ≈ ${nf.format(r.ayt)}`);
  if (r.obp) l.push(`OBP katkılı yerleştirme puanı ≈ ${nf.format(r.ayt + r.obp.katki)}`);
  l.push("ÖSYM'nin resmî puanı standart sapma ve soru iptallerine göre değişir; bu araç yalnızca yaklaşık tahmin verir.");
  return l.join('\n');
}

/** Ders satırlarını (doğru/yanlış girişleri) oluşturur. */
function buildRows(container, prefix, courses) {
  container.textContent = '';
  for (const c of courses) {
    const row = document.createElement('div'); row.className = 'ders-row';
    const name = document.createElement('div'); name.className = 'ders-ad'; name.textContent = `${c.ad} (${c.soru} soru)`;
    const mk = (suffix, label) => {
      const w = document.createElement('label'); w.className = 'ders-in';
      const sp = document.createElement('span'); sp.textContent = label;
      const i = document.createElement('input');
      i.type = 'number'; i.min = '0'; i.max = String(c.soru); i.step = '1'; i.inputMode = 'numeric'; i.id = `${prefix}-${c.id}-${suffix}`; i.placeholder = '0';
      w.append(sp, i); return w;
    };
    row.append(name, mk('d', 'Doğru'), mk('y', 'Yanlış'));
    container.append(row);
  }
}

let last = null;
function run() {
  showError($('error'), '');
  try { last = compute(); render(last); }
  catch (e) { last = null; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message); }
}

async function init() {
  try { P = await (await fetch(new URL('./parametreler.json', import.meta.url))).json(); }
  catch { showError($('error'), 'Puan parametreleri yüklenemedi. Sayfayı yenileyin; sorun sürerse bağlantınızı kontrol edip tekrar deneyin.'); return; }
  buildRows($('tyt-rows'), 'tyt', P.tyt.dersler);
  const sel = $('alan');
  for (const [k, v] of Object.entries(P.ayt.alanlar)) { const o = document.createElement('option'); o.value = k; o.textContent = v.ad; sel.append(o); }
  sel.addEventListener('change', () => buildRows($('ayt-rows'), 'ayt', P.ayt.alanlar[sel.value].dersler));
  buildRows($('ayt-rows'), 'ayt', P.ayt.alanlar[sel.value].dersler);
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  document.documentElement.dataset.ready = '1';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  for (const i of document.querySelectorAll('#tyt-rows input, #ayt-rows input')) i.value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  try { await navigator.clipboard.writeText(summaryText(last)); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
init();
