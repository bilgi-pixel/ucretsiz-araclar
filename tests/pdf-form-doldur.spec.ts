import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';

/** Metin, çok satırlı metin, onay kutusu, radyo ve açılır liste içeren form üretir. */
async function makeForm(): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 500]);
  const form = doc.getForm();
  const name = form.createTextField('ad_soyad');
  name.addToPage(page, { x: 40, y: 430, width: 200, height: 24 });
  const note = form.createTextField('not');
  note.enableMultiline();
  note.addToPage(page, { x: 40, y: 340, width: 250, height: 60 });
  const ok = form.createCheckBox('kabul');
  ok.addToPage(page, { x: 40, y: 300, width: 18, height: 18 });
  const city = form.createDropdown('sehir');
  city.addOptions(['İstanbul', 'Diyarbakır', 'Şanlıurfa']);
  city.addToPage(page, { x: 40, y: 250, width: 160, height: 24 });
  const pref = form.createRadioGroup('tercih');
  pref.addOptionToPage('Evet', page, { x: 40, y: 200, width: 16, height: 16 });
  pref.addOptionToPage('Hayır', page, { x: 100, y: 200, width: 16, height: 16 });
  return Buffer.from(await doc.save());
}

/** Çıktı PDF'inden pdf.js ile görünen metni çıkarır (sayfa içinde, vendor kopyasıyla). */
async function pageText(page: import('@playwright/test').Page, bytes: number[]): Promise<string> {
  return page.evaluate(async (arr) => {
    const base = new URL('/vendor/pdfjs-dist@4.10.38/', location.href).href;
    const pdfjs: any = await import(`${base}pdf.min.mjs`);
    pdfjs.GlobalWorkerOptions.workerSrc = `${base}pdf.worker.min.mjs`;
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(arr) }).promise;
    const p = await pdf.getPage(1);
    const tc = await p.getTextContent();
    return tc.items.map((i: any) => i.str).join(' ');
  }, bytes);
}

test.describe('PDF Form Doldur', () => {
  test('alanlar listelenir, doldurulur; değerler okunur (alanlar kalır)', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-form-doldur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'form.pdf', mimeType: 'application/pdf', buffer: await makeForm() });
    await expect(page.locator('#file-meta')).toContainText('5 doldurulabilir alan');
    await expect(page.locator('#fields .pf-field')).toHaveCount(5);
    await page.locator('#pf-0').fill('Çağlar Öztürk');
    await page.locator('#pf-1').fill('Satır bir\nSatır iki');
    await page.locator('#fields .pf-field[data-idx="2"] input[type=checkbox]').check();
    await page.locator('#pf-3').selectOption('Diyarbakır');
    await page.locator('#fields .pf-field[data-idx="4"] input[value="Hayır"]').check();
    await expect(page.locator('#preview')).toBeVisible();
    await page.locator('#run').click();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('form-doldurulmus.pdf');
    const out = readFileSync((await dl.path())!);
    const doc = await PDFDocument.load(out);
    const f = doc.getForm();
    expect(f.getFields().length).toBe(5);
    expect(f.getTextField('ad_soyad').getText()).toBe('Çağlar Öztürk');
    expect(f.getTextField('not').getText()).toBe('Satır bir\nSatır iki');
    expect(f.getCheckBox('kabul').isChecked()).toBe(true);
    expect(f.getDropdown('sehir').getSelected()).toEqual(['Diyarbakır']);
    expect(f.getRadioGroup('tercih').getSelected()).toBe('Hayır');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kilitle (flatten): alan kalmaz, Türkçe metin görünür', async ({ page }) => {
    await page.goto('/pdf-form-doldur/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'form.pdf', mimeType: 'application/pdf', buffer: await makeForm() });
    await expect(page.locator('#fields .pf-field')).toHaveCount(5);
    await page.locator('#pf-0').fill('Çağlar Öztürk');
    await page.locator('#pf-3').selectOption('Şanlıurfa');
    await page.locator('#opt-flatten').check();
    await page.locator('#run').click();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const out = readFileSync((await dl.path())!);
    const doc = await PDFDocument.load(out);
    expect(doc.getForm().getFields().length).toBe(0);
    const text = await pageText(page, Array.from(out));
    expect(text).toContain('Çağlar Öztürk');
    expect(text).toContain('Şanlıurfa');
  });

  test('form alanı olmayan PDF yönlendirir; şifreli ve bozuk dosya Türkçe uyarır', async ({ page }) => {
    await page.goto('/pdf-form-doldur/');
    const input = page.locator('#drop input[type=file]');
    await input.setInputFiles(fx('iki-sayfa.pdf'));
    await expect(page.locator('#error')).toContainText('form alanı yok');
    await expect(page.locator('#no-fields')).toBeVisible();
    await expect(page.locator('#no-fields a[href="../pdf-imzala/"]')).toBeVisible();
    await input.setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#error')).toContainText('şifreli');
    await expect(page.locator('#no-fields')).toBeHidden();
    await input.setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText('bozuk');
    await expect(page.locator('#editor')).toBeHidden();
  });
});
