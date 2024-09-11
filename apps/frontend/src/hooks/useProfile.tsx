import { UserProfileObject } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useProfile() {
  const [profile, setProfileData] = useState<UserProfileObject>();

  useEffect(() => {
    const data: UserProfileObject = {
      profile: {},
    };

    if (sessionStorage?.getItem("profile")) {
      data.profile = JSON.parse(sessionStorage?.getItem("profile") || "{}");
    }

    setProfileData(data);
  }, []);

  return { ...profile };
}
