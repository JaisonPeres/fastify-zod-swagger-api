export interface IModule {
  register(app: any): void;
  info: {
    name: string;
    description: string;
  };
}