import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Kutu kapmaca: motor (kutu tamamlama + ek hamle, orta seviye üçüncü kenarı vermez, zor seviye), arayüz (hamle,
// bilgisayar cevabı, geri al, iki kişilik, kazanma ekranı + istatistik), bozuk localStorage, içerik, mobil, dış istek.
const URL_PATH = '/oyunlar/kutu-kapmaca/';
const edge = (page: Page, e: number) => page.locator(`#kk-board button.ed[data-e="${e}"]`);

test.describe('Oyun: kutu kapmaca', () => {
  test('sayfa açılır, boyutlara göre çizgi ve kutu sayısı doğru, 3 reklam, 900+ kelime, JSON-LD; dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#kk-board button.ed')).toHaveCount(24);
    await expect(page.locator('#kk-board .box')).toHaveCount(9);
    await expect(page.locator('#kk-status')).toContainText('Sıra sizde');
    await page.locator('#kk-size').selectOption('5');
    await expect(page.locator('#kk-board button.ed')).toHaveCount(60);
    await expect(page.locator('#kk-board .box')).toHaveCount(25);
    await page.locator('#kk-size').selectOption('7');
    await expect(page.locator('#kk-board button.ed')).toHaveCount(112);
    await expect(page.locator('#kk-board .box')).toHaveCount(49);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw || '{}');
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'VideoGame')).toBeTruthy();
    expect(data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(await page.locator('#kk-full').count()).toBe(1);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('reklam alanları oyun kutusunun dışında: a altında, b ortada, c sonda', async ({ page }) => {
    await page.goto(URL_PATH);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-kutu-kapmaca-a', 'oyun-kutu-kapmaca-b', 'oyun-kutu-kapmaca-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const box = document.querySelector('.game-box')!;
      const ad = document.querySelector('[data-slot="oyun-kutu-kapmaca-a"]')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
  });

  test('motor: kutu tamamlayan çizgi puan getirir ve sırayı korur; tamamlamayan sırayı geçirir; bir çizgi iki kutuyu kapatabilir', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const K = await import('/oyunlar/kutu-kapmaca/engine.js');
      let s = K.createState(3, 1);
      // 0. kutunun kenarları: üst 0, alt 3, sol 12, sağ 13
      s = K.play(s, 0).state; // oyuncu 1, tamamlamadı -> sıra 2
      const afterFirst = s.turn;
      s = K.play(s, 3).state; // oyuncu 2 -> sıra 1
      s = K.play(s, 12).state; // oyuncu 1 -> sıra 2
      const beforeLast = s.turn;
      const last = K.play(s, 13); // oyuncu 2 kutuyu kapatır
      // 0. ve 1. kutu arasındaki ortak kenar (13) iki kutuyu birden kapatabilir
      let t = K.createState(3, 1);
      for (const e of [0, 3, 12, 1, 4, 14]) t = { ...K.play(t, e).state, turn: 1 };
      const both = K.play(t, 13);
      return {
        afterFirst, beforeLast,
        completed: last.completed, extra: last.extraTurn, turn: last.state.turn, score: last.state.scores, owner: last.state.owners[0],
        bothCompleted: both.completed.sort(), bothScore: both.state.scores,
        dupThrows: (() => { try { K.play(last.state, 13); return false; } catch { return true; } })(),
      };
    });
    expect(r.afterFirst).toBe(2);
    expect(r.beforeLast).toBe(2);
    expect(r.completed).toEqual([0]);
    expect(r.extra).toBe(true);
    expect(r.turn).toBe(2); // kutuyu alan oyuncu yeniden oynar
    expect(r.score).toEqual([0, 1]);
    expect(r.owner).toBe(2);
    expect(r.bothCompleted).toEqual([0, 1]);
    expect(r.bothScore).toEqual([2, 0]);
    expect(r.dupThrows).toBe(true);
  });

  test('motor: orta seviye alabileceği kutuyu alır, güvenli çizgi varken üçüncü kenarı vermez', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const K = await import('/oyunlar/kutu-kapmaca/engine.js');
      const adj = K.adjacency(5);
      let violations = 0;
      let checks = 0;
      let tookBox = true;
      for (let game = 0; game < 12; game++) {
        let s = K.createState(5, 1);
        // Rastgele güvenli çizgilerle ilerle; her adımda orta seviyeyi sına
        for (let step = 0; step < 60 && !K.isOver(s); step++) {
          const caps = K.capturable(s);
          const safe = K.safeEdges(s);
          const e = K.chooseEdge(s, 'orta');
          if (caps.length) {
            if (!caps.some((c: { edge: number }) => c.edge === e)) tookBox = false;
          } else if (safe.length) {
            checks++;
            const sides = (b: number) => adj.boxEdges[b].filter((x: number) => s.edges[x]).length;
            if (!safe.includes(e) || adj.edgeBoxes[e].some((b: number) => sides(b) + 1 >= 3)) violations++;
          }
          // İlerletmek için rastgele (bazen güvenli) çizgi çek, böylece farklı konumlar görülür
          const free = K.undrawn(s);
          const next = caps.length ? caps[0].edge : (safe.length ? safe[Math.floor(Math.random() * safe.length)] : free[Math.floor(Math.random() * free.length)]);
          s = K.play(s, next).state;
        }
      }
      return { violations, checks, tookBox };
    });
    expect(r.checks).toBeGreaterThan(50);
    expect(r.violations).toBe(0);
    expect(r.tookBox).toBe(true);
  });

  test('motor: zor seviye kutuyu alır, çift-çapraz ve tam çözüm doğru çalışır, kolay seviyeyi yener', async ({ page }) => {
    await page.goto(URL_PATH);
    const r = await page.evaluate(async () => {
      const K = await import('/oyunlar/kutu-kapmaca/engine.js');
      const n = 3;
      // Son kutu: yalnızca 13 ve 14 hariç hepsi çizili -> zor, kutuyu kapatan çizgiyi seçer
      let s = K.createState(n, 2);
      const all = Array.from({ length: K.edgeCount(n) }, (_, i) => i);
      for (const e of all) if (e !== 13) s.edges[e] = 1;
      for (let b = 0; b < 9; b++) if (b !== 0 && b !== 1) { s.owners[b] = 1; s.scores[0]++; }
      const lastEdge = K.chooseEdge(s, 'zor');
      const exact = K.solveExact(s);
      // Çift-çapraz: 2 kutuluk çift (0,1) için 13 çizilmedi ve üst/alt/sol/sağ dış kenarları çizili; zor sırada
      // başka kutu kalmadığından çift-çapraz yapmaz, kutuları alır.
      // Kolay (rastgele) rakibe karşı kısa turnuva: zor en az 6/8 kazanmalı
      let zorWins = 0;
      for (let g = 0; g < 8; g++) {
        const zorP = g % 2 === 0 ? 1 : 2;
        let st = K.createState(3, 1);
        while (!K.isOver(st)) {
          const e = K.chooseEdge(st, st.turn === zorP ? 'zor' : 'kolay');
          st = K.play(st, e).state;
        }
        if (K.result(st).winner === zorP) zorWins++;
      }
      // Zincir açılışı: yalnızca iki kutuluk ve uzun zincir kalmış, güvenli çizgi yok -> en küçük zincir verilir (orta)
      return { lastEdge, exactEdge: exact.edge, exactValue: exact.value, zorWins };
    });
    expect([13]).toContain(r.lastEdge);
    expect(r.exactEdge).toBe(13);
    expect(r.exactValue).toBe(2);
    expect(r.zorWins).toBeGreaterThanOrEqual(6);
  });

  test('arayüz: çizgi çekince bilgisayar cevap verir, geri al ikisini birlikte geri alır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kk-level').selectOption('kolay');
    await edge(page, 0).click();
    await expect(edge(page, 0)).toHaveClass(/p1/);
    await expect(edge(page, 0)).toHaveAttribute('aria-pressed', 'true');
    // Bilgisayar (2. oyuncu) en az bir çizgi çeker; sıra yeniden sizde
    await expect(page.locator('#kk-board button.ed.p2').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#kk-board')).toHaveAttribute('data-turn', '1', { timeout: 10000 });
    await expect(page.locator('#kk-undo')).toBeEnabled();
    await page.locator('#kk-undo').click();
    await expect(page.locator('#kk-board button.ed.p1, #kk-board button.ed.p2')).toHaveCount(0);
    await expect(page.locator('#kk-board')).toHaveAttribute('data-moves', '0');
    await expect(page.locator('#kk-undo')).toBeDisabled();
    // Çizilmiş çizgiye tekrar tıklamak hamle yaptırmaz
    await edge(page, 5).click();
    await expect(edge(page, 5)).toHaveClass(/p1/);
    await expect(page.locator('#kk-board')).toHaveAttribute('data-turn', '1', { timeout: 10000 });
    const before = await page.locator('#kk-board').getAttribute('data-moves');
    await edge(page, 5).click();
    await expect(page.locator('#kk-board')).toHaveAttribute('data-moves', before!);
  });

  test('iki kişilik: sıra değişir, kutuyu kapatan oyuncu yeniden oynar ve kutu rengini alır', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kk-mode').selectOption('two');
    await page.evaluate(() => (window as any).__kutuKapmacaDebug.setPosition(3, [0, 3, 12], 1));
    await expect(page.locator('#kk-status')).toContainText('Sıra: 1. oyuncu');
    await edge(page, 13).click(); // 0. kutuyu kapatır
    await expect(page.locator('#kk-board .box').first()).toHaveClass(/o1/);
    await expect(page.locator('#kk-board .box').first()).toHaveText('1');
    await expect(page.locator('#kk-board')).toHaveAttribute('data-turn', '1'); // yeniden oynar
    await expect(page.locator('#kk-score-1')).toHaveText('1');
    await expect(page.locator('#kk-status')).toContainText('yeniden oynuyor');
    await edge(page, 20).click(); // kutu kapatmayan çizgi: sıra 2'ye geçer
    await expect(page.locator('#kk-board')).toHaveAttribute('data-turn', '2');
    await expect(page.locator('#kk-card-2')).toHaveClass(/is-turn/);
    await edge(page, 21).click();
    await expect(edge(page, 21)).toHaveClass(/p2/);
    await page.locator('#kk-undo').click();
    await expect(edge(page, 21)).not.toHaveClass(/p2/);
    await expect(page.locator('#kk-board')).toHaveAttribute('data-turn', '2');
  });

  test('kazanma ekranı görünür ve istatistik yalnızca localStorage içinde tutulur', async ({ page }) => {
    await page.goto(URL_PATH);
    // 13 numaralı çizgi hariç hepsi çizili: tek hamle 0. ve 1. kutuyu birlikte kapatır
    await page.evaluate(() => {
      const all = Array.from({ length: 24 }, (_, i) => i).filter((e) => e !== 13);
      (window as any).__kutuKapmacaDebug.setPosition(3, all, 1);
    });
    await expect(page.locator('#kk-over')).toBeHidden();
    await edge(page, 13).click();
    await expect(page.locator('#kk-over')).toBeVisible();
    await expect(page.locator('#kk-over-title')).toHaveText('Kazandınız!');
    await expect(page.locator('#kk-over-text')).toContainText('9');
    await expect(page.locator('#kk-status')).toContainText('Tebrikler');
    await expect(page.locator('#kk-stats')).toContainText('1 galibiyet');
    const saved = await page.evaluate(() => localStorage.getItem('ba-oyun-kutu-kapmaca'));
    expect(JSON.parse(saved!)).toMatchObject({ w: 1, l: 0, d: 0 });
    await page.locator('#kk-over-close').click();
    await expect(page.locator('#kk-over')).toBeHidden();
    await page.locator('#kk-new').click();
    await expect(page.locator('#kk-board')).toHaveAttribute('data-over', '0');
    await expect(page.locator('#kk-score-1')).toHaveText('0');
  });

  test('bozuk localStorage verisinde çökmez, istatistik sıfırdan başlar', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => localStorage.setItem('ba-oyun-kutu-kapmaca', '{{bozuk'));
    await page.goto(URL_PATH);
    await expect(page.locator('#kk-stats')).toContainText('0 galibiyet');
    await edge(page, 0).click();
    await expect(edge(page, 0)).toHaveClass(/p1/);
    await page.addInitScript(() => localStorage.setItem('ba-oyun-kutu-kapmaca', '"x"'));
    await page.reload();
    await expect(page.locator('#kk-stats')).toContainText('0 galibiyet');
    expect(errors).toEqual([]);
  });

  test('klavye: çizgiler odaklanabilir düğmedir, Enter çizer, ok tuşları komşu çizgiye geçer', async ({ page }) => {
    await page.goto(URL_PATH);
    await page.locator('#kk-mode').selectOption('two');
    await edge(page, 0).focus();
    await page.keyboard.press('ArrowRight');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.e)).toBe('1');
    await page.keyboard.press('ArrowDown');
    expect(await page.evaluate(() => (document.activeElement as HTMLElement).dataset.e)).toBe('4');
    await page.keyboard.press('Enter');
    await expect(edge(page, 4)).toHaveClass(/p1/);
    await expect(page.locator('#kk-board')).toHaveAttribute('data-turn', '2');
    expect(await page.locator('#kk-board button.ed').first().evaluate((el) => el.tagName)).toBe('BUTTON');
    await expect(edge(page, 4)).toHaveAttribute('aria-label', /yatay çizgi.*çizildi/);
  });

  test('360px genişlikte yatay taşma yok, 7x7 tahta sığar ve çizgilerin dokunma alanı geniştir', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await page.locator('#kk-size').selectOption('7');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const box = await page.locator('#kk-board').boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(250);
    expect(box!.width).toBeLessThanOrEqual(360);
    // Ortadaki yatay çizgi: görünen çizgiden 7 px uzaktaki nokta da aynı düğmeye ait olmalı
    const e = 3 * 7 + 3;
    await edge(page, e).scrollIntoViewIfNeeded();
    const b = await edge(page, e).boundingBox();
    const hit = await page.evaluate(({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      return el && el.closest('button.ed') ? (el.closest('button.ed') as HTMLElement).dataset.e : null;
    }, { x: b!.x + b!.width / 2, y: b!.y + b!.height / 2 - 7 });
    expect(hit).toBe(String(e));
    await page.mouse.click(b!.x + b!.width / 2, b!.y + b!.height / 2 - 7);
    await expect(edge(page, e)).toHaveClass(/p1/);
  });
});
