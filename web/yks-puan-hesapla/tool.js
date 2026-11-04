// YKS Puan Hesaplama (TYT + AYT) — yalnızca YAKLAŞIK tahmin; tamamı tarayıcıda çalışır, veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

let P = null; // parametreler.json içeriği

/** Net = doğru − yanlış/4 (ÖSYM kuralı). */
export const netOf = (d, y) => d - y / 4;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Bir ders listesi için girişleri doğrular; hata varsa Türkçe Error fırlatır. */
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

/** TYT ham puanı: taban + netlerin ağırlıklı toplamı (yaklaşık). Negatif net puana katkı yapmaz. */
function tytScore(rows) {
  const sum = rows.reduce((s, r) => s + Math.max(0, r.net) * r.agirlik, 0);
  return { sum, puan: clamp(P.tyt.taban + sum, P.olcek.min, P.olcek.max) };
}

/** AYT puanı: taban + TYT payı + AYT ağırlıklı netler (yaklaşık). */
function aytScore(tytSum, rows) {
  const sum = rows.reduce((s, r) => s + Math.max(0, r.net) * r.agirlik, 0);
  return clamp(P.tyt.taban + tytSum * P.ayt.tyt_payi + sum, P.olcek.min, P.olcek.max);
}

/** OBP: diploma notu × 5; katkı = OBP × 0,12 (önceki yıl yerleşen için yarısı). */
function obpContribution(diploma, placedBefore) {
  const obp = diploma * P.obp.diploma_carpan;
  return { obp, katki: obp * (placedBefore ? P.obp.katki_yerlesmis : P.obp.katki) };
}

function compute() {
  const tytRows = readCourses('tyt', P.tyt.dersler);
  const tyt = tytScore(tytRows);
  const out = { tytRows, tyt, ayt: null, aytRows: [], obp: null, notes: [] };
  // Kılavuz: A-TYT için Temel Matematik veya Türkçe testinden en az 0,5 ham puan (net). Baraj puanı yoktur.
  out.tytOk = tytRows.some((x) => (x.id === "turkce" || x.id === "mat") && x.net >= P.kurallar.min_ham_puan);
  if (!out.tytOk) out.notes.push("TYT puanı hesaplanması için Türkçe veya Temel Matematik testinden en az 0,5 net gerekir; bu şart sağlanmadığında ÖSYM TYT puanı hesaplamaz.");

  const alan = $('alan').value;
  if (alan) {
    out.aytRows = readCourses('ayt', P.ayt.alanlar[alan].dersler);
    out.alan = P.ayt.alanlar[alan].ad;
    // ÖSYM 2026 Kılavuzu 3.10.1 ve Tablo 1D: TYT puanı hesaplanmış olmalı ve ilgili AYT testlerinin en az birinden 0,5 veya daha fazla ham puan (net) alınmalı.
    if (!out.tytOk) {
      out.notes.push("TYT puanı hesaplanabilmesi için Türkçe veya Temel Matematik testinden en az 0,5 net gerekir; bu şart sağlanmadığı için AYT puanı gösterilmedi.");
    } else if (!out.aytRows.some((x) => x.net >= P.kurallar.min_ham_puan)) {
      out.notes.push("AYT puanının hesaplanması için ilgili AYT testlerinin en az birinden 0,5 net gerekir; bu şart sağlanmadığı için AYT puanı gösterilmedi.");
    } else {
      out.ayt = aytScore(tyt.sum, out.aytRows);
    }
  }

  const rawD = $('diploma').value.trim().replace(',', '.');
  if (rawD !== '') {
    const dip = Number(rawD);
    if (!Number.isFinite(dip) || dip < 50 || dip > 100) throw new Error('Diploma notu 50 ile 100 arasında olmalı (örn. 85,5). Ortaöğretim diploma notunuzu kontrol edin.');
    out.obp = obpContribution(dip, $('placed').checked);
  }
  return out;
}

function cell(text) { const c = document.createElement('td'); c.textContent = text; return c; }

function fillTable(tbody, rows) {
  tbody.textContent = '';
  for (const r of rows) {
    const tr = document.createElement('tr');
    tr.append(cell(r.ad), cell(String(r.soru)), cell(String(r.d)), cell(String(r.y)), cell(String(r.bos)), cell(nf.format(r.net)));
    tbody.append(tr);
  }
}

function render(r) {
  fillTable($('tbl-tyt'), r.tytRows);
  fillTable($('tbl-ayt'), r.aytRows);
  $('wrap-ayt').hidden = r.aytRows.length === 0;
  $('r-tyt-net').textContent = nf.format(r.tytRows.reduce((s, x) => s + x.net, 0));
  $('r-tyt-puan').textContent = nf.format(r.tyt.puan);
  const hasAyt = r.aytRows.length > 0;
  $('row-ayt-net').hidden = !hasAyt;
  $('row-ayt').hidden = !hasAyt;
  if (hasAyt) {
    $('r-ayt-net').textContent = nf.format(r.aytRows.reduce((s, x) => s + x.net, 0));
    $('r-ayt').textContent = r.ayt === null ? 'Hesaplanmadı (0,5 net şartı)' : `${nf.format(r.ayt)} (${r.alan})`;
  }
  $('row-obp').hidden = !r.obp;
  $('row-place').hidden = !r.obp;
  const notes = [...r.notes];
  if (r.obp) {
    $('r-obp').textContent = `${nf.format(r.obp.obp)} (katkı ${nf.format(r.obp.katki)} puan)`;
    const parts = [`TYT ≈ ${nf.format(r.tyt.puan + r.obp.katki)}`];
    if (r.ayt !== null) parts.push(`${r.alan.match(/\((.+)\)/)[1]} ≈ ${nf.format(r.ayt + r.obp.katki)}`);
    $('r-place').textContent = parts.join(' · ');
  }
  $('r-notes').textContent = notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  const lines = ['YKS puan tahmini (yaklaşık; resmî sonuç değildir)'];
  for (const x of r.tytRows) lines.push(`TYT ${x.ad}: ${x.d} D, ${x.y} Y, net ${nf.format(x.net)}`);
  lines.push(`TYT ham puan ≈ ${nf.format(r.tyt.puan)}`);
  for (const x of r.aytRows) lines.push(`AYT ${x.ad}: ${x.d} D, ${x.y} Y, net ${nf.format(x.net)}`);
  if (r.ayt !== null) lines.push(`AYT ham puan ≈ ${nf.format(r.ayt)} (${r.alan})`);
  if (r.obp) lines.push(`OBP katkısı ≈ ${nf.format(r.obp.katki)} puan`);
  lines.push("ÖSYM/MEB'in resmî puan hesaplaması, soru iptalleri ve standart sapma değerlerine göre değişir; bu araç yalnızca yaklaşık tahmin verir.");
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
function run() {
  showError($('error'), '');
  try { last = compute(); render(last); }
  catch (e) {
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
  buildRows($('tyt-rows'), 'tyt', P.tyt.dersler);
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('baraj-info').textContent = `${P.kurallar.yil} YKS Kılavuzu: sabit baraj puanı yoktur; TYT puanı için Türkçe veya Temel Matematik testinden, AYT puanı için ilgili AYT testlerinden en az 0,5 net gerekir.`;
  const sel = $('alan');
  for (const [k, v] of Object.entries(P.ayt.alanlar)) { const o = document.createElement('option'); o.value = k; o.textContent = v.ad; sel.append(o); }
  sel.addEventListener('change', () => {
    const a = sel.value;
    $('ayt-wrap').hidden = !a;
    $('ayt-rows').textContent = '';
    if (a) buildRows($('ayt-rows'), 'ayt', P.ayt.alanlar[a].dersler);
  });
  document.documentElement.dataset.ready = '1';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => {
  $('form').reset(); $('ayt-wrap').hidden = true; $('ayt-rows').textContent = '';
  for (const i of document.querySelectorAll('#tyt-rows input')) i.value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
init();
