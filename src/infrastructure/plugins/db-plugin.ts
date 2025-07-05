import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { connectToDatabase } from '../database/db-connector'

async function dbPlugin(fastify: FastifyInstance) {
    await connectToDatabase(fastify)
}

export default fastifyPlugin(dbPlugin)