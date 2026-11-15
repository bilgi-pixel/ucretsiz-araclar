// Kullanım: node scripts/uret/grup.mjs <grupNo>  → o grubun (10 araç) henüz geçerli spec'i olmayan araçlarını listeler.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { catalog, SPECS } from './lib.mjs';
const N = 10, cat = catalog(), g = Number(process.argv[2]);
const total = Math.ceil(cat.length / N);
if (!process.argv[2]) { console.log(total); process.exit(0); }
const items = cat.slice((g - 1) * N, g * N);
for (const c of items) console.log(`${existsSync(join(SPECS, c.slug + '.mjs')) ? 'VAR ' : 'YAZ '} ${c.cat} | ${c.slug} | ${c.title}`);
