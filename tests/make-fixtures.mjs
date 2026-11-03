// Test örnek dosyalarını üretir: 2 sayfalı PDF, şifreli PDF, küçük PNG, bozuk PDF.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const dir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
mkdirSync(dir, { recursive: true });

async function makePdf(name, pages, text) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= pages; i++) {
    const page = doc.addPage([595.28, 841.89]);
    page.drawText(`${text} - sayfa ${i}`, { x: 60, y: 760, size: 28, font, color: rgb(0.48, 0.14, 0.19) });
    page.drawRectangle({ x: 60, y: 100, width: 475, height: 600, borderColor: rgb(0.2, 0.2, 0.2), borderWidth: 2 });
  }
  writeFileSync(join(dir, name), await doc.save());
}

await makePdf('iki-sayfa.pdf', 2, 'Test belgesi');
await makePdf('uc-sayfa.pdf', 3, 'Ikinci belge');

// 1x1 kirmizi PNG (base64), Türkçe karakterli ad.
writeFileSync(join(dir, 'fotoğraf-ş.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==', 'base64'));
writeFileSync(join(dir, 'bozuk.pdf'), '%PDF-1.4\nbu bir pdf degil\n');

// Şifreli PDF: pdf-lib şifreleme yazmaz; minimal /Encrypt sözlüklü el yapımı PDF (yükleyici "encrypted" hatası verir).
if (!existsSync(join(dir, 'sifreli.pdf'))) {
  const body = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >> endobj
4 0 obj << /Filter /Standard /V 1 /R 2 /Length 40 /P -1 /O <00000000000000000000000000000000> /U <00000000000000000000000000000000> >> endobj
trailer << /Root 1 0 R /Encrypt 4 0 R /ID [<01><02>] >>
%%EOF`;
  writeFileSync(join(dir, 'sifreli.pdf'), body);
}
console.log('fixtures hazır:', dir);
