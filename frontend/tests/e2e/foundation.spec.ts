import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

const sourceAssets = [
  '../../src/assets/shared/logo.svg',
  '../../src/assets/home/bg-pattern-footer.svg',
  '../../src/assets/home/bg-pattern-header.svg',
  '../../src/assets/home/bg-pattern-pricing.svg',
  '../../src/assets/home/illustration-charts.svg',
  '../../src/assets/sign-up/bg-pattern-side.svg',
  '../../src/assets/sign-up/icon-arrow-down.svg',
  '../../src/assets/sign-up/icon-check.svg',
  '../../src/assets/sign-up/icon-cross.svg',
];

test('Officelite foundation replaces the Astro starter and resolves local foundations', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle('Officelite');
  await expect(page.locator('body')).not.toContainText('Astro Homepage');
  await expect(page.locator('body')).not.toContainText('Read our docs');

  const faviconHref = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(faviconHref).toBe('/favicon.png');

  const fontLoaded = await page.evaluate(async () => {
    await document.fonts.load('400 16px "Kumbh Sans"');
    return document.fonts.check('400 16px "Kumbh Sans"');
  });
  expect(fontLoaded).toBe(true);

  const noHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  );
  expect(noHorizontalOverflow).toBe(true);

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();

  const focusShadow = await page
    .getByRole('link', { name: 'Skip to content' })
    .evaluate((element) => getComputedStyle(element).boxShadow);
  expect(focusShadow).not.toBe('none');

  for (const relativePath of sourceAssets) {
    expect(existsSync(fileURLToPath(new URL(relativePath, import.meta.url)))).toBe(true);
  }
});
