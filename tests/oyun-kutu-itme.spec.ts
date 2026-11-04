import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

// Kutu itme: sayfa yapısı, tüm seviyelerin BFS ile çözülebilirliği, klavye/WASD, sınırsız geri al,
// geri alınabilir yeniden başlat, kazanma + en iyi skor kaydı, ekran okları/kaydırma/dokunma,
// seviye seçimi ve kaldığı yerden devam, kilitlenen kutu uyarısı, bozuk kayıt, 360px, tam ekran.
const URL_PATH = '/oyunlar/kutu-itme/';
const STORE_KEY = 'ba-oyun-kutu-itme';

type Hook = {
  level: number; count: number; w: number; h: number; player: number; boxes: number[];
  moves: number; pushes: number; path: string; won: boolean; undo: number; cell: number; par: number;
};

const board = (page: Page) => page.locator('#board');
const hook = (page: Page) => page.evaluate(() => (window as unknown as { __kutuItmeTest: () => Hook }).__kutuItmeTest());
const ARROWS: Record<string, string> = { u: 'ArrowUp', d: 'ArrowDown', l: 'ArrowLeft', r: 'ArrowRight' };
const WASD: Record<string, string> = { u: 'w', d: 's', l: 'a', r: 'd' };

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(board(page)).toHaveAttribute('data-ready', '1');
  return errors;
}

// Çözücünün (cozucu.js) verdiği hamle dizisi; sayfadaki modüllerle hesaplanır
async function solutionOf(page: Page, level: number) {
  return page.evaluate(async (n) => {
    const { SEVIYELER } = await import('/oyunlar/kutu-itme/seviyeler.js');
    const { parseLevel, solve } = await import('/oyunlar/kutu-itme/cozucu.js');
    return solve(parseLevel(SEVIYELER[n - 1].harita)).solution as string;
  }, level);
}

async function play(page: Page, moves: string, mixWasd = false) {
  await board(page).focus();
  let i = 0;
  for (const ch of moves) {
    const k = ch.toLowerCase();
    await page.keyboard.press(mixWasd && i % 2 ? WASD[k] : ARROWS[k]);
    i++;
  }
}

async function pickLevel(page: Page, n: number) {
  const details = page.locator('#levels');
  if (!(await details.evaluate((d) => (d as HTMLDetailsElement).open))) await page.locator('#levels summary').click();
  await page.locator('#level-grid button').nth(n - 1).click();
  await expect(board(page)).toHaveAttribute('data-level', String(n));
}

test.describe('Kutu İtme', () => {
  test('sayfa yapısı: ≥900 kelime, SSS ≥7, 3 reklam oyun kutusunun dışında, JSON-LD, rozet, meta.json, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page).toHaveTitle(/Kutu İtme Oyna/);
    await expect(page.locator('h1')).toContainText('Kutu İtme');
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/oyunlar/kutu-itme/');

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content .ba-faq details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-kutu-itme-a', 'oyun-kutu-itme-b', 'oyun-kutu-itme-c']);
    const placement = await page.evaluate(() => {
      const box = document.getElementById('game-box')!;
      const a = document.querySelector('.ba-ad[data-slot$="-a"]')!;
      const b = document.querySelector('.ba-ad[data-slot$="-b"]')!;
      return {
        insideBox: Array.from(document.querySelectorAll('.ba-ad')).some((ad) => box.contains(ad)),
        aAfterBox: !!(box.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING),
        bInContent: !!b.closest('.ba-content'),
      };
    });
    expect(placement).toEqual({ insideBox: false, aAfterBox: true, bInContent: true });

    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    expect(ld['@graph'].map((n: { '@type': string }) => n['@type'])).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(7);
    // Başlıkta marka adı yok
    expect(await page.title()).not.toMatch(/sokoban/i);
    expect(await page.locator('h1').innerText()).not.toMatch(/sokoban/i);

    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'oyunlar', 'kutu-itme', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('oyunlar');
    expect(meta.title).toBe('Kutu İtme');
    expect(meta.description.length).toBeGreaterThan(40);
    expect(Array.isArray(meta.keywords) && meta.keywords.length >= 5).toBe(true);
    expect(meta.icon).toContain('<');
    expect(meta.icon).not.toContain('\n');
    expect(meta.vendor).toEqual([]);

    // Başlangıç durumu
    const h = await hook(page);
    expect(h.count).toBeGreaterThanOrEqual(40);
    expect(h.level).toBe(1);
    await expect(page.locator('#moves')).toHaveText('0');
    await expect(page.locator('#btn-undo')).toBeDisabled();
    await expect(page.locator('#progress')).toHaveText(`0/${h.count} çözüldü`);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tüm seviyeler (≥40) geçerli, benzersiz ve BFS çözücüyle çözülebilir; en az itme sayısı tutarlı', async ({ page }) => {
    test.setTimeout(120_000);
    await open(page);
    const res = await page.evaluate(async () => {
      const { SEVIYELER } = await import('/oyunlar/kutu-itme/seviyeler.js');
      const { parseLevel, solve, simulate } = await import('/oyunlar/kutu-itme/cozucu.js');
      const bad: string[] = [];
      const maps = new Set<string>();
      let maxW = 0;
      const t0 = performance.now();
      SEVIYELER.forEach((lv: { harita: string[]; itme: number; zorluk: string }, i: number) => {
        try {
          maps.add(lv.harita.join('\n'));
          const L = parseLevel(lv.harita);
          maxW = Math.max(maxW, L.w);
          const s = solve(L);
          if (!s) { bad.push(`${i + 1}: çözüm yok`); return; }
          const sim = simulate(L, s.solution);
          if (!sim.solved) bad.push(`${i + 1}: çözüm oynatılınca bitmiyor`);
          if (s.pushes !== lv.itme) bad.push(`${i + 1}: itme ${s.pushes} ≠ ${lv.itme}`);
          if (!['Başlangıç', 'Kolay', 'Orta', 'Zor', 'Uzman'].includes(lv.zorluk)) bad.push(`${i + 1}: zorluk`);
        } catch (e) { bad.push(`${i + 1}: ${(e as Error).message}`); }
      });
      return { count: SEVIYELER.length, unique: maps.size, bad, maxW, ms: performance.now() - t0 };
    });
    expect(res.bad).toEqual([]);
    expect(res.count).toBeGreaterThanOrEqual(40);
    expect(res.unique).toBe(res.count);
    expect(res.maxW).toBeLessThanOrEqual(12);

    // Çözücünün kendisi: geçersiz harita Türkçe hata verir, çözümsüz harita null döner
    const neg = await page.evaluate(async () => {
      const { parseLevel, solve } = await import('/oyunlar/kutu-itme/cozucu.js');
      const msgs: string[] = [];
      for (const rows of [['#####', '#@$ .', '#####'], ['#####', '#@$$#', '#..##', '#####'], ['####', '#@ #', '####']]) {
        try { parseLevel(rows); msgs.push('geçti'); } catch (e) { msgs.push((e as Error).message); }
      }
      const stuck = solve(parseLevel(['#####', '#@ $#', '#  .#', '#####']));
      return { msgs, stuck };
    });
    expect(neg.msgs[0]).toMatch(/duvarla kapalı değil/);
    expect(neg.msgs[1]).toBe('geçti');
    expect(neg.msgs[2]).toMatch(/en az bir kutu/);
    expect(neg.stuck).toBeNull();
  });

  test('klavye: oklar ve WASD yürür/iter, duvar engeller; sınırsız geri al ve geri alınabilir yeniden başlat', async ({ page }) => {
    const errors = await open(page);
    // Seviye 1: "#@ $ .#" — sağa iki adım ilk kutuyu iter
    await board(page).focus();
    const h0 = await hook(page);
    await page.keyboard.press('ArrowLeft'); // duvar
    await page.keyboard.press('w'); // duvar
    await expect(board(page)).toHaveAttribute('data-moves', '0');
    await page.keyboard.press('ArrowRight');
    await expect(board(page)).toHaveAttribute('data-moves', '1');
    await expect(page.locator('#pushes')).toHaveText('0');
    await page.keyboard.press('d'); // WASD: sağa, kutuyu iter
    await expect(board(page)).toHaveAttribute('data-moves', '2');
    await expect(board(page)).toHaveAttribute('data-pushes', '1');
    await expect(page.locator('#moves')).toHaveText('2');
    await expect(page.locator('#pushes')).toHaveText('1');
    let h = await hook(page);
    expect(h.player).toBe(h0.player + 2);
    expect(h.path).toBe('rR');
    expect(h.boxes).toEqual([h0.boxes[0] + 1]);

    // Geri al: Z, sonra Backspace — başa döner, fazlası "geri alınacak hamle yok"
    await page.keyboard.press('z');
    await expect(board(page)).toHaveAttribute('data-moves', '1');
    await expect(board(page)).toHaveAttribute('data-pushes', '0');
    await page.keyboard.press('Backspace');
    await expect(board(page)).toHaveAttribute('data-moves', '0');
    h = await hook(page);
    expect(h.player).toBe(h0.player);
    expect(h.boxes).toEqual(h0.boxes);
    await page.keyboard.press('Control+z');
    await expect(page.locator('#msg')).toContainText('Geri alınacak hamle yok');
    await expect(page.locator('#btn-undo')).toBeDisabled();

    // Yeniden başlat (R) da geri alınabilir
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#btn-restart')).toBeEnabled();
    await page.keyboard.press('r');
    await expect(board(page)).toHaveAttribute('data-moves', '0');
    expect((await hook(page)).boxes).toEqual(h0.boxes);
    await expect(page.locator('#msg')).toContainText('baştan başladı');
    await page.locator('#btn-undo').click();
    await expect(board(page)).toHaveAttribute('data-moves', '2');
    expect((await hook(page)).path).toBe('rR');

    // Gövdeye odak varken (tahta ekranda) tuşlar da çalışır
    await board(page).scrollIntoViewIfNeeded();
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.keyboard.press('ArrowLeft');
    await expect(board(page)).toHaveAttribute('data-moves', '3');
    expect(errors).toEqual([]);
  });

  test('çözücünün çözümüyle seviye 1 ve 20 kazanılır; en iyi hamle localStorage\'a yazılır, ilerleme yenilemede korunur', async ({ page }) => {
    const errors = await open(page);
    const sol1 = await solutionOf(page, 1);
    await play(page, sol1);
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-title')).toContainText('Seviye 1 tamamlandı');
    await expect(page.locator('#result-text')).toContainText(`${sol1.length} hamle`);
    await expect(page.locator('#result-text')).toContainText('en az itmeli çözümünü buldunuz');
    await expect(page.locator('#best')).toHaveText(String(sol1.length));
    await expect(page.locator('#on-goal')).toHaveText('1/1');
    // Bitmiş seviyede hamle yok sayılır
    await page.keyboard.press('ArrowLeft');
    expect((await hook(page)).moves).toBe(sol1.length);

    let saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['1'][0]).toBe(sol1.length);
    expect(saved.level).toBe(2);
    expect(saved.paths['1']).toBeUndefined();
    await expect(page.locator('#progress')).toContainText('1/');

    await page.locator('#btn-next-level').click();
    await expect(board(page)).toHaveAttribute('data-level', '2');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#best')).toHaveText('–');

    // Daha zor bir seviye: 20 (üç kutu) — oyun mantığı çözücüyle birebir uyuşmalı (WASD karışık)
    await pickLevel(page, 20);
    const sol20 = await solutionOf(page, 20);
    await play(page, sol20, true);
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    const h = await hook(page);
    expect(h.moves).toBe(sol20.length);
    expect(h.pushes).toBe(h.par);
    saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['20']).toEqual([sol20.length, h.par]);

    // Yenileme: kayıtlı ilerleme korunur, sıradaki seviye (21) açılır
    await page.reload();
    await expect(board(page)).toHaveAttribute('data-level', '21');
    await page.locator('#levels summary').click();
    await expect(page.locator('#level-grid button').nth(0)).toHaveClass(/done/);
    await expect(page.locator('#level-grid button').nth(19)).toHaveClass(/done/);
    await expect(page.locator('#level-grid button').nth(1)).not.toHaveClass(/done/);
    await expect(page.locator('#progress')).toContainText('2/');
    await expect(page.locator('#level-grid button').nth(20)).toHaveAttribute('aria-current', 'true');

    // Daha kötü skor rekoru bozmaz
    await pickLevel(page, 1);
    await play(page, 'r' + 'l' + sol1);
    await expect(board(page)).toHaveAttribute('data-state', 'bitti');
    await expect(page.locator('#result-text')).toContainText(`En iyiniz: ${sol1.length} hamle`);
    saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.best['1'][0]).toBe(sol1.length);
    expect(errors).toEqual([]);
  });

  test('ekran okları, kaydırma (sürükleme) ve kareye dokunarak yürüme çalışır', async ({ page }) => {
    const errors = await open(page);
    // Ekran okları (tıklama)
    await page.locator('#dp-right').click();
    await expect(board(page)).toHaveAttribute('data-moves', '1');
    await page.locator('#dp-left').click();
    await expect(board(page)).toHaveAttribute('data-moves', '2');
    // Klavyeyle ekran oku (Enter)
    await page.locator('#dp-right').focus();
    await page.keyboard.press('Enter');
    await expect(board(page)).toHaveAttribute('data-moves', '3');
    await page.locator('#btn-restart').click();

    // Kaydırma: oyuncunun üstünden sağa doğru ~1,2 kare sürükle
    await board(page).scrollIntoViewIfNeeded();
    let h = await hook(page);
    const bb = (await board(page).boundingBox())!;
    const center = (i: number, hh: Hook) => ({ x: bb.x + ((i % hh.w) + 0.5) * hh.cell, y: bb.y + (Math.floor(i / hh.w) + 0.5) * hh.cell });
    const p = center(h.player, h);
    await page.mouse.move(p.x, p.y);
    await page.mouse.down();
    await page.mouse.move(p.x + h.cell * 1.2, p.y, { steps: 8 });
    await page.mouse.up();
    await expect(board(page)).toHaveAttribute('data-moves', '1');
    expect((await hook(page)).path).toBe('r');

    // Seviye 2'de uzak kareye dokunma: kutulara çarpmadan yürür, tek geri al adımı
    await pickLevel(page, 2);
    await board(page).scrollIntoViewIfNeeded();
    h = await hook(page);
    const bb2 = (await board(page).boundingBox())!;
    // Hedef kare (1,1): oyuncu (2,3)'te; yol kutuya değmez
    const target = 1 * h.w + 1;
    await page.mouse.click(bb2.x + 1.5 * h.cell, bb2.y + 1.5 * h.cell);
    await expect.poll(async () => (await hook(page)).player).toBe(target);
    h = await hook(page);
    expect(h.moves).toBeGreaterThanOrEqual(3);
    expect(h.pushes).toBe(0);
    expect(h.undo).toBe(1);
    await page.locator('#btn-undo').click();
    await expect(board(page)).toHaveAttribute('data-moves', '0');

    // Dokunma (touch) olayıyla komşu kareye adım
    const moved = await board(page).evaluate(async (el, cell) => {
      const hk = (window as unknown as { __kutuItmeTest: () => Hook }).__kutuItmeTest();
      const r = el.getBoundingClientRect();
      const x = r.left + ((hk.player % hk.w) + 0.5) * cell;
      const y = r.top + (Math.floor(hk.player / hk.w) - 0.5) * cell; // bir üst kare
      const fire = (type: string) => el.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, bubbles: true }));
      fire('pointerdown');
      fire('pointerup');
      return (window as unknown as { __kutuItmeTest: () => Hook }).__kutuItmeTest().path;
    }, h.cell);
    expect(moved).toBe('u');
    expect(errors).toEqual([]);
  });

  test('seviye seçimi; yarım kalan seviye yenilemede geri al geçmişiyle kaldığı yerden devam eder', async ({ page }) => {
    const errors = await open(page);
    await pickLevel(page, 7);
    await expect(page.locator('#level-label')).toHaveText(/Seviye 7 \//);
    await expect(page.locator('#btn-prev')).toBeEnabled();
    const sol = await solutionOf(page, 7);
    const part = sol.slice(0, 5);
    await play(page, part);
    await expect(board(page)).toHaveAttribute('data-moves', '5');
    const before = await hook(page);
    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved.level).toBe(7);
    expect(saved.paths['7']).toBe(part);

    await page.reload();
    await expect(board(page)).toHaveAttribute('data-level', '7');
    await expect(board(page)).toHaveAttribute('data-moves', '5');
    await expect(page.locator('#msg')).toContainText('kaldığınız yerden');
    const after = await hook(page);
    expect(after.boxes).toEqual(before.boxes);
    expect(after.player).toBe(before.player);
    expect(after.undo).toBe(5);
    await board(page).focus();
    await page.keyboard.press('u');
    await expect(board(page)).toHaveAttribute('data-moves', '4');

    // Önceki / sonraki düğmeleri ve N / P tuşları
    await page.locator('#btn-next').click();
    await expect(board(page)).toHaveAttribute('data-level', '8');
    await page.keyboard.press('p');
    await expect(board(page)).toHaveAttribute('data-level', '7');
    await expect(board(page)).toHaveAttribute('data-moves', '4'); // seviye 7'nin yarım hâli korunur
    await page.keyboard.press('n');
    await expect(board(page)).toHaveAttribute('data-level', '8');
    await pickLevel(page, 1);
    await expect(page.locator('#btn-prev')).toBeDisabled();
    const n = (await hook(page)).count;
    await pickLevel(page, n);
    await expect(page.locator('#btn-next')).toBeDisabled();
    expect(errors).toEqual([]);
  });

  test('kilitlenen kutu uyarısı: köşe/kenar kutusu işaretlenir, geri alınca kalkar', async ({ page }) => {
    const errors = await open(page);
    await pickLevel(page, 2);
    // Seviye 2: oyuncu yukarı çıkıp kutuyu sağ duvara iter — hedefsiz duvar kenarı
    await board(page).focus();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await expect(board(page)).toHaveAttribute('data-pushes', '1');
    await expect(page.locator('#msg')).toContainText('hiçbir hedefe itilemez');
    await expect(page.locator('#msg')).toHaveClass(/warn/);
    await expect(page.locator('.ki-box.dead')).toHaveCount(1);
    await page.keyboard.press('z');
    await expect(page.locator('.ki-box.dead')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test('bozuk ya da geçersiz localStorage verisi oyunu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => { if (!sessionStorage.getItem('x')) { localStorage.setItem(k, '{bozuk json'); sessionStorage.setItem('x', '1'); } }, STORE_KEY);
    const errors = await open(page);
    await expect(board(page)).toHaveAttribute('data-level', '1');
    await board(page).focus();
    await page.keyboard.press('ArrowRight');
    await expect(board(page)).toHaveAttribute('data-moves', '1');
    expect(errors).toEqual([]);

    const page2 = await page.context().newPage();
    const errors2: string[] = [];
    page2.on('pageerror', (e) => errors2.push(String(e)));
    await page2.addInitScript((k) => localStorage.setItem(k, JSON.stringify({
      level: 999, best: { 1: 'x', 2: [1, 999], abc: [3, 2], 3: [0, 0] }, paths: { 1: 'lll', 2: 'XYZ', 4: 42 },
    })), STORE_KEY);
    await page2.goto(URL_PATH);
    await expect(page2.locator('#board')).toHaveAttribute('data-ready', '1');
    await expect(page2.locator('#board')).toHaveAttribute('data-level', '1');
    await expect(page2.locator('#board')).toHaveAttribute('data-moves', '0'); // duvara yürüyen kayıt atılır
    await expect(page2.locator('#best')).toHaveText('–');
    await expect(page2.locator('#progress')).toContainText('0/');
    await page2.locator('#dp-right').click();
    await expect(page2.locator('#board')).toHaveAttribute('data-moves', '1');

    // Dizi ya da sayı gibi tamamen yanlış türler
    const page3 = await page.context().newPage();
    const errors3: string[] = [];
    page3.on('pageerror', (e) => errors3.push(String(e)));
    await page3.addInitScript((k) => localStorage.setItem(k, '[1,2,3]'), STORE_KEY);
    await page3.goto(URL_PATH);
    await expect(page3.locator('#board')).toHaveAttribute('data-level', '1');
    expect(errors2).toEqual([]);
    expect(errors3).toEqual([]);
  });

  test('360px: yatay taşma yok, en geniş seviye ekrana sığar, düğmeler parmak boyutunda', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const widest = await page.evaluate(async () => {
      const { SEVIYELER } = await import('/oyunlar/kutu-itme/seviyeler.js');
      let best = 0; let w = 0;
      SEVIYELER.forEach((lv: { harita: string[] }, i: number) => {
        const lw = Math.max(...lv.harita.map((r) => r.length));
        if (lw > w) { w = lw; best = i + 1; }
      });
      return best;
    });
    await pickLevel(page, widest);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const bb = (await board(page).boundingBox())!;
    expect(bb.x).toBeGreaterThanOrEqual(0);
    expect(bb.x + bb.width).toBeLessThanOrEqual(360);
    expect((await hook(page)).cell).toBeGreaterThanOrEqual(20);
    const pad = (await page.locator('#dp-up').boundingBox())!;
    expect(pad.height).toBeGreaterThanOrEqual(44);
    // Mobilde kaydırma da çalışır
    const h = await hook(page);
    const before = h.moves;
    await board(page).evaluate((el) => {
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const fire = (type: string, dx: number) => el.dispatchEvent(new PointerEvent(type, { pointerId: 3, pointerType: 'touch', isPrimary: true, clientX: x + dx, clientY: y, bubbles: true }));
      fire('pointerdown', 0);
      fire('pointermove', 60);
      fire('pointerup', 60);
    });
    const after = await hook(page);
    // Sağ taraf duvar olabilir: hamle ya artar ya da engellenir; hata çıkmamalı
    expect(after.moves).toBeGreaterThanOrEqual(before);
    expect(await overflow()).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });

  test('tam ekran düğmesi yalnızca oyun kutusunu tam ekran yapar', async ({ page }) => {
    const errors = await open(page);
    await expect(page.locator('#btn-full')).toBeVisible();
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await expect(page.locator('#btn-full')).toHaveAttribute('aria-pressed', 'true');
    // Tam ekranda reklam alanı yoktur (hepsi oyun kutusunun dışında)
    expect(await page.locator('#game-box .ba-ad').count()).toBe(0);
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => !!document.fullscreenElement)).toBe(false);
    await expect(page.locator('#btn-full')).toHaveText('Tam ekran');
    expect(errors).toEqual([]);
  });

  test('erişilebilirlik: hedefteki kutu renk dışında onay işaretiyle ayrılır, ünlem rozeti iki temada AA, alçak ekranda tam ekranın üstü ulaşılabilir', async ({ page }) => {
    // Yazı/zemin kontrastı: ::after rengi ile rozet zemini (rgb/rgba ayrıştırılır)
    const badgeContrast = () => page.evaluate(() => {
      const el = document.querySelector('.ki-box.dead')!;
      const cs = getComputedStyle(el, '::after');
      const rgb = (c: string) => (c.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
      const lum = (c: number[]) => {
        const [r, g, b] = c.map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const a = lum(rgb(cs.color));
      const b = lum(rgb(cs.backgroundColor));
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    });
    const errors = await open(page);

    // Seviye 3: sol kutuyu sola, hedefe it — hedefteki kutuda onay işareti var, diğerinde yok
    await pickLevel(page, 3);
    await board(page).focus();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#on-goal')).toHaveText('1/2');
    await expect(page.locator('.ki-box.on')).toHaveCount(1);
    const marks = await page.evaluate(() => Array.from(document.querySelectorAll('.ki-box')).map((b) => {
      const cs = getComputedStyle(b, '::after');
      return { on: b.classList.contains('on'), mark: cs.content !== 'none' && parseFloat(cs.borderBottomWidth) >= 2 };
    }));
    expect(marks).toEqual(expect.arrayContaining([{ on: true, mark: true }, { on: false, mark: false }]));

    // Kilitlenen kutu rozeti: açık ve koyu temada yazı kontrastı ≥ 4,5
    await pickLevel(page, 2);
    await board(page).focus();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.ki-box.dead')).toHaveCount(1);
    for (const scheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: scheme });
      expect(await badgeContrast(), `${scheme} rozet kontrastı`).toBeGreaterThanOrEqual(4.5);
    }
    await page.emulateMedia({ colorScheme: 'light' });

    // Yatay telefon (740×360) tam ekran: içerik taşsa da üst satır (çıkış düğmesi) kaydırılarak ulaşılır
    await page.setViewportSize({ width: 740, height: 360 });
    await pickLevel(page, 46);
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    const fs = await page.evaluate(async () => {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const box = document.getElementById('game-box')!;
      box.scrollTop = 0;
      const top = box.querySelector('.ki-top')!.getBoundingClientRect().top;
      const btn = document.getElementById('btn-full')!.getBoundingClientRect();
      return { top, btnTop: btn.top, overflow: box.scrollHeight > box.clientHeight };
    });
    expect(fs.top).toBeGreaterThanOrEqual(0);
    expect(fs.btnTop).toBeGreaterThanOrEqual(0);
    expect(fs.overflow).toBe(true);
    expect((await hook(page)).cell).toBeGreaterThanOrEqual(20);
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => !!document.fullscreenElement)).toBe(false);
    expect(errors).toEqual([]);
  });
});
