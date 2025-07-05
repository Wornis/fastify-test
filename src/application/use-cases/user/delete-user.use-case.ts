import { UserRepository } from '../../../domain/repositories/user.repository';

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }
}