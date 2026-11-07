import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/alfabetik-sirala/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Alfabetik Sıralama (Türkçe)', () => {
  test('Türkçe alfabe: Ağaç, Armut, Çilek, Işık, İnci, Ömer, Şeker, Üzüm, Zeytin; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#input').fill('Zeytin\nÇilek\nArmut\nIşık\nİnci\nAğaç\nŞeker\nÖmer\nÜzüm');
    await page.getByRole('button', { name: 'Sırala' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#output')).toHaveValue('Ağaç\nArmut\nÇilek\nIşık\nİnci\nÖmer\nŞeker\nÜzüm\nZeytin');
    await expect(page.locator('#r-stats')).toContainText('9 satır sıralandı');
    expect(external).toEqual([]);
    noErrors();
  });

  test('ı / I / İ sırası ve ters (Z-A) sıralama', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('İzmir\nIşık\nıspanak\nIrmak\nİnci');
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('Irmak\nıspanak\nIşık\nİnci\nİzmir');
    await page.locator('#opt-desc').check();
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('İzmir\nİnci\nIşık\nıspanak\nIrmak');
  });

  test('yinelenenleri ve boş satırları siler (izmir = İzmir)', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Bursa\n\nizmir\n  Ankara  \nİzmir\nBursa\n');
    await page.locator('#opt-dedupe').check();
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('Ankara\nBursa\nizmir');
    await expect(page.locator('#r-stats')).toContainText('2 yinelenen satır silindi');
    await expect(page.locator('#r-stats')).toContainText('2 boş satır silindi');
  });

  test('sayısal sıralama ve satır uzunluğuna göre sıralama', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('ürün10\nürün2\nürün1');
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('ürün1\nürün10\nürün2');
    await page.locator('#opt-num').check();
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('ürün1\nürün2\nürün10');
    await page.locator('#input').fill('kedi\nat\nbalık');
    await page.locator('#mode').selectOption('len');
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('at\nkedi\nbalık');
    await page.locator('#mode').selectOption('rev');
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('balık\nat\nkedi');
  });

  test('Türkçe seçiliyken Ç ve Ş kendi yerinde: Cam, Çay, Su, Şeker', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('Şeker\nSu\nÇay\nCam');
    await page.locator('#lang').selectOption('tr');
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('Cam\nÇay\nSu\nŞeker');
    // İngilizce alfabede Ç, C ile; Ş, S ile birlikte değerlendirilir (Çay, Cam'dan önce ya da sonra gelebilir ama Su'dan önce kalır)
    await page.locator('#lang').selectOption('en');
    await page.locator('#sort').click();
    const en = (await page.locator('#output').inputValue()).split('\n');
    expect(en.slice(0, 2).sort()).toEqual(['Cam', 'Çay'].sort());
  });

  test('boş girişte Türkçe ve çözüm öneren hata; temizle çalışır', async ({ page }) => {
    await open(page);
    await page.locator('#sort').click();
    await expect(page.locator('#error')).toContainText('Sıralanacak metin boş');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#input').fill('b\na');
    await page.locator('#sort').click();
    await expect(page.locator('#output')).toHaveValue('a\nb');
    await page.locator('#clear').click();
    await expect(page.locator('#input')).toHaveValue('');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="alfabetik-sirala-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.map((t) => JSON.parse(t)['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await page.locator('#input').fill('Çok uzun bir satır '.repeat(20) + '\nb');
    await page.locator('#sort').click();
    await expect(page.locator('#result')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
