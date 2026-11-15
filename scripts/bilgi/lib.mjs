// Bilgi Bankası: makale tanımlarını (scripts/bilgi/makaleler/<slug>.mjs) doğrular ve HTML'e çevirir.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const WEB = join(ROOT, 'web');
export const DIR = join(ROOT, 'scripts', 'bilgi', 'makaleler');
export const SITE = 'https://araclar.bilisimajans.com';
export const BOLUM = 'bilgi-bankasi';
export const TARIH = '2026-11-15';

export const KATEGORI = {
  calisma: { ad: 'Çalışma Hayatı ve SGK', alt: 'maaş, izin, tazminat, emeklilik, prim günü' },
  vergi: { ad: 'Vergi ve e-Devlet', alt: 'vergi türleri, harçlar, beyan, resmî işlemler' },
  finans: { ad: 'Kredi, Faiz ve Bütçe', alt: 'kredi, faiz, enflasyon, birikim, kart borcu' },
  egitim: { ad: 'Eğitim ve Sınavlar', alt: 'YKS, LGS, KPSS, not sistemi, okul' },
  saglik: { ad: 'Sağlık Göstergeleri', alt: 'genel bilgi: kilo, kalori, uyku, su, nabız' },
  ev: { ad: 'Ev, Yapı ve Enerji', alt: 'elektrik, doğalgaz, metrekare, tadilat, tapu' },
  dijital: { ad: 'Dosya, PDF ve Fotoğraf', alt: 'formatlar, boyutlar, dönüştürme, çözünürlük' },
  teknoloji: { ad: 'İnternet ve Güvenlik', alt: 'şifre, internet hızı, QR, veri birimleri' },
  gunluk: { ad: 'Günlük Yaşam', alt: 'tarih, takvim, ölçüler, mutfak, yol' },
  bilim: { ad: 'Matematik ve Bilim', alt: 'formüller, birimler, temel kavramlar' },
  isletme: { ad: 'İşletme ve E-ticaret', alt: 'kâr, fiyat, kargo, fatura, pazaryeri' },
};

// ---------- yardımcılar ----------
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const TAGS = ['strong', 'em', 'code', 'sub', 'sup'];
const strip = (s) => String(s).replace(/\[\[(?:arac|bilgi|rehber):[^|\]]+\|([^\]]+)\]\]/g, '$1').replace(/<\/?(strong|em|code|sub|sup)>/g, '');
export const words = (s) => strip(s).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

export function loadTools() {
  const set = new Map();
  for (const d of readdirSync(WEB)) {
    const f = join(WEB, d, 'meta.json');
    if (existsSync(f)) { try { const m = JSON.parse(readFileSync(f, 'utf8')); set.set(d, m); } catch { /* yok */ } }
    else if (!['rehber', 'oyunlar', 'en', 'bilgi-bankasi', 'assets', 'vendor'].includes(d) && existsSync(join(WEB, d, 'index.html'))) {
      // meta.json'u olmayan eski, elle yazılmış araçlar: başlık ve açıklamayı sayfadan al
      const h = readFileSync(join(WEB, d, 'index.html'), 'utf8');
      const h1 = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '').trim();
      const ds = h.match(/<meta name="description" content="([^"]*)"/)?.[1];
      if (h1 && ds) set.set(d, { title: h1, description: ds.replace(/&quot;/g, '"').replace(/&amp;/g, '&') });
    }
  }
  return set;
}
export const rehberler = () => new Set(readdirSync(join(WEB, 'rehber')).filter((d) => existsSync(join(WEB, 'rehber', d, 'index.html'))));
export function konular() { const dir = join(ROOT, 'scripts', 'bilgi'); return readdirSync(dir).filter((f) => /^konular.*\.json$/.test(f)).flatMap((f) => JSON.parse(readFileSync(join(dir, f), 'utf8'))); }
export const allSlugs = () => (existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4)) : []);

export async function load(slug) {
  const url = pathToFileURL(join(DIR, `${slug}.mjs`)).href + `?t=${Date.now()}`;
  return (await import(url)).default;
}

// Metin içi biçim: izinli etiketler korunur, gerisi kaçırılır; [[arac:slug|metin]] bağlantıya döner.
export function inline(s, depth = 2) {
  const up = '../'.repeat(depth);
  const keep = [];
  let t = String(s).replace(/\[\[(arac|bilgi|rehber):([a-z0-9-]+)\|([^\]]+)\]\]/g, (_, k, slug, txt) => {
    const href = k === 'arac' ? `${up}${slug}/` : k === 'rehber' ? `${up}rehber/${slug}/` : `${up}${BOLUM}/${slug}/`;
    keep.push(`<a href="${href}">${esc(txt)}</a>`); return `\u0000${keep.length - 1}\u0000`;
  });
  t = t.replace(/<(\/?)(strong|em|code|sub|sup)>/g, (_, sl, tag) => { keep.push(`<${sl}${tag}>`); return `\u0000${keep.length - 1}\u0000`; });
  t = esc(t);
  return t.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[+i]);
}

// ---------- doğrulama ----------
const SVG_EL = new Set(['svg', 'g', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'path', 'text', 'tspan', 'title', 'desc', 'defs', 'marker', 'lineargradient', 'stop', 'use']);
const SVG_CLASS = new Set(['p', 'ps', 'a', 's2', 'sf', 't', 't2', 'mu', 'ok', 'oks', 'dg', 'dgs', 'c', 'm', 'y', 'sp', 'sb', 'st', 'sa', 'sok', 'sdg', 'sw', 'b', 'sm', 'lg', 'xl', 'mid', 'end', 'dash']);

export function validate(sp, ctx) {
  const e = [];
  const req = (c, m) => { if (!c) e.push(m); };
  req(sp && typeof sp === 'object', 'default export nesne değil');
  if (!sp || typeof sp !== 'object') return e;
  req(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(sp.slug || ''), 'slug geçersiz');
  req(sp.slug === ctx.file, `slug (${sp.slug}) dosya adıyla (${ctx.file}) aynı olmalı`);
  req(KATEGORI[sp.kategori], `kategori geçersiz: ${sp.kategori}`);
  const len = (k, a, b) => { const n = String(sp[k] || '').length; req(n >= a && n <= b, `${k} ${a}–${b} karakter olmalı (şu an ${n})`); };
  len('title', 25, 110); len('pageTitle', 30, 72); len('description', 110, 168);
  req(Array.isArray(sp.keywords) && sp.keywords.length >= 5 && sp.keywords.length <= 12, 'keywords 5–12 öğe');
  req(words(sp.lead || '') >= 35 && words(sp.lead || '') <= 110, 'lead 35–110 kelime (ilk cümle soruya doğrudan cevap)');
  req(Array.isArray(sp.kisaCevap) && sp.kisaCevap.length >= 4 && sp.kisaCevap.length <= 7, 'kisaCevap 4–7 madde');
  // görsel
  const f = sp.figure || {};
  req(typeof f.svg === 'string' && /^<svg[\s>]/.test(f.svg.trim()) && /<\/svg>\s*$/.test(f.svg), 'figure.svg <svg …>…</svg> olmalı');
  req(String(f.caption || '').length >= 20, 'figure.caption en az 20 karakter');
  req(String(f.alt || '').length >= 20, 'figure.alt en az 20 karakter (görseli anlatan cümle)');
  if (typeof f.svg === 'string') {
    const s = f.svg;
    req(s.length <= 14000, `svg en fazla 14.000 karakter (şu an ${s.length})`);
    req(/viewBox="0 0 \d+ \d+"/.test(s), 'svg viewBox="0 0 G Y" içermeli');
    req(!/\s(width|height)="\d/.test(s.match(/^<svg[^>]*>/)?.[0] || ''), 'kök svg etiketinde width/height olmasın (viewBox yeter)');
    for (const m of s.matchAll(/<\/?([a-zA-Z][\w:-]*)/g)) if (!SVG_EL.has(m[1].toLowerCase())) e.push(`svg: izinsiz öğe <${m[1]}>`);
    if (/\son\w+=/i.test(s)) e.push('svg: olay özniteliği (on…) yasak');
    if (/style\s*=|<style/i.test(s)) e.push('svg: style kullanma, class kullan');
    if (/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(s.replace(/url\(#[\w-]+\)|href="#[\w-]+"/g, ''))) e.push('svg: sabit renk yasak; renkleri class ile ver (p, ps, a, s2, sf, t, t2, mu, ok, oks, dg, c, m, y / çizgi: sp, sb, st, sa, sok)');
    if (/(fill|stroke)="(?!none")[^"]*"/.test(s.replace(/(fill|stroke)="url\(#[\w-]+\)"/g, ''))) e.push('svg: fill/stroke özniteliğinde yalnızca "none" ya da url(#id); renk için class');
    if (/https?:|xlink:href="(?!#)|href="(?!#)/.test(s.replace(/xmlns(:\w+)?="[^"]*"/g, ''))) e.push('svg: dış bağlantı yasak');
    for (const m of s.matchAll(/class="([^"]*)"/g)) for (const c of m[1].split(/\s+/).filter(Boolean)) if (!SVG_CLASS.has(c)) e.push(`svg: bilinmeyen class "${c}"`);
    req(/<text/.test(s), 'svg içinde en az bir <text> etiketi (Türkçe açıklama/etiket) olmalı');
  }
  // bölümler
  req(Array.isArray(sp.sections) && sp.sections.length >= 6, 'sections en az 6 bölüm');
  let body = [sp.lead, ...(sp.kisaCevap || [])].join(' ');
  for (const [i, s] of (sp.sections || []).entries()) {
    req(s && s.h && String(s.h).length <= 90, `sections[${i}].h gerekli (≤90 karakter)`);
    const has = ['p', 'ul', 'ol', 'table', 'formula', 'note'].some((k) => s[k]);
    req(has, `sections[${i}] boş`);
    for (const k of ['p', 'ul', 'ol']) if (s[k] !== undefined) req(Array.isArray(s[k]) && s[k].length, `sections[${i}].${k} dizi olmalı`);
    if (s.table) {
      req(Array.isArray(s.table.head) && Array.isArray(s.table.rows) && s.table.rows.every((r) => Array.isArray(r) && r.length === s.table.head.length), `sections[${i}].table head/rows sütun sayısı tutmalı`);
      body += ' ' + (s.table.rows || []).flat().join(' ');
    }
    body += ' ' + [s.h, ...(s.p || []), ...(s.ul || []), ...(s.ol || []), ...(s.after || []), s.note || '', s.formula || ''].join(' ');
  }
  // SSS
  req(Array.isArray(sp.faq) && sp.faq.length >= 8, 'faq en az 8 soru');
  for (const [i, q] of (sp.faq || []).entries()) {
    req(Array.isArray(q) && q.length === 2 && /\?$/.test(String(q[0]).trim()) && words(q[1]) >= 18, `faq[${i}]: [soru?, en az 18 kelimelik cevap]`);
    body += ' ' + (q || []).join(' ');
  }
  const wc = words(body);
  req(wc >= 1300, `toplam metin en az 1.300 kelime olmalı (şu an ${wc})`);
  // araçlar ve bağlantılar
  req(Array.isArray(sp.tools) && sp.tools.length >= 2 && sp.tools.length <= 6, 'tools 2–6 araç slug');
  for (const t of sp.tools || []) if (!ctx.tools.has(t)) e.push(`tools: "${t}" sitede yok`);
  const all = JSON.stringify(sp);
  for (const m of all.matchAll(/\[\[(arac|bilgi|rehber):([a-z0-9-]+)\|/g)) {
    const [, k, s] = m;
    if (k === 'arac' && !ctx.tools.has(s)) e.push(`bağlantı: arac:${s} yok`);
    if (k === 'rehber' && !ctx.rehber.has(s)) e.push(`bağlantı: rehber:${s} yok`);
    if (k === 'bilgi' && !ctx.bilgi.has(s)) e.push(`bağlantı: bilgi:${s} yok (makaleler/ ya da konular.json'da olmalı)`);
  }
  for (const r of sp.related || []) if (!ctx.bilgi.has(r)) e.push(`related: "${r}" bilinmiyor`);
  for (const s of sp.sources || []) req(Array.isArray(s) && s.length === 2 && /^https:\/\/[^\s"<>]+$/.test(s[1]), 'sources: [[ad, https://…]]');
  // içerik kuralları
  const text = [sp.title, sp.lead, body].join(' ');
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(text)) e.push('emoji yasak');
  if (/<(?!\/?(strong|em|code|sub|sup)>)[a-zA-Z/]/.test(body.replace(/<svg[\s\S]*<\/svg>/, ''))) e.push('metinde yalnızca <strong> <em> <code> <sub> <sup> etiketleri');
  if (/&(lt|gt|amp|nbsp|quot);/.test(body)) e.push('HTML varlığı yazma (&lt; vb.); düz karakter yaz');
  if (/https?:\/\//.test(body)) e.push('metin içinde URL yazma; kaynakları sources alanına koy');
  if (/lorem ipsum|\bTODO\b/i.test(text)) e.push('yer tutucu metin kalmış');
  return e;
}

// ---------- sayfa parçaları ----------
const tpl = readFileSync(join(WEB, 'rehber', 'kdv-hesaplama-nasil-yapilir', 'index.html'), 'utf8');
const TOPBAR = tpl.match(/  <div class="ba-topbar">[\s\S]*?<\/div><\/div><\/div>\n/)[0];
const HEADER = tpl.match(/  <header class="ba-header">[\s\S]*?<\/header>\n/)[0]
  .replace('<a href="../../">Tüm Araçlar</a>', '<a href="../../">Tüm Araçlar</a><a class="bb-nav" href="../../bilgi-bankasi/">Bilgi Bankası</a>');
const FOOTER = tpl.slice(tpl.indexOf('  <footer class="ba-footer">'), tpl.indexOf('  <script src="../../assets/js/ads.js"'));
const SCRIPTS = tpl.slice(tpl.indexOf('  <script src="../../assets/js/ads.js"'));
const depthFix = (s, depth) => (depth === 2 ? s : s.replaceAll('../../', '../'.repeat(depth)));

export const CSS = `
    .bb-kisa { background: var(--ba-primary-soft); border: 1px solid var(--ba-border); border-left: 4px solid var(--ba-primary); border-radius: var(--ba-radius); padding: 16px 20px; margin: 24px 0; }
    .bb-kisa h2 { margin: 0 0 8px; font-size: 1.1rem; }
    .bb-kisa ul { margin: 0; padding-left: 20px; }
    .bb-kisa li { margin: 4px 0; }
    .bb-fig { margin: 24px 0; background: var(--ba-surface-2); border: 1px solid var(--ba-border); border-radius: var(--ba-radius); padding: 16px; }
    .bb-fig svg { display: block; width: 100%; height: auto; max-height: 520px; }
    .bb-fig figcaption { font-size: .92rem; color: var(--ba-text-2); margin-top: 10px; }
    .bb-fig text { font-family: var(--ba-font); fill: var(--ba-text); font-size: 15px; }
    .bb-fig .b { font-weight: 600; } .bb-fig .sm { font-size: 12px; } .bb-fig .lg { font-size: 19px; } .bb-fig .xl { font-size: 26px; font-weight: 700; }
    .bb-fig .mid { text-anchor: middle; } .bb-fig .end { text-anchor: end; } .bb-fig .dash { stroke-dasharray: 5 5; }
    .bb-fig .p { fill: var(--ba-primary); } .bb-fig .ps { fill: var(--ba-primary-soft); } .bb-fig .a { fill: var(--ba-accent); }
    .bb-fig .s2 { fill: var(--ba-surface-2); } .bb-fig .sf { fill: var(--ba-surface); } .bb-fig .t { fill: var(--ba-text); }
    .bb-fig .t2 { fill: var(--ba-text-2); } .bb-fig .mu { fill: var(--ba-text-muted); } .bb-fig .ok { fill: var(--ba-success); }
    .bb-fig .oks { fill: var(--ba-success-soft); } .bb-fig .dg { fill: var(--ba-danger); } .bb-fig .dgs { fill: var(--ba-danger-soft); }
    .bb-fig .c { fill: var(--ba-cmyk-c); } .bb-fig .m { fill: var(--ba-cmyk-m); } .bb-fig .y { fill: var(--ba-cmyk-y); }
    .bb-fig text.p { fill: var(--ba-primary); } .bb-fig text.ok { fill: var(--ba-success); } .bb-fig text.dg { fill: var(--ba-danger); } .bb-fig text.mu { fill: var(--ba-text-muted); } .bb-fig text.t2 { fill: var(--ba-text-2); } .bb-fig text.sf { fill: var(--ba-surface); }
    .bb-fig .sp { stroke: var(--ba-primary); } .bb-fig .sb { stroke: var(--ba-border-hover); } .bb-fig .st { stroke: var(--ba-text-2); }
    .bb-fig .sa { stroke: var(--ba-accent); } .bb-fig .sok { stroke: var(--ba-success); } .bb-fig .sdg { stroke: var(--ba-danger); } .bb-fig .sw { stroke-width: 3; }
    .bb-meta { font-size: .9rem; color: var(--ba-on-ink-2); margin-top: 8px; }
    .bb-toc { border: 1px solid var(--ba-border); border-radius: var(--ba-radius); padding: 14px 18px; margin: 24px 0; }
    .bb-toc h2 { font-size: 1rem; margin: 0 0 6px; } .bb-toc ol { margin: 0; padding-left: 20px; columns: 2 260px; } .bb-toc li { margin: 3px 0; }
    @media (max-width: 560px) { .ba-nav a.bb-nav { display: none; } }
    .rh-tools li, .bb-cards li { min-width: 0; } .rh-tools a, .bb-cards a { overflow-wrap: anywhere; }
    .bb-alt { color: var(--ba-text-2); }
    .bb-src { font-size: .92rem; } .bb-src li { margin: 4px 0; overflow-wrap: anywhere; }
    .bb-cards { list-style: none; padding: 0; margin: 16px 0; display: grid; gap: 12px; }
    @media (min-width: 720px) { .bb-cards { grid-template-columns: repeat(2, 1fr); } }
    .bb-cards a { display: block; min-height: 44px; padding: 14px 16px; background: var(--ba-surface); border: 1px solid var(--ba-border); border-radius: var(--ba-radius-sm); text-decoration: none; color: inherit; }
    .bb-cards a:hover, .bb-cards a:focus-visible { border-color: var(--ba-primary); }
    .bb-cards strong { display: block; color: var(--ba-primary); margin-bottom: 4px; } .bb-cards span { font-size: .92rem; color: var(--ba-text-2); }`;
const REHBER_CSS = tpl.match(/<style>([\s\S]*?)<\/style>/)[1].trimEnd();

function head({ title, description, canonical, ld, keywords, depth }) {
  const up = '../'.repeat(depth);
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>document.documentElement.classList.add('ba-js');if(document.visibilityState!=='hidden')document.documentElement.classList.add('ba-in')</script>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${keywords ? `<meta name="keywords" content="${esc(keywords.join(', '))}">\n  ` : ''}<link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="Bilişim Ajans Ücretsiz Araçlar">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="${up}assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${up}assets/css/ba.css">
  <link rel="manifest" href="${up}manifest.webmanifest">
  <meta name="theme-color" content="#7b2331">
  <style>${REHBER_CSS}${CSS}
  </style>
  <script type="application/ld+json">
  ${JSON.stringify(ld).replace(/</g, '\\u003c')}
  </script>
</head>
<body>
${depthFix(TOPBAR, depth)}${depthFix(HEADER, depth)}  <main>
`;
}
const tail = (depth) => `  </main>

${depthFix(FOOTER, depth)}${depthFix(SCRIPTS, depth)}`;

const crumbLd = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, ...(item ? { item } : {}) })) });
const clean = (s) => strip(s).replace(/\s+/g, ' ').trim();

function block(s, depth, idx) {
  const id = `b${idx + 1}`;
  let h = `\n      <h2 id="${id}">${inline(s.h, depth)}</h2>\n`;
  for (const p of s.p || []) h += `      <p>${inline(p, depth)}</p>\n`;
  if (s.formula) h += `      <div class="rh-formula">${String(s.formula).split('\n').map((l) => inline(l, depth)).join('<br>')}</div>\n`;
  if (s.table) {
    h += `      <div class="rh-table-wrap"><table class="rh-table">\n        <thead><tr>${s.table.head.map((c) => `<th>${inline(c, depth)}</th>`).join('')}</tr></thead>\n        <tbody>\n`;
    for (const r of s.table.rows) h += `          <tr>${r.map((c) => `<td>${inline(c, depth)}</td>`).join('')}</tr>\n`;
    h += `        </tbody>\n      </table></div>\n`;
    if (s.table.caption) h += `      <p class="bb-alt">${inline(s.table.caption, depth)}</p>\n`;
  }
  if (s.ul) h += `      <ul>\n${s.ul.map((x) => `        <li>${inline(x, depth)}</li>`).join('\n')}\n      </ul>\n`;
  if (s.ol) h += `      <ol class="ba-steps">\n${s.ol.map((x) => `        <li>${inline(x, depth)}</li>`).join('\n')}\n      </ol>\n`;
  if (s.after) for (const p of s.after) h += `      <p>${inline(p, depth)}</p>\n`;
  if (s.note) h += `      <div class="rh-note">${inline(s.note, depth)}</div>\n`;
  return h;
}

export function renderArticle(sp, ctx) {
  const url = `${SITE}/${BOLUM}/${sp.slug}/`;
  const kat = KATEGORI[sp.kategori];
  const wc = words([sp.lead, ...sp.kisaCevap, ...sp.sections.map((s) => [s.h, ...(s.p || []), ...(s.ul || []), ...(s.ol || [])].join(' ')), ...sp.faq.flat()].join(' '));
  const dk = Math.max(3, Math.round(wc / 200));
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: clean(sp.title), description: sp.description, inLanguage: 'tr', mainEntityOfPage: url, datePublished: sp.tarih || TARIH, dateModified: sp.guncelleme || sp.tarih || TARIH, wordCount: wc, keywords: sp.keywords.join(', '), articleSection: kat.ad, author: { '@type': 'Organization', name: 'Bilişim Ajans', url: 'https://bilisimajans.com/' }, publisher: { '@type': 'Organization', name: 'Bilişim Ajans', logo: { '@type': 'ImageObject', url: `${SITE}/assets/img/logo.png` } } },
    crumbLd([['Araçlar', `${SITE}/`], ['Bilgi Bankası', `${SITE}/${BOLUM}/`], [kat.ad, `${SITE}/${BOLUM}/#${sp.kategori}`], [clean(sp.title)]]),
    { '@type': 'FAQPage', mainEntity: sp.faq.map(([q, a]) => ({ '@type': 'Question', name: clean(q), acceptedAnswer: { '@type': 'Answer', text: clean(a) } })) },
  ] };
  const d = 2;
  const half = Math.ceil(sp.sections.length / 2);
  const toolCards = sp.tools.map((t) => { const m = ctx.tools.get(t); return `          <li><a href="../../${t}/"><strong>${esc(m.title)}</strong><span>${esc(m.card || m.description || '')}</span></a></li>`; }).join('\n');
  const rel = [...new Set([...(sp.related || []), ...ctx.peers(sp)])].filter((r) => r !== sp.slug && ctx.ready.has(r)).slice(0, 6);
  const relCards = rel.map((r) => { const o = ctx.ready.get(r); return `          <li><a href="../${r}/"><strong>${esc(clean(o.title))}</strong><span>${esc(o.description)}</span></a></li>`; }).join('\n');
  let h = head({ title: sp.pageTitle, description: sp.description, canonical: url, ld, keywords: sp.keywords, depth: d });
  h += `    <section class="ba-hero"><div class="ba-container ba-narrow"><ol class="ba-crumb" aria-label="Konum"><li><a href="../../">Araçlar</a></li><li><a href="../">Bilgi Bankası</a></li><li><a href="../#${sp.kategori}">${esc(kat.ad)}</a></li></ol><h1>${inline(sp.title, d)}</h1><p class="lead">${inline(sp.lead, d)}</p><p class="bb-meta">Güncelleme: <time datetime="${sp.guncelleme || TARIH}">${(sp.guncelleme || TARIH).split('-').reverse().join('.')}</time> · ${dk} dk okuma · Bilişim Ajans Bilgi Bankası</p></div></section>
    <div class="ba-container ba-narrow">

    <section class="bb-kisa" aria-labelledby="h-kisa">
      <h2 id="h-kisa">Kısa cevap</h2>
      <ul>
${sp.kisaCevap.map((k) => `        <li>${inline(k, d)}</li>`).join('\n')}
      </ul>
    </section>

    <figure class="bb-fig">
      ${sp.figure.svg.trim().replace(/^<svg/, `<svg role="img" aria-label="${esc(sp.figure.alt)}"`)}
      <figcaption>${inline(sp.figure.caption, d)}</figcaption>
    </figure>

    <nav class="bb-toc" aria-labelledby="h-toc"><h2 id="h-toc">Bu sayfada</h2><ol>
${sp.sections.map((s, i) => `      <li><a href="#b${i + 1}">${esc(clean(s.h))}</a></li>`).join('\n')}
      <li><a href="#sss">Sık sorulan sorular</a></li>
    </ol></nav>

    <div class="ba-ad" data-slot="bilgi-${sp.slug}-a" aria-label="Reklam"></div>

    <section class="rh-tools" aria-labelledby="h-araclar">
      <h2 id="h-araclar">Bu konuda kullanabileceğiniz ücretsiz araçlar</h2>
      <ul>
${toolCards}
      </ul>
    </section>

    <section class="ba-content">
`;
  sp.sections.forEach((s, i) => {
    h += block(s, d, i);
    if (i === half - 1) h += `\n      <div class="ba-ad" data-slot="bilgi-${sp.slug}-b" aria-label="Reklam"></div>\n`;
  });
  h += `\n      <h2 id="sss">Sık sorulan sorular</h2>\n`;
  for (const [q, a] of sp.faq) h += `      <details><summary>${inline(q, d)}</summary><p>${inline(a, d)}</p></details>\n`;
  h += `\n      <div class="rh-note"><strong>Not:</strong> Bu sayfa genel bilgilendirme amaçlıdır${sp.uyari ? `; ${inline(sp.uyari, d)}` : ''}. Mevzuat, oran ve tutarlar değişebilir; kesin bilgi için ilgili resmî kurumun güncel duyurularını esas alın.</div>\n`;
  if (sp.sources && sp.sources.length) h += `\n      <h2>Kaynaklar</h2>\n      <ul class="bb-src">\n${sp.sources.map(([ad, u]) => `        <li><a href="${esc(u)}" rel="noopener">${esc(ad)}</a></li>`).join('\n')}\n      </ul>\n`;
  h += `    </section>\n`;
  if (relCards) h += `\n    <section aria-labelledby="h-ilgili">\n      <h2 id="h-ilgili">Bilgi Bankası'nda ilgili konular</h2>\n      <ul class="bb-cards">\n${relCards}\n      </ul>\n      <p><a href="../">Bilgi Bankası'nın tamamı →</a></p>\n    </section>\n`;
  h += `\n    <div class="ba-ad" data-slot="bilgi-${sp.slug}-c" aria-label="Reklam"></div>\n    </div>\n`;
  return h + tail(d);
}

export function renderHub(list, ctx) {
  const url = `${SITE}/${BOLUM}/`;
  const title = `Bilgi Bankası: ${list.length} Konuda Merak Edilenler ve Hesap Rehberi`;
  const description = 'Maaş, vergi, kredi, sınav, sağlık göstergeleri, dosya formatları ve günlük hesaplarda en çok sorulan sorular; formüller, örnekler ve ücretsiz araçlarla.';
  const used = Object.keys(KATEGORI).filter((k) => list.some((s) => s.kategori === k));
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', name: 'Bilişim Ajans Bilgi Bankası', description, inLanguage: 'tr', url, publisher: { '@type': 'Organization', name: 'Bilişim Ajans' }, hasPart: list.map((s) => ({ '@type': 'Article', headline: clean(s.title), url: `${url}${s.slug}/` })) },
    crumbLd([['Araçlar', `${SITE}/`], ['Bilgi Bankası']]),
  ] };
  const d = 1;
  let h = head({ title, description, canonical: url, ld, depth: d }).replace('content="article"', 'content="website"');
  h += `    <section class="ba-hero"><div class="ba-container ba-narrow"><ol class="ba-crumb" aria-label="Konum"><li><a href="../">Araçlar</a></li><li>Bilgi Bankası</li></ol><h1>Bilgi Bankası</h1><p class="lead">Türkiye'de en çok aranan "nedir, nasıl hesaplanır, kaç olur" sorularının açık ve örnekli cevapları. Her makale konuyu formülü, çözümlü örneği ve sık yapılan hatalarıyla anlatır; hesabı kendiniz yapmak isterseniz ilgili ücretsiz aracı aynı sayfada bulursunuz. Hesaplar tarayıcınızda çalışır, girdiğiniz bilgiler hiçbir yere gönderilmez.</p><ul class="ba-badges" aria-label="Güvence"><li>${list.length} makale</li><li>Ücretsiz araçlarla</li><li>Kayıt yok</li></ul></div></section>
    <div class="ba-container ba-narrow">
    <nav class="bb-toc" aria-labelledby="h-kat"><h2 id="h-kat">Kategoriler</h2><ol>
${used.map((k) => `      <li><a href="#${k}">${esc(KATEGORI[k].ad)}</a> (${list.filter((s) => s.kategori === k).length})</li>`).join('\n')}
      <li><a href="../#rehber">Araç rehberleri</a> (${ctx.rehber.size})</li>
    </ol></nav>
    <div class="ba-ad" data-slot="bilgi-hub-a" aria-label="Reklam"></div>
`;
  used.forEach((k, i) => {
    h += `
    <section aria-labelledby="${k}">
      <h2 id="${k}">${esc(KATEGORI[k].ad)}</h2>
      <p class="bb-alt">${esc(KATEGORI[k].alt)}</p>
      <ul class="bb-cards">
${list.filter((s) => s.kategori === k).map((s) => `        <li><a href="${s.slug}/"><strong>${esc(clean(s.title))}</strong><span>${esc(s.description)}</span></a></li>`).join('\n')}
      </ul>
    </section>
`;
    if (i === Math.floor(used.length / 2) - 1) h += `\n    <div class="ba-ad" data-slot="bilgi-hub-b" aria-label="Reklam"></div>\n`;
  });
  h += `
    <section class="ba-content" aria-labelledby="h-nasil">
      <h2 id="h-nasil">Bilgi Bankası nasıl hazırlanıyor?</h2>
      <p>Konular, Türkiye'de arama motorlarında ve yapay zekâ asistanlarında en sık sorulan sorulardan seçilir. Her makale önce soruya kısa ve doğrudan bir cevap verir, ardından hesabın mantığını, adım adım çözümlü örnekleri, karşılaştırma tablolarını ve sık yapılan hataları anlatır. Sayılar örnek amaçlıdır; vergi, prim, harç ve faiz gibi değişen değerler için makalelerde resmî kaynak gösterilir ve araçlarda bu değerleri kendiniz girebilirsiniz.</p>
      <p>Bilgi Bankası makaleleri genel bilgilendirme içindir; hukuki, mali veya tıbbi danışmanlığın yerine geçmez. Kendi durumunuza özel karar vermeden önce ilgili kurumun güncel duyurusunu kontrol edin ya da bir uzmana danışın. Bir hata görürseniz <a href="https://bilisimajans.com/iletisim">iletişim</a> sayfasından bize yazabilirsiniz; düzeltmeler makalenin güncelleme tarihine yansıtılır.</p>
    </section>

    <div class="ba-ad" data-slot="bilgi-hub-c" aria-label="Reklam"></div>
    </div>
`;
  return h + tail(d);
}

export function hubCard(sp) {
  return `        <li class="ba-card"><div class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/><path d="M9 7h7M9 11h5"/></svg></div><a class="ba-card-link" href="${BOLUM}/${sp.slug}/">${esc(clean(sp.title))}</a><p>${esc(sp.description)}</p><span class="go" aria-hidden="true">Oku →</span></li>`;
}
