import { test, expect } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';

test.describe('PDF Aç (görüntüleyici)', () => {
  test('uc-sayfa.pdf açılır, 2. sayfaya gidilir, arama eşleşme sayar, yazdırma hazırlığı; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/pdf-ac/');
    await expect(page.locator('#viewer')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('uc-sayfa.pdf'));
    await expect(page.locator('#viewer')).toBeVisible();
    await expect(page.locator('#page-total')).toHaveText('3');
    await expect(page.locator('#file-info')).toContainText('3 sayfa');
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');

    // 2. sayfaya git
    await page.locator('#btn-next').click();
    await expect(page.locator('#page-no')).toHaveValue('2');
    await expect(page.locator('#canvas')).toHaveAttribute('data-page', '2');
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');
    // sayı kutusuyla 3. sayfa
    await page.locator('#page-no').fill('3');
    await page.locator('#page-no').press('Enter');
    await expect(page.locator('#canvas')).toHaveAttribute('data-page', '3');
    // klavye: sol ok geri
    await page.locator('#stage').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#canvas')).toHaveAttribute('data-page', '2');

    // yakınlaştırma ve döndürme
    const zoom0 = await page.locator('#zoom-lbl').textContent();
    await page.locator('#btn-zin').click();
    await expect(page.locator('#zoom-lbl')).not.toHaveText(zoom0!);
    const w0 = await page.locator('#canvas').evaluate((c: HTMLCanvasElement) => c.width);
    await page.locator('#btn-rot').click();
    await expect.poll(() => page.locator('#canvas').evaluate((c: HTMLCanvasElement) => c.width)).not.toBe(w0);

    // arama: "sayfa" her sayfada bir kez geçer
    await page.locator('#q').fill('sayfa');
    await expect(page.locator('#search-status')).toContainText('/ 3 eşleşme', { timeout: 15_000 });
    await expect(page.locator('#hl-layer .pv-hl.cur')).toHaveCount(1);
    await page.locator('#btn-snext').click();
    await expect(page.locator('#search-status')).toContainText('eşleşme');
    await page.locator('#q').fill('yokboyle');
    await expect(page.locator('#search-status')).toHaveText('Eşleşme yok', { timeout: 15_000 });

    // yazdırma: window.print yerine kaydedici
    await page.evaluate(() => { (window as any).__printed = 0; window.print = () => { (window as any).__printed = document.querySelectorAll('#print-area canvas').length; }; });
    await page.locator('#btn-print').click();
    await expect.poll(() => page.evaluate(() => (window as any).__printed)).toBe(3);

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('şifreli PDF parola ister; doğru parola açar, yanlış parola uyarır', async ({ page }) => {
    await page.goto('/pdf-ac/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('pdf-sifre-kaldir-1234.pdf'));
    await expect(page.locator('#pw-box')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#viewer')).toBeHidden();
    await page.locator('#pw').fill('yanlis');
    await page.locator('#pw-box button[type=submit]').click();
    await expect(page.locator('#pw-msg')).toContainText('Parola yanlış', { timeout: 15_000 });
    await page.locator('#pw').fill('1234');
    await page.locator('#pw-box button[type=submit]').click();
    await expect(page.locator('#viewer')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#pw-box')).toBeHidden();
    await expect(page.locator('#canvas')).toHaveAttribute('data-ready', '1');
  });

  test('sifreli.pdf (el yapımı /Encrypt) parola ister ya da Türkçe hata verir', async ({ page }) => {
    await page.goto('/pdf-ac/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('sifreli.pdf'));
    await expect(page.locator('#pw-box, #error.is-active').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#viewer')).toBeHidden();
  });

  test('bozuk.pdf ve PDF olmayan dosya → Türkçe, çözüm öneren hata', async ({ page }) => {
    await page.goto('/pdf-ac/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toContainText(/bozuk ya da geçerli bir PDF değil/, { timeout: 15_000 });
    await expect(page.locator('#viewer')).toBeHidden();
    await page.locator('#drop input[type=file]').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).toContainText('bir PDF değil');
  });
});
