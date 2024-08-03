import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { getTokenExpiryTime } from "../../utils/helper";
import { signinInput, signupInput } from "@repo/common/config";
import bcrypt from 'bcryptjs';

const authRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    PASSWORD_SALT: string;
  };
}>();

authRoutes.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const hashed_password = bcrypt.hashSync(body.password, c.env.PASSWORD_SALT);
  
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: hashed_password,
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
  return c.json({
    token,
    profile: {
      first_name: user?.first_name,
      las_name: user?.last_name,
      id: user?.id,
      email: user?.email,
    },
  });
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

  const hashed_password = bcrypt.hashSync(body.password, c.env.PASSWORD_SALT);
  
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashed_password,
      first_name: body.first_name,
      last_name: body.last_name,
    },
  });

  if (!user) {
  }

  const token = await sign(
    { id: user.id, exp: getTokenExpiryTime() },
    c.env.JWT_SECRET
  );
  return c.json({ token });
});

export default authRoutes;
