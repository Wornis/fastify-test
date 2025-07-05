import { FastifyInstance } from 'fastify'

export async function connectToDatabase(fastify: FastifyInstance) {
    fastify.log.info('Connecting to fake database...')

    await new Promise(resolve => setTimeout(resolve, 0))

    fastify.decorate('mongo', { connected: true })
    fastify.log.info('Connected to fake database.')
}
