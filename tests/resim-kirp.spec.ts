import { test, expect, Page } from '@playwright/test';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

// 200×100 deneme resmi: r = x, g = 2·y, b = 100, opak.
function makePng(w = 200, h = 100) {
  const png = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    png.data[i] = x % 256; png.data[i + 1] = (y * 2) % 256; png.data[i + 2] = 100; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}
const file = (name = 'deneme.png', w = 200, h = 100) => ({ name, mimeType: 'image/png', buffer: makePng(w, h) });

async function setBox(page: Page, x: number, y: number, w: number, h: number) {
  await page.locator('#in-w').fill(String(w));
  await page.locator('#in-h').fill(String(h));
  await page.locator('#in-x').fill(String(x));
  await page.locator('#in-y').fill(String(y));
}

test.describe('Resim Kırpma', () => {
  test('50×50 kırpma: çıktı 50×50 ve pikseller doğru, dış istek yok', async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles(file());
    await expect(page.locator('#files li')).toHaveCount(1);
    await expect(page.locator('#editor')).toBeVisible();
    await page.locator('#opt-format').selectOption('png');
    await setBox(page, 20, 10, 50, 50);
    await expect(page.locator('#box-info')).toContainText('50×50');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-all').click()]);
    expect(dl.suggestedFilename()).toBe('deneme-kirpilmis.png');
    const out = PNG.sync.read(readFileSync((await dl.path())!));
    expect([out.width, out.height]).toEqual([50, 50]);
    expect([...out.data.subarray(0, 4)]).toEqual([20, 20, 100, 255]); // (20,10) → r=20, g=20
    const j = (49 * 50 + 49) * 4;
    expect([...out.data.subarray(j, j + 4)]).toEqual([69, 118, 100, 255]); // (69,59)
    expect(external).toEqual([]);
    noErrors();
  });

  test('daire kırpma: köşe alfa 0, merkez opak, çıktı PNG', async ({ page }) => {
    await page.goto('/resim-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles(file());
    await page.locator('#opt-circle').check();
    await expect(page.locator('#opt-format')).toBeDisabled();
    await setBox(page, 50, 10, 80, 80);
    await expect(page.locator('#in-h')).toHaveValue('80');
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#download-all').click()]);
    expect(dl.suggestedFilename()).toBe('deneme-daire.png');
    const out = PNG.sync.read(readFileSync((await dl.path())!));
    expect([out.width, out.height]).toEqual([80, 80]);
    expect(out.data[3]).toBe(0); // sol üst köşe
    expect(out.data[(79 * 80 + 79) * 4 + 3]).toBe(0); // sağ alt köşe
    expect(out.data[(40 * 80 + 40) * 4 + 3]).toBe(255); // merkez
  });

  test('oran kilidi, klavye ve fare ile kutu ayarı', async ({ page }) => {
    await page.goto('/resim-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles(file());
    await page.locator('#opt-ratio').selectOption('16:9');
    await page.locator('#in-w').fill('160');
    await expect(page.locator('#in-h')).toHaveValue('90');
    await page.locator('#in-x').fill('10');
    await page.locator('#box').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#in-x')).toHaveValue('11');
    await page.keyboard.press('Control+ArrowRight');
    await expect(page.locator('#in-x')).toHaveValue('21');
    // Fare ile taşıma
    await page.locator('#box').hover();
    await page.waitForTimeout(400);
    const b = await page.locator('#box').boundingBox();
    await page.mouse.move(b!.x + b!.width / 2, b!.y + b!.height / 2);
    await page.mouse.down();
    await page.mouse.move(b!.x + b!.width / 2 - 8, b!.y + b!.height / 2, { steps: 4 });
    await page.mouse.up();
    expect(Number(await page.locator('#in-x').inputValue())).toBeLessThan(21);
    // 90° döndürünce oran tersine döner
    await page.locator('#rotate').click();
    await expect(page.locator('#opt-ratio')).toHaveValue('9:16');
    await expect(page.locator('#rot-out')).toHaveText('90°');
  });

  test('iki resim: aynı kutu uygulanır, ZIP iner', async ({ page }) => {
    await page.goto('/resim-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles([file('a.png'), file('b.png')]);
    await expect(page.locator('#files li')).toHaveCount(2);
    await page.locator('#opt-format').selectOption('png');
    await setBox(page, 0, 0, 100, 50);
    await page.locator('#run').click();
    await expect(page.locator('#result')).toHaveClass(/is-active/);
    const [zip] = await Promise.all([page.waitForEvent('download'), page.locator('#download-all').click()]);
    expect(zip.suggestedFilename()).toBe('kirpilmis-resimler.zip');
    expect([...readFileSync((await zip.path())!).subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
  });

  test('bozuk dosya: Türkçe, çözüm öneren hata', async ({ page }) => {
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto('/resim-kirp/');
    await page.locator('#drop input[type=file]').setInputFiles({ name: 'bozuk.png', mimeType: 'image/png', buffer: Buffer.from('bu bir resim degil') });
    await expect(page.locator('#error')).toContainText('açılamadı');
    await expect(page.locator('#error')).toContainText('yeniden kaydedip');
    await expect(page.locator('#editor')).toBeHidden();
    noErrors();
  });
});
