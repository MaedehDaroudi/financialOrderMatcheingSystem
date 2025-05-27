class OrderApiTestInput {

    constructor() {
    }

    static createOrder(data) {
        return {
            "type": "buy",
            "price": "20000"
        }
    }

    static receiveOrder(orderId) {
        return orderId
    }

    static updateOrder(orderId) {
        return {
            "id": orderId,
            "type": "buy",
            "price": "20000"
        }
    }

    static removeOrder(orderId) {
        return {
            "id": orderId
        }
    }

    static matchWithMarket() {
        return undefined
    }
}

module.exports = OrderApiTestInput