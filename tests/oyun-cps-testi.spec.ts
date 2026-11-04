import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// CPS Testi: süre modları, CPS hesabı, boşluk modu, sentetik olay süzme, rekor kaydı, içerik ve mobil.
const URL_PATH = '/oyunlar/cps-testi/';
const STORE_KEY = 'ba-oyun-cps-testi';

const pad = (page: Page) => page.locator('#pad');
const attr = async (page: Page, a: string) => (await pad(page).getAttribute(`data-${a}`)) || '';

/** Sahte saati kurar: zaman yalnızca page.clock.runFor ile ilerler. */
async function openClocked(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.clock.install({ time: 0 });
  await page.goto(URL_PATH);
  await page.clock.pauseAt(10_000);
  await expect(pad(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}
async function padCenter(page: Page) {
  await pad(page).evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
  const b = await pad(page).boundingBox();
  expect(b).not.toBeNull();
  return { x: b!.x + b!.width / 2, y: b!.y + b!.height / 2 };
}
/** n tıklama, her biri arasında gapMs sahte milisaniye. */
async function clickN(page: Page, n: number, gapMs: number) {
  const { x, y } = await padCenter(page);
  for (let i = 0; i < n; i++) {
    await page.mouse.click(x, y);
    await page.clock.runFor(gapMs);
  }
}

test.describe('CPS Testi', () => {
  test('sayfa açılır; ≥800 kelime, 3 reklam (oyun kutusunun dışında), SSS ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('CPS Testi');
    await expect(page).toHaveTitle(/CPS Testi Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-cps-testi-a', 'oyun-cps-testi-b', 'oyun-cps-testi-c']);
    const placement = await page.evaluate(() => {
      const box = document.getElementById('game-box')!;
      const a = document.querySelector('.ba-ad[data-slot$="-a"]')!;
      return {
        insideBox: Array.from(document.querySelectorAll('.ba-ad')).some((ad) => box.contains(ad)),
        aAfterBox: !!(box.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING),
      };
    });
    expect(placement).toEqual({ insideBox: false, aAfterBox: true });

    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    expect(ld['@graph'].map((n: { '@type': string }) => n['@type'])).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('5 sn modu: 20 tıklama = 4.00 CPS; süre sonunda sonuç, seviye etiketi ve en iyi skor yazılır', async ({ page }) => {
    const errors = await openClocked(page);
    await clickN(page, 20, 240);
    expect(await attr(page, 'state')).toBe('sayiyor');
    expect(await attr(page, 'clicks')).toBe('20');
    await page.clock.runFor(600);
    await expect(pad(page)).toHaveAttribute('data-state', 'bitti');
    expect(await attr(page, 'cps')).toBe('4.00');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#res-line')).toContainText('5 saniyede 20 tıklama = 4.00 CPS');
    await expect(page.locator('#res-level')).toContainText('Normal');
    await expect(page.locator('#res-title')).toHaveText('Yeni en iyi skor!');
    await expect(page.locator('#best')).toHaveText('4.00');
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['5']).toBe(4);

    // Süre bittikten sonra tıklamalar sayılmaz
    const { x, y } = await padCenter(page);
    await page.mouse.click(x, y);
    expect(await attr(page, 'clicks')).toBe('20');
    expect(errors).toEqual([]);
  });

  test('canlı CPS ve kalan süre güncellenir; daha düşük skor rekoru ezmez, sıfırla yeni tur başlatır', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, JSON.stringify({ best: { 1: 6 } })), STORE_KEY);
    await openClocked(page);
    await page.locator("#modes [data-mode=\"1\"]").click();
    await expect(page.locator('#best')).toHaveText('6.00');
    await expect(page.locator('#time')).toHaveText('1.0');
    await clickN(page, 3, 100);
    await expect(page.locator('#clicks')).toHaveText('3');
    await expect.poll(async () => Number(await page.locator('#cps').innerText())).toBeGreaterThan(0);
    await expect.poll(async () => Number(await page.locator('#time').innerText())).toBeLessThan(1);
    await page.clock.runFor(900);
    await expect(pad(page)).toHaveAttribute('data-state', 'bitti');
    expect(await attr(page, 'cps')).toBe('3.00');
    await expect(page.locator('#res-title')).toHaveText('Süre doldu');
    await expect(page.locator('#best')).toHaveText('6.00');

    await page.locator('#btn-reset').click();
    await expect(pad(page)).toHaveAttribute('data-state', 'hazir');
    await expect(page.locator('#clicks')).toHaveText('0');
    await expect(page.locator('#result')).toBeHidden();
  });

  test('süre modu değişince sayaç sıfırlanır ve seçili düğme işaretlenir', async ({ page }) => {
    await openClocked(page);
    for (const m of [1, 10, 30, 60]) {
      await page.locator(`#modes [data-mode="${m}"]`).click();
      await expect(page.locator(`#modes [data-mode="${m}"]`)).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('#time')).toHaveText(`${m}.0`);
      expect(await attr(page, 'mode')).toBe(String(m));
    }
  });

  test('boşluk tuşu modu: her basış sayılır, tuşu basılı tutmak (otomatik tekrar) sayılmaz', async ({ page }) => {
    await openClocked(page);
    await page.locator("#inputs [data-input=\"space\"]").click();
    await expect(pad(page)).toBeFocused();
    expect(await attr(page, 'input')).toBe('space');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Space');
      await page.clock.runFor(100);
    }
    expect(await attr(page, 'clicks')).toBe('8');
    await page.keyboard.down('Space');
    await page.keyboard.down('Space');
    await page.keyboard.down('Space');
    await page.keyboard.up('Space');
    expect(await attr(page, 'clicks')).toBe('9');
    // Boşluk modunda fare tıklaması sayılmaz
    const { x, y } = await padCenter(page);
    await page.mouse.click(x, y);
    expect(await attr(page, 'clicks')).toBe('9');
  });

  test('betikle üretilen sentetik olaylar sayılmaz', async ({ page }) => {
    await openClocked(page);
    await page.evaluate(() => {
      const p = document.getElementById('pad')!;
      for (let i = 0; i < 5; i++) p.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, isPrimary: true, pointerType: 'mouse', button: 0, bubbles: true }));
      p.click();
    });
    expect(await attr(page, 'clicks')).toBe('0');
    expect(await attr(page, 'state')).toBe('hazir');
  });

  test('bozuk ya da insan dışı localStorage değeri çökertmez, yok sayılır', async ({ page }) => {
    await page.addInitScript((k) => { if (!sessionStorage.getItem('seeded')) { sessionStorage.setItem('seeded', '1'); localStorage.setItem(k, '{bozuk json'); } }, STORE_KEY);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('#best')).toHaveText('–');
    await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ best: { 5: 99 } })), STORE_KEY);
    await page.reload();
    await expect(page.locator('#best')).toHaveText('–');
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, tıklama alanı sığar, dokunmatik ile sayılır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await openClocked(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await pad(page).evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    const b = await pad(page).boundingBox();
    expect(b!.width).toBeLessThanOrEqual(360);
    expect(b!.height).toBeGreaterThanOrEqual(200);
    await clickN(page, 3, 100);
    expect(await attr(page, 'clicks')).toBe('3');
    expect(errors).toEqual([]);
  });
});
