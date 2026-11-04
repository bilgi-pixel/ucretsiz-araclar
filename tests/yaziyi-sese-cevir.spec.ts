import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

const URL_PATH = '/yaziyi-sese-cevir/';

type FakeVoice = { name: string; lang: string; localService: boolean; default?: boolean; voiceURI?: string };

const VOICES: FakeVoice[] = [
  { name: 'Çevrimiçi Türkçe', lang: 'tr-TR', localService: false },
  { name: 'Yerel English', lang: 'en-US', localService: true },
  { name: 'Yerel Türkçe', lang: 'tr-TR', localService: true },
];

/** Sahte konuşma sentezi: speak çağrılarını kaydeder, olayları testler elle tetikler. */
async function installFake(page: Page, voices: FakeVoice[] = VOICES) {
  await page.addInitScript((vs) => {
    const w = window as any;
    const log = { spoken: [] as any[], pause: 0, resume: 0, cancel: 0, current: null as any };
    w.__tts = log;
    class FakeUtterance {
      text: string; lang = ''; voice: any = null; rate = 1; pitch = 1; volume = 1;
      onstart: any = null; onboundary: any = null; onend: any = null; onerror: any = null;
      constructor(t: string) { this.text = t; }
    }
    w.SpeechSynthesisUtterance = FakeUtterance;
    const synth: any = new EventTarget();
    synth.getVoices = () => vs;
    synth.speak = (u: any) => {
      log.spoken.push({ text: u.text, rate: u.rate, pitch: u.pitch, volume: u.volume, lang: u.lang, voice: u.voice && u.voice.name });
      log.current = u;
      if (u.onstart) u.onstart({});
    };
    synth.pause = () => { log.pause++; };
    synth.resume = () => { log.resume++; };
    synth.cancel = () => { log.cancel++; log.current = null; };
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: synth });
    w.__fire = {
      boundary: (charIndex: number, charLength: number) => log.current.onboundary({ name: 'word', charIndex, charLength }),
      end: () => log.current.onend({}),
    };
  }, voices);
}

const spoken = (page: Page) => page.evaluate(() => (window as any).__tts.spoken as any[]);
const calls = (page: Page) => page.evaluate(() => { const t = (window as any).__tts; return { pause: t.pause, resume: t.resume, cancel: t.cancel }; });
const fire = (page: Page, kind: 'boundary' | 'end', ...args: number[]) =>
  page.evaluate(([k, a]) => (window as any).__fire[k as string](...(a as number[])), [kind, args] as [string, number[]]);

test.describe('Yazıyı Sese Çevir', () => {
  test('sayfa şartları: içerik, SSS, reklam, JSON-LD, 360 px, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await installFake(page);
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await expect(page.locator('h1')).toContainText('Yazıyı Sese Çevir');
    await expect(page.getByText('dosya yüklenmez').first()).toBeAttached();
    expect(await page.locator('.ba-content').evaluate((el) => (el.textContent || '').trim().split(/\s+/).length)).toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);
    const ads = page.locator('.ba-ad[data-slot^="yaziyi-sese-cevir-"]');
    expect(await ads.count()).toBe(3);
    expect(await ads.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot))).toEqual(['yaziyi-sese-cevir-a', 'yaziyi-sese-cevir-b', 'yaziyi-sese-cevir-c']);
    // Reklam A araç kutusunun hemen altında
    const toolBottom = await page.locator('#ys-box').evaluate((el) => el.getBoundingClientRect().bottom + window.scrollY);
    const adTop = await ads.first().evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    expect(adTop).toBeGreaterThanOrEqual(toolBottom);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || '{}')));
    expect(ld.some((j) => j['@type'] === 'SoftwareApplication')).toBe(true);
    const faq = ld.find((j) => j['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('yalnızca cihaz içi sesler listelenir; Türkçe önce gelir', async ({ page }) => {
    await installFake(page);
    await page.goto(URL_PATH);
    const options = page.locator('#voice option');
    await expect(options).toHaveCount(2);
    const texts = await options.allTextContents();
    expect(texts.join('|')).not.toContain('Çevrimiçi');
    expect(texts[0]).toContain('Yerel Türkçe');
    await expect(page.locator('#voice')).toHaveValue('0');
    await expect(page.locator('#novoice')).toBeHidden();
    await expect(page.locator('#play')).toBeEnabled();
  });

  test('okuma yerel sesle başlar; hız, perde ve ses seviyesi iletilir', async ({ page }) => {
    await installFake(page);
    await page.goto(URL_PATH);
    await page.locator('#text').fill('Merhaba dünya.');
    await page.locator('#rate').fill('1.5');
    await page.locator('#pitch').fill('0.8');
    await page.locator('#volume').fill('0.5');
    await expect(page.locator('#rate-out')).toHaveText('1,5×');
    await page.locator('#play').click();
    const list = await spoken(page);
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({ text: 'Merhaba dünya.', rate: 1.5, pitch: 0.8, volume: 0.5, lang: 'tr-TR', voice: 'Yerel Türkçe' });
    await expect(page.locator('#status')).toContainText('Okunuyor');
  });

  test('uzun metin cümlelere bölünür ve sırayla okunur; çok uzun cümle 200 karakteri aşmaz', async ({ page }) => {
    await installFake(page);
    await page.goto(URL_PATH);
    await page.locator('#text').fill('Birinci cümle burada. İkinci cümle ise soru mu? Üçüncü cümle ünlemle biter! Fiyat 3.5 lira oldu.\nSon satır noktasız');
    await page.locator('#play').click();
    for (let i = 1; i <= 4; i++) {
      await expect.poll(async () => (await spoken(page)).length).toBe(i);
      await fire(page, 'end');
    }
    await expect.poll(async () => (await spoken(page)).length).toBe(5);
    const list = await spoken(page);
    expect(list.map((s) => s.text)).toEqual([
      'Birinci cümle burada.', 'İkinci cümle ise soru mu?', 'Üçüncü cümle ünlemle biter!', 'Fiyat 3.5 lira oldu.', 'Son satır noktasız',
    ]);
    await fire(page, 'end');
    await expect(page.locator('#status')).toHaveText('Okuma bitti');
    await expect(page.locator('#play')).toBeEnabled();

    // Noktasız, 600+ karakterlik tek cümle
    const long = Array.from({ length: 90 }, (_, i) => `kelime${i}`).join(' ');
    await page.locator('#text').fill(long);
    await page.locator('#play').click();
    let n = 5;
    for (let i = 0; i < 20; i++) {
      await expect.poll(async () => (await spoken(page)).length).toBe(n + 1);
      n++;
      await fire(page, 'end');
      if ((await page.locator('#status').textContent()) === 'Okuma bitti') break;
    }
    const all = await spoken(page);
    const chunks = all.slice(5).map((s) => s.text);
    expect(chunks.length).toBeGreaterThanOrEqual(3);
    for (const c of chunks) expect(c.length).toBeLessThanOrEqual(200);
    expect(chunks.join(' ').replace(/\s+/g, ' ').startsWith('kelime0 kelime1')).toBe(true);
  });

  test('okunan kelime vurgulanır (onboundary)', async ({ page }) => {
    await installFake(page);
    await page.goto(URL_PATH);
    await page.locator('#text').fill('Merhaba dünya. İkinci cümle.');
    await page.locator('#play').click();
    await expect(page.locator('#reader')).toBeVisible();
    await fire(page, 'boundary', 8, 5);
    await expect(page.locator('#r-cur')).toHaveText('dünya');
    await expect(page.locator('#r-before')).toHaveText('Merhaba ');
    await fire(page, 'end');
    await fire(page, 'boundary', 7, 5);
    await expect(page.locator('#r-cur')).toHaveText('cümle');
  });

  test('duraklat, devam et ve durdur çalışır; Ctrl+Enter ve Esc kısayolları', async ({ page }) => {
    await installFake(page);
    await page.goto(URL_PATH);
    await page.locator('#text').fill('Bir deneme metni okunuyor.');
    await expect(page.locator('#pause')).toBeDisabled();
    await page.locator('#play').click();
    await page.locator('#pause').click();
    expect((await calls(page)).pause).toBe(1);
    await expect(page.locator('#pause')).toHaveText('Devam et');
    await expect(page.locator('#status')).toHaveText('Duraklatıldı');
    await page.locator('#pause').click();
    expect((await calls(page)).resume).toBe(1);
    await expect(page.locator('#pause')).toHaveText('Duraklat');
    const before = (await calls(page)).cancel;
    await page.locator('#stop').click();
    expect((await calls(page)).cancel).toBeGreaterThan(before);
    await expect(page.locator('#status')).toHaveText('Durduruldu');
    await expect(page.locator('#play')).toBeEnabled();
    await expect(page.locator('#reader')).toBeHidden();

    // Metin kutusundayken Ctrl+Enter başlatır, Esc durdurur
    await page.locator('#text').focus();
    await page.keyboard.press('Control+Enter');
    await expect(page.locator('#status')).toContainText('Okunuyor');
    await page.keyboard.press('Escape');
    await expect(page.locator('#status')).toHaveText('Durduruldu');
  });

  test('okuma sürerken hız değişirse o kelimeden yeni hızla devam eder', async ({ page }) => {
    await installFake(page);
    await page.goto(URL_PATH);
    await page.locator('#text').fill('Bir iki üç dört beş.');
    await page.locator('#play').click();
    await fire(page, 'boundary', 4, 3);
    await page.locator('#rate').fill('1.8');
    await expect.poll(async () => (await spoken(page)).length).toBe(2);
    const list = await spoken(page);
    expect(list[1].text).toBe('iki üç dört beş.');
    expect(list[1].rate).toBe(1.8);
  });

  test('cihaz içi ses yoksa gizlilik uyarısı çıkar ve okuma kapalı kalır', async ({ page }) => {
    await installFake(page, [{ name: 'Çevrimiçi Türkçe', lang: 'tr-TR', localService: false }]);
    await page.goto(URL_PATH);
    await expect(page.locator('#novoice')).toBeVisible();
    await expect(page.locator('#novoice')).toContainText('Tarayıcınızda cihaz içi ses yok');
    await expect(page.locator('#novoice')).toContainText('sunucuya');
    await expect(page.locator('#novoice')).toContainText('Ayarlar > Zaman ve dil > Konuşma');
    await expect(page.locator('#novoice')).toContainText('Konuşulan İçerik');
    await expect(page.locator('#play')).toBeDisabled();
    expect(await spoken(page)).toHaveLength(0);
  });

  test('hiç ses gelmezse bekleme sonrası uyarı çıkar', async ({ page }) => {
    await installFake(page, []);
    await page.goto(URL_PATH);
    await expect(page.locator('#novoice')).toBeVisible({ timeout: 6000 });
    await expect(page.locator('#play')).toBeDisabled();
  });

  test('.txt dosyası bellekte açılır (UTF-8 ve Windows-1254); hatalı dosya Türkçe hata verir', async ({ page }) => {
    const external = trackExternalRequests(page);
    await installFake(page);
    await page.goto(URL_PATH);
    await page.locator('#file').setInputFiles({ name: 'not.txt', mimeType: 'text/plain', buffer: Buffer.from('Çok güzel bir gün. Işık geliyor.', 'utf8') });
    await expect(page.locator('#text')).toHaveValue('Çok güzel bir gün. Işık geliyor.');
    await expect(page.locator('#count')).toContainText('6 kelime');

    // Eski Türkçe kodlama: I ş ı k  →  0x49 0xFE 0xFD 0x6B
    await page.locator('#file').setInputFiles({ name: 'eski.txt', mimeType: 'text/plain', buffer: Buffer.from([0x49, 0xfe, 0xfd, 0x6b]) });
    await expect(page.locator('#text')).toHaveValue('Işık');

    await page.locator('#file').setInputFiles({ name: 'belge.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });
    await expect(page.locator('#error')).toContainText('.txt');
    await page.locator('#file').setInputFiles({ name: 'bos.txt', mimeType: 'text/plain', buffer: Buffer.from('   ') });
    await expect(page.locator('#error')).toContainText('boş');
    await page.locator('#text').fill('');
    await page.locator('#play').click();
    await expect(page.locator('#error')).toContainText('Okunacak metin yok');
    expect(external).toEqual([]);
  });

  test('konuşma sentezi olmayan tarayıcıda açık uyarı verir', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => { delete (Window.prototype as any).speechSynthesis; try { delete (window as any).speechSynthesis; } catch { /* yoksay */ } });
    await page.goto(URL_PATH);
    await expect(page.locator('#nosynth')).toBeVisible();
    await expect(page.locator('#play')).toBeDisabled();
    expect(errors).toEqual([]);
  });
});
