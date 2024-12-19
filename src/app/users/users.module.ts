import { FastifyTypeInstance } from "../../types";
import { userRoutes } from "./users.routes";

export class UserModule {
  static register(app: FastifyTypeInstance) {
    app.register(userRoutes);
  }
}