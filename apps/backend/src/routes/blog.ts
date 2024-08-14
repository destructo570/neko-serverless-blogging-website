import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput } from "@repo/common/config";

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRoutes.use("/auth/*", async (c, next) => {
  if(c.req.url.includes("/")){
    await next();
  }
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response?.id) {
      await next();
    }
  } catch (err) {
    c.status(403);
    return c.json({ error: "Unauthorised" });
  }
});

blogRoutes.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    orderBy: [{
      createdAt: "desc"
    }],
    relationLoadStrategy: "join",
    include: {
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      },
    },
  });

  return c.json({ posts });
});

blogRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    relationLoadStrategy: "join",
    include: {
      author: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      },
    },
  });  
  return c.json({ post });
});

blogRoutes.post("/auth/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const jwt_response = await verify(token, c.env.JWT_SECRET);

  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  if (!jwt_response?.id || typeof jwt_response?.id !== "string") {
    c.status(401);
    return c.json({ error: "Unauthorised" });
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      description: body.description,
      authorId: jwt_response?.id,
    },
  });

  return c.json({ post });
});

blogRoutes.put("/auth/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const jwt_response = await verify(token, c.env.JWT_SECRET);

  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }
  
  if (jwt_response?.id !== body.authorId) {
    c.status(401);
    return c.json({ error: "Unauthorised" });
  }

  const post = await prisma.post.update({
    where: {
      id,
      authorId: body.authorId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ post });
});

blogRoutes.delete("/auth/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.delete({
    where: { id },
  });

  return c.json({ post });
});

export default blogRoutes;
