import { test, expect } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

const URL = '/morse-alfabesi-cevir/';

test.describe('Morse Alfabesi Çevirici', () => {
  test('içerik: 900+ kelime, 3 reklam, 7+ SSS, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await page.goto(URL);
    const words = await page.locator('main').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator('[data-slot="morse-alfabesi-cevir-' + s + '"]')).toHaveCount(1);
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

  test('SOS → ... --- ...; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await go(page);
    await page.locator('#input').fill('SOS');
    await page.getByRole('button', { name: 'Çevir' }).click();
    await expect(page.locator('#out')).toHaveValue('... --- ...');
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(external).toEqual([]);
    noErrors();
  });

  test('Türkçe harfler ve sözcük ayırıcı', async ({ page }) => {
    await go(page);
    await page.locator('#input').fill('Merhaba Dünya');
    await page.locator('#convert').click();
    await expect(page.locator('#out')).toHaveValue('-- . .-. .... .- -... .- / -.. ..-- -. -.-- .-');
    await page.locator('#input').fill('Çağrı 112!');
    await page.locator('#convert').click();
    await expect(page.locator('#out')).toHaveValue('-.-.. .- --.-. .-. .. / .---- .---- ..--- -.-.--');
  });

  test('Morse → Metin ve alternatif işaretler', async ({ page }) => {
    await go(page);
    await page.getByLabel('Morse → Metin').check();
    await page.locator('#input').fill('.... .- .-.. --- / .-- --- .-. .-.. -..');
    await page.locator('#convert').click();
    await expect(page.locator('#out')).toHaveValue('HALO WORLD');
    await expect(page.locator('#play')).toBeHidden();
    await page.locator('#input').fill('•••  –––  •••');
    await page.locator('#convert').click();
    await expect(page.locator('#out')).toHaveValue('SOS');
  });

  test('boş ve tanınmayan girdi Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await go(page);
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('Çevrilecek bir metin yazın');
    await expect(page.locator('#result')).toBeHidden();
    await page.getByLabel('Morse → Metin').check();
    await page.locator('#input').fill('12345 abc');
    await page.locator('#convert').click();
    await expect(page.locator('#error')).toContainText('nokta (.) ve çizgi (-)');
  });

  test('karşılığı olmayan karakter atlanır ve bildirilir', async ({ page }) => {
    await go(page);
    await page.locator('#input').fill('A#B');
    await page.locator('#convert').click();
    await expect(page.locator('#out')).toHaveValue('.- -...');
    await expect(page.locator('#r-note')).toContainText('atlanan karakterler: #');
  });

  test('sonucu girişe taşıyıp ters çevirme gidiş-dönüş verir', async ({ page }) => {
    await go(page);
    await page.locator('#input').fill('Merhaba');
    await page.locator('#convert').click();
    await page.locator('#swap').click();
    await expect(page.locator('#out')).toHaveValue('MERHABA');
    await expect(page.getByLabel('Morse → Metin')).toBeChecked();
  });

  test('sesli çal düğmesi çalışır ve durdurulur; klavye ile odaklanır', async ({ page }) => {
    await go(page);
    await page.locator('#input').fill('E');
    await page.locator('#convert').click();
    await expect(page.locator('#play')).toBeVisible();
    await page.locator('#play').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#play')).toHaveText('Durdur');
    await page.keyboard.press('Enter');
    await expect(page.locator('#play')).toHaveText('Sesli çal');
  });

});
