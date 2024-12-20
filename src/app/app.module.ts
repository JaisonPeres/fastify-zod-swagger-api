import { BootstrapFactory } from "../infra/factories/BootstrapFactory";
import { FastifyTypeInstance } from "../infra/types";

export class AppModule {
  static async register(app: FastifyTypeInstance) {
    const { userModule, authModule  } = BootstrapFactory.create();
    userModule.register(app);
    authModule.register(app);
  }
}