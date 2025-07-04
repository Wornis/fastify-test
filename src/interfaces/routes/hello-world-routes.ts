import { FastifyInstance } from "fastify"
import helloWorldController from "../controllers/hello-world-controller"

async function helloWorldRoutes(fastify: FastifyInstance, options: any) {
    fastify.get('/', async (request, reply) => {
        // @ts-ignore
        console.log(reply.foo)
        return helloWorldController.getHelloWorld()
    })
}

export default helloWorldRoutes