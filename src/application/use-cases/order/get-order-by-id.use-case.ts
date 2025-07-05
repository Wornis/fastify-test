import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';

export class GetOrderByIdUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<Order | null> {
        return this.orderRepository.findById(id);
    }
}