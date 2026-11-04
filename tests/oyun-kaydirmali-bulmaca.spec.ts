import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';

// Kaydırmalı Sayı Bulmacası doğrulaması: çözülebilir karıştırma, hamle sayacı, süre, en iyi süre,
// çözüm animasyonu, resimli mod, hatalı dosya, mobil taşma, dış istek yok.
const URL_PATH = '/oyunlar/kaydirmali-bulmaca/';
const P = 'ba-oyun-kaydirmali-bulmaca';
const MODULE = '/oyunlar/kaydirmali-bulmaca/game.js';

const cells = async (page: Page) => ((await page.locator('#board').getAttribute('data-cells')) || '').split(',').map(Number);
const moves = async (page: Page) => Number(await page.locator('#moves').textContent());

// Çözülebilirlik formülü (oyun kodundan bağımsız olarak testte yeniden yazıldı).
function solvable(a: number[], n: number): boolean {
  const t = a.filter(Boolean);
  let inv = 0;
  for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++) if (t[i] > t[j]) inv++;
  if (n % 2 === 1) return inv % 2 === 0;
  const rowFromBottom = n - Math.floor(a.indexOf(0) / n);
  return (inv + rowFromBottom) % 2 === 1;
}

// 3×3 için bağımsız doğrulama: hedeften erişilebilen tüm durumlar (181.440).
function reachable3x3(): Set<string> {
  const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const seen = new Set<string>([goal.join(',')]);
  let frontier = [goal];
  while (frontier.length) {
    const next: number[][] = [];
    for (const s of frontier) {
      const b = s.indexOf(0);
      const r = Math.floor(b / 3); const c = b % 3;
      const cand: number[] = [];
      if (r > 0) cand.push(b - 3);
      if (r < 2) cand.push(b + 3);
      if (c > 0) cand.push(b - 1);
      if (c < 2) cand.push(b + 1);
      for (const q of cand) {
        const t = s.slice(); t[b] = t[q]; t[q] = 0;
        const k = t.join(',');
        if (!seen.has(k)) { seen.add(k); next.push(t); }
      }
    }
    frontier = next;
  }
  return seen;
}

async function open(page: Page) {
  await page.goto(URL_PATH);
  await page.locator('#board').scrollIntoViewIfNeeded();
  await expect(page.locator('#board')).toHaveAttribute('data-cells', /.+/);
}

async function setSize(page: Page, n: number) {
  await page.locator(`[data-size-btn="${n}"]`).click();
  await expect(page.locator('#board')).toHaveAttribute('data-size', String(n));
}

/** Boşluğa komşu bir taşın kare numarasını döndürür. */
function neighbourOfBlank(a: number[], n: number): number {
  const b = a.indexOf(0);
  const r = Math.floor(b / n); const c = b % n;
  return r > 0 ? b - n : (c > 0 ? b - 1 : b + 1);
}

test.describe('Kaydırmalı Sayı Bulmacası', () => {
  test('sayfa açılır, bulmaca karışık başlar, içerik/reklam/SSS tamam, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Bulmaca');
    const c = await cells(page);
    expect(c.length).toBe(16);
    expect(c.join()).not.toBe('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0');
    await expect(page.locator('#board .ptile:not(.ghost)')).toHaveCount(15);
    await expect(page.locator('#moves')).toHaveText('0');
    await expect(page.locator('#time')).toHaveText('00:00');
    await expect(page.locator('#best')).toHaveText('—');
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

  test('karıştırma her boyutta geçerli, çözülebilir ve çözülmüş değildir', async ({ page }) => {
    const reach = reachable3x3();
    await open(page);
    for (const n of [3, 4, 5]) {
      await setSize(page, n);
      for (let i = 0; i < 6; i++) {
        await page.locator('#btn-shuffle').click();
        const c = await cells(page);
        expect(c.length).toBe(n * n);
        expect([...c].sort((a, b) => a - b), 'permütasyon').toEqual(Array.from({ length: n * n }, (_, k) => k));
        expect(solvable(c, n), `çözülebilirlik n=${n}: ${c}`).toBe(true);
        const goal = Array.from({ length: n * n }, (_, k) => (k === n * n - 1 ? 0 : k + 1));
        expect(c.join()).not.toBe(goal.join());
        if (n === 3) expect(reach.has(c.join(',')), 'hedeften erişilebilir').toBe(true);
        await expect(page.locator('#moves')).toHaveText('0');
      }
    }
    // Oyun kodundaki eşlik denetimi: 14-15 takaslı dizilim çözülemez, 1000 rastgele karıştırma çözülür.
    const out = await page.evaluate(`(async () => {
      const m = await import('${MODULE}');
      const bad = m.goalCells(4); [bad[13], bad[14]] = [bad[14], bad[13]];
      let fails = 0;
      for (const n of [3, 4, 5]) for (let i = 0; i < 100; i++) {
        const a = m.shuffled(n); const steps = m.solve(a, n);
        if (!steps || !m.isSolved(m.applySteps(a, n, steps), n)) fails++;
      }
      return { unsolvable: m.isSolvable(bad, 4), solveBad: m.solve(bad, 4), fails };
    })()`) as { unsolvable: boolean; solveBad: unknown; fails: number };
    expect(out.unsolvable).toBe(false);
    expect(out.solveBad).toBeNull();
    expect(out.fails).toBe(0);
  });

  test('taşa tıklamak hamle sayacını artırır ve süreyi başlatır', async ({ page }) => {
    await open(page);
    const before = await cells(page);
    const idx = neighbourOfBlank(before, 4);
    await expect(page.locator('#time')).toHaveText('00:00');
    await page.locator(`.ptile[data-pos="${idx}"]`).click();
    await expect(page.locator('#moves')).toHaveText('1');
    const after = await cells(page);
    expect(after[idx]).toBe(0); // boşluk, tıklanan taşın yerine geçti
    expect(after[before.indexOf(0)]).toBe(before[idx]);
    await expect(page.locator('#time')).not.toHaveText('00:00', { timeout: 4000 });
    // Boşluktan uzaktaki, hizası tutmayan taşa tıklamak hamle saymaz.
    const b = after.indexOf(0);
    const diag = [0, 5, 10, 15].find((i) => i !== b && Math.floor(i / 4) !== Math.floor(b / 4) && i % 4 !== b % 4)!;
    await page.locator(`.ptile[data-pos="${diag}"]`).click();
    await expect(page.locator('#moves')).toHaveText('1');
  });

  test('ok tuşu taşı kaydırır; aynı hizadaki uzak taşa tıklamak aradaki taşları birlikte kaydırır', async ({ page }) => {
    await open(page);
    const c = await cells(page);
    const b = c.indexOf(0);
    const key = b % 4 < 3 ? 'ArrowLeft' : 'ArrowRight';
    await page.keyboard.press(key);
    await expect(page.locator('#moves')).toHaveText('1');
    const c2 = await cells(page);
    expect(c2.indexOf(0)).toBe(key === 'ArrowLeft' ? b + 1 : b - 1);
    // Çoklu kayma: satırda boşluğa en az 2 uzaklıkta bir taş seç.
    const nb = c2.indexOf(0);
    const row = Math.floor(nb / 4);
    const far = [0, 1, 2, 3].map((k) => row * 4 + k).find((i) => Math.abs(i - nb) >= 2)!;
    const dist = Math.abs(far - nb);
    await page.locator(`.ptile[data-pos="${far}"]`).click();
    await expect.poll(() => moves(page)).toBe(1 + dist);
    expect((await cells(page)).indexOf(0)).toBe(far);
  });

  test('parmak/fare kaydırması boşluğa doğru taşı kaydırır', async ({ page }) => {
    await open(page);
    const c = await cells(page);
    const idx = neighbourOfBlank(c, 4);
    const b = c.indexOf(0);
    const tile = page.locator(`.ptile[data-pos="${idx}"]`);
    const box = (await tile.boundingBox())!;
    const dx = ((b % 4) - (idx % 4)) * 60;
    const dy = (Math.floor(b / 4) - Math.floor(idx / 4)) * 60;
    const cx = box.x + box.width / 2; const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + dx, cy + dy, { steps: 6 });
    await page.mouse.up();
    await expect(page.locator('#moves')).toHaveText('1');
    expect((await cells(page))[idx]).toBe(0);
  });

  test('3×3 bulmaca tıklamalarla çözülür: süre durur, en iyi süre localStorage\'a yazılır', async ({ page }) => {
    await open(page);
    await setSize(page, 3);
    const plan = (await page.evaluate(`(async () => {
      const m = await import('${MODULE}');
      const cells = document.getElementById('board').dataset.cells.split(',').map(Number);
      return m.solve(cells, 3);
    })()`)) as number[];
    expect(plan.length).toBeGreaterThan(0);
    for (const idx of plan) await page.locator(`.ptile[data-pos="${idx}"]`).dispatchEvent('click');
    await expect(page.locator('#board')).toHaveAttribute('data-solved', 'true');
    await expect(page.locator('#status')).toContainText('Tebrikler');
    await expect(page.locator('#moves')).toHaveText(String(plan.length));
    await expect(page.locator('.ptile.ghost')).toHaveClass(/show/);
    expect((await cells(page)).join()).toBe('1,2,3,4,5,6,7,8,0');
    const stored = await page.evaluate((k) => localStorage.getItem(k), `${P}:best:sayi:3`);
    const rec = JSON.parse(stored!);
    expect(rec.moves).toBe(plan.length);
    expect(rec.time).toBeGreaterThanOrEqual(0);
    await expect(page.locator('#best')).not.toHaveText('—');
    // Çözülmüş tahtada hamle yapılamaz; Karıştır yenisini başlatır.
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#moves')).toHaveText(String(plan.length));
    await page.locator('#btn-shuffle').click();
    await expect(page.locator('#board')).toHaveAttribute('data-solved', 'false');
    await expect(page.locator('#moves')).toHaveText('0');
    await expect(page.locator('#best')).not.toHaveText('—'); // en iyi süre korunur
    // Resimli modun en iyi süresi ayrıdır.
    await page.locator('[data-mode-btn="resim"]').click();
    await expect(page.locator('#best')).toHaveText('—');
  });

  test('Çözümü izle: animasyon bulmacayı çözer ve süreyi rekor olarak kaydetmez', async ({ page }) => {
    await open(page);
    await setSize(page, 3);
    await page.locator('#btn-solve').click();
    await expect(page.locator('#btn-solve')).toHaveText('Durdur');
    await expect(page.locator('#board')).toHaveAttribute('data-solved', 'true', { timeout: 30_000 });
    await expect(page.locator('#status')).toContainText('kaydedilmedi');
    expect(await page.evaluate((k) => localStorage.getItem(k), `${P}:best:sayi:3`)).toBeNull();
    await expect(page.locator('#btn-solve')).toBeDisabled();
    expect((await cells(page)).join()).toBe('1,2,3,4,5,6,7,8,0');
  });

  test('Çözümü izle durdurulabilir', async ({ page }) => {
    await open(page);
    await setSize(page, 5);
    await page.locator('#btn-solve').click();
    await expect.poll(() => moves(page)).toBeGreaterThan(2);
    await page.locator('#btn-solve').click(); // Durdur
    await expect(page.locator('#btn-solve')).toHaveText('Çözümü izle');
    const m1 = await moves(page);
    await page.waitForTimeout(400);
    expect(await moves(page)).toBe(m1);
    await expect(page.locator('#board')).toHaveAttribute('data-solved', 'false');
  });

  test('resimli mod: örnek resim ve yerel fotoğraf parçalara bölünür, dış istek yoktur', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await page.locator('[data-mode-btn="resim"]').click();
    await expect(page.locator('#photo-panel')).toBeVisible();
    await expect(page.locator('#board')).toHaveClass(/pic/);
    await expect(page.locator('.ptile:not(.ghost)').first()).toBeVisible();
    const bg = () => page.locator('.ptile:not(.ghost)').first().evaluate((el) => getComputedStyle(el).backgroundImage);
    await expect.poll(bg).toContain('blob:');
    const sampleThumb = await page.locator('#thumb').evaluate((el) => (el as HTMLElement).style.getPropertyValue('--img'));
    expect(sampleThumb).toContain('blob:');

    await page.locator('#photo').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#photo-note')).toContainText('kırpıldı');
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    const photoThumb = await page.locator('#thumb').evaluate((el) => (el as HTMLElement).style.getPropertyValue('--img'));
    expect(photoThumb).toContain('blob:');
    expect(photoThumb).not.toBe(sampleThumb); // resim değişti
    await expect(page.locator('#moves')).toHaveText('0');

    // Resimli modda da karıştırma çözülebilir ve taş kayar.
    const c = await cells(page);
    expect(solvable(c, 4)).toBe(true);
    await page.locator(`.ptile[data-pos="${neighbourOfBlank(c, 4)}"]`).click();
    await expect(page.locator('#moves')).toHaveText('1');
    // Numaraları gizle
    await page.locator('#show-nums').uncheck();
    await expect(page.locator('.ptile:not(.ghost) span').first()).toBeHidden();
    // Sayılı moda dönüş
    await page.locator('[data-mode-btn="sayi"]').click();
    await expect(page.locator('#board')).not.toHaveClass(/pic/);
    await expect(page.locator('#photo-panel')).toBeHidden();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('resim olmayan ya da bozuk dosya Türkçe, çözüm öneren hata verir; oyun bozulmaz', async ({ page }) => {
    await open(page);
    await page.locator('[data-mode-btn="resim"]').click();
    await expect(page.locator('#photo-panel')).toBeVisible();
    await page.locator('#photo').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('resim değil');
    await expect(page.locator('#error')).toContainText('JPG');

    // Resim uzantılı ama içeriği bozuk dosya
    await page.locator('#photo').setInputFiles({ name: 'foto.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error')).toContainText('görüntü olarak açılamadı');
    // Oyun hâlâ çalışır
    const c = await cells(page);
    await page.locator(`.ptile[data-pos="${neighbourOfBlank(c, 4)}"]`).click();
    await expect(page.locator('#moves')).toHaveText('1');
    // Geçerli bir fotoğraf hatayı temizler
    await page.locator('#photo').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
  });

  test('bozuk en iyi süre kaydı yok sayılır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript((prefix) => {
      localStorage.setItem(`${prefix}:best:sayi:4`, '{bozuk');
      localStorage.setItem(`${prefix}:size`, '99');
    }, P);
    await open(page);
    await expect(page.locator('#best')).toHaveText('—');
    await expect(page.locator('#board')).toHaveAttribute('data-size', '4');
    expect(errors).toEqual([]);
  });

  test('360px genişlikte yatay taşma yok (sayılı ve resimli mod, 5×5)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const check = async (label: string) => {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, label).toBeLessThanOrEqual(0);
      const box = (await page.locator('#board').boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(360);
    };
    await check('4x4 sayı');
    await setSize(page, 5);
    await check('5x5 sayı');
    await page.locator('[data-mode-btn="resim"]').click();
    await expect(page.locator('#photo-panel')).toBeVisible();
    await check('5x5 resim');
    await page.locator('#photo').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#photo-note')).toContainText('kırpıldı');
    await check('5x5 fotoğraf');
  });
});
