import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
}

test('Sign Up exposes the approved content hierarchy and accessible form shell', async ({
  page,
}) => {
  const response = await page.goto('/sign-up/');

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Work smarter. Save time.' }),
  ).toBeVisible();
  await expect(page.locator('[data-countdown-value]')).toHaveCount(4);

  await expect(page.getByLabel('Name')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Email Address')).toHaveAttribute('type', 'email');
  await expect(page.getByLabel('Plan')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Phone Number')).toHaveAttribute('type', 'tel');
  await expect(page.getByLabel('Company')).toHaveAttribute('required', '');

  await expect(page.getByLabel('Plan').locator('option')).toHaveText([
    'Basic',
    'Pro',
    'Ultimate',
  ]);
  await expect(page.getByRole('button', { name: 'Get on the list' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Officelite home' })).toHaveAttribute(
    'href',
    '/',
  );
});

for (const entry of [
  { path: '/sign-up/', expected: 'Basic' },
  { path: '/sign-up/?plan=basic', expected: 'Basic' },
  { path: '/sign-up/?plan=pro', expected: 'Pro' },
  { path: '/sign-up/?plan=ultimate', expected: 'Ultimate' },
  { path: '/sign-up/?plan=enterprise', expected: 'Basic' },
]) {
  test(`plan entry ${entry.path} initializes ${entry.expected}`, async ({ page }) => {
    await page.goto(entry.path);

    const form = page.locator('[data-signup-form]');
    await expect(form).toHaveAttribute('data-signup-ready', 'true');
    await expect(page.getByLabel('Plan')).toHaveValue(entry.expected);
    await expect(page.locator('[data-plan-name]')).toHaveText(
      `${entry.expected} Pack`,
    );
  });
}

test('the Sign Up logo returns to Home with native keyboard activation', async ({
  page,
}) => {
  await page.goto('/sign-up/');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();

  await page.keyboard.press('Tab');
  const logo = page.getByRole('link', { name: 'Officelite home' });
  await expect(logo).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/$/);
});

test('keyboard order follows the logical Sign Up form order with visible focus', async ({
  page,
}) => {
  await page.goto('/sign-up/');
  await expect(page.locator('[data-signup-form]')).toHaveAttribute(
    'data-signup-ready',
    'true',
  );

  const focusSequence = [
    page.getByRole('link', { name: 'Skip to content' }),
    page.getByRole('link', { name: 'Officelite home' }),
    page.getByLabel('Name'),
    page.getByLabel('Email Address'),
    page.getByLabel('Plan'),
    page.getByLabel('Phone Number'),
    page.getByLabel('Company'),
    page.getByRole('button', { name: 'Get on the list' }),
  ];

  for (const control of focusSequence) {
    await page.keyboard.press('Tab');
    await expect(control).toBeFocused();
  }

  const nameFocusShadow = await page
    .getByLabel('Name')
    .evaluate((element) => getComputedStyle(element).boxShadow);
  expect(nameFocusShadow).not.toBe('none');

  await page.getByLabel('Plan').focus();
  const planFocusShadow = await page
    .locator('.form-field__select-shell')
    .evaluate((element) => getComputedStyle(element).boxShadow);
  expect(planFocusShadow).not.toBe('none');

  await page.getByRole('button', { name: 'Get on the list' }).focus();
  const buttonFocusShadow = await page
    .getByRole('button', { name: 'Get on the list' })
    .evaluate((element) => getComputedStyle(element).boxShadow);
  expect(buttonFocusShadow).not.toBe('none');
});

test('the initialized shell does not put personal values in the URL or network', async ({
  page,
}) => {
  await page.goto('/sign-up/?plan=pro');
  await expect(page.locator('[data-signup-form]')).toHaveAttribute(
    'data-signup-ready',
    'true',
  );

  await page.getByLabel('Name').fill('Ada Lovelace');
  await page.getByLabel('Email Address').fill('ada@example.test');
  await page.getByLabel('Phone Number').fill('+598 99 123 456');
  await page.getByLabel('Company').fill('Analytical Engines');

  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));

  await page.getByRole('button', { name: 'Get on the list' }).click();

  await expect(page).toHaveURL(/\/sign-up\/\?plan=pro$/);
  const serialized = [page.url(), ...requests].join('\n');
  expect(serialized).not.toContain('Ada');
  expect(serialized).not.toContain('ada%40example.test');
  expect(serialized).not.toContain('Analytical');
  expect(serialized).not.toContain('598');
});

test('the static shell cannot submit personal values before the controller initializes', async ({
  browser,
}) => {
  const page = await browser.newPage({
    javaScriptEnabled: false,
    baseURL: 'http://127.0.0.1:4321',
  });

  try {
    await page.goto('/sign-up/?plan=pro');

    const submit = page.getByRole('button', { name: 'Get on the list' });
    await expect(submit).toHaveAttribute('type', 'button');
    await expect(page.getByLabel('Plan')).toHaveValue('Basic');

    await page.getByLabel('Name').fill('Grace Hopper');
    await page.getByLabel('Email Address').fill('grace@example.test');
    await page.getByLabel('Phone Number').fill('+1 555 0100');
    await page.getByLabel('Company').fill('Compiler Co');

    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));

    await submit.click();

    await expect(page).toHaveURL(/\/sign-up\/\?plan=pro$/);
    expect(requests).toEqual([]);
  } finally {
    await page.close();
  }
});

for (const viewport of [
  { width: 320, height: 900 },
  { width: 375, height: 900 },
  { width: 600, height: 900 },
  { width: 768, height: 1024 },
  { width: 900, height: 900 },
  { width: 1189, height: 900 },
  { width: 1190, height: 900 },
  { width: 1321, height: 1024 },
  { width: 1440, height: 1000 },
]) {
  test(`Sign Up remains usable without horizontal overflow at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('/sign-up/?plan=ultimate');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Work smarter. Save time.' }),
    ).toBeVisible();
    await expect(page.getByLabel('Plan')).toHaveValue('Ultimate');
    await expect(page.getByRole('button', { name: 'Get on the list' })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
}

test('Sign Up stacks intro and form at the 768px reference', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1230 });
  await page.goto('/sign-up/');

  const intro = await page.locator('.sign-up__intro').boundingBox();
  const form = await page.locator('[data-signup-form]').boundingBox();

  expect(form?.y).toBeGreaterThan((intro?.y ?? 0) + (intro?.height ?? 0));
  expect(Math.abs((form?.width ?? 0) - 445)).toBeLessThan(2);
});

test('Sign Up uses the fluid compact form at the 375px reference', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 1244 });
  await page.goto('/sign-up/');

  const form = await page.locator('[data-signup-form]').boundingBox();

  expect(Math.abs((form?.width ?? 0) - 327)).toBeLessThan(2);
  await expectNoHorizontalOverflow(page);
});

test('Sign Up uses the split composition at the 1321px reference', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1321, height: 1024 });
  await page.goto('/sign-up/');

  const intro = await page.locator('.sign-up__intro').boundingBox();
  const form = await page.locator('[data-signup-form]').boundingBox();

  expect(form?.x).toBeGreaterThan((intro?.x ?? 0) + (intro?.width ?? 0));
  expect(form?.y).toBeLessThan((intro?.y ?? 0) + (intro?.height ?? 0));
  expect((form?.y ?? 0) + (form?.height ?? 0)).toBeGreaterThan(intro?.y ?? 0);
});
