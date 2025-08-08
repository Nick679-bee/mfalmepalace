export type Booking = {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string; // ISO
  checkOut: string; // ISO
  status: "confirmed" | "pending" | "cancelled";
  total: number;
};

export type Property = {
  id: string;
  name: string;
  type: "1-bedroom" | "2-bedroom";
  nightlyRate: number;
  occupancy: number;
  image: string;
};

export const properties: Property[] = [
  {
    id: "p1",
    name: "Mfalme 1‑Bedroom Suite",
    type: "1-bedroom",
    nightlyRate: 6500,
    occupancy: 2,
    image: "/images/interior.jpg",
  },
  {
    id: "p2",
    name: "Mfalme 2‑Bedroom Apartment",
    type: "2-bedroom",
    nightlyRate: 9500,
    occupancy: 4,
    image: "/images/hero-eldoret.jpg",
  },
];

const booked: Record<string, string[]> = {
  p1: ["2025-08-15", "2025-08-16"],
  p2: ["2025-08-20"],
};

export async function getProperties() {
  return properties;
}

export async function getAvailability(propertyId: string) {
  const dates = (booked[propertyId] || []).map((d) => new Date(d));
  return { bookedDates: dates, minNights: 1, maxNights: 30 };
}

let bookings: Booking[] = [
  { id: "b1", propertyId: "p1", guestName: "Jane Doe", checkIn: "2025-08-10", checkOut: "2025-08-12", status: "confirmed", total: 13000 },
  { id: "b2", propertyId: "p2", guestName: "John Kim", checkIn: "2025-08-20", checkOut: "2025-08-23", status: "pending", total: 28500 },
];

export async function getBookings(): Promise<Booking[]> {
  return bookings;
}

export async function createBooking(newBooking: Omit<Booking, "id">) {
  const id = Math.random().toString(36).slice(2, 9);
  const b: Booking = { id, ...newBooking };
  bookings = [b, ...bookings];
  return { ok: true, booking: b };
}

export async function deleteBooking(id: string) {
  const before = bookings.length;
  bookings = bookings.filter(b => b.id !== id);
  return { ok: bookings.length < before };
}
