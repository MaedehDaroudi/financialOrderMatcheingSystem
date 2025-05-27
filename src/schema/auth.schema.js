const login = {
    type: "object",
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    },
    required: ['username', 'password'],
    additionalProperties: false
};

const register = {
    type: "object",
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        role: {
            type: 'string'
        }
    },
    required: ['username', 'password'],
    additionalProperties: false
};

module.exports = { login, register };
