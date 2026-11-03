// PDF'den Metin Çıkar: pdf.js getTextContent ile sayfa metni okunur, y koordinatına göre satırlara,
// dikey boşluğa göre paragraflara ayrılır. Sonuç kopyalanır, .txt (BOM'lu) ya da .docx olarak iner.
// Tümü tarayıcıda; hiçbir dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfJs, parsePageRanges, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const BIG_FILE = 50 * 1024 * 1024;

let docs = []; // { id, file, pdf, numPages }
let resultText = '';
let resultBase = 'metin';

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });

/** PDF'leri pdf.js ile açar; şifreli/bozuk dosyalar Türkçe mesajla reddedilir. */
async function addFiles(files) {
  showError($('error'), null);
  $('ocr-hint').hidden = true;
  $('result').classList.remove('is-active');
  let pdfjs;
  try { pdfjs = await getPdfJs(); } catch (err) { showError($('error'), friendlyError(err)); return; }
  for (const file of files) {
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      showError($('error'), `"${file.name}" bir PDF değil. Resimden metin okumak için Resimden Yazıya (OCR) aracını, Word dosyası için Metin Araçları'nı kullanın.`);
      continue;
    }
    let pdf;
    try {
      pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    } catch (err) {
      const s = String(err && (err.name + ' ' + err.message));
      showError($('error'), /PasswordException|password|encrypted/i.test(s)
        ? `"${file.name}" şifreli görünüyor. Önce PDF şifresini kaldırıp (ör. PDF'i açın → Yazdır → "PDF olarak kaydet") tekrar deneyin.`
        : `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF okuyucuda açabildiğinizi kontrol edip yeniden seçin.`);
      continue;
    }
    if (file.size >= BIG_FILE) $('warn').hidden = false;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    docs.push({ id, file, pdf, numPages: pdf.numPages });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>';
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = `${pdf.numPages} sayfa · ${formatBytes(file.size)}`;
    $('files').appendChild(li);
  }
  refresh();
}

$('files').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (!btn) return;
  const li = btn.closest('li');
  docs = docs.filter((d) => d.id !== li.dataset.id);
  li.remove();
  refresh();
});

function refresh() {
  const has = docs.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  if (!has) { $('warn').hidden = true; $('result').classList.remove('is-active'); }
  const total = docs.reduce((s, d) => s + d.numPages, 0);
  $('opt-range').placeholder = has ? `Boş = tümü (1-${total === 1 ? 1 : docs[0].numPages})` : 'Örn. 1-3,5';
}

function reset() {
  docs = []; resultText = '';
  $('files').innerHTML = '';
  $('output').value = '';
  $('ocr-hint').hidden = true;
  $('copy-status').textContent = '';
  setProgress($('progress'), null);
  showError($('error'), null);
  refresh();
}
$('clear').addEventListener('click', reset);

/**
 * Sayfanın metin öğelerini satırlara (y koordinatı) ve paragraflara (dikey boşluk) ayırır.
 * Dönüş: [[satır, satır…], [satır…]] → paragraf listesi.
 */
function buildParagraphs(content) {
  const items = [];
  for (const it of content.items) {
    if (typeof it.str !== 'string' || !it.str.trim()) continue;
    const [a, b, , d, x, y] = it.transform;
    const size = Math.max(1, Math.abs(d) || Math.hypot(a, b) || it.height || 10);
    items.push({ text: it.str, x, y, w: it.width || 0, size });
  }
  if (!items.length) return [];
  items.sort((p, q) => (q.y - p.y) || (p.x - q.x));
  const lines = [];
  for (const it of items) {
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.y - it.y) <= Math.max(line.size, it.size) * 0.45) line.items.push(it);
    else lines.push({ y: it.y, size: it.size, items: [it] });
  }
  for (const line of lines) {
    line.items.sort((p, q) => p.x - q.x);
    line.size = Math.max(...line.items.map((i) => i.size));
    let text = '';
    let prev = null;
    for (const it of line.items) {
      let t = it.text;
      if (prev) {
        const gap = it.x - (prev.x + prev.w);
        if (gap > prev.size * 0.15 && !/\s$/.test(prev.text) && !/^\s/.test(t)) t = ` ${t}`;
      }
      text += t;
      prev = it;
    }
    line.text = text.replace(/\s+/g, ' ').trim();
  }
  const paras = [];
  for (const line of lines) {
    const para = paras[paras.length - 1];
    if (para) {
      const prevLine = para[para.length - 1];
      const gap = prevLine.y - line.y;
      const bigGap = gap > Math.max(prevLine.size, line.size) * 1.7;
      const sizeJump = Math.abs(line.size - prevLine.size) > prevLine.size * 0.2;
      if (!bigGap && !sizeJump) { para.push(line); continue; }
    }
    paras.push([line]);
  }
  return paras;
}

/** Paragraf satırlarını tek satıra indirger; satır sonu tirelerini birleştirir. */
function joinLines(lines) {
  let out = '';
  for (const line of lines) {
    if (!out) { out = line.text; continue; }
    if (/[A-Za-zÇĞİÖŞÜçğıöşü]-$/.test(out) && /^[a-zçğıöşü]/.test(line.text)) out = out.slice(0, -1) + line.text;
    else out += ` ${line.text}`;
  }
  return out;
}

$('run').addEventListener('click', async () => {
  if (!docs.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('ocr-hint').hidden = true;
  $('result').classList.remove('is-active');
  $('copy-status').textContent = '';
  const merge = $('opt-merge').checked;
  const separators = $('opt-sep').checked;
  const rangeExpr = $('opt-range').value.trim();
  try {
    const chunks = [];
    let totalChars = 0;
    let totalPages = 0;
    let done = 0;
    const planned = docs.reduce((s, d) => s + (rangeExpr ? parsePageRanges(rangeExpr, d.numPages).length : d.numPages), 0) || 1;
    for (const d of docs) {
      const pages = rangeExpr ? parsePageRanges(rangeExpr, d.numPages) : Array.from({ length: d.numPages }, (_, i) => i + 1);
      if (!pages.length) throw new Error(`"${d.file.name}" için sayfa aralığı belgeyle eşleşmiyor (belge ${d.numPages} sayfa). Örnek: 1-3,5`);
      const parts = [];
      for (const n of pages) {
        setProgress($('progress'), (done / planned) * 100, `${d.file.name} · sayfa ${n}/${d.numPages} okunuyor…`);
        await tick();
        const page = await d.pdf.getPage(n);
        const content = await page.getTextContent();
        const paras = buildParagraphs(content);
        const text = paras.map((p) => (merge ? joinLines(p) : p.map((l) => l.text).join('\n'))).join('\n\n');
        totalChars += text.length;
        if (separators) parts.push(`--- Sayfa ${n} ---\n${text}`);
        else if (text) parts.push(text);
        page.cleanup();
        done++; totalPages++;
      }
      const body = parts.join('\n\n');
      chunks.push(docs.length > 1 ? `===== ${d.file.name} =====\n\n${body}` : body);
    }
    if (!totalChars) throw new Error('NO_TEXT');
    resultText = chunks.join('\n\n\n').replace(/\n{4,}/g, '\n\n\n').trim() + '\n';
    resultBase = docs.length === 1 ? baseName(docs[0].file.name) : 'metinler';
    $('output').value = resultText;
    const words = resultText.split(/\s+/).filter(Boolean).length;
    const chars = resultText.replace(/\n$/, '').length;
    $('result-info').textContent = `${docs.length > 1 ? `${docs.length} dosya · ` : ''}${totalPages} sayfa · ${words.toLocaleString('tr-TR')} kelime · ${chars.toLocaleString('tr-TR')} karakter`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    if (err && err.message === 'NO_TEXT') {
      showError($('error'), 'Bu PDF\'de seçilebilir metin yok; sayfalar büyük olasılıkla taranmış resim. Metni okumak için Resimden Yazıya (OCR) aracını kullanın.');
      $('ocr-hint').hidden = false;
    } else if (err && /Geçersiz sayfa|sayfa aralığı/.test(err.message)) {
      showError($('error'), err.message);
    } else {
      showError($('error'), friendlyError(err));
    }
  } finally {
    btn.disabled = false;
  }
});

/** Panoya kopyala; Clipboard API yoksa textarea seçimiyle dener. */
$('copy').addEventListener('click', async () => {
  if (!resultText) return;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(resultText);
    else { $('output').select(); document.execCommand('copy'); }
    $('copy-status').textContent = 'Metin panoya kopyalandı.';
  } catch {
    $('copy-status').textContent = 'Kopyalanamadı; metni kutudan seçip Ctrl+C ile kopyalayın.';
  }
});

$('download-txt').addEventListener('click', () => {
  if (!resultText) return;
  // BOM: Windows Not Defteri ve Excel Türkçe karakterleri doğru göstersin diye.
  downloadBlob(new Blob(['﻿' + resultText], { type: 'text/plain;charset=utf-8' }), `${resultBase}.txt`);
});

let docxPromise = null;
function getDocx() {
  if (!docxPromise) docxPromise = import(new URL('../vendor/docx@9.15.1/docx.mjs', import.meta.url).href);
  return docxPromise;
}

$('download-docx').addEventListener('click', async () => {
  if (!resultText) return;
  const btn = $('download-docx');
  btn.disabled = true;
  try {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await getDocx();
    const children = [];
    for (const block of resultText.split(/\n{2,}/)) {
      const t = block.trim();
      if (!t) continue;
      const sep = t.match(/^--- Sayfa (\d+) ---\n?([\s\S]*)$/);
      if (sep) {
        children.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(`Sayfa ${sep[1]}`)] }));
        if (!sep[2].trim()) continue;
        pushLines(sep[2].trim());
      } else if (/^===== .+ =====$/.test(t)) {
        children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t.replace(/^=+\s*|\s*=+$/g, ''))] }));
      } else pushLines(t);
    }
    function pushLines(t) {
      const lines = t.split('\n');
      const runs = [];
      lines.forEach((l, i) => runs.push(new TextRun({ text: l, break: i > 0 ? 1 : 0 })));
      children.push(new Paragraph({ spacing: { after: 160 }, children: runs }));
    }
    const doc = new Document({ creator: 'Bilişim Ajans Ücretsiz Araçlar', title: resultBase, sections: [{ children }] });
    let blob = await Packer.toBlob(doc);
    if (blob.type !== DOCX_MIME) blob = new Blob([blob], { type: DOCX_MIME });
    downloadBlob(blob, `${resultBase}.docx`);
  } catch (err) {
    console.error(err);
    showError($('error'), 'Word dosyası oluşturulamadı. TXT olarak indirip Word\'de açmayı deneyin.');
  } finally {
    btn.disabled = false;
  }
});
