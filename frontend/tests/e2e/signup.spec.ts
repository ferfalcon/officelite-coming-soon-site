import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
}

const SIGN_UP_DATABASE_NAME = 'officelite-signups';
const SIGN_UP_STORE_NAME = 'signups';

async function readStoredSignUps(page: Page) {
  return page.evaluate(
    ({ databaseName, storeName }) =>
      new Promise<Record<string, string>[]>((resolve, reject) => {
        const request = indexedDB.open(databaseName, 1);

        request.onupgradeneeded = () => {
          const database = request.result;

          if (!database.objectStoreNames.contains(storeName)) {
            database.createObjectStore(storeName, { autoIncrement: true });
          }
        };

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          const database = request.result;
          const transaction = database.transaction(storeName, 'readonly');
          const records = transaction.objectStore(storeName).getAll();

          records.onerror = () => {
            database.close();
            reject(records.error);
          };

          records.onsuccess = () => {
            database.close();
            resolve(records.result as Record<string, string>[]);
          };
        };
      }),
    {
      databaseName: SIGN_UP_DATABASE_NAME,
      storeName: SIGN_UP_STORE_NAME,
    },
  );
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

test('native plan selection updates the closed presentation without rewriting the URL', async ({
  page,
}) => {
  await page.goto('/sign-up/?plan=basic');

  const plan = page.getByLabel('Plan');
  await expect(plan).toHaveValue('Basic');

  await plan.selectOption('Ultimate');

  await expect(plan).toHaveValue('Ultimate');
  await expect(page.locator('[data-plan-name]')).toHaveText('Ultimate Pack');
  await expect(page.locator('[data-plan-price]')).toHaveText('$19.99');
  await expect(page).toHaveURL(/\/sign-up\/\?plan=basic$/);
});

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

  for (const [index, control] of focusSequence.entries()) {
    await page.keyboard.press('Tab');
    await expect(control).toBeFocused();

    if (index === 2) {
      const nameFocusShadow = await control.evaluate(
        (element) => getComputedStyle(element).boxShadow,
      );
      expect(nameFocusShadow).not.toBe('none');
    }

    if (index === 4) {
      const planFocusShadow = await page
        .locator('.form-field__select-shell')
        .evaluate((element) => getComputedStyle(element).boxShadow);
      expect(planFocusShadow).not.toBe('none');
    }

    if (index === 7) {
      const buttonFocusShadow = await control.evaluate(
        (element) => getComputedStyle(element).boxShadow,
      );
      expect(buttonFocusShadow).not.toBe('none');
    }
  }
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
  await expect(page.getByRole('status')).toHaveText(
    'Thanks. Your sign-up was saved on this device.',
  );

  await expect(page).toHaveURL(/\/sign-up\/\?plan=pro$/);
  const serialized = [page.url(), ...requests].join('\n');
  expect(serialized).not.toContain('Ada');
  expect(serialized).not.toContain('ada%40example.test');
  expect(serialized).not.toContain('Analytical');
  expect(serialized).not.toContain('598');
});


test('valid submission persists exactly five values locally and announces success without moving focus', async ({
  page,
}) => {
  await page.goto('/sign-up/?plan=pro');

  await page.getByLabel('Name').fill('Ada Lovelace');
  await page.getByLabel('Email Address').fill('ada@example.test');
  await page.getByLabel('Phone Number').fill('+598 99 123 456');
  await page.getByLabel('Company').fill('Analytical Engines');

  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));

  const submit = page.getByRole('button', { name: 'Get on the list' });
  await submit.click();

  const status = page.getByRole('status');
  await expect(status).toHaveText('Thanks. Your sign-up was saved on this device.');
  await expect(status).toHaveAttribute('data-status', 'success');
  await expect(status).toHaveAttribute('aria-live', 'polite');
  await expect(status).toHaveAttribute('aria-atomic', 'true');
  await expect(submit).toBeFocused();

  await expect(page.getByLabel('Name')).toHaveValue('Ada Lovelace');
  await expect(page.getByLabel('Email Address')).toHaveValue('ada@example.test');
  await expect(page.getByLabel('Plan')).toHaveValue('Pro');
  await expect(page.getByLabel('Phone Number')).toHaveValue('+598 99 123 456');
  await expect(page.getByLabel('Company')).toHaveValue('Analytical Engines');

  await expect
    .poll(() => readStoredSignUps(page))
    .toEqual([
      {
        name: 'Ada Lovelace',
        email: 'ada@example.test',
        plan: 'Pro',
        phone: '+598 99 123 456',
        company: 'Analytical Engines',
      },
    ]);

  expect(requests).toEqual([]);
  await expect(page).toHaveURL(/\/sign-up\/\?plan=pro$/);
});

test('storage failure is announced, retains values, reflows, and succeeds on ordinary retry', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.addInitScript(() => {
    const originalOpen = IDBFactory.prototype.open;
    let failNextOpen = true;

    IDBFactory.prototype.open = function (name: string, version?: number) {
      if (failNextOpen) {
        failNextOpen = false;
        throw new DOMException('Forced IndexedDB test failure.', 'UnknownError');
      }

      return version === undefined
        ? originalOpen.call(this, name)
        : originalOpen.call(this, name, version);
    };
  });

  await page.goto('/sign-up/?plan=ultimate');

  await page.getByLabel('Name').fill('Grace Hopper');
  await page.getByLabel('Email Address').fill('grace@example.test');
  await page.getByLabel('Phone Number').fill('+1 555 0100');
  await page.getByLabel('Company').fill('Compiler Co');

  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));

  const submit = page.getByRole('button', { name: 'Get on the list' });
  await submit.click();

  const status = page.getByRole('status');
  await expect(status).toHaveText(
    'We couldn’t save your sign-up on this device. Please try again.',
  );
  await expect(status).toHaveAttribute('data-status', 'failure');
  await expect(submit).toBeFocused();

  await expect(page.getByLabel('Name')).toHaveValue('Grace Hopper');
  await expect(page.getByLabel('Email Address')).toHaveValue('grace@example.test');
  await expect(page.getByLabel('Plan')).toHaveValue('Ultimate');
  await expect(page.getByLabel('Phone Number')).toHaveValue('+1 555 0100');
  await expect(page.getByLabel('Company')).toHaveValue('Compiler Co');
  await expectNoHorizontalOverflow(page);

  const failureColor = await status.evaluate(
    (element) => getComputedStyle(element).color,
  );
  expect(failureColor).toBe('rgb(240, 91, 91)');

  await submit.click();

  await expect(status).toHaveText('Thanks. Your sign-up was saved on this device.');
  await expect(status).toHaveAttribute('data-status', 'success');
  await expect(submit).toBeFocused();

  await expect
    .poll(() => readStoredSignUps(page))
    .toEqual([
      {
        name: 'Grace Hopper',
        email: 'grace@example.test',
        plan: 'Ultimate',
        phone: '+1 555 0100',
        company: 'Compiler Co',
      },
    ]);

  expect(requests).toEqual([]);
  await expectNoHorizontalOverflow(page);
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


test('required validation exposes contextual and programmatically associated feedback', async ({
  page,
}) => {
  await page.goto('/sign-up/');

  const plan = page.getByLabel('Plan');
  await plan.evaluate((element) => {
    (element as HTMLSelectElement).value = '';
  });

  const submit = page.getByRole('button', { name: 'Get on the list' });
  await submit.click();
  await expect(submit).toBeFocused();

  for (const field of [
    { label: 'Name', errorId: 'signup-name-error', message: 'Name is required.' },
    {
      label: 'Email Address',
      errorId: 'signup-email-error',
      message: 'Email address is required.',
    },
    { label: 'Plan', errorId: 'signup-plan-error', message: 'Select a plan.' },
    {
      label: 'Phone Number',
      errorId: 'signup-phone-error',
      message: 'Phone number is required.',
    },
    {
      label: 'Company',
      errorId: 'signup-company-error',
      message: 'Company is required.',
    },
  ]) {
    const control = page.getByLabel(field.label);
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', field.errorId);
    await expect(page.locator(`#${field.errorId}`)).toHaveText(field.message);
    await expect(page.locator(`#${field.errorId}`)).toBeVisible();
  }
});

test('a missing required field recovers as soon as it becomes valid', async ({
  page,
}) => {
  await page.goto('/sign-up/?plan=pro');

  await page.getByLabel('Name').fill('Ada Lovelace');
  await page.getByLabel('Email Address').fill('ada@example.test');
  await page.getByLabel('Phone Number').fill('+598 99 123 456');

  const submit = page.getByRole('button', { name: 'Get on the list' });
  await submit.click();

  const company = page.getByLabel('Company');
  await expect(company).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#signup-company-error')).toHaveText(
    'Company is required.',
  );

  for (const label of ['Name', 'Email Address', 'Plan', 'Phone Number']) {
    await expect(page.getByLabel(label)).not.toHaveAttribute('aria-invalid', 'true');
  }

  await company.fill('Analytical Engines');
  await expect(company).not.toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#signup-company-error')).toBeHidden();

  await submit.click();
  await expect(page.locator('.form-field__error:visible')).toHaveCount(0);
});

test('email validation follows single-address HTML semantics and recovers on correction', async ({
  page,
}) => {
  await page.goto('/sign-up/');

  await page.getByLabel('Name').fill('Grace Hopper');
  const email = page.getByLabel('Email Address');
  await email.fill('grace@example.test,ada@example.test');
  await page.getByLabel('Phone Number').fill('+1 555 0100');
  await page.getByLabel('Company').fill('Compiler Co');

  const submit = page.getByRole('button', { name: 'Get on the list' });
  await submit.click();

  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#signup-email-error')).toHaveText(
    'Enter a valid email address.',
  );

  await email.fill('grace@example.test');
  await expect(email).not.toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#signup-email-error')).toBeHidden();

  await submit.click();
  await expect(page.locator('.form-field__error:visible')).toHaveCount(0);
});

test('keyboard-only submit keeps focus and compact validation feedback does not overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/sign-up/');

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

  const submit = page.getByRole('button', { name: 'Get on the list' });
  await page.keyboard.press('Enter');

  await expect(submit).toBeFocused();
  await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#signup-name-error')).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
