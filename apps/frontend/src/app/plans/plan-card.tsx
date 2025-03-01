import React from "react";
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

interface PlanCardType {
  title: string;
  subTitle: string;
  price: number;
  features: string[];
  duration: string;
  buttonText?: string;
  onClick: any
}

const PlanCard = ({
  title,
  subTitle,
  price,
  features,
  duration,
  onClick,
  buttonText
}: PlanCardType) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title} Membership</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground ml-1">/{duration}</span>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onClick}>{buttonText ? buttonText : "Get Started Now"}</Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
