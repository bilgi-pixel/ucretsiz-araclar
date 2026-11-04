import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests } from './helpers';

// Online Piyano: sayfa yapısı, ses motoru, klavye eşlemesi, oktav, melodi öğren, kayıt/oynat, ayarlar, mobil.
const URL_PATH = '/oyunlar/online-piyano/';
const STORE_KEY = 'ba-oyun-online-piyano';

type Hook = {
  last: string | null; lastFreq: number | null; lastSource: string; played: number; ctxState: string | null;
  octave: number; octaves: number; sound: string; sustain: boolean; recording: boolean; recorded: number;
  recordedNotes: string[]; playing: string | null; active: string[];
  lesson: null | { name: string; pos: number; length: number; wrong: number; done: boolean; target: string | null };
};
const hook = (page: Page) => page.evaluate(() => (window as unknown as { __piyanoTest: () => unknown }).__piyanoTest()) as Promise<Hook>;

// Do majör (C4 oktavı) notalarının bilgisayar tuşu karşılığı
const KEY_FOR: Record<string, string> = {
  C4: 'a', 'C#4': 'w', D4: 's', 'D#4': 'e', E4: 'd', F4: 'f', 'F#4': 't', G4: 'g', 'G#4': 'y', A4: 'h', 'A#4': 'u', B4: 'j',
  C5: 'k', 'C#5': 'o', D5: 'l', 'D#5': 'p', E5: ';',
};

async function open(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL_PATH);
  await expect(page.locator('#keys .pn-key').first()).toBeVisible();
  return errors;
}

test.describe('Online Piyano', () => {
  test('sayfa açılır; ≥900 kelime, 3 reklam (piyano kutusunun dışında), SSS ≥7 ve JSON-LD tamam, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors = await open(page);
    await expect(page.locator('h1')).toContainText('Online Piyano');
    await expect(page).toHaveTitle(/Online Piyano Çal/);
    await expect(page.locator('.ba-hero .ba-badges')).toContainText(/dosya yüklenmez/i);

    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    expect(await page.locator('.ba-content details').count()).toBeGreaterThanOrEqual(7);

    const slots = await page.locator('.ba-ad').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.slot));
    expect(slots).toEqual(['oyun-online-piyano-a', 'oyun-online-piyano-b', 'oyun-online-piyano-c']);
    const placement = await page.evaluate(() => {
      const box = document.getElementById('game-box')!;
      const a = document.querySelector('.ba-ad[data-slot$="-a"]')!;
      return {
        insideBox: Array.from(document.querySelectorAll('.ba-ad')).some((ad) => box.contains(ad)),
        aAfterBox: !!(box.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING),
      };
    });
    expect(placement).toEqual({ insideBox: false, aAfterBox: true });

    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(['VideoGame', 'FAQPage']);
    expect(ld['@graph'][1].mainEntity.length).toBeGreaterThanOrEqual(7);

    // 2 oktav = 14 beyaz + 10 siyah tuş; ses henüz başlamadı (kullanıcı etkileşimi yok)
    expect(await page.locator('#keys .pn-key.white').count()).toBe(14);
    expect(await page.locator('#keys .pn-key.black').count()).toBe(10);
    expect((await hook(page)).ctxState).toBeNull();
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('tuşa tıklayınca AudioContext oluşur ve son çalınan nota bildirilir', async ({ page }) => {
    const errors = await open(page);
    await page.locator('[data-midi="60"]').click();
    const h = await hook(page);
    expect(h.last).toBe('C4');
    expect(h.lastSource).toBe('user');
    expect(h.ctxState, 'AudioContext oluşmalı').not.toBeNull();
    await expect(page.locator('#hud-last')).toHaveText('C4');
    // Siyah tuş: diyez notası
    await page.locator('[data-midi="61"]').click();
    expect((await hook(page)).last).toBe('C#4');
    await expect(page.locator('#hud-last')).toHaveText('C♯4');
    // Bırakınca tuş görünümü söner
    await expect(page.locator('#keys .is-down')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test('bilgisayar klavyesi eşlemesi: A=C4, H=A4 (440 Hz), W=C#4, ; =E5; tuş basılıyken yanar, bırakınca söner', async ({ page }) => {
    const errors = await open(page);
    await page.keyboard.press('a');
    expect((await hook(page)).last).toBe('C4');
    await page.keyboard.press('h');
    let h = await hook(page);
    expect(h.last).toBe('A4');
    expect(h.lastFreq).toBeCloseTo(440, 3);
    await page.keyboard.press('w');
    expect((await hook(page)).last).toBe('C#4');
    await page.keyboard.press(';');
    expect((await hook(page)).last).toBe('E5');

    // Akor: üç tuş birlikte basılı
    await page.keyboard.down('a');
    await page.keyboard.down('d');
    await page.keyboard.down('g');
    h = await hook(page);
    expect(h.active.sort()).toEqual(['C4', 'E4', 'G4']);
    await expect(page.locator('#keys .is-down')).toHaveCount(3);
    await page.keyboard.up('a');
    await page.keyboard.up('d');
    await page.keyboard.up('g');
    await expect(page.locator('#keys .is-down')).toHaveCount(0);
    expect((await hook(page)).active).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('Z ve X oktavı kaydırır; sınırlar aşılmaz; 3 oktav seçeneği 36 tuş gösterir', async ({ page }) => {
    await open(page);
    await expect(page.locator('#hud-range')).toHaveText('C4 – B5');
    await page.keyboard.press('z');
    expect((await hook(page)).octave).toBe(3);
    await expect(page.locator('#hud-range')).toHaveText('C3 – B4');
    await page.keyboard.press('a');
    expect((await hook(page)).last).toBe('C3');
    await page.keyboard.press('x');
    await page.keyboard.press('x');
    expect((await hook(page)).octave).toBe(5);
    await page.keyboard.press('a');
    expect((await hook(page)).last).toBe('C5');

    for (let i = 0; i < 8; i++) await page.keyboard.press('z');
    expect((await hook(page)).octave).toBe(1);
    for (let i = 0; i < 10; i++) await page.keyboard.press('x');
    expect((await hook(page)).octave).toBe(6); // 2 oktavda en çok C6 – B7

    await page.locator('[data-octaves="3"]').click();
    expect(await page.locator('#keys .pn-key').count()).toBe(36);
    expect(await page.locator('#keys .pn-key.white').count()).toBe(21);
    expect((await hook(page)).octave).toBe(5); // 3 oktavda üst sınır C5 – B7
    await page.locator('#btn-oct-down').click();
    expect((await hook(page)).octave).toBe(4);
  });

  test('melodi öğren: sıradaki tuş yanar, yanlış basış ilerletmez, doğru basış ilerletir, melodi tamamlanır', async ({ page }) => {
    const errors = await open(page);
    await page.locator('[data-melody="2"]').click(); // Twinkle, Twinkle
    let h = await hook(page);
    expect(h.lesson).toMatchObject({ name: 'Twinkle, Twinkle, Little Star', pos: 0, wrong: 0, done: false, target: 'C4' });
    await expect(page.locator('#keys .is-target')).toHaveAttribute('data-midi', '60');

    await page.keyboard.press('s'); // yanlış (D4)
    h = await hook(page);
    expect(h.lesson!.pos).toBe(0);
    expect(h.lesson!.wrong).toBe(1);

    await page.keyboard.press('a'); // doğru: C4
    h = await hook(page);
    expect(h.lesson!.pos).toBe(1);
    expect(h.lesson!.target).toBe('C4');
    await page.keyboard.press('a'); // C4 yine
    h = await hook(page);
    expect(h.lesson!.pos).toBe(2);
    expect(h.lesson!.target).toBe('G4');
    await expect(page.locator('#keys .is-target')).toHaveAttribute('data-midi', '67');
    await expect(page.locator('#lesson-status')).toContainText('Adım 3 / 42');

    // Kalan notaları, kancadaki hedefe bakarak çal
    for (let i = 0; i < 60; i++) {
      h = await hook(page);
      if (h.lesson!.done) break;
      await page.keyboard.press(KEY_FOR[h.lesson!.target!]);
    }
    h = await hook(page);
    expect(h.lesson).toMatchObject({ pos: 42, length: 42, done: true, wrong: 1, target: null });
    await expect(page.locator('#lesson-status')).toContainText('Tebrikler');
    await expect(page.locator('#keys .is-target')).toHaveCount(0);

    // Serbest çalmaya dönüş
    await page.locator('#btn-lesson-off').click();
    expect((await hook(page)).lesson).toBeNull();
    expect(errors).toEqual([]);
  });

  test('melodiyi dinle: demo çalar, hedef ilerlemez; seçili melodiye tekrar basınca mod kapanır', async ({ page }) => {
    await open(page);
    await page.locator('[data-melody="0"]').click(); // Do majör gam
    await page.locator('#btn-listen').click();
    await expect.poll(async () => (await hook(page)).playing).toBe('demo');
    await expect.poll(async () => (await hook(page)).last, { timeout: 5000 }).not.toBeNull();
    const h = await hook(page);
    expect(h.lastSource).toBe('seq');
    expect(h.lesson!.pos).toBe(0); // dinlemek ilerleme sayılmaz
    await page.locator('#btn-listen').click(); // durdur
    await expect.poll(async () => (await hook(page)).playing).toBeNull();
    await page.locator('[data-melody="0"]').click();
    expect((await hook(page)).lesson).toBeNull();
  });

  test('kayıt: notalar bellekte kaydedilir, oynat aynı notaları sırayla çalar; sil temizler', async ({ page }) => {
    const errors = await open(page);
    await expect(page.locator('#btn-play')).toBeDisabled();
    await page.locator('#btn-rec').click();
    expect((await hook(page)).recording).toBe(true);
    for (const k of ['a', 's', 'd']) {
      await page.keyboard.press(k, { delay: 40 });
      await page.waitForTimeout(60);
    }
    await page.locator('#btn-rec').click();
    let h = await hook(page);
    expect(h.recording).toBe(false);
    expect(h.recorded).toBe(3);
    expect(h.recordedNotes).toEqual(['C4', 'D4', 'E4']);
    await expect(page.locator('#hud-rec')).toHaveText('3');

    // Kayıt bittikten sonra çalınan nota kayda eklenmez
    await page.keyboard.press('k');
    h = await hook(page);
    expect(h.recorded).toBe(3);
    expect(h.last).toBe('C5');

    await expect(page.locator('#btn-play')).toBeEnabled();
    await page.locator('#btn-play').click();
    await expect.poll(async () => (await hook(page)).lastSource, { timeout: 4000 }).toBe('seq');
    // Oynatma bitince son nota kaydın son notasıdır
    await expect.poll(async () => (await hook(page)).playing, { timeout: 6000 }).toBeNull();
    h = await hook(page);
    expect(h.last).toBe('E4');

    await page.locator('#btn-clear').click();
    h = await hook(page);
    expect(h.recorded).toBe(0);
    await expect(page.locator('#btn-play')).toBeDisabled();
    expect(errors).toEqual([]);
  });

  test('ses tipi, etiketler, sustain ve ses düzeyi ayarları çalışır ve localStorage\'a yazılır, yenilemede korunur', async ({ page }) => {
    await open(page);
    await page.locator('[data-sound="organ"]').click();
    expect((await hook(page)).sound).toBe('organ');
    await page.locator('[data-labels="sol"]').click();
    await expect(page.locator('[data-midi="60"] .pn-lab')).toHaveText('Do4');
    await page.locator('[data-labels="keys"]').click();
    await expect(page.locator('[data-midi="60"] .pn-lab')).toHaveText('A');
    await page.locator('[data-labels="none"]').click();
    await expect(page.locator('[data-midi="60"] .pn-lab')).toHaveText('');
    await page.locator('[data-labels="intl"]').click();
    await expect(page.locator('[data-midi="60"] .pn-lab')).toHaveText('C4');

    await page.locator('#btn-sustain').click();
    await expect(page.locator('#btn-sustain')).toHaveAttribute('aria-pressed', 'true');
    expect((await hook(page)).sustain).toBe(true);
    await page.locator('#opt-volume').fill('40');
    await expect(page.locator('#volume-val')).toHaveText('%40');

    const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), STORE_KEY);
    expect(saved).toMatchObject({ sound: 'organ', labels: 'intl', sustain: true });
    expect(saved.volume).toBeCloseTo(0.4, 2);

    await page.reload();
    await expect(page.locator('[data-sound="organ"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#btn-sustain')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#opt-volume')).toHaveValue('40');
  });

  test('Boşluk basılıyken sustain etkin olur, bırakınca kapanır (odak piyano alanındayken)', async ({ page }) => {
    await open(page);
    await page.locator('#board').focus();
    await page.keyboard.down('Space');
    expect((await hook(page)).sustain).toBe(true);
    await page.keyboard.up('Space');
    expect((await hook(page)).sustain).toBe(false);
  });

  test('dokunmatik: iki parmak aynı anda iki tuş çalar, bırakınca ikisi de söner', async ({ page }) => {
    const errors = await open(page);
    await page.evaluate(() => {
      const fire = (sel: string, type: string, id: number) => {
        const el = document.querySelector(sel)!;
        const r = el.getBoundingClientRect();
        el.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: 'touch', isPrimary: id === 11, clientX: r.left + r.width / 2, clientY: r.top + r.height - 10, bubbles: true, cancelable: true, button: 0 }));
      };
      fire('[data-midi="60"]', 'pointerdown', 11);
      fire('[data-midi="64"]', 'pointerdown', 12);
    });
    expect((await hook(page)).active.sort()).toEqual(['C4', 'E4']);
    await page.evaluate(() => {
      for (const id of [11, 12]) document.dispatchEvent(new PointerEvent('pointerup', { pointerId: id, pointerType: 'touch', bubbles: true }));
    });
    expect((await hook(page)).active).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('bozuk localStorage verisi piyanoyu bozmaz', async ({ page }) => {
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk json'), STORE_KEY);
    const errors = await open(page);
    await page.keyboard.press('a');
    expect((await hook(page)).last).toBe('C4');
    expect((await hook(page)).sound).toBe('piano');
    expect(errors).toEqual([]);
  });

  test('360px: sayfa taşmaz, klavye kendi içinde kaydırılır, dokunmatik tuşlar çalışır', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    const errors = await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const dims = await page.evaluate(() => {
      const b = document.getElementById('board')!;
      return { scroll: b.scrollWidth, client: b.clientWidth, w: Math.round(document.querySelector('#keys .pn-key.white')!.getBoundingClientRect().width) };
    });
    expect(dims.client).toBeLessThanOrEqual(360);
    expect(dims.w).toBeGreaterThanOrEqual(30);
    expect(dims.scroll).toBeGreaterThan(dims.client); // dar ekranda yatay kaydırılır
    await page.locator('[data-midi="60"]').click();
    expect((await hook(page)).last).toBe('C4');
    await page.locator('#btn-oct-up').click();
    expect((await hook(page)).octave).toBe(5);
    expect(errors).toEqual([]);
  });

  test('tam ekran düğmesi piyano kutusunu tam ekran yapar (reklamlar kutunun dışında kalır)', async ({ page }) => {
    await open(page);
    await expect(page.locator('#btn-full')).toBeVisible();
    await page.locator('#btn-full').click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement && document.fullscreenElement.id)).toBe('game-box');
    await page.keyboard.press('Escape');
  });
});
