import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const val = (page: Page, key: string) => page.locator(`#r-rows [data-k="${key}"] dd`);

async function setMode(page: Page, mode: 'lin' | 'quad' | 'sys') {
  await page.locator(`input[name="mode"][value="${mode}"]`).check();
}

test.describe('Denklem Çözücü', () => {
  test('1. derece: 2x + 3 = 11 → x = 4, adım adım çözüm, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/denklem-cozucu/');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-a').fill('2');
    await page.locator('#f-b').fill('3');
    await page.locator('#f-c').fill('11');
    await expect(val(page, 'x')).toHaveText('4');
    await expect(page.locator('#eq-preview')).toHaveText('2x + 3 = 11');
    await expect(page.locator('#steps')).toContainText('2x = c - b = 11 - 3 = 8');
    await expect(page.locator('#steps')).toContainText('Doğrulama');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Türkçe ondalık ve kesir girişi: 0,5x + 1 = 3 ve 1/2x', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await page.locator('#f-a').fill('0,5');
    await page.locator('#f-b').fill('1');
    await page.locator('#f-c').fill('3');
    await expect(val(page, 'x')).toHaveText('4');
    await page.locator('#f-a').fill('1/2');
    await expect(val(page, 'x')).toHaveText('4');
    await page.locator('#f-a').fill('3');
    await page.locator('#f-b').fill('0');
    await page.locator('#f-c').fill('1');
    await expect(val(page, 'x')).toContainText('1/3');
    await expect(val(page, 'x')).toContainText('0,333333');
  });

  test('1. derece: a = 0 iken sonsuz çözüm ve çözüm yok durumları', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await page.locator('#f-a').fill('0');
    await page.locator('#f-b').fill('3');
    await page.locator('#f-c').fill('3');
    await expect(val(page, 'sol')).toContainText('Sonsuz çözüm');
    await page.locator('#f-c').fill('4');
    await expect(val(page, 'sol')).toContainText('Çözüm yok');
  });

  test('2. derece: x² − 5x + 6 = 0 → 2 ve 3, toplam, çarpım, tepe noktası, grafik çizilir', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await setMode(page, 'quad');
    await page.locator('#f-a').fill('1');
    await page.locator('#f-b').fill('-5');
    await page.locator('#f-c').fill('6');
    await expect(val(page, 'delta')).toHaveText('1');
    await expect(val(page, 'x1')).toHaveText('2');
    await expect(val(page, 'x2')).toHaveText('3');
    await expect(val(page, 'sum')).toHaveText('5');
    await expect(val(page, 'prod')).toHaveText('6');
    await expect(val(page, 'vertex')).toHaveText('(2,5; -0,25)');
    await expect(page.locator('#eq-preview')).toHaveText('x² - 5x + 6 = 0');
    await expect(page.locator('#steps')).toContainText('Δ = b² - 4ac = (-5)² - 4 · 1 · 6 = 25 - 24 = 1');
    await expect(page.locator('#graph')).toBeVisible();
    // Canvas'ta tema renginde (bordo) çizgi pikselleri olmalı
    const inked = await page.locator('#graph').evaluate((c: HTMLCanvasElement) => {
      const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - 123) < 25 && Math.abs(d[i + 1] - 35) < 25 && Math.abs(d[i + 2] - 49) < 25) n++;
      return n;
    });
    expect(inked).toBeGreaterThan(100);
    await expect(page.locator('#graph')).toHaveAttribute('aria-label', /parabol/);
  });

  test('2. derece: diskriminant negatif → karmaşık kökler; irrasyonel ve çift kök', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await setMode(page, 'quad');
    await page.locator('#f-a').fill('1');
    await page.locator('#f-b').fill('2');
    await page.locator('#f-c').fill('5');
    await expect(val(page, 'delta')).toHaveText('-16');
    await expect(val(page, 'type')).toContainText('Karmaşık');
    await expect(val(page, 'x1')).toHaveText('-1 + 2i');
    await expect(val(page, 'x2')).toHaveText('-1 - 2i');
    await expect(page.locator('#steps')).toContainText('i² = -1');
    // x² − 2 = 0 → ±√2
    await page.locator('#f-b').fill('0');
    await page.locator('#f-c').fill('-2');
    await expect(val(page, 'x1')).toContainText('-√2');
    await expect(val(page, 'x2')).toContainText('1,414214');
    // x² − 2x + 1 = 0 → çift kök
    await page.locator('#f-b').fill('-2');
    await page.locator('#f-c').fill('1');
    await expect(val(page, 'type')).toContainText('Çakışık');
    await expect(val(page, 'x1')).toHaveText('1');
    await expect(page.locator('#r-rows [data-k="x2"]')).toHaveCount(0);
  });

  test('sistem: 2x + 3y = 12, x − y = 1 → x = 3, y = 2 (Cramer ve yok etme)', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await setMode(page, 'sys');
    const vals: Record<string, string> = { a1: '2', b1: '3', c1: '12', a2: '1', b2: '-1', c2: '1' };
    for (const [k, v] of Object.entries(vals)) await page.locator(`#f-${k}`).fill(v);
    await expect(val(page, 'x')).toHaveText('3');
    await expect(val(page, 'y')).toHaveText('2');
    await expect(val(page, 'D')).toHaveText('-5');
    await expect(val(page, 'Dx')).toHaveText('-15');
    await expect(val(page, 'Dy')).toHaveText('-10');
    await expect(page.locator('#graph-wrap')).toBeVisible();
    await page.locator('#method').selectOption('yoketme');
    await expect(val(page, 'x')).toHaveText('3');
    await expect(val(page, 'y')).toHaveText('2');
    await expect(page.locator('#steps')).toContainText('yok etmek için');
    await expect(page.locator('#r-rows [data-k="D"]')).toHaveCount(0);
  });

  test('sistem: paralel doğrular çözümsüz, çakışık doğrular sonsuz çözümlü', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await setMode(page, 'sys');
    const fill = async (v: string[]) => {
      for (const [i, k] of ['a1', 'b1', 'c1', 'a2', 'b2', 'c2'].entries()) await page.locator(`#f-${k}`).fill(v[i]);
    };
    await fill(['1', '1', '1', '1', '1', '2']);
    await expect(val(page, 'sol')).toContainText('Çözüm yok');
    await fill(['1', '1', '1', '2', '2', '2']);
    await expect(val(page, 'sol')).toContainText('Sonsuz çözüm');
  });

  test('örnek düğmesi modu değiştirir ve doldurur; kopyala çalışır', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await page.getByRole('button', { name: 'x² − 5x + 6 = 0' }).click();
    await expect(page.locator('input[name="mode"][value="quad"]')).toBeChecked();
    await expect(page.locator('#f-b')).toHaveValue('-5');
    await expect(val(page, 'x2')).toHaveText('3');
    await page.locator('#copy').click();
    await expect(page.locator('#copy-status')).not.toHaveText('');
  });

  test('hatalı giriş: harf, a = 0 (2. derece), sıfır paydalı kesir için Türkçe hata', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    await page.locator('#f-a').fill('abc');
    await expect(page.locator('#error')).toContainText('geçerli bir sayı değil');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-a').fill('1/0');
    await expect(page.locator('#error')).toContainText('paydası sıfır olamaz');
    await setMode(page, 'quad');
    await page.locator('#f-a').fill('0');
    await page.locator('#f-b').fill('2');
    await page.locator('#f-c').fill('1');
    await expect(page.locator('#error')).toContainText('a katsayısı sıfır olamaz');
    await expect(page.locator('#error')).toContainText('1. derece');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#f-a').fill('1');
    await expect(page.locator('#error')).toBeHidden();
    await expect(val(page, 'delta')).toHaveText('0');
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı, SSS ≥7', async ({ page }) => {
    await page.goto('/denklem-cozucu/');
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="denklem-cozucu-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
  });

  test('360 piksel genişlikte yatay taşma yok (sistem + grafik)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/denklem-cozucu/');
    await setMode(page, 'sys');
    const vals: Record<string, string> = { a1: '2', b1: '3', c1: '12', a2: '1', b2: '-1', c2: '1' };
    for (const [k, v] of Object.entries(vals)) await page.locator(`#f-${k}`).fill(v);
    await expect(val(page, 'x')).toHaveText('3');
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(1);
  });
});
