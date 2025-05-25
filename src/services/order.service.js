const redis = require('../loaders/redis')
const message = require('../constants/messages')
const UsersService = require('../services/user.service')
const OrderRepository = require('../repositories/order.repository')
const errorConstants = require('../exceptionHandler/error.constants')
const usersService = new UsersService()
const orderRepository = new OrderRepository()
class OrderService {
    constructor() {

    }

    async createOrder(userId, price, type) {
        const userData = await usersService.receiveUser(userId)
        if (!userData.length)
            throw errorConstants.userNotFound

        const result = await orderRepository.create(userId, price, type)
        await redis.cacheDel('orders_data')
        return message.orderCreated
    }
}

module.exports = OrderService