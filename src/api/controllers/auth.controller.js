const Response = require('../../helper/response')
const message = require('../../constants/messages')
const authService = require('../../services/auth.service');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        res.send(Response.generate(200, { token }))
    } catch (error) {
        if (error.status && error.message)
            res.status(error.status).send(Response.generate(error.status, error.message))
        else
            res.status(400).send(Response.generate(null, error))
    }
};

exports.register = async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
        res.send(Response.generate(200, message.userRegister))
    } catch (error) {
        if (error.status && error.message)
            res.status(error.status).send(Response.generate(error.status, error.message))
        else
            res.status(400).send(Response.generate(null, error))
    }
};
