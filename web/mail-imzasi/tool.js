// E-posta imzası oluşturucu — tablo tabanlı, inline CSS, 600 px genişlik. Saf JS.
// Yazılan bilgiler ve seçilen görsel tarayıcıdan çıkmaz; uzak görsel adresleri önizlemede yüklenmez.
import { downloadBlob, formatBytes } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const val = (id) => $(id).value.trim();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const FIELDS = ['name', 'title', 'company', 'phone', 'email', 'web', 'address', 'linkedin', 'instagram', 'x', 'whatsapp', 'note'];
const EMAIL_RE = /^[^\s@<>"'()]+@[^\s@<>"'()]+\.[^\s@<>"'()]{2,}$/;
const EMBED_WARN_CHARS = 50 * 1024; // data URI bu uzunluğu aşarsa "küçük tutun" uyarısı
const MAX_FILE = 50 * 1024 * 1024;
const DARK_BG = '#1f2226';

// E-posta istemcilerinde güvenli yazı tipleri (IBM Plex gibi site yazı tipleri istemcide yoktur).
const FONTS = {
  arial: "Arial, Helvetica, sans-serif",
  verdana: "Verdana, Geneva, sans-serif",
  tahoma: "Tahoma, Geneva, sans-serif",
  trebuchet: "'Trebuchet MS', Helvetica, sans-serif",
  georgia: "Georgia, 'Times New Roman', serif",
  times: "'Times New Roman', Times, serif",
};

// Hiçbir alan doldurulmadıysa önizlemede gösterilen örnek veri (çıktıya yazılmaz).
const SAMPLE = {
  name: 'Ayşe Yılmaz', title: 'Pazarlama Müdürü', company: 'Örnek A.Ş.', phone: '0412 000 00 00', email: 'ayse@ornek.com',
  web: 'ornek.com', address: 'Diyarbakır, Türkiye', linkedin: 'ayseyilmaz', instagram: 'ornek', x: '', whatsapp: '', note: '',
};

// Yerel görsel durumu: yeniden kodlama için asıl dosyayı tutarız.
const state = { file: null, embedded: null, encoding: 0 };

/* ---------- Hata / durum ---------- */
function setError(msg) {
  const el = $('error');
  el.textContent = msg || '';
  el.classList.toggle('is-active', !!msg);
}
let statusTimer = 0;
function setStatus(msg) {
  $('copied').textContent = msg;
  clearTimeout(statusTimer);
  if (msg) statusTimer = setTimeout(() => { $('copied').textContent = ''; }, 4000);
}

/* ---------- Renk yardımcıları ---------- */
function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(f, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(rgb) { return '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join(''); }
function mixHex(a, b, t) { const A = hexToRgb(a); const B = hexToRgb(b); return rgbToHex(A.map((v, i) => v + (B[i] - v) * t)); }
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) { const l1 = luminance(a); const l2 = luminance(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); }
const textOn = (bg) => (contrast(bg, '#ffffff') >= contrast(bg, DARK_BG) ? '#ffffff' : DARK_BG);
function readableOnDark(color) {
  let c = color;
  for (let i = 0; i < 12 && contrast(c, DARK_BG) < 4.5; i++) c = mixHex(c, '#ffffff', 0.2);
  return c;
}

/* ---------- Bağlantı yardımcıları ---------- */
// Yalnızca http/https adresleri kabul edilir; javascript: gibi şemalar reddedilir.
function safeUrl(raw) {
  let s = String(raw).trim();
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) {
    // "ornek.com:8080" bağlantı noktasıdır; "javascript:x" gibi şemalar reddedilir.
    if (/^[a-z][a-z0-9+.-]*:(?!\d)/i.test(s)) return '';
    s = 'https://' + s.replace(/^\/\//, '');
  }
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : '';
  } catch { return ''; }
}
// Kullanıcı adı ya da tam adres; geçersizse { bad: true }.
function socialUrl(raw, base) {
  const s = String(raw).trim();
  if (!s) return { url: '' };
  if (/^https?:\/\//i.test(s) || /^www\./i.test(s) || s.includes('/')) {
    const u = safeUrl(s);
    return u ? { url: u } : { bad: true };
  }
  const handle = s.replace(/^@/, '');
  return /^[\w.\-]+$/.test(handle) ? { url: base + handle } : { bad: true };
}
// Telefonu tel: bağlantısı için normalleştirir (başında 0 varsa Türkiye +90 kabul edilir).
function telNumber(raw) {
  let d = String(raw).replace(/[^\d+]/g, '');
  if (!/\d/.test(d)) return '';
  if (d.startsWith('+')) return '+' + d.slice(1).replace(/\+/g, '');
  d = d.replace(/\+/g, '');
  if (d.startsWith('00')) return '+' + d.slice(2);
  if (d.startsWith('0')) return '+90' + d.slice(1);
  if (d.length === 10) return '+90' + d;
  return d;
}

/* ---------- Görsel (yerel dosya → küçük data URI) ---------- */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode')); };
    img.src = url;
  });
}
// Görüntü alanının iki katı çözünürlüğe (retina) küçültür; yuvarlak istenirse ortadan kare kırpar.
async function encodeImage(file, displayWidth, round) {
  const img = await loadImage(file);
  const nw = img.naturalWidth || displayWidth;
  const nh = img.naturalHeight || displayWidth;
  const target = Math.min(displayWidth * 2, 400);
  let sx = 0; let sy = 0; let sw = nw; let sh = nh;
  if (round) {
    const side = Math.min(nw, nh);
    sx = (nw - side) / 2; sy = (nh - side) / 2; sw = side; sh = side;
  }
  const scale = Math.min(1, target / sw);
  const cw = Math.max(1, Math.round(sw * scale));
  const ch = Math.max(1, Math.round(sh * scale));
  const canvas = document.createElement('canvas');
  canvas.width = cw; canvas.height = ch;
  const ctx = canvas.getContext('2d');
  const isJpeg = /jpe?g/i.test(file.type);
  if (isJpeg) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cw, ch); }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  const dataUri = canvas.toDataURL(isJpeg ? 'image/jpeg' : 'image/png', 0.85);
  // Görüntü yüksekliği: genişliğe oranla.
  return { dataUri, width: displayWidth, height: Math.max(1, Math.round(displayWidth * ch / cw)), px: [cw, ch] };
}

async function refreshImage() {
  const token = ++state.encoding;
  state.embedded = null;
  if (!state.file || $('f-img-src').value !== 'file') { updateImageInfo(); update(); return; }
  try {
    const res = await encodeImage(state.file, imgWidth(), $('f-img-round').checked);
    if (token !== state.encoding) return;
    state.embedded = res;
    setError('');
  } catch {
    if (token !== state.encoding) return;
    state.file = null;
    $('f-img-file').value = '';
    $('img-name').textContent = '';
    setError('Görsel okunamadı. Dosya bozuk ya da desteklenmeyen bir biçimde olabilir; PNG, JPG veya WebP bir görsel seçip tekrar deneyin.');
  }
  updateImageInfo();
  update();
}

function imgWidth() {
  const n = Math.round(Number($('f-img-w').value));
  return Number.isFinite(n) && n > 0 ? Math.min(300, Math.max(40, n)) : 96;
}

function updateImageInfo() {
  const el = $('img-info');
  const src = $('f-img-src').value;
  $('wrap-file').hidden = src !== 'file';
  $('wrap-url').hidden = src !== 'url';
  $('wrap-img-opts').hidden = src === 'none';
  if (src === 'file' && state.embedded) {
    const chars = state.embedded.dataUri.length;
    const bytes = Math.round(chars * 3 / 4);
    let msg = `Gömülen görsel: ${state.embedded.px[0]} x ${state.embedded.px[1]} piksel, yaklaşık ${formatBytes(bytes)}. İmza koduna eklenen metin: yaklaşık ${formatBytes(chars)}.`;
    if (chars > EMBED_WARN_CHARS) msg += ' Görsel büyük: her e-postayla taşınır ve Gmail gibi istemcilerde imzayı bozabilir. Daha küçük bir görsel seçin ya da görüntü genişliğini azaltın.';
    el.textContent = msg;
    el.classList.toggle('is-warn', chars > EMBED_WARN_CHARS);
  } else {
    el.textContent = '';
    el.classList.remove('is-warn');
  }
}

/* ---------- Veri toplama ---------- */
function imageSpec(preview) {
  const src = $('f-img-src').value;
  const w = imgWidth();
  const round = $('f-img-round').checked;
  if (src === 'file' && state.embedded) {
    return { ok: true, src: state.embedded.dataUri, w, h: state.embedded.height, round, remote: false };
  }
  if (src === 'url') {
    const u = safeUrl(val('f-img-url'));
    if (!u) return { ok: false };
    // Gizlilik: önizlemede uzak adres yüklenmez, gri yer tutucu gösterilir.
    const ph = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" fill="#d0d3d8"/><text x="48" y="52" font-family="Arial" font-size="11" text-anchor="middle" fill="#3b4048">Görsel</text></svg>');
    return { ok: true, src: preview ? ph : u, w, h: round ? w : 0, round, remote: true };
  }
  return { ok: false };
}

function collect() {
  const raw = {};
  for (const k of FIELDS) raw[k] = val('f-' + k);
  const img = imageSpec(false);
  const filled = FIELDS.some((k) => raw[k]) || img.ok;
  const s = filled ? raw : SAMPLE;
  const warnings = [];
  const d = { filled, name: s.name, title: s.title, company: s.company, address: s.address, note: s.note, phone: s.phone, warnings };

  if (s.phone) {
    const tel = telNumber(s.phone);
    d.phoneHref = tel ? 'tel:' + tel : '';
    if (!tel) warnings.push('Telefon alanında rakam yok; bağlantı eklenmedi. Örnek: 0412 000 00 00');
  }
  d.email = s.email;
  if (s.email) {
    if (EMAIL_RE.test(s.email)) d.emailHref = 'mailto:' + s.email;
    else warnings.push('E-posta adresi geçersiz görünüyor; bağlantı eklenmedi. Örnek biçim: ad@ornek.com');
  }
  d.web = s.web;
  if (s.web) {
    d.webHref = safeUrl(s.web);
    d.webText = s.web.replace(/^https?:\/\//i, '').replace(/\/$/, '');
    if (!d.webHref) warnings.push('Web adresi anlaşılamadı; bağlantı eklenmedi. https://ornek.com gibi yazın.');
  }
  d.social = [];
  const addSocial = (label, key, base) => {
    if (!s[key]) return;
    const r = socialUrl(s[key], base);
    if (r.url) d.social.push({ label, href: r.url });
    else warnings.push(`${label} bağlantısı anlaşılamadı. Kullanıcı adınızı ya da https:// ile başlayan tam adresi yazın.`);
  };
  addSocial('LinkedIn', 'linkedin', 'https://www.linkedin.com/in/');
  addSocial('Instagram', 'instagram', 'https://www.instagram.com/');
  addSocial('X', 'x', 'https://x.com/');
  if (s.whatsapp) {
    const digits = telNumber(s.whatsapp).replace(/\D/g, '');
    if (digits.length >= 8) d.social.push({ label: 'WhatsApp', href: 'https://wa.me/' + digits });
    else warnings.push('WhatsApp numarası eksik görünüyor; bağlantı eklenmedi. Alan koduyla birlikte tam numarayı yazın (örnek: 0542 000 00 00).');
  }
  return d;
}

/* ---------- İmza HTML'i ---------- */
function theme(layout) {
  const font = FONTS[$('f-font').value] || FONTS.arial;
  const size = Number($('f-size').value) || 14;
  const accent = $('f-accent').value || '#7b2331';
  const base = { font, size, accent };
  if (layout === 'koyu') {
    return { ...base, text: '#f2f2f2', nameColor: '#ffffff', muted: '#b9bcc2', link: readableOnDark(accent), line: '#3d4046', dark: true };
  }
  const text = $('f-text').value || '#222222';
  return { ...base, text, nameColor: text, muted: mixHex(text, '#ffffff', 0.38), link: accent, line: '#d9d9d9', dark: false };
}

// Aynı CSS özelliği iki kez yazılmasın diye ek stil, temel stilin üzerine biner.
function mergeStyle(base, extra) {
  const map = new Map();
  for (const decl of (base + extra).split(';')) {
    const i = decl.indexOf(':');
    if (i > 0) map.set(decl.slice(0, i).trim(), decl.slice(i + 1).trim());
  }
  return [...map].map(([k, v]) => k + ':' + v + ';').join('');
}

function buildHtml(preview) {
  const d = collect();
  const layout = $('f-layout').value;
  const t = theme(layout);
  const img = imageSpec(preview);
  const baseStyle = `font-family:${t.font};font-size:${t.size}px;line-height:1.5;color:${t.text};`;
  const row = (inner, style = '', attrs = '') => `<tr><td${attrs} style="${mergeStyle(baseStyle, style)}">${inner}</td></tr>`;
  const spacer = (h) => `<tr><td height="${h}" style="height:${h}px;line-height:${h}px;font-size:0;">&nbsp;</td></tr>`;
  const stack = (rows) => `<table cellpadding="0" cellspacing="0" border="0" role="presentation">\n${rows.join('\n')}\n</table>`;
  const link = (href, text, color = t.link) => `<a href="${esc(href)}" style="color:${color};text-decoration:none;">${esc(text)}</a>`;
  const label = (s) => `<span style="color:${t.muted};">${s}</span>&nbsp; `;

  const imgTag = () => {
    if (!img.ok) return '';
    const hAttr = img.h ? ` height="${img.h}"` : '';
    let style = `display:block;border:0;outline:none;width:${img.w}px;max-width:${img.w}px;`;
    style += img.h && img.round ? `height:${img.h}px;object-fit:cover;` : 'height:auto;';
    if (img.round) style += 'border-radius:50%;';
    return `<img src="${esc(img.src)}" alt="${esc(d.company || d.name || 'Logo')}" width="${img.w}"${hAttr} style="${style}">`;
  };
  const imgRow = () => (img.ok ? [row(imgTag(), 'padding:0 0 10px 0;')] : []);

  const nameRows = (c = {}) => {
    const r = [];
    if (d.name) r.push(row(`<strong>${esc(d.name)}</strong>`, `font-size:${t.size + 5}px;line-height:1.3;color:${c.name || t.nameColor};`));
    if (d.title) r.push(row(esc(d.title), `color:${c.sub || t.text};`));
    if (d.company) r.push(row(`<strong>${esc(d.company)}</strong>`, `color:${c.company || t.link};`));
    return r;
  };
  const contactRows = () => {
    const r = [];
    const line = (lab, inner) => r.push(row(label(lab) + inner, 'padding:0 0 2px 0;'));
    if (d.phone) line('Tel', d.phoneHref ? link(d.phoneHref, d.phone) : esc(d.phone));
    if (d.email) line('E-posta', d.emailHref ? link(d.emailHref, d.email) : esc(d.email));
    if (d.web) line('Web', d.webHref ? link(d.webHref, d.webText) : esc(d.web));
    if (d.address) line('Adres', esc(d.address));
    if (d.social.length) {
      const sep = `<span style="color:${t.muted};">&nbsp;|&nbsp;</span>`;
      r.push(row(d.social.map((x) => link(x.href, x.label)).join(sep), 'padding:6px 0 0 0;'));
    }
    return r;
  };
  const noteRows = () => (d.note
    ? [spacer(8), row(esc(d.note).replace(/\n/g, '<br>'), `font-size:${Math.max(10, t.size - 2)}px;color:${t.muted};border-top:1px solid ${t.line};padding:8px 0 0 0;`)]
    : []);
  const contact = contactRows();
  // Görsel sütunu görselin genişliği kadar olur; kalan alan metne kalır.
  const imgColStyle = `width:${img.ok ? img.w + 16 : 0}px;padding:0 16px 0 0;`;
  const gap = contact.length ? [spacer(8)] : [];
  const cols = (left, right, ls, rs) => `<tr><td valign="top" style="${baseStyle}${ls}">${left}</td><td valign="top" style="${baseStyle}${rs}">${right}</td></tr>`;
  const innerTable = (inner) => `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="width:100%;">\n${inner}\n</table>`;

  let inner;
  if (layout === 'cizgili') {
    inner = `<tr><td style="${baseStyle}border-left:4px solid ${t.accent};padding:2px 0 2px 16px;">${stack([...imgRow(), ...nameRows(), ...gap, ...contact, ...noteRows()])}</td></tr>`;
  } else if (layout === 'iki-sutun') {
    inner = cols(stack([...imgRow(), ...nameRows()]), stack([...contact, ...noteRows()]),
      `width:${Math.max(200, img.ok ? img.w + 18 : 0)}px;padding:0 18px 0 0;border-right:1px solid ${t.line};`, 'padding:0 0 0 18px;');
  } else if (layout === 'kartvizit') {
    const cardBg = '#f7f6f4';
    const bar = `<tr><td height="6" bgcolor="${t.accent}" style="background-color:${t.accent};height:6px;line-height:6px;font-size:0;border-radius:8px 8px 0 0;">&nbsp;</td></tr>`;
    const bodyCols = img.ok
      ? cols(stack(imgRow()), stack([...nameRows(), ...gap, ...contact, ...noteRows()]), imgColStyle, 'padding:0;')
      : `<tr><td style="${baseStyle}">${stack([...nameRows(), ...gap, ...contact, ...noteRows()])}</td></tr>`;
    inner = `<tr><td bgcolor="${cardBg}" style="${baseStyle}background-color:${cardBg};border:1px solid ${t.line};border-radius:8px;">${innerTable(`${bar}\n<tr><td style="padding:16px 18px;">${innerTable(bodyCols)}</td></tr>`)}</td></tr>`;
  } else if (layout === 'bordo') {
    const bandText = textOn(t.accent);
    const band = `<tr><td bgcolor="${t.accent}" style="${baseStyle}background-color:${t.accent};padding:14px 18px;">${stack(nameRows({ name: bandText, sub: bandText, company: bandText }))}</td></tr>`;
    const bodyInner = img.ok
      ? innerTable(cols(stack(imgRow()), stack([...contact, ...noteRows()]), imgColStyle, 'padding:0;'))
      : stack([...contact, ...noteRows()]);
    inner = `${band}\n<tr><td style="${baseStyle}padding:14px 18px;border:1px solid ${t.line};border-top:0;">${bodyInner}</td></tr>`;
  } else if (layout === 'koyu') {
    const right = stack([...nameRows(), ...gap, ...contact, ...noteRows()]);
    const body = img.ok ? innerTable(cols(stack(imgRow()), right, imgColStyle, 'padding:0;')) : right;
    inner = `<tr><td bgcolor="${DARK_BG}" style="${baseStyle}background-color:${DARK_BG};padding:18px 20px;border-radius:6px;">${body}</td></tr>`;
  } else {
    // sade
    inner = [...imgRow(), ...nameRows(), ...gap, ...contact, ...noteRows()].join('\n');
  }
  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="600" style="width:600px;max-width:100%;border-collapse:collapse;${baseStyle}">\n${inner}\n</table>`;
}

function plainText() {
  const d = collect();
  const lines = [];
  if (d.name) lines.push(d.name);
  const tc = [d.title, d.company].filter(Boolean).join(' | ');
  if (tc) lines.push(tc);
  if (lines.length) lines.push('');
  if (d.phone) lines.push('Tel: ' + d.phone);
  if (d.email) lines.push('E-posta: ' + d.email);
  if (d.web) lines.push('Web: ' + (d.webHref || d.web));
  if (d.address) lines.push('Adres: ' + d.address);
  d.social.forEach((x) => lines.push(`${x.label}: ${x.href}`));
  if (d.note) { lines.push(''); lines.push(d.note); }
  return lines.join('\n').trim();
}

/* ---------- Güncelleme ---------- */
function update() {
  const d = collect();
  const layout = $('f-layout').value;
  const warns = [...d.warnings];
  const accent = $('f-accent').value || '#7b2331';
  if (layout !== 'koyu') {
    const ca = contrast(accent, '#ffffff');
    if (ca < 4.5) warns.push(`Vurgu rengi beyaz zeminde zor okunur (kontrast ${ca.toFixed(1)}:1; en az 4,5:1 önerilir). Daha koyu bir renk seçin.`);
    const ct = contrast($('f-text').value || '#222222', '#ffffff');
    if (ct < 4.5) warns.push(`Yazı rengi beyaz zeminde zor okunur (kontrast ${ct.toFixed(1)}:1). Daha koyu bir yazı rengi seçin.`);
  }
  const src = $('f-img-src').value;
  if (src === 'url') {
    const u = val('f-img-url');
    if (u && !safeUrl(u)) warns.push('Görsel adresi geçersiz; görsel eklenmedi. https://ornek.com/logo.png gibi tam bir adres yazın.');
    else if (/^http:\/\//i.test(u)) warns.push('Görsel adresi http:// ile başlıyor; birçok e-posta istemcisi güvenli olmayan görselleri engeller. https:// adresi kullanın.');
  }
  if (src === 'file' && !state.file) warns.push('Bilgisayardan bir görsel seçin ya da "Görsel kullanma" seçeneğine dönün.');
  $('warns').innerHTML = warns.map((w) => `<p>${esc(w)}</p>`).join('');

  $('out').value = d.filled ? buildHtml(false) : '';
  $('preview').innerHTML = buildHtml(true);
  $('preview-note').hidden = d.filled;
  $('f-text').disabled = layout === 'koyu';
  $('text-hint').hidden = layout !== 'koyu';
}

/* ---------- Kopyalama / indirme ---------- */
function needOutput() {
  if (!$('out').value) { setError('Önce en az adınızı ya da bir iletişim bilgisi yazın; çıktı alanlar dolunca oluşur.'); return false; }
  setError('');
  return true;
}
function legacyCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}
// Eski tarayıcılar için: copy olayında text/html verisini biz yazarız (DOM'a görsel eklemeden).
function legacyCopyRich(html, plain) {
  const onCopy = (e) => { e.clipboardData.setData('text/html', html); e.clipboardData.setData('text/plain', plain); e.preventDefault(); };
  document.addEventListener('copy', onCopy);
  const ok = legacyCopyText(plain || ' ');
  document.removeEventListener('copy', onCopy);
  return ok;
}
async function copyCode() {
  if (!needOutput()) return;
  const v = $('out').value;
  let ok = false;
  try { await navigator.clipboard.writeText(v); ok = true; } catch { ok = legacyCopyText(v); }
  if (ok) setStatus('HTML kodu kopyalandı.');
  else setError('Kopyalanamadı. Çıktı alanındaki metni seçip Ctrl+C ile kopyalayın.');
}
async function copyRich() {
  if (!needOutput()) return;
  const html = $('out').value;
  const plain = plainText();
  let ok = false;
  try {
    if (!window.ClipboardItem || !navigator.clipboard || !navigator.clipboard.write) throw new Error('unsupported');
    await navigator.clipboard.write([new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([plain], { type: 'text/plain' }),
    })]);
    ok = true;
  } catch { ok = legacyCopyRich(html, plain); }
  if (ok) setStatus('Zengin imza kopyalandı. Şimdi e-posta programınızın imza kutusuna yapıştırın (Ctrl+V).');
  else setError('Zengin kopyalama bu tarayıcıda çalışmadı. "HTML olarak indir" ile dosyayı açıp içeriğini seçerek kopyalayabilirsiniz.');
}
function download() {
  if (!needOutput()) return;
  const doc = `<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<title>E-posta imzası</title>\n</head>\n<body>\n${$('out').value}\n</body>\n</html>\n`;
  downloadBlob(new Blob([doc], { type: 'text/html;charset=utf-8' }), 'eposta-imzasi.html');
  setStatus('İmza dosyası indirildi.');
}
$('btn-rich').addEventListener('click', copyRich);
$('btn-code').addEventListener('click', copyCode);
$('btn-dl').addEventListener('click', download);

/* ---------- Olaylar ---------- */
document.querySelectorAll('#form input, #form select, #form textarea').forEach((el) => {
  if (el.id === 'f-img-file') return;
  const handler = () => {
    if (el.id === 'f-img-src' || el.id === 'f-img-w' || el.id === 'f-img-round') refreshImage(); else update();
  };
  el.addEventListener('input', handler);
  el.addEventListener('change', handler);
});

$('f-img-file').addEventListener('change', () => {
  const file = $('f-img-file').files[0];
  if (!file) return;
  if (file.size > MAX_FILE) {
    $('f-img-file').value = '';
    setError('Seçilen dosya 50 MB üzerinde; imza için gereksiz büyük. Önce "Resim Küçült" aracıyla küçültüp tekrar seçin.');
    return;
  }
  if (!/^image\//.test(file.type) && !/\.(png|jpe?g|webp|gif|svg)$/i.test(file.name)) {
    $('f-img-file').value = '';
    setError('Bu dosya bir görsel değil. PNG, JPG, WebP, GIF ya da SVG seçin.');
    return;
  }
  setError('');
  state.file = file;
  $('img-name').textContent = file.name;
  refreshImage();
});

updateImageInfo();
update();
