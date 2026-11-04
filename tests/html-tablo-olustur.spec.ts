import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { trackExternalRequests } from './helpers';

test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

const TSV = 'Ad\tYaş\tŞehir\nAli\t30\tAnkara\nAyşe\t25\tİzmir';
const count = (s: string, re: RegExp) => (s.match(re) || []).length;

async function importTsv(page: Page, text = TSV) {
  await page.locator('#t-paste').fill(text);
  await page.locator('#btn-import').click();
}
const cell = (page: Page, r: number, c: number) => page.locator(`#grid input[data-r="${r}"][data-c="${c}"]`);

test.describe('HTML Tablo Oluşturucu', () => {
  test('3x3 yapıştırma: HTML 3 satır ve Markdown çıktısı üretir; kopyala ve indir çalışır', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/html-tablo-olustur/');
    await importTsv(page);
    await expect(page.locator('#t-info')).toContainText('3 satır x 3 sütun aktarıldı');
    await expect(page.locator('#t-rows')).toHaveValue('3');
    await expect(cell(page, 2, 2)).toHaveValue('İzmir');

    const html = await page.locator('#out-html').inputValue();
    expect(html).toContain('<table');
    expect(count(html, /<tr[ >]/g)).toBe(3); // 1 thead + 2 tbody
    expect(html).toContain('<thead>');
    expect(html).toContain('<th scope="col"');
    expect(html).toContain('>Ayşe</td>');
    expect(count(html, /<td/g)).toBe(6);
    await expect(page.locator('#preview table tr')).toHaveCount(3);

    await expect(page.locator('#out-md')).toHaveValue(
      '| Ad   | Yaş | Şehir  |\n| ---- | --- | ------ |\n| Ali  | 30  | Ankara |\n| Ayşe | 25  | İzmir  |',
    );

    // Kopyala (HTML) ve Markdown sekmesi
    await page.locator('[data-copy="out-html"]').click();
    await expect(page.locator('#copied')).toHaveText('Kopyalandı');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('<table');
    await page.locator('#tab-md').click();
    await expect(page.locator('#panel-md')).toBeVisible();
    await expect(page.locator('#panel-html')).toBeHidden();
    await page.locator('[data-copy="out-md"]').click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('| Ali  | 30  | Ankara |');

    // İndirme
    const [dlMd] = await Promise.all([page.waitForEvent('download'), page.locator('[data-download="out-md"]').click()]);
    expect(dlMd.suggestedFilename()).toBe('tablo.md');
    expect(readFileSync((await dlMd.path())!, 'utf8')).toContain('| Ayşe | 25  | İzmir  |');
    await page.locator('#tab-html').click();
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('[data-download="out-html"]').click()]);
    expect(dl.suggestedFilename()).toBe('tablo.html');
    const file = readFileSync((await dl.path())!, 'utf8');
    expect(file).toContain('<meta charset="utf-8">');
    expect(file).toContain('<table');
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('noktalı virgül CSV, tırnaklı alan ve sınırlar', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await importTsv(page, 'İl;Nüfus\n"Ankara, Türkiye";5\n"Diyarbakır";1,8');
    await expect(cell(page, 1, 0)).toHaveValue('Ankara, Türkiye');
    await expect(cell(page, 2, 1)).toHaveValue('1,8');
    await expect(page.locator('#t-cols')).toHaveValue('2');
    // Virgül ayırıcı elle seçilir
    await page.locator('#t-delim').selectOption('comma');
    await importTsv(page, 'a,b,c\n1,2,3');
    await expect(page.locator('#t-cols')).toHaveValue('3');
    // 120 satır: ilk 100 alınır
    await page.locator('#t-delim').selectOption('auto');
    const big = Array.from({ length: 120 }, (_, i) => `satır${i}\t${i}`).join('\n');
    await importTsv(page, big);
    await expect(page.locator('#t-rows')).toHaveValue('100');
    await expect(page.locator('#t-info')).toContainText('ilk 100 satır alındı');
  });

  test('boş veri ve geçersiz boyut Türkçe, çözüm öneren hata verir', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await page.locator('#t-paste').fill('   ');
    await page.locator('#btn-import').click();
    await expect(page.locator('#error')).toContainText('Aktarılacak veri yok');
    await expect(page.locator('#error')).toContainText('Tabloya aktar');
    await page.locator('#t-rows').fill('0');
    await page.locator('#t-rows').blur();
    await expect(page.locator('#error')).toContainText('en az 1');
    await page.locator('#t-rows').fill('500');
    await page.locator('#t-rows').blur();
    await expect(page.locator('#t-rows')).toHaveValue('100');
    await expect(page.locator('#t-info')).toContainText('En fazla 100 satır');
  });

  test('hizalama, zebra, başlık sütunu, kenarlık ve başlık metni HTML ve Markdown çıktısına yansır', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await importTsv(page);
    await page.locator('#grid select[data-align="1"]').selectOption('right');
    await page.locator('#grid select[data-align="2"]').selectOption('center');
    await page.locator('#o-zebra').check();
    await page.locator('#o-hcol').check();
    await page.locator('#o-caption').fill('Kişi listesi');
    await page.locator('#o-border').selectOption('thick');
    await page.locator('#o-full').check();
    await page.locator('#o-scroll').check();
    const html = await page.locator('#out-html').inputValue();
    expect(html).toContain('text-align:right');
    expect(html).toContain('text-align:center');
    expect(html).toContain('<caption');
    expect(html).toContain('Kişi listesi');
    expect(html).toContain('<th scope="row"');
    expect(html).toContain('border:2px solid #bdb8b5');
    expect(html).toContain('width:100%');
    expect(html).toContain('overflow-x:auto');
    expect(html).toContain('<tr style="background-color:#f7f1f2;">');
    const md = await page.locator('#out-md').inputValue();
    expect(md).toContain('**Kişi listesi**');
    expect(md).toContain('| **Ali**');
    expect(md.split('\n')[3]).toMatch(/^\| -+ \| -+: \| :-+: \|$/);
    // Başlık satırı kapalı: thead yok, Markdown boş başlık satırı yazar
    await page.locator('#o-hrow').uncheck();
    const html2 = await page.locator('#out-html').inputValue();
    expect(html2).not.toContain('<thead>');
    expect(count(html2, /<tr[ >]/g)).toBe(3);
    expect((await page.locator('#out-md').inputValue()).split('\n')[2]).toMatch(/^\| +\| +\| +\|$/);
  });

  test('hücre birleştirme: colspan ve rowspan, çözme ve hata mesajları', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await importTsv(page);
    // Seçim yokken uyarı
    await page.locator('#btn-mright').click();
    await expect(page.locator('#error')).toContainText('Önce tablodaki bir hücreye tıklayın');

    // Sağa birleştir: (1,0) hücresi
    await cell(page, 1, 0).click();
    await expect(page.locator('#active-info')).toContainText('satır 2, sütun 1');
    await page.locator('#btn-mright').click();
    await expect(page.locator('#error')).toBeHidden();
    let html = await page.locator('#out-html').inputValue();
    expect(html).toContain('colspan="2"');
    expect(count(html, /<td/g)).toBe(5); // 6 - 1 gizlenen
    await expect(page.locator('#merge-info')).toContainText('1 birleştirilmiş');
    await expect(page.locator('#preview td[colspan="2"]')).toHaveCount(1);
    // Markdown ve WordPress uyarıları, WordPress Özel HTML bloğuna döner
    await page.locator('#tab-md').click();
    await expect(page.locator('#note-md')).toBeVisible();
    await page.locator('#tab-wp').click();
    await expect(page.locator('#note-wp')).toBeVisible();
    expect(await page.locator('#out-wp').inputValue()).toMatch(/^<!-- wp:html -->\n<table/);
    // Gizlenen hücrenin metni modelde kalır; çözünce geri gelir
    await page.locator('#tab-html').click();
    await cell(page, 1, 0).click();
    await page.locator('#btn-munmerge').click();
    html = await page.locator('#out-html').inputValue();
    expect(html).not.toContain('colspan');
    expect(html).toContain('>30</td>');
    await expect(page.locator('#merge-info')).toHaveText('');

    // Alta birleştir
    await cell(page, 1, 2).click();
    await page.locator('#btn-mdown').click();
    html = await page.locator('#out-html').inputValue();
    expect(html).toContain('rowspan="2"');
    // Son satırda aşağı birleştirme yok
    await cell(page, 2, 0).click();
    await page.locator('#btn-mdown').click();
    await expect(page.locator('#error')).toContainText('son satırda');
    // Sağdaki hücre başka bir birleştirmenin (rowspan) parçası: çakışma uyarısı
    await cell(page, 2, 1).click();
    await page.locator('#btn-mright').click();
    await expect(page.locator('#error')).toContainText('başka bir birleştirmenin parçası');
    // Son sütunda sağa birleştirme yok
    await cell(page, 0, 2).click();
    await page.locator('#btn-mright').click();
    await expect(page.locator('#error')).toContainText('Sağda birleştirilecek sütun yok');
    // Birleşik olmayan hücrede çözme uyarısı
    await cell(page, 0, 0).click();
    await page.locator('#btn-munmerge').click();
    await expect(page.locator('#error')).toContainText('birleştirilmiş değil');
    // Başlık satırı aşağı birleştirilemez
    await page.locator('#btn-mdown').click();
    await expect(page.locator('#error')).toContainText('Başlık satırındaki hücre aşağı birleştirilemez');
  });

  test('WordPress blok biçimi: zebra için is-style-stripes, hizalama sınıfları', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await importTsv(page);
    await page.locator('#grid select[data-align="2"]').selectOption('right');
    await page.locator('#tab-wp').click();
    let wp = await page.locator('#out-wp').inputValue();
    expect(wp.startsWith('<!-- wp:table -->\n<figure class="wp-block-table"><table><thead>')).toBe(true);
    expect(wp.endsWith('</table></figure>\n<!-- /wp:table -->')).toBe(true);
    expect(wp).toContain('<th class="has-text-align-right" data-align="right">Şehir</th>');
    expect(wp).toContain('<td class="has-text-align-right" data-align="right">Ankara</td>');
    await page.locator('#o-zebra').check();
    await page.locator('#o-wpfixed').check();
    await page.locator('#o-caption').fill('Başlık');
    wp = await page.locator('#out-wp').inputValue();
    expect(wp).toContain('<!-- wp:table {"className":"is-style-stripes","hasFixedLayout":true} -->');
    expect(wp).toContain('<figure class="wp-block-table is-style-stripes"><table class="has-fixed-layout">');
    expect(wp).toContain('<figcaption class="wp-element-caption">Başlık</figcaption>');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('[data-download="out-wp"]').click()]);
    expect(dl.suggestedFilename()).toBe('tablo-wordpress.html');
    expect(readFileSync((await dl.path())!, 'utf8')).toContain('<!-- wp:table');
  });

  test('class kipi ayrı CSS üretir; geçersiz sınıf adı uyarır; önizleme sayfayı etkilemez', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await importTsv(page);
    await expect(page.locator('#wrap-css')).toBeHidden();
    await page.locator('#o-style').selectOption('class');
    await expect(page.locator('#wrap-css')).toBeVisible();
    const html = await page.locator('#out-html').inputValue();
    expect(html).toContain('<table class="ba-tablo">');
    expect(html).not.toContain('style=');
    const css = await page.locator('#out-css').inputValue();
    expect(css).toContain('.ba-tablo {');
    expect(css).toContain('.ba-tablo thead th');
    await page.locator('#o-class').fill('fiyat-listesi');
    await expect(page.locator('#out-html')).toHaveValue(/<table class="fiyat-listesi">/);
    await page.locator('#o-class').fill('1 bozuk "ad');
    await expect(page.locator('#w-class')).toContainText('harfle başlamalı');
    await expect(page.locator('#out-html')).toHaveValue(/<table class="ba-tablo">/);
    // Önizleme CSS'i kapsamlı: sayfanın kendi tablo/başlık stilleri bozulmaz.
    const styleText = await page.evaluate(() => document.querySelector('#preview style')!.textContent || '');
    expect(styleText).toContain('#preview .ba-tablo');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('[data-download="out-html"]').click()]);
    expect(readFileSync((await dl.path())!, 'utf8')).toContain('<style>');
  });

  test('hücre metni kaçırılır; | işareti Markdown için kaçırılır', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/html-tablo-olustur/');
    await importTsv(page, 'A\tB\nx\ty');
    await cell(page, 1, 0).fill('<script>alert(1)</script>');
    await cell(page, 1, 1).fill('a|b & "c"');
    const html = await page.locator('#out-html').inputValue();
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('<script');
    expect(html).toContain('a|b &amp; "c"');
    await expect(page.locator('#preview script')).toHaveCount(0);
    expect(await page.locator('#out-md').inputValue()).toContain('a\\|b & "c"');
    expect(errors).toEqual([]);
  });

  test('hücreye çok satırlı yapıştırma bloğu oradan başlayarak yayar ve tabloyu büyütür', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await importTsv(page, 'a\tb\nc\td');
    await cell(page, 1, 1).click();
    await cell(page, 1, 1).evaluate((el) => {
      const dt = new DataTransfer();
      dt.setData('text', 'x\ty\nz\tw');
      el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
    });
    await expect(page.locator('#t-rows')).toHaveValue('3');
    await expect(page.locator('#t-cols')).toHaveValue('3');
    await expect(cell(page, 1, 1)).toHaveValue('x');
    await expect(cell(page, 1, 2)).toHaveValue('y');
    await expect(cell(page, 2, 1)).toHaveValue('z');
    await expect(cell(page, 2, 2)).toHaveValue('w');
    await expect(cell(page, 0, 0)).toHaveValue('a');
    // Enter alttaki hücreye geçer
    await cell(page, 0, 0).click();
    await page.keyboard.press('Enter');
    await expect(cell(page, 1, 0)).toBeFocused();
  });

  test('temizle düğmesi hücreleri boşaltır; satır/sütun artırınca boş hücre eklenir', async ({ page }) => {
    await page.goto('/html-tablo-olustur/');
    await importTsv(page);
    await page.locator('#t-cols').fill('4');
    await page.locator('#t-cols').blur();
    await expect(cell(page, 0, 3)).toHaveValue('');
    expect(count(await page.locator('#out-html').inputValue(), /<th /g)).toBe(4);
    await page.locator('#btn-clear').click();
    await expect(cell(page, 0, 0)).toHaveValue('');
    await expect(page.locator('#t-info')).toContainText('temizlendi');
  });
});
