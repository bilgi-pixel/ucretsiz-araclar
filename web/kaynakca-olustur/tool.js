// Kaynakça Oluşturucu — APA 7, MLA 9, Chicago 17 (yazar-tarih). Tamamı tarayıcıda çalışır.
// İç gösterim: italik kısımlar `*...*` işaretleriyle tutulur; düz metin, HTML ve DOCX çıktıları bundan üretilir.
import { downloadBlob, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/* ---------- Dil sözlüğü ---------- */
const MONTHS = {
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  enShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
};
const LANG = {
  tr: { and: 've', etAl: 'vd.', nd: 't.y.', pp: 'ss.', vol: 'c.', no: 'sy.', edBy: 'editör:', edAbbr: 'Ed.', inn: 'İçinde', accessed: 'Erişim tarihi:', refTitle: 'Kaynakça' },
  en: { and: 'and', etAl: 'et al.', nd: 'n.d.', pp: 'pp.', vol: 'vol.', no: 'no.', edBy: 'edited by', edAbbr: 'Ed.', inn: 'In', accessed: 'Accessed', refTitle: 'References' },
};

/* ---------- Metin yardımcıları ---------- */
const clean = (s) => String(s ?? '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const upTr = (c) => c.toLocaleUpperCase('tr');
const strip = (s) => s.replace(/\*/g, '');
/** Cümleyi noktalama ile bitirir (italik işareti noktalamadan sonra gelebilir). */
const sent = (s) => (!s ? '' : /[.?!][”"]?\*?$/.test(s) ? s : s + '.');
/** Tırnaklı başlık; nokta tırnağın içinde. */
const quoted = (t) => (/[.?!,]$/.test(t) ? `“${t}”` : `“${t}.”`);

export function initials(first) {
  return clean(first).split(' ').filter(Boolean)
    .map((p) => p.split('-').filter(Boolean).map((x) => upTr(Array.from(x)[0]) + '.').join('-')).join(' ');
}
const fixPages = (p) => clean(p).replace(/(\d)\s*[-–—]\s*(\d)/g, '$1–$2');
const ordinalEn = (n) => `${n}${[11, 12, 13].includes(n % 100) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th')} ed.`;
function editionText(ed, lang) {
  const e = clean(ed);
  if (!e) return '';
  if (/^\d+$/.test(e)) return lang === 'tr' ? `${e}. bs.` : ordinalEn(+e);
  return e;
}
/** DOI'yi bağlantıya çevirir; yoksa URL'yi döndürür. */
function linkOf(s) {
  const doi = clean(s.doi).replace(/^doi:\s*/i, '').replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  if (doi) return /^10\./.test(doi) ? `https://doi.org/${doi}` : doi;
  return clean(s.url);
}
function joinNames(items, conj, oxford) {
  if (items.length <= 1) return items[0] || '';
  const head = items.slice(0, -1).join(', ');
  return oxford ? `${head}, ${conj} ${items[items.length - 1]}` : `${head} ${conj} ${items[items.length - 1]}`;
}

/* ---------- Tarih ---------- */
function dateText(s, style, lang) {
  const y = clean(s.year), m = +s.month || 0, d = +s.day || 0;
  const mn = m ? (style === 'mla' && lang === 'en' ? MONTHS.enShort[m - 1] : MONTHS[lang][m - 1]) : '';
  if (!y) return '';
  if (style === 'mla' || (style === 'chicago' && lang === 'tr')) return [d || '', mn, y].filter(Boolean).join(' ');
  if (!m) return y;
  return lang === 'tr' ? [d || '', mn, y].filter(Boolean).join(' ') : `${mn}${d ? ' ' + d : ''}, ${y}`;
}
function accessText(s, style, lang) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.access || '');
  if (!m) return '';
  const y = +m[1], mo = +m[2], d = +m[3];
  const mn = style === 'mla' && lang === 'en' ? MONTHS.enShort[mo - 1] : MONTHS[lang][mo - 1];
  return lang === 'tr' || style === 'mla' ? `${d} ${mn} ${y}` : `${mn} ${d}, ${y}`;
}

/* ---------- Yazarlar ---------- */
const realAuthors = (s) => s.authors.filter((a) => clean(a.last));
const isOrg = (a) => !clean(a.first);

function authorsText(style, s, lang) {
  const list = realAuthors(s);
  const L = LANG[lang];
  if (!list.length) return '';
  const last = (a) => clean(a.last), first = (a) => clean(a.first);
  if (style === 'apa') {
    const f = (a) => (isOrg(a) ? last(a) : `${last(a)}, ${initials(first(a))}`);
    if (list.length === 1) return f(list[0]);
    if (list.length > 20) return `${list.slice(0, 19).map(f).join(', ')}, . . . ${f(list[list.length - 1])}`;
    return joinNames(list.map(f), lang === 'en' ? '&' : L.and, lang === 'en');
  }
  const inverted = (a) => (isOrg(a) ? last(a) : `${last(a)}, ${first(a)}`);
  const normal = (a) => (isOrg(a) ? last(a) : `${first(a)} ${last(a)}`);
  if (style === 'mla') {
    if (list.length === 1) return inverted(list[0]);
    if (list.length === 2) return `${inverted(list[0])}${lang === 'en' ? ',' : ''} ${L.and} ${normal(list[1])}`;
    return `${inverted(list[0])}, ${L.etAl}`;
  }
  // Chicago yazar-tarih
  if (list.length > 10) return `${[inverted(list[0]), ...list.slice(1, 7).map(normal)].join(', ')}, ${L.etAl}`;
  const items = [inverted(list[0]), ...list.slice(1).map(normal)];
  if (items.length === 2) return `${items[0]}${lang === 'en' ? ',' : ''} ${L.and} ${items[1]}`;
  return joinNames(items, L.and, lang === 'en');
}

/** Metin içi atıf için yazar kısmı. */
function citeNames(style, s, lang) {
  const list = realAuthors(s);
  const L = LANG[lang];
  if (!list.length) return null;
  const n = list.map((a) => clean(a.last));
  if (list.length === 1) return n[0];
  if (list.length === 2) return `${n[0]} ${style === 'apa' && lang === 'en' ? '&' : L.and} ${n[1]}`;
  if (style === 'chicago' && list.length === 3) return `${n[0]}, ${n[1]}${lang === 'en' ? ', ' + L.and : ' ' + L.and} ${n[2]}`;
  return `${n[0]} ${L.etAl}`;
}
export function inTextCite(style, s, lang) {
  const L = LANG[lang];
  const who = citeNames(style, s, lang) || clean(s.title);
  const year = clean(s.year) || L.nd;
  if (style === 'mla') return `(${who})`;
  if (style === 'chicago') return `(${who} ${year})`;
  return `(${who}, ${year})`;
}

/* ---------- Biçimleyiciler ---------- */
const levelLabel = (s, style, lang) => {
  const k = s.level || 'yuksek';
  if (lang === 'tr') return { doktora: 'Doktora tezi', yuksek: 'Yüksek lisans tezi', lisans: 'Lisans tezi' }[k];
  if (style === 'apa') return { doktora: 'Doctoral dissertation', yuksek: "Master's thesis", lisans: "Bachelor's thesis" }[k];
  return { doktora: 'PhD diss.', yuksek: "Master's thesis", lisans: "Bachelor's thesis" }[k];
};
const accessPart = (s, style, lang, link) => {
  const a = accessText(s, style, lang);
  if (!a || !link) return '';
  if (style === 'apa') return lang === 'tr' ? `${LANG.tr.accessed} ${a}, ${link}` : `Retrieved ${a}, from ${link}`;
  return '';
};

function formatAPA(s, lang) {
  const L = LANG[lang], au = authorsText('apa', s, lang);
  const y = clean(s.year) || L.nd;
  const dm = ['web', 'news'].includes(s.type) && +s.month && clean(s.year) ? dateText(s, 'apa', lang) : y;
  const date = `(${dm}).`;
  const T = clean(s.title), C = clean(s.container), P = clean(s.publisher), link = linkOf(s);
  const ed = editionText(s.edition, lang);
  const pages = fixPages(s.pages);
  let ttl;
  const rest = [];
  switch (s.type) {
    case 'chapter':
      ttl = T;
      rest.push(sent(`${L.inn} ${clean(s.editor)}${clean(s.editor) ? ` (${L.edAbbr}), ` : ''}*${C}*${pages ? ` (${L.pp} ${pages})` : ''}`), sent(P));
      break;
    case 'article': {
      ttl = T;
      let j = `*${C}*`;
      if (clean(s.volume)) j += `, *${clean(s.volume)}*`;
      if (clean(s.issue)) j += `(${clean(s.issue)})`;
      if (pages) j += `, ${pages}`;
      rest.push(sent(j));
      break;
    }
    case 'web':
      ttl = `*${T}*`;
      rest.push(sent(C && C !== clean(realAuthors(s)[0]?.last) ? C : ''), sent(P && P !== C ? P : ''));
      break;
    case 'thesis': ttl = `*${T}*${P ? ` [${levelLabel(s, 'apa', lang)}, ${P}]` : ` [${levelLabel(s, 'apa', lang)}]`}`; break;
    case 'news': ttl = T; rest.push(sent(`*${C}*`)); break;
    default: ttl = `*${T}*${ed ? ` (${ed})` : ''}`; rest.push(sent(P));
  }
  const parts = au ? [sent(au), date, sent(ttl), ...rest] : [sent(ttl), date, ...rest];
  parts.push(accessPart(s, 'apa', lang, link) || link);
  return parts.filter(Boolean).join(' ');
}

function formatMLA(s, lang) {
  const L = LANG[lang], au = authorsText('mla', s, lang);
  const T = clean(s.title), C = clean(s.container), P = clean(s.publisher), link = linkOf(s);
  const y = clean(s.year);
  const full = dateText(s, 'mla', lang);
  const ed = editionText(s.edition, lang);
  const pages = fixPages(s.pages);
  const list = (arr) => sent(arr.filter(Boolean).join(', '));
  let ttl;
  const rest = [];
  switch (s.type) {
    case 'chapter':
      ttl = quoted(T);
      rest.push(list([`*${C}*`, clean(s.editor) && `${L.edBy} ${clean(s.editor)}`, P, y, pages && `${L.pp} ${pages}`, link]));
      break;
    case 'article':
      ttl = quoted(T);
      rest.push(list([`*${C}*`, clean(s.volume) && `${L.vol} ${clean(s.volume)}`, clean(s.issue) && `${L.no} ${clean(s.issue)}`, full, pages && `${L.pp} ${pages}`, link]));
      break;
    case 'web': ttl = quoted(T); rest.push(list([C && `*${C}*`, P && P !== C ? P : '', full, link])); break;
    case 'news': ttl = quoted(T); rest.push(list([`*${C}*`, full, link])); break;
    case 'thesis': ttl = `*${T}*`; rest.push(sent(y), list([P, levelLabel(s, 'mla', lang)]), link ? sent(link) : ''); break;
    default: ttl = `*${T}*`; rest.push(list([ed, P, y, link]));
  }
  const parts = au ? [sent(au), sent(ttl), ...rest] : [sent(ttl), ...rest];
  const a = accessText(s, 'mla', lang);
  if (a && link) parts.push(lang === 'tr' ? `Erişim: ${a}.` : `Accessed ${a}.`);
  return parts.filter(Boolean).join(' ');
}

function formatChicago(s, lang) {
  const L = LANG[lang], au = authorsText('chicago', s, lang);
  const T = clean(s.title), C = clean(s.container), P = clean(s.publisher), link = linkOf(s);
  const y = clean(s.year) || L.nd;
  const full = dateText(s, 'chicago', lang);
  const ed = editionText(s.edition, lang);
  const pages = fixPages(s.pages);
  const pub = `${clean(s.place) ? clean(s.place) + ': ' : ''}${P}`;
  let ttl;
  const rest = [];
  switch (s.type) {
    case 'chapter':
      ttl = quoted(T);
      rest.push(sent(`${L.inn} *${C}*${clean(s.editor) ? `, ${L.edBy} ${clean(s.editor)}` : ''}${pages ? `, ${pages}` : ''}`), sent(pub));
      break;
    case 'article': {
      ttl = quoted(T);
      const v = clean(s.volume), i = clean(s.issue);
      rest.push(sent(`*${C}*${v ? ' ' + v : ''}${i ? ` (${i})` : ''}${pages ? `${v || i ? ': ' : ' '}${pages}` : ''}`));
      break;
    }
    case 'web': ttl = quoted(T); rest.push(sent(C), sent(+s.month && clean(s.year) ? full : '')); break;
    case 'news': ttl = quoted(T); rest.push(sent(`*${C}*${+s.month && clean(s.year) ? ', ' + full : ''}`)); break;
    case 'thesis': ttl = quoted(T); rest.push(sent(`${levelLabel(s, 'chicago', lang)}${P ? ', ' + P : ''}`)); break;
    default: ttl = `*${T}*`; rest.push(sent(ed), sent(pub));
  }
  const parts = au ? [sent(au), sent(y), sent(ttl), ...rest] : [sent(ttl), sent(y), ...rest];
  const a = accessText(s, 'chicago', lang);
  if (a && link) parts.push(lang === 'tr' ? `${L.accessed} ${a}.` : `Accessed ${a}.`);
  if (link) parts.push(sent(link));
  return parts.filter(Boolean).join(' ');
}

export function formatEntry(s, style, lang) {
  return style === 'mla' ? formatMLA(s, lang) : style === 'chicago' ? formatChicago(s, lang) : formatAPA(s, lang);
}

/** Alfabetik sıra: ilk yazarın soyadı (yoksa başlık), sonra yıl. */
function sortKey(s) {
  const a = realAuthors(s)[0];
  return (a ? clean(a.last) : clean(s.title).replace(/^(the|a|an|bir)\s+/i, '')).toLocaleLowerCase('tr');
}
export function sortSources(arr) {
  return [...arr].sort((x, y) => sortKey(x).localeCompare(sortKey(y), 'tr') || clean(x.year).localeCompare(clean(y.year)));
}

/* ---------- Durum ---------- */
let sources = [];
let editing = -1;
const blank = () => ({ type: 'book', authors: [{ last: '', first: '' }], year: '', month: '', day: '', title: '', container: '', editor: '', publisher: '', place: '', edition: '', volume: '', issue: '', pages: '', doi: '', url: '', access: '', level: 'yuksek' });
const style = () => $('style').value;
const lang = () => $('lang').value;

/* ---------- Etiketler ve görünürlük ---------- */
const LABELS = {
  title: { book: 'Kitap adı', chapter: 'Bölüm başlığı', article: 'Makale başlığı', web: 'Sayfa başlığı', thesis: 'Tez adı', report: 'Rapor adı', news: 'Haber başlığı' },
  container: { chapter: 'Kitap adı (bölümün yer aldığı)', article: 'Dergi adı', web: 'Web sitesi adı', news: 'Gazete / haber sitesi adı' },
  publisher: { book: 'Yayıncı', chapter: 'Yayıncı', web: 'Yayıncı / kurum (isteğe bağlı)', thesis: 'Üniversite (ve enstitü)', report: 'Yayıncı / kurum' },
};
function applyType() {
  const t = $('type').value;
  document.querySelectorAll('[data-types]').forEach((el) => { el.hidden = !el.dataset.types.split(' ').includes(t); });
  $('l-title').textContent = LABELS.title[t];
  if (LABELS.container[t]) $('l-container').textContent = LABELS.container[t];
  if (LABELS.publisher[t]) $('l-publisher').textContent = LABELS.publisher[t];
}

/* ---------- Form ve nesne dönüşümü ---------- */
const FIELDS = ['year', 'month', 'day', 'title', 'container', 'editor', 'publisher', 'place', 'edition', 'volume', 'issue', 'pages', 'doi', 'url', 'access', 'level'];
function collect() {
  const s = { type: $('type').value, authors: [] };
  FIELDS.forEach((f) => { s[f] = $('f-' + f).value; });
  document.querySelectorAll('#authors .au-row').forEach((row) => {
    s.authors.push({ last: row.querySelector('.au-last').value, first: row.querySelector('.au-first').value });
  });
  return s;
}
function fill(s) {
  $('type').value = s.type;
  FIELDS.forEach((f) => { $('f-' + f).value = s[f] ?? ''; });
  renderAuthors(s.authors.length ? s.authors : [{ last: '', first: '' }]);
  applyType();
  renderPreview();
}
function renderAuthors(list) {
  const box = $('authors');
  box.textContent = '';
  list.forEach((a, i) => {
    const row = document.createElement('div');
    row.className = 'au-row';
    row.innerHTML = `<div class="ba-field"><label>Soyad${i > 0 ? ' (' + (i + 1) + '. yazar)' : ''}<input class="au-last" type="text" autocomplete="off"></label></div>
      <div class="ba-field"><label>Ad<input class="au-first" type="text" autocomplete="off"></label></div>
      <button type="button" class="ba-btn au-del" aria-label="${i + 1}. yazarı sil">Sil</button>`;
    row.querySelector('.au-last').value = a.last;
    row.querySelector('.au-first').value = a.first;
    row.querySelector('.au-del').addEventListener('click', () => {
      const cur = collect().authors;
      cur.splice(i, 1);
      renderAuthors(cur.length ? cur : [{ last: '', first: '' }]);
      renderPreview();
    });
    box.appendChild(row);
  });
}

/* ---------- Doğrulama ---------- */
function validate(s) {
  if (!clean(s.title)) return 'Başlığı girin. Bir kaynağı listeye eklemek için en az başlık gerekir.';
  if (['chapter', 'article', 'news'].includes(s.type) && !clean(s.container)) {
    return `${LABELS.container[s.type].replace(/ \(.*\)/, '')} alanı boş. Kaynağın yer aldığı kitabın, derginin ya da gazetenin adını yazın.`;
  }
  const y = clean(s.year);
  if (y && !/^\d{4}$/.test(y)) return 'Yıl dört haneli bir sayı olmalı (örneğin 2020). Yılı bilmiyorsanız alanı boş bırakın; "t.y." yazılır.';
  if (clean(s.day) && (!/^\d{1,2}$/.test(clean(s.day)) || +s.day < 1 || +s.day > 31)) return 'Gün 1 ile 31 arasında bir sayı olmalı. Günü bilmiyorsanız boş bırakın.';
  if (clean(s.day) && !+s.month) return 'Gün girdiniz ama ay seçmediniz. Ayı seçin ya da günü silin.';
  if (s.authors.some((a) => clean(a.first) && !clean(a.last))) return 'Adı girilen bir yazarın soyadı boş. Soyadı yazın ya da satırı silin.';
  return '';
}

/* ---------- Çıktı ---------- */
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const toHtml = (t) => esc(t).replace(/\*([^*]+)\*/g, '<i>$1</i>');

function renderPreview() {
  const s = collect();
  const ok = !!clean(s.title);
  $('preview').hidden = !ok;
  if (!ok) return;
  $('preview-text').innerHTML = toHtml(formatEntry(s, style(), lang()));
  $('preview-cite').textContent = inTextCite(style(), s, lang());
}

function resetAddButton() { editing = -1; $('add').textContent = 'Kaynağı listeye ekle'; }

function renderList() {
  const sorted = sortSources(sources);
  const st = style(), lg = lang();
  const out = $('bib');
  out.textContent = '';
  sorted.forEach((s) => {
    const li = document.createElement('li');
    li.className = 'bib-item';
    li.innerHTML = `<p class="bib-text">${toHtml(formatEntry(s, st, lg))}</p>
      <p class="bib-cite">Metin içi atıf: <code>${esc(inTextCite(st, s, lg))}</code></p>
      <div class="bib-actions"><button type="button" class="ba-btn b-edit">Düzenle</button><button type="button" class="ba-btn b-del">Sil</button></div>`;
    li.querySelector('.b-edit').addEventListener('click', () => {
      editing = sources.indexOf(s);
      fill(s);
      $('add').textContent = 'Değişikliği kaydet';
      $('f-title').focus();
    });
    li.querySelector('.b-del').addEventListener('click', () => {
      sources = sources.filter((x) => x !== s);
      resetAddButton();
      renderList();
    });
    out.appendChild(li);
  });
  const has = sources.length > 0;
  $('list-wrap').hidden = !has;
  $('list-wrap').classList.toggle('is-active', has);
  ['copy-rich', 'copy-plain', 'dl-docx', 'dl-txt'].forEach((id) => { $(id).disabled = !has; });
  $('count').textContent = has ? `${sources.length} kaynak` : '';
  $('bib-title').textContent = lg === 'tr' ? 'Kaynakça' : (st === 'mla' ? 'Works Cited' : LANG.en.refTitle);
}

const plainList = () => sortSources(sources).map((s) => strip(formatEntry(s, style(), lang())));

/* ---------- Kopyala ---------- */
async function copy(rich) {
  showError($('error'), null);
  const sorted = sortSources(sources);
  const st = style(), lg = lang();
  const plain = plainList().join('\n\n');
  const html = sorted.map((s) => `<p style="margin:0 0 0 36pt;text-indent:-36pt;font-family:'Times New Roman',serif;font-size:12pt">${toHtml(formatEntry(s, st, lg))}</p>`).join('');
  try {
    if (rich && window.ClipboardItem && navigator.clipboard?.write) {
      await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([plain], { type: 'text/plain' }) })]);
      $('status').textContent = 'Biçimli metin kopyalandı. Word ya da Docs içine yapıştırınca italikler ve asılı girinti korunur.';
    } else {
      await navigator.clipboard.writeText(plain);
      $('status').textContent = 'Düz metin kopyalandı.';
    }
  } catch {
    showError($('error'), 'Kopyalama tarayıcı tarafından engellendi. Kaynakça kutusundaki metni elle seçip kopyalayın ya da .docx / .txt olarak indirin.');
  }
}
$('copy-rich').addEventListener('click', () => copy(true));
$('copy-plain').addEventListener('click', () => copy(false));

/* ---------- İndir ---------- */
$('dl-txt').addEventListener('click', () => {
  const txt = `${$('bib-title').textContent}\n\n${plainList().join('\n\n')}\n`;
  downloadBlob(new Blob([txt], { type: 'text/plain;charset=utf-8' }), 'kaynakca.txt');
});

let docxPromise = null;
$('dl-docx').addEventListener('click', async () => {
  const btn = $('dl-docx');
  showError($('error'), null);
  btn.disabled = true;
  try {
    if (!docxPromise) docxPromise = import(new URL('../vendor/docx@9.15.1/docx.mjs', import.meta.url).href);
    const { Document, Packer, Paragraph, TextRun, AlignmentType } = await docxPromise;
    const FONT = 'Times New Roman';
    const st = style(), lg = lang();
    const line = st === 'chicago' ? 276 : 480;
    // Çift sayılı parçalar italik (işaretler arası)
    const runsOf = (t) => t.split('*').map((seg, i) => new TextRun({ text: seg, italics: i % 2 === 1, font: FONT, size: 24 }));
    const children = [new Paragraph({
      alignment: st === 'chicago' ? AlignmentType.LEFT : AlignmentType.CENTER,
      spacing: { after: 240, line },
      children: [new TextRun({ text: $('bib-title').textContent, bold: st !== 'mla', font: FONT, size: 24 })],
    })];
    sortSources(sources).forEach((s) => {
      children.push(new Paragraph({
        spacing: { after: st === 'chicago' ? 160 : 0, line },
        indent: { left: 720, hanging: 720 },
        children: runsOf(formatEntry(s, st, lg)),
      }));
    });
    const doc = new Document({
      creator: 'Bilişim Ajans Ücretsiz Araçlar',
      title: 'Kaynakça',
      styles: { default: { document: { run: { font: FONT, size: 24 } } } },
      sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } }, children }],
    });
    const blob = await Packer.toBlob(doc);
    downloadBlob(blob.type === DOCX_MIME ? blob : new Blob([blob], { type: DOCX_MIME }), 'kaynakca.docx');
  } catch {
    showError($('error'), 'Word dosyası oluşturulamadı. Sayfayı yenileyip yeniden deneyin ya da .txt olarak indirin.');
  } finally {
    btn.disabled = false;
  }
});

/* ---------- Olaylar ---------- */
$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError($('error'), null);
  $('status').textContent = '';
  const s = collect();
  const err = validate(s);
  if (err) { showError($('error'), err); return; }
  s.authors = s.authors.filter((a) => clean(a.last) || clean(a.first));
  if (editing >= 0) sources[editing] = s; else sources.push(s);
  resetAddButton();
  const next = blank();
  next.type = s.type;
  fill(next);
  renderList();
});
$('add-author').addEventListener('click', () => {
  const cur = collect().authors;
  cur.push({ last: '', first: '' });
  renderAuthors(cur);
  document.querySelectorAll('#authors .au-last')[cur.length - 1].focus();
});
$('clear-form').addEventListener('click', () => {
  resetAddButton();
  showError($('error'), null);
  const next = blank();
  next.type = $('type').value;
  fill(next);
});
$('clear-all').addEventListener('click', () => {
  if (!sources.length || !confirm('Listedeki tüm kaynaklar silinsin mi?')) return;
  sources = [];
  resetAddButton();
  renderList();
});
$('type').addEventListener('change', () => { applyType(); renderPreview(); });
$('form').addEventListener('input', renderPreview);
['style', 'lang'].forEach((id) => $(id).addEventListener('change', () => { renderList(); renderPreview(); }));

fill(blank());
renderList();
