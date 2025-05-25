const Response = require('../../helper/response')
const OrderService = require('../../services/order.service')
const authMiddleware = require('../../middleware/auth.middleware')
const orderService = new OrderService()

class OrderController {

    constructor() {
    }

    async createOrder(req, res) {
        try {
            await authMiddleware.authenticate(req)
            const { price, type, userId } = req.body
            const result = await orderService.createOrder(userId, price, type)
            res.send(Response.generate(200, result))
        }
        catch (error) {
            if (error.status && error.result)
                res.send(Response.generate(error.status, error.result))
            else
                res.send(error)
        }
    }

}

module.exports = OrderController