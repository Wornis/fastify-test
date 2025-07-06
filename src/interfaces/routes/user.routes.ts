import { FastifyInstance } from 'fastify';

async function userRoutes(fastify: FastifyInstance) {
    // Get the controller from the DI container
    const { userController } = fastify.diContainer.cradle;

    // Define routes
    fastify.get('/users', userController.getUsers.bind(userController));
    fastify.get('/users/:id', userController.getUserById.bind(userController));
    fastify.post('/users', userController.createUser.bind(userController));
    fastify.put('/users/:id', userController.updateUser.bind(userController));
    fastify.delete('/users/:id', userController.deleteUser.bind(userController));
}

export default userRoutes;
