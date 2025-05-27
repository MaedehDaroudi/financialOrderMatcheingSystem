class AuthApiTestInput {

    static username
    constructor() {
    }

    static registerUser(data) {
        this.username = 'user_' + Date.now()
        return {
            "username": this.username,
            "password": "123456",
            "role": "Customer",
            "email": "a@gmail.com",
            "phone": "09150000000"
        }
    }

    static loginUser(data) {
        return {
            "username": this.username,
            "password": "123456"
        }
    }
}

module.exports = AuthApiTestInput