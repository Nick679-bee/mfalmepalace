import interior from "@/assets/interior.jpg";
import hero from "@/assets/hero-eldoret.jpg";

export type Booking = {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string; // ISO
  checkOut: string; // ISO
  status: "confirmed" | "pending" | "cancelled";
  total: number;
};

export const properties = [
  {
    id: "p1",
    name: "Mfalme 1‑Bedroom Suite",
    type: "1-bedroom",
    nightlyRate: 6500,
    occupancy: 2,
    image: interior,
  },
  {
    id: "p2",
    name: "Mfalme 2‑Bedroom Apartment",
    type: "2-bedroom",
    nightlyRate: 9500,
    occupancy: 4,
    image: hero,
  },
] as const;

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

export async function getBookings(): Promise<Booking[]> {
  return [
    { id: "b1", propertyId: "p1", guestName: "Jane Doe", checkIn: "2025-08-10", checkOut: "2025-08-12", status: "confirmed", total: 13000 },
    { id: "b2", propertyId: "p2", guestName: "John Kim", checkIn: "2025-08-20", checkOut: "2025-08-23", status: "pending", total: 28500 },
  ];
}

export async function createBooking() {
  return { ok: true };
}
