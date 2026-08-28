export const COUNTDOWN_UNITS = [
  'days',
  'hours',
  'minutes',
  'seconds',
] as const;

export type CountdownUnit = (typeof COUNTDOWN_UNITS)[number];

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SECOND_MS = 1_000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

function parseTarget(targetInstant: string): number {
  const timestamp = Date.parse(targetInstant);

  if (Number.isNaN(timestamp)) {
    throw new RangeError(`Invalid countdown target: ${targetInstant}`);
  }

  return timestamp;
}

export function getCountdownParts(
  targetInstant: string,
  now = Date.now(),
): CountdownParts | null {
  const remaining = parseTarget(targetInstant) - now;

  if (remaining <= 0) {
    return null;
  }

  return {
    days: Math.floor(remaining / DAY_MS),
    hours: Math.floor((remaining % DAY_MS) / HOUR_MS),
    minutes: Math.floor((remaining % HOUR_MS) / MINUTE_MS),
    seconds: Math.floor((remaining % MINUTE_MS) / SECOND_MS),
  };
}

export function formatCountdownValue(value: number): string {
  return String(value).padStart(2, '0');
}

export function startCountdown(
  targetInstant: string,
  onTick: (parts: CountdownParts) => void,
): () => void {
  let timer: ReturnType<typeof setInterval> | undefined;

  const tick = () => {
    const parts = getCountdownParts(targetInstant);

    if (!parts) {
      if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }

      return false;
    }

    onTick(parts);
    return true;
  };

  if (!tick()) {
    return () => {};
  }

  timer = setInterval(tick, SECOND_MS);

  return () => {
    if (timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}
