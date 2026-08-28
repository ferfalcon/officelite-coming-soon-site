import {
  DEFAULT_PLAN_KEY,
  PLANS,
  SIGN_UP_STATUS_COPY,
  type PlanKey,
} from '../data/product';
import { constrainPlanKey, parsePlanFromUrl } from '../lib/plan-context';
import {
  persistSignUpRecord,
  type SignUpRecord,
  type SignUpStoreResult,
} from '../lib/signup-store';

type SignUpFieldName = 'name' | 'email' | 'plan' | 'phone' | 'company';
type SignUpControl = HTMLInputElement | HTMLSelectElement;

const FIELD_NAMES: readonly SignUpFieldName[] = [
  'name',
  'email',
  'plan',
  'phone',
  'company',
];

const REQUIRED_MESSAGES: Record<SignUpFieldName, string> = {
  name: 'Name is required.',
  email: 'Email address is required.',
  plan: 'Select a plan.',
  phone: 'Phone number is required.',
  company: 'Company is required.',
};

const INVALID_EMAIL_MESSAGE = 'Enter a valid email address.';

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

function getFieldControl(
  form: HTMLFormElement,
  fieldName: SignUpFieldName,
): SignUpControl | null {
  const control = form.elements.namedItem(fieldName);

  if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement) {
    return control;
  }

  return null;
}

function setFieldError(
  form: HTMLFormElement,
  fieldName: SignUpFieldName,
  control: SignUpControl,
  message: string | null,
) {
  const field = form.querySelector<HTMLElement>(`[data-field="${fieldName}"]`);
  const error = form.querySelector<HTMLElement>(
    `[data-field-error="${fieldName}"]`,
  );

  if (!field || !error) {
    return;
  }

  if (message) {
    control.setAttribute('aria-invalid', 'true');
    field.classList.add('form-field--invalid');
    error.textContent = message;
    error.hidden = false;
    return;
  }

  control.removeAttribute('aria-invalid');
  field.classList.remove('form-field--invalid');
  error.textContent = '';
  error.hidden = true;
}

function getFieldErrorMessage(
  fieldName: SignUpFieldName,
  control: SignUpControl,
): string | null {
  if (control.validity.valueMissing) {
    return REQUIRED_MESSAGES[fieldName];
  }

  if (
    fieldName === 'email' &&
    control instanceof HTMLInputElement &&
    control.validity.typeMismatch
  ) {
    return INVALID_EMAIL_MESSAGE;
  }

  return null;
}

function validateField(
  form: HTMLFormElement,
  fieldName: SignUpFieldName,
  control: SignUpControl,
) {
  const message = getFieldErrorMessage(fieldName, control);
  setFieldError(form, fieldName, control, message);

  return message === null;
}

function readValidSignUpRecord(
  form: HTMLFormElement,
): SignUpRecord | null {
  const controls = new Map<SignUpFieldName, SignUpControl>();
  let isValid = true;

  for (const fieldName of FIELD_NAMES) {
    const control = getFieldControl(form, fieldName);

    if (!control) {
      return null;
    }

    controls.set(fieldName, control);

    if (!validateField(form, fieldName, control)) {
      isValid = false;
    }
  }

  if (!isValid) {
    return null;
  }

  const name = controls.get('name') as HTMLInputElement;
  const email = controls.get('email') as HTMLInputElement;
  const plan = controls.get('plan') as HTMLSelectElement;
  const phone = controls.get('phone') as HTMLInputElement;
  const company = controls.get('company') as HTMLInputElement;

  return {
    name: name.value,
    email: email.value,
    plan: constrainPlanKey(plan.value || DEFAULT_PLAN_KEY),
    phone: phone.value,
    company: company.value,
  };
}

function clearPersistenceStatus(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('[data-signup-status]');

  if (!status) {
    return;
  }

  status.textContent = '';
  delete status.dataset.status;
}

function showPersistenceStatus(
  form: HTMLFormElement,
  result: SignUpStoreResult,
) {
  const status = form.querySelector<HTMLElement>('[data-signup-status]');

  if (!status) {
    return;
  }

  status.dataset.status = result.status;
  status.textContent =
    result.status === 'success'
      ? SIGN_UP_STATUS_COPY.success
      : SIGN_UP_STATUS_COPY.failure;
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

  // The static shell cannot submit. Once initialized, this controller owns
  // validation and keeps the current release network-inert.
  form.noValidate = true;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearPersistenceStatus(form);

    const record = readValidSignUpRecord(form);

    if (!record) {
      return;
    }

    const result = await persistSignUpRecord(record);
    showPersistenceStatus(form, result);
  });

  for (const fieldName of FIELD_NAMES) {
    const control = getFieldControl(form, fieldName);

    if (!control) {
      continue;
    }

    const recoveryEvent = control instanceof HTMLSelectElement ? 'change' : 'input';

    control.addEventListener(recoveryEvent, () => {
      if (control.getAttribute('aria-invalid') === 'true') {
        validateField(form, fieldName, control);
      }
    });
  }

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
