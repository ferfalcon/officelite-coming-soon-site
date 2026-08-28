import { expect, test, type Page } from '@playwright/test';

const planHrefs = {
  Basic: '/sign-up/?plan=basic',
  Pro: '/sign-up/?plan=pro',
  Ultimate: '/sign-up/?plan=ultimate',
} as const;

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
}

test('Home exposes the approved hierarchy and CTA destinations', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'A simple solution to complex tasks is coming soon',
    }),
  ).toBeVisible();

  const planCards = page.locator('[data-plan-key]');
  await expect(planCards).toHaveCount(3);

  for (const [plan, href] of Object.entries(planHrefs)) {
    const card = page.locator(`[data-plan-key="${plan}"]`);
    await expect(card.getByRole('heading', { name: plan })).toBeVisible();
    await expect(card.getByRole('link', { name: 'Try for Free' })).toHaveAttribute(
      'href',
      href,
    );
  }

  const genericActions = page.getByRole('link', { name: 'Get Started' });
  await expect(genericActions).toHaveCount(2);
  await expect(genericActions.nth(0)).toHaveAttribute('href', '/sign-up/');
  await expect(genericActions.nth(1)).toHaveAttribute('href', '/sign-up/');

  await expect(page.getByRole('link', { name: 'Officelite home' })).toHaveAttribute(
    'href',
    '/',
  );
});

test('every Home conversion action navigates to Sign Up with the expected plan context', async ({
  page,
}) => {
  const entries = [
    {
      name: 'hero generic CTA',
      locate: () => page.getByRole('link', { name: 'Get Started' }).nth(0),
      expectedUrl: /\/sign-up\/$/,
      expectedPlan: 'Basic',
    },
    {
      name: 'Basic pricing CTA',
      locate: () =>
        page
          .locator('[data-plan-key="Basic"]')
          .getByRole('link', { name: 'Try for Free' }),
      expectedUrl: /\/sign-up\/\?plan=basic$/,
      expectedPlan: 'Basic',
    },
    {
      name: 'Pro pricing CTA',
      locate: () =>
        page
          .locator('[data-plan-key="Pro"]')
          .getByRole('link', { name: 'Try for Free' }),
      expectedUrl: /\/sign-up\/\?plan=pro$/,
      expectedPlan: 'Pro',
    },
    {
      name: 'Ultimate pricing CTA',
      locate: () =>
        page
          .locator('[data-plan-key="Ultimate"]')
          .getByRole('link', { name: 'Try for Free' }),
      expectedUrl: /\/sign-up\/\?plan=ultimate$/,
      expectedPlan: 'Ultimate',
    },
    {
      name: 'countdown generic CTA',
      locate: () => page.getByRole('link', { name: 'Get Started' }).nth(1),
      expectedUrl: /\/sign-up\/$/,
      expectedPlan: 'Basic',
    },
  ] as const;

  for (const entry of entries) {
    await page.goto('/');
    await entry.locate().click();

    await expect(page, entry.name).toHaveURL(entry.expectedUrl);
    await expect(page.getByLabel('Plan'), entry.name).toHaveValue(entry.expectedPlan);
  }
});

test('countdown ticks from one shared target without network requests or repetitive live-region semantics', async ({
  page,
}) => {
  await page.goto('/');

  const runtimeRequests: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'fetch' || request.resourceType() === 'xhr') {
      runtimeRequests.push(request.url());
    }
  });

  const homeCountdown = page.locator('[data-countdown]').first();
  const homeValues = homeCountdown.locator('[data-countdown-value]');
  const homeTarget = await homeCountdown.getAttribute('data-countdown-target');
  const homeDateTime = await homeCountdown.locator('time').getAttribute('datetime');
  const homeTargetLabel = (await homeCountdown.locator('time').textContent())?.trim();
  const initialValues = (await homeValues.allTextContents()).join(':');

  expect(homeTarget).toBeTruthy();
  expect(homeDateTime).toBe(homeTarget);
  expect(await homeCountdown.getAttribute('aria-live')).toBeNull();
  expect(await homeCountdown.getAttribute('role')).toBeNull();
  expect(
    await homeValues.evaluateAll((values) =>
      values.map((value) => ({
        ariaLive: value.getAttribute('aria-live'),
        role: value.getAttribute('role'),
      })),
    ),
  ).toEqual([
    { ariaLive: null, role: null },
    { ariaLive: null, role: null },
    { ariaLive: null, role: null },
    { ariaLive: null, role: null },
  ]);

  await expect
    .poll(
      async () => (await homeValues.allTextContents()).join(':'),
      { timeout: 3_000 },
    )
    .not.toBe(initialValues);

  await page.goto('/sign-up/');

  const signupCountdown = page.locator('[data-countdown]').first();
  await expect(signupCountdown).toHaveAttribute('data-countdown-target', homeTarget!);
  await expect(signupCountdown.locator('time')).toHaveAttribute('datetime', homeDateTime!);
  await expect(signupCountdown.locator('time')).toHaveText(homeTargetLabel!);
  expect(runtimeRequests).toEqual([]);
});

test('keyboard focus reaches and activates the Home primary action', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Officelite home' })).toBeFocused();

  await page.keyboard.press('Tab');
  const heroAction = page.getByRole('link', { name: 'Get Started' }).first();
  await expect(heroAction).toBeFocused();

  const focusShadow = await heroAction.evaluate(
    (element) => getComputedStyle(element).boxShadow,
  );
  expect(focusShadow).not.toBe('none');

  await page.route('**/sign-up/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<!doctype html><title>Sign Up</title><h1>Sign Up</h1>',
    });
  });

  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sign-up\/$/);
});

for (const viewport of [
  { width: 320, height: 900 },
  { width: 375, height: 900 },
  { width: 600, height: 900 },
  { width: 703, height: 900 },
  { width: 704, height: 900 },
  { width: 768, height: 1024 },
  { width: 900, height: 900 },
  { width: 1189, height: 900 },
  { width: 1190, height: 900 },
  { width: 1440, height: 1000 },
  { width: 1800, height: 1000 },
]) {
  test(`Home remains usable without horizontal overflow at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'A simple solution to complex tasks is coming soon',
      }),
    ).toBeVisible();
    await expect(page.locator('[data-plan-key]')).toHaveCount(3);
    await expect(page.locator('[data-countdown-value]')).toHaveCount(4);
    await expectNoHorizontalOverflow(page);
  });
}

test('Home uses compact visual transforms at 375px without changing DOM order', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/');

  const heroContent = await page.locator('.hero__content').boundingBox();
  const heroIllustration = await page.locator('.hero__illustration').boundingBox();
  expect(heroIllustration?.y).toBeLessThan(heroContent?.y ?? 0);

  const basicCard = page.locator('[data-plan-key="Basic"]');
  const details = await basicCard.locator('.pricing-card__details').boundingBox();
  const features = await basicCard.locator('.pricing-card__features').boundingBox();
  const action = await basicCard.getByRole('link', { name: 'Try for Free' }).boundingBox();

  expect(features?.y).toBeGreaterThan((details?.y ?? 0) + (details?.height ?? 0));
  expect(action?.y).toBeGreaterThan((features?.y ?? 0) + (features?.height ?? 0));

  const domOrder = await page
    .locator('main')
    .evaluate((main) =>
      Array.from(main.querySelectorAll('h1, [data-plan-key] h2')).map(
        (element) => element.textContent?.trim(),
      ),
    );
  expect(domOrder).toEqual([
    'A simple solution to complex tasks is coming soon',
    'Basic',
    'Pro',
    'Ultimate',
  ]);
});

test('Home uses the medium card anatomy at 768px', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');

  const heroContent = await page.locator('.hero__content').boundingBox();
  const heroIllustration = await page.locator('.hero__illustration').boundingBox();
  expect(heroIllustration?.x).toBeGreaterThan(
    (heroContent?.x ?? 0) + (heroContent?.width ?? 0),
  );

  const cards = page.locator('[data-plan-key]');
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  expect(second?.y).toBeGreaterThan(first?.y ?? 0);

  const basicCard = cards.nth(0);
  const details = await basicCard.locator('.pricing-card__details').boundingBox();
  const features = await basicCard.locator('.pricing-card__features').boundingBox();
  expect(features?.x).toBeGreaterThan(details?.x ?? 0);
});

test('Home uses the large three-card pricing composition at 1440px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const cards = page.locator('[data-plan-key]');
  const boxes = await Promise.all([
    cards.nth(0).boundingBox(),
    cards.nth(1).boundingBox(),
    cards.nth(2).boundingBox(),
  ]);

  expect(Math.abs((boxes[0]?.y ?? 0) - (boxes[1]?.y ?? 0))).toBeLessThan(2);
  expect(Math.abs((boxes[1]?.y ?? 0) - (boxes[2]?.y ?? 0))).toBeLessThan(2);
  expect(boxes[1]?.x).toBeGreaterThan((boxes[0]?.x ?? 0) + (boxes[0]?.width ?? 0));
  expect(boxes[2]?.x).toBeGreaterThan((boxes[1]?.x ?? 0) + (boxes[1]?.width ?? 0));
});

test('every Home conversion action exposes visible keyboard focus', async ({ page }) => {
  await page.goto('/');

  const focusSequence = [
    page.getByRole('link', { name: 'Skip to content' }),
    page.getByRole('link', { name: 'Officelite home' }),
    page.getByRole('link', { name: 'Get Started' }).nth(0),
    page.getByRole('link', { name: 'Try for Free' }).nth(0),
    page.getByRole('link', { name: 'Try for Free' }).nth(1),
    page.getByRole('link', { name: 'Try for Free' }).nth(2),
    page.getByRole('link', { name: 'Get Started' }).nth(1),
  ];

  for (const link of focusSequence) {
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();

    const focusShadow = await link.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    );
    expect(focusShadow).not.toBe('none');
  }
});
