import { FastifyInstance } from 'fastify'
import dbPlugin from '../plugins/db-plugin'
import awilixPlugin from '../plugins/awilix-plugin'
import userRoutes from '../../interfaces/routes/user.routes'
import productRoutes from '../../interfaces/routes/product.routes'
import orderRoutes from '../../interfaces/routes/order.routes'

export async function setupApp(server: FastifyInstance): Promise<FastifyInstance> {
    // Register plugins
    server.register(dbPlugin)
    server.register(awilixPlugin)

    // Register routes
    server.register(userRoutes, { prefix: '/api' })
    server.register(productRoutes, { prefix: '/api' })
    server.register(orderRoutes, { prefix: '/api' })

    return server
}
