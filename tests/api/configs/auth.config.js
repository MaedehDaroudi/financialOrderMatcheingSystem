class AuthApiTestConfig {

    #prefix;
    #headers;
    #serverUrl;

    constructor() {
        this.#prefix = '/api/v1'
        this.#serverUrl = 'http://127.0.0.1:8080'
        this.#headers = { 'Content-Type': 'application/json' }
    }

    registerUser(data) {
        return {
            data: data,
            method: 'post',
            headers: this.#headers,
            maxBodyLength: Infinity,
            url: `${this.#serverUrl}${this.#prefix}/register`,
        }
    }

    loginUser(data) {
        return {
            data: data,
            method: 'post',
            headers: this.#headers,
            maxBodyLength: Infinity,
            url: `${this.#serverUrl}${this.#prefix}/login`,
        }
    }
}

module.exports = AuthApiTestConfig