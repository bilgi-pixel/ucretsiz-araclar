import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Asteroit Avcısı: başlatma, duraklatma, dönüş/itki, ateş ve kaya parçalanması, çarpışma, seviye, rekor, bozuk kayıt, 360px, içerik.
// Fizik testleri oyunu duraklatıp test kancasının step() fonksiyonuyla belirleyici ilerler.
const URL_PATH = '/oyunlar/asteroit-avcisi/';
const KEY = 'ba-oyun-asteroit-avcisi';

type Snap = { phase: string; score: number; best: number; lives: number; level: number; x: number; y: number; a: number; vx: number; vy: number; invuln: number; kills: number; bullets: { x: number; y: number }[]; rocks: { x: number; y: number; size: number; r: number }[] };
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__asteroitTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__asteroitTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function open(page: Page) {
  await page.goto(URL_PATH);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'hazir');
  await expect(page.locator('#as-canvas')).toBeVisible();
}
async function startPaused(page: Page) {
  await page.locator('#as-canvas').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await page.keyboard.press('p');
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
}

test.describe('Asteroit Avcısı', () => {
  test('sayfa açılır; oyun hazır durumda, tuval 320x420; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Asteroit Avcısı');
    await expect(page.locator('#as-canvas')).toHaveAttribute('width', '320');
    await expect(page.locator('#as-canvas')).toHaveAttribute('height', '420');
    await expect(page.locator('#as-score')).toHaveText('0');
    await expect(page.locator('#as-lives')).toHaveText('3');
    await expect(page.locator('#as-start')).toHaveText('Başla');
    const s = await snap(page);
    expect(s.phase).toBe('hazir');
    expect(s.rocks.length).toBeGreaterThanOrEqual(3);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('boşlukla başlar, P ile duraklar ve devam eder, düğme metni değişir', async ({ page }) => {
    await open(page);
    await page.locator('#as-canvas').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#as-start')).toHaveText('Duraklat (P)');
    await page.keyboard.press('p');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
    await expect(page.locator('#as-start')).toHaveText('Devam et (P)');
    await page.keyboard.press('Space');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await page.locator('#as-start').click();
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'duraklat');
  });

  test('dönüş ve itki: sağ tuş açıyı artırır, itki geminin baktığı yöne hız verir, kenardan geçer', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setRocks', []);
    await call(page, 'patch', { x: 160, y: 210, a: -Math.PI / 2, vx: 0, vy: 0, invuln: 9999 });
    await call(page, 'setInput', false, true, false, false);
    let s = await call(page, 'step', 10);
    expect(s.a).toBeGreaterThan(-Math.PI / 2 + 0.5);
    await call(page, 'setInput', true, false, false, false);
    s = await call(page, 'step', 10);
    expect(s.a).toBeCloseTo(-Math.PI / 2, 1);
    await call(page, 'setInput', false, false, true, false);
    s = await call(page, 'step', 15);
    expect(s.vy).toBeLessThan(-1); // yukarı bakıyor: yukarı hız
    expect(Math.abs(s.vx)).toBeLessThan(0.3);
    await call(page, 'setInput', false, false, false, false);
    await call(page, 'patch', { x: 319, y: 210, vx: 5, vy: 0 });
    s = await call(page, 'step', 3);
    expect(s.x).toBeLessThan(40); // sağdan çıkıp soldan girdi
  });

  test('ateş: mermi çıkar, kayaya isabet edince kaya iki küçük parçaya ayrılır ve skor artar', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setRocks', [{ x: 160, y: 120, size: 3 }]);
    await call(page, 'patch', { x: 160, y: 330, a: -Math.PI / 2, vx: 0, vy: 0, invuln: 9999, cooldown: 0, score: 0, kills: 0 });
    await call(page, 'setInput', false, false, false, true);
    let s = await call(page, 'step', 1);
    expect(s.bullets.length).toBe(1);
    await call(page, 'setInput', false, false, false, false);
    s = await call(page, 'step', 40);
    expect(s.kills).toBe(1);
    expect(s.score).toBe(20);
    expect(s.rocks.length).toBe(2);
    expect(s.rocks.every((r: { size: number }) => r.size === 2)).toBe(true);
    await expect(page.locator('#as-score')).toHaveText('20');
  });

  test('çarpışma: can azalır ve gemi yeniden doğar; son canda oyun biter, rekor yazılır, Enter ile yeniden başlar', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'setRocks', [{ x: 160, y: 210, size: 2 }]);
    await call(page, 'patch', { x: 160, y: 210, invuln: 0, lives: 3, score: 120 });
    let s = await call(page, 'step', 1);
    expect(s.lives).toBe(2);
    expect(s.invuln).toBeGreaterThan(0); // doğuş sonrası dokunulmaz
    await call(page, 'setRocks', [{ x: 160, y: 210, size: 2 }]);
    await call(page, 'patch', { invuln: 0, lives: 1 });
    s = await call(page, 'step', 1);
    expect(s.phase).toBe('bitti');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc-skor')).toHaveText('120');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('#as-best')).toHaveText('120');
    await expect(page.locator('#as-again')).toBeFocused();
    expect(await stored(page)).toEqual({ best: 120 });
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    await expect(page.locator('#as-score')).toHaveText('0');
    await expect(page.locator('#as-lives')).toHaveText('3');
    await page.reload();
    await expect(page.locator('#as-best')).toHaveText('120');
    await page.locator('#as-reset').click();
    await expect(page.locator('#as-best')).toHaveText('0');
  });

  test('tüm kayalar temizlenince yeni seviye başlar ve daha çok kaya gelir', async ({ page }) => {
    await open(page);
    await startPaused(page);
    await call(page, 'patch', { invuln: 9999 });
    await call(page, 'setRocks', []);
    const s = await call(page, 'step', 1);
    expect(s.level).toBe(2);
    expect(s.rocks.length).toBe(4);
    await expect(page.locator('#as-level')).toHaveText('2');
  });

  test('dokunmatik: ateş düğmesi basılı tutulunca oyun başlar ve mermi çıkar; itki düğmesi gemiyi hareket ettirir', async ({ page }) => {
    await open(page);
    await page.locator('#as-fire').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const fire = (await page.locator('#as-fire').boundingBox())!;
    await page.mouse.move(fire.x + fire.width / 2, fire.y + fire.height / 2);
    await page.mouse.down();
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect.poll(async () => (await snap(page)).bullets.length).toBeGreaterThan(0);
    await page.mouse.up();
    const before = await snap(page);
    const up = (await page.locator('#as-up').boundingBox())!;
    await page.mouse.move(up.x + up.width / 2, up.y + up.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(250);
    await page.mouse.up();
    const after = await snap(page);
    expect(Math.hypot(after.vx, after.vy)).toBeGreaterThan(0.3);
    expect(after.phase === 'oyun' || after.phase === 'bitti').toBe(true);
    expect(before.phase).toBe('oyun');
  });

  test('bozuk localStorage ve kapalı depolama çökertmez', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":"z"}', '{"best":-4}', '{"best":1.5}', '{"best":1e12}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#as-best')).toHaveText('0');
      await page.locator('#as-start').click();
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
    await call(page, 'setRocks', [{ x: 160, y: 210, size: 2 }]);
    await call(page, 'patch', { invuln: 0, lives: 1, score: 20 });
    await call(page, 'step', 1);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('360px: yatay taşma yok, tuval ve dört düğme ekrana sığar, düğmeler dokunmaya yeterli', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const c = (await page.locator('#as-canvas').boundingBox())!;
    expect(c.x).toBeGreaterThanOrEqual(0);
    expect(c.x + c.width).toBeLessThanOrEqual(360);
    for (const id of ['as-left', 'as-up', 'as-right', 'as-fire']) {
      const b = (await page.locator(`#${id}`).boundingBox())!;
      expect(b.height).toBeGreaterThanOrEqual(44);
      expect(b.width).toBeGreaterThanOrEqual(44);
      expect(b.x + b.width).toBeLessThanOrEqual(360);
    }
    await startPaused(page);
    await call(page, 'setRocks', [{ x: 160, y: 210, size: 2 }]);
    await call(page, 'patch', { invuln: 0, lives: 1 });
    await call(page, 'step', 1);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-asteroit-avcisi-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-asteroit-avcisi-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/asteroit-avcisi/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
  });
});
