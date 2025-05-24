const express = require('express');
const schema = require('../../schema/order.schema')
const validateSchema = require('../../middleware/order.middleware')

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('receive data')
})

router.post('/', validateSchema(schema.createOrder), async (req, res) => {
    res.send('add data')
})

module.exports = router;