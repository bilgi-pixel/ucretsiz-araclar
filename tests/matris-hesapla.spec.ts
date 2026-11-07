import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/matris-hesapla/';

test.describe('Matris Hesaplama', () => {
  test('içerik: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('main').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('[data-slot="matris-hesapla-' + s + '"]')).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    // Reklam A araç kutusundan sonra gelir (butonların üstünde/yanında değil)
    const after = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!, ad = document.querySelector('[data-slot$="-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING) && !tool.contains(ad);
    });
    expect(after).toBe(true);
  });

  test('360px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });


  const go = async (page: any) => { await page.goto(URL); await page.waitForLoadState('networkidle'); };
  const fill = async (page: any, grid: 'a' | 'b', vals: string[]) => {
    const inputs = page.locator('#grid-' + grid + ' input');
    for (let i = 0; i < vals.length; i++) await inputs.nth(i).fill(vals[i]);
  };
  const cells = async (page: any) => page.locator('#r-body td').allTextContents();

  test('A×B çarpımı: [[1,2],[3,4]]×[[0,1],[1,0]] = [[2,1],[4,3]]; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await fill(page, 'a', ['1', '2', '3', '4']);
    await fill(page, 'b', ['0', '1', '1', '0']);
    await page.locator('#calc').click();
    expect(await cells(page)).toEqual(['2', '1', '4', '3']);
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(external).toEqual([]);
    noErrors();
  });

  test('determinant: 2×2 → −2, 3×3 → 6', async ({ page }) => {
    await go(page);
    await page.locator('#op').selectOption('det');
    await expect(page.locator('#b-box')).toBeHidden();
    await fill(page, 'a', ['1', '2', '3', '4']);
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('-2');
    await page.locator('#a-rows').selectOption('3');
    await page.locator('#a-cols').selectOption('3');
    await fill(page, 'a', ['2', '0', '1', '1', '3', '2', '1', '1', '2']);
    await page.locator('#calc').click();
    await expect(page.locator('#r-value')).toHaveText('6');
  });

  test('ters matris: [[1,2],[3,4]] → [[-2,1],[1,5;-0,5]]', async ({ page }) => {
    await go(page);
    await page.locator('#op').selectOption('inv');
    await fill(page, 'a', ['1', '2', '3', '4']);
    await page.locator('#calc').click();
    expect(await cells(page)).toEqual(['-2', '1', '1,5', '-0,5']);
  });

  test('toplama, devrik ve skaler çarpım; virgüllü ondalık kabul edilir', async ({ page }) => {
    await go(page);
    await page.locator('#op').selectOption('add');
    await fill(page, 'a', ['1', '2', '3', '4']);
    await fill(page, 'b', ['5', '6', '7', '8']);
    await page.locator('#calc').click();
    expect(await cells(page)).toEqual(['6', '8', '10', '12']);
    await page.locator('#op').selectOption('transpose');
    await page.locator('#a-rows').selectOption('2');
    await page.locator('#a-cols').selectOption('3');
    await fill(page, 'a', ['1', '2', '3', '4', '5', '6']);
    await page.locator('#calc').click();
    expect(await cells(page)).toEqual(['1', '4', '2', '5', '3', '6']);
    await page.locator('#op').selectOption('scale');
    await page.locator('#k').fill('0,5');
    await page.locator('#calc').click();
    expect(await cells(page)).toEqual(['0,5', '1', '1,5', '2', '2,5', '3']);
  });

  test('boyut uyuşmazlığı, tekil matris ve geçersiz hücre Türkçe hata verir', async ({ page }) => {
    await go(page);
    await page.locator('#a-cols').selectOption('3'); // A 2×3, B 2×2: çarpılamaz
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('sütun sayısı (3)');
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#op').selectOption('inv');
    await expect(page.locator('#k-wrap')).toBeHidden();
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('yalnızca kare matriste');
    await page.locator('#a-cols').selectOption('2');
    await fill(page, 'a', ['1', '2', '2', '4']);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('tekil matris');
    await fill(page, 'a', ['x']);
    await page.locator('#calc').click();
    await expect(page.locator('#error')).toContainText('geçerli bir sayı değil');
  });

  test('boyut değişince girilen değerler korunur; hücreler etiketli', async ({ page }) => {
    await go(page);
    await fill(page, 'a', ['7']);
    await page.locator('#a-rows').selectOption('3');
    await expect(page.locator('#grid-a input')).toHaveCount(6);
    await expect(page.locator('#grid-a input').first()).toHaveValue('7');
    await expect(page.locator('#grid-a input').first()).toHaveAttribute('aria-label', /A matrisi 1\. satır 1\. sütun/);
  });

  test('5×5 matris 360px ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await go(page);
    await page.locator('#a-rows').selectOption('5');
    await page.locator('#a-cols').selectOption('5');
    await page.locator('#b-rows').selectOption('5');
    await page.locator('#b-cols').selectOption('5');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

});
