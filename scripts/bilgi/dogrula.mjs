// Kullanım: node scripts/bilgi/dogrula.mjs <slug> [slug…]   (slug yoksa tümü)
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { validate, load, loadTools, rehberler, allSlugs, words, ROOT } from './lib.mjs';

const konular = existsSync(join(ROOT, 'scripts/bilgi/konular.json')) ? JSON.parse(readFileSync(join(ROOT, 'scripts/bilgi/konular.json'), 'utf8')) : [];
const ctx = { tools: loadTools(), rehber: rehberler(), bilgi: new Set([...allSlugs(), ...konular.map((k) => k.slug)]) };
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : allSlugs();
let fail = 0;
for (const slug of slugs) {
  let errs;
  let sp;
  try { sp = await load(slug); errs = validate(sp, { ...ctx, file: slug }); } catch (err) { errs = [`dosya yüklenemedi: ${err.message}`]; }
  if (errs.length) { fail++; console.log(`✗ ${slug}\n` + errs.map((x) => '    - ' + x).join('\n')); }
  else {
    const body = [sp.lead, ...sp.kisaCevap, ...sp.sections.map((s) => [s.h, ...(s.p || []), ...(s.ul || []), ...(s.ol || []), s.note || '', ...(s.table ? s.table.rows.flat() : [])].join(' ')), ...sp.faq.flat()].join(' ');
    console.log(`✓ ${slug} (${words(body)} kelime, ${sp.sections.length} bölüm, ${sp.faq.length} SSS)`);
  }
}
process.exit(fail ? 1 : 0);
