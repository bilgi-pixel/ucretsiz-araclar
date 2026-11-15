// Kullanım: node scripts/uret/derle.mjs
// Geçerli tüm spec'lerden web/<slug>/ sayfalarını üretir; hub kartlarını, sitemap'i ve test verisini günceller.
// Geçersiz spec atlanır ve raporlanır. Yeniden çalıştırmak güvenlidir (işaretli bloklar değiştirilir).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, WEB, CATS, catalog, existingSlugs, specSlugs, loadSpec, validate, renderPage, toolJs, metaJson, logicSource, cardHtml, esc } from './lib.mjs';

const cat = catalog();
const order = new Map(cat.map((c, i) => [c.slug, i]));
const generated = new Set(cat.map((c) => c.slug));
const known = new Set([...existingSlugs(), ...generated]);

// 1) spec'leri yükle ve doğrula
const good = [], bad = [];
for (const slug of specSlugs()) {
  try {
    const spec = await loadSpec(slug);
    const errors = await validate(spec, slug, { known });
    if (!order.has(slug)) errors.push('katalogda yok');
    if (errors.length) bad.push({ slug, errors }); else good.push(spec);
  } catch (e) { bad.push({ slug, errors: [e.message] }); }
}
good.sort((a, b) => order.get(a.slug) - order.get(b.slug));

// 2) başlık haritası: mevcut araçlar (meta.json) + üretilenler
const titles = new Map();
for (const s of existingSlugs()) {
  if (generated.has(s)) continue;
  try { titles.set(s, JSON.parse(readFileSync(join(WEB, s, 'meta.json'), 'utf8')).title); } catch { /* araç değil */ }
}
for (const s of good) titles.set(s.slug, s.title);

// 3) sayfalar
for (const spec of good) {
  const dir = join(WEB, spec.slug); mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), renderPage(spec, titles));
  writeFileSync(join(dir, 'logic.js'), logicSource(spec));
  writeFileSync(join(dir, 'tool.js'), toolJs(spec));
  writeFileSync(join(dir, 'meta.json'), metaJson(spec));
}

// 4) hub: sekmeler + kategori bölümleri (işaretli blok)
const B = '<!-- uret:basla -->', S = '<!-- uret:bitis -->';
const strip = (t) => { let i; while ((i = t.indexOf(B)) !== -1) { const j = t.indexOf(S, i); t = t.slice(0, i) + t.slice(j + S.length); } return t; };
let hub = strip(readFileSync(join(WEB, 'index.html'), 'utf8'));
const usedCats = Object.keys(CATS).filter((k) => good.some((s) => s.category === k));
const tabs = B + usedCats.map((k) => `<li><a href="#${k}">${esc(CATS[k].ad)}</a></li>`).join('') + S;
const sections = B + usedCats.map((k) => `
    <section data-category="${k}" aria-labelledby="h-${k}">
      <div class="ba-section-title"><h2 id="h-${k}">${esc(CATS[k].ad)}</h2><span>${esc(CATS[k].alt)}</span></div>
      <ul class="ba-grid">
${good.filter((s) => s.category === k).map(cardHtml).join('\n')}
      </ul>
    </section>
`).join('') + S;
const tabAnchor = '<li><a href="#rehber">Rehberler</a></li>';
const secAnchor = hub.match(/[ \t]*<section data-category="rehber"/)[0];
if (!hub.includes(tabAnchor)) throw new Error('hub: sekme çapası bulunamadı');
hub = hub.replace(tabAnchor, tabs + tabAnchor).replace(secAnchor, sections + secAnchor);
// başlık ve açıklamadaki araç sayısı
const total = (hub.match(/class="ba-card"/g) || []).length;
const guides = (hub.slice(hub.indexOf('data-category="rehber"'), hub.indexOf('data-category="oyunlar"')).match(/class="ba-card"/g) || []).length;
const toolCount = total - guides;
const round = Math.floor(toolCount / 50) * 50;
hub = hub.replace(/<title>\d+\+ Ücretsiz Online Araç ve Oyun/, `<title>${round}+ Ücretsiz Online Araç ve Oyun`);
writeFileSync(join(WEB, 'index.html'), hub);

// 5) sitemap
let sm = readFileSync(join(WEB, 'sitemap.xml'), 'utf8');
sm = sm.split('\n').filter((l) => !l.includes('<!--uret-->')).join('\n');
const lines = good.map((s) => `  <url><loc>https://araclar.bilisimajans.com/${s.slug}/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url><!--uret-->`).join('\n');
sm = sm.replace('</urlset>', lines + '\n</urlset>');
writeFileSync(join(WEB, 'sitemap.xml'), sm);

// 6) test verisi + hub testindeki kart sayısı
const data = good.map((s) => {
  const ok = s.cases.filter((c) => !c.error).slice(0, 2), er = s.cases.filter((c) => c.error).slice(0, 1);
  const defaults = {}; for (const f of s.inputs) defaults[f.id] = f.value !== undefined ? String(f.value) : (f.type === 'select' ? String(f.options[0][0]) : '');
  return { slug: s.slug, title: s.title, types: Object.fromEntries(s.inputs.map((f) => [f.id, f.type])), defaults, cases: [...ok, ...er] };
});
writeFileSync(join(ROOT, 'tests', 'uretilen.json'), JSON.stringify(data) + '\n');
const hs = join(ROOT, 'tests', 'hub.spec.ts');
writeFileSync(hs, readFileSync(hs, 'utf8').replace(/toHaveCount\(\d+\)/g, `toHaveCount(${total})`));

console.log(`${good.length} araç üretildi. Hub kartı: ${total} (rehber hariç araç: ${toolCount}).`);
if (bad.length) { console.log(`\n${bad.length} spec atlandı:`); for (const b of bad) console.log(`✗ ${b.slug}\n` + b.errors.map((e) => '    - ' + e).join('\n')); }
