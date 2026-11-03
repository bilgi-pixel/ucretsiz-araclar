import { test, expect } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const words = (page) => page.locator('#results .kb-words li').evaluateAll((els) => els.map((e) => (e.firstChild as Text).textContent));

test.describe('Kelime Bulucu', () => {
  test('harflerden araba türetilir; joker ve 5 harfli filtre çalışır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/kelime-bulucu/');
    await expect(page.locator('body')).toHaveAttribute('data-ready', '1');

    // a,r,a,b: yalnızca iki "a" olduğundan "araba" kurulamaz
    await page.locator('#f-letters').fill('a,r,a,b');
    await expect(page.locator('#count')).toContainText('kelime bulundu');
    expect(await words(page)).not.toContain('araba');
    expect(await words(page)).toContain('abra');

    // joker eklenince "araba" bulunur
    await page.locator('#f-letters').fill('a,r,a,b,?');
    await expect(page.locator('#results')).toContainText('araba');
    // gerçek harfle de bulunur
    await page.locator('#f-letters').fill('a r a b a');
    await expect(page.locator('#results')).toContainText('araba');

    // 5 harfli filtre
    await page.locator('#f-min').fill('5');
    await page.locator('#f-max').fill('5');
    const five = await words(page);
    expect(five).toContain('araba');
    expect(five.every((w) => w!.length === 5)).toBe(true);
    await expect(page.locator('#results h3')).toHaveText(/^5 harfli/);

    // tüm harfleri kullan: 5 harfli anagram
    await page.locator('#f-min').fill('');
    await page.locator('#f-max').fill('');
    await page.locator('#f-exact').check();
    expect((await words(page)).every((w) => w!.length === 5)).toBe(true);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Türkçe büyük harf: İ ve I doğru çevrilir', async ({ page }) => {
    await page.goto('/kelime-bulucu/');
    await expect(page.locator('body')).toHaveAttribute('data-ready', '1');
    await page.locator('#f-letters').fill('KIRIK');
    await expect(page.locator('#results')).toContainText('kırık');
  });

  test('Wordle kalıbı: yeşil, sarı ve gri ipuçları', async ({ page }) => {
    await page.goto('/kelime-bulucu/');
    await expect(page.locator('body')).toHaveAttribute('data-ready', '1');
    await page.locator('input[name=mode][value=wordle]').check();
    await expect(page.locator('#panel-wordle')).toBeVisible();
    await expect(page.locator('#yellow-slots input')).toHaveCount(5);
    await page.locator('#f-green').fill('a_a_a');
    const green = await words(page);
    expect(green).toContain('araba');
    expect(green.every((w) => w!.length === 5 && w![0] === 'a' && w![2] === 'a' && w![4] === 'a')).toBe(true);

    // gri: r elenir → araba kaybolur
    await page.locator('#f-gray').fill('r');
    expect(await words(page)).not.toContain('araba');
    await page.locator('#f-gray').fill('');

    // sarı: 2. konumda b olmayan ama kelimede b olan
    await page.locator('#f-green').fill('');
    await page.locator('#yellow-slots input').nth(1).fill('b');
    const yellow = await words(page);
    expect(yellow.length).toBeGreaterThan(0);
    expect(yellow.every((w) => w!.includes('b') && w![1] !== 'b' && w!.length === 5)).toBe(true);
  });

  test('kalıp modu ve geçersiz aralık uyarısı', async ({ page }) => {
    await page.goto('/kelime-bulucu/');
    await expect(page.locator('body')).toHaveAttribute('data-ready', '1');
    await page.locator('input[name=mode][value=pattern]').check();
    await page.locator('#f-pattern').fill('ara__');
    const list = await words(page);
    expect(list).toContain('araba');
    expect(list.every((w) => w!.length === 5 && w!.startsWith('ara'))).toBe(true);
    await page.locator('#f-min').fill('8');
    await page.locator('#f-max').fill('4');
    await expect(page.locator('#error')).toContainText('En az harf sayısı');
  });

  test('boş girişte yönlendirme gösterilir', async ({ page }) => {
    await page.goto('/kelime-bulucu/');
    await expect(page.locator('#hint')).toBeVisible();
    await expect(page.locator('#count')).toHaveText('Henüz arama yapılmadı');
  });
});
