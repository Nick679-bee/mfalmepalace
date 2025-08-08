export type ApiResult<T> = { data: T; error?: string };

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

function getBaseUrl(): string {
  return API_URL || "http://localhost:4000";
}

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      ...init,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { data: undefined as unknown as T, error: text || res.statusText };
    }
    const json = (await res.json()) as T;
    return { data: json };
  } catch (e: any) {
    return { data: undefined as unknown as T, error: e.message };
  }
}

export type PropertySummary = {
  id: number | string;
  name: string;
  type: string;
  max_guests: number;
  pet_friendly: boolean;
  eco_friendly: boolean;
  photos: string[];
  nightly_rate?: number;
  nightly_rate_cents?: number;
  currency?: string;
};

export type PropertyDetail = PropertySummary & {
  description: string;
  distance_to_airport_minutes: number;
  amenities: string[];
  availability: { blackout_dates: string[] };
  nightly_rate?: number; // optional Ksh amount per night, if provided by API
  nightly_rate_cents?: number; // optional cents, if provided by API
  currency?: string; // optional currency code
};

export async function apiListProperties() {
  return request<PropertySummary[]>(`/properties`);
}

export async function apiGetProperty(id: string | number) {
  return request<PropertyDetail>(`/properties/${id}`);
}

export type CreateBookingPayload = {
  property_id: string | number;
  check_in: string;
  check_out: string;
  guests_count: number;
  special_requests?: string;
};

export type BookingResponse = {
  id: string | number;
  property_id: string | number;
  user_id: string | number;
  check_in: string;
  check_out: string;
  nights: number;
  guests_count: number;
  currency: string;
  price_cents: number;
  status: string;
  payment_status: string;
  special_requests?: string;
};

export async function apiCreateBooking(payload: CreateBookingPayload) {
  return request<BookingResponse>(`/bookings`, {
    method: 'POST',
    body: JSON.stringify({ booking: payload }),
  });
}

export async function apiListBookings() {
  return request<BookingResponse[]>(`/bookings`);
}

export async function apiDeleteBooking(id: string | number) {
  return request<void>(`/bookings/${id}`, { method: 'DELETE' });
}
