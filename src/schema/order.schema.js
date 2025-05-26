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
    type: "object",
    properties: {
    },
    additionalProperties: false
}

receiveOrders = {
    type: 'object',
    properties: {
        id: {
            type:'string'
        },
        status:{
            type:'string'
        },
        type:{
            type:'string'
        }
    },
    required: [],
    additionalProperties: false
}

module.exports = { createOrder, matchWithMarket, receiveOrders };
