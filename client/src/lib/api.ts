export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export type Property = {
  _id: string;
  title: string;
  slug: string;
  purpose: string;
  category: string;
  status: 'available' | 'sold' | 'rented' | 'reserved';
  isFeatured: boolean;
  isVerified: boolean;
  nocApproved: boolean;
  city: string;
  area: string;
  block?: string;
  price: number;
  priceLabel?: string;
  size: number;
  sizeUnit: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  possession?: string;
  images: string[];
  description: string;
  amenities: string[];
  nearby: string[];
  agent?: { name?: string; phone?: string; whatsapp?: string; agency?: string };
};

export async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    cache: 'no-store'
  });
  if (!res.ok) {
    const text = await res.text();
    let message = text || 'Request failed';
    try {
      const data = JSON.parse(text);
      message = data.message || message;
    } catch {}
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function authHeaders() {
  if (typeof window === 'undefined') return {};
  const token = window.localStorage.getItem('rb_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
