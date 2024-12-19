import { randomUUID } from "node:crypto";
import { CreateUserSchema } from "./schemas/create-user.schema";

const users: User[] = [];

export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserController {
  async createUser(payload: CreateUserSchema): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: payload.name,
      email: payload.email,
    };

    users.push(user);

    return user;
  }

  async getUsers(): Promise<User[]> {
    return users;
  }
}