import { FastifyInstance } from 'fastify'
import dbPlugin from '../plugins/db-plugin'
import awilixPlugin from '../plugins/awilix-plugin'
import userRoutes from '../../interfaces/routes/user.routes'
import productRoutes from '../../interfaces/routes/product.routes'
import orderRoutes from '../../interfaces/routes/order.routes'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export async function setupApp(server: FastifyInstance): Promise<FastifyInstance> {
    // Register plugins
    server.register(dbPlugin)
    server.register(awilixPlugin)

    server.register(helmet, {
        global: true
    })

    server.register(cors, {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })

    server.register(swagger, {
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'API documentation',
                version: '1.0.0'
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    })
    server.register(swaggerUi, {
        routePrefix: '/documentation'
    })

    // Register routes
    server.register(userRoutes, { prefix: '/api' })
    server.register(productRoutes, { prefix: '/api' })
    server.register(orderRoutes, { prefix: '/api' })

    return server
}
