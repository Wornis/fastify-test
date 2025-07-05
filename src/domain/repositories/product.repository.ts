import { Product } from '../entities/product.entity';

export interface ProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(product: Omit<Product, 'id'>): Promise<Product>;
    update(id: string, product: Partial<Product>): Promise<Product | null>;
    updateStock(id: string, stock: number): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
}