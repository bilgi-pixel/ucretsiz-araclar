import { test, expect, Page, FileChooser } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { PNG } from 'pngjs';
import { readFileSync } from 'node:fs';

// 40×40, dört 20×20 bölge: sol üst kırmızı, sağ üst yeşilimsi, sol alt turuncu, sağ alt koyu mavi.
const Q = {
  tl: [230, 57, 70],    // #e63946
  tr: [42, 157, 143],   // #2a9d8f
  bl: [244, 162, 97],   // #f4a261
  br: [38, 70, 83],     // #264653
};
const QHEX = ['#e63946', '#2a9d8f', '#f4a261', '#264653'];

function quadrantPng(): Buffer {
  const png = new PNG({ width: 40, height: 40 });
  for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) {
    const c = y < 20 ? (x < 20 ? Q.tl : Q.tr) : (x < 20 ? Q.bl : Q.br);
    const i = (40 * y + x) << 2;
    png.data[i] = c[0]; png.data[i + 1] = c[1]; png.data[i + 2] = c[2]; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

// 64×64 yumuşak geçişli (çok renkli) PNG: her renk sayısı için tam k renk çıkmalı.
function gradientPng(): Buffer {
  const png = new PNG({ width: 64, height: 64 });
  for (let y = 0; y < 64; y++) for (let x = 0; x < 64; x++) {
    const i = (64 * y + x) << 2;
    png.data[i] = x * 4; png.data[i + 1] = y * 4; png.data[i + 2] = (x + y) * 2; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

// Tamamen saydam PNG
function transparentPng(): Buffer {
  const png = new PNG({ width: 16, height: 16 }); // data sıfır → alfa 0
  return PNG.sync.write(png);
}

async function open(page: Page) {
  await page.goto('/resimden-renk-paleti/');
  await page.waitForLoadState('networkidle'); // modül betiği yüklenmeden etkileşim olmasın
}
async function upload(page: Page, buffer: Buffer, name = 'dort-renk.png') {
  await page.locator('#drop input[type=file]').setInputFiles({ name, mimeType: 'image/png', buffer });
}
const hexes = (page: Page) => page.locator('#pal-list li').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.hex));

test.describe('Resimden Renk Paleti', () => {
  test('boş durumda ipucu görünür; dört bölgeli PNG → palet dört baskın rengi içerir ve etiketler doğru', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await open(page);
    await expect(page.locator('#empty-hint')).toBeVisible();
    await expect(page.locator('#view')).toBeHidden();
    await upload(page, quadrantPng());
    await expect(page.locator('#view')).toBeVisible();
    await expect(page.locator('#empty-hint')).toBeHidden();
    await expect(page.locator('#pal-list li')).toHaveCount(4);
    expect((await hexes(page)).sort()).toEqual([...QHEX].sort());
    await expect(page.locator('#pal-info')).toContainText('4 renk');
    // en açık / en koyu / en doygun
    await expect(page.locator('li[data-hex="#f4a261"] .rp-tag')).toHaveText(['En açık']);
    await expect(page.locator('li[data-hex="#264653"] .rp-tag')).toHaveText(['En koyu']);
    await expect(page.locator('li[data-hex="#e63946"] .rp-tag')).toHaveText(['En doygun']);
    // her kartta HEX, RGB ve HSL kodu
    const card = page.locator('li[data-hex="#e63946"] .rp-code');
    await expect(card).toHaveText(['#E63946', 'rgb(230, 57, 70)', /^hsl\(35[56], 78%, 56%\)$/]);
    await expect(page.locator('li[data-hex="#e63946"] .rp-sw')).toContainText('%25');
    expect(external).toEqual([]);
    noErrors();
  });

  test('renk sayısı 5 / 8 / 12 seçilince palet yenilenir', async ({ page }) => {
    await open(page);
    await upload(page, gradientPng(), 'gecis.png');
    await expect(page.locator('#pal-list li')).toHaveCount(8); // varsayılan 8
    await page.locator('#count').selectOption('5');
    await expect(page.locator('#pal-list li')).toHaveCount(5);
    await page.locator('#count').selectOption('12');
    await expect(page.locator('#pal-list li')).toHaveCount(12);
    await expect(page.locator('#pal-info')).toContainText('12 baskın renk');
    await expect(page.locator('#strip i')).toHaveCount(12);
    // aynı resim + aynı sayı → aynı palet (belirleyici)
    const first = await hexes(page);
    await page.locator('#count').selectOption('8');
    await page.locator('#count').selectOption('12');
    await expect(page.locator('#pal-list li')).toHaveCount(12);
    expect(await hexes(page)).toEqual(first);
  });

  test('damlalık: tıklama ve ok tuşları pikselin rengini okur; palete ekle / kaldır', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await upload(page, quadrantPng());
    await expect(page.locator('#pal-list li')).toHaveCount(4);
    const canvas = page.locator('#view-canvas');
    await canvas.scrollIntoViewIfNeeded();
    await canvas.click({ position: { x: 30, y: 30 } });
    await expect(page.locator('#pick-hex')).toHaveText('#E63946');
    await canvas.click({ position: { x: 200, y: 30 } });
    await expect(page.locator('#pick-hex')).toHaveText('#2A9D8F');
    await expect(page.locator('#pick-rgb')).toHaveText('rgb(42, 157, 143)');
    await canvas.click({ position: { x: 30, y: 200 } });
    await expect(page.locator('#pick-hex')).toHaveText('#F4A261');
    // seçilen rengin kodunu kopyala
    await page.locator('#pick-rgb').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('rgb(244, 162, 97)');
    // klavye: resmi yeniden yükle (işaret sıfırlanır); tuval merkezinden (sağ alt bölge) başla; sola → sol alt, yukarı → sol üst
    await upload(page, quadrantPng());
    await expect(page.locator('#pick-hex')).toBeDisabled();
    await canvas.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#pick-hex')).toHaveText('#F4A261');
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('#pick-hex')).toHaveText('#E63946');
    await expect(page.locator('#pick-info')).toContainText('#E63946');
    // zaten palette olan renk eklenmez
    await page.locator('#pick-add').click();
    await expect(page.locator('#pick-info')).toContainText('zaten palette');
    await expect(page.locator('#pal-list li')).toHaveCount(4);
  });

  test('damlalıkla alınan yeni renk palete eklenir ve kaldırılır', async ({ page }) => {
    await open(page);
    await upload(page, gradientPng(), 'gecis.png');
    await page.locator('#count').selectOption('5');
    await expect(page.locator('#pal-list li')).toHaveCount(5);
    const canvas = page.locator('#view-canvas');
    // sol üst köşe piksel (0,0): palete yakın ama tam eşleşmesi beklenmeyen bir renk
    await canvas.scrollIntoViewIfNeeded();
    await canvas.click({ position: { x: 2, y: 100 } });
    const hex = (await page.locator('#pick-hex').textContent())!.toLowerCase();
    expect(await hexes(page)).not.toContain(hex);
    await page.locator('#pick-add').click();
    await expect(page.locator('#pal-list li')).toHaveCount(6);
    const added = page.locator('#pal-list li').last();
    await expect(added).toHaveAttribute('data-hex', hex);
    await expect(added).toContainText('Elle eklendi');
    await expect(page.locator('#code-out')).toHaveValue(new RegExp(`--renk-6: ${hex};`));
    await added.getByRole('button', { name: /paletten kaldır/ }).click();
    await expect(page.locator('#pal-list li')).toHaveCount(5);
  });

  test('tıkla-kopyala ve tüm paleti kopyala: HEX/RGB/HSL, CSS, SCSS, JSON', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await upload(page, quadrantPng());
    await expect(page.locator('#pal-list li')).toHaveCount(4);
    const clip = () => page.evaluate(() => navigator.clipboard.readText());
    const red = page.locator('li[data-hex="#e63946"]');
    await red.locator('.rp-code').nth(0).click();
    expect(await clip()).toBe('#E63946');
    await expect(page.locator('#copy-status')).toContainText('Kopyalandı: #E63946');
    await red.locator('.rp-code').nth(1).click();
    expect(await clip()).toBe('rgb(230, 57, 70)');
    await red.locator('.rp-code').nth(2).click();
    expect(await clip()).toMatch(/^hsl\(35[56], 78%, 56%\)$/);
    await red.locator('.rp-sw').click(); // renk kutusu HEX'i kopyalar
    expect(await clip()).toBe('#E63946');
    // CSS değişkenleri (varsayılan)
    await page.locator('#copy-all').click();
    await expect(page.locator('#copy-status')).toContainText('Tüm palet kopyalandı');
    const css = await clip();
    expect(css).toContain(':root {');
    for (let i = 1; i <= 4; i++) expect(css).toMatch(new RegExp(`--renk-${i}: #[0-9a-f]{6};`));
    for (const h of QHEX) expect(css).toContain(h);
    // SCSS
    await page.locator('#fmt').selectOption('scss');
    await page.locator('#copy-all').click();
    const scss = await clip();
    expect(scss).toMatch(/\$renk-1: #[0-9a-f]{6};/);
    const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
    expect(norm(scss)).toBe(norm(await page.locator('#code-out').inputValue()));
    // JSON
    await page.locator('#fmt').selectOption('json');
    await page.locator('#copy-all').click();
    const json = JSON.parse(await clip());
    expect(json.renkler).toHaveLength(4);
    expect(json.renkler.map((r: any) => r.hex).sort()).toEqual([...QHEX].sort());
    const redEntry = json.renkler.find((r: any) => r.hex === '#e63946');
    expect(redEntry.rgb).toEqual([230, 57, 70]);
    expect(redEntry.oran).toBeCloseTo(0.25, 2);
  });

  test('PNG indirme: renk şeritleri paletle aynı sırada ve renkte, kodlar altta', async ({ page }) => {
    await open(page);
    await upload(page, quadrantPng(), 'dört-renk.png');
    await expect(page.locator('#pal-list li')).toHaveCount(4);
    const order = (await hexes(page)) as string[];
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#dl-png').click()]);
    expect(dl.suggestedFilename()).toBe('dört-renk-palet.png');
    const png = PNG.sync.read(readFileSync((await dl.path())!));
    expect(png.width).toBe(180 * 4);
    expect(png.height).toBe(240 + 104);
    const px = (x: number, y: number) => {
      const i = (png.width * y + x) << 2;
      return '#' + [0, 1, 2].map((k) => png.data[i + k].toString(16).padStart(2, '0')).join('');
    };
    order.forEach((hex, i) => {
      expect(px(i * 180 + 10, 10)).toBe(hex);
      expect(px(i * 180 + 170, 230)).toBe(hex);
    });
    // alt bant beyaz zemin, üzerinde yazı (tamamen beyaz değil)
    expect(px(2, 340)).toBe('#ffffff');
    let dark = 0;
    for (let y = 240; y < png.height; y++) for (let x = 0; x < 180; x++) {
      const i = (png.width * y + x) << 2;
      if (png.data[i] < 128) dark++;
    }
    expect(dark).toBeGreaterThan(50);
  });

  test('bozuk, resim olmayan ve tamamen saydam dosyalar Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    // geçerli MIME ama bozuk içerik
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error')).toContainText('okunamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydedip');
    await expect(page.locator('#view')).toBeHidden();
    await expect(page.locator('#empty-hint')).toBeVisible();
    // resim olmayan dosya
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'not.txt', mimeType: 'text/plain', buffer: Buffer.from('merhaba') });
    await expect(page.locator('#error')).toContainText('bir resim dosyası değil');
    await expect(page.locator('#view')).toBeHidden();
    // tamamen saydam
    await upload(page, transparentPng(), 'saydam.png');
    await expect(page.locator('#error')).toContainText('tamamen saydam');
    await expect(page.locator('#pal-list li')).toHaveCount(0);
    // sonra geçerli resim hatayı temizler
    await upload(page, quadrantPng());
    await expect(page.locator('#pal-list li')).toHaveCount(4);
    await expect(page.locator('#error')).toBeHidden();
  });

  test('klavye: dosya seçme alanına odaklanıp Enter dosya penceresini açar', async ({ page }) => {
    // Dinleyici sayfa açılmadan kurulur. Playwright 'filechooser' aboneliğini tarayıcıya beklemeden
    // iletir; dinleyici tuşla aynı anda eklenirse (Promise.all) Chromium yük altında yakalama devreye
    // girmeden gerçek pencereyi açar, headless onu hemen iptal eder ve olay hiç gelmez (CI'da aralıklı
    // 60 sn zaman aşımı). Uygulama doğru çalışıyordu: keydown → kullanıcı etkinleşmesiyle input.click().
    const choosers: FileChooser[] = [];
    page.on('filechooser', (c) => choosers.push(c));
    await open(page);
    const drop = page.locator('#drop');
    await drop.focus();
    await expect(drop).toBeFocused();
    expect(choosers).toHaveLength(0); // sayfa açılırken kendiliğinden pencere açılmaz
    await page.keyboard.press('Enter');
    await expect.poll(() => choosers.length).toBe(1);
    const chooser = choosers[0];
    expect(chooser.isMultiple()).toBe(false);
    expect(await chooser.element().evaluate((el) => (el as HTMLInputElement).accept)).toBe('image/*');
    // klavyeyle açılan pencereden seçilen resim gerçekten işlenir
    await chooser.setFiles({ name: 'dort-renk.png', mimeType: 'image/png', buffer: quadrantPng() });
    await expect(page.locator('#pal-list li')).toHaveCount(4);
    // role="button" olduğu için Boşluk tuşu da pencereyi açar
    await drop.focus();
    await page.keyboard.press('Space');
    await expect.poll(() => choosers.length).toBe(2);
  });

  test('sayfa içeriği: ≥900 kelime, 3 reklam alanı (araç kutusunun dışında), SSS ≥7, JSON-LD, gizlilik rozeti', async ({ page }) => {
    await open(page);
    const words = await page.locator('.ba-content').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(900);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`.ba-ad[data-slot="resimden-renk-paleti-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-tool .ba-ad').count()).toBe(0);
    const order = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!;
      const ad = document.querySelector('.ba-ad[data-slot="resimden-renk-paleti-a"]')!;
      return tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING;
    });
    expect(order).toBeTruthy();
    const faqCount = await page.locator('.ba-faq details').count();
    expect(faqCount).toBeGreaterThanOrEqual(7);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    const types = ld.map((x) => x['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('FAQPage');
    expect(ld.find((x) => x['@type'] === 'FAQPage').mainEntity).toHaveLength(faqCount);
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    await expect(page.locator('h1')).toContainText('Resimden Renk Paleti');
  });

  test('360px genişlikte yatay taşma yok (boş, 12 renkli palet ve hata durumlarında)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await upload(page, gradientPng(), 'gecis.png');
    await page.locator('#count').selectOption('12');
    await expect(page.locator('#pal-list li')).toHaveCount(12);
    expect(await overflow()).toBeLessThanOrEqual(0);
    const box = await page.locator('#view-canvas').boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(360);
    // her kart ekrana sığar
    const cards = await page.locator('#pal-list li').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().right));
    expect(Math.max(...cards)).toBeLessThanOrEqual(360);
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('xx') });
    await expect(page.locator('#error')).toContainText('okunamadı');
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
});
