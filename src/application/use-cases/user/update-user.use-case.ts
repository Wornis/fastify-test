import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string, userData: Partial<User>): Promise<User | null> {
        // In a real application, we would hash the password here if it's being updated
        // and perform validation
        return this.userRepository.update(id, userData);
    }
}