const Response = require('../../helper/response')
const OrderService = require('../../services/order.service')
const authMiddleware = require('../../middleware/auth.middleware')
const orderService = new OrderService()

class OrderController {

    constructor() {
    }

    async receiveOrder(req, res) {
        try {
            req.user = await authMiddleware.authenticate(req)
            const { id, type, status } = req.query
            const result = await orderService.receiveOrder(req.user.id, id, type, status)
            res.send(Response.generate(200, result))
        }
        catch (error) {
            if (error.status && error.message)
                res.send(Response.generate(error.status, error.message))
            else
                res.send(error)
        }
    }

    async createOrder(req, res) {
        try {
            req.user = await authMiddleware.authenticate(req)
            const { price, type } = req.body
            const result = await orderService.createOrder(req.user.username, req.user.id, price, type)
            res.send(Response.generate(200, result))
        }
        catch (error) {
            if (error.status && error.message)
                res.status(error.status).send(Response.generate(error.status, error.message))
            else
                res.status(400).send(Response.generate(null, error))

        }
    }

    async matchWithMarket(req, res) {
        try {
            await authMiddleware.authenticate(req)
            const result = await orderService.matchWithMarket()
            res.send(Response.generate(200, result))
        }
        catch (error) {
            if (error.status && error.result)
                res.status(error.status).send(Response.generate(error.status, error.result))
            else
                res.status(400).send(Response.generate(null, error))
        }
    }


    async updateOrder(req, res) {
        try {
            req.user = await authMiddleware.authenticate(req)
            const { price, type, id } = req.body
            const result = await orderService.updateOrder(req.user.id, id, price, type)
            res.send(Response.generate(200, result))
        }
        catch (error) {
            if (error.status && error.message)
                res.status(error.status).send(Response.generate(error.status, error.message))
            else
                res.status(400).send(Response.generate(null, error))
        }
    }

    async removeOrder(req, res) {
        try {
            req.user = await authMiddleware.authenticate(req)
            const { id } = req.body
            const result = await orderService.removeOrder(req.user.id, id, id)
            res.send(Response.generate(200, result))
        }
        catch (error) {
            if (error.status && error.message)
                res.status(error.status).send(Response.generate(error.status, error.message))
            else
                res.status(400).send(Response.generate(null, error))

        }
    }
}

module.exports = OrderController