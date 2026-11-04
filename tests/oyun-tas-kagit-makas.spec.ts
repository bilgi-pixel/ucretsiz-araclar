import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Taş Kağıt Makas oyunu: bilgisayara karşı, 5'li mod, maç, iki oyunculu klavye, saklama, mobil, dış istek.
const URL_PATH = '/oyunlar/tas-kagit-makas/';
const STORE = 'ba-oyun-tas-kagit-makas';

// Testin kendi kural tablosu (oyun kodundan bağımsız): kazanan -> yendikleri
const BEATS: Record<string, string[]> = {
  Taş: ['Makas', 'Kertenkele'],
  Kağıt: ['Taş', 'Uzaylı'],
  Makas: ['Kağıt', 'Kertenkele'],
  Kertenkele: ['Kağıt', 'Uzaylı'],
  Uzaylı: ['Makas', 'Taş'],
};

function expectedPrefix(you: string, cpu: string): string {
  if (you === cpu) return 'Berabere';
  return BEATS[you].includes(cpu) ? 'Kazandın' : 'Kaybettin';
}

async function open(page: Page) {
  const external = trackExternalRequests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(page.locator('#tkm-pad-1 button').first()).toBeVisible();
  return { external, errors };
}

const num = async (page: Page, id: string) => Number(await page.locator('#' + id).textContent());
const scores = async (page: Page) => ({ you: await num(page, 'score-you'), draw: await num(page, 'score-draw'), cpu: await num(page, 'score-cpu') });
const setOpt = (page: Page, name: string, value: string) => page.locator(`input[name="${name}"][value="${value}"]`).check();

test.describe('Oyun: Taş Kağıt Makas', () => {
  test('sayfa açılır; h1, içerik, 3 reklam ve JSON-LD tamam; dış istek ve sayfa hatası yok', async ({ page }) => {
    const { external, errors } = await open(page);
    await expect(page.locator('h1')).toContainText('Taş Kağıt Makas');
    const text = await page.locator('main').evaluate((el) => (el as HTMLElement).textContent || '');
    expect(text.split(/\s+/).filter(Boolean).length, 'kelime sayısı').toBeGreaterThanOrEqual(800);
    expect(await page.locator('details').count()).toBeGreaterThanOrEqual(6);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-tas-kagit-makas-a', 'oyun-tas-kagit-makas-b', 'oyun-tas-kagit-makas-c']);
    // Reklam oyun kutusunun dışında ve altında olmalı
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const box = await page.locator('.game-box').boundingBox();
    const ad = await page.locator('.ba-ad').first().boundingBox();
    expect(ad!.y).toBeGreaterThanOrEqual(box!.y + box!.height);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(raw || '{}')['@graph'];
    expect(graph.find((n: { '@type': string }) => n['@type'] === 'VideoGame').applicationCategory).toBe('Game');
    expect(graph.find((n: { '@type': string }) => n['@type'] === 'FAQPage').mainEntity.length).toBeGreaterThanOrEqual(6);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('bilgisayara karşı: seçimden sonra sonuç metni ve skor güncellenir, localStorage yazılır', async ({ page }) => {
    const { external, errors } = await open(page);
    await page.locator('#tkm-pad-1 [data-move="0"]').click(); // Taş (animasyonlu yol)
    const result = page.locator('#tkm-result');
    await expect(result).toHaveText(/^(Kazandın|Kaybettin|Berabere)/);
    await expect(page.locator('#pick-you-name')).toHaveText('Taş');
    const cpuName = (await page.locator('#pick-cpu-name').textContent()) || '';
    expect(['Taş', 'Kağıt', 'Makas']).toContain(cpuName);
    expect(((await result.textContent()) || '').startsWith(expectedPrefix('Taş', cpuName))).toBe(true);
    const s = await scores(page);
    expect(s.you + s.draw + s.cpu).toBe(1);
    await expect(page.locator('#tkm-round')).toHaveText('El: 1');

    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);
    const r = stored.rounds.random;
    expect(r.w + r.l + r.d).toBe(1);

    // Sayfa yenilenince istatistik korunur
    await page.reload();
    await expect(page.locator('#stat-rounds')).toHaveText('1');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('bilgisayar sonucu kurallara uygun: 15 elde 3 işaret dışına çıkmaz ve skor toplamı tutar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    const names = ['Taş', 'Kağıt', 'Makas'];
    for (let i = 0; i < 15; i++) {
      const you = names[i % 3];
      await page.locator(`#tkm-pad-1 [data-move="${i % 3}"]`).click();
      const cpu = (await page.locator('#pick-cpu-name').textContent()) || '';
      expect(names).toContain(cpu);
      const text = (await page.locator('#tkm-result').textContent()) || '';
      expect(text.startsWith(expectedPrefix(you, cpu)), `${you} vs ${cpu}: ${text}`).toBe(true);
    }
    const s = await scores(page);
    expect(s.you + s.draw + s.cpu).toBe(15);
  });

  test('öğrenen mod: hep aynı işareti seçen oyuncuya karşı bilgisayar çoğunlukla kazanır', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const { errors } = await open(page);
    await setOpt(page, 'opp', 'learning');
    for (let i = 0; i < 20; i++) await page.locator('#tkm-pad-1 [data-move="0"]').click();
    const s = await scores(page);
    expect(s.you + s.draw + s.cpu).toBe(20);
    // İlk 3 el rastgele; sonrası ~%90 kağıt. Beklenen ~16 yenilgi, 10 eşiği güvenli.
    expect(s.cpu, `bilgisayar galibiyeti ${s.cpu}/20`).toBeGreaterThanOrEqual(10);
    await expect(page.locator('#tkm-predict')).toContainText('tahmini');
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);
    expect(stored.rounds.learning.w + stored.rounds.learning.l + stored.rounds.learning.d).toBe(20);
    expect(stored.model['3'].total).toBe(20);
    expect(errors).toEqual([]);
  });

  test('5\'li mod: beş işaret görünür, her sonuç 5\'li kurallara uyar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const { errors } = await open(page);
    await expect(page.locator('#tkm-pad-1 button')).toHaveCount(3);
    await setOpt(page, 'variant', '5');
    await expect(page.locator('#tkm-pad-1 button')).toHaveCount(5);
    const names = ['Taş', 'Kağıt', 'Makas', 'Kertenkele', 'Uzaylı'];
    const seen = new Set<string>();
    for (let round = 0; round < 3; round++) {
      for (let m = 0; m < 5; m++) {
        await page.locator(`#tkm-pad-1 [data-move="${m}"]`).click();
        await expect(page.locator('#pick-you-name')).toHaveText(names[m]);
        const cpu = (await page.locator('#pick-cpu-name').textContent()) || '';
        expect(names).toContain(cpu);
        seen.add(cpu);
        const text = (await page.locator('#tkm-result').textContent()) || '';
        expect(text.startsWith(expectedPrefix(names[m], cpu)), `${names[m]} vs ${cpu}: ${text}`).toBe(true);
      }
    }
    expect(seen.size).toBeGreaterThan(1);
    // Uzaylı düğmesi klavyeden de çalışır (G tuşu)
    const before = await scores(page);
    await page.keyboard.press('g');
    const after = await scores(page);
    expect(after.you + after.draw + after.cpu).toBe(before.you + before.draw + before.cpu + 1);
    await expect(page.locator('#pick-you-name')).toHaveText('Uzaylı');
    expect(errors).toEqual([]);
  });

  test('3 elli maç: el sayısı dolunca maç biter, düğmeler kilitlenir, Yeni maç sıfırlar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await setOpt(page, 'len', '3');
    for (let i = 0; i < 3; i++) await page.locator('#tkm-pad-1 [data-move="1"]').click();
    await expect(page.locator('#tkm-round')).toHaveText('El: 3/3');
    await expect(page.locator('#tkm-match')).toBeVisible();
    await expect(page.locator('#tkm-match')).toContainText('Maç bitti');
    await expect(page.locator('#tkm-pad-1 [data-move="0"]')).toBeDisabled();
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);
    expect(stored.matches.w + stored.matches.l + stored.matches.d).toBe(1);
    // Maç bittikten sonra tuş basışı el oynatmaz
    await page.keyboard.press('a');
    await expect(page.locator('#tkm-round')).toHaveText('El: 3/3');

    await page.locator('#tkm-new').click();
    await expect(page.locator('#tkm-match')).toBeHidden();
    expect(await scores(page)).toEqual({ you: 0, draw: 0, cpu: 0 });
    await expect(page.locator('#tkm-pad-1 [data-move="0"]')).toBeEnabled();
  });

  test('iki oyunculu klavye: A/S/D ve J/K/L, ilk seçim gizli, skor doğru', async ({ page }) => {
    const { external, errors } = await open(page);
    await setOpt(page, 'opp', 'two');
    await expect(page.locator('#tkm-pad-2-wrap')).toBeVisible();
    await expect(page.locator('#tkm-name-you')).toHaveText('Oyuncu 1');

    // El 1: P1 taş (A), P2 kağıt (K) -> Oyuncu 2 kazanır
    await page.keyboard.press('a');
    await expect(page.locator('#tkm-result')).toContainText('Oyuncu 1 seçti');
    await expect(page.locator('#pick-you-name')).toHaveText('—'); // seçim hâlâ gizli
    await page.keyboard.press('k');
    await expect(page.locator('#tkm-result')).toHaveText(/^Oyuncu 2 kazandı! Kağıt taşı sarar\./);
    await expect(page.locator('#pick-you-name')).toHaveText('Taş');
    await expect(page.locator('#pick-cpu-name')).toHaveText('Kağıt');
    expect(await scores(page)).toEqual({ you: 0, draw: 0, cpu: 1 });

    // El 2: P2 önce (L = makas), sonra P1 kağıt (S) -> Oyuncu 2 kazanır
    await page.keyboard.press('l');
    await expect(page.locator('#tkm-result')).toContainText('Oyuncu 2 seçti');
    await page.keyboard.press('s');
    await expect(page.locator('#tkm-result')).toHaveText(/^Oyuncu 2 kazandı! Makas kağıdı keser\./);
    expect(await scores(page)).toEqual({ you: 0, draw: 0, cpu: 2 });

    // El 3: P1 makas (D), P2 kağıt (K) -> Oyuncu 1 kazanır
    await page.keyboard.press('d');
    await page.keyboard.press('k');
    await expect(page.locator('#tkm-result')).toHaveText(/^Oyuncu 1 kazandı! Makas kağıdı keser\./);
    expect(await scores(page)).toEqual({ you: 1, draw: 0, cpu: 2 });

    // El 4: ikisi de taş -> berabere
    await page.keyboard.press('a');
    await page.keyboard.press('j');
    await expect(page.locator('#tkm-result')).toHaveText(/^Berabere/);
    expect(await scores(page)).toEqual({ you: 1, draw: 1, cpu: 2 });

    // Aynı oyuncu iki kez basarsa ikinci basış yok sayılır; 3'lü modda F tuşu işaret seçmez
    await page.keyboard.press('a');
    await page.keyboard.press('s');
    await page.keyboard.press('f');
    await expect(page.locator('#tkm-result')).toContainText('Oyuncu 1 seçti');
    await page.keyboard.press('l'); // P2 makas, P1 taş (ilk basış) -> P1 kazanır
    await expect(page.locator('#tkm-result')).toHaveText(/^Oyuncu 1 kazandı! Taş makası kırar\./);
    expect(await scores(page)).toEqual({ you: 2, draw: 1, cpu: 2 });

    // Bilgisayara karşı istatistiği iki oyunculu eller kirletmez
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE);
    const total = (x: { w: number; l: number; d: number }) => x.w + x.l + x.d;
    expect(total(stored?.rounds?.random ?? { w: 0, l: 0, d: 0 }) + total(stored?.rounds?.learning ?? { w: 0, l: 0, d: 0 })).toBe(0);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('iki oyunculu 5\'li mod: F G ve I O tuşları, düğmelerle de oynanır', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await setOpt(page, 'opp', 'two');
    await setOpt(page, 'variant', '5');
    await expect(page.locator('#tkm-pad-2 button')).toHaveCount(5);
    await page.keyboard.press('g'); // P1 uzaylı
    await page.keyboard.press('j'); // P2 taş
    await expect(page.locator('#tkm-result')).toHaveText(/^Oyuncu 1 kazandı! Uzaylı taşı buharlaştırır\./);
    await page.keyboard.press('f'); // P1 kertenkele
    await page.keyboard.press('o'); // P2 uzaylı
    await expect(page.locator('#tkm-result')).toHaveText(/^Oyuncu 1 kazandı! Kertenkele uzaylıyı zehirler\./);
    // Dokunmatik/fare yolu: iki satır düğme
    await page.locator('#tkm-pad-1 [data-move="2"]').click(); // makas
    await expect(page.locator('#tkm-result')).toContainText('Oyuncu 1 seçti');
    await page.locator('#tkm-pad-2 [data-move="4"]').click(); // uzaylı
    await expect(page.locator('#tkm-result')).toHaveText(/^Oyuncu 2 kazandı! Uzaylı makası eritir\./);
    expect(await scores(page)).toEqual({ you: 2, draw: 0, cpu: 1 });
  });

  test('tek tuşlu klavye ve Tab+Enter ile oynanır; sayı tuşları çalışır', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await page.keyboard.press('2'); // kağıt
    await expect(page.locator('#pick-you-name')).toHaveText('Kağıt');
    await page.locator('#tkm-pad-1 [data-move="2"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#pick-you-name')).toHaveText('Makas');
    const s = await scores(page);
    expect(s.you + s.draw + s.cpu).toBe(2);
  });

  test('ayarlar yenilemede korunur; istatistikleri sil iki adımda sıfırlar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await setOpt(page, 'opp', 'learning');
    await setOpt(page, 'variant', '5');
    await setOpt(page, 'len', '5');
    await page.locator('#tkm-pad-1 [data-move="3"]').click();
    await page.reload();
    await expect(page.locator('input[name="opp"][value="learning"]')).toBeChecked();
    await expect(page.locator('input[name="variant"][value="5"]')).toBeChecked();
    await expect(page.locator('input[name="len"][value="5"]')).toBeChecked();
    await expect(page.locator('#tkm-pad-1 button')).toHaveCount(5);
    await expect(page.locator('#stat-rounds')).toHaveText('1');
    await page.locator('#tkm-clear').click();
    await expect(page.locator('#tkm-clear')).toContainText('Emin misin');
    await expect(page.locator('#stat-rounds')).toHaveText('1'); // ilk tıklama silmez
    await page.locator('#tkm-clear').click();
    await expect(page.locator('#stat-rounds')).toHaveText('0');
    await expect(page.locator('#tkm-clear')).toHaveText('İstatistikleri sil');
  });

  test('360px genişlikte yatay taşma yok; 5\'li ve iki oyunculu düzen sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await setOpt(page, 'variant', '5');
    await setOpt(page, 'opp', 'two');
    expect(await overflow()).toBeLessThanOrEqual(0);
    const rights = await page.locator('.tkm-btn').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().right));
    expect(rights.length).toBe(10);
    for (const r of rights) expect(r).toBeLessThanOrEqual(360);
    await page.keyboard.press('a');
    await page.keyboard.press('k');
    await expect(page.locator('#tkm-result')).not.toHaveText('Oyuncu 1 ve Oyuncu 2 sırayla işaret seçsin.');
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
});
