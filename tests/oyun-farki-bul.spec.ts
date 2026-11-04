import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Farkı bul oyunu: tohumlu sahne üretimi, fark bulma, yanlış tıklama cezası, ipucu, tur sonu ve rekor,
// klavye, bozuk localStorage, mobil taşma, dış istek ve sayfa hatası.
const URL_PATH = '/oyunlar/farki-bul/?seed=7';

type Diff = { id: number; kind: string; x: number; y: number };
const info = (page: Page) => page.evaluate(() => (window as any).__farkTest());
const clickPanel = async (page: Page, panel: 'a' | 'b', x: number, y: number) => {
  const box = await page.locator(`#fb-${panel}`).boundingBox();
  await page.locator(`#fb-${panel}`).click({ position: { x: (x / 400) * box!.width, y: (y / 300) * box!.height } });
};

test.describe('Oyun: farkı bul', () => {
  test('sayfa açılır, iki sahne çizilir, 3 reklam ve 800+ kelime var, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#fb-a')).toBeVisible();
    await expect(page.locator('#fb-b')).toBeVisible();
    expect(await page.locator('#fb-a .fb-shape').count()).toBeGreaterThan(5);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('aynı tohum 5 farklı türde fark üretir ve yenilemede aynı sahneyi verir', async ({ page }) => {
    await page.goto(URL_PATH);
    const a = await info(page);
    expect(a.diffs).toHaveLength(5);
    expect(new Set(a.diffs.map((d: Diff) => d.kind)).size).toBe(5);
    await page.reload();
    const b = await info(page);
    expect(b.diffs.map((d: Diff) => [d.id, d.kind, Math.round(d.x), Math.round(d.y)])).toEqual(a.diffs.map((d: Diff) => [d.id, d.kind, Math.round(d.x), Math.round(d.y)]));
    await page.goto('/oyunlar/farki-bul/?seed=8');
    const c = await info(page);
    expect(JSON.stringify(c.diffs.map((d: Diff) => d.x))).not.toBe(JSON.stringify(a.diffs.map((d: Diff) => d.x)));
  });

  test('kancadan alınan konuma tıklayınca fark işaretlenir', async ({ page }) => {
    await page.goto(URL_PATH);
    const { diffs } = await info(page);
    await clickPanel(page, 'a', diffs[0].x, diffs[0].y);
    await expect(page.locator('#fb-found')).toHaveText('1 / 5');
    await expect(page.locator('.fb-found-mark')).toHaveCount(2);
    // Aynı farka tekrar tıklamak ceza vermez
    await clickPanel(page, 'b', diffs[0].x, diffs[0].y);
    await expect(page.locator('#fb-penalty')).toHaveText('0');
  });

  test('5 farkı bulunca tur biter, rekor yazılır ve sonraki tur başlar', async ({ page }) => {
    await page.goto(URL_PATH);
    const { diffs } = await info(page);
    for (const d of diffs) await clickPanel(page, 'b', d.x, d.y);
    await expect(page.locator('#fb-status')).toContainText('Tur tamamlandı');
    await expect(page.locator('#fb-status')).toContainText('Yeni rekor');
    const store = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-oyun-farki-bul') || '{}'));
    expect(store.best.orta).toBeGreaterThan(0);
    expect(store.rounds).toBe(1);
    await expect(page.locator('#fb-next')).toBeVisible();
    await page.locator('#fb-next').click();
    await expect(page.locator('#fb-round')).toHaveText('2');
    await expect(page.locator('#fb-found')).toHaveText('0 / 5');
  });

  test('yanlış tıklama 5 saniye ceza ekler', async ({ page }) => {
    await page.goto(URL_PATH);
    const { wrong } = await info(page);
    await clickPanel(page, 'a', wrong.x, wrong.y);
    await expect(page.locator('#fb-penalty')).toHaveText('5');
    await expect(page.locator('#fb-status')).toContainText('ceza');
    await expect(page.locator('#fb-found')).toHaveText('0 / 5');
  });

  test('ipucu bulunmamış farkı gösterir ve 10 saniye ceza ekler', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#fb-hint').click();
    await expect(page.locator('#fb-penalty')).toHaveText('10');
    await expect(page.locator('.fb-hint-mark')).toHaveCount(2);
    await expect(page.locator('#fb-hint')).toContainText('2 hak');
  });

  test('klavye: sağ resimdeki nesneye Tab ile gelip Enter ile fark bulunur', async ({ page }) => {
    await page.goto(URL_PATH);
    const { diffs } = await info(page);
    const g = page.locator(`#fb-b .fb-focus[data-id="${diffs[1].id}"]`);
    await g.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#fb-found')).toHaveText('1 / 5');
    // Fark olmayan nesne ceza getirir
    const other = await page.evaluate((ids) => {
      const all = Array.from(document.querySelectorAll('#fb-b .fb-focus')).map((e) => Number((e as HTMLElement).dataset.id));
      return all.find((i) => !ids.includes(i));
    }, diffs.map((d: Diff) => d.id));
    await page.locator(`#fb-b .fb-focus[data-id="${other}"]`).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#fb-penalty')).toHaveText('5');
  });

  test('zorluk değişince yeni tur başlar ve nesne sayısı artar', async ({ page }) => {
    await page.goto(URL_PATH);
    const before = await page.locator('#fb-a .fb-shape').count();
    await page.locator('#fb-level').selectOption('zor');
    await expect.poll(() => page.locator('#fb-a .fb-shape').count()).toBeGreaterThan(before);
    await page.locator('#fb-level').selectOption('kolay');
    await expect.poll(() => page.locator('#fb-a .fb-shape').count()).toBeLessThan(before);
  });

  test('bozuk localStorage oyunu çökertmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => localStorage.setItem('ba-oyun-farki-bul', '{{{bozuk'));
    await page.goto(URL_PATH);
    await expect(page.locator('#fb-best')).toHaveText('–');
    const { diffs } = await info(page);
    await clickPanel(page, 'a', diffs[0].x, diffs[0].y);
    await expect(page.locator('#fb-found')).toHaveText('1 / 5');
    expect(errors).toEqual([]);
  });

  test('360px genişlikte yatay taşma yok ve resimler alt alta durur', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const a = await page.locator('#fb-a').boundingBox();
    const b = await page.locator('#fb-b').boundingBox();
    expect(b!.y).toBeGreaterThan(a!.y + a!.height - 2);
    // Dokunmatik boyutta da fark bulunabilir
    const { diffs } = await info(page);
    await clickPanel(page, 'a', diffs[2].x, diffs[2].y);
    await expect(page.locator('#fb-found')).toHaveText('1 / 5');
  });
});
