import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

const WEB = join(__dirname, '..', 'web');
const URL = '/oyunlar/kelime-bulmaca/';

// Sözlük ve cevap havuzu: oyunun fetch ettiği dosyaların aynısı.
const trLower = (s: string) => s.toLocaleLowerCase('tr');
const dict = new Set(
  readFileSync(join(WEB, 'kelime-bulucu', 'kelimeler.txt'), 'utf8')
    .split(/\r?\n/).map((w) => trLower(w.trim())).filter((w) => [...w].length === 5),
);
const answers = readFileSync(join(WEB, 'oyunlar', 'kelime-bulmaca', 'cevaplar.txt'), 'utf8')
  .split(/\r?\n/).map((w) => trLower(w.trim())).filter((w) => [...w].length === 5 && dict.has(w));

/** game.js içindeki günlük kelime formülünün aynısı (yerel tarih → gün numarası → havuz sırası). */
function todayNumber(d = new Date()) {
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(2026, 0, 1)) / 86400000);
}
function dailyAnswer(n = todayNumber()) {
  return answers[((n % answers.length) + answers.length) % answers.length];
}

/** Test tarafında bağımsız yazılmış iki geçişli renklendirme. */
function expected(guess: string, answer: string) {
  const g = [...guess], a = [...answer];
  const res: string[] = Array(5).fill('absent');
  const left: Record<string, number> = {};
  a.forEach((c, i) => { if (g[i] === c) res[i] = 'correct'; else left[c] = (left[c] || 0) + 1; });
  g.forEach((c, i) => { if (res[i] !== 'correct' && left[c] > 0) { res[i] = 'present'; left[c]--; } });
  return res;
}

async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('#board')).toHaveAttribute('data-ready', '1');
}

/** Ekran klavyesiyle kelime yazar (Türkçe harfler dahil). */
async function typeWord(page: Page, word: string, submit = true) {
  for (const ch of [...word]) await page.locator(`#keyboard .kb-key[data-key="${ch}"]`).click();
  if (submit) await page.locator('#keyboard .kb-key[data-key="enter"]').click();
}

const tileStates = async (page: Page, row: number) =>
  page.locator('#board .kb-row').nth(row).locator('.kb-tile').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.state));

test.describe('Kelime Bulmaca', () => {
  test('sayfa açılır, yapı doğru, içerik ve reklam kuralları sağlanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Kelime Bulmaca');
    await expect(page).toHaveTitle(/Kelime Bulmaca Oyna/);
    expect(await page.locator('#board .kb-tile').count()).toBe(30);
    // 29 harf tuşu + Gir + Sil (Q, W, X yok; i ve ı ayrı tuş)
    expect(await page.locator('#keyboard .kb-key').count()).toBe(31);
    for (const k of ['ğ', 'ü', 'ş', 'ı', 'i', 'ö', 'ç']) await expect(page.locator(`#keyboard .kb-key[data-key="${k}"]`)).toHaveCount(1);
    for (const k of ['q', 'w', 'x']) await expect(page.locator(`#keyboard .kb-key[data-key="${k}"]`)).toHaveCount(0);
    await expect(page.locator('#puzzle-label')).toContainText(`#${todayNumber() + 1}`);

    // ≥ 800 kelime (SSS dahil, kapalı <details> metni de sayılır) ve en az 7 SSS maddesi
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);

    // Reklam: tam üç alan, doğru adlar; hiçbiri oyun kutusunun içinde değil; A oyun kutusundan sonra gelir.
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-kelime-bulmaca-a', 'oyun-kelime-bulmaca-b', 'oyun-kelime-bulmaca-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const aAfterBox = await page.evaluate(() => {
      const box = document.querySelector('.game-box')!;
      const ad = document.querySelector('.ba-ad')!;
      return !!(box.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(aAfterBox).toBe(true);
    // FAQPage JSON-LD sayfadaki SSS sayısıyla uyumlu
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    const faq = JSON.parse(ld!)['@graph'].find((g: { '@type': string }) => g['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(await page.locator('.ba-faq details').count());
    // "Wordle" adı hiçbir yerde geçmez
    expect(await page.content()).not.toMatch(new RegExp(['w', 'ordle'].join(''), 'i'));
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('cevap havuzu temiz: 5 harfli, tekrarsız ve tamamı sözlükte', async () => {
    const raw = readFileSync(join(WEB, 'oyunlar', 'kelime-bulmaca', 'cevaplar.txt'), 'utf8').split(/\r?\n/).filter(Boolean).map(trLower);
    expect(raw.length).toBeGreaterThan(500);
    expect(new Set(raw).size).toBe(raw.length);
    for (const w of raw) {
      expect([...w].length, w).toBe(5);
      expect(w, w).toMatch(/^[abcçdefgğhıijklmnoöprsştuüvyz]{5}$/);
      expect(dict.has(w), `${w} sözlükte yok`).toBe(true);
    }
  });

  test('ekran klavyesiyle tahmin renkli geri bildirim verir (iki geçişli, tekrar eden harf dahil)', async ({ page }) => {
    await open(page);
    const answer = dailyAnswer();
    // Hem yeşil/sarı hem gri üreten ve en az bir harfi tekrar eden bir tahmin seç.
    const guess = answers.find((w) => {
      if (w === answer) return false;
      const r = expected(w, answer);
      return r.includes('absent') && (r.includes('present') || r.includes('correct')) && new Set(w).size < 5;
    }) || answers.find((w) => w !== answer && new Set(expected(w, answer)).size >= 2)!;
    await typeWord(page, guess);
    const want = expected(guess, answer);
    expect(await tileStates(page, 0)).toEqual(want);
    const labels = await page.locator('#board .kb-row').first().locator('.kb-tile').evaluateAll((els) => els.map((e) => e.getAttribute('aria-label')));
    labels.forEach((l, i) => {
      expect(l).toContain([...guess][i].toLocaleUpperCase('tr'));
      expect(l).toContain({ correct: 'doğru yerde', present: 'yeri yanlış', absent: 'kelimede yok' }[want[i] as 'correct']);
    });
    // Klavye renkleri satır çevirme bitince gelir; her harfin en iyi durumu yansır.
    const rank: Record<string, number> = { absent: 1, present: 2, correct: 3 };
    const best: Record<string, string> = {};
    [...guess].forEach((c, i) => { if (!best[c] || rank[want[i]] > rank[best[c]]) best[c] = want[i]; });
    for (const [c, st] of Object.entries(best)) {
      await expect(page.locator(`#keyboard .kb-key[data-key="${c}"]`)).toHaveAttribute('data-state', st);
    }
    // Geçerli kelime: uyarı yok; sonuç paneli henüz yok
    await expect(page.locator('#msg')).not.toHaveClass(/is-error/);
    await expect(page.locator('#result')).toBeHidden();
  });

  test('geçersiz ve kısa kelimede uyarı gösterir, deneme hakkı yanmaz', async ({ page }) => {
    await open(page);
    // kısa kelime
    await typeWord(page, 'kal');
    await expect(page.locator('#msg')).toContainText('5 harfli olmalı');
    expect(await tileStates(page, 0)).toEqual(['typing', 'typing', 'typing', undefined, undefined]);
    // listede olmayan 5 harfli diziliş
    await page.locator('#keyboard .kb-key[data-key="del"]').click();
    await page.locator('#keyboard .kb-key[data-key="del"]').click();
    await page.locator('#keyboard .kb-key[data-key="del"]').click();
    expect(dict.has('zzzzz')).toBe(false);
    await typeWord(page, 'zzzzz');
    await expect(page.locator('#msg')).toContainText('sözlükte yok');
    await expect(page.locator('#msg')).toHaveClass(/is-error/);
    await expect(page.locator('#msg')).toContainText('ZZZZZ');
    // Satır yanmadı: harfler hâlâ ilk satırda duruyor ve renklenmedi
    expect(await tileStates(page, 0)).toEqual(['typing', 'typing', 'typing', 'typing', 'typing']);
    expect(await tileStates(page, 1)).toEqual([undefined, undefined, undefined, undefined, undefined]);
    // Silip geçerli kelime yazınca ilk satır kullanılır
    for (let i = 0; i < 5; i++) await page.locator('#keyboard .kb-key[data-key="del"]').click();
    const answer = dailyAnswer();
    const other = answers.find((w) => w !== answer)!;
    await typeWord(page, other);
    expect((await tileStates(page, 0)).every((s) => ['correct', 'present', 'absent'].includes(s as string))).toBe(true);
    // Aynı kelimeyi ikinci kez denemek de uyarı verir
    await typeWord(page, other);
    await expect(page.locator('#msg')).toContainText('zaten denediniz');
    expect(await tileStates(page, 1)).toEqual(['typing', 'typing', 'typing', 'typing', 'typing']);
  });

  test('fiziksel klavye: ASCII tuşlar, Backspace, Enter ve Türkçe i/ı büyük-küçük harf eşlemesi', async ({ page }) => {
    await open(page);
    await page.keyboard.press('a');
    await page.keyboard.press('b');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('c');
    const first = page.locator('#board .kb-row').first().locator('.kb-tile');
    await expect(first.nth(0)).toHaveText('A');
    await expect(first.nth(1)).toHaveText('C');
    // Modifiye tuşlar ve Türk alfabesinde olmayan q/w/x yok sayılır
    await page.keyboard.press('q');
    await page.keyboard.press('Control+a');
    await expect(first.nth(2)).toHaveText('');
    // Türkçe i/ı: Playwright ASCII dışı tuş basamadığından olay elle gönderilir.
    await page.evaluate(() => {
      const send = (key: string) => document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      send('I'); send('İ');
    });
    await expect(first.nth(2)).toHaveText('I');
    await expect(first.nth(3)).toHaveText('İ');
    await page.evaluate(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ğ', bubbles: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ş', bubbles: true })); // 6. harf yok sayılır
    });
    await expect(first.nth(4)).toHaveText('Ğ');
  });

  test('doğru kelime kazanma ekranı, paylaşım metni, istatistik ve kalıcılık', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await open(page);
    const n = todayNumber();
    const answer = dailyAnswer(n);
    // Önce bir yanlış tahmin, sonra doğru kelime → 2/6
    const wrong = answers.find((w) => w !== answer)!;
    await typeWord(page, wrong);
    await typeWord(page, answer);
    expect(await tileStates(page, 1)).toEqual(Array(5).fill('correct'));
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result-title')).toContainText('Tebrikler');
    await expect(page.locator('#result-title')).toContainText('2. denemede');
    const share = (await page.locator('#share-text').textContent())!;
    expect(share.split('\n')[0]).toBe(`Kelime Bulmaca #${n + 1} 2/6`);
    expect(share).toContain('🟩🟩🟩🟩🟩');
    expect(share).toContain('https://araclar.bilisimajans.com/oyunlar/kelime-bulmaca/');
    // Paylaşım metni harf sızdırmaz (cevap kelimesini içermez)
    expect(share.toLocaleLowerCase('tr')).not.toContain(answer);
    const wantRow = expected(wrong, answer).map((s) => ({ correct: '🟩', present: '🟨', absent: '⬛' }[s as 'correct'])).join('');
    expect(share.split('\n')[2]).toBe(wantRow);

    await page.locator('#copy-share').click();
    await expect(page.locator('#copy-status')).toContainText(/panoya kopyalandı|Kopyalanamadı/);
    const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => null);
    // Windows panosu satır sonunu CRLF yapar; karşılaştırmadan önce normalleştir.
    if (clip !== null) expect(clip.split('\r\n').join('\n')).toBe(share);

    // İstatistikler localStorage'a yazıldı
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-kelime-bulmaca-v1')!));
    expect(stored.stats).toMatchObject({ played: 1, won: 1, streak: 1, maxStreak: 1, lastWinDay: n });
    expect(stored.stats.dist).toEqual([0, 1, 0, 0, 0, 0]);
    await expect(page.locator('#stats')).toBeVisible();
    await expect(page.locator('#st-played')).toHaveText('1');
    await expect(page.locator('#st-pct')).toHaveText('%100');
    await expect(page.locator('#st-streak')).toHaveText('1');

    // Yeniden yükleyince aynı gün oyun kaldığı yerden gelir; istatistik ikinci kez sayılmaz
    await page.reload();
    await expect(page.locator('#board')).toHaveAttribute('data-ready', '1');
    await expect(page.locator('#result')).toBeVisible();
    expect(await tileStates(page, 1)).toEqual(Array(5).fill('correct'));
    await expect(page.locator('#st-played')).toHaveText('1');
    // Bitmiş oyunda yazı yazılmaz
    await page.keyboard.press('a');
    await expect(page.locator('#board .kb-row').nth(2).locator('.kb-tile').first()).toHaveText('');
  });

  test('seri: dün kazanılmışsa bugünkü galibiyet seriyi artırır; kaybetmek sıfırlar', async ({ browser }) => {
    const n = todayNumber();
    const answer = dailyAnswer(n);
    const seed = { stats: { played: 5, won: 4, streak: 3, maxStreak: 3, lastWinDay: n - 1, dist: [0, 1, 2, 1, 0, 0] } };
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.addInitScript((s) => { if (!localStorage.getItem('ba-kelime-bulmaca-v1')) localStorage.setItem('ba-kelime-bulmaca-v1', JSON.stringify(s)); }, seed);
    await open(page);
    await typeWord(page, answer);
    await expect(page.locator('#result')).toBeVisible();
    const s1 = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-kelime-bulmaca-v1')!).stats);
    expect(s1).toMatchObject({ played: 6, won: 5, streak: 4, maxStreak: 4, lastWinDay: n });
    expect(s1.dist).toEqual([1, 1, 2, 1, 0, 0]);
    await ctx.close();

    // Kayıp: altı yanlış tahmin → seri 0, doğru kelime gösterilir
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage();
    await p2.addInitScript((s) => { if (!localStorage.getItem('ba-kelime-bulmaca-v1')) localStorage.setItem('ba-kelime-bulmaca-v1', JSON.stringify(s)); }, seed);
    await open(p2);
    const wrongs = answers.filter((w) => w !== answer).slice(0, 6);
    for (const w of wrongs) await typeWord(p2, w);
    await expect(p2.locator('#result')).toBeVisible();
    await expect(p2.locator('#result-title')).toContainText(`Doğru kelime: ${answer.toLocaleUpperCase('tr')}`);
    expect((await p2.locator('#share-text').textContent())!.split('\n')[0]).toBe(`Kelime Bulmaca #${n + 1} X/6`);
    const s2 = await p2.evaluate(() => JSON.parse(localStorage.getItem('ba-kelime-bulmaca-v1')!).stats);
    expect(s2).toMatchObject({ played: 6, won: 4, streak: 0, maxStreak: 3 });
    await ctx2.close();
  });

  test('sınırsız mod: yeni kelime tahtayı sıfırlar, günlük seriyi etkilemez', async ({ page }) => {
    await open(page);
    await page.locator('#mode-free').click();
    await expect(page.locator('#puzzle-label')).toHaveText('Sınırsız mod');
    await expect(page.locator('#mode-free')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#new-word')).toBeVisible();
    await typeWord(page, answers[0]);
    expect((await tileStates(page, 0)).every(Boolean)).toBe(true);
    await page.locator('#new-word').click();
    expect(await tileStates(page, 0)).toEqual([undefined, undefined, undefined, undefined, undefined]);
    // Günlük moda dönüş: günlük bulmaca etkilenmedi
    await page.locator('#mode-daily').click();
    await expect(page.locator('#puzzle-label')).toContainText('Günlük bulmaca');
    expect(await tileStates(page, 0)).toEqual([undefined, undefined, undefined, undefined, undefined]);
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-kelime-bulmaca-v1') || '{}'));
    expect(stored.stats?.played ?? 0).toBe(0);
  });

  test('360px genişlikte yatay taşma yok ve ekran klavyesi sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const keys = await page.locator('#keyboard .kb-key').evaluateAll((els) =>
      els.map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, w: r.width, h: r.height }; }));
    for (const k of keys) {
      expect(k.l).toBeGreaterThanOrEqual(0);
      expect(k.r).toBeLessThanOrEqual(360);
      expect(k.w).toBeGreaterThanOrEqual(22);
      expect(k.h).toBeGreaterThanOrEqual(44);
    }
    // Tahtanın tamamı görünüm alanı genişliğine sığar
    const board = await page.locator('#board').boundingBox();
    expect(board!.x + board!.width).toBeLessThanOrEqual(360);
    // Mobilde de oynanır
    await typeWord(page, answers[1]);
    expect((await tileStates(page, 0)).every(Boolean)).toBe(true);
  });
});
