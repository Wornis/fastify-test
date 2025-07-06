import { FastifyInstance } from 'fastify'
import dbPlugin from '../plugins/db-plugin'
import awilixPlugin from '../plugins/awilix-plugin'
import swaggerPlugin from '../plugins/swagger-plugin'
import userRoutes from '../../interfaces/routes/user.routes'
import productRoutes from '../../interfaces/routes/product.routes'
import orderRoutes from '../../interfaces/routes/order.routes'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

export async function setupApp(server: FastifyInstance): Promise<FastifyInstance> {
    // Register plugins
    server.register(awilixPlugin)
    server.register(swaggerPlugin)
    server.register(dbPlugin)

    server.register(helmet, {
        global: true
    })

    server.register(cors, {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })

    // Register routes
    server.register(userRoutes, { prefix: '/api' })
    server.register(productRoutes, { prefix: '/api' })
    server.register(orderRoutes, { prefix: '/api' })

    return server
}
