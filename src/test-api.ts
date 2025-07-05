import { createServer } from './infrastructure/web/server-config';
import { setupApp } from './infrastructure/config/app';

async function testApi() {
    const server = createServer();
    await setupApp(server);
    
    try {
        // Start the server
        await server.listen({ port: 3000 });
        console.log('Server started on port 3000');
        
        // Create a user
        const userResponse = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            }),
        });
        
        const user = await userResponse.json();
        console.log('Created user:', user);
        
        // Create a product
        const productResponse = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: 99.99,
                stock: 10
            }),
        });
        
        const product = await productResponse.json();
        console.log('Created product:', product);
        
        // Create an order
        const orderResponse = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                productId: product.id
            }),
        });
        
        const order = await orderResponse.json();
        console.log('Created order:', order);
        
        // Get all users
        const usersResponse = await fetch('http://localhost:3000/api/users');
        const users = await usersResponse.json();
        console.log('All users:', users);
        
        // Get all products
        const productsResponse = await fetch('http://localhost:3000/api/products');
        const products = await productsResponse.json();
        console.log('All products:', products);
        
        // Get all orders
        const ordersResponse = await fetch('http://localhost:3000/api/orders');
        const orders = await ordersResponse.json();
        console.log('All orders:', orders);
        
        // Get orders by user ID
        const userOrdersResponse = await fetch(`http://localhost:3000/api/users/${user.id}/orders`);
        const userOrders = await userOrdersResponse.json();
        console.log(`Orders for user ${user.id}:`, userOrders);
        
        // Verify that product stock was decreased
        const updatedProductResponse = await fetch(`http://localhost:3000/api/products/${product.id}`);
        const updatedProduct = await updatedProductResponse.json();
        console.log('Updated product:', updatedProduct);
        console.log('Stock decreased:', product.stock - updatedProduct.stock === 1);
        
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Close the server
        await server.close();
        console.log('Server closed');
        process.exit(0);
    }
}

testApi();