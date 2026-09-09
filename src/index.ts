import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { usersRoute } from "./routes/users";

const port = Number(Bun.env.PORT) || 3000;

export const app = new Elysia()
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "Belajar Vibe Coding API",
          version: "1.0.0",
          description: "Backend API using Bun, ElysiaJS, Drizzle ORM, and MySQL",
        },
      },
    })
  )
  .get("/", () => ({
    message: "Server is running!",
    docs: "/swagger",
  }))
  .use(usersRoute)
  .listen(port);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Swagger documentation at http://${app.server?.hostname}:${app.server?.port}/swagger`);
