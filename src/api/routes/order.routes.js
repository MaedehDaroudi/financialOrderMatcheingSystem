const express = require('express');
const Response = require('../../helper/response')
const schema = require('../../schema/order.schema')
const authMiddleware = require('../../middleware/auth.middleware')
const validateSchema = require('../../middleware/validate.middleware')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await authMiddleware.authenticate(req)
        const result = { messages: 'receive data' }
        res.send(Response.generate(200, result))
    }
    catch (error) {
        if (error.status && error.result)
            res.send( Response.generate(error.status, error.result))
        else
            res.send( error)
    }
})

router.post('/', validateSchema(schema.createOrder), async (req, res) => {
    res.send('add data')
})

module.exports = router;