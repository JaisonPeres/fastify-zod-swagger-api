import z from "zod";
import { FastifyTypeInstance } from "../../types";
import { createUserSchema } from "./schemas/create-user.schema";
import { getUserSchema } from "./schemas/get-user.schema";
import { UserController } from "./users.controller";

export async function userRoutes(app: FastifyTypeInstance) {
  const userController = new UserController();

  app.get('/users', {
    schema: {
      tags: ['user'],
      description: 'List all users',
      response: {
        200: getUserSchema,
      }
    }
  }, async (request, reply) => {
    const users = await userController.getUsers();
    return reply.send(users);
  });

  app.post('/users', {
    schema: {
      tags: ['user'],
      description: 'Create a new user',
      body: createUserSchema,
      response: {
        201: z.null().describe('User created'),
      }
    }
  }, async (request, reply) => {
    await userController.createUser(request.body);
    return reply.status(201).send();
  });
}