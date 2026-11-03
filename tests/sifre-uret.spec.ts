import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

test.describe('Güçlü Şifre Üretici', () => {
  test('rastgele karakter: uzunluk eşleşir, güç göstergesi dolar, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/sifre-uret/');
    await page.locator('#opt-length').fill('20');
    await page.locator('#generate').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    expect(pw).toHaveLength(20);
    expect(pw).toMatch(/[a-z]/);
    expect(pw).toMatch(/[A-Z]/);
    expect(pw).toMatch(/[0-9]/);
    expect(pw).toMatch(/[^A-Za-z0-9]/);
    await expect(page.locator('#strength-bits')).toContainText(/\d+ bit/);
    await expect(page.locator('#strength-time')).toContainText('kırma süresi');
    await expect(page.locator('#strength')).toHaveAttribute('data-level', /strong|excellent/);

    // 5 tane üret, hepsi farklı olsun
    await page.locator('#opt-count').selectOption('5');
    await page.locator('#generate').click();
    await expect(page.locator('#outputs li')).toHaveCount(5);
    const all = await page.locator('#outputs .pw').allTextContents();
    expect(new Set(all).size).toBe(5);
    expect(external).toEqual([]);
    noErrors();
  });

  test('benzer karakterleri çıkar + yalnızca rakam/harf seçimi', async ({ page }) => {
    await page.goto('/sifre-uret/');
    await page.locator('#opt-length').fill('64');
    await page.locator('#opt-symbol').uncheck();
    await page.locator('#opt-lookalike').check();
    await page.locator('#opt-count').selectOption('5');
    await page.locator('#generate').click();
    const all = await page.locator('#outputs .pw').allTextContents();
    for (const pw of all) {
      expect(pw).toHaveLength(64);
      expect(pw).toMatch(/^[A-Za-z0-9]+$/);
      expect(pw).not.toMatch(/[0O1lI]/);
    }
  });

  test('kopyala düğmesi panoya yazar', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'pano izni yalnızca Chromium');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/sifre-uret/');
    await page.locator('#generate').click();
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    await page.locator('#outputs button[data-copy]').first().click();
    await expect(page.locator('#outputs button[data-copy]').first()).toHaveText('Kopyalandı');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toBe(pw);
  });

  test('kelime parolası: N kelime, seçilen ayırıcı, büyük ilk harf', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto('/sifre-uret/');
    await page.locator('#mode-phrase').check();
    await expect(page.locator('#panel-phrase')).toBeVisible();
    await expect(page.locator('#panel-random')).toBeHidden();
    await page.locator('#opt-words').fill('6');
    await page.locator('#opt-sep').selectOption('.');
    await page.locator('#generate').click();
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    const words = pw.split('.');
    expect(words).toHaveLength(6);
    for (const w of words) expect(w).toMatch(/^[A-Z][a-z]+$/);
    // sona sayı ekle
    await page.locator('#opt-num').check();
    await page.locator('#generate').click();
    const pw2 = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    const parts = pw2.split('.');
    expect(parts).toHaveLength(7);
    expect(parts[6]).toMatch(/^\d{2}$/);
    expect(external).toEqual([]);
  });

  test('PIN: yalnızca rakam, hane sayısı eşleşir', async ({ page }) => {
    await page.goto('/sifre-uret/');
    await page.locator('#mode-pin').check();
    await page.locator('#opt-pin-length').fill('8');
    await page.locator('#generate').click();
    const pw = (await page.locator('#outputs .pw').first().textContent()) ?? '';
    expect(pw).toMatch(/^\d{8}$/);
    await expect(page.locator('#strength')).toHaveAttribute('data-level', 'weak');
  });

  test('hiç karakter türü seçilmezse anlaşılır hata verir', async ({ page }) => {
    await page.goto('/sifre-uret/');
    for (const id of ['#opt-lower', '#opt-upper', '#opt-digit', '#opt-symbol']) await page.locator(id).uncheck();
    await page.locator('#generate').click();
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('En az bir karakter türü');
    await expect(page.locator('#outputs li')).toHaveCount(0);
    // aralık dışı uzunluk 8–64'e sıkıştırılır
    await page.locator('#opt-lower').check();
    await page.locator('#opt-length').fill('500');
    await page.locator('#generate').click();
    await expect(page.locator('#error')).toBeHidden();
    expect((await page.locator('#outputs .pw').first().textContent()) ?? '').toHaveLength(64);
  });

  test('sayfa yapısı: rozet, reklam alanları, SSS, klavye erişimi', async ({ page }) => {
    await page.goto('/sifre-uret/');
    await expect(page.locator('.ba-badges li')).toHaveCount(3);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    await page.locator('#mode-random').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#mode-phrase')).toBeChecked();
    await expect(page.locator('#panel-phrase')).toBeVisible();
    await page.locator('#generate').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
  });
});
