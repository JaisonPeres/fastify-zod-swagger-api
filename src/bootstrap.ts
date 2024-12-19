
import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { routes } from './routes';
import { openapi } from './docs/openapi';
import * as dotenv from "dotenv";

dotenv.config();

const { PORT, LOG } = process.env;

const init = () => {
  const app = fastify({
    logger: LOG === 'true',
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyCors, {
    origin: '*',
  });

  app.register(fastifySwagger, {
    openapi: {
      ...openapi(),
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  });

  app.register(routes);

  return app;
}

const server = () => {
  init().listen({
    port: Number(PORT || '3000'),
  }).then(() => {
    console.log(`TS Server listening on http://localhost:${PORT}`);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  })
}
const serverless = () => {
  return init();
}

export {
  server,
  serverless,
}