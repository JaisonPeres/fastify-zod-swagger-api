import { IModule } from "../../domain/IModule";
import { FastifyTypeInstance } from "../../infra/types";
import { authRoutes } from "./auth.routes";

export class AuthModule implements IModule {
  info = {
    name: 'Auth Module',
    description: 'Auth module provides endpoints for authentication',
  };

  register(app: FastifyTypeInstance) {
    app.register(authRoutes);
  }

}