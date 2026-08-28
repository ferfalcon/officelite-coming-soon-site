export const PLAN_KEYS = ['Basic', 'Pro', 'Ultimate'] as const;

export type PlanKey = (typeof PLAN_KEYS)[number];

export const PLAN_URL_KEYS = ['basic', 'pro', 'ultimate'] as const;

export type PlanUrlKey = (typeof PLAN_URL_KEYS)[number];

export interface ProductPlan {
  key: PlanKey;
  urlKey: PlanUrlKey;
  price: string;
  billingSummary: string;
  features: readonly [string, string, string];
  ctaLabel: string;
}

export const PLANS = [
  {
    key: 'Basic',
    urlKey: 'basic',
    price: 'Free',
    billingSummary: 'Up to 5 users for free',
    features: [
      'Basic document collaboration',
      '2 GB storage',
      'Great security and support',
    ],
    ctaLabel: 'Try for Free',
  },
  {
    key: 'Pro',
    urlKey: 'pro',
    price: '$9.99',
    billingSummary: 'Per user, billed monthly',
    features: [
      'All essential integrations',
      '50 GB storage',
      'More control and insights',
    ],
    ctaLabel: 'Try for Free',
  },
  {
    key: 'Ultimate',
    urlKey: 'ultimate',
    price: '$19.99',
    billingSummary: 'Per user, billed monthly',
    features: [
      'Robust work management',
      '100 GB storage',
      'VIP support',
    ],
    ctaLabel: 'Try for Free',
  },
] as const satisfies readonly ProductPlan[];

export const DEFAULT_PLAN_KEY: PlanKey = 'Basic';

export const LAUNCH = {
  label: '31 Dec 2026',
  instant: '2026-12-31T00:00:00Z',
} as const;

export const SIGN_UP_STATUS_COPY = {
  success: 'Thanks. Your sign-up was saved on this device.',
  failure: 'We couldn’t save your sign-up on this device. Please try again.',
} as const;
