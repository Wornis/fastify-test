import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

export class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}