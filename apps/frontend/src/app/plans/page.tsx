"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanCard from "./plan-card";
import clsx from "clsx";
import { playfair_display } from "../fonts";

export default function MembershipPage() {
  const features = [
    "Read member-only stories",
    "Support writers you read most",
    "Earn money for your writing",
    "Listen to audio narrations",
  ];

  return (
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
                  features={features}
                  duration={"month"}
                />
              </TabsContent>
              <TabsContent value="yearly">
                <PlanCard
                  title="Annual"
                  subTitle={"Save 20% with annual billing"}
                  price={9.99 * 12 * 0.8}
                  features={features}
                  duration={"year"}
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
  );
}
