
import { fastifyCors } from '@fastify/cors';
import * as dotenv from "dotenv";
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { SwaggerConfig } from '../docs/swagger';
import { AppModule } from '../app/app.module';

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

  SwaggerConfig.register(app);

  AppModule.register(app);

  app.setNotFoundHandler(async (request, reply) => {
    reply.status(404).send({
      message: 'Not found',
    });
  });

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
  serverless
};
