import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL_PATH = '/hizli-okuma/';
const STORE = 'ba-hizli-okuma';
const T0 = new Date('2026-01-01T10:00:00+03:00');
// Test metnindeki doğru şıklar (tool.js ANSWERS ile aynı)
const CORRECT = [2, 0, 3, 1, 2];

/** Sahte saati kurar, sayfayı açar ve saati durdurur; zamanı yalnızca clock.runFor ilerletir. */
async function openPaused(page: Page) {
  await page.clock.install({ time: T0 });
  await page.goto(URL_PATH);
  await page.clock.pauseAt(new Date(T0.getTime() + 60_000));
}

const pos = (page: Page) => page.locator('#rs-pos').inputValue().then(Number);
const TEN = 'bir iki üç dört beş altı yedi sekiz dokuz on ';
const FORTY = TEN.repeat(4).trim();

test.describe('Hızlı Okuma', () => {
  test('sayfa şartları: içerik, SSS, reklam, JSON-LD, 360 px, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Hızlı Okuma');
    await expect(page.getByText('dosya yüklenmez').first()).toBeAttached();
    expect(await page.locator('.ba-content').evaluate((el) => (el.textContent || '').trim().split(/\s+/).length)).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);
    const ads = page.locator('.ba-ad[data-slot^="hizli-okuma-"]');
    expect(await ads.count()).toBe(3);
    expect(await ads.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot))).toEqual(['hizli-okuma-a', 'hizli-okuma-b', 'hizli-okuma-c']);
    const toolBottom = await page.locator('#rs-box').evaluate((el) => el.getBoundingClientRect().bottom + window.scrollY);
    const adTop = await ads.first().evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    expect(adTop).toBeGreaterThanOrEqual(toolBottom);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(ld.some((j) => j['@type'] === 'SoftwareApplication')).toBe(true);
    expect(ld.find((j) => j['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    // Uzun kelime 360 px'te taşma yaratmaz
    await page.locator('#rs-text').fill('Muvaffakiyetsizleştiricileştiriveremeyebileceklerimizdenmişsinizcesine');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ORP harfi işaretlenir ve kelime ortada gösterilir', async ({ page }) => {
    await openPaused(page);
    await page.locator('#rs-text').fill('merhaba dört a ekmek');
    await expect(page.locator('#rs-word')).toHaveText('merhaba');
    await expect(page.locator('#rs-o')).toHaveText('r');
    await expect(page.locator('#rs-l')).toHaveText('me');
    await expect(page.locator('#rs-r')).toHaveText('haba');
    await page.locator('#rs-fwd').click(); // 10 kelime ileri: son kelimeye sıkışır
    await expect(page.locator('#rs-word')).toHaveText('ekmek');
    await expect(page.locator('#rs-o')).toHaveText('k');
    await page.locator('#rs-back').click();
    await page.locator('#rs-text').fill('dört');
    await expect(page.locator('#rs-o')).toHaveText('ö');
    const color = await page.locator('#rs-o').evaluate((el) => getComputedStyle(el).color);
    const base = await page.locator('#rs-l').evaluate((el) => getComputedStyle(el).color);
    expect(color).not.toBe(base);
  });

  test('300 kelime/dk hızında 10 kelime yaklaşık 2 sn sürer; duraklat ve devam çalışır', async ({ page }) => {
    await openPaused(page);
    await page.locator('#rs-text').fill(FORTY);
    await expect(page.locator('#rs-wpm-out')).toHaveText('300 kelime/dk');
    await page.locator('#rs-play').click();
    await expect(page.locator('#rs-play')).toHaveText('Duraklat');
    await expect(page.locator('#rs-status')).toHaveText('Okunuyor');
    expect(await pos(page)).toBe(0);
    await page.clock.runFor(2000);
    const p1 = await pos(page);
    expect(p1).toBeGreaterThanOrEqual(9);
    expect(p1).toBeLessThanOrEqual(11);

    await page.locator('#rs-play').click();
    await expect(page.locator('#rs-status')).toHaveText('Duraklatıldı');
    await expect(page.locator('#rs-play')).toHaveText('Oynat');
    await page.clock.runFor(3000);
    expect(await pos(page)).toBe(p1);

    await page.locator('#rs-play').click();
    await page.clock.runFor(1000);
    const p2 = await pos(page);
    expect(p2 - p1).toBeGreaterThanOrEqual(4);
    expect(p2 - p1).toBeLessThanOrEqual(6);
    await expect(page.locator('#rs-info')).toContainText('kalan');
  });

  test('hız değişimi: ok tuşları ve kaydırıcı; 600 kelime/dk iki kat hızlıdır', async ({ page }) => {
    await openPaused(page);
    await page.locator('#rs-text').fill(FORTY);
    await page.locator('#rs-stage').focus();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('#rs-wpm-out')).toHaveText('350 kelime/dk');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#rs-wpm-out')).toHaveText('325 kelime/dk');
    await page.locator('#rs-wpm').fill('600');
    await expect(page.locator('#rs-wpm-out')).toHaveText('600 kelime/dk');
    await page.locator('#rs-play').click();
    await page.clock.runFor(1000);
    const p = await pos(page);
    expect(p).toBeGreaterThanOrEqual(9);
    expect(p).toBeLessThanOrEqual(11);
    // Sınırlar: 100-1000
    await page.locator('#rs-wpm').fill('1000');
    await expect(page.locator('#rs-wpm')).toHaveValue('1000');
    await page.locator('#rs-stage').focus();
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('#rs-wpm-out')).toHaveText('1000 kelime/dk');
  });

  test('klavye: Boşluk oynat/duraklat, oklar 10 kelime ileri/geri', async ({ page }) => {
    await openPaused(page);
    await page.locator('#rs-text').fill(FORTY);
    await page.locator('#rs-stage').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#rs-status')).toHaveText('Okunuyor');
    await page.keyboard.press('Space');
    await expect(page.locator('#rs-status')).toHaveText('Duraklatıldı');
    await page.keyboard.press('ArrowRight');
    expect(await pos(page)).toBe(10);
    await page.keyboard.press('ArrowRight');
    expect(await pos(page)).toBe(20);
    await page.keyboard.press('Shift+ArrowLeft');
    expect(await pos(page)).toBe(19);
    await page.locator('#rs-back').click();
    expect(await pos(page)).toBe(9);
    await page.locator('#rs-back').click();
    expect(await pos(page)).toBe(0);
    await page.locator('#rs-fwd').click();
    expect(await pos(page)).toBe(10);
    // Metin kutusunda yazarken Boşluk oynatmayı tetiklemez
    await page.locator('#rs-text').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#rs-status')).not.toHaveText('Okunuyor');
  });

  test('noktalama sonrası duraklama, parça parça modu ve karanlık arka plan', async ({ page }) => {
    await openPaused(page);
    await page.locator('#rs-text').fill('bir. iki üç dört');
    await page.locator('#rs-play').click();
    await page.clock.runFor(300); // 300 kelime/dk: normal kelime 200 ms; nokta sonrası 400 ms
    expect(await pos(page)).toBe(0);
    await page.clock.runFor(150);
    expect(await pos(page)).toBe(1);
    await page.locator('#rs-play').click();

    await page.locator('#rs-text').fill(FORTY);
    await page.locator('#rs-chunk').selectOption('3');
    await expect(page.locator('#rs-word')).toHaveText('bir iki üç');
    await page.locator('#rs-play').click();
    await page.clock.runFor(1250);
    const p = await pos(page);
    expect(p).toBeGreaterThanOrEqual(6);
    expect(p).toBeLessThanOrEqual(9);
    await expect(page.locator('#rs-o')).not.toHaveText('');

    await page.locator('#rs-dark').check();
    await expect(page.locator('#rs-stage')).toHaveClass(/is-dark/);
    expect(await page.locator('#rs-stage').evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(20, 22, 26)');
  });

  test('metin sonunda okuma biter; .txt yükleme ve hatalı dosya', async ({ page }) => {
    const external = trackExternalRequests(page);
    await openPaused(page);
    await page.locator('#rs-text').fill('');
    await page.locator('#rs-play').click();
    await expect(page.locator('#error')).toContainText('Okunacak metin yok');

    await page.locator('#rs-file').setInputFiles({ name: 'k.txt', mimeType: 'text/plain', buffer: Buffer.from('Işık çok güzel') });
    await expect(page.locator('#rs-text')).toHaveValue('Işık çok güzel');
    await page.locator('#rs-play').click();
    await page.clock.runFor(2000);
    await expect(page.locator('#rs-status')).toHaveText('Bitti');
    await expect(page.locator('#rs-play')).toHaveText('Baştan oku');
    await page.locator('#rs-file').setInputFiles({ name: 'belge.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', buffer: Buffer.from('PK') });
    await expect(page.locator('#error')).toContainText('.txt');
    expect(external).toEqual([]);
  });

  test('okuma hızı testi: KPM, anlama yüzdesi ve localStorage', async ({ page }) => {
    await openPaused(page);
    await page.locator('#tab-test').click();
    await page.locator('#rt-start').click();
    const words = await page.locator('#rt-passage').evaluate((el) => (el.textContent || '').trim().split(/\s+/).length);
    expect(words).toBe(200);
    await page.clock.runFor(60_000);
    await page.locator('#rt-done').click();
    await expect(page.locator('#rt-passage')).toHaveText('');
    await expect(page.locator('#rt-form fieldset')).toHaveCount(5);

    await page.locator('#rt-submit').click();
    await expect(page.locator('#error')).toContainText('beş soruyu da yanıtlayın');

    // 4 doğru, sonuncusu yanlış → %80
    for (let i = 0; i < 5; i++) {
      const choice = i === 4 ? (CORRECT[i] + 1) % 4 : CORRECT[i];
      await page.locator(`#q${i}-${choice}`).check();
    }
    await page.locator('#rt-submit').click();
    await expect(page.locator('#rt-result')).toBeVisible();
    expect(Number(await page.locator('#rt-kpm').textContent())).toBeGreaterThanOrEqual(195);
    expect(Number(await page.locator('#rt-kpm').textContent())).toBeLessThanOrEqual(205);
    await expect(page.locator('#rt-acc')).toHaveText('%80');
    expect(Number(await page.locator('#rt-eff').textContent())).toBeGreaterThanOrEqual(156);
    const stored = JSON.parse(await page.evaluate((k) => localStorage.getItem(k) || 'null', STORE));
    expect(Array.isArray(stored)).toBe(true);
    expect(stored).toHaveLength(1);
    expect(stored[0].acc).toBe(80);
    expect(stored[0].kpm).toBeGreaterThanOrEqual(195);
    await expect(page.locator('#rt-history li')).toHaveCount(1);

    // Çok kısa süre kaydedilmez
    await page.locator('#rt-retry').click();
    await page.locator('#rt-start').click();
    await page.clock.runFor(3000);
    await page.locator('#rt-done').click();
    for (let i = 0; i < 5; i++) await page.locator(`#q${i}-${CORRECT[i]}`).check();
    await page.locator('#rt-submit').click();
    await expect(page.locator('#rt-acc')).toHaveText('%100');
    await expect(page.locator('#rt-comment')).toContainText('kaydedilmedi');
    expect(JSON.parse(await page.evaluate((k) => localStorage.getItem(k) || '[]', STORE))).toHaveLength(1);
  });

  test('geçmişte yalnızca son 5 sonuç tutulur; geçmiş silinebilir', async ({ page }) => {
    await page.addInitScript((k) => {
      const list = Array.from({ length: 8 }, (_, i) => ({ date: '2026-01-0' + (i + 1) + 'T10:00:00.000Z', kpm: 200 + i, acc: 60, eff: 120 }));
      localStorage.setItem(k, JSON.stringify(list));
    }, STORE);
    await page.goto(URL_PATH);
    await page.locator('#tab-test').click();
    await expect(page.locator('#rt-history li')).toHaveCount(5);
    await expect(page.locator('#rt-history li').first()).toContainText('207');
    await page.locator('#rt-clear-history').click();
    await expect(page.locator('#rt-history-box')).toBeHidden();
    expect(await page.evaluate((k) => localStorage.getItem(k), STORE)).toBeNull();
  });

  test('bozuk localStorage verisi sayfayı çökertmez', async ({ browser, baseURL }) => {
    for (const bad of ['{bad', '[1,null,{"kpm":"x"}]', '{"results":"zz"}', 'null']) {
      const ctx = await browser.newContext({ baseURL });
      const page = await ctx.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [STORE, bad]);
      await page.goto(URL_PATH);
      await page.locator('#tab-test').click();
      await expect(page.locator('#rt-history-box')).toBeHidden();
      await page.locator('#tab-reader').click();
      await page.locator('#rs-sample').click();
      await expect(page.locator('#rs-word')).not.toHaveText('');
      expect(errors, bad).toEqual([]);
      await ctx.close();
    }
  });
});
