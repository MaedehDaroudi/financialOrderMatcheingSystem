class OrderModel {
    #create
    constructor() {
        this.#create = {
            table: 'orders',
            fields: {}

        }
    }

    set create(data) {
        this.#create = {
            status:'open',
            type: data.type,
            price: data.price,
            user_id: data.userId
        }
    }

    get create() {
        return this.#create
    }
}

module.exports = OrderModel