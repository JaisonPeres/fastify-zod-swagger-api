import { BootstrapFactory } from "../../infra/factories/BootstrapFactory";
import { FastifyTypeInstance } from "../../infra/types";
import { AuthGuard } from "../auth/auth.guard";
import { createUserSchema } from "./schemas/create-user.schema";
import { getUserSchema, getUsersSchema } from "./schemas/get-user.schema";

export async function userRoutes(app: FastifyTypeInstance) {
  const { userController, userModule } = BootstrapFactory.create();

  const path = '/users';
  const tags = [userModule.info.name];

  app.get(path, {
    schema: {
      tags,
      description: 'List all users',
      response: {
        200: getUsersSchema.describe('List of users'),
      },
      security: [{ bearerAuth: [] }],
    },
    preValidation: AuthGuard.token,
  }, async (request, reply) => {
    const users = await userController.getUsers();
    return reply.send(users);
  });

  app.post(path, {
    schema: {
      tags,
      description: 'Create a new user',
      body: createUserSchema,
      response: {
        201: getUserSchema.describe('User created'),
      },
      security: [{ bearerAuth: [] }],
    },
    preValidation: AuthGuard.token,
  }, async (request, reply) => {
    const user = await userController.createUser(request.body);
    return reply.status(201).send(user);
  });
}