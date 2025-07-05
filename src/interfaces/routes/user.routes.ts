import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { GetUsersUseCase } from '../../application/use-cases/user/get-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';
import { InMemoryUserRepository } from '../../infrastructure/database/repositories/in-memory-user.repository';

async function userRoutes(fastify: FastifyInstance) {
    // Create repository instance
    const userRepository = new InMemoryUserRepository();
    
    // Create use case instances
    const getUsersUseCase = new GetUsersUseCase(userRepository);
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);
    
    // Create controller instance
    const userController = new UserController(
        getUsersUseCase,
        getUserByIdUseCase,
        createUserUseCase,
        updateUserUseCase,
        deleteUserUseCase
    );
    
    // Define routes
    fastify.get('/users', userController.getUsers.bind(userController));
    fastify.get('/users/:id', userController.getUserById.bind(userController));
    fastify.post('/users', userController.createUser.bind(userController));
    fastify.put('/users/:id', userController.updateUser.bind(userController));
    fastify.delete('/users/:id', userController.deleteUser.bind(userController));
}

export default userRoutes;