import { DEFAULT_PLAN_KEY, PLANS, type PlanKey } from '../data/product';
import { constrainPlanKey, parsePlanFromUrl } from '../lib/plan-context';

function getPlan(planKey: PlanKey) {
  return PLANS.find((plan) => plan.key === planKey) ?? PLANS[0];
}

function updatePlanPresentation(form: HTMLFormElement, planKey: PlanKey) {
  const plan = getPlan(planKey);
  const name = form.querySelector<HTMLElement>('[data-plan-name]');
  const price = form.querySelector<HTMLElement>('[data-plan-price]');

  if (name) {
    name.textContent = `${plan.key} Pack`;
  }

  if (price) {
    price.textContent = plan.price;
  }
}

function initializeSignUpForm(form: HTMLFormElement) {
  if (form.dataset.signupReady === 'true') {
    return;
  }

  const planSelect = form.querySelector<HTMLSelectElement>('[data-plan-select]');
  const submitControl = form.querySelector<HTMLButtonElement>(
    '[data-submit-control]',
  );

  if (!planSelect || !submitControl) {
    return;
  }

  // Install the network-inert ownership boundary before this control can
  // become a native submit button. Validation and persistence are added by
  // later implementation tasks.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const initialPlan = parsePlanFromUrl(window.location.href);
  planSelect.value = initialPlan;
  updatePlanPresentation(form, initialPlan);

  planSelect.addEventListener('change', () => {
    const plan = constrainPlanKey(planSelect.value || DEFAULT_PLAN_KEY);
    updatePlanPresentation(form, plan);
  });

  submitControl.type = 'submit';
  form.dataset.signupReady = 'true';
}

export function initializeSignUpForms() {
  document.querySelectorAll<HTMLFormElement>('[data-signup-form]').forEach(
    initializeSignUpForm,
  );
}
