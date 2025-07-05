import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class UpdateProductStockUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string, stock: number): Promise<Product | null> {
        // In a real application, we would validate that stock is not negative
        return this.productRepository.updateStock(id, stock);
    }
}