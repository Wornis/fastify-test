import { createServer } from './infrastructure/web/server-config'
import { setupApp } from './application/app'

const start = async () => {
    const server = createServer()

    try {
        await setupApp(server)
        await server.listen({ port: 3000 })

        const address = server.server.address()
        server.log.info(`Server is now listening on ${address}`)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()
