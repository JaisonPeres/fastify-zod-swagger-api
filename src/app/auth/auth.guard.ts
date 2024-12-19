import { FastifyRequest, FastifyReply } from "fastify";

export class AuthGuard {
  static async token(request: FastifyRequest, reply: FastifyReply, done: () => void) {
    const token = request.headers['authorization'];
    if (!token) {
      console.log('No token provided');
      return reply.status(401).send({
        message: 'Unauthorized',
      });
    }

    if (token !== 'Bearer token') {
      console.log('Invalid token');
      return reply.status(403).send({
        message: 'Forbidden',
      });
    }
    done();
  }
}