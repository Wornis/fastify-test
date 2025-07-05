import { ProductRepository } from '../../../domain/repositories/product.repository';

export class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string): Promise<boolean> {
        return this.productRepository.delete(id);
    }
}