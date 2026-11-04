import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests } from './helpers';

const URL = '/oyunlar/adam-asmaca/';
const data: Record<string, { ad: string; kelimeler: string[] }> = JSON.parse(
  readFileSync(join(__dirname, '..', 'web', 'oyunlar', 'adam-asmaca', 'kategoriler.json'), 'utf8'),
);
const STORE = 'ba-adam-asmaca-v1';

/**
 * Math.random() = 0 yapılırsa oyun her seçimde listenin ilk uygun kelimesini alır:
 *  - açılışta (Karışık): ilk kategori → hayvanlar[0] = ASLAN
 *  - sonraki oyunlarda son oynananlar elenir, bu yüzden bir sonraki ilk kelime gelir.
 */
async function open(page: Page, fixedRandom = true) {
  if (fixedRandom) await page.addInitScript(() => { Math.random = () => 0; });
  await page.goto(URL);
  await expect(page.locator('#hm-box')).toHaveAttribute('data-ready', '1');
}

const key = (page: Page, k: string) => page.locator(`#keyboard .hm-key[data-key="${k}"]`);
async function press(page: Page, letters: string) {
  for (const ch of [...letters]) await key(page, ch).click();
}
const slots = (page: Page) => page.locator('#word .hm-slot');
const slotTexts = async (page: Page) => page.locator('#word .hm-slot').evaluateAll((els) => els.map((e) => e.textContent));
const stored = (page: Page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), STORE);

test.describe('Adam Asmaca', () => {
  test('sayfa açılır, yapı, içerik ve reklam kuralları sağlanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Adam Asmaca');
    await expect(page).toHaveTitle(/Adam Asmaca Oyna/);
    // Karışık + 6 kategori
    const opts = await page.locator('#category option').evaluateAll((els) => els.map((e) => (e as HTMLOptionElement).textContent));
    expect(opts).toEqual(['Karışık (gizli)', 'Hayvanlar', 'Şehirler', 'Meslekler', 'Yiyecekler', 'Ülkeler', 'Genel']);
    // 29 harf tuşu; Q/W/X yok, İ ve I ayrı
    expect(await page.locator('#keyboard .hm-key').count()).toBe(29);
    for (const k of ['Ğ', 'Ü', 'Ş', 'I', 'İ', 'Ö', 'Ç']) await expect(key(page, k)).toHaveCount(1);
    for (const k of ['Q', 'W', 'X']) await expect(key(page, k)).toHaveCount(0);
    await expect(page.locator('#hm-svg')).toHaveAttribute('data-wrong', '0');
    expect(await page.locator('#hm-svg .hm-part').count()).toBe(7);

    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(800);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(6);
    const slotNames = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slotNames).toEqual(['oyun-adam-asmaca-a', 'oyun-adam-asmaca-b', 'oyun-adam-asmaca-c']);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const aAfterBox = await page.evaluate(() => {
      const box = document.querySelector('.game-box')!;
      return !!(box.compareDocumentPosition(document.querySelector('.ba-ad')!) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(aAfterBox).toBe(true);
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    const faq = JSON.parse(ld!)['@graph'].find((g: { '@type': string }) => g['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBe(await page.locator('.ba-faq details').count());
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('kelime listeleri: 6 kategori × 60 benzersiz, büyük harf, yalnızca Türkçe harf', async () => {
    const keys = Object.keys(data);
    expect(keys).toEqual(['hayvanlar', 'sehirler', 'meslekler', 'yiyecekler', 'ulkeler', 'genel']);
    const all = new Set<string>();
    for (const k of keys) {
      const list = data[k].kelimeler;
      expect(list.length, k).toBe(60);
      expect(new Set(list).size, k).toBe(60);
      for (const w of list) {
        expect(w, w).toMatch(/^[ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ]{4,12}$/);
        all.add(w);
      }
    }
    expect(all.size).toBe(360); // kategoriler arası tekrar yok
  });

  test('tek kişilik: gizli kategori, ipucu (kategori + ilk harf), doğru/yanlış harf ve kazanma puanı', async ({ page }) => {
    await open(page);
    const word = data.hayvanlar.kelimeler[0]; // ASLAN
    expect(word).toBe('ASLAN');
    expect(await slotTexts(page)).toEqual(['', '', '', '', '']);
    await expect(page.locator('#cat-line')).toContainText('gizli');
    // Doğru harf: tüm yerlerinde açılır (A iki kez)
    await key(page, 'A').click();
    expect(await slotTexts(page)).toEqual(['A', '', '', 'A', '']);
    await expect(key(page, 'A')).toHaveAttribute('data-state', 'dogru');
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 0 / 7');
    // Yanlış harf: hata artar, çizim ilerler
    await key(page, 'Z').click();
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 1 / 7');
    await expect(page.locator('#wrong-letters')).toHaveText('Z');
    await expect(page.locator('#hm-svg')).toHaveAttribute('data-wrong', '1');
    expect(await page.locator('#hm-svg .hm-part.is-on').count()).toBe(1);
    await expect(key(page, 'Z')).toHaveAttribute('data-state', 'yanlis');
    // Aynı harf tekrar: uyarı, hata artmaz (tuş aria-disabled olduğundan Playwright'ta zorla tıklanır)
    await key(page, 'Z').click({ force: true });
    await expect(page.locator('#hm-msg')).toContainText('zaten denediniz');
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 1 / 7');
    // İpucu: kategori açılır; ilk harf zaten açık olduğundan yeni harf açılmaz ama hak kullanılır
    await page.locator('#hint').click();
    await expect(page.locator('#cat-line')).toHaveText('Kategori: Hayvanlar');
    await expect(page.locator('#hint')).toBeDisabled();
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 1 / 7');
    // Kalan harfler → kazanma: 50 + 10×6 − 30 = 80 puan
    await press(page, 'SLN');
    await expect(page.locator('#hm-result')).toBeVisible();
    await expect(page.locator('#hm-result-title')).toContainText('Tebrikler');
    await expect(page.locator('#hm-result-title')).toContainText('ASLAN');
    await expect(page.locator('#hm-result-detail')).toContainText('+80 puan');
    await expect(page.locator('#hm-result-detail')).toContainText('ipucu kullanıldı');
    const s = await stored(page);
    expect(s).toMatchObject({ score: 80, wins: 1, losses: 0, streak: 1, bestStreak: 1 });
    await expect(page.locator('#sc-score')).toHaveText('80');
    await expect(page.locator('#restart')).toHaveText('Yeni oyun');
    // Bitmiş oyunda tuşlar işlemez
    await key(page, 'B').click({ force: true });
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 1 / 7');
  });

  test('ipucu ilk harfi açar (ilk harf daha önce seçilmediyse ipucu renginde)', async ({ page }) => {
    await open(page);
    await page.locator('#hint').click();
    expect(await slotTexts(page)).toEqual(['A', '', '', 'A', '']);
    await expect(key(page, 'A')).toHaveAttribute('data-state', 'ipucu');
    await expect(page.locator('#cat-line')).toHaveText('Kategori: Hayvanlar');
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 0 / 7');
    // Mükemmel oyun + ipucu: 50 + 70 − 30 = 90
    await press(page, 'SLN');
    await expect(page.locator('#hm-result-detail')).toContainText('+90 puan');
  });

  test('7 hatada kaybeder: çizim 7 adımda tamamlanır, kelime açılır, yeniden başlat yeni oyun başlatır', async ({ page }) => {
    await open(page);
    await page.locator('#category').selectOption('sehirler');
    await expect(page.locator('#cat-line')).toHaveText('Kategori: Şehirler');
    const word = data.sehirler.kelimeler[0]; // ADANA
    expect(word).toBe('ADANA');
    const wrongLetters = [...'ZBCEFGH']; // ADANA'da yok
    for (let i = 0; i < wrongLetters.length; i++) {
      await key(page, wrongLetters[i]).click();
      await expect(page.locator('#wrong-count')).toHaveText(`Hata: ${i + 1} / 7`);
      expect(await page.locator('#hm-svg .hm-part.is-on').count()).toBe(i + 1);
    }
    await expect(page.locator('#hm-result')).toBeVisible();
    await expect(page.locator('#hm-result-title')).toContainText('Kaybettiniz');
    await expect(page.locator('#hm-result-title')).toContainText('ADANA');
    expect(await slotTexts(page)).toEqual([...word]);
    await expect(page.locator('#word .hm-slot.is-missed')).toHaveCount(5);
    await expect(page.locator('#hm-svg .hm-face')).toHaveClass(/is-on/);
    await expect(page.locator('#wrong-letters')).toHaveText('Z B C E F G H');
    const s = await stored(page);
    expect(s).toMatchObject({ score: 0, wins: 0, losses: 1, streak: 0 });
    // 8. tuş basışı yok sayılır
    await key(page, 'K').click({ force: true });
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 7 / 7');
    // Yeniden başlat
    await expect(page.locator('#restart')).toHaveText('Yeni oyun');
    await page.locator('#restart').click();
    await expect(page.locator('#hm-result')).toBeHidden();
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 0 / 7');
    await expect(page.locator('#wrong-letters')).toHaveText('—');
    await expect(page.locator('#hm-svg')).toHaveAttribute('data-wrong', '0');
    expect(await page.locator('#hm-svg .hm-part.is-on').count()).toBe(0);
    expect(await slotTexts(page)).toEqual(['', '', '', '', '', '', ''].slice(0, (await slots(page).count())));
    expect(await slots(page).count()).toBe(data.sehirler.kelimeler[1].length); // ANKARA (ADANA son oynananlardan elenir)
    await expect(key(page, 'Z')).not.toHaveAttribute('data-state', 'yanlis');
  });

  test('yarım bırakılan oyun yenilgi sayılır ve seriyi sıfırlar; boş oyunda ceza yok', async ({ page }) => {
    await open(page);
    await press(page, 'ASLN'); // ASLAN → kazandı (0 hata: 120 puan)
    await expect(page.locator('#hm-result-detail')).toContainText('+120 puan');
    await page.locator('#restart').click(); // KAPLAN
    expect((await stored(page)).streak).toBe(1);
    // Hiçbir şey yapmadan yeniden başlat: ceza yok
    await page.locator('#restart').click();
    expect(await stored(page)).toMatchObject({ losses: 0, streak: 1, wins: 1 });
    // Bir harf seçip yeniden başlat: yenilgi
    await press(page, 'K');
    await page.locator('#restart').click();
    await expect(page.locator('#hm-msg')).toContainText('yenilgi sayıldı');
    expect(await stored(page)).toMatchObject({ losses: 1, streak: 0, wins: 1, bestStreak: 1, score: 120 });
    await page.locator('#reset-scores').click();
    expect(await stored(page)).toMatchObject({ score: 0, wins: 0, losses: 0, streak: 0, bestStreak: 0 });
  });

  test('fiziksel klavye: harf tahmini, Türkçe i/ı eşlemesi, modifiye tuşlar ve Q/W/X yok sayılır', async ({ page }) => {
    await open(page);
    await page.keyboard.press('a');
    expect(await slotTexts(page)).toEqual(['A', '', '', 'A', '']);
    await page.keyboard.press('Control+z');
    await page.keyboard.press('q');
    await page.keyboard.press('x');
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 0 / 7');
    // i → İ, ı → I (ASLAN'da ikisi de yok → iki hata)
    await page.evaluate(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'i', bubbles: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ı', bubbles: true }));
    });
    await expect(page.locator('#wrong-letters')).toHaveText('İ I');
    await expect(key(page, 'İ')).toHaveAttribute('data-state', 'yanlis');
    await expect(key(page, 'I')).toHaveAttribute('data-state', 'yanlis');
    // Bitince Enter yeni oyun başlatır
    await page.keyboard.press('s'); await page.keyboard.press('l'); await page.keyboard.press('n');
    await expect(page.locator('#hm-result')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('#hm-result')).toBeHidden();
  });

  test('iki kişilik: doğrulama, noktalı gizli giriş, kelime silinir, kaybet/kazan, rol değişimi ve skor', async ({ page }) => {
    const external = trackExternalRequests(page);
    await open(page);
    await page.locator('#mode-duo').click();
    await expect(page.locator('#duo-setup')).toBeVisible();
    await expect(page.locator('#play')).toBeHidden();
    await expect(page.locator('#duo-who')).toContainText('Tur 1');
    await expect(page.locator('#duo-who')).toContainText('Oyuncu 1 seçiyor');
    // Gizli giriş noktalı gösterilir (Chromium)
    expect(await page.locator('#secret').evaluate((el) => getComputedStyle(el).getPropertyValue('-webkit-text-security'))).toBe('disc');
    // Doğrulama mesajları
    const submit = page.locator('#duo-start');
    await submit.click();
    await expect(page.locator('#duo-error')).toContainText('Gizli bir kelime');
    await page.locator('#secret').fill('ab');
    await submit.click();
    await expect(page.locator('#duo-error')).toContainText('3–20 harf');
    await page.locator('#secret').fill('kal em');
    await submit.click();
    await expect(page.locator('#duo-error')).toContainText('Boşluk');
    await page.locator('#secret').fill('kalem1');
    await submit.click();
    await expect(page.locator('#duo-error')).toContainText('yalnızca Türkçe harfler');
    await page.locator('#secret').fill('wxyz');
    await submit.click();
    await expect(page.locator('#duo-error')).toContainText('yalnızca Türkçe harfler');
    await expect(page.locator('#play')).toBeHidden();
    // Geçerli kelime + ipucu notu
    await page.locator('#secret').fill('kalem');
    await page.locator('#secret-hint').fill('bir eşya');
    await submit.click();
    await expect(page.locator('#play')).toBeVisible();
    await expect(page.locator('#duo-setup')).toBeHidden();
    await expect(page.locator('#secret')).toHaveValue(''); // kelime alandan silindi
    expect(await slotTexts(page)).toEqual(['', '', '', '', '']);
    expect(await page.content()).not.toContain('KALEM'); // kelime DOM'da görünmez
    await expect(page.locator('#score-duo')).toBeVisible();
    await expect(page.locator('#score-single')).toBeHidden();
    // Doğru harf
    await key(page, 'K').click();
    expect(await slotTexts(page)).toEqual(['K', '', '', '', '']);
    // İpucu: kullanıcının yazdığı not
    await page.locator('#hint').click();
    await expect(page.locator('#cat-line')).toHaveText('İpucu: bir eşya');
    // 7 yanlış → kelimeyi seçen (Oyuncu 1) kazanır
    for (const ch of [...'ZBCDFGH']) await key(page, ch).click();
    await expect(page.locator('#hm-result-title')).toContainText('Oyuncu 1 kazandı');
    await expect(page.locator('#hm-result-title')).toContainText('KALEM');
    await expect(page.locator('#duo-p1')).toHaveText('1');
    await expect(page.locator('#duo-p2')).toHaveText('0');
    // Yeni oyun: roller değişir (Tur 2, Oyuncu 2 seçiyor)
    await page.locator('#restart').click();
    await expect(page.locator('#duo-setup')).toBeVisible();
    await expect(page.locator('#duo-who')).toContainText('Tur 2');
    await expect(page.locator('#duo-who')).toContainText('Oyuncu 2 seçiyor');
    // Türkçe büyük harf: iğne → İĞNE; tahmin eden Oyuncu 1 bulur
    await page.locator('#secret').fill('iğne');
    await submit.click();
    await press(page, 'İĞNE');
    await expect(page.locator('#hm-result-title')).toContainText('Oyuncu 1 kelimeyi buldu');
    await expect(page.locator('#hm-result-title')).toContainText('İĞNE');
    await expect(page.locator('#duo-p1')).toHaveText('2');
    const s = await stored(page);
    expect(s.duo).toMatchObject({ p1: 2, p2: 0, round: 2 });
    // Gizli kelime hiçbir yerde saklanmadı
    const raw = await page.evaluate((k) => localStorage.getItem(k) || '', STORE);
    expect(raw).not.toContain('KALEM');
    expect(raw).not.toContain('İĞNE');
    // Tek kişilik moda dönüş çalışır
    await page.locator('#mode-single').click();
    await expect(page.locator('#score-single')).toBeVisible();
    await expect(page.locator('#single-setup')).toBeVisible();
    await expect(page.locator('#wrong-count')).toHaveText('Hata: 0 / 7');
    expect(external).toEqual([]);
  });

  test('360px genişlikte yatay taşma yok; klavye ve uzun kelime sığar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    let overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const keys = await page.locator('#keyboard .hm-key').evaluateAll((els) =>
      els.map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, w: r.width, h: r.height }; }));
    for (const k of keys) {
      expect(k.l).toBeGreaterThanOrEqual(0);
      expect(k.r).toBeLessThanOrEqual(360);
      expect(k.w).toBeGreaterThanOrEqual(22);
      expect(k.h).toBeGreaterThanOrEqual(44);
    }
    // 20 harflik iki kişilik kelime satıra sarar, taşmaz
    await page.locator('#mode-duo').click();
    await page.locator('#secret').fill('abcçdefgğhıijklmnoöp');
    await page.locator('#duo-start').click();
    await expect(page.locator('#word .hm-slot')).toHaveCount(20);
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const wordBox = await page.locator('#word').boundingBox();
    expect(wordBox!.x + wordBox!.width).toBeLessThanOrEqual(360);
    // Çizim ve bilgi alanı yan yana sığar, düğmeler dokunulabilir boyutta
    const hintBox = await page.locator('#hint').boundingBox();
    expect(hintBox!.height).toBeGreaterThanOrEqual(44);
    expect(hintBox!.x + hintBox!.width).toBeLessThanOrEqual(360);
    // Mobilde de oynanır
    await key(page, 'A').click();
    await expect(page.locator('#word .hm-slot').first()).toHaveText('A');
  });
});
