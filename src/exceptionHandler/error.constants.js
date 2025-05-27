const errors = {
    invalidToken: {
        status: 403,
        message: {
            'fa': 'توکن معتبر نیست',
            'en': 'Invalid token'
        }
    },
    missingToken: {
        status: 401,
        message: {
            'fa': 'توکن احراز هویت ارسال نشده است',
            'en': 'Authentication token missing'
        }
    },
    userNotFound: {
        status: 404,
        message: {
            'fa': 'کاربر یافت نشد',
            'en': 'user not found'
        }
    },
    orderUpdateFailed: {
        status: 400,
        message: {
            'fa': 'خطا در بروز رسانی سفارشات',
            'env': 'update failed!'
        }
    },
    userAlreadyExist: {
        status: 409,
        message: {
            'fa': 'نام کاربری قبلاً ثبت شده است.',
            'en': 'Username already exists'
        }
    },
    InvalidCredentials: {
        status: 401,
        message: {
            'fa': 'احراز هویت انجام نشد.',
            'en': 'Invalid credentials'
        }
    }

}

module.exports = errors
