import { FastifyInstance } from 'fastify'
import dbConnector from '../infrastructure/database/db-connector'
import myPlugin from '../infrastructure/plugins/my-plugin'
import helloWorldRoutes from '../interfaces/routes/hello-world-routes'

export async function setupApp(server: FastifyInstance): Promise<FastifyInstance> {
    // Register plugins
    server.register(dbConnector)
    server.register(myPlugin)
    
    // Register routes
    server.register(helloWorldRoutes)
    
    return server
}