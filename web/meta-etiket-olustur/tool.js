// Meta etiket, Open Graph, Twitter Card, robots.txt ve sitemap.xml üretici — saf JS.
// Girilen metinler tarayıcıdan çıkmaz; resim adresleri yüklenmez (önizlemede gösterilmez).
import { downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const TABS = ['meta', 'robots', 'sitemap'];
const TITLE_MAX = 60;
const DESC_MAX = 160;

function setError(msg) {
  const el = $('error');
  el.textContent = msg || '';
  el.classList.toggle('is-active', !!msg);
}

/* ---------- Sekmeler ---------- */
function selectTab(name, focus) {
  for (const t of TABS) {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', sel ? 'true' : 'false');
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  }
  setError('');
  if (focus) $('tab-' + name).focus();
}
TABS.forEach((t, i) => {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') selectTab(TABS[(i + 1) % TABS.length], true);
    else if (e.key === 'ArrowLeft') selectTab(TABS[(i + TABS.length - 1) % TABS.length], true);
  });
});

/* ---------- Yardımcılar ---------- */
// HTML öznitelik değeri için kaçış.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const val = (id) => $(id).value.trim();

function isHttpUrl(s) {
  try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:'; } catch { return false; }
}

async function copyFrom(id) {
  const value = $(id).value;
  if (!value) { setError('Kopyalanacak çıktı yok. Önce alanları doldurun.'); return; }
  setError('');
  try { await navigator.clipboard.writeText(value); } catch {
    const t = document.createElement('textarea');
    t.value = value;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  $('copied').textContent = 'Kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
}
document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copyFrom(b.dataset.copy)));
document.querySelectorAll('[data-download]').forEach((b) => b.addEventListener('click', () => {
  const v = $(b.dataset.download).value;
  if (!v) { setError('İndirilecek çıktı yok. Önce alanları doldurun.'); return; }
  setError('');
  downloadBlob(new Blob([v + '\n'], { type: 'text/plain;charset=utf-8' }), b.dataset.filename);
}));

/* ---------- 1. Meta etiketler ---------- */
function counter(inputId, countId, warnId, max, warnText) {
  const n = [...$(inputId).value].length;
  $(countId).textContent = `${n} / ${max}`;
  const over = n > max;
  $(countId).classList.toggle('is-over', over);
  $(warnId).textContent = over ? warnText : '';
}

function buildJsonLd() {
  const kind = $('m-schema').value;
  if (kind === 'none') return '';
  const name = val('j-name') || val('m-sitename') || val('m-title');
  const url = val('j-url') || val('m-canon');
  let data;
  if (kind === 'Organization') {
    data = { '@context': 'https://schema.org', '@type': 'Organization', name, url };
    if (val('j-logo')) data.logo = val('j-logo');
  } else if (kind === 'WebSite') {
    data = { '@context': 'https://schema.org', '@type': 'WebSite', name, url };
  } else {
    data = { '@context': 'https://schema.org', '@type': 'Article', headline: val('m-title') || name, description: val('m-desc') };
    if (val('j-author')) data.author = { '@type': 'Person', name: val('j-author') };
    if (val('j-date')) data.datePublished = val('j-date');
    if (val('m-ogimage')) data.image = val('m-ogimage');
    if (url) data.mainEntityOfPage = url;
  }
  for (const k of Object.keys(data)) if (data[k] === '' || data[k] === undefined) delete data[k];
  // "<" karakteri script bloğunu kapatmasın diye kaçırılır.
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

function buildMeta() {
  const title = val('m-title');
  const desc = val('m-desc');
  const canon = val('m-canon');
  const lines = [`<!-- html etiketine şunu ekleyin: <html lang="${$('m-lang').value}"> -->`, '<meta charset="utf-8">'];
  if ($('m-viewport').checked) lines.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
  if (title) lines.push(`<title>${esc(title)}</title>`);
  if (desc) lines.push(`<meta name="description" content="${esc(desc)}">`);

  const robots = [$('m-index').value, $('m-follow').value];
  for (const id of ['m-noarchive', 'm-nosnippet', 'm-noimageindex']) if ($(id).checked) robots.push($(id).value);
  if ($('m-maximg').checked) robots.push('max-image-preview:large');
  const robotsStr = robots.join(', ');
  // Varsayılan (index, follow) yazılmasa da olur; yine de açıkça yazmak isteyene seçenek var.
  if (robotsStr !== 'index, follow' || $('m-robots-always').checked) lines.push(`<meta name="robots" content="${robotsStr}">`);
  if (canon) lines.push(`<link rel="canonical" href="${esc(canon)}">`);

  if ($('m-og').checked) {
    const ogTitle = val('m-ogtitle') || title;
    const ogDesc = val('m-ogdesc') || desc;
    lines.push('');
    lines.push('<!-- Open Graph -->');
    if (ogTitle) lines.push(`<meta property="og:title" content="${esc(ogTitle)}">`);
    if (ogDesc) lines.push(`<meta property="og:description" content="${esc(ogDesc)}">`);
    if (val('m-ogimage')) lines.push(`<meta property="og:image" content="${esc(val('m-ogimage'))}">`);
    if (canon) lines.push(`<meta property="og:url" content="${esc(canon)}">`);
    lines.push(`<meta property="og:type" content="${$('m-ogtype').value}">`);
    if (val('m-sitename')) lines.push(`<meta property="og:site_name" content="${esc(val('m-sitename'))}">`);
    lines.push(`<meta property="og:locale" content="${esc($('m-locale').value)}">`);
  }
  if ($('m-tw').checked) {
    const twTitle = val('m-ogtitle') || title;
    const twDesc = val('m-ogdesc') || desc;
    lines.push('');
    lines.push('<!-- Twitter Card -->');
    lines.push(`<meta name="twitter:card" content="${$('m-twcard').value}">`);
    if (val('m-twsite')) lines.push(`<meta name="twitter:site" content="${esc(val('m-twsite'))}">`);
    if (twTitle) lines.push(`<meta name="twitter:title" content="${esc(twTitle)}">`);
    if (twDesc) lines.push(`<meta name="twitter:description" content="${esc(twDesc)}">`);
    if (val('m-ogimage')) lines.push(`<meta name="twitter:image" content="${esc(val('m-ogimage'))}">`);
  }
  const fav = [];
  if (val('m-fav')) fav.push(`<link rel="icon" href="${esc(val('m-fav'))}">`);
  if (val('m-fav-png')) fav.push(`<link rel="icon" type="image/png" sizes="32x32" href="${esc(val('m-fav-png'))}">`);
  if (val('m-apple')) fav.push(`<link rel="apple-touch-icon" href="${esc(val('m-apple'))}">`);
  if (val('m-theme')) fav.push(`<meta name="theme-color" content="${esc(val('m-theme'))}">`);
  if (fav.length) { lines.push(''); lines.push('<!-- Simgeler -->'); lines.push(...fav); }

  const ld = buildJsonLd();
  if (ld) { lines.push(''); lines.push('<script type="application/ld+json">'); lines.push(ld); lines.push('</script>'); }
  return lines.join('\n');
}

function renderPreview() {
  const title = val('m-title') || 'Sayfa başlığınız burada görünür';
  const desc = val('m-desc') || 'Sayfa açıklamanız burada görünür. Arama sonucunda yaklaşık 155-160 karaktere kadar gösterilir.';
  const canon = val('m-canon');
  let crumb = 'ornek.com › sayfa';
  if (isHttpUrl(canon)) {
    const u = new URL(canon);
    crumb = u.hostname + (u.pathname !== '/' ? ' › ' + u.pathname.split('/').filter(Boolean).join(' › ') : '');
  }
  $('pv-title').textContent = title;
  $('pv-crumb').textContent = crumb;
  $('pv-desc').textContent = desc;
  $('sc-title').textContent = val('m-ogtitle') || val('m-title') || 'Paylaşım başlığı';
  $('sc-desc').textContent = val('m-ogdesc') || val('m-desc') || 'Paylaşım açıklaması';
  $('sc-domain').textContent = (isHttpUrl(canon) ? new URL(canon).hostname : 'ornek.com').toUpperCase();
  $('sc-card').classList.toggle('is-small', $('m-twcard').value === 'summary');
}

function update() {
  counter('m-title', 'c-title', 'w-title', TITLE_MAX, 'Başlık 60 karakteri aşıyor; Google arama sonuçlarında sonu "…" ile kısaltılabilir. Önemli kelimeleri başa alın.');
  counter('m-desc', 'c-desc', 'w-desc', DESC_MAX, 'Açıklama 160 karakteri aşıyor; arama sonucunda kesilebilir. Özeti kısaltın.');
  const canon = val('m-canon');
  $('w-canon').textContent = canon && !isHttpUrl(canon) ? 'Canonical adres https:// ile başlayan tam bir adres olmalı. Örnek: https://ornek.com/sayfa/' : '';
  const kind = $('m-schema').value;
  $('j-fields').hidden = kind === 'none';
  $('j-art').hidden = kind !== 'Article';
  $('j-logo-wrap').hidden = kind !== 'Organization';
  $('m-out').value = buildMeta();
  renderPreview();
}
document.querySelectorAll('#panel-meta input, #panel-meta select, #panel-meta textarea').forEach((el) => {
  if (el.id === 'm-out') return;
  el.addEventListener('input', update);
  el.addEventListener('change', update);
});

/* ---------- 2. robots.txt ---------- */
function buildRobots() {
  const agent = val('r-agent') || '*';
  const lines = [`User-agent: ${agent}`];
  const mode = $('r-mode').value;
  const clean = (id) => $(id).value.split('\n').map((s) => s.trim()).filter(Boolean).map((p) => (p.startsWith('/') ? p : '/' + p));
  const disallow = clean('r-dis');
  const allow = clean('r-allow');
  if (mode === 'none') lines.push('Disallow: /');
  else if (disallow.length) disallow.forEach((p) => lines.push(`Disallow: ${p}`));
  else lines.push('Disallow:');
  if (mode !== 'none') allow.forEach((p) => lines.push(`Allow: ${p}`));
  const sm = val('r-sitemap');
  if (sm) { lines.push(''); lines.push(`Sitemap: ${sm}`); }
  return lines.join('\n');
}
function updateRobots() {
  const sm = val('r-sitemap');
  $('r-warn').textContent = sm && !isHttpUrl(sm) ? 'Sitemap adresi https:// ile başlayan tam adres olmalı. Örnek: https://ornek.com/sitemap.xml' : '';
  $('r-note').hidden = $('r-mode').value !== 'none';
  $('r-out').value = buildRobots();
}
['r-agent', 'r-mode', 'r-dis', 'r-allow', 'r-sitemap'].forEach((id) => { $(id).addEventListener('input', updateRobots); $(id).addEventListener('change', updateRobots); });

/* ---------- 3. sitemap.xml ---------- */
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
function buildSitemap() {
  const raw = $('s-urls').value.split('\n').map((s) => s.trim()).filter(Boolean);
  const out = $('s-out');
  if (!raw.length) { out.value = ''; $('s-info').textContent = ''; setError(''); return; }
  const bad = raw.filter((u) => !isHttpUrl(u));
  if (bad.length) {
    out.value = '';
    $('s-info').textContent = '';
    setError(`Geçersiz adres var: "${bad[0]}"${bad.length > 1 ? ` (+${bad.length - 1} satır daha)` : ''}. Her satıra https:// ile başlayan tam bir adres yazın.`);
    return;
  }
  setError('');
  const unique = [...new Set(raw)];
  const lastmod = val('s-lastmod');
  const freq = $('s-freq').value;
  const prio = val('s-prio');
  const items = unique.slice(0, 50000).map((u) => {
    let s = `  <url>\n    <loc>${xmlEsc(u)}</loc>`;
    if (lastmod) s += `\n    <lastmod>${xmlEsc(lastmod)}</lastmod>`;
    if (freq) s += `\n    <changefreq>${freq}</changefreq>`;
    if (prio) s += `\n    <priority>${xmlEsc(prio)}</priority>`;
    return s + '\n  </url>';
  });
  out.value = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join('\n')}\n</urlset>`;
  const dup = raw.length - unique.length;
  $('s-info').textContent = `${items.length} adres yazıldı` + (dup ? `, ${dup} yinelenen satır atlandı` : '') + (unique.length > 50000 ? '; sitemap dosyası en fazla 50.000 adres taşır, fazlası alınmadı' : '') + '.';
}
['s-urls', 's-lastmod', 's-freq', 's-prio'].forEach((id) => { $(id).addEventListener('input', buildSitemap); $(id).addEventListener('change', buildSitemap); });

update();
updateRobots();
selectTab('meta');
