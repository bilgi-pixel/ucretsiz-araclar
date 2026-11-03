import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

/* ---------- Küçük .docx üreteci (bağımlılık yok: STORE yöntemiyle zip + CRC32) ---------- */
const CRC_TABLE = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
function crc32(buf: Buffer) {
  let c = -1;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function zipStore(files: Record<string, string>): Buffer {
  const locals: Buffer[] = []; const centrals: Buffer[] = []; let offset = 0;
  for (const [name, text] of Object.entries(files)) {
    const nameB = Buffer.from(name, 'utf8'); const data = Buffer.from(text, 'utf8'); const crc = crc32(data);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6); lh.writeUInt16LE(0, 8);
    lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0x21, 12); lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(data.length, 18);
    lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nameB.length, 26); lh.writeUInt16LE(0, 28);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0, 8); ch.writeUInt16LE(0, 10);
    ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0x21, 14); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(data.length, 24);
    ch.writeUInt16LE(nameB.length, 28); ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32); ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36);
    ch.writeUInt32LE(0, 38); ch.writeUInt32LE(offset, 42);
    locals.push(lh, nameB, data); centrals.push(ch, nameB);
    offset += lh.length + nameB.length + data.length;
  }
  const cdSize = centrals.reduce((s, b) => s + b.length, 0);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(centrals.length / 2, 8); eocd.writeUInt16LE(centrals.length / 2, 10);
  eocd.writeUInt32LE(cdSize, 12); eocd.writeUInt32LE(offset, 16); eocd.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, ...centrals, eocd]);
}
const p = (text: string, opts: { style?: string; bold?: boolean } = {}) =>
  `<w:p>${opts.style ? `<w:pPr><w:pStyle w:val="${opts.style}"/></w:pPr>` : ''}<w:r>${opts.bold ? '<w:rPr><w:b/></w:rPr>' : ''}<w:t xml:space="preserve">${text}</w:t></w:r></w:p>`;
function makeDocx(): Buffer {
  const body = [
    p('Şişli Belediyesi Dilekçe Örneği', { style: 'Heading1' }),
    p('İlgili makama; çağrı üzerine görüşmeye katılacağım. Ğüşıöç harfleri korunmalı.'),
    p('Kalın bir vurgu', { bold: true }),
    `<w:tbl><w:tr><w:tc>${p('Ad')}</w:tc><w:tc>${p('Soyad')}</w:tc></w:tr><w:tr><w:tc>${p('Ayşe')}</w:tc><w:tc>${p('Çelik')}</w:tc></w:tr></w:tbl>`,
    p('Uzun paragraf. '.repeat(120)),
  ].join('');
  return zipStore({
    '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>',
    '_rels/.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    'word/_rels/document.xml.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
    'word/styles.xml': '<?xml version="1.0" encoding="UTF-8"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/></w:style></w:styles>',
    'word/document.xml': `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}</w:body></w:document>`,
  });
}
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

test.describe('Word\'den PDF\'e', () => {
  test('docx önizlenir, yazdırma çağrılır, doğrudan PDF iner, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const pageErrors: string[] = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));
    // print() başsız tarayıcıda askıda kalmasın: tüm çerçevelerde izle
    await page.addInitScript(() => { (window as any).print = () => { (window as any).__printed = true; }; });

    await page.goto('/wordden-pdfe/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'dilekçe-örneği.docx', mimeType: DOCX_MIME, buffer: makeDocx() });

    await expect(page.locator('#preview')).toHaveClass(/is-active/);
    await expect(page.locator('#file-meta')).toContainText('dilekçe-örneği.docx');
    const frame = page.frameLocator('#frame');
    await expect(frame.locator('h1')).toContainText('Şişli Belediyesi');
    await expect(frame.locator('body')).toContainText('Ğüşıöç harfleri korunmalı');
    await expect(frame.locator('strong')).toContainText('Kalın bir vurgu');
    await expect(frame.locator('table td')).toHaveCount(4);

    // Yol 1: yazdır
    await page.locator('#print').click();
    const printed = await page.frames().find((f) => f !== page.mainFrame())!.evaluate(() => (window as any).__printed === true);
    expect(printed).toBe(true);

    // Yol 2: doğrudan PDF
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText(/\d+ sayfa/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('dilekçe-örneği.pdf');
    const bytes = readFileSync((await dl.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    expect(bytes.length).toBeGreaterThan(5_000); // gömülü yazı tipi alt kümesi var
    expect(bytes.toString('latin1')).toContain('/FontFile2'); // TrueType gömülü

    expect(external).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('PNG ve bozuk docx anlaşılır hata verir', async ({ page }) => {
    await page.goto('/wordden-pdfe/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('.docx dosyası değil');
    await expect(page.locator('#preview')).not.toHaveClass(/is-active/);

    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.docx', mimeType: DOCX_MIME, buffer: Buffer.from('bu bir docx degil') });
    await expect(page.locator('#error')).toContainText(/Word \(\.docx\) belgesi değil/);

    // Eski .doc / şifreli OLE imzası
    const ole = Buffer.concat([Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]), Buffer.alloc(64)]);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'eski.docx', mimeType: DOCX_MIME, buffer: ole });
    await expect(page.locator('#error')).toContainText(/eski \.doc biçiminde ya da parolayla şifrelenmiş/);

    // Zip ama içinde belge yok
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bos.docx', mimeType: DOCX_MIME, buffer: zipStore({ 'a.txt': 'x' }) });
    await expect(page.locator('#error')).toBeVisible();
  });

  test('sayfa bütünlüğü: rozet, reklam konumu, ilgili araçlar', async ({ page }) => {
    await page.goto('/wordden-pdfe/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // Reklam, araç kutusunun dışında ve altında olmalı
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('.ba-related a[href="../pdf-birlestir/"]')).toBeVisible();
    // textContent: kapalı <details> içindeki SSS yanıtları da sayılır
    const words = (await page.locator('.ba-content').evaluate((el) => el.textContent || '')).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
  });
});
