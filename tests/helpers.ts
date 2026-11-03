import { Page, expect } from '@playwright/test';
import { join } from 'node:path';

export const fx = (name: string) => join(__dirname, 'fixtures', name);

/** Sayfadaki dış (localhost dışı) istekleri toplar; test sonunda boş olmalı. */
export function trackExternalRequests(page: Page) {
  const external: string[] = [];
  page.on('request', (req) => {
    const url = new URL(req.url());
    // blob: ve data: adresleri tarayıcı içidir, ağa çıkmaz.
    if (url.protocol === 'blob:' || url.protocol === 'data:') return;
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) external.push(req.url());
  });
  return external;
}

export async function expectNoConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return () => expect(errors, 'sayfa hatası').toEqual([]);
}
