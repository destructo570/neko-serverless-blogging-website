import { SubscriptionType, UserProfileType } from "@repo/common/config";
import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { MONTHLY_PLAN_ID } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDevEnvironment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

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

export function getSubscriptionDataFromProfile(
  profile: UserProfileType | undefined
) {
  if (!profile) return null;
  const subscriptions = profile.subscription || [];

  const result = subscriptions.find((subscription) => {
    console.log(
      subscription.planId,
      subscription.createdAt,
      subscription.razorSignature
    );

    return (
      subscription.planId &&
      subscription.createdAt &&
      subscription.razorSignature
    );
  });
  console.log("result", result);

  return result;
}

export function getSubscriptionEndDate(subscription: SubscriptionType) {
  const createdAt = subscription.createdAt;

  if(subscription.planId === MONTHLY_PLAN_ID){
    return dayjs(createdAt).add(1, "month").format("YYYY-MM-DD");
  }else{
    return dayjs(createdAt).add(1, "year").format("DD MMM YYYY");
  }
}
