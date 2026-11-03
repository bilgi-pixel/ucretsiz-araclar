// HTML → Markdown Dönüştürücü — turndown + turndown-plugin-gfm (MIT, yerel vendor).
// HTML metni tarayıcıdan çıkmaz; kaynaktaki bağlantılar ve görseller getirilmez (dış kaynak çekme yok).
import TurndownService from '../vendor/turndown@7.2.0/turndown.browser.es.js';
import { gfm } from '../vendor/turndown-plugin-gfm@1.0.2/turndown-plugin-gfm.browser.es.js';
import { createDropzone, showError, formatBytes, downloadBlob, baseName } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const input = $('html-input');
const out = $('md-out');
let fileBase = 'belge';
let timer = 0;
let lastMd = '';

/** Seçeneklere göre yeni bir turndown örneği kurar. */
function buildService(o) {
  const td = new TurndownService({
    headingStyle: o.heading,
    bulletListMarker: o.bullet,
    codeBlockStyle: o.code,
    fence: o.fence,
    emDelimiter: '*',
    strongDelimiter: '**',
    hr: '---',
  });
  if (o.tables) td.use(gfm);
  // Liste maddesi: "- a" biçimi (varsayılan üç boşluklu "-   a" yerine tek boşluk)
  td.addRule('compactListItem', {
    filter: 'li',
    replacement(content, node, options) {
      const parent = node.parentNode;
      let prefix = `${options.bulletListMarker} `;
      if (parent && parent.nodeName === 'OL') {
        const start = parent.getAttribute('start');
        const index = Array.prototype.indexOf.call(parent.children, node);
        prefix = `${start ? Number(start) + index : index + 1}. `;
      }
      const indent = ' '.repeat(prefix.length);
      const body = content.replace(/^\n+/, '').replace(/\n+$/, '\n').replace(/\n/gm, `\n${indent}`);
      return prefix + body + (node.nextSibling && !/\n$/.test(body) ? '\n' : '');
    },
  });
  if (!o.links) td.addRule('stripLinks', { filter: 'a', replacement: (content) => content });
  if (!o.images) td.addRule('stripImages', { filter: 'img', replacement: () => '' });
  return td;
}

function readOptions() {
  return {
    heading: $('opt-heading').value,
    bullet: $('opt-bullet').value,
    code: $('opt-code').value,
    fence: $('opt-fence').value,
    links: $('opt-links').checked,
    images: $('opt-images').checked,
    tables: $('opt-tables').checked,
    main: $('opt-main').checked,
  };
}

/** HTML kaynağını inert belgede ayrıştırır; çalıştırılabilir/gürültülü etiketleri atar. */
function parseSource(html, onlyMain) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script,style,noscript,iframe,template,object,embed,svg,link,meta,head').forEach((el) => el.remove());
  if (onlyMain) {
    const main = doc.querySelector('main, article');
    if (main) return main;
    doc.querySelectorAll('nav,header,footer,aside,form').forEach((el) => el.remove());
  }
  return doc.body;
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

function hideOutput() {
  lastMd = '';
  out.value = '';
  $('preview').srcdoc = '';
  $('stats').textContent = '';
  $('actions').hidden = true;
  $('output-wrap').hidden = true;
}

function render() {
  const src = input.value;
  if (!src.trim()) { hideOutput(); showError($('error'), ''); return; }
  if (src.includes('\u0000')) {
    hideOutput();
    showError($('error'), 'Bu içerik metin gibi görünmüyor (ikili veri içeriyor). HTML kaynağını ya da .html dosyasını seçip yeniden deneyin.');
    return;
  }
  const o = readOptions();
  try {
    const node = parseSource(src, o.main);
    const md = buildService(o).turndown(node).trim();
    if (!md) {
      hideOutput();
      showError($('error'), 'HTML içinde dönüştürülecek görünür içerik bulunamadı. Etiketli metin yapıştırdığınızdan emin olun (ör. <h2>Başlık</h2><p>Metin</p>) ya da "yalnızca ana içerik" seçeneğini kapatın.');
      return;
    }
    showError($('error'), '');
    lastMd = md + '\n';
    out.value = lastMd;
    // Kaynak önizlemesi: script çalıştıramayan sandbox + dış kaynakları engelleyen CSP
    const csp = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; img-src data:; style-src \'unsafe-inline\'">';
    const css = 'body{font-family:system-ui,sans-serif;line-height:1.7;margin:12px;color:#1e2126}pre{background:#f6f5f3;padding:10px;overflow:auto}table{border-collapse:collapse}th,td{border:1px solid #ccc;padding:4px 8px}img{max-width:100%}';
    $('preview').srcdoc = `<!doctype html><html><head><meta charset="utf-8">${csp}<style>${css}</style></head><body>${previewSafe(node.innerHTML)}</body></html>`;
    $('stats').textContent = `${md.length.toLocaleString('tr')} karakter · ${md.split('\n').length.toLocaleString('tr')} satır`;
    $('actions').hidden = false;
    $('output-wrap').hidden = false;
  } catch {
    hideOutput();
    showError($('error'), 'HTML ayrıştırılamadı. Etiketlerin eksiksiz olduğunu kontrol edin ya da kaynağı daha küçük parçalara bölüp yeniden deneyin.');
  }
}

function schedule() { clearTimeout(timer); timer = setTimeout(render, 200); }
input.addEventListener('input', schedule);
['opt-heading', 'opt-bullet', 'opt-code', 'opt-fence', 'opt-links', 'opt-images', 'opt-tables', 'opt-main'].forEach((id) => $(id).addEventListener('change', render));

/* ---------- Dosya yükleme ---------- */
async function loadFile(list) {
  const f = list[0];
  if (!f) return;
  showError($('error'), ''); showError($('warning'), '');
  if (f.size > BIG_FILE) showError($('warning'), `Dosya ${formatBytes(f.size)}; 50 MB üstü dosyalar tarayıcıyı yavaşlatabilir. Mümkünse daha küçük bir kaynakla deneyin.`);
  try {
    const text = await f.text();
    if (text.includes('\u0000')) throw new Error('binary');
    input.value = text;
    fileBase = baseName(f.name) || 'belge';
    $('file-name').textContent = `${f.name} (${formatBytes(f.size)})`;
    render();
  } catch {
    showError($('error'), 'Dosya okunamadı. Metin tabanlı bir .html dosyası (sayfa kaynağı) seçtiğinizden emin olup yeniden deneyin; PDF veya Word dosyaları HTML değildir.');
  }
}
createDropzone({ el: $('drop'), accept: '.html,.htm,.xhtml,.txt,text/html,text/plain', multiple: false, onFiles: loadFile });

/* ---------- Çıktı eylemleri ---------- */
function ensureOutput() {
  if (!input.value.trim()) { showError($('error'), 'Dönüştürülecek HTML yok. Önce HTML yapıştırın ya da bir .html dosyası seçin.'); return false; }
  render();
  return !!lastMd;
}
$('btn-md').addEventListener('click', () => {
  if (!ensureOutput()) return;
  downloadBlob(new Blob([lastMd], { type: 'text/markdown;charset=utf-8' }), `${fileBase}.md`);
});
$('btn-copy').addEventListener('click', async () => {
  if (!ensureOutput()) return;
  try { await navigator.clipboard.writeText(lastMd); } catch {
    out.select();
    document.execCommand('copy');
  }
  $('copied').textContent = 'Markdown kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
});
$('btn-clear').addEventListener('click', () => {
  fileBase = 'belge';
  input.value = '';
  $('file-name').textContent = '';
  showError($('error'), ''); showError($('warning'), '');
  render();
  input.focus();
});

render();
