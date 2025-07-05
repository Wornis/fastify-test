import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(productData: Omit<Product, 'id'>): Promise<Product> {
        // In a real application, we would perform validation here
        return this.productRepository.create(productData);
    }
}