import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryProductRepository implements ProductRepository {
    private products: Product[] = [];

    async findAll(): Promise<Product[]> {
        return [...this.products];
    }

    async findById(id: string): Promise<Product | null> {
        const product = this.products.find(product => product.id === id);
        return product ? { ...product } : null;
    }

    async create(productData: Omit<Product, 'id'>): Promise<Product> {
        const newProduct: Product = {
            id: uuidv4(),
            ...productData
        };
        this.products.push(newProduct);
        return { ...newProduct };
    }

    async update(id: string, productData: Partial<Product>): Promise<Product | null> {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }

        this.products[index] = {
            ...this.products[index],
            ...productData
        };

        return { ...this.products[index] };
    }

    async updateStock(id: string, stock: number): Promise<Product | null> {
        return this.update(id, { stock });
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== id);
        return this.products.length !== initialLength;
    }
}