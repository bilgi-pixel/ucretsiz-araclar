// Net Hesaplama: net = doğru − yanlış ÷ katsayı. Her şey tarayıcıda; yalnızca localStorage (bu cihaz) kullanılır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const KEY_HISTORY = 'ba-net-gecmis';
const KEY_DRAFT = 'ba-net-taslak';

// Sınav tanımları: k = kaç yanlış bir doğruyu götürür.
const EXAMS = {
  tyt: { ad: 'TYT', k: 4, dersler: [['Türkçe', 40], ['Sosyal Bilimler', 20], ['Temel Matematik', 40], ['Fen Bilimleri', 20]] },
  'ayt-say': { ad: 'AYT Sayısal', k: 4, dersler: [['Matematik', 40], ['Fizik', 14], ['Kimya', 13], ['Biyoloji', 13]] },
  'ayt-ea': { ad: 'AYT Eşit Ağırlık', k: 4, dersler: [['Matematik', 40], ['Türk Dili ve Edebiyatı', 24], ['Tarih-1', 10], ['Coğrafya-1', 6]] },
  'ayt-soz': { ad: 'AYT Sözel', k: 4, dersler: [['Türk Dili ve Edebiyatı', 24], ['Tarih-1', 10], ['Coğrafya-1', 6], ['Tarih-2', 11], ['Coğrafya-2', 11], ['Felsefe Grubu', 12], ['Din Kültürü', 6]] },
  lgs: { ad: 'LGS', k: 3, dersler: [['Türkçe', 20], ['Matematik', 20], ['Fen Bilimleri', 20], ['T.C. İnkılap Tarihi', 10], ['Din Kültürü', 10], ['Yabancı Dil', 10]] },
  kpss: { ad: 'KPSS Lisans', k: 4, dersler: [['Türkçe', 30], ['Matematik', 30], ['Tarih', 27], ['Coğrafya', 18], ['Vatandaşlık', 9], ['Güncel Bilgiler', 6]] },
  ales: { ad: 'ALES', k: 4, dersler: [['Sayısal', 50], ['Sözel', 50]] },
  dgs: { ad: 'DGS', k: 4, dersler: [['Sayısal', 50], ['Sözel', 50]] },
  ozel: { ad: 'Özel sınav', k: 4, dersler: [['Ders 1', ''], ['Ders 2', '']] },
};

const fmt = (n, d = 2) => (Math.round(n * 10 ** d) / 10 ** d).toLocaleString('tr-TR', { maximumFractionDigits: d });
let last = null;

function rowHtml(i, ad = '', soru = '', d = '', y = '') {
  const li = document.createElement('div');
  li.className = 'net-row';
  li.innerHTML = `
    <div class="ders-in net-ad"><label for="row-${i}-ad">Ders adı</label><input id="row-${i}-ad" class="r-ad" type="text" maxlength="40" autocomplete="off"></div>
    <div class="ders-in"><label for="row-${i}-n">Soru</label><input id="row-${i}-n" class="r-n" type="text" inputmode="numeric" autocomplete="off"></div>
    <div class="ders-in"><label for="row-${i}-d">Doğru</label><input id="row-${i}-d" class="r-d" type="text" inputmode="numeric" autocomplete="off"></div>
    <div class="ders-in"><label for="row-${i}-y">Yanlış</label><input id="row-${i}-y" class="r-y" type="text" inputmode="numeric" autocomplete="off"></div>
    <button type="button" class="ba-btn net-del" aria-label="Dersi sil">Sil</button>`;
  li.querySelector('.r-ad').value = ad;
  li.querySelector('.r-n').value = soru;
  li.querySelector('.r-d').value = d;
  li.querySelector('.r-y').value = y;
  li.querySelector('.net-del').addEventListener('click', () => { li.remove(); saveDraft(); });
  return li;
}

let rowSeq = 0;
function addRow(ad, soru, d, y) { $('rows').append(rowHtml(rowSeq++, ad, soru, d, y)); }

function loadExam(key) {
  const ex = EXAMS[key];
  $('rows').textContent = '';
  rowSeq = 0;
  for (const [ad, n] of ex.dersler) addRow(ad, String(n), '', '');
  $('k').value = String(ex.k);
  $('k-note').textContent = key === 'ozel'
    ? 'Özel sınavda katsayıyı kendiniz seçin (kaç yanlış bir doğruyu götürür).'
    : `${ex.ad} için ${ex.k} yanlış 1 doğruyu götürür; katsayı otomatik seçildi, isterseniz değiştirebilirsiniz.`;
  $('k-note').hidden = false;
}

// Boş alan 0 sayılır; negatif/ondalık/harf hata verir.
function parseCount(v, label) {
  const s = String(v).trim();
  if (s === '') return 0;
  if (!/^\d+$/.test(s)) throw new Error(`${label} için yalnızca 0 ve üzeri tam sayı yazın (örn. 12). Virgül, eksi işareti veya harf kullanmayın.`);
  return Number(s);
}

function compute() {
  const k = Number($('k').value);
  if (!(k >= 1)) throw new Error('Yanlış katsayısı 1 veya daha büyük olmalı (örn. 4). Sınav türünü yeniden seçerek otomatik değere dönebilirsiniz.');
  const rows = [...document.querySelectorAll('#rows .net-row')];
  if (!rows.length) throw new Error('Hesaplanacak ders yok. "Ders ekle" düğmesiyle en az bir ders ekleyin.');
  const out = [];
  let anyData = false;
  rows.forEach((r, idx) => {
    const ad = r.querySelector('.r-ad').value.trim() || `Ders ${idx + 1}`;
    const n = parseCount(r.querySelector('.r-n').value, `"${ad}" soru sayısı`);
    const d = parseCount(r.querySelector('.r-d').value, `"${ad}" doğru sayısı`);
    const y = parseCount(r.querySelector('.r-y').value, `"${ad}" yanlış sayısı`);
    if (n > 0 && d + y > n) throw new Error(`"${ad}" için doğru + yanlış (${d + y}) soru sayısını (${n}) aşamaz. Sayıları kontrol edin.`);
    if (d + y > 0) anyData = true;
    const net = d - y / k;
    out.push({ ad, n, d, y, bos: n > 0 ? n - d - y : null, net, acc: d + y > 0 ? (d / (d + y)) * 100 : null });
  });
  if (!anyData) throw new Error('Doğru ve yanlış sayılarını girin. Boş bıraktığınız alanlar 0 sayılır; en az bir dersin doğru veya yanlış sayısı olmalı.');
  const tot = out.reduce((a, r) => ({ n: a.n + r.n, d: a.d + r.d, y: a.y + r.y, net: a.net + r.net }), { n: 0, d: 0, y: 0, net: 0 });
  const hedefTxt = $('hedef').value.trim().replace(',', '.');
  let hedef = null;
  if (hedefTxt !== '') {
    hedef = Number(hedefTxt);
    if (!Number.isFinite(hedef) || hedef < 0) throw new Error('Hedef net 0 veya daha büyük bir sayı olmalı (örn. 85,5). Kutuyu boş bırakarak hedefi kapatabilirsiniz.');
  }
  return {
    exam: $('exam').value, examAd: EXAMS[$('exam').value].ad, k, rows: out, tot,
    pct: tot.d + tot.y > 0 ? (tot.d / (tot.d + tot.y)) * 100 : null,
    basari: tot.n > 0 ? (tot.net / tot.n) * 100 : null, hedef,
  };
}

function render(r) {
  $('r-net').textContent = fmt(r.tot.net);
  $('r-dy').textContent = `${r.tot.d} doğru · ${r.tot.y} yanlış${r.tot.n > 0 ? ` · ${r.tot.n - r.tot.d - r.tot.y} boş` : ''}`;
  $('r-acc').textContent = r.pct == null ? '–' : `%${fmt(r.pct, 1)}`;
  $('r-basari').textContent = r.basari == null ? '–' : `%${fmt(r.basari, 1)}`;
  const rowH = $('row-hedef');
  if (r.hedef != null) {
    const fark = r.hedef - r.tot.net;
    $('r-hedef').textContent = fark > 0 ? `Hedefe ${fmt(fark)} net kaldı` : `Hedefi ${fmt(-fark)} net aştınız`;
    rowH.hidden = false;
  } else rowH.hidden = true;
  const tb = $('tbl'); tb.textContent = '';
  for (const x of r.rows) {
    const tr = document.createElement('tr');
    [x.ad, x.n || '–', x.d, x.y, x.bos == null ? '–' : x.bos, fmt(x.net), x.acc == null ? '–' : `%${fmt(x.acc, 0)}`].forEach((v) => { const td = document.createElement('td'); td.textContent = v; tr.append(td); });
    tb.append(tr);
  }
  const res = $('result'); res.hidden = false; res.classList.add('is-active');
  res.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function summaryText(r) {
  const lines = [`${r.examAd} net hesabı (${r.k} yanlış 1 doğruyu götürür)`];
  for (const x of r.rows) lines.push(`${x.ad}: ${x.d} D / ${x.y} Y → ${fmt(x.net)} net`);
  lines.push(`Toplam net: ${fmt(r.tot.net)}`);
  if (r.pct != null) lines.push(`Doğruluk: %${fmt(r.pct, 1)}`);
  if (r.hedef != null) lines.push(`Hedef net: ${fmt(r.hedef)}`);
  lines.push('Bilişim Ajans – araclar.bilisimajans.com/net-hesaplama/');
  return lines.join('\n');
}

// ---- Taslak ve geçmiş (yalnızca bu tarayıcıda) ----
function readLS(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
}
function writeLS(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch { return false; } }

function saveDraft() {
  const rows = [...document.querySelectorAll('#rows .net-row')].map((r) => [r.querySelector('.r-ad').value, r.querySelector('.r-n').value, r.querySelector('.r-d').value, r.querySelector('.r-y').value]);
  writeLS(KEY_DRAFT, { exam: $('exam').value, k: $('k').value, hedef: $('hedef').value, rows });
}

function restoreDraft() {
  const d = readLS(KEY_DRAFT, null);
  if (!d || !EXAMS[d.exam] || !Array.isArray(d.rows)) return false;
  $('exam').value = d.exam;
  loadExam(d.exam);
  $('rows').textContent = ''; rowSeq = 0;
  for (const r of d.rows.slice(0, 30)) addRow(String(r[0] ?? ''), String(r[1] ?? ''), String(r[2] ?? ''), String(r[3] ?? ''));
  if (d.k) $('k').value = String(d.k);
  $('hedef').value = d.hedef || '';
  return true;
}

function renderHistory() {
  const hist = readLS(KEY_HISTORY, []);
  const list = $('hist-list'); list.textContent = '';
  $('hist-empty').hidden = hist.length > 0;
  $('hist-wrap').hidden = hist.length === 0;
  hist.forEach((h, i) => {
    const li = document.createElement('li');
    li.className = 'hist-item';
    const t = document.createElement('span');
    t.textContent = `${h.ad ? h.ad + ' · ' : ''}${h.exam} · ${h.date} · ${fmt(h.net)} net${h.pct != null ? ` · %${fmt(h.pct, 0)} doğruluk` : ''}`;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ba-btn'; b.textContent = 'Sil'; b.setAttribute('aria-label', `${i + 1}. denemeyi sil`);
    b.addEventListener('click', () => { const hh = readLS(KEY_HISTORY, []); hh.splice(i, 1); writeLS(KEY_HISTORY, hh); renderHistory(); });
    li.append(t, b); list.append(li);
  });
  drawChart(hist);
}

function drawChart(hist) {
  const cv = $('chart');
  const ctx = cv.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth || 320, h = 200;
  cv.width = w * dpr; cv.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  if (!hist.length) return;
  const pad = { l: 38, r: 12, t: 14, b: 24 };
  const max = Math.max(1, ...hist.map((x) => x.net));
  const min = Math.min(0, ...hist.map((x) => x.net));
  const X = (i) => pad.l + (hist.length === 1 ? (w - pad.l - pad.r) / 2 : (i * (w - pad.l - pad.r)) / (hist.length - 1));
  const Y = (v) => pad.t + (1 - (v - min) / (max - min || 1)) * (h - pad.t - pad.b);
  ctx.strokeStyle = '#d9d9d9'; ctx.fillStyle = '#555'; ctx.font = '11px sans-serif'; ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const v = min + ((max - min) * g) / 4, y = Y(v);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
    ctx.fillText(fmt(v, 0), 4, y + 4);
  }
  ctx.strokeStyle = '#7b2331'; ctx.lineWidth = 2; ctx.beginPath();
  hist.forEach((p, i) => (i ? ctx.lineTo(X(i), Y(p.net)) : ctx.moveTo(X(i), Y(p.net))));
  ctx.stroke();
  ctx.fillStyle = '#7b2331';
  hist.forEach((p, i) => { ctx.beginPath(); ctx.arc(X(i), Y(p.net), 4, 0, Math.PI * 2); ctx.fill(); });
  ctx.fillStyle = '#555';
  ctx.fillText('Deneme sırası →', w - 100, h - 6);
}

function run() {
  showError($('error'), '');
  try { last = compute(); render(last); saveDraft(); }
  catch (e) {
    last = null; $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('exam').addEventListener('change', () => { loadExam($('exam').value); $('result').hidden = true; last = null; saveDraft(); });
$('add-row').addEventListener('click', () => { addRow('', '', '', ''); saveDraft(); });
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('form').addEventListener('input', saveDraft);
$('clear').addEventListener('click', () => {
  loadExam($('exam').value); $('hedef').value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); saveDraft();
});
$('save-hist').addEventListener('click', () => {
  if (!last) { showError($('error'), 'Önce "Neti hesapla" düğmesine basın; kaydedilecek sonuç yok.'); return; }
  const hist = readLS(KEY_HISTORY, []);
  hist.push({ ad: $('deneme-ad').value.trim().slice(0, 30), exam: last.examAd, date: new Date().toLocaleDateString('tr-TR'), net: last.tot.net, pct: last.pct });
  if (!writeLS(KEY_HISTORY, hist.slice(-50))) { showError($('error'), 'Tarayıcı geçmişi kaydetmeye izin vermiyor (gizli sekme olabilir). Sonucu "Kopyala" ile saklayın.'); return; }
  $('deneme-ad').value = '';
  $('copy-status').textContent = 'Deneme bu cihazdaki geçmişe kaydedildi.';
  renderHistory();
});
$('clear-hist').addEventListener('click', () => { writeLS(KEY_HISTORY, []); renderHistory(); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
window.addEventListener('resize', () => drawChart(readLS(KEY_HISTORY, [])));

for (const [k, v] of Object.entries(EXAMS)) { const o = document.createElement('option'); o.value = k; o.textContent = v.ad; $('exam').append(o); }
if (!restoreDraft()) { $('exam').value = 'tyt'; loadExam('tyt'); }
renderHistory();
document.documentElement.dataset.ready = '1';
