const axios = require('axios');
const { expect, assert } = require('chai');

const OrderInput = require('./fixtures/order/input')
const OrderConfig = require('./configs/order.config')
const OrderExpected = require('./fixtures/order/expected')

const AuthInput = require('./fixtures/auth/input')
const AuthConfig = require('./configs/auth.config')
const AuthExpected = require('./fixtures/auth/expected')

let token;
let orderId;
let orderConfig

const authConfig = new AuthConfig()

describe('=== API TEST (register) === ', async () => {
    it('register', async () => { await runAuthApiTest('registerUser') })
    // to do ==> remove user
})


describe('=== API TEST (login) === ', async () => {
    before(async () => {
        await runAuthApiTest('registerUser')
    })
    it('login', async () => { await runAuthApiTest('loginUser') })
})


describe('=== API TEST (createOrder) === ', async () => {
    before(async () => {
        await runAuthApiTest('registerUser')
        await runAuthApiTest('loginUser')
        orderConfig = new OrderConfig(token)
    })
    it('CreateOrder', async () => { await runOrderApiTest('createOrder') })
    after(async () => {
        await runOrderApiTest('removeOrder')
    })
})


describe('=== API TEST (receiveOrder) === ', async () => {
    before(async () => {
        await runAuthApiTest('registerUser')
        await runAuthApiTest('loginUser')
        orderConfig = new OrderConfig(token)
        await runOrderApiTest('createOrder')
    })
    it('receiveOrder', async () => { await runOrderApiTest('receiveOrder') })

    after(async () => {
        await runOrderApiTest('removeOrder')
    })
})


describe('=== API TEST (matchWithMarket) === ', async () => {
    before(async () => {
        await runAuthApiTest('registerUser')
        await runAuthApiTest('loginUser')
        orderConfig = new OrderConfig(token)
        await runOrderApiTest('createOrder')
    })

    it('matchWithMarket', async () => { await runOrderApiTest('matchWithMarket') })

    after(async () => {
        await runOrderApiTest('removeOrder')
    })
})


describe('=== API TEST (updateOrder) === ', async () => {
    before(async () => {
        await runAuthApiTest('registerUser')
        await runAuthApiTest('loginUser')
        orderConfig = new OrderConfig(token)
        await runOrderApiTest('createOrder')
    })
    it('updateOrder', async () => { await runOrderApiTest('updateOrder') })

    after((async () => {
        await runOrderApiTest('removeOrder')
    }))
})


describe('=== API TEST (removeOrder)=== ', async () => {
    before(async () => {
        await runAuthApiTest('registerUser')
        await runAuthApiTest('loginUser')
        orderConfig = new OrderConfig(token)
        await runOrderApiTest('createOrder')
    })
    it('removeOrder', async () => { await runOrderApiTest('removeOrder') })
})


async function runOrderApiTest(apiName) {
    try {
        const inputData = JSON.stringify(OrderInput[apiName](orderId));
        const expectedData = OrderExpected[apiName](orderId);
        const axiosConfig = orderConfig[apiName](inputData);

        const response = (await axios(axiosConfig)).data;
        expect(response.status).equal(200);
        const finalResponse = Array.isArray(response?.data?.result.message) ? response?.data?.result.message?.[0] : response?.data?.result.message
        if (apiName === 'receiveOrder') {
            delete finalResponse.user_id
            delete finalResponse.created_at
            delete finalResponse.updated_at
        }
        assert.deepEqual(finalResponse, expectedData)

        if (apiName === 'createOrder') {
            orderId = response?.data?.result.orderId
        }
    }
    catch (error) {
        throw error
    }
}


async function runAuthApiTest(apiName) {
    try {
        const inputData = JSON.stringify(AuthInput[apiName]());
        let expectedData = AuthExpected[apiName]();
        const axiosConfig = authConfig[apiName](inputData);

        const response = (await axios(axiosConfig)).data;
        expect(response.status).equal(200);
        const finalResponse = Array.isArray(response?.data?.result.message) ? response?.data?.result.message?.[0] : response?.data?.result.message
        if (apiName === 'loginUser') {
            token = `Bearer ${finalResponse.token}`
            expectedData.token = finalResponse.token
        }
        assert.deepEqual(finalResponse, expectedData)
    }
    catch (error) {
        throw error
    }
}