import { FastifyInstance } from 'fastify';
import { CreateUserSchema, GetUserByIdSchema, UpdateUserSchema, DeleteUserSchema } from '../schemas/user.schema';

async function userRoutes(fastify: FastifyInstance) {
    // Get the controller from the DI container
    const { userController } = fastify.diContainer.cradle;

    // Define routes
    fastify.get('/users', userController.getUsers.bind(userController));
    fastify.get('/users/:id', { schema: GetUserByIdSchema }, userController.getUserById.bind(userController));
    fastify.post('/users', { schema: CreateUserSchema }, userController.createUser.bind(userController));
    fastify.put('/users/:id', { schema: UpdateUserSchema }, userController.updateUser.bind(userController));
    fastify.delete('/users/:id', { schema: DeleteUserSchema }, userController.deleteUser.bind(userController));
}

export default userRoutes;
