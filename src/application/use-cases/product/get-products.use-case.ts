import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class GetProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}