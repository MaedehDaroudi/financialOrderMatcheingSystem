const createOrder = {
    type: "object",
    properties: {
        price: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        userId: {
            type: 'number'
        }
    },
    required: ["price", "type", "userId",],
    additionalProperties: false
};

module.exports = { createOrder };
