import { randomUUID } from "node:crypto";
import { LoginSchema } from "./schemas/login.schema";
import { FastifyReply, FastifyRequest } from "fastify";

export class AuthController {
  async login(payload: LoginSchema): Promise<void> {
    // Do something with the payload
  }
}