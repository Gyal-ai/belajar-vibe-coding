import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export const usersRoute = new Elysia({ prefix: "/users" })
  // GET all users
  .get("/", async () => {
    return await db.select().from(users);
  }, {
    detail: {
      tags: ["Users"],
      summary: "List all users",
    }
  })

  // GET user by id
  .get("/:id", async ({ params: { id }, set }) => {
    const numId = Number(id);
    const result = await db.select().from(users).where(eq(users.id, numId)).limit(1);
    if (!result.length) {
      set.status = 404;
      return { error: "User not found" };
    }
    return result[0];
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
    detail: {
      tags: ["Users"],
      summary: "Get user by ID",
    }
  })

  // POST create new user
  .post("/", async ({ body, set }) => {
    try {
      const insertResult = await db.insert(users).values({
        name: body.name,
        email: body.email,
      });

      const insertedId = insertResult[0].insertId;
      set.status = 201;
      return {
        message: "User created successfully",
        id: insertedId,
        name: body.name,
        email: body.email,
      };
    } catch (err: any) {
      set.status = 400;
      return { error: err.message || "Failed to create user" };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
    }),
    detail: {
      tags: ["Users"],
      summary: "Create a new user",
    }
  })

  // PUT update user by id
  .put("/:id", async ({ params: { id }, body, set }) => {
    const numId = Number(id);
    try {
      await db.update(users).set(body).where(eq(users.id, numId));
      return { message: "User updated successfully" };
    } catch (err: any) {
      set.status = 400;
      return { error: err.message || "Failed to update user" };
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String({ format: "email" })),
    }),
    detail: {
      tags: ["Users"],
      summary: "Update user by ID",
    }
  })

  // DELETE user by id
  .delete("/:id", async ({ params: { id }, set }) => {
    const numId = Number(id);
    try {
      await db.delete(users).where(eq(users.id, numId));
      return { message: "User deleted successfully" };
    } catch (err: any) {
      set.status = 400;
      return { error: err.message || "Failed to delete user" };
    }
  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
    detail: {
      tags: ["Users"],
      summary: "Delete user by ID",
    }
  });
