const uuidv4 = require('uuid');

class Response {
    constructor() { }

    static generate(status, result) {
        let finalResult = {
            status: status || 400,
            data: {
                id: uuidv4.v4(),
                result: {}
            }
        }

        if (result['message']) {
            finalResult.data.result.message =  result.message 

            delete result['message']

            finalResult.data.result = {
                ...result,
                ...finalResult.data.result
            }
        }
        else
            finalResult.data.result.message = result

        return finalResult

    }
}

module.exports = Response