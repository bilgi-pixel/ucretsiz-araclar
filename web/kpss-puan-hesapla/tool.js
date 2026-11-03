// KPSS Puan Hesaplama — yalnızca YAKLAŞIK tahmin; tamamı tarayıcıda çalışır, veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
const UYARI = "ÖSYM'nin resmî hesaplaması standart sapmaya göre değişir; bu araç yalnızca yaklaşık tahmin verir.";

let P = null; // parametreler.json içeriği

/** Net = doğru − yanlış/4 (ÖSYM kuralı). */
export const netOf = (d, y) => d - y / 4;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const sumNet = (rows) => rows.reduce((s, r) => s + r.net, 0);

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

/** Puan türü: taban + ağırlıklı netler (negatif net katkı yapmaz), 0-100 aralığına sıkıştırılır. */
function score(t, netGY, netGK, netEB) {
  const raw = t.taban + Math.max(0, netGY) * t.gy + Math.max(0, netGK) * t.gk + Math.max(0, netEB) * (t.eb || 0);
  return clamp(raw, P.olcek.min, P.olcek.max);
}

function compute() {
  const level = $('seviye').value;
  const gy = readCourses('gy', P.gy.dersler);
  const gk = readCourses('gk', P.gk.dersler);
  const out = { level, levelName: $('seviye').selectedOptions[0].textContent, gy, gk, eb: [], abt: [], puanlar: [], hedef: null };
  const teach = level === 'lisans' && $('ogretmen').checked;
  if (teach) {
    out.eb = readCourses('eb', P.egitim.dersler);
    const rd = $('abt-alan-d').value.trim(), ry = $('abt-alan-y').value.trim(), rs = $('abt-soru').value.trim();
    if (rd !== '' || ry !== '') {
      const soru = Number(rs);
      if (!Number.isInteger(soru) || soru < 1 || soru > 200) throw new Error('Alan bilgisi için önce soru sayısını yazın (1-200 arası tam sayı). Soru sayısı alanınıza göre değişir; ÖSYM kılavuzundan bakabilirsiniz.');
      out.abt = readCourses('abt', [{ id: 'alan', ad: 'Alan Bilgisi (ÖABT)', soru }]);
    }
  }
  const nGY = sumNet(gy), nGK = sumNet(gk), nEB = sumNet(out.eb);
  for (const t of P.puanTurleri.filter((x) => x.seviye.includes(level))) out.puanlar.push({ id: t.id, ad: t.ad, puan: score(t, nGY, nGK, 0) });
  if (teach) out.puanlar.push({ id: P.ogretmenlik.id, ad: P.ogretmenlik.ad, puan: score(P.ogretmenlik, nGY, nGK, nEB) });

  const rawH = $('hedef').value.trim().replace(',', '.');
  if (rawH !== '') {
    const h = Number(rawH);
    if (!Number.isFinite(h) || h < 0 || h > 100) throw new Error('Hedef puan 0 ile 100 arasında olmalı (örn. 72,5). Kadro ilanındaki taban puanı kontrol edin.');
    out.hedef = h;
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
  fillTable($('tbl-net'), [...r.gy, ...r.gk, ...r.eb, ...r.abt]);
  $('r-gy-net').textContent = nf.format(sumNet(r.gy));
  $('r-gk-net').textContent = nf.format(sumNet(r.gk));
  $('row-eb').hidden = r.eb.length === 0;
  $('r-eb-net').textContent = nf.format(sumNet(r.eb));
  $('row-abt').hidden = r.abt.length === 0;
  $('r-abt-net').textContent = nf.format(sumNet(r.abt));
  const box = $('r-puanlar'); box.textContent = '';
  for (const p of r.puanlar) {
    const row = document.createElement('div'); row.className = 'kdv-row is-strong';
    const dt = document.createElement('dt'); dt.textContent = p.ad;
    const dd = document.createElement('dd'); dd.id = `r-p-${p.id}`; dd.textContent = nf.format(p.puan);
    row.append(dt, dd); box.append(row);
  }
  const notes = [];
  if (r.hedef !== null) {
    for (const p of r.puanlar) {
      const diff = p.puan - r.hedef;
      notes.push(`${p.ad.split(' (')[0]}: hedefe göre yaklaşık ${nf.format(Math.abs(diff))} puan ${diff >= 0 ? 'üstünde' : 'altında'}.`);
    }
  }
  notes.push(P.not);
  $('r-notes').textContent = notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  const lines = [`KPSS puan tahmini — ${r.levelName} (yaklaşık; resmî sonuç değildir)`];
  for (const x of [...r.gy, ...r.gk, ...r.eb, ...r.abt]) lines.push(`${x.ad}: ${x.d} D, ${x.y} Y, net ${nf.format(x.net)}`);
  lines.push(`Genel Yetenek net: ${nf.format(sumNet(r.gy))}; Genel Kültür net: ${nf.format(sumNet(r.gk))}`);
  for (const p of r.puanlar) lines.push(`${p.ad} ≈ ${nf.format(p.puan)}`);
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

/** Seviye ve öğretmenlik kutusuna göre alanları göster/gizle. */
function syncVisibility() {
  const lisans = $('seviye').value === 'lisans';
  $('ogretmen-wrap').hidden = !lisans;
  if (!lisans) $('ogretmen').checked = false;
  $('ogr-set').hidden = !$('ogretmen').checked;
}

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    P = await res.json();
  } catch {
    showError($('error'), 'Puan parametreleri yüklenemedi. Sayfayı yenileyin; sorun sürerse internet bağlantınızı kontrol edip tekrar deneyin.');
    return;
  }
  buildRows($('gy-rows'), 'gy', P.gy.dersler);
  buildRows($('gk-rows'), 'gk', P.gk.dersler);
  buildRows($('eb-rows'), 'eb', P.egitim.dersler);
  $('params-date').textContent = new Date(P.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('seviye').addEventListener('change', () => { syncVisibility(); resetResult(); });
  $('ogretmen').addEventListener('change', syncVisibility);
  syncVisibility();
  document.documentElement.dataset.ready = '1';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); if (P) run(); });
$('clear').addEventListener('click', () => { $('form').reset(); syncVisibility(); resetResult(); showError($('error'), ''); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
init();
