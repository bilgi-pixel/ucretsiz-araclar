// Kıdem ve İhbar Tazminatı Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
// Hesap tahminidir; hukuki tavsiye değildir. Yıllık değişen tutarlar parametreler.json'dadır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;
const DAY_MS = 86_400_000;

// parametreler.json yüklenemezse (çevrimdışı önbellek vb.) bu varsayılanlar kullanılır.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-03',
  kidem_tavani: [],
  damga_vergisi_orani: 0.00759,
  sgk_isci_orani: 0.14,
  issizlik_isci_orani: 0.01,
  ihbar_sureleri: [{ kidem_ay_max: 6, hafta: 2 }, { kidem_ay_max: 18, hafta: 4 }, { kidem_ay_max: 36, hafta: 6 }, { kidem_ay_max: null, hafta: 8 }],
  yillik_izin: [{ yil_max: 5, gun: 14 }, { yil_max: 15, gun: 20 }, { yil_max: null, gun: 26 }],
  gelir_vergisi: { yil: 2026, oranlar: [15, 20, 27, 35, 40], dilim_sinirlari: null },
};
let params = DEFAULT_PARAMS;

/* ---------- Fesih türleri: hangi kalem hak edilir (genel bilgi, hukuki tavsiye değildir) ---------- */
export const TERMINATION_TYPES = {
  isveren: { label: 'İşveren feshi (haklı neden dışında)', kidem: true, ihbar: true, izin: true, note: 'İşveren ihbar süresini kullandırmadıysa ihbar tazminatı da ödenir.' },
  istifa: { label: 'İstifa (haklı neden yok)', kidem: false, ihbar: false, izin: true, note: 'Kendi isteğiyle ayrılan işçi kıdem ve ihbar tazminatı alamaz; ihbar süresine uymazsa işverene ihbar tazminatı ödeyebilir. Kullanılmayan yıllık izin ücreti her durumda ödenir.' },
  isci_hakli: { label: 'İşçinin haklı nedenle feshi (İş K. md. 24)', kidem: true, ihbar: false, izin: true, note: 'Ücretin ödenmemesi, mobbing, sigortasız çalıştırma gibi haklı nedenlerle fesihte kıdem alınır; ihbar tazminatı iki taraf için de doğmaz.' },
  emeklilik: { label: 'Emeklilik / yaş dışı emeklilik (15 yıl – 3600 gün)', kidem: true, ihbar: false, izin: true, note: 'SGK\'dan alınacak yazıyla işverene başvurulur; kıdem alınır, ihbar tazminatı yoktur.' },
  evlilik: { label: 'Kadın işçinin evlilik nedeniyle feshi (1 yıl içinde)', kidem: true, ihbar: false, izin: true, note: 'Evlilik tarihinden itibaren 1 yıl içinde yapılan fesihte kıdem alınır; ihbar tazminatı yoktur.' },
  askerlik: { label: 'Muvazzaf askerlik', kidem: true, ihbar: false, izin: true, note: 'Askerlik nedeniyle fesihte kıdem alınır; ihbar tazminatı yoktur.' },
  olum: { label: 'İşçinin ölümü', kidem: true, ihbar: false, izin: true, note: 'Kıdem tazminatı ve izin ücreti yasal mirasçılara ödenir.' },
  isveren_hakli: { label: 'İşverenin haklı nedenle feshi (İş K. md. 25/II)', kidem: false, ihbar: false, izin: true, note: 'Ahlak ve iyi niyet kurallarına aykırılık gerekçesiyle fesihte kıdem ve ihbar ödenmez; gerekçe mahkemede tartışılabilir.' },
  ikale: { label: 'İkale (karşılıklı anlaşma)', kidem: true, ihbar: true, izin: true, note: 'Ödenecek kalemler sözleşmeye bağlıdır; aşağıdaki tutarlar pazarlık için referanstır.' },
};

/* ---------- Sayı ayrıştırma (tr-TR girdileri: 1.250,50 / 1250,5 / 1250.5) ---------- */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 40.000 ya da 40000,50). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Tutarı eksi işareti olmadan girin.`);
  s = s.replace(/^\+/, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lastComma >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 40.000,50`);
  return n;
}

/* ---------- Tarih yardımcıları (UTC; yaz saati kaymasını önler) ---------- */
const parseDate = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
};
const fmtDate = (d) => d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
function addMonthsUTC(d, n) {
  const y = d.getUTCFullYear(); const m = d.getUTCMonth() + n; const day = d.getUTCDate();
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(day, last)));
}

/** Kıdem süresi: tam yıl + ay + gün; kıdem hesabında yıl + artık gün kullanılır. */
export function tenure(entry, exit) {
  const totalDays = Math.round((exit - entry) / DAY_MS);
  let years = exit.getUTCFullYear() - entry.getUTCFullYear();
  if (addMonthsUTC(entry, years * 12) > exit) years--;
  const anniv = addMonthsUTC(entry, years * 12);
  const remDays = Math.round((exit - anniv) / DAY_MS);
  let months = 0;
  while (addMonthsUTC(anniv, months + 1) <= exit) months++;
  const days = Math.round((exit - addMonthsUTC(anniv, months)) / DAY_MS);
  return { years, months, days, remDays, totalDays, totalMonths: totalDays / 30.4375 };
}

/* ---------- Parametre seçimleri ---------- */
export function capForDate(exit, caps = params.kidem_tavani) {
  const iso = exit.toISOString().slice(0, 10);
  return (caps || []).find((c) => c.baslangic <= iso && iso <= c.bitis) || null;
}
export function noticeWeeks(totalMonths, rules = params.ihbar_sureleri) {
  const r = rules.find((x) => x.kidem_ay_max === null || totalMonths < x.kidem_ay_max);
  return r ? r.hafta : 8;
}
// İş K. md. 53: 1–5 yıl (5 dahil) 14 gün; 5'ten fazla 15'ten az 20 gün; 15 ve üzeri 26 gün.
export function annualLeaveDays(years, rules = params.yillik_izin) {
  if (years < 1) return 0;
  for (let i = 0; i < rules.length; i++) {
    const r = rules[i];
    if (r.yil_max === null) return r.gun;
    if (i === 0 ? years <= r.yil_max : years < r.yil_max) return r.gun;
  }
  return 0;
}

/* ---------- Hesap çekirdeği ---------- */
export function calcAll({ entry, exit, gross, extras = 0, cap = null, leaveDays = 0, taxRate = 0.15, applySgk = true, type = 'isveren', noticeServed = false }) {
  const t = tenure(entry, exit);
  const dressed = round2(gross + extras);
  const stampRate = params.damga_vergisi_orani;
  const sgkRate = params.sgk_isci_orani + params.issizlik_isci_orani;
  const rule = TERMINATION_TYPES[type] || TERMINATION_TYPES.isveren;

  // Kıdem: giydirilmiş aylık (tavanla sınırlı) × yıl + artık gün oranı; yalnızca damga vergisi kesilir.
  const capApplied = cap !== null && dressed > cap;
  const base = capApplied ? cap : dressed;
  const kGross = round2(base * t.years + base * t.remDays / 365);
  const kStamp = round2(kGross * stampRate);
  const kidem = { eligibleByTenure: t.years >= 1, eligibleByType: rule.kidem, base, capApplied, gross: kGross, stamp: kStamp, net: round2(kGross - kStamp) };
  kidem.payable = kidem.eligibleByTenure && kidem.eligibleByType;

  // İhbar: giydirilmiş günlük × (hafta × 7); gelir vergisi + damga kesilir, SGK primi yok.
  const weeks = noticeWeeks(t.totalMonths);
  const nDays = weeks * 7;
  const nGross = round2(dressed / 30 * nDays);
  const nTax = round2(nGross * taxRate);
  const nStamp = round2(nGross * stampRate);
  const ihbar = { weeks, days: nDays, gross: nGross, tax: nTax, stamp: nStamp, net: round2(nGross - nTax - nStamp), eligibleByType: rule.ihbar, served: noticeServed };
  ihbar.payable = ihbar.eligibleByType && !noticeServed;

  // Yıllık izin: çıplak günlük brüt × gün; SGK işçi payı (isteğe bağlı), gelir vergisi ve damga kesilir.
  const lGross = round2(gross / 30 * leaveDays);
  const lSgk = applySgk ? round2(lGross * sgkRate) : 0;
  const lTax = round2((lGross - lSgk) * taxRate);
  const lStamp = round2(lGross * stampRate);
  const izin = { days: leaveDays, gross: lGross, sgk: lSgk, tax: lTax, stamp: lStamp, net: round2(lGross - lSgk - lTax - lStamp), entitlementPerYear: annualLeaveDays(t.years), payable: leaveDays > 0 };

  const totalGross = round2((kidem.payable ? kGross : 0) + (ihbar.payable ? nGross : 0) + (izin.payable ? lGross : 0));
  const totalNet = round2((kidem.payable ? kidem.net : 0) + (ihbar.payable ? ihbar.net : 0) + (izin.payable ? izin.net : 0));
  return { tenure: t, dressed, cap, kidem, ihbar, izin, totalGross, totalNet, rule, type, taxRate };
}

/* ---------- Arayüz ---------- */
const el = {
  form: $('form-kt'), entry: $('f-entry'), exit: $('f-exit'), gross: $('f-gross'), road: $('f-road'), meal: $('f-meal'), bonus: $('f-bonus'),
  cap: $('f-cap'), capStatus: $('cap-status'), leave: $('f-leave'), tax: $('f-tax'), sgk: $('f-sgk'), type: $('f-type'), served: $('f-served'),
  error: $('error'), result: $('result'), rows: $('r-rows'), typeNote: $('r-type-note'), copy: $('copy'), print: $('print'), copyStatus: $('copy-status'),
  paramsUpdated: $('params-updated'), capTable: $('cap-table'),
};
let lastResult = null;
let capTouched = false; // kullanıcı tavanı elle değiştirdiyse otomatik doldurma yapılmaz

function fillTypeOptions() {
  el.type.innerHTML = Object.entries(TERMINATION_TYPES).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
  el.type.value = 'isveren';
}

function autoFillCap() {
  const exit = parseDate(el.exit.value);
  if (!exit) { el.capStatus.textContent = 'Çıkış tarihini girince o dönemin tavanı otomatik dolar.'; return; }
  const c = capForDate(exit);
  if (c && c.tutar !== null && c.tutar !== undefined) {
    if (!capTouched) el.cap.value = fmt.format(c.tutar);
    el.capStatus.textContent = `${fmtDate(parseDate(c.baslangic))} – ${fmtDate(parseDate(c.bitis))} dönemi tavanı otomatik dolduruldu${c.not ? ` (${c.not.toLowerCase()})` : ''}. Resmî genelgeyle teyit edin; farklıysa düzeltin.`;
  } else {
    if (!capTouched) el.cap.value = '';
    el.capStatus.textContent = 'Bu çıkış tarihi için tavan tutarı parametre dosyasında yok ya da henüz teyit edilmedi. Hazine ve Maliye Bakanlığı genelgesindeki tavanı elle girin; boş bırakırsanız tavan uygulanmaz.';
  }
}

const row = (label, value, id, cls = '') => `<div class="kt-row ${cls}"><dt>${label}</dt><dd id="${id}">${value}</dd></div>`;
const badge = (ok, text) => `<span class="kt-badge ${ok ? 'is-ok' : 'is-no'}">${text}</span>`;

function render() {
  showError(el.error, '');
  el.copyStatus.textContent = '';
  try {
    const entry = parseDate(el.entry.value);
    const exit = parseDate(el.exit.value);
    const gross = parseAmount(el.gross.value, 'Brüt ücret');
    const road = parseAmount(el.road.value, 'Yol yardımı') || 0;
    const meal = parseAmount(el.meal.value, 'Yemek yardımı') || 0;
    const bonus = parseAmount(el.bonus.value, 'İkramiye/prim') || 0;
    const capRaw = parseAmount(el.cap.value, 'Kıdem tavanı');
    const leaveDays = parseAmount(el.leave.value, 'Kullanılmayan izin günü') || 0;
    if (el.entry.value && !entry) throw new Error('İşe giriş tarihi okunamadı. Tarihi gün/ay/yıl olarak seçin.');
    if (el.exit.value && !exit) throw new Error('İşten çıkış tarihi okunamadı. Tarihi gün/ay/yıl olarak seçin.');
    if (entry && exit && exit < entry) throw new Error('Çıkış tarihi giriş tarihinden önce olamaz. Tarihleri kontrol edin; işe giriş tarihi SGK işe giriş bildirgesindeki tarihtir.');
    if (gross !== null && gross <= 0) throw new Error('Brüt ücret sıfırdan büyük olmalı. Bordronuzdaki aylık brüt ücreti girin.');
    if (capRaw !== null && capRaw <= 0) throw new Error('Kıdem tavanı sıfırdan büyük olmalı ya da boş bırakılmalı.');
    if (!Number.isInteger(leaveDays) || leaveDays < 0) throw new Error('Kullanılmayan izin günü 0 ya da pozitif tam sayı olmalı (örn. 12).');
    if (!entry || !exit || gross === null) { el.result.classList.remove('is-active'); lastResult = null; return; }

    const r = calcAll({
      entry, exit, gross, extras: road + meal + bonus / 12, cap: capRaw, leaveDays,
      taxRate: Number(el.tax.value) / 100, applySgk: el.sgk.checked, type: el.type.value, noticeServed: el.served.checked,
    });
    lastResult = r;
    const t = r.tenure;
    const parts = [];
    parts.push(`<h4>Kıdem süresi</h4>`);
    parts.push(row('Çalışılan süre', `${t.years} yıl ${t.months} ay ${t.days} gün`, 'r-tenure'));
    parts.push(row('Giydirilmiş aylık brüt ücret', money(r.dressed), 'r-dressed'));

    parts.push(`<h4>Kıdem tazminatı ${badge(r.kidem.payable, r.kidem.payable ? 'bu fesih türünde ödenir' : (!r.kidem.eligibleByTenure ? '1 yıl dolmadığı için hak edilmez' : 'bu fesih türünde ödenmez'))}</h4>`);
    const capNote = r.cap === null ? 'Tavan girilmedi; ücret tavanla sınırlanmadı.' : (r.kidem.capApplied ? `Giydirilmiş ücret tavanı aştığı için tavan (${money(r.cap)}) esas alındı.` : `Tavan (${money(r.cap)}) aşılmadı; giydirilmiş ücret esas alındı.`);
    parts.push(row('Hesaba esas aylık ücret', money(r.kidem.base), 'k-base'));
    parts.push(`<p class="kt-note" id="k-cap-note">${capNote}</p>`);
    parts.push(row(`Brüt kıdem tazminatı (${t.years} yıl${t.remDays ? ` + ${t.remDays} gün` : ''})`, money(r.kidem.gross), 'k-gross'));
    parts.push(row('Damga vergisi (binde 7,59)', `− ${money(r.kidem.stamp)}`, 'k-stamp'));
    parts.push(row('Net kıdem tazminatı', money(r.kidem.net), 'k-net', 'is-strong'));

    const ihbarBadge = !r.ihbar.eligibleByType ? 'bu fesih türünde ödenmez' : (r.ihbar.served ? 'ihbar süresi kullandırıldı, ödenmez' : 'bu fesih türünde ödenir');
    parts.push(`<h4>İhbar tazminatı ${badge(r.ihbar.payable, ihbarBadge)}</h4>`);
    parts.push(row('İhbar süresi', `${r.ihbar.weeks} hafta (${r.ihbar.days} gün)`, 'n-weeks'));
    parts.push(row('Brüt ihbar tazminatı', money(r.ihbar.gross), 'n-gross'));
    parts.push(row(`Gelir vergisi (%${el.tax.value})`, `− ${money(r.ihbar.tax)}`, 'n-tax'));
    parts.push(row('Damga vergisi', `− ${money(r.ihbar.stamp)}`, 'n-stamp'));
    parts.push(row('Net ihbar tazminatı', money(r.ihbar.net), 'n-net', 'is-strong'));

    parts.push(`<h4>Kullanılmayan yıllık izin ücreti ${badge(r.izin.payable, r.izin.payable ? 'her fesih türünde ödenir' : 'izin günü girilmedi')}</h4>`);
    parts.push(row('Yıllık izin hakkınız (kıdeme göre)', r.izin.entitlementPerYear ? `${r.izin.entitlementPerYear} gün / yıl` : '1 yıl dolmadan izin hakkı doğmaz', 'l-entitlement'));
    parts.push(row(`Brüt izin ücreti (${r.izin.days} gün × çıplak günlük)`, money(r.izin.gross), 'l-gross'));
    if (el.sgk.checked) parts.push(row('SGK + işsizlik işçi payı (%15)', `− ${money(r.izin.sgk)}`, 'l-sgk'));
    parts.push(row(`Gelir vergisi (%${el.tax.value})`, `− ${money(r.izin.tax)}`, 'l-tax'));
    parts.push(row('Damga vergisi', `− ${money(r.izin.stamp)}`, 'l-stamp'));
    parts.push(row('Net izin ücreti', money(r.izin.net), 'l-net', 'is-strong'));

    parts.push(`<h4>Toplam (${r.rule.label})</h4>`);
    parts.push(row('Toplam brüt', money(r.totalGross), 't-gross'));
    parts.push(row('Toplam net (tahmini)', money(r.totalNet), 't-net', 'is-strong is-total'));
    el.rows.innerHTML = parts.join('');
    el.typeNote.textContent = r.rule.note;
    el.result.classList.add('is-active');
  } catch (err) {
    el.result.classList.remove('is-active');
    lastResult = null;
    showError(el.error, err.message);
  }
}

function summaryText() {
  if (!lastResult) return '';
  const r = lastResult; const t = r.tenure;
  const yn = (b) => (b ? 'ödenir' : 'ödenmez');
  return [
    'Kıdem ve İhbar Tazminatı Hesabı (tahmini) – Bilişim Ajans Ücretsiz Araçlar',
    `İşe giriş: ${el.entry.value} · Çıkış: ${el.exit.value} · Süre: ${t.years} yıl ${t.months} ay ${t.days} gün`,
    `Fesih türü: ${r.rule.label}`,
    `Giydirilmiş aylık brüt: ${money(r.dressed)}${r.cap !== null ? ` · Tavan: ${money(r.cap)}${r.kidem.capApplied ? ' (uygulandı)' : ''}` : ' · Tavan girilmedi'}`,
    `Kıdem tazminatı (${yn(r.kidem.payable)}): brüt ${money(r.kidem.gross)} − damga ${money(r.kidem.stamp)} = net ${money(r.kidem.net)}`,
    `İhbar tazminatı (${yn(r.ihbar.payable)}): ${r.ihbar.weeks} hafta / ${r.ihbar.days} gün · brüt ${money(r.ihbar.gross)} − GV ${money(r.ihbar.tax)} − damga ${money(r.ihbar.stamp)} = net ${money(r.ihbar.net)}`,
    `Yıllık izin ücreti (${r.izin.days} gün): brüt ${money(r.izin.gross)}${el.sgk.checked ? ` − SGK ${money(r.izin.sgk)}` : ''} − GV ${money(r.izin.tax)} − damga ${money(r.izin.stamp)} = net ${money(r.izin.net)}`,
    `TOPLAM: brüt ${money(r.totalGross)} · net ${money(r.totalNet)}`,
    'Bu hesap tahminidir, hukuki tavsiye değildir; kesin tutar için arabulucu ya da avukata danışın.',
  ].join('\n');
}

el.copy.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(summaryText()); el.copyStatus.textContent = 'Sonuç kopyalandı.'; }
  catch { el.copyStatus.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});
el.print.addEventListener('click', () => {
  $('print-date').textContent = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('print-inputs').textContent = `İşe giriş ${el.entry.value} · çıkış ${el.exit.value} · brüt ${el.gross.value} ₺ · ${TERMINATION_TYPES[el.type.value]?.label || ''}`;
  window.print();
});

el.cap.addEventListener('input', () => { capTouched = el.cap.value.trim() !== ''; render(); });
el.exit.addEventListener('input', () => { autoFillCap(); render(); });
el.exit.addEventListener('change', () => { autoFillCap(); render(); });
[el.entry, el.gross, el.road, el.meal, el.bonus, el.leave].forEach((i) => i.addEventListener('input', render));
[el.entry, el.tax, el.sgk, el.type, el.served].forEach((i) => i.addEventListener('change', render));
el.form.addEventListener('submit', (e) => { e.preventDefault(); render(); });

/* ---------- Parametreler ---------- */
async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = { ...DEFAULT_PARAMS, ...(await res.json()) };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar */ }
  const d = parseDate(params.guncelleme);
  el.paramsUpdated.textContent = d ? d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : params.guncelleme;
  if (el.capTable && Array.isArray(params.kidem_tavani)) {
    el.capTable.innerHTML = params.kidem_tavani.map((c) => {
      const val = c.tutar === null || c.tutar === undefined ? '<em>henüz teyit edilmedi — elle girin</em>' : money(c.tutar);
      return `<tr><td>${fmtDate(parseDate(c.baslangic))} – ${fmtDate(parseDate(c.bitis))}</td><td>${val}</td></tr>`;
    }).join('');
  }
  const taxOpts = (params.gelir_vergisi?.oranlar || [15, 20, 27, 35, 40]);
  el.tax.innerHTML = taxOpts.map((o) => `<option value="${o}"${o === 15 ? ' selected' : ''}>%${o}</option>`).join('');
  autoFillCap();
  render();
}

fillTypeOptions();
loadParams();
