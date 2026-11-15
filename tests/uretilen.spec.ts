import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackExternalRequests, expectNoConsoleErrors } from './helpers';

// scripts/uret/derle.mjs tarafından üretilen form tabanlı araçlar: her araç için içerik,
// reklam yerleşimi, hesap örnekleri (2 başarılı + 1 hata), 360 px taşma ve dış istek denetimi.
type Case = { in?: Record<string, string>; out?: Record<string, string>; match?: Record<string, string>; text?: string; textMatch?: string; error?: boolean };
type Tool = { slug: string; title: string; pdf?: boolean; types: Record<string, string>; defaults: Record<string, string>; cases: Case[] };
const tools: Tool[] = JSON.parse(readFileSync(join(__dirname, 'uretilen.json'), 'utf8'));

for (const t of tools) {
  test(`${t.slug}: içerik, hesap, mobil`, async ({ page }) => {
    const external = trackExternalRequests(page);
    const noErrors = await expectNoConsoleErrors(page);
    await page.goto(`/${t.slug}/`);
    await page.waitForLoadState('networkidle');

    const words = await page.locator('main').evaluate((el) => (el.textContent || '').split(/\s+/).filter(Boolean).length);
    expect(words).toBeGreaterThanOrEqual(850);
    await expect(page.locator('.ba-ad')).toHaveCount(3);
    for (const s of ['a', 'b', 'c']) await expect(page.locator(`[data-slot="${t.slug}-${s}"]`)).toHaveCount(1);
    expect(await page.locator('.ba-faq details').count()).toBeGreaterThanOrEqual(7);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(' ');
    expect(ld).toContain('FAQPage');
    expect(ld).toContain('SoftwareApplication');
    await expect(page.locator('.ba-badges')).toContainText('Dosya yüklenmez');
    const after = await page.evaluate(() => {
      const tool = document.querySelector('.ba-tool')!, ad = document.querySelector('[data-slot$="-a"]')!;
      return !!(tool.compareDocumentPosition(ad) & Node.DOCUMENT_POSITION_FOLLOWING) && !tool.contains(ad);
    });
    expect(after).toBe(true);

    cases: for (const c of t.cases) {
      const v = { ...t.defaults, ...(c.in || {}) };
      for (const [id, val] of Object.entries(v)) {
        const el = page.locator(`#f-${id}`);
        if (t.types[id] === 'select') await el.selectOption(val);
        else if (t.types[id] === 'date') {
          // tarih alanı ISO ister; örnekler GG.AA.YYYY de yazılmış olabilir
          const m = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(val);
          const iso = m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : (/^\d{4}-\d{2}-\d{2}$/.test(val) ? val : '');
          // takvimde olmayan tarih (31.02 gibi) tarayıcının tarih alanına yazılamaz; o hata örneği yalnızca birim doğrulamada koşar
          try { await el.fill(iso); } catch (e) { if (c.error) continue cases; throw e; }
        }
        else await el.fill(val);
      }
      const n = Number(await page.locator('#form').getAttribute('data-n') || 0);
      await page.locator('#calc').click();
      await expect(page.locator('#form')).toHaveAttribute('data-n', String(n + 1));
      if (c.error) {
        await expect(page.locator('#error')).toHaveClass(/is-active/);
        await expect(page.locator('#result')).toBeHidden();
        continue;
      }
      await expect(page.locator('#result')).toHaveClass(/is-active/);
      await expect(page.locator('#error')).not.toHaveClass(/is-active/);
      const rows = await page.locator('#rows .ar-row').evaluateAll((els) => els.map((r) => [r.children[0].textContent, r.children[1].textContent]));
      const map = new Map(rows as [string, string][]);
      for (const [k, want] of Object.entries(c.out || {})) expect(map.get(k), `${t.slug} · ${k}`).toBe(want);
      for (const [k, re] of Object.entries(c.match || {})) expect(map.get(k) || '', `${t.slug} · ${k}`).toMatch(new RegExp(re));
      if (c.text !== undefined) await expect(page.locator('#out')).toHaveValue(c.text);
      if (c.textMatch) expect(await page.locator('#out').inputValue()).toMatch(new RegExp(c.textMatch));
      if (t.pdf && c === t.cases[0]) {
        // PDF çıktısı: önizleme görünür, indirilen dosya gerçek bir PDF
        await expect(page.locator('#onizleme')).toBeVisible();
        // Ekranda doldurma: önizlemeye tıkla, yaz, Enter → yazı sayılır ve tarayıcıda saklanır
        const box = (await page.locator('#onizleme').boundingBox())!;
        await page.locator('#onizleme').click({ position: { x: box.width * 0.5, y: box.height * 0.5 } });
        await page.locator('.ar-plan-yaz').fill('Deneme yazısı');
        await page.keyboard.press('Enter');
        await expect(page.locator('.ar-plan-yaz')).toHaveCount(0);
        await expect(page.locator('#pg-info')).toContainText('1 yazı');
        expect(await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('ba-plan:')).length)).toBe(1);
        const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#pdf').click()]);
        expect(dl.suggestedFilename()).toMatch(/\.pdf$/);
        const bytes = readFileSync((await dl.path())!);
        expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
        expect(bytes.length).toBeGreaterThan(3000);
      }
    }

    await page.setViewportSize({ width: 360, height: 740 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(external).toEqual([]);
    noErrors();
  });
}
