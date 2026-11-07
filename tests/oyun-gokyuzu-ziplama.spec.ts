import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Gökyüzü Zıplama: başlatma, duraklatma, fizik (zıplama, kenardan geçme), skor, oyun sonu, rekor kaydı, bozuk kayıt, 360px ve içerik denetimleri.
// Fizik testleri oyunu duraklatıp test kancasının step() fonksiyonuyla belirleyici (deterministik) ilerler.
const URL_PATH = '/oyunlar/gokyuzu-ziplama/';
const KEY = 'ba-oyun-gokyuzu-ziplama';

type Snap = { phase: string; score: number; best: number; px: number; py: number; vx: number; vy: number; jumps: number; platforms: { x: number; y: number; w: number; moving: boolean }[] };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__gokyuzuTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__gokyuzuTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'hazir');
  await expect(page.locator('#gz-canvas')).toBeVisible();
}
/** Oyunu klavyeyle başlatır ve hemen duraklatır; sonrası step() ile ilerletilir. */
async function startPaused(page: Page) {
  await page.locator('#gz-canvas').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await page.keyboard.press('p');
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
}

test.describe('Gökyüzü Zıplama', () => {
  test('sayfa açılır; oyun hazır durumda, tuval 320x480; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Gökyüzü Zıplama');
    await expect(page.locator('#gz-canvas')).toHaveAttribute('width', '320');
    await expect(page.locator('#gz-canvas')).toHaveAttribute('height', '480');
    await expect(page.locator('#gz-score')).toHaveText('0');
    await expect(page.locator('#gz-start')).toHaveText('Başla');
    const s = await snap(page);
    expect(s.phase).toBe('hazir');
    expect(s.platforms.length).toBeGreaterThan(5);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('boşlukla başlar, P ile duraklar ve devam eder, düğme metni değişir', async ({ page }) => {
    await open(page);
    await page.locator('#gz-canvas').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#gz-start')).toHaveText('Duraklat (P)');
    await page.keyboard.press('p');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
    await expect(page.locator('#gz-start')).toHaveText('Devam et (P)');
    await page.keyboard.press('Space');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await page.locator('#gz-start').click();
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
  });

  test('fizik: top platforma düşünce zıplar, havada yerçekimiyle yavaşlar', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setPlatforms', [{ x: 130, y: 400 }]);
    await call(page, 'patch', { px: 160, py: 330, vx: 0, vy: 4, jumps: 0 });
    let s = await snap(page);
    const j0 = s.jumps;
    s = await call(page, 'step', 20);
    expect(s.jumps).toBe(j0 + 1);
    expect(s.vy).toBeLessThan(0); // zıplama sonrası yukarı
    const before = s.vy;
    s = await call(page, 'step', 3);
    expect(s.vy).toBeGreaterThan(before); // yerçekimi yavaşlatır
    // platformu ıskalarsa zıplamaz
    await call(page, 'setPlatforms', [{ x: 0, y: 400 }]);
    await call(page, 'patch', { px: 300, py: 330, vx: 0, vy: 4, jumps: 0 });
    s = await call(page, 'step', 15);
    expect(s.jumps).toBe(0);
  });

  test('yön girdisi: sağ tuş topu sağa, sol tuş sola götürür; kenardan çıkan karşıdan girer', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'patch', { px: 160, py: 200, vx: 0, vy: 0 });
    await call(page, 'setInput', false, true);
    let s = await call(page, 'step', 10);
    expect(s.px).toBeGreaterThan(170);
    await call(page, 'setInput', true, false);
    const x1 = s.px;
    s = await call(page, 'step', 20);
    expect(s.px).toBeLessThan(x1);
    await call(page, 'setInput', false, false);
    await call(page, 'patch', { px: 330, vx: 5, py: 200, vy: 0 });
    s = await call(page, 'step', 1);
    expect(s.px).toBeLessThan(0); // sağdan çıktı, soldan girdi
    // gerçek klavye tuşu (basılı tutma) da yön verir
    await call(page, 'patch', { px: 100, vx: 0, py: 200, vy: 0 });
    await page.locator('#gz-canvas').focus();
    await page.keyboard.down('ArrowRight');
    s = await call(page, 'step', 8);
    await page.keyboard.up('ArrowRight');
    expect(s.px).toBeGreaterThan(100);
  });

  test('skor: top yükseldikçe artar ve platformlar yeniden üretilir', async ({ page }) => {
    await open(page);
    await startPaused(page);
    const s0 = await snap(page);
    expect(s0.score).toBe(0);
    await call(page, 'patch', { py: 150, vy: -12 });
    const s = await call(page, 'step', 5);
    expect(s.score).toBeGreaterThan(0);
    await expect(page.locator('#gz-score')).toHaveText(String(s.score));
    const tops = s.platforms.map((p: { y: number }) => p.y);
    expect(Math.min(...tops)).toBeLessThan(0 + 5); // üst tarafta yeni platform var
    // ardışık platformlar arası boşluk zıplama yüksekliğinden (~141 px) küçük
    const ys = [...tops].sort((a, b) => a - b);
    for (let i = 1; i < ys.length; i++) expect(ys[i] - ys[i - 1]).toBeLessThan(135);
  });

  test('oyun sonu: düşünce sonuç kutusu, rekor kaydı ve Tekrar oyna', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'patch', { climbed: 500, score: 100 });
    await call(page, 'patch', { py: 600, vy: 5 });
    const s = await call(page, 'step', 1);
    expect(s.phase).toBe('bitti');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-skor')).toHaveText('100');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#gz-best')).toHaveText('100');
    await expect(page.locator('#gz-again')).toBeFocused();
    expect(await stored(page)).toEqual({ best: 100 });
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    await expect(page.locator('#gz-score')).toHaveText('0');
    await page.reload();
    await expect(page.locator('#gz-best')).toHaveText('100');
    // daha düşük skor rekoru ezmez
    await page.locator('#gz-start').click();
    await page.keyboard.press('p');
    await call(page, 'patch', { climbed: 50, score: 10, py: 600, vy: 5 });
    await call(page, 'step', 1);
    await expect(page.locator('#sonuc-rekor')).toBeHidden();
    expect(await stored(page)).toEqual({ best: 100 });
    await page.locator('#gz-reset').click();
    await expect(page.locator('#gz-best')).toHaveText('0');
  });

  test('dokunmatik düğme basılı tutulunca top o yöne gider (gerçek döngü)', async ({ page }) => {
    await open(page);
    const x0 = (await snap(page)).px;
    await page.locator('#gz-right').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const btn = (await page.locator('#gz-right').boundingBox())!;
    await page.mouse.move(btn.x + btn.width / 2, btn.y + btn.height / 2);
    await page.mouse.down();
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await page.waitForTimeout(250);
    await page.mouse.up();
    const s = await snap(page);
    expect(s.px).toBeGreaterThan(x0 + 5);
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z"}', '{"best":-4}', '{"best":1.5}', '{"best":1e12}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#gz-best')).toHaveText('0');
      await page.locator('#gz-start').click();
      expect(errors).toEqual([]);
      await page.close();
    }
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => { throw new Error('depolama kapalı'); };
      Storage.prototype.setItem = () => { throw new Error('depolama kapalı'); };
    });
    await open(page);
    await startPaused(page);
    await call(page, 'patch', { climbed: 100, score: 20, py: 600, vy: 5 });
    await call(page, 'step', 1);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, tuval ve yön düğmeleri ekrana sığar, düğmeler dokunmaya yeterli', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const c = (await page.locator('#gz-canvas').boundingBox())!;
    expect(c.x).toBeGreaterThanOrEqual(0);
    expect(c.x + c.width).toBeLessThanOrEqual(360);
    const l = (await page.locator('#gz-left').boundingBox())!;
    const r = (await page.locator('#gz-right').boundingBox())!;
    expect(l.height).toBeGreaterThanOrEqual(44);
    expect(r.width).toBeGreaterThanOrEqual(80);
    await startPaused(page);
    await call(page, 'patch', { py: 600, vy: 5 });
    await call(page, 'step', 1);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-gokyuzu-ziplama-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-gokyuzu-ziplama-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/gokyuzu-ziplama/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
