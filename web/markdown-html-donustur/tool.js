// Markdown → HTML Dönüştürücü — marked (MIT, yerel vendor) + kendi HTML temizleyicimiz.
// Metin ve dosyalar tarayıcıdan çıkmaz; hiçbir ağ isteği yapılmaz.
import { marked } from '../vendor/marked@15.0.7/marked.esm.js';
import { createDropzone, setProgress, showError, formatBytes, downloadBlob, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const input = $('md-input');
const out = $('html-out');
let files = []; // { name, text, size }
let fileBase = 'belge';
let timer = 0;
let lastHtml = '';
let fflateMod = null;

/* ---------- HTML temizleyici (markdown-onizleme ile aynı mantık) ---------- */
const DROP_TAGS = new Set(['script', 'iframe', 'frame', 'frameset', 'object', 'embed', 'style', 'link', 'meta', 'base', 'form', 'input', 'button', 'textarea', 'select', 'svg', 'math', 'audio', 'video', 'source', 'track', 'applet', 'noscript', 'template', 'portal']);
const URL_ATTRS = new Set(['href', 'src', 'xlink:href', 'action', 'formaction', 'poster', 'background', 'srcset', 'data', 'cite']);

/** Güvenli bağlantı mı? http(s), mailto, tel, #çapa ve göreli adreslere izin verilir. */
function safeUrl(v, isImg) {
  const u = v.replace(/[\u0000- \u007f-\u009f]/g, '').toLowerCase();
  if (isImg) return /^https?:/.test(u) || /^data:image\/(png|jpe?g|gif|webp|bmp);base64,[a-z0-9+/=]+$/.test(u) || !/^[a-z][a-z0-9+.-]*:/.test(u);
  if (/^(https?:|mailto:|tel:|#)/.test(u)) return true;
  return !/^[a-z][a-z0-9+.-]*:/.test(u); // javascript:, data:, vbscript: reddedilir
}

/** Tehlikeli etiket ve öznitelikleri inert belge üzerinde temizler. */
function sanitizeNode(root, doc) {
  for (const el of Array.from(root.children)) {
    const tag = el.tagName.toLowerCase();
    if (DROP_TAGS.has(tag)) { el.remove(); continue; }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on') || name === 'style' || name === 'srcdoc') { el.removeAttribute(attr.name); continue; }
      if (URL_ATTRS.has(name) && !safeUrl(attr.value, tag === 'img' && name === 'src')) el.removeAttribute(attr.name);
    }
    if (tag === 'img' && !el.hasAttribute('src')) {
      const note = doc.createElement('em');
      note.textContent = `[görsel çıkarıldı: ${el.getAttribute('alt') || 'güvensiz bağlantı'}]`;
      el.replaceWith(note);
      continue;
    }
    if (tag === 'a' && el.hasAttribute('href')) el.setAttribute('rel', 'noopener noreferrer');
    sanitizeNode(el, doc);
  }
}

/* ---------- Dönüştürme ---------- */
/** Türkçe karakterleri düzleştirip başlıktan çapa kimliği üretir. */
function slugify(text) {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
  const s = text.toLocaleLowerCase('tr').replace(/[çğıöşüâîû]/g, (c) => map[c])
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'baslik';
}

const CODE_PRE = 'background:#f6f5f3;padding:12px;border-radius:6px;overflow:auto';
const CODE_INLINE = 'background:#f6f5f3;padding:.1em .35em;border-radius:4px;font-family:ui-monospace,Consolas,monospace';
const CODE_IN_PRE = 'background:none;padding:0;font-family:ui-monospace,Consolas,monospace';

function readOptions() {
  return {
    full: $('opt-mode').value === 'full',
    ids: $('opt-ids').checked,
    gfm: $('opt-gfm').checked,
    inline: $('opt-inline').checked,
    clean: $('opt-clean').checked,
  };
}

/** Markdown metnini gövde HTML'ine çevirir. */
function toBodyHtml(src, o) {
  const raw = marked.parse(src, { gfm: o.gfm, breaks: false });
  const doc = new DOMParser().parseFromString(`<body>${raw}</body>`, 'text/html');
  if (o.clean) sanitizeNode(doc.body, doc);
  if (o.ids) {
    const used = new Map();
    doc.body.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
      let id = slugify(h.textContent || '');
      const n = used.get(id) || 0;
      used.set(id, n + 1);
      if (n) id = `${id}-${n}`;
      h.id = id;
    });
  }
  if (o.inline) {
    doc.body.querySelectorAll('pre').forEach((p) => p.setAttribute('style', CODE_PRE));
    doc.body.querySelectorAll('code').forEach((c) => {
      c.setAttribute('style', c.parentElement && c.parentElement.tagName === 'PRE' ? CODE_IN_PRE : CODE_INLINE);
    });
  }
  return doc.body.innerHTML.trim();
}

const esc = (s) => s.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

/** Tam belge: doctype + gömülü stil. */
function wrapDocument(bodyHtml, src, name, o) {
  const m = src.match(/^\s{0,3}#\s+(.+?)\s*#*\s*$/m);
  const title = esc((m ? m[1].replace(/[*_`]/g, '') : name) || 'Belge');
  const css = 'body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;line-height:1.7;color:#1e2126}'
    + 'table{border-collapse:collapse}th,td{border:1px solid #e3e1df;padding:6px 10px}th{background:#f6f5f3}blockquote{margin:1em 0;padding:.1em 1em;border-left:4px solid #7b2331;color:#45484e}img{max-width:100%}'
    + (o.inline ? '' : 'pre{background:#f6f5f3;padding:12px;border-radius:6px;overflow:auto}code{background:#f6f5f3;padding:.1em .35em;border-radius:4px;font-family:ui-monospace,Consolas,monospace}pre code{background:none;padding:0}');
  return `<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${title}</title>\n<style>${css}</style>\n</head>\n<body>\n${bodyHtml}\n</body>\n</html>\n`;
}

function convert(src, name, o) {
  const body = toBodyHtml(src, o);
  return { body, output: o.full ? wrapDocument(body, src, name, o) : body };
}

/* ---------- Ekran güncelleme ---------- */
const looksBinary = (t) => t.includes('\u0000');

function setActions(on) {
  $('actions').hidden = !on;
  $('output-wrap').hidden = !on;
  $('zip-row').hidden = !on || files.length < 2;
}

function render() {
  const src = input.value;
  const o = readOptions();
  if (!src.trim()) {
    lastHtml = '';
    out.value = '';
    $('preview').srcdoc = '';
    $('stats').textContent = '';
    setActions(false);
    return;
  }
  if (looksBinary(src)) {
    showError($('error'), 'Bu içerik metin gibi görünmüyor (ikili veri içeriyor). Metin tabanlı bir .md dosyası seçip yeniden deneyin.');
    setActions(false);
    return;
  }
  showError($('error'), '');
  const r = convert(src, fileBase, o);
  lastHtml = r.output;
  out.value = r.output;
  // Önizleme: script çalıştıramayan sandbox + dış kaynakları engelleyen CSP
  const csp = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; img-src data:; style-src \'unsafe-inline\'">';
  const css = 'body{font-family:system-ui,sans-serif;line-height:1.7;margin:12px;color:#1e2126}pre{background:#f6f5f3;padding:10px;overflow:auto}table{border-collapse:collapse}th,td{border:1px solid #ccc;padding:4px 8px}img{max-width:100%}';
  $('preview').srcdoc = `<!doctype html><html><head><meta charset="utf-8">${csp}<style>${css}</style></head><body>${previewSafe(r.body)}</body></html>`;
  $('stats').textContent = `${r.output.length.toLocaleString('tr')} karakter · ${r.output.split('\n').length.toLocaleString('tr')} satır`;
  setActions(true);
}

/** Önizlemede dış görsel yüklenmesin diye data: dışındaki img etiketlerini alternatif metne çevirir. */
function previewSafe(html) {
  const d = new DOMParser().parseFromString('<body>' + html + '</body>', 'text/html');
  d.querySelectorAll('img').forEach((img) => {
    if (/^data:image\//i.test(img.getAttribute('src') || '')) return;
    const s = d.createElement('em');
    s.textContent = '[görsel: ' + (img.getAttribute('alt') || 'dış bağlantı') + ']';
    img.replaceWith(s);
  });
  return d.body.innerHTML;
}

function schedule() { clearTimeout(timer); timer = setTimeout(render, 150); }
input.addEventListener('input', schedule);
['opt-mode', 'opt-ids', 'opt-gfm', 'opt-inline', 'opt-clean'].forEach((id) => $(id).addEventListener('change', render));

/* ---------- Sekmeler ---------- */
const tabs = Array.from(document.querySelectorAll('[role=tab]'));
function selectTab(name, focus) {
  tabs.forEach((t) => {
    const on = t.dataset.view === name;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    $(`panel-${t.dataset.view}`).hidden = !on;
    if (on && focus) t.focus();
  });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t.dataset.view));
  t.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      selectTab(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length].dataset.view, true);
    }
  });
});

/* ---------- Dosya yükleme ---------- */
function renderFileList() {
  const ul = $('files');
  ul.textContent = '';
  files.forEach((f) => {
    const li = document.createElement('li');
    const n = document.createElement('span'); n.className = 'name'; n.textContent = f.name;
    const m = document.createElement('span'); m.className = 'meta'; m.textContent = formatBytes(f.size);
    li.append(n, m);
    ul.appendChild(li);
  });
}

async function loadFiles(list) {
  showError($('error'), ''); showError($('warning'), '');
  const loaded = [];
  const bad = [];
  for (const f of list) {
    if (f.size > BIG_FILE) showError($('warning'), `${f.name} ${formatBytes(f.size)}; 50 MB üstü dosyalar tarayıcıyı yavaşlatabilir. Mümkünse daha küçük parçalarla deneyin.`);
    try {
      const text = await f.text();
      if (looksBinary(text)) { bad.push(f.name); continue; }
      loaded.push({ name: f.name, text, size: f.size });
    } catch { bad.push(f.name); }
  }
  if (!loaded.length) {
    showError($('error'), `Okunamayan dosya: ${bad.join(', ')}. Metin tabanlı .md veya .txt dosyaları seçtiğinizden emin olun; Word ya da PDF dosyaları Markdown değildir.`);
    return;
  }
  files = loaded;
  fileBase = baseName(files[0].name) || 'belge';
  input.value = files[0].text;
  renderFileList();
  render();
  if (bad.length) showError($('error'), `Okunamayan dosya atlandı: ${bad.join(', ')}. Yalnızca metin tabanlı .md veya .txt dosyaları dönüştürülür.`);
}
createDropzone({ el: $('drop'), accept: '.md,.markdown,.txt,text/markdown,text/plain', multiple: true, onFiles: loadFiles });

/* ---------- Çıktı eylemleri ---------- */
function ensureOutput() {
  if (!input.value.trim()) { showError($('error'), 'Dönüştürülecek metin yok. Önce Markdown yapıştırın ya da bir .md dosyası seçin.'); return false; }
  render();
  return !!lastHtml;
}

$('btn-html').addEventListener('click', () => {
  if (!ensureOutput()) return;
  downloadBlob(new Blob([lastHtml], { type: 'text/html;charset=utf-8' }), `${fileBase}.html`);
});

$('btn-copy').addEventListener('click', async () => {
  if (!ensureOutput()) return;
  try { await navigator.clipboard.writeText(lastHtml); } catch {
    out.select();
    document.execCommand('copy');
  }
  $('copied').textContent = 'HTML kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
});

$('btn-zip').addEventListener('click', async () => {
  if (files.length < 2) return;
  showError($('error'), '');
  const o = readOptions();
  try {
    if (!fflateMod) fflateMod = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
    const entries = {};
    const seen = new Set();
    for (let i = 0; i < files.length; i++) {
      setProgress($('progress'), (i / files.length) * 100, `${i + 1} / ${files.length} dönüştürülüyor…`);
      await tick();
      const f = files[i];
      const name = baseName(f.name) || `belge-${i + 1}`;
      let unique = name;
      let k = 1;
      while (seen.has(unique)) unique = `${name}-${++k}`;
      seen.add(unique);
      entries[`${unique}.html`] = fflateMod.strToU8(convert(f.text, unique, o).output);
    }
    setProgress($('progress'), 95, 'ZIP hazırlanıyor…');
    await tick();
    const zipped = fflateMod.zipSync(entries, { level: 6 });
    setProgress($('progress'), 100, 'Hazır');
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), 'markdown-html.zip');
  } catch {
    showError($('error'), 'ZIP oluşturulamadı. Dosyaları daha az sayıda seçip yeniden deneyin.');
  } finally {
    setTimeout(() => setProgress($('progress'), null), 800);
  }
});

$('btn-clear').addEventListener('click', () => {
  files = [];
  fileBase = 'belge';
  input.value = '';
  renderFileList();
  showError($('error'), ''); showError($('warning'), '');
  render();
  input.focus();
});

render();
