import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isLoggedIn(){
  if(sessionStorage?.getItem("access_token")){
      return true;
  }
  return false;
}
