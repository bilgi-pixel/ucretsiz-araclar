import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Nonogram: sayfa yapısı, 5×5 çözüm yolu, fare/dokunma/klavye girdileri, hata kontrolü, ipucu,
// ipucu solması, kaydet/devam, bozuk kayıt, rastgele bulmaca, 360px.
const URL_PATH = '/oyunlar/nonogram/';
const STORE_KEY = 'ba-nonogram';

type Hook = { size: number; source: string; name: string; state: string; solution: number[][]; rows: number[][]; cols: number[][] };

const board = (page: Page) => page.locator('#board');
const cell = (page: Page, r: number, c: number) => page.locator(`.ng-cell[data-r="${r}"][data-c="${c}"]`);
const hook = (page: Page) => page.evaluate(() => (window as unknown as { __nonogramTest: () => Hook }).__nonogramTest());

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(board(page)).toHaveAttribute('data-state', 'hazir');
  return errors;
}

async function fillSolution(page: Page, h: Hook) {
  for (let r = 0; r < h.size; r++) {
    for (let c = 0; c < h.size; c++) {
      if (h.solution[r][c] === 1) await cell(page, r, c).click();
    }
  }
}

async function pickSize(page: Page, size: string, source = 'hazir') {
  await page.locator('#opt-source').selectOption(source);
  await expect(board(page)).toHaveAttribute('data-state', 'hazir');
  await page.locator('#opt-size').selectOption(size);
  await expect(board(page)).toHaveAttribute('data-size', size);
  await expect(board(page)).toHaveAttribute('data-state', 'hazir');
}

test.describe('Nonogram', () => {
  test('sayfa açılır; ≥800 kelime, 3 reklam (oyun kutusunun dışında), SSS ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Nonogram');
    await expect(page).toHaveTitle(/Nonogram Oyna/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(6);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-nonogram-a', 'oyun-nonogram-b', 'oyun-nonogram-c']);
    // Reklam A oyun kutusunun ALTINDA; hiçbir reklam oyun kutusunun içinde değil
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
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(6);

    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('5×5 desen yüklenir: 25 hücre, ipuçları çözümle tutarlı, ızgara erişilebilirlik öznitelikleri var', async ({ page }) => {
    await open(page);
    await expect(board(page)).toHaveAttribute('data-size', '5');
    await expect(board(page)).toHaveAttribute('role', 'grid');
    await expect(page.locator('.ng-cell')).toHaveCount(25);
    await expect(cell(page, 0, 0)).toHaveAttribute('aria-label', /Satır 1, sütun 1: boş/);
    const h = await hook(page);
    expect(h.size).toBe(5);
    expect(h.state).toBe('hazir');
    // DOM'daki ipuçları, çözümden hesaplanan ipuçlarıyla aynı
    const readClues = async (sel: string) =>
      (await page.locator(sel).allInnerTexts()).map((t) => t.split(/\s+/).filter(Boolean).map(Number));
    expect(await readClues('.ng-rc')).toEqual(h.rows);
    expect(await readClues('.ng-cc')).toEqual(h.cols);
    const runs = (line: number[]) => {
      const out: number[] = []; let n = 0;
      for (const v of line) { if (v) n++; else if (n) { out.push(n); n = 0; } }
      if (n) out.push(n);
      return out.length ? out : [0];
    };
    expect(h.rows).toEqual(h.solution.map(runs));
    expect(h.cols).toEqual(h.solution[0].map((_, c) => runs(h.solution.map((row) => row[c]))));
  });

  test('çözümü doldurunca kazanılır: süre durur, desen adı görünür, en iyi süre ve ilerleme localStorage\'a yazılır', async ({ page }) => {
    const errors = await open(page);
    const h = await hook(page);
    await fillSolution(page, h);
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result-title')).toContainText('Tebrikler');
    await expect(page.locator('#result-text')).toContainText(`Desen: ${h.name}`);
    await expect(page.locator('#result-text')).toContainText('Süre:');
    // Tüm ipuçları soluk (tamamlandı)
    await expect(page.locator('.ng-rc.done')).toHaveCount(5);
    await expect(page.locator('.ng-cc.done')).toHaveCount(5);
    await expect(page.locator('#best')).not.toHaveText('–');

    // Bitmiş tahta girdiyi yok sayar
    const before = await board(page).getAttribute('data-filled');
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      if (h.solution[r][c] === 0) { await cell(page, r, c).click({ force: true }); break; }
    }
    expect(await board(page).getAttribute('data-filled')).toBe(before);

    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['5']).toBeGreaterThan(0);
    expect(saved.game).toBeNull();
    expect(saved.solved['5'].length).toBe(1);

    // Yeni bulmaca düğmesi (sonuç kutusundaki) yeni oyun başlatır
    await page.locator('#btn-next').click();
    await expect(board(page)).toHaveAttribute('data-state', 'hazir');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#best')).not.toHaveText('–');
    expect(errors).toEqual([]);
  });

  test('sol tık doldurur, sağ tık çarpı koyar, tekrar tık geri alır; Çarpı aracı ve Shift+tık; sürükleyerek boyama', async ({ page }) => {
    await open(page);
    const c00 = cell(page, 0, 0);
    await c00.click();
    await expect(c00).toHaveClass(/\bf\b/);
    await expect(board(page)).toHaveAttribute('data-state', 'oynuyor');
    await expect(board(page)).toHaveAttribute('data-filled', '1');
    await c00.click();
    await expect(c00).not.toHaveClass(/\bf\b/);

    await c00.click({ button: 'right' });
    await expect(c00).toHaveClass(/\bx\b/);
    await expect(board(page)).toHaveAttribute('data-filled', '0');
    await c00.click({ button: 'right' });
    await expect(c00).not.toHaveClass(/\bx\b/);

    // Doldurulmuş hücreye sağ tık: çarpıya çevirir
    await c00.click();
    await c00.click({ button: 'right' });
    await expect(c00).toHaveClass(/\bx\b/);
    await expect(c00).not.toHaveClass(/\bf\b/);
    await c00.click({ button: 'right' });

    // Çarpı aracı: sol tık çarpı koyar
    await page.locator('#tool-cross').click();
    await expect(page.locator('#tool-cross')).toHaveAttribute('aria-pressed', 'true');
    await cell(page, 1, 1).click();
    await expect(cell(page, 1, 1)).toHaveClass(/\bx\b/);
    await page.locator('#tool-fill').click();
    await cell(page, 1, 1).click({ modifiers: ['Shift'] });
    await expect(cell(page, 1, 1)).not.toHaveClass(/\bx\b/);

    // Fareyi basılı sürükleyerek 4 hücre boyama (satır 4: bulmaca bitmez)
    const a = (await cell(page, 4, 0).boundingBox())!;
    const b = (await cell(page, 4, 3).boundingBox())!;
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 12 });
    await page.mouse.up();
    for (let c = 0; c < 4; c++) await expect(cell(page, 4, c)).toHaveClass(/\bf\b/);
    await expect(cell(page, 4, 4)).not.toHaveClass(/\bf\b/);
  });

  test('klavye: ok tuşları imleci taşır, Boşluk doldurur, X çarpı koyar, Backspace temizler', async ({ page }) => {
    await open(page);
    await cell(page, 0, 0).focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(board(page)).toHaveAttribute('data-cursor', '1,1');
    await expect(cell(page, 1, 1)).toBeFocused();
    await page.keyboard.press('Space');
    await expect(cell(page, 1, 1)).toHaveClass(/\bf\b/);
    await expect(cell(page, 1, 1)).toHaveAttribute('aria-label', /dolu/);
    await page.keyboard.press('x');
    await expect(cell(page, 1, 1)).toHaveClass(/\bx\b/);
    await page.keyboard.press('Backspace');
    await expect(cell(page, 1, 1)).not.toHaveClass(/\b(f|x)\b/);
    await page.keyboard.press('End');
    await expect(board(page)).toHaveAttribute('data-cursor', '1,4');
    await page.keyboard.press('ArrowRight'); // kenarda durur
    await expect(board(page)).toHaveAttribute('data-cursor', '1,4');
    // Yalnızca imleç hücresi Tab sırasında
    expect(await page.locator('.ng-cell[tabindex="0"]').count()).toBe(1);
  });

  test('hata kontrolü: yanlış dolu ve yanlış çarpı hücre işaretlenir, sayaç güncellenir, kapatınca kalkar', async ({ page }) => {
    await open(page);
    const h = await hook(page);
    let wrongEmpty: [number, number] = [0, 0];
    let wrongFilled: [number, number] = [0, 0];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      if (h.solution[r][c] === 0) wrongEmpty = [r, c]; else wrongFilled = [r, c];
    }
    await expect(page.locator('#errors')).toHaveText('–');
    // Kontrol kapalıyken yanlış hücre işaretlenmez
    await cell(page, ...wrongEmpty).click();
    await expect(cell(page, ...wrongEmpty)).not.toHaveClass(/wrong/);
    await cell(page, ...wrongEmpty).click(); // geri al

    await page.locator('#opt-errors').check();
    await expect(page.locator('#errors')).toHaveText('0');
    await cell(page, ...wrongEmpty).click();
    await expect(cell(page, ...wrongEmpty)).toHaveClass(/wrong/);
    await expect(cell(page, ...wrongEmpty)).toHaveAttribute('aria-label', /hatalı/);
    await expect(page.locator('#errors')).toHaveText('1');
    await expect(board(page)).toHaveAttribute('data-errors', '1');
    // Doğru hücrede çarpı da hatadır
    await cell(page, ...wrongFilled).click({ button: 'right' });
    await expect(cell(page, ...wrongFilled)).toHaveClass(/wrong/);
    await expect(page.locator('#errors')).toHaveText('2');
    // Düzeltince hata kalkar
    await cell(page, ...wrongEmpty).click();
    await expect(cell(page, ...wrongEmpty)).not.toHaveClass(/wrong/);
    await expect(page.locator('#errors')).toHaveText('1');
    // Seçeneği kapatınca işaretler kalkar
    await page.locator('#opt-errors').uncheck();
    await expect(page.locator('.ng-cell.wrong')).toHaveCount(0);
    await expect(page.locator('#errors')).toHaveText('–');
  });

  test('ipucu: önce yanlış işareti düzeltir, sonra doğru hücreyi açar; her ipucu süreye 30 sn ekler', async ({ page }) => {
    await open(page);
    const h = await hook(page);
    await page.locator('#opt-errors').check();
    let wrongEmpty: [number, number] = [0, 0];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) if (h.solution[r][c] === 0) wrongEmpty = [r, c];
    await cell(page, ...wrongEmpty).click();
    await expect(page.locator('#errors')).toHaveText('1');

    await page.locator('#btn-hint').click();
    // Yanlış dolu hücre çarpıya çevrilir ve ipucu işareti taşır
    await expect(cell(page, ...wrongEmpty)).toHaveClass(/\bx\b/);
    await expect(cell(page, ...wrongEmpty)).toHaveClass(/hint/);
    await expect(page.locator('#errors')).toHaveText('0');
    await expect(page.locator('#hints')).toHaveText('1');
    await expect(board(page)).toHaveAttribute('data-hints', '1');

    // İkinci ipucu: doğru bir dolu hücre açılır
    const filledBefore = Number(await board(page).getAttribute('data-filled'));
    await page.locator('#btn-hint').click();
    await expect(board(page)).toHaveAttribute('data-filled', String(filledBefore + 1));
    await expect(page.locator('#hints')).toHaveText('2');
    await expect(page.locator('#errors')).toHaveText('0');
    await expect(page.locator('#time')).toHaveText(/^1:0\d$/); // 2 × 30 sn ceza
  });

  test('bir çizgi tamamlanınca ipucu sayıları solar', async ({ page }) => {
    await open(page);
    const h = await hook(page);
    const row = h.solution.findIndex((line) => line.some((v) => v === 1));
    await expect(page.locator('.ng-rc').nth(row)).not.toHaveClass(/done/);
    for (let c = 0; c < 5; c++) if (h.solution[row][c] === 1) await cell(page, row, c).click();
    await expect(page.locator('.ng-rc').nth(row)).toHaveClass(/done/);
    await expect(page.locator('.ng-rc').nth(row)).toHaveAttribute('aria-label', /tamamlandı/);
    // Geri alınca yeniden belirginleşir
    const first = h.solution[row].indexOf(1);
    await cell(page, row, first).click();
    await expect(page.locator('.ng-rc').nth(row)).not.toHaveClass(/done/);
  });

  test('kaydet/devam: yarım bulmaca, süre ve çarpılar yenilemede korunur; Baştan başla sıfırlar', async ({ page }) => {
    await open(page);
    const h = await hook(page);
    let filledCell: [number, number] = [0, 0];
    let crossCell: [number, number] = [0, 0];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      if (h.solution[r][c] === 1) filledCell = [r, c]; else crossCell = [r, c];
    }
    await cell(page, ...filledCell).click();
    await cell(page, ...crossCell).click({ button: 'right' });
    await page.waitForTimeout(1200);
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.game.size).toBe(5);
    expect(saved.game.elapsed).toBeGreaterThan(0);

    await page.reload();
    await expect(board(page)).toHaveAttribute('data-state', 'hazir');
    const h2 = await hook(page);
    expect(h2.solution).toEqual(h.solution);
    await expect(board(page)).toHaveAttribute('data-filled', '1');
    await expect(cell(page, ...filledCell)).toHaveClass(/\bf\b/);
    await expect(cell(page, ...crossCell)).toHaveClass(/\bx\b/);
    await expect(page.locator('#msg')).toContainText('Kayıtlı bulmacanız yüklendi');
    await expect(page.locator('#time')).not.toHaveText('0:00');

    // İlk hamlede süre kaldığı yerden devam eder
    await cell(page, ...filledCell).click();
    await expect(board(page)).toHaveAttribute('data-state', 'oynuyor');

    await page.locator('#btn-reset').click();
    await expect(board(page)).toHaveAttribute('data-state', 'hazir');
    await expect(board(page)).toHaveAttribute('data-filled', '0');
    await expect(page.locator('.ng-cell.x')).toHaveCount(0);
    await expect(page.locator('#time')).toHaveText('0:00');
  });

  test('bozuk ya da geçersiz localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await expect(page.locator('.ng-cell')).toHaveCount(25);
    await cell(page, 0, 0).click();
    await expect(board(page)).toHaveAttribute('data-state', 'oynuyor');
    expect(errors).toEqual([]);

    // Yapısı bozuk kayıtlı oyun: yok sayılır, yeni bulmaca açılır
    const page2 = await page.context().newPage();
    const errors2: string[] = [];
    page2.on('pageerror', (e) => errors2.push(String(e)));
    await page2.addInitScript((k) => localStorage.setItem(k, JSON.stringify({ best: { 5: 'x' }, game: { size: 5, sol: ['xx'], cells: [], elapsed: -4 } })), STORE_KEY);
    await page2.goto(URL_PATH);
    await expect(page2.locator('#board')).toHaveAttribute('data-state', 'hazir');
    await expect(page2.locator('.ng-cell')).toHaveCount(25);
    await expect(page2.locator('#best')).toHaveText('–');
    expect(errors2).toEqual([]);
  });

  test('30 hazır desenin tamamı tek çözümlü ve boyut dağılımı 10/12/8', async ({ page }) => {
    await open(page);
    const res = await page.evaluate(async () => {
      const { DESENLER } = await import('/oyunlar/nonogram/desenler.js');
      const { isLineSolvable } = await import('/oyunlar/nonogram/solver.js');
      const bySize: Record<string, number> = {};
      let bad = 0;
      for (const d of DESENLER) {
        bySize[d.boyut] = (bySize[d.boyut] || 0) + 1;
        const grid = d.satirlar.map((s: string) => [...s].map((ch) => (ch === '#' ? 1 : 0)));
        if (grid.length !== d.boyut || grid.some((row: number[]) => row.length !== d.boyut) || !isLineSolvable(grid)) bad++;
      }
      return { total: DESENLER.length, bySize, bad };
    });
    expect(res).toEqual({ total: 30, bySize: { 5: 10, 10: 12, 15: 8 }, bad: 0 });
  });

  test('10×10 hazır ve 15×15 rastgele: doğru hücre sayısı, rastgele bulmaca tek çözümlü', async ({ page }) => {
    const errors = await open(page);
    await pickSize(page, '10');
    await expect(page.locator('.ng-cell')).toHaveCount(100);
    await expect(page.locator('#best')).toHaveText('–');

    await pickSize(page, '15', 'rastgele');
    await expect(page.locator('.ng-cell')).toHaveCount(225);
    await expect(board(page)).toHaveAttribute('data-source', 'rastgele');
    const unique = await page.evaluate(async () => {
      const { isLineSolvable } = await import('/oyunlar/nonogram/solver.js');
      const h = (window as unknown as { __nonogramTest: () => Hook }).__nonogramTest();
      return isLineSolvable(h.solution);
    });
    expect(unique).toBe(true);

    // Rastgele 5×5'i çöz ve kazan (desen adı "Rastgele desen")
    await pickSize(page, '5', 'rastgele');
    const h = await hook(page);
    expect(h.name).toBe('Rastgele desen');
    await fillSolution(page, h);
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#result-text')).toContainText('Rastgele desen');
    expect(errors).toEqual([]);
  });

  test('360px: taşma yok (15×15 dahil); uzun basış çarpı koyar, kısa dokunuş doldurur', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);

    const touch = async (r: number, c: number, holdMs: number) => {
      await cell(page, r, c).evaluate(async (el, ms) => {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const fire = (type: string) => el.dispatchEvent(new PointerEvent(type, { pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, bubbles: true }));
        fire('pointerdown');
        await new Promise((res) => setTimeout(res, ms));
        fire('pointerup');
      }, holdMs);
    };
    await touch(0, 0, 40);
    await expect(cell(page, 0, 0)).toHaveClass(/\bf\b/);
    await touch(2, 2, 650);
    await expect(cell(page, 2, 2)).toHaveClass(/\bx\b/);
    await expect(cell(page, 2, 2)).not.toHaveClass(/\bf\b/);

    await pickSize(page, '15');
    await expect(page.locator('.ng-cell')).toHaveCount(225);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const box = (await page.locator('.ng-cell').first().boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(13);
    expect(errors).toEqual([]);
  });
});
