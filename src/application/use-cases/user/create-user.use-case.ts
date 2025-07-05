import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userData: Omit<User, 'id'>): Promise<User> {
        // In a real application, we would hash the password here
        // and perform validation
        return this.userRepository.create(userData);
    }
}