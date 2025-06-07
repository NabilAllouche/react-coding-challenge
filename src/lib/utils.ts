import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSkipImage(size: number): string {
  const baseUrl =
    "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes";

  // Handle specific sizes
  if (size === 4) {
    return `${baseUrl}/4-yarder-skip.jpg`;
  } else if (size >= 5 && size <= 15) {
    return `${baseUrl}/5-yarder-skip.jpg`;
  } else if (size === 16) {
    return `${baseUrl}/16-yarder-skip.jpg`;
  } else if (size === 20) {
    return `${baseUrl}/20-yarder-skip.jpg`;
  } else if (size === 40) {
    return `${baseUrl}/40-yarder-skip.jpg`;
  }

  // Fallback logic for sizes not explicitly defined
  if (size < 4) {
    return `${baseUrl}/4-yarder-skip.jpg`; // Smallest available
  } else if (size > 15 && size < 20) {
    return `${baseUrl}/16-yarder-skip.jpg`; // Closest match
  } else if (size > 20 && size < 40) {
    return `${baseUrl}/20-yarder-skip.jpg`; // Closest match
  } else {
    return `${baseUrl}/40-yarder-skip.jpg`; // Largest available
  }
}
