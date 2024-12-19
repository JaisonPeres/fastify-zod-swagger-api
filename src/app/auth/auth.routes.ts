import z from "zod";
import { FastifyTypeInstance } from "../../types";
import { AuthController } from "./auth.controller";
import { loginSchema } from "./schemas/login.schema";
import { authResponseSchema } from "./schemas/auth-response.schema";

export async function authRoutes(app: FastifyTypeInstance) {
  const authController = new AuthController();

  app.post('/login', {
    schema: {
      tags: ['auth'],
      description: 'Login',
      body: loginSchema,
      response: {
        200: authResponseSchema,
      }
    }
  }, async (request, reply) => {
    await authController.login(request.body);
    return reply.status(200).send();
  });
}