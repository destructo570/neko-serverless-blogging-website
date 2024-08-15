import { UserProfileObject } from "@/lib/types";
import { isLoggedIn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useLogin() {
  const [login_data, setLoginData] = useState<UserProfileObject>();
  
  useEffect(() => {
    setLoginData(isLoggedIn());
  }, []);

  return {...login_data};
}
