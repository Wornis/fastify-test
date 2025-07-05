import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async findAll(): Promise<User[]> {
        return [...this.users];
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);
        return user ? { ...user } : null;
    }

    async create(userData: Omit<User, 'id'>): Promise<User> {
        const newUser: User = {
            id: uuidv4(),
            ...userData
        };
        this.users.push(newUser);
        return { ...newUser };
    }

    async update(id: string, userData: Partial<User>): Promise<User | null> {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return null;
        }

        this.users[index] = {
            ...this.users[index],
            ...userData
        };

        return { ...this.users[index] };
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length !== initialLength;
    }
}