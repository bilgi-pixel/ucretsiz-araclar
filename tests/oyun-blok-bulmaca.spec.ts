import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Blok Bulmaca: puanlama (+18, satır+sütun = 2 hat, kombo), oyun sonu, tohum, klavye akışı, fare ve dokunmatik sürükleme,
// Kolay mod döndürme, bozuk kayıt, 360px ve içerik denetimleri.
const URL_PATH = '/oyunlar/blok-bulmaca/';
const KEY = 'ba-oyun-blok-bulmaca';
const EMPTY = Array(8).fill('........');
// (r + c) % 3 === 0 dolu: hiçbir 3×3 pencere boş değil, hiçbir satır/sütun dolu değil
const NO_3X3 = Array.from({ length: 8 }, (_, r) => Array.from({ length: 8 }, (_, c) => ((r + c) % 3 === 0 ? '#' : '.')).join(''));

type Snap = {
  board: string[]; tray: (string | null)[]; score: number; best: number; combo: number; moves: number; lines: number; over: boolean;
  seed: number; easy: boolean; fair: boolean; selected: number; cursor: { r: number; c: number }; ghost: boolean; generated: string[];
  last: null | { rows: number[]; cols: number[]; lines: number; cleared: number; points: number; combo: number; mult: number; placed: number };
};
const snap = (page: Page): Promise<Snap> => page.evaluate(() => (window as any).__blokBulmacaTest());
const call = (page: Page, fn: string, ...args: unknown[]): Promise<any> =>
  page.evaluate(([f, a]) => (window as any).__blokBulmacaTest[f as string](...(a as unknown[])), [fn, args] as const);
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);

async function open(page: Page, query = '') {
  await page.goto(URL_PATH + query);
  await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
  await expect(page.locator('#bb-board .bb-cell')).toHaveCount(64);
}
async function moveCursorTo(page: Page, r: number, c: number) {
  const s = await snap(page);
  const dr = r - s.cursor.r;
  const dc = c - s.cursor.c;
  for (let i = 0; i < Math.abs(dr); i++) await page.keyboard.press(dr > 0 ? 'ArrowDown' : 'ArrowUp');
  for (let i = 0; i < Math.abs(dc); i++) await page.keyboard.press(dc > 0 ? 'ArrowRight' : 'ArrowLeft');
  expect((await snap(page)).cursor).toEqual({ r, c });
}
/** Fareyle tepsideki parçayı ortasından tutup sol üst hücresi (r, c) olacak biçimde sürükler. */
async function mouseDrag(page: Page, slot: number, r: number, c: number, release = true) {
  await page.evaluate(() => document.getElementById('oyun')!.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior }));
  const mini = (await page.locator(`.bb-slot[data-slot="${slot}"] .bb-mini`).boundingBox())!;
  const c0 = (await page.locator('#bb-board .bb-cell').nth(0).boundingBox())!;
  const c1 = (await page.locator('#bb-board .bb-cell').nth(1).boundingBox())!;
  const pitch = c1.x - c0.x;
  const gap = pitch - c0.width;
  const s = await snap(page);
  const shapes = await call(page, 'shapes');
  const sh = shapes.find((x: { id: string }) => x.id === s.tray[slot]);
  const tx = c0.x + c * pitch + (sh.w * pitch - gap) / 2;
  const ty = c0.y + r * pitch + (sh.h * pitch - gap) / 2;
  await page.mouse.move(mini.x + mini.width / 2, mini.y + mini.height / 2);
  await page.mouse.down();
  await page.mouse.move(tx, ty, { steps: 12 });
  if (release) await page.mouse.up();
}

test.describe('Blok Bulmaca', () => {
  test('sayfa açılır; 37 parçalık set döndürmeye kapalı; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Blok Bulmaca');
    await expect(page.locator('.bb-slot .bb-mini')).toHaveCount(3);
    const shapes: { id: string; family: string; weight: number; rot: string; cells: number; h: number; w: number }[] = await call(page, 'shapes');
    expect(shapes.length).toBe(37);
    expect(new Set(shapes.map((s) => s.family))).toEqual(new Set(['dot', 'line', 'sq2', 'sq3', 'rect', 'l3', 'l4', 't', 'sz', 'corner']));
    const byId = new Map(shapes.map((s) => [s.id, s]));
    for (const s of shapes) {
      const r1 = byId.get(s.rot)!;
      expect(r1, s.id).toBeTruthy();
      expect([r1.h, r1.w, r1.cells]).toEqual([s.w, s.h, s.cells]);
      expect(byId.get(byId.get(byId.get(r1.rot)!.rot)!.rot)!.id).toBe(s.id); // dört dönüş = kendisi
    }
    expect(byId.get('line4h')!.rot).toBe('line4v');
    // Metin: tek kare, 2'li/3'lü çubuk ve 2×2 en sık; 3×3 ve 5'li çubuk seyrek; büyük köşe ve 4'lü L'nin her yönü daha da seyrek
    const w = (id: string) => byId.get(id)!.weight;
    const maxW = Math.max(...shapes.map((x) => w(x.id)));
    for (const id of ['dot', 'line2h', 'line2v', 'line3h', 'line3v', 'sq2']) expect(w(id), id).toBe(maxW);
    for (const id of ['sq3', 'line5h', 'line5v']) expect(w(id), id).toBeLessThan(maxW);
    for (const x of shapes.filter((y) => y.family === 'corner' || y.family === 'l4')) expect(w(x.id), x.id).toBeLessThan(w('sq3'));
    expect(byId.get('sq3')!.rot).toBe('sq3');
    const s = await snap(page);
    expect(s.tray.every(Boolean)).toBe(true);
    expect(s.score).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('bir satıra klavyeyle 8 tek kare: satır temizlenir, puan +18', async ({ page }) => {
    await open(page);
    await call(page, 'newGame', { seed: 1, easy: false, fair: true });
    await call(page, 'setBoard', EMPTY);
    for (let i = 0; i < 8; i++) {
      await call(page, 'setTray', ['dot', 'dot', 'dot']);
      await page.keyboard.press('1');
      expect((await snap(page)).selected).toBe(0);
      await moveCursorTo(page, 0, i);
      await page.keyboard.press('Enter');
      expect((await snap(page)).moves).toBe(i + 1);
      if (i === 6) {
        const s = await snap(page);
        expect(s.board[0]).toBe('#######.');
        expect(s.score).toBe(7);
      }
    }
    const s = await snap(page);
    expect(s.board).toEqual(EMPTY);
    expect(s.score).toBe(18);
    expect(s.last).toMatchObject({ lines: 1, rows: [0], cols: [], cleared: 8, points: 11, combo: 1 });
    await expect(page.locator('#bb-score')).toHaveText('18');
    await expect(page.locator('#bb-combo')).toHaveText('×1');
    await expect(page.locator('#bb-msg')).toContainText('1 hat temizlendi');
  });

  test('fareyle sürükle-bırak: aynı hamlede satır + sütun = 2 hat, kesişen hücre bir kez; kombo ve kırmızı vurgu', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await call(page, 'newGame', { seed: 5, easy: false });
    await call(page, 'setBoard', ['#######.', ...Array(7).fill('.......#')]);
    await call(page, 'setTray', ['dot', 'sq2', 'dot']);
    // Geçersiz konum: 2×2 dolu sütunun üstüne → kırmızı vurgu, bırakınca yerleşmez
    await mouseDrag(page, 1, 3, 6, false);
    await expect(page.locator('#bb-board .bb-cell.is-bad')).toHaveCount(4);
    await expect(page.locator('#bb-float')).toBeVisible();
    await page.mouse.up();
    await expect(page.locator('#bb-float')).toBeHidden();
    expect((await snap(page)).moves).toBe(0);
    await expect(page.locator('#bb-msg')).toContainText('sığmıyor');
    // Geçerli konum: önizlemede temizlenecek hatlar vurgulanır, bırakınca 2 hat silinir
    await mouseDrag(page, 0, 0, 7, false);
    await expect(page.locator('#bb-board .bb-cell.is-ghost')).toHaveCount(1);
    await expect(page.locator('#bb-board .bb-cell.is-line')).toHaveCount(15);
    await page.mouse.up();
    let s = await snap(page);
    expect(s.last).toMatchObject({ rows: [0], cols: [7], lines: 2, cleared: 15, points: 41, combo: 1 });
    expect(s.board).toEqual(EMPTY);
    expect(s.score).toBe(41);
    // Sürüklemenin hemen ardından başka parçaya tıklamak onu seçer (yalnızca sürüklemenin kendi tıklaması yutulur)
    await page.locator('.bb-slot[data-slot="2"]').click();
    expect((await snap(page)).selected).toBe(2);
    // Art arda ikinci temizleme: kombo ×2 → 1 + 10 × 1 × 2
    await call(page, 'setBoard', ['........', '........', '........', '#######.', '........', '........', '........', '........']);
    await call(page, 'setTray', ['dot', 'dot', 'dot']);
    let res = await call(page, 'place', 0, 3, 7);
    expect(res).toMatchObject({ ok: true, lines: 1, combo: 2, mult: 2, points: 21 });
    await expect(page.locator('#bb-combo')).toHaveText('×2');
    res = await call(page, 'place', 1, 5, 5);
    expect(res).toMatchObject({ ok: true, lines: 0, combo: 0, points: 1 });
    await expect(page.locator('#bb-combo')).toHaveText('–');
    s = await snap(page);
    expect(s.score).toBe(41 + 21 + 1);
    // Dolu hücreye yerleştirme reddedilir
    res = await call(page, 'place', 2, 5, 5);
    expect(res).toMatchObject({ ok: false, reason: 'blocked' });
    expect(errors).toEqual([]);
  });

  test('3×3 sığmayan dolu tahtada oyun biter; en yüksek skor yazılır; Tekrar oyna çalışır', async ({ page }) => {
    await open(page);
    await call(page, 'newGame', { seed: 9, easy: false });
    await call(page, 'setBoard', EMPTY);
    await call(page, 'setTray', ['sq3', 'dot', 'dot']);
    expect((await call(page, 'place', 0, 0, 0)).ok).toBe(true);
    expect((await snap(page)).score).toBe(9);
    await call(page, 'setBoard', NO_3X3);
    let s = await call(page, 'setTray', ['dot', null, null]);
    expect(s.over).toBe(false); // tek kare sığar
    s = await call(page, 'setTray', ['sq3', null, null]);
    expect(s.over).toBe(true);
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'bitti');
    await expect(page.locator('#sonuc')).toBeVisible();
    await expect(page.locator('#sonuc')).toHaveClass(/is-active/);
    await expect(page.locator('#bb-over')).toBeVisible();
    await expect(page.locator('#sonuc-puan')).toHaveText('9');
    await expect(page.locator('#sonuc-ozet')).toHaveText('1 parça yerleştirdiniz, 0 hat temizlediniz; kombo yapılmadı.');
    await expect(page.locator('#sonuc-rekor')).toBeVisible();
    await expect(page.locator('.bb-slot:not([disabled])')).toHaveCount(0);
    expect((await stored(page)).best.klasik).toBe(9);
    await expect(page.locator('#bb-again')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await expect(page.locator('#sonuc')).toBeHidden();
    s = await snap(page);
    expect([s.score, s.moves, s.over]).toEqual([0, 0, false]);
    await expect(page.locator('#bb-best')).toHaveText('9');
  });

  test('tohum: aynı ?seed aynı parça dizisi, farklı tohum farklı dizi; "Aynı parçalarla tekrar oyna"', async ({ page, context }) => {
    const play = (p: Page, n: number): Promise<Snap> => p.evaluate((count) => {
      const t = (window as any).__blokBulmacaTest;
      for (let k = 0; k < count; k++) {
        const s = t();
        if (s.over) break;
        const slot = s.tray.findIndex(Boolean);
        let done = false;
        for (let r = 0; r < 8 && !done; r++) for (let c = 0; c < 8 && !done; c++) if (t.place(slot, r, c).ok) done = true;
        if (!done) break;
      }
      return t();
    }, n);
    await open(page, '?seed=2026');
    await expect(page.locator('#bb-seed')).toHaveText('2026');
    const a = await play(page, 9);
    const p2 = await context.newPage();
    await open(p2, '?seed=2026');
    const b = await play(p2, 9);
    expect(a.generated.length).toBeGreaterThanOrEqual(12);
    expect(b.generated).toEqual(a.generated);
    expect(b.board).toEqual(a.board);
    expect(b.score).toBe(a.score);
    await open(p2, '?seed=2027');
    const c = await play(p2, 9);
    expect(c.generated.slice(0, 9)).not.toEqual(a.generated.slice(0, 9));
    // Metin ya da bozuk tohum çökertmez ve yine kararlıdır
    const errors: string[] = [];
    p2.on('pageerror', (e) => errors.push(String(e)));
    await open(p2, '?seed=abc');
    const x1 = (await snap(p2)).generated.slice(0, 3);
    await open(p2, '?seed=abc');
    expect((await snap(p2)).generated.slice(0, 3)).toEqual(x1);
    await open(p2, '?seed=%E0%A4%A');
    await open(p2, '?seed=');
    expect((await play(p2, 2)).moves).toBe(2);
    expect(errors).toEqual([]);
    // Tohumsuz oyun: bitince aynı dizi yeniden başlatılabilir
    await open(p2);
    const first = await snap(p2);
    await call(p2, 'setBoard', NO_3X3);
    await call(p2, 'setTray', ['sq3', null, null]);
    await expect(p2.locator('#sonuc')).toBeVisible();
    await expect(p2.locator('#sonuc-tohum')).toHaveText(String(first.seed));
    await p2.locator('#bb-same').click();
    const again = await snap(p2);
    expect(again.seed).toBe(first.seed);
    expect(again.tray).toEqual(first.generated.slice(0, 3));
  });

  test('klavyeyle tam oyun akışı: Tab ile seç, oklarla taşı, Enter yerleştir, Esc iptal, oyun sonu ve yeniden başla', async ({ page }) => {
    await open(page);
    await call(page, 'newGame', { seed: 3, easy: false });
    await call(page, 'setTray', ['sq2', 'line3h', 'l3-0']);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    let found = false;
    for (let i = 0; i < 120 && !found; i++) {
      await page.keyboard.press('Tab');
      found = await page.evaluate(() => document.activeElement?.matches('.bb-slot[data-slot="0"]') ?? false);
    }
    expect(found).toBe(true);
    expect((await snap(page)).selected).toBe(0);
    await expect(page.locator('.bb-slot[data-slot="0"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#bb-board .bb-cell.is-ghost')).toHaveCount(4);
    await moveCursorTo(page, 0, 0);
    await page.keyboard.press('Enter');
    let s = await snap(page);
    expect(s.moves).toBe(1);
    expect(s.score).toBe(4);
    expect(s.board.slice(0, 2)).toEqual(['##......', '##......']);
    // odak ve seçim sıradaki parçaya geçer
    await expect(page.locator('.bb-slot[data-slot="1"]')).toBeFocused();
    expect(s.selected).toBe(1);
    await moveCursorTo(page, 3, 2);
    await page.keyboard.press('Escape');
    s = await snap(page);
    expect([s.selected, s.ghost]).toEqual([-1, false]);
    await expect(page.locator('#bb-board .bb-cell.is-ghost')).toHaveCount(0);
    await page.keyboard.press('2');
    expect((await snap(page)).cursor).toEqual({ r: 3, c: 2 });
    await page.keyboard.press('Enter');
    s = await snap(page);
    expect(s.moves).toBe(2);
    expect(s.board[3]).toBe('..###...');
    // üçüncü parça (3'lü L) aynı konumda çakışır: kırmızı vurgu, yerleşmez
    await expect(page.locator('.bb-slot[data-slot="2"]')).toBeFocused();
    await expect(page.locator('#bb-board .bb-cell.is-bad')).toHaveCount(3);
    await page.keyboard.press('Enter');
    expect((await snap(page)).moves).toBe(2);
    await expect(page.locator('#bb-msg')).toContainText('sığmıyor');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    s = await snap(page);
    expect(s.moves).toBe(3);
    expect(s.score).toBe(10);
    expect(s.tray.every(Boolean)).toBe(true); // üçü de yerleşti → yeni üçlü
    await expect(page.locator('.bb-slot[data-slot="0"]')).toBeFocused();
    // R klasik modda döndürmez
    const before = (await snap(page)).tray[0];
    await page.keyboard.press('r');
    expect((await snap(page)).tray[0]).toBe(before);
    // oyun sonu → odak "Tekrar oyna"da → Enter yeni oyun
    await call(page, 'setBoard', NO_3X3);
    await call(page, 'setTray', ['sq3', null, null]);
    await expect(page.locator('#bb-again')).toBeFocused();
    expect((await stored(page)).best.klasik).toBeGreaterThanOrEqual(10);
    await page.keyboard.press('Enter');
    await expect(page.locator('#oyun')).toHaveAttribute('data-phase', 'oyun');
    await page.keyboard.press('1');
    await page.keyboard.press('Enter');
    expect((await snap(page)).moves).toBe(1);
  });

  test('Kolay mod: R döndürür; döndürülünce sığan parça oyunu bitirmez (klasikte bitirir)', async ({ page }) => {
    const col0 = ['..######', '.#.#####', '.##.####', '.###.###', '.####.##', '.#####.#', '.######.', '.#######']; // yatayda 4'lü boşluk yok, 0. sütun boş
    await open(page);
    await call(page, 'newGame', { seed: 4, easy: false });
    await call(page, 'setBoard', col0);
    let s = await call(page, 'setTray', ['line4h', null, null]);
    expect(s.over).toBe(true);
    await call(page, 'newGame', { seed: 4, easy: true });
    await expect(page.locator('#bb-easy')).toBeChecked();
    await expect(page.locator('#bb-rotate')).toBeVisible();
    await call(page, 'setBoard', col0);
    s = await call(page, 'setTray', ['line4h', null, null]);
    expect(s.over).toBe(false);
    await page.keyboard.press('1');
    await page.keyboard.press('r');
    expect((await snap(page)).tray[0]).toBe('line4v');
    await page.locator('#bb-rotate').click();
    expect((await snap(page)).tray[0]).toBe('line4h');
    await page.keyboard.press('1'); // odak Döndür düğmesinden parçaya döner
    await page.keyboard.press('R');
    await moveCursorTo(page, 2, 0);
    await page.keyboard.press('Enter');
    s = await snap(page);
    expect(s.moves).toBe(1);
    expect(s.last).toMatchObject({ id: 'line4v', lines: 0, points: 4 });
    expect(s.board.map((row) => row[0]).join('')).toBe('..####..');
    expect((await stored(page)).best.kolay).toBe(4);
  });

  test('bozuk localStorage ve kapalı depolama çökertmez; ses ayarı kaydedilir', async ({ context }) => {
    for (const bad of ['{bozuk', '"x"', '[1]', 'null', '{"best":{"klasik":"z","kolay":-5},"sound":"evet","easy":1,"games":"q"}']) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.addInitScript(([k, v]) => { localStorage.setItem(k, v); }, [KEY, bad]);
      await open(page);
      await expect(page.locator('#bb-best')).toHaveText('0');
      await expect(page.locator('#bb-easy')).not.toBeChecked();
      const s = await snap(page);
      let ok = false;
      for (let r = 0; r < 8 && !ok; r++) for (let c = 0; c < 8 && !ok; c++) ok = (await call(page, 'place', 0, r, c)).ok;
      expect(ok).toBe(true);
      expect((await snap(page)).moves).toBe(s.moves + 1);
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
    await page.locator('#bb-sound').click();
    await expect(page.locator('#bb-sound')).toHaveAttribute('aria-pressed', 'true');
    await call(page, 'setBoard', NO_3X3);
    await call(page, 'setTray', ['sq3', null, null]);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(errors).toEqual([]);
    await page.close();
    const p3 = await context.newPage();
    await open(p3);
    await p3.evaluate((k) => localStorage.removeItem(k), KEY);
    await p3.locator('#bb-sound').click();
    await expect(p3.locator('#bb-sound')).toHaveText('Ses: açık');
    expect((await stored(p3)).sound).toBe(true);
  });

  test('360px: yatay taşma yok, hücre ≥ 36px; dokunmatikte parça parmağın üstünde, bırakınca yerleşir; hareket azaltma', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    const cell = (await page.locator('#bb-board .bb-cell').first().boundingBox())!;
    expect(cell.width).toBeGreaterThanOrEqual(36);
    await call(page, 'newGame', { seed: 8, easy: false });
    await call(page, 'setBoard', ['#######.', ...Array(7).fill('........')]);
    await call(page, 'setTray', ['dot', 'dot', 'dot']);
    await page.evaluate(() => document.getElementById('bb-stage')!.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior }));
    // Dokunmatik sürükleme: sentetik PointerEvent (pointerType touch)
    const info = await page.evaluate(() => {
      const slot = document.querySelector('.bb-slot[data-slot="0"]') as HTMLElement;
      const sr = slot.getBoundingClientRect();
      const cells = document.querySelectorAll('#bb-board .bb-cell');
      const a = cells[0].getBoundingClientRect();
      const target = (cells[7] as HTMLElement).getBoundingClientRect(); // (0, 7)
      const fire = (type: string, x: number, y: number) => slot.dispatchEvent(new PointerEvent(type, { pointerId: 41, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, bubbles: true, cancelable: true }));
      const x0 = sr.left + sr.width / 2;
      const y0 = sr.top + sr.height / 2;
      fire('pointerdown', x0, y0);
      const fx = target.left + target.width / 2;
      const fy = target.top + a.width + 28 + 2; // parmak, parçanın 28px altında
      fire('pointermove', x0, y0 - 20);
      fire('pointermove', window.innerWidth - 2, fy); // parmak ekranın sağ kenarında: yüzen parça dışarı taşmamalı
      const dragOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      fire('pointermove', fx, fy);
      const fr = (document.getElementById('bb-float') as HTMLElement).getBoundingClientRect();
      const ghost = document.querySelectorAll('#bb-board .bb-cell.is-ghost').length;
      fire('pointerup', fx, fy);
      return { floatBottom: fr.bottom, finger: fy, ghost, dragOverflow };
    });
    expect(info.ghost).toBe(1);
    expect(info.dragOverflow).toBeLessThanOrEqual(0);
    expect(info.floatBottom).toBeLessThan(info.finger); // parça parmağın üstünde
    const s = await snap(page);
    expect(s.last).toMatchObject({ rows: [0], lines: 1, points: 11 });
    await expect(page.locator('#bb-board .bb-cell.is-clearing')).toHaveCount(0); // hareket azaltma: animasyon sınıfı yok
    // Oyun sonu kutusu da 360px'e sığar
    await call(page, 'setBoard', NO_3X3);
    await call(page, 'setTray', ['sq3', null, null]);
    await expect(page.locator('#sonuc')).toBeVisible();
    expect(await over()).toBeLessThanOrEqual(0);
  });

  test('içerik: 900+ kelime, 3 reklam (A oyun kutusunun dışında ve altında), 7+ SSS, VideoGame + FAQPage JSON-LD', async ({ page }) => {
    await open(page);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const x of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-blok-bulmaca-${x}"]`)).toHaveCount(1);
    expect(await page.locator('#oyun .ba-ad').count()).toBe(0);
    const box = (await page.locator('#oyun').boundingBox())!;
    const adA = (await page.locator('.ba-ad[data-slot="oyun-blok-bulmaca-a"]').boundingBox())!;
    expect(adA.y).toBeGreaterThanOrEqual(box.y + box.height);
    const faqs = await page.locator('.ba-faq details').count();
    expect(faqs).toBeGreaterThanOrEqual(7);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    const types = data['@graph'].map((x: { '@type': string }) => x['@type']);
    expect(types).toEqual(expect.arrayContaining(['VideoGame', 'FAQPage']));
    expect(data['@graph'].find((x: { '@type': string }) => x['@type'] === 'FAQPage').mainEntity.length).toBe(faqs);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/blok-bulmaca/');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#tam-ekran')).toHaveCount(1);
    expect(await page.title()).toBe('Blok Bulmaca Oyna – Ücretsiz Online 8x8 Blok Yerleştirme Oyunu');
  });
});
