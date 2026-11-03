// Dilekçe Oluşturucu — standart Türk dilekçe düzeni: PDF (pdf-lib + DejaVu) ve DOCX (docx).
// Yalnızca biçim şablonu sunar; hukuki tavsiye değildir. Hiçbir veri ağa gitmez, hiçbir şey saklanmaz.
import { setProgress, downloadBlob, formatBytes, showError, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/** Hazır konu şablonları. Köşeli parantezler kullanıcının dolduracağı boşluklardır. */
const TEMPLATES = {
  genel: {
    label: 'Genel dilekçe',
    makam: '[KURUM ADI] [İLGİLİ BİRİM] MÜDÜRLÜĞÜNE',
    konu: '[Talebinizin kısa başlığı]',
    body: 'Yukarıda belirtilen konuyla ilgili olarak [talebinizi ve gerekçenizi kısaca, açık ve anlaşılır biçimde yazın].\n\nBilgilerinizi ve gereğini saygılarımla arz ederim.',
  },
  istifa: {
    label: 'İşten ayrılma (istifa) dilekçesi',
    makam: '[İŞYERİ ADI] İNSAN KAYNAKLARI MÜDÜRLÜĞÜNE',
    konu: 'İşten ayrılma (istifa) bildirimi',
    body: 'Şirketinizin [birim / departman] biriminde [pozisyon] olarak [işe başlama tarihi] tarihinden beri çalışmaktayım.\n\nKişisel nedenlerle [ayrılış tarihi] tarihi itibarıyla görevimden ayrılmak istiyorum. İhbar sürem boyunca devir teslim işlemlerinin eksiksiz yapılması için gerekli çalışmayı yürüteceğimi, varsa şirkete ait zimmetli eşyaları teslim edeceğimi bildiririm. Birlikte çalıştığımız süre boyunca sağlanan destek ve iş birliği için teşekkür ederim.\n\nGereğini saygılarımla arz ederim.',
  },
  izin: {
    label: 'İzin talebi dilekçesi',
    makam: '[KURUM / İŞYERİ ADI] [BİRİM] MÜDÜRLÜĞÜNE',
    konu: '[Yıllık / ücretsiz / mazeret] izin talebi',
    body: 'Kurumunuzun [birim] biriminde [unvan] olarak görev yapmaktayım.\n\n[İzin nedeninizi kısaca belirtin.] nedeniyle [başlangıç tarihi] ile [bitiş tarihi] tarihleri arasında, toplam [gün sayısı] iş günü [yıllık / ücretsiz / mazeret] izin kullanmak istiyorum. İzin süresince görevlerimin aksamaması için gerekli devir işlemlerini yapacağımı bildirir, talebimin uygun görülmesini saygılarımla arz ederim.',
  },
  ogrenci: {
    label: 'Öğrenci belgesi talebi',
    makam: '[OKUL / ÜNİVERSİTE ADI] ÖĞRENCİ İŞLERİ DAİRE BAŞKANLIĞINA',
    konu: 'Öğrenci belgesi talebi',
    body: 'Okulunuzun [fakülte / bölüm] bölümünde [öğrenci numarası] numaralı öğrenci olarak öğrenim görmekteyim.\n\n[Belgenin sunulacağı kurum veya kullanım amacı] için [öğrenci belgesi / transkript / not dökümü] belgesine ihtiyaç duymaktayım. Söz konusu belgenin hazırlanarak tarafıma verilmesini saygılarımla arz ederim.',
  },
  itiraz: {
    label: 'İtiraz dilekçesi',
    makam: '[KURUM ADI] [İLGİLİ BİRİM] MAKAMINA',
    konu: '[Tarih ve sayı] sayılı işleme / karara itiraz',
    body: 'Tarafıma [tebliğ tarihi] tarihinde tebliğ edilen [tarih ve sayı] sayılı [işlem / karar / bildirim] hakkında itirazlarımı aşağıda sunuyorum.\n\n1. [Birinci itiraz gerekçeniz]\n2. [İkinci itiraz gerekçeniz]\n\nYukarıda açıklanan nedenlerle söz konusu işlemin yeniden incelenmesini ve [talep ettiğiniz sonuç] yönünde karar verilmesini saygılarımla arz ederim.',
  },
  sikayet: {
    label: 'Şikâyet dilekçesi',
    makam: '[KURUM / İŞLETME ADI] [İLGİLİ BİRİM] MÜDÜRLÜĞÜNE',
    konu: '[Olay veya hizmet] hakkında şikâyet',
    body: '[Tarih] tarihinde [yer] adresinde / aracılığıyla [yaşadığınız olayı; ne olduğunu, kimin ilgili olduğunu ve zararınızı kısaca ve tarafsız bir dille anlatın].\n\nBu konuda daha önce [yaptığınız başvuru ve sonucu, yoksa "herhangi bir başvuruda bulunmadım"] belirtmek isterim. Olayın incelenmesini, sorunun giderilmesini ve sonuçtan tarafıma yazılı olarak bilgi verilmesini saygılarımla arz ederim.',
  },
  bilgi: {
    label: 'Bilgi edinme başvurusu',
    makam: '[KURUM ADI] [İLGİLİ BİRİM] MÜDÜRLÜĞÜNE',
    konu: '4982 sayılı Bilgi Edinme Hakkı Kanunu kapsamında bilgi talebi',
    body: '4982 sayılı Bilgi Edinme Hakkı Kanunu uyarınca aşağıdaki bilgi ve/veya belgelerin tarafıma verilmesini talep ediyorum:\n\n1. [İstediğiniz bilgi veya belge]\n2. [İstediğiniz diğer bilgi veya belge]\n\nTalebime ilişkin yanıtın kanunda öngörülen 15 iş günü içinde [posta / e-posta] yoluyla iletilmesini, talep edilen bilgi ya da belgenin kapsama girmediği düşünülürse gerekçesinin yazılı olarak bildirilmesini saygılarımla arz ederim.',
  },
};

let lastTemplate = '';      // son yüklenen şablon anahtarı
let lastLoadedBody = '';    // şablondan gelen metin (değiştirilmiş mi anlamak için)
let lastLoadedMakam = '';
let lastLoadedKonu = '';
let fontCache = null;
let docxPromise = null;

// ---------- Form ----------

function today() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}
/** "2026-11-04" → "04.11.2026" (saat dilimi kayması olmasın diye ayrıştırarak). */
function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}.${m[2]}.${m[1]}` : '';
}

function initTemplates() {
  const sel = $('f-template');
  for (const [key, t] of Object.entries(TEMPLATES)) {
    const o = document.createElement('option'); o.value = key; o.textContent = t.label; sel.appendChild(o);
  }
  $('f-date').value = today();
}

/** Şablonu forma yükler. force=false ise kullanıcının değiştirdiği alanların üzerine yazmaz. */
function loadTemplate(force) {
  const key = $('f-template').value;
  const t = TEMPLATES[key];
  const notes = [];
  if (!t) { $('tpl-status').textContent = ''; return; }
  const setField = (id, val, last, label, assign) => {
    const cur = $(id).value;
    if (force || !cur.trim() || cur === last) { $(id).value = val; assign(val); }
    else notes.push(label);
  };
  setField('f-body', t.body, lastLoadedBody, 'metin', (v) => { lastLoadedBody = v; });
  setField('f-makam', t.makam, lastLoadedMakam, 'makam', (v) => { lastLoadedMakam = v; });
  setField('f-konu', t.konu, lastLoadedKonu, 'konu', (v) => { lastLoadedKonu = v; });
  lastTemplate = key;
  $('tpl-status').textContent = notes.length
    ? `Değiştirdiğiniz alanların (${notes.join(', ')}) üzerine yazılmadı. Şablonun özgün hâlini görmek için "Şablon metnini yeniden yükle" düğmesine basın.`
    : 'Şablon yüklendi. Köşeli parantezli yerleri kendi bilginizle değiştirin; metni dilediğiniz gibi düzenleyebilirsiniz.';
  render();
}
$('f-template').addEventListener('change', () => loadTemplate(false));
$('tpl-reload').addEventListener('click', () => loadTemplate(true));

function collect() {
  const v = (id) => $(id).value.trim();
  return {
    makam: v('f-makam').replace(/\s+/g, ' '),
    date: formatDate($('f-date').value),
    konu: v('f-konu').replace(/\s+/g, ' '),
    body: $('f-body').value.replace(/\r\n?/g, '\n').trim(),
    name: v('f-name'), tc: v('f-tc'), address: v('f-address').replace(/\s*\n\s*/g, ' '),
    phone: v('f-phone'), email: v('f-email'),
    ekler: $('f-ekler').value.split(/\r?\n/).map((s) => s.replace(/^\s*(\d+\s*[-.)]|EK-?\d*\s*[:.-]|[-•*])\s*/i, '').trim()).filter(Boolean),
  };
}
const senderLines = (d) => [
  d.address && `Adres: ${d.address}`,
  d.phone && `Telefon: ${d.phone}`,
  d.email && `E-posta: ${d.email}`,
  d.tc && `T.C. Kimlik No: ${d.tc}`,
].filter(Boolean);
const upperTr = (s) => s.toLocaleUpperCase('tr-TR');

// ---------- Önizleme ----------

function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

function render() {
  const d = collect();
  const root = $('preview');
  root.textContent = '';
  const sheet = el('div', 'dl-sheet');
  sheet.appendChild(el('div', 'dl-makam', upperTr(d.makam) || 'MAKAM ADI'));
  sheet.appendChild(el('div', 'dl-date', d.date));
  if (d.konu) { const k = el('p', 'dl-konu'); k.append(el('strong', '', 'Konu: '), document.createTextNode(d.konu)); sheet.appendChild(k); }
  for (const para of d.body.split(/\n+/)) if (para.trim()) sheet.appendChild(el('p', 'dl-p', para));
  const foot = el('div', 'dl-foot');
  const left = el('div', 'dl-addr');
  senderLines(d).forEach((l) => left.appendChild(el('div', '', l)));
  const right = el('div', 'dl-sign');
  right.appendChild(el('strong', '', d.name || 'Ad Soyad'));
  right.appendChild(el('div', 'dl-imza', 'İmza'));
  foot.append(left, right);
  sheet.appendChild(foot);
  if (d.ekler.length) {
    const ek = el('div', 'dl-ekler'); ek.appendChild(el('strong', '', 'EKLER:'));
    d.ekler.forEach((x, i) => ek.appendChild(el('div', '', `EK-${i + 1}: ${x}`)));
    sheet.appendChild(ek);
  }
  root.appendChild(sheet);
}
$('form').addEventListener('input', () => { $('result').classList.remove('is-active'); render(); });
$('form').addEventListener('submit', (e) => e.preventDefault());

/** Üretimden önce zorunlu alanları denetler; sorun varsa Türkçe, çözüm öneren mesaj verir. */
function validate(d) {
  if (!d.makam) { showError($('error'), 'Makam boş. Dilekçenin hitap edileceği kurumu yazın (örn. "ANKARA BÜYÜKŞEHİR BELEDİYE BAŞKANLIĞINA") ya da bir konu şablonu seçin.'); $('f-makam').focus(); return false; }
  if (!d.body) { showError($('error'), 'Dilekçe metni boş. Bir konu şablonu seçin ya da talebinizi metin kutusuna yazın.'); $('f-body').focus(); return false; }
  if (!d.name) { showError($('error'), 'Ad soyad boş. İmza bölümünde görünecek ad soyadınızı "Gönderen bilgileri" kısmına yazın.'); $('f-name').focus(); return false; }
  return true;
}
const placeholderCount = (d) => (`${d.makam} ${d.konu} ${d.body}`.match(/\[[^\]]{1,200}\]/g) || []).length;

function resultNote(d) {
  const n = placeholderCount(d);
  return n ? ` · Dikkat: metinde köşeli parantezli ${n} boşluk kaldı; göndermeden önce doldurun.` : '';
}
function fileName(d, ext) {
  const slug = (d.konu || 'dilekce').replace(/\[[^\]]*\]/g, '').replace(/[\\/:*?"<>|]+/g, ' ').trim().replace(/\s+/g, '-').slice(0, 40).replace(/-+$/, '');
  return `dilekce-${slug || 'metin'}.${ext}`;
}

// ---------- PDF ----------

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
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
  doc.setTitle(d.konu || 'Dilekçe');
  doc.setAuthor(d.name);
  const reg = await doc.embedFont(fontData.regular, { subset: true });
  const bold = await doc.embedFont(fontData.bold, { subset: true });

  let charset = null;
  try { charset = new Set(reg.getCharacterSet()); } catch { charset = null; }
  let replaced = 0;
  const T = (s) => {
    let out = '';
    for (const ch of String(s || '')) {
      const cp = ch.codePointAt(0);
      if (ch === '\t') { out += '    '; continue; }
      if (cp === 0xa0) { out += ' '; continue; }
      if (cp < 32 || cp === 0x7f || (cp >= 0x200b && cp <= 0x200f) || cp === 0xfeff || cp === 0xfffd) continue;
      if (charset && !charset.has(cp)) { out += '?'; replaced++; continue; }
      out += ch;
    }
    return out;
  };

  const PW = 595.28, PH = 841.89, M = 71, MT = 64, MB = 60, W = PW - 2 * M;
  const SIZE = 11, LEAD = 17, black = rgb(0.05, 0.05, 0.05), grey = rgb(0.4, 0.4, 0.4);
  const pages = [];
  let y = 0;
  const cur = () => pages[pages.length - 1];
  const newPage = () => { pages.push(doc.addPage([PW, PH])); y = PH - MT; };
  const ensure = (h) => { if (!pages.length || y - h < MB) newPage(); };

  const wrap = (text, font, size, width, firstIndent = 0) => {
    const wd = (t) => font.widthOfTextAtSize(t, size);
    const lines = []; let line = ''; let lw = firstIndent; let limit = width - firstIndent;
    const push = () => { lines.push({ text: line.trimEnd(), indent: lines.length === 0 ? firstIndent : 0 }); line = ''; lw = 0; limit = width; };
    for (let tok of text.match(/\S+\s*|\s+/g) || []) {
      let guard = 0;
      while (tok && guard++ < 10000) {
        const full = wd(tok), trimmed = wd(tok.trimEnd());
        if (lw + trimmed <= limit) { line += tok; lw += full; tok = ''; break; }
        if (line.trim()) { push(); tok = tok.trimStart(); continue; }
        if (trimmed <= limit) { line = tok.trimStart(); lw = wd(line); tok = ''; break; }
        let n = 0; let acc = 0;
        for (const ch of tok) { const cw = wd(ch); if (acc + cw > limit && n > 0) break; acc += cw; n += ch.length; }
        line = tok.slice(0, n); tok = tok.slice(n); push();
      }
    }
    if (line.length || !lines.length) lines.push({ text: line.trimEnd(), indent: lines.length === 0 ? firstIndent : 0 });
    return lines;
  };

  /** Satırları çizer. align: left | center | right | justify-yok (sola yaslı). */
  const draw = (text, o = {}) => {
    const font = o.font || reg, size = o.size || SIZE, lead = o.lead || LEAD;
    const x0 = o.x ?? M, w = o.w ?? W;
    for (const l of wrap(T(text), font, size, w, o.indent || 0)) {
      ensure(lead);
      if (l.text) {
        const tw = font.widthOfTextAtSize(l.text, size);
        const x = o.align === 'center' ? x0 + (w - tw) / 2 : o.align === 'right' ? x0 + w - tw : x0 + l.indent;
        cur().drawText(l.text, { x, y: y - size, size, font, color: o.color || black });
      }
      y -= lead;
    }
  };

  newPage();
  // Makam: ortada, büyük harf, kalın
  draw(T(d.makam).toLocaleUpperCase('tr-TR'), { font: bold, size: 12, lead: 18, align: 'center' });
  y -= LEAD;
  if (d.date) draw(d.date, { align: 'right' });
  y -= LEAD * 0.5;
  if (d.konu) {
    ensure(LEAD * 2);
    const label = 'Konu: ';
    const lw = bold.widthOfTextAtSize(label, SIZE);
    cur().drawText(label, { x: M, y: y - SIZE, size: SIZE, font: bold, color: black });
    // Konu metni etiketten sonra başlar, taşan satırlar sola döner.
    const lines = wrap(T(d.konu), reg, SIZE, W, lw);
    for (const l of lines) { ensure(LEAD); cur().drawText(l.text, { x: M + l.indent, y: y - SIZE, size: SIZE, font: reg, color: black }); y -= LEAD; }
    y -= LEAD * 0.5;
  }
  // Metin: paragraf başı girintili
  const paras = d.body.split('\n');
  for (const p of paras) {
    if (!p.trim()) { y -= LEAD * 0.5; continue; }
    draw(p, { indent: 28 });
    y -= 5;
  }
  y -= LEAD;

  // İmza bloğu: solda gönderen bilgileri, sağda ad soyad + boş imza alanı
  const addrW = 250, signW = 190;
  const addrLines = senderLines(d).flatMap((l) => wrap(T(l), reg, 9.5, addrW).map((x) => x.text));
  const nameLines = wrap(T(d.name), bold, SIZE, signW).map((x) => x.text);
  const signH = nameLines.length * LEAD + 14 + 56;
  const blockH = Math.max(addrLines.length * 14, signH);
  ensure(blockH + 4);
  const top = y;
  let ay = top;
  for (const l of addrLines) { cur().drawText(l, { x: M, y: ay - 9.5, size: 9.5, font: reg, color: black }); ay -= 14; }
  let sy = top;
  const sx = PW - M - signW;
  for (const l of nameLines) {
    const tw = bold.widthOfTextAtSize(l, SIZE);
    cur().drawText(l, { x: sx + (signW - tw) / 2, y: sy - SIZE, size: SIZE, font: bold, color: black });
    sy -= LEAD;
  }
  const im = 'İmza', iw = reg.widthOfTextAtSize(im, 9.5);
  cur().drawText(im, { x: sx + (signW - iw) / 2, y: sy - 9.5, size: 9.5, font: reg, color: grey });
  y = top - blockH - LEAD;

  if (d.ekler.length) {
    ensure(LEAD * 2);
    draw('EKLER:', { font: bold });
    d.ekler.forEach((x, i) => draw(`EK-${i + 1}: ${x}`));
  }
  return { bytes: await doc.save({ useObjectStreams: false }), pages: pages.length, replaced };
}

$('make-pdf').addEventListener('click', async () => {
  const btn = $('make-pdf');
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const d = collect();
  if (!validate(d)) return;
  btn.disabled = true;
  setProgress($('progress'), 15, 'Yazı tipi ve PDF kütüphanesi yükleniyor…');
  await tick();
  try {
    const { bytes, pages, replaced } = await buildPdf(d);
    setProgress($('progress'), 100, 'PDF yazılıyor…');
    await tick();
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const name = fileName(d, 'pdf');
    downloadBlob(blob, name);
    const note = replaced ? ` · ${replaced} karakter yazı tipinde olmadığı için "?" ile değiştirildi` : '';
    $('result-info').textContent = `${pages} sayfa · ${formatBytes(blob.size)} · ${name}${note}${resultNote(d)}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), String(err && err.message) === 'FONT'
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : 'PDF oluşturulurken beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse metni kısaltarak deneyin.');
  } finally { btn.disabled = false; }
});

// ---------- DOCX ----------

function getDocx() {
  if (!docxPromise) docxPromise = import(new URL('../vendor/docx@9.15.1/docx.mjs', import.meta.url).href);
  return docxPromise;
}

async function buildDocx(d) {
  const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, TableBorders } = await getDocx();
  const FONT = 'Times New Roman';
  const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 24, bold: o.bold });
  const para = (text, o = {}) => new Paragraph({
    alignment: o.align || AlignmentType.LEFT,
    spacing: { after: o.after ?? 120, before: o.before ?? 0, line: 300 },
    indent: o.firstLine ? { firstLine: o.firstLine } : undefined,
    children: o.runs || (text === '' ? [] : [run(text, o)]),
  });
  const children = [];
  children.push(para(upperTr(d.makam), { align: AlignmentType.CENTER, bold: true, after: 360 }));
  if (d.date) children.push(para(d.date, { align: AlignmentType.RIGHT, after: 240 }));
  if (d.konu) children.push(para('', { runs: [run('Konu: ', { bold: true }), run(d.konu)], after: 240 }));
  for (const p of d.body.split('\n')) children.push(p.trim() ? para(p, { firstLine: 567, align: AlignmentType.LEFT }) : para('', { after: 60 }));
  children.push(para('', { after: 240 }));

  const addr = senderLines(d).map((l) => para(l, { size: 20, after: 40 }));
  const sign = [
    para(d.name, { align: AlignmentType.CENTER, bold: true, after: 40 }),
    para('İmza', { align: AlignmentType.CENTER, size: 20, after: 0 }),
    para('', { after: 600 }),
  ];
  const cell = (kids, w) => new TableCell({ width: { size: w, type: WidthType.PERCENTAGE }, children: kids.length ? kids : [para('')], borders: TableBorders.NONE });
  children.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: TableBorders.NONE,
    rows: [new TableRow({ cantSplit: true, children: [cell(addr, 60), cell(sign, 40)] })],
  }));
  if (d.ekler.length) {
    children.push(para('EKLER:', { bold: true, before: 240, after: 60 }));
    d.ekler.forEach((x, i) => children.push(para(`EK-${i + 1}: ${x}`, { after: 40 })));
  }
  const docx = new Document({
    creator: 'Bilişim Ajans Ücretsiz Araçlar',
    title: d.konu || 'Dilekçe',
    description: 'araclar.bilisimajans.com ile hazırlandı',
    styles: { default: { document: { run: { font: FONT, size: 24 } } } },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1418, bottom: 1134, left: 1418, right: 1418 } } }, children }],
  });
  const blob = await Packer.toBlob(docx);
  return blob.type === DOCX_MIME ? blob : new Blob([blob], { type: DOCX_MIME });
}

$('make-docx').addEventListener('click', async () => {
  const btn = $('make-docx');
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const d = collect();
  if (!validate(d)) return;
  btn.disabled = true;
  setProgress($('progress'), 30, 'Word belgesi hazırlanıyor…');
  await tick();
  try {
    const blob = await buildDocx(d);
    const name = fileName(d, 'docx');
    downloadBlob(blob, name);
    $('result-info').textContent = `${formatBytes(blob.size)} · ${name}${resultNote(d)}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Word belgesi oluşturulurken bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse PDF olarak indirin.');
  } finally { btn.disabled = false; }
});

initTemplates();
render();
