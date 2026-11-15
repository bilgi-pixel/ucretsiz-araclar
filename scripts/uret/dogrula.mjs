// Kullanım: node scripts/uret/dogrula.mjs <slug> [<slug> …]   (slug verilmezse tüm spec'ler)
// Her spec'i şemaya, kelime sayısına ve test örneklerine göre doğrular. Hata varsa çıkış kodu 1.
import { catalog, existingSlugs, specSlugs, loadSpec, validate } from './lib.mjs';

const cat = catalog();
const generated = new Set(cat.map((c) => c.slug));
const known = new Set([...existingSlugs(), ...generated]);
for (const s of ['oyunlar', 'rehber', 'en', 'assets', 'vendor', 'hakkimizda', 'gizlilik', 'indir']) known.delete(s);
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : specSlugs();
let bad = 0;
for (const slug of slugs) {
  let errors;
  try {
    const spec = await loadSpec(slug);
    errors = await validate(spec, slug, { known });
    const c = cat.find((x) => x.slug === slug);
    if (!c) errors.push('slug katalogda yok');
    else if (spec.category !== c.cat) errors.push(`category "${c.cat}" olmalı`);
  } catch (e) { errors = [`yüklenemedi: ${e.message}`]; }
  if (errors.length) { bad++; console.log(`✗ ${slug}\n` + errors.map((e) => '    - ' + e).join('\n')); }
  else console.log(`✓ ${slug}`);
}
console.log(bad ? `\n${bad} spec hatalı.` : `\n${slugs.length} spec geçerli.`);
process.exit(bad ? 1 : 0);
