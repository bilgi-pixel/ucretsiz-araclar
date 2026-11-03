// CV / Özgeçmiş Oluşturucu — form → canlı HTML önizleme → pdf-lib ile PDF.
// Türkçe karakterler için fontkit + DejaVu Sans gömülür. Hiçbir veri ağa gitmez:
// taslak yalnızca bu tarayıcının localStorage'ında ve kullanıcının indirdiği .json dosyasında durur.
import { setProgress, downloadBlob, formatBytes, showError, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const DRAFT_KEY = 'ba-cv-taslak-v1';
const MAX_PHOTO = 50 * 1024 * 1024;

/** Dinamik satır türleri: alan listesi [anahtar, etiket, tür, ipucu/seçenekler]. */
const ROW_DEFS = {
  exp: { list: 'list-exp', label: 'İş deneyimi', fields: [
    ['role', 'Pozisyon', 'text'],
    ['company', 'Şirket / kurum', 'text'],
    ['period', 'Dönem', 'text', 'Örn. 2021 – Günümüz'],
    ['desc', 'Görevler ve başarılar', 'area', 'Her satır bir madde olur; "- " ile başlayan satırlar madde işareti alır.'],
  ] },
  edu: { list: 'list-edu', label: 'Eğitim', fields: [
    ['school', 'Okul / üniversite', 'text'],
    ['degree', 'Bölüm / derece', 'text'],
    ['period', 'Dönem', 'text', 'Örn. 2015 – 2019'],
    ['desc', 'Not (isteğe bağlı)', 'area', 'Not ortalaması, bitirme projesi, burs gibi.'],
  ] },
  lang: { list: 'list-lang', label: 'Yabancı dil', fields: [
    ['name', 'Dil', 'text'],
    ['level', 'Seviye', 'select', ['', 'Ana dil', 'İleri', 'Orta', 'Başlangıç']],
  ] },
  cert: { list: 'list-cert', label: 'Sertifika', fields: [
    ['name', 'Sertifika / kurs adı', 'text'],
    ['desc', 'Kurum ve yıl', 'text', 'Örn. Google · 2023'],
  ] },
};
const TEXT_KEYS = ['name', 'title', 'email', 'phone', 'city', 'link', 'summary', 'skills'];

let photoData = '';
let resultBlob = null;
let uid = 0;
let saveTimer = null;

// ---------- Form satırları ----------

function makeRow(kind, vals = {}) {
  const def = ROW_DEFS[kind];
  const row = document.createElement('div');
  row.className = 'cv-row';
  row.dataset.kind = kind;
  row.setAttribute('role', 'group');
  row.setAttribute('aria-label', def.label);
  const grid = document.createElement('div');
  grid.className = 'cv-grid';
  for (const [key, label, type, extra] of def.fields) {
    const id = `cv-${kind}-${key}-${++uid}`;
    const wrap = document.createElement('div');
    wrap.className = 'ba-field' + (type === 'area' ? ' cv-wide' : '');
    const lb = document.createElement('label');
    lb.htmlFor = id; lb.textContent = label;
    let input;
    if (type === 'area') { input = document.createElement('textarea'); input.rows = 3; }
    else if (type === 'select') {
      input = document.createElement('select');
      for (const o of extra) { const op = document.createElement('option'); op.value = o; op.textContent = o || 'Seçin'; input.appendChild(op); }
    } else { input = document.createElement('input'); input.type = 'text'; }
    input.id = id; input.dataset.k = key; input.value = vals[key] || '';
    if (type !== 'select') input.maxLength = type === 'area' ? 6000 : 120;
    if (type !== 'select') input.autocomplete = 'off';
    wrap.append(lb, input);
    if (type !== 'select' && extra) { const h = document.createElement('div'); h.className = 'hint'; h.textContent = extra; wrap.appendChild(h); }
    grid.appendChild(wrap);
  }
  const rm = document.createElement('button');
  rm.type = 'button'; rm.className = 'ba-btn cv-remove';
  rm.textContent = 'Bu satırı sil';
  rm.setAttribute('aria-label', `${def.label} satırını sil`);
  rm.addEventListener('click', () => { row.remove(); onChange(); });
  row.append(grid, rm);
  $(def.list).appendChild(row);
  return row;
}

function readRows(kind) {
  const out = [];
  for (const row of $(ROW_DEFS[kind].list).querySelectorAll('.cv-row')) {
    const o = {};
    for (const el of row.querySelectorAll('[data-k]')) o[el.dataset.k] = el.value.trim();
    if (Object.values(o).some(Boolean)) out.push(o);
  }
  return out;
}

/** Formdaki her şeyi tek bir nesneye toplar. */
function collect() {
  const d = { template: (document.querySelector('input[name="tpl"]:checked') || {}).value || 'klasik', photo: photoData, refs: $('f-refs').checked };
  for (const k of TEXT_KEYS) d[k] = $('f-' + k).value.trim();
  for (const kind of Object.keys(ROW_DEFS)) d[kind] = readRows(kind);
  return d;
}

/** Güvenilmeyen (dosyadan gelen) veriyi biçime sokar. */
function normalize(raw) {
  const str = (v, n = 1500) => (typeof v === 'string' ? v.slice(0, n) : '');
  const d = { template: ['klasik', 'modern', 'ats'].includes(raw.template) ? raw.template : 'klasik', refs: !!raw.refs };
  for (const k of TEXT_KEYS) d[k] = str(raw[k], k === 'summary' || k === 'skills' ? 3000 : 200);
  d.photo = typeof raw.photo === 'string' && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(raw.photo) && raw.photo.length < 3_000_000 ? raw.photo : '';
  for (const [kind, def] of Object.entries(ROW_DEFS)) {
    const arr = Array.isArray(raw[kind]) ? raw[kind].slice(0, 30) : [];
    d[kind] = arr.filter((r) => r && typeof r === 'object').map((r) => Object.fromEntries(def.fields.map(([k]) => [k, str(r[k], k === 'desc' ? 6000 : 200)])));
  }
  return d;
}

function fillForm(d) {
  for (const k of TEXT_KEYS) $('f-' + k).value = d[k] || '';
  $('f-refs').checked = !!d.refs;
  const radio = document.querySelector(`input[name="tpl"][value="${d.template}"]`);
  if (radio) radio.checked = true;
  photoData = d.photo || '';
  updatePhotoUi();
  for (const [kind, def] of Object.entries(ROW_DEFS)) {
    $(def.list).textContent = '';
    for (const r of d[kind] || []) makeRow(kind, r);
  }
}

// ---------- Fotoğraf ----------

function updatePhotoUi() {
  $('photo-preview').hidden = !photoData;
  if (photoData) $('photo-preview').src = photoData;
  $('photo-remove').hidden = !photoData;
}

$('f-photo').addEventListener('change', async () => {
  const file = $('f-photo').files[0];
  $('f-photo').value = '';
  if (!file) return;
  showError($('error'), null);
  if (!/^image\//.test(file.type) && !/\.(jpe?g|png|webp|gif|bmp)$/i.test(file.name)) {
    showError($('error'), `"${file.name}" bir resim dosyası değil. JPG, PNG veya WebP biçiminde bir vesikalık fotoğraf seçin.`);
    return;
  }
  if (file.size > MAX_PHOTO) {
    showError($('error'), `Fotoğraf ${formatBytes(file.size)}; çok büyük. Önce "Resim Küçült" aracıyla boyutunu düşürüp yeniden seçin.`);
    return;
  }
  try {
    const bmp = await createImageBitmap(file);
    // Ortadan kare kırp, 400 piksele indir, JPEG olarak sakla (PDF ve taslak küçük kalır).
    const side = Math.min(bmp.width, bmp.height);
    const cv = document.createElement('canvas');
    cv.width = cv.height = Math.min(400, side);
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, cv.width, cv.height);
    bmp.close && bmp.close();
    photoData = cv.toDataURL('image/jpeg', 0.85);
    updatePhotoUi();
    onChange();
  } catch (err) {
    console.error(err);
    showError($('error'), 'Fotoğraf okunamadı. Dosya bozuk olabilir; fotoğrafı başka bir programda JPG olarak kaydedip yeniden seçin.');
  }
});
$('photo-remove').addEventListener('click', () => { photoData = ''; updatePhotoUi(); onChange(); });

// ---------- Canlı önizleme (HTML) ----------

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function descNode(text) {
  const box = el('div', 'cv-desc');
  box.textContent = text.split(/\r?\n/).map((l) => l.replace(/^\s*[-•*–]\s+/, '• ')).join('\n');
  return box;
}
const skillList = (s) => s.split(/[,;\n]+/).map((x) => x.trim()).filter(Boolean);

function renderPreview(d) {
  const root = $('preview');
  root.textContent = '';
  const sheet = el('div', `cv-sheet t-${d.template}`);
  const contacts = [d.email, d.phone, d.city, d.link].filter(Boolean);
  const section = (title, ...nodes) => { const s = el('section', 'cv-sec'); s.appendChild(el('h4', '', title)); nodes.forEach((n) => s.appendChild(n)); return s; };
  const items = (arr, mk) => { const f = document.createDocumentFragment(); arr.forEach((x) => f.appendChild(mk(x))); return f; };

  const secSummary = () => d.summary && section('Özet', el('p', 'cv-desc', d.summary));
  const secExp = () => d.exp.length && section('İş deneyimi', items(d.exp, (x) => {
    const it = el('div', 'cv-item');
    it.appendChild(el('strong', '', x.role));
    const meta = [x.company, x.period].filter(Boolean).join('  |  ');
    if (meta) it.appendChild(el('div', 'cv-meta', meta));
    if (x.desc) it.appendChild(descNode(x.desc));
    return it;
  }));
  const secEdu = () => d.edu.length && section('Eğitim', items(d.edu, (x) => {
    const it = el('div', 'cv-item');
    it.appendChild(el('strong', '', x.school));
    const meta = [x.degree, x.period].filter(Boolean).join('  |  ');
    if (meta) it.appendChild(el('div', 'cv-meta', meta));
    if (x.desc) it.appendChild(descNode(x.desc));
    return it;
  }));
  const secSkills = () => skillList(d.skills).length && section('Beceriler', (() => {
    if (d.template === 'modern') { const ul = el('ul', 'cv-list'); skillList(d.skills).forEach((s) => ul.appendChild(el('li', '', s))); return ul; }
    return el('p', '', skillList(d.skills).join(d.template === 'ats' ? ', ' : ' · '));
  })());
  const secLang = () => d.lang.length && section('Diller', (() => {
    const ul = el('ul', 'cv-list');
    d.lang.forEach((x) => ul.appendChild(el('li', '', [x.name, x.level].filter(Boolean).join(' — '))));
    return ul;
  })());
  const secCert = () => d.cert.length && section('Sertifikalar', (() => {
    const ul = el('ul', 'cv-list');
    d.cert.forEach((x) => ul.appendChild(el('li', '', [x.name, x.desc].filter(Boolean).join(' — '))));
    return ul;
  })());
  const secRefs = () => d.refs && section('Referanslar', el('p', '', 'İstek üzerine sunulur.'));
  const secContact = () => contacts.length && section('İletişim', (() => {
    const ul = el('ul', 'cv-list'); contacts.forEach((c) => ul.appendChild(el('li', '', c))); return ul;
  })());
  const add = (parent, ...secs) => secs.forEach((s) => { if (s) parent.appendChild(s); });
  const head = () => {
    const h = el('header', 'cv-head');
    const txt = el('div');
    txt.appendChild(el('h3', '', d.name || 'Ad Soyad'));
    if (d.title) txt.appendChild(el('div', 'cv-title', d.title));
    if (d.template !== 'modern' && contacts.length) txt.appendChild(el('div', 'cv-contact', contacts.join(' · ')));
    h.appendChild(txt);
    if (d.photo && d.template === 'klasik') { const im = el('img', 'cv-photo'); im.src = d.photo; im.alt = 'Fotoğraf'; h.appendChild(im); }
    return h;
  };

  if (d.template === 'modern') {
    const side = el('aside', 'cv-side');
    if (d.photo) { const im = el('img', 'cv-photo'); im.src = d.photo; im.alt = 'Fotoğraf'; side.appendChild(im); }
    add(side, secContact(), secSkills(), secLang());
    const main = el('div', 'cv-main');
    main.appendChild(head());
    add(main, secSummary(), secExp(), secEdu(), secCert(), secRefs());
    sheet.append(side, main);
  } else {
    sheet.appendChild(head());
    add(sheet, secSummary(), secExp(), secEdu(), secSkills(), secLang(), secCert(), secRefs());
  }
  root.appendChild(sheet);
  $('preview-note').hidden = d.template !== 'ats' || !d.photo;
}

// ---------- Taslak (localStorage + JSON) ----------

function saveDraft(d) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    $('draft-status').textContent = 'Taslak bu tarayıcıya otomatik kaydedildi (sunucuya gönderilmez).';
  } catch {
    $('draft-status').textContent = 'Taslak tarayıcıya kaydedilemedi (depolama dolu ya da kapalı). .json olarak indirmeyi deneyin.';
  }
}

function onChange() {
  resultBlob = null;
  $('result').classList.remove('is-active');
  const d = collect();
  renderPreview(d);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveDraft(d), 400);
}
$('form').addEventListener('input', onChange);
$('form').addEventListener('change', onChange);
$('form').addEventListener('submit', (e) => e.preventDefault());

document.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => {
  const row = makeRow(b.dataset.add);
  const first = row.querySelector('input,textarea,select');
  if (first) first.focus();
  onChange();
}));

$('json-save').addEventListener('click', () => {
  const d = collect();
  const blob = new Blob([JSON.stringify({ app: 'bilisimajans-cv', version: 1, ...d }, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `cv-taslak${d.name ? '-' + fileSlug(d.name) : ''}.json`);
  $('draft-status').textContent = 'Taslak .json dosyası olarak bilgisayarınıza indirildi.';
});

$('json-input').addEventListener('change', async () => {
  const file = $('json-input').files[0];
  $('json-input').value = '';
  if (!file) return;
  showError($('error'), null);
  try {
    if (file.size > 8 * 1024 * 1024) throw new Error('BIG');
    const raw = JSON.parse(await file.text());
    if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.app !== 'bilisimajans-cv') throw new Error('FORMAT');
    fillForm(normalize(raw));
    onChange();
    $('draft-status').textContent = `"${file.name}" taslağı yüklendi.`;
  } catch (err) {
    showError($('error'), `"${file.name}" geçerli bir CV taslağı değil. Bu sayfadan "Taslağı .json olarak kaydet" ile indirdiğiniz dosyayı seçin; dosyayı elle düzenlediyseniz bozulmuş olabilir.`);
  }
});

$('draft-clear').addEventListener('click', () => {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* yok say */ }
  clearTimeout(saveTimer);
  fillForm(normalize({}));
  makeRow('exp'); makeRow('edu'); makeRow('lang');
  renderPreview(collect());
  showError($('error'), null);
  resultBlob = null;
  $('result').classList.remove('is-active');
  $('draft-status').textContent = 'Taslak silindi: formdaki bilgiler ve tarayıcıdaki kayıt temizlendi.';
  $('f-name').focus();
});

function fileSlug(s) {
  return s.normalize('NFC').replace(/[\\/:*?"<>|]+/g, ' ').trim().replace(/\s+/g, '-').slice(0, 60);
}

// ---------- PDF ----------

let fontCache = null;
async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

function dataUrlToBytes(url) {
  const bin = atob(url.slice(url.indexOf(',') + 1));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function buildPdf(d) {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fontData = await loadFonts();
  const { rgb } = PDFLib;
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(`${d.name} – Özgeçmiş`);
  doc.setAuthor(d.name);
  const reg = await doc.embedFont(fontData.regular, { subset: true });
  const bold = await doc.embedFont(fontData.bold, { subset: true });
  const photo = d.photo && d.template !== 'ats' ? await doc.embedJpg(dataUrlToBytes(d.photo)) : null;

  // Yazı tipinde olmayan karakterleri "?" yap (emoji vb.).
  let charset = null;
  try { charset = new Set(reg.getCharacterSet()); } catch { charset = null; }
  let replaced = 0;
  const T = (s) => {
    let out = '';
    for (const ch of String(s || '')) {
      const cp = ch.codePointAt(0);
      if (ch === '\t') { out += '    '; continue; }
      if (ch === '\n') { out += ch; continue; }
      if (cp === 0xa0) { out += ' '; continue; }
      if (cp < 32 || cp === 0x7f || (cp >= 0x200b && cp <= 0x200f) || cp === 0xfeff || cp === 0xfffd) continue;
      if (charset && !charset.has(cp)) { out += '?'; replaced++; continue; }
      out += ch;
    }
    return out;
  };
  const upper = (s) => T(s).toLocaleUpperCase('tr-TR');

  const PW = 595.28, PH = 841.89, MT = 40, MB = 40, BASE = 9.5;
  const bordo = rgb(0.482, 0.137, 0.192);
  const ink = rgb(0.1, 0.1, 0.1), muted = rgb(0.38, 0.38, 0.4), white = rgb(1, 1, 1);
  const modern = d.template === 'modern', ats = d.template === 'ats';
  const SIDE = 190;
  const pages = [];
  const bg = modern ? (p) => p.drawRectangle({ x: 0, y: 0, width: SIDE, height: PH, color: bordo }) : null;

  const newCol = (x, w) => ({ x, w, pi: 0, y: PH - MT });
  const pageOf = (c) => {
    while (pages.length <= c.pi) { const p = doc.addPage([PW, PH]); pages.push(p); if (bg) bg(p); }
    return pages[c.pi];
  };
  /** Sığmıyorsa sütunu sonraki sayfaya taşır (sayfanın en üstündeyse taşımaz). */
  const ensure = (c, h) => { if (c.y - h < MB && c.y < PH - MT - 0.5) { c.pi++; c.y = PH - MT; } return pageOf(c); };

  const wrap = (text, font, size, width) => {
    const wd = (t) => font.widthOfTextAtSize(t, size);
    const lines = []; let cur = ''; let curW = 0;
    for (let tok of text.match(/\S+\s*|\s+/g) || []) {
      let guard = 0;
      while (tok && guard++ < 10000) {
        const full = wd(tok), trimmed = wd(tok.trimEnd());
        if (curW + trimmed <= width) { cur += tok; curW += full; tok = ''; break; }
        if (cur.trim()) { lines.push(cur.trimEnd()); cur = ''; curW = 0; tok = tok.trimStart(); continue; }
        if (trimmed <= width) { cur = tok.trimStart(); curW = wd(cur); tok = ''; break; }
        let n = 0; let acc = 0;
        for (const ch of tok) { const cw = wd(ch); if (acc + cw > width && n > 0) break; acc += cw; n += ch.length; }
        lines.push(tok.slice(0, n)); tok = tok.slice(n); cur = ''; curW = 0;
      }
    }
    if (cur.length || !lines.length) lines.push(cur.trimEnd());
    return lines;
  };

  const lines = (c, text, o = {}) => {
    const font = o.font || reg, size = o.size || BASE, lead = o.lead || size * 1.4;
    const x = o.x ?? c.x, w = o.w ?? c.w;
    for (const l of wrap(T(text), font, size, w)) {
      const p = ensure(c, lead);
      if (l) p.drawText(l, { x, y: c.y - size, size, font, color: o.color || ink });
      c.y -= lead;
    }
  };
  /** Çok satırlı metin; "- " ile başlayan satırlar madde işaretlidir. */
  const para = (c, text, o = {}) => {
    const size = o.size || BASE;
    for (const raw of T(text).split('\n')) {
      if (!raw.trim()) { c.y -= size * 0.5; continue; }
      const m = raw.match(/^\s*[-•*–]\s+(.*)$/);
      if (m) {
        const lead = o.lead || size * 1.4;
        const p = ensure(c, lead);
        p.drawText('•', { x: c.x + 2, y: c.y - size, size, font: reg, color: o.color || ink });
        lines(c, m[1], { ...o, x: c.x + 12, w: c.w - 12 });
      } else lines(c, raw, o);
    }
  };
  const heading = (c, text, st) => {
    const size = st.headSize;
    const p = ensure(c, size * 1.4 + 36);
    p.drawText(upper(text), { x: c.x, y: c.y - size, size, font: bold, color: st.head });
    c.y -= size * 1.35;
    if (st.rule) {
      p.drawLine({ start: { x: c.x, y: c.y }, end: { x: c.x + c.w, y: c.y }, thickness: 0.8, color: st.rule });
      c.y -= 7;
    } else c.y -= 4;
  };

  // Biçem: ana sütun ve (modern şablonda) kenar çubuğu
  const mainSt = { head: ats ? ink : modern ? bordo : ink, headSize: ats ? 10.5 : 11, rule: ats ? null : modern ? bordo : rgb(0.65, 0.65, 0.68), fg: ink, muted };
  const sideSt = { head: white, headSize: 10.5, rule: rgb(0.9, 0.72, 0.77), fg: white, muted: rgb(0.93, 0.85, 0.87) };

  const skills = d.skills.split(/[,;\n]+/).map((x) => x.trim()).filter(Boolean);
  const contacts = [d.email, d.phone, d.city, d.link].filter(Boolean);
  const gap = (c, n) => { c.y -= n; };

  const S = {
    summary: (c, st) => { if (!d.summary) return; heading(c, 'Özet', st); para(c, d.summary, { color: st.fg }); gap(c, 10); },
    exp: (c, st) => {
      if (!d.exp.length) return;
      heading(c, 'İş deneyimi', st);
      for (const x of d.exp) {
        ensure(c, 46);
        if (x.role) lines(c, x.role, { font: bold, size: 10.5, color: st.fg });
        const meta = [x.company, x.period].filter(Boolean).join('  |  ');
        if (meta) lines(c, meta, { color: st.muted, size: 9 });
        if (x.desc) para(c, x.desc, { color: st.fg });
        gap(c, 8);
      }
      gap(c, 2);
    },
    edu: (c, st) => {
      if (!d.edu.length) return;
      heading(c, 'Eğitim', st);
      for (const x of d.edu) {
        ensure(c, 40);
        if (x.school) lines(c, x.school, { font: bold, size: 10.5, color: st.fg });
        const meta = [x.degree, x.period].filter(Boolean).join('  |  ');
        if (meta) lines(c, meta, { color: st.muted, size: 9 });
        if (x.desc) para(c, x.desc, { color: st.fg });
        gap(c, 8);
      }
      gap(c, 2);
    },
    skills: (c, st, asList) => {
      if (!skills.length) return;
      heading(c, 'Beceriler', st);
      if (asList) skills.forEach((s) => para(c, `- ${s}`, { color: st.fg, size: 9 }));
      else para(c, skills.join(ats ? ', ' : '  ·  '), { color: st.fg });
      gap(c, 10);
    },
    lang: (c, st) => {
      if (!d.lang.length) return;
      heading(c, 'Diller', st);
      d.lang.forEach((x) => para(c, `- ${[x.name, x.level].filter(Boolean).join(' — ')}`, { color: st.fg, size: modern ? 9 : BASE }));
      gap(c, 10);
    },
    cert: (c, st) => {
      if (!d.cert.length) return;
      heading(c, 'Sertifikalar', st);
      d.cert.forEach((x) => para(c, `- ${[x.name, x.desc].filter(Boolean).join(' — ')}`, { color: st.fg }));
      gap(c, 10);
    },
    refs: (c, st) => { if (!d.refs) return; heading(c, 'Referanslar', st); para(c, 'İstek üzerine sunulur.', { color: st.fg }); gap(c, 10); },
    contact: (c, st) => {
      if (!contacts.length) return;
      heading(c, 'İletişim', st);
      contacts.forEach((x) => lines(c, x, { color: st.fg, size: 9, lead: 13 }));
      gap(c, 12);
    },
  };

  if (modern) {
    const side = newCol(24, SIDE - 48);
    const mx = SIDE + 30;
    const main = newCol(mx, PW - mx - 36);
    const p0 = pageOf(side);
    if (photo) {
      const ps = SIDE - 76;
      p0.drawImage(photo, { x: side.x + (side.w - ps) / 2, y: side.y - ps, width: ps, height: ps });
      side.y -= ps + 20;
    }
    lines(main, d.name, { font: bold, size: 24, lead: 29, color: bordo });
    if (d.title) lines(main, d.title, { size: 12, lead: 17, color: muted });
    gap(main, 14);
    S.contact(side, sideSt);
    S.skills(side, sideSt, true);
    S.lang(side, sideSt);
    S.summary(main, mainSt); S.exp(main, mainSt); S.edu(main, mainSt); S.cert(main, mainSt); S.refs(main, mainSt);
  } else {
    const M = 42;
    const c = newCol(M, PW - 2 * M - (photo ? 96 : 0));
    const p0 = pageOf(c);
    const top = c.y;
    lines(c, d.name, { font: bold, size: ats ? 18 : 24, lead: ats ? 23 : 29, color: ink });
    if (d.title) lines(c, d.title, { size: 12, lead: 17, color: muted });
    if (contacts.length) { gap(c, 3); lines(c, contacts.join('  ·  '), { size: 9, lead: 13, color: ink }); }
    if (photo) {
      p0.drawImage(photo, { x: PW - M - 84, y: top - 84, width: 84, height: 84 });
      c.y = Math.min(c.y, top - 84);
    }
    gap(c, 6);
    c.w = PW - 2 * M;
    if (!ats) { p0.drawLine({ start: { x: M, y: c.y }, end: { x: M + c.w, y: c.y }, thickness: 1.6, color: bordo }); c.y -= 14; }
    else c.y -= 6;
    S.summary(c, mainSt); S.exp(c, mainSt); S.edu(c, mainSt); S.skills(c, mainSt, false);
    S.lang(c, mainSt); S.cert(c, mainSt); S.refs(c, mainSt);
  }
  return { bytes: await doc.save({ useObjectStreams: false }), pages: pages.length, replaced };
}

$('make-pdf').addEventListener('click', async () => {
  const btn = $('make-pdf');
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const d = collect();
  if (!d.name) {
    showError($('error'), 'Ad soyad boş. CV\'nin en üstünde görünecek ad soyadınızı "Kişisel bilgiler" bölümüne yazın.');
    $('f-name').focus();
    return;
  }
  if (!d.summary && !d.exp.length && !d.edu.length && !skills(d)) {
    showError($('error'), 'CV neredeyse boş. En az bir iş deneyimi, eğitim, özet ya da beceri ekleyin; sonra tekrar deneyin.');
    return;
  }
  btn.disabled = true;
  setProgress($('progress'), 10, 'Yazı tipi ve PDF kütüphanesi yükleniyor…');
  await tick();
  try {
    const { bytes, pages, replaced } = await buildPdf(d);
    setProgress($('progress'), 100, 'PDF yazılıyor…');
    await tick();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    const name = `CV-${fileSlug(d.name)}.pdf`;
    const note = replaced ? ` · ${replaced} karakter (ör. emoji) yazı tipinde olmadığı için "?" ile değiştirildi` : '';
    $('result-info').textContent = `${pages} sayfa · ${formatBytes(resultBlob.size)} · ${name}${note}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
    downloadBlob(resultBlob, name);
    $('result').dataset.name = name;
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || '');
    showError($('error'), m === 'FONT' || /Yüklenemedi/.test(m)
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : /embedJpg|JPEG|SOI/i.test(m)
        ? 'Fotoğraf PDF\'e gömülemedi. Fotoğrafı kaldırıp başka bir JPG ile yeniden ekleyin.'
        : 'PDF oluşturulurken beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse metinleri kısaltın.');
  } finally {
    btn.disabled = false;
  }
});
function skills(d) { return d.skills.split(/[,;\n]+/).some((x) => x.trim()); }

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, $('result').dataset.name || 'cv.pdf'); });

// ---------- Başlangıç ----------

(function init() {
  let restored = false;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) { fillForm(normalize(JSON.parse(raw))); restored = true; }
  } catch { /* bozuk kayıt: boş formla başla */ }
  if (!restored) { makeRow('exp'); makeRow('edu'); makeRow('lang'); }
  else {
    for (const [kind, def] of Object.entries(ROW_DEFS)) if (!$(def.list).children.length && kind !== 'cert') makeRow(kind);
    $('draft-status').textContent = 'Önceki taslağınız bu tarayıcıdan yüklendi. İstemezseniz "Taslağı sil" düğmesini kullanın.';
  }
  renderPreview(collect());
})();
