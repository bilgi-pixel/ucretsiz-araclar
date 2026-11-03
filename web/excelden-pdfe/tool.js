// Excel'i PDF'e Çevir — tamamı tarayıcıda. Dosya hiçbir zaman sunucuya gitmez.
// Okuma: SheetJS CE (Apache-2.0). Çizim: pdf-lib + fontkit + DejaVu Sans (Türkçe karakterler için).
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const BIG_FILE = 50 * 1024 * 1024;     // 50 MB üzeri: uyarı
const BIG_ROWS = 5000;                 // bu satırdan sonra "çok sayfa" uyarısı
const MAX_ROWS = 100000;               // sert sınır
const MAX_PAGES = 1000;                // üretilecek PDF sayfa sınırı
const PREVIEW_ROWS = 30;
const PREVIEW_COLS = 20;
const SIZES = { a4: [595.28, 841.89], a3: [841.89, 1190.55] };

const state = { file: null, wb: null, sheets: [], blob: null, name: 'tablo.pdf' };
let fontCache = null;

createDropzone({
  el: $('drop'),
  accept: '.xlsx,.xls,.csv,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  multiple: false,
  onFiles: (files) => openFile(files[0]),
});

async function getXlsx() {
  await loadScript(`${VENDOR}xlsx@0.20.3/xlsx.full.min.js`);
  return window.XLSX;
}

/** Hata kutusunu temizler ve sonucu gizler. */
function resetUi() {
  showError($('error'), null);
  showError($('warning'), null);
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
}

/** CSV baytlarını çözer: önce UTF-8 (BOM'lu olabilir), olmazsa Windows-1254. */
function decodeCsv(bytes) {
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes).replace(/^﻿/, ''); } catch { /* ANSI */ }
  return new TextDecoder('windows-1254').decode(bytes);
}

/** İlk satırlara bakarak ayracı seçer. */
function detectDelimiter(text) {
  const head = text.slice(0, 20000).split(/\r\n|\r|\n/).slice(0, 10).join('\n');
  let best = ',', bestN = -1;
  for (const d of [';', ',', '\t', '|']) {
    const n = head.split(d).length - 1;
    if (n > bestN) { best = d; bestN = n; }
  }
  return best;
}

/** SheetJS sayfasını görünen metin matrisine çevirir (biçimli metin: sayı/tarih biçimleri korunur). */
function sheetToMatrix(XLSX, ws) {
  if (!ws || !ws['!ref']) return { rows: [], nums: [] };
  const range = XLSX.utils.decode_range(ws['!ref']);
  const rows = [], nums = [];
  let maxCol = -1;
  for (let r = range.s.r; r <= range.e.r; r++) {
    const row = [], flag = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = ws[XLSX.utils.encode_cell({ r, c })];
      let text = '', isNum = false;
      if (cell && cell.t !== 'z') {
        if (cell.w != null) text = String(cell.w);
        else if (cell.v instanceof Date) text = cell.v.toLocaleDateString('tr-TR');
        else if (cell.v != null) {
          try { text = cell.z && cell.t === 'n' ? XLSX.SSF.format(cell.z, cell.v) : String(cell.v); } catch { text = String(cell.v); }
        }
        isNum = cell.t === 'n';
      }
      row.push(text.replace(/\r\n?/g, '\n'));
      flag.push(isNum);
      if (text !== '' && c - range.s.c > maxCol) maxCol = c - range.s.c;
    }
    rows.push(row); nums.push(flag);
  }
  // Sondaki boş satır ve sütunları at.
  let last = rows.length - 1;
  while (last >= 0 && rows[last].every((t) => t === '')) last--;
  rows.length = last + 1; nums.length = last + 1;
  for (let i = 0; i < rows.length; i++) { rows[i].length = maxCol + 1; nums[i].length = maxCol + 1; }
  return { rows, nums };
}

async function openFile(file) {
  resetUi();
  state.blob = null;
  $('options').hidden = true; $('actions').hidden = true; $('preview-box').hidden = true;
  const ext = (file.name.match(/\.([^.]+)$/) || [, ''])[1].toLowerCase();
  if (!['xlsx', 'xls', 'csv'].includes(ext)) {
    showError($('error'), `"${file.name}" bir Excel ya da CSV dosyası değil. .xlsx, .xls veya .csv seçin; Word için "Word'den PDF'e", resim için "Resimden PDF'e" aracını kullanın.`);
    return;
  }
  if (file.size > BIG_FILE) {
    showError($('warning'), `Dosya ${formatBytes(file.size)}; 50 MB üzerindeki tablolar tarayıcıyı yavaşlatabilir. Gerekirse tabloyu Excel'de parçalara ayırıp ayrı ayrı çevirin.`);
  }
  setProgress($('progress'), 10, 'Tablo okunuyor…');
  await tick();
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    // Uzantıya güvenmeyip içeriğin biçimine bakıyoruz: yanlış dosya düz metin gibi okunmasın.
    const isZip = bytes[0] === 0x50 && bytes[1] === 0x4B;
    const isOle = bytes[0] === 0xD0 && bytes[1] === 0xCF && bytes[2] === 0x11 && bytes[3] === 0xE0;
    if (ext === 'xlsx' && !isZip) throw new Error('NOTXLSX');
    if (ext === 'xls' && !isOle && !isZip) throw new Error('NOTXLSX');
    if (ext === 'csv' && bytes.subarray(0, 4096).includes(0) && !(bytes[0] === 0xFF && bytes[1] === 0xFE)) throw new Error('NOTCSV');
    const XLSX = await getXlsx();
    let wb;
    if (ext === 'csv') {
      const text = decodeCsv(bytes);
      if (!text.trim()) throw new Error('EMPTY');
      wb = XLSX.read(text, { type: 'string', raw: true, FS: detectDelimiter(text) });
    } else {
      wb = XLSX.read(bytes, { type: 'array', cellDates: true, cellNF: true, cellText: true });
    }
    const hiddenFlags = (wb.Workbook && wb.Workbook.Sheets) || [];
    const sheets = [];
    wb.SheetNames.forEach((name, i) => {
      const hidden = hiddenFlags[i] && hiddenFlags[i].Hidden;
      const m = sheetToMatrix(XLSX, wb.Sheets[name]);
      if (m.rows.length && m.rows[0].length) sheets.push({ name, hidden: !!hidden, rows: m.rows, nums: m.nums });
    });
    if (!sheets.length) throw new Error('EMPTY');
    state.file = file; state.wb = wb; state.sheets = sheets;
    fillSheetSelect();
    $('file-info').textContent = `${file.name} · ${formatBytes(file.size)} · ${sheets.length} sayfa (sheet)`;
    $('options').hidden = false; $('actions').hidden = false;
    renderPreview();
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || '');
    showError($('error'),
      /password|encrypt/i.test(m) ? 'Dosya şifreli görünüyor; Excel\'de şifreyi kaldırıp (Dosya → Bilgi → Çalışma Kitabını Koru → Parola ile Şifrele → parolayı silin) yeniden kaydedin, sonra tekrar seçin.'
        : m === 'NOTXLSX' ? `"${file.name}" geçerli bir Excel dosyası değil ya da bozulmuş. Dosyayı Excel'de açıp "Farklı Kaydet → Excel Çalışma Kitabı (.xlsx)" ile yeniden kaydedin.`
          : m === 'NOTCSV' ? `"${file.name}" metin tabanlı bir CSV değil (ikili içerik var). Dosyayı Excel'de açıp "Farklı Kaydet → CSV UTF-8" ile kaydedin ya da .xlsx olarak seçin.`
            : m === 'EMPTY' ? 'Dosyada okunabilir veri bulunamadı. Tablonun en az bir dolu hücre içerdiğinden emin olup yeniden deneyin.'
              : /memory|allocation/i.test(m) ? 'Dosya tarayıcı belleği için fazla büyük. Tabloyu daha küçük parçalara bölüp tekrar deneyin.'
                : 'Dosya okunamadı. Bozulmuş olabilir; Excel\'de açıp yeniden kaydettikten sonra tekrar seçin.');
  }
}

function fillSheetSelect() {
  const sel = $('opt-sheet');
  sel.textContent = '';
  state.sheets.forEach((s, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = `${s.name}${s.hidden ? ' (gizli)' : ''} — ${s.rows.length.toLocaleString('tr-TR')} satır × ${s.rows[0].length} sütun`;
    sel.appendChild(o);
  });
  if (state.sheets.length > 1) {
    const o = document.createElement('option');
    o.value = 'all';
    o.textContent = 'Tüm sayfalar (hepsi tek PDF\'te)';
    sel.appendChild(o);
  }
  const firstVisible = state.sheets.findIndex((s) => !s.hidden);
  sel.value = String(Math.max(0, firstVisible));
}

function selectedSheets() {
  const v = $('opt-sheet').value;
  return v === 'all' ? state.sheets : [state.sheets[Number(v)]];
}

/** Seçili sayfanın ilk satırlarını tablo olarak gösterir ve boyut uyarılarını verir. */
function renderPreview() {
  const sheets = selectedSheets();
  const s = sheets[0];
  const table = $('preview-table');
  table.textContent = '';
  const cols = Math.min(PREVIEW_COLS, s.rows[0].length);
  const thead = table.createTHead().insertRow();
  const corner = document.createElement('th'); corner.scope = 'col'; corner.textContent = '#'; thead.appendChild(corner);
  for (let c = 0; c < cols; c++) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = colLabel(c); thead.appendChild(th); }
  const tb = table.createTBody();
  s.rows.slice(0, PREVIEW_ROWS).forEach((row, i) => {
    const tr = tb.insertRow();
    const n = document.createElement('th'); n.scope = 'row'; n.textContent = String(i + 1); tr.appendChild(n);
    for (let c = 0; c < cols; c++) {
      const td = tr.insertCell(); td.textContent = row[c];
      if (s.nums[i][c]) td.style.textAlign = 'right';
    }
  });
  const totalRows = sheets.reduce((a, x) => a + x.rows.length, 0);
  $('preview-note').textContent = `"${s.name}" sayfasının ilk ${Math.min(PREVIEW_ROWS, s.rows.length)} satırı${s.rows[0].length > PREVIEW_COLS ? ` ve ilk ${PREVIEW_COLS} sütunu` : ''} gösteriliyor. Toplam: ${totalRows.toLocaleString('tr-TR')} satır.`;
  $('preview-box').hidden = false;
  $('result').classList.remove('is-active');
  const warns = [];
  if (totalRows > BIG_ROWS) warns.push(`Tabloda ${totalRows.toLocaleString('tr-TR')} satır var; PDF yüzlerce sayfa olabilir ve hazırlanması birkaç saniye sürebilir. "Sığdır" ve daha küçük yazı boyutu sayfa sayısını azaltır.`);
  if (s.rows[0].length > 25) warns.push(`Tabloda ${s.rows[0].length} sütun var. "Sığdır" açıkken yazı çok küçülebilir; okunabilirlik için A3 ya da kapalı "Sığdır" (sütunlar ayrı sayfalara bölünür) deneyin.`);
  showError($('warning'), warns.join(' ') || null);
}

function colLabel(i) {
  let s = ''; let n = i;
  do { s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26) - 1; } while (n >= 0);
  return s;
}

$('opt-sheet').addEventListener('change', renderPreview);

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

function readOptions() {
  const num = (id, min, max, def) => {
    const v = Number($(id).value);
    return Number.isFinite(v) && $(id).value !== '' ? Math.max(min, Math.min(max, v)) : def;
  };
  const [w, h] = SIZES[$('opt-page').value] || SIZES.a4;
  const landscape = $('opt-orient').value === 'landscape';
  return {
    pw: landscape ? h : w, ph: landscape ? w : h,
    size: num('opt-size', 6, 14, 9),
    fit: $('opt-fit').checked,
    header: $('opt-header').checked,
    grid: $('opt-grid').checked,
    zebra: $('opt-zebra').checked,
    numbers: $('opt-numbers').checked,
  };
}

/** Tüm sayfaları (sheet) tek PDF'e çizer. */
async function buildPdf(sheets, o) {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fonts = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(baseName(state.file.name));
  const regular = await doc.embedFont(fonts.regular, { subset: true });
  const bold = await doc.embedFont(fonts.bold, { subset: true });
  const { rgb } = PDFLib;
  const ink = rgb(0.1, 0.1, 0.1), line = rgb(0.72, 0.72, 0.72), headFill = rgb(0.93, 0.89, 0.9), zebraFill = rgb(0.965, 0.965, 0.965), grey = rgb(0.45, 0.45, 0.45);

  let charset = null;
  try { charset = new Set(regular.getCharacterSet()); } catch { charset = null; }
  let replaced = 0;
  const clean = (s) => {
    let out = '';
    for (const ch of String(s)) {
      const cp = ch.codePointAt(0);
      if (ch === '\n') { out += '\n'; continue; }
      if (ch === '\t') { out += ' '; continue; }
      if (cp === 0xa0) { out += ' '; continue; }
      if (cp < 32 || cp === 0x7f || (cp >= 0x200b && cp <= 0x200f) || cp === 0xfeff || cp === 0xfffd) continue;
      if (charset && !charset.has(cp)) { out += '?'; replaced++; continue; }
      out += ch;
    }
    return out;
  };

  const M = 28;                       // kenar boşluğu (pt)
  const FOOT = 18;                    // altbilgi payı
  const PADX = 3, PADY = 2;
  const contentW = o.pw - 2 * M;
  const MAX_LINES = 8;
  const pageMeta = [];                // { page, sheet } — altbilgi için

  for (let si = 0; si < sheets.length; si++) {
    const sheet = sheets[si];
    const rows = sheet.rows.map((r) => r.map(clean));
    const nums = sheet.nums;
    const ncols = rows[0].length;
    const hasHeader = o.header && rows.length > 1;

    // Sütun genişlikleri: ilk 1500 satırdaki en geniş metne göre (başlık kalın yazıyla).
    const natural = new Array(ncols).fill(18);
    const sample = Math.min(rows.length, 1500);
    for (let r = 0; r < sample; r++) {
      const f = (r === 0 && hasHeader) ? bold : regular;
      for (let c = 0; c < ncols; c++) {
        const t = rows[r][c];
        if (!t) continue;
        const first = t.indexOf('\n') >= 0 ? t.split('\n').reduce((a, b) => (a.length > b.length ? a : b)) : t;
        const w = f.widthOfTextAtSize(first, o.size) + 2 * PADX;
        if (w > natural[c]) natural[c] = w;
      }
    }
    const cap = o.fit ? 300 : contentW;
    for (let c = 0; c < ncols; c++) natural[c] = Math.min(natural[c], cap);
    const total = natural.reduce((a, b) => a + b, 0);

    let fs = o.size, widths = natural.slice(), bands;
    if (o.fit) {
      if (total > contentW) {
        const k = contentW / total;
        fs = Math.max(4.5, o.size * k);
        widths = natural.map((w) => w * k);
      }
      bands = [Array.from({ length: ncols }, (_, i) => i)];
    } else {
      // Sığdır kapalı: sütunlar sığdığı kadar gruplanır, taşanlar sonraki sayfa bandına geçer.
      bands = []; let cur = []; let acc = 0;
      for (let c = 0; c < ncols; c++) {
        if (cur.length && acc + widths[c] > contentW + 0.01) { bands.push(cur); cur = []; acc = 0; }
        cur.push(c); acc += widths[c];
      }
      if (cur.length) bands.push(cur);
    }
    const lineH = fs * 1.25;

    /** Hücre metnini sütun genişliğine göre satırlara böler. */
    const wrap = (text, font, w) => {
      const maxW = Math.max(6, w - 2 * PADX);
      const out = [];
      for (const para of text.split('\n')) {
        if (font.widthOfTextAtSize(para, fs) <= maxW) { out.push(para); continue; }
        let cur = '';
        for (const word of para.split(/(\s+)/)) {
          if (font.widthOfTextAtSize(cur + word, fs) <= maxW) { cur += word; continue; }
          if (cur.trim()) { out.push(cur.trimEnd()); cur = ''; }
          let piece = word.trimStart();
          while (piece && font.widthOfTextAtSize(piece, fs) > maxW) {
            let n = 1;
            while (n < piece.length && font.widthOfTextAtSize(piece.slice(0, n + 1), fs) <= maxW) n++;
            out.push(piece.slice(0, n)); piece = piece.slice(n);
          }
          cur = piece;
        }
        if (cur) out.push(cur.trimEnd());
        if (out.length >= MAX_LINES) break;
      }
      if (out.length > MAX_LINES) { out.length = MAX_LINES; out[MAX_LINES - 1] = `${out[MAX_LINES - 1].slice(0, -1)}…`; }
      return out.length ? out : [''];
    };

    for (let bi = 0; bi < bands.length; bi++) {
      const cols = bands[bi];
      const xs = []; let x = M;
      for (const c of cols) { xs.push(x); x += widths[c]; }
      const tableW = x - M;
      let page = null, y = 0, pageTop = 0;

      const finishPage = () => {
        if (!page) return;
        if (o.grid) {
          for (let i = 0; i <= cols.length; i++) {
            const vx = i < cols.length ? xs[i] : M + tableW;
            page.drawLine({ start: { x: vx, y: pageTop }, end: { x: vx, y }, thickness: 0.4, color: line });
          }
        }
      };
      const rowLayout = (r, isHead) => {
        const f = isHead ? bold : regular;
        const cells = cols.map((c) => wrap(rows[r][c], f, widths[c]));
        const h = Math.max(...cells.map((l) => l.length)) * lineH + 2 * PADY;
        return { cells, h, f };
      };
      const newPage = () => {
        finishPage();
        if (pageMeta.length >= MAX_PAGES) throw new Error('TOOMANY');
        page = doc.addPage([o.pw, o.ph]);
        pageMeta.push({ page, label: sheets.length > 1 || bands.length > 1 ? `${sheet.name}${bands.length > 1 ? ` (sütun grubu ${bi + 1}/${bands.length})` : ''}` : sheet.name });
        y = o.ph - M; pageTop = y;
        if (o.grid) page.drawLine({ start: { x: M, y }, end: { x: M + tableW, y }, thickness: 0.4, color: line });
      };
      const drawRow = (lay, r, isHead, shade) => {
        const rowBottom = y - lay.h;
        if (isHead) page.drawRectangle({ x: M, y: rowBottom, width: tableW, height: lay.h, color: headFill });
        else if (shade) page.drawRectangle({ x: M, y: rowBottom, width: tableW, height: lay.h, color: zebraFill });
        cols.forEach((c, i) => {
          const rightAlign = !isHead && nums[r][c];
          lay.cells[i].forEach((t, li) => {
            if (!t) return;
            const tw = lay.f.widthOfTextAtSize(t, fs);
            const tx = rightAlign ? xs[i] + widths[c] - PADX - tw : xs[i] + PADX;
            page.drawText(t, { x: tx, y: y - PADY - fs * 0.95 - li * lineH, size: fs, font: lay.f, color: ink });
          });
        });
        if (o.grid) page.drawLine({ start: { x: M, y: rowBottom }, end: { x: M + tableW, y: rowBottom }, thickness: 0.4, color: line });
        y = rowBottom;
      };

      const headLay = hasHeader ? rowLayout(0, true) : null;
      newPage();
      if (headLay) drawRow(headLay, 0, true, false);
      const start = hasHeader ? 1 : 0;
      for (let r = start; r < rows.length; r++) {
        if (r % 150 === 0) {
          const done = (si + (bi + r / rows.length) / bands.length) / sheets.length;
          setProgress($('progress'), 10 + done * 85, `Satırlar çiziliyor… ${r.toLocaleString('tr-TR')} / ${rows.length.toLocaleString('tr-TR')} (${pageMeta.length} sayfa)`);
          await tick();
        }
        const lay = rowLayout(r, false);
        const bottomLimit = M + (o.numbers ? FOOT : 0);
        if (y - lay.h < bottomLimit - 0.01 && y < pageTop - 1) {
          newPage();
          if (headLay) drawRow(headLay, 0, true, false);
        }
        drawRow(lay, r, false, o.zebra && (r - start) % 2 === 1);
      }
      finishPage();
    }
  }

  if (o.numbers) {
    pageMeta.forEach((pm, i) => {
      const label = `${pm.label} · Sayfa ${i + 1} / ${pageMeta.length}`;
      const tw = regular.widthOfTextAtSize(clean(label), 8);
      pm.page.drawText(clean(label), { x: Math.max(M, (o.pw - tw) / 2), y: M - 6, size: 8, font: regular, color: grey });
    });
  }
  return { bytes: await doc.save({ useObjectStreams: false }), pages: pageMeta.length, replaced };
}

$('convert').addEventListener('click', async () => {
  const btn = $('convert');
  showError($('error'), null);
  $('result').classList.remove('is-active');
  if (!state.sheets.length) { showError($('error'), 'Önce bir Excel ya da CSV dosyası seçin.'); return; }
  const sheets = selectedSheets();
  const rowCount = sheets.reduce((a, s) => a + s.rows.length, 0);
  if (rowCount > MAX_ROWS) {
    showError($('error'), `Tabloda ${rowCount.toLocaleString('tr-TR')} satır var; tek PDF için sınır ${MAX_ROWS.toLocaleString('tr-TR')} satır. Tabloyu Excel'de bölümlere ayırıp ayrı ayrı çevirin.`);
    return;
  }
  btn.disabled = true;
  setProgress($('progress'), 5, 'Yazı tipi ve PDF kütüphanesi yükleniyor…');
  await tick();
  try {
    const o = readOptions();
    const { bytes, pages, replaced } = await buildPdf(sheets, o);
    setProgress($('progress'), 100, 'PDF yazılıyor…');
    await tick();
    state.blob = new Blob([bytes], { type: 'application/pdf' });
    state.name = `${baseName(state.file.name)}.pdf`;
    const note = replaced ? ` · ${replaced} karakter yazı tipinde olmadığı için "?" ile değiştirildi` : '';
    $('result-info').textContent = `${pages} sayfa · ${formatBytes(state.blob.size)} · ${state.name}${note}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || '');
    showError($('error'),
      m === 'TOOMANY' ? `PDF ${MAX_PAGES} sayfayı aştı. "Sığdır" seçeneğini açın, yazı boyutunu küçültün ya da tabloyu bölümlere ayırın.`
        : m === 'FONT' || /Yüklenemedi/.test(m) ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
          : /memory|allocation/i.test(m) ? 'Tablo tarayıcı belleği için fazla büyük. Daha az satırlı parçalarla deneyin.'
            : 'PDF oluşturulurken beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse yazı boyutunu küçültüp ya da tabloyu bölüp deneyin.');
  } finally {
    btn.disabled = false;
  }
});

$('clear').addEventListener('click', () => {
  state.file = null; state.wb = null; state.sheets = []; state.blob = null;
  $('options').hidden = true; $('actions').hidden = true; $('preview-box').hidden = true;
  $('file-info').textContent = '';
  resetUi();
});

$('download').addEventListener('click', () => { if (state.blob) downloadBlob(state.blob, state.name); });
