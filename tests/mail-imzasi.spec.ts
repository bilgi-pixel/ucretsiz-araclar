import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import { fx, trackExternalRequests } from './helpers';

// Panoya yazma/okuma izni: zengin kopyalama (ClipboardItem) testi için gerekir.
test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

// Sıkıştırılması zor, gürültülü bir PNG: "görsel büyük" uyarısını tetiklemek için.
function noisyPng(size: number): Buffer {
  const png = new PNG({ width: size, height: size });
  let seed = 12345;
  for (let i = 0; i < png.data.length; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    png.data[i] = i % 4 === 3 ? 255 : (seed >> 16) & 255;
  }
  return PNG.sync.write(png);
}

async function fillBasic(page: Page) {
  await page.locator('#f-name').fill('Ayşe Yılmaz');
  await page.locator('#f-title').fill('Pazarlama Müdürü');
  await page.locator('#f-company').fill('Örnek A.Ş.');
  await page.locator('#f-phone').fill('0412 000 00 00');
  await page.locator('#f-email').fill('ayse@ornek.com');
  await page.locator('#f-web').fill('ornek.com');
  await page.locator('#f-address').fill('Diyarbakır, Türkiye');
  await page.locator('#f-linkedin').fill('ayseyilmaz');
  await page.locator('#f-instagram').fill('@ornek');
  await page.locator('#f-x').fill('ornek');
  await page.locator('#f-whatsapp').fill('0542 000 00 00');
}

test.describe('E-posta İmzası Oluşturucu', () => {
  test('alanları doldurunca HTML çıktıda ad ve mailto olur; kopyala ve indir çalışır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/mail-imzasi/');
    // Boşken örnek önizleme var, çıktı boş.
    await expect(page.locator('#preview')).toContainText('Ayşe Yılmaz');
    await expect(page.locator('#out')).toHaveValue('');

    await fillBasic(page);
    const out = page.locator('#out');
    await expect(out).toHaveValue(/Ayşe Yılmaz/);
    await expect(out).toHaveValue(/href="mailto:ayse@ornek\.com"/);
    await expect(out).toHaveValue(/href="tel:\+904120000000"/);
    await expect(out).toHaveValue(/href="https:\/\/wa\.me\/905420000000"/);
    await expect(out).toHaveValue(/href="https:\/\/www\.linkedin\.com\/in\/ayseyilmaz"/);
    await expect(out).toHaveValue(/href="https:\/\/www\.instagram\.com\/ornek"/);
    await expect(out).toHaveValue(/href="https:\/\/x\.com\/ornek"/);
    await expect(out).toHaveValue(/width="600"/);
    await expect(out).toHaveValue(/^<table /);
    const html = await out.inputValue();
    expect(html).not.toMatch(/<script|<style|<link/i);
    await expect(page.locator('#preview')).toContainText('Ayşe Yılmaz');
    await expect(page.locator('#preview a[href="mailto:ayse@ornek.com"]')).toBeVisible();

    // Zengin imzayı kopyala: panoda text/html olmalı.
    await page.locator('#btn-rich').click();
    await expect(page.locator('#copied')).toContainText('Zengin imza kopyalandı');
    const clip = await page.evaluate(async () => {
      const items = await navigator.clipboard.read();
      const types = items[0].types;
      const h = await (await items[0].getType('text/html')).text();
      return { types, h };
    });
    expect(clip.types).toContain('text/html');
    expect(clip.h).toContain('Ayşe Yılmaz');
    expect(clip.h).toContain('mailto:ayse@ornek.com');

    // HTML kodunu kopyala
    await page.locator('#btn-code').click();
    await expect(page.locator('#copied')).toContainText('HTML kodu kopyalandı');
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain('<table');
    expect(text).toContain('mailto:ayse@ornek.com');

    // İndir
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-dl').click()]);
    expect(dl.suggestedFilename()).toBe('eposta-imzasi.html');
    const file = readFileSync((await dl.path())!, 'utf8');
    expect(file).toContain('<meta charset="utf-8">');
    expect(file).toContain('Ayşe Yılmaz');
    expect(file).toContain('mailto:ayse@ornek.com');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('altı düzenin hepsi farklı, tablo tabanlı ve güvenli kod üretir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/mail-imzasi/');
    await fillBasic(page);
    const seen = new Set<string>();
    for (const layout of ['sade', 'cizgili', 'iki-sutun', 'kartvizit', 'bordo', 'koyu']) {
      await page.locator('#f-layout').selectOption(layout);
      const html = await page.locator('#out').inputValue();
      expect(html, layout).toContain('Ayşe Yılmaz');
      expect(html, layout).toContain('mailto:ayse@ornek.com');
      expect(html, layout).toMatch(/^<table [^>]*width="600"/);
      expect(html, layout).not.toMatch(/<script|<style|javascript:/i);
      seen.add(html);
    }
    expect(seen.size).toBe(6);
    // Koyu düzen: Outlook için bgcolor özniteliği de yazılır.
    expect(await page.locator('#out').inputValue()).toContain('bgcolor="#1f2226"');
    // Bordo vurgu: renk değişince bant rengi değişir.
    await page.locator('#f-layout').selectOption('bordo');
    await page.locator('#f-accent').fill('#0b5394');
    await expect(page.locator('#out')).toHaveValue(/bgcolor="#0b5394"/);
    // Yazı tipi ve boyutu satır içi yazılır.
    await page.locator('#f-font').selectOption('georgia');
    await page.locator('#f-size').selectOption('16');
    await expect(page.locator('#out')).toHaveValue(/font-family:Georgia[^;]*;font-size:16px/);
    expect(external).toEqual([]);
  });

  test('tehlikeli girdi kaçırılır; geçersiz e-posta ve adres uyarı verir', async ({ page }) => {
    await page.goto('/mail-imzasi/');
    await page.locator('#f-name').fill('<img src=x onerror=alert(1)>');
    await page.locator('#f-email').fill('ayse@');
    await page.locator('#f-web').fill('javascript:alert(1)');
    await page.locator('#f-linkedin').fill('ali veli');
    const html = await page.locator('#out').inputValue();
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).not.toContain('<img src=x');
    expect(html).not.toContain('mailto:');
    expect(html).not.toContain('href="javascript:');
    await expect(page.locator('#preview img')).toHaveCount(0);
    const warns = page.locator('#warns');
    await expect(warns).toContainText('E-posta adresi geçersiz');
    await expect(warns).toContainText('ad@ornek.com');
    await expect(warns).toContainText('Web adresi anlaşılamadı');
    await expect(warns).toContainText('LinkedIn bağlantısı anlaşılamadı');
  });

  test('boşken kopyalama anlaşılır hata verir', async ({ page }) => {
    await page.goto('/mail-imzasi/');
    await page.locator('#btn-rich').click();
    await expect(page.locator('#error')).toContainText('Önce en az adınızı');
    await page.locator('#btn-dl').click();
    await expect(page.locator('#error')).toContainText('Önce en az adınızı');
  });

  test('bilgisayardan seçilen görsel küçültülüp data URI olarak gömülür; büyükse uyarır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/mail-imzasi/');
    await page.locator('#f-name').fill('Ayşe Yılmaz');
    await page.locator('#f-img-src').selectOption('file');
    await page.locator('#f-img-file').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#img-name')).toHaveText('fotoğraf-ş.png');
    await expect(page.locator('#out')).toHaveValue(/<img src="data:image\/png;base64,/);
    await expect(page.locator('#img-info')).toContainText('piksel');
    await expect(page.locator('#preview img')).toHaveCount(1);
    await expect(page.locator('#img-info')).not.toHaveClass(/is-warn/);

    // Büyük, gürültülü görsel: "küçük tutun" uyarısı.
    await page.locator('#f-img-w').fill('300');
    await page.locator('#f-img-file').setInputFiles({ name: 'gurultu.png', mimeType: 'image/png', buffer: noisyPng(400) });
    await expect(page.locator('#img-info')).toHaveClass(/is-warn/);
    await expect(page.locator('#img-info')).toContainText('Görsel büyük');
    // Yuvarlak kırp
    await page.locator('#f-img-round').check();
    await expect(page.locator('#out')).toHaveValue(/border-radius:50%/);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('bozuk görsel dosyası Türkçe hata verir ve imzaya girmez', async ({ page }) => {
    await page.goto('/mail-imzasi/');
    await page.locator('#f-name').fill('Ayşe Yılmaz');
    await page.locator('#f-img-src').selectOption('file');
    await page.locator('#f-img-file').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu bir png degil') });
    await expect(page.locator('#error')).toContainText('Görsel okunamadı');
    await expect(page.locator('#error')).toContainText('PNG, JPG veya WebP');
    await expect(page.locator('#out')).not.toHaveValue(/data:image/);
    // Görsel olmayan dosya
    await page.locator('#f-img-file').setInputFiles({ name: 'not.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba') });
    await expect(page.locator('#error')).toContainText('görsel değil');
  });

  test('görsel web adresi çıktıya yazılır ama önizlemede yüklenmez (dış istek yok)', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/mail-imzasi/');
    await page.locator('#f-name').fill('Ayşe Yılmaz');
    await page.locator('#f-img-src').selectOption('url');
    await page.locator('#f-img-url').fill('https://ornek.com/logo.png');
    await expect(page.locator('#out')).toHaveValue(/<img src="https:\/\/ornek\.com\/logo\.png"/);
    await expect(page.locator('#preview img')).toHaveAttribute('src', /^data:image\/svg\+xml/);
    await page.locator('#f-img-url').fill('http://ornek.com/logo.png');
    await expect(page.locator('#warns')).toContainText('https:// adresi kullanın');
    await page.locator('#f-img-url').fill('javascript:alert(1)');
    await expect(page.locator('#warns')).toContainText('Görsel adresi geçersiz');
    await expect(page.locator('#out')).not.toHaveValue(/<img/);
    expect(external).toEqual([]);
  });

  test('açık renkli vurgu rengi kontrast uyarısı verir', async ({ page }) => {
    await page.goto('/mail-imzasi/');
    await page.locator('#f-name').fill('Ayşe');
    await page.locator('#f-accent').fill('#ffee88');
    await expect(page.locator('#warns')).toContainText('zor okunur');
    await page.locator('#f-layout').selectOption('koyu');
    await expect(page.locator('#warns')).not.toContainText('zor okunur');
  });
});
