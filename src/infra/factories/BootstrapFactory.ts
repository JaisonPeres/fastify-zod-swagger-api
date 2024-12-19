import { AuthController } from "../../app/auth/auth.controller";
import { AuthModule } from "../../app/auth/auth.module";
import { UserController } from "../../app/users/users.controller";
import { UserModule } from "../../app/users/users.module";

export class BootstrapFactory {
  static create() {
    const userModule = new UserModule();
    const authModule = new AuthModule();

    const userController = new UserController();
    const authController = new AuthController();

    return {
      userModule,
      authModule,
      userController,
      authController,
    }
  }
}