import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import { createDIContainer } from '../config/container';

async function awilixPlugin(fastify: FastifyInstance) {
  // Create the DI container
  const container = createDIContainer();
  
  // Register the Awilix plugin with Fastify
  fastify.register(fastifyAwilixPlugin, {
    container,
    disposeOnClose: true,
    disposeOnResponse: true,
  });
}

export default fastifyPlugin(awilixPlugin);