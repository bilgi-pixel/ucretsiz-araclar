import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Sayıyı Yazıya Çevir', () => {
  test('1234,50 → para yazısı (okunur + çek biçimi), kopyala, geçmiş, dış istek yok', async ({ page, context }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/sayi-yaziya-cevir/');
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '0');

    await page.locator('#amount').fill('1234,50');
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#formatted')).toHaveText('1.234,50 TL');
    await expect(page.locator('#out-readable')).toHaveText('bin iki yüz otuz dört Türk lirası elli kuruş');
    await expect(page.locator('#out-check')).toHaveText('YalnızBinİkiYüzOtuzDörtTL,ElliKr');

    await page.locator('#opt-yalniz').uncheck();
    await expect(page.locator('#out-check')).toHaveText('BinİkiYüzOtuzDörtTL,ElliKr');
    await page.locator('#opt-hash').check();
    await expect(page.locator('#out-check')).toHaveText('#BinİkiYüzOtuzDörtTL,ElliKr#');

    // Döviz
    await page.locator('#currency').selectOption('USD');
    await expect(page.locator('#out-readable')).toHaveText('bin iki yüz otuz dört dolar elli sent');
    await expect(page.locator('#out-check')).toHaveText('#BinİkiYüzOtuzDörtUSD,ElliSent#');

    // Büyük harf
    await page.locator('#case').selectOption('upper');
    await expect(page.locator('#out-readable')).toHaveText('BİN İKİ YÜZ OTUZ DÖRT DOLAR ELLİ SENT');

    // Kopyala
    await page.locator('[data-copy="out-readable"]').click();
    await expect(page.locator('#copy-status')).toHaveText('Kopyalandı.');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toBe('BİN İKİ YÜZ OTUZ DÖRT DOLAR ELLİ SENT');

    // Geçmiş (bellekte, en fazla 5)
    await expect(page.locator('#history-wrap')).toBeVisible();
    for (const v of ['1', '2', '3', '4', '5', '6']) {
      await page.locator('#amount').fill(v);
      await page.locator('#amount').press('Enter');
    }
    await expect(page.locator('#history li')).toHaveCount(5);
    await expect(page.locator('#history li').first()).toContainText('6');
    expect(await page.evaluate(() => localStorage.length)).toBe(0);

    expect(external).toEqual([]);
    noErrors();
  });

  test('düz sayı ve sıra sayısı: 1000000 → bir milyon, 100 → yüz, 2026 → iki bin yirmi altıncı', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/sayi-yaziya-cevir/');
    await page.getByLabel('Düz sayı', { exact: true }).check();
    await expect(page.locator('#money-options')).toBeHidden();
    const cases: [string, string][] = [
      ['1000000', 'bir milyon'],
      ['100', 'yüz'],
      ['1000', 'bin'],
      ['1.234,50', 'bin iki yüz otuz dört virgül elli'],
      ['1,234.50', 'bin iki yüz otuz dört virgül elli'],
      ['-15,75', 'eksi on beş virgül yetmiş beş'],
      ['0,05', 'sıfır virgül sıfır beş'],
      ['1000000000000000', 'bir katrilyon'],
      ['0', 'sıfır'],
    ];
    for (const [input, expected] of cases) {
      await page.locator('#amount').fill(input);
      await expect(page.locator('#out-main')).toHaveText(expected);
    }
    await expect(page.locator('#row-readable')).toBeHidden();
    await expect(page.locator('#row-check')).toBeHidden();

    await page.locator('#amount').fill('2026');
    await page.getByLabel('Sıra sayısı', { exact: false }).check();
    await expect(page.locator('#out-main')).toHaveText('iki bin yirmi altıncı');
    await page.locator('#case').selectOption('title');
    await expect(page.locator('#out-main')).toHaveText('İki Bin Yirmi Altıncı');
    await page.locator('#amount').fill('2,5');
    await expect(page.locator('#error')).toContainText('Sıra sayısı yalnızca tam sayılar');
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '0');
    noErrors();
  });

  test('harf / boş / çok büyük girişte Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/sayi-yaziya-cevir/');
    await page.locator('#amount').fill('abc');
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Yalnızca rakam girin');
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '0');

    await page.locator('#amount').fill('12a3');
    await expect(page.locator('#error')).toContainText('rakam');

    await page.locator('#amount').fill('1234567890123456789');
    await expect(page.locator('#error')).toContainText('999 katrilyon');

    await page.locator('#amount').fill('');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result')).toHaveAttribute('data-ready', '0');

    // Negatif tutar: okunur biçim gösterilir, çek biçimi için uyarı
    await page.locator('#amount').fill('-250');
    await expect(page.locator('#out-readable')).toHaveText('eksi iki yüz elli Türk lirası');
    await expect(page.locator('#row-check')).toBeHidden();
    await expect(page.locator('#error')).toContainText('negatif olamaz');
  });

  test('yazıdan sayıya: düz, çek biçimi ve bilinmeyen kelime', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/sayi-yaziya-cevir/');
    const inp = page.locator('#words-input');
    await inp.fill('bin iki yüz otuz dört Türk lirası elli kuruş');
    await expect(page.locator('#words-out')).toHaveText('1.234,50');
    await inp.fill('YalnızBinİkiYüzOtuzDörtTL,ElliKr');
    await expect(page.locator('#words-out')).toHaveText('1.234,50');
    await inp.fill('bir milyon');
    await expect(page.locator('#words-out')).toHaveText('1.000.000');
    await inp.fill('eksi on beş virgül yetmiş beş');
    await expect(page.locator('#words-out')).toHaveText('-15,75');
    await inp.fill('yüz elma');
    await expect(page.locator('#words-error')).toContainText('"elma" tanınan bir sayı kelimesi değil');
    await expect(page.locator('#row-words')).toBeHidden();
    expect(external).toEqual([]);
  });

  test('sayfa yapısı: rozet, reklam alanları buton yanında değil, içerik ≥ 800 kelime, SSS ≥ 6', async ({ page }) => {
    await page.goto('/sayi-yaziya-cevir/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/sayi-yaziya-cevir/');
  });
});
