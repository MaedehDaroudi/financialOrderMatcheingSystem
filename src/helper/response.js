const uuidv4 = require('uuid');

class Response {
    constructor() { }

    static generate(status, message) {
        return {
            status: status || 400,
            data: {
                id: uuidv4.v4(),
                result: { message }
            }
        }

    }
}

module.exports = Response