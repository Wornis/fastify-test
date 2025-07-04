import Fastify, { FastifyInstance } from 'fastify'

export function createServer(): FastifyInstance {
    return Fastify({
        logger: {
            level: 'info',
            transport: {
                target: 'pino-pretty'
            }
        }
    })
}