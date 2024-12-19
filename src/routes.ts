import { FastifyTypeInstance } from "./types";
import { UserModule } from "./app/users/users.module";
import { AuthModule } from "./app/auth/auth.module";

export async function routes(app: FastifyTypeInstance) {

  UserModule.register(app);

  AuthModule.register(app);
  
  
  app.setNotFoundHandler(async (request, reply) => {
    reply.status(404).send({
      message: 'Not found',
    });
  });
}