const axios = require('axios');
const redis = require('../loaders/redis')
const message = require('../constants/messages')
const AuthRepository = require('../repositories/auth.repository')
const OrderRepository = require('../repositories/order.repository')
const errorConstants = require('../exceptionHandler/error.constants')
const authRepository = new AuthRepository()
const orderRepository = new OrderRepository()
class OrderService {
    constructor() {

    }

    async receiveOrder(id, type, status) {
        const localKey = 'orderData' + Object.entries({ id, type, status })
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `_${key}_${value}`)
            .join('');

        let orderData = await redis.cacheGet(localKey)
        if (!orderData) {
            orderData = await orderRepository.receiveOrder(id, type, status)
            await redis.CacheSet(localKey, orderData, process.env.REDIS_TTL)
        }
        return orderData
    }

    async createOrder(username, userId, price, type) {
        const userData = await authRepository.findByUsername(username)
        if (!userData.length)
            throw errorConstants.userNotFound

        const result = await orderRepository.createOrder(userId, price, type)
        await redis.cacheDel('ordersData')
        return {
            orderId:result.id,
            message:message.orderCreated
        }
    }

    async matchWithMarket() {
        let marketPrice = await redis.cacheGet('marketPrice')
        if (!marketPrice) {
            marketPrice = (await this.fetchMarketData()).price
            marketPrice = this.convertPriceToTmn(marketPrice)
            redis.CacheSet('marketPrice', marketPrice, process.env.REDIS_TTL)
        }
        const openOrders = await orderRepository.receiveOpenOrder();
        const matchedOrders = this.getMatchedOrders(openOrders, marketPrice)

        if (!matchedOrders.length) return message.orderUpdated

        const closePromises = matchedOrders.map(order =>
            orderRepository.closeOrder(order.id, marketPrice)
        );

        const results = await Promise.allSettled(closePromises)
        const allSuccessful = results.every(result => result.status === 'fulfilled');
        if (allSuccessful) {
            redis.cacheDel('orderData')
            return message.orderUpdated
        }
        else {
            // rollback (TO DO)
            throw errorConstants.orderUpdateFailed
        }
    }

    async updateOrder(userId, orderId, price, type) {
        const orderData = await orderRepository.receiveOrder(orderId)
        if (!orderData?.length || userId !== orderData?.[0]?.user_id)
            throw errorConstants.userOrderNotFound

        if (orderData?.[0]?.status !== 'open')
            throw errorConstants.OrderEditNotAllowed
        await orderRepository.updateOrder(orderId, price, type)
        await redis.cacheDel('ordersData')
        return message.userOrderUpdated
    }

    async removeOrder(userId, orderId) {
        const orderData = await orderRepository.receiveOrder(orderId)
        if (!orderData?.length || userId !== orderData?.[0]?.user_id)
            throw errorConstants.userOrderNotFound
        if (orderData?.[0]?.status !== 'open')
            throw errorConstants.OrderRemovedNotAllowed
        await orderRepository.removeOrder(orderId)
        await redis.cacheDel('ordersData')
        return message.userOrderDeleted
    }

    async fetchMarketData() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://www.goldapi.io/api/XAU/USD',
            headers: { 'x-access-token': 'goldapi-1jpism92pvoea-io' }
        };

        const marketData = await axios.request(config)
        return marketData.data
    }

    convertPriceToTmn(goldPrice) {
        const xauUsd = goldPrice;
        const usdTmn = 82000;
        const gram18kTmn = (xauUsd * usdTmn) / 31.1035 * 0.75;;
        return Math.round(gram18kTmn)
    }

    getMatchedOrders(openOrders, marketPrice) {
        return openOrders.filter(order => {
            if (order.type === 'buy') return order.price > marketPrice;
            else if (order.type === 'sell') return order.price < marketPrice;
        });
    }
}

module.exports = OrderService