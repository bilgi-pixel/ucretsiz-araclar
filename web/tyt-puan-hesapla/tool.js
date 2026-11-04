// TYT Puan Hesaplama — YAKLAŞIK tahmin; tamamı tarayıcıda çalışır, veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
let P = null; // parametreler.json içeriği

/** Net = doğru − yanlış/4 (ÖSYM kuralı). */
export const netOf = (d, y) => d - y / 4;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Ders girişlerini doğrular; hata varsa Türkçe Error fırlatır. */
function readCourses() {
  return P.tyt.dersler.map((c) => {
    const rd = $(`tyt-${c.id}-d`).value.trim(), ry = $(`tyt-${c.id}-y`).value.trim();
    const d = rd === '' ? 0 : Number(rd), y = ry === '' ? 0 : Number(ry);
    if (!Number.isInteger(d) || !Number.isInteger(y) || d < 0 || y < 0) {
      throw new Error(`${c.ad}: doğru ve yanlış sayıları 0 veya daha büyük tam sayı olmalı. Ondalık ya da eksi değer girmeyin.`);
    }
    if (d + y > c.soru) {
      throw new Error(`${c.ad}: doğru (${d}) ve yanlış (${y}) toplamı ${c.soru} soruyu aşamaz. Sayıları cevap anahtarınızla kontrol edip düzeltin.`);
    }
    const net = netOf(d, y);
    const katki = Math.max(0, net) * c.agirlik;
    return { ...c, d, y, bos: c.soru - d - y, net, katki };
  });
}

function compute() {
  const rows = readCourses();
  const sum = rows.reduce((s, r) => s + r.katki, 0);
  const puan = clamp(P.tyt.taban + sum, P.olcek.min, P.olcek.max);
  const out = { rows, puan, totalNet: rows.reduce((s, r) => s + r.net, 0), obp: null, hedef: null, notes: [] };

  const rawD = $('diploma').value.trim().replace(',', '.');
  if (rawD !== '') {
    const dip = Number(rawD);
    if (!Number.isFinite(dip) || dip < 50 || dip > 100) throw new Error('Diploma notu 50 ile 100 arasında olmalı (örn. 85,5). Ortaöğretim diploma notunuzu kontrol edip yeniden girin.');
    const obp = dip * P.obp.diploma_carpan;
    out.obp = { obp, katki: obp * ($('placed').checked ? P.obp.katki_yerlesmis : P.obp.katki) };
  }

  const rawH = $('hedef').value.trim().replace(',', '.');
  if (rawH !== '') {
    const h = Number(rawH);
    if (!Number.isFinite(h) || h < P.olcek.min || h > P.olcek.max) throw new Error(`Hedef puan ${P.olcek.min} ile ${P.olcek.max} arasında olmalı. Örneğin 350 yazın.`);
    const ortAgirlik = P.tyt.dersler.reduce((s, c) => s + c.agirlik * c.soru, 0) / P.tyt.dersler.reduce((s, c) => s + c.soru, 0);
    const gereken = Math.max(0, (h - P.tyt.taban) / ortAgirlik);
    out.hedef = { h, gereken, fark: gereken - out.totalNet };
  }

  const need = P.min_net_sart;
  // Kılavuz: Türkçe VEYA Temel Matematik testlerinin en az birinden 0,5 net yeterli; ikisi de altındaysa uyarı.
  const tested = rows.filter((r) => need.ders.includes(r.id));
  if (tested.length && tested.every((r) => r.net < need.net)) out.notes.push(`Türkçe ve Temel Matematik testlerinin ikisinde de net ${need.net} değerinin altında görünüyor. ${need.not}`);
  return out;
}

function cell(t) { const c = document.createElement('td'); c.textContent = t; return c; }

function render(r) {
  const tb = $('tbl-tyt'); tb.textContent = '';
  for (const x of r.rows) {
    const tr = document.createElement('tr');
    tr.append(cell(x.ad), cell(String(x.soru)), cell(String(x.d)), cell(String(x.y)), cell(String(x.bos)), cell(nf.format(x.net)), cell(nf.format(x.katki)));
    tb.append(tr);
  }
  $('r-net').textContent = nf.format(r.totalNet);
  $('r-puan').textContent = nf.format(r.puan);
  $('row-obp').hidden = !r.obp; $('row-place').hidden = !r.obp;
  if (r.obp) {
    $('r-obp').textContent = `${nf.format(r.obp.obp)} (katkı ${nf.format(r.obp.katki)} puan)`;
    $('r-place').textContent = nf.format(r.puan + r.obp.katki);
  }
  $('row-hedef').hidden = !r.hedef;
  if (r.hedef) {
    $('r-hedef').textContent = r.hedef.fark > 0
      ? `${nf.format(r.hedef.h)} puan için yaklaşık ${nf.format(r.hedef.gereken)} net gerekir; ${nf.format(r.hedef.fark)} net daha`
      : `${nf.format(r.hedef.h)} puan için yaklaşık ${nf.format(r.hedef.gereken)} net gerekir; hedefin üzerindesiniz`;
  }
  $('r-notes').textContent = r.notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  const l = ['TYT puan tahmini (yaklaşık; resmî sonuç değildir)'];
  for (const x of r.rows) l.push(`${x.ad}: ${x.d} D, ${x.y} Y, net ${nf.format(x.net)}`);
  l.push(`Toplam net: ${nf.format(r.totalNet)}`, `TYT ham puan ≈ ${nf.format(r.puan)}`);
  if (r.obp) l.push(`OBP katkısı ≈ ${nf.format(r.obp.katki)} puan`);
  l.push("ÖSYM'nin resmî puanı standart sapma ve soru iptallerine göre değişir; bu araç yalnızca yaklaşık tahmin verir.");
  return l.join('\n');
}

function buildRows() {
  const box = $('tyt-rows'); box.textContent = '';
  for (const c of P.tyt.dersler) {
    const row = document.createElement('div'); row.className = 'ders-row';
    const name = document.createElement('div'); name.className = 'ders-ad'; name.textContent = `${c.ad} (${c.soru} soru)`;
    const mk = (suffix, label) => {
      const w = document.createElement('label'); w.className = 'ders-in';
      const sp = document.createElement('span'); sp.textContent = label;
      const i = document.createElement('input');
      i.type = 'number'; i.min = '0'; i.max = String(c.soru); i.step = '1'; i.inputMode = 'numeric'; i.id = `tyt-${c.id}-${suffix}`; i.placeholder = '0';
      w.append(sp, i); return w;
    };
    row.append(name, mk('d', 'Doğru'), mk('y', 'Yanlış'));
    box.append(row);
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
  buildRows();
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  document.documentElement.dataset.ready = '1';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  for (const i of document.querySelectorAll('#tyt-rows input')) i.value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  try { await navigator.clipboard.writeText(summaryText(last)); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
init();
