import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

async function swaggerPlugin(fastify: FastifyInstance) {
  // Register Swagger
  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Fastify API',
        description: 'API documentation',
        version: '1.0.0'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });
  
  // Register Swagger UI
  fastify.register(swaggerUi, {
    routePrefix: '/documentation'
  });
}

export default fastifyPlugin(swaggerPlugin);