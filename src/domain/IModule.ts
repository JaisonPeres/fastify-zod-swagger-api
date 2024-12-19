import { FastifyTypeInstance } from "../infra/types";

export interface IModule {
  register(app: FastifyTypeInstance): void;
  info: {
    name: string;
    description: string;
  };
}