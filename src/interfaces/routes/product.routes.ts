import { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/product.controller';
import { GetProductsUseCase } from '../../application/use-cases/product/get-products.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/product/get-product-by-id.use-case';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case';
import { UpdateProductStockUseCase } from '../../application/use-cases/product/update-product-stock.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case';
import { InMemoryProductRepository } from '../../infrastructure/database/repositories/in-memory-product.repository';

async function productRoutes(fastify: FastifyInstance) {
    // Create repository instance
    const productRepository = new InMemoryProductRepository();
    
    // Create use case instances
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const updateProductStockUseCase = new UpdateProductStockUseCase(productRepository);
    const deleteProductUseCase = new DeleteProductUseCase(productRepository);
    
    // Create controller instance
    const productController = new ProductController(
        getProductsUseCase,
        getProductByIdUseCase,
        createProductUseCase,
        updateProductUseCase,
        updateProductStockUseCase,
        deleteProductUseCase
    );
    
    // Define routes
    fastify.get('/products', productController.getProducts.bind(productController));
    fastify.get('/products/:id', productController.getProductById.bind(productController));
    fastify.post('/products', productController.createProduct.bind(productController));
    fastify.put('/products/:id', productController.updateProduct.bind(productController));
    fastify.patch('/products/:id/stock', productController.updateProductStock.bind(productController));
    fastify.delete('/products/:id', productController.deleteProduct.bind(productController));
}

export default productRoutes;