import z from "zod";
import { FastifyTypeInstance } from "../../infra/types";
import { AuthController } from "./auth.controller";
import { loginSchema } from "./schemas/login.schema";
import { authResponseSchema } from "./schemas/auth-response.schema";
import { AuthModule } from "./auth.module";
import { BootstrapFactory } from "../../infra/factories/BootstrapFactory";

export async function authRoutes(app: FastifyTypeInstance) {
  const { authModule, authController } = BootstrapFactory.create();

  app.post('/login', {
    schema: {
      tags: [authModule.info.name],
      description: 'Login',
      body: loginSchema,
      response: {
        200: authResponseSchema,
      }
    }
  }, async (request, reply) => {
    const response = await authController.login(request.body);
    return reply.status(200).send(response);
  });
}