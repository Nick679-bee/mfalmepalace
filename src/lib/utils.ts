import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKsh(amount: number): string {
  if (!Number.isFinite(amount)) return "";
  const rounded = Math.round(amount);
  return `Ksh ${rounded.toLocaleString('en-KE')}`;
}
