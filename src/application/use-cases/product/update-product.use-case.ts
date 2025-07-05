import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string, productData: Partial<Product>): Promise<Product | null> {
        // In a real application, we would perform validation here
        return this.productRepository.update(id, productData);
    }
}