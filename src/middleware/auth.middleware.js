const errorConstants = require('../exceptionHandler/error.constants')
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticate(req) {
    const authHeader = req.headers.token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return req.user
        }
        catch (err) {
            throw errorConstants.invalidToken;
        }
    }
    else
        throw errorConstants.missingToken;
}


module.exports = {
    authenticate
};
