import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addressSplitter(
  address: string,
  split: number = 5
): string {
  return address.slice(0, split) + "..." + address.slice(-split);
}

export function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
