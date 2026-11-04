import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Beklenen çıktılar sql-formatter 15.9.0 (web/vendor/sql-formatter@15.9.0) ile sabitlendi.
const URL = '/sql-bicimlendir/';

async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('#tool')).toHaveAttribute('data-ready', '1');
}
const out = (page: Page) => page.locator('#output');
// Biçimlendirme Web Worker'da eşzamansız biter; satır sonları korunarak tam eşitlik beklenir.
const expectOut = (page: Page, text: string) =>
  expect.poll(() => out(page).textContent(), { timeout: 15_000 }).toBe(text);

test.describe('SQL Biçimlendirici', () => {
  test('bilinen değer: standart, büyük harf, 2 boşluk; indirme dosyası doğrulanır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await page.locator('#input').fill('select a,b from t where id=1');
    await page.locator('#btn-format').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result')).toBeVisible();
    await expectOut(page,'SELECT\n  a,\n  b\nFROM\n  t\nWHERE\n  id = 1');
    await expect(page.locator('#result-info')).toContainText('1 ifade');
    // renklendirme: anahtar kelimeler span ile işaretlenir, metin aynı kalır
    await expect(page.locator('#output .sq-kw').first()).toHaveText('SELECT');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('sorgu.sql');
    expect(readFileSync((await dl.path())!, 'utf8')).toBe('SELECT\n  a,\n  b\nFROM\n  t\nWHERE\n  id = 1\n');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('küçült: yorum ve fazla boşluk gider, dizeler ve tırnak içi ; korunur', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await page.locator('#input').fill('SELECT a -- yorum\nFROM t');
    await page.locator('#btn-minify').click();
    await expectOut(page,'SELECT a FROM t');
    await expect(page.locator('#result-title')).toHaveText('SQL küçültüldü');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('sorgu.min.sql');
    expect(readFileSync((await dl.path())!, 'utf8')).toBe('SELECT a FROM t\n');

    // tırnak içindeki ; ve -- bölünmez / silinmez; tek ifade kalır
    await page.locator('#input').fill("select 'a;b' from t");
    await page.locator('#btn-minify').click();
    await expectOut(page,"select 'a;b' from t");
    await expect(page.locator('#result-info')).toContainText('1 ifade');
    await page.locator('#btn-format').click();
    await expectOut(page,"SELECT\n  'a;b'\nFROM\n  t");
    await expect(page.locator('#result-info')).toContainText('1 ifade');

    // çok satırlı yorum + birden fazla ifade + tırnak içinde --
    await page.locator('#input').fill("/* çok\n   satırlı yorum */\nselect  x ,  y\nfrom t   where s = 'a -- b' ;\n-- ikinci\nselect ( 1 ) ;");
    await page.locator('#btn-minify').click();
    await expectOut(page,"select x,y from t where s = 'a -- b';select (1);");
    await expect(page.locator('#result-info')).toContainText('2 ifade');
    await page.locator('#btn-format').click();
    await expectOut(page,"/* çok\nsatırlı yorum */\nSELECT\n  x,\n  y\nFROM\n  t\nWHERE\n  s = 'a -- b';\n\n-- ikinci\nSELECT\n  (1);");
    await expect(page.locator('#result-info')).toContainText('2 ifade');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('lehçe kuralları: T-SQL köşeli parantez ve GO, MySQL # yorumu, PostgreSQL $$ dizesi', async ({ page }) => {
    await open(page);
    await page.locator('#opt-dialect').selectOption('transactsql');
    await page.locator('#input').fill('select [Sipariş Tarihi] -- not\nfrom [dbo].[t]\nGO\nselect 2');
    await page.locator('#btn-minify').click();
    await expectOut(page,'select [Sipariş Tarihi] from [dbo].[t]\nGO\nselect 2');

    await page.locator('#opt-dialect').selectOption('mysql');
    await page.locator('#input').fill("select `ad` # yorum\nfrom t where x = 'it\\'s; ok' and y = 5--1");
    await page.locator('#btn-minify').click();
    await expectOut(page,"select `ad` from t where x = 'it\\'s; ok' and y = 5--1");

    await page.locator('#opt-dialect').selectOption('postgresql');
    await page.locator('#input').fill('select $$a; -- b$$ /* x */ , $1');
    await page.locator('#btn-minify').click();
    await expectOut(page,'select $$a; -- b$$,$1');
    await page.locator('#btn-format').click();
    await expectOut(page,'SELECT\n  $$a; -- b$$ /* x */,\n  $1');
    await expect(page.locator('#output .sq-str').first()).toHaveText('$$a; -- b$$');
    await expect(page.locator('#output .sq-com').first()).toHaveText('/* x */');
  });

  test("ters bölü kaçışlı dize (Standart SQL, Snowflake) ve MySQL DELIMITER betiği bozulmaz", async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    // 'it\'s -- x' tek dizedir (kütüphane de ''-qq-bs ayrıştırır); kalanı yorum sanılıp sessizce silinmemeli.
    const bsq = "select 'it\\'s -- x' as a,\n  \"q\"\"r\" -- yorum\nfrom t";
    for (const d of ['sql', 'snowflake']) {
      await page.locator('#btn-clear').click(); // çıktı gizliyken lehçe değişimi otomatik yeniden çalıştırmaz
      await page.locator('#opt-dialect').selectOption(d);
      await page.locator('#input').fill(bsq);
      await page.locator('#btn-minify').click();
      await expectOut(page, "select 'it\\'s -- x' as a,\"q\"\"r\" from t");
      await page.locator('#btn-format').click();
      await expectOut(page, "SELECT\n  'it\\'s -- x' AS a,\n  \"q\"\"r\" -- yorum\nFROM\n  t");
      await expect(page.locator('#output .sq-str').first()).toHaveText("'it\\'s -- x'");
    }

    // MySQL DELIMITER: kütüphane tek başına "END //" ayracını "/ /" yapıp DELIMITER satırına yapıştırırdı.
    await page.locator('#btn-clear').click();
    await page.locator('#opt-dialect').selectOption('mysql');
    const proc = "DELIMITER //\nCREATE PROCEDURE p() BEGIN select 1; select 'a//b'; END //\nDELIMITER ;\ncall p();";
    await page.locator('#input').fill(proc);
    await page.locator('#btn-format').click();
    await expectOut(page, "DELIMITER //\nCREATE PROCEDURE p () BEGIN\nSELECT\n  1;\n\nSELECT\n  'a//b';\n\nEND //\n\nDELIMITER ;\nCALL p ();");
    await expect(page.locator('#result-info')).toContainText('2 ifade');
    await page.locator('#btn-minify').click();
    await expectOut(page, "DELIMITER //\nCREATE PROCEDURE p() BEGIN select 1;select 'a//b';END //\nDELIMITER ;\ncall p();");
    await expect(page.locator('#result-info')).toContainText('2 ifade');

    // satır yorumuyla biten ifadede ayraç yorumun içine düşmez, alt satıra yazılır
    await page.locator('#input').fill('DELIMITER $$\ncreate function g() returns int return 1 -- yorum\n$$\nDELIMITER ;');
    await page.locator('#btn-format').click();
    await expect.poll(() => out(page).textContent(), { timeout: 15_000 }).toContain('RETURN 1 -- yorum\n$$\n\nDELIMITER ;');

    // parçadaki ayrıştırma hatasının konumu tüm betiğe göre verilir
    await page.locator('#input').fill('select 1;\nDELIMITER //\nselect (( from //\nDELIMITER ;');
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toContainText('Satır 3, sütun 16');
    await expect(page.locator('#result')).toBeHidden();

    // başka lehçede DELIMITER varsa kullanıcı uyarılır
    await page.locator('#btn-clear').click();
    await page.locator('#opt-dialect').selectOption('sql');
    await page.locator('#input').fill(proc);
    await page.locator('#btn-minify').click();
    await expect(page.locator('#info')).toContainText('MySQL ya da MariaDB');
    expect(errors).toEqual([]);
  });

  test.describe('Türkçe yerel ayar', () => {
    test.use({ locale: 'tr-TR' });
    test("Türkçe adlar ve 'İ' içeren dize korunur; insert → INSERT (İNSERT değil)", async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await open(page);
      await page.locator('#input').fill("select * from kullanıcı where ad = 'İsmail'");
      await page.locator('#btn-format').click();
      // Ortam gerçekten Türkçe: yerel ayarlı büyütme burada 'İNSERT' üretirdi.
      expect(await page.evaluate(() => [navigator.language, 'insert'.toLocaleUpperCase('tr')])).toEqual(['tr-TR', 'İNSERT']);
      await expectOut(page, "SELECT\n  *\nFROM\n  kullanıcı\nWHERE\n  ad = 'İsmail'");
      await expect(page.locator('#output .sq-str')).toHaveText("'İsmail'");

      await page.locator('#input').fill("insert into şehir (ılçe, ad) values ('İğdır', 'ınsert')");
      await page.locator('#btn-format').click();
      await expectOut(page, "INSERT INTO\n  şehir (ılçe, ad)\nVALUES\n  ('İğdır', 'ınsert')");
      const t = (await out(page).textContent())!;
      expect(t).not.toContain('İNSERT');
      expect(t).not.toContain('İNTO');
      // küçük harf seçeneği de yerel ayardan bağımsız: SELECT → select (ı değil)
      await page.locator('#opt-case').selectOption('lower');
      await expect(out(page)).toContainText('insert into');
      expect(await out(page).textContent()).not.toContain('ınsert ınto');
      expect(errors).toEqual([]);
    });
  });

  test('seçenekler: lehçe, küçük harf, 4 boşluk, sekme, boş satır; değişince yeniden uygulanır; Ctrl+Enter', async ({ page }) => {
    await open(page);
    await page.locator('#input').fill('SELECT a FROM t; SELECT b FROM u');
    await page.locator('#input').press('Control+Enter');
    await expectOut(page,'SELECT\n  a\nFROM\n  t;\n\nSELECT\n  b\nFROM\n  u');
    await page.locator('#opt-dialect').selectOption('mysql');
    await page.locator('#opt-case').selectOption('lower');
    await page.locator('#opt-indent').selectOption('4');
    await page.locator('#opt-lines').selectOption('2');
    await expectOut(page, 'select\n    a\nfrom\n    t;\n\n\nselect\n    b\nfrom\n    u');
    await page.locator('#opt-indent').selectOption('tab');
    await page.locator('#opt-lines').selectOption('0');
    await page.locator('#opt-case').selectOption('preserve');
    await expectOut(page, 'SELECT\n\ta\nFROM\n\tt;\nSELECT\n\tb\nFROM\n\tu');
    // fonksiyon ve veri tipi adları onay kutusuna göre
    await page.locator('#opt-case').selectOption('upper');
    await page.locator('#opt-indent').selectOption('2');
    await page.locator('#input').fill('select count(*), cast(a as varchar(10)) from t');
    await page.locator('#btn-format').click();
    await expectOut(page,'SELECT\n  COUNT(*),\n  CAST(a AS VARCHAR(10))\nFROM\n  t');
    await page.locator('#opt-case-all').uncheck();
    await expectOut(page, 'SELECT\n  count(*),\n  cast(a AS varchar(10))\nFROM\n  t');
    // renklendirme kapatılınca düz metin
    await page.locator('#opt-hl').uncheck();
    await expect(page.locator('#output span')).toHaveCount(0);
    await expectOut(page,'SELECT\n  count(*),\n  cast(a AS varchar(10))\nFROM\n  t');
    // klavye: Ctrl+Shift+Enter küçültür
    await page.locator('#input').press('Control+Shift+Enter');
    await expectOut(page,'select count(*),cast(a as varchar(10)) from t');
  });

  test('hatalı giriş: ayrıştırılamayan sorgu, kapatılmamış tırnak/yorum, boş giriş — girdi korunur', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await page.locator('#btn-format').click();
    await expect(page.locator('#info')).toBeVisible();
    await expect(page.locator('#info')).toContainText('SQL yok');
    await expect(page.locator('#result')).toBeHidden();

    await page.locator('#input').fill('select (( from');
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Satır 1, sütun 15');
    await expect(page.locator('#error')).toContainText('parantez');
    await expect(page.locator('#error')).toContainText('lehçe');
    await expect(page.locator('#input')).toHaveValue('select (( from');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#info')).toBeHidden();

    await page.locator('#input').fill("select 'abc");
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toContainText('Satır 1, sütun 8');
    await expect(page.locator('#error')).toContainText('tırnak');
    await page.locator('#btn-minify').click();
    await expect(page.locator('#error')).toContainText('Kapatılmamış tırnak');
    await expect(page.locator('#input')).toHaveValue("select 'abc");
    const sel = await page.locator('#input').evaluate((el: HTMLTextAreaElement) => el.selectionStart);
    expect(sel).toBe(7);

    await page.locator('#input').fill('select 1 /* açık yorum');
    await page.locator('#btn-minify').click();
    await expect(page.locator('#error')).toContainText('Kapatılmamış çok satırlı yorum');

    await page.locator('#input').fill('-- yalnızca yorum\n/* başka */');
    await page.locator('#btn-minify').click();
    await expect(page.locator('#info')).toContainText('yorum ve boşluk dışında içerik');
    await expect(page.locator('#error')).toBeHidden();

    // biçimlendirme hatasından sonra düzeltilmiş sorgu çalışır
    await page.locator('#input').fill('select 1');
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toBeHidden();
    await expectOut(page,'SELECT\n  1');
    expect(errors).toEqual([]);
  });

  test('.sql dosyası (FileReader): UTF-8, Windows-1254 ve ikili dosya', async ({ page }) => {
    await open(page);
    const fileInput = page.locator('#drop input[type=file]');
    await fileInput.setInputFiles({ name: 'rapor.sql', mimeType: 'application/sql', buffer: Buffer.from('﻿select şehir from müşteri', 'utf8') });
    await expect(page.locator('#input')).toHaveValue('select şehir from müşteri');
    await expect(page.locator('#file-name')).toContainText('rapor.sql');
    await page.locator('#btn-format').click();
    await expectOut(page,'SELECT\n  şehir\nFROM\n  müşteri');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('rapor.sql');

    // Windows-1254: ş=0xFE, ü=0xFC
    const legacy = Buffer.from([0x73, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x20, 0xFE, 0x65, 0x68, 0x69, 0x72, 0x20, 0x66, 0x72, 0x6f, 0x6d, 0x20, 0x6d, 0xFC]);
    await fileInput.setInputFiles({ name: 'eski.sql', mimeType: 'application/sql', buffer: legacy });
    await expect(page.locator('#input')).toHaveValue('select şehir from mü');
    await expect(page.locator('#info')).toContainText('Windows-1254');

    // ikili dosya: hata, kutudaki metin değişmez
    await fileInput.setInputFiles({ name: 'yedek.bak', mimeType: 'application/octet-stream', buffer: Buffer.from([0x54, 0x41, 0x50, 0x45, 0x00, 0x01, 0x02, 0x00, 0xff]) });
    await expect(page.locator('#error')).toContainText('ikili veri');
    await expect(page.locator('#error')).toContainText('.sql');
    await expect(page.locator('#input')).toHaveValue('select şehir from mü');
  });

  test('büyük girdi işçide biçimlenir; ilerleme, ifade sayısı ve renklendirme sınırı', async ({ page }) => {
    await open(page);
    const big = "select a, b, c from t where x = 1 and y = 'z';\n".repeat(6000);
    await page.locator('#input').evaluate((el: HTMLTextAreaElement, v: string) => { el.value = v; }, big);
    await page.locator('#btn-format').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/, { timeout: 30_000 });
    await expect(page.locator('#result-info')).toContainText('6.000 ifade');
    await expect(page.locator('#result-info')).toContainText('renklendirme kapatıldı');
    await expect(page.locator('#output span')).toHaveCount(0);
    const text = (await out(page).textContent())!;
    expect(text.startsWith('SELECT\n  a,\n  b,\n  c\nFROM\n  t\nWHERE\n  x = 1\n  AND y = \'z\';\n\nSELECT')).toBe(true);
    await page.locator('#btn-minify').click();
    await expect(page.locator('#result-title')).toHaveText('SQL küçültüldü');
    await expect(page.locator('#result-info')).toContainText('6.000 ifade');
  });

  test('uzun biçimlendirme iptal edilebilir; girdi korunur ve araç yeniden çalışır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    const big = "select a, b, c from t where x = 1 and y = 'z';\n".repeat(40000);
    await page.locator('#input').evaluate((el: HTMLTextAreaElement, v: string) => { el.value = v; }, big);
    await page.locator('#btn-format').click();
    await expect(page.locator('#progress')).toHaveClass(/is-active/);
    await page.locator('#btn-cancel').click();
    await expect(page.locator('#info')).toContainText('iptal edildi');
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#btn-cancel')).toBeHidden();
    expect(await page.locator('#input').evaluate((el: HTMLTextAreaElement) => el.value.length)).toBe(big.length);
    // Not: Playwright fill() 2 MB'lık textarea'da Chromium düzenleme komutu yüzünden çok yavaş; değer doğrudan atanır.
    await page.locator('#input').evaluate((el: HTMLTextAreaElement) => { el.value = 'select 1'; });
    await page.locator('#btn-format').click();
    await expectOut(page, 'SELECT\n  1');
    expect(errors).toEqual([]);
  });

  test('kopyala düğmesi panoya düz metni yazar', async ({ page }) => {
    // Paylaşılan işletim sistemi panosuna dokunmamak için pano API'si sayfa içinde yakalanır.
    await page.addInitScript(() => {
      (window as any).__clip = null;
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (t: string) => { (window as any).__clip = t; } },
      });
    });
    await open(page);
    // çıktı yokken kopyala/indir düğmeleri görünmez
    await expect(page.locator('#btn-copy')).toBeHidden();
    await expect(page.locator('#btn-download')).toBeHidden();
    await page.locator('#input').fill('select a from t');
    await page.locator('#btn-format').click();
    await expectOut(page, 'SELECT\n  a\nFROM\n  t');
    await page.locator('#btn-copy').click();
    await expect(page.locator('#copied')).toHaveText('Kopyalandı');
    expect(await page.evaluate(() => (window as any).__clip)).toBe('SELECT\n  a\nFROM\n  t');
    await expect(page.locator('#error')).toBeHidden();
  });

  test('içerik: ≥900 kelime, SSS ≥7, 3 reklam (araç kutusunda yok), JSON-LD, canonical, meta.json', async ({ page }) => {
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="sql-bicimlendir-${s}"]`)).toHaveCount(1);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    await expect(page.locator('.ba-tool + .ba-ad[data-slot="sql-bicimlendir-a"]')).toHaveCount(1);
    const lds = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((s) => JSON.parse(s));
    expect(lds.map((l) => l['@type'])).toEqual(['SoftwareApplication', 'FAQPage']);
    expect(lds[1].mainEntity.length).toBe(await page.locator('.ba-faq details').count());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://araclar.bilisimajans.com/sql-bicimlendir/');
    await expect(page.locator('h1')).toContainText('SQL Biçimlendirici');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-content a[href="../json-bicimlendir/"]')).toHaveCount(1);
    await expect(page.locator('.ba-content a[href="../regex-test/"]')).toHaveCount(1);
    const meta = JSON.parse(readFileSync(join(__dirname, '..', 'web', 'sql-bicimlendir', 'meta.json'), 'utf8'));
    expect(meta.category).toBe('dosya');
    expect(meta.vendor[0]).toEqual({ pkg: 'sql-formatter', version: '15.9.0', license: 'MIT' });
    expect(meta.icon).toContain('<');
    // vendor dosyası ve lisansı yerinde
    const lic = readFileSync(join(__dirname, '..', 'web', 'vendor', 'sql-formatter@15.9.0', 'LICENSE'), 'utf8');
    expect(lic).toContain('MIT License');
    // innerHTML ile kullanıcı girdisi basılmaz: HTML benzeri girdi metin olarak kalır
    await page.locator('#input').fill("select '<img src=x onerror=alert(1)>' as x");
    await page.locator('#btn-format').click();
    await expect(page.locator('#output img')).toHaveCount(0);
    await expect(page.locator('#output')).toContainText('<img src=x onerror=alert(1)>');
  });

  test('360px genişlikte uzun tek satırlık çıktı ve hata açıkken yatay taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const long = 'select ' + Array.from({ length: 60 }, (_, i) => `cok_uzun_sutun_adi_${i}`).join(', ') + " from t where u = 'https://ornek.com/" + 'x'.repeat(200) + "'";
    await page.locator('#input').fill(long);
    await page.locator('#btn-minify').click();
    await expect(page.locator('#result')).toBeVisible();
    let overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.locator('#btn-format').click();
    await page.locator('#input').fill("select '" + 'y'.repeat(300));
    await page.locator('#btn-format').click();
    await expect(page.locator('#error')).toBeVisible();
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // klavye: dosya alanı odaklanabilir
    await page.locator('#drop').focus();
    await expect(page.locator('#drop')).toBeFocused();
  });
});
