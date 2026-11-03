// Metinden PDF Oluştur — düz metni (yazılan ya da .txt) pdf-lib ile PDF'e dizer.
// Türkçe karakterler için fontkit ile DejaVu Sans gömülür (alt kümeli). Hiçbir veri ağa gitmez;
// kütüphane ve yazı tipi aynı origin'deki vendor/ klasöründen yüklenir.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const BIG_FILE = 50 * 1024 * 1024;
const MM = 72 / 25.4;
const PAGES = { a4: [595.28, 841.89], letter: [612, 792] };

let resultBlob = null;
let resultName = 'metin.pdf';
let sourceName = 'metin';
let fontCache = null;

createDropzone({ el: $('drop'), accept: '.txt,.md,.log,.csv,text/plain', multiple: false, onFiles: (files) => openFile(files[0]) });

/** .txt dosyasını UTF-8 olarak okuyup metin kutusuna koyar. */
async function openFile(file) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  if (/\.(pdf|docx?|xlsx?|pptx?|zip|png|jpe?g|gif|webp)$/i.test(file.name)) {
    showError($('error'), `"${file.name}" düz metin dosyası değil. Yalnızca .txt dosyaları açılır; Word belgesi için "Word'den PDF'e", PDF için ilgili PDF araçlarını kullanın.`);
    return;
  }
  if (file.size > BIG_FILE) {
    showError($('error'), `Dosya ${formatBytes(file.size)}; 50 MB üzerindeki metinler tarayıcıyı yavaşlatabilir. Dosyayı bölümlere ayırıp ayrı ayrı çevirmeniz önerilir.`);
  }
  try {
    const text = await file.text();
    if (/^%PDF-/.test(text) || text.slice(0, 2000).includes('\u0000')) {
      showError($('error'), `"${file.name}" metin dosyası gibi görünmüyor (ikili içerik var). Yalnızca düz metin (.txt) seçin.`);
      return;
    }
    $('text').value = text;
    sourceName = baseName(file.name) || 'metin';
    if (!$('opt-title').value) $('opt-title').value = '';
    updateCount();
    if ((text.match(/�/g) || []).length > 3) {
      showError($('error'), 'Dosyada okunamayan karakterler var; dosya UTF-8 olmayabilir. Not Defteri\'nde "Farklı Kaydet → Kodlama: UTF-8" ile kaydedip yeniden seçin.');
    }
  } catch (err) {
    console.error(err);
    showError($('error'), 'Dosya okunamadı. Dosyayı yeniden seçin; sorun sürerse metni kopyalayıp kutuya yapıştırın.');
  }
}

function readOptions() {
  const num = (id, min, max, def) => {
    const v = Number($(id).value);
    return Number.isFinite(v) && $(id).value !== '' ? Math.max(min, Math.min(max, v)) : def;
  };
  const [w, h] = PAGES[$('opt-page').value] || PAGES.a4;
  const landscape = $('opt-orient').value === 'landscape';
  return {
    size: num('opt-size', 6, 48, 12),
    leading: Number($('opt-leading').value) || 1.4,
    margin: num('opt-margin', 10, 60, 20),
    pw: landscape ? h : w,
    ph: landscape ? w : h,
    numbers: $('opt-numbers').checked,
    title: $('opt-title').value.trim(),
  };
}

/** Kutunun altındaki sayaç ve kaba sayfa tahmini. */
function updateCount() {
  const text = $('text').value;
  const words = (text.match(/\S+/g) || []).length;
  $('count').textContent = `${text.length.toLocaleString('tr-TR')} karakter · ${words.toLocaleString('tr-TR')} kelime`;
  if (!text.trim()) { $('estimate').textContent = ''; return; }
  const o = readOptions();
  const contentW = o.pw - 2 * o.margin * MM, contentH = o.ph - 2 * o.margin * MM;
  const perLine = Math.max(10, contentW / (o.size * 0.52));
  let lines = 0;
  for (const p of text.split(/\r\n|\r|\n/)) lines += Math.max(1, Math.ceil(p.length / perLine));
  const pages = Math.max(1, Math.ceil((lines * o.size * o.leading) / contentH));
  $('estimate').textContent = `Tahmini ~${pages} sayfa`;
}
['text', 'opt-size', 'opt-leading', 'opt-margin', 'opt-page', 'opt-orient', 'opt-title'].forEach((id) => $(id).addEventListener('input', updateCount));
['opt-leading', 'opt-page', 'opt-orient'].forEach((id) => $(id).addEventListener('change', updateCount));

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

/**
 * Metni PDF'e dizer.
 * @returns {Promise<{bytes: Uint8Array, pages: number, replaced: number}>}
 */
async function buildPdf(rawText, o) {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fontData = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(o.title || sourceName);
  const regular = await doc.embedFont(fontData.regular, { subset: true });
  const bold = await doc.embedFont(fontData.bold, { subset: true });

  // Yazı tipinde olmayan karakterleri "?" yap (emoji vb.); kaç tane olduğunu say.
  let charset = null;
  try { charset = new Set(regular.getCharacterSet()); } catch { charset = null; }
  let replaced = 0;
  const clean = (s) => {
    let out = '';
    for (const ch of s) {
      const cp = ch.codePointAt(0);
      if (ch === '\t') { out += '    '; continue; }
      if (cp === 0xa0) { out += ' '; continue; }
      if (cp < 32 || cp === 0x7f || (cp >= 0x200b && cp <= 0x200f) || cp === 0xfeff || cp === 0xfffd) continue;
      if (charset && !charset.has(cp)) { out += '?'; replaced++; continue; }
      out += ch;
    }
    return out;
  };

  const M = o.margin * MM;
  const contentW = o.pw - 2 * M;
  if (contentW < 100 || o.ph - 2 * M < 100) throw new Error('MARGIN');
  const black = PDFLib.rgb(0.07, 0.07, 0.07), grey = PDFLib.rgb(0.45, 0.45, 0.45);
  const lineH = o.size * o.leading;

  let page = null; let y = 0;
  const newPage = () => { page = doc.addPage([o.pw, o.ph]); y = o.ph - M; };
  const ensure = (h) => { if (!page || y - h < M - 0.01) newPage(); };

  /** Bir paragrafı genişliğe göre satırlara böler; kelime sınırında keser, uzun sözcüğü karakterle kırar. */
  const wrap = (text, font, size) => {
    const width = (t) => font.widthOfTextAtSize(t, size);
    const lines = []; let cur = ''; let curW = 0;
    const tokens = text.match(/\S+\s*|\s+/g) || [];
    for (let tok of tokens) {
      let guard = 0;
      while (tok && guard++ < 10000) {
        const full = width(tok), trimmed = width(tok.trimEnd());
        if (curW + trimmed <= contentW) { cur += tok; curW += full; tok = ''; break; }
        if (cur.trim()) { lines.push(cur.trimEnd()); cur = ''; curW = 0; tok = tok.trimStart(); continue; }
        if (trimmed <= contentW) { cur = tok.trimStart(); curW = width(cur); tok = ''; break; }
        // tek başına sığmayan sözcük: karakter düzeyinde kır
        let n = 0; let acc = 0;
        for (const ch of tok) { const cw = width(ch); if (acc + cw > contentW && n > 0) break; acc += cw; n += ch.length; }
        lines.push(tok.slice(0, n)); tok = tok.slice(n); cur = ''; curW = 0;
      }
    }
    if (cur.length || !lines.length) lines.push(cur.trimEnd());
    return lines;
  };

  newPage();
  if (o.title) {
    const tSize = o.size * 1.6, tH = tSize * 1.25;
    for (const l of wrap(clean(o.title), bold, tSize)) {
      ensure(tH);
      page.drawText(l, { x: M, y: y - tSize, size: tSize, font: bold, color: black });
      y -= tH;
    }
    y -= lineH; // başlıktan sonra bir satır boşluk
  }

  const paragraphs = rawText.replace(/\r\n?/g, '\n').split('\n');
  for (let i = 0; i < paragraphs.length; i++) {
    if (i % 200 === 0) { setProgress($('progress'), 10 + (i / paragraphs.length) * 80, `Satırlar yerleştiriliyor… (${doc.getPageCount()} sayfa)`); await tick(); }
    const p = clean(paragraphs[i]);
    if (!p.trim()) { ensure(lineH); y -= lineH; continue; } // boş satır = paragraf boşluğu
    for (const l of wrap(p, regular, o.size)) {
      ensure(lineH);
      if (l) page.drawText(l, { x: M, y: y - o.size, size: o.size, font: regular, color: black });
      y -= lineH;
    }
  }

  const pages = doc.getPages();
  if (o.numbers) {
    pages.forEach((pg, idx) => {
      const label = `${idx + 1} / ${pages.length}`;
      const lw = regular.widthOfTextAtSize(label, 9);
      pg.drawText(label, { x: (o.pw - lw) / 2, y: Math.min(M / 2, 24) - 4, size: 9, font: regular, color: grey });
    });
  }
  // Nesne akışı kapalı: eski görüntüleyicilerle uyum için.
  return { bytes: await doc.save({ useObjectStreams: false }), pages: pages.length, replaced };
}

$('convert').addEventListener('click', async () => {
  const btn = $('convert');
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const text = $('text').value;
  if (!text.trim()) {
    showError($('error'), 'Metin kutusu boş. Önce metni yazın ya da yapıştırın; isterseniz bir .txt dosyası bırakabilirsiniz.');
    $('text').focus();
    return;
  }
  btn.disabled = true;
  setProgress($('progress'), 5, 'Yazı tipi ve PDF kütüphanesi yükleniyor…');
  await tick();
  try {
    const o = readOptions();
    const { bytes, pages, replaced } = await buildPdf(text, o);
    setProgress($('progress'), 100, 'PDF yazılıyor…');
    await tick();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${(o.title ? o.title.replace(/[\\/:*?"<>|]+/g, ' ').trim() : sourceName) || 'metin'}.pdf`;
    const note = replaced ? ` · ${replaced} karakter yazı tipinde olmadığı için "?" ile değiştirildi` : '';
    $('result-info').textContent = `${pages} sayfa · ${formatBytes(resultBlob.size)} · ${resultName}${note}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || '');
    showError($('error'), m === 'MARGIN'
      ? 'Kenar boşlukları sayfaya göre çok geniş; yazı alanı kalmadı. Kenar boşluğunu küçültün (ör. 20 mm).'
      : m === 'FONT' || /Yüklenemedi/.test(m)
        ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
        : /memory|allocation/i.test(m)
          ? 'Metin tarayıcı belleği için fazla büyük. Metni bölümlere ayırıp ayrı ayrı çevirin.'
          : 'PDF oluşturulurken beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse metni kısaltarak deneyin.');
  } finally {
    btn.disabled = false;
  }
});

$('clear').addEventListener('click', () => {
  $('text').value = ''; $('opt-title').value = ''; sourceName = 'metin'; resultBlob = null;
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  showError($('error'), null);
  updateCount();
  $('text').focus();
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
updateCount();
