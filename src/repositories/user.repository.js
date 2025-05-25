const Queries = require('./queries')
const DB = require('../loaders/db')
class UserRepository {
    constructor() {

    }

    async receive(userId) {
        const { query, value } = Queries.receive('users', '*', 'id', userId)
        const result = await DB.query(query, value)
        return result.rows
    }
}

module.exports = UserRepository