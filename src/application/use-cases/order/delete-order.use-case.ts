import { OrderRepository } from '../../../domain/repositories/order.repository';

export class DeleteOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<boolean> {
        return this.orderRepository.delete(id);
    }
}