import { test, expect, Page } from '@playwright/test';
import { fx, trackExternalRequests } from './helpers';
import { readFileSync, writeFileSync } from 'node:fs';

const URL = '/altyazi-araci/';

const SRT3 = `1
00:00:01,000 --> 00:00:03,000
Merhaba dünya

2
00:00:04,000 --> 00:00:06,500
Nasılsın?

3
00:00:07,000 --> 00:00:09,000
İyiyim, teşekkürler.
`;

/** Windows-1254 baytları: Türkçe harfler tek bayt (Node'da bu kodlama için TextEncoder yoktur, elle eşlenir). */
const CP1254: Record<string, number> = { 'ş': 0xfe, 'Ş': 0xde, 'ı': 0xfd, 'İ': 0xdd, 'ğ': 0xf0, 'Ğ': 0xd0, 'ç': 0xe7, 'Ç': 0xc7, 'ö': 0xf6, 'Ö': 0xd6, 'ü': 0xfc, 'Ü': 0xdc };
function encode1254(text: string): Buffer {
  return Buffer.from(Array.from(text).map((ch) => CP1254[ch] ?? ch.charCodeAt(0)));
}

const TR1 = 'Çocuklar şimdi güneşte oynuyor.';
const TR2 = "İstanbul'dan ÖĞRENCİ ŞÜKRÜ geldi; Iğdır'a gitti.";
const SRT_TR = `1\n00:00:01,000 --> 00:00:03,000\n${TR1}\n\n2\n00:00:04,000 --> 00:00:06,000\n${TR2}\n`;

async function open(page: Page) {
  await page.goto(URL);
  await expect(page.locator('html[data-ready="1"]')).toHaveCount(1);
}
async function pasteLoad(page: Page, text: string) {
  await page.locator('#paste').fill(text);
  await page.locator('#load-paste').click();
}
const startOf = (page: Page, n: number) => page.locator(`#rows li:nth-child(${n}) .as-t[data-f="start"]`);
const endOf = (page: Page, n: number) => page.locator(`#rows li:nth-child(${n}) .as-t[data-f="end"]`);
const textOf = (page: Page, n: number) => page.locator(`#rows li:nth-child(${n}) .as-text`);

async function download(page: Page) {
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);
  return { name: dl.suggestedFilename(), bytes: readFileSync((await dl.path())!) };
}

test.describe('Altyazı Düzenleme', () => {
  test.beforeAll(() => {
    // Windows-1254 fikstürü Node ile üretilir; geçerli UTF-8 olmadığı doğrulanır.
    const buf = encode1254(SRT_TR);
    expect(() => new TextDecoder('utf-8', { fatal: true }).decode(buf)).toThrow();
    writeFileSync(fx('altyazi-1254.srt'), buf);
  });

  test('3 satırlık SRT yapıştır → +2 sn kaydır → SRT indir; dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('#editor')).toBeHidden();
    await pasteLoad(page, SRT3);
    await expect(page.locator('#rows li')).toHaveCount(3);
    await expect(page.locator('#file-info')).toContainText('SRT');
    await expect(page.locator('#file-info')).toContainText('3 satır');
    await expect(page.locator('#issues-summary')).toContainText('Sorun bulunamadı');
    await page.locator('#shift-sec').fill('2');
    await page.locator('#apply-shift').click();
    await expect(page.locator('#op-status')).toContainText('3 satır +2 saniye kaydırıldı');
    await expect(startOf(page, 1)).toHaveValue('00:00:03,000');
    await expect(endOf(page, 1)).toHaveValue('00:00:05,000');
    await expect(startOf(page, 3)).toHaveValue('00:00:09,000');
    await expect(endOf(page, 3)).toHaveValue('00:00:11,000');
    const { name, bytes } = await download(page);
    expect(name).toBe('altyazi-duzenlendi.srt');
    expect(bytes.toString('utf8')).toBe(
      '1\n00:00:03,000 --> 00:00:05,000\nMerhaba dünya\n\n2\n00:00:06,000 --> 00:00:08,500\nNasılsın?\n\n3\n00:00:09,000 --> 00:00:11,000\nİyiyim, teşekkürler.\n',
    );
    await expect(page.locator('#result')).toBeVisible();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('SRT → VTT dönüşümü "WEBVTT" ile başlar, ayraç nokta olur, BOM yoktur', async ({ page }) => {
    await open(page);
    await pasteLoad(page, SRT3);
    await page.locator('#shift-sec').fill('-0,5');
    await page.locator('#apply-shift').click();
    await page.locator('#out-format').selectOption('vtt');
    const { name, bytes } = await download(page);
    expect(name).toBe('altyazi.vtt');
    expect(Array.from(bytes.subarray(0, 6))).toEqual(Array.from(Buffer.from('WEBVTT')));
    const txt = bytes.toString('utf8');
    expect(txt.startsWith('WEBVTT\n\n')).toBe(true);
    expect(txt).toContain('00:00:00.500 --> 00:00:02.500\nMerhaba dünya');
    expect(txt).toContain('İyiyim, teşekkürler.');
    expect(txt).not.toContain(',000');
  });

  test('VTT dosyası (etiket, ayar, NOTE) → SRT; etiketler sadeleşir', async ({ page }) => {
    await open(page);
    const vtt = 'WEBVTT\n\nNOTE bu bir yorum\n\nbirinci\n00:01.000 --> 00:03.000 align:start position:10%\n<v Ali>Merhaba &amp; <c.sari>selam</c></v>\n\n00:00:04.000 --> 00:00:05.000\n<i>Tamam</i>\n';
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'ornek.vtt', mimeType: 'text/vtt', buffer: Buffer.from(vtt, 'utf8') });
    await expect(page.locator('#file-info')).toContainText('WebVTT');
    await expect(page.locator('#rows li')).toHaveCount(2);
    await expect(textOf(page, 1)).toHaveValue('Merhaba & selam');
    await expect(startOf(page, 1)).toHaveValue('00:00:01,000');
    await page.locator('#out-format').selectOption('srt');
    const { name, bytes } = await download(page);
    expect(name).toBe('ornek.srt');
    expect(bytes.toString('utf8')).toBe('1\n00:00:01,000 --> 00:00:03,000\nMerhaba & selam\n\n2\n00:00:04,000 --> 00:00:05,000\n<i>Tamam</i>\n');
  });

  test('ASS (temel) okunur ve SRT olarak iner', async ({ page }) => {
    await open(page);
    const ass = String.raw`[Script Info]
Title: deneme

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:05.00,0:00:07.00,Default,,0,0,0,,İkinci, virgüllü satır
Dialogue: 0,0:00:01.50,0:00:03.00,Default,,0,0,0,,{\i1}Selam{\i0}\Nşöyle dünya
`;
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'anime.ass', mimeType: '', buffer: Buffer.from(ass, 'utf8') });
    await expect(page.locator('#file-info')).toContainText('ASS');
    await expect(startOf(page, 1)).toHaveValue('00:00:01,500');
    await expect(textOf(page, 1)).toHaveValue('<i>Selam</i>\nşöyle dünya');
    await expect(textOf(page, 2)).toHaveValue('İkinci, virgüllü satır');
    const { name, bytes } = await download(page);
    expect(name).toBe('anime.srt');
    expect(bytes.toString('utf8').startsWith('1\n00:00:01,500 --> 00:00:03,000\n<i>Selam</i>\nşöyle dünya')).toBe(true);
  });

  test('Windows-1254 fikstürü otomatik tanınır, Türkçe düzelir; UTF-8 ve geri dönüş', async ({ page }) => {
    const external = trackExternalRequests(page);
    await open(page);
    await page.locator('#drop input[type=file]').setInputFiles(fx('altyazi-1254.srt'));
    await expect(page.locator('#file-info')).toContainText('Windows-1254');
    await expect(textOf(page, 1)).toHaveValue(TR1);
    await expect(textOf(page, 2)).toHaveValue(TR2);
    // UTF-8 çıktı: Türkçe harfler doğru
    const utf8 = await download(page);
    expect(utf8.name).toBe('altyazi-1254-duzenlendi.srt');
    const text = utf8.bytes.toString('utf8');
    expect(text).toContain(TR1);
    expect(text).toContain(TR2);
    // Windows-1254 çıktı: özgün baytlarla birebir aynı
    await page.locator('#out-enc').selectOption('windows-1254');
    const legacy = await download(page);
    expect(Buffer.compare(legacy.bytes, readFileSync(fx('altyazi-1254.srt')))).toBe(0);
    // Yanlış kodlama seçilirse bozuk karakter uyarısı çıkar, geri dönülünce düzelir
    await page.locator('#opt-enc').selectOption('utf-8');
    await expect(page.locator('#fix-status')).toContainText('�');
    await expect(textOf(page, 1)).not.toHaveValue(TR1);
    await page.locator('#opt-enc').selectOption('windows-1254');
    await expect(textOf(page, 1)).toHaveValue(TR1);
    expect(external).toEqual([]);
  });

  test('UTF-8 BOM seçeneği ve Windows-1254 çıktıda çevrilemeyen karakter uyarısı', async ({ page }) => {
    await open(page);
    await pasteLoad(page, '1\n00:00:01,000 --> 00:00:02,000\nŞimdi 😀 gülelim\n');
    await page.locator('#out-enc').selectOption('windows-1254');
    await expect(page.locator('#out-warn')).toContainText('karşılığı olmayan');
    const legacy = await download(page);
    expect(legacy.bytes.includes(0xde)).toBe(true); // Ş
    expect(legacy.bytes.toString('latin1')).toContain('?');
    await page.locator('#out-enc').selectOption('utf-8');
    await page.locator('.as-adv summary').first().click();
    await page.locator('#opt-bom').check();
    const bom = await download(page);
    expect(Array.from(bom.bytes.subarray(0, 3))).toEqual([0xef, 0xbb, 0xbf]);
  });

  test('fps düzeltme (23,976 → 25) ve satır aralığına kaydırma', async ({ page }) => {
    await open(page);
    await pasteLoad(page, '1\n01:00:00,000 --> 01:00:02,000\nBir saat sonra\n\n2\n01:00:03,000 --> 01:00:04,000\nİkinci\n');
    await page.locator('#fps-preset').selectOption('23.976:25');
    await page.locator('#apply-speed').click();
    await expect(page.locator('#op-status')).toContainText('2 satırın zamanı');
    // 3600 s × (24000/1001) / 25 = 3452,547 s
    await expect(startOf(page, 1)).toHaveValue('00:57:32,547');
    await page.locator('#undo').click();
    await expect(startOf(page, 1)).toHaveValue('01:00:00,000');
    // yalnızca 2. satır: +10 sn
    await page.locator('#scope').selectOption('range');
    await page.locator('#range-from').fill('2');
    await page.locator('#range-to').fill('2');
    await page.locator('#shift-sec').fill('10');
    await page.locator('#apply-shift').click();
    await expect(startOf(page, 1)).toHaveValue('01:00:00,000');
    await expect(startOf(page, 2)).toHaveValue('01:00:13,000');
    // özel oran
    await page.locator('#scope').selectOption('all');
    await page.locator('#fps-preset').selectOption('custom');
    await page.locator('#ratio').fill('0,5');
    await page.locator('#apply-speed').click();
    await expect(startOf(page, 1)).toHaveValue('00:30:00,000');
  });

  test('uyarılar: çakışma, eksik zaman, boş metin; düzeltme, birleştirme, ekleme, silme', async ({ page }) => {
    await open(page);
    await pasteLoad(page, '1\n00:00:01,000 --> 00:00:04,000\nBirinci\n\n2\n00:00:03,000 --> 00:00:05,000\nİkinci\n\n3\nzamansız satır\n');
    await expect(page.locator('#rows li')).toHaveCount(3);
    await expect(page.locator('#issues')).toContainText('Satır 2: Önceki satırla çakışıyor');
    await expect(page.locator('#issues')).toContainText('Satır 3: Zaman eksik');
    await expect(page.locator('#rows li.has-issue')).toHaveCount(2);
    // eksik zamanla indirme engellenir
    await page.locator('#download').click();
    await expect(page.locator('#out-status')).toContainText('Satır 3 için zaman eksik');
    // çakışmayı gider
    await page.locator('#fix-overlap').click();
    await expect(endOf(page, 1)).toHaveValue('00:00:03,000');
    await expect(page.locator('#issues')).not.toContainText('çakışıyor');
    // eksik zamanı doldur
    await startOf(page, 3).fill('00:00:06,000');
    await startOf(page, 3).press('Enter');
    await endOf(page, 3).fill('00:00:07,000');
    await endOf(page, 3).press('Enter');
    await expect(page.locator('#issues-summary')).toContainText('Sorun bulunamadı');
    // birleştir
    await page.locator('#rows li:nth-child(1) [data-act="merge"]').click();
    await expect(page.locator('#rows li')).toHaveCount(2);
    await expect(textOf(page, 1)).toHaveValue('Birinci\nİkinci');
    await expect(endOf(page, 1)).toHaveValue('00:00:05,000');
    // altına satır ekle → boş metin uyarısı
    await page.locator('#rows li:nth-child(1) [data-act="add"]').click();
    await expect(page.locator('#rows li')).toHaveCount(3);
    await expect(startOf(page, 2)).toHaveValue('00:00:05,000');
    await expect(page.locator('#issues')).toContainText('Metin boş');
    // sil
    await page.locator('#rows li:nth-child(2) [data-act="del"]').click();
    await expect(page.locator('#rows li')).toHaveCount(2);
    await expect(page.locator('#issues-summary')).toContainText('Sorun bulunamadı');
    // metni elle düzenle ve indir
    await textOf(page, 2).fill('Son satır ğüşiöç');
    const { bytes } = await download(page);
    expect(bytes.toString('utf8')).toContain('2\n00:00:06,000 --> 00:00:07,000\nSon satır ğüşiöç\n');
  });

  test("0'ın altına kaydırma sıfırlanır; süresiz satırlar silinir; satır kalmayınca Türkçe hata", async ({ page }) => {
    await open(page);
    await pasteLoad(page, SRT3);
    await page.locator('#shift-sec').fill('-10');
    await page.locator('#apply-shift').click();
    await expect(page.locator('#op-status')).toContainText("0'a sabitlendi");
    await expect(page.locator('#issues')).toContainText('süre sıfır');
    await page.locator('#del-zero').click();
    await expect(page.locator('#rows li')).toHaveCount(0);
    await page.locator('#download').click();
    await expect(page.locator('#out-status')).toContainText('Kaydedilecek satır yok');
  });

  test('bozuk Türkçe karakterleri onar: UTF-8 yanlış okunmuş ve Latin-1 yanlış okunmuş metin', async ({ page }) => {
    await open(page);
    // UTF-8 baytları Windows-1252 sanılarak okunmuş (Ã§, Ä±, ÅŸ …)
    const good = "Şimdi İstanbul'a gidiyoruz, çocuklar ığ öğüt";
    const moj = new TextDecoder('windows-1252').decode(Buffer.from(good, 'utf8'));
    expect(moj).not.toBe(good);
    await pasteLoad(page, `1\n00:00:01,000 --> 00:00:03,000\n${moj}\n`);
    await expect(textOf(page, 1)).toHaveValue(moj);
    await page.locator('#fix-tr').click();
    await expect(page.locator('#fix-status')).toContainText('bozuk karakter onarıldı');
    await expect(textOf(page, 1)).toHaveValue(good);
    // Windows-1254 baytları Latin-1 sanılarak okunmuş (Ý, þ, ð, ý)
    const lat = encode1254('İyi misin? Şimdi geliyorum, çocuklar ığ ğ').toString('latin1');
    await pasteLoad(page, `1\n00:00:01,000 --> 00:00:03,000\n${lat}\n`);
    await page.locator('#fix-tr').click();
    await expect(textOf(page, 1)).toHaveValue('İyi misin? Şimdi geliyorum, çocuklar ığ ğ');
    // Doğru metinde değişiklik yapılmaz
    await page.locator('#fix-tr').click();
    await expect(page.locator('#fix-status')).toContainText('Türkçe karakter izi bulunamadı');
  });

  test('hatalı girişler Türkçe ve çözüm öneren hata verir', async ({ page }) => {
    await open(page);
    // boş yapıştırma
    await page.locator('#load-paste').click();
    await expect(page.locator('#error')).toContainText('Önce altyazı metnini');
    // altyazı olmayan metin
    await pasteLoad(page, 'Bu bir altyazı dosyası değil.\nSadece düz metin.');
    await expect(page.locator('#error')).toContainText('Geçerli bir zaman satırı');
    await expect(page.locator('#error')).toContainText('00:00:01,000 --> 00:00:03,000');
    await expect(page.locator('#editor')).toBeHidden();
    // yanlış uzantı
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'belge.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });
    await expect(page.locator('#error')).toContainText('altyazı dosyası gibi görünmüyor');
    // zamansız .srt dosyası
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bos.srt', mimeType: '', buffer: Buffer.from('merhaba', 'utf8') });
    await expect(page.locator('#error')).toContainText('Geçerli bir zaman satırı');
    // geçerli yükleme sonrası hatalı işlemler
    await pasteLoad(page, SRT3);
    await expect(page.locator('#error')).toBeHidden();
    await page.locator('#apply-shift').click();
    await expect(page.locator('#op-status')).toContainText('saniye olarak yazın');
    await page.locator('#shift-sec').fill('abc');
    await page.locator('#apply-shift').click();
    await expect(page.locator('#op-status')).toContainText('saniye olarak yazın');
    await page.locator('#scope').selectOption('range');
    await page.locator('#shift-sec').fill('1');
    await page.locator('#range-from').fill('5');
    await page.locator('#range-to').fill('2');
    await page.locator('#apply-shift').click();
    await expect(page.locator('#op-status')).toContainText('Satır aralığı 1 ile 3 arasında');
    await page.locator('#fps-preset').selectOption('custom');
    await page.locator('#ratio').fill('7');
    await page.locator('#apply-speed').click();
    await expect(page.locator('#op-status')).toContainText('0,5 ile 2 arasında');
    // geçersiz zaman hücresi
    await startOf(page, 1).fill('1 saat');
    await startOf(page, 1).press('Enter');
    await expect(page.locator('#row-status')).toContainText('geçerli bir zaman değil');
    await expect(startOf(page, 1)).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#issues')).toContainText('Satır 1: Zaman eksik');
    await page.locator('#download').click();
    await expect(page.locator('#out-status')).toContainText('Satır 1 için zaman eksik');
  });

  test('360px genişlikte yatay taşma olmaz ve sayfalama çalışır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await open(page);
    const cues = Array.from({ length: 95 }, (_, i) => `${i + 1}\n00:00:${String(i % 60).padStart(2, '0')},000 --> 00:00:${String(i % 60).padStart(2, '0')},500\nSatır ${i + 1} metni`).join('\n\n');
    await pasteLoad(page, cues);
    await expect(page.locator('#rows li')).toHaveCount(40);
    await expect(page.locator('#page-info')).toContainText('Sayfa 1 / 3');
    await page.locator('#next').click();
    await expect(page.locator('#page-info')).toContainText('Sayfa 2 / 3');
    await expect(page.locator('#rows li').first()).toContainText('Satır 41');
    await page.locator('#next').click();
    await expect(page.locator('#rows li')).toHaveCount(15);
    await expect(page.locator('#next')).toBeDisabled();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
