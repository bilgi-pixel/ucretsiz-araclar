import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const cell = (page: Page, ch: string) => page.locator(`.oz-cell[data-char="${ch}"]`);
const CHECK = '✓'; // U+2713 tik işareti

test.describe('Özel Karakter ve Sembol Kopyala', () => {
  test('"tik" araması ✓ bulur, tıklayınca pano içeriği karakter olur, kod gösterimleri çıkar, dış istek yok', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/ozel-karakter-kopyala/');
    await page.locator('#search').fill('tik');
    const check = cell(page, CHECK);
    await expect(check).toBeVisible();
    // Panodaki değer, tıklanan düğmenin DOM'daki data-char değeriyle aynı olmalı
    const expected = await check.getAttribute('data-char');
    expect(expected).toBe(CHECK);
    expect(expected!.codePointAt(0)).toBe(0x2713);
    await check.click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
    await expect(page.locator('#status')).toContainText('Kopyalandı');
    await expect(page.locator('#d-ad')).toHaveText('Tik işareti');
    await expect(page.locator('#d-cp')).toHaveText('U+2713');
    await expect(page.locator('#d-html')).toContainText('&#10003;');
    await expect(page.locator('#d-html')).toContainText('&check;');
    await expect(page.locator('#d-css')).toHaveText('\\2713');
    await expect(page.locator('#d-js')).toHaveText('\\u2713');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Türkçe karakter normalleşir; ad, karakter ve Unicode koduyla arama çalışır; sonuç yoksa yönlendirir', async ({ page }) => {
    await page.goto('/ozel-karakter-kopyala/');
    await page.locator('#search').fill('turk lirasi');
    await expect(cell(page, '₺')).toBeVisible();
    await page.locator('#search').fill('YARIM');
    await expect(cell(page, '½')).toBeVisible();
    await page.locator('#search').fill('euro');
    await expect(cell(page, '€')).toBeVisible();
    await page.locator('#search').fill('U+2605');
    await expect(page.locator('.oz-cell')).toHaveCount(1);
    await expect(cell(page, '★')).toBeVisible();
    await page.locator('#search').fill('©');
    await expect(cell(page, '©')).toBeVisible();
    await page.locator('#search').fill('qqqzzz');
    await expect(page.locator('#empty')).toContainText('eşleşen karakter bulunamadı');
    await expect(page.locator('.oz-cell')).toHaveCount(0);
  });

  test('kategori sekmeleri geçiş yapar, ok tuşlarıyla gezilir, Türkçe harfler listelenir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/ozel-karakter-kopyala/');
    await expect(page.locator('#tab-matematik')).toHaveAttribute('aria-selected', 'true');
    await expect(cell(page, '∞')).toBeVisible();
    await page.locator('#tab-para').click();
    await expect(page.locator('#tab-para')).toHaveAttribute('aria-selected', 'true');
    await expect(cell(page, '₺')).toBeVisible();
    await expect(cell(page, '∞')).toHaveCount(0);
    await page.locator('#tab-para').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-oklar')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#tab-oklar')).toBeFocused();
    await expect(cell(page, '→')).toBeVisible();
    await page.locator('#tab-yunan').click();
    await expect(cell(page, 'α')).toBeVisible();
    await expect(cell(page, 'Ω')).toBeVisible();
    await page.locator('#tab-latin').click();
    await expect(cell(page, 'ğ')).toBeVisible();
    await cell(page, 'İ').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('İ');
    await expect(page.locator('#d-cp')).toHaveText('U+0130');
  });

  test('son kullanılanlar hatırlanır, yenilemede kalır, temizlenir', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/ozel-karakter-kopyala/');
    await page.locator('#tab-son').click();
    await expect(page.locator('#empty')).toContainText('Henüz karakter kopyalamadınız');
    await page.locator('#tab-tik').click();
    await cell(page, CHECK).click();
    await page.locator('#tab-para').click();
    await cell(page, '€').click();
    await page.locator('#tab-son').click();
    await expect(page.locator('.oz-cell').first()).toHaveAttribute('data-char', '€'); // en yeni başta
    await expect(cell(page, CHECK)).toBeVisible();
    await page.reload();
    await page.locator('#tab-son').click();
    await expect(cell(page, CHECK)).toBeVisible();
    await page.locator('#recent-clear').click();
    await expect(page.locator('.oz-cell')).toHaveCount(0);
    await expect(page.locator('#empty')).toBeVisible();
  });

  test('birleştirme alanı karakterleri tek metin olarak kopyalar, geri alır ve temizler', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/ozel-karakter-kopyala/');
    await page.locator('#tab-tik').click();
    await cell(page, CHECK).click();
    await page.locator('#tab-para').click();
    await cell(page, '€').click();
    await cell(page, '₺').click();
    await expect(page.locator('#compose')).toHaveValue(CHECK + '€₺');
    await page.locator('#compose-copy').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(CHECK + '€₺');
    await page.locator('#compose-undo').click();
    await expect(page.locator('#compose')).toHaveValue(CHECK + '€');
    await page.locator('#compose-clear').click();
    await expect(page.locator('#compose')).toHaveValue('');
    await page.locator('#compose-copy').click();
    await expect(page.locator('#error')).toContainText('Birleştirme alanı boş');
  });

  test('Alt kodu tablosu görünür ve doğru kodları içerir', async ({ page }) => {
    await page.goto('/ozel-karakter-kopyala/');
    const table = page.locator('#alt-tablo');
    await table.scrollIntoViewIfNeeded();
    await expect(table).toBeVisible();
    expect(await table.locator('tbody tr').count()).toBeGreaterThanOrEqual(30);
    await expect(table.locator('thead')).toContainText('Windows');
    await expect(table.locator('thead')).toContainText('Mac');
    const copyright = table.locator('tbody tr', { hasText: 'Telif hakkı' });
    await expect(copyright).toContainText('Alt+0169');
    await expect(copyright).toContainText('00A9');
    await expect(copyright).toContainText('Option+G');
    // Tablodaki Word (Alt+X) kodları gerçek karakterle uyuşmalı
    const mismatches = await table.evaluate((t) => {
      const bad: string[] = [];
      t.querySelectorAll('tbody tr').forEach((tr) => {
        const ch = (tr.querySelector('.oz-ch')?.textContent || '').trim();
        const hex = (tr.children[2]?.textContent || '').trim();
        if (!ch || !/^[0-9A-F]{4}$/.test(hex) || ch.codePointAt(0) !== parseInt(hex, 16)) bad.push(`${ch} ${hex}`);
      });
      return bad;
    });
    expect(mismatches).toEqual([]);
  });

  test('bozuk localStorage verisinde sayfa çalışmaya devam eder', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => localStorage.setItem('ba-karakter-son', '{bozuk json'));
    await page.goto('/ozel-karakter-kopyala/');
    await expect(page.locator('.oz-cell').first()).toBeVisible();
    await page.locator('#tab-son').click();
    await expect(page.locator('#empty')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('içerik: >=900 kelime (tablo hariç), >=7 SSS, 3 reklam alanı araç kutusunun dışında, 360px taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/ozel-karakter-kopyala/');
    const words = await page.locator('article.ba-content').evaluate((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('table').forEach((t) => t.remove());
      return (clone.textContent || '').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    });
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('article.ba-content details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="ozel-karakter-kopyala-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
