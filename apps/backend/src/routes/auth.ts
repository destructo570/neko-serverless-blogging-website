import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { getTokenExpiryTime } from "../../utils/helper";
import { signinInput, signupInput } from "@repo/common/config";

const authRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

authRoutes.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  
  
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  const token = await sign(
    { id: user.id, exp: getTokenExpiryTime() },
    c.env.JWT_SECRET
  );
  return c.json({ token });
});

authRoutes.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }
  
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      first_name: body.first_name,
      last_name: body.last_name,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  const token = await sign(
    { id: user.id, exp: getTokenExpiryTime() },
    c.env.JWT_SECRET
  );
  return c.json({ token });
});

export default authRoutes;
