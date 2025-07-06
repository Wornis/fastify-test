import { FastifyInstance } from 'fastify';

async function productRoutes(fastify: FastifyInstance) {
    // Get the controller from the DI container
    const { productController } = fastify.diContainer.cradle;

    // Define routes
    fastify.get('/products', productController.getProducts.bind(productController));
    fastify.get('/products/:id', productController.getProductById.bind(productController));
    fastify.post('/products', productController.createProduct.bind(productController));
    fastify.put('/products/:id', productController.updateProduct.bind(productController));
    fastify.patch('/products/:id/stock', productController.updateProductStock.bind(productController));
    fastify.delete('/products/:id', productController.deleteProduct.bind(productController));
}

export default productRoutes;
