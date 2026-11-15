// Form tabanlı araç üreticisi — ortak kitaplık: spec yükleme, doğrulama, sayfa üretimi.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { h } from '../../web/assets/js/arac-yardimci.js';

export const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(HERE, '..', '..');
export const WEB = join(ROOT, 'web');
export const SPECS = join(HERE, 'specs');
const SITE = 'https://araclar.bilisimajans.com';

export const CATS = {
  matematik: { ad: 'Matematik ve Geometri', alt: 'kesir, istatistik, alan, hacim, trigonometri', crumb: 'Matematik', icon: '<path d="M4 6h6M7 3v6M14 6h6M5 15l5 5M10 15l-5 5M14 16h6M14 19h6"/>' },
  finans: { ad: 'Finans ve Ticaret', alt: 'faiz, yatırım, kâr, oran, bütçe', crumb: 'Finans', icon: '<path d="M4 19h16M7 16V9M12 16V5M17 16v-4"/>' },
  saglik: { ad: 'Sağlık ve Spor', alt: 'kalori, nabız, tempo, vücut ölçüleri', crumb: 'Sağlık ve Spor', icon: '<path d="M3 12h4l2-5 4 10 2-5h6"/>' },
  birim: { ad: 'Birim Çeviriciler', alt: 'uzunluk, ağırlık, sıcaklık, basınç, veri', crumb: 'Birim Çevirici', icon: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>' },
  bilim: { ad: 'Fizik ve Kimya', alt: 'kuvvet, enerji, gaz, mol, derişim', crumb: 'Fizik ve Kimya', icon: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>' },
  elektrik: { ad: 'Elektrik ve Elektronik', alt: 'ohm, güç, kablo, batarya, devre', crumb: 'Elektrik', icon: '<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>' },
  insaat: { ad: 'İnşaat ve Ev', alt: 'malzeme, metraj, ağırlık, hacim', crumb: 'İnşaat ve Ev', icon: '<path d="M3 20h18M5 20V9l7-5 7 5v11M10 20v-6h4v6"/>' },
  metin: { ad: 'Metin Araçları', alt: 'say, temizle, dönüştür, şifrele', crumb: 'Metin', icon: '<path d="M5 6h14M5 12h14M5 18h9"/>' },
  gelistirici: { ad: 'Geliştirici ve Web', alt: 'kod, renk, ağ, SEO, doğrulama', crumb: 'Geliştirici', icon: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13 5l-2 14"/>' },
  zaman: { ad: 'Tarih ve Zaman', alt: 'gün, hafta, süre, takvim', crumb: 'Tarih ve Zaman', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  egitim: { ad: 'Eğitim', alt: 'not, ortalama, çalışma planı', crumb: 'Eğitim', icon: '<path d="M3 9l9-5 9 5-9 5zM7 11v5c3 2 7 2 10 0v-5"/>' },
  planlama: { ad: 'Planlayıcılar ve Çizelgeler', alt: 'günlük, haftalık, aylık; yazdırılabilir PDF', crumb: 'Planlayıcılar', icon: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h6"/>' },
  gunluk: { ad: 'Günlük Yaşam', alt: 'araç, mutfak, ev, hobi, teknoloji', crumb: 'Günlük Yaşam', icon: '<path d="M4 11l8-7 8 7M6 10v10h12V10"/>' },
};

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// İçerikte izin verilen satır içi etiketler: strong, em, code, sub, sup
export const rich = (s) => esc(s).replace(/&lt;(\/?)(strong|em|code|sub|sup)&gt;/g, '<$1$2>');
const plain = (s) => String(s).replace(/<\/?(strong|em|code|sub|sup)>/g, '');
const words = (s) => plain(s).split(/\s+/).filter(Boolean).length;

export function catalog() {
  return readFileSync(join(HERE, 'katalog.txt'), 'utf8').split('\n').filter(Boolean).map((l) => { const [cat, slug, title] = l.split('|'); return { cat, slug, title }; });
}
export function existingSlugs() {
  return new Set(readdirSync(WEB, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name));
}
export function specSlugs() {
  return existsSync(SPECS) ? readdirSync(SPECS).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4)).sort() : [];
}
export async function loadSpec(slug) {
  const p = join(SPECS, slug + '.mjs');
  const mod = await import(pathToFileURL(p).href + '?t=' + Date.now() + Math.random());
  return mod.default;
}

/** compute fonksiyonunun kaynağını bağımsız bir modüle çevirir. */
export function logicSource(spec) {
  let src = spec.compute.toString();
  if (/^async\s+compute\s*\(/.test(src)) src = 'export async function ' + src.replace(/^async\s+/, '');
  else if (/^compute\s*\(/.test(src)) src = 'export function ' + src;
  else src = 'export const compute = ' + src + ';';
  return `// ${spec.title} — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.\n${src}\n`;
}

const RESERVED = new Set(['form', 'error', 'result', 'rows', 'out', 'note', 'calc', 'clear', 'copy', 'pdf', 'onizleme']);
const TYPES = new Set(['number', 'text', 'textarea', 'select', 'date']);
const BANNED = /https?:\/\/|www\.|<script|<a\s|onclick|javascript:/i;

/** Spec'i doğrular; hata listesi döner (boşsa geçerli). Test örneklerini de çalıştırır. */
export async function validate(spec, slug, { known } = {}) {
  const E = [];
  const need = (c, m) => { if (!c) E.push(m); };
  if (!spec || typeof spec !== 'object') return ['spec default export nesne değil'];
  need(spec.slug === slug, `slug dosya adıyla aynı olmalı (${slug})`);
  need(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug), 'slug yalnızca küçük harf, rakam ve tire içerir');
  for (const k of ['title', 'pageTitle', 'description', 'card', 'lead', 'button']) need(typeof spec[k] === 'string' && spec[k].trim(), `${k} eksik`);
  need(CATS[spec.category], `category şunlardan biri olmalı: ${Object.keys(CATS).join(', ')}`);
  if (typeof spec.pageTitle === 'string') need(spec.pageTitle.length >= 30 && spec.pageTitle.length <= 75, `pageTitle 30–75 karakter olmalı (şu an ${spec.pageTitle.length})`);
  if (typeof spec.description === 'string') need(spec.description.length >= 110 && spec.description.length <= 170, `description 110–170 karakter olmalı (şu an ${spec.description.length})`);
  if (typeof spec.card === 'string') need(spec.card.length >= 40 && spec.card.length <= 150, `card 40–150 karakter olmalı (şu an ${spec.card.length})`);
  need(Array.isArray(spec.keywords) && spec.keywords.length >= 5 && spec.keywords.length <= 10, 'keywords 5–10 öğe olmalı');
  need(Array.isArray(spec.inputs) && spec.inputs.length >= 1 && spec.inputs.length <= 10, 'inputs 1–10 alan olmalı');
  const ids = new Set();
  for (const f of spec.inputs || []) {
    need(/^[a-z][a-zA-Z0-9]*$/.test(f.id || ''), `input id geçersiz: ${f.id}`);
    need(!RESERVED.has(f.id), `input id ayrılmış ad: ${f.id}`);
    need(!ids.has(f.id), `input id tekrar ediyor: ${f.id}`); ids.add(f.id);
    need(TYPES.has(f.type), `input ${f.id}: type şunlardan biri olmalı: ${[...TYPES].join(', ')}`);
    need(typeof f.label === 'string' && f.label.trim(), `input ${f.id}: label eksik`);
    if (f.type === 'select') need(Array.isArray(f.options) && f.options.length >= 2 && f.options.every((o) => Array.isArray(o) && o.length === 2), `input ${f.id}: options [[deger, etiket], …] olmalı`);
  }
  need(typeof spec.compute === 'function', 'compute fonksiyon olmalı');
  need(Array.isArray(spec.howto) && spec.howto.length >= 3 && spec.howto.length <= 6, 'howto 3–6 adım olmalı');
  need(Array.isArray(spec.sections) && spec.sections.length >= 4, 'sections en az 4 bölüm olmalı');
  for (const s of spec.sections || []) {
    need(typeof s.h === 'string' && s.h.trim(), 'section h eksik');
    need((Array.isArray(s.p) && s.p.length) || (Array.isArray(s.ul) && s.ul.length) || (Array.isArray(s.ol) && s.ol.length), `section "${s.h}": p, ul ya da ol gerekli`);
  }
  need(Array.isArray(spec.faq) && spec.faq.length >= 7 && spec.faq.every((q) => Array.isArray(q) && q.length === 2 && q[0] && q[1]), 'faq en az 7 adet [soru, cevap] olmalı');
  need(Array.isArray(spec.related) && spec.related.length >= 3 && spec.related.length <= 6, 'related 3–6 slug olmalı');
  if (known) for (const r of spec.related || []) need(known.has(r) && r !== slug, `related bilinmeyen slug: ${r}`);
  if (E.length) return E;

  const allText = [spec.lead, ...spec.howto, ...spec.sections.flatMap((s) => [s.h, ...(s.p || []), ...(s.ul || []), ...(s.ol || [])]), ...spec.faq.flat()];
  const wc = allText.reduce((a, t) => a + words(t), 0);
  need(wc >= 800, `özgün metin en az 800 kelime olmalı (şu an ${wc})`);
  const blob = JSON.stringify([spec.title, spec.pageTitle, spec.description, spec.card, spec.inputs.map((f) => [f.label, f.hint]), allText]);
  need(!BANNED.test(blob), 'metinde bağlantı/URL ya da betik bulunamaz');
  need(!/&(lt|gt|amp|nbsp|quot|#\d+);/.test(JSON.stringify(allText)), 'metinde HTML varlığı (&lt; &gt; &amp; &nbsp;) kullanmayın; düz < > & yazın');
  need(new Set(spec.faq.map((q) => q[0])).size === spec.faq.length, 'faq soruları birbirinden farklı olmalı');

  // compute'u bağımsız modül olarak yükle (dış değişkene bağımlılık burada ortaya çıkar)
  const tmp = join(HERE, '.tmp'); mkdirSync(tmp, { recursive: true });
  const lp = join(tmp, `${slug}.${process.pid}.${Date.now()}.mjs`);
  let compute;
  try { writeFileSync(lp, logicSource(spec)); compute = (await import(pathToFileURL(lp).href)).compute; }
  catch (e) { try { rmSync(lp); } catch {} return [`compute bağımsız modül olarak yüklenemedi (dış değişken/fonksiyon kullanmayın): ${e.message}`]; }

  try { rmSync(lp); } catch {}
  const cases = spec.cases || [];
  need(cases.length >= 6, 'cases en az 6 örnek olmalı');
  need(cases.filter((c) => c.error).length >= 1, 'cases içinde en az 1 hata örneği ({ in, error: true }) olmalı');
  need(cases.filter((c) => !c.error).length >= 5, 'cases içinde en az 5 başarılı örnek olmalı');
  for (const [i, c] of cases.entries()) {
    const v = {}; for (const f of spec.inputs) v[f.id] = f.value ?? (f.type === 'select' ? String(f.options[0][0]) : '');
    for (const k of Object.keys(c.in || {})) { need(ids.has(k), `case ${i + 1}: bilinmeyen alan ${k}`); v[k] = String(c.in[k]); }
    let r, er;
    try { r = await compute(v, h); } catch (e) { er = e; }
    if (c.error) { need(er, `case ${i + 1}: hata bekleniyordu ama sonuç döndü`); if (er) need(/[a-zçğıöşü]/i.test(er.message) && !/undefined|is not|Cannot|NaN/.test(er.message), `case ${i + 1}: hata mesajı Türkçe ve anlaşılır olmalı: "${er.message}"`); continue; }
    if (er) { E.push(`case ${i + 1}: beklenmeyen hata: ${er.message}`); continue; }
    if (!r || (!Array.isArray(r.rows) && typeof r.text !== 'string')) { E.push(`case ${i + 1}: compute { rows: [[etiket, değer], …] } ve/veya { text } döndürmeli`); continue; }
    const map = new Map((r.rows || []).map(([k, val]) => [k, String(val)]));
    for (const [k, val] of (r.rows || [])) need(typeof k === 'string' && !/NaN|undefined|Infinity|\[object/.test(String(val)), `case ${i + 1}: "${k}" değeri bozuk: ${val}`);
    need(c.out || c.match || c.text !== undefined || c.textMatch, `case ${i + 1}: out, match, text ya da textMatch gerekli`);
    for (const [k, want] of Object.entries(c.out || {})) need(map.get(k) === String(want), `case ${i + 1}: "${k}" beklenen "${want}", hesaplanan "${map.get(k)}"`);
    for (const [k, re] of Object.entries(c.match || {})) need(map.has(k) && new RegExp(re).test(map.get(k)), `case ${i + 1}: "${k}" /${re}/ ile eşleşmiyor: "${map.get(k)}"`);
    if (c.text !== undefined) need(r.text === c.text, `case ${i + 1}: text beklenen ${JSON.stringify(c.text)}, hesaplanan ${JSON.stringify(r.text)}`);
    if (spec.pdf) {
      const P = r.pdf, [pw, ph] = P && (P.boyut === 'a5' ? [148, 210] : [210, 297]) || [], W = P && P.yatay ? ph : pw, H = P && P.yatay ? pw : ph;
      if (!P || !Array.isArray(P.sayfalar) || !P.sayfalar.length || !['a4', 'a5'].includes(P.boyut) || !/^[a-z0-9-]+$/.test(P.ad || '')) { E.push(`case ${i + 1}: pdf { ad (slug), boyut: 'a4'|'a5', yatay?, sayfalar: [[işlem…]…] } döndürmeli`); continue; }
      need(P.sayfalar.length <= 60, `case ${i + 1}: en fazla 60 sayfa`);
      if (c.pdfSayfa !== undefined) need(P.sayfalar.length === c.pdfSayfa, `case ${i + 1}: beklenen sayfa ${c.pdfSayfa}, üretilen ${P.sayfalar.length}`);
      let n = 0;
      for (const ops of P.sayfalar) for (const op of ops) {
        n++;
        const o = op[op.length - 1] && typeof op[op.length - 1] === 'object' ? op[op.length - 1] : null, a = o ? op.slice(1, -1) : op.slice(1);
        const nums = op[0] === 'yazi' ? a.slice(1) : a;
        const okN = nums.every((x) => typeof x === 'number' && Number.isFinite(x));
        const arity = { cizgi: 4, kutu: 4, daire: 3, yazi: 4 }[op[0]];
        if (!arity || a.length !== arity || !okN || (op[0] === 'yazi' && typeof a[0] !== 'string')) { E.push(`case ${i + 1}: geçersiz pdf işlemi: ${JSON.stringify(op).slice(0, 90)}`); break; }
        const [x, y] = op[0] === 'yazi' ? [a[1], a[2]] : [a[0], a[1]];
        const x2 = op[0] === 'cizgi' ? a[2] : op[0] === 'kutu' ? a[0] + a[2] : x, y2 = op[0] === 'cizgi' ? a[3] : op[0] === 'kutu' ? a[1] + a[3] : y;
        if (Math.min(x, x2) < 4 || Math.min(y, y2) < 4 || Math.max(x, x2) > W - 4 || Math.max(y, y2) > H - 4) { E.push(`case ${i + 1}: pdf işlemi sayfa kenar boşluğunun (4 mm) dışında (${W}×${H} mm): ${JSON.stringify(op).slice(0, 90)}`); break; }
        if (op[0] === 'yazi' && (a[3] < 5 || a[3] > 40)) { E.push(`case ${i + 1}: yazı puntosu 5–40 olmalı`); break; }
      }
      need(n >= 20, `case ${i + 1}: pdf sayfaları neredeyse boş (${n} işlem)`);
    } else need(!r.pdf, `case ${i + 1}: pdf döndürüyorsa spec'te pdf: true olmalı`);
    if (c.textMatch) need(typeof r.text === 'string' && new RegExp(c.textMatch).test(r.text), `case ${i + 1}: text /${c.textMatch}/ ile eşleşmiyor`);
  }
  return E;
}

// ---- sayfa üretimi ----
let SHELL;
function shell() {
  if (SHELL) return SHELL;
  const t = readFileSync(join(WEB, 'yuvarlama-hesapla', 'index.html'), 'utf8');
  const top = t.slice(t.indexOf('<body>') + 6, t.indexOf('</header>') + 9);
  const foot = t.slice(t.indexOf('<footer'), t.indexOf('</footer>') + 9);
  return (SHELL = { top, foot });
}

function field(f) {
  const id = 'f-' + f.id, hint = f.hint ? `<div class="hint">${esc(f.hint)}</div>` : '', ph = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : '';
  const val = f.value !== undefined ? String(f.value) : '';
  let ctl;
  if (f.type === 'select') ctl = `<select id="${id}" data-field="${f.id}">${f.options.map(([v, l]) => `<option value="${esc(v)}"${String(v) === val ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  else if (f.type === 'textarea') ctl = `<textarea id="${id}" data-field="${f.id}" rows="${f.rows || 6}" spellcheck="false"${ph}>${esc(val)}</textarea>`;
  else if (f.type === 'date') ctl = `<input id="${id}" data-field="${f.id}" type="date"${val ? ` value="${esc(val)}"` : ''}>`;
  else ctl = `<input id="${id}" data-field="${f.id}" type="text" inputmode="${f.type === 'number' ? 'decimal' : 'text'}" autocomplete="off"${ph}${val ? ` value="${esc(val)}"` : ''}>`;
  return `          <div class="ba-field${f.type === 'textarea' || f.wide ? ' is-wide' : ''}"><label for="${id}">${esc(f.label)}</label>${ctl}${hint}</div>`;
}

function section(s) {
  let o = `      <h2>${esc(s.h)}</h2>\n`;
  for (const p of s.p || []) o += `      <p>${rich(p)}</p>\n`;
  if (s.ul) o += `      <ul>\n${s.ul.map((x) => `        <li>${rich(x)}</li>`).join('\n')}\n      </ul>\n`;
  if (s.ol) o += `      <ol>\n${s.ol.map((x) => `        <li>${rich(x)}</li>`).join('\n')}\n      </ol>\n`;
  return o;
}

export function renderPage(spec, titles) {
  const { top, foot } = shell(), cat = CATS[spec.category], slug = spec.slug;
  const header = top.replace('<a href="../#hesapla" class="ba-nav-optional">Hesapla</a>', `<a href="../#${spec.category}" class="ba-nav-optional">${esc(cat.crumb)}</a>`);
  const app = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `${spec.title} – Bilişim Ajans`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', inLanguage: 'tr', offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }, url: `${SITE}/${slug}/` };
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: spec.faq.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) };
  // Kırıntı yapısal verisi: Araçlar → kategori → sayfa (scripts/seo-uygula.mjs ile aynı biçim)
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Araçlar', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: cat.crumb, item: `${SITE}/#${spec.category}` },
    { '@type': 'ListItem', position: 3, name: spec.title + (spec.h1Tail ? ' – ' + spec.h1Tail : ''), item: `${SITE}/${slug}/` },
  ] };
  const ld = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
  const half = Math.min(2, spec.sections.length - 1);
  const related = spec.related.filter((r) => titles.has(r));
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>document.documentElement.classList.add('ba-js');if(document.visibilityState!=='hidden')document.documentElement.classList.add('ba-in')</script>
  <title>${esc(spec.pageTitle)}</title>
  <meta name="description" content="${esc(spec.description)}">
  <link rel="canonical" href="${SITE}/${slug}/">
  <link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/css/ba.css">
  <link rel="manifest" href="../manifest.webmanifest">
  <meta name="theme-color" content="#7b2331">
  <meta property="og:title" content="${esc(spec.pageTitle)}">
  <meta property="og:description" content="${esc(spec.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE}/${slug}/">
  <meta property="og:site_name" content="Bilişim Ajans Ücretsiz Araçlar">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:image" content="${SITE}/assets/img/icon-512.png">
  <meta name="twitter:card" content="summary">
  <script type="application/ld+json">
  ${ld(crumbs)}
  </script>
  <script type="application/ld+json">
  ${ld(app)}
  </script>
  <script type="application/ld+json">
  ${ld(faq)}
  </script>
</head>
<body>${header}

  <main>
    <section class="ba-hero ba-hero-tool"><div class="ba-container"><ol class="ba-crumb" aria-label="Konum"><li><a href="../">Araçlar</a></li><li><a href="../#${spec.category}">${esc(cat.crumb)}</a></li></ol>
      <h1><span class="ba-grad">${esc(spec.title)}</span>${spec.h1Tail ? ' – ' + esc(spec.h1Tail) : ''}</h1>
      <p class="lead">${rich(spec.lead)}</p>
      <ul class="ba-badges" aria-label="Güvence"><li>%100 ücretsiz</li><li>Kayıt yok</li><li>Dosya yüklenmez</li></ul>
      </div></section>
    <div class="ba-container">

    <section class="ba-tool" aria-labelledby="h-tool">
      <h2 id="h-tool" class="visually-hidden">Araç</h2>
      <form id="form" class="ar-form" novalidate>
        <div class="ar-grid">
${spec.inputs.map(field).join('\n')}
        </div>
        <div class="ba-actions"><button id="calc" class="ba-btn ba-btn-primary" type="submit">${esc(spec.button)}</button><button id="clear" class="ba-btn" type="button">Temizle</button></div>
      </form>
      <div id="error" class="ba-error" role="alert"></div>
      <div id="result" class="ba-result" aria-live="polite" hidden>
        <h3>Sonuç</h3>
        <dl id="rows" class="ar-results"></dl>
        <div id="out-wrap" class="ar-out-wrap" hidden><label class="visually-hidden" for="out">Sonuç metni</label><textarea id="out" class="ar-out" readonly spellcheck="false"></textarea></div>
        <p class="ar-note" id="note" hidden></p>
${spec.pdf ? '        <canvas id="onizleme" class="ar-onizleme" role="img" aria-label="İlk sayfanın önizlemesi" hidden></canvas>\n' : ''}        <div class="ba-actions">${spec.pdf ? '<button id="pdf" class="ba-btn ba-btn-primary" type="button" hidden>PDF indir</button>' : ''}<button id="copy" class="ba-btn" type="button">Sonucu kopyala</button></div>
        <p class="ar-status" id="copy-status" aria-live="polite"></p>
      </div>
    </section>

    <div class="ba-ad" data-slot="${slug}-a" aria-label="Reklam"></div>

    <article class="ba-content">
      <h2>Nasıl kullanılır?</h2>
      <ol class="ba-steps">
${spec.howto.map((x) => `        <li>${rich(x)}</li>`).join('\n')}
      </ol>

${spec.sections.slice(0, half).map(section).join('\n')}
      <div class="ba-ad" data-slot="${slug}-b" aria-label="Reklam"></div>

${spec.sections.slice(half).map(section).join('\n')}
      <h2>Neden Bilişim Ajans aracı?</h2>
      <ul>
        <li><strong>Veri gönderilmez.</strong> Hesap ve çeviri tarayıcınızda yapılır; yazdığınız hiçbir şey sunucuya iletilmez, saklanmaz, çerezle izlenmez.</li>
        <li><strong>Kayıt ve ücret yok.</strong> Üyelik, deneme süresi ya da gizli sınır yoktur; sayfayı açıp hemen kullanırsınız.</li>
        <li><strong>Çevrimdışı çalışır.</strong> Sayfa bir kez açıldıktan sonra internet olmadan da kullanılabilir; isterseniz tarayıcıdan uygulama olarak yükleyebilirsiniz.</li>
        <li><strong>Telefonda rahat.</strong> Arayüz 360 piksel genişlikte de sığar ve klavyeyle tam kullanılabilir.</li>
      </ul>

      <h2>Sık sorulan sorular</h2>
      <div class="ba-faq">
${spec.faq.map(([q, a]) => `        <details><summary>${rich(q)}</summary><p>${rich(a)}</p></details>`).join('\n')}
      </div>

      <h2>İlgili araçlar</h2>
      <ul class="ba-related">
${related.map((r) => `        <li><a href="../${r}/">${esc(titles.get(r))}</a></li>`).join('\n')}
      </ul>
      <p class="ba-note"><span aria-hidden="true">💼</span><span>Size özel hesaplama aracı ya da web yazılımı ihtiyacınız varsa <a href="https://bilisimajans.com/">Bilişim Ajans</a> ekibi yardımcı olur.</span></p>
    </article>

    <div class="ba-ad" data-slot="${slug}-c" aria-label="Reklam"></div>
    </div>
  </main>

  ${foot}

  <script src="../assets/js/ads.js" defer></script>
  <script type="module" src="../assets/js/pwa.js"></script>
  <script type="module" src="tool.js"></script>
  <script type="module" src="../assets/js/motion.js"></script>
</body>
</html>
`;
}

export function toolJs(spec) {
  return `// ${spec.title} — arayüz; ortak form betiği hesabı tarayıcıda çalıştırır.\nimport { mount } from '../assets/js/arac.js';\nimport { compute } from './logic.js';\n\nmount(compute);\n`;
}
export function metaJson(spec) {
  return JSON.stringify({ title: spec.title, description: spec.card, category: spec.category, keywords: spec.keywords, vendor: [], beta: false, icon: CATS[spec.category].icon, generated: true }, null, 2) + '\n';
}
export function cardHtml(spec) {
  return `        <li class="ba-card"><div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CATS[spec.category].icon}</svg></div><a class="ba-card-link" href="${spec.slug}/">${esc(spec.title)}</a><p>${esc(spec.card)}</p><span class="go" aria-hidden="true">Aracı aç →</span></li>`;
}
