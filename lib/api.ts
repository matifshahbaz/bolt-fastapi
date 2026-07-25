const defaultApiBaseUrl = 'http://127.0.0.1:8000';

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || defaultApiBaseUrl;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactResponse = {
  submission_id: string;
  received_at: string;
  message: string;
};

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export function submitContactForm(payload: ContactPayload) {
  return apiRequest<ContactResponse>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}