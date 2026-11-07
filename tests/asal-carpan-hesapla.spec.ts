import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/asal-carpan-hesapla/';

async function open(page) {
  await page.goto(URL);
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden form gönderilmesin
}

test.describe('Asal Çarpanlara Ayırma', () => {
  test('360 → 2^3 × 3^2 × 5, 24 bölen, toplam 1.170, φ=96; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await page.locator('#n').fill('360');
    await page.getByRole('button', { name: 'Hesapla' }).click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#r-big')).toHaveText('360 asal sayı değildir (bileşik sayı).');
    await expect(page.locator('#r-factors')).toHaveText('2^3 × 3^2 × 5');
    await expect(page.locator('#r-count')).toHaveText('24');
    await expect(page.locator('#r-sum')).toHaveText('1.170');
    await expect(page.locator('#r-phi')).toHaveText('96');
    await expect(page.locator('#r-prev')).toHaveText('359');
    await expect(page.locator('#r-next')).toHaveText('367');
    await expect(page.locator('#r-divs')).toHaveText('1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360');
    expect(external).toEqual([]);
    noErrors();
  });

  test('97 asal sayıdır; Enter tuşuyla da hesaplanır', async ({ page }) => {
    await open(page);
    await page.locator('#n').fill('97');
    await page.locator('#n').press('Enter');
    await expect(page.locator('#r-big')).toHaveText('97 bir asal sayıdır.');
    await expect(page.locator('#r-count')).toHaveText('2');
    await expect(page.locator('#r-prev')).toHaveText('89');
    await expect(page.locator('#r-next')).toHaveText('101');
  });

  test('1 asal değildir; büyük asal 999.999.937 tanınır', async ({ page }) => {
    await open(page);
    await page.locator('#n').fill('1');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toContainText('1 asal sayı değildir');
    await expect(page.locator('#r-prev')).toHaveText('yok');
    await page.locator('#n').fill('999999937');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toHaveText('999.999.937 bir asal sayıdır.');
    await expect(page.locator('#r-next')).toHaveText('1.000.000.007');
  });

  test('binlik noktalı giriş: 1.000.000 → 2^6 × 5^6, 49 bölen', async ({ page }) => {
    await open(page);
    await page.locator('#n').fill('1.000.000');
    await page.locator('#calc').click();
    await expect(page.locator('#r-factors')).toHaveText('2^6 × 5^6');
    await expect(page.locator('#r-count')).toHaveText('49');
  });

  test('aralıktaki asallar: 10–50 arası 11 asal', async ({ page }) => {
    await open(page);
    await page.locator('#from').fill('10');
    await page.locator('#to').fill('50');
    await page.getByRole('button', { name: 'Asalları listele' }).click();
    await expect(page.locator('#range-result')).toBeVisible();
    await expect(page.locator('#range-count')).toHaveText('10 – 50 aralığında 11 asal sayı var.');
    await expect(page.locator('#range-list')).toHaveText('11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47');
    await page.locator('#from').fill('');
    await page.locator('#to').fill('100');
    await page.locator('#range-calc').click();
    await expect(page.locator('#range-count')).toContainText('25 asal sayı');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    const err = page.locator('#error');
    await page.locator('#calc').click();
    await expect(err).toContainText('Bir sayı girin');
    await page.locator('#n').fill('abc');
    await page.locator('#calc').click();
    await expect(err).toContainText('Yalnızca rakam girin');
    await page.locator('#n').fill('-12');
    await page.locator('#calc').click();
    await expect(err).toContainText('Pozitif bir tam sayı girin');
    await page.locator('#n').fill('1000000000000000');
    await page.locator('#calc').click();
    await expect(err).toContainText('Sayı çok büyük');
    await page.locator('#n').fill('0');
    await page.locator('#calc').click();
    await expect(err).toContainText('1 ya da daha büyük');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#to').fill('2000000');
    await page.locator('#range-calc').click();
    await expect(page.locator('#range-error')).toContainText('en fazla 1.000.000');
    await page.locator('#from').fill('50');
    await page.locator('#to').fill('10');
    await page.locator('#range-calc').click();
    await expect(page.locator('#range-error')).toContainText('Başlangıç, bitişten büyük olamaz');
  });

  test('içerik: ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="asal-carpan-hesapla-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ld.map((t) => JSON.parse(t)['@type']);
    expect(types).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    await page.locator('#n').fill('999999999999989');
    await page.locator('#calc').click();
    await expect(page.locator('#r-big')).toContainText('bir asal sayıdır');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
