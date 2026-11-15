// Geçerli tüm Bilgi Bankası makalelerinden web/bilgi-bankasi/ sayfalarını üretir;
// ana sayfadaki "Bilgi Bankası" bölümünü, sitemap'i ve testteki kart sayısını günceller.
// Kullanım: node scripts/bilgi/derle.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { setYayinda, konular, validate, load, loadTools, rehberler, allSlugs, renderArticle, renderHub, hubCard, ROOT, WEB, BOLUM, SITE, KATEGORI } from './lib.mjs';

const konuList = konular();
const base = { tools: loadTools(), rehber: rehberler(), bilgi: new Set([...allSlugs(), ...konuList.map((k) => k.slug)]) };
const good = []; const bad = [];
for (const slug of allSlugs()) {
  try { const sp = await load(slug); const e = validate(sp, { ...base, file: slug }); (e.length ? bad.push({ slug, e }) : good.push(sp)); } catch (err) { bad.push({ slug, e: [err.message] }); }
}
const order = Object.keys(KATEGORI);
good.sort((a, b) => order.indexOf(a.kategori) - order.indexOf(b.kategori) || a.title.localeCompare(b.title, 'tr'));
const ready = new Map(good.map((s) => [s.slug, s]));
setYayinda(new Set(ready.keys()));
const ctx = { ...base, ready, peers: (sp) => good.filter((o) => o.kategori === sp.kategori && o.slug !== sp.slug).map((o) => o.slug) };

const out = join(WEB, BOLUM);
mkdirSync(out, { recursive: true });
for (const sp of good) {
  mkdirSync(join(out, sp.slug), { recursive: true });
  writeFileSync(join(out, sp.slug, 'index.html'), renderArticle(sp, ctx));
}
writeFileSync(join(out, 'index.html'), renderHub(good, ctx));

// ana sayfa: sekme + bölüm (rehberlerden sonra, oyunlardan önce → araç sayacına girmez)
const hp = join(WEB, 'index.html');
let hub = readFileSync(hp, 'utf8');
hub = hub.replace(/<!-- bilgi:basla -->[\s\S]*?<!-- bilgi:bitis -->\n?/g, '').replace(/<li><a href="#bilgi">Bilgi Bankası<\/a><\/li>/, '');
const tab = '<li><a href="#rehber">Rehberler</a></li>';
if (!hub.includes(tab)) throw new Error('ana sayfa: Rehberler sekmesi bulunamadı');
hub = hub.replace(tab, tab + '<li><a href="#bilgi">Bilgi Bankası</a></li>');
const anchor = hub.match(/[ \t]*<section data-category="oyunlar"/)[0];
const section = `<!-- bilgi:basla -->        <section data-category="bilgi" aria-labelledby="h-bilgi">
      <div class="ba-section-title"><h2 id="h-bilgi"><a href="${BOLUM}/">Bilgi Bankası</a></h2><span>en çok sorulan sorular: maaş, vergi, kredi, sınav, dosya, günlük hesaplar</span></div>
      <ul class="ba-grid">
${good.map(hubCard).join('\n')}
      </ul>
    </section>
<!-- bilgi:bitis -->
`;
hub = hub.replace(anchor, section + anchor);
writeFileSync(hp, hub);
// hub.js sayaç kuralı: rehber ve bilgi kartları araç sayısına girmez
const hj = join(WEB, 'assets/js/hub.js');
writeFileSync(hj, readFileSync(hj, 'utf8').replace(`'[data-category]:not([data-category="rehber"]) .ba-card'`, `'[data-category]:not([data-category="rehber"]):not([data-category="bilgi"]) .ba-card'`));

// sitemap
const smp = join(WEB, 'sitemap.xml');
let sm = readFileSync(smp, 'utf8').split('\n').filter((l) => !l.includes('<!--bilgi-->')).join('\n');
const lines = [`  <url><loc>${SITE}/${BOLUM}/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url><!--bilgi-->`,
  ...good.map((s) => `  <url><loc>${SITE}/${BOLUM}/${s.slug}/</loc><lastmod>${s.guncelleme || s.tarih || '2026-11-15'}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url><!--bilgi-->`)].join('\n');
sm = sm.replace('</urlset>', lines + '\n</urlset>');
writeFileSync(smp, sm);

// test: ana sayfa kart sayısı ve makale listesi
const total = (hub.match(/class="ba-card"/g) || []).length;
const hs = join(ROOT, 'tests', 'hub.spec.ts');
writeFileSync(hs, readFileSync(hs, 'utf8').replace(/toHaveCount\(\d+\)/g, `toHaveCount(${total})`));
writeFileSync(join(ROOT, 'tests', 'bilgi-bankasi.json'), JSON.stringify(good.map((s) => s.slug)) + '\n');

console.log(`${good.length} makale üretildi. Ana sayfa kartı: ${total}.`);
if (bad.length) { console.log(`\n${bad.length} makale atlandı:`); for (const b of bad) console.log(`✗ ${b.slug}\n` + b.e.map((x) => '    - ' + x).join('\n')); }
