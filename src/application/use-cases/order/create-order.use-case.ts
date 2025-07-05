import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository
    ) {}

    async execute(orderData: Omit<Order, 'id'>): Promise<Order | null> {
        // In a real application, we would:
        // 1. Check if the user exists
        // 2. Check if the product exists and has enough stock
        // 3. Create a transaction to ensure atomicity

        // Get the product to check stock
        const product = await this.productRepository.findById(orderData.productId);
        
        if (!product) {
            return null; // Product not found
        }
        
        if (product.stock <= 0) {
            return null; // Product out of stock
        }
        
        // Update product stock
        await this.productRepository.updateStock(product.id, product.stock - 1);
        
        // Create the order
        return this.orderRepository.create(orderData);
    }
}