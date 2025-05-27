const schema = {
    createOrder: {
        type: "object",
        properties: {
            price: {
                type: 'string'
            },
            type: {
                type: 'string'
            }
        },
        required: ["price", "type"],
        additionalProperties: false
    },
    matchWithMarket: {
        type: "object",
        properties: {
        },
        additionalProperties: false
    },
    receiveOrders: {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            status: {
                type: 'string'
            },
            type: {
                type: 'string'
            }
        },
        required: [],
        additionalProperties: false
    },
    updateOrder: {
        type: "object",
        properties: {
            id: {
                type: 'number'
            },
            price: {
                type: 'string'
            },
            type: {
                type: 'string'
            }
        },
        required: ["id"],
        additionalProperties: false,
        anyOf: [
            { required: ["price"] },
            { required: ["type"] }
        ]
    },
    removeOrder: {
        type: "object",
        properties: {
            id: {
                type: 'number'
            }
        },
        required: ["id"],
        additionalProperties: false
    }
}

module.exports = schema;
