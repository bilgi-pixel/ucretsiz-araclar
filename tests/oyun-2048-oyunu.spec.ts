import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// 2048 Oyunu doğrulaması: tahta değişimi, skor, localStorage, geri al, oyun sonu, boyutlar, mobil taşma.
const URL_PATH = '/oyunlar/2048-oyunu/';
const P = 'ba-oyun-2048';

const cells = async (page: Page) => ((await page.locator('#board').getAttribute('data-cells')) || '').split(',').map(Number);
const filled = (c: number[]) => c.filter(Boolean).length;

/** Kayıtlı oyunu sayfa açılmadan önce yazar (yalnızca ilk yüklemede; yenilemede ezmez). */
async function seed(page: Page, n: number, grid: number[][], score = 0) {
  await page.addInitScript(([size, g, s, prefix]) => {
    if (sessionStorage.getItem('seeded')) return;
    localStorage.setItem(`${prefix}:state:${size}`, JSON.stringify({ grid: g, score: s, keepGoing: false }));
    if (size !== 4) localStorage.setItem(`${prefix}:size`, String(size));
    sessionStorage.setItem('seeded', '1');
  }, [n, grid, score, P] as const);
}

async function open(page: Page) {
  await page.goto(URL_PATH);
  await page.locator('#board').scrollIntoViewIfNeeded();
  await expect(page.locator('#board')).toHaveAttribute('data-cells', /.+/);
}

const MERGE_ROW = [[2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

test.describe('2048 Oyunu', () => {
  test('sayfa açılır, oyun iki taşla başlar, içerik/reklam/SSS tamam, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('2048');
    expect(filled(await cells(page))).toBe(2);
    await expect(page.locator('#tiles .tile')).toHaveCount(2);
    await expect(page.locator('#score')).toHaveText('0');
    await expect(page.locator('#target')).toHaveText('2048');
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(6);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const faq = ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ok tuşu tahtayı değiştirir', async ({ page }) => {
    await open(page);
    const before = await cells(page);
    let changed = false;
    for (const key of ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']) {
      await page.keyboard.press(key);
      if ((await cells(page)).join() !== before.join()) { changed = true; break; }
    }
    expect(changed, 'hiçbir ok tuşu tahtayı değiştirmedi').toBe(true);
    await expect(page.locator('#btn-undo')).toBeEnabled();
  });

  test('birleşme skoru artırır, en yüksek skor localStorage\'a yazılır ve yenilemede korunur', async ({ page }) => {
    await seed(page, 4, MERGE_ROW);
    await open(page);
    await page.keyboard.press('a'); // WASD: sola
    await expect(page.locator('#score')).toHaveText('4');
    await expect(page.locator('#best')).toHaveText('4');
    expect((await cells(page))[0]).toBe(4);
    await expect(page.locator('#tiles .tile:not(.gone)')).toHaveCount(filled(await cells(page)));
    expect(await page.evaluate((k) => localStorage.getItem(k), `${P}:best:4`)).toBe('4');
    await page.reload();
    await expect(page.locator('#best')).toHaveText('4');
    await expect(page.locator('#score')).toHaveText('4'); // kayıtlı oyun geri yüklendi
    // Yeni oyun skoru sıfırlar ama en yüksek skor kalır.
    await page.locator('#btn-new').click();
    await expect(page.locator('#score')).toHaveText('0');
    await expect(page.locator('#best')).toHaveText('4');
  });

  test('geri al son hamleyi ve skoru geri alır', async ({ page }) => {
    await seed(page, 4, MERGE_ROW);
    await open(page);
    await expect(page.locator('#btn-undo')).toBeDisabled();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#score')).toHaveText('4');
    await page.locator('#btn-undo').click();
    await expect(page.locator('#score')).toHaveText('0');
    expect((await cells(page)).join()).toBe(MERGE_ROW.flat().join());
    await expect(page.locator('#btn-undo')).toBeDisabled(); // tek adımlık
  });

  test('ekran okları ve fare/parmak kaydırma hamle yapar', async ({ page }) => {
    await seed(page, 4, MERGE_ROW);
    await open(page);
    await page.locator('[data-dir="left"]').click();
    await expect(page.locator('#score')).toHaveText('4');

    // Kaydırma: yeni oyun yerine yeni tohumlu sayfa
    const page2 = await page.context().newPage();
    await seed(page2, 4, [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    await open(page2);
    const box = (await page2.locator('#board').boundingBox())!;
    await page2.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2);
    await page2.mouse.down();
    await page2.mouse.move(box.x + box.width / 2 - 60, box.y + box.height / 2, { steps: 6 });
    await page2.mouse.up();
    await expect(page2.locator('#score')).toHaveText('4');
    expect((await cells(page2))[0]).toBe(4);
    await page2.close();
  });

  test('tahta boyutu seçilir; her boyutun kendi tahtası ve en yüksek skoru vardır', async ({ page }) => {
    await open(page);
    await page.locator('[data-size-btn="5"]').click();
    await expect(page.locator('#board')).toHaveAttribute('data-size', '5');
    await expect(page.locator('#cells div')).toHaveCount(25);
    expect(filled(await cells(page))).toBe(2);
    expect((await cells(page)).length).toBe(25);
    expect(await page.evaluate((k) => localStorage.getItem(k), `${P}:size`)).toBe('5');
    await page.locator('[data-size-btn="3"]').click();
    await expect(page.locator('#cells div')).toHaveCount(9);
    await expect(page.locator('#target')).toHaveText('256');
    await expect(page.locator('#hint-3')).toBeVisible();
    await page.locator('[data-size-btn="6"]').click();
    await expect(page.locator('#cells div')).toHaveCount(36);
    await page.reload(); // son seçilen boyut hatırlanır
    await expect(page.locator('#board')).toHaveAttribute('data-size', '6');
  });

  test('oyun bitti ekranı: hamle kalmaz, geri al ve Tekrar dene çalışır', async ({ page }) => {
    await seed(page, 4, [[2, 4, 2, 4], [4, 2, 4, 2], [8, 16, 8, 16], [32, 64, 128, 0]], 100);
    await open(page);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#overlay')).toContainText('Oyun bitti');
    await expect(page.locator('#board')).toHaveAttribute('data-status', 'over');
    const frozen = await cells(page);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowUp');
    expect((await cells(page)).join()).toBe(frozen.join());
    // Geri al oyunu yeniden açar.
    await page.locator('#btn-undo').click();
    await expect(page.locator('#overlay')).toBeHidden();
    await expect(page.locator('#board')).toHaveAttribute('data-status', 'playing');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#overlay')).toBeVisible();
    await page.locator('#btn-retry').click();
    await expect(page.locator('#overlay')).toBeHidden();
    await expect(page.locator('#score')).toHaveText('0');
    expect(filled(await cells(page))).toBe(2);
    await expect(page.locator('#best')).toHaveText('100');
  });

  test('hedefe ulaşınca Devam et ile oyun sürer', async ({ page }) => {
    await seed(page, 3, [[128, 128, 0], [0, 0, 0], [0, 0, 0]]);
    await open(page);
    await expect(page.locator('#target')).toHaveText('256');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#overlay')).toContainText('256');
    await expect(page.locator('#board')).toHaveAttribute('data-status', 'won');
    await page.locator('#btn-continue').click();
    await expect(page.locator('#overlay')).toBeHidden();
    await expect(page.locator('#board')).toHaveAttribute('data-status', 'playing');
    await page.keyboard.press('ArrowDown'); // devam eden oyunda hamle çalışır
    await expect(page.locator('#btn-undo')).toBeEnabled();
  });

  test('bozuk kayıt yok sayılır, yeni oyun başlar', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript((prefix) => {
      localStorage.setItem(`${prefix}:state:4`, '{bozuk json');
      localStorage.setItem(`${prefix}:best:4`, 'abc');
    }, P);
    await open(page);
    expect(filled(await cells(page))).toBe(2);
    await expect(page.locator('#best')).toHaveText('0');
    expect(errors).toEqual([]);
  });

  test('360px genişlikte yatay taşma yok ve 6×6 tahta sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    for (const size of ['4', '6']) {
      await page.locator(`[data-size-btn="${size}"]`).click();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `boyut ${size}`).toBeLessThanOrEqual(0);
      const box = (await page.locator('#board').boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(360);
    }
  });
});
