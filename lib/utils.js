import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple Tailwind class names intelligently.
 * @example cn("bg-white", condition && "text-black", "px-4")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
