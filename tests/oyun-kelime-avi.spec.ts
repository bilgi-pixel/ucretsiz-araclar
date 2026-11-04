import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Kelime Avı doğrulaması: bulmaca üretimi (tüm boyut/zorluk), sürükleme, dokun-dokun ve klavye seçimi,
// ipucu, bitiş ve en iyi süre, Türkçe İ/I, bozuk localStorage, yazdırma görünümü, mobil taşma, dış istek yok.
const URL_PATH = '/oyunlar/kelime-avi/';
const KEY = 'ba-oyun-kelime-avi';
const CORE = '/oyunlar/kelime-avi/core.js';

type Placement = { word: string; dir: string; cells: number[][]; found: boolean };
type State = {
  size: number; level: string; cat: string; grid: string[]; placements: Placement[]; found: number; total: number;
  hints: number; hintCell: number[] | null; finished: boolean; elapsed: number;
  record: { time: number; hints: number; newBest: boolean; key: string } | null;
};

const getState = (page: Page) => page.evaluate(() => (window as unknown as { __kelimeAviTest: () => unknown }).__kelimeAviTest()) as Promise<State>;
const cell = (page: Page, r: number, c: number) => page.locator(`.ka-cell[data-r="${r}"][data-c="${c}"]`);

async function open(page: Page) {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(URL_PATH);
  await expect(page.locator('#grid')).toHaveAttribute('data-ready', '1');
  await expect(page.locator('.ka-cell').first()).toBeVisible();
}

async function chooseSize(page: Page, n: number, level?: string) {
  await page.locator(`[data-size-btn="${n}"]`).click();
  if (level) await page.locator(`[data-level-btn="${level}"]`).click();
  await expect(page.locator('#grid')).toHaveAttribute('data-size', String(n));
  await expect(page.locator('.ka-cell')).toHaveCount(n * n);
}

/** Izgarayı görünür alana getirir (yumuşak kaydırma yüzünden anlık kaydırma). */
async function showGrid(page: Page) {
  await page.locator('#grid').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
}

async function centerOf(page: Page, size: number, r: number, c: number) {
  const box = (await page.locator('#grid').boundingBox())!;
  const cw = box.width / size;
  return { x: box.x + (c + 0.5) * cw, y: box.y + (r + 0.5) * cw };
}

/** Izgara kutusu bir kez okunur; hızlı art arda sürüklemeler için. */
async function gridBox(page: Page) {
  return (await page.locator('#grid').boundingBox())!;
}

/** İlk hücreden son hücreye fareyle sürükler. */
async function dragBetween(page: Page, size: number, from: number[], to: number[], box?: { x: number; y: number; width: number }) {
  const bx = box || (await gridBox(page));
  const cw = bx.width / size;
  const at = (r: number, c: number) => ({ x: bx.x + (c + 0.5) * cw, y: bx.y + (r + 0.5) * cw });
  const a = at(from[0], from[1]);
  const b = at(to[0], to[1]);
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  await page.mouse.move(b.x, b.y, { steps: 4 });
  await page.mouse.up();
}

async function dragPlacement(page: Page, size: number, p: Placement, reverse = false, box?: { x: number; y: number; width: number }) {
  const first = p.cells[0];
  const last = p.cells[p.cells.length - 1];
  await dragBetween(page, size, reverse ? last : first, reverse ? first : last, box);
}

async function solveAll(page: Page) {
  await showGrid(page);
  const st = await getState(page);
  const box = await gridBox(page);
  for (const p of st.placements.filter((x) => !x.found)) await dragPlacement(page, st.size, p, false, box);
}

test.describe('Kelime Avı', () => {
  test('sayfa açılır, bulmaca hazır, içerik/reklam/SSS/JSON-LD tamam, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Kelime Avı');
    const st = await getState(page);
    expect(st.size).toBe(12);
    expect(st.total).toBe(12);
    await expect(page.locator('.ka-cell')).toHaveCount(144);
    await expect(page.locator('#words li')).toHaveCount(12);
    await expect(page.locator('#found-count')).toHaveText('0 / 12');
    await expect(page.locator('#hint-count')).toHaveText('0');
    await expect(page.locator('#best')).toHaveText('—');
    await expect(page.locator('#btn-full')).toBeVisible();
    await expect(page.locator('#kategori option')).toHaveCount(7);
    // Kelime listesi ızgarayla uyuşur: her kelime kendi yerleşiminde okunur.
    for (const p of st.placements) {
      expect(p.cells.map(([r, c]) => st.grid[r][c]).join('')).toBe(p.word);
    }
    // Ekranda yazdırma sayfası gizlidir.
    await expect(page.locator('#print-sheet')).toBeHidden();
    // Reklamlar: A oyun kutusunun dışında ve altında.
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const boxBottom = (await page.locator('#game-box').boundingBox())!;
    const adTop = (await page.locator('[data-slot="oyun-kelime-avi-a"]').boundingBox())!;
    expect(adTop.y).toBeGreaterThan(boxBottom.y + boxBottom.height + 90);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`[data-slot="oyun-kelime-avi-${s}"]`).count()).toBe(1);
    const details = await page.locator('details').count();
    expect(details).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('VideoGame');
    const faq = ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(faq.mainEntity.length).toBe(details);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kategoriler.json: her kategoride en az 40 geçerli Türkçe büyük harf kelime var', async ({ page }) => {
    await open(page);
    const res = await page.evaluate(`(async () => {
      const data = await (await fetch('/oyunlar/kelime-avi/kategoriler.json')).json();
      const alpha = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
      const out = {};
      for (const [k, v] of Object.entries(data)) {
        const w = v.kelimeler;
        out[k] = {
          n: w.length,
          upper: w.every((x) => x.toLocaleUpperCase('tr') === x),
          letters: w.every((x) => Array.from(x).every((ch) => alpha.includes(ch))),
          unique: new Set(w).size === w.length,
          short: w.filter((x) => x.length <= 10).length,
        };
      }
      return out;
    })()`) as Record<string, { n: number; upper: boolean; letters: boolean; unique: boolean; short: number }>;
    expect(Object.keys(res).sort()).toEqual(['genel', 'hayvanlar', 'meslekler', 'meyveler', 'renkler', 'sehirler', 'spor']);
    for (const [k, v] of Object.entries(res)) {
      expect(v.n, `${k} kelime sayısı`).toBeGreaterThanOrEqual(40);
      expect(v.upper, `${k} büyük harf`).toBe(true);
      expect(v.letters, `${k} alfabe`).toBe(true);
      expect(v.unique, `${k} yinelenen`).toBe(true);
      expect(v.short, `${k} kısa kelime`).toBeGreaterThanOrEqual(30);
    }
  });

  test('kelimeyi sürükleyerek bulur: renklenir, listede üstü çizilir; ters yönde sürükleme de çalışır', async ({ page }) => {
    await open(page);
    await showGrid(page);
    const st = await getState(page);
    const [p1, p2] = st.placements;
    await dragPlacement(page, st.size, p1);
    const li1 = page.locator(`#words li[data-word="${p1.word}"]`);
    await expect(li1).toHaveClass(/found/);
    await expect(li1.locator('.w')).toHaveCSS('text-decoration-line', 'line-through');
    await expect(page.locator('#found-count')).toHaveText('1 / 12');
    await expect(page.locator('#status')).toContainText(p1.word);
    for (const [r, c] of p1.cells) await expect(cell(page, r, c)).toHaveClass(/fd/);
    expect((await getState(page)).placements.find((p) => p.word === p1.word)!.found).toBe(true);
    // Kolay düzeyde kelime ileri yazılıdır ama son harften ilk harfe sürüklemek de kabul edilir.
    await dragPlacement(page, st.size, p2, true);
    await expect(page.locator(`#words li[data-word="${p2.word}"]`)).toHaveClass(/found/);
    await expect(page.locator('#found-count')).toHaveText('2 / 12');
    // Bulunmuş kelimeyi yeniden seçmek sayacı artırmaz.
    await dragPlacement(page, st.size, p1);
    await expect(page.locator('#found-count')).toHaveText('2 / 12');
    await expect(page.locator('#status')).toContainText('zaten');
  });

  test('yanlış seçim kelime saymaz, düz çizgi olmayan seçim uyarı verir', async ({ page }) => {
    await open(page);
    await showGrid(page);
    const st = await getState(page);
    // Üç harflik bir seçim hiçbir (en az 4 harfli) kelimeyle eşleşemez.
    await dragBetween(page, st.size, [0, 0], [0, 2]);
    await expect(page.locator('#status')).toContainText('listedeki kelimelerden biri değil');
    await expect(page.locator('#found-count')).toHaveText('0 / 12');
    await expect(page.locator('.ka-cell.sel')).toHaveCount(0);
    // Dokun-dokun kipinde düz çizgi dışındaki ikinci dokunuş uyarı verir.
    const a = await centerOf(page, st.size, 1, 1);
    const b = await centerOf(page, st.size, 3, 4);
    await page.mouse.click(a.x, a.y);
    await expect(page.locator('.ka-cell.sel')).toHaveCount(1);
    await page.mouse.click(b.x, b.y);
    await expect(page.locator('#status')).toContainText('düz bir çizgide');
    await expect(page.locator('.ka-cell.sel')).toHaveCount(0);
    await expect(page.locator('#found-count')).toHaveText('0 / 12');
  });

  test('dokun-dokun: ilk ve son harfe sırayla dokunmak kelimeyi bulur', async ({ page }) => {
    await open(page);
    await showGrid(page);
    const st = await getState(page);
    const p = st.placements[0];
    const a = await centerOf(page, st.size, p.cells[0][0], p.cells[0][1]);
    const last = p.cells[p.cells.length - 1];
    const b = await centerOf(page, st.size, last[0], last[1]);
    await page.mouse.click(a.x, a.y);
    await expect(page.locator('#status')).toContainText('Başlangıç harfi');
    await page.mouse.click(b.x, b.y);
    await expect(page.locator(`#words li[data-word="${p.word}"]`)).toHaveClass(/found/);
  });

  test('tüm kelimeler bulunur: bitiş paneli, süre durur, en iyi süre localStorage\'a yazılır, yeni bulmaca sıfırlar', async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript((k) => {
      if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ size: 12, level: 'kolay', cat: 'hayvanlar', best: { '12:kolay': { time: 99999999 } } }));
    }, KEY);
    await open(page);
    await expect(page.locator('#best')).not.toHaveText('—'); // kayıtlı eski süre görünür
    await solveAll(page);
    await expect(page.locator('#found-count')).toHaveText('12 / 12');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result-msg')).toContainText('ipucuyla');
    await expect(page.locator('#result-msg')).toContainText('Yeni en iyi süre');
    const st = await getState(page);
    expect(st.finished).toBe(true);
    expect(st.record).not.toBeNull();
    expect(st.record!.newBest).toBe(true);
    expect(st.record!.hints).toBe(0);
    const stored = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), KEY))!);
    expect(stored.best['12:kolay'].time).toBe(st.record!.time);
    expect(stored.best['12:kolay'].time).toBeLessThan(99999999);
    // Süre durdu.
    const t1 = (await getState(page)).elapsed;
    await page.waitForTimeout(600);
    expect((await getState(page)).elapsed).toBe(t1);
    // Bitmiş bulmacada ipucu kapalı; yeni bulmaca her şeyi sıfırlar ama rekoru korur.
    await expect(page.locator('#btn-hint')).toBeDisabled();
    await page.locator('#btn-again').click();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#found-count')).toHaveText('0 / 12');
    expect((await getState(page)).finished).toBe(false);
    await expect(page.locator('#best')).not.toHaveText('—');
  });

  test('ipucu: bulunmamış bir kelimenin ilk harfini vurgular, sayılır; ipuçlu oyun rekor yazmaz', async ({ page }) => {
    test.setTimeout(120_000);
    await open(page);
    await showGrid(page);
    await page.locator('#btn-hint').click();
    let st = await getState(page);
    expect(st.hints).toBe(1);
    expect(st.hintCell).not.toBeNull();
    const owner = st.placements.find((p) => p.cells[0][0] === st.hintCell![0] && p.cells[0][1] === st.hintCell![1]);
    expect(owner, 'ipucu bir kelimenin ilk harfi olmalı').toBeTruthy();
    await expect(cell(page, st.hintCell![0], st.hintCell![1])).toHaveClass(/hint/);
    await expect(page.locator(`#words li[data-word="${owner!.word}"]`)).toHaveClass(/hinted/);
    await expect(page.locator('#hint-count')).toHaveText('1');
    await expect(page.locator('#status')).toContainText(owner!.word);
    // Aynı kelime için ikinci basış sayacı artırmaz.
    await page.locator('#btn-hint').click();
    expect((await getState(page)).hints).toBe(1);
    // Kelime bulununca vurgu kalkar.
    await dragPlacement(page, st.size, owner!);
    await expect(cell(page, st.hintCell![0], st.hintCell![1])).not.toHaveClass(/hint/);
    st = await getState(page);
    expect(st.hintCell).toBeNull();
    // Kalanları bul: ipucu kullanıldığı için rekor kaydedilmez.
    await solveAll(page);
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result-msg')).toContainText('1 ipucuyla');
    await expect(page.locator('#result-msg')).toContainText('kaydedilmez');
    st = await getState(page);
    expect(st.record!.newBest).toBe(false);
    const stored = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(JSON.parse(stored || '{}').best || {}).toEqual({});
    await expect(page.locator('#best')).toHaveText('—');
  });

  test('üretim geçerli: 10×10, 12×12 ve 15×15, üç zorluk; tüm kelimeler ızgarada düz çizgide ve doğru yönde', async ({ page }) => {
    await open(page);
    const expectedCount: Record<number, number> = { 10: 8, 12: 12, 15: 16 };
    const allowed: Record<string, string[]> = {
      kolay: ['E', 'S', 'SE'],
      orta: ['E', 'S', 'SE', 'NE', 'W'],
      zor: ['E', 'S', 'SE', 'NE', 'W', 'N', 'NW', 'SW'],
    };
    const dirs: Record<string, number[]> = {
      E: [0, 1], S: [1, 0], SE: [1, 1], NE: [-1, 1], W: [0, -1], N: [-1, 0], NW: [-1, -1], SW: [1, -1],
    };
    const ALPHA = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    // Binlerce küçük expect yerine hatalar toplanır; sonda tek karşılaştırma yapılır (hızlı ve okunaklı hata).
    const problems: string[] = [];
    for (const n of [10, 12, 15]) {
      for (const level of ['kolay', 'orta', 'zor']) {
        await chooseSize(page, n, level);
        for (let i = 0; i < 2; i++) {
          if (i) await page.locator('#btn-new').click();
          const st = await getState(page);
          const tag = `${n}x${n} ${level} #${i}`;
          if (st.size !== n || st.level !== level) problems.push(`${tag}: durum uyuşmuyor`);
          if (st.grid.length !== n || !st.grid.every((row) => Array.from(row).length === n)) problems.push(`${tag}: ızgara kare değil`);
          if (st.total !== expectedCount[n]) problems.push(`${tag}: kelime sayısı ${st.total}`);
          if (new Set(st.placements.map((p) => p.word)).size !== st.total) problems.push(`${tag}: yinelenen kelime`);
          for (const row of st.grid) for (const ch of Array.from(row)) if (!ALPHA.includes(ch)) problems.push(`${tag}: geçersiz harf ${ch}`);
          for (const p of st.placements) {
            const cells = p.cells;
            const letters = Array.from(p.word);
            if (cells.length !== letters.length) problems.push(`${tag}: ${p.word} uzunluk`);
            if (!allowed[level].includes(p.dir)) problems.push(`${tag}: ${p.word} yönü ${p.dir} ${level} düzeyinde yasak`);
            const [dr, dc] = dirs[p.dir];
            cells.forEach(([r, c], k) => {
              if (r < 0 || r >= n || c < 0 || c >= n) problems.push(`${tag}: ${p.word} sınır dışı`);
              else if (r - cells[0][0] !== dr * k || c - cells[0][1] !== dc * k) problems.push(`${tag}: ${p.word} düz çizgi değil`);
              else if (Array.from(st.grid[r])[c] !== letters[k]) problems.push(`${tag}: ${p.word} harfi ızgarada yok`);
            });
          }
        }
      }
    }
    expect(problems).toEqual([]);
    // DOM'daki harfler kancadaki ızgarayla birebir aynı.
    const st = await getState(page);
    const domGrid = await page.locator('.ka-cell').evaluateAll((els) => els.map((e) => e.textContent));
    expect(domGrid.join('')).toBe(st.grid.join(''));
  });

  test('çekirdek: her kategori ve boyut için tohumlu üretim hatasızdır; Türkçe İ ve I ayrı harftir', async ({ page }) => {
    await open(page);
    const out = await page.evaluate(`(async () => {
      const core = await import('${CORE}');
      const data = await (await fetch('/oyunlar/kelime-avi/kategoriler.json')).json();
      let bad = 0; let total = 0;
      for (const [cat, v] of Object.entries(data)) for (const size of [10, 12, 15]) for (const level of ['kolay', 'orta', 'zor']) for (let s = 1; s <= 6; s++) {
        const p = core.makePuzzle({ pool: v.kelimeler, size, level, rng: core.mulberry32(s * 101 + size) });
        total++;
        if (!p || p.words.length !== core.SIZES[size]) { bad++; continue; }
        for (const pl of p.placements) if (core.wordAt(p.grid, core.cellsOf(pl)) !== pl.word) bad++;
      }
      const tr = [core.trUpper('ışık'), core.trUpper('istanbul'), core.trUpper('iğdır'), core.trUpper('ılık')];
      const pool = ['ISPARTA', 'İSTANBUL', 'IĞDIR', 'İZMİR', 'ISIRGAN', 'İNCİR', 'IHLAMUR', 'İPEK'];
      let idx = 0;
      for (let s = 1; s <= 30; s++) {
        const p = core.makePuzzle({ pool, size: 12, level: 'zor', count: 6, rng: core.mulberry32(s) });
        for (const pl of p.placements) {
          const first = Array.from(pl.word)[0];
          const cellLetter = p.grid[pl.r][pl.c];
          if (cellLetter !== first) idx++; // I yerine İ ya da tersi yazıldıysa sayılır
        }
      }
      const clean = core.cleanWords(['kedi', 'KEDİ', 'ışık', 'wow', 'quiz', 'ab', 'ANA', 'köpek']);
      return { bad, total, tr, idx, clean };
    })()`) as { bad: number; total: number; tr: string[]; idx: number; clean: string[] };
    expect(out.total).toBe(7 * 3 * 3 * 6);
    expect(out.bad).toBe(0);
    expect(out.tr).toEqual(['IŞIK', 'İSTANBUL', 'İĞDIR', 'ILIK']);
    expect(out.idx).toBe(0);
    // W/Q harfi içerenler, çok kısalar ve palindromlar elenir; küçük harfler Türkçe kurala göre büyütülür.
    expect(out.clean).toEqual(['KEDİ', 'IŞIK', 'KÖPEK']);
  });

  test('şehirler kategorisi: İ ve I\'li adlar ızgarada doğru harfle bulunur', async ({ page }) => {
    await open(page);
    await page.locator('#kategori').selectOption('sehirler');
    await chooseSize(page, 15, 'orta');
    await showGrid(page);
    const st = await getState(page);
    expect(st.cat).toBe('sehirler');
    const p = st.placements.find((x) => /[Iİ]/.test(x.word)) || st.placements[0];
    for (const [k, [r, c]] of p.cells.entries()) expect(Array.from(st.grid[r])[c]).toBe(Array.from(p.word)[k]);
    await dragPlacement(page, st.size, p);
    await expect(page.locator(`#words li[data-word="${p.word}"]`)).toHaveClass(/found/);
    // Tarayıcı seçimini de hatırlar.
    const stored = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), KEY))!);
    expect(stored.cat).toBe('sehirler');
    expect(stored.size).toBe(15);
    expect(stored.level).toBe('orta');
  });

  test('klavye: ok tuşlarıyla gezin, Shift+ok seçimi uzatır, Enter onaylar, Escape iptal eder', async ({ page }) => {
    await open(page);
    const st = await getState(page);
    // Gezinme düğümü tek: yalnızca bir hücre Tab ile odaklanabilir.
    await expect(page.locator('.ka-cell[tabindex="0"]')).toHaveCount(1);
    const p = st.placements[0];
    const [r0, c0] = p.cells[0];
    await cell(page, r0, c0).focus();
    // Escape ile iptal
    await page.keyboard.down('Shift');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.up('Shift');
    await expect(page.locator('.ka-cell.sel')).toHaveCount(2);
    await page.keyboard.press('Escape');
    await expect(page.locator('.ka-cell.sel')).toHaveCount(0);
    await cell(page, r0, c0).focus();
    // Shift + yön tuşlarıyla kelimeyi seç
    const key: Record<string, string> = { E: 'ArrowRight', S: 'ArrowDown', SE: 'PageDown' };
    await page.keyboard.down('Shift');
    for (let i = 1; i < p.cells.length; i++) await page.keyboard.press(key[p.dir]);
    await page.keyboard.up('Shift');
    await expect(page.locator('.ka-cell.sel')).toHaveCount(p.cells.length);
    await expect(page.locator('#status')).toContainText(p.word);
    await page.keyboard.press('Enter');
    await expect(page.locator(`#words li[data-word="${p.word}"]`)).toHaveClass(/found/);
    await expect(page.locator('.ka-cell.sel')).toHaveCount(0);
    // Enter-Enter kipi (Shift'siz): başlangıçta Enter, oklarla git, sonda Enter
    const q = (await getState(page)).placements.find((x) => !x.found)!;
    await cell(page, q.cells[0][0], q.cells[0][1]).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.ka-cell.sel')).toHaveCount(1);
    // Seçim varken Shift'siz ok ve köşegen tuşları da bitiş hücresini hareket ettirir.
    for (let i = 1; i < q.cells.length; i++) await page.keyboard.press(key[q.dir]);
    await page.keyboard.press('Enter');
    await expect(page.locator(`#words li[data-word="${q.word}"]`)).toHaveClass(/found/);
    await expect(page.locator('#found-count')).toHaveText('2 / 12');
  });

  test('bozuk ya da tuhaf localStorage kaydı oyunu çökertmez, varsayılana döner', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk'), KEY);
    await open(page);
    await expect(page.locator('#best')).toHaveText('—');
    await expect(page.locator('#grid')).toHaveAttribute('data-size', '12');
    await expect(page.locator('#words li')).toHaveCount(12);

    const page2 = await page.context().newPage();
    const errors2: string[] = [];
    page2.on('pageerror', (e) => errors2.push(String(e)));
    await page2.addInitScript((k) => localStorage.setItem(k, JSON.stringify({ size: 99, level: '__proto__', cat: 5, best: { '12:kolay': { time: 'x' }, bozuk: 3 } })), KEY);
    await page2.goto(URL_PATH);
    await expect(page2.locator('#grid')).toHaveAttribute('data-ready', '1');
    await expect(page2.locator('#grid')).toHaveAttribute('data-size', '12');
    await expect(page2.locator('[data-level-btn="kolay"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page2.locator('#best')).toHaveText('—');
    expect(errors).toEqual([]);
    expect(errors2).toEqual([]);
  });

  test('kelime listesi yüklenemezse Türkçe, çözüm öneren hata gösterilir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.route('**/kategoriler.json', (route) => route.fulfill({ status: 500, body: 'hata' }));
    await page.goto(URL_PATH);
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('Kelime listesi yüklenemedi');
    await expect(page.locator('#error')).toContainText('yenileyin');
    expect(errors).toEqual([]);
  });

  test('yazdırma görünümü: yalnızca ızgara, kelime listesi ve ayrı sayfada cevap anahtarı görünür', async ({ page }) => {
    await open(page);
    const st = await getState(page);
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#print-sheet')).toBeVisible();
    await expect(page.locator('#game-box')).toBeHidden();
    await expect(page.locator('.ba-topbar')).toBeHidden();
    await expect(page.locator('.ba-header')).toBeHidden();
    await expect(page.locator('.ba-footer')).toBeHidden();
    await expect(page.locator('.ba-content')).toBeHidden();
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`[data-slot="oyun-kelime-avi-${s}"]`)).toBeHidden();
    await expect(page.locator('#pr-grid span')).toHaveCount(st.size * st.size);
    await expect(page.locator('#pr-words li')).toHaveCount(st.total);
    await expect(page.locator('#pr-title')).toContainText('Hayvanlar');
    // Izgara harfleri ekrandakiyle aynı
    const letters = await page.locator('#pr-grid span').evaluateAll((els) => els.map((e) => e.textContent).join(''));
    expect(letters).toBe(st.grid.join(''));
    // Cevap anahtarı: işaretli kareler yerleşimlerin birleşimidir ve ayrı sayfaya geçer.
    const union = new Set<string>();
    for (const p of st.placements) for (const [r, c] of p.cells) union.add(`${r},${c}`);
    await expect(page.locator('#pr-grid-ans span.k')).toHaveCount(union.size);
    await expect(page.locator('.pr-answers')).toBeVisible();
    expect(await page.locator('.pr-answers').evaluate((el) => getComputedStyle(el).breakBefore)).toBe('page');
    await expect(page.locator('#pr-ans-list li')).toHaveCount(st.total);
    // Cevap anahtarı kutusu kapatılınca ikinci sayfa çıkmaz.
    await page.emulateMedia({ media: 'screen' });
    await page.locator('#print-answers').uncheck();
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.pr-answers')).toBeHidden();
    await expect(page.locator('#pr-grid')).toBeVisible();
  });

  test('360px genişlikte yatay taşma yok (üç ızgara boyutu), ızgara kare ve ekrana sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await expect(page.locator('#grid')).toHaveAttribute('data-ready', '1');
    for (const n of [10, 12, 15]) {
      await chooseSize(page, n, n === 15 ? 'zor' : undefined);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${n}x${n}`).toBeLessThanOrEqual(0);
      const box = (await page.locator('#grid').boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(360);
      expect(Math.abs(box.width - box.height)).toBeLessThanOrEqual(1);
      const fs = await page.locator('.ka-cell').first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      expect(fs, 'harf boyutu').toBeGreaterThanOrEqual(9);
      await expect(page.locator('#words')).toBeVisible();
    }
    // Mobilde de sürükleyerek kelime bulunur.
    await chooseSize(page, 10);
    await showGrid(page);
    const st = await getState(page);
    await dragPlacement(page, st.size, st.placements[0]);
    await expect(page.locator(`#words li[data-word="${st.placements[0].word}"]`)).toHaveClass(/found/);
  });
});
