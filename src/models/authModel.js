class AuthModel {
    #createUserModel
    #findByUsernameModel

    constructor() {
        this.#findByUsernameModel = {
            table: 'users',
            fields: '*',
            conditions: {}
        }

        this.#createUserModel = {
            table: 'users'
        }
    }

    set findByUsername(data) {
        this.#findByUsernameModel.conditions = { name: data.userId }
    }

    get findByUsername() {
        return this.#findByUsernameModel
    }

    set createUser(data) {
        this.#createUserModel.data = {
            name: data.username,
            password: data.password,
            role: data?.role || 'customer'
        }
        if (data?.phone) this.#createUserModel.data.phone = data.phone
        if (data?.email) this.#createUserModel.data.email = data.email
    }

    get createUser() {
        return this.#createUserModel
    }
}

module.exports = AuthModel