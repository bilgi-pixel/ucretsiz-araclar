import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fx, trackExternalRequests } from './helpers';

// pdf-lib ile başlık/yazar/XMP yazılmış örnek PDF üretir.
async function makeMetaPdf(): Promise<Buffer> {
  const { PDFDocument, PDFName } = await import('pdf-lib');
  const doc = await PDFDocument.create();
  doc.addPage([300, 300]);
  doc.setTitle('Gizli Başlık Şğ');
  doc.setAuthor('Ayşe Yılmaz');
  doc.setSubject('Konu X');
  doc.setKeywords(['bir', 'iki']);
  const xmp = '<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>GizliYazarXMP</dc:creator></rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>';
  const stream = doc.context.stream(xmp, { Type: 'Metadata', Subtype: 'XML' });
  doc.catalog.set(PDFName.of('Metadata'), doc.context.register(stream));
  return Buffer.from(await doc.save());
}

test.describe('PDF Meta Veri Temizle', () => {
  test('başlık/yazar gösterilir; Tümünü temizle → alanlar ve XMP yok; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-meta-temizle/');
    await expect(page.locator('#actions')).toBeHidden();
    const src = await makeMetaPdf();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'meta.pdf', mimeType: 'application/pdf', buffer: src });
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#files li')).toContainText('1 sayfa');
    await expect(page.locator('#files input[data-field="Title"]')).toHaveValue('Gizli Başlık Şğ');
    await expect(page.locator('#files input[data-field="Author"]')).toHaveValue('Ayşe Yılmaz');
    await expect(page.locator('#files input[data-field="Keywords"]')).toHaveValue('bir iki');
    await expect(page.locator('#files li [data-xmp="1"]')).toBeVisible();

    await page.locator('#clear-all').click();
    await expect(page.locator('#files input[data-field="Title"]')).toHaveValue('');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    expect(dl.suggestedFilename()).toBe('meta-temiz.pdf');
    const out = readFileSync((await dl.path())!);

    const { PDFDocument, PDFName } = await import('pdf-lib');
    const doc = await PDFDocument.load(out, { updateMetadata: false });
    expect(doc.getTitle()).toBeUndefined();
    expect(doc.getAuthor()).toBeUndefined();
    expect(doc.getSubject()).toBeUndefined();
    expect(doc.getKeywords()).toBeUndefined();
    expect(doc.getCreator()).toBeUndefined();
    expect(doc.getProducer()).toBeUndefined();
    expect(doc.getCreationDate()).toBeUndefined();
    expect(doc.getModificationDate()).toBeUndefined();
    expect(doc.catalog.get(PDFName.of('Metadata'))).toBeUndefined();
    expect(out.toString('latin1')).not.toContain('GizliYazarXMP');
    expect(doc.getPageCount()).toBe(1);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('alan düzenleme + zorunlu başlık; XMP kutusu kapalıysa XMP kalır', async ({ page }) => {
    await page.goto('/pdf-meta-temizle/');
    const src = await makeMetaPdf();
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'a.pdf', mimeType: 'application/pdf', buffer: src });
    await page.locator('#files input[data-field="Author"]').fill('');
    await page.locator('#files input[data-field="Subject"]').fill('Yeni konu ğüşiöç');
    await page.locator('#opt-title').fill('Nötr Başlık');
    await page.locator('#opt-xmp').uncheck();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="0"]').click()]);
    const { PDFDocument, PDFName } = await import('pdf-lib');
    const doc = await PDFDocument.load(readFileSync((await dl.path())!), { updateMetadata: false });
    expect(doc.getTitle()).toBe('Nötr Başlık');
    expect(doc.getAuthor()).toBeUndefined();
    expect(doc.getSubject()).toBe('Yeni konu ğüşiöç');
    expect(doc.getCreator()).toBeDefined(); // dokunulmadı
    expect(doc.catalog.get(PDFName.of('Metadata'))).toBeDefined();
  });

  test('iki dosya toplu → iki ayrı indirme', async ({ page }) => {
    await page.goto('/pdf-meta-temizle/');
    await page.locator('#drop input[type=file]').setInputFiles([fx('iki-sayfa.pdf'), fx('uc-sayfa.pdf')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#clear-all').click();
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#downloads button[data-download]')).toHaveCount(2);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#downloads button[data-download="1"]').click()]);
    expect(dl.suggestedFilename()).toBe('uc-sayfa-temiz.pdf');
  });

  test('bozuk.pdf, sifreli.pdf ve PNG → Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/pdf-meta-temizle/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk ya da geçerli bir PDF değil/);
    await expect(page.locator('#actions')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText(/şifreli görünüyor|bozuk/);
    await expect(page.locator('#files li')).toHaveCount(0);
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
  });
});
