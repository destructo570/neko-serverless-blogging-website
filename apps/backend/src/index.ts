import { Hono } from "hono";
import blogRoutes from "./routes/blog";
import authRoutes from "./routes/auth";

//All API's start with this base path
const app = new Hono().basePath("/api/v1");

app.route("/blog", blogRoutes);
app.route("/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
