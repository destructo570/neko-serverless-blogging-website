import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserProfileObject } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLoggedIn() {
  const data: UserProfileObject = {
    is_logged_in: false,
    profile: {},
  };

  if (sessionStorage?.getItem("access_token")) {
    data.is_logged_in = true;
  }

  if (sessionStorage?.getItem("profile")) {
    data.profile = JSON.parse(sessionStorage?.getItem("profile") || "{}");
  }
  return data;
}

/**
 * Creates a debounced version of the provided function that delays its execution 
 * until after a specified wait time has elapsed since the last time it was invoked.
 *
 * @template T - The type of the function to debounce.
 * @param {T} func - The function to debounce.
 * @param {number} [timeout=300] - The number of milliseconds to delay execution.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the provided function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  timeout: number = 300
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}