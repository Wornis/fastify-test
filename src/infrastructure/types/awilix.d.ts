import { HelloWorldController } from '../../interfaces/controllers/hello-world-controller';
import { UserController } from '../../interfaces/controllers/user.controller';
import { ProductController } from '../../interfaces/controllers/product.controller';
import { OrderController } from '../../interfaces/controllers/order.controller';
import { InMemoryUserRepository } from '../database/repositories/in-memory-user.repository';
import { InMemoryProductRepository } from '../database/repositories/in-memory-product.repository';
import { InMemoryOrderRepository } from '../database/repositories/in-memory-order.repository';
import { GetUsersUseCase } from '../../application/use-cases/user/get-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';
import { GetProductsUseCase } from '../../application/use-cases/product/get-products.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/product/get-product-by-id.use-case';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case';
import { UpdateProductStockUseCase } from '../../application/use-cases/product/update-product-stock.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case';
import { GetOrdersUseCase } from '../../application/use-cases/order/get-orders.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/order/get-order-by-id.use-case';
import { GetOrdersByUserIdUseCase } from '../../application/use-cases/order/get-orders-by-user-id.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/order/create-order.use-case';
import { DeleteOrderUseCase } from '../../application/use-cases/order/delete-order.use-case';

export interface AwilixCradle {
    // Controllers
    helloWorldController: HelloWorldController;
    userController: UserController;
    productController: ProductController;
    orderController: OrderController;

    // Repositories
    userRepository: InMemoryUserRepository;
    productRepository: InMemoryProductRepository;
    orderRepository: InMemoryOrderRepository;

    // User Use Cases
    getUsersUseCase: GetUsersUseCase;
    getUserByIdUseCase: GetUserByIdUseCase;
    createUserUseCase: CreateUserUseCase;
    updateUserUseCase: UpdateUserUseCase;
    deleteUserUseCase: DeleteUserUseCase;

    // Product Use Cases
    getProductsUseCase: GetProductsUseCase;
    getProductByIdUseCase: GetProductByIdUseCase;
    createProductUseCase: CreateProductUseCase;
    updateProductUseCase: UpdateProductUseCase;
    updateProductStockUseCase: UpdateProductStockUseCase;
    deleteProductUseCase: DeleteProductUseCase;

    // Order Use Cases
    getOrdersUseCase: GetOrdersUseCase;
    getOrderByIdUseCase: GetOrderByIdUseCase;
    getOrdersByUserIdUseCase: GetOrdersByUserIdUseCase;
    createOrderUseCase: CreateOrderUseCase;
    deleteOrderUseCase: DeleteOrderUseCase;
}

// Strongly Type DI container
declare module '@fastify/awilix' {
    interface Cradle extends AwilixCradle {}
}