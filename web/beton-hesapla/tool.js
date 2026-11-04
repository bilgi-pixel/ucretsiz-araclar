// Beton Hesaplama — tamamı tarayıcıda çalışır; ölçüleriniz hiçbir sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = (min, max) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: min, maximumFractionDigits: max });
const nf3 = fmt(3, 3);
const nf2 = fmt(2, 2);
const nf0 = fmt(0, 0);
const nfx = fmt(0, 3);
const m3 = (v) => nf3.format(v) + ' m³';
const round = (v, d) => Math.round(v * 10 ** d) / 10 ** d;

/**
 * Türkçe sayı okuma: "12,5", "0.15", "1.250,75" kabul edilir.
 * Ölçülerde tek nokta ondalık sayılır (0.15); money=true iken "1.500" binlik ayırıcı kabul edilir.
 * Geçersizse NaN döner.
 */
export function parseNum(s, money = false) {
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/₺|TL|tl/g, '');
  let neg = false;
  if (t.startsWith('-')) { neg = true; t = t.slice(1); }
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  const hasC = t.includes(',');
  const hasD = t.includes('.');
  if (hasC && hasD) {
    if (!/^\d{1,3}(\.\d{3})*,\d*$/.test(t)) return NaN;
    t = t.replace(/\./g, '').replace(',', '.');
  } else if (hasC) {
    if (!/^\d*,\d*$/.test(t) || t === ',') return NaN;
    t = t.replace(',', '.');
  } else if (hasD) {
    const dots = t.split('.').length - 1;
    const thousands = /^\d{1,3}(\.\d{3})+$/.test(t);
    if (dots > 1 || (money && thousands)) {
      if (!thousands) return NaN;
      t = t.replace(/\./g, '');
    } else if (!/^\d*\.\d*$/.test(t) || t === '.') return NaN;
  }
  const n = Number(t);
  if (Number.isNaN(n)) return NaN;
  return neg && n !== 0 ? -n : n; // "-0" girişi eksi sıfır olarak taşınmasın
}

/* Varsayılan parametreler; parametreler.json yüklenince üzerine yazılır (çevrimdışıda bunlar kullanılır). */
let P = {
  guncelleme: '2026-11-04',
  kaynak: 'TS 802 mutlak hacim yöntemine göre hesaplanmış tipik değerler (yaklaşık)',
  yaklasik: true,
  torba_kg: 50,
  kum_gevsek_yogunluk: 1600,
  cakil_gevsek_yogunluk: 1550,
  fire_varsayilan: 5,
  fire_min: 0,
  fire_max: 30,
  mikser_varsayilan: 8,
  mikser_max: 30,
  siniflar: {
    C16: { ad: 'C16/20', cimento: 270, su: 185, kum: 850, cakil: 1040, tasiyici: false },
    C20: { ad: 'C20/25', cimento: 300, su: 185, kum: 820, cakil: 1045, tasiyici: false },
    C25: { ad: 'C25/30', cimento: 340, su: 185, kum: 790, cakil: 1040, tasiyici: true },
    C30: { ad: 'C30/37', cimento: 380, su: 185, kum: 755, cakil: 1040, tasiyici: true },
  },
};

/*
 * Eleman türleri. Alan tanımı: [id, ad, tür, m cinsinden makul üst sınır, m örneği, cm örneği]
 * tür: 'len' uzunluk, 'thin' ince ölçü (kalınlık/rıht; cm'de çok küçükse uyarılır), 'count' tam sayı adet.
 */
const MODES = {
  doseme: {
    label: 'Döşeme / plak',
    fields: [
      ['f-slab-w', 'En', 'len', 300, '5', '500'],
      ['f-slab-l', 'Boy', 'len', 300, '4', '400'],
      ['f-slab-t', 'Kalınlık', 'thin', 1.5, '0,15', '15'],
    ],
    vol: ([w, l, t]) => w * l * t,
    desc: (r, u) => `${r[0]} × ${r[1]} × ${r[2]} ${u}`,
  },
  kolon: {
    label: 'Dikdörtgen kolon',
    fields: [
      ['f-col-a', 'Kesit eni', 'len', 3, '0,3', '30'],
      ['f-col-b', 'Kesit boyu', 'len', 3, '0,5', '50'],
      ['f-col-h', 'Kolon yüksekliği', 'len', 30, '3', '300'],
      ['f-col-n', 'Kolon adedi', 'count', 0, '4', '4'],
    ],
    vol: ([a, b, h, n]) => a * b * h * n,
    desc: (r, u) => `${r[0]} × ${r[1]} × ${r[2]} ${u} × ${r[3]} adet`,
  },
  silindir: {
    label: 'Silindir kolon',
    fields: [
      ['f-cyl-d', 'Kolon çapı', 'len', 3, '0,4', '40'],
      ['f-cyl-h', 'Kolon yüksekliği', 'len', 30, '3', '300'],
      ['f-cyl-n', 'Kolon adedi', 'count', 0, '1', '1'],
    ],
    vol: ([d, h, n]) => Math.PI * (d / 2) ** 2 * h * n,
    desc: (r, u) => `çap ${r[0]} ${u}, yükseklik ${r[1]} ${u} × ${r[2]} adet`,
  },
  temel: {
    label: 'Şerit temel / hatıl',
    fields: [
      ['f-str-l', 'Toplam uzunluk', 'len', 1000, '24', '2400'],
      ['f-str-w', 'Genişlik', 'len', 5, '0,6', '60'],
      ['f-str-d', 'Derinlik (yükseklik)', 'len', 5, '0,5', '50'],
    ],
    vol: ([l, w, d]) => l * w * d,
    desc: (r, u) => `${r[0]} × ${r[1]} × ${r[2]} ${u}`,
  },
  merdiven: {
    label: 'Merdiven',
    fields: [
      ['f-st-n', 'Basamak sayısı', 'count', 0, '10', '10'],
      ['f-st-r', 'Rıht yüksekliği', 'thin', 0.5, '0,17', '17'],
      ['f-st-t', 'Basamak genişliği', 'len', 1, '0,28', '28'],
      ['f-st-w', 'Merdiven eni', 'len', 10, '1,2', '120'],
      ['f-st-k', 'Plak kalınlığı', 'thin', 1, '0,15', '15'],
    ],
    // Basamak üçgenleri + eğik taşıyıcı plak: en × (n·r·t/2 + n·√(r²+t²)·k)
    vol: ([n, r, t, w, k]) => w * (n * r * t / 2 + n * Math.hypot(r, t) * k),
    desc: (r, u) => `${r[0]} basamak, rıht ${r[1]} ${u}, basamak ${r[2]} ${u}, en ${r[3]} ${u}, plak ${r[4]} ${u}`,
  },
};

/** Saf hesap: verilen eleman türü ve metre cinsinden ölçülerle hacim (m³). */
export function elementVolume(mode, valuesInMeters) {
  return MODES[mode].vol(valuesInMeters);
}

/** Saf hesap: net hacim, fire, sınıf, mikser ve fiyattan tüm sonuçları üretir. */
export function calcConcrete({ net, firePct, cls, mixerCap, price }, P0 = P) {
  const total = net * (1 + firePct / 100);
  const mix = P0.siniflar[cls];
  const cement = total * mix.cimento;
  const sandKg = total * mix.kum;
  const gravelKg = total * mix.cakil;
  // Kayan nokta hatası (ör. 16,0000001) yüzünden fazladan mikser/torba çıkmasın.
  // Pozitif her miktar en az 1 torba / 1 mikser ister (aksi hâlde çok küçük hacimde "-0 mikser" çıkıyordu).
  const ceilSafe = (x) => (x > 0 ? Math.max(1, Math.ceil(round(x, 6) - 1e-9)) : 0);
  return {
    net,
    fire: total - net,
    total,
    mix,
    cement,
    bags: ceilSafe(cement / P0.torba_kg),
    bagsPerM3: mix.cimento / P0.torba_kg,
    sandKg,
    sandM3: sandKg / P0.kum_gevsek_yogunluk,
    gravelKg,
    gravelM3: gravelKg / P0.cakil_gevsek_yogunluk,
    water: total * mix.su,
    // Gösterilen (3 basamaklı) hacimle tutarlı olsun: 8,000 m³ → 1 mikser; pozitif hacim en az 1 mikser.
    mixers: total > 0 ? Math.max(1, ceilSafe(round(total, 3) / mixerCap)) : 0,
    cost: price == null ? null : total * price,
  };
}

/** Hata nesnesi; hangi alana odaklanılacağını da taşır. */
function inputError(msg, id) { const e = new Error(msg); e.fieldId = id; return e; }

/** Seçili eleman türünün alanlarını okur, doğrular ve hacmi döndürür. */
function readElement() {
  const mode = $('f-mode').value;
  const M = MODES[mode];
  const unit = $('f-unit').value === 'cm' ? 'cm' : 'm';
  const unitName = unit === 'cm' ? 'santimetre' : 'metre';
  const k = unit === 'cm' ? 0.01 : 1;
  const vals = [];
  const shown = [];
  const warns = [];
  for (const [id, name, kind, max, exM, exCm] of M.fields) {
    const raw = $(id).value;
    const ex = kind === 'count' ? exM : (unit === 'cm' ? exCm : exM);
    if (String(raw).trim() === '') {
      throw inputError(kind === 'count'
        ? `${name} boş. Tam sayı olarak yazın (ör. ${ex}).`
        : `${name} boş. Ölçüyü ${unitName} cinsinden yazın (ör. ${ex}).`, id);
    }
    const v = parseNum(raw);
    if (Number.isNaN(v)) throw inputError(`${name} okunamadı. Yalnızca rakam ve ondalık için virgül kullanın (ör. ${ex}).`, id);
    if (v <= 0) throw inputError(`${name} sıfırdan büyük olmalı. Negatif veya sıfır ölçü olamaz; değeri kontrol edin (ör. ${ex}).`, id);
    if (kind === 'count') {
      if (!Number.isInteger(v)) throw inputError(`${name} tam sayı olmalı (ör. ${ex}). Kesirli adet giremezsiniz.`, id);
      vals.push(v);
      shown.push(nf0.format(v));
      continue;
    }
    const meters = v * k;
    if (unit === 'm' && meters > max) {
      warns.push(`${name} ${nfx.format(v)} m görünüyor; bu çok büyük, cm mi yazdınız? Ölçüleri santimetre girdiyseniz birimi "Santimetre (cm)" yapın ya da metre cinsinden yazın (ör. ${exM}).`);
    }
    if (unit === 'cm' && ((kind === 'thin' && v < 1) || (kind === 'len' && v < 10))) {
      warns.push(`${name} ${nfx.format(v)} cm görünüyor; bu çok küçük, metre mi yazdınız? Birimi "Metre (m)" yapın ya da santimetre cinsinden yazın (ör. ${exCm}).`);
    }
    vals.push(meters);
    shown.push(nfx.format(v));
  }
  const vol = M.vol(vals);
  if (!Number.isFinite(vol)) throw inputError('Sonuç hesaplanamayacak kadar büyük. Ölçüleri ve seçili birimi kontrol edin.', M.fields[0][0]);
  if (vol < 0.001) warns.push('Hesaplanan hacim 1 litreden (0,001 m³) az; ölçüleri ve seçili birimi kontrol edin.');
  return { mode, vol, label: `${M.label}: ${M.desc(shown, unit)}`, warns };
}

/** Fire, sınıf, mikser kapasitesi ve fiyatı okur. */
function readSettings() {
  const fireRaw = $('f-fire').value.trim();
  const firePct = fireRaw === '' ? P.fire_varsayilan : parseNum(fireRaw);
  if (Number.isNaN(firePct)) throw inputError('Fire oranı okunamadı. Yüzde değerini rakamla yazın (ör. 5).', 'f-fire');
  if (firePct < P.fire_min || firePct > P.fire_max) {
    throw inputError(`Fire oranı %${P.fire_min} ile %${P.fire_max} arasında olmalı. Hazır betonda genellikle %3–5, elle karılan betonda %5–10 yeterlidir.`, 'f-fire');
  }
  const capRaw = $('f-mixer').value.trim();
  const mixerCap = capRaw === '' ? P.mikser_varsayilan : parseNum(capRaw);
  if (Number.isNaN(mixerCap) || mixerCap <= 0) throw inputError('Mikser kapasitesi sıfırdan büyük bir sayı olmalı (ör. 8 veya 10 m³). Boş bırakırsanız 8 m³ kullanılır.', 'f-mixer');
  if (mixerCap > P.mikser_max) throw inputError(`Mikser kapasitesi en fazla ${P.mikser_max} m³ olabilir; transmikserler genellikle 8–12 m³ taşır.`, 'f-mixer');
  const priceRaw = $('f-price').value.trim();
  let price = null;
  if (priceRaw !== '') {
    price = parseNum(priceRaw, true);
    if (Number.isNaN(price)) throw inputError('Birim fiyat okunamadı. Tutarı rakamla yazın (ör. 2.750 veya 2750,50) ya da alanı boş bırakın.', 'f-price');
    if (price < 0) throw inputError('Birim fiyat negatif olamaz. m³ başına TL tutarını yazın ya da alanı boş bırakın.', 'f-price');
  }
  const cls = P.siniflar[$('f-class').value] ? $('f-class').value : 'C25';
  return { firePct, mixerCap, price, cls };
}

/* ---- Eleman listesi ---- */
const items = [];
let lastText = null;

function renderItems() {
  const ul = $('items');
  ul.textContent = '';
  items.forEach((it, i) => {
    const li = document.createElement('li');
    li.className = 'bt-item';
    const span = document.createElement('span');
    span.textContent = `${i + 1}. ${it.label} = ${m3(it.vol)}`;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ba-btn bt-del';
    btn.textContent = 'Sil';
    btn.setAttribute('aria-label', `${i + 1}. elemanı listeden sil`);
    btn.addEventListener('click', () => {
      items.splice(i, 1);
      renderItems();
      $('add-status').textContent = 'Eleman listeden silindi.';
      if (items.length) run(); else hideResult();
      const next = $('items').querySelectorAll('.bt-del')[Math.min(i, items.length - 1)];
      if (next) next.focus(); else $('add').focus();
    });
    li.append(span, btn);
    ul.append(li);
  });
  $('list-total').textContent = m3(items.reduce((s, it) => s + it.vol, 0));
  $('list-wrap').hidden = items.length === 0;
}

/* ---- Görünüm yardımcıları ---- */
function showResult() { $('result').hidden = false; $('result').classList.add('is-active'); }
function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); lastText = null; }
function setWarnings(list) {
  const el = $('warn');
  el.textContent = '';
  if (!list.length) { el.hidden = true; return; }
  const strong = document.createElement('strong');
  strong.textContent = 'Uyarı: ';
  el.append(strong, list.join(' '));
  el.hidden = false;
}
function clearInvalid() {
  document.querySelectorAll('#form [aria-invalid="true"]').forEach((el) => el.removeAttribute('aria-invalid'));
}
function fail(err) {
  hideResult();
  setWarnings([]);
  showError($('error'), err.message || String(err));
  const f = err.fieldId && $(err.fieldId);
  if (f) { f.setAttribute('aria-invalid', 'true'); f.focus(); }
}

function run() {
  showError($('error'), '');
  clearInvalid();
  $('copy-status').textContent = '';
  try {
    let cur = null;
    try { cur = readElement(); } catch (e) { if (!items.length) throw e; }
    const s = readSettings();
    const net = items.length ? items.reduce((sum, it) => sum + it.vol, 0) : cur.vol;
    const r = calcConcrete({ net, ...s });
    const fireTxt = nfx.format(s.firePct);

    $('r-head').textContent = `Toplam beton: ${m3(r.total)} (fire dahil)`;
    $('r-used').textContent = items.length ? `Listedeki ${items.length} elemanın toplamı` : cur.label;
    $('r-net').textContent = m3(r.net);
    $('r-fire').textContent = `${m3(r.fire)} (%${fireTxt})`;
    $('r-total').textContent = m3(r.total);
    $('r-class').textContent = r.mix.ad;
    $('r-mixer').textContent = `${nf0.format(r.mixers)} mikser (${nfx.format(s.mixerCap)} m³ kapasiteli)`;
    $('r-cost').textContent = r.cost === null ? 'Birim fiyat girilmedi' : `${nf2.format(r.cost)} TL`;

    $('p-cement').textContent = `${nf0.format(r.mix.cimento)} kg`;
    $('m-cement').textContent = `${nf0.format(r.cement)} kg`;
    $('p-bags').textContent = `${nfx.format(round(r.bagsPerM3, 1))} torba`;
    $('m-bags').textContent = `${nf0.format(r.bags)} torba`;
    $('p-sand').textContent = `${nf0.format(r.mix.kum)} kg`;
    $('p-sand-v').textContent = `≈ ${nf2.format(r.mix.kum / P.kum_gevsek_yogunluk)} m³`;
    $('m-sand').textContent = `${nf2.format(r.sandKg / 1000)} ton`;
    $('m-sand-v').textContent = `≈ ${nf2.format(r.sandM3)} m³`;
    $('p-gravel').textContent = `${nf0.format(r.mix.cakil)} kg`;
    $('p-gravel-v').textContent = `≈ ${nf2.format(r.mix.cakil / P.cakil_gevsek_yogunluk)} m³`;
    $('m-gravel').textContent = `${nf2.format(r.gravelKg / 1000)} ton`;
    $('m-gravel-v').textContent = `≈ ${nf2.format(r.gravelM3)} m³`;
    $('p-water').textContent = `${nf0.format(r.mix.su)} litre`;
    $('m-water').textContent = `${nf0.format(r.water)} litre`;

    const note = $('r-class-note');
    if (!r.mix.tasiyici) {
      note.textContent = `${r.mix.ad} taşıyıcı olmayan işler (grobeton, saha ve bahçe betonu, tesviye) içindir. Türkiye Bina Deprem Yönetmeliği (TBDY 2018) md. 7.2.5.1 gereği betonarme binalarda C25'ten düşük dayanımlı beton kullanılamaz.`;
      note.hidden = false;
    } else { note.textContent = ''; note.hidden = true; }

    setWarnings(cur && !items.length ? cur.warns : []);
    showResult();

    lastText = [
      'Beton hesabı – Bilişim Ajans Ücretsiz Araçlar',
      `Hesaplanan: ${items.length ? items.map((it, i) => `${i + 1}) ${it.label} = ${m3(it.vol)}`).join('; ') : cur.label}`,
      `Net hacim: ${m3(r.net)}`,
      `Fire (%${fireTxt}): ${m3(r.fire)}`,
      `Fire dahil hacim: ${m3(r.total)}`,
      `Beton sınıfı: ${r.mix.ad}`,
      `Çimento: ${nf0.format(r.cement)} kg (${nf0.format(r.bags)} torba × ${P.torba_kg} kg)`,
      `Kum: ${nf2.format(r.sandKg / 1000)} ton (≈ ${nf2.format(r.sandM3)} m³)`,
      `Çakıl: ${nf2.format(r.gravelKg / 1000)} ton (≈ ${nf2.format(r.gravelM3)} m³)`,
      `Su: ${nf0.format(r.water)} litre`,
      `Hazır beton: ${nf0.format(r.mixers)} mikser (${nfx.format(s.mixerCap)} m³)`,
      `Tahmini maliyet: ${r.cost === null ? 'birim fiyat girilmedi' : nf2.format(r.cost) + ' TL'}`,
      'Not: Karışım miktarları yaklaşıktır; şantiye için laboratuvar karışım hesabı esastır.',
    ].join('\n');
  } catch (err) {
    fail(err);
  }
}

/* ---- Eleman türü ve birim değişimi ---- */
function syncMode() {
  const mode = $('f-mode').value;
  for (const key of Object.keys(MODES)) $('g-' + key).hidden = key !== mode;
}
function syncUnit() {
  const unit = $('f-unit').value === 'cm' ? 'cm' : 'm';
  document.querySelectorAll('#form .u').forEach((el) => { el.textContent = unit; });
  document.querySelectorAll('#form input[data-ph-m]').forEach((el) => {
    el.placeholder = unit === 'cm' ? el.dataset.phCm : el.dataset.phM;
  });
}

/* ---- Parametreler ---- */
async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) {
      const j = await res.json();
      P = { ...P, ...j, siniflar: { ...P.siniflar, ...(j.siniflar || {}) } };
    }
  } catch (e) { /* çevrimdışı ve önbellekte yoksa varsayılanlar kullanılır */ }
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(P.guncelleme) ? P.guncelleme + 'T12:00:00' : P.guncelleme);
  const txt = Number.isNaN(d.getTime()) ? P.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('params-line').textContent = `Parametreler ${txt} tarihinde güncellendi. Kaynak: ${P.kaynak}`;
  $('approx-note').hidden = !P.yaklasik;
}

/* ---- Olaylar ---- */
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('add').addEventListener('click', () => {
  showError($('error'), '');
  clearInvalid();
  try {
    const cur = readElement();
    readSettings();
    items.push({ label: cur.label, vol: cur.vol });
    renderItems();
    run();
    setWarnings(cur.warns);
    $('add-status').textContent = `${cur.label} listeye eklendi. Yeni elemanın ölçülerini girip tekrar ekleyebilirsiniz.`;
  } catch (err) { fail(err); }
});
$('clear').addEventListener('click', () => {
  $('form').reset();
  items.length = 0;
  renderItems();
  syncMode();
  syncUnit();
  hideResult();
  setWarnings([]);
  clearInvalid();
  showError($('error'), '');
  $('copy-status').textContent = '';
  $('add-status').textContent = '';
  $('f-mode').focus();
});
$('copy').addEventListener('click', async () => {
  if (!lastText) return;
  try {
    await navigator.clipboard.writeText(lastText);
    $('copy-status').textContent = 'Sonuç panoya kopyalandı.';
  } catch {
    $('copy-status').textContent = 'Kopyalanamadı; tarayıcınız pano izni vermiyor olabilir. Sonucu elle seçip kopyalayın.';
  }
});
$('print').addEventListener('click', () => { window.print(); });
$('f-mode').addEventListener('change', () => { syncMode(); setWarnings([]); showError($('error'), ''); clearInvalid(); });
$('f-unit').addEventListener('change', syncUnit);

syncMode();
syncUnit();
renderItems();
loadParams();
