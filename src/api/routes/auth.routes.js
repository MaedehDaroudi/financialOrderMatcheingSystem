const express = require('express');
const jwt = require('jsonwebtoken');
const schema = require('../../schema/auth.schema')
const authController = require('../controllers/auth.controller')
const validateSchema = require('../../middleware/validate.middleware')

const router = express.Router();
router.post('/login', validateSchema(schema.login), authController.login);
router.post('/register', validateSchema(schema.register), authController.register);

module.exports = router;