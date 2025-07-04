import fastifyPlugin from 'fastify-plugin'
import { FastifyInstance } from 'fastify'

async function dbConnector(fastify: FastifyInstance) {
    fastify.log.info('Connecting to fake database...')

    await new Promise(resolve => setTimeout(resolve, 1500))

    fastify.decorate('mongo', { connected: true })
    fastify.log.info('Connected to fake database.')
}

export default fastifyPlugin(dbConnector)