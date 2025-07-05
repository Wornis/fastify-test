import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';

export class GetOrdersUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(): Promise<Order[]> {
        return this.orderRepository.findAll();
    }
}