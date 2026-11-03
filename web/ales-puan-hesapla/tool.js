// ALES Puan Hesaplama — yalnızca YAKLAŞIK tahmin; tamamı tarayıcıda çalışır, veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
const UYARI = "ÖSYM standart sapmaya göre hesaplar, bu araç yalnızca yaklaşık tahmin verir.";

let P = null; // parametreler.json içeriği

/** Net = doğru − yanlış/4 (ÖSYM kuralı). */
const netOf = (d, y) => d - y / 4;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Doğru/yanlış girişlerini doğrular; hata varsa Türkçe Error fırlatır. */
function readCourses(prefix, courses) {
  return courses.map((c) => {
    const rd = $(`${prefix}-${c.id}-d`).value.trim(), ry = $(`${prefix}-${c.id}-y`).value.trim();
    const d = rd === '' ? 0 : Number(rd), y = ry === '' ? 0 : Number(ry);
    if (!Number.isInteger(d) || !Number.isInteger(y) || d < 0 || y < 0) {
      throw new Error(`${c.ad}: doğru ve yanlış sayıları 0 veya daha büyük tam sayı olmalı. Ondalık ya da eksi değer girmeyin.`);
    }
    if (d + y > c.soru) {
      throw new Error(`${c.ad}: doğru (${d}) ve yanlış (${y}) toplamı ${c.soru} soruyu aşamaz. Sayıları kontrol edip düzeltin.`);
    }
    return { ...c, d, y, bos: c.soru - d - y, net: netOf(d, y) };
  });
}

/** Puan = 100 × ağırlıklı net oranı; negatif net katkı yapmaz. Tüm doğru → 100. */
function score(t, say, soz) {
  const v = 100 * (t.sayisal * Math.max(0, say.net) / say.soru + t.sozel * Math.max(0, soz.net) / soz.soru);
  return clamp(v, P.olcek.min, P.olcek.max);
}

function compute() {
  const rows = readCourses('ales', P.testler);
  const [say, soz] = rows;
  const out = { rows, puanlar: [], notes: [] };
  for (const t of P.puanTurleri) out.puanlar.push({ id: t.id, ad: t.ad, puan: score(t, say, soz) });
  const best = Math.max(...out.puanlar.map((p) => p.puan));
  const b = P.baraj;
  if (best < b.yuksekLisans) out.notes.push(`En yüksek puanınız yaklaşık ${nf.format(best)}; ${b.yuksekLisans} alt sınırının altında görünüyor.`);
  else if (best < b.doktora) out.notes.push(`En yüksek puanınız yaklaşık ${nf.format(best)}; ${b.yuksekLisans} alt sınırını geçiyor, ancak ${b.doktora} alt sınırının altında.`);
  else out.notes.push(`En yüksek puanınız yaklaşık ${nf.format(best)}; ${b.yuksekLisans} ve ${b.doktora} alt sınırlarının üzerinde görünüyor.`);
  out.notes.push(b.not);
  return out;
}

function cell(text) { const c = document.createElement('td'); c.textContent = text; return c; }

function render(r) {
  const tb = $('tbl-net'); tb.textContent = '';
  for (const x of r.rows) {
    const tr = document.createElement('tr');
    tr.append(cell(x.ad), cell(String(x.soru)), cell(String(x.d)), cell(String(x.y)), cell(String(x.bos)), cell(nf.format(x.net)));
    tb.append(tr);
  }
  $('r-say-net').textContent = nf.format(r.rows[0].net);
  $('r-soz-net').textContent = nf.format(r.rows[1].net);
  const box = $('r-puanlar'); box.textContent = '';
  for (const p of r.puanlar) {
    const row = document.createElement('div'); row.className = 'kdv-row is-strong';
    const dt = document.createElement('dt'); dt.textContent = `${p.ad} puanı`;
    const dd = document.createElement('dd'); dd.id = `r-p-${p.id}`;
    dd.textContent = nf.format(p.puan);
    row.append(dt, dd); box.append(row);
  }
  $('r-notes').textContent = r.notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  const lines = ['ALES puan tahmini (yaklaşık; resmî sonuç değildir)'];
  for (const x of r.rows) lines.push(`${x.ad}: ${x.d} D, ${x.y} Y, net ${nf.format(x.net)}`);
  for (const p of r.puanlar) lines.push(`${p.ad} puanı ≈ ${nf.format(p.puan)}`);
  lines.push(UYARI);
  return lines.join('\n');
}

/** Ders satırlarını (doğru/yanlış girişleri) oluşturur. */
function buildRows(container, prefix, courses) {
  container.textContent = '';
  for (const c of courses) {
    const row = document.createElement('div'); row.className = 'ders-row';
    const name = document.createElement('div'); name.className = 'ders-ad';
    name.textContent = `${c.ad} (${c.soru} soru)`;
    const mk = (suffix, label) => {
      const wrap = document.createElement('label'); wrap.className = 'ders-in';
      const sp = document.createElement('span'); sp.textContent = label;
      const inp = document.createElement('input');
      inp.type = 'number'; inp.min = '0'; inp.max = String(c.soru); inp.step = '1'; inp.inputMode = 'numeric';
      inp.id = `${prefix}-${c.id}-${suffix}`; inp.placeholder = '0';
      wrap.append(sp, inp); return wrap;
    };
    row.append(name, mk('d', 'Doğru'), mk('y', 'Yanlış'));
    container.append(row);
  }
}

let last = null;
function resetResult() { $('result').hidden = true; $('result').classList.remove('is-active'); last = null; }
function run() {
  showError($('error'), '');
  try { last = compute(); render(last); }
  catch (e) { resetResult(); showError($('error'), e.message); }
}

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    P = await res.json();
  } catch {
    showError($('error'), 'Puan parametreleri yüklenemedi. Sayfayı yenileyin; sorun sürerse internet bağlantınızı kontrol edip tekrar deneyin.');
    return;
  }
  buildRows($('ales-rows'), 'ales', P.testler);
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('baraj-info').textContent = `Araçta kullanılan alt sınırlar: ${P.baraj.yuksekLisans} (yüksek lisans) ve ${P.baraj.doktora} (doktora). ${P.baraj.not} Kılavuzu kontrol edin.`;
  document.documentElement.dataset.ready = '1';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => { $('form').reset(); resetResult(); showError($('error'), ''); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
init();
