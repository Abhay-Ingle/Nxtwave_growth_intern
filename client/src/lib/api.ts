export type RegistrationInput = {
  name: string;
  phone: string;
  email: string;
  college: string;
  year: string;
  source: string;
  referralCode?: string;
  utm: Record<string, string>;
};

export type Analytics = {
  total: number;
  referralCount: number;
  sourceBreakdown: Array<{ source: string; count: number }>;
  daily: Array<{ date: string; count: number }>;
  recent: Array<{ name: string; email?: string; college: string; source: string; createdAt: string; referralCode: string }>;
};

const apiBase = import.meta.env.VITE_API_URL || '/api';
const LOCAL_STORAGE_KEY = 'nxtwave-growth-demo-data';

type DemoRegistration = RegistrationInput & {
  createdAt: string;
  referralCode: string;
};

function readDemoRecords(): DemoRegistration[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DemoRegistration[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDemoRecords(records: DemoRegistration[]) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

function createReferralCode(name: string) {
  const prefix = name.replace(/[^a-z]/gi, '').slice(0, 5).toUpperCase() || 'BUILD';
  return `${prefix}${Math.floor(100 + Math.random() * 900)}`;
}

function normalizeSource(source: string) {
  return ({ 'college-club': 'College club', whatsapp: 'WhatsApp', referral: 'Referral', email: 'Email', paid: 'Paid' } as Record<string, string>)[source] || source || 'Direct';
}

async function requestWithFallback<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = await response.json().catch(() => ({}));
      throw new Error(message.message || 'Request failed');
    }
    return (await response.json()) as T;
  } catch (error) {
    if (url.includes('/registrations') && options?.method === 'POST') {
      const input = JSON.parse(String(options.body));
      const records = readDemoRecords();
      const email = String(input.email).toLowerCase();
      if (records.some((record) => record.email.toLowerCase() === email)) {
        throw new Error('This email is already registered.');
      }
      const referralCode = createReferralCode(input.name);
      const record: DemoRegistration = { ...input, createdAt: new Date().toISOString(), referralCode, source: normalizeSource(input.source) };
      records.push(record);
      writeDemoRecords(records);
      return { referralCode } as T;
    }

    if (url.includes('/analytics')) {
      const records = readDemoRecords();
      const totals = new Map<string, number>();
      const daily = new Map<string, number>();
      records.forEach((record) => {
        totals.set(record.source, (totals.get(record.source) || 0) + 1);
        const date = new Date(record.createdAt).toISOString().slice(0, 10);
        daily.set(date, (daily.get(date) || 0) + 1);
      });
      const sourceBreakdown = [...totals.entries()].map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
      const recent = [...records].reverse().slice(0, 8).map((record) => ({
        name: record.name,
        email: record.email,
        college: record.college,
        source: record.source,
        createdAt: record.createdAt,
        referralCode: record.referralCode,
      }));
      return {
        total: records.length,
        referralCount: records.filter((record) => record.referralCode).length,
        sourceBreakdown,
        daily: [...daily.entries()].map(([date, count]) => ({ date, count })).reverse(),
        recent,
      } as T;
    }

    throw error;
  }
}

export async function createRegistration(input: RegistrationInput) {
  return requestWithFallback<{ referralCode: string }>(`${apiBase}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

export async function getAnalytics() {
  return requestWithFallback<Analytics>(`${apiBase}/analytics`);
}