import { FastifyInstance } from "fastify"

async function helloWorldRoutes(fastify: FastifyInstance, options: any) {
    // Get the controller from the DI container
    const { helloWorldController } = fastify.diContainer.cradle;

    fastify.get('/', async (request, reply) => {
        return helloWorldController.getHelloWorld()
    })
}

export default helloWorldRoutes
