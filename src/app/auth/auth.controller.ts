import { randomUUID } from "node:crypto";
import { LoginSchema } from "./schemas/login.schema";
import { AuthResponse } from "./schemas/auth-response.schema";

export class AuthController {
  async login(payload: LoginSchema): Promise<AuthResponse> {
    return {
      token: randomUUID(),
    }
  }
}