import { OrderRepository } from '../../../domain/repositories/order.repository';

export class DeleteOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<boolean> {
        // In a real application, we might want to:
        // 1. Check if the order exists
        // 2. Possibly restore the product stock
        // 3. Handle any related data (like payments)
        
        return this.orderRepository.delete(id);
    }
}