import { isLoggedIn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useLogin() {
  const [is_logged_in, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isLoggedIn());
  }, []);

  return is_logged_in;
}
