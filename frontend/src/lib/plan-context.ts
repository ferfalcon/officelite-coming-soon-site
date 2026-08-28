import {
  DEFAULT_PLAN_KEY,
  PLANS,
  type PlanKey,
  type PlanUrlKey,
} from '../data/product';

export const PLAN_QUERY_PARAM = 'plan';
export const SIGN_UP_PATH = '/sign-up/';

const planByKey = new Map<PlanKey, (typeof PLANS)[number]>(
  PLANS.map((plan) => [plan.key, plan]),
);

const planByUrlKey = new Map<PlanUrlKey, (typeof PLANS)[number]>(
  PLANS.map((plan) => [plan.urlKey, plan]),
);

export function isPlanKey(value: unknown): value is PlanKey {
  return typeof value === 'string' && planByKey.has(value as PlanKey);
}

export function isPlanUrlKey(value: unknown): value is PlanUrlKey {
  return typeof value === 'string' && planByUrlKey.has(value as PlanUrlKey);
}

export function constrainPlanKey(value: unknown): PlanKey {
  return isPlanKey(value) ? value : DEFAULT_PLAN_KEY;
}

export function parsePlanFromSearchParams(
  searchParams: URLSearchParams,
): PlanKey {
  const value = searchParams.get(PLAN_QUERY_PARAM);

  if (!isPlanUrlKey(value)) {
    return DEFAULT_PLAN_KEY;
  }

  return planByUrlKey.get(value)?.key ?? DEFAULT_PLAN_KEY;
}

export function parsePlanFromUrl(url: URL | string): PlanKey {
  const parsedUrl =
    typeof url === 'string' ? new URL(url, 'https://officelite.local') : url;

  return parsePlanFromSearchParams(parsedUrl.searchParams);
}

export function buildSignUpUrl(plan?: PlanKey): string {
  if (!plan) {
    return SIGN_UP_PATH;
  }

  const planData = planByKey.get(constrainPlanKey(plan));

  if (!planData) {
    return SIGN_UP_PATH;
  }

  const searchParams = new URLSearchParams({
    [PLAN_QUERY_PARAM]: planData.urlKey,
  });

  return `${SIGN_UP_PATH}?${searchParams.toString()}`;
}
