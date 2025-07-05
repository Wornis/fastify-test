import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryOrderRepository implements OrderRepository {
    private orders: Order[] = [];

    async findAll(): Promise<Order[]> {
        return [...this.orders];
    }

    async findById(id: string): Promise<Order | null> {
        const order = this.orders.find(order => order.id === id);
        return order ? { ...order } : null;
    }

    async findByUserId(userId: string): Promise<Order[]> {
        return this.orders
            .filter(order => order.userId === userId)
            .map(order => ({ ...order }));
    }

    async create(orderData: Omit<Order, 'id'>): Promise<Order> {
        const newOrder: Order = {
            id: uuidv4(),
            ...orderData
        };
        this.orders.push(newOrder);
        return { ...newOrder };
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.orders.length;
        this.orders = this.orders.filter(order => order.id !== id);
        return this.orders.length !== initialLength;
    }
}