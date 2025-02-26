import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const CryptoJS = require("crypto-js");

const membershipRoutes = new Hono<{
  Bindings: {
    RAZOR_KEY: string;
    RAZOR_SID: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

membershipRoutes.post("/create-subscription", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const jwt_response = await verify(token, c.env.JWT_SECRET);

  if (!jwt_response?.id || typeof jwt_response?.id !== "string") {
    c.status(401);
    return c.json({ error: "Unauthorised" });
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic cnpwX3Rlc3RfNEFsTTQ2WUFKNkVDNXU6Y3R1MHIyV2F3OGc5dzFUNDBycmlwMWF0",
    },
    body: JSON.stringify({
      plan_id: body.planId,
      total_count: 12,
      customer_notify: 1,
    }),
  };

  const response = await fetch(
    "https://api.razorpay.com/v1/subscriptions",
    requestOptions
  );
  const subscription = await response.json();

  await prisma.subscriptions.create({
    data: {
      id: subscription.id,
      userId: jwt_response?.id,
    },
  });

  return c.json({
    id: subscription.id,
    created_at: subscription.created_at,
    short_url: subscription.short_url,
  });
});

membershipRoutes.post("/verification", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const jwt_response = await verify(token, c.env.JWT_SECRET);

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = body;
    const secret = c.env.RAZOR_SID;
    const dataToHash = razorpay_payment_id + "|" + razorpay_subscription_id;

    const hmac = CryptoJS.HmacSHA256(dataToHash, secret).toString(
      CryptoJS.enc.Hex
    );
    
    if (hmac === razorpay_signature) {
      await prisma.subscriptions.update({
        where: {
          id: razorpay_subscription_id,
          userId: jwt_response?.id,
        },
        data: {
          razorPaymentId: razorpay_payment_id,
          razorSubscriptionId: razorpay_subscription_id,
          razorSignature: razorpay_signature
        },
      });
      return c.json("Subscribed successfully")
    } else {
      c.status(401);
      return c.json("Invalid subscription request")
    }
  } catch (error) {
    return c.json({ error });
  }
});

export default membershipRoutes;
