export class HelloWorldController {
    async getHelloWorld() {
        return { hello: 'world' }
    }
}

export default new HelloWorldController()