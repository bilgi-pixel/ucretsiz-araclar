import { test, expect, Page } from '@playwright/test';
import { deflateSync } from 'node:zlib';
import { PNG } from 'pngjs';
import { fx, trackExternalRequests } from './helpers';

// Yapboz doğrulaması: parça sürükleme (fare ve dokunmatik pointer olayları), kilitlenme, yer değiştirme,
// tamamlama ve en iyi süre, dokun-seç ve klavye ile yerleştirme, önizleme, fotoğraf yükleme, bozuk/büyük dosya hatası,
// bozuk localStorage, hareketi azalt, mobil taşma, dış istek yok.
const URL_PATH = '/oyunlar/yapboz/';
const KEY = 'ba-oyun-yapboz';

type Piece = { id: number; target: { r: number; c: number }; where: 'tray' | 'slot'; slot: number | null; locked: boolean };
type State = {
  n: number; image: string; ready: boolean; slots: (number | null)[]; tray: number[]; pieces: Piece[];
  remaining: number; moves: number; done: boolean; elapsed: number; selected: number | null;
  record: { time: number; moves: number; newBest: boolean; key: string } | null;
};

const getState = (page: Page) => page.evaluate(() => (window as unknown as { __yapbozTest: () => unknown }).__yapbozTest()) as Promise<State>;
const piece = (page: Page, id: number) => page.locator(`.yb-piece[data-id="${id}"]`);
const slot = (page: Page, i: number) => page.locator(`.yb-slot[data-cell="${i}"]`);

async function open(page: Page, height = 1900) {
  await page.setViewportSize({ width: 1280, height });
  await page.goto(URL_PATH);
  await expect(page.locator('#board')).toHaveAttribute('data-ready', '1');
  await expect(page.locator('.yb-piece').first()).toBeVisible();
}

async function chooseSize(page: Page, n: number) {
  await page.locator(`[data-size-btn="${n}"]`).click();
  await expect(page.locator('#board')).toHaveAttribute('data-n', String(n));
  await expect(page.locator('.yb-slot')).toHaveCount(n * n);
  await expect(page.locator('.yb-piece')).toHaveCount(n * n);
}

const center = (b: { x: number; y: number; width: number; height: number }) => ({ x: b.x + b.width / 2, y: b.y + b.height / 2 });

/** Parçayı fareyle tutup hedef kutunun merkezine bırakır. */
async function dragTo(page: Page, id: number, targetSelector: string) {
  const pb = center((await piece(page, id).boundingBox())!);
  const tb = center((await page.locator(targetSelector).boundingBox())!);
  await page.mouse.move(pb.x, pb.y);
  await page.mouse.down();
  await page.mouse.move(tb.x, tb.y, { steps: 5 });
  await page.mouse.up();
}
const dragToSlot = (page: Page, id: number, cell: number) => dragTo(page, id, `.yb-slot[data-cell="${cell}"]`);

async function solveAll(page: Page) {
  const st = await getState(page);
  for (const id of [...st.tray]) await dragToSlot(page, id, id);
}

/** Küçük, geçerli bir PNG (pngjs ile üretilir). */
function tinyPng(w: number, h: number): Buffer {
  const png = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    png.data[i] = (x * 60) % 256; png.data[i + 1] = (y * 60) % 256; png.data[i + 2] = 180; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

/** Başlığı büyük ama sıkıştırılmış (≈ onlarca KB) 1 bit gri PNG: yalnızca boyut sınırını sınamak için. */
function hugeDimensionsPng(w: number, h: number): Buffer {
  const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (buf: Buffer) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type: string, data: Buffer) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 1; ihdr[9] = 0; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const row = Buffer.alloc(1 + Math.ceil(w / 8)); // filtre baytı + sıfırlar
  const raw = Buffer.concat(Array.from({ length: h }, () => row));
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

test.describe('Yapboz', () => {
  test('sayfa açılır, yapboz hazır, içerik/reklam/SSS/JSON-LD tamam, dış istek ve sayfa hatası yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    await expect(page.locator('h1')).toContainText('Yapboz');
    const st = await getState(page);
    expect(st.n).toBe(4);
    expect(st.image).toBe('gunbatimi');
    expect(st.tray.length).toBe(16);
    expect(st.slots.every((s) => s === null)).toBe(true);
    expect([...st.tray].sort((a, b) => a - b)).toEqual(Array.from({ length: 16 }, (_, i) => i));
    expect(st.tray.join()).not.toBe(Array.from({ length: 16 }, (_, i) => i).join()); // karışık
    expect(st.pieces[5].target).toEqual({ r: 1, c: 1 });
    await expect(page.locator('#tray .yb-piece')).toHaveCount(16);
    await expect(page.locator('#slots .yb-slot')).toHaveCount(16);
    await expect(page.locator('#remaining')).toHaveText('16');
    await expect(page.locator('#moves')).toHaveText('0');
    await expect(page.locator('#time')).toHaveText('00:00');
    await expect(page.locator('#best')).toHaveText('—');
    await expect(page.locator('#btn-full')).toBeVisible();
    // Görsel canvas'tan blob olarak gelir (dış dosya yok) ve parçalarda kullanılır.
    const bg = await piece(page, st.tray[0]).evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(bg).toContain('blob:');
    const thumb = await page.locator('#thumb').evaluate((el) => (el as HTMLElement).style.getPropertyValue('--img'));
    expect(thumb).toContain('blob:');
    // Reklamlar
    expect(await page.locator('.ba-ad').count()).toBe(3);
    expect(await page.locator('.game-box .ba-ad').count()).toBe(0);
    const boxBottom = (await page.locator('#game-box').boundingBox())!;
    const adTop = (await page.locator('[data-slot="oyun-yapboz-a"]').boundingBox())!;
    expect(adTop.y).toBeGreaterThan(boxBottom.y + boxBottom.height + 90);
    for (const s of ['a', 'b', 'c']) expect(await page.locator(`[data-slot="oyun-yapboz-${s}"]`).count()).toBe(1);
    const details = await page.locator('details').count();
    expect(details).toBeGreaterThanOrEqual(7);
    const words = (await page.locator('.ba-content').innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'kelime sayısı').toBeGreaterThanOrEqual(900);
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}');
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('VideoGame');
    const faq = ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(7);
    expect(faq.mainEntity.length).toBe(details);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('dört boyut ve üç örnek görsel: parça/kare sayıları doğru, görsel değişince yapboz yenilenir', async ({ page }) => {
    await open(page);
    for (const n of [3, 4, 5, 6]) {
      await chooseSize(page, n);
      await expect(page.locator('#remaining')).toHaveText(String(n * n));
      await expect(page.locator('#tray .yb-piece')).toHaveCount(n * n);
      expect(await page.locator('#area').evaluate((el) => (el as HTMLElement).style.getPropertyValue('--n'))).toBe(String(n));
    }
    const urls = new Set<string>();
    for (const id of ['gunbatimi', 'desen', 'sehir']) {
      await page.locator(`[data-sample="${id}"]`).click();
      await expect(page.locator('#area')).toHaveAttribute('data-image', id);
      await expect(page.locator(`[data-sample="${id}"]`)).toHaveAttribute('aria-pressed', 'true');
      urls.add(await page.locator('#thumb').evaluate((el) => (el as HTMLElement).style.getPropertyValue('--img')));
      expect((await getState(page)).moves).toBe(0);
    }
    expect(urls.size).toBe(3); // üç görsel birbirinden farklı
    const stored = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), KEY))!);
    expect(stored.size).toBe(6);
    expect(stored.image).toBe('sehir');
  });

  test('parçayı doğru kareye sürüklemek kilitler: parlar, sayaçlar güncellenir, kilitli parça taşınamaz', async ({ page }) => {
    await open(page);
    const st = await getState(page);
    const id = st.tray[0];
    await expect(page.locator('#time')).toHaveText('00:00');
    await dragToSlot(page, id, id);
    const p = piece(page, id);
    await expect(p).toHaveClass(/locked/);
    await expect(p).toHaveClass(/glow/);
    await expect(slot(page, id).locator('.yb-piece')).toHaveCount(1);
    await expect(page.locator('#remaining')).toHaveText('15');
    await expect(page.locator('#moves')).toHaveText('1');
    await expect(page.locator('#status')).toContainText('Doğru yer');
    const after = await getState(page);
    expect(after.pieces[id].locked).toBe(true);
    expect(after.pieces[id].slot).toBe(id);
    expect(after.slots[id]).toBe(id);
    await expect(page.locator('#time')).not.toHaveText('00:00', { timeout: 4000 }); // süre ilk hamleyle başladı
    // Kilitli parça başka kareye sürüklenemez; sayaçlar değişmez.
    const other = id === 0 ? 1 : 0;
    await dragToSlot(page, id, other);
    await expect(p).toHaveClass(/locked/);
    expect((await getState(page)).slots[id]).toBe(id);
    await expect(page.locator('#moves')).toHaveText('1');
    // Dolu ve kilitli kareye başka parça bırakılamaz.
    const next = (await getState(page)).tray[0];
    await dragToSlot(page, next, id);
    await expect(page.locator('#status')).toContainText('kilitli');
    expect((await getState(page)).slots[id]).toBe(id);
    expect((await getState(page)).pieces[next].where).toBe('tray');
  });

  test('yanlış kareye bırakılan parça kilitlenmez; yer değiştirme ve tepsiye geri alma çalışır', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    const st = await getState(page);
    const [a, b] = st.tray; // iki farklı tepsi parçası
    const wrong = (a + 1) % 9 === b ? (a + 2) % 9 : (a + 1) % 9; // a'nın doğru karesi olmayan bir kare
    await dragToSlot(page, a, wrong);
    let s = await getState(page);
    expect(s.pieces[a].where).toBe('slot');
    expect(s.pieces[a].slot).toBe(wrong);
    expect(s.pieces[a].locked).toBe(false);
    await expect(page.locator('#status')).toContainText('doğru yer değil');
    await expect(piece(page, a)).not.toHaveClass(/locked/);
    await expect(page.locator('#remaining')).toHaveText('9');
    await expect(page.locator('#moves')).toHaveText('1');
    // Tepsiden gelen b, a'nın bulunduğu kareye bırakılırsa a tepsiye döner.
    if (b !== wrong) {
      await dragToSlot(page, b, wrong);
      s = await getState(page);
      expect(s.pieces[b].slot).toBe(wrong);
      expect(s.pieces[a].where).toBe('tray');
      await expect(page.locator('#tray .yb-piece')).toHaveCount(8);
    }
    // Kare parçayı tepsiye geri bırakma
    const holder = (await getState(page)).slots.findIndex((v) => v !== null);
    const held = (await getState(page)).slots[holder]!;
    await dragTo(page, held, '#tray');
    s = await getState(page);
    expect(s.pieces[held].where).toBe('tray');
    await expect(page.locator('#tray .yb-piece')).toHaveCount(9);
  });

  test('iki tahta parçası yer değiştirince ikisi de doğru yere düşerse ikisi de kilitlenir', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    // Parça 0'ı 1. kareye, parça 1'i 0. kareye koy (ikisi de yanlış), sonra 1. kareden 0. kareye sürükle.
    await dragToSlot(page, 0, 1);
    await dragToSlot(page, 1, 0);
    let s = await getState(page);
    expect(s.slots[0]).toBe(1);
    expect(s.slots[1]).toBe(0);
    expect(s.remaining).toBe(9);
    await dragToSlot(page, 0, 0); // 0 numaralı parça 1. karedeydi; 0. karedeki 1 numaralı parçayla yer değiştirir
    s = await getState(page);
    expect(s.slots[0]).toBe(0);
    expect(s.slots[1]).toBe(1);
    expect(s.pieces[0].locked && s.pieces[1].locked).toBe(true);
    await expect(page.locator('#remaining')).toHaveText('7');
    await expect(page.locator('#moves')).toHaveText('3');
    await expect(page.locator('#status')).toContainText('yer değiştirdi');
  });

  test('tüm parçalar yerleşince tamamlanır: süre durur, bütün resim görünür, en iyi süre localStorage\'a yazılır', async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript((k) => {
      if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ size: 3, image: 'desen', best: { '3': { time: 99999999, moves: 2 } } }));
    }, KEY);
    await open(page);
    await expect(page.locator('#board')).toHaveAttribute('data-n', '3');
    await expect(page.locator('#area')).toHaveAttribute('data-image', 'desen');
    await expect(page.locator('#best')).not.toHaveText('—');
    await solveAll(page);
    await expect(page.locator('#board')).toHaveAttribute('data-solved', 'true');
    await expect(page.locator('#remaining')).toHaveText('0');
    await expect(page.locator('#moves')).toHaveText('9');
    await expect(page.locator('#status')).toContainText('Tebrikler');
    await expect(page.locator('#status')).toContainText('Yeni en iyi süre');
    await expect(page.locator('#preview')).toBeVisible(); // dikişsiz tamamlanmış resim
    await expect(page.locator('#preview')).toHaveClass(/final/);
    const st = await getState(page);
    expect(st.done).toBe(true);
    expect(st.record).not.toBeNull();
    expect(st.record!.newBest).toBe(true);
    expect(st.record!.moves).toBe(9);
    const stored = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), KEY))!);
    expect(stored.best['3'].time).toBe(st.record!.time);
    expect(stored.best['3'].time).toBeLessThan(99999999);
    expect(stored.best['3'].moves).toBe(2); // daha az hamlelik eski rekor korunur
    await expect(page.locator('#best')).not.toHaveText('—');
    // Kutlama: konfeti oluşur (hareketi azalt kapalıyken)
    expect(await page.locator('#confetti i').count()).toBeGreaterThan(10);
    // Süre durdu.
    const t1 = (await getState(page)).elapsed;
    await page.waitForTimeout(600);
    expect((await getState(page)).elapsed).toBe(t1);
    // Tamamlanmış yapbozda parça sürüklenemez; yeniden karıştırma her şeyi sıfırlar.
    await page.locator('#btn-shuffle').click();
    await expect(page.locator('#board')).toHaveAttribute('data-solved', 'false');
    await expect(page.locator('#preview')).toBeHidden();
    await expect(page.locator('#remaining')).toHaveText('9');
    await expect(page.locator('#moves')).toHaveText('0');
    await expect(page.locator('#time')).toHaveText('00:00');
    await expect(page.locator('#best')).not.toHaveText('—');
  });

  test('hareketi azalt tercihinde kutlama konfetisi ve parlama animasyonu çalışmaz', async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page);
    await chooseSize(page, 3);
    const first = (await getState(page)).tray[0];
    await dragToSlot(page, first, first);
    await expect(piece(page, first)).toHaveClass(/locked/);
    await expect(piece(page, first)).not.toHaveClass(/glow/);
    await solveAll(page);
    await expect(page.locator('#board')).toHaveAttribute('data-solved', 'true');
    expect(await page.locator('#confetti i').count()).toBe(0);
    expect(await page.locator('#preview').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  });

  test('dokunmatik pointer olaylarıyla sürükleme: parça yerine oturur, kısa dokunma parçayı seçer', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    const st = await getState(page);
    const id = st.tray[0];
    const pb = center((await piece(page, id).boundingBox())!);
    const tb = center((await slot(page, id).boundingBox())!);
    await page.evaluate(({ id, from, to }) => {
      const el = document.querySelector(`.yb-piece[data-id="${id}"]`)!;
      const ev = (type: string, x: number, y: number) => new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 41, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, button: 0, buttons: type === 'pointerup' ? 0 : 1 });
      el.dispatchEvent(ev('pointerdown', from.x, from.y));
      for (let i = 1; i <= 6; i++) el.dispatchEvent(ev('pointermove', from.x + ((to.x - from.x) * i) / 6, from.y + ((to.y - from.y) * i) / 6));
      el.dispatchEvent(ev('pointerup', to.x, to.y));
    }, { id, from: pb, to: tb });
    await expect(piece(page, id)).toHaveClass(/locked/);
    expect((await getState(page)).slots[id]).toBe(id);
    // Küçük hareket = dokunma: parça seçilir.
    const next = (await getState(page)).tray[0];
    const nb = center((await piece(page, next).boundingBox())!);
    await page.evaluate(({ id, p }) => {
      const el = document.querySelector(`.yb-piece[data-id="${id}"]`)!;
      const ev = (type: string, x: number, y: number) => new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 42, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, button: 0, buttons: type === 'pointerup' ? 0 : 1 });
      el.dispatchEvent(ev('pointerdown', p.x, p.y));
      el.dispatchEvent(ev('pointerup', p.x + 1, p.y + 1));
    }, { id: next, p: nb });
    expect((await getState(page)).selected).toBe(next);
    await expect(piece(page, next)).toHaveClass(/selected/);
  });

  test('dokun-seç-yerleştir: parçaya, sonra kareye tıklamak parçayı yerleştirir', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    const st = await getState(page);
    const [a, b] = st.tray;
    await piece(page, a).click();
    expect((await getState(page)).selected).toBe(a);
    await expect(piece(page, a)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#status')).toContainText(`Parça ${a + 1} seçildi`);
    await piece(page, a).click(); // yeniden dokunma seçimi kaldırır
    expect((await getState(page)).selected).toBeNull();
    await piece(page, a).click();
    await slot(page, a).click();
    await expect(piece(page, a)).toHaveClass(/locked/);
    expect((await getState(page)).selected).toBeNull();
    await expect(page.locator('#moves')).toHaveText('1');
    // Yanlış kare + tahtadaki parçayı seçip başka kareye taşıma
    const wrong = [0, 1, 2, 3, 4, 5, 6, 7, 8].find((c) => c !== a && c !== b)!;
    await piece(page, b).click();
    await slot(page, wrong).click();
    expect((await getState(page)).pieces[b].slot).toBe(wrong);
    const dest = [0, 1, 2, 3, 4, 5, 6, 7, 8].find((c) => c !== a && c !== b && c !== wrong)!;
    await slot(page, wrong).click(); // tahtadaki parçayı seç
    expect((await getState(page)).selected).toBe(b);
    await slot(page, dest).click();
    expect((await getState(page)).pieces[b].slot).toBe(dest);
  });

  test('klavye: Tab ile tepsiye girilir, ok tuşlarıyla parça seçilir, Enter alır, ok tuşlarıyla kareye gidip Enter bırakır; Escape iptal eder', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    // Tepsi ve tahta birer Tab durağıdır (gezinme düğümü).
    await expect(page.locator('#tray .yb-piece[tabindex="0"]')).toHaveCount(1);
    await expect(page.locator('#slots .yb-slot[tabindex="0"]')).toHaveCount(1);
    const st = await getState(page);
    const first = st.tray[0];
    await piece(page, first).focus();
    await page.keyboard.press('ArrowRight');
    await expect(piece(page, st.tray[1])).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(piece(page, first)).toBeFocused();
    // Escape ile iptal
    await page.keyboard.press('Enter');
    expect((await getState(page)).selected).toBe(first);
    await expect(page.locator('#slots .yb-slot:focus')).toHaveCount(1); // odak tahtaya geçti
    await page.keyboard.press('Escape');
    expect((await getState(page)).selected).toBeNull();
    await expect(piece(page, first)).toBeFocused();
    // Seç, hedef kareye git, bırak
    await page.keyboard.press('Enter');
    const target = first; // doğru kare numarası = parça numarası
    const tr = Math.floor(target / 3); const tc = target % 3;
    for (let i = 0; i < tr; i++) await page.keyboard.press('ArrowDown');
    for (let i = 0; i < tc; i++) await page.keyboard.press('ArrowRight');
    await expect(slot(page, target)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(piece(page, first)).toHaveClass(/locked/);
    await expect(page.locator('#moves')).toHaveText('1');
    await expect(slot(page, target)).toHaveAttribute('aria-label', /doğru parça yerleşti/);
    // Dolu kilitli kareye Enter uyarı verir
    await page.keyboard.press('Enter');
    await expect(page.locator('#status')).toContainText('kilitli');
  });

  test('önizleme göster: tamamlanmış resmi tahtanın üstünde gösterir, sürüklemeye başlayınca kapanır', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    await expect(page.locator('#preview')).toBeHidden();
    await page.locator('#btn-preview').click();
    await expect(page.locator('#preview')).toBeVisible();
    await expect(page.locator('#btn-preview')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#btn-preview')).toHaveText('Önizlemeyi gizle');
    expect(await page.locator('#preview-img').getAttribute('src')).toContain('blob:');
    await page.locator('#btn-preview').click();
    await expect(page.locator('#preview')).toBeHidden();
    await expect(page.locator('#btn-preview')).toHaveText('Önizleme göster');
    // Açıkken bir parça sürüklenirse önizleme kapanır ve tahta görünür olur.
    await page.locator('#btn-preview').click();
    await expect(page.locator('#preview')).toBeVisible();
    const id = (await getState(page)).tray[0];
    await dragToSlot(page, id, id);
    await expect(page.locator('#preview')).toBeHidden();
    await expect(piece(page, id)).toHaveClass(/locked/);
  });

  test('kendi fotoğrafınızı yükleme: PNG dosyası ve küçük PNG parçalara bölünür, dış istek yoktur', async ({ page }) => {
    const external = trackExternalRequests(page);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await open(page);
    const before = await page.locator('#thumb').evaluate((el) => (el as HTMLElement).style.getPropertyValue('--img'));
    await page.locator('#photo').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#photo-note')).toContainText('kırpıldı');
    await expect(page.locator('#area')).toHaveAttribute('data-image', 'foto');
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    const after = await page.locator('#thumb').evaluate((el) => (el as HTMLElement).style.getPropertyValue('--img'));
    expect(after).toContain('blob:');
    expect(after).not.toBe(before);
    await expect(page.locator('#moves')).toHaveText('0');
    await expect(page.locator('#tray .yb-piece')).toHaveCount(16);
    const bg = await page.locator('.yb-piece').first().evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(bg).toContain('blob:');
    // Fotoğrafla da oynanır.
    const id = (await getState(page)).tray[0];
    await dragToSlot(page, id, id);
    await expect(piece(page, id)).toHaveClass(/locked/);
    // Çok küçük (4×4) geçerli bir PNG de açılır; resim büyütülerek parçalanır.
    await page.locator('#photo').setInputFiles({ name: 'minik.png', mimeType: 'image/png', buffer: tinyPng(4, 4) });
    await expect(page.locator('#photo-note')).toContainText('minik.png');
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#moves')).toHaveText('0'); // yeni fotoğraf yapbozu sıfırladı
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('resim olmayan, bozuk ya da aşırı büyük dosya Türkçe, çözüm öneren hata verir; oyun bozulmaz', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    await page.locator('#photo').setInputFiles(fx('bozuk.pdf'));
    await expect(page.locator('#error')).toHaveClass(/is-active/);
    await expect(page.locator('#error')).toContainText('resim değil');
    await expect(page.locator('#error')).toContainText('JPG');
    // Resim uzantılı ama içeriği bozuk dosya
    await page.locator('#photo').setInputFiles({ name: 'foto.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error')).toContainText('görüntü olarak açılamadı');
    await expect(page.locator('#error')).toContainText('JPG, PNG veya WebP');
    // 200 MB'dan büyük dosya (gerçek dosya üretmeden, boyutu bildiren sahte dosya nesnesiyle)
    await page.evaluate(() => (window as unknown as { __yapbozTest: { loadFile: (f: unknown) => Promise<boolean> } }).__yapbozTest.loadFile({ name: 'dev.png', type: 'image/png', size: 300 * 1024 * 1024 }));
    await expect(page.locator('#error')).toContainText('çok büyük');
    await expect(page.locator('#error')).toContainText('200 MB');
    // Başlığı 12000×12000 piksel diyen (≈144 megapiksel) küçük dosya
    await page.locator('#photo').setInputFiles({ name: 'dev-piksel.png', mimeType: 'image/png', buffer: hugeDimensionsPng(12000, 12000) });
    await expect(page.locator('#error')).toContainText('çok büyük', { timeout: 20_000 });
    await expect(page.locator('#error')).toContainText('megapiksel');
    // Oyun hâlâ çalışır: örnek görsel aynı kalmıştır, parça sürüklenebilir
    await expect(page.locator('#area')).toHaveAttribute('data-image', 'gunbatimi');
    const id = (await getState(page)).tray[0];
    await dragToSlot(page, id, id);
    await expect(piece(page, id)).toHaveClass(/locked/);
    // Geçerli bir fotoğraf hatayı temizler
    await page.locator('#photo').setInputFiles(fx('fotoğraf-ş.png'));
    await expect(page.locator('#error')).not.toHaveClass(/is-active/);
    await expect(page.locator('#area')).toHaveAttribute('data-image', 'foto');
  });

  test('bozuk ya da tuhaf localStorage kaydı oyunu çökertmez, varsayılana döner', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript((k) => localStorage.setItem(k, '{bozuk'), KEY);
    await open(page);
    await expect(page.locator('#best')).toHaveText('—');
    await expect(page.locator('#board')).toHaveAttribute('data-n', '4');

    const page2 = await page.context().newPage();
    const errors2: string[] = [];
    page2.on('pageerror', (e) => errors2.push(String(e)));
    await page2.addInitScript((k) => localStorage.setItem(k, JSON.stringify({ size: 99, image: 5, best: { '4': { time: 'x', moves: 3 }, '77': { time: 1, moves: 1 }, bozuk: 1 } })), KEY);
    await page2.goto(URL_PATH);
    await expect(page2.locator('#board')).toHaveAttribute('data-ready', '1');
    await expect(page2.locator('#board')).toHaveAttribute('data-n', '4');
    await expect(page2.locator('#area')).toHaveAttribute('data-image', 'gunbatimi');
    await expect(page2.locator('#best')).toHaveText('—');
    expect(errors).toEqual([]);
    expect(errors2).toEqual([]);
  });

  test('parça numaraları kutusu kolay modu açar', async ({ page }) => {
    await open(page);
    await chooseSize(page, 3);
    await expect(page.locator('.yb-piece span').first()).toBeHidden();
    await page.locator('#show-nums').check();
    await expect(page.locator('.yb-piece span').first()).toBeVisible();
    const id = (await getState(page)).tray[0];
    await expect(piece(page, id).locator('span')).toHaveText(String(id + 1));
    await expect(slot(page, 0)).toHaveAttribute('data-num', '1');
    const content = await slot(page, 0).evaluate((el) => getComputedStyle(el, '::before').content);
    expect(content).toContain('1');
  });

  test('360px genişlikte yatay taşma yok (dört parça sayısı), tahta kare ve parçalar yeterince büyük', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(URL_PATH);
    await expect(page.locator('#board')).toHaveAttribute('data-ready', '1');
    for (const n of [3, 4, 5, 6]) {
      await chooseSize(page, n);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${n}x${n}`).toBeLessThanOrEqual(0);
      const box = (await page.locator('#board').boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(360);
      expect(Math.abs(box.width - box.height)).toBeLessThanOrEqual(1);
      const trayBox = (await page.locator('#tray').boundingBox())!;
      expect(trayBox.x + trayBox.width).toBeLessThanOrEqual(360);
      const pw = await page.locator('#tray .yb-piece').first().evaluate((el) => el.getBoundingClientRect().width);
      expect(pw, 'parça genişliği').toBeGreaterThanOrEqual(38);
    }
    // Mobil genişlikte de sürükleyerek yerleştirilir.
    await chooseSize(page, 3);
    await page.locator('#board').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await page.setViewportSize({ width: 360, height: 1500 }); // sürükleme için tahta ve tepsi birlikte görünsün
    const id = (await getState(page)).tray[0];
    await dragToSlot(page, id, id);
    await expect(piece(page, id)).toHaveClass(/locked/);
  });
});
