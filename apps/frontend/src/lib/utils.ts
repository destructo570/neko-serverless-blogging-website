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
