const DB = require('../loaders/db')
const Queries = require('./queries')
const OrderModels = require('../models/order.model')
const orderModel = new OrderModels

class OrderRepository {
    constructor() {

    }

    async receive(orderId) {
        const { query, value } = Queries.receive('orders', '*', 'id', orderId)
        const result = await DB.query(query, value)
        return result
    }

    async create(userId, price, type) {
        orderModel.create = { userId, price, type }
        const createModel = orderModel.create
        const { query, value } = Queries.create('orders', createModel)
        const result = await DB.query(query, value)
        return result
    }
}

module.exports = OrderRepository