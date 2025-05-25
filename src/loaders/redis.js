const IoRedis = require('ioredis');
const redis = new IoRedis();

class Redis {
    constructor() { }

    static async init() {
        const redis = new IoRedis({
            port: +process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
        });
        return redis
    }

    static async CacheSet(key, value, ttlInSeconds) {
        await redis.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
    }

    static async cacheGet(key) {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    static async cacheDel(key) {
        await redis.del(key);
    }
}

module.exports = Redis