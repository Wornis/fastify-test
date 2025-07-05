import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';

export class GetOrdersByUserIdUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(userId: string): Promise<Order[]> {
        return this.orderRepository.findByUserId(userId);
    }
}