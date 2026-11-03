// IBAN Doğrulama — tamamı tarayıcıda çalışır; IBAN hiçbir sunucuya gönderilmez.
// Yalnızca doğrulama yapar (mod-97, uzunluk, TR yapısı, banka kodu eşleme). Üretici yoktur.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// Ülke kodu → IBAN uzunluğu (ISO 13616 kayıtlı ülkelerden yaygın olanlar).
export const IBAN_LENGTHS = {
  AL: 28, AD: 24, AT: 20, AZ: 28, BH: 22, BE: 16, BA: 20, BR: 29, BG: 22, BY: 28,
  CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, EG: 29, ES: 24,
  FI: 18, FR: 27, GB: 22, GE: 22, GI: 23, GR: 27, GT: 28, HR: 21, HU: 28, IE: 22,
  IL: 23, IQ: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28, LC: 32, LI: 21,
  LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27, MT: 31, MU: 30,
  NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29, RO: 24, RS: 22, SA: 24,
  SE: 24, SI: 19, SK: 24, SM: 27, ST: 25, SV: 28, TL: 23, TN: 24, TR: 26, UA: 29,
  VG: 24, XK: 20, AE: 23,
};

const COUNTRY_NAMES = {
  TR: 'Türkiye', DE: 'Almanya', GB: 'Birleşik Krallık', FR: 'Fransa', NL: 'Hollanda', IT: 'İtalya', ES: 'İspanya',
  AT: 'Avusturya', BE: 'Belçika', CH: 'İsviçre', AZ: 'Azerbaycan', AE: 'Birleşik Arap Emirlikleri', SA: 'Suudi Arabistan',
  QA: 'Katar', KW: 'Kuveyt', BH: 'Bahreyn', IQ: 'Irak', JO: 'Ürdün', GE: 'Gürcistan', KZ: 'Kazakistan', PL: 'Polonya',
  RO: 'Romanya', BG: 'Bulgaristan', GR: 'Yunanistan', CY: 'Kıbrıs', SE: 'İsveç', NO: 'Norveç', DK: 'Danimarka', FI: 'Finlandiya',
  IE: 'İrlanda', PT: 'Portekiz', CZ: 'Çekya', HU: 'Macaristan', UA: 'Ukrayna', LU: 'Lüksemburg', MT: 'Malta', HR: 'Hırvatistan',
  RS: 'Sırbistan', BA: 'Bosna-Hersek', MK: 'Kuzey Makedonya', AL: 'Arnavutluk', XK: 'Kosova', ME: 'Karadağ', EG: 'Mısır',
  IL: 'İsrail', LB: 'Lübnan', TN: 'Tunus', PK: 'Pakistan', BR: 'Brezilya', MD: 'Moldova', BY: 'Belarus', LT: 'Litvanya',
  LV: 'Letonya', EE: 'Estonya', SK: 'Slovakya', SI: 'Slovenya', IS: 'İzlanda', LI: 'Lihtenştayn', MC: 'Monako', SM: 'San Marino',
  AD: 'Andorra', GI: 'Cebelitarık', CR: 'Kosta Rika', DO: 'Dominik Cumhuriyeti', GT: 'Guatemala', SV: 'El Salvador',
  MU: 'Mauritius', MR: 'Moritanya', LC: 'Saint Lucia', ST: 'São Tomé ve Príncipe', TL: 'Doğu Timor', VG: 'Britanya Virjin Adaları', PS: 'Filistin',
};

/** Girdiyi normalize eder: boşluk/tire atılır, büyük harfe çevrilir, Türkçe 'ı/i' sorunu giderilir. */
export function normalizeIban(raw) {
  return String(raw ?? '')
    .replace(/[\s\-_.]/g, '')
    .replace(/ı/g, 'I').replace(/i/g, 'I')
    .toUpperCase();
}

/** 4'lü gruplarla biçimlendirir: TR33 0006 1005 … */
export function formatIban(compact) {
  return compact.replace(/(.{4})/g, '$1 ').trim();
}

/** ISO 7064 mod 97-10: ilk 4 karakter sona alınır, harfler sayıya çevrilir, mod 97 == 1 olmalı (BigInt). */
export function mod97Check(compact) {
  const rearranged = compact.slice(4) + compact.slice(0, 4);
  let digits = '';
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0);
    if (code >= 48 && code <= 57) digits += ch;
    else if (code >= 65 && code <= 90) digits += String(code - 55);
    else return false;
  }
  return BigInt(digits) % 97n === 1n;
}

/**
 * IBAN'ı analiz eder. Dönüş: { compact, formatted, country, countryName, valid, reason, bankCode, account, reserve }.
 * Yapısal sorunlarda (harf çöpü, bilinmeyen ülke, yanlış uzunluk) Error fırlatır; mod-97 başarısızlığı valid:false döner.
 */
export function analyzeIban(raw) {
  const compact = normalizeIban(raw);
  if (!compact) return null;
  if (/[^A-Z0-9]/.test(compact)) {
    throw new Error('IBAN yalnızca harf ve rakamlardan oluşur. Yıldız, nokta, Türkçe karakter ya da başka işaretleri silip yeniden deneyin (boşluklar sorun değildir).');
  }
  if (!/^[A-Z]{2}/.test(compact)) {
    throw new Error('IBAN iki harfli ülke koduyla başlar (Türkiye için "TR"). Hesap numarasını değil, "TR" ile başlayan IBAN\'ı yapıştırın.');
  }
  if (!/^[A-Z]{2}[0-9]{2}/.test(compact)) {
    throw new Error('Ülke kodundan sonra iki rakamlı kontrol numarası gelmelidir (örn. TR33…). 3. ve 4. karakterleri kontrol edin.');
  }
  const country = compact.slice(0, 2);
  const expected = IBAN_LENGTHS[country];
  if (!expected) {
    throw new Error(`"${country}" ülke kodu IBAN listesinde yok. Ülke kodunu kontrol edin; Türkiye IBAN'ları "TR" ile başlar.`);
  }
  if (compact.length !== expected) {
    const diff = compact.length - expected;
    throw new Error(`${COUNTRY_NAMES[country] || country} IBAN'ı ${expected} karakter olmalı; girdiğiniz ${compact.length} karakter (${diff > 0 ? `${diff} fazla` : `${-diff} eksik`}). Eksik ya da fazla haneyi kontrol edin.`);
  }
  if (country === 'TR' && !/^TR[0-9]{24}$/.test(compact)) {
    throw new Error('Türkiye IBAN\'ında "TR"den sonraki 24 karakterin tamamı rakam olmalıdır. Harf içeren haneyi düzeltin.');
  }
  const valid = mod97Check(compact);
  const out = {
    compact, formatted: formatIban(compact), country, countryName: COUNTRY_NAMES[country] || country, valid,
    reason: valid ? '' : 'Kontrol hanesi (mod-97) tutmuyor: en az bir hane yanlış yazılmış ya da iki hane yer değiştirmiş.',
  };
  if (country === 'TR') {
    out.bankCode5 = compact.slice(4, 9);      // 5 haneli banka kodu alanı
    out.bankCode = compact.slice(5, 9);       // başındaki 0 atılınca 4 haneli TCMB kodu
    out.reserve = compact.slice(9, 10);
    out.account = compact.slice(10);
  }
  return out;
}

/* ---------- Banka tablosu ---------- */
let bankTable = null;
let bankMeta = { guncelleme: '', kaynak: '' };
async function loadBanks() {
  try {
    const res = await fetch(new URL('./bankalar.json', import.meta.url));
    if (!res.ok) throw new Error('yok');
    const data = await res.json();
    bankTable = data.bankalar || {};
    bankMeta = data;
    const d = new Date(data.guncelleme);
    const txt = Number.isNaN(d.getTime()) ? data.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    const up = $('banks-updated'); if (up) up.textContent = txt;
    const list = $('banks-list');
    if (list) list.innerHTML = Object.entries(bankTable).map(([k, v]) => `<tr><td><code>${k}</code></td><td>${v}</td></tr>`).join('');
  } catch {
    bankTable = {};
    const up = $('banks-updated'); if (up) up.textContent = 'tablo yüklenemedi';
  }
}

/* ---------- Arayüz ---------- */
const el = {
  form: $('form-iban'), input: $('f-iban'), error: $('error'), result: $('result'),
  status: $('r-status'), formatted: $('r-formatted'), rows: $('r-rows'), reason: $('r-reason'),
  copy: $('copy'), copyCompact: $('copy-compact'), copyStatus: $('copy-status'), clear: $('clear'),
};
let last = null;

function row(label, value, id, mono = true) {
  return `<div class="iban-row"><dt>${label}</dt><dd id="${id}"${mono ? '' : ' class="is-text"'}>${value}</dd></div>`;
}

function render() {
  showError(el.error, '');
  el.copyStatus.textContent = '';
  let info;
  try {
    info = analyzeIban(el.input.value);
  } catch (err) {
    last = null;
    el.result.classList.remove('is-active');
    showError(el.error, err.message);
    return;
  }
  if (!info) { last = null; el.result.classList.remove('is-active'); return; }
  last = info;
  el.result.classList.toggle('is-invalid', !info.valid);
  el.status.textContent = info.valid ? 'Geçerli IBAN' : 'Geçersiz IBAN';
  el.formatted.textContent = info.formatted;
  const rows = [row('Ülke', `${info.countryName} (${info.country})`, 'r-country', false), row('Kontrol hanesi', info.compact.slice(2, 4), 'r-check')];
  if (info.country === 'TR') {
    let bankName = '—';
    if (bankTable === null) bankName = 'tablo yükleniyor…';
    else if (bankTable[info.bankCode]) bankName = bankTable[info.bankCode];
    else bankName = 'Listede yok (kod tanınmadı; IBAN yine de mod-97 ile doğrulandı)';
    rows.push(row('Banka kodu', `${info.bankCode5} → ${info.bankCode}`, 'r-bankcode'));
    rows.push(row('Banka (bilgi amaçlı)', bankName, 'r-bank', false));
    rows.push(row('Rezerv hane', info.reserve, 'r-reserve'));
    rows.push(row('Hesap numarası (16 hane)', formatIban(info.account), 'r-account'));
  }
  el.rows.innerHTML = rows.join('');
  el.reason.textContent = info.valid
    ? 'Yapı ve kontrol hanesi doğru. Bu sonuç hesabın açık ya da kime ait olduğunu göstermez; alıcı adını bankanızın havale ekranındaki "IBAN–ad soyad" kontrolüyle doğrulayın.'
    : `${info.reason} IBAN'ı kaynağından (banka uygulaması, dekont) yeniden kopyalayın; özellikle 0/O, 1/I, 5/S ve 8/B karışıklığına bakın.`;
  el.result.classList.add('is-active');
}

async function copyText(text, okMsg) {
  try { await navigator.clipboard.writeText(text); el.copyStatus.textContent = okMsg; }
  catch { el.copyStatus.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}

el.input.addEventListener('input', () => {
  // Yazarken 4'lü gruplara ayır; imleci sona taşımadan basit biçimleme (yapıştırma için yeterli).
  const compact = normalizeIban(el.input.value);
  if (/^[A-Z0-9]*$/.test(compact) && compact.length <= 34) {
    const atEnd = el.input.selectionStart === el.input.value.length;
    const formatted = formatIban(compact);
    if (atEnd && formatted !== el.input.value) el.input.value = formatted;
  }
  render();
});
el.form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
el.copy.addEventListener('click', () => last && copyText(last.formatted, 'Biçimli IBAN kopyalandı.'));
el.copyCompact.addEventListener('click', () => last && copyText(last.compact, 'Boşluksuz IBAN kopyalandı.'));
el.clear.addEventListener('click', () => { el.input.value = ''; render(); el.input.focus(); });

loadBanks().then(() => { if (last) render(); });
