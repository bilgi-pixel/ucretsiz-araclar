// URL kodla/çöz ve metin kodlama araçları — saf JS. Metin tarayıcıdan çıkmaz.
const $ = (id) => document.getElementById(id);
const TABS = ['url', 'html', 'uni', 'parse', 'utm', 'slug'];

function setError(msg) {
  const el = $('error');
  el.textContent = msg || '';
  el.classList.toggle('is-active', !!msg);
}

/* ---------- Sekmeler ---------- */
function selectTab(name, focus) {
  for (const t of TABS) {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', sel ? 'true' : 'false');
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  }
  setError('');
  if (focus) $('tab-' + name).focus();
}
TABS.forEach((t, i) => {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') selectTab(TABS[(i + 1) % TABS.length], true);
    else if (e.key === 'ArrowLeft') selectTab(TABS[(i + TABS.length - 1) % TABS.length], true);
  });
});

/* ---------- Kopyala ---------- */
async function copyFrom(id) {
  const el = $(id);
  const value = el.value !== undefined ? el.value : el.textContent;
  if (!value) { setError('Kopyalanacak sonuç yok. Önce bir değer girin ya da işlem düğmesine basın.'); return; }
  setError('');
  try { await navigator.clipboard.writeText(value); } catch {
    const t = document.createElement('textarea');
    t.value = value;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  $('copied').textContent = 'Kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
}
document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copyFrom(b.dataset.copy)));

/* ---------- Türkçe → ASCII ---------- */
const TR_MAP = { 'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'İ': 'i', 'I': 'i', 'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u' };
function toAscii(s) {
  return s.replace(/[çÇğĞıİIöÖşŞüÜ]/g, (c) => TR_MAP[c]).normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* ---------- 1. URL kodla / çöz ---------- */
function urlDo(kind) {
  const src = $('u-in').value;
  if (!src) { setError('Önce kutuya kodlanacak ya da çözülecek metni yazın.'); return; }
  setError('');
  const plus = $('u-plus').checked;
  try {
    let out;
    if (kind === 'comp') out = encodeURIComponent(src);
    else if (kind === 'uri') out = encodeURI(src);
    else out = decodeURIComponent(plus ? src.replace(/\+/g, ' ') : src);
    if (plus && kind !== 'dec') out = out.replace(/%20/g, '+');
    $('u-out').value = out;
  } catch {
    $('u-out').value = '';
    setError('Metinde geçersiz bir % dizisi var (örneğin "%" sonrasında iki onaltılık rakam yok ya da UTF-8 olarak anlamsız). Yüzde işaretlerini kontrol edin; düz % karakteri için %25 yazın.');
  }
}
$('u-enc').addEventListener('click', () => urlDo('comp'));
$('u-encuri').addEventListener('click', () => urlDo('uri'));
$('u-dec').addEventListener('click', () => urlDo('dec'));

/* ---------- 2. HTML entity ---------- */
function htmlEncode(s, all) {
  let out = '';
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (ch === '&') out += '&amp;';
    else if (ch === '<') out += '&lt;';
    else if (ch === '>') out += '&gt;';
    else if (ch === '"') out += '&quot;';
    else if (ch === "'") out += '&#39;';
    else if (all && cp > 127) out += `&#${cp};`;
    else out += ch;
  }
  return out;
}
function htmlDecode(s) {
  // textarea içeriği etiket olarak çalıştırılmaz; yalnızca entity çözülür.
  const t = document.createElement('textarea');
  t.innerHTML = s;
  return t.value;
}
$('h-enc').addEventListener('click', () => {
  if (!$('h-in').value) { setError('Önce kutuya metin yazın.'); return; }
  setError('');
  $('h-out').value = htmlEncode($('h-in').value, $('h-all').checked);
});
$('h-dec').addEventListener('click', () => {
  if (!$('h-in').value) { setError('Önce kutuya çözülecek entity metnini yazın (örnek: &amp;ccedil; ya da &amp;#231;).'); return; }
  setError('');
  $('h-out').value = htmlDecode($('h-in').value);
});

/* ---------- 3. Unicode kaçış ---------- */
function uniEncode(s, all) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    out += (all || c > 127) ? '\\u' + c.toString(16).padStart(4, '0') : s[i];
  }
  return out;
}
function uniDecode(s) {
  return s.replace(/\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})/g, (m, a, b, c) => {
    const cp = parseInt(a || b || c, 16);
    return cp > 0x10ffff ? m : String.fromCodePoint(cp);
  });
}
$('x-enc').addEventListener('click', () => {
  if (!$('x-in').value) { setError('Önce kutuya metin yazın.'); return; }
  setError('');
  $('x-out').value = uniEncode($('x-in').value, $('x-all').checked);
});
$('x-dec').addEventListener('click', () => {
  const v = $('x-in').value;
  if (!v) { setError('Önce kutuya \\u00e7 gibi kaçış dizileri içeren metin yazın.'); return; }
  if (!/\\u|\\x/.test(v)) { setError('Metinde \\uXXXX, \\u{XXXXX} ya da \\xXX biçiminde kaçış dizisi bulunamadı. Örnek: \\u00e7ay \\u015feker.'); return; }
  setError('');
  $('x-out').value = uniDecode(v);
});

/* ---------- Adres ayrıştırma yardımcıları ---------- */
function parseAddress(raw, allowNoScheme) {
  let s = raw.trim();
  if (!s) return { empty: true };
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) {
    if (!allowNoScheme) return { error: 'Adres https:// gibi bir protokolle başlamalı. Örnek: https://ornek.com/yol?a=1' };
    s = 'https://' + s;
  }
  try { return { url: new URL(s) }; } catch {
    return { error: 'Adres geçerli görünmüyor. Alan adını, boşlukları ve özel karakterleri kontrol edin; örnek: https://ornek.com/yol?a=1' };
  }
}
const safeDecode = (s) => { try { return decodeURIComponent(s.replace(/\+/g, ' ')); } catch { return s; } };
function readPairs(search) {
  return search.replace(/^\?/, '').split('&').filter(Boolean).map((p) => {
    const i = p.indexOf('=');
    return { k: safeDecode(i < 0 ? p : p.slice(0, i)), v: i < 0 ? '' : safeDecode(p.slice(i + 1)) };
  });
}
const enc = encodeURIComponent;

/* ---------- 4. URL ayrıştırıcı ---------- */
let baseUrl = null;
let params = [];

function renderParts() {
  const dl = $('p-parts');
  dl.textContent = '';
  if (!baseUrl) return;
  const u = baseUrl;
  const rows = [
    ['Protokol', u.protocol], ['Ana bilgisayar (host)', u.hostname], ['Bağlantı noktası (port)', u.port || '(varsayılan)'],
    ['Yol (path)', u.pathname], ['Sorgu (query)', u.search || '(yok)'], ['Parça (hash)', u.hash || '(yok)'],
  ];
  if (u.username) rows.push(['Kullanıcı adı', u.username]);
  rows.push(['Köken (origin)', u.origin]);
  for (const [k, v] of rows) {
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    dl.append(dt, dd);
  }
}
function buildFromParams() {
  if (!baseUrl) { $('p-new').value = ''; return; }
  const u = new URL(baseUrl.href);
  u.search = params.filter((p) => p.k !== '').map((p) => `${enc(p.k)}=${enc(p.v)}`).join('&');
  $('p-new').value = u.href;
}
function renderRows() {
  const host = $('p-rows');
  host.textContent = '';
  params.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'uk-row';
    const k = document.createElement('input');
    k.type = 'text'; k.value = p.k; k.className = 'p-k';
    k.setAttribute('aria-label', `Parametre ${i + 1} adı`);
    k.addEventListener('input', () => { p.k = k.value; buildFromParams(); });
    const v = document.createElement('input');
    v.type = 'text'; v.value = p.v; v.className = 'p-v';
    v.setAttribute('aria-label', `Parametre ${i + 1} değeri`);
    v.addEventListener('input', () => { p.v = v.value; buildFromParams(); });
    const del = document.createElement('button');
    del.type = 'button'; del.className = 'ba-btn'; del.textContent = 'Sil';
    del.setAttribute('aria-label', `Parametre ${i + 1} sil`);
    del.addEventListener('click', () => { params.splice(i, 1); renderRows(); buildFromParams(); });
    row.append(k, v, del);
    host.appendChild(row);
  });
  $('p-empty').hidden = params.length > 0 || !baseUrl;
}
function parseRun() {
  const r = parseAddress($('p-in').value, false);
  if (r.empty) { baseUrl = null; params = []; renderParts(); renderRows(); $('p-new').value = ''; setError(''); $('p-box').hidden = true; return; }
  if (r.error) { baseUrl = null; params = []; renderParts(); renderRows(); $('p-new').value = ''; $('p-box').hidden = true; setError(r.error); return; }
  setError('');
  baseUrl = r.url;
  params = readPairs(r.url.search);
  $('p-box').hidden = false;
  renderParts();
  renderRows();
  buildFromParams();
}
$('p-in').addEventListener('input', parseRun);
$('p-go').addEventListener('click', parseRun);
$('p-add').addEventListener('click', () => {
  if (!baseUrl) { setError('Önce üstteki kutuya geçerli bir adres yazın.'); return; }
  params.push({ k: '', v: '' });
  renderRows();
  const ks = document.querySelectorAll('#p-rows .p-k');
  ks[ks.length - 1].focus();
});

/* ---------- 5. UTM oluşturucu ---------- */
function utmValue(s) {
  s = s.trim();
  if (!$('m-norm').checked) return s;
  return toAscii(s).toLowerCase().replace(/[^a-z0-9_.-]+/g, '-').replace(/^-+|-+$/g, '');
}
function utmRun() {
  const out = $('m-out');
  const raw = $('m-url').value;
  const r = parseAddress(raw, true);
  out.value = '';
  if (r.empty) { setError(''); return; }
  if (r.error) { setError(r.error); return; }
  const vals = {
    utm_source: utmValue($('m-source').value), utm_medium: utmValue($('m-medium').value), utm_campaign: utmValue($('m-campaign').value),
    utm_term: utmValue($('m-term').value), utm_content: utmValue($('m-content').value),
  };
  const missing = ['utm_source', 'utm_medium', 'utm_campaign'].filter((k) => !vals[k]);
  if (missing.length) { setError(`Zorunlu alan eksik: ${missing.join(', ')}. Kaynak, ortam ve kampanya adını doldurun (örnek: google, cpc, yaz-indirimi).`); return; }
  setError('');
  const u = r.url;
  const keep = u.search.replace(/^\?/, '').split('&').filter((p) => p && !Object.hasOwn(vals, safeDecode(p.split('=')[0])));
  for (const [k, v] of Object.entries(vals)) if (v) keep.push(`${k}=${enc(v)}`);
  u.search = keep.join('&');
  out.value = u.href;
}
['m-url', 'm-source', 'm-medium', 'm-campaign', 'm-term', 'm-content'].forEach((id) => $(id).addEventListener('input', utmRun));
$('m-norm').addEventListener('change', utmRun);

/* ---------- 6. Slug ---------- */
function slugRun() {
  const sep = $('s-sep').value;
  let s = $('s-in').value;
  if (!s.trim()) { $('s-out').value = ''; return; }
  if ($('s-and').checked) s = s.replace(/&/g, ' ve ');
  let slug = toAscii(s).toLowerCase().replace(/[^a-z0-9]+/g, sep).replace(new RegExp(`^\\${sep}+|\\${sep}+$`, 'g'), '');
  const max = parseInt($('s-max').value, 10);
  if (max > 0 && slug.length > max) slug = slug.slice(0, max).replace(new RegExp(`\\${sep}+$`), '');
  $('s-out').value = slug;
}
['s-in', 's-max'].forEach((id) => $(id).addEventListener('input', slugRun));
['s-sep', 's-and'].forEach((id) => $(id).addEventListener('change', slugRun));

selectTab('url');
