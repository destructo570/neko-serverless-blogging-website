import { getSubscriptionEndDate } from "@/lib/utils";
import { SubscriptionType } from "@repo/common/config";
import React from "react";
import { PRO_FEATURES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playfair_display } from "../fonts";
import clsx from "clsx";
import { cancelSubscription } from "../api/actions";
import useProfile from "@/hooks/useProfile";

const SubscribedPage = ({
  subscription,
}: {
  subscription: SubscriptionType;
}) => {
  const router = useRouter();
  const userData = useProfile();

  const onCancelSubscription = async () => {
    const response = await cancelSubscription(subscription.id);
    console.log("here2");
    if (response && response?.status === 200 && userData.profile) {
        console.log("here");
        
      const profile = userData.profile;
      delete profile?.subscription;
      sessionStorage.setItem("profile", JSON.stringify(profile));
      router.push("/blog");
    }
  };
  return (
    <section className="min-h-[100vh] max-w-[400px] mx-auto mt-20">
      <h2 className={clsx("text-3xl", playfair_display.className)}>
        Thank you for subscribing!
      </h2>

      <Card className="mb-6 mt-6">
        <CardHeader>
          <CardTitle>Your Membership Details</CardTitle>
          <CardDescription>{`Subscription ending on: ${getSubscriptionEndDate(subscription)}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {PRO_FEATURES.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onCancelSubscription}>
            {"Cancel Subscription"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SubscribedPage;
