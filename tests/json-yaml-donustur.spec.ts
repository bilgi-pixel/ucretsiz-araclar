import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';
import { readFileSync } from 'node:fs';

const URL = '/json-yaml-donustur/';

async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('html')).toHaveAttribute('data-jy-ready', '1');
}

async function convert(page: Page, text: string) {
  await page.locator('#input').fill(text);
  await page.locator('#btn-convert').click();
}

const out = (page: Page) => page.locator('#output').evaluate((el) => el.textContent as string);

/** 5 MB üstü, tek satırlık JSON dizisi (60 000 kayıt). */
function bigJson() {
  const row = JSON.stringify({ ad: 'Ayşe Yılmaz', şehir: 'Diyarbakır', not: 'x'.repeat(60) });
  const big = Buffer.from(`[${Array(60000).fill(row).join(',')}]`, 'utf8');
  expect(big.length).toBeGreaterThan(5 * 1024 * 1024);
  return big;
}

test.describe('JSON YAML Dönüştürücü', () => {
  test('JSON → YAML bilinen değer, indirme .yaml, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await convert(page, '{"ad":"Ayşe","yas":30,"etiketler":["a","b"]}');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    expect(await out(page)).toBe('ad: Ayşe\nyas: 30\netiketler:\n  - a\n  - b\n');
    await expect(page.locator('#result-info')).toContainText('JSON → YAML');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('veri.yaml');
    expect(readFileSync((await dl.path())!, 'utf8')).toBe('ad: Ayşe\nyas: 30\netiketler:\n  - a\n  - b\n');
    // JSON.parse 1e400'ü Infinity yapar; YAML'a .inf yazıldığı sessiz geçilmez.
    await convert(page, '{"x":1e400}');
    expect(await out(page)).toBe('x: .inf\n');
    await expect(page.locator('#result-notes')).toContainText('.inf');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('YAML → JSON: akış dizisi, çoklu belge → dizi, küçültme ve .json indirme', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await page.locator('#mode-y2j').check();
    await expect(page.locator('#in-label')).toHaveText('YAML girişi');
    await convert(page, 'a: 1\nb: [x, y]');
    expect(JSON.parse(await out(page))).toEqual({ a: 1, b: ['x', 'y'] });
    expect(await out(page)).toBe('{\n  "a": 1,\n  "b": [\n    "x",\n    "y"\n  ]\n}');

    await convert(page, 'a: 1\n---\nb: 2');
    expect(JSON.parse(await out(page))).toEqual([{ a: 1 }, { b: 2 }]);
    await expect(page.locator('#result-info')).toContainText('2 belge');
    // Seçenek değişince çıktı kendiliğinden yenilenir.
    await page.locator('#opt-minify').check();
    await expect.poll(() => out(page)).toBe('[{"a":1},{"b":2}]');
    // Sondaki boş belge atlanır, tek belge dizi olmaz.
    await convert(page, 'a: 1\n---\n');
    expect(await out(page)).toBe('{"a":1}');
    await expect(page.locator('#result-notes')).toContainText('boş belge');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('veri.json');
    expect(JSON.parse(readFileSync((await dl.path())!, 'utf8'))).toEqual({ a: 1 });
    // Açıkça null / ~ yazılmış belge boş sayılmaz; yalnızca içeriksiz (--- ya da yorum) belge atlanır.
    await convert(page, '---\nnull\n---\na: 1\n---\n~\n---\n# yorum\n');
    expect(await out(page)).toBe('[null,{"a":1},null]');
    await expect(page.locator('#result-notes')).toContainText('1 boş belge');
    await convert(page, 'null');
    expect(await out(page)).toBe('null');
    await expect(page.locator('#result-notes')).toBeHidden();
    expect(errors).toEqual([]);
  });

  test('hatalı giriş: geçersiz JSON ve YAML satır/sütunlu Türkçe hata, boş giriş bilgi mesajı', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    // Boş giriş → hata değil bilgi
    await page.locator('#btn-convert').click();
    await expect(page.locator('#info')).toBeVisible();
    await expect(page.locator('#info')).toContainText('Giriş boş');
    await expect(page.locator('#error')).toBeHidden();

    // '{a:1' JSON → hata, konum, imleç
    await convert(page, '{a:1');
    await expect(page.locator('#error')).toContainText('Geçersiz JSON — satır 1, sütun 2');
    await expect(page.locator('#error')).toContainText('çift tırnak');
    await expect(page.locator('#error-snippet')).toBeVisible();
    await expect(page.locator('#result')).toBeHidden();
    expect(await page.locator('#input').evaluate((el: HTMLTextAreaElement) => el.selectionStart)).toBe(1);

    // { ile başlayan yazım hatalı JSON'da yön önerisi verilmez, yalnızca JSON hatası gösterilir
    await convert(page, '{"a":1,}');
    await expect(page.locator('#error')).toContainText('fazladan virgül');
    await expect(page.locator('#error')).not.toContainText('YAML gibi görünüyor');

    // JSON yönünde YAML yapıştırılırsa yön önerisi; "Yönü değiştir" aynı girişi YAML olarak çevirir
    await convert(page, 'ad: Ayşe\nyas: 30');
    await expect(page.locator('#error')).toContainText('YAML gibi görünüyor');
    await page.locator('#btn-swap').click();
    await expect(page.locator('#mode-y2j')).toBeChecked();
    await expect(page.locator('#error')).toBeHidden();
    expect(JSON.parse(await out(page))).toEqual({ ad: 'Ayşe', yas: 30 });

    // Geçersiz YAML → js-yaml konumu (mark.line + 1)
    await page.locator('#mode-y2j').check();
    await convert(page, 'a: 1\n b: 2\nc: [');
    await expect(page.locator('#error')).toContainText('Geçersiz YAML — satır 2, sütun 3');
    await expect(page.locator('#error')).toContainText('Girinti');
    await convert(page, 'a: 1\na: 2');
    await expect(page.locator('#error')).toContainText('satır 2');
    await expect(page.locator('#error')).toContainText('iki kez');
    await convert(page, 'a:\n\t- b');
    await expect(page.locator('#error')).toContainText('sekme');
    await convert(page, 'a: [1, 2');
    await expect(page.locator('#error')).toContainText('satır 1, sütun 9');
    await expect(page.locator('#error')).toContainText('kapatılmamış');
    // Güvensiz etiketler reddedilir
    await convert(page, 'f: !!js/function "function () { return 1 }"');
    await expect(page.locator('#error')).toContainText('Desteklenmeyen etiket');
    await convert(page, 'o: !!python/object:os.system x');
    await expect(page.locator('#error')).toContainText('Desteklenmeyen etiket');
    // Takma ad şişirmesi ve döngü
    const bomb = ['a: &a [x, x, x, x, x, x, x, x, x]']
      .concat('bcdefgh'.split('').map((c, i) => `${c}: &${c} [${Array(9).fill('*' + 'abcdefgh'[i]).join(', ')}]`)).join('\n');
    await convert(page, bomb);
    await expect(page.locator('#error')).toContainText('milyar gülüş');
    await convert(page, 'a: &x\n  b: *x');
    await expect(page.locator('#error')).toContainText('döngüsel');
    expect(errors).toEqual([]);
  });

  test('gidiş-dönüş, Türkçe karakterler, yes/no, baştaki sıfır ve tarih davranışı', async ({ page }) => {
    await open(page);
    const original = { şehir: 'Diyarbakır', ılık: 'ğüşöçİı', y: 'yes', no: 'off', k: '0123', d: '2026-01-01', n: null, b: true, f: 1.5, e: '', s: 'a: b # c', nested: { 'a b': [1, { c: [] }, {}] } };
    await convert(page, JSON.stringify(original));
    const y = await out(page);
    expect(y).toContain('şehir: Diyarbakır');
    // 'y' ve 'no' YAML 1.1 okuyucularında mantıksal sayılabileceği için anahtar da tırnaklanır.
    expect(y).toContain("'y': 'yes'");
    expect(y).toContain("'no': 'off'");
    expect(y).toContain("k: '0123'");
    expect(y).toContain("d: '2026-01-01'");
    // Yönü değiştir: çıktı girişe geçer ve ters yönde dönüştürülür
    await page.locator('#btn-swap').click();
    await expect(page.locator('#mode-y2j')).toBeChecked();
    expect(await page.locator('#input').inputValue()).toBe(y);
    expect(JSON.parse(await out(page))).toEqual(original);

    // YAML 1.2: yes/no/on/off metin kalır, tırnaksız 0123 → 123, tarih varsayılan olarak metin
    await convert(page, 'a: yes\nb: no\nc: on\nd: off\ne: True\nz: 0123\nt: 2026-01-01\nh: 0x1F\nö: .inf');
    expect(JSON.parse(await out(page))).toEqual({ a: 'yes', b: 'no', c: 'on', d: 'off', e: true, z: 123, t: '2026-01-01', h: 31, ö: null });
    await expect(page.locator('#result-notes')).toContainText('.inf');
    await page.locator('#opt-dates').uncheck();
    await expect.poll(async () => JSON.parse(await out(page)).t).toBe('2026-01-01T00:00:00.000Z');
    await expect(page.locator('#result-notes')).toContainText('ISO 8601');
    // Tarih anahtarı da yerel saat dilimine bağlı "Thu Jan 01 …" metni değil, ISO 8601 olur.
    await convert(page, '2026-01-01: yılbaşı');
    expect(JSON.parse(await out(page))).toEqual({ '2026-01-01T00:00:00.000Z': 'yılbaşı' });
  });

  test('seçenekler: 4 boşluk, Türkçe sıralama, satır genişliği, belgelere bölme, kopyala', async ({ page }) => {
    // Sistem panosu paralel testlerde paylaşılır; yazılan metni sayfa içinde yakala.
    await page.addInitScript(() => {
      const w = window as unknown as { __copied?: string };
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (t: string) => { w.__copied = t; } } });
    });
    await open(page);
    await page.locator('#opt-indent').selectOption('4');
    await page.locator('#opt-sort').check();
    await convert(page, '{"z":1,"ç":2,"c":3,"ı":{"b":[1],"a":2}}');
    expect(await out(page)).toBe('c: 3\nç: 2\nı:\n    a: 2\n    b:\n        - 1\nz: 1\n');
    await page.locator('#opt-sort').uncheck();
    await page.locator('#opt-indent').selectOption('2');
    const long = 'kelime '.repeat(30).trim();
    await convert(page, JSON.stringify({ t: long }));
    expect(await out(page)).toBe(`t: ${long}\n`);
    await page.locator('#opt-width').selectOption('80');
    await expect.poll(() => out(page)).toContain('t: >-\n');
    await page.locator('#opt-split').check();
    await convert(page, '[{"kind":"Service"},{"kind":"Deployment"}]');
    expect(await out(page)).toBe('kind: Service\n---\nkind: Deployment\n');
    await expect(page.locator('#result-info')).toContainText('2 belge');
    await page.locator('#btn-copy').click();
    await expect(page.locator('#copied')).toHaveText('Kopyalandı');
    expect(await page.evaluate(() => (window as unknown as { __copied?: string }).__copied)).toBe('kind: Service\n---\nkind: Deployment\n');
    // Belgelere bölmede null öğe korunur: JSON → YAML → JSON aynı diziyi verir.
    await convert(page, '[{"a":1},null,"x"]');
    expect(await out(page)).toBe('a: 1\n---\nnull\n---\nx\n');
    await page.locator('#btn-swap').click();
    await expect(page.locator('#mode-y2j')).toBeChecked();
    expect(JSON.parse(await out(page))).toEqual([{ a: 1 }, null, 'x']);
  });

  test('dosya: BOM\'lu .yaml yönü ayarlar, .json, ikili dosya hatası ve 5 MB uyarısı', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    const file = page.locator('#drop input[type=file]');
    const bomYaml = Buffer.concat([Buffer.from([0xEF, 0xBB, 0xBF]), Buffer.from('şehir: Diyarbakır\nliste:\n  - ı\n  - ğ\n', 'utf8')]);
    await file.setInputFiles({ name: 'ayarlar.yaml', mimeType: 'application/yaml', buffer: bomYaml });
    await expect(page.locator('#mode-y2j')).toBeChecked();
    await expect(page.locator('#file-name')).toContainText('BOM kaldırıldı');
    expect((await page.locator('#input').inputValue()).charCodeAt(0)).not.toBe(0xFEFF);
    await expect(page.locator('#result')).toBeVisible();
    expect(JSON.parse(await out(page))).toEqual({ şehir: 'Diyarbakır', liste: ['ı', 'ğ'] });
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('ayarlar.json');

    await file.setInputFiles({ name: 'paket.json', mimeType: 'application/json', buffer: Buffer.from('{"ad":"Ayşe"}') });
    await expect(page.locator('#mode-j2y')).toBeChecked();
    await expect.poll(() => out(page)).toBe('ad: Ayşe\n');

    await file.setInputFiles({ name: 'resim.yaml', mimeType: 'application/yaml', buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0x0d]) });
    await expect(page.locator('#error')).toContainText('metin gibi görünmüyor');

    // 5 MB üstü dosya: uyarı, kısaltılmış önizleme, tam indirme. Metnin tamamı metin kutusuna konmaz
    // (birkaç MB'lık tek satırı dizmek tarayıcıyı yavaş makinede onlarca saniye kilitler); kutu salt
    // okunur kısa bir baş kısım gösterir, dönüşüm tam metinle yapılır.
    await file.setInputFiles({ name: 'buyuk.json', mimeType: 'application/json', buffer: bigJson() });
    await expect(page.locator('#warning')).toContainText('5 MB');
    await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#error')).toBeHidden();
    await expect(page.locator('#result-notes')).toContainText('Önizleme');
    await expect(page.locator('#input')).not.toBeEditable();
    await expect(page.locator('#in-note')).toContainText('salt okunur');
    expect((await page.locator('#input').inputValue()).length).toBeLessThan(50_000);
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl2.suggestedFilename()).toBe('buyuk.yaml');
    const body = readFileSync((await dl2.path())!, 'utf8');
    expect(body.match(/^- ad: Ayşe Yılmaz$/gm)?.length).toBe(60000);
    // Örnek yüklenince önceki dosyanın 5 MB uyarısı ekranda kalmaz
    await page.locator('#btn-sample').click();
    await expect(page.locator('#warning')).toBeHidden();
    await expect.poll(() => out(page)).toContain('uygulama: Bilişim Ajans Araçları');
    // Örnek küçük metindir: kutu yeniden düzenlenebilir, büyük metin notu kalkar.
    await expect(page.locator('#input')).toBeEditable();
    await expect(page.locator('#in-note')).toBeHidden();
    expect(errors).toEqual([]);
  });

  test('büyük dosya 4 kat yavaş işlemcide: ilerleme gösterilir, makul sürede döner, yön değiştirilir, son seçilen dosya kazanır', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'CPU kısıtı yalnızca Chromium CDP ile uygulanabilir');
    test.setTimeout(120_000);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    // İlerleme etiketlerini sırayla kaydet (dönüşüm hızlı biterse görünürlüğü yoklamak yarışlı olurdu).
    await page.evaluate(() => {
      const w = window as unknown as { __prog: string[] };
      w.__prog = [];
      const label = document.querySelector('#progress .label')!;
      new MutationObserver((recs) => {
        for (const r of recs) for (const n of Array.from(r.addedNodes)) w.__prog.push(n.textContent || '');
      }).observe(label, { childList: true });
    });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const file = page.locator('#drop input[type=file]');
    const big = bigJson();

    // Düzeltmeden önce bu adım 4x kısıtta 2 dakikada bile bitmiyordu (metin kutusu dizilimi).
    await test.step('4x CPU: büyük JSON → YAML', async () => {
      await file.setInputFiles({ name: 'buyuk.json', mimeType: 'application/json', buffer: big });
      const t0 = Date.now();
      await expect(page.locator('#result')).toBeVisible({ timeout: 30_000 });
      test.info().annotations.push({ type: 'süre (4x CPU, dosya seçildikten sonra)', description: `${Date.now() - t0} ms` });
      await expect(page.locator('#result-info')).toContainText('JSON → YAML');
      await expect(page.locator('#progress')).toBeHidden();
      expect(await page.evaluate(() => (window as unknown as { __prog: string[] }).__prog)).toEqual(['Dosya okunuyor…', 'Ayrıştırılıyor…', 'Çıktı hazırlanıyor…']);
      await expect(page.locator('#input')).not.toBeEditable();
    });

    // Yönü değiştir: büyük YAML çıktısı girişe geçer (kutuya yine tam konmaz) ve JSON'a döner.
    await test.step('4x CPU: yönü değiştir, büyük YAML → JSON', async () => {
      await page.locator('#btn-swap').click();
      await expect(page.locator('#mode-y2j')).toBeChecked();
      await expect(page.locator('#result-info')).toContainText('YAML → JSON', { timeout: 30_000 });
      await expect(page.locator('#result')).toBeVisible();
      await expect(page.locator('#input')).not.toBeEditable();
      expect(await page.locator('#input').inputValue()).toMatch(/^- ad: Ayşe Yılmaz\n/);
      const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
      expect(dl.suggestedFilename()).toBe('buyuk.json');
      const back = JSON.parse(readFileSync((await dl.path())!, 'utf8'));
      expect(back).toHaveLength(60000);
      expect(back[59999]).toEqual({ ad: 'Ayşe Yılmaz', şehir: 'Diyarbakır', not: 'x'.repeat(60) });
    });

    // Büyük dosya okunur/dönüşürken küçük dosya seçilirse ekranda küçük dosyanın sonucu kalır.
    // Kısıt kaldırılır: Playwright'ın 7 MB'lık dosyayı sayfaya aktarması da kısıtlanıp testi uzatıyordu.
    await test.step('büyük dosya sürerken küçük dosya seçilir', async () => {
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
      await file.setInputFiles({ name: 'buyuk.json', mimeType: 'application/json', buffer: big });
      await file.setInputFiles({ name: 'paket.json', mimeType: 'application/json', buffer: Buffer.from('{"ad":"Ayşe"}') });
      await expect.poll(() => out(page), { timeout: 30_000 }).toBe('ad: Ayşe\n');
      // Bekleyen büyük okuma/dönüşüm sonradan bitse de sonucun üzerine yazmaz.
      await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));
      await expect(page.locator('#progress')).toBeHidden();
      await expect(page.locator('#btn-convert')).toBeEnabled();
      expect(await out(page)).toBe('ad: Ayşe\n');
      await expect(page.locator('#file-name')).toContainText('paket.json');
      await expect(page.locator('#input')).toBeEditable();
      await expect(page.locator('#input')).toHaveValue('{"ad":"Ayşe"}');
      const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
      expect(dl2.suggestedFilename()).toBe('paket.yaml');
    });
    expect(errors).toEqual([]);
  });

  test('yarışlar: okunurken Temizle ilerleme çubuğunu bırakmaz; dönüşüm sürerken yön değişirse eski sonuç gösterilmez', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    // 100 000 karakter üstü: ilerleme çubuğunun gösterildiği yol (dosya okuma + dönüşüm adımları).
    const mid = `[${Array(2000).fill(JSON.stringify({ ad: 'Ayşe', not: 'x'.repeat(80) })).join(',')}]`;
    expect(mid.length).toBeGreaterThan(100_000);

    // Dosya seçilir seçilmez (okuma bitmeden) Temizle: "Dosya okunuyor…" çubuğu ekranda takılı kalmaz.
    await page.evaluate((text) => {
      const input = document.querySelector('#drop input[type=file]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File([text], 'orta.json', { type: 'application/json' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      (document.querySelector('#btn-clear') as HTMLButtonElement).click();
    }, mid);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
    await expect(page.locator('#progress')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
    await expect(page.locator('#input')).toHaveValue('');

    // "Çıktı hazırlanıyor…" adımında yön radyosu YAML → JSON yapılır: YAML çıktısı "JSON olarak indir"
    // altında gösterilmez; sonuç gizli kalır, yeniden Dönüştür yeni yönde doğru JSON verir.
    await page.evaluate(() => {
      const label = document.querySelector('#progress .label')!;
      const mo = new MutationObserver(() => {
        if (label.textContent!.startsWith('Çıktı')) { mo.disconnect(); (document.querySelector('#mode-y2j') as HTMLInputElement).click(); }
      });
      mo.observe(label, { childList: true });
    });
    await convert(page, mid);
    await expect(page.locator('#mode-y2j')).toBeChecked();
    await expect(page.locator('#btn-convert')).toBeEnabled();
    await expect(page.locator('#progress')).toBeHidden();
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#btn-convert').click();
    await expect(page.locator('#result-info')).toContainText('YAML → JSON');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#btn-download').click()]);
    expect(dl.suggestedFilename()).toBe('veri.json');
    expect(JSON.parse(readFileSync((await dl.path())!, 'utf8'))).toEqual(JSON.parse(mid));
    expect(errors).toEqual([]);
  });

  test('XSS yok: çıktı düz metin olarak basılır; klavye ile kullanım', async ({ page }) => {
    await open(page);
    await page.locator('#mode-y2j').check();
    await convert(page, 'x: "<img src=x onerror=window.__xss=1><script>window.__xss=2</script>"');
    expect(await out(page)).toContain('<img src=x onerror=window.__xss=1>');
    expect(await page.locator('#output img, #output script').count()).toBe(0);
    expect(await page.evaluate(() => (window as unknown as { __xss?: number }).__xss)).toBeUndefined();

    // Klavye: Ctrl+Enter dönüştürür, yön radyoları ok tuşlarıyla değişir
    await page.locator('#btn-clear').click();
    await expect(page.locator('#input')).toBeFocused();
    await page.keyboard.type('liste: [1, 2]');
    await page.keyboard.press('Control+Enter');
    expect(JSON.parse(await out(page))).toEqual({ liste: [1, 2] });
    await page.locator('#mode-y2j').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#mode-j2y')).toBeChecked();
    await expect(page.locator('#btn-convert')).toHaveText("JSON'u YAML'a dönüştür");
    await page.locator('#drop').focus();
    await expect(page.locator('#drop')).toBeFocused();
  });

  test('sayfa yapısı: rozet, 3 reklam (araç kutusunda yok), SSS ≥ 7, ≥ 900 kelime, JSON-LD, 360px taşma yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    await page.setViewportSize({ width: 360, height: 780 });
    await open(page);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('.ba-topbar')).toContainText('dosya yüklenmez');
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`.ba-ad[data-slot="json-yaml-donustur-${s}"]`).count()).toBe(1);
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const words = await page.locator('.ba-content').evaluate((el) => el.textContent!.trim().split(/\s+/).length);
    expect(words).toBeGreaterThanOrEqual(900);
    const types = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent as string)['@type']));
    expect(types).toEqual(expect.arrayContaining(['SoftwareApplication', 'FAQPage']));
    const faq = await page.locator('script[type="application/ld+json"]').nth(1).evaluate((e) => JSON.parse(e.textContent as string).mainEntity.length);
    expect(faq).toBeGreaterThanOrEqual(7);
    await expect(page.locator('a[href="../json-bicimlendir/"]')).toHaveCount(1);
    await expect(page.locator('a[href="../csv-json-donustur/"]')).toHaveCount(1);

    // Uzun URL ve uzun satırlı hata 360px'te yatay taşma yapmamalı
    await page.locator('#mode-y2j').check();
    await convert(page, `adres: https://ornek.bilisimajans.com/${'cok-uzun-bir-yol-parcasi/'.repeat(12)}?q=${'x'.repeat(200)}`);
    await expect(page.locator('#result')).toBeVisible();
    let overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await convert(page, `a: ${'y'.repeat(300)}\n b: [`);
    await expect(page.locator('#error')).toBeVisible();
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(external).toEqual([]);
  });
});
