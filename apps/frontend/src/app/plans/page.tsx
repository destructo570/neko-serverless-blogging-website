"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanCard from "./plan-card";
import clsx from "clsx";
import { playfair_display } from "../fonts";
import { createSubscription } from "../api/actions";
import { client } from "../api/axiosClient";
import useProfile from "@/hooks/useProfile";
import { getSubscriptionDataFromProfile } from "@/lib/utils";
import SubscribedPage from "./subscribed-page";
import { MONTHLY_PLAN_ID, PRO_FEATURES, YEARLY_PLAN_ID } from "@/lib/constants";

export default function MembershipPage() {

  const user_data = useProfile();

  const onPlanClick = async (type = "monthly") => {
    let isMonthly = type === "monthly";
    const planId = isMonthly ? MONTHLY_PLAN_ID : YEARLY_PLAN_ID;
    const response = await createSubscription(planId);
    const subscription_id = response?.data?.subscription?.id;

    if(!subscription_id) return;
    
    let options = {
      subscription_id,
      key: process.env.NEXT_PUBLIC_RAZOR_KEY,
      name: isMonthly ? "Monthly" : "Yearly",
      description: `Auth txn for ${isMonthly ? "Monthly" : "Yearly"} Subscription`,
      handler: async function (response = {}) {
        await client.post("/api/v1/membership/verification", { ...response });
      },
    };
    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  const user_subscription = getSubscriptionDataFromProfile(user_data.profile);

  if(user_subscription) return <SubscribedPage subscription={user_subscription}/>

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Pricing */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col mt-8">
          <div className="max-w-[450px] mx-auto">
            <div className="w-full flex justify-center">
              <h1
                className={clsx(
                  "text-3xl md:text-4xl font-bold mb-2 max-w-[320px] text-center",
                  playfair_display.className
                )}
              >
                Access all stories and Support great writing.
              </h1>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Tabs defaultValue="monthly" className="w-[450px] tabs-component">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
                <TabsContent value="monthly">
                  <PlanCard
                    title="Monthly"
                    subTitle={"Get access to all premium features"}
                    price={9.99}
                    features={PRO_FEATURES}
                    duration={"month"}
                    onClick={onPlanClick.bind(null, "monthly")}
                  />
                </TabsContent>
                <TabsContent value="yearly">
                  <PlanCard
                    title="Annual"
                    subTitle={"Save 20% with annual billing"}
                    price={9.99 * 12 * 0.8}
                    features={PRO_FEATURES}
                    duration={"year"}
                    onClick={onPlanClick.bind(null, "yearly")}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <p className="text-sm text-center text-muted-foreground">
              Cancel anytime. No hidden fees.
            </p>
          </div>
        </div>

        <div>
          <Image
            src="https://picsum.photos/800/600"
            alt="Membership benefits"
            width={600}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
