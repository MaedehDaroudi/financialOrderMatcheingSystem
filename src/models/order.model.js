class OrderModel {
    #create
    #updateModel;
    #removeModel;
    #receiveModel;
    #closeOrderModel
    #receiveOpenOrder

    constructor() {

        this.#receiveModel = {
            table: 'orders',
            fields: '*',
            conditions: {
                deleted: "0"
            }
        }

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

        this.#updateModel = {
            table: 'orders',
            data: {},
            conditionField: 'id',
            conditionValue: null
        }

        this.#removeModel = {
            table: 'orders',
            data: { "deleted": 1 },
            conditionField: 'id',
            conditionValue: null
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
            condition: { 'status': 'open' }
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

    set receiveOrder(data) {
        if (data?.id) this.#receiveModel.conditions.id = +data.id
        if (data?.type) this.#receiveModel.conditions.type = data.type
        if (data?.status) this.#receiveModel.conditions.status = data.status
    }

    get receiveOrder() {
        return this.#receiveModel
    }

    set updateOrder(data) {
        this.#updateModel.conditionValue = +data.orderId;
        if (data.type) this.#updateModel.data.type = data.type
        if (data.price) this.#updateModel.data.price = data.price
    }

    get updateOrder() {
        return this.#updateModel
    }

    set removeOrder(data) {
        this.#removeModel.conditionValue = data.orderId
    }

    get removeOrder() {
        return this.#removeModel
    }
}

module.exports = OrderModel