// Markdown Editör ve Önizleme — marked (MIT, yerel vendor) + kendi küçük HTML temizleyicimiz.
// Metin tarayıcıdan çıkmaz; dış görseller ağ isteği yapmasın diye engellenir.
import { marked } from '../vendor/marked@15.0.7/marked.esm.js';
import { createDropzone, showError, formatBytes, downloadBlob, baseName } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const editor = $('editor');
const preview = $('preview');
const BIG_FILE = 50 * 1024 * 1024;
let fileBase = 'belge';
let timer = 0;
let lastHtml = '';

marked.setOptions({ gfm: true, breaks: false });

/* ---------- HTML temizleyici ---------- */
// İzin verilmeyen etiketler tamamen silinir (içerikleriyle birlikte).
const DROP_TAGS = new Set(['script', 'iframe', 'frame', 'frameset', 'object', 'embed', 'style', 'link', 'meta', 'base', 'form', 'input', 'button', 'textarea', 'select', 'svg', 'math', 'audio', 'video', 'source', 'track', 'applet', 'noscript', 'template', 'portal']);
const URL_ATTRS = new Set(['href', 'src', 'xlink:href', 'action', 'formaction', 'poster', 'background', 'srcset', 'data', 'cite']);

/** Güvenli bağlantı mı? http(s), mailto, tel, #çapa ve göreli adreslere izin verilir. */
function safeUrl(v, isImg) {
  const u = v.replace(/[\u0000- \u007f-\u009f]/g, '').toLowerCase();
  if (isImg) return /^data:image\/(png|jpe?g|gif|webp|bmp);base64,[a-z0-9+/=]+$/.test(u);
  if (/^(https?:|mailto:|tel:|#)/.test(u)) return true;
  return !/^[a-z][a-z0-9+.-]*:/.test(u); // göreli adres; javascript:, data:, vbscript: reddedilir
}

/** Marked çıktısını inert bir belgede ayrıştırıp tehlikeli etiket/öznitelikleri çıkarır. */
export function sanitize(html) {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const walk = (parent) => {
    for (const el of Array.from(parent.children)) {
      const tag = el.tagName.toLowerCase();
      if (DROP_TAGS.has(tag)) { el.remove(); continue; }
      for (const attr of Array.from(el.attributes)) {
        const name = attr.name.toLowerCase();
        if (name.startsWith('on') || name === 'style' || name === 'srcdoc') { el.removeAttribute(attr.name); continue; }
        if (URL_ATTRS.has(name) && !safeUrl(attr.value, tag === 'img' && name === 'src')) {
          el.removeAttribute(attr.name);
        }
      }
      if (tag === 'img' && !el.hasAttribute('src')) {
        // Dış görsel engellendi: yerine alternatif metin ve not yazılır.
        const note = doc.createElement('em');
        note.textContent = `[görsel engellendi: ${el.getAttribute('alt') || 'dış bağlantı'}]`;
        el.replaceWith(note);
        continue;
      }
      if (tag === 'a' && el.hasAttribute('href')) el.setAttribute('rel', 'noopener noreferrer');
      walk(el);
    }
  };
  walk(doc.body);
  return doc.body.innerHTML;
}

/* ---------- Önizleme ---------- */
function render() {
  const src = editor.value;
  lastHtml = sanitize(marked.parse(src));
  preview.innerHTML = lastHtml;
  const words = (src.match(/[\p{L}\p{N}]+/gu) || []).length;
  $('stats').textContent = `${words.toLocaleString('tr')} sözcük · ${src.length.toLocaleString('tr')} karakter`;
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(render, 120);
}

editor.addEventListener('input', schedule);

/* ---------- Araç çubuğu ---------- */
/** Seçili metni sarar; seçim yoksa yer tutucu ekler ve onu seçili bırakır. */
function insertText(text, selStart, selEnd) {
  editor.focus();
  const s = editor.selectionStart, e = editor.selectionEnd;
  // execCommand geri al (Ctrl+Z) geçmişini korur; olmazsa setRangeText kullanılır.
  let ok = false;
  try { ok = document.execCommand('insertText', false, text); } catch { ok = false; }
  if (!ok) {
    editor.setRangeText(text, s, e, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }
  editor.setSelectionRange(s + selStart, s + selEnd);
}

function wrap(before, after, placeholder) {
  const sel = editor.value.slice(editor.selectionStart, editor.selectionEnd) || placeholder;
  insertText(before + sel + after, before.length, before.length + sel.length);
}

function linePrefix(prefixFn) {
  const v = editor.value;
  let s = editor.selectionStart, e = editor.selectionEnd;
  s = v.lastIndexOf('\n', s - 1) + 1;
  let end = v.indexOf('\n', e);
  if (end === -1) end = v.length;
  editor.setSelectionRange(s, end);
  const lines = v.slice(s, end).split('\n');
  const out = lines.map((l, i) => prefixFn(l, i)).join('\n');
  insertText(out, 0, out.length);
}

const ACTIONS = {
  bold: () => wrap('**', '**', 'kalın metin'),
  italic: () => wrap('*', '*', 'eğik metin'),
  h2: () => linePrefix((l) => (/^#{1,6}\s/.test(l) ? l.replace(/^#{1,6}\s/, '') : `## ${l || 'Başlık'}`)),
  ul: () => linePrefix((l) => `- ${l.replace(/^[-*]\s/, '') || 'liste öğesi'}`),
  ol: () => linePrefix((l, i) => `${i + 1}. ${l.replace(/^\d+\.\s/, '') || 'liste öğesi'}`),
  quote: () => linePrefix((l) => `> ${l.replace(/^>\s?/, '') || 'alıntı'}`),
  code: () => {
    const sel = editor.value.slice(editor.selectionStart, editor.selectionEnd);
    if (sel.includes('\n')) insertText('```\n' + sel + '\n```', 4, 4 + sel.length);
    else wrap('`', '`', 'kod');
  },
  link: () => {
    const sel = editor.value.slice(editor.selectionStart, editor.selectionEnd) || 'bağlantı metni';
    insertText(`[${sel}](https://)`, sel.length + 3, sel.length + 11);
  },
  table: () => {
    const t = '| Başlık 1 | Başlık 2 | Başlık 3 |\n| --- | --- | --- |\n| Hücre | Hücre | Hücre |\n| Hücre | Hücre | Hücre |\n';
    insertText(t, 2, 10);
  },
};

document.querySelectorAll('[data-md]').forEach((b) => b.addEventListener('click', () => ACTIONS[b.dataset.md]()));

editor.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && !e.altKey) {
    const k = e.key.toLowerCase();
    if (k === 'b') { e.preventDefault(); ACTIONS.bold(); }
    else if (k === 'i') { e.preventDefault(); ACTIONS.italic(); }
  }
});

/* ---------- Sekmeler (mobil) ---------- */
const tabs = Array.from(document.querySelectorAll('[role=tab]'));
function selectTab(name, focus) {
  $('split').dataset.view = name;
  tabs.forEach((t) => {
    const on = t.dataset.view === name;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t.dataset.view));
  t.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      selectTab(tabs[(i + 1) % tabs.length].dataset.view, true);
    }
  });
});

/* ---------- Dosya yükleme / indirme ---------- */
async function loadFile(files) {
  const f = files[0];
  if (!f) return;
  showError($('warning'), '');
  if (f.size > BIG_FILE) showError($('warning'), `Dosya ${formatBytes(f.size)}; 50 MB üstü dosyalar tarayıcıyı yavaşlatabilir. Mümkünse bilgisayardan deneyin.`);
  try {
    editor.value = await f.text();
    fileBase = baseName(f.name) || 'belge';
    $('file-name').textContent = `${f.name} (${formatBytes(f.size)})`;
    showError($('error'), '');
    render();
  } catch {
    showError($('error'), 'Dosya okunamadı. Metin tabanlı bir .md dosyası seçtiğinizden emin olup yeniden deneyin.');
  }
}
createDropzone({ el: $('drop'), accept: '.md,.markdown,.txt,text/markdown,text/plain', multiple: false, onFiles: loadFile });

function fullHtml() {
  const h1 = preview.querySelector('h1');
  const title = (h1 ? h1.textContent : fileBase).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
  const css = 'body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;line-height:1.7;color:#1e2126}'
    + 'pre{background:#f6f5f3;padding:12px;border-radius:6px;overflow:auto}code{background:#f6f5f3;padding:.1em .35em;border-radius:4px;font-family:ui-monospace,Consolas,monospace}pre code{background:none;padding:0}'
    + 'table{border-collapse:collapse}th,td{border:1px solid #e3e1df;padding:6px 10px}th{background:#f6f5f3}blockquote{margin:1em 0;padding:.1em 1em;border-left:4px solid #7b2331;color:#45484e}img{max-width:100%}';
  return `<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${title}</title>\n<style>${css}</style>\n</head>\n<body>\n${lastHtml}\n</body>\n</html>\n`;
}

$('btn-md').addEventListener('click', () => {
  if (!editor.value.trim()) { showError($('error'), 'İndirilecek metin yok. Önce editöre Markdown yazın ya da bir .md dosyası yükleyin.'); return; }
  showError($('error'), '');
  downloadBlob(new Blob([editor.value], { type: 'text/markdown;charset=utf-8' }), `${fileBase}.md`);
});
$('btn-html').addEventListener('click', () => {
  if (!editor.value.trim()) { showError($('error'), 'İndirilecek içerik yok. Önce editöre Markdown yazın ya da bir .md dosyası yükleyin.'); return; }
  showError($('error'), '');
  render();
  downloadBlob(new Blob([fullHtml()], { type: 'text/html;charset=utf-8' }), `${fileBase}.html`);
});
$('btn-copy-html').addEventListener('click', async () => {
  render();
  try {
    await navigator.clipboard.writeText(lastHtml);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = lastHtml;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  $('copied').textContent = 'HTML kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
});
$('btn-print').addEventListener('click', () => { render(); window.print(); });
$('btn-clear').addEventListener('click', () => {
  editor.value = ''; fileBase = 'belge';
  $('file-name').textContent = '';
  showError($('error'), ''); showError($('warning'), '');
  render();
  editor.focus();
});

render();
