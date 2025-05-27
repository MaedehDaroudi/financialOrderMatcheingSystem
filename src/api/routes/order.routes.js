const express = require('express');
const schema = require('../../schema/order.schema')
const OrderController = require('../controllers/order.controller')
const validateSchema = require('../../middleware/validate.middleware')

const orderController = new OrderController()
const router = express.Router();

router.get('/', validateSchema(schema.receiveOrders), orderController.receiveOrder)
router.post('/', validateSchema(schema.createOrder), orderController.createOrder)
router.put('/', validateSchema(schema.updateOrder), orderController.updateOrder)
router.delete('/', validateSchema(schema.removeOrder), orderController.removeOrder)
router.get('/match-with-market', validateSchema(schema.matchWithMarket), orderController.matchWithMarket)

module.exports = router;