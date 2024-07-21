import { Hono } from "hono";
import blogRoutes from "./routes/blog";
import authRoutes from "./routes/auth";
import { cors } from "hono/cors";

//All API's start with this base path
const app = new Hono().basePath("/api/v1");
app.use(cors({
  origin: 'http://localhost:3000',
}))
app.route("/blog", blogRoutes);
app.route("/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
