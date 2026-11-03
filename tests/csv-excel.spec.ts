import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import { fx, trackExternalRequests, expectNoConsoleErrors } from './helpers';
// Vendor'daki fflate'i Node'da da kullanıyoruz (Node 22+ require(esm) destekler).
import { unzipSync, zipSync, strToU8, strFromU8 } from '../web/vendor/fflate@0.8.3/fflate.browser.mjs';

/** Türkçe metni Windows-1254 baytlarına çevirir (Node'da TextEncoder yalnızca UTF-8). */
const CP1254: Record<string, number> = { 'Ş': 0xde, 'ş': 0xfe, 'İ': 0xdd, 'ı': 0xfd, 'Ğ': 0xd0, 'ğ': 0xf0, 'Ü': 0xdc, 'ü': 0xfc, 'Ö': 0xd6, 'ö': 0xf6, 'Ç': 0xc7, 'ç': 0xe7 };
function encodeCp1254(s: string): Buffer {
  const out: number[] = [];
  for (const ch of s) {
    const b = CP1254[ch];
    if (b !== undefined) out.push(b);
    else { const c = ch.charCodeAt(0); if (c > 0x7f) throw new Error(`kodlanamaz: ${ch}`); out.push(c); }
  }
  return Buffer.from(out);
}

/** Zip içindeki tüm girdileri { ad: metin } olarak döndürür. */
function unzipText(bytes: Buffer): Record<string, string> {
  const files = unzipSync(new Uint8Array(bytes));
  const out: Record<string, string> = {};
  for (const [name, data] of Object.entries(files)) out[name] = strFromU8(data as Uint8Array);
  return out;
}

test.describe('CSV ↔ Excel Dönüştürücü', () => {
  test('Windows-1254 noktalı virgüllü CSV → XLSX; sheet1.xml içinde Türkçe metin ve sayı hücresi var; dış istek yok', async ({ page }, testInfo) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/csv-excel/');

    const csvText = 'İlçe;Müşteri;Tutar;Telefon;Tarih\r\n' +
      'Şişli;"Güneş, İğne Ltd. Şti.";1.250,50;05321234567;03.04.2025\r\n' +
      'Çankaya;Öztürk Gıda;980;05339876543;15.05.2025\r\n' +
      'Üsküdar;"Çok ""satırlı""\nad";12,5;05001112233;01.06.2025\r\n';
    const csvPath = testInfo.outputPath('müşteriler.csv');
    writeFileSync(csvPath, encodeCp1254(csvText));

    await page.locator('#drop input[type=file]').setInputFiles(csvPath);
    await expect(page.locator('#detected')).toContainText('Windows-1254');
    await expect(page.locator('#detected')).toContainText('noktalı virgül');
    await expect(page.locator('#stats')).toContainText('3 veri satırı');
    await expect(page.locator('#stats')).toContainText('5 sütun');
    // Önizlemede Türkçe harfler doğru çözülmüş olmalı; tırnak içindeki ayraç ve çift tırnak korunur
    await expect(page.locator('#preview-table thead')).toContainText('Müşteri');
    await expect(page.locator('#preview-table tbody')).toContainText('Şişli');
    await expect(page.locator('#preview-table tbody')).toContainText('Güneş, İğne Ltd. Şti.');
    await expect(page.locator('#preview-table tbody')).toContainText('Çok "satırlı"');
    // Tür tahmini: Tutar sayı, Telefon (başı sıfır) metin, Tarih tarih
    await expect(page.locator('.ce-type-select[data-col="2"] option[value="auto"]')).toHaveText('otomatik: sayı');
    await expect(page.locator('.ce-type-select[data-col="3"] option[value="auto"]')).toHaveText('otomatik: metin');
    await expect(page.locator('.ce-type-select[data-col="4"] option[value="auto"]')).toHaveText('otomatik: tarih');

    await expect(page.locator('#mode-xlsx')).toBeChecked();
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    await expect(page.locator('#result-info')).toContainText('müşteriler.xlsx');
    await expect(page.locator('#result-info')).toContainText('4 satır');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('müşteriler.xlsx');
    const xlsxPath = testInfo.outputPath('müşteriler.xlsx');
    await dl.saveAs(xlsxPath);
    const bytes = readFileSync(xlsxPath);
    expect(bytes.subarray(0, 2).toString()).toBe('PK');
    const files = unzipText(bytes);
    expect(Object.keys(files)).toEqual(expect.arrayContaining(['[Content_Types].xml', 'xl/workbook.xml', 'xl/worksheets/sheet1.xml', 'xl/styles.xml']));
    const sheet = files['xl/worksheets/sheet1.xml'];
    expect(sheet).toContain('Şişli');
    expect(sheet).toContain('Güneş, İğne Ltd. Şti.');
    expect(sheet).toContain('<c r="C2"><v>1250.5</v></c>');          // Türkçe sayı → gerçek sayı hücresi
    expect(sheet).toContain('<c r="D2" t="inlineStr"><is><t xml:space="preserve">05321234567</t></is></c>'); // başı sıfırlı → metin
    expect(sheet).toContain('<t xml:space="preserve">03.04.2025</t>'); // tarih metin olarak
    expect(sheet).toContain('<c r="A1" t="inlineStr" s="1">');        // başlık kalın stil
    expect(sheet).toContain('state="frozen"');
    expect(files['xl/workbook.xml']).toContain('name="müşteriler"');

    expect(external).toEqual([]);
    noErrors();
  });

  test('XLSX (sharedStrings, tarih, formül) → CSV: UTF-8 BOM, noktalı virgül, virgüllü ondalık, sayfa seçimi', async ({ page }, testInfo) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/csv-excel/');

    // Excel'in ürettiğine benzer, sharedStrings + stil (tarih) + formül içeren iki sayfalı dosya
    const ss = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="4" uniqueCount="4"><si><t>Ad</t></si><si><t>Tutar</t></si><si><r><t>Şişli</t></r><r><rPr><b/></rPr><t> Şubesi</t></r></si><si><t>Tarih</t></si></sst>';
    const sheet1 = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>' +
      '<row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>3</v></c><c r="D1" t="inlineStr"><is><t>Not</t></is></c></row>' +
      '<row r="2"><c r="A2" t="s"><v>2</v></c><c r="B2"><v>1250.5</v></c><c r="C2" s="1"><v>45658</v></c><c r="D2" t="str"><f>A2&amp;"!"</f><v>Şişli Şubesi!</v></c></row>' +
      '<row r="3"/>' +
      '<row r="4"><c r="A4" t="inlineStr"><is><t>İğne; Ltd</t></is></c><c r="B4"><f>B2*2</f><v>2501</v></c><c r="C4" t="b"><v>1</v></c></row>' +
      '</sheetData></worksheet>';
    const sheet2 = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row r="1"><c r="A1" t="inlineStr"><is><t>İkinci</t></is></c></row></sheetData></worksheet>';
    const wb = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Satış" sheetId="1" r:id="rId1"/><sheet name="Özet" sheetId="2" r:id="rId2"/></sheets></workbook>';
    const rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
    const styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cellXfs count="2"><xf numFmtId="0"/><xf numFmtId="14" applyNumberFormat="1"/></cellXfs></styleSheet>';
    const ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/></Types>';
    const rootRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>';
    const zipped = zipSync({
      '[Content_Types].xml': strToU8(ct), '_rels/.rels': strToU8(rootRels), 'xl/workbook.xml': strToU8(wb), 'xl/_rels/workbook.xml.rels': strToU8(rels),
      'xl/sharedStrings.xml': strToU8(ss), 'xl/styles.xml': strToU8(styles), 'xl/worksheets/sheet1.xml': strToU8(sheet1), 'xl/worksheets/sheet2.xml': strToU8(sheet2),
    });
    const xlsxPath = testInfo.outputPath('rapor.xlsx');
    writeFileSync(xlsxPath, zipped);

    await page.locator('#drop input[type=file]').setInputFiles(xlsxPath);
    await expect(page.locator('#detected')).toContainText('2 sayfa');
    await expect(page.locator('#sheet-field')).toBeVisible();
    await expect(page.locator('#in-sheet option')).toHaveCount(2);
    await expect(page.locator('#stats')).toContainText('3 veri satırı');
    await expect(page.locator('#preview-table tbody')).toContainText('Şişli Şubesi');
    await expect(page.locator('#preview-table tbody')).toContainText('01.01.2025'); // 45658 → tarih
    await expect(page.locator('#mode-field')).toBeHidden();
    await expect(page.locator('#csv-out-options')).toBeVisible();
    await expect(page.locator('#out-preset')).toHaveValue('tr-excel');
    await expect(page.locator('#convert')).toHaveText('CSV olarak indir');

    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('rapor-Satış.csv');
    const csv = readFileSync((await dl.path())!);
    expect(Array.from(csv.subarray(0, 3))).toEqual([0xef, 0xbb, 0xbf]); // UTF-8 BOM
    const text = csv.subarray(3).toString('utf8');
    expect(text).toBe(
      'Ad;Tutar;Tarih;Not\r\n' +
      'Şişli Şubesi;1250,5;01.01.2025;Şişli Şubesi!\r\n' +
      '\r\n' +
      '"İğne; Ltd";2501;DOĞRU\r\n',
    );

    // İkinci sayfa + standart ön ayar (virgül, BOM'suz, nokta ondalık)
    await page.locator('#in-sheet').selectOption('1');
    await expect(page.locator('#preview-table')).toContainText('İkinci');
    await page.locator('#out-preset').selectOption('standard');
    await expect(page.locator('#out-delim')).toHaveValue(',');
    await expect(page.locator('#out-encoding')).toHaveValue('utf-8');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl2.suggestedFilename()).toBe('rapor-Özet.csv');
    const csv2 = readFileSync((await dl2.path())!);
    expect(csv2[0]).not.toBe(0xef);
    expect(csv2.toString('utf8')).toBe('İkinci\r\n');

    expect(external).toEqual([]);
    noErrors();
  });

  test('UTF-8 virgüllü CSV → CSV onarımı (Türkçe Excel ön ayarı) ve Windows-1254 çıktı', async ({ page }, testInfo) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/csv-excel/');
    const csvPath = testInfo.outputPath('urunler.csv');
    writeFileSync(csvPath, 'Ürün,Fiyat\n"Çay, 500g",45.90\nŞeker,"12"\n', 'utf8');
    await page.locator('#drop input[type=file]').setInputFiles(csvPath);
    await expect(page.locator('#detected')).toContainText('UTF-8 (otomatik)');
    await expect(page.locator('#detected')).toContainText('virgül (,)');
    await page.locator('#mode-csv').check();
    await expect(page.locator('#csv-out-options')).toBeVisible();
    await expect(page.locator('#decimal-field')).toBeHidden(); // CSV→CSV'de değerler olduğu gibi kalır
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    expect(dl.suggestedFilename()).toBe('urunler.csv');
    const out = readFileSync((await dl.path())!);
    expect(Array.from(out.subarray(0, 3))).toEqual([0xef, 0xbb, 0xbf]);
    // Ayraç ";" olduğu için virgül içeren hücre tırnak gerektirmez; değerler olduğu gibi kalır (45.90 değişmez)
    expect(out.subarray(3).toString('utf8')).toBe('Ürün;Fiyat\r\nÇay, 500g;45.90\r\nŞeker;12\r\n');

    // Windows-1254 çıktısı: Ü → 0xDC, Ş → 0xDE
    await page.locator('#out-encoding').selectOption('windows-1254');
    await expect(page.locator('#out-preset')).toHaveValue('ansi');
    await page.locator('#convert').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl2] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
    const ansi = readFileSync((await dl2.path())!);
    expect(ansi[0]).toBe(0xdc);
    expect(new TextDecoder('windows-1254').decode(ansi)).toBe('Ürün;Fiyat\r\nÇay, 500g;45.90\r\nŞeker;12\r\n');

    expect(external).toEqual([]);
    noErrors();
  });

  test('bozuk PDF ve bozuk XLSX için Türkçe, çözüm öneren hata', async ({ page }, testInfo) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/csv-excel/');
    await page.locator('#drop input[type=file]').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('CSV, TXT ya da XLSX dosyası seçin');
    await expect(page.locator('#actions')).toBeHidden();

    const badXlsx = testInfo.outputPath('bozuk.xlsx');
    writeFileSync(badXlsx, Buffer.concat([Buffer.from('PK\x03\x04'), Buffer.alloc(200, 7)]));
    await page.locator('#drop input[type=file]').setInputFiles(badXlsx);
    await expect(page.locator('#error')).toContainText('bozuk ya da şifreli');

    const sheetless = testInfo.outputPath('sayfasiz.xlsx');
    writeFileSync(sheetless, zipSync({ 'readme.txt': strToU8('merhaba') }));
    await page.locator('#drop input[type=file]').setInputFiles(sheetless);
    await expect(page.locator('#error')).toContainText('Excel (.xlsx) dosyası değil');
    noErrors();
  });
});
