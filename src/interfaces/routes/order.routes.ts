import { FastifyInstance } from 'fastify';

async function orderRoutes(fastify: FastifyInstance) {
    // Get the controller from the DI container
    const { orderController } = fastify.diContainer.cradle;

    // Define routes
    fastify.get('/orders', orderController.getOrders.bind(orderController));
    fastify.get('/orders/:id', orderController.getOrderById.bind(orderController));
    fastify.get('/users/:userId/orders', orderController.getOrdersByUserId.bind(orderController));
    fastify.post('/orders', orderController.createOrder.bind(orderController));
    fastify.delete('/orders/:id', orderController.deleteOrder.bind(orderController));
}

export default orderRoutes;
