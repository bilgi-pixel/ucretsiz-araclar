import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/oyunlar/sudoku/';

// ---- Oyundan bağımsız, testin kendi çözücüsü (benzersizliği doğrulamak için) ----
function countSolutions(grid: number[], limit = 2): { count: number; first: number[] | null } {
  const a = grid.slice();
  let count = 0;
  let first: number[] | null = null;
  const ok = (i: number, d: number) => {
    const r = Math.floor(i / 9);
    const c = i % 9;
    for (let k = 0; k < 9; k++) if (a[r * 9 + k] === d || a[k * 9 + c] === d) return false;
    const br = r - (r % 3);
    const bc = c - (c % 3);
    for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (a[(br + y) * 9 + bc + x] === d) return false;
    return true;
  };
  const rec = () => {
    let best = -1;
    let bestC: number[] = [];
    for (let i = 0; i < 81; i++) {
      if (a[i]) continue;
      const cands: number[] = [];
      for (let d = 1; d <= 9; d++) if (ok(i, d)) cands.push(d);
      if (cands.length === 0) return;
      if (best < 0 || cands.length < bestC.length) { best = i; bestC = cands; }
    }
    if (best < 0) { count++; if (!first) first = a.slice(); return; }
    for (const d of bestC) {
      a[best] = d;
      rec();
      a[best] = 0;
      if (count >= limit) return;
    }
  };
  rec();
  return { count, first };
}

type Board = { values: number[]; given: boolean[]; wrong: boolean[]; hint: boolean[]; notes: number[] };

async function readBoard(page: Page): Promise<Board> {
  return page.$$eval('.sd-cell', (nodes) => ({
    values: nodes.map((n) => Number((n as HTMLElement).dataset.v || 0)),
    given: nodes.map((n) => (n as HTMLElement).dataset.given === '1'),
    wrong: nodes.map((n) => (n as HTMLElement).dataset.wrong === '1'),
    hint: nodes.map((n) => (n as HTMLElement).dataset.hint === '1'),
    notes: nodes.map((n) => Number((n as HTMLElement).dataset.notes || 0)),
  }));
}

const cell = (page: Page, i: number) => page.locator(`.sd-cell[data-i="${i}"]`);
const ready = (page: Page) => expect(page.locator('#sd-oyun')).toHaveAttribute('data-ready', '1');

async function put(page: Page, i: number, d: number) {
  await cell(page, i).focus();
  await page.keyboard.press(String(d));
}

/** Boş kareleri sayfa içinde keydown olaylarıyla doldurur (tek ağ turu; klavye yolu aynıdır). */
async function fillInPage(page: Page, sol: number[]) {
  await page.evaluate((s) => {
    document.querySelectorAll<HTMLElement>('.sd-cell').forEach((c, i) => {
      if (c.dataset.v) return;
      c.focus();
      c.dispatchEvent(new KeyboardEvent('keydown', { key: String(s[i]), bubbles: true }));
    });
  }, sol);
}

async function newGame(page: Page, level: string) {
  await page.locator('#sd-seviye').selectOption(level);
  await page.locator('#sd-yeni').click();
  if (await page.locator('#sd-yeni[data-armed]').count()) await page.locator('#sd-yeni').click(); // ilerleme onayı
  await ready(page);
  await expect(page.locator('#sd-durum')).toContainText('Yeni bulmaca hazır');
}

async function solutionOf(page: Page) {
  const b = await readBoard(page);
  const r = countSolutions(b.values);
  expect(r.count).toBe(1);
  return { board: b, sol: r.first! };
}

test.describe('Sudoku oyunu', () => {
  test('sayfa açılır; tahta, rakam tuşları, içerik ve 3 reklam alanı var; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await ready(page);
    await expect(page.locator('h1')).toContainText('Sudoku');
    await expect(page.locator('.sd-cell')).toHaveCount(81);
    await expect(page.locator('#sd-rakamlar [data-d]')).toHaveCount(10);
    // tahtada verilen (kilitli) hücreler var
    const b = await readBoard(page);
    const givens = b.given.filter(Boolean).length;
    expect(givens).toBeGreaterThanOrEqual(17);
    expect(givens).toBeLessThan(81);
    for (let i = 0; i < 81; i++) expect(b.given[i]).toBe(b.values[i] !== 0);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const k of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-sudoku-${k}"]`)).toHaveCount(1);
    expect(await page.locator('#sd-oyun .ba-ad').count()).toBe(0);
    await expect(page.locator('details')).toHaveCount(8);
    const words = await page.locator('.ba-content').evaluate((n) => (n as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(800);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  for (const [level, min, max] of [['kolay', 36, 46], ['orta', 28, 40], ['zor', 22, 34], ['uzman', 17, 30]] as const) {
    test(`üretilen ${level} bulmaca tek çözümlü (bağımsız çözücüyle doğrulandı)`, async ({ page }) => {
      await page.goto(URL);
      await ready(page);
      for (let round = 0; round < 3; round++) {
        await newGame(page, level);
        const { board } = await solutionOf(page); // count === 1 burada doğrulanır
        const givens = board.given.filter(Boolean).length;
        expect(givens).toBeGreaterThanOrEqual(min);
        expect(givens).toBeLessThanOrEqual(max);
      }
    });
  }

  test('doğru rakam kabul edilir, yanlış rakam vurgulanır; verilen kare değişmez', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    await expect(page.locator('#sd-hata')).toBeChecked();
    const { board, sol } = await solutionOf(page);
    const empties = board.values.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
    const [a, b] = [empties[0], empties[1]];
    // doğru rakam
    await put(page, a, sol[a]);
    await expect(cell(page, a)).toHaveAttribute('data-v', String(sol[a]));
    await expect(cell(page, a)).toHaveAttribute('data-wrong', '0');
    // yanlış rakam
    const wrong = sol[b] === 9 ? 1 : sol[b] + 1;
    await put(page, b, wrong);
    await expect(cell(page, b)).toHaveAttribute('data-v', String(wrong));
    await expect(cell(page, b)).toHaveAttribute('data-wrong', '1');
    await expect(cell(page, b)).toHaveClass(/is-wrong/);
    // hata vurgusu kapatılınca kırmızı kalkar
    await page.locator('#sd-hata').uncheck();
    await expect(cell(page, b)).toHaveAttribute('data-wrong', '0');
    await page.locator('#sd-hata').check();
    await expect(cell(page, b)).toHaveAttribute('data-wrong', '1');
    // ekrandaki rakam tuşu da çalışır
    await cell(page, b).focus();
    await page.locator(`#sd-rakamlar [data-d="${sol[b]}"]`).click();
    await expect(cell(page, b)).toHaveAttribute('data-v', String(sol[b]));
    await expect(cell(page, b)).toHaveAttribute('data-wrong', '0');
    // verilen kareyi değiştirmeyi dene
    const g = board.given.findIndex(Boolean);
    const before = board.values[g];
    await put(page, g, before === 9 ? 1 : before + 1);
    await expect(cell(page, g)).toHaveAttribute('data-v', String(before));
    await page.locator('#sd-sil').click();
    await expect(cell(page, g)).toHaveAttribute('data-v', String(before));
  });

  test('geri al son hamleyi siler; Sil düğmesi kareyi temizler', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    const { board, sol } = await solutionOf(page);
    const i = board.values.findIndex((v) => !v);
    await expect(page.locator('#sd-geri')).toBeDisabled();
    await put(page, i, sol[i]);
    await expect(page.locator('#sd-geri')).toBeEnabled();
    await page.locator('#sd-geri').click();
    await expect(cell(page, i)).toHaveAttribute('data-v', '');
    await put(page, i, sol[i]);
    await page.keyboard.press('Control+z');
    await expect(cell(page, i)).toHaveAttribute('data-v', '');
    await put(page, i, sol[i]);
    await page.locator('#sd-sil').click();
    await expect(cell(page, i)).toHaveAttribute('data-v', '');
  });

  test('not modu: aday notları eklenir; rakam girilince komşu notlardan silinir', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    const { board, sol } = await solutionOf(page);
    const empties = board.values.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
    // aynı satırda iki boş kare bul
    const a = empties.find((i) => empties.some((j) => j !== i && Math.floor(j / 9) === Math.floor(i / 9)))!;
    const b = empties.find((j) => j !== a && Math.floor(j / 9) === Math.floor(a / 9))!;
    await page.locator('#sd-not').click();
    await expect(page.locator('#sd-not')).toHaveAttribute('aria-pressed', 'true');
    // a karesinin çözüm rakamıyla çakışmayan iki not rakamı seç (çakışırsa tekrar basış notu kaldırırdı)
    const [x, y] = [3, 5, 7].filter((d) => d !== sol[a]);
    await cell(page, b).focus();
    await page.keyboard.press(String(x));
    await page.keyboard.press(String(y));
    await page.keyboard.press(String(sol[a]));
    const withNotes = (await readBoard(page)).notes[b];
    expect(withNotes & (1 << (x - 1))).toBeTruthy();
    expect(withNotes & (1 << (y - 1))).toBeTruthy();
    expect(withNotes & (1 << (sol[a] - 1))).toBeTruthy();
    await expect(cell(page, b)).toHaveAttribute('data-v', '');
    // aynı rakama tekrar basmak notu kaldırır
    await page.keyboard.press(String(x));
    expect((await readBoard(page)).notes[b] & (1 << (x - 1))).toBe(0);
    // not modunu kapat, a karesine doğru rakamı gir -> b'deki not temizlenir
    await page.locator('#sd-not').click();
    await expect(page.locator('#sd-not')).toHaveAttribute('aria-pressed', 'false');
    await put(page, a, sol[a]);
    const after = (await readBoard(page)).notes[b];
    expect(after & (1 << (sol[a] - 1))).toBe(0);
    expect(after & (1 << (y - 1))).toBeTruthy(); // diğer not durur
  });

  test('ipucu bir kareyi doğru rakamla doldurur ve kilitler; geri alınabilir', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    const { board, sol } = await solutionOf(page);
    const filledBefore = board.values.filter(Boolean).length;
    await page.locator('#sd-ipucu').click();
    const after = await readBoard(page);
    expect(after.values.filter(Boolean).length).toBe(filledBefore + 1);
    const h = after.hint.findIndex(Boolean);
    expect(h).toBeGreaterThanOrEqual(0);
    expect(after.hint.filter(Boolean)).toHaveLength(1);
    expect(after.values[h]).toBe(sol[h]);
    await expect(page.locator('#sd-ipucu-sayi')).toHaveText('1');
    await expect(page.locator('#sd-durum')).toContainText('İpucu');
    // kilitli: üzerine yazılamaz
    await put(page, h, sol[h] === 9 ? 1 : sol[h] + 1);
    await expect(cell(page, h)).toHaveAttribute('data-v', String(sol[h]));
    // seçili boş kare varsa ipucu o kareyi doldurur
    const target = after.values.findIndex((v) => !v);
    await cell(page, target).focus();
    await page.locator('#sd-ipucu').click();
    await expect(cell(page, target)).toHaveAttribute('data-v', String(sol[target]));
    await expect(page.locator('#sd-ipucu-sayi')).toHaveText('2');
    // geri al ipucunu kaldırır
    await page.locator('#sd-geri').click();
    await expect(cell(page, target)).toHaveAttribute('data-v', '');
  });

  test('bulmacayı çöz: tebrik, en iyi süre localStorage\'a yazılır, kayıt silinir', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    await newGame(page, 'kolay');
    const { board, sol } = await solutionOf(page);
    await fillInPage(page, sol);
    await expect(page.locator('#sd-oyun.is-won')).toHaveCount(1);
    await expect(page.locator('#sd-durum')).toContainText('Tebrikler');
    const best = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-sudoku-en-iyi') || '{}'));
    expect(best.kolay).toBeGreaterThan(0);
    await expect(page.locator('#sd-en-iyi')).toContainText(/Kolay\s*\d\d:\d\d/);
    expect(await page.evaluate(() => localStorage.getItem('ba-sudoku-kayit'))).toBeNull();
    // bitince giriş kilitlenir
    const free = board.values.findIndex((v) => !v);
    await put(page, free, sol[free] === 9 ? 1 : sol[free] + 1);
    await expect(cell(page, free)).toHaveAttribute('data-v', String(sol[free]));
    // yeni oyun yeni bulmaca başlatır (ilerleme yok, onay istemez)
    await page.locator('#sd-yeni').click();
    await ready(page);
    await expect(page.locator('#sd-oyun.is-won')).toHaveCount(0);
  });

  test('ipucu kullanılan oyun en iyi süreye yazılmaz', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    await newGame(page, 'kolay');
    const { board, sol } = await solutionOf(page);
    await page.locator('#sd-ipucu').click();
    await fillInPage(page, sol);
    await expect(page.locator('#sd-durum')).toContainText('Tebrikler');
    await expect(page.locator('#sd-durum')).toContainText('en iyi süre güncellenmedi');
    const best = await page.evaluate(() => localStorage.getItem('ba-sudoku-en-iyi'));
    expect(best === null || !JSON.parse(best).kolay).toBe(true);
    expect(board.values.filter(Boolean).length).toBeGreaterThan(0);
  });

  test('kaydet / devam: sayfa yenilenince tahta, notlar ve süre korunur', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    const { board, sol } = await solutionOf(page);
    const empties = board.values.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
    await put(page, empties[0], sol[empties[0]]);
    await page.locator('#sd-not').click();
    await put(page, empties[1], 4);
    await page.waitForTimeout(1300);
    const before = await readBoard(page);
    await page.reload();
    await ready(page);
    await expect(page.locator('#sd-durum')).toContainText('Kayıtlı oyununuz yüklendi');
    const after = await readBoard(page);
    expect(after.values).toEqual(before.values);
    expect(after.given).toEqual(before.given);
    expect(after.notes).toEqual(before.notes);
    expect(Number(await page.locator('#sd-sure').getAttribute('data-value'))).toBeGreaterThanOrEqual(1);
  });

  test('bozuk kayıt sessizce yok sayılır ve yeni bulmaca üretilir', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    // sayfa kapanırken oyun kaydı yeniden yazıldığından bozuk kaydı yeni belge açılmadan önce yerleştir
    await page.addInitScript(() => localStorage.setItem('ba-sudoku-kayit', '{"v":1,"level":"orta","puzzle":"abc"}'));
    await page.reload();
    await ready(page);
    await expect(page.locator('#sd-durum')).toContainText('Yeni bulmaca hazır');
    await expect(page.locator('.sd-cell')).toHaveCount(81);
  });

  test('yeni oyun, ilerleme varsa önce onay ister', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    const { board, sol } = await solutionOf(page);
    const i = board.values.findIndex((v) => !v);
    await put(page, i, sol[i]);
    await page.locator('#sd-yeni').click();
    await expect(page.locator('#sd-yeni')).toHaveAttribute('data-armed', '1');
    await expect(page.locator('#sd-yeni')).toContainText('Emin misiniz');
    // bozulmadı
    await expect(cell(page, i)).toHaveAttribute('data-v', String(sol[i]));
    await page.locator('#sd-yeni').click();
    await ready(page);
    await expect(page.locator('#sd-yeni')).toHaveText('Yeni oyun');
    await expect(page.locator('#sd-durum')).toContainText('Yeni bulmaca hazır');
  });

  test('günlük bulmaca: aynı tarihte aynı, farklı tarihte farklı tahta', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-03-14T10:00:00'));
    await page.goto(URL);
    await ready(page);
    await page.locator('#sd-gunluk').click();
    await ready(page);
    await expect(page.locator('#sd-mod')).toContainText('Günlük bulmaca · 2026-03-14');
    const a = (await readBoard(page)).values;
    // kayıtları sil, yeniden aç: aynı tarih aynı tahta
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await ready(page);
    await page.locator('#sd-gunluk').click();
    await ready(page);
    const b = (await readBoard(page)).values;
    expect(b).toEqual(a);
    expect(countSolutions(a).count).toBe(1);
    // başka tarih -> başka bulmaca
    await page.clock.setFixedTime(new Date('2026-03-15T10:00:00'));
    await page.locator('#sd-gunluk').click();
    await ready(page);
    await expect(page.locator('#sd-mod')).toContainText('2026-03-15');
    const c = (await readBoard(page)).values;
    expect(c).not.toEqual(a);
  });

  test('yazdır: düğme yazdırmayı tetikler; yazdırma görünümü yalnızca boş bulmacayı gösterir', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    await page.evaluate(() => { (window as any).__printed = 0; window.print = () => { (window as any).__printed++; }; });
    const { board, sol } = await solutionOf(page);
    const i = board.values.findIndex((v) => !v);
    await put(page, i, sol[i]); // girilen rakam basılmamalı
    await page.locator('#sd-yazdir').click();
    expect(await page.evaluate(() => (window as any).__printed)).toBe(1);
    await expect(page.locator('#sd-baski')).toBeHidden(); // ekranda görünmez
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#sd-baski')).toBeVisible();
    await expect(page.locator('.ba-header')).toBeHidden();
    await expect(page.locator('#sd-tahta')).toBeHidden();
    await expect(page.locator('#sd-baski td')).toHaveCount(81);
    const printed = await page.$$eval('#sd-baski td', (tds) => tds.map((t) => Number((t as HTMLElement).innerText || 0)));
    expect(printed).toEqual(board.values);
    await page.emulateMedia({ media: 'screen' });
    await expect(page.locator('#sd-baski')).toBeHidden();
  });

  test('duraklat: tahta gizlenir, süre durur; devam edince geri gelir', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    await expect.poll(async () => Number(await page.locator('#sd-sure').getAttribute('data-value')), { timeout: 5000 }).toBeGreaterThanOrEqual(1);
    await page.locator('#sd-duraklat').click();
    await expect(page.locator('#sd-duraklatildi')).toBeVisible();
    await expect(page.locator('#sd-tahta')).toBeHidden();
    const frozen = await page.locator('#sd-sure').getAttribute('data-value');
    await page.waitForTimeout(1300);
    expect(await page.locator('#sd-sure').getAttribute('data-value')).toBe(frozen);
    await page.locator('#sd-devam').click();
    await expect(page.locator('#sd-tahta')).toBeVisible();
  });

  test('klavye: ok tuşlarıyla gezinme, tek sekme durağı', async ({ page }) => {
    await page.goto(URL);
    await ready(page);
    expect(await page.locator('.sd-cell[tabindex="0"]').count()).toBe(1);
    await cell(page, 0).focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(cell(page, 10)).toBeFocused();
    await expect(cell(page, 10)).toHaveClass(/is-selected/);
    await page.keyboard.press('End');
    await expect(cell(page, 17)).toBeFocused();
    expect(await page.locator('.sd-cell[tabindex="0"]').count()).toBe(1);
  });

  test('360px genişlikte sayfa yatay taşmaz, tahta ve rakam tuşları sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    await ready(page);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over).toBeLessThanOrEqual(0);
    const box = await page.locator('#sd-tahta').boundingBox();
    expect(box!.width).toBeLessThanOrEqual(360);
    expect(box!.width).toBeGreaterThanOrEqual(250);
    const keyBox = await page.locator('#sd-rakamlar [data-d="9"]').boundingBox();
    expect(keyBox!.x + keyBox!.width).toBeLessThanOrEqual(360);
    expect(keyBox!.height).toBeGreaterThanOrEqual(44);
    // seviye değişince de taşma olmaz
    await newGame(page, 'uzman');
    const over2 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over2).toBeLessThanOrEqual(0);
  });
});
