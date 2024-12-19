import { FastifyTypeInstance } from "../../types";
import { authRoutes } from "./auth.routes";

export class AuthModule {
  static register(app: FastifyTypeInstance) {
    app.register(authRoutes);
  }
}