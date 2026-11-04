import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL_PATH = '/oyunlar/yazma-hizi-testi/';
const BEST_KEY = 'oyun-yazma-hizi-testi:best';

const targetOf = (page: Page) => page.locator('#target').getAttribute('data-target').then((t) => t ?? '');

test.describe('Yazma Hızı Testi', () => {
  test('sayfa açılır; içerik, reklam ve gizlilik şartları sağlanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Yazma Hızı Testi');
    await expect(page.locator('#typing-input')).toBeVisible();
    await expect(page.getByText('dosya yüklenmez').first()).toBeAttached();

    // Kelime modunda tek boşluklu, yeterince uzun bir hedef metin üretilir
    const target = await targetOf(page);
    expect(target.length).toBeGreaterThan(300);
    expect(target).not.toMatch(/\s{2,}/);
    expect(target.split(' ').length).toBeGreaterThan(50);

    // ≥ 800 kelime, SSS ≥ 6, tam 3 reklam; A reklamı oyun kutusunun altında
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);
    const ads = page.locator('.ba-ad[data-slot^="oyun-yazma-hizi-testi-"]');
    expect(await ads.count()).toBe(3);
    const adAfterGame = await page.evaluate(() => {
      const game = document.getElementById('game')!;
      const ad = document.querySelector('.ba-ad[data-slot="oyun-yazma-hizi-testi-a"]')!;
      return !game.contains(ad) && !!(game.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(adAfterGame).toBe(true);
    expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain('"VideoGame"');

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('metni yazınca WPM sıfırdan büyük olur; bilerek 1 hata doğruluğu 97,5 yapar', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.goto(URL_PATH);
    const target = await targetOf(page);
    const typed = target.slice(0, 10) + '#' + target.slice(11, 40); // 11. karakter bilerek yanlış, 40 karakter
    expect(typed.length).toBe(40);
    await page.locator('#typing-input').pressSequentially(typed);

    const live = page.locator('#live');
    await expect(live).toHaveAttribute('data-typed', '40');
    await expect(live).toHaveAttribute('data-correct', '39');
    await expect(page.locator('#stat-acc')).toHaveText('97,5'); // 39/40
    expect(Number(await page.locator('#stat-wpm').textContent())).toBeGreaterThan(0);
    expect(Number(await page.locator('#stat-kpm').textContent())).toBeGreaterThan(0);
    // Hata vurgulanır: tam 1 kırmızı karakter, 39 yeşil
    await expect(page.locator('#target .yz-c.bad')).toHaveCount(1);
    await expect(page.locator('#target .yz-c.ok')).toHaveCount(39);

    // Hatayı silip düzeltince doğruluk yeniden %100 olur
    const input = page.locator('#typing-input');
    await input.press('Control+a');
    await input.press('Backspace');
    await input.pressSequentially(target.slice(0, 40));
    await expect(page.locator('#stat-acc')).toHaveText('100');
    await expect(page.locator('#target .yz-c.bad')).toHaveCount(0);
    expect(external).toEqual([]);
  });

  test('metin modunda Türkçe karakterler doğru sayılır; Türkçe karakter kapalıyken metin ASCII olur', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('[data-mode="text"]').click();
    await expect(page.locator('[data-mode="text"]')).toHaveAttribute('aria-pressed', 'true');
    const target = await targetOf(page);
    expect(target).toMatch(/[çğıöşü]/);
    expect(target).toContain('. ');
    await page.locator('#typing-input').pressSequentially(target.slice(0, 80));
    await expect(page.locator('#live')).toHaveAttribute('data-correct', '80');
    await expect(page.locator('#stat-acc')).toHaveText('100');

    // Türkçe karakterleri kapat → hedefte hiç Türkçe harf kalmaz
    await page.locator('#opt-tr').uncheck();
    const ascii = await targetOf(page);
    expect(ascii.length).toBeGreaterThan(200);
    expect(ascii).not.toMatch(/[çğıöşüÇĞİÖŞÜ]/);
    // Sıfırlandı: yazma alanı boş
    await expect(page.locator('#typing-input')).toHaveValue('');
  });

  test('süre bitince sonuç ekranı açılır ve en iyi skor localStorage\'a yazılır', async ({ page }) => {
    await page.clock.install();
    await page.goto(URL_PATH);
    await page.locator('[data-duration="30"]').click();
    await expect(page.locator('#stat-time')).toHaveText('30');
    const target = await targetOf(page);
    await page.locator('#typing-input').pressSequentially(target.slice(0, 25)); // 25 doğru karakter
    await expect(page.locator('#result')).not.toBeVisible();

    await page.clock.fastForward(31_000);
    const result = page.locator('#result');
    await expect(result).toBeVisible();
    await expect(page.locator('#res-title')).toHaveText('Süre doldu');
    // 25 karakter / 5 / 0,5 dk = 10 WPM; 50 KPM; doğruluk %100
    await expect(page.locator('#res-wpm')).toHaveText('10');
    await expect(page.locator('#res-kpm')).toHaveText('50');
    await expect(page.locator('#res-acc')).toHaveText('100');
    await expect(page.locator('#res-new')).toBeVisible();
    await expect(page.locator('#typing-input')).toHaveJSProperty('readOnly', true);

    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), BEST_KEY);
    expect(stored['30'].wpm).toBe(10);
    expect(stored['30'].acc).toBe(100);
    await expect(page.locator('#best-line')).toContainText('En iyi (30 sn): 10 WPM');

    // Tekrar dene: sonuç gizlenir, alan yeniden yazılabilir olur
    await page.locator('#res-again').click();
    await expect(result).not.toBeVisible();
    await expect(page.locator('#typing-input')).toHaveJSProperty('readOnly', false);
    await expect(page.locator('#typing-input')).toHaveValue('');
  });

  test('daha düşük skor kayıtlı en iyiyi ezmez', async ({ page }) => {
    await page.addInitScript((k) => {
      if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ 30: { wpm: 99, kpm: 495, acc: 100, mode: 'words', date: '2026-01-01' } }));
    }, BEST_KEY);
    await page.clock.install();
    await page.goto(URL_PATH);
    await page.locator('[data-duration="30"]').click();
    await expect(page.locator('#best-line')).toContainText('99 WPM');
    const target = await targetOf(page);
    await page.locator('#typing-input').pressSequentially(target.slice(0, 20));
    await page.clock.fastForward(31_000);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#res-new')).toBeHidden();
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), BEST_KEY);
    expect(stored['30'].wpm).toBe(99);
  });

  test('360px genişlikte yatay taşma yok ve oyun kullanılabilir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(1);
    await expect(page.locator('#typing-input')).toBeVisible();
    const target = await targetOf(page);
    await page.locator('#typing-input').pressSequentially(target.slice(0, 30));
    await expect(page.locator('#live')).toHaveAttribute('data-correct', '30');
    expect(await overflow()).toBeLessThanOrEqual(1);
  });
});
