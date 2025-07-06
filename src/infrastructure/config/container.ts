import {asClass, AwilixContainer, createContainer, InjectionMode} from 'awilix';
import {AwilixCradle} from "../types/awilix";

// Repositories
import { InMemoryUserRepository } from '../database/repositories/in-memory-user.repository';
import { InMemoryProductRepository } from '../database/repositories/in-memory-product.repository';
import { InMemoryOrderRepository } from '../database/repositories/in-memory-order.repository';

// User Use Cases
import { GetUsersUseCase } from '../../application/use-cases/user/get-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.use-case';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';

// Product Use Cases
import { GetProductsUseCase } from '../../application/use-cases/product/get-products.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/product/get-product-by-id.use-case';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case';
import { UpdateProductStockUseCase } from '../../application/use-cases/product/update-product-stock.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case';

// Order Use Cases
import { GetOrdersUseCase } from '../../application/use-cases/order/get-orders.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/order/get-order-by-id.use-case';
import { GetOrdersByUserIdUseCase } from '../../application/use-cases/order/get-orders-by-user-id.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/order/create-order.use-case';
import { DeleteOrderUseCase } from '../../application/use-cases/order/delete-order.use-case';

// Controllers
import { UserController } from '../../interfaces/controllers/user.controller';
import { ProductController } from '../../interfaces/controllers/product.controller';
import { OrderController } from '../../interfaces/controllers/order.controller';
import { HelloWorldController } from '../../interfaces/controllers/hello-world-controller';

export function createDIContainer(): AwilixContainer<AwilixCradle> {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  });

  // Register repositories
  container.register({
    userRepository: asClass(InMemoryUserRepository).singleton(),
    productRepository: asClass(InMemoryProductRepository).singleton(),
    orderRepository: asClass(InMemoryOrderRepository).singleton()
  });

  // Register user use cases
  container.register({
    getUsersUseCase: asClass(GetUsersUseCase).singleton(),
    getUserByIdUseCase: asClass(GetUserByIdUseCase).singleton(),
    createUserUseCase: asClass(CreateUserUseCase).singleton(),
    updateUserUseCase: asClass(UpdateUserUseCase).singleton(),
    deleteUserUseCase: asClass(DeleteUserUseCase).singleton()
  });

  // Register product use cases
  container.register({
    getProductsUseCase: asClass(GetProductsUseCase).singleton(),
    getProductByIdUseCase: asClass(GetProductByIdUseCase).singleton(),
    createProductUseCase: asClass(CreateProductUseCase).singleton(),
    updateProductUseCase: asClass(UpdateProductUseCase).singleton(),
    updateProductStockUseCase: asClass(UpdateProductStockUseCase).singleton(),
    deleteProductUseCase: asClass(DeleteProductUseCase).singleton()
  });

  // Register order use cases
  container.register({
    getOrdersUseCase: asClass(GetOrdersUseCase).singleton(),
    getOrderByIdUseCase: asClass(GetOrderByIdUseCase).singleton(),
    getOrdersByUserIdUseCase: asClass(GetOrdersByUserIdUseCase).singleton(),
    createOrderUseCase: asClass(CreateOrderUseCase).singleton(),
    deleteOrderUseCase: asClass(DeleteOrderUseCase).singleton()
  });

  // Register controllers
  container.register({
    userController: asClass(UserController).singleton(),
    productController: asClass(ProductController).singleton(),
    orderController: asClass(OrderController).singleton(),
    helloWorldController: asClass(HelloWorldController).singleton()
  });

  return container;
}
