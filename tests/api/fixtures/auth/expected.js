class AuthApiTestExpected {

    constructor() {
    }

    static registerUser(data) {
        return {
            fa: "کاربر با موفقیت ثبت‌نام شد.",
            en: "User registered successfully.",
        }
    }

    static loginUser(data) {
        return {
            token: null
        }
    }
}

module.exports = AuthApiTestExpected