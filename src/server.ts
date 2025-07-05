import { createServer } from './infrastructure/web/server-config'
import { setupApp } from './infrastructure/config/app'

const start = async () => {
    const server = createServer()

    try {
        await setupApp(server)
        await server.listen({ port: 3000 })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()
