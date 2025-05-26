class OrderModel {
    #create
    #closeOrderModel
    #receiveOpenOrder

    constructor() {
        this.#create = {
            table: 'orders',
            inputData: {}
        }

        this.#receiveOpenOrder = {
            table: 'orders',
            fields: '*'
        }

        this.#closeOrderModel = {
            table: 'orders',
            conditionField: 'id',

        }
    }

    set create(data) {
        this.#create = {
            ...this.#create,
            inputData: {
                status: 'open',
                type: data.type,
                price: data.price,
                user_id: data.userId
            }
        }
    }

    get create() {
        return this.#create
    }

    set receiveOpenOrder(data) {
        this.#receiveOpenOrder = {
            ...this.#receiveOpenOrder,
            conditionField: 'status',
            conditionValue: 'open',
        }
    }

    get receiveOpenOrder() {
        return this.#receiveOpenOrder
    }

    set closeOrder(data) {
        this.#closeOrderModel = {
            ...this.#closeOrderModel,
            data: {
                status: 'closed',
                price: data.price
            },
            conditionValue: data.id
        }
    }

    get closeOrder() {
        return this.#closeOrderModel
    }
}

module.exports = OrderModel