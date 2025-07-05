import { FastifyRequest, FastifyReply } from 'fastify';
import { GetProductsUseCase } from '../../application/use-cases/product/get-products.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/product/get-product-by-id.use-case';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case';
import { UpdateProductStockUseCase } from '../../application/use-cases/product/update-product-stock.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case';

export class ProductController {
    constructor(
        private readonly getProductsUseCase: GetProductsUseCase,
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly updateProductStockUseCase: UpdateProductStockUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase
    ) {}

    async getProducts(request: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await this.getProductsUseCase.execute();
            return reply.code(200).send(products);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async getProductById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const product = await this.getProductByIdUseCase.execute(id);
            
            if (!product) {
                return reply.code(404).send({ error: 'Product not found' });
            }
            
            return reply.code(200).send(product);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async createProduct(request: FastifyRequest, reply: FastifyReply) {
        try {
            const productData = request.body as any;
            const product = await this.createProductUseCase.execute(productData);
            return reply.code(201).send(product);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateProduct(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const productData = request.body as any;
            
            const product = await this.updateProductUseCase.execute(id, productData);
            
            if (!product) {
                return reply.code(404).send({ error: 'Product not found' });
            }
            
            return reply.code(200).send(product);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateProductStock(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const { stock } = request.body as any;
            
            if (typeof stock !== 'number') {
                return reply.code(400).send({ error: 'Stock must be a number' });
            }
            
            const product = await this.updateProductStockUseCase.execute(id, stock);
            
            if (!product) {
                return reply.code(404).send({ error: 'Product not found' });
            }
            
            return reply.code(200).send(product);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async deleteProduct(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const deleted = await this.deleteProductUseCase.execute(id);
            
            if (!deleted) {
                return reply.code(404).send({ error: 'Product not found' });
            }
            
            return reply.code(204).send();
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
}