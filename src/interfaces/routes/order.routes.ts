import { FastifyInstance } from 'fastify';
import { OrderController } from '../controllers/order.controller';
import { GetOrdersUseCase } from '../../application/use-cases/order/get-orders.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/order/get-order-by-id.use-case';
import { GetOrdersByUserIdUseCase } from '../../application/use-cases/order/get-orders-by-user-id.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/order/create-order.use-case';
import { DeleteOrderUseCase } from '../../application/use-cases/order/delete-order.use-case';
import { InMemoryOrderRepository } from '../../infrastructure/database/repositories/in-memory-order.repository';
import { InMemoryProductRepository } from '../../infrastructure/database/repositories/in-memory-product.repository';

async function orderRoutes(fastify: FastifyInstance) {
    // Create repository instances
    const orderRepository = new InMemoryOrderRepository();
    const productRepository = new InMemoryProductRepository();
    
    // Create use case instances
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
    const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
    const getOrdersByUserIdUseCase = new GetOrdersByUserIdUseCase(orderRepository);
    const createOrderUseCase = new CreateOrderUseCase(orderRepository, productRepository);
    const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
    
    // Create controller instance
    const orderController = new OrderController(
        getOrdersUseCase,
        getOrderByIdUseCase,
        getOrdersByUserIdUseCase,
        createOrderUseCase,
        deleteOrderUseCase
    );
    
    // Define routes
    fastify.get('/orders', orderController.getOrders.bind(orderController));
    fastify.get('/orders/:id', orderController.getOrderById.bind(orderController));
    fastify.get('/users/:userId/orders', orderController.getOrdersByUserId.bind(orderController));
    fastify.post('/orders', orderController.createOrder.bind(orderController));
    fastify.delete('/orders/:id', orderController.deleteOrder.bind(orderController));
}

export default orderRoutes;