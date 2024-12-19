import { IModule } from "../../domain/IModule";
import { FastifyTypeInstance } from "../../types";
import { userRoutes } from "./users.routes";

export class UserModule implements IModule {
  info = {
    name: 'User Module',
    description: 'User module provides endpoints for user management',
  }

  register(app: FastifyTypeInstance) {
    app.register(userRoutes);
  }
}