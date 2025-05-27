class OrderApiTestConfig {

    #prefix = '/api/v1'
    #serverUrl = 'http://127.0.0.1:8080'
    #header = {
        'token': null,
        'Content-Type': 'application/json'
    }

    constructor(token) {
        this.#header.token = token
    }

    createOrder(data) {
        return {
            data,
            method: 'post',
            headers: this.#header,
            maxBodyLength: Infinity,
            url: `${this.#serverUrl}${this.#prefix}/order`
        }
    }

    receiveOrder(orderId) {
        return {
            method: 'get',
            headers: this.#header,
            maxBodyLength: Infinity,
            url: `${this.#serverUrl}${this.#prefix}/order?id=${orderId}`,
        }
    }

    updateOrder(data) {
        return {
            data,
            method: 'put',
            headers: this.#header,
            maxBodyLength: Infinity,
            url: `${this.#serverUrl}${this.#prefix}/order`
        }
    }

    removeOrder(data) {
        return {
            data,
            method: 'delete',
            headers: this.#header,
            maxBodyLength: Infinity,
            url: `${this.#serverUrl}${this.#prefix}/order`,
        }
    }

    matchWithMarket() {
        return {
            method: 'get',
            maxBodyLength: Infinity,
            headers: this.#header,
            url: `${this.#serverUrl}${this.#prefix}/order/match-with-market`,
        }
    }
}

module.exports = OrderApiTestConfig