import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

async function myPlugin(fastify: FastifyInstance) {
    fastify.decorateReply('foo')
    fastify.addHook('onRequest', async (req, reply) => {
        // @ts-ignore
        reply.foo = { bar: 42 }
    })
}

export default fastifyPlugin(myPlugin)