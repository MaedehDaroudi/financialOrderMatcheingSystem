createOrder = {
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
    required: ["price", "type", "userId"],
    additionalProperties: false
};

matchWithMarket = {
    properties: {
    },
    additionalProperties: false
}

module.exports = { createOrder, matchWithMarket };
