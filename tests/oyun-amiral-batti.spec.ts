import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Amiral Battı: motor kuralları (yerleştirme, batma, kazanma, yapay zekâ), arayüz (yerleştirme, atış, bilgisayar yanıtı,
// kazanma/kaybetme, iki kişilik devir ekranı), klavye, bozuk localStorage, 360px ve içerik denetimi.
const URL_PATH = '/oyunlar/amiral-batti/';
const STORE_KEY = 'ba-oyun-amiral-batti';

// Bilinen filo: her gemi kendi satırında soldan başlar (A1–A5, B1–B4, C1–C3, D1–D3, E1–E2).
const KNOWN = [
  { id: 'amiral', name: 'Amiral gemisi', len: 5, r: 0, c: 0, horiz: true },
  { id: 'kruvazor', name: 'Kruvazör', len: 4, r: 1, c: 0, horiz: true },
  { id: 'muhrip1', name: 'Muhrip', len: 3, r: 2, c: 0, horiz: true },
  { id: 'muhrip2', name: 'Muhrip', len: 3, r: 3, c: 0, horiz: true },
  { id: 'denizalti', name: 'Denizaltı', len: 2, r: 4, c: 0, horiz: true },
];
const KNOWN_CELLS = [0, 1, 2, 3, 4, 10, 11, 12, 13, 20, 21, 22, 30, 31, 32, 40, 41];

const hook = (page: Page) => (fn: string) => page.evaluate(`(() => { const t = window.__amiralTest(); return ${fn}; })()`);
const target = (page: Page, i: number) => page.locator(`#ab-target .ab-cell[data-i="${i}"]`);
const own = (page: Page, i: number) => page.locator(`#ab-own .ab-cell[data-i="${i}"]`);

/** Bilgisayar sırası bitene (ya da oyun sonuna) kadar bekler. */
async function settle(page: Page) {
  await expect.poll(() => page.evaluate(`(() => { const s = window.__amiralTest().state(); return s.phase !== 'play' || (s.turn === 0 && !s.busy); })()`), { timeout: 8000 }).toBe(true);
}

/** Bilgisayara karşı: rastgele yerleştir, başlat, rakip filoyu bilinen düzene çevir. */
async function startVsCpu(page: Page) {
  await page.goto(URL_PATH);
  await page.click('#ab-random');
  await page.click('#ab-start');
  await expect(page.locator('#ab-target .ab-cell')).toHaveCount(100);
  await page.evaluate(`window.__amiralTest().setShips(1, ${JSON.stringify(KNOWN)})`);
}

test.describe('Amiral Battı', () => {
  test('sayfa açılır, yerleştirme paneli gelir, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Amiral Battı');
    await expect(page.locator('#ab-tray .ab-ship')).toHaveCount(5);
    await expect(page.locator('#ab-own .ab-cell')).toHaveCount(100);
    await expect(page.locator('#ab-start')).toBeDisabled();
    await expect(page.locator('#ab-wrap-target')).toBeHidden();
    expect(await page.evaluate("typeof window.__amiralTest")).toBe('function');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('motor: yerleştirme sınır ve çakışma kuralları, rastgele filo geçerli ve tohumlu', async ({ page }) => {
    await page.goto(URL_PATH);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/amiral-batti/engine.js');
      const base = [{ id: 'amiral', name: 'A', len: 5, r: 0, c: 0, horiz: true }];
      const out = {};
      out.ok = m.canPlace(base, 4, 1, 0, true).ok;
      out.touching = m.canPlace(base, 4, 1, 0, true).ok; // yan yana değmek serbest
      out.overlap = m.canPlace(base, 3, 0, 4, false); // A5'ten aşağı: çakışır
      out.edgeH = m.canPlace([], 5, 0, 6, true); // 6+5 > 10
      out.edgeV = m.canPlace([], 3, 8, 0, false); // 8+3 > 10
      out.negative = m.canPlace([], 2, -1, 0, true);
      out.exactFit = m.canPlace([], 5, 0, 5, true).ok; // tam sağ kenara oturur
      out.ignoreSelf = m.canPlace(base, 5, 0, 0, true, 'amiral').ok; // kendi yerinde tekrar
      out.placeBad = m.placeShip(base, { id: 'kruvazor', name: 'K', len: 4, r: 0, c: 3, horiz: true }, 0, 3, true).reason;
      let allValid = true; let sameSeed = true; let diffSeed = false;
      for (let s = 1; s <= 40; s++) {
        const f = m.randomFleet(m.mulberry32(s));
        if (!m.validateFleet(f)) allValid = false;
        const cells = new Set(f.flatMap((x) => m.shipCells(x.r, x.c, x.len, x.horiz)));
        if (cells.size !== 17) allValid = false;
        if (JSON.stringify(f) !== JSON.stringify(m.randomFleet(m.mulberry32(s)))) sameSeed = false;
        if (JSON.stringify(f) !== JSON.stringify(m.randomFleet(m.mulberry32(s + 100)))) diffSeed = true;
      }
      out.allValid = allValid; out.sameSeed = sameSeed; out.diffSeed = diffSeed;
      out.lens = m.FLEET.map((x) => x.len);
      out.name = [m.cellName(0), m.cellName(99), m.cellName(45), m.cellIndex('c5'), m.cellIndex('K1')];
      return out;
    })()`) as Record<string, any>;
    expect(res.ok).toBe(true);
    expect(res.overlap).toEqual({ ok: false, reason: 'cakisma' });
    expect(res.edgeH).toEqual({ ok: false, reason: 'sinir' });
    expect(res.edgeV).toEqual({ ok: false, reason: 'sinir' });
    expect(res.negative).toEqual({ ok: false, reason: 'sinir' });
    expect(res.exactFit).toBe(true);
    expect(res.ignoreSelf).toBe(true);
    expect(res.placeBad).toBe('cakisma');
    expect(res.allValid).toBe(true);
    expect(res.sameSeed).toBe(true);
    expect(res.diffSeed).toBe(true);
    expect(res.lens).toEqual([5, 4, 3, 3, 2]);
    expect(res.name).toEqual(['A1', 'J10', 'E6', 24, -1]);
  });

  test('motor: isabet, ıska, batma tespiti, tekrar atış reddi ve kazanma', async ({ page }) => {
    await page.goto(URL_PATH);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/amiral-batti/engine.js');
      const st = m.createFleetState(${JSON.stringify(KNOWN)});
      const out = {};
      out.miss = m.fire(st, 99).result;
      out.again = m.fire(st, 99).result;
      out.hit = m.fire(st, 40).result;
      out.notSunkYet = m.sunkShips(st).length;
      const s = m.fire(st, 41);
      out.sunk = [s.result, s.ship.id, s.win];
      out.sunkCount = m.sunkShips(st).length;
      out.remaining = m.remainingShips(st).map((x) => x.len);
      out.view = [m.viewOf(st)[40], m.viewOf(st)[99], m.viewOf(st)[0]];
      out.invalid = [m.fire(st, -1).result, m.fire(st, 100).result];
      let last;
      for (const i of [0,1,2,3,4,10,11,12,13,20,21,22,30,31,32]) last = m.fire(st, i);
      out.final = [last.result, last.win, m.allSunk(st)];
      out.hits = m.hitCount(st); out.shots = m.shotCount(st);
      return out;
    })()`) as Record<string, any>;
    expect(res.miss).toBe('miss');
    expect(res.again).toBe('invalid');
    expect(res.hit).toBe('hit');
    expect(res.notSunkYet).toBe(0);
    expect(res.sunk).toEqual(['sunk', 'denizalti', false]);
    expect(res.sunkCount).toBe(1);
    expect(res.remaining).toEqual([5, 4, 3, 3]);
    expect(res.view).toEqual(['s', 'm', '']);
    expect(res.invalid).toEqual(['invalid', 'invalid']);
    expect(res.final).toEqual(['sunk', true, true]);
    expect(res.hits).toBe(17);
    expect(res.shots).toBe(18);
  });

  test('motor: bilgisayar isabetten sonra komşuları ve hizalı uçları tarar, hiç tekrar atmaz, zor kolaydan iyidir', async ({ page }) => {
    await page.goto(URL_PATH);
    const res = await page.evaluate(`(async () => {
      const m = await import('/oyunlar/amiral-batti/engine.js');
      const out = {};
      const empty = () => new Array(100).fill('');
      // Tek isabet (F6 = 55): sonraki atış dört komşudan biri.
      const v1 = empty(); v1[55] = 'h';
      out.single = [...new Set(Array.from({ length: 30 }, (_, k) => m.chooseShot(v1, [5,4,3,3,2], m.mulberry32(k))))].sort((a,b)=>a-b);
      // İki yatay isabet (55, 56): yalnızca uçlar 54 ve 57.
      const v2 = empty(); v2[55] = 'h'; v2[56] = 'h';
      out.line = [...new Set(Array.from({ length: 30 }, (_, k) => m.chooseShot(v2, [5,4,3,3,2], m.mulberry32(k))))].sort((a,b)=>a-b);
      // İki dikey isabet (45, 55): uçlar 35 ve 65.
      const v3 = empty(); v3[45] = 'h'; v3[55] = 'h';
      out.vline = [...new Set(Array.from({ length: 30 }, (_, k) => m.chooseShot(v3, [5,4,3,3,2], m.mulberry32(k))))].sort((a,b)=>a-b);
      // Av modunda parite: yalnızca (r+c)%2==0 hücreleri.
      const hunt = Array.from({ length: 60 }, (_, k) => m.chooseShot(empty(), [5,4,3,3,2], m.mulberry32(k)));
      out.parityOk = hunt.every((i) => (Math.floor(i / 10) + (i % 10)) % 2 === 0);
      // Kalan en küçük gemi 3 ise aralık 3.
      const hunt3 = Array.from({ length: 60 }, (_, k) => m.chooseShot(empty(), [5,4,3], m.mulberry32(k)));
      out.parity3 = hunt3.every((i) => (Math.floor(i / 10) + (i % 10)) % 3 === 0);
      // Tam oyunlar: tekrar yok, bitiyor, ortalama.
      function play(level, seed) {
        const rnd = m.mulberry32(seed);
        const st = m.createFleetState(m.randomFleet(m.mulberry32(seed + 7777)));
        let n = 0; let repeats = 0;
        while (!m.allSunk(st) && n < 100) {
          const idx = m.chooseShot(m.viewOf(st), m.remainingShips(st).map((s) => s.len), rnd, level);
          const r = m.fire(st, idx);
          if (r.result === 'invalid') repeats++;
          n++;
        }
        return { n, repeats, done: m.allSunk(st) };
      }
      let hardSum = 0; let easySum = 0; let repeats = 0; let allDone = true;
      for (let s = 1; s <= 40; s++) {
        const h = play('hard', s); const e = play('easy', s);
        hardSum += h.n; easySum += e.n; repeats += h.repeats + e.repeats;
        if (!h.done || !e.done) allDone = false;
      }
      out.hardAvg = hardSum / 40; out.easyAvg = easySum / 40; out.repeats = repeats; out.allDone = allDone;
      return out;
    })()`) as Record<string, any>;
    expect(res.single).toEqual([45, 54, 56, 65]);
    expect(res.line).toEqual([54, 57]);
    expect(res.vline).toEqual([35, 65]);
    expect(res.parityOk).toBe(true);
    expect(res.parity3).toBe(true);
    expect(res.repeats).toBe(0);
    expect(res.allDone).toBe(true);
    expect(res.hardAvg).toBeLessThan(res.easyAvg - 10);
    expect(res.hardAvg).toBeLessThan(78);
  });

  test('yerleştirme: tıkla-koy, çakışma uyarısı, kenara sığdırma, R ile döndürme, geri alma, rastgele ve temizle', async ({ page }) => {
    await page.goto(URL_PATH);
    // 1) Amiral gemisi yatay A1–A5
    await own(page, 0).click();
    for (const i of [0, 1, 2, 3, 4]) await expect(own(page, i)).toHaveAttribute('data-ship', '1');
    await expect(page.locator('#ab-tray .ab-ship[data-id="amiral"]')).toHaveAttribute('data-placed', '1');
    await expect(page.locator('#ab-tray .ab-ship[data-id="kruvazor"]')).toHaveAttribute('aria-pressed', 'true');
    // 2) Kruvazör A3'e: çakışır
    await own(page, 2).click();
    await expect(page.locator('#ab-status')).toContainText('çakış');
    await expect(page.locator('#ab-own .ab-cell[data-ship="1"]')).toHaveCount(5);
    // 3) Kruvazör J10'a: sağ kenara kaydırılır (J7–J10)
    await own(page, 99).click();
    for (const i of [96, 97, 98, 99]) await expect(own(page, i)).toHaveAttribute('data-ship', '1');
    // 4) R ile dikey; iki muhrip ve denizaltı
    await page.keyboard.press('r');
    await expect(page.locator('#ab-orient')).toContainText('dikey');
    await own(page, 5).click(); // F1–F3
    await own(page, 60).click(); // A7–A9
    await own(page, 9).click(); // J1.. dikey 2 hücre: 9, 19
    for (const i of [5, 15, 25, 60, 70, 80, 9, 19]) await expect(own(page, i)).toHaveAttribute('data-ship', '1');
    await expect(page.locator('#ab-own .ab-cell[data-ship="1"]')).toHaveCount(17);
    await expect(page.locator('#ab-start')).toBeEnabled();
    // 5) Yerleşik gemiye tıklayınca geri alınır
    await own(page, 9).click();
    await expect(page.locator('#ab-start')).toBeDisabled();
    await expect(page.locator('#ab-own .ab-cell[data-ship="1"]')).toHaveCount(15);
    await expect(page.locator('#ab-tray .ab-ship[data-id="denizalti"]')).toHaveAttribute('aria-pressed', 'true');
    // 6) Temizle ve rastgele
    await page.click('#ab-clear');
    await expect(page.locator('#ab-own .ab-cell[data-ship="1"]')).toHaveCount(0);
    await page.click('#ab-random');
    await expect(page.locator('#ab-own .ab-cell[data-ship="1"]')).toHaveCount(17);
    await expect(page.locator('#ab-start')).toBeEnabled();
  });

  test('yerleştirme: fareyle sürükleyip bırakma', async ({ page }) => {
    await page.goto(URL_PATH);
    const ship = page.locator('#ab-tray .ab-ship[data-id="kruvazor"]');
    const cell = own(page, 33);
    await cell.scrollIntoViewIfNeeded();
    const a = (await ship.boundingBox())!;
    const b = (await cell.boundingBox())!;
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    await page.mouse.move(a.x + a.width / 2 + 20, a.y + a.height / 2 + 20, { steps: 4 });
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 8 });
    await expect(page.locator('#ab-own .ab-cell.is-prev-ok')).toHaveCount(4);
    await page.mouse.up();
    for (const i of [33, 34, 35, 36]) await expect(own(page, i)).toHaveAttribute('data-ship', '1');
    await expect(page.locator('#ab-tray .ab-ship[data-id="kruvazor"]')).toHaveAttribute('data-placed', '1');
  });

  test('bilgisayara karşı: isabet, ıska, batma mesajları, bilgisayar yanıtı ve sıra', async ({ page }) => {
    await startVsCpu(page);
    await page.evaluate(`window.__amiralTest().queueCpuShots([99, 98, 97, 96, 95, 94])`);
    await expect(page.locator('#ab-status')).toContainText('Savaş başladı');
    // İsabet
    await target(page, 0).click();
    await expect(page.locator('#ab-log')).toContainText('A1: İsabet!');
    await expect(target(page, 0)).toHaveAttribute('data-s', 'h');
    // Bu sırada sıra bilgisayarda: yeni atış sayılmaz
    await target(page, 1).click({ force: true });
    expect(await hook(page)('t.state().shots[0]')).toBe(1);
    await settle(page);
    expect(await hook(page)('t.state().shots')).toEqual([1, 1]);
    expect(await hook(page)('t.state().last[0]')).toBe(99);
    await expect(page.locator('#ab-status')).toContainText('Sıra sende');
    await expect(page.locator('#ab-log')).toContainText('Bilgisayar J10');
    // Iska
    await target(page, 95).click();
    await expect(page.locator('#ab-log')).toContainText(/F10|J6/);
    await expect(target(page, 95)).toHaveAttribute('data-s', 'm');
    await settle(page);
    // Batma
    await target(page, 40).click();
    await settle(page);
    await target(page, 41).click();
    await expect(page.locator('#ab-log')).toContainText('Denizaltı battı');
    await expect(page.locator('#ab-fleet-target li[data-sunk="1"]')).toHaveCount(1);
    await expect(target(page, 41)).toHaveAttribute('data-s', 's');
    // Aynı hücreye tekrar: sayılmaz
    await settle(page);
    const before = await hook(page)('t.state().shots[0]');
    await target(page, 41).click({ force: true });
    expect(await hook(page)('t.state().shots[0]')).toBe(before);
    await expect(page.locator('#ab-counts')).toContainText('Atışların: ' + before);
  });

  test('bilgisayara karşı: tüm gemileri batırınca kazanma ekranı ve istatistik yazılır', async ({ page }) => {
    await startVsCpu(page);
    await page.evaluate(`window.__amiralTest().queueCpuShots([99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81])`);
    for (const i of KNOWN_CELLS) {
      await target(page, i).click();
      await settle(page);
    }
    await expect(page.locator('#ab-result')).toHaveClass(/is-active/);
    await expect(page.locator('#ab-result-title')).toContainText('Tebrikler');
    await expect(page.locator('#ab-result-text')).toContainText('17 atışta');
    await expect(page.locator('#ab-fleet-target li[data-sunk="1"]')).toHaveCount(5);
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE_KEY);
    expect(stored.stats.hard.played).toBe(1);
    expect(stored.stats.hard.won).toBe(1);
    expect(stored.stats.hard.best).toBe(17);
    await expect(page.locator('#ab-s2')).toHaveText('1');
    await expect(page.locator('#ab-s3')).toHaveText('17');
    // Oyun bittikten sonra ateş edilemez
    await target(page, 99).click({ force: true });
    expect(await hook(page)('t.state().shots[0]')).toBe(17);
    // Tekrar oyna: yerleştirme ekranına döner, istatistik kalır
    await page.click('#ab-again');
    await expect(page.locator('#ab-place')).toBeVisible();
    await expect(page.locator('#ab-result')).not.toHaveClass(/is-active/);
    await expect(page.locator('#ab-s2')).toHaveText('1');
  });

  test('bilgisayar tüm filoyu batırınca kayıp ekranı çıkar ve kayıp sayılır', async ({ page }) => {
    await startVsCpu(page);
    await page.evaluate(`window.__amiralTest().setShips(0, ${JSON.stringify(KNOWN)})`);
    await page.evaluate(`window.__amiralTest().queueCpuShots(${JSON.stringify(KNOWN_CELLS)})`);
    let k = 99;
    for (let n = 0; n < 17; n++) {
      if (await page.locator('#ab-result.is-active').count()) break;
      await target(page, k--).click();
      await settle(page);
    }
    await expect(page.locator('#ab-result')).toHaveClass(/is-active/);
    await expect(page.locator('#ab-result-title')).toContainText('Bilgisayar kazandı');
    // Oyun bitince rakip gemileri açılır
    await expect(page.locator('#ab-target .ab-cell[data-reveal="1"]')).toHaveCount(17);
    const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || '{}'), STORE_KEY);
    expect(stored.stats.hard.lost).toBe(1);
    expect(stored.stats.hard.won).toBe(0);
    await page.click('#ab-reset-stats');
    await expect(page.locator('#ab-s1')).toHaveText('0');
  });

  test('iki kişilik mod: devir ekranı tahtayı gizler, atışlar sırayla gider, kazanan belirlenir', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.selectOption('#ab-opp', 'two');
    await expect(page.locator('#ab-place-title')).toContainText('Oyuncu 1');
    await page.click('#ab-random');
    await page.click('#ab-start');
    await expect(page.locator('#ab-cover')).toBeVisible();
    await expect(page.locator('#ab-stage')).toBeHidden();
    await expect(page.locator('#ab-cover-title')).toContainText('Oyuncu 2');
    await page.click('#ab-cover-btn');
    await expect(page.locator('#ab-stage')).toBeVisible();
    await expect(page.locator('#ab-place-title')).toContainText('Oyuncu 2');
    await expect(page.locator('#ab-own .ab-cell[data-ship="1"]')).toHaveCount(0); // Oyuncu 1'in gemileri görünmez
    await page.click('#ab-random');
    await page.click('#ab-start');
    await expect(page.locator('#ab-cover-title')).toContainText('Oyuncu 1');
    await page.click('#ab-cover-btn');
    await expect(page.locator('#ab-target .ab-cell')).toHaveCount(100);
    await page.evaluate(`window.__amiralTest().setShips(0, ${JSON.stringify(KNOWN)})`);
    await page.evaluate(`window.__amiralTest().setShips(1, ${JSON.stringify(KNOWN)})`);

    // Oyuncu 1 ateş eder; aynı turda ikinci atış sayılmaz; devir
    await target(page, 0).click();
    await expect(page.locator('#ab-status')).toContainText('Oyuncu 1');
    await expect(page.locator('#ab-turnbar')).toBeVisible();
    await target(page, 1).click({ force: true });
    expect(await hook(page)('t.state().shots[0]')).toBe(1);
    await page.click('#ab-endturn');
    await expect(page.locator('#ab-cover')).toBeVisible();
    await expect(page.locator('#ab-stage')).toBeHidden();
    await page.click('#ab-cover-btn');
    expect(await hook(page)('t.state().cur')).toBe(1);
    await expect(page.locator('#ab-target-title')).toContainText('Oyuncu 1');
    // Oyuncu 2 kendi tahtasında Oyuncu 1'in A1 isabetini görür
    await expect(own(page, 0)).toHaveAttribute('data-s', 'h');
    await target(page, 99).click();
    await expect(page.locator('#ab-log')).toContainText('Oyuncu 2 J10 hücresine ateş etti: ıska');
    await page.click('#ab-endturn');
    await page.click('#ab-cover-btn');

    // Oyuncu 1 kalan 16 hücreyi vurur, Oyuncu 2 ıskalar
    let miss = 98;
    for (const i of KNOWN_CELLS.slice(1)) {
      await target(page, i).click();
      if (await page.locator('#ab-result.is-active').count()) break;
      await page.click('#ab-endturn');
      await page.click('#ab-cover-btn');
      await target(page, miss--).click();
      await page.click('#ab-endturn');
      await page.click('#ab-cover-btn');
    }
    await expect(page.locator('#ab-result')).toHaveClass(/is-active/);
    await expect(page.locator('#ab-result-title')).toContainText('Oyuncu 1 kazandı');
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE_KEY);
    expect(stored.stats.two.p1).toBe(1);
    expect(stored.stats.two.played).toBe(1);
  });

  test('klavye: ok tuşlarıyla gezinme, Enter ile gemi koyma, R ile döndürme ve Enter ile ateş', async ({ page }) => {
    await page.goto(URL_PATH);
    await own(page, 0).focus();
    const active = () => page.evaluate(() => (document.activeElement as HTMLElement)?.dataset.i);
    await page.keyboard.press('ArrowRight');
    expect(await active()).toBe('1');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft'); // kenarda yerinde kalır
    expect(await active()).toBe('0');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('r');
    await expect(page.locator('#ab-orient')).toContainText('dikey');
    await page.keyboard.press('Enter');
    for (const i of [1, 11, 21, 31, 41]) await expect(own(page, i)).toHaveAttribute('data-ship', '1');
    expect(await page.locator('#ab-own .ab-cell[tabindex="0"]').count()).toBe(1);
    // Savaş: hedef tahtada klavyeyle ateş
    await page.click('#ab-random');
    await page.click('#ab-start');
    await target(page, 44).focus();
    await page.keyboard.press('ArrowRight');
    expect(await active()).toBe('45');
    await page.keyboard.press('Enter');
    await expect(target(page, 45)).not.toHaveAttribute('data-s', '');
    await expect(page.locator('#ab-log')).toContainText('E6');
  });

  test('bozuk localStorage içeriği oyunu çökertmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript((k) => localStorage.setItem(k, '{not json'), STORE_KEY);
    await page.goto(URL_PATH);
    await expect(page.locator('#ab-own .ab-cell')).toHaveCount(100);
    await expect(page.locator('#ab-s1')).toHaveText('0');
    await page.click('#ab-random');
    await page.click('#ab-start');
    await expect(page.locator('#ab-target .ab-cell')).toHaveCount(100);
    // Geçerli JSON ama beklenmeyen şekil
    await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ stats: 5, prefs: { opp: 'x' } })), STORE_KEY);
    await page.reload();
    await expect(page.locator('#ab-opp')).toHaveValue('hard');
    await expect(page.locator('#ab-s2')).toHaveText('0');
    await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ stats: { hard: { played: 'a', won: -3, best: null } } })), STORE_KEY);
    await page.reload();
    await expect(page.locator('#ab-s1')).toHaveText('0');
    expect(errors).toEqual([]);
  });

  test('360px genişlikte yerleştirme ve savaş ekranları taşmadan sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const b1 = (await page.locator('#ab-own').boundingBox())!;
    expect(b1.x).toBeGreaterThanOrEqual(0);
    expect(b1.x + b1.width).toBeLessThanOrEqual(360);
    await page.click('#ab-random');
    await page.click('#ab-start');
    expect(await overflow()).toBeLessThanOrEqual(0);
    const b2 = (await page.locator('#ab-target').boundingBox())!;
    expect(b2.x + b2.width).toBeLessThanOrEqual(360);
    const c = (await target(page, 0).boundingBox())!;
    expect(c.width).toBeGreaterThanOrEqual(22);
    // İki kişilik devir ekranı da taşmaz
    await page.selectOption('#ab-opp', 'two');
    await page.click('#ab-random');
    await page.click('#ab-start');
    await expect(page.locator('#ab-cover')).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });

  test('içerik: en az 900 kelime, 3 reklam alanı, en az 7 SSS, geçerli JSON-LD', async ({ page }) => {
    await page.goto(URL_PATH);
    const text = await page.locator('.ba-content').evaluate((el) => (el as HTMLElement).textContent || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const slots = await page.$$eval('.ba-ad', (els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-amiral-batti-a', 'oyun-amiral-batti-b', 'oyun-amiral-batti-c']);
    expect(await page.locator('#oyun-kutusu .ba-ad').count()).toBe(0);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(faqCount);
    const game = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame');
    expect(game.applicationCategory).toMatch(/Game/);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('#ab-full')).toBeVisible();
  });
});
