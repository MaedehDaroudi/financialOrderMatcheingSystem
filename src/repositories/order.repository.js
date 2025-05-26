const DB = require('../loaders/db')
const Queries = require('./queries')
const OrderModels = require('../models/order.model')
const orderModel = new OrderModels

class OrderRepository {
    constructor() {
    }

    async receiveOrder(id, type, status) {
        orderModel.receiveOrder = { id, type, status }
        const { table, fields, conditions } = orderModel.receiveOrder
        const { query, value } = Queries.receive(table, fields, conditions)
        const result = await DB.query(query, value)
        return result.rows
    }

    async createOrder(userId, price, type) {
        orderModel.create = { userId, price, type }
        const createModel = orderModel.create
        const { query, value } = Queries.create(createModel.table, createModel.inputData)
        const result = await DB.query(query, value)
        return result
    }

    async receiveOpenOrder() {
        orderModel.receiveOpenOrder = null
        const { table, fields, condition } = orderModel.receiveOpenOrder
        const { query, value } = Queries.receive(table, fields, condition)
        const result = await DB.query(query, value)
        return result.rows
    }

    async closeOrder(id, price) {
        orderModel.closeOrder = { id, price }
        const { table, data, conditionField, conditionValue } = orderModel.closeOrder
        const { query, value } = Queries.update(table, data, conditionField, conditionValue)
        await DB.query(query, value)
    }
}

module.exports = OrderRepository