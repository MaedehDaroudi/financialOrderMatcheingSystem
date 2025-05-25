const uuidv4 = require('uuid');

class Response {
    constructor() { }

    static generate(status, result) {
        return {
            status,
            data: {
                id: uuidv4.v4(),
                result
            }
        }

    }
}

module.exports = Response