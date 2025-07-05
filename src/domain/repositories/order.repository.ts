import { Order } from '../entities/order.entity';

export interface OrderRepository {
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
    create(order: Omit<Order, 'id'>): Promise<Order>;
    delete(id: string): Promise<boolean>;
}