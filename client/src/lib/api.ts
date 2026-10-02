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

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function createRegistration(input: RegistrationInput) {
  const response = await fetch(`${apiBase}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error((await response.json()).message || 'Unable to register');
  return response.json() as Promise<{ referralCode: string }>;
}

export async function getAnalytics() {
  const response = await fetch(`${apiBase}/analytics`);
  if (!response.ok) throw new Error('Analytics are temporarily unavailable');
  return response.json() as Promise<Analytics>;
}