import { randomUUID } from "node:crypto";
import { CreateUserSchema } from "./schemas/create-user.schema";

const users: User[] = [];

export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserController {
  async createUser(payload: CreateUserSchema): Promise<void> {
    console.log('Creating user', payload);
    await users.push({
      id: randomUUID(),
      ...payload,
    });
  }

  async getUsers(): Promise<User[]> {
    return users;
  }
}