import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Sayı Tahmin Oyunu: ipuçları, kazanma, doğrulama, özel aralık, ters mod (ikili arama), süreli mod, mobil, dış istek.
const URL_PATH = '/oyunlar/sayi-tahmin/';
const STORE = 'ba-oyun-sayi-tahmin';

async function open(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(page.locator('#sy-input')).toBeVisible();
  return { external, errors };
}

const setRadio = (page: Page, name: string, value: string) => page.locator(`input[name="${name}"][value="${value}"]`).check();
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);

type Step = { g: number; dir: string | null; text: string };

/** Ben tahmin edeyim modunda ikili aramayla oynar; ipucu yönüne göre aralığı daraltır. */
async function solveByHints(page: Page, min: number, max: number): Promise<Step[]> {
  const steps: Step[] = [];
  let lo = min;
  let hi = max;
  for (let i = 0; i < 60; i++) {
    const g = Math.floor((lo + hi) / 2);
    await page.locator('#sy-input').fill(String(g));
    await page.locator('#sy-input').press('Enter');
    const dir = await page.locator('#sy-hint').getAttribute('data-dir');
    const text = (await page.locator('#sy-hint').textContent()) || '';
    steps.push({ g, dir, text });
    if (dir === 'win') return steps;
    if (dir === 'up') lo = g + 1;
    else if (dir === 'down') hi = g - 1;
    else throw new Error('Beklenmeyen ipucu: ' + text);
    if (lo > hi) throw new Error('Aralık tükendi; ipuçları tutarsız: ' + JSON.stringify(steps));
  }
  throw new Error('Sayı bulunamadı');
}

/** Tüm ipuçlarının gizli sayıya (= son doğru tahmin) göre doğru olduğunu doğrular. */
function expectHintsConsistent(steps: Step[]) {
  const secret = steps[steps.length - 1].g;
  for (const s of steps.slice(0, -1)) {
    if (s.g < secret) {
      expect(s.dir, `${s.g} < ${secret}`).toBe('up');
      expect(s.text).toMatch(/^Daha büyük/);
    } else {
      expect(s.dir, `${s.g} > ${secret}`).toBe('down');
      expect(s.text).toMatch(/^Daha küçük/);
    }
  }
}

const maxBinary = (n: number) => Math.floor(Math.log2(n)) + 1;

test.describe('Oyun: Sayı Tahmin Oyunu', () => {
  test('sayfa açılır; h1, içerik, 3 reklam ve JSON-LD tamam; dış istek ve sayfa hatası yok', async ({ page }) => {
    const { external, errors } = await open(page);
    await expect(page.locator('h1')).toContainText('Sayı Tahmin Oyunu');
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(6);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-sayi-tahmin-a', 'oyun-sayi-tahmin-b', 'oyun-sayi-tahmin-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const box = await page.locator('.game-box').boundingBox();
    const ad = await page.locator('.ba-ad').first().boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(box!.y + box!.height);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(raw || '{}')['@graph'];
    expect(graph.find((n: { '@type': string }) => n['@type'] === 'VideoGame').applicationCategory).toBe('Game');
    expect(graph.find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ipuçları doğru: ikili aramayla 1-100 aralığında en fazla 7 denemede kazanılır; skor ve en iyi kaydedilir', async ({ page }) => {
    test.setTimeout(120_000); // yoğun makinede 4 oyun x ~7 etkileşim
    const { external, errors } = await open(page);
    const tries: number[] = [];
    for (let game = 0; game < 4; game++) {
      if (game > 0) await page.locator('#sy-new').click();
      await expect(page.locator('#sy-attempts')).toHaveText('0');
      const steps = await solveByHints(page, 1, 100);
      expect(steps.length).toBeLessThanOrEqual(maxBinary(100)); // 7
      expectHintsConsistent(steps);
      const n = steps.length;
      tries.push(n);
      await expect(page.locator('#sy-attempts')).toHaveText(String(n));
      await expect(page.locator('#sy-hint')).toContainText('Tebrikler');
      await expect(page.locator('#sy-hint')).toContainText(`${steps[n - 1].g} sayısını ${n} denemede buldun`);
      await expect(page.locator('#sy-input')).toBeDisabled(); // oyun bitti
      await expect(page.locator('#sy-best')).toHaveText(`${Math.min(...tries)} deneme`);
    }
    const s = await stored(page);
    expect(s.best['1-100']).toBe(Math.min(...tries));
    expect(s.played).toBe(4);
    expect(s.won).toBe(4);
    // Yenilemede en iyi skor korunur
    await page.reload();
    await expect(page.locator('#sy-best')).toHaveText(`${Math.min(...tries)} deneme`);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('geçersiz ve tekrarlanan tahminler deneme sayılmaz; hata Türkçe ve çözüm önerir', async ({ page }) => {
    await open(page);
    const input = page.locator('#sy-input');
    const err = page.locator('#sy-error');
    for (const bad of ['abc', '0', '101', '12.5', '']) {
      await input.fill(bad);
      await input.press('Enter');
      await expect(err).toBeVisible();
      await expect(err).toContainText('1 ile 100 arasında bir tam sayı');
      await expect(page.locator('#sy-attempts')).toHaveText('0');
    }
    // Geçerli bir tahmin hatayı temizler ve sayılır (sayı 50 ise oyun biter; o durumda yeniden başlatıp devam ederiz)
    await input.fill('50');
    await input.press('Enter');
    if ((await page.locator('#sy-hint').getAttribute('data-dir')) === 'win') {
      await page.locator('#sy-new').click();
      await input.fill('50');
      await input.press('Enter');
    }
    await expect(page.locator('#sy-attempts')).toHaveText(/^[12]$/);
    const before = await page.locator('#sy-attempts').textContent();
    await expect(err).toBeHidden();
    if ((await page.locator('#sy-hint').getAttribute('data-dir')) !== 'win') {
      await input.fill('50');
      await input.press('Enter');
      await expect(err).toContainText('zaten denedin');
      await expect(page.locator('#sy-attempts')).toHaveText(before!);
    }
  });

  test('1-1000 aralığı: en fazla 10 denemede kazanılır, en iyi skor aralığa özeldir', async ({ page }) => {
    test.setTimeout(120_000);
    await open(page);
    await setRadio(page, 'sy-range', '1000');
    await expect(page.locator('#sy-range-info')).toContainText('1 ile 1.000 arasında');
    await expect(page.locator('#sy-info')).toContainText('en fazla 10 denemede');
    const steps = await solveByHints(page, 1, 1000);
    expect(steps.length).toBeLessThanOrEqual(maxBinary(1000)); // 10
    expectHintsConsistent(steps);
    const s = await stored(page);
    expect(s.best['1-1000']).toBe(steps.length);
    expect(s.best['1-100']).toBeUndefined();
  });

  test('özel aralık: geçerli aralıkta oynanır, geçersiz sınırlar Türkçe hata verir', async ({ page }) => {
    await open(page);
    await setRadio(page, 'sy-range', 'custom');
    await expect(page.locator('#sy-custom')).toBeVisible();
    await page.locator('#sy-min').fill('10');
    await page.locator('#sy-max').fill('20');
    await page.locator('#sy-new').click();
    await expect(page.locator('#sy-error')).toBeHidden();
    await expect(page.locator('#sy-range-info')).toContainText('10 ile 20 arasında');
    // Aralık dışı tahmin reddedilir
    await page.locator('#sy-input').fill('9');
    await page.locator('#sy-input').press('Enter');
    await expect(page.locator('#sy-error')).toContainText('10 ile 20 arasında');
    await expect(page.locator('#sy-attempts')).toHaveText('0');
    const steps = await solveByHints(page, 10, 20);
    expect(steps.length).toBeLessThanOrEqual(maxBinary(11)); // 4
    expectHintsConsistent(steps);
    expect((await stored(page)).best['10-20']).toBe(steps.length);

    // Geçersiz: alt >= üst
    await page.locator('#sy-min').fill('30');
    await page.locator('#sy-max').fill('20');
    await page.locator('#sy-new').click();
    await expect(page.locator('#sy-error')).toContainText('Alt sınır üst sınırdan küçük olmalı');
    // Geçersiz: boş
    await page.locator('#sy-min').fill('');
    await page.locator('#sy-new').click();
    await expect(page.locator('#sy-error')).toContainText('iki tam sayı');
  });

  test('ters mod: bilgisayar 73\'ü ikili aramayla en fazla 7 denemede bulur (düğmelerle)', async ({ page }) => {
    const { external, errors } = await open(page);
    await setRadio(page, 'sy-mode', 'reverse');
    await expect(page.locator('#sy-reverse-panel')).toBeVisible();
    await expect(page.locator('#sy-guess-panel')).toBeHidden();
    await page.locator('#sy-rev-start').click();
    await expect(page.locator('#sy-cpu-guess')).toHaveText('50'); // ilk tahmin ortadan
    const secret = 73;
    const seen: number[] = [];
    for (let i = 0; i < 12; i++) {
      const g = Number(((await page.locator('#sy-cpu-guess').textContent()) || '').replace(/\./g, ''));
      seen.push(g);
      if (g === secret) { await page.locator('#sy-correct').click(); break; }
      await page.locator(g < secret ? '#sy-higher' : '#sy-lower').click();
    }
    expect(seen).toEqual([50, 75, 62, 68, 71, 73]);
    expect(seen.length).toBeLessThanOrEqual(7);
    await expect(page.locator('#sy-rv-attempts')).toHaveText(String(seen.length));
    await expect(page.locator('#sy-rv-msg')).toContainText(`Bilgisayar ${seen.length} denemede buldu`);
    // Bitti: yön düğmeleri kilitli
    await expect(page.locator('#sy-higher')).toBeDisabled();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ters mod: 1-100 içindeki her sayı en fazla 7, 1-1000 içindeki her sayı en fazla 10 denemede bulunur', async ({ page }) => {
    test.setTimeout(120_000);
    await open(page);
    await setRadio(page, 'sy-mode', 'reverse');
    const run = () => page.evaluate(() => {
      const $ = (id: string) => document.getElementById(id) as HTMLElement;
      const click = (id: string) => $(id).click();
      const parse = () => Number(($('sy-cpu-guess').textContent || '').replace(/\./g, ''));
      let worst = 0;
      const failures: number[] = [];
      const radio = document.querySelector('input[name="sy-range"]:checked') as HTMLInputElement;
      const max = radio.value === '1000' ? 1000 : 100;
      for (let secret = 1; secret <= max; secret++) {
        click('sy-new');
        click('sy-rev-start');
        let tries = 0;
        for (let i = 0; i < 40; i++) {
          const g = parse();
          tries++;
          if (g === secret) { click('sy-correct'); break; }
          click(g < secret ? 'sy-higher' : 'sy-lower');
        }
        if (Number($('sy-rv-attempts').textContent) !== tries) failures.push(secret);
        if (!($('sy-rv-msg').textContent || '').includes('denemede buldu')) failures.push(-secret);
        worst = Math.max(worst, tries);
      }
      return { worst, failures };
    });
    const r100 = await run();
    expect(r100.failures).toEqual([]);
    expect(r100.worst).toBeLessThanOrEqual(7);
    await setRadio(page, 'sy-range', '1000');
    const r1000 = await run();
    expect(r1000.failures).toEqual([]);
    expect(r1000.worst).toBeLessThanOrEqual(10);
  });

  test('ters mod: çelişkili cevaplar uyarılır, "Son cevabı geri al" düzeltir', async ({ page }) => {
    await open(page);
    await setRadio(page, 'sy-mode', 'reverse');
    await page.locator('#sy-rev-start').click();
    // Hep "daha büyük" demek 100'den sonra imkânsızdır: 50, 75, 88, 94, 97, 99, 100
    for (let i = 0; i < 6; i++) await page.locator('#sy-higher').click();
    await expect(page.locator('#sy-cpu-guess')).toHaveText('100');
    await expect(page.locator('#sy-rv-msg')).toContainText('"Doğru" de');
    await page.locator('#sy-higher').click();
    await expect(page.locator('#sy-error')).toBeVisible();
    await expect(page.locator('#sy-error')).toContainText('çelişiyor');
    await expect(page.locator('#sy-error')).toContainText('geri al');
    await expect(page.locator('#sy-correct')).toBeDisabled();
    await page.locator('#sy-undo').click();
    await expect(page.locator('#sy-error')).toBeHidden();
    await expect(page.locator('#sy-cpu-guess')).toHaveText('100');
    await expect(page.locator('#sy-correct')).toBeEnabled();
  });

  test('süreli mod: süre ilk tahminle başlar, dolunca oyun biter ve sayı gösterilir', async ({ page }) => {
    await page.clock.install();
    const { errors } = await open(page);
    await page.locator('#sy-timed').check();
    await page.locator('#sy-time').selectOption('30');
    await expect(page.locator('#sy-timer-box')).toBeVisible();
    await expect(page.locator('#sy-timer')).toHaveText('30 sn');
    // 50 doğru çıkarsa oyun biter; yeniden başlat ve tekrar dene
    for (let i = 0; i < 5; i++) {
      await page.locator('#sy-input').fill('50');
      await page.locator('#sy-input').press('Enter');
      if ((await page.locator('#sy-hint').getAttribute('data-dir')) !== 'win') break;
      await page.locator('#sy-new').click();
    }
    await expect(page.locator('#sy-attempts')).toHaveText('1');
    await page.clock.runFor(10_000);
    await expect(page.locator('#sy-timer')).toHaveText(/^(19|20) sn$/);
    await expect(page.locator('#sy-input')).toBeEnabled();
    await page.clock.runFor(25_000);
    await expect(page.locator('#sy-hint')).toContainText('Süre doldu');
    await expect(page.locator('#sy-hint')).toContainText('Aranan sayı');
    await expect(page.locator('#sy-input')).toBeDisabled();
    const s = await stored(page);
    expect(s.timeouts).toBe(1);
    expect(s.best['1-100']).toBeUndefined(); // süre bitince skor kaydedilmez
    expect(errors).toEqual([]);
  });

  test('ayarlar yenilemede korunur', async ({ page }) => {
    await open(page);
    await setRadio(page, 'sy-mode', 'reverse');
    await setRadio(page, 'sy-range', '1000');
    await page.reload();
    await expect(page.locator('input[name="sy-mode"][value="reverse"]')).toBeChecked();
    await expect(page.locator('input[name="sy-range"][value="1000"]')).toBeChecked();
    await expect(page.locator('#sy-reverse-panel')).toBeVisible();
    await expect(page.locator('#sy-rev-start')).toContainText('1 – 1.000');
  });

  test('360px genişlikte yatay taşma yok (iki mod, özel aralık, süreli)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await setRadio(page, 'sy-range', 'custom');
    await page.locator('#sy-timed').check();
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.locator('#sy-input').fill('50');
    await page.locator('#sy-input').press('Enter');
    expect(await overflow()).toBeLessThanOrEqual(0);
    await setRadio(page, 'sy-mode', 'reverse');
    await page.locator('#sy-rev-start').click();
    await page.locator('#sy-higher').click();
    expect(await overflow()).toBeLessThanOrEqual(0);
    for (const id of ['sy-higher', 'sy-lower', 'sy-correct', 'sy-undo']) {
      const b = await page.locator('#' + id).boundingBox();
      expect(b!.x + b!.width, id).toBeLessThanOrEqual(360);
    }
  });
});
