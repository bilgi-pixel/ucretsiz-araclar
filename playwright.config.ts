import { defineConfig, devices } from '@playwright/test';

// Paralel ajanlar çakışmasın diye port ortam değişkeninden alınabilir: PW_PORT=3105 npx playwright test …
const port = Number(process.env.PW_PORT || 3100);

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    acceptDownloads: true,
  },
  webServer: {
    command: `npx serve web -l ${port} --no-clipboard --no-port-switching`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] }, testMatch: /mobile\.spec\.ts/ },
  ],
});
