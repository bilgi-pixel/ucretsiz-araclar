// PDF Karartma (Redaksiyon): pdf.js ile sayfa görüntülenir, kullanıcı dikdörtgen çizer ya da regex ön
// ayarlarıyla (TC no, IBAN, e-posta, telefon) metin kutuları otomatik bulunur. Çıktıda işaretli sayfalar
// rasterize edilir (görüntü olarak gömülür) → altındaki metin gerçekten yok olur; diğer sayfalar pdf-lib
// copyPages ile olduğu gibi kopyalanır. Tümü tarayıcıda; hiçbir dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;

let file = null;
let srcBytes = null; // pdf-lib için dokunulmamış kopya
let pdf = null; // pdf.js belgesi
let boxes = []; // boxes[pageIndex] = [{ x, y, w, h }] — PDF kullanıcı uzayı (punto, sol-alt köken)
let cur = 0; // geçerli sayfa indeksi
let view = null; // { page, viewport, base: HTMLCanvasElement }
let resultBlob = null;
let resultName = 'karartilmis.pdf';

// Kişisel veri desenleri (ön ayarlar). Türkçe belgelerde en sık sızan dört alan.
const PRESETS = {
  tc: { re: /\b[1-9]\d{10}\b/g, label: 'TC kimlik no' },
  iban: { re: /\bTR\s?\d{2}(?:\s?\d{4}){5}\s?\d{2}\b/gi, label: 'IBAN' },
  email: { re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, label: 'e-posta' },
  phone: { re: /(?:\+90|0090|0)?[\s.-]?\(?(?:5\d{2}|[2-4]\d{2})\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}\b/g, label: 'telefon' },
};

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), `"${f.name}" bir PDF değil. Resim üzerindeki bilgiyi gizlemek için önce Resimden PDF'e aracıyla PDF yapın ya da bir resim düzenleyici kullanın.`);
    return;
  }
  try {
    const pdfjs = await getPdfJs();
    srcBytes = await f.arrayBuffer();
    pdf = await pdfjs.getDocument({ data: srcBytes.slice(0) }).promise;
    // pdf-lib de açabilmeli (şifre/bozukluk burada da yakalanır)
    const PDFLib = await getPdfLib();
    await PDFLib.PDFDocument.load(srcBytes, { ignoreEncryption: false, updateMetadata: false });
  } catch (err) {
    const s = String(err && (err.name + ' ' + err.message));
    pdf = null; srcBytes = null;
    showError($('error'), /PasswordException|password|encrypted/i.test(s)
      ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp (PDF\'i açın → Yazdır → "PDF olarak kaydet") tekrar deneyin.'
      : /Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected|trailer/i.test(s)
        ? 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF okuyucuda açabildiğinizi kontrol edip yeniden seçin.'
        : friendlyError(err));
    return;
  }
  file = f;
  boxes = Array.from({ length: pdf.numPages }, () => []);
  $('warn').hidden = f.size < BIG_FILE;
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pdf.numPages} sayfa · ${formatBytes(f.size)}`;
  $('editor').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  cur = 0;
  await showPage(0);
}

function reset() {
  file = null; srcBytes = null; pdf = null; boxes = []; view = null; resultBlob = null; cur = 0;
  $('files').innerHTML = '';
  $('editor').hidden = true; $('options').hidden = true; $('actions').hidden = true; $('warn').hidden = true;
  $('result').classList.remove('is-active');
  $('find-status').textContent = '';
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

/** Sayfayı önizleme kanvasına çizer (temel görüntü ayrı kanvasta saklanır, kutular üstüne çizilir). */
async function showPage(idx) {
  if (!pdf) return;
  cur = Math.max(0, Math.min(pdf.numPages - 1, idx));
  const page = await pdf.getPage(cur + 1);
  const vp1 = page.getViewport({ scale: 1 });
  const stageW = Math.max(280, $('stage').clientWidth || 700);
  const scale = Math.max(0.4, Math.min(2, stageW / vp1.width));
  const viewport = page.getViewport({ scale });
  const base = document.createElement('canvas');
  base.width = Math.ceil(viewport.width); base.height = Math.ceil(viewport.height);
  await page.render({ canvasContext: base.getContext('2d'), viewport }).promise;
  view = { page, viewport, base };
  const canvas = $('canvas');
  canvas.width = base.width; canvas.height = base.height;
  $('page-label').textContent = `Sayfa ${cur + 1} / ${pdf.numPages}`;
  $('prev').disabled = cur === 0;
  $('next').disabled = cur === pdf.numPages - 1;
  redraw();
}

/** PDF kutusunu geçerli görünümün piksel dikdörtgenine çevirir: [x, y, w, h]. */
function toViewRect(vp, b) {
  const [x1, y1, x2, y2] = vp.convertToViewportRectangle([b.x, b.y, b.x + b.w, b.y + b.h]);
  return [Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1)];
}

let drag = null; // { x0, y0, x1, y1 } kanvas pikseli
function redraw() {
  if (!view) return;
  const canvas = $('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(view.base, 0, 0);
  (boxes[cur] || []).forEach((b, i) => {
    const [x, y, w, h] = toViewRect(view.viewport, b);
    ctx.fillStyle = 'rgba(0,0,0,.88)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#e53935'; ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(String(i + 1), x + 4, y + 14);
  });
  if (drag) {
    const x = Math.min(drag.x0, drag.x1), y = Math.min(drag.y0, drag.y1);
    ctx.fillStyle = 'rgba(229,57,53,.35)';
    ctx.fillRect(x, y, Math.abs(drag.x1 - drag.x0), Math.abs(drag.y1 - drag.y0));
    ctx.strokeStyle = '#e53935'; ctx.lineWidth = 2;
    ctx.strokeRect(x, y, Math.abs(drag.x1 - drag.x0), Math.abs(drag.y1 - drag.y0));
  }
  renderBoxList();
}

function renderBoxList() {
  const ul = $('boxes');
  ul.innerHTML = '';
  const list = boxes[cur] || [];
  const total = boxes.reduce((s, b) => s + b.length, 0);
  const marked = boxes.filter((b) => b.length).length;
  $('box-summary').textContent = total
    ? `Bu sayfada ${list.length} kutu · toplam ${total} kutu, ${marked} sayfa karartılacak`
    : 'Henüz kutu yok. Sayfa üzerinde fareyle ya da parmakla sürükleyerek dikdörtgen çizin.';
  const pw = view ? view.viewport.width / view.viewport.scale : 1;
  const ph = view ? view.viewport.height / view.viewport.scale : 1;
  list.forEach((b, i) => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" aria-label="Kutuyu sil">✕</button>';
    li.querySelector('.name').textContent = `Kutu ${i + 1}${b.label ? ` · ${b.label}` : ''}`;
    li.querySelector('.meta').textContent = `${Math.round((b.x / pw) * 100)}%, ${Math.round(((ph - b.y - b.h) / ph) * 100)}% · ${Math.round((b.w / pw) * 100)}×${Math.round((b.h / ph) * 100)}%`;
    li.querySelector('button').addEventListener('click', () => { list.splice(i, 1); redraw(); });
    ul.appendChild(li);
  });
}

function canvasPoint(e) {
  const canvas = $('canvas');
  const r = canvas.getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * canvas.width, y: ((e.clientY - r.top) / r.height) * canvas.height };
}

/** Kutuyu ekler; "tüm sayfalara uygula" açıksa her sayfaya aynı bölge. */
function addBox(b, label) {
  if (b.w < 1 || b.h < 1) return;
  const box = { ...b, label };
  if ($('opt-all-pages').checked && !label) boxes.forEach((list) => list.push({ ...box }));
  else boxes[cur].push(box);
  $('result').classList.remove('is-active');
}

const canvasEl = $('canvas');
canvasEl.addEventListener('pointerdown', (e) => {
  if (!view) return;
  const p = canvasPoint(e);
  drag = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
  canvasEl.setPointerCapture(e.pointerId);
  e.preventDefault();
});
canvasEl.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const p = canvasPoint(e);
  drag.x1 = Math.max(0, Math.min(canvasEl.width, p.x));
  drag.y1 = Math.max(0, Math.min(canvasEl.height, p.y));
  redraw();
});
const endDrag = () => {
  if (!drag || !view) { drag = null; return; }
  const d = drag; drag = null;
  if (Math.abs(d.x1 - d.x0) >= 4 && Math.abs(d.y1 - d.y0) >= 4) {
    const [ax, ay] = view.viewport.convertToPdfPoint(d.x0, d.y0);
    const [bx, by] = view.viewport.convertToPdfPoint(d.x1, d.y1);
    addBox({ x: Math.min(ax, bx), y: Math.min(ay, by), w: Math.abs(bx - ax), h: Math.abs(by - ay) });
  }
  redraw();
};
canvasEl.addEventListener('pointerup', endDrag);
canvasEl.addEventListener('pointercancel', endDrag);

$('prev').addEventListener('click', () => showPage(cur - 1));
$('next').addEventListener('click', () => showPage(cur + 1));
$('clear-page').addEventListener('click', () => { if (boxes[cur]) boxes[cur] = []; redraw(); });
$('clear-all').addEventListener('click', () => { boxes = boxes.map(() => []); redraw(); });

/** Klavyeyle bölge ekleme: yüzde cinsinden sol, üst, genişlik, yükseklik. */
$('man-add').addEventListener('click', () => {
  if (!view) return;
  const pct = (id) => Math.max(0, Math.min(100, Number($(id).value) || 0)) / 100;
  const pw = view.viewport.width / view.viewport.scale, ph = view.viewport.height / view.viewport.scale;
  const l = pct('man-x'), t = pct('man-y'), w = pct('man-w'), h = pct('man-h');
  if (!w || !h) { showError($('error'), 'Genişlik ve yükseklik için 0\'dan büyük bir yüzde girin (ör. 40 ve 6).'); return; }
  showError($('error'), null);
  addBox({ x: l * pw, y: ph - (t + h) * ph, w: w * pw, h: h * ph });
  redraw();
});

/** Satır metinlerini öğe aralıklarıyla kurar; regex eşleşmesi öğe kutularına geri çevrilir. */
function buildLines(content) {
  const items = [];
  for (const it of content.items) {
    if (typeof it.str !== 'string' || !it.str.trim()) continue;
    const [a, b, , d, x, y] = it.transform;
    const size = Math.max(1, Math.abs(d) || Math.hypot(a, b) || it.height || 10);
    items.push({ text: it.str, x, y, w: it.width || 0, h: it.height || size, size });
  }
  items.sort((p, q) => (q.y - p.y) || (p.x - q.x));
  const lines = [];
  for (const it of items) {
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.y - it.y) <= Math.max(line.size, it.size) * 0.45) line.items.push(it);
    else lines.push({ y: it.y, size: it.size, items: [it] });
  }
  for (const line of lines) {
    line.items.sort((p, q) => p.x - q.x);
    line.text = ''; line.segs = [];
    let prev = null;
    for (const it of line.items) {
      if (prev) {
        const gap = it.x - (prev.x + prev.w);
        if (gap > prev.size * 0.15 && !/\s$/.test(prev.text) && !/^\s/.test(it.text)) line.text += ' ';
      }
      line.segs.push({ start: line.text.length, end: line.text.length + it.text.length, item: it });
      line.text += it.text;
      prev = it;
    }
  }
  return lines;
}

function matchBox(line, start, end) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const s of line.segs) {
    const a = Math.max(start, s.start), b = Math.min(end, s.end);
    if (a >= b) continue;
    const len = Math.max(1, s.end - s.start);
    const it = s.item;
    const fx1 = it.x + ((a - s.start) / len) * it.w;
    const fx2 = it.x + ((b - s.start) / len) * it.w;
    x1 = Math.min(x1, fx1); x2 = Math.max(x2, fx2);
    y1 = Math.min(y1, it.y - it.size * 0.25); y2 = Math.max(y2, it.y + it.size * 1.0);
  }
  if (!isFinite(x1)) return null;
  const pad = 1.5;
  return { x: x1 - pad, y: y1 - pad, w: (x2 - x1) + pad * 2, h: (y2 - y1) + pad * 2 };
}

$('find').addEventListener('click', async () => {
  if (!pdf) return;
  const rules = [];
  for (const k of Object.keys(PRESETS)) if ($(`preset-${k}`).checked) rules.push(PRESETS[k]);
  const custom = $('opt-find').value.trim();
  if (custom) rules.push({ re: new RegExp(custom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), label: `"${custom}"` });
  if (!rules.length) { showError($('error'), 'En az bir desen seçin (TC no, IBAN, e-posta, telefon) ya da aranacak metni yazın.'); return; }
  showError($('error'), null);
  $('find').disabled = true;
  let found = 0, textChars = 0;
  try {
    for (let n = 1; n <= pdf.numPages; n++) {
      setProgress($('progress'), ((n - 1) / pdf.numPages) * 100, `Sayfa ${n}/${pdf.numPages} taranıyor…`);
      await tick();
      const page = await pdf.getPage(n);
      const lines = buildLines(await page.getTextContent());
      for (const line of lines) {
        textChars += line.text.length;
        for (const rule of rules) {
          rule.re.lastIndex = 0;
          let m;
          while ((m = rule.re.exec(line.text)) !== null) {
            if (!m[0].trim()) { rule.re.lastIndex++; continue; }
            const b = matchBox(line, m.index, m.index + m[0].length);
            if (b) { boxes[n - 1].push({ ...b, label: rule.label }); found++; }
          }
        }
      }
      page.cleanup();
    }
    setProgress($('progress'), null);
    $('find-status').textContent = found
      ? `${found} eşleşme işaretlendi. Sayfaları gezip kutuları kontrol edin; gereksizleri listeden silebilirsiniz.`
      : textChars
        ? 'Eşleşme bulunamadı. Deseni kontrol edin ya da bölgeyi elle çizin.'
        : 'Bu PDF\'de seçilebilir metin yok (taranmış görüntü). Otomatik arama çalışmaz; karartılacak bölgeleri elle çizin.';
    $('result').classList.remove('is-active');
    redraw();
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), friendlyError(err));
  } finally {
    $('find').disabled = false;
  }
});

/** İşaretli sayfayı kutular siyah doldurulmuş hâlde rasterize eder; görüntü baytlarını döndürür. */
async function rasterize(idx, dpi, format) {
  const page = await pdf.getPage(idx + 1);
  const vp = page.getViewport({ scale: dpi / 72 });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  ctx.fillStyle = '#000';
  for (const b of boxes[idx]) {
    const [x, y, w, h] = toViewRect(vp, b);
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h));
  }
  const blob = await new Promise((r) => canvas.toBlob(r, format === 'png' ? 'image/png' : 'image/jpeg', 0.9));
  page.cleanup();
  return { bytes: new Uint8Array(await blob.arrayBuffer()), width: vp.width / vp.scale, height: vp.height / vp.scale };
}

$('run').addEventListener('click', async () => {
  if (!pdf || !srcBytes) return;
  const total = boxes.reduce((s, b) => s + b.length, 0);
  if (!total) { showError($('error'), 'Karartılacak bölge seçilmedi. Sayfa üzerinde dikdörtgen çizin ya da "Bul ve işaretle" ile desen arayın.'); return; }
  const btn = $('run');
  btn.disabled = true;
  resultBlob = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const dpi = Number($('opt-dpi').value) || 150;
  const format = $('opt-format').value;
  try {
    const PDFLib = await getPdfLib();
    const src = await PDFLib.PDFDocument.load(srcBytes, { ignoreEncryption: false, updateMetadata: false });
    const out = await PDFLib.PDFDocument.create();
    const n = pdf.numPages;
    const plainIdx = [];
    for (let i = 0; i < n; i++) if (!boxes[i].length) plainIdx.push(i);
    const copied = plainIdx.length ? await out.copyPages(src, plainIdx) : [];
    const copiedMap = new Map(plainIdx.map((i, k) => [i, copied[k]]));
    let rasterized = 0;
    for (let i = 0; i < n; i++) {
      setProgress($('progress'), (i / n) * 95, `Sayfa ${i + 1}/${n} ${boxes[i].length ? 'karartılıyor' : 'kopyalanıyor'}…`);
      await tick();
      if (!boxes[i].length) { out.addPage(copiedMap.get(i)); continue; }
      const img = await rasterize(i, dpi, format);
      const embedded = format === 'png' ? await out.embedPng(img.bytes) : await out.embedJpg(img.bytes);
      const p = out.addPage([img.width, img.height]);
      p.drawImage(embedded, { x: 0, y: 0, width: img.width, height: img.height });
      rasterized++;
    }
    setProgress($('progress'), 97, 'PDF yazılıyor…');
    await tick();
    if ($('opt-meta').checked) {
      out.setTitle(''); out.setAuthor(''); out.setSubject(''); out.setKeywords([]); out.setProducer(''); out.setCreator('');
    } else {
      try {
        out.setTitle(src.getTitle() || ''); out.setAuthor(src.getAuthor() || ''); out.setSubject(src.getSubject() || '');
        out.setProducer(src.getProducer() || ''); out.setCreator(src.getCreator() || '');
      } catch { /* bazı belgelerde meta okunamaz; boş bırakılır */ }
    }
    const bytes = await out.save();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(file.name)}-karartilmis.pdf`;
    $('result-info').textContent = `${n} sayfa · ${rasterized} sayfa karartılıp görüntüye çevrildi, ${n - rasterized} sayfa olduğu gibi kopyalandı · ${total} kutu · ${formatBytes(resultBlob.size)} · ${resultName}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), /memory|allocation/i.test(String(err)) ? 'Tarayıcı belleği yetmedi. Çözünürlüğü 150 dpi yapın ya da belgeyi PDF Böl ile parçalayıp tekrar deneyin.' : friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });

// Pencere genişliği değişince önizlemeyi yeniden ölçekle (kutular PDF uzayında tutulduğu için kaybolmaz).
let resizeTimer = null;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (view) showPage(cur); }, 200); });
