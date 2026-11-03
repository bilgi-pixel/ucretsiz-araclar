import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

async function readPdfText(page: Page, buf: Buffer): Promise<string> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const pdfjs = await import('/vendor/pdfjs-dist@4.10.38/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs-dist@4.10.38/pdf.worker.min.mjs';
    const d = await pdfjs.getDocument({ data }).promise;
    let out = '';
    for (let i = 1; i <= d.numPages; i++) {
      const c = await (await d.getPage(i)).getTextContent();
      out += c.items.map((it: any) => it.str).join(' ') + '\n';
    }
    return out;
  }, buf.toString('base64'));
}

async function readDocxXml(page: Page, buf: Buffer): Promise<{ xml: string; files: string[] }> {
  return page.evaluate(async (b64) => {
    const bin = atob(b64); const data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    const fflate = await import('/vendor/fflate@0.8.3/fflate.browser.mjs');
    const files = fflate.unzipSync(data);
    return { xml: new TextDecoder().decode(files['word/document.xml']), files: Object.keys(files) };
  }, buf.toString('base64'));
}

const norm = (s: string) => s.replace(/\s+/g, ' ');

async function download(page: Page, btn: string): Promise<Buffer> {
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator(btn).click()]);
  return readFileSync((await dl.path())!);
}

async function fillKonut(page: Page) {
  await page.locator('#f-template').selectOption('konut-kira');
  await page.locator('#pp-name-0').fill('Gökçe İşler');
  await page.locator('#pp-name-1').fill('Şükran Öztürk Çelik');
  await page.locator('#fld-adres').fill('Bağlar Mah. Çınar Sok. No: 5 Diyarbakır');
  await page.locator('#fld-kira').fill('15.000 TL');
}

test.describe('Sözleşme Örneği Oluşturucu', () => {
  test('konut kira: PDF ve DOCX iner; taraf adı, Türkçe karakter, not; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/sozlesme-olustur/');
    await expect(page.locator('.ba-note').first()).toContainText('ukuki tavsiye değildir');
    await fillKonut(page);
    await expect(page.locator('#tpl-note')).toContainText('emredici');
    // Kefil isteğe bağlı: işaretlenince kişi ve madde eklenir
    await page.locator('#opt-kefil').check();
    await expect(page.locator('.pp-row')).toHaveCount(3);
    await page.locator('#pp-name-2').fill('Ömer Çağlar Yılmaz');
    await page.locator('#w-0').fill('Işık Üstün');
    await expect(page.locator('#preview')).toContainText('KONUT KİRA SÖZLEŞMESİ');
    await expect(page.locator('#preview')).toContainText('Ömer Çağlar Yılmaz');

    const pdf = await download(page, '#make-pdf');
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(pdf);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(2);
    expect(Math.round(doc.getPage(0).getSize().height)).toBe(842);
    const text = norm(await readPdfText(page, pdf));
    expect(text).toContain('KONUT KİRA SÖZLEŞMESİ');
    expect(text).toContain('Gökçe İşler');
    expect(text).toContain('Şükran Öztürk Çelik');
    expect(text).toContain('Ömer Çağlar Yılmaz');
    expect(text).toContain('Işık Üstün');
    expect(text).toContain('MADDE 1');
    expect(text).toContain('İMZALAR');
    expect(text).toContain('Demirbaş Listesi');
    expect(text).toContain('hukuki tavsiye değildir');
    expect(text).toContain('Sayfa 1 /');
    await expect(page.locator('#result-info')).toContainText('köşeli parantezli');

    const dbuf = await download(page, '#make-docx');
    expect(dbuf.subarray(0, 2).toString()).toBe('PK');
    const { xml, files } = await readDocxXml(page, dbuf);
    expect(files).toContain('word/document.xml');
    expect(xml).toContain('Şükran Öztürk Çelik');
    expect(xml).toContain('Gökçe İşler');
    expect(xml).toContain('hukuki tavsiye değildir');
    expect(files.some((f) => f.startsWith('word/footer'))).toBe(true);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('madde ekle ve sil: önizleme ve PDF güncellenir', async ({ page }) => {
    await page.goto('/sozlesme-olustur/');
    await fillKonut(page);
    const rows = page.locator('.cl-row');
    const n = await rows.count();
    expect(n).toBeGreaterThanOrEqual(10);
    await page.locator('#add-clause').click();
    await expect(rows).toHaveCount(n + 1);
    await rows.last().locator('.cl-h').fill('Özel Şart');
    await rows.last().locator('.cl-x').fill('Evcil hayvan beslemek için yazılı izin gerekir: çğıöşü.');
    await expect(page.locator('#preview')).toContainText(`MADDE ${n + 1} – Özel Şart`);
    const pdf = await download(page, '#make-pdf');
    const text = norm(await readPdfText(page, pdf));
    expect(text).toContain(`MADDE ${n + 1} – Özel Şart`);
    expect(text).toContain('Evcil hayvan');
    await rows.last().locator('.cl-del').click();
    await expect(rows).toHaveCount(n);
    await expect(page.locator('#preview')).not.toContainText('Özel Şart');
  });

  test('araç satışı şablonu noter notunu ekranda ve çıktıda gösterir', async ({ page }) => {
    await page.goto('/sozlesme-olustur/');
    await page.locator('#f-template').selectOption('arac-satis');
    await expect(page.locator('#tpl-note')).toContainText('noterde yapılır');
    await expect(page.locator('#tpl-note')).toContainText('ön protokol');
    await page.locator('#pp-name-0').fill('Gülşen Ağaoğlu');
    await page.locator('#pp-name-1').fill('İbrahim Öncü');
    await page.locator('#fld-plaka').fill('[plaka]');
    await page.locator('#fld-marka_model').fill('Örnek Marka Model');
    await page.locator('#fld-bedel').fill('850.000 TL');
    const pdf = await download(page, '#make-pdf');
    const text = norm(await readPdfText(page, pdf));
    expect(text).toContain('ÖN PROTOKOL');
    expect(text).toContain('Araç satışı noterde yapılır');
    expect(text).toContain('İbrahim Öncü');
  });

  test('zorunlu alan boşsa Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/sozlesme-olustur/');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('Önce bir şablon seçin');
    await page.locator('#f-template').selectOption('konut-kira');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('adresi" alanı boş');
    await page.locator('#fld-adres').fill('Test Mah. 1. Sok. No: 1');
    await page.locator('#make-docx').click();
    await expect(page.locator('#error')).toContainText('Aylık kira bedeli');
    await page.locator('#fld-kira').fill('10.000 TL');
    await page.locator('#make-pdf').click();
    await expect(page.locator('#error')).toContainText('KİRAYA VEREN adı soyadı boş');
  });

  test('maddeler düzenlendiyse şablon değişimi onay ister', async ({ page }) => {
    await page.goto('/sozlesme-olustur/');
    await page.locator('#f-template').selectOption('konut-kira');
    await page.locator('.cl-row').first().locator('.cl-x').fill('Kendi yazdığım madde.');
    await page.locator('#f-template').selectOption('hizmet-freelance');
    await expect(page.locator('#tpl-force')).toBeVisible();
    await expect(page.locator('#f-template')).toHaveValue('konut-kira');
    await page.locator('#tpl-force').click();
    await expect(page.locator('#f-template')).toHaveValue('hizmet-freelance');
    await expect(page.locator('#preview')).toContainText('HİZMET (FREELANCE) SÖZLEŞMESİ');
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/sozlesme-olustur/');
    await page.locator('#f-template').selectOption('konut-kira');
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(over).toBeLessThanOrEqual(1);
  });
});
