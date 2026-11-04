import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Emoji karakterleri dosyaya doğrudan yazılmaz: kaçış dizileri kodlama hatalarını önler.
const HEART = '❤\uFE0F';
const DOG = '\u{1F436}';
const SMILE = '\u{1F600}';
const cell = (page: Page, emoji: string) => page.locator(`.ek-cell[data-emoji="${emoji}"]`);

test.describe('Emoji Kopyala', () => {
  test('"kalp" araması sonuç verir, tıklayınca pano içeriği emoji olur, Unicode kodu görünür', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/emoji-kopyala/');
    await page.locator('#search').fill('kalp');
    expect(await page.locator('.ek-cell').count()).toBeGreaterThan(10);
    const heart = cell(page, HEART);
    await expect(heart).toBeVisible();
    // Panodaki değer, tıklanan düğmenin DOM'daki data-emoji değeriyle aynı olmalı
    const expected = await heart.getAttribute('data-emoji');
    expect(expected).toBe(HEART);
    await heart.click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
    await expect(page.locator('#status')).toContainText('Kopyalandı');
    await expect(page.locator('#d-tr')).toHaveText('Kırmızı kalp');
    await expect(page.locator('#d-cp')).toHaveText('U+2764 U+FE0F');
    await expect(page.locator('#d-html')).toContainText('&#x2764;');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Türkçe karakterler normalleşir, İngilizce ad da çalışır, sonuç yoksa yönlendirir', async ({ page }) => {
    await page.goto('/emoji-kopyala/');
    await page.locator('#search').fill('aglayan');
    await expect(cell(page, '\u{1F622}')).toBeVisible(); // Ağlayan yüz
    await page.locator('#search').fill('ÇİLEK');
    await expect(cell(page, '\u{1F353}')).toBeVisible(); // Çilek
    await page.locator('#search').fill('yildiz');
    await expect(cell(page, '⭐')).toBeVisible(); // Yıldız
    await page.locator('#search').fill('heart');
    await expect(cell(page, HEART)).toBeVisible();
    await page.locator('#search').fill('qqqzzz');
    await expect(page.locator('#empty')).toBeVisible();
    await expect(page.locator('#empty')).toContainText('eşleşen emoji bulunamadı');
    await expect(page.locator('.ek-cell')).toHaveCount(0);
  });

  test('kategori sekmeleri geçiş yapar, ok tuşlarıyla gezilir', async ({ page }) => {
    await page.goto('/emoji-kopyala/');
    await expect(page.locator('#tab-yuzler')).toHaveAttribute('aria-selected', 'true');
    await expect(cell(page, SMILE)).toBeVisible();
    await page.locator('#tab-hayvanlar').click();
    await expect(page.locator('#tab-hayvanlar')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#tab-yuzler')).toHaveAttribute('aria-selected', 'false');
    await expect(cell(page, DOG)).toBeVisible();
    await expect(cell(page, SMILE)).toHaveCount(0);
    await page.locator('#tab-hayvanlar').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-yiyecek')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#tab-yiyecek')).toBeFocused();
    await page.keyboard.press('Home');
    await expect(page.locator('#tab-son')).toHaveAttribute('aria-selected', 'true');
    // Bayraklar sekmesi seçili ülke bayraklarını içerir (bölgesel gösterge harfleri)
    await page.locator('#tab-bayraklar').click();
    await expect(cell(page, '\u{1F1F9}\u{1F1F7}')).toBeVisible();
  });

  test('son kullanılanlar kopyalanan emojiyi hatırlar, yenilemede kalır, temizlenir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/emoji-kopyala/');
    await page.locator('#tab-son').click();
    await expect(page.locator('#empty')).toContainText('Henüz emoji kopyalamadınız');
    await page.locator('#tab-hayvanlar').click();
    await cell(page, DOG).click();
    await page.locator('#tab-yuzler').click();
    await cell(page, SMILE).click();
    await page.locator('#tab-son').click();
    await expect(page.locator('.ek-cell').first()).toHaveAttribute('data-emoji', SMILE); // en yeni başta
    await expect(cell(page, DOG)).toBeVisible();
    await page.reload();
    await page.locator('#tab-son').click();
    await expect(cell(page, DOG)).toBeVisible();
    await page.locator('#recent-clear').click();
    await expect(page.locator('.ek-cell')).toHaveCount(0);
    await expect(page.locator('#empty')).toBeVisible();
  });

  test('ten rengi eller sekmesinde uygulanır ve toned emoji kopyalanır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/emoji-kopyala/');
    await page.locator('#tab-eller').click();
    const plain = cell(page, '\u{1F44D}');
    await expect(plain).toBeVisible();
    await page.locator('#tones label', { hasText: 'Koyu' }).last().click();
    const dark = cell(page, '\u{1F44D}\u{1F3FF}');
    await expect(dark).toBeVisible();
    await expect(plain).toHaveCount(0);
    await dark.click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('\u{1F44D}\u{1F3FF}');
    await expect(page.locator('#d-cp')).toHaveText('U+1F44D U+1F3FF');
    // Ten rengi desteklemeyen emoji değişmez
    await page.locator('#tab-kalpler').click();
    await expect(cell(page, HEART)).toBeVisible();
  });

  test('birleştirme alanı çoklu emojiyi tek metin olarak kopyalar, geri alır ve temizler', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/emoji-kopyala/');
    await cell(page, SMILE).click();
    await page.locator('#tab-kalpler').click();
    await cell(page, HEART).click();
    await page.locator('#tab-hayvanlar').click();
    await cell(page, DOG).click();
    await expect(page.locator('#compose')).toHaveValue(SMILE + HEART + DOG);
    await page.locator('#compose-copy').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(SMILE + HEART + DOG);
    await page.locator('#compose-undo').click();
    await expect(page.locator('#compose')).toHaveValue(SMILE + HEART);
    await page.locator('#compose-undo').click();
    await expect(page.locator('#compose')).toHaveValue(SMILE); // VS16'lı kalp tek parça silinir
    await page.locator('#compose-clear').click();
    await expect(page.locator('#compose')).toHaveValue('');
    await page.locator('#compose-copy').click();
    await expect(page.locator('#error')).toContainText('Birleştirme alanı boş');
  });

  test('bozuk localStorage verisinde sayfa çalışmaya devam eder', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => {
      localStorage.setItem('ba-emoji-son', '{bozuk json');
      localStorage.setItem('ba-emoji-ten', '"yanlis"');
    });
    await page.goto('/emoji-kopyala/');
    await expect(page.locator('.ek-cell').first()).toBeVisible();
    await page.locator('#tab-son').click();
    await expect(page.locator('#empty')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('içerik: >=900 kelime, >=7 SSS, 3 reklam alanı araç kutusunun dışında, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/emoji-kopyala/');
    const words = await page.locator('article.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('article.ba-content details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="emoji-kopyala-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
