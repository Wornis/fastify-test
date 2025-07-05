import { FastifyRequest, FastifyReply } from 'fastify';
import { GetOrdersUseCase } from '../../application/use-cases/order/get-orders.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/order/get-order-by-id.use-case';
import { GetOrdersByUserIdUseCase } from '../../application/use-cases/order/get-orders-by-user-id.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/order/create-order.use-case';
import { DeleteOrderUseCase } from '../../application/use-cases/order/delete-order.use-case';

export class OrderController {
    constructor(
        private readonly getOrdersUseCase: GetOrdersUseCase,
        private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
        private readonly getOrdersByUserIdUseCase: GetOrdersByUserIdUseCase,
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly deleteOrderUseCase: DeleteOrderUseCase
    ) {}

    async getOrders(request: FastifyRequest, reply: FastifyReply) {
        try {
            const orders = await this.getOrdersUseCase.execute();
            return reply.code(200).send(orders);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async getOrderById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const order = await this.getOrderByIdUseCase.execute(id);
            
            if (!order) {
                return reply.code(404).send({ error: 'Order not found' });
            }
            
            return reply.code(200).send(order);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async getOrdersByUserId(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
        try {
            const { userId } = request.params;
            const orders = await this.getOrdersByUserIdUseCase.execute(userId);
            return reply.code(200).send(orders);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async createOrder(request: FastifyRequest, reply: FastifyReply) {
        try {
            const orderData = request.body as any;
            const order = await this.createOrderUseCase.execute(orderData);
            
            if (!order) {
                return reply.code(400).send({ 
                    error: 'Could not create order. Product might not exist or is out of stock.' 
                });
            }
            
            return reply.code(201).send(order);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }

    async deleteOrder(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const deleted = await this.deleteOrderUseCase.execute(id);
            
            if (!deleted) {
                return reply.code(404).send({ error: 'Order not found' });
            }
            
            return reply.code(204).send();
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
}