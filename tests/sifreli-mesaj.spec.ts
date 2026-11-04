import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const pick = (page: Page, value: string) => page.locator(`label.sm-chip:has(input[value="${value}"])`).click();
const setMode = (page: Page, value: 'sifrele' | 'coz') => page.locator(`label.sm-chip:has(input[name="mod"][value="${value}"])`).click();

test.describe('Şifreli Mesaj Oluşturucu ve Çözücü', () => {
  test('Sezar +3 (Türk alfabesi): MERHABA → ÖĞTJÇDÇ ve geri çözüm; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/sifreli-mesaj/');
    await expect(page.locator('input[name="yontem"][value="caesar"]')).toBeChecked();
    await page.locator('#opt-alfabe').selectOption('tr');
    await page.locator('#opt-kaydirma').fill('3');
    await page.locator('#girdi').fill('MERHABA');
    await expect(page.locator('#cikti')).toHaveValue('ÖĞTJÇDÇ');
    // Çöz yönünde aynı şifreli metin düz metne döner
    await setMode(page, 'coz');
    await page.locator('#girdi').fill('ÖĞTJÇDÇ');
    await expect(page.locator('#cikti')).toHaveValue('MERHABA');
    // Gidiş-dönüş: sonucu girişe taşı yönü çevirir
    await setMode(page, 'sifrele');
    await page.locator('#girdi').fill('Merhaba dünya, 2026!');
    const enc = await page.locator('#cikti').inputValue();
    expect(enc).toBe('Öğtjçdç gzpbç, 2026!');
    await page.locator('#tasi').click();
    await expect(page.locator('input[name="mod"][value="coz"]')).toBeChecked();
    await expect(page.locator('#cikti')).toHaveValue('Merhaba dünya, 2026!');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Sezar: ı/i ve İ/I ayrımı, Q-W-X uyarısı, İngiliz alfabesi ve sadeleştirme', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await page.locator('#girdi').fill('ıİ qwx');
    await expect(page.locator('#cikti')).toHaveValue('kL qwx');
    await expect(page.locator('#uyari')).toBeVisible();
    await expect(page.locator('#uyari')).toContainText('Q, W, X');
    await page.locator('#opt-alfabe').selectOption('en');
    await page.locator('#girdi').fill('MERHABA');
    await expect(page.locator('#cikti')).toHaveValue('PHUKDED');
    await expect(page.locator('#uyari')).toBeHidden();
    // Türkçe harf İngiliz alfabesinde atlanır ve uyarı verilir; sadeleştirme kutusu bunu çözer
    await page.locator('#girdi').fill('Çay');
    await expect(page.locator('#cikti')).toHaveValue('Çdb');
    await expect(page.locator('#uyari')).toContainText('Ç');
    await page.locator('#opt-sade').check();
    await expect(page.locator('#cikti')).toHaveValue('Fdb');
    // Kaydırma alfabe uzunluğuna eşitse metin değişmez ve açıklanır
    await page.locator('#opt-sade').uncheck();
    await page.locator('#opt-kaydirma').fill('26');
    await page.locator('#girdi').fill('abc');
    await expect(page.locator('#cikti')).toHaveValue('abc');
    await expect(page.locator('#uyari')).toContainText('değişmedi');
  });

  test('Sezar: tüm kaydırmaları dene listesi 28 satır, doğru satıra tıklayınca çözülür', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await page.locator('#girdi').fill('ÖĞTJÇDÇ');
    await expect(page.locator('#bf-list')).toBeHidden();
    await page.locator('#bf-btn').click();
    await expect(page.locator('.sm-bfrow')).toHaveCount(28);
    await expect(page.locator('.sm-bfrow[data-k="3"]')).toContainText('MERHABA');
    await page.locator('.sm-bfrow[data-k="3"]').click();
    await expect(page.locator('#opt-kaydirma')).toHaveValue('3');
    await expect(page.locator('input[name="mod"][value="coz"]')).toBeChecked();
    await expect(page.locator('#cikti')).toHaveValue('MERHABA');
    // İngiliz alfabesinde 25 satır
    await page.locator('#opt-alfabe').selectOption('en');
    await page.locator('#bf-btn').click();
    await expect(page.locator('.sm-bfrow')).toHaveCount(25);
    // Boş girişte çözüm öneren hata
    await page.locator('#girdi').fill('');
    await page.locator('#bf-btn').click();
    await expect(page.locator('#error')).toContainText('şifreli mesajı');
  });

  test('Mors: SOS → "... --- ...", geri çözüm, hatalı giriş ve Türkçe harf notu', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'morse');
    await expect(page.locator('#morse-panel')).toBeVisible();
    await expect(page.locator('#bf')).toBeHidden();
    await page.locator('#girdi').fill('SOS');
    await expect(page.locator('#cikti')).toHaveValue('... --- ...');
    await page.locator('#girdi').fill('Merhaba dünya');
    await expect(page.locator('#cikti')).toHaveValue('-- . .-. .... .- -... .- / -.. ..- -. -.-- .-');
    await expect(page.locator('#uyari')).toContainText('ASCII');
    await setMode(page, 'coz');
    await page.locator('#girdi').fill('... --- ... / -- . .-. .... .- -... .-');
    await expect(page.locator('#cikti')).toHaveValue('SOS MERHABA');
    // Tanınmayan kod
    await page.locator('#girdi').fill('......... --- ...');
    await expect(page.locator('#cikti')).toHaveValue('?OS');
    await expect(page.locator('#uyari')).toContainText('Tanınmayan');
    // Harf içeren giriş Türkçe, çözüm öneren hata verir
    await page.locator('#girdi').fill('abc');
    await expect(page.locator('#error')).toContainText('yalnızca nokta');
    await expect(page.locator('#error')).toContainText('Şifrele');
  });

  test('Mors oynatıcı: SOS için ışık 9 kez yanar ve oynatma biter', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'morse');
    await page.locator('#girdi').fill('SOS');
    await page.locator('#morse-hiz').fill('25');
    await page.locator('#morse-ton').fill('700');
    await expect(page.locator('#morse-dur')).toBeDisabled();
    await page.locator('#morse-cal').click();
    await expect(page.locator('#morse-durum')).toContainText('Oynatılıyor');
    await expect(page.locator('#morse-cal')).toBeDisabled();
    await expect(page.locator('#morse-durum')).toHaveText('Bitti.', { timeout: 10_000 });
    await expect(page.locator('#lamp')).toHaveAttribute('data-flashes', '9');
    await expect(page.locator('#lamp')).not.toHaveClass(/is-on/);
    await expect(page.locator('#morse-cal')).toBeEnabled();
    // Durdurma
    await page.locator('#girdi').fill('SOS SOS SOS');
    await page.locator('#morse-cal').click();
    await page.locator('#morse-dur').click();
    await expect(page.locator('#morse-durum')).toHaveText('Durduruldu.');
    // Boş kodda çalınmaz, açıklayıcı hata verir
    await page.locator('#girdi').fill('');
    await page.locator('#morse-cal').click();
    await expect(page.locator('#error')).toContainText('Çalınacak Mors kodu yok');
  });

  test('Vigenère: gidiş-dönüş, bilinen test vektörü ve boş anahtar hatası', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'vigenere');
    await expect(page.locator('#opt-anahtar')).toBeVisible();
    await expect(page.locator('#opt-kaydirma')).toBeHidden();
    await page.locator('#girdi').fill('MERHABA');
    await expect(page.locator('#cikti')).toHaveValue('MSRÖTBR'); // anahtar ANAHTAR, Türk alfabesi
    await page.locator('#girdi').fill('Merhaba dünya, hoş geldiniz!');
    const enc = await page.locator('#cikti').inputValue();
    expect(enc).not.toBe('Merhaba dünya, hoş geldiniz!');
    await page.locator('#tasi').click();
    await expect(page.locator('#cikti')).toHaveValue('Merhaba dünya, hoş geldiniz!');
    // Bilinen vektör (İngiliz alfabesi): ATTACKATDAWN + LEMON → LXFOPVEFRNHR
    await setMode(page, 'sifrele');
    await page.locator('#opt-alfabe').selectOption('en');
    await page.locator('#opt-anahtar').fill('lemon');
    await page.locator('#girdi').fill('ATTACKATDAWN');
    await expect(page.locator('#cikti')).toHaveValue('LXFOPVEFRNHR');
    // Anahtar harf içermiyorsa
    await page.locator('#opt-anahtar').fill('123 !');
    await expect(page.locator('#error')).toContainText('en az bir harf');
    await expect(page.locator('#cikti')).toHaveValue('');
  });

  test('ROT13 ve Atbash kendi tersidir', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'rot13');
    await expect(page.locator('#mod-ipucu')).toContainText('kendi tersidir');
    await page.locator('#girdi').fill('Hello World');
    await expect(page.locator('#cikti')).toHaveValue('Uryyb Jbeyq');
    await page.locator('#tasi').click();
    await expect(page.locator('#cikti')).toHaveValue('Hello World');
    await pick(page, 'atbash');
    await page.locator('#girdi').fill('MERHABA');
    await expect(page.locator('#cikti')).toHaveValue('KTĞPZYZ'); // Türk alfabesi
    await page.locator('#opt-alfabe').selectOption('en');
    await page.locator('#girdi').fill('ABC xyz');
    await expect(page.locator('#cikti')).toHaveValue('ZYX cba');
  });

  test('ikili, onaltılık ve Base64: kodla, çöz, UTF-8 ve hata mesajları', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'binary');
    await expect(page.locator('#options')).toBeHidden();
    await page.locator('#girdi').fill('A');
    await expect(page.locator('#cikti')).toHaveValue('01000001');
    await page.locator('#girdi').fill('ş');
    await expect(page.locator('#cikti')).toHaveValue('11000101 10011111');
    await setMode(page, 'coz');
    await page.locator('#girdi').fill('01001101 01100101 01110010 01101000 01100001 01100010 01100001');
    await expect(page.locator('#cikti')).toHaveValue('Merhaba');
    await page.locator('#girdi').fill('0101');
    await expect(page.locator('#error')).toContainText('8 bitlik');
    await page.locator('#girdi').fill('0102');
    await expect(page.locator('#error')).toContainText('yalnızca 0 ve 1');

    await pick(page, 'hex');
    await page.locator('#girdi').fill('4D 65 72 68 61 62 61');
    await expect(page.locator('#cikti')).toHaveValue('Merhaba');
    await page.locator('#girdi').fill('4D6');
    await expect(page.locator('#error')).toContainText('çift sayıda');
    await setMode(page, 'sifrele');
    await page.locator('#girdi').fill('Türkçe');
    await expect(page.locator('#cikti')).toHaveValue('54 C3 BC 72 6B C3 A7 65');

    await pick(page, 'base64');
    await expect(page.locator('[data-desc="base64"] a[href="../base64-donustur/"]')).toBeVisible();
    await page.locator('#girdi').fill('Merhaba');
    await expect(page.locator('#cikti')).toHaveValue('TWVyaGFiYQ==');
    await setMode(page, 'coz');
    await page.locator('#girdi').fill('TWVyaGFiYSBkw7xueWE=');
    await expect(page.locator('#cikti')).toHaveValue('Merhaba dünya');
    await page.locator('#girdi').fill('***');
    await expect(page.locator('#error')).toContainText('Geçersiz Base64');
  });

  test('A1Z26 ve ters çevirme', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'a1z26');
    await page.locator('#girdi').fill('MERHABA DÜNYA');
    await expect(page.locator('#cikti')).toHaveValue('16-6-21-10-1-2-1 5-26-17-28-1'); // DÜNYA: D=5, Ü=26, N=17, Y=28, A=1
    await setMode(page, 'coz');
    await page.locator('#girdi').fill('16-6-21-10-1-2-1');
    await expect(page.locator('#cikti')).toHaveValue('MERHABA');
    await page.locator('#girdi').fill('1-40');
    await expect(page.locator('#cikti')).toHaveValue('A?');
    await expect(page.locator('#uyari')).toContainText('29');
    await setMode(page, 'sifrele');

    await pick(page, 'reverse');
    await page.locator('#girdi').fill('Merhaba dünya');
    await expect(page.locator('#cikti')).toHaveValue('aynüd abahreM');
    await page.locator('#opt-ters').selectOption('kelime');
    await expect(page.locator('#cikti')).toHaveValue('abahreM aynüd');
    await page.locator('#opt-ters').selectOption('sira');
    await expect(page.locator('#cikti')).toHaveValue('dünya Merhaba');
  });

  test('anahtar tablosu: rastgele anahtar, gidiş-dönüş ve geçersiz anahtar hataları', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'custom');
    const key1 = await page.locator('#opt-ozel').inputValue();
    expect(Array.from(key1)).toHaveLength(29);
    expect(new Set(Array.from(key1)).size).toBe(29);
    await expect(page.locator('#ozel-tablo span')).toHaveCount(29);
    await page.locator('#girdi').fill('Merhaba dünya, bu bir gizli mesajdır.');
    const enc = await page.locator('#cikti').inputValue();
    expect(enc).not.toBe('Merhaba dünya, bu bir gizli mesajdır.');
    expect(enc.length).toBe('Merhaba dünya, bu bir gizli mesajdır.'.length);
    await page.locator('#tasi').click();
    await expect(page.locator('#cikti')).toHaveValue('Merhaba dünya, bu bir gizli mesajdır.');
    await setMode(page, 'sifrele');
    // Yeni anahtar farklı üretilir
    await page.locator('#ozel-uret').click();
    const key2 = await page.locator('#opt-ozel').inputValue();
    expect(key2).not.toBe(key1);
    // Yinelenen harf
    await page.locator('#opt-ozel').fill('ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYY');
    await expect(page.locator('#error')).toContainText('tekrar eden harf');
    await expect(page.locator('#error')).toContainText('Y');
    // Eksik uzunluk
    await page.locator('#opt-ozel').fill('ABC');
    await expect(page.locator('#error')).toContainText('29 benzersiz harf');
    // Alfabede olmayan karakter
    await page.locator('#opt-ozel').fill('ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVY1');
    await expect(page.locator('#error')).toContainText('alfabede olmayan');
    // İngiliz alfabesinde 26 harflik yeni anahtar üretilir
    await page.locator('#opt-alfabe').selectOption('en');
    const key3 = await page.locator('#opt-ozel').inputValue();
    expect(Array.from(key3)).toHaveLength(26);
    await expect(page.locator('#error')).toBeHidden();
  });

  test('klavye: ok tuşlarıyla yöntem değişir; kopyala çalışır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/sifreli-mesaj/');
    await page.locator('input[name="yontem"][value="caesar"]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('input[name="yontem"][value="vigenere"]')).toBeChecked();
    await expect(page.locator('#opt-anahtar')).toBeVisible();
    await expect(page.locator('#kopyala')).toBeDisabled();
    await page.locator('#girdi').fill('MERHABA');
    await expect(page.locator('#kopyala')).toBeEnabled();
    await page.locator('#kopyala').click();
    await expect(page.locator('#durum')).toContainText('panoya kopyalandı');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('MSRÖTBR');
  });

  test('örnek metin düğmesi ve temizle; boş girişte hata yok', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#cikti')).toHaveValue('');
    await pick(page, 'morse');
    await page.locator('#ornek').click();
    await expect(page.locator('#girdi')).toHaveValue('SOS');
    await expect(page.locator('#cikti')).toHaveValue('... --- ...');
    await page.locator('#temizle').click();
    await expect(page.locator('#girdi')).toHaveValue('');
    await expect(page.locator('#cikti')).toHaveValue('');
  });

  test('çok uzun metin Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await page.locator('#girdi').fill('a'.repeat(200_001));
    await expect(page.locator('#error')).toContainText('çok uzun');
    await expect(page.locator('#error')).toContainText('parçalara bölün');
  });

  test('360 px genişlikte yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/sifreli-mesaj/');
    await pick(page, 'morse');
    await page.locator('#girdi').fill('Merhaba dünya, bu bir deneme mesajıdır');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await pick(page, 'caesar');
    await page.locator('#girdi').fill('ÖĞTJÇDÇ ' + 'x'.repeat(60));
    await page.locator('#bf-btn').click();
    const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow2).toBeLessThanOrEqual(0);
  });

  test('içerik: eğitim notu araç kutusunda, ≥900 kelime, 3 reklam, ≥7 SSS, JSON-LD', async ({ page }) => {
    await page.goto('/sifreli-mesaj/');
    await expect(page.locator('.ba-tool')).toContainText('Gerçek güvenlik için bu yöntemler kullanılmaz');
    await expect(page.locator('.ba-tool')).toContainText('eğitim ve eğlence amaçlıdır');
    const text = await page.locator('.ba-content').innerText();
    expect(text.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(900);
    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => e.getAttribute('data-slot')));
    expect(slots).toEqual(['sifreli-mesaj-a', 'sifreli-mesaj-b', 'sifreli-mesaj-c']);
    expect(await page.locator('.ba-tool + .ba-ad[data-slot="sifreli-mesaj-a"]').count()).toBe(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    await expect(page.locator('h1')).toContainText('Şifreli Mesaj');
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.length).toBe(2);
    ld.forEach((j) => JSON.parse(j));
    // Bağlantılı araçlar
    for (const href of ['../base64-donustur/', '../sayi-tabani-donustur/', '../sifre-uret/', '../sifre-guc-test/']) {
      await expect(page.locator(`.ba-related a[href="${href}"]`)).toHaveCount(1);
    }
  });
});
