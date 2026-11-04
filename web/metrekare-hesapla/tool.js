// Metrekare Hesaplama — tamamı tarayıcıda çalışır; ölçüler sunucuya gitmez.
// Dikdörtgen, L, üçgen, daire, düzensiz çokgen (koordinat) alanı; fayans/parke/boya ihtiyacı; birim dönüşümü.
import { showError } from '../assets/js/ba.js';
import { DEFAULTS, computeArea, convertArea, computeMaterial, num } from './hesap.js';

const $ = (id) => document.getElementById(id);
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nf4 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 4 });
const m2f = (n) => `${nf2.format(n)} m²`;

let params = DEFAULTS;
const parts = []; // {label, area}
let last = null;

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url), { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar */ }
  const [y, m, d] = params.guncelleme.split('-');
  $('params-info').textContent = `Dönüşüm katsayıları ${d}.${m}.${y} tarihinde gözden geçirildi. ${params.kaynak}`;
}

const GROUPS = ['dik', 'l', 'ucgen', 'ucgen3', 'daire', 'cokgen', 'dogrudan'];

function syncShape() {
  const s = $('f-shape').value;
  for (const g of GROUPS) $(`g-${g}`).hidden = g !== s;
  $('g-unit').hidden = s === 'dogrudan';
  const kind = $('f-kind').value;
  $('g-mat').hidden = kind === 'yok';
  $('g-mat2').hidden = kind === 'yok';
  $('g-boya').hidden = kind !== 'boya';
  $('l-pack').textContent = kind === 'boya' ? 'Boya kovası (litre, isteğe bağlı)' : 'Kutu/paket başına m² (isteğe bağlı)';
  $('l-price').textContent = kind === 'boya' ? 'Litre fiyatı (TL, isteğe bağlı)' : 'm² birim fiyatı (TL, isteğe bağlı)';
}

function readShape() {
  const s = $('f-shape').value;
  const g = (id) => $(id).value;
  const unit = $('f-unit').value;
  const v = {
    dik: { a: g('f-a'), b: g('f-b') },
    l: { a1: g('f-a1'), b1: g('f-b1'), a2: g('f-a2'), b2: g('f-b2') },
    ucgen: { t: g('f-t'), h: g('f-h') },
    ucgen3: { a: g('f-s1'), b: g('f-s2'), c: g('f-s3') },
    daire: { d: g('f-d') },
    cokgen: { pts: g('f-pts') },
    dogrudan: { val: g('f-val'), unit: g('f-aunit') },
  }[s];
  return computeArea(s, v, unit, params);
}

function optNum(id, ad) {
  const t = $(id).value.trim();
  if (!t) return null;
  const n = num(t);
  if (!(n >= 0)) throw new Error(`${ad} geçersiz. Sıfır ya da daha büyük bir sayıyı rakamla yazın veya boş bırakın.`);
  return n;
}

function renderParts() {
  const ul = $('parts');
  ul.innerHTML = '';
  parts.forEach((p, i) => {
    const li = document.createElement('li');
    li.className = 'mk-part';
    const span = document.createElement('span');
    span.textContent = `${i + 1}. ${p.label}: ${m2f(p.area)}`;
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'ba-btn mk-del';
    btn.textContent = 'Kaldır';
    btn.setAttribute('aria-label', `${i + 1}. parçayı kaldır`);
    btn.addEventListener('click', () => { parts.splice(i, 1); renderParts(); run(); });
    li.append(span, btn);
    ul.append(li);
  });
  $('parts-wrap').hidden = parts.length === 0;
}

function run() {
  showError($('error'), '');
  $('copy-status').textContent = '';
  try {
    let cur = null;
    try { cur = readShape(); } catch (e) { if (!parts.length) throw e; }
    const total = parts.length ? parts.reduce((s, p) => s + p.area, 0) : cur.area;
    const conv = convertArea(total, params);
    $('r-head').textContent = `Toplam alan: ${m2f(total)}`;
    $('r-used').textContent = parts.length ? `Listedeki ${parts.length} parçanın toplamı` : cur.label;
    $('r-area').textContent = m2f(total);
    $('r-cur').textContent = cur ? `${cur.label}: ${m2f(cur.area)}` : '—';
    $('r-per').textContent = cur && cur.perimeter !== null ? `${nf2.format(cur.perimeter)} m` : '—';
    $('r-donum').textContent = `${nf4.format(conv.donum)} dönüm`;
    $('r-hektar').textContent = `${nf4.format(conv.hektar)} hektar`;
    $('r-ar').textContent = `${nf4.format(conv.ar)} ar`;
    $('r-ft2').textContent = `${nf2.format(conv.ft2)} ft²`;

    const kind = $('f-kind').value;
    $('mat-box').hidden = kind === 'yok';
    let matText = '';
    if (kind !== 'yok') {
      const fire = $('f-fire').value.trim() === '' ? params.fireVarsayilan : num($('f-fire').value);
      const mat = computeMaterial({
        kind, area: total, firePct: Number.isNaN(fire) ? -1 : fire,
        packM2: (() => { const p = optNum('f-pack', kind === 'boya' ? 'Kova litresi' : 'Kutu m²'); return p ? p : null; })(),
        price: optNum('f-price', 'Birim fiyat'),
        coats: $('f-coats').value.trim() === '' ? 2 : num($('f-coats').value),
        coverage: $('f-cov').value.trim() === '' ? params.boyaVerim : num($('f-cov').value),
      });
      $('r-need').textContent = `${nf2.format(mat.needed)} ${mat.unit}`;
      $('r-packs').textContent = mat.packs ? `${mat.packs} ${mat.packLabel} (toplam ${nf2.format(mat.buy)} ${mat.unit})` : 'Paket boyutu girilmedi';
      $('r-cost').textContent = mat.cost !== null ? `${nf2.format(mat.cost)} TL` : 'Fiyat girilmedi';
      matText = ` İhtiyaç: ${nf2.format(mat.needed)} ${mat.unit}${mat.packs ? `, ${mat.packs} ${mat.packLabel}` : ''}${mat.cost !== null ? `, maliyet ${nf2.format(mat.cost)} TL` : ''}.`;
    }
    $('result').hidden = false;
    $('result').classList.add('is-active');
    last = `Alan: ${m2f(total)} (${nf4.format(conv.donum)} dönüm, ${nf4.format(conv.hektar)} hektar).${matText}`;
  } catch (err) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), err.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('add').addEventListener('click', () => {
  showError($('error'), '');
  try {
    const cur = readShape();
    parts.push({ label: cur.label, area: cur.area });
    renderParts();
    run();
  } catch (err) { showError($('error'), err.message); }
});
$('clear').addEventListener('click', () => {
  $('form').reset();
  parts.length = 0; renderParts(); syncShape();
  $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), ''); $('copy-status').textContent = ''; last = null; $('f-shape').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  try { await navigator.clipboard.writeText(last); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('f-shape').addEventListener('change', syncShape);
$('f-kind').addEventListener('change', syncShape);
syncShape();
renderParts();
loadParams();
