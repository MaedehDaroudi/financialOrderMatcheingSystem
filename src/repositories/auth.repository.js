const DB = require('../loaders/db')
const Queries = require('./queries')
const AuthModel = require('../models/authModel')
const authModel = new AuthModel()

class AuthRepository {

    constructor() {

    }

    async findByUsername(userId) {
        authModel.findByUsername = { userId }
        const { table, fields, conditions } = authModel.findByUsername
        const { query, value } = Queries.receive(table, fields, conditions)
        const result = await DB.query(query, value)
        return result.rows
    };

    async createUser(userData) {
        authModel.createUser =  userData 
        const { table, data } = authModel.createUser
        const { query, value } = Queries.create(table,data)
        const result = await DB.query(query, value)
        return result.rows
    }
}


module.exports = AuthRepository