const express = require('express');
const Response = require('../../helper/response')
const schema = require('../../schema/order.schema')
const OrderController = require('../controllers/order.controller')
const authMiddleware = require('../../middleware/auth.middleware')
const validateSchema = require('../../middleware/validate.middleware')

const orderController = new OrderController()
const router = express.Router();

router.get('/', validateSchema(schema.receiveOrders), orderController.receiveOrder)
router.post('/', validateSchema(schema.createOrder), orderController.createOrder)
router.get('/match-with-market', validateSchema(schema.matchWithMarket), orderController.matchWithMarket)

module.exports = router;