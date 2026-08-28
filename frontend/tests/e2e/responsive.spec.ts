import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
}

async function expectRequiredElementsInsideViewport(page: Page, selector: string) {
  const bounds = await page.locator(selector).evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();

      return {
        left: rect.left,
        right: rect.right,
        viewportWidth: window.innerWidth,
      };
    }),
  );

  for (const bound of bounds) {
    expect(bound.left).toBeGreaterThanOrEqual(-1);
    expect(bound.right).toBeLessThanOrEqual(bound.viewportWidth + 1);
  }
}

test('both routes remain reflow-safe below, between, and above the supplied Figma widths', async ({
  page,
}) => {
  const viewports = [
    { width: 320, height: 900 },
    { width: 375, height: 900 },
    { width: 600, height: 900 },
    { width: 703, height: 900 },
    { width: 704, height: 900 },
    { width: 768, height: 1024 },
    { width: 900, height: 900 },
    { width: 1189, height: 900 },
    { width: 1190, height: 900 },
    { width: 1321, height: 1024 },
    { width: 1440, height: 1000 },
    { width: 1800, height: 1000 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    await page.goto('/');
    await expect(page.locator('[data-plan-key]')).toHaveCount(3);
    await expectNoHorizontalOverflow(page);
    await expectRequiredElementsInsideViewport(
      page,
      '.hero__content, [data-plan-key], .pricing__launch-cta',
    );

    await page.goto('/sign-up/?plan=ultimate');
    await expect(page.getByLabel('Plan')).toHaveValue('Ultimate');
    await expectNoHorizontalOverflow(page);
    await expectRequiredElementsInsideViewport(
      page,
      '.sign-up__intro, [data-signup-form]',
    );
  }
});

test('content-fit transitions switch immediately across the 704px and 1190px boundaries', async ({
  page,
}) => {
  await page.setViewportSize({ width: 703, height: 900 });
  await page.goto('/');

  const compactHeroContent = await page.locator('.hero__content').boundingBox();
  const compactHeroIllustration = await page
    .locator('.hero__illustration')
    .boundingBox();
  expect(compactHeroIllustration?.y).toBeLessThan(compactHeroContent?.y ?? 0);

  await page.setViewportSize({ width: 704, height: 900 });
  await page.goto('/');

  const mediumHeroContent = await page.locator('.hero__content').boundingBox();
  const mediumHeroIllustration = await page
    .locator('.hero__illustration')
    .boundingBox();
  expect(mediumHeroIllustration?.x).toBeGreaterThan(
    (mediumHeroContent?.x ?? 0) + (mediumHeroContent?.width ?? 0),
  );

  await page.setViewportSize({ width: 1189, height: 900 });
  await page.goto('/');
  const mediumCards = page.locator('[data-plan-key]');
  const mediumFirst = await mediumCards.nth(0).boundingBox();
  const mediumSecond = await mediumCards.nth(1).boundingBox();
  expect(mediumSecond?.y).toBeGreaterThan(mediumFirst?.y ?? 0);

  await page.goto('/sign-up/');
  const stackedIntro = await page.locator('.sign-up__intro').boundingBox();
  const stackedForm = await page.locator('[data-signup-form]').boundingBox();
  expect(stackedForm?.y).toBeGreaterThan(
    (stackedIntro?.y ?? 0) + (stackedIntro?.height ?? 0),
  );

  await page.setViewportSize({ width: 1190, height: 900 });
  await page.goto('/');
  const largeCards = page.locator('[data-plan-key]');
  const largeFirst = await largeCards.nth(0).boundingBox();
  const largeSecond = await largeCards.nth(1).boundingBox();
  expect(Math.abs((largeFirst?.y ?? 0) - (largeSecond?.y ?? 0))).toBeLessThan(2);

  await page.goto('/sign-up/');
  const splitIntro = await page.locator('.sign-up__intro').boundingBox();
  const splitForm = await page.locator('[data-signup-form]').boundingBox();
  expect(splitForm?.x).toBeGreaterThan(
    (splitIntro?.x ?? 0) + (splitIntro?.width ?? 0),
  );

  await expectNoHorizontalOverflow(page);
});

test('the untouched Sign Up form preserves the 489px Figma shell while keeping the live region mounted', async ({
  page,
}) => {
  for (const viewport of [
    { width: 375, height: 1244 },
    { width: 768, height: 1230 },
    { width: 1321, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/sign-up/');

    const form = await page.locator('[data-signup-form]').boundingBox();
    expect(Math.abs((form?.height ?? 0) - 489)).toBeLessThan(2);

    await expect(page.getByRole('status')).toHaveText('');
    await expect(page.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    await expect(page.getByRole('status')).toHaveAttribute('aria-atomic', 'true');
  }
});

test('reasonable longer Home content wraps without clipping required content', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/');

  await page.locator('.hero__copy h1').evaluate((element) => {
    element.textContent =
      'A simple collaboration solution for complex tasks, growing teams, and demanding projects is coming soon';
  });
  await page.locator('.hero__copy p').evaluate((element) => {
    element.textContent =
      'Coordinate multiple projects, collaborators, deadlines, and handoffs from one clear workspace without losing the context your team needs to keep moving.';
  });

  await page.locator('[data-plan-key]').evaluateAll((cards) => {
    cards.forEach((card, index) => {
      const title = card.querySelector('h2');
      const billing = card.querySelector('.pricing-card__billing');
      const features = card.querySelectorAll('.pricing-card__features li');

      if (title) title.textContent = ['Basic Starter Plan', 'Professional Collaboration Plan', 'Ultimate Team Operations Plan'][index];
      if (billing) billing.textContent = 'Per user, billed monthly with flexible team access';
      features.forEach((feature) => {
        feature.textContent =
          'Extended collaboration tools for growing teams and shared project workflows';
      });
    });
  });

  await expectNoHorizontalOverflow(page);
  await expectRequiredElementsInsideViewport(
    page,
    '.hero__content, [data-plan-key], .pricing-card__cta',
  );
});

test('long validation and status feedback grows the compact Sign Up form without clipping or focus loss', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/sign-up/');

  const submit = page.getByRole('button', { name: 'Get on the list' });
  await submit.click();
  await expect(submit).toBeFocused();

  await page.locator('.form-field__error:visible').evaluateAll((errors) => {
    errors.forEach((error) => {
      error.textContent =
        'Please provide this required information before we can save your early-access sign-up on this device.';
    });
  });

  await page.getByRole('status').evaluate((element) => {
    element.textContent =
      'We could not save your early-access sign-up on this device right now. Your entered values are still here, so review them and try again when you are ready.';
    element.setAttribute('data-status', 'failure');
  });

  await expect(page.getByRole('status')).toBeVisible();
  await expect(submit).toBeFocused();
  await expectNoHorizontalOverflow(page);
  await expectRequiredElementsInsideViewport(
    page,
    '[data-signup-form], .form-field__error:visible, [data-signup-status]',
  );
});
