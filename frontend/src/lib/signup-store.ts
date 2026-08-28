import type { PlanKey } from '../data/product';

export interface SignUpRecord {
  name: string;
  email: string;
  plan: PlanKey;
  phone: string;
  company: string;
}

export type SignUpStoreResult =
  | { status: 'success' }
  | { status: 'failure' };

const DATABASE_NAME = 'officelite-signups';
const DATABASE_VERSION = 1;
const STORE_NAME = 'signups';

function openSignUpDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error ?? new Error('Unable to open the sign-up database.'));
    };

    request.onblocked = () => {
      reject(new Error('The sign-up database is blocked.'));
    };
  });
}

function writeSignUpRecord(
  database: IDBDatabase,
  record: SignUpRecord,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');

    transaction.objectStore(STORE_NAME).add(record);

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(transaction.error ?? new Error('Unable to save the sign-up record.'));
    };

    transaction.onabort = () => {
      reject(transaction.error ?? new Error('The sign-up write was aborted.'));
    };
  });
}

export async function persistSignUpRecord(
  record: SignUpRecord,
): Promise<SignUpStoreResult> {
  if (!('indexedDB' in globalThis)) {
    return { status: 'failure' };
  }

  let database: IDBDatabase | null = null;

  try {
    database = await openSignUpDatabase();
    await writeSignUpRecord(database, record);

    return { status: 'success' };
  } catch {
    return { status: 'failure' };
  } finally {
    database?.close();
  }
}
