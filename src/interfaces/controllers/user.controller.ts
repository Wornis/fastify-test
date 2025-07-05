import { FastifyRequest, FastifyReply } from 'fastify';
import { GetUsersUseCase } from '../../application/use-cases/user/get-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';

export class UserController {
    constructor(
        private readonly getUsersUseCase: GetUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) {}

    async getUsers(request: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.getUsersUseCase.execute();
            return reply.code(200).send(users);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const user = await this.getUserByIdUseCase.execute(id);
            
            if (!user) {
                return reply.code(404).send({ error: 'User not found' });
            }
            
            return reply.code(200).send(user);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = request.body as any;
            const user = await this.createUserUseCase.execute(userData);
            return reply.code(201).send(user);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const userData = request.body as any;
            
            const user = await this.updateUserUseCase.execute(id, userData);
            
            if (!user) {
                return reply.code(404).send({ error: 'User not found' });
            }
            
            return reply.code(200).send(user);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const deleted = await this.deleteUserUseCase.execute(id);
            
            if (!deleted) {
                return reply.code(404).send({ error: 'User not found' });
            }
            
            return reply.code(204).send();
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
}