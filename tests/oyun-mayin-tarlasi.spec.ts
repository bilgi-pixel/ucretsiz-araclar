import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL = '/oyunlar/mayin-tarlasi/';

const cell = (page: Page, r: number, c: number) => page.locator(`.mt-cell[data-r="${r}"][data-c="${c}"]`);
const counter = async (page: Page) => Number(await page.locator('#sayac').getAttribute('data-value'));
const stateOf = async (page: Page, r: number, c: number) => cell(page, r, c).getAttribute('data-state');

/** Tahtadaki tüm hücre durumlarını [satır, sütun, durum, n] olarak okur. */
async function snapshot(page: Page) {
  return page.$$eval('.mt-cell', (nodes) =>
    nodes.map((n) => ({ r: Number((n as HTMLElement).dataset.r), c: Number((n as HTMLElement).dataset.c), state: (n as HTMLElement).dataset.state!, n: Number((n as HTMLElement).dataset.n || 0) })),
  );
}

async function startCustom(page: Page, w: number, h: number, m: number) {
  await page.locator('#seviye').selectOption('ozel');
  await page.locator('#ozel-w').fill(String(w));
  await page.locator('#ozel-h').fill(String(h));
  await page.locator('#ozel-m').fill(String(m));
  await page.locator('#ozel-baslat').click();
}

test.describe('Mayın Tarlası oyunu', () => {
  test('sayfa açılır; tahta, sayaç, içerik ve 3 reklam alanı var; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(URL);
    await expect(page.locator('h1')).toContainText('Mayın Tarlası');
    await expect(page.locator('.mt-cell')).toHaveCount(81);
    await expect(page.locator('#sayac')).toHaveText('010');
    await expect(page.locator('#sure')).toHaveText('000');
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const k of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="oyun-mayin-tarlasi-${k}"]`)).toHaveCount(1);
    await expect(page.locator('details')).toHaveCount(8);
    const words = await page.locator('.ba-content').evaluate((n) => (n as HTMLElement).innerText.split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(800);
    // reklam alanı oyun kutusunun içinde değil, altında olmalı
    const adInsideBox = await page.locator('#oyun .ba-ad').count();
    expect(adInsideBox).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('ilk tıklama hiçbir zaman mayına gelmez (köşe ve ortadan, tekrarlı)', async ({ page }) => {
    await page.goto(URL);
    // gerçek fare tıklamasıyla beş farklı konum
    const spots: Array<[number, number]> = [[0, 0], [8, 8], [4, 4], [0, 8], [8, 0]];
    for (const [r, c] of spots) {
      await page.locator('#yeni-oyun').click();
      await cell(page, r, c).click();
      expect(await stateOf(page, r, c)).toBe('acik');
      await expect(page.locator('#durum')).not.toContainText('Kaybettiniz');
      const snap = await snapshot(page);
      expect(snap.filter((x) => x.state === 'patladi' || x.state === 'mayin')).toHaveLength(0);
    }
    // sayfa içinde çok sayıda yeni oyun: ilk açılan kare hiç patlamamalı
    const bad = await page.evaluate(() => {
      const problems: string[] = [];
      const pts = [[0, 0], [8, 8], [4, 4], [0, 8], [8, 0], [0, 4], [4, 0], [1, 1]];
      for (let round = 0; round < 15; round++) {
        for (const [r, c] of pts) {
          (document.getElementById('yeni-oyun') as HTMLElement).click();
          (document.querySelector(`.mt-cell[data-r="${r}"][data-c="${c}"]`) as HTMLElement).click();
          const st = (document.querySelector(`.mt-cell[data-r="${r}"][data-c="${c}"]`) as HTMLElement).dataset.state;
          if (st !== 'acik') problems.push(`${r},${c}: ${st}`);
          if (document.querySelector('.mt-cell[data-state="patladi"]')) problems.push(`${r},${c}: patladı`);
        }
      }
      return problems;
    });
    expect(bad).toEqual([]);
  });

  test('zor seviyede de ilk tıklama güvenli (480 kare, 99 mayın)', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#seviye').selectOption('zor');
    await expect(page.locator('.mt-cell')).toHaveCount(480);
    await expect(page.locator('#sayac')).toHaveText('099');
    await cell(page, 0, 0).click();
    expect(await stateOf(page, 0, 0)).toBe('acik');
    await expect(page.locator('#durum')).not.toContainText('Kaybettiniz');
  });

  test('sağ tık bayrak koyar, sayaç düşer; tekrar sağ tık kaldırır; bayraklı kare açılmaz', async ({ page }) => {
    await page.goto(URL);
    expect(await counter(page)).toBe(10);
    await cell(page, 2, 3).click({ button: 'right' });
    expect(await stateOf(page, 2, 3)).toBe('bayrak');
    await expect(page.locator('#sayac')).toHaveText('009');
    // bayraklı kareye sol tık oyunu başlatmaz ve kareyi açmaz
    await cell(page, 2, 3).click();
    expect(await stateOf(page, 2, 3)).toBe('bayrak');
    await expect(page.locator('#durum')).toContainText('Hazır');
    await cell(page, 2, 3).click({ button: 'right' });
    expect(await stateOf(page, 2, 3)).toBe('kapali');
    await expect(page.locator('#sayac')).toHaveText('010');
    // sayaç mayın sayısından fazla bayrakla negatife inebilir
    for (let c = 0; c < 9; c++) await cell(page, 0, c).click({ button: 'right' });
    await cell(page, 1, 0).click({ button: 'right' });
    await cell(page, 1, 1).click({ button: 'right' });
    expect(await counter(page)).toBe(-1);
    await expect(page.locator('#sayac')).toHaveText('-01');
  });

  test('soru işareti seçeneği: bayrak, soru, boş döngüsü', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#soru-isareti').check();
    const c = cell(page, 5, 5);
    await c.click({ button: 'right' });
    expect(await c.getAttribute('data-state')).toBe('bayrak');
    await c.click({ button: 'right' });
    expect(await c.getAttribute('data-state')).toBe('soru');
    await expect(page.locator('#sayac')).toHaveText('010');
    await c.click({ button: 'right' });
    expect(await c.getAttribute('data-state')).toBe('kapali');
  });

  test('bayrak modu düğmesi: dokunuş bayrak koyar, kapatınca kare açar', async ({ page }) => {
    await page.goto(URL);
    const btn = page.locator('#bayrak-modu');
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await cell(page, 3, 3).click();
    expect(await stateOf(page, 3, 3)).toBe('bayrak');
    expect(await counter(page)).toBe(9);
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await cell(page, 6, 6).click();
    expect(await stateOf(page, 6, 6)).toBe('acik');
  });

  test('süre ilk açıştan sonra ilerler, duraklatınca durur ve devam eder', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#duraklat')).toBeDisabled();
    await cell(page, 4, 4).click();
    await expect.poll(async () => Number(await page.locator('#sure').getAttribute('data-value')), { timeout: 5000 }).toBeGreaterThanOrEqual(1);
    await page.locator('#duraklat').click();
    await expect(page.locator('#duraklatildi')).toBeVisible();
    await expect(page.locator('#tahta')).toBeHidden();
    const frozen = await page.locator('#sure').getAttribute('data-value');
    await page.waitForTimeout(1300);
    expect(await page.locator('#sure').getAttribute('data-value')).toBe(frozen);
    await page.locator('#devam-et').click();
    await expect(page.locator('#duraklatildi')).toBeHidden();
    await expect(page.locator('#tahta')).toBeVisible();
  });

  test('klavye: oklarla gezin, F bayrak koyar, Enter açar', async ({ page }) => {
    await page.goto(URL);
    await cell(page, 0, 0).focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(cell(page, 1, 1)).toBeFocused();
    await page.keyboard.press('f');
    expect(await stateOf(page, 1, 1)).toBe('bayrak');
    expect(await counter(page)).toBe(9);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(cell(page, 1, 3)).toBeFocused();
    await page.keyboard.press('Enter');
    expect(await stateOf(page, 1, 3)).toBe('acik');
    // tek sekme durağı: roving tabindex
    const tabbable = await page.locator('.mt-cell[tabindex="0"]').count();
    expect(tabbable).toBe(1);
  });

  test('açık sayıya çift tık: bayrak sayısı tamamsa çevresindeki kapalı kareler açılır', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#seviye').selectOption('orta');
    await cell(page, 8, 8).click();
    const snap = await snapshot(page);
    const at = (r: number, c: number) => snap.find((x) => x.r === r && x.c === c);
    // kapalı komşusu olan bir sayı hücresi bul
    let target: { r: number; c: number; n: number; around: Array<[number, number]> } | null = null;
    for (const s of snap) {
      if (s.state !== 'acik' || s.n === 0) continue;
      const around: Array<[number, number]> = [];
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const x = at(s.r + dr, s.c + dc);
        if (x && x.state === 'kapali') around.push([x.r, x.c]);
      }
      if (around.length >= s.n) { target = { r: s.r, c: s.c, n: s.n, around }; break; }
    }
    expect(target).not.toBeNull();
    const t = target!;
    for (let k = 0; k < t.n; k++) await cell(page, t.around[k][0], t.around[k][1]).click({ button: 'right' });
    await cell(page, t.r, t.c).dblclick();
    // bayrak konmayan komşuların hiçbiri kapalı kalmamalı (açıldı ya da patladı)
    for (let k = t.n; k < t.around.length; k++) {
      expect(await stateOf(page, t.around[k][0], t.around[k][1])).not.toBe('kapali');
    }
  });

  test('kayıp: mayın gösterilir, yeni oyun tahtayı sıfırlar', async ({ page }) => {
    await page.goto(URL);
    await cell(page, 0, 0).click();
    // kapalı karelere sırayla tıkla; bir mayına denk gelene (ya da oyun bitene) kadar
    await page.evaluate(() => {
      for (let guard = 0; guard < 200; guard++) {
        if (document.querySelector('#oyun.is-lost, #oyun.is-won')) break;
        const closed = document.querySelector('.mt-cell[data-state="kapali"]') as HTMLElement | null;
        if (!closed) break;
        closed.click();
      }
    });
    const lost = await page.locator('#oyun.is-lost').count();
    if (lost) {
      await expect(page.locator('#durum')).toContainText('Kaybettiniz');
      expect(await page.locator('.mt-cell[data-state="patladi"]').count()).toBeGreaterThanOrEqual(1);
      await expect(page.locator('#duraklat')).toBeDisabled();
    } else {
      await expect(page.locator('#durum')).toContainText('Kazandınız');
    }
    await page.locator('#yeni-oyun').click();
    expect(await page.locator('.mt-cell[data-state="kapali"]').count()).toBe(81);
    await expect(page.locator('#sayac')).toHaveText('010');
    await expect(page.locator('#sure')).toHaveText('000');
    await expect(page.locator('#oyun.is-lost, #oyun.is-won')).toHaveCount(0);
  });

  test('kazanma: özel 5×5 / 1 mayın tahtası açılınca oyun kazanılır, en iyi süre localStorage\'a yazılır', async ({ page }) => {
    await page.goto(URL);
    await startCustom(page, 5, 5, 1);
    await expect(page.locator('.mt-cell')).toHaveCount(25);
    await expect(page.locator('#sayac')).toHaveText('001');
    // Tek mayın bazı konumlarda köşe karesini yayılımın dışında bırakır; ortaya tıklayıp
    // kazanılmadıysa yeniden başlatıp dene (her denemede yaklaşık yarı olasılık).
    let won = false;
    for (let attempt = 0; attempt < 25 && !won; attempt++) {
      await cell(page, 2, 2).click();
      won = (await page.locator('#oyun.is-won').count()) > 0;
      if (!won) await page.locator('#yeni-oyun').click();
    }
    expect(won).toBe(true);
    await expect(page.locator('#durum')).toContainText('Kazandınız');
    await expect(page.locator('#sayac')).toHaveText('000'); // tüm mayınlar otomatik bayraklandı
    expect(await page.locator('.mt-cell[data-state="bayrak"]').count()).toBe(1);
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ba-mayin-en-iyi') || '{}'));
    expect(Object.keys(stored)).toContain('ozel:5x5:1');
    expect(stored['ozel:5x5:1']).toBeGreaterThan(0);
    await expect(page.locator('#en-iyi')).toContainText('Özel (5×5, 1 mayın)');
    await expect(page.locator('#en-iyi')).toContainText('sn');
    // yeniden başlat: tahta sıfırlanır
    await page.locator('#yeni-oyun').click();
    expect(await page.locator('.mt-cell[data-state="kapali"]').count()).toBe(25);
    await expect(page.locator('#oyun.is-won')).toHaveCount(0);
    // sayfa yenilenince tercih (özel seviye) ve rekor korunur
    await page.reload();
    await expect(page.locator('.mt-cell')).toHaveCount(25);
    await expect(page.locator('#en-iyi')).toContainText('Özel (5×5, 1 mayın)');
  });

  test('özel tahta doğrulaması Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await page.goto(URL);
    await startCustom(page, 3, 3, 50);
    await expect(page.locator('#hata')).toContainText('Genişlik 5–40');
    await startCustom(page, 6, 6, 80);
    await expect(page.locator('#hata')).toContainText('1 ile 27 arasında');
    await expect(page.locator('.mt-cell')).toHaveCount(144); // eski (varsayılan özel 12×12) tahta bozulmadı
    await startCustom(page, 6, 6, 5);
    await expect(page.locator('#hata')).toBeHidden();
    await expect(page.locator('.mt-cell')).toHaveCount(36);
  });

  test('seviye geçişi: orta 16×16/40, zor 30×16/99', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#seviye').selectOption('orta');
    await expect(page.locator('.mt-cell')).toHaveCount(256);
    await expect(page.locator('#sayac')).toHaveText('040');
    await page.locator('#seviye').selectOption('zor');
    await expect(page.locator('.mt-cell')).toHaveCount(480);
    await expect(page.locator('#sayac')).toHaveText('099');
  });

  test('360px genişlikte sayfa yatay taşmaz (kolay ve zor tahta)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL);
    const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await over()).toBeLessThanOrEqual(0);
    await page.locator('#seviye').selectOption('zor');
    expect(await over()).toBeLessThanOrEqual(0);
    // geniş tahta kendi kaydırma alanında kalır
    const scrolls = await page.locator('#tahta-kaydirma').evaluate((n) => n.scrollWidth > n.clientWidth);
    expect(scrolls).toBe(true);
    await page.locator('#seviye').selectOption('ozel');
    expect(await over()).toBeLessThanOrEqual(0);
    // kolay tahta 360px'te kaydırma gerektirmeden sığar
    await page.locator('#seviye').selectOption('kolay');
    const fits = await page.locator('#tahta-kaydirma').evaluate((n) => n.scrollWidth <= n.clientWidth);
    expect(fits).toBe(true);
  });
});
